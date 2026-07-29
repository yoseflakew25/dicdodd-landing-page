export interface FeaturedVideo {
  id: number;
  title: string;
  youtube: string;
}

export const featuredVideos: FeaturedVideo[] = [
  { id: 1, title: "DICDO Peacebuilding in Action", youtube: "https://www.youtube.com/watch?v=wjFu-pIMoXw" },
  { id: 2, title: "Empowering Women Through Vocational Training", youtube: "https://www.youtube.com/watch?v=TM7kuszz7K4" },
  { id: 3, title: "Community Dialogue & Reconciliation", youtube: "https://www.youtube.com/watch?v=bEKtsJp4Jis" },
  { id: 4, title: "Education Support for Vulnerable Children", youtube: "https://www.youtube.com/watch?v=3JnTYAwhol0" },
  { id: 5, title: "WASH Program: Clean Water Access", youtube: "https://www.youtube.com/watch?v=qDwlrvp4Ibo" },
  { id: 6, title: "Youth Leadership Development", youtube: "https://www.youtube.com/watch?v=InTR4CRuKXo" },
];
