import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
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

  if (!results) {
    return <div>No data available for visualization</div>;
  }

  // Check if it's a CSV batch result
  const isBatchAnalysis = Array.isArray(results);

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

  // Map numerical values back to sentiment labels
  const valueToSentiment = (value: number) => {
    switch (value) {
      case 1:
        return "Normal";
      case 3:
        return "Stress";
      case 4:
        return "Personality Disorder";
      case 5:
        return "Anxiety";
      case 6:
        return "Bipolar";
      case 7:
        return "Depression";
      case 8:
        return "Suicidal";
      default:
        return "Unknown";
    }
  };

  // Define the sentiment facts
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

  // Map batch results to Area Chart data
  const areaChartData = isBatchAnalysis
    ? results.map((result: any) => ({
        name: result.name, // Name of the person
        analyzedSentiment: sentimentToValue(result.analyzedSentiment),
      }))
    : [];

  if (isBatchAnalysis) {
    // Area Chart for Batch Analysis
    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Sentiment Analysis (CSV)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto">
            <ResponsiveContainer width="100%" height={600}>
              <AreaChart
                data={areaChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={valueToSentiment} // Display sentiment labels
                  domain={[0, 8]} // Set the Y-axis range
                />
                <Tooltip
                  formatter={(value: number) => valueToSentiment(value)} // Format tooltip values
                />
                <Area
                  type="monotone"
                  dataKey="analyzedSentiment"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    // Pie Chart for Individual Sentiment Analysis
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
                  label={(entry) => `${entry.name}: ${valueToSentiment(entry.value)}`} // Add sentiment names to pie slices
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, props: any) => [
                    `${props.payload.name}: ${valueToSentiment(value)}`,
                    "Sentiment",
                  ]}
                />
              </PieChart>

              {/* Overall sentiment in the center of the Pie */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-center">
                <p>{valueToSentiment(sentimentToValue(overallSentiment))}</p>
              </div>
            </div>

            {/* Statistical Facts */}
            <div className="flex flex-col justify-center items-start mt-4 ml-8">
              <h3 className="text-lg font-bold mb-2">Did You Know?</h3>
              <p className="text-sm text-muted-foreground">
                {sentimentToFact(overallSentiment)}
              </p>
            </div>

            {/* YouTube Video Recommendation */}
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
  }
};

export default SentimentVisualization;
