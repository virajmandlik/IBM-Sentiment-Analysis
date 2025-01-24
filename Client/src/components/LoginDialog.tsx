import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

export const LoginDialog: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true); // State to control dialog visibility

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    setLoginFeedback(null);
    try {
      console.log("Attempting login with:", { username, password });
      const response = await fetch("http://localhost:3000/api/instagram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        setLoginFeedback("Login successful!");
        // Navigate to the UploadPost page and pass the credentials as state
        navigate("/upload", { state: { username, password } });
      } else {
        setLoginFeedback(data.error || "Invalid login credentials.");
      }
    } catch (error) {
      setLoginFeedback("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleClose = () => {
    // Close the dialog and scroll to the features section
    setIsOpen(false); // Hide the dialog
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
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
          {/* Close button added */}
          <Button type="button" onClick={handleClose} className="ml-4">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
