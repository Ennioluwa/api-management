import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { FC } from "react";

interface QuestionsProps {}

const questions = [
  {
    title: "What is an API and why should I care about your service?",
    answer:
      "An API (Application Programming Interface) allows different software systems to communicate with each other by calling features and services. Our API dashboard service makes it easy to manage, analyze, and optimize usage of APIs to improve reliability and efficiency. It provides insights into API performance, monitors errors, controls access and permissions, and can even generate client code.",
  },
  {
    title: "How do I generate new invoices via the API system?",
    answer:
      "You can programmatically generate new invoices by calling our RESTful Billing API. Simply make a POST request to the /v1/invoices endpoint with details like customer info, billing period, line items etc. Our API will automatically compile that into a professional-grade invoice PDF available for download.",
  },
  {
    title: "How many users can be added to a permission role?",
    answer:
      'There is no hard limit on the number of users that can be added to a role. Permission roles are intended to manage access for entire teams and groups of arbitrary size. For example you could have a "Developers" role with 50 developers, or an "Administrators" role with 10 admins. The system will scale to any reasonable number of role assignments needed.',
  },
  {
    title:
      "How many API requests can be made in a single period of initiation?",
    answer:
      "By default, we allow up to 100 API calls per second per user. If you intend to make requests at a much higher frequency, you can get in touch with our sales team to customize a higher tier plan allowing 500, 1000+ requests/sec or even unlimited use for heavy workloads.",
  },
  {
    title:
      "What is the importance of this application and how will it impact my business?",
    answer:
      "Efficient API management helps centralize control, reduce errors, comply with regulations, and optimize usage. Our platform provides data and tooling to reduce costs, maximize service uptime, and align technical capabilities with business goals. The insights it provides can directly inform strategic decisions.",
  },
  {
    title: "How many users can be created and added to an account?",
    answer:
      "Each account supports unlimited users without additional charges per user. The number of users you can invite and onboard for access is only limited by the capabilities of your overall account plan in terms of API requests, data retention, compute resources etc. Get in touch with us to understand scaling capabilities.",
  },
  {
    title: "How do I integrate payment gateway system to my current account?",
    answer:
      "Navigating to Integration Settings, you can configure connections for payment platforms like Stripe and PayPal with API keys. Our platform will handle routing invoice data, synchronizing status changes, and triggering notifications. Contact our support team if you need any assistance with the setup and onboarding.",
  },
];

const Questions: FC<QuestionsProps> = ({}) => {
  return (
    <div className="pt-10 lg:pt-20 bg-[#F0F4F9] text-dark text-center px-5 lg:px-10">
      <div className="lg:container">
        <h3 className=" text-4xl font-bold mb-2.5">
          Frequently Asked <span className=" text-bgPrimary  ">Questions</span>
        </h3>
        <h4 className=" text-xl mb-2.5">
          Get to find out some important questions answered to get you started
        </h4>
        <div className="relative h-[26px] flex-1 mx-auto">
          <Image src={"/svgs/curvedLine.svg"} alt="curved line" fill />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 gap-y-10 py-20">
          <div className="flex-1 text-left order-2 lg:order-1">
            <Accordion type="single" collapsible>
              {questions.map((question, index) => (
                <AccordionItem key={index} value={`item ${index}`}>
                  <AccordionTrigger className=" text-left">
                    {question.title}
                  </AccordionTrigger>
                  <AccordionContent>{question.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] lg:max-w-full mx-auto h-min order-1 lg:order-2">
            <Image
              src="/openAccountImage.png"
              alt="Open Account"
              fill
              className=" object-cover h-min"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
