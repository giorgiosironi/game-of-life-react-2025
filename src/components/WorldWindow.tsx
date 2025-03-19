import React from 'react';

type Props = {
  generation: string;
}

const emptyGrid = () => Array(6).fill(null).map(() => Array(8).fill(false));

const WorldWindow: React.FC<Props> = ({ generation }) => {
  const only_horizontal_blinker = emptyGrid();
  only_horizontal_blinker[2][2] = true;
  only_horizontal_blinker[2][3] = true;
  only_horizontal_blinker[2][4] = true;

  const only_vertical_blinker = emptyGrid();
  only_vertical_blinker[1][3] = true;
  only_vertical_blinker[2][3] = true;
  only_vertical_blinker[3][3] = true;

  const grid = generation === '2' ? only_vertical_blinker : only_horizontal_blinker;

  return (
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
  );
};

export default WorldWindow; 
