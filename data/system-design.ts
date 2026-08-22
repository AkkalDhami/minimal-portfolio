// import { IPlaybook } from "@/types/app.types";

import { IModule } from "@/types/app.types";
import { createModules } from "@/utils/networking";
import {
  IconLayoutGrid,
  IconNetwork,
  IconApi,
  IconRouter,
  IconDatabase,
  IconBolt,
  IconServer,
  IconMessage,
  IconScale,
  IconSearch,
  IconBroadcast,
  IconShieldCheck,
  IconChartLine,
  IconApps,
  IconLock,
  IconCloud,
  IconTrendingUp,
  IconGauge,
  IconWorld,
  IconPuzzle,
  IconBuildingSkyscraper,
  IconArrowsExchange
} from "@tabler/icons-react";

// const SYSTEM_DESIGN_URL = "/docs/system-design";

// export const SYSTEM_DESIGN_DATA = [
//   {
//     slug: "getting-started",
//     title: "Getting Started",
//     description:
//       "Get started with system design by learning the basics of system design.",
//     docs: `${SYSTEM_DESIGN_URL}/getting-started`
//   },
//   {
//     slug: "magic-of-dns",
//     title: "The Magic of DNS - How Does The Internet Work?",
//     description:
//       "DNS internals, resolution flow, and internet fundamentals from a system design perspective, with interview questions.",
//     docs: `${SYSTEM_DESIGN_URL}/magic-of-dns`
//   },
//   {
//     slug: "load-balancing",
//     title: "Load Balancing - Distributing Traffic the Right Way",
//     description:
//       "How load balancers sit between users and servers, the algorithms they use, L4 vs L7, health checks, sticky sessions, and the trade-offs that come up in real systems.",
//     docs: `${SYSTEM_DESIGN_URL}/load-balancing`
//   }
// ] satisfies IPlaybook[];

