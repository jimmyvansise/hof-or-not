import TopBar from "./components/topbar";
import PlayerPage from "./pages/player-page";

// this will be the launch page eventually, and pressing browse redirects to /[name]
export default function Home() {
  return (
    <div className={`bg-hof-dark-blue min-h-screen pb-20`}>
      <TopBar />
      <div className="px-8 max-w-4xl mx-auto">
        <PlayerPage />
      </div>
    </div>
  );
}

// sm:py-20 will give you width specific padding, like if width is 640 or greater, use this padding