sh tools/build.sh
sw-precache --root=dist --config=precache-config.js
firebase use default
firebase deploy
