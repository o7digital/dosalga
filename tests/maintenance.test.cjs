const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');
const { NextRequest, NextResponse } = require('next/server');

// Load the middleware with isolated environment values for each deployment scenario.
const source = readFileSync(`${__dirname}/../src/middleware.js`, 'utf8')
  .replace("import { NextResponse } from 'next/server'", '')
  .replace('export function middleware', 'function middleware')
  .replace('export const config', 'const config');

function run(url, env) {
  const context = vm.createContext({ NextResponse, URL, process: { env } });
  vm.runInContext(source, context);
  return context.middleware(new NextRequest(url, { headers: { host: new URL(url).host } }));
}

const enabled = { VERCEL_ENV: 'production', MAINTENANCE: 'true' };

test('production rewrites Dosalga Online storefront routes to maintenance', () => {
  for (const host of ['dosalga.online', 'www.dosalga.online']) {
    for (const path of ['/', '/services', '/contact', '/en', '/es/shop']) {
      assert.equal(run(`https://${host}${path}`, enabled).headers.get('x-middleware-rewrite'), `https://${host}/maintenance`);
    }
  }
});

test('preview and development stay open even with maintenance enabled', () => {
  for (const VERCEL_ENV of ['preview', 'development', undefined]) {
    assert.equal(run('https://www.dosalga.online/services', { ...enabled, VERCEL_ENV }).headers.get('x-middleware-next'), '1');
  }
});

test('the US store and preview hosts are never placed in maintenance', () => {
  for (const host of ['dosalga.store', 'www.dosalga.store', 'dosalga-git-dev-olivier-steineur.vercel.app', 'localhost:3000']) {
    assert.equal(run(`https://${host}/`, enabled).headers.get('x-middleware-next'), '1');
  }
});

test('maintenance can be disabled in production', () => {
  for (const MAINTENANCE of ['false', '0', '', undefined]) {
    assert.equal(run('https://www.dosalga.online/', { VERCEL_ENV: 'production', MAINTENANCE }).headers.get('x-middleware-next'), '1');
  }
});

test('the maintenance page, API and framework assets remain available', () => {
  for (const path of ['/maintenance', '/_next/static/app.js', '/static/logo.png', '/api/hello', '/favicon.ico']) {
    assert.equal(run(`https://www.dosalga.online${path}`, enabled).headers.get('x-middleware-next'), '1');
  }
});
