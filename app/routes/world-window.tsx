import { Link } from "react-router";
import type { Route } from "./+types/world-window";

const createRow = (y: number) => ({ 
  cells: Array(8).fill(null).map((_, x) => ({ state: false, x })), 
  y 
});

const emptyGrid = () => Array(6).fill(null).map((_, index) => createRow(index));

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const currentGeneration = url.searchParams.get("generation") ?? "1";

  const only_horizontal_blinker = emptyGrid();
  only_horizontal_blinker[2].cells[2].state = true;
  only_horizontal_blinker[2].cells[3].state = true;
  only_horizontal_blinker[2].cells[4].state = true;

  const only_vertical_blinker = emptyGrid();
  only_vertical_blinker[1].cells[3].state = true;
  only_vertical_blinker[2].cells[3].state = true;
  only_vertical_blinker[3].cells[3].state = true;

  const grid = currentGeneration === '2' ? only_vertical_blinker : only_horizontal_blinker;
  const otherGeneration = currentGeneration === '2' ? '1' : '2';
  
  return {
    currentGeneration,
    grid,
    otherGeneration,
  };
}

export default function WorldWindow({ loaderData }: Route.ComponentProps) {
  const currentGeneration = loaderData.currentGeneration;

  return (
    <div>
      <h1>Generation {currentGeneration}</h1>
      <table>
        {loaderData.grid.map((row) => (
          <tr key={row.y}>
            {row.cells.map((cell) => (
              <td 
                key={cell.x}
                className={cell.state ? 'cell--alive' : 'cell--dead'}
              />
            ))}
          </tr>
        ))}
      </table>
      <Link to={`/examples/blinker?generation=${loaderData.otherGeneration}`}>
        Switch to generation {loaderData.otherGeneration}
      </Link>
    </div>
  );
};
