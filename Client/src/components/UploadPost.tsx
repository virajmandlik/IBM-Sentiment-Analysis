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
  const [emotionData, setEmotionData] = useState<any | null>(null);
  const [sentimentFeedback, setSentimentFeedback] = useState<string | null>(null);

  const [isLoadingSentiment, setIsLoadingSentiment] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  // Handle post upload
  const handlePost = async () => {
    setUploadFeedback(null);
    setIsLoadingPost(true);

    if (!imageUrl || !caption) {
      setUploadFeedback("Image URL and caption are required.");
      setIsLoadingPost(false);
      return;
    }

    if (!isValidUrl(imageUrl)) {
      setUploadFeedback("Please enter a valid image URL.");
      setIsLoadingPost(false);
      return;
    }

    if (
      (emotionData?.sadness && emotionData.sadness > 0.2) ||
      (emotionData?.fear && emotionData.fear > 0.2) ||
      (emotionData?.disgust && emotionData.disgust > 0.2) ||
      (emotionData?.anger && emotionData.anger > 0.2)
    ) {
      setUploadFeedback("Please provide a more appropriate caption before posting.");
      setIsLoadingPost(false);
      return;
    }

    try {
      const response = await fetch("https://ibm-sentiment-analysis-3gdr.onrender.com/api/instagram/post", {
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
    } finally {
      setIsLoadingPost(false);
    }
  };

  const handleCheckSentiment = async () => {
    if (!caption) {
      setSentimentFeedback("Please enter a caption to check sentiment.");
      return;
    }

    setIsLoadingSentiment(true);
    try {
      const response = await fetch("https://ibm-sentiment-analysis-3gdr.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkCaption: caption }),
      });

      const data = await response.json();
      if (response.ok) {
        setSentiment(data.sentiment);
        setEmotionData(data.emotions);
        setSentimentFeedback("Sentiment analysis successful!");
      } else {
        setSentimentFeedback("Failed to analyze sentiment.");
      }
    } catch (error) {
      setSentimentFeedback("Something went wrong. Please try again.");
    } finally {
      setIsLoadingSentiment(false);
    }
  };

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      case "neutral":
        return "text-blue-500";
      default:
        return "text-violet-500";
    }
  };

  const isPostButtonDisabled = () => {
    return sentiment !== "positive" || !caption || !imageUrl || isLoadingPost;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 gap-8 p-10">
      {/* Phone Preview */}
      <div className="w-[320px] h-[600px] border shadow-lg rounded-3xl overflow-hidden bg-white">
        <Iphone15Pro
          className="w-full h-full"
          src={imageUrl || "https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2022/02/shutterstock_1942284763-770x515.jpg"}
        >
          <div className="flex flex-col h-full bg-transparent">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center p-3">
              <h2 className="text-lg font-semibold">Phone Screen</h2>
            </div>

            {caption && (
              <div className="p-4 text-gray-700 text-center italic">
                "{caption}"
              </div>
            )}

            {sentiment && (
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  Sentiment: <span className={getSentimentColor(sentiment)}>{sentiment}</span>
                </p>
              </div>
            )}
          </div>
        </Iphone15Pro>
      </div>

      {/* Controls Section */}
      <div className="w-[400px] space-y-6 py-11">
      <div className="bg-violet-50 p-6 rounded-xl border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-600 mb-4">🌟 Sentify Protects Minds</h2>
          <div className="space-y-4 text-sm text-violet-700">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Our AI-powered analysis using IBM's advanced sentiment detection helps create a positive social media environment</span>
            </div>
            
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
              </svg>
              <span>Prevent unintended emotional impact by analyzing potential negative emotions before posting</span>
            </div>

            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              <span>Promote mindful sharing while maintaining your creative expression</span>
            </div>
          </div>
        </div>


        <h2 className="text-2xl font-bold text-violet-600">Upload Your Post</h2>

        <div>
          <Label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-violet-600">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
          />
          {!isValidUrl(imageUrl) && imageUrl && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid URL.</p>
          )}
        </div>

        <div>
          <Label htmlFor="caption" className="block mb-2 text-sm font-medium text-violet-600">
            Caption
          </Label>
          <Input
            id="caption"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <Button
          variant="outline"
          onClick={handleCheckSentiment}
          className="w-full bg-violet-100 hover:bg-violet-200 text-violet-600 font-semibold py-2 rounded-lg"
          disabled={isLoadingSentiment}
        >
          {isLoadingSentiment ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </div>
          ) : (
            "Check Sentiment"
          )}
        </Button>

        {sentimentFeedback && (
          <p className={`text-sm ${sentimentFeedback.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            <span className="text-violet-600">{sentimentFeedback}</span>
            {sentiment && (
              <div className={getSentimentColor(sentiment)}>
                Your Caption is having {sentiment} sentiment
              </div>
            )}
          </p>
        )}

        <Button
          onClick={handlePost}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg"
          disabled={isPostButtonDisabled()}
        >
          {isLoadingPost ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </div>
          ) : (
            "Upload Post"
          )}
        </Button>

        {uploadFeedback && (
          <p className={`text-sm ${uploadFeedback.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {uploadFeedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default Iphone15ProDemo;