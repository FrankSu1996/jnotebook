import { Cell } from "@/app/Redux/Slices/cellSlice";

export interface POSTCellsRequestBody {
  fileId: string;
  cells: Cell[];
}
