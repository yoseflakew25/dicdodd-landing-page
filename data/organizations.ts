export interface Organization {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  description: string;
  category: string;
  status: "Active" | "Coming Soon";
  website?: string;
}

export const organizations: Organization[] = [
  {
    id: "lpi",
    name: "Life & Peace Institute (LPI)",
    shortName: "LPI",
    logo: "/images/partners/life and peace.jpg",
    description:
      "International organization promoting peace and human rights",
    category: "International Partner",
    status: "Active",
    website: "https://www.life-peace.org",
  },
  {
    id: "mop",
    name: "Ministry of Peace",
    shortName: "MoP",
    logo: "/images/partners/Ministry_of_Peace.png",
    description:
      "Ethiopian government ministry for peace and reconciliation",
    category: "Government Partner",
    status: "Active",
  },
  {
    id: "acso",
    name: "Authority for Civil Society Organizations (ACSO)",
    shortName: "ACSO",
    logo: "/images/partners/Authority for Civil Society Organizations (ACSO).jpg",
    description:
      "Regulatory body for civil society organizations in Ethiopia",
    category: "Regulatory Body",
    status: "Active",
  },
  {
    id: "nebe",
    name: "National Election Board of Ethiopia (NEBE)",
    shortName: "NEBE",
    logo: "/images/partners/National Election Board of Ethiopia (NEBE).jpg",
    description:
      "Official electoral commission of Ethiopia",
    category: "Government Partner",
    status: "Active",
    website: "https://www.nebe.org.et",
  },
  {
    id: "local-gov",
    name: "Local Government Bureaus",
    shortName: "Local Gov",
    logo: "/images/partners/Local Government Bureaus.svg",
    description:
      "Regional and local government administrative bodies",
    category: "Government Partner",
    status: "Active",
  },
  {
    id: "media",
    name: "Media Partners",
    shortName: "Media",
    logo: "/images/partners/Media Partners.jpeg",
    description:
      "Television and radio stations including Dire Television",
    category: "Media Partner",
    status: "Active",
  },
];
