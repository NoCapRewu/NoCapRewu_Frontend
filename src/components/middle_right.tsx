import { useState, useRef, useEffect, type JSX } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { detectTextPositionsForPage } from "../lib/pdfHighlighter/detectTextPositions";


const sampleResume = "/sample_resume.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface HighlightBox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}


export function MiddleRight(): JSX.Element {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [highlights, setHighlights] = useState<HighlightBox[]>([]);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);

  const onDocumentLoadSuccess = (pdf: any): void => setNumPages(pdf.numPages);

  // Text we want to detect and highlight (can later come from comments)
  const targetPhrases = [
    "Himansh Bansal",
    "Programming",
    "Typescript",
    "Logic",
    "WorkStrat",
    "Top 1"
  ];

 useEffect(() => {
  const pageEl = document.querySelector(`.react-pdf__Page[data-page-number="${pageNumber}"]`);
  if (!pageEl) return;

  // Observe text layer for rendering completion
  const observer = new MutationObserver(() => {
    const detected = detectTextPositionsForPage(pageNumber, targetPhrases);
    const mapped = detected
      .filter((d) => d.rect)
      .map((d) => ({
        id: Date.now() + Math.random(),
        x: d.rect!.left,
        y: d.rect!.top,
        width: d.rect!.width,
        height: d.rect!.height,
        text: d.phrase,
      }));
    setHighlights(mapped);
  });

  observer.observe(pageEl, { childList: true, subtree: true });

  return () => observer.disconnect();
}, [pageNumber]);


  /** Find text spans in PDF that match known targets */
  const detectTextPositions = () => {
    const spans = document.querySelectorAll(".react-pdf__Page__textContent span");
    const pageEl = document.querySelector(".react-pdf__Page") as HTMLElement | null;
    if (!pageEl) return;

    const pageRect = pageEl.getBoundingClientRect();
    const found: HighlightBox[] = [];

    spans.forEach((span) => {
      const spanEl = span as HTMLElement;
      const text = spanEl.textContent?.trim() || "";
      targetPhrases.forEach((target) => {
        if (text.includes(target)) {
          const rect = spanEl.getBoundingClientRect();
          found.push({
            id: Date.now() + Math.random(),
            x: rect.left - pageRect.left,
            y: rect.top - pageRect.top,
            width: rect.width,
            height: rect.height,
            text: target,
          });
        }
      });
    });

    setHighlights(found);
  };

  // Re-run text detection after PDF renders
  useEffect(() => {
    const timer = setTimeout(detectTextPositions, 1500);
    return () => clearTimeout(timer);
  }, [pageNumber]);

  // Smooth highlight animation
  const handleHighlightClick = (text: string): void => {
    const el = document.getElementById(`highlight-${text}`);
    if (el) {
      el.classList.add("active-highlight");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.classList.remove("active-highlight"), 2000);
    }
  };

  return (
    <div className="flex items-center flex-col h-full overflow-hidden relative">
      {/* Resume Section */}
      <div
        className="flex-1 bg-black overflow-y-auto flex justify-center items-center relative"
        ref={pdfContainerRef}
      >
        <div className="relative w-full h-full flex justify-center items-center">
          {/* PDF Viewer */}
          <Document
            file={sampleResume}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading resume...</div>}
            className="w-full h-full flex"
          >
            <Page
              pageNumber={pageNumber}
              width={500}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>

          {/* Overlay Layer for Highlights */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {highlights.map((hl) => (
              <div
                key={hl.id}
                id={`highlight-${hl.text}`}
                className="absolute bg-pink-400/25 transition-all duration-500 hover:bg-pink-500/30"
                style={{
                  top: `${hl.y}px`,
                  left: `${hl.x}px`,
                  width: `${hl.width}px`,
                  height: `${hl.height}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Highlight flash effect */}
      <style>{`
        .active-highlight {
          box-shadow: 0 0 12px 5px rgba(255, 20, 147, 0.8);
          transform: scale(1.05);

        }
      `}</style>
    </div>
  );
}
