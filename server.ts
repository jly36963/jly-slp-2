// imports
import next from 'next';
import express from 'express';
import pino from 'express-pino-logger';
// env
require('dotenv').config();
// port
const port: string | number = process.env.PORT || 3000;
// environment
const dev: boolean = process.env.NODE_ENV !== 'production';

// create next.js app
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

// app startup function
const start = async (app: any) => {
  try {
    // next.js handler
    const handle = app.getRequestHandler();
    // prepare next.js app
    await app.prepare();
    // instantiate express server
    const server: express.Express = express();
    // middleware
    server.use(pino({ prettyPrint: true }));
    // import and use api routes (express server)
    const routers: Array<string> = ['/api', '/api/genius'];
    await (async (routers): Promise<void> => {
      for (const route of routers) {
        console.log(`Adding router to application: "${route}"`);
        const { default: router } = await import(`.${route}`);
        server.use(route, router);
      }
    })(routers);
    // ssr routes (next app)
    server.all('*', (req, res) => handle(req, res));
    // listen
    server.listen(port, (): void => {
      console.log(`Custom Next.js server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// start
start(app);
