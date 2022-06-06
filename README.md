# Obsidian HTTP Request

[![Tests](https://github.com/wanadev/obsidian-http-request/actions/workflows/tests.yml/badge.svg)](https://github.com/wanadev/obsidian-http-request/actions/workflows/tests.yml)
[![NPM Version](http://img.shields.io/npm/v/obsidian-http-request.svg?style=flat)](https://www.npmjs.com/package/obsidian-http-request)
[![License](http://img.shields.io/npm/l/obsidian-http-request.svg?style=flat)](https://github.com/wanadev/obsidian-http-request/blob/master/LICENSE)
[![Discord](https://img.shields.io/badge/chat-Discord-8c9eff?logo=discord&logoColor=ffffff)](https://discord.gg/BmUkEdMuFp)


**Obsidian HTTP Request** is a helper library that allows you to download
assets and make HTTP requests either directly or through a proxy (to avoid CORS
issues, for example when using images from an other domain with a canvas).

![Obsidian HTTP Request Schemas](./doc/images/obsidian-http-request-schema.png)


## Documentation

You can find the library documentation at the following address:

* http://wanadev.github.io/obsidian-http-request/


## Example

```javascript
const httpRequest = require("obsidian-http-request");

httpRequest.getText("http://example.com/hello.txt")
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.error(error);
    });
```


## Changelog

* **1.5.0:** Add a method to get the result as Blob (#20)
* **1.4.0:** Adds status code and message in Error objects (#19)
* **1.3.2:** Accepts 2xx HTTP status code and not only 200 (client side)
* **1.3.1:** Proxy do not returns an error anymore when server respond with 2xx
  status code (#14)
* **1.3.0:** Log URLs in error messages
* **1.2.0:**
    * Generic `request` and `requestProxy` method (to be able to use different
      methods than GET, with more options) #6
    * Proxyfied methods can now be used with relative links
    * Better documentation
* **1.1.4:** Updates dependencies
