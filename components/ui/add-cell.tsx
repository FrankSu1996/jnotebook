"use client";
import { useDispatch } from "react-redux";
import { Button } from "./button";
import { insertCellBefore } from "@/app/Redux/Slices/cellSlice";
import { Separator } from "@/components/ui/separator";
import { FileText, FileCode } from "lucide-react";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const dispatch = useDispatch();

  const opacity = forceVisible ? "opacity-100" : "opacity-0";

  return (
    <div className={`relative ${opacity} hover:opacity-100 transition-opacity duration-300`}>
      <div className="flex justify-center">
        <Button variant={"outline"} onClick={() => dispatch(insertCellBefore({ id: nextCellId, cellType: "code" }))} className="mx-10 my-3">
          <span className="mr-1">
            <FileCode size={16} />
          </span>
          <span>Code</span>
        </Button>
        <Button variant={"outline"} onClick={() => dispatch(insertCellBefore({ id: nextCellId, cellType: "text" }))} className="mx-10 my-3">
          <span className="mr-1">
            <FileText size={16} />
          </span>
          <span>Text</span>
        </Button>
      </div>
      <Separator style={{ position: "absolute", top: "50%", bottom: "50%", zIndex: "-1" }} />
    </div>
  );
};
