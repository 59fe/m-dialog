'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require("./index.less");
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _getTransitionEnd = require('m-base/js/getTransitionEnd');

var _getTransitionEnd2 = _interopRequireDefault(_getTransitionEnd);

var _maskM = require('m-mask');

var _maskM2 = _interopRequireDefault(_maskM);

var _util = require('m-base/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function noop() {
    return true;
}

var con = document.createElement('div'),
    conid = '_dialog_container_' + _util2.default.createRandomStamp();
con.id = conid;
document.body.appendChild(con);

var Dialog = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    function Dialog(props) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            visible: true,
            dialogMarginTop: 0,
            transitionStart: false
        };
        return _this;
    }

    // 对外暴露该方法，给用户调用
    Dialog.prototype.destroy = function() {
        this.setState({
            visible: false
        });
        this.unmountDialog();
    }
    Dialog.prototype._onCancel = function onCancel(e) {
        this.props.onCancel.call(this);
        this.destroy();
    };

    Dialog.prototype._onOk = function onOk(e) {
        // 点击确定按钮的回调函数，返回true或undefined则关闭对话框，返回false则不执行任何操作
        var needUnmount = this.props.onOk.call(this);
        if (needUnmount !== false) {
            this.destroy();
        }
    };

    Dialog.prototype.unmountDialog = function unmountDialog(callback) {
        var dialog = _reactDom2.default.findDOMNode(this.refs.dialog),
            comp = this;
        dialog && dialog.addEventListener(_getTransitionEnd2.default, function () {
            _reactDom2.default.unmountComponentAtNode(document.getElementById(conid));
            callback && callback.call(comp);
        });
    };

    Dialog.prototype.componentDidMount = function componentDidMount() {
        var comp = this;
        var dialog = _reactDom2.default.findDOMNode(this.refs.dialog);
        dialog && setTimeout(function () {
            comp.setState({
                dialogMarginTop: -Math.round(dialog.clientHeight / 2) + 'px',
                transitionStart: true
            });
        }, 0);
    };

    Dialog.prototype.render = function render() {
        var state = this.state,
            props = this.props;

        var wrapStyle = {
            height: window.innerHeight
        };
        var dialogCls = (0, _classnames2.default)('dialog', {
            "dialog-in": state.transitionStart && state.visible,
            "dialog-out": state.transitionStart && !state.visible
        });
        var dialogOverlayCls = (0, _classnames2.default)({
            "dialog-overlay-visible": state.transitionStart && state.visible
        });

        var okBtnCls = (0, _classnames2.default)('dialog-button', props.okBtnClass);

        var dialogStyle = {
            marginTop: state.dialogMarginTop
        };
        var getConentHtml = function getConentHtml() {
            return { __html: props.content };
        };
        return _react2.default.createElement(
            'div',
            { className: 'dialog-wrap ' + (props.className || ''), style: wrapStyle },
            _react2.default.createElement(_maskM2.default, { className: dialogOverlayCls }),
            _react2.default.createElement(
                'div',
                { ref: 'dialog', className: dialogCls, style: dialogStyle },
                props.withCloseIcon ? _react2.default.createElement(
                    'b',
                    { onClick: this._onCancel.bind(this) },
                    _react2.default.createElement('i', null, String.fromCharCode(215))
                ) : false,
                _react2.default.createElement(
                    'div',
                    { className: 'dialog-inner' },
                    props.title ? _react2.default.createElement(
                        'div',
                        { className: 'dialog-title' },
                        props.title
                    ) : false,
                    _react2.default.createElement('div', { className: 'dialog-text', dangerouslySetInnerHTML: getConentHtml() })
                ),
                props.hasFoot ? _react2.default.createElement(
                    'div',
                    { className: 'dialog-buttons ' },
                    props.confirm ? _react2.default.createElement(
                        'span',
                        { className: 'dialog-button', onClick: this._onCancel.bind(this) },
                        props.cancelText
                    ) : false,
                    _react2.default.createElement(
                        'span',
                        { className: okBtnCls, onClick: this._onOk.bind(this) },
                        props.okText
                    )
                ) : false
            )
        );
    };

    return Dialog;
}(_react2.default.Component);

Dialog.confirm = function (opt) {
    return _reactDom2.default.render(_react2.default.createElement(Dialog, _extends({ okBtnClass: 'btn-primary' }, opt, { confirm: true })), con);
};
Dialog.alert = function (opt) {
    return _reactDom2.default.render(_react2.default.createElement(Dialog, _extends({ okBtnClass: '' }, opt)), con);
};
Dialog.defaultProps = {
    onOk: noop,
    onCancel: noop,
    okText: '确定',
    cancelText: '取消',
    withCloseIcon: false,
    hasFoot: true,
    title: '',
    content: ''
};

Dialog.propTypes = {
    title: _react.PropTypes.string,
    content: _react.PropTypes.string.isRequired,
    withCloseIcon: _react.PropTypes.bool,
    hasFoot: _react.PropTypes.bool,
    okBtnClass: _react.PropTypes.string,
    okText: _react.PropTypes.string,
    cancelText: _react.PropTypes.string,
    onOk: _react.PropTypes.func
};
exports.default = Dialog;
module.exports = exports['default'];
