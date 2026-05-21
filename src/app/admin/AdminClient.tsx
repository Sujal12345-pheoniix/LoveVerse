"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Users, FileText, Eye, ShieldAlert, ExternalLink, Calendar, ArrowLeft } from "lucide-react";

interface AdminClientProps {
  initialStats: {
    totalUsers: number;
    totalStories: number;
    premiumCount: number;
    ultraCount: number;
    freeCount: number;
    totalViews: number;
    stories: any[];
    users: any[];
  };
}

export default function AdminClient({ initialStats }: AdminClientProps) {
  const [stats] = useState(initialStats);
  const [activeTab, setActiveTab] = useState<"stories" | "users">("stories");

  return (
    <main className="min-h-screen bg-[#070114] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-white/5 mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-gray-400 hover:text-white"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-purple-400 font-serif font-semibold text-xs uppercase tracking-widest">
                <ShieldAlert size={14} />
                <span>Super Admin console</span>
              </div>
              <h1 className="text-3xl font-serif mt-1">Platform Analytics</h1>
            </div>
          </div>

          <Link href="/" className="font-serif italic text-2xl tracking-widest text-white hover:text-pink-200 transition flex items-center gap-2">
            <span>LoveVerse</span>
            <Heart size={18} className="text-pink-500 fill-pink-500" />
          </Link>
        </header>

        {/* Analytics Summary Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          
          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Registrations</span>
              <Users size={20} className="text-purple-400" />
            </div>
            <div className="text-3xl font-bold font-serif">{stats.totalUsers}</div>
            <div className="text-[10px] text-gray-500 mt-2">
              {stats.freeCount} free • {stats.premiumCount} premium • {stats.ultraCount} ultra
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Active Stories</span>
              <FileText size={20} className="text-pink-400" />
            </div>
            <div className="text-3xl font-bold font-serif">{stats.totalStories}</div>
            <div className="text-[10px] text-gray-500 mt-2">Custom love pages hosted</div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total views count</span>
              <Eye size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold font-serif">{stats.totalViews}</div>
            <div className="text-[10px] text-gray-500 mt-2">Accumulated page views</div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Conversion Rate</span>
              <Heart size={20} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-bold font-serif">
              {stats.totalUsers > 0 
                ? ((stats.premiumCount + stats.ultraCount) / stats.totalUsers * 100).toFixed(1)
                : 0}%
            </div>
            <div className="text-[10px] text-gray-500 mt-2">Paid vs free ratio</div>
          </div>

        </section>

        {/* Tabs Control */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab("stories")}
            className={`py-3.5 px-6 font-serif text-sm tracking-wider uppercase border-b-2 transition ${
              activeTab === "stories"
                ? "border-pink-500 text-white font-bold"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Stories Portfolio ({stats.totalStories})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-3.5 px-6 font-serif text-sm tracking-wider uppercase border-b-2 transition ${
              activeTab === "users"
                ? "border-purple-500 text-white font-bold"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Registered Users ({stats.totalUsers})
          </button>
        </div>

        {/* Tab Contents: STORIES TABLE */}
        {activeTab === "stories" && (
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase text-gray-400 tracking-wider">
                    <th className="p-5 font-bold">Couple Names</th>
                    <th className="p-5 font-bold">Slug URL</th>
                    <th className="p-5 font-bold">Theme Style</th>
                    <th className="p-5 font-bold text-center">Views</th>
                    <th className="p-5 font-bold">Created Date</th>
                    <th className="p-5 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.stories.map((story) => (
                    <tr key={story.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-5 font-serif font-semibold text-white">
                        {story.partnerA} & {story.partnerB}
                      </td>
                      <td className="p-5 font-mono text-xs text-pink-300">
                        /{story.slug}
                      </td>
                      <td className="p-5 text-gray-300 text-xs">
                        {story.theme}
                      </td>
                      <td className="p-5 text-center font-semibold text-blue-400 text-xs">
                        {story.views}
                      </td>
                      <td className="p-5 text-gray-400 text-xs flex items-center gap-1.5 mt-1.5">
                        <Calendar size={12} />
                        <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="p-5 text-center">
                        <Link 
                          href={`/story/${story.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          <ExternalLink size={12} />
                          <span>View Story</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Contents: USERS TABLE */}
        {activeTab === "users" && (
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase text-gray-400 tracking-wider">
                    <th className="p-5 font-bold">User Name</th>
                    <th className="p-5 font-bold">Email</th>
                    <th className="p-5 font-bold">Plan status</th>
                    <th className="p-5 font-bold">Registration Date</th>
                    <th className="p-5 font-bold">User ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-5 font-semibold text-white">
                        {usr.name}
                      </td>
                      <td className="p-5 text-gray-300">
                        {usr.email}
                      </td>
                      <td className="p-5">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          usr.plan === "ultra"
                            ? "bg-purple-900/20 text-purple-300 border-purple-500/30"
                            : usr.plan === "premium"
                            ? "bg-pink-900/20 text-pink-300 border-pink-500/30"
                            : "bg-white/5 text-gray-400 border-white/10"
                        }`}>
                          {usr.plan}
                        </span>
                      </td>
                      <td className="p-5 text-gray-400 text-xs">
                        {new Date(usr.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5 font-mono text-[10px] text-gray-500">
                        {usr.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
