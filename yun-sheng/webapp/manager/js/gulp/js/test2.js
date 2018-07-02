!function($) {
    "use strict";
    $.jgrid = $.jgrid || {},
        $.extend($.jgrid, {
            version: "4.6.0",
            htmlDecode: function(e) {
                return e && ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0)) ? "" : e ? String(e).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : e
            },
            htmlEncode: function(e) {
                return e ? String(e).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e
            },
            format: function(e) {
                var t = $.makeArray(arguments).slice(1);
                return null == e && (e = ""),
                    e.replace(/\{(\d+)\}/g, function(e, i) {
                        return t[i]
                    })
            },
            msie: "Microsoft Internet Explorer" === navigator.appName,
            msiever: function() {
                var e = -1
                    , t = navigator.userAgent;
                return null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(t) && (e = parseFloat(RegExp.$1)),
                    e
            },
            getCellIndex: function(e) {
                var t = $(e);
                return t.is("tr") ? -1 : (t = (t.is("td") || t.is("th") ? t : t.closest("td,th"))[0],
                    $.jgrid.msie ? $.inArray(t, t.parentNode.cells) : t.cellIndex)
            },
            stripHtml: function(e) {
                var t = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
                return (e = String(e)) ? (e = e.replace(t, "")) && "&nbsp;" !== e && "&#160;" !== e ? e.replace(/\"/g, "'") : "" : e
            },
            stripPref: function(e, t) {
                var i = $.type(e);
                return "string" !== i && "number" !== i || (t = "" !== (e = String(e)) ? String(t).replace(String(e), "") : t),
                    t
            },
            parse: function(jsonString) {
                var js = jsonString;
                return "while(1);" === js.substr(0, 9) && (js = js.substr(9)),
                "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)),
                js || (js = "{}"),
                    !0 === $.jgrid.useJSON && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
            },
            parseDate: function(e, t, i, r) {
                var a, o, d, s = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, l = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, n = /[^-+\dA-Z]/g, p = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"), c = "string" == typeof t ? t.match(p) : null, u = function(e, t) {
                    for (e = String(e),
                             t = parseInt(t, 10) || 2; e.length < t; )
                        e = "0" + e;
                    return e
                }, h = {
                    m: 1,
                    d: 1,
                    y: 1970,
                    h: 0,
                    i: 0,
                    s: 0,
                    u: 0
                }, g = 0, f = function(e, t) {
                    return 0 === e ? 12 === t && (t = 0) : 12 !== t && (t += 12),
                        t
                };
                if (void 0 === r && (r = $.jgrid.formatter.date),
                    void 0 === r.parseRe && (r.parseRe = /[#%\\\/:_;.,\t\s-]/),
                    r.masks.hasOwnProperty(e) && (e = r.masks[e]),
                    t && null != t)
                    if (isNaN(t - 0) || "u" !== String(e).toLowerCase())
                        if (t.constructor === Date)
                            g = t;
                        else if (null !== c) {
                            if (g = new Date(parseInt(c[1], 10)),
                                    c[3]) {
                                m = 60 * Number(c[5]) + Number(c[6]);
                                m *= "-" === c[4] ? 1 : -1,
                                    m -= g.getTimezoneOffset(),
                                    g.setTime(Number(Number(g) + 60 * m * 1e3))
                            }
                        } else {
                            var m = 0;
                            for ("ISO8601Long" === r.srcformat && "Z" === t.charAt(t.length - 1) && (m -= (new Date).getTimezoneOffset()),
                                     t = String(t).replace(/\T/g, "#").replace(/\t/, "%").split(r.parseRe),
                                     o = 0,
                                     d = (e = e.replace(/\T/g, "#").replace(/\t/, "%").split(r.parseRe)).length; o < d; o++)
                                "M" === e[o] && -1 !== (a = $.inArray(t[o], r.monthNames)) && a < 12 && (t[o] = a + 1,
                                    h.m = t[o]),
                                "F" === e[o] && -1 !== (a = $.inArray(t[o], r.monthNames, 12)) && a > 11 && (t[o] = a + 1 - 12,
                                    h.m = t[o]),
                                "a" === e[o] && -1 !== (a = $.inArray(t[o], r.AmPm)) && a < 2 && t[o] === r.AmPm[a] && (t[o] = a,
                                    h.h = f(t[o], h.h)),
                                "A" === e[o] && -1 !== (a = $.inArray(t[o], r.AmPm)) && a > 1 && t[o] === r.AmPm[a] && (t[o] = a - 2,
                                    h.h = f(t[o], h.h)),
                                "g" === e[o] && (h.h = parseInt(t[o], 10)),
                                void 0 !== t[o] && (h[e[o].toLowerCase()] = parseInt(t[o], 10));
                            if (h.f && (h.m = h.f),
                                0 === h.m && 0 === h.y && 0 === h.d)
                                return "&#160;";
                            h.m = parseInt(h.m, 10) - 1;
                            var v = h.y;
                            v >= 70 && v <= 99 ? h.y = 1900 + h.y : v >= 0 && v <= 69 && (h.y = 2e3 + h.y),
                                g = new Date(h.y,h.m,h.d,h.h,h.i,h.s,h.u),
                            m > 0 && g.setTime(Number(Number(g) + 60 * m * 1e3))
                        }
                    else
                        g = new Date(1e3 * parseFloat(t));
                else
                    g = new Date(h.y,h.m,h.d,h.h,h.i,h.s,h.u);
                if (void 0 === i)
                    return g;
                r.masks.hasOwnProperty(i) ? i = r.masks[i] : i || (i = "Y-m-d");
                var j = g.getHours()
                    , b = g.getMinutes()
                    , w = g.getDate()
                    , q = g.getMonth() + 1
                    , y = g.getTimezoneOffset()
                    , D = g.getSeconds()
                    , x = g.getMilliseconds()
                    , _ = g.getDay()
                    , C = g.getFullYear()
                    , I = (_ + 6) % 7 + 1
                    , G = (new Date(C,q - 1,w) - new Date(C,0,1)) / 864e5
                    , F = {
                    d: u(w),
                    D: r.dayNames[_],
                    j: w,
                    l: r.dayNames[_ + 7],
                    N: I,
                    S: r.S(w),
                    w: _,
                    z: G,
                    W: I < 5 ? Math.floor((G + I - 1) / 7) + 1 : Math.floor((G + I - 1) / 7) || ((new Date(C - 1,0,1).getDay() + 6) % 7 < 4 ? 53 : 52),
                    F: r.monthNames[q - 1 + 12],
                    m: u(q),
                    M: r.monthNames[q - 1],
                    n: q,
                    t: "?",
                    L: "?",
                    o: "?",
                    Y: C,
                    y: String(C).substring(2),
                    a: j < 12 ? r.AmPm[0] : r.AmPm[1],
                    A: j < 12 ? r.AmPm[2] : r.AmPm[3],
                    B: "?",
                    g: j % 12 || 12,
                    G: j,
                    h: u(j % 12 || 12),
                    H: u(j),
                    i: u(b),
                    s: u(D),
                    u: x,
                    e: "?",
                    I: "?",
                    O: (y > 0 ? "-" : "+") + u(100 * Math.floor(Math.abs(y) / 60) + Math.abs(y) % 60, 4),
                    P: "?",
                    T: (String(g).match(l) || [""]).pop().replace(n, ""),
                    Z: "?",
                    c: "?",
                    r: "?",
                    U: Math.floor(g / 1e3)
                };
                return i.replace(s, function(e) {
                    return F.hasOwnProperty(e) ? F[e] : e.substring(1)
                })
            },
            jqID: function(e) {
                return String(e).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
            },
            guid: 1,
            uidPref: "jqg",
            randId: function(e) {
                return (e || $.jgrid.uidPref) + $.jgrid.guid++
            },
            getAccessor: function(e, t) {
                var i, r, a = [];
                if ("function" == typeof t)
                    return t(e);
                if (void 0 === (i = e[t]))
                    try {
                        if ("string" == typeof t && (a = t.split(".")),
                                r = a.length)
                            for (i = e; i && r--; )
                                i = i[a.shift()]
                    } catch (e) {}
                return i
            },
            getXmlData: function(e, t, i) {
                var r, a = "string" == typeof t ? t.match(/^(.*)\[(\w+)\]$/) : null;
                return "function" == typeof t ? t(e) : a && a[2] ? a[1] ? $(a[1], e).attr(a[2]) : $(e).attr(a[2]) : (r = $(t, e),
                    i ? r : r.length > 0 ? $(r).text() : void 0)
            },
            cellWidth: function() {
                var e = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>")
                    , t = e.appendTo("body").find("td").width();
                return e.remove(),
                Math.abs(t - 5) > .1
            },
            cell_width: !0,
            ajaxOptions: {},
            from: function(source) {
                var QueryObject = function(d, q) {
                    "string" == typeof d && (d = $.data(d));
                    var self = this
                        , _data = d
                        , _usecase = !0
                        , _trim = !1
                        , _query = q
                        , _stripNum = /[\$,%]/g
                        , _lastCommand = null
                        , _lastField = null
                        , _orDepth = 0
                        , _negate = !1
                        , _queuedOperator = ""
                        , _sorting = []
                        , _useProperties = !0;
                    if ("object" != typeof d || !d.push)
                        throw "data provides is not an array";
                    return d.length > 0 && (_useProperties = "object" == typeof d[0]),
                        this._hasData = function() {
                            return null !== _data && 0 !== _data.length
                        }
                        ,
                        this._getStr = function(e) {
                            var t = [];
                            return _trim && t.push("jQuery.trim("),
                                t.push("String(" + e + ")"),
                            _trim && t.push(")"),
                            _usecase || t.push(".toLowerCase()"),
                                t.join("")
                        }
                        ,
                        this._strComp = function(e) {
                            return "string" == typeof e ? ".toString()" : ""
                        }
                        ,
                        this._group = function(e, t) {
                            return {
                                field: e.toString(),
                                unique: t,
                                items: []
                            }
                        }
                        ,
                        this._toStr = function(e) {
                            return _trim && (e = $.trim(e)),
                                e = e.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'),
                                _usecase ? e : e.toLowerCase()
                        }
                        ,
                        this._funcLoop = function(e) {
                            var t = [];
                            return $.each(_data, function(i, r) {
                                t.push(e(r))
                            }),
                                t
                        }
                        ,
                        this._append = function(e) {
                            var t;
                            for (null === _query ? _query = "" : _query += "" === _queuedOperator ? " && " : _queuedOperator,
                                     t = 0; t < _orDepth; t++)
                                _query += "(";
                            _negate && (_query += "!"),
                                _query += "(" + e + ")",
                                _negate = !1,
                                _queuedOperator = "",
                                _orDepth = 0
                        }
                        ,
                        this._setCommand = function(e, t) {
                            _lastCommand = e,
                                _lastField = t
                        }
                        ,
                        this._resetNegate = function() {
                            _negate = !1
                        }
                        ,
                        this._repeatCommand = function(e, t) {
                            return null === _lastCommand ? self : null !== e && null !== t ? _lastCommand(e, t) : null === _lastField ? _lastCommand(e) : _useProperties ? _lastCommand(_lastField, e) : _lastCommand(e)
                        }
                        ,
                        this._equals = function(e, t) {
                            return 0 === self._compare(e, t, 1)
                        }
                        ,
                        this._compare = function(e, t, i) {
                            var r = Object.prototype.toString;
                            return void 0 === i && (i = 1),
                            void 0 === e && (e = null),
                            void 0 === t && (t = null),
                                null === e && null === t ? 0 : null === e && null !== t ? 1 : null !== e && null === t ? -1 : "[object Date]" === r.call(e) && "[object Date]" === r.call(t) ? e < t ? -i : e > t ? i : 0 : (_usecase || "number" == typeof e || "number" == typeof t || (e = String(e),
                                    t = String(t)),
                                    e < t ? -i : e > t ? i : 0)
                        }
                        ,
                        this._performSort = function() {
                            0 !== _sorting.length && (_data = self._doSort(_data, 0))
                        }
                        ,
                        this._doSort = function(e, t) {
                            var i = _sorting[t].by
                                , r = _sorting[t].dir
                                , a = _sorting[t].type
                                , o = _sorting[t].datefmt
                                , d = _sorting[t].sfunc;
                            if (t === _sorting.length - 1)
                                return self._getOrder(e, i, r, a, o, d);
                            t++;
                            var s, l, n, p = self._getGroup(e, i, r, a, o), c = [];
                            for (s = 0; s < p.length; s++)
                                for (n = self._doSort(p[s].items, t),
                                         l = 0; l < n.length; l++)
                                    c.push(n[l]);
                            return c
                        }
                        ,
                        this._getOrder = function(e, t, i, r, a, o) {
                            var d, s, l, n, p = [], c = [], u = "a" === i ? 1 : -1;
                            void 0 === r && (r = "text"),
                                n = "float" === r || "number" === r || "currency" === r || "numeric" === r ? function(e) {
                                        var t = parseFloat(String(e).replace(_stripNum, ""));
                                        return isNaN(t) ? Number.NEGATIVE_INFINITY : t
                                    }
                                    : "int" === r || "integer" === r ? function(e) {
                                            return e ? parseFloat(String(e).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY
                                        }
                                        : "date" === r || "datetime" === r ? function(e) {
                                                return $.jgrid.parseDate(a, e).getTime()
                                            }
                                            : $.isFunction(r) ? r : function(e) {
                                                return e = e ? $.trim(String(e)) : "",
                                                    _usecase ? e : e.toLowerCase()
                                            }
                                ,
                                $.each(e, function(e, i) {
                                    void 0 === (s = "" !== t ? $.jgrid.getAccessor(i, t) : i) && (s = ""),
                                        s = n(s, i),
                                        c.push({
                                            vSort: s,
                                            index: e
                                        })
                                }),
                                $.isFunction(o) ? c.sort(function(e, t) {
                                    return e = e.vSort,
                                        t = t.vSort,
                                        o.call(this, e, t, u)
                                }) : c.sort(function(e, t) {
                                    return e = e.vSort,
                                        t = t.vSort,
                                        self._compare(e, t, u)
                                }),
                                l = 0;
                            for (var h = e.length; l < h; )
                                d = c[l].index,
                                    p.push(e[d]),
                                    l++;
                            return p
                        }
                        ,
                        this._getGroup = function(e, t, i, r, a) {
                            var o, d = [], s = null, l = null;
                            return $.each(self._getOrder(e, t, i, r, a), function(e, i) {
                                null == (o = $.jgrid.getAccessor(i, t)) && (o = ""),
                                self._equals(l, o) || (l = o,
                                null !== s && d.push(s),
                                    s = self._group(t, o)),
                                    s.items.push(i)
                            }),
                            null !== s && d.push(s),
                                d
                        }
                        ,
                        this.ignoreCase = function() {
                            return _usecase = !1,
                                self
                        }
                        ,
                        this.useCase = function() {
                            return _usecase = !0,
                                self
                        }
                        ,
                        this.trim = function() {
                            return _trim = !0,
                                self
                        }
                        ,
                        this.noTrim = function() {
                            return _trim = !1,
                                self
                        }
                        ,
                        this.execute = function() {
                            var match = _query
                                , results = [];
                            return null === match ? self : ($.each(_data, function() {
                                eval(match) && results.push(this)
                            }),
                                _data = results,
                                self)
                        }
                        ,
                        this.data = function() {
                            return _data
                        }
                        ,
                        this.select = function(e) {
                            if (self._performSort(),
                                    !self._hasData())
                                return [];
                            if (self.execute(),
                                    $.isFunction(e)) {
                                var t = [];
                                return $.each(_data, function(i, r) {
                                    t.push(e(r))
                                }),
                                    t
                            }
                            return _data
                        }
                        ,
                        this.hasMatch = function() {
                            return !!self._hasData() && (self.execute(),
                            _data.length > 0)
                        }
                        ,
                        this.andNot = function(e, t, i) {
                            return _negate = !_negate,
                                self.and(e, t, i)
                        }
                        ,
                        this.orNot = function(e, t, i) {
                            return _negate = !_negate,
                                self.or(e, t, i)
                        }
                        ,
                        this.not = function(e, t, i) {
                            return self.andNot(e, t, i)
                        }
                        ,
                        this.and = function(e, t, i) {
                            return _queuedOperator = " && ",
                                void 0 === e ? self : self._repeatCommand(e, t, i)
                        }
                        ,
                        this.or = function(e, t, i) {
                            return _queuedOperator = " || ",
                                void 0 === e ? self : self._repeatCommand(e, t, i)
                        }
                        ,
                        this.orBegin = function() {
                            return _orDepth++,
                                self
                        }
                        ,
                        this.orEnd = function() {
                            return null !== _query && (_query += ")"),
                                self
                        }
                        ,
                        this.isNot = function(e) {
                            return _negate = !_negate,
                                self.is(e)
                        }
                        ,
                        this.is = function(e) {
                            return self._append("this." + e),
                                self._resetNegate(),
                                self
                        }
                        ,
                        this._compareValues = function(e, t, i, r, a) {
                            var o;
                            o = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + t + "')" : "this",
                            void 0 === i && (i = null);
                            var d = i
                                , s = void 0 === a.stype ? "text" : a.stype;
                            if (null !== i)
                                switch (s) {
                                    case "int":
                                    case "integer":
                                        o = "parseInt(" + o + ",10)",
                                            d = "parseInt(" + (d = isNaN(Number(d)) || "" === d ? "0" : d) + ",10)";
                                        break;
                                    case "float":
                                    case "number":
                                    case "numeric":
                                        d = String(d).replace(_stripNum, ""),
                                            o = "parseFloat(" + o + ")",
                                            d = "parseFloat(" + (d = isNaN(Number(d)) || "" === d ? "0" : d) + ")";
                                        break;
                                    case "date":
                                    case "datetime":
                                        d = String($.jgrid.parseDate(a.newfmt || "Y-m-d", d).getTime()),
                                            o = 'jQuery.jgrid.parseDate("' + a.srcfmt + '",' + o + ").getTime()";
                                        break;
                                    default:
                                        o = self._getStr(o),
                                            d = self._getStr('"' + self._toStr(d) + '"')
                                }
                            return self._append(o + " " + r + " " + d),
                                self._setCommand(e, t),
                                self._resetNegate(),
                                self
                        }
                        ,
                        this.equals = function(e, t, i) {
                            return self._compareValues(self.equals, e, t, "==", i)
                        }
                        ,
                        this.notEquals = function(e, t, i) {
                            return self._compareValues(self.equals, e, t, "!==", i)
                        }
                        ,
                        this.isNull = function(e, t, i) {
                            return self._compareValues(self.equals, e, null, "===", i)
                        }
                        ,
                        this.greater = function(e, t, i) {
                            return self._compareValues(self.greater, e, t, ">", i)
                        }
                        ,
                        this.less = function(e, t, i) {
                            return self._compareValues(self.less, e, t, "<", i)
                        }
                        ,
                        this.greaterOrEquals = function(e, t, i) {
                            return self._compareValues(self.greaterOrEquals, e, t, ">=", i)
                        }
                        ,
                        this.lessOrEquals = function(e, t, i) {
                            return self._compareValues(self.lessOrEquals, e, t, "<=", i)
                        }
                        ,
                        this.startsWith = function(e, t) {
                            var i = null == t ? e : t
                                , r = _trim ? $.trim(i.toString()).length : i.toString().length;
                            return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + e + "')") + ".substr(0," + r + ") == " + self._getStr('"' + self._toStr(t) + '"')) : (null != t && (r = _trim ? $.trim(t.toString()).length : t.toString().length),
                                self._append(self._getStr("this") + ".substr(0," + r + ") == " + self._getStr('"' + self._toStr(e) + '"'))),
                                self._setCommand(self.startsWith, e),
                                self._resetNegate(),
                                self
                        }
                        ,
                        this.endsWith = function(e, t) {
                            var i = null == t ? e : t
                                , r = _trim ? $.trim(i.toString()).length : i.toString().length;
                            return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + e + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + e + "')") + ".length-" + r + "," + r + ') == "' + self._toStr(t) + '"') : self._append(self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(e) + '".length,"' + self._toStr(e) + '".length) == "' + self._toStr(e) + '"'),
                                self._setCommand(self.endsWith, e),
                                self._resetNegate(),
                                self
                        }
                        ,
                        this.contains = function(e, t) {
                            return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + e + "')") + '.indexOf("' + self._toStr(t) + '",0) > -1') : self._append(self._getStr("this") + '.indexOf("' + self._toStr(e) + '",0) > -1'),
                                self._setCommand(self.contains, e),
                                self._resetNegate(),
                                self
                        }
                        ,
                        this.groupBy = function(e, t, i, r) {
                            return self._hasData() ? self._getGroup(_data, e, t, i, r) : null
                        }
                        ,
                        this.orderBy = function(e, t, i, r, a) {
                            return t = null == t ? "a" : $.trim(t.toString().toLowerCase()),
                            null == i && (i = "text"),
                            null == r && (r = "Y-m-d"),
                            null == a && (a = !1),
                            "desc" !== t && "descending" !== t || (t = "d"),
                            "asc" !== t && "ascending" !== t || (t = "a"),
                                _sorting.push({
                                    by: e,
                                    dir: t,
                                    type: i,
                                    datefmt: r,
                                    sfunc: a
                                }),
                                self
                        }
                        ,
                        self
                };
                return new QueryObject(source,null)
            },
            getMethod: function(e) {
                return this.getAccessor($.fn.jqGrid, e)
            },
            extend: function(e) {
                $.extend($.fn.jqGrid, e),
                this.no_legacy_api || $.fn.extend(e)
            }
        }),
        $.fn.jqGrid = function(e) {
            if ("string" == typeof e) {
                var t = $.jgrid.getMethod(e);
                if (!t)
                    throw "jqGrid - No such method: " + e;
                var i = $.makeArray(arguments).slice(1);
                return t.apply(this, i)
            }
            return this.each(function() {
                if (!this.grid) {
                    var t = $.extend(!0, {
                        url: "",
                        height: 150,
                        page: 1,
                        rowNum: 20,
                        rowTotal: null,
                        records: 0,
                        pager: "",
                        pgbuttons: !0,
                        pginput: !0,
                        colModel: [],
                        rowList: [],
                        colNames: [],
                        sortorder: "asc",
                        sortname: "",
                        datatype: "xml",
                        mtype: "GET",
                        altRows: !1,
                        selarrrow: [],
                        savedRow: [],
                        shrinkToFit: !0,
                        xmlReader: {},
                        jsonReader: {},
                        subGrid: !1,
                        subGridModel: [],
                        reccount: 0,
                        lastpage: 0,
                        lastsort: 0,
                        selrow: null,
                        beforeSelectRow: null,
                        onSelectRow: null,
                        onSortCol: null,
                        ondblClickRow: null,
                        onRightClickRow: null,
                        onPaging: null,
                        onSelectAll: null,
                        onInitGrid: null,
                        loadComplete: null,
                        gridComplete: null,
                        loadError: null,
                        loadBeforeSend: null,
                        afterInsertRow: null,
                        beforeRequest: null,
                        beforeProcessing: null,
                        onHeaderClick: null,
                        viewrecords: !1,
                        loadonce: !1,
                        multiselect: !1,
                        multikey: !1,
                        editurl: null,
                        search: !1,
                        caption: "",
                        hidegrid: !0,
                        hiddengrid: !1,
                        postData: {},
                        userData: {},
                        treeGrid: !1,
                        treeGridModel: "nested",
                        treeReader: {},
                        treeANode: -1,
                        ExpandColumn: null,
                        tree_root_level: 0,
                        prmNames: {
                            page: "page",
                            rows: "rows",
                            sort: "sidx",
                            order: "sord",
                            search: "_search",
                            nd: "nd",
                            id: "id",
                            oper: "oper",
                            editoper: "edit",
                            addoper: "add",
                            deloper: "del",
                            subgridid: "id",
                            npage: null,
                            totalrows: "totalrows"
                        },
                        forceFit: !1,
                        gridstate: "visible",
                        cellEdit: !1,
                        cellsubmit: "remote",
                        nv: 0,
                        loadui: "enable",
                        toolbar: [!1, ""],
                        scroll: !1,
                        multiboxonly: !1,
                        deselectAfterSort: !0,
                        scrollrows: !1,
                        autowidth: !1,
                        scrollOffset: 18,
                        cellLayout: 5,
                        subGridWidth: 20,
                        multiselectWidth: 20,
                        gridview: !1,
                        rownumWidth: 25,
                        rownumbers: !1,
                        pagerpos: "center",
                        recordpos: "right",
                        footerrow: !1,
                        userDataOnFooter: !1,
                        hoverrows: !0,
                        altclass: "ui-priority-secondary",
                        viewsortcols: [!1, "vertical", !0],
                        resizeclass: "",
                        autoencode: !1,
                        remapColumns: [],
                        ajaxGridOptions: {},
                        direction: "ltr",
                        toppager: !1,
                        headertitles: !1,
                        scrollTimeout: 40,
                        data: [],
                        _index: {},
                        grouping: !1,
                        groupingView: {
                            groupField: [],
                            groupOrder: [],
                            groupText: [],
                            groupColumnShow: [],
                            groupSummary: [],
                            showSummaryOnHide: !1,
                            sortitems: [],
                            sortnames: [],
                            summary: [],
                            summaryval: [],
                            plusicon: "ui-icon-circlesmall-plus",
                            minusicon: "ui-icon-circlesmall-minus",
                            displayField: [],
                            groupSummaryPos: [],
                            formatDisplayField: [],
                            _locgr: !1
                        },
                        ignoreCase: !1,
                        cmTemplate: {},
                        idPrefix: "",
                        multiSort: !1,
                        minColWidth: 33
                    }, $.jgrid.defaults, e || {})
                        , i = this
                        , r = {
                        headers: [],
                        cols: [],
                        footers: [],
                        dragStart: function(e, r, a) {
                            var o = $(this.bDiv).offset().left;
                            this.resizing = {
                                idx: e,
                                startX: r.pageX,
                                sOL: r.pageX - o
                            },
                                this.hDiv.style.cursor = "col-resize",
                                this.curGbox = $("#rs_m" + $.jgrid.jqID(t.id), "#gbox_" + $.jgrid.jqID(t.id)),
                                this.curGbox.css({
                                    display: "block",
                                    left: r.pageX - o,
                                    top: a[1],
                                    height: a[2]
                                }),
                                $(i).triggerHandler("jqGridResizeStart", [r, e]),
                            $.isFunction(t.resizeStart) && t.resizeStart.call(i, r, e),
                                document.onselectstart = function() {
                                    return !1
                                }
                        },
                        dragMove: function(e) {
                            if (this.resizing) {
                                var i, r, a = e.pageX - this.resizing.startX, o = this.headers[this.resizing.idx], d = "ltr" === t.direction ? o.width + a : o.width - a;
                                d > 33 && (this.curGbox.css({
                                    left: this.resizing.sOL + a
                                }),
                                    !0 === t.forceFit ? (i = this.headers[this.resizing.idx + t.nv],
                                    (r = "ltr" === t.direction ? i.width - a : i.width + a) > t.minColWidth && (o.newWidth = d,
                                        i.newWidth = r)) : (this.newWidth = "ltr" === t.direction ? t.tblwidth + a : t.tblwidth - a,
                                        o.newWidth = d))
                            }
                        },
                        dragEnd: function() {
                            if (this.hDiv.style.cursor = "default",
                                    this.resizing) {
                                var e = this.resizing.idx
                                    , r = this.headers[e].newWidth || this.headers[e].width;
                                r = parseInt(r, 10),
                                    this.resizing = !1,
                                    $("#rs_m" + $.jgrid.jqID(t.id)).css("display", "none"),
                                    t.colModel[e].width = r,
                                    this.headers[e].width = r,
                                    this.headers[e].el.style.width = r + "px",
                                    this.cols[e].style.width = r + "px",
                                this.footers.length > 0 && (this.footers[e].style.width = r + "px"),
                                    !0 === t.forceFit ? (r = this.headers[e + t.nv].newWidth || this.headers[e + t.nv].width,
                                        this.headers[e + t.nv].width = r,
                                        this.headers[e + t.nv].el.style.width = r + "px",
                                        this.cols[e + t.nv].style.width = r + "px",
                                    this.footers.length > 0 && (this.footers[e + t.nv].style.width = r + "px"),
                                        t.colModel[e + t.nv].width = r) : (t.tblwidth = this.newWidth || t.tblwidth,
                                        $("table:first", this.bDiv).css("width", t.tblwidth + "px"),
                                        $("table:first", this.hDiv).css("width", t.tblwidth + "px"),
                                        this.hDiv.scrollLeft = this.bDiv.scrollLeft,
                                    t.footerrow && ($("table:first", this.sDiv).css("width", t.tblwidth + "px"),
                                        this.sDiv.scrollLeft = this.bDiv.scrollLeft)),
                                    $(i).triggerHandler("jqGridResizeStop", [r, e]),
                                $.isFunction(t.resizeStop) && t.resizeStop.call(i, r, e)
                            }
                            this.curGbox = null,
                                document.onselectstart = function() {
                                    return !0
                                }
                        },
                        populateVisible: function() {
                            r.timer && clearTimeout(r.timer),
                                r.timer = null;
                            var e = $(r.bDiv).height();
                            if (e) {
                                var i, a, o = $("table:first", r.bDiv);
                                if (o[0].rows.length)
                                    try {
                                        i = o[0].rows[1],
                                            a = i ? $(i).outerHeight() || r.prevRowHeight : r.prevRowHeight
                                    } catch (e) {
                                        a = r.prevRowHeight
                                    }
                                if (a) {
                                    r.prevRowHeight = a;
                                    var d, s, l, n = t.rowNum, p = r.scrollTop = r.bDiv.scrollTop, c = Math.round(o.position().top) - p, u = c + o.height(), h = a * n;
                                    if (u < e && c <= 0 && (void 0 === t.lastpage || (parseInt((u + p + h - 1) / h, 10) || 0) <= t.lastpage) && (s = parseInt((e - u + h - 1) / h, 10) || 1,
                                            u >= 0 || s < 2 || !0 === t.scroll ? (d = $(r.bDiv).find('tr:not(".jqgfirstrow")').length / t.rowNum + 1,
                                                c = -1) : c = 1),
                                        c > 0 && (d = (parseInt(p / h, 10) || 0) + 1,
                                            s = (parseInt((p + e) / h, 10) || 0) + 2 - d,
                                            l = !0),
                                            s) {
                                        if (t.lastpage && (d > t.lastpage || 1 === t.lastpage || d === t.page && d === t.lastpage))
                                            return;
                                        r.hDiv.loading ? r.timer = setTimeout(r.populateVisible, t.scrollTimeout) : (t.page = d,
                                        l && (r.selectionPreserver(o[0]),
                                            r.emptyRows.call(o[0], !1, !1)),
                                            r.populate(s))
                                    }
                                }
                            }
                        },
                        scrollGrid: function(e) {
                            if (t.scroll) {
                                var i = r.bDiv.scrollTop;
                                void 0 === r.scrollTop && (r.scrollTop = 0),
                                i !== r.scrollTop && (r.scrollTop = i,
                                r.timer && clearTimeout(r.timer),
                                    r.timer = setTimeout(r.populateVisible, t.scrollTimeout))
                            }
                            r.hDiv.scrollLeft = r.bDiv.scrollLeft,
                            t.footerrow && (r.sDiv.scrollLeft = r.bDiv.scrollLeft),
                            e && e.stopPropagation()
                        },
                        selectionPreserver: function(e) {
                            var t = e.p
                                , i = t.selrow
                                , r = t.selarrrow ? $.makeArray(t.selarrrow) : null
                                , a = e.grid.bDiv.scrollLeft
                                , o = function() {
                                var d;
                                if (t.selrow = null,
                                        t.selarrrow = [],
                                    t.multiselect && r && r.length > 0)
                                    for (d = 0; d < r.length; d++)
                                        r[d] !== i && $(e).jqGrid("setSelection", r[d], !1, null);
                                i && $(e).jqGrid("setSelection", i, !1, null),
                                    e.grid.bDiv.scrollLeft = a,
                                    $(e).unbind(".selectionPreserver", o)
                            };
                            $(e).bind("jqGridGridComplete.selectionPreserver", o)
                        }
                    };
                    if ("TABLE" === this.tagName.toUpperCase() && null != this.id)
                        if (void 0 !== document.documentMode && document.documentMode <= 5)
                            alert("Grid can not be used in this ('quirks') mode!");
                        else {
                            $(this).empty().attr("tabindex", "0"),
                                this.p = t,
                                this.p.useProp = !!$.fn.prop;
                            var a, o;
                            if (0 === this.p.colNames.length)
                                for (a = 0; a < this.p.colModel.length; a++)
                                    this.p.colNames[a] = this.p.colModel[a].label || this.p.colModel[a].name,
                                    this.p.colModel[a].nameExt && (this.p.colNames[a] += this.p.colModel[a].nameExt);
                            if (this.p.colNames.length === this.p.colModel.length) {
                                var d = $("<div class='ui-jqgrid-view'></div>")
                                    , s = $.jgrid.msie;
                                i.p.direction = $.trim(i.p.direction.toLowerCase()),
                                -1 === $.inArray(i.p.direction, ["ltr", "rtl"]) && (i.p.direction = "ltr"),
                                    o = i.p.direction,
                                    $(d).insertBefore(this),
                                    $(this).removeClass("scroll").appendTo(d);
                                var l = $("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
                                $(l).attr({
                                    id: "gbox_" + this.id,
                                    dir: o
                                }).insertBefore(d),
                                    $(d).attr("id", "gview_" + this.id).appendTo(l),
                                    $("<div class='ui-widget-overlay jqgrid-overlay' id='lui_" + this.id + "'></div>").insertBefore(d),
                                    $("<div class='loading ui-state-default ui-state-active' id='load_" + this.id + "'>" + this.p.loadtext + "</div>").insertBefore(d),
                                    $(this).attr({
                                        cellspacing: "0",
                                        cellpadding: "0",
                                        border: "0",
                                        role: "grid",
                                        "aria-multiselectable": !!this.p.multiselect,
                                        "aria-labelledby": "gbox_" + this.id
                                    });
                                var n = ["shiftKey", "altKey", "ctrlKey"]
                                    , p = function(e, t) {
                                    return e = parseInt(e, 10),
                                        isNaN(e) ? t || 0 : e
                                }
                                    , c = function(e, t, a, o, d, s) {
                                    var l, n = i.p.colModel[e], p = n.align, c = 'style="', u = n.classes, h = n.name, g = [];
                                    return p && (c += "text-align:" + p + ";"),
                                    !0 === n.hidden && (c += "display:none;"),
                                        0 === t ? c += "width: " + r.headers[e].width + "px;" : n.cellattr && $.isFunction(n.cellattr) && (l = n.cellattr.call(i, d, a, o, n, s)) && "string" == typeof l && ((l = l.replace(/style/i, "style").replace(/title/i, "title")).indexOf("title") > -1 && (n.title = !1),
                                        l.indexOf("class") > -1 && (u = void 0),
                                            2 === (g = l.replace("-style", "-sti").split(/style/)).length ? (g[1] = $.trim(g[1].replace("-sti", "-style").replace("=", "")),
                                            0 !== g[1].indexOf("'") && 0 !== g[1].indexOf('"') || (g[1] = g[1].substring(1)),
                                                c += g[1].replace(/'/gi, '"')) : c += '"'),
                                    g.length || (g[0] = "",
                                        c += '"'),
                                        c += (void 0 !== u ? ' class="' + u + '"' : "") + (n.title && a ? ' title="' + $.jgrid.stripHtml(a) + '"' : ""),
                                    (c += ' aria-describedby="' + i.p.id + "_" + h + '"') + g[0]
                                }
                                    , u = function(e) {
                                    return null == e || "" === e ? "&#160;" : i.p.autoencode ? $.jgrid.htmlEncode(e) : String(e)
                                }
                                    , h = function(e, t, r, a, o) {
                                    var d, s = i.p.colModel[r];
                                    if (void 0 !== s.formatter) {
                                        var l = {
                                            rowId: e = "" !== String(i.p.idPrefix) ? $.jgrid.stripPref(i.p.idPrefix, e) : e,
                                            colModel: s,
                                            gid: i.p.id,
                                            pos: r
                                        };
                                        d = $.isFunction(s.formatter) ? s.formatter.call(i, t, l, a, o) : $.fmatter ? $.fn.fmatter.call(i, s.formatter, t, l, a, o) : u(t)
                                    } else
                                        d = u(t);
                                    return d
                                }
                                    , g = function(e, t, i, r, a, o) {
                                    var d;
                                    return d = h(e, t, i, a, "add"),
                                    '<td role="gridcell" ' + c(i, r, d, a, e, o) + ">" + d + "</td>"
                                }
                                    , f = function(e, t, r, a) {
                                    var o = '<input role="checkbox" type="checkbox" id="jqg_' + i.p.id + "_" + e + '" class="cbox" name="jqg_' + i.p.id + "_" + e + '"' + (a ? 'checked="checked"' : "") + "/>";
                                    return '<td role="gridcell" ' + c(t, r, "", null, e, !0) + ">" + o + "</td>"
                                }
                                    , m = function(e, t, i, r) {
                                    var a = (parseInt(i, 10) - 1) * parseInt(r, 10) + 1 + t;
                                    return '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + c(e, t, a, null, t, !0) + ">" + a + "</td>"
                                }
                                    , v = function(e) {
                                    var t, r, a = [], o = 0;
                                    for (r = 0; r < i.p.colModel.length; r++)
                                        "cb" !== (t = i.p.colModel[r]).name && "subgrid" !== t.name && "rn" !== t.name && (a[o] = "local" === e ? t.name : "xml" === e || "xmlstring" === e ? t.xmlmap || t.name : t.jsonmap || t.name,
                                        !1 !== i.p.keyName && !0 === t.key && (i.p.keyName = a[o]),
                                            o++);
                                    return a
                                }
                                    , j = function(e) {
                                    var t = i.p.remapColumns;
                                    return t && t.length || (t = $.map(i.p.colModel, function(e, t) {
                                        return t
                                    })),
                                    e && (t = $.map(t, function(t) {
                                        return t < e ? null : t - e
                                    })),
                                        t
                                }
                                    , b = function(e, t) {
                                    var i;
                                    this.p.deepempty ? $(this.rows).slice(1).remove() : (i = this.rows.length > 0 ? this.rows[0] : null,
                                        $(this.firstChild).empty().append(i)),
                                    e && this.p.scroll && ($(this.grid.bDiv.firstChild).css({
                                        height: "auto"
                                    }),
                                        $(this.grid.bDiv.firstChild.firstChild).css({
                                            height: 0,
                                            display: "none"
                                        }),
                                    0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0)),
                                    !0 === t && this.p.treeGrid && (this.p.data = [],
                                        this.p._index = {})
                                }
                                    , w = function(e) {
                                    var t, r, a, o = i.p.data.length;
                                    if (t = !1 === i.p.keyName || !0 === i.p.loadonce ? i.p.localReader.id : i.p.keyName,
                                        "delete" === e) {
                                        var d = 0;
                                        for (var s in i.p._index)
                                            i.p._index.hasOwnProperty(s) && (i.p._index[s] = d++)
                                    } else
                                        for (r = 0; r < o; r++)
                                            void 0 === (a = $.jgrid.getAccessor(i.p.data[r], t)) && (a = String(r + 1)),
                                                i.p._index[a] = r
                                }
                                    , q = function(e, t, r, a, o, d) {
                                    var s, l = "-1", n = "", p = t ? "display:none;" : "", c = "ui-widget-content jqgrow ui-row-" + i.p.direction + (r ? " " + r : "") + (d ? " ui-state-highlight" : ""), u = $(i).triggerHandler("jqGridRowAttr", [a, o, e]);
                                    if ("object" != typeof u && (u = $.isFunction(i.p.rowattr) ? i.p.rowattr.call(i, a, o, e) : {}),
                                            !$.isEmptyObject(u)) {
                                        u.hasOwnProperty("id") && (e = u.id,
                                            delete u.id),
                                        u.hasOwnProperty("tabindex") && (l = u.tabindex,
                                            delete u.tabindex),
                                        u.hasOwnProperty("style") && (p += u.style,
                                            delete u.style),
                                        u.hasOwnProperty("class") && (c += " " + u.class,
                                            delete u.class);
                                        try {
                                            delete u.role
                                        } catch (e) {}
                                        for (s in u)
                                            u.hasOwnProperty(s) && (n += " " + s + "=" + u[s])
                                    }
                                    return '<tr role="row" id="' + e + '" tabindex="' + l + '" class="' + c + '"' + ("" === p ? "" : ' style="' + p + '"') + n + ">"
                                }
                                    , y = function(e, t, r, a, o) {
                                    var d = new Date
                                        , s = "local" !== i.p.datatype && i.p.loadonce || "xmlstring" === i.p.datatype
                                        , l = i.p.xmlReader
                                        , n = "local" === i.p.datatype ? "local" : "xml";
                                    if (s && (i.p.data = [],
                                            i.p._index = {},
                                            i.p.localReader.id = "_id_"),
                                            i.p.reccount = 0,
                                            $.isXMLDoc(e)) {
                                        -1 !== i.p.treeANode || i.p.scroll ? r = r > 1 ? r : 1 : (b.call(i, !1, !0),
                                            r = 1);
                                        var c, u, h, w, y, D, x, _, C, I, G = $(i), F = 0, k = !0 === i.p.multiselect ? 1 : 0, S = 0, M = !0 === i.p.rownumbers ? 1 : 0, R = [], N = {}, E = [], A = !0 === i.p.altRows ? i.p.altclass : "";
                                        !0 === i.p.subGrid && (S = 1,
                                            w = $.jgrid.getMethod("addSubGridCell")),
                                        l.repeatitems || (R = v(n)),
                                            y = !1 === i.p.keyName ? $.isFunction(l.id) ? l.id.call(i, e) : l.id : i.p.keyName,
                                            D = -1 === String(y).indexOf("[") ? R.length ? function(e, t) {
                                                    return $(y, e).text() || t
                                                }
                                                : function(e, t) {
                                                    return $(l.cell, e).eq(y).text() || t
                                                }
                                                : function(e, t) {
                                                    return e.getAttribute(y.replace(/[\[\]]/g, "")) || t
                                                }
                                            ,
                                            i.p.userData = {},
                                            i.p.page = p($.jgrid.getXmlData(e, l.page), i.p.page),
                                            i.p.lastpage = p($.jgrid.getXmlData(e, l.total), 1),
                                            i.p.records = p($.jgrid.getXmlData(e, l.records)),
                                            $.isFunction(l.userdata) ? i.p.userData = l.userdata.call(i, e) || {} : $.jgrid.getXmlData(e, l.userdata, !0).each(function() {
                                                i.p.userData[this.getAttribute("name")] = $(this).text()
                                            });
                                        var P = $.jgrid.getXmlData(e, l.root, !0);
                                        (P = $.jgrid.getXmlData(P, l.row, !0)) || (P = []);
                                        var O = P.length
                                            , T = 0
                                            , z = []
                                            , H = parseInt(i.p.rowNum, 10)
                                            , B = i.p.scroll ? $.jgrid.randId() : 1;
                                        if (O > 0 && i.p.page <= 0 && (i.p.page = 1),
                                            P && O) {
                                            o && (H *= o + 1);
                                            var L, V = $.isFunction(i.p.afterInsertRow), U = !1;
                                            for (i.p.grouping && (U = !0 === i.p.groupingView.groupCollapse,
                                                L = $.jgrid.getMethod("groupingPrepare")); T < O; ) {
                                                _ = P[T],
                                                    C = D(_, B + T),
                                                    C = i.p.idPrefix + C,
                                                    I = ((0 === r ? 0 : r + 1) + T) % 2 == 1 ? A : "";
                                                var W = E.length;
                                                if (E.push(""),
                                                    M && E.push(m(0, T, i.p.page, i.p.rowNum)),
                                                    k && E.push(f(C, M, T, !1)),
                                                    S && E.push(w.call(G, k + M, T + r)),
                                                        l.repeatitems) {
                                                    x || (x = j(k + S + M));
                                                    var Q = $.jgrid.getXmlData(_, l.cell, !0);
                                                    $.each(x, function(e) {
                                                        var t = Q[this];
                                                        if (!t)
                                                            return !1;
                                                        h = t.textContent || t.text,
                                                            N[i.p.colModel[e + k + S + M].name] = h,
                                                            E.push(g(C, h, e + k + S + M, T + r, _, N))
                                                    })
                                                } else
                                                    for (c = 0; c < R.length; c++)
                                                        h = $.jgrid.getXmlData(_, R[c]),
                                                            N[i.p.colModel[c + k + S + M].name] = h,
                                                            E.push(g(C, h, c + k + S + M, T + r, _, N));
                                                if (E[W] = q(C, U, I, N, _, !1),
                                                        E.push("</tr>"),
                                                    i.p.grouping && (z.push(E),
                                                    i.p.groupingView._locgr || L.call(G, N, T),
                                                        E = []),
                                                    (s || !0 === i.p.treeGrid) && (N._id_ = $.jgrid.stripPref(i.p.idPrefix, C),
                                                        i.p.data.push(N),
                                                        i.p._index[N._id_] = i.p.data.length - 1),
                                                    !1 === i.p.gridview && ($("tbody:first", t).append(E.join("")),
                                                        G.triggerHandler("jqGridAfterInsertRow", [C, N, _]),
                                                    V && i.p.afterInsertRow.call(i, C, N, _),
                                                        E = []),
                                                        N = {},
                                                        F++,
                                                        T++,
                                                    F === H)
                                                    break
                                            }
                                        }
                                        if (!0 === i.p.gridview && (u = i.p.treeANode > -1 ? i.p.treeANode : 0,
                                                i.p.grouping ? s || (G.jqGrid("groupingRender", z, i.p.colModel.length, i.p.page, H),
                                                    z = null) : !0 === i.p.treeGrid && u > 0 ? $(i.rows[u]).after(E.join("")) : $("tbody:first", t).append(E.join(""))),
                                            !0 === i.p.subGrid)
                                            try {
                                                G.jqGrid("addSubGrid", k + M)
                                            } catch (e) {}
                                        if (i.p.totaltime = new Date - d,
                                            F > 0 && 0 === i.p.records && (i.p.records = O),
                                                E = null,
                                            !0 === i.p.treeGrid)
                                            try {
                                                G.jqGrid("setTreeNode", u + 1, F + u + 1)
                                            } catch (e) {}
                                        if (i.p.treeGrid || i.p.scroll || (i.grid.bDiv.scrollTop = 0),
                                                i.p.reccount = F,
                                                i.p.treeANode = -1,
                                            i.p.userDataOnFooter && G.jqGrid("footerData", "set", i.p.userData, !0),
                                            s && (i.p.records = O,
                                                i.p.lastpage = Math.ceil(O / H)),
                                            a || i.updatepager(!1, !0),
                                                s) {
                                            for (; F < O; ) {
                                                if (_ = P[F],
                                                        C = D(_, F + B),
                                                        C = i.p.idPrefix + C,
                                                        l.repeatitems) {
                                                    x || (x = j(k + S + M));
                                                    var Y = $.jgrid.getXmlData(_, l.cell, !0);
                                                    $.each(x, function(e) {
                                                        var t = Y[this];
                                                        if (!t)
                                                            return !1;
                                                        h = t.textContent || t.text,
                                                            N[i.p.colModel[e + k + S + M].name] = h
                                                    })
                                                } else
                                                    for (c = 0; c < R.length; c++)
                                                        h = $.jgrid.getXmlData(_, R[c]),
                                                            N[i.p.colModel[c + k + S + M].name] = h;
                                                N._id_ = $.jgrid.stripPref(i.p.idPrefix, C),
                                                i.p.grouping && L.call(G, N, F),
                                                    i.p.data.push(N),
                                                    i.p._index[N._id_] = i.p.data.length - 1,
                                                    N = {},
                                                    F++
                                            }
                                            i.p.grouping && (i.p.groupingView._locgr = !0,
                                                G.jqGrid("groupingRender", z, i.p.colModel.length, i.p.page, H),
                                                z = null)
                                        }
                                    }
                                }
                                    , D = function(e, t, r, a, o) {
                                    var d = new Date;
                                    if (e) {
                                        -1 !== i.p.treeANode || i.p.scroll ? r = r > 1 ? r : 1 : (b.call(i, !1, !0),
                                            r = 1);
                                        var s, l, n = "local" !== i.p.datatype && i.p.loadonce || "jsonstring" === i.p.datatype;
                                        n && (i.p.data = [],
                                            i.p._index = {},
                                            i.p.localReader.id = "_id_"),
                                            i.p.reccount = 0,
                                            "local" === i.p.datatype ? (s = i.p.localReader,
                                                l = "local") : (s = i.p.jsonReader,
                                                l = "json");
                                        var c, u, h, w, y, D, x, _, C, I, G, F, k = $(i), S = 0, M = [], R = i.p.multiselect ? 1 : 0, N = !0 === i.p.subGrid ? 1 : 0, E = !0 === i.p.rownumbers ? 1 : 0, A = j(R + N + E), P = v(l), O = {}, T = [], z = !0 === i.p.altRows ? i.p.altclass : "";
                                        i.p.page = p($.jgrid.getAccessor(e, s.page), i.p.page),
                                            i.p.lastpage = p($.jgrid.getAccessor(e, s.total), 1),
                                            i.p.records = p($.jgrid.getAccessor(e, s.records)),
                                            i.p.userData = $.jgrid.getAccessor(e, s.userdata) || {},
                                        N && (y = $.jgrid.getMethod("addSubGridCell")),
                                            C = !1 === i.p.keyName ? $.isFunction(s.id) ? s.id.call(i, e) : s.id : i.p.keyName,
                                        null == (_ = $.jgrid.getAccessor(e, s.root)) && $.isArray(e) && (_ = e),
                                        _ || (_ = []),
                                            u = 0,
                                        (x = _.length) > 0 && i.p.page <= 0 && (i.p.page = 1);
                                        var H, B = parseInt(i.p.rowNum, 10), L = i.p.scroll ? $.jgrid.randId() : 1, V = !1;
                                        o && (B *= o + 1),
                                        "local" !== i.p.datatype || i.p.deselectAfterSort || (V = !0);
                                        var U, W = $.isFunction(i.p.afterInsertRow), Q = [], Y = !1;
                                        for (i.p.grouping && (Y = !0 === i.p.groupingView.groupCollapse,
                                            U = $.jgrid.getMethod("groupingPrepare")); u < x; ) {
                                            if (w = _[u],
                                                void 0 === (G = $.jgrid.getAccessor(w, C)) && ("number" == typeof C && null != i.p.colModel[C + R + N + E] && (G = $.jgrid.getAccessor(w, i.p.colModel[C + R + N + E].name)),
                                                void 0 === G && (G = L + u,
                                                0 === M.length && s.cell))) {
                                                var X = $.jgrid.getAccessor(w, s.cell) || w;
                                                G = null != X && void 0 !== X[C] ? X[C] : G,
                                                    X = null
                                            }
                                            G = i.p.idPrefix + G,
                                                F = ((1 === r ? 0 : r) + u) % 2 == 1 ? z : "",
                                            V && (H = i.p.multiselect ? -1 !== $.inArray(G, i.p.selarrrow) : G === i.p.selrow);
                                            var K = T.length;
                                            for (T.push(""),
                                                 E && T.push(m(0, u, i.p.page, i.p.rowNum)),
                                                 R && T.push(f(G, E, u, H)),
                                                 N && T.push(y.call(k, R + E, u + r)),
                                                     D = P,
                                                 s.repeatitems && (s.cell && (w = $.jgrid.getAccessor(w, s.cell) || w),
                                                 $.isArray(w) && (D = A)),
                                                     h = 0; h < D.length; h++)
                                                c = $.jgrid.getAccessor(w, D[h]),
                                                    O[i.p.colModel[h + R + N + E].name] = c,
                                                    T.push(g(G, c, h + R + N + E, u + r, w, O));
                                            if (T[K] = q(G, Y, F, O, w, H),
                                                    T.push("</tr>"),
                                                i.p.grouping && (Q.push(T),
                                                i.p.groupingView._locgr || U.call(k, O, u),
                                                    T = []),
                                                (n || !0 === i.p.treeGrid) && (O._id_ = $.jgrid.stripPref(i.p.idPrefix, G),
                                                    i.p.data.push(O),
                                                    i.p._index[O._id_] = i.p.data.length - 1),
                                                !1 === i.p.gridview && ($("#" + $.jgrid.jqID(i.p.id) + " tbody:first").append(T.join("")),
                                                    k.triggerHandler("jqGridAfterInsertRow", [G, O, w]),
                                                W && i.p.afterInsertRow.call(i, G, O, w),
                                                    T = []),
                                                    O = {},
                                                    S++,
                                                    u++,
                                                S === B && "local" === i.p.datatype)
                                                break
                                        }
                                        if (!0 === i.p.gridview && (I = i.p.treeANode > -1 ? i.p.treeANode : 0,
                                                i.p.grouping ? n || (k.jqGrid("groupingRender", Q, i.p.colModel.length, i.p.page, B),
                                                    Q = null) : !0 === i.p.treeGrid && I > 0 ? $(i.rows[I]).after(T.join("")) : $("#" + $.jgrid.jqID(i.p.id) + " tbody:first").append(T.join(""))),
                                            !0 === i.p.subGrid)
                                            try {
                                                k.jqGrid("addSubGrid", R + E)
                                            } catch (e) {}
                                        if (i.p.totaltime = new Date - d,
                                            S > 0 && 0 === i.p.records && (i.p.records = x),
                                                T = null,
                                            !0 === i.p.treeGrid)
                                            try {
                                                k.jqGrid("setTreeNode", I + 1, S + I + 1)
                                            } catch (e) {}
                                        if (i.p.treeGrid || i.p.scroll || (i.grid.bDiv.scrollTop = 0),
                                                i.p.reccount = S,
                                                i.p.treeANode = -1,
                                            i.p.userDataOnFooter && k.jqGrid("footerData", "set", i.p.userData, !0),
                                            n && (i.p.records = x,
                                                i.p.lastpage = Math.ceil(x / B)),
                                            a || i.updatepager(!1, !0),
                                                n) {
                                            for (; S < x && _[S]; ) {
                                                if (w = _[S],
                                                    void 0 === (G = $.jgrid.getAccessor(w, C)) && ("number" == typeof C && null != i.p.colModel[C + R + N + E] && (G = $.jgrid.getAccessor(w, i.p.colModel[C + R + N + E].name)),
                                                    void 0 === G && (G = L + S,
                                                    0 === M.length && s.cell))) {
                                                    var J = $.jgrid.getAccessor(w, s.cell) || w;
                                                    G = null != J && void 0 !== J[C] ? J[C] : G,
                                                        J = null
                                                }
                                                if (w) {
                                                    for (G = i.p.idPrefix + G,
                                                             D = P,
                                                         s.repeatitems && (s.cell && (w = $.jgrid.getAccessor(w, s.cell) || w),
                                                         $.isArray(w) && (D = A)),
                                                             h = 0; h < D.length; h++)
                                                        O[i.p.colModel[h + R + N + E].name] = $.jgrid.getAccessor(w, D[h]);
                                                    O._id_ = $.jgrid.stripPref(i.p.idPrefix, G),
                                                    i.p.grouping && U.call(k, O, S),
                                                        i.p.data.push(O),
                                                        i.p._index[O._id_] = i.p.data.length - 1,
                                                        O = {}
                                                }
                                                S++
                                            }
                                            i.p.grouping && (i.p.groupingView._locgr = !0,
                                                k.jqGrid("groupingRender", Q, i.p.colModel.length, i.p.page, B),
                                                Q = null)
                                        }
                                    }
                                }
                                    , x = function() {
                                    function e(t) {
                                        var i, r, a, o, d, s = 0;
                                        if (null != t.groups) {
                                            for ((r = t.groups.length && "OR" === t.groupOp.toString().toUpperCase()) && f.orBegin(),
                                                     i = 0; i < t.groups.length; i++) {
                                                s > 0 && r && f.or();
                                                try {
                                                    e(t.groups[i])
                                                } catch (e) {
                                                    alert(e)
                                                }
                                                s++
                                            }
                                            r && f.orEnd()
                                        }
                                        if (null != t.rules)
                                            try {
                                                for ((a = t.rules.length && "OR" === t.groupOp.toString().toUpperCase()) && f.orBegin(),
                                                         i = 0; i < t.rules.length; i++)
                                                    d = t.rules[i],
                                                        o = t.groupOp.toString().toUpperCase(),
                                                    g[d.op] && d.field && (s > 0 && o && "OR" === o && (f = f.or()),
                                                        f = g[d.op](f, o)(d.field, d.data, l[d.field])),
                                                        s++;
                                                a && f.orEnd()
                                            } catch (e) {
                                                alert(e)
                                            }
                                    }
                                    var t, r, a, o = i.p.multiSort ? [] : "", d = [], s = !1, l = {}, n = [], p = [];
                                    if ($.isArray(i.p.data)) {
                                        var c, u, h = !!i.p.grouping && i.p.groupingView;
                                        if ($.each(i.p.colModel, function() {
                                                if ("date" === (r = this.sorttype || "text") || "datetime" === r ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (t = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : $.jgrid.formatter.date.srcformat,
                                                        a = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : $.jgrid.formatter.date.newformat) : t = a = this.datefmt || "Y-m-d",
                                                        l[this.name] = {
                                                            stype: r,
                                                            srcfmt: t,
                                                            newfmt: a,
                                                            sfunc: this.sortfunc || null
                                                        }) : l[this.name] = {
                                                        stype: r,
                                                        srcfmt: "",
                                                        newfmt: "",
                                                        sfunc: this.sortfunc || null
                                                    },
                                                        i.p.grouping)
                                                    for (u = 0,
                                                             c = h.groupField.length; u < c; u++)
                                                        if (this.name === h.groupField[u]) {
                                                            var e = this.name;
                                                            this.index && (e = this.index),
                                                                n[u] = l[e],
                                                                p[u] = e
                                                        }
                                                if (i.p.multiSort) {
                                                    if (this.lso) {
                                                        o.push(this.name);
                                                        var g = this.lso.split("-");
                                                        d.push(g[g.length - 1])
                                                    }
                                                } else
                                                    s || this.index !== i.p.sortname && this.name !== i.p.sortname || (o = this.name,
                                                        s = !0)
                                            }),
                                                !i.p.treeGrid) {
                                            var g = {
                                                eq: function(e) {
                                                    return e.equals
                                                },
                                                ne: function(e) {
                                                    return e.notEquals
                                                },
                                                lt: function(e) {
                                                    return e.less
                                                },
                                                le: function(e) {
                                                    return e.lessOrEquals
                                                },
                                                gt: function(e) {
                                                    return e.greater
                                                },
                                                ge: function(e) {
                                                    return e.greaterOrEquals
                                                },
                                                cn: function(e) {
                                                    return e.contains
                                                },
                                                nc: function(e, t) {
                                                    return "OR" === t ? e.orNot().contains : e.andNot().contains
                                                },
                                                bw: function(e) {
                                                    return e.startsWith
                                                },
                                                bn: function(e, t) {
                                                    return "OR" === t ? e.orNot().startsWith : e.andNot().startsWith
                                                },
                                                en: function(e, t) {
                                                    return "OR" === t ? e.orNot().endsWith : e.andNot().endsWith
                                                },
                                                ew: function(e) {
                                                    return e.endsWith
                                                },
                                                ni: function(e, t) {
                                                    return "OR" === t ? e.orNot().equals : e.andNot().equals
                                                },
                                                in: function(e) {
                                                    return e.equals
                                                },
                                                nu: function(e) {
                                                    return e.isNull
                                                },
                                                nn: function(e, t) {
                                                    return "OR" === t ? e.orNot().isNull : e.andNot().isNull
                                                }
                                            }
                                                , f = $.jgrid.from(i.p.data);
                                            if (i.p.ignoreCase && (f = f.ignoreCase()),
                                                !0 === i.p.search) {
                                                var m = i.p.postData.filters;
                                                if (m)
                                                    "string" == typeof m && (m = $.jgrid.parse(m)),
                                                        e(m);
                                                else
                                                    try {
                                                        f = g[i.p.postData.searchOper](f)(i.p.postData.searchField, i.p.postData.searchString, l[i.p.postData.searchField])
                                                    } catch (e) {}
                                            }
                                            if (i.p.grouping)
                                                for (u = 0; u < c; u++)
                                                    f.orderBy(p[u], h.groupOrder[u], n[u].stype, n[u].srcfmt);
                                            i.p.multiSort ? $.each(o, function(e) {
                                                f.orderBy(this, d[e], l[this].stype, l[this].srcfmt, l[this].sfunc)
                                            }) : o && i.p.sortorder && s && ("DESC" === i.p.sortorder.toUpperCase() ? f.orderBy(i.p.sortname, "d", l[o].stype, l[o].srcfmt, l[o].sfunc) : f.orderBy(i.p.sortname, "a", l[o].stype, l[o].srcfmt, l[o].sfunc));
                                            var v = f.select()
                                                , j = parseInt(i.p.rowNum, 10)
                                                , b = v.length
                                                , w = parseInt(i.p.page, 10)
                                                , q = Math.ceil(b / j)
                                                , y = {};
                                            if ((i.p.search || i.p.resetsearch) && i.p.grouping && i.p.groupingView._locgr) {
                                                i.p.groupingView.groups = [];
                                                var D, x, _, C = $.jgrid.getMethod("groupingPrepare");
                                                if (i.p.footerrow && i.p.userDataOnFooter) {
                                                    for (x in i.p.userData)
                                                        i.p.userData.hasOwnProperty(x) && (i.p.userData[x] = 0);
                                                    _ = !0
                                                }
                                                for (D = 0; D < b; D++) {
                                                    if (_)
                                                        for (x in i.p.userData)
                                                            i.p.userData[x] += parseFloat(v[D][x] || 0);
                                                    C.call($(i), v[D], D, j)
                                                }
                                            }
                                            return v = v.slice((w - 1) * j, w * j),
                                                f = null,
                                                l = null,
                                                y[i.p.localReader.total] = q,
                                                y[i.p.localReader.page] = w,
                                                y[i.p.localReader.records] = b,
                                                y[i.p.localReader.root] = v,
                                                y[i.p.localReader.userdata] = i.p.userData,
                                                v = null,
                                                y
                                        }
                                        $(i).jqGrid("SortTree", o, i.p.sortorder, l[o].stype || "text", l[o].srcfmt || "")
                                    }
                                }
                                    , _ = function() {
                                    if (i.grid.hDiv.loading = !0,
                                            !i.p.hiddengrid)
                                        switch (i.p.loadui) {
                                            case "disable":
                                                break;
                                            case "enable":
                                                $("#load_" + $.jgrid.jqID(i.p.id)).show();
                                                break;
                                            case "block":
                                                $("#lui_" + $.jgrid.jqID(i.p.id)).show(),
                                                    $("#load_" + $.jgrid.jqID(i.p.id)).show()
                                        }
                                }
                                    , C = function() {
                                    switch (i.grid.hDiv.loading = !1,
                                        i.p.loadui) {
                                        case "disable":
                                            break;
                                        case "enable":
                                            $("#load_" + $.jgrid.jqID(i.p.id)).hide();
                                            break;
                                        case "block":
                                            $("#lui_" + $.jgrid.jqID(i.p.id)).hide(),
                                                $("#load_" + $.jgrid.jqID(i.p.id)).hide()
                                    }
                                }
                                    , I = function(e) {
                                    if (!i.grid.hDiv.loading) {
                                        var t, r, a = i.p.scroll && !1 === e, o = {}, d = i.p.prmNames;
                                        i.p.page <= 0 && (i.p.page = Math.min(1, i.p.lastpage)),
                                        null !== d.search && (o[d.search] = i.p.search),
                                        null !== d.nd && (o[d.nd] = (new Date).getTime()),
                                        null !== d.rows && (o[d.rows] = i.p.rowNum),
                                        null !== d.page && (o[d.page] = i.p.page),
                                        null !== d.sort && (o[d.sort] = i.p.sortname),
                                        null !== d.order && (o[d.order] = i.p.sortorder),
                                        null !== i.p.rowTotal && null !== d.totalrows && (o[d.totalrows] = i.p.rowTotal);
                                        var s = $.isFunction(i.p.loadComplete)
                                            , l = s ? i.p.loadComplete : null
                                            , n = 0;
                                        if ((e = e || 1) > 1 ? null !== d.npage ? (o[d.npage] = e,
                                                    n = e - 1,
                                                    e = 1) : l = function(t) {
                                                    i.p.page++,
                                                        i.grid.hDiv.loading = !1,
                                                    s && i.p.loadComplete.call(i, t),
                                                        I(e - 1)
                                                }
                                                : null !== d.npage && delete i.p.postData[d.npage],
                                                i.p.grouping) {
                                            $(i).jqGrid("groupingSetup");
                                            var p, c = i.p.groupingView, u = "";
                                            for (p = 0; p < c.groupField.length; p++) {
                                                var h = c.groupField[p];
                                                $.each(i.p.colModel, function(e, t) {
                                                    t.name === h && t.index && (h = t.index)
                                                }),
                                                    u += h + " " + c.groupOrder[p] + ", "
                                            }
                                            o[d.sort] = u + o[d.sort]
                                        }
                                        $.extend(i.p.postData, o);
                                        var g = i.p.scroll ? i.rows.length - 1 : 1
                                            , f = $(i).triggerHandler("jqGridBeforeRequest");
                                        if (!1 === f || "stop" === f)
                                            return;
                                        if ($.isFunction(i.p.datatype))
                                            return void i.p.datatype.call(i, i.p.postData, "load_" + i.p.id, g, e, n);
                                        if ($.isFunction(i.p.beforeRequest) && (void 0 === (f = i.p.beforeRequest.call(i)) && (f = !0),
                                            !1 === f))
                                            return;
                                        switch (t = i.p.datatype.toLowerCase()) {
                                            case "json":
                                            case "jsonp":
                                            case "xml":
                                            case "script":
                                                $.ajax($.extend({
                                                    url: i.p.url,
                                                    type: i.p.mtype,
                                                    dataType: t,
                                                    data: $.isFunction(i.p.serializeGridData) ? i.p.serializeGridData.call(i, i.p.postData) : i.p.postData,
                                                    success: function(r, o, d) {
                                                        $.isFunction(i.p.beforeProcessing) && !1 === i.p.beforeProcessing.call(i, r, o, d) ? C() : ("xml" === t ? y(r, i.grid.bDiv, g, e > 1, n) : D(r, i.grid.bDiv, g, e > 1, n),
                                                            $(i).triggerHandler("jqGridLoadComplete", [r]),
                                                        l && l.call(i, r),
                                                            $(i).triggerHandler("jqGridAfterLoadComplete", [r]),
                                                        a && i.grid.populateVisible(),
                                                        (i.p.loadonce || i.p.treeGrid) && (i.p.datatype = "local"),
                                                            r = null,
                                                        1 === e && C())
                                                    },
                                                    error: function(t, r, a) {
                                                        $.isFunction(i.p.loadError) && i.p.loadError.call(i, t, r, a),
                                                        1 === e && C(),
                                                            t = null
                                                    },
                                                    beforeSend: function(e, t) {
                                                        var r = !0;
                                                        if ($.isFunction(i.p.loadBeforeSend) && (r = i.p.loadBeforeSend.call(i, e, t)),
                                                            void 0 === r && (r = !0),
                                                            !1 === r)
                                                            return !1;
                                                        _()
                                                    }
                                                }, $.jgrid.ajaxOptions, i.p.ajaxGridOptions));
                                                break;
                                            case "xmlstring":
                                                _(),
                                                    r = "string" != typeof i.p.datastr ? i.p.datastr : $.parseXML(i.p.datastr),
                                                    y(r, i.grid.bDiv),
                                                    $(i).triggerHandler("jqGridLoadComplete", [r]),
                                                s && i.p.loadComplete.call(i, r),
                                                    $(i).triggerHandler("jqGridAfterLoadComplete", [r]),
                                                    i.p.datatype = "local",
                                                    i.p.datastr = null,
                                                    C();
                                                break;
                                            case "jsonstring":
                                                _(),
                                                    r = "string" == typeof i.p.datastr ? $.jgrid.parse(i.p.datastr) : i.p.datastr,
                                                    D(r, i.grid.bDiv),
                                                    $(i).triggerHandler("jqGridLoadComplete", [r]),
                                                s && i.p.loadComplete.call(i, r),
                                                    $(i).triggerHandler("jqGridAfterLoadComplete", [r]),
                                                    i.p.datatype = "local",
                                                    i.p.datastr = null,
                                                    C();
                                                break;
                                            case "local":
                                            case "clientside":
                                                _(),
                                                    i.p.datatype = "local";
                                                var m = x();
                                                D(m, i.grid.bDiv, g, e > 1, n),
                                                    $(i).triggerHandler("jqGridLoadComplete", [m]),
                                                l && l.call(i, m),
                                                    $(i).triggerHandler("jqGridAfterLoadComplete", [m]),
                                                a && i.grid.populateVisible(),
                                                    C()
                                        }
                                    }
                                }
                                    , G = function(e) {
                                    $("#cb_" + $.jgrid.jqID(i.p.id), i.grid.hDiv)[i.p.useProp ? "prop" : "attr"]("checked", e),
                                    (i.p.frozenColumns ? i.p.id + "_frozen" : "") && $("#cb_" + $.jgrid.jqID(i.p.id), i.grid.fhDiv)[i.p.useProp ? "prop" : "attr"]("checked", e)
                                }
                                    , F = function(e, t) {
                                    var r, a, d, s, l, n, c, u = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>", h = "", g = "<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>", f = "", m = function(e) {
                                        var t;
                                        return $.isFunction(i.p.onPaging) && (t = i.p.onPaging.call(i, e)),
                                        "stop" !== t && (i.p.selrow = null,
                                        i.p.multiselect && (i.p.selarrrow = [],
                                            G(!1)),
                                            i.p.savedRow = [],
                                            !0)
                                    };
                                    if (e = e.substr(1),
                                            t += "_" + e,
                                            r = "pg_" + e,
                                            a = e + "_left",
                                            d = e + "_center",
                                            s = e + "_right",
                                            $("#" + $.jgrid.jqID(e)).append("<div id='" + r + "' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;' role='row'><tbody><tr><td id='" + a + "' align='left'></td><td id='" + d + "' align='center' style='white-space:pre;'></td><td id='" + s + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr"),
                                        i.p.rowList.length > 0) {
                                        f = "<td dir='" + o + "'>",
                                            f += "<select class='ui-pg-selbox' role='listbox'>";
                                        var v;
                                        for (c = 0; c < i.p.rowList.length; c++)
                                            1 === (v = i.p.rowList[c].toString().split(":")).length && (v[1] = v[0]),
                                                f += '<option role="option" value="' + v[0] + '"' + (p(i.p.rowNum, 0) === p(v[0], 0) ? ' selected="selected"' : "") + ">" + v[1] + "</option>";
                                        f += "</select></td>"
                                    }
                                    if ("rtl" === o && (g += f),
                                        !0 === i.p.pginput && (h = "<td dir='" + o + "'>" + $.jgrid.format(i.p.pgtext || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(e) + "'></span>") + "</td>"),
                                        !0 === i.p.pgbuttons) {
                                        var j = ["first" + t, "prev" + t, "next" + t, "last" + t];
                                        "rtl" === o && j.reverse(),
                                            g += "<td id='" + j[0] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>",
                                            g += "<td id='" + j[1] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>",
                                            g += "" !== h ? u + h + u : "",
                                            g += "<td id='" + j[2] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>",
                                            g += "<td id='" + j[3] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>"
                                    } else
                                        "" !== h && (g += h);
                                    "ltr" === o && (g += f),
                                        g += "</tr></tbody></table>",
                                    !0 === i.p.viewrecords && $("td#" + e + "_" + i.p.recordpos, "#" + r).append("<div dir='" + o + "' style='text-align:" + i.p.recordpos + "' class='ui-paging-info'></div>"),
                                        $("td#" + e + "_" + i.p.pagerpos, "#" + r).append(g),
                                        n = $(".ui-jqgrid").css("font-size") || "11px",
                                        $(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + n + ";visibility:hidden;' ></div>"),
                                        l = $(g).clone().appendTo("#testpg").width(),
                                        $("#testpg").remove(),
                                    l > 0 && ("" !== h && (l += 50),
                                        $("td#" + e + "_" + i.p.pagerpos, "#" + r).width(l)),
                                        i.p._nvtd = [],
                                        i.p._nvtd[0] = l ? Math.floor((i.p.width - l) / 2) : Math.floor(i.p.width / 3),
                                        i.p._nvtd[1] = 0,
                                        g = null,
                                        $(".ui-pg-selbox", "#" + r).bind("change", function() {
                                            return !!m("records") && (i.p.page = Math.round(i.p.rowNum * (i.p.page - 1) / this.value - .5) + 1,
                                                i.p.rowNum = this.value,
                                            i.p.pager && $(".ui-pg-selbox", i.p.pager).val(this.value),
                                            i.p.toppager && $(".ui-pg-selbox", i.p.toppager).val(this.value),
                                                I(),
                                                !1)
                                        }),
                                    !0 === i.p.pgbuttons && ($(".ui-pg-button", "#" + r).hover(function() {
                                        $(this).hasClass("ui-state-disabled") ? this.style.cursor = "default" : ($(this).addClass("ui-state-hover"),
                                            this.style.cursor = "pointer")
                                    }, function() {
                                        $(this).hasClass("ui-state-disabled") || ($(this).removeClass("ui-state-hover"),
                                            this.style.cursor = "default")
                                    }),
                                        $("#first" + $.jgrid.jqID(t) + ", #prev" + $.jgrid.jqID(t) + ", #next" + $.jgrid.jqID(t) + ", #last" + $.jgrid.jqID(t)).click(function() {
                                            if ($(this).hasClass("ui-state-disabled"))
                                                return !1;
                                            var e = p(i.p.page, 1)
                                                , r = p(i.p.lastpage, 1)
                                                , a = !1
                                                , o = !0
                                                , d = !0
                                                , s = !0
                                                , l = !0;
                                            return 0 === r || 1 === r ? (o = !1,
                                                d = !1,
                                                s = !1,
                                                l = !1) : r > 1 && e >= 1 ? 1 === e ? (o = !1,
                                                d = !1) : e === r && (s = !1,
                                                l = !1) : r > 1 && 0 === e && (s = !1,
                                                l = !1,
                                                e = r - 1),
                                            !!m(this.id) && (this.id === "first" + t && o && (i.p.page = 1,
                                                a = !0),
                                            this.id === "prev" + t && d && (i.p.page = e - 1,
                                                a = !0),
                                            this.id === "next" + t && s && (i.p.page = e + 1,
                                                a = !0),
                                            this.id === "last" + t && l && (i.p.page = r,
                                                a = !0),
                                            a && I(),
                                                !1)
                                        })),
                                    !0 === i.p.pginput && $("input.ui-pg-input", "#" + r).keypress(function(e) {
                                        return 13 === (e.charCode || e.keyCode || 0) ? !!m("user") && ($(this).val(p($(this).val(), 1)),
                                            i.p.page = $(this).val() > 0 ? $(this).val() : i.p.page,
                                            I(),
                                            !1) : this
                                    })
                                }
                                    , k = function(e, t) {
                                    var r, a, o = "", d = i.p.colModel, s = !1, l = i.p.frozenColumns ? t : i.grid.headers[e].el, n = "";
                                    $("span.ui-grid-ico-sort", l).addClass("ui-state-disabled"),
                                        $(l).attr("aria-selected", "false"),
                                        d[e].lso ? "asc" === d[e].lso ? (d[e].lso += "-desc",
                                            n = "desc") : "desc" === d[e].lso ? (d[e].lso += "-asc",
                                            n = "asc") : "asc-desc" !== d[e].lso && "desc-asc" !== d[e].lso || (d[e].lso = "") : d[e].lso = n = d[e].firstsortorder || "asc",
                                        n ? ($("span.s-ico", l).show(),
                                            $("span.ui-icon-" + n, l).removeClass("ui-state-disabled"),
                                            $(l).attr("aria-selected", "true")) : i.p.viewsortcols[0] || $("span.s-ico", l).hide(),
                                        i.p.sortorder = "",
                                        $.each(d, function(e) {
                                            this.lso && (e > 0 && s && (o += ", "),
                                                r = this.lso.split("-"),
                                                o += d[e].index || d[e].name,
                                                o += " " + r[r.length - 1],
                                                s = !0,
                                                i.p.sortorder = r[r.length - 1])
                                        }),
                                        a = o.lastIndexOf(i.p.sortorder),
                                        o = o.substring(0, a),
                                        i.p.sortname = o
                                }
                                    , S = function(e, t, r, a, o) {
                                    if (i.p.colModel[t].sortable && !(i.p.savedRow.length > 0)) {
                                        if (r || (i.p.lastsort === t ? "asc" === i.p.sortorder ? i.p.sortorder = "desc" : "desc" === i.p.sortorder && (i.p.sortorder = "asc") : i.p.sortorder = i.p.colModel[t].firstsortorder || "asc",
                                                i.p.page = 1),
                                                i.p.multiSort)
                                            k(t, o);
                                        else {
                                            if (a) {
                                                if (i.p.lastsort === t && i.p.sortorder === a && !r)
                                                    return;
                                                i.p.sortorder = a
                                            }
                                            var d = i.grid.headers[i.p.lastsort].el
                                                , s = i.p.frozenColumns ? o : i.grid.headers[t].el;
                                            $("span.ui-grid-ico-sort", d).addClass("ui-state-disabled"),
                                                $(d).attr("aria-selected", "false"),
                                            i.p.frozenColumns && (i.grid.fhDiv.find("span.ui-grid-ico-sort").addClass("ui-state-disabled"),
                                                i.grid.fhDiv.find("th").attr("aria-selected", "false")),
                                                $("span.ui-icon-" + i.p.sortorder, s).removeClass("ui-state-disabled"),
                                                $(s).attr("aria-selected", "true"),
                                            i.p.viewsortcols[0] || i.p.lastsort !== t && (i.p.frozenColumns && i.grid.fhDiv.find("span.s-ico").hide(),
                                                $("span.s-ico", d).hide(),
                                                $("span.s-ico", s).show()),
                                                e = e.substring(5 + i.p.id.length + 1),
                                                i.p.sortname = i.p.colModel[t].index || e
                                        }
                                        if ("stop" !== $(i).triggerHandler("jqGridSortCol", [i.p.sortname, t, i.p.sortorder]))
                                            if ($.isFunction(i.p.onSortCol) && "stop" === i.p.onSortCol.call(i, i.p.sortname, t, i.p.sortorder))
                                                i.p.lastsort = t;
                                            else {
                                                if ("local" === i.p.datatype ? i.p.deselectAfterSort && $(i).jqGrid("resetSelection") : (i.p.selrow = null,
                                                    i.p.multiselect && G(!1),
                                                        i.p.selarrrow = [],
                                                        i.p.savedRow = []),
                                                        i.p.scroll) {
                                                    var l = i.grid.bDiv.scrollLeft;
                                                    b.call(i, !0, !1),
                                                        i.grid.hDiv.scrollLeft = l
                                                }
                                                i.p.subGrid && "local" === i.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(i.p.id)).each(function() {
                                                    $(this).trigger("click")
                                                }),
                                                    I(),
                                                    i.p.lastsort = t,
                                                i.p.sortname !== e && t && (i.p.lastsort = t)
                                            }
                                        else
                                            i.p.lastsort = t
                                    }
                                }
                                    , M = function(e) {
                                    var t, r = e, a = e;
                                    for (t = e + 1; t < i.p.colModel.length; t++)
                                        if (!0 !== i.p.colModel[t].hidden) {
                                            a = t;
                                            break
                                        }
                                    return a - r
                                }
                                    , R = function(e) {
                                    var t = $(i.grid.headers[e].el)
                                        , r = [t.position().left + t.outerWidth()];
                                    return "rtl" === i.p.direction && (r[0] = i.p.width - r[0]),
                                        r[0] -= i.grid.bDiv.scrollLeft,
                                        r.push($(i.grid.hDiv).position().top),
                                        r.push($(i.grid.bDiv).offset().top - $(i.grid.hDiv).offset().top + $(i.grid.bDiv).height()),
                                        r
                                }
                                    , N = function(e) {
                                    var t, r = i.grid.headers, a = $.jgrid.getCellIndex(e);
                                    for (t = 0; t < r.length; t++)
                                        if (e === r[t].el) {
                                            a = t;
                                            break
                                        }
                                    return a
                                };
                                for (this.p.id = this.id,
                                     -1 === $.inArray(i.p.multikey, n) && (i.p.multikey = !1),
                                         i.p.keyName = !1,
                                         a = 0; a < i.p.colModel.length; a++)
                                    i.p.colModel[a] = $.extend(!0, {}, i.p.cmTemplate, i.p.colModel[a].template || {}, i.p.colModel[a]),
                                    !1 === i.p.keyName && !0 === i.p.colModel[a].key && (i.p.keyName = i.p.colModel[a].name);
                                if (i.p.sortorder = i.p.sortorder.toLowerCase(),
                                        $.jgrid.cell_width = $.jgrid.cellWidth(),
                                    !0 === i.p.grouping && (i.p.scroll = !1,
                                        i.p.rownumbers = !1,
                                        i.p.treeGrid = !1,
                                        i.p.gridview = !0),
                                    !0 === this.p.treeGrid) {
                                    try {
                                        $(this).jqGrid("setTreeGrid")
                                    } catch (e) {}
                                    "local" !== i.p.datatype && (i.p.localReader = {
                                        id: "_id_"
                                    })
                                }
                                if (this.p.subGrid)
                                    try {
                                        $(i).jqGrid("setSubGrid")
                                    } catch (e) {}
                                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"),
                                    this.p.colModel.unshift({
                                        name: "cb",
                                        width: $.jgrid.cell_width ? i.p.multiselectWidth + i.p.cellLayout : i.p.multiselectWidth,
                                        sortable: !1,
                                        resizable: !1,
                                        hidedlg: !0,
                                        search: !1,
                                        align: "center",
                                        fixed: !0
                                    })),
                                this.p.rownumbers && (this.p.colNames.unshift(""),
                                    this.p.colModel.unshift({
                                        name: "rn",
                                        width: i.p.rownumWidth,
                                        sortable: !1,
                                        resizable: !1,
                                        hidedlg: !0,
                                        search: !1,
                                        align: "center",
                                        fixed: !0
                                    })),
                                    i.p.xmlReader = $.extend(!0, {
                                        root: "rows",
                                        row: "row",
                                        page: "rows>page",
                                        total: "rows>total",
                                        records: "rows>records",
                                        repeatitems: !0,
                                        cell: "cell",
                                        id: "[id]",
                                        userdata: "userdata",
                                        subgrid: {
                                            root: "rows",
                                            row: "row",
                                            repeatitems: !0,
                                            cell: "cell"
                                        }
                                    }, i.p.xmlReader),
                                    i.p.jsonReader = $.extend(!0, {
                                        root: "rows",
                                        page: "page",
                                        total: "total",
                                        records: "records",
                                        repeatitems: !0,
                                        cell: "cell",
                                        id: "id",
                                        userdata: "userdata",
                                        subgrid: {
                                            root: "rows",
                                            repeatitems: !0,
                                            cell: "cell"
                                        }
                                    }, i.p.jsonReader),
                                    i.p.localReader = $.extend(!0, {
                                        root: "rows",
                                        page: "page",
                                        total: "total",
                                        records: "records",
                                        repeatitems: !1,
                                        cell: "cell",
                                        id: "id",
                                        userdata: "userdata",
                                        subgrid: {
                                            root: "rows",
                                            repeatitems: !0,
                                            cell: "cell"
                                        }
                                    }, i.p.localReader),
                                i.p.scroll && (i.p.pgbuttons = !1,
                                    i.p.pginput = !1,
                                    i.p.rowList = []),
                                i.p.data.length && w();
                                var E, A, P, O, T, z, H, B, L, V = "<thead><tr class='ui-jqgrid-labels' role='rowheader'>", U = "", W = "", Q = [], Y = [], X = [];
                                if (!0 === i.p.shrinkToFit && !0 === i.p.forceFit)
                                    for (a = i.p.colModel.length - 1; a >= 0; a--)
                                        if (!i.p.colModel[a].hidden) {
                                            i.p.colModel[a].resizable = !1;
                                            break
                                        }
                                if ("horizontal" === i.p.viewsortcols[1] && (U = " ui-i-asc",
                                        W = " ui-i-desc"),
                                        E = s ? "class='ui-th-div-ie'" : "",
                                        L = "<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc" + U + " ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-" + o + "'></span>",
                                        L += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + W + " ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-" + o + "'></span></span>",
                                        i.p.multiSort)
                                    for (Q = i.p.sortname.split(","),
                                             a = 0; a < Q.length; a++)
                                        X = $.trim(Q[a]).split(" "),
                                            Q[a] = $.trim(X[0]),
                                            Y[a] = X[1] ? $.trim(X[1]) : i.p.sortorder || "asc";
                                for (a = 0; a < this.p.colNames.length; a++) {
                                    var K = i.p.headertitles ? ' title="' + $.jgrid.stripHtml(i.p.colNames[a]) + '"' : "";
                                    V += "<th id='" + i.p.id + "_" + i.p.colModel[a].name + "' role='columnheader' class='ui-state-default ui-th-column ui-th-" + o + "'" + K + ">",
                                        A = i.p.colModel[a].index || i.p.colModel[a].name,
                                        V += "<div id='jqgh_" + i.p.id + "_" + i.p.colModel[a].name + "' " + E + ">" + i.p.colNames[a],
                                        i.p.colModel[a].width ? i.p.colModel[a].width = parseInt(i.p.colModel[a].width, 10) : i.p.colModel[a].width = 150,
                                    "boolean" != typeof i.p.colModel[a].title && (i.p.colModel[a].title = !0),
                                        i.p.colModel[a].lso = "",
                                    A === i.p.sortname && (i.p.lastsort = a),
                                    i.p.multiSort && -1 !== (X = $.inArray(A, Q)) && (i.p.colModel[a].lso = Y[X]),
                                        V += L + "</div></th>"
                                }
                                if (V += "</tr></thead>",
                                        L = null,
                                        $(this).append(V),
                                        $("thead tr:first th", this).hover(function() {
                                            $(this).addClass("ui-state-hover")
                                        }, function() {
                                            $(this).removeClass("ui-state-hover")
                                        }),
                                        this.p.multiselect) {
                                    var J, Z = [];
                                    $("#cb_" + $.jgrid.jqID(i.p.id), this).bind("click", function() {
                                        i.p.selarrrow = [];
                                        var e = !0 === i.p.frozenColumns ? i.p.id + "_frozen" : "";
                                        this.checked ? ($(i.rows).each(function(t) {
                                            t > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass("ui-state-disabled") || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(this.id))[i.p.useProp ? "prop" : "attr"]("checked", !0),
                                                $(this).addClass("ui-state-highlight").attr("aria-selected", "true"),
                                                i.p.selarrrow.push(this.id),
                                                i.p.selrow = this.id,
                                            e && ($("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(this.id), i.grid.fbDiv)[i.p.useProp ? "prop" : "attr"]("checked", !0),
                                                $("#" + $.jgrid.jqID(this.id), i.grid.fbDiv).addClass("ui-state-highlight"))))
                                        }),
                                            J = !0,
                                            Z = []) : ($(i.rows).each(function(t) {
                                            t > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass("ui-state-disabled") || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(this.id))[i.p.useProp ? "prop" : "attr"]("checked", !1),
                                                $(this).removeClass("ui-state-highlight").attr("aria-selected", "false"),
                                                Z.push(this.id),
                                            e && ($("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(this.id), i.grid.fbDiv)[i.p.useProp ? "prop" : "attr"]("checked", !1),
                                                $("#" + $.jgrid.jqID(this.id), i.grid.fbDiv).removeClass("ui-state-highlight"))))
                                        }),
                                            i.p.selrow = null,
                                            J = !1),
                                            $(i).triggerHandler("jqGridSelectAll", [J ? i.p.selarrrow : Z, J]),
                                        $.isFunction(i.p.onSelectAll) && i.p.onSelectAll.call(i, J ? i.p.selarrrow : Z, J)
                                    })
                                }
                                if (!0 === i.p.autowidth) {
                                    var ee = $(l).innerWidth();
                                    i.p.width = ee > 0 ? ee : "nw"
                                }
                                !function() {
                                    var e, t, a, o, d = 0, s = $.jgrid.cell_width ? 0 : p(i.p.cellLayout, 0), l = 0, n = p(i.p.scrollOffset, 0), c = !1, u = 0;
                                    $.each(i.p.colModel, function() {
                                        if (void 0 === this.hidden && (this.hidden = !1),
                                            i.p.grouping && i.p.autowidth) {
                                            var e = $.inArray(this.name, i.p.groupingView.groupField);
                                            e >= 0 && i.p.groupingView.groupColumnShow.length > e && (this.hidden = !i.p.groupingView.groupColumnShow[e])
                                        }
                                        this.widthOrg = t = p(this.width, 0),
                                        !1 === this.hidden && (d += t + s,
                                            this.fixed ? u += t + s : l++)
                                    }),
                                    isNaN(i.p.width) && (i.p.width = d + (!1 !== i.p.shrinkToFit || isNaN(i.p.height) ? 0 : n)),
                                        r.width = i.p.width,
                                        i.p.tblwidth = d,
                                    !1 === i.p.shrinkToFit && !0 === i.p.forceFit && (i.p.forceFit = !1),
                                    !0 === i.p.shrinkToFit && l > 0 && (a = r.width - s * l - u,
                                    isNaN(i.p.height) || (a -= n,
                                        c = !0),
                                        d = 0,
                                        $.each(i.p.colModel, function(r) {
                                            !1 !== this.hidden || this.fixed || (t = Math.round(a * this.width / (i.p.tblwidth - s * l - u)),
                                                this.width = t,
                                                d += t,
                                                e = r)
                                        }),
                                        o = 0,
                                        c ? r.width - u - (d + s * l) !== n && (o = r.width - u - (d + s * l) - n) : c || 1 === Math.abs(r.width - u - (d + s * l)) || (o = r.width - u - (d + s * l)),
                                        i.p.colModel[e].width += o,
                                        i.p.tblwidth = d + o + s * l + u,
                                    i.p.tblwidth > i.p.width && (i.p.colModel[e].width -= i.p.tblwidth - parseInt(i.p.width, 10),
                                        i.p.tblwidth = i.p.width))
                                }(),
                                    $(l).css("width", r.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + i.p.id + "'>&#160;</div>"),
                                    $(d).css("width", r.width + "px"),
                                    V = $("thead:first", i).get(0);
                                var te = "";
                                i.p.footerrow && (te += "<table role='grid' style='width:" + i.p.tblwidth + "px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-" + o + "'>");
                                var ie = $("tr:first", V)
                                    , re = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
                                if (i.p.disableClick = !1,
                                        $("th", ie).each(function(e) {
                                            P = i.p.colModel[e].width,
                                            void 0 === i.p.colModel[e].resizable && (i.p.colModel[e].resizable = !0),
                                                i.p.colModel[e].resizable ? (O = document.createElement("span"),
                                                    $(O).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + o).css("cursor", "col-resize"),
                                                    $(this).addClass(i.p.resizeclass)) : O = "",
                                                $(this).css("width", P + "px").prepend(O),
                                                O = null;
                                            var t = "";
                                            i.p.colModel[e].hidden && ($(this).css("display", "none"),
                                                t = "display:none;"),
                                                re += "<td role='gridcell' style='height:0px;width:" + P + "px;" + t + "'></td>",
                                                r.headers[e] = {
                                                    width: P,
                                                    el: this
                                                },
                                            "boolean" != typeof (T = i.p.colModel[e].sortable) && (i.p.colModel[e].sortable = !0,
                                                T = !0);
                                            var a = i.p.colModel[e].name;
                                            "cb" !== a && "subgrid" !== a && "rn" !== a && i.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"),
                                            T && (i.p.multiSort ? i.p.viewsortcols[0] ? ($("div span.s-ico", this).show(),
                                            i.p.colModel[e].lso && $("div span.ui-icon-" + i.p.colModel[e].lso, this).removeClass("ui-state-disabled")) : i.p.colModel[e].lso && ($("div span.s-ico", this).show(),
                                                $("div span.ui-icon-" + i.p.colModel[e].lso, this).removeClass("ui-state-disabled")) : i.p.viewsortcols[0] ? ($("div span.s-ico", this).show(),
                                            e === i.p.lastsort && $("div span.ui-icon-" + i.p.sortorder, this).removeClass("ui-state-disabled")) : e === i.p.lastsort && ($("div span.s-ico", this).show(),
                                                $("div span.ui-icon-" + i.p.sortorder, this).removeClass("ui-state-disabled"))),
                                            i.p.footerrow && (te += "<td role='gridcell' " + c(e, 0, "", null, "", !1) + ">&#160;</td>")
                                        }).mousedown(function(e) {
                                            if (1 === $(e.target).closest("th>span.ui-jqgrid-resize").length) {
                                                var t = N(this);
                                                return !0 === i.p.forceFit && (i.p.nv = M(t)),
                                                    r.dragStart(t, e, R(t)),
                                                    !1
                                            }
                                        }).click(function(e) {
                                            if (i.p.disableClick)
                                                return i.p.disableClick = !1,
                                                    !1;
                                            var t, r, a = "th>div.ui-jqgrid-sortable";
                                            i.p.viewsortcols[2] || (a = "th>div>span>span.ui-grid-ico-sort");
                                            var o = $(e.target).closest(a);
                                            if (1 === o.length) {
                                                var d;
                                                if (i.p.frozenColumns) {
                                                    var s = $(this)[0].id.substring(i.p.id.length + 1);
                                                    $(i.p.colModel).each(function(e) {
                                                        if (this.name === s)
                                                            return d = e,
                                                                !1
                                                    })
                                                } else
                                                    d = N(this);
                                                return i.p.viewsortcols[2] || (t = !0,
                                                    r = o.attr("sort")),
                                                null != d && S($("div", this)[0].id, d, t, r, this),
                                                    !1
                                            }
                                        }),
                                    i.p.sortable && $.fn.sortable)
                                    try {
                                        $(i).jqGrid("sortableColumns", ie)
                                    } catch (e) {}
                                i.p.footerrow && (te += "</tr></tbody></table>"),
                                    re += "</tr>",
                                    B = document.createElement("tbody"),
                                    this.appendChild(B),
                                    $(this).addClass("ui-jqgrid-btable").append(re),
                                    re = null;
                                var ae = $("<table class='ui-jqgrid-htable' style='width:" + i.p.tblwidth + "px' role='grid' aria-labelledby='gbox_" + this.id + "' cellspacing='0' cellpadding='0' border='0'></table>").append(V)
                                    , oe = !(!i.p.caption || !0 !== i.p.hiddengrid)
                                    , de = $("<div class='ui-jqgrid-hbox" + ("rtl" === o ? "-rtl" : "") + "'></div>");
                                V = null,
                                    r.hDiv = document.createElement("div"),
                                    $(r.hDiv).css({
                                        width: r.width + "px"
                                    }).addClass("ui-state-default ui-jqgrid-hdiv").append(de),
                                    $(de).append(ae),
                                    ae = null,
                                oe && $(r.hDiv).hide(),
                                i.p.pager && ("string" == typeof i.p.pager ? "#" !== i.p.pager.substr(0, 1) && (i.p.pager = "#" + i.p.pager) : i.p.pager = "#" + $(i.p.pager).attr("id"),
                                    $(i.p.pager).css({
                                        width: r.width + "px"
                                    }).addClass("ui-state-default ui-jqgrid-pager ui-corner-bottom").appendTo(l),
                                oe && $(i.p.pager).hide(),
                                    F(i.p.pager, "")),
                                !1 === i.p.cellEdit && !0 === i.p.hoverrows && $(i).bind("mouseover", function(e) {
                                    H = $(e.target).closest("tr.jqgrow"),
                                    "ui-subgrid" !== $(H).attr("class") && ($(H).addClass("ui-state-hover"),
                                        !1 === this.p.cellEdit ? $(H).addClass("edit-false") : $(H).removeClass("edit-false"))
                                }).bind("mouseout", function(e) {
                                    H = $(e.target).closest("tr.jqgrow"),
                                        $(H).removeClass("ui-state-hover edit-false")
                                });
                                var se, le, ne;
                                $(i).before(r.hDiv).click(function(e) {
                                    if (z = e.target,
                                            H = $(z, i.rows).closest("tr.jqgrow"),
                                        0 === $(H).length || H[0].className.indexOf("ui-state-disabled") > -1 || ($(z, i).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== i.id)
                                        return this;
                                    var t = $(z).hasClass("cbox")
                                        , r = $(i).triggerHandler("jqGridBeforeSelectRow", [H[0].id, e]);
                                    if ((r = !1 !== r && "stop" !== r) && $.isFunction(i.p.beforeSelectRow) && (r = i.p.beforeSelectRow.call(i, H[0].id, e)),
                                        "A" !== z.tagName && ("INPUT" !== z.tagName && "TEXTAREA" !== z.tagName && "OPTION" !== z.tagName && "SELECT" !== z.tagName || t) && !0 === r)
                                        if (se = H[0].id,
                                                le = $.jgrid.getCellIndex(z),
                                                ne = $(z).closest("td,th").html(),
                                                $(i).triggerHandler("jqGridCellSelect", [se, le, ne, e]),
                                            $.isFunction(i.p.onCellSelect) && i.p.onCellSelect.call(i, se, le, ne, e),
                                            !0 === i.p.cellEdit)
                                            if (i.p.multiselect && t)
                                                $(i).jqGrid("setSelection", se, !0, e);
                                            else {
                                                se = H[0].rowIndex;
                                                try {
                                                    $(i).jqGrid("editCell", se, le, !0)
                                                } catch (e) {}
                                            }
                                        else if (i.p.multikey)
                                            e[i.p.multikey] ? $(i).jqGrid("setSelection", se, !0, e) : i.p.multiselect && t && (t = $("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + se).is(":checked"),
                                                $("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + se)[i.p.useProp ? "prop" : "attr"]("checked", t));
                                        else if (i.p.multiselect && i.p.multiboxonly)
                                            if (t)
                                                $(i).jqGrid("setSelection", se, !0, e);
                                            else {
                                                var a = i.p.frozenColumns ? i.p.id + "_frozen" : "";
                                                $(i.p.selarrrow).each(function(e, t) {
                                                    var r = $(i).jqGrid("getGridRowById", t);
                                                    r && $(r).removeClass("ui-state-highlight"),
                                                        $("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(t))[i.p.useProp ? "prop" : "attr"]("checked", !1),
                                                    a && ($("#" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(a)).removeClass("ui-state-highlight"),
                                                        $("#jqg_" + $.jgrid.jqID(i.p.id) + "_" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(a))[i.p.useProp ? "prop" : "attr"]("checked", !1))
                                                }),
                                                    i.p.selarrrow = [],
                                                    $(i).jqGrid("setSelection", se, !0, e)
                                            }
                                        else
                                            $(i).jqGrid("setSelection", se, !0, e)
                                }).bind("reloadGrid", function(e, t) {
                                    if (!0 === i.p.treeGrid && (i.p.datatype = i.p.treedatatype),
                                        t && t.current && i.grid.selectionPreserver(i),
                                            "local" === i.p.datatype ? ($(i).jqGrid("resetSelection"),
                                            i.p.data.length && w()) : i.p.treeGrid || (i.p.selrow = null,
                                            i.p.multiselect && (i.p.selarrrow = [],
                                                G(!1)),
                                                i.p.savedRow = []),
                                        i.p.scroll && b.call(i, !0, !1),
                                        t && t.page) {
                                        var r = t.page;
                                        r > i.p.lastpage && (r = i.p.lastpage),
                                        r < 1 && (r = 1),
                                            i.p.page = r,
                                            i.grid.prevRowHeight ? i.grid.bDiv.scrollTop = (r - 1) * i.grid.prevRowHeight * i.p.rowNum : i.grid.bDiv.scrollTop = 0
                                    }
                                    return i.grid.prevRowHeight && i.p.scroll ? (delete i.p.lastpage,
                                        i.grid.populateVisible()) : i.grid.populate(),
                                    !0 === i.p._inlinenav && $(i).jqGrid("showAddEditButtons"),
                                        !1
                                }).dblclick(function(e) {
                                    z = e.target,
                                        H = $(z, i.rows).closest("tr.jqgrow"),
                                    0 !== $(H).length && (se = H[0].rowIndex,
                                        le = $.jgrid.getCellIndex(z),
                                        $(i).triggerHandler("jqGridDblClickRow", [$(H).attr("id"), se, le, e]),
                                    $.isFunction(i.p.ondblClickRow) && i.p.ondblClickRow.call(i, $(H).attr("id"), se, le, e))
                                }).bind("contextmenu", function(e) {
                                    z = e.target,
                                        H = $(z, i.rows).closest("tr.jqgrow"),
                                    0 !== $(H).length && (i.p.multiselect || $(i).jqGrid("setSelection", H[0].id, !0, e),
                                        se = H[0].rowIndex,
                                        le = $.jgrid.getCellIndex(z),
                                        $(i).triggerHandler("jqGridRightClickRow", [$(H).attr("id"), se, le, e]),
                                    $.isFunction(i.p.onRightClickRow) && i.p.onRightClickRow.call(i, $(H).attr("id"), se, le, e))
                                }),
                                    r.bDiv = document.createElement("div"),
                                s && "auto" === String(i.p.height).toLowerCase() && (i.p.height = "100%"),
                                    $(r.bDiv).append($('<div style="position:relative;' + (s && $.jgrid.msiever() < 8 ? "height:0.01%;" : "") + '"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                                        height: i.p.height + (isNaN(i.p.height) ? "" : "px"),
                                        width: r.width + "px"
                                    }).scroll(r.scrollGrid),
                                    $("table:first", r.bDiv).css({
                                        width: i.p.tblwidth + "px"
                                    }),
                                $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(),
                                i.p.multikey && ($.jgrid.msie ? $(r.bDiv).bind("selectstart", function() {
                                    return !1
                                }) : $(r.bDiv).bind("mousedown", function() {
                                    return !1
                                })),
                                oe && $(r.bDiv).hide(),
                                    r.cDiv = document.createElement("div");
                                var pe = !0 === i.p.hidegrid ? $("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton' />").hover(function() {
                                    pe.addClass("ui-state-hover")
                                }, function() {
                                    pe.removeClass("ui-state-hover")
                                }).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css("rtl" === o ? "left" : "right", "0px") : "";
                                if ($(r.cDiv).append(pe).append("<span class='ui-jqgrid-title'>" + i.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === o ? "-rtl" : "") + " ui-widget-header ui-corner-top ui-helper-clearfix"),
                                        $(r.cDiv).insertBefore(r.hDiv),
                                    i.p.toolbar[0] && (r.uDiv = document.createElement("div"),
                                        "top" === i.p.toolbar[1] ? $(r.uDiv).insertBefore(r.hDiv) : "bottom" === i.p.toolbar[1] && $(r.uDiv).insertAfter(r.hDiv),
                                        "both" === i.p.toolbar[1] ? (r.ubDiv = document.createElement("div"),
                                            $(r.uDiv).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id).insertBefore(r.hDiv),
                                            $(r.ubDiv).addClass("ui-userdata ui-state-default").attr("id", "tb_" + this.id).insertAfter(r.hDiv),
                                        oe && $(r.ubDiv).hide()) : $(r.uDiv).width(r.width).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id),
                                    oe && $(r.uDiv).hide()),
                                    i.p.toppager && (i.p.toppager = $.jgrid.jqID(i.p.id) + "_toppager",
                                        r.topDiv = $("<div id='" + i.p.toppager + "'></div>")[0],
                                        i.p.toppager = "#" + i.p.toppager,
                                        $(r.topDiv).addClass("ui-state-default ui-jqgrid-toppager").width(r.width).insertBefore(r.hDiv),
                                        F(i.p.toppager, "_t")),
                                    i.p.footerrow && (r.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0],
                                        de = $("<div class='ui-jqgrid-hbox" + ("rtl" === o ? "-rtl" : "") + "'></div>"),
                                        $(r.sDiv).append(de).width(r.width).insertAfter(r.hDiv),
                                        $(de).append(te),
                                        r.footers = $(".ui-jqgrid-ftable", r.sDiv)[0].rows[0].cells,
                                    i.p.rownumbers && (r.footers[0].className = "ui-state-default jqgrid-rownum"),
                                    oe && $(r.sDiv).hide()),
                                        de = null,
                                        i.p.caption) {
                                    var ce = i.p.datatype;
                                    !0 === i.p.hidegrid && ($(".ui-jqgrid-titlebar-close", r.cDiv).click(function(e) {
                                        var t, a = $.isFunction(i.p.onHeaderClick), o = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv", d = this;
                                        return !0 === i.p.toolbar[0] && ("both" === i.p.toolbar[1] && (o += ", #" + $(r.ubDiv).attr("id")),
                                            o += ", #" + $(r.uDiv).attr("id")),
                                            t = $(o, "#gview_" + $.jgrid.jqID(i.p.id)).length,
                                            "visible" === i.p.gridstate ? $(o, "#gbox_" + $.jgrid.jqID(i.p.id)).slideUp("fast", function() {
                                                0 === --t && ($("span", d).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"),
                                                    i.p.gridstate = "hidden",
                                                $("#gbox_" + $.jgrid.jqID(i.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(i.p.id)).hide(),
                                                    $(i).triggerHandler("jqGridHeaderClick", [i.p.gridstate, e]),
                                                a && (oe || i.p.onHeaderClick.call(i, i.p.gridstate, e)))
                                            }) : "hidden" === i.p.gridstate && $(o, "#gbox_" + $.jgrid.jqID(i.p.id)).slideDown("fast", function() {
                                                0 === --t && ($("span", d).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"),
                                                oe && (i.p.datatype = ce,
                                                    I(),
                                                    oe = !1),
                                                    i.p.gridstate = "visible",
                                                $("#gbox_" + $.jgrid.jqID(i.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(i.p.id)).show(),
                                                    $(i).triggerHandler("jqGridHeaderClick", [i.p.gridstate, e]),
                                                a && (oe || i.p.onHeaderClick.call(i, i.p.gridstate, e)))
                                            }),
                                            !1
                                    }),
                                    oe && (i.p.datatype = "local",
                                        $(".ui-jqgrid-titlebar-close", r.cDiv).trigger("click")))
                                } else
                                    $(r.cDiv).hide(),
                                        $(r.hDiv).addClass("ui-corner-top");
                                $(r.hDiv).after(r.bDiv).mousemove(function(e) {
                                    if (r.resizing)
                                        return r.dragMove(e),
                                            !1
                                }),
                                    $(".ui-jqgrid-labels", r.hDiv).bind("selectstart", function() {
                                        return !1
                                    }),
                                    $(document).bind("mouseup.jqGrid" + i.p.id, function() {
                                        return !r.resizing || (r.dragEnd(),
                                            !1)
                                    }),
                                    i.formatCol = c,
                                    i.sortData = S,
                                    i.updatepager = function(e, t) {
                                        var r, a, o, d, s, l, n, c, u = "", h = i.p.pager ? "_" + $.jgrid.jqID(i.p.pager.substr(1)) : "", g = i.p.toppager ? "_" + i.p.toppager.substr(1) : "";
                                        if ((o = parseInt(i.p.page, 10) - 1) < 0 && (o = 0),
                                                o *= parseInt(i.p.rowNum, 10),
                                                s = o + i.p.reccount,
                                                i.p.scroll) {
                                            var f = $("tbody:first > tr:gt(0)", i.grid.bDiv);
                                            o = s - f.length,
                                                i.p.reccount = f.length;
                                            var m = f.outerHeight() || i.grid.prevRowHeight;
                                            if (m) {
                                                var v = o * m
                                                    , j = parseInt(i.p.records, 10) * m;
                                                $(">div:first", i.grid.bDiv).css({
                                                    height: j
                                                }).children("div:first").css({
                                                    height: v,
                                                    display: v ? "" : "none"
                                                }),
                                                0 == i.grid.bDiv.scrollTop && i.p.page > 1 && (i.grid.bDiv.scrollTop = i.p.rowNum * (i.p.page - 1) * m)
                                            }
                                            i.grid.bDiv.scrollLeft = i.grid.hDiv.scrollLeft
                                        }
                                        u = i.p.pager || "",
                                        (u += i.p.toppager ? u ? "," + i.p.toppager : i.p.toppager : "") && (n = $.jgrid.formatter.integer || {},
                                            r = p(i.p.page),
                                            a = p(i.p.lastpage),
                                            $(".selbox", u)[this.p.useProp ? "prop" : "attr"]("disabled", !1),
                                        !0 === i.p.pginput && ($(".ui-pg-input", u).val(i.p.page),
                                            c = i.p.toppager ? "#sp_1" + h + ",#sp_1" + g : "#sp_1" + h,
                                            $(c).html($.fmatter ? $.fmatter.util.NumberFormat(i.p.lastpage, n) : i.p.lastpage)),
                                        i.p.viewrecords && (0 === i.p.reccount ? $(".ui-paging-info", u).html(i.p.emptyrecords) : (d = o + 1,
                                            l = i.p.records,
                                        $.fmatter && (d = $.fmatter.util.NumberFormat(d, n),
                                            s = $.fmatter.util.NumberFormat(s, n),
                                            l = $.fmatter.util.NumberFormat(l, n)),
                                            $(".ui-paging-info", u).html($.jgrid.format(i.p.recordtext, d, s, l)))),
                                        !0 === i.p.pgbuttons && (r <= 0 && (r = a = 0),
                                            1 === r || 0 === r ? ($("#first" + h + ", #prev" + h).addClass("ui-state-disabled").removeClass("ui-state-hover"),
                                            i.p.toppager && $("#first_t" + g + ", #prev_t" + g).addClass("ui-state-disabled").removeClass("ui-state-hover")) : ($("#first" + h + ", #prev" + h).removeClass("ui-state-disabled"),
                                            i.p.toppager && $("#first_t" + g + ", #prev_t" + g).removeClass("ui-state-disabled")),
                                            r === a || 0 === r ? ($("#next" + h + ", #last" + h).addClass("ui-state-disabled").removeClass("ui-state-hover"),
                                            i.p.toppager && $("#next_t" + g + ", #last_t" + g).addClass("ui-state-disabled").removeClass("ui-state-hover")) : ($("#next" + h + ", #last" + h).removeClass("ui-state-disabled"),
                                            i.p.toppager && $("#next_t" + g + ", #last_t" + g).removeClass("ui-state-disabled")))),
                                        !0 === e && !0 === i.p.rownumbers && $(">td.jqgrid-rownum", i.rows).each(function(e) {
                                            $(this).html(o + 1 + e)
                                        }),
                                        t && i.p.jqgdnd && $(i).jqGrid("gridDnD", "updateDnD"),
                                            $(i).triggerHandler("jqGridGridComplete"),
                                        $.isFunction(i.p.gridComplete) && i.p.gridComplete.call(i),
                                            $(i).triggerHandler("jqGridAfterGridComplete")
                                    }
                                    ,
                                    i.refreshIndex = w,
                                    i.setHeadCheckBox = G,
                                    i.constructTr = q,
                                    i.formatter = function(e, t, i, r, a) {
                                        return h(e, t, i, r, a)
                                    }
                                    ,
                                    $.extend(r, {
                                        populate: I,
                                        emptyRows: b,
                                        beginReq: _,
                                        endReq: C
                                    }),
                                    this.grid = r,
                                    i.addXmlData = function(e) {
                                        y(e, i.grid.bDiv)
                                    }
                                    ,
                                    i.addJSONData = function(e) {
                                        D(e, i.grid.bDiv)
                                    }
                                    ,
                                    this.grid.cols = this.rows[0].cells,
                                    $(i).triggerHandler("jqGridInitGrid"),
                                $.isFunction(i.p.onInitGrid) && i.p.onInitGrid.call(i),
                                    I(),
                                    i.p.hiddengrid = !1
                            } else
                                alert($.jgrid.errors.model)
                        }
                    else
                        alert("Element is not a table or has no id!")
                }
            })
        }
        ,
        $.jgrid.extend({
            getGridParam: function(e) {
                var t = this[0];
                if (t && t.grid)
                    return e ? void 0 !== t.p[e] ? t.p[e] : null : t.p
            },
            setGridParam: function(e, t) {
                return this.each(function() {
                    if (null == t && (t = !1),
                        this.grid && "object" == typeof e)
                        if (!0 === t) {
                            var i = $.extend({}, this.p, e);
                            this.p = i
                        } else
                            $.extend(!0, this.p, e)
                })
            },
            getGridRowById: function(e) {
                var t;
                return this.each(function() {
                    try {
                        for (var i = this.rows.length; i--; )
                            if (e.toString() === this.rows[i].id) {
                                t = this.rows[i];
                                break
                            }
                    } catch (i) {
                        t = $(this.grid.bDiv).find("#" + $.jgrid.jqID(e))
                    }
                }),
                    t
            },
            getDataIDs: function() {
                var e, t = [], i = 0, r = 0;
                return this.each(function() {
                    if ((e = this.rows.length) && e > 0)
                        for (; i < e; )
                            $(this.rows[i]).hasClass("jqgrow") && (t[r] = this.rows[i].id,
                                r++),
                                i++
                }),
                    t
            },
            setSelection: function(e, t, i) {
                return this.each(function() {
                    var r, a, o, d, s, l, n, p = this;
                    void 0 !== e && (t = !1 !== t,
                    !(a = $(p).jqGrid("getGridRowById", e)) || !a.className || a.className.indexOf("ui-state-disabled") > -1 || (!0 === p.p.scrollrows && (o = $(p).jqGrid("getGridRowById", e).rowIndex) >= 0 && function(e) {
                        var t = $(p.grid.bDiv)[0].clientHeight
                            , i = $(p.grid.bDiv)[0].scrollTop
                            , r = $(p.rows[e]).position().top
                            , a = p.rows[e].clientHeight;
                        r + a >= t + i ? $(p.grid.bDiv)[0].scrollTop = r - (t + i) + a + i : r < t + i && r < i && ($(p.grid.bDiv)[0].scrollTop = r)
                    }(o),
                    !0 === p.p.frozenColumns && (l = p.p.id + "_frozen"),
                        p.p.multiselect ? (p.setHeadCheckBox(!1),
                            p.p.selrow = a.id,
                            -1 === (d = $.inArray(p.p.selrow, p.p.selarrrow)) ? ("ui-subgrid" !== a.className && $(a).addClass("ui-state-highlight").attr("aria-selected", "true"),
                                r = !0,
                                p.p.selarrrow.push(p.p.selrow)) : ("ui-subgrid" !== a.className && $(a).removeClass("ui-state-highlight").attr("aria-selected", "false"),
                                r = !1,
                                p.p.selarrrow.splice(d, 1),
                                s = p.p.selarrrow[0],
                                p.p.selrow = void 0 === s ? null : s),
                            $("#jqg_" + $.jgrid.jqID(p.p.id) + "_" + $.jgrid.jqID(a.id))[p.p.useProp ? "prop" : "attr"]("checked", r),
                        l && (-1 === d ? $("#" + $.jgrid.jqID(e), "#" + $.jgrid.jqID(l)).addClass("ui-state-highlight") : $("#" + $.jgrid.jqID(e), "#" + $.jgrid.jqID(l)).removeClass("ui-state-highlight"),
                            $("#jqg_" + $.jgrid.jqID(p.p.id) + "_" + $.jgrid.jqID(e), "#" + $.jgrid.jqID(l))[p.p.useProp ? "prop" : "attr"]("checked", r)),
                        t && ($(p).triggerHandler("jqGridSelectRow", [a.id, r, i]),
                        p.p.onSelectRow && p.p.onSelectRow.call(p, a.id, r, i))) : "ui-subgrid" !== a.className && (p.p.selrow !== a.id ? ((n = $(p).jqGrid("getGridRowById", p.p.selrow)) && $(n).removeClass("ui-state-highlight").attr({
                            "aria-selected": "false",
                            tabindex: "-1"
                        }),
                            $(a).addClass("ui-state-highlight").attr({
                                "aria-selected": "true",
                                tabindex: "0"
                            }),
                        l && ($("#" + $.jgrid.jqID(p.p.selrow), "#" + $.jgrid.jqID(l)).removeClass("ui-state-highlight"),
                            $("#" + $.jgrid.jqID(e), "#" + $.jgrid.jqID(l)).addClass("ui-state-highlight")),
                            r = !0) : r = !1,
                            p.p.selrow = a.id,
                        t && ($(p).triggerHandler("jqGridSelectRow", [a.id, r, i]),
                        p.p.onSelectRow && p.p.onSelectRow.call(p, a.id, r, i)))))
                })
            },
            resetSelection: function(e) {
                return this.each(function() {
                    var t, i, r = this;
                    !0 === r.p.frozenColumns && (i = r.p.id + "_frozen"),
                        void 0 !== e ? (t = e === r.p.selrow ? r.p.selrow : e,
                            $("#" + $.jgrid.jqID(r.p.id) + " tbody:first tr#" + $.jgrid.jqID(t)).removeClass("ui-state-highlight").attr("aria-selected", "false"),
                        i && $("#" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(i)).removeClass("ui-state-highlight"),
                        r.p.multiselect && ($("#jqg_" + $.jgrid.jqID(r.p.id) + "_" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(r.p.id))[r.p.useProp ? "prop" : "attr"]("checked", !1),
                        i && $("#jqg_" + $.jgrid.jqID(r.p.id) + "_" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(i))[r.p.useProp ? "prop" : "attr"]("checked", !1),
                            r.setHeadCheckBox(!1)),
                            t = null) : r.p.multiselect ? ($(r.p.selarrrow).each(function(e, t) {
                            $($(r).jqGrid("getGridRowById", t)).removeClass("ui-state-highlight").attr("aria-selected", "false"),
                                $("#jqg_" + $.jgrid.jqID(r.p.id) + "_" + $.jgrid.jqID(t))[r.p.useProp ? "prop" : "attr"]("checked", !1),
                            i && ($("#" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(i)).removeClass("ui-state-highlight"),
                                $("#jqg_" + $.jgrid.jqID(r.p.id) + "_" + $.jgrid.jqID(t), "#" + $.jgrid.jqID(i))[r.p.useProp ? "prop" : "attr"]("checked", !1))
                        }),
                            r.setHeadCheckBox(!1),
                            r.p.selarrrow = [],
                            r.p.selrow = null) : r.p.selrow && ($("#" + $.jgrid.jqID(r.p.id) + " tbody:first tr#" + $.jgrid.jqID(r.p.selrow)).removeClass("ui-state-highlight").attr("aria-selected", "false"),
                        i && $("#" + $.jgrid.jqID(r.p.selrow), "#" + $.jgrid.jqID(i)).removeClass("ui-state-highlight"),
                            r.p.selrow = null),
                    !0 === r.p.cellEdit && parseInt(r.p.iCol, 10) >= 0 && parseInt(r.p.iRow, 10) >= 0 && ($("td:eq(" + r.p.iCol + ")", r.rows[r.p.iRow]).removeClass("edit-cell ui-state-highlight"),
                        $(r.rows[r.p.iRow]).removeClass("selected-row ui-state-hover")),
                        r.p.savedRow = []
                })
            },
            getRowData: function(e) {
                var t, i, r = {}, a = !1, o = 0;
                return this.each(function() {
                    var d, s, l = this;
                    if (void 0 === e)
                        a = !0,
                            t = [],
                            i = l.rows.length;
                    else {
                        if (!(s = $(l).jqGrid("getGridRowById", e)))
                            return r;
                        i = 2
                    }
                    for (; o < i; )
                        a && (s = l.rows[o]),
                        $(s).hasClass("jqgrow") && ($('td[role="gridcell"]', s).each(function(e) {
                            if ("cb" !== (d = l.p.colModel[e].name) && "subgrid" !== d && "rn" !== d)
                                if (!0 === l.p.treeGrid && d === l.p.ExpandColumn)
                                    r[d] = $.jgrid.htmlDecode($("span:first", this).html());
                                else
                                    try {
                                        r[d] = $.unformat.call(l, this, {
                                            rowId: s.id,
                                            colModel: l.p.colModel[e]
                                        }, e)
                                    } catch (e) {
                                        r[d] = $.jgrid.htmlDecode($(this).html())
                                    }
                            if ($.isFunction(l.p.formatCell)) {
                                var t = l.p.formatCell.call(l, s.id, d, r[d], $(s).index(), e);
                                void 0 !== t && (r[d] = t)
                            }
                        }),
                        a && (t.push(r),
                            r = {})),
                            o++
                }),
                t || r
            },
            delRowData: function(e) {
                var t, i, r, a = !1;
                return this.each(function() {
                    var o = this;
                    if (!(t = $(o).jqGrid("getGridRowById", e)))
                        return !1;
                    if (o.p.subGrid && (r = $(t).next()).hasClass("ui-subgrid") && r.remove(),
                            $(t).remove(),
                            o.p.records--,
                            o.p.reccount--,
                            o.updatepager(!0, !1),
                            a = !0,
                        o.p.multiselect && -1 !== (i = $.inArray(e, o.p.selarrrow)) && o.p.selarrrow.splice(i, 1),
                            o.p.multiselect && o.p.selarrrow.length > 0 ? o.p.selrow = o.p.selarrrow[o.p.selarrrow.length - 1] : o.p.selrow = null,
                        "local" === o.p.datatype) {
                        var d = $.jgrid.stripPref(o.p.idPrefix, e)
                            , s = o.p._index[d];
                        void 0 !== s && (o.p.data.splice(s, 1),
                            delete o.p._index[d],
                            o.refreshIndex("delete"))
                    }
                    if (!0 === o.p.altRows && a) {
                        var l = o.p.altclass;
                        $(o.rows).each(function(e) {
                            e % 2 == 1 ? $(this).addClass(l) : $(this).removeClass(l)
                        })
                    }
                }),
                    a
            },
            setRowData: function(e, t, i) {
                var r, a, o = !0;
                return this.each(function() {
                    if (!this.grid)
                        return !1;
                    var d, s, l = this, n = typeof i, p = {};
                    if (!(s = $(this).jqGrid("getGridRowById", e)))
                        return !1;
                    if (t)
                        try {
                            if ($(this.p.colModel).each(function(i) {
                                    r = this.name;
                                    var o = $.jgrid.getAccessor(t, r);
                                    if (void 0 !== o)
                                        if (p[r] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(l, o, this) : o,
                                                d = l.formatter(e, o, i, t, "edit"),
                                                a = this.title ? {
                                                    title: $.jgrid.stripHtml(d)
                                                } : {},
                                            !0 === l.p.treeGrid && r === l.p.ExpandColumn)
                                            $("td[role='gridcell']:eq(" + i + ") > span:first", s).html(d).attr(a);
                                        else {
                                            var n = $("td[role='gridcell']:eq(" + i + ")", s)
                                                , c = n.find("input");
                                            if (c.length) {
                                                if (d = "&#160;" === d ? "" : d,
                                                        c.val(d).select(),
                                                    "function" == typeof c.getCombo) {
                                                    var u = c.getCombo();
                                                    u && u.selectByText(d)
                                                }
                                            } else
                                                n.html(d);
                                            n.attr(a)
                                        }
                                }),
                                "local" === l.p.datatype) {
                                var c, u = $.jgrid.stripPref(l.p.idPrefix, e), h = l.p._index[u];
                                if (l.p.treeGrid)
                                    for (c in l.p.treeReader)
                                        l.p.treeReader.hasOwnProperty(c) && delete p[l.p.treeReader[c]];
                                void 0 !== h && (l.p.data[h] = $.extend(!0, l.p.data[h], p)),
                                    p = null
                            }
                        } catch (e) {
                            o = !1
                        }
                    o && ("string" === n ? $(s).addClass(i) : null !== i && "object" === n && $(s).css(i),
                        $(l).triggerHandler("jqGridAfterGridComplete"))
                }),
                    o
            },
            addRowData: function(e, t, i, r) {
                -1 == ["first", "last", "before", "after"].indexOf(i) && (i = "last");
                var a, o, d, s, l, n, p, c, u, h, g, f, m, v, j = !1, b = "";
                return t && ($.isArray(t) ? (u = !0,
                    h = e) : (t = [t],
                    u = !1),
                    this.each(function() {
                        var w = this
                            , q = t.length;
                        l = !0 === w.p.rownumbers ? 1 : 0,
                            d = !0 === w.p.multiselect ? 1 : 0,
                            s = !0 === w.p.subGrid ? 1 : 0,
                        u || (void 0 !== e ? e = String(e) : (e = $.jgrid.randId(),
                        !1 !== w.p.keyName && (h = w.p.keyName,
                        void 0 !== t[0][h] && (e = t[0][h])))),
                            g = w.p.altclass;
                        for (var y = 0, D = "", x = {}, _ = !!$.isFunction(w.p.afterInsertRow); y < q; ) {
                            if (f = t[y],
                                    o = [],
                                    u) {
                                try {
                                    void 0 === (e = f[h]) && (e = $.jgrid.randId())
                                } catch (t) {
                                    e = $.jgrid.randId()
                                }
                                D = !0 === w.p.altRows && (w.rows.length - 1) % 2 == 0 ? g : ""
                            }
                            for (v = e,
                                     e = w.p.idPrefix + e,
                                 l && (b = w.formatCol(0, 1, "", null, e, !0),
                                     o[o.length] = '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + b + ">0</td>"),
                                 d && (c = '<input role="checkbox" type="checkbox" id="jqg_' + w.p.id + "_" + e + '" class="cbox"/>',
                                     b = w.formatCol(l, 1, "", null, e, !0),
                                     o[o.length] = '<td role="gridcell" ' + b + ">" + c + "</td>"),
                                 s && (o[o.length] = $(w).jqGrid("addSubGridCell", d + l, 1)),
                                     p = d + s + l; p < w.p.colModel.length; p++)
                                m = w.p.colModel[p],
                                    x[a = m.name] = f[a],
                                    c = w.formatter(e, $.jgrid.getAccessor(f, a), p, f),
                                    b = w.formatCol(p, 1, c, f, e, x),
                                    o[o.length] = '<td role="gridcell" ' + b + ">" + c + "</td>";
                            if (o.unshift(w.constructTr(e, !1, D, x, f, !1)),
                                    o[o.length] = "</tr>",
                                0 === w.rows.length)
                                $("table:first", w.grid.bDiv).append(o.join(""));
                            else
                                switch (i) {
                                    case "last":
                                        $(w.rows[w.rows.length - 1]).after(o.join("")),
                                            n = w.rows.length - 1;
                                        break;
                                    case "first":
                                        $(w.rows[0]).after(o.join("")),
                                            n = 1;
                                        break;
                                    case "after":
                                        (n = $(w).jqGrid("getGridRowById", r)) && ($(w.rows[n.rowIndex + 1]).hasClass("ui-subgrid") ? $(w.rows[n.rowIndex + 1]).after(o) : $(n).after(o.join("")),
                                            n = n.rowIndex + 1);
                                        break;
                                    case "before":
                                        (n = $(w).jqGrid("getGridRowById", r)) && ($(n).before(o.join("")),
                                            n = n.rowIndex - 1)
                                }
                            !0 === w.p.subGrid && $(w).jqGrid("addSubGrid", d + l, n),
                                w.p.records++,
                                w.p.reccount++,
                                $(w).triggerHandler("jqGridAfterInsertRow", [e, f, f]),
                            _ && w.p.afterInsertRow.call(w, e, f, f),
                                y++,
                            "local" === w.p.datatype && (x[w.p.localReader.id] = v,
                                w.p._index[v] = w.p.data.length,
                                w.p.data.push(x),
                                x = {})
                        }
                        !0 !== w.p.altRows || u || ("last" === i ? (w.rows.length - 1) % 2 == 1 && $(w.rows[w.rows.length - 1]).addClass(g) : $(w.rows).each(function(e) {
                            e % 2 == 1 ? $(this).addClass(g) : $(this).removeClass(g)
                        })),
                            w.updatepager(!0, !0),
                            j = !0
                    })),
                    j
            },
            footerData: function(e, t, i) {
                function r(e) {
                    var t;
                    for (t in e)
                        if (e.hasOwnProperty(t))
                            return !1;
                    return !0
                }
                var a, o, d = !1, s = {};
                return void 0 == e && (e = "get"),
                "boolean" != typeof i && (i = !0),
                    e = e.toLowerCase(),
                    this.each(function() {
                        var l, n = this;
                        return !(!n.grid || !n.p.footerrow) && (("set" !== e || !r(t)) && (d = !0,
                            void $(this.p.colModel).each(function(r) {
                                a = this.name,
                                    "set" === e ? void 0 !== t[a] && (l = i ? n.formatter("", t[a], r, t, "edit") : t[a],
                                        o = this.title ? {
                                            title: $.jgrid.stripHtml(l)
                                        } : {},
                                        $("tr.footrow td:eq(" + r + ")", n.grid.sDiv).html(l).attr(o),
                                        d = !0) : "get" === e && (s[a] = $("tr.footrow td:eq(" + r + ")", n.grid.sDiv).html())
                            })))
                    }),
                    "get" === e ? s : d
            },
            showHideCol: function(e, t) {
                return this.each(function() {
                    var i, r = this, a = !1, o = $.jgrid.cell_width ? 0 : r.p.cellLayout;
                    if (r.grid) {
                        "string" == typeof e && (e = [e]);
                        var d = "" === (t = "none" !== t ? "" : "none")
                            , s = r.p.groupHeader && ("object" == typeof r.p.groupHeader || $.isFunction(r.p.groupHeader));
                        s && $(r).jqGrid("destroyGroupHeader", !1),
                            $(this.p.colModel).each(function(s) {
                                if (-1 !== $.inArray(this.name, e) && this.hidden === d) {
                                    if (!0 === r.p.frozenColumns && !0 === this.frozen)
                                        return !0;
                                    $("tr[role=rowheader]", r.grid.hDiv).each(function() {
                                        $(this.cells[s]).css("display", t)
                                    }),
                                        $(r.rows).each(function() {
                                            $(this).hasClass("jqgroup") || $(this.cells[s]).css("display", t)
                                        }),
                                    r.p.footerrow && $("tr.footrow td:eq(" + s + ")", r.grid.sDiv).css("display", t),
                                        i = parseInt(this.width, 10),
                                        "none" === t ? r.p.tblwidth -= i + o : r.p.tblwidth += i + o,
                                        this.hidden = !d,
                                        a = !0,
                                        $(r).triggerHandler("jqGridShowHideCol", [d, this.name, s])
                                }
                            }),
                        !0 === a && (!0 !== r.p.shrinkToFit || isNaN(r.p.height) || (r.p.tblwidth += parseInt(r.p.scrollOffset, 10)),
                            $(r).jqGrid("setGridWidth", !0 === r.p.shrinkToFit ? r.p.tblwidth : r.p.width)),
                        s && $(r).jqGrid("setGroupHeaders", r.p.groupHeader)
                    }
                })
            },
            hideCol: function(e) {
                return this.each(function() {
                    $(this).jqGrid("showHideCol", e, "none")
                })
            },
            showCol: function(e) {
                return this.each(function() {
                    $(this).jqGrid("showHideCol", e, "")
                })
            },
            remapColumns: function(e, t, i) {
                function r(t) {
                    var i;
                    i = t.length ? $.makeArray(t) : $.extend({}, t),
                        $.each(e, function(e) {
                            t[e] = i[this]
                        })
                }
                function a(t, i) {
                    $(">tr" + (i || ""), t).each(function() {
                        var t = this
                            , i = $.makeArray(t.cells);
                        $.each(e, function() {
                            var e = i[this];
                            e && t.appendChild(e)
                        })
                    })
                }
                var o = this.get(0);
                r(o.p.colModel),
                    r(o.p.colNames),
                    r(o.grid.headers),
                    a($("thead:first", o.grid.hDiv), i && ":not(.ui-jqgrid-labels)"),
                t && a($("#" + $.jgrid.jqID(o.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"),
                o.p.footerrow && a($("tbody:first", o.grid.sDiv)),
                o.p.remapColumns && (o.p.remapColumns.length ? r(o.p.remapColumns) : o.p.remapColumns = $.makeArray(e)),
                    o.p.lastsort = $.inArray(o.p.lastsort, e),
                o.p.treeGrid && (o.p.expColInd = $.inArray(o.p.expColInd, e)),
                    $(o).triggerHandler("jqGridRemapColumns", [e, t, i])
            },
            setGridWidth: function(e, t) {
                return this.each(function() {
                    if (this.grid) {
                        var i, r, a, o, d = this, s = 0, l = $.jgrid.cell_width ? 0 : d.p.cellLayout, n = 0, p = !1, c = d.p.scrollOffset, u = 0;
                        if ("boolean" != typeof t && (t = d.p.shrinkToFit),
                                !isNaN(e)) {
                            if (e = parseInt(e, 10),
                                    d.grid.width = d.p.width = e,
                                    $("#gbox_" + $.jgrid.jqID(d.p.id)).css("width", e + "px"),
                                    $("#gview_" + $.jgrid.jqID(d.p.id)).css("width", e + "px"),
                                    $(d.grid.bDiv).css("width", e + "px"),
                                    $(d.grid.hDiv).css("width", e + "px"),
                                d.p.pager && $(d.p.pager).css("width", e + "px"),
                                d.p.toppager && $(d.p.toppager).css("width", e + "px"),
                                !0 === d.p.toolbar[0] && ($(d.grid.uDiv).css("width", e + "px"),
                                "both" === d.p.toolbar[1] && $(d.grid.ubDiv).css("width", e + "px")),
                                d.p.footerrow && $(d.grid.sDiv).css("width", e + "px"),
                                !1 === t && !0 === d.p.forceFit && (d.p.forceFit = !1),
                                !0 === t) {
                                if ($.each(d.p.colModel, function() {
                                        !1 === this.hidden && (i = this.widthOrg,
                                            s += i + l,
                                            this.fixed ? u += i + l : n++)
                                    }),
                                    0 === n)
                                    return;
                                d.p.tblwidth = s,
                                    a = e - l * n - u,
                                isNaN(d.p.height) || ($(d.grid.bDiv)[0].clientHeight < $(d.grid.bDiv)[0].scrollHeight || 1 === d.rows.length) && (p = !0,
                                    a -= c),
                                    s = 0;
                                var h = d.grid.cols.length > 0;
                                if ($.each(d.p.colModel, function(e) {
                                        if (!1 === this.hidden && !this.fixed) {
                                            if (i = this.widthOrg,
                                                (i = Math.round(a * i / (d.p.tblwidth - l * n - u))) < 0)
                                                return;
                                            this.width = i,
                                                s += i,
                                                d.grid.headers[e].width = i,
                                                d.grid.headers[e].el.style.width = i + "px",
                                            d.p.footerrow && (d.grid.footers[e].style.width = i + "px"),
                                            h && (d.grid.cols[e].style.width = i + "px"),
                                                r = e
                                        }
                                    }),
                                        !r)
                                    return;
                                if (o = 0,
                                        p ? e - u - (s + l * n) !== c && (o = e - u - (s + l * n) - c) : 1 !== Math.abs(e - u - (s + l * n)) && (o = e - u - (s + l * n)),
                                        d.p.colModel[r].width += o,
                                        d.p.tblwidth = s + o + l * n + u,
                                    d.p.tblwidth > e) {
                                    var g = d.p.tblwidth - parseInt(e, 10);
                                    d.p.tblwidth = e,
                                        i = d.p.colModel[r].width = d.p.colModel[r].width - g
                                } else
                                    i = d.p.colModel[r].width;
                                d.grid.headers[r].width = i,
                                    d.grid.headers[r].el.style.width = i + "px",
                                h && (d.grid.cols[r].style.width = i + "px"),
                                d.p.footerrow && (d.grid.footers[r].style.width = i + "px")
                            }
                            d.p.tblwidth && ($("table:first", d.grid.bDiv).css("width", d.p.tblwidth + "px"),
                                $("table:first", d.grid.hDiv).css("width", d.p.tblwidth + "px"),
                                d.grid.hDiv.scrollLeft = d.grid.bDiv.scrollLeft,
                            d.p.footerrow && $("table:first", d.grid.sDiv).css("width", d.p.tblwidth + "px"))
                        }
                    }
                })
            },
            setGridHeight: function(e) {
                return this.each(function() {
                    var t = this;
                    if (t.grid) {
                        var i = $(t.grid.bDiv);
                        i.css({
                            height: e + (isNaN(e) ? "" : "px")
                        }),
                        !0 === t.p.frozenColumns && $("#" + $.jgrid.jqID(t.p.id) + "_frozen").parent().height(i.height() - 16),
                            t.p.height = e,
                        t.p.scroll && t.grid.populateVisible()
                    }
                })
            },
            setCaption: function(e) {
                return this.each(function() {
                    this.p.caption = e,
                        $("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl", this.grid.cDiv).html(e),
                        $(this.grid.cDiv).show(),
                        $(this.grid.hDiv).removeClass("ui-corner-top")
                })
            },
            setLabel: function(e, t, i, r) {
                return this.each(function() {
                    var a = this
                        , o = -1;
                    if (a.grid && void 0 !== e && ($(a.p.colModel).each(function(t) {
                            if (this.name === e)
                                return o = t,
                                    !1
                        }),
                        o >= 0)) {
                        var d = $("tr.ui-jqgrid-labels th:eq(" + o + ")", a.grid.hDiv);
                        if (t) {
                            var s = $(".s-ico", d);
                            $("[id^=jqgh_]", d).empty().html(t).append(s),
                                a.p.colNames[o] = t
                        }
                        i && ("string" == typeof i ? $(d).addClass(i) : $(d).css(i)),
                        "object" == typeof r && $(d).attr(r)
                    }
                })
            },
            setCell: function(e, t, i, r, a, o) {
                return this.each(function() {
                    var d, s, l = this, n = -1;
                    if (l.grid && (isNaN(t) ? $(l.p.colModel).each(function(e) {
                            if (this.name === t)
                                return n = e,
                                    !1
                        }) : n = parseInt(t, 10),
                        n >= 0)) {
                        var p = $(l).jqGrid("getGridRowById", e);
                        if (p) {
                            var c = $("td:eq(" + n + ")", p);
                            if (("" !== i || !0 === o) && (d = l.formatter(e, i, n, p, "edit"),
                                    s = l.p.colModel[n].title ? {
                                        title: $.jgrid.stripHtml(d)
                                    } : {},
                                    l.p.treeGrid && $(".tree-wrap", $(c)).length > 0 ? $("span", $(c)).html(d).attr(s) : $(c).html(d).attr(s),
                                "local" === l.p.datatype)) {
                                var u, h = l.p.colModel[n];
                                i = h.formatter && "string" == typeof h.formatter && "date" === h.formatter ? $.unformat.date.call(l, i, h) : i,
                                void 0 !== (u = l.p._index[$.jgrid.stripPref(l.p.idPrefix, e)]) && (l.p.data[u][h.name] = i)
                            }
                            "string" == typeof r ? $(c).addClass(r) : r && $(c).css(r),
                            "object" == typeof a && $(c).attr(a)
                        }
                    }
                })
            },
            getCell: function(e, t) {
                var i = !1;
                return this.each(function() {
                    var r = this
                        , a = -1;
                    if (r.grid && (isNaN(t) ? $(r.p.colModel).each(function(e) {
                            if (this.name === t)
                                return a = e,
                                    !1
                        }) : a = parseInt(t, 10),
                        a >= 0)) {
                        var o = $(r).jqGrid("getGridRowById", e);
                        if (o)
                            try {
                                i = $.unformat.call(r, $("td:eq(" + a + ")", o), {
                                    rowId: o.id,
                                    colModel: r.p.colModel[a]
                                }, a)
                            } catch (e) {
                                i = $.jgrid.htmlDecode($("td:eq(" + a + ")", o).html())
                            }
                    }
                }),
                    i
            },
            getCol: function(e, t, i) {
                var r, a, o, d, s = [], l = 0;
                return t = "boolean" == typeof t && t,
                void 0 === i && (i = !1),
                    this.each(function() {
                        var n = this
                            , p = -1;
                        if (n.grid && (isNaN(e) ? $(n.p.colModel).each(function(t) {
                                if (this.name === e)
                                    return p = t,
                                        !1
                            }) : p = parseInt(e, 10),
                            p >= 0)) {
                            var c = n.rows.length
                                , u = 0
                                , h = 0;
                            if (c && c > 0) {
                                for (; u < c; ) {
                                    if ($(n.rows[u]).hasClass("jqgrow")) {
                                        try {
                                            r = $.unformat.call(n, $(n.rows[u].cells[p]), {
                                                rowId: n.rows[u].id,
                                                colModel: n.p.colModel[p]
                                            }, p)
                                        } catch (e) {
                                            r = $.jgrid.htmlDecode(n.rows[u].cells[p].innerHTML)
                                        }
                                        i ? (d = parseFloat(r),
                                        isNaN(d) || (l += d,
                                        void 0 === o && (o = a = d),
                                            a = Math.min(a, d),
                                            o = Math.max(o, d),
                                            h++)) : t ? s.push({
                                            id: n.rows[u].id,
                                            value: r
                                        }) : s.push(r)
                                    }
                                    u++
                                }
                                if (i)
                                    switch (i.toLowerCase()) {
                                        case "sum":
                                            s = l;
                                            break;
                                        case "avg":
                                            s = l / h;
                                            break;
                                        case "count":
                                            s = c - 1;
                                            break;
                                        case "min":
                                            s = a;
                                            break;
                                        case "max":
                                            s = o
                                    }
                            }
                        }
                    }),
                    s
            },
            clearGridData: function(e) {
                return this.each(function() {
                    var t = this;
                    if (t.grid) {
                        if ("boolean" != typeof e && (e = !1),
                                t.p.deepempty)
                            $("#" + $.jgrid.jqID(t.p.id) + " tbody:first tr:gt(0)").remove();
                        else {
                            var i = $("#" + $.jgrid.jqID(t.p.id) + " tbody:first tr:first")[0];
                            $("#" + $.jgrid.jqID(t.p.id) + " tbody:first").empty().append(i)
                        }
                        t.p.footerrow && e && $(".ui-jqgrid-ftable td", t.grid.sDiv).html("&#160;"),
                            t.p.selrow = null,
                            t.p.selarrrow = [],
                            t.p.savedRow = [],
                            t.p.records = 0,
                            t.p.page = 1,
                            t.p.lastpage = 0,
                            t.p.reccount = 0,
                            t.p.data = [],
                            t.p._index = {},
                            t.updatepager(!0, !1)
                    }
                })
            },
            getInd: function(e, t) {
                var i, r = !1;
                return this.each(function() {
                    (i = $(this).jqGrid("getGridRowById", e)) && (r = !0 === t ? i : i.rowIndex)
                }),
                    r
            },
            bindKeys: function(e) {
                var t = $.extend({
                    onEnter: null,
                    onSpace: null,
                    onLeftKey: null,
                    onRightKey: null,
                    scrollingRows: !0
                }, e || {});
                return this.each(function() {
                    var e = this;
                    $("body").is("[role]") || $("body").attr("role", "application"),
                        e.p.scrollrows = t.scrollingRows,
                        $(e).keydown(function(i) {
                            var r, a, o, d = $(e).find("tr[tabindex=0]")[0], s = e.p.treeReader.expanded_field;
                            if (d)
                                if (o = e.p._index[$.jgrid.stripPref(e.p.idPrefix, d.id)],
                                    37 === i.keyCode || 38 === i.keyCode || 39 === i.keyCode || 40 === i.keyCode) {
                                    if (38 === i.keyCode) {
                                        if (a = d.previousSibling,
                                                r = "",
                                                a)
                                            if ($(a).is(":hidden")) {
                                                for (; a; )
                                                    if (a = a.previousSibling,
                                                        !$(a).is(":hidden") && $(a).hasClass("jqgrow")) {
                                                        r = a.id;
                                                        break
                                                    }
                                            } else
                                                r = a.id;
                                        $(e).jqGrid("setSelection", r, !0, i),
                                            i.preventDefault()
                                    }
                                    if (40 === i.keyCode) {
                                        if (a = d.nextSibling,
                                                r = "",
                                                a)
                                            if ($(a).is(":hidden")) {
                                                for (; a; )
                                                    if (a = a.nextSibling,
                                                        !$(a).is(":hidden") && $(a).hasClass("jqgrow")) {
                                                        r = a.id;
                                                        break
                                                    }
                                            } else
                                                r = a.id;
                                        $(e).jqGrid("setSelection", r, !0, i),
                                            i.preventDefault()
                                    }
                                    37 === i.keyCode && (e.p.treeGrid && e.p.data[o][s] && $(d).find("div.treeclick").trigger("click"),
                                        $(e).triggerHandler("jqGridKeyLeft", [e.p.selrow]),
                                    $.isFunction(t.onLeftKey) && t.onLeftKey.call(e, e.p.selrow)),
                                    39 === i.keyCode && (e.p.treeGrid && !e.p.data[o][s] && $(d).find("div.treeclick").trigger("click"),
                                        $(e).triggerHandler("jqGridKeyRight", [e.p.selrow]),
                                    $.isFunction(t.onRightKey) && t.onRightKey.call(e, e.p.selrow))
                                } else
                                    13 === i.keyCode ? ($(e).triggerHandler("jqGridKeyEnter", [e.p.selrow]),
                                    $.isFunction(t.onEnter) && t.onEnter.call(e, e.p.selrow)) : 32 === i.keyCode && ($(e).triggerHandler("jqGridKeySpace", [e.p.selrow]),
                                    $.isFunction(t.onSpace) && t.onSpace.call(e, e.p.selrow))
                        })
                })
            },
            unbindKeys: function() {
                return this.each(function() {
                    $(this).unbind("keydown")
                })
            },
            getLocalRow: function(e) {
                var t, i = !1;
                return this.each(function() {
                    void 0 !== e && (t = this.p._index[$.jgrid.stripPref(this.p.idPrefix, e)]) >= 0 && (i = this.p.data[t])
                }),
                    i
            }
        })
}(jQuery),
    function(e) {
        "use strict";
        e.jgrid.extend({
            getColModel: function() {
                var e = this[0];
                return !!e.grid && e.p.colModel
            },
            getColProp: function(e) {
                var t = {}
                    , i = this[0];
                if (!i.grid)
                    return !1;
                var r, a = i.p.colModel;
                for (r = 0; r < a.length; r++)
                    if (a[r].name === e) {
                        t = a[r];
                        break
                    }
                return t
            },
            setColProp: function(t, i) {
                return this.each(function() {
                    if (this.grid && i) {
                        var r, a = this.p.colModel;
                        for (r = 0; r < a.length; r++)
                            if (a[r].name === t) {
                                e.extend(!0, this.p.colModel[r], i);
                                break
                            }
                    }
                })
            },
            sortGrid: function(e, t, i) {
                return this.each(function() {
                    var r, a = this, o = -1, d = !1;
                    if (a.grid) {
                        for (e || (e = a.p.sortname),
                                 r = 0; r < a.p.colModel.length; r++)
                            if (a.p.colModel[r].index === e || a.p.colModel[r].name === e) {
                                o = r,
                                !0 === a.p.frozenColumns && !0 === a.p.colModel[r].frozen && (d = a.grid.fhDiv.find("#" + a.p.id + "_" + e));
                                break
                            }
                        if (-1 !== o) {
                            var s = a.p.colModel[o].sortable;
                            d || (d = a.grid.headers[o].el),
                            "boolean" != typeof s && (s = !0),
                            "boolean" != typeof t && (t = !1),
                            s && a.sortData("jqgh_" + a.p.id + "_" + e, o, t, i, d)
                        }
                    }
                })
            },
            clearBeforeUnload: function() {
                return this.each(function() {
                    var t = this.grid;
                    e.isFunction(t.emptyRows) && t.emptyRows.call(this, !0, !0),
                        e(document).unbind("mouseup.jqGrid" + this.p.id),
                        e(t.hDiv).unbind("mousemove"),
                        e(this).unbind(),
                        t.dragEnd = null,
                        t.dragMove = null,
                        t.dragStart = null,
                        t.emptyRows = null,
                        t.populate = null,
                        t.populateVisible = null,
                        t.scrollGrid = null,
                        t.selectionPreserver = null,
                        t.bDiv = null,
                        t.cDiv = null,
                        t.hDiv = null,
                        t.cols = null;
                    var i, r = t.headers.length;
                    for (i = 0; i < r; i++)
                        t.headers[i].el = null;
                    this.formatCol = null,
                        this.sortData = null,
                        this.updatepager = null,
                        this.refreshIndex = null,
                        this.setHeadCheckBox = null,
                        this.constructTr = null,
                        this.formatter = null,
                        this.addXmlData = null,
                        this.addJSONData = null,
                        this.grid = null
                })
            },
            GridDestroy: function() {
                return this.each(function() {
                    if (this.grid) {
                        this.p.pager && e(this.p.pager).remove();
                        try {
                            e(this).jqGrid("clearBeforeUnload"),
                                e("#gbox_" + e.jgrid.jqID(this.id)).remove()
                        } catch (e) {}
                    }
                })
            },
            GridUnload: function() {
                return this.each(function() {
                    if (this.grid) {
                        var t = {
                            id: e(this).attr("id"),
                            cl: e(this).attr("class")
                        };
                        this.p.pager && e(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                        var i = document.createElement("table");
                        e(i).attr({
                            id: t.id
                        }),
                            i.className = t.cl;
                        var r = e.jgrid.jqID(this.id);
                        e(i).removeClass("ui-jqgrid-btable"),
                            1 === e(this.p.pager).parents("#gbox_" + r).length ? (e(i).insertBefore("#gbox_" + r).show(),
                                e(this.p.pager).insertBefore("#gbox_" + r)) : e(i).insertBefore("#gbox_" + r).show(),
                            e(this).jqGrid("clearBeforeUnload"),
                            e("#gbox_" + r).remove()
                    }
                })
            },
            setGridState: function(t) {
                return this.each(function() {
                    if (this.grid) {
                        var i = this;
                        "hidden" === t ? (e(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + e.jgrid.jqID(i.p.id)).slideUp("fast"),
                        i.p.pager && e(i.p.pager).slideUp("fast"),
                        i.p.toppager && e(i.p.toppager).slideUp("fast"),
                        !0 === i.p.toolbar[0] && ("both" === i.p.toolbar[1] && e(i.grid.ubDiv).slideUp("fast"),
                            e(i.grid.uDiv).slideUp("fast")),
                        i.p.footerrow && e(".ui-jqgrid-sdiv", "#gbox_" + e.jgrid.jqID(i.p.id)).slideUp("fast"),
                            e(".ui-jqgrid-titlebar-close span", i.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"),
                            i.p.gridstate = "hidden") : "visible" === t && (e(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + e.jgrid.jqID(i.p.id)).slideDown("fast"),
                        i.p.pager && e(i.p.pager).slideDown("fast"),
                        i.p.toppager && e(i.p.toppager).slideDown("fast"),
                        !0 === i.p.toolbar[0] && ("both" === i.p.toolbar[1] && e(i.grid.ubDiv).slideDown("fast"),
                            e(i.grid.uDiv).slideDown("fast")),
                        i.p.footerrow && e(".ui-jqgrid-sdiv", "#gbox_" + e.jgrid.jqID(i.p.id)).slideDown("fast"),
                            e(".ui-jqgrid-titlebar-close span", i.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"),
                            i.p.gridstate = "visible")
                    }
                })
            },
            filterToolbar: function(t) {
                return t = e.extend({
                    autosearch: !0,
                    searchOnEnter: !0,
                    beforeSearch: null,
                    afterSearch: null,
                    beforeClear: null,
                    afterClear: null,
                    searchurl: "",
                    stringResult: !1,
                    groupOp: "AND",
                    defaultSearch: "bw",
                    searchOperators: !1,
                    resetIcon: "x",
                    operands: {
                        eq: "==",
                        ne: "!",
                        lt: "<",
                        le: "<=",
                        gt: ">",
                        ge: ">=",
                        bw: "^",
                        bn: "!^",
                        in: "=",
                        ni: "!=",
                        ew: "|",
                        en: "!@",
                        cn: "~",
                        nc: "!~",
                        nu: "#",
                        nn: "!#"
                    }
                }, e.jgrid.search, t || {}),
                    this.each(function() {
                        var i = this;
                        if (!this.ftoolbar) {
                            var r, a = function() {
                                var r, a, o, d = {}, s = 0, l = {};
                                e.each(i.p.colModel, function() {
                                    var n = e("#gs_" + e.jgrid.jqID(this.name), !0 === this.frozen && !0 === i.p.frozenColumns ? i.grid.fhDiv : i.grid.hDiv);
                                    if (a = this.index || this.name,
                                            o = t.searchOperators ? n.parent().prev().children("a").attr("soper") || t.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : t.defaultSearch,
                                        (r = "custom" === this.stype && e.isFunction(this.searchoptions.custom_value) && n.length > 0 && "SPAN" === n[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(i, n.children(".customelement:first"), "get") : n.val()) || "nu" === o || "nn" === o)
                                        d[a] = r,
                                            l[a] = o,
                                            s++;
                                    else
                                        try {
                                            delete i.p.postData[a]
                                        } catch (e) {}
                                });
                                var n = s > 0;
                                if (!0 === t.stringResult || "local" === i.p.datatype || !0 === t.searchOperators) {
                                    var p = '{"groupOp":"' + t.groupOp + '","rules":['
                                        , c = 0;
                                    e.each(d, function(e, t) {
                                        c > 0 && (p += ","),
                                            p += '{"field":"' + e + '",',
                                            p += '"op":"' + l[e] + '",',
                                            p += '"data":"' + (t += "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                            c++
                                    }),
                                        p += "]}",
                                        e.extend(i.p.postData, {
                                            filters: p
                                        }),
                                        e.each(["searchField", "searchString", "searchOper"], function(e, t) {
                                            i.p.postData.hasOwnProperty(t) && delete i.p.postData[t]
                                        })
                                } else
                                    e.extend(i.p.postData, d);
                                var u;
                                i.p.searchurl && (u = i.p.url,
                                    e(i).jqGrid("setGridParam", {
                                        url: i.p.searchurl
                                    }));
                                var h = "stop" === e(i).triggerHandler("jqGridToolbarBeforeSearch");
                                !h && e.isFunction(t.beforeSearch) && (h = t.beforeSearch.call(i)),
                                h || e(i).jqGrid("setGridParam", {
                                    search: n
                                }).trigger("reloadGrid", [{
                                    page: 1
                                }]),
                                u && e(i).jqGrid("setGridParam", {
                                    url: u
                                }),
                                    e(i).triggerHandler("jqGridToolbarAfterSearch"),
                                e.isFunction(t.afterSearch) && t.afterSearch.call(i)
                            }, o = function(r, o, d) {
                                e("#sopt_menu").remove(),
                                    o = parseInt(o, 10),
                                    d = parseInt(d, 10) + 18;
                                for (var s, l = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:' + (e(".ui-jqgrid-view").css("font-size") || "11px") + ";left:" + o + "px;top:" + d + 'px;">', n = e(r).attr("soper"), p = [], c = 0, u = e(r).attr("colname"), h = i.p.colModel.length; c < h && i.p.colModel[c].name !== u; )
                                    c++;
                                var g = i.p.colModel[c]
                                    , f = e.extend({}, g.searchoptions);
                                for (f.sopt || (f.sopt = [],
                                    f.sopt[0] = "select" === g.stype ? "eq" : t.defaultSearch),
                                         e.each(t.odata, function() {
                                             p.push(this.oper)
                                         }),
                                         c = 0; c < f.sopt.length; c++)
                                    -1 !== (s = e.inArray(f.sopt[c], p)) && (l += '<li class="ui-menu-item ' + (n === t.odata[s].oper ? "ui-state-highlight" : "") + '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + t.odata[s].oper + '" oper="' + t.operands[t.odata[s].oper] + '"><table cellspacing="0" cellpadding="0" border="0"><tr><td width="25px">' + t.operands[t.odata[s].oper] + "</td><td>" + t.odata[s].text + "</td></tr></table></a></li>");
                                l += "</ul>",
                                    e("body").append(l),
                                    e("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all"),
                                    e("#sopt_menu > li > a").hover(function() {
                                        e(this).addClass("ui-state-hover")
                                    }, function() {
                                        e(this).removeClass("ui-state-hover")
                                    }).click(function(o) {
                                        var d = e(this).attr("value")
                                            , s = e(this).attr("oper");
                                        if (e(i).triggerHandler("jqGridToolbarSelectOper", [d, s, r]),
                                                e("#sopt_menu").hide(),
                                                e(r).text(s).attr("soper", d),
                                            !0 === t.autosearch) {
                                            var l = e(r).parent().next().children()[0];
                                            (e(l).val() || "nu" === d || "nn" === d) && a()
                                        }
                                    })
                            }, d = e("<tr class='ui-search-toolbar' role='rowheader'></tr>");
                            e.each(i.p.colModel, function(o) {
                                var s, l, n, p, c, u = this, h = "", g = "=", f = e("<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + i.p.direction + "'></th>"), m = e("<div style='position:relative;height:auto;padding-right:0.3em;padding-left:0.3em;'></div>"), v = e("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
                                if (!0 === this.hidden && e(f).css("display", "none"),
                                        this.search = !1 !== this.search,
                                    void 0 === this.stype && (this.stype = "text"),
                                        s = e.extend({}, this.searchoptions || {}),
                                        this.search) {
                                    if (t.searchOperators) {
                                        for (p = s.sopt ? s.sopt[0] : "select" === u.stype ? "eq" : t.defaultSearch,
                                                 c = 0; c < t.odata.length; c++)
                                            if (t.odata[c].oper === p) {
                                                g = t.operands[p] || "";
                                                break
                                            }
                                        h = "<a title='" + (null != s.searchtitle ? s.searchtitle : t.operandTitle) + "' style='padding-right: 0.5em;' soper='" + p + "' class='soptclass' colname='" + this.name + "'>" + g + "</a>"
                                    }
                                    if (e("td:eq(0)", v).attr("colindex", o).append(h),
                                        void 0 === s.clearSearch && (s.clearSearch = !0),
                                            s.clearSearch) {
                                        var j = t.resetTitle || "Clear Search Value";
                                        e("td:eq(2)", v).append("<a title='" + j + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + t.resetIcon + "</a>")
                                    } else
                                        e("td:eq(2)", v).hide();
                                    switch (this.stype) {
                                        case "select":
                                            if (l = this.surl || s.dataUrl)
                                                e(n = m).append(v),
                                                    e.ajax(e.extend({
                                                        url: l,
                                                        dataType: "html",
                                                        success: function(r) {
                                                            if (void 0 !== s.buildSelect) {
                                                                var o = s.buildSelect(r);
                                                                o && e("td:eq(1)", v).append(o)
                                                            } else
                                                                e("td:eq(1)", v).append(r);
                                                            void 0 !== s.defaultValue && e("select", n).val(s.defaultValue),
                                                                e("select", n).attr({
                                                                    name: u.index || u.name,
                                                                    id: "gs_" + u.name
                                                                }),
                                                            s.attr && e("select", n).attr(s.attr),
                                                                e("select", n).css({
                                                                    width: "100%"
                                                                }),
                                                                e.jgrid.bindEv.call(i, e("select", n)[0], s),
                                                            !0 === t.autosearch && e("select", n).change(function() {
                                                                return a(),
                                                                    !1
                                                            }),
                                                                r = null
                                                        }
                                                    }, e.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                                            else {
                                                var b, w, q;
                                                if (u.searchoptions ? (b = void 0 === u.searchoptions.value ? "" : u.searchoptions.value,
                                                        w = void 0 === u.searchoptions.separator ? ":" : u.searchoptions.separator,
                                                        q = void 0 === u.searchoptions.delimiter ? ";" : u.searchoptions.delimiter) : u.editoptions && (b = void 0 === u.editoptions.value ? "" : u.editoptions.value,
                                                        w = void 0 === u.editoptions.separator ? ":" : u.editoptions.separator,
                                                        q = void 0 === u.editoptions.delimiter ? ";" : u.editoptions.delimiter),
                                                        b) {
                                                    var y = document.createElement("select");
                                                    y.style.width = "100%",
                                                        e(y).attr({
                                                            name: u.index || u.name,
                                                            id: "gs_" + u.name
                                                        });
                                                    var D, x, $, _;
                                                    if ("string" == typeof b)
                                                        for (p = b.split(q),
                                                                 _ = 0; _ < p.length; _++)
                                                            D = p[_].split(w),
                                                                (x = document.createElement("option")).value = D[0],
                                                                x.innerHTML = D[1],
                                                                y.appendChild(x);
                                                    else if ("object" == typeof b)
                                                        for ($ in b)
                                                            b.hasOwnProperty($) && ((x = document.createElement("option")).value = $,
                                                                x.innerHTML = b[$],
                                                                y.appendChild(x));
                                                    void 0 !== s.defaultValue && e(y).val(s.defaultValue),
                                                    s.attr && e(y).attr(s.attr),
                                                        e(m).append(v),
                                                        e.jgrid.bindEv.call(i, y, s),
                                                        e("td:eq(1)", v).append(y),
                                                    !0 === t.autosearch && e(y).change(function() {
                                                        return a(),
                                                            !1
                                                    })
                                                }
                                            }
                                            break;
                                        case "text":
                                            var C = void 0 !== s.defaultValue ? s.defaultValue : "";
                                            e("td:eq(1)", v).append("<input type='text' style='width:100%;padding:0px;' name='" + (u.index || u.name) + "' id='gs_" + u.name + "' value='" + C + "'/>"),
                                                e(m).append(v),
                                            s.attr && e("input", m).attr(s.attr),
                                                e.jgrid.bindEv.call(i, e("input", m)[0], s),
                                            !0 === t.autosearch && (t.searchOnEnter ? e("input", m).keypress(function(e) {
                                                return 13 === (e.charCode || e.keyCode || 0) ? (a(),
                                                    !1) : this
                                            }) : e("input", m).keydown(function(e) {
                                                switch (e.which) {
                                                    case 13:
                                                        return !1;
                                                    case 9:
                                                    case 16:
                                                    case 37:
                                                    case 38:
                                                    case 39:
                                                    case 40:
                                                    case 27:
                                                        break;
                                                    default:
                                                        r && clearTimeout(r),
                                                            r = setTimeout(function() {
                                                                a()
                                                            }, 500)
                                                }
                                            }));
                                            break;
                                        case "custom":
                                            e("td:eq(1)", v).append("<span style='width:95%;padding:0px;' name='" + (u.index || u.name) + "' id='gs_" + u.name + "'/>"),
                                                e(m).append(v);
                                            try {
                                                if (!e.isFunction(s.custom_element))
                                                    throw "e1";
                                                var I = s.custom_element.call(i, void 0 !== s.defaultValue ? s.defaultValue : "", s);
                                                if (!I)
                                                    throw "e2";
                                                I = e(I).addClass("customelement"),
                                                    e(m).find("span[name='" + (u.index || u.name) + "']").append(I)
                                            } catch (t) {
                                                "e1" === t && e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_element' " + e.jgrid.edit.msg.nodefined, e.jgrid.edit.bClose),
                                                    "e2" === t ? e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_element' " + e.jgrid.edit.msg.novalue, e.jgrid.edit.bClose) : e.jgrid.info_dialog(e.jgrid.errors.errcap, "string" == typeof t ? t : t.message, e.jgrid.edit.bClose)
                                            }
                                    }
                                }
                                e(f).append(m),
                                    e(d).append(f),
                                t.searchOperators || e("td:eq(0)", v).hide()
                            }),
                                e("table thead", i.grid.hDiv).append(d),
                            t.searchOperators && (e(".soptclass", d).click(function(t) {
                                var i = e(this).offset()
                                    , r = i.left
                                    , a = i.top;
                                o(this, r, a),
                                    t.stopPropagation()
                            }),
                                e("body").on("click", function(t) {
                                    "soptclass" !== t.target.className && e("#sopt_menu").hide()
                                })),
                                e(".clearsearchclass", d).click(function(r) {
                                    var o = e(this).parents("tr:first")
                                        , d = parseInt(e("td.ui-search-oper", o).attr("colindex"), 10)
                                        , s = e.extend({}, i.p.colModel[d].searchoptions || {})
                                        , l = s.defaultValue ? s.defaultValue : "";
                                    "select" === i.p.colModel[d].stype ? l ? e("td.ui-search-input select", o).val(l) : e("td.ui-search-input select", o)[0].selectedIndex = 0 : e("td.ui-search-input input", o).val(l),
                                    !0 === t.autosearch && a()
                                }),
                                this.ftoolbar = !0,
                                this.triggerToolbar = a,
                                this.clearToolbar = function(r) {
                                    var a, o = {}, d = 0;
                                    r = "boolean" != typeof r || r,
                                        e.each(i.p.colModel, function() {
                                            var t, r = e("#gs_" + e.jgrid.jqID(this.name), !0 === this.frozen && !0 === i.p.frozenColumns ? i.grid.fhDiv : i.grid.hDiv);
                                            switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (t = this.searchoptions.defaultValue),
                                                a = this.index || this.name,
                                                this.stype) {
                                                case "select":
                                                    if (r.find("option").each(function(i) {
                                                            if (0 === i && (this.selected = !0),
                                                                e(this).val() === t)
                                                                return this.selected = !0,
                                                                    !1
                                                        }),
                                                        void 0 !== t)
                                                        o[a] = t,
                                                            d++;
                                                    else
                                                        try {
                                                            delete i.p.postData[a]
                                                        } catch (e) {}
                                                    break;
                                                case "text":
                                                    if (r.val(t || ""),
                                                        void 0 !== t)
                                                        o[a] = t,
                                                            d++;
                                                    else
                                                        try {
                                                            delete i.p.postData[a]
                                                        } catch (e) {}
                                                    break;
                                                case "custom":
                                                    e.isFunction(this.searchoptions.custom_value) && r.length > 0 && "SPAN" === r[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(i, r.children(".customelement:first"), "set", t || "")
                                            }
                                        });
                                    var s = d > 0;
                                    if (i.p.resetsearch = !0,
                                        !0 === t.stringResult || "local" === i.p.datatype) {
                                        var l = '{"groupOp":"' + t.groupOp + '","rules":['
                                            , n = 0;
                                        e.each(o, function(e, t) {
                                            n > 0 && (l += ","),
                                                l += '{"field":"' + e + '",',
                                                l += '"op":"eq",',
                                                l += '"data":"' + (t += "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                                n++
                                        }),
                                            l += "]}",
                                            e.extend(i.p.postData, {
                                                filters: l
                                            }),
                                            e.each(["searchField", "searchString", "searchOper"], function(e, t) {
                                                i.p.postData.hasOwnProperty(t) && delete i.p.postData[t]
                                            })
                                    } else
                                        e.extend(i.p.postData, o);
                                    var p;
                                    i.p.searchurl && (p = i.p.url,
                                        e(i).jqGrid("setGridParam", {
                                            url: i.p.searchurl
                                        }));
                                    var c = "stop" === e(i).triggerHandler("jqGridToolbarBeforeClear");
                                    !c && e.isFunction(t.beforeClear) && (c = t.beforeClear.call(i)),
                                    c || r && e(i).jqGrid("setGridParam", {
                                        search: s
                                    }).trigger("reloadGrid", [{
                                        page: 1
                                    }]),
                                    p && e(i).jqGrid("setGridParam", {
                                        url: p
                                    }),
                                        e(i).triggerHandler("jqGridToolbarAfterClear"),
                                    e.isFunction(t.afterClear) && t.afterClear()
                                }
                                ,
                                this.toggleToolbar = function() {
                                    var t = e("tr.ui-search-toolbar", i.grid.hDiv)
                                        , r = !0 === i.p.frozenColumns && e("tr.ui-search-toolbar", i.grid.fhDiv);
                                    "none" === t.css("display") ? (t.show(),
                                    r && r.show()) : (t.hide(),
                                    r && r.hide())
                                }
                        }
                    })
            },
            destroyFilterToolbar: function() {
                return this.each(function() {
                    this.ftoolbar && (this.triggerToolbar = null,
                        this.clearToolbar = null,
                        this.toggleToolbar = null,
                        this.ftoolbar = !1,
                        e(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
                })
            },
            destroyGroupHeader: function(t) {
                return void 0 === t && (t = !0),
                    this.each(function() {
                        var i, r, a, o, d, s, l, n = this, p = n.grid, c = e("table.ui-jqgrid-htable thead", p.hDiv), u = n.p.colModel;
                        if (p) {
                            for (e(this).unbind(".setGroupHeaders"),
                                     i = e("<tr>", {
                                         role: "rowheader"
                                     }).addClass("ui-jqgrid-labels"),
                                     r = 0,
                                     a = (o = p.headers).length; r < a; r++) {
                                l = u[r].hidden ? "none" : "",
                                    d = e(o[r].el).width(o[r].width).css("display", l);
                                try {
                                    d.removeAttr("rowSpan")
                                } catch (e) {
                                    d.attr("rowSpan", 1)
                                }
                                i.append(d),
                                (s = d.children("span.ui-jqgrid-resize")).length > 0 && (s[0].style.height = ""),
                                    d.children("div")[0].style.top = ""
                            }
                            e(c).children("tr.ui-jqgrid-labels").remove(),
                                e(c).prepend(i),
                            !0 === t && e(n).jqGrid("setGridParam", {
                                groupHeader: null
                            })
                        }
                    })
            },
            setGroupHeaders: function(t) {
                return t = e.extend({
                    useColSpanStyle: !1,
                    groupHeaders: []
                }, t || {}),
                    this.each(function() {
                        this.p.groupHeader = t;
                        var i, r, a, o, d, s, l, n, p, c, u, h, g, f = this, m = 0, v = f.p.colModel, j = v.length, b = f.grid.headers, w = e("table.ui-jqgrid-htable", f.grid.hDiv), q = w.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"), y = w.children("thead"), D = w.find(".jqg-first-row-header");
                        void 0 === D[0] ? D = e("<tr>", {
                            role: "row",
                            "aria-hidden": "true"
                        }).addClass("jqg-first-row-header").css("height", "auto") : D.empty();
                        var x;
                        for (e(f).prepend(y),
                                 a = e("<tr>", {
                                     role: "rowheader"
                                 }).addClass("ui-jqgrid-labels jqg-third-row-header"),
                                 i = 0; i < j; i++)
                            if (d = b[i].el,
                                    s = e(d),
                                    r = v[i],
                                    l = {
                                        height: "0px",
                                        width: b[i].width + "px",
                                        display: r.hidden ? "none" : ""
                                    },
                                    e("<th>", {
                                        role: "gridcell"
                                    }).css(l).addClass("ui-first-th-" + f.p.direction).appendTo(D),
                                    d.style.width = "",
                                (n = function(e, t) {
                                    var i, r = t.length;
                                    for (i = 0; i < r; i++)
                                        if (t[i].startColumnName === e)
                                            return i;
                                    return -1
                                }(r.name, t.groupHeaders)) >= 0) {
                                for (c = (p = t.groupHeaders[n]).numberOfColumns,
                                         u = p.titleText,
                                         h = 0,
                                         n = 0; n < c && i + n < j; n++)
                                    v[i + n].hidden || h++;
                                o = e("<th>").attr({
                                    role: "columnheader"
                                }).addClass("ui-state-default ui-th-column-header ui-th-" + f.p.direction).css({
                                    height: "22px",
                                    "border-top": "0 none"
                                }).html(u),
                                h > 0 && o.attr("colspan", String(h)),
                                f.p.headertitles && o.attr("title", o.text()),
                                0 === h && o.hide(),
                                    s.before(o),
                                    a.append(d),
                                    m = c - 1
                            } else
                                0 === m ? t.useColSpanStyle ? s.attr("rowspan", "2") : (e("<th>", {
                                    role: "columnheader"
                                }).addClass("ui-state-default ui-th-column-header ui-th-" + f.p.direction).css({
                                    display: r.hidden ? "none" : "",
                                    "border-top": "0 none"
                                }).insertBefore(s),
                                    a.append(d)) : (a.append(d),
                                    m--);
                        (g = e(f).children("thead")).prepend(D),
                            a.insertAfter(q),
                            w.append(g),
                        t.useColSpanStyle && (w.find("span.ui-jqgrid-resize").each(function() {
                            var t = e(this).parent();
                            t.is(":visible") && (this.style.cssText = "height: " + t.height() + "px !important; cursor: col-resize;")
                        }),
                            w.find("div.ui-jqgrid-sortable").each(function() {
                                var t = e(this)
                                    , i = t.parent();
                                i.is(":visible") && i.is(":has(span.ui-jqgrid-resize)") && t.css("top", (i.height() - t.outerHeight()) / 2 + "px")
                            })),
                            x = g.find("tr.jqg-first-row-header"),
                            e(f).bind("jqGridResizeStop.setGroupHeaders", function(e, t, i) {
                                x.find("th").eq(i).width(t)
                            })
                    })
            },
            setFrozenColumns: function() {
                return this.each(function() {
                    if (this.grid) {
                        var t = this
                            , i = t.p.colModel
                            , r = 0
                            , a = i.length
                            , o = -1
                            , d = !1;
                        if (!0 !== t.p.subGrid && !0 !== t.p.treeGrid && !0 !== t.p.cellEdit && !t.p.sortable && !t.p.scroll) {
                            for (t.p.rownumbers && r++,
                                 t.p.multiselect && r++; r < a && !0 === i[r].frozen; )
                                d = !0,
                                    o = r,
                                    r++;
                            if (o >= 0 && d) {
                                var s = t.p.caption ? e(t.grid.cDiv).outerHeight() : 0
                                    , l = e(".ui-jqgrid-htable", "#gview_" + e.jgrid.jqID(t.p.id)).height();
                                t.p.toppager && (s += e(t.grid.topDiv).outerHeight()),
                                !0 === t.p.toolbar[0] && "bottom" !== t.p.toolbar[1] && (s += e(t.grid.uDiv).outerHeight()),
                                    t.grid.fhDiv = e('<div style="position:absolute;left:0px;top:' + s + "px;height:" + l + 'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>'),
                                    t.grid.fbDiv = e('<div style="position:absolute;left:0px;top:' + (parseInt(s, 10) + parseInt(l, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'),
                                    e("#gview_" + e.jgrid.jqID(t.p.id)).append(t.grid.fhDiv);
                                var n = e(".ui-jqgrid-htable", "#gview_" + e.jgrid.jqID(t.p.id)).clone(!0);
                                if (t.p.groupHeader) {
                                    e("tr.jqg-first-row-header, tr.jqg-third-row-header", n).each(function() {
                                        e("th:gt(" + o + ")", this).remove()
                                    });
                                    var p, c, u = -1, h = -1;
                                    e("tr.jqg-second-row-header th", n).each(function() {
                                        if (p = parseInt(e(this).attr("colspan"), 10),
                                            (c = parseInt(e(this).attr("rowspan"), 10)) && (u++,
                                                h++),
                                            p && (u += p,
                                                h++),
                                            u === o)
                                            return !1
                                    }),
                                    u !== o && (h = o),
                                        e("tr.jqg-second-row-header", n).each(function() {
                                            e("th:gt(" + h + ")", this).remove()
                                        })
                                } else
                                    e("tr", n).each(function() {
                                        e("th:gt(" + o + ")", this).remove()
                                    });
                                if (e(n).width(1),
                                        e(t.grid.fhDiv).append(n).mousemove(function(e) {
                                            if (t.grid.resizing)
                                                return t.grid.dragMove(e),
                                                    !1
                                        }),
                                        t.p.footerrow) {
                                    var g = e(".ui-jqgrid-bdiv", "#gview_" + e.jgrid.jqID(t.p.id)).height();
                                    t.grid.fsDiv = e('<div style="position:absolute;left:0px;top:' + (parseInt(s, 10) + parseInt(l, 10) + parseInt(g, 10) + 1) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>'),
                                        e("#gview_" + e.jgrid.jqID(t.p.id)).append(t.grid.fsDiv);
                                    var f = e(".ui-jqgrid-ftable", "#gview_" + e.jgrid.jqID(t.p.id)).clone(!0);
                                    e("tr", f).each(function() {
                                        e("td:gt(" + o + ")", this).remove()
                                    }),
                                        e(f).width(1),
                                        e(t.grid.fsDiv).append(f)
                                }
                                e(t).bind("jqGridResizeStop.setFrozenColumns", function(i, r, a) {
                                    var o = e(".ui-jqgrid-htable", t.grid.fhDiv);
                                    e("th:eq(" + a + ")", o).width(r);
                                    var d = e(".ui-jqgrid-btable", t.grid.fbDiv);
                                    if (e("tr:first td:eq(" + a + ")", d).width(r),
                                            t.p.footerrow) {
                                        var s = e(".ui-jqgrid-ftable", t.grid.fsDiv);
                                        e("tr:first td:eq(" + a + ")", s).width(r)
                                    }
                                }),
                                    e(t).bind("jqGridSortCol.setFrozenColumns", function(i, r, a) {
                                        var o = e("tr.ui-jqgrid-labels:last th:eq(" + t.p.lastsort + ")", t.grid.fhDiv)
                                            , d = e("tr.ui-jqgrid-labels:last th:eq(" + a + ")", t.grid.fhDiv);
                                        e("span.ui-grid-ico-sort", o).addClass("ui-state-disabled"),
                                            e(o).attr("aria-selected", "false"),
                                            e("span.ui-icon-" + t.p.sortorder, d).removeClass("ui-state-disabled"),
                                            e(d).attr("aria-selected", "true"),
                                        t.p.viewsortcols[0] || t.p.lastsort !== a && (e("span.s-ico", o).hide(),
                                            e("span.s-ico", d).show())
                                    }),
                                    e("#gview_" + e.jgrid.jqID(t.p.id)).append(t.grid.fbDiv),
                                    e(t.grid.bDiv).scroll(function() {
                                        e(t.grid.fbDiv).scrollTop(e(this).scrollTop())
                                    }),
                                !0 === t.p.hoverrows && e("#" + e.jgrid.jqID(t.p.id)).unbind("mouseover").unbind("mouseout"),
                                    e(t).bind("jqGridAfterGridComplete.setFrozenColumns", function() {
                                        e("#" + e.jgrid.jqID(t.p.id) + "_frozen").remove(),
                                            e(t.grid.fbDiv).height(e(t.grid.bDiv).height() - 16);
                                        var i = e("#" + e.jgrid.jqID(t.p.id)).clone(!0);
                                        e("tr[role=row]", i).each(function() {
                                            e("td[role=gridcell]:gt(" + o + ")", this).remove()
                                        }),
                                            e(i).width(1).attr("id", t.p.id + "_frozen"),
                                            e(t.grid.fbDiv).append(i),
                                        !0 === t.p.hoverrows && (e("tr.jqgrow", i).hover(function() {
                                            e(this).addClass("ui-state-hover"),
                                                e("#" + e.jgrid.jqID(this.id), "#" + e.jgrid.jqID(t.p.id)).addClass("ui-state-hover")
                                        }, function() {
                                            e(this).removeClass("ui-state-hover"),
                                                e("#" + e.jgrid.jqID(this.id), "#" + e.jgrid.jqID(t.p.id)).removeClass("ui-state-hover")
                                        }),
                                            e("tr.jqgrow", "#" + e.jgrid.jqID(t.p.id)).hover(function() {
                                                e(this).addClass("ui-state-hover"),
                                                    e("#" + e.jgrid.jqID(this.id), "#" + e.jgrid.jqID(t.p.id) + "_frozen").addClass("ui-state-hover")
                                            }, function() {
                                                e(this).removeClass("ui-state-hover"),
                                                    e("#" + e.jgrid.jqID(this.id), "#" + e.jgrid.jqID(t.p.id) + "_frozen").removeClass("ui-state-hover")
                                            })),
                                            i = null
                                    }),
                                t.grid.hDiv.loading || e(t).triggerHandler("jqGridAfterGridComplete"),
                                    t.p.frozenColumns = !0
                            }
                        }
                    }
                })
            },
            destroyFrozenColumns: function() {
                return this.each(function() {
                    if (this.grid && !0 === this.p.frozenColumns) {
                        var t = this;
                        if (e(t.grid.fhDiv).remove(),
                                e(t.grid.fbDiv).remove(),
                                t.grid.fhDiv = null,
                                t.grid.fbDiv = null,
                            t.p.footerrow && (e(t.grid.fsDiv).remove(),
                                t.grid.fsDiv = null),
                                e(this).unbind(".setFrozenColumns"),
                            !0 === t.p.hoverrows) {
                            var i;
                            e("#" + e.jgrid.jqID(t.p.id)).bind("mouseover", function(t) {
                                i = e(t.target).closest("tr.jqgrow"),
                                "ui-subgrid" !== e(i).attr("class") && e(i).addClass("ui-state-hover")
                            }).bind("mouseout", function(t) {
                                i = e(t.target).closest("tr.jqgrow"),
                                    e(i).removeClass("ui-state-hover")
                            })
                        }
                        this.p.frozenColumns = !1
                    }
                })
            }
        })
    }(jQuery),
    function(e) {
        "use strict";
        e.extend(e.jgrid, {
            showModal: function(e) {
                e.w.show()
            },
            closeModal: function(e) {
                e.w.hide().attr("aria-hidden", "true"),
                e.o && e.o.remove()
            },
            hideModal: function(t, i) {
                if ((i = e.extend({
                        jqm: !0,
                        gb: ""
                    }, i || {})).onClose) {
                    var r = i.gb && "string" == typeof i.gb && "#gbox_" === i.gb.substr(0, 6) ? i.onClose.call(e("#" + i.gb.substr(6))[0], t) : i.onClose(t);
                    if ("boolean" == typeof r && !r)
                        return
                }
                if (e.fn.jqm && !0 === i.jqm)
                    e(t).attr("aria-hidden", "true").jqmHide();
                else {
                    if ("" !== i.gb)
                        try {
                            e(".jqgrid-overlay:first", i.gb).hide()
                        } catch (e) {}
                    e(t).hide().attr("aria-hidden", "true")
                }
            },
            findPos: function(e) {
                var t = 0
                    , i = 0;
                if (e.offsetParent)
                    do {
                        t += e.offsetLeft,
                            i += e.offsetTop
                    } while (e = e.offsetParent);return [t, i]
            },
            createModal: function(t, i, r, a, o, d, s) {
                r = e.extend(!0, {}, e.jgrid.jqModal || {}, r);
                var l, n = document.createElement("div"), p = this;
                s = e.extend({}, s || {}),
                    l = "rtl" === e(r.gbox).attr("dir"),
                    n.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog",
                    n.id = t.themodal;
                var c = document.createElement("div");
                c.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix",
                    c.id = t.modalhead,
                    e(c).append("<span class='ui-jqdialog-title'>" + r.caption + "</span>");
                var u = e("<a href='javascript:void(0)' class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function() {
                    u.addClass("ui-state-hover")
                }, function() {
                    u.removeClass("ui-state-hover")
                }).append("<span class='ui-icon ui-icon-closethick'></span>");
                e(c).append(u),
                    l ? (n.dir = "rtl",
                        e(".ui-jqdialog-title", c).css("float", "right"),
                        e(".ui-jqdialog-titlebar-close", c).css("left", "0.3em")) : (n.dir = "ltr",
                        e(".ui-jqdialog-title", c).css("float", "left"),
                        e(".ui-jqdialog-titlebar-close", c).css("right", "0.3em"));
                var h = document.createElement("div");
                e(h).addClass("ui-jqdialog-content ui-widget-content").attr("id", t.modalcontent),
                    e(h).append(i),
                    n.appendChild(h),
                    e(n).prepend(c),
                    !0 === d ? e("body").append(n) : "string" == typeof d ? e(d).append(n) : e(n).insertBefore(a),
                    e(n).css(s),
                void 0 === r.jqModal && (r.jqModal = !0);
                var g = {};
                if (e.fn.jqm && !0 === r.jqModal) {
                    if (0 === r.left && 0 === r.top && r.overlay) {
                        var f = [];
                        f = e.jgrid.findPos(o),
                            r.left = f[0] + 4,
                            r.top = f[1] + 4
                    }
                    g.top = r.top + "px",
                        g.left = r.left
                } else
                    0 === r.left && 0 === r.top || (g.left = r.left,
                        g.top = r.top + "px");
                if (e("a.ui-jqdialog-titlebar-close", c).click(function() {
                        var i = e("#" + e.jgrid.jqID(t.themodal)).data("onClose") || r.onClose
                            , a = e("#" + e.jgrid.jqID(t.themodal)).data("gbox") || r.gbox;
                        return p.hideModal("#" + e.jgrid.jqID(t.themodal), {
                            gb: a,
                            jqm: r.jqModal,
                            onClose: i
                        }),
                            !1
                    }),
                    0 !== r.width && r.width || (r.width = 300),
                    0 !== r.height && r.height || (r.height = 200),
                        !r.zIndex) {
                    var m = e(a).parents("*[role=dialog]").filter(":first").css("z-index");
                    r.zIndex = m ? parseInt(m, 10) + 2 : 950
                }
                var v = 0;
                if (l && g.left && !d && (v = e(r.gbox).width() - (isNaN(r.width) ? 0 : parseInt(r.width, 10)) - 8,
                        g.left = parseInt(g.left, 10) + parseInt(v, 10)),
                    g.left && (g.left += "px"),
                        e(n).css(e.extend({
                            width: isNaN(r.width) ? "auto" : r.width + "px",
                            height: isNaN(r.height) ? "auto" : r.height + "px",
                            zIndex: r.zIndex,
                            overflow: "hidden"
                        }, g)).attr({
                            tabIndex: "-1",
                            role: "dialog",
                            "aria-labelledby": t.modalhead,
                            "aria-hidden": "true"
                        }),
                    void 0 === r.drag && (r.drag = !0),
                    void 0 === r.resize && (r.resize = !0),
                        r.drag)
                    if (e(c).css("cursor", "move"),
                            e.fn.jqDrag)
                        e(n).jqDrag(c);
                    else
                        try {
                            e(n).draggable({
                                handle: e("#" + e.jgrid.jqID(c.id))
                            })
                        } catch (e) {}
                if (r.resize)
                    if (e.fn.jqResize)
                        e(n).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>"),
                            e("#" + e.jgrid.jqID(t.themodal)).jqResize(".jqResize", !!t.scrollelm && "#" + e.jgrid.jqID(t.scrollelm));
                    else
                        try {
                            e(n).resizable({
                                handles: "se, sw",
                                alsoResize: !!t.scrollelm && "#" + e.jgrid.jqID(t.scrollelm)
                            })
                        } catch (e) {}
                !0 === r.closeOnEscape && e(n).keydown(function(i) {
                    if (27 == i.which) {
                        var a = e("#" + e.jgrid.jqID(t.themodal)).data("onClose") || r.onClose;
                        p.hideModal("#" + e.jgrid.jqID(t.themodal), {
                            gb: r.gbox,
                            jqm: r.jqModal,
                            onClose: a
                        })
                    }
                })
            },
            viewModal: function(t, i) {
                if (i = e.extend({
                        toTop: !0,
                        overlay: 10,
                        modal: !1,
                        overlayClass: "ui-widget-overlay",
                        onShow: e.jgrid.showModal,
                        onHide: e.jgrid.closeModal,
                        gbox: "",
                        jqm: !0,
                        jqM: !0
                    }, i || {}),
                    e.fn.jqm && !0 === i.jqm)
                    i.jqM ? e(t).attr("aria-hidden", "false").jqm(i).jqmShow() : e(t).attr("aria-hidden", "false").jqmShow();
                else {
                    "" !== i.gbox && (e(".jqgrid-overlay:first", i.gbox).show(),
                        e(t).data("gbox", i.gbox)),
                        e(t).show().attr("aria-hidden", "false");
                    try {
                        e(":input:visible", t)[0].focus()
                    } catch (e) {}
                }
            },
            info_dialog: function(t, i, r, a) {
                var o = {
                    width: 290,
                    height: "auto",
                    dataheight: "auto",
                    drag: !0,
                    resize: !1,
                    left: 250,
                    top: 170,
                    zIndex: 1e3,
                    jqModal: !0,
                    modal: !1,
                    closeOnEscape: !0,
                    align: "center",
                    buttonalign: "center",
                    buttons: []
                };
                e.extend(!0, o, e.jgrid.jqModal || {}, {
                    caption: "<b>" + t + "</b>"
                }, a || {});
                var d = o.jqModal
                    , s = this;
                e.fn.jqm && !d && (d = !1);
                var l, n = "";
                if (o.buttons.length > 0)
                    for (l = 0; l < o.buttons.length; l++)
                        void 0 === o.buttons[l].id && (o.buttons[l].id = "info_button_" + l),
                            n += "<a href='javascript:void(0)' id='" + o.buttons[l].id + "' class='fm-button ui-state-default ui-corner-all'>" + o.buttons[l].text + "</a>";
                var p = "<div id='info_id'>";
                p += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + (isNaN(o.dataheight) ? o.dataheight : o.dataheight + "px") + ";" + ("text-align:" + o.align + ";") + "'>" + i + "</div>",
                    p += r ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + o.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a href='javascript:void(0)' id='closedialog' class='fm-button ui-state-default ui-corner-all'>" + r + "</a>" + n + "</div>" : "" !== n ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + o.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + n + "</div>" : "",
                    p += "</div>";
                try {
                    "false" === e("#info_dialog").attr("aria-hidden") && e.jgrid.hideModal("#info_dialog", {
                        jqm: d
                    }),
                        e("#info_dialog").remove()
                } catch (e) {}
                e.jgrid.createModal({
                    themodal: "info_dialog",
                    modalhead: "info_head",
                    modalcontent: "info_content",
                    scrollelm: "infocnt"
                }, p, o, "", "", !0),
                n && e.each(o.buttons, function(t) {
                    e("#" + e.jgrid.jqID(this.id), "#info_id").bind("click", function() {
                        return o.buttons[t].onClick.call(e("#info_dialog")),
                            !1
                    })
                }),
                    e("#closedialog", "#info_id").click(function() {
                        return s.hideModal("#info_dialog", {
                            jqm: d,
                            onClose: e("#info_dialog").data("onClose") || o.onClose,
                            gb: e("#info_dialog").data("gbox") || o.gbox
                        }),
                            !1
                    }),
                    e(".fm-button", "#info_dialog").hover(function() {
                        e(this).addClass("ui-state-hover")
                    }, function() {
                        e(this).removeClass("ui-state-hover")
                    }),
                e.isFunction(o.beforeOpen) && o.beforeOpen(),
                    e.jgrid.viewModal("#info_dialog", {
                        onHide: function(e) {
                            e.w.hide().remove(),
                            e.o && e.o.remove()
                        },
                        modal: o.modal,
                        jqm: d
                    }),
                e.isFunction(o.afterOpen) && o.afterOpen();
                try {
                    e("#info_dialog").focus()
                } catch (e) {}
            },
            bindEv: function(t, i) {
                var r = this;
                e.isFunction(i.dataInit) && i.dataInit.call(r, t),
                i.dataEvents && e.each(i.dataEvents, function() {
                    void 0 !== this.data ? e(t).bind(this.type, this.data, this.fn) : e(t).bind(this.type, this.fn)
                })
            },
            createEl: function(t, i, r, a, o) {
                function d(t, i, r) {
                    var a = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value"];
                    void 0 !== r && e.isArray(r) && e.merge(a, r),
                        e.each(i, function(i, r) {
                            -1 === e.inArray(i, a) && e(t).attr(i, r)
                        }),
                    i.hasOwnProperty("id") || e(t).attr("id", e.jgrid.randId())
                }
                var s = ""
                    , l = this;
                switch (t) {
                    case "textarea":
                        s = document.createElement("textarea"),
                            a ? i.cols || e(s).css({
                                width: "98%"
                            }) : i.cols || (i.cols = 20),
                        i.rows || (i.rows = 2),
                        ("&nbsp;" === r || "&#160;" === r || 1 === r.length && 160 === r.charCodeAt(0)) && (r = ""),
                            s.value = r,
                            d(s, i),
                            e(s).attr({
                                role: "textbox",
                                multiline: "true"
                            });
                        break;
                    case "checkbox":
                        if (s = document.createElement("input"),
                                s.type = "checkbox",
                                i.value) {
                            var n = i.value.split(":");
                            r === n[0] && (s.checked = !0,
                                s.defaultChecked = !0),
                                s.value = n[0],
                                e(s).attr("offval", n[1])
                        } else {
                            var p = r.toLowerCase();
                            p.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== p ? (s.checked = !0,
                                s.defaultChecked = !0,
                                s.value = r) : s.value = "on",
                                e(s).attr("offval", "off")
                        }
                        d(s, i, ["value"]),
                            e(s).attr("role", "checkbox");
                        break;
                    case "select":
                        (s = document.createElement("select")).setAttribute("role", "select");
                        var c, u = [];
                        if (!0 === i.multiple ? (c = !0,
                                s.multiple = "multiple",
                                e(s).attr("aria-multiselectable", "true")) : c = !1,
                            void 0 !== i.dataUrl) {
                            var h = i.name ? String(i.id).substring(0, String(i.id).length - String(i.name).length - 1) : String(i.id)
                                , g = i.postData || o.postData;
                            l.p && l.p.idPrefix && (h = e.jgrid.stripPref(l.p.idPrefix, h)),
                                e.ajax(e.extend({
                                    url: e.isFunction(i.dataUrl) ? i.dataUrl.call(l, h, r, String(i.name)) : i.dataUrl,
                                    type: "GET",
                                    dataType: "html",
                                    data: e.isFunction(g) ? g.call(l, h, r, String(i.name)) : g,
                                    context: {
                                        elem: s,
                                        options: i,
                                        vl: r
                                    },
                                    success: function(t) {
                                        var i = []
                                            , r = this.elem
                                            , a = this.vl
                                            , o = e.extend({}, this.options)
                                            , s = !0 === o.multiple
                                            , n = e.isFunction(o.buildSelect) ? o.buildSelect.call(l, t) : t;
                                        "string" == typeof n && (n = e(e.trim(n)).html()),
                                        n && (e(r).append(n),
                                            d(r, o, g ? ["postData"] : void 0),
                                        void 0 === o.size && (o.size = s ? 3 : 1),
                                            s ? (i = a.split(","),
                                                i = e.map(i, function(t) {
                                                    return e.trim(t)
                                                })) : i[0] = e.trim(a),
                                            setTimeout(function() {
                                                e("option", r).each(function(t) {
                                                    0 === t && r.multiple && (this.selected = !1),
                                                        e(this).attr("role", "option"),
                                                    (e.inArray(e.trim(e(this).text()), i) > -1 || e.inArray(e.trim(e(this).val()), i) > -1) && (this.selected = "selected")
                                                })
                                            }, 0))
                                    }
                                }, o || {}))
                        } else if (i.value) {
                            var f;
                            void 0 === i.size && (i.size = c ? 3 : 1),
                            c && (u = r.split(","),
                                u = e.map(u, function(t) {
                                    return e.trim(t)
                                })),
                            "function" == typeof i.value && (i.value = i.value());
                            var m, v, j, b = void 0 === i.separator ? ":" : i.separator, w = void 0 === i.delimiter ? ";" : i.delimiter;
                            if ("string" == typeof i.value)
                                for (m = i.value.split(w),
                                         f = 0; f < m.length; f++)
                                    (v = m[f].split(b)).length > 2 && (v[1] = e.map(v, function(e, t) {
                                        if (t > 0)
                                            return e
                                    }).join(b)),
                                        (j = document.createElement("option")).setAttribute("role", "option"),
                                        j.value = v[0],
                                        j.innerHTML = v[1],
                                        s.appendChild(j),
                                    c || e.trim(v[0]) !== e.trim(r) && e.trim(v[1]) !== e.trim(r) || (j.selected = "selected"),
                                    c && (e.inArray(e.trim(v[1]), u) > -1 || e.inArray(e.trim(v[0]), u) > -1) && (j.selected = "selected");
                            else if ("object" == typeof i.value) {
                                var q, y = i.value;
                                for (q in y)
                                    y.hasOwnProperty(q) && ((j = document.createElement("option")).setAttribute("role", "option"),
                                        j.value = q,
                                        j.innerHTML = y[q],
                                        s.appendChild(j),
                                    c || e.trim(q) !== e.trim(r) && e.trim(y[q]) !== e.trim(r) || (j.selected = "selected"),
                                    c && (e.inArray(e.trim(y[q]), u) > -1 || e.inArray(e.trim(q), u) > -1) && (j.selected = "selected"))
                            }
                            d(s, i, ["value"])
                        }
                        break;
                    case "text":
                    case "password":
                    case "button":
                        var D;
                        D = "button" === t ? "button" : "textbox",
                            (s = document.createElement("input")).type = t,
                            s.value = r,
                            d(s, i),
                        "button" !== t && (a ? i.size || e(s).css({
                            width: "100%"
                        }) : i.size || (i.size = 20)),
                            e(s).attr("role", D).addClass(D);
                        break;
                    case "image":
                    case "file":
                        (s = document.createElement("input")).type = t,
                            d(s, i);
                        break;
                    case "custom":
                        s = document.createElement("div");
                        try {
                            if (!e.isFunction(i.custom_element))
                                throw "e1";
                            var x = i.custom_element.call(l, r, i);
                            if (!x)
                                throw "e2";
                            x = e(x).addClass("customelement").attr({
                                id: i.id,
                                name: i.name
                            }),
                                e(s).addClass("pr").empty().append(x),
                            i.trigger && e(s).append('<span class="' + i.trigger + '"></span>')
                        } catch (t) {
                            "e1" === t && e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_element' " + e.jgrid.edit.msg.nodefined, e.jgrid.edit.bClose),
                                "e2" === t ? e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_element' " + e.jgrid.edit.msg.novalue, e.jgrid.edit.bClose) : e.jgrid.info_dialog(e.jgrid.errors.errcap, "string" == typeof t ? t : t.message, e.jgrid.edit.bClose)
                        }
                }
                return s
            },
            checkDate: function(e, t) {
                var i, r = {};
                if (e = e.toLowerCase(),
                        i = -1 !== e.indexOf("/") ? "/" : -1 !== e.indexOf("-") ? "-" : -1 !== e.indexOf(".") ? "." : "/",
                        e = e.split(i),
                    3 !== (t = t.split(i)).length)
                    return !1;
                var a, o, d = -1, s = -1, l = -1;
                for (o = 0; o < e.length; o++) {
                    var n = isNaN(t[o]) ? 0 : parseInt(t[o], 10);
                    r[e[o]] = n,
                    -1 !== (a = e[o]).indexOf("y") && (d = o),
                    -1 !== a.indexOf("m") && (l = o),
                    -1 !== a.indexOf("d") && (s = o)
                }
                a = "y" === e[d] || "yyyy" === e[d] ? 4 : "yy" === e[d] ? 2 : -1;
                var p, c = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                return -1 !== d && (p = r[e[d]].toString(),
                2 === a && 1 === p.length && (a = 1),
                p.length === a && (0 !== r[e[d]] || "00" === t[d]) && (-1 !== l && (!((p = r[e[l]].toString()).length < 1 || r[e[l]] < 1 || r[e[l]] > 12) && (-1 !== s && !((p = r[e[s]].toString()).length < 1 || r[e[s]] < 1 || r[e[s]] > 31 || 2 === r[e[l]] && r[e[s]] > function(e) {
                    return e % 4 != 0 || e % 100 == 0 && e % 400 != 0 ? 28 : 29
                }(r[e[d]]) || r[e[s]] > c[r[e[l]]])))))
            },
            isEmpty: function(e) {
                return !(!e.match(/^\s+$/) && "" !== e)
            },
            checkTime: function(t) {
                var i, r = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
                if (!e.jgrid.isEmpty(t)) {
                    if (!(i = t.match(r)))
                        return !1;
                    if (i[3]) {
                        if (i[1] < 1 || i[1] > 12)
                            return !1
                    } else if (i[1] > 23)
                        return !1;
                    if (i[2] > 59)
                        return !1
                }
                return !0
            },
            checkValues: function(t, i, r, a) {
                var o, d, s, l, n, p = this, c = p.p.colModel;
                if (void 0 === r)
                    if ("string" == typeof i) {
                        for (d = 0,
                                 n = c.length; d < n; d++)
                            if (c[d].name === i) {
                                o = c[d].editrules,
                                    i = d,
                                null != c[d].formoptions && (s = c[d].formoptions.label);
                                break
                            }
                    } else
                        i >= 0 && (o = c[i].editrules);
                else
                    o = r,
                        s = void 0 === a ? "_" : a;
                if (o) {
                    if (s || (s = null != p.p.colNames ? p.p.colNames[i] : c[i].label),
                        !0 === o.required && e.jgrid.isEmpty(t))
                        return [!1, s + ": " + e.jgrid.edit.msg.required, ""];
                    var u = !1 !== o.required;
                    if (!0 === o.number && (!1 !== u || !e.jgrid.isEmpty(t)) && isNaN(t))
                        return [!1, s + ": " + e.jgrid.edit.msg.number, ""];
                    if (void 0 !== o.minValue && !isNaN(o.minValue) && parseFloat(t) < parseFloat(o.minValue))
                        return [!1, s + ": " + e.jgrid.edit.msg.minValue + " " + o.minValue, ""];
                    if (void 0 !== o.maxValue && !isNaN(o.maxValue) && parseFloat(t) > parseFloat(o.maxValue))
                        return [!1, s + ": " + e.jgrid.edit.msg.maxValue + " " + o.maxValue, ""];
                    if (!0 === o.email && !(!1 === u && e.jgrid.isEmpty(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(t)))
                        return [!1, s + ": " + e.jgrid.edit.msg.email, ""];
                    if (!0 === o.integer && (!1 !== u || !e.jgrid.isEmpty(t))) {
                        if (isNaN(t))
                            return [!1, s + ": " + e.jgrid.edit.msg.integer, ""];
                        if (t % 1 != 0 || -1 !== t.indexOf("."))
                            return [!1, s + ": " + e.jgrid.edit.msg.integer, ""]
                    }
                    if (!0 === o.date && !(!1 === u && e.jgrid.isEmpty(t) || (c[i].formatoptions && c[i].formatoptions.newformat ? (l = c[i].formatoptions.newformat,
                        e.jgrid.formatter.date.masks.hasOwnProperty(l) && (l = e.jgrid.formatter.date.masks[l])) : l = c[i].datefmt || "Y-m-d",
                            e.jgrid.checkDate(l, t))))
                        return [!1, s + ": " + e.jgrid.edit.msg.date + " - " + l, ""];
                    if (!0 === o.time && !(!1 === u && e.jgrid.isEmpty(t) || e.jgrid.checkTime(t)))
                        return [!1, s + ": " + e.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
                    if (!0 === o.url && !(!1 === u && e.jgrid.isEmpty(t) || /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i.test(t)))
                        return [!1, s + ": " + e.jgrid.edit.msg.url, ""];
                    if (!0 === o.custom && (!1 !== u || !e.jgrid.isEmpty(t))) {
                        if (e.isFunction(o.custom_func)) {
                            var h = o.custom_func.call(p, t, s, i);
                            return e.isArray(h) ? h : [!1, e.jgrid.edit.msg.customarray, ""]
                        }
                        return [!1, e.jgrid.edit.msg.customfcheck, ""]
                    }
                }
                return [!0, "", ""]
            }
        })
    }(jQuery),
    function(e) {
        "use strict";
        e.jgrid.extend({
            editCellByColName: function(t, i, r) {
                return this.each(function() {
                    var a, o, d = this;
                    if (a = e(d.rows[t + ""]).index(),
                            e(d.rows).each(function(i) {
                                var r = e(this);
                                r[0].id === t && (a = r.index())
                            }),
                            a)
                        if (e.each(d.p.colModel, function(e, t) {
                                if (t.name === i)
                                    if (t.hidden) {
                                        var r = d.p.colModel.length - 1;
                                        r = r > e ? e : r - 1,
                                            i = d.p.colModel[r + 1].name
                                    } else
                                        o = e
                            }),
                                o)
                            e(d).jqGrid("editCell", a, o, !r);
                        else
                            try {
                                console.log("jqGrid-editCellByColName: 找不到对应的colName:" + i + "，可能是之后的列都已经被隐藏")
                            } catch (e) {}
                    else
                        try {
                            console.log("jqGrid-editCellByColName: 找不到对应的rowId:" + t)
                        } catch (e) {}
                })
            },
            editCell: function(t, i, r) {
                return this.each(function() {
                    var a, o, d, s, l = this;
                    if (l.grid && !0 === l.p.cellEdit) {
                        if (i = parseInt(i, 10),
                                l.p.selrow = l.rows[t].id,
                            l.p.knv || e(l).jqGrid("GridNav"),
                            l.p.savedRow.length > 0) {
                            if (!0 === r && t == l.p.iRow && i == l.p.iCol)
                                return;
                            e(l).jqGrid("saveCell", l.p.savedRow[0].id, l.p.savedRow[0].ic)
                        } else
                            window.setTimeout(function() {
                                e("#" + e.jgrid.jqID(l.p.knv)).attr("tabindex", "-1").focus()
                            }, 0);
                        if (s = l.p.colModel[i],
                            "subgrid" !== (a = s.name) && "cb" !== a && "rn" !== a) {
                            if (d = e("td:eq(" + i + ")", l.rows[t]),
                                !0 !== s.editable || !0 !== r || d.hasClass("not-editable-cell"))
                                parseInt(l.p.iCol, 10) >= 0 && parseInt(l.p.iRow, 10) >= 0 && (e("td:eq(" + l.p.iCol + ")", l.rows[l.p.iRow]).removeClass("edit-cell ui-state-highlight"),
                                    e(l.rows[l.p.iRow]).removeClass("selected-row ui-state-hover")),
                                    d.addClass("edit-cell ui-state-highlight"),
                                    e(l.rows[t]).addClass("selected-row ui-state-hover"),
                                    o = d.html().replace(/\&#160\;/gi, ""),
                                    e(l).triggerHandler("jqGridSelectCell", [l.rows[t].id, a, o, t, i]),
                                e.isFunction(l.p.onSelectCell) && l.p.onSelectCell.call(l, l.rows[t].id, a, o, t, i);
                            else {
                                parseInt(l.p.iCol, 10) >= 0 && parseInt(l.p.iRow, 10) >= 0 && (e("td:eq(" + l.p.iCol + ")", l.rows[l.p.iRow]).removeClass("edit-cell ui-state-highlight"),
                                    e(l.rows[l.p.iRow]).removeClass("selected-row ui-state-hover")),
                                    e(d).addClass("edit-cell ui-state-highlight"),
                                    e(l.rows[t]).addClass("selected-row ui-state-hover");
                                try {
                                    o = e.unformat.call(l, d, {
                                        rowId: l.rows[t].id,
                                        colModel: s
                                    }, i)
                                } catch (t) {
                                    o = s.edittype && "textarea" === s.edittype ? e(d).text() : e(d).html()
                                }
                                if (l.p.autoencode && (o = e.jgrid.htmlDecode(o)),
                                    s.edittype || (s.edittype = "text"),
                                        l.p.savedRow.push({
                                            id: t,
                                            ic: i,
                                            name: a,
                                            v: o
                                        }),
                                    ("&nbsp;" === o || "&#160;" === o || 1 === o.length && 160 === o.charCodeAt(0)) && (o = ""),
                                        e.isFunction(l.p.formatCell)) {
                                    var n = l.p.formatCell.call(l, l.rows[t].id, a, o, t, i);
                                    void 0 !== n && (o = n)
                                }
                                var p = e.extend({}, s.editoptions || {}, {
                                    id: t + "_" + a,
                                    name: a
                                })
                                    , c = e.jgrid.createEl.call(l, s.edittype, p, o, !0, e.extend({}, e.jgrid.ajaxOptions, l.p.ajaxSelectOptions || {}));
                                e(l).triggerHandler("jqGridBeforeEditCell", [l.rows[t].id, a, o, t, i]),
                                e.isFunction(l.p.beforeEditCell) && l.p.beforeEditCell.call(l, l.rows[t].id, a, o, t, i),
                                    e(d).html("").append(c).attr("tabindex", "0"),
                                    e.jgrid.bindEv.call(l, c, p),
                                    window.setTimeout(function() {
                                        e.isFunction(p.custom_element) ? e(":input", c).select().focus() : e(c).select().focus()
                                    }, 20),
                                    e("input, select, textarea", d).unbind("keydown.once").bind("keydown.once", function(r) {
                                        if (27 === r.keyCode && (e("input.hasDatepicker", d).length > 0 ? e(".ui-datepicker").is(":hidden") ? e(l).jqGrid("restoreCell", t, i) : e("input.hasDatepicker", d).datepicker("hide") : e(l).jqGrid("restoreCell", t, i)),
                                            13 === r.keyCode) {
                                            if (l.grid.hDiv.loading)
                                                return !1;
                                            "function" == typeof l.p.colModel[i].enterCallback ? l.p.colModel[i].enterCallback() : e(l).jqGrid("nextCell", t, i)
                                        }
                                        if (9 === r.keyCode) {
                                            if (l.grid.hDiv.loading)
                                                return !1;
                                            r.shiftKey ? e(l).jqGrid("prevCell", t, i) : e(l).jqGrid("nextCell", t, i)
                                        }
                                        r.stopPropagation()
                                    }).bind("focus.once", function(e) {
                                        try {
                                            curRow = t,
                                                curCol = i
                                        } catch (e) {}
                                    }),
                                    e(l).triggerHandler("jqGridAfterEditCell", [l.rows[t].id, a, o, t, i]),
                                e.isFunction(l.p.afterEditCell) && l.p.afterEditCell.call(l, l.rows[t].id, a, o, t, i)
                            }
                            l.p.iCol = i,
                                l.p.iRow = t
                        }
                    }
                })
            },
            saveCell: function(t, i) {
                return this.each(function() {
                    var r, a = this;
                    if (a.grid && !0 === a.p.cellEdit) {
                        if (null !== (r = a.p.savedRow.length >= 1 ? 0 : null)) {
                            var o, d, s = e("td:eq(" + i + ")", a.rows[t]), l = a.p.colModel[i], n = l.name, p = e.jgrid.jqID(n);
                            switch (l.edittype) {
                                case "select":
                                    if (l.editoptions.multiple) {
                                        var c = e("#" + t + "_" + p, a.rows[t])
                                            , u = [];
                                        (o = e(c).val()) ? o.join(",") : o = "",
                                            e("option:selected", c).each(function(t, i) {
                                                u[t] = e(i).text()
                                            }),
                                            d = u.join(",")
                                    } else
                                        o = e("#" + t + "_" + p + " option:selected", a.rows[t]).val(),
                                            d = e("#" + t + "_" + p + " option:selected", a.rows[t]).text();
                                    l.formatter && (d = o);
                                    break;
                                case "checkbox":
                                    var h = ["Yes", "No"];
                                    l.editoptions && (h = l.editoptions.value.split(":")),
                                        o = e("#" + t + "_" + p, a.rows[t]).is(":checked") ? h[0] : h[1],
                                        d = o;
                                    break;
                                case "password":
                                case "text":
                                case "textarea":
                                case "button":
                                    o = e("#" + t + "_" + p, a.rows[t]).val(),
                                        d = o;
                                    break;
                                case "custom":
                                    try {
                                        if (!l.editoptions || !e.isFunction(l.editoptions.custom_value))
                                            throw "e1";
                                        if (void 0 === (o = l.editoptions.custom_value.call(a, e(".customelement", s), "get")))
                                            throw "e2";
                                        d = o
                                    } catch (t) {
                                        "e1" === t && e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_value' " + e.jgrid.edit.msg.nodefined, e.jgrid.edit.bClose),
                                            "e2" === t ? e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_value' " + e.jgrid.edit.msg.novalue, e.jgrid.edit.bClose) : e.jgrid.info_dialog(e.jgrid.errors.errcap, t.message, e.jgrid.edit.bClose)
                                    }
                            }
                            if (d !== a.p.savedRow[r].v) {
                                var g = e(a).triggerHandler("jqGridBeforeSaveCell", [a.rows[t].id, n, o, t, i]);
                                if (g && (o = g,
                                        d = g),
                                        e.isFunction(a.p.beforeSaveCell)) {
                                    var f = a.p.beforeSaveCell.call(a, a.rows[t].id, n, o, t, i);
                                    f && (o = f,
                                        d = f)
                                }
                                var m = e.jgrid.checkValues.call(a, o, i);
                                if (!0 === m[0]) {
                                    var v = e(a).triggerHandler("jqGridBeforeSubmitCell", [a.rows[t].id, n, o, t, i]) || {};
                                    if (e.isFunction(a.p.beforeSubmitCell) && ((v = a.p.beforeSubmitCell.call(a, a.rows[t].id, n, o, t, i)) || (v = {})),
                                        e("input.hasDatepicker", s).length > 0 && e("input.hasDatepicker", s).datepicker("hide"),
                                        "remote" === a.p.cellsubmit)
                                        if (a.p.cellurl) {
                                            var j = {};
                                            a.p.autoencode && (o = e.jgrid.htmlEncode(o)),
                                                j[n] = o;
                                            var b, w, q;
                                            b = (q = a.p.prmNames).id,
                                                w = q.oper,
                                                j[b] = e.jgrid.stripPref(a.p.idPrefix, a.rows[t].id),
                                                j[w] = q.editoper,
                                                j = e.extend(v, j),
                                                e("#lui_" + e.jgrid.jqID(a.p.id)).show(),
                                                a.grid.hDiv.loading = !0,
                                                e.ajax(e.extend({
                                                    url: a.p.cellurl,
                                                    data: e.isFunction(a.p.serializeCellData) ? a.p.serializeCellData.call(a, j) : j,
                                                    type: "POST",
                                                    complete: function(r, l) {
                                                        if (e("#lui_" + a.p.id).hide(),
                                                                a.grid.hDiv.loading = !1,
                                                            "success" === l) {
                                                            var p = e(a).triggerHandler("jqGridAfterSubmitCell", [a, r, j.id, n, o, t, i]) || [!0, ""];
                                                            !0 === p[0] && e.isFunction(a.p.afterSubmitCell) && (p = a.p.afterSubmitCell.call(a, r, j.id, n, o, t, i)),
                                                                !0 === p[0] ? (e(s).empty(),
                                                                    e(a).jqGrid("setCell", a.rows[t].id, i, d, !1, !1, !0),
                                                                    e(s).addClass("dirty-cell"),
                                                                    e(a.rows[t]).addClass("edited"),
                                                                    e(a).triggerHandler("jqGridAfterSaveCell", [a.rows[t].id, n, o, t, i]),
                                                                e.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell.call(a, a.rows[t].id, n, o, t, i),
                                                                    a.p.savedRow.splice(0, 1)) : (e.jgrid.info_dialog(e.jgrid.errors.errcap, p[1], e.jgrid.edit.bClose),
                                                                    e(a).jqGrid("restoreCell", t, i))
                                                        }
                                                    },
                                                    error: function(r, o, d) {
                                                        e("#lui_" + e.jgrid.jqID(a.p.id)).hide(),
                                                            a.grid.hDiv.loading = !1,
                                                            e(a).triggerHandler("jqGridErrorCell", [r, o, d]),
                                                            e.isFunction(a.p.errorCell) ? (a.p.errorCell.call(a, r, o, d),
                                                                e(a).jqGrid("restoreCell", t, i)) : (e.jgrid.info_dialog(e.jgrid.errors.errcap, r.status + " : " + r.statusText + "<br/>" + o, e.jgrid.edit.bClose),
                                                                e(a).jqGrid("restoreCell", t, i))
                                                    }
                                                }, e.jgrid.ajaxOptions, a.p.ajaxCellOptions || {}))
                                        } else
                                            try {
                                                e.jgrid.info_dialog(e.jgrid.errors.errcap, e.jgrid.errors.nourl, e.jgrid.edit.bClose),
                                                    e(a).jqGrid("restoreCell", t, i)
                                            } catch (e) {}
                                    "clientArray" === a.p.cellsubmit && ("custom" === l.edittype && e.isFunction(l.editoptions.handle) && l.editoptions.handle(),
                                        e(s).empty(),
                                        e(a).jqGrid("setCell", a.rows[t].id, i, d, !1, !1, !0),
                                        e(s).addClass("dirty-cell"),
                                        e(a.rows[t]).addClass("edited"),
                                        e(a).triggerHandler("jqGridAfterSaveCell", [a.rows[t].id, n, o, t, i]),
                                    e.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell.call(a, a.rows[t].id, n, o, t, i),
                                        a.p.savedRow.splice(0, 1))
                                } else
                                    try {
                                        window.setTimeout(function() {
                                            e.jgrid.info_dialog(e.jgrid.errors.errcap, o + " " + m[1], e.jgrid.edit.bClose)
                                        }, 100),
                                            e(a).jqGrid("restoreCell", t, i)
                                    } catch (e) {}
                            } else
                                e(a).jqGrid("restoreCell", t, i)
                        }
                        window.setTimeout(function() {
                            e("#" + e.jgrid.jqID(a.p.knv)).attr("tabindex", "-1"),
                                e("td:eq(" + a.p.iCol + ")", a.rows[a.p.iRow]).removeClass("edit-cell ui-state-highlight")
                        }, 0)
                    }
                })
            },
            saveCells: function() {
                return this.each(function() {
                    var t = this;
                    if (t.grid && !0 === t.p.cellEdit && t.p.savedRow.length >= 1)
                        for (var i = 0; i < t.p.savedRow.length; i++) {
                            var r = t.p.savedRow[i];
                            e(t).jqGrid("saveCell", r.id, r.ic)
                        }
                })
            },
            restoreCell: function(t, i) {
                return this.each(function() {
                    var r, a = this, o = a.p.colModel[i];
                    if (a.grid && !0 === a.p.cellEdit) {
                        if (null !== (r = a.p.savedRow.length >= 1 ? 0 : null)) {
                            var d = e("td:eq(" + i + ")", a.rows[t]);
                            if (e.isFunction(e.fn.datepicker))
                                try {
                                    e("input.hasDatepicker", d).datepicker("hide")
                                } catch (e) {}
                            "custom" === o.edittype && e.isFunction(o.editoptions.handle) && o.editoptions.handle(),
                                e(d).empty().attr("tabindex", "-1"),
                                e(a).jqGrid("setCell", a.rows[t].id, i, a.p.savedRow[r].v, !1, !1, !0),
                                e(a).triggerHandler("jqGridAfterRestoreCell", [a.rows[t].id, a.p.savedRow[r].v, t, i]),
                            e.isFunction(a.p.afterRestoreCell) && a.p.afterRestoreCell.call(a, a.rows[t].id, a.p.savedRow[r].v, t, i),
                                a.p.savedRow.splice(0, 1)
                        }
                        window.setTimeout(function() {
                            e("#" + a.p.knv).attr("tabindex", "-1"),
                                e("td:eq(" + a.p.iCol + ")", a.rows[a.p.iRow]).removeClass("edit-cell ui-state-highlight")
                        }, 0)
                    }
                })
            },
            nextCell: function(t, i) {
                return this.each(function() {
                    var r, a = this, o = !1;
                    if (a.grid && !0 === a.p.cellEdit) {
                        for ("number" != typeof i && e.each(a.p.colModel, function(e, t) {
                            i == t.name && (i = e)
                        }),
                                 r = i + 1; r < a.p.colModel.length; r++)
                            if (!0 === a.p.colModel[r].editable && !a.p.colModel[r].hidden) {
                                o = r;
                                break
                            }
                        if (r === a.p.colModel.length) {
                            if (t = Number(t) + 1,
                                0 === e(a).find("tbody tr").eq(t).length) {
                                if (!1 === a.p.triggerAdd)
                                    return t -= 1,
                                        void e(a).jqGrid("saveCell", t, i);
                                "fixedGrid" !== e(a).attr("id") && (e(a).data("newId") ? (e(a).jqGrid("addRowData", e(a).data("newId"), {
                                    id: e(a).data("newId")
                                }, "last"),
                                    e(a).data("newId", e(a).data("newId") + 1)) : THISPAGE && THISPAGE.newId ? (e(a).jqGrid("addRowData", THISPAGE.newId, {
                                    id: THISPAGE.newId
                                }, "last"),
                                    THISPAGE.newId++) : e(a).jqGrid("addRowData", t, {}, "last"))
                            }
                            for (r = 0; r < a.p.colModel.length; r++)
                                if (!0 === a.p.colModel[r].editable && !a.p.colModel[r].hidden) {
                                    o = r;
                                    break
                                }
                        }
                        !1 !== o ? e(a).jqGrid("editCell", t, o, !0) : a.p.savedRow.length > 0 && e(a).jqGrid("saveCell", t, i)
                    }
                })
            },
            cloneRow: function(t) {
                return this.each(function() {
                    var i = this;
                    if (i.grid) {
                        var r = t + 1
                            , a = e(i).jqGrid("getRowData", t)
                            , o = e(i).find("#" + t).data();
                        e(i).data("newId") ? (r = e(i).data("newId"),
                            i.data("newId", ++r)) : THISPAGE && THISPAGE.newId && (r = THISPAGE.newId,
                            THISPAGE.newId++),
                            e(i).jqGrid("addRowData", r, a, "after", t),
                            e(i).find("#" + r).data(o)
                    }
                })
            },
            prevCell: function(t, i) {
                return this.each(function() {
                    var r, a = this, o = !1;
                    if (a.grid && !0 === a.p.cellEdit) {
                        for (r = i - 1; r >= 0; r--)
                            if (!0 === a.p.colModel[r].editable) {
                                o = r;
                                break
                            }
                        !1 !== o ? e(a).jqGrid("editCell", t, o, !0) : a.p.savedRow.length > 0 && e(a).jqGrid("saveCell", t, i)
                    }
                })
            },
            GridNav: function() {
                return this.each(function() {
                    function t(t, i, a) {
                        if ("v" === a.substr(0, 1)) {
                            var o = e(r.grid.bDiv)[0].clientHeight
                                , d = e(r.grid.bDiv)[0].scrollTop
                                , s = r.rows[t].offsetTop + r.rows[t].clientHeight
                                , l = r.rows[t].offsetTop;
                            "vd" === a && s >= o && (e(r.grid.bDiv)[0].scrollTop = e(r.grid.bDiv)[0].scrollTop + r.rows[t].clientHeight),
                            "vu" === a && l < d && (e(r.grid.bDiv)[0].scrollTop = e(r.grid.bDiv)[0].scrollTop - r.rows[t].clientHeight)
                        }
                        if ("h" === a) {
                            var n = e(r.grid.bDiv)[0].clientWidth
                                , p = e(r.grid.bDiv)[0].scrollLeft
                                , c = r.rows[t].cells[i].offsetLeft + r.rows[t].cells[i].clientWidth
                                , u = r.rows[t].cells[i].offsetLeft;
                            c >= n + parseInt(p, 10) ? e(r.grid.bDiv)[0].scrollLeft = e(r.grid.bDiv)[0].scrollLeft + r.rows[t].cells[i].clientWidth : u < p && (e(r.grid.bDiv)[0].scrollLeft = e(r.grid.bDiv)[0].scrollLeft - r.rows[t].cells[i].clientWidth)
                        }
                    }
                    function i(e, t) {
                        var i, a;
                        if ("lft" === t)
                            for (i = e + 1,
                                     a = e; a >= 0; a--)
                                if (!0 !== r.p.colModel[a].hidden) {
                                    i = a;
                                    break
                                }
                        if ("rgt" === t)
                            for (i = e - 1,
                                     a = e; a < r.p.colModel.length; a++)
                                if (!0 !== r.p.colModel[a].hidden) {
                                    i = a;
                                    break
                                }
                        return i
                    }
                    var r = this;
                    if (r.grid && !0 === r.p.cellEdit) {
                        r.p.knv = r.p.id + "_kn";
                        var a, o, d = e("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + r.p.knv + "'></div></div>");
                        e(d).insertBefore(r.grid.cDiv),
                            e("#" + r.p.knv).focus().keydown(function(d) {
                                switch (o = d.keyCode,
                                "rtl" === r.p.direction && (37 === o ? o = 39 : 39 === o && (o = 37)),
                                    o) {
                                    case 38:
                                        r.p.iRow - 1 > 0 && (t(r.p.iRow - 1, r.p.iCol, "vu"),
                                            e(r).jqGrid("editCell", r.p.iRow - 1, r.p.iCol, !1));
                                        break;
                                    case 40:
                                        r.p.iRow + 1 <= r.rows.length - 1 && (t(r.p.iRow + 1, r.p.iCol, "vd"),
                                            e(r).jqGrid("editCell", r.p.iRow + 1, r.p.iCol, !1));
                                        break;
                                    case 37:
                                        r.p.iCol - 1 >= 0 && (a = i(r.p.iCol - 1, "lft"),
                                            t(r.p.iRow, a, "h"),
                                            e(r).jqGrid("editCell", r.p.iRow, a, !1));
                                        break;
                                    case 39:
                                        r.p.iCol + 1 <= r.p.colModel.length - 1 && (a = i(r.p.iCol + 1, "rgt"),
                                            t(r.p.iRow, a, "h"),
                                            e(r).jqGrid("editCell", r.p.iRow, a, !1));
                                        break;
                                    case 13:
                                        parseInt(r.p.iCol, 10) >= 0 && parseInt(r.p.iRow, 10) >= 0 && e(r).jqGrid("editCell", r.p.iRow, r.p.iCol, !0);
                                        break;
                                    default:
                                        return !0
                                }
                                return !1
                            })
                    }
                })
            },
            getChangedCells: function(t) {
                var i = [];
                return t || (t = "all"),
                    this.each(function() {
                        var r, a = this;
                        a.grid && !0 === a.p.cellEdit && e(a.rows).each(function(o) {
                            var d = {};
                            e(this).hasClass("edited") && (e("td", this).each(function(i) {
                                if ("cb" !== (r = a.p.colModel[i].name) && "subgrid" !== r)
                                    if ("dirty" === t) {
                                        if (e(this).hasClass("dirty-cell"))
                                            try {
                                                d[r] = e.unformat.call(a, this, {
                                                    rowId: a.rows[o].id,
                                                    colModel: a.p.colModel[i]
                                                }, i)
                                            } catch (t) {
                                                d[r] = e.jgrid.htmlDecode(e(this).html())
                                            }
                                    } else
                                        try {
                                            d[r] = e.unformat.call(a, this, {
                                                rowId: a.rows[o].id,
                                                colModel: a.p.colModel[i]
                                            }, i)
                                        } catch (t) {
                                            d[r] = e.jgrid.htmlDecode(e(this).html())
                                        }
                            }),
                                d.id = this.id,
                                i.push(d))
                        })
                    }),
                    i
            }
        })
    }(jQuery),
    function(e) {
        "use strict";
        var t = {};
        e.jgrid.extend({
            searchGrid: function(t) {
                return t = e.extend(!0, {
                    recreateFilter: !1,
                    drag: !0,
                    sField: "searchField",
                    sValue: "searchString",
                    sOper: "searchOper",
                    sFilter: "filters",
                    loadDefaults: !0,
                    beforeShowSearch: null,
                    afterShowSearch: null,
                    onInitializeSearch: null,
                    afterRedraw: null,
                    afterChange: null,
                    closeAfterSearch: !1,
                    closeAfterReset: !1,
                    closeOnEscape: !1,
                    searchOnEnter: !1,
                    multipleSearch: !1,
                    multipleGroup: !1,
                    top: 0,
                    left: 0,
                    jqModal: !0,
                    modal: !1,
                    resize: !0,
                    width: 450,
                    height: "auto",
                    dataheight: "auto",
                    showQuery: !1,
                    errorcheck: !0,
                    sopt: null,
                    stringResult: void 0,
                    onClose: null,
                    onSearch: null,
                    onReset: null,
                    toTop: !0,
                    overlay: 30,
                    columns: [],
                    tmplNames: null,
                    tmplFilters: null,
                    tmplLabel: " Template: ",
                    showOnLoad: !1,
                    layer: null,
                    operands: {
                        eq: "=",
                        ne: "<>",
                        lt: "<",
                        le: "<=",
                        gt: ">",
                        ge: ">=",
                        bw: "LIKE",
                        bn: "NOT LIKE",
                        in: "IN",
                        ni: "NOT IN",
                        ew: "LIKE",
                        en: "NOT LIKE",
                        cn: "LIKE",
                        nc: "NOT LIKE",
                        nu: "IS NULL",
                        nn: "ISNOT NULL"
                    }
                }, e.jgrid.search, t || {}),
                    this.each(function() {
                        function i(i) {
                            void 0 === (o = e(r).triggerHandler("jqGridFilterBeforeShow", [i])) && (o = !0),
                            o && e.isFunction(t.beforeShowSearch) && (o = t.beforeShowSearch.call(r, i)),
                            o && (e.jgrid.viewModal("#" + e.jgrid.jqID(d.themodal), {
                                gbox: "#gbox_" + e.jgrid.jqID(a),
                                jqm: t.jqModal,
                                modal: t.modal,
                                overlay: t.overlay,
                                toTop: t.toTop
                            }),
                                e(r).triggerHandler("jqGridFilterAfterShow", [i]),
                            e.isFunction(t.afterShowSearch) && t.afterShowSearch.call(r, i))
                        }
                        var r = this;
                        if (r.grid) {
                            var a = "fbox_" + r.p.id
                                , o = !0
                                , d = {
                                themodal: "searchmod" + a,
                                modalhead: "searchhd" + a,
                                modalcontent: "searchcnt" + a,
                                scrollelm: a
                            }
                                , s = r.p.postData[t.sFilter];
                            if ("string" == typeof s && (s = e.jgrid.parse(s)),
                                !0 === t.recreateFilter && e("#" + e.jgrid.jqID(d.themodal)).remove(),
                                void 0 !== e("#" + e.jgrid.jqID(d.themodal))[0])
                                i(e("#fbox_" + e.jgrid.jqID(+r.p.id)));
                            else {
                                var l = e("<div><div id='" + a + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + e.jgrid.jqID(r.p.id))
                                    , n = "left"
                                    , p = "";
                                "rtl" === r.p.direction && (n = "right",
                                    p = " style='text-align:left'",
                                    l.attr("dir", "rtl"));
                                var c, u, h = e.extend([], r.p.colModel), g = "<a href='javascript:void(0)' id='" + a + "_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>" + t.Find + "</a>", f = "<a href='javascript:void(0)' id='" + a + "_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>" + t.Reset + "</a>", m = "", v = "", j = !1, b = -1;
                                if (t.showQuery && (m = "<a href='javascript:void(0)' id='" + a + "_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>"),
                                        t.columns.length ? (h = t.columns,
                                            b = 0,
                                            c = h[0].index || h[0].name) : e.each(h, function(e, t) {
                                            if (t.label || (t.label = r.p.colNames[e]),
                                                    !j) {
                                                var i = void 0 === t.search || t.search
                                                    , a = !0 === t.hidden;
                                                (t.searchoptions && !0 === t.searchoptions.searchhidden && i || i && !a) && (j = !0,
                                                    c = t.index || t.name,
                                                    b = e)
                                            }
                                        }),
                                    !s && c || !1 === t.multipleSearch) {
                                    var w = "eq";
                                    b >= 0 && h[b].searchoptions && h[b].searchoptions.sopt ? w = h[b].searchoptions.sopt[0] : t.sopt && t.sopt.length && (w = t.sopt[0]),
                                        s = {
                                            groupOp: "AND",
                                            rules: [{
                                                field: c,
                                                op: w,
                                                data: ""
                                            }]
                                        }
                                }
                                j = !1,
                                t.tmplNames && t.tmplNames.length && (j = !0,
                                    v = t.tmplLabel,
                                    v += "<select class='ui-template'>",
                                    v += "<option value='default'>Default</option>",
                                    e.each(t.tmplNames, function(e, t) {
                                        v += "<option value='" + e + "'>" + t + "</option>"
                                    }),
                                    v += "</select>"),
                                    u = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + a + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:" + n + "'>" + f + v + "</td><td class='EditButton' " + p + ">" + m + g + "</td></tr></tbody></table>",
                                    a = e.jgrid.jqID(a),
                                    e("#" + a).jqFilter({
                                        columns: h,
                                        filter: t.loadDefaults ? s : null,
                                        showQuery: t.showQuery,
                                        errorcheck: t.errorcheck,
                                        sopt: t.sopt,
                                        groupButton: t.multipleGroup,
                                        ruleButtons: t.multipleSearch,
                                        afterRedraw: t.afterRedraw,
                                        ops: t.odata,
                                        operands: t.operands,
                                        ajaxSelectOptions: r.p.ajaxSelectOptions,
                                        groupOps: t.groupOps,
                                        onChange: function() {
                                            this.p.showQuery && e(".query", this).html(this.toUserFriendlyString()),
                                            e.isFunction(t.afterChange) && t.afterChange.call(r, e("#" + a), t)
                                        },
                                        direction: r.p.direction,
                                        id: r.p.id
                                    }),
                                    l.append(u),
                                j && t.tmplFilters && t.tmplFilters.length && e(".ui-template", l).bind("change", function() {
                                    var i = e(this).val();
                                    return "default" === i ? e("#" + a).jqFilter("addFilter", s) : e("#" + a).jqFilter("addFilter", t.tmplFilters[parseInt(i, 10)]),
                                        !1
                                }),
                                !0 === t.multipleGroup && (t.multipleSearch = !0),
                                    e(r).triggerHandler("jqGridFilterInitialize", [e("#" + a)]),
                                e.isFunction(t.onInitializeSearch) && t.onInitializeSearch.call(r, e("#" + a)),
                                    t.gbox = "#gbox_" + a,
                                    t.layer ? e.jgrid.createModal(d, l, t, "#gview_" + e.jgrid.jqID(r.p.id), e("#gbox_" + e.jgrid.jqID(r.p.id))[0], "#" + e.jgrid.jqID(t.layer), {
                                        position: "relative"
                                    }) : e.jgrid.createModal(d, l, t, "#gview_" + e.jgrid.jqID(r.p.id), e("#gbox_" + e.jgrid.jqID(r.p.id))[0]),
                                (t.searchOnEnter || t.closeOnEscape) && e("#" + e.jgrid.jqID(d.themodal)).keydown(function(i) {
                                    var r = e(i.target);
                                    return !t.searchOnEnter || 13 !== i.which || r.hasClass("add-group") || r.hasClass("add-rule") || r.hasClass("delete-group") || r.hasClass("delete-rule") || r.hasClass("fm-button") && r.is("[id$=_query]") ? t.closeOnEscape && 27 === i.which ? (e("#" + e.jgrid.jqID(d.modalhead)).find(".ui-jqdialog-titlebar-close").focus().click(),
                                        !1) : void 0 : (e("#" + a + "_search").focus().click(),
                                        !1)
                                }),
                                m && e("#" + a + "_query").bind("click", function() {
                                    return e(".queryresult", l).toggle(),
                                        !1
                                }),
                                void 0 === t.stringResult && (t.stringResult = t.multipleSearch),
                                    e("#" + a + "_search").bind("click", function() {
                                        var i, o = e("#" + a), s = {}, l = o.jqFilter("filterData");
                                        if (t.errorcheck && (o[0].hideError(),
                                            t.showQuery || o.jqFilter("toSQLString"),
                                                o[0].p.error))
                                            return o[0].showError(),
                                                !1;
                                        if (t.stringResult) {
                                            try {
                                                i = xmlJsonClass.toJson(l, "", "", !1)
                                            } catch (e) {
                                                try {
                                                    i = JSON.stringify(l)
                                                } catch (e) {}
                                            }
                                            "string" == typeof i && (s[t.sFilter] = i,
                                                e.each([t.sField, t.sValue, t.sOper], function() {
                                                    s[this] = ""
                                                }))
                                        } else
                                            t.multipleSearch ? (s[t.sFilter] = l,
                                                e.each([t.sField, t.sValue, t.sOper], function() {
                                                    s[this] = ""
                                                })) : (s[t.sField] = l.rules[0].field,
                                                s[t.sValue] = l.rules[0].data,
                                                s[t.sOper] = l.rules[0].op,
                                                s[t.sFilter] = "");
                                        return r.p.search = !0,
                                            e.extend(r.p.postData, s),
                                            e(r).triggerHandler("jqGridFilterSearch"),
                                        e.isFunction(t.onSearch) && t.onSearch.call(r),
                                            e(r).trigger("reloadGrid", [{
                                                page: 1
                                            }]),
                                        t.closeAfterSearch && e.jgrid.hideModal("#" + e.jgrid.jqID(d.themodal), {
                                            gb: "#gbox_" + e.jgrid.jqID(r.p.id),
                                            jqm: t.jqModal,
                                            onClose: t.onClose
                                        }),
                                            !1
                                    }),
                                    e("#" + a + "_reset").bind("click", function() {
                                        var i = {}
                                            , o = e("#" + a);
                                        return r.p.search = !1,
                                            !1 === t.multipleSearch ? i[t.sField] = i[t.sValue] = i[t.sOper] = "" : i[t.sFilter] = "",
                                            o[0].resetFilter(),
                                        j && e(".ui-template", l).val("default"),
                                            e.extend(r.p.postData, i),
                                            e(r).triggerHandler("jqGridFilterReset"),
                                        e.isFunction(t.onReset) && t.onReset.call(r),
                                            e(r).trigger("reloadGrid", [{
                                                page: 1
                                            }]),
                                            !1
                                    }),
                                    i(e("#" + a)),
                                    e(".fm-button:not(.ui-state-disabled)", l).hover(function() {
                                        e(this).addClass("ui-state-hover")
                                    }, function() {
                                        e(this).removeClass("ui-state-hover")
                                    })
                            }
                        }
                    })
            },
            editGridRow: function(i, r) {
                return r = e.extend(!0, {
                    top: 0,
                    left: 0,
                    width: 300,
                    datawidth: "auto",
                    height: "auto",
                    dataheight: "auto",
                    modal: !1,
                    overlay: 30,
                    drag: !0,
                    resize: !0,
                    url: null,
                    mtype: "POST",
                    clearAfterAdd: !0,
                    closeAfterEdit: !1,
                    reloadAfterSubmit: !0,
                    onInitializeForm: null,
                    beforeInitData: null,
                    beforeShowForm: null,
                    afterShowForm: null,
                    beforeSubmit: null,
                    afterSubmit: null,
                    onclickSubmit: null,
                    afterComplete: null,
                    onclickPgButtons: null,
                    afterclickPgButtons: null,
                    editData: {},
                    recreateForm: !1,
                    jqModal: !0,
                    closeOnEscape: !1,
                    addedrow: "first",
                    topinfo: "",
                    bottominfo: "",
                    saveicon: [],
                    closeicon: [],
                    savekey: [!1, 13],
                    navkeys: [!1, 38, 40],
                    checkOnSubmit: !1,
                    checkOnUpdate: !1,
                    _savedData: {},
                    processing: !1,
                    onClose: null,
                    ajaxEditOptions: {},
                    serializeEditData: null,
                    viewPagerButtons: !0,
                    overlayClass: "ui-widget-overlay"
                }, e.jgrid.edit, r || {}),
                    t[e(this)[0].p.id] = r,
                    this.each(function() {
                        function a() {
                            return e(w + " > tbody > tr > td > .FormElement").each(function() {
                                var t = e(".customelement", this);
                                if (t.length) {
                                    var i = t[0]
                                        , r = e(i).attr("name");
                                    e.each(h.p.colModel, function() {
                                        if (this.name === r && this.editoptions && e.isFunction(this.editoptions.custom_value)) {
                                            try {
                                                if (g[r] = this.editoptions.custom_value.call(h, e("#" + e.jgrid.jqID(r), w), "get"),
                                                    void 0 === g[r])
                                                    throw "e1"
                                            } catch (t) {
                                                "e1" === t ? e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_value' " + e.jgrid.edit.msg.novalue, e.jgrid.edit.bClose) : e.jgrid.info_dialog(e.jgrid.errors.errcap, t.message, e.jgrid.edit.bClose)
                                            }
                                            return !0
                                        }
                                    })
                                } else {
                                    switch (e(this).get(0).type) {
                                        case "checkbox":
                                            if (e(this).is(":checked"))
                                                g[this.name] = e(this).val();
                                            else {
                                                var a = e(this).attr("offval");
                                                g[this.name] = a
                                            }
                                            break;
                                        case "select-one":
                                            g[this.name] = e("option:selected", this).val();
                                            break;
                                        case "select-multiple":
                                            g[this.name] = e(this).val(),
                                                g[this.name] ? g[this.name] = g[this.name].join(",") : g[this.name] = "";
                                            var o = [];
                                            e("option:selected", this).each(function(t, i) {
                                                o[t] = e(i).text()
                                            });
                                            break;
                                        case "password":
                                        case "text":
                                        case "textarea":
                                        case "button":
                                            g[this.name] = e(this).val()
                                    }
                                    h.p.autoencode && (g[this.name] = e.jgrid.htmlEncode(g[this.name]))
                                }
                            }),
                                !0
                        }
                        function o(i, r, a) {
                            var o, d, s, l, n, p, c = 0;
                            (t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (t[h.p.id]._savedData = {},
                                t[h.p.id]._savedData[r.p.id + "_id"] = i);
                            var u = r.p.colModel;
                            if ("_empty" === i)
                                return e(u).each(function() {
                                    o = this.name,
                                        l = e.extend({}, this.editoptions || {}),
                                    (s = e("#" + e.jgrid.jqID(o), "#" + a)) && s.length && null !== s[0] && (n = "",
                                        l.defaultValue ? (n = e.isFunction(l.defaultValue) ? l.defaultValue.call(h) : l.defaultValue,
                                            "checkbox" === s[0].type ? (p = n.toLowerCase()).search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== p ? (s[0].checked = !0,
                                                s[0].defaultChecked = !0,
                                                s[0].value = n) : (s[0].checked = !1,
                                                s[0].defaultChecked = !1) : s.val(n)) : "checkbox" === s[0].type ? (s[0].checked = !1,
                                            s[0].defaultChecked = !1,
                                            n = e(s).attr("offval")) : s[0].type && "select" === s[0].type.substr(0, 6) ? s[0].selectedIndex = 0 : s.val(n),
                                    (!0 === t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (t[h.p.id]._savedData[o] = n))
                                }),
                                    void e("#id_g", "#" + a).val(i);
                            var g = e(r).jqGrid("getInd", i, !0);
                            g && (e('td[role="gridcell"]', g).each(function(s) {
                                if ("cb" !== (o = u[s].name) && "subgrid" !== o && "rn" !== o && !0 === u[s].editable) {
                                    if (o === r.p.ExpandColumn && !0 === r.p.treeGrid)
                                        d = e(this).text();
                                    else
                                        try {
                                            d = e.unformat.call(r, e(this), {
                                                rowId: i,
                                                colModel: u[s]
                                            }, s)
                                        } catch (t) {
                                            d = "textarea" === u[s].edittype ? e(this).text() : e(this).html()
                                        }
                                    switch (h.p.autoencode && (d = e.jgrid.htmlDecode(d)),
                                    (!0 === t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (t[h.p.id]._savedData[o] = d),
                                        o = e.jgrid.jqID(o),
                                        u[s].edittype) {
                                        case "password":
                                        case "text":
                                        case "button":
                                        case "image":
                                        case "textarea":
                                            ("&nbsp;" === d || "&#160;" === d || 1 === d.length && 160 === d.charCodeAt(0)) && (d = ""),
                                                e("#" + o, "#" + a).val(d);
                                            break;
                                        case "select":
                                            var l = d.split(",");
                                            l = e.map(l, function(t) {
                                                return e.trim(t)
                                            }),
                                                e("#" + o + " option", "#" + a).each(function() {
                                                    u[s].editoptions.multiple || e.trim(d) !== e.trim(e(this).text()) && l[0] !== e.trim(e(this).text()) && l[0] !== e.trim(e(this).val()) ? u[s].editoptions.multiple && (e.inArray(e.trim(e(this).text()), l) > -1 || e.inArray(e.trim(e(this).val()), l) > -1) ? this.selected = !0 : this.selected = !1 : this.selected = !0
                                                });
                                            break;
                                        case "checkbox":
                                            d = String(d),
                                                u[s].editoptions && u[s].editoptions.value ? u[s].editoptions.value.split(":")[0] === d ? e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]({
                                                    checked: !0,
                                                    defaultChecked: !0
                                                }) : e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]({
                                                    checked: !1,
                                                    defaultChecked: !1
                                                }) : (d = d.toLowerCase()).search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== d ? (e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]("checked", !0),
                                                    e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : (e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]("checked", !1),
                                                    e("#" + o, "#" + a)[h.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                            break;
                                        case "custom":
                                            try {
                                                if (!u[s].editoptions || !e.isFunction(u[s].editoptions.custom_value))
                                                    throw "e1";
                                                u[s].editoptions.custom_value.call(h, e("#" + o, "#" + a), "set", d)
                                            } catch (t) {
                                                "e1" === t ? e.jgrid.info_dialog(e.jgrid.errors.errcap, "function 'custom_value' " + e.jgrid.edit.msg.nodefined, e.jgrid.edit.bClose) : e.jgrid.info_dialog(e.jgrid.errors.errcap, t.message, e.jgrid.edit.bClose)
                                            }
                                    }
                                    c++
                                }
                            }),
                            c > 0 && e("#id_g", w).val(i))
                        }
                        function d() {
                            e.each(h.p.colModel, function(e, t) {
                                t.editoptions && !0 === t.editoptions.NullIfEmpty && g.hasOwnProperty(t.name) && "" === g[t.name] && (g[t.name] = "null")
                            })
                        }
                        function s() {
                            var i, a, s, l, n, p, c = [!0, "", ""], u = {}, f = h.p.prmNames, b = e(h).triggerHandler("jqGridAddEditBeforeCheckValues", [e("#" + j), m]);
                            b && "object" == typeof b && (g = b),
                            e.isFunction(t[h.p.id].beforeCheckValues) && (b = t[h.p.id].beforeCheckValues.call(h, g, e("#" + j), m)) && "object" == typeof b && (g = b);
                            for (l in g)
                                if (g.hasOwnProperty(l) && !1 === (c = e.jgrid.checkValues.call(h, g[l], l))[0])
                                    break;
                            if (d(),
                                c[0] && (void 0 === (u = e(h).triggerHandler("jqGridAddEditClickSubmit", [t[h.p.id], g, m])) && e.isFunction(t[h.p.id].onclickSubmit) && (u = t[h.p.id].onclickSubmit.call(h, t[h.p.id], g, m) || {}),
                                void 0 === (c = e(h).triggerHandler("jqGridAddEditBeforeSubmit", [g, e("#" + j), m])) && (c = [!0, "", ""]),
                                c[0] && e.isFunction(t[h.p.id].beforeSubmit) && (c = t[h.p.id].beforeSubmit.call(h, g, e("#" + j), m))),
                                c[0] && !t[h.p.id].processing) {
                                if (t[h.p.id].processing = !0,
                                        e("#sData", w + "_2").addClass("ui-state-active"),
                                        s = f.oper,
                                        a = f.id,
                                        g[s] = "_empty" === e.trim(g[h.p.id + "_id"]) ? f.addoper : f.editoper,
                                        g[s] !== f.addoper ? g[a] = g[h.p.id + "_id"] : void 0 === g[a] && (g[a] = g[h.p.id + "_id"]),
                                        delete g[h.p.id + "_id"],
                                        g = e.extend(g, t[h.p.id].editData, u),
                                    !0 === h.p.treeGrid) {
                                    if (g[s] === f.addoper) {
                                        n = e(h).jqGrid("getGridParam", "selrow");
                                        var y = "adjacency" === h.p.treeGridModel ? h.p.treeReader.parent_id_field : "parent_id";
                                        g[y] = n
                                    }
                                    for (p in h.p.treeReader)
                                        if (h.p.treeReader.hasOwnProperty(p)) {
                                            var D = h.p.treeReader[p];
                                            if (g.hasOwnProperty(D)) {
                                                if (g[s] === f.addoper && "parent_id_field" === p)
                                                    continue;
                                                delete g[D]
                                            }
                                        }
                                }
                                g[a] = e.jgrid.stripPref(h.p.idPrefix, g[a]);
                                var x = e.extend({
                                    url: t[h.p.id].url || e(h).jqGrid("getGridParam", "editurl"),
                                    type: t[h.p.id].mtype,
                                    data: e.isFunction(t[h.p.id].serializeEditData) ? t[h.p.id].serializeEditData.call(h, g) : g,
                                    complete: function(d, l) {
                                        var p;
                                        if (g[a] = h.p.idPrefix + g[a],
                                                d.status >= 300 && 304 !== d.status ? (c[0] = !1,
                                                    c[1] = e(h).triggerHandler("jqGridAddEditErrorTextFormat", [d, m]),
                                                    e.isFunction(t[h.p.id].errorTextFormat) ? c[1] = t[h.p.id].errorTextFormat.call(h, d, m) : c[1] = l + " Status: '" + d.statusText + "'. Error code: " + d.status) : (void 0 === (c = e(h).triggerHandler("jqGridAddEditAfterSubmit", [d, g, m])) && (c = [!0, "", ""]),
                                                c[0] && e.isFunction(t[h.p.id].afterSubmit) && (c = t[h.p.id].afterSubmit.call(h, d, g, m))),
                                            !1 === c[0])
                                            e("#FormError>td", w).html(c[1]),
                                                e("#FormError", w).show();
                                        else if (h.p.autoencode && e.each(g, function(t, i) {
                                                g[t] = e.jgrid.htmlDecode(i)
                                            }),
                                                g[s] === f.addoper ? (c[2] || (c[2] = e.jgrid.randId()),
                                                    g[a] = c[2],
                                                    t[h.p.id].reloadAfterSubmit ? e(h).trigger("reloadGrid") : !0 === h.p.treeGrid ? e(h).jqGrid("addChildNode", c[2], n, g) : e(h).jqGrid("addRowData", c[2], g, r.addedrow),
                                                    t[h.p.id].closeAfterAdd ? (!0 !== h.p.treeGrid && e(h).jqGrid("setSelection", c[2]),
                                                        e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                            gb: "#gbox_" + e.jgrid.jqID(v),
                                                            jqm: r.jqModal,
                                                            onClose: t[h.p.id].onClose
                                                        })) : t[h.p.id].clearAfterAdd && o("_empty", h, j)) : (t[h.p.id].reloadAfterSubmit ? (e(h).trigger("reloadGrid"),
                                                t[h.p.id].closeAfterEdit || setTimeout(function() {
                                                    e(h).jqGrid("setSelection", g[a])
                                                }, 1e3)) : !0 === h.p.treeGrid ? e(h).jqGrid("setTreeRow", g[a], g) : e(h).jqGrid("setRowData", g[a], g),
                                                t[h.p.id].closeAfterEdit && e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                    gb: "#gbox_" + e.jgrid.jqID(v),
                                                    jqm: r.jqModal,
                                                    onClose: t[h.p.id].onClose
                                                })),
                                            e.isFunction(t[h.p.id].afterComplete) && (i = d,
                                                setTimeout(function() {
                                                    e(h).triggerHandler("jqGridAddEditAfterComplete", [i, g, e("#" + j), m]),
                                                        t[h.p.id].afterComplete.call(h, i, g, e("#" + j), m),
                                                        i = null
                                                }, 500)),
                                            (t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (e("#" + j).data("disabled", !1),
                                            "_empty" !== t[h.p.id]._savedData[h.p.id + "_id"]))
                                            for (p in t[h.p.id]._savedData)
                                                t[h.p.id]._savedData.hasOwnProperty(p) && g[p] && (t[h.p.id]._savedData[p] = g[p]);
                                        t[h.p.id].processing = !1,
                                            e("#sData", w + "_2").removeClass("ui-state-active");
                                        try {
                                            e(":input:visible", "#" + j)[0].focus()
                                        } catch (e) {}
                                    }
                                }, e.jgrid.ajaxOptions, t[h.p.id].ajaxEditOptions);
                                if (x.url || t[h.p.id].useDataProxy || (e.isFunction(h.p.dataProxy) ? t[h.p.id].useDataProxy = !0 : (c[0] = !1,
                                        c[1] += " " + e.jgrid.errors.nourl)),
                                        c[0])
                                    if (t[h.p.id].useDataProxy) {
                                        var $ = h.p.dataProxy.call(h, x, "set_" + h.p.id);
                                        void 0 === $ && ($ = [!0, ""]),
                                            !1 === $[0] ? (c[0] = !1,
                                                c[1] = $[1] || "Error deleting the selected row!") : (x.data.oper === f.addoper && t[h.p.id].closeAfterAdd && e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                gb: "#gbox_" + e.jgrid.jqID(v),
                                                jqm: r.jqModal,
                                                onClose: t[h.p.id].onClose
                                            }),
                                            x.data.oper === f.editoper && t[h.p.id].closeAfterEdit && e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                gb: "#gbox_" + e.jgrid.jqID(v),
                                                jqm: r.jqModal,
                                                onClose: t[h.p.id].onClose
                                            }))
                                    } else
                                        e.ajax(x)
                            }
                            !1 === c[0] && (e("#FormError>td", w).html(c[1]),
                                e("#FormError", w).show())
                        }
                        function l(e, t) {
                            var i, r = !1;
                            for (i in e)
                                if (e.hasOwnProperty(i) && e[i] != t[i]) {
                                    r = !0;
                                    break
                                }
                            return r
                        }
                        function n() {
                            var i = !0;
                            return e("#FormError", w).hide(),
                            t[h.p.id].checkOnUpdate && (g = {},
                                a(),
                            (f = l(g, t[h.p.id]._savedData)) && (e("#" + j).data("disabled", !0),
                                e(".confirm", "#" + q.themodal).show(),
                                i = !1)),
                                i
                        }
                        function p() {
                            var t;
                            if ("_empty" !== i && void 0 !== h.p.savedRow && h.p.savedRow.length > 0 && e.isFunction(e.fn.jqGrid.restoreRow))
                                for (t = 0; t < h.p.savedRow.length; t++)
                                    if (h.p.savedRow[t].id == i) {
                                        e(h).jqGrid("restoreRow", i);
                                        break
                                    }
                        }
                        function c(t, i) {
                            var r = i[1].length - 1;
                            0 === t ? e("#pData", w + "_2").addClass("ui-state-disabled") : void 0 !== i[1][t - 1] && e("#" + e.jgrid.jqID(i[1][t - 1])).hasClass("ui-state-disabled") ? e("#pData", w + "_2").addClass("ui-state-disabled") : e("#pData", w + "_2").removeClass("ui-state-disabled"),
                                t === r ? e("#nData", w + "_2").addClass("ui-state-disabled") : void 0 !== i[1][t + 1] && e("#" + e.jgrid.jqID(i[1][t + 1])).hasClass("ui-state-disabled") ? e("#nData", w + "_2").addClass("ui-state-disabled") : e("#nData", w + "_2").removeClass("ui-state-disabled")
                        }
                        function u() {
                            var t = e(h).jqGrid("getDataIDs")
                                , i = e("#id_g", w).val();
                            return [e.inArray(i, t), t]
                        }
                        var h = this;
                        if (h.grid && i) {
                            var g, f, m, v = h.p.id, j = "FrmGrid_" + v, b = "TblGrid_" + v, w = "#" + e.jgrid.jqID(b), q = {
                                themodal: "editmod" + v,
                                modalhead: "edithd" + v,
                                modalcontent: "editcnt" + v,
                                scrollelm: j
                            }, y = !!e.isFunction(t[h.p.id].beforeShowForm) && t[h.p.id].beforeShowForm, D = !!e.isFunction(t[h.p.id].afterShowForm) && t[h.p.id].afterShowForm, x = !!e.isFunction(t[h.p.id].beforeInitData) && t[h.p.id].beforeInitData, $ = !!e.isFunction(t[h.p.id].onInitializeForm) && t[h.p.id].onInitializeForm, _ = !0, C = 1, I = 0;
                            j = e.jgrid.jqID(j),
                                "new" === i ? (i = "_empty",
                                    m = "add",
                                    r.caption = t[h.p.id].addCaption) : (r.caption = t[h.p.id].editCaption,
                                    m = "edit"),
                            !0 === r.recreateForm && void 0 !== e("#" + e.jgrid.jqID(q.themodal))[0] && e("#" + e.jgrid.jqID(q.themodal)).remove();
                            var G = !0;
                            if (r.checkOnUpdate && r.jqModal && !r.modal && (G = !1),
                                void 0 !== e("#" + e.jgrid.jqID(q.themodal))[0]) {
                                if (void 0 === (_ = e(h).triggerHandler("jqGridAddEditBeforeInitData", [e("#" + e.jgrid.jqID(j)), m])) && (_ = !0),
                                    _ && x && (_ = x.call(h, e("#" + j), m)),
                                    !1 === _)
                                    return;
                                p(),
                                    e(".ui-jqdialog-title", "#" + e.jgrid.jqID(q.modalhead)).html(r.caption),
                                    e("#FormError", w).hide(),
                                    t[h.p.id].topinfo ? (e(".topinfo", w).html(t[h.p.id].topinfo),
                                        e(".tinfo", w).show()) : e(".tinfo", w).hide(),
                                    t[h.p.id].bottominfo ? (e(".bottominfo", w + "_2").html(t[h.p.id].bottominfo),
                                        e(".binfo", w + "_2").show()) : e(".binfo", w + "_2").hide(),
                                    o(i, h, j),
                                    "_empty" !== i && t[h.p.id].viewPagerButtons ? e("#pData, #nData", w + "_2").show() : e("#pData, #nData", w + "_2").hide(),
                                !0 === t[h.p.id].processing && (t[h.p.id].processing = !1,
                                    e("#sData", w + "_2").removeClass("ui-state-active")),
                                !0 === e("#" + j).data("disabled") && (e(".confirm", "#" + e.jgrid.jqID(q.themodal)).hide(),
                                    e("#" + j).data("disabled", !1)),
                                    e(h).triggerHandler("jqGridAddEditBeforeShowForm", [e("#" + j), m]),
                                y && y.call(h, e("#" + j), m),
                                    e("#" + e.jgrid.jqID(q.themodal)).data("onClose", t[h.p.id].onClose),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(q.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(v),
                                        jqm: r.jqModal,
                                        jqM: !1,
                                        overlay: r.overlay,
                                        modal: r.modal,
                                        overlayClass: r.overlayClass
                                    }),
                                G || e("." + e.jgrid.jqID(r.overlayClass)).click(function() {
                                    return !!n() && (e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                        gb: "#gbox_" + e.jgrid.jqID(v),
                                        jqm: r.jqModal,
                                        onClose: t[h.p.id].onClose
                                    }),
                                        !1)
                                }),
                                    e(h).triggerHandler("jqGridAddEditAfterShowForm", [e("#" + j), m]),
                                D && D.call(h, e("#" + j), m)
                            } else {
                                var F = isNaN(r.dataheight) ? r.dataheight : r.dataheight + "px"
                                    , k = isNaN(r.datawidth) ? r.datawidth : r.datawidth + "px"
                                    , S = e("<form name='FormPost' id='" + j + "' class='FormGrid' onSubmit='return false;' style='width:" + k + ";overflow:auto;position:relative;height:" + F + ";'></form>").data("disabled", !1)
                                    , M = e("<table id='" + b + "' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>");
                                if (void 0 === (_ = e(h).triggerHandler("jqGridAddEditBeforeInitData", [e("#" + j), m])) && (_ = !0),
                                    _ && x && (_ = x.call(h, e("#" + j, m))),
                                    !1 === _)
                                    return;
                                p(),
                                    e(h.p.colModel).each(function() {
                                        var e = this.formoptions;
                                        C = Math.max(C, e ? e.colpos || 0 : 0),
                                            I = Math.max(I, e ? e.rowpos || 0 : 0)
                                    }),
                                    e(S).append(M);
                                var R = e("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='" + 2 * C + "'></td></tr>");
                                R[0].rp = 0,
                                    e(M).append(R),
                                    (R = e("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + 2 * C + "'>" + t[h.p.id].topinfo + "</td></tr>"))[0].rp = 0,
                                    e(M).append(R);
                                var N = "rtl" === h.p.direction
                                    , E = N ? "nData" : "pData"
                                    , A = N ? "pData" : "nData";
                                !function(i, r, a, o) {
                                    var d, s, l, n, p, c, u, g = 0, f = [], m = !1, v = "";
                                    for (u = 1; u <= o; u++)
                                        v += "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>";
                                    if ("_empty" !== i && (m = e(r).jqGrid("getInd", i)),
                                            e(r.p.colModel).each(function(u) {
                                                if (d = this.name,
                                                        s = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden,
                                                        p = s ? "style='display:none'" : "",
                                                    "cb" !== d && "subgrid" !== d && !0 === this.editable && "rn" !== d) {
                                                    if (!1 === m)
                                                        n = "";
                                                    else if (d === r.p.ExpandColumn && !0 === r.p.treeGrid)
                                                        n = e("td[role='gridcell']:eq(" + u + ")", r.rows[m]).text();
                                                    else {
                                                        try {
                                                            n = e.unformat.call(r, e("td[role='gridcell']:eq(" + u + ")", r.rows[m]), {
                                                                rowId: i,
                                                                colModel: this
                                                            }, u)
                                                        } catch (t) {
                                                            n = this.edittype && "textarea" === this.edittype ? e("td[role='gridcell']:eq(" + u + ")", r.rows[m]).text() : e("td[role='gridcell']:eq(" + u + ")", r.rows[m]).html()
                                                        }
                                                        (!n || "&nbsp;" === n || "&#160;" === n || 1 === n.length && 160 === n.charCodeAt(0)) && (n = "")
                                                    }
                                                    var b = e.extend({}, this.editoptions || {}, {
                                                        id: d,
                                                        name: d
                                                    })
                                                        , w = e.extend({}, {
                                                        elmprefix: "",
                                                        elmsuffix: "",
                                                        rowabove: !1,
                                                        rowcontent: ""
                                                    }, this.formoptions || {})
                                                        , q = parseInt(w.rowpos, 10) || g + 1
                                                        , y = parseInt(2 * (parseInt(w.colpos, 10) || 1), 10);
                                                    if ("_empty" === i && b.defaultValue && (n = e.isFunction(b.defaultValue) ? b.defaultValue.call(h) : b.defaultValue),
                                                        this.edittype || (this.edittype = "text"),
                                                        h.p.autoencode && (n = e.jgrid.htmlDecode(n)),
                                                            c = e.jgrid.createEl.call(h, this.edittype, b, n, !1, e.extend({}, e.jgrid.ajaxOptions, r.p.ajaxSelectOptions || {})),
                                                        (t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (t[h.p.id]._savedData[d] = n),
                                                            e(c).addClass("FormElement"),
                                                        e.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && e(c).addClass("ui-widget-content ui-corner-all"),
                                                            l = e(a).find("tr[rowpos=" + q + "]"),
                                                            w.rowabove) {
                                                        var D = e("<tr><td class='contentinfo' colspan='" + 2 * o + "'>" + w.rowcontent + "</td></tr>");
                                                        e(a).append(D),
                                                            D[0].rp = q
                                                    }
                                                    0 === l.length && (l = e("<tr " + p + " rowpos='" + q + "'></tr>").addClass("FormData").attr("id", "tr_" + d),
                                                        e(l).append(v),
                                                        e(a).append(l),
                                                        l[0].rp = q),
                                                        e("td:eq(" + (y - 2) + ")", l[0]).html(void 0 === w.label ? r.p.colNames[u] : w.label),
                                                        e("td:eq(" + (y - 1) + ")", l[0]).append(w.elmprefix).append(c).append(w.elmsuffix),
                                                    e.isFunction(b.custom_value) && "_empty" !== i && b.custom_value.call(h, e("#" + d, "#" + j), "set", n),
                                                        e.jgrid.bindEv.call(h, c, b),
                                                        f[g] = u,
                                                        g++
                                                }
                                            }),
                                        g > 0) {
                                        var b = e("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * o - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + r.p.id + "_id' value='" + i + "'/></td></tr>");
                                        b[0].rp = g + 999,
                                            e(a).append(b),
                                        (t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) && (t[h.p.id]._savedData[r.p.id + "_id"] = i)
                                    }
                                }(i, h, M, C);
                                var P = "<a href='javascript:void(0)' id='" + E + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>"
                                    , O = "<a href='javascript:void(0)' id='" + A + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>"
                                    , T = "<a href='javascript:void(0)' id='sData' class='fm-button ui-state-default ui-corner-all'>" + r.bSubmit + "</a>"
                                    , z = "<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>" + r.bCancel + "</a>"
                                    , H = "<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='" + b + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (N ? O + P : P + O) + "</td><td class='EditButton'>" + T + z + "</td></tr>";
                                if (H += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + t[h.p.id].bottominfo + "</td></tr>",
                                        H += "</tbody></table>",
                                    I > 0) {
                                    var B = [];
                                    e.each(e(M)[0].rows, function(e, t) {
                                        B[e] = t
                                    }),
                                        B.sort(function(e, t) {
                                            return e.rp > t.rp ? 1 : e.rp < t.rp ? -1 : 0
                                        }),
                                        e.each(B, function(t, i) {
                                            e("tbody", M).append(i)
                                        })
                                }
                                r.gbox = "#gbox_" + e.jgrid.jqID(v);
                                var L = !1;
                                !0 === r.closeOnEscape && (r.closeOnEscape = !1,
                                    L = !0);
                                var V = e("<div></div>").append(S).append(H);
                                if (e.jgrid.createModal(q, V, r, "#gview_" + e.jgrid.jqID(h.p.id), e("#gbox_" + e.jgrid.jqID(h.p.id))[0]),
                                    N && (e("#pData, #nData", w + "_2").css("float", "right"),
                                        e(".EditButton", w + "_2").css("text-align", "left")),
                                    t[h.p.id].topinfo && e(".tinfo", w).show(),
                                    t[h.p.id].bottominfo && e(".binfo", w + "_2").show(),
                                        V = null,
                                        H = null,
                                        e("#" + e.jgrid.jqID(q.themodal)).keydown(function(i) {
                                            var a = i.target;
                                            if (!0 === e("#" + j).data("disabled"))
                                                return !1;
                                            if (!0 === t[h.p.id].savekey[0] && i.which === t[h.p.id].savekey[1] && "TEXTAREA" !== a.tagName)
                                                return e("#sData", w + "_2").trigger("click"),
                                                    !1;
                                            if (27 === i.which)
                                                return !!n() && (L && e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                    gb: r.gbox,
                                                    jqm: r.jqModal,
                                                    onClose: t[h.p.id].onClose
                                                }),
                                                    !1);
                                            if (!0 === t[h.p.id].navkeys[0]) {
                                                if ("_empty" === e("#id_g", w).val())
                                                    return !0;
                                                if (i.which === t[h.p.id].navkeys[1])
                                                    return e("#pData", w + "_2").trigger("click"),
                                                        !1;
                                                if (i.which === t[h.p.id].navkeys[2])
                                                    return e("#nData", w + "_2").trigger("click"),
                                                        !1
                                            }
                                        }),
                                    r.checkOnUpdate && (e("a.ui-jqdialog-titlebar-close span", "#" + e.jgrid.jqID(q.themodal)).removeClass("jqmClose"),
                                        e("a.ui-jqdialog-titlebar-close", "#" + e.jgrid.jqID(q.themodal)).unbind("click").click(function() {
                                            return !!n() && (e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                gb: "#gbox_" + e.jgrid.jqID(v),
                                                jqm: r.jqModal,
                                                onClose: t[h.p.id].onClose
                                            }),
                                                !1)
                                        })),
                                        r.saveicon = e.extend([!0, "left", "ui-icon-disk"], r.saveicon),
                                        r.closeicon = e.extend([!0, "left", "ui-icon-close"], r.closeicon),
                                    !0 === r.saveicon[0] && e("#sData", w + "_2").addClass("right" === r.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + r.saveicon[2] + "'></span>"),
                                    !0 === r.closeicon[0] && e("#cData", w + "_2").addClass("right" === r.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + r.closeicon[2] + "'></span>"),
                                    t[h.p.id].checkOnSubmit || t[h.p.id].checkOnUpdate) {
                                    T = "<a href='javascript:void(0)' id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + r.bYes + "</a>",
                                        O = "<a href='javascript:void(0)' id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + r.bNo + "</a>",
                                        z = "<a href='javascript:void(0)' id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + r.bExit + "</a>";
                                    var U = r.zIndex || 999;
                                    U++,
                                        e("<div class='" + r.overlayClass + " jqgrid-overlay confirm' style='z-index:" + U + ";display:none;'>&#160;</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:" + (U + 1) + "'>" + r.saveData + "<br/><br/>" + T + O + z + "</div>").insertAfter("#" + j),
                                        e("#sNew", "#" + e.jgrid.jqID(q.themodal)).click(function() {
                                            return s(),
                                                e("#" + j).data("disabled", !1),
                                                e(".confirm", "#" + e.jgrid.jqID(q.themodal)).hide(),
                                                !1
                                        }),
                                        e("#nNew", "#" + e.jgrid.jqID(q.themodal)).click(function() {
                                            return e(".confirm", "#" + e.jgrid.jqID(q.themodal)).hide(),
                                                e("#" + j).data("disabled", !1),
                                                setTimeout(function() {
                                                    e(":input:visible", "#" + j)[0].focus()
                                                }, 0),
                                                !1
                                        }),
                                        e("#cNew", "#" + e.jgrid.jqID(q.themodal)).click(function() {
                                            return e(".confirm", "#" + e.jgrid.jqID(q.themodal)).hide(),
                                                e("#" + j).data("disabled", !1),
                                                e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                                    gb: "#gbox_" + e.jgrid.jqID(v),
                                                    jqm: r.jqModal,
                                                    onClose: t[h.p.id].onClose
                                                }),
                                                !1
                                        })
                                }
                                e(h).triggerHandler("jqGridAddEditInitializeForm", [e("#" + j), m]),
                                $ && $.call(h, e("#" + j), m),
                                    "_empty" !== i && t[h.p.id].viewPagerButtons ? e("#pData,#nData", w + "_2").show() : e("#pData,#nData", w + "_2").hide(),
                                    e(h).triggerHandler("jqGridAddEditBeforeShowForm", [e("#" + j), m]),
                                y && y.call(h, e("#" + j), m),
                                    e("#" + e.jgrid.jqID(q.themodal)).data("onClose", t[h.p.id].onClose),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(q.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(v),
                                        jqm: r.jqModal,
                                        overlay: r.overlay,
                                        modal: r.modal,
                                        overlayClass: r.overlayClass
                                    }),
                                G || e("." + e.jgrid.jqID(r.overlayClass)).click(function() {
                                    return !!n() && (e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                        gb: "#gbox_" + e.jgrid.jqID(v),
                                        jqm: r.jqModal,
                                        onClose: t[h.p.id].onClose
                                    }),
                                        !1)
                                }),
                                    e(h).triggerHandler("jqGridAddEditAfterShowForm", [e("#" + j), m]),
                                D && D.call(h, e("#" + j), m),
                                    e(".fm-button", "#" + e.jgrid.jqID(q.themodal)).hover(function() {
                                        e(this).addClass("ui-state-hover")
                                    }, function() {
                                        e(this).removeClass("ui-state-hover")
                                    }),
                                    e("#sData", w + "_2").click(function() {
                                        return g = {},
                                            e("#FormError", w).hide(),
                                            a(),
                                            "_empty" === g[h.p.id + "_id"] ? s() : !0 === r.checkOnSubmit && (f = l(g, t[h.p.id]._savedData)) ? (e("#" + j).data("disabled", !0),
                                                e(".confirm", "#" + e.jgrid.jqID(q.themodal)).show()) : s(),
                                            !1
                                    }),
                                    e("#cData", w + "_2").click(function() {
                                        return !!n() && (e.jgrid.hideModal("#" + e.jgrid.jqID(q.themodal), {
                                            gb: "#gbox_" + e.jgrid.jqID(v),
                                            jqm: r.jqModal,
                                            onClose: t[h.p.id].onClose
                                        }),
                                            !1)
                                    }),
                                    e("#nData", w + "_2").click(function() {
                                        if (!n())
                                            return !1;
                                        e("#FormError", w).hide();
                                        var t = u();
                                        if (t[0] = parseInt(t[0], 10),
                                            -1 !== t[0] && t[1][t[0] + 1]) {
                                            e(h).triggerHandler("jqGridAddEditClickPgButtons", ["next", e("#" + j), t[1][t[0]]]);
                                            var i;
                                            if (e.isFunction(r.onclickPgButtons) && void 0 !== (i = r.onclickPgButtons.call(h, "next", e("#" + j), t[1][t[0]])) && !1 === i)
                                                return !1;
                                            if (e("#" + e.jgrid.jqID(t[1][t[0] + 1])).hasClass("ui-state-disabled"))
                                                return !1;
                                            o(t[1][t[0] + 1], h, j),
                                                e(h).jqGrid("setSelection", t[1][t[0] + 1]),
                                                e(h).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", e("#" + j), t[1][t[0]]]),
                                            e.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(h, "next", e("#" + j), t[1][t[0] + 1]),
                                                c(t[0] + 1, t)
                                        }
                                        return !1
                                    }),
                                    e("#pData", w + "_2").click(function() {
                                        if (!n())
                                            return !1;
                                        e("#FormError", w).hide();
                                        var t = u();
                                        if (-1 !== t[0] && t[1][t[0] - 1]) {
                                            e(h).triggerHandler("jqGridAddEditClickPgButtons", ["prev", e("#" + j), t[1][t[0]]]);
                                            var i;
                                            if (e.isFunction(r.onclickPgButtons) && void 0 !== (i = r.onclickPgButtons.call(h, "prev", e("#" + j), t[1][t[0]])) && !1 === i)
                                                return !1;
                                            if (e("#" + e.jgrid.jqID(t[1][t[0] - 1])).hasClass("ui-state-disabled"))
                                                return !1;
                                            o(t[1][t[0] - 1], h, j),
                                                e(h).jqGrid("setSelection", t[1][t[0] - 1]),
                                                e(h).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", e("#" + j), t[1][t[0]]]),
                                            e.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(h, "prev", e("#" + j), t[1][t[0] - 1]),
                                                c(t[0] - 1, t)
                                        }
                                        return !1
                                    })
                            }
                            var W = u();
                            c(W[0], W)
                        }
                    })
            },
            viewGridRow: function(i, r) {
                return r = e.extend(!0, {
                    top: 0,
                    left: 0,
                    width: 0,
                    datawidth: "auto",
                    height: "auto",
                    dataheight: "auto",
                    modal: !1,
                    overlay: 30,
                    drag: !0,
                    resize: !0,
                    jqModal: !0,
                    closeOnEscape: !1,
                    labelswidth: "30%",
                    closeicon: [],
                    navkeys: [!1, 38, 40],
                    onClose: null,
                    beforeShowForm: null,
                    beforeInitData: null,
                    viewPagerButtons: !0,
                    recreateForm: !1
                }, e.jgrid.view, r || {}),
                    t[e(this)[0].p.id] = r,
                    this.each(function() {
                        function a() {
                            !0 !== t[l.p.id].closeOnEscape && !0 !== t[l.p.id].navkeys[0] || setTimeout(function() {
                                e(".ui-jqdialog-titlebar-close", "#" + e.jgrid.jqID(g.modalhead)).focus()
                            }, 0)
                        }
                        function o(t, i) {
                            var r, a, o, d, s = 0;
                            (d = e(i).jqGrid("getInd", t, !0)) && (e("td", d).each(function(t) {
                                r = i.p.colModel[t].name,
                                    a = (!i.p.colModel[t].editrules || !0 !== i.p.colModel[t].editrules.edithidden) && !0 === i.p.colModel[t].hidden,
                                "cb" !== r && "subgrid" !== r && "rn" !== r && (o = r === i.p.ExpandColumn && !0 === i.p.treeGrid ? e(this).text() : e(this).html(),
                                    r = e.jgrid.jqID("v_" + r),
                                    e("#" + r + " span", "#" + c).html(o),
                                a && e("#" + r, "#" + c).parents("tr:first").hide(),
                                    s++)
                            }),
                            s > 0 && e("#id_g", "#" + c).val(t))
                        }
                        function d(t, i) {
                            var r = i[1].length - 1;
                            0 === t ? e("#pData", "#" + c + "_2").addClass("ui-state-disabled") : void 0 !== i[1][t - 1] && e("#" + e.jgrid.jqID(i[1][t - 1])).hasClass("ui-state-disabled") ? e("#pData", c + "_2").addClass("ui-state-disabled") : e("#pData", "#" + c + "_2").removeClass("ui-state-disabled"),
                                t === r ? e("#nData", "#" + c + "_2").addClass("ui-state-disabled") : void 0 !== i[1][t + 1] && e("#" + e.jgrid.jqID(i[1][t + 1])).hasClass("ui-state-disabled") ? e("#nData", c + "_2").addClass("ui-state-disabled") : e("#nData", "#" + c + "_2").removeClass("ui-state-disabled")
                        }
                        function s() {
                            var t = e(l).jqGrid("getDataIDs")
                                , i = e("#id_g", "#" + c).val();
                            return [e.inArray(i, t), t]
                        }
                        var l = this;
                        if (l.grid && i) {
                            var n = l.p.id
                                , p = "ViewGrid_" + e.jgrid.jqID(n)
                                , c = "ViewTbl_" + e.jgrid.jqID(n)
                                , u = "ViewGrid_" + n
                                , h = "ViewTbl_" + n
                                , g = {
                                themodal: "viewmod" + n,
                                modalhead: "viewhd" + n,
                                modalcontent: "viewcnt" + n,
                                scrollelm: p
                            }
                                , f = !!e.isFunction(t[l.p.id].beforeInitData) && t[l.p.id].beforeInitData
                                , m = !0
                                , v = 1
                                , j = 0;
                            if (!0 === r.recreateForm && void 0 !== e("#" + e.jgrid.jqID(g.themodal))[0] && e("#" + e.jgrid.jqID(g.themodal)).remove(),
                                void 0 !== e("#" + e.jgrid.jqID(g.themodal))[0]) {
                                if (f && void 0 === (m = f.call(l, e("#" + p))) && (m = !0),
                                    !1 === m)
                                    return;
                                e(".ui-jqdialog-title", "#" + e.jgrid.jqID(g.modalhead)).html(r.caption),
                                    e("#FormError", "#" + c).hide(),
                                    o(i, l),
                                e.isFunction(t[l.p.id].beforeShowForm) && t[l.p.id].beforeShowForm.call(l, e("#" + p)),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(g.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(n),
                                        jqm: r.jqModal,
                                        jqM: !1,
                                        overlay: r.overlay,
                                        modal: r.modal
                                    }),
                                    a()
                            } else {
                                var b = isNaN(r.dataheight) ? r.dataheight : r.dataheight + "px"
                                    , w = isNaN(r.datawidth) ? r.datawidth : r.datawidth + "px"
                                    , q = e("<form name='FormPost' id='" + u + "' class='FormGrid' style='width:" + w + ";overflow:auto;position:relative;height:" + b + ";'></form>")
                                    , y = e("<table id='" + h + "' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
                                if (f && void 0 === (m = f.call(l, e("#" + p))) && (m = !0),
                                    !1 === m)
                                    return;
                                e(l.p.colModel).each(function() {
                                    var e = this.formoptions;
                                    v = Math.max(v, e ? e.colpos || 0 : 0),
                                        j = Math.max(j, e ? e.rowpos || 0 : 0)
                                }),
                                    e(q).append(y),
                                    function(t, i, a, o) {
                                        var d, s, l, n, p, c, u, h, g, f = 0, m = [], v = !1, j = "<td class='CaptionTD form-view-label ui-widget-content' width='" + r.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>", b = "", w = ["integer", "number", "currency"], q = 0, y = 0;
                                        for (c = 1; c <= o; c++)
                                            b += 1 === c ? j : "<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>";
                                        if (e(i.p.colModel).each(function() {
                                                (s = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden) || "right" !== this.align || (this.formatter && -1 !== e.inArray(this.formatter, w) ? q = Math.max(q, parseInt(this.width, 10)) : y = Math.max(y, parseInt(this.width, 10)))
                                            }),
                                                u = 0 !== q ? q : 0 !== y ? y : 0,
                                                v = e(i).jqGrid("getInd", t),
                                                e(i.p.colModel).each(function(t) {
                                                    if (d = this.name,
                                                            h = !1,
                                                            s = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden,
                                                            p = s ? "style='display:none'" : "",
                                                            g = "boolean" != typeof this.viewable || this.viewable,
                                                        "cb" !== d && "subgrid" !== d && "rn" !== d && g) {
                                                        n = !1 === v ? "" : d === i.p.ExpandColumn && !0 === i.p.treeGrid ? e("td:eq(" + t + ")", i.rows[v]).text() : e("td:eq(" + t + ")", i.rows[v]).html(),
                                                            h = "right" === this.align && 0 !== u;
                                                        var r = e.extend({}, {
                                                            rowabove: !1,
                                                            rowcontent: ""
                                                        }, this.formoptions || {})
                                                            , c = parseInt(r.rowpos, 10) || f + 1
                                                            , j = parseInt(2 * (parseInt(r.colpos, 10) || 1), 10);
                                                        if (r.rowabove) {
                                                            var w = e("<tr><td class='contentinfo' colspan='" + 2 * o + "'>" + r.rowcontent + "</td></tr>");
                                                            e(a).append(w),
                                                                w[0].rp = c
                                                        }
                                                        0 === (l = e(a).find("tr[rowpos=" + c + "]")).length && (l = e("<tr " + p + " rowpos='" + c + "'></tr>").addClass("FormData").attr("id", "trv_" + d),
                                                            e(l).append(b),
                                                            e(a).append(l),
                                                            l[0].rp = c),
                                                            e("td:eq(" + (j - 2) + ")", l[0]).html("<b>" + (void 0 === r.label ? i.p.colNames[t] : r.label) + "</b>"),
                                                            e("td:eq(" + (j - 1) + ")", l[0]).append("<span>" + n + "</span>").attr("id", "v_" + d),
                                                        h && e("td:eq(" + (j - 1) + ") span", l[0]).css({
                                                            "text-align": "right",
                                                            width: u + "px"
                                                        }),
                                                            m[f] = t,
                                                            f++
                                                    }
                                                }),
                                            f > 0) {
                                            var D = e("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * o - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + t + "'/></td></tr>");
                                            D[0].rp = f + 99,
                                                e(a).append(D)
                                        }
                                    }(i, l, y, v);
                                var D = "rtl" === l.p.direction
                                    , x = "<a href='javascript:void(0)' id='" + (D ? "nData" : "pData") + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>"
                                    , $ = "<a href='javascript:void(0)' id='" + (D ? "pData" : "nData") + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>"
                                    , _ = "<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>" + r.bClose + "</a>";
                                if (j > 0) {
                                    var C = [];
                                    e.each(e(y)[0].rows, function(e, t) {
                                        C[e] = t
                                    }),
                                        C.sort(function(e, t) {
                                            return e.rp > t.rp ? 1 : e.rp < t.rp ? -1 : 0
                                        }),
                                        e.each(C, function(t, i) {
                                            e("tbody", y).append(i)
                                        })
                                }
                                r.gbox = "#gbox_" + e.jgrid.jqID(n);
                                var I = e("<div></div>").append(q).append("<table border='0' class='EditTable' id='" + c + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + r.labelswidth + "'>" + (D ? $ + x : x + $) + "</td><td class='EditButton'>" + _ + "</td></tr></tbody></table>");
                                e.jgrid.createModal(g, I, r, "#gview_" + e.jgrid.jqID(l.p.id), e("#gview_" + e.jgrid.jqID(l.p.id))[0]),
                                D && (e("#pData, #nData", "#" + c + "_2").css("float", "right"),
                                    e(".EditButton", "#" + c + "_2").css("text-align", "left")),
                                r.viewPagerButtons || e("#pData, #nData", "#" + c + "_2").hide(),
                                    I = null,
                                    e("#" + g.themodal).keydown(function(i) {
                                        if (27 === i.which)
                                            return t[l.p.id].closeOnEscape && e.jgrid.hideModal("#" + e.jgrid.jqID(g.themodal), {
                                                gb: r.gbox,
                                                jqm: r.jqModal,
                                                onClose: r.onClose
                                            }),
                                                !1;
                                        if (!0 === r.navkeys[0]) {
                                            if (i.which === r.navkeys[1])
                                                return e("#pData", "#" + c + "_2").trigger("click"),
                                                    !1;
                                            if (i.which === r.navkeys[2])
                                                return e("#nData", "#" + c + "_2").trigger("click"),
                                                    !1
                                        }
                                    }),
                                    r.closeicon = e.extend([!0, "left", "ui-icon-close"], r.closeicon),
                                !0 === r.closeicon[0] && e("#cData", "#" + c + "_2").addClass("right" === r.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + r.closeicon[2] + "'></span>"),
                                e.isFunction(r.beforeShowForm) && r.beforeShowForm.call(l, e("#" + p)),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(g.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(n),
                                        jqm: r.jqModal,
                                        overlay: r.overlay,
                                        modal: r.modal
                                    }),
                                    e(".fm-button:not(.ui-state-disabled)", "#" + c + "_2").hover(function() {
                                        e(this).addClass("ui-state-hover")
                                    }, function() {
                                        e(this).removeClass("ui-state-hover")
                                    }),
                                    a(),
                                    e("#cData", "#" + c + "_2").click(function() {
                                        return e.jgrid.hideModal("#" + e.jgrid.jqID(g.themodal), {
                                            gb: "#gbox_" + e.jgrid.jqID(n),
                                            jqm: r.jqModal,
                                            onClose: r.onClose
                                        }),
                                            !1
                                    }),
                                    e("#nData", "#" + c + "_2").click(function() {
                                        e("#FormError", "#" + c).hide();
                                        var t = s();
                                        return t[0] = parseInt(t[0], 10),
                                        -1 !== t[0] && t[1][t[0] + 1] && (e.isFunction(r.onclickPgButtons) && r.onclickPgButtons.call(l, "next", e("#" + p), t[1][t[0]]),
                                            o(t[1][t[0] + 1], l),
                                            e(l).jqGrid("setSelection", t[1][t[0] + 1]),
                                        e.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(l, "next", e("#" + p), t[1][t[0] + 1]),
                                            d(t[0] + 1, t)),
                                            a(),
                                            !1
                                    }),
                                    e("#pData", "#" + c + "_2").click(function() {
                                        e("#FormError", "#" + c).hide();
                                        var t = s();
                                        return -1 !== t[0] && t[1][t[0] - 1] && (e.isFunction(r.onclickPgButtons) && r.onclickPgButtons.call(l, "prev", e("#" + p), t[1][t[0]]),
                                            o(t[1][t[0] - 1], l),
                                            e(l).jqGrid("setSelection", t[1][t[0] - 1]),
                                        e.isFunction(r.afterclickPgButtons) && r.afterclickPgButtons.call(l, "prev", e("#" + p), t[1][t[0] - 1]),
                                            d(t[0] - 1, t)),
                                            a(),
                                            !1
                                    })
                            }
                            var G = s();
                            d(G[0], G)
                        }
                    })
            },
            delGridRow: function(i, r) {
                return r = e.extend(!0, {
                    top: 0,
                    left: 0,
                    width: 240,
                    height: "auto",
                    dataheight: "auto",
                    modal: !1,
                    overlay: 30,
                    drag: !0,
                    resize: !0,
                    url: "",
                    mtype: "POST",
                    reloadAfterSubmit: !0,
                    beforeShowForm: null,
                    beforeInitData: null,
                    afterShowForm: null,
                    beforeSubmit: null,
                    onclickSubmit: null,
                    afterSubmit: null,
                    jqModal: !0,
                    closeOnEscape: !1,
                    delData: {},
                    delicon: [],
                    cancelicon: [],
                    onClose: null,
                    ajaxDelOptions: {},
                    processing: !1,
                    serializeDelData: null,
                    useDataProxy: !1
                }, e.jgrid.del, r || {}),
                    t[e(this)[0].p.id] = r,
                    this.each(function() {
                        var a = this;
                        if (a.grid && i) {
                            var o, d, s, l, n = e.isFunction(t[a.p.id].beforeShowForm), p = e.isFunction(t[a.p.id].afterShowForm), c = !!e.isFunction(t[a.p.id].beforeInitData) && t[a.p.id].beforeInitData, u = a.p.id, h = {}, g = !0, f = "DelTbl_" + e.jgrid.jqID(u), m = "DelTbl_" + u, v = {
                                themodal: "delmod" + u,
                                modalhead: "delhd" + u,
                                modalcontent: "delcnt" + u,
                                scrollelm: f
                            };
                            if (e.isArray(i) && (i = i.join()),
                                void 0 !== e("#" + e.jgrid.jqID(v.themodal))[0]) {
                                if (c && void 0 === (g = c.call(a, e("#" + f))) && (g = !0),
                                    !1 === g)
                                    return;
                                e("#DelData>td", "#" + f).text(i),
                                    e("#DelError", "#" + f).hide(),
                                !0 === t[a.p.id].processing && (t[a.p.id].processing = !1,
                                    e("#dData", "#" + f).removeClass("ui-state-active")),
                                n && t[a.p.id].beforeShowForm.call(a, e("#" + f)),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(v.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(u),
                                        jqm: t[a.p.id].jqModal,
                                        jqM: !1,
                                        overlay: t[a.p.id].overlay,
                                        modal: t[a.p.id].modal
                                    }),
                                p && t[a.p.id].afterShowForm.call(a, e("#" + f))
                            } else {
                                var j = isNaN(t[a.p.id].dataheight) ? t[a.p.id].dataheight : t[a.p.id].dataheight + "px"
                                    , b = "<div id='" + m + "' class='formdata' style='width:" + (isNaN(r.datawidth) ? r.datawidth : r.datawidth + "px") + ";overflow:auto;position:relative;height:" + j + ";'>";
                                b += "<table class='DelTable'><tbody>",
                                    b += "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>",
                                    b += "<tr id='DelData' style='display:none'><td >" + i + "</td></tr>",
                                    b += '<tr><td class="delmsg" style="white-space:pre;">' + t[a.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>",
                                    b += "</tbody></table></div>";
                                var w = "<a href='javascript:void(0)' id='dData' class='fm-button ui-state-default ui-corner-all'>" + r.bSubmit + "</a>"
                                    , q = "<a href='javascript:void(0)' id='eData' class='fm-button ui-state-default ui-corner-all'>" + r.bCancel + "</a>";
                                if (b += "<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='" + f + "_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + w + "&#160;" + q + "</td></tr></tbody></table>",
                                        r.gbox = "#gbox_" + e.jgrid.jqID(u),
                                        e.jgrid.createModal(v, b, r, "#gview_" + e.jgrid.jqID(a.p.id), e("#gview_" + e.jgrid.jqID(a.p.id))[0]),
                                    c && void 0 === (g = c.call(a, e("#" + f))) && (g = !0),
                                    !1 === g)
                                    return;
                                e(".fm-button", "#" + f + "_2").hover(function() {
                                    e(this).addClass("ui-state-hover")
                                }, function() {
                                    e(this).removeClass("ui-state-hover")
                                }),
                                    r.delicon = e.extend([!0, "left", "ui-icon-scissors"], t[a.p.id].delicon),
                                    r.cancelicon = e.extend([!0, "left", "ui-icon-cancel"], t[a.p.id].cancelicon),
                                !0 === r.delicon[0] && e("#dData", "#" + f + "_2").addClass("right" === r.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + r.delicon[2] + "'></span>"),
                                !0 === r.cancelicon[0] && e("#eData", "#" + f + "_2").addClass("right" === r.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + r.cancelicon[2] + "'></span>"),
                                    e("#dData", "#" + f + "_2").click(function() {
                                        var i, n = [!0, ""], p = e("#DelData>td", "#" + f).text();
                                        if (h = {},
                                            e.isFunction(t[a.p.id].onclickSubmit) && (h = t[a.p.id].onclickSubmit.call(a, t[a.p.id], p) || {}),
                                            e.isFunction(t[a.p.id].beforeSubmit) && (n = t[a.p.id].beforeSubmit.call(a, p)),
                                            n[0] && !t[a.p.id].processing) {
                                            if (t[a.p.id].processing = !0,
                                                    s = a.p.prmNames,
                                                    o = e.extend({}, t[a.p.id].delData, h),
                                                    l = s.oper,
                                                    o[l] = s.deloper,
                                                    d = s.id,
                                                    !(p = String(p).split(",")).length)
                                                return !1;
                                            for (i in p)
                                                p.hasOwnProperty(i) && (p[i] = e.jgrid.stripPref(a.p.idPrefix, p[i]));
                                            o[d] = p.join(),
                                                e(this).addClass("ui-state-active");
                                            var c = e.extend({
                                                url: t[a.p.id].url || e(a).jqGrid("getGridParam", "editurl"),
                                                type: t[a.p.id].mtype,
                                                data: e.isFunction(t[a.p.id].serializeDelData) ? t[a.p.id].serializeDelData.call(a, o) : o,
                                                complete: function(i, d) {
                                                    var s;
                                                    if (i.status >= 300 && 304 !== i.status ? (n[0] = !1,
                                                            e.isFunction(t[a.p.id].errorTextFormat) ? n[1] = t[a.p.id].errorTextFormat.call(a, i) : n[1] = d + " Status: '" + i.statusText + "'. Error code: " + i.status) : e.isFunction(t[a.p.id].afterSubmit) && (n = t[a.p.id].afterSubmit.call(a, i, o)),
                                                        !1 === n[0])
                                                        e("#DelError>td", "#" + f).html(n[1]),
                                                            e("#DelError", "#" + f).show();
                                                    else {
                                                        if (t[a.p.id].reloadAfterSubmit && "local" !== a.p.datatype)
                                                            e(a).trigger("reloadGrid");
                                                        else {
                                                            if (!0 === a.p.treeGrid)
                                                                try {
                                                                    e(a).jqGrid("delTreeNode", a.p.idPrefix + p[0])
                                                                } catch (e) {}
                                                            else
                                                                for (s = 0; s < p.length; s++)
                                                                    e(a).jqGrid("delRowData", a.p.idPrefix + p[s]);
                                                            a.p.selrow = null,
                                                                a.p.selarrrow = []
                                                        }
                                                        e.isFunction(t[a.p.id].afterComplete) && setTimeout(function() {
                                                            t[a.p.id].afterComplete.call(a, i, p)
                                                        }, 500)
                                                    }
                                                    t[a.p.id].processing = !1,
                                                        e("#dData", "#" + f + "_2").removeClass("ui-state-active"),
                                                    n[0] && e.jgrid.hideModal("#" + e.jgrid.jqID(v.themodal), {
                                                        gb: "#gbox_" + e.jgrid.jqID(u),
                                                        jqm: r.jqModal,
                                                        onClose: t[a.p.id].onClose
                                                    })
                                                }
                                            }, e.jgrid.ajaxOptions, t[a.p.id].ajaxDelOptions);
                                            if (c.url || t[a.p.id].useDataProxy || (e.isFunction(a.p.dataProxy) ? t[a.p.id].useDataProxy = !0 : (n[0] = !1,
                                                    n[1] += " " + e.jgrid.errors.nourl)),
                                                    n[0])
                                                if (t[a.p.id].useDataProxy) {
                                                    var g = a.p.dataProxy.call(a, c, "del_" + a.p.id);
                                                    void 0 === g && (g = [!0, ""]),
                                                        !1 === g[0] ? (n[0] = !1,
                                                            n[1] = g[1] || "Error deleting the selected row!") : e.jgrid.hideModal("#" + e.jgrid.jqID(v.themodal), {
                                                            gb: "#gbox_" + e.jgrid.jqID(u),
                                                            jqm: r.jqModal,
                                                            onClose: t[a.p.id].onClose
                                                        })
                                                } else
                                                    e.ajax(c)
                                        }
                                        return !1 === n[0] && (e("#DelError>td", "#" + f).html(n[1]),
                                            e("#DelError", "#" + f).show()),
                                            !1
                                    }),
                                    e("#eData", "#" + f + "_2").click(function() {
                                        return e.jgrid.hideModal("#" + e.jgrid.jqID(v.themodal), {
                                            gb: "#gbox_" + e.jgrid.jqID(u),
                                            jqm: t[a.p.id].jqModal,
                                            onClose: t[a.p.id].onClose
                                        }),
                                            !1
                                    }),
                                n && t[a.p.id].beforeShowForm.call(a, e("#" + f)),
                                    e.jgrid.viewModal("#" + e.jgrid.jqID(v.themodal), {
                                        gbox: "#gbox_" + e.jgrid.jqID(u),
                                        jqm: t[a.p.id].jqModal,
                                        overlay: t[a.p.id].overlay,
                                        modal: t[a.p.id].modal
                                    }),
                                p && t[a.p.id].afterShowForm.call(a, e("#" + f))
                            }
                            !0 === t[a.p.id].closeOnEscape && setTimeout(function() {
                                e(".ui-jqdialog-titlebar-close", "#" + e.jgrid.jqID(v.modalhead)).focus()
                            }, 0)
                        }
                    })
            },
            navGrid: function(t, i, r, a, o, d, s) {
                return i = e.extend({
                    edit: !0,
                    editicon: "ui-icon-pencil",
                    add: !0,
                    addicon: "ui-icon-plus",
                    del: !0,
                    delicon: "ui-icon-trash",
                    search: !0,
                    searchicon: "ui-icon-search",
                    refresh: !0,
                    refreshicon: "ui-icon-refresh",
                    refreshstate: "firstpage",
                    view: !1,
                    viewicon: "ui-icon-document",
                    position: "left",
                    closeOnEscape: !0,
                    beforeRefresh: null,
                    afterRefresh: null,
                    cloneToTop: !1,
                    alertwidth: 200,
                    alertheight: "auto",
                    alerttop: null,
                    alertleft: null,
                    alertzIndex: null
                }, e.jgrid.nav, i || {}),
                    this.each(function() {
                        if (!this.nav) {
                            var l, n, p = {
                                themodal: "alertmod_" + this.p.id,
                                modalhead: "alerthd_" + this.p.id,
                                modalcontent: "alertcnt_" + this.p.id
                            }, c = this;
                            if (c.grid && "string" == typeof t) {
                                void 0 === e("#" + p.themodal)[0] && (i.alerttop || i.alertleft || (void 0 !== window.innerWidth ? (i.alertleft = window.innerWidth,
                                    i.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (i.alertleft = document.documentElement.clientWidth,
                                    i.alerttop = document.documentElement.clientHeight) : (i.alertleft = 1024,
                                    i.alerttop = 768),
                                    i.alertleft = i.alertleft / 2 - parseInt(i.alertwidth, 10) / 2,
                                    i.alerttop = i.alerttop / 2 - 25),
                                    e.jgrid.createModal(p, "<div>" + i.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                                        gbox: "#gbox_" + e.jgrid.jqID(c.p.id),
                                        jqModal: !0,
                                        drag: !0,
                                        resize: !0,
                                        caption: i.alertcap,
                                        top: i.alerttop,
                                        left: i.alertleft,
                                        width: i.alertwidth,
                                        height: i.alertheight,
                                        closeOnEscape: i.closeOnEscape,
                                        zIndex: i.alertzIndex
                                    }, "#gview_" + e.jgrid.jqID(c.p.id), e("#gbox_" + e.jgrid.jqID(c.p.id))[0], !0));
                                var u, h = 1, g = function() {
                                    e(this).hasClass("ui-state-disabled") || e(this).addClass("ui-state-hover")
                                }, f = function() {
                                    e(this).removeClass("ui-state-hover")
                                };
                                for (i.cloneToTop && c.p.toppager && (h = 2),
                                         u = 0; u < h; u++) {
                                    var m, v, j, b = e("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>");
                                    0 === u ? (v = t,
                                        j = c.p.id,
                                    v === c.p.toppager && (j += "_top",
                                        h = 1)) : (v = c.p.toppager,
                                        j = c.p.id + "_top"),
                                    "rtl" === c.p.direction && e(b).attr("dir", "rtl").css("float", "right"),
                                    i.add && (a = a || {},
                                        m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.addicon + "'></span>" + i.addtext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.addtitle || "",
                                            id: a.id || "add_" + j
                                        }).click(function() {
                                            return e(this).hasClass("ui-state-disabled") || (e.isFunction(i.addfunc) ? i.addfunc.call(c) : e(c).jqGrid("editGridRow", "new", a)),
                                                !1
                                        }).hover(g, f),
                                        m = null),
                                    i.edit && (m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        r = r || {},
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.editicon + "'></span>" + i.edittext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.edittitle || "",
                                            id: r.id || "edit_" + j
                                        }).click(function() {
                                            if (!e(this).hasClass("ui-state-disabled")) {
                                                var t = c.p.selrow;
                                                t ? e.isFunction(i.editfunc) ? i.editfunc.call(c, t) : e(c).jqGrid("editGridRow", t, r) : (e.jgrid.viewModal("#" + p.themodal, {
                                                    gbox: "#gbox_" + e.jgrid.jqID(c.p.id),
                                                    jqm: !0
                                                }),
                                                    e("#jqg_alrt").focus())
                                            }
                                            return !1
                                        }).hover(g, f),
                                        m = null),
                                    i.view && (m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        s = s || {},
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.viewicon + "'></span>" + i.viewtext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.viewtitle || "",
                                            id: s.id || "view_" + j
                                        }).click(function() {
                                            if (!e(this).hasClass("ui-state-disabled")) {
                                                var t = c.p.selrow;
                                                t ? e.isFunction(i.viewfunc) ? i.viewfunc.call(c, t) : e(c).jqGrid("viewGridRow", t, s) : (e.jgrid.viewModal("#" + p.themodal, {
                                                    gbox: "#gbox_" + e.jgrid.jqID(c.p.id),
                                                    jqm: !0
                                                }),
                                                    e("#jqg_alrt").focus())
                                            }
                                            return !1
                                        }).hover(g, f),
                                        m = null),
                                    i.del && (m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        o = o || {},
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.delicon + "'></span>" + i.deltext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.deltitle || "",
                                            id: o.id || "del_" + j
                                        }).click(function() {
                                            if (!e(this).hasClass("ui-state-disabled")) {
                                                var t;
                                                c.p.multiselect ? 0 === (t = c.p.selarrrow).length && (t = null) : t = c.p.selrow,
                                                    t ? e.isFunction(i.delfunc) ? i.delfunc.call(c, t) : e(c).jqGrid("delGridRow", t, o) : (e.jgrid.viewModal("#" + p.themodal, {
                                                        gbox: "#gbox_" + e.jgrid.jqID(c.p.id),
                                                        jqm: !0
                                                    }),
                                                        e("#jqg_alrt").focus())
                                            }
                                            return !1
                                        }).hover(g, f),
                                        m = null),
                                    (i.add || i.edit || i.del || i.view) && e("tr", b).append("<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>"),
                                    i.search && (m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        d = d || {},
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.searchicon + "'></span>" + i.searchtext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.searchtitle || "",
                                            id: d.id || "search_" + j
                                        }).click(function() {
                                            return e(this).hasClass("ui-state-disabled") || (e.isFunction(i.searchfunc) ? i.searchfunc.call(c, d) : e(c).jqGrid("searchGrid", d)),
                                                !1
                                        }).hover(g, f),
                                    d.showOnLoad && !0 === d.showOnLoad && e(m, b).click(),
                                        m = null),
                                    i.refresh && (m = e("<td class='ui-pg-button ui-corner-all'></td>"),
                                        e(m).append("<div class='ui-pg-div'><span class='ui-icon " + i.refreshicon + "'></span>" + i.refreshtext + "</div>"),
                                        e("tr", b).append(m),
                                        e(m, b).attr({
                                            title: i.refreshtitle || "",
                                            id: "refresh_" + j
                                        }).click(function() {
                                            if (!e(this).hasClass("ui-state-disabled")) {
                                                e.isFunction(i.beforeRefresh) && i.beforeRefresh.call(c),
                                                    c.p.search = !1;
                                                try {
                                                    var t = c.p.id;
                                                    c.p.postData.filters = "";
                                                    try {
                                                        e("#fbox_" + e.jgrid.jqID(t)).jqFilter("resetFilter")
                                                    } catch (e) {}
                                                    e.isFunction(c.clearToolbar) && c.clearToolbar.call(c, !1)
                                                } catch (e) {}
                                                switch (i.refreshstate) {
                                                    case "firstpage":
                                                        e(c).trigger("reloadGrid", [{
                                                            page: 1
                                                        }]);
                                                        break;
                                                    case "current":
                                                        e(c).trigger("reloadGrid", [{
                                                            current: !0
                                                        }])
                                                }
                                                e.isFunction(i.afterRefresh) && i.afterRefresh.call(c)
                                            }
                                            return !1
                                        }).hover(g, f),
                                        m = null),
                                        n = e(".ui-jqgrid").css("font-size") || "11px",
                                        e("body").append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + n + ";visibility:hidden;' ></div>"),
                                        l = e(b).clone().appendTo("#testpg2").width(),
                                        e("#testpg2").remove(),
                                        e(v + "_" + i.position, v).append(b),
                                    c.p._nvtd && (l > c.p._nvtd[0] && (e(v + "_" + i.position, v).width(l),
                                        c.p._nvtd[0] = l),
                                        c.p._nvtd[1] = l),
                                        n = null,
                                        l = null,
                                        b = null,
                                        this.nav = !0
                                }
                            }
                        }
                    })
            },
            navButtonAdd: function(t, i) {
                return i = e.extend({
                    caption: "newButton",
                    title: "",
                    buttonicon: "ui-icon-newwin",
                    onClickButton: null,
                    position: "last",
                    cursor: "pointer"
                }, i || {}),
                    this.each(function() {
                        if (this.grid) {
                            "string" == typeof t && 0 !== t.indexOf("#") && (t = "#" + e.jgrid.jqID(t));
                            var r = e(".navtable", t)[0]
                                , a = this;
                            if (r) {
                                if (i.id && void 0 !== e("#" + e.jgrid.jqID(i.id), r)[0])
                                    return;
                                var o = e("<td></td>");
                                "NONE" === i.buttonicon.toString().toUpperCase() ? e(o).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" + i.caption + "</div>") : e(o).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'><span class='ui-icon " + i.buttonicon + "'></span>" + i.caption + "</div>"),
                                i.id && e(o).attr("id", i.id),
                                    "first" === i.position ? 0 === r.rows[0].cells.length ? e("tr", r).append(o) : e("tr td:eq(0)", r).before(o) : e("tr", r).append(o),
                                    e(o, r).attr("title", i.title || "").click(function(t) {
                                        return e(this).hasClass("ui-state-disabled") || e.isFunction(i.onClickButton) && i.onClickButton.call(a, t),
                                            !1
                                    }).hover(function() {
                                        e(this).hasClass("ui-state-disabled") || e(this).addClass("ui-state-hover")
                                    }, function() {
                                        e(this).removeClass("ui-state-hover")
                                    })
                            }
                        }
                    })
            },
            navSeparatorAdd: function(t, i) {
                return i = e.extend({
                    sepclass: "ui-separator",
                    sepcontent: "",
                    position: "last"
                }, i || {}),
                    this.each(function() {
                        if (this.grid) {
                            "string" == typeof t && 0 !== t.indexOf("#") && (t = "#" + e.jgrid.jqID(t));
                            var r = e(".navtable", t)[0];
                            if (r) {
                                var a = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" + i.sepclass + "'></span>" + i.sepcontent + "</td>";
                                "first" === i.position ? 0 === r.rows[0].cells.length ? e("tr", r).append(a) : e("tr td:eq(0)", r).before(a) : e("tr", r).append(a)
                            }
                        }
                    })
            },
            GridToForm: function(t, i) {
                return this.each(function() {
                    var r, a = this;
                    if (a.grid) {
                        var o = e(a).jqGrid("getRowData", t);
                        if (o)
                            for (r in o)
                                o.hasOwnProperty(r) && (e("[name=" + e.jgrid.jqID(r) + "]", i).is("input:radio") || e("[name=" + e.jgrid.jqID(r) + "]", i).is("input:checkbox") ? e("[name=" + e.jgrid.jqID(r) + "]", i).each(function() {
                                    e(this).val() == o[r] ? e(this)[a.p.useProp ? "prop" : "attr"]("checked", !0) : e(this)[a.p.useProp ? "prop" : "attr"]("checked", !1)
                                }) : e("[name=" + e.jgrid.jqID(r) + "]", i).val(o[r]))
                    }
                })
            },
            FormToGrid: function(t, i, r, a) {
                return this.each(function() {
                    var o = this;
                    if (o.grid) {
                        r || (r = "set"),
                        a || (a = "first");
                        var d = e(i).serializeArray()
                            , s = {};
                        e.each(d, function(e, t) {
                            s[t.name] = t.value
                        }),
                            "add" === r ? e(o).jqGrid("addRowData", t, s, a) : "set" === r && e(o).jqGrid("setRowData", t, s)
                    }
                })
            }
        })
    }(jQuery),
    function(e) {
        "use strict";
        e.jgrid.extend({
            setTreeNode: function(t, i) {
                return this.each(function() {
                    var r = this;
                    if (r.grid && r.p.treeGrid)
                        for (var a, o, d, s, l, n, p, c, u = r.p.expColInd, h = r.p.treeReader.expanded_field, g = r.p.treeReader.leaf_field, f = r.p.treeReader.level_field, m = r.p.treeReader.icon_field, v = r.p.treeReader.loaded; t < i; ) {
                            var j = e.jgrid.stripPref(r.p.idPrefix, r.rows[t].id)
                                , b = r.p._index[j];
                            if (p = r.p.data[b],
                                "nested" === r.p.treeGridModel && (p[g] || (a = parseInt(p[r.p.treeReader.left_field], 10),
                                    o = parseInt(p[r.p.treeReader.right_field], 10),
                                    p[g] = o === a + 1 ? "true" : "false",
                                    r.rows[t].cells[r.p._treeleafpos].innerHTML = p[g])),
                                    d = parseInt(p[f], 10),
                                    0 === r.p.tree_root_level ? (s = d + 1,
                                        l = d) : (s = d,
                                        l = d - 1),
                                    n = "<div class='tree-wrap tree-wrap-" + r.p.direction + "' style='width:" + 18 * s + "px;'>",
                                    n += "<div style='" + ("rtl" === r.p.direction ? "right:" : "left:") + 18 * l + "px;' class='ui-icon ",
                                void 0 !== p[v] && ("true" === p[v] || !0 === p[v] ? p[v] = !0 : p[v] = !1),
                                    "true" === p[g] || !0 === p[g] ? (n += (void 0 !== p[m] && "" !== p[m] ? p[m] : r.p.treeIcons.leaf) + " tree-leaf treeclick",
                                        p[g] = !0,
                                        c = "leaf") : (p[g] = !1,
                                        c = ""),
                                    p[h] = ("true" === p[h] || !0 === p[h]) && (p[v] || void 0 === p[v]),
                                    !1 === p[h] ? n += !0 === p[g] ? "'" : r.p.treeIcons.plus + " tree-plus treeclick'" : n += !0 === p[g] ? "'" : r.p.treeIcons.minus + " tree-minus treeclick'",
                                    n += "></div></div>",
                                    e(r.rows[t].cells[u]).wrapInner("<span class='cell-wrapper" + c + "'></span>").prepend(n),
                                d !== parseInt(r.p.tree_root_level, 10)) {
                                var w = e(r).jqGrid("getNodeParent", p);
                                !w || !w.hasOwnProperty(h) || w[h] || e(r.rows[t]).css("display", "none")
                            }
                            e(r.rows[t].cells[u]).find("div.treeclick").bind("click", function(t) {
                                var i = t.target || t.srcElement
                                    , a = e.jgrid.stripPref(r.p.idPrefix, e(i, r.rows).closest("tr.jqgrow")[0].id)
                                    , o = r.p._index[a];
                                return r.p.data[o][g] || (r.p.data[o][h] ? (e(r).jqGrid("collapseRow", r.p.data[o]),
                                    e(r).jqGrid("collapseNode", r.p.data[o])) : (e(r).jqGrid("expandRow", r.p.data[o]),
                                    e(r).jqGrid("expandNode", r.p.data[o]))),
                                    !1
                            }),
                            !0 === r.p.ExpandColClick && e(r.rows[t].cells[u]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function(t) {
                                var i = t.target || t.srcElement
                                    , a = e.jgrid.stripPref(r.p.idPrefix, e(i, r.rows).closest("tr.jqgrow")[0].id)
                                    , o = r.p._index[a];
                                return r.p.data[o][g] || (r.p.data[o][h] ? (e(r).jqGrid("collapseRow", r.p.data[o]),
                                    e(r).jqGrid("collapseNode", r.p.data[o])) : (e(r).jqGrid("expandRow", r.p.data[o]),
                                    e(r).jqGrid("expandNode", r.p.data[o]))),
                                    e(r).jqGrid("setSelection", a),
                                    !1
                            }),
                                t++
                        }
                })
            },
            setTreeGrid: function() {
                return this.each(function() {
                    var t, i, r, a, o = this, d = 0, s = !1, l = [];
                    if (o.p.treeGrid) {
                        o.p.treedatatype || e.extend(o.p, {
                            treedatatype: o.p.datatype
                        }),
                            o.p.subGrid = !1,
                            o.p.altRows = !1,
                            o.p.pgbuttons = !1,
                            o.p.pginput = !1,
                            o.p.gridview = !0,
                        null === o.p.rowTotal && (o.p.rowNum = 1e4),
                            o.p.multiselect = !1,
                            o.p.rowList = [],
                            o.p.expColInd = 0,
                            t = "ui-icon-triangle-1-" + ("rtl" === o.p.direction ? "w" : "e"),
                            o.p.treeIcons = e.extend({
                                plus: t,
                                minus: "ui-icon-triangle-1-s",
                                leaf: "ui-icon-radio-off"
                            }, o.p.treeIcons || {}),
                            "nested" === o.p.treeGridModel ? o.p.treeReader = e.extend({
                                level_field: "level",
                                left_field: "lft",
                                right_field: "rgt",
                                leaf_field: "isLeaf",
                                expanded_field: "expanded",
                                loaded: "loaded",
                                icon_field: "icon"
                            }, o.p.treeReader) : "adjacency" === o.p.treeGridModel && (o.p.treeReader = e.extend({
                                level_field: "level",
                                parent_id_field: "parent",
                                leaf_field: "isLeaf",
                                expanded_field: "expanded",
                                loaded: "loaded",
                                icon_field: "icon"
                            }, o.p.treeReader));
                        for (r in o.p.colModel)
                            if (o.p.colModel.hasOwnProperty(r)) {
                                (i = o.p.colModel[r].name) !== o.p.ExpandColumn || s || (s = !0,
                                    o.p.expColInd = d),
                                    d++;
                                for (a in o.p.treeReader)
                                    o.p.treeReader.hasOwnProperty(a) && o.p.treeReader[a] === i && l.push(i)
                            }
                        e.each(o.p.treeReader, function(t, i) {
                            i && -1 === e.inArray(i, l) && ("leaf_field" === t && (o.p._treeleafpos = d),
                                d++,
                                o.p.colNames.push(i),
                                o.p.colModel.push({
                                    name: i,
                                    width: 1,
                                    hidden: !0,
                                    sortable: !1,
                                    resizable: !1,
                                    hidedlg: !0,
                                    editable: !0,
                                    search: !1
                                }))
                        })
                    }
                })
            },
            expandRow: function(t) {
                this.each(function() {
                    var i = this;
                    if (i.grid && i.p.treeGrid) {
                        var r = e(i).jqGrid("getNodeChildren", t)
                            , a = i.p.treeReader.expanded_field
                            , o = i.rows;
                        e(r).each(function() {
                            var t = i.p.idPrefix + e.jgrid.getAccessor(this, i.p.localReader.id);
                            e(o.namedItem(t)).css("display", ""),
                            this[a] && e(i).jqGrid("expandRow", this)
                        })
                    }
                })
            },
            collapseRow: function(t) {
                this.each(function() {
                    var i = this;
                    if (i.grid && i.p.treeGrid) {
                        var r = e(i).jqGrid("getNodeChildren", t)
                            , a = i.p.treeReader.expanded_field
                            , o = i.rows;
                        e(r).each(function() {
                            var t = i.p.idPrefix + e.jgrid.getAccessor(this, i.p.localReader.id);
                            e(o.namedItem(t)).css("display", "none"),
                            this[a] && e(i).jqGrid("collapseRow", this)
                        })
                    }
                })
            },
            getRootNodes: function() {
                var t = [];
                return this.each(function() {
                    var i = this;
                    if (i.grid && i.p.treeGrid)
                        switch (i.p.treeGridModel) {
                            case "nested":
                                var r = i.p.treeReader.level_field;
                                e(i.p.data).each(function() {
                                    parseInt(this[r], 10) === parseInt(i.p.tree_root_level, 10) && t.push(this)
                                });
                                break;
                            case "adjacency":
                                var a = i.p.treeReader.parent_id_field;
                                e(i.p.data).each(function() {
                                    null !== this[a] && "null" !== String(this[a]).toLowerCase() || t.push(this)
                                })
                        }
                }),
                    t
            },
            getNodeDepth: function(t) {
                var i = null;
                return this.each(function() {
                    if (this.grid && this.p.treeGrid) {
                        var r = this;
                        switch (r.p.treeGridModel) {
                            case "nested":
                                var a = r.p.treeReader.level_field;
                                i = parseInt(t[a], 10) - parseInt(r.p.tree_root_level, 10);
                                break;
                            case "adjacency":
                                i = e(r).jqGrid("getNodeAncestors", t).length
                        }
                    }
                }),
                    i
            },
            getNodeParent: function(t) {
                var i = null;
                return this.each(function() {
                    var r = this;
                    if (r.grid && r.p.treeGrid)
                        switch (r.p.treeGridModel) {
                            case "nested":
                                var a = r.p.treeReader.left_field
                                    , o = r.p.treeReader.right_field
                                    , d = r.p.treeReader.level_field
                                    , s = parseInt(t[a], 10)
                                    , l = parseInt(t[o], 10)
                                    , n = parseInt(t[d], 10);
                                e(this.p.data).each(function() {
                                    if (parseInt(this[d], 10) === n - 1 && parseInt(this[a], 10) < s && parseInt(this[o], 10) > l)
                                        return i = this,
                                            !1
                                });
                                break;
                            case "adjacency":
                                var p = r.p.treeReader.parent_id_field
                                    , c = r.p.localReader.id;
                                e(this.p.data).each(function() {
                                    if (this[c] === e.jgrid.stripPref(r.p.idPrefix, t[p]))
                                        return i = this,
                                            !1
                                })
                        }
                }),
                    i
            },
            getNodeChildren: function(t) {
                var i = [];
                return this.each(function() {
                    var r = this;
                    if (r.grid && r.p.treeGrid)
                        switch (r.p.treeGridModel) {
                            case "nested":
                                var a = r.p.treeReader.left_field
                                    , o = r.p.treeReader.right_field
                                    , d = r.p.treeReader.level_field
                                    , s = parseInt(t[a], 10)
                                    , l = parseInt(t[o], 10)
                                    , n = parseInt(t[d], 10);
                                e(this.p.data).each(function() {
                                    parseInt(this[d], 10) === n + 1 && parseInt(this[a], 10) > s && parseInt(this[o], 10) < l && i.push(this)
                                });
                                break;
                            case "adjacency":
                                var p = r.p.treeReader.parent_id_field
                                    , c = r.p.localReader.id;
                                e(this.p.data).each(function() {
                                    this[p] == e.jgrid.stripPref(r.p.idPrefix, t[c]) && i.push(this)
                                })
                        }
                }),
                    i
            },
            getFullTreeNode: function(t) {
                var i = [];
                return this.each(function() {
                    var r, a = this;
                    if (a.grid && a.p.treeGrid)
                        switch (a.p.treeGridModel) {
                            case "nested":
                                var o = a.p.treeReader.left_field
                                    , d = a.p.treeReader.right_field
                                    , s = a.p.treeReader.level_field
                                    , l = parseInt(t[o], 10)
                                    , n = parseInt(t[d], 10)
                                    , p = parseInt(t[s], 10);
                                e(this.p.data).each(function() {
                                    parseInt(this[s], 10) >= p && parseInt(this[o], 10) >= l && parseInt(this[o], 10) <= n && i.push(this)
                                });
                                break;
                            case "adjacency":
                                if (t) {
                                    i.push(t);
                                    var c = a.p.treeReader.parent_id_field
                                        , u = a.p.localReader.id;
                                    e(this.p.data).each(function(t) {
                                        for (r = i.length,
                                                 t = 0; t < r; t++)
                                            if (e.jgrid.stripPref(a.p.idPrefix, i[t][u]) === this[c]) {
                                                i.push(this);
                                                break
                                            }
                                    })
                                }
                        }
                }),
                    i
            },
            getNodeAncestors: function(t) {
                var i = [];
                return this.each(function() {
                    if (this.grid && this.p.treeGrid)
                        for (var r = e(this).jqGrid("getNodeParent", t); r; )
                            i.push(r),
                                r = e(this).jqGrid("getNodeParent", r)
                }),
                    i
            },
            isVisibleNode: function(t) {
                var i = !0;
                return this.each(function() {
                    var r = this;
                    if (r.grid && r.p.treeGrid) {
                        var a = e(r).jqGrid("getNodeAncestors", t)
                            , o = r.p.treeReader.expanded_field;
                        e(a).each(function() {
                            if (!(i = i && this[o]))
                                return !1
                        })
                    }
                }),
                    i
            },
            isNodeLoaded: function(t) {
                var i;
                return this.each(function() {
                    var r = this;
                    if (r.grid && r.p.treeGrid) {
                        var a = r.p.treeReader.leaf_field;
                        i = void 0 !== t && (void 0 !== t.loaded ? t.loaded : !!(t[a] || e(r).jqGrid("getNodeChildren", t).length > 0))
                    }
                }),
                    i
            },
            expandNode: function(t) {
                return this.each(function() {
                    if (this.grid && this.p.treeGrid) {
                        var i = this.p.treeReader.expanded_field
                            , r = this.p.treeReader.parent_id_field
                            , a = this.p.treeReader.loaded
                            , o = this.p.treeReader.level_field
                            , d = this.p.treeReader.left_field
                            , s = this.p.treeReader.right_field;
                        if (!t[i]) {
                            var l = e.jgrid.getAccessor(t, this.p.localReader.id)
                                , n = e("#" + this.p.idPrefix + e.jgrid.jqID(l), this.grid.bDiv)[0]
                                , p = this.p._index[l];
                            e(this).jqGrid("isNodeLoaded", this.p.data[p]) ? (t[i] = !0,
                                e("div.treeclick", n).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (t[i] = !0,
                                e("div.treeclick", n).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"),
                                this.p.treeANode = n.rowIndex,
                                this.p.datatype = this.p.treedatatype,
                                "nested" === this.p.treeGridModel ? e(this).jqGrid("setGridParam", {
                                    postData: {
                                        nodeid: l,
                                        n_left: t[d],
                                        n_right: t[s],
                                        n_level: t[o]
                                    }
                                }) : e(this).jqGrid("setGridParam", {
                                    postData: {
                                        nodeid: l,
                                        parentid: t[r],
                                        n_level: t[o]
                                    }
                                }),
                                e(this).trigger("reloadGrid"),
                                t[a] = !0,
                                "nested" === this.p.treeGridModel ? e(this).jqGrid("setGridParam", {
                                    postData: {
                                        nodeid: "",
                                        n_left: "",
                                        n_right: "",
                                        n_level: ""
                                    }
                                }) : e(this).jqGrid("setGridParam", {
                                    postData: {
                                        nodeid: "",
                                        parentid: "",
                                        n_level: ""
                                    }
                                }))
                        }
                    }
                })
            },
            collapseNode: function(t) {
                return this.each(function() {
                    if (this.grid && this.p.treeGrid) {
                        var i = this.p.treeReader.expanded_field;
                        if (t[i]) {
                            t[i] = !1;
                            var r = e.jgrid.getAccessor(t, this.p.localReader.id)
                                , a = e("#" + this.p.idPrefix + e.jgrid.jqID(r), this.grid.bDiv)[0];
                            e("div.treeclick", a).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus")
                        }
                    }
                })
            },
            SortTree: function(t, i, r, a) {
                return this.each(function() {
                    if (this.grid && this.p.treeGrid) {
                        var o, d, s, l, n, p = [], c = this, u = e(this).jqGrid("getRootNodes");
                        for ((l = e.jgrid.from(u)).orderBy(t, i, r, a),
                                 o = 0,
                                 d = (n = l.select()).length; o < d; o++)
                            s = n[o],
                                p.push(s),
                                e(this).jqGrid("collectChildrenSortTree", p, s, t, i, r, a);
                        e.each(p, function(t) {
                            var i = e.jgrid.getAccessor(this, c.p.localReader.id);
                            e("#" + e.jgrid.jqID(c.p.id) + " tbody tr:eq(" + t + ")").after(e("tr#" + e.jgrid.jqID(i), c.grid.bDiv))
                        }),
                            l = null,
                            n = null,
                            p = null
                    }
                })
            },
            collectChildrenSortTree: function(t, i, r, a, o, d) {
                return this.each(function() {
                    if (this.grid && this.p.treeGrid) {
                        var s, l, n, p, c, u;
                        for (p = e(this).jqGrid("getNodeChildren", i),
                                 (c = e.jgrid.from(p)).orderBy(r, a, o, d),
                                 s = 0,
                                 l = (u = c.select()).length; s < l; s++)
                            n = u[s],
                                t.push(n),
                                e(this).jqGrid("collectChildrenSortTree", t, n, r, a, o, d)
                    }
                })
            },
            setTreeRow: function(t, i) {
                var r = !1;
                return this.each(function() {
                    var a = this;
                    a.grid && a.p.treeGrid && (r = e(a).jqGrid("setRowData", t, i))
                }),
                    r
            },
            delTreeNode: function(t) {
                return this.each(function() {
                    var i, r, a, o, d, s = this, l = s.p.localReader.id, n = s.p.treeReader.left_field, p = s.p.treeReader.right_field;
                    if (s.grid && s.p.treeGrid) {
                        var c = s.p._index[t];
                        if (void 0 !== c) {
                            a = (r = parseInt(s.p.data[c][p], 10)) - parseInt(s.p.data[c][n], 10) + 1;
                            var u = e(s).jqGrid("getFullTreeNode", s.p.data[c]);
                            if (u.length > 0)
                                for (i = 0; i < u.length; i++)
                                    e(s).jqGrid("delRowData", u[i][l]);
                            if ("nested" === s.p.treeGridModel) {
                                if ((o = e.jgrid.from(s.p.data).greater(n, r, {
                                        stype: "integer"
                                    }).select()).length)
                                    for (d in o)
                                        o.hasOwnProperty(d) && (o[d][n] = parseInt(o[d][n], 10) - a);
                                if ((o = e.jgrid.from(s.p.data).greater(p, r, {
                                        stype: "integer"
                                    }).select()).length)
                                    for (d in o)
                                        o.hasOwnProperty(d) && (o[d][p] = parseInt(o[d][p], 10) - a)
                            }
                        }
                    }
                })
            },
            addChildNode: function(t, i, r, a) {
                var o = this[0];
                if (r) {
                    var d, s, l, n, p, c, u, h, g = o.p.treeReader.expanded_field, f = o.p.treeReader.leaf_field, m = o.p.treeReader.level_field, v = o.p.treeReader.parent_id_field, j = o.p.treeReader.left_field, b = o.p.treeReader.right_field, w = o.p.treeReader.loaded, q = 0, y = i;
                    if (void 0 === a && (a = !1),
                        void 0 === t || null === t) {
                        if ((p = o.p.data.length - 1) >= 0)
                            for (; p >= 0; )
                                q = Math.max(q, parseInt(o.p.data[p][o.p.localReader.id], 10)),
                                    p--;
                        t = q + 1
                    }
                    var D = e(o).jqGrid("getInd", i);
                    if (u = !1,
                        void 0 === i || null === i || "" === i)
                        i = null,
                            y = null,
                            d = "last",
                            n = o.p.tree_root_level,
                            p = o.p.data.length + 1;
                    else {
                        d = "after",
                            s = o.p._index[i],
                            i = (l = o.p.data[s])[o.p.localReader.id],
                            n = parseInt(l[m], 10) + 1;
                        var x = e(o).jqGrid("getFullTreeNode", l);
                        x.length ? (y = p = x[x.length - 1][o.p.localReader.id],
                            p = e(o).jqGrid("getInd", y) + 1) : p = e(o).jqGrid("getInd", i) + 1,
                        l[f] && (u = !0,
                            l[g] = !0,
                            e(o.rows[D]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(o.p.treeIcons.leaf + " tree-leaf").addClass(o.p.treeIcons.minus + " tree-minus"),
                            o.p.data[s][f] = !1,
                            l[w] = !0)
                    }
                    if (c = p + 1,
                        void 0 === r[g] && (r[g] = !1),
                        void 0 === r[w] && (r[w] = !1),
                            r[m] = n,
                        void 0 === r[f] && (r[f] = !0),
                        "adjacency" === o.p.treeGridModel && (r[v] = i),
                        "nested" === o.p.treeGridModel) {
                        var $, _, C;
                        if (null !== i) {
                            if (h = parseInt(l[b], 10),
                                    $ = e.jgrid.from(o.p.data),
                                    $ = $.greaterOrEquals(b, h, {
                                        stype: "integer"
                                    }),
                                    (_ = $.select()).length)
                                for (C in _)
                                    _.hasOwnProperty(C) && (_[C][j] = _[C][j] > h ? parseInt(_[C][j], 10) + 2 : _[C][j],
                                        _[C][b] = _[C][b] >= h ? parseInt(_[C][b], 10) + 2 : _[C][b]);
                            r[j] = h,
                                r[b] = h + 1
                        } else {
                            if (h = parseInt(e(o).jqGrid("getCol", b, !1, "max"), 10),
                                    (_ = e.jgrid.from(o.p.data).greater(j, h, {
                                        stype: "integer"
                                    }).select()).length)
                                for (C in _)
                                    _.hasOwnProperty(C) && (_[C][j] = parseInt(_[C][j], 10) + 2);
                            if ((_ = e.jgrid.from(o.p.data).greater(b, h, {
                                    stype: "integer"
                                }).select()).length)
                                for (C in _)
                                    _.hasOwnProperty(C) && (_[C][b] = parseInt(_[C][b], 10) + 2);
                            r[j] = h + 1,
                                r[b] = h + 2
                        }
                    }
                    (null === i || e(o).jqGrid("isNodeLoaded", l) || u) && (e(o).jqGrid("addRowData", t, r, d, y),
                        e(o).jqGrid("setTreeNode", p, c)),
                    l && !l[g] && a && e(o.rows[D]).find("div.treeclick").click()
                }
            }
        })
    }(jQuery),
    function(e) {
        e.jgrid = e.jgrid || {},
            e.extend(e.jgrid, {
                defaults: {
                    recordtext: "{0} - {1}　共 {2} 条",
                    emptyrecords: "无数据显示",
                    loadtext: "读取中...",
                    pgtext: " {0} 共 {1} 页"
                },
                search: {
                    caption: "搜索...",
                    Find: "查找",
                    Reset: "重置",
                    odata: [{
                        oper: "eq",
                        text: "等于　　"
                    }, {
                        oper: "ne",
                        text: "不等　　"
                    }, {
                        oper: "lt",
                        text: "小于　　"
                    }, {
                        oper: "le",
                        text: "小于等于"
                    }, {
                        oper: "gt",
                        text: "大于　　"
                    }, {
                        oper: "ge",
                        text: "大于等于"
                    }, {
                        oper: "bw",
                        text: "开始于"
                    }, {
                        oper: "bn",
                        text: "不开始于"
                    }, {
                        oper: "in",
                        text: "属于　　"
                    }, {
                        oper: "ni",
                        text: "不属于"
                    }, {
                        oper: "ew",
                        text: "结束于"
                    }, {
                        oper: "en",
                        text: "不结束于"
                    }, {
                        oper: "cn",
                        text: "包含　　"
                    }, {
                        oper: "nc",
                        text: "不包含"
                    }],
                    groupOps: [{
                        op: "AND",
                        text: "所有"
                    }, {
                        op: "OR",
                        text: "任一"
                    }]
                },
                edit: {
                    addCaption: "添加记录",
                    editCaption: "编辑记录",
                    bSubmit: "提交",
                    bCancel: "取消",
                    bClose: "关闭",
                    saveData: "数据已改变，是否保存？",
                    bYes: "是",
                    bNo: "否",
                    bExit: "取消",
                    msg: {
                        required: "此字段必需",
                        number: "请输入有效数字",
                        minValue: "输值必须大于等于 ",
                        maxValue: "输值必须小于等于 ",
                        email: "这不是有效的e-mail地址",
                        integer: "请输入有效整数",
                        date: "请输入有效时间",
                        url: "无效网址。前缀必须为 ('http://' 或 'https://')",
                        nodefined: " 未定义！",
                        novalue: " 需要返回值！",
                        customarray: "自定义函数需要返回数组！",
                        customfcheck: "Custom function should be present in case of custom checking!"
                    }
                },
                view: {
                    caption: "查看记录",
                    bClose: "关闭"
                },
                del: {
                    caption: "删除",
                    msg: "删除所选记录？",
                    bSubmit: "删除",
                    bCancel: "取消"
                },
                nav: {
                    edittext: "",
                    edittitle: "编辑所选记录",
                    addtext: "",
                    addtitle: "添加新记录",
                    deltext: "",
                    deltitle: "删除所选记录",
                    searchtext: "",
                    searchtitle: "查找",
                    refreshtext: "",
                    refreshtitle: "刷新表格",
                    alertcap: "注意",
                    alerttext: "请选择记录",
                    viewtext: "",
                    viewtitle: "查看所选记录"
                },
                col: {
                    caption: "选择列",
                    bSubmit: "确定",
                    bCancel: "取消"
                },
                errors: {
                    errcap: "错误",
                    nourl: "没有设置url",
                    norecords: "没有要处理的记录",
                    model: "colNames 和 colModel 长度不等！"
                },
                formatter: {
                    integer: {
                        thousandsSeparator: ",",
                        defaultValue: "&#160;"
                    },
                    number: {
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        decimalPlaces: 2,
                        defaultValue: "&#160;"
                    },
                    currency: {
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        decimalPlaces: 2,
                        prefix: "",
                        suffix: "",
                        defaultValue: "&#160;"
                    },
                    date: {
                        dayNames: ["日", "一", "二", "三", "四", "五", "六", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                        monthNames: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        AmPm: ["am", "pm", "上午", "下午"],
                        S: function(e) {
                            return e < 11 || e > 13 ? ["st", "nd", "rd", "th"][Math.min((e - 1) % 10, 3)] : "th"
                        },
                        srcformat: "Y-m-d",
                        newformat: "Y-m-d",
                        parseRe: /[Tt\\\/:_;.,\t\s-]/,
                        masks: {
                            ISO8601Long: "Y-m-d H:i:s",
                            ISO8601Short: "Y-m-d",
                            ShortDate: "n/j/Y",
                            LongDate: "l, F d, Y",
                            FullDateTime: "l, F d, Y g:i:s A",
                            MonthDay: "F d",
                            ShortTime: "g:i A",
                            LongTime: "g:i:s A",
                            SortableDateTime: "Y-m-d\\TH:i:s",
                            UniversalSortableDateTime: "Y-m-d H:i:sO",
                            YearMonth: "F, Y"
                        },
                        reformatAfterEdit: !1
                    },
                    baseLinkUrl: "",
                    showAction: "",
                    target: "",
                    checkbox: {
                        disabled: !0
                    },
                    idName: "id"
                }
            })
    }(jQuery),
    function(e) {
        "use strict";
        e.fmatter = {},
            e.extend(e.fmatter, {
                isBoolean: function(e) {
                    return "boolean" == typeof e
                },
                isObject: function(t) {
                    return t && ("object" == typeof t || e.isFunction(t)) || !1
                },
                isString: function(e) {
                    return "string" == typeof e
                },
                isNumber: function(e) {
                    return "number" == typeof e && isFinite(e)
                },
                isValue: function(e) {
                    return this.isObject(e) || this.isString(e) || this.isNumber(e) || this.isBoolean(e)
                },
                isEmpty: function(t) {
                    return !(!this.isString(t) && this.isValue(t)) && (!this.isValue(t) || "" === (t = e.trim(t).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, "")))
                }
            }),
            e.fn.fmatter = function(t, i, r, a, o) {
                var d = i;
                r = e.extend({}, e.jgrid.formatter, r);
                try {
                    d = e.fn.fmatter[t].call(this, i, r, a, o)
                } catch (e) {}
                return d
            }
            ,
            e.fmatter.util = {
                NumberFormat: function(t, i) {
                    if (e.fmatter.isNumber(t) || (t *= 1),
                            e.fmatter.isNumber(t)) {
                        var r, a = t < 0, o = String(t), d = i.decimalSeparator || ".";
                        if (e.fmatter.isNumber(i.decimalPlaces)) {
                            var s = i.decimalPlaces
                                , l = Math.pow(10, s)
                                , n = 1;
                            if (-1 != (r = o.lastIndexOf("."))) {
                                var p = o.split(".")[1].length;
                                p = p > 8 ? 8 : p,
                                    n = Math.pow(10, p)
                            }
                            if (o = String(Math.round(t * n * l / n) / l),
                                    r = o.lastIndexOf("."),
                                s > 0)
                                for (r < 0 ? r = (o += d).length - 1 : "." !== d && (o = o.replace(".", d)); o.length - 1 - r < s; )
                                    o += "0"
                        }
                        if (i.thousandsSeparator) {
                            var c = i.thousandsSeparator;
                            r = (r = o.lastIndexOf(d)) > -1 ? r : o.length;
                            var u, h = o.substring(r), g = -1;
                            for (u = r; u > 0; u--)
                                ++g % 3 == 0 && u !== r && (!a || u > 1) && (h = c + h),
                                    h = o.charAt(u - 1) + h;
                            o = h
                        }
                        return o = i.prefix ? i.prefix + o : o,
                            o = i.suffix ? o + i.suffix : o
                    }
                    return t
                }
            },
            e.fn.fmatter.defaultFormat = function(t, i) {
                return e.fmatter.isValue(t) && "" !== t ? t : i.defaultValue || "&#160;"
            }
            ,
            e.fn.fmatter.email = function(t, i) {
                return e.fmatter.isEmpty(t) ? e.fn.fmatter.defaultFormat(t, i) : '<a href="mailto:' + t + '">' + t + "</a>"
            }
            ,
            e.fn.fmatter.checkbox = function(t, i) {
                var r, a = e.extend({}, i.checkbox);
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (a = e.extend({}, a, i.colModel.formatoptions)),
                    r = !0 === a.disabled ? 'disabled="disabled"' : "",
                (e.fmatter.isEmpty(t) || void 0 === t) && (t = e.fn.fmatter.defaultFormat(t, a)),
                '<input type="checkbox" ' + ((t = (t = String(t)).toLowerCase()).search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' " : "") + ' value="' + t + '" offval="no" ' + r + "/>"
            }
            ,
            e.fn.fmatter.link = function(t, i) {
                var r = {
                    target: i.target
                }
                    , a = "";
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = e.extend({}, r, i.colModel.formatoptions)),
                r.target && (a = "target=" + r.target),
                    e.fmatter.isEmpty(t) ? e.fn.fmatter.defaultFormat(t, i) : "<a " + a + ' href="' + t + '">' + t + "</a>"
            }
            ,
            e.fn.fmatter.showlink = function(t, i) {
                var r, a = {
                    baseLinkUrl: i.baseLinkUrl,
                    showAction: i.showAction,
                    addParam: i.addParam || "",
                    target: i.target,
                    idName: i.idName
                }, o = "";
                if (void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (a = e.extend({}, a, i.colModel.formatoptions)),
                    a.target && (o = "target=" + a.target),
                        r = a.baseLinkUrl + a.showAction + "?" + a.idName + "=" + i.rowId + a.addParam,
                    e.fmatter.isString(t) || e.fmatter.isNumber(t)) {
                    if (a.pageTab) {
                        var d = ["rel=pageTab"];
                        return a.parentopen && d.push("parentopen=true", "tabtxt=" + a.tabtxt),
                        "<a " + o + ' href="' + r + '"' + d.join(" ") + ">" + t + "</a>"
                    }
                    return "<a " + o + ' href="' + r + '">' + t + "</a>"
                }
                return e.fn.fmatter.defaultFormat(t, i)
            }
            ,
            e.fn.fmatter.integer = function(t, i) {
                var r = e.extend({}, i.integer);
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = e.extend({}, r, i.colModel.formatoptions)),
                    e.fmatter.isEmpty(t) ? r.defaultValue : e.fmatter.util.NumberFormat(t, r)
            }
            ,
            e.fn.fmatter.number = function(t, i) {
                var r = e.extend({}, i.number);
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = e.extend({}, r, i.colModel.formatoptions)),
                    e.fmatter.isEmpty(t) ? r.defaultValue : e.fmatter.util.NumberFormat(t, r)
            }
            ,
            e.fn.fmatter.currency = function(t, i) {
                var r = e.extend({}, i.currency);
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (r = e.extend({}, r, i.colModel.formatoptions)),
                    e.fmatter.isEmpty(t) ? r.defaultValue : 0 !== Number(t) || r.showZero ? e.fmatter.util.NumberFormat(t, r) : "&#160;"
            }
            ,
            e.fn.fmatter.date = function(t, i, r, a) {
                var o = e.extend({}, i.date);
                return void 0 !== i.colModel && void 0 !== i.colModel.formatoptions && (o = e.extend({}, o, i.colModel.formatoptions)),
                    o.reformatAfterEdit || "edit" !== a ? e.fmatter.isEmpty(t) ? e.fn.fmatter.defaultFormat(t, i) : e.jgrid.parseDate(o.srcformat, t, o.newformat, o) : e.fn.fmatter.defaultFormat(t, i)
            }
            ,
            e.fn.fmatter.select = function(t, i) {
                t = String(t);
                var r, a, o = !1, d = [];
                if (void 0 !== i.colModel.formatoptions ? (o = i.colModel.formatoptions.value,
                        r = void 0 === i.colModel.formatoptions.separator ? ":" : i.colModel.formatoptions.separator,
                        a = void 0 === i.colModel.formatoptions.delimiter ? ";" : i.colModel.formatoptions.delimiter) : void 0 !== i.colModel.editoptions && (o = i.colModel.editoptions.value,
                        r = void 0 === i.colModel.editoptions.separator ? ":" : i.colModel.editoptions.separator,
                        a = void 0 === i.colModel.editoptions.delimiter ? ";" : i.colModel.editoptions.delimiter),
                        o) {
                    var s, l = !0 === i.colModel.editoptions.multiple, n = [];
                    if (l && (n = t.split(","),
                            n = e.map(n, function(t) {
                                return e.trim(t)
                            })),
                            e.fmatter.isString(o)) {
                        var p, c = o.split(a), u = 0;
                        for (p = 0; p < c.length; p++)
                            if ((s = c[p].split(r)).length > 2 && (s[1] = e.map(s, function(e, t) {
                                    if (t > 0)
                                        return e
                                }).join(r)),
                                    l)
                                e.inArray(s[0], n) > -1 && (d[u] = s[1],
                                    u++);
                            else if (e.trim(s[0]) === e.trim(t)) {
                                d[0] = s[1];
                                break
                            }
                    } else
                        e.fmatter.isObject(o) && (l ? d = e.map(n, function(e) {
                            return o[e]
                        }) : d[0] = o[t] || "")
                }
                return "" === (t = d.join(", ")) ? e.fn.fmatter.defaultFormat(t, i) : t
            }
            ,
            e.fn.fmatter.rowactions = function(t) {
                var i = e(this).closest("tr.jqgrow")
                    , r = i.attr("id")
                    , a = e(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1")
                    , o = e("#" + a)
                    , d = o[0]
                    , s = d.p
                    , l = s.colModel[e.jgrid.getCellIndex(this)]
                    , n = l.frozen ? e("tr#" + r + " td:eq(" + e.jgrid.getCellIndex(this) + ") > div", o) : e(this).parent()
                    , p = {
                    keys: !1,
                    onEdit: null,
                    onSuccess: null,
                    afterSave: null,
                    onError: null,
                    afterRestore: null,
                    extraparam: {},
                    url: null,
                    restoreAfterError: !0,
                    mtype: "POST",
                    delOptions: {},
                    editOptions: {}
                }
                    , c = function(t) {
                    e.isFunction(p.afterRestore) && p.afterRestore.call(d, t),
                        n.find("div.ui-inline-edit,div.ui-inline-del").show(),
                        n.find("div.ui-inline-save,div.ui-inline-cancel").hide()
                };
                void 0 !== l.formatoptions && (p = e.extend(p, l.formatoptions)),
                void 0 !== s.editOptions && (p.editOptions = s.editOptions),
                void 0 !== s.delOptions && (p.delOptions = s.delOptions),
                i.hasClass("jqgrid-new-row") && (p.extraparam[s.prmNames.oper] = s.prmNames.addoper);
                var u = {
                    keys: p.keys,
                    oneditfunc: p.onEdit,
                    successfunc: p.onSuccess,
                    url: p.url,
                    extraparam: p.extraparam,
                    aftersavefunc: function(t, i) {
                        e.isFunction(p.afterSave) && p.afterSave.call(d, t, i),
                            n.find("div.ui-inline-edit,div.ui-inline-del").show(),
                            n.find("div.ui-inline-save,div.ui-inline-cancel").hide()
                    },
                    errorfunc: p.onError,
                    afterrestorefunc: c,
                    restoreAfterError: p.restoreAfterError,
                    mtype: p.mtype
                };
                switch (t) {
                    case "edit":
                        o.jqGrid("editRow", r, u),
                            n.find("div.ui-inline-edit,div.ui-inline-del").hide(),
                            n.find("div.ui-inline-save,div.ui-inline-cancel").show(),
                            o.triggerHandler("jqGridAfterGridComplete");
                        break;
                    case "save":
                        o.jqGrid("saveRow", r, u) && (n.find("div.ui-inline-edit,div.ui-inline-del").show(),
                            n.find("div.ui-inline-save,div.ui-inline-cancel").hide(),
                            o.triggerHandler("jqGridAfterGridComplete"));
                        break;
                    case "cancel":
                        o.jqGrid("restoreRow", r, c),
                            n.find("div.ui-inline-edit,div.ui-inline-del").show(),
                            n.find("div.ui-inline-save,div.ui-inline-cancel").hide(),
                            o.triggerHandler("jqGridAfterGridComplete");
                        break;
                    case "del":
                        o.jqGrid("delGridRow", r, p.delOptions);
                        break;
                    case "formedit":
                        o.jqGrid("setSelection", r),
                            o.jqGrid("editGridRow", r, p.editOptions)
                }
            }
            ,
            e.fn.fmatter.actions = function(t, i) {
                var r, a = {
                    keys: !1,
                    editbutton: !0,
                    delbutton: !0,
                    editformbutton: !1
                }, o = i.rowId, d = "";
                return void 0 !== i.colModel.formatoptions && (a = e.extend(a, i.colModel.formatoptions)),
                    void 0 === o || e.fmatter.isEmpty(o) ? "" : (a.editformbutton ? (r = "id='jEditButton_" + o + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ",
                        d += "<div title='" + e.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + r + "><span class='ui-icon ui-icon-pencil'></span></div>") : a.editbutton && (r = "id='jEditButton_" + o + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ",
                        d += "<div title='" + e.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + r + "><span class='ui-icon ui-icon-pencil'></span></div>"),
                    a.delbutton && (r = "id='jDeleteButton_" + o + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ",
                        d += "<div title='" + e.jgrid.nav.deltitle + "' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' " + r + "><span class='ui-icon ui-icon-trash'></span></div>"),
                        r = "id='jSaveButton_" + o + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ",
                        d += "<div title='" + e.jgrid.edit.bSubmit + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + r + "><span class='ui-icon ui-icon-disk'></span></div>",
                        r = "id='jCancelButton_" + o + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ",
                    "<div style='margin-left:8px;'>" + (d += "<div title='" + e.jgrid.edit.bCancel + "' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' " + r + "><span class='ui-icon ui-icon-cancel'></span></div>") + "</div>")
            }
            ,
            e.unformat = function(t, i, r, a) {
                var o, d, s = i.colModel.formatter, l = i.colModel.formatoptions || {}, n = /([\.\*\_\'\(\)\{\}\+\?\\])/g, p = i.colModel.unformat || e.fn.fmatter[s] && e.fn.fmatter[s].unformat;
                if (void 0 !== p && e.isFunction(p))
                    o = p.call(this, e(t).text(), i, t);
                else if (void 0 !== s && e.fmatter.isString(s)) {
                    var c, u = e.jgrid.formatter || {};
                    switch (s) {
                        case "integer":
                            d = (l = e.extend({}, u.integer, l)).thousandsSeparator.replace(n, "\\$1"),
                                c = new RegExp(d,"g"),
                                o = e(t).text().replace(c, "");
                            break;
                        case "number":
                            d = (l = e.extend({}, u.number, l)).thousandsSeparator.replace(n, "\\$1"),
                                c = new RegExp(d,"g"),
                                o = e(t).text().replace(c, "").replace(l.decimalSeparator, ".");
                            break;
                        case "currency":
                            d = (l = e.extend({}, u.currency, l)).thousandsSeparator.replace(n, "\\$1"),
                                c = new RegExp(d,"g"),
                                o = e(t).text(),
                            l.prefix && l.prefix.length && (o = o.substr(l.prefix.length)),
                            l.suffix && l.suffix.length && (o = o.substr(0, o.length - l.suffix.length)),
                                o = o.replace(c, "").replace(l.decimalSeparator, ".");
                            break;
                        case "checkbox":
                            var h = i.colModel.editoptions ? i.colModel.editoptions.value.split(":") : ["Yes", "No"];
                            o = e("input", t).is(":checked") ? h[0] : h[1];
                            break;
                        case "select":
                            o = e.unformat.select(t, i, r, a);
                            break;
                        case "actions":
                            return "";
                        default:
                            o = e(t).text()
                    }
                }
                return "" === e.jgrid.htmlDecode(o) && (o = ""),
                    void 0 !== o ? o : !0 === a ? e(t).text() : e.jgrid.htmlDecode(e(t).html())
            }
            ,
            e.unformat.select = function(t, i, r, a) {
                var o = []
                    , d = e(t).text();
                if (!0 === a)
                    return d;
                var s = e.extend({}, void 0 !== i.colModel.formatoptions ? i.colModel.formatoptions : i.colModel.editoptions)
                    , l = void 0 === s.separator ? ":" : s.separator
                    , n = void 0 === s.delimiter ? ";" : s.delimiter;
                if (s.value) {
                    var p, c = s.value, u = !0 === s.multiple, h = [];
                    if (u && (h = d.split(","),
                            h = e.map(h, function(t) {
                                return e.trim(t)
                            })),
                            e.fmatter.isString(c)) {
                        var g, f = c.split(n), m = 0;
                        for (g = 0; g < f.length; g++)
                            if ((p = f[g].split(l)).length > 2 && (p[1] = e.map(p, function(e, t) {
                                    if (t > 0)
                                        return e
                                }).join(l)),
                                    u)
                                e.inArray(p[1], h) > -1 && (o[m] = p[0],
                                    m++);
                            else if (e.trim(p[1]) === e.trim(d)) {
                                o[0] = p[0];
                                break
                            }
                    } else
                        (e.fmatter.isObject(c) || e.isArray(c)) && (u || (h[0] = d),
                            o = e.map(h, function(t) {
                                var i;
                                if (e.each(c, function(e, r) {
                                        if (r === t)
                                            return i = e,
                                                !1
                                    }),
                                    void 0 !== i)
                                    return i
                            }));
                    return o.join(", ")
                }
                return d || ""
            }
            ,
            e.unformat.date = function(t, i) {
                var r = e.jgrid.formatter.date || {};
                return void 0 !== i.formatoptions && (r = e.extend({}, r, i.formatoptions)),
                    e.fmatter.isEmpty(t) ? e.fn.fmatter.defaultFormat(t, i) : e.jgrid.parseDate(r.newformat, t, r.srcformat, r)
            }
    }(jQuery);