export const SYSTEM_DESIGN_DATA: IModule[] = createModules([
  {
    slug: "module-01",
    title: "Module 01 - System Design Fundamentals",
    description:
      "Learn how to translate requirements into system boundaries, guarantees, and trade-offs.",
    docs: "/docs/system-design/module-01",
    icon: IconLayoutGrid,
    topics: [
      {
        slug: "what-is-system-design",
        title: "What System Design Actually Is",
        docs: "/what-is-system-design",
        description:
          "Understand how to translate a fuzzy business requirement into a system with defined boundaries, guarantees, and trade-offs, not just a list of technologies."
      },
      {
        slug: "magic-of-dns",
        title: "The Magic of DNS - How Does The Internet Work?",
        description:
          "DNS internals, resolution flow, and internet fundamentals from a system design perspective, with interview questions.",
        docs: `/magic-of-dns`
      },
      {
        slug: "functional-vs-nonfunctional-requirements",
        title: "Functional vs Non-Functional Requirements",
        docs: "/functional-vs-nonfunctional-requirements",
        description:
          "Learn how to separate what a system must do from how well it must do it, and why both shape the final architecture."
      },
      {
        slug: "load-balancing",
        title: "Load Balancing - Distributing Traffic the Right Way",
        description:
          "How load balancers sit between users and servers, the algorithms they use, L4 vs L7, health checks, sticky sessions, and the trade-offs that come up in real systems.",
        docs: `/load-balancing`
      }
      // {
      //   slug: "capacity-estimation",
      //   title: "Capacity Estimation & Back-of-Envelope Math",
      //   docs: "/capacity-estimation",
      //   description:
      //     "Learn to estimate QPS, storage growth, and bandwidth from user counts so you can decide between one server and a thousand."
      // },
      // {
      //   slug: "latency-budgeting",
      //   title: "Latency Budgeting",
      //   docs: "/latency-budgeting",
      //   description:
      //     "Understand how to allocate a total latency budget across network hops, cache, and database calls, using p50/p95/p99 targets."
      // },
      // {
      //   slug: "client-server-model",
      //   title: "Client-Server Model",
      //   docs: "/client-server-model",
      //   description:
      //     "Learn the fundamental request-response relationship between clients and servers that underlies almost every system."
      // },
      // {
      //   slug: "monolith-vs-distributed-system",
      //   title: "Monolith vs Distributed System",
      //   docs: "/monolith-vs-distributed-system",
      //   description:
      //     "Compare single-deployable monoliths with distributed systems and understand when each is the right starting point."
      // },
      // {
      //   slug: "trade-off-driven-design",
      //   title: "Trade-off Driven Decision-Making",
      //   docs: "/trade-off-driven-design",
      //   description:
      //     "Understand why every architectural choice trades something for something else, and how to articulate those trade-offs clearly."
      // }
    ]
  }
  /*
  {
    slug: "module-02",
    title: "Module 02 - Networking & Internet Architecture",
    description:
      "Learn how requests travel across the network and how the edge speeds them up.",
    docs: "/docs/system-design/module-02",
    icon: IconNetwork,
    topics: [
      {
        slug: "osi-tcp-ip-model",
        title: "OSI & TCP/IP Layers",
        docs: "/osi-tcp-ip-model",
        description:
          "Understand how data is layered and transmitted from application to physical wire, and why this model underlies all networking."
      },
      {
        slug: "dns-resolution",
        title: "DNS Resolution",
        docs: "/dns-resolution",
        description:
          "Learn how a domain name is resolved into an IP address before any request can reach a server."
      },
      {
        slug: "tcp-vs-udp",
        title: "TCP vs UDP",
        docs: "/tcp-vs-udp",
        description:
          "Compare reliable, ordered TCP delivery with lightweight, connectionless UDP, and when to choose each."
      },
      {
        slug: "http-1-2-3",
        title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)",
        docs: "/http-1-2-3",
        description:
          "Learn how each HTTP generation changed connection handling and latency, and why QUIC matters for modern apps."
      },
      {
        slug: "websockets-and-sse",
        title: "WebSockets, Long Polling & Server-Sent Events",
        docs: "/websockets-and-sse",
        description:
          "Compare real-time delivery mechanisms and understand their trade-offs in connection overhead and latency."
      },
      {
        slug: "grpc-basics",
        title: "gRPC over HTTP/2",
        docs: "/grpc-basics",
        description:
          "Learn how gRPC uses HTTP/2 and protocol buffers for efficient, strongly-typed service-to-service communication."
      },
      {
        slug: "tls-handshake-and-pki",
        title: "TLS Handshake & PKI",
        docs: "/tls-handshake-and-pki",
        description:
          "Understand how encryption and identity verification happen over an untrusted network, including certificates and mTLS."
      },
      {
        slug: "cdn-architecture",
        title: "CDN & Edge Architecture",
        docs: "/cdn-architecture",
        description:
          "Learn how content delivery networks cache and serve data from edge locations to cut latency and origin load."
      },
      {
        slug: "edge-compute",
        title: "Edge Compute & Anycast Routing",
        docs: "/edge-compute",
        description:
          "Understand how compute pushed to the edge and anycast routing reduce global latency without re-architecting the backend."
      }
    ]
  },
  {
    slug: "module-03",
    title: "Module 03 - API & Service Design",
    description:
      "Learn how to design contracts between services that stay stable as systems evolve.",
    docs: "/docs/system-design/module-03",
    icon: IconApi,
    topics: [
      {
        slug: "api-design-paradigms",
        title: "REST vs RPC vs GraphQL",
        docs: "/api-design-paradigms",
        description:
          "Compare API interaction models and learn to choose the right one for the consumer and use case."
      },
      {
        slug: "api-versioning",
        title: "API Versioning & Backward Compatibility",
        docs: "/api-versioning",
        description:
          "Learn how to evolve an API contract without breaking existing consumers, using additive changes and deprecation policies."
      },
      {
        slug: "idempotency",
        title: "Idempotency & Safe Retries",
        docs: "/idempotency",
        description:
          "Understand how to design operations so repeating them has no unintended side effect, using idempotency keys and dedup tables."
      },
      {
        slug: "rate-limiting-algorithms",
        title: "Rate Limiting (Token Bucket, Sliding Window)",
        docs: "/rate-limiting-algorithms",
        description:
          "Learn the major rate-limiting algorithms and how to enforce fair usage and protect services from overload."
      },
      {
        slug: "api-gateways",
        title: "API Gateways & BFF Pattern",
        docs: "/api-gateways",
        description:
          "Understand how gateways centralize auth, routing, and throttling, and when a Backend-for-Frontend layer helps."
      }
    ]
  },
  {
    slug: "module-04",
    title: "Module 04 - Load Balancing & Traffic Management",
    description:
      "Learn how traffic is distributed and how failures are contained before they cascade.",
    docs: "/docs/system-design/module-04",
    icon: IconRouter,
    topics: [
      {
        slug: "load-balancing-fundamentals",
        title: "Load Balancing Fundamentals",
        docs: "/load-balancing-fundamentals",
        description:
          "Learn how L4 and L7 load balancers distribute traffic using round robin, least connections, and consistent hashing."
      },
      {
        slug: "health-checks-and-sticky-sessions",
        title: "Health Checks & Sticky Sessions",
        docs: "/health-checks-and-sticky-sessions",
        description:
          "Understand how load balancers detect unhealthy instances and route session-affine traffic correctly."
      },
      {
        slug: "global-traffic-management",
        title: "Global Traffic Management (GeoDNS, Anycast)",
        docs: "/global-traffic-management",
        description:
          "Learn how systems route users to the nearest healthy region using GeoDNS, anycast, and multi-region failover."
      },
      {
        slug: "circuit-breakers",
        title: "Circuit Breakers",
        docs: "/circuit-breakers",
        description:
          "Learn how circuit breakers stop calling a failing downstream service to prevent cascading failure."
      },
      {
        slug: "retries-and-backoff",
        title: "Retries with Exponential Backoff & Jitter",
        docs: "/retries-and-backoff",
        description:
          "Understand how to retry failed requests safely without overwhelming a recovering service."
      },
      {
        slug: "bulkheads-and-timeouts",
        title: "Bulkheads, Timeouts & Graceful Degradation",
        docs: "/bulkheads-and-timeouts",
        description:
          "Learn how to isolate failures and degrade gracefully instead of failing the entire request."
      },
      {
        slug: "backpressure-and-load-shedding",
        title: "Backpressure & Load Shedding",
        docs: "/backpressure-and-load-shedding",
        description:
          "Understand how systems protect themselves by slowing producers down or shedding excess load under pressure."
      }
    ]
  },
  {
    slug: "module-05",
    title: "Module 05 - Databases & Data Modeling",
    description:
      "Learn how to model, replicate, and partition data for real-world access patterns.",
    docs: "/docs/system-design/module-05",
    icon: IconDatabase,
    topics: [
      {
        slug: "relational-vs-nonrelational-modeling",
        title: "Relational vs Non-Relational Modeling",
        docs: "/relational-vs-nonrelational-modeling",
        description:
          "Learn to choose schema shape based on access patterns, comparing SQL with document, key-value, wide-column, and graph stores."
      },
      {
        slug: "normalization-and-denormalization",
        title: "Normalization & Denormalization",
        docs: "/normalization-and-denormalization",
        description:
          "Understand the trade-offs between normalized schemas and denormalized schemas optimized for read performance."
      },
      {
        slug: "database-internals-btree-lsm",
        title: "Database Internals: B-Trees vs LSM-Trees",
        docs: "/database-internals-btree-lsm",
        description:
          "Learn how storage engines organize data on disk, and why this explains the strengths of different databases."
      },
      {
        slug: "write-ahead-log-and-mvcc",
        title: "Write-Ahead Log (WAL) & MVCC",
        docs: "/write-ahead-log-and-mvcc",
        description:
          "Understand how databases guarantee durability with a WAL and handle concurrent access with multi-version concurrency control."
      },
      {
        slug: "indexing-strategies",
        title: "Indexing Strategies",
        docs: "/indexing-strategies",
        description:
          "Learn how primary, secondary, and covering indexes speed up queries, and their write-side costs."
      },
      {
        slug: "database-replication",
        title: "Database Replication",
        docs: "/database-replication",
        description:
          "Learn how leader-follower, multi-leader, and leaderless replication copy data for availability and read scaling."
      },
      {
        slug: "partitioning-and-sharding",
        title: "Partitioning & Sharding",
        docs: "/partitioning-and-sharding",
        description:
          "Understand how to split data across nodes using range, hash, and consistent-hash partitioning to scale writes."
      },
      {
        slug: "hot-partitions",
        title: "Hot Partitions & Resharding",
        docs: "/hot-partitions",
        description:
          "Learn why uneven key distribution creates hot partitions, and how resharding fixes it without downtime."
      },
      {
        slug: "schema-migration",
        title: "Data Migration & Schema Evolution",
        docs: "/schema-migration",
        description:
          "Learn how to change schema and storage in a live system with zero downtime, using expand-contract migrations."
      }
    ]
  },
  {
    slug: "module-06",
    title: "Module 06 - Caching",
    description:
      "Learn how caching trades staleness for latency, from a single node to a distributed cluster.",
    docs: "/docs/system-design/module-06",
    icon: IconBolt,
    topics: [
      {
        slug: "caching-fundamentals",
        title: "Caching Fundamentals",
        docs: "/caching-fundamentals",
        description:
          "Learn cache-aside, write-through, and write-back strategies, and how they trade staleness for latency."
      },
      {
        slug: "cache-eviction-policies",
        title: "Cache Eviction Policies (LRU, LFU, ARC)",
        docs: "/cache-eviction-policies",
        description:
          "Understand how caches decide what to keep when full, and how eviction policy choice affects hit rate."
      },
      {
        slug: "cache-stampede",
        title: "Cache Stampede & Thundering Herd",
        docs: "/cache-stampede",
        description:
          "Learn why simultaneous cache misses can overwhelm a database, and how to prevent it."
      },
      {
        slug: "cache-consistency",
        title: "Cache Consistency & Invalidation",
        docs: "/cache-consistency",
        description:
          "Understand how to keep a cache and its source of truth in sync using invalidation and TTL-based staleness tolerance."
      },
      {
        slug: "distributed-caching",
        title: "Distributed Caching",
        docs: "/distributed-caching",
        description:
          "Learn how to scale caching beyond one machine using partitioned caches and consistent hashing across nodes."
      },
      {
        slug: "redis-as-implementation",
        title: "Redis & Memcached as Implementations",
        docs: "/redis-as-implementation",
        description:
          "See how Redis and Memcached implement the caching concepts above in a production-ready system."
      }
    ]
  },
  {
    slug: "module-07",
    title: "Module 07 - Distributed Systems Foundations",
    description:
      "Learn why distributed systems are hard, and how nodes agree despite failure.",
    docs: "/docs/system-design/module-07",
    icon: IconServer,
    topics: [
      {
        slug: "why-distributed-systems-are-hard",
        title: "Why Distributed Systems Are Hard",
        docs: "/why-distributed-systems-are-hard",
        description:
          "Understand partial failure, unreliable networks, and the lack of a shared clock or shared memory."
      },
      {
        slug: "logical-clocks",
        title: "Logical & Vector Clocks",
        docs: "/logical-clocks",
        description:
          "Learn how systems establish a notion of event ordering without a synchronized physical clock."
      },
      {
        slug: "consensus-paxos-raft",
        title: "Consensus: Paxos & Raft",
        docs: "/consensus-paxos-raft",
        description:
          "Learn how multiple nodes agree on a single value despite failures, using Raft's leader election and log replication."
      },
      {
        slug: "quorum-reads-writes",
        title: "Quorum Reads & Writes",
        docs: "/quorum-reads-writes",
        description:
          "Understand how quorum-based reads and writes trade consistency for availability in replicated systems."
      },
      {
        slug: "leader-election",
        title: "Leader Election & Coordination Services",
        docs: "/leader-election",
        description:
          "Learn how systems pick a single coordinator among peers and handle its failure using services like ZooKeeper or etcd."
      },
      {
        slug: "gossip-protocols",
        title: "Gossip Protocols & Failure Detection",
        docs: "/gossip-protocols",
        description:
          "Understand how state and health propagate across a cluster without a central coordinator."
      }
    ]
  },
  {
    slug: "module-08",
    title: "Module 08 - Messaging & Event-Driven Architecture",
    description:
      "Learn how systems decouple producers and consumers and process events reliably.",
    docs: "/docs/system-design/module-08",
    icon: IconMessage,
    topics: [
      {
        slug: "messaging-fundamentals",
        title: "Messaging Fundamentals",
        docs: "/messaging-fundamentals",
        description:
          "Learn how queues and pub/sub topics decouple producers and consumers for independent scaling."
      },
      {
        slug: "delivery-semantics",
        title: "Delivery Semantics (At-Least-Once vs Exactly-Once)",
        docs: "/delivery-semantics",
        description:
          "Understand the guarantees a messaging system actually gives, and why exactly-once is so hard to achieve."
      },
      {
        slug: "message-ordering",
        title: "Message Ordering & Partitioning",
        docs: "/message-ordering",
        description:
          "Learn how partitioning affects ordering guarantees, and how to design for order-sensitive consumers."
      },
      {
        slug: "consumer-groups-and-backpressure",
        title: "Consumer Groups & Backpressure",
        docs: "/consumer-groups-and-backpressure",
        description:
          "Understand how consumer groups scale processing, and how backpressure prevents slow consumers from causing failure."
      },
      {
        slug: "dead-letter-queues",
        title: "Dead-Letter Queues & Poison Messages",
        docs: "/dead-letter-queues",
        description:
          "Learn how systems isolate messages that repeatedly fail processing instead of blocking the whole pipeline."
      },
      {
        slug: "kafka-internals",
        title: "Kafka Internals",
        docs: "/kafka-internals",
        description:
          "Learn how Kafka implements partitions, replication, offsets, and in-sync replicas as a log-based broker."
      },
      {
        slug: "change-data-capture",
        title: "Change Data Capture (CDC)",
        docs: "/change-data-capture",
        description:
          "Understand how CDC captures database changes as a stream of events for downstream consumers."
      },
      {
        slug: "event-sourcing-cqrs",
        title: "Event Sourcing & CQRS",
        docs: "/event-sourcing-cqrs",
        description:
          "Learn how storing state as a sequence of events and separating reads from writes powers audit trails and scale."
      }
    ]
  },
  {
    slug: "module-09",
    title: "Module 09 - Consistency & Availability",
    description:
      "Learn the theoretical guardrails that frame every distributed data trade-off.",
    docs: "/docs/system-design/module-09",
    icon: IconScale,
    topics: [
      {
        slug: "cap-theorem",
        title: "CAP Theorem",
        docs: "/cap-theorem",
        description:
          "Learn why a system must choose consistency or availability under a network partition, and common misreadings of CAP."
      },
      {
        slug: "pacelc",
        title: "PACELC",
        docs: "/pacelc",
        description:
          "Understand how PACELC extends CAP to describe latency-consistency trade-offs even without a partition."
      },
      {
        slug: "consistency-models",
        title: "Consistency Models",
        docs: "/consistency-models",
        description:
          "Learn the spectrum from strong to eventual consistency, including causal and read-your-writes guarantees."
      },
      {
        slug: "quorum-and-replication-consistency",
        title: "Quorum & Replication Consistency",
        docs: "/quorum-and-replication-consistency",
        description:
          "Understand how tuning N/W/R quorum values lets you dial consistency per-operation rather than system-wide."
      },
      {
        slug: "read-repair-and-anti-entropy",
        title: "Read Repair & Anti-Entropy (Merkle Trees)",
        docs: "/read-repair-and-anti-entropy",
        description:
          "Learn how replicas reconcile differences in the background using read repair, hinted handoff, and Merkle trees."
      }
    ]
  },
  {
    slug: "module-10",
    title: "Module 10 - Distributed Transactions",
    description:
      "Learn how systems keep multi-node writes correct without blocking everything.",
    docs: "/docs/system-design/module-10",
    icon: IconArrowsExchange,
    topics: [
      {
        slug: "transaction-fundamentals",
        title: "Transaction Fundamentals (ACID)",
        docs: "/transaction-fundamentals",
        description:
          "Learn atomicity, consistency, isolation, and durability, and why these guarantees are hard across nodes."
      },
      {
        slug: "isolation-levels",
        title: "Isolation Levels",
        docs: "/isolation-levels",
        description:
          "Understand read committed, repeatable read, and serializable isolation, and the anomalies each one prevents."
      },
      {
        slug: "two-phase-commit",
        title: "Two-Phase & Three-Phase Commit",
        docs: "/two-phase-commit",
        description:
          "Learn how coordinator-based protocols achieve atomic commits across nodes, and why they can block on failure."
      },
      {
        slug: "saga-pattern",
        title: "Saga Pattern",
        docs: "/saga-pattern",
        description:
          "Learn how sagas achieve eventual atomicity through local transactions and compensations, without locking resources."
      },
      {
        slug: "distributed-locks",
        title: "Distributed Locks",
        docs: "/distributed-locks",
        description:
          "Understand how to ensure mutual exclusion across nodes using consensus stores, leases, and fencing tokens."
      }
    ]
  },
  {
    slug: "module-11",
    title: "Module 11 - Storage Systems",
    description:
      "Learn the storage abstractions behind files, blobs, and billion-scale lookups.",
    docs: "/docs/system-design/module-11",
    icon: IconCloud,
    topics: [
      {
        slug: "object-block-file-storage",
        title: "Object, Block & File Storage",
        docs: "/object-block-file-storage",
        description:
          "Compare storage abstractions and learn which access pattern each one is built for."
      },
      {
        slug: "distributed-file-systems",
        title: "Distributed File Systems (HDFS/GFS)",
        docs: "/distributed-file-systems",
        description:
          "Learn how distributed file systems replicate and serve large files across many machines."
      },
      {
        slug: "erasure-coding",
        title: "Erasure Coding vs Replication",
        docs: "/erasure-coding",
        description:
          "Understand how erasure coding achieves durability with less storage overhead than full replication."
      },
      {
        slug: "chunked-blob-storage",
        title: "Chunked & Content-Addressable Storage",
        docs: "/chunked-blob-storage",
        description:
          "Learn how large files are split into chunks for parallel upload, resumability, and deduplication."
      },
      {
        slug: "bloom-filters",
        title: "Bloom Filters",
        docs: "/bloom-filters",
        description:
          "Learn how Bloom filters test set membership with massive space savings at the cost of false positives."
      },
      {
        slug: "hyperloglog-count-min-sketch",
        title: "HyperLogLog & Count-Min Sketch",
        docs: "/hyperloglog-count-min-sketch",
        description:
          "Understand how probabilistic structures estimate cardinality and frequency at billion-scale."
      },
      {
        slug: "merkle-trees",
        title: "Merkle Trees",
        docs: "/merkle-trees",
        description:
          "Learn how Merkle trees efficiently detect data differences between replicas without comparing everything."
      }
    ]
  },
  {
    slug: "module-12",
    title: "Module 12 - Search Systems",
    description:
      "Learn how text, attributes, and embeddings become efficiently queryable.",
    docs: "/docs/system-design/module-12",
    icon: IconSearch,
    topics: [
      {
        slug: "inverted-index",
        title: "Inverted Index & Ranking (TF-IDF, BM25)",
        docs: "/inverted-index",
        description:
          "Learn how inverted indexes and ranking algorithms make text efficiently searchable beyond simple DB queries."
      },
      {
        slug: "distributed-search-architecture",
        title: "Distributed Search Architecture",
        docs: "/distributed-search-architecture",
        description:
          "Learn how a search index is sharded and replicated across nodes, with scatter-gather query fan-out."
      },
      {
        slug: "near-real-time-indexing",
        title: "Near Real-Time Indexing",
        docs: "/near-real-time-indexing",
        description:
          "Understand how search systems make newly written data searchable within seconds."
      },
      {
        slug: "vector-and-semantic-search",
        title: "Vector & Semantic Search",
        docs: "/vector-and-semantic-search",
        description:
          "Learn how embeddings and approximate nearest neighbor algorithms power similarity and semantic search."
      }
    ]
  },
  {
    slug: "module-13",
    title: "Module 13 - Real-Time Systems",
    description:
      "Learn how systems push updates to millions of concurrently connected users.",
    docs: "/docs/system-design/module-13",
    icon: IconBroadcast,
    topics: [
      {
        slug: "real-time-delivery-models",
        title: "Real-Time Delivery Models",
        docs: "/real-time-delivery-models",
        description:
          "Compare polling, long polling, WebSockets, and push notifications for delivering real-time updates."
      },
      {
        slug: "presence-and-connection-management",
        title: "Presence & Connection Management",
        docs: "/presence-and-connection-management",
        description:
          "Learn how systems track who is online and route messages to the right server at massive connection scale."
      },
      {
        slug: "fan-out-strategies",
        title: "Fan-Out on Write vs Fan-Out on Read",
        docs: "/fan-out-strategies",
        description:
          "Understand the trade-offs of pushing updates to followers immediately versus computing them on read."
      },
      {
        slug: "operational-transformation-crdts",
        title: "Operational Transformation & CRDTs",
        docs: "/operational-transformation-crdts",
        description:
          "Learn how real-time collaborative apps merge concurrent edits from multiple users without conflict."
      }
    ]
  },
  {
    slug: "module-14",
    title: "Module 14 - Reliability & Fault Tolerance",
    description: "Learn how systems detect, contain, and recover from failure.",
    docs: "/docs/system-design/module-14",
    icon: IconShieldCheck,
    topics: [
      {
        slug: "failure-modes",
        title: "Failure Modes (SPOF, Cascading Failures, Noisy Neighbors)",
        docs: "/failure-modes",
        description:
          "Learn how individual and cascading failures actually happen, from single points of failure to noisy neighbors."
      },
      {
        slug: "redundancy-and-failover",
        title: "Redundancy & Automated Failover",
        docs: "/redundancy-and-failover",
        description:
          "Understand how active-active and active-passive redundancy eliminate single points of failure."
      },
      {
        slug: "slo-sli-sla",
        title: "SLO, SLI & SLA",
        docs: "/slo-sli-sla",
        description:
          "Learn how to quantify and contract reliability using service level indicators, objectives, and agreements."
      },
      {
        slug: "error-budgets",
        title: "Error Budgets",
        docs: "/error-budgets",
        description:
          "Understand how error budgets balance release velocity against reliability targets."
      },
      {
        slug: "disaster-recovery",
        title: "Disaster Recovery (RPO/RTO)",
        docs: "/disaster-recovery",
        description:
          "Learn how systems plan to survive the loss of an entire region, using backup strategies and recovery targets."
      },
      {
        slug: "chaos-engineering",
        title: "Chaos Engineering",
        docs: "/chaos-engineering",
        description:
          "Learn how proactively injecting failure validates that your resilience design actually works."
      }
    ]
  },
  {
    slug: "module-15",
    title: "Module 15 - Observability",
    description: "Learn how to see inside a running distributed system.",
    docs: "/docs/system-design/module-15",
    icon: IconChartLine,
    topics: [
      {
        slug: "metrics-and-monitoring",
        title: "Metrics & Monitoring",
        docs: "/metrics-and-monitoring",
        description:
          "Learn how time-series metrics, dashboards, and alerting give quantitative signals of system health."
      },
      {
        slug: "structured-logging",
        title: "Structured Logging & Aggregation",
        docs: "/structured-logging",
        description:
          "Understand how centralized, structured logs become the primary tool for root-causing incidents."
      },
      {
        slug: "distributed-tracing",
        title: "Distributed Tracing",
        docs: "/distributed-tracing",
        description:
          "Learn how to follow a single request across many services to find where latency or errors originate."
      }
    ]
  },
  {
    slug: "module-16",
    title: "Module 16 - Microservices",
    description:
      "Learn how to split systems along the right boundaries and keep data consistent across them.",
    docs: "/docs/system-design/module-16",
    icon: IconApps,
    topics: [
      {
        slug: "service-decomposition",
        title: "Service Decomposition & Bounded Contexts",
        docs: "/service-decomposition",
        description:
          "Learn how to split a system along the right boundaries using domain-driven design's bounded contexts."
      },
      {
        slug: "strangler-fig-pattern",
        title: "Monolith-to-Microservices Migration",
        docs: "/strangler-fig-pattern",
        description:
          "Understand how the strangler fig pattern incrementally migrates a monolith to microservices."
      },
      {
        slug: "service-discovery",
        title: "Service Discovery & Service Mesh",
        docs: "/service-discovery",
        description:
          "Learn how services find and communicate with each other reliably as the fleet grows past a handful of instances."
      },
      {
        slug: "data-ownership-across-services",
        title: "Data Ownership & Consistency Across Services",
        docs: "/data-ownership-across-services",
        description:
          "Understand how to avoid shared-database anti-patterns while keeping data consistent enough across services."
      }
    ]
  },
  {
    slug: "module-17",
    title: "Module 17 - Security",
    description:
      "Learn how to protect identity, data, and the system itself from abuse.",
    docs: "/docs/system-design/module-17",
    icon: IconLock,
    topics: [
      {
        slug: "authentication-vs-authorization",
        title: "Authentication vs Authorization",
        docs: "/authentication-vs-authorization",
        description:
          "Understand the difference between verifying identity and verifying permission, and how sessions and tokens implement each."
      },
      {
        slug: "oauth2-oidc",
        title: "OAuth2 & OIDC",
        docs: "/oauth2-oidc",
        description:
          "Learn how modern authorization delegation and identity protocols work, including JWTs and their pitfalls."
      },
      {
        slug: "rbac-abac",
        title: "RBAC & ABAC",
        docs: "/rbac-abac",
        description:
          "Compare role-based and attribute-based access control models for enforcing permissions."
      },
      {
        slug: "encryption-and-key-management",
        title: "Encryption at Rest/Transit & Key Management",
        docs: "/encryption-and-key-management",
        description:
          "Learn how systems protect data at rest and in transit, and how key management services keep secrets safe."
      },
      {
        slug: "ddos-mitigation",
        title: "DDoS Mitigation & Abuse Prevention",
        docs: "/ddos-mitigation",
        description:
          "Understand how systems defend against abuse and denial-of-service traffic at the edge and API layer."
      }
    ]
  },
  {
    slug: "module-18",
    title: "Module 18 - Cloud & Infrastructure",
    description:
      "Learn how workloads are deployed, scaled, and isolated in modern cloud infrastructure.",
    docs: "/docs/system-design/module-18",
    icon: IconCloud,
    topics: [
      {
        slug: "compute-models",
        title: "VMs vs Containers vs Serverless",
        docs: "/compute-models",
        description:
          "Compare execution models and understand how each affects cost, cold-start latency, and operational overhead."
      },
      {
        slug: "autoscaling",
        title: "Autoscaling",
        docs: "/autoscaling",
        description:
          "Learn how systems automatically add or remove capacity in response to load."
      },
      {
        slug: "infrastructure-as-code",
        title: "Infrastructure as Code",
        docs: "/infrastructure-as-code",
        description:
          "Understand how declarative infrastructure definitions make environments reproducible and auditable."
      },
      {
        slug: "deployment-strategies",
        title: "Blue-Green & Canary Deployments",
        docs: "/deployment-strategies",
        description:
          "Learn how to roll out changes safely using blue-green deployments, canary releases, and feature flags."
      },
      {
        slug: "zero-downtime-deployment",
        title: "Zero-Downtime Deployment",
        docs: "/zero-downtime-deployment",
        description:
          "Understand the techniques that let production systems deploy changes without interrupting traffic."
      },
      {
        slug: "multi-tenancy",
        title: "Multi-Tenancy & Isolation",
        docs: "/multi-tenancy",
        description:
          "Learn how to share infrastructure across tenants without data leakage or noisy-neighbor performance issues."
      }
    ]
  },
  {
    slug: "module-19",
    title: "Module 19 - Scalability",
    description:
      "Learn the fundamental levers for scaling reads, writes, and compute.",
    docs: "/docs/system-design/module-19",
    icon: IconTrendingUp,
    topics: [
      {
        slug: "horizontal-vs-vertical-scaling",
        title: "Horizontal vs Vertical Scaling",
        docs: "/horizontal-vs-vertical-scaling",
        description:
          "Learn the two axes of scaling, their limits, and why statelessness enables horizontal scale."
      },
      {
        slug: "bottleneck-identification",
        title: "Bottleneck Identification",
        docs: "/bottleneck-identification",
        description:
          "Learn how to find the actual constraint in a system, whether it's CPU, I/O, network, or lock contention."
      },
      {
        slug: "scaling-reads-vs-writes",
        title: "Scaling Reads vs Writes",
        docs: "/scaling-reads-vs-writes",
        description:
          "Understand why read-scaling and write-scaling require almost entirely different toolkits."
      }
    ]
  },
  {
    slug: "module-20",
    title: "Module 20 - Performance Engineering",
    description:
      "Learn to optimize for latency, throughput, and resource efficiency.",
    docs: "/docs/system-design/module-20",
    icon: IconGauge,
    topics: [
      {
        slug: "latency-vs-throughput",
        title: "Latency vs Throughput Optimization",
        docs: "/latency-vs-throughput",
        description:
          "Learn why optimizing latency and throughput are often in tension, and how batching and pipelining trade one for the other."
      },
      {
        slug: "connection-pooling",
        title: "Connection Pooling & Async I/O",
        docs: "/connection-pooling",
        description:
          "Understand how connection pooling and asynchronous I/O reduce overhead under high concurrency."
      },
      {
        slug: "resource-level-tuning",
        title: "Resource-Level Tuning (GC Pauses, CPU vs I/O Bound)",
        docs: "/resource-level-tuning",
        description:
          "Learn where time and memory actually go inside a service, and how to profile before optimizing."
      }
    ]
  },
  {
    slug: "module-21",
    title: "Module 21 - Advanced Distributed Systems",
    description:
      "Learn the advanced coordination techniques behind globally consistent systems.",
    docs: "/docs/system-design/module-21",
    icon: IconWorld,
    topics: [
      {
        slug: "time-and-ordering-at-scale",
        title: "Time & Ordering at Scale (TrueTime, HLC)",
        docs: "/time-and-ordering-at-scale",
        description:
          "Learn how globally distributed databases establish a consistent notion of time without a shared clock."
      },
      {
        slug: "distributed-job-scheduling",
        title: "Distributed Job Scheduling",
        docs: "/distributed-job-scheduling",
        description:
          "Understand how systems coordinate thousands of nodes and jobs reliably using leader-follower assignment."
      },
      {
        slug: "multi-region-architecture",
        title: "Multi-Region Architecture",
        docs: "/multi-region-architecture",
        description:
          "Learn how to design systems that operate correctly and performantly across multiple geographic regions."
      }
    ]
  },
  {
    slug: "module-22",
    title: "Module 22 - System Design Patterns",
    description:
      "Learn the reusable vocabulary for structuring, syncing, and hardening distributed systems.",
    docs: "/docs/system-design/module-22",
    icon: IconPuzzle,
    topics: [
      {
        slug: "structural-patterns",
        title: "Structural Patterns (API Gateway, Sidecar, Strangler Fig)",
        docs: "/structural-patterns",
        description:
          "Learn reusable structural patterns for composing services and communicating design intent quickly."
      },
      {
        slug: "data-patterns",
        title: "Data Patterns (CQRS, Outbox, Saga)",
        docs: "/data-patterns",
        description:
          "Learn reusable patterns for keeping data in sync across services, including the transactional outbox pattern."
      },
      {
        slug: "resilience-patterns",
        title: "Resilience Patterns (Circuit Breaker, Bulkhead, Fallback)",
        docs: "/resilience-patterns",
        description:
          "Consolidate the standard vocabulary for surviving failure that reviewers expect in production designs."
      }
    ]
  },
  {
    slug: "module-23",
    title: "Module 23 - Real-World Case Studies",
    description:
      "Study how major companies applied these concepts to solve problems at massive scale.",
    docs: "/docs/system-design/module-23",
    icon: IconBuildingSkyscraper,
    topics: [
      {
        slug: "case-study-url-shortener",
        title: "Case Study: URL Shortener at Scale",
        docs: "/case-study-url-shortener",
        description:
          "Study hashing, key generation, and caching decisions behind large-scale URL shortening services."
      },
      {
        slug: "case-study-news-feed",
        title: "Case Study: News Feed Generation",
        docs: "/case-study-news-feed",
        description:
          "Study fan-out and ranking trade-offs behind Facebook and Twitter-style feed generation."
      },
      {
        slug: "case-study-uber-dispatch",
        title: "Case Study: Uber's Dispatch System",
        docs: "/case-study-uber-dispatch",
        description:
          "Study geospatial indexing and real-time matching behind Uber's rider-driver dispatch system."
      },
      {
        slug: "case-study-netflix-streaming",
        title: "Case Study: Netflix's Streaming Architecture",
        docs: "/case-study-netflix-streaming",
        description:
          "Study the CDN, multi-region, and chaos engineering decisions behind Netflix's streaming platform."
      },
      {
        slug: "case-study-whatsapp-messaging",
        title: "Case Study: WhatsApp at Billions of Messages",
        docs: "/case-study-whatsapp-messaging",
        description:
          "Study connection management and delivery guarantees behind billion-user messaging scale."
      },
      {
        slug: "case-study-google-spanner",
        title: "Case Study: Google Spanner",
        docs: "/case-study-google-spanner",
        description:
          "Study how TrueTime and distributed consensus deliver global strong consistency in Spanner."
      },
      {
        slug: "case-study-amazon-dynamo",
        title: "Case Study: Amazon Dynamo",
        docs: "/case-study-amazon-dynamo",
        description:
          "Study the quorum, consistent hashing, and vector clock design that defined leaderless replication."
      },
      {
        slug: "case-study-kafka-linkedin",
        title: "Case Study: Kafka at LinkedIn",
        docs: "/case-study-kafka-linkedin",
        description:
          "Study the log-based architecture, partitioning, and replication behind Kafka's origin at LinkedIn."
      }
    ]
  }
  */
]);
