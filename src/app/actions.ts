"use server";

import { db, User, LoveStory } from "@/lib/db";
import { hashPassword, setSession, clearSession, getSessionUser } from "@/lib/auth";
import { generateLoveStory, generatePoeticCaption, suggestMusicMood } from "@/lib/gemini";
import { revalidatePath } from "next/cache";

// ----------------- AUTH ACTIONS -----------------

export async function signupAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
      return { success: false, error: "Please fill out all fields." };
    }

    const existingUser = db.users.findByEmail(email);
    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    const passwordHash = hashPassword(password);
    const newUser = db.users.create({
      email,
      passwordHash,
      name,
    });

    await setSession(newUser.id);
    return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Please enter email and password." };
    }

    const user = db.users.findByEmail(email);
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const passwordHash = hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      return { success: false, error: "Invalid email or password." };
    }

    await setSession(user.id);
    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

export async function logoutAction() {
  await clearSession();
  return { success: true };
}

export async function getLoggedInUser() {
  const user = await getSessionUser();
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name, plan: user.plan };
}

// ----------------- STORY ACTIONS -----------------

export async function createStoryAction(storyData: {
  slug: string;
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
}) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // Clean slug
    const cleanSlug = storyData.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    if (!cleanSlug) {
      return { success: false, error: "Invalid website link." };
    }

    // Check slug uniqueness
    const existing = db.stories.findBySlug(cleanSlug);
    if (existing) {
      return { success: false, error: `The link 'loveverse.app/${cleanSlug}' is already taken.` };
    }

    // Free plan constraints check (e.g. max 1 story, limited photos)
    const userStories = db.stories.findByUserId(user.id);
    if (user.plan === "free" && userStories.length >= 1) {
      return {
        success: false,
        error: "Free users can only create 1 love story. Upgrade to Premium for unlimited stories!"
      };
    }

    const newStory = db.stories.create({
      ...storyData,
      slug: cleanSlug,
      userId: user.id
    });

    revalidatePath("/dashboard");
    return { success: true, story: newStory };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create story." };
  }
}

export async function updateStoryAction(
  id: string,
  storyData: {
    slug: string;
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
  }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const story = db.stories.findById(id);
    if (!story) {
      return { success: false, error: "Story not found." };
    }

    if (story.userId !== user.id && user.email !== "admin@loveverse.app") {
      return { success: false, error: "Access denied." };
    }

    // Clean slug
    const cleanSlug = storyData.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    // If slug changed, verify uniqueness
    if (cleanSlug !== story.slug) {
      const existing = db.stories.findBySlug(cleanSlug);
      if (existing) {
        return { success: false, error: `The link 'loveverse.app/${cleanSlug}' is already taken.` };
      }
    }

    const updated = db.stories.update(id, {
      ...storyData,
      slug: cleanSlug
    });

    revalidatePath("/dashboard");
    revalidatePath(`/story/${cleanSlug}`);
    revalidatePath(`/story/${story.slug}`);
    return { success: true, story: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update story." };
  }
}

export async function deleteStoryAction(id: string) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const story = db.stories.findById(id);
    if (!story) {
      return { success: false, error: "Story not found." };
    }

    if (story.userId !== user.id && user.email !== "admin@loveverse.app") {
      return { success: false, error: "Access denied." };
    }

    const success = db.stories.delete(id);
    revalidatePath("/dashboard");
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete story." };
  }
}

export async function getStoryBySlug(slug: string) {
  try {
    const story = db.stories.findBySlug(slug);
    if (story) {
      // Increment views asynchronously/increment in db
      db.stories.incrementViews(slug);
    }
    return story;
  } catch (error) {
    return null;
  }
}

export async function getUserStories() {
  try {
    const user = await getSessionUser();
    if (!user) return [];
    return db.stories.findByUserId(user.id);
  } catch (error) {
    return [];
  }
}

export async function upgradePlanAction(plan: "free" | "premium" | "ultra") {
  try {
    const user = await getSessionUser();
    if (!user) return { success: false, error: "Please log in first." };

    const updated = db.users.updatePlan(user.id, plan);
    revalidatePath("/dashboard");
    return { success: true, plan: updated?.plan };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ----------------- AI ACTIONS -----------------

export async function generateStoryAiAction(input: {
  partnerA: string;
  partnerB: string;
  anniversaryDate: string;
  notes: string;
  memoriesList: string[];
}) {
  try {
    const text = await generateLoveStory(input);
    return { success: true, text };
  } catch (error: any) {
    return { success: false, error: error.message || "AI Generation failed." };
  }
}

export async function generateCaptionAiAction(input: {
  partnerA: string;
  partnerB: string;
  imageDescription: string;
}) {
  try {
    const text = await generatePoeticCaption(input);
    return { success: true, text };
  } catch (error: any) {
    return { success: false, error: error.message || "AI Caption generation failed." };
  }
}

export async function generateMusicMoodAiAction(input: {
  partnerA: string;
  partnerB: string;
  relationshipVibe: string;
}) {
  try {
    const data = await suggestMusicMood(input);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "AI Music suggestion failed." };
  }
}

// ----------------- ADMIN ACTIONS -----------------

export async function getAdminStatsAction() {
  try {
    const user = await getSessionUser();
    if (!user || user.email !== "admin@loveverse.app") {
      return { success: false, error: "Access denied." };
    }

    const allUsers = db.users.findMany();
    const allStories = db.stories.findMany();

    const premiumCount = allUsers.filter(u => u.plan === "premium").length;
    const ultraCount = allUsers.filter(u => u.plan === "ultra").length;
    const freeCount = allUsers.filter(u => u.plan === "free").length;

    const totalViews = allStories.reduce((acc, s) => acc + s.views, 0);

    return {
      success: true,
      stats: {
        totalUsers: allUsers.length,
        totalStories: allStories.length,
        premiumCount,
        ultraCount,
        freeCount,
        totalViews,
        stories: allStories.map(s => ({
          id: s.id,
          slug: s.slug,
          partnerA: s.partnerA,
          partnerB: s.partnerB,
          views: s.views,
          theme: s.theme,
          createdAt: s.createdAt
        })),
        users: allUsers.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          plan: u.plan,
          createdAt: u.createdAt
        }))
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
