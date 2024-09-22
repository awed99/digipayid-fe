(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.development.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.development.esm.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCache)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/@emotion/cache/node_modules/stylis/index.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "@emotion/weak-memoize");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "@emotion/memoize");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__);





var isBrowser = typeof document !== 'undefined';

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = !!element.parent; // in nested rules comments become children of the "auto-inserted" rule and that's always the `element.parent`
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? element.parent.children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.hash)(value, length)) {
    // color-adjust
    case 5103:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MOZ + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + value + value;
    // order

    case 6165:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(\w+).+(:[^]+)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + 'box-$1$2' + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'flex-item-' + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'flex-line-pack' + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + 'box-' + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, '-grow', '') + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /([^-])(transform)/g, '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(zoom-|grab)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$1'), /(image-set)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(image-set\([^]*)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(.+:)(flex-)?(.*)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + 'box-pack:$3' + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(.+)-inline(.+)/, stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.strlen)(value) - 1 - length > 6) switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$2-$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.MOZ + ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~(0,stylis__WEBPACK_IMPORTED_MODULE_3__.indexof)(value, 'stretch') ? prefix((0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, (0,stylis__WEBPACK_IMPORTED_MODULE_3__.strlen)(value) - 3 - (~(0,stylis__WEBPACK_IMPORTED_MODULE_3__.indexof)(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, ':', ':' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + '$2$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.charat)(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_3__.MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis__WEBPACK_IMPORTED_MODULE_3__.DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case stylis__WEBPACK_IMPORTED_MODULE_3__.KEYFRAMES:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
        value: (0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(element.value, '@', '@' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT)
      })], callback);

    case stylis__WEBPACK_IMPORTED_MODULE_3__.RULESET:
      if (element.length) return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.combine)(element.props, function (value) {
        switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.match)(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /:(read-\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_3__.MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_3__.WEBKIT + 'input-$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_3__.MOZ + '$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_3__.replace)(value, /:(plac\w+)/, stylis__WEBPACK_IMPORTED_MODULE_3__.MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

/* import type { StylisPlugin } from './types' */

/*
export type Options = {
  nonce?: string,
  stylisPlugins?: StylisPlugin[],
  key: string,
  container?: HTMLElement,
  speedy?: boolean,
  prepend?: boolean,
  insertionPoint?: HTMLElement
}
*/

var getServerStylisCache = isBrowser ? undefined : _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  return _emotion_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function
  /*: EmotionCache */
createCache(options
/*: Options */
) {
  var key = options.key;

  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (isBrowser && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node
    /*: HTMLStyleElement */
    ) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  {
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  /* : Node */

  var nodesToHydrate = [];

  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node
    /*: HTMLStyleElement */
    ) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;
  /*: (
  selector: string,
  serialized: SerializedStyles,
  sheet: StyleSheet,
  shouldCache: boolean
  ) => string | void */


  var omnipresentPlugins = [compat, removeLabel];

  {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  if (isBrowser) {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_3__.stringify, function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_3__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } ];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.compile)(styles), serializer);
    };

    _insert = function
      /*: void */
    insert(selector
    /*: string */
    , serialized
    /*: SerializedStyles */
    , sheet
    /*: StyleSheet */
    , shouldCache
    /*: boolean */
    ) {
      currentSheet = sheet;

      if (serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule
          /*: string */
          ) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_3__.stringify];

    var _serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.middleware)(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.compile)(styles), _serializer);
    };

    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function
      /*: string */
    getRules(selector
    /*: string */
    , serialized
    /*: SerializedStyles */
    ) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function
      /*: string | void */
    _insert(selector
    /*: string */
    , serialized
    /*: SerializedStyles */
    , sheet
    /*: StyleSheet */
    , shouldCache
    /*: boolean */
    ) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if (serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache
  /*: EmotionCache */
  = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
var isDevelopment = true;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }

      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./src/pages/_document.js":
/*!********************************!*\
  !*** ./src/pages/_document.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ "@sentry/nextjs");
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ "./node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/server/create-instance */ "@emotion/server/create-instance");
/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_core_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/@core/utils/create-emotion-cache */ "./src/@core/utils/create-emotion-cache.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);







