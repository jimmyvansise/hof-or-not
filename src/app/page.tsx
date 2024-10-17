import TopBar from "../components/topbar";
import HomePage from "../pages/homepage";

export default function Home() {
  return (
    <div className={`bg-hof-dark-blue min-h-screen pb-20`}>
      <TopBar />
      <div className="px-8">
        <HomePage />
      </div>
    </div>
  );
}

// sm:py-20 will give you width specific padding, like if width is 640 or greater, use this padding