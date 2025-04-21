
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, Lock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const deleteAccountSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required to delete your account.",
  }),
});

type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;

const deleteReasons = [
  { id: "not-useful", label: "I don't find the app useful" },
  { id: "too-complicated", label: "The app is too complicated" },
  { id: "found-alternative", label: "I found a better alternative" },
  { id: "privacy-concerns", label: "I have privacy concerns" },
  { id: "too-expensive", label: "The premium features are too expensive" },
  { id: "other", label: "Other reason" },
];

export default function DeleteAccount() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Initialize form with default values
  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(data: DeleteAccountFormValues) {
    setIsLoading(true);
    try {
      // In a real implementation, verify the password
      // We'll just proceed to next step for now
      setStep(2);
    } catch (error: any) {
      console.error("Error verifying password:", error);
      toast({
        title: "Error",
        description: error.message || "Invalid password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleReasonSelect = (value: string) => {
    setSelectedReason(value);
  };

  const proceedToFinalStep = () => {
    if (!selectedReason) {
      toast({
        title: "Select a reason",
        description: "Please select a reason for deleting your account.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(3);
  };

  const confirmAccountDeletion = async () => {
    if (!acceptedTerms) {
      toast({
        title: "Accept terms",
        description: "Please confirm that you understand the consequences of deleting your account.",
        variant: "destructive",
      });
      return;
    }
    
    setShowConfirmDialog(true);
  };

  const finalizeAccountDeletion = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call an API to delete the account
      // and log feedback
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted. We're sorry to see you go.",
      });
      
      // Redirect to home page after account deletion
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  };

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
        <h1 className="text-2xl font-serif font-medium text-red-500">Delete Account</h1>
      </div>
      
      <Card className="border-red-200">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle>Delete Your Account</CardTitle>
          </div>
          <CardDescription>
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                <h3 className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Confirm your identity
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                  For security reasons, please enter your password to continue with account deletion.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Lock className="mr-2 h-4 w-4 text-gray-500" />
                            <Input placeholder="Enter your password" type="password" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end pt-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mr-2"
                      onClick={() => navigate('/settings')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-red-500 hover:bg-red-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Continue"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                <h3 className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Help us improve
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                  We're sorry to see you go. Please let us know why you're deleting your account.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Why are you deleting your account?</h3>
                
                <RadioGroup value={selectedReason || ""} onValueChange={handleReasonSelect}>
                  <div className="space-y-2">
                    {deleteReasons.map((reason) => (
                      <div key={reason.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason.id} id={reason.id} />
                        <Label htmlFor={reason.id}>{reason.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                
                {selectedReason === "other" && (
                  <div className="pt-2">
                    <Label htmlFor="other-reason">Please specify:</Label>
                    <Input
                      id="other-reason"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      placeholder="Tell us more..."
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="mr-2"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={proceedToFinalStep}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800">
                <h3 className="flex items-center gap-2 text-red-800 dark:text-red-400 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Final warning
                </h3>
                <p className="text-sm text-red-700 dark:text-red-500 mt-1">
                  This action cannot be undone. Once you delete your account, all of your data will be permanently removed.
                </p>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-medium">What you'll lose:</h3>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>All your saved cocktail recipes and favorites</li>
                  <li>Your bar inventory and shopping lists</li>
                  <li>Your custom created recipes and notes</li>
                  <li>Access to any premium content you've purchased</li>
                  <li>Your profile information and preferences</li>
                </ul>
                
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms} 
                    onCheckedChange={(checked) => {
                      setAcceptedTerms(checked === true);
                    }} 
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I understand that this action is permanent and cannot be undone
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="mr-2"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={confirmAccountDeletion}
                  disabled={!acceptedTerms}
                >
                  Delete My Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-500" />
              Confirm Account Deletion
            </DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={finalizeAccountDeletion}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
