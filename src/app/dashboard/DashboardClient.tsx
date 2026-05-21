"use client";

import { useState, useTransition } from "react";
import { logoutAction, deleteStoryAction, upgradePlanAction } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Plus, ExternalLink, Edit2, Trash2, Copy, Check, LogOut, ShieldAlert, Award, Loader2, Calendar, Eye } from "lucide-react";
import confetti from "canvas-confetti";

interface DashboardClientProps {
  user: {
    id: string;
    email: string;
    name: string;
    plan: "free" | "premium" | "ultra";
  };
  initialStories: any[];
}

export default function DashboardClient({ user: initialUser, initialStories }: DashboardClientProps) {
  const [user, setUser] = useState(initialUser);
  const [stories, setStories] = useState(initialStories);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
    router.refresh();
  };

  const handleCopyLink = async (slug: string, id: string) => {
    try {
      const origin = window.location.origin;
      await navigator.clipboard.writeText(`${origin}/story/${slug}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this love story? This action cannot be undone.")) return;
    setDeletingId(id);
    
    startTransition(async () => {
      const result = await deleteStoryAction(id);
      if (result.success) {
        setStories(prev => prev.filter(s => s.id !== id));
      } else {
        alert("Failed to delete story.");
      }
      setDeletingId(null);
    });
  };

  const handleUpgrade = async (plan: "premium" | "ultra") => {
    startTransition(async () => {
      const result = await upgradePlanAction(plan);
      if (result.success && result.plan) {
        setUser(prev => ({ ...prev, plan: result.plan as any }));
        // Trigger confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff4d6d", "#ff85a1", "#ffb3c1", "#ffcc00"]
        });
        alert(`Congratulations! You have been upgraded to the ${plan.toUpperCase()} plan.`);
      } else {
        alert(result.error || "Failed to upgrade plan.");
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#070114] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="font-serif italic text-2xl text-white hover:text-pink-200 transition flex items-center gap-2">
                <span>LoveVerse</span>
                <Heart size={18} className="text-pink-500 fill-pink-500" />
              </Link>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                user.plan === "ultra" 
                  ? "bg-purple-900/20 text-purple-300 border-purple-500/30"
                  : user.plan === "premium"
                  ? "bg-pink-900/20 text-pink-300 border-pink-500/30"
                  : "bg-white/5 text-gray-400 border-white/10"
              }`}>
                {user.plan} Account
              </span>
            </div>
            <h1 className="text-3xl font-serif mt-2">Welcome back, {user.name}</h1>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {user.email === "admin@loveverse.app" && (
              <Link 
                href="/admin"
                className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs tracking-wider uppercase font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <ShieldAlert size={14} />
                <span>Admin Panel</span>
              </Link>
            )}

            {user.plan === "free" && (
              <button 
                onClick={() => handleUpgrade("premium")}
                disabled={isPending}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 disabled:opacity-50 text-white text-xs tracking-wider uppercase font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                <Award size={14} />
                <span>Upgrade to Premium ($12)</span>
              </button>
            )}

            <button 
              onClick={handleLogout}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs tracking-wider uppercase font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Stories Listing */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Your Stories</h2>
            
            {/* Limit display for free users */}
            {user.plan === "free" && stories.length >= 1 ? (
              <span className="text-xs text-pink-400 font-semibold bg-pink-500/10 py-1.5 px-3 rounded-full border border-pink-500/20">
                Story limit reached. Upgrade to Premium for unlimited stories!
              </span>
            ) : (
              <Link 
                href="/dashboard/new"
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs tracking-widest uppercase font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 hover:scale-103"
              >
                <Plus size={14} />
                <span>Create New Love Story</span>
              </Link>
            )}
          </div>

          {stories.length === 0 ? (
            /* Empty State */
            <div className="glass p-12 text-center rounded-3xl border border-white/5 max-w-xl mx-auto mt-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl" />
              <Heart size={40} className="text-pink-500/35 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-serif mb-2">No love stories created yet</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Start sharing your romantic highlights. Upload photos, write thoughts, choose themes, and build your custom relationship scrapbook today.
              </p>
              <Link 
                href="/dashboard/new"
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs tracking-widest uppercase font-bold px-6 py-3 rounded-xl transition inline-flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Create Your First Story</span>
              </Link>
            </div>
          ) : (
            /* Story Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {stories.map(story => (
                <div key={story.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-pink-500/20 transition duration-300 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500" />
                  
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-serif text-white leading-tight">
                          {story.partnerA} & {story.partnerB}
                        </h3>
                        <p className="text-xs text-pink-300 font-serif italic mt-1">{story.relationshipTitle || "Our Story"}</p>
                      </div>
                      <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                        {story.theme.replace("-", " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-pink-500" />
                        <span>Anniversary: {story.anniversaryDate}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-pink-500" />
                        <span>{story.views} views</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5 flex-wrap">
                    <Link 
                      href={`/story/${story.slug}`}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium p-2.5 rounded-xl text-xs transition flex-1 flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      <span>View</span>
                    </Link>

                    <Link 
                      href={`/dashboard/edit/${story.id}`}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium p-2.5 rounded-xl text-xs transition flex-1 flex items-center justify-center gap-1.5"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </Link>

                    <button 
                      onClick={() => handleCopyLink(story.slug, story.id)}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium p-2.5 rounded-xl text-xs transition flex-1 flex items-center justify-center gap-1.5"
                    >
                      {copiedId === story.id ? (
                        <>
                          <Check size={14} className="text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Link</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={() => handleDelete(story.id)}
                      disabled={deletingId === story.id}
                      className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium p-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      {deletingId === story.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
