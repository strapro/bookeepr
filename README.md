sudo docker-compose run --rm cmd npm install

sudo docker-compose run --rm cmd ng lint

sudo docker-compose up serve

sudo docker-compose down

http://bookeepr.local:4200

http://bookeepr.local:5984/_utils/

TO ASK

- Do I need to declare root at src/app/app-routing.module.ts although I already declare this root at src/app/modules/homepage/homepage-routing.module.ts
- Can I reference a template outside the scope of the component to better load loading at src/app/modules/tag/components/list/list.component.html
- Why does tags$ not get refreshed if I revisit the page but is refreshed if I click again on the menu item 
- Good practice to create separate components for crud operation vs popups?
- Extending components including views?
- Services are created lazily. I need repositories to be created immediately. Currently I inject them in app.component.ts although I don't need them to ensure that. Any better ways?
