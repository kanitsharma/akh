/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/trans/dcont.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu-stream/stream", "./unique", "../structure", "../_tail"], (function(require, exports,
    __o, UniqueT, __o0, __o1) {
    "use strict";
    var append = __o["append"],
        cons = __o["cons"],
        first = __o["first"],
        rest = __o["rest"],
        isEmpty = __o["isEmpty"],
        NIL = __o["NIL"],
        Monad = __o0["Monad"],
        Transformer = __o0["Transformer"],
        Tail = __o1["Tail"],
        trampoline = __o1["trampoline"],
        DContT, x, y, Seg = (function(f) {
            var self = this;
            (self.frame = f);
        }),
        P = (function(t) {
            var self = this;
            (self.prompt = t);
        }),
        empty = NIL,
        push = cons,
        pushSeq = append,
        splitSeq = (function(t, k) {
            if (isEmpty(k)) return [empty, empty];
            var x = first(k),
                xs = rest(k);
            if (((x instanceof P) && (x.prompt === t))) return [empty, xs];
            var __o2 = splitSeq(t, xs),
                a = __o2[0],
                b = __o2[1];
            return [push(x, a), b];
        }),
        DContMonad = (function(instance, newPrompt, pushPrompt, withSubCont, pushSubCont) {
            (instance.prototype.newPrompt = newPrompt);
            (instance.newPrompt = instance.prototype.newPrompt);
            (instance.prototype.pushPrompt = pushPrompt);
            (instance.pushPrompt = instance.prototype.pushPrompt);
            (instance.prototype.withSubCont = withSubCont);
            (instance.withSubCont = instance.prototype.withSubCont);
            (instance.prototype.pushSubCont = pushSubCont);
            (instance.pushSubCont = instance.prototype.pushSubCont);
            (instance.prototype.reset = (function(f) {
                return newPrompt.chain((function(p) {
                    return pushPrompt(p, f(p));
                }));
            }));
            (instance.reset = instance.prototype.reset);
            (instance.prototype.shift = (function(p, f) {
                var t = this;
                return withSubCont(p, (function(k) {
                    return pushPrompt(p, f((function(c) {
                        return pushPrompt(p, pushSubCont(k, c));
                    })));
                }));
            }));
            (instance.shift = instance.prototype.shift);
            return instance;
        }),
        unDContT = (function(m, k) {
            return new(Tail)(m.run, k);
        }),
        runDContT = ((x = trampoline), (y = UniqueT.runUniqueT), (function() {
            var x0 = unDContT.apply(null, arguments);
            return y(x(x0));
        }));
    (DContT = (function(m) {
        var M = UniqueT(m),
            Instance = (function(run) {
                var self = this;
                (self.run = run);
            }),
            appk = (function(k, x0) {
                var c = k;
                do {
                    if (((typeof c) === "function")) return M.of(c(x0));
                    var top = first(c);
                    if ((top instanceof Seg)) {
                        var m0 = top.frame(x0),
                            k0 = rest(c);
                        return new(Tail)(m0.run, k0);
                    }
                    (c = ((top instanceof P) ? rest(c) : top));
                }
                while (true);
            });
        Monad(Instance, (function(x0) {
            return new(Instance)((function(k) {
                return appk(k, x0);
            }));
        }), (function(f) {
            var c = this;
            return new(Instance)((function(k) {
                var k0 = push(new(Seg)(f), k);
                return new(Tail)(c.run, k0);
            }));
        }));
        Transformer(Instance, m, (function(t) {
            return new(Instance)((function(k) {
                var x0, y0;
                return M.lift(t.map(trampoline))
                    .chain(((x0 = appk.bind(null, k)), (y0 = trampoline), (function(x1) {
                        return y0(x0(x1));
                    })));
            }));
        }));
        DContMonad(Instance, new(Instance)((function(k) {
            var x0, y0;
            return M.unique.chain(((x0 = appk.bind(null, k)), (y0 = trampoline), (function(
                x1) {
                return y0(x0(x1));
            })));
        })), (function(prompt, c) {
            return new(Instance)((function(k) {
                var k0 = push(new(P)(prompt), k);
                return new(Tail)(c.run, k0);
            }));
        }), (function(prompt, f) {
            return new(Instance)((function(k) {
                var __o2 = splitSeq(prompt, k),
                    x0 = __o2[0],
                    xs = __o2[1],
                    m0 = f(x0);
                return new(Tail)(m0.run, xs);
            }));
        }), (function(subk, c) {
            return new(Instance)((function(k) {
                var k0 = pushSeq(subk, k);
                return new(Tail)(c.run, k0);
            }));
        }));
        return Instance;
    }));
    (DContT.runDContT = (function(m, k) {
        return runDContT(m, push(k, empty));
    }));
    return DContT;
}));