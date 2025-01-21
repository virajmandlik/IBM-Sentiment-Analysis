"use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

import pilot2 from "../assets/pilot2.png";



export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          {/* Image */}
          <img
            src={pilot2}
            alt="Pilot representing mental health assistance"
            className="w-[300px] object-contain rounded-lg"
          />

          {/* About Content */}
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Sentify
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Sentify is a state-of-the-art sentiment analysis platform
                designed to provide individuals and professionals with accurate
                insights into mental health patterns. Using advanced machine
                learning models, Sentify empowers users to track emotional
                trends, understand their mental state, and take proactive steps
                toward well-being.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                Our goal is to bridge the gap between traditional mental health
                evaluations and the power of AI-driven insights. Whether you're
                an individual seeking self-care or a professional analyzing
                patient data, Sentify is your trusted companion.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
