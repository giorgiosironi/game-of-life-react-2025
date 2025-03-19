import express from 'express';
import ReactDOMServer from 'react-dom/server';
import HelloWorld from './HelloWorld';
import WorldWindow from './components/WorldWindow';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<HelloWorld />);
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});

app.get('/examples/blinker', (req, res) => {
  const currentGeneration = (req.query.generation ?? 1) as string;
  const html = ReactDOMServer.renderToString(
    <WorldWindow
      currentGeneration={currentGeneration}
    />
  );
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>World Window Example</title>
        <style>
          table {
            border-collapse: collapse;
          }
          
          td {
            background-color: white;
            width: 30px;
            height: 30px;
            border: 1px solid black;
          }
          
          .cell--alive {
            background-color: black;
          }
        </style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
