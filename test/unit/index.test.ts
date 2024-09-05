import { createVocabulary, extendVocabulary } from '../../src/index';

describe('Vocabularies', (): void => {
  const vocabulary = createVocabulary('http://www.w3.org/ns/ldp#', 'contains', 'Container');

  describe('createVocabulary', (): void => {
    it('contains its own URI.', (): void => {
      expect(vocabulary.namespace).toBe('http://www.w3.org/ns/ldp#');
    });

    it('contains its own URI as a term.', (): void => {
      expect(vocabulary.terms.namespace.value).toBe('http://www.w3.org/ns/ldp#');
      expect(vocabulary.terms.namespace.equals(vocabulary.terms.namespace)).toBe(true);
    });

    it('exposes the defined URIs.', (): void => {
      expect(vocabulary.contains).toBe('http://www.w3.org/ns/ldp#contains');
      expect(vocabulary.Container).toBe('http://www.w3.org/ns/ldp#Container');
    });

    it('exposes the defined URIs as terms.', (): void => {
      expect(vocabulary.terms.contains.value).toBe('http://www.w3.org/ns/ldp#contains');
      expect(vocabulary.terms.Container.value).toBe('http://www.w3.org/ns/ldp#Container');
    });
  });

  describe('extendVocabulary', (): void => {
    const extended = extendVocabulary(vocabulary, 'extended', 'extra');

    it('still contains all the original values.', async(): Promise<void> => {
      expect(extended.namespace).toBe('http://www.w3.org/ns/ldp#');
      expect(extended.terms.namespace.value).toBe('http://www.w3.org/ns/ldp#');
      expect(extended.contains).toBe('http://www.w3.org/ns/ldp#contains');
      expect(extended.Container).toBe('http://www.w3.org/ns/ldp#Container');
      expect(extended.terms.contains.value).toBe('http://www.w3.org/ns/ldp#contains');
      expect(extended.terms.Container.value).toBe('http://www.w3.org/ns/ldp#Container');
    });

    it('contains the new values.', async(): Promise<void> => {
      expect(extended.extended).toBe('http://www.w3.org/ns/ldp#extended');
      expect(extended.extra).toBe('http://www.w3.org/ns/ldp#extra');
      expect(extended.terms.extended.value).toBe('http://www.w3.org/ns/ldp#extended');
      expect(extended.terms.extra.value).toBe('http://www.w3.org/ns/ldp#extra');
    });

    it('does not modify the original vocabulary.', async(): Promise<void> => {
      expect((vocabulary as any).extended).toBeUndefined();
    });
  });
});
