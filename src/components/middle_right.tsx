import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export function MiddleRight() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Resume Section */}
      <div className="flex-[0.9] bg-gray-100 overflow-y-auto flex justify-center items-center border-b border-gray-300">
        <div className="w-full h-full flex justify-center items-center">
          <Document
            file="/sample_resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading resume...</div>}
            className="w-full h-full flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              width={500} // auto-scale will make it responsive
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-[0.1] flex justify-between items-center px-5 bg-white border-t border-gray-300">
        <button
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 text-sm"
        >
          Prev
        </button>

        <span className="font-medium text-sm">
          Page {pageNumber} of {numPages || "-"}
        </span>

        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
