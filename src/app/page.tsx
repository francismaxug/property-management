import FeaturedPropertyCard from "@/components/FeaturedPropertyCard";
import HeroSection from "@/components/Hero";
import InfoSection from "@/components/Info";
import RecentProducts from "@/components/RecentProducts";

export default function Home() {
  console.log(process.env.MONGO_URI);
  return (
    <>
      <HeroSection />
      <InfoSection />
      <FeaturedPropertyCard/>
      <RecentProducts/>
    </>
  );
}
