export class StopwatchTimeHandlers {
  constructor() {
    this._passAmilisecondHandler = () => {};
    this._passAsecondHandler = () => {};
    this._passAminuteHandler = () => {};
    this._passAnHourHandler = () => {};
  }

  set passAmilisecondsHandler(value) {
    this._passAmilisecondHandler = value;
  }

  get passAmilisecondsHandler() {
    return this._passAmilisecondHandler;
  }

  set passAsecondHandler(value) {
    this._passAsecondHandler = value;
  }

  get passAsecondHandler() {
    return this._passAsecondHandler;
  }

  set passAminuteHandler(value) {
    this._passAminuteHandler = value;
  }

  get passAminuteHandler() {
    return this._passAminuteHandler;
  }

  set passAnHourHandler(value) {
    this._passAnHourHandler = value;
  }

  get passAnHourHandler() {
    return this._passAnHourHandler;
  }
}
