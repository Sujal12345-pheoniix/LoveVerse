import { getLoggedInUser } from "@/app/actions";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import StoryForm from "@/components/StoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Edit Love Story | LoveVerse",
  description: "Update your relationship highlights, themes, and soundscapes."
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params;
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  // Retrieve the story by ID directly from server-side db client
  const story = db.stories.findById(id);

  if (!story) {
    notFound();
  }

  // Check permissions (ensure user owns story, or is admin)
  if (story.userId !== user.id && user.email !== "admin@loveverse.app") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#070114] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-gray-400 hover:text-white"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif">Edit Love Story</h1>
            <p className="text-xs text-gray-400 mt-1">
              Updating story page for {story.partnerA} & {story.partnerB}
            </p>
          </div>
        </div>

        <StoryForm initialData={story} />
      </div>
    </main>
  );
}
