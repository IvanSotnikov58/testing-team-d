# Test Case Specification – inventory.js
 
| ID | Requirement | Type | Priority | Precondition | Input | Expected result | Test name in code |
|---|---|---|---|---|---|---|---|
| TC-01 | REQ-01 | functional | High | stock = { 'A-1': 5 } | restock with [{ sku: 'A-1', qty: 3 }] | { 'A-1': 8 } | REQ-01 restock adds quantity to existing sku |
| TC-02 | REQ-02 | functional | High | stock = { 'A-1': 5 } | restock, then read stock | stock['A-1'] still 5 | REQ-02 restock tagastab UUE objekti, originaal ei muutu |
| TC-03 | REQ-03 | functional | High | stock = { 'A-1': 5 } | restock(stock, [{ sku: 'A-1', qty: 1 }] | { 'A-1': 6 } | REQ-03 restock  qty peab olema positiivne täisarv, muidu viga (qty=1) |
| TC-04 | REQ-04 | functional | High | stock = { 'A-1': 5 } | (stock, 'A-1', 2) | (stock['A-1']).toBe(5) | REQ-04 pick returns a new object, original unchanged |
| TC-05 | REQ-05 | functional | High | Üksused sisaldavad korduvaid SKU-sid | { sku: 'A-1' }, { sku: 'B-1' }, { sku: 'A-1' }, { sku: 'C-1' }, { sku: 'B-1' } | 'A-1', 'B-1' | REQ-05 findDuplicateSkus  tagastab sku-d, mis esinevad rohkem kui üks kord, iga üks kord |
| TC-06 | REQ-06 | performance | Mid | 20 000 items, 1 000 duplicates | findDuplicateSkus | < 100 ms |REQ-06 findDuplicateSkus handles 20 000 items under 100 ms|
| TC-07 | REQ-07 | security | High | Tühi laoseis | Kehtetud SKU väärtused test.each abil | Iga juhtum tekitab vea. | REQ-07 rejects sku %j (%s) |
| TC-08 | REQ-08 | reliability | High | stock = { 'A-1': 5 } | Varude täiendamine ebaõnnestus: A-1 qty 1, B-2 qty 0 | Throws viga | REQ-08 failed restock leaves original stock unchanged |

