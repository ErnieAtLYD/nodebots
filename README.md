# NODEBOTS DAY PROJECT

More information coming soon.

Node.js project running an Express server - here's [how to install node.js project](https://github.com/codeforamerica/howto/blob/master/Node.js.md).

Running on localhost
http://localhost:3000


### REST APIs
Wrapper API for Edwin's Facebook Messanger chatbot project.

`[GET] /members/`
Returns a JSON object of all members 
?status: Optional, defaults to all members. Can also be 'in' or 'out', which displays checked-in and checked-out members respecitvely


`[GET] /member/:id/toggle`
*NOTE*: Supposed to be `PUT` but cheating for prototype
Toggles when someone is checked in our out. Technically returns an object { id, boolean }


`[GET] /member/:id/activate`
*NOTE*: Supposed to be `POST` but cheating for prototype


### Team members

Earle Acosta, Ernie Hsiung, Edwin Reynoso, Kelvin Perez