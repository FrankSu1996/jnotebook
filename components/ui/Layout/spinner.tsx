"use client";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <ClipLoader color="yellow" aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};
