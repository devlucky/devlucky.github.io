---
layout: documentation
title: Kakapo.js
motto: Next generation mocking framework in Javascript
image_path: kakapo.gif
project_url: https://github.com/devlucky/Kakapo.js
section_class: js-banner
---

{% include toc.md %}

<div class="docs-content" markdown="1">
  
# Getting started

Kakapo its a full featured http mocking library, he allows you to entirely replicate your backend logic in simple and declaritive way directly in the browser. This way you can easily prototype and develop the whole Application without backend and just deactivate Kakapo when you go production. In order to achieve that Kakapo gives you a set of utilities like Routing, Database, Response, Request and so on...

# Examples

Before going deep into the Kakapo docs, we want to show you some examples of how to use Kakapo in your apps, in order to demonstrate how easy to integrate it is

## Basic

Use the kakapo router to declare two custom routes and returning custom data.

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users', _ => {
  return [{
    id: 1,
    name: 'Hector'
  }, {
    id: 2,
    name: 'Zarco'
  }]
});

router.get('/users/:user_id', request => {
  const userId = request.params.user_id;
  return [{
    id: userId,
    name: 'Hector'
  }];
});

const server = new Server();

server.use(router);

fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});

fetch('/users/3', user => {
  console.log(user.id === 3);
  console.log(user.name === 'Hector');
});
```  

### Using the DB
  
Combine the usage of the Router and the Database to have a more consistent way of managing the mock data. In the following example we are defining the user factory and later using some access methods provided by the db.

```javascript
import {Database, Router, Server} from 'Kakapo';

const db = new Database();

db.register('user', () => {
  firstName: 'Hector',
  lastName: 'Zarco'
});
db.create('user', 10);

const router = new Router();

router.get('/users', (request, db) => {
  return db.all('user');
});

router.get('/users/:user_id', (request, db) => 
  const userId = request.params.user_id;
  return db.findOne('user', userId);
});

const server = new Server();

server.use(db);
server.use(router);

fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
  console.log(users[2].id === 3);
});

fetch('/users/7', user => {
  console.log(user.id === 7);
  console.log(user.name === 'Hector');
});
```  

As you can see, the database automatically handles the **id** generation, so you don't have to worry about assigning incremental id's of any kind.

### Unchaining the Router

Next you will see how to use other features of the router and figure out the things you can build with it. In this example we show you how easy is to create a fake pagination handling, which is based in the actual requested page. 

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users', (request) => {
  const currentPage = request.query.page;
  const count = request.query.count;
  let users = []

  while (--count) {
    users.push({name: 'hector', age: 24});
  }

  return {
    data: users,
    metadata: {
      previous_page: currentPage - 1,
      current_page: currentPage,
      next_page: currentPage + 1
    }
  }
});

router.post('/users/:user_id/friends/:friend_id', (request) => {
  const token = request.headers.get('X-auth-token');
  const userId = request.params.friend_id;
  const friendId = request.params.friend_id;
  let message;

  if (token === 'foo-bar') {
    message = `successs friend: ${friendId} created for userId: ${userId}`;
  } else {
    message = 'Unauthorized';
  }

  return {
    message
  }
});
const server = new Server();

server.use(router);

fetch('/users?page=1&count=3', response => {
  console.log(response.data.length === 3);
  console.log(response.metadata.previous_page === 1);
  console.log(response.metadata.next_page === 2);
});

const headers = new Headers();
headers.append('X-auth-token', 'foo-bar');
const request = new Request('/users/10/friends/55');

fetch(request, {method: 'POST', headers}).then(response => {
  console.log(response.message);
});
```

### Fetch & XMLHttpRequest support

Kakapo have Fetch and XMLHttpRequest support by default, but you can always change that if you want, see the [interceptors docs](#interceptors).

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 'meh';
});

const server = new Server();

server.use(router);

fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState !== 4) return;

  const response = JSON.parse(xhr.responseText);
  console.log(response[0].id === 1);
  console.log(response[1].id === 2);
};
xhr.open('GET', '/users', true);
xhr.send();

```

### Database candyness

```javascript
import {Database, Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 
});

const server = new Server();

server.use(router);

fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```

### Passthrough

You don't need to do anything in order to keep your existing request working as they were before. Kakapo will just passthrough all the request that doesn't match any of the defined routes and fire the associated callback.

```javascript
import {Router, Server} from 'Kakapo';
  
const server = new Server();
const router = new Router();

router.get('/users', (request) => {
  return 'Kakapo';
});

const server = new Server();

server.use(router);

fetch('/users', users => {
  users == 'Kakapo';
});

fetch('https://api.github.com/users', users => {
  //Real Github users data
});

```

### Advanced example

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 
});

const server = new Server();

server.use(router);

fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```

# Demo Apps

## TODO App

Every project needs a TODO App, so here is the Kakapo one. Straightforward vanilla js app, uses the **fetch api** for the networking part.

