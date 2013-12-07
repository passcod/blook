---
tags:
	- entry
    - rust
    - pippo
parents:
	- 2013/dec/06/modern-systems-languages
---

Today I'm starting on **Pippo**, a DBMS I've spent the past 18 months thinking about. It started as a experimental thought on a NoSQL document store based on git, and has evolved to be both complex and beautifully simple at the same time.

I'm going to start by implementing the two lower level components: the block store and the object layer. The block store contains content-addressed, 16MiB (configurable) maximum, blocks of data. It uses xxHash by default, with a strategy to fall back to other hashes if collisions occur. The object layer contains documents ("objects") that have unique IDs (not content-addressed), and point to blocks that contain the actual data. Both the metadata (structure) and the data is in the block layer, resulting in very small sizes for the objects themselves.

The object layer is what users and other layers will access most often. The object layer is capable of handling incoming and outgoing streams, allowing one to write to an object without first knowing its length, without needing to cache it all beforehand. The object layer can only access and modify objects if you know its ID, listing all objects is used for **debug only**.