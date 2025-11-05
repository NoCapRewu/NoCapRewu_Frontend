export function UserInfo() {
  const user = { name: "HIMANSH BANSAL", title: "The Intern Warrior" };

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full flex items-center justify-between
        bg-gradient-to-r from-[#0b0b11] to-[#16161d] border-b border-[#1b1b1b]
        px-4 sm:px-6"
      >
        {/* LEFT: Avatar + user info */}
        <div className="flex items-center justify-start gap-3 min-w-0">
          {/* Avatar - fixed size */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border border-[#FF4D6D] bg-[#1a1a1a] shadow-[0_0_10px_#FF4D6D55]" />
          
          {/* Text */}
          <div className="flex flex-col justify-center min-w-0 text-left">
            <div className="font-semibold text-[#FF4D6D] truncate">
              {user.name}
            </div>
            <div className="text-xs text-gray-400 uppercase truncate">
              {user.title}
            </div>
          </div>
        </div>

        {/* RIGHT: Enhanced navigation buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            className="px-4 py-2 bg-[#141416] text-gray-200 text-sm font-semibold rounded-md
                       border border-[#FF4D6D50] shadow-[0_0_10px_rgba(255,77,109,0.2)]
                       hover:shadow-[0_0_20px_rgba(255,77,109,0.5)]
                       hover:text-[#FF4D6D] hover:border-[#FF4D6D]
                       transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg">⬅</span> Prev Roast
          </button>

          <button
            className="px-4 py-2 bg-[#FF4D6D] text-black text-sm font-bold rounded-md
                       shadow-[0_0_20px_rgba(255,77,109,0.7)]
                       hover:shadow-[0_0_30px_rgba(255,77,109,1)]
                       hover:scale-105 active:scale-95 transition-all duration-300
                       flex items-center gap-2"
          >
            Next Victim 🔥 <span className="text-lg">➡</span>
          </button>
        </div>
      </div>
    </div>
  );
}
