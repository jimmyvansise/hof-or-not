import TopBar from "./components/topbar";
import HomePage from "./pages/home-page";

export default function Home() {
  return (
    <div className={`bg-hof-dark-blue min-h-screen pb-20 cursor-default`}>
      <TopBar showText={false} />
      <div className="px-8 max-w-4xl mx-auto">
        <HomePage />
      </div>
    </div>
  );
}