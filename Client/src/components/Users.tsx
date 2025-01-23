import * as React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import Papa from "papaparse"; // For CSV parsing
import SentimentVisualization from "./SentimentVisualization";

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
  const [csvFile, setCsvFile] = React.useState<File | null>(null); // State for the uploaded CSV file
  const [loading, setLoading] = React.useState(false); // Track loading state

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleSubmit = () => {
    setLoading(true); // Start loading
    const requestData = { csvFile };
  
    // If CSV is provided, read and parse it using PapaParse
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          console.log("CSV Data Parsed:", result);
          // Send the parsed data to the backend for analysis
          fetch("http://localhost:3000/api/predictPatientsSentiments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ csvData: result.data }), // Send parsed CSV data
          })
            .then((response) => response.json())
            .then((data) => {
              onResults(data); // Pass data to parent component
              onClose(); // Close the modal
              setLoading(false); // Stop loading when data is received
            })
            .catch((error) => {
              console.error("Error during prediction:", error);
              setLoading(false); // Stop loading in case of error
            });
        },
      });
    }
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
          {/* If counselor, show CSV upload field */}
          {user.isMentalDoctor && (
            <div>
              <Label htmlFor="csv-upload" className="text-gray-900 dark:text-gray-100">
                Upload Patient CSV
              </Label>
              <Input type="file" id="csv-upload" onChange={handleCSVUpload} />
            </div>
          )}
          {!user.isMentalDoctor && (
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
          )}
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
  const [loading, setLoading] = React.useState(false); // Track loading state

  const handleAnalyze = (user: SponsorProps) => {
    setSelectedUser(user);
  };

  const closeAnalyze = () => {
    setSelectedUser(null);
  };

  return (
    <section id="users" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-5xl font-bold mb-8 text-primary">Users</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
        {users.map((user) => (
          <MagicCard
            key={user.name}
            className="cursor-pointer flex flex-col items-center justify-center text-lg shadow-2xl p-6 rounded-lg"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <CardHeader>
              <CardTitle className="text-center">{user.name}</CardTitle>
              <CardDescription className="text-center">{user.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <AvatarDemo avatarUrl={user.avatarUrl} />
                <p className="text-center text-muted-foreground">{user.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
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
      {analysisResults && !loading && (
        <div className="mt-8">
          <SentimentVisualization results={analysisResults} />
        </div>
      )}
    </section>
  );
};
