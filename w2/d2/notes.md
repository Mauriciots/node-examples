# HTTP Cookies and Authentication

## HTTP is stateless

![](https://c.tenor.com/pyl5ZM7QeLAAAAAC/dory.gif)

The server does not remember anything about the client.

The server does not know who the client is, or what they have done in the past. Every request is treated as a new request.

### Pros and Cons

#### Pros

- Scalability - the server does not need to store any information about the client

- Less complex

- Easier to cache

#### Cons

- Cannot easily keep track context

- Context has to be passed in every request

- Good for transactions, not good for conversations

## Cookies

Cookies are a way for the server to remember information about the client.

### How do cookies work?

- The server sends a response to the client with a `Set-Cookie` header

```js
app.get("/login", (req, res) => {
  res.cookie("username", "bob");
  res.send("You are logged in");
});
```

- The client stores the cookie

- The client sends the cookie back to the server in the `Cookie` header

- The server can read the cookie and use it to remember information about the client

```js
app.get("/profile", (req, res) => {
  console.log(req.cookies);
  res.send("You are logged in");
});
```

- If user logout, server needs to clear cookies

```js
app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.send("You are logged out");
});
```

## Login/register process with cookies

Let's code!

- Step 1: Create the server with express

- Step 2: Make the server to listen requests

- Step 3: Create an object of users

- Step 4: Create a route `/register` that expects a GET request and respond with a form using EJS file

- Step 5: In the form, include method POST and action to `/register` endpoint

- Step 6: Create a route `/register` that expects a POST request and respond with cookies

- Step 7: Check in Chrome Dev Tools > Application > Cookies.

- Step 8: Create a route `/login` that expects a GET request and respond with a form using EJS file

- Step 9: In the form, include method POST and action to `/login` endpoint

- Step 10: Create a route `/login` that expects a POST request and respond with cookies if username and password are matching with stored data.

- Step 11: Create a button to user logout. It should be in a form with method POST and action to `/logout` endpoint

- Step 12: Create a route `/logout` that expects a POST request and redirect the client to `/`
