export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  homepageSummary?: string;
  businessProblem: string;
  solution: string;
  role: string;
  technicalFocus: string;
  category: string;
  year?: number;
  technologies: string[];
  featured: boolean;
  image: string;
  homepagePriority?: number;
  highlight?: string;
  visuals?: Array<{ type: string; label: string; src?: string; alt?: string }>;
}
