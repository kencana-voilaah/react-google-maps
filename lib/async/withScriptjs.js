"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = withScriptjs;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _canUseDom = require("can-use-dom");

var _canUseDom2 = _interopRequireDefault(_canUseDom);

var _reactDisplayName = require("react-display-name");

var _reactDisplayName2 = _interopRequireDefault(_reactDisplayName);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOAIDNG_STATE_NONE = "NONE";
var LOAIDNG_STATE_BEGIN = "BEGIN";
var LOAIDNG_STATE_LOADED = "LOADED";

function withScriptjs(WrappedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Container, _Component);

    function Container() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Container);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        loadingState: LOAIDNG_STATE_NONE
      }, _this.isUnmounted = false, _this.handleLoaded = _this.handleLoaded.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Container, [{
      key: "handleLoaded",
      value: function handleLoaded() {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          loadingState: LOAIDNG_STATE_LOADED
        });
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _props = this.props,
            loadingElement = _props.loadingElement,
            googleMapURL = _props.googleMapURL;

        (0, _invariant2.default)(!!loadingElement && !!googleMapURL, "Required props loadingElement or googleMapURL is missing. You need to provide both of them.");
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var loadingState = this.state.loadingState;

        if (loadingState !== LOAIDNG_STATE_NONE || !_canUseDom2.default) {
          return;
        }
        this.setState({
          loadingState: LOAIDNG_STATE_BEGIN
        });
        // Don't load scriptjs as dependency since we want this module be used on server side.
        // eslint-disable-next-line global-require
        var scriptjs = require("scriptjs");
        var googleMapURL = this.props.googleMapURL;

        scriptjs(googleMapURL, this.handleLoaded);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.isUnmounted = true;
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            loadingElement = _props2.loadingElement,
            googleMapURL = _props2.googleMapURL,
            restProps = (0, _objectWithoutProperties3.default)(_props2, ["loadingElement", "googleMapURL"]);
        var loadingState = this.state.loadingState;


        if (loadingState === LOAIDNG_STATE_LOADED) {
          return _react2.default.createElement(WrappedComponent, restProps);
        } else {
          return loadingElement;
        }
      }
    }]);
    return Container;
  }(_react.Component), _class.displayName = "withScriptjs(" + (0, _reactDisplayName2.default)(WrappedComponent) + ")", _class.propTypes = {
    loadingElement: _react.PropTypes.node.isRequired,
    googleMapURL: _react.PropTypes.string.isRequired
  }, _temp2;
}