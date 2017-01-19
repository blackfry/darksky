
## Starting app

clone repo/download to {pathname}


```


cd {pathname}/app/
npm install
npm start

cd server/
npm install
npm run server


```
page is served from localhost:3000


## Notes

- A redux action is dispatched on 'get forecast' button click. 
- The getWeatherEpic observable (rxjs), is listening for the
type the action dispatches. 
- The express serer api request and data processing logic resides in the functions called by the epic. 
- If the epic completes its functions successfully, it passes success data into the reducer and into state.