var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// append to string if non-empty
function _pad(str, pad) {
    return str.length ? str + pad : str;
}

// Extend given object's with other objects' properties, overriding existing ones if necessary
function _extend(dst) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    if (dst && sources) {
        var _loop = function _loop(src) {
            if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
                Object.getOwnPropertyNames(src).forEach(function (key) {
                    dst[key] = src[key];
                });
            }
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var src = _step.value;

                _loop(src);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    return dst;
};

exports.getFlavor = function (_squel) {
    return function () {
        var cls = _squel.cls;

        cls.DefaultQueryBuilderOptions.replaceSingleQuotes = true;
        cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = false;
        cls.DefaultQueryBuilderOptions.numberedParametersPrefix = '@';

        _squel.registerValueHandler(Date, function (date) {
            return '\'' + date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + '\'';
        });

        //�LIMIT,  OFFSET x and TOP x
        cls.MssqlLimitOffsetTopBlock = function (_cls$Block14) {
            _inherits(_class34, _cls$Block14);

            function _class34(options) {
                _classCallCheck(this, _class34);

                var _this38 = _possibleConstructorReturn(this, (_class34.__proto__ || Object.getPrototypeOf(_class34)).call(this, options));

                _this38._limits = null;
                _this38._offsets = null;

                // This is setup as one block to return many as they all have to use each others data at different times
                // The build String of EITHER LIMIT OR TOP should execute, never both.

                /**
                # Set the LIMIT/TOP transformation.
                #
                # Call this will override the previously set limit for this query. Also note that Passing 0 for 'max' will remove
                # the limit.
                */
                var _limit = function _limit(max) {
                    max = this._sanitizeLimitOffset(max);
                    this._parent._limits = max;
                };

                _this38.ParentBlock = function (_cls$Block15) {
                    _inherits(_class35, _cls$Block15);

                    function _class35(parent) {
                        _classCallCheck(this, _class35);

                        var _this39 = _possibleConstructorReturn(this, (_class35.__proto__ || Object.getPrototypeOf(_class35)).call(this, parent.options));

                        _this39._parent = parent;
                        return _this39;
                    }

                    return _class35;
                }(cls.Block);

                _this38.LimitBlock = function (_this38$ParentBlock) {
                    _inherits(_class36, _this38$ParentBlock);

                    function _class36(parent) {
                        _classCallCheck(this, _class36);

                        var _this40 = _possibleConstructorReturn(this, (_class36.__proto__ || Object.getPrototypeOf(_class36)).call(this, parent));

                        _this40.limit = _limit;
                        return _this40;
                    }

                    _createClass(_class36, [{
                        key: '_toParamString',
                        value: function _toParamString() {
                            var str = "";

                            if (this._parent._limits && this._parent._offsets) {
                                str = 'FETCH NEXT ' + this._parent._limits + ' ROWS ONLY';
                            }

                            return {
                                text: str,
                                values: []
                            };
                        }
                    }]);

                    return _class36;
                }(_this38.ParentBlock);

                _this38.TopBlock = function (_this38$ParentBlock2) {
                    _inherits(_class37, _this38$ParentBlock2);

                    function _class37(parent) {
                        _classCallCheck(this, _class37);

                        var _this41 = _possibleConstructorReturn(this, (_class37.__proto__ || Object.getPrototypeOf(_class37)).call(this, parent));

                        _this41.top = _limit;
                        return _this41;
                    }

                    _createClass(_class37, [{
                        key: '_toParamString',
                        value: function _toParamString() {
                            var str = "";

                            if (this._parent._limits && !this._parent._offsets) {
                                str = 'TOP (' + this._parent._limits + ')';
                            }

                            return {
                                text: str,
                                values: []
                            };
                        }
                    }]);

                    return _class37;
                }(_this38.ParentBlock);

                _this38.OffsetBlock = function (_this38$ParentBlock3) {
                    _inherits(_class38, _this38$ParentBlock3);

                    function _class38() {
                        _classCallCheck(this, _class38);

                        return _possibleConstructorReturn(this, (_class38.__proto__ || Object.getPrototypeOf(_class38)).apply(this, arguments));
                    }

                    _createClass(_class38, [{
                        key: 'offset',
                        value: function offset(start) {
                            this._parent._offsets = this._sanitizeLimitOffset(start);
                        }
                    }, {
                        key: '_toParamString',
                        value: function _toParamString() {
                            var str = "";

                            if (this._parent._offsets) {
                                str = 'OFFSET ' + this._parent._offsets + ' ROWS';
                            }

                            return {
                                text: str,
                                values: []
                            };
                        }
                    }]);

                    return _class38;
                }(_this38.ParentBlock);
                return _this38;
            }

            _createClass(_class34, [{
                key: 'LIMIT',
                value: function LIMIT() {
                    return new this.LimitBlock(this);
                }
            }, {
                key: 'TOP',
                value: function TOP() {
                    return new this.TopBlock(this);
                }
            }, {
                key: 'OFFSET',
                value: function OFFSET() {
                    return new this.OffsetBlock(this);
                }
            }]);

            return _class34;
        }(cls.Block);

        cls.MssqlUpdateTopBlock = function (_cls$Block16) {
            _inherits(_class39, _cls$Block16);

            function _class39(options) {
                _classCallCheck(this, _class39);

                var _this43 = _possibleConstructorReturn(this, (_class39.__proto__ || Object.getPrototypeOf(_class39)).call(this, options));

                _this43._limits = null;

                _this43.limit = _this43.top = function (max) {
                    _this43._limits = _this43._sanitizeLimitOffset(max);
                };
                return _this43;
            }

            _createClass(_class39, [{
                key: '_toParamString',
                value: function _toParamString() {
                    return {
                        text: this._limits ? 'TOP (' + this._limits + ')' : "",
                        values: []
                    };
                }
            }]);

            return _class39;
        }(cls.Block);

        cls.MssqlInsertFieldValueBlock = function (_cls$InsertFieldValue) {
            _inherits(_class40, _cls$InsertFieldValue);

            function _class40(options) {
                _classCallCheck(this, _class40);

                var _this44 = _possibleConstructorReturn(this, (_class40.__proto__ || Object.getPrototypeOf(_class40)).call(this, options));

                _this44._outputs = [];
                return _this44;
            }

            // add fields to the output clause


            _createClass(_class40, [{
                key: 'output',
                value: function output(fields) {
                    var _this45 = this;

                    if ('string' === typeof fields) {
                        this._outputs.push('INSERTED.' + this._sanitizeField(fields));
                    } else {
                        fields.forEach(function (f) {
                            _this45._outputs.push('INSERTED.' + _this45._sanitizeField(f));
                        });
                    }
                }
            }, {
                key: '_toParamString',
                value: function _toParamString(options) {
                    var ret = _get(_class40.prototype.__proto__ || Object.getPrototypeOf(_class40.prototype), '_toParamString', this).call(this, options);

                    if (ret.text.length && 0 < this._outputs.length) {
                        var innerStr = 'OUTPUT ' + this._outputs.join(', ') + ' ';

                        var valuesPos = ret.text.indexOf('VALUES');

                        ret.text = ret.text.substr(0, valuesPos) + innerStr + ret.text.substr(valuesPos);
                    }

                    return ret;
                }
            }]);

            return _class40;
        }(cls.InsertFieldValueBlock);

        cls.MssqlUpdateDeleteOutputBlock = function (_cls$Block17) {
            _inherits(_class41, _cls$Block17);

            function _class41(options) {
                _classCallCheck(this, _class41);

                var _this46 = _possibleConstructorReturn(this, (_class41.__proto__ || Object.getPrototypeOf(_class41)).call(this, options));

                _this46._outputs = [];
                return _this46;
            }

            /**
            # Add the given fields to the final result set.
            #
            # The parameter is an Object containing field names (or database functions) as the keys and aliases for the fields
            # as the values. If the value for a key is null then no alias is set for that field.
            #
            # Internally this method simply calls the field() method of this block to add each individual field.
            */


            _createClass(_class41, [{
                key: 'outputs',
                value: function outputs(_outputs) {
                    for (var output in _outputs) {
                        this.output(output, _outputs[output]);
                    }
                }

                /**
                # Add the given field to the final result set.
                #
                # The 'field' parameter does not necessarily have to be a fieldname. It can use database functions too,
                # e.g. DATE_FORMAT(a.started, "%H")
                #
                # An alias may also be specified for this field.
                */

            }, {
                key: 'output',
                value: function output(_output) {
                    var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                    _output = this._sanitizeField(_output);
                    alias = alias ? this._sanitizeFieldAlias(alias) : alias;

                    this._outputs.push({
                        name: this.options.forDelete ? 'DELETED.' + _output : 'INSERTED.' + _output,
                        alias: alias
                    });
                }
            }, {
                key: '_toParamString',
                value: function _toParamString(queryBuilder) {
                    var totalStr = "";

                    if (this._outputs.length) {
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;

                        try {
                            for (var _iterator15 = this._outputs[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var output = _step15.value;

                                totalStr = _pad(totalStr, ", ");

                                totalStr += output.name;

                                if (output.alias) {
                                    totalStr += ' AS ' + this._formatFieldAlias(output.alias);
                                }
                            }
                        } catch (err) {
                            _didIteratorError15 = true;
                            _iteratorError15 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                    _iterator15.return();
                                }
                            } finally {
                                if (_didIteratorError15) {
                                    throw _iteratorError15;
                                }
                            }
                        }

                        totalStr = 'OUTPUT ' + totalStr;
                    }

                    return {
                        text: totalStr,
                        values: []
                    };
                }
            }]);

            return _class41;
        }(cls.Block);

        // SELECT query builder.
        cls.Select = function (_cls$QueryBuilder5) {
            _inherits(_class42, _cls$QueryBuilder5);

            function _class42(options) {
                var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                _classCallCheck(this, _class42);

                var limitOffsetTopBlock = new cls.MssqlLimitOffsetTopBlock(options);

                blocks = blocks || [new cls.StringBlock(options, 'SELECT'), new cls.DistinctBlock(options), limitOffsetTopBlock.TOP(), new cls.GetFieldBlock(options), new cls.FromTableBlock(options), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.OrderByBlock(options), limitOffsetTopBlock.OFFSET(), limitOffsetTopBlock.LIMIT(), new cls.UnionBlock(options)];

                return _possibleConstructorReturn(this, (_class42.__proto__ || Object.getPrototypeOf(_class42)).call(this, options, blocks));
            }

            return _class42;
        }(cls.QueryBuilder);

        // Order By in update requires subquery

        // UPDATE query builder.
        cls.Update = function (_cls$QueryBuilder6) {
            _inherits(_class43, _cls$QueryBuilder6);

            function _class43(options) {
                var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                _classCallCheck(this, _class43);

                blocks = blocks || [new cls.StringBlock(options, 'UPDATE'), new cls.MssqlUpdateTopBlock(options), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.MssqlUpdateDeleteOutputBlock(options), new cls.WhereBlock(options)];

                return _possibleConstructorReturn(this, (_class43.__proto__ || Object.getPrototypeOf(_class43)).call(this, options, blocks));
            }

            return _class43;
        }(cls.QueryBuilder);

        // Order By and Limit/Top in delete requires subquery

        // DELETE query builder.
        cls.Delete = function (_cls$QueryBuilder7) {
            _inherits(_class44, _cls$QueryBuilder7);

            function _class44(options) {
                var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                _classCallCheck(this, _class44);

                blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.TargetTableBlock(options), new cls.FromTableBlock(_extend({}, options, { singleTable: true })), new cls.JoinBlock(options), new cls.MssqlUpdateDeleteOutputBlock(_extend({}, options, { forDelete: true })), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

                return _possibleConstructorReturn(this, (_class44.__proto__ || Object.getPrototypeOf(_class44)).call(this, options, blocks));
            }

            return _class44;
        }(cls.QueryBuilder);

        // An INSERT query builder.
        cls.Insert = function (_cls$QueryBuilder8) {
            _inherits(_class45, _cls$QueryBuilder8);

            function _class45(options) {
                var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                _classCallCheck(this, _class45);

                blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.MssqlInsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)];

                return _possibleConstructorReturn(this, (_class45.__proto__ || Object.getPrototypeOf(_class45)).call(this, options, blocks));
            }

            return _class45;
        }(cls.QueryBuilder);
    };
};
