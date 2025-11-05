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
        w-full h-full bg-gradient-to-b from-[#0B0B10] to-[#111117]
        text-white p-4 flex flex-col gap-5 
        border-r border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]
        backdrop-blur-[2px] overflow-y-auto
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/30">
        <div
          className="aspect-square w-[2rem] rounded-md 
            bg-gradient-to-br from-[#FF4D6D] to-[#FF9966]
            flex items-center justify-center text-black font-extrabold text-sm
            shadow-[0_0_15px_#FF4D6D99] border border-white/40"
        >
          NR
        </div>
        <div className="min-w-0">
          <div className="text-[clamp(0.85rem,1vw,1rem)] font-semibold truncate">
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
        <div
          className="bg-[#0E0F13] rounded-xl p-3 border border-white/40
            shadow-[0_0_10px_rgba(255,255,255,0.05)]
            flex flex-col items-center flex-1 min-w-[6rem]
            hover:shadow-[0_0_20px_rgba(255,77,109,0.3)] transition-all duration-300"
        >
          <div className="text-xs text-gray-400 mb-2">COOK LEVEL 🔥</div>

          <div
            className="relative w-[22%] sm:w-[1.6rem] flex-grow bg-[#141416]
              border border-white/25 rounded-full overflow-hidden
              shadow-[inset_0_0_10px_#FF4D6D22]"
            style={{ height: "clamp(6rem,20vh,10rem)" }}
          >
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FF4D6D] to-[#FFD36A] transition-all duration-500"
              style={{ height: `${cookPercent}%` }}
            />
          </div>

          <div className="mt-2 text-sm font-medium">
            {cookPercent >= 80
              ? "CHARRED"
              : cookPercent >= 50
              ? "Well Done"
              : "Mild Burn"}
          </div>
          <div className="text-xs text-gray-400">{cookPercent}% cooked</div>
        </div>

        {/* Gas + Throw/Share */}
        <div className="flex flex-col gap-2 flex-1 justify-between min-w-[6rem]">
          <button
            className="bg-[#111114] rounded-xl border border-white/30
              hover:border-[#FF4D6D] hover:shadow-[0_0_20px_#FF4D6D66]
              transition flex flex-col items-center justify-center py-2 cursor-pointer group"
          >
            <div
              className="text-[1.75rem] font-extrabold group-hover:scale-110 transition-transform animate-pulse-slow"
            >
              {gasCount}
            </div>
            <div className="text-[0.6rem] tracking-wide text-gray-400 group-hover:text-[#FF4D6D] transition">
              GAS IT UP
            </div>
          </button>

          <div className="flex gap-2">
            {[
              { icon: "🗑️", label: "THROW" },
              { icon: "🔗", label: "SHARE" },
            ].map((b, i) => (
              <button
                key={i}
                className="flex-1 bg-[#141416] rounded border border-white/25
                  hover:border-[#FF4D6D] hover:shadow-[0_0_12px_#FF4D6D55]
                  flex flex-col items-center justify-center py-1 text-gray-300 transition"
              >
                <div className="text-lg leading-none">{b.icon}</div>
                <div className="text-[0.6rem] tracking-wide">{b.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CAP LEVEL */}
      <div
        className="bg-[#0E0F13] rounded-xl p-3 border border-white/40
          shadow-[0_0_12px_rgba(255,255,255,0.08)]
          hover:shadow-[0_0_18px_#FF4D6D33] transition"
      >
        <div className="text-xs text-gray-400">CAP LEVEL 🧢</div>
        <div className="flex items-center gap-3 mt-1">
          <div className="w-full h-2 bg-[#0b0b0b] rounded overflow-hidden border border-white/15">
            <div
              className="h-full bg-gradient-to-r from-[#00F2FF] to-[#FF4D6D] transition-all"
              style={{ width: `${capLevel}%` }}
            />
          </div>
          <div className="text-xs text-gray-300 w-10 text-right">{capLevel}%</div>
        </div>
        <div className="text-xs text-gray-400 italic mt-1">
          Most roasted: <span className="text-[#FF4D6D]">{mostRoasted}</span>
        </div>
      </div>

      {/* HEATMAP */}
      <div>
        <div className="text-sm text-gray-400 mb-2 tracking-wide drop-shadow-[0_0_5px_#FF4D6D33] border-b border-white/25 pb-1">
          ROAST HEATMAP
        </div>
        <div className="flex flex-col gap-2">
          {heatmap.map((h) => (
            <div key={h.label} className="flex items-center gap-2 group">
              <div className="text-xs w-20 text-gray-300 truncate">{h.label}</div>
              <div className="flex-1 bg-[#141416] h-2 rounded-full overflow-hidden border border-white/15">
                <div
                  className="h-full group-hover:shadow-[0_0_8px_#FF4D6D66] transition-all"
                  style={{
                    width: `${h.value}%`,
                    background: "linear-gradient(90deg,#FF6A6A,#FFCC66)",
                  }}
                />
              </div>
              <div className="w-8 text-right text-xs text-gray-300">{h.value}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP ROASTS */}
      <div>
        <div className="text-sm text-gray-400 mb-2 tracking-wide drop-shadow-[0_0_5px_#FF4D6D33] border-b border-white/25 pb-1">
          TOP ROASTS
        </div>
        <div className="flex flex-col gap-2">
          {topRoasts.map((r) => (
            <div
              key={r.text}
              className="bg-[#0E0F13] p-3 rounded-lg border border-white/40
                hover:border-[#FF4D6D] hover:shadow-[0_0_18px_#FF4D6D44]
                transition flex items-start gap-2"
            >
              <div className="text-sm font-medium flex-1 truncate">{r.text}</div>
              <div className="text-xs text-gray-400 whitespace-nowrap">+{r.boosts} 💨</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
