import fs from "fs";
import path from "path";

// Define the database file path
const DB_FILE = path.join(process.cwd(), "db.json");

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  plan: "free" | "premium" | "ultra";
  createdAt: string;
}

export interface LoveStory {
  id: string;
  slug: string;
  userId: string;
  partnerA: string;
  partnerB: string;
  relationshipTitle: string;
  anniversaryDate: string;
  theme: string;
  musicMood: string;
  musicUrl?: string;
  loveLetter: string;
  whyILoveYou: Array<{ title: string; description: string; icon: string }>;
  moments: Array<{ date: string; title: string; description: string }>;
  photos: Array<{ src: string; caption: string }>;
  views: number;
  createdAt: string;
}

interface DatabaseSchema {
  users: User[];
  stories: LoveStory[];
}

// Initial seed data
const SEED_DATA: DatabaseSchema = {
  users: [
    {
      id: "admin-uuid",
      email: "admin@loveverse.app",
      // sha256 hash for 'admin123' with salt 'loveverse-salt' is:
      // a534571adcb5c3bbd44be8060de95dfad73f1ff7a2ccb03db4b830d1d23485c2 (using basic crypto)
      // Let's use simple verification in auth.ts
      passwordHash: "a534571adcb5c3bbd44be8060de95dfad73f1ff7a2ccb03db4b830d1d23485c2",
      name: "LoveVerse Admin",
      plan: "ultra",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-user-uuid",
      email: "demo@loveverse.app",
      passwordHash: "7b489d81d24cf4e723048995326778f56ef42a033c4f9ebbf6f685c2c77174db", // 'demo123'
      name: "Sujal & Ananya",
      plan: "premium",
      createdAt: new Date().toISOString(),
    }
  ],
  stories: [
    {
      id: "demo-story-id",
      slug: "sujal-ananya",
      userId: "demo-user-uuid",
      partnerA: "Sujal",
      partnerB: "Ananya",
      relationshipTitle: "Our Infinite Symphony",
      anniversaryDate: "2024-10-18",
      theme: "galaxy-love",
      musicMood: "dreamy",
      musicUrl: "/Saawal.mp3",
      loveLetter: "My dearest Ananya,\n\nI spent so many nights thinking about how to show you how much you mean to me. This little corner of the internet is just a small reflection of the universe of love I have for you.\n\nFrom the first time we talked to our latest laugh, every second with you feels like a beautiful dream I never want to wake up from. You are my Maalikn, my best friend, and my greatest adventure.\n\nI call you Kuchu, Phuchku, and everything in between, but most of all, I call you mine. Thank you for being you, for your kindness, and for choosing me every single day.\n\nI love you more than words can ever say.\n\nAlways yours,\nSujal",
      whyILoveYou: [
        {
          title: "Your Smile",
          description: "It lights up my whole world and makes every problem disappear, my sweet Kuchu.",
          icon: "Heart",
        },
        {
          title: "Your Kindness",
          description: "The way you care for everyone around you is truly inspiring, Madamji.",
          icon: "Sun",
        },
        {
          title: "Your Support",
          description: "You're always there for me, my biggest cheerleader and best friend, Maalikn.",
          icon: "Stars",
        },
        {
          title: "Your Laugh",
          description: "The most beautiful melody I've ever heard. It's contagious, Phuchku!",
          icon: "Music",
        },
        {
          title: "Your Presence",
          description: "Just being near you makes everything feel right and peaceful, my dear Kuchu.",
          icon: "Cloud",
        },
        {
          title: "Your Strength",
          description: "You handle everything with such grace and courage, Madamji. I'm so proud of you.",
          icon: "Shield",
        }
      ],
      moments: [
        {
          date: "Oct 18, 2023",
          title: "The First Gaze",
          description: "Where it all started. Little did I know how much you'd mean to me, Kuchu.",
        },
        {
          date: "Dec 25, 2023",
          title: "First Laugh Together",
          description: "That moment I realized we had something truly special, Madamji.",
        },
        {
          date: "Feb 14, 2024",
          title: "First Photo Together",
          description: "Capturing a moment that will stay in my heart forever, Maalikn.",
        },
        {
          date: "Ongoing",
          title: "Countless Memories",
          description: "Every day with you is a new favorite memory, Phuchku. I love you!",
        }
      ],
      photos: [
        { src: "/images/memory1.jpg", caption: "Every moment with you is a gift, Kuchu" },
        { src: "/images/memory2.jpg", caption: "Your smile is my favorite view, Madamji" },
        { src: "/images/memory3.jpg", caption: "Holding your hand, always and forever" },
        { src: "/images/memory1.jpg", caption: "Thinking of you, my Phuchku" },
        { src: "/images/memory2.jpg", caption: "Our forever story begins here" },
        { src: "/images/memory3.jpg", caption: "Captured memories of us" }
      ],
      views: 142,
      createdAt: new Date().toISOString(),
    }
  ]
};

