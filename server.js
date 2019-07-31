import 'babel-polyfill';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import bodyParser from 'body-parser';
import App from './src/App';
import initialState from './src/pages/initialState';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));


app.get('*', (req, res) => {

    const context = {}

    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const html = `
        <html>
            <head>
            </head>
            <body>
                <div id ="root">
                    ${content}
                </div>
                <script src="client_bundle.js"> </script>
            </body>
        </html>
        `;

    res.send(html);
})

app.listen(PORT, () => {
    console.log(`App runing ${PORT}`);
});


export function renderComponent(callback, data, viewBag) {
    try {
      // parse the server-provided data for easier consumption.
      const renderContext = parseServerData(data, viewBag);
  
      const result = { html: null, status: 200, redirect: null };
  
      result.html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
  
      callback(null, result);
    } catch (err) {
      // need to ensure the callback is always invoked no matter what
      // or else SSR will hang
      callback(err, null);
    }
  }

  function parseServerData(data, viewBag) {
    /*
      Data from server is double-encoded since MS JSS does not allow control
      over JSON serialization format.
    */
    const parsedData = data instanceof Object ? data : JSON.parse(data);
    const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);
  
    const state = initialState();
    state.viewBag = parsedViewBag;
  
    if (parsedData) {
      state.sitecore = parsedData.sitecore;
    }
  
    return state;
  }
  