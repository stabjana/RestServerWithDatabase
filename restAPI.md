# Web APIs - REST

## docs

- https://en.wikipedia.org/wiki/REST
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Methods (http)

- GET
- POST
- PUT
- DELETE

- OPTIONS
- HEAD

- PATCH
- TRACE
- CONNECT

## Resource

For example computers

```
http://localhost:3000/api/computers
```

What to do with the resource `computers` depends on the method used.

To get all computers we use GET:

```http
GET http://localhost:3000/api/computers HTTP/1.1
```

returns an array

```json
[
  {
    "id": 1,
    "name": "Small Brain",
    "price": 3000
  },
  {
    "id": 2,
    "name": "Big Brain",
    "price": 300000
  }
]
```

the resource `computer` is endpoint

to get one computer (id=2):

```http
GET http://localhost:3000/api/computers/2 HTTP/1.1
```

might return

```json
{
  "id": 2,
  "name": "Big Brain",
  "price": 300000
}
```

## Examples

### get all computers

```
GET /api/computers
```

### get one computer

```
GET /api/computers/2
```

### to add a new computer

computer is send as json body

```
POST /api/computers
```

### to update a computer

computer is send as json body.
If the computer with given number doesn't exist, it will be added.
If the computer with given number exis, it will be updated (replaced)

```
PUT /api/computers
```

### to remove a computer

```
DELETE /api/computers/2
```

## Usage with fetch

Let's assume `cors` "situation"

### GET

```js
const options = {
  method: "GET",
  mode: "cors",
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

The GET is default, so you can just fetch

```js
const data = await fetch(urlToEndpoint, { mode: "cors" });
const jsonData = await data.json();
```

All computers:

```js
fetch("http://localhost:3000/api/computers", { mode: "cors" });
```

One computer (id=2)

```js
fetch("http://localhost:3000/api/computers/2", { mode: "cors" });
```

### DELETE

```js
const options = {
  method: "DELETE",
  mode: "cors",
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

Delete one computer (id=2)

```js
fetch("http://localhost:3000/api/computers/2", options);
```

### POST and PUT

```js
const computerObject = {
  id: 2,
  name: "Big Brain",
  price: 300000,
};
```

#### post

```js
const options = {
  method: "POST",
  mode: "cors",
  body: JSON.stringify(computerObject),
  headers: { "Content-Type": "application/json" },
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

```js
fetch("http://localhost:3000/api/computers", options);
```

#### put

```js
const options = {
  method: "PUT",
  mode: "cors",
  body: JSON.stringify(computerObject),
  headers: { "Content-Type": "application/json" },
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

```js
fetch("http://localhost:3000/api/computers", options);
```