// Helper to read database
export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(SEED_DATA, null, 2), "utf-8");
      return SEED_DATA;
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db file, returning seed data:", error);
    return SEED_DATA;
  }
}

// Helper to write database
export function writeDb(data: DatabaseSchema): boolean {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to db file:", error);
    return false;
  }
}

// Db operations matching standard queries
export const db = {
  users: {
    findMany: () => {
      const store = readDb();
      return store.users;
    },
    findByEmail: (email: string) => {
      const store = readDb();
      return store.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    },
    findById: (id: string) => {
      const store = readDb();
      return store.users.find(u => u.id === id) || null;
    },
    create: (user: Omit<User, "id" | "createdAt" | "plan">) => {
      const store = readDb();
      const newUser: User = {
        ...user,
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        plan: "free",
        createdAt: new Date().toISOString()
      };
      store.users.push(newUser);
      writeDb(store);
      return newUser;
    },
    updatePlan: (id: string, plan: "free" | "premium" | "ultra") => {
      const store = readDb();
      const user = store.users.find(u => u.id === id);
      if (user) {
        user.plan = plan;
        writeDb(store);
        return user;
      }
      return null;
    }
  },
  stories: {
    findMany: () => {
      const store = readDb();
      return store.stories;
    },
    findBySlug: (slug: string) => {
      const store = readDb();
      return store.stories.find(s => s.slug.toLowerCase() === slug.toLowerCase()) || null;
    },
    findById: (id: string) => {
      const store = readDb();
      return store.stories.find(s => s.id === id) || null;
    },
    findByUserId: (userId: string) => {
      const store = readDb();
      return store.stories.filter(s => s.userId === userId);
    },
    create: (story: Omit<LoveStory, "id" | "createdAt" | "views">) => {
      const store = readDb();
      const newStory: LoveStory = {
        ...story,
        id: `story-${Math.random().toString(36).substr(2, 9)}`,
        views: 0,
        createdAt: new Date().toISOString()
      };
      store.stories.push(newStory);
      writeDb(store);
      return newStory;
    },
    update: (id: string, storyData: Partial<Omit<LoveStory, "id" | "createdAt" | "views" | "userId">>) => {
      const store = readDb();
      const index = store.stories.findIndex(s => s.id === id);
      if (index !== -1) {
        store.stories[index] = {
          ...store.stories[index],
          ...storyData
        } as LoveStory;
        writeDb(store);
        return store.stories[index];
      }
      return null;
    },
    delete: (id: string) => {
      const store = readDb();
      const filtered = store.stories.filter(s => s.id !== id);
      const isDeleted = filtered.length < store.stories.length;
      if (isDeleted) {
        store.stories = filtered;
        writeDb(store);
      }
      return isDeleted;
    },
    incrementViews: (slug: string) => {
      const store = readDb();
      const story = store.stories.find(s => s.slug.toLowerCase() === slug.toLowerCase());
      if (story) {
        story.views += 1;
        writeDb(store);
      }
    }
  }
};
