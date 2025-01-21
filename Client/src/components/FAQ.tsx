import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this platform free to use?",
    answer: "Yes, we provide free access to many of our core features with no cost involved.",
    value: "item-1",
  },
  {
    question: "How do I start using the platform?",
    answer:
      "Simply sign up with your email, and you'll have access to our dashboard where you can explore features and tools to help you get started.",
    value: "item-2",
  },
  {
    question: "Can I upgrade my account for more features?",
    answer:
      "Yes, we offer premium plans that provide additional features, insights, and customization options. Visit our 'Pricing' page to learn more about the available plans.",
    value: "item-3",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 email support, as well as a detailed knowledge base for self-help. For urgent issues, you can also chat with our support team directly.",
    value: "item-4",
  },
  {
    question: "Is my data secure with your platform?",
    answer:
      "Absolutely. We follow industry-standard encryption protocols to ensure your data is secure. Your privacy is our top priority, and we are GDPR compliant.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
