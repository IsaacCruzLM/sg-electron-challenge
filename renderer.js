// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function getWheaterByCityId() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=0323a0a2e456757e8a98c09bec2ba751';
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText
}

function main() {
    console.log(getWheaterByCityId());
}

main();