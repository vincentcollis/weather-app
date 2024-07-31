const weatherController = {};

weatherController.getLongitudeAndLatitude = async (req, res, next) => {
  // handle logic for getting coordinates from Google API
  const API_KEY = process.env.GOOGLE_APIKEY;
  const { city, state } = req.query;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      return next({ err: 'fetching location data failed' });
    }
    const data = await response.json();

    // [res.locals.coordinates.longditude, res.locals.coordinates.laditude] =
    //   data.results[0].geometry.location;
    // res.locals.coordinates.longditude = data.results[0].geometry.location.lng
    // res.locals.coordinates.laditude = data.results[0].geometry.location.lng
    res.locals.laditude = data.results[0].geometry.location.lat;
    console.log('DATA: ', data.results[0].geometry.location.lat);
    console.log(
      'LONGDITUDE: ',
      res.locals.laditude,
      'LADITUDE: ',
      res.locals.coordinates.laditude
    );
  } catch (error) {
    return next({ err: 'An error occurred while fetching location data' });
  }
  //save coordinates to res.locals.coordinates.longditude & res.locals.coordinates.laditude
  next();
};

weatherController.getForcast = (req, res, next) => {
  // handle logic for getting coordinates from Google API
  next();
};

export default weatherController;
