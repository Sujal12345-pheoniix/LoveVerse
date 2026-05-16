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

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <LoadingScreen />
      <SmoothScroll>
        <CursorTrail />
        <MusicPlayer />
        <Hero />
        <Gallery />
        <Timeline />
        <WhyILoveYou />
        <LoveLetter />
        <Footer />
      </SmoothScroll>
    </main>
  );
}
