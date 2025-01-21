import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Viraj from "../assets/Viraj-Photo.jpeg";
import Hanumant from "../assets/Hanumant-Photo.png";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: Viraj,
    name: "Viraj Mandlik",
    position: "Mentor 1",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://mitaoe.ac.in/assets/images/comp/sunita-barve.png",
    name: "Dr.S.S.Barve",
    position: "Faculty Mentor",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
 
  {
    imageUrl: Hanumant,
    name: "Hanumant Kakde",
    position: "Member 2",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "Facebook":
        return <Facebook size="20" />;
      case "Instagram":
        return <Instagram size="20" />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center max-w-2xl">
        Meet our team of talented and driven individuals, dedicated to excellence in every project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center w-full">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 flex flex-col justify-center items-center text-center w-72 p-4 relative"
            >
              <CardHeader className="relative flex flex-col items-center pb-4">
                <img
                  src={imageUrl}
                  alt={`${name} - ${position}`}
                  className="absolute -top-16 rounded-full w-24 h-24 object-cover border-4 border-white"
                />
                <div className="mt-12">
                  <CardTitle>{name}</CardTitle>
                  <CardDescription className="text-primary">{position}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <p>
                  {name === "Viraj Mandlik" &&
                    "Viraj specializes in both frontend and backend development, system design, database management, and building robust models for projects."}
                  {name === "Hanumant Kakde" &&
                    "Hanumant excels in backend development and database management, ensuring smooth and efficient systems."}
                  {name === "Dr.S.S.Barve" &&
                    "Dr. Barve mentors the team with his expertise, guiding and inspiring them to achieve excellence in their work."}
                </p>
              </CardContent>

              <CardFooter className="flex space-x-2 mt-4">
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <a
                    key={name}
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
