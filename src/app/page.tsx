import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CompanyStats from "@/components/sections/CompanyStats";
import Market from "@/components/sections/Market";
import Formats from "@/components/sections/Formats";
import MaterialsCta from "@/components/sections/MaterialsCta";
import PartnerSystem from "@/components/sections/PartnerSystem";
import LaunchTimeline from "@/components/sections/LaunchTimeline";
import Infrastructure from "@/components/sections/Infrastructure";
import FuelQuality from "@/components/sections/FuelQuality";
import AssetSection from "@/components/sections/AssetSection";
import LeadForm from "@/components/sections/LeadForm";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CompanyStats />
        <Market />
        <Formats />
        <MaterialsCta />
        <PartnerSystem />
        <LaunchTimeline />
        <Infrastructure />
        <FuelQuality />
        <AssetSection />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
