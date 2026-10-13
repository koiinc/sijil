const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
function node(selector) {
  if (!nodes.has(selector)) nodes.set(selector, {
    innerHTML: '', textContent: '', value: '', style: {},
    querySelectorAll: () => [], showModal() {}, close() {},
  });
  return nodes.get(selector);
}
const events = {};
const context = vm.createContext({
  document: {querySelector: node, querySelectorAll: () => [], addEventListener: (type, fn) => events[type] = fn},
  localStorage: {getItem: () => null, setItem() {}},
  setTimeout() {},
  window: {print() {}},
  crypto: {randomUUID: () => 'test-design'},
  console,
});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../dist/app.js'), 'utf8'), context);
const run = code => vm.runInContext(code, context);
assert.equal(run('state.designs.length'), 6);
assert.ok(node('#body').innerHTML.includes('aria-label="Preview Classic distinction"'));
assert.equal(run('nextId()'), 'FOL-2026-004');
assert.equal(run('parseCSV(\'name,event\\r\\n"Lee, Mei","Workshop ""A"""\')[1][0]'), 'Lee, Mei');
assert.equal(run('parseCSV(\'name,event\\nAlex,"Two\\nlines"\')[1][1]'), 'Two\nlines');
assert.throws(() => run('parseCSV(\'name\\n"unfinished\')'), /Unclosed quote/);
const certificate = run('certificate(state.designs[0], {name:"<script>alert(1)</script>",id:"REF-42",event:"Workshop"})');
assert.ok(certificate.includes('&lt;script&gt;'));
assert.ok(certificate.includes('REF-42'));
assert.ok(!certificate.includes('<script>'));
run("tab='overview';show()");
assert.ok(node('#body').innerHTML.includes('Step 3'));
run("tab='participants';show()");
assert.ok(node('#body').innerHTML.includes('FOL-2026-001'));
run("query='does-not-exist';show()");
assert.ok(node('#body').innerHTML.includes('No matching participants'));
run("tab='designs';query='does-not-exist';show()");
assert.ok(node('#body').innerHTML.includes('No designs in this view'));
async function importCSV(text) {
  await node('#csv').onchange({target: {files: [{text: async () => text}], value: ''}});
}
(async () => {
  await importCSV('name,email,event,id\nMorgan,m@example.com,Workshop,REF-42\nJordan,j@example.com,Workshop,');
  assert.equal(run('state.people.length'), 5);
  assert.equal(run('state.people[3].id'), 'REF-42');
  assert.equal(run('state.people[4].id'), 'FOL-2026-004');
  await importCSV('name,id\nNew participant,NEW-1\nDuplicate,REF-42');
  assert.equal(run('state.people.length'), 5, 'Failed imports must not partially add rows');
  assert.match(node('#toast').textContent, /Duplicate identifier/);
  run("selected='d1';printPeople([state.people[3]])");
  assert.ok(node('#printarea').innerHTML.includes('cert navy'));
  assert.ok(node('#printarea').innerHTML.includes('REF-42'));
  assert.ok(node('#printarea').innerHTML.includes('Morgan'));
  run("state.people=[];tab='print';show()");
  assert.match(node('#body').innerHTML, /id="batch" disabled/);
  console.log('Passed: design navigation, empty states, CSV quoting and atomic import, unique IDs, escaped certificate content, and participant-to-certificate mapping.');
})().catch(error => { console.error(error); process.exitCode = 1; });
