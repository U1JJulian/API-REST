// tests/suma.test.js

import test from 'node:test';
import assert from 'node:assert';
import { suma } from '../src/suma.js';

test('Debe sumar dos números', () => {
  assert.strictEqual(suma(2, 3), 5);
});

test('Debe sumar números negativos', () => {
  assert.strictEqual(suma(-4, -6), -10);
});

test('Debe sumar mezclas de positivos y negativos', () => {
  assert.strictEqual(suma(10, -3), 7);
});
