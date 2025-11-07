// // src/lib/pdfHighlighter/detectTextPositions.tsx

// export interface RectPosition {
//   left: number;
//   top: number;
//   width: number;
//   height: number;
// }

// export interface DetectedRect {
//   phrase: string;
//   rect: RectPosition | null;
// }

// /**
//  * Detects approximate bounding rectangles for given target phrases
//  * in a PDF page rendered by react-pdf.
//  *
//  * It works by scanning <span> elements inside the .react-pdf__Page__textContent layer,
//  * matching target phrases, and merging their DOMRects into a single bounding box.
//  */
// export function detectTextPositionsForPage(
//   pageNumber: number,
//   targetPhrases: string[]
// ): DetectedRect[] {
//   const pageSelector = `.react-pdf__Page[data-page-number="${pageNumber}"]`;
//   const pageEl = document.querySelector(pageSelector) as HTMLElement | null;
//   if (!pageEl) return [];

//   const textLayer = pageEl.querySelector(
//     ".react-pdf__Page__textContent"
//   ) as HTMLElement | null;
//   if (!textLayer) return [];

//   const spans = Array.from(textLayer.querySelectorAll("span")) as HTMLElement[];
//   if (!spans.length) return [];

//   // Flatten all text from the spans into one normalized string
//   const allText = spans
//     .map((s) => (s.textContent || "").replace(/\s+/g, " "))
//     .join(" ");

//   const results: DetectedRect[] = [];
// console.log("🧩 All extracted text:", allText.slice(0, 500));

//   targetPhrases.forEach((phrase) => {
//     const normalizedPhrase = phrase.replace(/[’']/g, "'").trim();
//     const normalizedText = allText.replace(/[’']/g, "'");

//     const index = normalizedText.indexOf(normalizedPhrase);
//     if (index === -1) {
//       results.push({ phrase, rect: null });
//       return;
//     }

//     // Track which spans correspond to this phrase
//     let charCount = 0;
//     const involvedSpans: HTMLElement[] = [];

//     for (const span of spans) {
//       const spanText = (span.textContent || "").replace(/\s+/g, " ");
//       const spanStart = charCount;
//       const spanEnd = charCount + spanText.length;

//       // Check if phrase overlaps this span’s range
//       if (
//         index < spanEnd &&
//         index + normalizedPhrase.length > spanStart
//       ) {
//         involvedSpans.push(span);
//       }

//       charCount = spanEnd + 1; // account for space between spans
//     }

//     if (!involvedSpans.length) {
//       results.push({ phrase, rect: null });
//       return;
//     }

//     // Merge bounding boxes from all involved spans
//     const rects: DOMRect[] = [];
//     involvedSpans.forEach((span) =>
//       rects.push(...Array.from(span.getClientRects()))
//     );

//     const merged = mergeRects(rects);
//     if (merged) {
//       const pageRect = pageEl.getBoundingClientRect();
//       results.push({
//         phrase,
//         rect: {
//           left: merged.left - pageRect.left,
//           top: merged.top - pageRect.top,
//           width: merged.width,
//           height: merged.height,
//         },
//       });
//     } else {
//       results.push({ phrase, rect: null });
//     }
//   });

//   return results;
// }

// /**
//  * Merge multiple DOMRects into a single bounding rectangle.
//  * Used when a phrase spans multiple spans or lines.
//  */
// function mergeRects(rects: DOMRect[]): DOMRect | null {
//   if (!rects.length) return null;

//   let left = Infinity;
//   let top = Infinity;
//   let right = -Infinity;
//   let bottom = -Infinity;

//   rects.forEach((r) => {
//     left = Math.min(left, r.left);
//     top = Math.min(top, r.top);
//     right = Math.max(right, r.right);
//     bottom = Math.max(bottom, r.bottom);
//   });

//   const width = right - left;
//   const height = bottom - top;

//   return {
//     left,
//     top,
//     right,
//     bottom,
//     width,
//     height,
//   } as DOMRect;
// }


export interface DetectedRect {
  phrase: string;
  rect: { left: number; top: number; width: number; height: number } | null;
}

/**
 * Detect text coordinates for specific phrases in react-pdf text layer.
 * Works even if words are split across multiple spans or have special chars.
 */
export function detectTextPositionsForPage(
  pageNumber: number,
  targetPhrases: string[]
): DetectedRect[] {
  const pageSelector = `.react-pdf__Page[data-page-number="${pageNumber}"]`;
  const pageEl = document.querySelector(pageSelector) as HTMLElement | null;
  if (!pageEl) return [];

  const textLayer = pageEl.querySelector(
    ".react-pdf__Page__textContent"
  ) as HTMLElement | null;
  if (!textLayer) return [];

  const spans = Array.from(textLayer.querySelectorAll("span")) as HTMLElement[];
  if (!spans.length) return [];

  // Normalize text
  const allText = spans.map((s) => (s.textContent || "").replace(/\s+/g, " ")).join(" ");
  const results: DetectedRect[] = [];

  targetPhrases.forEach((phrase) => {
    const normalizedPhrase = phrase.replace(/[’']/g, "'").trim();
    const normalizedText = allText.replace(/[’']/g, "'");

    const index = normalizedText.indexOf(normalizedPhrase);
    if (index === -1) {
      results.push({ phrase, rect: null });
      return;
    }

    // find which spans overlap that index
    let charCount = 0;
    const involvedSpans: HTMLElement[] = [];

    for (const span of spans) {
      const spanText = (span.textContent || "").replace(/\s+/g, " ");
      const spanStart = charCount;
      const spanEnd = charCount + spanText.length;
      if (
        index < spanEnd &&
        index + normalizedPhrase.length > spanStart
      ) {
        involvedSpans.push(span);
      }
      charCount = spanEnd + 1; // account for space join
    }

    if (!involvedSpans.length) {
      results.push({ phrase, rect: null });
      return;
    }

    // Merge all their rects
    const rects: DOMRect[] = [];
    involvedSpans.forEach((span) => rects.push(...Array.from(span.getClientRects())));

    const merged = mergeRects(rects);
    if (merged) {
      const pageRect = pageEl.getBoundingClientRect();
      results.push({
        phrase,
        rect: {
          left: merged.left - pageRect.left,
          top: merged.top - pageRect.top,
          width: merged.width,
          height: merged.height,
        },
      });
    } else {
      results.push({ phrase, rect: null });
    }
  });

  return results;
}

/** Merge multiple DOMRects into a single bounding box */
function mergeRects(rects: DOMRect[]): DOMRect | null {
  if (!rects.length) return null;
  let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
  rects.forEach((r) => {
    left = Math.min(left, r.left);
    top = Math.min(top, r.top);
    right = Math.max(right, r.right);
    bottom = Math.max(bottom, r.bottom);
  });
  const width = right - left;
  const height = bottom - top;
  return { left, top, right, bottom, width, height } as DOMRect;
}
