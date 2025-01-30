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
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AnxietyYoutubeLink,
  DepressionYoutubeLink,
  StressYoutubeLink,
  SuicidalYoutubeLink,
  NormalYoutubeLink,
  BipolarYoutubeLink,
} from "./YoutubeConfig";

// Type definitions
interface IndividualResult {
  combinedStatement: string;
  sentiment: string;
  emotions: Record<string, number>;
}

interface CsvResult {
  name: string;
  age: string;
  sentiment: string;
  emotions: Record<string, number>;
  type: string;
  country: string;
  city: string;
  state: string;
  gender: string;
}

type Results = IndividualResult | CsvResult[];

interface SentimentVisualizationProps {
  results: Results;
}

const sentimentEmoji: Record<string, string> = {
  positive: "😊",
  negative: "😞",
  neutral: "😐",
};

const emotionColors: Record<string, string> = {
  sadness: "#7774d8",
  joy: "#82ca9d",
  fear: "#ff7300",
  disgust: "#ff0000",
  anger: "#ff3000",
};

const emotionToYouTube = (emotion: string) => {
  switch (emotion) {
    case "sadness":
      return DepressionYoutubeLink;
    case "joy":
      return NormalYoutubeLink;
    case "fear":
      return AnxietyYoutubeLink;
    case "disgust":
      return StressYoutubeLink;
    case "anger":
      return SuicidalYoutubeLink;
    default:
      return BipolarYoutubeLink;
  }
};

const SentimentVisualization: React.FC<SentimentVisualizationProps> = ({
  results,
}) => {
  // Check if results are array (CSV) or object (individual)
  const isCsvData = Array.isArray(results);

  // Individual Visualization
  const renderIndividualAnalysis = (result: IndividualResult) => (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center mb-4">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Combined Statement</h3>
          <blockquote className="pl-4 border-l-4 border-gray-200 dark:border-gray-700 italic">
            "{result.combinedStatement}"
          </blockquote>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overall Sentiment</h3>
          <div
            className={`text-xl font-bold ${
              result.sentiment === "positive"
                ? "text-green-500"
                : result.sentiment === "negative"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {result.sentiment?.toUpperCase()}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Emotional Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(result.emotions).map(([emotion, score]) => {
              const percentage = Math.round(score * 100);
              return (
                <div key={emotion} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{emotion}</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                    indicatorClassName={emotionColors[emotion]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // CSV Visualization
  const renderCsvAnalysis = (patients: CsvResult[]) => {
    const processedData = patients.map((user) => ({
      ...user,
      sadness: user.emotions.sadness,
      joy: user.emotions.joy,
      fear: user.emotions.fear,
      disgust: user.emotions.disgust,
      anger: user.emotions.anger,
    }));

    const getDominantEmotion = (emotions: Record<string, number>) => {
      const entries = Object.entries(emotions);
      return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    };

    return (
      <div className="space-y-6">
        {/* Demographic Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Total Patients</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {patients.length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Avg. Age</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {(
                patients.reduce((sum, user) => sum + parseInt(user.age), 0) /
                patients.length
              ).toFixed(1)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Top Country</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {[...new Set(patients.map((user) => user.country))][0]}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Common Issue</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {[...new Set(patients.map((user) => user.type))][0]}
            </CardContent>
          </Card>
        </div>

        {/* Emotional Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emotional Distribution Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {Object.entries(emotionColors).map(([emotion, color]) => (
                  <Bar
                    key={emotion}
                    dataKey={emotion}
                    stackId="a"
                    fill={color}
                    stroke="#000"
                    strokeWidth={1}
                    barSize={50}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto relative">
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="sticky top-0 bg-background z-10 border-b">
                      <th className="text-left p-2 text-sm">Name</th>
                      <th className="text-left p-2 text-sm">Age</th>
                      <th className="text-left p-2 text-sm">Sentiment</th>
                      <th className="text-left p-2 text-sm">Type</th>
                      <th className="text-left p-2 text-sm">Location</th>
                      <th className="text-left p-2 text-sm">Gender</th>
                      <th className="text-left p-2 text-sm">Dominant Emotion</th>
                      <th className="text-left p-2 text-sm">Emotion Scores</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedData.map((user, index) => {
                      const dominantEmotion = getDominantEmotion(user.emotions);
                      return (
                        <tr
                          key={index}
                          className="border-b even:bg-muted/50 hover:bg-muted/30"
                        >
                          <td className="p-2 text-sm">{user.name}</td>
                          <td className="p-2 text-sm">{user.age}</td>
                          <td className="p-2 text-sm">
                            <span className="inline-flex items-center gap-1">
                              {sentimentEmoji[user.sentiment]}
                              {user.sentiment}
                            </span>
                          </td>
                          <td className="p-2 text-sm">{user.type}</td>
                          <td className="p-2 text-sm">{`${user.city}, ${user.state}, ${user.country}`}</td>
                          <td className="p-2 text-sm">{user.gender}</td>
                          <td className="p-2 text-sm">
                            <a
                              href={emotionToYouTube(dominantEmotion)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {dominantEmotion}
                            </a>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex flex-col text-xs">
                              {Object.entries(user.emotions).map(
                                ([emotion, score]) => (
                                  <div
                                    key={emotion}
                                    className="flex justify-between gap-2"
                                  >
                                    <span>{emotion}:</span>
                                    <span>{(score * 100).toFixed(1)}%</span>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      {isCsvData ? (
        renderCsvAnalysis(results as CsvResult[])
      ) : (
        renderIndividualAnalysis(results as IndividualResult)
      )}
    </>
  );
};

export default SentimentVisualization;