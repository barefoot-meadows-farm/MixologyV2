
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BartenderModeInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const BARTENDER_MODE_INFO_KEY = "bartender-mode-info-shown";

export function BartenderModeInfoDialog({ isOpen, onClose, onContinue }: BartenderModeInfoDialogProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleContinue = () => {
    if (dontShowAgain) {
      localStorage.setItem(BARTENDER_MODE_INFO_KEY, "true");
    }
    onContinue();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        // We don't allow escape to dismiss, instead we focus the continue button
        e.preventDefault();
        document.getElementById("continue-bartender-btn")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Bartender Mode</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base">
          Bartender Mode is a display setting that removes all extra menus and options to show only cocktail recipes and preparation steps. 
          When you activate this mode, the interface switches to a minimalist view focused exclusively on drink-making instructions. 
          This is useful when you want to concentrate on following recipes without navigating through other features, especially when making drinks 
          while entertaining or practicing bartending skills. The simplified screen makes it easier to read and follow cocktail instructions without distractions.
        </DialogDescription>
        <div className="flex items-center space-x-2 py-2">
          <Checkbox 
            id="dont-show-again" 
            checked={dontShowAgain} 
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          />
          <Label htmlFor="dont-show-again" className="text-sm">Don't show this message again</Label>
        </div>
        <DialogFooter>
          <Button 
            id="continue-bartender-btn"
            onClick={handleContinue}
            className="w-full sm:w-auto bg-mixology-burgundy hover:bg-mixology-burgundy/90"
            autoFocus
          >
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function shouldShowBartenderInfo(): boolean {
  return localStorage.getItem(BARTENDER_MODE_INFO_KEY) !== "true";
}
