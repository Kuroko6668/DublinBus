## Product preview

## Frontend 
### step 1

A google maps api key must be obtained from https://mapsplatform.google.com/ 

Please add the key in DublinBusRepo/src/Components/Map/index.js file, line 54

Use the syntax:

```bash
const GOOGLE_KEY = "YOUR_KEY";
```


### step 3
Installs the necessary npm packages. To run this command, first navigate to the frontend folder.
```bash
npm install
```
### step 4
In the project directory, you can run:
```bash
npm start
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Connection with backend

For the data, the front-end application contacts the back-end. Please change the URL of the axios instances to the host URL of your Django backend. 

