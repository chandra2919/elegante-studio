import type { Project, Service, Testimonial, BlogPost, Stat } from "./types";

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
export const STATS: Stat[] = [
  { number: "20",  suffix: "+", label: "Years of Excellence"   },
  { number: "500", suffix: "+", label: "Spaces Transformed"    },
  { number: "98",  suffix: "%", label: "Client Satisfaction"   },
  { number: "12",  suffix: "+", label: "Design Awards"         },
];

/* ─────────────────────────────────────────────
   PROCESS STEPS
───────────────────────────────────────────── */
export const PROCESS_STEPS = [
  { step: 1, title: "Discovery",         icon: "💬", description: "A private consultation to understand your vision, lifestyle, and aspirations." },
  { step: 2, title: "Concept Design",    icon: "✏️", description: "Bespoke mood boards, spatial layouts, and material narratives crafted for you." },
  { step: 3, title: "Material Selection",icon: "🎨", description: "Hand-selecting premium fabrics, finishes, and furniture curated exclusively." },
  { step: 4, title: "Execution",         icon: "🏛️", description: "Master craftsmen and installation teams bring every detail to life with precision." },
  { step: 5, title: "Styling",           icon: "🌸", description: "Florals, accessories, and lighting positioned to create the perfect atmosphere." },
  { step: 6, title: "Final Delivery",    icon: "✨", description: "The reveal moment — your extraordinary space, ready to be lived in and celebrated." },
];

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sophia Harrington",
    role: "Private Residence Client",
    location: "Bloomfield Hills, MI",
    text: "Working with Eleganté was a transformative experience. They didn't just design our home — they captured our soul and translated it into a space we never want to leave. Absolute perfection in every detail.",
    rating: 5,
    projectSlug: "harrington-residence",
  },
  {
    id: "t2",
    name: "Margaret & David Chen",
    role: "Wedding Event Clients",
    location: "Detroit, MI",
    text: "The event styling for our daughter's wedding was beyond anything we imagined. The floral installations, the draping — guests are still talking about it months later. Eleganté is in a class of their own.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Robert Ashworth",
    role: "Executive Residence",
    location: "Grosse Pointe, MI",
    text: "The chandelier installation in our foyer is the first thing every visitor comments on. Eleganté has a gift for making a statement without being excessive. Luxurious, refined, impeccable taste.",
    rating: 5,
    projectSlug: "ashworth-estate",
  },
  {
    id: "t4",
    name: "Alexandra Petrov",
    role: "Luxury Retail Showroom",
    location: "Birmingham, MI",
    text: "Our showroom redesign doubled foot traffic within the first month. Eleganté understands how luxury sells — they created a space that tells our brand story more powerfully than any advertisement.",
    rating: 5,
  },
  {
    id: "t5",
    name: "James & Priya Mehta",
    role: "Penthouse Residence",
    location: "Troy, MI",
    text: "From the first consultation to the final reveal, the process was seamless and deeply personal. They listened, they understood, and they delivered something that exceeded every expectation.",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    slug: "grand-dining-sanctuary",
    title: "The Grand Dining Sanctuary",
    category: "residential",
    location: "Bloomfield Hills, MI",
    year: "2024",
    heroImage: "/images/BW8A3410.webp",
    images: ["/images/BW8A3410.webp", "/images/BW8A3472.webp", "/images/BW8A3694.webp"],
    description: "A dramatic dining experience featuring a statement crystal chandelier suspended within an orbital frame, rich damask upholstery, and hand-carved cabinetry.",
    challenge: "The clients wanted a dining room that felt like dining in a European palace — without feeling cold or unapproachable.",
    solution: "We anchored the space with a custom orbital crystal chandelier and surrounded it with warm amber damask chairs, a hand-inlaid mahogany table, and warm floral centrepieces.",
    result: "A space that is simultaneously grand and intimate — guests consistently describe it as the finest dining room they have ever experienced.",
    tags: ["Chandelier", "Dining", "Residential", "Dark Luxury"],
    featured: true,
  },
  {
    slug: "black-gold-study",
    title: "Black & Gold Study",
    category: "residential",
    location: "Grosse Pointe, MI",
    year: "2024",
    heroImage: "/images/BW8A3535.webp",
    images: ["/images/BW8A3535.webp", "/images/BW8A3578.webp", "/images/BW8A3887.webp"],
    description: "An intimate study designed in matte black and burnished gold — featuring a chess table centerpiece, gilded wall art, and custom cabinetry with display niches.",
    challenge: "A high-profile executive needed a private study that commanded respect and communicated authority while remaining a personal sanctuary.",
    solution: "Dark matte walls, gold-framed art panels, artisan chess set centrepiece, and a custom display cabinet system created a statement space.",
    result: "The study became the most photographed room in the home — regularly featured in local luxury lifestyle publications.",
    tags: ["Study", "Black & Gold", "Residential", "Artisan"],
    featured: true,
  },
  {
    slug: "ivory-living-collection",
    title: "Ivory Living Collection",
    category: "furniture",
    location: "Troy, MI",
    year: "2023",
    heroImage: "/images/BW8A3694.webp",
    images: ["/images/BW8A3694.webp", "/images/BW8A3452.webp", "/images/IMG_9370.webp"],
    description: "A serene ivory and cream living room built around a sculptural bowl coffee table featuring hand-placed artisan objects — orchids, silver urns, and geode accents.",
    challenge: "The clients wanted warmth and luxury without dark colours — an all-light palette that felt rich rather than sterile.",
    solution: "An ivory velvet sofa set, champagne-glaze coffee table, layered rugs, and carefully curated artisan objects create warmth through texture rather than colour.",
    result: "The room photographs beautifully in all lights — a testament to the power of tonal luxury design.",
    tags: ["Living Room", "Ivory", "Furniture", "Serene"],
    featured: true,
  },
  {
    slug: "venetian-artisan-showcase",
    title: "Venetian Artisan Showcase",
    category: "decor",
    location: "Birmingham, MI",
    year: "2023",
    heroImage: "/images/BW8A3578.webp",
    images: ["/images/BW8A3578.webp", "/images/BW8A3452.webp", "/images/IMG_9370.webp"],
    description: "A curated collection of Venetian bronze masks displayed as gallery art within an ornate gold console setting.",
    challenge: "An art collector needed their Venetian pieces displayed in a manner worthy of their cultural and monetary value.",
    solution: "We created individual pedestals with museum-quality lighting, paired with a gilded console and matching display context.",
    result: "The display transformed a collection into an experience — guests routinely spend 10–15 minutes studying each piece.",
    tags: ["Decor", "Art Display", "Venetian", "Artisan"],
    featured: false,
  },
  {
    slug: "grand-drape-installation",
    title: "Grand Drape Installation",
    category: "events",
    location: "Detroit, MI",
    year: "2024",
    heroImage: "/images/BW8A3877.webp",
    images: ["/images/BW8A3877.webp", "/images/BW8A3887.webp", "/images/BW8A3613.webp"],
    description: "A theatrical draping installation transforming a standard venue into an opulent ceremonial space — layered valances, champagne sheers, and crystal bead trim.",
    challenge: "Transform a standard brick-wall venue into an extravagant event space in under 48 hours.",
    solution: "Multi-layered draping with champagne, gold, and blush fabrics, crystal bead trim, and strategic lighting transformed the entire ceiling and walls.",
    result: "The venue owner now partners exclusively with Eleganté for all premium event bookings.",
    tags: ["Events", "Draping", "Installation", "Ceremony"],
    featured: true,
  },
  {
    slug: "gold-urn-collection",
    title: "Antique Gold Urn Collection",
    category: "decor",
    location: "Pontiac, MI",
    year: "2023",
    heroImage: "/images/IMG_9370.webp",
    images: ["/images/IMG_9370.webp", "/images/BW8A3452.webp", "/images/BW8A3578.webp"],
    description: "A museum-quality antique gold urn with mosaic mirror inlay — the centrepiece of an entry foyer vignette.",
    challenge: "Finding and integrating heritage decorative objects that feel genuinely aged rather than mass-produced.",
    solution: "Sourced through European antique networks, the urn was professionally restored and placed on a custom Venetian plaster plinth.",
    result: "The foyer vignette became a signature of the home — immediately setting the tone for the entire residence.",
    tags: ["Antique", "Gold", "Decor", "Foyer"],
    featured: false,
  },
];

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
export const SERVICES: Service[] = [
  {
    slug: "residential",
    title: "Residential Design",
    subtitle: "Your Home, Elevated",
    description: "Full-service luxury residential interior design from concept to completion.",
    longDescription: "We create bespoke living environments that perfectly reflect your identity, lifestyle, and aspirations. From intimate apartments to grand estates, every project receives the same meticulous attention to detail and uncompromising standard of excellence.",
    icon: "🏠",
    heroImage: "/images/BW8A3694.webp",
    galleryImages: ["/images/BW8A3410.webp", "/images/BW8A3535.webp", "/images/BW8A3694.webp", "/images/BW8A3877.webp"],
    benefits: ["Bespoke design tailored exclusively to you", "Access to exclusive trade-only showrooms", "Full project management from concept to completion", "Custom furniture sourcing and specification", "Art and accessory curation", "Dedicated project coordinator"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "What is the minimum project budget?", answer: "Our residential projects typically start from $50,000. We focus on delivering exceptional value at every investment level." },
      { question: "How long does a typical project take?", answer: "Most residential projects take 3–9 months depending on scope, custom ordering, and construction requirements." },
      { question: "Do you work outside Michigan?", answer: "We primarily serve the greater Michigan area, though we accept select projects nationally for existing clients." },
    ],
    featured: true,
    startingPrice: "$50,000",
  },
  {
    slug: "commercial",
    title: "Commercial Design",
    subtitle: "Spaces That Perform",
    description: "Luxury commercial environments that reflect your brand values and engage your clients.",
    longDescription: "A premium commercial space is your most powerful marketing tool. We design commercial environments that immediately communicate quality, authority, and sophistication — from executive offices to luxury retail boutiques.",
    icon: "🏛️",
    heroImage: "/images/BW8A3535.webp",
    galleryImages: ["/images/BW8A3535.webp", "/images/BW8A3578.webp", "/images/BW8A3452.webp", "/images/BW8A3694.webp"],
    benefits: ["Brand-aligned spatial design", "Customer journey mapping", "Wayfinding and signage coordination", "Acoustic and lighting specification", "Furniture and fixture procurement", "Phased delivery for minimal disruption"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "Can you work around our business hours?", answer: "Yes — we offer phased installation and after-hours work scheduling to minimise business disruption." },
      { question: "Do you handle permits and contractor coordination?", answer: "We work with a trusted network of licensed contractors and can manage the full project on your behalf." },
    ],
    featured: true,
    startingPrice: "$75,000",
  },
  {
    slug: "events",
    title: "Event Styling",
    subtitle: "Experiences That Last Forever",
    description: "Transforming venues into extraordinary event environments.",
    longDescription: "Every celebration deserves a setting as beautiful as the moment itself. Our event styling team specialises in luxury weddings, galas, corporate events, and private parties — creating immersive environments that make guests feel they have stepped into another world.",
    icon: "🌸",
    heroImage: "/images/BW8A3877.webp",
    galleryImages: ["/images/BW8A3877.webp", "/images/BW8A3887.webp", "/images/BW8A3472.webp", "/images/BW8A3410.webp"],
    benefits: ["Full venue transformation", "Bespoke floral installations", "Luxury draping and ceiling treatments", "Lighting design and coordination", "Centrepiece and table styling", "Day-of setup and breakdown"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "How far in advance should we book?", answer: "We recommend booking 6–12 months in advance for weddings and galas. Corporate events can often be accommodated with shorter lead times." },
      { question: "Do you travel for destination events?", answer: "Yes — we accept select destination event commissions. Travel and accommodation costs are included in project proposals." },
    ],
    featured: true,
    startingPrice: "$15,000",
  },
  {
    slug: "decor",
    title: "Decor & Accessories",
    subtitle: "The Art of the Detail",
    description: "Premium decorative object sourcing and vignette styling.",
    longDescription: "The most beautiful rooms are defined by their objects. We source, curate, and place decorative accessories — from antique urns and sculptural pieces to custom florals and artisan objects — that elevate a space from beautiful to unforgettable.",
    icon: "✨",
    heroImage: "/images/IMG_9370.webp",
    galleryImages: ["/images/IMG_9370.webp", "/images/BW8A3578.webp", "/images/BW8A3452.webp", "/images/BW8A3694.webp"],
    benefits: ["Bespoke accessory curation", "Antique and vintage sourcing", "Art consultation and placement", "Vignette and shelf styling", "Seasonal refreshes", "Object restoration referrals"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "Can you style just one room?", answer: "Yes — our decor service is available as a standalone room refresh or as part of a larger design project." },
    ],
    featured: false,
    startingPrice: "$5,000",
  },
  {
    slug: "floral",
    title: "Floral Installations",
    subtitle: "Nature as Luxury Art",
    description: "Bespoke floral design and permanent installation.",
    longDescription: "Flowers are the ultimate luxury accent. Our floral design team creates both fresh and preservation-quality permanent installations that become signature features of your space — from towering entrance arrangements to delicate table florals.",
    icon: "🌺",
    heroImage: "/images/BW8A3607.webp",
    galleryImages: ["/images/BW8A3607.webp", "/images/BW8A3472.webp", "/images/BW8A3877.webp", "/images/BW8A3694.webp"],
    benefits: ["Fresh and preserved flower options", "Custom vessel and container sourcing", "Seasonal rotation programs", "Event floral coordination", "Permanent installation design", "Ongoing maintenance programs"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "What is the difference between fresh and preserved florals?", answer: "Fresh florals need regular replacement. Preserved florals are treated to maintain their beauty for 1–3 years with minimal maintenance." },
    ],
    featured: false,
    startingPrice: "$2,500",
  },
  {
    slug: "furniture",
    title: "Furniture Curation",
    subtitle: "Investments in Beauty",
    description: "Access to exclusive luxury furniture collections and custom pieces.",
    longDescription: "We provide access to trade-exclusive luxury furniture showrooms, custom manufacturers, and antique dealers unavailable to the general public. Every piece we specify is an investment in quality, beauty, and longevity.",
    icon: "🛋️",
    heroImage: "/images/BW8A3694.webp",
    galleryImages: ["/images/BW8A3694.webp", "/images/BW8A3410.webp", "/images/BW8A3535.webp", "/images/BW8A3452.webp"],
    benefits: ["Access to trade-only collections", "Custom specification and commissioning", "Antique and vintage sourcing", "White-glove delivery coordination", "Furniture restoration referrals", "Investment piece advisory"],
    process: PROCESS_STEPS,
    faqs: [
      { question: "Can you source custom or bespoke pieces?", answer: "Yes — we work with master craftsmen and custom furniture manufacturers to create one-of-a-kind pieces tailored to your space and specifications." },
    ],
    featured: false,
    startingPrice: "$10,000",
  },
];

