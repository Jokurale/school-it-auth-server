# authorization-server 🌀

◼ AaaS cloud model app for further jwt intergration.

## Getting Started👨‍🦯

- Clone or fork repository from main/master or build branch.

### Prerequisites👈

- Make sure your npm is up to date.
- Make sure your MongoDB DBaaS client is online and your credentials are valid.
- Lack of particicular collections will result in fail-safe triggering and closing the master app
  > Warning! _Fail-safe trigger will launch slave node app to make sure potential clients won't recieve 500 error_

### Installing 📜

```
npm install
```

and then run the server through the one of following commands:

#### Build 🏃‍♂️

```
node server.js
```

```
npm run start
```

#### Dev 👨‍💻

```
npm run dev
```

Suitable status should appear.

## Running the tests 📊

Unit testing platform is excluded from repository.

```
npm run test # command is disabled
```

## Deployment 📈

App is alpha-state

## Built With 📐

- npm
- bcrypt 5.0.0
- body-parser 1.19.0
- cors 2.8.5
- dotenv 8.2.0
- express 4.17.1
- express-rate-limit 5.2.6
- helmet" 4.4.1
- joi 17.4.0
- jsonwebtoken 8.5.1
- mongoose 5.11.17
- morgan 1.10.0

## Versioning 🗂

Manual VCS

## Authors 🕺

- **Michał Podsiadły** - _Initial work_

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 🎉

- Hat tip to anyone whose code was used.
- Inspired by recent jwt crash course and lack of light-weight request jwt authorization service.
- [Check out readme gen](https://www.makeareadme.com)
