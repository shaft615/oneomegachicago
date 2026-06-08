import HeroSection from "@/components/home/HeroSection";
import MissionBlock from "@/components/home/MissionBlock";
import ChapterGrid from "@/components/home/ChapterGrid";
import ConclaveCountdown from "@/components/home/ConclaveCountdown";
import CommitteeCTA from "@/components/home/CommitteeCTA";
import SponsorCTA from "@/components/home/SponsorCTA";
import FeaturedEvent from "@/components/home/FeaturedEvent";
import NewsCards from "@/components/home/NewsCards";

// ISR: re-render hourly so the now date-aware featured-event helper
// (getFeaturedEvent excludes events whose end has passed) re-evaluates on its
// own — otherwise a finished featured event would linger until the next deploy.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CommitteeCTA />
      <MissionBlock />
      <ChapterGrid />
      <ConclaveCountdown />
      <SponsorCTA />
      <FeaturedEvent />
      <NewsCards />
    </>
  );
}
