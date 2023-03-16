
# Prohooks

This is the official wrapper for the Prohooks API. With Prohooks, you can easily create and manage webhooks and timers.

## Installation

You can install Prohooks using npm:
```diff
+ npm install prohooks```

## Usage

Here's an example of how you can create a new client and use it to get scheduler info and create a timer and delete a timer:

Example code for creating a new Client:

```js

const {Prohooks} = require("prohooks")

const prohooks = new Prohooks("yourapikeyhere")

```

Example of how to get a schedulers info:

```js

const info = await prohooks.get("timeridhere")

console.log(info)

```

Example of creating a new timer:

```js

const created = await prohooks.create({
name: "Hook name",
url: "https://google.com", 
headers: {"Content-Type": "application/json"},
method: "GET", 
payload: { "key": "value" },
duration: "10m"});
return created

```

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.
