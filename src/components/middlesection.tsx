import { UserInfo } from "./userinfo";
import { MiddleLeft } from "./middle_left";
import { MiddleRight } from "./middle_right";

export function MiddleSection() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-[#0B0B10] text-white">
      {/* Top area — banner. keep as percentage of the available middle column height */}
      <div className="h-[10%] min-h-[68px] border-b border-white/15 hover:border-white/25 transition-all duration-300">
        <UserInfo />
      </div>

      {/* content area uses remaining height */}
      <div className="flex-1 flex flex-row h-[90%]">
        {/* Use flex-basis via percent widths - they will be relative to the middle area */}
        <div className="basis-[45%] border-r border-white/15 hover:border-white/25 transition-all duration-300 h-full overflow-auto">
          <MiddleLeft />
        </div>
        <div className="basis-[55%] h-full overflow-auto border-l border-white/15 hover:border-white/25 transition-all duration-300">
          <MiddleRight />
        </div>
      </div>
    </div>
  );
}
