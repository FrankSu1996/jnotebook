import { useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  if (iframeRef.current) {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }

  return (
    <iframe
      title="code preview"
      srcDoc={html}
      sandbox="allow-scripts"
      ref={iframeRef}
    ></iframe>
  );
};
