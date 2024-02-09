export const optionsCategory = [
  {
    id: 1,
    value: "Advertisement and marketing",
    label: "Advertisement and marketing",
  },
  { id: 3, value: "Aerospace", label: "Aerospace" },
  { id: 4, value: "Agriculture", label: "Agriculture" },
  { id: 5, value: "Construction", label: "Construction" },
  { id: 6, value: "Education", label: "Education" },
  { id: 7, value: "Energy ", label: "Energy " },
  { id: 8, value: "Entertainment ", label: "Entertainment " },
  { id: 9, value: "Fashion ", label: "Fashion " },
  { id: 10, value: "Finance and economics", label: "Finance and economics" },
  { id: 11, value: "Food and Beverage", label: "Food and Beverage" },
  { id: 12, value: "Healthcare", label: "Healthcare" },
  { id: 13, value: "Hospitality", label: "Hospitality" },
  { id: 14, value: "Manufacturing", label: "Manufacturing" },
  { id: 15, value: "Media and news", label: "Media and news" },
  { id: 16, value: "Mining", label: "Mining" },
  { id: 17, value: "Pharmaceutical ", label: "Pharmaceutical " },
  { id: 18, value: "Technology", label: "Technology" },
  { id: 19, value: "Telecommunications", label: "Telecommunications" },
  { id: 20, value: "Transportation", label: "Transportation" },
  { id: 21, value: "Others", label: "Others" },
];

export const accountQuestions = [
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
