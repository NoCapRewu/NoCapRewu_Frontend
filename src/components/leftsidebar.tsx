import React from "react";

const sample = {
  cookPercent: 67,
  gasCount: 42,
  capLevel: 58,
  mostRoasted: "Work Experience",
  heatmap: [
    { label: "Summary", value: 30 },
    { label: "Skills", value: 55 },
    { label: "Projects", value: 72 },
    { label: "Experience", value: 88 },
  ],
  topRoasts: [
    { text: "Bro listed 'teamwork' 4 times like it's a Pokémon ability.", boosts: 12 },
  ],
};

export function LeftSidebar({
  cookPercent = sample.cookPercent,
  gasCount = sample.gasCount,
  capLevel = sample.capLevel,
  mostRoasted = sample.mostRoasted,
  heatmap = sample.heatmap,
  topRoasts = sample.topRoasts,
}) {
  return (
    <aside
      className="
        w-full h-full bg-[#0D0D12] text-white p-4 flex flex-col gap-4 border-r border-[#1b1b1b] overflow-y-auto
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="aspect-square w-[1.8rem] sm:w-[2rem] rounded bg-[#111214] flex items-center justify-center text-[#FF4D6D] font-bold text-sm">
          NR
        </div>
        <div className="min-w-0">
          <div className="text-[clamp(0.8rem,1vw,1rem)] font-semibold truncate">
            NoCapRewu
          </div>
          <div className="text-[clamp(0.6rem,0.8vw,0.7rem)] text-gray-400 truncate">
            Roast Scoreboard
          </div>
        </div>
      </div>

      {/* COOK + GAS area */}
      <div className="flex flex-col sm:flex-row gap-3 w-full flex-wrap justify-between">
        {/* Cook Level */}
        <div className="bg-[#0E0F13] rounded p-2 sm:p-3 border border-[#1e1e1e] flex flex-col items-center flex-1 min-w-[6rem]">
          <div className="text-[clamp(0.55rem,0.8vw,0.7rem)] text-gray-400 mb-2">
            COOK LEVEL 🔥
          </div>
          <div className="relative w-[22%] sm:w-[1.6rem] flex-grow bg-[#141416] border border-[#2a2a2a] rounded-full overflow-hidden"
               style={{ height: "clamp(6rem,20vh,10rem)" }}>
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FF4D6D] to-[#FFD36A]"
              style={{ height: `${cookPercent}%` }}
            />
          </div>
          <div className="mt-2 text-[clamp(0.65rem,0.9vw,0.8rem)] font-medium">
            {cookPercent >= 80
              ? "CHARRED"
              : cookPercent >= 50
              ? "Well Done"
              : "Mild Burn"}
          </div>
          <div className="text-[clamp(0.55rem,0.75vw,0.7rem)] text-gray-400">
            {cookPercent}% cooked
          </div>
        </div>

        {/* Gas + Throw/Share */}
        <div className="flex flex-col gap-2 flex-1 justify-between min-w-[6rem]">
          <button
            onClick={() => {}}
            className="bg-[#111114] rounded border border-[#262626] hover:border-[#FF4D6D] transition flex flex-col items-center justify-center py-2 cursor-pointer group"
          >
            <div
              className="font-extrabold leading-none"
              style={{ fontSize: "clamp(1.2rem,2.5vw,1.75rem)" }}
            >
              {gasCount}
            </div>
            <div className="text-[clamp(0.45rem,0.75vw,0.6rem)] tracking-wide text-gray-400 group-hover:text-[#FF4D6D] transition">
              GAS IT UP
            </div>
          </button>

          {/* Throw + Share */}
          <div className="flex gap-2">
            {[
              { icon: "🗑️", label: "THROW" },
              { icon: "🔗", label: "SHARE" },
            ].map((b, i) => (
              <button
                key={i}
                className="flex-1 bg-[#141416] rounded border border-[#262626] hover:border-[#FF4D6D] transition flex flex-col items-center justify-center py-1 text-gray-300 cursor-pointer"
              >
                <div className="text-[clamp(1rem,1.8vw,1.3rem)] leading-none">{b.icon}</div>
                <div className="text-[clamp(0.45rem,0.75vw,0.6rem)] tracking-wide">{b.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cap Level */}
      <div className="bg-[#0E0F13] rounded p-3 border border-[#1e1e1e] flex flex-col gap-2">
        <div className="text-[clamp(0.6rem,0.85vw,0.75rem)] text-gray-400">
          CAP LEVEL 🧢
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full h-2 bg-[#0b0b0b] rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00F2FF] to-[#FF4D6D]"
              style={{ width: `${capLevel}%` }}
            />
          </div>
          <div className="text-[clamp(0.55rem,0.75vw,0.7rem)] text-gray-300 w-10 text-right">
            {capLevel}%
          </div>
        </div>
        <div className="text-[clamp(0.5rem,0.75vw,0.65rem)] text-gray-400 italic">
          Most roasted:{" "}
          <span className="text-[#FF4D6D]">{mostRoasted}</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="flex flex-col">
        <div className="text-[clamp(0.6rem,0.85vw,0.75rem)] text-gray-400 mb-2">
          ROAST HEATMAP
        </div>
        <div className="flex flex-col gap-2">
          {heatmap.map((h) => (
            <div key={h.label} className="flex items-center gap-2">
              <div className="text-[clamp(0.55rem,0.75vw,0.65rem)] w-20 text-gray-300 truncate">
                {h.label}
              </div>
              <div className="flex-1 bg-[#0F1114] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${h.value}%`,
                    background:
                      "linear-gradient(90deg,#FF6A6A,#FFCC66)",
                  }}
                />
              </div>
              <div className="w-8 text-right text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-300">
                {h.value}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Roasts */}
      <div>
        <div className="text-[clamp(0.6rem,0.85vw,0.75rem)] text-gray-400 mb-2">
          TOP ROASTS
        </div>
        <div className="flex flex-col gap-2">
          {topRoasts.map((r) => (
            <div
              key={r.text}
              className="bg-[#0E0F13] p-2 rounded border border-[#1e1e1e] flex items-start gap-2"
            >
              <div className="text-[clamp(0.6rem,0.9vw,0.8rem)] font-medium flex-1 truncate">
                {r.text}
              </div>
              <div className="text-[clamp(0.5rem,0.75vw,0.65rem)] text-gray-400 whitespace-nowrap">
                +{r.boosts} 💨
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
