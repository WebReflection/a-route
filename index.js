var ARoute = (function (exports) {
  'use strict';

  

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  /**
   * Expose `pathToRegexp`.
   */
  var pathToRegexp_1 = pathToRegexp;
  var match_1 = match;
  var regexpToFunction_1 = regexpToFunction;
  var parse_1 = parse;
  var compile_1 = compile;
  var tokensToFunction_1 = tokensToFunction;
  var tokensToRegExp_1 = tokensToRegExp;
  /**
   * Default configs.
   */

  var DEFAULT_DELIMITER = '/';
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */

  var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {string}  str
   * @param  {Object=} options
   * @return {!Array}
   */

  function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = '';
    var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;
    var whitelist = options && options.whitelist || undefined;
    var pathEscaped = false;
    var res;

    while ((res = PATH_REGEXP.exec(str)) !== null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index, offset);
      index = offset + m.length; // Ignore already escaped sequences.

      if (escaped) {
        path += escaped[1];
        pathEscaped = true;
        continue;
      }

      var prev = '';
      var name = res[2];
      var capture = res[3];
      var group = res[4];
      var modifier = res[5];

      if (!pathEscaped && path.length) {
        var k = path.length - 1;
        var c = path[k];
        var matches = whitelist ? whitelist.indexOf(c) > -1 : true;

        if (matches) {
          prev = c;
          path = path.slice(0, k);
        }
      } // Push the current path onto the tokens.


      if (path) {
        tokens.push(path);
        path = '';
        pathEscaped = false;
      }

      var repeat = modifier === '+' || modifier === '*';
      var optional = modifier === '?' || modifier === '*';
      var pattern = capture || group;
      var delimiter = prev || defaultDelimiter;
      tokens.push({
        name: name || key++,
        prefix: prev,
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : delimiter + defaultDelimiter) + ']+?'
      });
    } // Push any remaining characters.


    if (path || index < str.length) {
      tokens.push(path + str.substr(index));
    }

    return tokens;
  }
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @param  {Object=}            options
   * @return {!function(Object=, Object=)}
   */


  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  /**
   * Create path match function from `path-to-regexp` spec.
   */


  function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys);
  }
  /**
   * Create a path match function from `path-to-regexp` output.
   */


  function regexpToFunction(re, keys) {
    return function (pathname, options) {
      var m = re.exec(pathname);
      if (!m) return false;
      var path = m[0];
      var index = m.index;
      var params = {};
      var decode = options && options.decode || decodeURIComponent;

      for (var i = 1; i < m.length; i++) {
        if (m[i] === undefined) continue;
        var key = keys[i - 1];

        if (key.repeat) {
          params[key.name] = m[i].split(key.delimiter).map(function (value) {
            return decode(value, key);
          });
        } else {
          params[key.name] = decode(m[i], key);
        }
      }

      return {
        path: path,
        index: index,
        params: params
      };
    };
  }
  /**
   * Expose a method for transforming tokens into the path function.
   */


  function tokensToFunction(tokens, options) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length); // Compile all the patterns before compilation.

    for (var i = 0; i < tokens.length; i++) {
      if (typeof(tokens[i]) === 'object') {
        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
      }
    }

    return function (data, options) {
      var path = '';
      var encode = options && options.encode || encodeURIComponent;
      var validate = options ? options.validate !== false : true;

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          path += token;
          continue;
        }

        var value = data ? data[token.name] : undefined;
        var segment;

        if (Array.isArray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
          }

          if (value.length === 0) {
            if (token.optional) continue;
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }

          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j], token);

            if (validate && !matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
            }

            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }

          continue;
        }

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          segment = encode(String(value), token);

          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
          }

          path += token.prefix + segment;
          continue;
        }

        if (token.optional) continue;
        throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'));
      }

      return path;
    };
  }
  /**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */


  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
  }
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */


  function escapeGroup(group) {
    return group.replace(/([=!:$/()])/g, '\\$1');
  }
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */


  function flags(options) {
    return options && options.sensitive ? '' : 'i';
  }
  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {Array=}  keys
   * @return {!RegExp}
   */


  function regexpToRegexp(path, keys) {
    if (!keys) return path; // Use a negative lookahead to match only capturing groups.

    var groups = path.source.match(/\((?!\?)/g);

    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        });
      }
    }

    return path;
  }
  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */


  function arrayToRegexp(path, keys, options) {
    var parts = [];

    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source);
    }

    return new RegExp('(?:' + parts.join('|') + ')', flags(options));
  }
  /**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */


  function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
  }
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}  tokens
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */


  function tokensToRegExp(tokens, keys, options) {
    options = options || {};
    var strict = options.strict;
    var start = options.start !== false;
    var end = options.end !== false;
    var delimiter = options.delimiter || DEFAULT_DELIMITER;
    var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
    var route = start ? '^' : ''; // Iterate over the tokens and create our regexp string.

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        route += escapeString(token);
      } else {
        var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*' : token.pattern;
        if (keys) keys.push(token);

        if (token.optional) {
          if (!token.prefix) {
            route += '(' + capture + ')?';
          } else {
            route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
          }
        } else {
          route += escapeString(token.prefix) + '(' + capture + ')';
        }
      }
    }

    if (end) {
      if (!strict) route += '(?:' + escapeString(delimiter) + ')?';
      route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited = typeof endToken === 'string' ? endToken[endToken.length - 1] === delimiter : endToken === undefined;
      if (!strict) route += '(?:' + escapeString(delimiter) + '(?=' + endsWith + '))?';
      if (!isEndDelimited) route += '(?=' + escapeString(delimiter) + '|' + endsWith + ')';
    }

    return new RegExp(route, flags(options));
  }
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {Array=}                keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */


  function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys);
    }

    if (Array.isArray(path)) {
      return arrayToRegexp(
      /** @type {!Array} */
      path, keys, options);
    }

    return stringToRegexp(
    /** @type {string} */
    path, keys, options);
  }
  pathToRegexp_1.match = match_1;
  pathToRegexp_1.regexpToFunction = regexpToFunction_1;
  pathToRegexp_1.parse = parse_1;
  pathToRegexp_1.compile = compile_1;
  pathToRegexp_1.tokensToFunction = tokensToFunction_1;
  pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

  var create = Object.create,
      freeze = Object.freeze,
      keys = Object.keys;
  var Class = customElements.get('a-route');
  var app = Class ? Class.app : freeze({
    _: freeze({
      params: create(null),
      paths: create(null)
    }),
    get: function get(path) {
      for (var paths = app._.paths, _keys = [], all = path === '*', re = all ? '*' : asPath2RegExp(path, _keys), info = paths[re] || (paths[re] = {
        keys: _keys,
        re: re,
        cb: []
      }), i = 1, length = arguments.length; i < length; i++) {
        info.cb.push(arguments[i]);
      }

      return app;
    },
    "delete": function _delete(path) {
      for (var all = path === '*', re = all ? '*' : asPath2RegExp(path, []), info = app._.paths[re], i = 1, length = arguments.length; i < length; i++) {
        var cb = arguments[i];
        var index = info ? info.cb.lastIndexOf(cb) : -1;
        if (-1 < index) info.cb.splice(index, 1);
      }

      return app;
    },
    navigate: function navigate(path, operation) {
      _navigate(path, !operation || operation === 'push' ? 1 : operation === 'replace' ? -1 : 0);
    },
    param: function param(name, cb) {
      for (var params = app._.params, names = [].concat(name), i = 0, length = names.length; i < length; i++) {
        params[names[i]] = cb;
      }

      return app;
    },
    use: function use(mount, cb) {
      if (typeof mount === 'function') {
        cb = mount;
        mount = '(.*)';
      }

      for (var paths = [].concat(mount), i = 0, length = paths.length; i < length; i++) {
        app.get(paths[i], cb);
      }

      return app;
    }
  });

  var isModifiedEvent = function isModifiedEvent(_ref) {
    var metaKey = _ref.metaKey,
        altKey = _ref.altKey,
        ctrlKey = _ref.ctrlKey,
        shiftKey = _ref.shiftKey;
    return !!(metaKey || altKey || ctrlKey || shiftKey);
  };

  var ARoute = Class || /*#__PURE__*/function (_HTMLAnchorElement) {
    _inherits(ARoute, _HTMLAnchorElement);

    var _super = _createSuper(ARoute);

    function ARoute() {
      _classCallCheck(this, ARoute);

      return _super.apply(this, arguments);
    }

    _createClass(ARoute, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.addEventListener('click', this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener('click', this);
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        // Let the browser handle modified click events (ctrl-click etc.)
        if (isModifiedEvent(event)) return;
        event.preventDefault();
        if (this.hasAttribute('no-propagation')) event.stopPropagation();

        var _URL = new URL(this.href),
            pathname = _URL.pathname,
            search = _URL.search,
            hash = _URL.hash;

        var path = pathname + search + hash;

        _navigate(path, this.hasAttribute('replace') ? -1 : 1);
      }
    }], [{
      key: "app",
      get: function get() {
        return app;
      }
    }]);

    return ARoute;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLAnchorElement));

  if (!Class) {
    customElements.define('a-route', ARoute, {
      "extends": 'a'
    });
    addEventListener('popstate', function () {
      var _location = location,
          pathname = _location.pathname,
          search = _location.search,
          hash = _location.hash;

      _navigate(pathname + search + hash, 0);
    });
  }

  function asPath2RegExp(path, keys) {
    if (typeof path !== 'string') {
      path = path.toString();
      path = path.slice(1, path.lastIndexOf('/'));
    }

    return pathToRegexp_1(path, keys);
  }

  function byKey(key) {
    return key in this;
  }

  function callNext(ctx, cbs) {
    var invoked = [];

    (function next() {
      var cb = cbs.shift();

      if (cb) {
        if (invoked.lastIndexOf(cb) < 0) {
          invoked.push(cb);
          cb(ctx, next);
        } else {
          next();
        }
      }
    })();
  }

  function createParams(match, keys) {
    var params = create(null);

    for (var i = 1, length = match.length; i < length; i++) {
      if (match[i] != null) params[keys[i - 1].name] = match[i];
    }

    return params;
  }

  function _navigate(path, operation) {
    var _app$_ = app._,
        params = _app$_.params,
        paths = _app$_.paths;
    if (operation < 0) history.replaceState(location.href, document.title, path);else if (operation) history.pushState(location.href, document.title, path);

    var _loop = function _loop(key) {
      if (key === '*') return "continue";
      var info = paths[key];
      var match = info.re.exec(path);

      if (match) {
        var ctx = {
          path: path,
          params: createParams(match, info.keys)
        };
        var all = keys(ctx.params).filter(byKey, params);
        return {
          v: function param() {
            if (all.length) {
              var _key = all.shift();

              params[_key](ctx, param, ctx.params[_key]);
            } else callNext(ctx, info.cb.slice(0));
          }()
        };
      }
    };

    for (var key in paths) {
      var _ret = _loop(key);

      if (_ret === "continue") continue;
      if (typeof(_ret) === "object") return _ret.v;
    }

    if ('*' in paths) callNext({
      path: path
    }, paths['*'].cb.slice(0));
  }

  exports.ARoute = ARoute;
  exports.app = app;

  return exports;

}({}));
