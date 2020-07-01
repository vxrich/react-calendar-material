"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
var TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.selectedConstructor = _this.props.onDateRangePicked ? [TODAY, TOMORROW] : [TODAY, TODAY];

    _this.state = {
      current: new Date(),
      selected: _this.selectedConstructor,
      inMidOfSelection: false,

      ldom: 30
    };

    _this.config = _constants.language[_this.props.lang];
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
      var _this2 = this;

      var d = new Date(this.state.current.getTime());
      d.setMonth(d.getMonth() + month);
      d.setDate(day);
      this.props.onDatePicked(d[0]);

      var dCurr = this.props.onDateRangePicked ? this.state.current : d;

      if (this.props.onDateRangePicked && this.state.inMidOfSelection) {
        this.setState({
          selected: this.state.selected[0].getDate() + this.state.selected[0].getMonth() * 100 > d.getDate() + d.getMonth() * 100 ? [d, this.state.selected[0]] : [this.state.selected[0], d],
          inMidOfSelection: false
        }, function () {
          _this2.props.onDateRangePicked(_this2.state.selected);
        });
      } else {
        this.setState({
          current: dCurr,
          selected: [d, d],
          inMidOfSelection: true
        });
      }
    }
  }, {
    key: "renderDay",
    value: function renderDay() {
      var _this3 = this;

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
      if (opts.selected[0]) {
        selected = "selected first";
        selectedStyle = {
          backgroundColor: this.props.accentColor
        };
        containerStyle = {
          color: "#ffffff"
        };
      }
      if (opts.selected[1]) {
        selected = "selected second";
        selectedStyle = {
          backgroundColor: this.props.accentColor
        };
        containerStyle = {
          color: "#ffffff"
        };
      }
      if (opts.selected[0] && opts.selected[1]) {
        selected = "selected";
        selectedStyle = {
          backgroundColor: this.props.accentColor
        };
        containerStyle = {
          color: "#ffffff"
        };
      }

      if (opts.inrange) {
        selected = "selected inrange";
        selectedStyle = {
          backgroundColor: this.props.accentColor
        };
        containerStyle = {
          color: "#ffffff"
        };
      }

      baseClasses += opts.current ? " " : " non-current";

      return _react2.default.createElement(
        "div",
        {
          key: opts.key,
          className: baseClasses,
          style: selected ? _extends({}, containerStyle, { opacity: 1 }) : containerStyle
        },
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
              _this3._onDatePicked(opts.month, day);
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

        var sel1 = new Date(this.state.selected[0].getTime());
        var isSelectedOne = sel1.getFullYear() === copy.getFullYear() && sel1.getDate() === copy.getDate() && sel1.getMonth() === copy.getMonth();

        var sel2 = new Date(this.state.selected[1].getTime());
        var isSelectedTwo = sel2.getFullYear() === copy.getFullYear() && sel2.getDate() === copy.getDate() && sel2.getMonth() === copy.getMonth();

        var isToday = TODAY.getFullYear() === copy.getFullYear() && TODAY.getDate() === copy.getDate() && TODAY.getMonth() === copy.getMonth();

        var inRange = copy.getDate() + copy.getMonth() * 100 > sel1.getDate() + sel1.getMonth() * 100 && copy.getDate() + copy.getMonth() * 100 < sel2.getDate() + sel2.getMonth() * 100;

        days.push(this.renderDay({
          today: isToday,
          selected: [isSelectedOne, isSelectedTwo],
          current: inMonth,
          month: inMonth ? 0 : lastMonth ? -1 : 1,
          date: copy,
          inrange: inRange,
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
      var _this4 = this;

      // get su-sat header
      var header = this.renderHeaders();

      // copy our current time state
      var copy = new Date(this.state.current.getTime());

      // get the month days
      var days = this.renderDays(copy);

      var tMonth = this.config.months[this.state.selected[0].getMonth()];
      var tDate = this.state.selected[0].getDate();
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
                _this4.props.onChangeMonth(-1);
                _this4.updateMonth(-1);
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
                _this4.props.onChangeMonth(1);
                _this4.updateMonth(1);
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: "footer " + (this.props.border ? "footer-border" : ""),
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
  eventsBool: _propTypes2.default.array,
  border: _propTypes2.default.bool
};

Calendar.defaultProps = {
  accentColor: "#00C1A6",
  onDatePicked: function onDatePicked() {},
  showHeader: true,
  orientation: "flex-col",
  lang: "eng",
  eventsBool: [],
  onChangeMonth: function onChangeMonth() {},
  border: false
};

exports.default = Calendar;