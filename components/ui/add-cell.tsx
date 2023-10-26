"use client";
import { useDispatch } from "react-redux";
import { Button } from "./button";
import { insertCellAfter } from "@/app/Redux/Slices/cellSlice";
import { Separator } from "@/components/ui/separator";
import { FileText, FileCode } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const dispatch = useDispatch();

  const opacity = forceVisible ? "opacity-100" : "opacity-0";

  return (
    <div className={`relative ${opacity} hover:opacity-100 duration-300 ease-in delay-100 my-6`}>
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          onClick={() => dispatch(insertCellAfter({ id: previousCellId, cellType: "code", newCellId: uuidv4() }))}
          className="mx-10"
        >
          <span className="mr-1">
            <FileCode size={16} />
          </span>
          <span>Code</span>
        </Button>
        <Button
          variant={"outline"}
          onClick={() => dispatch(insertCellAfter({ id: previousCellId, cellType: "text", newCellId: uuidv4() }))}
          className="mx-10"
        >
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
