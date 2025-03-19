import React from 'react';

const emptyGrid = () => Array(6).fill(null).map(() => Array(8).fill(false));

const WorldWindow: React.FC = () => {
  // Create a 6x8 grid
  const only_horizontal_blinker = emptyGrid();
  only_horizontal_blinker[2][2] = true;
  only_horizontal_blinker[2][3] = true;
  only_horizontal_blinker[2][4] = true;

  return (
    <table>
      {only_horizontal_blinker.map((row) => (
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
