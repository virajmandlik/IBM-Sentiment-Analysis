"use client";

import { PieChart, Pie, Tooltip, Cell } from "recharts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                  tickFormatter={valueToSentiment} // Use this to display sentiment labels
                  domain={[0, 8]} // Set the range of the Y-axis
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

    return (
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between">
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
        </CardContent>
      </Card>
    );
  }
};

export default SentimentVisualization;
