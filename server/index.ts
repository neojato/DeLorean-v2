import * as angularUniversal from 'angular-universal-express-firebase';

const app = angularUniversal.trigger({
  index: __dirname + '/dist-server/index.html',
  main: __dirname + '/dist-server/main.bundle',
  enableProdMode: true,
  cdnCacheExpiry: 1200,
  browserCacheExpiry: 600
});

export let ssrapp = app;
