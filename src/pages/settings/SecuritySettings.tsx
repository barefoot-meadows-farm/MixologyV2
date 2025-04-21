
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, Shield, AlertTriangle, Eye, EyeOff, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
  }),
  confirmPassword: z.string().min(1, {
    message: "Please confirm your new password.",
  }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function SecuritySettings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", lastActive: "Just now", isCurrent: true },
    { id: 2, device: "Safari on iPhone", lastActive: "2 hours ago", isCurrent: false },
    { id: 3, device: "Firefox on Mac", lastActive: "3 days ago", isCurrent: false },
  ]);
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Initialize form with default values
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Watch for password changes to calculate strength
  const newPassword = form.watch("newPassword");
  
  React.useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (newPassword.length >= 8) strength += 1;
    
    // Uppercase and lowercase check
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength += 1;
    
    // Number check
    if (/\d/.test(newPassword)) strength += 1;
    
    // Special character check
    if (/[^a-zA-Z0-9]/.test(newPassword)) strength += 1;
    
    setPasswordStrength(strength);
  }, [newPassword]);

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    try {
      // In a real implementation, verify current password first
      // then change the password
      
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
      
      form.reset();
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleTwoFactor() {
    // In a real implementation, this would initiate the 2FA setup process
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
    
    toast({
      title: isTwoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled",
      description: isTwoFactorEnabled 
        ? "Your account is now less secure. We recommend enabling 2FA." 
        : "Your account is now more secure.",
    });
  }

  async function endSession(sessionId: number) {
    // In a real implementation, this would call an API to terminate the session
    setSessions(sessions.filter(session => session.id !== sessionId));
    
    toast({
      title: "Session ended",
      description: "The selected session has been terminated.",
    });
  }

  async function endAllOtherSessions() {
    // In a real implementation, this would call an API to terminate all other sessions
    setSessions(sessions.filter(session => session.isCurrent));
    
    toast({
      title: "All other sessions ended",
      description: "All sessions except your current one have been terminated.",
    });
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/settings')}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-serif font-medium text-mixology-purple dark:text-mixology-cream">Password & Security</h1>
      </div>
      
      <div className="space-y-8">
        {/* Change Password Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-mixology-purple dark:text-mixology-cream" />
            <h2 className="text-lg font-medium">Change Password</h2>
          </div>
          <Separator className="mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Update your password regularly to maintain account security.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Enter your current password" 
                          type={showCurrentPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Enter your new password" 
                          type={showNewPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    
                    {/* Password strength indicator */}
                    {newPassword && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Password strength: {
                            passwordStrength === 0 ? "Very weak" :
                            passwordStrength === 1 ? "Weak" :
                            passwordStrength === 2 ? "Medium" :
                            passwordStrength === 3 ? "Strong" :
                            "Very strong"
                          }
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength === 0 ? "bg-red-500 w-1/4" :
                              passwordStrength === 1 ? "bg-orange-500 w-2/4" :
                              passwordStrength === 2 ? "bg-yellow-500 w-3/4" :
                              "bg-green-500 w-full"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Confirm your new password" 
                          type={showConfirmPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  className="bg-mixology-purple hover:bg-mixology-purple/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Two-Factor Authentication Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-mixology-purple dark:text-mixology-cream" />
            <h2 className="text-lg font-medium">Two-Factor Authentication</h2>
          </div>
          <Separator className="mb-4" />
          
          <div className="flex items-center justify-between py-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">Enable Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={isTwoFactorEnabled}
              onCheckedChange={toggleTwoFactor}
            />
          </div>
          
          {isTwoFactorEnabled && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Two-Factor Authentication is enabled</CardTitle>
                <CardDescription>
                  Your account is protected with an additional layer of security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // In a real implementation, this would show QR code to set up 2FA
                    toast({
                      title: "2FA Setup",
                      description: "In a real implementation, this would show a QR code for 2FA setup.",
                    });
                  }}
                >
                  Reconfigure Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Active Sessions Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-mixology-purple dark:text-mixology-cream" />
            <h2 className="text-lg font-medium">Active Sessions</h2>
          </div>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These are the devices that are currently logged into your account.
            </p>
            
            <div className="space-y-2">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.device}</span>
                      {session.isCurrent && (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last active: {session.lastActive}</p>
                  </div>
                  
                  {!session.isCurrent && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => endSession(session.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      End Session
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {sessions.length > 1 && (
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={endAllOtherSessions}
              >
                End All Other Sessions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
