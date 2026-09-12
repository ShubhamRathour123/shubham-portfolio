const roles = [
  {
    company: "Blue Iris Trading Software LLC",
    title: "Frontend Engineer",
    location: "Dubai, UAE",
    period: "Jun 2024 - Present",
    points: [
      "Built reusable React and TypeScript UI components for forms, tables, modals, overlays, and operational dashboards.",
      "Implemented guided product onboarding tours with custom hooks; improved key route performance using dynamic imports, lazy loading, and image optimization.",
    ],
  },
  {
    company: "CodeBright Technologies Pvt. Ltd.",
    title: "Web Developer Intern",
    location: "Noida, India",
    period: "Jan 2024 - Mar 2024",
    points: [
      "Converted design mockups into responsive React pages for sprint-based client work.",
      "Refactored legacy components to improve reuse, accessibility, and page performance.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="px-6 py-24" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="experience-heading" className="mb-12 text-4xl font-bold gradient">Experience</h2>
        <ol className="space-y-6 border-l border-cyan-400/40 pl-6">
          {roles.map((role) => (
            <li key={role.company} className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none">
              <span aria-hidden="true" className="absolute -left-[31px] top-8 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-slate-50 dark:bg-cyan-300 dark:ring-[#050816]" />
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-xl font-semibold">{role.title} <span className="text-slate-500 dark:text-gray-400">| {role.company}</span></h3>
                <p className="text-sm text-cyan-200">{role.period}</p>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">{role.location}</p>
              <ul className="mt-5 space-y-2 text-slate-700 dark:text-gray-300">
                {role.points.map((point) => <li key={point} className="flex gap-2"><span className="text-cyan-300">•</span>{point}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
