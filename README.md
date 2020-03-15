# React-Node-Express-MySQL RESTful Calculations
Utilizing React, Node, Express, and MySQL, this project used REST API calls to insert and update data in a database. 

## Installation - MySQL Setup

As noted by the title of this project, we are using MySQL as the database in this project.

I am using MacOS for my working environment, but here are the links I used to download and install MySQL and MySQL Workbench.

Click here to install: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/), [MySQL Workbench](https://www.mysql.com/products/workbench/)

## Installation - Node.js Server and React Development Environment

Clone the Github repo using.

```bash
git clone https://github.com/alexlarcheveque/React-Node-Express-MySQL-RESTCalculations.git
```

There are two folders in this project, Express-Node-MySQL and React-App. Follow the respective directions down below.

### Express-Node-MySQL Start

Before starting, we need to make sure you have Node.js installed.

Click here if you have not installed it yet: [Node.js](https://nodejs.org/en/download/)

In your terminal, open the Folder Express-Node-MySQL. 

Make sure the packages Express, CORS, MySQL, and Nodemon are installed on your system using npm.

```bash
npm install --save-dev nodemon
npm install express --save
npm install cors --save
npm install mysql --save
```
After these packages are installed, start the node server 

```bash
nodemon index.js
```

Your Node server should be running on port 3306, while your REST API calls can be made on localhost:4000

### React-App Start

In your terminal, open the Folder React-App.

Start the react development server by executing the following.

```bash
npm start
```

