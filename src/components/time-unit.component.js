import { Component } from "./component";

export class TimeUnitComponent extends Component {
  constructor(
    props = {
      time: "",
      class: "",
      abbr: { title: "", children: "", class: "" },
    }
  ) {
    super(props);
  }

  set time(value) {
    this._time.innerText = value;
  }

  render() {
    this._time = this.createElement(
      "span",
      { class: this._props.class },
      this._props.time
    );
    return this.createElement(
      "span",
      { class: "stopwatch__time" },
      this._time,
      this.createElement(
        "abbr",
        { title: this._props.abbr.title, class: this._props.abbr.class },
        this._props.abbr.children
      )
    );
  }
}
