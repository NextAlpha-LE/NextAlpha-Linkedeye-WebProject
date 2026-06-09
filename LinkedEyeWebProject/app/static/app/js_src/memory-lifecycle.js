(function (root) {
    var scopes = {};

    function Scope(name) {
        this.name = name;
        this.listeners = [];
        this.timers = [];
        this.observers = [];
        this.lines = [];
        this.cytoscapeInstances = [];
        this.subscriptions = [];
        this.sockets = [];
        this.ajaxHandles = [];
    }

    Scope.prototype.trackListener = function (target, type, handler, options) {
        if (!target || !target.addEventListener || !handler) {
            return handler;
        }
        target.addEventListener(type, handler, options || false);
        this.listeners.push({
            target: target,
            type: type,
            handler: handler,
            options: options || false
        });
        return handler;
    };

    Scope.prototype.trackTimer = function (id, clearFn) {
        this.timers.push({ id: id, clearFn: clearFn });
        return id;
    };

    Scope.prototype.trackObserver = function (observer) {
        if (observer) {
            this.observers.push(observer);
        }
        return observer;
    };

    Scope.prototype.trackLine = function (line) {
        if (line) {
            this.lines.push(line);
        }
        return line;
    };

    Scope.prototype.trackCytoscape = function (instance) {
        if (instance) {
            this.cytoscapeInstances.push(instance);
        }
        return instance;
    };

    Scope.prototype.trackSubscription = function (subscription) {
        if (subscription) {
            this.subscriptions.push(subscription);
        }
        return subscription;
    };

    Scope.prototype.trackSocket = function (socket) {
        if (socket) {
            this.sockets.push(socket);
        }
        return socket;
    };

    Scope.prototype.trackAjax = function (handle) {
        if (handle) {
            this.ajaxHandles.push(handle);
        }
        return handle;
    };

    Scope.prototype.stats = function () {
        return {
            listeners: this.listeners.length,
            timers: this.timers.length,
            observers: this.observers.length,
            lines: this.lines.length,
            cytoscapeInstances: this.cytoscapeInstances.length,
            subscriptions: this.subscriptions.length,
            sockets: this.sockets.length,
            ajaxHandles: this.ajaxHandles.length
        };
    };

    function drain(items, cleanupFn) {
        while (items.length) {
            var item = items.pop();
            try {
                cleanupFn(item);
            } catch (err) {
                // Cleanup must be best-effort so live updates keep running.
            }
        }
    }

    Scope.prototype.cleanup = function () {
        drain(this.listeners, function (item) {
            item.target.removeEventListener(item.type, item.handler, item.options);
        });
        drain(this.timers, function (item) {
            if (typeof item.clearFn === 'function') {
                item.clearFn(item.id);
            } else if (typeof root.clearInterval === 'function') {
                root.clearInterval(item.id);
            }
        });
        drain(this.observers, function (observer) {
            if (observer && typeof observer.disconnect === 'function') {
                observer.disconnect();
            }
        });
        drain(this.lines, function (line) {
            if (line && typeof line.remove === 'function') {
                line.remove();
            }
        });
        drain(this.cytoscapeInstances, function (instance) {
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
            }
        });
        drain(this.subscriptions, function (subscription) {
            if (subscription && typeof subscription.unsubscribe === 'function') {
                subscription.unsubscribe();
            }
        });
        drain(this.sockets, function (socket) {
            if (socket && typeof socket.disconnect === 'function') {
                socket.disconnect();
            } else if (socket && typeof socket.close === 'function') {
                socket.close();
            }
        });
        drain(this.ajaxHandles, function (handle) {
            if (handle && typeof handle.abort === 'function') {
                handle.abort();
            }
        });
    };

    function createScope(name) {
        return new Scope(name);
    }

    function scope(name) {
        if (!scopes[name]) {
            scopes[name] = createScope(name);
        }
        return scopes[name];
    }

    var api = {
        createScope: createScope,
        scope: scope
    };

    root.LinkedEyeLifecycle = api;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
})(typeof window !== 'undefined' ? window : globalThis);
