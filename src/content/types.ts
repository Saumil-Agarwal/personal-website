export type Profile = {
  name: string;
  tagline: string;
  location: string;
  email: string;
  summary: string;
  currently: string;
  resumeUrl: string;
  availability: string;
  links: { github: string; linkedin: string };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  highlights: string[];
  featured: boolean;
  links?: { website?: string };
};

export type SkillGroup = { name: string; skills: string[] };

export type QuestionAnswer = {
  question: string;
  answer: string;
  keywords: string[];
};
