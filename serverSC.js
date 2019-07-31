
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import initialState from './src/pages/initialState';
import Home from './src/pages/homePageComponent'

export function renderComponent(callback, data, viewBag) {
    try {
        // parse the server-provided data for easier consumption.
        const renderContext = parseServerData(data, viewBag);
        console.log("renderContext --> ", renderContext);
        const result = { html: null, status: 200, redirect: null };
        const content = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );

        const html = `
         <div id ="root">
            <script src="clientSC_bundle.js"> </script>
            ${content}
        </div>
            `;

        result.html = html;

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
