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
              src="https://img.pikbest.com/photo/20240608/a-young-boy-is-doctor_10585666.jpg!w700wp"
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
        <Card className="absolute top-[215px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 ">
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
        <Card className="absolute w-[330px] -right-[1px] -left-[100px]bottom-[35px] top-[270px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
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
