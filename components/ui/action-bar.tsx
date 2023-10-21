import { useDispatch } from "react-redux";
import { Button } from "./button";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button size={"sm"} onClick={() => dispatch(moveCell({ id, direction: "up" }))}>
        Up
      </Button>
      <Button size={"sm"} onClick={() => dispatch(moveCell({ id, direction: "down" }))}>
        Down
      </Button>
      <Button size={"sm"} onClick={() => dispatch(deleteCell(id))}>
        Delete
      </Button>
    </div>
  );
};
