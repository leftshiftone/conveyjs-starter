const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const nextApp = next({dev: false});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.enable('trust proxy');

    app.get('/env.json', (req, res) => {
        res.send({
            gaia_env: process.env.GAIA_ENV || null,
            gaia_url: process.env.GAIA_URL || null,
            gaia_identity_id: process.env.GAIA_IDENTITY_ID || null,
            gaia_username: process.env.GAIA_USERNAME || null,
            gaia_password: process.env.GAIA_PASSWORD || null,
            gaia_wait_timeout: process.env.GAIA_WAIT_TIMEOUT || null
        })
    });
    app.get('*', (req, res) => handle(req, res)); // for all the react stuff

    app.listen(port, '0.0.0.0', err => {
        if (err) throw err;
        console.info(`Ready at http://localhost:${port}`)
    })
});
