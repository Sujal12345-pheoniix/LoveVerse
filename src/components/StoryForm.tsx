"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createStoryAction, updateStoryAction, generateStoryAiAction, generateCaptionAiAction, generateMusicMoodAiAction } from "@/app/actions";
import { Heart, ArrowLeft, ArrowRight, Save, Plus, Trash2, Wand2, Music, Sparkles, Image, Check, Loader2, Calendar, Layout, ChevronRight, HelpCircle } from "lucide-react";

interface StoryFormProps {
  initialData?: any;
}

const AVAILABLE_ICONS = ["Heart", "Stars", "Sparkles", "Music", "Sun", "Cloud", "Shield", "Smile", "Gift", "Flame"];

const THEMES = [
  { id: "dreamy-pink", name: "Dreamy Pink", desc: "Soft blush pinks and heartbeat glows" },
  { id: "luxury-dark", name: "Luxury Dark Romance", desc: "Gold highlights on deep velvet black" },
  { id: "galaxy-love", name: "Galaxy Love", desc: "Nebula colors and cosmic stardust sparkles" },
  { id: "korean-soft", name: "Korean Soft Aesthetic", desc: "Clean beige frames and soft shadows" },
  { id: "vintage-polaroid", name: "Vintage Polaroid", desc: "Retro typewriter styling on paper backgrounds" },
  { id: "bollywood-romance", name: "Bollywood Romance", desc: "Vibrant pinks & marigold sparkles" },
  { id: "anime-love", name: "Anime Love", desc: " Dreamy blossom petals and pastel sky tints" },
  { id: "sunset-memories", name: "Sunset Memories", desc: "Warm gold/orange gradients" },
  { id: "minimal-luxury", name: "Minimal Luxury", desc: "Sleek typography, high contrast design" }
];

