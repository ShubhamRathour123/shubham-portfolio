export type Project = {
  title: string;
  description: string;
  link: string;
  repoUrl?: string;
  tech: string[];
  highlights: string[];
  imageUrl?: string;
};

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type PortfolioContent = {
  hero: {
    role: string;
    heading: string;
    highlightedName: string;
    summary: string;
    githubUrl: string;
    linkedInUrl: string;
    resumeUrl: string;
    availability: string;
  };
  about: string[];
  projects: Project[];
  skills: string[];
  skillCategories: SkillCategory[];
  contactEmail: string;
};

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    role: "Frontend & Full Stack Engineer | React.js, Next.js, TypeScript",
    heading: "Hi, I'm",
    highlightedName: "Shubham",
    summary:
      "Frontend & Full Stack Engineer with 2+ years of experience building responsive, production-ready web applications using React.js, Next.js, TypeScript, Node.js, and PostgreSQL.",
    githubUrl: "https://github.com/ShubhamRathour123",
    linkedInUrl: "https://www.linkedin.com/in/shubhamrathour",
    resumeUrl: "/Shubham_Rathour_Resume.pdf",
    availability: "Dubai, UAE | UAE Residence Visa Valid | Available Immediately",
  },
  about: [
    "I am a Frontend Engineer based in Dubai, UAE, focused on turning product requirements into responsive, polished web experiences.",
    "At Blue Iris Trading Software LLC, I build reusable React components, data-driven dashboard screens, and guided product experiences for internal products.",
    "My toolkit includes React.js, Next.js, TypeScript, Redux, REST APIs, Tailwind CSS, and backend technologies such as Node.js, Prisma, PostgreSQL, and MongoDB.",
    "I hold an MCA from Galgotias University (8.05 CGPA), have solved 250+ DSA problems, and am available to start immediately.",
  ],
  projects: [
    {
      title: "TrueRemittance",
      description:
        "UAE-to-India remittance comparison platform for transparent provider comparisons.",
      link: "https://trueremittance.vercel.app/",
      repoUrl: "https://github.com/ShubhamRathour123/trueremittance",
      tech: ["Next.js App Router", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "Vercel"],
      highlights: [
        "Engineered a live comparison engine ranking UAE-to-India providers by AED fees, exchange rates, and net INR payouts.",
        "Designed relational schemas for providers and corridors, then built an admin flow to manage rate snapshots and dynamic rankings.",
      ],
    },
    {
      title: "Shopping Cart App",
      description:
        "Responsive shopping cart with practical product and quantity interactions.",
      link: "https://shopping-cart-app-livid.vercel.app/",
      tech: ["React", "JavaScript", "Tailwind CSS"],
      highlights: ["Clean cart interactions with a responsive, mobile-first layout."],
    },
    {
      title: "Admin CMS & Analytics Dashboard",
      description:
        "Portfolio admin portal for content management, operational analytics, and contact workflows.",
      link: "/admin",
      tech: ["Next.js", "React", "TypeScript", "Redux", "Recharts", "MongoDB API", "Resend API"],
      highlights: [
        "Built an authenticated admin portal featuring protected routes, role-based navigation, CMS content management, and dynamic Recharts analytics integrated with REST APIs.",
      ],
    },
    {
      title: "StudyNotion",
      description: "EdTech platform with authentication and responsive UI.",
      link: "https://study-notion-delta-eight.vercel.app/",
      tech: ["React", "Node.js", "MongoDB"],
      highlights: ["Authentication-focused learning platform with a responsive multi-page UI."],
    },
    {
      title: "DreamsBig247",
      description: "Responsive modern business website with animations.",
      link: "https://dreamsbig247.vercel.app/",
      tech: ["React", "Vite", "Tailwind CSS"],
      highlights: ["Modular business site with responsive layouts and purposeful motion."],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "REST APIs",
    "React Query",
    "MongoDB",
    "PostgreSQL",
    "Prisma ORM",
    "Node.js",
    "MySQL",
    "Tailwind CSS",
    "GitHub",
    "Java",
    "DSA",
  ],
  skillCategories: [
    { name: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
    { name: "State & Data", skills: ["Redux Toolkit", "React Context", "Custom Hooks", "REST APIs", "React Query", "Recharts"] },
    { name: "Backend & Databases", skills: ["Node.js", "Prisma ORM", "PostgreSQL", "Neon", "MongoDB", "MySQL", "Resend API"] },
    { name: "Tools & Problem Solving", skills: ["GitHub", "Java", "Data Structures & Algorithms (250+ solved on LeetCode/GFG)"] },
  ],
  contactEmail: "shubhamrathour07062000@gmail.com",
};

export const projects = defaultPortfolioContent.projects;
export const skills = defaultPortfolioContent.skills;
