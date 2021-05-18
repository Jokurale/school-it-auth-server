# school-it-auth-server 🌀

◼ Integrated with [_school-it-resource-api_](https://github.com/Jokurale/school-it-resource-api)

## Implementation 👈

This repo contains real implementation of this [auth-server](https://github.com/Jokurale/authorization-server)

> No more refresh-token storage, now authentication process is truly stateless.

## Backend implementation model 🗂

Graphical representation will be available at README.ME of this [repo](https://github.com/Jokurale/school-it)

## Potential further changes 🧭

No scheduled changes.

## Tests 📊

Latest API coverage covers up-to-date route map, including routes that have been excluded from handling.

> When? <br>
> * during git hard reset to changes before REDIS Store implementation <br>

> What's been changed? <br>
> * no more /logout path, and now user is able to request unlimited amount of tokens <br>

## Route map 🎫

<pre>
. <br />
└── / <br />
    ├── /refresh <br />
    │   ├── Request: Refresh token in authorization header <br />
    │   └── Response: New access token or Error message <br />
    └── /login <br />
        ├── Request: Login and password <br />
        └── Response: Token set (Access token and Refresh token) or Error message <br />
</pre>

## Built With 📐

- NODE.JS
- axios
- bcrypt
- body-parser
- cors
- dotenv
- express
- express-rate-limit
- helmet
- jsonwebtoken
- morgan
