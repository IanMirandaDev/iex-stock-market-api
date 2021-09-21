
<h1 align="center"> 
	iex-stock-market-api
</h1>

Developed using Node.js based system, iex-stock-market-api its an simple system to get stock market data from the [IEX Cloud API](https://iexcloud.io/docs/api/) and present it to user.

Its an simple system of requests for companies and yours quotes data. The company description is saved in database at first request, and then, the newer requests for the same company will be get from your own DB 'cache' system. This cannot be done with the quotes data requests, they are changing every second and need to be always updated.

### The system use: 
* `socket.io` for real time updates
* `axios` for HTTP requests
* `express-handlebars` as server side rendering engine
* `sequelize ORM` to manage the SQL DB
* `MySQL` as database
* `Docker` to work with containers
* `Docker-compose` to manage containers

## Getting started

### System requirements

Before start, check if you have installed and configured the following tools:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (_just if you want to run the system with the automatic docker default configuration_)
* [MySQL](https://www.mysql.com/) (_just if you will not run it with Docker_)

_It's necessary an account in [IEX Cloud](https://iexcloud.io/). Create or access your account and then you can get your tokens into the [IEX Cloud console](https://iexcloud.io/console/)_

### Getting the repository

Clone this repository by running:

```bash
git clone git@github.com:IanMiranda43/iex-stock-market-api.git
```

### Configuring the project

Access the project folder and then set your server port, IEX public and secret tokens and DB credentials in the `.env` file.

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

## Working with Docker

The project has all the Docker configurations that its needed. If do you want to run with containers, there are configured to run the node project in one and the database in another. With that your containers will be created and the project configured properly without to need any intervention before its running.

The database container need to be configured with the **database**, **username** and **user password** before its builded. To make that, we have an `.env.example` file in the path `.docker/mysql/.env.example`. Copy or rename that file to `.env` and set your database config in there like bellow.


```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=database
MYSQL_USER=username
MYSQL_PASSWORD=password
```

_remember that this credentials will be used by your system and needs to be the same that you configured at the main `.env` file in the root folder_

After that, run the following to build your docker images:

```bash
docker-compose build
```

To create and start your containers, run the following command:

```bash
docker-compose up
```

## Configuring without Docker

If you did not want to use Docker you can configure the server by yourself:

_Remember that in this case you need to have an configured and running MySQL database_
### Installing the dependencies:

In the project folder run de following code. This will create a `node_modules` folder and download and install all the project dependencies in there. 

```bash
npm install
```

### Start the server:

The script will run the migrations and then start the application at the port setted on the `.env` file.

_Before exec it, make sure that your DB is running_

```bash
npm run start
```

## Access the project page

This can be found by access <a href="http://localhost:3000" target="blank">localhost:3000<a>

---

## License

MIT License © [Ian Miranda](https://github.com/IanMiranda43)
