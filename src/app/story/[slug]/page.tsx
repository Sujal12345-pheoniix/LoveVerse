import { getStoryBySlug } from "@/app/actions";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Timeline from "@/components/sections/Timeline";
import LoveLetter from "@/components/sections/LoveLetter";
import WhyILoveYou from "@/components/sections/WhyILoveYou";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/CursorTrail";
import MusicPlayer from "@/components/MusicPlayer";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Metadata } from "next";

// Theme configuration mapper
const THEME_CONFIGS: Record<string, {
  name: string;
  bgClass: string;
  variables: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  fontFamilyClass?: string;
}> = {
  "dreamy-pink": {
    name: "Dreamy Pink",
    bgClass: "bg-[#fff5f5] bg-gradient-to-tr from-[#fff0f2] via-[#fff5f5] to-[#ffeef2]",
    variables: {
      background: "#fff5f5",
      foreground: "#2d0b37",
      primary: "#ff4d6d",
      secondary: "#ff85a1",
      accent: "#ffb3c1"
    }
  },
  "luxury-dark": {
    name: "Luxury Dark Romance",
    bgClass: "bg-[#0b030c] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#230a30] via-[#0b030c] to-[#040105] text-white",
    variables: {
      background: "#0b030c",
      foreground: "#f8f4f9",
      primary: "#d4af37",
      secondary: "#aa7c11",
      accent: "#fff5e6"
    }
  },
  "galaxy-love": {
    name: "Galaxy Love",
    bgClass: "bg-[#03001e] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1f104d] via-[#03001e] to-[#010008] text-white",
    variables: {
      background: "#03001e",
      foreground: "#ffffff",
      primary: "#ec008c",
      secondary: "#fc6767",
      accent: "#9b51e0"
    }
  },
  "korean-soft": {
    name: "Korean Soft Aesthetic",
    bgClass: "bg-[#faf6f0] bg-gradient-to-tr from-[#fbf6ef] via-[#faf6f0] to-[#f4ebe1]",
    variables: {
      background: "#faf6f0",
      foreground: "#3e3025",
      primary: "#cda177",
      secondary: "#dfc2a9",
      accent: "#ecdcc9"
    }
  },
  "vintage-polaroid": {
    name: "Vintage Polaroid",
    bgClass: "bg-[#f5ece1] bg-[radial-gradient(#eedcb5_1.2px,transparent_1.2px)] [background-size:24px_24px]",
    variables: {
      background: "#f5ece1",
      foreground: "#2a1b0c",
      primary: "#7a5330",
      secondary: "#ac815c",
      accent: "#deb887"
    },
    fontFamilyClass: "font-serif"
  },
  "bollywood-romance": {
    name: "Bollywood Romance",
    bgClass: "bg-[#fff0f2] bg-gradient-to-tr from-[#ffe6ea] via-[#fff0f2] to-[#fffde6]",
    variables: {
      background: "#fff0f2",
      foreground: "#4c0010",
      primary: "#ff003c",
      secondary: "#ffcc00",
      accent: "#ffd6e0"
    }
  },
  "anime-love": {
    name: "Anime Love",
    bgClass: "bg-gradient-to-b from-[#e8f0fe] via-[#f7f0fe] to-[#ffeef2]",
    variables: {
      background: "#e8f0fe",
      foreground: "#2c3e50",
      primary: "#ff758c",
      secondary: "#ffa4b6",
      accent: "#c3cfe2"
    }
  },
  "sunset-memories": {
    name: "Sunset Memories",
    bgClass: "bg-gradient-to-b from-[#ff7e5f] via-[#feb47b] to-[#6b4c35] text-white",
    variables: {
      background: "#ff7e5f",
      foreground: "#ffffff",
      primary: "#d35400",
      secondary: "#f39c12",
      accent: "#ffe5d9"
    }
  },
  "minimal-luxury": {
    name: "Minimal Luxury",
    bgClass: "bg-white border-x border-gray-100",
    variables: {
      background: "#ffffff",
      foreground: "#111111",
      primary: "#000000",
      secondary: "#666666",
      accent: "#e5e5e5"
    },
    fontFamilyClass: "font-mono"
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

// OpenGraph dynamic preview metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  
  if (!story) {
    return {
      title: "Love Story Not Found | LoveVerse",
      description: "Create your own customized love story page on LoveVerse."
    };
  }

  return {
    title: `${story.partnerA} & ${story.partnerB} | Our Story`,
    description: `A cinematic digital experience dedicated to the love story of ${story.partnerA} and ${story.partnerB}. ${story.relationshipTitle || ""}`,
    openGraph: {
      title: `${story.partnerA} & ${story.partnerB} | Our Story`,
      description: `A cinematic digital experience dedicated to the love story of ${story.partnerA} and ${story.partnerB}.`,
      images: [
        {
          url: story.photos?.[0]?.src || "/images/memory1.jpg",
          width: 800,
          height: 600,
          alt: "LoveVerse Cover"
        }
      ]
    }
  };
}

export default async function GeneratedStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return (
      <main className="min-h-screen bg-[#070114] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        
        <div className="text-center z-10 max-w-md p-8 glass rounded-3xl border border-white/10 shadow-2xl relative">
          <Heart size={48} className="mx-auto text-pink-500 mb-6 animate-pulse" />
          <h1 className="text-3xl font-serif mb-4">Story Not Found</h1>
          <p className="text-gray-400 text-sm mb-8">
            This love story doesn't exist yet, or has been kept private.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/"
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 text-sm tracking-wider uppercase font-bold"
            >
              Go to LoveVerse
            </Link>
            <Link 
              href="/register"
              className="glass hover:bg-white/10 text-white py-3 px-6 rounded-full transition duration-300 text-sm tracking-wider uppercase"
            >
              Create Your Own Story
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Pick theme config
  const theme = THEME_CONFIGS[story.theme] || THEME_CONFIGS["dreamy-pink"];

  // Custom CSS variable properties
  const customStyles = {
    "--background": theme.variables.background,
    "--foreground": theme.variables.foreground,
    "--primary": theme.variables.primary,
    "--secondary": theme.variables.secondary,
    "--accent": theme.variables.accent,
  } as React.CSSProperties;

  return (
    <main 
      style={customStyles}
      className={`relative min-h-screen ${theme.bgClass} ${theme.fontFamilyClass || ""} transition-all duration-500`}
    >
      <LoadingScreen />
      <SmoothScroll>
        <CursorTrail />
        <MusicPlayer musicUrl={story.musicUrl} musicMood={story.musicMood} />
        
        <Hero 
          partnerA={story.partnerA} 
          partnerB={story.partnerB} 
          relationshipTitle={story.relationshipTitle} 
          quotes={[
            `In every universe, I’d still choose you.`,
            `Every moment with ${story.partnerB} feels magical.`,
            `You are my favorite chapter, ${story.partnerB}.`,
            `To the one who has my heart, ${story.partnerB}.`
          ]}
        />
        
        <Gallery photos={story.photos} />
        <Timeline moments={story.moments} />
        <WhyILoveYou reasons={story.whyILoveYou} />
        
        <LoveLetter 
          recipient={story.partnerB} 
          letterText={story.loveLetter}
          writerName={story.partnerA}
        />
        
        <Footer 
          partnerA={story.partnerA} 
          partnerB={story.partnerB} 
          isCustomStory={true} 
        />
      </SmoothScroll>
    </main>
  );
}
