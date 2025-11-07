import { create } from "zustand";
import { persist } from "zustand/middleware";

// -----------------------------
// 🧱 Interfaces
// -----------------------------
export interface HighlightBox {
  id: number;
  phrase: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Comment {
  id: number;
  phrase: string;
  text: string;
  emoji?: string;
  timestamp: number;
}

interface ResumeRoastState {
  highlights: HighlightBox[];
  comments: Comment[];
  activePhrase: string | null;
  activeComment: Comment | null;

  // Actions
  setHighlights: (h: HighlightBox[]) => void;
  addComment: (phrase: string, text: string, emoji?: string) => void;
  setActivePhrase: (phrase: string | null) => void;
  setActiveComment: (comment: Comment | null) => void;
  clearComments: () => void;
}

// -----------------------------
// 🧠 Zustand Store
// -----------------------------
export const useResumeRoastStore = create<ResumeRoastState>()(
  persist(
    (set, get) => ({
      highlights: [],
      comments: [],
      activePhrase: null,
      activeComment: null,

      // ✅ set highlight overlays (for right panel)
      setHighlights: (h) => set({ highlights: h }),

      // ✅ add new roast comment
      addComment: (phrase, text, emoji) => {
        const newComment: Comment = {
          id: Date.now(),
          phrase,
          text,
          emoji,
          timestamp: Date.now(),
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },

      // ✅ set currently active phrase (for highlight trigger)
      setActivePhrase: (phrase) => {
        console.log("🧠 Zustand setActivePhrase ->", phrase);
        set({ activePhrase: phrase });
      },

      // ✅ set currently active comment (for tooltip display)
      setActiveComment: (comment) => {
        console.log("💬 Zustand setActiveComment ->", comment?.text);
        set({ activeComment: comment });
      },

      // ✅ clear all comments
      clearComments: () => set({ comments: [] }),
    }),
    {
      name: "resume-roast-storage",
      // ✅ Persist only comments (no transient state)
      partialize: (state) => ({
        comments: state.comments,
      }),
      onRehydrateStorage: () => (state) => {
        console.log("💾 Zustand store rehydrated", state);
        // Reset volatile state to avoid stale values
        if (state) {
          state.activePhrase = null;
          state.activeComment = null;
          state.highlights = [];
        }
      },
    }
  )
);
