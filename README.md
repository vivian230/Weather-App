# Weather app


**Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```

**Afterwards, install the dependencies :**

```sh
npm install
```

## Quick App Overview

- The initial run will display the Phone version. We are designing the resolution of the app so that the user can scroll up and down to see more specific weather informations.

- The app uses 2 main APIs that return general weather conditions and forecasts in 2 respective days & lifts information from 16 different locations.

## APIs Used
- General weather conditions and forecasts in 2 respective days: [Weather API](https://www.weatherapi.com/)
- Lifts information from 16 different locations: [Ski Resorts and Conditions API](https://rapidapi.com/random-shapes-random-shapes-default/api/ski-resorts-and-conditions/)

### API Info

Weather API
* Method: `GET`
* URL: `http://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={CITY_NAME}&days={NUMBER_OF_DAYS}&aqi=no&alerts=no`

Ski Resorts and Conditions API
* Method: `GET`
* URL: `https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/{RESORT_ID}`

## Development Workflow

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Available Lifts Information

The App contains information of the number of available lifts of specific ski locations.

Due to the API we are using for the lifts information, there are only 16 places that include the available lifts information.

The list contains 16 USA locations:
"Alpine Meadows", "Alyeska", "Angel Fire", "Arapaho", "Aspen Mountain", "Beaver Creek", "Big Sky", "Bolton", "Breckenridge", "Bretton Woods", "Brian Head", "Bridger", "Brighton", "Burke", "Buttermilk", "Camelback"

To get the weather information of these locations, input: "{location_name}, USA".

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
