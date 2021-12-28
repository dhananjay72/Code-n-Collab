import React, { useState, useRef, useEffect } from "react";
import { CirclePicker } from "react-color";
import { Button } from "react-bootstrap";

export default function Whiteboard(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const { drawing, setDrawing } = props;
  const isDrawing = useRef(false);

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    // "#673ab7",
    // "#3f51b5",
    // "#2196f3",
    // "#03a9f4",
    // "#00bcd4",
    // "#009688",
    // "#4caf50",
    // "#8bc34a",
    // "#cddc39",
    // "#ffeb3b",
    // "#ffc107",
    // "#ff9800",
    // "#ff5722",
    "#607d8b",
    "#ffffff",
  ];

  const [color, setColor] = useState(colors[colors.length - 2]);

  // paint functions :

  function startNewLine(x, y, color, context) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
  }

  // Draws a line to a coordinate
  function draw(x, y, context) {
    context.lineTo(x, y);
    context.stroke();
  }

  // Clears the canvas and creates a new path for the next line
  function clearCanvas(width, height, context) {
    context.clearRect(0, 0, width, height);
    context.beginPath();
  }

  useEffect(() => {
    setCanvasProperties();
    setContextProperties();
  }, []);

  useEffect(() => {
    if (drawing.length === 0) {
      const { width, height } = canvasRef.current;
      clearCanvas(width, height, contextRef.current);
      return;
    }
    if (isDrawing.current) return;

    const lastCoordinates = drawing[drawing.length - 1];
    const { offsetX, offsetY, color } = lastCoordinates;

    const context = contextRef.current;
    if (color) startNewLine(offsetX, offsetY, color, context);
    else draw(offsetX, offsetY, context);
  }, [drawing]);

  function handleDrawingChange(newDrawing) {
    setDrawing(newDrawing);
  }

  function handleColorChange(newColor) {
    setColor(newColor.hex);
  }

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    startNewLine(offsetX, offsetY, color, contextRef.current);
    isDrawing.current = true;
    const coordinate = { offsetX, offsetY, color };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseMove(e) {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY, contextRef.current);
    const coordinate = { offsetX, offsetY };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseUp() {
    isDrawing.current = false;
  }

  function handleClearWhiteboardClick() {
    const { width, height } = canvasRef.current;
    clearCanvas(width, height, contextRef.current);
    handleDrawingChange([]);
  }

  function setCanvasProperties() {
    const canvas = canvasRef.current;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth / pixelRatio}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  function setContextProperties() {
    const context = canvasRef.current.getContext("2d");
    const pixelRatio = window.devicePixelRatio || 1;
    context.scale(pixelRatio, pixelRatio);
    context.lineCap = "round";
    context.strokeStyle = colors[colors.length - 2];
    context.lineWidth = 5;
    contextRef.current = context;
  }

  return (
    <div className="whiteboard-container">
      <div className="whiteboard-top">
        <CirclePicker
          color={color}
          colors={colors}
          onChangeComplete={handleColorChange}
        />
        <Button onClick={handleClearWhiteboardClick}>Clear </Button>
      </div>

      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  );
}
