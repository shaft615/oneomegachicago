import HeroSection from "@/components/home/HeroSection";
import MissionBlock from "@/components/home/MissionBlock";
import ChapterGrid from "@/components/home/ChapterGrid";
import ConclaveCountdown from "@/components/home/ConclaveCountdown";
import SponsorCTA from "@/components/home/SponsorCTA";
import NewsCards from "@/components/home/NewsCards";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionBlock />
      <ChapterGrid />
      <ConclaveCountdown />
      <SponsorCTA />
      <NewsCards />
    </>
  );
}
