import { getLoggedInUser } from "@/app/actions";
import { redirect } from "next/navigation";
import StoryForm from "@/components/StoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Create Love Story | LoveVerse",
  description: "Configure your new custom relationship experience page."
};

export default async function NewStoryPage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
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
            <h1 className="text-3xl font-serif">Create Love Story</h1>
            <p className="text-xs text-gray-400 mt-1">Configure details to publish a cinematic relationship website.</p>
          </div>
        </div>

        <StoryForm />
      </div>
    </main>
  );
}
