!function (e) {
    e.fn.combo = function (t) {
        if (0 == this.length) return this;
        var i, n = arguments;
        return this.each(function () {
            var a = e(this).data("_combo");
            if ("string" == typeof t) {
                if (!a) return;
                "function" == typeof a[t] && (n = Array.prototype.slice.call(n, 1), i = a[t].apply(a, n))
            } else a || (a = new e.Combo(e(this), t), e(this).data("_combo", a))
        }), void 0 === i ? this : i
    }, e.fn.getCombo = function () {
        return e.Combo.getCombo(this)
    }, e.Combo = function (t, i) {
        this.obj = t, this.opts = e.extend(!0, {}, e.Combo.defaults, i), this.dataOpt = this.opts.data, this._selectedIndex = -1, this.addQuery = !0, this._disabled = void 0 !== this.opts.disabled ? !!this.opts.disabled : !!this.obj.attr("disabled"), e.extend(this, this.opts.callback), this._init()
    }, e.Combo.getCombo = function (t) {
        if (0 != (t = e(t)).length) {
            if (1 == t.length) return t.data("_combo");
            if (t.length > 1) {
                var i = [];
                return t.each(function (t) {
                    i.push(e(this).data("_combo"))
                }), i
            }
        }
    },
        e.Combo.prototype = {
            constructor: e.Combo, _init: function () {
                var e = this.opts;
                "select" == this.obj[0].tagName.toLowerCase() && (this.originSelect = this.obj, this.dataOpt = this._getDataFromSelect()), this._createCombo(), this.loadData(this.dataOpt, e.defaultSelected, e.defaultFlag), this._handleDisabled(this._disabled), this._bindEvent()
            },
            loadData: function (e, t, i) {
                if (this.xhr && this.xhr.abort(), this.empty(!1), this.dataOpt = e, this.mode = this._getRenderMode(), this.mode) if ("local" == this.mode) {
                    this._formatData();
                    var n = this.formattedData.slice(0, this.opts.maxFilter);
                    this._populateList(n), this._setDefaultSelected(t, i)
                } else "remote" == this.mode && this._loadAjaxData(t, i)
            },
            activate: function () {
                this.focus || this.input.focus(), this.wrap.addClass(this.opts.activeCls), this.active = !0
            },
            _blur: function () {
                this.active && (this.collapse(), this.opts.editable && this.opts.forceSelection && (this.selectByText(this.input.val()), -1 == this._selectedIndex && this.input.val("")), this.wrap.removeClass(this.opts.activeCls), this.active = !1, "function" == typeof this.onBlur && this.onBlur())
            },
            blur: function () {
                this.focus && this.input.blur(), this._blur()
            },
            _bindEvent: function () {
                var t = this, i = this.opts, n = "." + i.listItemCls;
                t.list.on("click", n, function (n) {
                    e(this).hasClass(i.selectedCls) || t.selectByItem(e(this)), t.collapse(), t.input.focus(), "function" == typeof i.callback.onListClick && i.callback.onListClick.call(t)
                }).on("mouseover", n, function (t) {
                    e(this).addClass(i.hoverCls).siblings().removeClass(i.hoverCls)
                }).on("mouseleave", n, function (t) {
                    e(this).removeClass(i.hoverCls)
                }), t.input.on("focus", function (e) {
                    t.wrap.addClass(i.activeCls), t.focus = !0, t.active = !0, "function" == typeof t.onFocus && t.onFocus()
                }).on("blur", function (e) {
                    t.focus = !1
                }), i.editable ? t.input.on("click", function (e) {
                }) : t.input.on("click", function (e) {
                    t._onTriggerClick()
                }), t.trigger && t.trigger.on("click", function (e) {
                    t._onTriggerClick()
                }), e(document).on("click", function (i) {
                    var n = i.target || i.srcElement;
                    0 == e(n).closest(t.wrap).length && 0 == e(n).closest(t.listWrap).length && t.blur()
                }), this.listWrap.on("click", function (e) {
                    e.stopPropagation()
                }), e(window).on("resize", function () {
                    t._setListPosition()
                }), this._bindKeyEvent()
            },
            _bindKeyEvent: function () {
                var t = this, i = this.opts, n = {
                    backSpace: 8,
                    esc: 27,
                    f7: 118,
                    up: 38,
                    down: 40,
                    tab: 9,
                    enter: 13,
                    home: 36,
                    end: 35,
                    pageUp: 33,
                    pageDown: 34,
                    space: 32
                };
                this.input.on("keydown", function (a) {
                    switch (a.keyCode) {
                        case n.tab:
                            t._blur();
                            break;
                        case n.down:
                        case n.up:
                            if (t.isExpanded) {
                                r = a.keyCode == n.down ? "next" : "prev";
                                t._setItemFocus(r)
                            } else t._onTriggerClick();
                            a.preventDefault();
                            break;
                        case n.enter:
                            if (t.queryDelay && window.clearTimeout(t.queryDelay), t.isExpanded) (s = t.list.find("." + i.hoverCls)).length > 0 && (s.find("p").trigger("click"), t.selectByItem(s)), t.collapse(); else {
                                var o = e.trim(t.input.val());
                                t.selectByText(o)
                            }
                            "function" == typeof i.callback.onEnter && i.callback.onEnter(a);
                            break;
                        case n.home:
                        case n.end:
                            if (t.isExpanded) {
                                var s = a.keyCode == n.home ? t.list.find("." + i.listItemCls).eq(0) : t.list.find("." + i.listItemCls).filter(":last");
                                t._scrollToItem(s), a.preventDefault()
                            }
                            break;
                        case n.pageUp:
                        case n.pageDown:
                            if (t.isExpanded) {
                                var r = a.keyCode == n.pageUp ? "up" : "down";
                                t._scrollPage(r), a.preventDefault()
                            }
                    }
                }).on("keyup", function (e) {
                    if (i.editable) {
                        var a = e.which,
                            o = 8 == a || 9 == a || 13 == a || 27 == a || a >= 16 && a <= 20 || a >= 33 && a <= 40 || a >= 44 && a <= 46 || a >= 112 && a <= 123 || 144 == a || 145 == a,
                            s = t.input.val();
                        o && a != n.backSpace || t.doDelayQuery(s)
                    }
                }), e(document).on("keydown", function (e) {
                    e.keyCode == n.esc && t.collapse()
                })
            }, distory: function () {
            }, enable: function () {
                this._handleDisabled(!1)
            }, disable: function (e) {
                e = void 0 === e || !!e, this._handleDisabled(e)
            }, _handleDisabled: function (e) {
                var t = this.opts;
                this._disabled = e, 1 == e ? this.wrap.addClass(t.disabledCls) : this.wrap.removeClass(t.disabledCls), this.input.attr("disabled", e)
            },
            _createCombo: function () {
                var t, i, n, a = this.opts, o = parseInt(this.opts.width);
                this.originSelect && this.originSelect.hide(), "input" == this.obj[0].tagName.toLowerCase() ? this.input = this.obj : (i = this.obj.find("." + a.inputCls), this.input = i.length > 0 ? i : e('<input type="text" class="' + a.inputCls + '"/>')), this.input.attr({
                    autocomplete: "off",
                    readOnly: !a.editable
                }).css({cursor: a.editable ? "" : "default"}), (n = e(this.obj).find("." + a.triggerCls)).length > 0 ? this.trigger = n : !1 !== a.trigger && (this.trigger = e('<span class="' + a.triggerCls + '"></span>')), (t = this.obj.hasClass(a.wrapCls) ? this.obj : this.obj.find("." + a.wrapCls)).length > 0 ? this.wrap = t.append(this.input, this.trigger) : this.trigger && (this.wrap = e('<span class="' + a.wrapCls + '"></span>').append(this.input, this.trigger), this.originSelect && this.obj[0] == this.originSelect[0] || this.obj[0] == this.input[0] ? this.obj.next().length > 0 ? this.wrap.insertBefore(this.obj.next()) : this.wrap.appendTo(this.obj.parent()) : this.wrap.appendTo(this.obj)), this.wrap && a.id && this.wrap.attr("id", a.id), this.wrap || (this.wrap = this.input), this._setComboLayout(o), a.forGoodsCombo ? (this.list = e("<div />").addClass(a.listCls).css({
                    position: "relative",
                    height: "300px",
                    overflow: "auto",
                    width: "861px",
                    border: "1px solid #ccc"
                }), this.listWrap = e("<div />").addClass(a.listWrapCls).attr("id", a.listId).hide().append(this.list).css({
                    position: "absolute",
                    top: 0,
                    zIndex: a.zIndex,
                    border: 0
                })) : (this.list = e("<div />").addClass(a.listCls).css({
                    position: "relative",
                    overflow: "auto"
                }), this.listWrap = e("<div />").addClass(a.listWrapCls).attr("id", a.listId).hide().append(this.list).css({
                    position: "absolute",
                    top: 0,
                    zIndex: a.zIndex
                })), a.extraListHtml && (a.forGoodsCombo ? e("<div />").addClass(a.extraListHtmlCls).append(a.extraListHtml).appendTo(this.listWrap).css({
                    width: "856px",
                    border: "#ccc 1px solid",
                    borderTop: "none"
                }) : e("<div />").addClass(a.extraListHtmlCls).append(a.extraListHtml).appendTo(this.listWrap)), a.listRenderToBody ? (e.Combo.allListWrap || (e.Combo.allListWrap = e('<div id="COMBO_WRAP"/>').appendTo("body")), this.listWrap.appendTo(e.Combo.allListWrap)) : this.wrap.after(this.listWrap)
            },
            _setListLayout: function () {
                var e, t, i = this.opts, n = parseInt(i.listHeight), a = 0,
                    o = this.trigger ? this.trigger.outerWidth() : 0, s = parseInt(i.minListWidth),
                    r = parseInt(i.maxListWidth);
                if (this.listWrap.width("auto"), this.list.height("auto"), this.listWrap.show(), this.isExpanded = !0, t = this.list.height(), !isNaN(n) && n >= 0 && (n = Math.min(n, t), this.list.height(n)), "auto" == i.listWidth || "auto" == i.width ? (e = this.listWrap.outerWidth(), t < this.list.height() && (e += a = 20)) : (e = parseInt(i.listWidth), isNaN(e) && (e = this.wrap.outerWidth())), "auto" == i.width) {
                    var l = this.listWrap.outerWidth() + Math.max(o, a);
                    this._setComboLayout(l)
                }
                s = isNaN(s) ? this.wrap.outerWidth() : Math.max(s, this.wrap.outerWidth()), !isNaN(s) && e < s && (e = s), !isNaN(r) && e > r && (e = r), e -= this.listWrap.outerWidth() - this.listWrap.width(), this.listWrap.width(e), this.listWrap.hide(), this.isExpanded = !1
            },
            _setComboLayout: function (e) {
                if (e) {
                    var t = this.opts, i = parseInt(t.maxWidth), n = parseInt(t.minWidth);
                    !isNaN(i) && e > i && (e = i), !isNaN(n) && e < n && (e = n);
                    var a;
                    e -= this.wrap.outerWidth() - this.wrap.width(), this.wrap.width(e), this.wrap[0] != this.input[0] && (a = e - (this.trigger ? this.trigger.outerWidth() : 0) - (this.input.outerWidth() - this.input.width()), this.input.width(a))
                }
            },
            _setListPosition: function () {
                if (this.isExpanded) {
                    this.opts;
                    var t, i, n = e(window), a = this.wrap.offset().top, o = this.wrap.offset().left, s = n.height(),
                        r = n.width(), l = n.scrollTop(), d = n.scrollLeft(), c = this.wrap.outerHeight(),
                        h = this.wrap.outerWidth(), u = this.listWrap.outerHeight(), p = this.listWrap.outerWidth(),
                        f = parseInt(this.listWrap.css("border-top-width"));
                    t = a - l + c + u > s && a > u ? a - u + f : a + c - f, i = o - d + p > r ? o + h - p : o, this.listWrap.css({
                        top: t,
                        left: i
                    }), this.opts.forGoodsCombo && this.list.css({height: "350px"})
                }
            },
            _getRenderMode: function () {
                var t, i = this.dataOpt;
                return e.isFunction(i) && (i = i()), e.isArray(i) ? (this.rawData = i, t = "local") : "string" == typeof i && (this.url = i, t = "remote"), t
            },
            _loadAjaxData: function (t, i, n) {
                var a = this, o = a.opts, s = o.ajaxOptions;
                "function" == typeof s && (s = e.extend(!0, e.Combo.defaults.ajaxOptions, s()));
                var r = e("<div />").addClass(o.loadingCls).text(s.loadingText);
                a.list.append(r), a.list.empty(), a._setListLayout(), a._setListPosition(), a.xhr = e.ajax({
                    url: a.url,
                    data: s.data,
                    type: s.type,
                    dataType: s.dataType,
                    timeout: s.timeout,
                    success: function (o) {
                        r.remove(), e.isFunction(s.success) && s.success(o), e.isFunction(s.formatData) && (o = s.formatData(o)), o && (a.rawData = o, a._selectedIndex = -1, a._formatData(), a._populateList(a.formattedData), "" === t ? (a.lastQuery = n, a.filterData = a.formattedData, a.expand()) : a._setDefaultSelected(t, i), a.xhr = null, a.mode = a._getRenderMode())
                    },
                    error: function (t, i, n) {
                        r.remove(), e("<div />").addClass(o.tipsCls).text(s.errorText).appendTo(a.list), a.xhr = null
                    }
                })
            },
            getDisabled: function () {
                return this._disabled
            },
            getValue: function () {
                return this._selectedIndex > -1 ? this.formattedData[this._selectedIndex].value : this.opts.forceSelection ? "" : this.input.val()
            },
            getText: function () {
                return this._selectedIndex > -1 ? this.formattedData[this._selectedIndex].text : this.opts.forceSelection ? "" : this.input.val()
            },
            getSelectedIndex: function () {
                return this._selectedIndex
            },
            getSelectedRow: function () {
                var e = this._selectedIndex, t = [], i = this.opts;
                if (i.emptyOptions && t.push({
                        name: "(空)",
                        id: 0
                    }), i.addOptions && (t.push(i.addOptions), t.push({
                        name: i.addOptions.text,
                        id: i.addOptions.value
                    })), t = t.concat(this.rawData), e > -1) return t[e]
            },
            getDataRow: function () {
                return this.getSelectedRow()
            }, getAllData: function () {
                return this.formattedData
            }, getAllRawData: function () {
                return this.rawData
            }, _setDefaultSelected: function (t, i) {
                var n = this.opts;
                if ("function" == typeof t && (defaultSelected = defaultSelected.call(this, this.rawData)), isNaN(parseInt(t))) if (e.isArray(t)) this.selectByKey(t[0], t[1], i); else if (this.originSelect) {
                    a = this.originSelect[0].selectedIndex;
                    this._setSelected(a, i)
                } else n.autoSelect && this._setSelected(0, i); else {
                    var a = parseInt(t);
                    this._setSelected(a, i)
                }
            }, selectByIndex: function (e, t) {
                this._setSelected(e, t)
            }, selectByText: function (e, t) {
                if (this.formattedData) {
                    for (var i = this.formattedData, n = -1, a = 0, o = i.length; a < o; a++) if (i[a].text === e) {
                        n = a;
                        break
                    }
                    this._setSelected(n, t)
                }
            }, selectByValue: function (e, t) {
                if (this.formattedData) {
                    for (var i = this.formattedData, n = -1, a = 0, o = i.length; a < o; a++) if (i[a].value == e) {
                        n = a;
                        break
                    }
                    this._setSelected(n, t)
                }
            }, selectByKey: function (e, t, i) {
                if (this.rawData) {
                    var n = this.opts, a = this.rawData, o = -1;
                    if (n.addOptions || n.emptyOptions) {
                        for (var s = 0, r = (a = this.formattedData).length; s < r; s++) if (a[s].value == t) {
                            o = s;
                            break
                        }
                    } else for (var s = 0, r = a.length; s < r; s++) if (a[s][e] == t) {
                        o = s;
                        break
                    }
                    this._setSelected(o, i)
                }
            }, selectByItem: function (e, t) {
                if (this.opts.forGoodsCombo) {
                    if (!e || e.parent()[0] != this.list[0]) return;
                    if ("" == e.find("span:eq(2)").text()) i = e.find("a:eq(0)").text() + " " + e.find("a:eq(1)").text(); else i = e.find("a:eq(0)").text() + " " + e.find("a:eq(1)").text() + "_" + e.find("span:eq(2)").text();
                    this.selectByText(i, t)
                } else {
                    if (!e || e.parent()[0] != this.list[0]) return;
                    var i = e.text();
                    this.selectByText(i, t)
                }
            }, _setSelected: function (e, t) {
                var i = this.opts, e = parseInt(e), t = void 0 === t || !!t;
                if (!isNaN(e)) if (this.formattedData && 0 != this.formattedData.length) {
                    var n = this.formattedData.length;
                    if ((e < -1 || e >= n) && (e = -1), this._selectedIndex != e) {
                        var a = -1 == e ? null : this.formattedData[e], o = -1 == e ? null : a.rawData,
                            s = -1 == e ? "" : a.text;
                        this.list.find("." + i.listItemCls);
                        t && "function" == typeof this.beforeChange && !this.beforeChange(o) || (i.editable && -1 == e && this.focus || this.input.val(s), this._selectedIndex = e, t && "function" == typeof this.onChange && this.onChange(o), this.originSelect && (this.originSelect[0].selectedIndex = e))
                    }
                } else this._selectedIndex = -1
            }, removeSelected: function (e) {
                this.input.val(""), this._setSelected(-1, e)
            }, _triggerCallback: function (e, t) {
            }, _getDataFromSelect: function () {
                var t = this.opts, i = [];
                return e.each(this.originSelect.find("option"), function (n) {
                    var a = e(this), o = {};
                    o[t.text] = a.text(), o[t.value] = a.attr("value"), i.push(o)
                }), i
            }, _formatData: function () {
                if (e.isArray(this.rawData)) {
                    var t = this, i = t.opts;
                    t.formattedData = [], i.emptyOptions && t.formattedData.push({
                        text: "(空)",
                        value: 0
                    }), i.addOptions && t.formattedData.push(i.addOptions), e.each(this.rawData, function (n, a) {
                        var o = {};
                        o.text = e.isFunction(i.formatText) ? i.formatText(a) : a[i.text], o.value = e.isFunction(i.formatValue) ? i.formatValue(a) : a[i.value], o.rawData = a, t.formattedData.push(o)
                    }), t.formattedLen = t.formattedData.length
                }
            }, _filter: function (t) {
                t = void 0 === t ? "" : t, this.input.val() != this.getText() && this.selectByText(this.input.val());
                var i = this.opts, n = this;
                i.maxFilter;
                if (this.opts.cache || ("local" == this.mode && e.isFunction(this.dataOpt) && (this.rawData = this.dataOpt()), this._formatData()), e.isArray(this.formattedData)) {
                    if ("" == t) i.editable ? this.filterData = this.formattedData.slice(0, i.maxFilter) : this.filterData = this.formattedData; else {
                        this.filterData = [];
                        var a = [];
                        e.each(n.formattedData, function (o, s) {
                            var r = s.text;
                            if (e.isFunction(i.customMatch)) {
                                if (!i.customMatch(s, t)) return
                            } else {
                                var l = i.caseSensitive ? "" : "i",
                                    d = new RegExp(t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), l);
                                if (-1 == r.search(d)) return
                            }
                            if (n.filterData.push(s), a.push({
                                    i: o,
                                    val: s.value
                                }), n.filterData.length == i.maxFilter) return !1
                        })
                    }
                    for (var o = {}, s = [], r = 0, l = this.filterData.length; r < l; r++) {
                        var d = this.filterData[r];
                        o[d.value] || (o[d.value] = !0, s.push(d))
                    }
                    this.filterData = s, s = [], o = {}, e.isFunction(this.incrementalSearch) && 100 === n.formattedLen && n.filterData.length < i.maxFilter ? !0 === n.addQuery && this.incrementalSearch(a, function () {
                        this._formatData(), this.filterData = this.formattedData, this.lastQuery = t, this.list.empty(), this._populateList(this.filterData), this.expand()
                    }) : (this.lastQuery = t, this.list.empty(), this._populateList(this.filterData), this.expand())
                }
            }, doDelayQuery: function (e) {
                var t = this, i = t.opts, n = parseInt(i.queryDelay);
                isNaN(n) && (n = 0), t.queryDelay && window.clearTimeout(t.queryDelay), t.queryDelay = window.setTimeout(function () {
                    t.doQuery(e)
                }, n)
            }, doQuery: function (e) {
                "local" == this.mode || "remote" == this.mode && this.opts.loadOnce ? this._filter(e) : this._loadAjaxData("", !1, e)
            },
            _populateList: function (t) {
                if (t) {
                    var i = this, n = i.opts;
                    if (0 == t.length) n.forceSelection && (e("<div />").addClass(n.tipsCls).html(n.noDataText).appendTo(i.list), this._setListLayout()); else {
                        if (n.forGoodsCombo) if (Public.getDefaultPage().SYSTEM.enableAssistingProp) for (var a = -1, o = t.length; a < o; a++) {
                            var s = "";
                            if (-1 == a) {
                                var r = '<span style="width: 150px;text-align:center">商品编号</span><span style="width: 290px;text-align:center">商品名称</span><span style="width: 200px;text-align:center">规格型号</span><span style="width: 100px;text-align:center">辅助属性</span><span style="width: 60px;text-align:center">基本单位</span>',
                                    l = e("<div />").attr({class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : "")}).css({
                                        "border-bottom": "1px solid #ccc",
                                        "border-right": "1px solid #ccc",
                                        "border-left": "1px solid #ccc",
                                        padding: "0px",
                                        "line-height": "0px"
                                    });
                                n.disStrict, l.html(r).appendTo(i.list)
                            } else {
                                var d = (m = t[a].rawData).number || "", c = m.name || "", h = m.spec || "",
                                    u = m.unitName || "";
                                m.remark;
                                if (m.invSkus && m.invSkus.length > 0) for (var p = m.invSkus, f = 0; f < p.length; f++) {
                                    m.invSkus[f].skuName && (s = p[f].skuName);
                                    var r = "<p onclick=invorderFun(" + f + ')><span style="width: 150px"><a title="' + d + '">' + d + '</a></span><span style="width: 290px"><a title="' + c + '">' + c + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 100px" invorder="' + f + '" class="skustring">' + (s || " ") + '</span><span style="width: 60px;border-right:0px">' + u + "</span></p>",
                                        g = (b = m).text, v = b.value, l = e("<div />").attr({
                                            class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : ""),
                                            "data-value": v
                                        }).css({
                                            "border-bottom": "1px solid #ccc",
                                            "border-right": "1px solid #ccc",
                                            "border-left": "1px solid #ccc",
                                            padding: "0px",
                                            "line-height": "0px"
                                        });
                                    n.disStrict, l.html(r).appendTo(i.list), 0 == a && 0 == f && l.addClass("on")
                                } else {
                                    var r = '<p><span style="width: 150px"><a title="' + d + '">' + d + '</a></span><span style="width: 290px"><a title="' + c + '">' + c + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 100px">' + (s || " ") + '</span><span style="width: 60px;border-right:0px">' + u + "</span></p>",
                                        g = (b = m).text, v = b.value, l = e("<div />").attr({
                                            class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : ""),
                                            "data-value": v
                                        }).css({
                                            "border-bottom": "1px solid #ccc",
                                            "border-right": "1px solid #ccc",
                                            "border-left": "1px solid #ccc",
                                            padding: "0px",
                                            "line-height": "0px"
                                        });
                                    n.disStrict, l.html(r).appendTo(i.list), 0 == a && l.addClass("on")
                                }
                            }
                        } else for (var a = -1, o = t.length; a < o; a++) if (-1 == a) {
                            var r = '<span style="width: 200px;text-align:center">商品编号</span><span style="width: 320px;text-align:center">商品名称</span><span style="width: 200px;text-align:center">规格型号</span><span style="width: 70px;text-align:center;border-right:0px">基本单位</span>',
                                l = e("<div />").attr({class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : "")}).css({
                                    "border-bottom": "1px solid #ccc",
                                    "border-right": "1px solid #ccc",
                                    "border-left": "1px solid #ccc",
                                    padding: "0px",
                                    "line-height": "0px"
                                });
                            n.disStrict, l.html(r).appendTo(i.list), 0 == a && l.addClass("on")
                        } else {
                            var m = t[a].rawData, d = m.number || "", c = m.name || "", h = m.spec || "",
                                u = m.unitName || "",
                                r = (m.remark, '<p><span style="width: 200px"><a title="' + d + '">' + d + '</a></span><span style="width: 320px"><a title="' + c + '">' + c + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 70px;border-right:0px">' + u + "</span></p>"),
                                g = (b = m).text, v = b.value, l = e("<div />").attr({
                                    class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : ""),
                                    "data-value": v
                                }).css({
                                    "border-bottom": "1px solid #ccc",
                                    "border-right": "1px solid #ccc",
                                    "border-left": "1px solid #ccc",
                                    padding: "0px",
                                    "line-height": "0px"
                                });
                            n.disStrict, l.html(r).appendTo(i.list), 0 == a && l.addClass("on")
                        } else for (var a = 0, o = t.length; a < o; a++) {
                            var b = t[a], g = b.text, v = b.value, l = e("<div />").attr({
                                class: n.listItemCls + (a == this._selectedIndex ? " " + n.selectedCls : ""),
                                "data-value": v
                            });
                            n.disStrict ? l.html(g).appendTo(i.list) : l.text(g).appendTo(i.list)
                        }
                        this._setListLayout()
                    }
                }
            },
            expand: function () {
                var t = this.opts;
                if (this.active && !this.isExpanded && (0 != this.filterData.length || t.noDataText || t.extraListHtmlCls)) {
                    this.isExpanded = !0, this.listWrap.show(), this._setListPosition(), e.isFunction(this.onExpand) && this.onExpand();
                    var i = this.list.find("." + t.listItemCls);
                    if (0 != i.length) {
                        var n = i.filter("." + t.selectedCls);
                        0 == n.length && (n = i.eq(0), t.autoSelectFirst && n.addClass(t.hoverCls)), this._scrollToItem(n)
                    }
                } else this.listWrap.hide()
            }, collapse: function () {
                if (this.isExpanded) {
                    var t = this.opts;
                    this.listWrap.hide(), this.isExpanded = !1, this.listItems && this.listItems.removeClass(t.hoverCls), e.isFunction(this.onCollapse) && this.onCollapse()
                }
            }, _onTriggerClick: function () {
                this._disabled || (this.active = !0, this.input.focus(), this.isExpanded ? this.collapse() : this._filter())
            }, _scrollToItem: function (e) {
                if (e && 0 != e.length) {
                    var t = this.list.scrollTop(), i = t + e.position().top, n = t + this.list.height(),
                        a = i + e.outerHeight();
                    (i < t || a > n) && this.list.scrollTop(i)
                }
            }, _scrollPage: function (e) {
                var t, i = this.list.scrollTop(), n = this.list.height();
                "up" == e ? t = i - n : "down" == e && (t = i + n), this.list.scrollTop(t)
            }, _setItemFocus: function (e) {
                var t, i, n = this.opts, a = this.list.find("." + n.listItemCls);
                if (0 != a.length) {
                    var o = a.filter("." + n.hoverCls).eq(0);
                    0 == o.length && (o = a.filter("." + n.selectedCls).eq(0)), 0 == o.length ? t = 0 : (t = a.index(o), t = "next" == e ? t == a.length - 1 ? 0 : t + 1 : 0 == t ? a.length - 1 : t - 1), i = a.eq(t), a.removeClass(n.hoverCls), i.addClass(n.hoverCls), this._scrollToItem(i)
                }
            }, empty: function (e) {
                this._setSelected(-1, !1), this.input.val(""), this.list.empty(), this.rawData = null, this.formattedData = null
            }, setEdit: function () {
            }
        },
        e.Combo.defaults = {
        data: null,
        text: "text",
        value: "value",
        formatText: null,
        formatValue: null,
        defaultSelected: void 0,
        defaultFlag: !0,
        autoSelect: !0,
        disabled: void 0,
        editable: !1,
        caseSensitive: !1,
        forceSelection: !0,
        cache: !0,
        queryDelay: 100,
        maxFilter: 200,
        minChars: 0,
        customMatch: null,
        addQuery: "",
        noDataText: "没有匹配的选项",
        autoSelectFirst: !0,
        width: void 0,
        minWidth: void 0,
        maxWidth: void 0,
        listWidth: void 0,
        listHeight: 150,
        maxListWidth: void 0,
        maxListWidth: void 0,
        zIndex: 1e3,
        listRenderToBody: !0,
        extraListHtml: void 0,
        disStrict: !1,
        ajaxOptions: {
            type: "post",
            dataType: "json",
            data: null,
            queryParam: "query",
            timeout: 1e4,
            formatData: null,
            loadingText: "Loading...",
            success: null,
            error: null,
            errorText: "数据加载失败"
        },
        loadOnce: !0,
        id: void 0,
        listId: void 0,
        wrapCls: "ui-combo-wrap",
        focusCls: "ui-combo-focus",
        disabledCls: "ui-combo-disabled",
        activeCls: "ui-combo-active",
        inputCls: "input-txt",
        triggerCls: "trigger",
        listWrapCls: "ui-droplist-wrap",
        listCls: "droplist",
        listItemCls: "list-item",
        selectedCls: "selected",
        hoverCls: "on",
        loadingCls: "loading",
        tipsCls: "tips",
        extraListHtmlCls: "extra-list-ctn",
        callback: {
            onFocus: null,
            onBlur: null,
            beforeChange: null,
            onChange: null,
            onExpand: null,
            onCollapse: null,
            onEnter: null,
            onListClick: null
        }
    }
}(jQuery),