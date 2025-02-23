import Experience from "@/components/Spaceship/Experience";
import LoadingScreen from "@/components/LoadingScreen";
import Explore from "@/components/ExploreEvent/ExploreComponent";
import { About } from "@/components/About_Section/About";
import { Theme } from "@/components/Our_Theme/Theme";
import { Sponsors } from "@/components/Our_Sponsors/Sponsors";
import { FAQ } from "@/components/Frequently_Asked_Questions/FAQ";
import { Technovate } from "@/components/Technovate_2024/Technovate";
import { Footer } from "@/components/Footer/Footer";
import { Inspiration } from "@/components/Our_Inspiration/Inspiration";

function Home() {
  return (
    <>
      {/* Controls Indicator */}
      {/* <div className="fixed bottom-4 left-4 z-10 rounded bg-black/50 p-4 text-white">
        <p className="text-sm">Controls:</p>
        <p className="text-xs text-gray-300">MouseClick - Turbo boost</p>
        <p className="text-xs text-gray-300">
          Mouse - Steer ship (disabled during turbo)
        </p>
      </div> */}
      <LoadingScreen />
      <div className="h-screen"><Experience/></div>
      <About/>
      <Theme/>
      <Explore />
      <Sponsors/>
      <Inspiration/>
      <FAQ/>
      <Technovate/>
      <Footer/>
    </>
  );
}

export default Home;
