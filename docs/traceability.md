# Traceability Matrix – inventory.js

| Requirement | Type | Test cases | Test names in code | Status |
|---|---|---|---|---|
| REQ-01 | functional | TC-01, TC-11 | REQ-01 restock adds quantity to existing sku; REQ-01 restock adds new sku | PASS |
| REQ-02 | functional | TC-02 | REQ-02 restock tagastab UUE objekti, originaal ei muutu | PASS |
| REQ-03 | functional | TC-03 | REQ-03 restock qty peab olema positiivne täisarv, muidu viga (qty=1)| PASS |
| REQ-04 | functional | TC-04 | REQ-04 pick returns a new object, original unchanged | PASS |
| REQ-05 | functional | TC-05 | REQ-05 findDuplicateSkus tagastab sku-d, mis esinevad rohkem kui üks kord, iga üks kord | PASS |
| REQ-06 | performance | TC-06 | REQ-06 findDuplicateSkus handles 20 000 items under 100 ms | PASS |
| REQ-07 | security | TC-07 | REQ-07 rejects sku %j (%s) | PASS |
| REQ-08 | reliability | TC-08 | REQ-08 failed restock leaves original stock unchanged | PASS |

Katmata nõuded: puuduvad.

Kõigile nõuetele vastab vähemalt üks testjuhtum.
Kõik testid läbitakse edukalt.
Jõudlusnõue: funktsioon `findDuplicateSkus` töötleb 20 000 kirjet vähem kui 100 millisekundiga.
