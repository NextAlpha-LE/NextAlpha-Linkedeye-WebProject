const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const sourceRoot = path.resolve(__dirname, '..');
const appTemplateRoot = path.resolve(sourceRoot, '..', '..', '..', 'templates', 'app');
const projectRoot = path.resolve(sourceRoot, '..', '..', '..', '..');

function readSource(filename) {
  return fs.readFileSync(path.join(sourceRoot, filename), 'utf8');
}

function readTemplate(filename) {
  return fs.readFileSync(path.join(appTemplateRoot, filename), 'utf8');
}

function readProjectFile(...parts) {
  return fs.readFileSync(path.join(projectRoot, ...parts), 'utf8');
}

function assertAppearsBefore(source, first, second, message) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);

  assert.notEqual(firstIndex, -1, `${first} should be present`);
  assert.notEqual(secondIndex, -1, `${second} should be present`);
  assert.ok(firstIndex < secondIndex, message);
}

test('long-lived pages do not unregister freshly-created anonymous AnimEvent handlers', () => {
  const leakPattern = /removeEventListener\s*\([\s\S]{0,240}AnimEvent\.add\s*\(\s*function\s*\(/;
  const files = ['entity-new.js', 'switch-update.js'];

  for (const filename of files) {
    assert.doesNotMatch(
      readSource(filename),
      leakPattern,
      `${filename} still recreates anonymous AnimEvent handlers during cleanup`
    );
  }
});

test('long-lived resource files are wired through the lifecycle helper', () => {
  assert.ok(
    fs.existsSync(path.join(sourceRoot, 'memory-lifecycle.js')),
    'memory-lifecycle.js should exist before long-lived resources are tracked'
  );

  for (const filename of ['entity-new.js', 'switch-update.js']) {
    assert.match(
      readSource(filename),
      /LinkedEyeLifecycle/,
      `${filename} should register resources with LinkedEyeLifecycle`
    );
  }
});

test('dynamic polling and mutation observers are lifecycle tracked', () => {
  const entitySource = readSource('entity-new.js');
  const switchSource = readSource('switch-update.js');

  assert.doesNotMatch(
    entitySource,
    /const\s+intervalId\s*=\s*setInterval\s*\(/,
    'entity-new.js should track long-lived polling intervals through LinkedEyeLifecycle'
  );
  assert.doesNotMatch(
    entitySource,
    /observers\.push\s*\(\s*observer\s*\)/,
    'entity-new.js should track MutationObservers through LinkedEyeLifecycle'
  );
  assert.doesNotMatch(
    switchSource,
    /observers\.push\s*\(\s*observer\s*\)/,
    'switch-update.js should track MutationObservers through LinkedEyeLifecycle'
  );
  assert.match(entitySource, /trackEntityTimer/);
  assert.match(entitySource, /trackEntityObserver/);
  assert.match(switchSource, /trackSwitchObserver/);
});

test('dashboard loads lifecycle helper before all-clients dashboard scripts', () => {
  const commonLayout = readTemplate('commonlayout.html');
  const dashboard = readTemplate('dashboard.html');

  assertAppearsBefore(
    commonLayout,
    'memory-lifecycle.js',
    'main-site-dashboard.js',
    'memory-lifecycle.js must load before the common dashboard websocket script'
  );
  assert.match(dashboard, /main-dashboard-entity\.js/);
  assert.match(dashboard, /main-dashboard-chart\.js/);
});

test('dashboard websocket clients and subscriptions are lifecycle tracked', () => {
  const entityDashboard = readSource('main-dashboard-entity.js');
  const siteDashboard = readSource('main-site-dashboard.js');

  assert.match(entityDashboard, /LinkedEyeLifecycle/);
  assert.match(entityDashboard, /trackDashboardEntitySocket/);
  assert.match(entityDashboard, /trackDashboardEntitySubscription\s*\(\s*deltaclient\.subscribe\s*\(/);
  assert.doesNotMatch(
    entityDashboard,
    /^\s*deltaclient\.subscribe\s*\(/m,
    'main-dashboard-entity.js should not create untracked STOMP subscriptions'
  );

  assert.match(siteDashboard, /LinkedEyeLifecycle/);
  assert.match(siteDashboard, /siteDashboardClients\[wsiteName\]/);
  assert.match(siteDashboard, /trackSiteDashboardSocket/);
  assert.match(siteDashboard, /trackSiteDashboardSubscription\s*\(\s*stompClient\.subscribe\s*\(/);
  assert.doesNotMatch(
    siteDashboard,
    /^\s*stompClient\.subscribe\s*\(/m,
    'main-site-dashboard.js should not create untracked STOMP subscriptions'
  );
});

test('dashboard all-site discovery uses summary payloads instead of full graph data', () => {
  const entityDashboard = readSource('main-dashboard-entity.js');
  const dashboardView = readProjectFile('dashboard', 'views.py');

  assert.match(
    entityDashboard,
    /getneo4jnodes",\s*\{\s*sitename:\s*' '\s*,\s*summary:\s*'true'\s*\}/,
    'dashboard all-site getneo4jnodes call should request summary mode'
  );
  assert.doesNotMatch(
    entityDashboard,
    /entityResponse\s*=\s*response\.responseData/,
    'dashboard JS should not retain full all-site graph responses'
  );
  assert.doesNotMatch(
    entityDashboard,
    /responseFromServer\s*=\s*obj\.site_data/,
    'dashboard all-site discovery should not retain every site_data payload'
  );
  assert.match(
    dashboardView,
    /summary\s*=\s*request\.GET\.get\("summary"/,
    'getneo4jnodes should read a summary flag'
  );
  assert.match(
    dashboardView,
    /if\s+summary\s+and\s+request\.GET\["sitename"\]\s*==\s*' '\s*:/,
    'getneo4jnodes should skip full graph fetches for all-site summary requests'
  );
});

test('dashboard keeps every enabled site realtime while full graph data loads per selected site', () => {
  const entityDashboard = readSource('main-dashboard-entity.js');

  assert.match(
    entityDashboard,
    /function\s+getSiteNamesChart\s*\(\)\s*\{[\s\S]*\/lesites\/getallsitenames[\s\S]*siteResponse\.forEach[\s\S]*makeWebSocConnectionChart\s*\(/,
    'dashboard should still start realtime websocket setup from the enabled site list'
  );
  assert.match(
    entityDashboard,
    /var\s+destination\s*=\s*"\/exchange\/delta_update"/,
    'dashboard realtime websocket should keep subscribing to delta updates'
  );
  assert.match(
    entityDashboard,
    /function\s+onEntitySiteTabchange\s*\(sitename\)[\s\S]*requestDataFromServer\("\.\.\/dashboard\/getneo4jnodes",\s*\{\s*sitename:\s*sitename\s*\}/,
    'selected site tab changes should still load full graph data for that site'
  );
  assert.match(
    entityDashboard,
    /displayNodesChart\(response\.responseData\[0\]\.site_data,\s*response\.responseData\[0\]\.code\)/,
    'selected site full graph response should still render through displayNodesChart'
  );
});