[Todo-app repo](https://github.com/devlucky/Kakapo.js/tree/master/examples/todo-app)

![](http://cl.ly/1K1z1G102X1P/Screen%20Recording%202016-05-16%20at%2010.06%20PM.gif)

## Github explorer

Basic github users search example, based 100% on the (Github Api)[https://developer.github.com/v3]. It shows you how easy is to replicate the logic of a backend with Kakapo and iterate faster when building the UI. This example also uses jQuery just to demostrate the compatibility with Kakapo.

[Github explorer repo](https://github.com/devlucky/Kakapo.js/tree/master/examples/github-explorer)

![](https://raw.github.com/devlucky/Kakapo.js/master/examples/github-explorer/demo.gif)

# Components

## Server
  The Kakapo Server is the main component of the framework, he is charge of activate things and link components like the router or the database.

  **Linking components**
  
  So, in order to make your router to start intercepting requests, you must connect him with your server using the *use* method. Also is a good practice to connect your *current database* with your server, that way you will receive her as a parameter in your request handlers. This practice is very useful when you have multiple databases and routers, since you can easily swicth them without rewriting anything, see [Scenarios](#scenarios) section

```javascript
const myDB = new Database();
const router = new Router();
const server = new Server();

router.get('/posts', (request, db) => {
  console.log(db === myDB);
});

server.use(myDB);
server.use(router);

fetch('/posts');

```

## Router
The Router class gives you the functionality to 
it has a very intuitive interface, so if you ever had to build any kind of rest api in any server-side language, you are already familiar with the Kakapo router. that allows you to define complex routes (like in a real server)

**Method handling**

Those are the supported http methods

```javascript
import {Router} from 'kakapo';

const router = new Router();

router.get('/users/:user_id')
router.post('/users/:user_id')
router.put('/users/:user_id')
router.delete('/users/:user_id')
```

**Request object**

You can access to all the request properties through the request object passed in the request handler

```javascript
router.get('/posts/:post_id/comments/:comment_id', request => {
  console.log(request.params.post_id);
  console.log(request.params.comment_id);
  console.log(request.query.page);
  console.log(request.query.count);
  console.log(request.body);
  console.log(request.headers);
});

$.ajax({
  url: '/posts/1/comments/5?page=1&count=10',
  data: {text: 'Foo comment'},
  headers: {'X-Access-token': '12345'}
)
```

**Options**

Other useful router options are the **host** and the **requestDelay**, you just need to pass them at the initialization moment

```javascript
import {Router} from 'kakapo';

const router = new Router({
  host: 'https://api.github.com',
  requestDelay: 2000
});
```
  
## Database

Database along with the Router is also one of the most important components, if you learn how to use it properly you can reuse tons of code and become really productive, that's why Kakapo promotes the use of the Database but you can still don't use it and return whatever you want from the request handlers.

**Factories**

They come with (Faker)[https://github.com/Marak/faker.js] a cool library to generate fake data
Just a brief example of what you can achieve with the db:

```javascript
import {Server, Router, Database} from 'kakapo';

const router = new Router();
const database = new Database();
const server = new Server();

db.register('user', faker => {
  const name = faker.internet.userName();

  return {
    name,
    avatar_url: faker.internet.avatar,
    url: `https://api.github.com/users/${name}`,
    type: "User",
    company: faker.company.companyName, 
    blog: faker.internet.url, 
    location: faker.address.city,
    email: faker.internet.email,
    bio: faker.hacker.phrase,
    created_at: faker.date.past, 
    updated_at: faker.date.recent
  }
});
db.create('user', 10);

router.get('/users', (request, db) => {
  return db.all('user');
});

router.get('/users/:user_id', (request, db) => {
  return db.findOne('user', request.params.user_id);
});

router.post('/users', (request, db) => {
  return db.push('user', request.params.body);
});

server.use(database);
server.use(router);
```


**Relationships**

Sometimes while mocking, you miss some sort of consistency in your responses. Let's say you have a blog and when you ask for comments of a post you return a **post_id** that doesn't match any of the post ids...

You can solve that using relationships, they are designed to help you create this consistent state across all your requests. The methods are **belongsTo** and **hasMany**

```javascript
import {Server, Database, Router} from 'kakapo';

const server = new Server();
const db = new Database();
const router = new Router();

const blogFactory = () => ({
  posts: db.hasMany('post'),
  authors: db.hasMany('user', 2) //Notice how we expecify the author id, to force to return that record always
});
const postFactory = () => ({
  title: 'Js for the lulz',
  body: 'html body',
  blog: db.belongsTo('blog')
});
const userFactory = () => ({
  name: 'devlucky',
  followers: 1000,
});

db.register('blog', blogFactory);
db.register('post', postFactory);
db.register('user', userFactory);

db.create('post', 10);
db.create('user', 5);
db.create('blog', 1);
```

## Response

The Response object is a helper class mostly used inside the request handlers to provide rich responses to your real handlers
  
```javascript
import { Server, Response, Router } from 'kakapo';

const server = new Server();
const router = new Router();

router.get('/user/:user_id', request => {
  const code = request.params.user_id < 10 ? 200 : 400;
  const headers = {'X-request-date': new Date().getTime()};

  return new Response(code, {status: code}, headers);
});

server.use(router);
```

## Serializers

JSONApi  

## Interceptors

This component is the one that actually handles the original request, is a private one but you can configure it in the Router. Just pass **strategies** in the constructor, by default both **fetch** and **XMLHttpRequest** are used.

```javascript
import {Server, Router} from 'kakapo';

const server = new Server();
const fetchRouter = new Router({
  strategies: ['fetch']
});
const xhrRouter = new Router({
  strategies: ['XMLHttpRequest']
});

server.use(fetchRouter);

//LATER

server.use(xhrRouter);
  
```
## Scenarios
  
## Fake data
As mention above, you can use [Fake](https://github.com/Marak/faker.js) for generate fake data, take a look at the full demo [here](http://marak.com/faker.js/). Also note that you can define nested properties and use Faker on them:

```javascript
db.register('user', faker => {
  return {
    user: {
      name: faker.name.findName,
      nick: 'nick'
    },
    company: faker.company.companyName, 
    location: 'Valencia, Spain'
  }
});
```

## ROADMAP

**Full suport for JSONApiSerializer**

**Node.js compatibility**

**Node.js interceptors**
</div>