export default function StoryForm({ initialData }: StoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeStep, setActiveStep] = useState(1);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Form Fields
  const [partnerA, setPartnerA] = useState(initialData?.partnerA || "");
  const [partnerB, setPartnerB] = useState(initialData?.partnerB || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [relationshipTitle, setRelationshipTitle] = useState(initialData?.relationshipTitle || "Our Story");
  const [anniversaryDate, setAnniversaryDate] = useState(initialData?.anniversaryDate || "");
  const [theme, setTheme] = useState(initialData?.theme || "dreamy-pink");
  const [musicMood, setMusicMood] = useState(initialData?.musicMood || "Romantic Instrumental");
  const [musicUrl, setMusicUrl] = useState(initialData?.musicUrl || "/Saawal.mp3");
  const [loveLetter, setLoveLetter] = useState(initialData?.loveLetter || "");

  // Dynamic Lists
  const [moments, setMoments] = useState<Array<{ date: string; title: string; description: string }>>(
    initialData?.moments || [
      { date: "Oct 18", title: "First Conversation", description: "Where the spark first ignited." }
    ]
  );
  
  const [whyILoveYou, setWhyILoveYou] = useState<Array<{ title: string; description: string; icon: string }>>(
    initialData?.whyILoveYou || [
      { title: "Your Laugh", description: "The melody that brightens my day.", icon: "Music" },
      { title: "Your Kindness", description: "How you warm up every room.", icon: "Heart" }
    ]
  );

  const [photos, setPhotos] = useState<Array<{ src: string; caption: string }>>(
    initialData?.photos || [
      { src: "/images/memory1.jpg", caption: "Every moment with you is a gift." },
      { src: "/images/memory2.jpg", caption: "Your smile is my favorite view." },
      { src: "/images/memory3.jpg", caption: "Holding your hand, always and forever." }
    ]
  );

  // AI Generation inputs
  const [aiNotes, setAiNotes] = useState("");
  const [aiVibe, setAiVibe] = useState("");
  const [aiImageDesc, setAiImageDesc] = useState("");

  // Helpers
  const handleNameChange = (val: string, isPartnerA: boolean) => {
    if (isPartnerA) {
      setPartnerA(val);
      // Auto generate slug if not editing
      if (!initialData) {
        const cleanVal = val.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
        const cleanB = partnerB.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
        setSlug(cleanVal && cleanB ? `${cleanVal}-${cleanB}` : cleanVal || cleanB);
      }
    } else {
      setPartnerB(val);
      if (!initialData) {
        const cleanA = partnerA.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
        const cleanVal = val.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
        setSlug(cleanA && cleanVal ? `${cleanA}-${cleanVal}` : cleanA || cleanVal);
      }
    }
  };

  // Add / Remove List items
  const addMoment = () => setMoments([...moments, { date: "", title: "", description: "" }]);
  const removeMoment = (idx: number) => setMoments(moments.filter((_, i) => i !== idx));
  const updateMoment = (idx: number, key: string, val: string) => {
    const updated = [...moments];
    (updated[idx] as any)[key] = val;
    setMoments(updated);
  };

  const addReason = () => setWhyILoveYou([...whyILoveYou, { title: "", description: "", icon: "Heart" }]);
  const removeReason = (idx: number) => setWhyILoveYou(whyILoveYou.filter((_, i) => i !== idx));
  const updateReason = (idx: number, key: string, val: string) => {
    const updated = [...whyILoveYou];
    (updated[idx] as any)[key] = val;
    setWhyILoveYou(updated);
  };

  const addPhoto = () => setPhotos([...photos, { src: "/images/memory1.jpg", caption: "" }]);
  const removePhoto = (idx: number) => setPhotos(photos.filter((_, i) => i !== idx));
  const updatePhoto = (idx: number, key: string, val: string) => {
    const updated = [...photos];
    (updated[idx] as any)[key] = val;
    setPhotos(updated);
  };

  // AI triggers
  const handleAiStoryGenerate = async () => {
    if (!partnerA || !partnerB) {
      alert("Please fill out your names first.");
      return;
    }
    setAiLoading(true);
    const result = await generateStoryAiAction({
      partnerA,
      partnerB,
      anniversaryDate: anniversaryDate || "our special day",
      notes: aiNotes || "We are best friends who love cooking and travel.",
      memoriesList: moments.map(m => m.title).filter(Boolean)
    });
    setAiLoading(false);
    if (result.success && result.text) {
      setLoveLetter(result.text);
      alert("Love story draft generated! Loaded directly into the Letter box below.");
    } else {
      alert(result.error || "Failed to generate AI story.");
    }
  };

  const handleAiMusicSuggest = async () => {
    if (!partnerA || !partnerB) {
      alert("Please fill out your names first.");
      return;
    }
    setAiLoading(true);
    const result = await generateMusicMoodAiAction({
      partnerA,
      partnerB,
      relationshipVibe: aiVibe || "cozy, cute, dreamy"
    });
    setAiLoading(false);
    if (result.success && result.data) {
      setMusicMood(result.data.mood);
      setMusicUrl(result.data.trackName.includes("Saawal") ? "/Saawal.mp3" : "/Saawal.mp3");
      alert(`AI Recommends: ${result.data.trackName} (${result.data.mood})\nReason: ${result.data.reason}`);
    } else {
      alert(result.error || "Failed to suggest music.");
    }
  };

  const handleAiCaptionGenerate = async (idx: number) => {
    if (!partnerA || !partnerB) {
      alert("Please fill out your names first.");
      return;
    }
    setAiLoading(true);
    const result = await generateCaptionAiAction({
      partnerA,
      partnerB,
      imageDescription: aiImageDesc || "smiling together during summer sunset"
    });
    setAiLoading(true);
    if (result.success && result.text) {
      const updated = [...photos];
      updated[idx].caption = result.text;
      setPhotos(updated);
      alert("Poetic caption generated!");
    } else {
      alert(result.error || "Failed to generate caption.");
    }
    setAiLoading(false);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerA || !partnerB || !slug || !anniversaryDate) {
      alert("Please enter names, anniversary, and website link.");
      return;
    }

    const payload = {
      slug,
      partnerA,
      partnerB,
      relationshipTitle,
      anniversaryDate,
      theme,
      musicMood,
      musicUrl,
      loveLetter,
      whyILoveYou,
      moments,
      photos
    };

    startTransition(async () => {
      let result;
      if (initialData) {
        result = await updateStoryAction(initialData.id, payload);
      } else {
        result = await createStoryAction(payload);
      }

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(result.error || "Failed to save story.");
      }
    });
  };

  return (
    <div className="relative">
      
      {/* AI Assistant Button float */}
      <button 
        type="button"
        onClick={() => setShowAiPanel(!showAiPanel)}
        className="fixed top-6 right-6 z-40 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded-full transition shadow-[0_0_30px_rgba(236,72,153,0.3)] flex items-center gap-2"
      >
        <Wand2 size={16} className="animate-pulse" />
        <span>AI Copilot</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-12 pb-24 max-w-4xl mx-auto">
        
        {/* Step Navigation Indicators */}
        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
          {[
            { step: 1, label: "Basics & Names", icon: <Calendar size={16} /> },
            { step: 2, label: "Timelines & Letters", icon: <Heart size={16} /> },
            { step: 3, label: "Theme & Music", icon: <Layout size={16} /> }
          ].map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(item.step)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeStep === item.step
                  ? "bg-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: BASICS & NAMES */}
        {activeStep === 1 && (
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-2xl font-serif text-pink-300 flex items-center gap-2">
              <Calendar size={22} className="text-pink-500" />
              <span>Step 1: Relationship Basics</span>
            </h2>
            <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sujal"
                  value={partnerA}
                  onChange={(e) => handleNameChange(e.target.value, true)}
                  className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Partner's Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya"
                  value={partnerB}
                  onChange={(e) => handleNameChange(e.target.value, false)}
                  className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Custom Relationship Title</label>
              <input
                type="text"
                placeholder="e.g. Our Infinite Symphony"
                value={relationshipTitle}
                onChange={(e) => setRelationshipTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Anniversary Date</label>
                <input
                  type="date"
                  required
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Website Address Link</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">loveverse.app/story/</span>
                  <input
                    type="text"
                    required
                    placeholder="sujal-ananya"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 pl-[160px] pr-4 text-sm text-white placeholder-gray-600 outline-none transition font-mono"
                  />
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Letters, numbers, dashes, and underscores only. This will be your permanent shareable web address.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TIMELINES & LETTERS */}
        {activeStep === 2 && (
          <div className="space-y-12">
            
            {/* Love Letter Text Box */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-2xl font-serif text-pink-300 flex items-center gap-2">
                <Heart size={22} className="text-pink-500" />
                <span>Your Love Letter</span>
              </h2>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-4" />
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Write a secret message to display inside the unfolding wax-sealed envelope on the website. Keep it heartfelt.
              </p>
              
              <div className="space-y-2">
                <textarea
                  rows={8}
                  placeholder="My dearest partner, from the first time we met..."
                  value={loveLetter}
                  onChange={(e) => setLoveLetter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition font-serif italic leading-relaxed"
                />
              </div>
            </div>

            {/* Timeline Moments list */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-pink-300">Relationship Milestones</h2>
                  <p className="text-xs text-gray-400 mt-1">First conversation, date, vacation, etc.</p>
                </div>
                <button
                  type="button"
                  onClick={addMoment}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase py-2 px-4 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add Moment</span>
                </button>
              </div>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

              <div className="space-y-4">
                {moments.map((moment, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <input
                        type="text"
                        placeholder="e.g. Oct 18"
                        value={moment.date}
                        onChange={(e) => updateMoment(idx, "date", e.target.value)}
                        className="bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="e.g. First Laugh"
                        value={moment.title}
                        onChange={(e) => updateMoment(idx, "title", e.target.value)}
                        className="bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="e.g. Spilled coffee..."
                        value={moment.description}
                        onChange={(e) => updateMoment(idx, "description", e.target.value)}
                        className="bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                      />
                    </div>
                    {moments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMoment(idx)}
                        className="text-red-400 hover:text-red-500 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why I Love You Reasons */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-pink-300">Why I Love You reasons</h2>
                  <p className="text-xs text-gray-400 mt-1">A brief list of some reasons why they are your favorite person</p>
                </div>
                <button
                  type="button"
                  onClick={addReason}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase py-2 px-4 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add Reason</span>
                </button>
              </div>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

              <div className="space-y-4">
                {whyILoveYou.map((reason, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 flex-wrap md:flex-nowrap">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <input
                        type="text"
                        placeholder="Title (e.g. Kindness)"
                        value={reason.title}
                        onChange={(e) => updateReason(idx, "title", e.target.value)}
                        className="bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={reason.description}
                        onChange={(e) => updateReason(idx, "description", e.target.value)}
                        className="bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                      />
                      <select
                        value={reason.icon}
                        onChange={(e) => updateReason(idx, "icon", e.target.value)}
                        className="bg-[#120924] border border-white/10 focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white outline-none transition"
                      >
                        {AVAILABLE_ICONS.map(ic => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                    {whyILoveYou.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReason(idx)}
                        className="text-red-400 hover:text-red-500 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: THEME & MUSIC */}
        {activeStep === 3 && (
          <div className="space-y-12">
            
            {/* Theme selector */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-2xl font-serif text-pink-300 flex items-center gap-2">
                <Layout size={22} className="text-pink-500" />
                <span>Select Romantic Theme</span>
              </h2>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {THEMES.map((themeItem) => (
                  <button
                    key={themeItem.id}
                    type="button"
                    onClick={() => setTheme(themeItem.id)}
                    className={`glass p-5 rounded-2xl border text-left flex flex-col justify-between transition duration-300 relative group ${
                      theme === themeItem.id
                        ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                        : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    {theme === themeItem.id && (
                      <span className="absolute top-3 right-3 bg-pink-500 text-white rounded-full p-0.5">
                        <Check size={10} />
                      </span>
                    )}
                    <h3 className="font-serif font-bold text-white text-sm mb-1">{themeItem.name}</h3>
                    <p className="text-[10px] text-gray-400 leading-normal">{themeItem.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Music & Sound selections */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-2xl font-serif text-pink-300 flex items-center gap-2">
                <Music size={22} className="text-pink-500" />
                <span>Aesthetic Music & Sounds</span>
              </h2>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Soundtrack Mood</label>
                  <input
                    type="text"
                    placeholder="e.g. Lofi Dreamy, Acoustic Instrumental"
                    value={musicMood}
                    onChange={(e) => setMusicMood(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-semibold tracking-wider block uppercase">Audio Track Link (MP3 URL)</label>
                  <input
                    type="text"
                    placeholder="/Saawal.mp3"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition font-mono"
                  />
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Leave as `/Saawal.mp3` for the default gorgeous romantic acoustic track, or paste a custom external .mp3 URL.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo memories uploader */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-pink-300">Memory Card Photos</h2>
                  <p className="text-xs text-gray-400 mt-1">Upload couple photos with captions</p>
                </div>
                <button
                  type="button"
                  onClick={addPhoto}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase py-2 px-4 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add Photo Link</span>
                </button>
              </div>
              <div className="w-12 h-1 bg-pink-500 rounded-full mb-6" />

              <div className="space-y-4">
                {photos.map((photo, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 flex-wrap">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <label className="text-[10px] text-gray-500 block uppercase font-bold mb-1">Image Source URL</label>
                        <input
                          type="text"
                          placeholder="e.g. /images/memory1.jpg"
                          value={photo.src}
                          onChange={(e) => updatePhoto(idx, "src", e.target.value)}
                          className="bg-white/5 border border-white/10 w-full focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition font-mono"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] text-gray-500 block uppercase font-bold">Poetic Caption</label>
                          <button
                            type="button"
                            onClick={() => {
                              setAiImageDesc("photo of us laughing together");
                              handleAiCaptionGenerate(idx);
                            }}
                            className="text-[9px] text-pink-300 hover:text-pink-400 font-semibold uppercase flex items-center gap-0.5"
                          >
                            <Wand2 size={10} />
                            <span>AI Caption</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Write a sweet comment..."
                          value={photo.caption}
                          onChange={(e) => updatePhoto(idx, "caption", e.target.value)}
                          className="bg-white/5 border border-white/10 w-full focus:border-pink-500 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none transition"
                        />
                      </div>
                    </div>
                    {photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="text-red-400 hover:text-red-500 p-2 mt-4"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Action Controls */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5 flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 text-white font-medium py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Previous Step</span>
          </button>

          {activeStep < 3 ? (
            <button
              type="button"
              onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest transition flex items-center gap-2 shadow-[0_0_30px_rgba(236,72,153,0.3)]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Story...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Generate cinematic website</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

      {/* AI COPILOT SIDE DRAWER PANEL */}
      {showAiPanel && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0d071a] border-l border-white/10 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2 text-pink-300 font-serif font-bold text-lg">
                <Wand2 size={20} className="text-pink-500" />
                <span>AI Creative Engine</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowAiPanel(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              
              {/* 1. Generate Love Story Box */}
              <div className="space-y-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1">
                  <span>1. Write Romantic Story letter</span>
                </h3>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Write down raw comments/thoughts (e.g. coffee spills, trips) and our AI will convert them into poetry-grade text.
                </p>
                <textarea
                  rows={3}
                  placeholder="e.g. Met on rainy day, shared yellow umbrella, love eating noodles together..."
                  value={aiNotes}
                  onChange={(e) => setAiNotes(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none focus:border-pink-500 mt-2"
                />
                <button
                  type="button"
                  onClick={handleAiStoryGenerate}
                  disabled={aiLoading}
                  className="w-full mt-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 text-[10px] font-bold py-2 px-4 rounded-lg uppercase tracking-wider text-white transition flex items-center justify-center gap-1"
                >
                  {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  <span>Draft Story Into Letter Box</span>
                </button>
              </div>

              {/* 2. Suggest Music Mood Box */}
              <div className="space-y-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1">
                  <span>2. Suggest Music Soundtrack</span>
                </h3>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Describe your relationship vibe (e.g. cute, lofi, energetic, retro) and get a matching playlist track.
                </p>
                <input
                  type="text"
                  placeholder="e.g. classic retro lofi cozy warm"
                  value={aiVibe}
                  onChange={(e) => setAiVibe(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none focus:border-pink-500 mt-2"
                />
                <button
                  type="button"
                  onClick={handleAiMusicSuggest}
                  disabled={aiLoading}
                  className="w-full mt-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 text-[10px] font-bold py-2 px-4 rounded-lg uppercase tracking-wider text-white transition flex items-center justify-center gap-1"
                >
                  {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Music size={12} />}
                  <span>Auto Suggest Soundtrack</span>
                </button>
              </div>

              {/* 3. Image Caption helper */}
              <div className="space-y-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1">
                  <span>3. Generate Polaroid Caption</span>
                </h3>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Enter what the photo contains (e.g. smiling on swing) to write a beautiful poetic caption.
                </p>
                <input
                  type="text"
                  placeholder="e.g. holding hands under cherry blossom tree"
                  value={aiImageDesc}
                  onChange={(e) => setAiImageDesc(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 outline-none focus:border-pink-500 mt-2"
                />
                <p className="text-[9px] text-gray-500">
                  Tip: Copy-paste generated text into the photo caption fields in Step 3.
                </p>
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-[10px] text-gray-500 leading-normal">
            Powered by Google Gemini API model. AI outputs are subject to your refinement.
          </div>
        </div>
      )}

    </div>
  );
}
