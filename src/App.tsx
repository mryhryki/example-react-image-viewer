import { FC, useState } from "react";
import { Images } from "./images.ts";
import { ImageViewer } from "./ImageViewer.tsx";

export const App: FC = () => {
  const [image, setImage] = useState(Images[0]);

  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: "1200px",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        example-react-image-viewer
      </h1>
      <div style={{ textAlign: "center" }}>
        <select
          onChange={(event) => {
            const imageUrl = event.target.value;
            const image = Images.find((image) => image.url === imageUrl);
            if (image == null) return;
            setImage(image);
          }}
        >
          {Images.map((image) => (
            <option key={image.url} value={image.url}>
              {image.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image viewer */}
      <div
        style={{
          width: "100%",
          height: "80vh",
          backgroundColor: "#666",
          overscrollBehavior: "none",
        }}
      >
        <ImageViewer image={image} />
      </div>

      <ul>
        <li>Drag: Move the image in view area</li>
        <li>Scroll: Zoom in/out in view area</li>
        <li>Double click: Fit to view area (Reset position and zoom ratio)</li>
      </ul>
    </main>
  );
};

export default App;
