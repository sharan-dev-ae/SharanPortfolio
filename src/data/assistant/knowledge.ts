import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";
import { personalSnapshot, interests } from "@/data/about";
import { buildFocus } from "@/data/about";
import { projects } from "@/data/projects";

export interface AssistantAction {
  label: string;
  href: string;
}

export interface AssistantAnswer {
  text: string;
  actions?: AssistantAction[];
}

export interface AssistantMessage extends AssistantAnswer {
  id: string;
  role: "user" | "assistant";
}

const projectLinks = {
  ems: "/projects/ems-estimation-management-system",
  management: "/projects/project-management-system",
  alnouras: "/projects/alnouras-app",
};

const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug)!;
const ems = getProject("ems-estimation-management-system");
const management = getProject("project-management-system");
const alnouras = getProject("alnouras-app");

const safeContactActions: AssistantAction[] = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: "View resume", href: siteConfig.resumePath },
  ...(!siteConfig.email.endsWith("@example.com")
    ? [{ label: "Email Sharan", href: `mailto:${siteConfig.email}` }]
    : []),
];

export const defaultSuggestions = [
  "What does Sharan do?",
  "Tell me about EMS",
  "What is his strongest stack?",
  "What is his career journey?",
  "How can I contact him?",
];

export function suggestionsForPath(pathname: string): string[] {
  if (pathname.includes("ems-estimation-management-system"))
    return [
      "What was Sharan's role on EMS?",
      "Explain the EMS workflow",
      "What technologies were used on EMS?",
      "What made EMS complex?",
    ];
  if (pathname.includes("project-management-system"))
    return [
      "Explain the Project Management System",
      "What did Sharan contribute?",
      "How is project progress tracked?",
      "What technologies were used?",
    ];
  if (pathname.includes("alnouras-app"))
    return [
      "What is Alnouras App?",
      "How does route tracking work?",
      "What modules does it include?",
      "What was Sharan's role?",
    ];
  if (pathname === "/career")
    return [
      "How did Sharan's career progress?",
      "What did he work on before NAFFCO?",
      "What is his UAE experience?",
      "What does he do at NAFFCO?",
    ];
  if (pathname === "/about")
    return [
      "What does Sharan enjoy outside work?",
      "Where is he from?",
      "What kind of engineer is he?",
      "What is his strongest stack?",
    ];
  if (pathname === "/projects")
    return [
      "What projects has he worked on?",
      "Tell me about EMS",
      "Explain the Project Management System",
      "What is Alnouras App?",
    ];
  return defaultSuggestions;
}

const projectAction = (label: string, href: string): AssistantAction[] => [
  { label, href },
];

