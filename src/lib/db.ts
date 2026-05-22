import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export type UserPlan = "free" | "premium" | "ultra";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  plan: UserPlan;
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

type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  plan: UserPlan;
  createdAt: Date;
};

type StoryRecord = {
  id: string;
  slug: string;
  userId: string;
  partnerA: string;
  partnerB: string;
  relationshipTitle: string;
  anniversaryDate: string;
  theme: string;
  musicMood: string;
  musicUrl: string | null;
  loveLetter: string;
  whyILoveYou: Prisma.JsonValue;
  moments: Prisma.JsonValue;
  photos: Prisma.JsonValue;
  views: number;
  createdAt: Date;
};

function mapUser(user: UserRecord): User {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    name: user.name,
    plan: user.plan,
    createdAt: user.createdAt.toISOString(),
  };
}

function mapStory(story: StoryRecord): LoveStory {
  return {
    id: story.id,
    slug: story.slug,
    userId: story.userId,
    partnerA: story.partnerA,
    partnerB: story.partnerB,
    relationshipTitle: story.relationshipTitle,
    anniversaryDate: story.anniversaryDate,
    theme: story.theme,
    musicMood: story.musicMood,
    musicUrl: story.musicUrl ?? undefined,
    loveLetter: story.loveLetter,
    whyILoveYou: story.whyILoveYou as LoveStory["whyILoveYou"],
    moments: story.moments as LoveStory["moments"],
    photos: story.photos as LoveStory["photos"],
    views: story.views,
    createdAt: story.createdAt.toISOString(),
  };
}

export const db = {
  users: {
    findMany: async () => {
      const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
      return users.map(mapUser);
    },
    findByEmail: async (email: string) => {
      const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
      });
      return user ? mapUser(user) : null;
    },
    findById: async (id: string) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user ? mapUser(user) : null;
    },
    create: async (user: Omit<User, "id" | "createdAt" | "plan">) => {
      const created = await prisma.user.create({
        data: {
          email: user.email,
          passwordHash: user.passwordHash,
          name: user.name,
          plan: "free",
        },
      });
      return mapUser(created);
    },
    updatePlan: async (id: string, plan: UserPlan) => {
      const existing = await prisma.user.findUnique({ where: { id } });
      if (!existing) {
        return null;
      }

      const updated = await prisma.user.update({
        where: { id },
        data: { plan },
      });
      return mapUser(updated);
    },
  },
  stories: {
    findMany: async () => {
      const stories = await prisma.loveStory.findMany({ orderBy: { createdAt: "desc" } });
      return stories.map(mapStory);
    },
    findBySlug: async (slug: string) => {
      const story = await prisma.loveStory.findFirst({
        where: { slug: { equals: slug, mode: "insensitive" } },
      });
      return story ? mapStory(story) : null;
    },
    findById: async (id: string) => {
      const story = await prisma.loveStory.findUnique({ where: { id } });
      return story ? mapStory(story) : null;
    },
    findByUserId: async (userId: string) => {
      const stories = await prisma.loveStory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return stories.map(mapStory);
    },
    create: async (story: Omit<LoveStory, "id" | "createdAt" | "views">) => {
      const created = await prisma.loveStory.create({
        data: {
          slug: story.slug,
          userId: story.userId,
          partnerA: story.partnerA,
          partnerB: story.partnerB,
          relationshipTitle: story.relationshipTitle,
          anniversaryDate: story.anniversaryDate,
          theme: story.theme,
          musicMood: story.musicMood,
          musicUrl: story.musicUrl ?? null,
          loveLetter: story.loveLetter,
          whyILoveYou: story.whyILoveYou as Prisma.InputJsonValue,
          moments: story.moments as Prisma.InputJsonValue,
          photos: story.photos as Prisma.InputJsonValue,
          views: 0,
        },
      });
      return mapStory(created);
    },
    update: async (id: string, storyData: Partial<Omit<LoveStory, "id" | "createdAt" | "views" | "userId">>) => {
      const existing = await prisma.loveStory.findUnique({ where: { id } });
      if (!existing) {
        return null;
      }

      const updated = await prisma.loveStory.update({
        where: { id },
        data: {
          ...storyData,
          musicUrl: storyData.musicUrl ?? null,
          whyILoveYou: storyData.whyILoveYou as Prisma.InputJsonValue | undefined,
          moments: storyData.moments as Prisma.InputJsonValue | undefined,
          photos: storyData.photos as Prisma.InputJsonValue | undefined,
        },
      });
      return mapStory(updated);
    },
    delete: async (id: string) => {
      const result = await prisma.loveStory.deleteMany({ where: { id } });
      return result.count > 0;
    },
    incrementViews: async (slug: string) => {
      await prisma.loveStory.update({
        where: { slug },
        data: { views: { increment: 1 } },
      }).catch(() => null);
    },
  },
};