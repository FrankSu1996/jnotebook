import { useEffect, useRef } from "react";
import "../styles/Preview.css";

interface PreviewProps {
  code: string;
  error: string | undefined;
}

const html = `
    <html>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
      setTimeout(() => {
        iframeRef.current.contentWindow.postMessage(code, "*");
      }, 50);
    }
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe title="code preview" srcDoc={html} sandbox="allow-scripts allow-same-origin" ref={iframeRef} />
      {error ? <div className="absolute top-2 left-2 text-red-700">{error}</div> : null}
    </div>
  );
};
