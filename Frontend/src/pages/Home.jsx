import Hero from "../components/Hero";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
const Home = () => {

  return (
    <div className="h-screen items-center p-2">
      <Hero />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
