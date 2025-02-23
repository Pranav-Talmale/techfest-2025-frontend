import Experience from "@/components/Spaceship/Experience";
import LoadingScreen from "@/components/LoadingScreen";

function Home() {
  return (
    <>
      {/* Controls Indicator */}
      {/* <div className="fixed bottom-4 left-4 z-10 rounded bg-black/50 p-4 text-white">
        <p className="text-sm">Controls:</p>
        <p className="text-xs text-gray-300">Space - Turbo boost</p>
        <p className="text-xs text-gray-300">
          Mouse - Steer ship (disabled during turbo)
        </p>
      </div> */}
      <LoadingScreen />
      <Experience />
    </>
  );
}

export default Home;
