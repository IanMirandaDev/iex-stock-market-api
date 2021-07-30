# IEXstockMarketAPI

Developed using Node.js based system, IEXstockMarketAPI its an simple system to get stock market data from the [IEX Cloud API](https://iexcloud.io/docs/api/) and present it to user.

At now we have just an simple system of requests for companies and yours quotes data. The company description is saved in database at first request, and then, the newer requests for the same company will be get from your own DB 'cache' system. This cannot be done with the quotes data requests, they are changing every second and need to be always updated.

### The system use: 
* `axios` lib to make HTTP requests
* `express-handlebars` to server side rendering
* `Sequelize ORM` to manage the SQL database
* `Socket.io` to real time updates

_at now are configured to use MySQL database_

<h2 align="center"> 
	🚧  IEXstockMarketAPI 🚀 Under construction...  🚧
</h2>

## Getting started

### System requirements

Before start, check if you have installed and configured the following tools:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

_It's necessary an account in [IEX Cloud](https://iexcloud.io/). Create or access your account and then you can get your tokens into the [IEX Cloud console](https://iexcloud.io/console/)_

### Getting the repository

Clone this repository by running:

```bash
  git clone https://github.com/IanMiranda43/IEXstockMarketAPI
```

### Configuring the project

Access the project folder and then set your server port, DB credentials and IEX public and secret tokens in the `.env` file.

```env
  PORT=3000
  
  # IEX API access data
  IEX_API_VERSION=v1
  IEX_PUB_TOKEN=IEX_API_public_token
  IEX_SECRET_TOKEN=IEX_API_secret_token
  
  # DB credentials to DEV and PROD environments
  DB_DATABASE_DEV=database
  DB_USER_DEV=user
  DB_PASS_DEV=password
  DB_HOST_DEV=127.0.0.1
  DB_PORT_DEV=3306

  DB_DATABASE_PROD=database
  DB_USER_PROD=user
  DB_PASS_PROD=password
  DB_HOST_PROD=127.0.0.1
  DB_PORT_PROD=3306
```
_The `.env.example` file have this layout, just set your data there and remove the `.example` extension from it._

### Installing the dependencies:

In the project folder run de following code. This will create a `node_modules` folder and download and install all the project dependencies in there. 

```bash
  node install
```

### Start the server:

The script will connect to database, run the migrations and then start the application at the port setted on the `.env` file.

_Before exec it, make sure that your DB is running_

#### As development environment:

```bash
  npm run dev
```

#### As production environment:

```bash
  npm start
```

### Access the home page

This can be found by access <a href="http://localhost:3000" target="blank">localhost:`PORT`<a>

_The `PORT` is that you setted into the `.env` file. Default value is 3000_

---

## License

MIT License © [Ian Miranda](https://github.com/IanMiranda43)