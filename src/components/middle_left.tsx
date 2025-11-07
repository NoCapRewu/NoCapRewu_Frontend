import { useEffect, useRef, useState } from "react";
import { useResumeRoastStore } from "../store/resumeRoastStore";

export function MiddleLeft() {
  const {
    comments,
    addComment,
    setActivePhrase,
    setActiveComment,
  } = useResumeRoastStore();

  const [input, setInput] = useState("");
  const [maxVisible, setMaxVisible] = useState(4);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);

  // ✅ phrase = resume keyword, text = displayed roast
  const sampleRoasts = [
    { phrase: "Himansh Bansal", text: "Bro really namedropped himself 💀" },
    { phrase: "Programming", text: "Programming section looks like ChatGPT wrote it 😭" },
    { phrase: "Logic", text: "Logic so strong it broke my brain 🧠💥" },
    { phrase: "WorkStrat", text: "WorkStrat? More like WorkStart-up-that-never-launched 🚀" },
    { phrase: "Top 1", text: "Top 1% of excuses when projects fail 💅" },
  ];

  useEffect(() => {
    const feed = setInterval(() => {
      const roast = sampleRoasts[Math.floor(Math.random() * sampleRoasts.length)];
      addComment(roast.phrase, roast.text);
    }, 2500);

    return () => clearInterval(feed);
  }, [addComment]);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current!.scrollTo({
          top: containerRef.current!.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const phrase = comments[comments.length - 1]?.phrase || "Himansh Bansal";
    addComment(phrase, input);
    setInput("");
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-end overflow-hidden p-6">
      <div
        ref={containerRef}
        className="flex flex-col justify-end overflow-hidden flex-1 space-y-3 transition-all"
      >
        {comments.slice(-maxVisible).map((c, index) => (
          <div
            key={c.id}
            ref={index === 0 ? messageRef : null}
            onClick={() => {
              console.log(`Clicked phrase: ${c.phrase}, Text: ${c.text}`);
              setActivePhrase(c.phrase);
              setActiveComment(c);
            }}
            className={`w-fit max-w-[75%] px-4 py-2 rounded-xl border border-red-500 bg-black text-sm shadow-sm opacity-0 animate-fade-slide cursor-pointer hover:scale-[1.02] transition-all ${
              index % 2 === 0
                ? "self-start rounded-tl-none"
                : "self-end rounded-tr-none"
            }`}
          >
            {c.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex items-center gap-2 mt-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Roast this resume"
          className="flex-1 bg-[#161616] rounded-full px-5 py-2 text-white focus:outline-none focus:border-pink-500 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full font-semibold text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          Send
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center mt-1 italic select-none">
        “Keep it Gen Z — roast responsibly”
      </div>
    </div>
  );
}
