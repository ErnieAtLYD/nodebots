# NODEBOTS DAY PROJECT

Build a prototype membership system using a card reader, a raspberry with a LED.

The goal: if a user swipes their card, the LEDs should blink green if they have access, check in or out, blink red if they do not have access to the space.

`app.js` is the group of RESTful stub APIs that handle basic co-working membership. They are static json files, because we only had six hours to work on this.

`reader.js`, developed by Edwin, has the javascript for Raspberry Pi which leverages the API. There is also a third repo integrating this API with a [Facebook Messenger Bot](https://developers.facebook.com/blog/post/2016/04/12/bots-for-messenger/).

### Tech Setup

Node.js project running an Express server - here's [how to install node.js project](https://github.com/codeforamerica/howto/blob/master/Node.js.md).

Running on localhost

```
npm install
npm start
```


### REST APIs
Wrapper API for Edwin's Facebook Messanger chatbot project.

`[GET] /members/`
Returns a JSON object of all members 
?status: Optional, defaults to all members. Can also be 'in' or 'out', which displays checked-in and checked-out members respecitvely


`[GET] /members/:id` `/member/:id`
Returns a JSON object of member id 


`[GET] /member/:id/toggle`
*NOTE*: Supposed to be `PUT` but cheating for prototype
Toggles when someone is checked in our out. Technically returns an object { id, boolean }


`[GET] /member/:id/activate`
- *NOTE*: Supposed to be `POST` but cheating for prototype
- Forces `hasaccess` to `true`


`[GET] /member/:id/deactivate`
- *NOTE*: Supposed to be `POST` but cheating for prototype
- Forces `hasaccess` to `false`


### Team members

- Earle Acosta
- Ernie Hsiung
- Edwin Reynoso
- Kelvin Perez