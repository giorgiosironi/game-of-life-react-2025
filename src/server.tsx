import express from 'express';
import ReactDOMServer from 'react-dom/server';
import HelloWorld from './HelloWorld';

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
