const request = require('request');

const geocode = (address,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) +".json?access_token=pk.eyJ1IjoicmFodWx2ODgxIiwiYSI6ImNraGJnbWI5ZzFka3MycG5xb2RwZDU5aDMifQ.gz4BlBhMhp7IjLe6xmyiyQ&limit=1";

    request({url: url, json: true},(error,{body}) => {

        if(error){
            callback("Unable to reach the Internet.",undefined)
        }
        else if(body.features.length === 0){
            callback("No matching location found, Please try different address",undefined);
        }
        else{
            callback(undefined, {
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location: body.features[0].place_name,
            });
        }
    });
}



module.exports = geocode;