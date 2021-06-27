import { StopwatchTimeHandlers } from "./stopwatch-time-handlers";

export class Stopwatch {
  constructor(
    stopwatchTimeHandlers = new StopwatchTimeHandlers(),
    time = { miliseconds: 0, seconds: 0, minutes: 0, hours: 0 }
  ) {
    this._MILISECONDS_IN_ONE_SECOND = 1000;
    this._SECONDS_IN_A_MINUTE = 60;
    this._MINUTES_IN_AN_HOUR = 60;

    this._stopwatchTimeHandlers = stopwatchTimeHandlers;

    this._time = time;
    this._laps = new Array();
  }

  _passAmilisecondHandler = () => {
    if (!this._startDate) {
      throw new Error();
    }
    const milisecondsPassed = Date.now() - this._startDate;
    this._time.miliseconds = this._time.miliseconds + milisecondsPassed;
    this._startDate = Date.now();
    if (this._time.miliseconds >= this._MILISECONDS_IN_ONE_SECOND) {
      this._passAsecondHandler();
      this._time.miliseconds = 0;
    }
    this._stopwatchTimeHandlers.passAmilisecondsHandler();
  };

  _passAsecondHandler = () => {
    this._time.seconds =
      this._time.seconds +
      this._time.miliseconds / this._MILISECONDS_IN_ONE_SECOND;
    if (this._time.seconds >= this._SECONDS_IN_A_MINUTE) {
      this._passAminuteHandler();
      this._time.seconds = 0;
    }
    this._stopwatchTimeHandlers.passAsecondHandler();
  };

  _passAminuteHandler = () => {
    this._time.minutes =
      this._time.minutes + this._time.seconds / this._SECONDS_IN_A_MINUTE;
    if (this._time.minutes >= this._MINUTES_IN_AN_HOUR) {
      this._passAnHourHandler();
      this._time.minutes = 0;
    }
    this._stopwatchTimeHandlers.passAminuteHandler();
  };

  _passAnHourHandler = () => {
    this._time.hours =
      this._time.hours + this._time.minutes / this._MINUTES_IN_AN_HOUR;
    this._stopwatchTimeHandlers.passAnHourHandler();
  };

  run() {
    this._startDate = Date.now();
    if (!this.tick) {
      this.tick = setInterval(this._passAmilisecondHandler, 0);
    }
  }

  reset() {
    if (this.tick) {
      clearInterval(this.tick);
    }
    this.tick = undefined;
    this._time.seconds = 0;
    this._time.minutes = 0;
    this._time.hours = 0;
    this._time.miliseconds = 0;
    this._laps = [];
  }

  stop() {
    if (this.tick) {
      clearInterval(this.tick);
    }
    this.tick = undefined;
  }

  split() {
    this._laps.push({
      hours: Math.floor(this._time.hours),
      miliseconds: Math.floor(this._time.miliseconds),
      minutes: Math.floor(this._time.minutes),
      seconds: Math.floor(this._time.seconds),
    });
  }

  get seconds() {
    return Math.floor(this._time.seconds);
  }

  get miliseconds() {
    return Math.floor(this._time.miliseconds);
  }

  get minutes() {
    return Math.floor(this._time.minutes);
  }

  get hours() {
    return Math.floor(this._time.hours);
  }

  get laps() {
    return this._laps;
  }
}
