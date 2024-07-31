const weatherController = {};

weatherController.getLongitudeAndLatitude = async (req, res, next) => {
  // handle logic for getting coordinates from Google API
  const API_KEY = process.env.GOOGLE_APIKEY;

  // ***** Uncomment the desired Query format to be used. ONLY UNCOMMENT ONE

  //QUERY BASED ON City, State formate example New York, NY
  // const { city, state } = req.query;
  // const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${API_KEY}`;

  //QUERY BASED ON ZIP CODE formate example 10034
  const { zip } = req.query;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      return next({ err: 'fetching location data failed' });
    }
    const data = await response.json();

    res.locals.latitude = data.results[0].geometry.location.lat;
    res.locals.longitude = data.results[0].geometry.location.lng;

    // console.log(data.results[0].geometry.location);

    // console.log(
    //   'LONGDITUDE: ',
    //   res.locals.latitude,
    //   'LADITUDE: ',
    //   res.locals.longitude
    // );
  } catch (error) {
    console.log('ERROR(weatherController.getLongitudeAndLatitude) :', error);
    return next({
      err: 'An error occurred while fetching data in weatherController.getLongitudeAndLatitude',
    });
  }
  //save coordinates to res.locals.coordinates.longditude & res.locals.coordinates.laditude
  next();
};

weatherController.getGridEndPoints = async (req, res, next) => {
  const LATITUDE = res.locals.latitude;
  const LONGITUDE = res.locals.longitude;
  const URL = `https://api.weather.gov/points/${LATITUDE},${LONGITUDE}`;
  // console.log(URL);

  try {
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(
    //   `${data.properties.gridId}, ${data.properties.gridX} ,${data.properties.gridY} `
    // );

    res.locals.gridId = data.properties.gridId;
    res.locals.gridX = data.properties.gridX;
    res.locals.gridY = data.properties.gridY;
  } catch (error) {
    console.log('ERROR(weatherController.getGridEndPoints) :', error);
    return next({
      err: 'An error occurred while fetching data in weatherController.getGridEndPoints',
    });
  }

  next();
};

weatherController.getForcast = async (req, res, next) => {
  // handle logic for getting coordinates from Google API
  const OFFICE = res.locals.gridId;
  const GRIDX = res.locals.gridX;
  const GRIDY = res.locals.gridY;
  const URL = `https://api.weather.gov/gridpoints/${OFFICE}/${GRIDX},${GRIDY}/forecast`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.properties.periods[0]);
    // data is stored via this path data.properties.periods. The periods property is an array. Each element in the period array represents a day starting with today at the 0th index.

    res.locals.temperature = data.properties.periods[0].temperature;
    res.locals.shortForecast = data.properties.periods[0].shortForecast;

    // shortForecast
  } catch (error) {
    console.log('ERROR(weatherController.getForcast) :', error);
    return next({
      err: 'An error occurred while fetching data in weatherController.getForcast',
    });
  }

  next();
};

export default weatherController;
