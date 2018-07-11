#!/bin/sh

./node_modules/pouchdb-server/bin/pouchdb-server --host 0.0.0.0 --port 10101 --dir ./db --in-memory > /dev/null 2>&1 &

ng serve --host 0.0.0.0 --port 4200 --public-host http://bookeepr.local --poll=400
