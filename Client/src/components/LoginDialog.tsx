import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LoginDialogProps {
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoginFeedback(null);
    setIsLoading(true);
    setProgress(10);

    try {
      const response = await fetch("https://ibm-sentiment-analysis-3gdr.onrender.com/api/instagram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      setProgress(50);
      const data = await response.json();
      setProgress(80);

      if (response.ok) {
        setLoginFeedback("Login successful!");
        setProgress(100);
        setTimeout(() => {
          navigate("/upload", { state: { username, password } });
        }, 500);
      } else {
        setLoginFeedback(data.error || "Invalid login credentials.");
        setIsLoading(false);
      }
    } catch (error) {
      setLoginFeedback("Something went wrong. Please try again.");
      setIsLoading(false);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Instagram Login</DialogTitle>
          <DialogDescription>Enter your Instagram credentials to log in.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        {isLoading && <Progress value={progress} className="w-full h-2 bg-gray-200" />}
        {loginFeedback && (
          <p
            className={`text-center text-sm ${
              loginFeedback === "Login successful!" ? "text-green-500" : "text-red-500"
            }`}
          >
            {loginFeedback}
          </p>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <Button type="button" onClick={handleClose} className="ml-4">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
