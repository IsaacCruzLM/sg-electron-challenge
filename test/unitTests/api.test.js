const jest = require('jest');

describe('request', () => {
    const xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      response: 'Hello World!'
    };
  
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock);
    const callback = jest.fn();
    performRequest(callback);

    expect(xhrMock.open).to('GET', 'https://example.com/');
    expect(xhrMock.setRequestHeader).toBeCalledWith('Accept', 'application/json');
    (xhrMock.onreadystatechange)(new Event(''));
    expect(callback.mock.calls).toEqual([['Hello World!']]);
  });