import { Cell } from "@/app/Redux/Slices/cellSlice";

export interface POSTCellsRequestBody {
  fileName: string;
  userEmail: string;
  cells: Cell[];
}
