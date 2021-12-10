const https = require('https');

const url = 'https://randomurrl/api/';

const fetchURL = () => new Promise(function (resolve, reject) {
  https.get(url, (res) => {
    res.setEncoding('utf8');
    let weatherInfo = {
        main: {
            temp: 273
        },
    };
    res.on('data', (data) => {
        weatherInfo += data;
    });
    res.on('error', reject);
    res.on('close', () => resolve(JSON.parse(weatherInfo).results[0]));
  });
});

module.exports = { fetchURL };