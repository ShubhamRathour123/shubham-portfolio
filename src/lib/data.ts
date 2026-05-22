export type Project = {
  title: string;
  description: string;
  link: string;
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
    role: "Full Stack Developer",
    heading: "Hi, I'm",
    highlightedName: "Shubham",
    summary:
      "MCA graduate and passionate Next.js developer focused on building scalable modern web applications using React, Next.js, MongoDB, and TypeScript.",
    githubUrl: "https://github.com/ShubhamRathour123",
    resumeUrl: "/Shubham_Rathour_Resume.pdf",
  },
  about: [
    "I am a passionate Full Stack Web Developer with a strong foundation in React.js and Next.js.",
    "I completed my MCA from Galgotias University with an 8.05 CGPA and continuously improve my skills by building modern web applications.",
    "I have solved 250+ DSA problems across LeetCode and GeeksForGeeks focusing on problem-solving and clean coding practices.",
    "Currently based in Dubai, UAE and actively building scalable full stack applications using modern JavaScript technologies.",
  ],
  projects: [
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
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "GitHub",
    "Java",
    "DSA",
  ],
  contactEmail: "shubhamrathour07062000@gmail.com",
};

export const projects = defaultPortfolioContent.projects;
export const skills = defaultPortfolioContent.skills;
