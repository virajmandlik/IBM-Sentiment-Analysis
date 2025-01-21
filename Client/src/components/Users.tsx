import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import user from "../assets/User1.png";

import ShineBorder from "@/components/ui/shine-border";
export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      {/* BorderBeam effect */}
      {/* ShineBorder effect */}
      <ShineBorder
        className="relative flex items-center justify-center rounded-lg p-4"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Keep it Balanced
        </span>
      </ShineBorder>

 
    </div>
  );
}




// Define the user data (Normal users and Mental Health Doctors)
interface SponsorProps {
  name: string;
  description: string;
  avatarUrl: string;
  isMentalDoctor: boolean;
}

const users: SponsorProps[] = [
  {
    name: "Wellness Enthusiasts",
    description: "An individual pursuing mental wellness evaluation.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe2ViBkmacEAhE66woBFCerF6qqgtQGEB-AA&s",
    isMentalDoctor: false,
  },
  {
    name: "Counselor",
    description: "A mental health expert here to help with your wellness.",
    avatarUrl: "https://github.com/shadcn.png",
    isMentalDoctor: true,
  },
];

const AvatarDemo = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt="User Avatar" />
      <AvatarFallback>MN</AvatarFallback>
    </Avatar>
  );
};

// Analyze Component
const AnalyzeComponent = ({
  user,
  onClose,
}: {
  user: SponsorProps;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[400px] max-w-full bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            {user.isMentalDoctor ? "Upload CSV" : "Enter Sentiment"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {user.isMentalDoctor
              ? "Upload patient data in CSV format."
              : "Please enter your sentiments and name."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            {user.isMentalDoctor ? (
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="csv"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Upload Patient CSV
                </Label>
                <Input id="csv" type="file" className="dark:bg-gray-700 dark:text-gray-100" />
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="sentiment"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Sentiment
                </Label>
                <Input
                  id="sentiment"
                  placeholder="Enter your sentiments"
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
                <Label
                  htmlFor="name"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export const Users = () => {
  const [selectedUser, setSelectedUser] = React.useState<SponsorProps | null>(null);

  const handleAnalyze = (user: SponsorProps) => {
    setSelectedUser(user);
  };

  const closeAnalyze = () => {
    setSelectedUser(null);
  };

  return (
    <section id="users" className="container pt-24 sm:py-32">
      {/* Include OrbitingCirclesDemo here */}
      <div className="mt-5">
        <OrbitingCirclesDemo />
      </div>

      <img
        src={user}
        alt="Pilot representing mental health assistance"
        className="w-[300px] object-contain rounded-lg"
      />

      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Users
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {users.map((user) => (
          <div key={user.name} className="space-y-4">
            <Card className="w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:mb-4">
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <AvatarDemo avatarUrl={user.avatarUrl} />
                  <p className="text-center text-muted-foreground">
                    {user.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleAnalyze(user)}>
                  Analyze
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {selectedUser && (
        <AnalyzeComponent user={selectedUser} onClose={closeAnalyze} />
      )}
    </section>
  );
};
