import { FC, useState } from "react";
import { Images } from "./images.ts";
import { ImageViewer } from "./ImageViewer.tsx";

export const App: FC = () => {
  const [image, setImage] = useState(Images[0]);

  return (
    <main style={{ width: "100vw", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <h1
        style={{ margin: 0, fontSize: "1.5rem", lineHeight: "2", textAlign: "center" }}>example-react-image-viewer</h1>
      <div>
        <select onChange={(event) => {
          const imageUrl = event.target.value;
          const image = Images.find((image) => image.url === imageUrl);
          if (image == null) return;
          setImage(image);

        }}>
          {Images.map((image) => (
            <option key={image.url} value={image.url}>
              {image.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image viewer */}
      <div style={{ width: "100%", height: "80vh", backgroundColor: "#666" }}>
        <ImageViewer image={image}/>
      </div>

      <ul>
        <li>Drag: Move image in view area</li>
        <li>Scroll: Zoom in/out in view area</li>
        <li>Double click: Fit to view area (Reset position and zoom ratio)</li>
      </ul>
    </main>
  );
};

export default App;
