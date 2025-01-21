import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import BoxReveal from "@/components/ui/box-reveal";

export const Hero = () => {
  const scrollToUsers = () => {
    const sponsorsSection = document.getElementById("users");
    if (sponsorsSection) {
      sponsorsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-0 md:py-5 gap-10 min-h-screen">
      {/* Left Section */}
      <div className="text-center lg:text-start space-y-6">
        {/* Heading Section */}
        <main className="text-5xl md:text-6xl font-bold">
          <BoxReveal boxColor={"#F596D3"} duration={1}>
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                Sentiment Analysis
              </span>{" "}
              Mental Wellness
            </h1>
          </BoxReveal>

          <BoxReveal boxColor={"#61DAFB"} duration={1} delay={0.2}>
            <h2 className="inline">
              for{" "}
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Balance Seekers
              </span>
            </h2>
          </BoxReveal>
        </main>

        {/* Description Section */}
        <BoxReveal boxColor={"#F596D3"} duration={1} delay={0.3}>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Leverage AI-driven sentiment analysis to identify mental health
            disorders with precision. By analyzing textual data and social
            media interactions, our solution empowers mental health
            practitioners with early diagnosis, valuable insights, and focused
            treatments to improve mental wellness outcomes.
          </p>
        </BoxReveal>

        {/* Button Section */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center md:justify-start">
          <BoxReveal boxColor={"#5046e6"} duration={1} delay={0.3}>
            <Button className="w-full md:w-auto px-8" onClick={scrollToUsers}>
              Get Started
            </Button>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1} delay={0.5}>
            <a
              rel="noreferrer noopener"
              href="https://github.com/virajmandlik/IBM-Sentiment-Analysis"
              target="_blank"
              className={`${buttonVariants({
                variant: "outline",
              })} w-full md:w-auto px-6 flex items-center justify-center`}
            >
              Github Repository
              <GitHubLogoIcon className="ml-2 w-5 h-5" />
            </a>
          </BoxReveal>
        </div>
      </div>

      {/* Right Section - Hero Cards */}
      <div className="z-10 flex justify-center items-center h-full min-h-[600px] lg:min-h-[800px]">
        <BoxReveal boxColor={"#61DAFB"} duration={1.2}>
          <HeroCards />
        </BoxReveal>
      </div>

      {/* Decorative Shadow Effect */}
      <div className="absolute inset-0 z-[-1]">
        <BoxReveal boxColor={"#D247BF"} duration={1.5} delay={1}>
          <div className="rounded-full blur-3xl bg-gradient-to-r from-[#45294e] via-[#5e2929] to-[#e41111] w-[200%] h-[200%] -translate-x-[50%] -translate-y-[50%]" />
        </BoxReveal>
      </div>
    </section>
  );
};
