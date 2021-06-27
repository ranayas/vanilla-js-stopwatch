import "./main.style.css";
import { Component } from "./component";
import { TimeUnitComponent } from "./time-unit.component";
import { Stopwatch } from "./stopwatch";
import { StopwatchTimeHandlers } from "./stopwatch-time-handlers";

export class MainComponent extends Component {
  constructor() {
    super();
    const stopwatchTimeHandlers = new StopwatchTimeHandlers();

    this._stopwatch = new Stopwatch(stopwatchTimeHandlers);

    this._hours = new TimeUnitComponent({
      time: "00",
      abbr: { children: "hrs", title: "hours", class: "stopwatch__time-abbr" },
    });

    this._minutes = new TimeUnitComponent({
      time: "00",
      abbr: {
        children: "min",
        title: "minutes",
        class: "stopwatch__time-abbr",
      },
    });

    this._seconds = new TimeUnitComponent({
      time: "00",
      abbr: {
        children: "sec",
        title: "seconds",
        class: "stopwatch__time-abbr",
      },
    });

    this._miliseconds = new TimeUnitComponent({
      time: "000",
      class: "stopwatch__miliseconds",
      abbr: {
        children: "ms",
        title: "miliseconds",
        class: "stopwatch__time-abbr",
      },
    });

    stopwatchTimeHandlers.passAmilisecondsHandler = () => {
      this._miliseconds.time = this._formatStopwatchMiliseconds();
    };

    stopwatchTimeHandlers.passAsecondHandler = () => {
      this._seconds.time = this._formatStopwatchSeconds();
    };

    stopwatchTimeHandlers.passAminuteHandler = () => {
      this._minutes.time = this._formatStopwatchMinutes();
    };

    stopwatchTimeHandlers.passAnHourHandler = () => {
      this._hours.time = this._formatStopwatchHours();
    };

    this._startButton = this.createElement(
      "button",
      { class: "button", onclick: this._handleStartButtonClick },
      "start"
    );

    this._buttonContainerContent = this.createElement(
      "div",
      {
        class: "buttons-container",
      },
      this._startButton
    );

    this._firstButton = this.createElement("button", {
      class: "button",
    });

    this._secondButton = this.createElement("button", {
      class: "button",
    });

    this._tableLaps = "";

    this._tableBody = this.createElement("tbody", null);
  }

  _formatStopwatchMiliseconds = () =>
    `00${this._stopwatch.miliseconds}`.substr(-3);

  _formatStopwatchSeconds = () => `0${this._stopwatch.seconds}`.substr(-2);

  _formatStopwatchMinutes = () => `0${this._stopwatch.minutes}`.substr(-2);

  _formatStopwatchHours = () => {
    if (this._hours.time < 10) {
      return `0${this._stopwatch.hours}`.substr(-2);
    } else {
      return `0${this._stopwatch.hours}`.substr(-2);
    }
  };

  _formatStopwatchTime = () =>
    `${this._formatStopwatchHours()}:${this._formatStopwatchMinutes()}:${this._formatStopwatchSeconds()}:${this._formatStopwatchMiliseconds()}`;

  _handleSplitButtonClick = () => {
    this._stopwatch.split();
    if (!this._tableLapsContainer) {
      this._tableLaps = this.createElement(
        "table",
        { class: "table" },
        this._tableBody
      );
      this._tableLapsContainer = this.createElement(
        "div",
        { class: "table-container" },
        this._tableLaps
      );
      this._view.appendChild(this._tableLapsContainer);
    }
    this._tableBody.appendChild(
      this.createElement(
        "tr",
        { class: "table__row" },
        this.createElement(
          "td",
          { class: "table__data" },
          this._stopwatch.laps.length
        ),
        this.createElement(
          "td",
          { class: "table__data" },
          this._formatStopwatchTime()
        )
      )
    );
  };

  _handleResetButtonClick = () => {
    this._stopwatch.reset();
    this._hours.time = "00";
    this._minutes.time = "00";
    this._seconds.time = "00";
    this._miliseconds.time = "000";
    this._buttonContainerContent.innerHTML = "";
    this._buttonContainerContent.appendChild(this._startButton);
    this._view.removeChild(this._tableLapsContainer);
    this._tableLapsContainer = "";
    this._tableBody.innerHTML = "";
  };

  _handleStopButtonClick = () => {
    this._stopwatch.stop();

    this._firstButton.innerText = "resume";
    this._firstButton.onclick = () => {
      this._stopwatch.run();
      this._firstButton.innerText = "stop";
      this._firstButton.onclick = this._handleStopButtonClick;
      this._secondButton.innerText = "split";
      this._secondButton.onclick = this._handleSplitButtonClick;
    };

    this._secondButton.innerText = "reset";
    this._secondButton.onclick = this._handleResetButtonClick;
  };

  _handleStartButtonClick = () => {
    this._stopwatch.run();
    this._buttonContainerContent.innerHTML = "";
    this._firstButton.innerText = "stop";
    this._firstButton.onclick = this._handleStopButtonClick;
    this._secondButton.onclick = this._handleSplitButtonClick;
    this._secondButton.innerText = "split";
    this._buttonContainerContent.appendChild(
      this.createElement(
        "div",
        { class: "buttons-grid" },
        this._firstButton,
        this._secondButton
      )
    );
  };

  render() {
    this._view = this.createElement(
      "div",
      { class: "container" },
      this.createElement(
        "time",
        { class: "stopwatch" },
        this._hours.render(),
        ":",
        this._minutes.render(),
        ":",
        this._seconds.render(),
        ":",
        this._miliseconds.render()
      ),
      this._buttonContainerContent
    );

    return this._view;
  }
}
