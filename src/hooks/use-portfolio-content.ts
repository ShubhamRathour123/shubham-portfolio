"use client";

import { useEffect, useState } from "react";
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from "@/lib/data";

const STORAGE_KEY = "shubham-portfolio-content";

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = value as Partial<PortfolioContent>;

  return Boolean(
    content.hero &&
      Array.isArray(content.about) &&
      Array.isArray(content.projects) &&
      Array.isArray(content.skills) &&
      typeof content.contactEmail === "string"
  );
}

function hydrateContent(value: PortfolioContent): PortfolioContent {
  return {
    ...defaultPortfolioContent,
    ...value,
    hero: { ...defaultPortfolioContent.hero, ...value.hero },
    projects: value.projects.map((project) => {
      const defaultProject = defaultPortfolioContent.projects.find(
        (item) => item.title === project.title
      );

      return {
        ...defaultProject,
        ...project,
        tech: project.tech ?? defaultProject?.tech ?? [],
        highlights: project.highlights ?? defaultProject?.highlights ?? [],
      };
    }),
    skillCategories:
      value.skillCategories ?? defaultPortfolioContent.skillCategories,
  };
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(
    defaultPortfolioContent
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      async function loadContent() {
        try {
          const response = await fetch("/api/portfolio/content");

          if (response.ok) {
            const data = await response.json();

            if (isPortfolioContent(data.content)) {
              const hydratedContent = hydrateContent(data.content);
              setContent(hydratedContent);
              window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(hydratedContent)
              );
              setIsLoaded(true);
              return;
            }
          }
        } catch {
          const storedContent = window.localStorage.getItem(STORAGE_KEY);

          if (storedContent) {
            try {
              const parsedContent = JSON.parse(storedContent);

              if (isPortfolioContent(parsedContent)) {
                  setContent(hydrateContent(parsedContent));
              }
            } catch {
              window.localStorage.removeItem(STORAGE_KEY);
            }
          }
        }

        setIsLoaded(true);
      }

      void loadContent();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveContent(nextContent: PortfolioContent) {
    setContent(nextContent);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
    void fetch("/api/portfolio/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: nextContent,
      }),
    });
  }

  function resetContent() {
    setContent(defaultPortfolioContent);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    content,
    isLoaded,
    saveContent,
    resetContent,
  };
}
