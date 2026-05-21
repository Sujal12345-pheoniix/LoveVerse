"use client";

import { useState, useTransition } from "react";
import { signupAction } from "@/app/actions";
import Link from "next/link";
import { Heart, User, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signupAction(null, formData);
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Failed to create account.");
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#070114] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Registration Card */}
      <div className="w-full max-w-md glass p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-serif italic text-3xl mb-4 text-white hover:text-pink-200 transition">
            <span>LoveVerse</span>
            <Heart size={20} className="text-pink-500 fill-pink-500" />
          </Link>
          <h2 className="text-2xl font-serif text-white">Create your account</h2>
          <p className="text-gray-400 text-xs mt-1">Begin crafting your custom romantic memory experience</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                name="name"
                required
                placeholder="Sujal Dev"
                className="w-full bg-white/5 border border-white/10 focus:border-pink-500 focus:bg-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                className="w-full bg-white/5 border border-white/10 focus:border-pink-500 focus:bg-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 focus:border-pink-500 focus:bg-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition"
              />
            </div>
          </div>

          <div className="text-xs text-gray-400 leading-normal">
            By signing up, you agree to our terms of service. You will start on our <span className="text-pink-400 font-semibold">Free lifetime plan</span>.
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(236,72,153,0.2)]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Registering account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-400">
          <span>Already have an account? </span>
          <Link href="/login" className="text-pink-400 font-semibold hover:underline">Log in here</Link>
        </div>
      </div>
    </main>
  );
}
