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

# Examples

## Basic

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

// app.js
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
  return db.find('user', userId);
});

const server = new Server();

server.use(db);
server.use(router);

// app.js
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

### Unchaining the Router

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

// app.js
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

### Fetch & XMLHttpRequest support
  

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/foo', (request) => '');

const server = new Server();

server.use(router);

// app.js
fetch('/', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```  

### Database candyness

```javascript
import {Database, Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 
});

const server = new Server();

server.use(router);

// app.js
fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```  

### Passthrough

```javascript
import {Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 
});

const server = new Server();

server.use(router);

// app.js
fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```

### Advanced example

```javascript
import {Database, Router, Server} from 'Kakapo';
  
const router = new Router();

router.get('/users/', (request) => {
  return 
});

const server = new Server();

server.use(router);

// app.js
fetch('/users', users => {
  console.log(users[0].id === 1);
  console.log(users[1].id === 2);
});
```
</div>