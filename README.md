# RDF Vocabulary

This library exposes utility functions and types to help working with RDF vocabulary terms.

```ts
import { createVocabulary } from 'rdf-vocabulary';

// Creates a vocabulary.
// The first parameter is the namespace, all the following parameters are terms in the namespace.
const FOAF = createVocabulary(
  'http://xmlns.com/foaf/0.1/',
  'Agent',
  'knows',
);

// Full term URIs are then accessible through the vocabulary object.
assert.equal(FOAF.knows, 'http://xmlns.com/foaf/0.1/knows');

// Through the `terms` field, the URIs are exposed as a NamedNode
assert.equal(FOAF.terms.knows.value, 'http://xmlns.com/foaf/0.1/knows');

// The namespace is accessible in the same way
assert.equal(FOAF.namespace, 'http://xmlns.com/foaf/0.1/');
assert.equal(FOAF.terms.namespace.value, 'http://xmlns.com/foaf/0.1/');

// New vocabularies can be created using existing vocabulary object
const FOAF_EXTENDED = extendVocabulary(FOAF, 'name', 'made');
assert.equal(FOAF_EXTENDED.name, 'http://xmlns.com/foaf/0.1/name');
assert.equal(FOAF_EXTENDED.knows, 'http://xmlns.com/foaf/0.1/knows');

// There are several utility types
const local: VocabularyLocal<typeof FOAF> = 'knows';
const value: VocabularyValue<typeof FOAF> = 'http://xmlns.com/foaf/0.1/knows';
const term: VocabularyTerm<typeof FOAF> = namedNode('http://xmlns.com/foaf/0.1/knows');
```
