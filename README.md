# How to setup a nodejs project on mac 

## Tech stack：
* Nodejs 
* Typescript
* Express 
* Mongoodb 
* VSCode

<br />

## Before start project, you should install on you mac:
- Node,
- Mongodb,
- Git,

<br />

## Now, we start it step by step
1. install TS and express  
``` 
mkdir  project-name  //Your project folder.
cd project-name   // open the folder.
npm init -y   // Init npm, and defult yes
npm install typescript -g --save-dev  // Install ts
npm install express body-parser --save-dev  //Install express and body-parse 
npm install @types/express --save-dev  
npx tsc -init   // add ts config file
```
<br />

2. init git and add .gitignore
+ git init 
+ add .gitignore for nodejs , you can use the file from github 

<br />
3. Now, we start a server for our project

Create a src/index.ts
```javascript
import express, { Application } from 'express';
import {json} from "body-parser";

const app: Application = express();
app.use(json())

const port = 8000;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

```


4. You nedd transfer ts to js by add command to package.json.
Before this, you need install some npm packages. 

``` 
npm install ts-node-dev --save-dev 
```

``` json
"scripts": {
   "start": "ts-node-dev src/index.ts"
}

```
Then, you can use "npm run start" command to run you project. 



5. Setup routes 

First, create controll file, It's src/controlls/IndexControll.ts

``` javascript
import { NextFunction, Request, Response, Router } from 'express';

const IndexController: Router = Router();

IndexController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send({ data: 'Hello word!' });
    } catch (e) {
        next(e);
    }
});

export default IndexController
```

Second, add this code to index.ts, and import IndexController to index.ts
```javascript
import IndexControllers from "./src/controllers/IndexControllers"

app.use("/", IndexControllers);

```

<br/>

7. How to debug a web nodejs in vscode
+ Click debug button in left side toolbar.
+ Click "create a launch.json", then choose nodejs. Now, + we have ./vscode/launch.json.
+ Click "run and debug" button, choose run command. This project is "npm run start".
+ Next, you can set break point for code in VScode.
+ When post http request to node server, the application be stoped on break point. You can see something in break point.

<br/>

8 .Run database

you can use brew install mongodb or use other install ways

Run mongodb :
```
mongod --dbpath ~/mongodbData/cityinfodb --port 27018
```
It mean you setup mongodb server on port 27018, and the data be stored in ~/mongodbData/cityinfodb
 
Next , we can use mongo command create a database.
Connet mongodb by "mongo  —port 27018"

Then you can see the database by "db show", and create dababase by "use databaseName". Maybe you can't see it, that beacuse there are not data in this database.


9.  We can connect and use database by mongoose.
First, install it .
```
npm install mongoose --save-dev
```


This is step is connect mongodb to our project 

use this code to connect mongodb
``` javascript
import mongoose from "mongoose";

function setupMongo(): void {
  const mongoDB = "mongodb://localhost:27018/databasename";


  mongoose.connect(mongoDB, { useNewUrlParser: true });

  //Get the default connection
  var db = mongoose.connection;

  db.on("open", () => { console.log("Mongo connection successfully") })

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

export default setupMongo;
```

9.Next, we create schema. Schema is a data definition format.
For example, user is the object in our project. And we can express it by schema.
 ```javascript
 import mongoose from "mongoose"  // import mongoose 

const UserSchema = new mongoose.Schema({   //Define schema.
  name: {type: String, required: true, minlength: 2}  //Define property that be named as "name", and it's required, type is String,minlength is 2.
})

export const User = mongoose.model("User", UserSchema)  //Transfer schema to models of monggose, and export it .

 ```
10 Create controller 

```javascript 
// Now, we need to create a controller for reciving request and post responses.
import { Router, Request, Response, NextFunction, request, response } from "express"
import { User } from "../models/User"

const UserController: Router = Router()

UserController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await new User(req.body).save();
        res.send({ data: user._id })
    } catch (err) {
        next(err)
    }
})

```

11 add route 
// This step is add route to our app, we can add route in index.ts
``` javascript
app.use("/", UserControllers);
```



