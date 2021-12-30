import { emptyLogo as emptyLogo$1 } from './mediaDefault.js';
import endsWithLodash from 'lodash/endsWith';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var arrayLikeToArray = createCommonjsModule(function (module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(arrayLikeToArray);

var arrayWithoutHoles = createCommonjsModule(function (module) {
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(arrayWithoutHoles);

var iterableToArray = createCommonjsModule(function (module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(iterableToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(unsupportedIterableToArray);

var nonIterableSpread = createCommonjsModule(function (module) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(nonIterableSpread);

var toConsumableArray = createCommonjsModule(function (module) {
  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _toConsumableArray = unwrapExports(toConsumableArray);

var arrayWithHoles = createCommonjsModule(function (module) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(arrayWithHoles);

var iterableToArrayLimit = createCommonjsModule(function (module) {
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(iterableToArrayLimit);

var nonIterableRest = createCommonjsModule(function (module) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(nonIterableRest);

var slicedToArray = createCommonjsModule(function (module) {
  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _slicedToArray = unwrapExports(slicedToArray);

var defineProperty = createCommonjsModule(function (module) {
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

  module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _defineProperty = unwrapExports(defineProperty);

var objectSpread2 = createCommonjsModule(function (module) {
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _objectSpread = unwrapExports(objectSpread2);

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }

  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _typeof = unwrapExports(_typeof_1);

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
});

var regenerator = runtime_1;

var asyncToGenerator = createCommonjsModule(function (module) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _asyncToGenerator = unwrapExports(asyncToGenerator);

var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _getPrototypeOf = unwrapExports(getPrototypeOf);

var superPropBase = createCommonjsModule(function (module) {
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(superPropBase);

var set_1 = createCommonjsModule(function (module) {
  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  module.exports = _set, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _set = unwrapExports(set_1);

var get = createCommonjsModule(function (module) {
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get, module.exports.__esModule = true, module.exports["default"] = module.exports;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }

    return _get.apply(this, arguments);
  }

  module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _get = unwrapExports(get);

var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(setPrototypeOf);

var isNativeFunction = createCommonjsModule(function (module) {
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(isNativeFunction);

var isNativeReflectConstruct = createCommonjsModule(function (module) {
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(isNativeReflectConstruct);

var construct = createCommonjsModule(function (module) {
  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
unwrapExports(construct);

var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _wrapNativeSuper = unwrapExports(wrapNativeSuper);

var toArray = createCommonjsModule(function (module) {
  function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
  }

  module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _toArray = unwrapExports(toArray);

var assertThisInitialized = createCommonjsModule(function (module) {
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _assertThisInitialized = unwrapExports(assertThisInitialized);

var inherits = createCommonjsModule(function (module) {
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    Object.defineProperty(subClass, "prototype", {
      value: Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      }),
      writable: false
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _inherits = unwrapExports(inherits);

var possibleConstructorReturn = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return assertThisInitialized(self);
  }

  module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var classCallCheck = createCommonjsModule(function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
});
var _createClass = unwrapExports(createClass);

var metadata_keys = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NON_CUSTOM_TAG_KEYS = exports.POST_CONSTRUCT = exports.DESIGN_PARAM_TYPES = exports.PARAM_TYPES = exports.TAGGED_PROP = exports.TAGGED = exports.MULTI_INJECT_TAG = exports.INJECT_TAG = exports.OPTIONAL_TAG = exports.UNMANAGED_TAG = exports.NAME_TAG = exports.NAMED_TAG = void 0;
  exports.NAMED_TAG = "named";
  exports.NAME_TAG = "name";
  exports.UNMANAGED_TAG = "unmanaged";
  exports.OPTIONAL_TAG = "optional";
  exports.INJECT_TAG = "inject";
  exports.MULTI_INJECT_TAG = "multi_inject";
  exports.TAGGED = "inversify:tagged";
  exports.TAGGED_PROP = "inversify:tagged_props";
  exports.PARAM_TYPES = "inversify:paramtypes";
  exports.DESIGN_PARAM_TYPES = "design:paramtypes";
  exports.POST_CONSTRUCT = "post_construct";

  function getNonCustomTagKeys() {
    return [exports.INJECT_TAG, exports.MULTI_INJECT_TAG, exports.NAME_TAG, exports.UNMANAGED_TAG, exports.NAMED_TAG, exports.OPTIONAL_TAG];
  }

  exports.NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
});
unwrapExports(metadata_keys);
var metadata_keys_1 = metadata_keys.NON_CUSTOM_TAG_KEYS;
var metadata_keys_2 = metadata_keys.POST_CONSTRUCT;
var metadata_keys_3 = metadata_keys.DESIGN_PARAM_TYPES;
var metadata_keys_4 = metadata_keys.PARAM_TYPES;
var metadata_keys_5 = metadata_keys.TAGGED_PROP;
var metadata_keys_6 = metadata_keys.TAGGED;
var metadata_keys_7 = metadata_keys.MULTI_INJECT_TAG;
var metadata_keys_8 = metadata_keys.INJECT_TAG;
var metadata_keys_9 = metadata_keys.OPTIONAL_TAG;
var metadata_keys_10 = metadata_keys.UNMANAGED_TAG;
var metadata_keys_11 = metadata_keys.NAME_TAG;
var metadata_keys_12 = metadata_keys.NAMED_TAG;

var literal_types = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = void 0;
  var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
  };
  exports.BindingScopeEnum = BindingScopeEnum;
  var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
  };
  exports.BindingTypeEnum = BindingTypeEnum;
  var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
  };
  exports.TargetTypeEnum = TargetTypeEnum;
});
unwrapExports(literal_types);
var literal_types_1 = literal_types.TargetTypeEnum;
var literal_types_2 = literal_types.BindingTypeEnum;
var literal_types_3 = literal_types.BindingScopeEnum;

var id_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.id = void 0;
  var idCounter = 0;

  function id() {
    return idCounter++;
  }

  exports.id = id;
});
unwrapExports(id_1);
var id_2 = id_1.id;

var binding = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Binding = void 0;

  var Binding = function () {
    function Binding(serviceIdentifier, scope) {
      this.id = id_1.id();
      this.activated = false;
      this.serviceIdentifier = serviceIdentifier;
      this.scope = scope;
      this.type = literal_types.BindingTypeEnum.Invalid;

      this.constraint = function (request) {
        return true;
      };

      this.implementationType = null;
      this.cache = null;
      this.factory = null;
      this.provider = null;
      this.onActivation = null;
      this.dynamicValue = null;
    }

    Binding.prototype.clone = function () {
      var clone = new Binding(this.serviceIdentifier, this.scope);
      clone.activated = clone.scope === literal_types.BindingScopeEnum.Singleton ? this.activated : false;
      clone.implementationType = this.implementationType;
      clone.dynamicValue = this.dynamicValue;
      clone.scope = this.scope;
      clone.type = this.type;
      clone.factory = this.factory;
      clone.provider = this.provider;
      clone.constraint = this.constraint;
      clone.onActivation = this.onActivation;
      clone.cache = this.cache;
      return clone;
    };

    return Binding;
  }();

  exports.Binding = Binding;
});
unwrapExports(binding);
var binding_1 = binding.Binding;

var error_msgs = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.STACK_OVERFLOW = exports.CIRCULAR_DEPENDENCY_IN_FACTORY = exports.POST_CONSTRUCT_ERROR = exports.MULTIPLE_POST_CONSTRUCT_METHODS = exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = exports.ARGUMENTS_LENGTH_MISMATCH = exports.INVALID_DECORATOR_OPERATION = exports.INVALID_TO_SELF_VALUE = exports.INVALID_FUNCTION_BINDING = exports.INVALID_MIDDLEWARE_RETURN = exports.NO_MORE_SNAPSHOTS_AVAILABLE = exports.INVALID_BINDING_TYPE = exports.NOT_IMPLEMENTED = exports.CIRCULAR_DEPENDENCY = exports.UNDEFINED_INJECT_ANNOTATION = exports.MISSING_INJECT_ANNOTATION = exports.MISSING_INJECTABLE_ANNOTATION = exports.NOT_REGISTERED = exports.CANNOT_UNBIND = exports.AMBIGUOUS_MATCH = exports.KEY_NOT_FOUND = exports.NULL_ARGUMENT = exports.DUPLICATED_METADATA = exports.DUPLICATED_INJECTABLE_DECORATOR = void 0;
  exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
  exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
  exports.NULL_ARGUMENT = "NULL argument";
  exports.KEY_NOT_FOUND = "Key Not Found";
  exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
  exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
  exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
  exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
  exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";

  var UNDEFINED_INJECT_ANNOTATION = function UNDEFINED_INJECT_ANNOTATION(name) {
    return "@inject called with undefined this could mean that the class " + name + " has " + "a circular dependency problem. You can use a LazyServiceIdentifer to  " + "overcome this limitation.";
  };

  exports.UNDEFINED_INJECT_ANNOTATION = UNDEFINED_INJECT_ANNOTATION;
  exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
  exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
  exports.INVALID_BINDING_TYPE = "Invalid binding type:";
  exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
  exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
  exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
  exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " + "used as service identifier";
  exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " + "must be applied to the parameters of a class constructor or a class property.";

  var ARGUMENTS_LENGTH_MISMATCH = function ARGUMENTS_LENGTH_MISMATCH() {
    var values = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }

    return "The number of constructor arguments in the derived class " + (values[0] + " must be >= than the number of constructor arguments of its base class.");
  };

  exports.ARGUMENTS_LENGTH_MISMATCH = ARGUMENTS_LENGTH_MISMATCH;
  exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " + "must be an object.";
  exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " + "be a string ('singleton' or 'transient').";
  exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " + "be a boolean";
  exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " + "be a boolean";
  exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";

  var POST_CONSTRUCT_ERROR = function POST_CONSTRUCT_ERROR() {
    var values = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }

    return "@postConstruct error in class " + values[0] + ": " + values[1];
  };

  exports.POST_CONSTRUCT_ERROR = POST_CONSTRUCT_ERROR;

  var CIRCULAR_DEPENDENCY_IN_FACTORY = function CIRCULAR_DEPENDENCY_IN_FACTORY() {
    var values = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }

    return "It looks like there is a circular dependency " + ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") + ("service identifier '" + values[1] + "'.");
  };

  exports.CIRCULAR_DEPENDENCY_IN_FACTORY = CIRCULAR_DEPENDENCY_IN_FACTORY;
  exports.STACK_OVERFLOW = "Maximum call stack size exceeded";
});
unwrapExports(error_msgs);
var error_msgs_1 = error_msgs.STACK_OVERFLOW;
var error_msgs_2 = error_msgs.CIRCULAR_DEPENDENCY_IN_FACTORY;
var error_msgs_3 = error_msgs.POST_CONSTRUCT_ERROR;
var error_msgs_4 = error_msgs.MULTIPLE_POST_CONSTRUCT_METHODS;
var error_msgs_5 = error_msgs.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK;
var error_msgs_6 = error_msgs.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE;
var error_msgs_7 = error_msgs.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE;
var error_msgs_8 = error_msgs.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT;
var error_msgs_9 = error_msgs.ARGUMENTS_LENGTH_MISMATCH;
var error_msgs_10 = error_msgs.INVALID_DECORATOR_OPERATION;
var error_msgs_11 = error_msgs.INVALID_TO_SELF_VALUE;
var error_msgs_12 = error_msgs.INVALID_FUNCTION_BINDING;
var error_msgs_13 = error_msgs.INVALID_MIDDLEWARE_RETURN;
var error_msgs_14 = error_msgs.NO_MORE_SNAPSHOTS_AVAILABLE;
var error_msgs_15 = error_msgs.INVALID_BINDING_TYPE;
var error_msgs_16 = error_msgs.NOT_IMPLEMENTED;
var error_msgs_17 = error_msgs.CIRCULAR_DEPENDENCY;
var error_msgs_18 = error_msgs.UNDEFINED_INJECT_ANNOTATION;
var error_msgs_19 = error_msgs.MISSING_INJECT_ANNOTATION;
var error_msgs_20 = error_msgs.MISSING_INJECTABLE_ANNOTATION;
var error_msgs_21 = error_msgs.NOT_REGISTERED;
var error_msgs_22 = error_msgs.CANNOT_UNBIND;
var error_msgs_23 = error_msgs.AMBIGUOUS_MATCH;
var error_msgs_24 = error_msgs.KEY_NOT_FOUND;
var error_msgs_25 = error_msgs.NULL_ARGUMENT;
var error_msgs_26 = error_msgs.DUPLICATED_METADATA;
var error_msgs_27 = error_msgs.DUPLICATED_INJECTABLE_DECORATOR;

var metadata_reader = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MetadataReader = void 0;

  var MetadataReader = function () {
    function MetadataReader() {}

    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
      var compilerGeneratedMetadata = Reflect.getMetadata(metadata_keys.PARAM_TYPES, constructorFunc);
      var userGeneratedMetadata = Reflect.getMetadata(metadata_keys.TAGGED, constructorFunc);
      return {
        compilerGeneratedMetadata: compilerGeneratedMetadata,
        userGeneratedMetadata: userGeneratedMetadata || {}
      };
    };

    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
      var userGeneratedMetadata = Reflect.getMetadata(metadata_keys.TAGGED_PROP, constructorFunc) || [];
      return userGeneratedMetadata;
    };

    return MetadataReader;
  }();

  exports.MetadataReader = MetadataReader;
});
unwrapExports(metadata_reader);
var metadata_reader_1 = metadata_reader.MetadataReader;

var binding_count = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingCount = void 0;
  var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
  };
  exports.BindingCount = BindingCount;
});
unwrapExports(binding_count);
var binding_count_1 = binding_count.BindingCount;

var exceptions = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isStackOverflowExeption = void 0;

  function isStackOverflowExeption(error) {
    return error instanceof RangeError || error.message === error_msgs.STACK_OVERFLOW;
  }

  exports.isStackOverflowExeption = isStackOverflowExeption;
});
unwrapExports(exceptions);
var exceptions_1 = exceptions.isStackOverflowExeption;

var serialization = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;

  function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
      var _serviceIdentifier = serviceIdentifier;
      return _serviceIdentifier.name;
    } else if (_typeof(serviceIdentifier) === "symbol") {
      return serviceIdentifier.toString();
    } else {
      var _serviceIdentifier = serviceIdentifier;
      return _serviceIdentifier;
    }
  }

  exports.getServiceIdentifierAsString = getServiceIdentifierAsString;

  function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);

    if (registeredBindings.length !== 0) {
      registeredBindingsList = "\nRegistered bindings:";
      registeredBindings.forEach(function (binding) {
        var name = "Object";

        if (binding.implementationType !== null) {
          name = getFunctionName(binding.implementationType);
        }

        registeredBindingsList = registeredBindingsList + "\n " + name;

        if (binding.constraint.metaData) {
          registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
        }
      });
    }

    return registeredBindingsList;
  }

  exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;

  function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
      return false;
    } else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
      return true;
    } else {
      return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
  }

  function dependencyChainToString(request) {
    function _createStringArr(req, result) {
      if (result === void 0) {
        result = [];
      }

      var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
      result.push(serviceIdentifier);

      if (req.parentRequest !== null) {
        return _createStringArr(req.parentRequest, result);
      }

      return result;
    }

    var stringArr = _createStringArr(request);

    return stringArr.reverse().join(" --> ");
  }

  function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
      if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
        var services = dependencyChainToString(childRequest);
        throw new Error(error_msgs.CIRCULAR_DEPENDENCY + " " + services);
      } else {
        circularDependencyToException(childRequest);
      }
    });
  }

  exports.circularDependencyToException = circularDependencyToException;

  function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
      var m_1 = "";
      var namedTag = target.getNamedTag();
      var otherTags = target.getCustomTags();

      if (namedTag !== null) {
        m_1 += namedTag.toString() + "\n";
      }

      if (otherTags !== null) {
        otherTags.forEach(function (tag) {
          m_1 += tag.toString() + "\n";
        });
      }

      return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    } else {
      return " " + serviceIdentifierString;
    }
  }

  exports.listMetadataForTarget = listMetadataForTarget;

  function getFunctionName(v) {
    if (v.name) {
      return v.name;
    } else {
      var name_1 = v.toString();
      var match = name_1.match(/^function\s*([^\s(]+)/);
      return match ? match[1] : "Anonymous function: " + name_1;
    }
  }

  exports.getFunctionName = getFunctionName;
});
unwrapExports(serialization);
var serialization_1 = serialization.circularDependencyToException;
var serialization_2 = serialization.listMetadataForTarget;
var serialization_3 = serialization.listRegisteredBindingsForServiceIdentifier;
var serialization_4 = serialization.getServiceIdentifierAsString;
var serialization_5 = serialization.getFunctionName;

var context = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Context = void 0;

  var Context = function () {
    function Context(container) {
      this.id = id_1.id();
      this.container = container;
    }

    Context.prototype.addPlan = function (plan) {
      this.plan = plan;
    };

    Context.prototype.setCurrentRequest = function (currentRequest) {
      this.currentRequest = currentRequest;
    };

    return Context;
  }();

  exports.Context = Context;
});
unwrapExports(context);
var context_1 = context.Context;

var metadata = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Metadata = void 0;

  var Metadata = function () {
    function Metadata(key, value) {
      this.key = key;
      this.value = value;
    }

    Metadata.prototype.toString = function () {
      if (this.key === metadata_keys.NAMED_TAG) {
        return "named: " + this.value.toString() + " ";
      } else {
        return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
      }
    };

    return Metadata;
  }();

  exports.Metadata = Metadata;
});
unwrapExports(metadata);
var metadata_1 = metadata.Metadata;

var plan = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Plan = void 0;

  var Plan = function () {
    function Plan(parentContext, rootRequest) {
      this.parentContext = parentContext;
      this.rootRequest = rootRequest;
    }

    return Plan;
  }();

  exports.Plan = Plan;
});
unwrapExports(plan);
var plan_1 = plan.Plan;

var decorator_utils = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tagProperty = exports.tagParameter = exports.decorate = void 0;

  function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = metadata_keys.TAGGED;

    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
  }

  exports.tagParameter = tagParameter;

  function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = metadata_keys.TAGGED_PROP;

    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
  }

  exports.tagProperty = tagProperty;

  function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = typeof parameterIndex === "number";
    var key = parameterIndex !== undefined && isParameterDecorator ? parameterIndex.toString() : propertyName;

    if (isParameterDecorator && propertyName !== undefined) {
      throw new Error(error_msgs.INVALID_DECORATOR_OPERATION);
    }

    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
      paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }

    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];

    if (!Array.isArray(paramOrPropertyMetadata)) {
      paramOrPropertyMetadata = [];
    } else {
      for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
        var m = paramOrPropertyMetadata_1[_i];

        if (m.key === metadata.key) {
          throw new Error(error_msgs.DUPLICATED_METADATA + " " + m.key.toString());
        }
      }
    }

    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
  }

  function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
  }

  function _param(paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  }

  function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
      _decorate([_param(parameterIndex, decorator)], target);
    } else if (typeof parameterIndex === "string") {
      Reflect.decorate([decorator], target, parameterIndex);
    } else {
      _decorate([decorator], target);
    }
  }

  exports.decorate = decorate;
});
unwrapExports(decorator_utils);
var decorator_utils_1 = decorator_utils.tagProperty;
var decorator_utils_2 = decorator_utils.tagParameter;
var decorator_utils_3 = decorator_utils.decorate;

var inject_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inject = exports.LazyServiceIdentifer = void 0;

  var LazyServiceIdentifer = function () {
    function LazyServiceIdentifer(cb) {
      this._cb = cb;
    }

    LazyServiceIdentifer.prototype.unwrap = function () {
      return this._cb();
    };

    return LazyServiceIdentifer;
  }();

  exports.LazyServiceIdentifer = LazyServiceIdentifer;

  function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
      if (serviceIdentifier === undefined) {
        throw new Error(error_msgs.UNDEFINED_INJECT_ANNOTATION(target.name));
      }

      var metadata$1 = new metadata.Metadata(metadata_keys.INJECT_TAG, serviceIdentifier);

      if (typeof index === "number") {
        decorator_utils.tagParameter(target, targetKey, index, metadata$1);
      } else {
        decorator_utils.tagProperty(target, targetKey, metadata$1);
      }
    };
  }

  exports.inject = inject;
});
unwrapExports(inject_1);
var inject_2 = inject_1.inject;
var inject_3 = inject_1.LazyServiceIdentifer;

var queryable_string = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.QueryableString = void 0;

  var QueryableString = function () {
    function QueryableString(str) {
      this.str = str;
    }

    QueryableString.prototype.startsWith = function (searchString) {
      return this.str.indexOf(searchString) === 0;
    };

    QueryableString.prototype.endsWith = function (searchString) {
      var reverseString = "";
      var reverseSearchString = searchString.split("").reverse().join("");
      reverseString = this.str.split("").reverse().join("");
      return this.startsWith.call({
        str: reverseString
      }, reverseSearchString);
    };

    QueryableString.prototype.contains = function (searchString) {
      return this.str.indexOf(searchString) !== -1;
    };

    QueryableString.prototype.equals = function (compareString) {
      return this.str === compareString;
    };

    QueryableString.prototype.value = function () {
      return this.str;
    };

    return QueryableString;
  }();

  exports.QueryableString = QueryableString;
});
unwrapExports(queryable_string);
var queryable_string_1 = queryable_string.QueryableString;

var target = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Target = void 0;

  var Target = function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
      this.id = id_1.id();
      this.type = type;
      this.serviceIdentifier = serviceIdentifier;
      this.name = new queryable_string.QueryableString(name || "");
      this.metadata = new Array();
      var metadataItem = null;

      if (typeof namedOrTagged === "string") {
        metadataItem = new metadata.Metadata(metadata_keys.NAMED_TAG, namedOrTagged);
      } else if (namedOrTagged instanceof metadata.Metadata) {
        metadataItem = namedOrTagged;
      }

      if (metadataItem !== null) {
        this.metadata.push(metadataItem);
      }
    }

    Target.prototype.hasTag = function (key) {
      for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
        var m = _a[_i];

        if (m.key === key) {
          return true;
        }
      }

      return false;
    };

    Target.prototype.isArray = function () {
      return this.hasTag(metadata_keys.MULTI_INJECT_TAG);
    };

    Target.prototype.matchesArray = function (name) {
      return this.matchesTag(metadata_keys.MULTI_INJECT_TAG)(name);
    };

    Target.prototype.isNamed = function () {
      return this.hasTag(metadata_keys.NAMED_TAG);
    };

    Target.prototype.isTagged = function () {
      return this.metadata.some(function (metadata) {
        return metadata_keys.NON_CUSTOM_TAG_KEYS.every(function (key) {
          return metadata.key !== key;
        });
      });
    };

    Target.prototype.isOptional = function () {
      return this.matchesTag(metadata_keys.OPTIONAL_TAG)(true);
    };

    Target.prototype.getNamedTag = function () {
      if (this.isNamed()) {
        return this.metadata.filter(function (m) {
          return m.key === metadata_keys.NAMED_TAG;
        })[0];
      }

      return null;
    };

    Target.prototype.getCustomTags = function () {
      if (this.isTagged()) {
        return this.metadata.filter(function (metadata) {
          return metadata_keys.NON_CUSTOM_TAG_KEYS.every(function (key) {
            return metadata.key !== key;
          });
        });
      } else {
        return null;
      }
    };

    Target.prototype.matchesNamedTag = function (name) {
      return this.matchesTag(metadata_keys.NAMED_TAG)(name);
    };

    Target.prototype.matchesTag = function (key) {
      var _this = this;

      return function (value) {
        for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
          var m = _a[_i];

          if (m.key === key && m.value === value) {
            return true;
          }
        }

        return false;
      };
    };

    return Target;
  }();

  exports.Target = Target;
});
unwrapExports(target);
var target_1 = target.Target;

var reflection_utils = createCommonjsModule(function (module, exports) {

  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
      to[j] = from[i];
    }

    return to;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getFunctionName = exports.getBaseClassDependencyCount = exports.getDependencies = void 0;
  Object.defineProperty(exports, "getFunctionName", {
    enumerable: true,
    get: function get() {
      return serialization.getFunctionName;
    }
  });

  function getDependencies(metadataReader, func) {
    var constructorName = serialization.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
  }

  exports.getDependencies = getDependencies;

  function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;

    if (serviceIdentifiers === undefined) {
      var msg = error_msgs.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
      throw new Error(msg);
    }

    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = func.length === 0 && keys.length > 0;
    var hasOptionalParameters = keys.length > func.length;
    var iterations = hasUserDeclaredUnknownInjections || hasOptionalParameters ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);

    var targets = __spreadArray(__spreadArray([], constructorTargets), propertyTargets);

    return targets;
  }

  function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = metadata.inject || metadata.multiInject;
    serviceIdentifier = injectIdentifier ? injectIdentifier : serviceIdentifier;

    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
      serviceIdentifier = serviceIdentifier.unwrap();
    }

    if (isManaged) {
      var isObject = serviceIdentifier === Object;
      var isFunction = serviceIdentifier === Function;
      var isUndefined = serviceIdentifier === undefined;
      var isUnknownType = isObject || isFunction || isUndefined;

      if (!isBaseClass && isUnknownType) {
        var msg = error_msgs.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
        throw new Error(msg);
      }

      var target$1 = new target.Target(literal_types.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
      target$1.metadata = targetMetadata;
      return target$1;
    }

    return null;
  }

  function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];

    for (var i = 0; i < iterations; i++) {
      var index = i;
      var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);

      if (target !== null) {
        targets.push(target);
      }
    }

    return targets;
  }

  function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);

    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var key = keys_1[_i];
      var targetMetadata = classPropsMetadata[key];
      var metadata = formatTargetMetadata(classPropsMetadata[key]);
      var targetName = metadata.targetName || key;
      var serviceIdentifier = metadata.inject || metadata.multiInject;
      var target$1 = new target.Target(literal_types.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
      target$1.metadata = targetMetadata;
      targets.push(target$1);
    }

    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;

    if (baseConstructor !== Object) {
      var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
      targets = __spreadArray(__spreadArray([], targets), baseTargets);
    }

    return targets;
  }

  function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;

    if (baseConstructor !== Object) {
      var baseConstructorName = serialization.getFunctionName(baseConstructor);
      var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
      var metadata = targets.map(function (t) {
        return t.metadata.filter(function (m) {
          return m.key === metadata_keys.UNMANAGED_TAG;
        });
      });
      var unmanagedCount = [].concat.apply([], metadata).length;
      var dependencyCount = targets.length - unmanagedCount;

      if (dependencyCount > 0) {
        return dependencyCount;
      } else {
        return getBaseClassDependencyCount(metadataReader, baseConstructor);
      }
    } else {
      return 0;
    }
  }

  exports.getBaseClassDependencyCount = getBaseClassDependencyCount;

  function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
      targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
      inject: targetMetadataMap[metadata_keys.INJECT_TAG],
      multiInject: targetMetadataMap[metadata_keys.MULTI_INJECT_TAG],
      targetName: targetMetadataMap[metadata_keys.NAME_TAG],
      unmanaged: targetMetadataMap[metadata_keys.UNMANAGED_TAG]
    };
  }
});
unwrapExports(reflection_utils);
var reflection_utils_1 = reflection_utils.getFunctionName;
var reflection_utils_2 = reflection_utils.getBaseClassDependencyCount;
var reflection_utils_3 = reflection_utils.getDependencies;

var request = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Request = void 0;

  var Request = function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
      this.id = id_1.id();
      this.serviceIdentifier = serviceIdentifier;
      this.parentContext = parentContext;
      this.parentRequest = parentRequest;
      this.target = target;
      this.childRequests = [];
      this.bindings = Array.isArray(bindings) ? bindings : [bindings];
      this.requestScope = parentRequest === null ? new Map() : null;
    }

    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
      var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
      this.childRequests.push(child);
      return child;
    };

    return Request;
  }();

  exports.Request = Request;
});
unwrapExports(request);
var request_1 = request.Request;

var planner = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getBindingDictionary = exports.createMockRequest = exports.plan = void 0;

  function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
  }

  exports.getBindingDictionary = getBindingDictionary;

  function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? metadata_keys.MULTI_INJECT_TAG : metadata_keys.INJECT_TAG;
    var injectMetadata = new metadata.Metadata(metadataKey, serviceIdentifier);
    var target$1 = new target.Target(targetType, name, serviceIdentifier, injectMetadata);

    if (key !== undefined) {
      var tagMetadata = new metadata.Metadata(key, value);
      target$1.metadata.push(tagMetadata);
    }

    return target$1;
  }

  function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];

    if (bindings.length === binding_count.BindingCount.NoBindingsAvailable && context.container.options.autoBindInjectable && typeof target.serviceIdentifier === "function" && metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
      context.container.bind(target.serviceIdentifier).toSelf();
      bindings = getBindings(context.container, target.serviceIdentifier);
    }

    if (!avoidConstraints) {
      activeBindings = bindings.filter(function (binding) {
        var request$1 = new request.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
        return binding.constraint(request$1);
      });
    } else {
      activeBindings = bindings;
    }

    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);

    return activeBindings;
  }

  function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
      case binding_count.BindingCount.NoBindingsAvailable:
        if (target.isOptional()) {
          return bindings;
        } else {
          var serviceIdentifierString = serialization.getServiceIdentifierAsString(serviceIdentifier);
          var msg = error_msgs.NOT_REGISTERED;
          msg += serialization.listMetadataForTarget(serviceIdentifierString, target);
          msg += serialization.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
          throw new Error(msg);
        }

      case binding_count.BindingCount.OnlyOneBindingAvailable:
        if (!target.isArray()) {
          return bindings;
        }

      case binding_count.BindingCount.MultipleBindingsAvailable:
      default:
        if (!target.isArray()) {
          var serviceIdentifierString = serialization.getServiceIdentifierAsString(serviceIdentifier);
          var msg = error_msgs.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
          msg += serialization.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
          throw new Error(msg);
        } else {
          return bindings;
        }

    }
  }

  function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;

    if (parentRequest === null) {
      activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
      childRequest = new request.Request(serviceIdentifier, context, null, activeBindings, target);
      var thePlan = new plan.Plan(context, childRequest);
      context.addPlan(thePlan);
    } else {
      activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
      childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }

    activeBindings.forEach(function (binding) {
      var subChildRequest = null;

      if (target.isArray()) {
        subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
      } else {
        if (binding.cache) {
          return;
        }

        subChildRequest = childRequest;
      }

      if (binding.type === literal_types.BindingTypeEnum.Instance && binding.implementationType !== null) {
        var dependencies = reflection_utils.getDependencies(metadataReader, binding.implementationType);

        if (!context.container.options.skipBaseClassChecks) {
          var baseClassDependencyCount = reflection_utils.getBaseClassDependencyCount(metadataReader, binding.implementationType);

          if (dependencies.length < baseClassDependencyCount) {
            var error = error_msgs.ARGUMENTS_LENGTH_MISMATCH(reflection_utils.getFunctionName(binding.implementationType));
            throw new Error(error);
          }
        }

        dependencies.forEach(function (dependency) {
          _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
        });
      }
    });
  }

  function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);

    if (bindingDictionary.hasKey(serviceIdentifier)) {
      bindings = bindingDictionary.get(serviceIdentifier);
    } else if (container.parent !== null) {
      bindings = getBindings(container.parent, serviceIdentifier);
    }

    return bindings;
  }

  function plan$1(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) {
      avoidConstraints = false;
    }

    var context$1 = new context.Context(container);

    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);

    try {
      _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context$1, null, target);

      return context$1;
    } catch (error) {
      if (exceptions.isStackOverflowExeption(error)) {
        if (context$1.plan) {
          serialization.circularDependencyToException(context$1.plan.rootRequest);
        }
      }

      throw error;
    }
  }

  exports.plan = plan$1;

  function createMockRequest(container, serviceIdentifier, key, value) {
    var target$1 = new target.Target(literal_types.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata.Metadata(key, value));
    var context$1 = new context.Context(container);
    var request$1 = new request.Request(serviceIdentifier, context$1, null, [], target$1);
    return request$1;
  }

  exports.createMockRequest = createMockRequest;
});
unwrapExports(planner);
var planner_1 = planner.getBindingDictionary;
var planner_2 = planner.createMockRequest;
var planner_3 = planner.plan;

var instantiation = createCommonjsModule(function (module, exports) {

  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
      to[j] = from[i];
    }

    return to;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.resolveInstance = void 0;

  function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
      return childRequest.target !== null && childRequest.target.type === literal_types.TargetTypeEnum.ClassProperty;
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
      var propertyName = "";
      propertyName = r.target.name.value();
      var injection = propertyInjections[index];
      instance[propertyName] = injection;
    });
    return instance;
  }

  function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, __spreadArray([void 0], injections)))();
  }

  function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(metadata_keys.POST_CONSTRUCT, constr)) {
      var data = Reflect.getMetadata(metadata_keys.POST_CONSTRUCT, constr);

      try {
        result[data.value]();
      } catch (e) {
        throw new Error(error_msgs.POST_CONSTRUCT_ERROR(constr.name, e.message));
      }
    }
  }

  function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;

    if (childRequests.length > 0) {
      var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
        return childRequest.target !== null && childRequest.target.type === literal_types.TargetTypeEnum.ConstructorArgument;
      });
      var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
      result = _createInstance(constr, constructorInjections);
      result = _injectProperties(result, childRequests, resolveRequest);
    } else {
      result = new constr();
    }

    _postConstruct(constr, result);

    return result;
  }

  exports.resolveInstance = resolveInstance;
});
unwrapExports(instantiation);
var instantiation_1 = instantiation.resolveInstance;

var resolver = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.resolve = void 0;

  var invokeFactory = function invokeFactory(factoryType, serviceIdentifier, fn) {
    try {
      return fn();
    } catch (error) {
      if (exceptions.isStackOverflowExeption(error)) {
        throw new Error(error_msgs.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
      } else {
        throw error;
      }
    }
  };

  var _resolveRequest = function _resolveRequest(requestScope) {
    return function (request) {
      request.parentContext.setCurrentRequest(request);
      var bindings = request.bindings;
      var childRequests = request.childRequests;
      var targetIsAnArray = request.target && request.target.isArray();
      var targetParentIsNotAnArray = !request.parentRequest || !request.parentRequest.target || !request.target || !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);

      if (targetIsAnArray && targetParentIsNotAnArray) {
        return childRequests.map(function (childRequest) {
          var _f = _resolveRequest(requestScope);

          return _f(childRequest);
        });
      } else {
        var result = null;

        if (request.target.isOptional() && bindings.length === 0) {
          return undefined;
        }

        var binding_1 = bindings[0];
        var isSingleton = binding_1.scope === literal_types.BindingScopeEnum.Singleton;
        var isRequestSingleton = binding_1.scope === literal_types.BindingScopeEnum.Request;

        if (isSingleton && binding_1.activated) {
          return binding_1.cache;
        }

        if (isRequestSingleton && requestScope !== null && requestScope.has(binding_1.id)) {
          return requestScope.get(binding_1.id);
        }

        if (binding_1.type === literal_types.BindingTypeEnum.ConstantValue) {
          result = binding_1.cache;
          binding_1.activated = true;
        } else if (binding_1.type === literal_types.BindingTypeEnum.Function) {
          result = binding_1.cache;
          binding_1.activated = true;
        } else if (binding_1.type === literal_types.BindingTypeEnum.Constructor) {
          result = binding_1.implementationType;
        } else if (binding_1.type === literal_types.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
          result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () {
            return binding_1.dynamicValue(request.parentContext);
          });
        } else if (binding_1.type === literal_types.BindingTypeEnum.Factory && binding_1.factory !== null) {
          result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () {
            return binding_1.factory(request.parentContext);
          });
        } else if (binding_1.type === literal_types.BindingTypeEnum.Provider && binding_1.provider !== null) {
          result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () {
            return binding_1.provider(request.parentContext);
          });
        } else if (binding_1.type === literal_types.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
          result = instantiation.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
        } else {
          var serviceIdentifier = serialization.getServiceIdentifierAsString(request.serviceIdentifier);
          throw new Error(error_msgs.INVALID_BINDING_TYPE + " " + serviceIdentifier);
        }

        if (typeof binding_1.onActivation === "function") {
          result = binding_1.onActivation(request.parentContext, result);
        }

        if (isSingleton) {
          binding_1.cache = result;
          binding_1.activated = true;
        }

        if (isRequestSingleton && requestScope !== null && !requestScope.has(binding_1.id)) {
          requestScope.set(binding_1.id, result);
        }

        return result;
      }
    };
  };

  function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);

    return _f(context.plan.rootRequest);
  }

  exports.resolve = resolve;
});
unwrapExports(resolver);
var resolver_1 = resolver.resolve;

var constraint_helpers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = void 0;

  var traverseAncerstors = function traverseAncerstors(request, constraint) {
    var parent = request.parentRequest;

    if (parent !== null) {
      return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    } else {
      return false;
    }
  };

  exports.traverseAncerstors = traverseAncerstors;

  var taggedConstraint = function taggedConstraint(key) {
    return function (value) {
      var constraint = function constraint(request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
      };

      constraint.metaData = new metadata.Metadata(key, value);
      return constraint;
    };
  };

  exports.taggedConstraint = taggedConstraint;
  var namedConstraint = taggedConstraint(metadata_keys.NAMED_TAG);
  exports.namedConstraint = namedConstraint;

  var typeConstraint = function typeConstraint(type) {
    return function (request) {
      var binding = null;

      if (request !== null) {
        binding = request.bindings[0];

        if (typeof type === "string") {
          var serviceIdentifier = binding.serviceIdentifier;
          return serviceIdentifier === type;
        } else {
          var constructor = request.bindings[0].implementationType;
          return type === constructor;
        }
      }

      return false;
    };
  };

  exports.typeConstraint = typeConstraint;
});
unwrapExports(constraint_helpers);
var constraint_helpers_1 = constraint_helpers.typeConstraint;
var constraint_helpers_2 = constraint_helpers.namedConstraint;
var constraint_helpers_3 = constraint_helpers.taggedConstraint;
var constraint_helpers_4 = constraint_helpers.traverseAncerstors;

var binding_when_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingWhenSyntax = void 0;

  var BindingWhenSyntax = function () {
    function BindingWhenSyntax(binding) {
      this._binding = binding;
    }

    BindingWhenSyntax.prototype.when = function (constraint) {
      this._binding.constraint = constraint;
      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
      this._binding.constraint = constraint_helpers.namedConstraint(name);
      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
      this._binding.constraint = function (request) {
        var targetIsDefault = request.target !== null && !request.target.isNamed() && !request.target.isTagged();
        return targetIsDefault;
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
      this._binding.constraint = constraint_helpers.taggedConstraint(tag)(value);
      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
      this._binding.constraint = function (request) {
        return constraint_helpers.typeConstraint(parent)(request.parentRequest);
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
      this._binding.constraint = function (request) {
        return constraint_helpers.namedConstraint(name)(request.parentRequest);
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
      this._binding.constraint = function (request) {
        return constraint_helpers.taggedConstraint(tag)(value)(request.parentRequest);
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
      this._binding.constraint = function (request) {
        return constraint_helpers.traverseAncerstors(request, constraint_helpers.typeConstraint(ancestor));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
      this._binding.constraint = function (request) {
        return !constraint_helpers.traverseAncerstors(request, constraint_helpers.typeConstraint(ancestor));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
      this._binding.constraint = function (request) {
        return constraint_helpers.traverseAncerstors(request, constraint_helpers.namedConstraint(name));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
      this._binding.constraint = function (request) {
        return !constraint_helpers.traverseAncerstors(request, constraint_helpers.namedConstraint(name));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
      this._binding.constraint = function (request) {
        return constraint_helpers.traverseAncerstors(request, constraint_helpers.taggedConstraint(tag)(value));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
      this._binding.constraint = function (request) {
        return !constraint_helpers.traverseAncerstors(request, constraint_helpers.taggedConstraint(tag)(value));
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
      this._binding.constraint = function (request) {
        return constraint_helpers.traverseAncerstors(request, constraint);
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
      this._binding.constraint = function (request) {
        return !constraint_helpers.traverseAncerstors(request, constraint);
      };

      return new binding_on_syntax.BindingOnSyntax(this._binding);
    };

    return BindingWhenSyntax;
  }();

  exports.BindingWhenSyntax = BindingWhenSyntax;
});
unwrapExports(binding_when_syntax);
var binding_when_syntax_1 = binding_when_syntax.BindingWhenSyntax;

var binding_on_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingOnSyntax = void 0;

  var BindingOnSyntax = function () {
    function BindingOnSyntax(binding) {
      this._binding = binding;
    }

    BindingOnSyntax.prototype.onActivation = function (handler) {
      this._binding.onActivation = handler;
      return new binding_when_syntax.BindingWhenSyntax(this._binding);
    };

    return BindingOnSyntax;
  }();

  exports.BindingOnSyntax = BindingOnSyntax;
});
unwrapExports(binding_on_syntax);
var binding_on_syntax_1 = binding_on_syntax.BindingOnSyntax;

var binding_when_on_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingWhenOnSyntax = void 0;

  var BindingWhenOnSyntax = function () {
    function BindingWhenOnSyntax(binding) {
      this._binding = binding;
      this._bindingWhenSyntax = new binding_when_syntax.BindingWhenSyntax(this._binding);
      this._bindingOnSyntax = new binding_on_syntax.BindingOnSyntax(this._binding);
    }

    BindingWhenOnSyntax.prototype.when = function (constraint) {
      return this._bindingWhenSyntax.when(constraint);
    };

    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
      return this._bindingWhenSyntax.whenTargetNamed(name);
    };

    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
      return this._bindingWhenSyntax.whenTargetIsDefault();
    };

    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };

    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
      return this._bindingWhenSyntax.whenInjectedInto(parent);
    };

    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
      return this._bindingWhenSyntax.whenParentNamed(name);
    };

    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };

    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
      return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };

    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
      return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };

    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
      return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };

    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };

    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
      return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };

    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };

    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
      return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };

    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
      return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };

    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
      return this._bindingOnSyntax.onActivation(handler);
    };

    return BindingWhenOnSyntax;
  }();

  exports.BindingWhenOnSyntax = BindingWhenOnSyntax;
});
unwrapExports(binding_when_on_syntax);
var binding_when_on_syntax_1 = binding_when_on_syntax.BindingWhenOnSyntax;

var binding_in_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingInSyntax = void 0;

  var BindingInSyntax = function () {
    function BindingInSyntax(binding) {
      this._binding = binding;
    }

    BindingInSyntax.prototype.inRequestScope = function () {
      this._binding.scope = literal_types.BindingScopeEnum.Request;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingInSyntax.prototype.inSingletonScope = function () {
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingInSyntax.prototype.inTransientScope = function () {
      this._binding.scope = literal_types.BindingScopeEnum.Transient;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    return BindingInSyntax;
  }();

  exports.BindingInSyntax = BindingInSyntax;
});
unwrapExports(binding_in_syntax);
var binding_in_syntax_1 = binding_in_syntax.BindingInSyntax;

var binding_in_when_on_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingInWhenOnSyntax = void 0;

  var BindingInWhenOnSyntax = function () {
    function BindingInWhenOnSyntax(binding) {
      this._binding = binding;
      this._bindingWhenSyntax = new binding_when_syntax.BindingWhenSyntax(this._binding);
      this._bindingOnSyntax = new binding_on_syntax.BindingOnSyntax(this._binding);
      this._bindingInSyntax = new binding_in_syntax.BindingInSyntax(binding);
    }

    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
      return this._bindingInSyntax.inRequestScope();
    };

    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
      return this._bindingInSyntax.inSingletonScope();
    };

    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
      return this._bindingInSyntax.inTransientScope();
    };

    BindingInWhenOnSyntax.prototype.when = function (constraint) {
      return this._bindingWhenSyntax.when(constraint);
    };

    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
      return this._bindingWhenSyntax.whenTargetNamed(name);
    };

    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
      return this._bindingWhenSyntax.whenTargetIsDefault();
    };

    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };

    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
      return this._bindingWhenSyntax.whenInjectedInto(parent);
    };

    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
      return this._bindingWhenSyntax.whenParentNamed(name);
    };

    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };

    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
      return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };

    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
      return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };

    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
      return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };

    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };

    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
      return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };

    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
      return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };

    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
      return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };

    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
      return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };

    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
      return this._bindingOnSyntax.onActivation(handler);
    };

    return BindingInWhenOnSyntax;
  }();

  exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;
});
unwrapExports(binding_in_when_on_syntax);
var binding_in_when_on_syntax_1 = binding_in_when_on_syntax.BindingInWhenOnSyntax;

var binding_to_syntax = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingToSyntax = void 0;

  var BindingToSyntax = function () {
    function BindingToSyntax(binding) {
      this._binding = binding;
    }

    BindingToSyntax.prototype.to = function (constructor) {
      this._binding.type = literal_types.BindingTypeEnum.Instance;
      this._binding.implementationType = constructor;
      return new binding_in_when_on_syntax.BindingInWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toSelf = function () {
      if (typeof this._binding.serviceIdentifier !== "function") {
        throw new Error("" + error_msgs.INVALID_TO_SELF_VALUE);
      }

      var self = this._binding.serviceIdentifier;
      return this.to(self);
    };

    BindingToSyntax.prototype.toConstantValue = function (value) {
      this._binding.type = literal_types.BindingTypeEnum.ConstantValue;
      this._binding.cache = value;
      this._binding.dynamicValue = null;
      this._binding.implementationType = null;
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toDynamicValue = function (func) {
      this._binding.type = literal_types.BindingTypeEnum.DynamicValue;
      this._binding.cache = null;
      this._binding.dynamicValue = func;
      this._binding.implementationType = null;
      return new binding_in_when_on_syntax.BindingInWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toConstructor = function (constructor) {
      this._binding.type = literal_types.BindingTypeEnum.Constructor;
      this._binding.implementationType = constructor;
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toFactory = function (factory) {
      this._binding.type = literal_types.BindingTypeEnum.Factory;
      this._binding.factory = factory;
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toFunction = function (func) {
      if (typeof func !== "function") {
        throw new Error(error_msgs.INVALID_FUNCTION_BINDING);
      }

      var bindingWhenOnSyntax = this.toConstantValue(func);
      this._binding.type = literal_types.BindingTypeEnum.Function;
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return bindingWhenOnSyntax;
    };

    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
      this._binding.type = literal_types.BindingTypeEnum.Factory;

      this._binding.factory = function (context) {
        var autofactory = function autofactory() {
          return context.container.get(serviceIdentifier);
        };

        return autofactory;
      };

      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toProvider = function (provider) {
      this._binding.type = literal_types.BindingTypeEnum.Provider;
      this._binding.provider = provider;
      this._binding.scope = literal_types.BindingScopeEnum.Singleton;
      return new binding_when_on_syntax.BindingWhenOnSyntax(this._binding);
    };

    BindingToSyntax.prototype.toService = function (service) {
      this.toDynamicValue(function (context) {
        return context.container.get(service);
      });
    };

    return BindingToSyntax;
  }();

  exports.BindingToSyntax = BindingToSyntax;
});
unwrapExports(binding_to_syntax);
var binding_to_syntax_1 = binding_to_syntax.BindingToSyntax;

var container_snapshot = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContainerSnapshot = void 0;

  var ContainerSnapshot = function () {
    function ContainerSnapshot() {}

    ContainerSnapshot.of = function (bindings, middleware) {
      var snapshot = new ContainerSnapshot();
      snapshot.bindings = bindings;
      snapshot.middleware = middleware;
      return snapshot;
    };

    return ContainerSnapshot;
  }();

  exports.ContainerSnapshot = ContainerSnapshot;
});
unwrapExports(container_snapshot);
var container_snapshot_1 = container_snapshot.ContainerSnapshot;

var lookup = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Lookup = void 0;

  var Lookup = function () {
    function Lookup() {
      this._map = new Map();
    }

    Lookup.prototype.getMap = function () {
      return this._map;
    };

    Lookup.prototype.add = function (serviceIdentifier, value) {
      if (serviceIdentifier === null || serviceIdentifier === undefined) {
        throw new Error(error_msgs.NULL_ARGUMENT);
      }

      if (value === null || value === undefined) {
        throw new Error(error_msgs.NULL_ARGUMENT);
      }

      var entry = this._map.get(serviceIdentifier);

      if (entry !== undefined) {
        entry.push(value);

        this._map.set(serviceIdentifier, entry);
      } else {
        this._map.set(serviceIdentifier, [value]);
      }
    };

    Lookup.prototype.get = function (serviceIdentifier) {
      if (serviceIdentifier === null || serviceIdentifier === undefined) {
        throw new Error(error_msgs.NULL_ARGUMENT);
      }

      var entry = this._map.get(serviceIdentifier);

      if (entry !== undefined) {
        return entry;
      } else {
        throw new Error(error_msgs.KEY_NOT_FOUND);
      }
    };

    Lookup.prototype.remove = function (serviceIdentifier) {
      if (serviceIdentifier === null || serviceIdentifier === undefined) {
        throw new Error(error_msgs.NULL_ARGUMENT);
      }

      if (!this._map.delete(serviceIdentifier)) {
        throw new Error(error_msgs.KEY_NOT_FOUND);
      }
    };

    Lookup.prototype.removeByCondition = function (condition) {
      var _this = this;

      this._map.forEach(function (entries, key) {
        var updatedEntries = entries.filter(function (entry) {
          return !condition(entry);
        });

        if (updatedEntries.length > 0) {
          _this._map.set(key, updatedEntries);
        } else {
          _this._map.delete(key);
        }
      });
    };

    Lookup.prototype.hasKey = function (serviceIdentifier) {
      if (serviceIdentifier === null || serviceIdentifier === undefined) {
        throw new Error(error_msgs.NULL_ARGUMENT);
      }

      return this._map.has(serviceIdentifier);
    };

    Lookup.prototype.clone = function () {
      var copy = new Lookup();

      this._map.forEach(function (value, key) {
        value.forEach(function (b) {
          return copy.add(key, b.clone());
        });
      });

      return copy;
    };

    Lookup.prototype.traverse = function (func) {
      this._map.forEach(function (value, key) {
        func(key, value);
      });
    };

    return Lookup;
  }();

  exports.Lookup = Lookup;
});
unwrapExports(lookup);
var lookup_1 = lookup.Lookup;

var container = createCommonjsModule(function (module, exports) {

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) {
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
      to[j] = from[i];
    }

    return to;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Container = void 0;

  var Container = function () {
    function Container(containerOptions) {
      this._appliedMiddleware = [];
      var options = containerOptions || {};

      if (_typeof(options) !== "object") {
        throw new Error("" + error_msgs.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
      }

      if (options.defaultScope === undefined) {
        options.defaultScope = literal_types.BindingScopeEnum.Transient;
      } else if (options.defaultScope !== literal_types.BindingScopeEnum.Singleton && options.defaultScope !== literal_types.BindingScopeEnum.Transient && options.defaultScope !== literal_types.BindingScopeEnum.Request) {
        throw new Error("" + error_msgs.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
      }

      if (options.autoBindInjectable === undefined) {
        options.autoBindInjectable = false;
      } else if (typeof options.autoBindInjectable !== "boolean") {
        throw new Error("" + error_msgs.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
      }

      if (options.skipBaseClassChecks === undefined) {
        options.skipBaseClassChecks = false;
      } else if (typeof options.skipBaseClassChecks !== "boolean") {
        throw new Error("" + error_msgs.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
      }

      this.options = {
        autoBindInjectable: options.autoBindInjectable,
        defaultScope: options.defaultScope,
        skipBaseClassChecks: options.skipBaseClassChecks
      };
      this.id = id_1.id();
      this._bindingDictionary = new lookup.Lookup();
      this._snapshots = [];
      this._middleware = null;
      this.parent = null;
      this._metadataReader = new metadata_reader.MetadataReader();
    }

    Container.merge = function (container1, container2) {
      var container3 = [];

      for (var _i = 2; _i < arguments.length; _i++) {
        container3[_i - 2] = arguments[_i];
      }

      var container = new Container();

      var targetContainers = __spreadArray([container1, container2], container3).map(function (targetContainer) {
        return planner.getBindingDictionary(targetContainer);
      });

      var bindingDictionary = planner.getBindingDictionary(container);

      function copyDictionary(origin, destination) {
        origin.traverse(function (key, value) {
          value.forEach(function (binding) {
            destination.add(binding.serviceIdentifier, binding.clone());
          });
        });
      }

      targetContainers.forEach(function (targetBindingDictionary) {
        copyDictionary(targetBindingDictionary, bindingDictionary);
      });
      return container;
    };

    Container.prototype.load = function () {
      var modules = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        modules[_i] = arguments[_i];
      }

      var getHelpers = this._getContainerModuleHelpersFactory();

      for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
        var currentModule = modules_1[_a];
        var containerModuleHelpers = getHelpers(currentModule.id);
        currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
      }
    };

    Container.prototype.loadAsync = function () {
      var modules = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        modules[_i] = arguments[_i];
      }

      return __awaiter(this, void 0, void 0, function () {
        var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              getHelpers = this._getContainerModuleHelpersFactory();
              _a = 0, modules_2 = modules;
              _b.label = 1;

            case 1:
              if (!(_a < modules_2.length)) return [3, 4];
              currentModule = modules_2[_a];
              containerModuleHelpers = getHelpers(currentModule.id);
              return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];

            case 2:
              _b.sent();

              _b.label = 3;

            case 3:
              _a++;
              return [3, 1];

            case 4:
              return [2];
          }
        });
      });
    };

    Container.prototype.unload = function () {
      var _this = this;

      var modules = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        modules[_i] = arguments[_i];
      }

      var conditionFactory = function conditionFactory(expected) {
        return function (item) {
          return item.moduleId === expected;
        };
      };

      modules.forEach(function (module) {
        var condition = conditionFactory(module.id);

        _this._bindingDictionary.removeByCondition(condition);
      });
    };

    Container.prototype.bind = function (serviceIdentifier) {
      var scope = this.options.defaultScope || literal_types.BindingScopeEnum.Transient;
      var binding$1 = new binding.Binding(serviceIdentifier, scope);

      this._bindingDictionary.add(serviceIdentifier, binding$1);

      return new binding_to_syntax.BindingToSyntax(binding$1);
    };

    Container.prototype.rebind = function (serviceIdentifier) {
      this.unbind(serviceIdentifier);
      return this.bind(serviceIdentifier);
    };

    Container.prototype.unbind = function (serviceIdentifier) {
      try {
        this._bindingDictionary.remove(serviceIdentifier);
      } catch (e) {
        throw new Error(error_msgs.CANNOT_UNBIND + " " + serialization.getServiceIdentifierAsString(serviceIdentifier));
      }
    };

    Container.prototype.unbindAll = function () {
      this._bindingDictionary = new lookup.Lookup();
    };

    Container.prototype.isBound = function (serviceIdentifier) {
      var bound = this._bindingDictionary.hasKey(serviceIdentifier);

      if (!bound && this.parent) {
        bound = this.parent.isBound(serviceIdentifier);
      }

      return bound;
    };

    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
      return this.isBoundTagged(serviceIdentifier, metadata_keys.NAMED_TAG, named);
    };

    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
      var bound = false;

      if (this._bindingDictionary.hasKey(serviceIdentifier)) {
        var bindings = this._bindingDictionary.get(serviceIdentifier);

        var request_1 = planner.createMockRequest(this, serviceIdentifier, key, value);
        bound = bindings.some(function (b) {
          return b.constraint(request_1);
        });
      }

      if (!bound && this.parent) {
        bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
      }

      return bound;
    };

    Container.prototype.snapshot = function () {
      this._snapshots.push(container_snapshot.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };

    Container.prototype.restore = function () {
      var snapshot = this._snapshots.pop();

      if (snapshot === undefined) {
        throw new Error(error_msgs.NO_MORE_SNAPSHOTS_AVAILABLE);
      }

      this._bindingDictionary = snapshot.bindings;
      this._middleware = snapshot.middleware;
    };

    Container.prototype.createChild = function (containerOptions) {
      var child = new Container(containerOptions || this.options);
      child.parent = this;
      return child;
    };

    Container.prototype.applyMiddleware = function () {
      var middlewares = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
      }

      this._appliedMiddleware = this._appliedMiddleware.concat(middlewares);
      var initial = this._middleware ? this._middleware : this._planAndResolve();
      this._middleware = middlewares.reduce(function (prev, curr) {
        return curr(prev);
      }, initial);
    };

    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
      this._metadataReader = metadataReader;
    };

    Container.prototype.get = function (serviceIdentifier) {
      return this._get(false, false, literal_types.TargetTypeEnum.Variable, serviceIdentifier);
    };

    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
      return this._get(false, false, literal_types.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };

    Container.prototype.getNamed = function (serviceIdentifier, named) {
      return this.getTagged(serviceIdentifier, metadata_keys.NAMED_TAG, named);
    };

    Container.prototype.getAll = function (serviceIdentifier) {
      return this._get(true, true, literal_types.TargetTypeEnum.Variable, serviceIdentifier);
    };

    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
      return this._get(false, true, literal_types.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };

    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
      return this.getAllTagged(serviceIdentifier, metadata_keys.NAMED_TAG, named);
    };

    Container.prototype.resolve = function (constructorFunction) {
      var tempContainer = this.createChild();
      tempContainer.bind(constructorFunction).toSelf();

      this._appliedMiddleware.forEach(function (m) {
        tempContainer.applyMiddleware(m);
      });

      return tempContainer.get(constructorFunction);
    };

    Container.prototype._getContainerModuleHelpersFactory = function () {
      var _this = this;

      var setModuleId = function setModuleId(bindingToSyntax, moduleId) {
        bindingToSyntax._binding.moduleId = moduleId;
      };

      var getBindFunction = function getBindFunction(moduleId) {
        return function (serviceIdentifier) {
          var _bind = _this.bind.bind(_this);

          var bindingToSyntax = _bind(serviceIdentifier);

          setModuleId(bindingToSyntax, moduleId);
          return bindingToSyntax;
        };
      };

      var getUnbindFunction = function getUnbindFunction(moduleId) {
        return function (serviceIdentifier) {
          var _unbind = _this.unbind.bind(_this);

          _unbind(serviceIdentifier);
        };
      };

      var getIsboundFunction = function getIsboundFunction(moduleId) {
        return function (serviceIdentifier) {
          var _isBound = _this.isBound.bind(_this);

          return _isBound(serviceIdentifier);
        };
      };

      var getRebindFunction = function getRebindFunction(moduleId) {
        return function (serviceIdentifier) {
          var _rebind = _this.rebind.bind(_this);

          var bindingToSyntax = _rebind(serviceIdentifier);

          setModuleId(bindingToSyntax, moduleId);
          return bindingToSyntax;
        };
      };

      return function (mId) {
        return {
          bindFunction: getBindFunction(mId),
          isboundFunction: getIsboundFunction(),
          rebindFunction: getRebindFunction(mId),
          unbindFunction: getUnbindFunction()
        };
      };
    };

    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
      var result = null;
      var defaultArgs = {
        avoidConstraints: avoidConstraints,
        contextInterceptor: function contextInterceptor(context) {
          return context;
        },
        isMultiInject: isMultiInject,
        key: key,
        serviceIdentifier: serviceIdentifier,
        targetType: targetType,
        value: value
      };

      if (this._middleware) {
        result = this._middleware(defaultArgs);

        if (result === undefined || result === null) {
          throw new Error(error_msgs.INVALID_MIDDLEWARE_RETURN);
        }
      } else {
        result = this._planAndResolve()(defaultArgs);
      }

      return result;
    };

    Container.prototype._planAndResolve = function () {
      var _this = this;

      return function (args) {
        var context = planner.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
        context = args.contextInterceptor(context);
        var result = resolver.resolve(context);
        return result;
      };
    };

    return Container;
  }();

  exports.Container = Container;
});
unwrapExports(container);
var container_1 = container.Container;

var container_module = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AsyncContainerModule = exports.ContainerModule = void 0;

  var ContainerModule = function () {
    function ContainerModule(registry) {
      this.id = id_1.id();
      this.registry = registry;
    }

    return ContainerModule;
  }();

  exports.ContainerModule = ContainerModule;

  var AsyncContainerModule = function () {
    function AsyncContainerModule(registry) {
      this.id = id_1.id();
      this.registry = registry;
    }

    return AsyncContainerModule;
  }();

  exports.AsyncContainerModule = AsyncContainerModule;
});
unwrapExports(container_module);
var container_module_1 = container_module.AsyncContainerModule;
var container_module_2 = container_module.ContainerModule;

var injectable_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.injectable = void 0;

  function injectable() {
    return function (target) {
      if (Reflect.hasOwnMetadata(metadata_keys.PARAM_TYPES, target)) {
        throw new Error(error_msgs.DUPLICATED_INJECTABLE_DECORATOR);
      }

      var types = Reflect.getMetadata(metadata_keys.DESIGN_PARAM_TYPES, target) || [];
      Reflect.defineMetadata(metadata_keys.PARAM_TYPES, types, target);
      return target;
    };
  }

  exports.injectable = injectable;
});
unwrapExports(injectable_1);
var injectable_2 = injectable_1.injectable;

var tagged_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tagged = void 0;

  function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadataKey, metadataValue);

      if (typeof index === "number") {
        decorator_utils.tagParameter(target, targetKey, index, metadata$1);
      } else {
        decorator_utils.tagProperty(target, targetKey, metadata$1);
      }
    };
  }

  exports.tagged = tagged;
});
unwrapExports(tagged_1);
var tagged_2 = tagged_1.tagged;

var named_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.named = void 0;

  function named(name) {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadata_keys.NAMED_TAG, name);

      if (typeof index === "number") {
        decorator_utils.tagParameter(target, targetKey, index, metadata$1);
      } else {
        decorator_utils.tagProperty(target, targetKey, metadata$1);
      }
    };
  }

  exports.named = named;
});
unwrapExports(named_1);
var named_2 = named_1.named;

var optional_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.optional = void 0;

  function optional() {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadata_keys.OPTIONAL_TAG, true);

      if (typeof index === "number") {
        decorator_utils.tagParameter(target, targetKey, index, metadata$1);
      } else {
        decorator_utils.tagProperty(target, targetKey, metadata$1);
      }
    };
  }

  exports.optional = optional;
});
unwrapExports(optional_1);
var optional_2 = optional_1.optional;

var unmanaged_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unmanaged = void 0;

  function unmanaged() {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadata_keys.UNMANAGED_TAG, true);
      decorator_utils.tagParameter(target, targetKey, index, metadata$1);
    };
  }

  exports.unmanaged = unmanaged;
});
unwrapExports(unmanaged_1);
var unmanaged_2 = unmanaged_1.unmanaged;

var multi_inject = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.multiInject = void 0;

  function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadata_keys.MULTI_INJECT_TAG, serviceIdentifier);

      if (typeof index === "number") {
        decorator_utils.tagParameter(target, targetKey, index, metadata$1);
      } else {
        decorator_utils.tagProperty(target, targetKey, metadata$1);
      }
    };
  }

  exports.multiInject = multiInject;
});
unwrapExports(multi_inject);
var multi_inject_1 = multi_inject.multiInject;

var target_name = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.targetName = void 0;

  function targetName(name) {
    return function (target, targetKey, index) {
      var metadata$1 = new metadata.Metadata(metadata_keys.NAME_TAG, name);
      decorator_utils.tagParameter(target, targetKey, index, metadata$1);
    };
  }

  exports.targetName = targetName;
});
unwrapExports(target_name);
var target_name_1 = target_name.targetName;

var post_construct = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.postConstruct = void 0;

  function postConstruct() {
    return function (target, propertyKey, descriptor) {
      var metadata$1 = new metadata.Metadata(metadata_keys.POST_CONSTRUCT, propertyKey);

      if (Reflect.hasOwnMetadata(metadata_keys.POST_CONSTRUCT, target.constructor)) {
        throw new Error(error_msgs.MULTIPLE_POST_CONSTRUCT_METHODS);
      }

      Reflect.defineMetadata(metadata_keys.POST_CONSTRUCT, metadata$1, target.constructor);
    };
  }

  exports.postConstruct = postConstruct;
});
unwrapExports(post_construct);
var post_construct_1 = post_construct.postConstruct;

var binding_utils = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.multiBindToService = void 0;

  var multiBindToService = function multiBindToService(container) {
    return function (service) {
      return function () {
        var types = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          types[_i] = arguments[_i];
        }

        return types.forEach(function (t) {
          return container.bind(t).toService(service);
        });
      };
    };
  };

  exports.multiBindToService = multiBindToService;
});
unwrapExports(binding_utils);
var binding_utils_1 = binding_utils.multiBindToService;

var inversify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.multiBindToService = exports.getServiceIdentifierAsString = exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = exports.decorate = exports.id = exports.MetadataReader = exports.postConstruct = exports.targetName = exports.multiInject = exports.unmanaged = exports.optional = exports.LazyServiceIdentifer = exports.inject = exports.named = exports.tagged = exports.injectable = exports.ContainerModule = exports.AsyncContainerModule = exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = exports.Container = exports.METADATA_KEY = void 0;
  exports.METADATA_KEY = metadata_keys;
  Object.defineProperty(exports, "Container", {
    enumerable: true,
    get: function get() {
      return container.Container;
    }
  });
  Object.defineProperty(exports, "BindingScopeEnum", {
    enumerable: true,
    get: function get() {
      return literal_types.BindingScopeEnum;
    }
  });
  Object.defineProperty(exports, "BindingTypeEnum", {
    enumerable: true,
    get: function get() {
      return literal_types.BindingTypeEnum;
    }
  });
  Object.defineProperty(exports, "TargetTypeEnum", {
    enumerable: true,
    get: function get() {
      return literal_types.TargetTypeEnum;
    }
  });
  Object.defineProperty(exports, "AsyncContainerModule", {
    enumerable: true,
    get: function get() {
      return container_module.AsyncContainerModule;
    }
  });
  Object.defineProperty(exports, "ContainerModule", {
    enumerable: true,
    get: function get() {
      return container_module.ContainerModule;
    }
  });
  Object.defineProperty(exports, "injectable", {
    enumerable: true,
    get: function get() {
      return injectable_1.injectable;
    }
  });
  Object.defineProperty(exports, "tagged", {
    enumerable: true,
    get: function get() {
      return tagged_1.tagged;
    }
  });
  Object.defineProperty(exports, "named", {
    enumerable: true,
    get: function get() {
      return named_1.named;
    }
  });
  Object.defineProperty(exports, "inject", {
    enumerable: true,
    get: function get() {
      return inject_1.inject;
    }
  });
  Object.defineProperty(exports, "LazyServiceIdentifer", {
    enumerable: true,
    get: function get() {
      return inject_1.LazyServiceIdentifer;
    }
  });
  Object.defineProperty(exports, "optional", {
    enumerable: true,
    get: function get() {
      return optional_1.optional;
    }
  });
  Object.defineProperty(exports, "unmanaged", {
    enumerable: true,
    get: function get() {
      return unmanaged_1.unmanaged;
    }
  });
  Object.defineProperty(exports, "multiInject", {
    enumerable: true,
    get: function get() {
      return multi_inject.multiInject;
    }
  });
  Object.defineProperty(exports, "targetName", {
    enumerable: true,
    get: function get() {
      return target_name.targetName;
    }
  });
  Object.defineProperty(exports, "postConstruct", {
    enumerable: true,
    get: function get() {
      return post_construct.postConstruct;
    }
  });
  Object.defineProperty(exports, "MetadataReader", {
    enumerable: true,
    get: function get() {
      return metadata_reader.MetadataReader;
    }
  });
  Object.defineProperty(exports, "id", {
    enumerable: true,
    get: function get() {
      return id_1.id;
    }
  });
  Object.defineProperty(exports, "decorate", {
    enumerable: true,
    get: function get() {
      return decorator_utils.decorate;
    }
  });
  Object.defineProperty(exports, "traverseAncerstors", {
    enumerable: true,
    get: function get() {
      return constraint_helpers.traverseAncerstors;
    }
  });
  Object.defineProperty(exports, "taggedConstraint", {
    enumerable: true,
    get: function get() {
      return constraint_helpers.taggedConstraint;
    }
  });
  Object.defineProperty(exports, "namedConstraint", {
    enumerable: true,
    get: function get() {
      return constraint_helpers.namedConstraint;
    }
  });
  Object.defineProperty(exports, "typeConstraint", {
    enumerable: true,
    get: function get() {
      return constraint_helpers.typeConstraint;
    }
  });
  Object.defineProperty(exports, "getServiceIdentifierAsString", {
    enumerable: true,
    get: function get() {
      return serialization.getServiceIdentifierAsString;
    }
  });
  Object.defineProperty(exports, "multiBindToService", {
    enumerable: true,
    get: function get() {
      return binding_utils.multiBindToService;
    }
  });
});
unwrapExports(inversify);
var inversify_1 = inversify.multiBindToService;
var inversify_2 = inversify.getServiceIdentifierAsString;
var inversify_3 = inversify.typeConstraint;
var inversify_4 = inversify.namedConstraint;
var inversify_5 = inversify.taggedConstraint;
var inversify_6 = inversify.traverseAncerstors;
var inversify_7 = inversify.decorate;
var inversify_8 = inversify.id;
var inversify_9 = inversify.MetadataReader;
var inversify_10 = inversify.postConstruct;
var inversify_11 = inversify.targetName;
var inversify_12 = inversify.multiInject;
var inversify_13 = inversify.unmanaged;
var inversify_14 = inversify.optional;
var inversify_15 = inversify.LazyServiceIdentifer;
var inversify_16 = inversify.inject;
var inversify_17 = inversify.named;
var inversify_18 = inversify.tagged;
var inversify_19 = inversify.injectable;
var inversify_20 = inversify.ContainerModule;
var inversify_21 = inversify.AsyncContainerModule;
var inversify_22 = inversify.TargetTypeEnum;
var inversify_23 = inversify.BindingTypeEnum;
var inversify_24 = inversify.BindingScopeEnum;
var inversify_25 = inversify.Container;
var inversify_26 = inversify.METADATA_KEY;

function isString(o) {
  return typeof o === 'string';
}

function isUndefined(o) {
  return typeof o === 'undefined';
}

function isObject(o) {
  return o !== null && _typeof(o) === 'object';
}

function isBoolean(o) {
  return o === true || o === false;
}

function isFunction(o) {
  return typeof o === 'function';
}

var isArray = Array.isArray;
var touchEvents = {
  bindTouchStart: '',
  bindTouchMove: '',
  bindTouchEnd: '',
  bindTouchCancel: '',
  bindLongTap: ''
};
var animationEvents = {
  bindAnimationStart: '',
  bindAnimationIteration: '',
  bindAnimationEnd: '',
  bindTransitionEnd: ''
};

function singleQuote(s) {
  return "'".concat(s, "'");
}

var View = Object.assign(Object.assign({
  'hover-class': singleQuote('none'),
  'hover-stop-propagation': 'false',
  'hover-start-time': '50',
  'hover-stay-time': '400',
  animation: ''
}, touchEvents), animationEvents);
var Icon = {
  type: '',
  size: '23',
  color: ''
};
var MapComp = Object.assign({
  longitude: '',
  latitude: '',
  scale: '16',
  markers: '[]',
  covers: '',
  polyline: '[]',
  circles: '[]',
  controls: '[]',
  'include-points': '[]',
  'show-location': '',
  'layer-style': '1',
  bindMarkerTap: '',
  bindControlTap: '',
  bindCalloutTap: '',
  bindUpdated: ''
}, touchEvents);
var Progress = {
  percent: '',
  'stroke-width': '6',
  color: singleQuote('#09BB07'),
  activeColor: singleQuote('#09BB07'),
  backgroundColor: singleQuote('#EBEBEB'),
  active: 'false',
  'active-mode': singleQuote('backwards'),
  'show-info': 'false'
};
var RichText = {
  nodes: '[]'
};
var Text = {
  selectable: 'false',
  space: '',
  decode: 'false'
};
var Button = Object.assign({
  size: singleQuote('default'),
  type: '',
  plain: 'false',
  disabled: '',
  loading: 'false',
  'form-type': '',
  'open-type': '',
  'hover-class': singleQuote('button-hover'),
  'hover-stop-propagation': 'false',
  'hover-start-time': '20',
  'hover-stay-time': '70',
  name: ''
}, touchEvents);
var Checkbox = {
  value: '',
  disabled: '',
  checked: 'false',
  color: singleQuote('#09BB07'),
  name: ''
};
var CheckboxGroup = {
  bindChange: '',
  name: ''
};
var Form = {
  'report-submit': 'false',
  bindSubmit: '',
  bindReset: '',
  name: ''
};
var Input = {
  value: '',
  type: singleQuote(''),
  password: 'false',
  placeholder: '',
  'placeholder-style': '',
  'placeholder-class': singleQuote('input-placeholder'),
  disabled: '',
  maxlength: '140',
  'cursor-spacing': '0',
  focus: 'false',
  'confirm-type': singleQuote('done'),
  'confirm-hold': 'false',
  cursor: 'i.value.length',
  'selection-start': '-1',
  'selection-end': '-1',
  bindInput: '',
  bindFocus: '',
  bindBlur: '',
  bindConfirm: '',
  name: ''
};
var Label = {
  for: '',
  name: ''
};
var Picker = {
  mode: singleQuote('selector'),
  disabled: '',
  range: '',
  'range-key': '',
  value: '',
  start: '',
  end: '',
  fields: singleQuote('day'),
  'custom-item': '',
  name: '',
  bindCancel: '',
  bindChange: '',
  bindColumnChange: ''
};
var PickerView = {
  value: '',
  'indicator-style': '',
  'indicator-class': '',
  'mask-style': '',
  'mask-class': '',
  bindChange: '',
  name: ''
};
var PickerViewColumn = {
  name: ''
};
var Radio = {
  value: '',
  checked: 'false',
  disabled: '',
  color: singleQuote('#09BB07'),
  name: ''
};
var RadioGroup = {
  bindChange: '',
  name: ''
};
var Slider = {
  min: '0',
  max: '100',
  step: '1',
  disabled: '',
  value: '0',
  activeColor: singleQuote('#1aad19'),
  backgroundColor: singleQuote('#e9e9e9'),
  'block-size': '28',
  'block-color': singleQuote('#ffffff'),
  'show-value': 'false',
  bindChange: '',
  bindChanging: '',
  name: ''
};
var Switch = {
  checked: 'false',
  disabled: '',
  type: singleQuote('switch'),
  color: singleQuote('#04BE02'),
  bindChange: '',
  name: ''
};
var Textarea = {
  value: '',
  placeholder: '',
  'placeholder-style': '',
  'placeholder-class': singleQuote('textarea-placeholder'),
  disabled: '',
  maxlength: '140',
  'auto-focus': 'false',
  focus: 'false',
  'auto-height': 'false',
  fixed: 'false',
  'cursor-spacing': '0',
  cursor: '-1',
  'selection-start': '-1',
  'selection-end': '-1',
  bindFocus: '',
  bindBlur: '',
  bindLineChange: '',
  bindInput: '',
  bindConfirm: '',
  name: ''
};
var CoverImage = {
  src: '',
  bindLoad: 'eh',
  bindError: 'eh'
};
var CoverView = Object.assign({
  'scroll-top': 'false'
}, touchEvents);
var MovableArea = {
  'scale-area': 'false'
};
var MovableView = Object.assign(Object.assign({
  direction: 'none',
  inertia: 'false',
  'out-of-bounds': 'false',
  x: '',
  y: '',
  damping: '20',
  friction: '2',
  disabled: '',
  scale: 'false',
  'scale-min': '0.5',
  'scale-max': '10',
  'scale-value': '1',
  animation: 'true',
  bindChange: '',
  bindScale: '',
  bindHTouchMove: '',
  bindVTouchMove: '',
  width: singleQuote('10px'),
  height: singleQuote('10px')
}, touchEvents), animationEvents);
var ScrollView = Object.assign(Object.assign({
  'scroll-x': 'false',
  'scroll-y': 'false',
  'upper-threshold': '50',
  'lower-threshold': '50',
  'scroll-top': '',
  'scroll-left': '',
  'scroll-into-view': '',
  'scroll-with-animation': 'false',
  'enable-back-to-top': 'false',
  bindScrollToUpper: '',
  bindScrollToLower: '',
  bindScroll: ''
}, touchEvents), animationEvents);
var Swiper = Object.assign({
  'indicator-dots': 'false',
  'indicator-color': singleQuote('rgba(0, 0, 0, .3)'),
  'indicator-active-color': singleQuote('#000000'),
  autoplay: 'false',
  current: '0',
  interval: '5000',
  duration: '500',
  circular: 'false',
  vertical: 'false',
  'previous-margin': '\'0px\'',
  'next-margin': '\'0px\'',
  'display-multiple-items': '1',
  bindChange: '',
  bindTransition: '',
  bindAnimationFinish: ''
}, touchEvents);
var SwiperItem = {
  'item-id': ''
};
var Navigator = {
  url: '',
  'open-type': singleQuote('navigate'),
  delta: '1',
  'hover-class': singleQuote('navigator-hover'),
  'hover-stop-propagation': 'false',
  'hover-start-time': '50',
  'hover-stay-time': '600',
  bindSuccess: '',
  bindFail: '',
  bindComplete: ''
};
var Audio = {
  id: '',
  src: '',
  loop: 'false',
  controls: 'false',
  poster: '',
  name: '',
  author: '',
  bindError: '',
  bindPlay: '',
  bindPause: '',
  bindTimeUpdate: '',
  bindEnded: ''
};
var Camera = {
  'device-position': singleQuote('back'),
  flash: singleQuote('auto'),
  bindStop: '',
  bindError: ''
};
var Image = Object.assign({
  src: '',
  mode: singleQuote('scaleToFill'),
  'lazy-load': 'false',
  bindError: '',
  bindLoad: ''
}, touchEvents);
var LivePlayer = {
  src: '',
  autoplay: 'false',
  muted: 'false',
  orientation: singleQuote('vertical'),
  'object-fit': singleQuote('contain'),
  'background-mute': 'false',
  'min-cache': '1',
  'max-cache': '3',
  animation: '',
  bindStateChange: '',
  bindFullScreenChange: '',
  bindNetStatus: ''
};
var Video = {
  src: '',
  duration: '',
  controls: 'true',
  'danmu-list': '',
  'danmu-btn': '',
  'enable-danmu': '',
  autoplay: 'false',
  loop: 'false',
  muted: 'false',
  'initial-time': '0',
  'page-gesture': 'false',
  direction: '',
  'show-progress': 'true',
  'show-fullscreen-btn': 'true',
  'show-play-btn': 'true',
  'show-center-play-btn': 'true',
  'enable-progress-gesture': 'true',
  'object-fit': singleQuote('contain'),
  poster: '',
  'show-mute-btn': 'false',
  animation: '',
  bindPlay: '',
  bindPause: '',
  bindEnded: '',
  bindTimeUpdate: '',
  bindFullScreenChange: '',
  bindWaiting: '',
  bindError: ''
};
var Canvas = Object.assign({
  'canvas-id': '',
  'disable-scroll': 'false',
  bindError: ''
}, touchEvents);
var Ad = {
  'unit-id': '',
  'ad-intervals': '',
  bindLoad: '',
  bindError: '',
  bindClose: ''
};
var WebView = {
  src: '',
  bindMessage: '',
  bindLoad: '',
  bindError: ''
};
var Block = {}; // For Vue，因为 slot 标签被 vue 占用了

var SlotView = {
  name: ''
}; // For React
// Slot 和 SlotView 最终都会编译成 <view slot={{ i.name }} />
// 因为 <slot name="{{ i.name }}" /> 适用性没有前者高（无法添加类和样式）
// 不给 View 直接加 slot 属性的原因是性能损耗

var Slot = {
  name: ''
};
var internalComponents = {
  View: View,
  Icon: Icon,
  Progress: Progress,
  RichText: RichText,
  Text: Text,
  Button: Button,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Form: Form,
  Input: Input,
  Label: Label,
  Picker: Picker,
  PickerView: PickerView,
  PickerViewColumn: PickerViewColumn,
  Radio: Radio,
  RadioGroup: RadioGroup,
  Slider: Slider,
  Switch: Switch,
  CoverImage: CoverImage,
  Textarea: Textarea,
  CoverView: CoverView,
  MovableArea: MovableArea,
  MovableView: MovableView,
  ScrollView: ScrollView,
  Swiper: Swiper,
  SwiperItem: SwiperItem,
  Navigator: Navigator,
  Audio: Audio,
  Camera: Camera,
  Image: Image,
  LivePlayer: LivePlayer,
  Video: Video,
  Canvas: Canvas,
  Ad: Ad,
  WebView: WebView,
  Block: Block,
  Map: MapComp,
  Slot: Slot,
  SlotView: SlotView
};
var controlledComponent = new Set(['input', 'checkbox', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea']);
var EMPTY_OBJ = {};

var noop = function noop() {};

var defaultReconciler = Object.create(null);

function toDashed(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function toCamelCase(s) {
  var camel = '';
  var nextCap = false;

  for (var i = 0; i < s.length; i++) {
    if (s[i] !== '-') {
      camel += nextCap ? s[i].toUpperCase() : s[i];
      nextCap = false;
    } else {
      nextCap = true;
    }
  }

  return camel;
}

var reportIssue = '如有疑问，请提交 issue 至：https://github.com/nervjs/taro/issues';
/**
 * ensure takes a condition and throw a error if the condition fails,
 * like failure::ensure: https://docs.rs/failure/0.1.1/failure/macro.ensure.html
 * @param condition condition.
 * @param msg error message.
 */

function ensure(condition, msg) {
  if (!condition) {
    throw new Error(msg + '\n' + reportIssue);
  }
}

function warn(condition, msg) {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      console.warn("[taro warn] ".concat(msg));
    }
  }
}

var _loadTime = new Date().getTime().toString();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/** https://github.com/rbuckton/reflect-metadata */

if (process.env.TARO_ENV === 'h5') {
  require('reflect-metadata');
} else {
  // var Reflect;
  (function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
      // var root = typeof global === "object" ? global :
      //     typeof self === "object" ? self :
      //         typeof this === "object" ? this :
      //             Function("return this;")();
      var exporter = makeExporter(Reflect); // if (typeof root.Reflect === "undefined") {
      //     root.Reflect = Reflect;
      // }
      // else {
      //     exporter = makeExporter(root.Reflect, exporter);
      // }

      factory(exporter);

      function makeExporter(target, previous) {
        return function (key, value) {
          if (typeof target[key] !== "function") {
            Object.defineProperty(target, key, {
              configurable: true,
              writable: true,
              value: value
            });
          }

          if (previous) previous(key, value);
        };
      }
    })(function (exporter) {
      var hasOwn = Object.prototype.hasOwnProperty; // feature test for Symbol support

      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support

      var supportsProto = {
        __proto__: []
      } instanceof Array; // feature test for __proto__ support

      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: supportsCreate ? function () {
          return MakeDictionary(Object.create(null));
        } : supportsProto ? function () {
          return MakeDictionary({
            __proto__: null
          });
        } : function () {
          return MakeDictionary({});
        },
        has: downLevel ? function (map, key) {
          return hasOwn.call(map, key);
        } : function (map, key) {
          return key in map;
        },
        get: downLevel ? function (map, key) {
          return hasOwn.call(map, key) ? map[key] : undefined;
        } : function (map, key) {
          return map[key];
        }
      }; // Load global or shim versions of Map, Set, and WeakMap

      var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";

      var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();

      var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();

      var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill(); // [[Metadata]] internal slot
      // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots


      var Metadata = new _WeakMap();
      /**
       * Applies a set of decorators to a property of a target object.
       * @param decorators An array of decorators.
       * @param target The target object.
       * @param propertyKey (Optional) The property key to decorate.
       * @param attributes (Optional) The property descriptor for the target key.
       * @remarks Decorators are applied in reverse order.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     Example = Reflect.decorate(decoratorsArray, Example);
       *
       *     // property (on constructor)
       *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
       *
       *     // property (on prototype)
       *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
       *
       *     // method (on constructor)
       *     Object.defineProperty(Example, "staticMethod",
       *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
       *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
       *
       *     // method (on prototype)
       *     Object.defineProperty(Example.prototype, "method",
       *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
       *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
       *
       */

      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators)) throw new TypeError();
          if (!IsObject(target)) throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
          if (IsNull(attributes)) attributes = undefined;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators)) throw new TypeError();
          if (!IsConstructor(target)) throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }

      exporter("decorate", decorate); // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
      // https://rbuckton.github.io/reflect-metadata/#reflect.metadata

      /**
       * A default metadata decorator factory that can be used on a class, class member, or parameter.
       * @param metadataKey The key for the metadata entry.
       * @param metadataValue The value for the metadata entry.
       * @returns A decorator function.
       * @remarks
       * If `metadataKey` is already defined for the target and target key, the
       * metadataValue for that key will be overwritten.
       * @example
       *
       *     // constructor
       *     @Reflect.metadata(key, value)
       *     class Example {
       *     }
       *
       *     // property (on constructor, TypeScript only)
       *     class Example {
       *         @Reflect.metadata(key, value)
       *         static staticProperty;
       *     }
       *
       *     // property (on prototype, TypeScript only)
       *     class Example {
       *         @Reflect.metadata(key, value)
       *         property;
       *     }
       *
       *     // method (on constructor)
       *     class Example {
       *         @Reflect.metadata(key, value)
       *         static staticMethod() { }
       *     }
       *
       *     // method (on prototype)
       *     class Example {
       *         @Reflect.metadata(key, value)
       *         method() { }
       *     }
       *
       */

      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target)) throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }

        return decorator;
      }

      exporter("metadata", metadata);
      /**
       * Define a unique metadata entry on the target.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param metadataValue A value that contains attached metadata.
       * @param target The target object on which to define metadata.
       * @param propertyKey (Optional) The property key for the target.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     Reflect.defineMetadata("custom:annotation", options, Example);
       *
       *     // property (on constructor)
       *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
       *
       *     // property (on prototype)
       *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
       *
       *     // method (on constructor)
       *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
       *
       *     // method (on prototype)
       *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
       *
       *     // decorator factory as metadata-producing annotation.
       *     function MyAnnotation(options): Decorator {
       *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
       *     }
       *
       */

      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }

      exporter("defineMetadata", defineMetadata);
      /**
       * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.hasMetadata("custom:annotation", Example);
       *
       *     // property (on constructor)
       *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
       *
       */

      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }

      exporter("hasMetadata", hasMetadata);
      /**
       * Gets a value indicating whether the target object has the provided metadata key defined.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
       *
       *     // property (on constructor)
       *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
       *
       */

      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }

      exporter("hasOwnMetadata", hasOwnMetadata);
      /**
       * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.getMetadata("custom:annotation", Example);
       *
       *     // property (on constructor)
       *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
       *
       */

      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }

      exporter("getMetadata", getMetadata);
      /**
       * Gets the metadata value for the provided metadata key on the target object.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.getOwnMetadata("custom:annotation", Example);
       *
       *     // property (on constructor)
       *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
       *
       */

      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }

      exporter("getOwnMetadata", getOwnMetadata);
      /**
       * Gets the metadata keys defined on the target object or its prototype chain.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns An array of unique metadata keys.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.getMetadataKeys(Example);
       *
       *     // property (on constructor)
       *     result = Reflect.getMetadataKeys(Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.getMetadataKeys(Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.getMetadataKeys(Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.getMetadataKeys(Example.prototype, "method");
       *
       */

      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }

      exporter("getMetadataKeys", getMetadataKeys);
      /**
       * Gets the unique metadata keys defined on the target object.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns An array of unique metadata keys.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.getOwnMetadataKeys(Example);
       *
       *     // property (on constructor)
       *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
       *
       */

      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }

      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      /**
       * Deletes the metadata entry from the target object with the provided key.
       * @param metadataKey A key used to store and retrieve metadata.
       * @param target The target object on which the metadata is defined.
       * @param propertyKey (Optional) The property key for the target.
       * @returns `true` if the metadata entry was found and deleted; otherwise, false.
       * @example
       *
       *     class Example {
       *         // property declarations are not part of ES6, though they are valid in TypeScript:
       *         // static staticProperty;
       *         // property;
       *
       *         constructor(p) { }
       *         static staticMethod(p) { }
       *         method(p) { }
       *     }
       *
       *     // constructor
       *     result = Reflect.deleteMetadata("custom:annotation", Example);
       *
       *     // property (on constructor)
       *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
       *
       *     // property (on prototype)
       *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
       *
       *     // method (on constructor)
       *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
       *
       *     // method (on prototype)
       *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
       *
       */

      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey,
        /*Create*/
        false);
        if (IsUndefined(metadataMap)) return false;
        if (!metadataMap.delete(metadataKey)) return false;
        if (metadataMap.size > 0) return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0) return true;
        Metadata.delete(target);
        return true;
      }

      exporter("deleteMetadata", deleteMetadata);

      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);

          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated)) throw new TypeError();
            target = decorated;
          }
        }

        return target;
      }

      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);

          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated)) throw new TypeError();
            descriptor = decorated;
          }
        }

        return descriptor;
      }

      function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);

        if (IsUndefined(targetMetadata)) {
          if (!Create) return undefined;
          targetMetadata = new _Map();
          Metadata.set(O, targetMetadata);
        }

        var metadataMap = targetMetadata.get(P);

        if (IsUndefined(metadataMap)) {
          if (!Create) return undefined;
          metadataMap = new _Map();
          targetMetadata.set(P, metadataMap);
        }

        return metadataMap;
      } // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata


      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      } // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata


      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P,
        /*Create*/
        false);
        if (IsUndefined(metadataMap)) return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      } // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata


      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
      } // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata


      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P,
        /*Create*/
        false);
        if (IsUndefined(metadataMap)) return undefined;
        return metadataMap.get(MetadataKey);
      } // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata


      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P,
        /*Create*/
        true);
        metadataMap.set(MetadataKey, MetadataValue);
      } // 3.1.6.1 OrdinaryMetadataKeys(O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys


      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null) return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) return ownKeys;
        if (ownKeys.length <= 0) return parentKeys;
        var set = new _Set();
        var keys = [];

        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);

          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }

        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);

          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }

        return keys;
      } // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys


      function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P,
        /*Create*/
        false);
        if (IsUndefined(metadataMap)) return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;

        while (true) {
          var next = IteratorStep(iterator);

          if (!next) {
            keys.length = k;
            return keys;
          }

          var nextValue = IteratorValue(next);

          try {
            keys[k] = nextValue;
          } catch (e) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e;
            }
          }

          k++;
        }
      } // 6 ECMAScript Data Typ0es and Values
      // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values


      function Type(x) {
        if (x === null) return 1
        /* Null */
        ;

        switch (_typeof(x)) {
          case "undefined":
            return 0
            /* Undefined */
            ;

          case "boolean":
            return 2
            /* Boolean */
            ;

          case "string":
            return 3
            /* String */
            ;

          case "symbol":
            return 4
            /* Symbol */
            ;

          case "number":
            return 5
            /* Number */
            ;

          case "object":
            return x === null ? 1
            /* Null */
            : 6
            /* Object */
            ;

          default:
            return 6
            /* Object */
            ;
        }
      } // 6.1.1 The Undefined Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type


      function IsUndefined(x) {
        return x === undefined;
      } // 6.1.2 The Null Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type


      function IsNull(x) {
        return x === null;
      } // 6.1.5 The Symbol Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type


      function IsSymbol(x) {
        return _typeof(x) === "symbol";
      } // 6.1.7 The Object Type
      // https://tc39.github.io/ecma262/#sec-object-type


      function IsObject(x) {
        return _typeof(x) === "object" ? x !== null : typeof x === "function";
      } // 7.1 Type Conversion
      // https://tc39.github.io/ecma262/#sec-type-conversion
      // 7.1.1 ToPrimitive(input [, PreferredType])
      // https://tc39.github.io/ecma262/#sec-toprimitive


      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0
          /* Undefined */
          :
            return input;

          case 1
          /* Null */
          :
            return input;

          case 2
          /* Boolean */
          :
            return input;

          case 3
          /* String */
          :
            return input;

          case 4
          /* Symbol */
          :
            return input;

          case 5
          /* Number */
          :
            return input;
        }

        var hint = PreferredType === 3
        /* String */
        ? "string" : PreferredType === 5
        /* Number */
        ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);

        if (exoticToPrim !== undefined) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result)) throw new TypeError();
          return result;
        }

        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      } // 7.1.1.1 OrdinaryToPrimitive(O, hint)
      // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive


      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;

          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result)) return result;
          }

          var valueOf = O.valueOf;

          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result)) return result;
          }
        } else {
          var valueOf = O.valueOf;

          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result)) return result;
          }

          var toString_2 = O.toString;

          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result)) return result;
          }
        }

        throw new TypeError();
      } // 7.1.2 ToBoolean(argument)
      // https://tc39.github.io/ecma262/2016/#sec-toboolean


      function ToBoolean(argument) {
        return !!argument;
      } // 7.1.12 ToString(argument)
      // https://tc39.github.io/ecma262/#sec-tostring


      function ToString(argument) {
        return "" + argument;
      } // 7.1.14 ToPropertyKey(argument)
      // https://tc39.github.io/ecma262/#sec-topropertykey


      function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3
        /* String */
        );
        if (IsSymbol(key)) return key;
        return ToString(key);
      } // 7.2 Testing and Comparison Operations
      // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
      // 7.2.2 IsArray(argument)
      // https://tc39.github.io/ecma262/#sec-isarray


      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      } // 7.2.3 IsCallable(argument)
      // https://tc39.github.io/ecma262/#sec-iscallable


      function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
      } // 7.2.4 IsConstructor(argument)
      // https://tc39.github.io/ecma262/#sec-isconstructor


      function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
      } // 7.2.7 IsPropertyKey(argument)
      // https://tc39.github.io/ecma262/#sec-ispropertykey


      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3
          /* String */
          :
            return true;

          case 4
          /* Symbol */
          :
            return true;

          default:
            return false;
        }
      } // 7.3 Operations on Objects
      // https://tc39.github.io/ecma262/#sec-operations-on-objects
      // 7.3.9 GetMethod(V, P)
      // https://tc39.github.io/ecma262/#sec-getmethod


      function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null) return undefined;
        if (!IsCallable(func)) throw new TypeError();
        return func;
      } // 7.4 Operations on Iterator Objects
      // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects


      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method)) throw new TypeError(); // from Call

        var iterator = method.call(obj);
        if (!IsObject(iterator)) throw new TypeError();
        return iterator;
      } // 7.4.4 IteratorValue(iterResult)
      // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue


      function IteratorValue(iterResult) {
        return iterResult.value;
      } // 7.4.5 IteratorStep(iterator)
      // https://tc39.github.io/ecma262/#sec-iteratorstep


      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      } // 7.4.6 IteratorClose(iterator, completion)
      // https://tc39.github.io/ecma262/#sec-iteratorclose


      function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f) f.call(iterator);
      } // 9.1 Ordinary Object Internal Methods and Internal Slots
      // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
      // 9.1.1.1 OrdinaryGetPrototypeOf(O)
      // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof


      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) return proto; // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.

        if (proto !== functionPrototype) return proto; // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.

        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) return proto; // If the constructor was not a function, then we cannot determine the heritage.

        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") return proto; // If we have some kind of self-reference, then we cannot determine the heritage.

        if (constructor === O) return proto; // we have a pretty good guess at the heritage.

        return constructor;
      } // naive Map shim


      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];

        var MapIterator =
        /** @class */
        function () {
          function MapIterator(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }

          MapIterator.prototype["@@iterator"] = function () {
            return this;
          };

          MapIterator.prototype[iteratorSymbol] = function () {
            return this;
          };

          MapIterator.prototype.next = function () {
            var index = this._index;

            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);

              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }

              return {
                value: result,
                done: false
              };
            }

            return {
              value: undefined,
              done: true
            };
          };

          MapIterator.prototype.throw = function (error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }

            throw error;
          };

          MapIterator.prototype.return = function (value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }

            return {
              value: value,
              done: true
            };
          };

          return MapIterator;
        }();

        return (
          /** @class */
          function () {
            function Map() {
              this._keys = [];
              this._values = [];
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }

            Object.defineProperty(Map.prototype, "size", {
              get: function get() {
                return this._keys.length;
              },
              enumerable: true,
              configurable: true
            });

            Map.prototype.has = function (key) {
              return this._find(key,
              /*insert*/
              false) >= 0;
            };

            Map.prototype.get = function (key) {
              var index = this._find(key,
              /*insert*/
              false);

              return index >= 0 ? this._values[index] : undefined;
            };

            Map.prototype.set = function (key, value) {
              var index = this._find(key,
              /*insert*/
              true);

              this._values[index] = value;
              return this;
            };

            Map.prototype.delete = function (key) {
              var index = this._find(key,
              /*insert*/
              false);

              if (index >= 0) {
                var size = this._keys.length;

                for (var i = index + 1; i < size; i++) {
                  this._keys[i - 1] = this._keys[i];
                  this._values[i - 1] = this._values[i];
                }

                this._keys.length--;
                this._values.length--;

                if (key === this._cacheKey) {
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                }

                return true;
              }

              return false;
            };

            Map.prototype.clear = function () {
              this._keys.length = 0;
              this._values.length = 0;
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            };

            Map.prototype.keys = function () {
              return new MapIterator(this._keys, this._values, getKey);
            };

            Map.prototype.values = function () {
              return new MapIterator(this._keys, this._values, getValue);
            };

            Map.prototype.entries = function () {
              return new MapIterator(this._keys, this._values, getEntry);
            };

            Map.prototype["@@iterator"] = function () {
              return this.entries();
            };

            Map.prototype[iteratorSymbol] = function () {
              return this.entries();
            };

            Map.prototype._find = function (key, insert) {
              if (this._cacheKey !== key) {
                this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
              }

              if (this._cacheIndex < 0 && insert) {
                this._cacheIndex = this._keys.length;

                this._keys.push(key);

                this._values.push(undefined);
              }

              return this._cacheIndex;
            };

            return Map;
          }()
        );

        function getKey(key, _) {
          return key;
        }

        function getValue(_, value) {
          return value;
        }

        function getEntry(key, value) {
          return [key, value];
        }
      } // naive Set shim


      function CreateSetPolyfill() {
        return (
          /** @class */
          function () {
            function Set() {
              this._map = new _Map();
            }

            Object.defineProperty(Set.prototype, "size", {
              get: function get() {
                return this._map.size;
              },
              enumerable: true,
              configurable: true
            });

            Set.prototype.has = function (value) {
              return this._map.has(value);
            };

            Set.prototype.add = function (value) {
              return this._map.set(value, value), this;
            };

            Set.prototype.delete = function (value) {
              return this._map.delete(value);
            };

            Set.prototype.clear = function () {
              this._map.clear();
            };

            Set.prototype.keys = function () {
              return this._map.keys();
            };

            Set.prototype.values = function () {
              return this._map.values();
            };

            Set.prototype.entries = function () {
              return this._map.entries();
            };

            Set.prototype["@@iterator"] = function () {
              return this.keys();
            };

            Set.prototype[iteratorSymbol] = function () {
              return this.keys();
            };

            return Set;
          }()
        );
      } // naive WeakMap shim


      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (
          /** @class */
          function () {
            function WeakMap() {
              this._key = CreateUniqueKey();
            }

            WeakMap.prototype.has = function (target) {
              var table = GetOrCreateWeakMapTable(target,
              /*create*/
              false);
              return table !== undefined ? HashMap.has(table, this._key) : false;
            };

            WeakMap.prototype.get = function (target) {
              var table = GetOrCreateWeakMapTable(target,
              /*create*/
              false);
              return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };

            WeakMap.prototype.set = function (target, value) {
              var table = GetOrCreateWeakMapTable(target,
              /*create*/
              true);
              table[this._key] = value;
              return this;
            };

            WeakMap.prototype.delete = function (target) {
              var table = GetOrCreateWeakMapTable(target,
              /*create*/
              false);
              return table !== undefined ? delete table[this._key] : false;
            };

            WeakMap.prototype.clear = function () {
              // NOTE: not a real clear, just makes the previous data unreachable
              this._key = CreateUniqueKey();
            };

            return WeakMap;
          }()
        );

        function CreateUniqueKey() {
          var key;

          do {
            key = "@@WeakMap@@" + CreateUUID();
          } while (HashMap.has(keys, key));

          keys[key] = true;
          return key;
        }

        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create) return undefined;
            Object.defineProperty(target, rootKey, {
              value: HashMap.create()
            });
          }

          return target[rootKey];
        }

        function FillRandomBytes(buffer, size) {
          for (var i = 0; i < size; ++i) {
            buffer[i] = Math.random() * 0xff | 0;
          }

          return buffer;
        }

        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size));
            if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }

          return FillRandomBytes(new Array(size), size);
        }

        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE); // mark as random - RFC 4122 § 4.4

          data[6] = data[6] & 0x4f | 0x40;
          data[8] = data[8] & 0xbf | 0x80;
          var result = "";

          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8) result += "-";
            if (byte < 16) result += "0";
            result += byte.toString(16).toLowerCase();
          }

          return result;
        }
      } // uses a heuristic used by v8 and chakra to force an object into dictionary mode.


      function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect || (Reflect = {}));
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var SERVICE_IDENTIFIER = {
  TaroElement: 'TaroElement',
  TaroElementFactory: 'Factory<TaroElement>',
  TaroText: 'TaroText',
  TaroTextFactory: 'Factory<TaroText>',
  TaroNodeImpl: 'TaroNodeImpl',
  TaroElementImpl: 'TaroElementImpl',
  Hooks: 'hooks',
  onRemoveAttribute: 'onRemoveAttribute',
  getLifecycle: 'getLifecycle',
  getPathIndex: 'getPathIndex',
  getEventCenter: 'getEventCenter',
  isBubbleEvents: 'isBubbleEvents',
  getSpecialNodes: 'getSpecialNodes',
  eventCenter: 'eventCenter',
  modifyMpEvent: 'modifyMpEvent',
  modifyTaroEvent: 'modifyTaroEvent',
  batchedEventUpdates: 'batchedEventUpdates',
  mergePageInstance: 'mergePageInstance',
  createPullDownComponent: 'createPullDownComponent',
  getDOMNode: 'getDOMNode',
  initNativeApi: 'initNativeApi',
  modifyHydrateData: 'modifyHydrateData',
  modifySetAttrPayload: 'modifySetAttrPayload',
  modifyRmAttrPayload: 'modifyRmAttrPayload',
  onAddEvent: 'onAddEvent',
  patchElement: 'patchElement'
};
var PROPERTY_THRESHOLD = 2046;
var HOOKS_APP_ID = 'taro-app';
var SET_DATA = '小程序 setData';
var PAGE_INIT = '页面初始化';
var ROOT_STR = 'root';
var HTML = 'html';
var HEAD = 'head';
var BODY = 'body';
var APP = 'app';
var CONTAINER = 'container';
var DOCUMENT_ELEMENT_NAME = '#document';
var DOCUMENT_FRAGMENT = 'document-fragment';
var ID = 'id';
var UID = 'uid';
var CLASS = 'class';
var STYLE = 'style';
var FOCUS = 'focus';
var VIEW = 'view';
var STATIC_VIEW = 'static-view';
var PURE_VIEW = 'pure-view';
var PROPS = 'props';
var DATASET = 'dataset';
var OBJECT = 'object';
var VALUE = 'value';
var INPUT = 'input';
var CHANGE = 'change';
var CUSTOM_WRAPPER = 'custom-wrapper';
var TARGET = 'target';
var CURRENT_TARGET = 'currentTarget';
var TYPE = 'type';
var CONFIRM = 'confirm';
var TIME_STAMP = 'timeStamp';
var KEY_CODE = 'keyCode';
var TOUCHMOVE = 'touchmove';
var DATE = 'Date';
var CATCHMOVE = 'catchMove';
var CATCH_VIEW = 'catch-view';
var COMMENT = 'comment';

var incrementId = function incrementId() {
  var id = 0;
  return function () {
    return (id++).toString();
  };
};

function isElement(node) {
  return node.nodeType === 1
  /* ELEMENT_NODE */
  ;
}

function isText(node) {
  return node.nodeType === 3
  /* TEXT_NODE */
  ;
}

function isComment(node) {
  return node.nodeName === COMMENT;
}

function isHasExtractProp(el) {
  var res = Object.keys(el.props).find(function (prop) {
    return !(/^(class|style|id)$/.test(prop) || prop.startsWith('data-'));
  });
  return Boolean(res);
}
/**
 * 往上寻找组件树直到 root，寻找是否有祖先组件绑定了同类型的事件
 * @param node 当前组件
 * @param type 事件类型
 */


function isParentBinded(node, type) {
  var _a;

  var res = false;

  while ((node === null || node === void 0 ? void 0 : node.parentElement) && node.parentElement._path !== ROOT_STR) {
    if ((_a = node.parentElement.__handlers[type]) === null || _a === void 0 ? void 0 : _a.length) {
      res = true;
      break;
    }

    node = node.parentElement;
  }

  return res;
}

function shortcutAttr(key) {
  switch (key) {
    case STYLE:
      return "st"
      /* Style */
      ;

    case ID:
      return UID;

    case CLASS:
      return "cl"
      /* Class */
      ;

    default:
      return key;
  }
}

var TaroEventTarget = /*#__PURE__*/function () {
  function TaroEventTarget( // eslint-disable-next-line @typescript-eslint/indent
  hooks) {
    _classCallCheck(this, TaroEventTarget);

    this.__handlers = {};
    this.hooks = hooks;
  }

  _createClass(TaroEventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, handler, options) {
      var _a, _b;

      (_b = (_a = this.hooks).onAddEvent) === null || _b === void 0 ? void 0 : _b.call(_a, type, handler, options, this);

      if (type === 'regionchange') {
        // map 组件的 regionchange 事件非常特殊，详情：https://github.com/NervJS/taro/issues/5766
        this.addEventListener('begin', handler, options);
        this.addEventListener('end', handler, options);
        return;
      }

      type = type.toLowerCase();
      var handlers = this.__handlers[type];
      var isCapture = Boolean(options);
      var isOnce = false;

      if (isObject(options)) {
        isCapture = Boolean(options.capture);
        isOnce = Boolean(options.once);
      }

      if (isOnce) {
        var wrapper = function wrapper() {
          handler.apply(this, arguments); // this 指向 Element

          this.removeEventListener(type, wrapper);
        };

        this.addEventListener(type, wrapper, Object.assign(Object.assign({}, options), {
          once: false
        }));
        return;
      }

      process.env.NODE_ENV !== 'production' && warn(isCapture, 'Taro 暂未实现 event 的 capture 特性。');

      if (isArray(handlers)) {
        handlers.push(handler);
      } else {
        this.__handlers[type] = [handler];
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, handler) {
      type = type.toLowerCase();

      if (handler == null) {
        return;
      }

      var handlers = this.__handlers[type];

      if (!isArray(handlers)) {
        return;
      }

      var index = handlers.indexOf(handler);
      process.env.NODE_ENV !== 'production' && warn(index === -1, "\u4E8B\u4EF6: '".concat(type, "' \u6CA1\u6709\u6CE8\u518C\u5728 DOM \u4E2D\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u88AB\u79FB\u9664\u3002"));
      handlers.splice(index, 1);
    }
  }, {
    key: "isAnyEventBinded",
    value: function isAnyEventBinded() {
      var handlers = this.__handlers;
      var isAnyEventBinded = Object.keys(handlers).find(function (key) {
        return handlers[key].length;
      });
      return Boolean(isAnyEventBinded);
    }
  }]);

  return TaroEventTarget;
}();

TaroEventTarget = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.Hooks)), __metadata("design:paramtypes", [Object])], TaroEventTarget);
/**
 * React also has a fancy function's name for this: `hydrate()`.
 * You may have been heard `hydrate` as a SSR-related function,
 * actually, `hydrate` basicly do the `render()` thing, but ignore some properties,
 * it's a vnode traverser and modifier: that's exactly what Taro's doing in here.
 */

function hydrate(node) {
  var _data;

  var _a, _b;

  var nodeName = node.nodeName;

  if (isText(node)) {
    var _ref;

    return _ref = {}, _defineProperty(_ref, "v"
    /* Text */
    , node.nodeValue), _defineProperty(_ref, "nn"
    /* NodeName */
    , nodeName), _ref;
  }

  var data = (_data = {}, _defineProperty(_data, "nn"
  /* NodeName */
  , nodeName), _defineProperty(_data, "uid", node.uid), _data);
  var props = node.props;
  var SPECIAL_NODES = node.hooks.getSpecialNodes();

  if (!node.isAnyEventBinded() && SPECIAL_NODES.indexOf(nodeName) > -1) {
    data["nn"
    /* NodeName */
    ] = "static-".concat(nodeName);

    if (nodeName === VIEW && !isHasExtractProp(node)) {
      data["nn"
      /* NodeName */
      ] = PURE_VIEW;
    }
  }

  for (var prop in props) {
    var propInCamelCase = toCamelCase(prop);

    if (!prop.startsWith('data-') && // 在 node.dataset 的数据
    prop !== CLASS && prop !== STYLE && prop !== ID && propInCamelCase !== CATCHMOVE) {
      data[propInCamelCase] = props[prop];
    }

    if (nodeName === VIEW && propInCamelCase === CATCHMOVE && props[prop] !== false) {
      data["nn"
      /* NodeName */
      ] = CATCH_VIEW;
    }
  }

  var childNodes = node.childNodes; // 过滤 comment 节点

  childNodes = childNodes.filter(function (node) {
    return !isComment(node);
  });

  if (childNodes.length > 0) {
    data["cn"
    /* Childnodes */
    ] = childNodes.map(hydrate);
  } else {
    data["cn"
    /* Childnodes */
    ] = [];
  }

  if (node.className !== '') {
    data["cl"
    /* Class */
    ] = node.className;
  }

  if (node.cssText !== '' && nodeName !== 'swiper-item') {
    data["st"
    /* Style */
    ] = node.cssText;
  }

  (_b = (_a = node.hooks).modifyHydrateData) === null || _b === void 0 ? void 0 : _b.call(_a, data);
  return data;
}

var eventSource = new Map();
var ElementNames;

(function (ElementNames) {
  ElementNames["Element"] = "Element";
  ElementNames["Document"] = "Document";
  ElementNames["RootElement"] = "RootElement";
  ElementNames["FormElement"] = "FormElement";
})(ElementNames || (ElementNames = {}));

var nodeId = incrementId();

var TaroNode = /*#__PURE__*/function (_TaroEventTarget) {
  _inherits(TaroNode, _TaroEventTarget);

  var _super = _createSuper(TaroNode);

  function TaroNode( // eslint-disable-next-line @typescript-eslint/indent
  impl, getElement, hooks) {
    var _this;

    _classCallCheck(this, TaroNode);

    _this = _super.call(this, hooks);
    _this.parentNode = null;
    _this.childNodes = [];

    _this.hydrate = function (node) {
      return function () {
        return hydrate(node);
      };
    };

    impl.bind(_assertThisInitialized(_this));
    _this._getElement = getElement;
    _this.uid = "_n_".concat(nodeId());
    eventSource.set(_this.uid, _assertThisInitialized(_this));
    return _this;
  }
  /**
   * like jQuery's $.empty()
   */


  _createClass(TaroNode, [{
    key: "_empty",
    value: function _empty() {
      while (this.childNodes.length > 0) {
        var child = this.childNodes[0];
        child.parentNode = null;
        eventSource.delete(child.uid);
        this.childNodes.shift();
      }
    }
  }, {
    key: "_root",
    get: function get() {
      var _a;

      return ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a._root) || null;
    }
  }, {
    key: "findIndex",
    value: function findIndex(refChild) {
      var index = this.childNodes.indexOf(refChild);
      ensure(index !== -1, 'The node to be replaced is not a child of this node.');
      return index;
    }
  }, {
    key: "_path",
    get: function get() {
      var parentNode = this.parentNode;

      if (parentNode) {
        // 计算路径时，先过滤掉 comment 节点
        var list = parentNode.childNodes.filter(function (node) {
          return !isComment(node);
        });
        var indexOfNode = list.indexOf(this);
        var index = this.hooks.getPathIndex(indexOfNode);
        return "".concat(parentNode._path, ".", "cn"
        /* Childnodes */
        , ".").concat(index);
      }

      return '';
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var parentNode = this.parentNode;
      return (parentNode === null || parentNode === void 0 ? void 0 : parentNode.childNodes[parentNode.findIndex(this) + 1]) || null;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var parentNode = this.parentNode;
      return (parentNode === null || parentNode === void 0 ? void 0 : parentNode.childNodes[parentNode.findIndex(this) - 1]) || null;
    }
  }, {
    key: "parentElement",
    get: function get() {
      var parentNode = this.parentNode;

      if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 1
      /* ELEMENT_NODE */
      ) {
        return parentNode;
      }

      return null;
    }
  }, {
    key: "firstChild",
    get: function get() {
      return this.childNodes[0] || null;
    }
  }, {
    key: "lastChild",
    get: function get() {
      var childNodes = this.childNodes;
      return childNodes[childNodes.length - 1] || null;
    }
    /**
     * @textContent 目前只能置空子元素
     * @TODO 等待完整 innerHTML 实现
     */

  }, {
    key: "textContent",
    set: function set(text) {
      this._empty();

      if (text === '') {
        this.enqueueUpdate({
          path: "".concat(this._path, ".", "cn"
          /* Childnodes */
          ),
          value: function value() {
            return [];
          }
        });
      } else {
        var _document = this._getElement(ElementNames.Document)();

        this.appendChild(_document.createTextNode(text));
      }
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(newChild, refChild, isReplace) {
      var _this2 = this;

      if (newChild.nodeName === DOCUMENT_FRAGMENT) {
        newChild.childNodes.reduceRight(function (previousValue, currentValue) {
          _this2.insertBefore(currentValue, previousValue);

          return currentValue;
        }, refChild);
        return newChild;
      }

      newChild.remove();
      newChild.parentNode = this;
      var payload;

      if (refChild) {
        var index = this.findIndex(refChild);
        this.childNodes.splice(index, 0, newChild);

        if (isReplace) {
          payload = {
            path: newChild._path,
            value: this.hydrate(newChild)
          };
        } else {
          payload = {
            path: "".concat(this._path, ".", "cn"
            /* Childnodes */
            ),
            value: function value() {
              var childNodes = _this2.childNodes.filter(function (node) {
                return !isComment(node);
              });

              return childNodes.map(hydrate);
            }
          };
        }
      } else {
        this.childNodes.push(newChild);
        payload = {
          path: newChild._path,
          value: this.hydrate(newChild)
        };
      }

      this.enqueueUpdate(payload);

      if (!eventSource.has(newChild.uid)) {
        eventSource.set(newChild.uid, newChild);
      }

      return newChild;
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      this.insertBefore(child);
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(newChild, oldChild) {
      if (oldChild.parentNode === this) {
        this.insertBefore(newChild, oldChild, true);
        oldChild.remove(true);
        return oldChild;
      }
    }
  }, {
    key: "removeChild",
    value: function removeChild(child, isReplace) {
      var _this3 = this;

      var index = this.findIndex(child);
      this.childNodes.splice(index, 1);

      if (!isReplace) {
        this.enqueueUpdate({
          path: "".concat(this._path, ".", "cn"
          /* Childnodes */
          ),
          value: function value() {
            var childNodes = _this3.childNodes.filter(function (node) {
              return !isComment(node);
            });

            return childNodes.map(hydrate);
          }
        });
      }

      child.parentNode = null;
      eventSource.delete(child.uid); // @TODO: eventSource memory overflow
      // child._empty()

      return child;
    }
  }, {
    key: "remove",
    value: function remove(isReplace) {
      var _a;

      (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this, isReplace);
    }
  }, {
    key: "hasChildNodes",
    value: function hasChildNodes() {
      return this.childNodes.length > 0;
    }
  }, {
    key: "enqueueUpdate",
    value: function enqueueUpdate(payload) {
      var _a;

      (_a = this._root) === null || _a === void 0 ? void 0 : _a.enqueueUpdate(payload);
    }
  }, {
    key: "contains",
    value: function contains(node) {
      var isContains = false;
      this.childNodes.some(function (childNode) {
        var uid = childNode.uid;

        if (uid === node.uid || uid === node.id || childNode.contains(node)) {
          isContains = true;
          return true;
        }
      });
      return isContains;
    }
  }, {
    key: "ownerDocument",
    get: function get() {
      var document = this._getElement(ElementNames.Document)();

      return document;
    }
  }]);

  return TaroNode;
}(TaroEventTarget);

TaroNode = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroNodeImpl)), __param(1, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __param(2, inversify_16(SERVICE_IDENTIFIER.Hooks)), __metadata("design:paramtypes", [Function, Function, Function])], TaroNode);

var TaroText = /*#__PURE__*/function (_TaroNode) {
  _inherits(TaroText, _TaroNode);

  var _super2 = _createSuper(TaroText);

  function TaroText( // eslint-disable-next-line @typescript-eslint/indent
  nodeImpl, getElement, hooks) {
    var _this4;

    _classCallCheck(this, TaroText);

    _this4 = _super2.call(this, nodeImpl, getElement, hooks);
    _this4.nodeType = 3
    /* TEXT_NODE */
    ;
    _this4.nodeName = '#text';
    return _this4;
  }

  _createClass(TaroText, [{
    key: "textContent",
    get: function get() {
      return this._value;
    },
    set: function set(text) {
      this._value = text;
      this.enqueueUpdate({
        path: "".concat(this._path, ".", "v"
        /* Text */
        ),
        value: text
      });
    }
  }, {
    key: "nodeValue",
    get: function get() {
      return this._value;
    },
    set: function set(text) {
      this.textContent = text;
    }
  }]);

  return TaroText;
}(TaroNode);

TaroText = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroNodeImpl)), __param(1, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __param(2, inversify_16(SERVICE_IDENTIFIER.Hooks)), __metadata("design:paramtypes", [Function, Function, Function])], TaroText);
/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var styleProperties = ['all', 'appearance', 'blockOverflow', 'blockSize', 'bottom', 'clear', 'contain', 'content', 'continue', 'cursor', 'direction', 'display', 'filter', 'float', 'gap', 'height', 'inset', 'isolation', 'left', 'letterSpacing', 'lightingColor', 'markerSide', 'mixBlendMode', 'opacity', 'order', 'position', 'quotes', 'resize', 'right', 'rowGap', 'tabSize', 'tableLayout', 'top', 'userSelect', 'verticalAlign', 'visibility', 'voiceFamily', 'volume', 'whiteSpace', 'widows', 'width', 'zIndex', 'pointerEvents'
/** 非常用 style */
// 'azimuth',
// 'backfaceVisibility',
// 'baselineShift',
// 'captionSide',
// 'chains',
// 'dominantBaseline',
// 'elevation',
// 'emptyCells',
// 'forcedColorAdjust',
// 'glyphOrientationVertical',
// 'hangingPunctuation',
// 'hyphenateCharacter',
// 'hyphens',
// 'imageOrientation',
// 'imageResolution',
// 'orphans',
// 'playDuring',
// 'pointerEvents',
// 'regionFragment',
// 'richness',
// 'running',
// 'scrollBehavior',
// 'speechRate',
// 'stress',
// 'stringSet',
// 'unicodeBidi',
// 'willChange',
// 'writingMode',
]; // 减少文件体积

function combine(prefix, list, excludeSelf) {
  !excludeSelf && styleProperties.push(prefix);
  list.forEach(function (item) {
    styleProperties.push(prefix + item);
  });
}

var color = 'Color';
var style = 'Style';
var width = 'Width';
var image = 'Image';
var size = 'Size';
var color_style_width = [color, style, width];
var fitlength_fitwidth_image = ['FitLength', 'FitWidth', image];
var fitlength_fitwidth_image_radius = [].concat(fitlength_fitwidth_image, ['Radius']);
var color_style_width_fitlength_fitwidth_image = [].concat(color_style_width, fitlength_fitwidth_image);
var endRadius_startRadius = ['EndRadius', 'StartRadius'];
var bottom_left_right_top = ['Bottom', 'Left', 'Right', 'Top'];
var end_start = ['End', 'Start'];
var content_items_self = ['Content', 'Items', 'Self'];
var blockSize_height_inlineSize_width = ['BlockSize', 'Height', 'InlineSize', width];
var after_before = ['After', 'Before'];
combine('borderBlock', color_style_width);
combine('borderBlockEnd', color_style_width);
combine('borderBlockStart', color_style_width);
combine('outline', [].concat(color_style_width, ['Offset']));
combine('border', [].concat(color_style_width, ['Boundary', 'Break', 'Collapse', 'Radius', 'Spacing']));
combine('borderFit', ['Length', width]);
combine('borderInline', color_style_width);
combine('borderInlineEnd', color_style_width);
combine('borderInlineStart', color_style_width);
combine('borderLeft', color_style_width_fitlength_fitwidth_image);
combine('borderRight', color_style_width_fitlength_fitwidth_image);
combine('borderTop', color_style_width_fitlength_fitwidth_image);
combine('borderBottom', color_style_width_fitlength_fitwidth_image);
combine('textDecoration', [color, style, 'Line']);
combine('textEmphasis', [color, style, 'Position']);
combine('scrollMargin', bottom_left_right_top);
combine('scrollPadding', bottom_left_right_top);
combine('padding', bottom_left_right_top);
combine('margin', [].concat(bottom_left_right_top, ['Trim']));
combine('scrollMarginBlock', end_start);
combine('scrollMarginInline', end_start);
combine('scrollPaddingBlock', end_start);
combine('scrollPaddingInline', end_start);
combine('gridColumn', end_start);
combine('gridRow', end_start);
combine('insetBlock', end_start);
combine('insetInline', end_start);
combine('marginBlock', end_start);
combine('marginInline', end_start);
combine('paddingBlock', end_start);
combine('paddingInline', end_start);
combine('pause', after_before);
combine('cue', after_before);
combine('mask', ['Clip', 'Composite', image, 'Mode', 'Origin', 'Position', 'Repeat', size, 'Type']);
combine('borderImage', ['Outset', 'Repeat', 'Slice', 'Source', 'Transform', width]);
combine('maskBorder', ['Mode', 'Outset', 'Repeat', 'Slice', 'Source', width]);
combine('font', ['Family', 'FeatureSettings', 'Kerning', 'LanguageOverride', 'MaxSize', 'MinSize', 'OpticalSizing', 'Palette', size, 'SizeAdjust', 'Stretch', style, 'Weight', 'VariationSettings']);
combine('fontSynthesis', ['SmallCaps', style, 'Weight']);
combine('transform', ['Box', 'Origin', style]);
combine('background', [color, image, 'Attachment', 'BlendMode', 'Clip', 'Origin', 'Position', 'Repeat', size]);
combine('listStyle', [image, 'Position', 'Type']);
combine('scrollSnap', ['Align', 'Stop', 'Type']);
combine('grid', ['Area', 'AutoColumns', 'AutoFlow', 'AutoRows']);
combine('gridTemplate', ['Areas', 'Columns', 'Rows']);
combine('overflow', ['Block', 'Inline', 'Wrap', 'X', 'Y']);
combine('transition', ['Delay', 'Duration', 'Property', 'TimingFunction']);
combine('lineStacking', ['Ruby', 'Shift', 'Strategy']);
combine('color', ['Adjust', 'InterpolationFilters', 'Scheme']);
combine('textAlign', ['All', 'Last']);
combine('page', ['BreakAfter', 'BreakBefore', 'BreakInside']);
combine('speak', ['Header', 'Numeral', 'Punctuation']);
combine('animation', ['Delay', 'Direction', 'Duration', 'FillMode', 'IterationCount', 'Name', 'PlayState', 'TimingFunction']);
combine('flex', ['Basis', 'Direction', 'Flow', 'Grow', 'Shrink', 'Wrap']);
combine('offset', [].concat(after_before, end_start, ['Anchor', 'Distance', 'Path', 'Position', 'Rotate']));
combine('fontVariant', ['Alternates', 'Caps', 'EastAsian', 'Emoji', 'Ligatures', 'Numeric', 'Position']);
combine('perspective', ['Origin']);
combine('pitch', ['Range']);
combine('clip', ['Path', 'Rule']);
combine('flow', ['From', 'Into']);
combine('align', ['Content', 'Items', 'Self'], true);
combine('alignment', ['Adjust', 'Baseline'], true);
combine('bookmark', ['Label', 'Level', 'State'], true);
combine('borderStart', endRadius_startRadius, true);
combine('borderEnd', endRadius_startRadius, true);
combine('borderCorner', ['Fit', image, 'ImageTransform'], true);
combine('borderTopLeft', fitlength_fitwidth_image_radius, true);
combine('borderTopRight', fitlength_fitwidth_image_radius, true);
combine('borderBottomLeft', fitlength_fitwidth_image_radius, true);
combine('borderBottomRight', fitlength_fitwidth_image_radius, true);
combine('column', ['s', 'Count', 'Fill', 'Gap', 'Rule', 'RuleColor', 'RuleStyle', 'RuleWidth', 'Span', width], true);
combine('break', [].concat(after_before, ['Inside']), true);
combine('wrap', [].concat(after_before, ['Flow', 'Inside', 'Through']), true);
combine('justify', content_items_self, true);
combine('place', content_items_self, true);
combine('max', [].concat(blockSize_height_inlineSize_width, ['Lines']), true);
combine('min', blockSize_height_inlineSize_width, true);
combine('line', ['Break', 'Clamp', 'Grid', 'Height', 'Padding', 'Snap'], true);
combine('inline', ['BoxAlign', size, 'Sizing'], true);
combine('text', ['CombineUpright', 'GroupAlign', 'Height', 'Indent', 'Justify', 'Orientation', 'Overflow', 'Shadow', 'SpaceCollapse', 'SpaceTrim', 'Spacing', 'Transform', 'UnderlinePosition', 'Wrap'], true);
combine('shape', ['ImageThreshold', 'Inside', 'Margin', 'Outside'], true);
combine('word', ['Break', 'Spacing', 'Wrap'], true);
combine('nav', ['Down', 'Left', 'Right', 'Up'], true);
combine('object', ['Fit', 'Position'], true);
combine('box', ['DecorationBreak', 'Shadow', 'Sizing', 'Snap'], true);

function setStyle(newVal, styleKey) {
  var old = this[styleKey];

  if (newVal) {
    this._usedStyleProp.add(styleKey);
  }

  process.env.NODE_ENV !== 'production' && warn(isString(newVal) && newVal.length > PROPERTY_THRESHOLD, "Style \u5C5E\u6027 ".concat(styleKey, " \u7684\u503C\u6570\u636E\u91CF\u8FC7\u5927\uFF0C\u53EF\u80FD\u4F1A\u5F71\u54CD\u6E32\u67D3\u6027\u80FD\uFF0C\u8003\u8651\u4F7F\u7528 CSS \u7C7B\u6216\u5176\u5B83\u65B9\u6848\u66FF\u4EE3\u3002"));

  if (old !== newVal) {
    this._value[styleKey] = newVal;

    this._element.enqueueUpdate({
      path: "".concat(this._element._path, ".", "st"
      /* Style */
      ),
      value: this.cssText
    });
  }
}

function initStyle(ctor) {
  var properties = {};

  var _loop = function _loop(i) {
    var styleKey = styleProperties[i];
    properties[styleKey] = {
      get: function get() {
        return this._value[styleKey] || '';
      },
      set: function set(newVal) {
        setStyle.call(this, newVal, styleKey);
      }
    };
  };

  for (var i = 0; i < styleProperties.length; i++) {
    _loop(i);
  }

  Object.defineProperties(ctor.prototype, properties);
}

function isCssVariable(propertyName) {
  return /^--/.test(propertyName);
}

var Style = /*#__PURE__*/function () {
  function Style(element) {
    _classCallCheck(this, Style);

    this._element = element;
    this._usedStyleProp = new Set();
    this._value = {};
  }

  _createClass(Style, [{
    key: "setCssVariables",
    value: function setCssVariables(styleKey) {
      var _this5 = this;

      this.hasOwnProperty(styleKey) || Object.defineProperty(this, styleKey, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return _this5._value[styleKey] || '';
        },
        set: function set(newVal) {
          setStyle.call(_this5, newVal, styleKey);
        }
      });
    }
  }, {
    key: "cssText",
    get: function get() {
      var _this6 = this;

      var text = '';

      this._usedStyleProp.forEach(function (key) {
        var val = _this6[key];
        if (!val) return;
        var styleName = isCssVariable(key) ? key : toDashed(key);
        text += "".concat(styleName, ": ").concat(val, ";");
      });

      return text;
    },
    set: function set(str) {
      var _this7 = this;

      if (str == null) {
        str = '';
      }

      this._usedStyleProp.forEach(function (prop) {
        _this7.removeProperty(prop);
      });

      if (str === '') {
        return;
      }

      var rules = str.split(';');

      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].trim();

        if (rule === '') {
          continue;
        } // 可能存在 'background: url(http:x/y/z)' 的情况


        var _rule$split = rule.split(':'),
            _rule$split2 = _toArray(_rule$split),
            propName = _rule$split2[0],
            valList = _rule$split2.slice(1);

        var val = valList.join(':');

        if (isUndefined(val)) {
          continue;
        }

        this.setProperty(propName.trim(), val.trim());
      }
    }
  }, {
    key: "setProperty",
    value: function setProperty(propertyName, value) {
      if (propertyName[0] === '-') {
        // 支持 webkit 属性或 css 变量
        this.setCssVariables(propertyName);
      } else {
        propertyName = toCamelCase(propertyName);
      }

      if (isUndefined(value)) {
        return;
      }

      if (value === null || value === '') {
        this.removeProperty(propertyName);
      } else {
        this[propertyName] = value;
      }
    }
  }, {
    key: "removeProperty",
    value: function removeProperty(propertyName) {
      propertyName = toCamelCase(propertyName);

      if (!this._usedStyleProp.has(propertyName)) {
        return '';
      }

      var value = this[propertyName];
      this[propertyName] = '';

      this._usedStyleProp.delete(propertyName);

      return value;
    }
  }, {
    key: "getPropertyValue",
    value: function getPropertyValue(propertyName) {
      propertyName = toCamelCase(propertyName);
      var value = this[propertyName];

      if (!value) {
        return '';
      }

      return value;
    }
  }]);

  return Style;
}();

initStyle(Style);

function returnTrue() {
  return true;
}

function treeToArray(root, predict) {
  var array = [];
  var filter = predict !== null && predict !== void 0 ? predict : returnTrue;
  var object = root;

  while (object) {
    if (object.nodeType === 1
    /* ELEMENT_NODE */
    && filter(object)) {
      array.push(object);
    }

    object = following(object, root);
  }

  return array;
}

function following(el, root) {
  var firstChild = el.firstChild;

  if (firstChild) {
    return firstChild;
  }

  var current = el;

  do {
    if (current === root) {
      return null;
    }

    var nextSibling = current.nextSibling;

    if (nextSibling) {
      return nextSibling;
    }

    current = current.parentElement;
  } while (current);

  return null;
}

var ClassList = /*#__PURE__*/function (_Set2) {
  _inherits(ClassList, _Set2);

  var _super3 = _createSuper(ClassList);

  function ClassList(className, el) {
    var _thisSuper, _this8;

    _classCallCheck(this, ClassList);

    _this8 = _super3.call(this);
    className.trim().split(/\s+/).forEach(_get((_thisSuper = _assertThisInitialized(_this8), _getPrototypeOf(ClassList.prototype)), "add", _thisSuper).bind(_assertThisInitialized(_this8)));
    _this8.el = el;
    return _this8;
  }

  _createClass(ClassList, [{
    key: "value",
    get: function get() {
      return _toConsumableArray(this).join(' ');
    }
  }, {
    key: "add",
    value: function add(s) {
      _get(_getPrototypeOf(ClassList.prototype), "add", this).call(this, s);

      this._update();

      return this;
    }
  }, {
    key: "length",
    get: function get() {
      return this.size;
    }
  }, {
    key: "remove",
    value: function remove(s) {
      _get(_getPrototypeOf(ClassList.prototype), "delete", this).call(this, s);

      this._update();
    }
  }, {
    key: "toggle",
    value: function toggle(s) {
      if (_get(_getPrototypeOf(ClassList.prototype), "has", this).call(this, s)) {
        _get(_getPrototypeOf(ClassList.prototype), "delete", this).call(this, s);
      } else {
        _get(_getPrototypeOf(ClassList.prototype), "add", this).call(this, s);
      }

      this._update();
    }
  }, {
    key: "replace",
    value: function replace(s1, s2) {
      _get(_getPrototypeOf(ClassList.prototype), "delete", this).call(this, s1);

      _get(_getPrototypeOf(ClassList.prototype), "add", this).call(this, s2);

      this._update();
    }
  }, {
    key: "contains",
    value: function contains(s) {
      return _get(_getPrototypeOf(ClassList.prototype), "has", this).call(this, s);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "_update",
    value: function _update() {
      this.el.className = this.value;
    }
  }]);

  return ClassList;
}( /*#__PURE__*/_wrapNativeSuper(Set));

var TaroElement = /*#__PURE__*/function (_TaroNode2) {
  _inherits(TaroElement, _TaroNode2);

  var _super4 = _createSuper(TaroElement);

  function TaroElement( // eslint-disable-next-line @typescript-eslint/indent
  nodeImpl, getElement, hooks, elementImpl) {
    var _this9;

    _classCallCheck(this, TaroElement);

    _this9 = _super4.call(this, nodeImpl, getElement, hooks);
    _this9.props = {};
    _this9.dataset = EMPTY_OBJ;
    elementImpl.bind(_assertThisInitialized(_this9));
    _this9.nodeType = 1
    /* ELEMENT_NODE */
    ;
    _this9.style = new Style(_assertThisInitialized(_this9));
    hooks.patchElement(_assertThisInitialized(_this9));
    return _this9;
  }

  _createClass(TaroElement, [{
    key: "_stopPropagation",
    value: function _stopPropagation(event) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var target = this; // eslint-disable-next-line no-cond-assign

      while (target = target.parentNode) {
        var listeners = target.__handlers[event.type];

        if (!isArray(listeners)) {
          continue;
        }

        for (var i = listeners.length; i--;) {
          var l = listeners[i];
          l._stop = true;
        }
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this.getAttribute(ID);
    },
    set: function set(val) {
      this.setAttribute(ID, val);
    }
  }, {
    key: "className",
    get: function get() {
      return this.getAttribute(CLASS) || '';
    },
    set: function set(val) {
      this.setAttribute(CLASS, val);
    }
  }, {
    key: "cssText",
    get: function get() {
      return this.getAttribute(STYLE) || '';
    }
  }, {
    key: "classList",
    get: function get() {
      return new ClassList(this.className, this);
    }
  }, {
    key: "children",
    get: function get() {
      return this.childNodes.filter(isElement);
    }
  }, {
    key: "attributes",
    get: function get() {
      var props = this.props;
      var propKeys = Object.keys(props);
      var style = this.style.cssText;
      var attrs = propKeys.map(function (key) {
        return {
          name: key,
          value: props[key]
        };
      });
      return attrs.concat(style ? {
        name: STYLE,
        value: style
      } : []);
    }
  }, {
    key: "textContent",
    get: function get() {
      var text = '';
      var childNodes = this.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        text += childNodes[i].textContent;
      }

      return text;
    },
    set: function set(text) {
      _set(_getPrototypeOf(TaroElement.prototype), "textContent", text, this, true);
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(qualifiedName) {
      return !isUndefined(this.props[qualifiedName]);
    }
  }, {
    key: "hasAttributes",
    value: function hasAttributes() {
      return this.attributes.length > 0;
    }
  }, {
    key: "focus",
    get: function get() {
      return function () {
        this.setAttribute(FOCUS, true);
      };
    } // 兼容 Vue3，详情请见：https://github.com/NervJS/taro/issues/10579
    ,
    set: function set(value) {
      this.setAttribute(FOCUS, value);
    }
  }, {
    key: "blur",
    value: function blur() {
      this.setAttribute(FOCUS, false);
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(qualifiedName, value) {
      var _a, _b;

      process.env.NODE_ENV !== 'production' && warn(isString(value) && value.length > PROPERTY_THRESHOLD, "\u5143\u7D20 ".concat(this.nodeName, " \u7684 \u5C5E\u6027 ").concat(qualifiedName, " \u7684\u503C\u6570\u636E\u91CF\u8FC7\u5927\uFF0C\u53EF\u80FD\u4F1A\u5F71\u54CD\u6E32\u67D3\u6027\u80FD\u3002\u8003\u8651\u964D\u4F4E\u56FE\u7247\u8F6C\u4E3A base64 \u7684\u9608\u503C\u6216\u5728 CSS \u4E2D\u4F7F\u7528 base64\u3002"));
      var isPureView = this.nodeName === VIEW && !isHasExtractProp(this) && !this.isAnyEventBinded();

      switch (qualifiedName) {
        case STYLE:
          this.style.cssText = value;
          break;

        case ID:
          eventSource.delete(this.uid);
          value = String(value);
          this.props[qualifiedName] = this.uid = value;
          eventSource.set(value, this);
          break;

        default:
          this.props[qualifiedName] = value;

          if (qualifiedName.startsWith('data-')) {
            if (this.dataset === EMPTY_OBJ) {
              this.dataset = Object.create(null);
            }

            this.dataset[toCamelCase(qualifiedName.replace(/^data-/, ''))] = value;
          }

          break;
      }

      qualifiedName = shortcutAttr(qualifiedName);
      var payload = {
        path: "".concat(this._path, ".").concat(toCamelCase(qualifiedName)),
        value: isFunction(value) ? function () {
          return value;
        } : value
      };
      (_b = (_a = this.hooks).modifySetAttrPayload) === null || _b === void 0 ? void 0 : _b.call(_a, this, qualifiedName, payload);
      this.enqueueUpdate(payload);

      if (this.nodeName === VIEW) {
        if (toCamelCase(qualifiedName) === CATCHMOVE) {
          // catchMove = true: catch-view
          // catchMove = false: view or static-view
          this.enqueueUpdate({
            path: "".concat(this._path, ".", "nn"
            /* NodeName */
            ),
            value: value ? CATCH_VIEW : this.isAnyEventBinded() ? VIEW : STATIC_VIEW
          });
        } else if (isPureView && isHasExtractProp(this)) {
          // pure-view => static-view
          this.enqueueUpdate({
            path: "".concat(this._path, ".", "nn"
            /* NodeName */
            ),
            value: STATIC_VIEW
          });
        }
      }
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(qualifiedName) {
      var _a, _b, _c, _d;

      var isStaticView = this.nodeName === VIEW && isHasExtractProp(this) && !this.isAnyEventBinded();

      if (qualifiedName === STYLE) {
        this.style.cssText = '';
      } else {
        var isInterrupt = (_b = (_a = this.hooks).onRemoveAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, this, qualifiedName);

        if (isInterrupt) {
          return;
        }

        if (!this.props.hasOwnProperty(qualifiedName)) {
          return;
        }

        delete this.props[qualifiedName];
      }

      qualifiedName = shortcutAttr(qualifiedName);
      var payload = {
        path: "".concat(this._path, ".").concat(toCamelCase(qualifiedName)),
        value: ''
      };
      (_d = (_c = this.hooks).modifyRmAttrPayload) === null || _d === void 0 ? void 0 : _d.call(_c, this, qualifiedName, payload);
      this.enqueueUpdate(payload);

      if (this.nodeName === VIEW) {
        if (toCamelCase(qualifiedName) === CATCHMOVE) {
          // catch-view => view or static-view or pure-view
          this.enqueueUpdate({
            path: "".concat(this._path, ".", "nn"
            /* NodeName */
            ),
            value: this.isAnyEventBinded() ? VIEW : isHasExtractProp(this) ? STATIC_VIEW : PURE_VIEW
          });
        } else if (isStaticView && !isHasExtractProp(this)) {
          // static-view => pure-view
          this.enqueueUpdate({
            path: "".concat(this._path, ".", "nn"
            /* NodeName */
            ),
            value: PURE_VIEW
          });
        }
      }
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(qualifiedName) {
      var attr = qualifiedName === STYLE ? this.style.cssText : this.props[qualifiedName];
      return attr !== null && attr !== void 0 ? attr : '';
    }
  }, {
    key: "getElementsByTagName",
    value: function getElementsByTagName(tagName) {
      var _this10 = this;

      return treeToArray(this, function (el) {
        return el.nodeName === tagName || tagName === '*' && _this10 !== el;
      });
    }
  }, {
    key: "getElementsByClassName",
    value: function getElementsByClassName(className) {
      return treeToArray(this, function (el) {
        var classList = el.classList;
        var classNames = className.trim().split(/\s+/);
        return classNames.every(function (c) {
          return classList.has(c);
        });
      });
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var cancelable = event.cancelable;
      var listeners = this.__handlers[event.type];

      if (!isArray(listeners)) {
        return false;
      }

      for (var i = listeners.length; i--;) {
        var listener = listeners[i];
        var result = void 0;

        if (listener._stop) {
          listener._stop = false;
        } else {
          result = listener.call(this, event);
        }

        if ((result === false || event._end) && cancelable) {
          event.defaultPrevented = true;
        }

        if (event._end && event._stop) {
          break;
        }
      }

      if (event._stop) {
        this._stopPropagation(event);
      } else {
        event._stop = true;
      }

      return listeners != null;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, handler, options) {
      var name = this.nodeName;
      var SPECIAL_NODES = this.hooks.getSpecialNodes();

      if (!this.isAnyEventBinded() && SPECIAL_NODES.indexOf(name) > -1) {
        this.enqueueUpdate({
          path: "".concat(this._path, ".", "nn"
          /* NodeName */
          ),
          value: name
        });
      }

      _get(_getPrototypeOf(TaroElement.prototype), "addEventListener", this).call(this, type, handler, options);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, handler) {
      _get(_getPrototypeOf(TaroElement.prototype), "removeEventListener", this).call(this, type, handler);

      var name = this.nodeName;
      var SPECIAL_NODES = this.hooks.getSpecialNodes();

      if (!this.isAnyEventBinded() && SPECIAL_NODES.indexOf(name) > -1) {
        this.enqueueUpdate({
          path: "".concat(this._path, ".", "nn"
          /* NodeName */
          ),
          value: isHasExtractProp(this) ? "static-".concat(name) : "pure-".concat(name)
        });
      }
    }
  }]);

  return TaroElement;
}(TaroNode);

TaroElement = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroNodeImpl)), __param(1, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __param(2, inversify_16(SERVICE_IDENTIFIER.Hooks)), __param(3, inversify_16(SERVICE_IDENTIFIER.TaroElementImpl)), __metadata("design:paramtypes", [Function, Function, Function, Function])], TaroElement);
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$1 = Array.isArray;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Built-in value references. */

var Symbol$1 = root.Symbol;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}
/** Used for built-in method references. */


var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}
/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
/** Used to match property names within property paths. */


var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject$1(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/** Used for built-in method references. */


var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}
/** Used for built-in method references. */


var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/* Built-in method references that are verified to be native. */

var Map$1 = getNative(root, 'Map');
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map$1 || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/** Error message constants. */

var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = MapCache;
/** Used as the maximum memoize cache size. */

var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}
/** Used to match property names within property paths. */


var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }

  return isKey(value, object) ? [value] : stringToPath(toString(value));
}
/** Used as references for various `Number` constants. */


var INFINITY$1 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */


function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var options = {
  prerender: true,
  debug: false
};

var Performance = /*#__PURE__*/function () {
  function Performance() {
    _classCallCheck(this, Performance);

    this.recorder = new Map();
  }

  _createClass(Performance, [{
    key: "start",
    value: function start(id) {
      if (!options.debug) {
        return;
      }

      this.recorder.set(id, Date.now());
    }
  }, {
    key: "stop",
    value: function stop(id) {
      if (!options.debug) {
        return;
      }

      var now = Date.now();
      var prev = this.recorder.get(id);
      var time = now - prev; // eslint-disable-next-line no-console

      console.log("".concat(id, " \u65F6\u957F\uFF1A ").concat(time, "ms"));
    }
  }]);

  return Performance;
}();

var perf = new Performance();
var eventIncrementId = incrementId();

var TaroRootElement = /*#__PURE__*/function (_TaroElement) {
  _inherits(TaroRootElement, _TaroElement);

  var _super5 = _createSuper(TaroRootElement);

  function TaroRootElement( // eslint-disable-next-line @typescript-eslint/indent
  nodeImpl, getElement, hooks, elementImpl, eventCenter) {
    var _this11;

    _classCallCheck(this, TaroRootElement);

    _this11 = _super5.call(this, nodeImpl, getElement, hooks, elementImpl);
    _this11.pendingFlush = false;
    _this11.updatePayloads = [];
    _this11.updateCallbacks = [];
    _this11.pendingUpdate = false;
    _this11.ctx = null;
    _this11.nodeName = ROOT_STR;
    _this11.eventCenter = eventCenter;
    return _this11;
  }

  _createClass(TaroRootElement, [{
    key: "_path",
    get: function get() {
      return ROOT_STR;
    }
  }, {
    key: "_root",
    get: function get() {
      return this;
    }
  }, {
    key: "enqueueUpdate",
    value: function enqueueUpdate(payload) {
      this.updatePayloads.push(payload);

      if (!this.pendingUpdate && this.ctx !== null) {
        this.performUpdate();
      }
    }
  }, {
    key: "performUpdate",
    value: function performUpdate() {
      var _this12 = this;

      var initRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var prerender = arguments.length > 1 ? arguments[1] : undefined;
      this.pendingUpdate = true;
      var ctx = this.ctx;
      setTimeout(function () {
        perf.start(SET_DATA);
        var data = Object.create(null);
        var resetPaths = new Set(initRender ? ['root.cn.[0]', 'root.cn[0]'] : []);

        while (_this12.updatePayloads.length > 0) {
          var _this12$updatePayload = _this12.updatePayloads.shift(),
              path = _this12$updatePayload.path,
              value = _this12$updatePayload.value;

          if (path.endsWith("cn"
          /* Childnodes */
          )) {
            resetPaths.add(path);
          }

          data[path] = value;
        }

        var _loop2 = function _loop2(_path) {
          resetPaths.forEach(function (p) {
            // 已经重置了数组，就不需要分别再设置了
            if (_path.includes(p) && _path !== p) {
              delete data[_path];
            }
          });
          var value = data[_path];

          if (isFunction(value)) {
            data[_path] = value();
          }
        };

        for (var _path in data) {
          _loop2(_path);
        }

        if (isFunction(prerender)) {
          prerender(data);
        } else {
          _this12.pendingUpdate = false;
          var customWrapperUpdate = [];
          var customWrapperMap = new Map();
          var normalUpdate = {};

          if (!initRender) {
            for (var p in data) {
              var dataPathArr = p.split('.');
              var hasCustomWrapper = false;

              for (var i = dataPathArr.length; i > 0; i--) {
                var allPath = dataPathArr.slice(0, i).join('.');
                var getData = get$1(ctx.__data__ || ctx.data, allPath);

                if (getData && getData.nn && getData.nn === CUSTOM_WRAPPER) {
                  var customWrapperId = getData.uid;
                  var customWrapper = ctx.selectComponent("#".concat(customWrapperId));
                  var splitedPath = dataPathArr.slice(i).join('.');

                  if (customWrapper) {
                    hasCustomWrapper = true;
                    customWrapperMap.set(customWrapper, Object.assign(Object.assign({}, customWrapperMap.get(customWrapper) || {}), _defineProperty({}, "i.".concat(splitedPath), data[p])));
                  }

                  break;
                }
              }

              if (!hasCustomWrapper) {
                normalUpdate[p] = data[p];
              }
            }

            if (customWrapperMap.size > 0) {
              customWrapperMap.forEach(function (data, ctx) {
                customWrapperUpdate.push({
                  ctx: ctx,
                  data: data
                });
              });
            }
          }

          var updateArrLen = customWrapperUpdate.length;

          if (updateArrLen) {
            var eventId = "".concat(_this12._path, "_update_").concat(eventIncrementId());
            var _eventCenter = _this12.eventCenter;
            var executeTime = 0;

            _eventCenter.once(eventId, function () {
              executeTime++;

              if (executeTime === updateArrLen + 1) {
                perf.stop(SET_DATA);

                if (!_this12.pendingFlush) {
                  _this12.flushUpdateCallback();
                }

                if (initRender) {
                  perf.stop(PAGE_INIT);
                }
              }
            }, _eventCenter);

            customWrapperUpdate.forEach(function (item) {
              if (process.env.NODE_ENV !== 'production' && options.debug) {
                // eslint-disable-next-line no-console
                console.log('custom wrapper setData: ', item.data);
              }

              item.ctx.setData(item.data, function () {
                _eventCenter.trigger(eventId);
              });
            });

            if (Object.keys(normalUpdate).length) {
              if (process.env.NODE_ENV !== 'production' && options.debug) {
                // eslint-disable-next-line no-console
                console.log('setData:', normalUpdate);
              }

              ctx.setData(normalUpdate, function () {
                _eventCenter.trigger(eventId);
              });
            }
          } else {
            if (process.env.NODE_ENV !== 'production' && options.debug) {
              // eslint-disable-next-line no-console
              console.log('setData:', data);
            }

            ctx.setData(data, function () {
              perf.stop(SET_DATA);

              if (!_this12.pendingFlush) {
                _this12.flushUpdateCallback();
              }

              if (initRender) {
                perf.stop(PAGE_INIT);
              }
            });
          }
        }
      }, 0);
    }
  }, {
    key: "enqueueUpdateCallback",
    value: function enqueueUpdateCallback(cb, ctx) {
      this.updateCallbacks.push(function () {
        ctx ? cb.call(ctx) : cb();
      });
    }
  }, {
    key: "flushUpdateCallback",
    value: function flushUpdateCallback() {
      this.pendingFlush = false;
      var copies = this.updateCallbacks.slice(0);
      this.updateCallbacks.length = 0;

      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }
  }]);

  return TaroRootElement;
}(TaroElement);

TaroRootElement = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroNodeImpl)), __param(1, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __param(2, inversify_16(SERVICE_IDENTIFIER.Hooks)), __param(3, inversify_16(SERVICE_IDENTIFIER.TaroElementImpl)), __param(4, inversify_16(SERVICE_IDENTIFIER.eventCenter)), __metadata("design:paramtypes", [Function, Function, Function, Function, Function])], TaroRootElement);

var FormElement = /*#__PURE__*/function (_TaroElement2) {
  _inherits(FormElement, _TaroElement2);

  var _super6 = _createSuper(FormElement);

  function FormElement() {
    _classCallCheck(this, FormElement);

    return _super6.apply(this, arguments);
  }

  _createClass(FormElement, [{
    key: "value",
    get: function get() {
      // eslint-disable-next-line dot-notation
      var val = this.props[VALUE];
      return val == null ? '' : val;
    },
    set: function set(val) {
      this.setAttribute(VALUE, val);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      if (event.mpEvent) {
        var val = event.mpEvent.detail.value;

        if (event.type === CHANGE) {
          this.props.value = val;
        } else if (event.type === INPUT) {
          // Web 规范中表单组件的 value 应该跟着输入改变
          // 只是改 this.props.value 的话不会进行 setData，因此这里修改 this.value。
          // 只测试了 React、Vue、Vue3 input 组件的 onInput 事件，onChange 事件不确定有没有副作用，所以暂不修改。
          this.value = val;
        }
      }

      return _get(_getPrototypeOf(FormElement.prototype), "dispatchEvent", this).call(this, event);
    }
  }]);

  return FormElement;
}(TaroElement); // for Vue3


var SVGElement = /*#__PURE__*/function (_TaroElement3) {
  _inherits(SVGElement, _TaroElement3);

  var _super7 = _createSuper(SVGElement);

  function SVGElement() {
    _classCallCheck(this, SVGElement);

    return _super7.apply(this, arguments);
  }

  return _createClass(SVGElement);
}(TaroElement);

function initPosition() {
  return {
    index: 0,
    column: 0,
    line: 0
  };
}

function feedPosition(position, str, len) {
  var start = position.index;
  var end = position.index = start + len;

  for (var i = start; i < end; i++) {
    var char = str.charAt(i);

    if (char === '\n') {
      position.line++;
      position.column = 0;
    } else {
      position.column++;
    }
  }
}

function jumpPosition(position, str, end) {
  var len = end - position.index;
  return feedPosition(position, str, len);
}

function copyPosition(position) {
  return {
    index: position.index,
    line: position.line,
    column: position.column
  };
}

var whitespace = /\s/;

function isWhitespaceChar(char) {
  return whitespace.test(char);
}

var equalSign = /=/;

function isEqualSignChar(char) {
  return equalSign.test(char);
}

function shouldBeIgnore(tagName) {
  var name = tagName.toLowerCase();

  if (options.html.skipElements.has(name)) {
    return true;
  }

  return false;
}

var alphanumeric = /[A-Za-z0-9]/;

function findTextEnd(str, index) {
  while (true) {
    var textEnd = str.indexOf('<', index);

    if (textEnd === -1) {
      return textEnd;
    }

    var char = str.charAt(textEnd + 1);

    if (char === '/' || char === '!' || alphanumeric.test(char)) {
      return textEnd;
    }

    index = textEnd + 1;
  }
}

function isWordEnd(cursor, wordBegin, html) {
  if (!isWhitespaceChar(html.charAt(cursor))) return false;
  var len = html.length; // backwrad

  for (var i = cursor - 1; i > wordBegin; i--) {
    var char = html.charAt(i);

    if (!isWhitespaceChar(char)) {
      if (isEqualSignChar(char)) return false;
      break;
    }
  } // forward


  for (var _i2 = cursor + 1; _i2 < len; _i2++) {
    var _char = html.charAt(_i2);

    if (!isWhitespaceChar(_char)) {
      if (isEqualSignChar(_char)) return false;
      return true;
    }
  }
}

var Scaner = /*#__PURE__*/function () {
  function Scaner(html) {
    _classCallCheck(this, Scaner);

    this.tokens = [];
    this.position = initPosition();
    this.html = html;
  }

  _createClass(Scaner, [{
    key: "scan",
    value: function scan() {
      var html = this.html,
          position = this.position;
      var len = html.length;

      while (position.index < len) {
        var start = position.index;
        this.scanText();

        if (position.index === start) {
          var _isComment = html.startsWith('!--', start + 1);

          if (_isComment) {
            this.scanComment();
          } else {
            var tagName = this.scanTag();

            if (shouldBeIgnore(tagName)) {
              this.scanSkipTag(tagName);
            }
          }
        }
      }

      return this.tokens;
    }
  }, {
    key: "scanText",
    value: function scanText() {
      var type = 'text';
      var html = this.html,
          position = this.position;
      var textEnd = findTextEnd(html, position.index);

      if (textEnd === position.index) {
        return;
      }

      if (textEnd === -1) {
        textEnd = html.length;
      }

      var start = copyPosition(position);
      var content = html.slice(position.index, textEnd);
      jumpPosition(position, html, textEnd);
      var end = copyPosition(position);
      this.tokens.push({
        type: type,
        content: content,
        position: {
          start: start,
          end: end
        }
      });
    }
  }, {
    key: "scanComment",
    value: function scanComment() {
      var type = 'comment';
      var html = this.html,
          position = this.position;
      var start = copyPosition(position);
      feedPosition(position, html, 4); // "<!--".length

      var contentEnd = html.indexOf('-->', position.index);
      var commentEnd = contentEnd + 3; // "-->".length

      if (contentEnd === -1) {
        contentEnd = commentEnd = html.length;
      }

      var content = html.slice(position.index, contentEnd);
      jumpPosition(position, html, commentEnd);
      this.tokens.push({
        type: type,
        content: content,
        position: {
          start: start,
          end: copyPosition(position)
        }
      });
    }
  }, {
    key: "scanTag",
    value: function scanTag() {
      this.scanTagStart();
      var tagName = this.scanTagName();
      this.scanAttrs();
      this.scanTagEnd();
      return tagName;
    }
  }, {
    key: "scanTagStart",
    value: function scanTagStart() {
      var type = 'tag-start';
      var html = this.html,
          position = this.position;
      var secondChar = html.charAt(position.index + 1);
      var close = secondChar === '/';
      var start = copyPosition(position);
      feedPosition(position, html, close ? 2 : 1);
      this.tokens.push({
        type: type,
        close: close,
        position: {
          start: start
        }
      });
    }
  }, {
    key: "scanTagEnd",
    value: function scanTagEnd() {
      var type = 'tag-end';
      var html = this.html,
          position = this.position;
      var firstChar = html.charAt(position.index);
      var close = firstChar === '/';
      feedPosition(position, html, close ? 2 : 1);
      var end = copyPosition(position);
      this.tokens.push({
        type: type,
        close: close,
        position: {
          end: end
        }
      });
    }
  }, {
    key: "scanTagName",
    value: function scanTagName() {
      var type = 'tag';
      var html = this.html,
          position = this.position;
      var len = html.length;
      var start = position.index;

      while (start < len) {
        var char = html.charAt(start);
        var isTagChar = !(isWhitespaceChar(char) || char === '/' || char === '>');
        if (isTagChar) break;
        start++;
      }

      var end = start + 1;

      while (end < len) {
        var _char2 = html.charAt(end);

        var _isTagChar = !(isWhitespaceChar(_char2) || _char2 === '/' || _char2 === '>');

        if (!_isTagChar) break;
        end++;
      }

      jumpPosition(position, html, end);
      var tagName = html.slice(start, end);
      this.tokens.push({
        type: type,
        content: tagName
      });
      return tagName;
    }
  }, {
    key: "scanAttrs",
    value: function scanAttrs() {
      var html = this.html,
          position = this.position,
          tokens = this.tokens;
      var cursor = position.index;
      var quote = null; // null, single-, or double-quote

      var wordBegin = cursor; // index of word start

      var words = []; // "key", "key=value", "key='value'", etc

      var len = html.length;

      while (cursor < len) {
        var char = html.charAt(cursor);

        if (quote) {
          var isQuoteEnd = char === quote;

          if (isQuoteEnd) {
            quote = null;
          }

          cursor++;
          continue;
        }

        var isTagEnd = char === '/' || char === '>';

        if (isTagEnd) {
          if (cursor !== wordBegin) {
            words.push(html.slice(wordBegin, cursor));
          }

          break;
        }

        if (isWordEnd(cursor, wordBegin, html)) {
          if (cursor !== wordBegin) {
            words.push(html.slice(wordBegin, cursor));
          }

          wordBegin = cursor + 1;
          cursor++;
          continue;
        }

        var isQuoteStart = char === '\'' || char === '"';

        if (isQuoteStart) {
          quote = char;
          cursor++;
          continue;
        }

        cursor++;
      }

      jumpPosition(position, html, cursor);
      var wLen = words.length;
      var type = 'attribute';

      for (var i = 0; i < wLen; i++) {
        var word = words[i];
        var isNotPair = word.includes('=');

        if (isNotPair) {
          var secondWord = words[i + 1];

          if (secondWord && secondWord.startsWith('=')) {
            if (secondWord.length > 1) {
              var newWord = word + secondWord;
              tokens.push({
                type: type,
                content: newWord
              });
              i += 1;
              continue;
            }

            var thirdWord = words[i + 2];
            i += 1;

            if (thirdWord) {
              var _newWord = word + '=' + thirdWord;

              tokens.push({
                type: type,
                content: _newWord
              });
              i += 1;
              continue;
            }
          }
        }

        if (word.endsWith('=')) {
          var _secondWord = words[i + 1];

          if (_secondWord && !_secondWord.includes('=')) {
            var _newWord3 = word + _secondWord;

            tokens.push({
              type: type,
              content: _newWord3
            });
            i += 1;
            continue;
          }

          var _newWord2 = word.slice(0, -1);

          tokens.push({
            type: type,
            content: _newWord2
          });
          continue;
        }

        tokens.push({
          type: type,
          content: word
        });
      }
    }
  }, {
    key: "scanSkipTag",
    value: function scanSkipTag(tagName) {
      var html = this.html,
          position = this.position;
      var safeTagName = tagName.toLowerCase();
      var len = html.length;

      while (position.index < len) {
        var nextTag = html.indexOf('</', position.index);

        if (nextTag === -1) {
          this.scanText();
          break;
        }

        jumpPosition(position, html, nextTag);
        var name = this.scanTag();

        if (safeTagName === name.toLowerCase()) {
          break;
        }
      }
    }
  }]);

  return Scaner;
}();

function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return !!map[val.toLowerCase()];
  } : function (val) {
    return !!map[val];
  };
}

var specialMiniElements = {
  img: 'image',
  iframe: 'web-view'
};
var internalCompsList = Object.keys(internalComponents).map(function (i) {
  return i.toLowerCase();
}).join(','); // https://developers.weixin.qq.com/miniprogram/dev/component

var isMiniElements = makeMap(internalCompsList, true); // https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements

var isInlineElements = makeMap('a,i,abbr,iframe,select,acronym,slot,small,span,bdi,kbd,strong,big,map,sub,sup,br,mark,mark,meter,template,canvas,textarea,cite,object,time,code,output,u,data,picture,tt,datalist,var,dfn,del,q,em,s,embed,samp,b', true); // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements

var isBlockElements = makeMap('address,fieldset,li,article,figcaption,main,aside,figure,nav,blockquote,footer,ol,details,form,p,dialog,h1,h2,h3,h4,h5,h6,pre,dd,header,section,div,hgroup,table,dl,hr,ul,dt', true);

function unquote(str) {
  var car = str.charAt(0);
  var end = str.length - 1;
  var isQuoteStart = car === '"' || car === "'";

  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }

  return str;
}

var LEFT_BRACKET = '{';
var RIGHT_BRACKET = '}';
var CLASS_SELECTOR = '.';
var ID_SELECTOR = '#';
var CHILD_COMBINATOR = '>';
var GENERAL_SIBLING_COMBINATOR = '~';
var ADJACENT_SIBLING_COMBINATOR = '+';

var StyleTagParser = /*#__PURE__*/function () {
  function StyleTagParser() {
    _classCallCheck(this, StyleTagParser);

    this.styles = [];
  }

  _createClass(StyleTagParser, [{
    key: "extractStyle",
    value: function extractStyle(src) {
      var _this13 = this;

      var REG_STYLE = /<style\s?[^>]*>((.|\n|\s)+?)<\/style>/g;
      var html = src; // let html = src.replace(/\n/g, '')

      html = html.replace(REG_STYLE, function (_, $1) {
        var style = $1.trim();

        _this13.stringToSelector(style);

        return '';
      });
      return html.trim();
    }
  }, {
    key: "stringToSelector",
    value: function stringToSelector(style) {
      var _this14 = this;

      var lb = style.indexOf(LEFT_BRACKET);

      var _loop3 = function _loop3() {
        var rb = style.indexOf(RIGHT_BRACKET);
        var selectors = style.slice(0, lb).trim();
        var content = style.slice(lb + 1, rb);
        content = content.replace(/:(.*);/g, function (_, $1) {
          var t = $1.trim().replace(/ +/g, '+++');
          return ":".concat(t, ";");
        });
        content = content.replace(/ /g, '');
        content = content.replace(/\+\+\+/g, ' ');

        if (!/;$/.test(content)) {
          content += ';';
        }

        selectors.split(',').forEach(function (src) {
          var selectorList = _this14.parseSelector(src);

          _this14.styles.push({
            content: content,
            selectorList: selectorList
          });
        });
        style = style.slice(rb + 1);
        lb = style.indexOf(LEFT_BRACKET);
      };

      while (lb > -1) {
        _loop3();
      } // console.log('res this.styles: ', this.styles)

    }
  }, {
    key: "parseSelector",
    value: function parseSelector(src) {
      var list = src.trim().replace(/ *([>~+]) */g, ' $1').replace(/ +/g, ' ').replace(/\[\s*([^[\]=\s]+)\s*=\s*([^[\]=\s]+)\s*\]/g, '[$1=$2]').split(' ');
      var selectors = list.map(function (item) {
        var firstChar = item.charAt(0);
        var selector = {
          isChild: firstChar === CHILD_COMBINATOR,
          isGeneralSibling: firstChar === GENERAL_SIBLING_COMBINATOR,
          isAdjacentSibling: firstChar === ADJACENT_SIBLING_COMBINATOR,
          tag: null,
          id: null,
          class: [],
          attrs: []
        };
        item = item.replace(/^[>~+]/, ''); // 属性选择器

        item = item.replace(/\[(.+?)\]/g, function (_, $1) {
          var _$1$split = $1.split('='),
              _$1$split2 = _slicedToArray(_$1$split, 2),
              key = _$1$split2[0],
              value = _$1$split2[1];

          var all = $1.indexOf('=') === -1;
          var attr = {
            all: all,
            key: key,
            value: all ? null : value
          };
          selector.attrs.push(attr);
          return '';
        });
        item = item.replace(/([.#][A-Za-z0-9-_]+)/g, function (_, $1) {
          if ($1[0] === ID_SELECTOR) {
            // id 选择器
            selector.id = $1.substr(1);
          } else if ($1[0] === CLASS_SELECTOR) {
            // class 选择器
            selector.class.push($1.substr(1));
          }

          return '';
        }); // 标签选择器

        if (item !== '') {
          selector.tag = item;
        }

        return selector;
      });
      return selectors;
    }
  }, {
    key: "matchStyle",
    value: function matchStyle(tagName, el, list) {
      var _this15 = this;

      var res = sortStyles(this.styles).reduce(function (str, _ref2, i) {
        var content = _ref2.content,
            selectorList = _ref2.selectorList;
        var idx = list[i];
        var selector = selectorList[idx];
        var nextSelector = selectorList[idx + 1];

        if ((nextSelector === null || nextSelector === void 0 ? void 0 : nextSelector.isGeneralSibling) || (nextSelector === null || nextSelector === void 0 ? void 0 : nextSelector.isAdjacentSibling)) {
          selector = nextSelector;
          idx += 1;
          list[i] += 1;
        }

        var isMatch = _this15.matchCurrent(tagName, el, selector);

        if (isMatch && selector.isGeneralSibling) {
          var prev = getPreviousElement(el);

          while (prev) {
            if (prev.h5tagName && _this15.matchCurrent(prev.h5tagName, prev, selectorList[idx - 1])) {
              isMatch = true;
              break;
            }

            prev = getPreviousElement(prev);
            isMatch = false;
          }
        }

        if (isMatch && selector.isAdjacentSibling) {
          var _prev = getPreviousElement(el);

          if (!_prev || !_prev.h5tagName) {
            isMatch = false;
          } else {
            var isSiblingMatch = _this15.matchCurrent(_prev.h5tagName, _prev, selectorList[idx - 1]);

            if (!isSiblingMatch) {
              isMatch = false;
            }
          }
        }

        if (isMatch) {
          if (idx === selectorList.length - 1) {
            return str + content;
          } else if (idx < selectorList.length - 1) {
            list[i] += 1;
          }
        } else {
          // 直接子代组合器: >
          if (selector.isChild && idx > 0) {
            list[i] -= 1;

            if (_this15.matchCurrent(tagName, el, selectorList[list[i]])) {
              list[i] += 1;
            }
          }
        }

        return str;
      }, '');
      return res;
    }
  }, {
    key: "matchCurrent",
    value: function matchCurrent(tagName, el, selector) {
      // 标签选择器
      if (selector.tag && selector.tag !== tagName) return false; // id 选择器

      if (selector.id && selector.id !== el.id) return false; // class 选择器

      if (selector.class.length) {
        var classList = el.className.split(' ');

        for (var i = 0; i < selector.class.length; i++) {
          var cls = selector.class[i];

          if (classList.indexOf(cls) === -1) {
            return false;
          }
        }
      } // 属性选择器


      if (selector.attrs.length) {
        for (var _i3 = 0; _i3 < selector.attrs.length; _i3++) {
          var _selector$attrs$_i = selector.attrs[_i3],
              all = _selector$attrs$_i.all,
              key = _selector$attrs$_i.key,
              value = _selector$attrs$_i.value;

          if (all && !el.hasAttribute(key)) {
            return false;
          } else {
            var attr = el.getAttribute(key);

            if (attr !== unquote(value || '')) {
              return false;
            }
          }
        }
      }

      return true;
    }
  }]);

  return StyleTagParser;
}();

function getPreviousElement(el) {
  var parent = el.parentElement;
  if (!parent) return null;
  var prev = el.previousSibling;
  if (!prev) return null;

  if (prev.nodeType === 1
  /* ELEMENT_NODE */
  ) {
    return prev;
  } else {
    return getPreviousElement(prev);
  }
} // 根据 css selector 权重排序: 权重大的靠后
// @WARN 不考虑伪类
// https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#specificity_2


function sortStyles(styles) {
  return styles.sort(function (s1, s2) {
    var hundreds1 = getHundredsWeight(s1.selectorList);
    var hundreds2 = getHundredsWeight(s2.selectorList);
    if (hundreds1 !== hundreds2) return hundreds1 - hundreds2;
    var tens1 = getTensWeight(s1.selectorList);
    var tens2 = getTensWeight(s2.selectorList);
    if (tens1 !== tens2) return tens1 - tens2;
    var ones1 = getOnesWeight(s1.selectorList);
    var ones2 = getOnesWeight(s2.selectorList);
    return ones1 - ones2;
  });
}

function getHundredsWeight(selectors) {
  return selectors.reduce(function (pre, cur) {
    return pre + (cur.id ? 1 : 0);
  }, 0);
}

function getTensWeight(selectors) {
  return selectors.reduce(function (pre, cur) {
    return pre + cur.class.length + cur.attrs.length;
  }, 0);
}

function getOnesWeight(selectors) {
  return selectors.reduce(function (pre, cur) {
    return pre + (cur.tag ? 1 : 0);
  }, 0);
}

var closingTagAncestorBreakers = {
  li: ['ul', 'ol', 'menu'],
  dt: ['dl'],
  dd: ['dl'],
  tbody: ['table'],
  thead: ['table'],
  tfoot: ['table'],
  tr: ['table'],
  td: ['table']
};

function hasTerminalParent(tagName, stack) {
  var tagParents = closingTagAncestorBreakers[tagName];

  if (tagParents) {
    var currentIndex = stack.length - 1;

    while (currentIndex >= 0) {
      var parentTagName = stack[currentIndex].tagName;

      if (parentTagName === tagName) {
        break;
      }

      if (tagParents && tagParents.includes(parentTagName)) {
        return true;
      }

      currentIndex--;
    }
  }

  return false;
}

function getTagName(tag) {
  if (options.html.renderHTMLTag) {
    return tag;
  }

  if (specialMiniElements[tag]) {
    return specialMiniElements[tag];
  } else if (isMiniElements(tag)) {
    return tag;
  } else if (isBlockElements(tag)) {
    return 'view';
  } else if (isInlineElements(tag)) {
    return 'text';
  }

  return 'view';
}

function splitEqual(str) {
  var sep = '=';
  var idx = str.indexOf(sep);
  if (idx === -1) return [str];
  var key = str.slice(0, idx).trim();
  var value = str.slice(idx + sep.length).trim();
  return [key, value];
}

function format(children, document, styleOptions, parent) {
  return children.filter(function (child) {
    // 过滤注释和空文本节点
    if (child.type === 'comment') {
      return false;
    } else if (child.type === 'text') {
      return child.content !== '';
    }

    return true;
  }).map(function (child) {
    // 文本节点
    if (child.type === 'text') {
      var text = document.createTextNode(child.content);

      if (isFunction(options.html.transformText)) {
        text = options.html.transformText(text, child);
      }

      parent === null || parent === void 0 ? void 0 : parent.appendChild(text);
      return text;
    }

    var el = document.createElement(getTagName(child.tagName));
    el.h5tagName = child.tagName;
    parent === null || parent === void 0 ? void 0 : parent.appendChild(el);

    if (!options.html.renderHTMLTag) {
      el.className = "h5-".concat(child.tagName);
    }

    for (var i = 0; i < child.attributes.length; i++) {
      var attr = child.attributes[i];

      var _splitEqual = splitEqual(attr),
          _splitEqual2 = _slicedToArray(_splitEqual, 2),
          key = _splitEqual2[0],
          value = _splitEqual2[1];

      if (key === 'class') {
        el.className += ' ' + unquote(value);
      } else if (key[0] === 'o' && key[1] === 'n') {
        continue;
      } else {
        el.setAttribute(key, value == null ? true : unquote(value));
      }
    }

    var styleTagParser = styleOptions.styleTagParser,
        descendantList = styleOptions.descendantList;
    var list = descendantList.slice();
    var style = styleTagParser.matchStyle(child.tagName, el, list);
    el.setAttribute('style', style + el.style.cssText); // console.log('style, ', style)

    format(child.children, document, {
      styleTagParser: styleTagParser,
      descendantList: list
    }, el);

    if (isFunction(options.html.transformElement)) {
      return options.html.transformElement(el, child);
    }

    return el;
  });
}

function parser(html, document) {
  var styleTagParser = new StyleTagParser();
  html = styleTagParser.extractStyle(html);
  var tokens = new Scaner(html).scan();
  var root = {
    tagName: '',
    children: [],
    type: 'element',
    attributes: []
  };
  var state = {
    tokens: tokens,
    options: options,
    cursor: 0,
    stack: [root]
  };
  parse(state);
  return format(root.children, document, {
    styleTagParser: styleTagParser,
    descendantList: Array(styleTagParser.styles.length).fill(0)
  });
}

function parse(state) {
  var tokens = state.tokens,
      stack = state.stack;
  var cursor = state.cursor;
  var len = tokens.length;
  var nodes = stack[stack.length - 1].children;

  while (cursor < len) {
    var token = tokens[cursor];

    if (token.type !== 'tag-start') {
      // comment or text
      nodes.push(token);
      cursor++;
      continue;
    }

    var tagToken = tokens[++cursor];
    cursor++;
    var tagName = tagToken.content.toLowerCase();

    if (token.close) {
      var index = stack.length;
      var shouldRewind = false;

      while (--index > -1) {
        if (stack[index].tagName === tagName) {
          shouldRewind = true;
          break;
        }
      }

      while (cursor < len) {
        var endToken = tokens[cursor];
        if (endToken.type !== 'tag-end') break;
        cursor++;
      }

      if (shouldRewind) {
        stack.splice(index);
        break;
      } else {
        continue;
      }
    }

    var isClosingTag = options.html.closingElements.has(tagName);
    var shouldRewindToAutoClose = isClosingTag;

    if (shouldRewindToAutoClose) {
      shouldRewindToAutoClose = !hasTerminalParent(tagName, stack);
    }

    if (shouldRewindToAutoClose) {
      var currentIndex = stack.length - 1;

      while (currentIndex > 0) {
        if (tagName === stack[currentIndex].tagName) {
          stack.splice(currentIndex);
          var previousIndex = currentIndex - 1;
          nodes = stack[previousIndex].children;
          break;
        }

        currentIndex = currentIndex - 1;
      }
    }

    var attributes = [];
    var attrToken = void 0;

    while (cursor < len) {
      attrToken = tokens[cursor];
      if (attrToken.type === 'tag-end') break;
      attributes.push(attrToken.content);
      cursor++;
    }

    cursor++;
    var children = [];
    var element = {
      type: 'element',
      tagName: tagToken.content,
      attributes: attributes,
      children: children
    };
    nodes.push(element);
    var hasChildren = !(attrToken.close || options.html.voidElements.has(tagName));

    if (hasChildren) {
      stack.push({
        tagName: tagName,
        children: children
      });
      var innerState = {
        tokens: tokens,
        cursor: cursor,
        stack: stack
      };
      parse(innerState);
      cursor = innerState.cursor;
    }
  }

  state.cursor = cursor;
}

options.html = {
  skipElements: new Set(['style', 'script']),
  voidElements: new Set(['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']),
  closingElements: new Set(['html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option', 'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup']),
  renderHTMLTag: false
};

function setInnerHTML(element, html, getDoc) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  var children = parser(html, getDoc());

  for (var i = 0; i < children.length; i++) {
    element.appendChild(children[i]);
  }
}
/**
 * An implementation of `Element.insertAdjacentHTML()`
 * to support Vue 3 with a version of or greater than `vue@3.1.2`
 */


function insertAdjacentHTMLImpl(position, html, getDoc) {
  var _a, _b;

  var parsedNodes = parser(html, getDoc());

  for (var i = 0; i < parsedNodes.length; i++) {
    var n = parsedNodes[i];

    switch (position) {
      case 'beforebegin':
        (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(n, this);
        break;

      case 'afterbegin':
        if (this.hasChildNodes()) {
          this.insertBefore(n, this.childNodes[0]);
        } else {
          this.appendChild(n);
        }

        break;

      case 'beforeend':
        this.appendChild(n);
        break;

      case 'afterend':
        (_b = this.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(n);
        break;
    }
  }
}

function cloneNode(ctx, getDoc) {
  var isDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var document = getDoc();
  var newNode;

  if (ctx.nodeType === 1
  /* ELEMENT_NODE */
  ) {
    newNode = document.createElement(ctx.nodeName);
  } else if (ctx.nodeType === 3
  /* TEXT_NODE */
  ) {
    newNode = document.createTextNode('');
  }

  for (var key in this) {
    var value = this[key];

    if ([PROPS, DATASET].includes(key) && _typeof(value) === OBJECT) {
      newNode[key] = Object.assign({}, value);
    } else if (key === '_value') {
      newNode[key] = value;
    } else if (key === STYLE) {
      newNode.style._value = Object.assign({}, value._value);
      newNode.style._usedStyleProp = new Set(Array.from(value._usedStyleProp));
    }
  }

  if (isDeep) {
    newNode.childNodes = ctx.childNodes.map(function (node) {
      return node.cloneNode(true);
    });
  }

  return newNode;
}

var TaroNodeImpl = /*#__PURE__*/function () {
  function TaroNodeImpl( // eslint-disable-next-line @typescript-eslint/indent
  getElement) {
    _classCallCheck(this, TaroNodeImpl);

    this.getDoc = function () {
      return getElement(ElementNames.Document)();
    };
  }

  _createClass(TaroNodeImpl, [{
    key: "bind",
    value: function bind(ctx) {
      var getDoc = this.getDoc;

      if (ENABLE_INNER_HTML) {
        bindInnerHTML(ctx, getDoc);

        if (ENABLE_ADJACENT_HTML) {
          bindAdjacentHTML(ctx, getDoc);
        }
      }

      if (ENABLE_CLONE_NODE) {
        ctx.cloneNode = cloneNode.bind(ctx, ctx, getDoc);
      }
    }
  }]);

  return TaroNodeImpl;
}();

TaroNodeImpl = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __metadata("design:paramtypes", [Function])], TaroNodeImpl);

function bindInnerHTML(ctx, getDoc) {
  Object.defineProperty(ctx, 'innerHTML', {
    configurable: true,
    enumerable: true,
    set: function set(html) {
      setInnerHTML.call(ctx, ctx, html, getDoc);
    },
    get: function get() {
      return '';
    }
  });
}

function bindAdjacentHTML(ctx, getDoc) {
  ctx.insertAdjacentHTML = function (position, html) {
    insertAdjacentHTMLImpl.call(ctx, position, html, getDoc);
  };
}

function getBoundingClientRectImpl() {
  var _this16 = this;

  if (!options.miniGlobal) return Promise.resolve(null);
  return new Promise(function (resolve) {
    var query = options.miniGlobal.createSelectorQuery();
    query.select("#".concat(_this16.uid)).boundingClientRect(function (res) {
      resolve(res);
    }).exec();
  });
}

function getTemplateContent(ctx) {
  if (ctx.nodeName === 'template') {
    var content = ctx._getElement(ElementNames.Element)(DOCUMENT_FRAGMENT);

    content.childNodes = ctx.childNodes;
    ctx.childNodes = [content];
    content.parentNode = ctx;
    content.childNodes.forEach(function (nodes) {
      nodes.parentNode = content;
    });
    return content;
  }
}

var TaroElementImpl = /*#__PURE__*/function () {
  function TaroElementImpl() {
    _classCallCheck(this, TaroElementImpl);
  }

  _createClass(TaroElementImpl, [{
    key: "bind",
    value: function bind(ctx) {
      if (ENABLE_SIZE_APIS) {
        ctx.getBoundingClientRect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          var _len,
              args,
              _key,
              _args = arguments;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args[_key];
                  }

                  _context.next = 3;
                  return getBoundingClientRectImpl.apply(ctx, args);

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }

      if (ENABLE_TEMPLATE_CONTENT) {
        bindContent(ctx);
      }
    }
  }]);

  return TaroElementImpl;
}();

TaroElementImpl = __decorate([inversify_19()], TaroElementImpl);

function bindContent(ctx) {
  Object.defineProperty(ctx, 'content', {
    configurable: true,
    enumerable: true,
    get: function get() {
      return getTemplateContent(ctx);
    }
  });
}

var TaroDocument = /*#__PURE__*/function (_TaroElement4) {
  _inherits(TaroDocument, _TaroElement4);

  var _super8 = _createSuper(TaroDocument);

  function TaroDocument( // eslint-disable-next-line @typescript-eslint/indent
  nodeImpl, getElement, hooks, elementImpl, getText) {
    var _this17;

    _classCallCheck(this, TaroDocument);

    _this17 = _super8.call(this, nodeImpl, getElement, hooks, elementImpl);
    _this17._getText = getText;
    _this17.nodeType = 9
    /* DOCUMENT_NODE */
    ;
    _this17.nodeName = DOCUMENT_ELEMENT_NAME;
    return _this17;
  }

  _createClass(TaroDocument, [{
    key: "createElement",
    value: function createElement(type) {
      if (type === ROOT_STR) {
        return this._getElement(ElementNames.RootElement)();
      }

      if (controlledComponent.has(type)) {
        return this._getElement(ElementNames.FormElement)(type);
      }

      return this._getElement(ElementNames.Element)(type);
    } // an ugly fake createElementNS to deal with @vue/runtime-dom's
    // support mounting app to svg container since vue@3.0.8

  }, {
    key: "createElementNS",
    value: function createElementNS(_svgNS, type) {
      return this.createElement(type);
    }
  }, {
    key: "createTextNode",
    value: function createTextNode(text) {
      return this._getText(text);
    }
  }, {
    key: "getElementById",
    value: function getElementById(id) {
      var el = eventSource.get(id);
      return isUndefined(el) ? null : el;
    }
  }, {
    key: "querySelector",
    value: function querySelector(query) {
      // 为了 Vue3 的乞丐版实现
      if (/^#/.test(query)) {
        return this.getElementById(query.slice(1));
      }

      return null;
    }
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll() {
      // fake hack
      return [];
    } // @TODO: @PERF: 在 hydrate 移除掉空的 node

  }, {
    key: "createComment",
    value: function createComment() {
      var textnode = this._getText('');

      textnode.nodeName = COMMENT;
      return textnode;
    }
  }]);

  return TaroDocument;
}(TaroElement);

TaroDocument = __decorate([inversify_19(), __param(0, inversify_16(SERVICE_IDENTIFIER.TaroNodeImpl)), __param(1, inversify_16(SERVICE_IDENTIFIER.TaroElementFactory)), __param(2, inversify_16(SERVICE_IDENTIFIER.Hooks)), __param(3, inversify_16(SERVICE_IDENTIFIER.TaroElementImpl)), __param(4, inversify_16(SERVICE_IDENTIFIER.TaroTextFactory)), __metadata("design:paramtypes", [Function, Function, Function, Function, Function])], TaroDocument);

var Hooks = /*#__PURE__*/function () {
  function Hooks() {
    _classCallCheck(this, Hooks);
  }

  _createClass(Hooks, [{
    key: "modifyMpEvent",
    value: function modifyMpEvent(e) {
      var _a;

      (_a = this.modifyMpEventImpls) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) {
        return fn(e);
      });
    }
  }, {
    key: "modifyTaroEvent",
    value: function modifyTaroEvent(e, element) {
      var _a;

      (_a = this.modifyTaroEventImpls) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) {
        return fn(e, element);
      });
    }
  }, {
    key: "initNativeApi",
    value: function initNativeApi(taro) {
      var _a;

      (_a = this.initNativeApiImpls) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) {
        return fn(taro);
      });
    }
  }, {
    key: "patchElement",
    value: function patchElement(element) {
      var _a;

      (_a = this.patchElementImpls) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) {
        return fn(element);
      });
    }
  }]);

  return Hooks;
}();

__decorate([inversify_16(SERVICE_IDENTIFIER.getLifecycle), __metadata("design:type", Function)], Hooks.prototype, "getLifecycle", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.getPathIndex), __metadata("design:type", Function)], Hooks.prototype, "getPathIndex", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.getEventCenter), __metadata("design:type", Function)], Hooks.prototype, "getEventCenter", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.isBubbleEvents), __metadata("design:type", Function)], Hooks.prototype, "isBubbleEvents", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.getSpecialNodes), __metadata("design:type", Function)], Hooks.prototype, "getSpecialNodes", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.onRemoveAttribute), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "onRemoveAttribute", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.batchedEventUpdates), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "batchedEventUpdates", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.mergePageInstance), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "mergePageInstance", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.createPullDownComponent), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "createPullDownComponent", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.getDOMNode), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "getDOMNode", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.modifyHydrateData), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "modifyHydrateData", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.modifySetAttrPayload), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "modifySetAttrPayload", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.modifyRmAttrPayload), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "modifyRmAttrPayload", void 0);

__decorate([inversify_16(SERVICE_IDENTIFIER.onAddEvent), inversify_14(), __metadata("design:type", Function)], Hooks.prototype, "onAddEvent", void 0);

__decorate([inversify_12(SERVICE_IDENTIFIER.modifyMpEvent), inversify_14(), __metadata("design:type", Array)], Hooks.prototype, "modifyMpEventImpls", void 0);

__decorate([inversify_12(SERVICE_IDENTIFIER.modifyTaroEvent), inversify_14(), __metadata("design:type", Array)], Hooks.prototype, "modifyTaroEventImpls", void 0);

__decorate([inversify_12(SERVICE_IDENTIFIER.initNativeApi), inversify_14(), __metadata("design:type", Array)], Hooks.prototype, "initNativeApiImpls", void 0);

__decorate([inversify_12(SERVICE_IDENTIFIER.patchElement), inversify_14(), __metadata("design:type", Array)], Hooks.prototype, "patchElementImpls", void 0);

Hooks = __decorate([inversify_19()], Hooks);
/**
 * 支持冒泡的事件, 除 支付宝小程序外，其余的可冒泡事件都和微信保持一致
 * 详见 见 https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
 */

var BUBBLE_EVENTS = new Set(['touchstart', 'touchmove', 'touchcancel', 'touchend', 'touchforcechange', 'tap', 'longpress', 'longtap', 'transitionend', 'animationstart', 'animationiteration', 'animationend']);

var getLifecycle = function getLifecycle(instance, lifecycle) {
  return instance[lifecycle];
};

var getPathIndex = function getPathIndex(indexOfNode) {
  return "[".concat(indexOfNode, "]");
};

var getEventCenter = function getEventCenter(Events) {
  return new Events();
};

var isBubbleEvents = function isBubbleEvents(eventName) {
  return BUBBLE_EVENTS.has(eventName);
};

var getSpecialNodes = function getSpecialNodes() {
  return ['view', 'text', 'image'];
};

var DefaultHooksContainer = new inversify_20(function (bind) {
  bind(SERVICE_IDENTIFIER.getLifecycle).toFunction(getLifecycle);
  bind(SERVICE_IDENTIFIER.getPathIndex).toFunction(getPathIndex);
  bind(SERVICE_IDENTIFIER.getEventCenter).toFunction(getEventCenter);
  bind(SERVICE_IDENTIFIER.isBubbleEvents).toFunction(isBubbleEvents);
  bind(SERVICE_IDENTIFIER.getSpecialNodes).toFunction(getSpecialNodes);
});

function processPluginHooks(container) {
  var keys = Object.keys(defaultReconciler);
  keys.forEach(function (key) {
    if (key in SERVICE_IDENTIFIER) {
      // is hooks
      var identifier = SERVICE_IDENTIFIER[key];
      var fn = defaultReconciler[key];

      if (isArray(fn)) {
        // is multi
        fn.forEach(function (item) {
          return container.bind(identifier).toFunction(item);
        });
      } else {
        if (container.isBound(identifier)) {
          // 之前有绑定过，需要重新绑定以覆盖前者
          container.rebind(identifier).toFunction(fn);
        } else {
          container.bind(identifier).toFunction(fn);
        }
      }
    }
  });
}

var container$1 = new inversify_25();

if (process.env.TARO_ENV !== 'h5') {
  container$1.bind(SERVICE_IDENTIFIER.TaroElement).to(TaroElement).whenTargetNamed(ElementNames.Element);
  container$1.bind(SERVICE_IDENTIFIER.TaroElement).to(TaroDocument).inSingletonScope().whenTargetNamed(ElementNames.Document);
  container$1.bind(SERVICE_IDENTIFIER.TaroElement).to(TaroRootElement).whenTargetNamed(ElementNames.RootElement);
  container$1.bind(SERVICE_IDENTIFIER.TaroElement).to(FormElement).whenTargetNamed(ElementNames.FormElement);
  container$1.bind(SERVICE_IDENTIFIER.TaroElementFactory).toFactory(function (context) {
    return function (named) {
      return function (nodeName) {
        var el = context.container.getNamed(SERVICE_IDENTIFIER.TaroElement, named);

        if (nodeName) {
          el.nodeName = nodeName;
        }

        el.tagName = el.nodeName.toUpperCase();
        return el;
      };
    };
  });
  container$1.bind(SERVICE_IDENTIFIER.TaroText).to(TaroText);
  container$1.bind(SERVICE_IDENTIFIER.TaroTextFactory).toFactory(function (context) {
    return function (text) {
      var textNode = context.container.get(SERVICE_IDENTIFIER.TaroText);
      textNode._value = text;
      return textNode;
    };
  });
  container$1.bind(SERVICE_IDENTIFIER.TaroNodeImpl).to(TaroNodeImpl).inSingletonScope();
  container$1.bind(SERVICE_IDENTIFIER.TaroElementImpl).to(TaroElementImpl).inSingletonScope();
}

container$1.bind(SERVICE_IDENTIFIER.Hooks).to(Hooks).inSingletonScope();
container$1.load(DefaultHooksContainer);
processPluginHooks(container$1);
var hooks;
var getElement;
var document$1;

if (process.env.TARO_ENV !== 'h5') {
  hooks = container$1.get(SERVICE_IDENTIFIER.Hooks);
  getElement = container$1.get(SERVICE_IDENTIFIER.TaroElementFactory);
  document$1 = getElement(ElementNames.Document)();
} // Taro 事件对象。以 Web 标准的事件对象为基础，加入小程序事件对象中携带的部分信息，并模拟实现事件冒泡。


var TaroEvent = /*#__PURE__*/function () {
  function TaroEvent(type, opts, event) {
    _classCallCheck(this, TaroEvent);

    this._stop = false;
    this._end = false;
    this.defaultPrevented = false; // timestamp can either be hi-res ( relative to page load) or low-res (relative to UNIX epoch)
    // here use hi-res timestamp

    this.timeStamp = Date.now();
    this.type = type.toLowerCase();
    this.mpEvent = event;
    this.bubbles = Boolean(opts && opts.bubbles);
    this.cancelable = Boolean(opts && opts.cancelable);
  }

  _createClass(TaroEvent, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this._stop = true;
    }
  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this._end = this._stop = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.defaultPrevented = true;
    }
  }, {
    key: "target",
    get: function get() {
      var _a, _b, _c;

      var element = document$1.getElementById((_a = this.mpEvent) === null || _a === void 0 ? void 0 : _a.target.id);
      return Object.assign(Object.assign(Object.assign({}, (_b = this.mpEvent) === null || _b === void 0 ? void 0 : _b.target), (_c = this.mpEvent) === null || _c === void 0 ? void 0 : _c.detail), {
        dataset: element !== null ? element.dataset : EMPTY_OBJ
      });
    }
  }, {
    key: "currentTarget",
    get: function get() {
      var _a, _b, _c;

      var element = document$1.getElementById((_a = this.mpEvent) === null || _a === void 0 ? void 0 : _a.currentTarget.id);

      if (element === null) {
        return this.target;
      }

      return Object.assign(Object.assign(Object.assign({}, (_b = this.mpEvent) === null || _b === void 0 ? void 0 : _b.currentTarget), (_c = this.mpEvent) === null || _c === void 0 ? void 0 : _c.detail), {
        dataset: element.dataset
      });
    }
  }]);

  return TaroEvent;
}();

function createEvent(event, node) {
  if (typeof event === 'string') {
    // For Vue3 using document.createEvent
    return new TaroEvent(event, {
      bubbles: true,
      cancelable: true
    });
  }

  var domEv = new TaroEvent(event.type, {
    bubbles: true,
    cancelable: true
  }, event);

  for (var key in event) {
    if (key === CURRENT_TARGET || key === TARGET || key === TYPE || key === TIME_STAMP) {
      continue;
    } else {
      domEv[key] = event[key];
    }
  }

  if (domEv.type === CONFIRM && (node === null || node === void 0 ? void 0 : node.nodeName) === INPUT) {
    // eslint-disable-next-line dot-notation
    domEv[KEY_CODE] = 13;
  }

  return domEv;
}

var eventsBatch = {}; // 小程序的事件代理回调函数

function eventHandler(event) {
  var _a;

  (_a = hooks.modifyMpEvent) === null || _a === void 0 ? void 0 : _a.call(hooks, event);

  if (event.currentTarget == null) {
    event.currentTarget = event.target;
  }

  var node = document$1.getElementById(event.currentTarget.id);

  if (node) {
    var dispatch = function dispatch() {
      var _a;

      var e = createEvent(event, node);
      (_a = hooks.modifyTaroEvent) === null || _a === void 0 ? void 0 : _a.call(hooks, e, node);
      node.dispatchEvent(e);
    };

    if (typeof hooks.batchedEventUpdates === 'function') {
      var type = event.type;

      if (!hooks.isBubbleEvents(type) || !isParentBinded(node, type) || type === TOUCHMOVE && !!node.props.catchMove) {
        // 最上层组件统一 batchUpdate
        hooks.batchedEventUpdates(function () {
          if (eventsBatch[type]) {
            eventsBatch[type].forEach(function (fn) {
              return fn();
            });
            delete eventsBatch[type];
          }

          dispatch();
        });
      } else {
        // 如果上层组件也有绑定同类型的组件，委托给上层组件调用事件回调
        (eventsBatch[type] || (eventsBatch[type] = [])).push(dispatch);
      }
    } else {
      dispatch();
    }
  }
}

var isBrowser = typeof document !== 'undefined' && !!document.scripts;
var doc = isBrowser ? document : EMPTY_OBJ;
var win = isBrowser ? window : EMPTY_OBJ;

function createDocument() {
  /**
   * <document>
   *   <html>
   *     <head></head>
   *     <body>
   *       <container>
   *         <app id="app" />
   *       </container>
   *     </body>
   *   </html>
   * </document>
   */
  var getElement = container$1.get(SERVICE_IDENTIFIER.TaroElementFactory);
  var doc = getElement(ElementNames.Document)();
  var documentCreateElement = doc.createElement.bind(doc);
  var html = documentCreateElement(HTML);
  var head = documentCreateElement(HEAD);
  var body = documentCreateElement(BODY);
  var app = documentCreateElement(APP);
  app.id = APP;
  var container$1$1 = documentCreateElement(CONTAINER); // 多包一层主要为了兼容 vue

  doc.appendChild(html);
  html.appendChild(head);
  html.appendChild(body);
  body.appendChild(container$1$1);
  container$1$1.appendChild(app);
  doc.documentElement = html;
  doc.head = head;
  doc.body = body;
  doc.createEvent = createEvent;
  return doc;
}

var document$2 = isBrowser ? doc : createDocument();
var machine = 'Macintosh';
var arch = 'Intel Mac OS X 10_14_5';
var engine = 'AppleWebKit/534.36 (KHTML, like Gecko) NodeJS/v4.1.0 Chrome/76.0.3809.132 Safari/534.36';
var navigator$1 = isBrowser ? win.navigator : {
  appCodeName: 'Mozilla',
  appName: 'Netscape',
  appVersion: '5.0 (' + machine + '; ' + arch + ') ' + engine,
  cookieEnabled: true,
  mimeTypes: [],
  onLine: true,
  platform: 'MacIntel',
  plugins: [],
  product: 'Taro',
  productSub: '20030107',
  userAgent: 'Mozilla/5.0 (' + machine + '; ' + arch + ') ' + engine,
  vendor: 'Joyent',
  vendorSub: ''
}; // https://github.com/myrne/performance-now

var now;

(function () {
  var loadTime;

  if (typeof performance !== 'undefined' && performance !== null && performance.now) {
    now = function now() {
      return performance.now();
    };
  } else if (Date.now) {
    now = function now() {
      return Date.now() - loadTime;
    };

    loadTime = Date.now();
  } else {
    now = function now() {
      return new Date().getTime() - loadTime;
    };

    loadTime = new Date().getTime();
  }
})();

var lastTime = 0; // https://gist.github.com/paulirish/1579671
// https://gist.github.com/jalbam/5fe05443270fa6d8136238ec72accbc0

var raf = typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame !== null ? requestAnimationFrame : function (callback) {
  var _now = now();

  var nextTime = Math.max(lastTime + 16, _now); // First time will execute it immediately but barely noticeable and performance is gained.

  return setTimeout(function () {
    callback(lastTime = nextTime);
  }, nextTime - _now);
};
var caf = typeof cancelAnimationFrame !== 'undefined' && cancelAnimationFrame !== null ? cancelAnimationFrame : function (seed) {
  // fix https://github.com/NervJS/taro/issues/7749
  clearTimeout(seed);
};

function getComputedStyle(element) {
  return element.style;
}

var window$1 = isBrowser ? win : {
  navigator: navigator$1,
  document: document$2
};

if (!isBrowser) {
  var globalProperties = [].concat(_toConsumableArray(Object.getOwnPropertyNames(global || win)), _toConsumableArray(Object.getOwnPropertySymbols(global || win)));
  globalProperties.forEach(function (property) {
    if (property === 'atob') return;

    if (!Object.prototype.hasOwnProperty.call(window$1, property)) {
      window$1[property] = global[property];
    }
  });
  document$2.defaultView = window$1;
}

if (process.env.TARO_ENV && process.env.TARO_ENV !== 'h5') {
  window$1.requestAnimationFrame = raf;
  window$1.cancelAnimationFrame = caf;
  window$1.getComputedStyle = getComputedStyle;

  window$1.addEventListener = function () {};

  window$1.removeEventListener = function () {};

  if (!(DATE in window$1)) {
    window$1.Date = Date;
  }

  window$1.setTimeout = function (cb, delay) {
    setTimeout(cb, delay);
  };

  window$1.clearTimeout = function (seed) {
    clearTimeout(seed);
  };
}

var Current = {
  app: null,
  router: null,
  page: null
};

var getCurrentInstance = function getCurrentInstance() {
  return Current;
};

var Events = /*#__PURE__*/function () {
  function Events(opts) {
    _classCallCheck(this, Events);

    if (typeof opts !== 'undefined' && opts.callbacks) {
      this.callbacks = opts.callbacks;
    } else {
      this.callbacks = {};
    }
  }

  _createClass(Events, [{
    key: "on",
    value: function on(eventName, callback, context) {
      var event, node, tail, list;

      if (!callback) {
        return this;
      }

      eventName = eventName.split(Events.eventSplitter);
      this.callbacks || (this.callbacks = {});
      var calls = this.callbacks;

      while (event = eventName.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {
          tail: tail,
          next: list ? list.next : node
        };
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(events, callback, context) {
      var _this18 = this;

      var wrapper = function wrapper() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        callback.apply(_this18, args);

        _this18.off(events, wrapper, context);
      };

      this.on(events, wrapper, context);
      return this;
    }
  }, {
    key: "off",
    value: function off(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      if (!(calls = this.callbacks)) {
        return this;
      }

      if (!(events || callback || context)) {
        delete this.callbacks;
        return this;
      }

      events = events ? events.split(Events.eventSplitter) : Object.keys(calls);

      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];

        if (!node || !(callback || context)) {
          continue;
        }

        tail = node.tail;

        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;

          if (callback && cb !== callback || context && ctx !== context) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(events) {
      var event, node, calls, tail;

      if (!(calls = this.callbacks)) {
        return this;
      }

      events = events.split(Events.eventSplitter);
      var rest = [].slice.call(arguments, 1);

      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;

          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
      }

      return this;
    }
  }]);

  return Events;
}();

Events.eventSplitter = /\s+/;
var hooks$1 = container$1.get(SERVICE_IDENTIFIER.Hooks);
var eventCenter = hooks$1.getEventCenter(Events);
container$1.bind(SERVICE_IDENTIFIER.eventCenter).toConstantValue(eventCenter);
/* eslint-disable dot-notation */

var instances = new Map();
var pageId = incrementId();
var hooks$2 = container$1.get(SERVICE_IDENTIFIER.Hooks);

function injectPageInstance(inst, id) {
  var _a;

  (_a = hooks$2.mergePageInstance) === null || _a === void 0 ? void 0 : _a.call(hooks$2, instances.get(id), inst);
  instances.set(id, inst);
}

function getPageInstance(id) {
  return instances.get(id);
}

function addLeadingSlash(path) {
  if (path == null) {
    return '';
  }

  return path.charAt(0) === '/' ? path : '/' + path;
}

function safeExecute(path, lifecycle) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  var instance = instances.get(path);

  if (instance == null) {
    return;
  }

  var func = hooks$2.getLifecycle(instance, lifecycle);

  if (isArray(func)) {
    var res = func.map(function (fn) {
      return fn.apply(instance, args);
    });
    return res[0];
  }

  if (!isFunction(func)) {
    return;
  }

  return func.apply(instance, args);
}

function stringify(obj) {
  if (obj == null) {
    return '';
  }

  var path = Object.keys(obj).map(function (key) {
    return key + '=' + obj[key];
  }).join('&');
  return path === '' ? path : '?' + path;
}

function getPath(id, options) {
  var path = id;

  if (!isBrowser) {
    path = id + stringify(options);
  }

  return path;
}

function getOnReadyEventKey(path) {
  return path + '.' + 'onReady';
}

function getOnShowEventKey(path) {
  return path + '.' + 'onShow';
}

function getOnHideEventKey(path) {
  return path + '.' + 'onHide';
}

function createPageConfig(component, pageName, data, pageConfig) {
  var _a, _b;

  var id = pageName !== null && pageName !== void 0 ? pageName : "taro_page_".concat(pageId()); // 小程序 Page 构造器是一个傲娇小公主，不能把复杂的对象挂载到参数上

  var pageElement = null;
  var unmounting = false;
  var prepareMountList = [];
  var loadResolver;
  var hasLoaded;
  var config = {
    onLoad: function onLoad() {
      var _this19 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      hasLoaded = new Promise(function (resolve) {
        loadResolver = resolve;
      });
      perf.start(PAGE_INIT);
      Current.page = this;
      this.config = pageConfig || {};
      options.$taroTimestamp = Date.now(); // this.$taroPath 是页面唯一标识，不可变，因此页面参数 options 也不可变

      this.$taroPath = getPath(id, options); // this.$taroParams 作为暴露给开发者的页面参数对象，可以被随意修改

      if (this.$taroParams == null) {
        this.$taroParams = Object.assign({}, options);
      }

      var router = isBrowser ? this.$taroPath : this.route || this.__route__;
      Current.router = {
        params: this.$taroParams,
        path: addLeadingSlash(router),
        onReady: getOnReadyEventKey(id),
        onShow: getOnShowEventKey(id),
        onHide: getOnHideEventKey(id)
      };

      var mount = function mount() {
        Current.app.mount(component, _this19.$taroPath, function () {
          pageElement = document$2.getElementById(_this19.$taroPath);
          ensure(pageElement !== null, '没有找到页面实例。');
          safeExecute(_this19.$taroPath, 'onLoad', _this19.$taroParams);
          loadResolver();

          if (!isBrowser) {
            pageElement.ctx = _this19;
            pageElement.performUpdate(true, cb);
          } else {
            isFunction(cb) && cb();
          }
        });
      };

      if (unmounting) {
        prepareMountList.push(mount);
      } else {
        mount();
      }
    },
    onReady: function onReady() {
      raf(function () {
        eventCenter.trigger(getOnReadyEventKey(id));
      });
      safeExecute(this.$taroPath, 'onReady');
      this.onReady.called = true;
    },
    onUnload: function onUnload() {
      var _this20 = this;

      unmounting = true;
      Current.app.unmount(this.$taroPath, function () {
        unmounting = false;
        instances.delete(_this20.$taroPath);

        if (pageElement) {
          pageElement.ctx = null;
        }

        if (prepareMountList.length) {
          prepareMountList.forEach(function (fn) {
            return fn();
          });
          prepareMountList = [];
        }
      });
    },
    onShow: function onShow() {
      var _this21 = this;

      hasLoaded.then(function () {
        Current.page = _this21;
        _this21.config = pageConfig || {};
        var router = isBrowser ? _this21.$taroPath : _this21.route || _this21.__route__;
        Current.router = {
          params: _this21.$taroParams,
          path: addLeadingSlash(router),
          onReady: getOnReadyEventKey(id),
          onShow: getOnShowEventKey(id),
          onHide: getOnHideEventKey(id)
        };
        raf(function () {
          eventCenter.trigger(getOnShowEventKey(id));
        });
        safeExecute(_this21.$taroPath, 'onShow');
      });
    },
    onHide: function onHide() {
      Current.page = null;
      Current.router = null;
      safeExecute(this.$taroPath, 'onHide');
      eventCenter.trigger(getOnHideEventKey(id));
    },
    onPullDownRefresh: function onPullDownRefresh() {
      return safeExecute(this.$taroPath, 'onPullDownRefresh');
    },
    onReachBottom: function onReachBottom() {
      return safeExecute(this.$taroPath, 'onReachBottom');
    },
    onPageScroll: function onPageScroll(options) {
      return safeExecute(this.$taroPath, 'onPageScroll', options);
    },
    onResize: function onResize(options) {
      return safeExecute(this.$taroPath, 'onResize', options);
    },
    onTabItemTap: function onTabItemTap(options) {
      return safeExecute(this.$taroPath, 'onTabItemTap', options);
    },
    onTitleClick: function onTitleClick() {
      return safeExecute(this.$taroPath, 'onTitleClick');
    },
    onOptionMenuClick: function onOptionMenuClick() {
      return safeExecute(this.$taroPath, 'onOptionMenuClick');
    },
    onPopMenuClick: function onPopMenuClick() {
      return safeExecute(this.$taroPath, 'onPopMenuClick');
    },
    onPullIntercept: function onPullIntercept() {
      return safeExecute(this.$taroPath, 'onPullIntercept');
    },
    onAddToFavorites: function onAddToFavorites() {
      return safeExecute(this.$taroPath, 'onAddToFavorites');
    }
  }; // onShareAppMessage 和 onShareTimeline 一样，会影响小程序右上方按钮的选项，因此不能默认注册。

  if (component.onShareAppMessage || ((_a = component.prototype) === null || _a === void 0 ? void 0 : _a.onShareAppMessage) || component.enableShareAppMessage) {
    config.onShareAppMessage = function (options) {
      var target = options === null || options === void 0 ? void 0 : options.target;

      if (target != null) {
        var _id = target.id;
        var element = document$2.getElementById(_id);

        if (element != null) {
          options.target.dataset = element.dataset;
        }
      }

      return safeExecute(this.$taroPath, 'onShareAppMessage', options);
    };
  }

  if (component.onShareTimeline || ((_b = component.prototype) === null || _b === void 0 ? void 0 : _b.onShareTimeline) || component.enableShareTimeline) {
    config.onShareTimeline = function () {
      return safeExecute(this.$taroPath, 'onShareTimeline');
    };
  }

  config.eh = eventHandler;

  if (!isUndefined(data)) {
    config.data = data;
  }

  if (isBrowser) {
    config.path = id;
  }

  return config;
}

function createComponentConfig(component, componentName, data) {
  var _a, _b, _c;

  var id = componentName !== null && componentName !== void 0 ? componentName : "taro_component_".concat(pageId());
  var componentElement = null;
  var config = {
    attached: function attached() {
      var _this22 = this;

      var _a;

      perf.start(PAGE_INIT);
      var path = getPath(id, {
        id: ((_a = this.getPageId) === null || _a === void 0 ? void 0 : _a.call(this)) || pageId()
      });
      Current.app.mount(component, path, function () {
        componentElement = document$2.getElementById(path);
        ensure(componentElement !== null, '没有找到组件实例。');
        safeExecute(path, 'onLoad');

        if (!isBrowser) {
          componentElement.ctx = _this22;
          componentElement.performUpdate(true);
        }
      });
    },
    detached: function detached() {
      var path = getPath(id, {
        id: this.getPageId()
      });
      Current.app.unmount(path, function () {
        instances.delete(path);

        if (componentElement) {
          componentElement.ctx = null;
        }
      });
    },
    methods: {
      eh: eventHandler
    }
  };

  if (!isUndefined(data)) {
    config.data = data;
  }

  config['options'] = (_a = component === null || component === void 0 ? void 0 : component['options']) !== null && _a !== void 0 ? _a : EMPTY_OBJ;
  config['externalClasses'] = (_b = component === null || component === void 0 ? void 0 : component['externalClasses']) !== null && _b !== void 0 ? _b : EMPTY_OBJ;
  config['behaviors'] = (_c = component === null || component === void 0 ? void 0 : component['behaviors']) !== null && _c !== void 0 ? _c : EMPTY_OBJ;
  return config;
}

function createRecursiveComponentConfig(componentName) {
  return {
    properties: {
      i: {
        type: Object,
        value: _defineProperty({}, "nn"
        /* NodeName */
        , 'view')
      },
      l: {
        type: String,
        value: ''
      }
    },
    options: {
      addGlobalClass: true,
      virtualHost: componentName !== 'custom-wrapper'
    },
    methods: {
      eh: eventHandler
    }
  };
}

var hooks$3 = container$1.get(SERVICE_IDENTIFIER.Hooks);

function isClassComponent(R, component) {
  var _a;

  return isFunction(component.render) || !!((_a = component.prototype) === null || _a === void 0 ? void 0 : _a.isReactComponent) || component.prototype instanceof R.Component; // compat for some others react-like library
} // 初始值设置为 any 主要是为了过 TS 的校验


var R = EMPTY_OBJ;
var PageContext = EMPTY_OBJ;

function connectReactPage(R, id) {
  var h = R.createElement;
  return function (component) {
    // eslint-disable-next-line dot-notation
    var isReactComponent = isClassComponent(R, component);

    var inject = function inject(node) {
      return node && injectPageInstance(node, id);
    };

    var refs = isReactComponent ? {
      ref: inject
    } : {
      forwardedRef: inject,
      // 兼容 react-redux 7.20.1+
      reactReduxForwardedRef: inject
    };

    if (PageContext === EMPTY_OBJ) {
      PageContext = R.createContext('');
    }

    return /*#__PURE__*/function (_R$Component) {
      _inherits(Page, _R$Component);

      var _super9 = _createSuper(Page);

      function Page() {
        var _this23;

        _classCallCheck(this, Page);

        _this23 = _super9.apply(this, arguments);
        _this23.state = {
          hasError: false
        };
        return _this23;
      }

      _createClass(Page, [{
        key: "componentDidCatch",
        value: // React 16 uncaught error 会导致整个应用 crash，
        // 目前把错误缩小到页面
        function componentDidCatch(error, info) {
          process.env.NODE_ENV !== 'production' && console.warn(error);
          process.env.NODE_ENV !== 'production' && console.error(info.componentStack);
        }
      }, {
        key: "render",
        value: function render() {
          var children = this.state.hasError ? [] : h(PageContext.Provider, {
            value: id
          }, h(component, Object.assign(Object.assign({}, this.props), refs)));

          if (isBrowser) {
            return h('div', {
              id: id,
              className: 'taro_page'
            }, children);
          }

          return h('root', {
            id: id
          }, children);
        }
      }], [{
        key: "getDerivedStateFromError",
        value: function getDerivedStateFromError(error) {
          process.env.NODE_ENV !== 'production' && console.warn(error);
          return {
            hasError: true
          };
        }
      }]);

      return Page;
    }(R.Component);
  };
}

var ReactDOM;

function setReconciler() {
  var getLifecycle = function getLifecycle(instance, lifecycle) {
    lifecycle = lifecycle.replace(/^on(Show|Hide)$/, 'componentDid$1');
    return instance[lifecycle];
  };

  var modifyMpEvent = function modifyMpEvent(event) {
    event.type = event.type.replace(/-/g, '');
  };

  var batchedEventUpdates = function batchedEventUpdates(cb) {
    ReactDOM.unstable_batchedUpdates(cb);
  };

  var mergePageInstance = function mergePageInstance(prev, next) {
    if (!prev || !next) return; // 子组件使用 lifecycle hooks 注册了生命周期后，会存在 prev，里面是注册的生命周期回调。
    // prev 使用 Object.create(null) 创建，H5 的 fast-refresh 可能也会导致存在 prev，要排除这些意外产生的 prev

    if ('constructor' in prev) return;
    Object.keys(prev).forEach(function (item) {
      if (isFunction(next[item])) {
        next[item] = [next[item]].concat(_toConsumableArray(prev[item]));
      } else {
        next[item] = [].concat(_toConsumableArray(next[item] || []), _toConsumableArray(prev[item]));
      }
    });
  };

  hooks$3.getLifecycle = getLifecycle;
  hooks$3.modifyMpEvent = modifyMpEvent;
  hooks$3.batchedEventUpdates = batchedEventUpdates;
  hooks$3.mergePageInstance = mergePageInstance;

  if (process.env.TARO_ENV === 'h5') {
    hooks$3.createPullDownComponent = function (el, _, R, customWrapper) {
      var isReactComponent = isClassComponent(R, el);
      return R.forwardRef(function (props, ref) {
        var newProps = Object.assign({}, props);
        var refs = isReactComponent ? {
          ref: ref
        } : {
          forwardedRef: ref,
          // 兼容 react-redux 7.20.1+
          reactReduxForwardedRef: ref
        };
        return R.createElement(customWrapper || 'taro-pull-to-refresh', null, R.createElement(el, Object.assign(Object.assign({}, newProps), refs)));
      });
    };

    hooks$3.getDOMNode = function (inst) {
      return ReactDOM.findDOMNode(inst);
    };
  }
}

var pageKeyId = incrementId();

function createReactApp(App, react, dom, config) {
  var _a;

  R = react;
  ReactDOM = dom;
  ensure(!!ReactDOM, '构建 React/Nerv 项目请把 process.env.FRAMEWORK 设置为 \'react\'/\'nerv\' ');
  var ref = R.createRef();
  var isReactComponent = isClassComponent(R, App);
  setReconciler();

  var AppWrapper = /*#__PURE__*/function (_R$Component2) {
    _inherits(AppWrapper, _R$Component2);

    var _super10 = _createSuper(AppWrapper);

    function AppWrapper() {
      var _this24;

      _classCallCheck(this, AppWrapper);

      _this24 = _super10.apply(this, arguments); // run createElement() inside the render function to make sure that owner is right

      _this24.pages = [];
      _this24.elements = [];
      return _this24;
    }

    _createClass(AppWrapper, [{
      key: "mount",
      value: function mount(component, id, cb) {
        var key = id + pageKeyId();

        var page = function page() {
          return R.createElement(component, {
            key: key,
            tid: id
          });
        };

        this.pages.push(page);
        this.forceUpdate(cb);
      }
    }, {
      key: "unmount",
      value: function unmount(id, cb) {
        for (var i = 0; i < this.elements.length; i++) {
          var element = this.elements[i];

          if (element.props.tid === id) {
            this.elements.splice(i, 1);
            break;
          }
        }

        this.forceUpdate(cb);
      }
    }, {
      key: "render",
      value: function render() {
        while (this.pages.length > 0) {
          var page = this.pages.pop();
          this.elements.push(page());
        }

        var props = null;

        if (isReactComponent) {
          props = {
            ref: ref
          };
        }

        return R.createElement(App, props, isBrowser ? R.createElement('div', null, this.elements.slice()) : this.elements.slice());
      }
    }]);

    return AppWrapper;
  }(R.Component);

  var wrapper;

  if (!isBrowser) {
    wrapper = (_a = ReactDOM.render) === null || _a === void 0 ? void 0 : _a.call(ReactDOM, R.createElement(AppWrapper), document$2.getElementById('app'));
  }

  var app = Object.create({
    render: function render(cb) {
      wrapper.forceUpdate(cb);
    },
    mount: function mount(component, id, cb) {
      var page = connectReactPage(R, id)(component);
      wrapper.mount(page, id, cb);
    },
    unmount: function unmount(id, cb) {
      wrapper.unmount(id, cb);
    }
  }, {
    config: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: config
    },
    onLaunch: {
      enumerable: true,
      writable: true,
      value: function value(options) {
        var _this25 = this;

        var _a;

        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);

        if (isBrowser) {
          // 由于 H5 路由初始化的时候会清除 app 下的 dom 元素，所以需要在路由初始化后执行 render
          wrapper = (_a = ReactDOM.render) === null || _a === void 0 ? void 0 : _a.call(ReactDOM, R.createElement(AppWrapper), document$2.getElementById((config === null || config === void 0 ? void 0 : config.appId) || 'app'));
        }

        var app = ref.current; // For taroize
        // 把 App Class 上挂载的额外属性同步到全局 app 对象中

        if (app === null || app === void 0 ? void 0 : app.taroGlobalData) {
          var globalData = app.taroGlobalData;
          var keys = Object.keys(globalData);
          var descriptors = Object.getOwnPropertyDescriptors(globalData);
          keys.forEach(function (key) {
            Object.defineProperty(_this25, key, {
              configurable: true,
              enumerable: true,
              get: function get() {
                return globalData[key];
              },
              set: function set(value) {
                globalData[key] = value;
              }
            });
          });
          Object.defineProperties(this, descriptors);
        }

        this.$app = app;

        if (app != null && isFunction(app.onLaunch)) {
          app.onLaunch(options);
        }
      }
    },
    onShow: {
      enumerable: true,
      writable: true,
      value: function value(options) {
        var app = ref.current;
        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);

        if (app != null && isFunction(app.componentDidShow)) {
          app.componentDidShow(options);
        } // app useDidShow


        triggerAppHook('onShow');
      }
    },
    onHide: {
      enumerable: true,
      writable: true,
      value: function value(options) {
        var app = ref.current;

        if (app != null && isFunction(app.componentDidHide)) {
          app.componentDidHide(options);
        } // app useDidHide


        triggerAppHook('onHide');
      }
    },
    onPageNotFound: {
      enumerable: true,
      writable: true,
      value: function value(res) {
        var app = ref.current;

        if (app != null && isFunction(app.onPageNotFound)) {
          app.onPageNotFound(res);
        }
      }
    }
  });

  function triggerAppHook(lifecycle) {
    var instance = getPageInstance(HOOKS_APP_ID);

    if (instance) {
      var _app = ref.current;
      var func = hooks$3.getLifecycle(instance, lifecycle);

      if (Array.isArray(func)) {
        func.forEach(function (cb) {
          return cb.apply(_app);
        });
      }
    }
  }

  Current.app = app;
  return Current.app;
}

var getNativeCompId = incrementId();

function initNativeComponentEntry(R, ReactDOM) {
  var NativeComponentWrapper = /*#__PURE__*/function (_R$Component3) {
    _inherits(NativeComponentWrapper, _R$Component3);

    var _super11 = _createSuper(NativeComponentWrapper);

    function NativeComponentWrapper() {
      var _this26;

      _classCallCheck(this, NativeComponentWrapper);

      _this26 = _super11.apply(this, arguments);
      _this26.root = R.createRef();
      _this26.ctx = _this26.props.getCtx();
      return _this26;
    }

    _createClass(NativeComponentWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.ctx.component = this;
        var rootElement = this.root.current;
        rootElement.ctx = this.ctx;
        rootElement.performUpdate(true);
      }
    }, {
      key: "render",
      value: function render() {
        return R.createElement('root', {
          ref: this.root
        }, this.props.renderComponent(this.ctx));
      }
    }]);

    return NativeComponentWrapper;
  }(R.Component);

  var Entry = /*#__PURE__*/function (_R$Component4) {
    _inherits(Entry, _R$Component4);

    var _super12 = _createSuper(Entry);

    function Entry() {
      var _this27;

      _classCallCheck(this, Entry);

      _this27 = _super12.apply(this, arguments);
      _this27.state = {
        components: []
      };
      return _this27;
    }

    _createClass(Entry, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        Current.app = this;
      }
    }, {
      key: "mount",
      value: function mount(Component, compId, getCtx) {
        var isReactComponent = isClassComponent(R, Component);

        var inject = function inject(node) {
          return node && injectPageInstance(node, compId);
        };

        var refs = isReactComponent ? {
          ref: inject
        } : {
          forwardedRef: inject,
          reactReduxForwardedRef: inject
        };
        var item = {
          compId: compId,
          element: R.createElement(NativeComponentWrapper, {
            key: compId,
            getCtx: getCtx,
            renderComponent: function renderComponent(ctx) {
              return R.createElement(Component, Object.assign(Object.assign({}, (ctx.data || (ctx.data = {})).props), refs));
            }
          })
        };
        this.setState({
          components: [].concat(_toConsumableArray(this.state.components), [item])
        });
      }
    }, {
      key: "unmount",
      value: function unmount(compId) {
        var components = this.state.components;
        var index = components.findIndex(function (item) {
          return item.compId === compId;
        });
        var next = [].concat(_toConsumableArray(components.slice(0, index)), _toConsumableArray(components.slice(index + 1)));
        this.setState({
          components: next
        });
      }
    }, {
      key: "render",
      value: function render() {
        var components = this.state.components;
        return components.map(function (_ref4) {
          var element = _ref4.element;
          return element;
        });
      }
    }]);

    return Entry;
  }(R.Component);

  setReconciler();
  var app = document$2.getElementById('app');
  ReactDOM.render(R.createElement(Entry, {}), app);
}

function createNativeComponentConfig(Component, react, reactdom, componentConfig) {
  R = react;
  ReactDOM = reactdom;
  setReconciler();
  var config = {
    properties: {
      props: {
        type: null,
        value: null,
        observer: function observer(_newVal, oldVal) {
          oldVal && this.component.forceUpdate();
        }
      }
    },
    created: function created() {
      if (!Current.app) {
        initNativeComponentEntry(R, ReactDOM);
      }
    },
    attached: function attached() {
      var _this28 = this;

      setCurrent();
      this.compId = getNativeCompId();
      this.config = componentConfig;
      Current.app.mount(Component, this.compId, function () {
        return _this28;
      });
    },
    ready: function ready() {
      safeExecute(this.compId, 'onReady');
    },
    detached: function detached() {
      Current.app.unmount(this.compId);
    },
    pageLifetimes: {
      show: function show() {
        safeExecute(this.compId, 'onShow');
      },
      hide: function hide() {
        safeExecute(this.compId, 'onHide');
      }
    },
    methods: {
      eh: eventHandler
    }
  };

  function setCurrent() {
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    if (Current.page === currentPage) return;
    Current.page = currentPage;
    var route = currentPage.route || currentPage.__route__;
    var router = {
      params: currentPage.options || {},
      path: addLeadingSlash(route),
      onReady: '',
      onHide: '',
      onShow: ''
    };
    Current.router = router;

    if (!currentPage.options) {
      // 例如在微信小程序中，页面 options 的设置时机比组件 attached 慢
      Object.defineProperty(currentPage, 'options', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return this._optionsValue;
        },
        set: function set(value) {
          router.params = value;
          this._optionsValue = value;
        }
      });
    }
  }

  return config;
}

function connectVuePage(Vue, id) {
  return function (component) {
    var injectedPage = Vue.extend({
      props: {
        tid: String
      },
      mixins: [component, {
        created: function created() {
          injectPageInstance(this, id);
        }
      }]
    });
    var options = {
      render: function render(h) {
        return h(isBrowser ? 'div' : 'root', {
          attrs: {
            id: id,
            class: isBrowser ? 'taro_page' : ''
          }
        }, [h(injectedPage, {
          props: {
            tid: id
          }
        })]);
      }
    };
    return options;
  };
}

function setReconciler$1() {
  var hooks = container$1.get(SERVICE_IDENTIFIER.Hooks);

  var onRemoveAttribute = function onRemoveAttribute(dom, qualifiedName) {
    // 处理原因: https://github.com/NervJS/taro/pull/5990
    var props = dom.props;

    if (!props.hasOwnProperty(qualifiedName) || isBoolean(props[qualifiedName])) {
      dom.setAttribute(qualifiedName, false);
      return true;
    }
  };

  var getLifecycle = function getLifecycle(instance, lifecycle) {
    return instance.$options[lifecycle];
  };

  hooks.onRemoveAttribute = onRemoveAttribute;
  hooks.getLifecycle = getLifecycle;

  if (process.env.TARO_ENV === 'h5') {
    hooks.createPullDownComponent = function (el, path, vue) {
      var injectedPage = vue.extend({
        props: {
          tid: String
        },
        mixins: [el, {
          created: function created() {
            injectPageInstance(this, path);
          }
        }]
      });
      var options = {
        name: 'PullToRefresh',
        render: function render(h) {
          return h('taro-pull-to-refresh', {
            class: ['hydrated']
          }, [h(injectedPage, this.$slots.default)]);
        }
      };
      return options;
    };

    hooks.getDOMNode = function (el) {
      return el.$el;
    };
  }
}

var Vue;

function createVueApp(App, vue, config) {
  Vue = vue;
  ensure(!!Vue, '构建 Vue 项目请把 process.env.FRAMEWORK 设置为 \'vue\'');
  setReconciler$1();
  Vue.config.getTagNamespace = noop;
  var elements = [];
  var pages = [];
  var appInstance;
  var wrapper = new Vue({
    render: function render(h) {
      while (pages.length > 0) {
        var page = pages.pop();
        elements.push(page(h));
      }

      return h(App, {
        ref: 'app'
      }, elements.slice());
    },
    methods: {
      mount: function mount(component, id, cb) {
        pages.push(function (h) {
          return h(component, {
            key: id
          });
        });
        this.updateSync(cb);
      },
      updateSync: function updateSync(cb) {
        this._update(this._render(), false);

        this.$children.forEach(function (child) {
          return child._update(child._render(), false);
        });
        cb();
      },
      unmount: function unmount(id, cb) {
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          if (element.key === id) {
            elements.splice(i, 1);
            break;
          }
        }

        this.updateSync(cb);
      }
    }
  });

  if (!isBrowser) {
    wrapper.$mount(document$2.getElementById('app'));
  }

  var app = Object.create({
    mount: function mount(component, id, cb) {
      var page = connectVuePage(Vue, id)(component);
      wrapper.mount(page, id, cb);
    },
    unmount: function unmount(id, cb) {
      wrapper.unmount(id, cb);
    }
  }, {
    config: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: config
    },
    onLaunch: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);

        if (isBrowser) {
          // 由于 H5 路由初始化的时候会清除 app 下的 dom 元素，所以需要在路由初始化后再执行 render
          wrapper.$mount(document$2.getElementById((config === null || config === void 0 ? void 0 : config.appId) || 'app'));
        }

        appInstance = wrapper.$refs.app;

        if (appInstance != null && isFunction(appInstance.$options.onLaunch)) {
          appInstance.$options.onLaunch.call(appInstance, options);
        }
      }
    },
    onShow: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);

        if (appInstance != null && isFunction(appInstance.$options.onShow)) {
          appInstance.$options.onShow.call(appInstance, options);
        }
      }
    },
    onHide: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        if (appInstance != null && isFunction(appInstance.$options.onHide)) {
          appInstance.$options.onHide.call(appInstance, options);
        }
      }
    }
  });
  Current.app = app;
  return Current.app;
}

function createVue3Page(h, id) {
  return function (component) {
    var _a;

    var inject = {
      props: {
        tid: String
      },
      created: function created() {
        injectPageInstance(this, id);
      }
    };

    if (isArray(component.mixins)) {
      var mixins = component.mixins;
      var idx = mixins.length - 1;

      if (!((_a = mixins[idx].props) === null || _a === void 0 ? void 0 : _a.tid)) {
        // mixins 里还没注入过，直接推入数组
        component.mixins.push(inject);
      } else {
        // mixins 里已经注入过，代替前者
        component.mixins[idx] = inject;
      }
    } else {
      component.mixins = [inject];
    }

    return h(isBrowser ? 'div' : 'root', {
      key: id,
      id: id,
      class: isBrowser ? 'taro_page' : ''
    }, [h(Object.assign({}, component), {
      tid: id
    })]);
  };
}

function setReconciler$2() {
  var hooks = container$1.get(SERVICE_IDENTIFIER.Hooks);

  var getLifecycle = function getLifecycle(instance, lifecycle) {
    return instance.$options[lifecycle];
  };

  var modifyMpEvent = function modifyMpEvent(event) {
    event.type = event.type.replace(/-/g, '');
  };

  hooks.getLifecycle = getLifecycle;
  hooks.modifyMpEvent = modifyMpEvent;

  if (process.env.TARO_ENV === 'h5') {
    hooks.createPullDownComponent = function (component, path, h) {
      var inject = {
        props: {
          tid: String
        },
        created: function created() {
          injectPageInstance(this, path);
        }
      };
      component.mixins = isArray(component.mixins) ? component.mixins.push(inject) : [inject];
      return {
        render: function render() {
          return h('taro-pull-to-refresh', {
            class: 'hydrated'
          }, [h(component, this.$slots.default)]);
        }
      };
    };

    hooks.getDOMNode = function (el) {
      return el.$el;
    };
  }
}

function createVue3App(app, h, config) {
  var pages = [];
  var appInstance;
  ensure(!isFunction(app._component), '入口组件不支持使用函数式组件');
  setReconciler$2();

  app._component.render = function () {
    return pages.slice();
  };

  if (!isBrowser) {
    appInstance = app.mount('#app');
  }

  var appConfig = Object.create({
    mount: function mount(component, id, cb) {
      var page = createVue3Page(h, id)(component);
      pages.push(page);
      this.updateAppInstance(cb);
    },
    unmount: function unmount(id, cb) {
      pages = pages.filter(function (page) {
        return page.key !== id;
      });
      this.updateAppInstance(cb);
    },
    updateAppInstance: function updateAppInstance(cb) {
      appInstance.$forceUpdate();
      appInstance.$nextTick(cb);
    }
  }, {
    config: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: config
    },
    onLaunch: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        var _this29 = this;

        var _a;

        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);

        if (isBrowser) {
          appInstance = app.mount("#".concat(config.appId || 'app'));
        } // 把 App Class 上挂载的额外属性同步到全局 app 对象中
        // eslint-disable-next-line dot-notation


        if (app['taroGlobalData']) {
          // eslint-disable-next-line dot-notation
          var globalData = app['taroGlobalData'];
          var keys = Object.keys(globalData);
          var descriptors = Object.getOwnPropertyDescriptors(globalData);
          keys.forEach(function (key) {
            Object.defineProperty(_this29, key, {
              configurable: true,
              enumerable: true,
              get: function get() {
                return globalData[key];
              },
              set: function set(value) {
                globalData[key] = value;
              }
            });
          });
          Object.defineProperties(this, descriptors);
        }

        var onLaunch = (_a = appInstance === null || appInstance === void 0 ? void 0 : appInstance.$options) === null || _a === void 0 ? void 0 : _a.onLaunch;
        isFunction(onLaunch) && onLaunch.call(appInstance, options);
      }
    },
    onShow: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        var _a;

        Current.router = Object.assign({
          params: options === null || options === void 0 ? void 0 : options.query
        }, options);
        var onShow = (_a = appInstance === null || appInstance === void 0 ? void 0 : appInstance.$options) === null || _a === void 0 ? void 0 : _a.onShow;
        isFunction(onShow) && onShow.call(appInstance, options);
      }
    },
    onHide: {
      writable: true,
      enumerable: true,
      value: function value(options) {
        var _a;

        var onHide = (_a = appInstance === null || appInstance === void 0 ? void 0 : appInstance.$options) === null || _a === void 0 ? void 0 : _a.onHide;
        isFunction(onHide) && onHide.call(appInstance, options);
      }
    }
  });
  Current.app = appConfig;
  return Current.app;
}

var taroHooks = function taroHooks(lifecycle) {
  return function (fn) {
    var id = R.useContext(PageContext) || HOOKS_APP_ID; // hold fn ref and keep up to date

    var fnRef = R.useRef(fn);
    if (fnRef.current !== fn) fnRef.current = fn;
    R.useLayoutEffect(function () {
      var inst = getPageInstance(id);
      var first = false;

      if (inst == null) {
        first = true;
        inst = Object.create(null);
      }

      inst = inst; // callback is immutable but inner function is up to date

      var callback = function callback() {
        return fnRef.current.apply(fnRef, arguments);
      };

      if (isFunction(inst[lifecycle])) {
        inst[lifecycle] = [inst[lifecycle], callback];
      } else {
        inst[lifecycle] = [].concat(_toConsumableArray(inst[lifecycle] || []), [callback]);
      }

      if (first) {
        injectPageInstance(inst, id);
      }

      return function () {
        var inst = getPageInstance(id);
        var list = inst[lifecycle];

        if (list === callback) {
          inst[lifecycle] = undefined;
        } else if (isArray(list)) {
          inst[lifecycle] = list.filter(function (item) {
            return item !== callback;
          });
        }
      };
    }, []);
  };
};

var useDidShow = taroHooks('componentDidShow');
var useDidHide = taroHooks('componentDidHide');
var usePullDownRefresh = taroHooks('onPullDownRefresh');
var useReachBottom = taroHooks('onReachBottom');
var usePageScroll = taroHooks('onPageScroll');
var useResize = taroHooks('onResize');
var useShareAppMessage = taroHooks('onShareAppMessage');
var useTabItemTap = taroHooks('onTabItemTap');
var useTitleClick = taroHooks('onTitleClick');
var useOptionMenuClick = taroHooks('onOptionMenuClick');
var usePullIntercept = taroHooks('onPullIntercept');
var useShareTimeline = taroHooks('onShareTimeline');
var useAddToFavorites = taroHooks('onAddToFavorites');
var useReady = taroHooks('onReady');

var useRouter = function useRouter() {
  var dynamic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return dynamic ? Current.router : R.useMemo(function () {
    return Current.router;
  }, []);
};

var useScope = function useScope() {
  return undefined;
};

function removeLeadingSlash(path) {
  if (path == null) {
    return '';
  }

  return path.charAt(0) === '/' ? path.slice(1) : path;
}

var nextTick = function nextTick(cb, ctx) {
  var _a, _b, _c;

  var router = Current.router;

  var timerFunc = function timerFunc() {
    setTimeout(function () {
      ctx ? cb.call(ctx) : cb();
    }, 1);
  };

  if (router !== null) {
    var pageElement = null;
    var path = getPath(removeLeadingSlash(router.path), router.params);
    pageElement = document$2.getElementById(path);

    if (pageElement === null || pageElement === void 0 ? void 0 : pageElement.pendingUpdate) {
      if (isBrowser) {
        // eslint-disable-next-line dot-notation
        (_c = (_b = (_a = pageElement.firstChild) === null || _a === void 0 ? void 0 : _a['componentOnReady']) === null || _b === void 0 ? void 0 : _b.call(_a).then(function () {
          timerFunc();
        })) !== null && _c !== void 0 ? _c : timerFunc();
      } else {
        pageElement.enqueueUpdateCallback(cb, ctx);
      }
    } else {
      timerFunc();
    }
  } else {
    timerFunc();
  }
};

var runtime_esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Current: Current,
	get ElementNames () { return ElementNames; },
	Events: Events,
	FormElement: FormElement,
	SERVICE_IDENTIFIER: SERVICE_IDENTIFIER,
	SVGElement: SVGElement,
	Style: Style,
	get TaroElement () { return TaroElement; },
	TaroEvent: TaroEvent,
	get TaroNode () { return TaroNode; },
	get TaroRootElement () { return TaroRootElement; },
	get TaroText () { return TaroText; },
	cancelAnimationFrame: caf,
	connectReactPage: connectReactPage,
	connectVuePage: connectVuePage,
	container: container$1,
	createComponentConfig: createComponentConfig,
	createDocument: createDocument,
	createEvent: createEvent,
	createNativeComponentConfig: createNativeComponentConfig,
	createPageConfig: createPageConfig,
	createReactApp: createReactApp,
	createRecursiveComponentConfig: createRecursiveComponentConfig,
	createVue3App: createVue3App,
	createVueApp: createVueApp,
	document: document$2,
	eventCenter: eventCenter,
	getComputedStyle: getComputedStyle,
	getCurrentInstance: getCurrentInstance,
	hydrate: hydrate,
	injectPageInstance: injectPageInstance,
	navigator: navigator$1,
	nextTick: nextTick,
	get now () { return now; },
	options: options,
	processPluginHooks: processPluginHooks,
	requestAnimationFrame: raf,
	stringify: stringify,
	useAddToFavorites: useAddToFavorites,
	useDidHide: useDidHide,
	useDidShow: useDidShow,
	useOptionMenuClick: useOptionMenuClick,
	usePageScroll: usePageScroll,
	usePullDownRefresh: usePullDownRefresh,
	usePullIntercept: usePullIntercept,
	useReachBottom: useReachBottom,
	useReady: useReady,
	useResize: useResize,
	useRouter: useRouter,
	useScope: useScope,
	useShareAppMessage: useShareAppMessage,
	useShareTimeline: useShareTimeline,
	useTabItemTap: useTabItemTap,
	useTitleClick: useTitleClick,
	window: window$1
});

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.assign = function (target) {
    // .length of function is 2
    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }

    return to;
  };
}

if (typeof Object.defineProperties !== 'function') {
  Object.defineProperties = function (obj, properties) {
    function convertToDescriptor(desc) {
      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      function isCallable(v) {
        // NB: modify as necessary if other values than functions are callable.
        return typeof v === 'function';
      }

      if (_typeof(desc) !== 'object' || desc === null) {
        throw new TypeError('bad desc');
      }

      var d = {};
      if (hasProperty(desc, 'enumerable')) d.enumerable = !!desc.enumerable;

      if (hasProperty(desc, 'configurable')) {
        d.configurable = !!desc.configurable;
      }

      if (hasProperty(desc, 'value')) d.value = desc.value;
      if (hasProperty(desc, 'writable')) d.writable = !!desc.writable;

      if (hasProperty(desc, 'get')) {
        var g = desc.get;

        if (!isCallable(g) && typeof g !== 'undefined') {
          throw new TypeError('bad get');
        }

        d.get = g;
      }

      if (hasProperty(desc, 'set')) {
        var s = desc.set;

        if (!isCallable(s) && typeof s !== 'undefined') {
          throw new TypeError('bad set');
        }

        d.set = s;
      }

      if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
        throw new TypeError('identity-confused descriptor');
      }

      return d;
    }

    if (_typeof(obj) !== 'object' || obj === null) throw new TypeError('bad obj');
    properties = Object(properties);
    var keys = Object.keys(properties);
    var descs = [];

    for (var i = 0; i < keys.length; i++) {
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
    }

    for (var _i = 0; _i < descs.length; _i++) {
      Object.defineProperty(obj, descs[_i][0], descs[_i][1]);
    }

    return obj;
  };
}

var ENV_TYPE = {
  WEAPP: 'WEAPP',
  WEB: 'WEB',
  RN: 'RN',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT',
  QQ: 'QQ',
  JD: 'JD',
  KWAI: 'KWAI'
};
var _env = null; // 一个taro项目肯定运行同样的环境

function getEnv() {
  if (_env) return _env;

  if (typeof jd !== 'undefined' && jd.getSystemInfo) {
    _env = ENV_TYPE.JD;
    return ENV_TYPE.JD;
  }

  if (typeof qq !== 'undefined' && qq.getSystemInfo) {
    _env = ENV_TYPE.QQ;
    return ENV_TYPE.QQ;
  }

  if (typeof tt !== 'undefined' && tt.getSystemInfo) {
    _env = ENV_TYPE.TT;
    return ENV_TYPE.TT;
  }

  if (typeof wx !== 'undefined' && wx.getSystemInfo) {
    _env = ENV_TYPE.WEAPP;
    return ENV_TYPE.WEAPP;
  }

  if (typeof swan !== 'undefined' && swan.getSystemInfo) {
    _env = ENV_TYPE.SWAN;
    return ENV_TYPE.SWAN;
  }

  if (typeof my !== 'undefined' && my.getSystemInfo) {
    _env = ENV_TYPE.ALIPAY;
    return ENV_TYPE.ALIPAY;
  }

  if (typeof ks !== 'undefined' && ks.getSystemInfo) {
    _env = ENV_TYPE.KWAI;
    return ENV_TYPE.KWAI;
  }

  if (typeof global !== 'undefined' && global.__fbGenNativeModule) {
    _env = ENV_TYPE.RN;
    return ENV_TYPE.RN;
  }

  if (typeof window !== 'undefined') {
    _env = ENV_TYPE.WEB;
    return ENV_TYPE.WEB;
  }

  return 'Unknown environment';
}

var Chain = /*#__PURE__*/function () {
  function Chain(requestParams) {
    var interceptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Chain);

    this.index = index;
    this.requestParams = requestParams;
    this.interceptors = interceptors;
  }

  _createClass(Chain, [{
    key: "proceed",
    value: function proceed(requestParams) {
      this.requestParams = requestParams;

      if (this.index >= this.interceptors.length) {
        throw new Error('chain 参数错误, 请勿直接修改 request.chain');
      }

      var nextInterceptor = this._getNextInterceptor();

      var nextChain = this._getNextChain();

      var p = nextInterceptor(nextChain);
      var res = p.catch(function (err) {
        return Promise.reject(err);
      });
      if (typeof p.abort === 'function') res.abort = p.abort;
      return res;
    }
  }, {
    key: "_getNextInterceptor",
    value: function _getNextInterceptor() {
      return this.interceptors[this.index];
    }
  }, {
    key: "_getNextChain",
    value: function _getNextChain() {
      return new Chain(this.requestParams, this.interceptors, this.index + 1);
    }
  }]);

  return Chain;
}();

var Link = /*#__PURE__*/function () {
  function Link(interceptor) {
    _classCallCheck(this, Link);

    this.taroInterceptor = interceptor;
    this.chain = new Chain();
  }

  _createClass(Link, [{
    key: "request",
    value: function request(requestParams) {
      var _this = this;

      this.chain.interceptors = this.chain.interceptors.filter(function (interceptor) {
        return interceptor !== _this.taroInterceptor;
      });
      this.chain.interceptors.push(this.taroInterceptor);
      return this.chain.proceed(_objectSpread({}, requestParams));
    }
  }, {
    key: "addInterceptor",
    value: function addInterceptor(interceptor) {
      this.chain.interceptors.push(interceptor);
    }
  }, {
    key: "cleanInterceptors",
    value: function cleanInterceptors() {
      this.chain = new Chain();
    }
  }]);

  return Link;
}();

function timeoutInterceptor(chain) {
  var requestParams = chain.requestParams;
  var p;
  var res = new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      timeout = null;
      reject(new Error('网络链接超时,请稍后再试！'));
    }, requestParams && requestParams.timeout || 60000);
    p = chain.proceed(requestParams);
    p.then(function (res) {
      if (!timeout) return;
      clearTimeout(timeout);
      resolve(res);
    }).catch(function (err) {
      timeout && clearTimeout(timeout);
      reject(err);
    });
  });
  if (p !== undefined && typeof p.abort === 'function') res.abort = p.abort;
  return res;
}

function logInterceptor(chain) {
  var requestParams = chain.requestParams;
  var method = requestParams.method,
      data = requestParams.data,
      url = requestParams.url; // eslint-disable-next-line no-console

  console.log("http ".concat(method || 'GET', " --> ").concat(url, " data: "), data);
  var p = chain.proceed(requestParams);
  var res = p.then(function (res) {
    // eslint-disable-next-line no-console
    console.log("http <-- ".concat(url, " result:"), res);
    return res;
  });
  if (typeof p.abort === 'function') res.abort = p.abort;
  return res;
}

var interceptors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  timeoutInterceptor: timeoutInterceptor,
  logInterceptor: logInterceptor
});

function Behavior(options) {
  return options;
}

function getPreload(current) {
  return function (key, val) {
    if (_typeof(key) === 'object') {
      current.preloadData = key;
    } else if (key !== undefined && val !== undefined) {
      current.preloadData = _defineProperty({}, key, val);
    }
  };
}

function getInitPxTransform(taro) {
  return function (config) {
    var _config$designWidth = config.designWidth,
        designWidth = _config$designWidth === void 0 ? 750 : _config$designWidth,
        _config$deviceRatio = config.deviceRatio,
        deviceRatio = _config$deviceRatio === void 0 ? {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2
    } : _config$deviceRatio;
    taro.config = taro.config || {};
    taro.config.designWidth = designWidth;
    taro.config.deviceRatio = deviceRatio;
  };
}

function getPxTransform(taro) {
  return function (size) {
    var _ref = taro.config || {},
        _ref$designWidth = _ref.designWidth,
        designWidth = _ref$designWidth === void 0 ? 750 : _ref$designWidth,
        _ref$deviceRatio = _ref.deviceRatio,
        deviceRatio = _ref$deviceRatio === void 0 ? {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2
    } : _ref$deviceRatio;

    if (!(designWidth in deviceRatio)) {
      throw new Error("deviceRatio \u914D\u7F6E\u4E2D\u4E0D\u5B58\u5728 ".concat(designWidth, " \u7684\u8BBE\u7F6E\uFF01"));
    }

    return parseInt(size, 10) * deviceRatio[designWidth] + 'rpx';
  };
}
/* eslint-disable camelcase */


var Taro = {
  Behavior: Behavior,
  getEnv: getEnv,
  ENV_TYPE: ENV_TYPE,
  Link: Link,
  interceptors: interceptors,
  Current: Current,
  getCurrentInstance: getCurrentInstance,
  options: options,
  nextTick: nextTick,
  eventCenter: eventCenter,
  Events: Events,
  useDidShow: useDidShow,
  useDidHide: useDidHide,
  usePullDownRefresh: usePullDownRefresh,
  useReachBottom: useReachBottom,
  usePageScroll: usePageScroll,
  useResize: useResize,
  useShareAppMessage: useShareAppMessage,
  useTabItemTap: useTabItemTap,
  useTitleClick: useTitleClick,
  useOptionMenuClick: useOptionMenuClick,
  usePullIntercept: usePullIntercept,
  useShareTimeline: useShareTimeline,
  useAddToFavorites: useAddToFavorites,
  useReady: useReady,
  useRouter: useRouter,
  getInitPxTransform: getInitPxTransform
};
Taro.initPxTransform = getInitPxTransform(Taro);
Taro.preload = getPreload(Current);
Taro.pxTransform = getPxTransform(Taro);

var taro_1 = createCommonjsModule(function (module) {
  var container = runtime_esm.container,
      SERVICE_IDENTIFIER = runtime_esm.SERVICE_IDENTIFIER;
  var taro = Taro.default;
  var hooks = container.get(SERVICE_IDENTIFIER.Hooks);

  if (typeof hooks.initNativeApi === 'function') {
    hooks.initNativeApi(taro);
  }

  module.exports = taro;
  module.exports.default = module.exports;
});

var shams = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (_typeof(Symbol.iterator) === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax, no-unreachable-loop


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;

var hasSymbols = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (_typeof(origSymbol('foo')) !== 'symbol') {
    return false;
  }

  if (_typeof(Symbol('bar')) !== 'symbol') {
    return false;
  }

  return shams();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

var implementation = function bind(that) {
  var target = this;

  if (typeof target !== 'function' || toStr.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }

  var args = slice.call(arguments, 1);
  var bound;

  var binder = function binder() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)));

      if (Object(result) === result) {
        return result;
      }

      return this;
    } else {
      return target.apply(that, args.concat(slice.call(arguments)));
    }
  };

  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];

  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i);
  }

  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

  if (target.prototype) {
    var Empty = function Empty() {};

    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }

  return bound;
};

var functionBind = Function.prototype.bind || implementation;

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError; // eslint-disable-next-line consistent-return

var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  } catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;

if ($gOPD) {
  try {
    $gOPD({}, '');
  } catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function throwTypeError() {
  throw new $TypeError();
};

var ThrowTypeError = $gOPD ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here

    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$1 = hasSymbols();

var getProto = Object.getPrototypeOf || function (x) {
  return x.__proto__;
}; // eslint-disable-line no-proto


var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
  '%AsyncFromSyncIteratorPrototype%': undefined$1,
  '%AsyncFunction%': needsEval,
  '%AsyncGenerator%': needsEval,
  '%AsyncGeneratorFunction%': needsEval,
  '%AsyncIteratorPrototype%': needsEval,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': needsEval,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  '%JSON%': (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' ? JSON : undefined$1,
  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
  '%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

var doEval = function doEval(name) {
  var value;

  if (name === '%AsyncFunction%') {
    value = getEvalledConstructor('async function () {}');
  } else if (name === '%GeneratorFunction%') {
    value = getEvalledConstructor('function* () {}');
  } else if (name === '%AsyncGeneratorFunction%') {
    value = getEvalledConstructor('async function* () {}');
  } else if (name === '%AsyncGenerator%') {
    var fn = doEval('%AsyncGeneratorFunction%');

    if (fn) {
      value = fn.prototype;
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    var gen = doEval('%AsyncGenerator%');

    if (gen) {
      value = getProto(gen.prototype);
    }
  }

  INTRINSICS[name] = value;
  return value;
};

var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype']
};
var $concat = functionBind.call(Function.call, Array.prototype.concat);
var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
var $replace = functionBind.call(Function.call, String.prototype.replace);
var $strSlice = functionBind.call(Function.call, String.prototype.slice);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

var rePropName$1 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar$1 = /\\(\\)?/g;
/** Used to match backslashes in property paths. */

var stringToPath$1 = function stringToPath(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);

  if (first === '%' && last !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  } else if (last === '%' && first !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  }

  var result = [];
  $replace(string, rePropName$1, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar$1, '$1') : number || match;
  });
  return result;
};
/* end adaptation */


var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name;
  var alias;

  if (src(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }

  if (src(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];

    if (value === needsEval) {
      value = doEval(intrinsicName);
    }

    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }

    return {
      alias: alias,
      name: intrinsicName,
      value: value
    };
  }

  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError('intrinsic name must be a non-empty string');
  }

  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }

  var parts = stringToPath$1(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;

  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }

  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);

    if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
      throw new $SyntaxError('property names with quotes must have matching quotes');
    }

    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }

    intrinsicBaseName += '.' + part;
    intrinsicRealName = '%' + intrinsicBaseName + '%';

    if (src(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
        }

        return void undefined$1;
      }

      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc; // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.

        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = src(value, part);
        value = value[part];
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }

  return value;
};

var callBind = createCommonjsModule(function (module) {

  var $apply = getIntrinsic('%Function.prototype.apply%');
  var $call = getIntrinsic('%Function.prototype.call%');
  var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);
  var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
  var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
  var $max = getIntrinsic('%Math.max%');

  if ($defineProperty) {
    try {
      $defineProperty({}, 'a', {
        value: 1
      });
    } catch (e) {
      // IE 8 has a broken defineProperty
      $defineProperty = null;
    }
  }

  module.exports = function callBind(originalFunction) {
    var func = $reflectApply(functionBind, $call, arguments);

    if ($gOPD && $defineProperty) {
      var desc = $gOPD(func, 'length');

      if (desc.configurable) {
        // original length, plus the receiver, minus any additional arguments (after the receiver)
        $defineProperty(func, 'length', {
          value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
        });
      }
    }

    return func;
  };

  var applyBind = function applyBind() {
    return $reflectApply(functionBind, $apply, arguments);
  };

  if ($defineProperty) {
    $defineProperty(module.exports, 'apply', {
      value: applyBind
    });
  } else {
    module.exports.apply = applyBind;
  }
});
var callBind_1 = callBind.apply;

var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = getIntrinsic(name, !!allowMissing);

  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
    return callBind(intrinsic);
  }

  return intrinsic;
};

var isBuffer = function isBuffer(arg) {
  return arg instanceof Buffer;
};

var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function TempCtor() {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
});

var inherits$1 = createCommonjsModule(function (module) {
  try {
    var util$1 = util;
    if (typeof util$1.inherits !== 'function') throw '';
    module.exports = util$1.inherits;
  } catch (e) {
    module.exports = inherits_browser;
  }
});

var util = createCommonjsModule(function (module, exports) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};

    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }

    return descriptors;
  };

  var formatRegExp = /%[sdj%]/g;

  exports.format = function (f) {
    if (!isString(f)) {
      var objects = [];

      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }

      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') return '%';
      if (i >= len) return x;

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

        default:
          return x;
      }
    });

    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }

    return str;
  }; // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.


  exports.deprecate = function (fn, msg) {
    if (typeof process !== 'undefined' && process.noDeprecation === true) {
      return fn;
    } // Allow for deprecating things in the process of starting up.


    if (typeof process === 'undefined') {
      return function () {
        return exports.deprecate(fn, msg).apply(this, arguments);
      };
    }

    var warned = false;

    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }

        warned = true;
      }

      return fn.apply(this, arguments);
    }

    return deprecated;
  };

  var debugs = {};
  var debugEnviron;

  exports.debuglog = function (set) {
    if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
    set = set.toUpperCase();

    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = process.pid;

        debugs[set] = function () {
          var msg = exports.format.apply(exports, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function () {};
      }
    }

    return debugs[set];
  };
  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */

  /* legacy: obj, showHidden, depth, colors*/


  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    }; // legacy...

    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];

    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      exports._extend(ctx, opts);
    } // set default options


    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

  inspect.colors = {
    'bold': [1, 22],
    'italic': [3, 23],
    'underline': [4, 24],
    'inverse': [7, 27],
    'white': [37, 39],
    'grey': [90, 39],
    'black': [30, 39],
    'blue': [34, 39],
    'cyan': [36, 39],
    'green': [32, 39],
    'magenta': [35, 39],
    'red': [31, 39],
    'yellow': [33, 39]
  }; // Don't use 'blue' not visible on cmd.exe

  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };

  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }

  function stylizeNoColor(str, styleType) {
    return str;
  }

  function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
      hash[val] = true;
    });
    return hash;
  }

  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);

      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }

      return ret;
    } // Primitive types cannot have properties


    var primitive = formatPrimitive(ctx, value);

    if (primitive) {
      return primitive;
    } // Look up the keys of the object.


    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    } // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    } // Some type of object without properties can be shortcutted.


    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }

      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }

      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }

      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '',
        array = false,
        braces = ['{', '}']; // Make Array say that they are Array

    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    } // Make functions say that they are functions


    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    } // Make RegExps say that they are RegExps


    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    } // Make dates with properties first say the date


    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    } // Make error with message first say the error


    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);
    var output;

    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }

  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }

    if (isNumber(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

    if (isNull(value)) return ctx.stylize('null', 'null');
  }

  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }

  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];

    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push('');
      }
    }

    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }

  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key]
    };

    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }

    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }

    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }

        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function (line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function (line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }

    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }

      name = JSON.stringify('' + key);

      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }

  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  } // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.


  function isArray(ar) {
    return Array.isArray(ar);
  }

  exports.isArray = isArray;

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  exports.isBoolean = isBoolean;

  function isNull(arg) {
    return arg === null;
  }

  exports.isNull = isNull;

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  exports.isNullOrUndefined = isNullOrUndefined;

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  exports.isNumber = isNumber;

  function isString(arg) {
    return typeof arg === 'string';
  }

  exports.isString = isString;

  function isSymbol(arg) {
    return _typeof(arg) === 'symbol';
  }

  exports.isSymbol = isSymbol;

  function isUndefined(arg) {
    return arg === void 0;
  }

  exports.isUndefined = isUndefined;

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  exports.isRegExp = isRegExp;

  function isObject(arg) {
    return _typeof(arg) === 'object' && arg !== null;
  }

  exports.isObject = isObject;

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  exports.isDate = isDate;

  function isError(e) {
    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  exports.isError = isError;

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  exports.isFunction = isFunction;

  function isPrimitive(arg) {
    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
  }

  exports.isPrimitive = isPrimitive;
  exports.isBuffer = isBuffer;

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  } // log is just a thin wrapper to console.log that prepends a timestamp


  exports.log = function () {
    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
  };
  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * The Function.prototype.inherits from lang.js rewritten as a standalone
   * function (not on Function.prototype). NOTE: If this file is to be loaded
   * during bootstrapping this function needs to be rewritten using some native
   * functions as prototype setup using normal JavaScript does not work as
   * expected during bootstrapping (see mirror.js in r114903).
   *
   * @param {function} ctor Constructor function which needs to inherit the
   *     prototype.
   * @param {function} superCtor Constructor function to inherit prototype from.
   */


  exports.inherits = inherits$1;

  exports._extend = function (origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;

    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }

    return origin;
  };

  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

  exports.promisify = function promisify(original) {
    if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');

    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      var fn = original[kCustomPromisifiedSymbol];

      if (typeof fn !== 'function') {
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      }

      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn;
    }

    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
      });
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      args.push(function (err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });

      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }

      return promise;
    }

    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
  };

  exports.promisify.custom = kCustomPromisifiedSymbol;

  function callbackifyOnRejected(reason, cb) {
    // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
    // Because `null` is a special error value in callbacks which means "no error
    // occurred", we error-wrap so the callback consumer can distinguish between
    // "the promise rejected with null" or "the promise fulfilled with undefined".
    if (!reason) {
      var newReason = new Error('Promise was rejected with a falsy value');
      newReason.reason = reason;
      reason = newReason;
    }

    return cb(reason);
  }

  function callbackify(original) {
    if (typeof original !== 'function') {
      throw new TypeError('The "original" argument must be of type Function');
    } // We DO NOT return the promise as it gives the user a false sense that
    // the promise is actually somehow related to the callback's execution
    // and that the callback throwing will reject the promise.


    function callbackified() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      var maybeCb = args.pop();

      if (typeof maybeCb !== 'function') {
        throw new TypeError('The last argument must be of type Function');
      }

      var self = this;

      var cb = function cb() {
        return maybeCb.apply(self, arguments);
      }; // In true node style we process the callback on `nextTick` with all the
      // implications (stack, `uncaughtException`, `async_hooks`)


      original.apply(this, args).then(function (ret) {
        process.nextTick(cb, null, ret);
      }, function (rej) {
        process.nextTick(callbackifyOnRejected, rej, cb);
      });
    }

    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
  }

  exports.callbackify = callbackify;
});
var util_1 = util.format;
var util_2 = util.deprecate;
var util_3 = util.debuglog;
var util_4 = util.inspect;
var util_5 = util.isArray;
var util_6 = util.isBoolean;
var util_7 = util.isNull;
var util_8 = util.isNullOrUndefined;
var util_9 = util.isNumber;
var util_10 = util.isString;
var util_11 = util.isSymbol;
var util_12 = util.isUndefined;
var util_13 = util.isRegExp;
var util_14 = util.isObject;
var util_15 = util.isDate;
var util_16 = util.isError;
var util_17 = util.isFunction;
var util_18 = util.isPrimitive;
var util_19 = util.isBuffer;
var util_20 = util.log;
var util_21 = util.inherits;
var util_22 = util._extend;
var util_23 = util.promisify;
var util_24 = util.callbackify;

var util_inspect = util.inspect;

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString$1 = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace$1 = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat$1 = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'object'; // ie, `has-tostringtag/shams

var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (_typeof(Symbol.toStringTag) === hasShammedSymbols ? 'object' : 'symbol') ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype // eslint-disable-line no-proto
? function (O) {
  return O.__proto__; // eslint-disable-line no-proto
} : null);

function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1000 && num < 1000 || $test.call(/e/, str)) {
    return str;
  }

  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;

  if (typeof num === 'number') {
    var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)

    if (int !== num) {
      var intStr = String(int);
      var dec = $slice.call(str, intStr.length + 1);
      return $replace$1.call(intStr, sepRegex, '$&_') + '.' + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
    }
  }

  return $replace$1.call(str, sepRegex, '$&_');
}

var inspectCustom = util_inspect.custom;
var inspectSymbol = inspectCustom && isSymbol$1(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};

  if (has(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }

  if (has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }

  var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;

  if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
    throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
  }

  if (has(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }

  if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }

  var numericSeparator = opts.numericSeparator;

  if (typeof obj === 'undefined') {
    return 'undefined';
  }

  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'boolean') {
    return obj ? 'true' : 'false';
  }

  if (typeof obj === 'string') {
    return inspectString(obj, opts);
  }

  if (typeof obj === 'number') {
    if (obj === 0) {
      return Infinity / obj > 0 ? '0' : '-0';
    }

    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }

  if (typeof obj === 'bigint') {
    var bigIntStr = String(obj) + 'n';
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }

  var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;

  if (typeof depth === 'undefined') {
    depth = 0;
  }

  if (depth >= maxDepth && maxDepth > 0 && _typeof(obj) === 'object') {
    return isArray$2(obj) ? '[Array]' : '[Object]';
  }

  var indent = getIndent(opts, depth);

  if (typeof seen === 'undefined') {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return '[Circular]';
  }

  function inspect(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }

    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };

      if (has(opts, 'quoteStyle')) {
        newOpts.quoteStyle = opts.quoteStyle;
      }

      return inspect_(value, newOpts, depth + 1, seen);
    }

    return inspect_(value, opts, depth + 1, seen);
  }

  if (typeof obj === 'function') {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect);
    return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
  }

  if (isSymbol$1(obj)) {
    var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
    return _typeof(obj) === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
  }

  if (isElement$1(obj)) {
    var s = '<' + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];

    for (var i = 0; i < attrs.length; i++) {
      s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
    }

    s += '>';

    if (obj.childNodes && obj.childNodes.length) {
      s += '...';
    }

    s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
    return s;
  }

  if (isArray$2(obj)) {
    if (obj.length === 0) {
      return '[]';
    }

    var xs = arrObjKeys(obj, inspect);

    if (indent && !singleLineValues(xs)) {
      return '[' + indentedJoin(xs, indent) + ']';
    }

    return '[ ' + $join.call(xs, ', ') + ' ]';
  }

  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect);

    if ('cause' in obj && !isEnumerable.call(obj, 'cause')) {
      return '{ [' + String(obj) + '] ' + $join.call($concat$1.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
    }

    if (parts.length === 0) {
      return '[' + String(obj) + ']';
    }

    return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
  }

  if (_typeof(obj) === 'object' && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
      return obj[inspectSymbol]();
    } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
      return obj.inspect();
    }
  }

  if (isMap(obj)) {
    var mapParts = [];
    mapForEach.call(obj, function (value, key) {
      mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
    });
    return collectionOf('Map', mapSize.call(obj), mapParts, indent);
  }

  if (isSet(obj)) {
    var setParts = [];
    setForEach.call(obj, function (value) {
      setParts.push(inspect(value, obj));
    });
    return collectionOf('Set', setSize.call(obj), setParts, indent);
  }

  if (isWeakMap(obj)) {
    return weakCollectionOf('WeakMap');
  }

  if (isWeakSet(obj)) {
    return weakCollectionOf('WeakSet');
  }

  if (isWeakRef(obj)) {
    return weakCollectionOf('WeakRef');
  }

  if (isNumber(obj)) {
    return markBoxed(inspect(Number(obj)));
  }

  if (isBigInt(obj)) {
    return markBoxed(inspect(bigIntValueOf.call(obj)));
  }

  if (isBoolean$1(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }

  if (isString$1(obj)) {
    return markBoxed(inspect(String(obj)));
  }

  if (!isDate(obj) && !isRegExp(obj)) {
    var ys = arrObjKeys(obj, inspect);
    var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? '' : 'null prototype';
    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr$1(obj), 8, -1) : protoTag ? 'Object' : '';
    var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
    var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat$1.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');

    if (ys.length === 0) {
      return tag + '{}';
    }

    if (indent) {
      return tag + '{' + indentedJoin(ys, indent) + '}';
    }

    return tag + '{ ' + $join.call(ys, ', ') + ' }';
  }

  return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
  return quoteChar + s + quoteChar;
}

function quote(s) {
  return $replace$1.call(String(s), /"/g, '&quot;');
}

function isArray$2(obj) {
  return toStr$1(obj) === '[object Array]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isDate(obj) {
  return toStr$1(obj) === '[object Date]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isRegExp(obj) {
  return toStr$1(obj) === '[object RegExp]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isError(obj) {
  return toStr$1(obj) === '[object Error]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isString$1(obj) {
  return toStr$1(obj) === '[object String]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isNumber(obj) {
  return toStr$1(obj) === '[object Number]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
}

function isBoolean$1(obj) {
  return toStr$1(obj) === '[object Boolean]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
} // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives


function isSymbol$1(obj) {
  if (hasShammedSymbols) {
    return obj && _typeof(obj) === 'object' && obj instanceof Symbol;
  }

  if (_typeof(obj) === 'symbol') {
    return true;
  }

  if (!obj || _typeof(obj) !== 'object' || !symToString) {
    return false;
  }

  try {
    symToString.call(obj);
    return true;
  } catch (e) {}

  return false;
}

function isBigInt(obj) {
  if (!obj || _typeof(obj) !== 'object' || !bigIntValueOf) {
    return false;
  }

  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e) {}

  return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) {
  return key in this;
};

function has(obj, key) {
  return hasOwn.call(obj, key);
}

function toStr$1(obj) {
  return objectToString$1.call(obj);
}

function nameOf(f) {
  if (f.name) {
    return f.name;
  }

  var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);

  if (m) {
    return m[1];
  }

  return null;
}

function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }

  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }

  return -1;
}

function isMap(x) {
  if (!mapSize || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    mapSize.call(x);

    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }

    return x instanceof Map; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isWeakMap(x) {
  if (!weakMapHas || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    weakMapHas.call(x, weakMapHas);

    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }

    return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isWeakRef(x) {
  if (!weakRefDeref || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {}

  return false;
}

function isSet(x) {
  if (!setSize || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    setSize.call(x);

    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }

    return x instanceof Set; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isWeakSet(x) {
  if (!weakSetHas || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    weakSetHas.call(x, weakSetHas);

    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }

    return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isElement$1(x) {
  if (!x || _typeof(x) !== 'object') {
    return false;
  }

  if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
    return true;
  }

  return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
    return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  } // eslint-disable-next-line no-control-regex


  var s = $replace$1.call($replace$1.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: 'b',
    9: 't',
    10: 'n',
    12: 'f',
    13: 'r'
  }[n];

  if (x) {
    return '\\' + x;
  }

  return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
  return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
  return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
  return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], '\n') >= 0) {
      return false;
    }
  }

  return true;
}

function getIndent(opts, depth) {
  var baseIndent;

  if (opts.indent === '\t') {
    baseIndent = '\t';
  } else if (typeof opts.indent === 'number' && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), ' ');
  } else {
    return null;
  }

  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}

function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return '';
  }

  var lineJoiner = '\n' + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
  var isArr = isArray$2(obj);
  var xs = [];

  if (isArr) {
    xs.length = obj.length;

    for (var i = 0; i < obj.length; i++) {
      xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
    }
  }

  var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
  var symMap;

  if (hasShammedSymbols) {
    symMap = {};

    for (var k = 0; k < syms.length; k++) {
      symMap['$' + syms[k]] = syms[k];
    }
  }

  for (var key in obj) {
    // eslint-disable-line no-restricted-syntax
    if (!has(obj, key)) {
      continue;
    } // eslint-disable-line no-restricted-syntax, no-continue


    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    } // eslint-disable-line no-restricted-syntax, no-continue


    if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
      // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
      continue; // eslint-disable-line no-restricted-syntax, no-continue
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
    } else {
      xs.push(key + ': ' + inspect(obj[key], obj));
    }
  }

  if (typeof gOPS === 'function') {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
      }
    }
  }

  return xs;
}

var $TypeError$1 = getIntrinsic('%TypeError%');
var $WeakMap = getIntrinsic('%WeakMap%', true);
var $Map = getIntrinsic('%Map%', true);
var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);
/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */

var listGetNode = function listGetNode(list, key) {
  // eslint-disable-line consistent-return
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr; // eslint-disable-line no-param-reassign

      return curr;
    }
  }
};

var listGet = function listGet(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};

var listSet = function listSet(objects, key, value) {
  var node = listGetNode(objects, key);

  if (node) {
    node.value = value;
  } else {
    // Prepend the new node to the beginning of the list
    objects.next = {
      // eslint-disable-line no-param-reassign
      key: key,
      next: objects.next,
      value: value
    };
  }
};

var listHas = function listHas(objects, key) {
  return !!listGetNode(objects, key);
};

var sideChannel = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function assert(key) {
      if (!channel.has(key)) {
        throw new $TypeError$1('Side channel does not contain ' + objectInspect(key));
      }
    },
    get: function get(key) {
      // eslint-disable-line consistent-return
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key);
        }
      } else {
        if ($o) {
          // eslint-disable-line no-lonely-if
          return listGet($o, key);
        }
      }
    },
    has: function has(key) {
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key);
        }
      } else {
        if ($o) {
          // eslint-disable-line no-lonely-if
          return listHas($o, key);
        }
      }

      return false;
    },
    set: function set(key, value) {
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if (!$wm) {
          $wm = new $WeakMap();
        }

        $weakMapSet($wm, key, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }

        $mapSet($m, key, value);
      } else {
        if (!$o) {
          /*
           * Initialize the linked list as an empty node, so that we don't have
           * to special-case handling of the first node: we can always refer to
           * it as (previous node).next, instead of something like (list).head
           */
          $o = {
            key: {},
            next: null
          };
        }

        listSet($o, key, value);
      }
    }
  };
  return channel;
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: 'RFC1738',
  RFC3986: 'RFC3986'
};
var formats = {
  'default': Format.RFC3986,
  formatters: {
    RFC1738: function RFC1738(value) {
      return replace.call(value, percentTwenties, '+');
    },
    RFC3986: function RFC3986(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};

var has$1 = Object.prototype.hasOwnProperty;
var isArray$3 = Array.isArray;

var hexTable = function () {
  var array = [];

  for (var i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
}();

var compactQueue = function compactQueue(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];

    if (isArray$3(obj)) {
      var compacted = [];

      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== 'undefined') {
          compacted.push(obj[j]);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }
};

var arrayToObject = function arrayToObject(source, options) {
  var obj = options && options.plainObjects ? Object.create(null) : {};

  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== 'undefined') {
      obj[i] = source[i];
    }
  }

  return obj;
};

var merge = function merge(target, source, options) {
  /* eslint no-param-reassign: 0 */
  if (!source) {
    return target;
  }

  if (_typeof(source) !== 'object') {
    if (isArray$3(target)) {
      target.push(source);
    } else if (target && _typeof(target) === 'object') {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$1.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }

    return target;
  }

  if (!target || _typeof(target) !== 'object') {
    return [target].concat(source);
  }

  var mergeTarget = target;

  if (isArray$3(target) && !isArray$3(source)) {
    mergeTarget = arrayToObject(target, options);
  }

  if (isArray$3(target) && isArray$3(source)) {
    source.forEach(function (item, i) {
      if (has$1.call(target, i)) {
        var targetItem = target[i];

        if (targetItem && _typeof(targetItem) === 'object' && item && _typeof(item) === 'object') {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce(function (acc, key) {
    var value = source[key];

    if (has$1.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }

    return acc;
  }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function (acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};

var decode = function decode(str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, ' ');

  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  } // utf-8


  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  // It has been adapted here for stricter adherence to RFC 3986
  if (str.length === 0) {
    return str;
  }

  var string = str;

  if (_typeof(str) === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }

  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
    });
  }

  var out = '';

  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);

    if (c === 0x2D // -
    || c === 0x2E // .
    || c === 0x5F // _
    || c === 0x7E // ~
    || c >= 0x30 && c <= 0x39 // 0-9
    || c >= 0x41 && c <= 0x5A // a-z
    || c >= 0x61 && c <= 0x7A // A-Z
    || format === formats.RFC1738 && (c === 0x28 || c === 0x29) // ( )
    ) {
      out += string.charAt(i);
      continue;
    }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    i += 1;
    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
    /* eslint operator-linebreak: [2, "before"] */

    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
  }

  return out;
};

var compact = function compact(value) {
  var queue = [{
    obj: {
      o: value
    },
    prop: 'o'
  }];
  var refs = [];

  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);

    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];

      if (_typeof(val) === 'object' && val !== null && refs.indexOf(val) === -1) {
        queue.push({
          obj: obj,
          prop: key
        });
        refs.push(val);
      }
    }
  }

  compactQueue(queue);
  return value;
};

var isRegExp$1 = function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer$1 = function isBuffer(obj) {
  if (!obj || _typeof(obj) !== 'object') {
    return false;
  }

  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine$1 = function combine(a, b) {
  return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
  if (isArray$3(val)) {
    var mapped = [];

    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }

    return mapped;
  }

  return fn(val);
};

var utils = {
  arrayToObject: arrayToObject,
  assign: assign,
  combine: combine$1,
  compact: compact,
  decode: decode,
  encode: encode,
  isBuffer: isBuffer$1,
  isRegExp: isRegExp$1,
  maybeMap: maybeMap,
  merge: merge
};

var has$2 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + '[]';
  },
  comma: 'comma',
  indices: function indices(prefix, key) {
    return prefix + '[' + key + ']';
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$4 = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;

var pushToArray = function pushToArray(arr, valueOrArray) {
  push.apply(arr, isArray$4(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;
var defaultFormat = formats['default'];
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  charset: 'utf-8',
  charsetSentinel: false,
  delimiter: '&',
  encode: true,
  encoder: utils.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || _typeof(v) === 'symbol' || typeof v === 'bigint';
};

var sentinel = {};

var stringify$1 = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel$1) {
  var obj = object;
  var tmpSc = sideChannel$1;
  var step = 0;
  var findFlag = false;

  while ((tmpSc = tmpSc.get(sentinel)) !== undefined && !findFlag) {
    // Where object last appeared in the ref tree
    var pos = tmpSc.get(object);
    step += 1;

    if (typeof pos !== 'undefined') {
      if (pos === step) {
        throw new RangeError('Cyclic object value');
      } else {
        findFlag = true; // Break while
      }
    }

    if (typeof tmpSc.get(sentinel) === 'undefined') {
      step = 0;
    }
  }

  if (typeof filter === 'function') {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (generateArrayPrefix === 'comma' && isArray$4(obj)) {
    obj = utils.maybeMap(obj, function (value) {
      if (value instanceof Date) {
        return serializeDate(value);
      }

      return value;
    });
  }

  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
    }

    obj = '';
  }

  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);

      if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
        var valuesArray = split.call(String(obj), ',');
        var valuesJoined = '';

        for (var i = 0; i < valuesArray.length; ++i) {
          valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
        }

        return [formatter(keyValue) + '=' + valuesJoined];
      }

      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
    }

    return [formatter(prefix) + '=' + formatter(String(obj))];
  }

  var values = [];

  if (typeof obj === 'undefined') {
    return values;
  }

  var objKeys;

  if (generateArrayPrefix === 'comma' && isArray$4(obj)) {
    // we need to join elements in
    objKeys = [{
      value: obj.length > 0 ? obj.join(',') || null : undefined
    }];
  } else if (isArray$4(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = _typeof(key) === 'object' && key.value !== undefined ? key.value : obj[key];

    if (skipNulls && value === null) {
      continue;
    }

    var keyPrefix = isArray$4(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
    sideChannel$1.set(object, step);
    var valueSideChannel = sideChannel();
    valueSideChannel.set(sentinel, sideChannel$1);
    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
  }

  return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
    throw new TypeError('Encoder has to be a function.');
  }

  var charset = opts.charset || defaults.charset;

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var format = formats['default'];

  if (typeof opts.format !== 'undefined') {
    if (!has$2.call(formats.formatters, opts.format)) {
      throw new TypeError('Unknown format option provided.');
    }

    format = opts.format;
  }

  var formatter = formats.formatters[format];
  var filter = defaults.filter;

  if (typeof opts.filter === 'function' || isArray$4(opts.filter)) {
    filter = opts.filter;
  }

  return {
    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter: filter,
    format: format,
    formatter: formatter,
    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
    sort: typeof opts.sort === 'function' ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

var stringify_1 = function stringify_1(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;

  if (typeof options.filter === 'function') {
    filter = options.filter;
    obj = filter('', obj);
  } else if (isArray$4(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  var keys = [];

  if (_typeof(obj) !== 'object' || obj === null) {
    return '';
  }

  var arrayFormat;

  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && 'indices' in opts) {
    arrayFormat = opts.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = 'indices';
  }

  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (options.sort) {
    objKeys.sort(options.sort);
  }

  var sideChannel$1 = sideChannel();

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];

    if (options.skipNulls && obj[key] === null) {
      continue;
    }

    pushToArray(keys, stringify$1(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel$1));
  }

  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? '?' : '';

  if (options.charsetSentinel) {
    if (options.charset === 'iso-8859-1') {
      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      // encodeURIComponent('✓')
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
};

var has$3 = Object.prototype.hasOwnProperty;
var isArray$5 = Array.isArray;
var defaults$1 = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: 'utf-8',
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: '&',
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1000,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};

var interpretNumericEntities = function interpretNumericEntities(str) {
  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};

var parseArrayValue = function parseArrayValue(val, options) {
  if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
    return val.split(',');
  }

  return val;
}; // This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.


var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

  var i;
  var charset = options.charset;

  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf('utf8=') === 0) {
        if (parts[i] === charsetSentinel) {
          charset = 'utf-8';
        } else if (parts[i] === isoSentinel) {
          charset = 'iso-8859-1';
        }

        skipIndex = i;
        i = parts.length; // The eslint settings do not allow break;
      }
    }
  }

  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }

    var part = parts[i];
    var bracketEqualsPos = part.indexOf(']=');
    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
    var key, val;

    if (pos === -1) {
      key = options.decoder(part, defaults$1.decoder, charset, 'key');
      val = options.strictNullHandling ? null : '';
    } else {
      key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
      val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
        return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
      });
    }

    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
      val = interpretNumericEntities(val);
    }

    if (part.indexOf('[]=') > -1) {
      val = isArray$5(val) ? [val] : val;
    }

    if (has$3.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
};

var parseObject = function parseObject(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);

  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];

    if (root === '[]' && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? Object.create(null) : {};
      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);

      if (!options.parseArrays && cleanRoot === '') {
        obj = {
          0: leaf
        };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }

    leaf = obj;
  }

  return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  } // Transform dot notation to bracket notation


  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

  var brackets = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g; // Get the parent

  var segment = options.depth > 0 && brackets.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

  var keys = [];

  if (parent) {
    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
    if (!options.plainObjects && has$3.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(parent);
  } // Loop through children appending to the array until we hit depth


  var i = 0;

  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;

    if (!options.plainObjects && has$3.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(segment[1]);
  } // If there's a remainder, just add whatever is left


  if (segment) {
    keys.push('[' + key.slice(segment.index) + ']');
  }

  return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
  if (!opts) {
    return defaults$1;
  }

  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
    throw new TypeError('Decoder has to be a function.');
  }

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
    allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults$1.allowSparse,
    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults$1.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};

var parse$1 = function parse(str, opts) {
  var options = normalizeParseOptions(opts);

  if (str === '' || str === null || typeof str === 'undefined') {
    return options.plainObjects ? Object.create(null) : {};
  }

  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
  var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

  var keys = Object.keys(tempObj);

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
    obj = utils.merge(obj, newObj, options);
  }

  if (options.allowSparse === true) {
    return obj;
  }

  return utils.compact(obj);
};

var lib = {
  formats: formats,
  parse: parse$1,
  stringify: stringify_1
};
var lib_2 = lib.parse;
var lib_3 = lib.stringify;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq$1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf$1(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf$1;

/** Used for built-in method references. */

var arrayProto$1 = Array.prototype;
/** Built-in value references. */

var splice$1 = arrayProto$1.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete$1(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function listCacheGet$1(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function listCacheHas$1(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */

function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet$1;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache$1.prototype.clear = _listCacheClear;
ListCache$1.prototype['delete'] = _listCacheDelete;
ListCache$1.prototype.get = _listCacheGet;
ListCache$1.prototype.has = _listCacheHas;
ListCache$1.prototype.set = _listCacheSet;
var _ListCache = ListCache$1;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */

function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;

/** Detect free variable `self`. */

var freeSelf$1 = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root$1 = _freeGlobal || freeSelf$1 || Function('return this')();
var _root = root$1;

/** Built-in value references. */

var _Symbol2 = _root.Symbol;
var _Symbol = _Symbol2;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$2 = objectProto$5.toString;
/** Built-in value references. */

var symToStringTag$2 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag$1(value) {
  var isOwn = hasOwnProperty$4.call(value, symToStringTag$2),
      tag = value[symToStringTag$2];

  try {
    value[symToStringTag$2] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$2.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$2] = tag;
    } else {
      delete value[symToStringTag$2];
    }
  }

  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$3 = objectProto$6.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString$2(value) {
  return nativeObjectToString$3.call(value);
}

var _objectToString = objectToString$2;

/** `Object#toString` result references. */

var nullTag$1 = '[object Null]',
    undefinedTag$1 = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$3 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag$1 : nullTag$1;
  }

  return symToStringTag$3 && symToStringTag$3 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

/** `Object#toString` result references. */

var asyncTag$1 = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag$1 = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction$2(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);
  return tag == funcTag$1 || tag == genTag$1 || tag == asyncTag$1 || tag == proxyTag$1;
}

var isFunction_1 = isFunction$2;

/** Used to detect overreaching core-js shims. */

var coreJsData$1 = _root['__core-js_shared__'];
var _coreJsData = coreJsData$1;

/** Used to detect methods masquerading as native. */

var maskSrcKey$1 = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked$1(func) {
  return !!maskSrcKey$1 && maskSrcKey$1 in func;
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$2 = funcProto$2.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource$1;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$3 = Function.prototype,
    objectProto$7 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$3 = funcProto$3.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative$1 = RegExp('^' + funcToString$3.call(hasOwnProperty$5).replace(reRegExpChar$1, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative$1(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative$1(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$1;

/* Built-in method references that are verified to be native. */

var Map$2 = _getNative(_root, 'Map');
var _Map = Map$2;

/* Built-in method references that are verified to be native. */

var nativeCreate$1 = _getNative(Object, 'create');
var _nativeCreate = nativeCreate$1;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear$1() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet$1(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }

  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

/** Used for built-in method references. */

var objectProto$9 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas$1(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas$1;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$3 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$3 : value;
  return this;
}

var _hashSet = hashSet$1;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash$1.prototype.clear = _hashClear;
Hash$1.prototype['delete'] = _hashDelete;
Hash$1.prototype.get = _hashGet;
Hash$1.prototype.has = _hashHas;
Hash$1.prototype.set = _hashSet;
var _Hash = Hash$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable$1;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData$1(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData$1;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function mapCacheDelete$1(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function mapCacheGet$1(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function mapCacheHas$1(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */

function mapCacheSet$1(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache$1.prototype.clear = _mapCacheClear;
MapCache$1.prototype['delete'] = _mapCacheDelete;
MapCache$1.prototype.get = _mapCacheGet;
MapCache$1.prototype.has = _mapCacheHas;
MapCache$1.prototype.set = _mapCacheSet;
var _MapCache = MapCache$1;

/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$4 = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$4);

  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */

var Uint8Array$1 = _root.Uint8Array;
var _Uint8Array = Uint8Array$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag$1 = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$6 = Array.isArray;
var isArray_1 = isArray$6;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */

var objectProto$a = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$a.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && _typeof(value) == 'object';
}

var isObjectLike_1 = isObjectLike$1;

/** `Object#toString` result references. */

var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */

var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$8.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};
var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? _root.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */

  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */

var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$2 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$2] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports && _freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      } // Legacy `process.binding('util')` for Node.js < 10.


      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});

/* Node.js helper references. */

var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */

var objectProto$c = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$9.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$d;
  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

/** Used for built-in method references. */

var objectProto$e = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$a = objectProto$e.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$a.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$2 = 1;
/** Used for built-in method references. */

var objectProto$f = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$b = objectProto$f.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$b.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */

var DataView$1 = _getNative(_root, 'DataView');
var _DataView = DataView$1;

/* Built-in method references that are verified to be native. */

var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */

var Set$1 = _getNative(_root, 'Set');
var _Set = Set$1;

/* Built-in method references that are verified to be native. */

var WeakMap$1 = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap$1;

/** `Object#toString` result references. */

var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';
var dataViewTag$2 = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function getTag(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;

        case mapCtorString:
          return mapTag$2;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag$2;

        case weakMapCtorString:
          return weakMapTag$1;
      }
    }

    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$3 = 1;
/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';
/** Used for built-in method references. */

var objectProto$g = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$c = objectProto$g.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$c.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$c.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }

  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */

function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */

var baseFor = _createBaseFor();
var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */

function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }

    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }

    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */

var baseEach = _createBaseEach(_baseForOwn);
var _baseEach = baseEach;

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function baseFilter(collection, predicate) {
  var result = [];
  _baseEach(collection, function (value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

var _baseFilter = baseFilter;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */

function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */

function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }

  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatches(source) {
  var matchData = _getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */

var symbolTag$2 = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol$2(value) {
  return _typeof(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag$2;
}

var isSymbol_1 = isSymbol$2;

/** Used to match property names within property paths. */

var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp$1 = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey$1(value, object) {
  if (isArray_1(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
    return true;
  }

  return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) || object != null && value in Object(object);
}

var _isKey = isKey$1;

/** Error message constants. */

var FUNC_ERROR_TEXT$1 = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize$1(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize$1.Cache || _MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize$1.Cache = _MapCache;
var memoize_1 = memoize$1;

/** Used as the maximum memoize cache size. */

var MAX_MEMOIZE_SIZE$1 = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped$1(func) {
  var result = memoize_1(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE$1) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

/** Used to match property names within property paths. */

var rePropName$2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar$2 = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath$2 = _memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
    result.push('');
  }

  string.replace(rePropName$2, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar$2, '$1') : number || match);
  });
  return result;
});
var _stringToPath = stringToPath$2;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var _arrayMap = arrayMap$1;

/** Used as references for various `Number` constants. */

var INFINITY$2 = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString$1 = symbolProto$2 ? symbolProto$2.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString$1) + '';
  }

  if (isSymbol_1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
}

var _baseToString = baseToString$1;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString$1(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString$1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */

function castPath$1(value, object) {
  if (isArray_1(value)) {
    return value;
  }

  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath$1;

/** Used as references for various `Number` constants. */

var INFINITY$3 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey$1(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$3 ? '-0' : result;
}

var _toKey = toKey$1;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

function baseGet$1(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

var _baseGet = baseGet$1;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */

function get$2(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$2;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */

function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */

function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get_1(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyDeep(path) {
  return function (object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */

function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */

function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity_1;
  }

  if (_typeof(value) == 'object') {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }

  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 *
 * // Combining several predicates using `_.overEvery` or `_.overSome`.
 * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
 * // => objects for ['fred', 'barney']
 */

function filter(collection, predicate) {
  var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
  return func(collection, _baseIteratee(predicate));
}

var filter_1 = filter;

/** Built-in value references. */

var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */

function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */

function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;
  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];

    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }

  return result;
}

var _baseFlatten = baseFlatten;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];
  _baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);

  while (length--) {
    array[length] = array[length].value;
  }

  return array;
}

var _baseSortBy = baseSortBy;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */

function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol_1(value);
    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol_1(other);

    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }

    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }

  return 0;
}

var _compareAscending = compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */

function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = _compareAscending(objCriteria[index], othCriteria[index]);

    if (result) {
      if (index >= ordersLength) {
        return result;
      }

      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  } // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.


  return object.index - other.index;
}

var _compareMultiple = compareMultiple;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */

function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = _arrayMap(iteratees, function (iteratee) {
      if (isArray_1(iteratee)) {
        return function (value) {
          return _baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }

      return iteratee;
    });
  } else {
    iteratees = [identity_1];
  }

  var index = -1;
  iteratees = _arrayMap(iteratees, _baseUnary(_baseIteratee));
  var result = _baseMap(collection, function (value, key, collection) {
    var criteria = _arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return {
      'criteria': criteria,
      'index': ++index,
      'value': value
    };
  });
  return _baseSortBy(result, function (object, other) {
    return _compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

var constant_1 = constant;

var defineProperty$1 = function () {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

var _defineProperty$1 = defineProperty$1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var baseSetToString = !_defineProperty$1 ? identity_1 : function (func, string) {
  return _defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};
var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var setToString = _shortOut(_baseSetToString);
var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */

function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */

function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }

  var type = _typeof(index);

  if (type == 'number' ? isArrayLike_1(object) && _isIndex(index, object.length) : type == 'string' && index in object) {
    return eq_1(object[index], value);
  }

  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */

var sortBy = _baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }

  var length = iteratees.length;

  if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }

  return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
});
var sortBy_1 = sortBy;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}

var _baseFindIndex = baseFindIndex;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */

function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}

  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */

var reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */

function baseTrim(string) {
  return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}

var _baseTrim = baseTrim;

/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */

var INFINITY$4 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber_1(value);

  if (value === INFINITY$4 || value === -INFINITY$4) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */

function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax$1 = Math.max;
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */

function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);

  if (index < 0) {
    index = nativeMax$1(length + index, 0);
  }

  return _baseFindIndex(array, _baseIteratee(predicate), index);
}

var findIndex_1 = findIndex;

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */

function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);

    if (!isArrayLike_1(collection)) {
      var iteratee = _baseIteratee(predicate);
      collection = keys_1(collection);

      predicate = function predicate(key) {
        return iteratee(iterable[key], key, iterable);
      };
    }

    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

var _createFind = createFind;

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */

var find = _createFind(findIndex_1);
var find_1 = find;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

var _baseSlice = baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */

function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : _baseSlice(array, start, end);
}

var _castSlice = castSlice;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseIndexOf(array, value, fromIndex) {
  return value === value ? _strictIndexOf(array, value, fromIndex) : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */

function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

  return index;
}

var _charsEndIndex = charsEndIndex;

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */

function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

  return index;
}

var _charsStartIndex = charsStartIndex;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray;

/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff",
    rsComboMarksRange = "\\u0300-\\u036f",
    reComboHalfMarksRange = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange = "\\u20d0-\\u20ff",
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */

var rsZWJ = "\\u200d";
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */

function hasUnicode(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = "\\ud800-\\udfff",
    rsComboMarksRange$1 = "\\u0300-\\u036f",
    reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */

var rsAstral = '[' + rsAstralRange$1 + ']',
    rsCombo = '[' + rsComboRange$1 + ']',
    rsFitz = "\\ud83c[\\udffb-\\udfff]",
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange$1 + ']',
    rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsZWJ$1 = "\\u200d";
/** Used to compose unicode regexes. */

var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange$1 + ']?',
    rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function stringToArray(string) {
  return _hasUnicode(string) ? _unicodeToArray(string) : _asciiToArray(string);
}

var _stringToArray = stringToArray;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */

function trim(string, chars, guard) {
  string = toString_1(string);

  if (string && (guard || chars === undefined)) {
    return _baseTrim(string);
  }

  if (!string || !(chars = _baseToString(chars))) {
    return string;
  }

  var strSymbols = _stringToArray(string),
      chrSymbols = _stringToArray(chars),
      start = _charsStartIndex(strSymbols, chrSymbols),
      end = _charsEndIndex(strSymbols, chrSymbols) + 1;
  return _castSlice(strSymbols, start, end).join('');
}

var trim_1 = trim;

/** Used for built-in method references. */
var arrayProto$2 = Array.prototype;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeReverse = arrayProto$2.reverse;
/**
 * Reverses `array` so that the first element becomes the last, the second
 * element becomes the second to last, and so on.
 *
 * **Note:** This method mutates `array` and is based on
 * [`Array#reverse`](https://mdn.io/Array/reverse).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.reverse(array);
 * // => [3, 2, 1]
 *
 * console.log(array);
 * // => [3, 2, 1]
 */

function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}

var reverse_1 = reverse;

/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @example
 *
 * _.replace('Hi Fred', 'Fred', 'Barney');
 * // => 'Hi Barney'
 */

function replace$1() {
  var args = arguments,
      string = toString_1(args[0]);
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}

var replace_1 = replace$1;

/** `Object#toString` result references. */

var boolTag$2 = '[object Boolean]';
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */

function isBoolean$2(value) {
  return value === true || value === false || isObjectLike_1(value) && _baseGetTag(value) == boolTag$2;
}

var isBoolean_1 = isBoolean$2;

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined$1(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined$1;

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

var isNull_1 = isNull;

/** `Object#toString` result references. */

var dateTag$2 = '[object Date]';
/**
 * The base implementation of `_.isDate` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 */

function baseIsDate(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == dateTag$2;
}

var _baseIsDate = baseIsDate;

/* Node.js helper references. */

var nodeIsDate = _nodeUtil && _nodeUtil.isDate;
/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */

var isDate$1 = nodeIsDate ? _baseUnary(nodeIsDate) : _baseIsDate;
var isDate_1 = isDate$1;

/** `Object#toString` result references. */

var stringTag$2 = '[object String]';
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */

function isString$2(value) {
  return typeof value == 'string' || !isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$2;
}

var isString_1 = isString$2;

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last;

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */

function parent(object, path) {
  return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
}

var _parent = parent;

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */

function baseUnset(object, path) {
  path = _castPath(path, object);
  object = _parent(object, path);
  return object == null || delete object[_toKey(last_1(path))];
}

var _baseUnset = baseUnset;

/** Used for built-in method references. */

var arrayProto$3 = Array.prototype;
/** Built-in value references. */

var splice$2 = arrayProto$3.splice;
/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */

function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];

    if (length == lastIndex || index !== previous) {
      var previous = index;

      if (_isIndex(index)) {
        splice$2.call(array, index, 1);
      } else {
        _baseUnset(array, index);
      }
    }
  }

  return array;
}

var _basePullAt = basePullAt;

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */

function remove(array, predicate) {
  var result = [];

  if (!(array && array.length)) {
    return result;
  }

  var index = -1,
      indexes = [],
      length = array.length;
  predicate = _baseIteratee(predicate);

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }

  _basePullAt(array, indexes);
  return result;
}

var remove_1 = remove;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE$1 = 200;
/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */

function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }

  if (iteratee) {
    values = _arrayMap(values, _baseUnary(iteratee));
  }

  if (comparator) {
    includes = _arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE$1) {
    includes = _cacheHas;
    isCommon = false;
    values = new _SetCache(values);
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;

      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }

      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }

  return result;
}

var _baseDifference = baseDifference;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */

function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */

var difference = _baseRest(function (array, values) {
  return isArrayLikeObject_1(array) ? _baseDifference(array, _baseFlatten(values, 1, isArrayLikeObject_1, true)) : [];
});
var difference_1 = difference;

/**
 * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */

function baseSortedUniq(array, iteratee) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    if (!index || !eq_1(computed, seen)) {
      var seen = computed;
      result[resIndex++] = value === 0 ? 0 : value;
    }
  }

  return result;
}

var _baseSortedUniq = baseSortedUniq;

/**
 * This method is like `_.uniq` except that it's designed and optimized
 * for sorted arrays.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.sortedUniq([1, 1, 2]);
 * // => [1, 2]
 */

function sortedUniq(array) {
  return array && array.length ? _baseSortedUniq(array) : [];
}

var sortedUniq_1 = sortedUniq;

/**
 * Converts `string`, as a whole, to lower case just like
 * [String#toLowerCase](https://mdn.io/toLowerCase).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.toLower('--Foo-Bar--');
 * // => '--foo-bar--'
 *
 * _.toLower('fooBar');
 * // => 'foobar'
 *
 * _.toLower('__FOO_BAR__');
 * // => '__foo_bar__'
 */

function toLower(value) {
  return toString_1(value).toLowerCase();
}

var toLower_1 = toLower;

/**
 * 动画类型
 */

var animalType = {
  none: 'none',
  fade: 'fade',
  queue: 'queue'
};
/**
 * 鉴权失败码
 */

var authenticationFailCode = 2001;
/**
 * Api请求成功码
 */

var apiSuccessCode = 200;
var emptyLogo = emptyLogo$1;
var appInitDefault = {
  platformName: '平台名称',
  appName: '应用名称',
  appDescription: '应用描述',
  loginLogo: '',
  shareLogo: '',
  shareLogoName: 'Logo',
  leftBarText: '左侧名称',
  companyName: '公司名称',
  copyright: '版权描述',
  apiPrefix: {
    corsTargetProduction: ''
  },
  showSelectLanguage: false,
  showLogoInLoginView: true,
  emptyLogo: emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode: apiSuccessCode,
  authenticationFailCode: authenticationFailCode,
  loginPath: '/user/login',
  showLogInConsole: false,
  showRequestInfo: false,
  useVirtualRequest: false,
  showUseVirtualRequestMessage: false,
  apiVersion: '',
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  useNprogress: true,
  tinymceApiKey: '',
  tinymceImagesUploadUrl: ''
};
/**
 * 转换集合
 */

var convertCollection = {
  /**
   * 数字
   */
  number: 'number',

  /**
   * 日期 date
   */
  datetime: 'datetime',

  /**
   * 字符串
   */
  string: 'string',

  /**
   * moment日期
   */
  moment: 'moment',

  /**
   * 金额
   */
  money: 'money',

  /**
   * 数组
   */
  array: 'array'
};
/**
 * 格式化集合
 */

var formatCollection = {
  /**
   * 金额 ￥ 0.00
   */
  money: 'money',

  /**
   * 格式化日期 YYYY-MM-DD hh:mm:ss
   */
  datetime: 'datetime',

  /**
   * 中文金额
   */
  chineseMoney: 'chineseMoney',

  /**
   * 百分比
   */
  percentage: 'percentage'
};
var contentConfig = {
  wrapperType: {
    page: 'page',
    model: 'model',
    drawer: 'drawer'
  }
};
/**
 * 排序动作
 */

var sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown'
};
/**
 * 扩展区构建模式
 */

var extraBuildType = {
  /**
   * 内置的刷新按钮，根据请求配置触发重新加载，一般用于详情类展示或表单初始加载
   */
  refresh: 'refresh',

  /**
   * 内置的保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用
   */
  save: 'save',

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定
   */
  generalButton: 'generalButton',

  /**
   * 带图标文字，图标为空或者文字为空情况下渲染方式有差异
   */
  iconInfo: 'iconInfo',

  /**
   * 彩色文字
   */
  colorText: 'colorText',

  /**
   * 自定义选择框
   */
  flexSelect: 'flexSelect',

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定,配置项与generalButton相仿，配置模式有所不同，最终效果类似
   */
  button: 'button',

  /**
   * 带扩展操作的按钮
   */
  dropdownButton: 'dropdownButton',

  /**
   * 带扩展操作的省略按钮，省略占位符本身不具有操作
   */
  dropdownEllipsis: 'dropdownEllipsis',

  /**
   * dropdown
   */
  dropdown: 'dropdown',

  /**
   * 指定渲染自定义组件，组件由配置传入
   */
  component: 'component'
};
/**
 * card配置集合
 */

var cardConfig = _objectSpread(_objectSpread({}, contentConfig), {}, {
  renderType: {
    normal: 'normal',
    help: 'help'
  },

  /**
   * 动画支持
   */
  animalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue
  },

  /**
   * 扩展区构建模式
   */
  extraBuildType: _objectSpread({}, extraBuildType),
  contentItemType: {
    /**
     * Col占位符,自由指定占用大小
     */
    placeholder: 'placeholder',

    /**
     * 纯文本渲染项目
     */
    text: 'text',

    /**
     * 输入框，仅用于单页详情或表单上下文环境
     */
    input: 'input',

    /**
     * 密码框，仅用于单页详情或表单上下文环境
     */
    password: 'password',

    /**
     * 数字框，仅用于单页详情或表单上下文环境
     */
    inputNumber: 'inputNumber',

    /**
     * 文本域，仅用于单页详情或表单上下文环境
     */
    textarea: 'textarea',

    /**
     * switch开关
     */
    switch: 'switch',

    /**
     * 一般选择框
     */
    select: 'select',

    /**
     * ”是/否“ 选择框
     */
    whetherSelect: 'whetherSelect',

    /**
     * 自定义选择框
     */
    customSelect: 'customSelect',

    /**
     * 自定义选择框
     */
    flexSelect: 'flexSelect',

    /**
     * 一般单选框
     */
    radio: 'radio',

    /**
     * ”是/否“ 单选框
     */
    whetherRadio: 'whetherRadio',

    /**
     * 自定义单选框
     */
    customRadio: 'customRadio',

    /**
     * 纯展示文本域，仅用于单页详情或表单上下文环境
     */
    onlyShowTextarea: 'onlyShowTextarea',

    /**
     * 只读输入框，仅用于单页详情或表单上下文环境
     */
    onlyShowInput: 'onlyShowInput',

    /**
     * 只读日期框，仅用于单页详情或表单上下文环境
     */
    onlyShowInputDatetime: 'onlyShowInputDatetime',

    /**
     * 文字信息展示，仅用于单页详情或表单上下文环境
     */
    onlyShowText: 'onlyShowText',

    /**
     * 图片上传
     */
    imageUpload: 'imageUpload',

    /**
     * 图片展示
     */
    imageShow: 'imageShow',

    /**
     * 图片集展示
     */
    imageListShow: 'imageListShow',

    /**
     * 文件串行化上传
     */
    fileBase64Upload: 'fileBase64Upload',

    /**
     * 视频上传
     */
    videoUpload: 'videoUpload',

    /**
     * 文件上传
     */
    fileUpload: 'fileUpload',

    /**
     * 音频上传
     */
    audioUpload: 'audioUpload',

    /**
     * 内部自定义组件，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    innerComponent: 'innerComponent',

    /**
     * 保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用，与extraBuildType处的save具有相似功能
     */
    save: 'save',

    /**
     * 渲染按钮
     */
    button: 'button',

    /**
     * 操作集合
     */
    actionList: 'actionList',

    /**
     * 组件
     */
    component: 'component',

    /**
     * 渲染当前时间，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    nowTime: 'nowTime',

    /**
     * 日期选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    datePicker: 'datePicker',

    /**
     * 时间选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    timePicker: 'timePicker',

    /**
     * json可视化展示
     */
    jsonView: 'jsonView',

    /**
     * flex类型文字
     */
    flexText: 'flexText',

    /**
     * flex类型文字
     */
    onlyShowTextByFlexText: 'onlyShowTextByFlexText',

    /**
     * 分隔符
     */
    divider: 'divider',

    /**
     * Html
     */
    html: 'html',

    /**
     * CustomGrid
     */
    customGrid: 'customGrid',

    /**
     * tree
     */
    tree: 'tree',

    /**
     * tinymce
     */
    tinymce: 'tinymce'
  }
});
/**
 * 日志类型
 */

var logLevel = {
  /**
   * 调试
   */
  debug: 'debug',

  /**
   * 警告
   */
  warn: 'warn',

  /**
   * 错误
   */
  error: 'error'
};
var logShowMode = {
  /**
   * 未知
   */
  unknown: 'unknown',

  /**
   * 文本
   */
  text: 'text',

  /**
   * 对象
   */
  object: 'object'
};
var notificationTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open'
};
var messageTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  loading: 'loading',
  open: 'open'
};

var storageKeyCollection = {
  nearestLocalhostNotify: "nearestLocalhostNotify"
};

function isBrowser$1() {
  return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
}

function getAppInitConfigData() {
  var appInitConfig = appInitDefault;

  if (isBrowser$1()) {
    if ((window.appInitCustomLocal || null) != null) {
      appInitConfig = _objectSpread(_objectSpread({}, appInitConfig), window.appInitCustomLocal);
    }

    if ((window.appInitCustomRemote || null) != null) {
      appInitConfig = _objectSpread(_objectSpread({}, appInitConfig), window.appInitCustomRemote);
    }
  }

  return appInitConfig;
}
function defaultBaseState() {
  return {
    dataLoading: false,
    processing: false,
    reloading: false,
    searching: false,
    refreshing: false,
    paging: false,
    firstLoadSuccess: false,
    loadSuccess: false,
    urlParams: null,
    externalData: null
  };
}
function defaultCoreState() {
  var data = _objectSpread(_objectSpread({}, defaultBaseState()), {
    dataLoading: true
  });

  return data;
}
function defaultCommonState() {
  var data = _objectSpread(_objectSpread({}, defaultCoreState()), {
    loadApiPath: "",
    pageName: "",
    metaData: null,
    metaExtra: null,
    metaListData: [],
    metaOriginalData: null
  });

  return data;
}
function defaultListState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    dateRangeFieldName: "发生时间",
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTimeAlias: "",
    endTimeAlias: "",
    startTime: "",
    endTime: "",
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}
function defaultPageListState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    paramsKey: "",
    loadApiPath: "",
    dateRangeFieldName: "发生时间",
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTime: "",
    endTime: "",
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}
function defaultFormState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    errorFieldName: "",
    submitApiPath: ""
  });

  return data;
}
function getValue$2(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  }).join(",");
}
/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */

function copyToClipboard(_ref) {
  var text = _ref.text,
      _ref$successCallback = _ref.successCallback,
      successCallback = _ref$successCallback === void 0 ? null : _ref$successCallback;
  taro_1.setClipboardData({
    data: text,
    success: function success(res) {
      successCallback(res);
    }
  });
}
/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */

function replaceTargetText(text, replaceText, beforeKeepNumber, afterKeepNumber) {
  var result = toString$2(text);
  var textLength = (text || "").length;

  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (beforeKeepNumber >= textLength || afterKeepNumber >= textLength || (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength) {
      result = text;
    } else {
      var beforeKeep = text.substr(0, beforeKeepNumber);
      var afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber); // const replaceTargetLength = textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0);
      // const replaceTarget = text.substring(
      //   (beforeKeepNumber || 0) <= 0 ? 0 : beforeKeepNumber - 1,
      //   textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0)
      // );
      // const replaced = [];
      // let i = 1;
      // while (i <= replaceTargetLength) {
      //   replaced.push(replaceText);
      //   i += 1;
      // }

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || "";
}
function checkDevelopment() {
  return process.env.NODE_ENV === "development";
}
/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */

function corsTarget() {
  var appInit = getAppInitConfigData();
  var corsTargetDomain = "";

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      var corsTargetDomainRemote = appInit.apiPrefix.corsTargetDomain;
      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}
function showError(text) {
  showErrorMessage({
    message: text
  });
}
function showRuntimeError(_ref2) {
  var messageText = _ref2.message,
      _ref2$showStack = _ref2.showStack,
      showStack = _ref2$showStack === void 0 ? true : _ref2$showStack;

  try {
    if (!stringIsNullOrWhiteSpace(messageText || "")) {
      showErrorMessage({
        message: messageText
      });
    }

    if (showStack) {
      throw new Error("".concat(stringIsNullOrWhiteSpace(messageText || "") ? "" : "".concat(toString$2(messageText), ","), "\u8C03\u7528\u5806\u6808:"));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}
function showSuccessMessage(_ref3) {
  var _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 3 : _ref3$duration,
      messageText = _ref3.message,
      _ref3$onClose = _ref3.onClose,
      onClose = _ref3$onClose === void 0 ? function () {} : _ref3$onClose;
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showErrorMessage(_ref4) {
  var _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? 3 : _ref4$duration,
      messageText = _ref4.message,
      _ref4$onClose = _ref4.onClose,
      onClose = _ref4$onClose === void 0 ? function () {} : _ref4$onClose;
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showWarnMessage(_ref5) {
  var _ref5$duration = _ref5.duration,
      duration = _ref5$duration === void 0 ? 3 : _ref5$duration,
      messageText = _ref5.message,
      _ref5$onClose = _ref5.onClose,
      onClose = _ref5$onClose === void 0 ? function () {} : _ref5$onClose;
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
/**
 * 显示警告信息框
 */

function showWarningMessage(_ref6) {
  var _ref6$duration = _ref6.duration,
      duration = _ref6$duration === void 0 ? 3 : _ref6$duration,
      messageText = _ref6.message,
      _ref6$onClose = _ref6.onClose,
      onClose = _ref6$onClose === void 0 ? function () {} : _ref6$onClose;
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
/**
 * 显示消息信息
 */

function showInfoMessage(_ref7) {
  var _ref7$duration = _ref7.duration,
      duration = _ref7$duration === void 0 ? 3 : _ref7$duration,
      messageText = _ref7.message,
      _ref7$onClose = _ref7.onClose,
      onClose = _ref7$onClose === void 0 ? function () {} : _ref7$onClose;
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showLoadingMessage(_ref8) {
  var _ref8$duration = _ref8.duration,
      duration = _ref8$duration === void 0 ? 3 : _ref8$duration,
      messageText = _ref8.message,
      _ref8$onClose = _ref8.onClose,
      onClose = _ref8$onClose === void 0 ? function () {} : _ref8$onClose;
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showOpenMessage(_ref9) {
  var _ref9$duration = _ref9.duration,
      duration = _ref9$duration === void 0 ? 3 : _ref9$duration,
      messageText = _ref9.message,
      _ref9$onClose = _ref9.onClose,
      onClose = _ref9$onClose === void 0 ? function () {} : _ref9$onClose;
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showMessage(_ref10) {
  var type = _ref10.type,
      _ref10$duration = _ref10.duration,
      duration = _ref10$duration === void 0 ? 1500 : _ref10$duration,
      messageText = _ref10.message,
      _ref10$onClose = _ref10.onClose,
      onClose = _ref10$onClose === void 0 ? function () {} : _ref10$onClose;
  requestAnimationFrame(function () {
    switch (type) {
      case messageTypeCollection.success:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.error:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.info:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.warning:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.warn:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.loading:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      default:
        setTimeout(function () {
          taro_1.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction$3(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;
    }
  });
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */

function recordLog(record, showMode) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : logLevel.debug;
  var showModeModified = (showMode || null) == null || stringIsNullOrWhiteSpace(showMode) ? logShowMode.unknown : showMode;

  if (!inCollection([logShowMode.unknown, logShowMode.text, logShowMode.object], showModeModified)) {
    throw new Error("\u65E0\u6548\u7684\u65E5\u5FD7\u663E\u793A\u6A21\u5F0F:".concat(showModeModified));
  }

  if (showModeModified === logShowMode.unknown) {
    if (isString$3(record)) {
      showModeModified = logShowMode.text;
    } else {
      showModeModified = logShowMode.object;
    }
  }

  if (logShowInConsole() && level === logLevel.debug) {
    if (showModeModified === logShowMode.text) {
      var data = {
        level: level,
        record: record
      }; // eslint-disable-next-line no-console

      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({
        level: level,
        record: record
      });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      var _data = {
        level: level,
        record: record
      }; // eslint-disable-next-line no-console

      console.log(JSON.stringify(_data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({
        level: level,
        record: record
      });
    }
  }
}
/**
 * 记录错误信息
 */

function recordError(record) {
  if (isString$3(record)) {
    recordText(record, logLevel.error);
  } else {
    recordObject(record, logLevel.error);
  }
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */

function recordText(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordLog(record, logShowMode.text, level);
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */

function recordObject(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordLog(record, logShowMode.object, level);
}

function logShowInConsole() {
  var appInit = getAppInitConfigData();
  var result = !!(appInit.showLogInConsole || false);
  return result;
}
/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */


function getGuid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
/**
 * 检测目标是否在数组址之中
 */

function inCollection(collection, value) {
  var result = false;

  if (!isArray$7(collection)) {
    return result;
  }

  collection.some(function (o) {
    if (o === value) {
      result = true;
      return true;
    }

    return false;
  });
  return result;
}
/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */

function isInvalid(v) {
  return typeof v === "undefined";
}
function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  if (isDate$2(v)) {
    return v;
  }

  if (isString$3(v)) {
    var i = v.indexOf("T");

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      var value = v.replace(/\-/g, "/");
      var result = new Date(value);
      return result;
    }
  }

  return new Date(v);
}
/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */

function isDatetime(v) {
  var date = "".concat(typeof v === "undefined" ? null : v);
  var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  var d = new Date(result[1], result[3] - 1, result[4]);
  return d.getFullYear() === parseInt(result[1], 10) && d.getMonth() + 1 === parseInt(result[3], 10) && d.getDate() === parseInt(result[4], 10);
}
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */

function isNumber$1(v) {
  var str = "".concat(typeof v === "undefined" ? null : v);

  if (str === "") {
    return false;
  }

  var regular = /^[0-9]*$/;
  var re = new RegExp(regular);
  return re.test(str);
}
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */

function toNumber$1(v) {
  return Number.isNaN(v) ? 0 : Number.parseInt(v);
}
/**
 * 去除重复数据并排序（升序）
 */

function sortedUnique(array) {
  return sortedUniq_1(array);
}
/**
 *
 *@param  val 值 len保留小数位数
 *
 */

function roundToTarget(v, len) {
  if (!isMoney(v)) {
    return 0;
  }

  var temp = Math.pow(10, len);
  return Math.round(toMoney(v) * temp) / temp;
}
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */

function isMoney(v) {
  var str = "".concat(typeof v === "undefined" ? null : v);

  if (str === "") {
    return false;
  }

  var regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  var re = new RegExp(regular);
  return re.test(str);
}
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */

function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}
/**
 * 通过 key 获取对应得值
 */

function getValueByKey(_ref11) {
  var data = _ref11.data,
      key = _ref11.key,
      _ref11$defaultValue = _ref11.defaultValue,
      defaultValue = _ref11$defaultValue === void 0 ? null : _ref11$defaultValue,
      _ref11$convert = _ref11.convert,
      convert = _ref11$convert === void 0 ? null : _ref11$convert,
      _ref11$convertBuilder = _ref11.convertBuilder,
      convertBuilder = _ref11$convertBuilder === void 0 ? null : _ref11$convertBuilder,
      _ref11$format = _ref11.format,
      format = _ref11$format === void 0 ? null : _ref11$format,
      _ref11$formatBuilder = _ref11.formatBuilder,
      formatBuilder = _ref11$formatBuilder === void 0 ? null : _ref11$formatBuilder;
  var v = getPathValue(data, key, defaultValue);
  var result = v;

  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction$3(convertBuilder)) {
      result = convertTarget({
        target: v,
        convert: convertBuilder
      });
    } else {
      result = convertTarget({
        target: v,
        convert: convert
      });
    }
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction$3(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder
      });
    } else {
      result = formatTarget({
        target: result,
        format: format
      });
    }
  }

  return result;
}
/**
 * convertTarget
 * @param {*} param0
 * @returns
 */

function convertTarget(_ref12) {
  var target = _ref12.target,
      convert = _ref12.convert;

  if (isFunction$3(convert)) {
    return convert(target);
  }

  if (isString$3(convert)) {
    switch (convert) {
      case convertCollection.number:
        return toNumber$1(target);

      case convertCollection.datetime:
        return toDatetime(target);

      case convertCollection.string:
        return toString$2(target);

      case convertCollection.money:
        return toMoney(target);

      case convertCollection.array:
        return (target || null) == null ? [] : isArray$7(target) ? target : [target];

      default:
        return target;
    }
  }

  return target;
}
function formatDatetime(_ref13) {
  var date = _ref13.data,
      fmt = _ref13.fmt;

  if ((date || null) == null) {
    return "";
  }

  var o = {
    "M+": date.getMonth() + 1,
    //月份
    "d+": date.getDate(),
    //日
    "h+": date.getHours(),
    //小时
    "m+": date.getMinutes(),
    //分
    "s+": date.getSeconds(),
    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    //季度
    S: date.getMilliseconds() //毫秒

  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return fmt;
}
function formatTarget(_ref14) {
  var target = _ref14.target,
      format = _ref14.format,
      _ref14$option = _ref14.option,
      option = _ref14$option === void 0 ? {} : _ref14$option;

  if (isFunction$3(format)) {
    return format(target);
  }

  if (isString$3(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney(target);

      case formatCollection.datetime:
        return formatDatetime({
          data: target
        });

      case formatCollection.chineseMoney:
        return formatMoneyToChinese({
          target: target,
          option: option
        });

      case formatCollection.percentage:
        return "".concat(roundToTarget(target * 100, 1), "%");

      default:
        return target;
    }
  }

  return target;
}
/**
 * 通过 path 获取对应得值
 */

function getPathValue(o, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (isUndefined$2(o)) {
    return  defaultValue;
  }

  if (o == null) {
    return  defaultValue;
  }

  if (!isString$3(path)) {
    var text = "getPathValue Function param path must be string";
    showRuntimeError({
      message: text
    });
    return null;
  }

  var v = get_1(o, path, defaultValue);

  if (isUndefined$2(defaultValue) || isNull$1(defaultValue)) {
    return v;
  }

  return v || defaultValue;
}
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */

function formatDecimal(numberSource) {
  return formatMoney(numberSource);
}
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */

function formatMoney(_ref15) {
  var numberSource = _ref15.number,
      _ref15$places = _ref15.places,
      placesSource = _ref15$places === void 0 ? 2 : _ref15$places,
      _ref15$symbol = _ref15.symbol,
      symbolSource = _ref15$symbol === void 0 ? "¥" : _ref15$symbol,
      _ref15$thousand = _ref15.thousand,
      thousandSource = _ref15$thousand === void 0 ? "," : _ref15$thousand,
      _ref15$decimal = _ref15.decimal,
      decimalSource = _ref15$decimal === void 0 ? "." : _ref15$decimal;
  var number = numberSource || 0; //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals

  var places = !isNaN(placesSource = Math.abs(placesSource)) ? placesSource : 2; //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")

  var symbol = symbolSource !== undefined ? symbolSource : "￥"; //thousand表示每几位用,隔开,是货币标识

  var thousand = thousandSource || ","; //decimal表示小数点

  var decimal = decimalSource || "."; //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字

  var negative = number < 0 ? "-" : "";
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
  var j = i.length;
  j = j > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + "1" + thousand) + ( // 第一种方案
  // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
  // 第二种方案
  // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
  places ? decimal + Math.abs(number - toNumber$1(i)).toFixed(places).slice(2) : "");
}
function toPercentage(val) {
  return "".concat(toMoney(toNumber$1(val) * 1000 / 10), "%");
}
/**
 * 检查字符串string是否以给定的target字符串结尾
 */

function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}
/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */

function removeEndMatch(source, target) {
  if (!isString$3(source)) {
    throw new Error("removeEndMatch only use for string source");
  }

  if (!isString$3(target)) {
    throw new Error("removeEndMatch only use for string target");
  }

  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }

  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }

  var lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0 && source.length === lastIndex + target.length) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}
/**
 * 从源字符串移除最后一个匹配项
 */

function removeLastMatch(source, target) {
  if (!isString$3(source)) {
    throw new Error("removeEndMatch only use for string source");
  }

  if (!isString$3(target)) {
    throw new Error("removeEndMatch only use for string target");
  }

  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }

  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }

  var lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}
/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} target 转换的目标
 * @returns
 */

function formatMoneyToChinese(_ref16) {
  var target = _ref16.target;
  var money = target;
  var cnNumber = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; // 汉字的数字

  var cnIntBasic = ["", "拾", "佰", "仟"]; // 基本单位

  var cnIntUnits = ["", "万", "亿", "兆"]; // 对应整数部分扩展单位

  var cnDecUnits = ["角", "分", "毫", "厘"]; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符

  var cnIntLast = "元"; // 整型完以后的单位

  var maxNum = 999999999999999.9999; // 最大处理的数字

  var IntegerNum; // 金额整数部分

  var DecimalNum; // 金额小数部分

  var ChineseString = ""; // 输出的中文金额字符串

  var parts; // 分离金额后用的数组，预定义

  if (money === "") {
    return "";
  }

  money = parseFloat(money);

  if (money >= maxNum) {
    return "超出最大处理数字";
  }

  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;
    return ChineseString;
  }

  money = money.toString(); // 转换为字符串

  if (money.indexOf(".") === -1) {
    IntegerNum = money;
    DecimalNum = "";
  } else {
    parts = money.split(".");
    var _parts = parts;

    var _parts2 = _slicedToArray(_parts, 2);

    IntegerNum = _parts2[0];
    DecimalNum = _parts2[1];
    DecimalNum = parts[1].substr(0, 4);
  }

  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    var zeroCount = 0;
    var IntLen = IntegerNum.length;

    for (var i = 0; i < IntLen; i += 1) {
      var n = IntegerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;

      if (n === "0") {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }

        zeroCount = 0; // 归零

        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }

      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }

    ChineseString += cnIntLast; // 整型部分处理完毕
  }

  if (DecimalNum !== "") {
    // 小数部分
    var decLen = DecimalNum.length;

    for (var _i = 0; _i < decLen; _i += 1) {
      var _n = DecimalNum.substr(_i, 1);

      if (_n !== "0") {
        ChineseString += cnNumber[Number(_n)] + cnDecUnits[_i];
      }
    }
  }

  if (ChineseString === "") {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}
function seededRandom(_ref17) {
  var seed = _ref17.seed,
      min = _ref17.min,
      max = _ref17.max;
  var maxValue = max || 1;
  var minValue = min || 0;
  var seedValue = (seed * 9301 + 49297) % 233280;
  var rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}
/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */

function getRandomColor(_ref18) {
  var seed = _ref18.seed,
      _ref18$hue = _ref18.hue,
      _ref18$luminosity = _ref18.luminosity,
      _ref18$count = _ref18.count,
      _ref18$format = _ref18.format,
      _ref18$alpha = _ref18.alpha;
  return "#".concat("00000".concat((seededRandom(seed) * 0x1000000 << 0).toString(16)).substr(-6));
}

function getBrowserInfoCore() {
  var getBrowserVersion = function getBrowserVersion() {
    var u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1,
      // IE内核
      presto: u.indexOf("Presto") > -1,
      // opera内核
      webKit: u.indexOf("AppleWebKit") > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
      // android 终端或uc浏览器
      iPhone: u.indexOf("iPhone") > -1,
      // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf("iPad") > -1,
      // 是否iPad
      webApp: u.indexOf("Safari") === -1 // 是否web应该程序，没有头部与底部

    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
}
/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */


function getBrowserInfo() {
  return getBrowserInfoCore();
}
/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */

function refitFieldDecoratorOption(v, justice, defaultValue, originalOption, convertCallback) {
  var result = originalOption;
  var justiceV = typeof justice !== "undefined" && justice !== null;
  var defaultV = typeof defaultValue === "undefined" ? null : defaultValue;

  if (justiceV) {
    if (typeof convertValue === "function") {
      result.initialValue = convertCallback(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }

  return result;
}
/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */

function refitCommonData(listData, empty, otherListData) {
  var result = [];

  if (typeof listData !== "undefined") {
    if (listData !== null) {
      result = _toConsumableArray(listData);
    }
  }

  if (typeof otherListData !== "undefined") {
    if (otherListData !== null) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(otherListData));
    }
  }

  if (typeof empty !== "undefined") {
    if (empty !== null) {
      result = [empty].concat(_toConsumableArray(result));
    }
  }

  return result;
}
/**
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */

function evil(fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  var Fn = Function;
  return new Fn("return ".concat(fn))();
}
/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */

function searchFromList(itemKey, itemValue, sourceData) {
  var d = sourceData || [];
  var result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach(function (o) {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });
  return result;
}
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */

function buildFieldDescription(v, op, other) {
  var o = (other || "") === "" ? "" : ",".concat(other);
  return "\u8BF7".concat(op || "输入").concat(v).concat(o);
}
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getStringFromSessionStorage(key) {
  var storage = window.sessionStorage;
  var value = storage.getItem(key);

  if (process.env.NODE_ENV === "development") {
    return value;
  }

  var decode = decodeBase64(value);
  var v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getStringFromLocalStorage(key) {
  var storage = window.localStorage;
  var value = storage.getItem(key);

  if (process.env.NODE_ENV === "development") {
    return value;
  }

  var decode = decodeBase64(value);
  var v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getJsonFromSessionStorage(key) {
  var jsonString = getStringFromSessionStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getJsonFromLocalStorage(key) {
  var jsonString = getStringFromLocalStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveStringToSessionStorage(key, value) {
  var storage = window.sessionStorage;

  if (process.env.NODE_ENV === "development") {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveStringToLocalStorage(key, value) {
  var storage = window.localStorage;

  if (process.env.NODE_ENV === "development") {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveJsonToLocalStorage(key, json) {
  saveStringToLocalStorage(key, JSON.stringify(json || {}));
}
/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */

function removeSessionStorage(key) {
  var storage = window.sessionStorage;
  storage.removeItem(key);
}
/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */

function removeLocalStorage(key) {
  var storage = window.localStorage;
  storage.removeItem(key);
}
/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */

function clearSessionStorage() {
  var storage = window.sessionStorage;
  storage.clear();
}
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */

function clearLocalStorage() {
  var storage = window.localStorage;
  storage.clear();
}
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */

function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  var match = nextProps.match;

  if ((match || null) != null) {
    var params = match.params;

    if ((params || null) != null) {
      return {
        urlParams: params
      };
    }
  }

  return null;
}
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */

function getDerivedStateFromPropsForUrlParams(nextProps, prevState) {
  var defaultUrlParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    id: ""
  };
  var parseUrlParamsForSetState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps);
  stateUrlParams = stateUrlParams || {
    urlParams: defaultUrlParams
  };
  var urlParamsPrev = prevState.urlParams;
  var _stateUrlParams = stateUrlParams,
      urlParams = _stateUrlParams.urlParams;

  if (isEqualBySerialize(_objectSpread(_objectSpread({}, urlParamsPrev || {}), {}), _objectSpread(_objectSpread({}, urlParams || {}), {}))) {
    return prevState;
  }

  if (isFunction$3(parseUrlParamsForSetState)) {
    var data = parseUrlParamsForSetState(stateUrlParams);
    return _objectSpread(_objectSpread(_objectSpread({}, prevState), stateUrlParams), data);
  }

  return _objectSpread(_objectSpread({}, prevState), stateUrlParams);
}
/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */

function isEqual$1(value, other) {
  return isEqual_1(value, other);
}
function isEqualBySerialize(value, other) {
  var d1 = JSON.stringify(value || {});
  var d2 = JSON.stringify(other || {});
  return d1 === d2;
}
function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}
function isFunction$3(value) {
  return isFunction_1(value);
}
function isArray$7(value) {
  return isArray_1(value);
}
function isObject$3(o) {
  return isObject_1(o);
}
function difference$1(array, values) {
  return difference_1(array, values);
}
/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */

function filter$1(collection, predicateFunction) {
  return filter_1(collection, predicateFunction);
}
/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */

function sortBy$1(collection, predicateFunction) {
  return sortBy_1(collection, predicateFunction);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */

function findIndex$1(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return findIndex_1(array, predicateFunction, fromIndex);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */

function find$1(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return find_1(array, predicateFunction, fromIndex);
}
function checkExist(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var result = find$1(array, predicateFunction, fromIndex);
  return !isUndefined$2(result);
}
function reverse$1(array) {
  return reverse_1(array);
}
function trim$1(source) {
  return trim_1(source);
}
function replace$2(source, pattern, replacement) {
  return replace_1(source, pattern, replacement);
}
function toString$2(value) {
  return toString_1(value);
}
function isBoolean$3(value) {
  return isBoolean_1(value);
}
/**
 * check value is undefined
 */

function isUndefined$2(value) {
  return isUndefined_1(value);
}
/**
 * check value is null
 */

function isNull$1(value) {
  return isNull_1(value);
}
/**
 * check value is date
 */

function isDate$2(value) {
  return isDate_1(value);
}
/**
 * check value is string
 */

function isString$3(value) {
  return isString_1(value);
}
/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */

function removeFromArray(array, predicate) {
  return remove_1(array, predicate);
}
function stringIsNullOrWhiteSpace(value) {
  return trim$1(replace$2(value || "", " ", "")) === "";
}
/**
 * base64解码
 */

function decodeBase64(target) {
  var commonContent = (target || "").replace(/\s/g, "+");
  commonContent = Buffer.from(commonContent, "base64").toString();
  return commonContent;
}
/**
 * base64编码
 */

function encodeBase64(target) {
  var base64Content = Buffer.from(target).toString("base64");
  return base64Content;
}
function fixedZero(val) {
  return val * 1 < 10 ? "0".concat(val) : val;
}
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */

function buildFieldHelper(v) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "注：";
  return "".concat(prefix).concat(v, "\u3002");
}
function checkLocalhost() {
  var hostname = toLower_1(window.location.hostname);
  return hostname === "127.0.0.1" || hostname === "localhost";
}
function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}
function setNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var now = parseInt(new Date().getTime() / 1000, 10);
  var d = {
    nearestTime: now
  };
  return saveJsonToLocalStorage(key, d);
}
function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}
/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */

function trySendNearestLocalhostNotify(_ref19) {
  var text = _ref19.text;
  var needSend = false;
  var nearestTime = 0;

  if (checkLocalhost()) {
    var nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

    if (nearestLocalhostNotify == null) {
      needSend = true;
    } else {
      nearestTime = nearestLocalhostNotify.nearestTime || 0;
    }

    var now = parseInt(new Date().getTime() / 1000, 10);

    try {
      if (nearestTime + 30 < now) {
        needSend = true;
      }

      if (needSend) {
        notify({
          type: notificationTypeCollection.info,
          message: "\u5F53\u524D\u63A5\u53E3\u57DF\u540D\uFF1A".concat(text, "\u3002")
        });
        setNearestLocalhostNotifyCache();
      }
    } catch (error) {
      recordLog(error);
    }
  }
}
/**
 * 文本缩略
 */

function ellipsis(value, length) {
  if (value && value.length > length) {
    return "".concat(toString$2(value).substr(0, length), "...");
  }

  return toString$2(value);
}
function notifySuccess(text) {
  notify({
    type: notificationTypeCollection.success,
    message: "操作结果"
  });
}
/**
 * 发送页面通知
 */

function notify(_ref20) {
  var _ref20$type = _ref20.type,
      type = _ref20$type === void 0 ? notificationTypeCollection.info : _ref20$type,
      messageValue = _ref20.message,
      _ref20$closeCallback = _ref20.closeCallback,
      closeCallback = _ref20$closeCallback === void 0 ? null : _ref20$closeCallback;

  var _message$message = _objectSpread(_objectSpread({}, {
    message: "操作结果"
  }), {
    message: messageValue
  }),
      messageText = _message$message.message;

  setTimeout(function () {
    switch (type) {
      case notificationTypeCollection.success:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case notificationTypeCollection.warning:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case notificationTypeCollection.error:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case notificationTypeCollection.info:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case notificationTypeCollection.warn:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;

      default:
        setTimeout(function () {
          taro_1.showToast({
            title: messageValue || "",
            icon: "none",
            mask: true,
            duration: 1500
          }).then(function (res) {
            if (isFunction$3(closeCallback)) {
              setTimeout(function () {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);
        break;
    }
  }, 600);
}
function checkFromConfig(_ref21) {
  var label = _ref21.label,
      name = _ref21.name,
      helper = _ref21.helper;
  var labelText = "object";
  var nameText = "object";
  var helperText = "object";

  if (isObject$3(label)) {
    var text = "label必须为文本";
    showRuntimeError({
      message: text
    });
    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject$3(name)) {
    var _text = "name必须为文本";
    showRuntimeError({
      message: _text
    });
    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject$3(helper)) {
    var _text2 = "helper必须为文本";
    showRuntimeError({
      message: _text2
    });
    recordObject(helper);
  } else {
    helperText = helper;
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText
  };
}

var requestAnimFrameCustom = function () {
  if (isBrowser$1()) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
      window.setTimeout(a, 1e3 / 60);
    };
  }

  return function () {};
}();

var requestAnimFrame = requestAnimFrameCustom;
/**
 * 依照某个键的值进行排序，请确保键的值为数字型
 */

function sortCollectionByKey(_ref22) {
  var operate = _ref22.operate,
      item = _ref22.item,
      list = _ref22.list,
      sortKey = _ref22.sortKey,
      _ref22$sortMin = _ref22.sortMin,
      sortMin = _ref22$sortMin === void 0 ? 0 : _ref22$sortMin;

  if ((item || null) == null) {
    return list;
  }

  var beforeList = [];
  var afterList = [];
  var result = [];

  if ((list || []).length <= 1) {
    var text = "无需排序!";
    showWarnMessage({
      message: text
    });
    return list;
  }

  var itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number
  });
  (list || []).forEach(function (o) {
    var sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number
    });

    if (sort < itemSort) {
      beforeList.push(o);
    }

    if (sort > itemSort) {
      afterList.push(o);
    }
  });

  switch (operate) {
    case sortOperate.moveUp:
      if (itemSort === sortMin) {
        var _text4 = "已经排在首位!";
        showWarnMessage({
          message: _text4
        });
        return list;
      }

      (beforeList || []).forEach(function (o, index) {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          var o1 = item;
          o1[sortKey] -= 1;
          result.push(o1);
          var o2 = o;
          o2[sortKey] += 1;
          result.push(o2);
        }
      });
      result = result.concat(afterList);
      break;

    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortMin - 1) {
        var _text5 = "已经排在末位!";
        showWarnMessage({
          message: _text5
        });
        return list;
      }

      result = result.concat(beforeList);
      (afterList || []).forEach(function (o, index) {
        if (index === 0) {
          var o2 = o;
          o2[sortKey] -= 1;
          result.push(o2);
          var o1 = item;
          o1[sortKey] += 1;
          result.push(o1);
        } else {
          result.push(o);
        }
      });
      break;

    default:
      var _text3 = "\u4E0D\u7B26\u5408\u7684\u64CD\u4F5C\uFF0C\u5141\u8BB8\u7684\u64CD\u4F5C\u4E3A['".concat(sortOperate.moveUp, "','").concat(sortOperate.moveDown, "']!");

      showWarnMessage({
        message: _text3
      });
      break;
  }

  return result;
}
function queryStringify(data) {
  return lib_3(data);
}
function queryStringParse(data) {
  return lib_2(data);
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function emptyExport() {
  return {};
}

export { buildFieldDescription, buildFieldHelper, checkDevelopment, checkExist, checkFromConfig, checkLocalhost, clearLocalStorage, clearSessionStorage, cloneWithoutMethod, convertTarget, copyToClipboard, corsTarget, decodeBase64, defaultBaseState, defaultCommonState, defaultCoreState, defaultFormState, defaultListState, defaultPageListState, difference$1 as difference, ellipsis, emptyExport, encodeBase64, endsWith, evil, filter$1 as filter, find$1 as find, findIndex$1 as findIndex, fixedZero, formatDatetime, formatDecimal, formatMoney, formatMoneyToChinese, formatTarget, getAppInitConfigData, getBrowserInfo, getDerivedStateFromPropsForUrlParams, getDerivedStateFromPropsForUrlParamsCore, getGuid, getJsonFromLocalStorage, getJsonFromSessionStorage, getNearestLocalhostNotifyCache, getPathValue, getRandomColor, getStringFromLocalStorage, getStringFromSessionStorage, getValue$2 as getValue, getValueByKey, inCollection, isArray$7 as isArray, isBoolean$3 as isBoolean, isDate$2 as isDate, isDatetime, isEqual$1 as isEqual, isEqualBySerialize, isFunction$3 as isFunction, isInvalid, isMoney, isNull$1 as isNull, isNumber$1 as isNumber, isObject$3 as isObject, isString$3 as isString, isUndefined$2 as isUndefined, notify, notifySuccess, queryStringParse, queryStringify, recordError, recordLog, recordObject, recordText, refitCommonData, refitFieldDecoratorOption, removeEndMatch, removeFromArray, removeLastMatch, removeLocalStorage, removeNearestLocalhostNotifyCache, removeSessionStorage, replace$2 as replace, replaceTargetText, requestAnimFrame, reverse$1 as reverse, roundToTarget, saveJsonToLocalStorage, saveJsonToSessionStorage, saveStringToLocalStorage, saveStringToSessionStorage, searchFromList, seededRandom, setNearestLocalhostNotifyCache, showError, showErrorMessage, showInfoMessage, showLoadingMessage, showMessage, showOpenMessage, showRuntimeError, showSuccessMessage, showWarnMessage, showWarningMessage, sortBy$1 as sortBy, sortCollectionByKey, sortedUnique, stringIsNullOrWhiteSpace, toDatetime, toMoney, toNumber$1 as toNumber, toPercentage, toString$2 as toString, trim$1 as trim, trySendNearestLocalhostNotify };
