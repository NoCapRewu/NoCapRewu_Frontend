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
    <div className="flex flex-col h-full w-full bg-white shadow-lg overflow-hidden">
      {/* Resume Section */}
      <div className="flex-1 bg-black overflow-y-auto flex justify-center items-center">
        <div className="w-full h-full flex justify-center items-center">
          <Document
            file="/sample_resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading resume...</div>}
            className="w-full h-full flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              width={500} // keep fixed for ATS-like look
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
