export interface Experience {
  company: string;
  role: string;
  location: string;
  country: string;
  milestoneYear: string;
  careerContext: string;
  startDate: string;
  endDate: string | null;
  periodLabel?: string;
  current: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}
