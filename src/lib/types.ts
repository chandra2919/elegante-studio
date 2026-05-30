export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  heroImage: string;
  images: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  client?: string;
  testimonial?: Testimonial;
  tags: string[];
  featured: boolean;
}

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "events"
  | "decor"
  | "floral"
  | "furniture";

export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  heroImage: string;
  galleryImages: string[];
  benefits: string[];
  process: ProcessStep[];
  faqs: FAQ[];
  startingPrice?: string;
  featured: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  projectSlug?: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Stat {
  number: string;
  suffix: string;
  label: string;
}
