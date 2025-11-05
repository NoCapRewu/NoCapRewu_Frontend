import { LeftSidebar } from "../components/leftsidebar";
import { MiddleSection } from "../components/middlesection";

export function ResumeRoast() {
  return (
    // min-h-screen instead of h-screen to avoid overflow in some environments
    <div className="min-h-screen w-full bg-[#0B0B10] text-white">
      {/* responsive grid: left column min 220px or 20% of width, right column fills rest */}
      <div className="grid grid-cols-[minmax(220px,20%)_1fr] w-full min-h-screen">
        {/* Left column - full height, LeftSidebar will fill this column */}
        <div className="h-full border-r border-white/15 hover:border-white/30 transition-all duration-300">
          <LeftSidebar />
        </div>

        {/* Main column - full height */}
        <div className="h-full border-l border-white/10">
          <MiddleSection />
        </div>
      </div>
    </div>
  );
}
