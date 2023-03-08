#!/bin/sh
set -o xtrace
set -e

link_libs=true

if [ "$link_libs" = true ]; then
    cd ../audius-libs
    npm link
    cd ../app
    npm link @audius/sdk
fi
 
npx ts-node-dev --respawn --ignore-watch "./emailCache" --transpile-only --inspect=0.0.0.0:9229 src/index.ts
