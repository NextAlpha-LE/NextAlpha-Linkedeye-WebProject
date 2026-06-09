'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const lifecycle = require('../memory-lifecycle.js');

test('cleanup releases every tracked browser resource family', () => {
    const scope = lifecycle.createScope('unit-cleanup');
    const listenerCalls = [];
    const target = {
        addEventListener(type, handler, options) {
            listenerCalls.push(['add', type, handler, options]);
        },
        removeEventListener(type, handler, options) {
            listenerCalls.push(['remove', type, handler, options]);
        },
    };
    const handler = function handler() {};
    const clearedTimers = [];
    const observer = { disconnected: false, disconnect() { this.disconnected = true; } };
    const line = { removed: false, remove() { this.removed = true; } };
    const cy = { destroyed: false, destroy() { this.destroyed = true; } };
    const subscription = { unsubscribed: false, unsubscribe() { this.unsubscribed = true; } };
    const socket = { disconnected: false, disconnect() { this.disconnected = true; } };
    const ajax = { aborted: false, abort() { this.aborted = true; } };

    scope.trackListener(target, 'scroll', handler, false);
    scope.trackTimer(42, function clearTimer(id) { clearedTimers.push(id); });
    scope.trackObserver(observer);
    scope.trackLine(line);
    scope.trackCytoscape(cy);
    scope.trackSubscription(subscription);
    scope.trackSocket(socket);
    scope.trackAjax(ajax);

    scope.cleanup();

    assert.deepEqual(listenerCalls, [
        ['add', 'scroll', handler, false],
        ['remove', 'scroll', handler, false],
    ]);
    assert.deepEqual(clearedTimers, [42]);
    assert.equal(observer.disconnected, true);
    assert.equal(line.removed, true);
    assert.equal(cy.destroyed, true);
    assert.equal(subscription.unsubscribed, true);
    assert.equal(socket.disconnected, true);
    assert.equal(ajax.aborted, true);
    assert.deepEqual(scope.stats(), {
        listeners: 0,
        timers: 0,
        observers: 0,
        lines: 0,
        cytoscapeInstances: 0,
        subscriptions: 0,
        sockets: 0,
        ajaxHandles: 0,
    });
});
