import { GalleryVerticalEnd } from "lucide-react";
import { SignUpForm } from "./sign-up-form"; // Assuming you've placed the sign-up form code in a separate file
import img from "../assets/login-image.jpg";

export default function SignUp() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Column */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo Section */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Sentify.IBM.ltd
          </a>
        </div>
        {/* Sign-Up Form Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      {/* Right Column with Image */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src={img}
          alt="Sign-Up Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
