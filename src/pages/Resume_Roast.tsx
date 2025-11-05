import { LeftSidebar } from "../components/leftsidebar";
import { MiddleSection } from "../components/middlesection";

export function ResumeRoast() {
  return (
    // min-h-screen instead of h-screen to avoid overflow in some environments
    <div className="min-h-screen w-full">
      {/* responsive grid: left column min 220px or 20% of width, right column fills rest */}
      <div className="grid grid-cols-[minmax(220px,20%)_1fr] w-full min-h-screen">
        {/* Left column - full height, LeftSidebar will fill this column */}
        <div className="h-full border-r border-black">
          <LeftSidebar />
        </div>

        {/* Main column - full height */}
        <div className="h-full">
          <MiddleSection />
        </div>
      </div>
    </div>
  );
}
