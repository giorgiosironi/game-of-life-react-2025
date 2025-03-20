import { Link } from "react-router";
import type { Route } from "./+types/world-window";

const emptyGrid = () => Array(6).fill(null).map(() => Array(8).fill(false));

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const currentGeneration = url.searchParams.get("generation") ?? "1";

  const only_horizontal_blinker = emptyGrid();
  only_horizontal_blinker[2][2] = true;
  only_horizontal_blinker[2][3] = true;
  only_horizontal_blinker[2][4] = true;

  const only_vertical_blinker = emptyGrid();
  only_vertical_blinker[1][3] = true;
  only_vertical_blinker[2][3] = true;
  only_vertical_blinker[3][3] = true;

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
        {loaderData.grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((isAlive, columnIndex) => (
              <td 
                key={columnIndex}
                className={isAlive ? 'cell--alive' : 'cell--dead'}
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
