import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProjectManagementCaseStudy } from "@/components/sections/ProjectManagementCaseStudy";
import { EmsCaseStudy } from "@/components/sections/EmsCaseStudy";
import { AlnourasCaseStudy } from "@/components/sections/AlnourasCaseStudy";
import { projects, getProjectBySlug } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.featured)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: { title: project.title, description: project.shortDescription },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  if (slug === "ems-estimation-management-system") {
    return <EmsCaseStudy />;
  }

  if (slug === "project-management-system") {
    return <ProjectManagementCaseStudy />;
  }

  if (slug === "alnouras-app") {
    return <AlnourasCaseStudy />;
  }

  return (
    <Container id="main-content" as="main" className="py-20">
      <p className="text-secondary text-sm">
        {project.category}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{project.title}</h1>
      <p className="text-secondary mt-4 max-w-2xl">
        {project.shortDescription}
      </p>
      <p className="text-secondary mt-6 text-sm">
        Technologies: {project.technologies.join(", ")}
      </p>
    </Container>
  );
}
