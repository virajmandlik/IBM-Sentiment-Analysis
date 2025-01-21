import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://i.pravatar.cc/150?img=32",
    name: "Sarah Williams",
    userName: "@sarah_insights",
    comment:
      "Sentify transformed the way I manage my mental health. The AI's insights are accurate and actionable, helping me feel more in control of my emotions.",
  },
  {
    image: "https://i.pravatar.cc/150?img=22",
    name: "James Carter",
    userName: "@james_carterAI",
    comment:
      "The ability to analyze my feelings through simple text input is incredible. Sentify is truly a game-changer for mental wellness enthusiasts.",
  },
  {
    image: "https://i.pravatar.cc/150?img=46",
    name: "Emily Johnson",
    userName: "@emily_journey",
    comment:
      "As a mental health counselor, Sentify's data-driven insights allow me to provide more personalized care to my clients. A must-have tool for professionals!",
  },
  {
    image: "https://i.pravatar.cc/150?img=64",
    name: "Mark Thompson",
    userName: "@mark_researcher",
    comment:
      "Sentify's AI sentiment analysis provides unparalleled accuracy. The ability to process social media interactions has been invaluable for my research.",
  },
  {
    image: "https://i.pravatar.cc/150?img=18",
    name: "Sophia Hernandez",
    userName: "@sophia_hdz",
    comment:
      "The early diagnostic capabilities of Sentify's AI have helped me recognize and address mental health concerns before they escalate. Highly recommended!",
  },
  {
    image: "https://i.pravatar.cc/150?img=10",
    name: "Michael Lee",
    userName: "@michael_tech",
    comment:
      "The simplicity of Sentify combined with its advanced AI makes it accessible to everyone. It's like having a personal mental health assistant at your fingertips!",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        See How{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Sentify{" "}
        </span>
        Empowers Lives
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Discover how Sentify is revolutionizing mental wellness with AI-driven
        sentiment analysis. Here's what our users have to say:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt={`${name}'s avatar`}
                    src={image}
                  />
                  <AvatarFallback>
                    {name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
