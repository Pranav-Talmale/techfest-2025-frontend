import Experience from "./components/Spaceship/Experience";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <main className="fixed inset-0">
      <LoadingScreen />
      <Experience />
    </main>
  );
}

export default App;