var _jsxFileName = "C:\\kerjaan\\dewa\\digipay\\src\\pages\\_document.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CustomDocument extends (next_document__WEBPACK_IMPORTED_MODULE_2___default()) {
  render() {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {
      lang: "en",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("link", {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 18,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("link", {
          rel: "preconnect",
          href: "https://fonts.gstatic.com"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("link", {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("link", {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/logo.png"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("link", {
          rel: "shortcut icon",
          href: "/images/logo.png"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("body", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, this);
  }

}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage;
  const cache = (0,src_core_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_4__.createEmotionCache)();
  const {
    extractCriticalToChunks
  } = _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default()(cache);

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => props => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(App, _objectSpread(_objectSpread({}, props), {}, {
      // @ts-ignore
      emotionCache: cache
    }), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }, undefined)
  });

  const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("style", {
      dangerouslySetInnerHTML: {
        __html: style.css
      },
      "data-emotion": `${style.key} ${style.ids.join(' ')}`
    }, style.key, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, undefined);
  });
  return _objectSpread(_objectSpread({}, initialProps), {}, {
    styles: [...react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(initialProps.styles), ...emotionStyleTags]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: CustomDocument
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */


const userPageModule = serverComponentModule ;

const pageComponent = userPageModule ? userPageModule.default : undefined;

const origGetInitialProps = pageComponent ? pageComponent.getInitialProps : undefined;
const origGetStaticProps = userPageModule ? userPageModule.getStaticProps : undefined;
const origGetServerSideProps = userPageModule ? userPageModule.getServerSideProps : undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = {
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapErrorGetInitialPropsWithSentry,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/_document'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/_document')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/_document')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ }),

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM({
  type,
  props
}) {
  const el = document.createElement(type);

  for (const p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const {
    children,
    dangerouslySetInnerHTML
  } = props;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  const headCount = Number(headCountEl.content);
  const oldTags = [];

  for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  const newTags = components.map(reactElementToDOM).filter(newTag => {
    for (let k = 0, len = oldTags.length; k < len; k++) {
      const oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(t => t.parentNode.removeChild(t));
  newTags.forEach(t => headEl.insertBefore(t, headCountEl));
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  let updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: head => {
      const promise = updatePromise = Promise.resolve().then(() => {
        if (promise !== updatePromise) return;
        updatePromise = null;
        const tags = {};
        head.forEach(h => {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          const components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        const titleComponent = tags.title ? tags.title[0] : null;
        let title = '';

        if (titleComponent) {
          const {
            children
          } = titleComponent.props;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(type => {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../shared/lib/head-manager-context */ "../shared/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

const loadScript = props => {
  const {
    src,
    id,
    onLoad = () => {},
    dangerouslySetInnerHTML,
    children = '',
    strategy = 'afterInteractive',
    onError
  } = props;
  const cacheKey = id || src; // Script has already loaded

  if (cacheKey && LoadCache.has(cacheKey)) {
    return;
  } // Contents of this script are already loading/loaded


  if (ScriptCache.has(src)) {
    LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

    ScriptCache.get(src).then(onLoad, onError);
    return;
  }

  const el = document.createElement('script');
  const loadPromise = new Promise((resolve, reject) => {
    el.addEventListener('load', function (e) {
      resolve();

      if (onLoad) {
        onLoad.call(this, e);
      }
    });
    el.addEventListener('error', function (e) {
      reject(e);
    });
  }).catch(function (e) {
    if (onError) {
      onError(e);
    }
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
  }

  LoadCache.add(cacheKey);

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  el.setAttribute('data-nscript', strategy);
  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  const {
    strategy = 'afterInteractive'
  } = props;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
  } else {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  const {
    src = '',
    onLoad = () => {},
    dangerouslySetInnerHTML,
    strategy = 'afterInteractive',
    onError
  } = props,
        restProps = _objectWithoutProperties(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR


  const {
    updateScripts,
    scripts,
    getIsSsr
  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
  (0, _react).useEffect(() => {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([_objectSpread({
        src,
        onLoad,
        onError
      }, restProps)]);
      updateScripts(scripts);
    } else if (getIsSsr && getIsSsr()) {
      // Script has already loaded during SSR
      LoadCache.add(restProps.id || src);
    } else if (getIsSsr && !getIsSsr()) {
      loadScript(props);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const _excluded = ["strategy"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "DocumentContext", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentContext;
  }
}));
Object.defineProperty(exports, "DocumentInitialProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentInitialProps;
  }
}));
Object.defineProperty(exports, "DocumentProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentProps;
  }
}));
exports.Html = Html;
exports.Main = Main;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../shared/lib/constants */ "../shared/lib/constants");

var _utils = __webpack_require__(/*! ../shared/lib/utils */ "../shared/lib/utils");

var _getPageFiles = __webpack_require__(/*! ../server/get-page-files */ "../server/get-page-files");

var _utils1 = __webpack_require__(/*! ../server/utils */ "../server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "../server/htmlescape");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles).getPageFiles(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles).getPageFiles(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}

function getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  const {
    assetPrefix,
    buildManifest,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
    key: polyfill,
    defer: !disableOptimizedLoading,
    nonce: props.nonce,
    crossOrigin: props.crossOrigin || undefined,
    noModule: true,
    src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
  }));
}

function getPreNextScripts(context, props) {
  const {
    scriptLoader,
    disableOptimizedLoading
  } = context;
  return (scriptLoader.beforeInteractive || []).map((file, index) => {
    const {
      strategy
    } = file,
          scriptProps = _objectWithoutProperties(file, _excluded);

    return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, scriptProps, {
      key: scriptProps.src || index,
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      "data-nscript": "beforeInteractive",
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function getDynamicChunks(context, props, files) {
  const {
    dynamicImports,
    assetPrefix,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return dynamicImports.map(file => {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react.default.createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function getScripts(context, props, files) {
  var ref;
  const {
    assetPrefix,
    buildManifest,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
  const lowPriorityScripts = (ref = buildManifest.lowPriorityFiles) === null || ref === void 0 ? void 0 : ref.filter(file => file.endsWith('.js'));
  return [...normalScripts, ...lowPriorityScripts].map(file => {
    return /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

class Document1 extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, Object.assign({}, props));
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server).default()];
    return {
      html,
      head,
      styles
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document1;

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react).useContext(_utils.HtmlContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = Array.from(new Set(dynamicImports.filter(file => file.endsWith('.css'))));

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dynamicImports.map(file => {
      if (!file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: file,
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.beforeInteractive || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  handleDocumentScriptLoaderItems(children) {
    const {
      scriptLoader
    } = this.context;
    const scriptLoaderItems = [];
    const filteredChildren = [];

    _react.default.Children.forEach(children, child => {
      if (child.type === _script.default) {
        if (child.props.strategy === 'beforeInteractive') {
          scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
          return;
        } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
          scriptLoaderItems.push(child.props);
          return;
        }
      }

      filteredChildren.push(child);
    });

    this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
    return filteredChildren;
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(({
        url
      }) => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = _react.default.Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


    if (true) {
      children = _react.default.Children.map(children, child => {
        var ref;
        const isReactHelmet = child === null || child === void 0 ? void 0 : (ref = child.props) === null || ref === void 0 ? void 0 : ref['data-react-helmet'];

        if (!isReactHelmet) {
          var ref1;

          if ((child === null || child === void 0 ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
          } else if ((child === null || child === void 0 ? void 0 : child.type) === 'meta' && (child === null || child === void 0 ? void 0 : (ref1 = child.props) === null || ref1 === void 0 ? void 0 : ref1.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    if (false) {}

    children = this.handleDocumentScriptLoaderItems(children);
    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var ref2, ref3;
        return el === null || el === void 0 ? void 0 : (ref2 = el.props) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.dangerouslySetInnerHTML) === null || ref3 === void 0 ? void 0 : ref3.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);

    var _nonce, _nonce1;

    return /*#__PURE__*/_react.default.createElement("head", Object.assign({}, this.props), this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils1).cleanAmpPath(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_nonce = this.props.nonce) !== null && _nonce !== void 0 ? _nonce : ''
    }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment && // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)

    /*#__PURE__*/
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _utils.HtmlContext;

function Main() {
  const {
    inAmpMode,
    docComponentsRendered
  } = (0, _react).useContext(_utils.HtmlContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.BODY_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next"
  }, _constants.BODY_RENDER_TARGET);
}

class NextScript extends _react.Component {
  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  static getInlineScriptSource(context) {
    const {
      __NEXT_DATA__
    } = context;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape).htmlEscapeJsonString(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _utils.HtmlContext;
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "./src/@core/utils/create-emotion-cache.js":
/*!*************************************************!*\
  !*** ./src/@core/utils/create-emotion-cache.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEmotionCache": () => (/* binding */ createEmotionCache)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.development.esm.js");

const createEmotionCache = () => {
  return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__.default)({
    key: 'css'
  });
};

/***/ }),

/***/ "./node_modules/next/document.js":
/*!***************************************!*\
  !*** ./node_modules/next/document.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "./node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "@emotion/memoize":
/*!***********************************!*\
  !*** external "@emotion/memoize" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/memoize");

/***/ }),

/***/ "@emotion/server/create-instance":
/*!**************************************************!*\
  !*** external "@emotion/server/create-instance" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/server/create-instance");

/***/ }),

/***/ "@emotion/weak-memoize":
/*!****************************************!*\
  !*** external "@emotion/weak-memoize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/weak-memoize");

/***/ }),

/***/ "@sentry/nextjs":
/*!*********************************!*\
  !*** external "@sentry/nextjs" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sentry/nextjs");

/***/ }),

/***/ "../server/get-page-files":
/*!*****************************************************!*\
  !*** external "next/dist/server/get-page-files.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ "../server/htmlescape":
/*!*************************************************!*\
  !*** external "next/dist/server/htmlescape.js" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ "../server/utils":
/*!********************************************!*\
  !*** external "next/dist/server/utils.js" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ "../shared/lib/constants":
/*!****************************************************!*\
  !*** external "next/dist/shared/lib/constants.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ "../shared/lib/head-manager-context":
/*!***************************************************************!*\
  !*** external "next/dist/shared/lib/head-manager-context.js" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-jsx/server");

/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Parser.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Prefixer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Serializer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Middleware.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);









/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   "LAYER": () => (/* binding */ LAYER)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "namespace": () => (/* binding */ namespace)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length, children)
					return
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset),
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "declaration": () => (/* binding */ declaration)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset: if (ampersand == -1) characters = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, /\f/g, '')
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// tab-size
		case 4789:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') + (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/) ? _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// justify-self
		case 4200:
			if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/)) return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-column-align' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-end/) })) {
				return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value + (children = children[length].value), 'span') ? value : (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-span:' + (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(children, 'span') ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) : +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) - +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /\d+/)) + ';')
			}
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-start/) })) ? value : _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + ':' + b + f) + (c ? (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 6) === 121)
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.LAYER: if (element.children.length) break
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "whitespace": () => (/* binding */ whitespace),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "escaping": () => (/* binding */ escaping),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "identifier": () => (/* binding */ identifier)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js":
/*!************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "combine": () => (/* binding */ combine)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_document.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ25CLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0RJR0lQQVlJRC8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9jYWNoZS9kaXN0L2Vtb3Rpb24tY2FjaGUuZGV2ZWxvcG1lbnQuZXNtLmpzIiwid2VicGFjazovL0RJR0lQQVlJRC8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zaGVldC9kaXN0L2Vtb3Rpb24tc2hlZXQuZGV2ZWxvcG1lbnQuZXNtLmpzIiwid2VicGFjazovL0RJR0lQQVlJRC9zcmMvcGFnZXMvX2RvY3VtZW50LmpzIiwid2VicGFjazovL0RJR0lQQVlJRC9zZW50cnktd3JhcHBlci1tb2R1bGUiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvaGVhZC1tYW5hZ2VyLmpzIiwid2VicGFjazovL0RJR0lQQVlJRC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JlcXVlc3QtaWRsZS1jYWxsYmFjay5qcyIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9wYWdlcy9fZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vc3JjL0Bjb3JlL3V0aWxzL2NyZWF0ZS1lbW90aW9uLWNhY2hlLmpzIiwid2VicGFjazovL0RJR0lQQVlJRC8uL25vZGVfbW9kdWxlcy9uZXh0L2RvY3VtZW50LmpzIiwid2VicGFjazovL0RJR0lQQVlJRC9leHRlcm5hbCBcIkBlbW90aW9uL21lbW9pemVcIiIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvZXh0ZXJuYWwgXCJAZW1vdGlvbi9zZXJ2ZXIvY3JlYXRlLWluc3RhbmNlXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwiQGVtb3Rpb24vd2Vhay1tZW1vaXplXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwiQHNlbnRyeS9uZXh0anNcIiIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9odG1sZXNjYXBlLmpzXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci91dGlscy5qc1wiIiwid2VicGFjazovL0RJR0lQQVlJRC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL2NvbnN0YW50cy5qc1wiIiwid2VicGFjazovL0RJR0lQQVlJRC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL2hlYWQtbWFuYWdlci1jb250ZXh0LmpzXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL0RJR0lQQVlJRC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL0RJR0lQQVlJRC9leHRlcm5hbCBcInN0eWxlZC1qc3gvc2VydmVyXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL0VudW0uanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL01pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL1BhcnNlci5qcyIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvUHJlZml4ZXIuanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL1NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vRElHSVBBWUlELy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvVXRpbGl0eS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZVNoZWV0IH0gZnJvbSAnQGVtb3Rpb24vc2hlZXQnO1xuaW1wb3J0IHsgZGVhbGxvYywgYWxsb2MsIG5leHQsIHRva2VuLCBmcm9tLCBwZWVrLCBkZWxpbWl0LCBzbGljZSwgcG9zaXRpb24sIFJVTEVTRVQsIGNvbWJpbmUsIG1hdGNoLCBzZXJpYWxpemUsIGNvcHksIHJlcGxhY2UsIFdFQktJVCwgTU9aLCBNUywgS0VZRlJBTUVTLCBERUNMQVJBVElPTiwgaGFzaCwgY2hhcmF0LCBzdHJsZW4sIGluZGV4b2YsIG1pZGRsZXdhcmUsIHN0cmluZ2lmeSwgQ09NTUVOVCwgY29tcGlsZSB9IGZyb20gJ3N0eWxpcyc7XG5pbXBvcnQgd2Vha01lbW9pemUgZnJvbSAnQGVtb3Rpb24vd2Vhay1tZW1vaXplJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ0BlbW90aW9uL21lbW9pemUnO1xuXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxudmFyIGlkZW50aWZpZXJXaXRoUG9pbnRUcmFja2luZyA9IGZ1bmN0aW9uIGlkZW50aWZpZXJXaXRoUG9pbnRUcmFja2luZyhiZWdpbiwgcG9pbnRzLCBpbmRleCkge1xuICB2YXIgcHJldmlvdXMgPSAwO1xuICB2YXIgY2hhcmFjdGVyID0gMDtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHByZXZpb3VzID0gY2hhcmFjdGVyO1xuICAgIGNoYXJhY3RlciA9IHBlZWsoKTsgLy8gJlxcZlxuXG4gICAgaWYgKHByZXZpb3VzID09PSAzOCAmJiBjaGFyYWN0ZXIgPT09IDEyKSB7XG4gICAgICBwb2ludHNbaW5kZXhdID0gMTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4oY2hhcmFjdGVyKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xuICB9XG5cbiAgcmV0dXJuIHNsaWNlKGJlZ2luLCBwb3NpdGlvbik7XG59O1xuXG52YXIgdG9SdWxlcyA9IGZ1bmN0aW9uIHRvUnVsZXMocGFyc2VkLCBwb2ludHMpIHtcbiAgLy8gcHJldGVuZCB3ZSd2ZSBzdGFydGVkIHdpdGggYSBjb21tYVxuICB2YXIgaW5kZXggPSAtMTtcbiAgdmFyIGNoYXJhY3RlciA9IDQ0O1xuXG4gIGRvIHtcbiAgICBzd2l0Y2ggKHRva2VuKGNoYXJhY3RlcikpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gJlxcZlxuICAgICAgICBpZiAoY2hhcmFjdGVyID09PSAzOCAmJiBwZWVrKCkgPT09IDEyKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBub3QgMTAwJSBjb3JyZWN0LCB3ZSBkb24ndCBhY2NvdW50IGZvciBsaXRlcmFsIHNlcXVlbmNlcyBoZXJlIC0gbGlrZSBmb3IgZXhhbXBsZSBxdW90ZWQgc3RyaW5nc1xuICAgICAgICAgIC8vIHN0eWxpcyBpbnNlcnRzIFxcZiBhZnRlciAmIHRvIGtub3cgd2hlbiAmIHdoZXJlIGl0IHNob3VsZCByZXBsYWNlIHRoaXMgc2VxdWVuY2Ugd2l0aCB0aGUgY29udGV4dCBzZWxlY3RvclxuICAgICAgICAgIC8vIGFuZCB3aGVuIGl0IHNob3VsZCBqdXN0IGNvbmNhdGVuYXRlIHRoZSBvdXRlciBhbmQgaW5uZXIgc2VsZWN0b3JzXG4gICAgICAgICAgLy8gaXQncyB2ZXJ5IHVubGlrZWx5IGZvciB0aGlzIHNlcXVlbmNlIHRvIGFjdHVhbGx5IGFwcGVhciBpbiBhIGRpZmZlcmVudCBjb250ZXh0LCBzbyB3ZSBqdXN0IGxldmVyYWdlIHRoaXMgZmFjdCBoZXJlXG4gICAgICAgICAgcG9pbnRzW2luZGV4XSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZWRbaW5kZXhdICs9IGlkZW50aWZpZXJXaXRoUG9pbnRUcmFja2luZyhwb3NpdGlvbiAtIDEsIHBvaW50cywgaW5kZXgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICBwYXJzZWRbaW5kZXhdICs9IGRlbGltaXQoY2hhcmFjdGVyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgLy8gY29tbWFcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gNDQpIHtcbiAgICAgICAgICAvLyBjb2xvblxuICAgICAgICAgIHBhcnNlZFsrK2luZGV4XSA9IHBlZWsoKSA9PT0gNTggPyAnJlxcZicgOiAnJztcbiAgICAgICAgICBwb2ludHNbaW5kZXhdID0gcGFyc2VkW2luZGV4XS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgLy8gZmFsbHRocm91Z2hcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGFyc2VkW2luZGV4XSArPSBmcm9tKGNoYXJhY3Rlcik7XG4gICAgfVxuICB9IHdoaWxlIChjaGFyYWN0ZXIgPSBuZXh0KCkpO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG52YXIgZ2V0UnVsZXMgPSBmdW5jdGlvbiBnZXRSdWxlcyh2YWx1ZSwgcG9pbnRzKSB7XG4gIHJldHVybiBkZWFsbG9jKHRvUnVsZXMoYWxsb2ModmFsdWUpLCBwb2ludHMpKTtcbn07IC8vIFdlYWtTZXQgd291bGQgYmUgbW9yZSBhcHByb3ByaWF0ZSwgYnV0IG9ubHkgV2Vha01hcCBpcyBzdXBwb3J0ZWQgaW4gSUUxMVxuXG5cbnZhciBmaXhlZEVsZW1lbnRzID0gLyogI19fUFVSRV9fICovbmV3IFdlYWtNYXAoKTtcbnZhciBjb21wYXQgPSBmdW5jdGlvbiBjb21wYXQoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC50eXBlICE9PSAncnVsZScgfHwgIWVsZW1lbnQucGFyZW50IHx8IC8vIHBvc2l0aXZlIC5sZW5ndGggaW5kaWNhdGVzIHRoYXQgdGhpcyBydWxlIGNvbnRhaW5zIHBzZXVkb1xuICAvLyBuZWdhdGl2ZSAubGVuZ3RoIGluZGljYXRlcyB0aGF0IHRoaXMgcnVsZSBoYXMgYmVlbiBhbHJlYWR5IHByZWZpeGVkXG4gIGVsZW1lbnQubGVuZ3RoIDwgMSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IGVsZW1lbnQudmFsdWUsXG4gICAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudDtcbiAgdmFyIGlzSW1wbGljaXRSdWxlID0gZWxlbWVudC5jb2x1bW4gPT09IHBhcmVudC5jb2x1bW4gJiYgZWxlbWVudC5saW5lID09PSBwYXJlbnQubGluZTtcblxuICB3aGlsZSAocGFyZW50LnR5cGUgIT09ICdydWxlJykge1xuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgfSAvLyBzaG9ydC1jaXJjdWl0IGZvciB0aGUgc2ltcGxlc3QgY2FzZVxuXG5cbiAgaWYgKGVsZW1lbnQucHJvcHMubGVuZ3RoID09PSAxICYmIHZhbHVlLmNoYXJDb2RlQXQoMCkgIT09IDU4XG4gIC8qIGNvbG9uICovXG4gICYmICFmaXhlZEVsZW1lbnRzLmdldChwYXJlbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIGlmIHRoaXMgaXMgYW4gaW1wbGljaXRseSBpbnNlcnRlZCBydWxlICh0aGUgb25lIGVhZ2VybHkgaW5zZXJ0ZWQgYXQgdGhlIGVhY2ggbmV3IG5lc3RlZCBsZXZlbClcbiAgLy8gdGhlbiB0aGUgcHJvcHMgaGFzIGFscmVhZHkgYmVlbiBtYW5pcHVsYXRlZCBiZWZvcmVoYW5kIGFzIHRoZXkgdGhhdCBhcnJheSBpcyBzaGFyZWQgYmV0d2VlbiBpdCBhbmQgaXRzIFwicnVsZSBwYXJlbnRcIlxuXG5cbiAgaWYgKGlzSW1wbGljaXRSdWxlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZml4ZWRFbGVtZW50cy5zZXQoZWxlbWVudCwgdHJ1ZSk7XG4gIHZhciBwb2ludHMgPSBbXTtcbiAgdmFyIHJ1bGVzID0gZ2V0UnVsZXModmFsdWUsIHBvaW50cyk7XG4gIHZhciBwYXJlbnRSdWxlcyA9IHBhcmVudC5wcm9wcztcblxuICBmb3IgKHZhciBpID0gMCwgayA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGFyZW50UnVsZXMubGVuZ3RoOyBqKyssIGsrKykge1xuICAgICAgZWxlbWVudC5wcm9wc1trXSA9IHBvaW50c1tpXSA/IHJ1bGVzW2ldLnJlcGxhY2UoLyZcXGYvZywgcGFyZW50UnVsZXNbal0pIDogcGFyZW50UnVsZXNbal0gKyBcIiBcIiArIHJ1bGVzW2ldO1xuICAgIH1cbiAgfVxufTtcbnZhciByZW1vdmVMYWJlbCA9IGZ1bmN0aW9uIHJlbW92ZUxhYmVsKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgdmFyIHZhbHVlID0gZWxlbWVudC52YWx1ZTtcblxuICAgIGlmICggLy8gY2hhcmNvZGUgZm9yIGxcbiAgICB2YWx1ZS5jaGFyQ29kZUF0KDApID09PSAxMDggJiYgLy8gY2hhcmNvZGUgZm9yIGJcbiAgICB2YWx1ZS5jaGFyQ29kZUF0KDIpID09PSA5OCkge1xuICAgICAgLy8gdGhpcyBpZ25vcmVzIGxhYmVsXG4gICAgICBlbGVtZW50W1wicmV0dXJuXCJdID0gJyc7XG4gICAgICBlbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG59O1xudmFyIGlnbm9yZUZsYWcgPSAnZW1vdGlvbi1kaXNhYmxlLXNlcnZlci1yZW5kZXJpbmctdW5zYWZlLXNlbGVjdG9yLXdhcm5pbmctcGxlYXNlLWRvLW5vdC11c2UtdGhpcy10aGUtd2FybmluZy1leGlzdHMtZm9yLWEtcmVhc29uJztcblxudmFyIGlzSWdub3JpbmdDb21tZW50ID0gZnVuY3Rpb24gaXNJZ25vcmluZ0NvbW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC50eXBlID09PSAnY29tbScgJiYgZWxlbWVudC5jaGlsZHJlbi5pbmRleE9mKGlnbm9yZUZsYWcpID4gLTE7XG59O1xuXG52YXIgY3JlYXRlVW5zYWZlU2VsZWN0b3JzQWxhcm0gPSBmdW5jdGlvbiBjcmVhdGVVbnNhZmVTZWxlY3RvcnNBbGFybShjYWNoZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4LCBjaGlsZHJlbikge1xuICAgIGlmIChlbGVtZW50LnR5cGUgIT09ICdydWxlJyB8fCBjYWNoZS5jb21wYXQpIHJldHVybjtcbiAgICB2YXIgdW5zYWZlUHNldWRvQ2xhc3NlcyA9IGVsZW1lbnQudmFsdWUubWF0Y2goLyg6Zmlyc3R8Om50aHw6bnRoLWxhc3QpLWNoaWxkL2cpO1xuXG4gICAgaWYgKHVuc2FmZVBzZXVkb0NsYXNzZXMpIHtcbiAgICAgIHZhciBpc05lc3RlZCA9ICEhZWxlbWVudC5wYXJlbnQ7IC8vIGluIG5lc3RlZCBydWxlcyBjb21tZW50cyBiZWNvbWUgY2hpbGRyZW4gb2YgdGhlIFwiYXV0by1pbnNlcnRlZFwiIHJ1bGUgYW5kIHRoYXQncyBhbHdheXMgdGhlIGBlbGVtZW50LnBhcmVudGBcbiAgICAgIC8vXG4gICAgICAvLyBjb25zaWRlcmluZyB0aGlzIGlucHV0OlxuICAgICAgLy8gLmEge1xuICAgICAgLy8gICAuYiAvKiBjb21tICovIHt9XG4gICAgICAvLyAgIGNvbG9yOiBob3RwaW5rO1xuICAgICAgLy8gfVxuICAgICAgLy8gd2UgZ2V0IG91dHB1dCBjb3JyZXNwb25kaW5nIHRvIHRoaXM6XG4gICAgICAvLyAuYSB7XG4gICAgICAvLyAgICYge1xuICAgICAgLy8gICAgIC8qIGNvbW0gKi9cbiAgICAgIC8vICAgICBjb2xvcjogaG90cGluaztcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICAuYiB7fVxuICAgICAgLy8gfVxuXG4gICAgICB2YXIgY29tbWVudENvbnRhaW5lciA9IGlzTmVzdGVkID8gZWxlbWVudC5wYXJlbnQuY2hpbGRyZW4gOiAvLyBnbG9iYWwgcnVsZSBhdCB0aGUgcm9vdCBsZXZlbFxuICAgICAgY2hpbGRyZW47XG5cbiAgICAgIGZvciAodmFyIGkgPSBjb21tZW50Q29udGFpbmVyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBub2RlID0gY29tbWVudENvbnRhaW5lcltpXTtcblxuICAgICAgICBpZiAobm9kZS5saW5lIDwgZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gLy8gaXQgaXMgcXVpdGUgd2VpcmQgYnV0IGNvbW1lbnRzIGFyZSAqdXN1YWxseSogcHV0IGF0IGBjb2x1bW46IGVsZW1lbnQuY29sdW1uIC0gMWBcbiAgICAgICAgLy8gc28gd2Ugc2VlayAqZnJvbSB0aGUgZW5kKiBmb3IgdGhlIG5vZGUgdGhhdCBpcyBlYXJsaWVyIHRoYW4gdGhlIHJ1bGUncyBgZWxlbWVudGAgYW5kIGNoZWNrIHRoYXRcbiAgICAgICAgLy8gdGhpcyB3aWxsIGFsc28gbWF0Y2ggaW5wdXRzIGxpa2UgdGhpczpcbiAgICAgICAgLy8gLmEge1xuICAgICAgICAvLyAgIC8qIGNvbW0gKi9cbiAgICAgICAgLy8gICAuYiB7fVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGJ1dCB0aGF0IGlzIGZpbmVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaXQgd291bGQgYmUgdGhlIGVhc2llc3QgdG8gY2hhbmdlIHRoZSBwbGFjZW1lbnQgb2YgdGhlIGNvbW1lbnQgdG8gYmUgdGhlIGZpcnN0IGNoaWxkIG9mIHRoZSBydWxlOlxuICAgICAgICAvLyAuYSB7XG4gICAgICAgIC8vICAgLmIgeyAvKiBjb21tICovIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB3aXRoIHN1Y2ggaW5wdXRzIHdlIHdvdWxkbid0IGhhdmUgdG8gc2VhcmNoIGZvciB0aGUgY29tbWVudCBhdCBhbGxcbiAgICAgICAgLy8gVE9ETzogY29uc2lkZXIgY2hhbmdpbmcgdGhpcyBjb21tZW50IHBsYWNlbWVudCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cblxuICAgICAgICBpZiAobm9kZS5jb2x1bW4gPCBlbGVtZW50LmNvbHVtbikge1xuICAgICAgICAgIGlmIChpc0lnbm9yaW5nQ29tbWVudChub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHVuc2FmZVBzZXVkb0NsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAodW5zYWZlUHNldWRvQ2xhc3MpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBwc2V1ZG8gY2xhc3MgXFxcIlwiICsgdW5zYWZlUHNldWRvQ2xhc3MgKyBcIlxcXCIgaXMgcG90ZW50aWFsbHkgdW5zYWZlIHdoZW4gZG9pbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBUcnkgY2hhbmdpbmcgaXQgdG8gXFxcIlwiICsgdW5zYWZlUHNldWRvQ2xhc3Muc3BsaXQoJy1jaGlsZCcpWzBdICsgXCItb2YtdHlwZVxcXCIuXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIGlzSW1wb3J0UnVsZSA9IGZ1bmN0aW9uIGlzSW1wb3J0UnVsZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LnR5cGUuY2hhckNvZGVBdCgxKSA9PT0gMTA1ICYmIGVsZW1lbnQudHlwZS5jaGFyQ29kZUF0KDApID09PSA2NDtcbn07XG5cbnZhciBpc1ByZXBlbmRlZFdpdGhSZWd1bGFyUnVsZXMgPSBmdW5jdGlvbiBpc1ByZXBlbmRlZFdpdGhSZWd1bGFyUnVsZXMoaW5kZXgsIGNoaWxkcmVuKSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKCFpc0ltcG9ydFJ1bGUoY2hpbGRyZW5baV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59OyAvLyB1c2UgdGhpcyB0byByZW1vdmUgaW5jb3JyZWN0IGVsZW1lbnRzIGZyb20gZnVydGhlciBwcm9jZXNzaW5nXG4vLyBzbyB0aGV5IGRvbid0IGdldCBoYW5kZWQgdG8gdGhlIGBzaGVldGAgKG9yIGFueXRoaW5nIGVsc2UpXG4vLyBhcyB0aGF0IGNvdWxkIHBvdGVudGlhbGx5IGxlYWQgdG8gYWRkaXRpb25hbCBsb2dzIHdoaWNoIGluIHR1cm4gY291bGQgYmUgb3ZlcmhlbG1pbmcgdG8gdGhlIHVzZXJcblxuXG52YXIgbnVsbGlmeUVsZW1lbnQgPSBmdW5jdGlvbiBudWxsaWZ5RWxlbWVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQudHlwZSA9ICcnO1xuICBlbGVtZW50LnZhbHVlID0gJyc7XG4gIGVsZW1lbnRbXCJyZXR1cm5cIl0gPSAnJztcbiAgZWxlbWVudC5jaGlsZHJlbiA9ICcnO1xuICBlbGVtZW50LnByb3BzID0gJyc7XG59O1xuXG52YXIgaW5jb3JyZWN0SW1wb3J0QWxhcm0gPSBmdW5jdGlvbiBpbmNvcnJlY3RJbXBvcnRBbGFybShlbGVtZW50LCBpbmRleCwgY2hpbGRyZW4pIHtcbiAgaWYgKCFpc0ltcG9ydFJ1bGUoZWxlbWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZWxlbWVudC5wYXJlbnQpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiYEBpbXBvcnRgIHJ1bGVzIGNhbid0IGJlIG5lc3RlZCBpbnNpZGUgb3RoZXIgcnVsZXMuIFBsZWFzZSBtb3ZlIGl0IHRvIHRoZSB0b3AgbGV2ZWwgYW5kIHB1dCBpdCBiZWZvcmUgcmVndWxhciBydWxlcy4gS2VlcCBpbiBtaW5kIHRoYXQgdGhleSBjYW4gb25seSBiZSB1c2VkIHdpdGhpbiBnbG9iYWwgc3R5bGVzLlwiKTtcbiAgICBudWxsaWZ5RWxlbWVudChlbGVtZW50KTtcbiAgfSBlbHNlIGlmIChpc1ByZXBlbmRlZFdpdGhSZWd1bGFyUnVsZXMoaW5kZXgsIGNoaWxkcmVuKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJgQGltcG9ydGAgcnVsZXMgY2FuJ3QgYmUgYWZ0ZXIgb3RoZXIgcnVsZXMuIFBsZWFzZSBwdXQgeW91ciBgQGltcG9ydGAgcnVsZXMgYmVmb3JlIHlvdXIgb3RoZXIgcnVsZXMuXCIpO1xuICAgIG51bGxpZnlFbGVtZW50KGVsZW1lbnQpO1xuICB9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuXG5mdW5jdGlvbiBwcmVmaXgodmFsdWUsIGxlbmd0aCkge1xuICBzd2l0Y2ggKGhhc2godmFsdWUsIGxlbmd0aCkpIHtcbiAgICAvLyBjb2xvci1hZGp1c3RcbiAgICBjYXNlIDUxMDM6XG4gICAgICByZXR1cm4gV0VCS0lUICsgJ3ByaW50LScgKyB2YWx1ZSArIHZhbHVlO1xuICAgIC8vIGFuaW1hdGlvbiwgYW5pbWF0aW9uLShkZWxheXxkaXJlY3Rpb258ZHVyYXRpb258ZmlsbC1tb2RlfGl0ZXJhdGlvbi1jb3VudHxuYW1lfHBsYXktc3RhdGV8dGltaW5nLWZ1bmN0aW9uKVxuXG4gICAgY2FzZSA1NzM3OlxuICAgIGNhc2UgNDIwMTpcbiAgICBjYXNlIDMxNzc6XG4gICAgY2FzZSAzNDMzOlxuICAgIGNhc2UgMTY0MTpcbiAgICBjYXNlIDQ0NTc6XG4gICAgY2FzZSAyOTIxOiAvLyB0ZXh0LWRlY29yYXRpb24sIGZpbHRlciwgY2xpcC1wYXRoLCBiYWNrZmFjZS12aXNpYmlsaXR5LCBjb2x1bW4sIGJveC1kZWNvcmF0aW9uLWJyZWFrXG5cbiAgICBjYXNlIDU1NzI6XG4gICAgY2FzZSA2MzU2OlxuICAgIGNhc2UgNTg0NDpcbiAgICBjYXNlIDMxOTE6XG4gICAgY2FzZSA2NjQ1OlxuICAgIGNhc2UgMzAwNTogLy8gbWFzaywgbWFzay1pbWFnZSwgbWFzay0obW9kZXxjbGlwfHNpemUpLCBtYXNrLShyZXBlYXR8b3JpZ2luKSwgbWFzay1wb3NpdGlvbiwgbWFzay1jb21wb3NpdGUsXG5cbiAgICBjYXNlIDYzOTE6XG4gICAgY2FzZSA1ODc5OlxuICAgIGNhc2UgNTYyMzpcbiAgICBjYXNlIDYxMzU6XG4gICAgY2FzZSA0NTk5OlxuICAgIGNhc2UgNDg1NTogLy8gYmFja2dyb3VuZC1jbGlwLCBjb2x1bW5zLCBjb2x1bW4tKGNvdW50fGZpbGx8Z2FwfHJ1bGV8cnVsZS1jb2xvcnxydWxlLXN0eWxlfHJ1bGUtd2lkdGh8c3Bhbnx3aWR0aClcblxuICAgIGNhc2UgNDIxNTpcbiAgICBjYXNlIDYzODk6XG4gICAgY2FzZSA1MTA5OlxuICAgIGNhc2UgNTM2NTpcbiAgICBjYXNlIDU2MjE6XG4gICAgY2FzZSAzODI5OlxuICAgICAgcmV0dXJuIFdFQktJVCArIHZhbHVlICsgdmFsdWU7XG4gICAgLy8gYXBwZWFyYW5jZSwgdXNlci1zZWxlY3QsIHRyYW5zZm9ybSwgaHlwaGVucywgdGV4dC1zaXplLWFkanVzdFxuXG4gICAgY2FzZSA1MzQ5OlxuICAgIGNhc2UgNDI0NjpcbiAgICBjYXNlIDQ4MTA6XG4gICAgY2FzZSA2OTY4OlxuICAgIGNhc2UgMjc1NjpcbiAgICAgIHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1PWiArIHZhbHVlICsgTVMgKyB2YWx1ZSArIHZhbHVlO1xuICAgIC8vIGZsZXgsIGZsZXgtZGlyZWN0aW9uXG5cbiAgICBjYXNlIDY4Mjg6XG4gICAgY2FzZSA0MjY4OlxuICAgICAgcmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyB2YWx1ZSArIHZhbHVlO1xuICAgIC8vIG9yZGVyXG5cbiAgICBjYXNlIDYxNjU6XG4gICAgICByZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArICdmbGV4LScgKyB2YWx1ZSArIHZhbHVlO1xuICAgIC8vIGFsaWduLWl0ZW1zXG5cbiAgICBjYXNlIDUxODc6XG4gICAgICByZXR1cm4gV0VCS0lUICsgdmFsdWUgKyByZXBsYWNlKHZhbHVlLCAvKFxcdyspLisoOlteXSspLywgV0VCS0lUICsgJ2JveC0kMSQyJyArIE1TICsgJ2ZsZXgtJDEkMicpICsgdmFsdWU7XG4gICAgLy8gYWxpZ24tc2VsZlxuXG4gICAgY2FzZSA1NDQzOlxuICAgICAgcmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyAnZmxleC1pdGVtLScgKyByZXBsYWNlKHZhbHVlLCAvZmxleC18LXNlbGYvLCAnJykgKyB2YWx1ZTtcbiAgICAvLyBhbGlnbi1jb250ZW50XG5cbiAgICBjYXNlIDQ2NzU6XG4gICAgICByZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArICdmbGV4LWxpbmUtcGFjaycgKyByZXBsYWNlKHZhbHVlLCAvYWxpZ24tY29udGVudHxmbGV4LXwtc2VsZi8sICcnKSArIHZhbHVlO1xuICAgIC8vIGZsZXgtc2hyaW5rXG5cbiAgICBjYXNlIDU1NDg6XG4gICAgICByZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsICdzaHJpbmsnLCAnbmVnYXRpdmUnKSArIHZhbHVlO1xuICAgIC8vIGZsZXgtYmFzaXNcblxuICAgIGNhc2UgNTI5MjpcbiAgICAgIHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgcmVwbGFjZSh2YWx1ZSwgJ2Jhc2lzJywgJ3ByZWZlcnJlZC1zaXplJykgKyB2YWx1ZTtcbiAgICAvLyBmbGV4LWdyb3dcblxuICAgIGNhc2UgNjA2MDpcbiAgICAgIHJldHVybiBXRUJLSVQgKyAnYm94LScgKyByZXBsYWNlKHZhbHVlLCAnLWdyb3cnLCAnJykgKyBXRUJLSVQgKyB2YWx1ZSArIE1TICsgcmVwbGFjZSh2YWx1ZSwgJ2dyb3cnLCAncG9zaXRpdmUnKSArIHZhbHVlO1xuICAgIC8vIHRyYW5zaXRpb25cblxuICAgIGNhc2UgNDU1NDpcbiAgICAgIHJldHVybiBXRUJLSVQgKyByZXBsYWNlKHZhbHVlLCAvKFteLV0pKHRyYW5zZm9ybSkvZywgJyQxJyArIFdFQktJVCArICckMicpICsgdmFsdWU7XG4gICAgLy8gY3Vyc29yXG5cbiAgICBjYXNlIDYxODc6XG4gICAgICByZXR1cm4gcmVwbGFjZShyZXBsYWNlKHJlcGxhY2UodmFsdWUsIC8oem9vbS18Z3JhYikvLCBXRUJLSVQgKyAnJDEnKSwgLyhpbWFnZS1zZXQpLywgV0VCS0lUICsgJyQxJyksIHZhbHVlLCAnJykgKyB2YWx1ZTtcbiAgICAvLyBiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kLWltYWdlXG5cbiAgICBjYXNlIDU0OTU6XG4gICAgY2FzZSAzOTU5OlxuICAgICAgcmV0dXJuIHJlcGxhY2UodmFsdWUsIC8oaW1hZ2Utc2V0XFwoW15dKikvLCBXRUJLSVQgKyAnJDEnICsgJyRgJDEnKTtcbiAgICAvLyBqdXN0aWZ5LWNvbnRlbnRcblxuICAgIGNhc2UgNDk2ODpcbiAgICAgIHJldHVybiByZXBsYWNlKHJlcGxhY2UodmFsdWUsIC8oLis6KShmbGV4LSk/KC4qKS8sIFdFQktJVCArICdib3gtcGFjazokMycgKyBNUyArICdmbGV4LXBhY2s6JDMnKSwgL3MuKy1iW147XSsvLCAnanVzdGlmeScpICsgV0VCS0lUICsgdmFsdWUgKyB2YWx1ZTtcbiAgICAvLyAobWFyZ2lufHBhZGRpbmcpLWlubGluZS0oc3RhcnR8ZW5kKVxuXG4gICAgY2FzZSA0MDk1OlxuICAgIGNhc2UgMzU4MzpcbiAgICBjYXNlIDQwNjg6XG4gICAgY2FzZSAyNTMyOlxuICAgICAgcmV0dXJuIHJlcGxhY2UodmFsdWUsIC8oLispLWlubGluZSguKykvLCBXRUJLSVQgKyAnJDEkMicpICsgdmFsdWU7XG4gICAgLy8gKG1pbnxtYXgpPyh3aWR0aHxoZWlnaHR8aW5saW5lLXNpemV8YmxvY2stc2l6ZSlcblxuICAgIGNhc2UgODExNjpcbiAgICBjYXNlIDcwNTk6XG4gICAgY2FzZSA1NzUzOlxuICAgIGNhc2UgNTUzNTpcbiAgICBjYXNlIDU0NDU6XG4gICAgY2FzZSA1NzAxOlxuICAgIGNhc2UgNDkzMzpcbiAgICBjYXNlIDQ2Nzc6XG4gICAgY2FzZSA1NTMzOlxuICAgIGNhc2UgNTc4OTpcbiAgICBjYXNlIDUwMjE6XG4gICAgY2FzZSA0NzY1OlxuICAgICAgLy8gc3RyZXRjaCwgbWF4LWNvbnRlbnQsIG1pbi1jb250ZW50LCBmaWxsLWF2YWlsYWJsZVxuICAgICAgaWYgKHN0cmxlbih2YWx1ZSkgLSAxIC0gbGVuZ3RoID4gNikgc3dpdGNoIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDEpKSB7XG4gICAgICAgIC8vIChtKWF4LWNvbnRlbnQsIChtKWluLWNvbnRlbnRcbiAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgLy8gLVxuICAgICAgICAgIGlmIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDQpICE9PSA0NSkgYnJlYWs7XG4gICAgICAgIC8vIChmKWlsbC1hdmFpbGFibGUsIChmKWl0LWNvbnRlbnRcblxuICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyguKzopKC4rKS0oW15dKykvLCAnJDEnICsgV0VCS0lUICsgJyQyLSQzJyArICckMScgKyBNT1ogKyAoY2hhcmF0KHZhbHVlLCBsZW5ndGggKyAzKSA9PSAxMDggPyAnJDMnIDogJyQyLSQzJykpICsgdmFsdWU7XG4gICAgICAgIC8vIChzKXRyZXRjaFxuXG4gICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgIHJldHVybiB+aW5kZXhvZih2YWx1ZSwgJ3N0cmV0Y2gnKSA/IHByZWZpeChyZXBsYWNlKHZhbHVlLCAnc3RyZXRjaCcsICdmaWxsLWF2YWlsYWJsZScpLCBsZW5ndGgpICsgdmFsdWUgOiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIC8vIHBvc2l0aW9uOiBzdGlja3lcblxuICAgIGNhc2UgNDk0OTpcbiAgICAgIC8vIChzKXRpY2t5P1xuICAgICAgaWYgKGNoYXJhdCh2YWx1ZSwgbGVuZ3RoICsgMSkgIT09IDExNSkgYnJlYWs7XG4gICAgLy8gZGlzcGxheTogKGZsZXh8aW5saW5lLWZsZXgpXG5cbiAgICBjYXNlIDY0NDQ6XG4gICAgICBzd2l0Y2ggKGNoYXJhdCh2YWx1ZSwgc3RybGVuKHZhbHVlKSAtIDMgLSAofmluZGV4b2YodmFsdWUsICchaW1wb3J0YW50JykgJiYgMTApKSkge1xuICAgICAgICAvLyBzdGljKGspeVxuICAgICAgICBjYXNlIDEwNzpcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZSh2YWx1ZSwgJzonLCAnOicgKyBXRUJLSVQpICsgdmFsdWU7XG4gICAgICAgIC8vIChpbmxpbmUtKT9mbChlKXhcblxuICAgICAgICBjYXNlIDEwMTpcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyguKzopKFteOyFdKykoO3whLispPy8sICckMScgKyBXRUJLSVQgKyAoY2hhcmF0KHZhbHVlLCAxNCkgPT09IDQ1ID8gJ2lubGluZS0nIDogJycpICsgJ2JveCQzJyArICckMScgKyBXRUJLSVQgKyAnJDIkMycgKyAnJDEnICsgTVMgKyAnJDJib3gkMycpICsgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIC8vIHdyaXRpbmctbW9kZVxuXG4gICAgY2FzZSA1OTM2OlxuICAgICAgc3dpdGNoIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDExKSkge1xuICAgICAgICAvLyB2ZXJ0aWNhbC1sKHIpXG4gICAgICAgIGNhc2UgMTE0OlxuICAgICAgICAgIHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgcmVwbGFjZSh2YWx1ZSwgL1tzdmhdXFx3Ky1bdGJscl17Mn0vLCAndGInKSArIHZhbHVlO1xuICAgICAgICAvLyB2ZXJ0aWNhbC1yKGwpXG5cbiAgICAgICAgY2FzZSAxMDg6XG4gICAgICAgICAgcmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sICd0Yi1ybCcpICsgdmFsdWU7XG4gICAgICAgIC8vIGhvcml6b250YWwoLSl0YlxuXG4gICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgcmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sICdscicpICsgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgdmFsdWUgKyB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIHByZWZpeGVyID0gZnVuY3Rpb24gcHJlZml4ZXIoZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykge1xuICBpZiAoZWxlbWVudC5sZW5ndGggPiAtMSkgaWYgKCFlbGVtZW50W1wicmV0dXJuXCJdKSBzd2l0Y2ggKGVsZW1lbnQudHlwZSkge1xuICAgIGNhc2UgREVDTEFSQVRJT046XG4gICAgICBlbGVtZW50W1wicmV0dXJuXCJdID0gcHJlZml4KGVsZW1lbnQudmFsdWUsIGVsZW1lbnQubGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBLRVlGUkFNRVM6XG4gICAgICByZXR1cm4gc2VyaWFsaXplKFtjb3B5KGVsZW1lbnQsIHtcbiAgICAgICAgdmFsdWU6IHJlcGxhY2UoZWxlbWVudC52YWx1ZSwgJ0AnLCAnQCcgKyBXRUJLSVQpXG4gICAgICB9KV0sIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgUlVMRVNFVDpcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkgcmV0dXJuIGNvbWJpbmUoZWxlbWVudC5wcm9wcywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHN3aXRjaCAobWF0Y2godmFsdWUsIC8oOjpwbGFjXFx3K3w6cmVhZC1cXHcrKS8pKSB7XG4gICAgICAgICAgLy8gOnJlYWQtKG9ubHl8d3JpdGUpXG4gICAgICAgICAgY2FzZSAnOnJlYWQtb25seSc6XG4gICAgICAgICAgY2FzZSAnOnJlYWQtd3JpdGUnOlxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShbY29weShlbGVtZW50LCB7XG4gICAgICAgICAgICAgIHByb3BzOiBbcmVwbGFjZSh2YWx1ZSwgLzoocmVhZC1cXHcrKS8sICc6JyArIE1PWiArICckMScpXVxuICAgICAgICAgICAgfSldLCBjYWxsYmFjayk7XG4gICAgICAgICAgLy8gOnBsYWNlaG9sZGVyXG5cbiAgICAgICAgICBjYXNlICc6OnBsYWNlaG9sZGVyJzpcbiAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoW2NvcHkoZWxlbWVudCwge1xuICAgICAgICAgICAgICBwcm9wczogW3JlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sICc6JyArIFdFQktJVCArICdpbnB1dC0kMScpXVxuICAgICAgICAgICAgfSksIGNvcHkoZWxlbWVudCwge1xuICAgICAgICAgICAgICBwcm9wczogW3JlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sICc6JyArIE1PWiArICckMScpXVxuICAgICAgICAgICAgfSksIGNvcHkoZWxlbWVudCwge1xuICAgICAgICAgICAgICBwcm9wczogW3JlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sIE1TICsgJ2lucHV0LSQxJyldXG4gICAgICAgICAgICB9KV0sIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0pO1xuICB9XG59O1xuXG4vKiBpbXBvcnQgdHlwZSB7IFN0eWxpc1BsdWdpbiB9IGZyb20gJy4vdHlwZXMnICovXG5cbi8qXG5leHBvcnQgdHlwZSBPcHRpb25zID0ge1xuICBub25jZT86IHN0cmluZyxcbiAgc3R5bGlzUGx1Z2lucz86IFN0eWxpc1BsdWdpbltdLFxuICBrZXk6IHN0cmluZyxcbiAgY29udGFpbmVyPzogSFRNTEVsZW1lbnQsXG4gIHNwZWVkeT86IGJvb2xlYW4sXG4gIHByZXBlbmQ/OiBib29sZWFuLFxuICBpbnNlcnRpb25Qb2ludD86IEhUTUxFbGVtZW50XG59XG4qL1xuXG52YXIgZ2V0U2VydmVyU3R5bGlzQ2FjaGUgPSBpc0Jyb3dzZXIgPyB1bmRlZmluZWQgOiB3ZWFrTWVtb2l6ZShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBtZW1vaXplKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiBjYWNoZVtuYW1lXTtcbiAgICB9O1xuICB9KTtcbn0pO1xudmFyIGRlZmF1bHRTdHlsaXNQbHVnaW5zID0gW3ByZWZpeGVyXTtcblxudmFyIGNyZWF0ZUNhY2hlID0gZnVuY3Rpb25cbiAgLyo6IEVtb3Rpb25DYWNoZSAqL1xuY3JlYXRlQ2FjaGUob3B0aW9uc1xuLyo6IE9wdGlvbnMgKi9cbikge1xuICB2YXIga2V5ID0gb3B0aW9ucy5rZXk7XG5cbiAgaWYgKCFrZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgaGF2ZSB0byBjb25maWd1cmUgYGtleWAgZm9yIHlvdXIgY2FjaGUuIFBsZWFzZSBtYWtlIHN1cmUgaXQncyB1bmlxdWUgKGFuZCBub3QgZXF1YWwgdG8gJ2NzcycpIGFzIGl0J3MgdXNlZCBmb3IgbGlua2luZyBzdHlsZXMgdG8geW91ciBjYWNoZS5cXG5cIiArIFwiSWYgbXVsdGlwbGUgY2FjaGVzIHNoYXJlIHRoZSBzYW1lIGtleSB0aGV5IG1pZ2h0IFxcXCJmaWdodFxcXCIgZm9yIGVhY2ggb3RoZXIncyBzdHlsZSBlbGVtZW50cy5cIik7XG4gIH1cblxuICBpZiAoaXNCcm93c2VyICYmIGtleSA9PT0gJ2NzcycpIHtcbiAgICB2YXIgc3NyU3R5bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN0eWxlW2RhdGEtZW1vdGlvbl06bm90KFtkYXRhLXNdKVwiKTsgLy8gZ2V0IFNTUmVkIHN0eWxlcyBvdXQgb2YgdGhlIHdheSBvZiBSZWFjdCdzIGh5ZHJhdGlvblxuICAgIC8vIGRvY3VtZW50LmhlYWQgaXMgYSBzYWZlIHBsYWNlIHRvIG1vdmUgdGhlbSB0byh0aG91Z2ggbm90ZSBkb2N1bWVudC5oZWFkIGlzIG5vdCBuZWNlc3NhcmlseSB0aGUgbGFzdCBwbGFjZSB0aGV5IHdpbGwgYmUpXG4gICAgLy8gbm90ZSB0aGlzIHZlcnkgdmVyeSBpbnRlbnRpb25hbGx5IHRhcmdldHMgYWxsIHN0eWxlIGVsZW1lbnRzIHJlZ2FyZGxlc3Mgb2YgdGhlIGtleSB0byBlbnN1cmVcbiAgICAvLyB0aGF0IGNyZWF0aW5nIGEgY2FjaGUgd29ya3MgaW5zaWRlIG9mIHJlbmRlciBvZiBhIFJlYWN0IGNvbXBvbmVudFxuXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzc3JTdHlsZXMsIGZ1bmN0aW9uIChub2RlXG4gICAgLyo6IEhUTUxTdHlsZUVsZW1lbnQgKi9cbiAgICApIHtcbiAgICAgIC8vIHdlIHdhbnQgdG8gb25seSBtb3ZlIGVsZW1lbnRzIHdoaWNoIGhhdmUgYSBzcGFjZSBpbiB0aGUgZGF0YS1lbW90aW9uIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgLy8gYmVjYXVzZSB0aGF0IGluZGljYXRlcyB0aGF0IGl0IGlzIGFuIEVtb3Rpb24gMTEgc2VydmVyLXNpZGUgcmVuZGVyZWQgc3R5bGUgZWxlbWVudHNcbiAgICAgIC8vIHdoaWxlIHdlIHdpbGwgYWxyZWFkeSBpZ25vcmUgRW1vdGlvbiAxMSBjbGllbnQtc2lkZSBpbnNlcnRlZCBzdHlsZXMgYmVjYXVzZSBvZiB0aGUgOm5vdChbZGF0YS1zXSkgcGFydCBpbiB0aGUgc2VsZWN0b3JcbiAgICAgIC8vIEVtb3Rpb24gMTAgY2xpZW50LXNpZGUgaW5zZXJ0ZWQgc3R5bGVzIGRpZCBub3QgaGF2ZSBkYXRhLXMgKGJ1dCBpbXBvcnRhbnRseSBkaWQgbm90IGhhdmUgYSBzcGFjZSBpbiB0aGVpciBkYXRhLWVtb3Rpb24gYXR0cmlidXRlcylcbiAgICAgIC8vIHNvIGNoZWNraW5nIGZvciB0aGUgc3BhY2UgZW5zdXJlcyB0aGF0IGxvYWRpbmcgRW1vdGlvbiAxMSBhZnRlciBFbW90aW9uIDEwIGhhcyBpbnNlcnRlZCBzb21lIHN0eWxlc1xuICAgICAgLy8gd2lsbCBub3QgcmVzdWx0IGluIHRoZSBFbW90aW9uIDEwIHN0eWxlcyBiZWluZyBkZXN0cm95ZWRcbiAgICAgIHZhciBkYXRhRW1vdGlvbkF0dHJpYnV0ZSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWVtb3Rpb24nKTtcblxuICAgICAgaWYgKGRhdGFFbW90aW9uQXR0cmlidXRlLmluZGV4T2YoJyAnKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcycsICcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdHlsaXNQbHVnaW5zID0gb3B0aW9ucy5zdHlsaXNQbHVnaW5zIHx8IGRlZmF1bHRTdHlsaXNQbHVnaW5zO1xuXG4gIHtcbiAgICBpZiAoL1teYS16LV0vLnRlc3Qoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1vdGlvbiBrZXkgbXVzdCBvbmx5IGNvbnRhaW4gbG93ZXIgY2FzZSBhbHBoYWJldGljYWwgY2hhcmFjdGVycyBhbmQgLSBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwYXNzZWRcIik7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluc2VydGVkID0ge307XG4gIHZhciBjb250YWluZXI7XG4gIC8qIDogTm9kZSAqL1xuXG4gIHZhciBub2Rlc1RvSHlkcmF0ZSA9IFtdO1xuXG4gIGlmIChpc0Jyb3dzZXIpIHtcbiAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBkb2N1bWVudC5oZWFkO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoIC8vIHRoaXMgbWVhbnMgd2Ugd2lsbCBpZ25vcmUgZWxlbWVudHMgd2hpY2ggZG9uJ3QgaGF2ZSBhIHNwYWNlIGluIHRoZW0gd2hpY2hcbiAgICAvLyBtZWFucyB0aGF0IHRoZSBzdHlsZSBlbGVtZW50cyB3ZSdyZSBsb29raW5nIGF0IGFyZSBvbmx5IEVtb3Rpb24gMTEgc2VydmVyLXJlbmRlcmVkIHN0eWxlIGVsZW1lbnRzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN0eWxlW2RhdGEtZW1vdGlvbl49XFxcIlwiICsga2V5ICsgXCIgXFxcIl1cIiksIGZ1bmN0aW9uIChub2RlXG4gICAgLyo6IEhUTUxTdHlsZUVsZW1lbnQgKi9cbiAgICApIHtcbiAgICAgIHZhciBhdHRyaWIgPSBub2RlLmdldEF0dHJpYnV0ZShcImRhdGEtZW1vdGlvblwiKS5zcGxpdCgnICcpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGF0dHJpYi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpbnNlcnRlZFthdHRyaWJbaV1dID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbm9kZXNUb0h5ZHJhdGUucHVzaChub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfaW5zZXJ0O1xuICAvKjogKFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICBzZXJpYWxpemVkOiBTZXJpYWxpemVkU3R5bGVzLFxuICBzaGVldDogU3R5bGVTaGVldCxcbiAgc2hvdWxkQ2FjaGU6IGJvb2xlYW5cbiAgKSA9PiBzdHJpbmcgfCB2b2lkICovXG5cblxuICB2YXIgb21uaXByZXNlbnRQbHVnaW5zID0gW2NvbXBhdCwgcmVtb3ZlTGFiZWxdO1xuXG4gIHtcbiAgICBvbW5pcHJlc2VudFBsdWdpbnMucHVzaChjcmVhdGVVbnNhZmVTZWxlY3RvcnNBbGFybSh7XG4gICAgICBnZXQgY29tcGF0KCkge1xuICAgICAgICByZXR1cm4gY2FjaGUuY29tcGF0O1xuICAgICAgfVxuXG4gICAgfSksIGluY29ycmVjdEltcG9ydEFsYXJtKTtcbiAgfVxuXG4gIGlmIChpc0Jyb3dzZXIpIHtcbiAgICB2YXIgY3VycmVudFNoZWV0O1xuICAgIHZhciBmaW5hbGl6aW5nUGx1Z2lucyA9IFtzdHJpbmdpZnksIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBpZiAoIWVsZW1lbnQucm9vdCkge1xuICAgICAgICBpZiAoZWxlbWVudFtcInJldHVyblwiXSkge1xuICAgICAgICAgIGN1cnJlbnRTaGVldC5pbnNlcnQoZWxlbWVudFtcInJldHVyblwiXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC52YWx1ZSAmJiBlbGVtZW50LnR5cGUgIT09IENPTU1FTlQpIHtcbiAgICAgICAgICAvLyBpbnNlcnQgZW1wdHkgcnVsZSBpbiBub24tcHJvZHVjdGlvbiBlbnZpcm9ubWVudHNcbiAgICAgICAgICAvLyBzbyBAZW1vdGlvbi9qZXN0IGNhbiBncmFiIGBrZXlgIGZyb20gdGhlIChKUylET00gZm9yIGNhY2hlcyB3aXRob3V0IGFueSBydWxlcyBpbnNlcnRlZCB5ZXRcbiAgICAgICAgICBjdXJyZW50U2hlZXQuaW5zZXJ0KGVsZW1lbnQudmFsdWUgKyBcInt9XCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBdO1xuICAgIHZhciBzZXJpYWxpemVyID0gbWlkZGxld2FyZShvbW5pcHJlc2VudFBsdWdpbnMuY29uY2F0KHN0eWxpc1BsdWdpbnMsIGZpbmFsaXppbmdQbHVnaW5zKSk7XG5cbiAgICB2YXIgc3R5bGlzID0gZnVuY3Rpb24gc3R5bGlzKHN0eWxlcykge1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZShjb21waWxlKHN0eWxlcyksIHNlcmlhbGl6ZXIpO1xuICAgIH07XG5cbiAgICBfaW5zZXJ0ID0gZnVuY3Rpb25cbiAgICAgIC8qOiB2b2lkICovXG4gICAgaW5zZXJ0KHNlbGVjdG9yXG4gICAgLyo6IHN0cmluZyAqL1xuICAgICwgc2VyaWFsaXplZFxuICAgIC8qOiBTZXJpYWxpemVkU3R5bGVzICovXG4gICAgLCBzaGVldFxuICAgIC8qOiBTdHlsZVNoZWV0ICovXG4gICAgLCBzaG91bGRDYWNoZVxuICAgIC8qOiBib29sZWFuICovXG4gICAgKSB7XG4gICAgICBjdXJyZW50U2hlZXQgPSBzaGVldDtcblxuICAgICAgaWYgKHNlcmlhbGl6ZWQubWFwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudFNoZWV0ID0ge1xuICAgICAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KHJ1bGVcbiAgICAgICAgICAvKjogc3RyaW5nICovXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzaGVldC5pbnNlcnQocnVsZSArIHNlcmlhbGl6ZWQubWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHN0eWxpcyhzZWxlY3RvciA/IHNlbGVjdG9yICsgXCJ7XCIgKyBzZXJpYWxpemVkLnN0eWxlcyArIFwifVwiIDogc2VyaWFsaXplZC5zdHlsZXMpO1xuXG4gICAgICBpZiAoc2hvdWxkQ2FjaGUpIHtcbiAgICAgICAgY2FjaGUuaW5zZXJ0ZWRbc2VyaWFsaXplZC5uYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgX2ZpbmFsaXppbmdQbHVnaW5zID0gW3N0cmluZ2lmeV07XG5cbiAgICB2YXIgX3NlcmlhbGl6ZXIgPSBtaWRkbGV3YXJlKG9tbmlwcmVzZW50UGx1Z2lucy5jb25jYXQoc3R5bGlzUGx1Z2lucywgX2ZpbmFsaXppbmdQbHVnaW5zKSk7XG5cbiAgICB2YXIgX3N0eWxpcyA9IGZ1bmN0aW9uIF9zdHlsaXMoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplKGNvbXBpbGUoc3R5bGVzKSwgX3NlcmlhbGl6ZXIpO1xuICAgIH07XG5cbiAgICB2YXIgc2VydmVyU3R5bGlzQ2FjaGUgPSBnZXRTZXJ2ZXJTdHlsaXNDYWNoZShzdHlsaXNQbHVnaW5zKShrZXkpO1xuXG4gICAgdmFyIGdldFJ1bGVzID0gZnVuY3Rpb25cbiAgICAgIC8qOiBzdHJpbmcgKi9cbiAgICBnZXRSdWxlcyhzZWxlY3RvclxuICAgIC8qOiBzdHJpbmcgKi9cbiAgICAsIHNlcmlhbGl6ZWRcbiAgICAvKjogU2VyaWFsaXplZFN0eWxlcyAqL1xuICAgICkge1xuICAgICAgdmFyIG5hbWUgPSBzZXJpYWxpemVkLm5hbWU7XG5cbiAgICAgIGlmIChzZXJ2ZXJTdHlsaXNDYWNoZVtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlcnZlclN0eWxpc0NhY2hlW25hbWVdID0gX3N0eWxpcyhzZWxlY3RvciA/IHNlbGVjdG9yICsgXCJ7XCIgKyBzZXJpYWxpemVkLnN0eWxlcyArIFwifVwiIDogc2VyaWFsaXplZC5zdHlsZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VydmVyU3R5bGlzQ2FjaGVbbmFtZV07XG4gICAgfTtcblxuICAgIF9pbnNlcnQgPSBmdW5jdGlvblxuICAgICAgLyo6IHN0cmluZyB8IHZvaWQgKi9cbiAgICBfaW5zZXJ0KHNlbGVjdG9yXG4gICAgLyo6IHN0cmluZyAqL1xuICAgICwgc2VyaWFsaXplZFxuICAgIC8qOiBTZXJpYWxpemVkU3R5bGVzICovXG4gICAgLCBzaGVldFxuICAgIC8qOiBTdHlsZVNoZWV0ICovXG4gICAgLCBzaG91bGRDYWNoZVxuICAgIC8qOiBib29sZWFuICovXG4gICAgKSB7XG4gICAgICB2YXIgbmFtZSA9IHNlcmlhbGl6ZWQubmFtZTtcbiAgICAgIHZhciBydWxlcyA9IGdldFJ1bGVzKHNlbGVjdG9yLCBzZXJpYWxpemVkKTtcblxuICAgICAgaWYgKGNhY2hlLmNvbXBhdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGluIHJlZ3VsYXIgbW9kZSwgd2UgZG9uJ3Qgc2V0IHRoZSBzdHlsZXMgb24gdGhlIGluc2VydGVkIGNhY2hlXG4gICAgICAgIC8vIHNpbmNlIHdlIGRvbid0IG5lZWQgdG8gYW5kIHRoYXQgd291bGQgYmUgd2FzdGluZyBtZW1vcnlcbiAgICAgICAgLy8gd2UgcmV0dXJuIHRoZW0gc28gdGhhdCB0aGV5IGFyZSByZW5kZXJlZCBpbiBhIHN0eWxlIHRhZ1xuICAgICAgICBpZiAoc2hvdWxkQ2FjaGUpIHtcbiAgICAgICAgICBjYWNoZS5pbnNlcnRlZFtuYW1lXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VyaWFsaXplZC5tYXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBydWxlcyArIHNlcmlhbGl6ZWQubWFwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJ1bGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW4gY29tcGF0IG1vZGUsIHdlIHB1dCB0aGUgc3R5bGVzIG9uIHRoZSBpbnNlcnRlZCBjYWNoZSBzb1xuICAgICAgICAvLyB0aGF0IGVtb3Rpb24tc2VydmVyIGNhbiBwdWxsIG91dCB0aGUgc3R5bGVzXG4gICAgICAgIC8vIGV4Y2VwdCB3aGVuIHdlIGRvbid0IHdhbnQgdG8gY2FjaGUgaXQgd2hpY2ggd2FzIGluIEdsb2JhbCBidXQgbm93XG4gICAgICAgIC8vIGlzIG5vd2hlcmUgYnV0IHdlIGRvbid0IHdhbnQgdG8gZG8gYSBtYWpvciByaWdodCBub3dcbiAgICAgICAgLy8gYW5kIGp1c3QgaW4gY2FzZSB3ZSdyZSBnb2luZyB0byBsZWF2ZSB0aGUgY2FzZSBoZXJlXG4gICAgICAgIC8vIGl0J3MgYWxzbyBub3QgYWZmZWN0aW5nIGNsaWVudCBzaWRlIGJ1bmRsZSBzaXplXG4gICAgICAgIC8vIHNvIGl0J3MgcmVhbGx5IG5vdCBhIGJpZyBkZWFsXG4gICAgICAgIGlmIChzaG91bGRDYWNoZSkge1xuICAgICAgICAgIGNhY2hlLmluc2VydGVkW25hbWVdID0gcnVsZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJ1bGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBjYWNoZVxuICAvKjogRW1vdGlvbkNhY2hlICovXG4gID0ge1xuICAgIGtleToga2V5LFxuICAgIHNoZWV0OiBuZXcgU3R5bGVTaGVldCh7XG4gICAgICBrZXk6IGtleSxcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgbm9uY2U6IG9wdGlvbnMubm9uY2UsXG4gICAgICBzcGVlZHk6IG9wdGlvbnMuc3BlZWR5LFxuICAgICAgcHJlcGVuZDogb3B0aW9ucy5wcmVwZW5kLFxuICAgICAgaW5zZXJ0aW9uUG9pbnQ6IG9wdGlvbnMuaW5zZXJ0aW9uUG9pbnRcbiAgICB9KSxcbiAgICBub25jZTogb3B0aW9ucy5ub25jZSxcbiAgICBpbnNlcnRlZDogaW5zZXJ0ZWQsXG4gICAgcmVnaXN0ZXJlZDoge30sXG4gICAgaW5zZXJ0OiBfaW5zZXJ0XG4gIH07XG4gIGNhY2hlLnNoZWV0Lmh5ZHJhdGUobm9kZXNUb0h5ZHJhdGUpO1xuICByZXR1cm4gY2FjaGU7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVDYWNoZSBhcyBkZWZhdWx0IH07XG4iLCJ2YXIgaXNEZXZlbG9wbWVudCA9IHRydWU7XG5cbi8qXG5cbkJhc2VkIG9mZiBnbGFtb3IncyBTdHlsZVNoZWV0LCB0aGFua3MgU3VuaWwg4p2k77iPXG5cbmhpZ2ggcGVyZm9ybWFuY2UgU3R5bGVTaGVldCBmb3IgY3NzLWluLWpzIHN5c3RlbXNcblxuLSB1c2VzIG11bHRpcGxlIHN0eWxlIHRhZ3MgYmVoaW5kIHRoZSBzY2VuZXMgZm9yIG1pbGxpb25zIG9mIHJ1bGVzXG4tIHVzZXMgYGluc2VydFJ1bGVgIGZvciBhcHBlbmRpbmcgaW4gcHJvZHVjdGlvbiBmb3IgKm11Y2gqIGZhc3RlciBwZXJmb3JtYW5jZVxuXG4vLyB1c2FnZVxuXG5pbXBvcnQgeyBTdHlsZVNoZWV0IH0gZnJvbSAnQGVtb3Rpb24vc2hlZXQnXG5cbmxldCBzdHlsZVNoZWV0ID0gbmV3IFN0eWxlU2hlZXQoeyBrZXk6ICcnLCBjb250YWluZXI6IGRvY3VtZW50LmhlYWQgfSlcblxuc3R5bGVTaGVldC5pbnNlcnQoJyNib3ggeyBib3JkZXI6IDFweCBzb2xpZCByZWQ7IH0nKVxuLSBhcHBlbmRzIGEgY3NzIHJ1bGUgaW50byB0aGUgc3R5bGVzaGVldFxuXG5zdHlsZVNoZWV0LmZsdXNoKClcbi0gZW1wdGllcyB0aGUgc3R5bGVzaGVldCBvZiBhbGwgaXRzIGNvbnRlbnRzXG5cbiovXG5cbmZ1bmN0aW9uIHNoZWV0Rm9yVGFnKHRhZykge1xuICBpZiAodGFnLnNoZWV0KSB7XG4gICAgcmV0dXJuIHRhZy5zaGVldDtcbiAgfSAvLyB0aGlzIHdlaXJkbmVzcyBicm91Z2h0IHRvIHlvdSBieSBmaXJlZm94XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZG9jdW1lbnQuc3R5bGVTaGVldHNbaV0ub3duZXJOb2RlID09PSB0YWcpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcbiAgICB9XG4gIH0gLy8gdGhpcyBmdW5jdGlvbiBzaG91bGQgYWx3YXlzIHJldHVybiB3aXRoIGEgdmFsdWVcbiAgLy8gVFMgY2FuJ3QgdW5kZXJzdGFuZCBpdCB0aG91Z2ggc28gd2UgbWFrZSBpdCBzdG9wIGNvbXBsYWluaW5nIGhlcmVcblxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB0YWcuc2V0QXR0cmlidXRlKCdkYXRhLWVtb3Rpb24nLCBvcHRpb25zLmtleSk7XG5cbiAgaWYgKG9wdGlvbnMubm9uY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgb3B0aW9ucy5ub25jZSk7XG4gIH1cblxuICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgdGFnLnNldEF0dHJpYnV0ZSgnZGF0YS1zJywgJycpO1xuICByZXR1cm4gdGFnO1xufVxuXG52YXIgU3R5bGVTaGVldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIFVzaW5nIE5vZGUgaW5zdGVhZCBvZiBIVE1MRWxlbWVudCBzaW5jZSBjb250YWluZXIgbWF5IGJlIGEgU2hhZG93Um9vdFxuICBmdW5jdGlvbiBTdHlsZVNoZWV0KG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5faW5zZXJ0VGFnID0gZnVuY3Rpb24gKHRhZykge1xuICAgICAgdmFyIGJlZm9yZTtcblxuICAgICAgaWYgKF90aGlzLnRhZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChfdGhpcy5pbnNlcnRpb25Qb2ludCkge1xuICAgICAgICAgIGJlZm9yZSA9IF90aGlzLmluc2VydGlvblBvaW50Lm5leHRTaWJsaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnByZXBlbmQpIHtcbiAgICAgICAgICBiZWZvcmUgPSBfdGhpcy5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiZWZvcmUgPSBfdGhpcy5iZWZvcmU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlZm9yZSA9IF90aGlzLnRhZ3NbX3RoaXMudGFncy5sZW5ndGggLSAxXS5uZXh0U2libGluZztcbiAgICAgIH1cblxuICAgICAgX3RoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0YWcsIGJlZm9yZSk7XG5cbiAgICAgIF90aGlzLnRhZ3MucHVzaCh0YWcpO1xuICAgIH07XG5cbiAgICB0aGlzLmlzU3BlZWR5ID0gb3B0aW9ucy5zcGVlZHkgPT09IHVuZGVmaW5lZCA/ICFpc0RldmVsb3BtZW50IDogb3B0aW9ucy5zcGVlZHk7XG4gICAgdGhpcy50YWdzID0gW107XG4gICAgdGhpcy5jdHIgPSAwO1xuICAgIHRoaXMubm9uY2UgPSBvcHRpb25zLm5vbmNlOyAvLyBrZXkgaXMgdGhlIHZhbHVlIG9mIHRoZSBkYXRhLWVtb3Rpb24gYXR0cmlidXRlLCBpdCdzIHVzZWQgdG8gaWRlbnRpZnkgZGlmZmVyZW50IHNoZWV0c1xuXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMucHJlcGVuZCA9IG9wdGlvbnMucHJlcGVuZDtcbiAgICB0aGlzLmluc2VydGlvblBvaW50ID0gb3B0aW9ucy5pbnNlcnRpb25Qb2ludDtcbiAgICB0aGlzLmJlZm9yZSA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3R5bGVTaGVldC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmh5ZHJhdGUgPSBmdW5jdGlvbiBoeWRyYXRlKG5vZGVzKSB7XG4gICAgbm9kZXMuZm9yRWFjaCh0aGlzLl9pbnNlcnRUYWcpO1xuICB9O1xuXG4gIF9wcm90by5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQocnVsZSkge1xuICAgIC8vIHRoZSBtYXggbGVuZ3RoIGlzIGhvdyBtYW55IHJ1bGVzIHdlIGhhdmUgcGVyIHN0eWxlIHRhZywgaXQncyA2NTAwMCBpbiBzcGVlZHkgbW9kZVxuICAgIC8vIGl0J3MgMSBpbiBkZXYgYmVjYXVzZSB3ZSBpbnNlcnQgc291cmNlIG1hcHMgdGhhdCBtYXAgYSBzaW5nbGUgcnVsZSB0byBhIGxvY2F0aW9uXG4gICAgLy8gYW5kIHlvdSBjYW4gb25seSBoYXZlIG9uZSBzb3VyY2UgbWFwIHBlciBzdHlsZSB0YWdcbiAgICBpZiAodGhpcy5jdHIgJSAodGhpcy5pc1NwZWVkeSA/IDY1MDAwIDogMSkgPT09IDApIHtcbiAgICAgIHRoaXMuX2luc2VydFRhZyhjcmVhdGVTdHlsZUVsZW1lbnQodGhpcykpO1xuICAgIH1cblxuICAgIHZhciB0YWcgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdO1xuXG4gICAge1xuICAgICAgdmFyIGlzSW1wb3J0UnVsZSA9IHJ1bGUuY2hhckNvZGVBdCgwKSA9PT0gNjQgJiYgcnVsZS5jaGFyQ29kZUF0KDEpID09PSAxMDU7XG5cbiAgICAgIGlmIChpc0ltcG9ydFJ1bGUgJiYgdGhpcy5fYWxyZWFkeUluc2VydGVkT3JkZXJJbnNlbnNpdGl2ZVJ1bGUpIHtcbiAgICAgICAgLy8gdGhpcyB3b3VsZCBvbmx5IGNhdXNlIHByb2JsZW0gaW4gc3BlZWR5IG1vZGVcbiAgICAgICAgLy8gYnV0IHdlIGRvbid0IHdhbnQgZW5hYmxpbmcgc3BlZWR5IHRvIGFmZmVjdCB0aGUgb2JzZXJ2YWJsZSBiZWhhdmlvclxuICAgICAgICAvLyBzbyB3ZSByZXBvcnQgdGhpcyBlcnJvciBhdCBhbGwgdGltZXNcbiAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSdyZSBhdHRlbXB0aW5nIHRvIGluc2VydCB0aGUgZm9sbG93aW5nIHJ1bGU6XFxuXCIgKyBydWxlICsgJ1xcblxcbmBAaW1wb3J0YCBydWxlcyBtdXN0IGJlIGJlZm9yZSBhbGwgb3RoZXIgdHlwZXMgb2YgcnVsZXMgaW4gYSBzdHlsZXNoZWV0IGJ1dCBvdGhlciBydWxlcyBoYXZlIGFscmVhZHkgYmVlbiBpbnNlcnRlZC4gUGxlYXNlIGVuc3VyZSB0aGF0IGBAaW1wb3J0YCBydWxlcyBhcmUgYmVmb3JlIGFsbCBvdGhlciBydWxlcy4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWxyZWFkeUluc2VydGVkT3JkZXJJbnNlbnNpdGl2ZVJ1bGUgPSB0aGlzLl9hbHJlYWR5SW5zZXJ0ZWRPcmRlckluc2Vuc2l0aXZlUnVsZSB8fCAhaXNJbXBvcnRSdWxlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzU3BlZWR5KSB7XG4gICAgICB2YXIgc2hlZXQgPSBzaGVldEZvclRhZyh0YWcpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSB1bHRyYWZhc3QgdmVyc2lvbiwgd29ya3MgYWNyb3NzIGJyb3dzZXJzXG4gICAgICAgIC8vIHRoZSBiaWcgZHJhd2JhY2sgaXMgdGhhdCB0aGUgY3NzIHdvbid0IGJlIGVkaXRhYmxlIGluIGRldnRvb2xzXG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUocnVsZSwgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKCEvOigtbW96LXBsYWNlaG9sZGVyfC1tb3otZm9jdXMtaW5uZXJ8LW1vei1mb2N1c3Jpbmd8LW1zLWlucHV0LXBsYWNlaG9sZGVyfC1tb3otcmVhZC13cml0ZXwtbW96LXJlYWQtb25seXwtbXMtY2xlYXJ8LW1zLWV4cGFuZHwtbXMtcmV2ZWFsKXsvLnRlc3QocnVsZSkpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbnNlcnRpbmcgdGhlIGZvbGxvd2luZyBydWxlOiBcXFwiXCIgKyBydWxlICsgXCJcXFwiXCIsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShydWxlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jdHIrKztcbiAgfTtcblxuICBfcHJvdG8uZmx1c2ggPSBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB0aGlzLnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICB2YXIgX3RhZyRwYXJlbnROb2RlO1xuXG4gICAgICByZXR1cm4gKF90YWckcGFyZW50Tm9kZSA9IHRhZy5wYXJlbnROb2RlKSA9PSBudWxsID8gdm9pZCAwIDogX3RhZyRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZyk7XG4gICAgfSk7XG4gICAgdGhpcy50YWdzID0gW107XG4gICAgdGhpcy5jdHIgPSAwO1xuXG4gICAge1xuICAgICAgdGhpcy5fYWxyZWFkeUluc2VydGVkT3JkZXJJbnNlbnNpdGl2ZVJ1bGUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN0eWxlU2hlZXQ7XG59KCk7XG5cbmV4cG9ydCB7IFN0eWxlU2hlZXQgfTtcbiIsIi8vICoqIFJlYWN0IEltcG9ydFxuaW1wb3J0IHsgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCdcblxuLy8gKiogTmV4dCBJbXBvcnRcbmltcG9ydCBEb2N1bWVudCwgeyBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCdcblxuLy8gKiogRW1vdGlvbiBJbXBvcnRzXG5pbXBvcnQgY3JlYXRlRW1vdGlvblNlcnZlciBmcm9tICdAZW1vdGlvbi9zZXJ2ZXIvY3JlYXRlLWluc3RhbmNlJ1xuXG4vLyAqKiBVdGlscyBJbXBvcnRzXG5pbXBvcnQgeyBjcmVhdGVFbW90aW9uQ2FjaGUgfSBmcm9tICdzcmMvQGNvcmUvdXRpbHMvY3JlYXRlLWVtb3Rpb24tY2FjaGUnXG5cbmNsYXNzIEN1c3RvbURvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sIGxhbmc9J2VuJz5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPGxpbmsgcmVsPSdwcmVjb25uZWN0JyBocmVmPSdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tJyAvPlxuICAgICAgICAgIDxsaW5rIHJlbD0ncHJlY29ubmVjdCcgaHJlZj0naHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbScgLz5cbiAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgcmVsPSdzdHlsZXNoZWV0J1xuICAgICAgICAgICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDMwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwJ1xuICAgICAgICAgIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPSdhcHBsZS10b3VjaC1pY29uJyBzaXplcz0nMTgweDE4MCcgaHJlZj0nL2ltYWdlcy9sb2dvLnBuZycgLz5cbiAgICAgICAgICA8bGluayByZWw9J3Nob3J0Y3V0IGljb24nIGhyZWY9Jy9pbWFnZXMvbG9nby5wbmcnIC8+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L0h0bWw+XG4gICAgKVxuICB9XG59XG5DdXN0b21Eb2N1bWVudC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyBjdHggPT4ge1xuICBjb25zdCBvcmlnaW5hbFJlbmRlclBhZ2UgPSBjdHgucmVuZGVyUGFnZVxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUVtb3Rpb25DYWNoZSgpXG4gIGNvbnN0IHsgZXh0cmFjdENyaXRpY2FsVG9DaHVua3MgfSA9IGNyZWF0ZUVtb3Rpb25TZXJ2ZXIoY2FjaGUpXG4gIGN0eC5yZW5kZXJQYWdlID0gKCkgPT5cbiAgICBvcmlnaW5hbFJlbmRlclBhZ2Uoe1xuICAgICAgZW5oYW5jZUFwcDogQXBwID0+IHByb3BzID0+XG4gICAgICAgIChcbiAgICAgICAgICA8QXBwXG4gICAgICAgICAgICB7Li4ucHJvcHN9IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVtb3Rpb25DYWNoZT17Y2FjaGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH0pXG4gIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpXG4gIGNvbnN0IGVtb3Rpb25TdHlsZXMgPSBleHRyYWN0Q3JpdGljYWxUb0NodW5rcyhpbml0aWFsUHJvcHMuaHRtbClcblxuICBjb25zdCBlbW90aW9uU3R5bGVUYWdzID0gZW1vdGlvblN0eWxlcy5zdHlsZXMubWFwKHN0eWxlID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN0eWxlXG4gICAgICAgIGtleT17c3R5bGUua2V5fVxuICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlLmNzcyB9fVxuICAgICAgICBkYXRhLWVtb3Rpb249e2Ake3N0eWxlLmtleX0gJHtzdHlsZS5pZHMuam9pbignICcpfWB9XG4gICAgICAvPlxuICAgIClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIC4uLmluaXRpYWxQcm9wcyxcbiAgICBzdHlsZXM6IFsuLi5DaGlsZHJlbi50b0FycmF5KGluaXRpYWxQcm9wcy5zdHlsZXMpLCAuLi5lbW90aW9uU3R5bGVUYWdzXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbURvY3VtZW50XG4iLCJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSAnQHNlbnRyeS9uZXh0anMnO1xuaW1wb3J0ICogYXMgc2VydmVyQ29tcG9uZW50TW9kdWxlIGZyb20gJ19fU0VOVFJZX1dSQVBQSU5HX1RBUkdFVF9GSUxFX18uY2pzJztcbmV4cG9ydCAqIGZyb20gJ19fU0VOVFJZX1dSQVBQSU5HX1RBUkdFVF9GSUxFX18uY2pzJztcblxuLypcbiAqIFRoaXMgZmlsZSBpcyBhIHRlbXBsYXRlIGZvciB0aGUgY29kZSB3aGljaCB3aWxsIGJlIHN1YnN0aXR1dGVkIHdoZW4gb3VyIHdlYnBhY2sgbG9hZGVyIGhhbmRsZXMgbm9uLUFQSSBmaWxlcyBpbiB0aGVcbiAqIGBwYWdlcy9gIGRpcmVjdG9yeS5cbiAqXG4gKiBXZSB1c2UgYF9fU0VOVFJZX1dSQVBQSU5HX1RBUkdFVF9GSUxFX18uY2pzYCBhcyBhIHBsYWNlaG9sZGVyIGZvciB0aGUgcGF0aCB0byB0aGUgZmlsZSBiZWluZyB3cmFwcGVkLiBCZWNhdXNlIGl0J3Mgbm90IGEgcmVhbCBwYWNrYWdlLFxuICogdGhpcyBjYXVzZXMgYm90aCBUUyBhbmQgRVNMaW50IHRvIGNvbXBsYWluLCBoZW5jZSB0aGUgcHJhZ21hIGNvbW1lbnRzIGJlbG93LlxuICovXG5cblxuY29uc3QgdXNlclBhZ2VNb2R1bGUgPSBzZXJ2ZXJDb21wb25lbnRNb2R1bGUgO1xuXG5jb25zdCBwYWdlQ29tcG9uZW50ID0gdXNlclBhZ2VNb2R1bGUgPyB1c2VyUGFnZU1vZHVsZS5kZWZhdWx0IDogdW5kZWZpbmVkO1xuXG5jb25zdCBvcmlnR2V0SW5pdGlhbFByb3BzID0gcGFnZUNvbXBvbmVudCA/IHBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzIDogdW5kZWZpbmVkO1xuY29uc3Qgb3JpZ0dldFN0YXRpY1Byb3BzID0gdXNlclBhZ2VNb2R1bGUgPyB1c2VyUGFnZU1vZHVsZS5nZXRTdGF0aWNQcm9wcyA6IHVuZGVmaW5lZDtcbmNvbnN0IG9yaWdHZXRTZXJ2ZXJTaWRlUHJvcHMgPSB1c2VyUGFnZU1vZHVsZSA/IHVzZXJQYWdlTW9kdWxlLmdldFNlcnZlclNpZGVQcm9wcyA6IHVuZGVmaW5lZDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGdldEluaXRpYWxQcm9wc1dyYXBwZXJzID0ge1xuICAnL19hcHAnOiBTZW50cnkud3JhcEFwcEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG4gICcvX2RvY3VtZW50JzogU2VudHJ5LndyYXBEb2N1bWVudEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG4gICcvX2Vycm9yJzogU2VudHJ5LndyYXBFcnJvckdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG59O1xuXG5jb25zdCBnZXRJbml0aWFsUHJvcHNXcmFwcGVyID0gZ2V0SW5pdGlhbFByb3BzV3JhcHBlcnNbJy9fZG9jdW1lbnQnXSB8fCBTZW50cnkud3JhcEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnk7XG5cbmlmIChwYWdlQ29tcG9uZW50ICYmIHR5cGVvZiBvcmlnR2V0SW5pdGlhbFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gIHBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzID0gZ2V0SW5pdGlhbFByb3BzV3JhcHBlcihvcmlnR2V0SW5pdGlhbFByb3BzKSA7XG59XG5cbmNvbnN0IGdldFN0YXRpY1Byb3BzID1cbiAgdHlwZW9mIG9yaWdHZXRTdGF0aWNQcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gU2VudHJ5LndyYXBHZXRTdGF0aWNQcm9wc1dpdGhTZW50cnkob3JpZ0dldFN0YXRpY1Byb3BzLCAnL19kb2N1bWVudCcpXG4gICAgOiB1bmRlZmluZWQ7XG5jb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPVxuICB0eXBlb2Ygb3JpZ0dldFNlcnZlclNpZGVQcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gU2VudHJ5LndyYXBHZXRTZXJ2ZXJTaWRlUHJvcHNXaXRoU2VudHJ5KG9yaWdHZXRTZXJ2ZXJTaWRlUHJvcHMsICcvX2RvY3VtZW50JylcbiAgICA6IHVuZGVmaW5lZDtcblxuY29uc3QgcGFnZVdyYXBwZXJUZW1wbGF0ZSA9IHBhZ2VDb21wb25lbnQgPyBTZW50cnkud3JhcFBhZ2VDb21wb25lbnRXaXRoU2VudHJ5KHBhZ2VDb21wb25lbnQgKSA6IHBhZ2VDb21wb25lbnQ7XG5cbmV4cG9ydCB7IHBhZ2VXcmFwcGVyVGVtcGxhdGUgYXMgZGVmYXVsdCwgZ2V0U2VydmVyU2lkZVByb3BzLCBnZXRTdGF0aWNQcm9wcyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpbml0SGVhZE1hbmFnZXI7XG5leHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzID0gdm9pZCAwO1xuY29uc3QgRE9NQXR0cmlidXRlTmFtZXMgPSB7XG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBjbGFzc05hbWU6ICdjbGFzcycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgbm9Nb2R1bGU6ICdub01vZHVsZSdcbn07XG5leHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzID0gRE9NQXR0cmlidXRlTmFtZXM7XG5mdW5jdGlvbiByZWFjdEVsZW1lbnRUb0RPTSh7IHR5cGUgLCBwcm9wcyAgfSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IoY29uc3QgcCBpbiBwcm9wcyl7XG4gICAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkocCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAocCA9PT0gJ2NoaWxkcmVuJyB8fCBwID09PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSBjb250aW51ZTtcbiAgICAgICAgLy8gd2UgZG9uJ3QgcmVuZGVyIHVuZGVmaW5lZCBwcm9wcyB0byB0aGUgRE9NXG4gICAgICAgIGlmIChwcm9wc1twXSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgYXR0ciA9IERPTUF0dHJpYnV0ZU5hbWVzW3BdIHx8IHAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzY3JpcHQnICYmIChhdHRyID09PSAnYXN5bmMnIHx8IGF0dHIgPT09ICdkZWZlcicgfHwgYXR0ciA9PT0gJ25vTW9kdWxlJykpIHtcbiAgICAgICAgICAgIGVsW2F0dHJdID0gISFwcm9wc1twXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCBwcm9wc1twXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgeyBjaGlsZHJlbiAsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICB9ID0gcHJvcHM7XG4gICAgaWYgKGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbCB8fCAnJztcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IGNoaWxkcmVuIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbi5qb2luKCcnKSA6ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG59XG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50cyh0eXBlLCBjb21wb25lbnRzKSB7XG4gICAgY29uc3QgaGVhZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBoZWFkQ291bnRFbCA9IGhlYWRFbC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9bmV4dC1oZWFkLWNvdW50XScpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICghaGVhZENvdW50RWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IG5leHQtaGVhZC1jb3VudCBpcyBtaXNzaW5nLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWhlYWQtY291bnQtbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGhlYWRDb3VudCA9IE51bWJlcihoZWFkQ291bnRFbC5jb250ZW50KTtcbiAgICBjb25zdCBvbGRUYWdzID0gW107XG4gICAgZm9yKGxldCBpID0gMCwgaiA9IGhlYWRDb3VudEVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IGkgPCBoZWFkQ291bnQ7IGkrKywgaiA9IGoucHJldmlvdXNFbGVtZW50U2libGluZyl7XG4gICAgICAgIGlmIChqLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgb2xkVGFncy5wdXNoKGopO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5ld1RhZ3MgPSBjb21wb25lbnRzLm1hcChyZWFjdEVsZW1lbnRUb0RPTSkuZmlsdGVyKChuZXdUYWcpPT57XG4gICAgICAgIGZvcihsZXQgayA9IDAsIGxlbiA9IG9sZFRhZ3MubGVuZ3RoOyBrIDwgbGVuOyBrKyspe1xuICAgICAgICAgICAgY29uc3Qgb2xkVGFnID0gb2xkVGFnc1trXTtcbiAgICAgICAgICAgIGlmIChvbGRUYWcuaXNFcXVhbE5vZGUobmV3VGFnKSkge1xuICAgICAgICAgICAgICAgIG9sZFRhZ3Muc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBvbGRUYWdzLmZvckVhY2goKHQpPT50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodClcbiAgICApO1xuICAgIG5ld1RhZ3MuZm9yRWFjaCgodCk9PmhlYWRFbC5pbnNlcnRCZWZvcmUodCwgaGVhZENvdW50RWwpXG4gICAgKTtcbiAgICBoZWFkQ291bnRFbC5jb250ZW50ID0gKGhlYWRDb3VudCAtIG9sZFRhZ3MubGVuZ3RoICsgbmV3VGFncy5sZW5ndGgpLnRvU3RyaW5nKCk7XG59XG5mdW5jdGlvbiBpbml0SGVhZE1hbmFnZXIoKSB7XG4gICAgbGV0IHVwZGF0ZVByb21pc2UgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIG1vdW50ZWRJbnN0YW5jZXM6IG5ldyBTZXQoKSxcbiAgICAgICAgdXBkYXRlSGVhZDogKGhlYWQpPT57XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdXBkYXRlUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdXBkYXRlUHJvbWlzZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBoZWFkLmZvckVhY2goKGgpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmICgvLyBJZiB0aGUgZm9udCB0YWcgaXMgbG9hZGVkIG9ubHkgb24gY2xpZW50IG5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgd29uJ3QgYmUgaW5saW5lZC4gSW4gdGhpcyBjYXNlIHJldmVydCB0byB0aGUgb3JpZ2luYWwgYmVoYXZpb3JcbiAgICAgICAgICAgICAgICAgICAgaC50eXBlID09PSAnbGluaycgJiYgaC5wcm9wc1snZGF0YS1vcHRpbWl6ZWQtZm9udHMnXSAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3R5bGVbZGF0YS1ocmVmPVwiJHtoLnByb3BzWydkYXRhLWhyZWYnXX1cIl1gKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaC5wcm9wcy5ocmVmID0gaC5wcm9wc1snZGF0YS1ocmVmJ107XG4gICAgICAgICAgICAgICAgICAgICAgICBoLnByb3BzWydkYXRhLWhyZWYnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGFnc1toLnR5cGVdIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLnB1c2goaCk7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3NbaC50eXBlXSA9IGNvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVDb21wb25lbnQgPSB0YWdzLnRpdGxlID8gdGFncy50aXRsZVswXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gIH0gPSB0aXRsZUNvbXBvbmVudC5wcm9wcztcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gY2hpbGRyZW4gOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuLmpvaW4oJycpIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSAhPT0gZG9jdW1lbnQudGl0bGUpIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnbWV0YScsXG4gICAgICAgICAgICAgICAgICAgICdiYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmsnLFxuICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICAnc2NyaXB0J1xuICAgICAgICAgICAgICAgIF0uZm9yRWFjaCgodHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRWxlbWVudHModHlwZSwgdGFnc1t0eXBlXSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlYWQtbWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9IGV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gdm9pZCAwO1xuY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihjYikge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNiKHtcbiAgICAgICAgICAgIGRpZFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCAxKTtcbn07XG5leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrO1xuY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpO1xufTtcbmV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gY2FuY2VsSWRsZUNhbGxiYWNrO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmluaXRTY3JpcHRMb2FkZXIgPSBpbml0U2NyaXB0TG9hZGVyO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBfaGVhZE1hbmFnZXJDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHRcIik7XG52YXIgX2hlYWRNYW5hZ2VyID0gcmVxdWlyZShcIi4vaGVhZC1tYW5hZ2VyXCIpO1xudmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWlyZShcIi4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uKHN5bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xuICAgIH07XG4gICAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICAgIHZhciBrZXksIGk7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHtcbiAgICB9O1xuICAgIHZhciB0YXJnZXQgPSB7XG4gICAgfTtcbiAgICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgdmFyIGtleSwgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmNvbnN0IFNjcmlwdENhY2hlID0gbmV3IE1hcCgpO1xuY29uc3QgTG9hZENhY2hlID0gbmV3IFNldCgpO1xuY29uc3QgaWdub3JlUHJvcHMgPSBbXG4gICAgJ29uTG9hZCcsXG4gICAgJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyxcbiAgICAnY2hpbGRyZW4nLFxuICAgICdvbkVycm9yJyxcbiAgICAnc3RyYXRlZ3knLCBcbl07XG5jb25zdCBsb2FkU2NyaXB0ID0gKHByb3BzKT0+e1xuICAgIGNvbnN0IHsgc3JjICwgaWQgLCBvbkxvYWQgPSgpPT57XG4gICAgfSAsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICwgY2hpbGRyZW4gPScnICwgc3RyYXRlZ3kgPSdhZnRlckludGVyYWN0aXZlJyAsIG9uRXJyb3IgLCAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gaWQgfHwgc3JjO1xuICAgIC8vIFNjcmlwdCBoYXMgYWxyZWFkeSBsb2FkZWRcbiAgICBpZiAoY2FjaGVLZXkgJiYgTG9hZENhY2hlLmhhcyhjYWNoZUtleSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDb250ZW50cyBvZiB0aGlzIHNjcmlwdCBhcmUgYWxyZWFkeSBsb2FkaW5nL2xvYWRlZFxuICAgIGlmIChTY3JpcHRDYWNoZS5oYXMoc3JjKSkge1xuICAgICAgICBMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTtcbiAgICAgICAgLy8gRXhlY3V0ZSBvbkxvYWQgc2luY2UgdGhlIHNjcmlwdCBsb2FkaW5nIGhhcyBiZWd1blxuICAgICAgICBTY3JpcHRDYWNoZS5nZXQoc3JjKS50aGVuKG9uTG9hZCwgb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBjb25zdCBsb2FkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBpZiAob25Mb2FkKSB7XG4gICAgICAgICAgICAgICAgb25Mb2FkLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgb25FcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChzcmMpIHtcbiAgICAgICAgU2NyaXB0Q2FjaGUuc2V0KHNyYywgbG9hZFByb21pc2UpO1xuICAgIH1cbiAgICBMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTtcbiAgICBpZiAoZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpIHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sIHx8ICcnO1xuICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gY2hpbGRyZW4gOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuLmpvaW4oJycpIDogJyc7XG4gICAgfSBlbHNlIGlmIChzcmMpIHtcbiAgICAgICAgZWwuc3JjID0gc3JjO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKXtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgaWdub3JlUHJvcHMuaW5jbHVkZXMoaykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF0dHIgPSBfaGVhZE1hbmFnZXIuRE9NQXR0cmlidXRlTmFtZXNba10gfHwgay50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH1cbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbnNjcmlwdCcsIHN0cmF0ZWd5KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbn07XG5mdW5jdGlvbiBoYW5kbGVDbGllbnRTY3JpcHRMb2FkKHByb3BzKSB7XG4gICAgY29uc3QgeyBzdHJhdGVneSA9J2FmdGVySW50ZXJhY3RpdmUnICB9ID0gcHJvcHM7XG4gICAgaWYgKHN0cmF0ZWd5ID09PSAnYWZ0ZXJJbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgbG9hZFNjcmlwdChwcm9wcyk7XG4gICAgfSBlbHNlIGlmIChzdHJhdGVneSA9PT0gJ2xhenlPbmxvYWQnKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+bG9hZFNjcmlwdChwcm9wcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvYWRMYXp5U2NyaXB0KHByb3BzKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5sb2FkU2NyaXB0KHByb3BzKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+bG9hZFNjcmlwdChwcm9wcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTY3JpcHRMb2FkZXIoc2NyaXB0TG9hZGVySXRlbXMpIHtcbiAgICBzY3JpcHRMb2FkZXJJdGVtcy5mb3JFYWNoKGhhbmRsZUNsaWVudFNjcmlwdExvYWQpO1xufVxuZnVuY3Rpb24gU2NyaXB0KHByb3BzKSB7XG4gICAgY29uc3QgeyBzcmMgPScnICwgb25Mb2FkID0oKT0+e1xuICAgIH0gLCBkYW5nZXJvdXNseVNldElubmVySFRNTCAsIHN0cmF0ZWd5ID0nYWZ0ZXJJbnRlcmFjdGl2ZScgLCBvbkVycm9yICB9ID0gcHJvcHMsIHJlc3RQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wic3JjXCIsIFwib25Mb2FkXCIsIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiwgXCJzdHJhdGVneVwiLCBcIm9uRXJyb3JcIl0pO1xuICAgIC8vIENvbnRleHQgaXMgYXZhaWxhYmxlIG9ubHkgZHVyaW5nIFNTUlxuICAgIGNvbnN0IHsgdXBkYXRlU2NyaXB0cyAsIHNjcmlwdHMgLCBnZXRJc1NzciAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX2hlYWRNYW5hZ2VyQ29udGV4dC5IZWFkTWFuYWdlckNvbnRleHQpO1xuICAgICgwLCBfcmVhY3QpLnVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdhZnRlckludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgbG9hZFNjcmlwdChwcm9wcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyYXRlZ3kgPT09ICdsYXp5T25sb2FkJykge1xuICAgICAgICAgICAgbG9hZExhenlTY3JpcHQocHJvcHMpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgc3RyYXRlZ3lcbiAgICBdKTtcbiAgICBpZiAoc3RyYXRlZ3kgPT09ICdiZWZvcmVJbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgaWYgKHVwZGF0ZVNjcmlwdHMpIHtcbiAgICAgICAgICAgIHNjcmlwdHMuYmVmb3JlSW50ZXJhY3RpdmUgPSAoc2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZSB8fCBbXSkuY29uY2F0KFtcbiAgICAgICAgICAgICAgICBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgICAgICAgICBvbkxvYWQsXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3JcbiAgICAgICAgICAgICAgICB9LCByZXN0UHJvcHMpLCBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgdXBkYXRlU2NyaXB0cyhzY3JpcHRzKTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXRJc1NzciAmJiBnZXRJc1NzcigpKSB7XG4gICAgICAgICAgICAvLyBTY3JpcHQgaGFzIGFscmVhZHkgbG9hZGVkIGR1cmluZyBTU1JcbiAgICAgICAgICAgIExvYWRDYWNoZS5hZGQocmVzdFByb3BzLmlkIHx8IHNyYyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0SXNTc3IgJiYgIWdldElzU3NyKCkpIHtcbiAgICAgICAgICAgIGxvYWRTY3JpcHQocHJvcHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxudmFyIF9kZWZhdWx0ID0gU2NyaXB0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjcmlwdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRvY3VtZW50Q29udGV4dFwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3V0aWxzLkRvY3VtZW50Q29udGV4dDtcbiAgICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRvY3VtZW50SW5pdGlhbFByb3BzXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdXRpbHMuRG9jdW1lbnRJbml0aWFsUHJvcHM7XG4gICAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudFByb3BzXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdXRpbHMuRG9jdW1lbnRQcm9wcztcbiAgICB9XG59KTtcbmV4cG9ydHMuSHRtbCA9IEh0bWw7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3NlcnZlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInN0eWxlZC1qc3gvc2VydmVyXCIpKTtcbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvY29uc3RhbnRzXCIpO1xudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3V0aWxzXCIpO1xudmFyIF9nZXRQYWdlRmlsZXMgPSByZXF1aXJlKFwiLi4vc2VydmVyL2dldC1wYWdlLWZpbGVzXCIpO1xudmFyIF91dGlsczEgPSByZXF1aXJlKFwiLi4vc2VydmVyL3V0aWxzXCIpO1xudmFyIF9odG1sZXNjYXBlID0gcmVxdWlyZShcIi4uL3NlcnZlci9odG1sZXNjYXBlXCIpO1xudmFyIF9zY3JpcHQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9jbGllbnQvc2NyaXB0XCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICAgIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3T2JqID0ge1xuICAgICAgICB9O1xuICAgICAgICBpZiAob2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iail7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDoge1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ld09iai5kZWZhdWx0ID0gb2JqO1xuICAgICAgICByZXR1cm4gbmV3T2JqO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldERvY3VtZW50RmlsZXMoYnVpbGRNYW5pZmVzdCwgcGF0aG5hbWUsIGluQW1wTW9kZSkge1xuICAgIGNvbnN0IHNoYXJlZEZpbGVzID0gKDAsIF9nZXRQYWdlRmlsZXMpLmdldFBhZ2VGaWxlcyhidWlsZE1hbmlmZXN0LCAnL19hcHAnKTtcbiAgICBjb25zdCBwYWdlRmlsZXMgPSBpbkFtcE1vZGUgPyBbXSA6ICgwLCBfZ2V0UGFnZUZpbGVzKS5nZXRQYWdlRmlsZXMoYnVpbGRNYW5pZmVzdCwgcGF0aG5hbWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNoYXJlZEZpbGVzLFxuICAgICAgICBwYWdlRmlsZXMsXG4gICAgICAgIGFsbEZpbGVzOiBbXG4gICAgICAgICAgICAuLi5uZXcgU2V0KFtcbiAgICAgICAgICAgICAgICAuLi5zaGFyZWRGaWxlcyxcbiAgICAgICAgICAgICAgICAuLi5wYWdlRmlsZXNcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0UG9seWZpbGxTY3JpcHRzKGNvbnRleHQsIHByb3BzKSB7XG4gICAgLy8gcG9seWZpbGxzLmpzIGhhcyB0byBiZSByZW5kZXJlZCBhcyBub21vZHVsZSB3aXRob3V0IGFzeW5jXG4gICAgLy8gSXQgYWxzbyBoYXMgdG8gYmUgdGhlIGZpcnN0IHNjcmlwdCB0byBsb2FkXG4gICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGJ1aWxkTWFuaWZlc3QgLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAsIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICwgIH0gPSBjb250ZXh0O1xuICAgIHJldHVybiBidWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMuZmlsdGVyKChwb2x5ZmlsbCk9PnBvbHlmaWxsLmVuZHNXaXRoKCcuanMnKSAmJiAhcG9seWZpbGwuZW5kc1dpdGgoJy5tb2R1bGUuanMnKVxuICAgICkubWFwKChwb2x5ZmlsbCk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICBrZXk6IHBvbHlmaWxsLFxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcbiAgICAgICAgICAgIG5vbmNlOiBwcm9wcy5ub25jZSxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBwcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFxuICAgICAgICAgICAgbm9Nb2R1bGU6IHRydWUsXG4gICAgICAgICAgICBzcmM6IGAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke3BvbHlmaWxsfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YFxuICAgICAgICB9KVxuICAgICk7XG59XG5mdW5jdGlvbiBnZXRQcmVOZXh0U2NyaXB0cyhjb250ZXh0LCBwcm9wcykge1xuICAgIGNvbnN0IHsgc2NyaXB0TG9hZGVyICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgIH0gPSBjb250ZXh0O1xuICAgIHJldHVybiAoc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlIHx8IFtdKS5tYXAoKGZpbGUsIGluZGV4KT0+e1xuICAgICAgICBjb25zdCB7IHN0cmF0ZWd5ICwgLi4uc2NyaXB0UHJvcHMgfSA9IGZpbGU7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIH0sIHNjcmlwdFByb3BzLCB7XG4gICAgICAgICAgICBrZXk6IHNjcmlwdFByb3BzLnNyYyB8fCBpbmRleCxcbiAgICAgICAgICAgIGRlZmVyOiAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcsXG4gICAgICAgICAgICBub25jZTogcHJvcHMubm9uY2UsXG4gICAgICAgICAgICBcImRhdGEtbnNjcmlwdFwiOiBcImJlZm9yZUludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogcHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxuICAgICAgICB9KSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RHluYW1pY0NodW5rcyhjb250ZXh0LCBwcm9wcywgZmlsZXMpIHtcbiAgICBjb25zdCB7IGR5bmFtaWNJbXBvcnRzICwgYXNzZXRQcmVmaXggLCBpc0RldmVsb3BtZW50ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gY29udGV4dDtcbiAgICByZXR1cm4gZHluYW1pY0ltcG9ydHMubWFwKChmaWxlKT0+e1xuICAgICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5qcycpIHx8IGZpbGVzLmFsbEZpbGVzLmluY2x1ZGVzKGZpbGUpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICBhc3luYzogIWlzRGV2ZWxvcG1lbnQgJiYgZGlzYWJsZU9wdGltaXplZExvYWRpbmcsXG4gICAgICAgICAgICBkZWZlcjogIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxuICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxuICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0U2NyaXB0cyhjb250ZXh0LCBwcm9wcywgZmlsZXMpIHtcbiAgICB2YXIgcmVmO1xuICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBidWlsZE1hbmlmZXN0ICwgaXNEZXZlbG9wbWVudCAsIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgLCAgfSA9IGNvbnRleHQ7XG4gICAgY29uc3Qgbm9ybWFsU2NyaXB0cyA9IGZpbGVzLmFsbEZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuZW5kc1dpdGgoJy5qcycpXG4gICAgKTtcbiAgICBjb25zdCBsb3dQcmlvcml0eVNjcmlwdHMgPSAocmVmID0gYnVpbGRNYW5pZmVzdC5sb3dQcmlvcml0eUZpbGVzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZi5maWx0ZXIoKGZpbGUpPT5maWxlLmVuZHNXaXRoKCcuanMnKVxuICAgICk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4ubm9ybWFsU2NyaXB0cyxcbiAgICAgICAgLi4ubG93UHJpb3JpdHlTY3JpcHRzXG4gICAgXS5tYXAoKGZpbGUpPT57XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxuICAgICAgICAgICAgYXN5bmM6ICFpc0RldmVsb3BtZW50ICYmIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBwcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmNsYXNzIERvY3VtZW50MSBleHRlbmRzIF9yZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgKiBgZ2V0SW5pdGlhbFByb3BzYCBob29rIHJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0IHdpdGggdGhlIGFkZGl0aW9uIG9mIGByZW5kZXJQYWdlYC5cbiAgICogYHJlbmRlclBhZ2VgIGNhbGxiYWNrIGV4ZWN1dGVzIGBSZWFjdGAgcmVuZGVyaW5nIGxvZ2ljIHN5bmNocm9ub3VzbHkgdG8gc3VwcG9ydCBzZXJ2ZXItcmVuZGVyaW5nIHdyYXBwZXJzXG4gICAqLyBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCkge1xuICAgICAgICBjb25zdCBlbmhhbmNlQXBwID0gKEFwcCk9PntcbiAgICAgICAgICAgIHJldHVybiAocHJvcHMpPT4vKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQXBwLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICB9LCBwcm9wcykpXG4gICAgICAgICAgICA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHsgaHRtbCAsIGhlYWQgIH0gPSBhd2FpdCBjdHgucmVuZGVyUGFnZSh7XG4gICAgICAgICAgICBlbmhhbmNlQXBwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBbXG4gICAgICAgICAgICAuLi4oMCwgX3NlcnZlcikuZGVmYXVsdCgpXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgaGVhZCxcbiAgICAgICAgICAgIHN0eWxlc1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSHRtbCwgbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEhlYWQsIG51bGwpLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChNYWluLCBudWxsKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5leHRTY3JpcHQsIG51bGwpKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IERvY3VtZW50MTtcbmZ1bmN0aW9uIEh0bWwocHJvcHMpIHtcbiAgICBjb25zdCB7IGluQW1wTW9kZSAsIGRvY0NvbXBvbmVudHNSZW5kZXJlZCAsIGxvY2FsZSAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX3V0aWxzLkh0bWxDb250ZXh0KTtcbiAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQuSHRtbCA9IHRydWU7XG4gICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImh0bWxcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgfSwgcHJvcHMsIHtcbiAgICAgICAgbGFuZzogcHJvcHMubGFuZyB8fCBsb2NhbGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICBhbXA6IGluQW1wTW9kZSA/ICcnIDogdW5kZWZpbmVkLFxuICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiBpbkFtcE1vZGUgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICcnIDogdW5kZWZpbmVkXG4gICAgfSkpKTtcbn1cbmNsYXNzIEhlYWQgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZXRDc3NMaW5rcyhmaWxlcykge1xuICAgICAgICBjb25zdCB7IGFzc2V0UHJlZml4ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkeW5hbWljSW1wb3J0cyAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgY3NzRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGYpPT5mLmVuZHNXaXRoKCcuY3NzJylcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2hhcmVkRmlsZXMgPSBuZXcgU2V0KGZpbGVzLnNoYXJlZEZpbGVzKTtcbiAgICAgICAgLy8gVW5tYW5hZ2VkIGZpbGVzIGFyZSBDU1MgZmlsZXMgdGhhdCB3aWxsIGJlIGhhbmRsZWQgZGlyZWN0bHkgYnkgdGhlXG4gICAgICAgIC8vIHdlYnBhY2sgcnVudGltZSAoYG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luYCkuXG4gICAgICAgIGxldCB1bm1hbmdlZEZpbGVzID0gbmV3IFNldChbXSk7XG4gICAgICAgIGxldCBkeW5hbWljQ3NzRmlsZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZHluYW1pY0ltcG9ydHMuZmlsdGVyKChmaWxlKT0+ZmlsZS5lbmRzV2l0aCgnLmNzcycpXG4gICAgICAgICkpKTtcbiAgICAgICAgaWYgKGR5bmFtaWNDc3NGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3IFNldChjc3NGaWxlcyk7XG4gICAgICAgICAgICBkeW5hbWljQ3NzRmlsZXMgPSBkeW5hbWljQ3NzRmlsZXMuZmlsdGVyKChmKT0+IShleGlzdGluZy5oYXMoZikgfHwgc2hhcmVkRmlsZXMuaGFzKGYpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVubWFuZ2VkRmlsZXMgPSBuZXcgU2V0KGR5bmFtaWNDc3NGaWxlcyk7XG4gICAgICAgICAgICBjc3NGaWxlcy5wdXNoKC4uLmR5bmFtaWNDc3NGaWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNzc0xpbmtFbGVtZW50cyA9IFtdO1xuICAgICAgICBjc3NGaWxlcy5mb3JFYWNoKChmaWxlKT0+e1xuICAgICAgICAgICAgY29uc3QgaXNTaGFyZWRGaWxlID0gc2hhcmVkRmlsZXMuaGFzKGZpbGUpO1xuICAgICAgICAgICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKSB7XG4gICAgICAgICAgICAgICAgY3NzTGlua0VsZW1lbnRzLnB1c2goLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogYCR7ZmlsZX0tcHJlbG9hZGAsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgICAgICBhczogXCJzdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNVbm1hbmFnZWRGaWxlID0gdW5tYW5nZWRGaWxlcy5oYXMoZmlsZSk7XG4gICAgICAgICAgICBjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGZpbGUsXG4gICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXG4gICAgICAgICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICAgICAgXCJkYXRhLW4tZ1wiOiBpc1VubWFuYWdlZEZpbGUgPyB1bmRlZmluZWQgOiBpc1NoYXJlZEZpbGUgPyAnJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBcImRhdGEtbi1wXCI6IGlzVW5tYW5hZ2VkRmlsZSA/IHVuZGVmaW5lZCA6IGlzU2hhcmVkRmlsZSA/IHVuZGVmaW5lZCA6ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTKSB7XG4gICAgICAgICAgICBjc3NMaW5rRWxlbWVudHMgPSB0aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY3NzTGlua0VsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzTGlua0VsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBjc3NMaW5rRWxlbWVudHM7XG4gICAgfVxuICAgIGdldFByZWxvYWREeW5hbWljQ2h1bmtzKCkge1xuICAgICAgICBjb25zdCB7IGR5bmFtaWNJbXBvcnRzICwgYXNzZXRQcmVmaXggLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgcmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcCgoZmlsZSk9PntcbiAgICAgICAgICAgIGlmICghZmlsZS5lbmRzV2l0aCgnLmpzJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgIGtleTogZmlsZSxcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkvLyBGaWx0ZXIgb3V0IG51bGxlZCBzY3JpcHRzXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuICAgIGdldFByZWxvYWRNYWluTGlua3MoZmlsZXMpIHtcbiAgICAgICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nICwgc2NyaXB0TG9hZGVyICB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBwcmVsb2FkRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGZpbGUpPT57XG4gICAgICAgICAgICByZXR1cm4gZmlsZS5lbmRzV2l0aCgnLmpzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLi4uKHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZSB8fCBbXSkubWFwKChmaWxlKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogZmlsZS5zcmMsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBmaWxlLnNyYyxcbiAgICAgICAgICAgICAgICAgICAgYXM6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC4uLnByZWxvYWRGaWxlcy5tYXAoKGZpbGUpPT4vKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiBcInByZWxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgYXM6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSwgXG4gICAgICAgIF07XG4gICAgfVxuICAgIGdldER5bmFtaWNDaHVua3MoZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XG4gICAgfVxuICAgIGdldFByZU5leHRTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcbiAgICB9XG4gICAgZ2V0U2NyaXB0cyhmaWxlcykge1xuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcbiAgICB9XG4gICAgZ2V0UG9seWZpbGxTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIGhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMoY2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgeyBzY3JpcHRMb2FkZXIgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHNjcmlwdExvYWRlckl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBbXTtcbiAgICAgICAgX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKT0+e1xuICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IF9zY3JpcHQuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5zdHJhdGVneSA9PT0gJ2JlZm9yZUludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmUgPSAoc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlIHx8IFtdKS5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNoaWxkLnByb3BzXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFtcbiAgICAgICAgICAgICAgICAgICAgJ2xhenlPbmxvYWQnLFxuICAgICAgICAgICAgICAgICAgICAnYWZ0ZXJJbnRlcmFjdGl2ZSdcbiAgICAgICAgICAgICAgICBdLmluY2x1ZGVzKGNoaWxkLnByb3BzLnN0cmF0ZWd5KSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXJJdGVtcy5wdXNoKGNoaWxkLnByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlcmVkQ2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRleHQuX19ORVhUX0RBVEFfXy5zY3JpcHRMb2FkZXIgPSBzY3JpcHRMb2FkZXJJdGVtcztcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkQ2hpbGRyZW47XG4gICAgfVxuICAgIG1ha2VTdHlsZXNoZWV0SW5lcnQobm9kZSkge1xuICAgICAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKG5vZGUsIChjKT0+e1xuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ2xpbmsnICYmIGMucHJvcHNbJ2hyZWYnXSAmJiBfY29uc3RhbnRzLk9QVElNSVpFRF9GT05UX1BST1ZJREVSUy5zb21lKCh7IHVybCAgfSk9PmMucHJvcHNbJ2hyZWYnXS5zdGFydHNXaXRoKHVybClcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYy5wcm9wcyB8fCB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5ld1Byb3BzWydkYXRhLWhyZWYnXSA9IG5ld1Byb3BzWydocmVmJ107XG4gICAgICAgICAgICAgICAgbmV3UHJvcHNbJ2hyZWYnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoYywgbmV3UHJvcHMpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYy5wcm9wcyAmJiBjLnByb3BzWydjaGlsZHJlbiddKSB7XG4gICAgICAgICAgICAgICAgYy5wcm9wc1snY2hpbGRyZW4nXSA9IHRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjLnByb3BzWydjaGlsZHJlbiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHN0eWxlcyAsIGFtcFBhdGggLCBpbkFtcE1vZGUgLCBoeWJyaWRBbXAgLCBjYW5vbmljYWxCYXNlICwgX19ORVhUX0RBVEFfXyAsIGRhbmdlcm91c0FzUGF0aCAsIGhlYWRUYWdzICwgdW5zdGFibGVfcnVudGltZUpTICwgdW5zdGFibGVfSnNQcmVsb2FkICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgLCAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgZGlzYWJsZVJ1bnRpbWVKUyA9IHVuc3RhYmxlX3J1bnRpbWVKUyA9PT0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRpc2FibGVKc1ByZWxvYWQgPSB1bnN0YWJsZV9Kc1ByZWxvYWQgPT09IGZhbHNlIHx8ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZztcbiAgICAgICAgdGhpcy5jb250ZXh0LmRvY0NvbXBvbmVudHNSZW5kZXJlZC5IZWFkID0gdHJ1ZTtcbiAgICAgICAgbGV0IHsgaGVhZCAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgbGV0IGNzc1ByZWxvYWRzID0gW107XG4gICAgICAgIGxldCBvdGhlckhlYWRFbGVtZW50cyA9IFtdO1xuICAgICAgICBpZiAoaGVhZCkge1xuICAgICAgICAgICAgaGVhZC5mb3JFYWNoKChjKT0+e1xuICAgICAgICAgICAgICAgIGlmIChjICYmIGMudHlwZSA9PT0gJ2xpbmsnICYmIGMucHJvcHNbJ3JlbCddID09PSAncHJlbG9hZCcgJiYgYy5wcm9wc1snYXMnXSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgICAgICBjc3NQcmVsb2Fkcy5wdXNoKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGMgJiYgb3RoZXJIZWFkRWxlbWVudHMucHVzaChjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGhlYWQgPSBjc3NQcmVsb2Fkcy5jb25jYXQob3RoZXJIZWFkRWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAvLyBzaG93IGEgd2FybmluZyBpZiBIZWFkIGNvbnRhaW5zIDx0aXRsZT4gKG9ubHkgaW4gZGV2ZWxvcG1lbnQpXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKT0+e1xuICAgICAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZWFjdEhlbG1ldCA9IGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmID0gY2hpbGQucHJvcHMpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmWydkYXRhLXJlYWN0LWhlbG1ldCddO1xuICAgICAgICAgICAgICAgIGlmICghaXNSZWFjdEhlbG1ldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGQudHlwZSkgPT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IDx0aXRsZT4gc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbm8tZG9jdW1lbnQtdGl0bGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZC50eXBlKSA9PT0gJ21ldGEnICYmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogKHJlZjEgPSBjaGlsZC5wcm9wcykgPT09IG51bGwgfHwgcmVmMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmMS5uYW1lKSA9PT0gJ3ZpZXdwb3J0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogdmlld3BvcnQgbWV0YSB0YWdzIHNob3VsZCBub3QgYmUgdXNlZCBpbiBfZG9jdW1lbnQuanMncyA8SGVhZD4uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25vLWRvY3VtZW50LXZpZXdwb3J0LW1ldGFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jcm9zc09yaWdpbikgY29uc29sZS53YXJuKCdXYXJuaW5nOiBgSGVhZGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTICYmICFpbkFtcE1vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IHRoaXMuaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbik7XG4gICAgICAgIGxldCBoYXNBbXBodG1sUmVsID0gZmFsc2U7XG4gICAgICAgIGxldCBoYXNDYW5vbmljYWxSZWwgPSBmYWxzZTtcbiAgICAgICAgLy8gc2hvdyB3YXJuaW5nIGFuZCByZW1vdmUgY29uZmxpY3RpbmcgYW1wIGhlYWQgdGFnc1xuICAgICAgICBoZWFkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGhlYWQgfHwgW10sIChjaGlsZCk9PntcbiAgICAgICAgICAgIGlmICghY2hpbGQpIHJldHVybiBjaGlsZDtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSAsIHByb3BzICB9ID0gY2hpbGQ7XG4gICAgICAgICAgICBpZiAoaW5BbXBNb2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhZFByb3AgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ21ldGEnICYmIHByb3BzLm5hbWUgPT09ICd2aWV3cG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCA9ICduYW1lPVwidmlld3BvcnRcIic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbGluaycgJiYgcHJvcHMucmVsID09PSAnY2Fub25pY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBoYXNDYW5vbmljYWxSZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBibG9jayBpZlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBpdCBoYXMgYSBzcmMgYW5kIGlzbid0IHBvaW50aW5nIHRvIGFtcHByb2plY3QncyBDRE5cbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gaXQgaXMgdXNpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgd2l0aG91dCBhIHR5cGUgb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gYSB0eXBlIG9mIHRleHQvamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuc3JjICYmIHByb3BzLnNyYy5pbmRleE9mKCdhbXBwcm9qZWN0JykgPCAtMSB8fCBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAmJiAoIXByb3BzLnR5cGUgfHwgcHJvcHMudHlwZSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWRQcm9wID0gJzxzY3JpcHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCArPSBgICR7cHJvcH09XCIke3Byb3BzW3Byb3BdfVwiYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCArPSAnLz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChiYWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRm91bmQgY29uZmxpY3RpbmcgYW1wIHRhZyBcIiR7Y2hpbGQudHlwZX1cIiB3aXRoIGNvbmZsaWN0aW5nIHByb3AgJHtiYWRQcm9wfSBpbiAke19fTkVYVF9EQVRBX18ucGFnZX0uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2NvbmZsaWN0aW5nLWFtcC10YWdgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub24tYW1wIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2xpbmsnICYmIHByb3BzLnJlbCA9PT0gJ2FtcGh0bWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0FtcGh0bWxSZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRyeSB0byBwYXJzZSBzdHlsZXMgZnJvbSBmcmFnbWVudCBmb3IgYmFja3dhcmRzIGNvbXBhdFxuICAgICAgICBjb25zdCBjdXJTdHlsZXMgPSBBcnJheS5pc0FycmF5KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcbiAgICAgICAgaWYgKGluQW1wTW9kZSAmJiBzdHlsZXMgJiYgLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG4gICAgICAgIHN0eWxlcy5wcm9wcyAmJiAvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbiAgICAgICAgQXJyYXkuaXNBcnJheShzdHlsZXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBjb25zdCBoYXNTdHlsZXMgPSAoZWwpPT57XG4gICAgICAgICAgICAgICAgdmFyIHJlZjIsIHJlZjM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsID09PSBudWxsIHx8IGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMiA9IGVsLnByb3BzKSA9PT0gbnVsbCB8fCByZWYyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMyA9IHJlZjIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpID09PSBudWxsIHx8IHJlZjMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZjMuX19odG1sO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuICAgICAgICAgICAgc3R5bGVzLnByb3BzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5mb3JFYWNoKChlbCk9Pmhhc1N0eWxlcyhlbCkgJiYgY3VyU3R5bGVzLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNTdHlsZXMoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clN0eWxlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XG4gICAgICAgIHZhciBfbm9uY2UsIF9ub25jZTE7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB9LCB0aGlzLnByb3BzKSwgdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCB7XG4gICAgICAgICAgICBcImRhdGEtbmV4dC1oaWRlLWZvdWNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZGF0YS1hbXBkZXZtb2RlXCI6IGluQW1wTW9kZSA/ICd0cnVlJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXtkaXNwbGF5Om5vbmV9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgXCJkYXRhLW5leHQtaGlkZS1mb3VjXCI6IHRydWUsXG4gICAgICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiBpbkFtcE1vZGUgPyAndHJ1ZScgOiB1bmRlZmluZWRcbiAgICAgICAgfSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5e2Rpc3BsYXk6YmxvY2t9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpLCBjaGlsZHJlbiwgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwge1xuICAgICAgICAgICAgbmFtZTogXCJuZXh0LWZvbnQtcHJlY29ubmVjdFwiXG4gICAgICAgIH0pLCBoZWFkLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcbiAgICAgICAgICAgIG5hbWU6IFwibmV4dC1oZWFkLWNvdW50XCIsXG4gICAgICAgICAgICBjb250ZW50OiBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChoZWFkIHx8IFtdKS50b1N0cmluZygpXG4gICAgICAgIH0pLCBpbkFtcE1vZGUgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcbiAgICAgICAgICAgIG5hbWU6IFwidmlld3BvcnRcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwid2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTFcIlxuICAgICAgICB9KSwgIWhhc0Nhbm9uaWNhbFJlbCAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgIHJlbDogXCJjYW5vbmljYWxcIixcbiAgICAgICAgICAgIGhyZWY6IGNhbm9uaWNhbEJhc2UgKyAoMCwgX3V0aWxzMSkuY2xlYW5BbXBQYXRoKGRhbmdlcm91c0FzUGF0aClcbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICAgICAgcmVsOiBcInByZWxvYWRcIixcbiAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wiXG4gICAgICAgIH0pLCBzdHlsZXMgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgXCJhbXAtY3VzdG9tXCI6IFwiXCIsXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogY3VyU3R5bGVzLm1hcCgoc3R5bGUpPT5zdHlsZS5wcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWxcbiAgICAgICAgICAgICAgICApLmpvaW4oJycpLnJlcGxhY2UoL1xcL1xcKiMgc291cmNlTWFwcGluZ1VSTD0uKlxcKlxcLy9nLCAnJykucmVwbGFjZSgvXFwvXFwqQCBzb3VyY2VVUkw9Lio/XFwqXFwvL2csICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgXCJhbXAtYm9pbGVycGxhdGVcIjogXCJcIixcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIHtcbiAgICAgICAgICAgIFwiYW1wLWJvaWxlcnBsYXRlXCI6IFwiXCIsXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogYGJvZHl7LXdlYmtpdC1hbmltYXRpb246bm9uZTstbW96LWFuaW1hdGlvbjpub25lOy1tcy1hbmltYXRpb246bm9uZTthbmltYXRpb246bm9uZX1gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHtcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwLmpzXCJcbiAgICAgICAgfSkpLCAhaW5BbXBNb2RlICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgIWhhc0FtcGh0bWxSZWwgJiYgaHlicmlkQW1wICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICAgICAgcmVsOiBcImFtcGh0bWxcIixcbiAgICAgICAgICAgIGhyZWY6IGNhbm9uaWNhbEJhc2UgKyBnZXRBbXBQYXRoKGFtcFBhdGgsIGRhbmdlcm91c0FzUGF0aClcbiAgICAgICAgfSksICFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTICYmIHRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLCAhcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLCB7XG4gICAgICAgICAgICBcImRhdGEtbi1jc3NcIjogKF9ub25jZSA9IHRoaXMucHJvcHMubm9uY2UpICE9PSBudWxsICYmIF9ub25jZSAhPT0gdm9pZCAwID8gX25vbmNlIDogJydcbiAgICAgICAgfSksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9JTUFHRVMgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7XG4gICAgICAgICAgICBuYW1lOiBcIm5leHQtaW1hZ2UtcHJlbG9hZFwiXG4gICAgICAgIH0pLCAhZGlzYWJsZVJ1bnRpbWVKUyAmJiAhZGlzYWJsZUpzUHJlbG9hZCAmJiB0aGlzLmdldFByZWxvYWREeW5hbWljQ2h1bmtzKCksICFkaXNhYmxlUnVudGltZUpTICYmICFkaXNhYmxlSnNQcmVsb2FkICYmIHRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyksICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFBvbHlmaWxsU2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSwgIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICYmICFkaXNhYmxlUnVudGltZUpTICYmIHRoaXMuZ2V0U2NyaXB0cyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgdGhpcy5nZXRDc3NMaW5rcyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgXCJkYXRhLW4tY3NzXCI6IChfbm9uY2UxID0gdGhpcy5wcm9wcy5ub25jZSkgIT09IG51bGwgJiYgX25vbmNlMSAhPT0gdm9pZCAwID8gX25vbmNlMSA6ICcnXG4gICAgICAgIH0pLCB0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCAmJiAvLyB0aGlzIGVsZW1lbnQgaXMgdXNlZCB0byBtb3VudCBkZXZlbG9wbWVudCBzdHlsZXMgc28gdGhlXG4gICAgICAgIC8vIG9yZGVyaW5nIG1hdGNoZXMgcHJvZHVjdGlvblxuICAgICAgICAvLyAoYnkgZGVmYXVsdCwgc3R5bGUtbG9hZGVyIGluamVjdHMgYXQgdGhlIGJvdHRvbSBvZiA8aGVhZCAvPilcbiAgICAgICAgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgaWQ6IFwiX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fXCJcbiAgICAgICAgfSksIHN0eWxlcyB8fCBudWxsKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCB7XG4gICAgICAgIH0sIC4uLmhlYWRUYWdzIHx8IFtdKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuSGVhZCA9IEhlYWQ7XG5IZWFkLmNvbnRleHRUeXBlID0gX3V0aWxzLkh0bWxDb250ZXh0O1xuZnVuY3Rpb24gTWFpbigpIHtcbiAgICBjb25zdCB7IGluQW1wTW9kZSAsIGRvY0NvbXBvbmVudHNSZW5kZXJlZCAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX3V0aWxzLkh0bWxDb250ZXh0KTtcbiAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQuTWFpbiA9IHRydWU7XG4gICAgaWYgKGluQW1wTW9kZSkgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgX2NvbnN0YW50cy5CT0RZX1JFTkRFUl9UQVJHRVQpKTtcbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgaWQ6IFwiX19uZXh0XCJcbiAgICB9LCBfY29uc3RhbnRzLkJPRFlfUkVOREVSX1RBUkdFVCkpO1xufVxuY2xhc3MgTmV4dFNjcmlwdCBleHRlbmRzIF9yZWFjdC5Db21wb25lbnQge1xuICAgIGdldER5bmFtaWNDaHVua3MoZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XG4gICAgfVxuICAgIGdldFByZU5leHRTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcbiAgICB9XG4gICAgZ2V0U2NyaXB0cyhmaWxlcykge1xuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcbiAgICB9XG4gICAgZ2V0UG9seWZpbGxTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbmxpbmVTY3JpcHRTb3VyY2UoY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IF9fTkVYVF9EQVRBX18gIH0gPSBjb250ZXh0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KF9fTkVYVF9EQVRBX18pO1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfaHRtbGVzY2FwZSkuaHRtbEVzY2FwZUpzb25TdHJpbmcoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NpcmN1bGFyIHN0cnVjdHVyZScpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaXJjdWxhciBzdHJ1Y3R1cmUgaW4gXCJnZXRJbml0aWFsUHJvcHNcIiByZXN1bHQgb2YgcGFnZSBcIiR7X19ORVhUX0RBVEFfXy5wYWdlfVwiLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jaXJjdWxhci1zdHJ1Y3R1cmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBpbkFtcE1vZGUgLCBidWlsZE1hbmlmZXN0ICwgdW5zdGFibGVfcnVudGltZUpTICwgZG9jQ29tcG9uZW50c1JlbmRlcmVkICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBkaXNhYmxlUnVudGltZUpTID0gdW5zdGFibGVfcnVudGltZUpTID09PSBmYWxzZTtcbiAgICAgICAgZG9jQ29tcG9uZW50c1JlbmRlcmVkLk5leHRTY3JpcHQgPSB0cnVlO1xuICAgICAgICBpZiAoaW5BbXBNb2RlKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYW1wRGV2RmlsZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uYnVpbGRNYW5pZmVzdC5kZXZGaWxlcyxcbiAgICAgICAgICAgICAgICAuLi5idWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMsXG4gICAgICAgICAgICAgICAgLi4uYnVpbGRNYW5pZmVzdC5hbXBEZXZGaWxlcywgXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAgICAgIGlkOiBcIl9fTkVYVF9EQVRBX19cIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFxuICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJkYXRhLWFtcGRldm1vZGVcIjogdHJ1ZVxuICAgICAgICAgICAgfSksIGFtcERldkZpbGVzLm1hcCgoZmlsZSk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtmaWxlfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS1hbXBkZXZtb2RlXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jcm9zc09yaWdpbikgY29uc29sZS53YXJuKCdXYXJuaW5nOiBgTmV4dFNjcmlwdGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsICFkaXNhYmxlUnVudGltZUpTICYmIGJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMgPyBidWlsZE1hbmlmZXN0LmRldkZpbGVzLm1hcCgoZmlsZSk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICB9KVxuICAgICAgICApIDogbnVsbCwgZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAgaWQ6IFwiX19ORVhUX0RBVEFfX1wiLFxuICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQb2x5ZmlsbFNjcmlwdHMoKSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFNjcmlwdHMoZmlsZXMpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5OZXh0U2NyaXB0ID0gTmV4dFNjcmlwdDtcbk5leHRTY3JpcHQuY29udGV4dFR5cGUgPSBfdXRpbHMuSHRtbENvbnRleHQ7XG5OZXh0U2NyaXB0LnNhZmFyaU5vbW9kdWxlRml4ID0gJyFmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LHQ9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2lmKCEoXCJub01vZHVsZVwiaW4gdCkmJlwib25iZWZvcmVsb2FkXCJpbiB0KXt2YXIgbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVsb2FkXCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKFwibm9tb2R1bGVcIil8fCFuKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9LCEwKSx0LnR5cGU9XCJtb2R1bGVcIix0LnNyYz1cIi5cIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7JztcbmZ1bmN0aW9uIGdldEFtcFBhdGgoYW1wUGF0aCwgYXNQYXRoKSB7XG4gICAgcmV0dXJuIGFtcFBhdGggfHwgYCR7YXNQYXRofSR7YXNQYXRoLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPyd9YW1wPTFgO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1fZG9jdW1lbnQuanMubWFwIiwiaW1wb3J0IGNyZWF0ZUNhY2hlIGZyb20gJ0BlbW90aW9uL2NhY2hlJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRW1vdGlvbkNhY2hlID0gKCkgPT4ge1xuICByZXR1cm4gY3JlYXRlQ2FjaGUoeyBrZXk6ICdjc3MnIH0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fZG9jdW1lbnQnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGVtb3Rpb24vbWVtb2l6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAZW1vdGlvbi9zZXJ2ZXIvY3JlYXRlLWluc3RhbmNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBlbW90aW9uL3dlYWstbWVtb2l6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAc2VudHJ5L25leHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvaHRtbGVzY2FwZS5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL3V0aWxzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2NvbnN0YW50cy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLW1hbmFnZXItY29udGV4dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIik7IiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvRW51bS5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1V0aWxpdHkuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9QYXJzZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9QcmVmaXhlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1Rva2VuaXplci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1NlcmlhbGl6ZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9NaWRkbGV3YXJlLmpzJ1xuIiwiZXhwb3J0IHZhciBNUyA9ICctbXMtJ1xuZXhwb3J0IHZhciBNT1ogPSAnLW1vei0nXG5leHBvcnQgdmFyIFdFQktJVCA9ICctd2Via2l0LSdcblxuZXhwb3J0IHZhciBDT01NRU5UID0gJ2NvbW0nXG5leHBvcnQgdmFyIFJVTEVTRVQgPSAncnVsZSdcbmV4cG9ydCB2YXIgREVDTEFSQVRJT04gPSAnZGVjbCdcblxuZXhwb3J0IHZhciBQQUdFID0gJ0BwYWdlJ1xuZXhwb3J0IHZhciBNRURJQSA9ICdAbWVkaWEnXG5leHBvcnQgdmFyIElNUE9SVCA9ICdAaW1wb3J0J1xuZXhwb3J0IHZhciBDSEFSU0VUID0gJ0BjaGFyc2V0J1xuZXhwb3J0IHZhciBWSUVXUE9SVCA9ICdAdmlld3BvcnQnXG5leHBvcnQgdmFyIFNVUFBPUlRTID0gJ0BzdXBwb3J0cydcbmV4cG9ydCB2YXIgRE9DVU1FTlQgPSAnQGRvY3VtZW50J1xuZXhwb3J0IHZhciBOQU1FU1BBQ0UgPSAnQG5hbWVzcGFjZSdcbmV4cG9ydCB2YXIgS0VZRlJBTUVTID0gJ0BrZXlmcmFtZXMnXG5leHBvcnQgdmFyIEZPTlRfRkFDRSA9ICdAZm9udC1mYWNlJ1xuZXhwb3J0IHZhciBDT1VOVEVSX1NUWUxFID0gJ0Bjb3VudGVyLXN0eWxlJ1xuZXhwb3J0IHZhciBGT05UX0ZFQVRVUkVfVkFMVUVTID0gJ0Bmb250LWZlYXR1cmUtdmFsdWVzJ1xuZXhwb3J0IHZhciBMQVlFUiA9ICdAbGF5ZXInXG4iLCJpbXBvcnQge01TLCBNT1osIFdFQktJVCwgUlVMRVNFVCwgS0VZRlJBTUVTLCBERUNMQVJBVElPTn0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHttYXRjaCwgY2hhcmF0LCBzdWJzdHIsIHN0cmxlbiwgc2l6ZW9mLCByZXBsYWNlLCBjb21iaW5lfSBmcm9tICcuL1V0aWxpdHkuanMnXG5pbXBvcnQge2NvcHksIHRva2VuaXplfSBmcm9tICcuL1Rva2VuaXplci5qcydcbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL1NlcmlhbGl6ZXIuanMnXG5pbXBvcnQge3ByZWZpeH0gZnJvbSAnLi9QcmVmaXhlci5qcydcblxuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uW119IGNvbGxlY3Rpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZSAoY29sbGVjdGlvbikge1xuXHR2YXIgbGVuZ3RoID0gc2l6ZW9mKGNvbGxlY3Rpb24pXG5cblx0cmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCwgY2hpbGRyZW4sIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG91dHB1dCA9ICcnXG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHRcdFx0b3V0cHV0ICs9IGNvbGxlY3Rpb25baV0oZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykgfHwgJydcblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bGVzaGVldCAoY2FsbGJhY2spIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50LnJvb3QpXG5cdFx0XHRpZiAoZWxlbWVudCA9IGVsZW1lbnQucmV0dXJuKVxuXHRcdFx0XHRjYWxsYmFjayhlbGVtZW50KVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHtvYmplY3RbXX0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmaXhlciAoZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykge1xuXHRpZiAoZWxlbWVudC5sZW5ndGggPiAtMSlcblx0XHRpZiAoIWVsZW1lbnQucmV0dXJuKVxuXHRcdFx0c3dpdGNoIChlbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBERUNMQVJBVElPTjogZWxlbWVudC5yZXR1cm4gPSBwcmVmaXgoZWxlbWVudC52YWx1ZSwgZWxlbWVudC5sZW5ndGgsIGNoaWxkcmVuKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRjYXNlIEtFWUZSQU1FUzpcblx0XHRcdFx0XHRyZXR1cm4gc2VyaWFsaXplKFtjb3B5KGVsZW1lbnQsIHt2YWx1ZTogcmVwbGFjZShlbGVtZW50LnZhbHVlLCAnQCcsICdAJyArIFdFQktJVCl9KV0sIGNhbGxiYWNrKVxuXHRcdFx0XHRjYXNlIFJVTEVTRVQ6XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQubGVuZ3RoKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbWJpbmUoZWxlbWVudC5wcm9wcywgZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAobWF0Y2godmFsdWUsIC8oOjpwbGFjXFx3K3w6cmVhZC1cXHcrKS8pKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gOnJlYWQtKG9ubHl8d3JpdGUpXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnOnJlYWQtb25seSc6IGNhc2UgJzpyZWFkLXdyaXRlJzpcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBzZXJpYWxpemUoW2NvcHkoZWxlbWVudCwge3Byb3BzOiBbcmVwbGFjZSh2YWx1ZSwgLzoocmVhZC1cXHcrKS8sICc6JyArIE1PWiArICckMScpXX0pXSwgY2FsbGJhY2spXG5cdFx0XHRcdFx0XHRcdFx0Ly8gOnBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnOjpwbGFjZWhvbGRlcic6XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2VyaWFsaXplKFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29weShlbGVtZW50LCB7cHJvcHM6IFtyZXBsYWNlKHZhbHVlLCAvOihwbGFjXFx3KykvLCAnOicgKyBXRUJLSVQgKyAnaW5wdXQtJDEnKV19KSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29weShlbGVtZW50LCB7cHJvcHM6IFtyZXBsYWNlKHZhbHVlLCAvOihwbGFjXFx3KykvLCAnOicgKyBNT1ogKyAnJDEnKV19KSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29weShlbGVtZW50LCB7cHJvcHM6IFtyZXBsYWNlKHZhbHVlLCAvOihwbGFjXFx3KykvLCBNUyArICdpbnB1dC0kMScpXX0pXG5cdFx0XHRcdFx0XHRcdFx0XHRdLCBjYWxsYmFjaylcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybiAnJ1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge29iamVjdFtdfSBjaGlsZHJlblxuICovXG5leHBvcnQgZnVuY3Rpb24gbmFtZXNwYWNlIChlbGVtZW50KSB7XG5cdHN3aXRjaCAoZWxlbWVudC50eXBlKSB7XG5cdFx0Y2FzZSBSVUxFU0VUOlxuXHRcdFx0ZWxlbWVudC5wcm9wcyA9IGVsZW1lbnQucHJvcHMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gY29tYmluZSh0b2tlbml6ZSh2YWx1ZSksIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChjaGFyYXQodmFsdWUsIDApKSB7XG5cdFx0XHRcdFx0XHQvLyBcXGZcblx0XHRcdFx0XHRcdGNhc2UgMTI6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdWJzdHIodmFsdWUsIDEsIHN0cmxlbih2YWx1ZSkpXG5cdFx0XHRcdFx0XHQvLyBcXDAgKCArID4gflxuXHRcdFx0XHRcdFx0Y2FzZSAwOiBjYXNlIDQwOiBjYXNlIDQzOiBjYXNlIDYyOiBjYXNlIDEyNjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdFx0XHQvLyA6XG5cdFx0XHRcdFx0XHRjYXNlIDU4OlxuXHRcdFx0XHRcdFx0XHRpZiAoY2hpbGRyZW5bKytpbmRleF0gPT09ICdnbG9iYWwnKVxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuW2luZGV4XSA9ICcnLCBjaGlsZHJlblsrK2luZGV4XSA9ICdcXGYnICsgc3Vic3RyKGNoaWxkcmVuW2luZGV4XSwgaW5kZXggPSAxLCAtMSlcblx0XHRcdFx0XHRcdC8vIFxcc1xuXHRcdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGluZGV4ID09PSAxID8gJycgOiB2YWx1ZVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChpbmRleCkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMDogZWxlbWVudCA9IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2l6ZW9mKGNoaWxkcmVuKSA+IDEgPyAnJyA6IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBpbmRleCA9IHNpemVvZihjaGlsZHJlbikgLSAxOiBjYXNlIDI6XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5kZXggPT09IDIgPyB2YWx1ZSArIGVsZW1lbnQgKyBlbGVtZW50IDogdmFsdWUgKyBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0fVxufVxuIiwiaW1wb3J0IHtDT01NRU5ULCBSVUxFU0VULCBERUNMQVJBVElPTn0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHthYnMsIGNoYXJhdCwgdHJpbSwgZnJvbSwgc2l6ZW9mLCBzdHJsZW4sIHN1YnN0ciwgYXBwZW5kLCByZXBsYWNlLCBpbmRleG9mfSBmcm9tICcuL1V0aWxpdHkuanMnXG5pbXBvcnQge25vZGUsIGNoYXIsIHByZXYsIG5leHQsIHBlZWssIGNhcmV0LCBhbGxvYywgZGVhbGxvYywgZGVsaW1pdCwgd2hpdGVzcGFjZSwgZXNjYXBpbmcsIGlkZW50aWZpZXIsIGNvbW1lbnRlcn0gZnJvbSAnLi9Ub2tlbml6ZXIuanMnXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtvYmplY3RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGUgKHZhbHVlKSB7XG5cdHJldHVybiBkZWFsbG9jKHBhcnNlKCcnLCBudWxsLCBudWxsLCBudWxsLCBbJyddLCB2YWx1ZSA9IGFsbG9jKHZhbHVlKSwgMCwgWzBdLCB2YWx1ZSkpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdFxuICogQHBhcmFtIHtvYmplY3Q/fSBwYXJlbnRcbiAqIEBwYXJhbSB7c3RyaW5nW119IHJ1bGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IHJ1bGVzXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBydWxlc2V0c1xuICogQHBhcmFtIHtudW1iZXJbXX0gcHNldWRvXG4gKiBAcGFyYW0ge251bWJlcltdfSBwb2ludHNcbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlY2xhcmF0aW9uc1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UgKHZhbHVlLCByb290LCBwYXJlbnQsIHJ1bGUsIHJ1bGVzLCBydWxlc2V0cywgcHNldWRvLCBwb2ludHMsIGRlY2xhcmF0aW9ucykge1xuXHR2YXIgaW5kZXggPSAwXG5cdHZhciBvZmZzZXQgPSAwXG5cdHZhciBsZW5ndGggPSBwc2V1ZG9cblx0dmFyIGF0cnVsZSA9IDBcblx0dmFyIHByb3BlcnR5ID0gMFxuXHR2YXIgcHJldmlvdXMgPSAwXG5cdHZhciB2YXJpYWJsZSA9IDFcblx0dmFyIHNjYW5uaW5nID0gMVxuXHR2YXIgYW1wZXJzYW5kID0gMVxuXHR2YXIgY2hhcmFjdGVyID0gMFxuXHR2YXIgdHlwZSA9ICcnXG5cdHZhciBwcm9wcyA9IHJ1bGVzXG5cdHZhciBjaGlsZHJlbiA9IHJ1bGVzZXRzXG5cdHZhciByZWZlcmVuY2UgPSBydWxlXG5cdHZhciBjaGFyYWN0ZXJzID0gdHlwZVxuXG5cdHdoaWxlIChzY2FubmluZylcblx0XHRzd2l0Y2ggKHByZXZpb3VzID0gY2hhcmFjdGVyLCBjaGFyYWN0ZXIgPSBuZXh0KCkpIHtcblx0XHRcdC8vIChcblx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdGlmIChwcmV2aW91cyAhPSAxMDggJiYgY2hhcmF0KGNoYXJhY3RlcnMsIGxlbmd0aCAtIDEpID09IDU4KSB7XG5cdFx0XHRcdFx0aWYgKGluZGV4b2YoY2hhcmFjdGVycyArPSByZXBsYWNlKGRlbGltaXQoY2hhcmFjdGVyKSwgJyYnLCAnJlxcZicpLCAnJlxcZicpICE9IC0xKVxuXHRcdFx0XHRcdFx0YW1wZXJzYW5kID0gLTFcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHQvLyBcIiAnIFtcblx0XHRcdGNhc2UgMzQ6IGNhc2UgMzk6IGNhc2UgOTE6XG5cdFx0XHRcdGNoYXJhY3RlcnMgKz0gZGVsaW1pdChjaGFyYWN0ZXIpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHQvLyBcXHQgXFxuIFxcciBcXHNcblx0XHRcdGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMzogY2FzZSAzMjpcblx0XHRcdFx0Y2hhcmFjdGVycyArPSB3aGl0ZXNwYWNlKHByZXZpb3VzKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Ly8gXFxcblx0XHRcdGNhc2UgOTI6XG5cdFx0XHRcdGNoYXJhY3RlcnMgKz0gZXNjYXBpbmcoY2FyZXQoKSAtIDEsIDcpXG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHQvLyAvXG5cdFx0XHRjYXNlIDQ3OlxuXHRcdFx0XHRzd2l0Y2ggKHBlZWsoKSkge1xuXHRcdFx0XHRcdGNhc2UgNDI6IGNhc2UgNDc6XG5cdFx0XHRcdFx0XHRhcHBlbmQoY29tbWVudChjb21tZW50ZXIobmV4dCgpLCBjYXJldCgpKSwgcm9vdCwgcGFyZW50KSwgZGVjbGFyYXRpb25zKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y2hhcmFjdGVycyArPSAnLydcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Ly8ge1xuXHRcdFx0Y2FzZSAxMjMgKiB2YXJpYWJsZTpcblx0XHRcdFx0cG9pbnRzW2luZGV4KytdID0gc3RybGVuKGNoYXJhY3RlcnMpICogYW1wZXJzYW5kXG5cdFx0XHQvLyB9IDsgXFwwXG5cdFx0XHRjYXNlIDEyNSAqIHZhcmlhYmxlOiBjYXNlIDU5OiBjYXNlIDA6XG5cdFx0XHRcdHN3aXRjaCAoY2hhcmFjdGVyKSB7XG5cdFx0XHRcdFx0Ly8gXFwwIH1cblx0XHRcdFx0XHRjYXNlIDA6IGNhc2UgMTI1OiBzY2FubmluZyA9IDBcblx0XHRcdFx0XHQvLyA7XG5cdFx0XHRcdFx0Y2FzZSA1OSArIG9mZnNldDogaWYgKGFtcGVyc2FuZCA9PSAtMSkgY2hhcmFjdGVycyA9IHJlcGxhY2UoY2hhcmFjdGVycywgL1xcZi9nLCAnJylcblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eSA+IDAgJiYgKHN0cmxlbihjaGFyYWN0ZXJzKSAtIGxlbmd0aCkpXG5cdFx0XHRcdFx0XHRcdGFwcGVuZChwcm9wZXJ0eSA+IDMyID8gZGVjbGFyYXRpb24oY2hhcmFjdGVycyArICc7JywgcnVsZSwgcGFyZW50LCBsZW5ndGggLSAxKSA6IGRlY2xhcmF0aW9uKHJlcGxhY2UoY2hhcmFjdGVycywgJyAnLCAnJykgKyAnOycsIHJ1bGUsIHBhcmVudCwgbGVuZ3RoIC0gMiksIGRlY2xhcmF0aW9ucylcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly8gQCA7XG5cdFx0XHRcdFx0Y2FzZSA1OTogY2hhcmFjdGVycyArPSAnOydcblx0XHRcdFx0XHQvLyB7IHJ1bGUvYXQtcnVsZVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhcHBlbmQocmVmZXJlbmNlID0gcnVsZXNldChjaGFyYWN0ZXJzLCByb290LCBwYXJlbnQsIGluZGV4LCBvZmZzZXQsIHJ1bGVzLCBwb2ludHMsIHR5cGUsIHByb3BzID0gW10sIGNoaWxkcmVuID0gW10sIGxlbmd0aCksIHJ1bGVzZXRzKVxuXG5cdFx0XHRcdFx0XHRpZiAoY2hhcmFjdGVyID09PSAxMjMpXG5cdFx0XHRcdFx0XHRcdGlmIChvZmZzZXQgPT09IDApXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2UoY2hhcmFjdGVycywgcm9vdCwgcmVmZXJlbmNlLCByZWZlcmVuY2UsIHByb3BzLCBydWxlc2V0cywgbGVuZ3RoLCBwb2ludHMsIGNoaWxkcmVuKVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChhdHJ1bGUgPT09IDk5ICYmIGNoYXJhdChjaGFyYWN0ZXJzLCAzKSA9PT0gMTEwID8gMTAwIDogYXRydWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBkIGwgbSBzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDEwMDogY2FzZSAxMDg6IGNhc2UgMTA5OiBjYXNlIDExNTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFyc2UodmFsdWUsIHJlZmVyZW5jZSwgcmVmZXJlbmNlLCBydWxlICYmIGFwcGVuZChydWxlc2V0KHZhbHVlLCByZWZlcmVuY2UsIHJlZmVyZW5jZSwgMCwgMCwgcnVsZXMsIHBvaW50cywgdHlwZSwgcnVsZXMsIHByb3BzID0gW10sIGxlbmd0aCksIGNoaWxkcmVuKSwgcnVsZXMsIGNoaWxkcmVuLCBsZW5ndGgsIHBvaW50cywgcnVsZSA/IHByb3BzIDogY2hpbGRyZW4pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXJzZShjaGFyYWN0ZXJzLCByZWZlcmVuY2UsIHJlZmVyZW5jZSwgcmVmZXJlbmNlLCBbJyddLCBjaGlsZHJlbiwgMCwgcG9pbnRzLCBjaGlsZHJlbilcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmRleCA9IG9mZnNldCA9IHByb3BlcnR5ID0gMCwgdmFyaWFibGUgPSBhbXBlcnNhbmQgPSAxLCB0eXBlID0gY2hhcmFjdGVycyA9ICcnLCBsZW5ndGggPSBwc2V1ZG9cblx0XHRcdFx0YnJlYWtcblx0XHRcdC8vIDpcblx0XHRcdGNhc2UgNTg6XG5cdFx0XHRcdGxlbmd0aCA9IDEgKyBzdHJsZW4oY2hhcmFjdGVycyksIHByb3BlcnR5ID0gcHJldmlvdXNcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh2YXJpYWJsZSA8IDEpXG5cdFx0XHRcdFx0aWYgKGNoYXJhY3RlciA9PSAxMjMpXG5cdFx0XHRcdFx0XHQtLXZhcmlhYmxlXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2hhcmFjdGVyID09IDEyNSAmJiB2YXJpYWJsZSsrID09IDAgJiYgcHJldigpID09IDEyNSlcblx0XHRcdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdFx0c3dpdGNoIChjaGFyYWN0ZXJzICs9IGZyb20oY2hhcmFjdGVyKSwgY2hhcmFjdGVyICogdmFyaWFibGUpIHtcblx0XHRcdFx0XHQvLyAmXG5cdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdGFtcGVyc2FuZCA9IG9mZnNldCA+IDAgPyAxIDogKGNoYXJhY3RlcnMgKz0gJ1xcZicsIC0xKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvLyAsXG5cdFx0XHRcdFx0Y2FzZSA0NDpcblx0XHRcdFx0XHRcdHBvaW50c1tpbmRleCsrXSA9IChzdHJsZW4oY2hhcmFjdGVycykgLSAxKSAqIGFtcGVyc2FuZCwgYW1wZXJzYW5kID0gMVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvLyBAXG5cdFx0XHRcdFx0Y2FzZSA2NDpcblx0XHRcdFx0XHRcdC8vIC1cblx0XHRcdFx0XHRcdGlmIChwZWVrKCkgPT09IDQ1KVxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXJzICs9IGRlbGltaXQobmV4dCgpKVxuXG5cdFx0XHRcdFx0XHRhdHJ1bGUgPSBwZWVrKCksIG9mZnNldCA9IGxlbmd0aCA9IHN0cmxlbih0eXBlID0gY2hhcmFjdGVycyArPSBpZGVudGlmaWVyKGNhcmV0KCkpKSwgY2hhcmFjdGVyKytcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly8gLVxuXHRcdFx0XHRcdGNhc2UgNDU6XG5cdFx0XHRcdFx0XHRpZiAocHJldmlvdXMgPT09IDQ1ICYmIHN0cmxlbihjaGFyYWN0ZXJzKSA9PSAyKVxuXHRcdFx0XHRcdFx0XHR2YXJpYWJsZSA9IDBcblx0XHRcdFx0fVxuXHRcdH1cblxuXHRyZXR1cm4gcnVsZXNldHNcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290XG4gKiBAcGFyYW0ge29iamVjdD99IHBhcmVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBydWxlc1xuICogQHBhcmFtIHtudW1iZXJbXX0gcG9pbnRzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNoaWxkcmVuXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydWxlc2V0ICh2YWx1ZSwgcm9vdCwgcGFyZW50LCBpbmRleCwgb2Zmc2V0LCBydWxlcywgcG9pbnRzLCB0eXBlLCBwcm9wcywgY2hpbGRyZW4sIGxlbmd0aCkge1xuXHR2YXIgcG9zdCA9IG9mZnNldCAtIDFcblx0dmFyIHJ1bGUgPSBvZmZzZXQgPT09IDAgPyBydWxlcyA6IFsnJ11cblx0dmFyIHNpemUgPSBzaXplb2YocnVsZSlcblxuXHRmb3IgKHZhciBpID0gMCwgaiA9IDAsIGsgPSAwOyBpIDwgaW5kZXg7ICsraSlcblx0XHRmb3IgKHZhciB4ID0gMCwgeSA9IHN1YnN0cih2YWx1ZSwgcG9zdCArIDEsIHBvc3QgPSBhYnMoaiA9IHBvaW50c1tpXSkpLCB6ID0gdmFsdWU7IHggPCBzaXplOyArK3gpXG5cdFx0XHRpZiAoeiA9IHRyaW0oaiA+IDAgPyBydWxlW3hdICsgJyAnICsgeSA6IHJlcGxhY2UoeSwgLyZcXGYvZywgcnVsZVt4XSkpKVxuXHRcdFx0XHRwcm9wc1trKytdID0gelxuXG5cdHJldHVybiBub2RlKHZhbHVlLCByb290LCBwYXJlbnQsIG9mZnNldCA9PT0gMCA/IFJVTEVTRVQgOiB0eXBlLCBwcm9wcywgY2hpbGRyZW4sIGxlbmd0aClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290XG4gKiBAcGFyYW0ge29iamVjdD99IHBhcmVudFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWVudCAodmFsdWUsIHJvb3QsIHBhcmVudCkge1xuXHRyZXR1cm4gbm9kZSh2YWx1ZSwgcm9vdCwgcGFyZW50LCBDT01NRU5ULCBmcm9tKGNoYXIoKSksIHN1YnN0cih2YWx1ZSwgMiwgLTIpLCAwKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IHJvb3RcbiAqIEBwYXJhbSB7b2JqZWN0P30gcGFyZW50XG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNsYXJhdGlvbiAodmFsdWUsIHJvb3QsIHBhcmVudCwgbGVuZ3RoKSB7XG5cdHJldHVybiBub2RlKHZhbHVlLCByb290LCBwYXJlbnQsIERFQ0xBUkFUSU9OLCBzdWJzdHIodmFsdWUsIDAsIGxlbmd0aCksIHN1YnN0cih2YWx1ZSwgbGVuZ3RoICsgMSwgLTEpLCBsZW5ndGgpXG59XG4iLCJpbXBvcnQge01TLCBNT1osIFdFQktJVH0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHtoYXNoLCBjaGFyYXQsIHN0cmxlbiwgaW5kZXhvZiwgcmVwbGFjZSwgc3Vic3RyLCBtYXRjaH0gZnJvbSAnLi9VdGlsaXR5LmpzJ1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHBhcmFtIHtvYmplY3RbXX0gY2hpbGRyZW5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZWZpeCAodmFsdWUsIGxlbmd0aCwgY2hpbGRyZW4pIHtcblx0c3dpdGNoIChoYXNoKHZhbHVlLCBsZW5ndGgpKSB7XG5cdFx0Ly8gY29sb3ItYWRqdXN0XG5cdFx0Y2FzZSA1MTAzOlxuXHRcdFx0cmV0dXJuIFdFQktJVCArICdwcmludC0nICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIGFuaW1hdGlvbiwgYW5pbWF0aW9uLShkZWxheXxkaXJlY3Rpb258ZHVyYXRpb258ZmlsbC1tb2RlfGl0ZXJhdGlvbi1jb3VudHxuYW1lfHBsYXktc3RhdGV8dGltaW5nLWZ1bmN0aW9uKVxuXHRcdGNhc2UgNTczNzogY2FzZSA0MjAxOiBjYXNlIDMxNzc6IGNhc2UgMzQzMzogY2FzZSAxNjQxOiBjYXNlIDQ0NTc6IGNhc2UgMjkyMTpcblx0XHQvLyB0ZXh0LWRlY29yYXRpb24sIGZpbHRlciwgY2xpcC1wYXRoLCBiYWNrZmFjZS12aXNpYmlsaXR5LCBjb2x1bW4sIGJveC1kZWNvcmF0aW9uLWJyZWFrXG5cdFx0Y2FzZSA1NTcyOiBjYXNlIDYzNTY6IGNhc2UgNTg0NDogY2FzZSAzMTkxOiBjYXNlIDY2NDU6IGNhc2UgMzAwNTpcblx0XHQvLyBtYXNrLCBtYXNrLWltYWdlLCBtYXNrLShtb2RlfGNsaXB8c2l6ZSksIG1hc2stKHJlcGVhdHxvcmlnaW4pLCBtYXNrLXBvc2l0aW9uLCBtYXNrLWNvbXBvc2l0ZSxcblx0XHRjYXNlIDYzOTE6IGNhc2UgNTg3OTogY2FzZSA1NjIzOiBjYXNlIDYxMzU6IGNhc2UgNDU5OTogY2FzZSA0ODU1OlxuXHRcdC8vIGJhY2tncm91bmQtY2xpcCwgY29sdW1ucywgY29sdW1uLShjb3VudHxmaWxsfGdhcHxydWxlfHJ1bGUtY29sb3J8cnVsZS1zdHlsZXxydWxlLXdpZHRofHNwYW58d2lkdGgpXG5cdFx0Y2FzZSA0MjE1OiBjYXNlIDYzODk6IGNhc2UgNTEwOTogY2FzZSA1MzY1OiBjYXNlIDU2MjE6IGNhc2UgMzgyOTpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIHZhbHVlXG5cdFx0Ly8gdGFiLXNpemVcblx0XHRjYXNlIDQ3ODk6XG5cdFx0XHRyZXR1cm4gTU9aICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIGFwcGVhcmFuY2UsIHVzZXItc2VsZWN0LCB0cmFuc2Zvcm0sIGh5cGhlbnMsIHRleHQtc2l6ZS1hZGp1c3Rcblx0XHRjYXNlIDUzNDk6IGNhc2UgNDI0NjogY2FzZSA0ODEwOiBjYXNlIDY5Njg6IGNhc2UgMjc1Njpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1PWiArIHZhbHVlICsgTVMgKyB2YWx1ZSArIHZhbHVlXG5cdFx0Ly8gd3JpdGluZy1tb2RlXG5cdFx0Y2FzZSA1OTM2OlxuXHRcdFx0c3dpdGNoIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDExKSkge1xuXHRcdFx0XHQvLyB2ZXJ0aWNhbC1sKHIpXG5cdFx0XHRcdGNhc2UgMTE0OlxuXHRcdFx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgcmVwbGFjZSh2YWx1ZSwgL1tzdmhdXFx3Ky1bdGJscl17Mn0vLCAndGInKSArIHZhbHVlXG5cdFx0XHRcdC8vIHZlcnRpY2FsLXIobClcblx0XHRcdFx0Y2FzZSAxMDg6XG5cdFx0XHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sICd0Yi1ybCcpICsgdmFsdWVcblx0XHRcdFx0Ly8gaG9yaXpvbnRhbCgtKXRiXG5cdFx0XHRcdGNhc2UgNDU6XG5cdFx0XHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sICdscicpICsgdmFsdWVcblx0XHRcdFx0Ly8gZGVmYXVsdDogZmFsbHRocm91Z2ggdG8gYmVsb3dcblx0XHRcdH1cblx0XHQvLyBmbGV4LCBmbGV4LWRpcmVjdGlvbiwgc2Nyb2xsLXNuYXAtdHlwZSwgd3JpdGluZy1tb2RlXG5cdFx0Y2FzZSA2ODI4OiBjYXNlIDQyNjg6IGNhc2UgMjkwMzpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIG9yZGVyXG5cdFx0Y2FzZSA2MTY1OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyAnZmxleC0nICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIGFsaWduLWl0ZW1zXG5cdFx0Y2FzZSA1MTg3OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgcmVwbGFjZSh2YWx1ZSwgLyhcXHcrKS4rKDpbXl0rKS8sIFdFQktJVCArICdib3gtJDEkMicgKyBNUyArICdmbGV4LSQxJDInKSArIHZhbHVlXG5cdFx0Ly8gYWxpZ24tc2VsZlxuXHRcdGNhc2UgNTQ0Mzpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgJ2ZsZXgtaXRlbS0nICsgcmVwbGFjZSh2YWx1ZSwgL2ZsZXgtfC1zZWxmL2csICcnKSArICghbWF0Y2godmFsdWUsIC9mbGV4LXxiYXNlbGluZS8pID8gTVMgKyAnZ3JpZC1yb3ctJyArIHJlcGxhY2UodmFsdWUsIC9mbGV4LXwtc2VsZi9nLCAnJykgOiAnJykgKyB2YWx1ZVxuXHRcdC8vIGFsaWduLWNvbnRlbnRcblx0XHRjYXNlIDQ2NzU6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArICdmbGV4LWxpbmUtcGFjaycgKyByZXBsYWNlKHZhbHVlLCAvYWxpZ24tY29udGVudHxmbGV4LXwtc2VsZi9nLCAnJykgKyB2YWx1ZVxuXHRcdC8vIGZsZXgtc2hyaW5rXG5cdFx0Y2FzZSA1NTQ4OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAnc2hyaW5rJywgJ25lZ2F0aXZlJykgKyB2YWx1ZVxuXHRcdC8vIGZsZXgtYmFzaXNcblx0XHRjYXNlIDUyOTI6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsICdiYXNpcycsICdwcmVmZXJyZWQtc2l6ZScpICsgdmFsdWVcblx0XHQvLyBmbGV4LWdyb3dcblx0XHRjYXNlIDYwNjA6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgJ2JveC0nICsgcmVwbGFjZSh2YWx1ZSwgJy1ncm93JywgJycpICsgV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsICdncm93JywgJ3Bvc2l0aXZlJykgKyB2YWx1ZVxuXHRcdC8vIHRyYW5zaXRpb25cblx0XHRjYXNlIDQ1NTQ6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgcmVwbGFjZSh2YWx1ZSwgLyhbXi1dKSh0cmFuc2Zvcm0pL2csICckMScgKyBXRUJLSVQgKyAnJDInKSArIHZhbHVlXG5cdFx0Ly8gY3Vyc29yXG5cdFx0Y2FzZSA2MTg3OlxuXHRcdFx0cmV0dXJuIHJlcGxhY2UocmVwbGFjZShyZXBsYWNlKHZhbHVlLCAvKHpvb20tfGdyYWIpLywgV0VCS0lUICsgJyQxJyksIC8oaW1hZ2Utc2V0KS8sIFdFQktJVCArICckMScpLCB2YWx1ZSwgJycpICsgdmFsdWVcblx0XHQvLyBiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kLWltYWdlXG5cdFx0Y2FzZSA1NDk1OiBjYXNlIDM5NTk6XG5cdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyhpbWFnZS1zZXRcXChbXl0qKS8sIFdFQktJVCArICckMScgKyAnJGAkMScpXG5cdFx0Ly8ganVzdGlmeS1jb250ZW50XG5cdFx0Y2FzZSA0OTY4OlxuXHRcdFx0cmV0dXJuIHJlcGxhY2UocmVwbGFjZSh2YWx1ZSwgLyguKzopKGZsZXgtKT8oLiopLywgV0VCS0lUICsgJ2JveC1wYWNrOiQzJyArIE1TICsgJ2ZsZXgtcGFjazokMycpLCAvcy4rLWJbXjtdKy8sICdqdXN0aWZ5JykgKyBXRUJLSVQgKyB2YWx1ZSArIHZhbHVlXG5cdFx0Ly8ganVzdGlmeS1zZWxmXG5cdFx0Y2FzZSA0MjAwOlxuXHRcdFx0aWYgKCFtYXRjaCh2YWx1ZSwgL2ZsZXgtfGJhc2VsaW5lLykpIHJldHVybiBNUyArICdncmlkLWNvbHVtbi1hbGlnbicgKyBzdWJzdHIodmFsdWUsIGxlbmd0aCkgKyB2YWx1ZVxuXHRcdFx0YnJlYWtcblx0XHQvLyBncmlkLXRlbXBsYXRlLShjb2x1bW5zfHJvd3MpXG5cdFx0Y2FzZSAyNTkyOiBjYXNlIDMzNjA6XG5cdFx0XHRyZXR1cm4gTVMgKyByZXBsYWNlKHZhbHVlLCAndGVtcGxhdGUtJywgJycpICsgdmFsdWVcblx0XHQvLyBncmlkLShyb3d8Y29sdW1uKS1zdGFydFxuXHRcdGNhc2UgNDM4NDogY2FzZSAzNjE2OlxuXHRcdFx0aWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7IHJldHVybiBsZW5ndGggPSBpbmRleCwgbWF0Y2goZWxlbWVudC5wcm9wcywgL2dyaWQtXFx3Ky1lbmQvKSB9KSkge1xuXHRcdFx0XHRyZXR1cm4gfmluZGV4b2YodmFsdWUgKyAoY2hpbGRyZW4gPSBjaGlsZHJlbltsZW5ndGhdLnZhbHVlKSwgJ3NwYW4nKSA/IHZhbHVlIDogKE1TICsgcmVwbGFjZSh2YWx1ZSwgJy1zdGFydCcsICcnKSArIHZhbHVlICsgTVMgKyAnZ3JpZC1yb3ctc3BhbjonICsgKH5pbmRleG9mKGNoaWxkcmVuLCAnc3BhbicpID8gbWF0Y2goY2hpbGRyZW4sIC9cXGQrLykgOiArbWF0Y2goY2hpbGRyZW4sIC9cXGQrLykgLSArbWF0Y2godmFsdWUsIC9cXGQrLykpICsgJzsnKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE1TICsgcmVwbGFjZSh2YWx1ZSwgJy1zdGFydCcsICcnKSArIHZhbHVlXG5cdFx0Ly8gZ3JpZC0ocm93fGNvbHVtbiktZW5kXG5cdFx0Y2FzZSA0ODk2OiBjYXNlIDQxMjg6XG5cdFx0XHRyZXR1cm4gKGNoaWxkcmVuICYmIGNoaWxkcmVuLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG1hdGNoKGVsZW1lbnQucHJvcHMsIC9ncmlkLVxcdystc3RhcnQvKSB9KSkgPyB2YWx1ZSA6IE1TICsgcmVwbGFjZShyZXBsYWNlKHZhbHVlLCAnLWVuZCcsICctc3BhbicpLCAnc3BhbiAnLCAnJykgKyB2YWx1ZVxuXHRcdC8vIChtYXJnaW58cGFkZGluZyktaW5saW5lLShzdGFydHxlbmQpXG5cdFx0Y2FzZSA0MDk1OiBjYXNlIDM1ODM6IGNhc2UgNDA2ODogY2FzZSAyNTMyOlxuXHRcdFx0cmV0dXJuIHJlcGxhY2UodmFsdWUsIC8oLispLWlubGluZSguKykvLCBXRUJLSVQgKyAnJDEkMicpICsgdmFsdWVcblx0XHQvLyAobWlufG1heCk/KHdpZHRofGhlaWdodHxpbmxpbmUtc2l6ZXxibG9jay1zaXplKVxuXHRcdGNhc2UgODExNjogY2FzZSA3MDU5OiBjYXNlIDU3NTM6IGNhc2UgNTUzNTpcblx0XHRjYXNlIDU0NDU6IGNhc2UgNTcwMTogY2FzZSA0OTMzOiBjYXNlIDQ2Nzc6XG5cdFx0Y2FzZSA1NTMzOiBjYXNlIDU3ODk6IGNhc2UgNTAyMTogY2FzZSA0NzY1OlxuXHRcdFx0Ly8gc3RyZXRjaCwgbWF4LWNvbnRlbnQsIG1pbi1jb250ZW50LCBmaWxsLWF2YWlsYWJsZVxuXHRcdFx0aWYgKHN0cmxlbih2YWx1ZSkgLSAxIC0gbGVuZ3RoID4gNilcblx0XHRcdFx0c3dpdGNoIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDEpKSB7XG5cdFx0XHRcdFx0Ly8gKG0pYXgtY29udGVudCwgKG0paW4tY29udGVudFxuXHRcdFx0XHRcdGNhc2UgMTA5OlxuXHRcdFx0XHRcdFx0Ly8gLVxuXHRcdFx0XHRcdFx0aWYgKGNoYXJhdCh2YWx1ZSwgbGVuZ3RoICsgNCkgIT09IDQ1KVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdC8vIChmKWlsbC1hdmFpbGFibGUsIChmKWl0LWNvbnRlbnRcblx0XHRcdFx0XHRjYXNlIDEwMjpcblx0XHRcdFx0XHRcdHJldHVybiByZXBsYWNlKHZhbHVlLCAvKC4rOikoLispLShbXl0rKS8sICckMScgKyBXRUJLSVQgKyAnJDItJDMnICsgJyQxJyArIE1PWiArIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDMpID09IDEwOCA/ICckMycgOiAnJDItJDMnKSkgKyB2YWx1ZVxuXHRcdFx0XHRcdC8vIChzKXRyZXRjaFxuXHRcdFx0XHRcdGNhc2UgMTE1OlxuXHRcdFx0XHRcdFx0cmV0dXJuIH5pbmRleG9mKHZhbHVlLCAnc3RyZXRjaCcpID8gcHJlZml4KHJlcGxhY2UodmFsdWUsICdzdHJldGNoJywgJ2ZpbGwtYXZhaWxhYmxlJyksIGxlbmd0aCwgY2hpbGRyZW4pICsgdmFsdWUgOiB2YWx1ZVxuXHRcdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdC8vIGdyaWQtKGNvbHVtbnxyb3cpXG5cdFx0Y2FzZSA1MTUyOiBjYXNlIDU5MjA6XG5cdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyguKz8pOihcXGQrKShcXHMqXFwvXFxzKihzcGFuKT9cXHMqKFxcZCspKT8oLiopLywgZnVuY3Rpb24gKF8sIGEsIGIsIGMsIGQsIGUsIGYpIHsgcmV0dXJuIChNUyArIGEgKyAnOicgKyBiICsgZikgKyAoYyA/IChNUyArIGEgKyAnLXNwYW46JyArIChkID8gZSA6ICtlIC0gK2IpKSArIGYgOiAnJykgKyB2YWx1ZSB9KVxuXHRcdC8vIHBvc2l0aW9uOiBzdGlja3lcblx0XHRjYXNlIDQ5NDk6XG5cdFx0XHQvLyBzdGljayh5KT9cblx0XHRcdGlmIChjaGFyYXQodmFsdWUsIGxlbmd0aCArIDYpID09PSAxMjEpXG5cdFx0XHRcdHJldHVybiByZXBsYWNlKHZhbHVlLCAnOicsICc6JyArIFdFQktJVCkgKyB2YWx1ZVxuXHRcdFx0YnJlYWtcblx0XHQvLyBkaXNwbGF5OiAoZmxleHxpbmxpbmUtZmxleHxncmlkfGlubGluZS1ncmlkKVxuXHRcdGNhc2UgNjQ0NDpcblx0XHRcdHN3aXRjaCAoY2hhcmF0KHZhbHVlLCBjaGFyYXQodmFsdWUsIDE0KSA9PT0gNDUgPyAxOCA6IDExKSkge1xuXHRcdFx0XHQvLyAoaW5saW5lLSk/ZmxlKHgpXG5cdFx0XHRcdGNhc2UgMTIwOlxuXHRcdFx0XHRcdHJldHVybiByZXBsYWNlKHZhbHVlLCAvKC4rOikoW147XFxzIV0rKSg7fChcXHMrKT8hLispPy8sICckMScgKyBXRUJLSVQgKyAoY2hhcmF0KHZhbHVlLCAxNCkgPT09IDQ1ID8gJ2lubGluZS0nIDogJycpICsgJ2JveCQzJyArICckMScgKyBXRUJLSVQgKyAnJDIkMycgKyAnJDEnICsgTVMgKyAnJDJib3gkMycpICsgdmFsdWVcblx0XHRcdFx0Ly8gKGlubGluZS0pP2dyaShkKVxuXHRcdFx0XHRjYXNlIDEwMDpcblx0XHRcdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgJzonLCAnOicgKyBNUykgKyB2YWx1ZVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHQvLyBzY3JvbGwtbWFyZ2luLCBzY3JvbGwtbWFyZ2luLSh0b3B8cmlnaHR8Ym90dG9tfGxlZnQpXG5cdFx0Y2FzZSA1NzE5OiBjYXNlIDI2NDc6IGNhc2UgMjEzNTogY2FzZSAzOTI3OiBjYXNlIDIzOTE6XG5cdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgJ3Njcm9sbC0nLCAnc2Nyb2xsLXNuYXAtJykgKyB2YWx1ZVxuXHR9XG5cblx0cmV0dXJuIHZhbHVlXG59XG4iLCJpbXBvcnQge0lNUE9SVCwgTEFZRVIsIENPTU1FTlQsIFJVTEVTRVQsIERFQ0xBUkFUSU9OLCBLRVlGUkFNRVN9IGZyb20gJy4vRW51bS5qcydcbmltcG9ydCB7c3RybGVuLCBzaXplb2Z9IGZyb20gJy4vVXRpbGl0eS5qcydcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdFtdfSBjaGlsZHJlblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZSAoY2hpbGRyZW4sIGNhbGxiYWNrKSB7XG5cdHZhciBvdXRwdXQgPSAnJ1xuXHR2YXIgbGVuZ3RoID0gc2l6ZW9mKGNoaWxkcmVuKVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG5cdFx0b3V0cHV0ICs9IGNhbGxiYWNrKGNoaWxkcmVuW2ldLCBpLCBjaGlsZHJlbiwgY2FsbGJhY2spIHx8ICcnXG5cblx0cmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7b2JqZWN0W119IGNoaWxkcmVuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5IChlbGVtZW50LCBpbmRleCwgY2hpbGRyZW4sIGNhbGxiYWNrKSB7XG5cdHN3aXRjaCAoZWxlbWVudC50eXBlKSB7XG5cdFx0Y2FzZSBMQVlFUjogaWYgKGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSBicmVha1xuXHRcdGNhc2UgSU1QT1JUOiBjYXNlIERFQ0xBUkFUSU9OOiByZXR1cm4gZWxlbWVudC5yZXR1cm4gPSBlbGVtZW50LnJldHVybiB8fCBlbGVtZW50LnZhbHVlXG5cdFx0Y2FzZSBDT01NRU5UOiByZXR1cm4gJydcblx0XHRjYXNlIEtFWUZSQU1FUzogcmV0dXJuIGVsZW1lbnQucmV0dXJuID0gZWxlbWVudC52YWx1ZSArICd7JyArIHNlcmlhbGl6ZShlbGVtZW50LmNoaWxkcmVuLCBjYWxsYmFjaykgKyAnfSdcblx0XHRjYXNlIFJVTEVTRVQ6IGVsZW1lbnQudmFsdWUgPSBlbGVtZW50LnByb3BzLmpvaW4oJywnKVxuXHR9XG5cblx0cmV0dXJuIHN0cmxlbihjaGlsZHJlbiA9IHNlcmlhbGl6ZShlbGVtZW50LmNoaWxkcmVuLCBjYWxsYmFjaykpID8gZWxlbWVudC5yZXR1cm4gPSBlbGVtZW50LnZhbHVlICsgJ3snICsgY2hpbGRyZW4gKyAnfScgOiAnJ1xufVxuIiwiaW1wb3J0IHtmcm9tLCB0cmltLCBjaGFyYXQsIHN0cmxlbiwgc3Vic3RyLCBhcHBlbmQsIGFzc2lnbn0gZnJvbSAnLi9VdGlsaXR5LmpzJ1xuXG5leHBvcnQgdmFyIGxpbmUgPSAxXG5leHBvcnQgdmFyIGNvbHVtbiA9IDFcbmV4cG9ydCB2YXIgbGVuZ3RoID0gMFxuZXhwb3J0IHZhciBwb3NpdGlvbiA9IDBcbmV4cG9ydCB2YXIgY2hhcmFjdGVyID0gMFxuZXhwb3J0IHZhciBjaGFyYWN0ZXJzID0gJydcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0IHwgbnVsbH0gcm9vdFxuICogQHBhcmFtIHtvYmplY3QgfCBudWxsfSBwYXJlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ1tdIHwgc3RyaW5nfSBwcm9wc1xuICogQHBhcmFtIHtvYmplY3RbXSB8IHN0cmluZ30gY2hpbGRyZW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vZGUgKHZhbHVlLCByb290LCBwYXJlbnQsIHR5cGUsIHByb3BzLCBjaGlsZHJlbiwgbGVuZ3RoKSB7XG5cdHJldHVybiB7dmFsdWU6IHZhbHVlLCByb290OiByb290LCBwYXJlbnQ6IHBhcmVudCwgdHlwZTogdHlwZSwgcHJvcHM6IHByb3BzLCBjaGlsZHJlbjogY2hpbGRyZW4sIGxpbmU6IGxpbmUsIGNvbHVtbjogY29sdW1uLCBsZW5ndGg6IGxlbmd0aCwgcmV0dXJuOiAnJ31cbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdFxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5IChyb290LCBwcm9wcykge1xuXHRyZXR1cm4gYXNzaWduKG5vZGUoJycsIG51bGwsIG51bGwsICcnLCBudWxsLCBudWxsLCAwKSwgcm9vdCwge2xlbmd0aDogLXJvb3QubGVuZ3RofSwgcHJvcHMpXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhciAoKSB7XG5cdHJldHVybiBjaGFyYWN0ZXJcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ICgpIHtcblx0Y2hhcmFjdGVyID0gcG9zaXRpb24gPiAwID8gY2hhcmF0KGNoYXJhY3RlcnMsIC0tcG9zaXRpb24pIDogMFxuXG5cdGlmIChjb2x1bW4tLSwgY2hhcmFjdGVyID09PSAxMClcblx0XHRjb2x1bW4gPSAxLCBsaW5lLS1cblxuXHRyZXR1cm4gY2hhcmFjdGVyXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dCAoKSB7XG5cdGNoYXJhY3RlciA9IHBvc2l0aW9uIDwgbGVuZ3RoID8gY2hhcmF0KGNoYXJhY3RlcnMsIHBvc2l0aW9uKyspIDogMFxuXG5cdGlmIChjb2x1bW4rKywgY2hhcmFjdGVyID09PSAxMClcblx0XHRjb2x1bW4gPSAxLCBsaW5lKytcblxuXHRyZXR1cm4gY2hhcmFjdGVyXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVlayAoKSB7XG5cdHJldHVybiBjaGFyYXQoY2hhcmFjdGVycywgcG9zaXRpb24pXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FyZXQgKCkge1xuXHRyZXR1cm4gcG9zaXRpb25cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gYmVnaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG5cdHJldHVybiBzdWJzdHIoY2hhcmFjdGVycywgYmVnaW4sIGVuZClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW4gKHR5cGUpIHtcblx0c3dpdGNoICh0eXBlKSB7XG5cdFx0Ly8gXFwwIFxcdCBcXG4gXFxyIFxccyB3aGl0ZXNwYWNlIHRva2VuXG5cdFx0Y2FzZSAwOiBjYXNlIDk6IGNhc2UgMTA6IGNhc2UgMTM6IGNhc2UgMzI6XG5cdFx0XHRyZXR1cm4gNVxuXHRcdC8vICEgKyAsIC8gPiBAIH4gaXNvbGF0ZSB0b2tlblxuXHRcdGNhc2UgMzM6IGNhc2UgNDM6IGNhc2UgNDQ6IGNhc2UgNDc6IGNhc2UgNjI6IGNhc2UgNjQ6IGNhc2UgMTI2OlxuXHRcdC8vIDsgeyB9IGJyZWFrcG9pbnQgdG9rZW5cblx0XHRjYXNlIDU5OiBjYXNlIDEyMzogY2FzZSAxMjU6XG5cdFx0XHRyZXR1cm4gNFxuXHRcdC8vIDogYWNjb21wYW5pZWQgdG9rZW5cblx0XHRjYXNlIDU4OlxuXHRcdFx0cmV0dXJuIDNcblx0XHQvLyBcIiAnICggWyBvcGVuaW5nIGRlbGltaXQgdG9rZW5cblx0XHRjYXNlIDM0OiBjYXNlIDM5OiBjYXNlIDQwOiBjYXNlIDkxOlxuXHRcdFx0cmV0dXJuIDJcblx0XHQvLyApIF0gY2xvc2luZyBkZWxpbWl0IHRva2VuXG5cdFx0Y2FzZSA0MTogY2FzZSA5Mzpcblx0XHRcdHJldHVybiAxXG5cdH1cblxuXHRyZXR1cm4gMFxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxvYyAodmFsdWUpIHtcblx0cmV0dXJuIGxpbmUgPSBjb2x1bW4gPSAxLCBsZW5ndGggPSBzdHJsZW4oY2hhcmFjdGVycyA9IHZhbHVlKSwgcG9zaXRpb24gPSAwLCBbXVxufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVhbGxvYyAodmFsdWUpIHtcblx0cmV0dXJuIGNoYXJhY3RlcnMgPSAnJywgdmFsdWVcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsaW1pdCAodHlwZSkge1xuXHRyZXR1cm4gdHJpbShzbGljZShwb3NpdGlvbiAtIDEsIGRlbGltaXRlcih0eXBlID09PSA5MSA/IHR5cGUgKyAyIDogdHlwZSA9PT0gNDAgPyB0eXBlICsgMSA6IHR5cGUpKSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemUgKHZhbHVlKSB7XG5cdHJldHVybiBkZWFsbG9jKHRva2VuaXplcihhbGxvYyh2YWx1ZSkpKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGl0ZXNwYWNlICh0eXBlKSB7XG5cdHdoaWxlIChjaGFyYWN0ZXIgPSBwZWVrKCkpXG5cdFx0aWYgKGNoYXJhY3RlciA8IDMzKVxuXHRcdFx0bmV4dCgpXG5cdFx0ZWxzZVxuXHRcdFx0YnJlYWtcblxuXHRyZXR1cm4gdG9rZW4odHlwZSkgPiAyIHx8IHRva2VuKGNoYXJhY3RlcikgPiAzID8gJycgOiAnICdcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjaGlsZHJlblxuICogQHJldHVybiB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZXIgKGNoaWxkcmVuKSB7XG5cdHdoaWxlIChuZXh0KCkpXG5cdFx0c3dpdGNoICh0b2tlbihjaGFyYWN0ZXIpKSB7XG5cdFx0XHRjYXNlIDA6IGFwcGVuZChpZGVudGlmaWVyKHBvc2l0aW9uIC0gMSksIGNoaWxkcmVuKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOiBhcHBlbmQoZGVsaW1pdChjaGFyYWN0ZXIpLCBjaGlsZHJlbilcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6IGFwcGVuZChmcm9tKGNoYXJhY3RlciksIGNoaWxkcmVuKVxuXHRcdH1cblxuXHRyZXR1cm4gY2hpbGRyZW5cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBpbmcgKGluZGV4LCBjb3VudCkge1xuXHR3aGlsZSAoLS1jb3VudCAmJiBuZXh0KCkpXG5cdFx0Ly8gbm90IDAtOSBBLUYgYS1mXG5cdFx0aWYgKGNoYXJhY3RlciA8IDQ4IHx8IGNoYXJhY3RlciA+IDEwMiB8fCAoY2hhcmFjdGVyID4gNTcgJiYgY2hhcmFjdGVyIDwgNjUpIHx8IChjaGFyYWN0ZXIgPiA3MCAmJiBjaGFyYWN0ZXIgPCA5NykpXG5cdFx0XHRicmVha1xuXG5cdHJldHVybiBzbGljZShpbmRleCwgY2FyZXQoKSArIChjb3VudCA8IDYgJiYgcGVlaygpID09IDMyICYmIG5leHQoKSA9PSAzMikpXG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGltaXRlciAodHlwZSkge1xuXHR3aGlsZSAobmV4dCgpKVxuXHRcdHN3aXRjaCAoY2hhcmFjdGVyKSB7XG5cdFx0XHQvLyBdICkgXCIgJ1xuXHRcdFx0Y2FzZSB0eXBlOlxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25cblx0XHRcdC8vIFwiICdcblx0XHRcdGNhc2UgMzQ6IGNhc2UgMzk6XG5cdFx0XHRcdGlmICh0eXBlICE9PSAzNCAmJiB0eXBlICE9PSAzOSlcblx0XHRcdFx0XHRkZWxpbWl0ZXIoY2hhcmFjdGVyKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Ly8gKFxuXHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0aWYgKHR5cGUgPT09IDQxKVxuXHRcdFx0XHRcdGRlbGltaXRlcih0eXBlKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Ly8gXFxcblx0XHRcdGNhc2UgOTI6XG5cdFx0XHRcdG5leHQoKVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRyZXR1cm4gcG9zaXRpb25cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50ZXIgKHR5cGUsIGluZGV4KSB7XG5cdHdoaWxlIChuZXh0KCkpXG5cdFx0Ly8gLy9cblx0XHRpZiAodHlwZSArIGNoYXJhY3RlciA9PT0gNDcgKyAxMClcblx0XHRcdGJyZWFrXG5cdFx0Ly8gLypcblx0XHRlbHNlIGlmICh0eXBlICsgY2hhcmFjdGVyID09PSA0MiArIDQyICYmIHBlZWsoKSA9PT0gNDcpXG5cdFx0XHRicmVha1xuXG5cdHJldHVybiAnLyonICsgc2xpY2UoaW5kZXgsIHBvc2l0aW9uIC0gMSkgKyAnKicgKyBmcm9tKHR5cGUgPT09IDQ3ID8gdHlwZSA6IG5leHQoKSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZpZXIgKGluZGV4KSB7XG5cdHdoaWxlICghdG9rZW4ocGVlaygpKSlcblx0XHRuZXh0KClcblxuXHRyZXR1cm4gc2xpY2UoaW5kZXgsIHBvc2l0aW9uKVxufVxuIiwiLyoqXG4gKiBAcGFyYW0ge251bWJlcn1cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IHZhciBhYnMgPSBNYXRoLmFic1xuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgdmFyIGZyb20gPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCB2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnblxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaCAodmFsdWUsIGxlbmd0aCkge1xuXHRyZXR1cm4gY2hhcmF0KHZhbHVlLCAwKSBeIDQ1ID8gKCgoKCgoKGxlbmd0aCA8PCAyKSBeIGNoYXJhdCh2YWx1ZSwgMCkpIDw8IDIpIF4gY2hhcmF0KHZhbHVlLCAxKSkgPDwgMikgXiBjaGFyYXQodmFsdWUsIDIpKSA8PCAyKSBeIGNoYXJhdCh2YWx1ZSwgMykgOiAwXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmltICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUudHJpbSgpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuICogQHJldHVybiB7c3RyaW5nP31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoICh2YWx1ZSwgcGF0dGVybikge1xuXHRyZXR1cm4gKHZhbHVlID0gcGF0dGVybi5leGVjKHZhbHVlKSkgPyB2YWx1ZVswXSA6IHZhbHVlXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcGF0dGVyblxuICogQHBhcmFtIHtzdHJpbmd9IHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlICh2YWx1ZSwgcGF0dGVybiwgcmVwbGFjZW1lbnQpIHtcblx0cmV0dXJuIHZhbHVlLnJlcGxhY2UocGF0dGVybiwgcmVwbGFjZW1lbnQpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleG9mICh2YWx1ZSwgc2VhcmNoKSB7XG5cdHJldHVybiB2YWx1ZS5pbmRleE9mKHNlYXJjaClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhcmF0ICh2YWx1ZSwgaW5kZXgpIHtcblx0cmV0dXJuIHZhbHVlLmNoYXJDb2RlQXQoaW5kZXgpIHwgMFxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGJlZ2luXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWJzdHIgKHZhbHVlLCBiZWdpbiwgZW5kKSB7XG5cdHJldHVybiB2YWx1ZS5zbGljZShiZWdpbiwgZW5kKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RybGVuICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUubGVuZ3RoXG59XG5cbi8qKlxuICogQHBhcmFtIHthbnlbXX0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpemVvZiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLmxlbmd0aFxufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZCAodmFsdWUsIGFycmF5KSB7XG5cdHJldHVybiBhcnJheS5wdXNoKHZhbHVlKSwgdmFsdWVcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhcnJheVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmUgKGFycmF5LCBjYWxsYmFjaykge1xuXHRyZXR1cm4gYXJyYXkubWFwKGNhbGxiYWNrKS5qb2luKCcnKVxufVxuIl0sIm5hbWVzIjpbIkN1c3RvbURvY3VtZW50IiwiRG9jdW1lbnQiLCJyZW5kZXIiLCJfanN4REVWIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4Iiwib3JpZ2luYWxSZW5kZXJQYWdlIiwicmVuZGVyUGFnZSIsImNhY2hlIiwiY3JlYXRlRW1vdGlvbkNhY2hlIiwiZXh0cmFjdENyaXRpY2FsVG9DaHVua3MiLCJjcmVhdGVFbW90aW9uU2VydmVyIiwiZW5oYW5jZUFwcCIsIkFwcCIsInByb3BzIiwidGhpcyIsImluaXRpYWxQcm9wcyIsImVtb3Rpb25TdHlsZXMiLCJodG1sIiwiZW1vdGlvblN0eWxlVGFncyIsInN0eWxlcyIsIm1hcCIsInN0eWxlIiwiX19odG1sIiwiY3NzIiwia2V5IiwiaWRzIiwiam9pbiIsIkNoaWxkcmVuIiwidG9BcnJheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImluaXRIZWFkTWFuYWdlciIsIkRPTUF0dHJpYnV0ZU5hbWVzIiwiYWNjZXB0Q2hhcnNldCIsImNsYXNzTmFtZSIsImh0bWxGb3IiLCJodHRwRXF1aXYiLCJub01vZHVsZSIsInJlYWN0RWxlbWVudFRvRE9NIiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicCIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiYXR0ciIsInRvTG93ZXJDYXNlIiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsImlubmVySFRNTCIsInRleHRDb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidXBkYXRlRWxlbWVudHMiLCJjb21wb25lbnRzIiwiaGVhZEVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJoZWFkQ291bnRFbCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJoZWFkQ291bnQiLCJOdW1iZXIiLCJjb250ZW50Iiwib2xkVGFncyIsImkiLCJqIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJwdXNoIiwibmV3VGFncyIsImZpbHRlciIsIm5ld1RhZyIsImsiLCJsZW4iLCJsZW5ndGgiLCJvbGRUYWciLCJpc0VxdWFsTm9kZSIsInNwbGljZSIsImZvckVhY2giLCJ0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0QmVmb3JlIiwidG9TdHJpbmciLCJ1cGRhdGVQcm9taXNlIiwibW91bnRlZEluc3RhbmNlcyIsIlNldCIsInVwZGF0ZUhlYWQiLCJoZWFkIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsInRhZ3MiLCJoIiwiaHJlZiIsInRpdGxlQ29tcG9uZW50IiwidGl0bGUiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwic2VsZiIsImJpbmQiLCJ3aW5kb3ciLCJjYiIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsInNldFRpbWVvdXQiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJtYXgiLCJpZCIsImNsZWFyVGltZW91dCIsImluaXRTY3JpcHRMb2FkZXIiLCJfcmVhY3QiLCJyZXF1aXJlIiwiX2hlYWRNYW5hZ2VyQ29udGV4dCIsIl9oZWFkTWFuYWdlciIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImFyZ3VtZW50cyIsInNvdXJjZSIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0Iiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiZXhjbHVkZWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsInNvdXJjZVN5bWJvbEtleXMiLCJpbmRleE9mIiwicHJvdG90eXBlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJjYWxsIiwic291cmNlS2V5cyIsIlNjcmlwdENhY2hlIiwiTWFwIiwiTG9hZENhY2hlIiwiaWdub3JlUHJvcHMiLCJsb2FkU2NyaXB0Iiwic3JjIiwib25Mb2FkIiwic3RyYXRlZ3kiLCJvbkVycm9yIiwiY2FjaGVLZXkiLCJoYXMiLCJhZGQiLCJnZXQiLCJsb2FkUHJvbWlzZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2F0Y2giLCJzZXQiLCJlbnRyaWVzIiwiaW5jbHVkZXMiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVDbGllbnRTY3JpcHRMb2FkIiwibG9hZExhenlTY3JpcHQiLCJyZWFkeVN0YXRlIiwic2NyaXB0TG9hZGVySXRlbXMiLCJTY3JpcHQiLCJyZXN0UHJvcHMiLCJ1cGRhdGVTY3JpcHRzIiwic2NyaXB0cyIsImdldElzU3NyIiwidXNlQ29udGV4dCIsIkhlYWRNYW5hZ2VyQ29udGV4dCIsInVzZUVmZmVjdCIsImJlZm9yZUludGVyYWN0aXZlIiwiX2RlZmF1bHQiLCJfdXRpbHMiLCJEb2N1bWVudENvbnRleHQiLCJEb2N1bWVudEluaXRpYWxQcm9wcyIsIkRvY3VtZW50UHJvcHMiLCJIdG1sIiwiTWFpbiIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwiX3NlcnZlciIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfY29uc3RhbnRzIiwiX2dldFBhZ2VGaWxlcyIsIl91dGlsczEiLCJfaHRtbGVzY2FwZSIsIl9zY3JpcHQiLCJfX2VzTW9kdWxlIiwibmV3T2JqIiwiZGVzYyIsImdldERvY3VtZW50RmlsZXMiLCJidWlsZE1hbmlmZXN0IiwicGF0aG5hbWUiLCJpbkFtcE1vZGUiLCJzaGFyZWRGaWxlcyIsImdldFBhZ2VGaWxlcyIsInBhZ2VGaWxlcyIsImFsbEZpbGVzIiwiZ2V0UG9seWZpbGxTY3JpcHRzIiwiY29udGV4dCIsImFzc2V0UHJlZml4IiwiZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmciLCJkaXNhYmxlT3B0aW1pemVkTG9hZGluZyIsInBvbHlmaWxsRmlsZXMiLCJwb2x5ZmlsbCIsImVuZHNXaXRoIiwiZGVmZXIiLCJub25jZSIsImNyb3NzT3JpZ2luIiwicHJvY2VzcyIsImVudiIsIl9fTkVYVF9DUk9TU19PUklHSU4iLCJnZXRQcmVOZXh0U2NyaXB0cyIsInNjcmlwdExvYWRlciIsImZpbGUiLCJpbmRleCIsInNjcmlwdFByb3BzIiwiYXNzaWduIiwiZ2V0RHluYW1pY0NodW5rcyIsImZpbGVzIiwiZHluYW1pY0ltcG9ydHMiLCJpc0RldmVsb3BtZW50IiwiYXN5bmMiLCJlbmNvZGVVUkkiLCJnZXRTY3JpcHRzIiwicmVmIiwibm9ybWFsU2NyaXB0cyIsImxvd1ByaW9yaXR5U2NyaXB0cyIsImxvd1ByaW9yaXR5RmlsZXMiLCJEb2N1bWVudDEiLCJDb21wb25lbnQiLCJIZWFkIiwiTmV4dFNjcmlwdCIsImRvY0NvbXBvbmVudHNSZW5kZXJlZCIsImxvY2FsZSIsIkh0bWxDb250ZXh0IiwibGFuZyIsImFtcCIsImdldENzc0xpbmtzIiwiY3NzRmlsZXMiLCJmIiwidW5tYW5nZWRGaWxlcyIsImR5bmFtaWNDc3NGaWxlcyIsImZyb20iLCJleGlzdGluZyIsImNzc0xpbmtFbGVtZW50cyIsImlzU2hhcmVkRmlsZSIsIl9fTkVYVF9PUFRJTUlaRV9DU1MiLCJyZWwiLCJhcyIsImlzVW5tYW5hZ2VkRmlsZSIsIl9fTkVYVF9PUFRJTUlaRV9GT05UUyIsIm1ha2VTdHlsZXNoZWV0SW5lcnQiLCJnZXRQcmVsb2FkRHluYW1pY0NodW5rcyIsIkJvb2xlYW4iLCJnZXRQcmVsb2FkTWFpbkxpbmtzIiwicHJlbG9hZEZpbGVzIiwiaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyIsImZpbHRlcmVkQ2hpbGRyZW4iLCJjaGlsZCIsIl9fTkVYVF9EQVRBX18iLCJub2RlIiwiYyIsIk9QVElNSVpFRF9GT05UX1BST1ZJREVSUyIsInNvbWUiLCJ1cmwiLCJzdGFydHNXaXRoIiwibmV3UHJvcHMiLCJjbG9uZUVsZW1lbnQiLCJhbXBQYXRoIiwiaHlicmlkQW1wIiwiY2Fub25pY2FsQmFzZSIsImRhbmdlcm91c0FzUGF0aCIsImhlYWRUYWdzIiwidW5zdGFibGVfcnVudGltZUpTIiwidW5zdGFibGVfSnNQcmVsb2FkIiwiZGlzYWJsZVJ1bnRpbWVKUyIsImRpc2FibGVKc1ByZWxvYWQiLCJjc3NQcmVsb2FkcyIsIm90aGVySGVhZEVsZW1lbnRzIiwiaXNSZWFjdEhlbG1ldCIsInJlZjEiLCJ3YXJuIiwibmFtZSIsImhhc0FtcGh0bWxSZWwiLCJoYXNDYW5vbmljYWxSZWwiLCJiYWRQcm9wIiwicHJvcCIsInBhZ2UiLCJjdXJTdHlsZXMiLCJoYXNTdHlsZXMiLCJyZWYyIiwicmVmMyIsIl9ub25jZSIsIl9ub25jZTEiLCJGcmFnbWVudCIsImNvdW50IiwiY2xlYW5BbXBQYXRoIiwicmVwbGFjZSIsImdldEFtcFBhdGgiLCJfX05FWFRfT1BUSU1JWkVfSU1BR0VTIiwiY29udGV4dFR5cGUiLCJCT0RZX1JFTkRFUl9UQVJHRVQiLCJnZXRJbmxpbmVTY3JpcHRTb3VyY2UiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImh0bWxFc2NhcGVKc29uU3RyaW5nIiwiZXJyIiwibWVzc2FnZSIsIkVycm9yIiwiYW1wRGV2RmlsZXMiLCJkZXZGaWxlcyIsInNhZmFyaU5vbW9kdWxlRml4IiwiYXNQYXRoIiwiY3JlYXRlQ2FjaGUiXSwic291cmNlUm9vdCI6IiJ9