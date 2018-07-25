pouchdb-server \ 
    --host 0.0.0.0 \
    --port 10101 \ 
    --dir ./db  
     
ng serve 
    --host 0.0.0.0 \
    --port 4200 \
    --public-host http://bookeepr.local \
    --poll=400

./start.sh

http://bookeepr.local:4200
http://bookeepr.local:10101/_utils/

TO ASK

- Do I need to declare root at src/app/app-routing.module.ts although I already declare this root at src/app/modules/homepage/homepage-routing.module.ts
- Can I reference a template outside the scope of the component to better load loading at src/app/modules/tag/components/list/list.component.html
- Why does tags$ not get refreshed if I revisit the page but is refreshed if I click again on the menu item 
- Good practice to create separate components for crud operation vs popups?
- Extending components including views?
