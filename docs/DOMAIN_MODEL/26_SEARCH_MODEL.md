# Search Model

Search is a read model spanning authorized domains. SearchQuery carries tenant/workspace, text, entity types, filters, sort, cursor, and limit. SearchResult contains reference, label, summary, score, and highlights.

Index documents are projections of published events. Authorization filters precede result delivery. Index lag, locale-aware analysis, phonetic matching, geospatial queries, synonyms, facets, and semantic/vector search are configurable capabilities. Search never becomes the source of truth.
