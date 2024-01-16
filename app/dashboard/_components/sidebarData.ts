import {
  CardPos,
  Chart,
  Chart21,
  Code,
  DocumentFilter,
  Icon,
  Setting2,
  UserTag,
} from "iconsax-react";

export type SidebarData = {
  name: string;
  link: string;
  icon: Icon;
  group: string;
};

export const sidebarData: SidebarData[] = [
  {
    name: "Dashboard",
    link: "/dashboard/home",
    icon: Chart21,
    group: "Dashboard",
  },
  {
    name: "Users & Roles",
    link: "/dashboard/users",
    icon: UserTag,
    group: "Management",
  },
  {
    name: "Payment History",
    link: "/dashboard/payment-history",
    icon: CardPos,
    group: "Management",
  },
  {
    name: "Invoices",
    link: "/dashboard/invoices",
    icon: DocumentFilter,
    group: "Management",
  },
  {
    name: "API Keys",
    link: "/dashboard/api-keys",
    icon: Code,
    group: "Management",
  },
  {
    name: "Subscription",
    link: "/dashboard/subscription",
    icon: CardPos,
    group: "Administration",
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: Setting2,
    group: "Administration",
  },
];
