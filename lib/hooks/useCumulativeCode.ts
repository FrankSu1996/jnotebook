import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";

// Memoized selector to get cumulative code up to a given cell.id
export const useCumulativeCode = (cellId) => {
  const order = useSelector((state: RootState) => state.cells.order);
  const data = useSelector((state: RootState) => state.cells.data);

  return useMemo(() => {
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      import _rct from "react";
      import _rctDOM from "react-dom";
      import 'bulmaswatch/default/bulmaswatch.min.css';
      var show = (value) => {
        const root = document.querySelector('#root');
  
        // Check if value is a React component
        if (typeof value === 'function' && !value.$$typeof) {
          value = _rct.createElement(value);  // Convert component to a React element
        }
  
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _rctDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        }
        else {
          root.innerHTML = value;
        }
      }
      `;
    const showFuncNoop = "var show = () => {}";

    const cumulativeCode: string[] = [];
    for (const cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }, [order, data, cellId]);
};
