function FastClick(a) {
    "use strict";
    var b, c = this;
    if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = a, !a || !a.nodeType) throw new TypeError("Layer must be a document node");
    this.onClick = function() {
        return FastClick.prototype.onClick.apply(c, arguments)
    }, this.onMouse = function() {
        return FastClick.prototype.onMouse.apply(c, arguments)
    }, this.onTouchStart = function() {
        return FastClick.prototype.onTouchStart.apply(c, arguments)
    }, this.onTouchMove = function() {
        return FastClick.prototype.onTouchMove.apply(c, arguments)
    }, this.onTouchEnd = function() {
        return FastClick.prototype.onTouchEnd.apply(c, arguments)
    }, this.onTouchCancel = function() {
        return FastClick.prototype.onTouchCancel.apply(c, arguments)
    }, FastClick.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, c, d) {
        var e = Node.prototype.removeEventListener;
        "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d)
    }, a.addEventListener = function(b, c, d) {
        var e = Node.prototype.addEventListener;
        "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function(a) {
            a.propagationStopped || c(a)
        }), d) : e.call(a, b, c, d)
    }), "function" == typeof a.onclick && (b = a.onclick, a.addEventListener("click", function(a) {
        b(a)
    }, !1), a.onclick = null))
}
(function() {
    String.prototype.endsWith || (String.prototype.endsWith = function(a) {
        return -1 !== this.indexOf(a, this.length - a.length)
    }), String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
        var c, d, e;
        if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
        for (d = this.length >>> 0, b = +b || 0, 1 / 0 === Math.abs(b) && (b = 0), 0 > b && (b += d, 0 > b && (b = 0)), c = e = b; d >= b ? d > e : e > d; c = d >= b ? ++e : --e)
            if (this[c] === a) return c;
        return -1
    }), Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b, c, d, e;
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        return b = Array.prototype.slice.call(arguments, 1), e = this, d = function() {}, c = function() {
            return e.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        }, d.prototype = this.prototype, c.prototype = new d, c
    }), Object.keys || (Object.keys = function() {
        "use strict";
        var a, b, c;
        return c = Object.prototype.hasOwnProperty, b = {
                "toString": null
            }.propertyIsEnumerable("toString") ? !1 : !0, a = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            function(d) {
                var e, f, g, h, i, j, k;
                if ("object" != typeof d && ("function" != typeof d || null === d)) throw new TypeError("Object.keys called on non-object");
                for (g = [], h = 0, j = d.length; j > h; h++) f = d[h], c.call(d, f) && g.push(f);
                if (b)
                    for (i = 0, k = a.length; k > i; i++) e = a[i], c.call(d, e) && g.push(e);
                return g
            }
    }.call(this)), window.getScreenSize = function(a, b) {
        return a.is(":visible") ? "small" : b.is(":visible") ? "tablet" : "desktop"
    }, window.elHasClass = function(a, b) {
        return (" " + a.className + " ").indexOf(" " + b + " ") > -1
    }, window.elRemoveClass = function(a, b) {
        return a.className = (" " + a.className + " ").replace(" " + b + " ", " ").trim()
    }
}).call(this),
    function() {
        var a, b;
        b = {
            "is_mobile": !1,
            "resize_delay": 400,
            "stored_values_prefix": "pa_",
            "main_menu": {
                "accordion": !0,
                "animation_speed": 250,
                "store_state": !0,
                "store_state_key": "mmstate",
                "disable_animation_on": [],
                "dropdown_close_delay": 300,
                "detect_active": !0,
                "detect_active_predicate": function(a, b) {
                    return a === b
                }
            },
            "consts": {
                "COLORS": ["#71c73e", "#77b7c5", "#d54848", "#6c42e5", "#e8e64e", "#dd56e6", "#ecad3f", "#618b9d", "#b68b68", "#36a766", "#3156be", "#00b3ff", "#646464", "#a946e8", "#9d9d9d"]
            }
        }, a = function() {
            return this.init = [], this.plugins = {}, this.settings = {}, this.localStorageSupported = "undefined" != typeof window.Storage ? !0 : !1, this
        }, a.prototype.start = function(a, c) {
            return null == a && (a = []), null == c && (c = {}), window.onload = function(d) {
                return function() {
                    var e, f, g, h;
                    for ($("html").addClass("pxajs"), a.length > 0 && $.merge(d.init, a), d.settings = $.extend(!0, {}, b, c || {}), d.settings.is_mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()), d.settings.is_mobile && FastClick && FastClick.attach(document.body), h = d.init, f = 0, g = h.length; g > f; f++) e = h[f], $.proxy(e, d)();
                    return $(window).trigger("pa.loaded"), $(window).resize()
                }
            }(this), this
        }, a.prototype.addInitializer = function(a) {
            return this.init.push(a)
        }, a.prototype.initPlugin = function(a, b) {
            return this.plugins[a] = b, b.init ? b.init() : void 0
        }, a.prototype.storeValue = function(a, b, c) {
            var d;
            if (null == c && (c = !1), this.localStorageSupported && !c) try {
                return void window.localStorage.setItem(this.settings.stored_values_prefix + a, b)
            } catch (e) {
                d = e
            }
            return document.cookie = this.settings.stored_values_prefix + a + "=" + escape(b)
        },  a.prototype.getStoredValue = function(a, b, c) {
            var d, e, f, g, h, i, j, k, l;
            if (null == b && (b = !1), null == c && (c = null), this.localStorageSupported && !b) try {
                return i = window.localStorage.getItem(this.settings.stored_values_prefix + a), i ? i : c
            } catch (m) {
                f = m
            }
            for (e = document.cookie.split(";"), k = 0, l = e.length; l > k; k++)
                if (d = e[k], h = d.indexOf("="), g = d.substr(0, h).replace(/^\s+|\s+$/g, ""), j = d.substr(h + 1).replace(/^\s+|\s+$/g, ""), g === this.settings.stored_values_prefix + a) return j;
            return c
        },  a.Constructor = a, window.adminMenu = new a
    }.call(this),
    function() {
        var a;
        a = function(a) {
            var b;
            return b = null,
                function() {
                    return b && clearTimeout(b), b = setTimeout(function() {
                        return b = null, a.call(this)
                    }, adminMenu.settings.resize_delay)
                }
        }, adminMenu.addInitializer(function() {
            var b, c, d, e;
            return e = null, d = $(window), b = $('<div id="small-screen-width-point" style="position:absolute;top:-10000px;width:10px;height:10px;background:#fff;"></div>'), c = $('<div id="tablet-screen-width-point" style="position:absolute;top:-10000px;width:10px;height:10px;background:#fff;"></div>'), $("body").append(b).append(c), d.on("resize", a(function() {
                return d.trigger("pa.resize"), b.is(":visible") ? ("small" !== e && d.trigger("pa.screen.small"), e = "small") : c.is(":visible") ? ("tablet" !== e && d.trigger("pa.screen.tablet"), e = "tablet") : ("desktop" !== e && d.trigger("pa.screen.desktop"), e = "desktop")
            }))
        })
    }.call(this),
    
   
   
    function() {
        adminMenu.MainNavbar = function() {
            return this._scroller = !1, this._wheight = null, this.scroll_pos = 0, this
        }, adminMenu.MainNavbar.prototype.init = function() {
            var a;
            return this.$navbar = $("#main-navbar"), this.$header = this.$navbar.find(".navbar-header"), this.$toggle = this.$navbar.find(".navbar-toggle:first"), this.$collapse = $("#main-navbar-collapse"), this.$collapse_div = this.$collapse.find("> div"), a = !1, $(window).on("pa.screen.small pa.screen.tablet", function(b) {
                return function() {
                    return "fixed" === b.$navbar.css("position") && b._setupScroller(), a = !0
                }
            }(this)).on("pa.screen.desktop", function(b) {
                return function() {
                    return b._removeScroller(), a = !1
                }
            }(this)), this.$navbar.on("click", ".nav-icon-btn.dropdown > .dropdown-toggle", function(b) {
                return a ? (b.preventDefault(), b.stopPropagation(), document.location.href = $(this).attr("href"), !1) : void 0
            })
        }, adminMenu.MainNavbar.prototype._setupScroller = function() {
            return this._scroller ? void 0 : (this._scroller = !0, this.$collapse_div.adminSlimScroll({}), this.$navbar.on("shown.bs.collapse.mn_collapse", $.proxy(function(a) {
                return function() {
                    return a._updateCollapseHeight(), a._watchWindowHeight()
                }
            }(this), this)).on("hidden.bs.collapse.mn_collapse", $.proxy(function(a) {
                return function() {
                    return a._wheight = null, a.$collapse_div.adminSlimScroll({
                        "scrollTo": "0px"
                    })
                }
            }(this), this)).on("shown.bs.dropdown.mn_collapse", $.proxy(this._updateCollapseHeight, this)).on("hidden.bs.dropdown.mn_collapse", $.proxy(this._updateCollapseHeight, this)), this._updateCollapseHeight())
        }, adminMenu.MainNavbar.prototype._removeScroller = function() {
            return this._scroller ? (this._wheight = null, this._scroller = !1, this.$collapse_div.adminSlimScroll({
                "destroy": "destroy"
            }), this.$navbar.off("shown.bs.collapse.mn_collapse"), this.$navbar.off("hidden.bs.collapse.mn_collapse"), this.$navbar.off("shown.bs.dropdown.mn_collapse"), this.$navbar.off("hidden.bs.dropdown.mn_collapse"), this.$collapse.attr("style", "")) : void 0
        }, adminMenu.MainNavbar.prototype._updateCollapseHeight = function() {
            var a, b, c;
            if (this._scroller) return c = $(window).innerHeight(), a = this.$header.outerHeight(), b = this.$collapse_div.scrollTop(), this.$collapse_div.css(a + this.$collapse_div.css({
                "max-height": "none"
            }).outerHeight() > c ? {
                "max-height": c - a
            } : {
                "max-height": "none"
            }), this.$collapse_div.adminSlimScroll({
                "scrollTo": b + "px"
            })
        }, adminMenu.MainNavbar.prototype._watchWindowHeight = function() {
            var a;
            return this._wheight = $(window).innerHeight(), a = function(b) {
                return function() {
                    return null !== b._wheight ? (b._wheight !== $(window).innerHeight() && b._updateCollapseHeight(), b._wheight = $(window).innerHeight(), setTimeout(a, 100)) : void 0
                }
            }(this), window.setTimeout(a, 100)
        }, adminMenu.MainNavbar.Constructor = adminMenu.MainNavbar, adminMenu.addInitializer(function() {
            return adminMenu.initPlugin("main_navbar", new adminMenu.MainNavbar)
        })
    }.call(this),
    function() {
        adminMenu.MainMenu = function() {
            return this._screen = null, this._last_screen = null, this._animate = !1, this._close_timer = null, this._dropdown_li = null, this._dropdown = null, this
        }, adminMenu.MainMenu.prototype.init = function() {
            var a, b;
            return this.$menu = $("#main-menu"), this.$menu.length ? (this.$body = $("body"), this.menu = this.$menu[0], this.$ssw_point = $("#small-screen-width-point"), this.$tsw_point = $("#tablet-screen-width-point"), a = this, adminMenu.settings.main_menu.store_state && (b = this._getMenuState(), document.body.className += " disable-mm-animation", null !== b && this.$body["collapsed" === b ? "addClass" : "removeClass"]("mmc"), setTimeout(function() {
                return function() {
                    return elRemoveClass(document.body, "disable-mm-animation")
                }
            }(this), 20)), this.setupAnimation(), $(window).on("resize.pa.mm", $.proxy(this.onResize, this)), this.onResize(), this.$menu.find(".navigation > .mm-dropdown").addClass("mm-dropdown-root"), adminMenu.settings.main_menu.detect_active && this.detectActiveItem(), $.support.transition && this.$menu.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", $.proxy(this._onAnimationEnd, this)), $("#main-menu-toggle").on("click", $.proxy(this.toggle, this)), $("#main-menu-inner").slimScroll({
                "height": "100%"
            }).on("slimscrolling", function(a) {
                return function() {
                    return a.closeCurrentDropdown(!0)
                }
            }(this)), this.$menu.on("click", ".mm-dropdown > a", function() {
                var b;
                return b = this.parentNode, elHasClass(b, "mm-dropdown-root") && a._collapsed() ? elHasClass(b, "mmc-dropdown-open") ? elHasClass(b, "freeze") ? a.closeCurrentDropdown(!0) : a.freezeDropdown(b) : a.openDropdown(b, !0) : a.toggleSubmenu(b), !1
            }), this.$menu.find(".navigation").on("mouseenter.pa.mm-dropdown", ".mm-dropdown-root", function() {
                return a.clearCloseTimer(), a._dropdown_li !== this ? !a._collapsed() || a._dropdown_li && elHasClass(a._dropdown_li, "freeze") ? void 0 : a.openDropdown(this) : void 0
            }).on("mouseleave.pa.mm-dropdown", ".mm-dropdown-root", function() {
                return a._close_timer = setTimeout(function() {
                    return a.closeCurrentDropdown()
                }, adminMenu.settings.main_menu.dropdown_close_delay)
            }), this) : void 0
        }, adminMenu.MainMenu.prototype._collapsed = function() {
            return "desktop" === this._screen && elHasClass(document.body, "mmc") || "desktop" !== this._screen && !elHasClass(document.body, "mme")
        }, adminMenu.MainMenu.prototype.onResize = function() {
            return this._screen = getScreenSize(this.$ssw_point, this.$tsw_point), this._animate = -1 === adminMenu.settings.main_menu.disable_animation_on.indexOf(screen), this._dropdown_li && this.closeCurrentDropdown(!0), ("small" === this._screen && this._last_screen !== this._screen || "tablet" === this._screen && "small" === this._last_screen) && (document.body.className += " disable-mm-animation", setTimeout(function() {
                return function() {
                    return elRemoveClass(document.body, "disable-mm-animation")
                }
            }(this), 20)), this._last_screen = this._screen
        }, adminMenu.MainMenu.prototype.clearCloseTimer = function() {
            return this._close_timer ? (clearTimeout(this._close_timer), this._close_timer = null) : void 0
        }, adminMenu.MainMenu.prototype._onAnimationEnd = function(a) {
            return "desktop" === this._screen && "main-menu" === a.target.id ? $(window).trigger("resize") : void 0
        }, adminMenu.MainMenu.prototype.toggle = function() {
            var a, b;
            return a = "small" === this._screen || "tablet" === this._screen ? "mme" : "mmc", elHasClass(document.body, a) ? elRemoveClass(document.body, a) : document.body.className += " " + a, "mmc" !== a ? (b = document.getElementById(""), $("#main-navbar-collapse").stop().removeClass("in collapsing").addClass("collapse")[0].style.height = "0px", $("#main-navbar .navbar-toggle").addClass("collapsed")) : (adminMenu.settings.main_menu.store_state && this._storeMenuState(elHasClass(document.body, "mmc")), $.support.transition ? void 0 : $(window).trigger("resize"))
        }, adminMenu.MainMenu.prototype.toggleSubmenu = function(a) {
            return this[elHasClass(a, "open") ? "collapseSubmenu" : "expandSubmenu"](a), !1
        }, adminMenu.MainMenu.prototype.collapseSubmenu = function(a) {
            var b, c;
            return b = $(a), c = b.find("> ul"), this._animate ? c.animate({
                "height": 0
            }, adminMenu.settings.main_menu.animation_speed, function() {
                return function() {
                    return elRemoveClass(a, "open"), c.attr("style", ""), b.find(".mm-dropdown.open").removeClass("open").find("> ul").attr("style", "")
                }
            }(this)) : elRemoveClass(a, "open"), !1
        }, adminMenu.MainMenu.prototype.expandSubmenu = function(a) {
            var b, c, d, e;
            return b = $(a), adminMenu.settings.main_menu.accordion && this.collapseAllSubmenus(a), this._animate ? (c = b.find("> ul"), e = c[0], e.className += " get-height", d = c.height(), elRemoveClass(e, "get-height"), e.style.display = "block", e.style.height = "0px", a.className += " open", c.animate({
                "height": d
            }, adminMenu.settings.main_menu.animation_speed, function() {
                return function() {
                    return c.attr("style", "")
                }
            }(this))) : a.className += " open"
        }, adminMenu.MainMenu.prototype.collapseAllSubmenus = function(a) {
            var b;
            return b = this, $(a).parent().find("> .mm-dropdown.open").each(function() {
                return b.collapseSubmenu(this)
            })
        }, adminMenu.MainMenu.prototype.openDropdown = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            return null == b && (b = !1), this._dropdown_li && this.closeCurrentDropdown(b), c = $(a), e = c.find("> ul"), k = e[0], this._dropdown_li = a, this._dropdown = k, d = e.find("> .mmc-title"), d.length || (d = $('<div class="mmc-title"></div>').text(c.find("> a > .mm-text").text()), k.insertBefore(d[0], k.firstChild)), a.className += " mmc-dropdown-open", k.className += " mmc-dropdown-open-ul", j = c.position().top, elHasClass(document.body, "main-menu-fixed") ? (f = e.find(".mmc-wrapper"), f.length || (m = document.createElement("div"), m.className = "mmc-wrapper", m.style.overflow = "hidden", m.style.position = "relative", f = $(m), f.append(e.find("> li")), k.appendChild(m)), l = $(window).innerHeight(), i = d.outerHeight(), h = i + 3 * e.find(".mmc-wrapper > li").first().outerHeight(), j + h > l ? (g = j - $("#main-navbar").outerHeight(), k.className += " top", k.style.bottom = l - j - i + "px") : (g = l - j - i, k.style.top = j + "px"), elHasClass(k, "top") ? k.appendChild(d[0]) : k.insertBefore(d[0], k.firstChild), a.className += " slimscroll-attached", f[0].style.maxHeight = g - 10 + "px", f.adminSlimScroll({})) : k.style.top = j + "px", b && this.freezeDropdown(a), b || e.on("mouseenter", function(a) {
                return function() {
                    return a.clearCloseTimer()
                }
            }(this)).on("mouseleave", function(a) {
                return function() {
                    return a._close_timer = setTimeout(function() {
                        return a.closeCurrentDropdown()
                    }, adminMenu.settings.main_menu.dropdown_close_delay)
                }
            }(this)), this.menu.appendChild(k)
        }, adminMenu.MainMenu.prototype.closeCurrentDropdown = function(a) {
            var b, c;
            return null == a && (a = !1), !this._dropdown_li || elHasClass(this._dropdown_li, "freeze") && !a ? void 0 : (this.clearCloseTimer(), b = $(this._dropdown), elHasClass(this._dropdown_li, "slimscroll-attached") && (elRemoveClass(this._dropdown_li, "slimscroll-attached"), c = b.find(".mmc-wrapper"), c.adminSlimScroll({
                "destroy": "destroy"
            }).find("> *").appendTo(b), c.remove()), this._dropdown_li.appendChild(this._dropdown), elRemoveClass(this._dropdown, "mmc-dropdown-open-ul"), elRemoveClass(this._dropdown, "top"), elRemoveClass(this._dropdown_li, "mmc-dropdown-open"), elRemoveClass(this._dropdown_li, "freeze"), $(this._dropdown_li).attr("style", ""), b.attr("style", "").off("mouseenter").off("mouseleave"), this._dropdown = null, this._dropdown_li = null)
        }, adminMenu.MainMenu.prototype.freezeDropdown = function(a) {
            return a.className += " freeze"
        }, adminMenu.MainMenu.prototype.setupAnimation = function() {
            var a, b, c, d;
            return c = document.body, d = adminMenu.settings.main_menu.disable_animation_on, c.className += " dont-animate-mm-content", a = $("#main-menu"), b = a.find(".navigation"), b.find("> .mm-dropdown > ul").addClass("mmc-dropdown-delay animated"), b.find("> li > a > .mm-text").addClass("mmc-dropdown-delay animated fadeIn"), a.find(".menu-content").addClass("animated fadeIn"), b.find("> .mm-dropdown > ul").addClass(elHasClass(c, "main-menu-right") || elHasClass(c, "right-to-left") && !elHasClass(c, "main-menu-right") ? "fadeInRight" : "fadeInLeft"), c.className += -1 === d.indexOf("small") ? " animate-mm-sm" : " dont-animate-mm-content-sm", c.className += -1 === d.indexOf("tablet") ? " animate-mm-md" : " dont-animate-mm-content-md", c.className += -1 === d.indexOf("desktop") ? " animate-mm-lg" : " dont-animate-mm-content-lg", window.setTimeout(function() {
                return elRemoveClass(c, "dont-animate-mm-content")
            }, 500)
        }, adminMenu.MainMenu.prototype.detectActiveItem = function() {
            var a, b, c, d, e, f, g, h, i;
            for (f = (document.location + "").replace(/\#.*?$/, ""), e = adminMenu.settings.main_menu.detect_active_predicate, d = $("#main-menu .navigation"), d.find("li").removeClass("open active"), c = d[0].getElementsByTagName("a"), b = function() {
                    return function(a) {
                        return a.className += " active", elHasClass(a.parentNode, "navigation") ? void 0 : (a = a.parentNode.parentNode, a.className += " open", b(a))
                    }
                }(this), i = [], g = 0, h = c.length; h > g; g++) {
                if (a = c[g], -1 === a.href.indexOf("#") && e(a.href, f)) {
                    b(a.parentNode);
                    break
                }
                i.push(void 0)
            }
            return i
        }, adminMenu.MainMenu.prototype._getMenuState = function() {
            return adminMenu.getStoredValue(adminMenu.settings.main_menu.store_state_key, null)
        }, adminMenu.MainMenu.prototype._storeMenuState = function(a) {
            return adminMenu.settings.main_menu.store_state ? adminMenu.storeValue(adminMenu.settings.main_menu.store_state_key, a ? "collapsed" : "expanded") : void 0
        }, adminMenu.MainMenu.Constructor = adminMenu.MainMenu, adminMenu.addInitializer(function() {
            return adminMenu.initPlugin("main_menu", new adminMenu.MainMenu)
        })
    }.call(this),
    function(a) {
        jQuery.fn.extend({
            "adminSlimScroll": function(b) {
                var c = {
                        "width": "auto",
                        "size": "2px",
                        "color": "#000",
                        "distance": "1px",
                        "start": "top",
                        "opacity": .4,
                        "railColor": "#333",
                        "railOpacity": .2,
                        "railClass": "slimScrollRail",
                        "barClass": "slimScrollBar",
                        "wrapperClass": "slimScrollDiv",
                        "allowPageScroll": !1,
                        "wheelStep": 20,
                        "touchScrollStep": 200,
                        "borderRadius": "0px",
                        "railBorderRadius": "0px"
                    },
                    d = a.extend(c, b);
                return this.each(function() {
                    function c(b) {
                        if (j) {
                            var b = b || window.event,
                                c = 0;
                            b.wheelDelta && (c = -b.wheelDelta / 120), b.detail && (c = b.detail / 3);
                            var f = b.target || b.srcTarget || b.srcElement;
                            a(f).closest("." + d.wrapperClass).is(v.parent()) && e(c, !0), b.preventDefault && !u && b.preventDefault(), u || (b.returnValue = !1)
                        }
                    }

                    function e(a, b, c) {
                        u = !1;
                        var e = a,
                            f = v.outerHeight() - z.outerHeight();
                        if (b && (e = parseInt(z.css("top")) + a * parseInt(d.wheelStep) / 100 * z.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), z.css({
                                "top": e + "px"
                            })), p = parseInt(z.css("top")) / (v.outerHeight() - z.outerHeight()), e = p * (v[0].scrollHeight - v.outerHeight()), c) {
                            e = a;
                            var g = e / v[0].scrollHeight * v.outerHeight();
                            g = Math.min(Math.max(g, 0), f), z.css({
                                "top": g + "px"
                            })
                        }
                        v.scrollTop(e), v.trigger("slimscrolling", ~~e), h(), i()
                    }

                    function f() {
                        window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1)) : document.attachEvent("onmousewheel", c)
                    }

                    function g() {
                        o = Math.max(v.outerHeight() / v[0].scrollHeight * v.outerHeight(), s), z.css({
                            "height": o + "px"
                        });
                        var a = o == v.outerHeight() ? "none" : "block";
                        z.css({
                            "display": a
                        })
                    }

                    function h() {
                        if (g(), clearTimeout(m), p == ~~p) {
                            if (u = d.allowPageScroll, q != p) {
                                var a = 0 == ~~p ? "top" : "bottom";
                                v.trigger("slimscroll", a)
                            }
                        } else u = !1;
                        return q = p, o >= v.outerHeight() ? void(u = !0) : void z.stop(!0, !0).fadeIn("fast")
                    }

                    function i() {}
                    var j, k, l, m, n, o, p, q, r = "<div></div>",
                        s = 30,
                        u = !1,
                        v = a(this);
                    if (v.parent().hasClass(d.wrapperClass)) {
                        var w = v.scrollTop();
                        if (z = v.parent().find("." + d.barClass), y = v.parent().find("." + d.railClass), g(), a.isPlainObject(b)) {
                            if ("scrollTo" in b) w = parseInt(d.scrollTo);
                            else if ("scrollBy" in b) w += parseInt(d.scrollBy);
                            else if ("destroy" in b) return z.remove(), y.remove(), void v.unwrap();
                            e(w, !1, !0)
                        }
                    } else {
                        var x = a(r).addClass(d.wrapperClass).css({
                            "position": "relative",
                            "overflow": "hidden",
                            "width": d.width
                        });
                        v.css({
                            "overflow": "hidden",
                            "width": d.width
                        });
                        var y = a(r).addClass(d.railClass).css({
                                "width": d.size,
                                "height": "100%",
                                "position": "absolute",
                                "top": 0,
                                "display": "none",
                                "border-radius": d.railBorderRadius,
                                "background": d.railColor,
                                "opacity": d.railOpacity,
                                "zIndex": 90
                            }),
                            z = a(r).addClass(d.barClass).css({
                                "background": d.color,
                                "width": d.size,
                                "position": "absolute",
                                "top": 0,
                                "opacity": d.opacity,
                                "display": "block",
                                "border-radius": d.borderRadius,
                                "BorderRadius": d.borderRadius,
                                "MozBorderRadius": d.borderRadius,
                                "WebkitBorderRadius": d.borderRadius,
                                "zIndex": 99
                            });
                        y.css({
                            "right": d.distance
                        }), z.css({
                            "right": d.distance
                        }), v.wrap(x), v.parent().append(z), v.parent().append(y), z.bind("mousedown", function(b) {
                            var c = a(document);
                            return l = !0, t = parseFloat(z.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                                currTop = t + a.pageY - pageY, z.css("top", currTop), e(0, z.position().top, !1)
                            }), c.bind("mouseup.slimscroll", function() {
                                l = !1, i(), c.unbind(".slimscroll")
                            }), !1
                        }).bind("selectstart.slimscroll", function(a) {
                            return a.stopPropagation(), a.preventDefault(), !1
                        }), y.hover(function() {
                            h()
                        }, function() {
                            i()
                        }), z.hover(function() {
                            k = !0
                        }, function() {
                            k = !1
                        }), v.hover(function() {
                            j = !0, h(), i()
                        }, function() {
                            j = !1, i()
                        }), v.bind("touchstart", function(a) {
                            a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                        }), v.bind("touchmove", function(a) {
                            if (u || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                                var b = (n - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
                                e(b, !0), n = a.originalEvent.touches[0].pageY
                            }
                        }), g(), f()
                    }
                }), this
            }
        }), jQuery.fn.extend({
            "adminSlimScroll": jQuery.fn.adminSlimScroll
        })
    }(jQuery),
    
   
    function(a) {
        jQuery.fn.extend({
            "slimScroll": function(b) {
                var c = {
                        "width": "auto",
                        "height": "250px",
                        "size": "7px",
                        "color": "#000",
                        "position": "right",
                        "distance": "1px",
                        "start": "top",
                        "opacity": .4,
                        "alwaysVisible": !1,
                        "disableFadeOut": !1,
                        "railVisible": !1,
                        "railColor": "#333",
                        "railOpacity": .2,
                        "railDraggable": !0,
                        "railClass": "slimScrollRail",
                        "barClass": "slimScrollBar",
                        "wrapperClass": "slimScrollDiv",
                        "allowPageScroll": !1,
                        "wheelStep": 20,
                        "touchScrollStep": 200,
                        "borderRadius": "7px",
                        "railBorderRadius": "7px"
                    },
                    d = a.extend(c, b);
                return this.each(function() {
                    function c(b) {
                        if (j) {
                            var b = b || window.event,
                                c = 0;
                            b.wheelDelta && (c = -b.wheelDelta / 120), b.detail && (c = b.detail / 3);
                            var f = b.target || b.srcTarget || b.srcElement;
                            a(f).closest("." + d.wrapperClass).is(v.parent()) && e(c, !0), b.preventDefault && !u && b.preventDefault(), u || (b.returnValue = !1)
                        }
                    }

                    function e(a, b, c) {
                        u = !1;
                        var e = a,
                            f = v.outerHeight() - A.outerHeight();
                        if (b && (e = parseInt(A.css("top")) + a * parseInt(d.wheelStep) / 100 * A.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), A.css({
                                "top": e + "px"
                            })), p = parseInt(A.css("top")) / (v.outerHeight() - A.outerHeight()), e = p * (v[0].scrollHeight - v.outerHeight()), c) {
                            e = a;
                            var g = e / v[0].scrollHeight * v.outerHeight();
                            g = Math.min(Math.max(g, 0), f), A.css({
                                "top": g + "px"
                            })
                        }
                        v.scrollTop(e), v.trigger("slimscrolling", ~~e), h(), i()
                    }

                    function f() {
                        window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1)) : document.attachEvent("onmousewheel", c)
                    }

                    function g() {
                        o = Math.max(v.outerHeight() / v[0].scrollHeight * v.outerHeight(), s), A.css({
                            "height": o + "px"
                        });
                        var a = o == v.outerHeight() ? "none" : "block";
                        A.css({
                            "display": a
                        })
                    }

                    function h() {
                        if (g(), clearTimeout(m), p == ~~p) {
                            if (u = d.allowPageScroll, q != p) {
                                var a = 0 == ~~p ? "top" : "bottom";
                                v.trigger("slimscroll", a)
                            }
                        } else u = !1;
                        return q = p, o >= v.outerHeight() ? void(u = !0) : (A.stop(!0, !0).fadeIn("fast"), void(d.railVisible && z.stop(!0, !0).fadeIn("fast")))
                    }

                    function i() {
                        d.alwaysVisible || (m = setTimeout(function() {
                            d.disableFadeOut && j || k || l || (A.fadeOut("slow"), z.fadeOut("slow"))
                        }, 1e3))
                    }
                    var j, k, l, m, n, o, p, q, r = "<div></div>",
                        s = 30,
                        u = !1,
                        v = a(this);
                    if (v.parent().hasClass(d.wrapperClass)) {
                        var w = v.scrollTop();
                        if (A = v.parent().find("." + d.barClass), z = v.parent().find("." + d.railClass), g(), a.isPlainObject(b)) {
                            if ("height" in b && "auto" == b.height) {
                                v.parent().css("height", "auto"), v.css("height", "auto");
                                var x = v.parent().parent().height();
                                v.parent().css("height", x), v.css("height", x)
                            }
                            if ("scrollTo" in b) w = parseInt(d.scrollTo);
                            else if ("scrollBy" in b) w += parseInt(d.scrollBy);
                            else if ("destroy" in b) return A.remove(), z.remove(), void v.unwrap();
                            e(w, !1, !0)
                        }
                    } else {
                        d.height = "auto" == b.height ? v.parent().height() : b.height;
                        var y = a(r).addClass(d.wrapperClass).css({
                            "position": "relative",
                            "overflow": "hidden",
                            "width": d.width,
                            "height": d.height
                        });
                        v.css({
                            "overflow": "hidden",
                            "width": d.width,
                            "height": d.height
                        });
                        var z = a(r).addClass(d.railClass).css({
                                "width": d.size,
                                "height": "100%",
                                "position": "absolute",
                                "top": 0,
                                "display": d.alwaysVisible && d.railVisible ? "block" : "none",
                                "border-radius": d.railBorderRadius,
                                "background": d.railColor,
                                "opacity": d.railOpacity,
                                "zIndex": 90
                            }),
                            A = a(r).addClass(d.barClass).css({
                                "background": d.color,
                                "width": d.size,
                                "position": "absolute",
                                "top": 0,
                                "opacity": d.opacity,
                                "display": d.alwaysVisible ? "block" : "none",
                                "border-radius": d.borderRadius,
                                "BorderRadius": d.borderRadius,
                                "MozBorderRadius": d.borderRadius,
                                "WebkitBorderRadius": d.borderRadius,
                                "zIndex": 99
                            }),
                            B = "right" == d.position ? {
                                "right": d.distance
                            } : {
                                "left": d.distance
                            };
                        z.css(B), A.css(B), v.wrap(y), v.parent().append(A), v.parent().append(z), d.railDraggable && A.bind("mousedown", function(b) {
                            var c = a(document);
                            return l = !0, t = parseFloat(A.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                                currTop = t + a.pageY - pageY, A.css("top", currTop), e(0, A.position().top, !1)
                            }), c.bind("mouseup.slimscroll", function() {
                                l = !1, i(), c.unbind(".slimscroll")
                            }), !1
                        }).bind("selectstart.slimscroll", function(a) {
                            return a.stopPropagation(), a.preventDefault(), !1
                        }), z.hover(function() {
                            h()
                        }, function() {
                            i()
                        }), A.hover(function() {
                            k = !0
                        }, function() {
                            k = !1
                        }), v.hover(function() {
                            j = !0, h(), i()
                        }, function() {
                            j = !1, i()
                        }), v.bind("touchstart", function(a) {
                            a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                        }), v.bind("touchmove", function(a) {
                            if (u || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                                var b = (n - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
                                e(b, !0), n = a.originalEvent.touches[0].pageY
                            }
                        }), g(), "bottom" === d.start ? (A.css({
                            "top": v.outerHeight() - A.outerHeight()
                        }), e(0, !0)) : "top" !== d.start && (e(a(d.start).position().top, null, !0), d.alwaysVisible || A.hide()), f()
                    }
                }), this
            }
        }), jQuery.fn.extend({
            "slimscroll": jQuery.fn.slimScroll
        })
    }(jQuery);