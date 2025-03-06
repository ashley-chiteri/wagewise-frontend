import Tt, { app as Gt, BrowserWindow as Ks, dialog as Bi } from "electron";
import Js from "events";
import Dr from "crypto";
import Qs from "tty";
import no from "util";
import Dn from "os";
import Je from "fs";
import Fr from "stream";
import Kt from "url";
import hf from "string_decoder";
import pf from "constants";
import Zs from "assert";
import ie from "path";
import Fn from "child_process";
import el from "zlib";
import mf from "http";
import Ht from "node:path";
import { fileURLToPath as gf } from "node:url";
var ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, di = {}, de = {}, lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.CancellationError = lt.CancellationToken = void 0;
const Ef = Js;
class yf extends Ef.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Hi());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Hi());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
lt.CancellationToken = yf;
class Hi extends Error {
  constructor() {
    super("cancelled");
  }
}
lt.CancellationError = Hi;
var Se = {}, ji = { exports: {} }, rn = { exports: {} }, hi, ta;
function vf() {
  if (ta) return hi;
  ta = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  hi = function(c, u) {
    u = u || {};
    var d = typeof c;
    if (d === "string" && c.length > 0)
      return a(c);
    if (d === "number" && isFinite(c))
      return u.long ? l(c) : s(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (u) {
        var d = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * o;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(c) {
    var u = Math.abs(c);
    return u >= n ? Math.round(c / n) + "d" : u >= r ? Math.round(c / r) + "h" : u >= t ? Math.round(c / t) + "m" : u >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var u = Math.abs(c);
    return u >= n ? E(c, u, n, "day") : u >= r ? E(c, u, r, "hour") : u >= t ? E(c, u, t, "minute") : u >= e ? E(c, u, e, "second") : c + " ms";
  }
  function E(c, u, d, h) {
    var w = u >= d * 1.5;
    return Math.round(c / d) + " " + h + (w ? "s" : "");
  }
  return hi;
}
var pi, ra;
function tl() {
  if (ra) return pi;
  ra = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = E, n.disable = s, n.enable = o, n.enabled = l, n.humanize = vf(), n.destroy = c, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let d = 0;
      for (let h = 0; h < u.length; h++)
        d = (d << 5) - d + u.charCodeAt(h), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let d, h = null, w, y;
      function A(...S) {
        if (!A.enabled)
          return;
        const $ = A, U = Number(/* @__PURE__ */ new Date()), x = U - (d || U);
        $.diff = x, $.prev = d, $.curr = U, d = U, S[0] = n.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let G = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (I, F) => {
          if (I === "%%")
            return "%";
          G++;
          const g = n.formatters[F];
          if (typeof g == "function") {
            const M = S[G];
            I = g.call($, M), S.splice(G, 1), G--;
          }
          return I;
        }), n.formatArgs.call($, S), ($.log || n.log).apply($, S);
      }
      return A.namespace = u, A.useColors = n.useColors(), A.color = n.selectColor(u), A.extend = i, A.destroy = n.destroy, Object.defineProperty(A, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (w !== n.namespaces && (w = n.namespaces, y = n.enabled(u)), y),
        set: (S) => {
          h = S;
        }
      }), typeof n.init == "function" && n.init(A), A;
    }
    function i(u, d) {
      const h = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return h.log = this.log, h;
    }
    function o(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const h of d)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(u, d) {
      let h = 0, w = 0, y = -1, A = 0;
      for (; h < u.length; )
        if (w < d.length && (d[w] === u[h] || d[w] === "*"))
          d[w] === "*" ? (y = w, A = h, w++) : (h++, w++);
        else if (y !== -1)
          w = y + 1, A++, h = A;
        else
          return !1;
      for (; w < d.length && d[w] === "*"; )
        w++;
      return w === d.length;
    }
    function s() {
      const u = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), u;
    }
    function l(u) {
      for (const d of n.skips)
        if (a(u, d))
          return !1;
      for (const d of n.names)
        if (a(u, d))
          return !0;
      return !1;
    }
    function E(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return pi = e, pi;
}
var na;
function wf() {
  return na || (na = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const E = "color: " + this.color;
      l.splice(1, 0, E, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (c++, d === "%c" && (u = c));
      }), l.splice(u, 0, E);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = tl()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (E) {
        return "[UnexpectedJSONParseError]: " + E.message;
      }
    };
  }(rn, rn.exports)), rn.exports;
}
var nn = { exports: {} }, mi, ia;
function _f() {
  return ia || (ia = 1, mi = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), mi;
}
var gi, oa;
function Af() {
  if (oa) return gi;
  oa = 1;
  const e = Dn, t = Qs, r = _f(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, E) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !E && i === void 0)
      return 0;
    const c = i || 0;
    if (n.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : c;
  }
  function s(l) {
    const E = a(l, l && l.isTTY);
    return o(E);
  }
  return gi = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, gi;
}
var aa;
function Sf() {
  return aa || (aa = 1, function(e, t) {
    const r = Qs, n = no;
    t.init = c, t.log = s, t.formatArgs = o, t.save = l, t.load = E, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = Af();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, h) => {
      const w = h.substring(6).toLowerCase().replace(/_([a-z])/g, (A, S) => S.toUpperCase());
      let y = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), d[w] = y, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: h, useColors: w } = this;
      if (w) {
        const y = this.color, A = "\x1B[3" + (y < 8 ? y : "8;5;" + y), S = `  ${A};1m${h} \x1B[0m`;
        d[0] = S + d[0].split(`
`).join(`
` + S), d.push(A + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = a() + h + " " + d[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function l(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function E() {
      return process.env.DEBUG;
    }
    function c(d) {
      d.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let w = 0; w < h.length; w++)
        d.inspectOpts[h[w]] = t.inspectOpts[h[w]];
    }
    e.exports = tl()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(nn, nn.exports)), nn.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ji.exports = wf() : ji.exports = Sf();
var Tf = ji.exports, Jt = {};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.newError = Cf;
function Cf(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.ProgressCallbackTransform = void 0;
const bf = Fr;
class $f extends bf.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
xr.ProgressCallbackTransform = $f;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.DigestTransform = Se.HttpExecutor = Se.HttpError = void 0;
Se.createHttpError = qi;
Se.parseJson = xf;
Se.configureRequestOptionsFromUrl = nl;
Se.configureRequestUrl = oo;
Se.safeGetHeader = jt;
Se.configureRequestOptions = An;
Se.safeStringifyJson = Sn;
const Of = Dr, If = Tf, Rf = Je, Nf = Fr, rl = Kt, Pf = lt, sa = Jt, Df = xr, sr = (0, If.default)("electron-builder");
function qi(e, t = null) {
  return new io(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Sn(e.headers), t);
}
const Ff = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class io extends Error {
  constructor(t, r = `HTTP error: ${Ff.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Se.HttpError = io;
function xf(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class _n {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Pf.CancellationToken(), n) {
    An(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      sr(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return sr.enabled && sr(`Request: ${Sn(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (E) => {
        try {
          this.handleResponse(E, t, r, o, a, i, n);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (E) => {
        this.doApiRequest(E, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var l;
    if (sr.enabled && sr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Sn(r)}`), t.statusCode === 404) {
      o(qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const E = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = E >= 300 && E < 400, u = jt(t, "location");
    if (c && u != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(_n.prepareRedirectUrlOptions(u, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (h) => d += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = jt(t, "content-type"), w = h != null && (Array.isArray(h) ? h.find((y) => y.includes("json")) != null : h.includes("json"));
          o(qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${w ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (h) {
        o(h);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      oo(t, s), An(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, E) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              E(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(u);
          }), l.on("end", () => {
            E(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = jt(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(_n.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Uf(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = nl(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new rl.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof io && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Se.HttpExecutor = _n;
function nl(e, t) {
  const r = An(t);
  return oo(new rl.URL(e), r), r;
}
function oo(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Gi extends Nf.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Of.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, sa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, sa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Se.DigestTransform = Gi;
function Lf(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function jt(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Uf(e, t) {
  if (!Lf(jt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = jt(t, "content-length");
    a != null && r.push(new Df.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Gi(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Gi(e.options.sha2, "sha256", "hex"));
  const i = (0, Rf.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function An(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Sn(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.githubUrl = kf;
xn.getS3LikeProviderBaseUrl = Mf;
function kf(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Mf(e) {
  const t = e.provider;
  if (t === "s3")
    return Bf(e);
  if (t === "spaces")
    return Hf(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Bf(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return il(t, e.path);
}
function il(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Hf(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return il(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.parseDn = jf;
function jf(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var Wt = {};
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.nil = Wt.UUID = void 0;
const ol = Dr, al = Jt, qf = "options.name must be either a string or a Buffer", la = (0, ol.randomBytes)(16);
la[0] = la[0] | 1;
const En = {}, J = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  En[t] = e, J[e] = t;
}
class Ct {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Ct.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Gf(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Wf(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (En[t[14] + t[15]] & 240) >> 4,
        variant: ca((En[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: ca((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, al.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = En[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Wt.UUID = Ct;
Ct.OID = Ct.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function ca(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var wr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(wr || (wr = {}));
function Gf(e, t, r, n, i = wr.ASCII) {
  const o = (0, ol.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, al.newError)(qf, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case wr.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case wr.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new Ct(s);
      break;
    default:
      l = J[s[0]] + J[s[1]] + J[s[2]] + J[s[3]] + "-" + J[s[4]] + J[s[5]] + "-" + J[s[6] & 15 | r] + J[s[7]] + "-" + J[s[8] & 63 | 128] + J[s[9]] + "-" + J[s[10]] + J[s[11]] + J[s[12]] + J[s[13]] + J[s[14]] + J[s[15]];
      break;
  }
  return l;
}
function Wf(e) {
  return J[e[0]] + J[e[1]] + J[e[2]] + J[e[3]] + "-" + J[e[4]] + J[e[5]] + "-" + J[e[6]] + J[e[7]] + "-" + J[e[8]] + J[e[9]] + "-" + J[e[10]] + J[e[11]] + J[e[12]] + J[e[13]] + J[e[14]] + J[e[15]];
}
Wt.nil = new Ct("00000000-0000-0000-0000-000000000000");
var Lr = {}, sl = {};
(function(e) {
  (function(t) {
    t.parser = function(p, f) {
      return new n(p, f);
    }, t.SAXParser = n, t.SAXStream = c, t.createStream = E, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(p, f) {
      if (!(this instanceof n))
        return new n(p, f);
      var O = this;
      o(O), O.q = O.c = "", O.bufferCheckPosition = t.MAX_BUFFER_LENGTH, O.opt = f || {}, O.opt.lowercase = O.opt.lowercase || O.opt.lowercasetags, O.looseCase = O.opt.lowercase ? "toLowerCase" : "toUpperCase", O.tags = [], O.closed = O.closedRoot = O.sawRoot = !1, O.tag = O.error = null, O.strict = !!p, O.noscript = !!(p || O.opt.noscript), O.state = g.BEGIN, O.strictEntities = O.opt.strictEntities, O.ENTITIES = O.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), O.attribList = [], O.opt.xmlns && (O.ns = Object.create(y)), O.opt.unquotedAttributeValues === void 0 && (O.opt.unquotedAttributeValues = !p), O.trackPosition = O.opt.position !== !1, O.trackPosition && (O.position = O.line = O.column = 0), B(O, "onready");
    }
    Object.create || (Object.create = function(p) {
      function f() {
      }
      f.prototype = p;
      var O = new f();
      return O;
    }), Object.keys || (Object.keys = function(p) {
      var f = [];
      for (var O in p) p.hasOwnProperty(O) && f.push(O);
      return f;
    });
    function i(p) {
      for (var f = Math.max(t.MAX_BUFFER_LENGTH, 10), O = 0, _ = 0, Q = r.length; _ < Q; _++) {
        var te = p[r[_]].length;
        if (te > f)
          switch (r[_]) {
            case "textNode":
              Y(p);
              break;
            case "cdata":
              j(p, "oncdata", p.cdata), p.cdata = "";
              break;
            case "script":
              j(p, "onscript", p.script), p.script = "";
              break;
            default:
              C(p, "Max buffer length exceeded: " + r[_]);
          }
        O = Math.max(O, te);
      }
      var oe = t.MAX_BUFFER_LENGTH - O;
      p.bufferCheckPosition = oe + p.position;
    }
    function o(p) {
      for (var f = 0, O = r.length; f < O; f++)
        p[r[f]] = "";
    }
    function a(p) {
      Y(p), p.cdata !== "" && (j(p, "oncdata", p.cdata), p.cdata = ""), p.script !== "" && (j(p, "onscript", p.script), p.script = "");
    }
    n.prototype = {
      end: function() {
        P(this);
      },
      write: je,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(p) {
      return p !== "error" && p !== "end";
    });
    function E(p, f) {
      return new c(p, f);
    }
    function c(p, f) {
      if (!(this instanceof c))
        return new c(p, f);
      s.apply(this), this._parser = new n(p, f), this.writable = !0, this.readable = !0;
      var O = this;
      this._parser.onend = function() {
        O.emit("end");
      }, this._parser.onerror = function(_) {
        O.emit("error", _), O._parser.error = null;
      }, this._decoder = null, l.forEach(function(_) {
        Object.defineProperty(O, "on" + _, {
          get: function() {
            return O._parser["on" + _];
          },
          set: function(Q) {
            if (!Q)
              return O.removeAllListeners(_), O._parser["on" + _] = Q, Q;
            O.on(_, Q);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(s.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(p) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(p)) {
        if (!this._decoder) {
          var f = hf.StringDecoder;
          this._decoder = new f("utf8");
        }
        p = this._decoder.write(p);
      }
      return this._parser.write(p.toString()), this.emit("data", p), !0;
    }, c.prototype.end = function(p) {
      return p && p.length && this.write(p), this._parser.end(), !0;
    }, c.prototype.on = function(p, f) {
      var O = this;
      return !O._parser["on" + p] && l.indexOf(p) !== -1 && (O._parser["on" + p] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, p), O.emit.apply(O, _);
      }), s.prototype.on.call(O, p, f);
    };
    var u = "[CDATA[", d = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", w = "http://www.w3.org/2000/xmlns/", y = { xml: h, xmlns: w }, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, $ = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, U = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function x(p) {
      return p === " " || p === `
` || p === "\r" || p === "	";
    }
    function G(p) {
      return p === '"' || p === "'";
    }
    function T(p) {
      return p === ">" || x(p);
    }
    function I(p, f) {
      return p.test(f);
    }
    function F(p, f) {
      return !I(p, f);
    }
    var g = 0;
    t.STATE = {
      BEGIN: g++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: g++,
      // leading whitespace
      TEXT: g++,
      // general stuff
      TEXT_ENTITY: g++,
      // &amp and such.
      OPEN_WAKA: g++,
      // <
      SGML_DECL: g++,
      // <!BLARG
      SGML_DECL_QUOTED: g++,
      // <!BLARG foo "bar
      DOCTYPE: g++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: g++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: g++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: g++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: g++,
      // <!-
      COMMENT: g++,
      // <!--
      COMMENT_ENDING: g++,
      // <!-- blah -
      COMMENT_ENDED: g++,
      // <!-- blah --
      CDATA: g++,
      // <![CDATA[ something
      CDATA_ENDING: g++,
      // ]
      CDATA_ENDING_2: g++,
      // ]]
      PROC_INST: g++,
      // <?hi
      PROC_INST_BODY: g++,
      // <?hi there
      PROC_INST_ENDING: g++,
      // <?hi "there" ?
      OPEN_TAG: g++,
      // <strong
      OPEN_TAG_SLASH: g++,
      // <strong /
      ATTRIB: g++,
      // <a
      ATTRIB_NAME: g++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: g++,
      // <a foo _
      ATTRIB_VALUE: g++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: g++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: g++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: g++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: g++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: g++,
      // <foo bar=&quot
      CLOSE_TAG: g++,
      // </a
      CLOSE_TAG_SAW_WHITE: g++,
      // </a   >
      SCRIPT: g++,
      // <script> ...
      SCRIPT_ENDING: g++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(p) {
      var f = t.ENTITIES[p], O = typeof f == "number" ? String.fromCharCode(f) : f;
      t.ENTITIES[p] = O;
    });
    for (var M in t.STATE)
      t.STATE[t.STATE[M]] = M;
    g = t.STATE;
    function B(p, f, O) {
      p[f] && p[f](O);
    }
    function j(p, f, O) {
      p.textNode && Y(p), B(p, f, O);
    }
    function Y(p) {
      p.textNode = N(p.opt, p.textNode), p.textNode && B(p, "ontext", p.textNode), p.textNode = "";
    }
    function N(p, f) {
      return p.trim && (f = f.trim()), p.normalize && (f = f.replace(/\s+/g, " ")), f;
    }
    function C(p, f) {
      return Y(p), p.trackPosition && (f += `
Line: ` + p.line + `
Column: ` + p.column + `
Char: ` + p.c), f = new Error(f), p.error = f, B(p, "onerror", f), p;
    }
    function P(p) {
      return p.sawRoot && !p.closedRoot && b(p, "Unclosed root tag"), p.state !== g.BEGIN && p.state !== g.BEGIN_WHITESPACE && p.state !== g.TEXT && C(p, "Unexpected end"), Y(p), p.c = "", p.closed = !0, B(p, "onend"), n.call(p, p.strict, p.opt), p;
    }
    function b(p, f) {
      if (typeof p != "object" || !(p instanceof n))
        throw new Error("bad call to strictFail");
      p.strict && C(p, f);
    }
    function L(p) {
      p.strict || (p.tagName = p.tagName[p.looseCase]());
      var f = p.tags[p.tags.length - 1] || p, O = p.tag = { name: p.tagName, attributes: {} };
      p.opt.xmlns && (O.ns = f.ns), p.attribList.length = 0, j(p, "onopentagstart", O);
    }
    function D(p, f) {
      var O = p.indexOf(":"), _ = O < 0 ? ["", p] : p.split(":"), Q = _[0], te = _[1];
      return f && p === "xmlns" && (Q = "xmlns", te = ""), { prefix: Q, local: te };
    }
    function q(p) {
      if (p.strict || (p.attribName = p.attribName[p.looseCase]()), p.attribList.indexOf(p.attribName) !== -1 || p.tag.attributes.hasOwnProperty(p.attribName)) {
        p.attribName = p.attribValue = "";
        return;
      }
      if (p.opt.xmlns) {
        var f = D(p.attribName, !0), O = f.prefix, _ = f.local;
        if (O === "xmlns")
          if (_ === "xml" && p.attribValue !== h)
            b(
              p,
              "xml: prefix must be bound to " + h + `
Actual: ` + p.attribValue
            );
          else if (_ === "xmlns" && p.attribValue !== w)
            b(
              p,
              "xmlns: prefix must be bound to " + w + `
Actual: ` + p.attribValue
            );
          else {
            var Q = p.tag, te = p.tags[p.tags.length - 1] || p;
            Q.ns === te.ns && (Q.ns = Object.create(te.ns)), Q.ns[_] = p.attribValue;
          }
        p.attribList.push([p.attribName, p.attribValue]);
      } else
        p.tag.attributes[p.attribName] = p.attribValue, j(p, "onattribute", {
          name: p.attribName,
          value: p.attribValue
        });
      p.attribName = p.attribValue = "";
    }
    function z(p, f) {
      if (p.opt.xmlns) {
        var O = p.tag, _ = D(p.tagName);
        O.prefix = _.prefix, O.local = _.local, O.uri = O.ns[_.prefix] || "", O.prefix && !O.uri && (b(p, "Unbound namespace prefix: " + JSON.stringify(p.tagName)), O.uri = _.prefix);
        var Q = p.tags[p.tags.length - 1] || p;
        O.ns && Q.ns !== O.ns && Object.keys(O.ns).forEach(function(Yr) {
          j(p, "onopennamespace", {
            prefix: Yr,
            uri: O.ns[Yr]
          });
        });
        for (var te = 0, oe = p.attribList.length; te < oe; te++) {
          var pe = p.attribList[te], ye = pe[0], Qe = pe[1], le = D(ye, !0), xe = le.prefix, ii = le.local, Vr = xe === "" ? "" : O.ns[xe] || "", rr = {
            name: ye,
            value: Qe,
            prefix: xe,
            local: ii,
            uri: Vr
          };
          xe && xe !== "xmlns" && !Vr && (b(p, "Unbound namespace prefix: " + JSON.stringify(xe)), rr.uri = xe), p.tag.attributes[ye] = rr, j(p, "onattribute", rr);
        }
        p.attribList.length = 0;
      }
      p.tag.isSelfClosing = !!f, p.sawRoot = !0, p.tags.push(p.tag), j(p, "onopentag", p.tag), f || (!p.noscript && p.tagName.toLowerCase() === "script" ? p.state = g.SCRIPT : p.state = g.TEXT, p.tag = null, p.tagName = ""), p.attribName = p.attribValue = "", p.attribList.length = 0;
    }
    function V(p) {
      if (!p.tagName) {
        b(p, "Weird empty close tag."), p.textNode += "</>", p.state = g.TEXT;
        return;
      }
      if (p.script) {
        if (p.tagName !== "script") {
          p.script += "</" + p.tagName + ">", p.tagName = "", p.state = g.SCRIPT;
          return;
        }
        j(p, "onscript", p.script), p.script = "";
      }
      var f = p.tags.length, O = p.tagName;
      p.strict || (O = O[p.looseCase]());
      for (var _ = O; f--; ) {
        var Q = p.tags[f];
        if (Q.name !== _)
          b(p, "Unexpected close tag");
        else
          break;
      }
      if (f < 0) {
        b(p, "Unmatched closing tag: " + p.tagName), p.textNode += "</" + p.tagName + ">", p.state = g.TEXT;
        return;
      }
      p.tagName = O;
      for (var te = p.tags.length; te-- > f; ) {
        var oe = p.tag = p.tags.pop();
        p.tagName = p.tag.name, j(p, "onclosetag", p.tagName);
        var pe = {};
        for (var ye in oe.ns)
          pe[ye] = oe.ns[ye];
        var Qe = p.tags[p.tags.length - 1] || p;
        p.opt.xmlns && oe.ns !== Qe.ns && Object.keys(oe.ns).forEach(function(le) {
          var xe = oe.ns[le];
          j(p, "onclosenamespace", { prefix: le, uri: xe });
        });
      }
      f === 0 && (p.closedRoot = !0), p.tagName = p.attribValue = p.attribName = "", p.attribList.length = 0, p.state = g.TEXT;
    }
    function K(p) {
      var f = p.entity, O = f.toLowerCase(), _, Q = "";
      return p.ENTITIES[f] ? p.ENTITIES[f] : p.ENTITIES[O] ? p.ENTITIES[O] : (f = O, f.charAt(0) === "#" && (f.charAt(1) === "x" ? (f = f.slice(2), _ = parseInt(f, 16), Q = _.toString(16)) : (f = f.slice(1), _ = parseInt(f, 10), Q = _.toString(10))), f = f.replace(/^0+/, ""), isNaN(_) || Q.toLowerCase() !== f ? (b(p, "Invalid character entity"), "&" + p.entity + ";") : String.fromCodePoint(_));
    }
    function ce(p, f) {
      f === "<" ? (p.state = g.OPEN_WAKA, p.startTagPosition = p.position) : x(f) || (b(p, "Non-whitespace before first tag."), p.textNode = f, p.state = g.TEXT);
    }
    function W(p, f) {
      var O = "";
      return f < p.length && (O = p.charAt(f)), O;
    }
    function je(p) {
      var f = this;
      if (this.error)
        throw this.error;
      if (f.closed)
        return C(
          f,
          "Cannot write after close. Assign an onready handler."
        );
      if (p === null)
        return P(f);
      typeof p == "object" && (p = p.toString());
      for (var O = 0, _ = ""; _ = W(p, O++), f.c = _, !!_; )
        switch (f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++), f.state) {
          case g.BEGIN:
            if (f.state = g.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            ce(f, _);
            continue;
          case g.BEGIN_WHITESPACE:
            ce(f, _);
            continue;
          case g.TEXT:
            if (f.sawRoot && !f.closedRoot) {
              for (var Q = O - 1; _ && _ !== "<" && _ !== "&"; )
                _ = W(p, O++), _ && f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++);
              f.textNode += p.substring(Q, O - 1);
            }
            _ === "<" && !(f.sawRoot && f.closedRoot && !f.strict) ? (f.state = g.OPEN_WAKA, f.startTagPosition = f.position) : (!x(_) && (!f.sawRoot || f.closedRoot) && b(f, "Text data outside of root node."), _ === "&" ? f.state = g.TEXT_ENTITY : f.textNode += _);
            continue;
          case g.SCRIPT:
            _ === "<" ? f.state = g.SCRIPT_ENDING : f.script += _;
            continue;
          case g.SCRIPT_ENDING:
            _ === "/" ? f.state = g.CLOSE_TAG : (f.script += "<" + _, f.state = g.SCRIPT);
            continue;
          case g.OPEN_WAKA:
            if (_ === "!")
              f.state = g.SGML_DECL, f.sgmlDecl = "";
            else if (!x(_)) if (I(A, _))
              f.state = g.OPEN_TAG, f.tagName = _;
            else if (_ === "/")
              f.state = g.CLOSE_TAG, f.tagName = "";
            else if (_ === "?")
              f.state = g.PROC_INST, f.procInstName = f.procInstBody = "";
            else {
              if (b(f, "Unencoded <"), f.startTagPosition + 1 < f.position) {
                var te = f.position - f.startTagPosition;
                _ = new Array(te).join(" ") + _;
              }
              f.textNode += "<" + _, f.state = g.TEXT;
            }
            continue;
          case g.SGML_DECL:
            if (f.sgmlDecl + _ === "--") {
              f.state = g.COMMENT, f.comment = "", f.sgmlDecl = "";
              continue;
            }
            f.doctype && f.doctype !== !0 && f.sgmlDecl ? (f.state = g.DOCTYPE_DTD, f.doctype += "<!" + f.sgmlDecl + _, f.sgmlDecl = "") : (f.sgmlDecl + _).toUpperCase() === u ? (j(f, "onopencdata"), f.state = g.CDATA, f.sgmlDecl = "", f.cdata = "") : (f.sgmlDecl + _).toUpperCase() === d ? (f.state = g.DOCTYPE, (f.doctype || f.sawRoot) && b(
              f,
              "Inappropriately located doctype declaration"
            ), f.doctype = "", f.sgmlDecl = "") : _ === ">" ? (j(f, "onsgmldeclaration", f.sgmlDecl), f.sgmlDecl = "", f.state = g.TEXT) : (G(_) && (f.state = g.SGML_DECL_QUOTED), f.sgmlDecl += _);
            continue;
          case g.SGML_DECL_QUOTED:
            _ === f.q && (f.state = g.SGML_DECL, f.q = ""), f.sgmlDecl += _;
            continue;
          case g.DOCTYPE:
            _ === ">" ? (f.state = g.TEXT, j(f, "ondoctype", f.doctype), f.doctype = !0) : (f.doctype += _, _ === "[" ? f.state = g.DOCTYPE_DTD : G(_) && (f.state = g.DOCTYPE_QUOTED, f.q = _));
            continue;
          case g.DOCTYPE_QUOTED:
            f.doctype += _, _ === f.q && (f.q = "", f.state = g.DOCTYPE);
            continue;
          case g.DOCTYPE_DTD:
            _ === "]" ? (f.doctype += _, f.state = g.DOCTYPE) : _ === "<" ? (f.state = g.OPEN_WAKA, f.startTagPosition = f.position) : G(_) ? (f.doctype += _, f.state = g.DOCTYPE_DTD_QUOTED, f.q = _) : f.doctype += _;
            continue;
          case g.DOCTYPE_DTD_QUOTED:
            f.doctype += _, _ === f.q && (f.state = g.DOCTYPE_DTD, f.q = "");
            continue;
          case g.COMMENT:
            _ === "-" ? f.state = g.COMMENT_ENDING : f.comment += _;
            continue;
          case g.COMMENT_ENDING:
            _ === "-" ? (f.state = g.COMMENT_ENDED, f.comment = N(f.opt, f.comment), f.comment && j(f, "oncomment", f.comment), f.comment = "") : (f.comment += "-" + _, f.state = g.COMMENT);
            continue;
          case g.COMMENT_ENDED:
            _ !== ">" ? (b(f, "Malformed comment"), f.comment += "--" + _, f.state = g.COMMENT) : f.doctype && f.doctype !== !0 ? f.state = g.DOCTYPE_DTD : f.state = g.TEXT;
            continue;
          case g.CDATA:
            _ === "]" ? f.state = g.CDATA_ENDING : f.cdata += _;
            continue;
          case g.CDATA_ENDING:
            _ === "]" ? f.state = g.CDATA_ENDING_2 : (f.cdata += "]" + _, f.state = g.CDATA);
            continue;
          case g.CDATA_ENDING_2:
            _ === ">" ? (f.cdata && j(f, "oncdata", f.cdata), j(f, "onclosecdata"), f.cdata = "", f.state = g.TEXT) : _ === "]" ? f.cdata += "]" : (f.cdata += "]]" + _, f.state = g.CDATA);
            continue;
          case g.PROC_INST:
            _ === "?" ? f.state = g.PROC_INST_ENDING : x(_) ? f.state = g.PROC_INST_BODY : f.procInstName += _;
            continue;
          case g.PROC_INST_BODY:
            if (!f.procInstBody && x(_))
              continue;
            _ === "?" ? f.state = g.PROC_INST_ENDING : f.procInstBody += _;
            continue;
          case g.PROC_INST_ENDING:
            _ === ">" ? (j(f, "onprocessinginstruction", {
              name: f.procInstName,
              body: f.procInstBody
            }), f.procInstName = f.procInstBody = "", f.state = g.TEXT) : (f.procInstBody += "?" + _, f.state = g.PROC_INST_BODY);
            continue;
          case g.OPEN_TAG:
            I(S, _) ? f.tagName += _ : (L(f), _ === ">" ? z(f) : _ === "/" ? f.state = g.OPEN_TAG_SLASH : (x(_) || b(f, "Invalid character in tag name"), f.state = g.ATTRIB));
            continue;
          case g.OPEN_TAG_SLASH:
            _ === ">" ? (z(f, !0), V(f)) : (b(f, "Forward-slash in opening tag not followed by >"), f.state = g.ATTRIB);
            continue;
          case g.ATTRIB:
            if (x(_))
              continue;
            _ === ">" ? z(f) : _ === "/" ? f.state = g.OPEN_TAG_SLASH : I(A, _) ? (f.attribName = _, f.attribValue = "", f.state = g.ATTRIB_NAME) : b(f, "Invalid attribute name");
            continue;
          case g.ATTRIB_NAME:
            _ === "=" ? f.state = g.ATTRIB_VALUE : _ === ">" ? (b(f, "Attribute without value"), f.attribValue = f.attribName, q(f), z(f)) : x(_) ? f.state = g.ATTRIB_NAME_SAW_WHITE : I(S, _) ? f.attribName += _ : b(f, "Invalid attribute name");
            continue;
          case g.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              f.state = g.ATTRIB_VALUE;
            else {
              if (x(_))
                continue;
              b(f, "Attribute without value"), f.tag.attributes[f.attribName] = "", f.attribValue = "", j(f, "onattribute", {
                name: f.attribName,
                value: ""
              }), f.attribName = "", _ === ">" ? z(f) : I(A, _) ? (f.attribName = _, f.state = g.ATTRIB_NAME) : (b(f, "Invalid attribute name"), f.state = g.ATTRIB);
            }
            continue;
          case g.ATTRIB_VALUE:
            if (x(_))
              continue;
            G(_) ? (f.q = _, f.state = g.ATTRIB_VALUE_QUOTED) : (f.opt.unquotedAttributeValues || C(f, "Unquoted attribute value"), f.state = g.ATTRIB_VALUE_UNQUOTED, f.attribValue = _);
            continue;
          case g.ATTRIB_VALUE_QUOTED:
            if (_ !== f.q) {
              _ === "&" ? f.state = g.ATTRIB_VALUE_ENTITY_Q : f.attribValue += _;
              continue;
            }
            q(f), f.q = "", f.state = g.ATTRIB_VALUE_CLOSED;
            continue;
          case g.ATTRIB_VALUE_CLOSED:
            x(_) ? f.state = g.ATTRIB : _ === ">" ? z(f) : _ === "/" ? f.state = g.OPEN_TAG_SLASH : I(A, _) ? (b(f, "No whitespace between attributes"), f.attribName = _, f.attribValue = "", f.state = g.ATTRIB_NAME) : b(f, "Invalid attribute name");
            continue;
          case g.ATTRIB_VALUE_UNQUOTED:
            if (!T(_)) {
              _ === "&" ? f.state = g.ATTRIB_VALUE_ENTITY_U : f.attribValue += _;
              continue;
            }
            q(f), _ === ">" ? z(f) : f.state = g.ATTRIB;
            continue;
          case g.CLOSE_TAG:
            if (f.tagName)
              _ === ">" ? V(f) : I(S, _) ? f.tagName += _ : f.script ? (f.script += "</" + f.tagName, f.tagName = "", f.state = g.SCRIPT) : (x(_) || b(f, "Invalid tagname in closing tag"), f.state = g.CLOSE_TAG_SAW_WHITE);
            else {
              if (x(_))
                continue;
              F(A, _) ? f.script ? (f.script += "</" + _, f.state = g.SCRIPT) : b(f, "Invalid tagname in closing tag.") : f.tagName = _;
            }
            continue;
          case g.CLOSE_TAG_SAW_WHITE:
            if (x(_))
              continue;
            _ === ">" ? V(f) : b(f, "Invalid characters in closing tag");
            continue;
          case g.TEXT_ENTITY:
          case g.ATTRIB_VALUE_ENTITY_Q:
          case g.ATTRIB_VALUE_ENTITY_U:
            var oe, pe;
            switch (f.state) {
              case g.TEXT_ENTITY:
                oe = g.TEXT, pe = "textNode";
                break;
              case g.ATTRIB_VALUE_ENTITY_Q:
                oe = g.ATTRIB_VALUE_QUOTED, pe = "attribValue";
                break;
              case g.ATTRIB_VALUE_ENTITY_U:
                oe = g.ATTRIB_VALUE_UNQUOTED, pe = "attribValue";
                break;
            }
            if (_ === ";") {
              var ye = K(f);
              f.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ye) ? (f.entity = "", f.state = oe, f.write(ye)) : (f[pe] += ye, f.entity = "", f.state = oe);
            } else I(f.entity.length ? U : $, _) ? f.entity += _ : (b(f, "Invalid character in entity name"), f[pe] += "&" + f.entity + _, f.entity = "", f.state = oe);
            continue;
          default:
            throw new Error(f, "Unknown state: " + f.state);
        }
      return f.position >= f.bufferCheckPosition && i(f), f;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var p = String.fromCharCode, f = Math.floor, O = function() {
        var _ = 16384, Q = [], te, oe, pe = -1, ye = arguments.length;
        if (!ye)
          return "";
        for (var Qe = ""; ++pe < ye; ) {
          var le = Number(arguments[pe]);
          if (!isFinite(le) || // `NaN`, `+Infinity`, or `-Infinity`
          le < 0 || // not a valid Unicode code point
          le > 1114111 || // not a valid Unicode code point
          f(le) !== le)
            throw RangeError("Invalid code point: " + le);
          le <= 65535 ? Q.push(le) : (le -= 65536, te = (le >> 10) + 55296, oe = le % 1024 + 56320, Q.push(te, oe)), (pe + 1 === ye || Q.length > _) && (Qe += p.apply(null, Q), Q.length = 0);
        }
        return Qe;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: O,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = O;
    }();
  })(e);
})(sl);
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.XElement = void 0;
Lr.parseXml = Xf;
const Vf = sl, on = Jt;
class ll {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, on.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!zf(t))
      throw (0, on.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, on.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, on.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (ua(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => ua(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Lr.XElement = ll;
const Yf = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function zf(e) {
  return Yf.test(e);
}
function ua(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Xf(e) {
  let t = null;
  const r = Vf.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new ll(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
var Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.MemoLazy = void 0;
class Kf {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && cl(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Ln.MemoLazy = Kf;
function cl(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => cl(e[a], t[a]));
  }
  return e === t;
}
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.retry = ul;
const Jf = lt;
async function ul(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new Jf.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((E) => setTimeout(E, r + n * i)), await ul(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = u;
  var t = lt;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var r = Se;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } });
  var n = xn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return n.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return n.githubUrl;
  } });
  var i = ao;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = Wt;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var a = xr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = Lr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return s.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return s.XElement;
  } });
  var l = Jt;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return l.newError;
  } });
  var E = Ln;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return E.MemoLazy;
  } });
  var c = so;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return c.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(de);
var bt = {}, Ce = {};
Ce.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ce.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var rt = pf, Qf = process.cwd, yn = null, Zf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return yn || (yn = Qf.call(process)), yn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var fa = process.chdir;
  process.chdir = function(e) {
    yn = null, fa.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, fa);
}
var ed = td;
function td(e) {
  rt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, d, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), Zf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(d, h, w) {
      var y = Date.now(), A = 0;
      c(d, h, function S($) {
        if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(h, function(U, x) {
              U && U.code === "ENOENT" ? c(d, h, S) : w($);
            });
          }, A), A < 100 && (A += 10);
          return;
        }
        w && w($);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(d, h, w, y, A, S) {
      var $;
      if (S && typeof S == "function") {
        var U = 0;
        $ = function(x, G, T) {
          if (x && x.code === "EAGAIN" && U < 10)
            return U++, c.call(e, d, h, w, y, A, $);
          S.apply(this, arguments);
        };
      }
      return c.call(e, d, h, w, y, A, $);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, d, h, w, y) {
      for (var A = 0; ; )
        try {
          return c.call(e, u, d, h, w, y);
        } catch (S) {
          if (S.code === "EAGAIN" && A < 10) {
            A++;
            continue;
          }
          throw S;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(u, d, h) {
      c.open(
        u,
        rt.O_WRONLY | rt.O_SYMLINK,
        d,
        function(w, y) {
          if (w) {
            h && h(w);
            return;
          }
          c.fchmod(y, d, function(A) {
            c.close(y, function(S) {
              h && h(A || S);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, d) {
      var h = c.openSync(u, rt.O_WRONLY | rt.O_SYMLINK, d), w = !0, y;
      try {
        y = c.fchmodSync(h, d), w = !1;
      } finally {
        if (w)
          try {
            c.closeSync(h);
          } catch {
          }
        else
          c.closeSync(h);
      }
      return y;
    };
  }
  function r(c) {
    rt.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, d, h, w) {
      c.open(u, rt.O_SYMLINK, function(y, A) {
        if (y) {
          w && w(y);
          return;
        }
        c.futimes(A, d, h, function(S) {
          c.close(A, function($) {
            w && w(S || $);
          });
        });
      });
    }, c.lutimesSync = function(u, d, h) {
      var w = c.openSync(u, rt.O_SYMLINK), y, A = !0;
      try {
        y = c.futimesSync(w, d, h), A = !1;
      } finally {
        if (A)
          try {
            c.closeSync(w);
          } catch {
          }
        else
          c.closeSync(w);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(u, d, h, w) {
      w && process.nextTick(w);
    }, c.lutimesSync = function() {
    });
  }
  function n(c) {
    return c && function(u, d, h) {
      return c.call(e, u, d, function(w) {
        E(w) && (w = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, d) {
      try {
        return c.call(e, u, d);
      } catch (h) {
        if (!E(h)) throw h;
      }
    };
  }
  function o(c) {
    return c && function(u, d, h, w) {
      return c.call(e, u, d, h, function(y) {
        E(y) && (y = null), w && w.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(u, d, h) {
      try {
        return c.call(e, u, d, h);
      } catch (w) {
        if (!E(w)) throw w;
      }
    };
  }
  function s(c) {
    return c && function(u, d, h) {
      typeof d == "function" && (h = d, d = null);
      function w(y, A) {
        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return d ? c.call(e, u, d, w) : c.call(e, u, w);
    };
  }
  function l(c) {
    return c && function(u, d) {
      var h = d ? c.call(e, u, d) : c.call(e, u);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function E(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var da = Fr.Stream, rd = nd;
function nd(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    da.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var E = a[s];
      this[E] = i[E];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, u) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    da.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var id = ad, od = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function ad(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: od(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ne = Je, sd = ed, ld = rd, cd = id, an = no, ge, Tn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ge = Symbol.for("graceful-fs.queue"), Tn = Symbol.for("graceful-fs.previous")) : (ge = "___graceful-fs.queue", Tn = "___graceful-fs.previous");
function ud() {
}
function fl(e, t) {
  Object.defineProperty(e, ge, {
    get: function() {
      return t;
    }
  });
}
var At = ud;
an.debuglog ? At = an.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (At = function() {
  var e = an.format.apply(an, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ne[ge]) {
  var fd = ke[ge] || [];
  fl(ne, fd), ne.close = function(e) {
    function t(r, n) {
      return e.call(ne, r, function(i) {
        i || ha(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Tn, {
      value: e
    }), t;
  }(ne.close), ne.closeSync = function(e) {
    function t(r) {
      e.apply(ne, arguments), ha();
    }
    return Object.defineProperty(t, Tn, {
      value: e
    }), t;
  }(ne.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    At(ne[ge]), Zs.equal(ne[ge].length, 0);
  });
}
ke[ge] || fl(ke, ne[ge]);
var be = lo(cd(ne));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ne.__patched && (be = lo(ne), ne.__patched = !0);
function lo(e) {
  sd(e), e.gracefulify = lo, e.createReadStream = G, e.createWriteStream = T;
  var t = e.readFile;
  e.readFile = r;
  function r(g, M, B) {
    return typeof M == "function" && (B = M, M = null), j(g, M, B);
    function j(Y, N, C, P) {
      return t(Y, N, function(b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE") ? Rt([j, [Y, N, C], b, P || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(g, M, B, j) {
    return typeof B == "function" && (j = B, B = null), Y(g, M, B, j);
    function Y(N, C, P, b, L) {
      return n(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Rt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(g, M, B, j) {
    return typeof B == "function" && (j = B, B = null), Y(g, M, B, j);
    function Y(N, C, P, b, L) {
      return o(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Rt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(g, M, B, j) {
    return typeof B == "function" && (j = B, B = 0), Y(g, M, B, j);
    function Y(N, C, P, b, L) {
      return s(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Rt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var E = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u(g, M, B) {
    typeof M == "function" && (B = M, M = null);
    var j = c.test(process.version) ? function(C, P, b, L) {
      return E(C, Y(
        C,
        P,
        b,
        L
      ));
    } : function(C, P, b, L) {
      return E(C, P, Y(
        C,
        P,
        b,
        L
      ));
    };
    return j(g, M, B);
    function Y(N, C, P, b) {
      return function(L, D) {
        L && (L.code === "EMFILE" || L.code === "ENFILE") ? Rt([
          j,
          [N, C, P],
          L,
          b || Date.now(),
          Date.now()
        ]) : (D && D.sort && D.sort(), typeof P == "function" && P.call(this, L, D));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = ld(e);
    S = d.ReadStream, U = d.WriteStream;
  }
  var h = e.ReadStream;
  h && (S.prototype = Object.create(h.prototype), S.prototype.open = $);
  var w = e.WriteStream;
  w && (U.prototype = Object.create(w.prototype), U.prototype.open = x), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return S;
    },
    set: function(g) {
      S = g;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return U;
    },
    set: function(g) {
      U = g;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = S;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(g) {
      y = g;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = U;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return A;
    },
    set: function(g) {
      A = g;
    },
    enumerable: !0,
    configurable: !0
  });
  function S(g, M) {
    return this instanceof S ? (h.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function $() {
    var g = this;
    F(g.path, g.flags, g.mode, function(M, B) {
      M ? (g.autoClose && g.destroy(), g.emit("error", M)) : (g.fd = B, g.emit("open", B), g.read());
    });
  }
  function U(g, M) {
    return this instanceof U ? (w.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
  }
  function x() {
    var g = this;
    F(g.path, g.flags, g.mode, function(M, B) {
      M ? (g.destroy(), g.emit("error", M)) : (g.fd = B, g.emit("open", B));
    });
  }
  function G(g, M) {
    return new e.ReadStream(g, M);
  }
  function T(g, M) {
    return new e.WriteStream(g, M);
  }
  var I = e.open;
  e.open = F;
  function F(g, M, B, j) {
    return typeof B == "function" && (j = B, B = null), Y(g, M, B, j);
    function Y(N, C, P, b, L) {
      return I(N, C, P, function(D, q) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Rt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  return e;
}
function Rt(e) {
  At("ENQUEUE", e[0].name, e[1]), ne[ge].push(e), co();
}
var sn;
function ha() {
  for (var e = Date.now(), t = 0; t < ne[ge].length; ++t)
    ne[ge][t].length > 2 && (ne[ge][t][3] = e, ne[ge][t][4] = e);
  co();
}
function co() {
  if (clearTimeout(sn), sn = void 0, ne[ge].length !== 0) {
    var e = ne[ge].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      At("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      At("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), E = Math.min(l * 1.2, 100);
      s >= E ? (At("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ne[ge].push(e);
    }
    sn === void 0 && (sn = setTimeout(co, 0));
  }
}
(function(e) {
  const t = Ce.fromCallback, r = be, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, E) {
    return typeof E == "function" ? r.read(i, o, a, s, l, E) : new Promise((c, u) => {
      r.read(i, o, a, s, l, (d, h, w) => {
        if (d) return u(d);
        c({ bytesRead: h, buffer: w });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (E, c, u) => {
        if (E) return l(E);
        s({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (E, c, u) => {
        if (E) return l(E);
        s({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(bt);
var uo = {}, dl = {};
const dd = ie;
dl.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(dd.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const hl = bt, { checkPath: pl } = dl, ml = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
uo.makeDir = async (e, t) => (pl(e), hl.mkdir(e, {
  mode: ml(t),
  recursive: !0
}));
uo.makeDirSync = (e, t) => (pl(e), hl.mkdirSync(e, {
  mode: ml(t),
  recursive: !0
}));
const hd = Ce.fromPromise, { makeDir: pd, makeDirSync: Ei } = uo, yi = hd(pd);
var Ve = {
  mkdirs: yi,
  mkdirsSync: Ei,
  // alias
  mkdirp: yi,
  mkdirpSync: Ei,
  ensureDir: yi,
  ensureDirSync: Ei
};
const md = Ce.fromPromise, gl = bt;
function gd(e) {
  return gl.access(e).then(() => !0).catch(() => !1);
}
var $t = {
  pathExists: md(gd),
  pathExistsSync: gl.existsSync
};
const qt = be;
function Ed(e, t, r, n) {
  qt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    qt.futimes(o, t, r, (a) => {
      qt.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function yd(e, t, r) {
  const n = qt.openSync(e, "r+");
  return qt.futimesSync(n, t, r), qt.closeSync(n);
}
var El = {
  utimesMillis: Ed,
  utimesMillisSync: yd
};
const Vt = bt, fe = ie, vd = no;
function wd(e, t, r) {
  const n = r.dereference ? (i) => Vt.stat(i, { bigint: !0 }) : (i) => Vt.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function _d(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Vt.statSync(a, { bigint: !0 }) : (a) => Vt.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function Ad(e, t, r, n, i) {
  vd.callbackify(wd)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Ur(s, l)) {
        const E = fe.basename(e), c = fe.basename(t);
        return r === "move" && E !== c && E.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && fo(e, t) ? i(new Error(Un(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function Sd(e, t, r, n) {
  const { srcStat: i, destStat: o } = _d(e, t, n);
  if (o) {
    if (Ur(i, o)) {
      const a = fe.basename(e), s = fe.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && fo(e, t))
    throw new Error(Un(e, t, r));
  return { srcStat: i, destStat: o };
}
function yl(e, t, r, n, i) {
  const o = fe.resolve(fe.dirname(e)), a = fe.resolve(fe.dirname(r));
  if (a === o || a === fe.parse(a).root) return i();
  Vt.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Ur(t, l) ? i(new Error(Un(e, r, n))) : yl(e, t, a, n, i));
}
function vl(e, t, r, n) {
  const i = fe.resolve(fe.dirname(e)), o = fe.resolve(fe.dirname(r));
  if (o === i || o === fe.parse(o).root) return;
  let a;
  try {
    a = Vt.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Ur(t, a))
    throw new Error(Un(e, r, n));
  return vl(e, t, o, n);
}
function Ur(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function fo(e, t) {
  const r = fe.resolve(e).split(fe.sep).filter((i) => i), n = fe.resolve(t).split(fe.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Un(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Qt = {
  checkPaths: Ad,
  checkPathsSync: Sd,
  checkParentPaths: yl,
  checkParentPathsSync: vl,
  isSrcSubdir: fo,
  areIdentical: Ur
};
const Ie = be, Tr = ie, Td = Ve.mkdirs, Cd = $t.pathExists, bd = El.utimesMillis, Cr = Qt;
function $d(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Cr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Cr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? wl(pa, s, e, t, r, n) : pa(s, e, t, r, n));
  });
}
function pa(e, t, r, n, i) {
  const o = Tr.dirname(r);
  Cd(o, (a, s) => {
    if (a) return i(a);
    if (s) return Cn(e, t, r, n, i);
    Td(o, (l) => l ? i(l) : Cn(e, t, r, n, i));
  });
}
function wl(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function Od(e, t, r, n, i) {
  return n.filter ? wl(Cn, e, t, r, n, i) : Cn(e, t, r, n, i);
}
function Cn(e, t, r, n, i) {
  (n.dereference ? Ie.stat : Ie.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? xd(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? Id(s, e, t, r, n, i) : s.isSymbolicLink() ? kd(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Id(e, t, r, n, i, o) {
  return t ? Rd(e, r, n, i, o) : _l(e, r, n, i, o);
}
function Rd(e, t, r, n, i) {
  if (n.overwrite)
    Ie.unlink(r, (o) => o ? i(o) : _l(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function _l(e, t, r, n, i) {
  Ie.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? Nd(e.mode, t, r, i) : kn(r, e.mode, i));
}
function Nd(e, t, r, n) {
  return Pd(e) ? Dd(r, e, (i) => i ? n(i) : ma(e, t, r, n)) : ma(e, t, r, n);
}
function Pd(e) {
  return (e & 128) === 0;
}
function Dd(e, t, r) {
  return kn(e, t | 128, r);
}
function ma(e, t, r, n) {
  Fd(t, r, (i) => i ? n(i) : kn(r, e, n));
}
function kn(e, t, r) {
  return Ie.chmod(e, t, r);
}
function Fd(e, t, r) {
  Ie.stat(e, (n, i) => n ? r(n) : bd(t, i.atime, i.mtime, r));
}
function xd(e, t, r, n, i, o) {
  return t ? Al(r, n, i, o) : Ld(e.mode, r, n, i, o);
}
function Ld(e, t, r, n, i) {
  Ie.mkdir(r, (o) => {
    if (o) return i(o);
    Al(t, r, n, (a) => a ? i(a) : kn(r, e, i));
  });
}
function Al(e, t, r, n) {
  Ie.readdir(e, (i, o) => i ? n(i) : Sl(o, e, t, r, n));
}
function Sl(e, t, r, n, i) {
  const o = e.pop();
  return o ? Ud(e, o, t, r, n, i) : i();
}
function Ud(e, t, r, n, i, o) {
  const a = Tr.join(r, t), s = Tr.join(n, t);
  Cr.checkPaths(a, s, "copy", i, (l, E) => {
    if (l) return o(l);
    const { destStat: c } = E;
    Od(c, a, s, i, (u) => u ? o(u) : Sl(e, r, n, i, o));
  });
}
function kd(e, t, r, n, i) {
  Ie.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Tr.resolve(process.cwd(), a)), e)
      Ie.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Ie.symlink(a, r, i) : i(s) : (n.dereference && (l = Tr.resolve(process.cwd(), l)), Cr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Cr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : Md(a, r, i)));
    else
      return Ie.symlink(a, r, i);
  });
}
function Md(e, t, r) {
  Ie.unlink(t, (n) => n ? r(n) : Ie.symlink(e, t, r));
}
var Bd = $d;
const we = be, br = ie, Hd = Ve.mkdirsSync, jd = El.utimesMillisSync, $r = Qt;
function qd(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = $r.checkPathsSync(e, t, "copy", r);
  return $r.checkParentPathsSync(e, n, t, "copy"), Gd(i, e, t, r);
}
function Gd(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = br.dirname(r);
  return we.existsSync(i) || Hd(i), Tl(e, t, r, n);
}
function Wd(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Tl(e, t, r, n);
}
function Tl(e, t, r, n) {
  const o = (n.dereference ? we.statSync : we.lstatSync)(t);
  if (o.isDirectory()) return Qd(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Vd(o, e, t, r, n);
  if (o.isSymbolicLink()) return th(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Vd(e, t, r, n, i) {
  return t ? Yd(e, r, n, i) : Cl(e, r, n, i);
}
function Yd(e, t, r, n) {
  if (n.overwrite)
    return we.unlinkSync(r), Cl(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Cl(e, t, r, n) {
  return we.copyFileSync(t, r), n.preserveTimestamps && zd(e.mode, t, r), ho(r, e.mode);
}
function zd(e, t, r) {
  return Xd(e) && Kd(r, e), Jd(t, r);
}
function Xd(e) {
  return (e & 128) === 0;
}
function Kd(e, t) {
  return ho(e, t | 128);
}
function ho(e, t) {
  return we.chmodSync(e, t);
}
function Jd(e, t) {
  const r = we.statSync(e);
  return jd(t, r.atime, r.mtime);
}
function Qd(e, t, r, n, i) {
  return t ? bl(r, n, i) : Zd(e.mode, r, n, i);
}
function Zd(e, t, r, n) {
  return we.mkdirSync(r), bl(t, r, n), ho(r, e);
}
function bl(e, t, r) {
  we.readdirSync(e).forEach((n) => eh(n, e, t, r));
}
function eh(e, t, r, n) {
  const i = br.join(t, e), o = br.join(r, e), { destStat: a } = $r.checkPathsSync(i, o, "copy", n);
  return Wd(a, i, o, n);
}
function th(e, t, r, n) {
  let i = we.readlinkSync(t);
  if (n.dereference && (i = br.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = we.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return we.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = br.resolve(process.cwd(), o)), $r.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (we.statSync(r).isDirectory() && $r.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return rh(i, r);
  } else
    return we.symlinkSync(i, r);
}
function rh(e, t) {
  return we.unlinkSync(t), we.symlinkSync(e, t);
}
var nh = qd;
const ih = Ce.fromCallback;
var po = {
  copy: ih(Bd),
  copySync: nh
};
const ga = be, $l = ie, Z = Zs, Or = process.platform === "win32";
function Ol(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || ga[r], r = r + "Sync", e[r] = e[r] || ga[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function mo(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Z(e, "rimraf: missing path"), Z.strictEqual(typeof e, "string", "rimraf: path should be a string"), Z.strictEqual(typeof r, "function", "rimraf: callback function required"), Z(t, "rimraf: invalid options argument provided"), Z.strictEqual(typeof t, "object", "rimraf: options should be object"), Ol(t), Ea(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Ea(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Ea(e, t, r) {
  Z(e), Z(t), Z(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Or)
      return ya(e, t, n, r);
    if (i && i.isDirectory())
      return vn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return Or ? ya(e, t, o, r) : vn(e, t, o, r);
        if (o.code === "EISDIR")
          return vn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function ya(e, t, r, n) {
  Z(e), Z(t), Z(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? vn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function va(e, t, r) {
  let n;
  Z(e), Z(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? wn(e, t, r) : t.unlinkSync(e);
}
function vn(e, t, r, n) {
  Z(e), Z(t), Z(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? oh(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function oh(e, t, r) {
  Z(e), Z(t), Z(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      mo($l.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Il(e, t) {
  let r;
  t = t || {}, Ol(t), Z(e, "rimraf: missing path"), Z.strictEqual(typeof e, "string", "rimraf: path should be a string"), Z(t, "rimraf: missing options"), Z.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Or && va(e, t, n);
  }
  try {
    r && r.isDirectory() ? wn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Or ? va(e, t, n) : wn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    wn(e, t, n);
  }
}
function wn(e, t, r) {
  Z(e), Z(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      ah(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function ah(e, t) {
  if (Z(e), Z(t), t.readdirSync(e).forEach((r) => Il($l.join(e, r), t)), Or) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var sh = mo;
mo.sync = Il;
const bn = be, lh = Ce.fromCallback, Rl = sh;
function ch(e, t) {
  if (bn.rm) return bn.rm(e, { recursive: !0, force: !0 }, t);
  Rl(e, t);
}
function uh(e) {
  if (bn.rmSync) return bn.rmSync(e, { recursive: !0, force: !0 });
  Rl.sync(e);
}
var Mn = {
  remove: lh(ch),
  removeSync: uh
};
const fh = Ce.fromPromise, Nl = bt, Pl = ie, Dl = Ve, Fl = Mn, wa = fh(async function(t) {
  let r;
  try {
    r = await Nl.readdir(t);
  } catch {
    return Dl.mkdirs(t);
  }
  return Promise.all(r.map((n) => Fl.remove(Pl.join(t, n))));
});
function _a(e) {
  let t;
  try {
    t = Nl.readdirSync(e);
  } catch {
    return Dl.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Pl.join(e, r), Fl.removeSync(r);
  });
}
var dh = {
  emptyDirSync: _a,
  emptydirSync: _a,
  emptyDir: wa,
  emptydir: wa
};
const hh = Ce.fromCallback, xl = ie, ot = be, Ll = Ve;
function ph(e, t) {
  function r() {
    ot.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  ot.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = xl.dirname(e);
    ot.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? Ll.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : ot.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function mh(e) {
  let t;
  try {
    t = ot.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = xl.dirname(e);
  try {
    ot.statSync(r).isDirectory() || ot.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Ll.mkdirsSync(r);
    else throw n;
  }
  ot.writeFileSync(e, "");
}
var gh = {
  createFile: hh(ph),
  createFileSync: mh
};
const Eh = Ce.fromCallback, Ul = ie, it = be, kl = Ve, yh = $t.pathExists, { areIdentical: Ml } = Qt;
function vh(e, t, r) {
  function n(i, o) {
    it.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  it.lstat(t, (i, o) => {
    it.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Ml(s, o)) return r(null);
      const l = Ul.dirname(t);
      yh(l, (E, c) => {
        if (E) return r(E);
        if (c) return n(e, t);
        kl.mkdirs(l, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function wh(e, t) {
  let r;
  try {
    r = it.lstatSync(t);
  } catch {
  }
  try {
    const o = it.lstatSync(e);
    if (r && Ml(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Ul.dirname(t);
  return it.existsSync(n) || kl.mkdirsSync(n), it.linkSync(e, t);
}
var _h = {
  createLink: Eh(vh),
  createLinkSync: wh
};
const at = ie, _r = be, Ah = $t.pathExists;
function Sh(e, t, r) {
  if (at.isAbsolute(e))
    return _r.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = at.dirname(t), i = at.join(n, e);
    return Ah(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : _r.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: at.relative(n, e)
    })));
  }
}
function Th(e, t) {
  let r;
  if (at.isAbsolute(e)) {
    if (r = _r.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = at.dirname(t), i = at.join(n, e);
    if (r = _r.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = _r.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: at.relative(n, e)
    };
  }
}
var Ch = {
  symlinkPaths: Sh,
  symlinkPathsSync: Th
};
const Bl = be;
function bh(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Bl.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function $h(e, t) {
  let r;
  if (t) return t;
  try {
    r = Bl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Oh = {
  symlinkType: bh,
  symlinkTypeSync: $h
};
const Ih = Ce.fromCallback, Hl = ie, Ue = bt, jl = Ve, Rh = jl.mkdirs, Nh = jl.mkdirsSync, ql = Ch, Ph = ql.symlinkPaths, Dh = ql.symlinkPathsSync, Gl = Oh, Fh = Gl.symlinkType, xh = Gl.symlinkTypeSync, Lh = $t.pathExists, { areIdentical: Wl } = Qt;
function Uh(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Ue.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Ue.stat(e),
      Ue.stat(t)
    ]).then(([a, s]) => {
      if (Wl(a, s)) return n(null);
      Aa(e, t, r, n);
    }) : Aa(e, t, r, n);
  });
}
function Aa(e, t, r, n) {
  Ph(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, Fh(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = Hl.dirname(t);
      Lh(l, (E, c) => {
        if (E) return n(E);
        if (c) return Ue.symlink(e, t, s, n);
        Rh(l, (u) => {
          if (u) return n(u);
          Ue.symlink(e, t, s, n);
        });
      });
    });
  });
}
function kh(e, t, r) {
  let n;
  try {
    n = Ue.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Ue.statSync(e), l = Ue.statSync(t);
    if (Wl(s, l)) return;
  }
  const i = Dh(e, t);
  e = i.toDst, r = xh(i.toCwd, r);
  const o = Hl.dirname(t);
  return Ue.existsSync(o) || Nh(o), Ue.symlinkSync(e, t, r);
}
var Mh = {
  createSymlink: Ih(Uh),
  createSymlinkSync: kh
};
const { createFile: Sa, createFileSync: Ta } = gh, { createLink: Ca, createLinkSync: ba } = _h, { createSymlink: $a, createSymlinkSync: Oa } = Mh;
var Bh = {
  // file
  createFile: Sa,
  createFileSync: Ta,
  ensureFile: Sa,
  ensureFileSync: Ta,
  // link
  createLink: Ca,
  createLinkSync: ba,
  ensureLink: Ca,
  ensureLinkSync: ba,
  // symlink
  createSymlink: $a,
  createSymlinkSync: Oa,
  ensureSymlink: $a,
  ensureSymlinkSync: Oa
};
function Hh(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function jh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var go = { stringify: Hh, stripBom: jh };
let Yt;
try {
  Yt = be;
} catch {
  Yt = Je;
}
const Bn = Ce, { stringify: Vl, stripBom: Yl } = go;
async function qh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Yt, n = "throws" in t ? t.throws : !0;
  let i = await Bn.fromCallback(r.readFile)(e, t);
  i = Yl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const Gh = Bn.fromPromise(qh);
function Wh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Yt, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Yl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Vh(e, t, r = {}) {
  const n = r.fs || Yt, i = Vl(t, r);
  await Bn.fromCallback(n.writeFile)(e, i, r);
}
const Yh = Bn.fromPromise(Vh);
function zh(e, t, r = {}) {
  const n = r.fs || Yt, i = Vl(t, r);
  return n.writeFileSync(e, i, r);
}
const Xh = {
  readFile: Gh,
  readFileSync: Wh,
  writeFile: Yh,
  writeFileSync: zh
};
var Kh = Xh;
const ln = Kh;
var Jh = {
  // jsonfile exports
  readJson: ln.readFile,
  readJsonSync: ln.readFileSync,
  writeJson: ln.writeFile,
  writeJsonSync: ln.writeFileSync
};
const Qh = Ce.fromCallback, Ar = be, zl = ie, Xl = Ve, Zh = $t.pathExists;
function ep(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = zl.dirname(e);
  Zh(i, (o, a) => {
    if (o) return n(o);
    if (a) return Ar.writeFile(e, t, r, n);
    Xl.mkdirs(i, (s) => {
      if (s) return n(s);
      Ar.writeFile(e, t, r, n);
    });
  });
}
function tp(e, ...t) {
  const r = zl.dirname(e);
  if (Ar.existsSync(r))
    return Ar.writeFileSync(e, ...t);
  Xl.mkdirsSync(r), Ar.writeFileSync(e, ...t);
}
var Eo = {
  outputFile: Qh(ep),
  outputFileSync: tp
};
const { stringify: rp } = go, { outputFile: np } = Eo;
async function ip(e, t, r = {}) {
  const n = rp(t, r);
  await np(e, n, r);
}
var op = ip;
const { stringify: ap } = go, { outputFileSync: sp } = Eo;
function lp(e, t, r) {
  const n = ap(t, r);
  sp(e, n, r);
}
var cp = lp;
const up = Ce.fromPromise, Te = Jh;
Te.outputJson = up(op);
Te.outputJsonSync = cp;
Te.outputJSON = Te.outputJson;
Te.outputJSONSync = Te.outputJsonSync;
Te.writeJSON = Te.writeJson;
Te.writeJSONSync = Te.writeJsonSync;
Te.readJSON = Te.readJson;
Te.readJSONSync = Te.readJsonSync;
var fp = Te;
const dp = be, Wi = ie, hp = po.copy, Kl = Mn.remove, pp = Ve.mkdirp, mp = $t.pathExists, Ia = Qt;
function gp(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Ia.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    Ia.checkParentPaths(e, s, t, "move", (E) => {
      if (E) return n(E);
      if (Ep(t)) return Ra(e, t, i, l, n);
      pp(Wi.dirname(t), (c) => c ? n(c) : Ra(e, t, i, l, n));
    });
  });
}
function Ep(e) {
  const t = Wi.dirname(e);
  return Wi.parse(t).root === t;
}
function Ra(e, t, r, n, i) {
  if (n) return vi(e, t, r, i);
  if (r)
    return Kl(t, (o) => o ? i(o) : vi(e, t, r, i));
  mp(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : vi(e, t, r, i));
}
function vi(e, t, r, n) {
  dp.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : yp(e, t, r, n) : n());
}
function yp(e, t, r, n) {
  hp(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : Kl(e, n));
}
var vp = gp;
const Jl = be, Vi = ie, wp = po.copySync, Ql = Mn.removeSync, _p = Ve.mkdirpSync, Na = Qt;
function Ap(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Na.checkPathsSync(e, t, "move", r);
  return Na.checkParentPathsSync(e, i, t, "move"), Sp(t) || _p(Vi.dirname(t)), Tp(e, t, n, o);
}
function Sp(e) {
  const t = Vi.dirname(e);
  return Vi.parse(t).root === t;
}
function Tp(e, t, r, n) {
  if (n) return wi(e, t, r);
  if (r)
    return Ql(t), wi(e, t, r);
  if (Jl.existsSync(t)) throw new Error("dest already exists.");
  return wi(e, t, r);
}
function wi(e, t, r) {
  try {
    Jl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Cp(e, t, r);
  }
}
function Cp(e, t, r) {
  return wp(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Ql(e);
}
var bp = Ap;
const $p = Ce.fromCallback;
var Op = {
  move: $p(vp),
  moveSync: bp
}, dt = {
  // Export promiseified graceful-fs:
  ...bt,
  // Export extra methods:
  ...po,
  ...dh,
  ...Bh,
  ...fp,
  ...Ve,
  ...Op,
  ...Eo,
  ...$t,
  ...Mn
}, lr = {}, yt = {}, Ee = {}, yo = {}, Me = {};
function Zl(e) {
  return typeof e > "u" || e === null;
}
function Ip(e) {
  return typeof e == "object" && e !== null;
}
function Rp(e) {
  return Array.isArray(e) ? e : Zl(e) ? [] : [e];
}
function Np(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Pp(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Dp(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Me.isNothing = Zl;
Me.isObject = Ip;
Me.toArray = Rp;
Me.repeat = Pp;
Me.isNegativeZero = Dp;
Me.extend = Np;
function ec(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Ir(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = ec(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ir.prototype = Object.create(Error.prototype);
Ir.prototype.constructor = Ir;
Ir.prototype.toString = function(t) {
  return this.name + ": " + ec(this, t);
};
var kr = Ir, Er = Me;
function _i(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function Ai(e, t) {
  return Er.repeat(" ", t - e.length) + e;
}
function Fp(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, E, c = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    E = _i(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      u
    ), s = Er.repeat(" ", t.indent) + Ai((e.line - l + 1).toString(), c) + " | " + E.str + `
` + s;
  for (E = _i(e.buffer, n[a], i[a], e.position, u), s += Er.repeat(" ", t.indent) + Ai((e.line + 1).toString(), c) + " | " + E.str + `
`, s += Er.repeat("-", t.indent + c + 3 + E.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    E = _i(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      u
    ), s += Er.repeat(" ", t.indent) + Ai((e.line + l + 1).toString(), c) + " | " + E.str + `
`;
  return s.replace(/\n$/, "");
}
var xp = Fp, Pa = kr, Lp = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Up = [
  "scalar",
  "sequence",
  "mapping"
];
function kp(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Mp(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Lp.indexOf(r) === -1)
      throw new Pa('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = kp(t.styleAliases || null), Up.indexOf(this.kind) === -1)
    throw new Pa('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var $e = Mp, cr = kr, Si = $e;
function Da(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function Bp() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Yi(e) {
  return this.extend(e);
}
Yi.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Si)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new cr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof Si))
      throw new cr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new cr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new cr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof Si))
      throw new cr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Yi.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Da(i, "implicit"), i.compiledExplicit = Da(i, "explicit"), i.compiledTypeMap = Bp(i.compiledImplicit, i.compiledExplicit), i;
};
var tc = Yi, Hp = $e, rc = new Hp("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), jp = $e, nc = new jp("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), qp = $e, ic = new qp("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Gp = tc, oc = new Gp({
  explicit: [
    rc,
    nc,
    ic
  ]
}), Wp = $e;
function Vp(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Yp() {
  return null;
}
function zp(e) {
  return e === null;
}
var ac = new Wp("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Vp,
  construct: Yp,
  predicate: zp,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), Xp = $e;
function Kp(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Jp(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Qp(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var sc = new Xp("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Kp,
  construct: Jp,
  predicate: Qp,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), Zp = Me, em = $e;
function tm(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function rm(e) {
  return 48 <= e && e <= 55;
}
function nm(e) {
  return 48 <= e && e <= 57;
}
function im(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!tm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!rm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!nm(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function om(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function am(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Zp.isNegativeZero(e);
}
var lc = new em("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: im,
  construct: om,
  predicate: am,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), cc = Me, sm = $e, lm = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function cm(e) {
  return !(e === null || !lm.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function um(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var fm = /^[-+]?[0-9]+e/;
function dm(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (cc.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), fm.test(r) ? r.replace("e", ".e") : r;
}
function hm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || cc.isNegativeZero(e));
}
var uc = new sm("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: cm,
  construct: um,
  predicate: hm,
  represent: dm,
  defaultStyle: "lowercase"
}), fc = oc.extend({
  implicit: [
    ac,
    sc,
    lc,
    uc
  ]
}), dc = fc, pm = $e, hc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), pc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function mm(e) {
  return e === null ? !1 : hc.exec(e) !== null || pc.exec(e) !== null;
}
function gm(e) {
  var t, r, n, i, o, a, s, l = 0, E = null, c, u, d;
  if (t = hc.exec(e), t === null && (t = pc.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], u = +(t[11] || 0), E = (c * 60 + u) * 6e4, t[9] === "-" && (E = -E)), d = new Date(Date.UTC(r, n, i, o, a, s, l)), E && d.setTime(d.getTime() - E), d;
}
function Em(e) {
  return e.toISOString();
}
var mc = new pm("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: mm,
  construct: gm,
  instanceOf: Date,
  represent: Em
}), ym = $e;
function vm(e) {
  return e === "<<" || e === null;
}
var gc = new ym("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: vm
}), wm = $e, vo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function _m(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = vo;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Am(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = vo, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Sm(e) {
  var t = "", r = 0, n, i, o = e.length, a = vo;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Tm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ec = new wm("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: _m,
  construct: Am,
  predicate: Tm,
  represent: Sm
}), Cm = $e, bm = Object.prototype.hasOwnProperty, $m = Object.prototype.toString;
function Om(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, $m.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (bm.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Im(e) {
  return e !== null ? e : [];
}
var yc = new Cm("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Om,
  construct: Im
}), Rm = $e, Nm = Object.prototype.toString;
function Pm(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Nm.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Dm(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var vc = new Rm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Pm,
  construct: Dm
}), Fm = $e, xm = Object.prototype.hasOwnProperty;
function Lm(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (xm.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function Um(e) {
  return e !== null ? e : {};
}
var wc = new Fm("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Lm,
  construct: Um
}), wo = dc.extend({
  implicit: [
    mc,
    gc
  ],
  explicit: [
    Ec,
    yc,
    vc,
    wc
  ]
}), wt = Me, _c = kr, km = xp, Mm = wo, ct = Object.prototype.hasOwnProperty, $n = 1, Ac = 2, Sc = 3, On = 4, Ti = 1, Bm = 2, Fa = 3, Hm = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, jm = /[\x85\u2028\u2029]/, qm = /[,\[\]\{\}]/, Tc = /^(?:!|!!|![a-z\-]+!)$/i, Cc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function xa(e) {
  return Object.prototype.toString.call(e);
}
function We(e) {
  return e === 10 || e === 13;
}
function St(e) {
  return e === 9 || e === 32;
}
function Re(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Lt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Gm(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Wm(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Vm(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function La(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Ym(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var bc = new Array(256), $c = new Array(256);
for (var Nt = 0; Nt < 256; Nt++)
  bc[Nt] = La(Nt) ? 1 : 0, $c[Nt] = La(Nt);
function zm(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Mm, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Oc(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = km(r), new _c(t, r);
}
function H(e, t) {
  throw Oc(e, t);
}
function In(e, t) {
  e.onWarning && e.onWarning.call(null, Oc(e, t));
}
var Ua = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && H(t, "duplication of %YAML directive"), n.length !== 1 && H(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && H(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && H(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && In(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && H(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Tc.test(i) || H(t, "ill-formed tag handle (first argument) of the TAG directive"), ct.call(t.tagMap, i) && H(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Cc.test(o) || H(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      H(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function st(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || H(e, "expected valid JSON character");
    else Hm.test(s) && H(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function ka(e, t, r, n) {
  var i, o, a, s;
  for (wt.isObject(r) || H(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], ct.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Ut(e, t, r, n, i, o, a, s, l) {
  var E, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), E = 0, c = i.length; E < c; E += 1)
      Array.isArray(i[E]) && H(e, "nested arrays are not supported inside keys"), typeof i == "object" && xa(i[E]) === "[object Object]" && (i[E] = "[object Object]");
  if (typeof i == "object" && xa(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (E = 0, c = o.length; E < c; E += 1)
        ka(e, t, o[E], r);
    else
      ka(e, t, o, r);
  else
    !e.json && !ct.call(r, i) && ct.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, H(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function _o(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : H(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function se(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; St(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (We(i))
      for (_o(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && In(e, "deficient indentation"), n;
}
function Hn(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Re(r)));
}
function Ao(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += wt.repeat(`
`, t - 1));
}
function Xm(e, t, r) {
  var n, i, o, a, s, l, E, c, u = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), Re(h) || Lt(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), Re(i) || r && Lt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Re(i) || r && Lt(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Re(n))
        break;
    } else {
      if (e.position === e.lineStart && Hn(e) || r && Lt(h))
        break;
      if (We(h))
        if (l = e.line, E = e.lineStart, c = e.lineIndent, se(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = E, e.lineIndent = c;
          break;
        }
    }
    s && (st(e, o, a, !1), Ao(e, e.line - l), o = a = e.position, s = !1), St(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return st(e, o, a, !1), e.result ? !0 : (e.kind = u, e.result = d, !1);
}
function Km(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (st(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else We(r) ? (st(e, n, i, !0), Ao(e, se(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Hn(e) ? H(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  H(e, "unexpected end of the stream within a single quoted scalar");
}
function Jm(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return st(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (st(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), We(s))
        se(e, !1, t);
      else if (s < 256 && bc[s])
        e.result += $c[s], e.position++;
      else if ((a = Wm(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = Gm(s)) >= 0 ? o = (o << 4) + a : H(e, "expected hexadecimal character");
        e.result += Ym(o), e.position++;
      } else
        H(e, "unknown escape sequence");
      r = n = e.position;
    } else We(s) ? (st(e, r, n, !0), Ao(e, se(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Hn(e) ? H(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  H(e, "unexpected end of the stream within a double quoted scalar");
}
function Qm(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, E, c, u, d, h, w = /* @__PURE__ */ Object.create(null), y, A, S, $;
  if ($ = e.input.charCodeAt(e.position), $ === 91)
    c = 93, h = !1, s = [];
  else if ($ === 123)
    c = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), $ = e.input.charCodeAt(++e.position); $ !== 0; ) {
    if (se(e, !0, t), $ = e.input.charCodeAt(e.position), $ === c)
      return e.position++, e.tag = a, e.anchor = l, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? $ === 44 && H(e, "expected the node content, but found ','") : H(e, "missed comma between flow collection entries"), A = y = S = null, u = d = !1, $ === 63 && (E = e.input.charCodeAt(e.position + 1), Re(E) && (u = d = !0, e.position++, se(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, zt(e, t, $n, !1, !0), A = e.tag, y = e.result, se(e, !0, t), $ = e.input.charCodeAt(e.position), (d || e.line === n) && $ === 58 && (u = !0, $ = e.input.charCodeAt(++e.position), se(e, !0, t), zt(e, t, $n, !1, !0), S = e.result), h ? Ut(e, s, w, A, y, S, n, i, o) : u ? s.push(Ut(e, null, w, A, y, S, n, i, o)) : s.push(y), se(e, !0, t), $ = e.input.charCodeAt(e.position), $ === 44 ? (r = !0, $ = e.input.charCodeAt(++e.position)) : r = !1;
  }
  H(e, "unexpected end of the stream within a flow collection");
}
function Zm(e, t) {
  var r, n, i = Ti, o = !1, a = !1, s = t, l = 0, E = !1, c, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Ti === i ? i = u === 43 ? Fa : Bm : H(e, "repeat of a chomping mode identifier");
    else if ((c = Vm(u)) >= 0)
      c === 0 ? H(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? H(e, "repeat of an indentation width identifier") : (s = t + c - 1, a = !0);
    else
      break;
  if (St(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (St(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!We(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (_o(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), We(u)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Fa ? e.result += wt.repeat(`
`, o ? 1 + l : l) : i === Ti && o && (e.result += `
`);
      break;
    }
    for (n ? St(u) ? (E = !0, e.result += wt.repeat(`
`, o ? 1 + l : l)) : E ? (E = !1, e.result += wt.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += wt.repeat(`
`, l) : e.result += wt.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !We(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    st(e, r, e.position, !1);
  }
  return !0;
}
function Ma(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, H(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !Re(a)))); ) {
    if (s = !0, e.position++, se(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, zt(e, t, Sc, !1, !0), o.push(e.result), se(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      H(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function eg(e, t, r) {
  var n, i, o, a, s, l, E = e.tag, c = e.anchor, u = {}, d = /* @__PURE__ */ Object.create(null), h = null, w = null, y = null, A = !1, S = !1, $;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), $ = e.input.charCodeAt(e.position); $ !== 0; ) {
    if (!A && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, H(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, ($ === 63 || $ === 58) && Re(n))
      $ === 63 ? (A && (Ut(e, u, d, h, w, null, a, s, l), h = w = y = null), S = !0, A = !0, i = !0) : A ? (A = !1, i = !0) : H(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, $ = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !zt(e, r, Ac, !1, !0))
        break;
      if (e.line === o) {
        for ($ = e.input.charCodeAt(e.position); St($); )
          $ = e.input.charCodeAt(++e.position);
        if ($ === 58)
          $ = e.input.charCodeAt(++e.position), Re($) || H(e, "a whitespace character is expected after the key-value separator within a block mapping"), A && (Ut(e, u, d, h, w, null, a, s, l), h = w = y = null), S = !0, A = !1, i = !1, h = e.tag, w = e.result;
        else if (S)
          H(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = E, e.anchor = c, !0;
      } else if (S)
        H(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = E, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (A && (a = e.line, s = e.lineStart, l = e.position), zt(e, t, On, !0, i) && (A ? w = e.result : y = e.result), A || (Ut(e, u, d, h, w, y, a, s, l), h = w = y = null), se(e, !0, -1), $ = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && $ !== 0)
      H(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return A && Ut(e, u, d, h, w, null, a, s, l), S && (e.tag = E, e.anchor = c, e.kind = "mapping", e.result = u), S;
}
function tg(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && H(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : H(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Re(a); )
      a === 33 && (n ? H(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Tc.test(i) || H(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), qm.test(o) && H(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Cc.test(o) && H(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    H(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : ct.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : H(e, 'undeclared tag handle "' + i + '"'), !0;
}
function rg(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && H(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Re(r) && !Lt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && H(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function ng(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Re(n) && !Lt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && H(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), ct.call(e.anchorMap, r) || H(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], se(e, !0, -1), !0;
}
function zt(e, t, r, n, i) {
  var o, a, s, l = 1, E = !1, c = !1, u, d, h, w, y, A;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = On === r || Sc === r, n && se(e, !0, -1) && (E = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; tg(e) || rg(e); )
      se(e, !0, -1) ? (E = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = E || i), (l === 1 || On === r) && ($n === r || Ac === r ? y = t : y = t + 1, A = e.position - e.lineStart, l === 1 ? s && (Ma(e, A) || eg(e, A, y)) || Qm(e, y) ? c = !0 : (a && Zm(e, y) || Km(e, y) || Jm(e, y) ? c = !0 : ng(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && H(e, "alias node should not have any properties")) : Xm(e, y, $n === r) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = s && Ma(e, A))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && H(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, d = e.implicitTypes.length; u < d; u += 1)
      if (w = e.implicitTypes[u], w.resolve(e.result)) {
        e.result = w.construct(e.result), e.tag = w.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (ct.call(e.typeMap[e.kind || "fallback"], e.tag))
      w = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (w = null, h = e.typeMap.multi[e.kind || "fallback"], u = 0, d = h.length; u < d; u += 1)
        if (e.tag.slice(0, h[u].tag.length) === h[u].tag) {
          w = h[u];
          break;
        }
    w || H(e, "unknown tag !<" + e.tag + ">"), e.result !== null && w.kind !== e.kind && H(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + w.kind + '", not "' + e.kind + '"'), w.resolve(e.result, e.tag) ? (e.result = w.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : H(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function ig(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (se(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Re(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && H(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; St(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !We(a));
        break;
      }
      if (We(a)) break;
      for (r = e.position; a !== 0 && !Re(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && _o(e), ct.call(Ua, n) ? Ua[n](e, n, i) : In(e, 'unknown document directive "' + n + '"');
  }
  if (se(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, se(e, !0, -1)) : o && H(e, "directives end mark is expected"), zt(e, e.lineIndent - 1, On, !1, !0), se(e, !0, -1), e.checkLineBreaks && jm.test(e.input.slice(t, e.position)) && In(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Hn(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, se(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    H(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Ic(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new zm(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, H(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    ig(r);
  return r.documents;
}
function og(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Ic(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function ag(e, t) {
  var r = Ic(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new _c("expected a single document in the stream, but found more");
  }
}
yo.loadAll = og;
yo.load = ag;
var Rc = {}, jn = Me, Mr = kr, sg = wo, Nc = Object.prototype.toString, Pc = Object.prototype.hasOwnProperty, So = 65279, lg = 9, Rr = 10, cg = 13, ug = 32, fg = 33, dg = 34, zi = 35, hg = 37, pg = 38, mg = 39, gg = 42, Dc = 44, Eg = 45, Rn = 58, yg = 61, vg = 62, wg = 63, _g = 64, Fc = 91, xc = 93, Ag = 96, Lc = 123, Sg = 124, Uc = 125, _e = {};
_e[0] = "\\0";
_e[7] = "\\a";
_e[8] = "\\b";
_e[9] = "\\t";
_e[10] = "\\n";
_e[11] = "\\v";
_e[12] = "\\f";
_e[13] = "\\r";
_e[27] = "\\e";
_e[34] = '\\"';
_e[92] = "\\\\";
_e[133] = "\\N";
_e[160] = "\\_";
_e[8232] = "\\L";
_e[8233] = "\\P";
var Tg = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Cg = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function bg(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Pc.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function $g(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Mr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + jn.repeat("0", n - t.length) + t;
}
var Og = 1, Nr = 2;
function Ig(e) {
  this.schema = e.schema || sg, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = jn.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = bg(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Nr : Og, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ba(e, t) {
  for (var r = jn.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function Xi(e, t) {
  return `
` + jn.repeat(" ", e.indent * t);
}
function Rg(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Nn(e) {
  return e === ug || e === lg;
}
function Pr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== So || 65536 <= e && e <= 1114111;
}
function Ha(e) {
  return Pr(e) && e !== So && e !== cg && e !== Rr;
}
function ja(e, t, r) {
  var n = Ha(e), i = n && !Nn(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Dc && e !== Fc && e !== xc && e !== Lc && e !== Uc) && e !== zi && !(t === Rn && !i) || Ha(t) && !Nn(t) && e === zi || t === Rn && i
  );
}
function Ng(e) {
  return Pr(e) && e !== So && !Nn(e) && e !== Eg && e !== wg && e !== Rn && e !== Dc && e !== Fc && e !== xc && e !== Lc && e !== Uc && e !== zi && e !== pg && e !== gg && e !== fg && e !== Sg && e !== yg && e !== vg && e !== mg && e !== dg && e !== hg && e !== _g && e !== Ag;
}
function Pg(e) {
  return !Nn(e) && e !== Rn;
}
function yr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function kc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Mc = 1, Ki = 2, Bc = 3, Hc = 4, xt = 5;
function Dg(e, t, r, n, i, o, a, s) {
  var l, E = 0, c = null, u = !1, d = !1, h = n !== -1, w = -1, y = Ng(yr(e, 0)) && Pg(yr(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; E >= 65536 ? l += 2 : l++) {
      if (E = yr(e, l), !Pr(E))
        return xt;
      y = y && ja(E, c, s), c = E;
    }
  else {
    for (l = 0; l < e.length; E >= 65536 ? l += 2 : l++) {
      if (E = yr(e, l), E === Rr)
        u = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        l - w - 1 > n && e[w + 1] !== " ", w = l);
      else if (!Pr(E))
        return xt;
      y = y && ja(E, c, s), c = E;
    }
    d = d || h && l - w - 1 > n && e[w + 1] !== " ";
  }
  return !u && !d ? y && !a && !i(e) ? Mc : o === Nr ? xt : Ki : r > 9 && kc(e) ? xt : a ? o === Nr ? xt : Ki : d ? Hc : Bc;
}
function Fg(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Nr ? '""' : "''";
    if (!e.noCompatMode && (Tg.indexOf(t) !== -1 || Cg.test(t)))
      return e.quotingType === Nr ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(E) {
      return Rg(e, E);
    }
    switch (Dg(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Mc:
        return t;
      case Ki:
        return "'" + t.replace(/'/g, "''") + "'";
      case Bc:
        return "|" + qa(t, e.indent) + Ga(Ba(t, o));
      case Hc:
        return ">" + qa(t, e.indent) + Ga(Ba(xg(t, a), o));
      case xt:
        return '"' + Lg(t) + '"';
      default:
        throw new Mr("impossible error: invalid scalar style");
    }
  }();
}
function qa(e, t) {
  var r = kc(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Ga(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function xg(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var E = e.indexOf(`
`);
    return E = E !== -1 ? E : e.length, r.lastIndex = E, Wa(e.slice(0, E), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Wa(l, t), i = o;
  }
  return n;
}
function Wa(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function Lg(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = yr(e, i), n = _e[r], !n && Pr(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || $g(r);
  return t;
}
function Ug(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Ke(e, t, s, !1, !1) || typeof s > "u" && Ke(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Va(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (Ke(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Ke(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Xi(e, t)), e.dump && Rr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function kg(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, E, c;
  for (a = 0, s = o.length; a < s; a += 1)
    c = "", n !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[a], E = r[l], e.replacer && (E = e.replacer.call(r, l, E)), Ke(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ke(e, t, E, !1, !1) && (c += e.dump, n += c));
  e.tag = i, e.dump = "{" + n + "}";
}
function Mg(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, E, c, u, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Mr("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    d = "", (!n || i !== "") && (d += Xi(e, t)), E = a[s], c = r[E], e.replacer && (c = e.replacer.call(r, E, c)), Ke(e, t + 1, E, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Rr === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, u && (d += Xi(e, t)), Ke(e, t + 1, c, !0, u) && (e.dump && Rr === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = o, e.dump = i || "{}";
}
function Ya(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, Nc.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (Pc.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Mr("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Ke(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Ya(e, r, !1) || Ya(e, r, !0);
  var s = Nc.call(e.dump), l = n, E;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var c = s === "[object Object]" || s === "[object Array]", u, d;
  if (c && (u = e.duplicates.indexOf(r), d = u !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (c && d && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (Mg(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (kg(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? Va(e, t - 1, e.dump, i) : Va(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (Ug(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && Fg(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Mr("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (E = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? E = "!" + E : E.slice(0, 18) === "tag:yaml.org,2002:" ? E = "!!" + E.slice(18) : E = "!<" + E + ">", e.dump = E + " " + e.dump);
  }
  return !0;
}
function Bg(e, t) {
  var r = [], n = [], i, o;
  for (Ji(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function Ji(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        Ji(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        Ji(e[n[i]], t, r);
}
function Hg(e, t) {
  t = t || {};
  var r = new Ig(t);
  r.noRefs || Bg(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ke(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Rc.dump = Hg;
var jc = yo, jg = Rc;
function To(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ee.Type = $e;
Ee.Schema = tc;
Ee.FAILSAFE_SCHEMA = oc;
Ee.JSON_SCHEMA = fc;
Ee.CORE_SCHEMA = dc;
Ee.DEFAULT_SCHEMA = wo;
Ee.load = jc.load;
Ee.loadAll = jc.loadAll;
Ee.dump = jg.dump;
Ee.YAMLException = kr;
Ee.types = {
  binary: Ec,
  float: uc,
  map: ic,
  null: ac,
  pairs: vc,
  set: wc,
  timestamp: mc,
  bool: sc,
  int: lc,
  merge: gc,
  omap: yc,
  seq: nc,
  str: rc
};
Ee.safeLoad = To("safeLoad", "load");
Ee.safeLoadAll = To("safeLoadAll", "loadAll");
Ee.safeDump = To("safeDump", "dump");
var qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.Lazy = void 0;
class qg {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
qn.Lazy = qg;
var Qi = { exports: {} };
const Gg = "2.0.0", qc = 256, Wg = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Vg = 16, Yg = qc - 6, zg = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Gn = {
  MAX_LENGTH: qc,
  MAX_SAFE_COMPONENT_LENGTH: Vg,
  MAX_SAFE_BUILD_LENGTH: Yg,
  MAX_SAFE_INTEGER: Wg,
  RELEASE_TYPES: zg,
  SEMVER_SPEC_VERSION: Gg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Xg = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Wn = Xg;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Gn, o = Wn;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], E = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [d, n]
  ], w = (A) => {
    for (const [S, $] of h)
      A = A.split(`${S}*`).join(`${S}{0,${$}}`).split(`${S}+`).join(`${S}{1,${$}}`);
    return A;
  }, y = (A, S, $) => {
    const U = w(S), x = u++;
    o(A, x, S), c[A] = x, l[x] = S, E[x] = U, a[x] = new RegExp(S, $ ? "g" : void 0), s[x] = new RegExp(U, $ ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NUMERICIDENTIFIER]}|${l[c.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NUMERICIDENTIFIERLOOSE]}|${l[c.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${d}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Qi, Qi.exports);
var Br = Qi.exports;
const Kg = Object.freeze({ loose: !0 }), Jg = Object.freeze({}), Qg = (e) => e ? typeof e != "object" ? Kg : e : Jg;
var Co = Qg;
const za = /^[0-9]+$/, Gc = (e, t) => {
  const r = za.test(e), n = za.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Zg = (e, t) => Gc(t, e);
var Wc = {
  compareIdentifiers: Gc,
  rcompareIdentifiers: Zg
};
const cn = Wn, { MAX_LENGTH: Xa, MAX_SAFE_INTEGER: un } = Gn, { safeRe: Ka, safeSrc: Ja, t: fn } = Br, e0 = Co, { compareIdentifiers: Pt } = Wc;
let t0 = class Ge {
  constructor(t, r) {
    if (r = e0(r), t instanceof Ge) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Xa)
      throw new TypeError(
        `version is longer than ${Xa} characters`
      );
    cn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ka[fn.LOOSE] : Ka[fn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > un || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > un || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > un || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < un)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (cn("SemVer.compare", this.version, this.options, t), !(t instanceof Ge)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Ge(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Ge || (t = new Ge(t, this.options)), Pt(this.major, t.major) || Pt(this.minor, t.minor) || Pt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Ge || (t = new Ge(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (cn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Pt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Ge || (t = new Ge(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (cn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Pt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = new RegExp(`^${this.options.loose ? Ja[fn.PRERELEASELOOSE] : Ja[fn.PRERELEASE]}$`), o = `-${r}`.match(i);
        if (!o || o[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), Pt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Oe = t0;
const Qa = Oe, r0 = (e, t, r = !1) => {
  if (e instanceof Qa)
    return e;
  try {
    return new Qa(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Zt = r0;
const n0 = Zt, i0 = (e, t) => {
  const r = n0(e, t);
  return r ? r.version : null;
};
var o0 = i0;
const a0 = Zt, s0 = (e, t) => {
  const r = a0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var l0 = s0;
const Za = Oe, c0 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Za(
      e instanceof Za ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var u0 = c0;
const es = Zt, f0 = (e, t) => {
  const r = es(e, null, !0), n = es(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return r.major !== n.major ? c + "major" : r.minor !== n.minor ? c + "minor" : r.patch !== n.patch ? c + "patch" : "prerelease";
};
var d0 = f0;
const h0 = Oe, p0 = (e, t) => new h0(e, t).major;
var m0 = p0;
const g0 = Oe, E0 = (e, t) => new g0(e, t).minor;
var y0 = E0;
const v0 = Oe, w0 = (e, t) => new v0(e, t).patch;
var _0 = w0;
const A0 = Zt, S0 = (e, t) => {
  const r = A0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var T0 = S0;
const ts = Oe, C0 = (e, t, r) => new ts(e, r).compare(new ts(t, r));
var Be = C0;
const b0 = Be, $0 = (e, t, r) => b0(t, e, r);
var O0 = $0;
const I0 = Be, R0 = (e, t) => I0(e, t, !0);
var N0 = R0;
const rs = Oe, P0 = (e, t, r) => {
  const n = new rs(e, r), i = new rs(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var bo = P0;
const D0 = bo, F0 = (e, t) => e.sort((r, n) => D0(r, n, t));
var x0 = F0;
const L0 = bo, U0 = (e, t) => e.sort((r, n) => L0(n, r, t));
var k0 = U0;
const M0 = Be, B0 = (e, t, r) => M0(e, t, r) > 0;
var Vn = B0;
const H0 = Be, j0 = (e, t, r) => H0(e, t, r) < 0;
var $o = j0;
const q0 = Be, G0 = (e, t, r) => q0(e, t, r) === 0;
var Vc = G0;
const W0 = Be, V0 = (e, t, r) => W0(e, t, r) !== 0;
var Yc = V0;
const Y0 = Be, z0 = (e, t, r) => Y0(e, t, r) >= 0;
var Oo = z0;
const X0 = Be, K0 = (e, t, r) => X0(e, t, r) <= 0;
var Io = K0;
const J0 = Vc, Q0 = Yc, Z0 = Vn, eE = Oo, tE = $o, rE = Io, nE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return J0(e, r, n);
    case "!=":
      return Q0(e, r, n);
    case ">":
      return Z0(e, r, n);
    case ">=":
      return eE(e, r, n);
    case "<":
      return tE(e, r, n);
    case "<=":
      return rE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var zc = nE;
const iE = Oe, oE = Zt, { safeRe: dn, t: hn } = Br, aE = (e, t) => {
  if (e instanceof iE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? dn[hn.COERCEFULL] : dn[hn.COERCE]);
  else {
    const l = t.includePrerelease ? dn[hn.COERCERTLFULL] : dn[hn.COERCERTL];
    let E;
    for (; (E = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || E.index + E[0].length !== r.index + r[0].length) && (r = E), l.lastIndex = E.index + E[1].length + E[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return oE(`${n}.${i}.${o}${a}${s}`, t);
};
var sE = aE;
class lE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var cE = lE, Ci, ns;
function He() {
  if (ns) return Ci;
  ns = 1;
  const e = /\s+/g;
  class t {
    constructor(C, P) {
      if (P = i(P), C instanceof t)
        return C.loose === !!P.loose && C.includePrerelease === !!P.includePrerelease ? C : new t(C.raw, P);
      if (C instanceof o)
        return this.raw = C.value, this.set = [[C]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = C.trim().replace(e, " "), this.set = this.raw.split("||").map((b) => this.parseRange(b.trim())).filter((b) => b.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const b = this.set[0];
        if (this.set = this.set.filter((L) => !y(L[0])), this.set.length === 0)
          this.set = [b];
        else if (this.set.length > 1) {
          for (const L of this.set)
            if (L.length === 1 && A(L[0])) {
              this.set = [L];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let C = 0; C < this.set.length; C++) {
          C > 0 && (this.formatted += "||");
          const P = this.set[C];
          for (let b = 0; b < P.length; b++)
            b > 0 && (this.formatted += " "), this.formatted += P[b].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(C) {
      const b = ((this.options.includePrerelease && h) | (this.options.loose && w)) + ":" + C, L = n.get(b);
      if (L)
        return L;
      const D = this.options.loose, q = D ? l[E.HYPHENRANGELOOSE] : l[E.HYPHENRANGE];
      C = C.replace(q, j(this.options.includePrerelease)), a("hyphen replace", C), C = C.replace(l[E.COMPARATORTRIM], c), a("comparator trim", C), C = C.replace(l[E.TILDETRIM], u), a("tilde trim", C), C = C.replace(l[E.CARETTRIM], d), a("caret trim", C);
      let z = C.split(" ").map((W) => $(W, this.options)).join(" ").split(/\s+/).map((W) => B(W, this.options));
      D && (z = z.filter((W) => (a("loose invalid filter", W, this.options), !!W.match(l[E.COMPARATORLOOSE])))), a("range list", z);
      const V = /* @__PURE__ */ new Map(), K = z.map((W) => new o(W, this.options));
      for (const W of K) {
        if (y(W))
          return [W];
        V.set(W.value, W);
      }
      V.size > 1 && V.has("") && V.delete("");
      const ce = [...V.values()];
      return n.set(b, ce), ce;
    }
    intersects(C, P) {
      if (!(C instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((b) => S(b, P) && C.set.some((L) => S(L, P) && b.every((D) => L.every((q) => D.intersects(q, P)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(C) {
      if (!C)
        return !1;
      if (typeof C == "string")
        try {
          C = new s(C, this.options);
        } catch {
          return !1;
        }
      for (let P = 0; P < this.set.length; P++)
        if (Y(this.set[P], C, this.options))
          return !0;
      return !1;
    }
  }
  Ci = t;
  const r = cE, n = new r(), i = Co, o = Yn(), a = Wn, s = Oe, {
    safeRe: l,
    t: E,
    comparatorTrimReplace: c,
    tildeTrimReplace: u,
    caretTrimReplace: d
  } = Br, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: w } = Gn, y = (N) => N.value === "<0.0.0-0", A = (N) => N.value === "", S = (N, C) => {
    let P = !0;
    const b = N.slice();
    let L = b.pop();
    for (; P && b.length; )
      P = b.every((D) => L.intersects(D, C)), L = b.pop();
    return P;
  }, $ = (N, C) => (a("comp", N, C), N = T(N, C), a("caret", N), N = x(N, C), a("tildes", N), N = F(N, C), a("xrange", N), N = M(N, C), a("stars", N), N), U = (N) => !N || N.toLowerCase() === "x" || N === "*", x = (N, C) => N.trim().split(/\s+/).map((P) => G(P, C)).join(" "), G = (N, C) => {
    const P = C.loose ? l[E.TILDELOOSE] : l[E.TILDE];
    return N.replace(P, (b, L, D, q, z) => {
      a("tilde", N, b, L, D, q, z);
      let V;
      return U(L) ? V = "" : U(D) ? V = `>=${L}.0.0 <${+L + 1}.0.0-0` : U(q) ? V = `>=${L}.${D}.0 <${L}.${+D + 1}.0-0` : z ? (a("replaceTilde pr", z), V = `>=${L}.${D}.${q}-${z} <${L}.${+D + 1}.0-0`) : V = `>=${L}.${D}.${q} <${L}.${+D + 1}.0-0`, a("tilde return", V), V;
    });
  }, T = (N, C) => N.trim().split(/\s+/).map((P) => I(P, C)).join(" "), I = (N, C) => {
    a("caret", N, C);
    const P = C.loose ? l[E.CARETLOOSE] : l[E.CARET], b = C.includePrerelease ? "-0" : "";
    return N.replace(P, (L, D, q, z, V) => {
      a("caret", N, L, D, q, z, V);
      let K;
      return U(D) ? K = "" : U(q) ? K = `>=${D}.0.0${b} <${+D + 1}.0.0-0` : U(z) ? D === "0" ? K = `>=${D}.${q}.0${b} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.0${b} <${+D + 1}.0.0-0` : V ? (a("replaceCaret pr", V), D === "0" ? q === "0" ? K = `>=${D}.${q}.${z}-${V} <${D}.${q}.${+z + 1}-0` : K = `>=${D}.${q}.${z}-${V} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.${z}-${V} <${+D + 1}.0.0-0`) : (a("no pr"), D === "0" ? q === "0" ? K = `>=${D}.${q}.${z}${b} <${D}.${q}.${+z + 1}-0` : K = `>=${D}.${q}.${z}${b} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.${z} <${+D + 1}.0.0-0`), a("caret return", K), K;
    });
  }, F = (N, C) => (a("replaceXRanges", N, C), N.split(/\s+/).map((P) => g(P, C)).join(" ")), g = (N, C) => {
    N = N.trim();
    const P = C.loose ? l[E.XRANGELOOSE] : l[E.XRANGE];
    return N.replace(P, (b, L, D, q, z, V) => {
      a("xRange", N, b, L, D, q, z, V);
      const K = U(D), ce = K || U(q), W = ce || U(z), je = W;
      return L === "=" && je && (L = ""), V = C.includePrerelease ? "-0" : "", K ? L === ">" || L === "<" ? b = "<0.0.0-0" : b = "*" : L && je ? (ce && (q = 0), z = 0, L === ">" ? (L = ">=", ce ? (D = +D + 1, q = 0, z = 0) : (q = +q + 1, z = 0)) : L === "<=" && (L = "<", ce ? D = +D + 1 : q = +q + 1), L === "<" && (V = "-0"), b = `${L + D}.${q}.${z}${V}`) : ce ? b = `>=${D}.0.0${V} <${+D + 1}.0.0-0` : W && (b = `>=${D}.${q}.0${V} <${D}.${+q + 1}.0-0`), a("xRange return", b), b;
    });
  }, M = (N, C) => (a("replaceStars", N, C), N.trim().replace(l[E.STAR], "")), B = (N, C) => (a("replaceGTE0", N, C), N.trim().replace(l[C.includePrerelease ? E.GTE0PRE : E.GTE0], "")), j = (N) => (C, P, b, L, D, q, z, V, K, ce, W, je) => (U(b) ? P = "" : U(L) ? P = `>=${b}.0.0${N ? "-0" : ""}` : U(D) ? P = `>=${b}.${L}.0${N ? "-0" : ""}` : q ? P = `>=${P}` : P = `>=${P}${N ? "-0" : ""}`, U(K) ? V = "" : U(ce) ? V = `<${+K + 1}.0.0-0` : U(W) ? V = `<${K}.${+ce + 1}.0-0` : je ? V = `<=${K}.${ce}.${W}-${je}` : N ? V = `<${K}.${ce}.${+W + 1}-0` : V = `<=${V}`, `${P} ${V}`.trim()), Y = (N, C, P) => {
    for (let b = 0; b < N.length; b++)
      if (!N[b].test(C))
        return !1;
    if (C.prerelease.length && !P.includePrerelease) {
      for (let b = 0; b < N.length; b++)
        if (a(N[b].semver), N[b].semver !== o.ANY && N[b].semver.prerelease.length > 0) {
          const L = N[b].semver;
          if (L.major === C.major && L.minor === C.minor && L.patch === C.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ci;
}
var bi, is;
function Yn() {
  if (is) return bi;
  is = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, u) {
      if (u = r(u), c instanceof t) {
        if (c.loose === !!u.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, u), this.options = u, this.loose = !!u.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = c.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new s(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, u) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, u).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, u).test(c.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, u) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, u) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  bi = t;
  const r = Co, { safeRe: n, t: i } = Br, o = zc, a = Wn, s = Oe, l = He();
  return bi;
}
const uE = He(), fE = (e, t, r) => {
  try {
    t = new uE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var zn = fE;
const dE = He(), hE = (e, t) => new dE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var pE = hE;
const mE = Oe, gE = He(), EE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new gE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new mE(n, r));
  }), n;
};
var yE = EE;
const vE = Oe, wE = He(), _E = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new wE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new vE(n, r));
  }), n;
};
var AE = _E;
const $i = Oe, SE = He(), os = Vn, TE = (e, t) => {
  e = new SE(e, t);
  let r = new $i("0.0.0");
  if (e.test(r) || (r = new $i("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new $i(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || os(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || os(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var CE = TE;
const bE = He(), $E = (e, t) => {
  try {
    return new bE(e, t).range || "*";
  } catch {
    return null;
  }
};
var OE = $E;
const IE = Oe, Xc = Yn(), { ANY: RE } = Xc, NE = He(), PE = zn, as = Vn, ss = $o, DE = Io, FE = Oo, xE = (e, t, r, n) => {
  e = new IE(e, n), t = new NE(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = as, o = DE, a = ss, s = ">", l = ">=";
      break;
    case "<":
      i = ss, o = FE, a = as, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (PE(e, t, n))
    return !1;
  for (let E = 0; E < t.set.length; ++E) {
    const c = t.set[E];
    let u = null, d = null;
    if (c.forEach((h) => {
      h.semver === RE && (h = new Xc(">=0.0.0")), u = u || h, d = d || h, i(h.semver, u.semver, n) ? u = h : a(h.semver, d.semver, n) && (d = h);
    }), u.operator === s || u.operator === l || (!d.operator || d.operator === s) && o(e, d.semver))
      return !1;
    if (d.operator === l && a(e, d.semver))
      return !1;
  }
  return !0;
};
var Ro = xE;
const LE = Ro, UE = (e, t, r) => LE(e, t, ">", r);
var kE = UE;
const ME = Ro, BE = (e, t, r) => ME(e, t, "<", r);
var HE = BE;
const ls = He(), jE = (e, t, r) => (e = new ls(e, r), t = new ls(t, r), e.intersects(t, r));
var qE = jE;
const GE = zn, WE = Be;
var VE = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((c, u) => WE(c, u, r));
  for (const c of a)
    GE(c, t, r) ? (o = c, i || (i = c)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [c, u] of n)
    c === u ? s.push(c) : !u && c === a[0] ? s.push("*") : u ? c === a[0] ? s.push(`<=${u}`) : s.push(`${c} - ${u}`) : s.push(`>=${c}`);
  const l = s.join(" || "), E = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < E.length ? l : t;
};
const cs = He(), No = Yn(), { ANY: Oi } = No, ur = zn, Po = Be, YE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new cs(e, r), t = new cs(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = XE(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, zE = [new No(">=0.0.0-0")], us = [new No(">=0.0.0")], XE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Oi) {
    if (t.length === 1 && t[0].semver === Oi)
      return !0;
    r.includePrerelease ? e = zE : e = us;
  }
  if (t.length === 1 && t[0].semver === Oi) {
    if (r.includePrerelease)
      return !0;
    t = us;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = fs(i, h, r) : h.operator === "<" || h.operator === "<=" ? o = ds(o, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Po(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !ur(h, String(i), r) || o && !ur(h, String(o), r))
      return null;
    for (const w of t)
      if (!ur(h, String(w), r))
        return !1;
    return !0;
  }
  let s, l, E, c, u = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (c = c || h.operator === ">" || h.operator === ">=", E = E || h.operator === "<" || h.operator === "<=", i) {
      if (d && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === d.major && h.semver.minor === d.minor && h.semver.patch === d.patch && (d = !1), h.operator === ">" || h.operator === ">=") {
        if (s = fs(i, h, r), s === h && s !== i)
          return !1;
      } else if (i.operator === ">=" && !ur(i.semver, String(h), r))
        return !1;
    }
    if (o) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (l = ds(o, h, r), l === h && l !== o)
          return !1;
      } else if (o.operator === "<=" && !ur(o.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && E && !o && a !== 0 || o && c && !i && a !== 0 || d || u);
}, fs = (e, t, r) => {
  if (!e)
    return t;
  const n = Po(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, ds = (e, t, r) => {
  if (!e)
    return t;
  const n = Po(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var KE = YE;
const Ii = Br, hs = Gn, JE = Oe, ps = Wc, QE = Zt, ZE = o0, ey = l0, ty = u0, ry = d0, ny = m0, iy = y0, oy = _0, ay = T0, sy = Be, ly = O0, cy = N0, uy = bo, fy = x0, dy = k0, hy = Vn, py = $o, my = Vc, gy = Yc, Ey = Oo, yy = Io, vy = zc, wy = sE, _y = Yn(), Ay = He(), Sy = zn, Ty = pE, Cy = yE, by = AE, $y = CE, Oy = OE, Iy = Ro, Ry = kE, Ny = HE, Py = qE, Dy = VE, Fy = KE;
var Kc = {
  parse: QE,
  valid: ZE,
  clean: ey,
  inc: ty,
  diff: ry,
  major: ny,
  minor: iy,
  patch: oy,
  prerelease: ay,
  compare: sy,
  rcompare: ly,
  compareLoose: cy,
  compareBuild: uy,
  sort: fy,
  rsort: dy,
  gt: hy,
  lt: py,
  eq: my,
  neq: gy,
  gte: Ey,
  lte: yy,
  cmp: vy,
  coerce: wy,
  Comparator: _y,
  Range: Ay,
  satisfies: Sy,
  toComparators: Ty,
  maxSatisfying: Cy,
  minSatisfying: by,
  minVersion: $y,
  validRange: Oy,
  outside: Iy,
  gtr: Ry,
  ltr: Ny,
  intersects: Py,
  simplifyRange: Dy,
  subset: Fy,
  SemVer: JE,
  re: Ii.re,
  src: Ii.src,
  tokens: Ii.t,
  SEMVER_SPEC_VERSION: hs.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: hs.RELEASE_TYPES,
  compareIdentifiers: ps.compareIdentifiers,
  rcompareIdentifiers: ps.rcompareIdentifiers
}, Hr = {}, Pn = { exports: {} };
Pn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", E = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", d = "[object Error]", h = "[object Function]", w = "[object GeneratorFunction]", y = "[object Map]", A = "[object Number]", S = "[object Null]", $ = "[object Object]", U = "[object Promise]", x = "[object Proxy]", G = "[object RegExp]", T = "[object Set]", I = "[object String]", F = "[object Symbol]", g = "[object Undefined]", M = "[object WeakMap]", B = "[object ArrayBuffer]", j = "[object DataView]", Y = "[object Float32Array]", N = "[object Float64Array]", C = "[object Int8Array]", P = "[object Int16Array]", b = "[object Int32Array]", L = "[object Uint8Array]", D = "[object Uint8ClampedArray]", q = "[object Uint16Array]", z = "[object Uint32Array]", V = /[\\^$.*+?()[\]{}|]/g, K = /^\[object .+?Constructor\]$/, ce = /^(?:0|[1-9]\d*)$/, W = {};
  W[Y] = W[N] = W[C] = W[P] = W[b] = W[L] = W[D] = W[q] = W[z] = !0, W[s] = W[l] = W[B] = W[c] = W[j] = W[u] = W[d] = W[h] = W[y] = W[A] = W[$] = W[G] = W[T] = W[I] = W[M] = !1;
  var je = typeof ke == "object" && ke && ke.Object === Object && ke, p = typeof self == "object" && self && self.Object === Object && self, f = je || p || Function("return this")(), O = t && !t.nodeType && t, _ = O && !0 && e && !e.nodeType && e, Q = _ && _.exports === O, te = Q && je.process, oe = function() {
    try {
      return te && te.binding && te.binding("util");
    } catch {
    }
  }(), pe = oe && oe.isTypedArray;
  function ye(m, v) {
    for (var R = -1, k = m == null ? 0 : m.length, ee = 0, X = []; ++R < k; ) {
      var ae = m[R];
      v(ae, R, m) && (X[ee++] = ae);
    }
    return X;
  }
  function Qe(m, v) {
    for (var R = -1, k = v.length, ee = m.length; ++R < k; )
      m[ee + R] = v[R];
    return m;
  }
  function le(m, v) {
    for (var R = -1, k = m == null ? 0 : m.length; ++R < k; )
      if (v(m[R], R, m))
        return !0;
    return !1;
  }
  function xe(m, v) {
    for (var R = -1, k = Array(m); ++R < m; )
      k[R] = v(R);
    return k;
  }
  function ii(m) {
    return function(v) {
      return m(v);
    };
  }
  function Vr(m, v) {
    return m.has(v);
  }
  function rr(m, v) {
    return m == null ? void 0 : m[v];
  }
  function Yr(m) {
    var v = -1, R = Array(m.size);
    return m.forEach(function(k, ee) {
      R[++v] = [ee, k];
    }), R;
  }
  function uu(m, v) {
    return function(R) {
      return m(v(R));
    };
  }
  function fu(m) {
    var v = -1, R = Array(m.size);
    return m.forEach(function(k) {
      R[++v] = k;
    }), R;
  }
  var du = Array.prototype, hu = Function.prototype, zr = Object.prototype, oi = f["__core-js_shared__"], Uo = hu.toString, qe = zr.hasOwnProperty, ko = function() {
    var m = /[^.]+$/.exec(oi && oi.keys && oi.keys.IE_PROTO || "");
    return m ? "Symbol(src)_1." + m : "";
  }(), Mo = zr.toString, pu = RegExp(
    "^" + Uo.call(qe).replace(V, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Bo = Q ? f.Buffer : void 0, Xr = f.Symbol, Ho = f.Uint8Array, jo = zr.propertyIsEnumerable, mu = du.splice, ht = Xr ? Xr.toStringTag : void 0, qo = Object.getOwnPropertySymbols, gu = Bo ? Bo.isBuffer : void 0, Eu = uu(Object.keys, Object), ai = It(f, "DataView"), nr = It(f, "Map"), si = It(f, "Promise"), li = It(f, "Set"), ci = It(f, "WeakMap"), ir = It(Object, "create"), yu = gt(ai), vu = gt(nr), wu = gt(si), _u = gt(li), Au = gt(ci), Go = Xr ? Xr.prototype : void 0, ui = Go ? Go.valueOf : void 0;
  function pt(m) {
    var v = -1, R = m == null ? 0 : m.length;
    for (this.clear(); ++v < R; ) {
      var k = m[v];
      this.set(k[0], k[1]);
    }
  }
  function Su() {
    this.__data__ = ir ? ir(null) : {}, this.size = 0;
  }
  function Tu(m) {
    var v = this.has(m) && delete this.__data__[m];
    return this.size -= v ? 1 : 0, v;
  }
  function Cu(m) {
    var v = this.__data__;
    if (ir) {
      var R = v[m];
      return R === n ? void 0 : R;
    }
    return qe.call(v, m) ? v[m] : void 0;
  }
  function bu(m) {
    var v = this.__data__;
    return ir ? v[m] !== void 0 : qe.call(v, m);
  }
  function $u(m, v) {
    var R = this.__data__;
    return this.size += this.has(m) ? 0 : 1, R[m] = ir && v === void 0 ? n : v, this;
  }
  pt.prototype.clear = Su, pt.prototype.delete = Tu, pt.prototype.get = Cu, pt.prototype.has = bu, pt.prototype.set = $u;
  function Ye(m) {
    var v = -1, R = m == null ? 0 : m.length;
    for (this.clear(); ++v < R; ) {
      var k = m[v];
      this.set(k[0], k[1]);
    }
  }
  function Ou() {
    this.__data__ = [], this.size = 0;
  }
  function Iu(m) {
    var v = this.__data__, R = Jr(v, m);
    if (R < 0)
      return !1;
    var k = v.length - 1;
    return R == k ? v.pop() : mu.call(v, R, 1), --this.size, !0;
  }
  function Ru(m) {
    var v = this.__data__, R = Jr(v, m);
    return R < 0 ? void 0 : v[R][1];
  }
  function Nu(m) {
    return Jr(this.__data__, m) > -1;
  }
  function Pu(m, v) {
    var R = this.__data__, k = Jr(R, m);
    return k < 0 ? (++this.size, R.push([m, v])) : R[k][1] = v, this;
  }
  Ye.prototype.clear = Ou, Ye.prototype.delete = Iu, Ye.prototype.get = Ru, Ye.prototype.has = Nu, Ye.prototype.set = Pu;
  function mt(m) {
    var v = -1, R = m == null ? 0 : m.length;
    for (this.clear(); ++v < R; ) {
      var k = m[v];
      this.set(k[0], k[1]);
    }
  }
  function Du() {
    this.size = 0, this.__data__ = {
      hash: new pt(),
      map: new (nr || Ye)(),
      string: new pt()
    };
  }
  function Fu(m) {
    var v = Qr(this, m).delete(m);
    return this.size -= v ? 1 : 0, v;
  }
  function xu(m) {
    return Qr(this, m).get(m);
  }
  function Lu(m) {
    return Qr(this, m).has(m);
  }
  function Uu(m, v) {
    var R = Qr(this, m), k = R.size;
    return R.set(m, v), this.size += R.size == k ? 0 : 1, this;
  }
  mt.prototype.clear = Du, mt.prototype.delete = Fu, mt.prototype.get = xu, mt.prototype.has = Lu, mt.prototype.set = Uu;
  function Kr(m) {
    var v = -1, R = m == null ? 0 : m.length;
    for (this.__data__ = new mt(); ++v < R; )
      this.add(m[v]);
  }
  function ku(m) {
    return this.__data__.set(m, n), this;
  }
  function Mu(m) {
    return this.__data__.has(m);
  }
  Kr.prototype.add = Kr.prototype.push = ku, Kr.prototype.has = Mu;
  function Ze(m) {
    var v = this.__data__ = new Ye(m);
    this.size = v.size;
  }
  function Bu() {
    this.__data__ = new Ye(), this.size = 0;
  }
  function Hu(m) {
    var v = this.__data__, R = v.delete(m);
    return this.size = v.size, R;
  }
  function ju(m) {
    return this.__data__.get(m);
  }
  function qu(m) {
    return this.__data__.has(m);
  }
  function Gu(m, v) {
    var R = this.__data__;
    if (R instanceof Ye) {
      var k = R.__data__;
      if (!nr || k.length < r - 1)
        return k.push([m, v]), this.size = ++R.size, this;
      R = this.__data__ = new mt(k);
    }
    return R.set(m, v), this.size = R.size, this;
  }
  Ze.prototype.clear = Bu, Ze.prototype.delete = Hu, Ze.prototype.get = ju, Ze.prototype.has = qu, Ze.prototype.set = Gu;
  function Wu(m, v) {
    var R = Zr(m), k = !R && sf(m), ee = !R && !k && fi(m), X = !R && !k && !ee && Zo(m), ae = R || k || ee || X, ue = ae ? xe(m.length, String) : [], me = ue.length;
    for (var re in m)
      qe.call(m, re) && !(ae && // Safari 9 has enumerable `arguments.length` in strict mode.
      (re == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ee && (re == "offset" || re == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      X && (re == "buffer" || re == "byteLength" || re == "byteOffset") || // Skip index properties.
      tf(re, me))) && ue.push(re);
    return ue;
  }
  function Jr(m, v) {
    for (var R = m.length; R--; )
      if (Xo(m[R][0], v))
        return R;
    return -1;
  }
  function Vu(m, v, R) {
    var k = v(m);
    return Zr(m) ? k : Qe(k, R(m));
  }
  function or(m) {
    return m == null ? m === void 0 ? g : S : ht && ht in Object(m) ? Zu(m) : af(m);
  }
  function Wo(m) {
    return ar(m) && or(m) == s;
  }
  function Vo(m, v, R, k, ee) {
    return m === v ? !0 : m == null || v == null || !ar(m) && !ar(v) ? m !== m && v !== v : Yu(m, v, R, k, Vo, ee);
  }
  function Yu(m, v, R, k, ee, X) {
    var ae = Zr(m), ue = Zr(v), me = ae ? l : et(m), re = ue ? l : et(v);
    me = me == s ? $ : me, re = re == s ? $ : re;
    var Ne = me == $, Le = re == $, ve = me == re;
    if (ve && fi(m)) {
      if (!fi(v))
        return !1;
      ae = !0, Ne = !1;
    }
    if (ve && !Ne)
      return X || (X = new Ze()), ae || Zo(m) ? Yo(m, v, R, k, ee, X) : Ju(m, v, me, R, k, ee, X);
    if (!(R & i)) {
      var Pe = Ne && qe.call(m, "__wrapped__"), De = Le && qe.call(v, "__wrapped__");
      if (Pe || De) {
        var tt = Pe ? m.value() : m, ze = De ? v.value() : v;
        return X || (X = new Ze()), ee(tt, ze, R, k, X);
      }
    }
    return ve ? (X || (X = new Ze()), Qu(m, v, R, k, ee, X)) : !1;
  }
  function zu(m) {
    if (!Qo(m) || nf(m))
      return !1;
    var v = Ko(m) ? pu : K;
    return v.test(gt(m));
  }
  function Xu(m) {
    return ar(m) && Jo(m.length) && !!W[or(m)];
  }
  function Ku(m) {
    if (!of(m))
      return Eu(m);
    var v = [];
    for (var R in Object(m))
      qe.call(m, R) && R != "constructor" && v.push(R);
    return v;
  }
  function Yo(m, v, R, k, ee, X) {
    var ae = R & i, ue = m.length, me = v.length;
    if (ue != me && !(ae && me > ue))
      return !1;
    var re = X.get(m);
    if (re && X.get(v))
      return re == v;
    var Ne = -1, Le = !0, ve = R & o ? new Kr() : void 0;
    for (X.set(m, v), X.set(v, m); ++Ne < ue; ) {
      var Pe = m[Ne], De = v[Ne];
      if (k)
        var tt = ae ? k(De, Pe, Ne, v, m, X) : k(Pe, De, Ne, m, v, X);
      if (tt !== void 0) {
        if (tt)
          continue;
        Le = !1;
        break;
      }
      if (ve) {
        if (!le(v, function(ze, Et) {
          if (!Vr(ve, Et) && (Pe === ze || ee(Pe, ze, R, k, X)))
            return ve.push(Et);
        })) {
          Le = !1;
          break;
        }
      } else if (!(Pe === De || ee(Pe, De, R, k, X))) {
        Le = !1;
        break;
      }
    }
    return X.delete(m), X.delete(v), Le;
  }
  function Ju(m, v, R, k, ee, X, ae) {
    switch (R) {
      case j:
        if (m.byteLength != v.byteLength || m.byteOffset != v.byteOffset)
          return !1;
        m = m.buffer, v = v.buffer;
      case B:
        return !(m.byteLength != v.byteLength || !X(new Ho(m), new Ho(v)));
      case c:
      case u:
      case A:
        return Xo(+m, +v);
      case d:
        return m.name == v.name && m.message == v.message;
      case G:
      case I:
        return m == v + "";
      case y:
        var ue = Yr;
      case T:
        var me = k & i;
        if (ue || (ue = fu), m.size != v.size && !me)
          return !1;
        var re = ae.get(m);
        if (re)
          return re == v;
        k |= o, ae.set(m, v);
        var Ne = Yo(ue(m), ue(v), k, ee, X, ae);
        return ae.delete(m), Ne;
      case F:
        if (ui)
          return ui.call(m) == ui.call(v);
    }
    return !1;
  }
  function Qu(m, v, R, k, ee, X) {
    var ae = R & i, ue = zo(m), me = ue.length, re = zo(v), Ne = re.length;
    if (me != Ne && !ae)
      return !1;
    for (var Le = me; Le--; ) {
      var ve = ue[Le];
      if (!(ae ? ve in v : qe.call(v, ve)))
        return !1;
    }
    var Pe = X.get(m);
    if (Pe && X.get(v))
      return Pe == v;
    var De = !0;
    X.set(m, v), X.set(v, m);
    for (var tt = ae; ++Le < me; ) {
      ve = ue[Le];
      var ze = m[ve], Et = v[ve];
      if (k)
        var ea = ae ? k(Et, ze, ve, v, m, X) : k(ze, Et, ve, m, v, X);
      if (!(ea === void 0 ? ze === Et || ee(ze, Et, R, k, X) : ea)) {
        De = !1;
        break;
      }
      tt || (tt = ve == "constructor");
    }
    if (De && !tt) {
      var en = m.constructor, tn = v.constructor;
      en != tn && "constructor" in m && "constructor" in v && !(typeof en == "function" && en instanceof en && typeof tn == "function" && tn instanceof tn) && (De = !1);
    }
    return X.delete(m), X.delete(v), De;
  }
  function zo(m) {
    return Vu(m, uf, ef);
  }
  function Qr(m, v) {
    var R = m.__data__;
    return rf(v) ? R[typeof v == "string" ? "string" : "hash"] : R.map;
  }
  function It(m, v) {
    var R = rr(m, v);
    return zu(R) ? R : void 0;
  }
  function Zu(m) {
    var v = qe.call(m, ht), R = m[ht];
    try {
      m[ht] = void 0;
      var k = !0;
    } catch {
    }
    var ee = Mo.call(m);
    return k && (v ? m[ht] = R : delete m[ht]), ee;
  }
  var ef = qo ? function(m) {
    return m == null ? [] : (m = Object(m), ye(qo(m), function(v) {
      return jo.call(m, v);
    }));
  } : ff, et = or;
  (ai && et(new ai(new ArrayBuffer(1))) != j || nr && et(new nr()) != y || si && et(si.resolve()) != U || li && et(new li()) != T || ci && et(new ci()) != M) && (et = function(m) {
    var v = or(m), R = v == $ ? m.constructor : void 0, k = R ? gt(R) : "";
    if (k)
      switch (k) {
        case yu:
          return j;
        case vu:
          return y;
        case wu:
          return U;
        case _u:
          return T;
        case Au:
          return M;
      }
    return v;
  });
  function tf(m, v) {
    return v = v ?? a, !!v && (typeof m == "number" || ce.test(m)) && m > -1 && m % 1 == 0 && m < v;
  }
  function rf(m) {
    var v = typeof m;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? m !== "__proto__" : m === null;
  }
  function nf(m) {
    return !!ko && ko in m;
  }
  function of(m) {
    var v = m && m.constructor, R = typeof v == "function" && v.prototype || zr;
    return m === R;
  }
  function af(m) {
    return Mo.call(m);
  }
  function gt(m) {
    if (m != null) {
      try {
        return Uo.call(m);
      } catch {
      }
      try {
        return m + "";
      } catch {
      }
    }
    return "";
  }
  function Xo(m, v) {
    return m === v || m !== m && v !== v;
  }
  var sf = Wo(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Wo : function(m) {
    return ar(m) && qe.call(m, "callee") && !jo.call(m, "callee");
  }, Zr = Array.isArray;
  function lf(m) {
    return m != null && Jo(m.length) && !Ko(m);
  }
  var fi = gu || df;
  function cf(m, v) {
    return Vo(m, v);
  }
  function Ko(m) {
    if (!Qo(m))
      return !1;
    var v = or(m);
    return v == h || v == w || v == E || v == x;
  }
  function Jo(m) {
    return typeof m == "number" && m > -1 && m % 1 == 0 && m <= a;
  }
  function Qo(m) {
    var v = typeof m;
    return m != null && (v == "object" || v == "function");
  }
  function ar(m) {
    return m != null && typeof m == "object";
  }
  var Zo = pe ? ii(pe) : Xu;
  function uf(m) {
    return lf(m) ? Wu(m) : Ku(m);
  }
  function ff() {
    return [];
  }
  function df() {
    return !1;
  }
  e.exports = cf;
})(Pn, Pn.exports);
var xy = Pn.exports;
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.DownloadedUpdateHelper = void 0;
Hr.createTempUpdateFile = By;
const Ly = Dr, Uy = Je, ms = xy, vt = dt, Sr = ie;
class ky {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Sr.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return ms(this.versionInfo, r) && ms(this.fileInfo.info, n.info) && await (0, vt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, vt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, vt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, vt.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, vt.readJson)(n);
    } catch (E) {
      let c = "No cached update info available";
      return E.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${E.message})`), r.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Sr.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, vt.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await My(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Sr.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Hr.DownloadedUpdateHelper = ky;
function My(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, Ly.createHash)(t);
    a.on("error", o).setEncoding(r), (0, Uy.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function By(e, t, r) {
  let n = 0, i = Sr.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, vt.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Sr.join(t, `${n++}-${e}`);
    }
  return i;
}
var Xn = {}, Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
Do.getAppCacheDir = jy;
const Ri = ie, Hy = Dn;
function jy() {
  const e = (0, Hy.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ri.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ri.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ri.join(e, ".cache"), t;
}
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.ElectronAppAdapter = void 0;
const gs = ie, qy = Do;
class Gy {
  constructor(t = Tt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? gs.join(process.resourcesPath, "app-update.yml") : gs.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, qy.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Xn.ElectronAppAdapter = Gy;
var Jc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = de;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Tt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, E, c) => {
        const u = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: a,
          options: s,
          onCancel: c,
          callback: (d) => {
            d == null ? l(a) : E(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Tt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, E) {
      o.on("redirect", (c, u, d) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : E(t.HttpExecutor.prepareRedirectUrlOptions(d, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Jc);
var jr = {}, Fe = {}, Wy = "[object Symbol]", Qc = /[\\^$.*+?()[\]{}|]/g, Vy = RegExp(Qc.source), Yy = typeof ke == "object" && ke && ke.Object === Object && ke, zy = typeof self == "object" && self && self.Object === Object && self, Xy = Yy || zy || Function("return this")(), Ky = Object.prototype, Jy = Ky.toString, Es = Xy.Symbol, ys = Es ? Es.prototype : void 0, vs = ys ? ys.toString : void 0;
function Qy(e) {
  if (typeof e == "string")
    return e;
  if (ev(e))
    return vs ? vs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Zy(e) {
  return !!e && typeof e == "object";
}
function ev(e) {
  return typeof e == "symbol" || Zy(e) && Jy.call(e) == Wy;
}
function tv(e) {
  return e == null ? "" : Qy(e);
}
function rv(e) {
  return e = tv(e), e && Vy.test(e) ? e.replace(Qc, "\\$&") : e;
}
var nv = rv;
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.newBaseUrl = ov;
Fe.newUrlFromBase = Zi;
Fe.getChannelFilename = av;
Fe.blockmapFiles = sv;
const Zc = Kt, iv = nv;
function ov(e) {
  const t = new Zc.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Zi(e, t, r = !1) {
  const n = new Zc.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function av(e) {
  return `${e}.yml`;
}
function sv(e, t, r) {
  const n = Zi(`${e.pathname}.blockmap`, e);
  return [Zi(`${e.pathname.replace(new RegExp(iv(r), "g"), t)}.blockmap`, e), n];
}
var he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.Provider = void 0;
he.findFile = uv;
he.parseUpdateInfo = fv;
he.getFileList = eu;
he.resolveFiles = dv;
const ut = de, lv = Ee, ws = Fe;
class cv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, ut.configureRequestUrl)(t, n), n;
  }
}
he.Provider = cv;
function uv(e, t, r) {
  if (e.length === 0)
    throw (0, ut.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function fv(e, t, r) {
  if (e == null)
    throw (0, ut.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, lv.load)(e);
  } catch (i) {
    throw (0, ut.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function eu(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, ut.newError)(`No files provided: ${(0, ut.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function dv(e, t, r = (n) => n) {
  const i = eu(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, ut.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ut.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, ws.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, ws.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.GenericProvider = void 0;
const _s = de, Ni = Fe, Pi = he;
class hv extends Pi.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Ni.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Ni.getChannelFilename)(this.channel), r = (0, Ni.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Pi.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof _s.HttpError && i.statusCode === 404)
          throw (0, _s.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Pi.resolveFiles)(t, this.baseUrl);
  }
}
jr.GenericProvider = hv;
var Kn = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.BitbucketProvider = void 0;
const As = de, Di = Fe, Fi = he;
class pv extends Fi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Di.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new As.CancellationToken(), r = (0, Di.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Di.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Fi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, As.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Fi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Jn.BitbucketProvider = pv;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.GitHubProvider = ft.BaseGitHubProvider = void 0;
ft.computeReleaseNotes = ru;
const Xe = de, kt = Kc, mv = Kt, Mt = Fe, eo = he, xi = /\/tag\/([^/]+)$/;
class tu extends eo.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Mt.newBaseUrl)((0, Xe.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Mt.newBaseUrl)((0, Xe.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
ft.BaseGitHubProvider = tu;
class gv extends tu {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new Xe.CancellationToken(), s = await this.httpRequest((0, Mt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, Xe.parseXml)(s);
    let E = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const A = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = kt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (A === null)
          c = xi.exec(E.element("link").attribute("href"))[1];
        else
          for (const S of l.getElements("entry")) {
            const $ = xi.exec(S.element("link").attribute("href"));
            if ($ === null)
              continue;
            const U = $[1], x = ((n = kt.prerelease(U)) === null || n === void 0 ? void 0 : n[0]) || null, G = !A || ["alpha", "beta"].includes(A), T = x !== null && !["alpha", "beta"].includes(String(x));
            if (G && !T && !(A === "beta" && x === "alpha")) {
              c = U;
              break;
            }
            if (x && x === A) {
              c = U;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const A of l.getElements("entry"))
          if (xi.exec(A.element("link").attribute("href"))[1] === c) {
            E = A;
            break;
          }
      }
    } catch (A) {
      throw (0, Xe.newError)(`Cannot parse releases feed: ${A.stack || A.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Xe.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", h = "";
    const w = async (A) => {
      d = (0, Mt.getChannelFilename)(A), h = (0, Mt.newUrlFromBase)(this.getBaseDownloadPath(String(c), d), this.baseUrl);
      const S = this.createRequestOptions(h);
      try {
        return await this.executor.request(S, a);
      } catch ($) {
        throw $ instanceof Xe.HttpError && $.statusCode === 404 ? (0, Xe.newError)(`Cannot find ${d} in the latest release artifacts (${h}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
      }
    };
    try {
      let A = this.channel;
      this.updater.allowPrerelease && (!((i = kt.prerelease(c)) === null || i === void 0) && i[0]) && (A = this.getCustomChannelName(String((o = kt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await w(A);
    } catch (A) {
      if (this.updater.allowPrerelease)
        u = await w(this.getDefaultChannelName());
      else
        throw A;
    }
    const y = (0, eo.parseUpdateInfo)(u, d, h);
    return y.releaseName == null && (y.releaseName = E.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = ru(this.updater.currentVersion, this.updater.fullChangelog, l, E)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Mt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new mv.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Xe.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, eo.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
ft.GitHubProvider = gv;
function Ss(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function ru(e, t, r, n) {
  if (!t)
    return Ss(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    kt.lt(e, a) && i.push({
      version: a,
      note: Ss(o)
    });
  }
  return i.sort((o, a) => kt.rcompare(o.version, a.version));
}
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.KeygenProvider = void 0;
const Ts = de, Li = Fe, Ui = he;
class Ev extends Ui.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, Li.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Ts.CancellationToken(), r = (0, Li.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Li.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Ui.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Ts.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ui.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Qn.KeygenProvider = Ev;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.PrivateGitHubProvider = void 0;
const Dt = de, yv = Ee, vv = ie, Cs = Kt, bs = Fe, wv = ft, _v = he;
class Av extends wv.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Dt.CancellationToken(), r = (0, bs.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Dt.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Cs.URL(i.url);
    let a;
    try {
      a = (0, yv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Dt.HttpError && s.statusCode === 404 ? (0, Dt.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, bs.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Dt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, _v.getFileList)(t).map((r) => {
      const n = vv.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Dt.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Cs.URL(i.url),
        info: r
      };
    });
  }
}
Zn.PrivateGitHubProvider = Av;
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.isUrlProbablySupportMultiRangeRequests = nu;
Kn.createClient = $v;
const pn = de, Sv = Jn, $s = jr, Tv = ft, Cv = Qn, bv = Zn;
function nu(e) {
  return !e.includes("s3.amazonaws.com");
}
function $v(e, t, r) {
  if (typeof e == "string")
    throw (0, pn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Tv.GitHubProvider(i, t, r) : new bv.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Sv.BitbucketProvider(e, t, r);
    case "keygen":
      return new Cv.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new $s.GenericProvider({
        provider: "generic",
        url: (0, pn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new $s.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && nu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, pn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, pn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ei = {}, qr = {}, er = {}, Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.OperationKind = void 0;
Ot.computeOperations = Ov;
var _t;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(_t || (Ot.OperationKind = _t = {}));
function Ov(e, t, r) {
  const n = Is(e.files), i = Is(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, E = n.get(l);
  if (E == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: h } = Rv(n.get(l), E.offset, r);
  let w = a.offset;
  for (let y = 0; y < c.checksums.length; w += c.sizes[y], y++) {
    const A = c.sizes[y], S = c.checksums[y];
    let $ = d.get(S);
    $ != null && h.get(S) !== A && (r.warn(`Checksum ("${S}") matches, but size differs (old: ${h.get(S)}, new: ${A})`), $ = void 0), $ === void 0 ? (u++, o != null && o.kind === _t.DOWNLOAD && o.end === w ? o.end += A : (o = {
      kind: _t.DOWNLOAD,
      start: w,
      end: w + A
      // oldBlocks: null,
    }, Os(o, s, S, y))) : o != null && o.kind === _t.COPY && o.end === $ ? o.end += A : (o = {
      kind: _t.COPY,
      start: $,
      end: $ + A
      // oldBlocks: [checksum]
    }, Os(o, s, S, y));
  }
  return u > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${u} changed blocks`), s;
}
const Iv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Os(e, t, r, n) {
  if (Iv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${_t[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function Rv(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], E = i.get(s);
    if (E === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const c = E === l ? "(same size)" : `(size: ${E}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Is(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(er, "__esModule", { value: !0 });
er.DataSplitter = void 0;
er.copyData = iu;
const mn = de, Nv = Je, Pv = Fr, Dv = Ot, Rs = Buffer.from(`\r
\r
`);
var nt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(nt || (nt = {}));
function iu(e, t, r, n, i) {
  const o = (0, Nv.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class Fv extends Pv.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = nt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, mn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === nt.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = nt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === nt.BODY)
          this.readState = nt.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, mn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, mn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = nt.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== Dv.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        iu(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(Rs, r);
    if (n !== -1)
      return n + Rs.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, mn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
er.DataSplitter = Fv;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.executeTasksUsingMultipleRangeRequests = xv;
ti.checkIsRangesSupported = ro;
const to = de, Ns = er, Ps = Ot;
function xv(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    Lv(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function Lv(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === Ps.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, s.set(a, u), a++, l.push(d.end - d.start));
  }
  if (a <= 1) {
    const u = (d) => {
      if (d >= t.end) {
        n();
        return;
      }
      const h = t.tasks[d++];
      if (h.kind === Ps.OperationKind.COPY)
        (0, Ns.copyData)(h, r, t.oldFileFd, i, () => u(d));
      else {
        const w = e.createRequestOptions();
        w.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const y = e.httpExecutor.createRequest(w, (A) => {
          ro(A, i) && (A.pipe(r, {
            end: !1
          }), A.once("end", () => u(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    u(t.start);
    return;
  }
  const E = e.createRequestOptions();
  E.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(E, (u) => {
    if (!ro(u, i))
      return;
    const d = (0, to.safeGetHeader)(u, "content-type"), h = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const w = new Ns.DataSplitter(r, t, s, h[1] || h[2], l, n);
    w.on("error", i), u.pipe(w), u.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function ro(e, t) {
  if (e.statusCode >= 400)
    return t((0, to.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, to.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.ProgressDifferentialDownloadCallbackTransform = void 0;
const Uv = Fr;
var Bt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Bt || (Bt = {}));
class kv extends Uv.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Bt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Bt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Bt.COPY;
  }
  beginRangeDownload() {
    this.operationType = Bt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
ri.ProgressDifferentialDownloadCallbackTransform = kv;
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.DifferentialDownloader = void 0;
const fr = de, ki = dt, Mv = Je, Bv = er, Hv = Kt, gn = Ot, Ds = ti, jv = ri;
class qv {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, fr.configureRequestUrl)(this.options.newUrl, t), (0, fr.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, gn.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const E = l.end - l.start;
      l.kind === gn.OperationKind.DOWNLOAD ? o += E : a += E;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Fs(s)}, To download: ${Fs(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, ki.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, ki.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, ki.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Mv.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let E;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const S = [];
        let $ = 0;
        for (const x of t)
          x.kind === gn.OperationKind.DOWNLOAD && (S.push(x.end - x.start), $ += x.end - x.start);
        const U = {
          expectedByteCounts: S,
          grandTotal: $
        };
        E = new jv.ProgressDifferentialDownloadCallbackTransform(U, this.options.cancellationToken, this.options.onProgress), l.push(E);
      }
      const c = new fr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            c.validate();
          } catch (S) {
            s(S);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let u = null;
      for (const S of l)
        S.on("error", s), u == null ? u = S : u = u.pipe(S);
      const d = l[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, Ds.executeTasksUsingMultipleRangeRequests)(this, t, d, n, s), h(0);
        return;
      }
      let w = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const A = this.createRequestOptions();
      A.redirect = "manual", h = (S) => {
        var $, U;
        if (S >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const x = t[S++];
        if (x.kind === gn.OperationKind.COPY) {
          E && E.beginFileCopy(), (0, Bv.copyData)(x, d, n, s, () => h(S));
          return;
        }
        const G = `bytes=${x.start}-${x.end - 1}`;
        A.headers.range = G, (U = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || U === void 0 || U.call($, `download range: ${G}`), E && E.beginRangeDownload();
        const T = this.httpExecutor.createRequest(A, (I) => {
          I.on("error", s), I.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), I.statusCode >= 400 && s((0, fr.createHttpError)(I)), I.pipe(d, {
            end: !1
          }), I.once("end", () => {
            E && E.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => h(S), 1e3)) : h(S);
          });
        });
        T.on("redirect", (I, F, g) => {
          this.logger.info(`Redirect to ${Gv(g)}`), y = g, (0, fr.configureRequestUrl)(new Hv.URL(y), A), T.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(T, s), T.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, Ds.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
qr.DifferentialDownloader = qv;
function Fs(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Gv(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.GenericDifferentialDownloader = void 0;
const Wv = qr;
class Vv extends Wv.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
ei.GenericDifferentialDownloader = Vv;
var xs;
function Fo() {
  if (xs) return yt;
  xs = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.NoOpLogger = yt.AppUpdater = void 0;
  const e = de, t = Dr, r = Dn, n = Js, i = dt, o = Ee, a = qn, s = ie, l = Kc, E = Hr, c = Xn, u = Jc, d = jr, h = tr(), w = Kn, y = el, A = Fe, S = ei;
  let $ = class ou extends n.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(T) {
      if (this._channel != null) {
        if (typeof T != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${T}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (T.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = T, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(T) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: T
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, u.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(T) {
      this._logger = T ?? new x();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(T) {
      this.clientPromise = null, this._appUpdateConfigPath = T, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(T, I) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new h.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (M) => {
        this._logger.error(`Error: ${M.stack || M.message}`);
      }), I == null ? (this.app = new c.ElectronAppAdapter(), this.httpExecutor = new u.ElectronHttpExecutor((M, B) => this.emit("login", M, B))) : (this.app = I, this.httpExecutor = null);
      const F = this.app.version, g = (0, l.parse)(F);
      if (g == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${F}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = g, this.allowPrerelease = U(g), T != null && (this.setFeedURL(T), typeof T != "string" && T.requestHeaders && (this.requestHeaders = T.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(T) {
      const I = this.createProviderRuntimeOptions();
      let F;
      typeof T == "string" ? F = new d.GenericProvider({ provider: "generic", url: T }, this, {
        ...I,
        isUseMultipleRangeRequest: (0, w.isUrlProbablySupportMultiRangeRequests)(T)
      }) : F = (0, w.createClient)(T, this, I), this.clientPromise = Promise.resolve(F);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let T = this.checkForUpdatesPromise;
      if (T != null)
        return this._logger.info("Checking for update (already in progress)"), T;
      const I = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), T = this.doCheckForUpdates().then((F) => (I(), F)).catch((F) => {
        throw I(), this.emit("error", F, `Cannot check for updates: ${(F.stack || F).toString()}`), F;
      }), this.checkForUpdatesPromise = T, T;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(T) {
      return this.checkForUpdates().then((I) => I != null && I.downloadPromise ? (I.downloadPromise.then(() => {
        const F = ou.formatDownloadNotification(I.updateInfo.version, this.app.name, T);
        new Tt.Notification(F).show();
      }), I) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), I));
    }
    static formatDownloadNotification(T, I, F) {
      return F == null && (F = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), F = {
        title: F.title.replace("{appName}", I).replace("{version}", T),
        body: F.body.replace("{appName}", I).replace("{version}", T)
      }, F;
    }
    async isStagingMatch(T) {
      const I = T.stagingPercentage;
      let F = I;
      if (F == null)
        return !0;
      if (F = parseInt(F, 10), isNaN(F))
        return this._logger.warn(`Staging percentage is NaN: ${I}`), !0;
      F = F / 100;
      const g = await this.stagingUserIdPromise.value, B = e.UUID.parse(g).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${F}, percentage: ${B}, user id: ${g}`), B < F;
    }
    computeFinalHeaders(T) {
      return this.requestHeaders != null && Object.assign(T, this.requestHeaders), T;
    }
    async isUpdateAvailable(T) {
      const I = (0, l.parse)(T.version);
      if (I == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${T.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const F = this.currentVersion;
      if ((0, l.eq)(I, F))
        return !1;
      const g = T == null ? void 0 : T.minimumSystemVersion, M = (0, r.release)();
      if (g)
        try {
          if ((0, l.lt)(M, g))
            return this._logger.info(`Current OS version ${M} is less than the minimum OS version required ${g} for version ${M}`), !1;
        } catch (N) {
          this._logger.warn(`Failed to compare current OS version(${M}) with minimum OS version(${g}): ${(N.message || N).toString()}`);
        }
      if (!await this.isStagingMatch(T))
        return !1;
      const j = (0, l.gt)(I, F), Y = (0, l.lt)(I, F);
      return j ? !0 : this.allowDowngrade && Y;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((F) => (0, w.createClient)(F, this, this.createProviderRuntimeOptions())));
      const T = await this.clientPromise, I = await this.stagingUserIdPromise.value;
      return T.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": I })), {
        info: await T.getLatestVersion(),
        provider: T
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const T = await this.getUpdateInfoAndProvider(), I = T.info;
      if (!await this.isUpdateAvailable(I))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${I.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", I), {
          versionInfo: I,
          updateInfo: I
        };
      this.updateInfoAndProvider = T, this.onUpdateAvailable(I);
      const F = new e.CancellationToken();
      return {
        versionInfo: I,
        updateInfo: I,
        cancellationToken: F,
        downloadPromise: this.autoDownload ? this.downloadUpdate(F) : null
      };
    }
    onUpdateAvailable(T) {
      this._logger.info(`Found version ${T.version} (url: ${(0, e.asArray)(T.files).map((I) => I.url).join(", ")})`), this.emit("update-available", T);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(T = new e.CancellationToken()) {
      const I = this.updateInfoAndProvider;
      if (I == null) {
        const g = new Error("Please check update first");
        return this.dispatchError(g), Promise.reject(g);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(I.info.files).map((g) => g.url).join(", ")}`);
      const F = (g) => {
        if (!(g instanceof e.CancellationError))
          try {
            this.dispatchError(g);
          } catch (M) {
            this._logger.warn(`Cannot dispatch error event: ${M.stack || M}`);
          }
        return g;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: I,
        requestHeaders: this.computeRequestHeaders(I.provider),
        cancellationToken: T,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((g) => {
        throw F(g);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(T) {
      this.emit("error", T, (T.stack || T).toString());
    }
    dispatchUpdateDownloaded(T) {
      this.emit(h.UPDATE_DOWNLOADED, T);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(T) {
      const I = T.fileExtraDownloadHeaders;
      if (I != null) {
        const F = this.requestHeaders;
        return F == null ? I : {
          ...I,
          ...F
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const T = s.join(this.app.userDataPath, ".updaterId");
      try {
        const F = await (0, i.readFile)(T, "utf-8");
        if (e.UUID.check(F))
          return F;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${F}`);
      } catch (F) {
        F.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${F}`);
      }
      const I = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${I}`);
      try {
        await (0, i.outputFile)(T, I);
      } catch (F) {
        this._logger.warn(`Couldn't write out staging user ID: ${F}`);
      }
      return I;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const T = this.requestHeaders;
      if (T == null)
        return !0;
      for (const I of Object.keys(T)) {
        const F = I.toLowerCase();
        if (F === "authorization" || F === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let T = this.downloadedUpdateHelper;
      if (T == null) {
        const I = (await this.configOnDisk.value).updaterCacheDirName, F = this._logger;
        I == null && F.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const g = s.join(this.app.baseCachePath, I || this.app.name);
        F.debug != null && F.debug(`updater cache dir: ${g}`), T = new E.DownloadedUpdateHelper(g), this.downloadedUpdateHelper = T;
      }
      return T;
    }
    async executeDownload(T) {
      const I = T.fileInfo, F = {
        headers: T.downloadUpdateOptions.requestHeaders,
        cancellationToken: T.downloadUpdateOptions.cancellationToken,
        sha2: I.info.sha2,
        sha512: I.info.sha512
      };
      this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (F.onProgress = (K) => this.emit(h.DOWNLOAD_PROGRESS, K));
      const g = T.downloadUpdateOptions.updateInfoAndProvider.info, M = g.version, B = I.packageInfo;
      function j() {
        const K = decodeURIComponent(T.fileInfo.url.pathname);
        return K.endsWith(`.${T.fileExtension}`) ? s.basename(K) : T.fileInfo.info.url;
      }
      const Y = await this.getOrCreateDownloadHelper(), N = Y.cacheDirForPendingUpdate;
      await (0, i.mkdir)(N, { recursive: !0 });
      const C = j();
      let P = s.join(N, C);
      const b = B == null ? null : s.join(N, `package-${M}${s.extname(B.path) || ".7z"}`), L = async (K) => (await Y.setDownloadedFile(P, b, g, I, C, K), await T.done({
        ...g,
        downloadedFile: P
      }), b == null ? [P] : [P, b]), D = this._logger, q = await Y.validateDownloadedPath(P, g, I, D);
      if (q != null)
        return P = q, await L(!1);
      const z = async () => (await Y.clear().catch(() => {
      }), await (0, i.unlink)(P).catch(() => {
      })), V = await (0, E.createTempUpdateFile)(`temp-${C}`, N, D);
      try {
        await T.task(V, F, b, z), await (0, e.retry)(() => (0, i.rename)(V, P), 60, 500, 0, 0, (K) => K instanceof Error && /^EBUSY:/.test(K.message));
      } catch (K) {
        throw await z(), K instanceof e.CancellationError && (D.info("cancelled"), this.emit("update-cancelled", g)), K;
      }
      return D.info(`New version ${M} has been downloaded to ${P}`), await L(!0);
    }
    async differentialDownloadInstaller(T, I, F, g, M) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const B = (0, A.blockmapFiles)(T.url, this.app.version, I.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${B[0]}", new: ${B[1]})`);
        const j = async (C) => {
          const P = await this.httpExecutor.downloadToBuffer(C, {
            headers: I.requestHeaders,
            cancellationToken: I.cancellationToken
          });
          if (P == null || P.length === 0)
            throw new Error(`Blockmap "${C.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(P).toString());
          } catch (b) {
            throw new Error(`Cannot parse blockmap "${C.href}", error: ${b}`);
          }
        }, Y = {
          newUrl: T.url,
          oldFile: s.join(this.downloadedUpdateHelper.cacheDir, M),
          logger: this._logger,
          newFile: F,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          requestHeaders: I.requestHeaders,
          cancellationToken: I.cancellationToken
        };
        this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (Y.onProgress = (C) => this.emit(h.DOWNLOAD_PROGRESS, C));
        const N = await Promise.all(B.map((C) => j(C)));
        return await new S.GenericDifferentialDownloader(T.info, this.httpExecutor, Y).download(N[0], N[1]), !1;
      } catch (B) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${B.stack || B}`), this._testOnlyOptions != null)
          throw B;
        return !0;
      }
    }
  };
  yt.AppUpdater = $;
  function U(G) {
    const T = (0, l.prerelease)(G);
    return T != null && T.length > 0;
  }
  class x {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(T) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(T) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(T) {
    }
  }
  return yt.NoOpLogger = x, yt;
}
var Ls;
function Gr() {
  if (Ls) return lr;
  Ls = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.BaseUpdater = void 0;
  const e = Fn, t = Fo();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Tt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, s = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, l = a == null ? null : a.downloadedFileInfo;
      if (s == null || l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: l.isAdminRightsRequired
        });
      } catch (E) {
        return this.dispatchError(E), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), s = [a];
      return /kdesudo/i.test(a) ? (s.push("--comment", o), s.push("-c")) : /gksudo/i.test(a) ? s.push("--message", o) : /pkexec/i.test(a) && s.push("--disable-internal-agent"), s.join(" ");
    }
    spawnSyncLog(i, o = [], a = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], a = void 0, s = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((l, E) => {
        try {
          const c = { stdio: s, env: a, detached: !0 }, u = (0, e.spawn)(i, o, c);
          u.on("error", (d) => {
            E(d);
          }), u.unref(), u.pid !== void 0 && l(!0);
        } catch (c) {
          E(c);
        }
      });
    }
  };
  return lr.BaseUpdater = r, lr;
}
var dr = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Ft = dt, Yv = qr, zv = el;
class Xv extends Yv.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = au(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await Kv(this.options.oldFile), i);
  }
}
Wr.FileWithEmbeddedBlockMapDifferentialDownloader = Xv;
function au(e) {
  return JSON.parse((0, zv.inflateRawSync)(e).toString());
}
async function Kv(e) {
  const t = await (0, Ft.open)(e, "r");
  try {
    const r = (await (0, Ft.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Ft.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Ft.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ft.close)(t), au(i);
  } catch (r) {
    throw await (0, Ft.close)(t), r;
  }
}
var Us;
function ks() {
  if (Us) return dr;
  Us = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.AppImageUpdater = void 0;
  const e = de, t = Fn, r = dt, n = Je, i = ie, o = Gr(), a = Wr, s = tr(), l = he;
  let E = class extends o.BaseUpdater {
    constructor(u, d) {
      super(u, d);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, h = (0, l.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: u,
        task: async (w, y) => {
          const A = process.env.APPIMAGE;
          if (A == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let S = !1;
          try {
            const $ = {
              newUrl: h.url,
              oldFile: A,
              logger: this._logger,
              newFile: w,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: u.requestHeaders,
              cancellationToken: u.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && ($.onProgress = (U) => this.emit(s.DOWNLOAD_PROGRESS, U)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(h.info, this.httpExecutor, $).download();
          } catch ($) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${$.stack || $}`), S = process.platform === "linux";
          }
          S && await this.httpExecutor.download(h.url, w, y), await (0, r.chmod)(w, 493);
        }
      });
    }
    doInstall(u) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(d);
      let h;
      const w = i.basename(d);
      i.basename(u.installerPath) === w || !/\d+\.\d+\.\d+/.test(w) ? h = d : h = i.join(i.dirname(d), i.basename(u.installerPath)), (0, t.execFileSync)("mv", ["-f", u.installerPath, h]), h !== d && this.emit("appimage-filename-updated", h);
      const y = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return u.isForceRunAfter ? this.spawnLog(h, [], y) : (y.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(h, [], { env: y })), !0;
    }
  };
  return dr.AppImageUpdater = E, dr;
}
var hr = {}, Ms;
function Bs() {
  if (Ms) return hr;
  Ms = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.DebUpdater = void 0;
  const e = Gr(), t = tr(), r = he;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, E) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (c) => this.emit(t.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(s.url, l, E);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', l = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${l.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return hr.DebUpdater = n, hr;
}
var pr = {}, Hs;
function js() {
  if (Hs) return pr;
  Hs = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.RpmUpdater = void 0;
  const e = Gr(), t = tr(), r = he;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, E) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (c) => this.emit(t.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(s.url, l, E);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), l = /pkexec/i.test(s) ? "" : '"', E = this.spawnSyncLog("which zypper");
      let c;
      return E ? c = [E, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : c = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(s, [`${l}/bin/bash`, "-c", `'${c.join(" ")}'${l}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return pr.RpmUpdater = n, pr;
}
var mr = {}, qs;
function Gs() {
  if (qs) return mr;
  qs = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.MacUpdater = void 0;
  const e = de, t = dt, r = Je, n = ie, i = mf, o = Fo(), a = he, s = Fn, l = Dr;
  let E = class extends o.AppUpdater {
    constructor(u, d) {
      super(u, d), this.nativeUpdater = Tt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(u) {
      this._logger.debug != null && this._logger.debug(u);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((u) => {
        u && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(u) {
      let d = u.updateInfoAndProvider.provider.resolveFiles(u.updateInfoAndProvider.info);
      const h = this._logger, w = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, s.execFileSync)("sysctl", [w], { encoding: "utf8" }).includes(`${w}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (G) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${G}`);
      }
      let A = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const T = (0, s.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${T}`), A = A || T;
      } catch (G) {
        h.warn(`uname shell command to check for arm64 failed: ${G}`);
      }
      A = A || process.arch === "arm64" || y;
      const S = (G) => {
        var T;
        return G.url.pathname.includes("arm64") || ((T = G.info.url) === null || T === void 0 ? void 0 : T.includes("arm64"));
      };
      A && d.some(S) ? d = d.filter((G) => A === S(G)) : d = d.filter((G) => !S(G));
      const $ = (0, a.findFile)(d, "zip", ["pkg", "dmg"]);
      if ($ == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const U = u.updateInfoAndProvider.provider, x = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: $,
        downloadUpdateOptions: u,
        task: async (G, T) => {
          const I = n.join(this.downloadedUpdateHelper.cacheDir, x), F = () => (0, t.pathExistsSync)(I) ? !u.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let g = !0;
          F() && (g = await this.differentialDownloadInstaller($, u, G, U, x)), g && await this.httpExecutor.download($.url, G, T);
        },
        done: (G) => {
          if (!u.disableDifferentialDownload)
            try {
              const T = n.join(this.downloadedUpdateHelper.cacheDir, x);
              (0, r.copyFileSync)(G.downloadedFile, T);
            } catch (T) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${T.message}`);
            }
          return this.updateDownloaded($, G);
        }
      });
    }
    async updateDownloaded(u, d) {
      var h;
      const w = d.downloadedFile, y = (h = u.info.size) !== null && h !== void 0 ? h : (await (0, t.stat)(w)).size, A = this._logger, S = `fileToProxy=${u.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${S})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${S})`), this.server.on("close", () => {
        A.info(`Proxy server for native Squirrel.Mac is closed (${S})`);
      });
      const $ = (U) => {
        const x = U.address();
        return typeof x == "string" ? x : `http://127.0.0.1:${x == null ? void 0 : x.port}`;
      };
      return await new Promise((U, x) => {
        const G = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), T = Buffer.from(`autoupdater:${G}`, "ascii"), I = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (F, g) => {
          const M = F.url;
          if (A.info(`${M} requested`), M === "/") {
            if (!F.headers.authorization || F.headers.authorization.indexOf("Basic ") === -1) {
              g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), A.warn("No authenthication info");
              return;
            }
            const Y = F.headers.authorization.split(" ")[1], N = Buffer.from(Y, "base64").toString("ascii"), [C, P] = N.split(":");
            if (C !== "autoupdater" || P !== G) {
              g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), A.warn("Invalid authenthication credentials");
              return;
            }
            const b = Buffer.from(`{ "url": "${$(this.server)}${I}" }`);
            g.writeHead(200, { "Content-Type": "application/json", "Content-Length": b.length }), g.end(b);
            return;
          }
          if (!M.startsWith(I)) {
            A.warn(`${M} requested, but not supported`), g.writeHead(404), g.end();
            return;
          }
          A.info(`${I} requested by Squirrel.Mac, pipe ${w}`);
          let B = !1;
          g.on("finish", () => {
            B || (this.nativeUpdater.removeListener("error", x), U([]));
          });
          const j = (0, r.createReadStream)(w);
          j.on("error", (Y) => {
            try {
              g.end();
            } catch (N) {
              A.warn(`cannot end response: ${N}`);
            }
            B = !0, this.nativeUpdater.removeListener("error", x), x(new Error(`Cannot pipe "${w}": ${Y}`));
          }), g.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), j.pipe(g);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${S})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${$(this.server)}, ${S})`), this.nativeUpdater.setFeedURL({
            url: $(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${T.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", x), this.nativeUpdater.checkForUpdates()) : U([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return mr.MacUpdater = E, mr;
}
var gr = {}, xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
xo.verifySignature = Qv;
const Ws = de, su = Fn, Jv = Dn, Vs = ie;
function Qv(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, su.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var E;
      try {
        if (a != null || l) {
          Mi(r, a, l, i), n(null);
          return;
        }
        const c = Zv(s);
        if (c.Status === 0) {
          try {
            const w = Vs.normalize(c.Path), y = Vs.normalize(t);
            if (r.info(`LiteralPath: ${w}. Update Path: ${y}`), w !== y) {
              Mi(r, new Error(`LiteralPath of ${w} is different than ${y}`), l, i), n(null);
              return;
            }
          } catch (w) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(E = w.message) !== null && E !== void 0 ? E : w.stack}`);
          }
          const d = (0, Ws.parseDn)(c.SignerCertificate.Subject);
          let h = !1;
          for (const w of e) {
            const y = (0, Ws.parseDn)(w);
            if (y.size ? h = Array.from(y.keys()).every((S) => y.get(S) === d.get(S)) : w === d.get("CN") && (r.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (d, h) => d === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (c) {
        Mi(r, c, null, i), n(null);
        return;
      }
    });
  });
}
function Zv(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Mi(e, t, r, n) {
  if (ew()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, su.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function ew() {
  const e = Jv.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Ys;
function zs() {
  if (Ys) return gr;
  Ys = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.NsisUpdater = void 0;
  const e = de, t = ie, r = Gr(), n = Wr, i = tr(), o = he, a = dt, s = xo, l = Kt;
  let E = class extends r.BaseUpdater {
    constructor(u, d) {
      super(u, d), this._verifyUpdateCodeSignature = (h, w) => (0, s.verifySignature)(h, w, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(u) {
      u && (this._verifyUpdateCodeSignature = u);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, h = (0, o.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: u,
        fileInfo: h,
        task: async (w, y, A, S) => {
          const $ = h.packageInfo, U = $ != null && A != null;
          if (U && u.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${u.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !U && !u.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (U || u.disableDifferentialDownload || await this.differentialDownloadInstaller(h, u, w, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, w, y);
          const x = await this.verifySignature(w);
          if (x != null)
            throw await S(), (0, e.newError)(`New version ${u.updateInfoAndProvider.info.version} is not signed by the application owner: ${x}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (U && await this.differentialDownloadWebPackage(u, $, A, d))
            try {
              await this.httpExecutor.download(new l.URL($.path), A, {
                headers: u.requestHeaders,
                cancellationToken: u.cancellationToken,
                sha512: $.sha512
              });
            } catch (G) {
              try {
                await (0, a.unlink)(A);
              } catch {
              }
              throw G;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(u) {
      let d;
      try {
        if (d = (await this.configOnDisk.value).publisherName, d == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(d) ? d : [d], u);
    }
    doInstall(u) {
      const d = ["--updated"];
      u.isSilent && d.push("/S"), u.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const h = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      h != null && d.push(`--package-file=${h}`);
      const w = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [u.installerPath].concat(d)).catch((y) => this.dispatchError(y));
      };
      return u.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), w(), !0) : (this.spawnLog(u.installerPath, d).catch((y) => {
        const A = y.code;
        this._logger.info(`Cannot run installer: error code: ${A}, error message: "${y.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), A === "UNKNOWN" || A === "EACCES" ? w() : A === "ENOENT" ? Tt.shell.openPath(u.installerPath).catch((S) => this.dispatchError(S)) : this.dispatchError(y);
      }), !0);
    }
    async differentialDownloadWebPackage(u, d, h, w) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new l.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: w.isUseMultipleRangeRequest,
          cancellationToken: u.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (A) => this.emit(i.DOWNLOAD_PROGRESS, A)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return gr.NsisUpdater = E, gr;
}
var Xs;
function tr() {
  return Xs || (Xs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = de;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = dt, n = ie;
    var i = Gr();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = Fo();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = he;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = ks();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var l = Bs();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var E = js();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return E.RpmUpdater;
    } });
    var c = Gs();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return c.MacUpdater;
    } });
    var u = zs();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } });
    let d;
    function h() {
      if (process.platform === "win32")
        d = new (zs()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (Gs()).MacUpdater();
      else {
        d = new (ks()).AppImageUpdater();
        try {
          const A = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)(A))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const S = (0, r.readFileSync)(A).toString().trim();
          switch (console.info("Found package-type:", S), S) {
            case "deb":
              d = new (Bs()).DebUpdater();
              break;
            case "rpm":
              d = new (js()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (A) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", A.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || h()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class w {
      constructor(S) {
        this.emitter = S;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(S) {
        y(this.emitter, "login", S);
      }
      progress(S) {
        y(this.emitter, e.DOWNLOAD_PROGRESS, S);
      }
      updateDownloaded(S) {
        y(this.emitter, e.UPDATE_DOWNLOADED, S);
      }
      updateCancelled(S) {
        y(this.emitter, "update-cancelled", S);
      }
    }
    e.UpdaterSignal = w;
    function y(A, S, $) {
      A.on(S, $);
    }
  }(di)), di;
}
var vr = tr();
const tw = gf(import.meta.url), ni = Ht.dirname(tw);
console.log("✅ Main process started");
console.log("__dirname:", ni);
let Ae = null;
const Xt = !Gt.isPackaged, Lo = Xt ? ni : process.resourcesPath, lu = Xt ? Ht.join(ni, "..", "dist") : Ht.join(Lo, "dist");
console.log("📂 App path:", Lo);
console.log("📂 Renderer dist path:", lu);
const cu = () => {
  if (Ae = new Ks({
    icon: Ht.join(Lo, "public", "electron-vite.svg"),
    width: 1200,
    height: 800,
    show: !1,
    // Prevent flashing on startup
    webPreferences: {
      preload: Ht.join(ni, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !Xt
      // Disable in dev, enable in production
    }
  }), Ae.maximize(), Xt)
    console.log("🚀 Running in development mode"), Ae.loadURL(process.env.VITE_DEV_SERVER_URL), Ae.webContents.openDevTools();
  else {
    console.log("📦 Running in production mode");
    const e = Ht.join(lu, "index.html");
    console.log("🔎 Attempting to load:", e), Je.existsSync(e) ? (console.log("✅ index.html found, loading..."), Ae.loadFile(e).catch((t) => console.error("❌ Failed to load index.html:", t))) : (console.error("❌ index.html NOT found at:", e), Bi.showErrorBox("Startup Error", "Wagewise failed to load. Please reinstall the application."), Gt.quit());
  }
  Ae.once("ready-to-show", () => {
    Ae == null || Ae.show();
  }), Ae.on("closed", () => {
    Ae = null;
  });
};
Gt.whenReady().then(() => {
  console.log("✅ App is ready"), cu(), Xt || vr.autoUpdater.checkForUpdatesAndNotify();
});
Gt.on("window-all-closed", () => {
  process.platform !== "darwin" && Gt.quit();
});
Gt.on("activate", () => {
  Ks.getAllWindows().length === 0 && cu();
});
Xt || (vr.autoUpdater.on("update-available", () => {
  console.log("⬆️ Update available"), Ae && Bi.showMessageBox(Ae, {
    type: "info",
    title: "Update Available",
    message: "A new version of Wagewise is available. It will be downloaded in the background.",
    buttons: ["OK"]
  });
}), vr.autoUpdater.on("update-downloaded", () => {
  console.log("⬇️ Update downloaded"), Ae && Bi.showMessageBox(Ae, {
    type: "info",
    title: "Update Ready",
    message: "The update has been downloaded. Restart Wagewise to apply the update.",
    buttons: ["Restart Now", "Later"]
  }).then((e) => {
    e.response === 0 && vr.autoUpdater.quitAndInstall();
  });
}), vr.autoUpdater.on("error", (e) => {
  console.error("❌ Update Error:", e);
}));