export function answerPortfolioQuestion(
  question: string,
  pathname = "",
): AssistantAnswer {
  const q = question.toLowerCase().replace(/[’']/g, "").trim();
  const isEms =
    /\bems\b|estimation management|estimator|quotation/.test(q) ||
    (pathname.includes("ems-estimation") &&
      /\b(this|the) project\b|workflow|role|contribut|technolog|complex/.test(
        q,
      ));
  const isManagement =
    /project management|project progress|site progress|manpower forecast|material forecast/.test(
      q,
    ) ||
    (pathname.includes("project-management-system") &&
      /\b(this|the) project\b|role|contribut|technolog|progress/.test(q));
  const isAlnouras =
    /alnouras|waste management|route tracking|route management|geolocation/.test(
      q,
    ) ||
    (pathname.includes("alnouras-app") &&
      /\b(this|the) project\b|role|contribut|technolog|route|module/.test(q));

  if (/resume|cv|download/.test(q))
    return {
      text: "You can view Sharan's resume on the portfolio.",
      actions: [{ label: "View resume", href: siteConfig.resumePath }],
    };
  if (/linkedin/.test(q))
    return {
      text: "Sharan's LinkedIn profile is available here.",
      actions: [{ label: "LinkedIn", href: siteConfig.linkedin }],
    };
  if (/github/.test(q))
    return {
      text: "You can find Sharan's public GitHub profile here.",
      actions: [{ label: "GitHub", href: siteConfig.github }],
    };
  if (/contact|email|reach|connect|hire/.test(q))
    return {
      text: "The easiest ways to connect with Sharan are through LinkedIn or the portfolio's contact page. His resume and public GitHub profile are also available.",
      actions: [
        { label: "Contact page", href: "/contact" },
        ...safeContactActions,
      ],
    };

  if (isEms) {
    const actions = projectAction("View EMS case study", projectLinks.ems);
    if (/technolog|stack|built with/.test(q))
      return {
        text: `The portfolio lists ${ems.technologies.join(", ")} for EMS.`,
        actions,
      };
    if (/role|contribut|work on/.test(q))
      return {
        text: `Sharan's role: ${ems.role}. He contributed across Angular interfaces, ASP.NET Core APIs, SQL Server logic, and multi-role workflow behavior.`,
        actions,
      };
    if (/complex|challeng/.test(q))
      return {
        text: "EMS coordinates many teams and approval stages. Keeping ownership, role-specific actions, validations, and handoffs clear as an opportunity moves through estimation is a central challenge.",
        actions,
      };
    if (/workflow|process|explain/.test(q))
      return {
        text: "EMS follows an opportunity from CRM intake through sales coordination, technical and marketing/CRM reviews, estimation leadership, estimator work, pricing, and quotation. The case study also discusses evolving shop drawing and sales order connections.",
        actions,
      };
    return {
      text: `${ems.title} is an enterprise platform for the estimation lifecycle. ${ems.homepageSummary}`,
      actions,
    };
  }
  if (isManagement) {
    const actions = projectAction(
      "View project case study",
      projectLinks.management,
    );
    if (/technolog|stack|built with/.test(q))
      return {
        text: `The portfolio lists ${management.technologies.join(", ")} for this project.`,
        actions,
      };
    if (/role|contribut|work on/.test(q))
      return {
        text: `Sharan's role: ${management.role}. He contributed to frontend workflows, APIs, database work, progress logic, and reporting as part of a team.`,
        actions,
      };
    if (/progress|track/.test(q))
      return {
        text: "Teams configure project structures and percentage allocations, then record site updates against the plan. That supports progress views and areas needing attention; the portfolio does not specify a universal calculation formula.",
        actions,
      };
    return {
      text: `${management.title} connects project structure, site progress, material and manpower forecasts, invoice and collection planning, and project-health visibility.`,
      actions,
    };
  }
  if (isAlnouras) {
    const actions = projectAction(
      "View Alnouras case study",
      projectLinks.alnouras,
    );
    if (/technolog|stack|built with/.test(q))
      return {
        text: "The portfolio has not confirmed a technology stack for Alnouras App yet.",
        actions,
      };
    if (/role|contribut|work on/.test(q))
      return {
        text: `Sharan's role: ${alnouras.role}, focused on connected operations workflows and field-to-office visibility.`,
        actions,
      };
    if (/route|map|geolocation/.test(q))
      return {
        text: "Alnouras connects dedicated route planning, trip sheets, vehicle assignments, and map-based route visibility. The portfolio describes operational visibility but does not publish exact tracking precision or implementation details.",
        actions,
      };
    return {
      text: "Alnouras App brings together waste management operations: HR, vehicles, payroll, trip logging and sheets, invoicing, route visibility, progress monitoring, and dashboards.",
      actions,
    };
  }

  if (/project|portfolio|case stud/.test(q))
    return {
      text: `The featured case studies are ${ems.title}, ${management.title}, and ${alnouras.title}. They cover estimation workflows, project execution, and waste management operations.`,
      actions: [{ label: "Explore projects", href: "/projects" }],
    };
  if (/interfuture/.test(q)) {
    const role = experience.find(
      (item) => item.company === "Interfuture Technologies",
    )!;
    return {
      text: `${role.company} was Sharan's first UAE role. ${role.summary} His portfolio highlights HRMS, payroll, onboarding, leave, vouchers, and travel-claim workflows.`,
      actions: [{ label: "Career journey", href: "/career" }],
    };
  }
  if (/before naffco/.test(q))
    return {
      text: `Before NAFFCO, Sharan worked at ${experience
        .slice(0, 3)
        .map((role) => role.company)
        .join(
          ", ",
        )}. His most recent previous role was at Interfuture Technologies in Dubai.`,
      actions: [{ label: "Career journey", href: "/career" }],
    };
  if (/naffco|current role|current company|now work/.test(q)) {
    const current = experience.find((item) => item.current)!;
    return {
      text: `Sharan is a ${current.role} at ${current.company} in ${current.location}. ${current.summary}`,
      actions: [{ label: "Career journey", href: "/career" }],
    };
  }
  if (/uae|dubai/.test(q))
    return {
      text: `Sharan is based in ${siteConfig.location} and has ${siteConfig.uaeExperience.toLowerCase()} of UAE experience. His UAE career includes Interfuture Technologies and his current role at NAFFCO FZCO.`,
      actions: [{ label: "Career journey", href: "/career" }],
    };
  if (/career|journey|companies|start his career|before naffco|india/.test(q))
    return {
      text: `Sharan started at ${experience[0].company} in India, then worked at ${experience[1].company}. He moved into UAE enterprise systems at ${experience[2].company} and is now at ${experience[3].company}.`,
      actions: [{ label: "Career journey", href: "/career" }],
    };
  if (/where.*from|hometown|born/.test(q))
    return {
      text: `Sharan is from ${personalSnapshot.find((item) => item.label === "Hometown")?.value} and is now based in ${siteConfig.location}.`,
      actions: [{ label: "About Sharan", href: "/about" }],
    };
  if (
    /outside work|interest|hobb|cars|motorcycle|fitness|cricket|football|travel/.test(
      q,
    )
  )
    return {
      text: `Outside work, Sharan enjoys ${interests.map((item) => item.name.toLowerCase()).join(", ")}. Road trips and long rides are a particular part of his story.`,
      actions: [{ label: "About Sharan", href: "/about" }],
    };
  if (/frontend|backend|kind of engineer/.test(q))
    return {
      text: "Sharan works across frontend, backend, APIs, and data. He has a particularly strong inclination toward frontend engineering, interface design, and product experience.",
      actions: [{ label: "Explore expertise", href: "/#expertise" }],
    };
  if (/stack|technolog|skill|strongest/.test(q))
    return {
      text: `His core stack includes ${buildFocus.stack.join(", ")}. He also works with ${buildFocus.supporting.slice(0, 4).join(", ")}.`,
      actions: [{ label: "Explore expertise", href: "/#expertise" }],
    };
  if (
    /who is sharan|what does sharan do|what does he do|what.*work on|software experience|tell me about sharan/.test(
      q,
    )
  )
    return {
      text: `${siteConfig.name} is a ${siteConfig.role.toLowerCase()} based in ${siteConfig.location}, currently working as a ${siteConfig.currentRole} at ${siteConfig.currentCompany}. He has ${siteConfig.engineeringExperience.toLowerCase()} in software engineering and builds enterprise applications across the full stack.`,
      actions: [{ label: "About Sharan", href: "/about" }],
    };

  return {
    text: "Sharan's portfolio does not currently provide that information. You can explore his projects, career, and contact details directly.",
    actions: [
      { label: "Projects", href: "/projects" },
      { label: "Career", href: "/career" },
      { label: "Contact", href: "/contact" },
    ],
  };
}
