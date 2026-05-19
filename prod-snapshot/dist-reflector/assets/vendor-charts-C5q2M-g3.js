import {
  c as Ni,
  g as ae,
  r as L,
  a as bm,
  R as P,
  A as lt
} from "./vendor-react-ByYOq5k4.js";

function Ch(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (r = Ch(e[t])) && (n && (n += " "), n += r)
    } else
      for (r in e) e[r] && (n && (n += " "), n += r);
  return n
}

function Z() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++)(e = arguments[r]) && (t = Ch(e)) && (n && (n += " "), n += t);
  return n
}
var xm = Array.isArray,
  Be = xm,
  wm = typeof Ni == "object" && Ni && Ni.Object === Object && Ni,
  Ih = wm,
  Om = Ih,
  Am = typeof self == "object" && self && self.Object === Object && self,
  Pm = Om || Am || Function("return this")(),
  pt = Pm,
  _m = pt,
  Sm = _m.Symbol,
  Ai = Sm,
  Ws = Ai,
  kh = Object.prototype,
  $m = kh.hasOwnProperty,
  Tm = kh.toString,
  _n = Ws ? Ws.toStringTag : void 0;

function Em(e) {
  var t = $m.call(e, _n),
    r = e[_n];
  try {
    e[_n] = void 0;
    var n = !0
  } catch {}
  var i = Tm.call(e);
  return n && (t ? e[_n] = r : delete e[_n]), i
}
var jm = Em,
  Mm = Object.prototype,
  Cm = Mm.toString;

function Im(e) {
  return Cm.call(e)
}
var km = Im,
  Us = Ai,
  Dm = jm,
  Nm = km,
  Lm = "[object Null]",
  Rm = "[object Undefined]",
  Ks = Us ? Us.toStringTag : void 0;

function Bm(e) {
  return e == null ? e === void 0 ? Rm : Lm : Ks && Ks in Object(e) ? Dm(e) : Nm(e)
}
var Et = Bm;

function Fm(e) {
  return e != null && typeof e == "object"
}
var jt = Fm,
  zm = Et,
  Wm = jt,
  Um = "[object Symbol]";

function Km(e) {
  return typeof e == "symbol" || Wm(e) && zm(e) == Um
}
var ln = Km,
  Hm = Be,
  Gm = ln,
  Vm = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  Xm = /^\w*$/;

function qm(e, t) {
  if (Hm(e)) return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Gm(e) ? !0 : Xm.test(e) || !Vm.test(e) || t != null && e in Object(t)
}
var Nc = qm;

function Ym(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function")
}
var Wt = Ym;
const fn = ae(Wt);
var Zm = Et,
  Jm = Wt,
  Qm = "[object AsyncFunction]",
  eg = "[object Function]",
  tg = "[object GeneratorFunction]",
  rg = "[object Proxy]";

function ng(e) {
  if (!Jm(e)) return !1;
  var t = Zm(e);
  return t == eg || t == tg || t == Qm || t == rg
}
var Lc = ng;
const G = ae(Lc);
var ig = pt,
  ag = ig["__core-js_shared__"],
  og = ag,
  Fo = og,
  Hs = function() {
    var e = /[^.]+$/.exec(Fo && Fo.keys && Fo.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : ""
  }();

function ug(e) {
  return !!Hs && Hs in e
}
var cg = ug,
  sg = Function.prototype,
  lg = sg.toString;

function fg(e) {
  if (e != null) {
    try {
      return lg.call(e)
    } catch {}
    try {
      return e + ""
    } catch {}
  }
  return ""
}
var Dh = fg,
  pg = Lc,
  hg = cg,
  dg = Wt,
  vg = Dh,
  yg = /[\\^$.*+?()[\]{}|]/g,
  mg = /^\[object .+?Constructor\]$/,
  gg = Function.prototype,
  bg = Object.prototype,
  xg = gg.toString,
  wg = bg.hasOwnProperty,
  Og = RegExp("^" + xg.call(wg).replace(yg, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function Ag(e) {
  if (!dg(e) || hg(e)) return !1;
  var t = pg(e) ? Og : mg;
  return t.test(vg(e))
}
var Pg = Ag;

function _g(e, t) {
  return e?.[t]
}
var Sg = _g,
  $g = Pg,
  Tg = Sg;

function Eg(e, t) {
  var r = Tg(e, t);
  return $g(r) ? r : void 0
}
var vr = Eg,
  jg = vr,
  Mg = jg(Object, "create"),
  to = Mg,
  Gs = to;

function Cg() {
  this.__data__ = Gs ? Gs(null) : {}, this.size = 0
}
var Ig = Cg;

function kg(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t
}
var Dg = kg,
  Ng = to,
  Lg = "__lodash_hash_undefined__",
  Rg = Object.prototype,
  Bg = Rg.hasOwnProperty;

function Fg(e) {
  var t = this.__data__;
  if (Ng) {
    var r = t[e];
    return r === Lg ? void 0 : r
  }
  return Bg.call(t, e) ? t[e] : void 0
}
var zg = Fg,
  Wg = to,
  Ug = Object.prototype,
  Kg = Ug.hasOwnProperty;

function Hg(e) {
  var t = this.__data__;
  return Wg ? t[e] !== void 0 : Kg.call(t, e)
}
var Gg = Hg,
  Vg = to,
  Xg = "__lodash_hash_undefined__";

function qg(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Vg && t === void 0 ? Xg : t, this
}
var Yg = qg,
  Zg = Ig,
  Jg = Dg,
  Qg = zg,
  eb = Gg,
  tb = Yg;

function pn(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1])
  }
}
pn.prototype.clear = Zg;
pn.prototype.delete = Jg;
pn.prototype.get = Qg;
pn.prototype.has = eb;
pn.prototype.set = tb;
var rb = pn;

function nb() {
  this.__data__ = [], this.size = 0
}
var ib = nb;

function ab(e, t) {
  return e === t || e !== e && t !== t
}
var Rc = ab,
  ob = Rc;

function ub(e, t) {
  for (var r = e.length; r--;)
    if (ob(e[r][0], t)) return r;
  return -1
}
var ro = ub,
  cb = ro,
  sb = Array.prototype,
  lb = sb.splice;

function fb(e) {
  var t = this.__data__,
    r = cb(t, e);
  if (r < 0) return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : lb.call(t, r, 1), --this.size, !0
}
var pb = fb,
  hb = ro;

function db(e) {
  var t = this.__data__,
    r = hb(t, e);
  return r < 0 ? void 0 : t[r][1]
}
var vb = db,
  yb = ro;

function mb(e) {
  return yb(this.__data__, e) > -1
}
var gb = mb,
  bb = ro;

function xb(e, t) {
  var r = this.__data__,
    n = bb(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
}
var wb = xb,
  Ob = ib,
  Ab = pb,
  Pb = vb,
  _b = gb,
  Sb = wb;

function hn(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1])
  }
}
hn.prototype.clear = Ob;
hn.prototype.delete = Ab;
hn.prototype.get = Pb;
hn.prototype.has = _b;
hn.prototype.set = Sb;
var no = hn,
  $b = vr,
  Tb = pt,
  Eb = $b(Tb, "Map"),
  Bc = Eb,
  Vs = rb,
  jb = no,
  Mb = Bc;

function Cb() {
  this.size = 0, this.__data__ = {
    hash: new Vs,
    map: new(Mb || jb),
    string: new Vs
  }
}
var Ib = Cb;

function kb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
}
var Db = kb,
  Nb = Db;

function Lb(e, t) {
  var r = e.__data__;
  return Nb(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
}
var io = Lb,
  Rb = io;

function Bb(e) {
  var t = Rb(this, e).delete(e);
  return this.size -= t ? 1 : 0, t
}
var Fb = Bb,
  zb = io;

function Wb(e) {
  return zb(this, e).get(e)
}
var Ub = Wb,
  Kb = io;

function Hb(e) {
  return Kb(this, e).has(e)
}
var Gb = Hb,
  Vb = io;

function Xb(e, t) {
  var r = Vb(this, e),
    n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this
}
var qb = Xb,
  Yb = Ib,
  Zb = Fb,
  Jb = Ub,
  Qb = Gb,
  e0 = qb;

function dn(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r;) {
    var n = e[t];
    this.set(n[0], n[1])
  }
}
dn.prototype.clear = Yb;
dn.prototype.delete = Zb;
dn.prototype.get = Jb;
dn.prototype.has = Qb;
dn.prototype.set = e0;
var Fc = dn,
  Nh = Fc,
  t0 = "Expected a function";

function zc(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(t0);
  var r = function() {
    var n = arguments,
      i = t ? t.apply(this, n) : n[0],
      a = r.cache;
    if (a.has(i)) return a.get(i);
    var o = e.apply(this, n);
    return r.cache = a.set(i, o) || a, o
  };
  return r.cache = new(zc.Cache || Nh), r
}
zc.Cache = Nh;
var Lh = zc;
const r0 = ae(Lh);
var n0 = Lh,
  i0 = 500;

function a0(e) {
  var t = n0(e, function(n) {
      return r.size === i0 && r.clear(), n
    }),
    r = t.cache;
  return t
}
var o0 = a0,
  u0 = o0,
  c0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  s0 = /\\(\\)?/g,
  l0 = u0(function(e) {
    var t = [];
    return e.charCodeAt(0) === 46 && t.push(""), e.replace(c0, function(r, n, i, a) {
      t.push(i ? a.replace(s0, "$1") : n || r)
    }), t
  }),
  f0 = l0;

function p0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
  return i
}
var Wc = p0,
  Xs = Ai,
  h0 = Wc,
  d0 = Be,
  v0 = ln,
  qs = Xs ? Xs.prototype : void 0,
  Ys = qs ? qs.toString : void 0;

function Rh(e) {
  if (typeof e == "string") return e;
  if (d0(e)) return h0(e, Rh) + "";
  if (v0(e)) return Ys ? Ys.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t
}
var y0 = Rh,
  m0 = y0;

function g0(e) {
  return e == null ? "" : m0(e)
}
var Bh = g0,
  b0 = Be,
  x0 = Nc,
  w0 = f0,
  O0 = Bh;

function A0(e, t) {
  return b0(e) ? e : x0(e, t) ? [e] : w0(O0(e))
}
var Fh = A0,
  P0 = ln;

function _0(e) {
  if (typeof e == "string" || P0(e)) return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t
}
var ao = _0,
  S0 = Fh,
  $0 = ao;

function T0(e, t) {
  t = S0(t, e);
  for (var r = 0, n = t.length; e != null && r < n;) e = e[$0(t[r++])];
  return r && r == n ? e : void 0
}
var Uc = T0,
  E0 = Uc;

function j0(e, t, r) {
  var n = e == null ? void 0 : E0(e, t);
  return n === void 0 ? r : n
}
var zh = j0;
const He = ae(zh);

function M0(e) {
  return e == null
}
var C0 = M0;
const V = ae(C0);
var I0 = Et,
  k0 = Be,
  D0 = jt,
  N0 = "[object String]";

function L0(e) {
  return typeof e == "string" || !k0(e) && D0(e) && I0(e) == N0
}
var R0 = L0;
const lr = ae(R0);
var B0 = Et,
  F0 = jt,
  z0 = "[object Number]";

function W0(e) {
  return typeof e == "number" || F0(e) && B0(e) == z0
}
var Wh = W0;
const U0 = ae(Wh);
var K0 = Wh;

function H0(e) {
  return K0(e) && e != +e
}
var G0 = H0;
const vn = ae(G0);
var Ce = function(t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  nr = function(t) {
    return lr(t) && t.indexOf("%") === t.length - 1
  },
  R = function(t) {
    return U0(t) && !vn(t)
  },
  V0 = function(t) {
    return V(t)
  },
  Pe = function(t) {
    return R(t) || lr(t)
  },
  X0 = 0,
  Ut = function(t) {
    var r = ++X0;
    return "".concat(t || "").concat(r)
  },
  Ie = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!R(t) && !lr(t)) return n;
    var a;
    if (nr(t)) {
      var o = t.indexOf("%");
      a = r * parseFloat(t.slice(0, o)) / 100
    } else a = +t;
    return vn(a) && (a = n), i && a > r && (a = r), a
  },
  Dt = function(t) {
    if (!t) return null;
    var r = Object.keys(t);
    return r && r.length ? t[r[0]] : null
  },
  q0 = function(t) {
    if (!Array.isArray(t)) return !1;
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0;
      else return !0;
    return !1
  },
  oe = function(t, r) {
    return R(t) && R(r) ? function(n) {
      return t + n * (r - t)
    } : function() {
      return r
    }
  };

function Zi(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : He(n, t)) === r
  })
}
var Y0 = function(t) {
    if (!t || !t.length) return null;
    for (var r = t.length, n = 0, i = 0, a = 0, o = 0, u = 1 / 0, c = -1 / 0, s = 0, f = 0, l = 0; l < r; l++) s = t[l].cx || 0, f = t[l].cy || 0, n += s, i += f, a += s * f, o += s * s, u = Math.min(u, s), c = Math.max(c, s);
    var p = r * o !== n * n ? (r * a - n * i) / (r * o - n * n) : 0;
    return {
      xmin: u,
      xmax: c,
      a: p,
      b: (i - p * n) / r
    }
  },
  Z0 = function(t, r) {
    return R(t) && R(r) ? t - r : lr(t) && lr(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r))
  };

function jr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])) return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1;
  return !0
}

function hu(e) {
  "@babel/helpers - typeof";
  return hu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, hu(e)
}
var J0 = ["viewBox", "children"],
  Q0 = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  Zs = ["points", "pathLength"],
  zo = {
    svg: J0,
    polygon: Zs,
    polyline: Zs
  },
  Kc = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Ji = function(t, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if (L.isValidElement(t) && (n = t.props), !fn(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(a) {
      Kc.includes(a) && (i[a] = r || function(o) {
        return n[a](n, o)
      })
    }), i
  },
  ex = function(t, r, n) {
    return function(i) {
      return t(r, n, i), null
    }
  },
  zt = function(t, r, n) {
    if (!fn(t) || hu(t) !== "object") return null;
    var i = null;
    return Object.keys(t).forEach(function(a) {
      var o = t[a];
      Kc.includes(a) && typeof o == "function" && (i || (i = {}), i[a] = ex(o, r, n))
    }), i
  },
  tx = ["children"],
  rx = ["children"];

function Js(e, t) {
  if (e == null) return {};
  var r = nx(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function nx(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function du(e) {
  "@babel/helpers - typeof";
  return du = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, du(e)
}
var Qs = {
    click: "onClick",
    mousedown: "onMouseDown",
    mouseup: "onMouseUp",
    mouseover: "onMouseOver",
    mousemove: "onMouseMove",
    mouseout: "onMouseOut",
    mouseenter: "onMouseEnter",
    mouseleave: "onMouseLeave",
    touchcancel: "onTouchCancel",
    touchend: "onTouchEnd",
    touchmove: "onTouchMove",
    touchstart: "onTouchStart",
    contextmenu: "onContextMenu",
    dblclick: "onDoubleClick"
  },
  Ot = function(t) {
    return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : ""
  },
  el = null,
  Wo = null,
  Hc = function e(t) {
    if (t === el && Array.isArray(Wo)) return Wo;
    var r = [];
    return L.Children.forEach(t, function(n) {
      V(n) || (bm.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n))
    }), Wo = r, el = t, r
  };

function De(e, t) {
  var r = [],
    n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return Ot(i)
  }) : n = [Ot(t)], Hc(e).forEach(function(i) {
    var a = He(i, "type.displayName") || He(i, "type.name");
    n.indexOf(a) !== -1 && r.push(i)
  }), r
}

function Ue(e, t) {
  var r = De(e, t);
  return r && r[0]
}
var tl = function(t) {
    if (!t || !t.props) return !1;
    var r = t.props,
      n = r.width,
      i = r.height;
    return !(!R(n) || n <= 0 || !R(i) || i <= 0)
  },
  ix = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  ax = function(t) {
    return t && t.type && lr(t.type) && ix.indexOf(t.type) >= 0
  },
  Uh = function(t) {
    return t && du(t) === "object" && "clipDot" in t
  },
  ox = function(t, r, n, i) {
    var a, o = (a = zo?.[i]) !== null && a !== void 0 ? a : [];
    return r.startsWith("data-") || !G(t) && (i && o.includes(r) || Q0.includes(r)) || n && Kc.includes(r)
  },
  U = function(t, r, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if (L.isValidElement(t) && (i = t.props), !fn(i)) return null;
    var a = {};
    return Object.keys(i).forEach(function(o) {
      var u;
      ox((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) && (a[o] = i[o])
    }), a
  },
  vu = function e(t, r) {
    if (t === r) return !0;
    var n = L.Children.count(t);
    if (n !== L.Children.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return rl(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var a = t[i],
        o = r[i];
      if (Array.isArray(a) || Array.isArray(o)) {
        if (!e(a, o)) return !1
      } else if (!rl(a, o)) return !1
    }
    return !0
  },
  rl = function(t, r) {
    if (V(t) && V(r)) return !0;
    if (!V(t) && !V(r)) {
      var n = t.props || {},
        i = n.children,
        a = Js(n, tx),
        o = r.props || {},
        u = o.children,
        c = Js(o, rx);
      return i && u ? jr(a, c) && vu(i, u) : !i && !u ? jr(a, c) : !1
    }
    return !1
  },
  nl = function(t, r) {
    var n = [],
      i = {};
    return Hc(t).forEach(function(a, o) {
      if (ax(a)) n.push(a);
      else if (a) {
        var u = Ot(a.type),
          c = r[u] || {},
          s = c.handler,
          f = c.once;
        if (s && (!f || !i[u])) {
          var l = s(a, u, o);
          n.push(l), i[u] = !0
        }
      }
    }), n
  },
  ux = function(t) {
    var r = t && t.type;
    return r && Qs[r] ? Qs[r] : null
  },
  cx = function(t, r) {
    return Hc(r).indexOf(t)
  },
  sx = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function yu() {
  return yu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, yu.apply(this, arguments)
}

function lx(e, t) {
  if (e == null) return {};
  var r = fx(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function fx(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function mu(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    a = e.className,
    o = e.style,
    u = e.title,
    c = e.desc,
    s = lx(e, sx),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    l = Z("recharts-surface", a);
  return P.createElement("svg", yu({}, U(s, !0, "svg"), {
    className: l,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), P.createElement("title", null, u), P.createElement("desc", null, c), t)
}
var px = ["children", "className"];

function gu() {
  return gu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, gu.apply(this, arguments)
}

function hx(e, t) {
  if (e == null) return {};
  var r = dx(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function dx(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var J = P.forwardRef(function(e, t) {
    var r = e.children,
      n = e.className,
      i = hx(e, px),
      a = Z("recharts-layer", n);
    return P.createElement("g", gu({
      className: a
    }, U(i, !0), {
      ref: t
    }), r)
  }),
  it = function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) i[a - 2] = arguments[a]
  };

function vx(e, t, r) {
  var n = -1,
    i = e.length;
  t < 0 && (t = -t > i ? 0 : i + t), r = r > i ? i : r, r < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var a = Array(i); ++n < i;) a[n] = e[n + t];
  return a
}
var yx = vx,
  mx = yx;

function gx(e, t, r) {
  var n = e.length;
  return r = r === void 0 ? n : r, !t && r >= n ? e : mx(e, t, r)
}
var bx = gx,
  xx = "\\ud800-\\udfff",
  wx = "\\u0300-\\u036f",
  Ox = "\\ufe20-\\ufe2f",
  Ax = "\\u20d0-\\u20ff",
  Px = wx + Ox + Ax,
  _x = "\\ufe0e\\ufe0f",
  Sx = "\\u200d",
  $x = RegExp("[" + Sx + xx + Px + _x + "]");

function Tx(e) {
  return $x.test(e)
}
var Kh = Tx;

function Ex(e) {
  return e.split("")
}
var jx = Ex,
  Hh = "\\ud800-\\udfff",
  Mx = "\\u0300-\\u036f",
  Cx = "\\ufe20-\\ufe2f",
  Ix = "\\u20d0-\\u20ff",
  kx = Mx + Cx + Ix,
  Dx = "\\ufe0e\\ufe0f",
  Nx = "[" + Hh + "]",
  bu = "[" + kx + "]",
  xu = "\\ud83c[\\udffb-\\udfff]",
  Lx = "(?:" + bu + "|" + xu + ")",
  Gh = "[^" + Hh + "]",
  Vh = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  Xh = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  Rx = "\\u200d",
  qh = Lx + "?",
  Yh = "[" + Dx + "]?",
  Bx = "(?:" + Rx + "(?:" + [Gh, Vh, Xh].join("|") + ")" + Yh + qh + ")*",
  Fx = Yh + qh + Bx,
  zx = "(?:" + [Gh + bu + "?", bu, Vh, Xh, Nx].join("|") + ")",
  Wx = RegExp(xu + "(?=" + xu + ")|" + zx + Fx, "g");

function Ux(e) {
  return e.match(Wx) || []
}
var Kx = Ux,
  Hx = jx,
  Gx = Kh,
  Vx = Kx;

function Xx(e) {
  return Gx(e) ? Vx(e) : Hx(e)
}
var qx = Xx,
  Yx = bx,
  Zx = Kh,
  Jx = qx,
  Qx = Bh;

function ew(e) {
  return function(t) {
    t = Qx(t);
    var r = Zx(t) ? Jx(t) : void 0,
      n = r ? r[0] : t.charAt(0),
      i = r ? Yx(r, 1).join("") : t.slice(1);
    return n[e]() + i
  }
}
var tw = ew,
  rw = tw,
  nw = rw("toUpperCase"),
  iw = nw;
const oo = ae(iw);

function le(e) {
  return function() {
    return e
  }
}
const Zh = Math.cos,
  Qi = Math.sin,
  at = Math.sqrt,
  ea = Math.PI,
  uo = 2 * ea,
  wu = Math.PI,
  Ou = 2 * wu,
  Qt = 1e-6,
  aw = Ou - Qt;

function Jh(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t]
}

function ow(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Jh;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
class uw {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Jh : ow(t)
  }
  moveTo(t, r) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}`
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`)
  }
  lineTo(t, r) {
    this._append`L${this._x1=+t},${this._y1=+r}`
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1=+n},${this._y1=+i}`
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1=+a},${this._y1=+o}`
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1,
      u = this._y1,
      c = n - t,
      s = i - r,
      f = o - t,
      l = u - r,
      p = f * f + l * l;
    if (this._x1 === null) this._append`M${this._x1=t},${this._y1=r}`;
    else if (p > Qt)
      if (!(Math.abs(l * c - s * f) > Qt) || !a) this._append`L${this._x1=t},${this._y1=r}`;
      else {
        let h = n - o,
          v = i - u,
          d = c * c + s * s,
          y = h * h + v * v,
          b = Math.sqrt(d),
          x = Math.sqrt(p),
          w = a * Math.tan((wu - Math.acos((d + p - y) / (2 * b * x))) / 2),
          O = w / x,
          m = w / b;
        Math.abs(O - 1) > Qt && this._append`L${t+O*f},${r+O*l}`, this._append`A${a},${a},0,0,${+(l*h>f*v)},${this._x1=t+m*c},${this._y1=r+m*s}`
      }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i),
      c = n * Math.sin(i),
      s = t + u,
      f = r + c,
      l = 1 ^ o,
      p = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${f}` : (Math.abs(this._x1 - s) > Qt || Math.abs(this._y1 - f) > Qt) && this._append`L${s},${f}`, n && (p < 0 && (p = p % Ou + Ou), p > aw ? this._append`A${n},${n},0,1,${l},${t-u},${r-c}A${n},${n},0,1,${l},${this._x1=s},${this._y1=f}` : p > Qt && this._append`A${n},${n},0,${+(p>=wu)},${l},${this._x1=t+n*Math.cos(a)},${this._y1=r+n*Math.sin(a)}`)
  }
  rect(t, r, n, i) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
}

function Gc(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null) t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n
    }
    return e
  }, () => new uw(t)
}

function Vc(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e)
}

function Qh(e) {
  this._context = e
}
Qh.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._point = 0
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break
    }
  }
};

function co(e) {
  return new Qh(e)
}

function ed(e) {
  return e[0]
}

function td(e) {
  return e[1]
}

function rd(e, t) {
  var r = le(!0),
    n = null,
    i = co,
    a = null,
    o = Gc(u);
  e = typeof e == "function" ? e : e === void 0 ? ed : le(e), t = typeof t == "function" ? t : t === void 0 ? td : le(t);

  function u(c) {
    var s, f = (c = Vc(c)).length,
      l, p = !1,
      h;
    for (n == null && (a = i(h = o())), s = 0; s <= f; ++s) !(s < f && r(l = c[s], s, c)) === p && ((p = !p) ? a.lineStart() : a.lineEnd()), p && a.point(+e(l, s, c), +t(l, s, c));
    if (h) return a = null, h + "" || null
  }
  return u.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : le(+c), u) : e
  }, u.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : le(+c), u) : t
  }, u.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : le(!!c), u) : r
  }, u.curve = function(c) {
    return arguments.length ? (i = c, n != null && (a = i(n)), u) : i
  }, u.context = function(c) {
    return arguments.length ? (c == null ? n = a = null : a = i(n = c), u) : n
  }, u
}

function Li(e, t, r) {
  var n = null,
    i = le(!0),
    a = null,
    o = co,
    u = null,
    c = Gc(s);
  e = typeof e == "function" ? e : e === void 0 ? ed : le(+e), t = typeof t == "function" ? t : le(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? td : le(+r);

  function s(l) {
    var p, h, v, d = (l = Vc(l)).length,
      y, b = !1,
      x, w = new Array(d),
      O = new Array(d);
    for (a == null && (u = o(x = c())), p = 0; p <= d; ++p) {
      if (!(p < d && i(y = l[p], p, l)) === b)
        if (b = !b) h = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), v = p - 1; v >= h; --v) u.point(w[v], O[v]);
          u.lineEnd(), u.areaEnd()
        } b && (w[p] = +e(y, p, l), O[p] = +t(y, p, l), u.point(n ? +n(y, p, l) : w[p], r ? +r(y, p, l) : O[p]))
    }
    if (x) return u = null, x + "" || null
  }

  function f() {
    return rd().defined(i).curve(o).context(a)
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : le(+l), n = null, s) : e
  }, s.x0 = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : le(+l), s) : e
  }, s.x1 = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : le(+l), s) : n
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : le(+l), r = null, s) : t
  }, s.y0 = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : le(+l), s) : t
  }, s.y1 = function(l) {
    return arguments.length ? (r = l == null ? null : typeof l == "function" ? l : le(+l), s) : r
  }, s.lineX0 = s.lineY0 = function() {
    return f().x(e).y(t)
  }, s.lineY1 = function() {
    return f().x(e).y(r)
  }, s.lineX1 = function() {
    return f().x(n).y(t)
  }, s.defined = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : le(!!l), s) : i
  }, s.curve = function(l) {
    return arguments.length ? (o = l, a != null && (u = o(a)), s) : o
  }, s.context = function(l) {
    return arguments.length ? (l == null ? a = u = null : u = o(a = l), s) : a
  }, s
}
class nd {
  constructor(t, r) {
    this._context = t, this._x = r
  }
  areaStart() {
    this._line = 0
  }
  areaEnd() {
    this._line = NaN
  }
  lineStart() {
    this._point = 0
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break
      }
    }
    this._x0 = t, this._y0 = r
  }
}

function cw(e) {
  return new nd(e, !0)
}

function sw(e) {
  return new nd(e, !1)
}
const Xc = {
    draw(e, t) {
      const r = at(t / ea);
      e.moveTo(r, 0), e.arc(0, 0, r, 0, uo)
    }
  },
  lw = {
    draw(e, t) {
      const r = at(t / 5) / 2;
      e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath()
    }
  },
  id = at(1 / 3),
  fw = id * 2,
  pw = {
    draw(e, t) {
      const r = at(t / fw),
        n = r * id;
      e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath()
    }
  },
  hw = {
    draw(e, t) {
      const r = at(t),
        n = -r / 2;
      e.rect(n, n, r, r)
    }
  },
  dw = .8908130915292852,
  ad = Qi(ea / 10) / Qi(7 * ea / 10),
  vw = Qi(uo / 10) * ad,
  yw = -Zh(uo / 10) * ad,
  mw = {
    draw(e, t) {
      const r = at(t * dw),
        n = vw * r,
        i = yw * r;
      e.moveTo(0, -r), e.lineTo(n, i);
      for (let a = 1; a < 5; ++a) {
        const o = uo * a / 5,
          u = Zh(o),
          c = Qi(o);
        e.lineTo(c * r, -u * r), e.lineTo(u * n - c * i, c * n + u * i)
      }
      e.closePath()
    }
  },
  Uo = at(3),
  gw = {
    draw(e, t) {
      const r = -at(t / (Uo * 3));
      e.moveTo(0, r * 2), e.lineTo(-Uo * r, -r), e.lineTo(Uo * r, -r), e.closePath()
    }
  },
  Ge = -.5,
  Ve = at(3) / 2,
  Au = 1 / at(12),
  bw = (Au / 2 + 1) * 3,
  xw = {
    draw(e, t) {
      const r = at(t / bw),
        n = r / 2,
        i = r * Au,
        a = n,
        o = r * Au + r,
        u = -a,
        c = o;
      e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, c), e.lineTo(Ge * n - Ve * i, Ve * n + Ge * i), e.lineTo(Ge * a - Ve * o, Ve * a + Ge * o), e.lineTo(Ge * u - Ve * c, Ve * u + Ge * c), e.lineTo(Ge * n + Ve * i, Ge * i - Ve * n), e.lineTo(Ge * a + Ve * o, Ge * o - Ve * a), e.lineTo(Ge * u + Ve * c, Ge * c - Ve * u), e.closePath()
    }
  };

function ww(e, t) {
  let r = null,
    n = Gc(i);
  e = typeof e == "function" ? e : le(e || Xc), t = typeof t == "function" ? t : le(t === void 0 ? 64 : +t);

  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : le(a), i) : e
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : le(+a), i) : t
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r
  }, i
}

function ta() {}

function ra(e, t, r) {
  e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + r) / 6)
}

function od(e) {
  this._context = e
}
od.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        ra(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        ra(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function Ow(e) {
  return new od(e)
}

function ud(e) {
  this._context = e
}
ud.prototype = {
  areaStart: ta,
  areaEnd: ta,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        ra(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function Aw(e) {
  return new ud(e)
}

function cd(e) {
  this._context = e
}
cd.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6,
          n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        ra(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function Pw(e) {
  return new cd(e)
}

function sd(e) {
  this._context = e
}
sd.prototype = {
  areaStart: ta,
  areaEnd: ta,
  lineStart: function() {
    this._point = 0
  },
  lineEnd: function() {
    this._point && this._context.closePath()
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t))
  }
};

function _w(e) {
  return new sd(e)
}

function il(e) {
  return e < 0 ? -1 : 1
}

function al(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    a = (e._y1 - e._y0) / (n || i < 0 && -0),
    o = (r - e._y1) / (i || n < 0 && -0),
    u = (a * i + o * n) / (n + i);
  return (il(a) + il(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(u)) || 0
}

function ol(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t
}

function Ko(e, t, r) {
  var n = e._x0,
    i = e._y0,
    a = e._x1,
    o = e._y1,
    u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o)
}

function na(e) {
  this._context = e
}
na.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Ko(this, this._t0, ol(this, this._t0));
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Ko(this, ol(this, r = al(this, e, t)), r);
          break;
        default:
          Ko(this, this._t0, r = al(this, e, t));
          break
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r
    }
  }
};

function ld(e) {
  this._context = new fd(e)
}(ld.prototype = Object.create(na.prototype)).point = function(e, t) {
  na.prototype.point.call(this, t, e)
};

function fd(e) {
  this._context = e
}
fd.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e)
  },
  closePath: function() {
    this._context.closePath()
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e)
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i)
  }
};

function Sw(e) {
  return new na(e)
}

function $w(e) {
  return new ld(e)
}

function pd(e) {
  this._context = e
}
pd.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x = [], this._y = []
  },
  lineEnd: function() {
    var e = this._x,
      t = this._y,
      r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2) this._context.lineTo(e[1], t[1]);
      else
        for (var n = ul(e), i = ul(t), a = 0, o = 1; o < r; ++a, ++o) this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t)
  }
};

function ul(e) {
  var t, r = e.length - 1,
    n, i = new Array(r),
    a = new Array(r),
    o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a]
}

function Tw(e) {
  return new pd(e)
}

function so(e, t) {
  this._context = e, this._t = t
}
so.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t)
        }
        break
      }
    }
    this._x = e, this._y = t
  }
};

function Ew(e) {
  return new so(e, .5)
}

function jw(e) {
  return new so(e, 0)
}

function Mw(e) {
  return new so(e, 1)
}

function kr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n) a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function Pu(e) {
  for (var t = e.length, r = new Array(t); --t >= 0;) r[t] = t;
  return r
}

function Cw(e, t) {
  return e[t]
}

function Iw(e) {
  const t = [];
  return t.key = e, t
}

function kw() {
  var e = le([]),
    t = Pu,
    r = kr,
    n = Cw;

  function i(a) {
    var o = Array.from(e.apply(this, arguments), Iw),
      u, c = o.length,
      s = -1,
      f;
    for (const l of a)
      for (u = 0, ++s; u < c; ++u)(o[u][s] = [0, +n(l, o[u].key, s, a)]).data = l;
    for (u = 0, f = Vc(t(o)); u < c; ++u) o[f[u]].index = u;
    return r(o, f), o
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : le(Array.from(a)), i) : e
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : le(+a), i) : n
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? Pu : typeof a == "function" ? a : le(Array.from(a)), i) : t
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? kr, i) : r
  }, i
}

function Dw(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o)
        for (r = 0; r < n; ++r) e[r][i][1] /= o
    }
    kr(e, t)
  }
}

function Nw(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    kr(e, t)
  }
}

function Lw(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, c = 0, s = 0; u < o; ++u) {
        for (var f = e[t[u]], l = f[n][1] || 0, p = f[n - 1][1] || 0, h = (l - p) / 2, v = 0; v < u; ++v) {
          var d = e[t[v]],
            y = d[n][1] || 0,
            b = d[n - 1][1] || 0;
          h += y - b
        }
        c += l, s += h * l
      }
      i[n - 1][1] += i[n - 1][0] = r, c && (r -= s / c)
    }
    i[n - 1][1] += i[n - 1][0] = r, kr(e, t)
  }
}

function Wn(e) {
  "@babel/helpers - typeof";
  return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Wn(e)
}
var Rw = ["type", "size", "sizeType"];

function _u() {
  return _u = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, _u.apply(this, arguments)
}

function cl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function sl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cl(Object(r), !0).forEach(function(n) {
      Bw(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Bw(e, t, r) {
  return t = Fw(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Fw(e) {
  var t = zw(e, "string");
  return Wn(t) == "symbol" ? t : t + ""
}

function zw(e, t) {
  if (Wn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Ww(e, t) {
  if (e == null) return {};
  var r = Uw(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Uw(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var hd = {
    symbolCircle: Xc,
    symbolCross: lw,
    symbolDiamond: pw,
    symbolSquare: hw,
    symbolStar: mw,
    symbolTriangle: gw,
    symbolWye: xw
  },
  Kw = Math.PI / 180,
  Hw = function(t) {
    var r = "symbol".concat(oo(t));
    return hd[r] || Xc
  },
  Gw = function(t, r, n) {
    if (r === "area") return t;
    switch (n) {
      case "cross":
        return 5 * t * t / 9;
      case "diamond":
        return .5 * t * t / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * Kw;
        return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
      }
      case "triangle":
        return Math.sqrt(3) * t * t / 4;
      case "wye":
        return (21 - 10 * Math.sqrt(3)) * t * t / 8;
      default:
        return Math.PI * t * t / 4
    }
  },
  Vw = function(t, r) {
    hd["symbol".concat(oo(t))] = r
  },
  lo = function(t) {
    var r = t.type,
      n = r === void 0 ? "circle" : r,
      i = t.size,
      a = i === void 0 ? 64 : i,
      o = t.sizeType,
      u = o === void 0 ? "area" : o,
      c = Ww(t, Rw),
      s = sl(sl({}, c), {}, {
        type: n,
        size: a,
        sizeType: u
      }),
      f = function() {
        var y = Hw(n),
          b = ww().type(y).size(Gw(a, u, n));
        return b()
      },
      l = s.className,
      p = s.cx,
      h = s.cy,
      v = U(s, !0);
    return p === +p && h === +h && a === +a ? P.createElement("path", _u({}, v, {
      className: Z("recharts-symbols", l),
      transform: "translate(".concat(p, ", ").concat(h, ")"),
      d: f()
    })) : null
  };
lo.registerSymbol = Vw;

function Dr(e) {
  "@babel/helpers - typeof";
  return Dr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Dr(e)
}

function Su() {
  return Su = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Su.apply(this, arguments)
}

function ll(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Xw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ll(Object(r), !0).forEach(function(n) {
      Un(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ll(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function qw(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Yw(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vd(n.key), n)
  }
}

function Zw(e, t, r) {
  return t && Yw(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Jw(e, t, r) {
  return t = ia(t), Qw(e, dd() ? Reflect.construct(t, r || [], ia(e).constructor) : t.apply(e, r))
}

function Qw(e, t) {
  if (t && (Dr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return eO(e)
}

function eO(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function dd() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (dd = function() {
    return !!e
  })()
}

function ia(e) {
  return ia = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ia(e)
}

function tO(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && $u(e, t)
}

function $u(e, t) {
  return $u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, $u(e, t)
}

function Un(e, t, r) {
  return t = vd(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function vd(e) {
  var t = rO(e, "string");
  return Dr(t) == "symbol" ? t : t + ""
}

function rO(e, t) {
  if (Dr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Dr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Xe = 32,
  qc = function(e) {
    function t() {
      return qw(this, t), Jw(this, t, arguments)
    }
    return tO(t, e), Zw(t, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          a = Xe / 2,
          o = Xe / 6,
          u = Xe / 3,
          c = n.inactive ? i : n.color;
        if (n.type === "plainline") return P.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: c,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: a,
          x2: Xe,
          y2: a,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return P.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: c,
          d: "M0,".concat(a, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(a, `
            H`).concat(Xe, "M").concat(2 * u, ",").concat(a, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(a),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return P.createElement("path", {
          stroke: "none",
          fill: c,
          d: "M0,".concat(Xe / 8, "h").concat(Xe, "v").concat(Xe * 3 / 4, "h").concat(-Xe, "z"),
          className: "recharts-legend-icon"
        });
        if (P.isValidElement(n.legendIcon)) {
          var s = Xw({}, n);
          return delete s.legendIcon, P.cloneElement(n.legendIcon, s)
        }
        return P.createElement(lo, {
          fill: c,
          cx: a,
          cy: a,
          size: Xe,
          sizeType: "diameter",
          type: n.type
        })
      }
    }, {
      key: "renderItems",
      value: function() {
        var n = this,
          i = this.props,
          a = i.payload,
          o = i.iconSize,
          u = i.layout,
          c = i.formatter,
          s = i.inactiveColor,
          f = {
            x: 0,
            y: 0,
            width: Xe,
            height: Xe
          },
          l = {
            display: u === "horizontal" ? "inline-block" : "block",
            marginRight: 10
          },
          p = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4
          };
        return a.map(function(h, v) {
          var d = h.formatter || c,
            y = Z(Un(Un({
              "recharts-legend-item": !0
            }, "legend-item-".concat(v), !0), "inactive", h.inactive));
          if (h.type === "none") return null;
          var b = G(h.value) ? null : h.value;
          it(!G(h.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var x = h.inactive ? s : h.color;
          return P.createElement("li", Su({
            className: y,
            style: l,
            key: "legend-item-".concat(v)
          }, zt(n.props, h, v)), P.createElement(mu, {
            width: o,
            height: o,
            viewBox: f,
            style: p
          }, n.renderIcon(h)), P.createElement("span", {
            className: "recharts-legend-item-text",
            style: {
              color: x
            }
          }, d ? d(b, h, v) : b))
        })
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.payload,
          a = n.layout,
          o = n.align;
        if (!i || !i.length) return null;
        var u = {
          padding: 0,
          margin: 0,
          textAlign: a === "horizontal" ? o : "left"
        };
        return P.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(L.PureComponent);
Un(qc, "displayName", "Legend");
Un(qc, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var nO = no;

function iO() {
  this.__data__ = new nO, this.size = 0
}
var aO = iO;

function oO(e) {
  var t = this.__data__,
    r = t.delete(e);
  return this.size = t.size, r
}
var uO = oO;

function cO(e) {
  return this.__data__.get(e)
}
var sO = cO;

function lO(e) {
  return this.__data__.has(e)
}
var fO = lO,
  pO = no,
  hO = Bc,
  dO = Fc,
  vO = 200;

function yO(e, t) {
  var r = this.__data__;
  if (r instanceof pO) {
    var n = r.__data__;
    if (!hO || n.length < vO - 1) return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new dO(n)
  }
  return r.set(e, t), this.size = r.size, this
}
var mO = yO,
  gO = no,
  bO = aO,
  xO = uO,
  wO = sO,
  OO = fO,
  AO = mO;

function yn(e) {
  var t = this.__data__ = new gO(e);
  this.size = t.size
}
yn.prototype.clear = bO;
yn.prototype.delete = xO;
yn.prototype.get = wO;
yn.prototype.has = OO;
yn.prototype.set = AO;
var yd = yn,
  PO = "__lodash_hash_undefined__";

function _O(e) {
  return this.__data__.set(e, PO), this
}
var SO = _O;

function $O(e) {
  return this.__data__.has(e)
}
var TO = $O,
  EO = Fc,
  jO = SO,
  MO = TO;

function aa(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.__data__ = new EO; ++t < r;) this.add(e[t])
}
aa.prototype.add = aa.prototype.push = jO;
aa.prototype.has = MO;
var md = aa;

function CO(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
    if (t(e[r], r, e)) return !0;
  return !1
}
var gd = CO;

function IO(e, t) {
  return e.has(t)
}
var bd = IO,
  kO = md,
  DO = gd,
  NO = bd,
  LO = 1,
  RO = 2;

function BO(e, t, r, n, i, a) {
  var o = r & LO,
    u = e.length,
    c = t.length;
  if (u != c && !(o && c > u)) return !1;
  var s = a.get(e),
    f = a.get(t);
  if (s && f) return s == t && f == e;
  var l = -1,
    p = !0,
    h = r & RO ? new kO : void 0;
  for (a.set(e, t), a.set(t, e); ++l < u;) {
    var v = e[l],
      d = t[l];
    if (n) var y = o ? n(d, v, l, t, e, a) : n(v, d, l, e, t, a);
    if (y !== void 0) {
      if (y) continue;
      p = !1;
      break
    }
    if (h) {
      if (!DO(t, function(b, x) {
          if (!NO(h, x) && (v === b || i(v, b, r, n, a))) return h.push(x)
        })) {
        p = !1;
        break
      }
    } else if (!(v === d || i(v, d, r, n, a))) {
      p = !1;
      break
    }
  }
  return a.delete(e), a.delete(t), p
}
var xd = BO,
  FO = pt,
  zO = FO.Uint8Array,
  WO = zO;

function UO(e) {
  var t = -1,
    r = Array(e.size);
  return e.forEach(function(n, i) {
    r[++t] = [i, n]
  }), r
}
var KO = UO;

function HO(e) {
  var t = -1,
    r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n
  }), r
}
var Yc = HO,
  fl = Ai,
  pl = WO,
  GO = Rc,
  VO = xd,
  XO = KO,
  qO = Yc,
  YO = 1,
  ZO = 2,
  JO = "[object Boolean]",
  QO = "[object Date]",
  e1 = "[object Error]",
  t1 = "[object Map]",
  r1 = "[object Number]",
  n1 = "[object RegExp]",
  i1 = "[object Set]",
  a1 = "[object String]",
  o1 = "[object Symbol]",
  u1 = "[object ArrayBuffer]",
  c1 = "[object DataView]",
  hl = fl ? fl.prototype : void 0,
  Ho = hl ? hl.valueOf : void 0;

function s1(e, t, r, n, i, a, o) {
  switch (r) {
    case c1:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
      e = e.buffer, t = t.buffer;
    case u1:
      return !(e.byteLength != t.byteLength || !a(new pl(e), new pl(t)));
    case JO:
    case QO:
    case r1:
      return GO(+e, +t);
    case e1:
      return e.name == t.name && e.message == t.message;
    case n1:
    case a1:
      return e == t + "";
    case t1:
      var u = XO;
    case i1:
      var c = n & YO;
      if (u || (u = qO), e.size != t.size && !c) return !1;
      var s = o.get(e);
      if (s) return s == t;
      n |= ZO, o.set(e, t);
      var f = VO(u(e), u(t), n, i, a, o);
      return o.delete(e), f;
    case o1:
      if (Ho) return Ho.call(e) == Ho.call(t)
  }
  return !1
}
var l1 = s1;

function f1(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
  return e
}
var wd = f1,
  p1 = wd,
  h1 = Be;

function d1(e, t, r) {
  var n = t(e);
  return h1(e) ? n : p1(n, r(e))
}
var v1 = d1;

function y1(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, a = []; ++r < n;) {
    var o = e[r];
    t(o, r, e) && (a[i++] = o)
  }
  return a
}
var m1 = y1;

function g1() {
  return []
}
var b1 = g1,
  x1 = m1,
  w1 = b1,
  O1 = Object.prototype,
  A1 = O1.propertyIsEnumerable,
  dl = Object.getOwnPropertySymbols,
  P1 = dl ? function(e) {
    return e == null ? [] : (e = Object(e), x1(dl(e), function(t) {
      return A1.call(e, t)
    }))
  } : w1,
  _1 = P1;

function S1(e, t) {
  for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
  return n
}
var $1 = S1,
  T1 = Et,
  E1 = jt,
  j1 = "[object Arguments]";

function M1(e) {
  return E1(e) && T1(e) == j1
}
var C1 = M1,
  vl = C1,
  I1 = jt,
  Od = Object.prototype,
  k1 = Od.hasOwnProperty,
  D1 = Od.propertyIsEnumerable,
  N1 = vl(function() {
    return arguments
  }()) ? vl : function(e) {
    return I1(e) && k1.call(e, "callee") && !D1.call(e, "callee")
  },
  Zc = N1,
  oa = {
    exports: {}
  };

function L1() {
  return !1
}
var R1 = L1;
oa.exports;
(function(e, t) {
  var r = pt,
    n = R1,
    i = t && !t.nodeType && t,
    a = i && !0 && e && !e.nodeType && e,
    o = a && a.exports === i,
    u = o ? r.Buffer : void 0,
    c = u ? u.isBuffer : void 0,
    s = c || n;
  e.exports = s
})(oa, oa.exports);
var Ad = oa.exports,
  B1 = 9007199254740991,
  F1 = /^(?:0|[1-9]\d*)$/;

function z1(e, t) {
  var r = typeof e;
  return t = t ?? B1, !!t && (r == "number" || r != "symbol" && F1.test(e)) && e > -1 && e % 1 == 0 && e < t
}
var Jc = z1,
  W1 = 9007199254740991;

function U1(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= W1
}
var Qc = U1,
  K1 = Et,
  H1 = Qc,
  G1 = jt,
  V1 = "[object Arguments]",
  X1 = "[object Array]",
  q1 = "[object Boolean]",
  Y1 = "[object Date]",
  Z1 = "[object Error]",
  J1 = "[object Function]",
  Q1 = "[object Map]",
  eA = "[object Number]",
  tA = "[object Object]",
  rA = "[object RegExp]",
  nA = "[object Set]",
  iA = "[object String]",
  aA = "[object WeakMap]",
  oA = "[object ArrayBuffer]",
  uA = "[object DataView]",
  cA = "[object Float32Array]",
  sA = "[object Float64Array]",
  lA = "[object Int8Array]",
  fA = "[object Int16Array]",
  pA = "[object Int32Array]",
  hA = "[object Uint8Array]",
  dA = "[object Uint8ClampedArray]",
  vA = "[object Uint16Array]",
  yA = "[object Uint32Array]",
  pe = {};
pe[cA] = pe[sA] = pe[lA] = pe[fA] = pe[pA] = pe[hA] = pe[dA] = pe[vA] = pe[yA] = !0;
pe[V1] = pe[X1] = pe[oA] = pe[q1] = pe[uA] = pe[Y1] = pe[Z1] = pe[J1] = pe[Q1] = pe[eA] = pe[tA] = pe[rA] = pe[nA] = pe[iA] = pe[aA] = !1;

function mA(e) {
  return G1(e) && H1(e.length) && !!pe[K1(e)]
}
var gA = mA;

function bA(e) {
  return function(t) {
    return e(t)
  }
}
var Pd = bA,
  ua = {
    exports: {}
  };
ua.exports;
(function(e, t) {
  var r = Ih,
    n = t && !t.nodeType && t,
    i = n && !0 && e && !e.nodeType && e,
    a = i && i.exports === n,
    o = a && r.process,
    u = function() {
      try {
        var c = i && i.require && i.require("util").types;
        return c || o && o.binding && o.binding("util")
      } catch {}
    }();
  e.exports = u
})(ua, ua.exports);
var xA = ua.exports,
  wA = gA,
  OA = Pd,
  yl = xA,
  ml = yl && yl.isTypedArray,
  AA = ml ? OA(ml) : wA,
  _d = AA,
  PA = $1,
  _A = Zc,
  SA = Be,
  $A = Ad,
  TA = Jc,
  EA = _d,
  jA = Object.prototype,
  MA = jA.hasOwnProperty;

function CA(e, t) {
  var r = SA(e),
    n = !r && _A(e),
    i = !r && !n && $A(e),
    a = !r && !n && !i && EA(e),
    o = r || n || i || a,
    u = o ? PA(e.length, String) : [],
    c = u.length;
  for (var s in e)(t || MA.call(e, s)) && !(o && (s == "length" || i && (s == "offset" || s == "parent") || a && (s == "buffer" || s == "byteLength" || s == "byteOffset") || TA(s, c))) && u.push(s);
  return u
}
var IA = CA,
  kA = Object.prototype;

function DA(e) {
  var t = e && e.constructor,
    r = typeof t == "function" && t.prototype || kA;
  return e === r
}
var NA = DA;

function LA(e, t) {
  return function(r) {
    return e(t(r))
  }
}
var Sd = LA,
  RA = Sd,
  BA = RA(Object.keys, Object),
  FA = BA,
  zA = NA,
  WA = FA,
  UA = Object.prototype,
  KA = UA.hasOwnProperty;

function HA(e) {
  if (!zA(e)) return WA(e);
  var t = [];
  for (var r in Object(e)) KA.call(e, r) && r != "constructor" && t.push(r);
  return t
}
var GA = HA,
  VA = Lc,
  XA = Qc;

function qA(e) {
  return e != null && XA(e.length) && !VA(e)
}
var Pi = qA,
  YA = IA,
  ZA = GA,
  JA = Pi;

function QA(e) {
  return JA(e) ? YA(e) : ZA(e)
}
var fo = QA,
  eP = v1,
  tP = _1,
  rP = fo;

function nP(e) {
  return eP(e, rP, tP)
}
var iP = nP,
  gl = iP,
  aP = 1,
  oP = Object.prototype,
  uP = oP.hasOwnProperty;

function cP(e, t, r, n, i, a) {
  var o = r & aP,
    u = gl(e),
    c = u.length,
    s = gl(t),
    f = s.length;
  if (c != f && !o) return !1;
  for (var l = c; l--;) {
    var p = u[l];
    if (!(o ? p in t : uP.call(t, p))) return !1
  }
  var h = a.get(e),
    v = a.get(t);
  if (h && v) return h == t && v == e;
  var d = !0;
  a.set(e, t), a.set(t, e);
  for (var y = o; ++l < c;) {
    p = u[l];
    var b = e[p],
      x = t[p];
    if (n) var w = o ? n(x, b, p, t, e, a) : n(b, x, p, e, t, a);
    if (!(w === void 0 ? b === x || i(b, x, r, n, a) : w)) {
      d = !1;
      break
    }
    y || (y = p == "constructor")
  }
  if (d && !y) {
    var O = e.constructor,
      m = t.constructor;
    O != m && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof m == "function" && m instanceof m) && (d = !1)
  }
  return a.delete(e), a.delete(t), d
}
var sP = cP,
  lP = vr,
  fP = pt,
  pP = lP(fP, "DataView"),
  hP = pP,
  dP = vr,
  vP = pt,
  yP = dP(vP, "Promise"),
  mP = yP,
  gP = vr,
  bP = pt,
  xP = gP(bP, "Set"),
  $d = xP,
  wP = vr,
  OP = pt,
  AP = wP(OP, "WeakMap"),
  PP = AP,
  Tu = hP,
  Eu = Bc,
  ju = mP,
  Mu = $d,
  Cu = PP,
  Td = Et,
  mn = Dh,
  bl = "[object Map]",
  _P = "[object Object]",
  xl = "[object Promise]",
  wl = "[object Set]",
  Ol = "[object WeakMap]",
  Al = "[object DataView]",
  SP = mn(Tu),
  $P = mn(Eu),
  TP = mn(ju),
  EP = mn(Mu),
  jP = mn(Cu),
  er = Td;
(Tu && er(new Tu(new ArrayBuffer(1))) != Al || Eu && er(new Eu) != bl || ju && er(ju.resolve()) != xl || Mu && er(new Mu) != wl || Cu && er(new Cu) != Ol) && (er = function(e) {
  var t = Td(e),
    r = t == _P ? e.constructor : void 0,
    n = r ? mn(r) : "";
  if (n) switch (n) {
    case SP:
      return Al;
    case $P:
      return bl;
    case TP:
      return xl;
    case EP:
      return wl;
    case jP:
      return Ol
  }
  return t
});
var MP = er,
  Go = yd,
  CP = xd,
  IP = l1,
  kP = sP,
  Pl = MP,
  _l = Be,
  Sl = Ad,
  DP = _d,
  NP = 1,
  $l = "[object Arguments]",
  Tl = "[object Array]",
  Ri = "[object Object]",
  LP = Object.prototype,
  El = LP.hasOwnProperty;

function RP(e, t, r, n, i, a) {
  var o = _l(e),
    u = _l(t),
    c = o ? Tl : Pl(e),
    s = u ? Tl : Pl(t);
  c = c == $l ? Ri : c, s = s == $l ? Ri : s;
  var f = c == Ri,
    l = s == Ri,
    p = c == s;
  if (p && Sl(e)) {
    if (!Sl(t)) return !1;
    o = !0, f = !1
  }
  if (p && !f) return a || (a = new Go), o || DP(e) ? CP(e, t, r, n, i, a) : IP(e, t, c, r, n, i, a);
  if (!(r & NP)) {
    var h = f && El.call(e, "__wrapped__"),
      v = l && El.call(t, "__wrapped__");
    if (h || v) {
      var d = h ? e.value() : e,
        y = v ? t.value() : t;
      return a || (a = new Go), i(d, y, r, n, a)
    }
  }
  return p ? (a || (a = new Go), kP(e, t, r, n, i, a)) : !1
}
var BP = RP,
  FP = BP,
  jl = jt;

function Ed(e, t, r, n, i) {
  return e === t ? !0 : e == null || t == null || !jl(e) && !jl(t) ? e !== e && t !== t : FP(e, t, r, n, Ed, i)
}
var es = Ed,
  zP = yd,
  WP = es,
  UP = 1,
  KP = 2;

function HP(e, t, r, n) {
  var i = r.length,
    a = i,
    o = !n;
  if (e == null) return !a;
  for (e = Object(e); i--;) {
    var u = r[i];
    if (o && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1
  }
  for (; ++i < a;) {
    u = r[i];
    var c = u[0],
      s = e[c],
      f = u[1];
    if (o && u[2]) {
      if (s === void 0 && !(c in e)) return !1
    } else {
      var l = new zP;
      if (n) var p = n(s, f, c, e, t, l);
      if (!(p === void 0 ? WP(f, s, UP | KP, n, l) : p)) return !1
    }
  }
  return !0
}
var GP = HP,
  VP = Wt;

function XP(e) {
  return e === e && !VP(e)
}
var jd = XP,
  qP = jd,
  YP = fo;

function ZP(e) {
  for (var t = YP(e), r = t.length; r--;) {
    var n = t[r],
      i = e[n];
    t[r] = [n, i, qP(i)]
  }
  return t
}
var JP = ZP;

function QP(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
  }
}
var Md = QP,
  e_ = GP,
  t_ = JP,
  r_ = Md;

function n_(e) {
  var t = t_(e);
  return t.length == 1 && t[0][2] ? r_(t[0][0], t[0][1]) : function(r) {
    return r === e || e_(r, e, t)
  }
}
var i_ = n_;

function a_(e, t) {
  return e != null && t in Object(e)
}
var o_ = a_,
  u_ = Fh,
  c_ = Zc,
  s_ = Be,
  l_ = Jc,
  f_ = Qc,
  p_ = ao;

function h_(e, t, r) {
  t = u_(t, e);
  for (var n = -1, i = t.length, a = !1; ++n < i;) {
    var o = p_(t[n]);
    if (!(a = e != null && r(e, o))) break;
    e = e[o]
  }
  return a || ++n != i ? a : (i = e == null ? 0 : e.length, !!i && f_(i) && l_(o, i) && (s_(e) || c_(e)))
}
var d_ = h_,
  v_ = o_,
  y_ = d_;

function m_(e, t) {
  return e != null && y_(e, t, v_)
}
var g_ = m_,
  b_ = es,
  x_ = zh,
  w_ = g_,
  O_ = Nc,
  A_ = jd,
  P_ = Md,
  __ = ao,
  S_ = 1,
  $_ = 2;

function T_(e, t) {
  return O_(e) && A_(t) ? P_(__(e), t) : function(r) {
    var n = x_(r, e);
    return n === void 0 && n === t ? w_(r, e) : b_(t, n, S_ | $_)
  }
}
var E_ = T_;

function j_(e) {
  return e
}
var gn = j_;

function M_(e) {
  return function(t) {
    return t?.[e]
  }
}
var C_ = M_,
  I_ = Uc;

function k_(e) {
  return function(t) {
    return I_(t, e)
  }
}
var D_ = k_,
  N_ = C_,
  L_ = D_,
  R_ = Nc,
  B_ = ao;

function F_(e) {
  return R_(e) ? N_(B_(e)) : L_(e)
}
var z_ = F_,
  W_ = i_,
  U_ = E_,
  K_ = gn,
  H_ = Be,
  G_ = z_;

function V_(e) {
  return typeof e == "function" ? e : e == null ? K_ : typeof e == "object" ? H_(e) ? U_(e[0], e[1]) : W_(e) : G_(e)
}
var ht = V_;

function X_(e, t, r, n) {
  for (var i = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < i;)
    if (t(e[a], a, e)) return a;
  return -1
}
var Cd = X_;

function q_(e) {
  return e !== e
}
var Y_ = q_;

function Z_(e, t, r) {
  for (var n = r - 1, i = e.length; ++n < i;)
    if (e[n] === t) return n;
  return -1
}
var J_ = Z_,
  Q_ = Cd,
  eS = Y_,
  tS = J_;

function rS(e, t, r) {
  return t === t ? tS(e, t, r) : Q_(e, eS, r)
}
var nS = rS,
  iS = nS;

function aS(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && iS(e, t, 0) > -1
}
var oS = aS;

function uS(e, t, r) {
  for (var n = -1, i = e == null ? 0 : e.length; ++n < i;)
    if (r(t, e[n])) return !0;
  return !1
}
var cS = uS;

function sS() {}
var lS = sS,
  Vo = $d,
  fS = lS,
  pS = Yc,
  hS = 1 / 0,
  dS = Vo && 1 / pS(new Vo([, -0]))[1] == hS ? function(e) {
    return new Vo(e)
  } : fS,
  vS = dS,
  yS = md,
  mS = oS,
  gS = cS,
  bS = bd,
  xS = vS,
  wS = Yc,
  OS = 200;

function AS(e, t, r) {
  var n = -1,
    i = mS,
    a = e.length,
    o = !0,
    u = [],
    c = u;
  if (r) o = !1, i = gS;
  else if (a >= OS) {
    var s = t ? null : xS(e);
    if (s) return wS(s);
    o = !1, i = bS, c = new yS
  } else c = t ? [] : u;
  e: for (; ++n < a;) {
    var f = e[n],
      l = t ? t(f) : f;
    if (f = r || f !== 0 ? f : 0, o && l === l) {
      for (var p = c.length; p--;)
        if (c[p] === l) continue e;
      t && c.push(l), u.push(f)
    } else i(c, l, r) || (c !== u && c.push(l), u.push(f))
  }
  return u
}
var PS = AS,
  _S = ht,
  SS = PS;

function $S(e, t) {
  return e && e.length ? SS(e, _S(t)) : []
}
var TS = $S;
const Ml = ae(TS);

function Id(e, t, r) {
  return t === !0 ? Ml(e, r) : G(t) ? Ml(e, t) : e
}

function Nr(e) {
  "@babel/helpers - typeof";
  return Nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Nr(e)
}
var ES = ["ref"];

function Cl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cl(Object(r), !0).forEach(function(n) {
      po(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function jS(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Il(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Dd(n.key), n)
  }
}

function MS(e, t, r) {
  return t && Il(e.prototype, t), r && Il(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function CS(e, t, r) {
  return t = ca(t), IS(e, kd() ? Reflect.construct(t, r || [], ca(e).constructor) : t.apply(e, r))
}

function IS(e, t) {
  if (t && (Nr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return kS(e)
}

function kS(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function kd() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (kd = function() {
    return !!e
  })()
}

function ca(e) {
  return ca = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ca(e)
}

function DS(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Iu(e, t)
}

function Iu(e, t) {
  return Iu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Iu(e, t)
}

function po(e, t, r) {
  return t = Dd(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Dd(e) {
  var t = NS(e, "string");
  return Nr(t) == "symbol" ? t : t + ""
}

function NS(e, t) {
  if (Nr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Nr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}

function LS(e, t) {
  if (e == null) return {};
  var r = RS(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function RS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function BS(e) {
  return e.value
}

function FS(e, t) {
  if (P.isValidElement(e)) return P.cloneElement(e, t);
  if (typeof e == "function") return P.createElement(e, t);
  t.ref;
  var r = LS(t, ES);
  return P.createElement(qc, r)
}
var kl = 1,
  Mr = function(e) {
    function t() {
      var r;
      jS(this, t);
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
      return r = CS(this, t, [].concat(i)), po(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return DS(t, e), MS(t, [{
      key: "componentDidMount",
      value: function() {
        this.updateBBox()
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        this.updateBBox()
      }
    }, {
      key: "getBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n
        }
        return null
      }
    }, {
      key: "updateBBox",
      value: function() {
        var n = this.props.onBBoxUpdate,
          i = this.getBBox();
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > kl || Math.abs(i.height - this.lastBoundingBox.height) > kl) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? vt({}, this.lastBoundingBox) : {
          width: 0,
          height: 0
        }
      }
    }, {
      key: "getDefaultPosition",
      value: function(n) {
        var i = this.props,
          a = i.layout,
          o = i.align,
          u = i.verticalAlign,
          c = i.margin,
          s = i.chartWidth,
          f = i.chartHeight,
          l, p;
        if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
          if (o === "center" && a === "vertical") {
            var h = this.getBBoxSnapshot();
            l = {
              left: ((s || 0) - h.width) / 2
            }
          } else l = o === "right" ? {
            right: c && c.right || 0
          } : {
            left: c && c.left || 0
          };
        if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
          if (u === "middle") {
            var v = this.getBBoxSnapshot();
            p = {
              top: ((f || 0) - v.height) / 2
            }
          } else p = u === "bottom" ? {
            bottom: c && c.bottom || 0
          } : {
            top: c && c.top || 0
          };
        return vt(vt({}, l), p)
      }
    }, {
      key: "render",
      value: function() {
        var n = this,
          i = this.props,
          a = i.content,
          o = i.width,
          u = i.height,
          c = i.wrapperStyle,
          s = i.payloadUniqBy,
          f = i.payload,
          l = vt(vt({
            position: "absolute",
            width: o || "auto",
            height: u || "auto"
          }, this.getDefaultPosition(c)), c);
        return P.createElement("div", {
          className: "recharts-legend-wrapper",
          style: l,
          ref: function(h) {
            n.wrapperNode = h
          }
        }, FS(a, vt(vt({}, this.props), {}, {
          payload: Id(f, s, BS)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(n, i) {
        var a = vt(vt({}, this.defaultProps), n.props),
          o = a.layout;
        return o === "vertical" && R(n.props.height) ? {
          height: n.props.height
        } : o === "horizontal" ? {
          width: n.props.width || i
        } : null
      }
    }])
  }(L.PureComponent);
po(Mr, "displayName", "Legend");
po(Mr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var Dl = Ai,
  zS = Zc,
  WS = Be,
  Nl = Dl ? Dl.isConcatSpreadable : void 0;

function US(e) {
  return WS(e) || zS(e) || !!(Nl && e && e[Nl])
}
var KS = US,
  HS = wd,
  GS = KS;

function Nd(e, t, r, n, i) {
  var a = -1,
    o = e.length;
  for (r || (r = GS), i || (i = []); ++a < o;) {
    var u = e[a];
    t > 0 && r(u) ? t > 1 ? Nd(u, t - 1, r, n, i) : HS(i, u) : n || (i[i.length] = u)
  }
  return i
}
var Ld = Nd;

function VS(e) {
  return function(t, r, n) {
    for (var i = -1, a = Object(t), o = n(t), u = o.length; u--;) {
      var c = o[e ? u : ++i];
      if (r(a[c], c, a) === !1) break
    }
    return t
  }
}
var XS = VS,
  qS = XS,
  YS = qS(),
  ZS = YS,
  JS = ZS,
  QS = fo;

function e$(e, t) {
  return e && JS(e, t, QS)
}
var Rd = e$,
  t$ = Pi;

function r$(e, t) {
  return function(r, n) {
    if (r == null) return r;
    if (!t$(r)) return e(r, n);
    for (var i = r.length, a = t ? i : -1, o = Object(r);
      (t ? a-- : ++a < i) && n(o[a], a, o) !== !1;);
    return r
  }
}
var n$ = r$,
  i$ = Rd,
  a$ = n$,
  o$ = a$(i$),
  ts = o$,
  u$ = ts,
  c$ = Pi;

function s$(e, t) {
  var r = -1,
    n = c$(e) ? Array(e.length) : [];
  return u$(e, function(i, a, o) {
    n[++r] = t(i, a, o)
  }), n
}
var Bd = s$;

function l$(e, t) {
  var r = e.length;
  for (e.sort(t); r--;) e[r] = e[r].value;
  return e
}
var f$ = l$,
  Ll = ln;

function p$(e, t) {
  if (e !== t) {
    var r = e !== void 0,
      n = e === null,
      i = e === e,
      a = Ll(e),
      o = t !== void 0,
      u = t === null,
      c = t === t,
      s = Ll(t);
    if (!u && !s && !a && e > t || a && o && c && !u && !s || n && o && c || !r && c || !i) return 1;
    if (!n && !a && !s && e < t || s && r && i && !n && !a || u && r && i || !o && i || !c) return -1
  }
  return 0
}
var h$ = p$,
  d$ = h$;

function v$(e, t, r) {
  for (var n = -1, i = e.criteria, a = t.criteria, o = i.length, u = r.length; ++n < o;) {
    var c = d$(i[n], a[n]);
    if (c) {
      if (n >= u) return c;
      var s = r[n];
      return c * (s == "desc" ? -1 : 1)
    }
  }
  return e.index - t.index
}
var y$ = v$,
  Xo = Wc,
  m$ = Uc,
  g$ = ht,
  b$ = Bd,
  x$ = f$,
  w$ = Pd,
  O$ = y$,
  A$ = gn,
  P$ = Be;

function _$(e, t, r) {
  t.length ? t = Xo(t, function(a) {
    return P$(a) ? function(o) {
      return m$(o, a.length === 1 ? a[0] : a)
    } : a
  }) : t = [A$];
  var n = -1;
  t = Xo(t, w$(g$));
  var i = b$(e, function(a, o, u) {
    var c = Xo(t, function(s) {
      return s(a)
    });
    return {
      criteria: c,
      index: ++n,
      value: a
    }
  });
  return x$(i, function(a, o) {
    return O$(a, o, r)
  })
}
var S$ = _$;

function $$(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2])
  }
  return e.apply(t, r)
}
var T$ = $$,
  E$ = T$,
  Rl = Math.max;

function j$(e, t, r) {
  return t = Rl(t === void 0 ? e.length - 1 : t, 0),
    function() {
      for (var n = arguments, i = -1, a = Rl(n.length - t, 0), o = Array(a); ++i < a;) o[i] = n[t + i];
      i = -1;
      for (var u = Array(t + 1); ++i < t;) u[i] = n[i];
      return u[t] = r(o), E$(e, this, u)
    }
}
var M$ = j$;

function C$(e) {
  return function() {
    return e
  }
}
var I$ = C$,
  k$ = vr,
  D$ = function() {
    try {
      var e = k$(Object, "defineProperty");
      return e({}, "", {}), e
    } catch {}
  }(),
  Fd = D$,
  N$ = I$,
  Bl = Fd,
  L$ = gn,
  R$ = Bl ? function(e, t) {
    return Bl(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: N$(t),
      writable: !0
    })
  } : L$,
  B$ = R$,
  F$ = 800,
  z$ = 16,
  W$ = Date.now;

function U$(e) {
  var t = 0,
    r = 0;
  return function() {
    var n = W$(),
      i = z$ - (n - r);
    if (r = n, i > 0) {
      if (++t >= F$) return arguments[0]
    } else t = 0;
    return e.apply(void 0, arguments)
  }
}
var K$ = U$,
  H$ = B$,
  G$ = K$,
  V$ = G$(H$),
  X$ = V$,
  q$ = gn,
  Y$ = M$,
  Z$ = X$;

function J$(e, t) {
  return Z$(Y$(e, t, q$), e + "")
}
var Q$ = J$,
  eT = Rc,
  tT = Pi,
  rT = Jc,
  nT = Wt;

function iT(e, t, r) {
  if (!nT(r)) return !1;
  var n = typeof t;
  return (n == "number" ? tT(r) && rT(t, r.length) : n == "string" && t in r) ? eT(r[t], e) : !1
}
var ho = iT,
  aT = Ld,
  oT = S$,
  uT = Q$,
  Fl = ho,
  cT = uT(function(e, t) {
    if (e == null) return [];
    var r = t.length;
    return r > 1 && Fl(e, t[0], t[1]) ? t = [] : r > 2 && Fl(t[0], t[1], t[2]) && (t = [t[0]]), oT(e, aT(t, 1), [])
  }),
  sT = cT;
const rs = ae(sT);

function Kn(e) {
  "@babel/helpers - typeof";
  return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Kn(e)
}

function ku() {
  return ku = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ku.apply(this, arguments)
}

function lT(e, t) {
  return dT(e) || hT(e, t) || pT(e, t) || fT()
}

function fT() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function pT(e, t) {
  if (e) {
    if (typeof e == "string") return zl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zl(e, t)
  }
}

function zl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function hT(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function dT(e) {
  if (Array.isArray(e)) return e
}

function Wl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wl(Object(r), !0).forEach(function(n) {
      vT(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function vT(e, t, r) {
  return t = yT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function yT(e) {
  var t = mT(e, "string");
  return Kn(t) == "symbol" ? t : t + ""
}

function mT(e, t) {
  if (Kn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Kn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function gT(e) {
  return Array.isArray(e) && Pe(e[0]) && Pe(e[1]) ? e.join(" ~ ") : e
}
var bT = function(t) {
  var r = t.separator,
    n = r === void 0 ? " : " : r,
    i = t.contentStyle,
    a = i === void 0 ? {} : i,
    o = t.itemStyle,
    u = o === void 0 ? {} : o,
    c = t.labelStyle,
    s = c === void 0 ? {} : c,
    f = t.payload,
    l = t.formatter,
    p = t.itemSorter,
    h = t.wrapperClassName,
    v = t.labelClassName,
    d = t.label,
    y = t.labelFormatter,
    b = t.accessibilityLayer,
    x = b === void 0 ? !1 : b,
    w = function() {
      if (f && f.length) {
        var $ = {
            padding: 0,
            margin: 0
          },
          I = (p ? rs(f, p) : f).map(function(C, j) {
            if (C.type === "none") return null;
            var k = qo({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: C.color || "#000"
              }, u),
              D = C.formatter || l || gT,
              B = C.value,
              F = C.name,
              H = B,
              q = F;
            if (D && H != null && q != null) {
              var W = D(B, F, C, j, f);
              if (Array.isArray(W)) {
                var Y = lT(W, 2);
                H = Y[0], q = Y[1]
              } else H = W
            }
            return P.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(j),
              style: k
            }, Pe(q) ? P.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, q) : null, Pe(q) ? P.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, P.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, H), P.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, C.unit || ""))
          });
        return P.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: $
        }, I)
      }
      return null
    },
    O = qo({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, a),
    m = qo({
      margin: 0
    }, s),
    g = !V(d),
    A = g ? d : "",
    _ = Z("recharts-default-tooltip", h),
    S = Z("recharts-tooltip-label", v);
  g && y && f !== void 0 && f !== null && (A = y(d, f));
  var E = x ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return P.createElement("div", ku({
    className: _,
    style: O
  }, E), P.createElement("p", {
    className: S,
    style: m
  }, P.isValidElement(A) ? A : "".concat(A)), w())
};

function Hn(e) {
  "@babel/helpers - typeof";
  return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Hn(e)
}

function Bi(e, t, r) {
  return t = xT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function xT(e) {
  var t = wT(e, "string");
  return Hn(t) == "symbol" ? t : t + ""
}

function wT(e, t) {
  if (Hn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Sn = "recharts-tooltip-wrapper",
  OT = {
    visibility: "hidden"
  };

function AT(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY;
  return Z(Sn, Bi(Bi(Bi(Bi({}, "".concat(Sn, "-right"), R(r) && t && R(t.x) && r >= t.x), "".concat(Sn, "-left"), R(r) && t && R(t.x) && r < t.x), "".concat(Sn, "-bottom"), R(n) && t && R(t.y) && n >= t.y), "".concat(Sn, "-top"), R(n) && t && R(t.y) && n < t.y))
}

function Ul(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.key,
    i = e.offsetTopLeft,
    a = e.position,
    o = e.reverseDirection,
    u = e.tooltipDimension,
    c = e.viewBox,
    s = e.viewBoxDimension;
  if (a && R(a[n])) return a[n];
  var f = r[n] - u - i,
    l = r[n] + i;
  if (t[n]) return o[n] ? f : l;
  if (o[n]) {
    var p = f,
      h = c[n];
    return p < h ? Math.max(l, c[n]) : Math.max(f, c[n])
  }
  var v = l + u,
    d = c[n] + s;
  return v > d ? Math.max(f, c[n]) : Math.max(l, c[n])
}

function PT(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  }
}

function _T(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    a = e.reverseDirection,
    o = e.tooltipBox,
    u = e.useTranslate3d,
    c = e.viewBox,
    s, f, l;
  return o.height > 0 && o.width > 0 && r ? (f = Ul({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), l = Ul({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), s = PT({
    translateX: f,
    translateY: l,
    useTranslate3d: u
  })) : s = OT, {
    cssProperties: s,
    cssClasses: AT({
      translateX: f,
      translateY: l,
      coordinate: r
    })
  }
}

function Lr(e) {
  "@babel/helpers - typeof";
  return Lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Lr(e)
}

function Kl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Hl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Kl(Object(r), !0).forEach(function(n) {
      Nu(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Kl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ST(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function $T(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Wd(n.key), n)
  }
}

function TT(e, t, r) {
  return t && $T(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ET(e, t, r) {
  return t = sa(t), jT(e, zd() ? Reflect.construct(t, r || [], sa(e).constructor) : t.apply(e, r))
}

function jT(e, t) {
  if (t && (Lr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return MT(e)
}

function MT(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function zd() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (zd = function() {
    return !!e
  })()
}

function sa(e) {
  return sa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, sa(e)
}

function CT(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Du(e, t)
}

function Du(e, t) {
  return Du = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Du(e, t)
}

function Nu(e, t, r) {
  return t = Wd(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Wd(e) {
  var t = IT(e, "string");
  return Lr(t) == "symbol" ? t : t + ""
}

function IT(e, t) {
  if (Lr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Lr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Gl = 1,
  kT = function(e) {
    function t() {
      var r;
      ST(this, t);
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
      return r = ET(this, t, [].concat(i)), Nu(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), Nu(r, "handleKeyDown", function(o) {
        if (o.key === "Escape") {
          var u, c, s, f;
          r.setState({
            dismissed: !0,
            dismissedAtCoordinate: {
              x: (u = (c = r.props.coordinate) === null || c === void 0 ? void 0 : c.x) !== null && u !== void 0 ? u : 0,
              y: (s = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && s !== void 0 ? s : 0
            }
          })
        }
      }), r
    }
    return CT(t, e), TT(t, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > Gl || Math.abs(n.height - this.state.lastBoundingBox.height) > Gl) && this.setState({
            lastBoundingBox: {
              width: n.width,
              height: n.height
            }
          })
        } else(this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
          lastBoundingBox: {
            width: -1,
            height: -1
          }
        })
      }
    }, {
      key: "componentDidMount",
      value: function() {
        document.addEventListener("keydown", this.handleKeyDown), this.updateBBox()
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        document.removeEventListener("keydown", this.handleKeyDown)
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        var n, i;
        this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1)
      }
    }, {
      key: "render",
      value: function() {
        var n = this,
          i = this.props,
          a = i.active,
          o = i.allowEscapeViewBox,
          u = i.animationDuration,
          c = i.animationEasing,
          s = i.children,
          f = i.coordinate,
          l = i.hasPayload,
          p = i.isAnimationActive,
          h = i.offset,
          v = i.position,
          d = i.reverseDirection,
          y = i.useTranslate3d,
          b = i.viewBox,
          x = i.wrapperStyle,
          w = _T({
            allowEscapeViewBox: o,
            coordinate: f,
            offsetTopLeft: h,
            position: v,
            reverseDirection: d,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: y,
            viewBox: b
          }),
          O = w.cssClasses,
          m = w.cssProperties,
          g = Hl(Hl({
            transition: p && a ? "transform ".concat(u, "ms ").concat(c) : void 0
          }, m), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && a && l ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, x);
        return P.createElement("div", {
          tabIndex: -1,
          className: O,
          style: g,
          ref: function(_) {
            n.wrapperNode = _
          }
        }, s)
      }
    }])
  }(L.PureComponent),
  DT = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  dt = {
    isSsr: DT()
  };

function Rr(e) {
  "@babel/helpers - typeof";
  return Rr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Rr(e)
}

function Vl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Xl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vl(Object(r), !0).forEach(function(n) {
      ns(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function NT(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function LT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Kd(n.key), n)
  }
}

function RT(e, t, r) {
  return t && LT(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function BT(e, t, r) {
  return t = la(t), FT(e, Ud() ? Reflect.construct(t, r || [], la(e).constructor) : t.apply(e, r))
}

function FT(e, t) {
  if (t && (Rr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return zT(e)
}

function zT(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Ud() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ud = function() {
    return !!e
  })()
}

function la(e) {
  return la = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, la(e)
}

function WT(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Lu(e, t)
}

function Lu(e, t) {
  return Lu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Lu(e, t)
}

function ns(e, t, r) {
  return t = Kd(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Kd(e) {
  var t = UT(e, "string");
  return Rr(t) == "symbol" ? t : t + ""
}

function UT(e, t) {
  if (Rr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Rr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}

function KT(e) {
  return e.dataKey
}

function HT(e, t) {
  return P.isValidElement(e) ? P.cloneElement(e, t) : typeof e == "function" ? P.createElement(e, t) : P.createElement(bT, t)
}
var yt = function(e) {
  function t() {
    return NT(this, t), BT(this, t, arguments)
  }
  return WT(t, e), RT(t, [{
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        a = i.active,
        o = i.allowEscapeViewBox,
        u = i.animationDuration,
        c = i.animationEasing,
        s = i.content,
        f = i.coordinate,
        l = i.filterNull,
        p = i.isAnimationActive,
        h = i.offset,
        v = i.payload,
        d = i.payloadUniqBy,
        y = i.position,
        b = i.reverseDirection,
        x = i.useTranslate3d,
        w = i.viewBox,
        O = i.wrapperStyle,
        m = v ?? [];
      l && m.length && (m = Id(v.filter(function(A) {
        return A.value != null && (A.hide !== !0 || n.props.includeHidden)
      }), d, KT));
      var g = m.length > 0;
      return P.createElement(kT, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: c,
        isAnimationActive: p,
        active: a,
        coordinate: f,
        hasPayload: g,
        offset: h,
        position: y,
        reverseDirection: b,
        useTranslate3d: x,
        viewBox: w,
        wrapperStyle: O
      }, HT(s, Xl(Xl({}, this.props), {}, {
        payload: m
      })))
    }
  }])
}(L.PureComponent);
ns(yt, "displayName", "Tooltip");
ns(yt, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !dt.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var GT = pt,
  VT = function() {
    return GT.Date.now()
  },
  XT = VT,
  qT = /\s/;

function YT(e) {
  for (var t = e.length; t-- && qT.test(e.charAt(t)););
  return t
}
var ZT = YT,
  JT = ZT,
  QT = /^\s+/;

function eE(e) {
  return e && e.slice(0, JT(e) + 1).replace(QT, "")
}
var tE = eE,
  rE = tE,
  ql = Wt,
  nE = ln,
  Yl = NaN,
  iE = /^[-+]0x[0-9a-f]+$/i,
  aE = /^0b[01]+$/i,
  oE = /^0o[0-7]+$/i,
  uE = parseInt;

function cE(e) {
  if (typeof e == "number") return e;
  if (nE(e)) return Yl;
  if (ql(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ql(t) ? t + "" : t
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = rE(e);
  var r = aE.test(e);
  return r || oE.test(e) ? uE(e.slice(2), r ? 2 : 8) : iE.test(e) ? Yl : +e
}
var Hd = cE,
  sE = Wt,
  Yo = XT,
  Zl = Hd,
  lE = "Expected a function",
  fE = Math.max,
  pE = Math.min;

function hE(e, t, r) {
  var n, i, a, o, u, c, s = 0,
    f = !1,
    l = !1,
    p = !0;
  if (typeof e != "function") throw new TypeError(lE);
  t = Zl(t) || 0, sE(r) && (f = !!r.leading, l = "maxWait" in r, a = l ? fE(Zl(r.maxWait) || 0, t) : a, p = "trailing" in r ? !!r.trailing : p);

  function h(g) {
    var A = n,
      _ = i;
    return n = i = void 0, s = g, o = e.apply(_, A), o
  }

  function v(g) {
    return s = g, u = setTimeout(b, t), f ? h(g) : o
  }

  function d(g) {
    var A = g - c,
      _ = g - s,
      S = t - A;
    return l ? pE(S, a - _) : S
  }

  function y(g) {
    var A = g - c,
      _ = g - s;
    return c === void 0 || A >= t || A < 0 || l && _ >= a
  }

  function b() {
    var g = Yo();
    if (y(g)) return x(g);
    u = setTimeout(b, d(g))
  }

  function x(g) {
    return u = void 0, p && n ? h(g) : (n = i = void 0, o)
  }

  function w() {
    u !== void 0 && clearTimeout(u), s = 0, n = c = i = u = void 0
  }

  function O() {
    return u === void 0 ? o : x(Yo())
  }

  function m() {
    var g = Yo(),
      A = y(g);
    if (n = arguments, i = this, c = g, A) {
      if (u === void 0) return v(c);
      if (l) return clearTimeout(u), u = setTimeout(b, t), h(c)
    }
    return u === void 0 && (u = setTimeout(b, t)), o
  }
  return m.cancel = w, m.flush = O, m
}
var dE = hE,
  vE = dE,
  yE = Wt,
  mE = "Expected a function";

function gE(e, t, r) {
  var n = !0,
    i = !0;
  if (typeof e != "function") throw new TypeError(mE);
  return yE(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), vE(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  })
}
var bE = gE;
const Gd = ae(bE);

function Gn(e) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Gn(e)
}

function Jl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Fi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jl(Object(r), !0).forEach(function(n) {
      xE(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function xE(e, t, r) {
  return t = wE(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function wE(e) {
  var t = OE(e, "string");
  return Gn(t) == "symbol" ? t : t + ""
}

function OE(e, t) {
  if (Gn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function AE(e, t) {
  return $E(e) || SE(e, t) || _E(e, t) || PE()
}

function PE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function _E(e, t) {
  if (e) {
    if (typeof e == "string") return Ql(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ql(e, t)
  }
}

function Ql(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function SE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function $E(e) {
  if (Array.isArray(e)) return e
}
var h3 = L.forwardRef(function(e, t) {
    var r = e.aspect,
      n = e.initialDimension,
      i = n === void 0 ? {
        width: -1,
        height: -1
      } : n,
      a = e.width,
      o = a === void 0 ? "100%" : a,
      u = e.height,
      c = u === void 0 ? "100%" : u,
      s = e.minWidth,
      f = s === void 0 ? 0 : s,
      l = e.minHeight,
      p = e.maxHeight,
      h = e.children,
      v = e.debounce,
      d = v === void 0 ? 0 : v,
      y = e.id,
      b = e.className,
      x = e.onResize,
      w = e.style,
      O = w === void 0 ? {} : w,
      m = L.useRef(null),
      g = L.useRef();
    g.current = x, L.useImperativeHandle(t, function() {
      return Object.defineProperty(m.current, "current", {
        get: function() {
          return m.current
        },
        configurable: !0
      })
    });
    var A = L.useState({
        containerWidth: i.width,
        containerHeight: i.height
      }),
      _ = AE(A, 2),
      S = _[0],
      E = _[1],
      T = L.useCallback(function(I, C) {
        E(function(j) {
          var k = Math.round(I),
            D = Math.round(C);
          return j.containerWidth === k && j.containerHeight === D ? j : {
            containerWidth: k,
            containerHeight: D
          }
        })
      }, []);
    L.useEffect(function() {
      var I = function(F) {
        var H, q = F[0].contentRect,
          W = q.width,
          Y = q.height;
        T(W, Y), (H = g.current) === null || H === void 0 || H.call(g, W, Y)
      };
      d > 0 && (I = Gd(I, d, {
        trailing: !0,
        leading: !1
      }));
      var C = new ResizeObserver(I),
        j = m.current.getBoundingClientRect(),
        k = j.width,
        D = j.height;
      return T(k, D), C.observe(m.current),
        function() {
          C.disconnect()
        }
    }, [T, d]);
    var $ = L.useMemo(function() {
      var I = S.containerWidth,
        C = S.containerHeight;
      if (I < 0 || C < 0) return null;
      it(nr(o) || nr(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), it(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
      var j = nr(o) ? I : o,
        k = nr(c) ? C : c;
      r && r > 0 && (j ? k = j / r : k && (j = k * r), p && k > p && (k = p)), it(j > 0 || k > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, j, k, o, c, f, l, r);
      var D = !Array.isArray(h) && Ot(h.type).endsWith("Chart");
      return P.Children.map(h, function(B) {
        return P.isValidElement(B) ? L.cloneElement(B, Fi({
          width: j,
          height: k
        }, D ? {
          style: Fi({
            height: "100%",
            width: "100%",
            maxHeight: k,
            maxWidth: j
          }, B.props.style)
        } : {})) : B
      })
    }, [r, h, c, p, l, f, S, o]);
    return P.createElement("div", {
      id: y ? "".concat(y) : void 0,
      className: Z("recharts-responsive-container", b),
      style: Fi(Fi({}, O), {}, {
        width: o,
        height: c,
        minWidth: f,
        minHeight: l,
        maxHeight: p
      }),
      ref: m
    }, $)
  }),
  vo = function(t) {
    return null
  };
vo.displayName = "Cell";

function Vn(e) {
  "@babel/helpers - typeof";
  return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vn(e)
}

function ef(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ru(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ef(Object(r), !0).forEach(function(n) {
      TE(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ef(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function TE(e, t, r) {
  return t = EE(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function EE(e) {
  var t = jE(e, "string");
  return Vn(t) == "symbol" ? t : t + ""
}

function jE(e, t) {
  if (Vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var wr = {
    widthCache: {},
    cacheCount: 0
  },
  ME = 2e3,
  CE = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  },
  tf = "recharts_measurement_span";

function IE(e) {
  var t = Ru({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r]
  }), t
}
var kn = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || dt.isSsr) return {
      width: 0,
      height: 0
    };
    var n = IE(r),
      i = JSON.stringify({
        text: t,
        copyStyle: n
      });
    if (wr.widthCache[i]) return wr.widthCache[i];
    try {
      var a = document.getElementById(tf);
      a || (a = document.createElement("span"), a.setAttribute("id", tf), a.setAttribute("aria-hidden", "true"), document.body.appendChild(a));
      var o = Ru(Ru({}, CE), n);
      Object.assign(a.style, o), a.textContent = "".concat(t);
      var u = a.getBoundingClientRect(),
        c = {
          width: u.width,
          height: u.height
        };
      return wr.widthCache[i] = c, ++wr.cacheCount > ME && (wr.cacheCount = 0, wr.widthCache = {}), c
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  kE = function(t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function Xn(e) {
  "@babel/helpers - typeof";
  return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Xn(e)
}

function fa(e, t) {
  return RE(e) || LE(e, t) || NE(e, t) || DE()
}

function DE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function NE(e, t) {
  if (e) {
    if (typeof e == "string") return rf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rf(e, t)
  }
}

function rf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function LE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1
      } else
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function RE(e) {
  if (Array.isArray(e)) return e
}

function BE(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function nf(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, zE(n.key), n)
  }
}

function FE(e, t, r) {
  return t && nf(e.prototype, t), r && nf(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function zE(e) {
  var t = WE(e, "string");
  return Xn(t) == "symbol" ? t : t + ""
}

function WE(e, t) {
  if (Xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var af = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  of = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  UE = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  KE = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  Vd = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  HE = Object.keys(Vd),
  _r = "NaN";

function GE(e, t) {
  return e * Vd[t]
}
var zi = function() {
  function e(t, r) {
    BE(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !UE.test(r) && (this.num = NaN, this.unit = ""), HE.includes(r) && (this.num = GE(t, r), this.unit = "px")
  }
  return FE(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit)
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit)
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit)
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit)
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit)
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num)
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, i = (n = KE.exec(r)) !== null && n !== void 0 ? n : [],
        a = fa(i, 3),
        o = a[1],
        u = a[2];
      return new e(parseFloat(o), u ?? "")
    }
  }])
}();

function Xd(e) {
  if (e.includes(_r)) return _r;
  for (var t = e; t.includes("*") || t.includes("/");) {
    var r, n = (r = af.exec(t)) !== null && r !== void 0 ? r : [],
      i = fa(n, 4),
      a = i[1],
      o = i[2],
      u = i[3],
      c = zi.parse(a ?? ""),
      s = zi.parse(u ?? ""),
      f = o === "*" ? c.multiply(s) : c.divide(s);
    if (f.isNaN()) return _r;
    t = t.replace(af, f.toString())
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
    var l, p = (l = of.exec(t)) !== null && l !== void 0 ? l : [],
      h = fa(p, 4),
      v = h[1],
      d = h[2],
      y = h[3],
      b = zi.parse(v ?? ""),
      x = zi.parse(y ?? ""),
      w = d === "+" ? b.add(x) : b.subtract(x);
    if (w.isNaN()) return _r;
    t = t.replace(of, w.toString())
  }
  return t
}
var uf = /\(([^()]*)\)/;

function VE(e) {
  for (var t = e; t.includes("(");) {
    var r = uf.exec(t),
      n = fa(r, 2),
      i = n[1];
    t = t.replace(uf, Xd(i))
  }
  return t
}

function XE(e) {
  var t = e.replace(/\s+/g, "");
  return t = VE(t), t = Xd(t), t
}

function qE(e) {
  try {
    return XE(e)
  } catch {
    return _r
  }
}

function Zo(e) {
  var t = qE(e.slice(5, -1));
  return t === _r ? "" : t
}
var YE = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  ZE = ["dx", "dy", "angle", "className", "breakAll"];

function Bu() {
  return Bu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Bu.apply(this, arguments)
}

function cf(e, t) {
  if (e == null) return {};
  var r = JE(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function JE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function sf(e, t) {
  return rj(e) || tj(e, t) || ej(e, t) || QE()
}

function QE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function ej(e, t) {
  if (e) {
    if (typeof e == "string") return lf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lf(e, t)
  }
}

function lf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function tj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1
      } else
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function rj(e) {
  if (Array.isArray(e)) return e
}
var qd = /[ \f\n\r\t\v\u2028\u2029]+/,
  Yd = function(t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style;
    try {
      var a = [];
      V(r) || (n ? a = r.toString().split("") : a = r.toString().split(qd));
      var o = a.map(function(c) {
          return {
            word: c,
            width: kn(c, i).width
          }
        }),
        u = n ? 0 : kn(" ", i).width;
      return {
        wordsWithComputedWidth: o,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  nj = function(t, r, n, i, a) {
    var o = t.maxLines,
      u = t.children,
      c = t.style,
      s = t.breakAll,
      f = R(o),
      l = u,
      p = function() {
        var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return j.reduce(function(k, D) {
          var B = D.word,
            F = D.width,
            H = k[k.length - 1];
          if (H && (i == null || a || H.width + F + n < Number(i))) H.words.push(B), H.width += F + n;
          else {
            var q = {
              words: [B],
              width: F
            };
            k.push(q)
          }
          return k
        }, [])
      },
      h = p(r),
      v = function(j) {
        return j.reduce(function(k, D) {
          return k.width > D.width ? k : D
        })
      };
    if (!f) return h;
    for (var d = "…", y = function(j) {
        var k = l.slice(0, j),
          D = Yd({
            breakAll: s,
            style: c,
            children: k + d
          }).wordsWithComputedWidth,
          B = p(D),
          F = B.length > o || v(B).width > Number(i);
        return [F, B]
      }, b = 0, x = l.length - 1, w = 0, O; b <= x && w <= l.length - 1;) {
      var m = Math.floor((b + x) / 2),
        g = m - 1,
        A = y(g),
        _ = sf(A, 2),
        S = _[0],
        E = _[1],
        T = y(m),
        $ = sf(T, 1),
        I = $[0];
      if (!S && !I && (b = m + 1), S && I && (x = m - 1), !S && I) {
        O = E;
        break
      }
      w++
    }
    return O || h
  },
  ff = function(t) {
    var r = V(t) ? [] : t.toString().split(qd);
    return [{
      words: r
    }]
  },
  ij = function(t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      a = t.style,
      o = t.breakAll,
      u = t.maxLines;
    if ((r || n) && !dt.isSsr) {
      var c, s, f = Yd({
        breakAll: o,
        children: i,
        style: a
      });
      if (f) {
        var l = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        c = l, s = p
      } else return ff(i);
      return nj({
        breakAll: o,
        children: i,
        maxLines: u,
        style: a
      }, c, s, r, n)
    }
    return ff(i)
  },
  pf = "#808080",
  fr = function(t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      a = i === void 0 ? 0 : i,
      o = t.lineHeight,
      u = o === void 0 ? "1em" : o,
      c = t.capHeight,
      s = c === void 0 ? "0.71em" : c,
      f = t.scaleToFit,
      l = f === void 0 ? !1 : f,
      p = t.textAnchor,
      h = p === void 0 ? "start" : p,
      v = t.verticalAnchor,
      d = v === void 0 ? "end" : v,
      y = t.fill,
      b = y === void 0 ? pf : y,
      x = cf(t, YE),
      w = L.useMemo(function() {
        return ij({
          breakAll: x.breakAll,
          children: x.children,
          maxLines: x.maxLines,
          scaleToFit: l,
          style: x.style,
          width: x.width
        })
      }, [x.breakAll, x.children, x.maxLines, l, x.style, x.width]),
      O = x.dx,
      m = x.dy,
      g = x.angle,
      A = x.className,
      _ = x.breakAll,
      S = cf(x, ZE);
    if (!Pe(n) || !Pe(a)) return null;
    var E = n + (R(O) ? O : 0),
      T = a + (R(m) ? m : 0),
      $;
    switch (d) {
      case "start":
        $ = Zo("calc(".concat(s, ")"));
        break;
      case "middle":
        $ = Zo("calc(".concat((w.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
        break;
      default:
        $ = Zo("calc(".concat(w.length - 1, " * -").concat(u, ")"));
        break
    }
    var I = [];
    if (l) {
      var C = w[0].width,
        j = x.width;
      I.push("scale(".concat((R(j) ? j / C : 1) / C, ")"))
    }
    return g && I.push("rotate(".concat(g, ", ").concat(E, ", ").concat(T, ")")), I.length && (S.transform = I.join(" ")), P.createElement("text", Bu({}, U(S, !0), {
      x: E,
      y: T,
      className: Z("recharts-text", A),
      textAnchor: h,
      fill: b.includes("url") ? pf : b
    }), w.map(function(k, D) {
      var B = k.words.join(_ ? "" : " ");
      return P.createElement("tspan", {
        x: E,
        dy: D === 0 ? $ : u,
        key: "".concat(B, "-").concat(D)
      }, B)
    }))
  };

function Bt(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function aj(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function is(e) {
  let t, r, n;
  e.length !== 2 ? (t = Bt, r = (u, c) => Bt(e(u), c), n = (u, c) => e(u) - c) : (t = e === Bt || e === aj ? e : oj, r = e, n = e);

  function i(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) < 0 ? s = l + 1 : f = l
      } while (s < f)
    }
    return s
  }

  function a(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) <= 0 ? s = l + 1 : f = l
      } while (s < f)
    }
    return s
  }

  function o(u, c, s = 0, f = u.length) {
    const l = i(u, c, s, f - 1);
    return l > s && n(u[l - 1], c) > -n(u[l], c) ? l - 1 : l
  }
  return {
    left: i,
    center: o,
    right: a
  }
}

function oj() {
  return 0
}

function Zd(e) {
  return e === null ? NaN : +e
}

function* uj(e, t) {
  for (let r of e) r != null && (r = +r) >= r && (yield r)
}
const cj = is(Bt),
  _i = cj.right;
is(Zd).center;
class hf extends Map {
  constructor(t, r = fj) {
    if (super(), Object.defineProperties(this, {
        _intern: {
          value: new Map
        },
        _key: {
          value: r
        }
      }), t != null)
      for (const [n, i] of t) this.set(n, i)
  }
  get(t) {
    return super.get(df(this, t))
  }
  has(t) {
    return super.has(df(this, t))
  }
  set(t, r) {
    return super.set(sj(this, t), r)
  }
  delete(t) {
    return super.delete(lj(this, t))
  }
}

function df({
  _intern: e,
  _key: t
}, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r
}

function sj({
  _intern: e,
  _key: t
}, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r)
}

function lj({
  _intern: e,
  _key: t
}, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r
}

function fj(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e
}

function pj(e = Bt) {
  if (e === Bt) return Jd;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0)
  }
}

function Jd(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0)
}
const hj = Math.sqrt(50),
  dj = Math.sqrt(10),
  vj = Math.sqrt(2);

function pa(e, t, r) {
  const n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    a = n / Math.pow(10, i),
    o = a >= hj ? 10 : a >= dj ? 5 : a >= vj ? 2 : 1;
  let u, c, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, u = Math.round(e * s), c = Math.round(t * s), u / s < e && ++u, c / s > t && --c, s = -s) : (s = Math.pow(10, i) * o, u = Math.round(e / s), c = Math.round(t / s), u * s < e && ++u, c * s > t && --c), c < u && .5 <= r && r < 2 ? pa(e, t, r * 2) : [u, c, s]
}

function Fu(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e,
    [i, a, o] = n ? pa(t, e, r) : pa(e, t, r);
  if (!(a >= i)) return [];
  const u = a - i + 1,
    c = new Array(u);
  if (n)
    if (o < 0)
      for (let s = 0; s < u; ++s) c[s] = (a - s) / -o;
    else
      for (let s = 0; s < u; ++s) c[s] = (a - s) * o;
  else if (o < 0)
    for (let s = 0; s < u; ++s) c[s] = (i + s) / -o;
  else
    for (let s = 0; s < u; ++s) c[s] = (i + s) * o;
  return c
}

function zu(e, t, r) {
  return t = +t, e = +e, r = +r, pa(e, t, r)[2]
}

function Wu(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e,
    i = n ? zu(t, e, r) : zu(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function vf(e, t) {
  let r;
  for (const n of e) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r
}

function yf(e, t) {
  let r;
  for (const n of e) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r
}

function Qd(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? Jd : pj(i); n > r;) {
    if (n - r > 600) {
      const c = n - r + 1,
        s = t - r + 1,
        f = Math.log(c),
        l = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * l * (c - l) / c) * (s - c / 2 < 0 ? -1 : 1),
        h = Math.max(r, Math.floor(t - s * l / c + p)),
        v = Math.min(n, Math.floor(t + (c - s) * l / c + p));
      Qd(e, t, h, v, i)
    }
    const a = e[t];
    let o = r,
      u = n;
    for ($n(e, r, t), i(e[n], a) > 0 && $n(e, r, n); o < u;) {
      for ($n(e, o, u), ++o, --u; i(e[o], a) < 0;) ++o;
      for (; i(e[u], a) > 0;) --u
    }
    i(e[r], a) === 0 ? $n(e, r, u) : (++u, $n(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1)
  }
  return e
}

function $n(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n
}

function yj(e, t, r) {
  if (e = Float64Array.from(uj(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return yf(e);
    if (t >= 1) return vf(e);
    var n, i = (n - 1) * t,
      a = Math.floor(i),
      o = vf(Qd(e, a).subarray(0, a + 1)),
      u = yf(e.subarray(a + 1));
    return o + (u - o) * (i - a)
  }
}

function mj(e, t, r = Zd) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t,
      a = Math.floor(i),
      o = +r(e[a], a, e),
      u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a)
  }
}

function gj(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i;) a[n] = e + n * r;
  return a
}

function et(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break
  }
  return this
}

function Mt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break
    }
  }
  return this
}
const Uu = Symbol("implicit");

function as() {
  var e = new hf,
    t = [],
    r = [],
    n = Uu;

  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Uu) return n;
      e.set(a, o = t.push(a) - 1)
    }
    return r[o % r.length]
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new hf;
    for (const o of a) e.has(o) || e.set(o, t.push(o) - 1);
    return i
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice()
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n
  }, i.copy = function() {
    return as(t, r).unknown(n)
  }, et.apply(i, arguments), i
}

function qn() {
  var e = as().unknown(void 0),
    t = e.domain,
    r = e.range,
    n = 0,
    i = 1,
    a, o, u = !1,
    c = 0,
    s = 0,
    f = .5;
  delete e.unknown;

  function l() {
    var p = t().length,
      h = i < n,
      v = h ? i : n,
      d = h ? n : i;
    a = (d - v) / Math.max(1, p - c + s * 2), u && (a = Math.floor(a)), v += (d - v - a * (p - c)) * f, o = a * (1 - c), u && (v = Math.round(v), o = Math.round(o));
    var y = gj(p).map(function(b) {
      return v + a * b
    });
    return r(h ? y.reverse() : y)
  }
  return e.domain = function(p) {
    return arguments.length ? (t(p), l()) : t()
  }, e.range = function(p) {
    return arguments.length ? ([n, i] = p, n = +n, i = +i, l()) : [n, i]
  }, e.rangeRound = function(p) {
    return [n, i] = p, n = +n, i = +i, u = !0, l()
  }, e.bandwidth = function() {
    return o
  }, e.step = function() {
    return a
  }, e.round = function(p) {
    return arguments.length ? (u = !!p, l()) : u
  }, e.padding = function(p) {
    return arguments.length ? (c = Math.min(1, s = +p), l()) : c
  }, e.paddingInner = function(p) {
    return arguments.length ? (c = Math.min(1, p), l()) : c
  }, e.paddingOuter = function(p) {
    return arguments.length ? (s = +p, l()) : s
  }, e.align = function(p) {
    return arguments.length ? (f = Math.max(0, Math.min(1, p)), l()) : f
  }, e.copy = function() {
    return qn(t(), [n, i]).round(u).paddingInner(c).paddingOuter(s).align(f)
  }, et.apply(l(), arguments)
}

function ev(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return ev(t())
  }, e
}

function Dn() {
  return ev(qn.apply(null, arguments).paddingInner(1))
}

function os(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e
}

function tv(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r
}

function Si() {}
var Yn = .7,
  ha = 1 / Yn,
  Cr = "\\s*([+-]?\\d+)\\s*",
  Zn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  bj = /^#([0-9a-f]{3,8})$/,
  xj = new RegExp(`^rgb\\(${Cr},${Cr},${Cr}\\)$`),
  wj = new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`),
  Oj = new RegExp(`^rgba\\(${Cr},${Cr},${Cr},${Zn}\\)$`),
  Aj = new RegExp(`^rgba\\(${ct},${ct},${ct},${Zn}\\)$`),
  Pj = new RegExp(`^hsl\\(${Zn},${ct},${ct}\\)$`),
  _j = new RegExp(`^hsla\\(${Zn},${ct},${ct},${Zn}\\)$`),
  mf = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
os(Si, Jn, {
  copy(e) {
    return Object.assign(new this.constructor, this, e)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: gf,
  formatHex: gf,
  formatHex8: Sj,
  formatHsl: $j,
  formatRgb: bf,
  toString: bf
});

function gf() {
  return this.rgb().formatHex()
}

function Sj() {
  return this.rgb().formatHex8()
}

function $j() {
  return rv(this).formatHsl()
}

function bf() {
  return this.rgb().formatRgb()
}

function Jn(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = bj.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? xf(t) : r === 3 ? new Re(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Wi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Wi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = xj.exec(e)) ? new Re(t[1], t[2], t[3], 1) : (t = wj.exec(e)) ? new Re(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Oj.exec(e)) ? Wi(t[1], t[2], t[3], t[4]) : (t = Aj.exec(e)) ? Wi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Pj.exec(e)) ? Af(t[1], t[2] / 100, t[3] / 100, 1) : (t = _j.exec(e)) ? Af(t[1], t[2] / 100, t[3] / 100, t[4]) : mf.hasOwnProperty(e) ? xf(mf[e]) : e === "transparent" ? new Re(NaN, NaN, NaN, 0) : null
}

function xf(e) {
  return new Re(e >> 16 & 255, e >> 8 & 255, e & 255, 1)
}

function Wi(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Re(e, t, r, n)
}

function Tj(e) {
  return e instanceof Si || (e = Jn(e)), e ? (e = e.rgb(), new Re(e.r, e.g, e.b, e.opacity)) : new Re
}

function Ku(e, t, r, n) {
  return arguments.length === 1 ? Tj(e) : new Re(e, t, r, n ?? 1)
}

function Re(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n
}
os(Re, Ku, tv(Si, {
  brighter(e) {
    return e = e == null ? ha : Math.pow(ha, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? Yn : Math.pow(Yn, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new Re(cr(this.r), cr(this.g), cr(this.b), da(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: wf,
  formatHex: wf,
  formatHex8: Ej,
  formatRgb: Of,
  toString: Of
}));

function wf() {
  return `#${ir(this.r)}${ir(this.g)}${ir(this.b)}`
}

function Ej() {
  return `#${ir(this.r)}${ir(this.g)}${ir(this.b)}${ir((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function Of() {
  const e = da(this.opacity);
  return `${e===1?"rgb(":"rgba("}${cr(this.r)}, ${cr(this.g)}, ${cr(this.b)}${e===1?")":`, ${e})`}`
}

function da(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}

function cr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0))
}

function ir(e) {
  return e = cr(e), (e < 16 ? "0" : "") + e.toString(16)
}

function Af(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new nt(e, t, r, n)
}

function rv(e) {
  if (e instanceof nt) return new nt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Si || (e = Jn(e)), !e) return new nt;
  if (e instanceof nt) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    a = Math.max(t, r, n),
    o = NaN,
    u = a - i,
    c = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= c < .5 ? a + i : 2 - a - i, o *= 60) : u = c > 0 && c < 1 ? 0 : o, new nt(o, u, c, e.opacity)
}

function jj(e, t, r, n) {
  return arguments.length === 1 ? rv(e) : new nt(e, t, r, n ?? 1)
}

function nt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n
}
os(nt, jj, tv(Si, {
  brighter(e) {
    return e = e == null ? ha : Math.pow(ha, e), new nt(this.h, this.s, this.l * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? Yn : Math.pow(Yn, e), new nt(this.h, this.s, this.l * e, this.opacity)
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360,
      t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * t,
      i = 2 * r - n;
    return new Re(Jo(e >= 240 ? e - 240 : e + 120, i, n), Jo(e, i, n), Jo(e < 120 ? e + 240 : e - 120, i, n), this.opacity)
  },
  clamp() {
    return new nt(Pf(this.h), Ui(this.s), Ui(this.l), da(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    const e = da(this.opacity);
    return `${e===1?"hsl(":"hsla("}${Pf(this.h)}, ${Ui(this.s)*100}%, ${Ui(this.l)*100}%${e===1?")":`, ${e})`}`
  }
}));

function Pf(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e
}

function Ui(e) {
  return Math.max(0, Math.min(1, e || 0))
}

function Jo(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255
}
const us = e => () => e;

function Mj(e, t) {
  return function(r) {
    return e + r * t
  }
}

function Cj(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r,
    function(n) {
      return Math.pow(e + n * t, r)
    }
}

function Ij(e) {
  return (e = +e) == 1 ? nv : function(t, r) {
    return r - t ? Cj(t, r, e) : us(isNaN(t) ? r : t)
  }
}

function nv(e, t) {
  var r = t - e;
  return r ? Mj(e, r) : us(isNaN(e) ? t : e)
}
const _f = function e(t) {
  var r = Ij(t);

  function n(i, a) {
    var o = r((i = Ku(i)).r, (a = Ku(a)).r),
      u = r(i.g, a.g),
      c = r(i.b, a.b),
      s = nv(i.opacity, a.opacity);
    return function(f) {
      return i.r = o(f), i.g = u(f), i.b = c(f), i.opacity = s(f), i + ""
    }
  }
  return n.gamma = e, n
}(1);

function kj(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n
  }
}

function Dj(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}

function Nj(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    a = new Array(r),
    o;
  for (o = 0; o < n; ++o) i[o] = bn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a
  }
}

function Lj(e, t) {
  var r = new Date;
  return e = +e, t = +t,
    function(n) {
      return r.setTime(e * (1 - n) + t * n), r
    }
}

function va(e, t) {
  return e = +e, t = +t,
    function(r) {
      return e * (1 - r) + t * r
    }
}

function Rj(e, t) {
  var r = {},
    n = {},
    i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? r[i] = bn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n
  }
}
var Hu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Qo = new RegExp(Hu.source, "g");

function Bj(e) {
  return function() {
    return e
  }
}

function Fj(e) {
  return function(t) {
    return e(t) + ""
  }
}

function zj(e, t) {
  var r = Hu.lastIndex = Qo.lastIndex = 0,
    n, i, a, o = -1,
    u = [],
    c = [];
  for (e = e + "", t = t + "";
    (n = Hu.exec(e)) && (i = Qo.exec(t));)(a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, c.push({
    i: o,
    x: va(n, i)
  })), r = Qo.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? c[0] ? Fj(c[0].x) : Bj(t) : (t = c.length, function(s) {
    for (var f = 0, l; f < t; ++f) u[(l = c[f]).i] = l.x(s);
    return u.join("")
  })
}

function bn(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean" ? us(t) : (r === "number" ? va : r === "string" ? (n = Jn(t)) ? (t = n, _f) : zj : t instanceof Jn ? _f : t instanceof Date ? Lj : Dj(t) ? kj : Array.isArray(t) ? Nj : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Rj : va)(e, t)
}

function cs(e, t) {
  return e = +e, t = +t,
    function(r) {
      return Math.round(e * (1 - r) + t * r)
    }
}

function Wj(e, t) {
  t === void 0 && (t = e, e = bn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n;) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u)
  }
}

function Uj(e) {
  return function() {
    return e
  }
}

function ya(e) {
  return +e
}
var Sf = [0, 1];

function ke(e) {
  return e
}

function Gu(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t
  } : Uj(isNaN(t) ? NaN : .5)
}

function Kj(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r),
    function(n) {
      return Math.max(e, Math.min(t, n))
    }
}

function Hj(e, t, r) {
  var n = e[0],
    i = e[1],
    a = t[0],
    o = t[1];
  return i < n ? (n = Gu(i, n), a = r(o, a)) : (n = Gu(n, i), a = r(a, o)),
    function(u) {
      return a(n(u))
    }
}

function Gj(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    a = new Array(n),
    o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n;) i[o] = Gu(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var c = _i(e, u, 1, n) - 1;
    return a[c](i[c](u))
  }
}

function $i(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())
}

function yo() {
  var e = Sf,
    t = Sf,
    r = bn,
    n, i, a, o = ke,
    u, c, s;

  function f() {
    var p = Math.min(e.length, t.length);
    return o !== ke && (o = Kj(e[0], e[p - 1])), u = p > 2 ? Gj : Hj, c = s = null, l
  }

  function l(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = u(e.map(n), t, r)))(n(o(p)))
  }
  return l.invert = function(p) {
      return o(i((s || (s = u(t, e.map(n), va)))(p)))
    }, l.domain = function(p) {
      return arguments.length ? (e = Array.from(p, ya), f()) : e.slice()
    }, l.range = function(p) {
      return arguments.length ? (t = Array.from(p), f()) : t.slice()
    }, l.rangeRound = function(p) {
      return t = Array.from(p), r = cs, f()
    }, l.clamp = function(p) {
      return arguments.length ? (o = p ? !0 : ke, f()) : o !== ke
    }, l.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, l.unknown = function(p) {
      return arguments.length ? (a = p, l) : a
    },
    function(p, h) {
      return n = p, i = h, f()
    }
}

function ss() {
  return yo()(ke, ke)
}

function Vj(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10)
}

function ma(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"),
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)]
}

function Br(e) {
  return e = ma(Math.abs(e)), e ? e[1] : NaN
}

function Xj(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], c = 0; i > 0 && u > 0 && (c + u + 1 > n && (u = Math.max(1, n - c)), a.push(r.substring(i -= u, i + u)), !((c += u + 1) > n));) u = e[o = (o + 1) % e.length];
    return a.reverse().join(t)
  }
}

function qj(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r]
    })
  }
}
var Yj = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function Qn(e) {
  if (!(t = Yj.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new ls({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  })
}
Qn.prototype = ls.prototype;

function ls(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + ""
}
ls.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function Zj(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r) switch (e[r]) {
    case ".":
      n = i = r;
      break;
    case "0":
      n === 0 && (n = r), i = r;
      break;
    default:
      if (!+e[r]) break e;
      n > 0 && (n = 0);
      break
  }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e
}
var ga;

function Jj(e, t) {
  var r = ma(e, t);
  if (!r) return ga = void 0, e.toPrecision(t);
  var n = r[0],
    i = r[1],
    a = i - (ga = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + ma(e, Math.max(0, t + a - 1))[0]
}

function $f(e, t) {
  var r = ma(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
const Tf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: e => Math.round(e).toString(2),
  c: e => e + "",
  d: Vj,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: e => Math.round(e).toString(8),
  p: (e, t) => $f(e * 100, t),
  r: $f,
  s: Jj,
  X: e => Math.round(e).toString(16).toUpperCase(),
  x: e => Math.round(e).toString(16)
};

function Ef(e) {
  return e
}
var jf = Array.prototype.map,
  Mf = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function Qj(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Ef : Xj(jf.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    a = e.numerals === void 0 ? Ef : qj(jf.call(e.numerals, String)),
    o = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "−" : e.minus + "",
    c = e.nan === void 0 ? "NaN" : e.nan + "";

  function s(l, p) {
    l = Qn(l);
    var h = l.fill,
      v = l.align,
      d = l.sign,
      y = l.symbol,
      b = l.zero,
      x = l.width,
      w = l.comma,
      O = l.precision,
      m = l.trim,
      g = l.type;
    g === "n" ? (w = !0, g = "g") : Tf[g] || (O === void 0 && (O = 12), m = !0, g = "g"), (b || h === "0" && v === "=") && (b = !0, h = "0", v = "=");
    var A = (p && p.prefix !== void 0 ? p.prefix : "") + (y === "$" ? r : y === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""),
      _ = (y === "$" ? n : /[%p]/.test(g) ? o : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      S = Tf[g],
      E = /[defgprs%]/.test(g);
    O = O === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, O)) : Math.max(0, Math.min(20, O));

    function T($) {
      var I = A,
        C = _,
        j, k, D;
      if (g === "c") C = S($) + C, $ = "";
      else {
        $ = +$;
        var B = $ < 0 || 1 / $ < 0;
        if ($ = isNaN($) ? c : S(Math.abs($), O), m && ($ = Zj($)), B && +$ == 0 && d !== "+" && (B = !1), I = (B ? d === "(" ? d : u : d === "-" || d === "(" ? "" : d) + I, C = (g === "s" && !isNaN($) && ga !== void 0 ? Mf[8 + ga / 3] : "") + C + (B && d === "(" ? ")" : ""), E) {
          for (j = -1, k = $.length; ++j < k;)
            if (D = $.charCodeAt(j), 48 > D || D > 57) {
              C = (D === 46 ? i + $.slice(j + 1) : $.slice(j)) + C, $ = $.slice(0, j);
              break
            }
        }
      }
      w && !b && ($ = t($, 1 / 0));
      var F = I.length + $.length + C.length,
        H = F < x ? new Array(x - F + 1).join(h) : "";
      switch (w && b && ($ = t(H + $, H.length ? x - C.length : 1 / 0), H = ""), v) {
        case "<":
          $ = I + $ + C + H;
          break;
        case "=":
          $ = I + H + $ + C;
          break;
        case "^":
          $ = H.slice(0, F = H.length >> 1) + I + $ + C + H.slice(F);
          break;
        default:
          $ = H + I + $ + C;
          break
      }
      return a($)
    }
    return T.toString = function() {
      return l + ""
    }, T
  }

  function f(l, p) {
    var h = Math.max(-8, Math.min(8, Math.floor(Br(p) / 3))) * 3,
      v = Math.pow(10, -h),
      d = s((l = Qn(l), l.type = "f", l), {
        suffix: Mf[8 + h / 3]
      });
    return function(y) {
      return d(v * y)
    }
  }
  return {
    format: s,
    formatPrefix: f
  }
}
var Ki, fs, iv;
eM({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function eM(e) {
  return Ki = Qj(e), fs = Ki.format, iv = Ki.formatPrefix, Ki
}

function tM(e) {
  return Math.max(0, -Br(Math.abs(e)))
}

function rM(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Br(t) / 3))) * 3 - Br(Math.abs(e)))
}

function nM(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Br(t) - Br(e)) + 1
}

function av(e, t, r, n) {
  var i = Wu(e, t, r),
    a;
  switch (n = Qn(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = rM(i, o)) && (n.precision = a), iv(n, o)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = nM(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = tM(i)) && (n.precision = a - (n.type === "%") * 2);
      break
    }
  }
  return fs(n)
}

function Kt(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Fu(n[0], n[n.length - 1], r ?? 10)
  }, e.tickFormat = function(r, n) {
    var i = t();
    return av(i[0], i[i.length - 1], r ?? 10, n)
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(),
      i = 0,
      a = n.length - 1,
      o = n[i],
      u = n[a],
      c, s, f = 10;
    for (u < o && (s = o, o = u, u = s, s = i, i = a, a = s); f-- > 0;) {
      if (s = zu(o, u, r), s === c) return n[i] = o, n[a] = u, t(n);
      if (s > 0) o = Math.floor(o / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0) o = Math.ceil(o * s) / s, u = Math.floor(u * s) / s;
      else break;
      c = s
    }
    return e
  }, e
}

function ba() {
  var e = ss();
  return e.copy = function() {
    return $i(e, ba())
  }, et.apply(e, arguments), Kt(e)
}

function ov(e) {
  var t;

  function r(n) {
    return n == null || isNaN(n = +n) ? t : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, ya), r) : e.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.copy = function() {
    return ov(e).unknown(t)
  }, e = arguments.length ? Array.from(e, ya) : [0, 1], Kt(r)
}

function uv(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    i = e[r],
    a = e[n],
    o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e
}

function Cf(e) {
  return Math.log(e)
}

function If(e) {
  return Math.exp(e)
}

function iM(e) {
  return -Math.log(-e)
}

function aM(e) {
  return -Math.exp(-e)
}

function oM(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e
}

function uM(e) {
  return e === 10 ? oM : e === Math.E ? Math.exp : t => Math.pow(e, t)
}

function cM(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), t => Math.log(t) / e)
}

function kf(e) {
  return (t, r) => -e(-t, r)
}

function ps(e) {
  const t = e(Cf, If),
    r = t.domain;
  let n = 10,
    i, a;

  function o() {
    return i = cM(n), a = uM(n), r()[0] < 0 ? (i = kf(i), a = kf(a), e(iM, aM)) : e(Cf, If), t
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r()
  }, t.ticks = u => {
    const c = r();
    let s = c[0],
      f = c[c.length - 1];
    const l = f < s;
    l && ([s, f] = [f, s]);
    let p = i(s),
      h = i(f),
      v, d;
    const y = u == null ? 10 : +u;
    let b = [];
    if (!(n % 1) && h - p < y) {
      if (p = Math.floor(p), h = Math.ceil(h), s > 0) {
        for (; p <= h; ++p)
          for (v = 1; v < n; ++v)
            if (d = p < 0 ? v / a(-p) : v * a(p), !(d < s)) {
              if (d > f) break;
              b.push(d)
            }
      } else
        for (; p <= h; ++p)
          for (v = n - 1; v >= 1; --v)
            if (d = p > 0 ? v / a(-p) : v * a(p), !(d < s)) {
              if (d > f) break;
              b.push(d)
            } b.length * 2 < y && (b = Fu(s, f, y))
    } else b = Fu(p, h, Math.min(h - p, y)).map(a);
    return l ? b.reverse() : b
  }, t.tickFormat = (u, c) => {
    if (u == null && (u = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = Qn(c)).precision == null && (c.trim = !0), c = fs(c)), u === 1 / 0) return c;
    const s = Math.max(1, n * u / t.ticks().length);
    return f => {
      let l = f / a(Math.round(i(f)));
      return l * n < n - .5 && (l *= n), l <= s ? c(f) : ""
    }
  }, t.nice = () => r(uv(r(), {
    floor: u => a(Math.floor(i(u))),
    ceil: u => a(Math.ceil(i(u)))
  })), t
}

function cv() {
  const e = ps(yo()).domain([1, 10]);
  return e.copy = () => $i(e, cv()).base(e.base()), et.apply(e, arguments), e
}

function Df(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e))
  }
}

function Nf(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e
  }
}

function hs(e) {
  var t = 1,
    r = e(Df(t), Nf(t));
  return r.constant = function(n) {
    return arguments.length ? e(Df(t = +n), Nf(t)) : t
  }, Kt(r)
}

function sv() {
  var e = hs(yo());
  return e.copy = function() {
    return $i(e, sv()).constant(e.constant())
  }, et.apply(e, arguments)
}

function Lf(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
  }
}

function sM(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e)
}

function lM(e) {
  return e < 0 ? -e * e : e * e
}

function ds(e) {
  var t = e(ke, ke),
    r = 1;

  function n() {
    return r === 1 ? e(ke, ke) : r === .5 ? e(sM, lM) : e(Lf(r), Lf(1 / r))
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, Kt(t)
}

function vs() {
  var e = ds(yo());
  return e.copy = function() {
    return $i(e, vs()).exponent(e.exponent())
  }, et.apply(e, arguments), e
}

function fM() {
  return vs.apply(null, arguments).exponent(.5)
}

function Rf(e) {
  return Math.sign(e) * e * e
}

function pM(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e))
}

function lv() {
  var e = ss(),
    t = [0, 1],
    r = !1,
    n;

  function i(a) {
    var o = pM(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o
  }
  return i.invert = function(a) {
    return e.invert(Rf(a))
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain()
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, ya)).map(Rf)), i) : t.slice()
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0)
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp()
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n
  }, i.copy = function() {
    return lv(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)
  }, et.apply(i, arguments), Kt(i)
}

function fv() {
  var e = [],
    t = [],
    r = [],
    n;

  function i() {
    var o = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u;) r[o - 1] = mj(e, o / u);
    return a
  }

  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[_i(r, o)]
  }
  return a.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]]
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(Bt), i()
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice()
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n
  }, a.quantiles = function() {
    return r.slice()
  }, a.copy = function() {
    return fv().domain(e).range(t).unknown(n)
  }, et.apply(a, arguments)
}

function pv() {
  var e = 0,
    t = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    a;

  function o(c) {
    return c != null && c <= c ? i[_i(n, c, 0, r)] : a
  }

  function u() {
    var c = -1;
    for (n = new Array(r); ++c < r;) n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
    return o
  }
  return o.domain = function(c) {
    return arguments.length ? ([e, t] = c, e = +e, t = +t, u()) : [e, t]
  }, o.range = function(c) {
    return arguments.length ? (r = (i = Array.from(c)).length - 1, u()) : i.slice()
  }, o.invertExtent = function(c) {
    var s = i.indexOf(c);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]]
  }, o.unknown = function(c) {
    return arguments.length && (a = c), o
  }, o.thresholds = function() {
    return n.slice()
  }, o.copy = function() {
    return pv().domain([e, t]).range(i).unknown(a)
  }, et.apply(Kt(o), arguments)
}

function hv() {
  var e = [.5],
    t = [0, 1],
    r, n = 1;

  function i(a) {
    return a != null && a <= a ? t[_i(e, a, 0, n)] : r
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice()
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice()
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]]
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r
  }, i.copy = function() {
    return hv().domain(e).range(t).unknown(r)
  }, et.apply(i, arguments)
}
const eu = new Date,
  tu = new Date;

function _e(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? new Date : new Date(+a)), a
  }
  return i.floor = a => (e(a = new Date(+a)), a), i.ceil = a => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = a => {
    const o = i(a),
      u = i.ceil(a);
    return a - o < u - a ? o : u
  }, i.offset = (a, o) => (t(a = new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, u) => {
    const c = [];
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return c;
    let s;
    do c.push(s = new Date(+a)), t(a, u), e(a); while (s < a && a < o);
    return c
  }, i.filter = a => _e(o => {
    if (o >= o)
      for (; e(o), !a(o);) o.setTime(o - 1)
  }, (o, u) => {
    if (o >= o)
      if (u < 0)
        for (; ++u <= 0;)
          for (; t(o, -1), !a(o););
      else
        for (; --u >= 0;)
          for (; t(o, 1), !a(o););
  }), r && (i.count = (a, o) => (eu.setTime(+a), tu.setTime(+o), e(eu), e(tu), Math.floor(r(eu, tu))), i.every = a => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? o => n(o) % a === 0 : o => i.count(0, o) % a === 0) : i)), i
}
const xa = _e(() => {}, (e, t) => {
  e.setTime(+e + t)
}, (e, t) => t - e);
xa.every = e => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? _e(t => {
  t.setTime(Math.floor(t / e) * e)
}, (t, r) => {
  t.setTime(+t + r * e)
}, (t, r) => (r - t) / e) : xa);
xa.range;
const bt = 1e3,
  Ze = bt * 60,
  xt = Ze * 60,
  Pt = xt * 24,
  ys = Pt * 7,
  Bf = Pt * 30,
  ru = Pt * 365,
  ar = _e(e => {
    e.setTime(e - e.getMilliseconds())
  }, (e, t) => {
    e.setTime(+e + t * bt)
  }, (e, t) => (t - e) / bt, e => e.getUTCSeconds());
ar.range;
const ms = _e(e => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * bt)
}, (e, t) => {
  e.setTime(+e + t * Ze)
}, (e, t) => (t - e) / Ze, e => e.getMinutes());
ms.range;
const gs = _e(e => {
  e.setUTCSeconds(0, 0)
}, (e, t) => {
  e.setTime(+e + t * Ze)
}, (e, t) => (t - e) / Ze, e => e.getUTCMinutes());
gs.range;
const bs = _e(e => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * bt - e.getMinutes() * Ze)
}, (e, t) => {
  e.setTime(+e + t * xt)
}, (e, t) => (t - e) / xt, e => e.getHours());
bs.range;
const xs = _e(e => {
  e.setUTCMinutes(0, 0, 0)
}, (e, t) => {
  e.setTime(+e + t * xt)
}, (e, t) => (t - e) / xt, e => e.getUTCHours());
xs.range;
const Ti = _e(e => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ze) / Pt, e => e.getDate() - 1);
Ti.range;
const mo = _e(e => {
  e.setUTCHours(0, 0, 0, 0)
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t)
}, (e, t) => (t - e) / Pt, e => e.getUTCDate() - 1);
mo.range;
const dv = _e(e => {
  e.setUTCHours(0, 0, 0, 0)
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t)
}, (e, t) => (t - e) / Pt, e => Math.floor(e / Pt));
dv.range;

function yr(e) {
  return _e(t => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7)
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ze) / ys)
}
const go = yr(0),
  wa = yr(1),
  hM = yr(2),
  dM = yr(3),
  Fr = yr(4),
  vM = yr(5),
  yM = yr(6);
go.range;
wa.range;
hM.range;
dM.range;
Fr.range;
vM.range;
yM.range;

function mr(e) {
  return _e(t => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7)
  }, (t, r) => (r - t) / ys)
}
const bo = mr(0),
  Oa = mr(1),
  mM = mr(2),
  gM = mr(3),
  zr = mr(4),
  bM = mr(5),
  xM = mr(6);
bo.range;
Oa.range;
mM.range;
gM.range;
zr.range;
bM.range;
xM.range;
const ws = _e(e => {
  e.setDate(1), e.setHours(0, 0, 0, 0)
}, (e, t) => {
  e.setMonth(e.getMonth() + t)
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, e => e.getMonth());
ws.range;
const Os = _e(e => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t)
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, e => e.getUTCMonth());
Os.range;
const _t = _e(e => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t)
}, (e, t) => t.getFullYear() - e.getFullYear(), e => e.getFullYear());
_t.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : _e(t => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e)
});
_t.range;
const St = _e(e => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t)
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), e => e.getUTCFullYear());
St.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : _e(t => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e)
});
St.range;

function vv(e, t, r, n, i, a) {
  const o = [
    [ar, 1, bt],
    [ar, 5, 5 * bt],
    [ar, 15, 15 * bt],
    [ar, 30, 30 * bt],
    [a, 1, Ze],
    [a, 5, 5 * Ze],
    [a, 15, 15 * Ze],
    [a, 30, 30 * Ze],
    [i, 1, xt],
    [i, 3, 3 * xt],
    [i, 6, 6 * xt],
    [i, 12, 12 * xt],
    [n, 1, Pt],
    [n, 2, 2 * Pt],
    [r, 1, ys],
    [t, 1, Bf],
    [t, 3, 3 * Bf],
    [e, 1, ru]
  ];

  function u(s, f, l) {
    const p = f < s;
    p && ([s, f] = [f, s]);
    const h = l && typeof l.range == "function" ? l : c(s, f, l),
      v = h ? h.range(s, +f + 1) : [];
    return p ? v.reverse() : v
  }

  function c(s, f, l) {
    const p = Math.abs(f - s) / l,
      h = is(([, , y]) => y).right(o, p);
    if (h === o.length) return e.every(Wu(s / ru, f / ru, l));
    if (h === 0) return xa.every(Math.max(Wu(s, f, l), 1));
    const [v, d] = o[p / o[h - 1][2] < o[h][2] / p ? h - 1 : h];
    return v.every(d)
  }
  return [u, c]
}
const [wM, OM] = vv(St, Os, bo, dv, xs, gs), [AM, PM] = vv(_t, ws, go, Ti, bs, ms);

function nu(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
}

function iu(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
}

function Tn(e, t, r) {
  return {
    y: e,
    m: t,
    d: r,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  }
}

function _M(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    a = e.days,
    o = e.shortDays,
    u = e.months,
    c = e.shortMonths,
    s = En(i),
    f = jn(i),
    l = En(a),
    p = jn(a),
    h = En(o),
    v = jn(o),
    d = En(u),
    y = jn(u),
    b = En(c),
    x = jn(c),
    w = {
      a: D,
      A: B,
      b: F,
      B: H,
      c: null,
      d: Hf,
      e: Hf,
      f: XM,
      g: iC,
      G: oC,
      H: HM,
      I: GM,
      j: VM,
      L: yv,
      m: qM,
      M: YM,
      p: q,
      q: W,
      Q: Xf,
      s: qf,
      S: ZM,
      u: JM,
      U: QM,
      V: eC,
      w: tC,
      W: rC,
      x: null,
      X: null,
      y: nC,
      Y: aC,
      Z: uC,
      "%": Vf
    },
    O = {
      a: Y,
      A: fe,
      b: me,
      B: Fe,
      c: null,
      d: Gf,
      e: Gf,
      f: fC,
      g: wC,
      G: AC,
      H: cC,
      I: sC,
      j: lC,
      L: gv,
      m: pC,
      M: hC,
      p: Vt,
      q: Ne,
      Q: Xf,
      s: qf,
      S: dC,
      u: vC,
      U: yC,
      V: mC,
      w: gC,
      W: bC,
      x: null,
      X: null,
      y: xC,
      Y: OC,
      Z: PC,
      "%": Vf
    },
    m = {
      a: E,
      A: T,
      b: $,
      B: I,
      c: C,
      d: Uf,
      e: Uf,
      f: zM,
      g: Wf,
      G: zf,
      H: Kf,
      I: Kf,
      j: LM,
      L: FM,
      m: NM,
      M: RM,
      p: S,
      q: DM,
      Q: UM,
      s: KM,
      S: BM,
      u: jM,
      U: MM,
      V: CM,
      w: EM,
      W: IM,
      x: j,
      X: k,
      y: Wf,
      Y: zf,
      Z: kM,
      "%": WM
    };
  w.x = g(r, w), w.X = g(n, w), w.c = g(t, w), O.x = g(r, O), O.X = g(n, O), O.c = g(t, O);

  function g(z, Q) {
    return function(ee) {
      var N = [],
        ve = -1,
        te = 0,
        xe = z.length,
        we, Le, Ct;
      for (ee instanceof Date || (ee = new Date(+ee)); ++ve < xe;) z.charCodeAt(ve) === 37 && (N.push(z.slice(te, ve)), (Le = Ff[we = z.charAt(++ve)]) != null ? we = z.charAt(++ve) : Le = we === "e" ? " " : "0", (Ct = Q[we]) && (we = Ct(ee, Le)), N.push(we), te = ve + 1);
      return N.push(z.slice(te, ve)), N.join("")
    }
  }

  function A(z, Q) {
    return function(ee) {
      var N = Tn(1900, void 0, 1),
        ve = _(N, z, ee += "", 0),
        te, xe;
      if (ve != ee.length) return null;
      if ("Q" in N) return new Date(N.Q);
      if ("s" in N) return new Date(N.s * 1e3 + ("L" in N ? N.L : 0));
      if (Q && !("Z" in N) && (N.Z = 0), "p" in N && (N.H = N.H % 12 + N.p * 12), N.m === void 0 && (N.m = "q" in N ? N.q : 0), "V" in N) {
        if (N.V < 1 || N.V > 53) return null;
        "w" in N || (N.w = 1), "Z" in N ? (te = iu(Tn(N.y, 0, 1)), xe = te.getUTCDay(), te = xe > 4 || xe === 0 ? Oa.ceil(te) : Oa(te), te = mo.offset(te, (N.V - 1) * 7), N.y = te.getUTCFullYear(), N.m = te.getUTCMonth(), N.d = te.getUTCDate() + (N.w + 6) % 7) : (te = nu(Tn(N.y, 0, 1)), xe = te.getDay(), te = xe > 4 || xe === 0 ? wa.ceil(te) : wa(te), te = Ti.offset(te, (N.V - 1) * 7), N.y = te.getFullYear(), N.m = te.getMonth(), N.d = te.getDate() + (N.w + 6) % 7)
      } else("W" in N || "U" in N) && ("w" in N || (N.w = "u" in N ? N.u % 7 : "W" in N ? 1 : 0), xe = "Z" in N ? iu(Tn(N.y, 0, 1)).getUTCDay() : nu(Tn(N.y, 0, 1)).getDay(), N.m = 0, N.d = "W" in N ? (N.w + 6) % 7 + N.W * 7 - (xe + 5) % 7 : N.w + N.U * 7 - (xe + 6) % 7);
      return "Z" in N ? (N.H += N.Z / 100 | 0, N.M += N.Z % 100, iu(N)) : nu(N)
    }
  }

  function _(z, Q, ee, N) {
    for (var ve = 0, te = Q.length, xe = ee.length, we, Le; ve < te;) {
      if (N >= xe) return -1;
      if (we = Q.charCodeAt(ve++), we === 37) {
        if (we = Q.charAt(ve++), Le = m[we in Ff ? Q.charAt(ve++) : we], !Le || (N = Le(z, ee, N)) < 0) return -1
      } else if (we != ee.charCodeAt(N++)) return -1
    }
    return N
  }

  function S(z, Q, ee) {
    var N = s.exec(Q.slice(ee));
    return N ? (z.p = f.get(N[0].toLowerCase()), ee + N[0].length) : -1
  }

  function E(z, Q, ee) {
    var N = h.exec(Q.slice(ee));
    return N ? (z.w = v.get(N[0].toLowerCase()), ee + N[0].length) : -1
  }

  function T(z, Q, ee) {
    var N = l.exec(Q.slice(ee));
    return N ? (z.w = p.get(N[0].toLowerCase()), ee + N[0].length) : -1
  }

  function $(z, Q, ee) {
    var N = b.exec(Q.slice(ee));
    return N ? (z.m = x.get(N[0].toLowerCase()), ee + N[0].length) : -1
  }

  function I(z, Q, ee) {
    var N = d.exec(Q.slice(ee));
    return N ? (z.m = y.get(N[0].toLowerCase()), ee + N[0].length) : -1
  }

  function C(z, Q, ee) {
    return _(z, t, Q, ee)
  }

  function j(z, Q, ee) {
    return _(z, r, Q, ee)
  }

  function k(z, Q, ee) {
    return _(z, n, Q, ee)
  }

  function D(z) {
    return o[z.getDay()]
  }

  function B(z) {
    return a[z.getDay()]
  }

  function F(z) {
    return c[z.getMonth()]
  }

  function H(z) {
    return u[z.getMonth()]
  }

  function q(z) {
    return i[+(z.getHours() >= 12)]
  }

  function W(z) {
    return 1 + ~~(z.getMonth() / 3)
  }

  function Y(z) {
    return o[z.getUTCDay()]
  }

  function fe(z) {
    return a[z.getUTCDay()]
  }

  function me(z) {
    return c[z.getUTCMonth()]
  }

  function Fe(z) {
    return u[z.getUTCMonth()]
  }

  function Vt(z) {
    return i[+(z.getUTCHours() >= 12)]
  }

  function Ne(z) {
    return 1 + ~~(z.getUTCMonth() / 3)
  }
  return {
    format: function(z) {
      var Q = g(z += "", w);
      return Q.toString = function() {
        return z
      }, Q
    },
    parse: function(z) {
      var Q = A(z += "", !1);
      return Q.toString = function() {
        return z
      }, Q
    },
    utcFormat: function(z) {
      var Q = g(z += "", O);
      return Q.toString = function() {
        return z
      }, Q
    },
    utcParse: function(z) {
      var Q = A(z += "", !0);
      return Q.toString = function() {
        return z
      }, Q
    }
  }
}
var Ff = {
    "-": "",
    _: " ",
    0: "0"
  },
  Te = /^\s*\d+/,
  SM = /^%/,
  $M = /[\\^$*+?|[\]().{}]/g;

function re(e, t, r) {
  var n = e < 0 ? "-" : "",
    i = (n ? -e : e) + "",
    a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i)
}

function TM(e) {
  return e.replace($M, "\\$&")
}

function En(e) {
  return new RegExp("^(?:" + e.map(TM).join("|") + ")", "i")
}

function jn(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]))
}

function EM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1
}

function jM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1
}

function MM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1
}

function CM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1
}

function IM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1
}

function zf(e, t, r) {
  var n = Te.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1
}

function Wf(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function kM(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function DM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function NM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1
}

function Uf(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1
}

function LM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1
}

function Kf(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1
}

function RM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1
}

function BM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1
}

function FM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1
}

function zM(e, t, r) {
  var n = Te.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function WM(e, t, r) {
  var n = SM.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function UM(e, t, r) {
  var n = Te.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1
}

function KM(e, t, r) {
  var n = Te.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1
}

function Hf(e, t) {
  return re(e.getDate(), t, 2)
}

function HM(e, t) {
  return re(e.getHours(), t, 2)
}

function GM(e, t) {
  return re(e.getHours() % 12 || 12, t, 2)
}

function VM(e, t) {
  return re(1 + Ti.count(_t(e), e), t, 3)
}

function yv(e, t) {
  return re(e.getMilliseconds(), t, 3)
}

function XM(e, t) {
  return yv(e, t) + "000"
}

function qM(e, t) {
  return re(e.getMonth() + 1, t, 2)
}

function YM(e, t) {
  return re(e.getMinutes(), t, 2)
}

function ZM(e, t) {
  return re(e.getSeconds(), t, 2)
}

function JM(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t
}

function QM(e, t) {
  return re(go.count(_t(e) - 1, e), t, 2)
}

function mv(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Fr(e) : Fr.ceil(e)
}

function eC(e, t) {
  return e = mv(e), re(Fr.count(_t(e), e) + (_t(e).getDay() === 4), t, 2)
}

function tC(e) {
  return e.getDay()
}

function rC(e, t) {
  return re(wa.count(_t(e) - 1, e), t, 2)
}

function nC(e, t) {
  return re(e.getFullYear() % 100, t, 2)
}

function iC(e, t) {
  return e = mv(e), re(e.getFullYear() % 100, t, 2)
}

function aC(e, t) {
  return re(e.getFullYear() % 1e4, t, 4)
}

function oC(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Fr(e) : Fr.ceil(e), re(e.getFullYear() % 1e4, t, 4)
}

function uC(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + re(t / 60 | 0, "0", 2) + re(t % 60, "0", 2)
}

function Gf(e, t) {
  return re(e.getUTCDate(), t, 2)
}

function cC(e, t) {
  return re(e.getUTCHours(), t, 2)
}

function sC(e, t) {
  return re(e.getUTCHours() % 12 || 12, t, 2)
}

function lC(e, t) {
  return re(1 + mo.count(St(e), e), t, 3)
}

function gv(e, t) {
  return re(e.getUTCMilliseconds(), t, 3)
}

function fC(e, t) {
  return gv(e, t) + "000"
}

function pC(e, t) {
  return re(e.getUTCMonth() + 1, t, 2)
}

function hC(e, t) {
  return re(e.getUTCMinutes(), t, 2)
}

function dC(e, t) {
  return re(e.getUTCSeconds(), t, 2)
}

function vC(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t
}

function yC(e, t) {
  return re(bo.count(St(e) - 1, e), t, 2)
}

function bv(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? zr(e) : zr.ceil(e)
}

function mC(e, t) {
  return e = bv(e), re(zr.count(St(e), e) + (St(e).getUTCDay() === 4), t, 2)
}

function gC(e) {
  return e.getUTCDay()
}

function bC(e, t) {
  return re(Oa.count(St(e) - 1, e), t, 2)
}

function xC(e, t) {
  return re(e.getUTCFullYear() % 100, t, 2)
}

function wC(e, t) {
  return e = bv(e), re(e.getUTCFullYear() % 100, t, 2)
}

function OC(e, t) {
  return re(e.getUTCFullYear() % 1e4, t, 4)
}

function AC(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? zr(e) : zr.ceil(e), re(e.getUTCFullYear() % 1e4, t, 4)
}

function PC() {
  return "+0000"
}

function Vf() {
  return "%"
}

function Xf(e) {
  return +e
}

function qf(e) {
  return Math.floor(+e / 1e3)
}
var Or, xv, wv;
_C({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function _C(e) {
  return Or = _M(e), xv = Or.format, Or.parse, wv = Or.utcFormat, Or.utcParse, Or
}

function SC(e) {
  return new Date(e)
}

function $C(e) {
  return e instanceof Date ? +e : +new Date(+e)
}

function As(e, t, r, n, i, a, o, u, c, s) {
  var f = ss(),
    l = f.invert,
    p = f.domain,
    h = s(".%L"),
    v = s(":%S"),
    d = s("%I:%M"),
    y = s("%I %p"),
    b = s("%a %d"),
    x = s("%b %d"),
    w = s("%B"),
    O = s("%Y");

  function m(g) {
    return (c(g) < g ? h : u(g) < g ? v : o(g) < g ? d : a(g) < g ? y : n(g) < g ? i(g) < g ? b : x : r(g) < g ? w : O)(g)
  }
  return f.invert = function(g) {
    return new Date(l(g))
  }, f.domain = function(g) {
    return arguments.length ? p(Array.from(g, $C)) : p().map(SC)
  }, f.ticks = function(g) {
    var A = p();
    return e(A[0], A[A.length - 1], g ?? 10)
  }, f.tickFormat = function(g, A) {
    return A == null ? m : s(A)
  }, f.nice = function(g) {
    var A = p();
    return (!g || typeof g.range != "function") && (g = t(A[0], A[A.length - 1], g ?? 10)), g ? p(uv(A, g)) : f
  }, f.copy = function() {
    return $i(f, As(e, t, r, n, i, a, o, u, c, s))
  }, f
}

function TC() {
  return et.apply(As(AM, PM, _t, ws, go, Ti, bs, ms, ar, xv).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function EC() {
  return et.apply(As(wM, OM, St, Os, bo, mo, xs, gs, ar, wv).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function xo() {
  var e = 0,
    t = 1,
    r, n, i, a, o = ke,
    u = !1,
    c;

  function s(l) {
    return l == null || isNaN(l = +l) ? c : o(i === 0 ? .5 : (l = (a(l) - r) * i, u ? Math.max(0, Math.min(1, l)) : l))
  }
  s.domain = function(l) {
    return arguments.length ? ([e, t] = l, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), s) : [e, t]
  }, s.clamp = function(l) {
    return arguments.length ? (u = !!l, s) : u
  }, s.interpolator = function(l) {
    return arguments.length ? (o = l, s) : o
  };

  function f(l) {
    return function(p) {
      var h, v;
      return arguments.length ? ([h, v] = p, o = l(h, v), s) : [o(0), o(1)]
    }
  }
  return s.range = f(bn), s.rangeRound = f(cs), s.unknown = function(l) {
      return arguments.length ? (c = l, s) : c
    },
    function(l) {
      return a = l, r = l(e), n = l(t), i = r === n ? 0 : 1 / (n - r), s
    }
}

function Ht(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())
}

function Ov() {
  var e = Kt(xo()(ke));
  return e.copy = function() {
    return Ht(e, Ov())
  }, Mt.apply(e, arguments)
}

function Av() {
  var e = ps(xo()).domain([1, 10]);
  return e.copy = function() {
    return Ht(e, Av()).base(e.base())
  }, Mt.apply(e, arguments)
}

function Pv() {
  var e = hs(xo());
  return e.copy = function() {
    return Ht(e, Pv()).constant(e.constant())
  }, Mt.apply(e, arguments)
}

function Ps() {
  var e = ds(xo());
  return e.copy = function() {
    return Ht(e, Ps()).exponent(e.exponent())
  }, Mt.apply(e, arguments)
}

function jC() {
  return Ps.apply(null, arguments).exponent(.5)
}

function _v() {
  var e = [],
    t = ke;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((_i(e, n, 1) - 1) / (e.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(Bt), r
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, a) => yj(e, a / n))
  }, r.copy = function() {
    return _v(t).domain(e)
  }, Mt.apply(r, arguments)
}

function wo() {
  var e = 0,
    t = .5,
    r = 1,
    n = 1,
    i, a, o, u, c, s = ke,
    f, l = !1,
    p;

  function h(d) {
    return isNaN(d = +d) ? p : (d = .5 + ((d = +f(d)) - a) * (n * d < n * a ? u : c), s(l ? Math.max(0, Math.min(1, d)) : d))
  }
  h.domain = function(d) {
    return arguments.length ? ([e, t, r] = d, i = f(e = +e), a = f(t = +t), o = f(r = +r), u = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r]
  }, h.clamp = function(d) {
    return arguments.length ? (l = !!d, h) : l
  }, h.interpolator = function(d) {
    return arguments.length ? (s = d, h) : s
  };

  function v(d) {
    return function(y) {
      var b, x, w;
      return arguments.length ? ([b, x, w] = y, s = Wj(d, [b, x, w]), h) : [s(0), s(.5), s(1)]
    }
  }
  return h.range = v(bn), h.rangeRound = v(cs), h.unknown = function(d) {
      return arguments.length ? (p = d, h) : p
    },
    function(d) {
      return f = d, i = d(e), a = d(t), o = d(r), u = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), n = a < i ? -1 : 1, h
    }
}

function Sv() {
  var e = Kt(wo()(ke));
  return e.copy = function() {
    return Ht(e, Sv())
  }, Mt.apply(e, arguments)
}

function $v() {
  var e = ps(wo()).domain([.1, 1, 10]);
  return e.copy = function() {
    return Ht(e, $v()).base(e.base())
  }, Mt.apply(e, arguments)
}

function Tv() {
  var e = hs(wo());
  return e.copy = function() {
    return Ht(e, Tv()).constant(e.constant())
  }, Mt.apply(e, arguments)
}

function _s() {
  var e = ds(wo());
  return e.copy = function() {
    return Ht(e, _s()).exponent(e.exponent())
  }, Mt.apply(e, arguments)
}

function MC() {
  return _s.apply(null, arguments).exponent(.5)
}
const Yf = Object.freeze(Object.defineProperty({
  __proto__: null,
  scaleBand: qn,
  scaleDiverging: Sv,
  scaleDivergingLog: $v,
  scaleDivergingPow: _s,
  scaleDivergingSqrt: MC,
  scaleDivergingSymlog: Tv,
  scaleIdentity: ov,
  scaleImplicit: Uu,
  scaleLinear: ba,
  scaleLog: cv,
  scaleOrdinal: as,
  scalePoint: Dn,
  scalePow: vs,
  scaleQuantile: fv,
  scaleQuantize: pv,
  scaleRadial: lv,
  scaleSequential: Ov,
  scaleSequentialLog: Av,
  scaleSequentialPow: Ps,
  scaleSequentialQuantile: _v,
  scaleSequentialSqrt: jC,
  scaleSequentialSymlog: Pv,
  scaleSqrt: fM,
  scaleSymlog: sv,
  scaleThreshold: hv,
  scaleTime: TC,
  scaleUtc: EC,
  tickFormat: av
}, Symbol.toStringTag, {
  value: "Module"
}));
var CC = ln;

function IC(e, t, r) {
  for (var n = -1, i = e.length; ++n < i;) {
    var a = e[n],
      o = t(a);
    if (o != null && (u === void 0 ? o === o && !CC(o) : r(o, u))) var u = o,
      c = a
  }
  return c
}
var Oo = IC;

function kC(e, t) {
  return e > t
}
var Ev = kC,
  DC = Oo,
  NC = Ev,
  LC = gn;

function RC(e) {
  return e && e.length ? DC(e, LC, NC) : void 0
}
var BC = RC;
const Nt = ae(BC);

function FC(e, t) {
  return e < t
}
var jv = FC,
  zC = Oo,
  WC = jv,
  UC = gn;

function KC(e) {
  return e && e.length ? zC(e, UC, WC) : void 0
}
var HC = KC;
const Ao = ae(HC);
var GC = Wc,
  VC = ht,
  XC = Bd,
  qC = Be;

function YC(e, t) {
  var r = qC(e) ? GC : XC;
  return r(e, VC(t))
}
var ZC = YC,
  JC = Ld,
  QC = ZC;

function eI(e, t) {
  return JC(QC(e, t), 1)
}
var tI = eI;
const rI = ae(tI);
var nI = es;

function iI(e, t) {
  return nI(e, t)
}
var aI = iI;
const $t = ae(aI);
var xn = 1e9,
  oI = {
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
  },
  $s, de = !0,
  Qe = "[DecimalError] ",
  sr = Qe + "Invalid argument: ",
  Ss = Qe + "Exponent out of range: ",
  wn = Math.floor,
  tr = Math.pow,
  uI = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Ke, Se = 1e7,
  he = 7,
  Mv = 9007199254740991,
  Aa = wn(Mv / he),
  K = {};
K.absoluteValue = K.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e
};
K.comparedTo = K.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1
};
K.decimalPlaces = K.dp = function() {
  var e = this,
    t = e.d.length - 1,
    r = (t - e.e) * he;
  if (t = e.d[t], t)
    for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r
};
K.dividedBy = K.div = function(e) {
  return At(this, new this.constructor(e))
};
K.dividedToIntegerBy = K.idiv = function(e) {
  var t = this,
    r = t.constructor;
  return ce(At(t, new r(e), 0, 1), r.precision)
};
K.equals = K.eq = function(e) {
  return !this.cmp(e)
};
K.exponent = function() {
  return be(this)
};
K.greaterThan = K.gt = function(e) {
  return this.cmp(e) > 0
};
K.greaterThanOrEqualTo = K.gte = function(e) {
  return this.cmp(e) >= 0
};
K.isInteger = K.isint = function() {
  return this.e > this.d.length - 2
};
K.isNegative = K.isneg = function() {
  return this.s < 0
};
K.isPositive = K.ispos = function() {
  return this.s > 0
};
K.isZero = function() {
  return this.s === 0
};
K.lessThan = K.lt = function(e) {
  return this.cmp(e) < 0
};
K.lessThanOrEqualTo = K.lte = function(e) {
  return this.cmp(e) < 1
};
K.logarithm = K.log = function(e) {
  var t, r = this,
    n = r.constructor,
    i = n.precision,
    a = i + 5;
  if (e === void 0) e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ke)) throw Error(Qe + "NaN");
  if (r.s < 1) throw Error(Qe + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ke) ? new n(0) : (de = !1, t = At(ei(r, a), ei(e, a), a), de = !0, ce(t, i))
};
K.minus = K.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? kv(t, e) : Cv(t, (e.s = -e.s, e))
};
K.modulo = K.mod = function(e) {
  var t, r = this,
    n = r.constructor,
    i = n.precision;
  if (e = new n(e), !e.s) throw Error(Qe + "NaN");
  return r.s ? (de = !1, t = At(r, e, 0, 1).times(e), de = !0, r.minus(t)) : ce(new n(r), i)
};
K.naturalExponential = K.exp = function() {
  return Iv(this)
};
K.naturalLogarithm = K.ln = function() {
  return ei(this)
};
K.negated = K.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e
};
K.plus = K.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Cv(t, e) : kv(t, (e.s = -e.s, e))
};
K.precision = K.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(sr + e);
  if (t = be(i) + 1, n = i.d.length - 1, r = n * he + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++
  }
  return e && t > r ? t : r
};
K.squareRoot = K.sqrt = function() {
  var e, t, r, n, i, a, o, u = this,
    c = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new c(0);
    throw Error(Qe + "NaN")
  }
  for (e = be(u), de = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = ot(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = wn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(i.toString()), r = c.precision, i = o = r + 3;;)
    if (a = n, n = a.plus(At(u, a, o + 2)).times(.5), ot(a.d).slice(0, o) === (t = ot(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (ce(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break
        }
      } else if (t != "9999") break;
      o += 4
    } return de = !0, ce(n, r)
};
K.times = K.mul = function(e) {
  var t, r, n, i, a, o, u, c, s, f = this,
    l = f.constructor,
    p = f.d,
    h = (e = new l(e)).d;
  if (!f.s || !e.s) return new l(0);
  for (e.s *= f.s, r = f.e + e.e, c = p.length, s = h.length, c < s && (a = p, p = h, h = a, o = c, c = s, s = o), a = [], o = c + s, n = o; n--;) a.push(0);
  for (n = s; --n >= 0;) {
    for (t = 0, i = c + n; i > n;) u = a[i] + h[n] * p[i - n - 1] + t, a[i--] = u % Se | 0, t = u / Se | 0;
    a[i] = (a[i] + t) % Se | 0
  }
  for (; !a[--o];) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, de ? ce(e, l.precision) : e
};
K.toDecimalPlaces = K.todp = function(e, t) {
  var r = this,
    n = r.constructor;
  return r = new n(r), e === void 0 ? r : (ft(e, 0, xn), t === void 0 ? t = n.rounding : ft(t, 0, 8), ce(r, e + be(r) + 1, t))
};
K.toExponential = function(e, t) {
  var r, n = this,
    i = n.constructor;
  return e === void 0 ? r = pr(n, !0) : (ft(e, 0, xn), t === void 0 ? t = i.rounding : ft(t, 0, 8), n = ce(new i(n), e + 1, t), r = pr(n, !0, e + 1)), r
};
K.toFixed = function(e, t) {
  var r, n, i = this,
    a = i.constructor;
  return e === void 0 ? pr(i) : (ft(e, 0, xn), t === void 0 ? t = a.rounding : ft(t, 0, 8), n = ce(new a(i), e + be(i) + 1, t), r = pr(n.abs(), !1, e + be(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r)
};
K.toInteger = K.toint = function() {
  var e = this,
    t = e.constructor;
  return ce(new t(e), be(e) + 1, t.rounding)
};
K.toNumber = function() {
  return +this
};
K.toPower = K.pow = function(e) {
  var t, r, n, i, a, o, u = this,
    c = u.constructor,
    s = 12,
    f = +(e = new c(e));
  if (!e.s) return new c(Ke);
  if (u = new c(u), !u.s) {
    if (e.s < 1) throw Error(Qe + "Infinity");
    return u
  }
  if (u.eq(Ke)) return u;
  if (n = c.precision, e.eq(Ke)) return ce(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = f < 0 ? -f : f) <= Mv) {
      for (i = new c(Ke), t = Math.ceil(n / he + 4), de = !1; r % 2 && (i = i.times(u), Jf(i.d, t)), r = wn(r / 2), r !== 0;) u = u.times(u), Jf(u.d, t);
      return de = !0, e.s < 0 ? new c(Ke).div(i) : ce(i, n)
    }
  } else if (a < 0) throw Error(Qe + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, de = !1, i = e.times(ei(u, n + s)), de = !0, i = Iv(i), i.s = a, i
};
K.toPrecision = function(e, t) {
  var r, n, i = this,
    a = i.constructor;
  return e === void 0 ? (r = be(i), n = pr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (ft(e, 1, xn), t === void 0 ? t = a.rounding : ft(t, 0, 8), i = ce(new a(i), e, t), r = be(i), n = pr(i, e <= r || r <= a.toExpNeg, e)), n
};
K.toSignificantDigits = K.tosd = function(e, t) {
  var r = this,
    n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (ft(e, 1, xn), t === void 0 ? t = n.rounding : ft(t, 0, 8)), ce(new n(r), e, t)
};
K.toString = K.valueOf = K.val = K.toJSON = K[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this,
    t = be(e),
    r = e.constructor;
  return pr(e, t <= r.toExpNeg || t >= r.toExpPos)
};

function Cv(e, t) {
  var r, n, i, a, o, u, c, s, f = e.constructor,
    l = f.precision;
  if (!e.s || !t.s) return t.s || (t = new f(e)), de ? ce(t, l) : t;
  if (c = e.d, s = t.d, o = e.e, i = t.e, c = c.slice(), a = o - i, a) {
    for (a < 0 ? (n = c, a = -a, u = s.length) : (n = s, i = o, u = c.length), o = Math.ceil(l / he), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--;) n.push(0);
    n.reverse()
  }
  for (u = c.length, a = s.length, u - a < 0 && (a = u, n = s, s = c, c = n), r = 0; a;) r = (c[--a] = c[a] + s[a] + r) / Se | 0, c[a] %= Se;
  for (r && (c.unshift(r), ++i), u = c.length; c[--u] == 0;) c.pop();
  return t.d = c, t.e = i, de ? ce(t, l) : t
}

function ft(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(sr + e)
}

function ot(e) {
  var t, r, n, i = e.length - 1,
    a = "",
    o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++) n = e[t] + "", r = he - n.length, r && (a += kt(r)), a += n;
    o = e[t], n = o + "", r = he - n.length, r && (a += kt(r))
  } else if (o === 0) return "0";
  for (; o % 10 === 0;) o /= 10;
  return a + o
}
var At = function() {
  function e(n, i) {
    var a, o = 0,
      u = n.length;
    for (n = n.slice(); u--;) a = n[u] * i + o, n[u] = a % Se | 0, o = a / Se | 0;
    return o && n.unshift(o), n
  }

  function t(n, i, a, o) {
    var u, c;
    if (a != o) c = a > o ? 1 : -1;
    else
      for (u = c = 0; u < a; u++)
        if (n[u] != i[u]) {
          c = n[u] > i[u] ? 1 : -1;
          break
        } return c
  }

  function r(n, i, a) {
    for (var o = 0; a--;) n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * Se + n[a] - i[a];
    for (; !n[0] && n.length > 1;) n.shift()
  }
  return function(n, i, a, o) {
    var u, c, s, f, l, p, h, v, d, y, b, x, w, O, m, g, A, _, S = n.constructor,
      E = n.s == i.s ? 1 : -1,
      T = n.d,
      $ = i.d;
    if (!n.s) return new S(n);
    if (!i.s) throw Error(Qe + "Division by zero");
    for (c = n.e - i.e, A = $.length, m = T.length, h = new S(E), v = h.d = [], s = 0; $[s] == (T[s] || 0);) ++s;
    if ($[s] > (T[s] || 0) && --c, a == null ? x = a = S.precision : o ? x = a + (be(n) - be(i)) + 1 : x = a, x < 0) return new S(0);
    if (x = x / he + 2 | 0, s = 0, A == 1)
      for (f = 0, $ = $[0], x++;
        (s < m || f) && x--; s++) w = f * Se + (T[s] || 0), v[s] = w / $ | 0, f = w % $ | 0;
    else {
      for (f = Se / ($[0] + 1) | 0, f > 1 && ($ = e($, f), T = e(T, f), A = $.length, m = T.length), O = A, d = T.slice(0, A), y = d.length; y < A;) d[y++] = 0;
      _ = $.slice(), _.unshift(0), g = $[0], $[1] >= Se / 2 && ++g;
      do f = 0, u = t($, d, A, y), u < 0 ? (b = d[0], A != y && (b = b * Se + (d[1] || 0)), f = b / g | 0, f > 1 ? (f >= Se && (f = Se - 1), l = e($, f), p = l.length, y = d.length, u = t(l, d, p, y), u == 1 && (f--, r(l, A < p ? _ : $, p))) : (f == 0 && (u = f = 1), l = $.slice()), p = l.length, p < y && l.unshift(0), r(d, l, y), u == -1 && (y = d.length, u = t($, d, A, y), u < 1 && (f++, r(d, A < y ? _ : $, y))), y = d.length) : u === 0 && (f++, d = [0]), v[s++] = f, u && d[0] ? d[y++] = T[O] || 0 : (d = [T[O]], y = 1); while ((O++ < m || d[0] !== void 0) && x--)
    }
    return v[0] || v.shift(), h.e = c, ce(h, o ? a + be(h) + 1 : a)
  }
}();

function Iv(e, t) {
  var r, n, i, a, o, u, c = 0,
    s = 0,
    f = e.constructor,
    l = f.precision;
  if (be(e) > 16) throw Error(Ss + be(e));
  if (!e.s) return new f(Ke);
  for (de = !1, u = l, o = new f(.03125); e.abs().gte(.1);) e = e.times(o), s += 5;
  for (n = Math.log(tr(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new f(Ke), f.precision = u;;) {
    if (i = ce(i.times(e), u), r = r.times(++c), o = a.plus(At(i, r, u)), ot(o.d).slice(0, u) === ot(a.d).slice(0, u)) {
      for (; s--;) a = ce(a.times(a), u);
      return f.precision = l, t == null ? (de = !0, ce(a, l)) : a
    }
    a = o
  }
}

function be(e) {
  for (var t = e.e * he, r = e.d[0]; r >= 10; r /= 10) t++;
  return t
}

function au(e, t, r) {
  if (t > e.LN10.sd()) throw de = !0, r && (e.precision = r), Error(Qe + "LN10 precision limit exceeded");
  return ce(new e(e.LN10), t)
}

function kt(e) {
  for (var t = ""; e--;) t += "0";
  return t
}

function ei(e, t) {
  var r, n, i, a, o, u, c, s, f, l = 1,
    p = 10,
    h = e,
    v = h.d,
    d = h.constructor,
    y = d.precision;
  if (h.s < 1) throw Error(Qe + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Ke)) return new d(0);
  if (t == null ? (de = !1, s = y) : s = t, h.eq(10)) return t == null && (de = !0), au(d, s);
  if (s += p, d.precision = s, r = ot(v), n = r.charAt(0), a = be(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3;) h = h.times(e), r = ot(h.d), n = r.charAt(0), l++;
    a = be(h), n > 1 ? (h = new d("0." + r), a++) : h = new d(n + "." + r.slice(1))
  } else return c = au(d, s + 2, y).times(a + ""), h = ei(new d(n + "." + r.slice(1)), s - p).plus(c), d.precision = y, t == null ? (de = !0, ce(h, y)) : h;
  for (u = o = h = At(h.minus(Ke), h.plus(Ke), s), f = ce(h.times(h), s), i = 3;;) {
    if (o = ce(o.times(f), s), c = u.plus(At(o, new d(i), s)), ot(c.d).slice(0, s) === ot(u.d).slice(0, s)) return u = u.times(2), a !== 0 && (u = u.plus(au(d, s + 2, y).times(a + ""))), u = At(u, new d(l), s), d.precision = y, t == null ? (de = !0, ce(u, y)) : u;
    u = c, i += 2
  }
}

function Zf(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48;) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48;) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = wn(r / he), e.d = [], n = (r + 1) % he, r < 0 && (n += he), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= he; n < i;) e.d.push(+t.slice(n, n += he));
      t = t.slice(n), n = he - t.length
    } else n -= i;
    for (; n--;) t += "0";
    if (e.d.push(+t), de && (e.e > Aa || e.e < -Aa)) throw Error(Ss + r)
  } else e.s = 0, e.e = 0, e.d = [0];
  return e
}

function ce(e, t, r) {
  var n, i, a, o, u, c, s, f, l = e.d;
  for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0) n += he, i = t, s = l[f = 0];
  else {
    if (f = Math.ceil((n + 1) / he), a = l.length, f >= a) return e;
    for (s = a = l[f], o = 1; a >= 10; a /= 10) o++;
    n %= he, i = n - he + o
  }
  if (r !== void 0 && (a = tr(10, o - i - 1), u = s / a % 10 | 0, c = t < 0 || l[f + 1] !== void 0 || s % a, c = r < 4 ? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && (n > 0 ? i > 0 ? s / tr(10, o - i) : 0 : l[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !l[0]) return c ? (a = be(e), l.length = 1, t = t - a - 1, l[0] = tr(10, (he - t % he) % he), e.e = wn(-t / he) || 0) : (l.length = 1, l[0] = e.e = e.s = 0), e;
  if (n == 0 ? (l.length = f, a = 1, f--) : (l.length = f + 1, a = tr(10, he - n), l[f] = i > 0 ? (s / tr(10, o - i) % tr(10, i) | 0) * a : 0), c)
    for (;;)
      if (f == 0) {
        (l[0] += a) == Se && (l[0] = 1, ++e.e);
        break
      } else {
        if (l[f] += a, l[f] != Se) break;
        l[f--] = 0, a = 1
      } for (n = l.length; l[--n] === 0;) l.pop();
  if (de && (e.e > Aa || e.e < -Aa)) throw Error(Ss + be(e));
  return e
}

function kv(e, t) {
  var r, n, i, a, o, u, c, s, f, l, p = e.constructor,
    h = p.precision;
  if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new p(e), de ? ce(t, h) : t;
  if (c = e.d, l = t.d, n = t.e, s = e.e, c = c.slice(), o = s - n, o) {
    for (f = o < 0, f ? (r = c, o = -o, u = l.length) : (r = l, n = s, u = c.length), i = Math.max(Math.ceil(h / he), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--;) r.push(0);
    r.reverse()
  } else {
    for (i = c.length, u = l.length, f = i < u, f && (u = i), i = 0; i < u; i++)
      if (c[i] != l[i]) {
        f = c[i] < l[i];
        break
      } o = 0
  }
  for (f && (r = c, c = l, l = r, t.s = -t.s), u = c.length, i = l.length - u; i > 0; --i) c[u++] = 0;
  for (i = l.length; i > o;) {
    if (c[--i] < l[i]) {
      for (a = i; a && c[--a] === 0;) c[a] = Se - 1;
      --c[a], c[i] += Se
    }
    c[i] -= l[i]
  }
  for (; c[--u] === 0;) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? (t.d = c, t.e = n, de ? ce(t, h) : t) : new p(0)
}

function pr(e, t, r) {
  var n, i = be(e),
    a = ot(e.d),
    o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + kt(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + kt(-i - 1) + a, r && (n = r - o) > 0 && (a += kt(n))) : i >= o ? (a += kt(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + kt(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += kt(n))), e.s < 0 ? "-" + a : a
}

function Jf(e, t) {
  if (e.length > t) return e.length = t, !0
}

function Dv(e) {
  var t, r, n;

  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return
    }
    if (typeof a == "number") {
      if (a * 0 !== 0) throw Error(sr + a);
      if (a > 0) o.s = 1;
      else if (a < 0) a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return
      }
      return Zf(o, a.toString())
    } else if (typeof a != "string") throw Error(sr + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, uI.test(a)) Zf(o, a);
    else throw Error(sr + a)
  }
  if (i.prototype = K, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = Dv, i.config = i.set = cI, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length;) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i
}

function cI(e) {
  if (!e || typeof e != "object") throw Error(Qe + "Object expected");
  var t, r, n, i = ["precision", 1, xn, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (wn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(sr + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(sr + r + ": " + n);
  return this
}
var $s = Dv(oI);
Ke = new $s(1);
const ie = $s;

function sI(e) {
  return hI(e) || pI(e) || fI(e) || lI()
}

function lI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function fI(e, t) {
  if (e) {
    if (typeof e == "string") return Vu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vu(e, t)
  }
}

function pI(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function hI(e) {
  if (Array.isArray(e)) return Vu(e)
}

function Vu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var dI = function(t) {
    return t
  },
  Nv = {},
  Lv = function(t) {
    return t === Nv
  },
  Qf = function(t) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && Lv(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments)
    }
  },
  vI = function e(t, r) {
    return t === 1 ? r : Qf(function() {
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
      var o = i.filter(function(u) {
        return u !== Nv
      }).length;
      return o >= t ? r.apply(void 0, i) : e(t - o, Qf(function() {
        for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++) c[s] = arguments[s];
        var f = i.map(function(l) {
          return Lv(l) ? c.shift() : l
        });
        return r.apply(void 0, sI(f).concat(c))
      }))
    })
  },
  Po = function(t) {
    return vI(t.length, t)
  },
  Xu = function(t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i;
    return n
  },
  yI = Po(function(e, t) {
    return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
      return t[r]
    }).map(e)
  }),
  mI = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    if (!r.length) return dI;
    var i = r.reverse(),
      a = i[0],
      o = i.slice(1);
    return function() {
      return o.reduce(function(u, c) {
        return c(u)
      }, a.apply(void 0, arguments))
    }
  },
  qu = function(t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")
  },
  Rv = function(t) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++) a[o] = arguments[o];
      return r && a.every(function(u, c) {
        return u === r[c]
      }) || (r = a, n = t.apply(void 0, a)), n
    }
  };

function gI(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new ie(e).abs().log(10).toNumber()) + 1, t
}

function bI(e, t, r) {
  for (var n = new ie(e), i = 0, a = []; n.lt(t) && i < 1e5;) a.push(n.toNumber()), n = n.add(r), i++;
  return a
}
var xI = Po(function(e, t, r) {
    var n = +e,
      i = +t;
    return n + r * (i - n)
  }),
  wI = Po(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, (r - e) / n
  }),
  OI = Po(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n))
  });
const _o = {
  rangeStep: bI,
  getDigitCount: gI,
  interpolateNumber: xI,
  uninterpolateNumber: wI,
  uninterpolateTruncation: OI
};

function Yu(e) {
  return _I(e) || PI(e) || Bv(e) || AI()
}

function AI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function PI(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function _I(e) {
  if (Array.isArray(e)) return Zu(e)
}

function ti(e, t) {
  return TI(e) || $I(e, t) || Bv(e, t) || SI()
}

function SI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Bv(e, t) {
  if (e) {
    if (typeof e == "string") return Zu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zu(e, t)
  }
}

function Zu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function $I(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [],
      n = !0,
      i = !1,
      a = void 0;
    try {
      for (var o = e[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0);
    } catch (c) {
      i = !0, a = c
    } finally {
      try {
        !n && o.return != null && o.return()
      } finally {
        if (i) throw a
      }
    }
    return r
  }
}

function TI(e) {
  if (Array.isArray(e)) return e
}

function Fv(e) {
  var t = ti(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    a = n;
  return r > n && (i = n, a = r), [i, a]
}

function zv(e, t, r) {
  if (e.lte(0)) return new ie(0);
  var n = _o.getDigitCount(e.toNumber()),
    i = new ie(10).pow(n),
    a = e.div(i),
    o = n !== 1 ? .05 : .1,
    u = new ie(Math.ceil(a.div(o).toNumber())).add(r).mul(o),
    c = u.mul(i);
  return t ? c : new ie(Math.ceil(c))
}

function EI(e, t, r) {
  var n = 1,
    i = new ie(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new ie(10).pow(_o.getDigitCount(e) - 1), i = new ie(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new ie(Math.floor(e)))
  } else e === 0 ? i = new ie(Math.floor((t - 1) / 2)) : r || (i = new ie(Math.floor(e)));
  var o = Math.floor((t - 1) / 2),
    u = mI(yI(function(c) {
      return i.add(new ie(c - o).mul(n)).toNumber()
    }), Xu);
  return u(0, t)
}

function Wv(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1))) return {
    step: new ie(0),
    tickMin: new ie(0),
    tickMax: new ie(0)
  };
  var a = zv(new ie(t).sub(e).div(r - 1), n, i),
    o;
  e <= 0 && t >= 0 ? o = new ie(0) : (o = new ie(e).add(t).div(2), o = o.sub(new ie(o).mod(a)));
  var u = Math.ceil(o.sub(e).div(a).toNumber()),
    c = Math.ceil(new ie(t).sub(o).div(a).toNumber()),
    s = u + c + 1;
  return s > r ? Wv(e, t, r, n, i + 1) : (s < r && (c = t > 0 ? c + (r - s) : c, u = t > 0 ? u : u + (r - s)), {
    step: a,
    tickMin: o.sub(new ie(u).mul(a)),
    tickMax: o.add(new ie(c).mul(a))
  })
}

function jI(e) {
  var t = ti(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = Math.max(i, 2),
    u = Fv([r, n]),
    c = ti(u, 2),
    s = c[0],
    f = c[1];
  if (s === -1 / 0 || f === 1 / 0) {
    var l = f === 1 / 0 ? [s].concat(Yu(Xu(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(Yu(Xu(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? qu(l) : l
  }
  if (s === f) return EI(s, i, a);
  var p = Wv(s, f, o, a),
    h = p.step,
    v = p.tickMin,
    d = p.tickMax,
    y = _o.rangeStep(v, d.add(new ie(.1).mul(h)), h);
  return r > n ? qu(y) : y
}

function MI(e, t) {
  var r = ti(e, 2),
    n = r[0],
    i = r[1],
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = Fv([n, i]),
    u = ti(o, 2),
    c = u[0],
    s = u[1];
  if (c === -1 / 0 || s === 1 / 0) return [n, i];
  if (c === s) return [c];
  var f = Math.max(t, 2),
    l = zv(new ie(s).sub(c).div(f - 1), a, 0),
    p = [].concat(Yu(_o.rangeStep(new ie(c), new ie(s).sub(new ie(.99).mul(l)), l)), [s]);
  return n > i ? qu(p) : p
}
var CI = Rv(jI),
  II = Rv(MI),
  kI = "Invariant failed";

function hr(e, t) {
  throw new Error(kI)
}
var DI = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function Wr(e) {
  "@babel/helpers - typeof";
  return Wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Wr(e)
}

function Pa() {
  return Pa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Pa.apply(this, arguments)
}

function NI(e, t) {
  return FI(e) || BI(e, t) || RI(e, t) || LI()
}

function LI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function RI(e, t) {
  if (e) {
    if (typeof e == "string") return ep(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ep(e, t)
  }
}

function ep(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function BI(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function FI(e) {
  if (Array.isArray(e)) return e
}

function zI(e, t) {
  if (e == null) return {};
  var r = WI(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function WI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function UI(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function KI(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Hv(n.key), n)
  }
}

function HI(e, t, r) {
  return t && KI(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function GI(e, t, r) {
  return t = _a(t), VI(e, Uv() ? Reflect.construct(t, r || [], _a(e).constructor) : t.apply(e, r))
}

function VI(e, t) {
  if (t && (Wr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return XI(e)
}

function XI(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Uv() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Uv = function() {
    return !!e
  })()
}

function _a(e) {
  return _a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, _a(e)
}

function qI(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ju(e, t)
}

function Ju(e, t) {
  return Ju = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ju(e, t)
}

function Kv(e, t, r) {
  return t = Hv(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Hv(e) {
  var t = YI(e, "string");
  return Wr(t) == "symbol" ? t : t + ""
}

function YI(e, t) {
  if (Wr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var On = function(e) {
  function t() {
    return UI(this, t), GI(this, t, arguments)
  }
  return qI(t, e), HI(t, [{
    key: "render",
    value: function() {
      var n = this.props,
        i = n.offset,
        a = n.layout,
        o = n.width,
        u = n.dataKey,
        c = n.data,
        s = n.dataPointFormatter,
        f = n.xAxis,
        l = n.yAxis,
        p = zI(n, DI),
        h = U(p, !1);
      this.props.direction === "x" && f.type !== "number" && hr();
      var v = c.map(function(d) {
        var y = s(d, u),
          b = y.x,
          x = y.y,
          w = y.value,
          O = y.errorVal;
        if (!O) return null;
        var m = [],
          g, A;
        if (Array.isArray(O)) {
          var _ = NI(O, 2);
          g = _[0], A = _[1]
        } else g = A = O;
        if (a === "vertical") {
          var S = f.scale,
            E = x + i,
            T = E + o,
            $ = E - o,
            I = S(w - g),
            C = S(w + A);
          m.push({
            x1: C,
            y1: T,
            x2: C,
            y2: $
          }), m.push({
            x1: I,
            y1: E,
            x2: C,
            y2: E
          }), m.push({
            x1: I,
            y1: T,
            x2: I,
            y2: $
          })
        } else if (a === "horizontal") {
          var j = l.scale,
            k = b + i,
            D = k - o,
            B = k + o,
            F = j(w - g),
            H = j(w + A);
          m.push({
            x1: D,
            y1: H,
            x2: B,
            y2: H
          }), m.push({
            x1: k,
            y1: F,
            x2: k,
            y2: H
          }), m.push({
            x1: D,
            y1: F,
            x2: B,
            y2: F
          })
        }
        return P.createElement(J, Pa({
          className: "recharts-errorBar",
          key: "bar-".concat(m.map(function(q) {
            return "".concat(q.x1, "-").concat(q.x2, "-").concat(q.y1, "-").concat(q.y2)
          }))
        }, h), m.map(function(q) {
          return P.createElement("line", Pa({}, q, {
            key: "line-".concat(q.x1, "-").concat(q.x2, "-").concat(q.y1, "-").concat(q.y2)
          }))
        }))
      });
      return P.createElement(J, {
        className: "recharts-errorBars"
      }, v)
    }
  }])
}(P.Component);
Kv(On, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
Kv(On, "displayName", "ErrorBar");

function ri(e) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ri(e)
}

function tp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tp(Object(r), !0).forEach(function(n) {
      ZI(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ZI(e, t, r) {
  return t = JI(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function JI(e) {
  var t = QI(e, "string");
  return ri(t) == "symbol" ? t : t + ""
}

function QI(e, t) {
  if (ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Gv = function(t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    a = t.legendContent,
    o = Ue(r, Mr);
  if (!o) return null;
  var u = Mr.defaultProps,
    c = u !== void 0 ? Yt(Yt({}, u), o.props) : {},
    s;
  return o.props && o.props.payload ? s = o.props && o.props.payload : a === "children" ? s = (n || []).reduce(function(f, l) {
    var p = l.item,
      h = l.props,
      v = h.sectors || h.data || [];
    return f.concat(v.map(function(d) {
      return {
        type: o.props.iconType || p.props.legendType,
        value: d.name,
        color: d.fill,
        payload: d
      }
    }))
  }, []) : s = (n || []).map(function(f) {
    var l = f.item,
      p = l.type.defaultProps,
      h = p !== void 0 ? Yt(Yt({}, p), l.props) : {},
      v = h.dataKey,
      d = h.name,
      y = h.legendType,
      b = h.hide;
    return {
      inactive: b,
      dataKey: v,
      type: c.iconType || y || "square",
      color: Ts(l),
      value: d || v,
      payload: h
    }
  }), Yt(Yt(Yt({}, c), Mr.getWithHeight(o, i)), {}, {
    payload: s,
    item: o
  })
};

function ni(e) {
  "@babel/helpers - typeof";
  return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ni(e)
}

function rp(e) {
  return nk(e) || rk(e) || tk(e) || ek()
}

function ek() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function tk(e, t) {
  if (e) {
    if (typeof e == "string") return Qu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qu(e, t)
  }
}

function rk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function nk(e) {
  if (Array.isArray(e)) return Qu(e)
}

function Qu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function np(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ye(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? np(Object(r), !0).forEach(function(n) {
      Ir(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : np(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Ir(e, t, r) {
  return t = ik(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ik(e) {
  var t = ak(e, "string");
  return ni(t) == "symbol" ? t : t + ""
}

function ak(e, t) {
  if (ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function ue(e, t, r) {
  return V(e) || V(t) ? r : Pe(t) ? He(e, t, r) : G(t) ? t(e) : r
}

function Nn(e, t, r, n) {
  var i = rI(e, function(u) {
    return ue(u, t)
  });
  if (r === "number") {
    var a = i.filter(function(u) {
      return R(u) || parseFloat(u)
    });
    return a.length ? [Ao(a), Nt(a)] : [1 / 0, -1 / 0]
  }
  var o = n ? i.filter(function(u) {
    return !V(u)
  }) : i;
  return o.map(function(u) {
    return Pe(u) || u instanceof Date ? u : ""
  })
}
var ok = function(t) {
    var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      i = arguments.length > 2 ? arguments[2] : void 0,
      a = arguments.length > 3 ? arguments[3] : void 0,
      o = -1,
      u = (r = n?.length) !== null && r !== void 0 ? r : 0;
    if (u <= 1) return 0;
    if (a && a.axisType === "angleAxis" && Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6)
      for (var c = a.range, s = 0; s < u; s++) {
        var f = s > 0 ? i[s - 1].coordinate : i[u - 1].coordinate,
          l = i[s].coordinate,
          p = s >= u - 1 ? i[0].coordinate : i[s + 1].coordinate,
          h = void 0;
        if (Ce(l - f) !== Ce(p - l)) {
          var v = [];
          if (Ce(p - l) === Ce(c[1] - c[0])) {
            h = p;
            var d = l + c[1] - c[0];
            v[0] = Math.min(d, (d + f) / 2), v[1] = Math.max(d, (d + f) / 2)
          } else {
            h = f;
            var y = p + c[1] - c[0];
            v[0] = Math.min(l, (y + l) / 2), v[1] = Math.max(l, (y + l) / 2)
          }
          var b = [Math.min(l, (h + l) / 2), Math.max(l, (h + l) / 2)];
          if (t > b[0] && t <= b[1] || t >= v[0] && t <= v[1]) {
            o = i[s].index;
            break
          }
        } else {
          var x = Math.min(f, p),
            w = Math.max(f, p);
          if (t > (x + l) / 2 && t <= (w + l) / 2) {
            o = i[s].index;
            break
          }
        }
      } else
        for (var O = 0; O < u; O++)
          if (O === 0 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O > 0 && O < u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O === u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2) {
            o = n[O].index;
            break
          } return o
  },
  Ts = function(t) {
    var r, n = t,
      i = n.type.displayName,
      a = (r = t.type) !== null && r !== void 0 && r.defaultProps ? ye(ye({}, t.type.defaultProps), t.props) : t.props,
      o = a.stroke,
      u = a.fill,
      c;
    switch (i) {
      case "Line":
        c = o;
        break;
      case "Area":
      case "Radar":
        c = o && o !== "none" ? o : u;
        break;
      default:
        c = u;
        break
    }
    return c
  },
  uk = function(t) {
    var r = t.barSize,
      n = t.totalSize,
      i = t.stackGroups,
      a = i === void 0 ? {} : i;
    if (!a) return {};
    for (var o = {}, u = Object.keys(a), c = 0, s = u.length; c < s; c++)
      for (var f = a[u[c]].stackGroups, l = Object.keys(f), p = 0, h = l.length; p < h; p++) {
        var v = f[l[p]],
          d = v.items,
          y = v.cateAxisId,
          b = d.filter(function(A) {
            return Ot(A.type).indexOf("Bar") >= 0
          });
        if (b && b.length) {
          var x = b[0].type.defaultProps,
            w = x !== void 0 ? ye(ye({}, x), b[0].props) : b[0].props,
            O = w.barSize,
            m = w[y];
          o[m] || (o[m] = []);
          var g = V(O) ? r : O;
          o[m].push({
            item: b[0],
            stackList: b.slice(1),
            barSize: V(g) ? void 0 : Ie(g, n, 0)
          })
        }
      }
    return o
  },
  ck = function(t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      a = t.sizeList,
      o = a === void 0 ? [] : a,
      u = t.maxBarSize,
      c = o.length;
    if (c < 1) return null;
    var s = Ie(r, i, 0, !0),
      f, l = [];
    if (o[0].barSize === +o[0].barSize) {
      var p = !1,
        h = i / c,
        v = o.reduce(function(O, m) {
          return O + m.barSize || 0
        }, 0);
      v += (c - 1) * s, v >= i && (v -= (c - 1) * s, s = 0), v >= i && h > 0 && (p = !0, h *= .9, v = c * h);
      var d = (i - v) / 2 >> 0,
        y = {
          offset: d - s,
          size: 0
        };
      f = o.reduce(function(O, m) {
        var g = {
            item: m.item,
            position: {
              offset: y.offset + y.size + s,
              size: p ? h : m.barSize
            }
          },
          A = [].concat(rp(O), [g]);
        return y = A[A.length - 1].position, m.stackList && m.stackList.length && m.stackList.forEach(function(_) {
          A.push({
            item: _,
            position: y
          })
        }), A
      }, l)
    } else {
      var b = Ie(n, i, 0, !0);
      i - 2 * b - (c - 1) * s <= 0 && (s = 0);
      var x = (i - 2 * b - (c - 1) * s) / c;
      x > 1 && (x >>= 0);
      var w = u === +u ? Math.min(x, u) : x;
      f = o.reduce(function(O, m, g) {
        var A = [].concat(rp(O), [{
          item: m.item,
          position: {
            offset: b + (x + s) * g + (x - w) / 2,
            size: w
          }
        }]);
        return m.stackList && m.stackList.length && m.stackList.forEach(function(_) {
          A.push({
            item: _,
            position: A[A.length - 1].position
          })
        }), A
      }, l)
    }
    return f
  },
  sk = function(t, r, n, i) {
    var a = n.children,
      o = n.width,
      u = n.margin,
      c = o - (u.left || 0) - (u.right || 0),
      s = Gv({
        children: a,
        legendWidth: c
      });
    if (s) {
      var f = i || {},
        l = f.width,
        p = f.height,
        h = s.align,
        v = s.verticalAlign,
        d = s.layout;
      if ((d === "vertical" || d === "horizontal" && v === "middle") && h !== "center" && R(t[h])) return ye(ye({}, t), {}, Ir({}, h, t[h] + (l || 0)));
      if ((d === "horizontal" || d === "vertical" && h === "center") && v !== "middle" && R(t[v])) return ye(ye({}, t), {}, Ir({}, v, t[v] + (p || 0)))
    }
    return t
  },
  lk = function(t, r, n) {
    return V(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  Vv = function(t, r, n, i, a) {
    var o = r.props.children,
      u = De(o, On).filter(function(s) {
        return lk(i, a, s.props.direction)
      });
    if (u && u.length) {
      var c = u.map(function(s) {
        return s.props.dataKey
      });
      return t.reduce(function(s, f) {
        var l = ue(f, n);
        if (V(l)) return s;
        var p = Array.isArray(l) ? [Ao(l), Nt(l)] : [l, l],
          h = c.reduce(function(v, d) {
            var y = ue(f, d, 0),
              b = p[0] - Math.abs(Array.isArray(y) ? y[0] : y),
              x = p[1] + Math.abs(Array.isArray(y) ? y[1] : y);
            return [Math.min(b, v[0]), Math.max(x, v[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(h[0], s[0]), Math.max(h[1], s[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  fk = function(t, r, n, i, a) {
    var o = r.map(function(u) {
      return Vv(t, u, n, a, i)
    }).filter(function(u) {
      return !V(u)
    });
    return o && o.length ? o.reduce(function(u, c) {
      return [Math.min(u[0], c[0]), Math.max(u[1], c[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  Xv = function(t, r, n, i, a) {
    var o = r.map(function(c) {
      var s = c.props.dataKey;
      return n === "number" && s && Vv(t, c, s, i) || Nn(t, s, n, a)
    });
    if (n === "number") return o.reduce(function(c, s) {
      return [Math.min(c[0], s[0]), Math.max(c[1], s[1])]
    }, [1 / 0, -1 / 0]);
    var u = {};
    return o.reduce(function(c, s) {
      for (var f = 0, l = s.length; f < l; f++) u[s[f]] || (u[s[f]] = !0, c.push(s[f]));
      return c
    }, [])
  },
  qv = function(t, r) {
    return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis"
  },
  Yv = function(t, r, n, i) {
    if (i) return t.map(function(c) {
      return c.coordinate
    });
    var a, o, u = t.map(function(c) {
      return c.coordinate === r && (a = !0), c.coordinate === n && (o = !0), c.coordinate
    });
    return a || u.push(r), o || u.push(n), u
  },
  wt = function(t, r, n) {
    if (!t) return null;
    var i = t.scale,
      a = t.duplicateDomain,
      o = t.type,
      u = t.range,
      c = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      s = (r || n) && o === "category" && i.bandwidth ? i.bandwidth() / c : 0;
    if (s = t.axisType === "angleAxis" && u?.length >= 2 ? Ce(u[0] - u[1]) * 2 * s : s, r && (t.ticks || t.niceTicks)) {
      var f = (t.ticks || t.niceTicks).map(function(l) {
        var p = a ? a.indexOf(l) : l;
        return {
          coordinate: i(p) + s,
          value: l,
          offset: s
        }
      });
      return f.filter(function(l) {
        return !vn(l.coordinate)
      })
    }
    return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(l, p) {
      return {
        coordinate: i(l) + s,
        value: l,
        index: p,
        offset: s
      }
    }) : i.ticks && !n ? i.ticks(t.tickCount).map(function(l) {
      return {
        coordinate: i(l) + s,
        value: l,
        offset: s
      }
    }) : i.domain().map(function(l, p) {
      return {
        coordinate: i(l) + s,
        value: a ? a[l] : l,
        index: p,
        offset: s
      }
    })
  },
  ou = new WeakMap,
  Hi = function(t, r) {
    if (typeof r != "function") return t;
    ou.has(t) || ou.set(t, new WeakMap);
    var n = ou.get(t);
    if (n.has(r)) return n.get(r);
    var i = function() {
      t.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  Zv = function(t, r, n) {
    var i = t.scale,
      a = t.type,
      o = t.layout,
      u = t.axisType;
    if (i === "auto") return o === "radial" && u === "radiusAxis" ? {
      scale: qn(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: ba(),
      realScaleType: "linear"
    } : a === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Dn(),
      realScaleType: "point"
    } : a === "category" ? {
      scale: qn(),
      realScaleType: "band"
    } : {
      scale: ba(),
      realScaleType: "linear"
    };
    if (lr(i)) {
      var c = "scale".concat(oo(i));
      return {
        scale: (Yf[c] || Dn)(),
        realScaleType: Yf[c] ? c : "point"
      }
    }
    return G(i) ? {
      scale: i
    } : {
      scale: Dn(),
      realScaleType: "point"
    }
  },
  ip = 1e-4,
  Jv = function(t) {
    var r = t.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        a = Math.min(i[0], i[1]) - ip,
        o = Math.max(i[0], i[1]) + ip,
        u = t(r[0]),
        c = t(r[n - 1]);
      (u < a || u > o || c < a || c > o) && t.domain([r[0], r[n - 1]])
    }
  },
  pk = function(t, r) {
    if (!t) return null;
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position;
    return null
  },
  hk = function(t, r) {
    if (!r || r.length !== 2 || !R(r[0]) || !R(r[1])) return t;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      a = [t[0], t[1]];
    return (!R(t[0]) || t[0] < n) && (a[0] = n), (!R(t[1]) || t[1] > i) && (a[1] = i), a[0] > i && (a[0] = i), a[1] < n && (a[1] = n), a
  },
  dk = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var a = 0, o = 0, u = 0; u < r; ++u) {
          var c = vn(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
          c >= 0 ? (t[u][n][0] = a, t[u][n][1] = a + c, a = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + c, o = t[u][n][1])
        }
  },
  vk = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var a = 0, o = 0; o < r; ++o) {
          var u = vn(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
          u >= 0 ? (t[o][n][0] = a, t[o][n][1] = a + u, a = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0)
        }
  },
  yk = {
    sign: dk,
    expand: Dw,
    none: kr,
    silhouette: Nw,
    wiggle: Lw,
    positive: vk
  },
  mk = function(t, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      a = yk[n],
      o = kw().keys(i).value(function(u, c) {
        return +ue(u, c, 0)
      }).order(Pu).offset(a);
    return o(t)
  },
  gk = function(t, r, n, i, a, o) {
    if (!t) return null;
    var u = o ? r.reverse() : r,
      c = {},
      s = u.reduce(function(l, p) {
        var h, v = (h = p.type) !== null && h !== void 0 && h.defaultProps ? ye(ye({}, p.type.defaultProps), p.props) : p.props,
          d = v.stackId,
          y = v.hide;
        if (y) return l;
        var b = v[n],
          x = l[b] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Pe(d)) {
          var w = x.stackGroups[d] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          w.items.push(p), x.hasStack = !0, x.stackGroups[d] = w
        } else x.stackGroups[Ut("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return ye(ye({}, l), {}, Ir({}, b, x))
      }, c),
      f = {};
    return Object.keys(s).reduce(function(l, p) {
      var h = s[p];
      if (h.hasStack) {
        var v = {};
        h.stackGroups = Object.keys(h.stackGroups).reduce(function(d, y) {
          var b = h.stackGroups[y];
          return ye(ye({}, d), {}, Ir({}, y, {
            numericAxisId: n,
            cateAxisId: i,
            items: b.items,
            stackedData: mk(t, b.items, a)
          }))
        }, v)
      }
      return ye(ye({}, l), {}, Ir({}, p, h))
    }, f)
  },
  Qv = function(t, r) {
    var n = r.realScaleType,
      i = r.type,
      a = r.tickCount,
      o = r.originalDomain,
      u = r.allowDecimals,
      c = n || r.scale;
    if (c !== "auto" && c !== "linear") return null;
    if (a && i === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
      var s = t.domain();
      if (!s.length) return null;
      var f = CI(s, a, u);
      return t.domain([Ao(f), Nt(f)]), {
        niceTicks: f
      }
    }
    if (a && i === "number") {
      var l = t.domain(),
        p = II(l, a, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function Ur(e) {
  var t = e.axis,
    r = e.ticks,
    n = e.bandSize,
    i = e.entry,
    a = e.index,
    o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !V(i[t.dataKey])) {
      var u = Zi(r, "value", i[t.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[a] ? r[a].coordinate + n / 2 : null
  }
  var c = ue(i, V(o) ? t.dataKey : o);
  return V(c) ? null : t.scale(c)
}
var ap = function(t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      a = t.bandSize,
      o = t.entry,
      u = t.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var c = ue(o, r.dataKey, r.domain[u]);
    return V(c) ? null : r.scale(c) - a / 2 + i
  },
  bk = function(t) {
    var r = t.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        a = Math.max(n[0], n[1]);
      return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i
    }
    return n[0]
  },
  xk = function(t, r) {
    var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? ye(ye({}, t.type.defaultProps), t.props) : t.props,
      a = i.stackId;
    if (Pe(a)) {
      var o = r[a];
      if (o) {
        var u = o.items.indexOf(t);
        return u >= 0 ? o.stackedData[u] : null
      }
    }
    return null
  },
  wk = function(t) {
    return t.reduce(function(r, n) {
      return [Ao(n.concat([r[0]]).filter(R)), Nt(n.concat([r[1]]).filter(R))]
    }, [1 / 0, -1 / 0])
  },
  ey = function(t, r, n) {
    return Object.keys(t).reduce(function(i, a) {
      var o = t[a],
        u = o.stackedData,
        c = u.reduce(function(s, f) {
          var l = wk(f.slice(r, n + 1));
          return [Math.min(s[0], l[0]), Math.max(s[1], l[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(c[0], i[0]), Math.max(c[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  op = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  up = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  ec = function(t, r, n) {
    if (G(t)) return t(r, n);
    if (!Array.isArray(t)) return r;
    var i = [];
    if (R(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
    else if (op.test(t[0])) {
      var a = +op.exec(t[0])[1];
      i[0] = r[0] - a
    } else G(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
    if (R(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
    else if (up.test(t[1])) {
      var o = +up.exec(t[1])[1];
      i[1] = r[1] + o
    } else G(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
    return i
  },
  Sa = function(t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (t && r && r.length >= 2) {
      for (var a = rs(r, function(l) {
          return l.coordinate
        }), o = 1 / 0, u = 1, c = a.length; u < c; u++) {
        var s = a[u],
          f = a[u - 1];
        o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o)
      }
      return o === 1 / 0 ? 0 : o
    }
    return n ? void 0 : 0
  },
  cp = function(t, r, n) {
    return !t || !t.length || $t(t, He(n, "type.defaultProps.domain")) ? r : t
  },
  ty = function(t, r) {
    var n = t.type.defaultProps ? ye(ye({}, t.type.defaultProps), t.props) : t.props,
      i = n.dataKey,
      a = n.name,
      o = n.unit,
      u = n.formatter,
      c = n.tooltipType,
      s = n.chartType,
      f = n.hide;
    return ye(ye({}, U(t, !1)), {}, {
      dataKey: i,
      unit: o,
      formatter: u,
      name: a || i,
      color: Ts(t),
      value: ue(r, i),
      type: c,
      payload: r,
      chartType: s,
      hide: f
    })
  };

function ii(e) {
  "@babel/helpers - typeof";
  return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ii(e)
}

function sp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function mt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sp(Object(r), !0).forEach(function(n) {
      ry(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ry(e, t, r) {
  return t = Ok(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ok(e) {
  var t = Ak(e, "string");
  return ii(t) == "symbol" ? t : t + ""
}

function Ak(e, t) {
  if (ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Pk(e, t) {
  return Tk(e) || $k(e, t) || Sk(e, t) || _k()
}

function _k() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Sk(e, t) {
  if (e) {
    if (typeof e == "string") return lp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lp(e, t)
  }
}

function lp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function $k(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function Tk(e) {
  if (Array.isArray(e)) return e
}
var $a = Math.PI / 180,
  Ek = function(t) {
    return t * 180 / Math.PI
  },
  ne = function(t, r, n, i) {
    return {
      x: t + Math.cos(-$a * i) * n,
      y: r + Math.sin(-$a * i) * n
    }
  },
  ny = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2
  },
  iy = function(t, r, n, i, a) {
    var o = t.width,
      u = t.height,
      c = t.startAngle,
      s = t.endAngle,
      f = Ie(t.cx, o, o / 2),
      l = Ie(t.cy, u, u / 2),
      p = ny(o, u, n),
      h = Ie(t.innerRadius, p, 0),
      v = Ie(t.outerRadius, p, p * .8),
      d = Object.keys(r);
    return d.reduce(function(y, b) {
      var x = r[b],
        w = x.domain,
        O = x.reversed,
        m;
      if (V(x.range)) i === "angleAxis" ? m = [c, s] : i === "radiusAxis" && (m = [h, v]), O && (m = [m[1], m[0]]);
      else {
        m = x.range;
        var g = m,
          A = Pk(g, 2);
        c = A[0], s = A[1]
      }
      var _ = Zv(x, a),
        S = _.realScaleType,
        E = _.scale;
      E.domain(w).range(m), Jv(E);
      var T = Qv(E, mt(mt({}, x), {}, {
          realScaleType: S
        })),
        $ = mt(mt(mt({}, x), T), {}, {
          range: m,
          radius: v,
          realScaleType: S,
          scale: E,
          cx: f,
          cy: l,
          innerRadius: h,
          outerRadius: v,
          startAngle: c,
          endAngle: s
        });
      return mt(mt({}, y), {}, ry({}, b, $))
    }, {})
  },
  jk = function(t, r) {
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y;
    return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2))
  },
  Mk = function(t, r) {
    var n = t.x,
      i = t.y,
      a = r.cx,
      o = r.cy,
      u = jk({
        x: n,
        y: i
      }, {
        x: a,
        y: o
      });
    if (u <= 0) return {
      radius: u
    };
    var c = (n - a) / u,
      s = Math.acos(c);
    return i > o && (s = 2 * Math.PI - s), {
      radius: u,
      angle: Ek(s),
      angleInRadian: s
    }
  },
  Ck = function(t) {
    var r = t.startAngle,
      n = t.endAngle,
      i = Math.floor(r / 360),
      a = Math.floor(n / 360),
      o = Math.min(i, a);
    return {
      startAngle: r - o * 360,
      endAngle: n - o * 360
    }
  },
  Ik = function(t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      a = Math.floor(n / 360),
      o = Math.floor(i / 360),
      u = Math.min(a, o);
    return t + u * 360
  },
  fp = function(t, r) {
    var n = t.x,
      i = t.y,
      a = Mk({
        x: n,
        y: i
      }, r),
      o = a.radius,
      u = a.angle,
      c = r.innerRadius,
      s = r.outerRadius;
    if (o < c || o > s) return !1;
    if (o === 0) return !0;
    var f = Ck(r),
      l = f.startAngle,
      p = f.endAngle,
      h = u,
      v;
    if (l <= p) {
      for (; h > p;) h -= 360;
      for (; h < l;) h += 360;
      v = h >= l && h <= p
    } else {
      for (; h > l;) h -= 360;
      for (; h < p;) h += 360;
      v = h >= p && h <= l
    }
    return v ? mt(mt({}, r), {}, {
      radius: o,
      angle: Ik(h, r)
    }) : null
  },
  ay = function(t) {
    return !L.isValidElement(t) && !G(t) && typeof t != "boolean" ? t.className : ""
  };

function ai(e) {
  "@babel/helpers - typeof";
  return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ai(e)
}
var kk = ["offset"];

function Dk(e) {
  return Bk(e) || Rk(e) || Lk(e) || Nk()
}

function Nk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Lk(e, t) {
  if (e) {
    if (typeof e == "string") return tc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tc(e, t)
  }
}

function Rk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Bk(e) {
  if (Array.isArray(e)) return tc(e)
}

function tc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function Fk(e, t) {
  if (e == null) return {};
  var r = zk(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function zk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function pp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pp(Object(r), !0).forEach(function(n) {
      Wk(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Wk(e, t, r) {
  return t = Uk(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Uk(e) {
  var t = Kk(e, "string");
  return ai(t) == "symbol" ? t : t + ""
}

function Kk(e, t) {
  if (ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function oi() {
  return oi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, oi.apply(this, arguments)
}
var Hk = function(t) {
    var r = t.value,
      n = t.formatter,
      i = V(t.children) ? r : t.children;
    return G(n) ? n(i) : i
  },
  Gk = function(t, r) {
    var n = Ce(r - t),
      i = Math.min(Math.abs(r - t), 360);
    return n * i
  },
  Vk = function(t, r, n) {
    var i = t.position,
      a = t.viewBox,
      o = t.offset,
      u = t.className,
      c = a,
      s = c.cx,
      f = c.cy,
      l = c.innerRadius,
      p = c.outerRadius,
      h = c.startAngle,
      v = c.endAngle,
      d = c.clockWise,
      y = (l + p) / 2,
      b = Gk(h, v),
      x = b >= 0 ? 1 : -1,
      w, O;
    i === "insideStart" ? (w = h + x * o, O = d) : i === "insideEnd" ? (w = v - x * o, O = !d) : i === "end" && (w = v + x * o, O = d), O = b <= 0 ? O : !O;
    var m = ne(s, f, y, w),
      g = ne(s, f, y, w + (O ? 1 : -1) * 359),
      A = "M".concat(m.x, ",").concat(m.y, `
    A`).concat(y, ",").concat(y, ",0,1,").concat(O ? 0 : 1, `,
    `).concat(g.x, ",").concat(g.y),
      _ = V(t.id) ? Ut("recharts-radial-line-") : t.id;
    return P.createElement("text", oi({}, n, {
      dominantBaseline: "central",
      className: Z("recharts-radial-bar-label", u)
    }), P.createElement("defs", null, P.createElement("path", {
      id: _,
      d: A
    })), P.createElement("textPath", {
      xlinkHref: "#".concat(_)
    }, r))
  },
  Xk = function(t) {
    var r = t.viewBox,
      n = t.offset,
      i = t.position,
      a = r,
      o = a.cx,
      u = a.cy,
      c = a.innerRadius,
      s = a.outerRadius,
      f = a.startAngle,
      l = a.endAngle,
      p = (f + l) / 2;
    if (i === "outside") {
      var h = ne(o, u, s + n, p),
        v = h.x,
        d = h.y;
      return {
        x: v,
        y: d,
        textAnchor: v >= o ? "start" : "end",
        verticalAnchor: "middle"
      }
    }
    if (i === "center") return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
    if (i === "centerTop") return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
    if (i === "centerBottom") return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
    var y = (c + s) / 2,
      b = ne(o, u, y, p),
      x = b.x,
      w = b.y;
    return {
      x,
      y: w,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  qk = function(t) {
    var r = t.viewBox,
      n = t.parentViewBox,
      i = t.offset,
      a = t.position,
      o = r,
      u = o.x,
      c = o.y,
      s = o.width,
      f = o.height,
      l = f >= 0 ? 1 : -1,
      p = l * i,
      h = l > 0 ? "end" : "start",
      v = l > 0 ? "start" : "end",
      d = s >= 0 ? 1 : -1,
      y = d * i,
      b = d > 0 ? "end" : "start",
      x = d > 0 ? "start" : "end";
    if (a === "top") {
      var w = {
        x: u + s / 2,
        y: c - l * i,
        textAnchor: "middle",
        verticalAnchor: h
      };
      return Ae(Ae({}, w), n ? {
        height: Math.max(c - n.y, 0),
        width: s
      } : {})
    }
    if (a === "bottom") {
      var O = {
        x: u + s / 2,
        y: c + f + p,
        textAnchor: "middle",
        verticalAnchor: v
      };
      return Ae(Ae({}, O), n ? {
        height: Math.max(n.y + n.height - (c + f), 0),
        width: s
      } : {})
    }
    if (a === "left") {
      var m = {
        x: u - y,
        y: c + f / 2,
        textAnchor: b,
        verticalAnchor: "middle"
      };
      return Ae(Ae({}, m), n ? {
        width: Math.max(m.x - n.x, 0),
        height: f
      } : {})
    }
    if (a === "right") {
      var g = {
        x: u + s + y,
        y: c + f / 2,
        textAnchor: x,
        verticalAnchor: "middle"
      };
      return Ae(Ae({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var A = n ? {
      width: s,
      height: f
    } : {};
    return a === "insideLeft" ? Ae({
      x: u + y,
      y: c + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, A) : a === "insideRight" ? Ae({
      x: u + s - y,
      y: c + f / 2,
      textAnchor: b,
      verticalAnchor: "middle"
    }, A) : a === "insideTop" ? Ae({
      x: u + s / 2,
      y: c + p,
      textAnchor: "middle",
      verticalAnchor: v
    }, A) : a === "insideBottom" ? Ae({
      x: u + s / 2,
      y: c + f - p,
      textAnchor: "middle",
      verticalAnchor: h
    }, A) : a === "insideTopLeft" ? Ae({
      x: u + y,
      y: c + p,
      textAnchor: x,
      verticalAnchor: v
    }, A) : a === "insideTopRight" ? Ae({
      x: u + s - y,
      y: c + p,
      textAnchor: b,
      verticalAnchor: v
    }, A) : a === "insideBottomLeft" ? Ae({
      x: u + y,
      y: c + f - p,
      textAnchor: x,
      verticalAnchor: h
    }, A) : a === "insideBottomRight" ? Ae({
      x: u + s - y,
      y: c + f - p,
      textAnchor: b,
      verticalAnchor: h
    }, A) : fn(a) && (R(a.x) || nr(a.x)) && (R(a.y) || nr(a.y)) ? Ae({
      x: u + Ie(a.x, s),
      y: c + Ie(a.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, A) : Ae({
      x: u + s / 2,
      y: c + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, A)
  },
  Yk = function(t) {
    return "cx" in t && R(t.cx)
  };

function $e(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = Fk(e, kk),
    i = Ae({
      offset: r
    }, n),
    a = i.viewBox,
    o = i.position,
    u = i.value,
    c = i.children,
    s = i.content,
    f = i.className,
    l = f === void 0 ? "" : f,
    p = i.textBreakAll;
  if (!a || V(u) && V(c) && !L.isValidElement(s) && !G(s)) return null;
  if (L.isValidElement(s)) return L.cloneElement(s, i);
  var h;
  if (G(s)) {
    if (h = L.createElement(s, i), L.isValidElement(h)) return h
  } else h = Hk(i);
  var v = Yk(a),
    d = U(i, !0);
  if (v && (o === "insideStart" || o === "insideEnd" || o === "end")) return Vk(i, h, d);
  var y = v ? Xk(i) : qk(i);
  return P.createElement(fr, oi({
    className: Z("recharts-label", l)
  }, d, y, {
    breakAll: p
  }), h)
}
$e.displayName = "Label";
var oy = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.angle,
      a = t.startAngle,
      o = t.endAngle,
      u = t.r,
      c = t.radius,
      s = t.innerRadius,
      f = t.outerRadius,
      l = t.x,
      p = t.y,
      h = t.top,
      v = t.left,
      d = t.width,
      y = t.height,
      b = t.clockWise,
      x = t.labelViewBox;
    if (x) return x;
    if (R(d) && R(y)) {
      if (R(l) && R(p)) return {
        x: l,
        y: p,
        width: d,
        height: y
      };
      if (R(h) && R(v)) return {
        x: h,
        y: v,
        width: d,
        height: y
      }
    }
    return R(l) && R(p) ? {
      x: l,
      y: p,
      width: 0,
      height: 0
    } : R(r) && R(n) ? {
      cx: r,
      cy: n,
      startAngle: a || i || 0,
      endAngle: o || i || 0,
      innerRadius: s || 0,
      outerRadius: f || c || u || 0,
      clockWise: b
    } : t.viewBox ? t.viewBox : {}
  },
  Zk = function(t, r) {
    return t ? t === !0 ? P.createElement($e, {
      key: "label-implicit",
      viewBox: r
    }) : Pe(t) ? P.createElement($e, {
      key: "label-implicit",
      viewBox: r,
      value: t
    }) : L.isValidElement(t) ? t.type === $e ? L.cloneElement(t, {
      key: "label-implicit",
      viewBox: r
    }) : P.createElement($e, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : G(t) ? P.createElement($e, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : fn(t) ? P.createElement($e, oi({
      viewBox: r
    }, t, {
      key: "label-implicit"
    })) : null : null
  },
  Jk = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || !t.children && n && !t.label) return null;
    var i = t.children,
      a = oy(t),
      o = De(i, $e).map(function(c, s) {
        return L.cloneElement(c, {
          viewBox: r || a,
          key: "label-".concat(s)
        })
      });
    if (!n) return o;
    var u = Zk(t.label, r || a);
    return [u].concat(Dk(o))
  };
$e.parseViewBox = oy;
$e.renderCallByParent = Jk;

function Qk(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0
}
var e2 = Qk;
const uy = ae(e2);

function ui(e) {
  "@babel/helpers - typeof";
  return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ui(e)
}
var t2 = ["valueAccessor"],
  r2 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function n2(e) {
  return u2(e) || o2(e) || a2(e) || i2()
}

function i2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function a2(e, t) {
  if (e) {
    if (typeof e == "string") return rc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rc(e, t)
  }
}

function o2(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function u2(e) {
  if (Array.isArray(e)) return rc(e)
}

function rc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function Ta() {
  return Ta = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ta.apply(this, arguments)
}

function hp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function dp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hp(Object(r), !0).forEach(function(n) {
      c2(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function c2(e, t, r) {
  return t = s2(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function s2(e) {
  var t = l2(e, "string");
  return ui(t) == "symbol" ? t : t + ""
}

function l2(e, t) {
  if (ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function vp(e, t) {
  if (e == null) return {};
  var r = f2(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function f2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var p2 = function(t) {
  return Array.isArray(t.value) ? uy(t.value) : t.value
};

function Je(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? p2 : t,
    n = vp(e, t2),
    i = n.data,
    a = n.dataKey,
    o = n.clockWise,
    u = n.id,
    c = n.textBreakAll,
    s = vp(n, r2);
  return !i || !i.length ? null : P.createElement(J, {
    className: "recharts-label-list"
  }, i.map(function(f, l) {
    var p = V(a) ? r(f, l) : ue(f && f.payload, a),
      h = V(u) ? {} : {
        id: "".concat(u, "-").concat(l)
      };
    return P.createElement($e, Ta({}, U(f, !0), s, h, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: c,
      viewBox: $e.parseViewBox(V(o) ? f : dp(dp({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(l),
      index: l
    }))
  }))
}
Je.displayName = "LabelList";

function h2(e, t) {
  return e ? e === !0 ? P.createElement(Je, {
    key: "labelList-implicit",
    data: t
  }) : P.isValidElement(e) || G(e) ? P.createElement(Je, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : fn(e) ? P.createElement(Je, Ta({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null
}

function d2(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label) return null;
  var n = e.children,
    i = De(n, Je).map(function(o, u) {
      return L.cloneElement(o, {
        data: t,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var a = h2(e.label, t);
  return [a].concat(n2(i))
}
Je.renderCallByParent = d2;

function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ci(e)
}

function nc() {
  return nc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, nc.apply(this, arguments)
}

function yp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function mp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yp(Object(r), !0).forEach(function(n) {
      v2(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function v2(e, t, r) {
  return t = y2(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function y2(e) {
  var t = m2(e, "string");
  return ci(t) == "symbol" ? t : t + ""
}

function m2(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var g2 = function(t, r) {
    var n = Ce(r - t),
      i = Math.min(Math.abs(r - t), 359.999);
    return n * i
  },
  Gi = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      a = t.angle,
      o = t.sign,
      u = t.isExternal,
      c = t.cornerRadius,
      s = t.cornerIsExternal,
      f = c * (u ? 1 : -1) + i,
      l = Math.asin(c / f) / $a,
      p = s ? a : a + o * l,
      h = ne(r, n, f, p),
      v = ne(r, n, i, p),
      d = s ? a - o * l : a,
      y = ne(r, n, f * Math.cos(l * $a), d);
    return {
      center: h,
      circleTangency: v,
      lineTangency: y,
      theta: l
    }
  },
  cy = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.startAngle,
      u = t.endAngle,
      c = g2(o, u),
      s = o + c,
      f = ne(r, n, a, o),
      l = ne(r, n, a, s),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(a, ",").concat(a, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
    if (i > 0) {
      var h = ne(r, n, i, o),
        v = ne(r, n, i, s);
      p += "L ".concat(v.x, ",").concat(v.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(h.x, ",").concat(h.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  b2 = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.cornerRadius,
      u = t.forceCornerRadius,
      c = t.cornerIsExternal,
      s = t.startAngle,
      f = t.endAngle,
      l = Ce(f - s),
      p = Gi({
        cx: r,
        cy: n,
        radius: a,
        angle: s,
        sign: l,
        cornerRadius: o,
        cornerIsExternal: c
      }),
      h = p.circleTangency,
      v = p.lineTangency,
      d = p.theta,
      y = Gi({
        cx: r,
        cy: n,
        radius: a,
        angle: f,
        sign: -l,
        cornerRadius: o,
        cornerIsExternal: c
      }),
      b = y.circleTangency,
      x = y.lineTangency,
      w = y.theta,
      O = c ? Math.abs(s - f) : Math.abs(s - f) - d - w;
    if (O < 0) return u ? "M ".concat(v.x, ",").concat(v.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : cy({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: a,
      startAngle: s,
      endAngle: f
    });
    var m = "M ".concat(v.x, ",").concat(v.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(a, ",").concat(a, ",0,").concat(+(O > 180), ",").concat(+(l < 0), ",").concat(b.x, ",").concat(b.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(x.x, ",").concat(x.y, `
  `);
    if (i > 0) {
      var g = Gi({
          cx: r,
          cy: n,
          radius: i,
          angle: s,
          sign: l,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: c
        }),
        A = g.circleTangency,
        _ = g.lineTangency,
        S = g.theta,
        E = Gi({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -l,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: c
        }),
        T = E.circleTangency,
        $ = E.lineTangency,
        I = E.theta,
        C = c ? Math.abs(s - f) : Math.abs(s - f) - S - I;
      if (C < 0 && o === 0) return "".concat(m, "L").concat(r, ",").concat(n, "Z");
      m += "L".concat($.x, ",").concat($.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(T.x, ",").concat(T.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(C > 180), ",").concat(+(l > 0), ",").concat(A.x, ",").concat(A.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(_.x, ",").concat(_.y, "Z")
    } else m += "L".concat(r, ",").concat(n, "Z");
    return m
  },
  x2 = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1
  },
  sy = function(t) {
    var r = mp(mp({}, x2), t),
      n = r.cx,
      i = r.cy,
      a = r.innerRadius,
      o = r.outerRadius,
      u = r.cornerRadius,
      c = r.forceCornerRadius,
      s = r.cornerIsExternal,
      f = r.startAngle,
      l = r.endAngle,
      p = r.className;
    if (o < a || f === l) return null;
    var h = Z("recharts-sector", p),
      v = o - a,
      d = Ie(u, v, 0, !0),
      y;
    return d > 0 && Math.abs(f - l) < 360 ? y = b2({
      cx: n,
      cy: i,
      innerRadius: a,
      outerRadius: o,
      cornerRadius: Math.min(d, v / 2),
      forceCornerRadius: c,
      cornerIsExternal: s,
      startAngle: f,
      endAngle: l
    }) : y = cy({
      cx: n,
      cy: i,
      innerRadius: a,
      outerRadius: o,
      startAngle: f,
      endAngle: l
    }), P.createElement("path", nc({}, U(r, !0), {
      className: h,
      d: y,
      role: "img"
    }))
  };

function si(e) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, si(e)
}

function ic() {
  return ic = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ic.apply(this, arguments)
}

function gp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function bp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gp(Object(r), !0).forEach(function(n) {
      w2(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function w2(e, t, r) {
  return t = O2(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function O2(e) {
  var t = A2(e, "string");
  return si(t) == "symbol" ? t : t + ""
}

function A2(e, t) {
  if (si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var xp = {
    curveBasisClosed: Aw,
    curveBasisOpen: Pw,
    curveBasis: Ow,
    curveBumpX: cw,
    curveBumpY: sw,
    curveLinearClosed: _w,
    curveLinear: co,
    curveMonotoneX: Sw,
    curveMonotoneY: $w,
    curveNatural: Tw,
    curveStep: Ew,
    curveStepAfter: Mw,
    curveStepBefore: jw
  },
  Vi = function(t) {
    return t.x === +t.x && t.y === +t.y
  },
  Mn = function(t) {
    return t.x
  },
  Cn = function(t) {
    return t.y
  },
  P2 = function(t, r) {
    if (G(t)) return t;
    var n = "curve".concat(oo(t));
    return (n === "curveMonotone" || n === "curveBump") && r ? xp["".concat(n).concat(r === "vertical" ? "Y" : "X")] : xp[n] || co
  },
  _2 = function(t) {
    var r = t.type,
      n = r === void 0 ? "linear" : r,
      i = t.points,
      a = i === void 0 ? [] : i,
      o = t.baseLine,
      u = t.layout,
      c = t.connectNulls,
      s = c === void 0 ? !1 : c,
      f = P2(n, u),
      l = s ? a.filter(function(d) {
        return Vi(d)
      }) : a,
      p;
    if (Array.isArray(o)) {
      var h = s ? o.filter(function(d) {
          return Vi(d)
        }) : o,
        v = l.map(function(d, y) {
          return bp(bp({}, d), {}, {
            base: h[y]
          })
        });
      return u === "vertical" ? p = Li().y(Cn).x1(Mn).x0(function(d) {
        return d.base.x
      }) : p = Li().x(Mn).y1(Cn).y0(function(d) {
        return d.base.y
      }), p.defined(Vi).curve(f), p(v)
    }
    return u === "vertical" && R(o) ? p = Li().y(Cn).x1(Mn).x0(o) : R(o) ? p = Li().x(Mn).y1(Cn).y0(o) : p = rd().x(Mn).y(Cn), p.defined(Vi).curve(f), p(l)
  },
  Ft = function(t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      a = t.pathRef;
    if ((!n || !n.length) && !i) return null;
    var o = n && n.length ? _2(t) : i;
    return L.createElement("path", ic({}, U(t, !1), Ji(t), {
      className: Z("recharts-curve", r),
      d: o,
      ref: a
    }))
  };

function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, li(e)
}

function Ea() {
  return Ea = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ea.apply(this, arguments)
}

function S2(e, t) {
  return j2(e) || E2(e, t) || T2(e, t) || $2()
}

function $2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function T2(e, t) {
  if (e) {
    if (typeof e == "string") return wp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wp(e, t)
  }
}

function wp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function E2(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function j2(e) {
  if (Array.isArray(e)) return e
}

function Op(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ap(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Op(Object(r), !0).forEach(function(n) {
      M2(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Op(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function M2(e, t, r) {
  return t = C2(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function C2(e) {
  var t = I2(e, "string");
  return li(t) == "symbol" ? t : t + ""
}

function I2(e, t) {
  if (li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Pp = function(t, r, n, i, a) {
    var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      u = i >= 0 ? 1 : -1,
      c = n >= 0 ? 1 : -1,
      s = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0,
      f;
    if (o > 0 && a instanceof Array) {
      for (var l = [0, 0, 0, 0], p = 0, h = 4; p < h; p++) l[p] = a[p] > o ? o : a[p];
      f = "M".concat(t, ",").concat(r + u * l[0]), l[0] > 0 && (f += "A ".concat(l[0], ",").concat(l[0], ",0,0,").concat(s, ",").concat(t + c * l[0], ",").concat(r)), f += "L ".concat(t + n - c * l[1], ",").concat(r), l[1] > 0 && (f += "A ".concat(l[1], ",").concat(l[1], ",0,0,").concat(s, `,
        `).concat(t + n, ",").concat(r + u * l[1])), f += "L ".concat(t + n, ",").concat(r + i - u * l[2]), l[2] > 0 && (f += "A ".concat(l[2], ",").concat(l[2], ",0,0,").concat(s, `,
        `).concat(t + n - c * l[2], ",").concat(r + i)), f += "L ".concat(t + c * l[3], ",").concat(r + i), l[3] > 0 && (f += "A ".concat(l[3], ",").concat(l[3], ",0,0,").concat(s, `,
        `).concat(t, ",").concat(r + i - u * l[3])), f += "Z"
    } else if (o > 0 && a === +a && a > 0) {
      var v = Math.min(o, a);
      f = "M ".concat(t, ",").concat(r + u * v, `
            A `).concat(v, ",").concat(v, ",0,0,").concat(s, ",").concat(t + c * v, ",").concat(r, `
            L `).concat(t + n - c * v, ",").concat(r, `
            A `).concat(v, ",").concat(v, ",0,0,").concat(s, ",").concat(t + n, ",").concat(r + u * v, `
            L `).concat(t + n, ",").concat(r + i - u * v, `
            A `).concat(v, ",").concat(v, ",0,0,").concat(s, ",").concat(t + n - c * v, ",").concat(r + i, `
            L `).concat(t + c * v, ",").concat(r + i, `
            A `).concat(v, ",").concat(v, ",0,0,").concat(s, ",").concat(t, ",").concat(r + i - u * v, " Z")
    } else f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
    return f
  },
  k2 = function(t, r) {
    if (!t || !r) return !1;
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y,
      u = r.width,
      c = r.height;
    if (Math.abs(u) > 0 && Math.abs(c) > 0) {
      var s = Math.min(a, a + u),
        f = Math.max(a, a + u),
        l = Math.min(o, o + c),
        p = Math.max(o, o + c);
      return n >= s && n <= f && i >= l && i <= p
    }
    return !1
  },
  D2 = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease"
  },
  Es = function(t) {
    var r = Ap(Ap({}, D2), t),
      n = L.useRef(),
      i = L.useState(-1),
      a = S2(i, 2),
      o = a[0],
      u = a[1];
    L.useEffect(function() {
      if (n.current && n.current.getTotalLength) try {
        var O = n.current.getTotalLength();
        O && u(O)
      } catch {}
    }, []);
    var c = r.x,
      s = r.y,
      f = r.width,
      l = r.height,
      p = r.radius,
      h = r.className,
      v = r.animationEasing,
      d = r.animationDuration,
      y = r.animationBegin,
      b = r.isAnimationActive,
      x = r.isUpdateAnimationActive;
    if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0) return null;
    var w = Z("recharts-rectangle", h);
    return x ? P.createElement(lt, {
      canBegin: o > 0,
      from: {
        width: f,
        height: l,
        x: c,
        y: s
      },
      to: {
        width: f,
        height: l,
        x: c,
        y: s
      },
      duration: d,
      animationEasing: v,
      isActive: x
    }, function(O) {
      var m = O.width,
        g = O.height,
        A = O.x,
        _ = O.y;
      return P.createElement(lt, {
        canBegin: o > 0,
        from: "0px ".concat(o === -1 ? 1 : o, "px"),
        to: "".concat(o, "px 0px"),
        attributeName: "strokeDasharray",
        begin: y,
        duration: d,
        isActive: b,
        easing: v
      }, P.createElement("path", Ea({}, U(r, !0), {
        className: w,
        d: Pp(A, _, m, g, p),
        ref: n
      })))
    }) : P.createElement("path", Ea({}, U(r, !0), {
      className: w,
      d: Pp(c, s, f, l, p)
    }))
  },
  N2 = ["points", "className", "baseLinePoints", "connectNulls"];

function Sr() {
  return Sr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Sr.apply(this, arguments)
}

function L2(e, t) {
  if (e == null) return {};
  var r = R2(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function R2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function _p(e) {
  return W2(e) || z2(e) || F2(e) || B2()
}

function B2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function F2(e, t) {
  if (e) {
    if (typeof e == "string") return ac(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ac(e, t)
  }
}

function z2(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function W2(e) {
  if (Array.isArray(e)) return ac(e)
}

function ac(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var Sp = function(t) {
    return t && t.x === +t.x && t.y === +t.y
  },
  U2 = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      r = [
        []
      ];
    return t.forEach(function(n) {
      Sp(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([])
    }), Sp(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r
  },
  Ln = function(t, r) {
    var n = U2(t);
    r && (n = [n.reduce(function(a, o) {
      return [].concat(_p(a), _p(o))
    }, [])]);
    var i = n.map(function(a) {
      return a.reduce(function(o, u, c) {
        return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y)
      }, "")
    }).join("");
    return n.length === 1 ? "".concat(i, "Z") : i
  },
  K2 = function(t, r, n) {
    var i = Ln(t, n);
    return "".concat(i.slice(-1) === "Z" ? i.slice(0, -1) : i, "L").concat(Ln(r.reverse(), n).slice(1))
  },
  ly = function(t) {
    var r = t.points,
      n = t.className,
      i = t.baseLinePoints,
      a = t.connectNulls,
      o = L2(t, N2);
    if (!r || !r.length) return null;
    var u = Z("recharts-polygon", n);
    if (i && i.length) {
      var c = o.stroke && o.stroke !== "none",
        s = K2(r, i, a);
      return P.createElement("g", {
        className: u
      }, P.createElement("path", Sr({}, U(o, !0), {
        fill: s.slice(-1) === "Z" ? o.fill : "none",
        stroke: "none",
        d: s
      })), c ? P.createElement("path", Sr({}, U(o, !0), {
        fill: "none",
        d: Ln(r, a)
      })) : null, c ? P.createElement("path", Sr({}, U(o, !0), {
        fill: "none",
        d: Ln(i, a)
      })) : null)
    }
    var f = Ln(r, a);
    return P.createElement("path", Sr({}, U(o, !0), {
      fill: f.slice(-1) === "Z" ? o.fill : "none",
      className: u,
      d: f
    }))
  };

function oc() {
  return oc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, oc.apply(this, arguments)
}
var An = function(t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    a = t.className,
    o = Z("recharts-dot", a);
  return r === +r && n === +n && i === +i ? L.createElement("circle", oc({}, U(t, !1), Ji(t), {
    className: o,
    cx: r,
    cy: n,
    r: i
  })) : null
};

function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, fi(e)
}
var H2 = ["x", "y", "top", "left", "width", "height", "className"];

function uc() {
  return uc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, uc.apply(this, arguments)
}

function $p(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function G2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $p(Object(r), !0).forEach(function(n) {
      V2(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $p(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function V2(e, t, r) {
  return t = X2(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function X2(e) {
  var t = q2(e, "string");
  return fi(t) == "symbol" ? t : t + ""
}

function q2(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Y2(e, t) {
  if (e == null) return {};
  var r = Z2(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Z2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var J2 = function(t, r, n, i, a, o) {
    return "M".concat(t, ",").concat(a, "v").concat(i, "M").concat(o, ",").concat(r, "h").concat(n)
  },
  Q2 = function(t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      a = i === void 0 ? 0 : i,
      o = t.top,
      u = o === void 0 ? 0 : o,
      c = t.left,
      s = c === void 0 ? 0 : c,
      f = t.width,
      l = f === void 0 ? 0 : f,
      p = t.height,
      h = p === void 0 ? 0 : p,
      v = t.className,
      d = Y2(t, H2),
      y = G2({
        x: n,
        y: a,
        top: u,
        left: s,
        width: l,
        height: h
      }, d);
    return !R(n) || !R(a) || !R(l) || !R(h) || !R(u) || !R(s) ? null : P.createElement("path", uc({}, U(y, !0), {
      className: Z("recharts-cross", v),
      d: J2(n, a, l, h, u, s)
    }))
  },
  eD = ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"];

function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, pi(e)
}

function tD(e, t) {
  if (e == null) return {};
  var r = rD(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function rD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Tt() {
  return Tt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Tt.apply(this, arguments)
}

function Tp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function hi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tp(Object(r), !0).forEach(function(n) {
      nD(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function nD(e, t, r) {
  return t = iD(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function iD(e) {
  var t = aD(e, "string");
  return pi(t) == "symbol" ? t : t + ""
}

function aD(e, t) {
  if (pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var oD = function(t, r, n, i) {
    var a = "";
    return i.forEach(function(o, u) {
      var c = ne(r, n, t, o);
      u ? a += "L ".concat(c.x, ",").concat(c.y) : a += "M ".concat(c.x, ",").concat(c.y)
    }), a += "Z", a
  },
  uD = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.polarAngles,
      u = t.radialLines;
    if (!o || !o.length || !u) return null;
    var c = hi({
      stroke: "#ccc"
    }, U(t, !1));
    return P.createElement("g", {
      className: "recharts-polar-grid-angle"
    }, o.map(function(s) {
      var f = ne(r, n, i, s),
        l = ne(r, n, a, s);
      return P.createElement("line", Tt({}, c, {
        key: "line-".concat(s),
        x1: f.x,
        y1: f.y,
        x2: l.x,
        y2: l.y
      }))
    }))
  },
  cD = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      a = t.index,
      o = hi(hi({
        stroke: "#ccc"
      }, U(t, !1)), {}, {
        fill: "none"
      });
    return P.createElement("circle", Tt({}, o, {
      className: Z("recharts-polar-grid-concentric-circle", t.className),
      key: "circle-".concat(a),
      cx: r,
      cy: n,
      r: i
    }))
  },
  sD = function(t) {
    var r = t.radius,
      n = t.index,
      i = hi(hi({
        stroke: "#ccc"
      }, U(t, !1)), {}, {
        fill: "none"
      });
    return P.createElement("path", Tt({}, i, {
      className: Z("recharts-polar-grid-concentric-polygon", t.className),
      key: "path-".concat(n),
      d: oD(r, t.cx, t.cy, t.polarAngles)
    }))
  },
  lD = function(t) {
    var r = t.polarRadius,
      n = t.gridType;
    return !r || !r.length ? null : P.createElement("g", {
      className: "recharts-polar-grid-concentric"
    }, r.map(function(i, a) {
      var o = a;
      return n === "circle" ? P.createElement(cD, Tt({
        key: o
      }, t, {
        radius: i,
        index: a
      })) : P.createElement(sD, Tt({
        key: o
      }, t, {
        radius: i,
        index: a
      }))
    }))
  },
  fD = function(t) {
    var r = t.cx,
      n = r === void 0 ? 0 : r,
      i = t.cy,
      a = i === void 0 ? 0 : i,
      o = t.innerRadius,
      u = o === void 0 ? 0 : o,
      c = t.outerRadius,
      s = c === void 0 ? 0 : c,
      f = t.gridType,
      l = f === void 0 ? "polygon" : f,
      p = t.radialLines,
      h = p === void 0 ? !0 : p,
      v = tD(t, eD);
    return s <= 0 ? null : P.createElement("g", {
      className: "recharts-polar-grid"
    }, P.createElement(uD, Tt({
      cx: n,
      cy: a,
      innerRadius: u,
      outerRadius: s,
      gridType: l,
      radialLines: h
    }, v)), P.createElement(lD, Tt({
      cx: n,
      cy: a,
      innerRadius: u,
      outerRadius: s,
      gridType: l,
      radialLines: h
    }, v)))
  };
fD.displayName = "PolarGrid";
var pD = Oo,
  hD = Ev,
  dD = ht;

function vD(e, t) {
  return e && e.length ? pD(e, dD(t), hD) : void 0
}
var yD = vD;
const mD = ae(yD);
var gD = Oo,
  bD = ht,
  xD = jv;

function wD(e, t) {
  return e && e.length ? gD(e, bD(t), xD) : void 0
}
var OD = wD;
const AD = ae(OD);
var PD = ["cx", "cy", "angle", "ticks", "axisLine"],
  _D = ["ticks", "tick", "angle", "tickFormatter", "stroke"];

function Kr(e) {
  "@babel/helpers - typeof";
  return Kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Kr(e)
}

function Rn() {
  return Rn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Rn.apply(this, arguments)
}

function Ep(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ep(Object(r), !0).forEach(function(n) {
      So(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ep(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function jp(e, t) {
  if (e == null) return {};
  var r = SD(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function SD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function $D(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Mp(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, py(n.key), n)
  }
}

function TD(e, t, r) {
  return t && Mp(e.prototype, t), r && Mp(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ED(e, t, r) {
  return t = ja(t), jD(e, fy() ? Reflect.construct(t, r || [], ja(e).constructor) : t.apply(e, r))
}

function jD(e, t) {
  if (t && (Kr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return MD(e)
}

function MD(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function fy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (fy = function() {
    return !!e
  })()
}

function ja(e) {
  return ja = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ja(e)
}

function CD(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && cc(e, t)
}

function cc(e, t) {
  return cc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, cc(e, t)
}

function So(e, t, r) {
  return t = py(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function py(e) {
  var t = ID(e, "string");
  return Kr(t) == "symbol" ? t : t + ""
}

function ID(e, t) {
  if (Kr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Kr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Ei = function(e) {
  function t() {
    return $D(this, t), ED(this, t, arguments)
  }
  return CD(t, e), TD(t, [{
    key: "getTickValueCoord",
    value: function(n) {
      var i = n.coordinate,
        a = this.props,
        o = a.angle,
        u = a.cx,
        c = a.cy;
      return ne(u, c, i, o)
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation,
        i;
      switch (n) {
        case "left":
          i = "end";
          break;
        case "right":
          i = "start";
          break;
        default:
          i = "middle";
          break
      }
      return i
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props,
        i = n.cx,
        a = n.cy,
        o = n.angle,
        u = n.ticks,
        c = mD(u, function(f) {
          return f.coordinate || 0
        }),
        s = AD(u, function(f) {
          return f.coordinate || 0
        });
      return {
        cx: i,
        cy: a,
        startAngle: o,
        endAngle: o,
        innerRadius: s.coordinate || 0,
        outerRadius: c.coordinate || 0
      }
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props,
        i = n.cx,
        a = n.cy,
        o = n.angle,
        u = n.ticks,
        c = n.axisLine,
        s = jp(n, PD),
        f = u.reduce(function(v, d) {
          return [Math.min(v[0], d.coordinate), Math.max(v[1], d.coordinate)]
        }, [1 / 0, -1 / 0]),
        l = ne(i, a, f[0], o),
        p = ne(i, a, f[1], o),
        h = Zt(Zt(Zt({}, U(s, !1)), {}, {
          fill: "none"
        }, U(c, !1)), {}, {
          x1: l.x,
          y1: l.y,
          x2: p.x,
          y2: p.y
        });
      return P.createElement("line", Rn({
        className: "recharts-polar-radius-axis-line"
      }, h))
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this,
        i = this.props,
        a = i.ticks,
        o = i.tick,
        u = i.angle,
        c = i.tickFormatter,
        s = i.stroke,
        f = jp(i, _D),
        l = this.getTickTextAnchor(),
        p = U(f, !1),
        h = U(o, !1),
        v = a.map(function(d, y) {
          var b = n.getTickValueCoord(d),
            x = Zt(Zt(Zt(Zt({
              textAnchor: l,
              transform: "rotate(".concat(90 - u, ", ").concat(b.x, ", ").concat(b.y, ")")
            }, p), {}, {
              stroke: "none",
              fill: s
            }, h), {}, {
              index: y
            }, b), {}, {
              payload: d
            });
          return P.createElement(J, Rn({
            className: Z("recharts-polar-radius-axis-tick", ay(o)),
            key: "tick-".concat(d.coordinate)
          }, zt(n.props, d, y)), t.renderTickItem(o, x, c ? c(d.value, y) : d.value))
        });
      return P.createElement(J, {
        className: "recharts-polar-radius-axis-ticks"
      }, v)
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.ticks,
        a = n.axisLine,
        o = n.tick;
      return !i || !i.length ? null : P.createElement(J, {
        className: Z("recharts-polar-radius-axis", this.props.className)
      }, a && this.renderAxisLine(), o && this.renderTicks(), $e.renderCallByParent(this.props, this.getViewBox()))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return P.isValidElement(n) ? o = P.cloneElement(n, i) : G(n) ? o = n(i) : o = P.createElement(fr, Rn({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), a), o
    }
  }])
}(L.PureComponent);
So(Ei, "displayName", "PolarRadiusAxis");
So(Ei, "axisType", "radiusAxis");
So(Ei, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});

function Hr(e) {
  "@babel/helpers - typeof";
  return Hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Hr(e)
}

function rr() {
  return rr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, rr.apply(this, arguments)
}

function Cp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Jt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cp(Object(r), !0).forEach(function(n) {
      $o(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function kD(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Ip(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, dy(n.key), n)
  }
}

function DD(e, t, r) {
  return t && Ip(e.prototype, t), r && Ip(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ND(e, t, r) {
  return t = Ma(t), LD(e, hy() ? Reflect.construct(t, r || [], Ma(e).constructor) : t.apply(e, r))
}

function LD(e, t) {
  if (t && (Hr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return RD(e)
}

function RD(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function hy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (hy = function() {
    return !!e
  })()
}

function Ma(e) {
  return Ma = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ma(e)
}

function BD(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && sc(e, t)
}

function sc(e, t) {
  return sc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, sc(e, t)
}

function $o(e, t, r) {
  return t = dy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function dy(e) {
  var t = FD(e, "string");
  return Hr(t) == "symbol" ? t : t + ""
}

function FD(e, t) {
  if (Hr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var zD = Math.PI / 180,
  kp = 1e-5,
  ji = function(e) {
    function t() {
      return kD(this, t), ND(this, t, arguments)
    }
    return BD(t, e), DD(t, [{
      key: "getTickLineCoord",
      value: function(n) {
        var i = this.props,
          a = i.cx,
          o = i.cy,
          u = i.radius,
          c = i.orientation,
          s = i.tickSize,
          f = s || 8,
          l = ne(a, o, u, n.coordinate),
          p = ne(a, o, u + (c === "inner" ? -1 : 1) * f, n.coordinate);
        return {
          x1: l.x,
          y1: l.y,
          x2: p.x,
          y2: p.y
        }
      }
    }, {
      key: "getTickTextAnchor",
      value: function(n) {
        var i = this.props.orientation,
          a = Math.cos(-n.coordinate * zD),
          o;
        return a > kp ? o = i === "outer" ? "start" : "end" : a < -kp ? o = i === "outer" ? "end" : "start" : o = "middle", o
      }
    }, {
      key: "renderAxisLine",
      value: function() {
        var n = this.props,
          i = n.cx,
          a = n.cy,
          o = n.radius,
          u = n.axisLine,
          c = n.axisLineType,
          s = Jt(Jt({}, U(this.props, !1)), {}, {
            fill: "none"
          }, U(u, !1));
        if (c === "circle") return P.createElement(An, rr({
          className: "recharts-polar-angle-axis-line"
        }, s, {
          cx: i,
          cy: a,
          r: o
        }));
        var f = this.props.ticks,
          l = f.map(function(p) {
            return ne(i, a, o, p.coordinate)
          });
        return P.createElement(ly, rr({
          className: "recharts-polar-angle-axis-line"
        }, s, {
          points: l
        }))
      }
    }, {
      key: "renderTicks",
      value: function() {
        var n = this,
          i = this.props,
          a = i.ticks,
          o = i.tick,
          u = i.tickLine,
          c = i.tickFormatter,
          s = i.stroke,
          f = U(this.props, !1),
          l = U(o, !1),
          p = Jt(Jt({}, f), {}, {
            fill: "none"
          }, U(u, !1)),
          h = a.map(function(v, d) {
            var y = n.getTickLineCoord(v),
              b = n.getTickTextAnchor(v),
              x = Jt(Jt(Jt({
                textAnchor: b
              }, f), {}, {
                stroke: "none",
                fill: s
              }, l), {}, {
                index: d,
                payload: v,
                x: y.x2,
                y: y.y2
              });
            return P.createElement(J, rr({
              className: Z("recharts-polar-angle-axis-tick", ay(o)),
              key: "tick-".concat(v.coordinate)
            }, zt(n.props, v, d)), u && P.createElement("line", rr({
              className: "recharts-polar-angle-axis-tick-line"
            }, p, y)), o && t.renderTickItem(o, x, c ? c(v.value, d) : v.value))
          });
        return P.createElement(J, {
          className: "recharts-polar-angle-axis-ticks"
        }, h)
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.ticks,
          a = n.radius,
          o = n.axisLine;
        return a <= 0 || !i || !i.length ? null : P.createElement(J, {
          className: Z("recharts-polar-angle-axis", this.props.className)
        }, o && this.renderAxisLine(), this.renderTicks())
      }
    }], [{
      key: "renderTickItem",
      value: function(n, i, a) {
        var o;
        return P.isValidElement(n) ? o = P.cloneElement(n, i) : G(n) ? o = n(i) : o = P.createElement(fr, rr({}, i, {
          className: "recharts-polar-angle-axis-tick-value"
        }), a), o
      }
    }])
  }(L.PureComponent);
$o(ji, "displayName", "PolarAngleAxis");
$o(ji, "axisType", "angleAxis");
$o(ji, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var WD = Sd,
  UD = WD(Object.getPrototypeOf, Object),
  KD = UD,
  HD = Et,
  GD = KD,
  VD = jt,
  XD = "[object Object]",
  qD = Function.prototype,
  YD = Object.prototype,
  vy = qD.toString,
  ZD = YD.hasOwnProperty,
  JD = vy.call(Object);

function QD(e) {
  if (!VD(e) || HD(e) != XD) return !1;
  var t = GD(e);
  if (t === null) return !0;
  var r = ZD.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && vy.call(r) == JD
}
var eN = QD;
const tN = ae(eN);
var rN = Et,
  nN = jt,
  iN = "[object Boolean]";

function aN(e) {
  return e === !0 || e === !1 || nN(e) && rN(e) == iN
}
var oN = aN;
const uN = ae(oN);

function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, di(e)
}

function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ca.apply(this, arguments)
}

function cN(e, t) {
  return pN(e) || fN(e, t) || lN(e, t) || sN()
}

function sN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function lN(e, t) {
  if (e) {
    if (typeof e == "string") return Dp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dp(e, t)
  }
}

function Dp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function fN(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function pN(e) {
  if (Array.isArray(e)) return e
}

function Np(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Lp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Np(Object(r), !0).forEach(function(n) {
      hN(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Np(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function hN(e, t, r) {
  return t = dN(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function dN(e) {
  var t = vN(e, "string");
  return di(t) == "symbol" ? t : t + ""
}

function vN(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Rp = function(t, r, n, i, a) {
    var o = n - i,
      u;
    return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + a), u += "L ".concat(t + n - o / 2 - i, ",").concat(r + a), u += "L ".concat(t, ",").concat(r, " Z"), u
  },
  yN = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease"
  },
  mN = function(t) {
    var r = Lp(Lp({}, yN), t),
      n = L.useRef(),
      i = L.useState(-1),
      a = cN(i, 2),
      o = a[0],
      u = a[1];
    L.useEffect(function() {
      if (n.current && n.current.getTotalLength) try {
        var w = n.current.getTotalLength();
        w && u(w)
      } catch {}
    }, []);
    var c = r.x,
      s = r.y,
      f = r.upperWidth,
      l = r.lowerWidth,
      p = r.height,
      h = r.className,
      v = r.animationEasing,
      d = r.animationDuration,
      y = r.animationBegin,
      b = r.isUpdateAnimationActive;
    if (c !== +c || s !== +s || f !== +f || l !== +l || p !== +p || f === 0 && l === 0 || p === 0) return null;
    var x = Z("recharts-trapezoid", h);
    return b ? P.createElement(lt, {
      canBegin: o > 0,
      from: {
        upperWidth: 0,
        lowerWidth: 0,
        height: p,
        x: c,
        y: s
      },
      to: {
        upperWidth: f,
        lowerWidth: l,
        height: p,
        x: c,
        y: s
      },
      duration: d,
      animationEasing: v,
      isActive: b
    }, function(w) {
      var O = w.upperWidth,
        m = w.lowerWidth,
        g = w.height,
        A = w.x,
        _ = w.y;
      return P.createElement(lt, {
        canBegin: o > 0,
        from: "0px ".concat(o === -1 ? 1 : o, "px"),
        to: "".concat(o, "px 0px"),
        attributeName: "strokeDasharray",
        begin: y,
        duration: d,
        easing: v
      }, P.createElement("path", Ca({}, U(r, !0), {
        className: x,
        d: Rp(A, _, O, m, g),
        ref: n
      })))
    }) : P.createElement("g", null, P.createElement("path", Ca({}, U(r, !0), {
      className: x,
      d: Rp(c, s, f, l, p)
    })))
  },
  gN = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function vi(e) {
  "@babel/helpers - typeof";
  return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, vi(e)
}

function bN(e, t) {
  if (e == null) return {};
  var r = xN(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function xN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Bp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ia(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bp(Object(r), !0).forEach(function(n) {
      wN(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function wN(e, t, r) {
  return t = ON(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ON(e) {
  var t = AN(e, "string");
  return vi(t) == "symbol" ? t : t + ""
}

function AN(e, t) {
  if (vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function PN(e, t) {
  return Ia(Ia({}, t), e)
}

function _N(e, t) {
  return e === "symbols"
}

function Fp(e) {
  var t = e.shapeType,
    r = e.elementProps;
  switch (t) {
    case "rectangle":
      return P.createElement(Es, r);
    case "trapezoid":
      return P.createElement(mN, r);
    case "sector":
      return P.createElement(sy, r);
    case "symbols":
      if (_N(t)) return P.createElement(lo, r);
      break;
    default:
      return null
  }
}

function SN(e) {
  return L.isValidElement(e) ? e.props : e
}

function ka(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? PN : n,
    a = e.activeClassName,
    o = a === void 0 ? "recharts-active-shape" : a,
    u = e.isActive,
    c = bN(e, gN),
    s;
  if (L.isValidElement(t)) s = L.cloneElement(t, Ia(Ia({}, c), SN(t)));
  else if (G(t)) s = t(c);
  else if (tN(t) && !uN(t)) {
    var f = i(t, c);
    s = P.createElement(Fp, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var l = c;
    s = P.createElement(Fp, {
      shapeType: r,
      elementProps: l
    })
  }
  return u ? P.createElement(J, {
    className: o
  }, s) : s
}

function To(e, t) {
  return t != null && "trapezoids" in e.props
}

function Eo(e, t) {
  return t != null && "sectors" in e.props
}

function yi(e, t) {
  return t != null && "points" in e.props
}

function $N(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x,
    a = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && a
}

function TN(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle;
  return r && n
}

function EN(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z;
  return r && n && i
}

function jN(e, t) {
  var r;
  return To(e, t) ? r = $N : Eo(e, t) ? r = TN : yi(e, t) && (r = EN), r
}

function MN(e, t) {
  var r;
  return To(e, t) ? r = "trapezoids" : Eo(e, t) ? r = "sectors" : yi(e, t) && (r = "points"), r
}

function CN(e, t) {
  if (To(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (Eo(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return yi(e, t) ? t.payload : {}
}

function IN(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = MN(r, t),
    a = CN(r, t),
    o = n.filter(function(c, s) {
      var f = $t(a, c),
        l = r.props[i].filter(function(v) {
          var d = jN(r, t);
          return d(v, t)
        }),
        p = r.props[i].indexOf(l[l.length - 1]),
        h = s === p;
      return f && h
    }),
    u = n.indexOf(o[o.length - 1]);
  return u
}
var Yi;

function Gr(e) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Gr(e)
}

function $r() {
  return $r = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, $r.apply(this, arguments)
}

function zp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function se(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zp(Object(r), !0).forEach(function(n) {
      Ye(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function kN(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Wp(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, my(n.key), n)
  }
}

function DN(e, t, r) {
  return t && Wp(e.prototype, t), r && Wp(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function NN(e, t, r) {
  return t = Da(t), LN(e, yy() ? Reflect.construct(t, r || [], Da(e).constructor) : t.apply(e, r))
}

function LN(e, t) {
  if (t && (Gr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return RN(e)
}

function RN(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function yy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (yy = function() {
    return !!e
  })()
}

function Da(e) {
  return Da = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Da(e)
}

function BN(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && lc(e, t)
}

function lc(e, t) {
  return lc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, lc(e, t)
}

function Ye(e, t, r) {
  return t = my(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function my(e) {
  var t = FN(e, "string");
  return Gr(t) == "symbol" ? t : t + ""
}

function FN(e, t) {
  if (Gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Gt = function(e) {
  function t(r) {
    var n;
    return kN(this, t), n = NN(this, t, [r]), Ye(n, "pieRef", null), Ye(n, "sectorRefs", []), Ye(n, "id", Ut("recharts-pie-")), Ye(n, "handleAnimationEnd", function() {
      var i = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), G(i) && i()
    }), Ye(n, "handleAnimationStart", function() {
      var i = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), G(i) && i()
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n
  }
  return BN(t, e), DN(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var i = this.props.activeIndex;
      return Array.isArray(i) ? i.indexOf(n) !== -1 : n === i
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished) return null;
      var a = this.props,
        o = a.label,
        u = a.labelLine,
        c = a.dataKey,
        s = a.valueKey,
        f = U(this.props, !1),
        l = U(o, !1),
        p = U(u, !1),
        h = o && o.offsetRadius || 20,
        v = n.map(function(d, y) {
          var b = (d.startAngle + d.endAngle) / 2,
            x = ne(d.cx, d.cy, d.outerRadius + h, b),
            w = se(se(se(se({}, f), d), {}, {
              stroke: "none"
            }, l), {}, {
              index: y,
              textAnchor: t.getTextAnchor(x.x, d.cx)
            }, x),
            O = se(se(se(se({}, f), d), {}, {
              fill: "none",
              stroke: d.fill
            }, p), {}, {
              index: y,
              points: [ne(d.cx, d.cy, d.outerRadius, b), x]
            }),
            m = c;
          return V(c) && V(s) ? m = "value" : V(c) && (m = s), P.createElement(J, {
            key: "label-".concat(d.startAngle, "-").concat(d.endAngle, "-").concat(d.midAngle, "-").concat(y)
          }, u && t.renderLabelLineItem(u, O, "line"), t.renderLabelItem(o, w, ue(d, m)))
        });
      return P.createElement(J, {
        className: "recharts-pie-labels"
      }, v)
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this,
        a = this.props,
        o = a.activeShape,
        u = a.blendStroke,
        c = a.inactiveShape;
      return n.map(function(s, f) {
        if (s?.startAngle === 0 && s?.endAngle === 0 && n.length !== 1) return null;
        var l = i.isActiveIndex(f),
          p = c && i.hasActiveIndex() ? c : null,
          h = l ? o : p,
          v = se(se({}, s), {}, {
            stroke: u ? s.fill : s.stroke,
            tabIndex: -1
          });
        return P.createElement(J, $r({
          ref: function(y) {
            y && !i.sectorRefs.includes(y) && i.sectorRefs.push(y)
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, zt(i.props, s, f), {
          key: "sector-".concat(s?.startAngle, "-").concat(s?.endAngle, "-").concat(s.midAngle, "-").concat(f)
        }), P.createElement(ka, $r({
          option: h,
          isActive: l,
          shapeType: "sector"
        }, v)))
      })
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        a = i.sectors,
        o = i.isAnimationActive,
        u = i.animationBegin,
        c = i.animationDuration,
        s = i.animationEasing,
        f = i.animationId,
        l = this.state,
        p = l.prevSectors,
        h = l.prevIsAnimationActive;
      return P.createElement(lt, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f, "-").concat(h),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(v) {
        var d = v.t,
          y = [],
          b = a && a[0],
          x = b.startAngle;
        return a.forEach(function(w, O) {
          var m = p && p[O],
            g = O > 0 ? He(w, "paddingAngle", 0) : 0;
          if (m) {
            var A = oe(m.endAngle - m.startAngle, w.endAngle - w.startAngle),
              _ = se(se({}, w), {}, {
                startAngle: x + g,
                endAngle: x + A(d) + g
              });
            y.push(_), x = _.endAngle
          } else {
            var S = w.endAngle,
              E = w.startAngle,
              T = oe(0, S - E),
              $ = T(d),
              I = se(se({}, w), {}, {
                startAngle: x + g,
                endAngle: x + $ + g
              });
            y.push(I), x = I.endAngle
          }
        }), P.createElement(J, null, n.renderSectorsStatically(y))
      })
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var i = this;
      n.onkeydown = function(a) {
        if (!a.altKey) switch (a.key) {
          case "ArrowLeft": {
            var o = ++i.state.sectorToFocus % i.sectorRefs.length;
            i.sectorRefs[o].focus(), i.setState({
              sectorToFocus: o
            });
            break
          }
          case "ArrowRight": {
            var u = --i.state.sectorToFocus < 0 ? i.sectorRefs.length - 1 : i.state.sectorToFocus % i.sectorRefs.length;
            i.sectorRefs[u].focus(), i.setState({
              sectorToFocus: u
            });
            break
          }
          case "Escape": {
            i.sectorRefs[i.state.sectorToFocus].blur(), i.setState({
              sectorToFocus: 0
            });
            break
          }
        }
      }
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props,
        i = n.sectors,
        a = n.isAnimationActive,
        o = this.state.prevSectors;
      return a && i && i.length && (!o || !$t(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i)
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef)
    }
  }, {
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        a = i.hide,
        o = i.sectors,
        u = i.className,
        c = i.label,
        s = i.cx,
        f = i.cy,
        l = i.innerRadius,
        p = i.outerRadius,
        h = i.isAnimationActive,
        v = this.state.isAnimationFinished;
      if (a || !o || !o.length || !R(s) || !R(f) || !R(l) || !R(p)) return null;
      var d = Z("recharts-pie", u);
      return P.createElement(J, {
        tabIndex: this.props.rootTabIndex,
        className: d,
        ref: function(b) {
          n.pieRef = b
        }
      }, this.renderSectors(), c && this.renderLabels(o), $e.renderCallByParent(this.props, null, !1), (!h || v) && Je.renderCallByParent(this.props, o, !1))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return i.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: i.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== i.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null
    }
  }, {
    key: "getTextAnchor",
    value: function(n, i) {
      return n > i ? "start" : n < i ? "end" : "middle"
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, i, a) {
      if (P.isValidElement(n)) return P.cloneElement(n, i);
      if (G(n)) return n(i);
      var o = Z("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return P.createElement(Ft, $r({}, i, {
        key: a,
        type: "linear",
        className: o
      }))
    }
  }, {
    key: "renderLabelItem",
    value: function(n, i, a) {
      if (P.isValidElement(n)) return P.cloneElement(n, i);
      var o = a;
      if (G(n) && (o = n(i), P.isValidElement(o))) return o;
      var u = Z("recharts-pie-label-text", typeof n != "boolean" && !G(n) ? n.className : "");
      return P.createElement(fr, $r({}, i, {
        alignmentBaseline: "middle",
        className: u
      }), o)
    }
  }])
}(L.PureComponent);
Yi = Gt;
Ye(Gt, "displayName", "Pie");
Ye(Gt, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !dt.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
Ye(Gt, "parseDeltaAngle", function(e, t) {
  var r = Ce(t - e),
    n = Math.min(Math.abs(t - e), 360);
  return r * n
});
Ye(Gt, "getRealPieData", function(e) {
  var t = e.data,
    r = e.children,
    n = U(e, !1),
    i = De(r, vo);
  return t && t.length ? t.map(function(a, o) {
    return se(se(se({
      payload: a
    }, n), a), i && i[o] && i[o].props)
  }) : i && i.length ? i.map(function(a) {
    return se(se({}, n), a.props)
  }) : []
});
Ye(Gt, "parseCoordinateOfPie", function(e, t) {
  var r = t.top,
    n = t.left,
    i = t.width,
    a = t.height,
    o = ny(i, a),
    u = n + Ie(e.cx, i, i / 2),
    c = r + Ie(e.cy, a, a / 2),
    s = Ie(e.innerRadius, o, 0),
    f = Ie(e.outerRadius, o, o * .8),
    l = e.maxRadius || Math.sqrt(i * i + a * a) / 2;
  return {
    cx: u,
    cy: c,
    innerRadius: s,
    outerRadius: f,
    maxRadius: l
  }
});
Ye(Gt, "getComposedData", function(e) {
  var t = e.item,
    r = e.offset,
    n = t.type.defaultProps !== void 0 ? se(se({}, t.type.defaultProps), t.props) : t.props,
    i = Yi.getRealPieData(n);
  if (!i || !i.length) return null;
  var a = n.cornerRadius,
    o = n.startAngle,
    u = n.endAngle,
    c = n.paddingAngle,
    s = n.dataKey,
    f = n.nameKey,
    l = n.valueKey,
    p = n.tooltipType,
    h = Math.abs(n.minAngle),
    v = Yi.parseCoordinateOfPie(n, r),
    d = Yi.parseDeltaAngle(o, u),
    y = Math.abs(d),
    b = s;
  V(s) && V(l) ? (it(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = "value") : V(s) && (it(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = l);
  var x = i.filter(function(_) {
      return ue(_, b, 0) !== 0
    }).length,
    w = (y >= 360 ? x : x - 1) * c,
    O = y - x * h - w,
    m = i.reduce(function(_, S) {
      var E = ue(S, b, 0);
      return _ + (R(E) ? E : 0)
    }, 0),
    g;
  if (m > 0) {
    var A;
    g = i.map(function(_, S) {
      var E = ue(_, b, 0),
        T = ue(_, f, S),
        $ = (R(E) ? E : 0) / m,
        I;
      S ? I = A.endAngle + Ce(d) * c * (E !== 0 ? 1 : 0) : I = o;
      var C = I + Ce(d) * ((E !== 0 ? h : 0) + $ * O),
        j = (I + C) / 2,
        k = (v.innerRadius + v.outerRadius) / 2,
        D = [{
          name: T,
          value: E,
          payload: _,
          dataKey: b,
          type: p
        }],
        B = ne(v.cx, v.cy, k, j);
      return A = se(se(se({
        percent: $,
        cornerRadius: a,
        name: T,
        tooltipPayload: D,
        midAngle: j,
        middleRadius: k,
        tooltipPosition: B
      }, _), v), {}, {
        value: ue(_, b),
        startAngle: I,
        endAngle: C,
        payload: _,
        paddingAngle: Ce(d) * c
      }), A
    })
  }
  return se(se({}, v), {}, {
    sectors: g,
    data: i
  })
});

function zN(e) {
  return e && e.length ? e[0] : void 0
}
var WN = zN,
  UN = WN;
const KN = ae(UN);
var HN = ["key"];

function Vr(e) {
  "@babel/helpers - typeof";
  return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vr(e)
}

function GN(e, t) {
  if (e == null) return {};
  var r = VN(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function VN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Na() {
  return Na = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Na.apply(this, arguments)
}

function Up(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Up(Object(r), !0).forEach(function(n) {
      gt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Up(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function XN(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Kp(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, by(n.key), n)
  }
}

function qN(e, t, r) {
  return t && Kp(e.prototype, t), r && Kp(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function YN(e, t, r) {
  return t = La(t), ZN(e, gy() ? Reflect.construct(t, r || [], La(e).constructor) : t.apply(e, r))
}

function ZN(e, t) {
  if (t && (Vr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return JN(e)
}

function JN(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function gy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (gy = function() {
    return !!e
  })()
}

function La(e) {
  return La = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, La(e)
}

function QN(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && fc(e, t)
}

function fc(e, t) {
  return fc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, fc(e, t)
}

function gt(e, t, r) {
  return t = by(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function by(e) {
  var t = eL(e, "string");
  return Vr(t) == "symbol" ? t : t + ""
}

function eL(e, t) {
  if (Vr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var jo = function(e) {
  function t() {
    var r;
    XN(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
    return r = YN(this, t, [].concat(i)), gt(r, "state", {
      isAnimationFinished: !1
    }), gt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o()
    }), gt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o()
    }), gt(r, "handleMouseEnter", function(o) {
      var u = r.props.onMouseEnter;
      u && u(r.props, o)
    }), gt(r, "handleMouseLeave", function(o) {
      var u = r.props.onMouseLeave;
      u && u(r.props, o)
    }), r
  }
  return QN(t, e), qN(t, [{
    key: "renderDots",
    value: function(n) {
      var i = this.props,
        a = i.dot,
        o = i.dataKey,
        u = U(this.props, !1),
        c = U(a, !0),
        s = n.map(function(f, l) {
          var p = Me(Me(Me({
            key: "dot-".concat(l),
            r: 3
          }, u), c), {}, {
            dataKey: o,
            cx: f.x,
            cy: f.y,
            index: l,
            payload: f
          });
          return t.renderDotItem(a, p)
        });
      return P.createElement(J, {
        className: "recharts-radar-dots"
      }, s)
    }
  }, {
    key: "renderPolygonStatically",
    value: function(n) {
      var i = this.props,
        a = i.shape,
        o = i.dot,
        u = i.isRange,
        c = i.baseLinePoints,
        s = i.connectNulls,
        f;
      return P.isValidElement(a) ? f = P.cloneElement(a, Me(Me({}, this.props), {}, {
        points: n
      })) : G(a) ? f = a(Me(Me({}, this.props), {}, {
        points: n
      })) : f = P.createElement(ly, Na({}, U(this.props, !0), {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        points: n,
        baseLinePoints: u ? c : null,
        connectNulls: s
      })), P.createElement(J, {
        className: "recharts-radar-polygon"
      }, f, o ? this.renderDots(n) : null)
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        a = i.points,
        o = i.isAnimationActive,
        u = i.animationBegin,
        c = i.animationDuration,
        s = i.animationEasing,
        f = i.animationId,
        l = this.state.prevPoints;
      return P.createElement(lt, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radar-".concat(f),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var h = p.t,
          v = l && l.length / a.length,
          d = a.map(function(y, b) {
            var x = l && l[Math.floor(b * v)];
            if (x) {
              var w = oe(x.x, y.x),
                O = oe(x.y, y.y);
              return Me(Me({}, y), {}, {
                x: w(h),
                y: O(h)
              })
            }
            var m = oe(y.cx, y.x),
              g = oe(y.cy, y.y);
            return Me(Me({}, y), {}, {
              x: m(h),
              y: g(h)
            })
          });
        return n.renderPolygonStatically(d)
      })
    }
  }, {
    key: "renderPolygon",
    value: function() {
      var n = this.props,
        i = n.points,
        a = n.isAnimationActive,
        o = n.isRange,
        u = this.state.prevPoints;
      return a && i && i.length && !o && (!u || !$t(u, i)) ? this.renderPolygonWithAnimation() : this.renderPolygonStatically(i)
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.hide,
        a = n.className,
        o = n.points,
        u = n.isAnimationActive;
      if (i || !o || !o.length) return null;
      var c = this.state.isAnimationFinished,
        s = Z("recharts-radar", a);
      return P.createElement(J, {
        className: s
      }, this.renderPolygon(), (!u || c) && Je.renderCallByParent(this.props, o))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (P.isValidElement(n)) a = P.cloneElement(n, i);
      else if (G(n)) a = n(i);
      else {
        var o = i.key,
          u = GN(i, HN);
        a = P.createElement(An, Na({}, u, {
          key: o,
          className: Z("recharts-radar-dot", typeof n != "boolean" ? n.className : "")
        }))
      }
      return a
    }
  }])
}(L.PureComponent);
gt(jo, "displayName", "Radar");
gt(jo, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: !1,
  activeDot: !0,
  dot: !1,
  legendType: "rect",
  isAnimationActive: !dt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
gt(jo, "getComposedData", function(e) {
  var t = e.radiusAxis,
    r = e.angleAxis,
    n = e.displayedData,
    i = e.dataKey,
    a = e.bandSize,
    o = r.cx,
    u = r.cy,
    c = !1,
    s = [],
    f = r.type !== "number" ? a ?? 0 : 0;
  n.forEach(function(p, h) {
    var v = ue(p, r.dataKey, h),
      d = ue(p, i),
      y = r.scale(v) + f,
      b = Array.isArray(d) ? uy(d) : d,
      x = V(b) ? void 0 : t.scale(b);
    Array.isArray(d) && d.length >= 2 && (c = !0), s.push(Me(Me({}, ne(o, u, x, y)), {}, {
      name: v,
      value: d,
      cx: o,
      cy: u,
      radius: x,
      angle: y,
      payload: p
    }))
  });
  var l = [];
  return c && s.forEach(function(p) {
    if (Array.isArray(p.value)) {
      var h = KN(p.value),
        v = V(h) ? void 0 : t.scale(h);
      l.push(Me(Me({}, p), {}, {
        radius: v
      }, ne(o, u, v, p.angle)))
    } else l.push(p)
  }), {
    points: s,
    isRange: c,
    baseLinePoints: l
  }
});
var tL = Math.ceil,
  rL = Math.max;

function nL(e, t, r, n) {
  for (var i = -1, a = rL(tL((t - e) / (r || 1)), 0), o = Array(a); a--;) o[n ? a : ++i] = e, e += r;
  return o
}
var iL = nL,
  aL = Hd,
  Hp = 1 / 0,
  oL = 17976931348623157e292;

function uL(e) {
  if (!e) return e === 0 ? e : 0;
  if (e = aL(e), e === Hp || e === -Hp) {
    var t = e < 0 ? -1 : 1;
    return t * oL
  }
  return e === e ? e : 0
}
var xy = uL,
  cL = iL,
  sL = ho,
  uu = xy;

function lL(e) {
  return function(t, r, n) {
    return n && typeof n != "number" && sL(t, r, n) && (r = n = void 0), t = uu(t), r === void 0 ? (r = t, t = 0) : r = uu(r), n = n === void 0 ? t < r ? 1 : -1 : uu(n), cL(t, r, n, e)
  }
}
var fL = lL,
  pL = fL,
  hL = pL(),
  dL = hL;
const Ra = ae(dL);

function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, mi(e)
}

function Gp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Vp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gp(Object(r), !0).forEach(function(n) {
      wy(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function wy(e, t, r) {
  return t = vL(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function vL(e) {
  var t = yL(e, "string");
  return mi(t) == "symbol" ? t : t + ""
}

function yL(e, t) {
  if (mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var mL = ["Webkit", "Moz", "O", "ms"],
  gL = function(t, r) {
    var n = t.replace(/(\w)/, function(a) {
        return a.toUpperCase()
      }),
      i = mL.reduce(function(a, o) {
        return Vp(Vp({}, a), {}, wy({}, o + n, r))
      }, {});
    return i[t] = r, i
  };

function Xr(e) {
  "@babel/helpers - typeof";
  return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Xr(e)
}

function Ba() {
  return Ba = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ba.apply(this, arguments)
}

function Xp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function cu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xp(Object(r), !0).forEach(function(n) {
      We(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function bL(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function qp(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ay(n.key), n)
  }
}

function xL(e, t, r) {
  return t && qp(e.prototype, t), r && qp(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function wL(e, t, r) {
  return t = Fa(t), OL(e, Oy() ? Reflect.construct(t, r || [], Fa(e).constructor) : t.apply(e, r))
}

function OL(e, t) {
  if (t && (Xr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return AL(e)
}

function AL(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Oy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Oy = function() {
    return !!e
  })()
}

function Fa(e) {
  return Fa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Fa(e)
}

function PL(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && pc(e, t)
}

function pc(e, t) {
  return pc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, pc(e, t)
}

function We(e, t, r) {
  return t = Ay(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ay(e) {
  var t = _L(e, "string");
  return Xr(t) == "symbol" ? t : t + ""
}

function _L(e, t) {
  if (Xr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var SL = function(t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      a = t.x,
      o = t.width,
      u = t.travellerWidth;
    if (!r || !r.length) return {};
    var c = r.length,
      s = Dn().domain(Ra(0, c)).range([a, a + o - u]),
      f = s.domain().map(function(l) {
        return s(l)
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: s(n),
      endX: s(i),
      scale: s,
      scaleValues: f
    }
  },
  Yp = function(t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  qr = function(e) {
    function t(r) {
      var n;
      return bL(this, t), n = wL(this, t, [r]), We(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), We(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), We(n, "handleDragEnd", function() {
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !1
        }, function() {
          var i = n.props,
            a = i.endIndex,
            o = i.onDragEnd,
            u = i.startIndex;
          o?.({
            endIndex: a,
            startIndex: u
          })
        }), n.detachDragEndListener()
      }), We(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), We(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), We(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), We(n, "handleSlideDragStart", function(i) {
        var a = Yp(i) ? i.changedTouches[0] : i;
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !0,
          slideMoveStartX: a.pageX
        }), n.attachDragEndListener()
      }), n.travellerDragStartHandlers = {
        startX: n.handleTravellerDragStart.bind(n, "startX"),
        endX: n.handleTravellerDragStart.bind(n, "endX")
      }, n.state = {}, n
    }
    return PL(t, e), xL(t, [{
      key: "componentWillUnmount",
      value: function() {
        this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener()
      }
    }, {
      key: "getIndex",
      value: function(n) {
        var i = n.startX,
          a = n.endX,
          o = this.state.scaleValues,
          u = this.props,
          c = u.gap,
          s = u.data,
          f = s.length - 1,
          l = Math.min(i, a),
          p = Math.max(i, a),
          h = t.getIndexInRange(o, l),
          v = t.getIndexInRange(o, p);
        return {
          startIndex: h - h % c,
          endIndex: v === f ? f : v - v % c
        }
      }
    }, {
      key: "getTextOfTick",
      value: function(n) {
        var i = this.props,
          a = i.data,
          o = i.tickFormatter,
          u = i.dataKey,
          c = ue(a[n], u, n);
        return G(o) ? o(c, n) : c
      }
    }, {
      key: "attachDragEndListener",
      value: function() {
        window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0)
      }
    }, {
      key: "detachDragEndListener",
      value: function() {
        window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0)
      }
    }, {
      key: "handleSlideDrag",
      value: function(n) {
        var i = this.state,
          a = i.slideMoveStartX,
          o = i.startX,
          u = i.endX,
          c = this.props,
          s = c.x,
          f = c.width,
          l = c.travellerWidth,
          p = c.startIndex,
          h = c.endIndex,
          v = c.onChange,
          d = n.pageX - a;
        d > 0 ? d = Math.min(d, s + f - l - u, s + f - l - o) : d < 0 && (d = Math.max(d, s - o, s - u));
        var y = this.getIndex({
          startX: o + d,
          endX: u + d
        });
        (y.startIndex !== p || y.endIndex !== h) && v && v(y), this.setState({
          startX: o + d,
          endX: u + d,
          slideMoveStartX: n.pageX
        })
      }
    }, {
      key: "handleTravellerDragStart",
      value: function(n, i) {
        var a = Yp(i) ? i.changedTouches[0] : i;
        this.setState({
          isSlideMoving: !1,
          isTravellerMoving: !0,
          movingTravellerId: n,
          brushMoveStartX: a.pageX
        }), this.attachDragEndListener()
      }
    }, {
      key: "handleTravellerMove",
      value: function(n) {
        var i = this.state,
          a = i.brushMoveStartX,
          o = i.movingTravellerId,
          u = i.endX,
          c = i.startX,
          s = this.state[o],
          f = this.props,
          l = f.x,
          p = f.width,
          h = f.travellerWidth,
          v = f.onChange,
          d = f.gap,
          y = f.data,
          b = {
            startX: this.state.startX,
            endX: this.state.endX
          },
          x = n.pageX - a;
        x > 0 ? x = Math.min(x, l + p - h - s) : x < 0 && (x = Math.max(x, l - s)), b[o] = s + x;
        var w = this.getIndex(b),
          O = w.startIndex,
          m = w.endIndex,
          g = function() {
            var _ = y.length - 1;
            return o === "startX" && (u > c ? O % d === 0 : m % d === 0) || u < c && m === _ || o === "endX" && (u > c ? m % d === 0 : O % d === 0) || u > c && m === _
          };
        this.setState(We(We({}, o, s + x), "brushMoveStartX", n.pageX), function() {
          v && g() && v(w)
        })
      }
    }, {
      key: "handleTravellerMoveKeyboard",
      value: function(n, i) {
        var a = this,
          o = this.state,
          u = o.scaleValues,
          c = o.startX,
          s = o.endX,
          f = this.state[i],
          l = u.indexOf(f);
        if (l !== -1) {
          var p = l + n;
          if (!(p === -1 || p >= u.length)) {
            var h = u[p];
            i === "startX" && h >= s || i === "endX" && h <= c || this.setState(We({}, i, h), function() {
              a.props.onChange(a.getIndex({
                startX: a.state.startX,
                endX: a.state.endX
              }))
            })
          }
        }
      }
    }, {
      key: "renderBackground",
      value: function() {
        var n = this.props,
          i = n.x,
          a = n.y,
          o = n.width,
          u = n.height,
          c = n.fill,
          s = n.stroke;
        return P.createElement("rect", {
          stroke: s,
          fill: c,
          x: i,
          y: a,
          width: o,
          height: u
        })
      }
    }, {
      key: "renderPanorama",
      value: function() {
        var n = this.props,
          i = n.x,
          a = n.y,
          o = n.width,
          u = n.height,
          c = n.data,
          s = n.children,
          f = n.padding,
          l = L.Children.only(s);
        return l ? P.cloneElement(l, {
          x: i,
          y: a,
          width: o,
          height: u,
          margin: f,
          compact: !0,
          data: c
        }) : null
      }
    }, {
      key: "renderTravellerLayer",
      value: function(n, i) {
        var a, o, u = this,
          c = this.props,
          s = c.y,
          f = c.travellerWidth,
          l = c.height,
          p = c.traveller,
          h = c.ariaLabel,
          v = c.data,
          d = c.startIndex,
          y = c.endIndex,
          b = Math.max(n, this.props.x),
          x = cu(cu({}, U(this.props, !1)), {}, {
            x: b,
            y: s,
            width: f,
            height: l
          }),
          w = h || "Min value: ".concat((a = v[d]) === null || a === void 0 ? void 0 : a.name, ", Max value: ").concat((o = v[y]) === null || o === void 0 ? void 0 : o.name);
        return P.createElement(J, {
          tabIndex: 0,
          role: "slider",
          "aria-label": w,
          "aria-valuenow": n,
          className: "recharts-brush-traveller",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDragStartHandlers[i],
          onTouchStart: this.travellerDragStartHandlers[i],
          onKeyDown: function(m) {
            ["ArrowLeft", "ArrowRight"].includes(m.key) && (m.preventDefault(), m.stopPropagation(), u.handleTravellerMoveKeyboard(m.key === "ArrowRight" ? 1 : -1, i))
          },
          onFocus: function() {
            u.setState({
              isTravellerFocused: !0
            })
          },
          onBlur: function() {
            u.setState({
              isTravellerFocused: !1
            })
          },
          style: {
            cursor: "col-resize"
          }
        }, t.renderTraveller(p, x))
      }
    }, {
      key: "renderSlide",
      value: function(n, i) {
        var a = this.props,
          o = a.y,
          u = a.height,
          c = a.stroke,
          s = a.travellerWidth,
          f = Math.min(n, i) + s,
          l = Math.max(Math.abs(i - n) - s, 0);
        return P.createElement("rect", {
          className: "recharts-brush-slide",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.handleSlideDragStart,
          onTouchStart: this.handleSlideDragStart,
          style: {
            cursor: "move"
          },
          stroke: "none",
          fill: c,
          fillOpacity: .2,
          x: f,
          y: o,
          width: l,
          height: u
        })
      }
    }, {
      key: "renderText",
      value: function() {
        var n = this.props,
          i = n.startIndex,
          a = n.endIndex,
          o = n.y,
          u = n.height,
          c = n.travellerWidth,
          s = n.stroke,
          f = this.state,
          l = f.startX,
          p = f.endX,
          h = 5,
          v = {
            pointerEvents: "none",
            fill: s
          };
        return P.createElement(J, {
          className: "recharts-brush-texts"
        }, P.createElement(fr, Ba({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(l, p) - h,
          y: o + u / 2
        }, v), this.getTextOfTick(i)), P.createElement(fr, Ba({
          textAnchor: "start",
          verticalAnchor: "middle",
          x: Math.max(l, p) + c + h,
          y: o + u / 2
        }, v), this.getTextOfTick(a)))
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.data,
          a = n.className,
          o = n.children,
          u = n.x,
          c = n.y,
          s = n.width,
          f = n.height,
          l = n.alwaysShowText,
          p = this.state,
          h = p.startX,
          v = p.endX,
          d = p.isTextActive,
          y = p.isSlideMoving,
          b = p.isTravellerMoving,
          x = p.isTravellerFocused;
        if (!i || !i.length || !R(u) || !R(c) || !R(s) || !R(f) || s <= 0 || f <= 0) return null;
        var w = Z("recharts-brush", a),
          O = P.Children.count(o) === 1,
          m = gL("userSelect", "none");
        return P.createElement(J, {
          className: w,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: m
        }, this.renderBackground(), O && this.renderPanorama(), this.renderSlide(h, v), this.renderTravellerLayer(h, "startX"), this.renderTravellerLayer(v, "endX"), (d || y || b || x || l) && this.renderText())
      }
    }], [{
      key: "renderDefaultTraveller",
      value: function(n) {
        var i = n.x,
          a = n.y,
          o = n.width,
          u = n.height,
          c = n.stroke,
          s = Math.floor(a + u / 2) - 1;
        return P.createElement(P.Fragment, null, P.createElement("rect", {
          x: i,
          y: a,
          width: o,
          height: u,
          fill: c,
          stroke: "none"
        }), P.createElement("line", {
          x1: i + 1,
          y1: s,
          x2: i + o - 1,
          y2: s,
          fill: "none",
          stroke: "#fff"
        }), P.createElement("line", {
          x1: i + 1,
          y1: s + 2,
          x2: i + o - 1,
          y2: s + 2,
          fill: "none",
          stroke: "#fff"
        }))
      }
    }, {
      key: "renderTraveller",
      value: function(n, i) {
        var a;
        return P.isValidElement(n) ? a = P.cloneElement(n, i) : G(n) ? a = n(i) : a = t.renderDefaultTraveller(i), a
      }
    }, {
      key: "getDerivedStateFromProps",
      value: function(n, i) {
        var a = n.data,
          o = n.width,
          u = n.x,
          c = n.travellerWidth,
          s = n.updateId,
          f = n.startIndex,
          l = n.endIndex;
        if (a !== i.prevData || s !== i.prevUpdateId) return cu({
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o
        }, a && a.length ? SL({
          data: a,
          width: o,
          x: u,
          travellerWidth: c,
          startIndex: f,
          endIndex: l
        }) : {
          scale: null,
          scaleValues: null
        });
        if (i.scale && (o !== i.prevWidth || u !== i.prevX || c !== i.prevTravellerWidth)) {
          i.scale.range([u, u + o - c]);
          var p = i.scale.domain().map(function(h) {
            return i.scale(h)
          });
          return {
            prevData: a,
            prevTravellerWidth: c,
            prevUpdateId: s,
            prevX: u,
            prevWidth: o,
            startX: i.scale(n.startIndex),
            endX: i.scale(n.endIndex),
            scaleValues: p
          }
        }
        return null
      }
    }, {
      key: "getIndexInRange",
      value: function(n, i) {
        for (var a = n.length, o = 0, u = a - 1; u - o > 1;) {
          var c = Math.floor((o + u) / 2);
          n[c] > i ? u = c : o = c
        }
        return i >= n[u] ? u : o
      }
    }])
  }(L.PureComponent);
We(qr, "displayName", "Brush");
We(qr, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var $L = ts;

function TL(e, t) {
  var r;
  return $L(e, function(n, i, a) {
    return r = t(n, i, a), !r
  }), !!r
}
var EL = TL,
  jL = gd,
  ML = ht,
  CL = EL,
  IL = Be,
  kL = ho;

function DL(e, t, r) {
  var n = IL(e) ? jL : CL;
  return r && kL(e, t, r) && (t = void 0), n(e, ML(t))
}
var NL = DL;
const LL = ae(NL);
var st = function(t, r) {
    var n = t.alwaysShow,
      i = t.ifOverflow;
    return n && (i = "extendDomain"), i === r
  },
  Zp = Fd;

function RL(e, t, r) {
  t == "__proto__" && Zp ? Zp(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r
}
var BL = RL,
  FL = BL,
  zL = Rd,
  WL = ht;

function UL(e, t) {
  var r = {};
  return t = WL(t), zL(e, function(n, i, a) {
    FL(r, i, t(n, i, a))
  }), r
}
var KL = UL;
const HL = ae(KL);

function GL(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
    if (!t(e[r], r, e)) return !1;
  return !0
}
var VL = GL,
  XL = ts;

function qL(e, t) {
  var r = !0;
  return XL(e, function(n, i, a) {
    return r = !!t(n, i, a), r
  }), r
}
var YL = qL,
  ZL = VL,
  JL = YL,
  QL = ht,
  eR = Be,
  tR = ho;

function rR(e, t, r) {
  var n = eR(e) ? ZL : JL;
  return r && tR(e, t, r) && (t = void 0), n(e, QL(t))
}
var nR = rR;
const Py = ae(nR);
var iR = ["x", "y"];

function gi(e) {
  "@babel/helpers - typeof";
  return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, gi(e)
}

function hc() {
  return hc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, hc.apply(this, arguments)
}

function Jp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function In(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jp(Object(r), !0).forEach(function(n) {
      aR(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function aR(e, t, r) {
  return t = oR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function oR(e) {
  var t = uR(e, "string");
  return gi(t) == "symbol" ? t : t + ""
}

function uR(e, t) {
  if (gi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function cR(e, t) {
  if (e == null) return {};
  var r = sR(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function sR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function lR(e, t) {
  var r = e.x,
    n = e.y,
    i = cR(e, iR),
    a = "".concat(r),
    o = parseInt(a, 10),
    u = "".concat(n),
    c = parseInt(u, 10),
    s = "".concat(t.height || i.height),
    f = parseInt(s, 10),
    l = "".concat(t.width || i.width),
    p = parseInt(l, 10);
  return In(In(In(In(In({}, t), i), o ? {
    x: o
  } : {}), c ? {
    y: c
  } : {}), {}, {
    height: f,
    width: p,
    name: t.name,
    radius: t.radius
  })
}

function Qp(e) {
  return P.createElement(ka, hc({
    shapeType: "rectangle",
    propTransformer: lR,
    activeClassName: "recharts-active-bar"
  }, e))
}
var fR = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return function(n, i) {
      if (typeof t == "number") return t;
      var a = R(n) || V0(n);
      return a ? t(n, i) : (a || hr(), r)
    }
  },
  pR = ["value", "background"],
  _y;

function Yr(e) {
  "@babel/helpers - typeof";
  return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Yr(e)
}

function hR(e, t) {
  if (e == null) return {};
  var r = dR(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function dR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function za() {
  return za = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, za.apply(this, arguments)
}

function eh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eh(Object(r), !0).forEach(function(n) {
      Lt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function vR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function th(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $y(n.key), n)
  }
}

function yR(e, t, r) {
  return t && th(e.prototype, t), r && th(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function mR(e, t, r) {
  return t = Wa(t), gR(e, Sy() ? Reflect.construct(t, r || [], Wa(e).constructor) : t.apply(e, r))
}

function gR(e, t) {
  if (t && (Yr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return bR(e)
}

function bR(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Sy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Sy = function() {
    return !!e
  })()
}

function Wa(e) {
  return Wa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Wa(e)
}

function xR(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && dc(e, t)
}

function dc(e, t) {
  return dc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dc(e, t)
}

function Lt(e, t, r) {
  return t = $y(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function $y(e) {
  var t = wR(e, "string");
  return Yr(t) == "symbol" ? t : t + ""
}

function wR(e, t) {
  if (Yr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Yr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var gr = function(e) {
  function t() {
    var r;
    vR(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
    return r = mR(this, t, [].concat(i)), Lt(r, "state", {
      isAnimationFinished: !1
    }), Lt(r, "id", Ut("recharts-bar-")), Lt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o()
    }), Lt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o()
    }), r
  }
  return xR(t, e), yR(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        a = this.props,
        o = a.shape,
        u = a.dataKey,
        c = a.activeIndex,
        s = a.activeBar,
        f = U(this.props, !1);
      return n && n.map(function(l, p) {
        var h = p === c,
          v = h ? s : o,
          d = ge(ge(ge({}, f), l), {}, {
            isActive: h,
            option: v,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return P.createElement(J, za({
          className: "recharts-bar-rectangle"
        }, zt(i.props, l, p), {
          key: "rectangle-".concat(l?.x, "-").concat(l?.y, "-").concat(l?.value, "-").concat(p)
        }), P.createElement(Qp, d))
      })
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        a = i.data,
        o = i.layout,
        u = i.isAnimationActive,
        c = i.animationBegin,
        s = i.animationDuration,
        f = i.animationEasing,
        l = i.animationId,
        p = this.state.prevData;
      return P.createElement(lt, {
        begin: c,
        duration: s,
        isActive: u,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(l),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(h) {
        var v = h.t,
          d = a.map(function(y, b) {
            var x = p && p[b];
            if (x) {
              var w = oe(x.x, y.x),
                O = oe(x.y, y.y),
                m = oe(x.width, y.width),
                g = oe(x.height, y.height);
              return ge(ge({}, y), {}, {
                x: w(v),
                y: O(v),
                width: m(v),
                height: g(v)
              })
            }
            if (o === "horizontal") {
              var A = oe(0, y.height),
                _ = A(v);
              return ge(ge({}, y), {}, {
                y: y.y + y.height - _,
                height: _
              })
            }
            var S = oe(0, y.width),
              E = S(v);
            return ge(ge({}, y), {}, {
              width: E
            })
          });
        return P.createElement(J, null, n.renderRectanglesStatically(d))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        a = n.isAnimationActive,
        o = this.state.prevData;
      return a && i && i.length && (!o || !$t(o, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this,
        i = this.props,
        a = i.data,
        o = i.dataKey,
        u = i.activeIndex,
        c = U(this.props.background, !1);
      return a.map(function(s, f) {
        s.value;
        var l = s.background,
          p = hR(s, pR);
        if (!l) return null;
        var h = ge(ge(ge(ge(ge({}, p), {}, {
          fill: "#eee"
        }, l), c), zt(n.props, s, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return P.createElement(Qp, za({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, h))
      })
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var a = this.props,
        o = a.data,
        u = a.xAxis,
        c = a.yAxis,
        s = a.layout,
        f = a.children,
        l = De(f, On);
      if (!l) return null;
      var p = s === "vertical" ? o[0].height / 2 : o[0].width / 2,
        h = function(y, b) {
          var x = Array.isArray(y.value) ? y.value[1] : y.value;
          return {
            x: y.x,
            y: y.y,
            value: x,
            errorVal: ue(y, b)
          }
        },
        v = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return P.createElement(J, v, l.map(function(d) {
        return P.cloneElement(d, {
          key: "error-bar-".concat(i, "-").concat(d.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          offset: p,
          dataPointFormatter: h
        })
      }))
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.hide,
        a = n.data,
        o = n.className,
        u = n.xAxis,
        c = n.yAxis,
        s = n.left,
        f = n.top,
        l = n.width,
        p = n.height,
        h = n.isAnimationActive,
        v = n.background,
        d = n.id;
      if (i || !a || !a.length) return null;
      var y = this.state.isAnimationFinished,
        b = Z("recharts-bar", o),
        x = u && u.allowDataOverflow,
        w = c && c.allowDataOverflow,
        O = x || w,
        m = V(d) ? this.id : d;
      return P.createElement(J, {
        className: b
      }, x || w ? P.createElement("defs", null, P.createElement("clipPath", {
        id: "clipPath-".concat(m)
      }, P.createElement("rect", {
        x: x ? s : s - l / 2,
        y: w ? f : f - p / 2,
        width: x ? l : l * 2,
        height: w ? p : p * 2
      }))) : null, P.createElement(J, {
        className: "recharts-bar-rectangles",
        clipPath: O ? "url(#clipPath-".concat(m, ")") : null
      }, v ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(O, m), (!h || y) && Je.renderCallByParent(this.props, a))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: i.curData
      } : n.data !== i.curData ? {
        curData: n.data
      } : null
    }
  }])
}(L.PureComponent);
_y = gr;
Lt(gr, "displayName", "Bar");
Lt(gr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !dt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Lt(gr, "getComposedData", function(e) {
  var t = e.props,
    r = e.item,
    n = e.barPosition,
    i = e.bandSize,
    a = e.xAxis,
    o = e.yAxis,
    u = e.xAxisTicks,
    c = e.yAxisTicks,
    s = e.stackedData,
    f = e.dataStartIndex,
    l = e.displayedData,
    p = e.offset,
    h = pk(n, r);
  if (!h) return null;
  var v = t.layout,
    d = r.type.defaultProps,
    y = d !== void 0 ? ge(ge({}, d), r.props) : r.props,
    b = y.dataKey,
    x = y.children,
    w = y.minPointSize,
    O = v === "horizontal" ? o : a,
    m = s ? O.scale.domain() : null,
    g = bk({
      numericAxis: O
    }),
    A = De(x, vo),
    _ = l.map(function(S, E) {
      var T, $, I, C, j, k;
      s ? T = hk(s[f + E], m) : (T = ue(S, b), Array.isArray(T) || (T = [g, T]));
      var D = fR(w, _y.defaultProps.minPointSize)(T[1], E);
      if (v === "horizontal") {
        var B, F = [o.scale(T[0]), o.scale(T[1])],
          H = F[0],
          q = F[1];
        $ = ap({
          axis: a,
          ticks: u,
          bandSize: i,
          offset: h.offset,
          entry: S,
          index: E
        }), I = (B = q ?? H) !== null && B !== void 0 ? B : void 0, C = h.size;
        var W = H - q;
        if (j = Number.isNaN(W) ? 0 : W, k = {
            x: $,
            y: o.y,
            width: C,
            height: o.height
          }, Math.abs(D) > 0 && Math.abs(j) < Math.abs(D)) {
          var Y = Ce(j || D) * (Math.abs(D) - Math.abs(j));
          I -= Y, j += Y
        }
      } else {
        var fe = [a.scale(T[0]), a.scale(T[1])],
          me = fe[0],
          Fe = fe[1];
        if ($ = me, I = ap({
            axis: o,
            ticks: c,
            bandSize: i,
            offset: h.offset,
            entry: S,
            index: E
          }), C = Fe - me, j = h.size, k = {
            x: a.x,
            y: I,
            width: a.width,
            height: j
          }, Math.abs(D) > 0 && Math.abs(C) < Math.abs(D)) {
          var Vt = Ce(C || D) * (Math.abs(D) - Math.abs(C));
          C += Vt
        }
      }
      return ge(ge(ge({}, S), {}, {
        x: $,
        y: I,
        width: C,
        height: j,
        value: s ? T : T[1],
        payload: S,
        background: k
      }, A && A[E] && A[E].props), {}, {
        tooltipPayload: [ty(r, S)],
        tooltipPosition: {
          x: $ + C / 2,
          y: I + j / 2
        }
      })
    });
  return ge({
    data: _,
    layout: v
  }, p)
});

function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, bi(e)
}

function OR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function rh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ty(n.key), n)
  }
}

function AR(e, t, r) {
  return t && rh(e.prototype, t), r && rh(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function nh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nh(Object(r), !0).forEach(function(n) {
      Mo(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Mo(e, t, r) {
  return t = Ty(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ty(e) {
  var t = PR(e, "string");
  return bi(t) == "symbol" ? t : t + ""
}

function PR(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var js = function(t, r, n, i, a) {
    var o = t.width,
      u = t.height,
      c = t.layout,
      s = t.children,
      f = Object.keys(r),
      l = {
        left: n.left,
        leftMirror: n.left,
        right: o - n.right,
        rightMirror: o - n.right,
        top: n.top,
        topMirror: n.top,
        bottom: u - n.bottom,
        bottomMirror: u - n.bottom
      },
      p = !!Ue(s, gr);
    return f.reduce(function(h, v) {
      var d = r[v],
        y = d.orientation,
        b = d.domain,
        x = d.padding,
        w = x === void 0 ? {} : x,
        O = d.mirror,
        m = d.reversed,
        g = "".concat(y).concat(O ? "Mirror" : ""),
        A, _, S, E, T;
      if (d.type === "number" && (d.padding === "gap" || d.padding === "no-gap")) {
        var $ = b[1] - b[0],
          I = 1 / 0,
          C = d.categoricalDomain.sort(Z0);
        if (C.forEach(function(fe, me) {
            me > 0 && (I = Math.min((fe || 0) - (C[me - 1] || 0), I))
          }), Number.isFinite(I)) {
          var j = I / $,
            k = d.layout === "vertical" ? n.height : n.width;
          if (d.padding === "gap" && (A = j * k / 2), d.padding === "no-gap") {
            var D = Ie(t.barCategoryGap, j * k),
              B = j * k / 2;
            A = B - D - (B - D) / k * D
          }
        }
      }
      i === "xAxis" ? _ = [n.left + (w.left || 0) + (A || 0), n.left + n.width - (w.right || 0) - (A || 0)] : i === "yAxis" ? _ = c === "horizontal" ? [n.top + n.height - (w.bottom || 0), n.top + (w.top || 0)] : [n.top + (w.top || 0) + (A || 0), n.top + n.height - (w.bottom || 0) - (A || 0)] : _ = d.range, m && (_ = [_[1], _[0]]);
      var F = Zv(d, a, p),
        H = F.scale,
        q = F.realScaleType;
      H.domain(b).range(_), Jv(H);
      var W = Qv(H, tt(tt({}, d), {}, {
        realScaleType: q
      }));
      i === "xAxis" ? (T = y === "top" && !O || y === "bottom" && O, S = n.left, E = l[g] - T * d.height) : i === "yAxis" && (T = y === "left" && !O || y === "right" && O, S = l[g] - T * d.width, E = n.top);
      var Y = tt(tt(tt({}, d), W), {}, {
        realScaleType: q,
        x: S,
        y: E,
        scale: H,
        width: i === "xAxis" ? n.width : d.width,
        height: i === "yAxis" ? n.height : d.height
      });
      return Y.bandSize = Sa(Y, W), !d.hide && i === "xAxis" ? l[g] += (T ? -1 : 1) * Y.height : d.hide || (l[g] += (T ? -1 : 1) * Y.width), tt(tt({}, h), {}, Mo({}, v, Y))
    }, {})
  },
  Ey = function(t, r) {
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y;
    return {
      x: Math.min(n, a),
      y: Math.min(i, o),
      width: Math.abs(a - n),
      height: Math.abs(o - i)
    }
  },
  _R = function(t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      a = t.y2;
    return Ey({
      x: r,
      y: n
    }, {
      x: i,
      y: a
    })
  },
  jy = function() {
    function e(t) {
      OR(this, e), this.scale = t
    }
    return AR(e, [{
      key: "domain",
      get: function() {
        return this.scale.domain
      }
    }, {
      key: "range",
      get: function() {
        return this.scale.range
      }
    }, {
      key: "rangeMin",
      get: function() {
        return this.range()[0]
      }
    }, {
      key: "rangeMax",
      get: function() {
        return this.range()[1]
      }
    }, {
      key: "bandwidth",
      get: function() {
        return this.scale.bandwidth
      }
    }, {
      key: "apply",
      value: function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          i = n.bandAware,
          a = n.position;
        if (r !== void 0) {
          if (a) switch (a) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u
            }
            default:
              return this.scale(r)
          }
          if (i) {
            var c = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(r) + c
          }
          return this.scale(r)
        }
      }
    }, {
      key: "isInRange",
      value: function(r) {
        var n = this.range(),
          i = n[0],
          a = n[n.length - 1];
        return i <= a ? r >= i && r <= a : r >= a && r <= i
      }
    }], [{
      key: "create",
      value: function(r) {
        return new e(r)
      }
    }])
  }();
Mo(jy, "EPS", 1e-4);
var Ms = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return tt(tt({}, n), {}, Mo({}, i, jy.create(t[i])))
  }, {});
  return tt(tt({}, r), {}, {
    apply: function(i) {
      var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        o = a.bandAware,
        u = a.position;
      return HL(i, function(c, s) {
        return r[s].apply(c, {
          bandAware: o,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return Py(i, function(a, o) {
        return r[o].isInRange(a)
      })
    }
  })
};

function SR(e) {
  return (e % 180 + 180) % 180
}
var $R = function(t) {
    var r = t.width,
      n = t.height,
      i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      a = SR(i),
      o = a * Math.PI / 180,
      u = Math.atan(n / r),
      c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
    return Math.abs(c)
  },
  TR = ht,
  ER = Pi,
  jR = fo;

function MR(e) {
  return function(t, r, n) {
    var i = Object(t);
    if (!ER(t)) {
      var a = TR(r);
      t = jR(t), r = function(u) {
        return a(i[u], u, i)
      }
    }
    var o = e(t, r, n);
    return o > -1 ? i[a ? t[o] : o] : void 0
  }
}
var CR = MR,
  IR = xy;

function kR(e) {
  var t = IR(e),
    r = t % 1;
  return t === t ? r ? t - r : t : 0
}
var DR = kR,
  NR = Cd,
  LR = ht,
  RR = DR,
  BR = Math.max;

function FR(e, t, r) {
  var n = e == null ? 0 : e.length;
  if (!n) return -1;
  var i = r == null ? 0 : RR(r);
  return i < 0 && (i = BR(n + i, 0)), NR(e, LR(t), i)
}
var zR = FR,
  WR = CR,
  UR = zR,
  KR = WR(UR),
  HR = KR;
const GR = ae(HR);
var VR = r0(function(e) {
    return {
      x: e.left,
      y: e.top,
      width: e.width,
      height: e.height
    }
  }, function(e) {
    return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("")
  }),
  Cs = L.createContext(void 0),
  Is = L.createContext(void 0),
  My = L.createContext(void 0),
  Cy = L.createContext({}),
  Iy = L.createContext(void 0),
  ky = L.createContext(0),
  Dy = L.createContext(0),
  ih = function(t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      a = r.offset,
      o = t.clipPathId,
      u = t.children,
      c = t.width,
      s = t.height,
      f = VR(a);
    return P.createElement(Cs.Provider, {
      value: n
    }, P.createElement(Is.Provider, {
      value: i
    }, P.createElement(Cy.Provider, {
      value: a
    }, P.createElement(My.Provider, {
      value: f
    }, P.createElement(Iy.Provider, {
      value: o
    }, P.createElement(ky.Provider, {
      value: s
    }, P.createElement(Dy.Provider, {
      value: c
    }, u)))))))
  },
  XR = function() {
    return L.useContext(Iy)
  },
  Ny = function(t) {
    var r = L.useContext(Cs);
    r == null && hr();
    var n = r[t];
    return n == null && hr(), n
  },
  qR = function() {
    var t = L.useContext(Cs);
    return Dt(t)
  },
  YR = function() {
    var t = L.useContext(Is),
      r = GR(t, function(n) {
        return Py(n.domain, Number.isFinite)
      });
    return r || Dt(t)
  },
  Ly = function(t) {
    var r = L.useContext(Is);
    r == null && hr();
    var n = r[t];
    return n == null && hr(), n
  },
  ZR = function() {
    var t = L.useContext(My);
    return t
  },
  JR = function() {
    return L.useContext(Cy)
  },
  ks = function() {
    return L.useContext(Dy)
  },
  Ds = function() {
    return L.useContext(ky)
  };

function Zr(e) {
  "@babel/helpers - typeof";
  return Zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Zr(e)
}

function QR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function eB(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, By(n.key), n)
  }
}

function tB(e, t, r) {
  return t && eB(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function rB(e, t, r) {
  return t = Ua(t), nB(e, Ry() ? Reflect.construct(t, r || [], Ua(e).constructor) : t.apply(e, r))
}

function nB(e, t) {
  if (t && (Zr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return iB(e)
}

function iB(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Ry() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ry = function() {
    return !!e
  })()
}

function Ua(e) {
  return Ua = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ua(e)
}

function aB(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && vc(e, t)
}

function vc(e, t) {
  return vc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, vc(e, t)
}

function ah(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function oh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ah(Object(r), !0).forEach(function(n) {
      Ns(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ah(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Ns(e, t, r) {
  return t = By(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function By(e) {
  var t = oB(e, "string");
  return Zr(t) == "symbol" ? t : t + ""
}

function oB(e, t) {
  if (Zr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Zr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}

function uB(e, t) {
  return fB(e) || lB(e, t) || sB(e, t) || cB()
}

function cB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function sB(e, t) {
  if (e) {
    if (typeof e == "string") return uh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return uh(e, t)
  }
}

function uh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function lB(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function fB(e) {
  if (Array.isArray(e)) return e
}

function yc() {
  return yc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, yc.apply(this, arguments)
}
var pB = function(t, r) {
    var n;
    return P.isValidElement(t) ? n = P.cloneElement(t, r) : G(t) ? n = t(r) : n = P.createElement("line", yc({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  hB = function(t, r, n, i, a, o, u, c, s) {
    var f = a.x,
      l = a.y,
      p = a.width,
      h = a.height;
    if (n) {
      var v = s.y,
        d = t.y.apply(v, {
          position: o
        });
      if (st(s, "discard") && !t.y.isInRange(d)) return null;
      var y = [{
        x: f + p,
        y: d
      }, {
        x: f,
        y: d
      }];
      return c === "left" ? y.reverse() : y
    }
    if (r) {
      var b = s.x,
        x = t.x.apply(b, {
          position: o
        });
      if (st(s, "discard") && !t.x.isInRange(x)) return null;
      var w = [{
        x,
        y: l + h
      }, {
        x,
        y: l
      }];
      return u === "top" ? w.reverse() : w
    }
    if (i) {
      var O = s.segment,
        m = O.map(function(g) {
          return t.apply(g, {
            position: o
          })
        });
      return st(s, "discard") && LL(m, function(g) {
        return !t.isInRange(g)
      }) ? null : m
    }
    return null
  };

function dB(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    a = e.yAxisId,
    o = e.shape,
    u = e.className,
    c = e.alwaysShow,
    s = XR(),
    f = Ny(i),
    l = Ly(a),
    p = ZR();
  if (!s || !p) return null;
  it(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = Ms({
      x: f.scale,
      y: l.scale
    }),
    v = Pe(t),
    d = Pe(r),
    y = n && n.length === 2,
    b = hB(h, v, d, y, p, e.position, f.orientation, l.orientation, e);
  if (!b) return null;
  var x = uB(b, 2),
    w = x[0],
    O = w.x,
    m = w.y,
    g = x[1],
    A = g.x,
    _ = g.y,
    S = st(e, "hidden") ? "url(#".concat(s, ")") : void 0,
    E = oh(oh({
      clipPath: S
    }, U(e, !0)), {}, {
      x1: O,
      y1: m,
      x2: A,
      y2: _
    });
  return P.createElement(J, {
    className: Z("recharts-reference-line", u)
  }, pB(o, E), $e.renderCallByParent(e, _R({
    x1: O,
    y1: m,
    x2: A,
    y2: _
  })))
}
var Ls = function(e) {
  function t() {
    return QR(this, t), rB(this, t, arguments)
  }
  return aB(t, e), tB(t, [{
    key: "render",
    value: function() {
      return P.createElement(dB, this.props)
    }
  }])
}(P.Component);
Ns(Ls, "displayName", "ReferenceLine");
Ns(Ls, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});

function mc() {
  return mc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, mc.apply(this, arguments)
}

function Jr(e) {
  "@babel/helpers - typeof";
  return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Jr(e)
}

function ch(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function sh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ch(Object(r), !0).forEach(function(n) {
      Co(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ch(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function vB(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function yB(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, zy(n.key), n)
  }
}

function mB(e, t, r) {
  return t && yB(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function gB(e, t, r) {
  return t = Ka(t), bB(e, Fy() ? Reflect.construct(t, r || [], Ka(e).constructor) : t.apply(e, r))
}

function bB(e, t) {
  if (t && (Jr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return xB(e)
}

function xB(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Fy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Fy = function() {
    return !!e
  })()
}

function Ka(e) {
  return Ka = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ka(e)
}

function wB(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && gc(e, t)
}

function gc(e, t) {
  return gc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, gc(e, t)
}

function Co(e, t, r) {
  return t = zy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function zy(e) {
  var t = OB(e, "string");
  return Jr(t) == "symbol" ? t : t + ""
}

function OB(e, t) {
  if (Jr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var AB = function(t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      a = t.yAxis,
      o = Ms({
        x: i.scale,
        y: a.scale
      }),
      u = o.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return st(t, "discard") && !o.isInRange(u) ? null : u
  },
  Io = function(e) {
    function t() {
      return vB(this, t), gB(this, t, arguments)
    }
    return wB(t, e), mB(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          a = n.y,
          o = n.r,
          u = n.alwaysShow,
          c = n.clipPathId,
          s = Pe(i),
          f = Pe(a);
        if (it(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !s || !f) return null;
        var l = AB(this.props);
        if (!l) return null;
        var p = l.x,
          h = l.y,
          v = this.props,
          d = v.shape,
          y = v.className,
          b = st(this.props, "hidden") ? "url(#".concat(c, ")") : void 0,
          x = sh(sh({
            clipPath: b
          }, U(this.props, !0)), {}, {
            cx: p,
            cy: h
          });
        return P.createElement(J, {
          className: Z("recharts-reference-dot", y)
        }, t.renderDot(d, x), $e.renderCallByParent(this.props, {
          x: p - o,
          y: h - o,
          width: 2 * o,
          height: 2 * o
        }))
      }
    }])
  }(P.Component);
Co(Io, "displayName", "ReferenceDot");
Co(Io, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
Co(Io, "renderDot", function(e, t) {
  var r;
  return P.isValidElement(e) ? r = P.cloneElement(e, t) : G(e) ? r = e(t) : r = P.createElement(An, mc({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r
});

function bc() {
  return bc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, bc.apply(this, arguments)
}

function Qr(e) {
  "@babel/helpers - typeof";
  return Qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Qr(e)
}

function lh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function fh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lh(Object(r), !0).forEach(function(n) {
      ko(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function PB(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _B(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Uy(n.key), n)
  }
}

function SB(e, t, r) {
  return t && _B(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function $B(e, t, r) {
  return t = Ha(t), TB(e, Wy() ? Reflect.construct(t, r || [], Ha(e).constructor) : t.apply(e, r))
}

function TB(e, t) {
  if (t && (Qr(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return EB(e)
}

function EB(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Wy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Wy = function() {
    return !!e
  })()
}

function Ha(e) {
  return Ha = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ha(e)
}

function jB(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && xc(e, t)
}

function xc(e, t) {
  return xc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, xc(e, t)
}

function ko(e, t, r) {
  return t = Uy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Uy(e) {
  var t = MB(e, "string");
  return Qr(t) == "symbol" ? t : t + ""
}

function MB(e, t) {
  if (Qr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var CB = function(t, r, n, i, a) {
    var o = a.x1,
      u = a.x2,
      c = a.y1,
      s = a.y2,
      f = a.xAxis,
      l = a.yAxis;
    if (!f || !l) return null;
    var p = Ms({
        x: f.scale,
        y: l.scale
      }),
      h = {
        x: t ? p.x.apply(o, {
          position: "start"
        }) : p.x.rangeMin,
        y: n ? p.y.apply(c, {
          position: "start"
        }) : p.y.rangeMin
      },
      v = {
        x: r ? p.x.apply(u, {
          position: "end"
        }) : p.x.rangeMax,
        y: i ? p.y.apply(s, {
          position: "end"
        }) : p.y.rangeMax
      };
    return st(a, "discard") && (!p.isInRange(h) || !p.isInRange(v)) ? null : Ey(h, v)
  },
  Do = function(e) {
    function t() {
      return PB(this, t), $B(this, t, arguments)
    }
    return jB(t, e), SB(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x1,
          a = n.x2,
          o = n.y1,
          u = n.y2,
          c = n.className,
          s = n.alwaysShow,
          f = n.clipPathId;
        it(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var l = Pe(i),
          p = Pe(a),
          h = Pe(o),
          v = Pe(u),
          d = this.props.shape;
        if (!l && !p && !h && !v && !d) return null;
        var y = CB(l, p, h, v, this.props);
        if (!y && !d) return null;
        var b = st(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return P.createElement(J, {
          className: Z("recharts-reference-area", c)
        }, t.renderRect(d, fh(fh({
          clipPath: b
        }, U(this.props, !0)), y)), $e.renderCallByParent(this.props, y))
      }
    }])
  }(P.Component);
ko(Do, "displayName", "ReferenceArea");
ko(Do, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: .5,
  stroke: "none",
  strokeWidth: 1
});
ko(Do, "renderRect", function(e, t) {
  var r;
  return P.isValidElement(e) ? r = P.cloneElement(e, t) : G(e) ? r = e(t) : r = P.createElement(Es, bc({}, t, {
    className: "recharts-reference-area-rect"
  })), r
});

function Ky(e, t, r) {
  if (t < 1) return [];
  if (t === 1 && r === void 0) return e;
  for (var n = [], i = 0; i < e.length; i += t) n.push(e[i]);
  return n
}

function IB(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return $R(n, r)
}

function kB(e, t, r) {
  var n = r === "width",
    i = e.x,
    a = e.y,
    o = e.width,
    u = e.height;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + u
  } : {
    start: n ? i + o : a + u,
    end: n ? i : a
  }
}

function Ga(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0
}

function DB(e, t) {
  return Ky(e, t + 1)
}

function NB(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = t.start, u = t.end, c = 0, s = 1, f = o, l = function() {
      var v = n?.[c];
      if (v === void 0) return {
        v: Ky(n, s)
      };
      var d = c,
        y, b = function() {
          return y === void 0 && (y = r(v, d)), y
        },
        x = v.coordinate,
        w = c === 0 || Ga(e, x, b, f, u);
      w || (c = 0, f = o, s += 1), w && (f = x + e * (b() / 2 + i), c += s)
    }, p; s <= a.length;)
    if (p = l(), p) return p.v;
  return []
}

function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, xi(e)
}

function ph(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ee(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ph(Object(r), !0).forEach(function(n) {
      LB(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ph(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function LB(e, t, r) {
  return t = RB(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function RB(e) {
  var t = BB(e, "string");
  return xi(t) == "symbol" ? t : t + ""
}

function BB(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function FB(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, u = t.start, c = t.end, s = function(p) {
      var h = a[p],
        v, d = function() {
          return v === void 0 && (v = r(h, p)), v
        };
      if (p === o - 1) {
        var y = e * (h.coordinate + e * d() / 2 - c);
        a[p] = h = Ee(Ee({}, h), {}, {
          tickCoord: y > 0 ? h.coordinate - y * e : h.coordinate
        })
      } else a[p] = h = Ee(Ee({}, h), {}, {
        tickCoord: h.coordinate
      });
      var b = Ga(e, h.tickCoord, d, u, c);
      b && (c = h.tickCoord - e * (d() / 2 + i), a[p] = Ee(Ee({}, h), {}, {
        isShow: !0
      }))
    }, f = o - 1; f >= 0; f--) s(f);
  return a
}

function zB(e, t, r, n, i, a) {
  var o = (n || []).slice(),
    u = o.length,
    c = t.start,
    s = t.end;
  if (a) {
    var f = n[u - 1],
      l = r(f, u - 1),
      p = e * (f.coordinate + e * l / 2 - s);
    o[u - 1] = f = Ee(Ee({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var h = Ga(e, f.tickCoord, function() {
      return l
    }, c, s);
    h && (s = f.tickCoord - e * (l / 2 + i), o[u - 1] = Ee(Ee({}, f), {}, {
      isShow: !0
    }))
  }
  for (var v = a ? u - 1 : u, d = function(x) {
      var w = o[x],
        O, m = function() {
          return O === void 0 && (O = r(w, x)), O
        };
      if (x === 0) {
        var g = e * (w.coordinate - e * m() / 2 - c);
        o[x] = w = Ee(Ee({}, w), {}, {
          tickCoord: g < 0 ? w.coordinate - g * e : w.coordinate
        })
      } else o[x] = w = Ee(Ee({}, w), {}, {
        tickCoord: w.coordinate
      });
      var A = Ga(e, w.tickCoord, m, c, s);
      A && (c = w.tickCoord + e * (m() / 2 + i), o[x] = Ee(Ee({}, w), {}, {
        isShow: !0
      }))
    }, y = 0; y < v; y++) d(y);
  return o
}

function Rs(e, t, r) {
  var n = e.tick,
    i = e.ticks,
    a = e.viewBox,
    o = e.minTickGap,
    u = e.orientation,
    c = e.interval,
    s = e.tickFormatter,
    f = e.unit,
    l = e.angle;
  if (!i || !i.length || !n) return [];
  if (R(c) || dt.isSsr) return DB(i, typeof c == "number" && R(c) ? c : 0);
  var p = [],
    h = u === "top" || u === "bottom" ? "width" : "height",
    v = f && h === "width" ? kn(f, {
      fontSize: t,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    d = function(w, O) {
      var m = G(s) ? s(w.value, O) : w.value;
      return h === "width" ? IB(kn(m, {
        fontSize: t,
        letterSpacing: r
      }), v, l) : kn(m, {
        fontSize: t,
        letterSpacing: r
      })[h]
    },
    y = i.length >= 2 ? Ce(i[1].coordinate - i[0].coordinate) : 1,
    b = kB(a, y, h);
  return c === "equidistantPreserveStart" ? NB(y, b, d, i, o) : (c === "preserveStart" || c === "preserveStartEnd" ? p = zB(y, b, d, i, o, c === "preserveStartEnd") : p = FB(y, b, d, i, o), p.filter(function(x) {
    return x.isShow
  }))
}
var WB = ["viewBox"],
  UB = ["viewBox"],
  KB = ["ticks"];

function en(e) {
  "@babel/helpers - typeof";
  return en = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, en(e)
}

function Tr() {
  return Tr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Tr.apply(this, arguments)
}

function hh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hh(Object(r), !0).forEach(function(n) {
      Bs(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function su(e, t) {
  if (e == null) return {};
  var r = HB(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function HB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function GB(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function dh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Gy(n.key), n)
  }
}

function VB(e, t, r) {
  return t && dh(e.prototype, t), r && dh(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function XB(e, t, r) {
  return t = Va(t), qB(e, Hy() ? Reflect.construct(t, r || [], Va(e).constructor) : t.apply(e, r))
}

function qB(e, t) {
  if (t && (en(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return YB(e)
}

function YB(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Hy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Hy = function() {
    return !!e
  })()
}

function Va(e) {
  return Va = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Va(e)
}

function ZB(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && wc(e, t)
}

function wc(e, t) {
  return wc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, wc(e, t)
}

function Bs(e, t, r) {
  return t = Gy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Gy(e) {
  var t = JB(e, "string");
  return en(t) == "symbol" ? t : t + ""
}

function JB(e, t) {
  if (en(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (en(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Pn = function(e) {
  function t(r) {
    var n;
    return GB(this, t), n = XB(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return ZB(t, e), VB(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var a = n.viewBox,
        o = su(n, WB),
        u = this.props,
        c = u.viewBox,
        s = su(u, UB);
      return !jr(a, c) || !jr(o, s) || !jr(i, this.state)
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var i = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        i && this.setState({
          fontSize: window.getComputedStyle(i).fontSize,
          letterSpacing: window.getComputedStyle(i).letterSpacing
        })
      }
    }
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var i = this.props,
        a = i.x,
        o = i.y,
        u = i.width,
        c = i.height,
        s = i.orientation,
        f = i.tickSize,
        l = i.mirror,
        p = i.tickMargin,
        h, v, d, y, b, x, w = l ? -1 : 1,
        O = n.tickSize || f,
        m = R(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (s) {
        case "top":
          h = v = n.coordinate, y = o + +!l * c, d = y - w * O, x = d - w * p, b = m;
          break;
        case "left":
          d = y = n.coordinate, v = a + +!l * u, h = v - w * O, b = h - w * p, x = m;
          break;
        case "right":
          d = y = n.coordinate, v = a + +l * u, h = v + w * O, b = h + w * p, x = m;
          break;
        default:
          h = v = n.coordinate, y = o + +l * c, d = y + w * O, x = d + w * p, b = m;
          break
      }
      return {
        line: {
          x1: h,
          y1: d,
          x2: v,
          y2: y
        },
        tick: {
          x: b,
          y: x
        }
      }
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props,
        i = n.orientation,
        a = n.mirror,
        o;
      switch (i) {
        case "left":
          o = a ? "start" : "end";
          break;
        case "right":
          o = a ? "end" : "start";
          break;
        default:
          o = "middle";
          break
      }
      return o
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props,
        i = n.orientation,
        a = n.mirror,
        o = "end";
      switch (i) {
        case "left":
        case "right":
          o = "middle";
          break;
        case "top":
          o = a ? "start" : "end";
          break;
        default:
          o = a ? "end" : "start";
          break
      }
      return o
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props,
        i = n.x,
        a = n.y,
        o = n.width,
        u = n.height,
        c = n.orientation,
        s = n.mirror,
        f = n.axisLine,
        l = Oe(Oe(Oe({}, U(this.props, !1)), U(f, !1)), {}, {
          fill: "none"
        });
      if (c === "top" || c === "bottom") {
        var p = +(c === "top" && !s || c === "bottom" && s);
        l = Oe(Oe({}, l), {}, {
          x1: i,
          y1: a + p * u,
          x2: i + o,
          y2: a + p * u
        })
      } else {
        var h = +(c === "left" && !s || c === "right" && s);
        l = Oe(Oe({}, l), {}, {
          x1: i + h * o,
          y1: a,
          x2: i + h * o,
          y2: a + u
        })
      }
      return P.createElement("line", Tr({}, l, {
        className: Z("recharts-cartesian-axis-line", He(f, "className"))
      }))
    }
  }, {
    key: "renderTicks",
    value: function(n, i, a) {
      var o = this,
        u = this.props,
        c = u.tickLine,
        s = u.stroke,
        f = u.tick,
        l = u.tickFormatter,
        p = u.unit,
        h = Rs(Oe(Oe({}, this.props), {}, {
          ticks: n
        }), i, a),
        v = this.getTickTextAnchor(),
        d = this.getTickVerticalAnchor(),
        y = U(this.props, !1),
        b = U(f, !1),
        x = Oe(Oe({}, y), {}, {
          fill: "none"
        }, U(c, !1)),
        w = h.map(function(O, m) {
          var g = o.getTickLineCoord(O),
            A = g.line,
            _ = g.tick,
            S = Oe(Oe(Oe(Oe({
              textAnchor: v,
              verticalAnchor: d
            }, y), {}, {
              stroke: "none",
              fill: s
            }, b), _), {}, {
              index: m,
              payload: O,
              visibleTicksCount: h.length,
              tickFormatter: l
            });
          return P.createElement(J, Tr({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(O.value, "-").concat(O.coordinate, "-").concat(O.tickCoord)
          }, zt(o.props, O, m)), c && P.createElement("line", Tr({}, x, A, {
            className: Z("recharts-cartesian-axis-tick-line", He(c, "className"))
          })), f && t.renderTickItem(f, S, "".concat(G(l) ? l(O.value, m) : O.value).concat(p || "")))
        });
      return P.createElement("g", {
        className: "recharts-cartesian-axis-ticks"
      }, w)
    }
  }, {
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        a = i.axisLine,
        o = i.width,
        u = i.height,
        c = i.ticksGenerator,
        s = i.className,
        f = i.hide;
      if (f) return null;
      var l = this.props,
        p = l.ticks,
        h = su(l, KB),
        v = p;
      return G(c) && (v = p && p.length > 0 ? c(this.props) : c(h)), o <= 0 || u <= 0 || !v || !v.length ? null : P.createElement(J, {
        className: Z("recharts-cartesian-axis", s),
        ref: function(y) {
          n.layerReference = y
        }
      }, a && this.renderAxisLine(), this.renderTicks(v, this.state.fontSize, this.state.letterSpacing), $e.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o, u = Z(i.className, "recharts-cartesian-axis-tick-value");
      return P.isValidElement(n) ? o = P.cloneElement(n, Oe(Oe({}, i), {}, {
        className: u
      })) : G(n) ? o = n(Oe(Oe({}, i), {}, {
        className: u
      })) : o = P.createElement(fr, Tr({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), a), o
    }
  }])
}(L.Component);
Bs(Pn, "displayName", "CartesianAxis");
Bs(Pn, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  orientation: "bottom",
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var QB = ["x1", "y1", "x2", "y2", "key"],
  eF = ["offset"];

function dr(e) {
  "@babel/helpers - typeof";
  return dr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, dr(e)
}

function vh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vh(Object(r), !0).forEach(function(n) {
      tF(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function tF(e, t, r) {
  return t = rF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function rF(e) {
  var t = nF(e, "string");
  return dr(t) == "symbol" ? t : t + ""
}

function nF(e, t) {
  if (dr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (dr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function or() {
  return or = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, or.apply(this, arguments)
}

function yh(e, t) {
  if (e == null) return {};
  var r = iF(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function iF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var aF = function(t) {
  var r = t.fill;
  if (!r || r === "none") return null;
  var n = t.fillOpacity,
    i = t.x,
    a = t.y,
    o = t.width,
    u = t.height,
    c = t.ry;
  return P.createElement("rect", {
    x: i,
    y: a,
    ry: c,
    width: o,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  })
};

function Vy(e, t) {
  var r;
  if (P.isValidElement(e)) r = P.cloneElement(e, t);
  else if (G(e)) r = e(t);
  else {
    var n = t.x1,
      i = t.y1,
      a = t.x2,
      o = t.y2,
      u = t.key,
      c = yh(t, QB),
      s = U(c, !1);
    s.offset;
    var f = yh(s, eF);
    r = P.createElement("line", or({}, f, {
      x1: n,
      y1: i,
      x2: a,
      y2: o,
      fill: "none",
      key: u
    }))
  }
  return r
}

function oF(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    a = e.horizontalPoints;
  if (!i || !a || !a.length) return null;
  var o = a.map(function(u, c) {
    var s = je(je({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(c),
      index: c
    });
    return Vy(i, s)
  });
  return P.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o)
}

function uF(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    a = e.verticalPoints;
  if (!i || !a || !a.length) return null;
  var o = a.map(function(u, c) {
    var s = je(je({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return Vy(i, s)
  });
  return P.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o)
}

function cF(e) {
  var t = e.horizontalFill,
    r = e.fillOpacity,
    n = e.x,
    i = e.y,
    a = e.width,
    o = e.height,
    u = e.horizontalPoints,
    c = e.horizontal,
    s = c === void 0 ? !0 : c;
  if (!s || !t || !t.length) return null;
  var f = u.map(function(p) {
    return Math.round(p + i - i)
  }).sort(function(p, h) {
    return p - h
  });
  i !== f[0] && f.unshift(0);
  var l = f.map(function(p, h) {
    var v = !f[h + 1],
      d = v ? i + o - p : f[h + 1] - p;
    if (d <= 0) return null;
    var y = h % t.length;
    return P.createElement("rect", {
      key: "react-".concat(h),
      y: p,
      x: n,
      height: d,
      width: a,
      stroke: "none",
      fill: t[y],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return P.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, l)
}

function sF(e) {
  var t = e.vertical,
    r = t === void 0 ? !0 : t,
    n = e.verticalFill,
    i = e.fillOpacity,
    a = e.x,
    o = e.y,
    u = e.width,
    c = e.height,
    s = e.verticalPoints;
  if (!r || !n || !n.length) return null;
  var f = s.map(function(p) {
    return Math.round(p + a - a)
  }).sort(function(p, h) {
    return p - h
  });
  a !== f[0] && f.unshift(0);
  var l = f.map(function(p, h) {
    var v = !f[h + 1],
      d = v ? a + u - p : f[h + 1] - p;
    if (d <= 0) return null;
    var y = h % n.length;
    return P.createElement("rect", {
      key: "react-".concat(h),
      x: p,
      y: o,
      width: d,
      height: c,
      stroke: "none",
      fill: n[y],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return P.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, l)
}
var lF = function(t, r) {
    var n = t.xAxis,
      i = t.width,
      a = t.height,
      o = t.offset;
    return Yv(Rs(je(je(je({}, Pn.defaultProps), n), {}, {
      ticks: wt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: a
      }
    })), o.left, o.left + o.width, r)
  },
  fF = function(t, r) {
    var n = t.yAxis,
      i = t.width,
      a = t.height,
      o = t.offset;
    return Yv(Rs(je(je(je({}, Pn.defaultProps), n), {}, {
      ticks: wt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: a
      }
    })), o.top, o.top + o.height, r)
  },
  Ar = {
    horizontal: !0,
    vertical: !0,
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function pF(e) {
  var t, r, n, i, a, o, u = ks(),
    c = Ds(),
    s = JR(),
    f = je(je({}, e), {}, {
      stroke: (t = e.stroke) !== null && t !== void 0 ? t : Ar.stroke,
      fill: (r = e.fill) !== null && r !== void 0 ? r : Ar.fill,
      horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Ar.horizontal,
      horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : Ar.horizontalFill,
      vertical: (a = e.vertical) !== null && a !== void 0 ? a : Ar.vertical,
      verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : Ar.verticalFill,
      x: R(e.x) ? e.x : s.left,
      y: R(e.y) ? e.y : s.top,
      width: R(e.width) ? e.width : s.width,
      height: R(e.height) ? e.height : s.height
    }),
    l = f.x,
    p = f.y,
    h = f.width,
    v = f.height,
    d = f.syncWithTicks,
    y = f.horizontalValues,
    b = f.verticalValues,
    x = qR(),
    w = YR();
  if (!R(h) || h <= 0 || !R(v) || v <= 0 || !R(l) || l !== +l || !R(p) || p !== +p) return null;
  var O = f.verticalCoordinatesGenerator || lF,
    m = f.horizontalCoordinatesGenerator || fF,
    g = f.horizontalPoints,
    A = f.verticalPoints;
  if ((!g || !g.length) && G(m)) {
    var _ = y && y.length,
      S = m({
        yAxis: w ? je(je({}, w), {}, {
          ticks: _ ? y : w.ticks
        }) : void 0,
        width: u,
        height: c,
        offset: s
      }, _ ? !0 : d);
    it(Array.isArray(S), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(dr(S), "]")), Array.isArray(S) && (g = S)
  }
  if ((!A || !A.length) && G(O)) {
    var E = b && b.length,
      T = O({
        xAxis: x ? je(je({}, x), {}, {
          ticks: E ? b : x.ticks
        }) : void 0,
        width: u,
        height: c,
        offset: s
      }, E ? !0 : d);
    it(Array.isArray(T), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(dr(T), "]")), Array.isArray(T) && (A = T)
  }
  return P.createElement("g", {
    className: "recharts-cartesian-grid"
  }, P.createElement(aF, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), P.createElement(oF, or({}, f, {
    offset: s,
    horizontalPoints: g,
    xAxis: x,
    yAxis: w
  })), P.createElement(uF, or({}, f, {
    offset: s,
    verticalPoints: A,
    xAxis: x,
    yAxis: w
  })), P.createElement(cF, or({}, f, {
    horizontalPoints: g
  })), P.createElement(sF, or({}, f, {
    verticalPoints: A
  })))
}
pF.displayName = "CartesianGrid";
var hF = ["type", "layout", "connectNulls", "ref"],
  dF = ["key"];

function tn(e) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, tn(e)
}

function mh(e, t) {
  if (e == null) return {};
  var r = vF(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function vF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Bn() {
  return Bn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Bn.apply(this, arguments)
}

function gh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gh(Object(r), !0).forEach(function(n) {
      rt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Pr(e) {
  return bF(e) || gF(e) || mF(e) || yF()
}

function yF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function mF(e, t) {
  if (e) {
    if (typeof e == "string") return Oc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Oc(e, t)
  }
}

function gF(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function bF(e) {
  if (Array.isArray(e)) return Oc(e)
}

function Oc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function xF(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function bh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, qy(n.key), n)
  }
}

function wF(e, t, r) {
  return t && bh(e.prototype, t), r && bh(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function OF(e, t, r) {
  return t = Xa(t), AF(e, Xy() ? Reflect.construct(t, r || [], Xa(e).constructor) : t.apply(e, r))
}

function AF(e, t) {
  if (t && (tn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return PF(e)
}

function PF(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Xy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Xy = function() {
    return !!e
  })()
}

function Xa(e) {
  return Xa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Xa(e)
}

function _F(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ac(e, t)
}

function Ac(e, t) {
  return Ac = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ac(e, t)
}

function rt(e, t, r) {
  return t = qy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function qy(e) {
  var t = SF(e, "string");
  return tn(t) == "symbol" ? t : t + ""
}

function SF(e, t) {
  if (tn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (tn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var Mi = function(e) {
  function t() {
    var r;
    xF(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
    return r = OF(this, t, [].concat(i)), rt(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), rt(r, "generateSimpleStrokeDasharray", function(o, u) {
      return "".concat(u, "px ").concat(o - u, "px")
    }), rt(r, "getStrokeDasharray", function(o, u, c) {
      var s = c.reduce(function(b, x) {
        return b + x
      });
      if (!s) return r.generateSimpleStrokeDasharray(u, o);
      for (var f = Math.floor(o / s), l = o % s, p = u - o, h = [], v = 0, d = 0; v < c.length; d += c[v], ++v)
        if (d + c[v] > l) {
          h = [].concat(Pr(c.slice(0, v)), [l - d]);
          break
        } var y = h.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Pr(t.repeat(c, f)), Pr(h), y).map(function(b) {
        return "".concat(b, "px")
      }).join(", ")
    }), rt(r, "id", Ut("recharts-line-")), rt(r, "pathRef", function(o) {
      r.mainCurve = o
    }), rt(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), rt(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return _F(t, e), wF(t, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        this.setState({
          totalLength: n
        })
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        n !== this.state.totalLength && this.setState({
          totalLength: n
        })
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var n = this.mainCurve;
      try {
        return n && n.getTotalLength && n.getTotalLength() || 0
      } catch {
        return 0
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var a = this.props,
        o = a.points,
        u = a.xAxis,
        c = a.yAxis,
        s = a.layout,
        f = a.children,
        l = De(f, On);
      if (!l) return null;
      var p = function(d, y) {
          return {
            x: d.x,
            y: d.y,
            value: d.value,
            errorVal: ue(d.payload, y)
          }
        },
        h = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return P.createElement(J, h, l.map(function(v) {
        return P.cloneElement(v, {
          key: "bar-".concat(v.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          dataPointFormatter: p
        })
      }))
    }
  }, {
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive;
      if (o && !this.state.isAnimationFinished) return null;
      var u = this.props,
        c = u.dot,
        s = u.points,
        f = u.dataKey,
        l = U(this.props, !1),
        p = U(c, !0),
        h = s.map(function(d, y) {
          var b = ze(ze(ze({
            key: "dot-".concat(y),
            r: 3
          }, l), p), {}, {
            index: y,
            cx: d.x,
            cy: d.y,
            value: d.value,
            dataKey: f,
            payload: d.payload,
            points: s
          });
          return t.renderDotItem(c, b)
        }),
        v = {
          clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
        };
      return P.createElement(J, Bn({
        className: "recharts-line-dots",
        key: "dots"
      }, v), h)
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, a, o) {
      var u = this.props,
        c = u.type,
        s = u.layout,
        f = u.connectNulls;
      u.ref;
      var l = mh(u, hF),
        p = ze(ze(ze({}, U(l, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(a, ")") : null,
          points: n
        }, o), {}, {
          type: c,
          layout: s,
          connectNulls: f
        });
      return P.createElement(Ft, Bn({}, p, {
        pathRef: this.pathRef
      }))
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(n, i) {
      var a = this,
        o = this.props,
        u = o.points,
        c = o.strokeDasharray,
        s = o.isAnimationActive,
        f = o.animationBegin,
        l = o.animationDuration,
        p = o.animationEasing,
        h = o.animationId,
        v = o.animateNewValues,
        d = o.width,
        y = o.height,
        b = this.state,
        x = b.prevPoints,
        w = b.totalLength;
      return P.createElement(lt, {
        begin: f,
        duration: l,
        isActive: s,
        easing: p,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(O) {
        var m = O.t;
        if (x) {
          var g = x.length / u.length,
            A = u.map(function($, I) {
              var C = Math.floor(I * g);
              if (x[C]) {
                var j = x[C],
                  k = oe(j.x, $.x),
                  D = oe(j.y, $.y);
                return ze(ze({}, $), {}, {
                  x: k(m),
                  y: D(m)
                })
              }
              if (v) {
                var B = oe(d * 2, $.x),
                  F = oe(y / 2, $.y);
                return ze(ze({}, $), {}, {
                  x: B(m),
                  y: F(m)
                })
              }
              return ze(ze({}, $), {}, {
                x: $.x,
                y: $.y
              })
            });
          return a.renderCurveStatically(A, n, i)
        }
        var _ = oe(0, w),
          S = _(m),
          E;
        if (c) {
          var T = "".concat(c).split(/[,\s]+/gim).map(function($) {
            return parseFloat($)
          });
          E = a.getStrokeDasharray(S, w, T)
        } else E = a.generateSimpleStrokeDasharray(w, S);
        return a.renderCurveStatically(u, n, i, {
          strokeDasharray: E
        })
      })
    }
  }, {
    key: "renderCurve",
    value: function(n, i) {
      var a = this.props,
        o = a.points,
        u = a.isAnimationActive,
        c = this.state,
        s = c.prevPoints,
        f = c.totalLength;
      return u && o && o.length && (!s && f > 0 || !$t(s, o)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(o, n, i)
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props,
        a = i.hide,
        o = i.dot,
        u = i.points,
        c = i.className,
        s = i.xAxis,
        f = i.yAxis,
        l = i.top,
        p = i.left,
        h = i.width,
        v = i.height,
        d = i.isAnimationActive,
        y = i.id;
      if (a || !u || !u.length) return null;
      var b = this.state.isAnimationFinished,
        x = u.length === 1,
        w = Z("recharts-line", c),
        O = s && s.allowDataOverflow,
        m = f && f.allowDataOverflow,
        g = O || m,
        A = V(y) ? this.id : y,
        _ = (n = U(o, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        S = _.r,
        E = S === void 0 ? 3 : S,
        T = _.strokeWidth,
        $ = T === void 0 ? 2 : T,
        I = Uh(o) ? o : {},
        C = I.clipDot,
        j = C === void 0 ? !0 : C,
        k = E * 2 + $;
      return P.createElement(J, {
        className: w
      }, O || m ? P.createElement("defs", null, P.createElement("clipPath", {
        id: "clipPath-".concat(A)
      }, P.createElement("rect", {
        x: O ? p : p - h / 2,
        y: m ? l : l - v / 2,
        width: O ? h : h * 2,
        height: m ? v : v * 2
      })), !j && P.createElement("clipPath", {
        id: "clipPath-dots-".concat(A)
      }, P.createElement("rect", {
        x: p - k / 2,
        y: l - k / 2,
        width: h + k,
        height: v + k
      }))) : null, !x && this.renderCurve(g, A), this.renderErrorBar(g, A), (x || o) && this.renderDots(g, j, A), (!d || b) && Je.renderCallByParent(this.props, u))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null
    }
  }, {
    key: "repeat",
    value: function(n, i) {
      for (var a = n.length % 2 !== 0 ? [].concat(Pr(n), [0]) : n, o = [], u = 0; u < i; ++u) o = [].concat(Pr(o), Pr(a));
      return o
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (P.isValidElement(n)) a = P.cloneElement(n, i);
      else if (G(n)) a = n(i);
      else {
        var o = i.key,
          u = mh(i, dF),
          c = Z("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        a = P.createElement(An, Bn({
          key: o
        }, u, {
          className: c
        }))
      }
      return a
    }
  }])
}(L.PureComponent);
rt(Mi, "displayName", "Line");
rt(Mi, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !dt.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
rt(Mi, "getComposedData", function(e) {
  var t = e.props,
    r = e.xAxis,
    n = e.yAxis,
    i = e.xAxisTicks,
    a = e.yAxisTicks,
    o = e.dataKey,
    u = e.bandSize,
    c = e.displayedData,
    s = e.offset,
    f = t.layout,
    l = c.map(function(p, h) {
      var v = ue(p, o);
      return f === "horizontal" ? {
        x: Ur({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: h
        }),
        y: V(v) ? null : n.scale(v),
        value: v,
        payload: p
      } : {
        x: V(v) ? null : r.scale(v),
        y: Ur({
          axis: n,
          ticks: a,
          bandSize: u,
          entry: p,
          index: h
        }),
        value: v,
        payload: p
      }
    });
  return ze({
    points: l,
    layout: f
  }, s)
});
var $F = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"],
  TF = ["key"],
  Yy;

function rn(e) {
  "@babel/helpers - typeof";
  return rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, rn(e)
}

function Zy(e, t) {
  if (e == null) return {};
  var r = EF(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function EF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function ur() {
  return ur = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ur.apply(this, arguments)
}

function xh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function It(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xh(Object(r), !0).forEach(function(n) {
      ut(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function jF(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function wh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Qy(n.key), n)
  }
}

function MF(e, t, r) {
  return t && wh(e.prototype, t), r && wh(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function CF(e, t, r) {
  return t = qa(t), IF(e, Jy() ? Reflect.construct(t, r || [], qa(e).constructor) : t.apply(e, r))
}

function IF(e, t) {
  if (t && (rn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return kF(e)
}

function kF(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Jy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Jy = function() {
    return !!e
  })()
}

function qa(e) {
  return qa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, qa(e)
}

function DF(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Pc(e, t)
}

function Pc(e, t) {
  return Pc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Pc(e, t)
}

function ut(e, t, r) {
  return t = Qy(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Qy(e) {
  var t = NF(e, "string");
  return rn(t) == "symbol" ? t : t + ""
}

function NF(e, t) {
  if (rn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var br = function(e) {
  function t() {
    var r;
    jF(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
    return r = CF(this, t, [].concat(i)), ut(r, "state", {
      isAnimationFinished: !0
    }), ut(r, "id", Ut("recharts-area-")), ut(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o()
    }), ut(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o()
    }), r
  }
  return DF(t, e), MF(t, [{
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive,
        u = this.state.isAnimationFinished;
      if (o && !u) return null;
      var c = this.props,
        s = c.dot,
        f = c.points,
        l = c.dataKey,
        p = U(this.props, !1),
        h = U(s, !0),
        v = f.map(function(y, b) {
          var x = It(It(It({
            key: "dot-".concat(b),
            r: 3
          }, p), h), {}, {
            index: b,
            cx: y.x,
            cy: y.y,
            dataKey: l,
            value: y.value,
            payload: y.payload,
            points: f
          });
          return t.renderDotItem(s, x)
        }),
        d = {
          clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
        };
      return P.createElement(J, ur({
        className: "recharts-area-dots"
      }, d), v)
    }
  }, {
    key: "renderHorizontalRect",
    value: function(n) {
      var i = this.props,
        a = i.baseLine,
        o = i.points,
        u = i.strokeWidth,
        c = o[0].x,
        s = o[o.length - 1].x,
        f = n * Math.abs(c - s),
        l = Nt(o.map(function(p) {
          return p.y || 0
        }));
      return R(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Nt(a.map(function(p) {
        return p.y || 0
      })), l)), R(l) ? P.createElement("rect", {
        x: c < s ? c : c - f,
        y: 0,
        width: f,
        height: Math.floor(l + (u ? parseInt("".concat(u), 10) : 1))
      }) : null
    }
  }, {
    key: "renderVerticalRect",
    value: function(n) {
      var i = this.props,
        a = i.baseLine,
        o = i.points,
        u = i.strokeWidth,
        c = o[0].y,
        s = o[o.length - 1].y,
        f = n * Math.abs(c - s),
        l = Nt(o.map(function(p) {
          return p.x || 0
        }));
      return R(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Nt(a.map(function(p) {
        return p.x || 0
      })), l)), R(l) ? P.createElement("rect", {
        x: 0,
        y: c < s ? c : c - f,
        width: l + (u ? parseInt("".concat(u), 10) : 1),
        height: Math.floor(f)
      }) : null
    }
  }, {
    key: "renderClipRect",
    value: function(n) {
      var i = this.props.layout;
      return i === "vertical" ? this.renderVerticalRect(n) : this.renderHorizontalRect(n)
    }
  }, {
    key: "renderAreaStatically",
    value: function(n, i, a, o) {
      var u = this.props,
        c = u.layout,
        s = u.type,
        f = u.stroke,
        l = u.connectNulls,
        p = u.isRange;
      u.ref;
      var h = Zy(u, $F);
      return P.createElement(J, {
        clipPath: a ? "url(#clipPath-".concat(o, ")") : null
      }, P.createElement(Ft, ur({}, U(h, !0), {
        points: n,
        connectNulls: l,
        type: s,
        baseLine: i,
        layout: c,
        stroke: "none",
        className: "recharts-area-area"
      })), f !== "none" && P.createElement(Ft, ur({}, U(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: n
      })), f !== "none" && p && P.createElement(Ft, ur({}, U(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: i
      })))
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function(n, i) {
      var a = this,
        o = this.props,
        u = o.points,
        c = o.baseLine,
        s = o.isAnimationActive,
        f = o.animationBegin,
        l = o.animationDuration,
        p = o.animationEasing,
        h = o.animationId,
        v = this.state,
        d = v.prevPoints,
        y = v.prevBaseLine;
      return P.createElement(lt, {
        begin: f,
        duration: l,
        isActive: s,
        easing: p,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(b) {
        var x = b.t;
        if (d) {
          var w = d.length / u.length,
            O = u.map(function(_, S) {
              var E = Math.floor(S * w);
              if (d[E]) {
                var T = d[E],
                  $ = oe(T.x, _.x),
                  I = oe(T.y, _.y);
                return It(It({}, _), {}, {
                  x: $(x),
                  y: I(x)
                })
              }
              return _
            }),
            m;
          if (R(c) && typeof c == "number") {
            var g = oe(y, c);
            m = g(x)
          } else if (V(c) || vn(c)) {
            var A = oe(y, 0);
            m = A(x)
          } else m = c.map(function(_, S) {
            var E = Math.floor(S * w);
            if (y[E]) {
              var T = y[E],
                $ = oe(T.x, _.x),
                I = oe(T.y, _.y);
              return It(It({}, _), {}, {
                x: $(x),
                y: I(x)
              })
            }
            return _
          });
          return a.renderAreaStatically(O, m, n, i)
        }
        return P.createElement(J, null, P.createElement("defs", null, P.createElement("clipPath", {
          id: "animationClipPath-".concat(i)
        }, a.renderClipRect(x))), P.createElement(J, {
          clipPath: "url(#animationClipPath-".concat(i, ")")
        }, a.renderAreaStatically(u, c, n, i)))
      })
    }
  }, {
    key: "renderArea",
    value: function(n, i) {
      var a = this.props,
        o = a.points,
        u = a.baseLine,
        c = a.isAnimationActive,
        s = this.state,
        f = s.prevPoints,
        l = s.prevBaseLine,
        p = s.totalLength;
      return c && o && o.length && (!f && p > 0 || !$t(f, o) || !$t(l, u)) ? this.renderAreaWithAnimation(n, i) : this.renderAreaStatically(o, u, n, i)
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props,
        a = i.hide,
        o = i.dot,
        u = i.points,
        c = i.className,
        s = i.top,
        f = i.left,
        l = i.xAxis,
        p = i.yAxis,
        h = i.width,
        v = i.height,
        d = i.isAnimationActive,
        y = i.id;
      if (a || !u || !u.length) return null;
      var b = this.state.isAnimationFinished,
        x = u.length === 1,
        w = Z("recharts-area", c),
        O = l && l.allowDataOverflow,
        m = p && p.allowDataOverflow,
        g = O || m,
        A = V(y) ? this.id : y,
        _ = (n = U(o, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        S = _.r,
        E = S === void 0 ? 3 : S,
        T = _.strokeWidth,
        $ = T === void 0 ? 2 : T,
        I = Uh(o) ? o : {},
        C = I.clipDot,
        j = C === void 0 ? !0 : C,
        k = E * 2 + $;
      return P.createElement(J, {
        className: w
      }, O || m ? P.createElement("defs", null, P.createElement("clipPath", {
        id: "clipPath-".concat(A)
      }, P.createElement("rect", {
        x: O ? f : f - h / 2,
        y: m ? s : s - v / 2,
        width: O ? h : h * 2,
        height: m ? v : v * 2
      })), !j && P.createElement("clipPath", {
        id: "clipPath-dots-".concat(A)
      }, P.createElement("rect", {
        x: f - k / 2,
        y: s - k / 2,
        width: h + k,
        height: v + k
      }))) : null, x ? null : this.renderArea(g, A), (o || x) && this.renderDots(g, j, A), (!d || b) && Je.renderCallByParent(this.props, u))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        curBaseLine: n.baseLine,
        prevPoints: i.curPoints,
        prevBaseLine: i.curBaseLine
      } : n.points !== i.curPoints || n.baseLine !== i.curBaseLine ? {
        curPoints: n.points,
        curBaseLine: n.baseLine
      } : null
    }
  }])
}(L.PureComponent);
Yy = br;
ut(br, "displayName", "Area");
ut(br, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: .6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !dt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
ut(br, "getBaseValue", function(e, t, r, n) {
  var i = e.layout,
    a = e.baseValue,
    o = t.props.baseValue,
    u = o ?? a;
  if (R(u) && typeof u == "number") return u;
  var c = i === "horizontal" ? n : r,
    s = c.scale.domain();
  if (c.type === "number") {
    var f = Math.max(s[0], s[1]),
      l = Math.min(s[0], s[1]);
    return u === "dataMin" ? l : u === "dataMax" || f < 0 ? f : Math.max(Math.min(s[0], s[1]), 0)
  }
  return u === "dataMin" ? s[0] : u === "dataMax" ? s[1] : s[0]
});
ut(br, "getComposedData", function(e) {
  var t = e.props,
    r = e.item,
    n = e.xAxis,
    i = e.yAxis,
    a = e.xAxisTicks,
    o = e.yAxisTicks,
    u = e.bandSize,
    c = e.dataKey,
    s = e.stackedData,
    f = e.dataStartIndex,
    l = e.displayedData,
    p = e.offset,
    h = t.layout,
    v = s && s.length,
    d = Yy.getBaseValue(t, r, n, i),
    y = h === "horizontal",
    b = !1,
    x = l.map(function(O, m) {
      var g;
      v ? g = s[f + m] : (g = ue(O, c), Array.isArray(g) ? b = !0 : g = [d, g]);
      var A = g[1] == null || v && ue(O, c) == null;
      return y ? {
        x: Ur({
          axis: n,
          ticks: a,
          bandSize: u,
          entry: O,
          index: m
        }),
        y: A ? null : i.scale(g[1]),
        value: g,
        payload: O
      } : {
        x: A ? null : n.scale(g[1]),
        y: Ur({
          axis: i,
          ticks: o,
          bandSize: u,
          entry: O,
          index: m
        }),
        value: g,
        payload: O
      }
    }),
    w;
  return v || b ? w = x.map(function(O) {
    var m = Array.isArray(O.value) ? O.value[0] : null;
    return y ? {
      x: O.x,
      y: m != null && O.y != null ? i.scale(m) : null
    } : {
      x: m != null ? n.scale(m) : null,
      y: O.y
    }
  }) : w = y ? i.scale(d) : n.scale(d), It({
    points: x,
    baseLine: w,
    layout: h,
    isRange: b
  }, p)
});
ut(br, "renderDotItem", function(e, t) {
  var r;
  if (P.isValidElement(e)) r = P.cloneElement(e, t);
  else if (G(e)) r = e(t);
  else {
    var n = Z("recharts-area-dot", typeof e != "boolean" ? e.className : ""),
      i = t.key,
      a = Zy(t, TF);
    r = P.createElement(An, ur({}, a, {
      key: i,
      className: n
    }))
  }
  return r
});

function nn(e) {
  "@babel/helpers - typeof";
  return nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, nn(e)
}

function LF(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function RF(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, rm(n.key), n)
  }
}

function BF(e, t, r) {
  return t && RF(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function FF(e, t, r) {
  return t = Ya(t), zF(e, em() ? Reflect.construct(t, r || [], Ya(e).constructor) : t.apply(e, r))
}

function zF(e, t) {
  if (t && (nn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return WF(e)
}

function WF(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function em() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (em = function() {
    return !!e
  })()
}

function Ya(e) {
  return Ya = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ya(e)
}

function UF(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && _c(e, t)
}

function _c(e, t) {
  return _c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, _c(e, t)
}

function tm(e, t, r) {
  return t = rm(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function rm(e) {
  var t = KF(e, "string");
  return nn(t) == "symbol" ? t : t + ""
}

function KF(e, t) {
  if (nn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var No = function(e) {
  function t() {
    return LF(this, t), FF(this, t, arguments)
  }
  return UF(t, e), BF(t, [{
    key: "render",
    value: function() {
      return null
    }
  }])
}(L.Component);
tm(No, "displayName", "ZAxis");
tm(No, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var HF = ["option", "isActive"];

function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Fn.apply(this, arguments)
}

function GF(e, t) {
  if (e == null) return {};
  var r = VF(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function VF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function XF(e) {
  var t = e.option,
    r = e.isActive,
    n = GF(e, HF);
  return typeof t == "string" ? L.createElement(ka, Fn({
    option: L.createElement(lo, Fn({
      type: t
    }, n)),
    isActive: r,
    shapeType: "symbols"
  }, n)) : L.createElement(ka, Fn({
    option: t,
    isActive: r,
    shapeType: "symbols"
  }, n))
}

function an(e) {
  "@babel/helpers - typeof";
  return an = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, an(e)
}

function zn() {
  return zn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, zn.apply(this, arguments)
}

function Oh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Oh(Object(r), !0).forEach(function(n) {
      Rt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Oh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function qF(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Ah(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, im(n.key), n)
  }
}

function YF(e, t, r) {
  return t && Ah(e.prototype, t), r && Ah(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ZF(e, t, r) {
  return t = Za(t), JF(e, nm() ? Reflect.construct(t, r || [], Za(e).constructor) : t.apply(e, r))
}

function JF(e, t) {
  if (t && (an(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return QF(e)
}

function QF(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function nm() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (nm = function() {
    return !!e
  })()
}

function Za(e) {
  return Za = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Za(e)
}

function ez(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Sc(e, t)
}

function Sc(e, t) {
  return Sc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Sc(e, t)
}

function Rt(e, t, r) {
  return t = im(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function im(e) {
  var t = tz(e, "string");
  return an(t) == "symbol" ? t : t + ""
}

function tz(e, t) {
  if (an(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (an(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Lo = function(e) {
  function t() {
    var r;
    qF(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
    return r = ZF(this, t, [].concat(i)), Rt(r, "state", {
      isAnimationFinished: !1
    }), Rt(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      })
    }), Rt(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      })
    }), Rt(r, "id", Ut("recharts-scatter-")), r
  }
  return ez(t, e), YF(t, [{
    key: "renderSymbolsStatically",
    value: function(n) {
      var i = this,
        a = this.props,
        o = a.shape,
        u = a.activeShape,
        c = a.activeIndex,
        s = U(this.props, !1);
      return n.map(function(f, l) {
        var p = c === l,
          h = p ? u : o,
          v = qe(qe({}, s), f);
        return P.createElement(J, zn({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(f?.cx, "-").concat(f?.cy, "-").concat(f?.size, "-").concat(l)
        }, zt(i.props, f, l), {
          role: "img"
        }), P.createElement(XF, zn({
          option: h,
          isActive: p,
          key: "symbol-".concat(l)
        }, v)))
      })
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        a = i.points,
        o = i.isAnimationActive,
        u = i.animationBegin,
        c = i.animationDuration,
        s = i.animationEasing,
        f = i.animationId,
        l = this.state.prevPoints;
      return P.createElement(lt, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var h = p.t,
          v = a.map(function(d, y) {
            var b = l && l[y];
            if (b) {
              var x = oe(b.cx, d.cx),
                w = oe(b.cy, d.cy),
                O = oe(b.size, d.size);
              return qe(qe({}, d), {}, {
                cx: x(h),
                cy: w(h),
                size: O(h)
              })
            }
            var m = oe(0, d.size);
            return qe(qe({}, d), {}, {
              size: m(h)
            })
          });
        return P.createElement(J, null, n.renderSymbolsStatically(v))
      })
    }
  }, {
    key: "renderSymbols",
    value: function() {
      var n = this.props,
        i = n.points,
        a = n.isAnimationActive,
        o = this.state.prevPoints;
      return a && i && i.length && (!o || !$t(o, i)) ? this.renderSymbolsWithAnimation() : this.renderSymbolsStatically(i)
    }
  }, {
    key: "renderErrorBar",
    value: function() {
      var n = this.props.isAnimationActive;
      if (n && !this.state.isAnimationFinished) return null;
      var i = this.props,
        a = i.points,
        o = i.xAxis,
        u = i.yAxis,
        c = i.children,
        s = De(c, On);
      return s ? s.map(function(f, l) {
        var p = f.props,
          h = p.direction,
          v = p.dataKey;
        return P.cloneElement(f, {
          key: "".concat(h, "-").concat(v, "-").concat(a[l]),
          data: a,
          xAxis: o,
          yAxis: u,
          layout: h === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function(y, b) {
            return {
              x: y.cx,
              y: y.cy,
              value: h === "x" ? +y.node.x : +y.node.y,
              errorVal: ue(y, b)
            }
          }
        })
      }) : null
    }
  }, {
    key: "renderLine",
    value: function() {
      var n = this.props,
        i = n.points,
        a = n.line,
        o = n.lineType,
        u = n.lineJointType,
        c = U(this.props, !1),
        s = U(a, !1),
        f, l;
      if (o === "joint") f = i.map(function(w) {
        return {
          x: w.cx,
          y: w.cy
        }
      });
      else if (o === "fitting") {
        var p = Y0(i),
          h = p.xmin,
          v = p.xmax,
          d = p.a,
          y = p.b,
          b = function(O) {
            return d * O + y
          };
        f = [{
          x: h,
          y: b(h)
        }, {
          x: v,
          y: b(v)
        }]
      }
      var x = qe(qe(qe({}, c), {}, {
        fill: "none",
        stroke: c && c.fill
      }, s), {}, {
        points: f
      });
      return P.isValidElement(a) ? l = P.cloneElement(a, x) : G(a) ? l = a(x) : l = P.createElement(Ft, zn({}, x, {
        type: u
      })), P.createElement(J, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, l)
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.hide,
        a = n.points,
        o = n.line,
        u = n.className,
        c = n.xAxis,
        s = n.yAxis,
        f = n.left,
        l = n.top,
        p = n.width,
        h = n.height,
        v = n.id,
        d = n.isAnimationActive;
      if (i || !a || !a.length) return null;
      var y = this.state.isAnimationFinished,
        b = Z("recharts-scatter", u),
        x = c && c.allowDataOverflow,
        w = s && s.allowDataOverflow,
        O = x || w,
        m = V(v) ? this.id : v;
      return P.createElement(J, {
        className: b,
        clipPath: O ? "url(#clipPath-".concat(m, ")") : null
      }, x || w ? P.createElement("defs", null, P.createElement("clipPath", {
        id: "clipPath-".concat(m)
      }, P.createElement("rect", {
        x: x ? f : f - p / 2,
        y: w ? l : l - h / 2,
        width: x ? p : p * 2,
        height: w ? h : h * 2
      }))) : null, o && this.renderLine(), this.renderErrorBar(), P.createElement(J, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!d || y) && Je.renderCallByParent(this.props, a))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null
    }
  }])
}(L.PureComponent);
Rt(Lo, "displayName", "Scatter");
Rt(Lo, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  data: [],
  shape: "circle",
  hide: !1,
  isAnimationActive: !dt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear"
});
Rt(Lo, "getComposedData", function(e) {
  var t = e.xAxis,
    r = e.yAxis,
    n = e.zAxis,
    i = e.item,
    a = e.displayedData,
    o = e.xAxisTicks,
    u = e.yAxisTicks,
    c = e.offset,
    s = i.props.tooltipType,
    f = De(i.props.children, vo),
    l = V(t.dataKey) ? i.props.dataKey : t.dataKey,
    p = V(r.dataKey) ? i.props.dataKey : r.dataKey,
    h = n && n.dataKey,
    v = n ? n.range : No.defaultProps.range,
    d = v && v[0],
    y = t.scale.bandwidth ? t.scale.bandwidth() : 0,
    b = r.scale.bandwidth ? r.scale.bandwidth() : 0,
    x = a.map(function(w, O) {
      var m = ue(w, l),
        g = ue(w, p),
        A = !V(h) && ue(w, h) || "-",
        _ = [{
          name: V(t.dataKey) ? i.props.name : t.name || t.dataKey,
          unit: t.unit || "",
          value: m,
          payload: w,
          dataKey: l,
          type: s
        }, {
          name: V(r.dataKey) ? i.props.name : r.name || r.dataKey,
          unit: r.unit || "",
          value: g,
          payload: w,
          dataKey: p,
          type: s
        }];
      A !== "-" && _.push({
        name: n.name || n.dataKey,
        unit: n.unit || "",
        value: A,
        payload: w,
        dataKey: h,
        type: s
      });
      var S = Ur({
          axis: t,
          ticks: o,
          bandSize: y,
          entry: w,
          index: O,
          dataKey: l
        }),
        E = Ur({
          axis: r,
          ticks: u,
          bandSize: b,
          entry: w,
          index: O,
          dataKey: p
        }),
        T = A !== "-" ? n.scale(A) : d,
        $ = Math.sqrt(Math.max(T, 0) / Math.PI);
      return qe(qe({}, w), {}, {
        cx: S,
        cy: E,
        x: S - $,
        y: E - $,
        xAxis: t,
        yAxis: r,
        zAxis: n,
        width: 2 * $,
        height: 2 * $,
        size: T,
        node: {
          x: m,
          y: g,
          z: A
        },
        tooltipPayload: _,
        tooltipPosition: {
          x: S,
          y: E
        },
        payload: w
      }, f && f[O] && f[O].props)
    });
  return qe({
    points: x
  }, c)
});

function on(e) {
  "@babel/helpers - typeof";
  return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, on(e)
}

function rz(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function nz(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, um(n.key), n)
  }
}

function iz(e, t, r) {
  return t && nz(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function az(e, t, r) {
  return t = Ja(t), oz(e, am() ? Reflect.construct(t, r || [], Ja(e).constructor) : t.apply(e, r))
}

function oz(e, t) {
  if (t && (on(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return uz(e)
}

function uz(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function am() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (am = function() {
    return !!e
  })()
}

function Ja(e) {
  return Ja = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ja(e)
}

function cz(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && $c(e, t)
}

function $c(e, t) {
  return $c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, $c(e, t)
}

function om(e, t, r) {
  return t = um(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function um(e) {
  var t = sz(e, "string");
  return on(t) == "symbol" ? t : t + ""
}

function sz(e, t) {
  if (on(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (on(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}

function Tc() {
  return Tc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Tc.apply(this, arguments)
}

function lz(e) {
  var t = e.xAxisId,
    r = ks(),
    n = Ds(),
    i = Ny(t);
  return i == null ? null : L.createElement(Pn, Tc({}, i, {
    className: Z("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(o) {
      return wt(o, !0)
    }
  }))
}
var Ci = function(e) {
  function t() {
    return rz(this, t), az(this, t, arguments)
  }
  return cz(t, e), iz(t, [{
    key: "render",
    value: function() {
      return L.createElement(lz, this.props)
    }
  }])
}(L.Component);
om(Ci, "displayName", "XAxis");
om(Ci, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});

function un(e) {
  "@babel/helpers - typeof";
  return un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, un(e)
}

function fz(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function pz(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, lm(n.key), n)
  }
}

function hz(e, t, r) {
  return t && pz(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function dz(e, t, r) {
  return t = Qa(t), vz(e, cm() ? Reflect.construct(t, r || [], Qa(e).constructor) : t.apply(e, r))
}

function vz(e, t) {
  if (t && (un(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return yz(e)
}

function yz(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function cm() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (cm = function() {
    return !!e
  })()
}

function Qa(e) {
  return Qa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Qa(e)
}

function mz(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ec(e, t)
}

function Ec(e, t) {
  return Ec = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ec(e, t)
}

function sm(e, t, r) {
  return t = lm(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function lm(e) {
  var t = gz(e, "string");
  return un(t) == "symbol" ? t : t + ""
}

function gz(e, t) {
  if (un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}

function jc() {
  return jc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, jc.apply(this, arguments)
}
var bz = function(t) {
    var r = t.yAxisId,
      n = ks(),
      i = Ds(),
      a = Ly(r);
    return a == null ? null : L.createElement(Pn, jc({}, a, {
      className: Z("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return wt(u, !0)
      }
    }))
  },
  Ii = function(e) {
    function t() {
      return fz(this, t), dz(this, t, arguments)
    }
    return mz(t, e), hz(t, [{
      key: "render",
      value: function() {
        return L.createElement(bz, this.props)
      }
    }])
  }(L.Component);
sm(Ii, "displayName", "YAxis");
sm(Ii, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});

function Ph(e) {
  return Az(e) || Oz(e) || wz(e) || xz()
}

function xz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wz(e, t) {
  if (e) {
    if (typeof e == "string") return Mc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mc(e, t)
  }
}

function Oz(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Az(e) {
  if (Array.isArray(e)) return Mc(e)
}

function Mc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var Cc = function(t, r, n, i, a) {
    var o = De(t, Ls),
      u = De(t, Io),
      c = [].concat(Ph(o), Ph(u)),
      s = De(t, Do),
      f = "".concat(i, "Id"),
      l = i[0],
      p = r;
    if (c.length && (p = c.reduce(function(d, y) {
        if (y.props[f] === n && st(y.props, "extendDomain") && R(y.props[l])) {
          var b = y.props[l];
          return [Math.min(d[0], b), Math.max(d[1], b)]
        }
        return d
      }, p)), s.length) {
      var h = "".concat(l, "1"),
        v = "".concat(l, "2");
      p = s.reduce(function(d, y) {
        if (y.props[f] === n && st(y.props, "extendDomain") && R(y.props[h]) && R(y.props[v])) {
          var b = y.props[h],
            x = y.props[v];
          return [Math.min(d[0], b, x), Math.max(d[1], b, x)]
        }
        return d
      }, p)
    }
    return a && a.length && (p = a.reduce(function(d, y) {
      return R(y) ? [Math.min(d[0], y), Math.max(d[1], y)] : d
    }, p)), p
  },
  fm = {
    exports: {}
  };
(function(e) {
  var t = Object.prototype.hasOwnProperty,
    r = "~";

  function n() {}
  Object.create && (n.prototype = Object.create(null), new n().__proto__ || (r = !1));

  function i(c, s, f) {
    this.fn = c, this.context = s, this.once = f || !1
  }

  function a(c, s, f, l, p) {
    if (typeof f != "function") throw new TypeError("The listener must be a function");
    var h = new i(f, l || c, p),
      v = r ? r + s : s;
    return c._events[v] ? c._events[v].fn ? c._events[v] = [c._events[v], h] : c._events[v].push(h) : (c._events[v] = h, c._eventsCount++), c
  }

  function o(c, s) {
    --c._eventsCount === 0 ? c._events = new n : delete c._events[s]
  }

  function u() {
    this._events = new n, this._eventsCount = 0
  }
  u.prototype.eventNames = function() {
    var s = [],
      f, l;
    if (this._eventsCount === 0) return s;
    for (l in f = this._events) t.call(f, l) && s.push(r ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(f)) : s
  }, u.prototype.listeners = function(s) {
    var f = r ? r + s : s,
      l = this._events[f];
    if (!l) return [];
    if (l.fn) return [l.fn];
    for (var p = 0, h = l.length, v = new Array(h); p < h; p++) v[p] = l[p].fn;
    return v
  }, u.prototype.listenerCount = function(s) {
    var f = r ? r + s : s,
      l = this._events[f];
    return l ? l.fn ? 1 : l.length : 0
  }, u.prototype.emit = function(s, f, l, p, h, v) {
    var d = r ? r + s : s;
    if (!this._events[d]) return !1;
    var y = this._events[d],
      b = arguments.length,
      x, w;
    if (y.fn) {
      switch (y.once && this.removeListener(s, y.fn, void 0, !0), b) {
        case 1:
          return y.fn.call(y.context), !0;
        case 2:
          return y.fn.call(y.context, f), !0;
        case 3:
          return y.fn.call(y.context, f, l), !0;
        case 4:
          return y.fn.call(y.context, f, l, p), !0;
        case 5:
          return y.fn.call(y.context, f, l, p, h), !0;
        case 6:
          return y.fn.call(y.context, f, l, p, h, v), !0
      }
      for (w = 1, x = new Array(b - 1); w < b; w++) x[w - 1] = arguments[w];
      y.fn.apply(y.context, x)
    } else {
      var O = y.length,
        m;
      for (w = 0; w < O; w++) switch (y[w].once && this.removeListener(s, y[w].fn, void 0, !0), b) {
        case 1:
          y[w].fn.call(y[w].context);
          break;
        case 2:
          y[w].fn.call(y[w].context, f);
          break;
        case 3:
          y[w].fn.call(y[w].context, f, l);
          break;
        case 4:
          y[w].fn.call(y[w].context, f, l, p);
          break;
        default:
          if (!x)
            for (m = 1, x = new Array(b - 1); m < b; m++) x[m - 1] = arguments[m];
          y[w].fn.apply(y[w].context, x)
      }
    }
    return !0
  }, u.prototype.on = function(s, f, l) {
    return a(this, s, f, l, !1)
  }, u.prototype.once = function(s, f, l) {
    return a(this, s, f, l, !0)
  }, u.prototype.removeListener = function(s, f, l, p) {
    var h = r ? r + s : s;
    if (!this._events[h]) return this;
    if (!f) return o(this, h), this;
    var v = this._events[h];
    if (v.fn) v.fn === f && (!p || v.once) && (!l || v.context === l) && o(this, h);
    else {
      for (var d = 0, y = [], b = v.length; d < b; d++)(v[d].fn !== f || p && !v[d].once || l && v[d].context !== l) && y.push(v[d]);
      y.length ? this._events[h] = y.length === 1 ? y[0] : y : o(this, h)
    }
    return this
  }, u.prototype.removeAllListeners = function(s) {
    var f;
    return s ? (f = r ? r + s : s, this._events[f] && o(this, f)) : (this._events = new n, this._eventsCount = 0), this
  }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u
})(fm);
var Pz = fm.exports;
const _z = ae(Pz);
var lu = new _z,
  fu = "recharts.syncMouseEvents";

function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, wi(e)
}

function Sz(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function $z(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, pm(n.key), n)
  }
}

function Tz(e, t, r) {
  return t && $z(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function pu(e, t, r) {
  return t = pm(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function pm(e) {
  var t = Ez(e, "string");
  return wi(t) == "symbol" ? t : t + ""
}

function Ez(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return String(e)
}
var jz = function() {
  function e() {
    Sz(this, e), pu(this, "activeIndex", 0), pu(this, "coordinateList", []), pu(this, "layout", "horizontal")
  }
  return Tz(e, [{
    key: "setDetails",
    value: function(r) {
      var n, i = r.coordinateList,
        a = i === void 0 ? null : i,
        o = r.container,
        u = o === void 0 ? null : o,
        c = r.layout,
        s = c === void 0 ? null : c,
        f = r.offset,
        l = f === void 0 ? null : f,
        p = r.mouseHandlerCallback,
        h = p === void 0 ? null : p;
      this.coordinateList = (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = l ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1)
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse()
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0) switch (r.key) {
        case "ArrowRight": {
          if (this.layout !== "horizontal") return;
          this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
          break
        }
        case "ArrowLeft": {
          if (this.layout !== "horizontal") return;
          this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
          break
        }
      }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var i = this.container.getBoundingClientRect(),
          a = i.x,
          o = i.y,
          u = i.height,
          c = this.coordinateList[this.activeIndex].coordinate,
          s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0,
          f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0,
          l = a + c + s,
          p = o + this.offset.top + u / 2 + f;
        this.mouseHandlerCallback({
          pageX: l,
          pageY: p
        })
      }
    }
  }])
}();

function Mz(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0],
      i = e?.[1];
    if (n && i && R(n) && R(i)) return !0
  }
  return !1
}

function Cz(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + .5,
    y: e === "horizontal" ? r.top + .5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  }
}

function hm(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    a = e.endAngle,
    o = ne(t, r, n, i),
    u = ne(t, r, n, a);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  }
}

function Iz(e, t, r) {
  var n, i, a, o;
  if (e === "horizontal") n = t.x, a = n, i = r.top, o = r.top + r.height;
  else if (e === "vertical") i = t.y, o = i, n = r.left, a = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx,
        c = t.cy,
        s = t.innerRadius,
        f = t.outerRadius,
        l = t.angle,
        p = ne(u, c, s, l),
        h = ne(u, c, f, l);
      n = p.x, i = p.y, a = h.x, o = h.y
    } else return hm(t);
  return [{
    x: n,
    y: i
  }, {
    x: a,
    y: o
  }]
}

function Oi(e) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Oi(e)
}

function _h(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Xi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _h(Object(r), !0).forEach(function(n) {
      kz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _h(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function kz(e, t, r) {
  return t = Dz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Dz(e) {
  var t = Nz(e, "string");
  return Oi(t) == "symbol" ? t : t + ""
}

function Nz(e, t) {
  if (Oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Lz(e) {
  var t, r, n = e.element,
    i = e.tooltipEventType,
    a = e.isActive,
    o = e.activeCoordinate,
    u = e.activePayload,
    c = e.offset,
    s = e.activeTooltipIndex,
    f = e.tooltipAxisBandSize,
    l = e.layout,
    p = e.chartName,
    h = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !h || !a || !o || p !== "ScatterChart" && i !== "axis") return null;
  var v, d = Ft;
  if (p === "ScatterChart") v = o, d = Q2;
  else if (p === "BarChart") v = Cz(l, o, c, f), d = Es;
  else if (l === "radial") {
    var y = hm(o),
      b = y.cx,
      x = y.cy,
      w = y.radius,
      O = y.startAngle,
      m = y.endAngle;
    v = {
      cx: b,
      cy: x,
      startAngle: O,
      endAngle: m,
      innerRadius: w,
      outerRadius: w
    }, d = sy
  } else v = {
    points: Iz(l, o, c)
  }, d = Ft;
  var g = Xi(Xi(Xi(Xi({
    stroke: "#ccc",
    pointerEvents: "none"
  }, c), v), U(h, !1)), {}, {
    payload: u,
    payloadIndex: s,
    className: Z("recharts-tooltip-cursor", h.className)
  });
  return L.isValidElement(h) ? L.cloneElement(h, g) : L.createElement(d, g)
}
var Rz = ["item"],
  Bz = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function cn(e) {
  "@babel/helpers - typeof";
  return cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, cn(e)
}

function Er() {
  return Er = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Er.apply(this, arguments)
}

function Sh(e, t) {
  return Wz(e) || zz(e, t) || vm(e, t) || Fz()
}

function Fz() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function zz(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [],
      c = !0,
      s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0)
        for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
    } catch (f) {
      s = !0, i = f
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return
      } finally {
        if (s) throw i
      }
    }
    return u
  }
}

function Wz(e) {
  if (Array.isArray(e)) return e
}

function $h(e, t) {
  if (e == null) return {};
  var r = Uz(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Uz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Kz(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Hz(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ym(n.key), n)
  }
}

function Gz(e, t, r) {
  return t && Hz(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Vz(e, t, r) {
  return t = eo(t), Xz(e, dm() ? Reflect.construct(t, r || [], eo(e).constructor) : t.apply(e, r))
}

function Xz(e, t) {
  if (t && (cn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return qz(e)
}

function qz(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function dm() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (dm = function() {
    return !!e
  })()
}

function eo(e) {
  return eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, eo(e)
}

function Yz(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ic(e, t)
}

function Ic(e, t) {
  return Ic = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ic(e, t)
}

function sn(e) {
  return Qz(e) || Jz(e) || vm(e) || Zz()
}

function Zz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function vm(e, t) {
  if (e) {
    if (typeof e == "string") return kc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return kc(e, t)
  }
}

function Jz(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Qz(e) {
  if (Array.isArray(e)) return kc(e)
}

function kc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function Th(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function M(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Th(Object(r), !0).forEach(function(n) {
      X(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Th(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function X(e, t, r) {
  return t = ym(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ym(e) {
  var t = e3(e, "string");
  return cn(t) == "symbol" ? t : t + ""
}

function e3(e, t) {
  if (cn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (cn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var t3 = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  r3 = {
    width: "100%",
    height: "100%"
  },
  mm = {
    x: 0,
    y: 0
  };

function qi(e) {
  return e
}
var n3 = function(t, r) {
    return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius
  },
  i3 = function(t, r, n, i) {
    var a = r.find(function(f) {
      return f && f.index === n
    });
    if (a) {
      if (t === "horizontal") return {
        x: a.coordinate,
        y: i.y
      };
      if (t === "vertical") return {
        x: i.x,
        y: a.coordinate
      };
      if (t === "centric") {
        var o = a.coordinate,
          u = i.radius;
        return M(M(M({}, i), ne(i.cx, i.cy, u, o)), {}, {
          angle: o,
          radius: u
        })
      }
      var c = a.coordinate,
        s = i.angle;
      return M(M(M({}, i), ne(i.cx, i.cy, c, s)), {}, {
        angle: s,
        radius: c
      })
    }
    return mm
  },
  Ro = function(t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      a = r.dataEndIndex,
      o = (n ?? []).reduce(function(u, c) {
        var s = c.props.data;
        return s && s.length ? [].concat(sn(u), sn(s)) : u
      }, []);
    return o.length > 0 ? o : t && t.length && R(i) && R(a) ? t.slice(i, a + 1) : []
  };

function gm(e) {
  return e === "number" ? [0, "auto"] : void 0
}
var Dc = function(t, r, n, i) {
    var a = t.graphicalItems,
      o = t.tooltipAxis,
      u = Ro(r, t);
    return n < 0 || !a || !a.length || n >= u.length ? null : a.reduce(function(c, s) {
      var f, l = (f = s.props.data) !== null && f !== void 0 ? f : r;
      l && t.dataStartIndex + t.dataEndIndex !== 0 && t.dataEndIndex - t.dataStartIndex >= n && (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
      var p;
      if (o.dataKey && !o.allowDuplicatedCategory) {
        var h = l === void 0 ? u : l;
        p = Zi(h, o.dataKey, i)
      } else p = l && l[n] || u[n];
      return p ? [].concat(sn(c), [ty(s, p)]) : c
    }, [])
  },
  Eh = function(t, r, n, i) {
    var a = i || {
        x: t.chartX,
        y: t.chartY
      },
      o = n3(a, n),
      u = t.orderedTooltipTicks,
      c = t.tooltipAxis,
      s = t.tooltipTicks,
      f = ok(o, u, s, c);
    if (f >= 0 && s) {
      var l = s[f] && s[f].value,
        p = Dc(t, r, f, l),
        h = i3(n, u, f, a);
      return {
        activeTooltipIndex: f,
        activeLabel: l,
        activePayload: p,
        activeCoordinate: h
      }
    }
    return null
  },
  a3 = function(t, r) {
    var n = r.axes,
      i = r.graphicalItems,
      a = r.axisType,
      o = r.axisIdKey,
      u = r.stackGroups,
      c = r.dataStartIndex,
      s = r.dataEndIndex,
      f = t.layout,
      l = t.children,
      p = t.stackOffset,
      h = qv(f, a);
    return n.reduce(function(v, d) {
      var y, b = d.type.defaultProps !== void 0 ? M(M({}, d.type.defaultProps), d.props) : d.props,
        x = b.type,
        w = b.dataKey,
        O = b.allowDataOverflow,
        m = b.allowDuplicatedCategory,
        g = b.scale,
        A = b.ticks,
        _ = b.includeHidden,
        S = b[o];
      if (v[S]) return v;
      var E = Ro(t.data, {
          graphicalItems: i.filter(function(W) {
            var Y, fe = o in W.props ? W.props[o] : (Y = W.type.defaultProps) === null || Y === void 0 ? void 0 : Y[o];
            return fe === S
          }),
          dataStartIndex: c,
          dataEndIndex: s
        }),
        T = E.length,
        $, I, C;
      Mz(b.domain, O, x) && ($ = ec(b.domain, null, O), h && (x === "number" || g !== "auto") && (C = Nn(E, w, "category")));
      var j = gm(x);
      if (!$ || $.length === 0) {
        var k, D = (k = b.domain) !== null && k !== void 0 ? k : j;
        if (w) {
          if ($ = Nn(E, w, x), x === "category" && h) {
            var B = q0($);
            m && B ? (I = $, $ = Ra(0, T)) : m || ($ = cp(D, $, d).reduce(function(W, Y) {
              return W.indexOf(Y) >= 0 ? W : [].concat(sn(W), [Y])
            }, []))
          } else if (x === "category") m ? $ = $.filter(function(W) {
            return W !== "" && !V(W)
          }) : $ = cp(D, $, d).reduce(function(W, Y) {
            return W.indexOf(Y) >= 0 || Y === "" || V(Y) ? W : [].concat(sn(W), [Y])
          }, []);
          else if (x === "number") {
            var F = fk(E, i.filter(function(W) {
              var Y, fe, me = o in W.props ? W.props[o] : (Y = W.type.defaultProps) === null || Y === void 0 ? void 0 : Y[o],
                Fe = "hide" in W.props ? W.props.hide : (fe = W.type.defaultProps) === null || fe === void 0 ? void 0 : fe.hide;
              return me === S && (_ || !Fe)
            }), w, a, f);
            F && ($ = F)
          }
          h && (x === "number" || g !== "auto") && (C = Nn(E, w, "category"))
        } else h ? $ = Ra(0, T) : u && u[S] && u[S].hasStack && x === "number" ? $ = p === "expand" ? [0, 1] : ey(u[S].stackGroups, c, s) : $ = Xv(E, i.filter(function(W) {
          var Y = o in W.props ? W.props[o] : W.type.defaultProps[o],
            fe = "hide" in W.props ? W.props.hide : W.type.defaultProps.hide;
          return Y === S && (_ || !fe)
        }), x, f, !0);
        if (x === "number") $ = Cc(l, $, S, a, A), D && ($ = ec(D, $, O));
        else if (x === "category" && D) {
          var H = D,
            q = $.every(function(W) {
              return H.indexOf(W) >= 0
            });
          q && ($ = H)
        }
      }
      return M(M({}, v), {}, X({}, S, M(M({}, b), {}, {
        axisType: a,
        domain: $,
        categoricalDomain: C,
        duplicateDomain: I,
        originalDomain: (y = b.domain) !== null && y !== void 0 ? y : j,
        isCategorical: h,
        layout: f
      })))
    }, {})
  },
  o3 = function(t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      a = r.axisType,
      o = r.axisIdKey,
      u = r.stackGroups,
      c = r.dataStartIndex,
      s = r.dataEndIndex,
      f = t.layout,
      l = t.children,
      p = Ro(t.data, {
        graphicalItems: n,
        dataStartIndex: c,
        dataEndIndex: s
      }),
      h = p.length,
      v = qv(f, a),
      d = -1;
    return n.reduce(function(y, b) {
      var x = b.type.defaultProps !== void 0 ? M(M({}, b.type.defaultProps), b.props) : b.props,
        w = x[o],
        O = gm("number");
      if (!y[w]) {
        d++;
        var m;
        return v ? m = Ra(0, h) : u && u[w] && u[w].hasStack ? (m = ey(u[w].stackGroups, c, s), m = Cc(l, m, w, a)) : (m = ec(O, Xv(p, n.filter(function(g) {
          var A, _, S = o in g.props ? g.props[o] : (A = g.type.defaultProps) === null || A === void 0 ? void 0 : A[o],
            E = "hide" in g.props ? g.props.hide : (_ = g.type.defaultProps) === null || _ === void 0 ? void 0 : _.hide;
          return S === w && !E
        }), "number", f), i.defaultProps.allowDataOverflow), m = Cc(l, m, w, a)), M(M({}, y), {}, X({}, w, M(M({
          axisType: a
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: He(t3, "".concat(a, ".").concat(d % 2), null),
          domain: m,
          originalDomain: O,
          isCategorical: v,
          layout: f
        })))
      }
      return y
    }, {})
  },
  u3 = function(t, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      a = r.AxisComp,
      o = r.graphicalItems,
      u = r.stackGroups,
      c = r.dataStartIndex,
      s = r.dataEndIndex,
      f = t.children,
      l = "".concat(i, "Id"),
      p = De(f, a),
      h = {};
    return p && p.length ? h = a3(t, {
      axes: p,
      graphicalItems: o,
      axisType: i,
      axisIdKey: l,
      stackGroups: u,
      dataStartIndex: c,
      dataEndIndex: s
    }) : o && o.length && (h = o3(t, {
      Axis: a,
      graphicalItems: o,
      axisType: i,
      axisIdKey: l,
      stackGroups: u,
      dataStartIndex: c,
      dataEndIndex: s
    })), h
  },
  c3 = function(t) {
    var r = Dt(t),
      n = wt(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: rs(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: Sa(r, n)
    }
  },
  jh = function(t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = Ue(r, qr),
      a = 0,
      o = 0;
    return t.data && t.data.length !== 0 && (o = t.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (a = i.props.startIndex), i.props.endIndex >= 0 && (o = i.props.endIndex)), {
      chartX: 0,
      chartY: 0,
      dataStartIndex: a,
      dataEndIndex: o,
      activeTooltipIndex: -1,
      isTooltipActive: !!n
    }
  },
  s3 = function(t) {
    return !t || !t.length ? !1 : t.some(function(r) {
      var n = Ot(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  Mh = function(t) {
    return t === "horizontal" ? {
      numericAxisName: "yAxis",
      cateAxisName: "xAxis"
    } : t === "vertical" ? {
      numericAxisName: "xAxis",
      cateAxisName: "yAxis"
    } : t === "centric" ? {
      numericAxisName: "radiusAxis",
      cateAxisName: "angleAxis"
    } : {
      numericAxisName: "angleAxis",
      cateAxisName: "radiusAxis"
    }
  },
  l3 = function(t, r) {
    var n = t.props,
      i = t.graphicalItems,
      a = t.xAxisMap,
      o = a === void 0 ? {} : a,
      u = t.yAxisMap,
      c = u === void 0 ? {} : u,
      s = n.width,
      f = n.height,
      l = n.children,
      p = n.margin || {},
      h = Ue(l, qr),
      v = Ue(l, Mr),
      d = Object.keys(c).reduce(function(m, g) {
        var A = c[g],
          _ = A.orientation;
        return !A.mirror && !A.hide ? M(M({}, m), {}, X({}, _, m[_] + A.width)) : m
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      y = Object.keys(o).reduce(function(m, g) {
        var A = o[g],
          _ = A.orientation;
        return !A.mirror && !A.hide ? M(M({}, m), {}, X({}, _, He(m, "".concat(_)) + A.height)) : m
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      b = M(M({}, y), d),
      x = b.bottom;
    h && (b.bottom += h.props.height || qr.defaultProps.height), v && r && (b = sk(b, i, n, r));
    var w = s - b.left - b.right,
      O = f - b.top - b.bottom;
    return M(M({
      brushBottom: x
    }, b), {}, {
      width: Math.max(w, 0),
      height: Math.max(O, 0)
    })
  },
  f3 = function(t, r) {
    if (r === "xAxis") return t[r].width;
    if (r === "yAxis") return t[r].height
  },
  ki = function(t) {
    var r = t.chartName,
      n = t.GraphicalChild,
      i = t.defaultTooltipEventType,
      a = i === void 0 ? "axis" : i,
      o = t.validateTooltipEventTypes,
      u = o === void 0 ? ["axis"] : o,
      c = t.axisComponents,
      s = t.legendContent,
      f = t.formatAxisMap,
      l = t.defaultProps,
      p = function(b, x) {
        var w = x.graphicalItems,
          O = x.stackGroups,
          m = x.offset,
          g = x.updateId,
          A = x.dataStartIndex,
          _ = x.dataEndIndex,
          S = b.barSize,
          E = b.layout,
          T = b.barGap,
          $ = b.barCategoryGap,
          I = b.maxBarSize,
          C = Mh(E),
          j = C.numericAxisName,
          k = C.cateAxisName,
          D = s3(w),
          B = [];
        return w.forEach(function(F, H) {
          var q = Ro(b.data, {
              graphicalItems: [F],
              dataStartIndex: A,
              dataEndIndex: _
            }),
            W = F.type.defaultProps !== void 0 ? M(M({}, F.type.defaultProps), F.props) : F.props,
            Y = W.dataKey,
            fe = W.maxBarSize,
            me = W["".concat(j, "Id")],
            Fe = W["".concat(k, "Id")],
            Vt = {},
            Ne = c.reduce(function(Xt, qt) {
              var Bo = x["".concat(qt.axisType, "Map")],
                Fs = W["".concat(qt.axisType, "Id")];
              Bo && Bo[Fs] || qt.axisType === "zAxis" || hr();
              var zs = Bo[Fs];
              return M(M({}, Xt), {}, X(X({}, qt.axisType, zs), "".concat(qt.axisType, "Ticks"), wt(zs)))
            }, Vt),
            z = Ne[k],
            Q = Ne["".concat(k, "Ticks")],
            ee = O && O[me] && O[me].hasStack && xk(F, O[me].stackGroups),
            N = Ot(F.type).indexOf("Bar") >= 0,
            ve = Sa(z, Q),
            te = [],
            xe = D && uk({
              barSize: S,
              stackGroups: O,
              totalSize: f3(Ne, k)
            });
          if (N) {
            var we, Le, Ct = V(fe) ? I : fe,
              xr = (we = (Le = Sa(z, Q, !0)) !== null && Le !== void 0 ? Le : Ct) !== null && we !== void 0 ? we : 0;
            te = ck({
              barGap: T,
              barCategoryGap: $,
              bandSize: xr !== ve ? xr : ve,
              sizeList: xe[Fe],
              maxBarSize: Ct
            }), xr !== ve && (te = te.map(function(Xt) {
              return M(M({}, Xt), {}, {
                position: M(M({}, Xt.position), {}, {
                  offset: Xt.position.offset - xr / 2
                })
              })
            }))
          }
          var Di = F && F.type && F.type.getComposedData;
          Di && B.push({
            props: M(M({}, Di(M(M({}, Ne), {}, {
              displayedData: q,
              props: b,
              dataKey: Y,
              item: F,
              bandSize: ve,
              barPosition: te,
              offset: m,
              stackedData: ee,
              layout: E,
              dataStartIndex: A,
              dataEndIndex: _
            }))), {}, X(X(X({
              key: F.key || "item-".concat(H)
            }, j, Ne[j]), k, Ne[k]), "animationId", g)),
            childIndex: cx(F, b.children),
            item: F
          })
        }), B
      },
      h = function(b, x) {
        var w = b.props,
          O = b.dataStartIndex,
          m = b.dataEndIndex,
          g = b.updateId;
        if (!tl({
            props: w
          })) return null;
        var A = w.children,
          _ = w.layout,
          S = w.stackOffset,
          E = w.data,
          T = w.reverseStackOrder,
          $ = Mh(_),
          I = $.numericAxisName,
          C = $.cateAxisName,
          j = De(A, n),
          k = gk(E, j, "".concat(I, "Id"), "".concat(C, "Id"), S, T),
          D = c.reduce(function(W, Y) {
            var fe = "".concat(Y.axisType, "Map");
            return M(M({}, W), {}, X({}, fe, u3(w, M(M({}, Y), {}, {
              graphicalItems: j,
              stackGroups: Y.axisType === I && k,
              dataStartIndex: O,
              dataEndIndex: m
            }))))
          }, {}),
          B = l3(M(M({}, D), {}, {
            props: w,
            graphicalItems: j
          }), x?.legendBBox);
        Object.keys(D).forEach(function(W) {
          D[W] = f(w, D[W], B, W.replace("Map", ""), r)
        });
        var F = D["".concat(C, "Map")],
          H = c3(F),
          q = p(w, M(M({}, D), {}, {
            dataStartIndex: O,
            dataEndIndex: m,
            updateId: g,
            graphicalItems: j,
            stackGroups: k,
            offset: B
          }));
        return M(M({
          formattedGraphicalItems: q,
          graphicalItems: j,
          offset: B,
          stackGroups: k
        }, H), D)
      },
      v = function(y) {
        function b(x) {
          var w, O, m;
          return Kz(this, b), m = Vz(this, b, [x]), X(m, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), X(m, "accessibilityManager", new jz), X(m, "handleLegendBBoxUpdate", function(g) {
            if (g) {
              var A = m.state,
                _ = A.dataStartIndex,
                S = A.dataEndIndex,
                E = A.updateId;
              m.setState(M({
                legendBBox: g
              }, h({
                props: m.props,
                dataStartIndex: _,
                dataEndIndex: S,
                updateId: E
              }, M(M({}, m.state), {}, {
                legendBBox: g
              }))))
            }
          }), X(m, "handleReceiveSyncEvent", function(g, A, _) {
            if (m.props.syncId === g) {
              if (_ === m.eventEmitterSymbol && typeof m.props.syncMethod != "function") return;
              m.applySyncEvent(A)
            }
          }), X(m, "handleBrushChange", function(g) {
            var A = g.startIndex,
              _ = g.endIndex;
            if (A !== m.state.dataStartIndex || _ !== m.state.dataEndIndex) {
              var S = m.state.updateId;
              m.setState(function() {
                return M({
                  dataStartIndex: A,
                  dataEndIndex: _
                }, h({
                  props: m.props,
                  dataStartIndex: A,
                  dataEndIndex: _,
                  updateId: S
                }, m.state))
              }), m.triggerSyncEvent({
                dataStartIndex: A,
                dataEndIndex: _
              })
            }
          }), X(m, "handleMouseEnter", function(g) {
            var A = m.getMouseInfo(g);
            if (A) {
              var _ = M(M({}, A), {}, {
                isTooltipActive: !0
              });
              m.setState(_), m.triggerSyncEvent(_);
              var S = m.props.onMouseEnter;
              G(S) && S(_, g)
            }
          }), X(m, "triggeredAfterMouseMove", function(g) {
            var A = m.getMouseInfo(g),
              _ = A ? M(M({}, A), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            m.setState(_), m.triggerSyncEvent(_);
            var S = m.props.onMouseMove;
            G(S) && S(_, g)
          }), X(m, "handleItemMouseEnter", function(g) {
            m.setState(function() {
              return {
                isTooltipActive: !0,
                activeItem: g,
                activePayload: g.tooltipPayload,
                activeCoordinate: g.tooltipPosition || {
                  x: g.cx,
                  y: g.cy
                }
              }
            })
          }), X(m, "handleItemMouseLeave", function() {
            m.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), X(m, "handleMouseMove", function(g) {
            g.persist(), m.throttleTriggeredAfterMouseMove(g)
          }), X(m, "handleMouseLeave", function(g) {
            m.throttleTriggeredAfterMouseMove.cancel();
            var A = {
              isTooltipActive: !1
            };
            m.setState(A), m.triggerSyncEvent(A);
            var _ = m.props.onMouseLeave;
            G(_) && _(A, g)
          }), X(m, "handleOuterEvent", function(g) {
            var A = ux(g),
              _ = He(m.props, "".concat(A));
            if (A && G(_)) {
              var S, E;
              /.*touch.*/i.test(A) ? E = m.getMouseInfo(g.changedTouches[0]) : E = m.getMouseInfo(g), _((S = E) !== null && S !== void 0 ? S : {}, g)
            }
          }), X(m, "handleClick", function(g) {
            var A = m.getMouseInfo(g);
            if (A) {
              var _ = M(M({}, A), {}, {
                isTooltipActive: !0
              });
              m.setState(_), m.triggerSyncEvent(_);
              var S = m.props.onClick;
              G(S) && S(_, g)
            }
          }), X(m, "handleMouseDown", function(g) {
            var A = m.props.onMouseDown;
            if (G(A)) {
              var _ = m.getMouseInfo(g);
              A(_, g)
            }
          }), X(m, "handleMouseUp", function(g) {
            var A = m.props.onMouseUp;
            if (G(A)) {
              var _ = m.getMouseInfo(g);
              A(_, g)
            }
          }), X(m, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && m.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), X(m, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && m.handleMouseDown(g.changedTouches[0])
          }), X(m, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && m.handleMouseUp(g.changedTouches[0])
          }), X(m, "handleDoubleClick", function(g) {
            var A = m.props.onDoubleClick;
            if (G(A)) {
              var _ = m.getMouseInfo(g);
              A(_, g)
            }
          }), X(m, "handleContextMenu", function(g) {
            var A = m.props.onContextMenu;
            if (G(A)) {
              var _ = m.getMouseInfo(g);
              A(_, g)
            }
          }), X(m, "triggerSyncEvent", function(g) {
            m.props.syncId !== void 0 && lu.emit(fu, m.props.syncId, g, m.eventEmitterSymbol)
          }), X(m, "applySyncEvent", function(g) {
            var A = m.props,
              _ = A.layout,
              S = A.syncMethod,
              E = m.state.updateId,
              T = g.dataStartIndex,
              $ = g.dataEndIndex;
            if (g.dataStartIndex !== void 0 || g.dataEndIndex !== void 0) m.setState(M({
              dataStartIndex: T,
              dataEndIndex: $
            }, h({
              props: m.props,
              dataStartIndex: T,
              dataEndIndex: $,
              updateId: E
            }, m.state)));
            else if (g.activeTooltipIndex !== void 0) {
              var I = g.chartX,
                C = g.chartY,
                j = g.activeTooltipIndex,
                k = m.state,
                D = k.offset,
                B = k.tooltipTicks;
              if (!D) return;
              if (typeof S == "function") j = S(B, g);
              else if (S === "value") {
                j = -1;
                for (var F = 0; F < B.length; F++)
                  if (B[F].value === g.activeLabel) {
                    j = F;
                    break
                  }
              }
              var H = M(M({}, D), {}, {
                  x: D.left,
                  y: D.top
                }),
                q = Math.min(I, H.x + H.width),
                W = Math.min(C, H.y + H.height),
                Y = B[j] && B[j].value,
                fe = Dc(m.state, m.props.data, j),
                me = B[j] ? {
                  x: _ === "horizontal" ? B[j].coordinate : q,
                  y: _ === "horizontal" ? W : B[j].coordinate
                } : mm;
              m.setState(M(M({}, g), {}, {
                activeLabel: Y,
                activeCoordinate: me,
                activePayload: fe,
                activeTooltipIndex: j
              }))
            } else m.setState(g)
          }), X(m, "renderCursor", function(g) {
            var A, _ = m.state,
              S = _.isTooltipActive,
              E = _.activeCoordinate,
              T = _.activePayload,
              $ = _.offset,
              I = _.activeTooltipIndex,
              C = _.tooltipAxisBandSize,
              j = m.getTooltipEventType(),
              k = (A = g.props.active) !== null && A !== void 0 ? A : S,
              D = m.props.layout,
              B = g.key || "_recharts-cursor";
            return P.createElement(Lz, {
              key: B,
              activeCoordinate: E,
              activePayload: T,
              activeTooltipIndex: I,
              chartName: r,
              element: g,
              isActive: k,
              layout: D,
              offset: $,
              tooltipAxisBandSize: C,
              tooltipEventType: j
            })
          }), X(m, "renderPolarAxis", function(g, A, _) {
            var S = He(g, "type.axisType"),
              E = He(m.state, "".concat(S, "Map")),
              T = g.type.defaultProps,
              $ = T !== void 0 ? M(M({}, T), g.props) : g.props,
              I = E && E[$["".concat(S, "Id")]];
            return L.cloneElement(g, M(M({}, I), {}, {
              className: Z(S, I.className),
              key: g.key || "".concat(A, "-").concat(_),
              ticks: wt(I, !0)
            }))
          }), X(m, "renderPolarGrid", function(g) {
            var A = g.props,
              _ = A.radialLines,
              S = A.polarAngles,
              E = A.polarRadius,
              T = m.state,
              $ = T.radiusAxisMap,
              I = T.angleAxisMap,
              C = Dt($),
              j = Dt(I),
              k = j.cx,
              D = j.cy,
              B = j.innerRadius,
              F = j.outerRadius;
            return L.cloneElement(g, {
              polarAngles: Array.isArray(S) ? S : wt(j, !0).map(function(H) {
                return H.coordinate
              }),
              polarRadius: Array.isArray(E) ? E : wt(C, !0).map(function(H) {
                return H.coordinate
              }),
              cx: k,
              cy: D,
              innerRadius: B,
              outerRadius: F,
              key: g.key || "polar-grid",
              radialLines: _
            })
          }), X(m, "renderLegend", function() {
            var g = m.state.formattedGraphicalItems,
              A = m.props,
              _ = A.children,
              S = A.width,
              E = A.height,
              T = m.props.margin || {},
              $ = S - (T.left || 0) - (T.right || 0),
              I = Gv({
                children: _,
                formattedGraphicalItems: g,
                legendWidth: $,
                legendContent: s
              });
            if (!I) return null;
            var C = I.item,
              j = $h(I, Rz);
            return L.cloneElement(C, M(M({}, j), {}, {
              chartWidth: S,
              chartHeight: E,
              margin: T,
              onBBoxUpdate: m.handleLegendBBoxUpdate
            }))
          }), X(m, "renderTooltip", function() {
            var g, A = m.props,
              _ = A.children,
              S = A.accessibilityLayer,
              E = Ue(_, yt);
            if (!E) return null;
            var T = m.state,
              $ = T.isTooltipActive,
              I = T.activeCoordinate,
              C = T.activePayload,
              j = T.activeLabel,
              k = T.offset,
              D = (g = E.props.active) !== null && g !== void 0 ? g : $;
            return L.cloneElement(E, {
              viewBox: M(M({}, k), {}, {
                x: k.left,
                y: k.top
              }),
              active: D,
              label: j,
              payload: D ? C : [],
              coordinate: I,
              accessibilityLayer: S
            })
          }), X(m, "renderBrush", function(g) {
            var A = m.props,
              _ = A.margin,
              S = A.data,
              E = m.state,
              T = E.offset,
              $ = E.dataStartIndex,
              I = E.dataEndIndex,
              C = E.updateId;
            return L.cloneElement(g, {
              key: g.key || "_recharts-brush",
              onChange: Hi(m.handleBrushChange, g.props.onChange),
              data: S,
              x: R(g.props.x) ? g.props.x : T.left,
              y: R(g.props.y) ? g.props.y : T.top + T.height + T.brushBottom - (_.bottom || 0),
              width: R(g.props.width) ? g.props.width : T.width,
              startIndex: $,
              endIndex: I,
              updateId: "brush-".concat(C)
            })
          }), X(m, "renderReferenceElement", function(g, A, _) {
            if (!g) return null;
            var S = m,
              E = S.clipPathId,
              T = m.state,
              $ = T.xAxisMap,
              I = T.yAxisMap,
              C = T.offset,
              j = g.type.defaultProps || {},
              k = g.props,
              D = k.xAxisId,
              B = D === void 0 ? j.xAxisId : D,
              F = k.yAxisId,
              H = F === void 0 ? j.yAxisId : F;
            return L.cloneElement(g, {
              key: g.key || "".concat(A, "-").concat(_),
              xAxis: $[B],
              yAxis: I[H],
              viewBox: {
                x: C.left,
                y: C.top,
                width: C.width,
                height: C.height
              },
              clipPathId: E
            })
          }), X(m, "renderActivePoints", function(g) {
            var A = g.item,
              _ = g.activePoint,
              S = g.basePoint,
              E = g.childIndex,
              T = g.isRange,
              $ = [],
              I = A.props.key,
              C = A.item.type.defaultProps !== void 0 ? M(M({}, A.item.type.defaultProps), A.item.props) : A.item.props,
              j = C.activeDot,
              k = C.dataKey,
              D = M(M({
                index: E,
                dataKey: k,
                cx: _.x,
                cy: _.y,
                r: 4,
                fill: Ts(A.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: _.payload,
                value: _.value
              }, U(j, !1)), Ji(j));
            return $.push(b.renderActiveDot(j, D, "".concat(I, "-activePoint-").concat(E))), S ? $.push(b.renderActiveDot(j, M(M({}, D), {}, {
              cx: S.x,
              cy: S.y
            }), "".concat(I, "-basePoint-").concat(E))) : T && $.push(null), $
          }), X(m, "renderGraphicChild", function(g, A, _) {
            var S = m.filterFormatItem(g, A, _);
            if (!S) return null;
            var E = m.getTooltipEventType(),
              T = m.state,
              $ = T.isTooltipActive,
              I = T.tooltipAxis,
              C = T.activeTooltipIndex,
              j = T.activeLabel,
              k = m.props.children,
              D = Ue(k, yt),
              B = S.props,
              F = B.points,
              H = B.isRange,
              q = B.baseLine,
              W = S.item.type.defaultProps !== void 0 ? M(M({}, S.item.type.defaultProps), S.item.props) : S.item.props,
              Y = W.activeDot,
              fe = W.hide,
              me = W.activeBar,
              Fe = W.activeShape,
              Vt = !!(!fe && $ && D && (Y || me || Fe)),
              Ne = {};
            E !== "axis" && D && D.props.trigger === "click" ? Ne = {
              onClick: Hi(m.handleItemMouseEnter, g.props.onClick)
            } : E !== "axis" && (Ne = {
              onMouseLeave: Hi(m.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Hi(m.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var z = L.cloneElement(g, M(M({}, S.props), Ne));

            function Q(qt) {
              return typeof I.dataKey == "function" ? I.dataKey(qt.payload) : null
            }
            if (Vt)
              if (C >= 0) {
                var ee, N;
                if (I.dataKey && !I.allowDuplicatedCategory) {
                  var ve = typeof I.dataKey == "function" ? Q : "payload.".concat(I.dataKey.toString());
                  ee = Zi(F, ve, j), N = H && q && Zi(q, ve, j)
                } else ee = F?.[C], N = H && q && q[C];
                if (Fe || me) {
                  var te = g.props.activeIndex !== void 0 ? g.props.activeIndex : C;
                  return [L.cloneElement(g, M(M(M({}, S.props), Ne), {}, {
                    activeIndex: te
                  })), null, null]
                }
                if (!V(ee)) return [z].concat(sn(m.renderActivePoints({
                  item: S,
                  activePoint: ee,
                  basePoint: N,
                  childIndex: C,
                  isRange: H
                })))
              } else {
                var xe, we = (xe = m.getItemByXY(m.state.activeCoordinate)) !== null && xe !== void 0 ? xe : {
                    graphicalItem: z
                  },
                  Le = we.graphicalItem,
                  Ct = Le.item,
                  xr = Ct === void 0 ? g : Ct,
                  Di = Le.childIndex,
                  Xt = M(M(M({}, S.props), Ne), {}, {
                    activeIndex: Di
                  });
                return [L.cloneElement(xr, Xt), null, null]
              } return H ? [z, null, null] : [z, null]
          }), X(m, "renderCustomized", function(g, A, _) {
            return L.cloneElement(g, M(M({
              key: "recharts-customized-".concat(_)
            }, m.props), m.state))
          }), X(m, "renderMap", {
            CartesianGrid: {
              handler: qi,
              once: !0
            },
            ReferenceArea: {
              handler: m.renderReferenceElement
            },
            ReferenceLine: {
              handler: qi
            },
            ReferenceDot: {
              handler: m.renderReferenceElement
            },
            XAxis: {
              handler: qi
            },
            YAxis: {
              handler: qi
            },
            Brush: {
              handler: m.renderBrush,
              once: !0
            },
            Bar: {
              handler: m.renderGraphicChild
            },
            Line: {
              handler: m.renderGraphicChild
            },
            Area: {
              handler: m.renderGraphicChild
            },
            Radar: {
              handler: m.renderGraphicChild
            },
            RadialBar: {
              handler: m.renderGraphicChild
            },
            Scatter: {
              handler: m.renderGraphicChild
            },
            Pie: {
              handler: m.renderGraphicChild
            },
            Funnel: {
              handler: m.renderGraphicChild
            },
            Tooltip: {
              handler: m.renderCursor,
              once: !0
            },
            PolarGrid: {
              handler: m.renderPolarGrid,
              once: !0
            },
            PolarAngleAxis: {
              handler: m.renderPolarAxis
            },
            PolarRadiusAxis: {
              handler: m.renderPolarAxis
            },
            Customized: {
              handler: m.renderCustomized
            }
          }), m.clipPathId = "".concat((w = x.id) !== null && w !== void 0 ? w : Ut("recharts"), "-clip"), m.throttleTriggeredAfterMouseMove = Gd(m.triggeredAfterMouseMove, (O = x.throttleDelay) !== null && O !== void 0 ? O : 1e3 / 60), m.state = {}, m
        }
        return Yz(b, y), Gz(b, [{
          key: "componentDidMount",
          value: function() {
            var w, O;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
                top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0
              },
              coordinateList: this.state.tooltipTicks,
              mouseHandlerCallback: this.triggeredAfterMouseMove,
              layout: this.props.layout
            }), this.displayDefaultTooltip()
          }
        }, {
          key: "displayDefaultTooltip",
          value: function() {
            var w = this.props,
              O = w.children,
              m = w.data,
              g = w.height,
              A = w.layout,
              _ = Ue(O, yt);
            if (_) {
              var S = _.props.defaultIndex;
              if (!(typeof S != "number" || S < 0 || S > this.state.tooltipTicks.length - 1)) {
                var E = this.state.tooltipTicks[S] && this.state.tooltipTicks[S].value,
                  T = Dc(this.state, m, S, E),
                  $ = this.state.tooltipTicks[S].coordinate,
                  I = (this.state.offset.top + g) / 2,
                  C = A === "horizontal",
                  j = C ? {
                    x: $,
                    y: I
                  } : {
                    y: $,
                    x: I
                  },
                  k = this.state.formattedGraphicalItems.find(function(B) {
                    var F = B.item;
                    return F.type.name === "Scatter"
                  });
                k && (j = M(M({}, j), k.props.points[S].tooltipPosition), T = k.props.points[S].tooltipPayload);
                var D = {
                  activeTooltipIndex: S,
                  isTooltipActive: !0,
                  activeLabel: E,
                  activePayload: T,
                  activeCoordinate: j
                };
                this.setState(D), this.renderCursor(_), this.accessibilityManager.setIndex(S)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(w, O) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== O.tooltipTicks && this.accessibilityManager.setDetails({
                coordinateList: this.state.tooltipTicks
              }), this.props.layout !== w.layout && this.accessibilityManager.setDetails({
                layout: this.props.layout
              }), this.props.margin !== w.margin) {
              var m, g;
              this.accessibilityManager.setDetails({
                offset: {
                  left: (m = this.props.margin.left) !== null && m !== void 0 ? m : 0,
                  top: (g = this.props.margin.top) !== null && g !== void 0 ? g : 0
                }
              })
            }
            return null
          }
        }, {
          key: "componentDidUpdate",
          value: function(w) {
            vu([Ue(w.children, yt)], [Ue(this.props.children, yt)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var w = Ue(this.props.children, yt);
            if (w && typeof w.props.shared == "boolean") {
              var O = w.props.shared ? "axis" : "item";
              return u.indexOf(O) >= 0 ? O : a
            }
            return a
          }
        }, {
          key: "getMouseInfo",
          value: function(w) {
            if (!this.container) return null;
            var O = this.container,
              m = O.getBoundingClientRect(),
              g = kE(m),
              A = {
                chartX: Math.round(w.pageX - g.left),
                chartY: Math.round(w.pageY - g.top)
              },
              _ = m.width / O.offsetWidth || 1,
              S = this.inRange(A.chartX, A.chartY, _);
            if (!S) return null;
            var E = this.state,
              T = E.xAxisMap,
              $ = E.yAxisMap,
              I = this.getTooltipEventType(),
              C = Eh(this.state, this.props.data, this.props.layout, S);
            if (I !== "axis" && T && $) {
              var j = Dt(T).scale,
                k = Dt($).scale,
                D = j && j.invert ? j.invert(A.chartX) : null,
                B = k && k.invert ? k.invert(A.chartY) : null;
              return M(M({}, A), {}, {
                xValue: D,
                yValue: B
              }, C)
            }
            return C ? M(M({}, A), C) : null
          }
        }, {
          key: "inRange",
          value: function(w, O) {
            var m = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              g = this.props.layout,
              A = w / m,
              _ = O / m;
            if (g === "horizontal" || g === "vertical") {
              var S = this.state.offset,
                E = A >= S.left && A <= S.left + S.width && _ >= S.top && _ <= S.top + S.height;
              return E ? {
                x: A,
                y: _
              } : null
            }
            var T = this.state,
              $ = T.angleAxisMap,
              I = T.radiusAxisMap;
            if ($ && I) {
              var C = Dt($);
              return fp({
                x: A,
                y: _
              }, C)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var w = this.props.children,
              O = this.getTooltipEventType(),
              m = Ue(w, yt),
              g = {};
            m && O === "axis" && (m.props.trigger === "click" ? g = {
              onClick: this.handleClick
            } : g = {
              onMouseEnter: this.handleMouseEnter,
              onDoubleClick: this.handleDoubleClick,
              onMouseMove: this.handleMouseMove,
              onMouseLeave: this.handleMouseLeave,
              onTouchMove: this.handleTouchMove,
              onTouchStart: this.handleTouchStart,
              onTouchEnd: this.handleTouchEnd,
              onContextMenu: this.handleContextMenu
            });
            var A = Ji(this.props, this.handleOuterEvent);
            return M(M({}, A), g)
          }
        }, {
          key: "addListener",
          value: function() {
            lu.on(fu, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            lu.removeListener(fu, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(w, O, m) {
            for (var g = this.state.formattedGraphicalItems, A = 0, _ = g.length; A < _; A++) {
              var S = g[A];
              if (S.item === w || S.props.key === w.key || O === Ot(S.item.type) && m === S.childIndex) return S
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var w = this.clipPathId,
              O = this.state.offset,
              m = O.left,
              g = O.top,
              A = O.height,
              _ = O.width;
            return P.createElement("defs", null, P.createElement("clipPath", {
              id: w
            }, P.createElement("rect", {
              x: m,
              y: g,
              height: A,
              width: _
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var w = this.state.xAxisMap;
            return w ? Object.entries(w).reduce(function(O, m) {
              var g = Sh(m, 2),
                A = g[0],
                _ = g[1];
              return M(M({}, O), {}, X({}, A, _.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var w = this.state.yAxisMap;
            return w ? Object.entries(w).reduce(function(O, m) {
              var g = Sh(m, 2),
                A = g[0],
                _ = g[1];
              return M(M({}, O), {}, X({}, A, _.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(w) {
            var O;
            return (O = this.state.xAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(w) {
            var O;
            return (O = this.state.yAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale
          }
        }, {
          key: "getItemByXY",
          value: function(w) {
            var O = this.state,
              m = O.formattedGraphicalItems,
              g = O.activeItem;
            if (m && m.length)
              for (var A = 0, _ = m.length; A < _; A++) {
                var S = m[A],
                  E = S.props,
                  T = S.item,
                  $ = T.type.defaultProps !== void 0 ? M(M({}, T.type.defaultProps), T.props) : T.props,
                  I = Ot(T.type);
                if (I === "Bar") {
                  var C = (E.data || []).find(function(B) {
                    return k2(w, B)
                  });
                  if (C) return {
                    graphicalItem: S,
                    payload: C
                  }
                } else if (I === "RadialBar") {
                  var j = (E.data || []).find(function(B) {
                    return fp(w, B)
                  });
                  if (j) return {
                    graphicalItem: S,
                    payload: j
                  }
                } else if (To(S, g) || Eo(S, g) || yi(S, g)) {
                  var k = IN({
                      graphicalItem: S,
                      activeTooltipItem: g,
                      itemData: $.data
                    }),
                    D = $.activeIndex === void 0 ? k : $.activeIndex;
                  return {
                    graphicalItem: M(M({}, S), {}, {
                      childIndex: D
                    }),
                    payload: yi(S, g) ? $.data[k] : S.props.data[k]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var w = this;
            if (!tl(this)) return null;
            var O = this.props,
              m = O.children,
              g = O.className,
              A = O.width,
              _ = O.height,
              S = O.style,
              E = O.compact,
              T = O.title,
              $ = O.desc,
              I = $h(O, Bz),
              C = U(I, !1);
            if (E) return P.createElement(ih, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, P.createElement(mu, Er({}, C, {
              width: A,
              height: _,
              title: T,
              desc: $
            }), this.renderClipPath(), nl(m, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var j, k;
              C.tabIndex = (j = this.props.tabIndex) !== null && j !== void 0 ? j : 0, C.role = (k = this.props.role) !== null && k !== void 0 ? k : "application", C.onKeyDown = function(B) {
                w.accessibilityManager.keyboardEvent(B)
              }, C.onFocus = function() {
                w.accessibilityManager.focus()
              }
            }
            var D = this.parseEventsOfWrapper();
            return P.createElement(ih, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, P.createElement("div", Er({
              className: Z("recharts-wrapper", g),
              style: M({
                position: "relative",
                cursor: "default",
                width: A,
                height: _
              }, S)
            }, D, {
              ref: function(F) {
                w.container = F
              }
            }), P.createElement(mu, Er({}, C, {
              width: A,
              height: _,
              title: T,
              desc: $,
              style: r3
            }), this.renderClipPath(), nl(m, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }(L.Component);
    X(v, "displayName", r), X(v, "defaultProps", M({
      layout: "horizontal",
      stackOffset: "none",
      barCategoryGap: "10%",
      barGap: 4,
      margin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      reverseStackOrder: !1,
      syncMethod: "index"
    }, l)), X(v, "getDerivedStateFromProps", function(y, b) {
      var x = y.dataKey,
        w = y.data,
        O = y.children,
        m = y.width,
        g = y.height,
        A = y.layout,
        _ = y.stackOffset,
        S = y.margin,
        E = b.dataStartIndex,
        T = b.dataEndIndex;
      if (b.updateId === void 0) {
        var $ = jh(y);
        return M(M(M({}, $), {}, {
          updateId: 0
        }, h(M(M({
          props: y
        }, $), {}, {
          updateId: 0
        }), b)), {}, {
          prevDataKey: x,
          prevData: w,
          prevWidth: m,
          prevHeight: g,
          prevLayout: A,
          prevStackOffset: _,
          prevMargin: S,
          prevChildren: O
        })
      }
      if (x !== b.prevDataKey || w !== b.prevData || m !== b.prevWidth || g !== b.prevHeight || A !== b.prevLayout || _ !== b.prevStackOffset || !jr(S, b.prevMargin)) {
        var I = jh(y),
          C = {
            chartX: b.chartX,
            chartY: b.chartY,
            isTooltipActive: b.isTooltipActive
          },
          j = M(M({}, Eh(b, w, A)), {}, {
            updateId: b.updateId + 1
          }),
          k = M(M(M({}, I), C), j);
        return M(M(M({}, k), h(M({
          props: y
        }, k), b)), {}, {
          prevDataKey: x,
          prevData: w,
          prevWidth: m,
          prevHeight: g,
          prevLayout: A,
          prevStackOffset: _,
          prevMargin: S,
          prevChildren: O
        })
      }
      if (!vu(O, b.prevChildren)) {
        var D, B, F, H, q = Ue(O, qr),
          W = q && (D = (B = q.props) === null || B === void 0 ? void 0 : B.startIndex) !== null && D !== void 0 ? D : E,
          Y = q && (F = (H = q.props) === null || H === void 0 ? void 0 : H.endIndex) !== null && F !== void 0 ? F : T,
          fe = W !== E || Y !== T,
          me = !V(w),
          Fe = me && !fe ? b.updateId : b.updateId + 1;
        return M(M({
          updateId: Fe
        }, h(M(M({
          props: y
        }, b), {}, {
          updateId: Fe,
          dataStartIndex: W,
          dataEndIndex: Y
        }), b)), {}, {
          prevChildren: O,
          dataStartIndex: W,
          dataEndIndex: Y
        })
      }
      return null
    }), X(v, "renderActiveDot", function(y, b, x) {
      var w;
      return L.isValidElement(y) ? w = L.cloneElement(y, b) : G(y) ? w = y(b) : w = P.createElement(An, b), P.createElement(J, {
        className: "recharts-active-dot",
        key: x
      }, w)
    });
    var d = L.forwardRef(function(b, x) {
      return P.createElement(v, Er({}, b, {
        ref: x
      }))
    });
    return d.displayName = v.displayName, d
  },
  d3 = ki({
    chartName: "LineChart",
    GraphicalChild: Mi,
    axisComponents: [{
      axisType: "xAxis",
      AxisComp: Ci
    }, {
      axisType: "yAxis",
      AxisComp: Ii
    }],
    formatAxisMap: js
  }),
  v3 = ki({
    chartName: "BarChart",
    GraphicalChild: gr,
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: ["axis", "item"],
    axisComponents: [{
      axisType: "xAxis",
      AxisComp: Ci
    }, {
      axisType: "yAxis",
      AxisComp: Ii
    }],
    formatAxisMap: js
  }),
  y3 = ki({
    chartName: "PieChart",
    GraphicalChild: Gt,
    validateTooltipEventTypes: ["item"],
    defaultTooltipEventType: "item",
    legendContent: "children",
    axisComponents: [{
      axisType: "angleAxis",
      AxisComp: ji
    }, {
      axisType: "radiusAxis",
      AxisComp: Ei
    }],
    formatAxisMap: iy,
    defaultProps: {
      layout: "centric",
      startAngle: 0,
      endAngle: 360,
      cx: "50%",
      cy: "50%",
      innerRadius: 0,
      outerRadius: "80%"
    }
  }),
  m3 = ki({
    chartName: "RadarChart",
    GraphicalChild: jo,
    axisComponents: [{
      axisType: "angleAxis",
      AxisComp: ji
    }, {
      axisType: "radiusAxis",
      AxisComp: Ei
    }],
    formatAxisMap: iy,
    defaultProps: {
      layout: "centric",
      startAngle: 90,
      endAngle: -270,
      cx: "50%",
      cy: "50%",
      innerRadius: 0,
      outerRadius: "80%"
    }
  }),
  g3 = ki({
    chartName: "ComposedChart",
    GraphicalChild: [Mi, br, gr, Lo],
    axisComponents: [{
      axisType: "xAxis",
      AxisComp: Ci
    }, {
      axisType: "yAxis",
      AxisComp: Ii
    }, {
      axisType: "zAxis",
      AxisComp: No
    }],
    formatAxisMap: js
  });
export {
  br as A, gr as B, g3 as C, Mr as L, y3 as P, h3 as R, yt as T, Ci as X, Ii as Y, pF as a, Mi as b, v3 as c, Ls as d, vo as e, Gt as f, d3 as g, m3 as h, fD as i, ji as j, Ei as k, jo as l
};