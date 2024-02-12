import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home2 } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import HomeNav from "../_components/HomeNav";

interface QuestionsProps {
  title: string;
  answer: string;
}

interface TabProps {
  tabQuestions: QuestionsProps[];
}

const accountQuestions = [
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
const invoiceQuestions = [
  {
    title: "How long are invoices accessible in the system?",
    answer:
      "All invoices are stored for the lifetime of your active subscription, so you have perpetual historical access to your billing and payment data. You may also export invoice reports as needed for your records.",
  },
  {
    title: "Can I access invoices if my subscription is cancelled?",
    answer:
      "If you cancel, existing invoices remain available in a read-only state for 30 days. Afterward invoices are removed but can be provided upon request with proof of past membership.",
  },
];
const approvalQuestions = [
  {
    title: "What details do you need to approve new accounts?",
    answer:
      "Our automated account approval requires your business legal name, tax ID numbers, business incorporation documents, and contact information. For fast validation, double check details match official registrations.",
  },
  {
    title: "How long does the new account approval process take?",
    answer:
      "The majority of electronically submitted verification applications are approved within 24 hours or less. Manual reviews for complex organizations may take 2-3 business days in some rare cases.",
  },
  {
    title: "What steps should I take to expedite account approval?",
    answer:
      "Completing fields accurately with details matching your official business registration documents is key for fast review. Using online document uploads vs faxes enables automation. Calling our support team can also help if you need assistance.",
  },
];
const subscriptionQuestions = [
  {
    title: "What subscription plans do you offer?",
    answer:
      "We offer monthly and annual plans at Starter, Business, and Enterprise tiers. Each tier builds on the tier below with higher allowances for API requests, data storage, integrations, and premium features for scaling usage.",
  },
  {
    title: "Is there a free trial for the subscriptions?",
    answer:
      "Yes, all our subscription plans come with a 14-day free trial period. This allows you to test run our platform with full access before you commit or pay. If you need more time to evaluate we can extend trial periods up to 30 days in some cases.",
  },
  {
    title: "Can I upgrade/downgrade my subscription plan?",
    answer:
      "You can easily upgrade to higher subscription tiers as your usage and needs evolve. Downgrades are allowed as well via our self-service billing portal. We will pro-rate credits for the price difference when changing plans.",
  },
];

const userQuestions = [
  {
    title: "How do I add team members and users?",
    answer:
      "From the account settings, admins can invite new team members via email address. Upon signup, you can assign permission roles like Admin, Analyst, Developer etc with customized access controls per user.",
  },
  {
    title: "Is there a limit on number of user accounts?",
    answer:
      "Our Enterprise tier allows unlimited user accounts. Lower tiers allow up to 50 or 100 users. If you reach account limitations, get in touch with our sales team as higher custom plans are available.",
  },
];

const Questions = ({}) => {
  const TabQuestions: FC<TabProps> = ({ tabQuestions }) => {
    return (
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 gap-y-10 pt-5 lg:px-10">
        <div className="flex-1 text-left order-2 lg:order-1">
          <Accordion type="single" collapsible>
            {tabQuestions.map((question, index) => (
              <AccordionItem key={index} value={`item ${index}`}>
                <AccordionTrigger className=" text-left">
                  {question.title}
                </AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-[#F0F4F9] text-dark text-center p-5 lg:p-10 min-h-[calc(100vh_-_80px)]">
      <div className="lg:container">
        <HomeNav text="Help and Support" />
        <h3 className=" text-4xl font-bold mb-2.5">Help and Suport</h3>
        <h4 className=" text-xl mb-2.5 pb-6">
          Find answers to frequently asked qestions before signing up for an
          account
        </h4>

        <Tabs defaultValue="account" className=" p-8 rounded bg-white ">
          <TabsList className=" overflow-x-auto w-full overflow-y-clip h-auto justify-start">
            <TabsTrigger value="account">Account-based Help</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="user">User Management</TabsTrigger>
            <TabsTrigger value="approval">Account Approval</TabsTrigger>
            <TabsTrigger value="invoice">Invoice Management</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <TabQuestions tabQuestions={accountQuestions} />
          </TabsContent>
          <TabsContent value="subscription">
            <TabQuestions tabQuestions={subscriptionQuestions} />
          </TabsContent>
          <TabsContent value="user">
            <TabQuestions tabQuestions={userQuestions} />
          </TabsContent>
          <TabsContent value="approval">
            <TabQuestions tabQuestions={approvalQuestions} />
          </TabsContent>
          <TabsContent value="invoice">
            <TabQuestions tabQuestions={invoiceQuestions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Questions;
