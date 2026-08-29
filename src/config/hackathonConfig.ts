export interface HackathonTrack {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  focusAreas: string[];
}

export interface TimelineMilestone {
  time: string;
  title: string;
  category: "CHECK-IN" | "IDEATION" | "BUILD" | "REVIEW" | "SUBMISSION" | "JURY";
  description: string;
  status?: "upcoming" | "active" | "completed";
}

export interface PrizeItem {
  place: string;
  rankNumber: string;
  title: string;
  reward: string;
  details: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const HACKATHON_CONFIG = {
  meta: {
    name: "CALMSTACKS 24 HOUR HACKATHON",
    shortName: "24H HACKATHON",
    tagline: "BUILD. SOLVE. IMPACT.",
    series: "CSE Student Development Series",
    organizer: "CALMSTACKS",
    dates: "18–19 SEPTEMBER 2026",
    startDateIso: "2026-09-18T09:00:00+05:30",
    endDateIso: "2026-09-19T09:00:00+05:30",
    format: "OFFLINE",
    venue: "MALNAD COLLEGE OF ENGINEERING",
    city: "HASSAN, KARNATAKA",
    department: "Department of Computer Science & Engineering",
    coordinates: "13.0072° N, 76.0964° E",
    mapsUrl: "https://maps.google.com/?q=Malnad+College+of+Engineering+Hassan",
    registrationOpen: true,
  },

  hero: {
    smallLabel: "CALMSTACKS PRESENTS",
    headlineLine1: "24",
    headlineLine2: "HOUR",
    headlineLine3: "HACKATHON",
    supportingHeadline: "BUILD. SOLVE. IMPACT.",
    description:
      "A 24-hour offline hackathon where students turn ideas into real-world solutions. Intense building, dedicated mentorship, and production-ready innovation.",
    metadataItems: [
      { label: "DATES", value: "18–19 SEPTEMBER" },
      { label: "VENUE", value: "MALNAD COLLEGE OF ENGINEERING" },
      { label: "CITY", value: "HASSAN" },
      { label: "FORMAT", value: "24H OFFLINE SPRINT" },
    ],
    primaryCta: "REGISTER NOW",
    secondaryCta: "EXPLORE HACKATHON",
  },

  about: {
    sectionTag: "01 // OVERVIEW",
    heading: "BUILD SOMETHING REAL.",
    intro:
      "This 24-hour hackathon is conducted as part of the prestigious CSE Student Development Series at Malnad College of Engineering, Hassan. We believe software engineering is learned by shipping real systems under constraints.",
    subIntro:
      "No fluff, no endless pitch decks. Bring your laptop, assemble your squad, and turn abstract problem statements into functional, testable software prototypes in twenty-four uninterrupted hours.",
    features: [
      {
        number: "01",
        title: "24 HOURS",
        description: "An intense offline building sprint engineered to push your skills from concept to working demo.",
      },
      {
        number: "02",
        title: "TEAM UP",
        description: "Collaborate with peers who think differently—designers, full-stack builders, and systems thinkers.",
      },
      {
        number: "03",
        title: "SOLVE",
        description: "Build practical solutions to meaningful challenges that create measurable real-world utility.",
      },
      {
        number: "04",
        title: "COMPETE",
        description: "Present your work to industry evaluators, gain senior engineering feedback, and compete for recognition.",
      },
    ],
  },

  challenges: {
    sectionTag: "02 // PROBLEM DOMAINS",
    heading: "THE CHALLENGE",
    description:
      "Choose a challenge track aligned with your strengths or venture into new paradigms. Detailed problem statements and rubric benchmarks will be unveiled during sprint ideation.",
    tracks: [
      {
        id: "ai-automation",
        number: "01",
        title: "AI & AUTOMATION",
        tagline: "Autonomous systems, agentic workflows & intelligent compute",
        description:
          "Harness generative models, specialized machine learning, or computer vision to build tools that eliminate cognitive friction and automate complex human tasks.",
        tags: ["LLM Agents", "Computer Vision", "Workflow Automation", "API Synthesis"],
        focusAreas: ["Predictive tooling", "Autonomous assistants", "Context-aware engines"],
      },
      {
        id: "web-digital",
        number: "02",
        title: "WEB & DIGITAL PRODUCTS",
        tagline: "High-performance digital experiences & developer tooling",
        description:
          "Design and build fast, responsive, and intuitive web applications or developer utilities that solve tangible everyday workflows with exceptional UX fidelity.",
        tags: ["Next.js", "Distributed APIs", "Design Systems", "Real-Time Sync"],
        focusAreas: ["Developer tooling", "Modern collaboration", "Micro-SaaS prototypes"],
      },
      {
        id: "social-impact",
        number: "03",
        title: "SOCIAL IMPACT",
        tagline: "Accessible civic infrastructure, healthcare & sustainability",
        description:
          "Craft purpose-driven engineering solutions that tackle pressing societal challenges—education accessibility, environmental tracking, regional governance, and public health.",
        tags: ["Civic Tech", "Accessibility", "Public Data", "Resource Optimization"],
        focusAreas: ["Healthcare workflows", "Educational tooling", "Community resilience"],
      },
      {
        id: "open-innovation",
        number: "04",
        title: "OPEN INNOVATION",
        tagline: "Experimental prototypes, robotics & boundary-pushing tech",
        description:
          "For cross-disciplinary builders combining hardware, IoT, embedded systems, robotics, or novel software primitives that defy single category boundaries.",
        tags: ["Embedded Systems", "Hardware/IoT", "Robotics", "New Primitives"],
        focusAreas: ["Physical-digital bridges", "Edge computing", "Novel interfaces"],
      },
    ] as HackathonTrack[],
  },

  timeline: {
    sectionTag: "03 // SPRINT PROTOCOL",
    heading: "24 HOURS.\nONE BUILD.",
    subheading: "A battle-tested milestone schedule designed to maximize shipping speed and product maturity.",
    milestones: [
      {
        time: "00:00",
        title: "CHECK-IN & REGISTRATION",
        category: "CHECK-IN",
        description: "Arrival at Malnad College of Engineering campus. Identity verification, workstation allocation, Wi-Fi onboarding, and event kit handover.",
      },
      {
        time: "02:00",
        title: "OPENING KEYNOTE & IDEATION",
        category: "IDEATION",
        description: "Official kickoff, release of specific track problem statements, evaluation criteria walkthrough, and team sync.",
      },
      {
        time: "04:00",
        title: "THE BUILD BEGINS",
        category: "BUILD",
        description: "Sprint zero initiated. Repository creation, architecture finalization, task delegation, and uninterrupted development start.",
      },
      {
        time: "08:00",
        title: "MENTORSHIP CHECKPOINT",
        category: "REVIEW",
        description: "Industry mentors and faculty leads rotate through workstations. Live architecture reviews, blocker troubleshooting, and trajectory alignment.",
      },
      {
        time: "16:00",
        title: "FINAL BUILD & FEATURE FREEZE",
        category: "BUILD",
        description: "Core code freeze. Shift focus to integration testing, deployment to live URLs, responsive UI touch-ups, and pitch deck preparation.",
      },
      {
        time: "22:00",
        title: "SUBMISSION DEADLINE",
        category: "SUBMISSION",
        description: "Code commit lockout. Repository links, demo video/live links, and technical summaries submitted to the evaluation portal.",
      },
      {
        time: "24:00",
        title: "DEMOS, JUDGING & AWARDS",
        category: "JURY",
        description: "Main auditorium live demonstrations before the judging panel, live Q&A, scoring compilation, and awards ceremony.",
      },
    ] as TimelineMilestone[],
  },

  pillars: {
    sectionTag: "04 // CULTURE",
    heading: "THE BUILDING CREED",
    items: [
      {
        title: "BUILD",
        subtitle: "Turn ideas into working products.",
        description:
          "Concepts don't change the world—functional software does. We prioritize working execution, clean architecture, and usable interfaces over slides.",
      },
      {
        title: "COLLABORATE",
        subtitle: "Work with your team and mentors.",
        description:
          "Bounce ideas with senior engineers and faculty mentors. The best solutions emerge when frontend, backend, and domain thinkers synergize.",
      },
      {
        title: "COMPETE",
        subtitle: "Present your solution and make an impact.",
        description:
          "Pitch your demo live, defend architectural decisions under jury scrutiny, and earn recognition across the engineering community.",
      },
    ],
  },

  prizes: {
    sectionTag: "05 // RECOGNITION",
    heading: "BUILD BIG.\nWIN BIG.",
    subheading: "Recognition, career acceleration, and industry mentorship for top-ranking teams.",
    comingSoonNotice: "PRIZE DETAILS COMING SOON",
    note: "Comprehensive prize pool amounts, sponsor grants, and specialized track awards will be announced prior to kickoff.",
    items: [
      {
        place: "1ST PLACE",
        rankNumber: "01",
        title: "CHAMPIONSHIP SQUAD",
        reward: "Cash Prize + Internship Opportunity",
        details: "Direct engineering interview pipeline, prestige trophy, and priority placement in Calmstacks incubation initiatives.",
      },
      {
        place: "2ND PLACE",
        rankNumber: "02",
        title: "FIRST RUNNER UP",
        reward: "Cash Prize + Internship Opportunity",
        details: "Merit award, mentorship matching with senior engineers, and technology resource stipends.",
      },
      {
        place: "3RD PLACE",
        rankNumber: "03",
        title: "SECOND RUNNER UP",
        reward: "Cash Prize + Internship Opportunity",
        details: "Merit award, platform credits, and engineering spotlight feature.",
      },
    ] as PrizeItem[],
  },

  eligibility: {
    sectionTag: "06 // ELIGIBILITY",
    heading: "WHO IS THIS FOR?",
    primaryAudience: "Open to CSE students participating in the event.",
    eventContext:
      "This hackathon is an official cornerstone of the CSE Student Development Series at Malnad College of Engineering, Hassan.",
    teamConfiguration: {
      title: "Team Structure & Guidelines",
      details:
        "Participants can form squads of 2 to 4 members or register individually to be paired with complementary talent during check-in. All team members must be enrolled students.",
      requirements: [
        "Valid Student ID card required at check-in",
        "Bring your own development machine and chargers",
        "All code must be authored within the 24-hour sprint window",
        "Open-source libraries and APIs permitted with proper attribution",
      ],
    },
  },

  venue: {
    sectionTag: "07 // CAMPUS & VENUE",
    heading: "SEE YOU IN HASSAN.",
    institution: "MALNAD COLLEGE OF ENGINEERING",
    department: "Department of Computer Science & Engineering",
    city: "HASSAN, KARNATAKA",
    pincode: "573202",
    coordinates: "13.0072° N, 76.0964° E",
    ctaLabel: "VIEW LOCATION ON MAPS",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Hassan",
    amenities: [
      "High-speed campus network access",
      "Continuous power backup & dedicated charging stations",
      "Overnight refreshment & fuel zones",
      "Auditorium for opening keynote and final presentations",
    ],
  },

  faq: {
    sectionTag: "08 // INTEL & FAQ",
    heading: "FREQUENTLY ASKED QUESTIONS",
    subheading: "Everything you need to know about the 24-hour build.",
    items: [
      {
        id: "faq-duration",
        question: "What is the duration of the hackathon?",
        answer:
          "The event runs for 24 continuous hours, starting with sprint zero kickoff on 18 September and concluding with final presentations and judging on 19 September.",
      },
      {
        id: "faq-offline",
        question: "Is the hackathon offline?",
        answer:
          "Yes. The Calmstacks 24 Hour Hackathon is a strictly in-person, on-campus sprint hosted at Malnad College of Engineering, Hassan to ensure high collaboration and active mentorship.",
      },
      {
        id: "faq-participate",
        question: "Who can participate?",
        answer:
          "The hackathon is open to Computer Science & Engineering (CSE) students participating in the event as part of the CSE Student Development Series at Malnad College of Engineering.",
      },
      {
        id: "faq-venue",
        question: "Where will the hackathon take place?",
        answer:
          "At the Malnad College of Engineering campus in Hassan, Karnataka, primarily within the Department of Computer Science & Engineering facilities and innovation labs.",
      },
      {
        id: "faq-bring",
        question: "What should participants bring?",
        answer:
          "Participants should bring their laptop, chargers, extension cords if desired, valid college identification, and any personal hardware required for their prototype.",
      },
      {
        id: "faq-teams",
        question: "Are teams required?",
        answer:
          "Teams are encouraged (2 to 4 members). Individual participants can register and collaborate with peers during the kickoff ideation phase.",
      },
      {
        id: "faq-build",
        question: "What should we build?",
        answer:
          "You can build any software or hardware-software solution fitting within one of our four tracks: AI & Automation, Web & Digital Products, Social Impact, or Open Innovation. Detailed problem statements will be outlined at kickoff.",
      },
      {
        id: "faq-prizes",
        question: "What are the prizes?",
        answer:
          "Cash prizes and internship opportunities will be awarded to 1st, 2nd, and 3rd place teams. Exact cash values and partner award details will be announced soon prior to the event.",
      },
      {
        id: "faq-register",
        question: "How do I register?",
        answer:
          "Click the 'REGISTER NOW' button on this page to open the registration form. Provide your student information, branch/semester, team details, and preferred track.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headlinePre: "YOU HAVE",
    headlineHours: "24 HOURS.",
    headlinePost: "WHAT\nWILL YOU\nBUILD?",
    supportingText: "Turn your idea into something real. Join your peers for 24 hours of pure creation at Malnad College of Engineering.",
    buttonLabel: "REGISTER FOR THE HACKATHON →",
    dates: "18–19 SEPTEMBER",
    location: "MALNAD COLLEGE OF ENGINEERING, HASSAN",
  },

  footer: {
    brandName: "CALMSTACKS",
    eventTitle: "24 HOUR HACKATHON",
    parentSeries: "CSE Student Development Series",
    links: [
      { label: "Instagram", href: "https://instagram.com/calmstacks" },
      { label: "LinkedIn", href: "https://linkedin.com/company/calmstacks" },
      { label: "Calmstacks Home", href: "/" },
    ],
    copyright: "© 2026 CALMSTACKS. ALL RIGHTS RESERVED.",
  },
};
