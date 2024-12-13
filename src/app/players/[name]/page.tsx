import TopBar from "../../components/topbar";
import PlayerPage from "../../pages/player-page";

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