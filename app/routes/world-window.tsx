import type { Route } from "./+types/world-window";

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const currentGeneration = url.searchParams.get("generation") ?? "1";
  
  return {
    currentGeneration,
  };
}

const emptyGrid = () => Array(6).fill(null).map(() => Array(8).fill(false));

export default function WorldWindow({ loaderData }: Route.ComponentProps) {
  const currentGeneration = loaderData.currentGeneration;
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

  return (
    <div>
      <h1>Generation {currentGeneration}</h1>
      <table>
        {grid.map((row) => (
          <tr>
            {row.map((isAlive) => (
              <td 
                className={isAlive ? 'cell--alive' : 'cell--dead'}
              />
            ))}
          </tr>
        ))}
      </table>
      <a href={`/examples/blinker?generation=${otherGeneration}`}>
        Switch to generation {otherGeneration}
      </a>
    </div>
  );
};
