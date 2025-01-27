import React from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LoginDialog } from "./LoginDialog";

export const ShinyButtonDemo: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };
  return (
    <div>
      <ShinyButton onClick={handleButtonClick}>Click Me to Explore</ShinyButton>
      
      {isDialogOpen && <LoginDialog onClose={() => setIsDialogOpen(false)} />}
    </div>
  );
};
