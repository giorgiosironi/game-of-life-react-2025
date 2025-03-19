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
  const component = <WorldWindow currentGeneration={currentGeneration} />;
  
  // Check if this is an AJAX request
  if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    // Send only the rendered component
    res.send(ReactDOMServer.renderToString(component));
    return;
  }
  
  // Send full HTML page for regular requests
  const html = ReactDOMServer.renderToString(component);
  
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
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const updateContent = (url) => {
              fetch(url, {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                }
              })
                .then(response => response.text())
                .then(html => {
                  const root = document.getElementById('root');
                  if (root) {
                    root.innerHTML = html;
                  }
                });
            };

            // Store initial state
            const initialGeneration = new URLSearchParams(window.location.search).get('generation') || '1';
            window.history.replaceState({ generation: initialGeneration }, '', window.location.href);

            // Handle link clicks
            document.addEventListener('click', (e) => {
              if (e.target.matches('a[href^="/examples/blinker"]')) {
                e.preventDefault();
                const url = e.target.href;
                const nextGeneration = new URLSearchParams(new URL(url).search).get('generation') || '1';
                
                updateContent(url);
                window.history.pushState({ generation: nextGeneration }, '', url);
              }
            });

            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
              if (e.state && e.state.generation) {
                updateContent(window.location.href);
              }
            });
          });
        </script>
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
