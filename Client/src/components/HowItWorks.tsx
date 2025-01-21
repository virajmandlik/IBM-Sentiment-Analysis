import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Mental Health Monitoring",
    description:
      "Sentify provides continuous monitoring of emotional and mental well-being by analyzing sentiment trends over time, ensuring you stay informed about your mental health status.",
  },
  {
    icon: <MapIcon />,
    title: "Personalized Insights",
    description:
      "Through sentiment analysis, Sentify offers personalized recommendations, enabling individuals to understand their emotional health and take necessary steps for improvement.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalable for Professionals",
    description:
      "Sentify is not only for individuals but also for healthcare professionals. The platform allows mental health experts to analyze patient data at scale and provide evidence-based guidance.",
  },
  {
    icon: <GiftIcon />,
    title: "Engagement and Motivation",
    description:
      "By incorporating gamification, Sentify encourages users to stay engaged with their mental health journey through rewards and progress tracking, ensuring consistency and motivation.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Flow
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Sentify uses advanced sentiment analysis to help individuals and
        professionals understand emotional trends, take control of mental
        well-being, and make data-driven decisions for better mental health.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
