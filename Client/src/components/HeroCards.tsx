import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  const scrollToUsers = () => {
    const sponsorsSection = document.getElementById("users");
    if (sponsorsSection) {
      sponsorsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Add padding/margin above the cards */}
      <div className="hidden lg:flex flex-row flex-wrap gap-10 relative w-[700px] h-[600px] mt-16">
        {/* Testimonial */}
        <Card className="absolute w-[340px] -top-[10px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="flex flex-row items-center gap-6 pb-2">
            <Avatar>
              <AvatarImage alt="" src="https://github.com/shadcn.png" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <CardTitle className="text-lg">Viraj Mandlik</CardTitle>
              <CardDescription>@virajmandlik</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            The interface is user-friendly, and the sentiment analysis is highly accurate!
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <img
              src="data:image/jpeg;base64,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"
              alt="user avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-center">Raj Sharma</CardTitle>
            <CardDescription className="font-normal text-primary">
              MindCare Specialist
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center pb-2">
            <p>Quick, accurate, and easy-to-use sentiment analysis tool!</p>
          </CardContent>

          <CardFooter>
            <div>
              <a
                rel="noreferrer noopener"
                href="https://github.com/virajmandlik/IBM-Sentiment-Analysis"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">Github icon</span>
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
              <a
                rel="noreferrer noopener"
                href="https://github.com/virajmandlik/IBM-Sentiment-Analysis"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">X icon</span>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground w-5 h-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
            </div>
          </CardFooter>
        </Card>

        {/* Pricing */}
        <Card className="absolute top-[170px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 ">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Free
              <Badge variant="secondary" className="text-sm text-primary">
                Mental health Check
              </Badge>
            </CardTitle>

            <CardDescription>
              Taking care of your mental health is an act of self-love.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full" onClick={scrollToUsers}>
              Start
            </Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {["Answer the questions", "Get Statics of your data", "AI Enabled accuracy"].map(
                (benefit: string) => (
                  <span key={benefit} className="flex">
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                )
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Service */}
        <Card className="absolute w-[350px] -right-[10px] bottom-[35px] top-[270px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Light & dark mode</CardTitle>
              <CardDescription className="text-md mt-2">
                Experience a seamless transition between light and dark modes with ease.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
