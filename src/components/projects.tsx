import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-12 gradient">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {projects.map((project) => (
            <div
              key={project.title}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              <a
                href={project.link}
                target="_blank"
                className="text-cyan-400"
              >
                Live Demo →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}