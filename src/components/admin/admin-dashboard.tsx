"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Briefcase,
  Check,
  Download,
  GitBranch,
  Home,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from "@/lib/data";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

type SectionKey =
  | "dashboard"
  | "portfolio"
  | "messages"
  | "analytics"
  | "settings";

type ActivityItem = {
  title: string;
  detail: string;
};

type ContactMessage = {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

const sidebarItems: Array<{
  id: SectionKey;
  label: string;
  icon: React.ElementType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const visitorData = [
  { month: "Jan", visitors: 180 },
  { month: "Feb", visitors: 260 },
  { month: "Mar", visitors: 340 },
  { month: "Apr", visitors: 410 },
  { month: "May", visitors: 520 },
  { month: "Jun", visitors: 690 },
];

const sourceData = [
  { name: "Vercel", value: 36 },
  { name: "GitHub", value: 28 },
  { name: "Notion", value: 18 },
  { name: "Supabase", value: 18 },
];

const chartColors = ["#22d3ee", "#3b82f6", "#8b5cf6", "#14b8a6"];

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400"
      />
    </label>
  );
}

function Panel({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_0_25px_rgba(34,211,238,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { content, saveContent, resetContent } = usePortfolioContent();
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityItem[]>([
    {
      title: "Dashboard opened",
      detail: "Admin session started",
    },
    {
      title: "Portfolio loaded",
      detail: "Projects, skills, and profile content are ready",
    },
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      async function loadMessages() {
        setIsMessagesLoading(true);

        try {
          const response = await fetch("/api/admin/messages");

          if (response.ok) {
            const data = await response.json();
            setMessages(Array.isArray(data.messages) ? data.messages : []);
          }
        } finally {
          setIsMessagesLoading(false);
        }
      }

      void loadMessages();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Visitors", value: "2.4k", trend: "+18%", icon: Activity },
      { label: "Projects", value: draft.projects.length, trend: "+3 live", icon: Briefcase },
      { label: "Skills", value: draft.skills.length, trend: "CMS ready", icon: Sparkles },
      {
        label: "Messages",
        value: messages.length,
        trend: messages.length ? "Stored in DB" : "DB ready",
        icon: MessageSquare,
      },
    ],
    [draft, messages.length]
  );

  const skillDistribution = useMemo(
    () =>
      draft.skills.slice(0, 6).map((skill, index) => ({
        skill,
        level: 52 + index * 7,
      })),
    [draft.skills]
  );

  const projectStats = useMemo(
    () =>
      draft.projects.map((project, index) => ({
        name: project.title.slice(0, 12),
        views: 120 + index * 85,
      })),
    [draft.projects]
  );

  function pushActivity(title: string, detail: string) {
    setActivity((items) => [{ title, detail }, ...items].slice(0, 6));
  }

  function updateDraft(nextDraft: PortfolioContent, action: string) {
    setDraft(nextDraft);
    saveContent(nextDraft);
    pushActivity(action, "Saved automatically in admin storage");
  }

  function handleSave() {
    setIsSaving(true);
    window.setTimeout(() => {
      saveContent(draft);
      setIsSaving(false);
      pushActivity("Manual save", "Portfolio content saved");
      toast.success("Portfolio saved");
    }, 500);
  }

  function handleReset() {
    resetContent();
    setDraft(defaultPortfolioContent);
    pushActivity("Content reset", "Default portfolio content restored");
    toast.success("Portfolio reset");
  }

  function handleExport() {
    const json = JSON.stringify(draft, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "portfolio-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
    pushActivity("Content exported", "portfolio-content.json downloaded");
    toast.success("Portfolio JSON exported");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <aside className="flex h-full flex-col border-r border-white/10 bg-[#070b1c] px-4 py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
            Shubham
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
            Admin CMS
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-lg border border-white/10 p-2 text-gray-300 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300 hover:scale-[1.02] ${
                isActive
                  ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.18)]"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">Quick Links</p>
        {[
          { label: "Vercel", icon: Home },
          { label: "GitHub", icon: GitBranch },
          { label: "Notion", icon: Sparkles },
          { label: "Supabase", icon: Activity },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3 text-sm text-gray-400">
              <Icon size={15} aria-hidden="true" />
              {item.label}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-lg border border-red-300/30 px-4 py-3 text-red-200 transition-all duration-300 hover:scale-[1.02] hover:bg-red-400/10"
      >
        <LogOut size={18} aria-hidden="true" />
        Logout
      </button>
    </aside>
  );

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="flex min-h-screen w-full">
        <div className="hidden w-72 shrink-0 lg:block">{sidebar}</div>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close sidebar overlay"
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="relative h-full w-72">{sidebar}</div>
          </div>
        )}

        <section className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-lg border border-white/10 p-3 text-gray-200 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
              <div>
                <p className="text-cyan-300">Portfolio Control Room</p>
                <h2 className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  {sidebarItems.find((item) => item.id === activeSection)?.label}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                <Save size={18} aria-hidden="true" />
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400 px-5 py-3 transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-400/10"
              >
                <Download size={18} aria-hidden="true" />
                Export
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
              >
                <RotateCcw size={18} aria-hidden="true" />
                Reset
              </button>
            </div>
          </header>

          {(activeSection === "dashboard" || activeSection === "analytics") && (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Panel key={item.label} className="p-5 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <Icon className="text-cyan-300" size={20} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-3xl font-semibold">{item.value}</p>
                      <p className="mt-2 text-sm text-green-300">{item.trend}</p>
                    </Panel>
                  );
                })}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <Panel className="p-6">
                  <h3 className="mb-6 text-xl font-semibold">Visitors Graph</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={visitorData}>
                        <defs>
                          <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: "#0b1024", border: "1px solid rgba(255,255,255,0.12)" }} />
                        <Area type="monotone" dataKey="visitors" stroke="#22d3ee" fill="url(#visitorGradient)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel className="p-6">
                  <h3 className="mb-6 text-xl font-semibold">Skills Distribution</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillDistribution}>
                        <XAxis dataKey="skill" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: "#0b1024", border: "1px solid rgba(255,255,255,0.12)" }} />
                        <Bar dataKey="level" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                <Panel className="p-6">
                  <h3 className="mb-6 text-xl font-semibold">Projects Stats</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectStats}>
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: "#0b1024", border: "1px solid rgba(255,255,255,0.12)" }} />
                        <Bar dataKey="views" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel className="p-6">
                  <h3 className="mb-6 text-xl font-semibold">Traffic Sources</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={98} paddingAngle={4}>
                          {sourceData.map((entry, index) => (
                            <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#0b1024", border: "1px solid rgba(255,255,255,0.12)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {(activeSection === "dashboard" || activeSection === "portfolio") && (
            <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
              <div className="space-y-6">
                <Panel className="p-6">
                  <h3 className="mb-6 text-2xl font-semibold">Hero Content</h3>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Role"
                      value={draft.hero.role}
                      onChange={(role) =>
                        updateDraft({ ...draft, hero: { ...draft.hero, role } }, "Hero role updated")
                      }
                    />
                    <Field
                      label="Highlighted Name"
                      value={draft.hero.highlightedName}
                      onChange={(highlightedName) =>
                        updateDraft({ ...draft, hero: { ...draft.hero, highlightedName } }, "Hero name updated")
                      }
                    />
                    <Field
                      label="Heading"
                      value={draft.hero.heading}
                      onChange={(heading) =>
                        updateDraft({ ...draft, hero: { ...draft.hero, heading } }, "Hero heading updated")
                      }
                    />
                    <Field
                      label="GitHub URL"
                      value={draft.hero.githubUrl}
                      onChange={(githubUrl) =>
                        updateDraft({ ...draft, hero: { ...draft.hero, githubUrl } }, "GitHub URL updated")
                      }
                    />
                    <div className="md:col-span-2">
                      <TextArea
                        label="Summary"
                        value={draft.hero.summary}
                        onChange={(summary) =>
                          updateDraft({ ...draft, hero: { ...draft.hero, summary } }, "Hero summary updated")
                        }
                      />
                    </div>
                  </div>
                </Panel>

                <Panel className="p-6">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold">Projects CMS</h3>
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft(
                          {
                            ...draft,
                            projects: [
                              ...draft.projects,
                              {
                                title: "New Project",
                                description: "Describe this project.",
                                link: "https://",
                                imageUrl: "",
                              },
                            ],
                          },
                          "Project added"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400 px-4 py-2 text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-400/10"
                    >
                      <Plus size={16} aria-hidden="true" />
                      Add
                    </button>
                  </div>

                  <div className="space-y-5">
                    {draft.projects.map((project, index) => (
                      <div key={`${project.title}-${index}`} className="rounded-lg border border-white/10 p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <h4 className="font-semibold">Project {index + 1}</h4>
                          <button
                            type="button"
                            aria-label={`Remove ${project.title}`}
                            onClick={() =>
                              updateDraft(
                                {
                                  ...draft,
                                  projects: draft.projects.filter((_, projectIndex) => projectIndex !== index),
                                },
                                "Project deleted"
                              )
                            }
                            className="rounded-lg border border-red-300/40 p-2 text-red-200 transition-all duration-300 hover:scale-[1.02] hover:bg-red-400/10"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Field
                            label="Title"
                            value={project.title}
                            onChange={(title) =>
                              updateDraft(
                                {
                                  ...draft,
                                  projects: draft.projects.map((item, projectIndex) =>
                                    projectIndex === index ? { ...item, title } : item
                                  ),
                                },
                                "Project title updated"
                              )
                            }
                          />
                          <Field
                            label="Live URL"
                            value={project.link}
                            onChange={(link) =>
                              updateDraft(
                                {
                                  ...draft,
                                  projects: draft.projects.map((item, projectIndex) =>
                                    projectIndex === index ? { ...item, link } : item
                                  ),
                                },
                                "Project link updated"
                              )
                            }
                          />
                          <Field
                            label="Image URL"
                            value={project.imageUrl ?? ""}
                            placeholder="Cloudinary or UploadThing image URL"
                            onChange={(imageUrl) =>
                              updateDraft(
                                {
                                  ...draft,
                                  projects: draft.projects.map((item, projectIndex) =>
                                    projectIndex === index ? { ...item, imageUrl } : item
                                  ),
                                },
                                "Project image updated"
                              )
                            }
                          />
                          <label className="block">
                            <span className="mb-2 block text-sm text-gray-300">
                              Image Upload Preview
                            </span>
                            <span className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-cyan-400/50 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-200 transition-all duration-300 hover:bg-cyan-400/10">
                              <ImagePlus size={18} aria-hidden="true" />
                              Choose file
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.target.files?.[0];

                                  if (!file) {
                                    return;
                                  }

                                  const imageUrl = URL.createObjectURL(file);
                                  updateDraft(
                                    {
                                      ...draft,
                                      projects: draft.projects.map((item, projectIndex) =>
                                        projectIndex === index ? { ...item, imageUrl } : item
                                      ),
                                    },
                                    "Project image preview added"
                                  );
                                  toast.info("Preview added. Use Cloudinary or UploadThing URL for production storage.");
                                }}
                              />
                            </span>
                          </label>
                          <div className="md:col-span-2">
                            <TextArea
                              label="Description"
                              value={project.description}
                              onChange={(description) =>
                                updateDraft(
                                  {
                                    ...draft,
                                    projects: draft.projects.map((item, projectIndex) =>
                                      projectIndex === index ? { ...item, description } : item
                                    ),
                                  },
                                  "Project description updated"
                                )
                              }
                              rows={3}
                            />
                          </div>
                        </div>

                        {project.imageUrl && (
                          <div className="relative mt-5 h-40 overflow-hidden rounded-lg border border-white/10">
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="space-y-6">
                <Panel className="p-6">
                  <h3 className="mb-6 text-2xl font-semibold">Skills</h3>
                  <div className="space-y-3">
                    {draft.skills.map((skill, index) => (
                      <div key={`${skill}-${index}`} className="flex gap-3">
                        <input
                          value={skill}
                          onChange={(event) =>
                            updateDraft(
                              {
                                ...draft,
                                skills: draft.skills.map((item, skillIndex) =>
                                  skillIndex === index ? event.target.value : item
                                ),
                              },
                              "Skill updated"
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400"
                        />
                        <button
                          type="button"
                          aria-label={`Remove ${skill}`}
                          onClick={() =>
                            updateDraft(
                              {
                                ...draft,
                                skills: draft.skills.filter((_, skillIndex) => skillIndex !== index),
                              },
                              "Skill deleted"
                            )
                          }
                          className="rounded-lg border border-red-300/40 p-3 text-red-200 transition-all duration-300 hover:scale-[1.02] hover:bg-red-400/10"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft({ ...draft, skills: [...draft.skills, "New Skill"] }, "Skill added")
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400 px-4 py-2 text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-400/10"
                    >
                      <Plus size={16} aria-hidden="true" />
                      Add Skill
                    </button>
                  </div>
                </Panel>

                <Panel className="p-6">
                  <h3 className="mb-6 text-2xl font-semibold">About</h3>
                  <TextArea
                    label="Paragraphs"
                    value={draft.about.join("\n\n")}
                    onChange={(value) =>
                      updateDraft(
                        {
                          ...draft,
                          about: value
                            .split(/\n{2,}/)
                            .map((paragraph) => paragraph.trim())
                            .filter(Boolean),
                        },
                        "About content updated"
                      )
                    }
                    rows={10}
                  />
                </Panel>

                <Panel className="p-6">
                  <h3 className="mb-6 text-2xl font-semibold">Recent Activity</h3>
                  <div className="space-y-4">
                    {activity.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                          <Check size={15} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {activeSection === "messages" && (
            <Panel className="p-6">
              <h3 className="mb-2 text-2xl font-semibold">Contact Messages</h3>
              <p className="mb-6 text-gray-400">
                Contact form submissions are stored in MongoDB when
                MONGODB_URI is configured.
              </p>

              {isMessagesLoading ? (
                <p className="text-cyan-300">Loading messages...</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(messages.length
                    ? messages
                    : [
                        {
                          name: "Recruiter",
                          email: "sample@example.com",
                          message:
                            "Sample inbox card. Add MONGODB_URI to show real contact messages here.",
                        },
                        {
                          name: "Client",
                          email: "hello@example.com",
                          message:
                            "Project collaboration request placeholder.",
                        },
                        {
                          name: "Hiring Manager",
                          email: "jobs@example.com",
                          message: "Resume download analytics placeholder.",
                        },
                      ]).map((message, index) => (
                    <div
                      key={message._id ?? `${message.email}-${index}`}
                      className="rounded-lg border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <p className="text-sm text-cyan-300">
                        {message.email}
                      </p>
                      <h4 className="mt-3 font-semibold">{message.name}</h4>
                      <p className="mt-2 text-sm text-gray-400">
                        {message.message}
                      </p>
                      {message.createdAt && (
                        <p className="mt-4 text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          )}

          {activeSection === "settings" && (
            <div className="grid gap-6 xl:grid-cols-2">
              <Panel className="p-6">
                <h3 className="mb-6 text-2xl font-semibold">Admin Settings</h3>
                <div className="space-y-5">
                  <Field
                    label="Contact Receiver Email"
                    type="email"
                    value={draft.contactEmail}
                    onChange={(contactEmail) =>
                      updateDraft({ ...draft, contactEmail }, "Contact email updated")
                    }
                  />
                  <Field
                    label="Resume URL"
                    value={draft.hero.resumeUrl}
                    onChange={(resumeUrl) =>
                      updateDraft({ ...draft, hero: { ...draft.hero, resumeUrl } }, "Resume URL updated")
                    }
                  />
                </div>
              </Panel>

              <Panel className="p-6">
                <h3 className="mb-6 text-2xl font-semibold">Production Checklist</h3>
                <div className="space-y-4 text-sm text-gray-300">
                  {[
                    "Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET on Vercel",
                    "Add MONGODB_URI or Supabase keys for real CMS storage",
                    "Add Cloudinary or UploadThing keys for persistent image uploads",
                    "Store contact form messages in the database",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                      <Check className="shrink-0 text-cyan-300" size={17} aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
