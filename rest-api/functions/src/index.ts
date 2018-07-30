import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Firebase admin SDK
import * as admin from 'firebase-admin';
//Firebase Cloud functions helper
import * as firebaseHelper from 'firebase-functions-helper';
//Nodejs framework
import * as express from 'express';
//Utility to help parsing requests
import * as bodyParser from 'body-parser';

//Initialize Firebase project/app using admin SDK
admin.initializeApp(functions.config().firebase);

//Reference to Firestore database
const db = admin.firestore();

//Initialize express framework
//main is the outer shell and app deals with api declarations
const app = express();
const main = express();

const flowersCollection = 'flowers';

//add app to main
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

//restApi is the Cloud functions name. 'main' will be passed into it as parameter.
export const restApi = functions.https.onRequest(main);

//Adding new entry into flowers database
app.post('/flowers', (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, flowersCollection, req.body);
  res.send("Added new flower to database");
})

//Update a record
app.patch('/flowers/:flowerId', (req, res) => {
  firebaseHelper.firestore.updateDocument(
    db,
    flowersCollection,
    req.params.flowerId, req.body
  );
  res.send('Flower updated');
})

//Delete a record
app.delete('/flowers/:flowerId', (req, res) => {
  firebaseHelper.firestore.deleteDocument(
    db, flowersCollection, req.params.flowerId
  );
  res.send("Flower deleted");
})

//View a record/flower
app.get('/flowers/:flowerId', (req, res) => {
  firebaseHelper.firestore.getDocument(
    db,
    flowersCollection,
    req.params.flowerId).then(doc => res.status(200).send(doc));
})

//View all flowers
app.get('/flowers', (req, res) => {
  firebaseHelper.firestore.backup(db, flowersCollection).
  then(data => res.status(200).send(data))
})
