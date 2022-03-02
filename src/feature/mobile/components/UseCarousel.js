"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCarousel = void 0;
var react_1 = require("react");
var react_swipeable_1 = require("react-swipeable");
function previous(length, current) {
    return (current - 1 + length) % length;
}
function next(length, current) {
    return (current + 1) % length;
}
function threshold(target) {
    var width = target.clientWidth;
    return width / 3;
}
var transitionTime = 400;
var elastic = "transform ".concat(transitionTime, "ms cubic-bezier(0.68, -0.55, 0.265, 1.55)");
var smooth = "transform ".concat(transitionTime, "ms ease");
var initialCarouselState = {
    offset: 0,
    desired: 0,
    active: 0,
};
function carouselReducer(state, action) {
    switch (action.type) {
        case 'jump':
            return __assign(__assign({}, state), { desired: action.desired });
        case 'next':
            return __assign(__assign({}, state), { desired: next(action.length, state.active) });
        case 'prev':
            return __assign(__assign({}, state), { desired: previous(action.length, state.active) });
        case 'done':
            return __assign(__assign({}, state), { offset: NaN, active: state.desired });
        case 'drag':
            return __assign(__assign({}, state), { offset: action.offset });
        default:
            return state;
    }
}
function swiped(e, dispatch, length, dir) {
    var t = threshold(e.event.target);
    var d = dir * e.deltaX;
    if (d >= t) {
        dispatch({
            type: dir > 0 ? 'next' : 'prev',
            length: length,
        });
    }
    else {
        dispatch({
            type: 'drag',
            offset: 0,
        });
    }
}
function useCarousel(length, interval) {
    var _a = (0, react_1.useReducer)(carouselReducer, initialCarouselState), state = _a[0], dispatch = _a[1];
    var handlers = (0, react_swipeable_1.useSwipeable)({
        onSwiping: function (e) {
            dispatch({
                type: 'drag',
                offset: -e.deltaX,
            });
        },
        onSwipedLeft: function (e) {
            swiped(e, dispatch, length, 1);
        },
        onSwipedRight: function (e) {
            swiped(e, dispatch, length, -1);
        },
        trackMouse: true,
        trackTouch: true,
    });
    (0, react_1.useEffect)(function () {
        var id = setTimeout(function () { return dispatch({ type: 'next', length: length }); }, interval);
        return function () { return clearTimeout(id); };
    }, [state.offset, state.active]);
    (0, react_1.useEffect)(function () {
        var id = setTimeout(function () { return dispatch({ type: 'done' }); }, transitionTime);
        return function () { return clearTimeout(id); };
    }, [state.desired]);
    var style = {
        transform: 'translateX(0)',
        width: "".concat(100 * (length + 2), "%"),
        left: "-".concat((state.active + 1) * 100, "%"),
    };
    if (state.desired !== state.active) {
        var dist = Math.abs(state.active - state.desired);
        var pref = Math.sign(state.offset || 0);
        var dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active);
        var shift = (100 * (pref || dir)) / (length + 2);
        style.transition = smooth;
        style.transform = "translateX(".concat(shift, "%)");
    }
    else if (!isNaN(state.offset)) {
        if (state.offset !== 0) {
            style.transform = "translateX(".concat(state.offset, "px)");
        }
        else {
            style.transition = elastic;
        }
    }
    return [state.active, function (n) { return dispatch({ type: 'jump', desired: n }); }, handlers, style];
}
exports.useCarousel = useCarousel;
