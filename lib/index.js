"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

var _ic_back = require("./assets/ic_back.svg");

var _ic_back2 = _interopRequireDefault(_ic_back);

var _ic_forward = require("./assets/ic_forward.svg");

var _ic_forward2 = _interopRequireDefault(_ic_forward);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TODAY = new Date();

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    console.log("TODAY ==>", TODAY);
    _this.state = {
      current: new Date(),
      selected: TODAY,

      ldom: 30
    };

    _this.config = _constants.language[_this.props.lang];

    console.log("SONO NEL COSTRUTTORE ==>", TODAY, _this.state.current, _this.state.selected);
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updateMonth(0);
    }
  }, {
    key: "updateMonth",
    value: function updateMonth(add) {
      var d = this.state.current;
      d.setMonth(d.getMonth() + add);
      var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
      this.setState({
        current: d,
        ldom: eom
      });
    }
  }, {
    key: "_onDatePicked",
    value: function _onDatePicked(month, day) {
      var d = new Date(this.state.current.getTime());
      d.setMonth(d.getMonth() + month);
      d.setDate(day);
      this.props.onDatePicked(d);
      this.setState({
        current: d,
        selected: d
      });
    }
  }, {
    key: "renderDay",
    value: function renderDay() {
      var _this2 = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var baseClasses = "day noselect";
      var today = "";
      var todayStyle = {};
      var hasEvents = "";

      var containerStyle = {};
      if (opts.today) {
        today = "current";
        todayStyle = {
          borderColor: this.props.accentColor
        };
      }
      if (this.props.eventsBool[opts.date.getDate() - 1] && opts.current) {
        hasEvents = "hasEvents";
      }

      var selected = "";
      var selectedStyle = {};
      if (opts.selected) {
        selected = "selected";
        selectedStyle = {
          backgroundColor: this.props.accentColor
        };
        containerStyle = {
          color: "#ffffff"
        };
      }

      baseClasses += opts.current ? "" : " non-current";

      return _react2.default.createElement(
        "div",
        { key: opts.key, className: baseClasses, style: containerStyle },
        _react2.default.createElement("div", {
          className: today + " " + hasEvents,
          style: { borderColor: this.props.accentColor }
        }),
        _react2.default.createElement("div", { className: selected, style: selectedStyle }),
        _react2.default.createElement(
          "p",
          {
            onClick: function onClick(ev) {
              var day = ev.target.innerHTML;
              _this2._onDatePicked(opts.month, day);
            }
          },
          opts.date.getDate()
        )
      );
    }
  }, {
    key: "renderDays",
    value: function renderDays(copy) {
      var days = [];

      // set to beginning of month
      copy.setDate(1);

      // if we are missing no offset, include the previous week
      var offset = copy.getDay() === 0 ? 7 : copy.getDay();

      copy.setDate(-offset);

      var inMonth = false;
      var lastMonth = true;
      for (var i = 0; i < 42; i++) {
        // increase date
        copy.setDate(copy.getDate() + 1);

        // make sure we pass any previous month values
        if (i < 30 && copy.getDate() === 1) {
          inMonth = true;
          lastMonth = false;
        }
        // if we are seeing the '1' again, we have iterated over
        // the current month
        else if (i > 30 && copy.getDate() === 1) {
            inMonth = false;
          }

        var sel = new Date(this.state.selected.getTime());
        var isSelected = sel.getFullYear() === copy.getFullYear() && sel.getDate() === copy.getDate() && sel.getMonth() === copy.getMonth();

        var isToday = TODAY.getFullYear() === copy.getFullYear() && TODAY.getDate() === copy.getDate() && TODAY.getMonth() === copy.getMonth();

        days.push(this.renderDay({
          today: isToday,
          selected: isSelected,
          current: inMonth,
          month: inMonth ? 0 : lastMonth ? -1 : 1,
          date: copy,
          key: i
        }));
      }

      return days;
    }
  }, {
    key: "renderHeaders",
    value: function renderHeaders() {
      var header = [];

      for (var i = 0; i < this.config.week_subs.length; i++) {
        header.push(_react2.default.createElement(
          "p",
          { key: i, className: "day-headers noselect" },
          this.config.week_subs[i]
        ));
      }

      return header;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // get su-sat header
      var header = this.renderHeaders();

      // copy our current time state
      var copy = new Date(this.state.current.getTime());

      // get the month days
      var days = this.renderDays(copy);

      var tMonth = this.config.months[this.state.selected.getMonth()];
      var tDate = this.state.selected.getDate();
      var month = this.config.months[this.state.current.getMonth()];
      var year = this.state.current.getFullYear();
      var date = this.state.current.getDate();

      var upperDate = null;
      if (this.props.showHeader) {
        upperDate = _react2.default.createElement(
          "div",
          {
            className: "flex-2 header center",
            style: {
              backgroundColor: this.props.accentColor
            }
          },
          _react2.default.createElement(
            "p",
            { className: "header-month" },
            tMonth.toUpperCase()
          ),
          _react2.default.createElement(
            "p",
            { className: "header-day" },
            tDate
          )
        );
      }
      return _react2.default.createElement(
        "div",
        { className: this.props.orientation },
        upperDate,
        _react2.default.createElement(
          "div",
          { className: "padding" },
          _react2.default.createElement(
            "div",
            { className: "month" },
            _react2.default.createElement("img", {
              className: "month-arrow-left",
              src: _ic_back2.default,
              alt: "back",
              onClick: function onClick() {
                _this3.props.onChangeMonth(-1);
                _this3.updateMonth(-1);
              }
            }),
            _react2.default.createElement(
              "div",
              { className: "month-title" },
              _react2.default.createElement(
                "p",
                { style: { color: this.props.accentColor, fontWeight: "bold" } },
                month
              ),
              _react2.default.createElement(
                "span",
                { className: "month-year" },
                year
              )
            ),
            _react2.default.createElement("img", {
              className: "month-arrow-right",
              src: _ic_forward2.default,
              alt: "forward",
              onClick: function onClick() {
                _this3.props.onChangeMonth(1);
                _this3.updateMonth(1);
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: "footer",
              style: { borderColor: this.props.accentColor }
            },
            header,
            days
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  accentColor: _propTypes2.default.string,
  onDatePicked: _propTypes2.default.func,
  showHeader: _propTypes2.default.bool,
  orientation: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  onChangeMonth: _propTypes2.default.func,
  eventsBool: _propTypes2.default.array
};

Calendar.defaultProps = {
  accentColor: "#00C1A6",
  onDatePicked: function onDatePicked() {},
  showHeader: true,
  orientation: "flex-col",
  lang: "eng",
  eventsBool: [],
  onChangeMonth: function onChangeMonth() {}
};

exports.default = Calendar;