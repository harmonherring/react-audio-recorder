import { useState as me, useCallback as ye } from "react";
const ar = (e) => (t) => {
  const n = e(t);
  return t.add(n), n;
}, ir = (e) => (t, n) => (e.set(t, n), n), Pt = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, rn = 536870912, Lt = rn * 2, cr = (e, t) => (n) => {
  const r = t.get(n);
  let s = r === void 0 ? n.size : r < Lt ? r + 1 : 0;
  if (!n.has(s))
    return e(n, s);
  if (n.size < rn) {
    for (; n.has(s); )
      s = Math.floor(Math.random() * Lt);
    return e(n, s);
  }
  if (n.size > Pt)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; n.has(s); )
    s = Math.floor(Math.random() * Pt);
  return e(n, s);
}, sn = /* @__PURE__ */ new WeakMap(), ur = ir(sn), ht = cr(ur, sn), Ut = ar(ht), lr = (e) => typeof e.start == "function", Bt = /* @__PURE__ */ new WeakMap(), dr = (e) => ({
  ...e,
  connect: ({ call: t }) => async () => {
    const { port1: n, port2: r } = new MessageChannel(), s = await t("connect", { port: n }, [n]);
    return Bt.set(r, s), r;
  },
  disconnect: ({ call: t }) => async (n) => {
    const r = Bt.get(n);
    if (r === void 0)
      throw new Error("The given port is not connected.");
    await t("disconnect", { portId: r });
  },
  isSupported: ({ call: t }) => () => t("isSupported")
}), Qe = /* @__PURE__ */ new WeakMap(), fr = (e) => {
  if (Qe.has(e))
    return Qe.get(e);
  const t = /* @__PURE__ */ new Map();
  return Qe.set(e, t), t;
}, on = (e) => {
  const t = dr(e);
  return (n) => {
    const r = fr(n);
    n.addEventListener("message", ({ data: c }) => {
      const { id: i } = c;
      if (i !== null && r.has(i)) {
        const { reject: u, resolve: d } = r.get(i);
        r.delete(i), c.error === void 0 ? d(c.result) : u(new Error(c.error.message));
      }
    }), lr(n) && n.start();
    const s = (c, i = null, u = []) => new Promise((d, l) => {
      const m = ht(r);
      r.set(m, { reject: l, resolve: d }), i === null ? n.postMessage({ id: m, method: c }, u) : n.postMessage({ id: m, method: c, params: i }, u);
    }), o = (c, i, u = []) => {
      n.postMessage({ id: null, method: c, params: i }, u);
    };
    let a = {};
    for (const [c, i] of Object.entries(t))
      a = { ...a, [c]: i({ call: s, notify: o }) };
    return { ...a };
  };
}, Je = /* @__PURE__ */ new Set(), Wt = /* @__PURE__ */ new Set(), be = /* @__PURE__ */ new WeakMap(), hr = on({
  deregister: ({ call: e }) => async (t) => {
    const n = be.get(t);
    if (n === void 0)
      throw new Error("There is no encoder registered with the given port.");
    const r = await e("deregister", { encoderId: n });
    return Je.delete(n), be.delete(t), r;
  },
  encode: ({ call: e }) => async (t, n) => {
    const r = await e("encode", { encoderInstanceId: t, timeslice: n });
    return Wt.delete(t), r;
  },
  instantiate: ({ call: e }) => async (t, n) => {
    const r = Ut(Wt), s = await e("instantiate", { encoderInstanceId: r, mimeType: t, sampleRate: n });
    return { encoderInstanceId: r, port: s };
  },
  register: ({ call: e }) => async (t) => {
    if (be.has(t))
      throw new Error("");
    const n = Ut(Je);
    be.set(t, n);
    try {
      return await e("register", { encoderId: n, port: t }, [t]);
    } catch (r) {
      throw Je.delete(n), be.delete(t), r;
    }
  }
}), pr = (e) => {
  const t = new Worker(e);
  return hr(t);
}, mr = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,s=2*o,a=function(e,t){return function(r){var a=t.get(r),c=void 0===a?r.size:a<s?a+1:0;if(!r.has(c))return e(r,c);if(r.size<o){for(;r.has(c);)c=Math.floor(Math.random()*s);return e(r,c)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(c);)c=Math.floor(Math.random()*n);return e(r,c)}},c=new WeakMap,i=r(c),d=a(i,c),l=t(d);e.addUniqueNumber=l,e.generateUniqueNumber=d}(t)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}(()=>{"use strict";var e=r(455);const t=new WeakMap,n=new WeakMap,o=(r=>{const o=(s=r,{...s,connect:({call:e})=>async()=>{const{port1:r,port2:n}=new MessageChannel,o=await e("connect",{port:r},[r]);return t.set(n,o),n},disconnect:({call:e})=>async r=>{const n=t.get(r);if(void 0===n)throw new Error("The given port is not connected.");await e("disconnect",{portId:n})},isSupported:({call:e})=>()=>e("isSupported")});var s;return t=>{const r=(e=>{if(n.has(e))return n.get(e);const t=new Map;return n.set(e,t),t})(t);t.addEventListener("message",(({data:e})=>{const{id:t}=e;if(null!==t&&r.has(t)){const{reject:n,resolve:o}=r.get(t);r.delete(t),void 0===e.error?o(e.result):n(new Error(e.error.message))}})),(e=>"function"==typeof e.start)(t)&&t.start();const s=(n,o=null,s=[])=>new Promise(((a,c)=>{const i=(0,e.generateUniqueNumber)(r);r.set(i,{reject:c,resolve:a}),null===o?t.postMessage({id:i,method:n},s):t.postMessage({id:i,method:n,params:o},s)})),a=(e,r,n=[])=>{t.postMessage({id:null,method:e,params:r},n)};let c={};for(const[e,t]of Object.entries(o))c={...c,[e]:t({call:s,notify:a})};return{...c}}})({characterize:({call:e})=>()=>e("characterize"),encode:({call:e})=>(t,r)=>e("encode",{recordingId:t,timeslice:r}),record:({call:e})=>async(t,r,n)=>{await e("record",{recordingId:t,sampleRate:r,typedArrays:n},n.map((({buffer:e})=>e)))}}),s=-32603,a=-32602,c=-32601,i=(e,t)=>Object.assign(new Error(e),{status:t}),d=e=>i('The handler of the method called "'.concat(e,'" returned an unexpected result.'),s),l=(e,t)=>async({data:{id:r,method:n,params:o}})=>{const a=t[n];try{if(void 0===a)throw(e=>i('The requested method called "'.concat(e,'" is not supported.'),c))(n);const t=void 0===o?a():a(o);if(void 0===t)throw(e=>i('The handler of the method called "'.concat(e,'" returned no required result.'),s))(n);const l=t instanceof Promise?await t:t;if(null===r){if(void 0!==l.result)throw d(n)}else{if(void 0===l.result)throw d(n);const{result:t,transferables:o=[]}=l;e.postMessage({id:r,result:t},o)}}catch(t){const{message:n,status:o=-32603}=t;e.postMessage({error:{code:o,message:n},id:r})}},u=new Map,h=(t,r,n)=>({...r,connect:({port:n})=>{n.start();const o=t(n,r),s=(0,e.generateUniqueNumber)(u);return u.set(s,(()=>{o(),n.close(),u.delete(s)})),{result:s}},disconnect:({portId:e})=>{const t=u.get(e);if(void 0===t)throw(e=>i('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),a))(e);return t(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),w=(e,t,r=()=>!0)=>{const n=h(w,t,r),o=l(e,n);return e.addEventListener("message",o),()=>e.removeEventListener("message",o)},f=e=>{e.onmessage=null,e.close()},p=new Map,m=new Map,g=((e,t)=>r=>{const n=t.get(r);if(void 0===n)throw new Error("There was no encoder stored with the given id.");e.delete(n),t.delete(r)})(p,m),v=new Map,y=(e=>t=>{const r=e.get(t);if(void 0===r)throw new Error("There was no instance of an encoder stored with the given id.");return r})(v),M=((e,t)=>r=>{const n=t(r);return e.delete(r),n})(v,y),E=((e,t)=>r=>{const[n,o,s,a]=t(r);return s?new Promise((t=>{o.onmessage=({data:s})=>{0===s.length?(e(o),t(n.encode(r,null))):n.record(r,a,s)}})):n.encode(r,null)})(f,M),b=(e=>t=>{for(const[r,n]of Array.from(e.values()))if(r.test(t))return n;throw new Error("There is no encoder registered which could handle the given mimeType.")})(p),T=((e,t,r)=>(n,o,s)=>{if(t.has(n))throw new Error('There is already an encoder instance registered with an id called "'.concat(n,'".'));const a=r(o),{port1:c,port2:i}=new MessageChannel,d=[a,c,!0,s];return t.set(n,d),c.onmessage=({data:t})=>{0===t.length?(e(c),d[2]=!1):a.record(n,s,t.map((e=>"number"==typeof e?new Float32Array(e):e)))},i})(f,v,b),I=((e,t,r)=>async(n,o)=>{const s=r(o),a=await s.characterize(),c=a.toString();if(e.has(c))throw new Error("There is already an encoder stored which handles exactly the same mime types.");if(t.has(n))throw new Error('There is already an encoder registered with an id called "'.concat(n,'".'));return e.set(c,[a,s]),t.set(n,c),a})(p,m,o),A=(e=>(t,r)=>{const[n]=e(t);return n.encode(t,r)})(y);w(self,{deregister:async({encoderId:e})=>(g(e),{result:null}),encode:async({encoderInstanceId:e,timeslice:t})=>{const r=null===t?await E(e):await A(e,t);return{result:r,transferables:r}},instantiate:({encoderInstanceId:e,mimeType:t,sampleRate:r})=>{const n=T(e,t,r);return{result:n,transferables:[n]}},register:async({encoderId:e,port:t})=>({result:await I(e,t)})})})()})();`, gr = new Blob([mr], { type: "application/javascript; charset=utf-8" }), an = URL.createObjectURL(gr), pt = pr(an), Le = pt.encode, cn = pt.instantiate, wr = pt.register;
URL.revokeObjectURL(an);
const vr = (e) => (t, n) => {
  if (e === null)
    throw new Error("A native BlobEvent could not be created.");
  return new e(t, n);
}, _r = (e, t) => (n, r, s) => {
  const o = [];
  let a = r, c = 0;
  for (; c < n.byteLength; )
    if (a === null) {
      const i = t(n, c);
      if (i === null)
        break;
      const { length: u, type: d } = i;
      a = d, c += u;
    } else {
      const i = e(n, c, a, s);
      if (i === null)
        break;
      const { content: u, length: d } = i;
      a = null, c += d, u !== null && o.push(u);
    }
  return { contents: o, currentElementType: a, offset: c };
}, Er = (e, t) => class {
  constructor(r = null) {
    this._listeners = /* @__PURE__ */ new WeakMap(), this._nativeEventTarget = r === null ? e() : r;
  }
  addEventListener(r, s, o) {
    if (s !== null) {
      let a = this._listeners.get(s);
      a === void 0 && (a = t(this, s), typeof s == "function" && this._listeners.set(s, a)), this._nativeEventTarget.addEventListener(r, a, o);
    }
  }
  dispatchEvent(r) {
    return this._nativeEventTarget.dispatchEvent(r);
  }
  removeEventListener(r, s, o) {
    const a = s === null ? void 0 : this._listeners.get(s);
    this._nativeEventTarget.removeEventListener(r, a === void 0 ? null : a, o);
  }
}, yr = (e) => () => {
  if (e === null)
    throw new Error("A native EventTarget could not be created.");
  return e.document.createElement("p");
}, br = (e = "") => {
  try {
    return new DOMException(e, "InvalidModificationError");
  } catch (t) {
    return t.code = 13, t.message = e, t.name = "InvalidModificationError", t;
  }
}, Ar = () => {
  try {
    return new DOMException("", "InvalidStateError");
  } catch (e) {
    return e.code = 11, e.name = "InvalidStateError", e;
  }
}, Cr = (e, t, n, r, s, o, a) => class extends o {
  constructor(i, u = {}) {
    const { mimeType: d } = u;
    if (a !== null && // Bug #10: Safari does not yet implement the isTypeSupported() method.
    (d === void 0 || a.isTypeSupported !== void 0 && a.isTypeSupported(d))) {
      const l = e(a, i, u);
      super(l), this._internalMediaRecorder = l;
    } else if (d !== void 0 && s.some((l) => l.test(d)))
      super(), a !== null && a.isTypeSupported !== void 0 && a.isTypeSupported("audio/webm;codecs=pcm") ? this._internalMediaRecorder = r(this, a, i, d) : this._internalMediaRecorder = n(this, i, d);
    else
      throw a !== null && e(a, i, u), t();
    this._ondataavailable = null, this._onerror = null, this._onpause = null, this._onresume = null, this._onstart = null, this._onstop = null;
  }
  get mimeType() {
    return this._internalMediaRecorder.mimeType;
  }
  get ondataavailable() {
    return this._ondataavailable === null ? this._ondataavailable : this._ondataavailable[0];
  }
  set ondataavailable(i) {
    if (this._ondataavailable !== null && this.removeEventListener("dataavailable", this._ondataavailable[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("dataavailable", u), this._ondataavailable = [i, u];
    } else
      this._ondataavailable = null;
  }
  get onerror() {
    return this._onerror === null ? this._onerror : this._onerror[0];
  }
  set onerror(i) {
    if (this._onerror !== null && this.removeEventListener("error", this._onerror[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("error", u), this._onerror = [i, u];
    } else
      this._onerror = null;
  }
  get onpause() {
    return this._onpause === null ? this._onpause : this._onpause[0];
  }
  set onpause(i) {
    if (this._onpause !== null && this.removeEventListener("pause", this._onpause[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("pause", u), this._onpause = [i, u];
    } else
      this._onpause = null;
  }
  get onresume() {
    return this._onresume === null ? this._onresume : this._onresume[0];
  }
  set onresume(i) {
    if (this._onresume !== null && this.removeEventListener("resume", this._onresume[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("resume", u), this._onresume = [i, u];
    } else
      this._onresume = null;
  }
  get onstart() {
    return this._onstart === null ? this._onstart : this._onstart[0];
  }
  set onstart(i) {
    if (this._onstart !== null && this.removeEventListener("start", this._onstart[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("start", u), this._onstart = [i, u];
    } else
      this._onstart = null;
  }
  get onstop() {
    return this._onstop === null ? this._onstop : this._onstop[0];
  }
  set onstop(i) {
    if (this._onstop !== null && this.removeEventListener("stop", this._onstop[1]), typeof i == "function") {
      const u = i.bind(this);
      this.addEventListener("stop", u), this._onstop = [i, u];
    } else
      this._onstop = null;
  }
  get state() {
    return this._internalMediaRecorder.state;
  }
  pause() {
    return this._internalMediaRecorder.pause();
  }
  resume() {
    return this._internalMediaRecorder.resume();
  }
  start(i) {
    return this._internalMediaRecorder.start(i);
  }
  stop() {
    return this._internalMediaRecorder.stop();
  }
  static isTypeSupported(i) {
    return a !== null && // Bug #10: Safari does not yet implement the isTypeSupported() method.
    a.isTypeSupported !== void 0 && a.isTypeSupported(i) || s.some((u) => u.test(i));
  }
}, Tr = (e) => e !== null && e.BlobEvent !== void 0 ? e.BlobEvent : null, Mr = (e) => e === null || e.MediaRecorder === void 0 ? null : e.MediaRecorder, Nr = (e) => (t, n, r) => {
  const s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = [], i = new t(n, r), u = /* @__PURE__ */ new WeakMap();
  return i.addEventListener("stop", ({ isTrusted: d }) => {
    d && setTimeout(() => c.shift());
  }), i.addEventListener = ((d) => (l, m, w) => {
    let p = m;
    if (typeof m == "function")
      if (l === "dataavailable") {
        const f = [];
        p = (g) => {
          const [[h, A] = [!1, !1]] = c;
          h && !A ? f.push(g) : m.call(i, g);
        }, s.set(m, f), o.set(m, p);
      } else
        l === "error" ? (p = (f) => {
          f instanceof ErrorEvent ? m.call(i, f) : m.call(i, new ErrorEvent("error", { error: f.error }));
        }, a.set(m, p)) : l === "stop" && (p = (f) => {
          for (const [g, h] of s.entries())
            if (h.length > 0) {
              const [A] = h;
              h.length > 1 && Object.defineProperty(A, "data", {
                value: new Blob(h.map(({ data: _ }) => _), { type: A.data.type })
              }), h.length = 0, g.call(i, A);
            }
          m.call(i, f);
        }, u.set(m, p));
    return d.call(i, l, p, w);
  })(i.addEventListener), i.removeEventListener = ((d) => (l, m, w) => {
    let p = m;
    if (typeof m == "function") {
      if (l === "dataavailable") {
        s.delete(m);
        const f = o.get(m);
        f !== void 0 && (p = f);
      } else if (l === "error") {
        const f = a.get(m);
        f !== void 0 && (p = f);
      } else if (l === "stop") {
        const f = u.get(m);
        f !== void 0 && (p = f);
      }
    }
    return d.call(i, l, p, w);
  })(i.removeEventListener), i.start = ((d) => (l) => {
    if (r.mimeType !== void 0 && r.mimeType.startsWith("audio/") && n.getVideoTracks().length > 0)
      throw e();
    return i.state === "inactive" && c.push([l !== void 0, !0]), l === void 0 ? d.call(i) : d.call(i, l);
  })(i.start), i.stop = ((d) => () => {
    i.state !== "inactive" && (c[0][1] = !1), d.call(i);
  })(i.stop), i;
}, nt = () => {
  try {
    return new DOMException("", "NotSupportedError");
  } catch (e) {
    return e.code = 9, e.name = "NotSupportedError", e;
  }
}, Ir = (e) => (t, n, r, s = 2) => {
  const o = e(t, n);
  if (o === null)
    return o;
  const { length: a, value: c } = o;
  if (r === "master")
    return { content: null, length: a };
  if (n + a + c > t.byteLength)
    return null;
  if (r === "binary") {
    const i = (c / Float32Array.BYTES_PER_ELEMENT - 1) / s, u = Array.from({ length: s }, () => new Float32Array(i));
    for (let d = 0; d < i; d += 1) {
      const l = d * s + 1;
      for (let m = 0; m < s; m += 1)
        u[m][d] = t.getFloat32(n + a + (l + m) * Float32Array.BYTES_PER_ELEMENT, !0);
    }
    return { content: u, length: a + c };
  }
  return { content: null, length: a + c };
}, kr = (e) => (t, n) => {
  const r = e(t, n);
  if (r === null)
    return r;
  const { length: s, value: o } = r;
  return o === 35 ? { length: s, type: "binary" } : o === 46 || o === 97 || o === 88713574 || o === 106212971 || o === 139690087 || o === 172351395 || o === 256095861 ? { length: s, type: "master" } : { length: s, type: "unknown" };
}, Or = (e) => (t, n) => {
  const r = e(t, n);
  if (r === null)
    return r;
  const s = n + Math.floor((r - 1) / 8);
  if (s + r > t.byteLength)
    return null;
  let a = t.getUint8(s) & (1 << 8 - r % 8) - 1;
  for (let c = 1; c < r; c += 1)
    a = (a << 8) + t.getUint8(s + c);
  return { length: r, value: a };
}, Dt = Symbol.observable || "@@observable";
function Rr(e) {
  return Symbol.observable || (typeof e == "function" && e.prototype && e.prototype[Symbol.observable] ? (e.prototype[Dt] = e.prototype[Symbol.observable], delete e.prototype[Symbol.observable]) : (e[Dt] = e[Symbol.observable], delete e[Symbol.observable])), e;
}
const Oe = () => {
}, Vt = (e) => {
  throw e;
};
function Sr(e) {
  return e ? e.next && e.error && e.complete ? e : {
    complete: (e.complete ?? Oe).bind(e),
    error: (e.error ?? Vt).bind(e),
    next: (e.next ?? Oe).bind(e)
  } : {
    complete: Oe,
    error: Vt,
    next: Oe
  };
}
const Pr = (e) => (t, n, r) => e((s) => {
  const o = (a) => s.next(a);
  return t.addEventListener(n, o, r), () => t.removeEventListener(n, o, r);
}), Lr = (e, t) => {
  const n = () => {
  }, r = (s) => typeof s[0] == "function";
  return (s) => {
    const o = (...a) => {
      const c = s(r(a) ? t({ next: a[0] }) : t(...a));
      return c !== void 0 ? c : n;
    };
    return o[Symbol.observable] = () => ({
      subscribe: (...a) => ({ unsubscribe: o(...a) })
    }), e(o);
  };
}, Ur = Lr(Rr, Sr), un = Pr(Ur), Br = (e, t, n) => async (r) => {
  const s = new e([n], { type: "application/javascript; charset=utf-8" }), o = t.createObjectURL(s);
  try {
    await r(o);
  } finally {
    t.revokeObjectURL(o);
  }
}, Wr = (e) => ({ data: t }) => {
  const { id: n } = t;
  if (n !== null) {
    const r = e.get(n);
    if (r !== void 0) {
      const { reject: s, resolve: o } = r;
      e.delete(n), t.error === void 0 ? o(t.result) : s(new Error(t.error.message));
    }
  }
}, Dr = (e) => (t, n) => (r, s = []) => new Promise((o, a) => {
  const c = e(t);
  t.set(c, { reject: a, resolve: o }), n.postMessage({ id: c, ...r }, s);
}), Vr = (e, t, n, r) => (s, o, a = {}) => {
  const c = new s(o, "recorder-audio-worklet-processor", {
    ...a,
    channelCountMode: "explicit",
    numberOfInputs: 1,
    numberOfOutputs: 0
  }), i = /* @__PURE__ */ new Map(), u = t(i, c.port), d = n(c.port, "message")(e(i));
  c.port.start();
  let l = "inactive";
  return Object.defineProperties(c, {
    pause: {
      get() {
        return async () => (r(["recording"], l), l = "paused", u({
          method: "pause"
        }));
      }
    },
    port: {
      get() {
        throw new Error("The port of a RecorderAudioWorkletNode can't be accessed.");
      }
    },
    record: {
      get() {
        return async (m) => (r(["inactive"], l), l = "recording", u({
          method: "record",
          params: { encoderPort: m }
        }, [m]));
      }
    },
    resume: {
      get() {
        return async () => (r(["paused"], l), l = "recording", u({
          method: "resume"
        }));
      }
    },
    stop: {
      get() {
        return async () => {
          r(["paused", "recording"], l), l = "stopped";
          try {
            await u({ method: "stop" });
          } finally {
            d();
          }
        };
      }
    }
  }), c;
}, xr = (e, t) => {
  if (!e.includes(t))
    throw new Error(`Expected the state to be ${e.map((n) => `"${n}"`).join(" or ")} but it was "${t}".`);
}, Fr = '(()=>{"use strict";class e extends AudioWorkletProcessor{constructor(){super(),this._encoderPort=null,this._numberOfChannels=0,this._state="inactive",this.port.onmessage=({data:e})=>{"pause"===e.method?"active"===this._state||"recording"===this._state?(this._state="paused",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"record"===e.method?"inactive"===this._state?(this._encoderPort=e.params.encoderPort,this._state="active",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"resume"===e.method?"paused"===this._state?(this._state="active",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"stop"===e.method?"active"!==this._state&&"paused"!==this._state&&"recording"!==this._state||null===this._encoderPort?this._sendUnexpectedStateError(e.id):(this._stop(this._encoderPort),this._sendAcknowledgement(e.id)):"number"==typeof e.id&&this.port.postMessage({error:{code:-32601,message:"The requested method is not supported."},id:e.id})}}process([e]){if("inactive"===this._state||"paused"===this._state)return!0;if("active"===this._state){if(void 0===e)throw new Error("No channelData was received for the first input.");if(0===e.length)return!0;this._state="recording"}if("recording"===this._state&&null!==this._encoderPort){if(void 0===e)throw new Error("No channelData was received for the first input.");return 0===e.length?this._encoderPort.postMessage(Array.from({length:this._numberOfChannels},(()=>128))):(this._encoderPort.postMessage(e,e.map((({buffer:e})=>e))),this._numberOfChannels=e.length),!0}return!1}_sendAcknowledgement(e){this.port.postMessage({id:e,result:null})}_sendUnexpectedStateError(e){this.port.postMessage({error:{code:-32603,message:"The internal state does not allow to process the given message."},id:e})}_stop(e){e.postMessage([]),e.close(),this._encoderPort=null,this._state="stopped"}}e.parameterDescriptors=[],registerProcessor("recorder-audio-worklet-processor",e)})();', jr = Br(Blob, URL, Fr), Gr = Vr(Wr, Dr(ht), un, xr), xt = (e, t, n) => ({ endTime: t, insertTime: n, type: "exponentialRampToValue", value: e }), Ft = (e, t, n) => ({ endTime: t, insertTime: n, type: "linearRampToValue", value: e }), rt = (e, t) => ({ startTime: t, type: "setValue", value: e }), ln = (e, t, n) => ({ duration: n, startTime: t, type: "setValueCurve", values: e }), dn = (e, t, { startTime: n, target: r, timeConstant: s }) => r + (t - r) * Math.exp((n - e) / s), ge = (e) => e.type === "exponentialRampToValue", Ue = (e) => e.type === "linearRampToValue", re = (e) => ge(e) || Ue(e), mt = (e) => e.type === "setValue", J = (e) => e.type === "setValueCurve", Be = (e, t, n, r) => {
  const s = e[t];
  return s === void 0 ? r : re(s) || mt(s) ? s.value : J(s) ? s.values[s.values.length - 1] : dn(n, Be(e, t - 1, s.startTime, r), s);
}, jt = (e, t, n, r, s) => n === void 0 ? [r.insertTime, s] : re(n) ? [n.endTime, n.value] : mt(n) ? [n.startTime, n.value] : J(n) ? [
  n.startTime + n.duration,
  n.values[n.values.length - 1]
] : [
  n.startTime,
  Be(e, t - 1, n.startTime, s)
], st = (e) => e.type === "cancelAndHold", ot = (e) => e.type === "cancelScheduledValues", ne = (e) => st(e) || ot(e) ? e.cancelTime : ge(e) || Ue(e) ? e.endTime : e.startTime, Gt = (e, t, n, { endTime: r, value: s }) => n === s ? s : 0 < n && 0 < s || n < 0 && s < 0 ? n * (s / n) ** ((e - t) / (r - t)) : 0, qt = (e, t, n, { endTime: r, value: s }) => n + (e - t) / (r - t) * (s - n), qr = (e, t) => {
  const n = Math.floor(t), r = Math.ceil(t);
  return n === r ? e[n] : (1 - (t - n)) * e[n] + (1 - (r - t)) * e[r];
}, $r = (e, { duration: t, startTime: n, values: r }) => {
  const s = (e - n) / t * (r.length - 1);
  return qr(r, s);
}, Re = (e) => e.type === "setTarget";
class zr {
  constructor(t) {
    this._automationEvents = [], this._currenTime = 0, this._defaultValue = t;
  }
  [Symbol.iterator]() {
    return this._automationEvents[Symbol.iterator]();
  }
  add(t) {
    const n = ne(t);
    if (st(t) || ot(t)) {
      const r = this._automationEvents.findIndex((o) => ot(t) && J(o) ? o.startTime + o.duration >= n : ne(o) >= n), s = this._automationEvents[r];
      if (r !== -1 && (this._automationEvents = this._automationEvents.slice(0, r)), st(t)) {
        const o = this._automationEvents[this._automationEvents.length - 1];
        if (s !== void 0 && re(s)) {
          if (o !== void 0 && Re(o))
            throw new Error("The internal list is malformed.");
          const a = o === void 0 ? s.insertTime : J(o) ? o.startTime + o.duration : ne(o), c = o === void 0 ? this._defaultValue : J(o) ? o.values[o.values.length - 1] : o.value, i = ge(s) ? Gt(n, a, c, s) : qt(n, a, c, s), u = ge(s) ? xt(i, n, this._currenTime) : Ft(i, n, this._currenTime);
          this._automationEvents.push(u);
        }
        if (o !== void 0 && Re(o) && this._automationEvents.push(rt(this.getValue(n), n)), o !== void 0 && J(o) && o.startTime + o.duration > n) {
          const a = n - o.startTime, c = (o.values.length - 1) / o.duration, i = Math.max(2, 1 + Math.ceil(a * c)), u = a / (i - 1) * c, d = o.values.slice(0, i);
          if (u < 1)
            for (let l = 1; l < i; l += 1) {
              const m = u * l % 1;
              d[l] = o.values[l - 1] * (1 - m) + o.values[l] * m;
            }
          this._automationEvents[this._automationEvents.length - 1] = ln(d, o.startTime, a);
        }
      }
    } else {
      const r = this._automationEvents.findIndex((a) => ne(a) > n), s = r === -1 ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[r - 1];
      if (s !== void 0 && J(s) && ne(s) + s.duration > n)
        return !1;
      const o = ge(t) ? xt(t.value, t.endTime, this._currenTime) : Ue(t) ? Ft(t.value, n, this._currenTime) : t;
      if (r === -1)
        this._automationEvents.push(o);
      else {
        if (J(t) && n + t.duration > ne(this._automationEvents[r]))
          return !1;
        this._automationEvents.splice(r, 0, o);
      }
    }
    return !0;
  }
  flush(t) {
    const n = this._automationEvents.findIndex((r) => ne(r) > t);
    if (n > 1) {
      const r = this._automationEvents.slice(n - 1), s = r[0];
      Re(s) && r.unshift(rt(Be(this._automationEvents, n - 2, s.startTime, this._defaultValue), s.startTime)), this._automationEvents = r;
    }
  }
  getValue(t) {
    if (this._automationEvents.length === 0)
      return this._defaultValue;
    const n = this._automationEvents.findIndex((a) => ne(a) > t), r = this._automationEvents[n], s = (n === -1 ? this._automationEvents.length : n) - 1, o = this._automationEvents[s];
    if (o !== void 0 && Re(o) && (r === void 0 || !re(r) || r.insertTime > t))
      return dn(t, Be(this._automationEvents, s - 1, o.startTime, this._defaultValue), o);
    if (o !== void 0 && mt(o) && (r === void 0 || !re(r)))
      return o.value;
    if (o !== void 0 && J(o) && (r === void 0 || !re(r) || o.startTime + o.duration > t))
      return t < o.startTime + o.duration ? $r(t, o) : o.values[o.values.length - 1];
    if (o !== void 0 && re(o) && (r === void 0 || !re(r)))
      return o.value;
    if (r !== void 0 && ge(r)) {
      const [a, c] = jt(this._automationEvents, s, o, r, this._defaultValue);
      return Gt(t, a, c, r);
    }
    if (r !== void 0 && Ue(r)) {
      const [a, c] = jt(this._automationEvents, s, o, r, this._defaultValue);
      return qt(t, a, c, r);
    }
    return this._defaultValue;
  }
}
const Xr = (e) => ({ cancelTime: e, type: "cancelAndHold" }), Yr = (e) => ({ cancelTime: e, type: "cancelScheduledValues" }), Hr = (e, t) => ({ endTime: t, type: "exponentialRampToValue", value: e }), Zr = (e, t) => ({ endTime: t, type: "linearRampToValue", value: e }), Kr = (e, t, n) => ({ startTime: t, target: e, timeConstant: n, type: "setTarget" }), Qr = () => new DOMException("", "AbortError"), Jr = (e) => (t, n, [r, s, o], a) => {
  e(t[s], [n, r, o], (c) => c[0] === n && c[1] === r, a);
}, es = (e) => (t, n, r) => {
  const s = [];
  for (let o = 0; o < r.numberOfInputs; o += 1)
    s.push(/* @__PURE__ */ new Set());
  e.set(t, {
    activeInputs: s,
    outputs: /* @__PURE__ */ new Set(),
    passiveInputs: /* @__PURE__ */ new WeakMap(),
    renderer: n
  });
}, ts = (e) => (t, n) => {
  e.set(t, { activeInputs: /* @__PURE__ */ new Set(), passiveInputs: /* @__PURE__ */ new WeakMap(), renderer: n });
}, we = /* @__PURE__ */ new WeakSet(), fn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), pn = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), vn = {
  construct() {
    return vn;
  }
}, ns = (e) => {
  try {
    const t = new Proxy(e, vn);
    new t();
  } catch {
    return !1;
  }
  return !0;
}, $t = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/, zt = (e, t) => {
  const n = [];
  let r = e.replace(/^[\s]+/, ""), s = r.match($t);
  for (; s !== null; ) {
    const o = s[1].slice(1, -1), a = s[0].replace(/([\s]+)?;?$/, "").replace(o, new URL(o, t).toString());
    n.push(a), r = r.slice(s[0].length).replace(/^[\s]+/, ""), s = r.match($t);
  }
  return [n.join(";"), r];
}, Xt = (e) => {
  if (e !== void 0 && !Array.isArray(e))
    throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
}, Yt = (e) => {
  if (!ns(e))
    throw new TypeError("The given value for processorCtor should be a constructor.");
  if (e.prototype === null || typeof e.prototype != "object")
    throw new TypeError("The given value for processorCtor should have a prototype.");
}, rs = (e, t, n, r, s, o, a, c, i, u, d, l, m) => {
  let w = 0;
  return (p, f, g = { credentials: "omit" }) => {
    const h = d.get(p);
    if (h !== void 0 && h.has(f))
      return Promise.resolve();
    const A = u.get(p);
    if (A !== void 0) {
      const v = A.get(f);
      if (v !== void 0)
        return v;
    }
    const _ = o(p), T = _.audioWorklet === void 0 ? s(f).then(([v, b]) => {
      const [y, E] = zt(v, b), M = `${y};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${E}
})})(window,'_AWGS')`;
      return n(M);
    }).then(() => {
      const v = m._AWGS.pop();
      if (v === void 0)
        throw new SyntaxError();
      r(_.currentTime, _.sampleRate, () => v(class {
      }, void 0, (b, y) => {
        if (b.trim() === "")
          throw t();
        const E = it.get(_);
        if (E !== void 0) {
          if (E.has(b))
            throw t();
          Yt(y), Xt(y.parameterDescriptors), E.set(b, y);
        } else
          Yt(y), Xt(y.parameterDescriptors), it.set(_, /* @__PURE__ */ new Map([[b, y]]));
      }, _.sampleRate, void 0, void 0));
    }) : Promise.all([
      s(f),
      Promise.resolve(e(l, l))
    ]).then(([[v, b], y]) => {
      const E = w + 1;
      w = E;
      const [M, R] = zt(v, b), U = `${M};((AudioWorkletProcessor,registerProcessor)=>{${R}
})(${y ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${y ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${y ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${E}',class extends AudioWorkletProcessor{process(){return !1}})`, W = new Blob([U], { type: "application/javascript; charset=utf-8" }), O = URL.createObjectURL(W);
      return _.audioWorklet.addModule(O, g).then(() => {
        if (c(_))
          return _;
        const B = a(_);
        return B.audioWorklet.addModule(O, g).then(() => B);
      }).then((B) => {
        if (i === null)
          throw new SyntaxError();
        try {
          new i(B, `__sac${E}`);
        } catch {
          throw new SyntaxError();
        }
      }).finally(() => URL.revokeObjectURL(O));
    });
    return A === void 0 ? u.set(p, /* @__PURE__ */ new Map([[f, T]])) : A.set(f, T), T.then(() => {
      const v = d.get(p);
      v === void 0 ? d.set(p, /* @__PURE__ */ new Set([f])) : v.add(f);
    }).finally(() => {
      const v = u.get(p);
      v !== void 0 && v.delete(f);
    }), T;
  };
}, K = (e, t) => {
  const n = e.get(t);
  if (n === void 0)
    throw new Error("A value with the given key could not be found.");
  return n;
}, je = (e, t) => {
  const n = Array.from(e).filter(t);
  if (n.length > 1)
    throw Error("More than one element was found.");
  if (n.length === 0)
    throw Error("No element was found.");
  const [r] = n;
  return e.delete(r), r;
}, _n = (e, t, n, r) => {
  const s = K(e, t), o = je(s, (a) => a[0] === n && a[1] === r);
  return s.size === 0 && e.delete(t), o;
}, Te = (e) => K(wn, e), We = (e) => {
  if (we.has(e))
    throw new Error("The AudioNode is already stored.");
  we.add(e), Te(e).forEach((t) => t(!0));
}, En = (e) => "port" in e, gt = (e) => {
  if (!we.has(e))
    throw new Error("The AudioNode is not stored.");
  we.delete(e), Te(e).forEach((t) => t(!1));
}, ut = (e, t) => {
  !En(e) && t.every((n) => n.size === 0) && gt(e);
}, ss = (e, t, n, r, s, o, a, c, i, u, d, l, m) => {
  const w = /* @__PURE__ */ new WeakMap();
  return (p, f, g, h, A) => {
    const { activeInputs: _, passiveInputs: T } = o(f), { outputs: v } = o(p), b = c(p), y = (E) => {
      const M = i(f), R = i(p);
      if (E) {
        const N = _n(T, p, g, h);
        e(_, p, N, !1), !A && !l(p) && n(R, M, g, h), m(f) && We(f);
      } else {
        const N = r(_, p, g, h);
        t(T, h, N, !1), !A && !l(p) && s(R, M, g, h);
        const P = a(f);
        if (P === 0)
          d(f) && ut(f, _);
        else {
          const L = w.get(f);
          L !== void 0 && clearTimeout(L), w.set(f, setTimeout(() => {
            d(f) && ut(f, _);
          }, P * 1e3));
        }
      }
    };
    return u(v, [f, g, h], (E) => E[0] === f && E[1] === g && E[2] === h, !0) ? (b.add(y), d(p) ? e(_, p, [g, h, y], !0) : t(T, h, [p, g, y], !0), !0) : !1;
  };
}, os = (e) => (t, n, [r, s, o], a) => {
  const c = t.get(r);
  c === void 0 ? t.set(r, /* @__PURE__ */ new Set([[s, n, o]])) : e(c, [s, n, o], (i) => i[0] === s && i[1] === n, a);
}, as = (e) => (t, n) => {
  const r = e(t, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  n.connect(r).connect(t.destination);
  const s = () => {
    n.removeEventListener("ended", s), n.disconnect(r), r.disconnect();
  };
  n.addEventListener("ended", s);
}, is = (e) => (t, n) => {
  e(t).add(n);
}, yn = (e, t) => e.context === t, Ht = (e) => {
  try {
    e.copyToChannel(new Float32Array(1), 0, -1);
  } catch {
    return !1;
  }
  return !0;
}, ue = () => new DOMException("", "IndexSizeError"), cs = (e) => {
  e.getChannelData = ((t) => (n) => {
    try {
      return t.call(e, n);
    } catch (r) {
      throw r.code === 12 ? ue() : r;
    }
  })(e.getChannelData);
}, us = {
  numberOfChannels: 1
}, ls = (e, t, n, r, s, o, a, c) => {
  let i = null;
  return class bn {
    constructor(d) {
      if (s === null)
        throw new Error("Missing the native OfflineAudioContext constructor.");
      const { length: l, numberOfChannels: m, sampleRate: w } = { ...us, ...d };
      i === null && (i = new s(1, 1, 44100));
      const p = r !== null && t(o, o) ? new r({ length: l, numberOfChannels: m, sampleRate: w }) : i.createBuffer(m, l, w);
      if (p.numberOfChannels === 0)
        throw n();
      return typeof p.copyFromChannel != "function" ? (a(p), cs(p)) : t(Ht, () => Ht(p)) || c(p), e.add(p), p;
    }
    static [Symbol.hasInstance](d) {
      return d !== null && typeof d == "object" && Object.getPrototypeOf(d) === bn.prototype || e.has(d);
    }
  };
}, Ge = -34028234663852886e22, wt = -Ge, ae = (e) => we.has(e), ds = {
  buffer: null,
  channelCount: 2,
  channelCountMode: "max",
  channelInterpretation: "speakers",
  // Bug #149: Safari does not yet support the detune AudioParam.
  loop: !1,
  loopEnd: 0,
  loopStart: 0,
  playbackRate: 1
}, fs = (e, t, n, r, s, o, a, c) => class extends e {
  constructor(u, d) {
    const l = o(u), m = { ...ds, ...d }, w = s(l, m), p = a(l), f = p ? t() : null;
    super(u, !1, w, f), this._audioBufferSourceNodeRenderer = f, this._isBufferNullified = !1, this._isBufferSet = m.buffer !== null, this._nativeAudioBufferSourceNode = w, this._onended = null, this._playbackRate = n(this, p, w.playbackRate, wt, Ge);
  }
  get buffer() {
    return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
  }
  set buffer(u) {
    if (this._nativeAudioBufferSourceNode.buffer = u, u !== null) {
      if (this._isBufferSet)
        throw r();
      this._isBufferSet = !0;
    }
  }
  get loop() {
    return this._nativeAudioBufferSourceNode.loop;
  }
  set loop(u) {
    this._nativeAudioBufferSourceNode.loop = u;
  }
  get loopEnd() {
    return this._nativeAudioBufferSourceNode.loopEnd;
  }
  set loopEnd(u) {
    this._nativeAudioBufferSourceNode.loopEnd = u;
  }
  get loopStart() {
    return this._nativeAudioBufferSourceNode.loopStart;
  }
  set loopStart(u) {
    this._nativeAudioBufferSourceNode.loopStart = u;
  }
  get onended() {
    return this._onended;
  }
  set onended(u) {
    const d = typeof u == "function" ? c(this, u) : null;
    this._nativeAudioBufferSourceNode.onended = d;
    const l = this._nativeAudioBufferSourceNode.onended;
    this._onended = l !== null && l === d ? u : l;
  }
  get playbackRate() {
    return this._playbackRate;
  }
  start(u = 0, d = 0, l) {
    if (this._nativeAudioBufferSourceNode.start(u, d, l), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.start = l === void 0 ? [u, d] : [u, d, l]), this.context.state !== "closed") {
      We(this);
      const m = () => {
        this._nativeAudioBufferSourceNode.removeEventListener("ended", m), ae(this) && gt(this);
      };
      this._nativeAudioBufferSourceNode.addEventListener("ended", m);
    }
  }
  stop(u = 0) {
    this._nativeAudioBufferSourceNode.stop(u), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.stop = u);
  }
}, hs = (e, t, n, r, s) => () => {
  const o = /* @__PURE__ */ new WeakMap();
  let a = null, c = null;
  const i = async (u, d) => {
    let l = n(u);
    const m = yn(l, d);
    if (!m) {
      const w = {
        buffer: l.buffer,
        channelCount: l.channelCount,
        channelCountMode: l.channelCountMode,
        channelInterpretation: l.channelInterpretation,
        // Bug #149: Safari does not yet support the detune AudioParam.
        loop: l.loop,
        loopEnd: l.loopEnd,
        loopStart: l.loopStart,
        playbackRate: l.playbackRate.value
      };
      l = t(d, w), a !== null && l.start(...a), c !== null && l.stop(c);
    }
    return o.set(d, l), m ? await e(d, u.playbackRate, l.playbackRate) : await r(d, u.playbackRate, l.playbackRate), await s(u, d, l), l;
  };
  return {
    set start(u) {
      a = u;
    },
    set stop(u) {
      c = u;
    },
    render(u, d) {
      const l = o.get(d);
      return l !== void 0 ? Promise.resolve(l) : i(u, d);
    }
  };
}, ps = (e) => "playbackRate" in e, ms = (e) => "frequency" in e && "gain" in e, gs = (e) => "offset" in e, ws = (e) => !("frequency" in e) && "gain" in e, vs = (e) => "detune" in e && "frequency" in e && !("gain" in e), _s = (e) => "pan" in e, z = (e) => K(fn, e), Me = (e) => K(pn, e), lt = (e, t) => {
  const { activeInputs: n } = z(e);
  n.forEach((s) => s.forEach(([o]) => {
    t.includes(e) || lt(o, [...t, e]);
  }));
  const r = ps(e) ? [
    // Bug #149: Safari does not yet support the detune AudioParam.
    e.playbackRate
  ] : En(e) ? Array.from(e.parameters.values()) : ms(e) ? [e.Q, e.detune, e.frequency, e.gain] : gs(e) ? [e.offset] : ws(e) ? [e.gain] : vs(e) ? [e.detune, e.frequency] : _s(e) ? [e.pan] : [];
  for (const s of r) {
    const o = Me(s);
    o !== void 0 && o.activeInputs.forEach(([a]) => lt(a, t));
  }
  ae(e) && gt(e);
}, Es = (e) => {
  lt(e.destination, []);
}, ys = (e) => e === void 0 || typeof e == "number" || typeof e == "string" && (e === "balanced" || e === "interactive" || e === "playback"), bs = (e, t, n, r, s, o, a, c) => class extends e {
  constructor(u, d) {
    const l = o(u), m = a(l), w = s(l, d, m), p = m ? t(c) : null;
    super(u, !1, w, p), this._isNodeOfNativeOfflineAudioContext = m, this._nativeAudioDestinationNode = w;
  }
  get channelCount() {
    return this._nativeAudioDestinationNode.channelCount;
  }
  set channelCount(u) {
    if (this._isNodeOfNativeOfflineAudioContext)
      throw r();
    if (u > this._nativeAudioDestinationNode.maxChannelCount)
      throw n();
    this._nativeAudioDestinationNode.channelCount = u;
  }
  get channelCountMode() {
    return this._nativeAudioDestinationNode.channelCountMode;
  }
  set channelCountMode(u) {
    if (this._isNodeOfNativeOfflineAudioContext)
      throw r();
    this._nativeAudioDestinationNode.channelCountMode = u;
  }
  get maxChannelCount() {
    return this._nativeAudioDestinationNode.maxChannelCount;
  }
}, As = (e) => {
  const t = /* @__PURE__ */ new WeakMap(), n = async (r, s) => {
    const o = s.destination;
    return t.set(s, o), await e(r, s, o), o;
  };
  return {
    render(r, s) {
      const o = t.get(s);
      return o !== void 0 ? Promise.resolve(o) : n(r, s);
    }
  };
}, Cs = (e, t, n, r, s, o, a, c) => (i, u) => {
  const d = u.listener, l = () => {
    const v = new Float32Array(1), b = t(u, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: 9
    }), y = a(u);
    let E = !1, M = [0, 0, -1, 0, 1, 0], R = [0, 0, 0];
    const N = () => {
      if (E)
        return;
      E = !0;
      const W = r(u, 256, 9, 0);
      W.onaudioprocess = ({ inputBuffer: O }) => {
        const B = [
          o(O, v, 0),
          o(O, v, 1),
          o(O, v, 2),
          o(O, v, 3),
          o(O, v, 4),
          o(O, v, 5)
        ];
        B.some((I, S) => I !== M[S]) && (d.setOrientation(...B), M = B);
        const V = [
          o(O, v, 6),
          o(O, v, 7),
          o(O, v, 8)
        ];
        V.some((I, S) => I !== R[S]) && (d.setPosition(...V), R = V);
      }, b.connect(W);
    }, P = (W) => (O) => {
      O !== M[W] && (M[W] = O, d.setOrientation(...M));
    }, L = (W) => (O) => {
      O !== R[W] && (R[W] = O, d.setPosition(...R));
    }, U = (W, O, B) => {
      const V = n(u, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        offset: O
      });
      V.connect(b, 0, W), V.start(), Object.defineProperty(V.offset, "defaultValue", {
        get() {
          return O;
        }
      });
      const I = e({ context: i }, y, V.offset, wt, Ge);
      return c(I, "value", (S) => () => S.call(I), (S) => (x) => {
        try {
          S.call(I, x);
        } catch (q) {
          if (q.code !== 9)
            throw q;
        }
        N(), y && B(x);
      }), I.cancelAndHoldAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.cancelAndHoldAtTime), I.cancelScheduledValues = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.cancelScheduledValues), I.exponentialRampToValueAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.exponentialRampToValueAtTime), I.linearRampToValueAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.linearRampToValueAtTime), I.setTargetAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.setTargetAtTime), I.setValueAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.setValueAtTime), I.setValueCurveAtTime = ((S) => y ? () => {
        throw s();
      } : (...x) => {
        const q = S.apply(I, x);
        return N(), q;
      })(I.setValueCurveAtTime), I;
    };
    return {
      forwardX: U(0, 0, P(0)),
      forwardY: U(1, 0, P(1)),
      forwardZ: U(2, -1, P(2)),
      positionX: U(6, 0, L(0)),
      positionY: U(7, 0, L(1)),
      positionZ: U(8, 0, L(2)),
      upX: U(3, 0, P(3)),
      upY: U(4, 1, P(4)),
      upZ: U(5, 0, P(5))
    };
  }, { forwardX: m, forwardY: w, forwardZ: p, positionX: f, positionY: g, positionZ: h, upX: A, upY: _, upZ: T } = d.forwardX === void 0 ? l() : d;
  return {
    get forwardX() {
      return m;
    },
    get forwardY() {
      return w;
    },
    get forwardZ() {
      return p;
    },
    get positionX() {
      return f;
    },
    get positionY() {
      return g;
    },
    get positionZ() {
      return h;
    },
    get upX() {
      return A;
    },
    get upY() {
      return _;
    },
    get upZ() {
      return T;
    }
  };
}, De = (e) => "context" in e, Ne = (e) => De(e[0]), le = (e, t, n, r) => {
  for (const s of e)
    if (n(s)) {
      if (r)
        return !1;
      throw Error("The set contains at least one similar element.");
    }
  return e.add(t), !0;
}, Zt = (e, t, [n, r], s) => {
  le(e, [t, n, r], (o) => o[0] === t && o[1] === n, s);
}, Kt = (e, [t, n, r], s) => {
  const o = e.get(t);
  o === void 0 ? e.set(t, /* @__PURE__ */ new Set([[n, r]])) : le(o, [n, r], (a) => a[0] === n, s);
}, An = (e) => "inputs" in e, dt = (e, t, n, r) => {
  if (An(t)) {
    const s = t.inputs[r];
    return e.connect(s, n, 0), [s, n, 0];
  }
  return e.connect(t, n, r), [t, n, r];
}, Cn = (e, t, n) => {
  for (const r of e)
    if (r[0] === t && r[1] === n)
      return e.delete(r), r;
  return null;
}, Ts = (e, t, n) => je(e, (r) => r[0] === t && r[1] === n), Tn = (e, t) => {
  if (!Te(e).delete(t))
    throw new Error("Missing the expected event listener.");
}, Mn = (e, t, n) => {
  const r = K(e, t), s = je(r, (o) => o[0] === n);
  return r.size === 0 && e.delete(t), s;
}, ft = (e, t, n, r) => {
  An(t) ? e.disconnect(t.inputs[r], n, 0) : e.disconnect(t, n, r);
}, H = (e) => K(hn, e), Ae = (e) => K(mn, e), ie = (e) => at.has(e), Pe = (e) => !we.has(e), Qt = (e, t) => new Promise((n) => {
  if (t !== null)
    n(!0);
  else {
    const r = e.createScriptProcessor(256, 1, 1), s = e.createGain(), o = e.createBuffer(1, 2, 44100), a = o.getChannelData(0);
    a[0] = 1, a[1] = 1;
    const c = e.createBufferSource();
    c.buffer = o, c.loop = !0, c.connect(r).connect(e.destination), c.connect(s), c.disconnect(s), r.onaudioprocess = (i) => {
      const u = i.inputBuffer.getChannelData(0);
      Array.prototype.some.call(u, (d) => d === 1) ? n(!0) : n(!1), c.stop(), r.onaudioprocess = null, c.disconnect(r), r.disconnect(e.destination);
    }, c.start();
  }
}), et = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const s of r) {
      const o = n.get(s);
      n.set(s, o === void 0 ? 1 : o + 1);
    }
  n.forEach((r, s) => t(s, r));
}, Ve = (e) => "context" in e, Ms = (e) => {
  const t = /* @__PURE__ */ new Map();
  e.connect = ((n) => (r, s = 0, o = 0) => {
    const a = Ve(r) ? n(r, s, o) : n(r, s), c = t.get(r);
    return c === void 0 ? t.set(r, [{ input: o, output: s }]) : c.every((i) => i.input !== o || i.output !== s) && c.push({ input: o, output: s }), a;
  })(e.connect.bind(e)), e.disconnect = ((n) => (r, s, o) => {
    if (n.apply(e), r === void 0)
      t.clear();
    else if (typeof r == "number")
      for (const [a, c] of t) {
        const i = c.filter((u) => u.output !== r);
        i.length === 0 ? t.delete(a) : t.set(a, i);
      }
    else if (t.has(r))
      if (s === void 0)
        t.delete(r);
      else {
        const a = t.get(r);
        if (a !== void 0) {
          const c = a.filter((i) => i.output !== s && (i.input !== o || o === void 0));
          c.length === 0 ? t.delete(r) : t.set(r, c);
        }
      }
    for (const [a, c] of t)
      c.forEach((i) => {
        Ve(a) ? e.connect(a, i.output, i.input) : e.connect(a, i.output);
      });
  })(e.disconnect);
}, Ns = (e, t, n, r) => {
  const { activeInputs: s, passiveInputs: o } = Me(t), { outputs: a } = z(e), c = Te(e), i = (u) => {
    const d = H(e), l = Ae(t);
    if (u) {
      const m = Mn(o, e, n);
      Zt(s, e, m, !1), !r && !ie(e) && d.connect(l, n);
    } else {
      const m = Ts(s, e, n);
      Kt(o, m, !1), !r && !ie(e) && d.disconnect(l, n);
    }
  };
  return le(a, [t, n], (u) => u[0] === t && u[1] === n, !0) ? (c.add(i), ae(e) ? Zt(s, e, [n, i], !0) : Kt(o, [e, n, i], !0), !0) : !1;
}, Is = (e, t, n, r) => {
  const { activeInputs: s, passiveInputs: o } = z(t), a = Cn(s[r], e, n);
  return a === null ? [_n(o, e, n, r)[2], !1] : [a[2], !0];
}, ks = (e, t, n) => {
  const { activeInputs: r, passiveInputs: s } = Me(t), o = Cn(r, e, n);
  return o === null ? [Mn(s, e, n)[1], !1] : [o[2], !0];
}, vt = (e, t, n, r, s) => {
  const [o, a] = Is(e, n, r, s);
  if (o !== null && (Tn(e, o), a && !t && !ie(e) && ft(H(e), H(n), r, s)), ae(n)) {
    const { activeInputs: c } = z(n);
    ut(n, c);
  }
}, _t = (e, t, n, r) => {
  const [s, o] = ks(e, n, r);
  s !== null && (Tn(e, s), o && !t && !ie(e) && H(e).disconnect(Ae(n), r));
}, Os = (e, t) => {
  const n = z(e), r = [];
  for (const s of n.outputs)
    Ne(s) ? vt(e, t, ...s) : _t(e, t, ...s), r.push(s[0]);
  return n.outputs.clear(), r;
}, Rs = (e, t, n) => {
  const r = z(e), s = [];
  for (const o of r.outputs)
    o[1] === n && (Ne(o) ? vt(e, t, ...o) : _t(e, t, ...o), s.push(o[0]), r.outputs.delete(o));
  return s;
}, Ss = (e, t, n, r, s) => {
  const o = z(e);
  return Array.from(o.outputs).filter((a) => a[0] === n && (r === void 0 || a[1] === r) && (s === void 0 || a[2] === s)).map((a) => (Ne(a) ? vt(e, t, ...a) : _t(e, t, ...a), o.outputs.delete(a), a[0]));
}, Ps = (e, t, n, r, s, o, a, c, i, u, d, l, m, w, p, f) => class extends u {
  constructor(h, A, _, T) {
    super(_), this._context = h, this._nativeAudioNode = _;
    const v = d(h);
    l(v) && n(Qt, () => Qt(v, f)) !== !0 && Ms(_), hn.set(this, _), wn.set(this, /* @__PURE__ */ new Set()), h.state !== "closed" && A && We(this), e(this, T, _);
  }
  get channelCount() {
    return this._nativeAudioNode.channelCount;
  }
  set channelCount(h) {
    this._nativeAudioNode.channelCount = h;
  }
  get channelCountMode() {
    return this._nativeAudioNode.channelCountMode;
  }
  set channelCountMode(h) {
    this._nativeAudioNode.channelCountMode = h;
  }
  get channelInterpretation() {
    return this._nativeAudioNode.channelInterpretation;
  }
  set channelInterpretation(h) {
    this._nativeAudioNode.channelInterpretation = h;
  }
  get context() {
    return this._context;
  }
  get numberOfInputs() {
    return this._nativeAudioNode.numberOfInputs;
  }
  get numberOfOutputs() {
    return this._nativeAudioNode.numberOfOutputs;
  }
  // tslint:disable-next-line:invalid-void
  connect(h, A = 0, _ = 0) {
    if (A < 0 || A >= this._nativeAudioNode.numberOfOutputs)
      throw s();
    const T = d(this._context), v = p(T);
    if (m(h) || w(h))
      throw o();
    if (De(h)) {
      const E = H(h);
      try {
        const R = dt(this._nativeAudioNode, E, A, _), N = Pe(this);
        (v || N) && this._nativeAudioNode.disconnect(...R), this.context.state !== "closed" && !N && Pe(h) && We(h);
      } catch (R) {
        throw R.code === 12 ? o() : R;
      }
      if (t(this, h, A, _, v)) {
        const R = i([this], h);
        et(R, r(v));
      }
      return h;
    }
    const b = Ae(h);
    if (b.name === "playbackRate" && b.maxValue === 1024)
      throw a();
    try {
      this._nativeAudioNode.connect(b, A), (v || Pe(this)) && this._nativeAudioNode.disconnect(b, A);
    } catch (E) {
      throw E.code === 12 ? o() : E;
    }
    if (Ns(this, h, A, v)) {
      const E = i([this], h);
      et(E, r(v));
    }
  }
  disconnect(h, A, _) {
    let T;
    const v = d(this._context), b = p(v);
    if (h === void 0)
      T = Os(this, b);
    else if (typeof h == "number") {
      if (h < 0 || h >= this.numberOfOutputs)
        throw s();
      T = Rs(this, b, h);
    } else {
      if (A !== void 0 && (A < 0 || A >= this.numberOfOutputs) || De(h) && _ !== void 0 && (_ < 0 || _ >= h.numberOfInputs))
        throw s();
      if (T = Ss(this, b, h, A, _), T.length === 0)
        throw o();
    }
    for (const y of T) {
      const E = i([this], y);
      et(E, c);
    }
  }
}, Ls = (e, t, n, r, s, o, a, c, i, u, d, l, m) => (w, p, f, g = null, h = null) => {
  const A = f.value, _ = new zr(A), T = p ? r(_) : null, v = {
    get defaultValue() {
      return A;
    },
    get maxValue() {
      return g === null ? f.maxValue : g;
    },
    get minValue() {
      return h === null ? f.minValue : h;
    },
    get value() {
      return f.value;
    },
    set value(b) {
      f.value = b, v.setValueAtTime(b, w.context.currentTime);
    },
    cancelAndHoldAtTime(b) {
      if (typeof f.cancelAndHoldAtTime == "function")
        T === null && _.flush(w.context.currentTime), _.add(s(b)), f.cancelAndHoldAtTime(b);
      else {
        const y = Array.from(_).pop();
        T === null && _.flush(w.context.currentTime), _.add(s(b));
        const E = Array.from(_).pop();
        f.cancelScheduledValues(b), y !== E && E !== void 0 && (E.type === "exponentialRampToValue" ? f.exponentialRampToValueAtTime(E.value, E.endTime) : E.type === "linearRampToValue" ? f.linearRampToValueAtTime(E.value, E.endTime) : E.type === "setValue" ? f.setValueAtTime(E.value, E.startTime) : E.type === "setValueCurve" && f.setValueCurveAtTime(E.values, E.startTime, E.duration));
      }
      return v;
    },
    cancelScheduledValues(b) {
      return T === null && _.flush(w.context.currentTime), _.add(o(b)), f.cancelScheduledValues(b), v;
    },
    exponentialRampToValueAtTime(b, y) {
      if (b === 0)
        throw new RangeError();
      if (!Number.isFinite(y) || y < 0)
        throw new RangeError();
      const E = w.context.currentTime;
      return T === null && _.flush(E), Array.from(_).length === 0 && (_.add(u(A, E)), f.setValueAtTime(A, E)), _.add(a(b, y)), f.exponentialRampToValueAtTime(b, y), v;
    },
    linearRampToValueAtTime(b, y) {
      const E = w.context.currentTime;
      return T === null && _.flush(E), Array.from(_).length === 0 && (_.add(u(A, E)), f.setValueAtTime(A, E)), _.add(c(b, y)), f.linearRampToValueAtTime(b, y), v;
    },
    setTargetAtTime(b, y, E) {
      return T === null && _.flush(w.context.currentTime), _.add(i(b, y, E)), f.setTargetAtTime(b, y, E), v;
    },
    setValueAtTime(b, y) {
      return T === null && _.flush(w.context.currentTime), _.add(u(b, y)), f.setValueAtTime(b, y), v;
    },
    setValueCurveAtTime(b, y, E) {
      const M = b instanceof Float32Array ? b : new Float32Array(b);
      if (l !== null && l.name === "webkitAudioContext") {
        const R = y + E, N = w.context.sampleRate, P = Math.ceil(y * N), L = Math.floor(R * N), U = L - P, W = new Float32Array(U);
        for (let B = 0; B < U; B += 1) {
          const V = (M.length - 1) / E * ((P + B) / N - y), I = Math.floor(V), S = Math.ceil(V);
          W[B] = I === S ? M[I] : (1 - (V - I)) * M[I] + (1 - (S - V)) * M[S];
        }
        T === null && _.flush(w.context.currentTime), _.add(d(W, y, E)), f.setValueCurveAtTime(W, y, E);
        const O = L / N;
        O < R && m(v, W[W.length - 1], O), m(v, M[M.length - 1], R);
      } else
        T === null && _.flush(w.context.currentTime), _.add(d(M, y, E)), f.setValueCurveAtTime(M, y, E);
      return v;
    }
  };
  return n.set(v, f), t.set(v, w), e(v, T), v;
}, Us = (e) => ({
  replay(t) {
    for (const n of e)
      if (n.type === "exponentialRampToValue") {
        const { endTime: r, value: s } = n;
        t.exponentialRampToValueAtTime(s, r);
      } else if (n.type === "linearRampToValue") {
        const { endTime: r, value: s } = n;
        t.linearRampToValueAtTime(s, r);
      } else if (n.type === "setTarget") {
        const { startTime: r, target: s, timeConstant: o } = n;
        t.setTargetAtTime(s, r, o);
      } else if (n.type === "setValue") {
        const { startTime: r, value: s } = n;
        t.setValueAtTime(s, r);
      } else if (n.type === "setValueCurve") {
        const { duration: r, startTime: s, values: o } = n;
        t.setValueCurveAtTime(o, s, r);
      } else
        throw new Error("Can't apply an unknown automation.");
  }
});
class Nn {
  constructor(t) {
    this._map = new Map(t);
  }
  get size() {
    return this._map.size;
  }
  entries() {
    return this._map.entries();
  }
  forEach(t, n = null) {
    return this._map.forEach((r, s) => t.call(n, r, s, this));
  }
  get(t) {
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
  keys() {
    return this._map.keys();
  }
  values() {
    return this._map.values();
  }
}
const Bs = {
  channelCount: 2,
  // Bug #61: The channelCountMode should be 'max' according to the spec but is set to 'explicit' to achieve consistent behavior.
  channelCountMode: "explicit",
  channelInterpretation: "speakers",
  numberOfInputs: 1,
  numberOfOutputs: 1,
  parameterData: {},
  processorOptions: {}
}, Ws = (e, t, n, r, s, o, a, c, i, u, d, l, m, w) => class extends t {
  constructor(f, g, h) {
    var A;
    const _ = c(f), T = i(_), v = d({ ...Bs, ...h });
    m(v);
    const b = it.get(_), y = b == null ? void 0 : b.get(g), E = T || _.state !== "closed" ? _ : (A = a(_)) !== null && A !== void 0 ? A : _, M = s(E, T ? null : f.baseLatency, u, g, y, v), R = T ? r(g, v, y) : null;
    super(f, !0, M, R);
    const N = [];
    M.parameters.forEach((L, U) => {
      const W = n(this, T, L);
      N.push([U, W]);
    }), this._nativeAudioWorkletNode = M, this._onprocessorerror = null, this._parameters = new Nn(N), T && e(_, this);
    const { activeInputs: P } = o(this);
    l(M, P);
  }
  get onprocessorerror() {
    return this._onprocessorerror;
  }
  set onprocessorerror(f) {
    const g = typeof f == "function" ? w(this, f) : null;
    this._nativeAudioWorkletNode.onprocessorerror = g;
    const h = this._nativeAudioWorkletNode.onprocessorerror;
    this._onprocessorerror = h !== null && h === g ? f : h;
  }
  get parameters() {
    return this._parameters === null ? this._nativeAudioWorkletNode.parameters : this._parameters;
  }
  get port() {
    return this._nativeAudioWorkletNode.port;
  }
};
function xe(e, t, n, r, s) {
  if (typeof e.copyFromChannel == "function")
    t[n].byteLength === 0 && (t[n] = new Float32Array(128)), e.copyFromChannel(t[n], r, s);
  else {
    const o = e.getChannelData(r);
    if (t[n].byteLength === 0)
      t[n] = o.slice(s, s + 128);
    else {
      const a = new Float32Array(o.buffer, s * Float32Array.BYTES_PER_ELEMENT, 128);
      t[n].set(a);
    }
  }
}
const In = (e, t, n, r, s) => {
  typeof e.copyToChannel == "function" ? t[n].byteLength !== 0 && e.copyToChannel(t[n], r, s) : t[n].byteLength !== 0 && e.getChannelData(r).set(t[n], s);
}, Fe = (e, t) => {
  const n = [];
  for (let r = 0; r < e; r += 1) {
    const s = [], o = typeof t == "number" ? t : t[r];
    for (let a = 0; a < o; a += 1)
      s.push(new Float32Array(128));
    n.push(s);
  }
  return n;
}, Ds = (e, t) => {
  const n = K(ct, e), r = H(t);
  return K(n, r);
}, Vs = async (e, t, n, r, s, o, a) => {
  const c = t === null ? Math.ceil(e.context.length / 128) * 128 : t.length, i = r.channelCount * r.numberOfInputs, u = s.reduce((g, h) => g + h, 0), d = u === 0 ? null : n.createBuffer(u, c, n.sampleRate);
  if (o === void 0)
    throw new Error("Missing the processor constructor.");
  const l = z(e), m = await Ds(n, e), w = Fe(r.numberOfInputs, r.channelCount), p = Fe(r.numberOfOutputs, s), f = Array.from(e.parameters.keys()).reduce((g, h) => ({ ...g, [h]: new Float32Array(128) }), {});
  for (let g = 0; g < c; g += 128) {
    if (r.numberOfInputs > 0 && t !== null)
      for (let h = 0; h < r.numberOfInputs; h += 1)
        for (let A = 0; A < r.channelCount; A += 1)
          xe(t, w[h], A, A, g);
    o.parameterDescriptors !== void 0 && t !== null && o.parameterDescriptors.forEach(({ name: h }, A) => {
      xe(t, f, h, i + A, g);
    });
    for (let h = 0; h < r.numberOfInputs; h += 1)
      for (let A = 0; A < s[h]; A += 1)
        p[h][A].byteLength === 0 && (p[h][A] = new Float32Array(128));
    try {
      const h = w.map((_, T) => l.activeInputs[T].size === 0 ? [] : _), A = a(g / n.sampleRate, n.sampleRate, () => m.process(h, p, f));
      if (d !== null)
        for (let _ = 0, T = 0; _ < r.numberOfOutputs; _ += 1) {
          for (let v = 0; v < s[_]; v += 1)
            In(d, p[_], v, T + v, g);
          T += s[_];
        }
      if (!A)
        break;
    } catch (h) {
      e.dispatchEvent(new ErrorEvent("processorerror", {
        colno: h.colno,
        filename: h.filename,
        lineno: h.lineno,
        message: h.message
      }));
      break;
    }
  }
  return d;
}, xs = (e, t, n, r, s, o, a, c, i, u, d, l, m, w, p, f) => (g, h, A) => {
  const _ = /* @__PURE__ */ new WeakMap();
  let T = null;
  const v = async (b, y) => {
    let E = d(b), M = null;
    const R = yn(E, y), N = Array.isArray(h.outputChannelCount) ? h.outputChannelCount : Array.from(h.outputChannelCount);
    if (l === null) {
      const P = N.reduce((O, B) => O + B, 0), L = s(y, {
        channelCount: Math.max(1, P),
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        numberOfOutputs: Math.max(1, P)
      }), U = [];
      for (let O = 0; O < b.numberOfOutputs; O += 1)
        U.push(r(y, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "speakers",
          numberOfInputs: N[O]
        }));
      const W = a(y, {
        channelCount: h.channelCount,
        channelCountMode: h.channelCountMode,
        channelInterpretation: h.channelInterpretation,
        gain: 1
      });
      W.connect = t.bind(null, U), W.disconnect = i.bind(null, U), M = [L, U, W];
    } else
      R || (E = new l(y, g));
    if (_.set(y, M === null ? E : M[2]), M !== null) {
      if (T === null) {
        if (A === void 0)
          throw new Error("Missing the processor constructor.");
        if (m === null)
          throw new Error("Missing the native OfflineAudioContext constructor.");
        const B = b.channelCount * b.numberOfInputs, V = A.parameterDescriptors === void 0 ? 0 : A.parameterDescriptors.length, I = B + V;
        T = Vs(b, I === 0 ? null : await (async () => {
          const x = new m(
            I,
            // Ceil the length to the next full render quantum.
            // Bug #17: Safari does not yet expose the length.
            Math.ceil(b.context.length / 128) * 128,
            y.sampleRate
          ), q = [], fe = [];
          for (let j = 0; j < h.numberOfInputs; j += 1)
            q.push(a(x, {
              channelCount: h.channelCount,
              channelCountMode: h.channelCountMode,
              channelInterpretation: h.channelInterpretation,
              gain: 1
            })), fe.push(s(x, {
              channelCount: h.channelCount,
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              numberOfOutputs: h.channelCount
            }));
          const he = await Promise.all(Array.from(b.parameters.values()).map(async (j) => {
            const X = o(x, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              offset: j.value
            });
            return await w(x, j, X.offset), X;
          })), pe = r(x, {
            channelCount: 1,
            channelCountMode: "explicit",
            channelInterpretation: "speakers",
            numberOfInputs: Math.max(1, B + V)
          });
          for (let j = 0; j < h.numberOfInputs; j += 1) {
            q[j].connect(fe[j]);
            for (let X = 0; X < h.channelCount; X += 1)
              fe[j].connect(pe, X, j * h.channelCount + X);
          }
          for (const [j, X] of he.entries())
            X.connect(pe, 0, B + j), X.start(0);
          return pe.connect(x.destination), await Promise.all(q.map((j) => p(b, x, j))), f(x);
        })(), y, h, N, A, u);
      }
      const P = await T, L = n(y, {
        buffer: null,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        playbackRate: 1
      }), [U, W, O] = M;
      P !== null && (L.buffer = P, L.start(0)), L.connect(U);
      for (let B = 0, V = 0; B < b.numberOfOutputs; B += 1) {
        const I = W[B];
        for (let S = 0; S < N[B]; S += 1)
          U.connect(I, V + S, S);
        V += N[B];
      }
      return O;
    }
    if (R)
      for (const [P, L] of b.parameters.entries())
        await e(
          y,
          L,
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          E.parameters.get(P)
        );
    else
      for (const [P, L] of b.parameters.entries())
        await w(
          y,
          L,
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          E.parameters.get(P)
        );
    return await p(b, y, E), E;
  };
  return {
    render(b, y) {
      c(y, b);
      const E = _.get(y);
      return E !== void 0 ? Promise.resolve(E) : v(b, y);
    }
  };
}, Fs = (e, t) => (n, r) => {
  const s = t.get(n);
  if (s !== void 0)
    return s;
  const o = e.get(n);
  if (o !== void 0)
    return o;
  try {
    const a = r();
    return a instanceof Promise ? (e.set(n, a), a.catch(() => !1).then((c) => (e.delete(n), t.set(n, c), c))) : (t.set(n, a), a);
  } catch {
    return t.set(n, !1), !1;
  }
}, js = (e) => (t, n, r) => e(n, t, r), Gs = (e) => (t, n, r = 0, s = 0) => {
  const o = t[r];
  if (o === void 0)
    throw e();
  return Ve(n) ? o.connect(n, 0, s) : o.connect(n, 0);
}, qs = (e) => (t) => (e[0] = t, e[0]), $s = (e, t, n, r, s, o, a, c) => (i, u) => {
  const d = t.get(i);
  if (d === void 0)
    throw new Error("Missing the expected cycle count.");
  const l = o(i.context), m = c(l);
  if (d === u) {
    if (t.delete(i), !m && a(i)) {
      const w = r(i), { outputs: p } = n(i);
      for (const f of p)
        if (Ne(f)) {
          const g = r(f[0]);
          e(w, g, f[1], f[2]);
        } else {
          const g = s(f[0]);
          w.connect(g, f[1]);
        }
    }
  } else
    t.set(i, d - u);
}, zs = (e) => (t, n, r, s) => e(t[s], (o) => o[0] === n && o[1] === r), Xs = (e) => (t, n) => {
  e(t).delete(n);
}, Ys = (e) => "delayTime" in e, Hs = (e, t, n) => function r(s, o) {
  const a = De(o) ? o : n(e, o);
  if (Ys(a))
    return [];
  if (s[0] === a)
    return [s];
  if (s.includes(a))
    return [];
  const { outputs: c } = t(a);
  return Array.from(c).map((i) => r([...s, a], i[0])).reduce((i, u) => i.concat(u), []);
}, Se = (e, t, n) => {
  const r = t[n];
  if (r === void 0)
    throw e();
  return r;
}, Zs = (e) => (t, n = void 0, r = void 0, s = 0) => n === void 0 ? t.forEach((o) => o.disconnect()) : typeof n == "number" ? Se(e, t, n).disconnect() : Ve(n) ? r === void 0 ? t.forEach((o) => o.disconnect(n)) : s === void 0 ? Se(e, t, r).disconnect(n, 0) : Se(e, t, r).disconnect(n, 0, s) : r === void 0 ? t.forEach((o) => o.disconnect(n)) : Se(e, t, r).disconnect(n, 0), Ks = (e) => (t) => new Promise((n, r) => {
  if (e === null) {
    r(new SyntaxError());
    return;
  }
  const s = e.document.head;
  if (s === null)
    r(new SyntaxError());
  else {
    const o = e.document.createElement("script"), a = new Blob([t], { type: "application/javascript" }), c = URL.createObjectURL(a), i = e.onerror, u = () => {
      e.onerror = i, URL.revokeObjectURL(c);
    };
    e.onerror = (d, l, m, w, p) => {
      if (l === c || l === e.location.href && m === 1 && w === 1)
        return u(), r(p), !1;
      if (i !== null)
        return i(d, l, m, w, p);
    }, o.onerror = () => {
      u(), r(new SyntaxError());
    }, o.onload = () => {
      u(), n();
    }, o.src = c, o.type = "module", s.appendChild(o);
  }
}), Qs = (e) => class {
  constructor(n) {
    this._nativeEventTarget = n, this._listeners = /* @__PURE__ */ new WeakMap();
  }
  addEventListener(n, r, s) {
    if (r !== null) {
      let o = this._listeners.get(r);
      o === void 0 && (o = e(this, r), typeof r == "function" && this._listeners.set(r, o)), this._nativeEventTarget.addEventListener(n, o, s);
    }
  }
  dispatchEvent(n) {
    return this._nativeEventTarget.dispatchEvent(n);
  }
  removeEventListener(n, r, s) {
    const o = r === null ? void 0 : this._listeners.get(r);
    this._nativeEventTarget.removeEventListener(n, o === void 0 ? null : o, s);
  }
}, Js = (e) => (t, n, r) => {
  Object.defineProperties(e, {
    currentFrame: {
      configurable: !0,
      get() {
        return Math.round(t * n);
      }
    },
    currentTime: {
      configurable: !0,
      get() {
        return t;
      }
    }
  });
  try {
    return r();
  } finally {
    e !== null && (delete e.currentFrame, delete e.currentTime);
  }
}, eo = (e) => async (t) => {
  try {
    const n = await fetch(t);
    if (n.ok)
      return [await n.text(), n.url];
  } catch {
  }
  throw e();
}, to = (e, t) => (n) => t(e, n), no = (e) => (t) => {
  const n = e(t);
  if (n.renderer === null)
    throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
  return n.renderer;
}, ro = (e) => (t) => {
  var n;
  return (n = e.get(t)) !== null && n !== void 0 ? n : 0;
}, so = (e) => (t) => {
  const n = e(t);
  if (n.renderer === null)
    throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
  return n.renderer;
}, oo = (e) => (t) => e.get(t), Z = () => new DOMException("", "InvalidStateError"), ao = (e) => (t) => {
  const n = e.get(t);
  if (n === void 0)
    throw Z();
  return n;
}, io = (e, t) => (n) => {
  let r = e.get(n);
  if (r !== void 0)
    return r;
  if (t === null)
    throw new Error("Missing the native OfflineAudioContext constructor.");
  return r = new t(1, 1, 44100), e.set(n, r), r;
}, co = (e) => (t) => {
  const n = e.get(t);
  if (n === void 0)
    throw new Error("The context has no set of AudioWorkletNodes.");
  return n;
}, uo = () => new DOMException("", "InvalidAccessError"), lo = (e, t, n, r, s, o) => (a) => (c, i) => {
  const u = e.get(c);
  if (u === void 0) {
    if (!a && o(c)) {
      const d = r(c), { outputs: l } = n(c);
      for (const m of l)
        if (Ne(m)) {
          const w = r(m[0]);
          t(d, w, m[1], m[2]);
        } else {
          const w = s(m[0]);
          d.disconnect(w, m[1]);
        }
    }
    e.set(c, i);
  } else
    e.set(c, u + i);
}, fo = (e) => (t) => e !== null && t instanceof e, ho = (e) => (t) => e !== null && typeof e.AudioNode == "function" && t instanceof e.AudioNode, po = (e) => (t) => e !== null && typeof e.AudioParam == "function" && t instanceof e.AudioParam, mo = (e) => (t) => e !== null && t instanceof e, go = (e) => e !== null && e.isSecureContext, wo = (e, t, n, r) => class extends e {
  constructor(o, a) {
    const c = n(o), i = t(c, a);
    if (r(c))
      throw new TypeError();
    super(o, !0, i, null), this._nativeMediaStreamAudioSourceNode = i;
  }
  get mediaStream() {
    return this._nativeMediaStreamAudioSourceNode.mediaStream;
  }
}, vo = (e, t, n, r, s) => class extends r {
  constructor(a = {}) {
    if (s === null)
      throw new Error("Missing the native AudioContext constructor.");
    let c;
    try {
      c = new s(a);
    } catch (d) {
      throw d.code === 12 && d.message === "sampleRate is not in range" ? t() : d;
    }
    if (c === null)
      throw n();
    if (!ys(a.latencyHint))
      throw new TypeError(`The provided value '${a.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
    if (a.sampleRate !== void 0 && c.sampleRate !== a.sampleRate)
      throw t();
    super(c, 2);
    const { latencyHint: i } = a, { sampleRate: u } = c;
    if (this._baseLatency = typeof c.baseLatency == "number" ? c.baseLatency : i === "balanced" ? 512 / u : i === "interactive" || i === void 0 ? 256 / u : i === "playback" ? 1024 / u : (
      /*
       * @todo The min (256) and max (16384) values are taken from the allowed bufferSize values of a
       * ScriptProcessorNode.
       */
      Math.max(2, Math.min(128, Math.round(i * u / 128))) * 128 / u
    ), this._nativeAudioContext = c, s.name === "webkitAudioContext" ? (this._nativeGainNode = c.createGain(), this._nativeOscillatorNode = c.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(c.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, c.state === "running") {
      this._state = "suspended";
      const d = () => {
        this._state === "suspended" && (this._state = null), c.removeEventListener("statechange", d);
      };
      c.addEventListener("statechange", d);
    }
  }
  get baseLatency() {
    return this._baseLatency;
  }
  get state() {
    return this._state !== null ? this._state : this._nativeAudioContext.state;
  }
  close() {
    return this.state === "closed" ? this._nativeAudioContext.close().then(() => {
      throw e();
    }) : (this._state === "suspended" && (this._state = null), this._nativeAudioContext.close().then(() => {
      this._nativeGainNode !== null && this._nativeOscillatorNode !== null && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), Es(this);
    }));
  }
  resume() {
    return this._state === "suspended" ? new Promise((a, c) => {
      const i = () => {
        this._nativeAudioContext.removeEventListener("statechange", i), this._nativeAudioContext.state === "running" ? a() : this.resume().then(a, c);
      };
      this._nativeAudioContext.addEventListener("statechange", i);
    }) : this._nativeAudioContext.resume().catch((a) => {
      throw a === void 0 || a.code === 15 ? e() : a;
    });
  }
  suspend() {
    return this._nativeAudioContext.suspend().catch((a) => {
      throw a === void 0 ? e() : a;
    });
  }
}, _o = (e, t, n, r, s, o) => class extends n {
  constructor(c, i) {
    super(c), this._nativeContext = c, gn.set(this, c), r(c) && s.set(c, /* @__PURE__ */ new Set()), this._destination = new e(this, i), this._listener = t(this, c), this._onstatechange = null;
  }
  get currentTime() {
    return this._nativeContext.currentTime;
  }
  get destination() {
    return this._destination;
  }
  get listener() {
    return this._listener;
  }
  get onstatechange() {
    return this._onstatechange;
  }
  set onstatechange(c) {
    const i = typeof c == "function" ? o(this, c) : null;
    this._nativeContext.onstatechange = i;
    const u = this._nativeContext.onstatechange;
    this._onstatechange = u !== null && u === i ? c : u;
  }
  get sampleRate() {
    return this._nativeContext.sampleRate;
  }
  get state() {
    return this._nativeContext.state;
  }
}, Jt = (e) => {
  const t = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);
  try {
    const n = e.decodeAudioData(t.buffer, () => {
    });
    return n === void 0 ? !1 : (n.catch(() => {
    }), !0);
  } catch {
  }
  return !1;
}, Eo = (e, t) => (n, r, s) => {
  const o = /* @__PURE__ */ new Set();
  return n.connect = ((a) => (c, i = 0, u = 0) => {
    const d = o.size === 0;
    if (t(c))
      return a.call(n, c, i, u), e(o, [c, i, u], (l) => l[0] === c && l[1] === i && l[2] === u, !0), d && r(), c;
    a.call(n, c, i), e(o, [c, i], (l) => l[0] === c && l[1] === i, !0), d && r();
  })(n.connect), n.disconnect = ((a) => (c, i, u) => {
    const d = o.size > 0;
    if (c === void 0)
      a.apply(n), o.clear();
    else if (typeof c == "number") {
      a.call(n, c);
      for (const m of o)
        m[1] === c && o.delete(m);
    } else {
      t(c) ? a.call(n, c, i, u) : a.call(n, c, i);
      for (const m of o)
        m[0] === c && (i === void 0 || m[1] === i) && (u === void 0 || m[2] === u) && o.delete(m);
    }
    const l = o.size === 0;
    d && l && s();
  })(n.disconnect), n;
}, oe = (e, t, n) => {
  const r = t[n];
  r !== void 0 && r !== e[n] && (e[n] = r);
}, Ie = (e, t) => {
  oe(e, t, "channelCount"), oe(e, t, "channelCountMode"), oe(e, t, "channelInterpretation");
}, yo = (e) => e === null ? null : e.hasOwnProperty("AudioBuffer") ? e.AudioBuffer : null, Et = (e, t, n) => {
  const r = t[n];
  r !== void 0 && r !== e[n].value && (e[n].value = r);
}, bo = (e) => {
  e.start = ((t) => {
    let n = !1;
    return (r = 0, s = 0, o) => {
      if (n)
        throw Z();
      t.call(e, r, s, o), n = !0;
    };
  })(e.start);
}, kn = (e) => {
  e.start = ((t) => (n = 0, r = 0, s) => {
    if (typeof s == "number" && s < 0 || r < 0 || n < 0)
      throw new RangeError("The parameters can't be negative.");
    t.call(e, n, r, s);
  })(e.start);
}, On = (e) => {
  e.stop = ((t) => (n = 0) => {
    if (n < 0)
      throw new RangeError("The parameter can't be negative.");
    t.call(e, n);
  })(e.stop);
}, Ao = (e, t, n, r, s, o, a, c, i, u, d) => (l, m) => {
  const w = l.createBufferSource();
  return Ie(w, m), Et(w, m, "playbackRate"), oe(w, m, "buffer"), oe(w, m, "loop"), oe(w, m, "loopEnd"), oe(w, m, "loopStart"), t(n, () => n(l)) || bo(w), t(r, () => r(l)) || i(w), t(s, () => s(l)) || u(w, l), t(o, () => o(l)) || kn(w), t(a, () => a(l)) || d(w, l), t(c, () => c(l)) || On(w), e(l, w), w;
}, Co = (e) => e === null ? null : e.hasOwnProperty("AudioContext") ? e.AudioContext : e.hasOwnProperty("webkitAudioContext") ? e.webkitAudioContext : null, To = (e, t) => (n, r, s) => {
  const o = n.destination;
  if (o.channelCount !== r)
    try {
      o.channelCount = r;
    } catch {
    }
  s && o.channelCountMode !== "explicit" && (o.channelCountMode = "explicit"), o.maxChannelCount === 0 && Object.defineProperty(o, "maxChannelCount", {
    value: r
  });
  const a = e(n, {
    channelCount: r,
    channelCountMode: o.channelCountMode,
    channelInterpretation: o.channelInterpretation,
    gain: 1
  });
  return t(a, "channelCount", (c) => () => c.call(a), (c) => (i) => {
    c.call(a, i);
    try {
      o.channelCount = i;
    } catch (u) {
      if (i > o.maxChannelCount)
        throw u;
    }
  }), t(a, "channelCountMode", (c) => () => c.call(a), (c) => (i) => {
    c.call(a, i), o.channelCountMode = i;
  }), t(a, "channelInterpretation", (c) => () => c.call(a), (c) => (i) => {
    c.call(a, i), o.channelInterpretation = i;
  }), Object.defineProperty(a, "maxChannelCount", {
    get: () => o.maxChannelCount
  }), a.connect(o), a;
}, Mo = (e) => e === null ? null : e.hasOwnProperty("AudioWorkletNode") ? e.AudioWorkletNode : null, No = (e) => {
  const { port1: t } = new MessageChannel();
  try {
    t.postMessage(e);
  } finally {
    t.close();
  }
}, Io = (e, t, n, r, s) => (o, a, c, i, u, d) => {
  if (c !== null)
    try {
      const l = new c(o, i, d), m = /* @__PURE__ */ new Map();
      let w = null;
      if (Object.defineProperties(l, {
        /*
         * Bug #61: Overwriting the property accessors for channelCount and channelCountMode is necessary as long as some
         * browsers have no native implementation to achieve a consistent behavior.
         */
        channelCount: {
          get: () => d.channelCount,
          set: () => {
            throw e();
          }
        },
        channelCountMode: {
          get: () => "explicit",
          set: () => {
            throw e();
          }
        },
        // Bug #156: Chrome and Edge do not yet fire an ErrorEvent.
        onprocessorerror: {
          get: () => w,
          set: (p) => {
            typeof w == "function" && l.removeEventListener("processorerror", w), w = typeof p == "function" ? p : null, typeof w == "function" && l.addEventListener("processorerror", w);
          }
        }
      }), l.addEventListener = ((p) => (...f) => {
        if (f[0] === "processorerror") {
          const g = typeof f[1] == "function" ? f[1] : typeof f[1] == "object" && f[1] !== null && typeof f[1].handleEvent == "function" ? f[1].handleEvent : null;
          if (g !== null) {
            const h = m.get(f[1]);
            h !== void 0 ? f[1] = h : (f[1] = (A) => {
              A.type === "error" ? (Object.defineProperties(A, {
                type: { value: "processorerror" }
              }), g(A)) : g(new ErrorEvent(f[0], { ...A }));
            }, m.set(g, f[1]));
          }
        }
        return p.call(l, "error", f[1], f[2]), p.call(l, ...f);
      })(l.addEventListener), l.removeEventListener = ((p) => (...f) => {
        if (f[0] === "processorerror") {
          const g = m.get(f[1]);
          g !== void 0 && (m.delete(f[1]), f[1] = g);
        }
        return p.call(l, "error", f[1], f[2]), p.call(l, f[0], f[1], f[2]);
      })(l.removeEventListener), d.numberOfOutputs !== 0) {
        const p = n(o, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          gain: 0
        });
        return l.connect(p).connect(o.destination), s(l, () => p.disconnect(), () => p.connect(o.destination));
      }
      return l;
    } catch (l) {
      throw l.code === 11 ? r() : l;
    }
  if (u === void 0)
    throw r();
  return No(d), t(o, a, u, d);
}, ko = (e, t) => e === null ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(e * t))))), Oo = (e) => new Promise((t, n) => {
  const { port1: r, port2: s } = new MessageChannel();
  r.onmessage = ({ data: o }) => {
    r.close(), s.close(), t(o);
  }, r.onmessageerror = ({ data: o }) => {
    r.close(), s.close(), n(o);
  }, s.postMessage(e);
}), Ro = async (e, t) => {
  const n = await Oo(t);
  return new e(n);
}, So = (e, t, n, r) => {
  let s = ct.get(e);
  s === void 0 && (s = /* @__PURE__ */ new WeakMap(), ct.set(e, s));
  const o = Ro(n, r);
  return s.set(t, o), o;
}, Po = (e, t, n, r, s, o, a, c, i, u, d, l, m) => (w, p, f, g) => {
  if (g.numberOfInputs === 0 && g.numberOfOutputs === 0)
    throw i();
  const h = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);
  if (h.some((C) => C < 1))
    throw i();
  if (h.length !== g.numberOfOutputs)
    throw t();
  if (g.channelCountMode !== "explicit")
    throw i();
  const A = g.channelCount * g.numberOfInputs, _ = h.reduce((C, k) => C + k, 0), T = f.parameterDescriptors === void 0 ? 0 : f.parameterDescriptors.length;
  if (A + T > 6 || _ > 6)
    throw i();
  const v = new MessageChannel(), b = [], y = [];
  for (let C = 0; C < g.numberOfInputs; C += 1)
    b.push(a(w, {
      channelCount: g.channelCount,
      channelCountMode: g.channelCountMode,
      channelInterpretation: g.channelInterpretation,
      gain: 1
    })), y.push(s(w, {
      channelCount: g.channelCount,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      numberOfOutputs: g.channelCount
    }));
  const E = [];
  if (f.parameterDescriptors !== void 0)
    for (const { defaultValue: C, maxValue: k, minValue: $, name: F } of f.parameterDescriptors) {
      const D = o(w, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        offset: g.parameterData[F] !== void 0 ? g.parameterData[F] : C === void 0 ? 0 : C
      });
      Object.defineProperties(D.offset, {
        defaultValue: {
          get: () => C === void 0 ? 0 : C
        },
        maxValue: {
          get: () => k === void 0 ? wt : k
        },
        minValue: {
          get: () => $ === void 0 ? Ge : $
        }
      }), E.push(D);
    }
  const M = r(w, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: Math.max(1, A + T)
  }), R = ko(p, w.sampleRate), N = c(
    w,
    R,
    A + T,
    // Bug #87: Only Firefox will fire an AudioProcessingEvent if there is no connected output.
    Math.max(1, _)
  ), P = s(w, {
    channelCount: Math.max(1, _),
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    numberOfOutputs: Math.max(1, _)
  }), L = [];
  for (let C = 0; C < g.numberOfOutputs; C += 1)
    L.push(r(w, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: h[C]
    }));
  for (let C = 0; C < g.numberOfInputs; C += 1) {
    b[C].connect(y[C]);
    for (let k = 0; k < g.channelCount; k += 1)
      y[C].connect(M, k, C * g.channelCount + k);
  }
  const U = new Nn(f.parameterDescriptors === void 0 ? [] : f.parameterDescriptors.map(({ name: C }, k) => {
    const $ = E[k];
    return $.connect(M, 0, A + k), $.start(0), [C, $.offset];
  }));
  M.connect(N);
  let W = g.channelInterpretation, O = null;
  const B = g.numberOfOutputs === 0 ? [N] : L, V = {
    get bufferSize() {
      return R;
    },
    get channelCount() {
      return g.channelCount;
    },
    set channelCount(C) {
      throw n();
    },
    get channelCountMode() {
      return g.channelCountMode;
    },
    set channelCountMode(C) {
      throw n();
    },
    get channelInterpretation() {
      return W;
    },
    set channelInterpretation(C) {
      for (const k of b)
        k.channelInterpretation = C;
      W = C;
    },
    get context() {
      return N.context;
    },
    get inputs() {
      return b;
    },
    get numberOfInputs() {
      return g.numberOfInputs;
    },
    get numberOfOutputs() {
      return g.numberOfOutputs;
    },
    get onprocessorerror() {
      return O;
    },
    set onprocessorerror(C) {
      typeof O == "function" && V.removeEventListener("processorerror", O), O = typeof C == "function" ? C : null, typeof O == "function" && V.addEventListener("processorerror", O);
    },
    get parameters() {
      return U;
    },
    get port() {
      return v.port2;
    },
    addEventListener(...C) {
      return N.addEventListener(C[0], C[1], C[2]);
    },
    connect: e.bind(null, B),
    disconnect: u.bind(null, B),
    dispatchEvent(...C) {
      return N.dispatchEvent(C[0]);
    },
    removeEventListener(...C) {
      return N.removeEventListener(C[0], C[1], C[2]);
    }
  }, I = /* @__PURE__ */ new Map();
  v.port1.addEventListener = ((C) => (...k) => {
    if (k[0] === "message") {
      const $ = typeof k[1] == "function" ? k[1] : typeof k[1] == "object" && k[1] !== null && typeof k[1].handleEvent == "function" ? k[1].handleEvent : null;
      if ($ !== null) {
        const F = I.get(k[1]);
        F !== void 0 ? k[1] = F : (k[1] = (D) => {
          d(w.currentTime, w.sampleRate, () => $(D));
        }, I.set($, k[1]));
      }
    }
    return C.call(v.port1, k[0], k[1], k[2]);
  })(v.port1.addEventListener), v.port1.removeEventListener = ((C) => (...k) => {
    if (k[0] === "message") {
      const $ = I.get(k[1]);
      $ !== void 0 && (I.delete(k[1]), k[1] = $);
    }
    return C.call(v.port1, k[0], k[1], k[2]);
  })(v.port1.removeEventListener);
  let S = null;
  Object.defineProperty(v.port1, "onmessage", {
    get: () => S,
    set: (C) => {
      typeof S == "function" && v.port1.removeEventListener("message", S), S = typeof C == "function" ? C : null, typeof S == "function" && (v.port1.addEventListener("message", S), v.port1.start());
    }
  }), f.prototype.port = v.port1;
  let x = null;
  So(w, V, f, g).then((C) => x = C);
  const fe = Fe(g.numberOfInputs, g.channelCount), he = Fe(g.numberOfOutputs, h), pe = f.parameterDescriptors === void 0 ? [] : f.parameterDescriptors.reduce((C, { name: k }) => ({ ...C, [k]: new Float32Array(128) }), {});
  let j = !0;
  const X = () => {
    g.numberOfOutputs > 0 && N.disconnect(P);
    for (let C = 0, k = 0; C < g.numberOfOutputs; C += 1) {
      const $ = L[C];
      for (let F = 0; F < h[C]; F += 1)
        P.disconnect($, k + F, F);
      k += h[C];
    }
  }, ke = /* @__PURE__ */ new Map();
  N.onaudioprocess = ({ inputBuffer: C, outputBuffer: k }) => {
    if (x !== null) {
      const $ = l(V);
      for (let F = 0; F < R; F += 128) {
        for (let D = 0; D < g.numberOfInputs; D += 1)
          for (let G = 0; G < g.channelCount; G += 1)
            xe(C, fe[D], G, G, F);
        f.parameterDescriptors !== void 0 && f.parameterDescriptors.forEach(({ name: D }, G) => {
          xe(C, pe, D, A + G, F);
        });
        for (let D = 0; D < g.numberOfInputs; D += 1)
          for (let G = 0; G < h[D]; G += 1)
            he[D][G].byteLength === 0 && (he[D][G] = new Float32Array(128));
        try {
          const D = fe.map((Y, te) => {
            if ($[te].size > 0)
              return ke.set(te, R / 128), Y;
            const Ke = ke.get(te);
            return Ke === void 0 ? [] : (Y.every((sr) => sr.every((or) => or === 0)) && (Ke === 1 ? ke.delete(te) : ke.set(te, Ke - 1)), Y);
          });
          j = d(w.currentTime + F / w.sampleRate, w.sampleRate, () => x.process(D, he, pe));
          for (let Y = 0, te = 0; Y < g.numberOfOutputs; Y += 1) {
            for (let Ee = 0; Ee < h[Y]; Ee += 1)
              In(k, he[Y], Ee, te + Ee, F);
            te += h[Y];
          }
        } catch (D) {
          j = !1, V.dispatchEvent(new ErrorEvent("processorerror", {
            colno: D.colno,
            filename: D.filename,
            lineno: D.lineno,
            message: D.message
          }));
        }
        if (!j) {
          for (let D = 0; D < g.numberOfInputs; D += 1) {
            b[D].disconnect(y[D]);
            for (let G = 0; G < g.channelCount; G += 1)
              y[F].disconnect(M, G, D * g.channelCount + G);
          }
          if (f.parameterDescriptors !== void 0) {
            const D = f.parameterDescriptors.length;
            for (let G = 0; G < D; G += 1) {
              const Y = E[G];
              Y.disconnect(M, 0, A + G), Y.stop();
            }
          }
          M.disconnect(N), N.onaudioprocess = null, He ? X() : St();
          break;
        }
      }
    }
  };
  let He = !1;
  const Ze = a(w, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  }), Rt = () => N.connect(Ze).connect(w.destination), St = () => {
    N.disconnect(Ze), Ze.disconnect();
  }, nr = () => {
    if (j) {
      St(), g.numberOfOutputs > 0 && N.connect(P);
      for (let C = 0, k = 0; C < g.numberOfOutputs; C += 1) {
        const $ = L[C];
        for (let F = 0; F < h[C]; F += 1)
          P.connect($, k + F, F);
        k += h[C];
      }
    }
    He = !0;
  }, rr = () => {
    j && (Rt(), X()), He = !1;
  };
  return Rt(), m(V, nr, rr);
}, Lo = (e, t) => (n, r) => {
  const s = n.createChannelMerger(r.numberOfInputs);
  return e !== null && e.name === "webkitAudioContext" && t(n, s), Ie(s, r), s;
}, Uo = (e) => {
  const t = e.numberOfOutputs;
  Object.defineProperty(e, "channelCount", {
    get: () => t,
    set: (n) => {
      if (n !== t)
        throw Z();
    }
  }), Object.defineProperty(e, "channelCountMode", {
    get: () => "explicit",
    set: (n) => {
      if (n !== "explicit")
        throw Z();
    }
  }), Object.defineProperty(e, "channelInterpretation", {
    get: () => "discrete",
    set: (n) => {
      if (n !== "discrete")
        throw Z();
    }
  });
}, Rn = (e, t) => {
  const n = e.createChannelSplitter(t.numberOfOutputs);
  return Ie(n, t), Uo(n), n;
}, Bo = (e, t, n, r, s) => (o, a) => {
  if (o.createConstantSource === void 0)
    return n(o, a);
  const c = o.createConstantSource();
  return Ie(c, a), Et(c, a, "offset"), t(r, () => r(o)) || kn(c), t(s, () => s(o)) || On(c), e(o, c), c;
}, Sn = (e, t) => (e.connect = t.connect.bind(t), e.disconnect = t.disconnect.bind(t), e), Wo = (e, t, n, r) => (s, { offset: o, ...a }) => {
  const c = s.createBuffer(1, 2, 44100), i = t(s, {
    buffer: null,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    loop: !1,
    loopEnd: 0,
    loopStart: 0,
    playbackRate: 1
  }), u = n(s, { ...a, gain: o }), d = c.getChannelData(0);
  d[0] = 1, d[1] = 1, i.buffer = c, i.loop = !0;
  const l = {
    get bufferSize() {
    },
    get channelCount() {
      return u.channelCount;
    },
    set channelCount(p) {
      u.channelCount = p;
    },
    get channelCountMode() {
      return u.channelCountMode;
    },
    set channelCountMode(p) {
      u.channelCountMode = p;
    },
    get channelInterpretation() {
      return u.channelInterpretation;
    },
    set channelInterpretation(p) {
      u.channelInterpretation = p;
    },
    get context() {
      return u.context;
    },
    get inputs() {
      return [];
    },
    get numberOfInputs() {
      return i.numberOfInputs;
    },
    get numberOfOutputs() {
      return u.numberOfOutputs;
    },
    get offset() {
      return u.gain;
    },
    get onended() {
      return i.onended;
    },
    set onended(p) {
      i.onended = p;
    },
    addEventListener(...p) {
      return i.addEventListener(p[0], p[1], p[2]);
    },
    dispatchEvent(...p) {
      return i.dispatchEvent(p[0]);
    },
    removeEventListener(...p) {
      return i.removeEventListener(p[0], p[1], p[2]);
    },
    start(p = 0) {
      i.start.call(i, p);
    },
    stop(p = 0) {
      i.stop.call(i, p);
    }
  }, m = () => i.connect(u), w = () => i.disconnect(u);
  return e(s, i), r(Sn(l, u), m, w);
}, se = (e, t) => {
  const n = e.createGain();
  return Ie(n, t), Et(n, t, "gain"), n;
}, Do = (e, { mediaStream: t }) => {
  const n = t.getAudioTracks();
  n.sort((o, a) => o.id < a.id ? -1 : o.id > a.id ? 1 : 0);
  const r = n.slice(0, 1), s = e.createMediaStreamSource(new MediaStream(r));
  return Object.defineProperty(s, "mediaStream", { value: t }), s;
}, Vo = (e) => e === null ? null : e.hasOwnProperty("OfflineAudioContext") ? e.OfflineAudioContext : e.hasOwnProperty("webkitOfflineAudioContext") ? e.webkitOfflineAudioContext : null, yt = (e, t, n, r) => e.createScriptProcessor(t, n, r), de = () => new DOMException("", "NotSupportedError"), xo = (e, t) => (n, r, s) => (e(r).replay(s), t(r, n, s)), Fo = (e, t, n) => async (r, s, o) => {
  const a = e(r);
  await Promise.all(a.activeInputs.map((c, i) => Array.from(c).map(async ([u, d]) => {
    const m = await t(u).render(u, s), w = r.context.destination;
    !n(u) && (r !== w || !n(r)) && m.connect(o, d, i);
  })).reduce((c, i) => [...c, ...i], []));
}, jo = (e, t, n) => async (r, s, o) => {
  const a = t(r);
  await Promise.all(Array.from(a.activeInputs).map(async ([c, i]) => {
    const d = await e(c).render(c, s);
    n(c) || d.connect(o, i);
  }));
}, Go = (e, t, n, r) => (s) => e(Jt, () => Jt(s)) ? Promise.resolve(e(r, r)).then((o) => {
  if (!o) {
    const a = n(s, 512, 0, 1);
    s.oncomplete = () => {
      a.onaudioprocess = null, a.disconnect();
    }, a.onaudioprocess = () => s.currentTime, a.connect(s.destination);
  }
  return s.startRendering();
}) : new Promise((o) => {
  const a = t(s, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  s.oncomplete = (c) => {
    a.disconnect(), o(c.renderedBuffer);
  }, a.connect(s.destination), s.startRendering();
}), qo = (e) => (t, n) => {
  e.set(t, n);
}, $o = (e) => () => {
  if (e === null)
    return !1;
  try {
    new e({ length: 1, sampleRate: 44100 });
  } catch {
    return !1;
  }
  return !0;
}, zo = (e, t) => async () => {
  if (e === null)
    return !0;
  if (t === null)
    return !1;
  const n = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], {
    type: "application/javascript; charset=utf-8"
  }), r = new t(1, 128, 44100), s = URL.createObjectURL(n);
  let o = !1, a = !1;
  try {
    await r.audioWorklet.addModule(s);
    const c = new e(r, "a", { numberOfOutputs: 0 }), i = r.createOscillator();
    c.port.onmessage = () => o = !0, c.onprocessorerror = () => a = !0, i.connect(c), i.start(0), await r.startRendering(), await new Promise((u) => setTimeout(u));
  } catch {
  } finally {
    URL.revokeObjectURL(s);
  }
  return o && !a;
}, Xo = (e, t) => () => {
  if (t === null)
    return Promise.resolve(!1);
  const n = new t(1, 1, 44100), r = e(n, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  return new Promise((s) => {
    n.oncomplete = () => {
      r.disconnect(), s(n.currentTime !== 0);
    }, n.startRendering();
  });
}, Yo = () => new DOMException("", "UnknownError"), Ho = () => typeof window > "u" ? null : window, Zo = (e, t) => (n) => {
  n.copyFromChannel = (r, s, o = 0) => {
    const a = e(o), c = e(s);
    if (c >= n.numberOfChannels)
      throw t();
    const i = n.length, u = n.getChannelData(c), d = r.length;
    for (let l = a < 0 ? -a : 0; l + a < i && l < d; l += 1)
      r[l] = u[l + a];
  }, n.copyToChannel = (r, s, o = 0) => {
    const a = e(o), c = e(s);
    if (c >= n.numberOfChannels)
      throw t();
    const i = n.length, u = n.getChannelData(c), d = r.length;
    for (let l = a < 0 ? -a : 0; l + a < i && l < d; l += 1)
      u[l + a] = r[l];
  };
}, Ko = (e) => (t) => {
  t.copyFromChannel = ((n) => (r, s, o = 0) => {
    const a = e(o), c = e(s);
    if (a < t.length)
      return n.call(t, r, c, a);
  })(t.copyFromChannel), t.copyToChannel = ((n) => (r, s, o = 0) => {
    const a = e(o), c = e(s);
    if (a < t.length)
      return n.call(t, r, c, a);
  })(t.copyToChannel);
}, Qo = (e) => (t, n) => {
  const r = n.createBuffer(1, 1, 44100);
  t.buffer === null && (t.buffer = r), e(t, "buffer", (s) => () => {
    const o = s.call(t);
    return o === r ? null : o;
  }, (s) => (o) => s.call(t, o === null ? r : o));
}, Jo = (e, t) => (n, r) => {
  r.channelCount = 1, r.channelCountMode = "explicit", Object.defineProperty(r, "channelCount", {
    get: () => 1,
    set: () => {
      throw e();
    }
  }), Object.defineProperty(r, "channelCountMode", {
    get: () => "explicit",
    set: () => {
      throw e();
    }
  });
  const s = n.createBufferSource();
  t(r, () => {
    const c = r.numberOfInputs;
    for (let i = 0; i < c; i += 1)
      s.connect(r, 0, i);
  }, () => s.disconnect(r));
}, ea = (e, t, n) => e.copyFromChannel === void 0 ? e.getChannelData(n)[0] : (e.copyFromChannel(t, n), t[0]), bt = (e, t, n, r) => {
  let s = e;
  for (; !s.hasOwnProperty(t); )
    s = Object.getPrototypeOf(s);
  const { get: o, set: a } = Object.getOwnPropertyDescriptor(s, t);
  Object.defineProperty(e, t, { get: n(o), set: r(a) });
}, ta = (e) => ({
  ...e,
  outputChannelCount: e.outputChannelCount !== void 0 ? e.outputChannelCount : e.numberOfInputs === 1 && e.numberOfOutputs === 1 ? (
    /*
     * Bug #61: This should be the computedNumberOfChannels, but unfortunately that is almost impossible to fake. That's why
     * the channelCountMode is required to be 'explicit' as long as there is not a native implementation in every browser. That
     * makes sure the computedNumberOfChannels is equivilant to the channelCount which makes it much easier to compute.
     */
    [e.channelCount]
  ) : Array.from({ length: e.numberOfOutputs }, () => 1)
}), Pn = (e, t, n) => {
  try {
    e.setValueAtTime(t, n);
  } catch (r) {
    if (r.code !== 9)
      throw r;
    Pn(e, t, n + 1e-7);
  }
}, na = (e) => {
  const t = e.createBufferSource();
  t.start();
  try {
    t.start();
  } catch {
    return !0;
  }
  return !1;
}, ra = (e) => {
  const t = e.createBufferSource(), n = e.createBuffer(1, 1, 44100);
  t.buffer = n;
  try {
    t.start(0, 1);
  } catch {
    return !1;
  }
  return !0;
}, sa = (e) => {
  const t = e.createBufferSource();
  t.start();
  try {
    t.stop();
  } catch {
    return !1;
  }
  return !0;
}, Ln = (e) => {
  const t = e.createOscillator();
  try {
    t.start(-1);
  } catch (n) {
    return n instanceof RangeError;
  }
  return !1;
}, oa = (e) => {
  const t = e.createBuffer(1, 1, 44100), n = e.createBufferSource();
  n.buffer = t, n.start(), n.stop();
  try {
    return n.stop(), !0;
  } catch {
    return !1;
  }
}, Un = (e) => {
  const t = e.createOscillator();
  try {
    t.stop(-1);
  } catch (n) {
    return n instanceof RangeError;
  }
  return !1;
}, aa = (e) => {
  const { port1: t, port2: n } = new MessageChannel();
  try {
    t.postMessage(e);
  } finally {
    t.close(), n.close();
  }
}, ia = (e) => {
  e.start = ((t) => (n = 0, r = 0, s) => {
    const o = e.buffer, a = o === null ? r : Math.min(o.duration, r);
    o !== null && a > o.duration - 0.5 / e.context.sampleRate ? t.call(e, n, 0, 0) : t.call(e, n, a, s);
  })(e.start);
}, ca = (e, t) => {
  const n = t.createGain();
  e.connect(n);
  const r = ((s) => () => {
    s.call(e, n), e.removeEventListener("ended", r);
  })(e.disconnect);
  e.addEventListener("ended", r), Sn(e, n), e.stop = ((s) => {
    let o = !1;
    return (a = 0) => {
      if (o)
        try {
          s.call(e, a);
        } catch {
          n.gain.setValueAtTime(0, a);
        }
      else
        s.call(e, a), o = !0;
    };
  })(e.stop);
}, qe = (e, t) => (n) => {
  const r = { value: e };
  return Object.defineProperties(n, {
    currentTarget: r,
    target: r
  }), typeof t == "function" ? t.call(e, n) : t.handleEvent.call(e, n);
}, ua = Jr(le), la = os(le), da = zs(je), fa = /* @__PURE__ */ new WeakMap(), ha = ro(fa), ve = Fs(/* @__PURE__ */ new Map(), /* @__PURE__ */ new WeakMap()), Q = Ho(), Bn = no(z), At = Fo(z, Bn, ie), ce = ao(gn), _e = Vo(Q), ee = mo(_e), Wn = /* @__PURE__ */ new WeakMap(), Dn = Qs(qe), $e = Co(Q), pa = fo($e), Vn = ho(Q), ma = po(Q), Ce = Mo(Q), ze = Ps(es(fn), ss(ua, la, dt, da, ft, z, ha, Te, H, le, ae, ie, Pe), ve, lo(at, ft, z, H, Ae, ae), ue, uo, de, $s(dt, at, z, H, Ae, ce, ae, ee), Hs(Wn, z, K), Dn, ce, pa, Vn, ma, ee, Ce), ga = /* @__PURE__ */ new WeakSet(), en = yo(Q), xn = qs(new Uint32Array(1)), wa = Zo(xn, ue), va = Ko(xn), _a = ls(ga, ve, de, en, _e, $o(en), wa, va), Ct = as(se), Fn = jo(Bn, Me, ie), jn = js(Fn), Xe = Ao(Ct, ve, na, ra, sa, Ln, oa, Un, ia, Qo(bt), ca), Gn = xo(so(Me), Fn), Ea = hs(jn, Xe, H, Gn, At), Tt = Ls(ts(pn), Wn, mn, Us, Xr, Yr, Hr, Zr, Kr, rt, ln, $e, Pn), ya = fs(ze, Ea, Tt, Z, Xe, ce, ee, qe), ba = bs(ze, As, ue, Z, To(se, bt), ce, ee, At), Ye = Eo(le, Vn), Aa = Jo(Z, Ye), Mt = Lo($e, Aa), Ca = Wo(Ct, Xe, se, Ye), Nt = Bo(Ct, ve, Ca, Ln, Un), Ta = Go(ve, se, yt, Xo(se, _e)), Ma = Cs(Tt, Mt, Nt, yt, de, ea, ee, bt), qn = /* @__PURE__ */ new WeakMap(), Na = _o(ba, Ma, Dn, ee, qn, qe), $n = go(Q), It = Js(Q), zn = /* @__PURE__ */ new WeakMap(), Ia = io(zn, _e), tn = $n ? rs(
  ve,
  de,
  Ks(Q),
  It,
  eo(Qr),
  ce,
  Ia,
  ee,
  Ce,
  /* @__PURE__ */ new WeakMap(),
  /* @__PURE__ */ new WeakMap(),
  zo(Ce, _e),
  // @todo window is guaranteed to be defined because isSecureContext checks that as well.
  Q
) : void 0, ka = wo(ze, Do, ce, ee), Xn = co(qn), Oa = is(Xn), Yn = Gs(ue), Ra = Xs(Xn), Hn = Zs(ue), Zn = /* @__PURE__ */ new WeakMap(), Sa = to(Zn, K), Pa = Po(Yn, ue, Z, Mt, Rn, Nt, se, yt, de, Hn, It, Sa, Ye), La = Io(Z, Pa, se, de, Ye), Ua = xs(jn, Yn, Xe, Mt, Rn, Nt, se, Ra, Hn, It, H, Ce, _e, Gn, At, Ta), Ba = oo(zn), Wa = qo(Zn), nn = $n ? Ws(Oa, ze, Tt, Ua, La, z, Ba, ce, ee, Ce, ta, Wa, aa, qe) : void 0, Da = vo(Z, de, Yo, Na, $e), Kn = "Missing AudioWorklet support. Maybe this is not running in a secure context.", Va = async (e, t, n, r, s) => {
  const { encoderInstanceId: o, port: a } = await cn(s, t.sampleRate);
  if (nn === void 0)
    throw new Error(Kn);
  const c = new ya(t, { buffer: e }), i = new ka(t, { mediaStream: r }), u = Gr(nn, t, { channelCount: n });
  return { audioBufferSourceNode: c, encoderInstanceId: o, mediaStreamAudioSourceNode: i, port: a, recorderAudioWorkletNode: u };
}, xa = (e, t, n, r) => (s, o, a) => {
  var c;
  const i = (c = o.getAudioTracks()[0]) === null || c === void 0 ? void 0 : c.getSettings().sampleRate, u = new Da({ latencyHint: "playback", sampleRate: i }), d = Math.max(1024, Math.ceil(u.baseLatency * u.sampleRate)), l = new _a({ length: d, sampleRate: u.sampleRate }), m = [], w = jr((E) => {
    if (tn === void 0)
      throw new Error(Kn);
    return tn(u, E);
  });
  let p = null, f = null, g = null, h = null, A = !0;
  const _ = (E) => {
    s.dispatchEvent(e("dataavailable", { data: new Blob(E, { type: a }) }));
  }, T = async (E, M) => {
    const R = await Le(E, M);
    g === null ? m.push(...R) : (_(R), h = T(E, M));
  }, v = () => (A = !0, u.resume()), b = () => {
    g !== null && (p !== null && (o.removeEventListener("addtrack", p), o.removeEventListener("removetrack", p)), f !== null && clearTimeout(f), g.then(async ({ encoderInstanceId: E, mediaStreamAudioSourceNode: M, recorderAudioWorkletNode: R }) => {
      h !== null && (h.catch(() => {
      }), h = null), await R.stop(), M.disconnect(R);
      const N = await Le(E, null);
      g === null && await y(), _([...m, ...N]), m.length = 0, s.dispatchEvent(new Event("stop"));
    }), g = null);
  }, y = () => (A = !1, u.suspend());
  return y(), {
    get mimeType() {
      return a;
    },
    get state() {
      return g === null ? "inactive" : A ? "recording" : "paused";
    },
    pause() {
      if (g === null)
        throw n();
      A && (y(), s.dispatchEvent(new Event("pause")));
    },
    resume() {
      if (g === null)
        throw n();
      A || (v(), s.dispatchEvent(new Event("resume")));
    },
    start(E) {
      var M;
      if (g !== null)
        throw n();
      if (o.getVideoTracks().length > 0)
        throw r();
      s.dispatchEvent(new Event("start"));
      const R = o.getAudioTracks(), N = R.length === 0 ? 2 : (M = R[0].getSettings().channelCount) !== null && M !== void 0 ? M : 2;
      g = Promise.all([
        v(),
        w.then(() => Va(l, u, N, o, a))
      ]).then(async ([, { audioBufferSourceNode: L, encoderInstanceId: U, mediaStreamAudioSourceNode: W, port: O, recorderAudioWorkletNode: B }]) => (W.connect(B), await new Promise((V) => {
        L.onended = V, L.connect(B), L.start(u.currentTime + d / u.sampleRate);
      }), L.disconnect(B), await B.record(O), E !== void 0 && (h = T(U, E)), { encoderInstanceId: U, mediaStreamAudioSourceNode: W, recorderAudioWorkletNode: B }));
      const P = o.getTracks();
      p = () => {
        b(), s.dispatchEvent(new ErrorEvent("error", { error: t() }));
      }, o.addEventListener("addtrack", p), o.addEventListener("removetrack", p), f = setInterval(() => {
        const L = o.getTracks();
        (L.length !== P.length || L.some((U, W) => U !== P[W])) && p !== null && p();
      }, 1e3);
    },
    stop: b
  };
};
class tt {
  constructor(t, n = 0, r) {
    if (n < 0 || r !== void 0 && r < 0)
      throw new RangeError();
    const s = t.reduce((d, l) => d + l.byteLength, 0);
    if (n > s || r !== void 0 && n + r > s)
      throw new RangeError();
    const o = [], a = r === void 0 ? s - n : r, c = [];
    let i = 0, u = n;
    for (const d of t)
      if (c.length === 0)
        if (d.byteLength > u) {
          i = d.byteLength - u;
          const l = i > a ? a : i;
          o.push(new DataView(d, u, l)), c.push(d);
        } else
          u -= d.byteLength;
      else if (i < a) {
        i += d.byteLength;
        const l = i > a ? d.byteLength - i + a : d.byteLength;
        o.push(new DataView(d, 0, l)), c.push(d);
      }
    this._buffers = c, this._byteLength = a, this._byteOffset = u, this._dataViews = o, this._internalBuffer = new DataView(new ArrayBuffer(8));
  }
  get buffers() {
    return this._buffers;
  }
  get byteLength() {
    return this._byteLength;
  }
  get byteOffset() {
    return this._byteOffset;
  }
  getFloat32(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.setUint8(2, this.getUint8(t + 2)), this._internalBuffer.setUint8(3, this.getUint8(t + 3)), this._internalBuffer.getFloat32(0, n);
  }
  getFloat64(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.setUint8(2, this.getUint8(t + 2)), this._internalBuffer.setUint8(3, this.getUint8(t + 3)), this._internalBuffer.setUint8(4, this.getUint8(t + 4)), this._internalBuffer.setUint8(5, this.getUint8(t + 5)), this._internalBuffer.setUint8(6, this.getUint8(t + 6)), this._internalBuffer.setUint8(7, this.getUint8(t + 7)), this._internalBuffer.getFloat64(0, n);
  }
  getInt16(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.getInt16(0, n);
  }
  getInt32(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.setUint8(2, this.getUint8(t + 2)), this._internalBuffer.setUint8(3, this.getUint8(t + 3)), this._internalBuffer.getInt32(0, n);
  }
  getInt8(t) {
    const [n, r] = this._findDataViewWithOffset(t);
    return n.getInt8(t - r);
  }
  getUint16(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.getUint16(0, n);
  }
  getUint32(t, n) {
    return this._internalBuffer.setUint8(0, this.getUint8(t + 0)), this._internalBuffer.setUint8(1, this.getUint8(t + 1)), this._internalBuffer.setUint8(2, this.getUint8(t + 2)), this._internalBuffer.setUint8(3, this.getUint8(t + 3)), this._internalBuffer.getUint32(0, n);
  }
  getUint8(t) {
    const [n, r] = this._findDataViewWithOffset(t);
    return n.getUint8(t - r);
  }
  setFloat32(t, n, r) {
    this._internalBuffer.setFloat32(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1)), this.setUint8(t + 2, this._internalBuffer.getUint8(2)), this.setUint8(t + 3, this._internalBuffer.getUint8(3));
  }
  setFloat64(t, n, r) {
    this._internalBuffer.setFloat64(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1)), this.setUint8(t + 2, this._internalBuffer.getUint8(2)), this.setUint8(t + 3, this._internalBuffer.getUint8(3)), this.setUint8(t + 4, this._internalBuffer.getUint8(4)), this.setUint8(t + 5, this._internalBuffer.getUint8(5)), this.setUint8(t + 6, this._internalBuffer.getUint8(6)), this.setUint8(t + 7, this._internalBuffer.getUint8(7));
  }
  setInt16(t, n, r) {
    this._internalBuffer.setInt16(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1));
  }
  setInt32(t, n, r) {
    this._internalBuffer.setInt32(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1)), this.setUint8(t + 2, this._internalBuffer.getUint8(2)), this.setUint8(t + 3, this._internalBuffer.getUint8(3));
  }
  setInt8(t, n) {
    const [r, s] = this._findDataViewWithOffset(t);
    r.setInt8(t - s, n);
  }
  setUint16(t, n, r) {
    this._internalBuffer.setUint16(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1));
  }
  setUint32(t, n, r) {
    this._internalBuffer.setUint32(0, n, r), this.setUint8(t, this._internalBuffer.getUint8(0)), this.setUint8(t + 1, this._internalBuffer.getUint8(1)), this.setUint8(t + 2, this._internalBuffer.getUint8(2)), this.setUint8(t + 3, this._internalBuffer.getUint8(3));
  }
  setUint8(t, n) {
    const [r, s] = this._findDataViewWithOffset(t);
    r.setUint8(t - s, n);
  }
  _findDataViewWithOffset(t) {
    let n = 0;
    for (const r of this._dataViews) {
      const s = n + r.byteLength;
      if (t >= n && t < s)
        return [r, n];
      n = s;
    }
    throw new RangeError();
  }
}
const Fa = (e, t, n) => (r, s, o, a) => {
  const c = [], i = new s(o, { mimeType: "audio/webm;codecs=pcm" });
  let u = null, d = () => {
  };
  const l = (p) => {
    r.dispatchEvent(e("dataavailable", { data: new Blob(p, { type: a }) }));
  }, m = async (p, f) => {
    const g = await Le(p, f);
    i.state === "inactive" ? c.push(...g) : (l(g), u = m(p, f));
  }, w = () => {
    i.state !== "inactive" && (u !== null && (u.catch(() => {
    }), u = null), d(), d = () => {
    }, i.stop());
  };
  return i.addEventListener("error", (p) => {
    w(), r.dispatchEvent(new ErrorEvent("error", {
      error: p.error
    }));
  }), i.addEventListener("pause", () => r.dispatchEvent(new Event("pause"))), i.addEventListener("resume", () => r.dispatchEvent(new Event("resume"))), i.addEventListener("start", () => r.dispatchEvent(new Event("start"))), {
    get mimeType() {
      return a;
    },
    get state() {
      return i.state;
    },
    pause() {
      return i.pause();
    },
    resume() {
      return i.resume();
    },
    start(p) {
      const [f] = o.getAudioTracks();
      if (f !== void 0 && i.state === "inactive") {
        const { channelCount: g, sampleRate: h } = f.getSettings();
        if (g === void 0)
          throw new Error("The channelCount is not defined.");
        if (h === void 0)
          throw new Error("The sampleRate is not defined.");
        let A = !1, _ = !1, T = 0, v = cn(a, h);
        d = () => {
          _ = !0;
        };
        const b = un(i, "dataavailable")(({ data: y }) => {
          T += 1;
          const E = y.arrayBuffer();
          v = v.then(async ({ dataView: M = null, elementType: R = null, encoderInstanceId: N, port: P }) => {
            const L = await E;
            T -= 1;
            const U = M === null ? new tt([L]) : new tt([...M.buffers, L], M.byteOffset);
            if (!A && i.state === "recording" && !_) {
              const I = n(U, 0);
              if (I === null)
                return { dataView: U, elementType: R, encoderInstanceId: N, port: P };
              const { value: S } = I;
              if (S !== 172351395)
                return { dataView: M, elementType: R, encoderInstanceId: N, port: P };
              A = !0;
            }
            const { currentElementType: W, offset: O, contents: B } = t(U, R, g), V = O < U.byteLength ? new tt(U.buffers, U.byteOffset + O) : null;
            return B.forEach((I) => P.postMessage(I, I.map(({ buffer: S }) => S))), T === 0 && (i.state === "inactive" || _) && (Le(N, null).then((I) => {
              l([...c, ...I]), c.length = 0, r.dispatchEvent(new Event("stop"));
            }), P.postMessage([]), P.close(), b()), { dataView: V, elementType: W, encoderInstanceId: N, port: P };
          });
        });
        p !== void 0 && v.then(({ encoderInstanceId: y }) => {
          _ || (u = m(y, p));
        });
      }
      i.start(100);
    },
    stop: w
  };
}, ja = () => typeof window > "u" ? null : window, Qn = (e, t) => {
  if (t >= e.byteLength)
    return null;
  const n = e.getUint8(t);
  if (n > 127)
    return 1;
  if (n > 63)
    return 2;
  if (n > 31)
    return 3;
  if (n > 15)
    return 4;
  if (n > 7)
    return 5;
  if (n > 3)
    return 6;
  if (n > 1)
    return 7;
  if (n > 0)
    return 8;
  const r = Qn(e, t + 1);
  return r === null ? null : r + 8;
}, Ga = (e, t) => (n) => {
  const r = { value: e };
  return Object.defineProperties(n, {
    currentTarget: r,
    target: r
  }), typeof t == "function" ? t.call(e, n) : t.handleEvent.call(e, n);
}, Jn = [], kt = ja(), qa = Tr(kt), er = vr(qa), $a = xa(er, br, Ar, nt), Ot = Or(Qn), za = Ir(Ot), Xa = kr(Ot), Ya = _r(za, Xa), Ha = Fa(er, Ya, Ot), Za = yr(kt), Ka = Mr(kt), Qa = Cr(Nr(nt), nt, $a, Ha, Jn, Er(Za, Ga), Ka), Ja = /* @__PURE__ */ new WeakMap(), ei = async (e) => {
  const t = await wr(e);
  Jn.push(t), Ja.set(e, t);
}, ti = on({
  characterize: ({ call: e }) => () => e("characterize"),
  encode: ({ call: e }) => (t, n) => e("encode", { recordingId: t, timeslice: n }),
  record: ({ call: e }) => async (t, n, r) => {
    await e("record", { recordingId: t, sampleRate: n, typedArrays: r }, r.map(({ buffer: s }) => s));
  }
}), ni = (e) => {
  const t = new Worker(e);
  return ti(t);
}, ri = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,s=536870912,a=2*s,o=function(e,t){return function(r){var o=t.get(r),i=void 0===o?r.size:o<a?o+1:0;if(!r.has(i))return e(r,i);if(r.size<s){for(;r.has(i);)i=Math.floor(Math.random()*a);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,c=r(i),l=o(c,i),u=t(l);e.addUniqueNumber=u,e.generateUniqueNumber=l}(t)}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(()=>{"use strict";const e=-32603,t=-32602,n=-32601,s=(e,t)=>Object.assign(new Error(e),{status:t}),a=t=>s('The handler of the method called "'.concat(t,'" returned an unexpected result.'),e),o=(t,r)=>async({data:{id:o,method:i,params:c}})=>{const l=r[i];try{if(void 0===l)throw(e=>s('The requested method called "'.concat(e,'" is not supported.'),n))(i);const r=void 0===c?l():l(c);if(void 0===r)throw(t=>s('The handler of the method called "'.concat(t,'" returned no required result.'),e))(i);const u=r instanceof Promise?await r:r;if(null===o){if(void 0!==u.result)throw a(i)}else{if(void 0===u.result)throw a(i);const{result:e,transferables:r=[]}=u;t.postMessage({id:o,result:e},r)}}catch(e){const{message:r,status:n=-32603}=e;t.postMessage({error:{code:n,message:r},id:o})}};var i=r(455);const c=new Map,l=(e,r,n)=>({...r,connect:({port:t})=>{t.start();const n=e(t,r),s=(0,i.generateUniqueNumber)(c);return c.set(s,(()=>{n(),t.close(),c.delete(s)})),{result:s}},disconnect:({portId:e})=>{const r=c.get(e);if(void 0===r)throw(e=>s('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),t))(e);return r(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),u=(e,t,r=()=>!0)=>{const n=l(u,t,r),s=o(e,n);return e.addEventListener("message",s),()=>e.removeEventListener("message",s)},d=e=>e.reduce(((e,t)=>e+t.length),0),h=(e,t)=>{const r=[];let n=0;e:for(;n<t;){const t=e.length;for(let s=0;s<t;s+=1){const t=e[s];void 0===r[s]&&(r[s]=[]);const a=t.shift();if(void 0===a)break e;r[s].push(a),0===s&&(n+=a.length)}}if(n>t){const s=n-t;r.forEach(((t,r)=>{const n=t.pop(),a=n.length-s;t.push(n.subarray(0,a)),e[r].unshift(n.subarray(a))}))}return r},f=new Map,m=(e=>(t,r,n)=>{const s=e.get(t);if(void 0===s){const s={channelDataArrays:n.map((e=>[e])),isComplete:!0,sampleRate:r};return e.set(t,s),s}return s.channelDataArrays.forEach(((e,t)=>e.push(n[t]))),s})(f),p=((e,t)=>(r,n,s,a)=>{const o=s>>3,i="subsequent"===n?0:44,c=r.length,l=e(r[0]),u=new ArrayBuffer(l*c*o+i),d=new DataView(u);return"subsequent"!==n&&t(d,s,c,"complete"===n?l:Number.POSITIVE_INFINITY,a),r.forEach(((e,t)=>{let r=i+t*o;e.forEach((e=>{const t=e.length;for(let n=0;n<t;n+=1){const t=e[n];d.setInt16(r,t<0?32768*Math.max(-1,t):32767*Math.min(1,t),!0),r+=c*o}}))})),[u]})(d,((e,t,r,n,s)=>{const a=t>>3,o=Math.min(n*r*a,4294967251);e.setUint32(0,1380533830),e.setUint32(4,o+36,!0),e.setUint32(8,1463899717),e.setUint32(12,1718449184),e.setUint32(16,16,!0),e.setUint16(20,1,!0),e.setUint16(22,r,!0),e.setUint32(24,s,!0),e.setUint32(28,s*r*a,!0),e.setUint16(32,r*a,!0),e.setUint16(34,t,!0),e.setUint32(36,1684108385),e.setUint32(40,o,!0)})),v=new Map;u(self,{characterize:()=>({result:/^audio\\/wav$/}),encode:({recordingId:e,timeslice:t})=>{const r=v.get(e);void 0!==r&&(v.delete(e),r.reject(new Error("Another request was made to initiate an encoding.")));const n=f.get(e);if(null!==t){if(void 0===n||d(n.channelDataArrays[0])*(1e3/n.sampleRate)<t)return new Promise(((r,n)=>{v.set(e,{reject:n,resolve:r,timeslice:t})}));const r=h(n.channelDataArrays,Math.ceil(t*(n.sampleRate/1e3))),s=p(r,n.isComplete?"initial":"subsequent",16,n.sampleRate);return n.isComplete=!1,{result:s,transferables:s}}if(void 0!==n){const t=p(n.channelDataArrays,n.isComplete?"complete":"subsequent",16,n.sampleRate);return f.delete(e),{result:t,transferables:t}}return{result:[],transferables:[]}},record:({recordingId:e,sampleRate:t,typedArrays:r})=>{const n=m(e,t,r),s=v.get(e);if(void 0!==s&&d(n.channelDataArrays[0])*(1e3/t)>=s.timeslice){const r=h(n.channelDataArrays,Math.ceil(s.timeslice*(t/1e3))),a=p(r,n.isComplete?"initial":"subsequent",16,t);n.isComplete=!1,v.delete(e),s.resolve({result:a,transferables:a})}return{result:null}}})})()})();`, si = new Blob([ri], { type: "application/javascript; charset=utf-8" }), tr = URL.createObjectURL(si), oi = ni(tr), ai = oi.connect;
URL.revokeObjectURL(tr);
const _i = (e, t, n) => {
  const [r, s] = me(!1), [o, a] = me(!1), [c, i] = me(0), [u, d] = me(), [l, m] = me(), [w, p] = me(), f = ye(() => {
    const T = setInterval(() => {
      i((v) => v + 1);
    }, 1e3);
    m(T);
  }, [i, m]), g = ye(() => {
    l != null && clearInterval(l), m(void 0);
  }, [l, m]), h = ye(() => {
    l == null && ai().then((T) => {
      ei(T).then(() => {
        navigator.mediaDevices.getUserMedia({ audio: e ?? !0 }).then((v) => {
          s(!0);
          const b = new Qa(
            v,
            n
          );
          d(b), b.start(), f(), b.addEventListener("dataavailable", (y) => {
            p(y.data), v.getTracks().forEach((E) => E.stop()), d(void 0);
          });
        }).catch((v) => {
          console.log(v.name, v.message, v.cause), t == null || t(v);
        });
      });
    });
  }, [
    l,
    s,
    d,
    f,
    p,
    t,
    n
  ]), A = ye(() => {
    u == null || u.stop(), g(), i(0), s(!1), a(!1);
  }, [
    u,
    i,
    s,
    a,
    g
  ]), _ = ye(() => {
    o ? (a(!1), u == null || u.resume(), f()) : (a(!0), g(), u == null || u.pause());
  }, [u, a, f, g]);
  return {
    startRecording: h,
    stopRecording: A,
    togglePauseResume: _,
    recordingBlob: w,
    isRecording: r,
    isPaused: o,
    recordingTime: c,
    mediaRecorder: u
  };
};
export {
  _i as useAudioRecorder
};
