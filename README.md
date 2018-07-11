./node_modules/pouchdb-server/bin/pouchdb-server --host 0.0.0.0 -p 10101 -m -d ./db -n true

pouchdb-server \ 
    --host 0.0.0.0 \
    --port 10101 \ 
    --dir ./db  
     
ng serve 
    --host 0.0.0.0 \
    --port 4200 \
    --public-host http://bookeepr.local \
    --poll=400
