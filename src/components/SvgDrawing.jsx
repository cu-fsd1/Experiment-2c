import { useState } from "react";

export default function SvgDrawing() {
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null);

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStart({ x, y });
    setCurrentRect({ x, y, width: 0, height: 0 });
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = x - start.x;
    const height = y - start.y;

    setCurrentRect({
      x: start.x,
      y: start.y,
      width,
      height
    });
  };

  const handleMouseUp = () => {
    if (currentRect) {
      setRectangles([...rectangles, currentRect]);
    }
    console.log(rectangles)

    setDrawing(false);
    setCurrentRect(null);
  };

  return (
    <svg
      width="800"
      height="500"
      style={{
        border: "2px solid black",
        background: "#f9f9f9",
        cursor: "crosshair"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {rectangles.map((rect, index) => (
        <rect
          key={index}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill="rgba(0,0,255,0.3)"
          stroke="blue"
        />
      ))}

      {currentRect && (
        <rect
          x={currentRect.x}
          y={currentRect.y}
          width={currentRect.width}
          height={currentRect.height}
          fill="rgba(255,0,0,0.3)"
          stroke="red"
        />
      )}
    </svg>
  );
}