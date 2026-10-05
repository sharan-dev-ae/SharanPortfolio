import { siteConfig } from "@/config/site";

export interface AboutCard {
  title: string;
  body: string;
}

export interface Interest {
  name: string;
  detail: string;
}

export const aboutPreview = [
  `I’m ${siteConfig.developerName}, a ${siteConfig.role.toLowerCase()} currently working as a ${siteConfig.currentRole} at ${siteConfig.currentCompany} in ${siteConfig.location}.`,
  `Across ${siteConfig.engineeringExperience.toLowerCase()} in software and ${siteConfig.uaeExperience.toLowerCase()} in the UAE, I’ve focused on enterprise and business applications. My strongest stack is .NET, ASP.NET Core, Angular, TypeScript, and SQL Server.`,
] as const;

export const personalSnapshot = [
  { label: "Born", value: "09 September 2000" },
  { label: "Hometown", value: "Kozhikode, Kerala, India" },
  { label: "Based in", value: siteConfig.location },
  { label: "Profession", value: "Software Engineer" },
  { label: "Experience", value: siteConfig.engineeringExperience },
  { label: "UAE experience", value: siteConfig.uaeExperience },
] as const;

export const aboutStory = [
  "I’m originally from Kozhikode, Kerala, and now live and work in Dubai. I started my software career building web applications in India, then moved into larger business systems in the UAE.",
  "I enjoy understanding how something works, finding what can be improved, and building the pieces that make daily work simpler. That curiosity carries through from a database query to the experience someone sees on screen.",
] as const;

export const buildFocus = {
  introduction:
    "I work on enterprise applications, ERP and business systems, workflow platforms, dashboards, APIs, automation, and database-heavy products. The work often involves real-time functionality and connecting existing systems.",
  stack: ["ASP.NET Core", ".NET", "C#", "Angular", "TypeScript", "SQL Server"],
  supporting: ["React", "Next.js", "SignalR", "REST APIs", "AWS", "CI/CD"],
} as const;

export const engineeringPrinciples: AboutCard[] = [
  {
    title: "Understand First",
    body: "I begin with the users, the process, and the operational problem. The technical shape becomes clearer when the workflow is understood.",
  },
  {
    title: "Build End-to-End",
    body: "Database, backend, API, frontend, integration, and deployment are connected decisions. I like working across the whole path.",
  },
  {
    title: "Keep Improving",
    body: "I prefer pragmatic solutions that teams can maintain, extend, and refine rather than complexity for its own sake.",
  },
];

export interface AboutStorySlide {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  stat?: string;
  statLabel?: string;
}

export const aboutStories: AboutStorySlide[] = [
  {
    id: "long-rides",
    category: "Travel / Motorcycles",
    title: "The road is my favourite reset.",
    description:
      "Long rides and road trips give me a different kind of focus: new routes, unfamiliar places, and time to enjoy the journey itself.",
    image: "/images/about/motorcycle-trip.png",
    alt: "Sharan with his motorcycle during a ride through green hills",
  },
  {
    id: "cars",
    category: "Cars / Travel",
    title: "Always drawn to the drive.",
    description:
      "Cars have always held my attention, from the way they drive to the engineering and detail behind them. Exploring new places by road makes that interest even better.",
    image: "/images/about/beach-drive.png",
    alt: "A dark off-road vehicle on a beach at sunset",
  },
  {
    id: "capturing-moments",
    category: "Road trips / Film",
    title: "A little more than getting there.",
    description:
      "I like documenting the places and drives along the way. Sometimes the most memorable part is a quiet stop with a camera and an open road.",
    image: "/images/about/road-camera.png",
    alt: "A 360 camera set up beside an off-road vehicle in the desert",
  },
];

export const interests: Interest[] = [
  {
    name: "Cars",
    detail:
      "Automobiles hold my attention well beyond the drive: mechanics, modifications, detailing, and the engineering behind how they feel.",
  },
  {
    name: "Motorcycles",
    detail:
      "Riding and touring make the road part of the experience, especially when there is somewhere new to explore.",
  },
  {
    name: "Cricket",
    detail:
      "I follow the players and international game, and enjoy the strategy and competitive tension of a match.",
  },
  {
    name: "Football",
    detail:
      "Another sport I enjoy following for its pace, teamwork, and moments that turn a game.",
  },
  {
    name: "Travelling",
    detail:
      "Road trips, new landscapes, and unfamiliar places are a welcome change of perspective.",
  },
  {
    name: "Fitness",
    detail:
      "Training keeps me active and brings a useful rhythm and discipline outside work.",
  },
];
