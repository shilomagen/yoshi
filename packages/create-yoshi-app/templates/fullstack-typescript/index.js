const bootstrap = require('wix-bootstrap-ng');

const app = bootstrap()
  // https://github.com/wix-platform/wix-node-platform/tree/master/greynode/wix-bootstrap-greynode
  .use(require('wix-bootstrap-greynode'))
  // https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap-plugins/hadron/wix-bootstrap-hadron
  .use(require('wix-bootstrap-hadron'))
  // https://github.com/wix-private/fed-infra/tree/master/wix-bootstrap-renderer
  .use(require('wix-bootstrap-renderer'));

// Our code needs to be transpiled with Babel or TypeScript. In production or locally we
// use the already transpiled code from the /dist directory.
//
// In tests we use require hooks to transpile our code on the fly. For more information on
// require hooks, see https://github.com/TypeStrong/ts-node#how-it-works)
if (process.env.NODE_ENV === 'test') {
  app.express('./src/server');
} else {
  app.express('./dist/src/server');
}

app.start({
  disableCluster: process.env.NODE_ENV !== 'production',
});
