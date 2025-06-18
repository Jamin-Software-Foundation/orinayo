(window.webpackJsonp = window.webpackJsonp || []).push([
    [4], {
        510: function(t, e, r) {
            "use strict";
            var n = r(2),
                o = r(22),
                c = r(23),
                l = r(30),
                d = r(17),
                h = r(35),
                f = r(5),
                m = (r(10), r(15), r(41), r(13), r(19), r(14), r(4), r(68), r(16), r(62), r(59), r(1)),
                v = r(44),
                y = r(73),
                k = r(239);

            function _(t, e) {
                var r = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t);
                    e && (n = n.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function O() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (O = function() {
                    return !!t
                })()
            }
            var w = function(t, e, r, desc) {
                    var n, o = arguments.length,
                        c = o < 3 ? e : null === desc ? desc = Object.getOwnPropertyDescriptor(e, r) : desc;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : Object(f.a)(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, r, desc);
                    else
                        for (var i = t.length - 1; i >= 0; i--)(n = t[i]) && (c = (o < 3 ? n(c) : o > 3 ? n(e, r, c) : n(e, r)) || c);
                    return o > 3 && c && Object.defineProperty(e, r, c), c
                },
                x = function(t) {
                    function e() {
                        return Object(o.a)(this, e), t = this, r = e, n = arguments, r = Object(d.a)(r), Object(l.a)(t, O() ? Reflect.construct(r, n || [], Object(d.a)(t).constructor) : r.apply(t, n));
                        var t, r, n
                    }
                    return Object(h.a)(e, t), Object(c.a)(e, [{
                        key: "title",
                        get: function() {
                            return ""
                        }
                    }, {
                        key: "description",
                        get: function() {
                            return ""
                        }
                    }, {
                        key: "appbar",
                        get: function() {
                            return {}
                        }
                    }, {
                        key: "resetAppbar",
                        value: function() {
                            this.setAppbar({
                                title: "",
                                style: "",
                                show: !0,
                                back: !0,
                                home: !1,
                                dark: !0,
                                color: "#111"
                            })
                        }
                    }, {
                        key: "setLang",
                        value: function() {
                            var t = "en",
                                e = navigator.language;
                            e.includes("zh") ? t = e.includes("zh-TW") || e.includes("zh-HK") ? "zhTW" : "zh" : e.includes("es") ? t = "es" : e.includes("ja") ? t = "ja" : e.includes("de") && (t = "de"), this.$i18n.locale = t, document.title = this.title
                        }
                    }, {
                        key: "setPage",
                        value: function() {
                            this.setAppbar(function(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var r = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? _(Object(r), !0).forEach((function(e) {
                                        Object(n.a)(t, e, r[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : _(Object(r)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                                    }))
                                }
                                return t
                            }({
                                title: this.title
                            }, this.appbar)), setTimeout((function() {
                                Object(k.b)()
                            }), 50)
                        }
                    }, {
                        key: "beforeDestroy",
                        value: function() {
                            this.resetAppbar()
                        }
                    }])
                }(m.a);
            w([Object(y.a)("app/SET_APPBAR")], x.prototype, "setAppbar", void 0), x = w([Object(v.a)({
                head: function() {
                    return {
                        title: this.title,
                        meta: [{
                            hid: "theme-color",
                            name: "theme-color",
                            content: "#040C11"
                        }]
                    }
                },
                beforeRouteEnter: function(t, e, r) {
                    r((function(t) {
                        t.setLang(), t.setPage()
                    }))
                }
            })], x), e.a = x
        },
        521: function(t, e, r) {
            var content = r(585);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [t.i, content, ""]
            ]), content.locals && (t.exports = content.locals);
            (0, r(21).default)("015d88a7", content, !0, {
                sourceMap: !1
            })
        },
        522: function(t, e, r) {
            var content = r(587);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [t.i, content, ""]
            ]), content.locals && (t.exports = content.locals);
            (0, r(21).default)("411f58bc", content, !0, {
                sourceMap: !1
            })
        },
        584: function(t, e, r) {
            "use strict";
            r(521)
        },
        585: function(t, e, r) {
            var n = r(20)((function(i) {
                return i[1]
            }));
            n.push([t.i, ".user-card[data-v-22a8cfb5]{background:rgba(0,0,0,.3);border-radius:20px;box-shadow:0 0 20px rgba(0,0,0,.3);overflow:hidden;position:relative;width:100%}.user-card .top[data-v-22a8cfb5]{justify-content:space-between;left:0;position:absolute;right:0;top:0}.user-card .top .nickname[data-v-22a8cfb5]{word-break:break-all}.user-card .canvas-wrapper[data-v-22a8cfb5]{height:100px}.user-card .canvas-wrapper .canvas[data-v-22a8cfb5]{border-radius:20px;height:100%;width:100%}", ""]), n.locals = {}, t.exports = n
        },
        586: function(t, e, r) {
            "use strict";
            r(522)
        },
        587: function(t, e, r) {
            var n = r(20)((function(i) {
                return i[1]
            }));
            n.push([t.i, ".mute-all-btn[data-v-7612d705]{bottom:0;box-shadow:0 0 20px hsla(0,0%,100%,.08);margin:0 16px 68px 0;position:absolute}.cards[data-v-7612d705]{display:flex;flex-direction:row;flex-wrap:wrap}.hint-box[data-v-7612d705]{background:linear-gradient(-15deg,hsla(0,0%,100%,.12),hsla(0,0%,100%,.1));border-radius:20px;color:hsla(0,0%,100%,.7)}.hint-box.empty-hint[data-v-7612d705]{background:linear-gradient(-15deg,#90f,#0057fa)!important}.hint-box.error-hint[data-v-7612d705]{background:linear-gradient(-15deg,#ec5700,#be1d00)!important}", ""]), n.locals = {}, t.exports = n
        },
        591: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(504),
                o = r(227),
                c = r(186),
                l = r(589),
                d = r(506),
                h = r(225),
                f = r(592),
                m = (r(85), r(22)),
                v = r(23),
                y = r(30),
                k = r(17),
                _ = r(35),
                O = r(5),
                w = (r(33), r(41), r(61), r(45), r(158), r(36), r(13), r(4), r(68), r(62), r(82), r(59), r(44)),
                x = r(73),
                C = r(514),
                j = r(510),
                M = r(24),
                P = (r(84), r(10), r(51), r(16), r(198)),
                S = (r(25), r(52), {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    encode: function(input) {
                        var t, e, r, n, o, c, l, output = "",
                            i = 0;
                        for (input = S._utf8_encode(input); i < input.length;) n = (t = input.charCodeAt(i++)) >> 2, o = (3 & t) << 4 | (e = input.charCodeAt(i++)) >> 4, c = (15 & e) << 2 | (r = input.charCodeAt(i++)) >> 6, l = 63 & r, isNaN(e) ? c = l = 64 : isNaN(r) && (l = 64), output = output + this._keyStr.charAt(n) + this._keyStr.charAt(o) + this._keyStr.charAt(c) + this._keyStr.charAt(l);
                        return output
                    },
                    decode: function(input) {
                        var t, e, r, n, o, c, output = "",
                            i = 0;
                        for (input = input.replace(/[^A-Za-z0-9+/=]/g, ""); i < input.length;) t = this._keyStr.indexOf(input.charAt(i++)) << 2 | (n = this._keyStr.indexOf(input.charAt(i++))) >> 4, e = (15 & n) << 4 | (o = this._keyStr.indexOf(input.charAt(i++))) >> 2, r = (3 & o) << 6 | (c = this._keyStr.indexOf(input.charAt(i++))), output += String.fromCharCode(t), 64 !== o && (output += String.fromCharCode(e)), 64 !== c && (output += String.fromCharCode(r));
                        return output = S._utf8_decode(output)
                    },
                    _utf8_encode: function(t) {
                        var e = "";
                        t = t.replace(/\r\n/g, "\n");
                        for (var r = 0; r < t.length; r++) {
                            var n = t.charCodeAt(r);
                            n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
                        }
                        return e
                    },
                    _utf8_decode: function(t) {
                        var e, r, n, o = "",
                            i = 0;
                        for (e = r = 0; i < t.length;)(e = t.charCodeAt(i)) < 128 ? (o += String.fromCharCode(e), i++) : e > 191 && e < 224 ? (r = t.charCodeAt(i + 1), o += String.fromCharCode((31 & e) << 6 | 63 & r), i += 2) : (r = t.charCodeAt(i + 1), n = t.charCodeAt(i + 2), o += String.fromCharCode((15 & e) << 12 | (63 & r) << 6 | 63 & n), i += 3);
                        return o
                    }
                }),
                A = S,
                R = {
                    audio: !0,
                    video: !1
                },
                N = {
                    urls: "turn:35.235.85.40:443",
                    username: "webrtc",
                    credential: "turnpassword"
                },
                D = {
                    iceServers: [],
                    iceTransportPolicy: "relay",
                    bundlePolicy: "max-bundle",
                    rtcpMuxPolicy: "require",
                    sdpSemantics: "unified-plan"
                },
                T = new(window.AudioContext || window.webkitAudioContext),
                E = "",
                $ = "",
                U = "",
                F = "",
                I = "",
                z = function(t, e, r, n, o, c) {},
                B = function(t) {},
                W = function(t) {},
                J = function(t) {},
                L = null,
                H = !1;

            function K(t, e, r, n, o, c, l) {
                var d = r + ":" + A.encode(e);
                F = encodeURIComponent(t), I = encodeURIComponent(d), $ = r, z = n, B = o, J = c, W = l, U = e, H = !0, X()
            }

            function V(t, e) {
                return G.apply(this, arguments)
            }

            function G() {
                return (G = Object(M.a)(regeneratorRuntime.mark((function t(e, r) {
                    var n, o;
                    return regeneratorRuntime.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.prev = 1, t.next = 2, fetch("https://rpc.kraken.fm", {
                                    method: "POST",
                                    mode: "cors",
                                    cache: "no-cache",
                                    credentials: "omit",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    redirect: "follow",
                                    referrerPolicy: "no-referrer",
                                    body: JSON.stringify({
                                        id: Object(P.b)(),
                                        method: e,
                                        params: r
                                    })
                                });
                            case 2:
                                return n = t.sent, t.abrupt("return", n.json());
                            case 3:
                                return t.prev = 3, o = t.catch(1), console.log("fetch error", e, r, o), t.next = 4, V(e, r);
                            case 4:
                                return t.abrupt("return", t.sent);
                            case 5:
                                return t.prev = 5, t.finish(5);
                            case 6:
                            case "end":
                                return t.stop()
                        }
                    }), t, null, [
                        [1, 3, 5, 6]
                    ])
                })))).apply(this, arguments)
            }

            function Z(t) {
                return Q.apply(this, arguments)
            }

            function Q() {
                return (Q = Object(M.a)(regeneratorRuntime.mark((function t(e) {
                    var r, n;
                    return regeneratorRuntime.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 1, V("subscribe", [F, I, E]);
                            case 1:
                                if (!(r = t.sent).hasOwnProperty("error")) {
                                    t.next = 2;
                                    break
                                }
                                return console.log("try to reconnect", r.error.description), J && J(r.error).then((function() {
                                    H && (console.log("reconnect in 0.5s"), setTimeout(Object(M.a)(regeneratorRuntime.mark((function t() {
                                        return regeneratorRuntime.wrap((function(t) {
                                            for (;;) switch (t.prev = t.next) {
                                                case 0:
                                                    return e.close(), t.next = 1, X();
                                                case 1:
                                                case "end":
                                                    return t.stop()
                                            }
                                        }), t)
                                    }))), 500))
                                })), t.abrupt("return");
                            case 2:
                                if (!r.data || "offer" !== r.data.type) {
                                    t.next = 6;
                                    break
                                }
                                return console.log("subscribe offer", r.data), t.next = 3, e.setRemoteDescription(r.data);
                            case 3:
                                return t.next = 4, e.createAnswer();
                            case 4:
                                return n = t.sent, t.next = 5, e.setLocalDescription(n);
                            case 5:
                                return t.next = 6, V("answer", [F, I, E, JSON.stringify(n)]);
                            case 6:
                                setTimeout((function() {
                                    Z(e)
                                }), 3e3);
                            case 7:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }

            function X() {
                return Y.apply(this, arguments)
            }

            function Y() {
                return (Y = Object(M.a)(regeneratorRuntime.mark((function t() {
                    var e, r, n, source, o, c, l, d, h, f, m;
                    return regeneratorRuntime.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (H) {
                                    t.next = 1;
                                    break
                                }
                                return t.abrupt("return");
                            case 1:
                                return t.prev = 1, t.next = 2, V("turn", [$]);
                            case 2:
                                e = t.sent, D.iceServers = e.data, t.next = 4;
                                break;
                            case 3:
                                t.prev = 3, l = t.catch(1), console.log("failed to get server", l), D.iceServers = [N];
                            case 4:
                                return t.prev = 4, document.querySelectorAll(".peer").forEach((function(t) {
                                    return t.remove()
                                })), (L = new RTCPeerConnection(D)).createDataChannel("chat"), L.onicecandidate = function(t) {
                                    var e = t.candidate;
                                    V("trickle", [F, I, E, JSON.stringify(e)])
                                }, L.ontrack = function(t) {
                                    console.log("ontrack", t);
                                    var e = t.streams[0],
                                        r = decodeURIComponent(e.id),
                                        n = r.split(":")[0],
                                        o = r.split(":")[1];
                                    try {
                                        o = A.decode(o)
                                    } catch (t) {
                                        console.log("failed to decode name", o, t)
                                    }
                                    if (n !== $) {
                                        t.track.onmute = function(t) {
                                            if (B) {
                                                var e = t.target.id;
                                                console.log("onmute", e, t), B(e)
                                            }
                                        };
                                        var c = T.createAnalyser();
                                        if (c.fftSize = 256, c.minDecibels = -80, c.maxDecibels = -10, c.smoothingTimeConstant = .85, T.createMediaStreamSource(e).connect(c), z) {
                                            var l = t.track.id;
                                            z(L, e, c, l, n, o)
                                        }
                                    }
                                }, t.prev = 5, t.next = 6, navigator.mediaDevices.getUserMedia(R);
                            case 6:
                                r = t.sent, t.next = 8;
                                break;
                            case 7:
                                return t.prev = 7, d = t.catch(5), console.error(d), W && W(d), t.abrupt("return");
                            case 8:
                                return (n = T.createAnalyser()).fftSize = 256, n.minDecibels = -80, n.maxDecibels = -10, n.smoothingTimeConstant = .85, source = T.createMediaStreamSource(r), (o = T.createGain()).gain.value = .01, source.connect(n), n.connect(o), o.connect(T.destination), z && z(L, r, n, "me", $, U), T.resume(), r.getTracks().forEach((function(track) {
                                    L.addTrack(track, r)
                                })), h = L, t.next = 9, L.createOffer();
                            case 9:
                                return f = t.sent, t.next = 10, h.setLocalDescription.call(h, f);
                            case 10:
                                return t.next = 11, V("publish", [F, I, JSON.stringify(L.localDescription)]);
                            case 11:
                                if (c = t.sent, console.log(c), !c.data || "answer" !== c.data.sdp.type) {
                                    t.next = 13;
                                    break
                                }
                                return t.next = 12, L.setRemoteDescription(c.data.sdp);
                            case 12:
                                E = c.data.track, Z(L);
                            case 13:
                                t.next = 15;
                                break;
                            case 14:
                                t.prev = 14, m = t.catch(4), W && W(m);
                            case 15:
                            case "end":
                                return t.stop()
                        }
                    }), t, null, [
                        [1, 3],
                        [4, 14],
                        [5, 7]
                    ])
                })))).apply(this, arguments)
            }
            var tt = {
                onCopy: function(t) {
                    t.$toast({
                        message: t.$t("common.copy_succ_hint"),
                        color: "info"
                    })
                },
                onError: function(t) {}
            };
            r(542), r(547), r(548), r(550), r(558), r(560), r(561), r(562), r(564), r(565), r(566), r(567), r(568), r(569), r(570), r(571), r(573), r(574), r(575), r(576), r(577), r(578), r(579), r(580), r(581), r(582), r(583);

            function et() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (et = function() {
                    return !!t
                })()
            }
            var nt = function(t, e, r, desc) {
                    var n, o = arguments.length,
                        c = o < 3 ? e : null === desc ? desc = Object.getOwnPropertyDescriptor(e, r) : desc;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : Object(O.a)(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, r, desc);
                    else
                        for (var i = t.length - 1; i >= 0; i--)(n = t[i]) && (c = (o < 3 ? n(c) : o > 3 ? n(e, r, c) : n(e, r)) || c);
                    return o > 3 && c && Object.defineProperty(e, r, c), c
                },
                at = function(t) {
                    function e() {
                        return Object(m.a)(this, e), t = this, r = e, n = arguments, r = Object(k.a)(r), Object(y.a)(t, et() ? Reflect.construct(r, n || [], Object(k.a)(t).constructor) : r.apply(t, n));
                        var t, r, n
                    }
                    return Object(_.a)(e, t), Object(v.a)(e, [{
                        key: "mounted",
                        value: function() {
                            var t = this;
                            setTimeout((function() {
                                "me" !== t.user.trackId && (t.$refs.audio.srcObject = t.user.stream);
                                t.visualize(t.user.uid, t.user.analyser)
                            }), 200)
                        }
                    }, {
                        key: "editName",
                        value: function() {
                            this.$emit("edit-name", this.user)
                        }
                    }, {
                        key: "handleMutable",
                        value: function() {
                            this.user.isMuted ? this.$emit("unmute", this.user) : this.$emit("mute", this.user)
                        }
                    }, {
                        key: "visualize",
                        value: function(t, e) {
                            var canvas = this.$refs.canvas;
                            canvas.width = canvas.width * window.devicePixelRatio, canvas.height = canvas.height * window.devicePixelRatio;
                            var r = canvas.getContext("2d"),
                                n = e.frequencyBinCount,
                                o = new Float32Array(n),
                                c = Object(P.a)(t),
                                g = c[0],
                                b = c[1];
                            ! function t() {
                                var c = canvas.width,
                                    l = canvas.height;
                                e.getFloatFrequencyData(o), r.fillStyle = "rgb(0, 0, 0)", r.fillRect(0, 0, c, l);
                                for (var d = c / n * 3, h = 0, f = 0, i = 0; i < n; i++) {
                                    h = 2 * (o[i] + 140);
                                    var m = Math.floor(h + 64);
                                    r.fillStyle = g % 3 == 0 ? "rgb(".concat(m, ",").concat(g, ",").concat(b, ")") : g % 3 == 1 ? "rgb(".concat(g, ",").concat(m, ",").concat(b, ")") : "rgb(".concat(g, ",").concat(b, ",").concat(m, ")"), (h = l / 7 + h / 256 * l * 6 / 7) < l / 7 && (h = l / 7), r.fillRect(f, l - h, d, h), f += d + 2
                                }
                                setTimeout((function() {
                                    requestAnimationFrame(t)
                                }), 50)
                            }()
                        }
                    }])
                }(w.d);
            nt([Object(w.c)()], at.prototype, "user", void 0), nt([Object(w.c)()], at.prototype, "muted", void 0);
            var ot = at = nt([w.a], at),
                it = (r(584), r(57)),
                ct = Object(it.a)(ot, (function() {
                    var t = this,
                        e = t._self._c;
                    t._self._setupProxy;
                    return t.user ? e("div", {
                        staticClass: "user-card"
                    }, [e("div", {
                        staticClass: "top d-flex py-2 pl-4 pr-2"
                    }, [e("div", {
                        staticClass: "nickname font-weight-bold",
                        on: {
                            click: t.editName
                        }
                    }, [t._v("\n      " + t._s(t.user.nickname) + "\n    ")]), t._v(" "), e(n.a, {
                        attrs: {
                            icon: "",
                            small: ""
                        },
                        on: {
                            click: t.handleMutable
                        }
                    }, [e(h.a, {
                        attrs: {
                            color: this.user.isMuted ? "rgb(242, 72, 34)" : "#FFFFFF"
                        }
                    }, [t._v("\n        " + t._s(this.user.isMuted ? t.$icons.mdiMicrophoneOff : t.$icons.mdiMicrophone) + "\n      ")])], 1)], 1), t._v(" "), e("div", {
                        staticClass: "canvas-wrapper"
                    }, [e("canvas", {
                        ref: "canvas",
                        staticClass: "canvas"
                    })]), t._v(" "), e("audio", {
                        ref: "audio",
                        attrs: {
                            autoplay: ""
                        }
                    })]) : t._e()
                }), [], !1, null, "22a8cfb5", null).exports;

            function st() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (st = function() {
                    return !!t
                })()
            }
            var ut = function(t, e, r, desc) {
                    var n, o = arguments.length,
                        c = o < 3 ? e : null === desc ? desc = Object.getOwnPropertyDescriptor(e, r) : desc;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : Object(O.a)(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, r, desc);
                    else
                        for (var i = t.length - 1; i >= 0; i--)(n = t[i]) && (c = (o < 3 ? n(c) : o > 3 ? n(e, r, c) : n(e, r)) || c);
                    return o > 3 && c && Object.defineProperty(e, r, c), c
                },
                lt = {
                    dictionaries: [C.a, C.c],
                    separator: " ",
                    length: 2
                },
                pt = function(t) {
                    function e() {
                        var t, r, n, o;
                        return Object(m.a)(this, e), r = this, n = e, o = arguments, n = Object(k.a)(n), (t = Object(y.a)(r, st() ? Reflect.construct(n, o || [], Object(k.a)(r).constructor) : n.apply(r, o))).loading = !1, t.showNameDialog = !1, t.noMicPermission = !1, t.nickname = "", t.roomName = "", t.uid = "", t.participantMap = {}, t.participantTrackIdMap = {}, t.participants = [], t.streams = {}, t.pc = null, t.copyUtil = tt, t
                    }
                    return Object(_.a)(e, t), Object(v.a)(e, [{
                        key: "isAllMuted",
                        get: function() {
                            for (var t = 0; t < this.participants.length; t++)
                                if (!this.participants[t].isMuted) return !1;
                            return !0
                        }
                    }, {
                        key: "isWeChat",
                        get: function() {
                            return navigator.userAgent.toLowerCase().includes("micromessenger")
                        }
                    }, {
                        key: "destination",
                        get: function() {
                            return window.location.href
                        }
                    }, {
                        key: "validated",
                        get: function() {
                            return 0 !== this.nickname.trim().length
                        }
                    }, {
                        key: "cardWidth",
                        get: function() {
                            var t = window.innerWidth;
                            if (t < 460) {
                                var e = Math.round((t - 24 - 40) / 2);
                                return "".concat(e, "px")
                            }
                            return "200px"
                        }
                    }, {
                        key: "isEmpty",
                        get: function() {
                            return 1 === this.participants.length
                        }
                    }, {
                        key: "title",
                        get: function() {
                            return "#".concat(this.roomName)
                        }
                    }, {
                        key: "genRandomChannelName",
                        value: function() {
                            var t = Object(C.d)(lt);
                            this.nickname = t.slice(0, 1).toUpperCase() + t.slice(1)
                        }
                    }, {
                        key: "mounted",
                        value: function() {
                            var t = this;
                            setTimeout((function() {
                                t.reload(), t.nickname && K(t.roomName, t.nickname, t.uid, t.onConnect, t.onDisconnect, t.onResume, t.onError)
                            }), 100)
                        }
                    }, {
                        key: "reload",
                        value: function() {
                            this.loading = !0;
                            var t = this.$route.params.name;
                            this.chat.rooms.hasOwnProperty(t) ? this.nickname = this.chat.rooms[t].nickname : this.showNameDialog = !0, this.uid = this.profile.uid || Object(P.b)(), this.setProfile({
                                uid: this.uid
                            }), this.roomName = t, this.setAppbar({
                                color: "rgba(0, 0, 0, 0.0)",
                                home: !0,
                                back: !1,
                                title: "#".concat(this.roomName)
                            }), this.loading = !1
                        }
                    }, {
                        key: "join",
                        value: function() {
                            this.setNickname({
                                room: this.roomName,
                                nickname: this.nickname
                            }), this.showNameDialog = !1, 0 === this.participants.length ? K(this.roomName, this.nickname, this.uid, this.onConnect, this.onDisconnect, this.onResume, this.onError) : window.location.reload()
                        }
                    }, {
                        key: "onConnect",
                        value: function(t, e, r, n, o, c) {
                            this.pc = t, console.log(e, o, c), this.addParticipant(e, r, n, o, c), this.streams[o] = e, this.chat.mutes.hasOwnProperty(o) && this.muteOrUnmute(o, !0)
                        }
                    }, {
                        key: "onDisconnect",
                        value: function(t) {
                            var e = this.removeParticipant(t);
                            null !== e && delete this.streams[e.uid]
                        }
                    }, {
                        key: "onError",
                        value: function(t) {
                            t && "NotAllowedError" === t.name ? (console.log("no permission"), this.noMicPermission = !0) : console.log(t)
                        }
                    }, {
                        key: "onResume",
                        value: function(t) {
                            var e = this;
                            return new Promise((function(r) {
                                console.log("resume from connection", t), e.clearup(), r()
                            }))
                        }
                    }, {
                        key: "clearup",
                        value: function() {
                            console.log("clear up"), this.participants.splice(0, this.participants.length), this.participantTrackIdMap = {}, this.participantMap = {}, this.streams = {}
                        }
                    }, {
                        key: "goHome",
                        value: function() {
                            L && L.close(), H = !1, console.log("stop: " + H), this.clearup()
                        }
                    }, {
                        key: "test",
                        value: function() {
                            console.log(this.participantTrackIdMap), console.log(this.participantMap), console.log(this.participants)
                        }
                    }, {
                        key: "findParticipant",
                        value: function(t) {
                            for (var e = 0; e < this.participants.length; e++)
                                if (this.participants[e].uid === t) return {
                                    user: this.participants[e],
                                    index: e
                                };
                            return null
                        }
                    }, {
                        key: "addParticipant",
                        value: function(t, e, r, n, o) {
                            var c = {
                                stream: t,
                                analyser: e,
                                trackId: r,
                                isMuted: !1,
                                uid: n,
                                nickname: o
                            };
                            this.participantMap.hasOwnProperty(n) || this.participants.push(c), console.log("addParticipant", n, o, r), this.participantMap[n] = c, this.participantTrackIdMap[r] = c
                        }
                    }, {
                        key: "removeParticipant",
                        value: function(t) {
                            if (!this.participantTrackIdMap.hasOwnProperty(t)) return null;
                            var e = this.participantTrackIdMap[t];
                            if (e) {
                                var r = this.findParticipant(e.uid);
                                r && r.user && (console.log("removeParticipant", e, t), this.participants.splice(r.index, 1), delete this.participantMap[e.uid])
                            }
                            return delete this.participantTrackIdMap[t], e
                        }
                    }, {
                        key: "editName",
                        value: function(t) {
                            t && this.uid === t.uid && (this.nickname = t.nickname, this.showNameDialog = !0)
                        }
                    }, {
                        key: "muteAll",
                        value: function() {
                            for (var t = this.participants.map((function(t) {
                                    return t.uid
                                })), e = this.isAllMuted, r = 0; r < t.length; r++) this.muteOrUnmute(t[r], !e);
                            e ? this.removeMutes(t) : this.addMutes(t)
                        }
                    }, {
                        key: "muteUser",
                        value: function(t) {
                            this.muteOrUnmute(t.uid, !0), this.addMute(t.uid)
                        }
                    }, {
                        key: "unmuteUser",
                        value: function(t) {
                            this.muteOrUnmute(t.uid, !1), this.removeMute(t.uid)
                        }
                    }, {
                        key: "muteOrUnmute",
                        value: function(t, e) {
                            if (this.participantMap.hasOwnProperty(t)) {
                                console.log("uid=".concat(t, ", mute=").concat(e));
                                var r = this.findParticipant(t);
                                r && r.user && (r.user.isMuted = e, this.participants.splice(r.index, 1, r.user), this.setStream(t, !e))
                            }
                        }
                    }, {
                        key: "setStream",
                        value: function(t, e) {
                            var r = this.streams[t];
                            r && r.getTracks().length > 0 && (r.getTracks()[0].enabled = e)
                        }
                    }])
                }(Object(w.b)(j.a));
            ut([Object(x.b)((function(t) {
                return t.app.profile
            }))], pt.prototype, "profile", void 0), ut([Object(x.b)((function(t) {
                return t.app.chat
            }))], pt.prototype, "chat", void 0), ut([Object(x.a)("app/SET_NICKNAME")], pt.prototype, "setNickname", void 0), ut([Object(x.a)("app/SET_PROFILE")], pt.prototype, "setProfile", void 0), ut([Object(x.a)("app/SET_APPBAR")], pt.prototype, "setAppbar", void 0), ut([Object(x.a)("app/ADD_MUTE")], pt.prototype, "addMute", void 0), ut([Object(x.a)("app/REMOVE_MUTE")], pt.prototype, "removeMute", void 0), ut([Object(x.a)("app/ADD_MUTES")], pt.prototype, "addMutes", void 0), ut([Object(x.a)("app/REMOVE_MUTES")], pt.prototype, "removeMutes", void 0);
            var ht = pt = ut([Object(w.a)({
                    head: function() {
                        return {
                            title: this.title,
                            meta: [{
                                hid: "theme-color",
                                name: "theme-color",
                                content: "#040C11"
                            }]
                        }
                    },
                    components: {
                        UserCard: ct
                    }
                })], pt),
                ft = (r(586), Object(it.a)(ht, (function() {
                    var t = this,
                        e = this,
                        r = e._self._c;
                    e._self._setupProxy;
                    return r("normal-page-layout", {
                        on: {
                            home: e.goHome
                        }
                    }, [r(l.a, {
                        staticClass: "room-page"
                    }, [r("f-loading", {
                        attrs: {
                            loading: e.loading,
                            fullscreen: !0
                        }
                    }), e._v(" "), [e.isEmpty ? r("div", {
                        staticClass: "hint-box empty-hint px-4 py-2 mx-2 mb-4"
                    }, [r("h2", {
                        staticClass: "body-1 font-weight-bold"
                    }, [e._v(e._s(e.$t("room.empty_block_title")))]), e._v(" "), r("div", {
                        staticClass: "body-2"
                    }, [e._v("\n          " + e._s(e.$t("room.empty_block_text")) + "\n        ")]), e._v(" "), r(n.a, {
                        directives: [{
                            name: "clipboard",
                            rawName: "v-clipboard:copy",
                            value: e.destination,
                            expression: "destination",
                            arg: "copy"
                        }, {
                            name: "clipboard",
                            rawName: "v-clipboard:success",
                            value: function() {
                                return e.copyUtil.onCopy(t)
                            },
                            expression: "() => copyUtil.onCopy(this)",
                            arg: "success"
                        }, {
                            name: "clipboard",
                            rawName: "v-clipboard:error",
                            value: function() {
                                return e.copyUtil.onError(t)
                            },
                            expression: "() => copyUtil.onError(this)",
                            arg: "error"
                        }],
                        staticClass: "my-2",
                        attrs: {
                            small: "",
                            outlined: ""
                        }
                    }, [e._v("\n          " + e._s(e.$t("common.copy_url")) + "\n        ")])], 1) : r("div", {
                        staticClass: "hint-box caption px-4 py-2 mx-2 mb-4"
                    }, [r(h.a, {
                        attrs: {
                            small: ""
                        }
                    }, [e._v(e._s(e.$icons.mdiHeadphones))]), e._v("\n        " + e._s(e.$t("room.earhub_block_text")) + "\n      ")], 1), e._v(" "), e.noMicPermission ? r("div", {
                        staticClass: "hint-box error-hint px-4 py-2 mx-2 mb-4"
                    }, [r("h2", {
                        staticClass: "body-1 font-weight-bold"
                    }, [e._v(e._s(e.$t("room.error_block_title")))]), e._v(" "), r("div", {
                        staticClass: "body-2"
                    }, [e._v("\n          " + e._s(e.$t("room.error_block_text")) + "\n        ")])]) : e._e(), e._v(" "), e.isWeChat ? r("div", {
                        staticClass: "hint-box error-hint px-4 py-2 mx-2 mb-4"
                    }, [r("h2", {
                        staticClass: "body-1 font-weight-bold"
                    }, [e._v(e._s(e.$t("room.wechat_error_block_title")))]), e._v(" "), r("div", {
                        staticClass: "body-2"
                    }, [e._v("\n          " + e._s(e.$t("room.wechat_error_block_text")) + "\n        ")])]) : e._e(), e._v(" "), r("div", {
                        staticClass: "cards"
                    }, e._l(e.participants, (function(t) {
                        return r("div", {
                            key: t.uid,
                            staticClass: "user-card-wrapper ma-2",
                            style: {
                                width: e.cardWidth
                            }
                        }, [r("user-card", {
                            attrs: {
                                user: t
                            },
                            on: {
                                mute: e.muteUser,
                                unmute: e.unmuteUser,
                                "edit-name": e.editName
                            }
                        })], 1)
                    })), 0)]], 2), e._v(" "), r(d.a, {
                        attrs: {
                            "max-width": "290"
                        },
                        model: {
                            value: e.showNameDialog,
                            callback: function(t) {
                                e.showNameDialog = t
                            },
                            expression: "showNameDialog"
                        }
                    }, [r(o.a, [r(c.c, {
                        staticClass: "title-2"
                    }, [e._v(e._s(e.$t("room.name_dialog_title")))]), e._v(" "), r(c.b, {
                        staticClass: "mb-0"
                    }, [r("div", {
                        staticClass: "mb-4"
                    }, [r(f.a, {
                        attrs: {
                            label: e.$t("room.name_dialog_placeholder"),
                            "hide-details": !0
                        },
                        scopedSlots: e._u([{
                            key: "append",
                            fn: function() {
                                return [r(n.a, {
                                    attrs: {
                                        icon: ""
                                    },
                                    on: {
                                        click: e.genRandomChannelName
                                    }
                                }, [r(h.a, [e._v("\n                  " + e._s(e.$icons.mdiDice3) + "\n                ")])], 1)]
                            },
                            proxy: !0
                        }]),
                        model: {
                            value: e.nickname,
                            callback: function(t) {
                                e.nickname = t
                            },
                            expression: "nickname"
                        }
                    })], 1)]), e._v(" "), r(c.a, {
                        staticClass: "px-5 pb-5"
                    }, [r(n.a, {
                        attrs: {
                            color: "primary",
                            block: "",
                            rounded: "",
                            disabled: !e.validated
                        },
                        on: {
                            click: e.join
                        }
                    }, [e._v("\n          " + e._s(e.$t("room.name_dialog_btn")) + "\n        ")])], 1)], 1)], 1), e._v(" "), r(n.a, {
                        staticClass: "mute-all-btn",
                        attrs: {
                            color: "rgba(255, 255, 255, 0.2)",
                            dark: "",
                            small: "",
                            absolute: "",
                            bottom: "",
                            right: "",
                            fab: ""
                        },
                        on: {
                            click: e.muteAll
                        }
                    }, [r(h.a, {
                        attrs: {
                            color: this.isAllMuted ? "rgb(242, 72, 34)" : "#FFFFFF"
                        }
                    }, [e._v("\n      " + e._s(this.isAllMuted ? e.$icons.mdiMicrophoneOff : e.$icons.mdiMicrophone) + "\n    ")])], 1)], 1)
                }), [], !1, null, "7612d705", null));
            e.default = ft.exports
        }
    }
]);