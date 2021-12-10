const api = require('../../renderer');

describe('verifica a requisião a API', () => {
  const expectResult = {
    "id": 6321026,
    "name": 'Salvador',
    "main": {
      "temp": 302.93,
      "feels_like": 309.62,
      "temp_min": 302.93,
      "temp_max": 302.93,
      "pressure": 1012,
      "humidity": 78,
    },
    "wind": {
      "speed": 4.14,
      "deg": 64,
      "gust": 5.43
    },
  };

  api.getWeatherByCityId = jest.fn();
  api.getWeatherByCityId.mockImplementation(async () => expectResult);

  test('Verifica a resposta da requisição a API que busca pelo ID', async () => (
    api.getWeatherByCityId(6321026).then((weather) => {
      expect(weather.id).toEqual(6321026);
      expect(weather.name).toEqual('Salvador');
      expect(weather.main.temp).toEqual(302.93);
      expect(weather.main.feels_like).toEqual(309.62);
      expect(weather.main.temp_min).toEqual(302.93);
      expect(weather.main.temp_max).toEqual(302.93);
      expect(weather.main.pressure).toEqual(1012);
      expect(weather.main.humidity).toEqual(78);
      expect(weather.wind.speed).toEqual(4.14);
    })
  ));

  api.getWeatherByName = jest.fn();
  api.getWeatherByName.mockImplementation(async () => expectResult);

  test('Verifica a resposta da requisição a API que busca pelo Nome', async () => (
    api.getWeatherByName('Salvador').then((weather) => {
      expect(weather.id).toEqual(6321026);
      expect(weather.name).toEqual('Salvador');
      expect(weather.main.temp).toEqual(302.93);
      expect(weather.main.feels_like).toEqual(309.62);
      expect(weather.main.temp_min).toEqual(302.93);
      expect(weather.main.temp_max).toEqual(302.93);
      expect(weather.main.pressure).toEqual(1012);
      expect(weather.main.humidity).toEqual(78);
      expect(weather.wind.speed).toEqual(4.14);
    })
  ));
});