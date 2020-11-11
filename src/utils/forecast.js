const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=27fdbb910a8a1b6f7e47b6475ed40228&query=" +
    encodeURI(latitude) +
    "," +
    encodeURI(longitude);

  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to reach the Internet.", undefined);
    } else if (body.current === undefined) {
      callback(
        "No matching location found, Please try different address",
        undefined
      );
    } else {

      const {
        weather_descriptions,
        temperature,
        precip,
        feelslike,
        humidity,
      } = body.current;
      data =
        weather_descriptions +
        ". It is currently " +
        temperature +
        " degress out and There is " +
        precip +
        "% chances of rain. It is currently " +
        temperature +
        " degrees out and feels like " +
        feelslike +
        " degrees out.\n" +
        "The Humidity is " +
        humidity + "%.";

      callback(undefined, data);
    }
  });
};

module.exports = forecast;
