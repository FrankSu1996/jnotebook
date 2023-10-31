"use client";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader color="gray" aria-label="Loading Spinner" data-testid="loader" size={20} className="mt-3 bg-accent" />
    </div>
  );
};
