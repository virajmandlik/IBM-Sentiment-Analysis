import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design",
    description:
      "Our platform is designed to work seamlessly across all devices, ensuring your website looks great on desktops, tablets, and smartphones. Whether you're browsing on a large screen or a small mobile device, the experience is optimized for you.",
    image: image4,
  },
  {
    title: "Intuitive User Interface",
    description:
      "Navigating our platform is a breeze. We've crafted an intuitive interface that makes it easy for users of all experience levels to engage with the features. With well-organized menus, interactive elements, and a clean layout, you’ll find everything you need with just a few clicks.",
    image: image3,
  },
  {
    title: "AI-Powered Insights",
    description:
      "Harness the power of artificial intelligence to gain actionable insights. Our AI tools analyze your data to provide smart recommendations, trends, and forecasts, empowering you to make data-driven decisions that enhance productivity and growth.",
    image: image,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Contact form",
  "Our team",
  "Responsive design",
  "Minimalist",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
