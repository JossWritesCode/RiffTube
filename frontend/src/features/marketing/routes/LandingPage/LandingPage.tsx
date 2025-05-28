import Layout from '../../Layout';
import HeroSection from './components/HeroSection/HeroSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import FAQSection from './components/FAQSection/FAQSection';

function LandingPage() {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <FAQSection />
    </Layout>
  );
}

export default LandingPage;
