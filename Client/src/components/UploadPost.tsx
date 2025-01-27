import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Iphone15Pro from "@/components/ui/iphone-15-pro";

const Iphone15ProDemo: React.FC = () => {
  const location = useLocation();
  const { username, password } = location.state || {};

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const [sentiment, setSentiment] = useState<string | null>(null);
  const [emotionData, setEmotionData] = useState<any | null>(null); // Changed type to any for emotion data
  const [sentimentFeedback, setSentimentFeedback] = useState<string | null>(null);

  // Handle post upload
  const handlePost = async () => {
    setUploadFeedback(null);

    if (!imageUrl || !caption) {
      setUploadFeedback("Image URL and caption are required.");
      return;
    }

    // Check if any emotion exceeds threshold
    if (
      (emotionData?.sadness && emotionData.sadness > 0.2) ||
      (emotionData?.fear && emotionData.fear > 0.2) ||
      (emotionData?.disgust && emotionData.disgust > 0.2) ||
      (emotionData?.anger && emotionData.anger > 0.2)
    ) {
      setUploadFeedback("Please provide a more appropriate caption before posting.");
      return;
    }

    try {
      const response = await fetch("https://ibm-sentiment-analysis-back.vercel.app/api/instagram/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, imageUrl, caption }),
      });

      const data = await response.json();
      if (response.ok) {
        setUploadFeedback("Post uploaded successfully!");
      } else {
        setUploadFeedback(data.error || "Failed to upload post.");
      }
    } catch (error) {
      setUploadFeedback("Something went wrong. Please try again.");
    }
  };

  const handleCheckSentiment = async () => {
    if (!caption) {
      setSentimentFeedback("Please enter a caption to check sentiment.");
      return;
    }

    try {
      const response = await fetch("https://ibm-sentiment-analysis-back.vercel.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkCaption: caption }),
      });

      const data = await response.json();
      if (response.ok) {
        setSentiment(data.sentiment);
        setEmotionData(data.emotions); // Store emotion data in the state
        setSentimentFeedback("Sentiment analysis successful!");
      } else {
        setSentimentFeedback("Failed to analyze sentiment.");
      }
    } catch (error) {
      setSentimentFeedback("Something went wrong. Please try again.");
    }
  };

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500"; // Green for positive
      case "negative":
        return "text-red-500"; // Red for negative
      case "neutral":
        return "text-blue-500"; // Blue for neutral
      default:
        return "text-violet-500"; // Violet for others or unknown sentiment
    }
  };

  const isPostButtonDisabled = () => {
    // Button should be disabled if any emotion exceeds the threshold
    const isEmotionValid =
      (emotionData?.sadness && emotionData.sadness <= 0.2) &&
      (emotionData?.fear && emotionData.fear <= 0.2) &&
      (emotionData?.disgust && emotionData.disgust <= 0.2) &&
      (emotionData?.anger && emotionData.anger <= 0.2);

    return !isEmotionValid || !caption || !imageUrl;
  };

  return (
    <div className="flex items-start justify-center h-screen bg-grey-200 gap-4 p-4">
      {/* Phone Preview */}
      <Iphone15Pro
        className="w-[320px] h-[600px] border shadow-lg gap-x-1.5 mx-7"
        src={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhcV3LvAzoIQ97ftBWipnxBasGLsxq0JT7CA&s"} 
      >
        <div className="flex flex-col h-full bg-transparent">
          {/* Header */}
          <div className="bg-blue-500 text-white text-center p-2">
            <h2 className="text-lg font-semibold">Phone Screen</h2>
          </div>

          {/* Caption Display */}
          {caption && (
            <div className="p-4 text-gray-700 text-center italic">
              "{caption}"
            </div>
          )}

          {/* Sentiment Display */}
          {sentiment && (
            <div className="p-4 text-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-green-300">
                Sentiment: <span>{sentiment}</span>
              </p>
            </div>
          )}
        </div>
      </Iphone15Pro>

      {/* Controls Section */}
      <div className="w-[400px] space-y-6">
        <h2 className="text-lg font-semibold text-violet-600">Upload Your Post</h2>

        {/* Image URL Input */}
        <div>
          <Label htmlFor="imageUrl" className="block mb-1 text-sm font-medium text-violet-600">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Caption Input */}
        <div>
          <Label htmlFor="caption" className="block mb-1 text-sm font-medium text-violet-600">
            Caption
          </Label>
          <Input
            id="caption"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Sentiment Analysis */}
        <Button variant="outline" onClick={handleCheckSentiment} className="w-full">
          Check Sentiment
        </Button>
        {sentimentFeedback && (
          <p
            className={`text-sm ${sentimentFeedback.includes("successful") ? "text-green-500" : "text-red-500"}`}
          >
            <span className="text-violet-600">{sentimentFeedback}</span>
            {sentiment && (
              <div className={getSentimentColor(sentiment)}>
                Your Caption is having {sentiment} sentiment
              </div>
            )}
          </p>
        )}

        {/* Post Button */}
        <Button onClick={handlePost} className="w-full" disabled={isPostButtonDisabled()}>
          Upload Post
        </Button>
        {uploadFeedback && (
          <p
            className={`text-sm ${uploadFeedback.includes("successfully") ? "text-green-500" : "text-red-500"}`}
          >
            {uploadFeedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default Iphone15ProDemo;
