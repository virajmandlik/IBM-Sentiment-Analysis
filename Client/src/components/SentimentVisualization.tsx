"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
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
  BipolarThumbnail
} from "./YoutubeConfig";

// Define the interface for results
interface SentimentVisualizationProps {
  results:
    | {
        name: string;
        sentiment: "positive" | "negative" | "neutral";
        emotions: {
          sadness: number;
          joy: number;
          fear: number;
          disgust: number;
          anger: number;
        };
        combinedStatement?: string; // Optional for individual analysis
      }[]
    | {
        name: string;
        sentiment: "positive" | "negative" | "neutral";
        emotions: {
          sadness: number;
          joy: number;
          fear: number;
          disgust: number;
          anger: number;
        };
        combinedStatement: string; // Required for individual analysis
      };
}


// Sentiment emoji mappings
const sentimentEmoji: Record<string, string> = {
  positive: "😊",
  negative: "😞",
  neutral: "😐",
};

// Map dominant emotion to YouTube videos
const emotionToYouTube = (emotion: string) => {
  switch (emotion) {
    case "sadness":
      return { url: DepressionYoutubeLink, thumbnail: DepressionThumbnail };
    case "joy":
      return { url: NormalYoutubeLink, thumbnail: NormalThumbnail };
    case "fear":
      return { url: AnxietyYoutubeLink, thumbnail: AnxietyThumbnail };
    case "disgust":
      return { url: StressYoutubeLink, thumbnail: StressThumbnail };
    case "anger":
      return { url: SuicidalYoutubeLink, thumbnail: SuicidalThumbnail };
    default:
      return { url: BipolarYoutubeLink, thumbnail: BipolarThumbnail }; // Fallback video
  }
};

// Fallback video for overall sentiment
const sentimentToYouTube = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return { url: NormalYoutubeLink, thumbnail: NormalThumbnail };
    case "negative":
      return { url: DepressionYoutubeLink, thumbnail: DepressionThumbnail };
    case "neutral":
      return { url: StressYoutubeLink, thumbnail: StressThumbnail };
    default:
      return null;
  }
};

// The main visualization component
const SentimentVisualization: React.FC<SentimentVisualizationProps> = ({ results }) => {
  const isBatchAnalysis = Array.isArray(results);

  // For batch analysis (CSV), display a stacked bar chart
  if (isBatchAnalysis) {
    const processedData = results.map((user) => ({
      name: user.name,
      sadness: user.emotions.sadness,
      joy: user.emotions.joy,
      fear: user.emotions.fear,
      disgust: user.emotions.disgust,
      anger: user.emotions.anger,
      sentiment: user.sentiment,
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Sentiment Analysis (CSV)</CardTitle>
        </CardHeader>
        <CardContent>
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={processedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
    
     
      <Tooltip/> 
      {/* Display emotions as stacked bars with no hover effect */}
      <Bar dataKey="sadness" stackId="a" fill="#7774d8" stroke="#000" strokeWidth={1} barSize={50} fillOpacity={1} />
      <Bar dataKey="joy" stackId="a" fill="#82ca9d" stroke="#000" strokeWidth={1} barSize={50} fillOpacity={1} />
      <Bar dataKey="fear" stackId="a" fill="#ff7300" stroke="#000" strokeWidth={1} barSize={50} fillOpacity={1} />
      <Bar dataKey="disgust" stackId="a" fill="#ff0000" stroke="#000" strokeWidth={1} barSize={50} fillOpacity={1} />
      <Bar dataKey="anger" stackId="a" fill="#ff3000" stroke="#000" strokeWidth={1} barSize={50} fillOpacity={1} />
    </BarChart>
  </ResponsiveContainer>
</CardContent>

      </Card>
    );
  }

  // Type Narrowing for individual analysis
const individualResults = results as {
  name: string;
  sentiment: "positive" | "negative" | "neutral";
  emotions: {
    sadness: number;
    joy: number;
    fear: number;
    disgust: number;
    anger: number;
  };
  combinedStatement: string;
};

  // For individual sentiment analysis, display results as usual using AreaChart
  const dominantEmotion = Object.entries(individualResults.emotions).reduce(
    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ["none", 0]
  )[0];
  
  const videoRecommendation =
    emotionToYouTube(dominantEmotion) || sentimentToYouTube(individualResults.sentiment);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Combined Statement:</h3>
          <p className="text-gray-700 dark:text-gray-300">{individualResults.combinedStatement}</p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Sentiment:</h3>
          <p className="text-2xl">
            {sentimentEmoji[individualResults.sentiment]} ({individualResults.sentiment})
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Emotions:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={Object.entries(individualResults.emotions).map(([emotion, value]) => ({
                name: emotion,
                value,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {videoRecommendation && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Recommended Video:</h3>
            <a
              href={videoRecommendation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2"
            >
              <img
                src={videoRecommendation.thumbnail}
                alt={`Recommended video for ${dominantEmotion}`}
                className="w-64 h-36 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow"
              />
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              Video recommendation based on {dominantEmotion} or overall sentiment (
              {individualResults.sentiment}).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
  
};

export default SentimentVisualization;
