import * as angularUniversal from 'angular-universal-express-firebase';
export let ssrapp = angularUniversal.trigger({
  index: __dirname + '/index.html',
  main: __dirname + '/dist-server/main.bundle',
  enableProdMode: true,
  cdnCacheExpiry: 1200,
  browserCacheExpiry: 600
});
