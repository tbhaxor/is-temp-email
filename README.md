# IsTempEmail

> Slimline nodejs library to check whether the email is temporary / disposable emails

Temporary emails for any application is the worst thing. It could lead to bot users registration and can contribute in analytics miscalculations or can fill the db space.

This module is for nodejs apps, with this you can check the email if temporary or not. 

## Features

1. Single or bulk email checking
2. Free of cost (no api pricing)
3. No third party dependency 
4. Shipped with typings for better intellisense

## Requirements

1. Nodejs 12+
2. Npm or Yarn


## Installation

```shell
# using npm
npm i @tbhaxor/is-temp-email

# using yarn
yarn add @tbhaxor/is-temp-email
```

## Importing in nodejs project

```js
// commonjs
const isTempEmail = require("@tbhaxor/is-temp-email")

// esm
import * as isTempEmail from "@tbhaxor/is-temp-email"
```

## Usage

**Single email usage** <br>
```js
isTempEmail.single("EMAIL").then(r => {
  console.log(r) // can be true or false
}).catch(console.error)
```

**Bulk email usage** <br>
```js
isTempEmail.single(["EMAIL1", "EMAIL2"]).then( r => {
  console.log(r["EMAIL1"]) // can be true or false
}).catch(console.error)
```

## Licensing

This project is licensed under [MIT License](https://github.com/tbhaxor/is-temp-email/blob/main/LICENSE)

## Contact the Author

+ [Email](mailto:tbhaxor@gmail.com)
+ [LinkedIn](https://linkedin.com/in/gurkirat--singh)