import * as React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import user from "../assets/User1.png";
import ShineBorder from "@/components/ui/shine-border";
import SentimentVisualization from "./SentimentVisualization";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
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
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe2ViBkmacEAhE66woBFCerF6qqgtQGEB-AA&s",
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

const AnalyzeComponent = ({
  user,
  onClose,
  onResults,
}: {
  user: SponsorProps;
  onClose: () => void;
  onResults: (results: any) => void;
}) => {
  const [feeling, setFeeling] = React.useState("");
  const [challenge, setChallenge] = React.useState("");
  const [improve, setImprove] = React.useState("");

  const handleSubmit = () => {
    const requestData = { feeling, challenge, improve };

    fetch("http://localhost:3000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log response for debugging
        onResults(data); // Pass data to parent component
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error during prediction:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[400px] max-w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            {user.isMentalDoctor ? "Upload CSV" : "Answer Questions"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {user.isMentalDoctor
              ? "Upload patient data in CSV format."
              : "Help us understand your feelings better."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Label htmlFor="feeling" className="text-gray-900 dark:text-gray-100">
              How are you feeling today? Can you describe it briefly?
            </Label>
            <Input
              id="feeling"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="I'm feeling..."
              className="dark:bg-gray-700 dark:text-gray-100"
            />
            <Label htmlFor="challenge" className="text-gray-900 dark:text-gray-100">
              What is the biggest concern or challenge on your mind right now?
            </Label>
            <Input
              id="challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="My biggest challenge is..."
              className="dark:bg-gray-700 dark:text-gray-100"
            />
            <Label htmlFor="improve" className="text-gray-900 dark:text-gray-100">
              What would make you feel better or improve your current situation?
            </Label>
            <Input
              id="improve"
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              placeholder="I would feel better if..."
              className="dark:bg-gray-700 dark:text-gray-100"
            />
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </div>
    </div>
  );
};

export const Users = () => {
  const { theme } = useTheme();
  const [selectedUser, setSelectedUser] = React.useState<SponsorProps | null>(null);
  const [analysisResults, setAnalysisResults] = React.useState<any>(null);

  const handleAnalyze = (user: SponsorProps) => {
    setSelectedUser(user);
  };

  const closeAnalyze = () => {
    setSelectedUser(null);
  };

  return (
    <section id="users" className="container pt-24 sm:py-32">
      {/* Orbiting Circles Section */}
      <div className="mt-5">
        <OrbitingCirclesDemo />
      </div>

      {/* Image and Title */}
      <img
        src={user}
        alt="Pilot representing mental health assistance"
        className="w-[300px] object-contain rounded-lg"
      />
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">Users</h2>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {users.map((user) => (
          <MagicCard
            key={user.name}
            className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-lg shadow-2xl w-[350px]"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <AvatarDemo avatarUrl={user.avatarUrl} />
                <p className="text-center text-muted-foreground">{user.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleAnalyze(user)}>
                Analyze
              </Button>
            </CardFooter>
          </MagicCard>
        ))}
      </div>

      {/* Conditionally Render Analyze Component */}
      {selectedUser && (
        <AnalyzeComponent
          user={selectedUser}
          onClose={closeAnalyze}
          onResults={(results) => setAnalysisResults(results)} // Pass results to state
        />
      )}

      {/* Visualization Section */}
      {analysisResults && (
        <div className="mt-8">
          <SentimentVisualization results={analysisResults} />
        </div>
      )}
    </section>
  );
};
