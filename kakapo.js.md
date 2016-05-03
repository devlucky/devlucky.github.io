---
layout: kakapo
---

* TOC
{:toc}

# Foo

# bar

## asdasd

### asdas

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

  router.get('/users/:user_id', (request) => 
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