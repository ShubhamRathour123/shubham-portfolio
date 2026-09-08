export type Project = {
  title: string;
  description: string;
  link: string;
  repoUrl?: string;
  imageUrl?: string;
};

export type PortfolioContent = {
  hero: {
    role: string;
    heading: string;
    highlightedName: string;
    summary: string;
    githubUrl: string;
    resumeUrl: string;
  };
  about: string[];
  projects: Project[];
  skills: string[];
  contactEmail: string;
};

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    role: "Frontend Engineer | React.js | Next.js",
    heading: "Hi, I'm",
    highlightedName: "Shubham",
    summary:
      "Frontend Engineer with 2+ years of experience building responsive, production-ready web applications with React.js, Next.js, TypeScript, and modern frontend tooling.",
    githubUrl: "https://github.com/ShubhamRathour123",
    resumeUrl: "/Shubham_Rathour_Resume.pdf",
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
        "UAE-to-India remittance comparison platform that ranks providers by AED fees, exchange rates, and final INR payout. Built with Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.",
      link: "https://trueremittance.vercel.app/",
      repoUrl: "https://github.com/ShubhamRathour123/trueremittance",
    },
    {
      title: "Shopping Cart App",
      description:
        "Modern shopping cart application using React and Tailwind CSS.",
      link: "https://shopping-cart-app-livid.vercel.app/",
    },
    {
      title: "StudyNotion",
      description: "EdTech platform with authentication and responsive UI.",
      link: "https://study-notion-delta-eight.vercel.app/",
    },
    {
      title: "DreamsBig247",
      description: "Responsive modern business website with animations.",
      link: "https://dreamsbig247.vercel.app/",
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
  contactEmail: "shubhamrathour07062000@gmail.com",
};

export const projects = defaultPortfolioContent.projects;
export const skills = defaultPortfolioContent.skills;