/* ─────────────────────────────────────────────
   BLOG POSTS
───────────────────────────────────────────── */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "art-of-chandelier-selection",
    title: "The Art of Chandelier Selection: Illuminating Your Space with Intention",
    excerpt: "A chandelier is not merely a light fixture — it is the crown jewel of a room. Learn how we select statement lighting that transforms spaces.",
    content: "...",
    coverImage: "/images/BW8A3472.webp",
    category: "Design Insights",
    author: "Eleganté Studio",
    date: "May 2025",
    readTime: "6 min",
    tags: ["Chandeliers", "Lighting", "Luxury Design"],
  },
  {
    slug: "luxury-of-negative-space",
    title: "The Luxury of Negative Space: Why Less is Always More",
    excerpt: "In luxury design, what you choose NOT to place in a room is as important as what you do. A meditation on restraint and intentionality.",
    content: "...",
    coverImage: "/images/BW8A3694.webp",
    category: "Philosophy",
    author: "Eleganté Studio",
    date: "April 2025",
    readTime: "5 min",
    tags: ["Philosophy", "Minimalism", "Luxury"],
  },
  {
    slug: "floral-installation-guide",
    title: "Transforming Events with Floral Installations: Our Complete Guide",
    excerpt: "From intimate table arrangements to towering entrance installations, discover how florals create unforgettable event atmospheres.",
    content: "...",
    coverImage: "/images/BW8A3877.webp",
    category: "Events",
    author: "Eleganté Studio",
    date: "March 2025",
    readTime: "8 min",
    tags: ["Florals", "Events", "Installation"],
  },
  {
    slug: "black-interiors-done-right",
    title: "Black Interiors Done Right: Embracing Dark Luxury",
    excerpt: "Dark interiors are not about absence of light — they are about depth, drama, and the art of the considered shadow.",
    content: "...",
    coverImage: "/images/BW8A3535.webp",
    category: "Design Insights",
    author: "Eleganté Studio",
    date: "February 2025",
    readTime: "7 min",
    tags: ["Black Interiors", "Dark Luxury", "Design"],
  },
];

/* ─────────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services",  href: "/services"  },
  { label: "Process",   href: "/process"   },
  { label: "Gallery",   href: "/gallery"   },
  { label: "Journal",   href: "/blog"      },
  { label: "About",     href: "/about"     },
];
