export interface NewsArticle {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  content: string;
  image?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "DICDO Recognized as Accredited Election Observer by NEBE",
    subtitle: "A Major Milestone for Democratic Participation",
    date: "January 2024",
    category: "Recognition",
    content:
      "DICDO has been officially recognized by the National Election Board of Ethiopia (NEBE) as an accredited election observer organization. This recognition allows DICDO to deploy observers across six zones (Konso, South Omo, Wolayita, Gamo, Gedeo, Gofa) and five special districts (Burji, Basketo, Ale, Amaro, Dirashe) during the referendum process. A total of 5,274 observers are expected to be deployed throughout the full election cycle.",
  },
  {
    id: 2,
    title: "Peacebuilding Training Empowers 30+ Community Leaders in Dire Dawa",
    subtitle: "Youth, Women, and Elders Unite for Peace",
    date: "2024",
    category: "Peacebuilding",
    content:
      "In 2024, with support from the Life & Peace Institute (LPI), DICDO trained over 30 community leaders—including youth, women, elders, and religious figures—on peacebuilding and conflict prevention in Dire Dawa. The initiative led to the formation of a proposed Peace Council and was covered in multiple languages on Dire Television, showcasing the community's commitment to sustainable peace.",
  },
  {
    id: 3,
    title: "Empowering Refugee Communities Through Vocational Training",
    subtitle: "50+ Women Trained in Sustainable Livelihoods",
    date: "2024",
    category: "Empowerment",
    content:
      "In refugee camps, DICDO went beyond providing food and water. We created safe spaces for children, provided vocational training for women—including Asha, who is now a self-sufficient tailor—and promoted peaceful dialogue and democratic involvement through free and fair elections. These efforts continue to transform lives and build hope in displaced communities.",
  },
  {
    id: 4,
    title: "DICDO Expands Community Programs Across 15 Communities",
    subtitle: "Holistic Development Reaches More Regions",
    date: "2025",
    category: "Expansion",
    content:
      "DICDO continues to expand its reach across Ethiopia, now serving 15 communities with comprehensive development programs. From peacebuilding workshops to education support, women's empowerment, and WASH initiatives, our holistic approach addresses both immediate needs and long-term sustainable development. We remain committed to empowering communities to create their own solutions for lasting change.",
  },
  {
    id: 5,
    title: "Collaborating with International Partners for Greater Impact",
    subtitle: "Strengthening Partnerships for Sustainable Development",
    date: "2025",
    category: "Partnership",
    content:
      "DICDO continues to strengthen its collaboration with international organizations, including the Life & Peace Institute (LPI), to amplify our impact across Ethiopian communities. Through these partnerships, we leverage collective expertise, resources, and networks to create greater impact in peacebuilding, education, and sustainable development initiatives nationwide.",
  },
];
