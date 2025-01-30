import * as React from "react";
import { Button } from "@/components/ui/button";
import RecordRTC from "recordrtc";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import Papa from "papaparse"; // For parsing CSV
import SentimentVisualization from "./SentimentVisualization";

// User Data (Wellness Enthusiasts and Counselors)
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

const AvatarDemo = ({ avatarUrl }: { avatarUrl: string }) => (
  <Avatar className="mb-4">
    <AvatarImage src={avatarUrl} alt="User Avatar" />
    <AvatarFallback>MN</AvatarFallback>
  </Avatar>
);

const handleDownloadTemplate = () => {
  const csvContent = "Name,Age,Sentiment,Type,Country,City,State,Gender\n";
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "counselor_template.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [, setTranscription] = React.useState<string | null>(null);
  // const [ Error,setError] = React.useState<string | null>(null);
  const recorderRef = React.useRef<RecordRTC | null>(null);

  const handleToggleRecording = (
    event: React.MouseEvent<HTMLButtonElement>,
    field: string
  ) => {
    event.preventDefault(); // Prevent the page from refreshing

    console.log("Starting recording...");

    if (!isRecording) {
      // Ask for microphone permission
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          console.log("Media stream received");
          recorderRef.current = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm",
          });
          recorderRef.current.startRecording();
          setIsRecording(true);
          // setError(null);
        })
        .catch((err) => {
          // Handle the case where the user denies the permission
          if (err.name === "NotAllowedError") {
            console.error("Permission denied: Microphone access is required.");
            // setError("Permission denied: Microphone access is required.");
          } else {
            console.error("Error accessing microphone:", err);
            // setError("Error accessing microphone");
          }
        });
    } else {
      // Stop recording and upload
      console.log("Stopping recording...");
      recorderRef.current?.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        console.log("Blob created:", blob);
        if (blob) {
          const file = new File([blob], "audio.webm", { type: "audio/webm" });

          const formData = new FormData();
          formData.append("audio", file);

          fetch("https://ibm-sentiment-analysis-3gdr.onrender.com/transcribe", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new globalThis.Error("Failed to transcribe audio");
              }
              return response.json();
            })
            .then((data) => {
              const transcript =
                data?.results?.[0]?.alternatives?.[0]?.transcript ??
                "No transcription available";

              setTranscription(transcript); // Store the transcription in state
              console.log(transcript);
              // Update the respective input field based on the 'field' parameter
              if (field === "feeling") {
                setFeeling(transcript);
              } else if (field === "challenge") {
                setChallenge(transcript);
              } else if (field === "improve") {
                setImprove(transcript);
              }

              // setError(null);
            })
            .catch((err) => {
              console.error("Error uploading file:", err);
              // setError("Failed to transcribe audio");
            });
        } else {
          console.error("No blob available for the recording");
        }
      });
      setIsRecording(false);
    }
  };

  const [feeling, setFeeling] = React.useState("");
  const [challenge, setChallenge] = React.useState("");
  const [improve, setImprove] = React.useState("");
  const [csvFile, setCsvFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected CSV file:", file); // Log the selected file
      setCsvFile(file);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if (user.isMentalDoctor && csvFile) {
      // For Counselors: Parse and send CSV data
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const csvData = result.data;

          fetch(
            "https://ibm-sentiment-analysis-3gdr.onrender.com/api/predictPatientsSentiments",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ csvData }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new globalThis.Error(
                  `HTTP error! status: ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
              console.log("Results:", data);
              onResults(data);
              setLoading(false);
              onClose();
            })
            .catch((error) => {
              console.error("Error sending CSV data:", error);
              setLoading(false);
            });
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setLoading(false);
        },
      });
    } else {
      // For Wellness Enthusiasts: Send text data
      const requestData = { feeling, challenge, improve };
      fetch("https://ibm-sentiment-analysis-3gdr.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new globalThis.Error(
              `HTTP error! status: ${response.status} `
            ); // Updated
          }
          return response.json();
        })
        .then((data) => {
          console.log("Backend response:", data);
          onResults(data);
          setLoading(false);
          onClose();
        })
        .catch((error) => {
          console.error("Error during prediction:", error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[400px] max-w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            {user.isMentalDoctor ? "Upload CSV" : "Analyze Sentiments"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {user.isMentalDoctor
              ? "Upload a CSV file with patient data for sentiment analysis."
              : "Fill out the form to analyze your sentiments."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.isMentalDoctor ? (
            <div>
              <Label
                htmlFor="csv-upload"
                className="text-gray-900 dark:text-gray-100"
              >
                Upload CSV
              </Label>
              <Input
                type="file"
                id="csv-upload"
                onChange={handleCSVUpload}
                accept=".csv"
              />

               {/* ADD A DOWNLOAD TEMPLATE BUTTON */}
    <Button variant="outline" className="mt-2" onClick={handleDownloadTemplate}>
      Download CSV Template
    </Button>
            </div>
          ) : (
            <form className="space-y-4">
              <Label
                htmlFor="feeling"
                className="text-gray-900 dark:text-gray-100"
              >
                How are you feeling today?
              </Label>

              <div className="flex gap-2">
                <Input
                  id="feeling"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="I'm feeling..."
                />
                <Button
                  variant="outline"
                  onClick={(e) => handleToggleRecording(e, "feeling")}
                  className="p-2"
                >
                  🎤
                </Button>
              </div>

              <Label
                htmlFor="challenge"
                className="text-gray-900 dark:text-gray-100"
              >
                Biggest concern on your mind?
              </Label>

              <div className="flex gap-2">
                <Input
                  id="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="My biggest challenge is..."
                />
                <Button
                  variant="outline"
                  onClick={(e) => handleToggleRecording(e, "challenge")}
                  className="p-2"
                >
                  🎤
                </Button>
              </div>

              <Label
                htmlFor="improve"
                className="text-gray-900 dark:text-gray-100"
              >
                What would improve your current situation?
              </Label>

              <div className="flex gap-2">
                <Input
                  id="improve"
                  value={improve}
                  onChange={(e) => setImprove(e.target.value)}
                  placeholder="I would feel better if..."
                />
                <Button
                  variant="outline"
                  onClick={(e) => handleToggleRecording(e, "improve")}
                  className="p-2"
                >
                  🎤
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={user.isMentalDoctor && !csvFile}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};

export const Users = () => {
  const { theme } = useTheme();
  const [selectedUser, setSelectedUser] = React.useState<SponsorProps | null>(
    null
  );
  const [analysisResults, setAnalysisResults] = React.useState<any>(null);

  const handleAnalyze = (user: SponsorProps) => {
    setSelectedUser(user);
  };

  const closeAnalyze = () => {
    setSelectedUser(null);
  };

  return (
    <section id="users" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Users
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
        {users.map((user) => (
          <MagicCard
            key={user.name}
            className="cursor-pointer flex flex-col items-center justify-center text-lg shadow-2xl p-6 rounded-lg"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            {/* Avatar (Icon) is moved to the top */}
            <CardContent className="flex flex-col items-center">
              <AvatarDemo avatarUrl={user.avatarUrl} />
            </CardContent>

            <CardHeader className="text-center">
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>

            {/* Description below the Avatar */}
            <CardDescription className="text-center">
              {user.description}
            </CardDescription>

            <CardFooter className="flex justify-center mt-4">
              <Button variant="outline" onClick={() => handleAnalyze(user)}>
                Analyze
              </Button>
            </CardFooter>
          </MagicCard>
        ))}
      </div>

      {selectedUser && (
        <AnalyzeComponent
          user={selectedUser}
          onClose={closeAnalyze}
          onResults={(results) => setAnalysisResults(results)}
        />
      )}

      {analysisResults && (
        <div className="mt-8">
          <SentimentVisualization results={analysisResults} />
        </div>
      )}
    </section>
  );
};
