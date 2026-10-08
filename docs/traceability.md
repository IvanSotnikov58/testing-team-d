# Traceability Matrix – inventory.js

| Requirement | Type | Test cases | Test names in code | Status |
|---|---|---|---|---|
| REQ-01 | functional | TC-01, TC-11 | REQ-01 restock adds quantity to existing sku; REQ-01 restock adds new sku | PASS |
| REQ-02 | functional | TC-02 | REQ-02 returns a NEW object, the original remains unchanged | PASS |
| REQ-03 | functional | TC-03 | REQ-03 restock qty must be a positive integer, otherwise error (qty=1)| PASS |
| REQ-04 | functional | TC-04 | REQ-04 pick returns a new object, original unchanged | PASS |
| REQ-05 | functional | TC-05 | REQ-05 findDuplicateSkus returns skus that occur more than once, each one time | PASS |
| REQ-06 | performance | TC-06 | REQ-06 findDuplicateSkus handles 20 000 items under 100 ms | PASS |
| REQ-07 | security | TC-07 | REQ-07 rejects sku %j (%s) | PASS |
| REQ-08 | reliability | TC-08 | REQ-08 failed restock leaves original stock unchanged | PASS |

Unmet requirements: None.
