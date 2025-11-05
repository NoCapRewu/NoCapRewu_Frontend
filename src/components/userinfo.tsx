export function UserInfo() {
  const user = { name: "HIMANSH BANSAL", title: "The Intern Warrior" };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-start
        bg-gradient-to-r from-[#0b0b11] to-[#16161d] border-b border-[#1b1b1b]">
        {/* avatar */}
        <div className="h-[65%] aspect-square rounded-md border border-[#FF4D6D] bg-[#1a1a1a] ml-3" />
        {/* text */}
        <div className="flex flex-col justify-center ml-3 min-w-0">
          <div className="font-semibold text-[#FF4D6D] truncate">{user.name}</div>
          <div className="text-xs text-gray-400 uppercase truncate">{user.title}</div>
        </div>
      </div>
    </div>
  );
}
