'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/28/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var identity = function identity(arg1) {
    return arg1;
};

var getUniqueId = function () {
    var counter = 1000;
    return function () {
        return '' + ++counter;
    };
}();

var connectToStore = function connectToStore(Component, stores) {
    var ComponentWrapper = function (_React$Component) {
        _inherits(ComponentWrapper, _React$Component);

        function ComponentWrapper(props) {
            _classCallCheck(this, ComponentWrapper);

            var _this = _possibleConstructorReturn(this, (ComponentWrapper.__proto__ || Object.getPrototypeOf(ComponentWrapper)).call(this, props));

            _this.state = {};
            return _this;
        }

        _createClass(ComponentWrapper, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                var self = this;
                this.unsubscribeStore = [];
                _lodash2.default.each(stores, function (item) {
                    var stateName = item.stateName,
                        _item$event = item.event,
                        event = _item$event === undefined ? 'change' : _item$event,
                        store = item.store,
                        _item$parser = item.parser,
                        parser = _item$parser === undefined ? identity : _item$parser;

                    _this2.unsubscribeStore.push(store.on(event, function (args) {
                        self.setState({ stateName: parser(args) });
                    }));
                });
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.unsubscribeStore) {
                    _lodash2.default.each(this.unsubscribeStore, function (unsubscribe) {
                        return unsubscribe();
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Component, _extends({}, this.props, this.state));
            }
        }]);

        return ComponentWrapper;
    }(_react2.default.Component);

    return ComponentWrapper;
};

var cloneChildren = function cloneChildren(children, props) {
    if (children.map) {
        return children.map(function (child, index) {
            var key = props.key;
            if (key === undefined) {
                key = index;
            }
            return _react2.default.cloneElement(child, _extends({}, props, { key: key }));
        });
    } else {
        return _react2.default.cloneElement(children, _extends({}, props));
    }
};

exports.default = { identity: identity, cloneChildren: cloneChildren, connectToStore: connectToStore, getUniqueId: getUniqueId };