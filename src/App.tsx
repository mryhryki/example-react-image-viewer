import { FC, useState } from "react";
import { ImageViewer } from "./ImageViewer.tsx";

export const App: FC = () => {
  // TODO: Users can select image
  const [imageUrl /* , setImageUrl */] = useState<string>("../public/1299879_l.jpg");

  return (
    <main style={{ width: "100vw", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <h1 style={{ textAlign: "center" }}>example-react-image-viewer</h1>

      {/* Image viewer */}
      <div style={{ width: "100%", height: "80vh", backgroundColor: "#666" }}>
        <ImageViewer imageUrl={imageUrl}/>
      </div>

      <ul>
        <li>Drag: Move image in view area</li>
        <li>Scroll: Zoom in/out in view area</li>
      </ul>
    </main>
  );
};

export default App;
