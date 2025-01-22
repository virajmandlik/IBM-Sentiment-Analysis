import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AnxietyYoutubeLink,
  AnxietyThumbnail,
  DepressionYoutubeLink,
  DepressionThumbnail,
  StressYoutubeLink,
  StressThumbnail,
  SuicidalYoutubeLink,
  SuicidalThumbnail,
  NormalYoutubeLink,
  NormalThumbnail,
  BipolarYoutubeLink,
  BipolarThumbnail,
  PersonalityDisorderYoutubeLink,
  PersonalityDisorderThumbnail,
} from "./YoutubeConfig";

const SentimentVisualization = ({ results }: { results: any }) => {
  console.log("SentimentVisualization received results:", results);

  if (!results || !results.individualSentiments) {
    return <div>No data available for visualization</div>;
  }

  // Map sentiments to numerical values
  const sentimentToValue = (sentiment: string) => {
    switch (sentiment) {
      case "Anxiety":
        return 5;
      case "Bipolar":
        return 6;
      case "Depression":
        return 7;
      case "Normal":
        return 1;
      case "Personality disorder":
        return 4;
      case "Stress":
        return 3;
      case "Suicidal":
        return 8;
      default:
        return 0; // Default for unrecognized sentiments
    }
  };

  // Map overall sentiments to YouTube videos
  const sentimentToYouTube = (sentiment: string) => {
    switch (sentiment) {
      case "Anxiety":
        return { url: AnxietyYoutubeLink, thumbnail: AnxietyThumbnail };
      case "Depression":
        return { url: DepressionYoutubeLink, thumbnail: DepressionThumbnail };
      case "Stress":
        return { url: StressYoutubeLink, thumbnail: StressThumbnail };
      case "Suicidal":
        return { url: SuicidalYoutubeLink, thumbnail: SuicidalThumbnail };
      case "Normal":
        return { url: NormalYoutubeLink, thumbnail: NormalThumbnail };
      case "Bipolar":
        return { url: BipolarYoutubeLink, thumbnail: BipolarThumbnail };
      case "Personality disorder":
        return {
          url: PersonalityDisorderYoutubeLink,
          thumbnail: PersonalityDisorderThumbnail,
        };
      default:
        return null;
    }
  };

  // Map statistical facts to overall sentiments
  const sentimentToFact = (sentiment: string) => {
    switch (sentiment) {
      case "Anxiety":
        return "Over 40 million adults in the US experience anxiety disorders annually.";
      case "Depression":
        return "Depression is the leading cause of disability worldwide.";
      case "Stress":
        return "Stress contributes to 77% of health problems reported by people.";
      case "Suicidal":
        return "Suicide is the second leading cause of death among individuals aged 15-29.";
      case "Normal":
        return "Maintaining mental wellness can improve overall life satisfaction.";
      case "Bipolar":
        return "Bipolar disorder affects around 46 million people worldwide.";
      case "Personality disorder":
        return "Personality disorders impact 9% of the general population globally.";
      default:
        return "Stay informed and seek help if you or someone you know needs it.";
    }
  };

  const data = [
    {
      name: "Feeling Sentiment",
      value: sentimentToValue(results.individualSentiments.feelingSentiment),
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Challenge Sentiment",
      value: sentimentToValue(results.individualSentiments.challengeSentiment),
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Improve Sentiment",
      value: sentimentToValue(results.individualSentiments.improveSentiment),
      fill: "hsl(var(--chart-3))",
    },
  ];

  const overallSentiment = results.overallSentiment;
  const video = sentimentToYouTube(overallSentiment);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between">
          {/* Pie Chart */}
          <div>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: string, props: any) => [
                  props.payload.name,
                  "Sentiment",
                ]}
              />
            </PieChart>
          </div>

          {/* Statistical Facts */}
          <div className="flex flex-col justify-center items-start mt-4 ml-8">
            <h3 className="text-lg font-bold mb-2">Did You Know?</h3>
            <p className="text-sm text-muted-foreground">{sentimentToFact(overallSentiment)}</p>
          </div>

          {/* YouTube Video Thumbnail */}
          {video && (
            <div className="mt-4 ml-8">
              <h3 className="text-lg font-bold mb-2">Recommended Video</h3>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={video.thumbnail}
                  alt={`Watch ${overallSentiment} related video`}
                  className="w-64 h-36 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow"
                />
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                Video recommendation for {overallSentiment}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentVisualization;
