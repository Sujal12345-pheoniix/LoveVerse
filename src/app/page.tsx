import Link from "next/link";
import Scene3D from "@/components/3d/Scene3D";
import { getLoggedInUser } from "./actions";
import { Heart, Sparkles, Wand2, Music, Share2, ShieldCheck, Check, MessageSquare, ArrowRight, Zap, Star } from "lucide-react";

export default async function LandingPage() {
  const user = await getLoggedInUser();

  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-pink-500" />,
      title: "AI Relationship Storywriter",
      description: "Our emotional engine turns raw messages, milestones, and notes into a cohesive, cinematic love story."
    },
    {
      icon: <Music className="w-6 h-6 text-pink-500" />,
      title: "Atmospheric Soundscapes",
      description: "Match your relationship vibe with tailored romantic instrumental tracks, soft lofi beats, or cinematic orchestral themes."
    },
    {
      icon: <Share2 className="w-6 h-6 text-pink-500" />,
      title: "Unique Custom Slugs",
      description: "Share your platform at a custom, elegant link (e.g. loveverse.app/sujal-ananya) perfect for surprises, anniversaries, or wedding invitations."
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Polaroid Masonry Layouts",
      description: "Upload couple memories that render as interactive, draggable physical polaroids with realistic physics and custom annotations."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Cinematic Animations",
      description: "Built with Framer Motion, GSAP, and smooth scrolling for a premium, Apple-level luxury feeling."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-pink-500" />,
      title: "Secure & Ad-Free",
      description: "Your intimate memories are safe, private, and hosted on premium encrypted databases free of tracking and ads."
    }
  ];

  const themes = [
    { name: "Dreamy Pink", color: "from-pink-100 to-rose-200", desc: "Soft pastel pink colors with glowing heartbeat overlays." },
    { name: "Luxury Dark Romance", color: "from-[#1d0e2e] to-[#0a050f] text-yellow-500", desc: "Golden accents on rich dark velvet backdrops." },
    { name: "Galaxy Love", color: "from-[#13073a] to-[#040112] text-pink-400", desc: "Space nebula, shooting star trails, and cosmic sparkles." },
    { name: "Korean Soft Aesthetic", color: "from-[#faf6f0] to-[#f4ebe1] text-[#cda177]", desc: "Clean cream layout, polaroid cards, and warm shadows." },
    { name: "Vintage Polaroid", color: "from-[#f4ebd9] to-[#eeddbd] text-[#7a5330]", desc: "Aged paper structures with retro typewriter font styling." },
    { name: "Bollywood Romance", color: "from-[#ffe6ea] to-[#ffd6e0] text-red-600", desc: "Vibrant red and orange palettes with high energy particles." }
  ];

  return (
    <main className="min-h-screen bg-[#070114] text-white overflow-hidden relative selection:bg-pink-500/30 selection:text-pink-300">
      {/* 3D Visualizer Background */}
      <div className="absolute inset-0 h-[100vh] w-full z-0 pointer-events-none opacity-80">
        <Scene3D />
      </div>

      {/* Floating Background Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[130px] z-0 pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[130px] z-0 pointer-events-none animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[160px] z-0 pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="font-serif italic text-2xl tracking-widest text-white hover:text-pink-200 transition flex items-center gap-2">
          <span>LoveVerse</span>
          <Heart size={18} className="text-pink-500 fill-pink-500 animate-pulse" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#features" className="hidden md:inline text-sm text-gray-400 hover:text-white transition">Features</Link>
          <Link href="#themes" className="hidden md:inline text-sm text-gray-400 hover:text-white transition">Themes</Link>
          <Link href="#pricing" className="hidden md:inline text-sm text-gray-400 hover:text-white transition">Pricing</Link>
          {user ? (
            <Link 
              href="/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs tracking-widest uppercase font-bold px-6 py-2.5 rounded-full transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-300 hover:text-white transition">Login</Link>
              <Link 
                href="/register"
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs tracking-widest uppercase font-bold px-6 py-2.5 rounded-full transition shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-pink-300 tracking-wider uppercase mb-8 backdrop-blur-md">
          <Sparkles size={12} className="animate-spin" />
          <span>Announcing LoveVerse 2.0</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white max-w-5xl leading-tight mb-8">
          Your memories deserve more than a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 italic">photo album.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          Turn your milestones, messages, and photographs into a stunning, cinematic, AI-powered romantic website in minutes. Share the magic with your partner forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href={user ? "/dashboard" : "/register"}
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-semibold py-4 px-8 rounded-full transition duration-300 shadow-[0_0_40px_rgba(244,63,94,0.4)] flex items-center gap-2 hover:scale-105"
          >
            <span>Create Your Love Story</span>
            <ArrowRight size={16} />
          </Link>
          <Link 
            href="/story/demo"
            className="glass hover:bg-white/10 text-white font-medium py-4 px-8 rounded-full transition duration-300 flex items-center gap-2 hover:scale-105 border border-white/10"
          >
            <span>Watch Live Demo</span>
          </Link>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5 bg-[#0a021b]/40 backdrop-blur-2xl">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Crafted for Romance</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Every pixel, fade, and interaction is fine-tuned to recreate the warmth and details of your unique journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/10 hover:border-pink-500/30 transition duration-500 hover:bg-white/[0.03] group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500/20 group-hover:scale-110 transition duration-300">
                {feat.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Themes Showcases Section */}
      <section id="themes" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Curated Romantic Aesthetics</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Choose from a rich library of pre-designed premium styling templates configured to align with your lover's aesthetic taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden border border-white/10 hover:scale-103 transition duration-500 flex flex-col group">
              <div className={`h-48 bg-gradient-to-tr ${theme.color} flex items-center justify-center relative p-6 overflow-hidden`}>
                {/* Visual backdrop patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px]" />
                <span className="font-serif italic text-3xl font-extrabold drop-shadow-md z-10 text-center select-none">{theme.name}</span>
                <div className="absolute -bottom-10 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition duration-500" />
              </div>
              <div className="p-6 bg-white/[0.01] flex-1 flex flex-col justify-between">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{theme.desc}</p>
                <div className="text-xs text-pink-300 font-semibold tracking-wider flex items-center gap-1">
                  <span>Available on all accounts</span>
                  <Check size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Process Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 bg-gradient-to-br from-pink-900/20 to-purple-950/20 rounded-[40px] border border-white/5 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-pink-500/10 text-pink-300 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-6">
              <Zap size={10} className="fill-pink-300" />
              <span>AI Writing Companion</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Struggling with words? Let our AI paint the picture.
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              We leverage advanced language intelligence via the Google Gemini API to analyze your raw relationship notes, anniversaries, and image descriptions. Within seconds, we write cohesive, poetry-grade declarations and title stories that capture the exact emotional weight of your bond.
            </p>
            <ul className="space-y-4">
              {[
                "Generates cinematic relationship titles from simple dates",
                "Rewrites list points into lyrical love letters",
                "Suggests matching song choices depending on relationship vibes"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                    <Check size={12} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-black/40">
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-400 ml-4 font-mono">loveverse-ai-generator.sh</span>
            </div>
            <div className="space-y-4 font-mono text-xs text-gray-300">
              <p className="text-pink-400">// Prompt inputs provided by you:</p>
              <p className="bg-white/5 p-3 rounded-lg text-gray-400">
                "We met at coffee shop. He spilled hot mocha. I laughed. Been together 3 years."
              </p>
              <p className="text-purple-400">// Output Generated by Gemini:</p>
              <div className="bg-pink-900/10 p-3 rounded-lg text-pink-200 border-l-2 border-pink-500 italic leading-relaxed">
                "Our story began in the warm aroma of spilled coffee and sudden laughter. What felt like an clumsy moment was actually fate knocking quietly, starting a three-year symphony of love."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Simple, transparent plans</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Create a unique experience. Start free and upgrade to unlock advanced features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Plan */}
          <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition duration-300">
            <div>
              <span className="text-gray-400 text-xs uppercase font-bold tracking-widest block mb-2">Free Plan</span>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold font-serif">$0</span>
                <span className="text-gray-400 text-sm ml-2">/ lifetime</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Perfect to test the platform and design a simple gift layout.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "1 active love story page",
                  "Up to 3 photo uploads",
                  "Limited standard themes",
                  "LoveVerse brand watermark"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check size={14} className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              href={user ? "/dashboard" : "/register"}
              className="w-full text-center glass hover:bg-white/10 text-white font-medium py-3 rounded-full text-xs transition"
            >
              Get Started
            </Link>
          </div>

          {/* Premium Plan (Most Popular) */}
          <div className="glass p-8 rounded-3xl border-2 border-pink-500 relative flex flex-col justify-between shadow-[0_0_30px_rgba(236,72,153,0.15)] bg-gradient-to-b from-black via-[#070114] to-black">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] uppercase font-bold tracking-widest py-1 px-4 rounded-full flex items-center gap-1">
              <Star size={10} className="fill-white" />
              <span>Most Immersive</span>
            </div>
            <div>
              <span className="text-pink-300 text-xs uppercase font-bold tracking-widest block mb-2 mt-2">Premium Story</span>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold font-serif">$12</span>
                <span className="text-gray-400 text-sm ml-2">/ one-time</span>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Unlock full storytelling customizability for anniversaries or surprises.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited memories & text blocks",
                  "Up to 20 high-res photo uploads",
                  "Full premium theme selection",
                  "AI love-story content drafting",
                  "Remove all watermarks & ads",
                  "Priority custom shared slug link"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-100">
                    <Check size={14} className="text-pink-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              href={user ? "/dashboard" : "/register"}
              className="w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white font-bold py-3 rounded-full text-xs transition shadow-md"
            >
              Upgrade Now
            </Link>
          </div>

          {/* Ultra Premium */}
          <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition duration-300">
            <div>
              <span className="text-gray-400 text-xs uppercase font-bold tracking-widest block mb-2">Ultra Premium</span>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold font-serif">$29</span>
                <span className="text-gray-400 text-sm ml-2">/ one-time</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                For ultimate lovers looking for complete platform customization.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Premium plan",
                  "Unlimited photo uploads",
                  "Dynamic customized backgrounds",
                  "AI video generation (Beta)",
                  "Custom domain configuration",
                  "24/7 dedicated support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check size={14} className="text-pink-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              href={user ? "/dashboard" : "/register"}
              className="w-full text-center glass hover:bg-white/10 text-white font-medium py-3 rounded-full text-xs transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordions Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How does the AI storytelling helper work?",
              a: "When building a love story, you can write short bullet points or rough memories. Our built-in helper sends these inputs securely to Google Gemini, which rewrites them into a highly romantic, poetic, and cinematic narrative. You can edit the text as much as you like before publishing."
            },
            {
              q: "Can I password protect my love story website?",
              a: "Currently, pages are accessed via their unique custom slug. Premium users have the option to keep their page completely unlisted from search engines, and we are rolling out pin-code page protection shortly."
            },
            {
              q: "How long does my page stay online?",
              a: "Once generated, your love story stays online permanently. There are no monthly hosting fees or subscriptions—it's a single one-time charge for premium pages."
            },
            {
              q: "Can I update the page after it's published?",
              a: "Absolutely! You can log into your LoveVerse dashboard at any time to add new memories, update text, upload new photographs, or change the background music and styling theme. Changes reflect instantly."
            }
          ].map((faq, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-semibold mb-2 font-serif text-pink-300">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32 border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to surprise them?</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-12">
          Turn your love story into a breathtaking experience they will remember forever. Sign up today and build your digital gift in under ten minutes.
        </p>
        <Link 
          href={user ? "/dashboard" : "/register"}
          className="bg-white hover:bg-gray-100 text-black font-bold tracking-widest uppercase text-xs px-10 py-4 rounded-full transition duration-300 hover:scale-105 inline-flex items-center gap-2"
        >
          <span>Create Your Story</span>
          <Heart size={14} className="fill-red-500 text-red-500" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} LoveVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-white transition">Login</Link>
            <Link href="/register" className="hover:text-white transition">Sign Up</Link>
            <Link href="/story/demo" className="hover:text-white transition">View Demo</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
