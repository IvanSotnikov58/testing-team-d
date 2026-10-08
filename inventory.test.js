const { restock, pick, findDuplicateSkus } = require('./inventory');

// ---- Functional tests (etapp 1a) ----
test('REQ-01 restock adds quantity to existing sku', () => {
  const stock = { 'A-1': 5 };
  expect(restock(stock, [{ sku: 'A-1', qty: 3 }])).toEqual({ 'A-1': 8 });
});

// functional 2
test('REQ-02 restock returns a NEW object, the original remains unchanged', () => {
  const stock = { 'A-1': 5 };
  const result = restock(stock, [{ sku: 'A-1', qty: 3 }]);
  expect(result).not.toBe(stock);
  expect(stock).toEqual({ 'A-1': 5 });
});

// functional 3
test('REQ-03 restock  rqty must be a positive integer, otherwise error (qty=1)', () => { 
  const stock = { 'A-1': 5 };
  const result = restock(stock, [{ sku: 'A-1', qty: 1 }]); 
  expect(result).toEqual({ 'A-1': 6 }); });

  // functional 4
test('REQ-03 restock  qty must be a positive integer, otherwise error (qty=0)', () => { 
  const stock = { 'A-1': 5 }; 
  expect(() => { restock(stock, [{ sku: 'A-1', qty: 0 }]);
  }).toThrow(); 
});

  // functional 5
test('REQ-03 restock  rqty must be a positive integer, otherwise error (qty=2.5)', () => { 
  const stock = { 'A-1': 5 }; 
  expect(() => { restock(stock, [{ sku: 'A-1', qty: 2.5 }]);
  }).toThrow(); 
});

  // functional 6
test('REQ-03 restock  qty must be a positive integer, otherwise error (qty=-1)', () => { 
  const stock = { 'A-1': 5 }; 
  expect(() => { restock(stock, [{ sku: 'A-1', qty: -1 }]);
  }).toThrow(); 
});

// functional 7
test('REQ-04 pick returns a new object, original unchanged', () => {
  const stock = { 'A-1': 5 };
  pick(stock, 'A-1', 2);
  expect(stock['A-1']).toBe(5);
});

// functional 8
test('REQ-05 findDuplicateSkus  returns skus that occur more than once, each one time', () => { 
  const items = [ 
    { sku: 'A-1' }, 
    { sku: 'B-1' }, 
    { sku: 'A-1' }, 
    { sku: 'C-1' }, 
    { sku: 'B-1' } ]; 
    expect(findDuplicateSkus(items)).toEqual(['A-1', 'B-1']); 
});

// functional 9
test('REQ-04 pick throws error "unknown sku"', () => {
  const stock = { 'A-1': 5 };
  expect(() => { pick(stock, 'B-1', 2);
  }).toThrow('unknown sku');
});

// functional 10
test('REQ-04 pick throws error "not enough stock"', () => {
  const stock = { 'A-1': 5 };
  expect(() => { pick(stock, 'A-1', 6);
  }).toThrow('not enough stock');
});

// functional 11
test('REQ-01 restock adds new sku', () => {
  const stock = { 'A-1': 5 };
  const result = restock(stock, [{ sku: 'B-1', qty: 3 }]);
  expect(result).toEqual({
    'A-1': 5,
    'B-1': 3
  });
});
// ---- Performance test (etapp 1b) ----
// TODO: generate 20 000 items with some duplicates, measure findDuplicateSkus,
// assert it finishes under 100 ms. See project guide chapter 3.2.

// performance
test('REQ-06 findDuplicateSkus handles 20 000 items under 100 ms', () => {
  const items = [];
  for (let i = 0; i < 20000; i++) items.push({ sku: 'SKU-' + (i % 19000) });
  const t0 = performance.now();
  findDuplicateSkus(items);
  const ms = performance.now() - t0;
  expect(ms).toBeLessThan(100);
});

// ---- Security and reliability tests (etapp 1c) ----
// TODO: REQ-07 with test.each, REQ-08 original stock unchanged after a failed restock.

// security
test.each([
  ['<script>alert(1)</script>', 'HTML injection'],
  ['A'.repeat(21), 'too long'],
  ['SKU 1', 'space'],
  [123, 'not a string'],
  ['', 'empty'],
  ["'; DROP TABLE stock; --", 'SQL injection'],
])('REQ-07 rejects sku %j (%s)', (sku) => {
  expect(() => restock({}, [{ sku, qty: 1 }])).toThrow();
});

// reliability
test('REQ-08 failed restock leaves original stock unchanged', () => {
  const stock = { 'A-1': 5 };
  expect(() => restock(stock, [{ sku: 'A-1', qty: 1 }, { sku: 'B-2', qty: 0 }])).toThrow();
  expect(stock['A-1']).toBe(5);
});


//npx jest inventory
