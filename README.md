# a-route

<sup>**Social Media Photo by [Jakub Gorajek](https://unsplash.com/@cinegeek) on [Unsplash](https://unsplash.com/)**</sup>

Express like routing, as Custom Element or standalone, inspired by [page.js](https://visionmedia.github.io/page.js/).


### app API

  * `app.get(path:string|RegExp, cb:Function[, cb2, ...]):app` to subscribe one or more callbacks for the specified route
  * `app.delete(path:string|RegExp, cb:Function[, cb2, ...]):app` to unsubscribe one or more callbacks for the specified route
  * `app.navigate(path:string):void` to navigate to the first matching route for the given path
  * `app.param(path:string|RegExp):app` to subscribe to a specific parameter regardless of the route
  * `app.use(path:string|RegExp):app` to subscribe a callback for a specific mount point or all of them


### Example

The following is a basic example, also [available live](https://webreflection.github.io/a-route/test/?).

```html
<script src="//unpkg.com/a-route"></script>

<!-- simply add `is="a-route"` to any link in your page -->
<a is="a-route" href="/test/?query=value">test query</a>

<!-- you can also add `no-propagation`, to stop propagation on click
    or you could add `replace` to replace state instead of pushing it -->
<a is="a-route" href="/test/OK" no-propagation replace>test OK</a>

<!-- unregistered routes will pass through `'*'` handler, if any -->
<a is="a-route" href="/whatever">test 404</a>
```

```js
// import {app} from 'a-route';
// const {app} = require('a-route');
const {app} = ARoute;

// define routes
app
  .get('/test/?query=:query', function (ctx) {
    console.log(ctx);
    /*
    {
      "path": "/test/?query=value",
      "params": {
        "query": "value"
      }
    }
    */
  })
  .get('/test/:status', function (ctx) {
    console.log(ctx);
    /*
    {
      "path": "/test/OK",
      "params": {
        "status": "OK"
      }
    }
    */
  });

// intercept all unregistered calls
app.get('*',
  function (ctx, next) {
    console.log(ctx);
    /*
    {
      "path": "/whatever"
    }
    */
    next();
  },
  // will receive the ctx object too
  console.error
);
```
