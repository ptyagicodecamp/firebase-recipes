This example demonstrates how to build REST Api using Firebase Cloud functions, Firestore database, Nodejs and Express framework.

Step #1: Create a project in [Firebase console](https://console.firebase.google.com/).

Step #2: Install firebase tools using `npm` nodejs package manager.
```
npm install -g firebase-tools
```

Step #3: Initialize firebase project for Firebase hosting and Cloud functions
```
firebase login //log into firebase project
firebase init //Initialize firebase project
```
You'll see followign after initialization:
```
  Wrote functions/package.json
✔  Wrote functions/tsconfig.json
✔  Wrote functions/src/index.ts

```

Step #4: Install Express (to help write APIs), `body-parser` and helper firebase cloud functions package (https://www.npmjs.com/package/firebase-functions-helper)
```
cd functions
npm install --save express body-parser firebase-functions-helper
```
Step #5: Define endpoints in `functions/src/index.ts`

Step #6: Update `firebase.json`

Step #7: Deploy
```
firebase deploy //Deploys hosting and Functions
firebase deploy --only functions //Deploys only functions
```

You'll see a URL like this: https://<projectId>.firebaseapp.com/api/v1/**

Step #8: Testing APIs using Postman
Api for my project: https://abs-luncher.firebaseapp.com/api/v1/flowers
1. Add one flower to database
Body (raw): 
```
{
  "commonName": "Caladium",
  "scientificName": "Caladium x hortulanum",
  "familyName": "Araceae"
}
```
