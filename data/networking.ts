import { IModule } from "@/types/app.types";
import { createModules } from "@/utils/networking";
import { IconNetwork } from "@tabler/icons-react";

export const NETWORKING_DATA: IModule[] = createModules([
  {
    slug: "module-01",
    title: "Module 01 - Networking Basics",
    description: "Learn the foundational concepts of computer networking.",
    docs: "/docs/networking/module-01",
    icon: IconNetwork,
    topics: [
      {
        slug: "what-is-computer-networking",
        title: "What is Computer Networking?",
        docs: "/what-is-computer-networking",
        description:
          "Learn what computer networking is, why it exists, how devices communicate, and why networks are the foundation of the modern Internet."
      },
      {
        slug: "types-of-networks",
        title: "Types of Computer Networks",
        docs: "/types-of-networks",
        description:
          "Explore PAN, LAN, MAN, and WAN, understand where each type is used, and compare their advantages and limitations."
      },
      {
        slug: "internet-vs-network",
        title: "Internet vs Computer Network",
        docs: "/internet-vs-network",
        description:
          "Understand the difference between a computer network and the Internet with practical real-world examples."
      },
      {
        slug: "how-the-internet-works",
        title: "How Does The Internet Work?",
        docs: "/how-the-internet-works",
        description:
          "Learn how the Internet works, what protocols are used, and how data is transmitted over the network."
      },
      {
        slug: "network-architectures",
        title: "Network Architectures (Client-Server vs Peer-to-Peer)",
        docs: "/network-architectures",
        description:
          "Learn the two primary network architectures—Client-Server and Peer-to-Peer—how they work, their advantages, disadvantages, and real-world use cases."
      },
      {
        slug: "host-vs-node",
        title: "Host vs Node",
        docs: "/host-vs-node",
        description:
          "Understand the difference between hosts and nodes and their roles within a computer network."
      },
      {
        slug: "network-interface-card",
        title: "Network Interface Card (NIC)",
        docs: "/network-interface-card",
        description:
          "Discover how a Network Interface Card enables devices to connect and communicate over a network."
      },
      {
        slug: "mac-address",
        title: "MAC Address",
        docs: "/mac-address",
        description:
          "Learn what a MAC address is, how it uniquely identifies network interfaces, and how it differs from an IP address."
      },
      {
        slug: "ip-address",
        title: "IP Address",
        docs: "/ip-address",
        description:
          "Understand IP addresses, their purpose, types, and how devices are identified on a network."
      }
      // {
      //   slug: "hub",
      //   title: "Hub",
      //   docs: "/hub",
      //   description:
      //     "Learn how a hub connects devices, broadcasts data, and why it has largely been replaced by switches."
      // },
      // {
      //   slug: "switch",
      //   title: "Switch",
      //   docs: "/switch",
      //   description:
      //     "Understand how switches intelligently forward data between devices using MAC addresses."
      // },
      // {
      //   slug: "router",
      //   title: "Router",
      //   docs: "/router",
      //   description:
      //     "Learn how routers connect different networks and direct data packets to their destinations."
      // },
      // {
      //   slug: "modem",
      //   title: "Modem",
      //   docs: "/modem",
      //   description:
      //     "Understand what a modem does, how it connects your home network to your ISP, and how it differs from a router."
      // },
      // {
      //   slug: "gateway",
      //   title: "Gateway",
      //   docs: "/gateway",
      //   description:
      //     "Learn what a gateway is and how it enables communication between different networks."
      // },
      // {
      //   slug: "firewall",
      //   title: "Firewall",
      //   docs: "/firewall",
      //   description:
      //     "Explore how firewalls monitor and control incoming and outgoing network traffic to improve security."
      // },
      // {
      //   slug: "network-topologies",
      //   title: "Network Topologies",
      //   docs: "/network-topologies",
      //   description:
      //     "Learn about Bus, Star, Ring, Mesh, Tree, and Hybrid topologies, along with their advantages and disadvantages."
      // },
      // {
      //   slug: "bandwidth",
      //   title: "Bandwidth",
      //   docs: "/bandwidth",
      //   description:
      //     "Understand bandwidth, how it affects network performance, and common misconceptions about Internet speed."
      // },
      // {
      //   slug: "latency",
      //   title: "Latency",
      //   docs: "/latency",
      //   description:
      //     "Learn what latency is, why it matters, and how it impacts real-time applications."
      // },
      // {
      //   slug: "throughput",
      //   title: "Throughput",
      //   docs: "/throughput",
      //   description:
      //     "Understand throughput and how it differs from bandwidth in measuring actual network performance."
      // },
      // {
      //   slug: "jitter",
      //   title: "Jitter",
      //   docs: "/jitter",
      //   description:
      //     "Learn what jitter is, what causes it, and why it affects voice and video communication."
      // },
      // {
      //   slug: "packet-loss",
      //   title: "Packet Loss",
      //   docs: "/packet-loss",
      //   description:
      //     "Discover what packet loss is, its causes, effects on network performance, and ways to reduce it."
      // }
    ]
  }
  // {
  //   slug: "module-02",
  //   title: "Module 02 - Network Topologies",
  //   description: "Learn the foundational concepts of computer networking.",
  //   docs: "/docs/networking/module-02",
  //   topics: [
  //     {
  //       slug: "what-is-computer-networkingg",
  //       title: "What is Computer Networking?",
  //       docs: "/what-is-computer-networking",
  //       description:
  //         "Learn what computer networking is, why it exists, how devices communicate, and why networks are the foundation of the modern Internet."
  //     },

  //   ]
  // }
]);

/**
 *
 * sadfas
 *
 *
 *
 *
 *
 *
 *
 */

// export const NETWORKING_DATA: IDocument[] = [
//   {
//     slug: "networking-basics",
//     title: "Module 01 - Networking Basics",
//     description: "Learn the foundational concepts of computer networking.",
//     docs: "/docs/networking/module-01",
//     children: [
//       {
//         module: 1,
//         order: 1,
//         slug: "what-is-computer-networking",
//         title: "What is Computer Networking?",
//         docs: "/what-is-computer-networking",
//         description:
//           "Learn what computer networking is, why it exists, how devices communicate, and why networks are the foundation of the modern Internet.",
//         keywords: [
//           "computer networking",
//           "networking basics",
//           "network fundamentals"
//         ]
//       },
//       {
//         slug: "why-computer-networks-exist",
//         title: "Why Computer Networks Exist",
//         description:
//           "Understand why computers need to communicate, share resources, and exchange information efficiently across networks.",
//         docs: "/why-computer-networks-exist"
//       },
//       {
//         slug: "types-of-networks",
//         title: "Types of Computer Networks",
//         description:
//           "Explore PAN, LAN, MAN, and WAN, understand where each type is used, and compare their advantages and limitations.",
//         docs: "types-of-networks.mdx"
//       },

//       {
//         slug: "internet-vs-network",
//         title: "Internet vs Computer Network",
//         description:
//           "Understand the difference between a computer network and the Internet with practical real-world examples.",
//         docs: "internet-vs-network.mdx"
//       },

//       {
//         slug: "client-and-server",
//         title: "Client and Server",
//         description:
//           "Learn how clients and servers communicate and why this model powers almost every modern application.",
//         docs: "client-and-server.mdx"
//       },

//       {
//         slug: "host",
//         title: "Host",
//         description:
//           "Understand what a host is, how hosts communicate, and their role in computer networking.",
//         docs: "host.mdx"
//       },

//       {
//         slug: "node",
//         title: "Node",
//         description:
//           "Learn what a network node is and how different devices become nodes within a network.",
//         docs: "node.mdx"
//       },

//       {
//         slug: "network-interface-card",
//         title: "Network Interface Card (NIC)",
//         description:
//           "Explore how a Network Interface Card enables communication between a computer and a network.",
//         docs: "network-interface-card.mdx"
//       },

//       {
//         slug: "mac-address",
//         title: "MAC Address",
//         description:
//           "Learn what a MAC address is, why every network device has one, and how it is used in local communication.",
//         docs: "mac-address.mdx"
//       },

//       {
//         slug: "ip-address",
//         title: "IP Address",
//         description:
//           "Understand IP addresses, how devices are identified on networks, and the difference between IPv4 and IPv6.",
//         docs: "ip-address.mdx"
//       },

//       {
//         slug: "hub",
//         title: "Hub",
//         description:
//           "Learn how hubs work, why they are rarely used today, and how they differ from switches.",
//         docs: "hub.mdx"
//       },

//       {
//         slug: "switch",
//         title: "Switch",
//         description:
//           "Understand how switches forward data efficiently using MAC addresses and improve local network performance.",
//         docs: "switch.mdx"
//       },

//       {
//         slug: "router",
//         title: "Router",
//         description:
//           "Learn how routers connect different networks and direct packets across the Internet.",
//         docs: "router.mdx"
//       },

//       {
//         slug: "modem",
//         title: "Modem",
//         description:
//           "Understand how a modem connects your home network to your Internet Service Provider (ISP).",
//         docs: "modem.mdx"
//       },

//       {
//         slug: "gateway",
//         title: "Gateway",
//         description:
//           "Learn what a gateway is, why it is called the network's exit point, and how it enables communication between different networks.",
//         docs: "gateway.mdx"
//       },

//       {
//         slug: "firewall",
//         title: "Firewall",
//         description:
//           "Explore how firewalls protect networks by monitoring and filtering incoming and outgoing traffic.",
//         docs: "firewall.mdx"
//       },

//       {
//         slug: "bandwidth",
//         title: "Bandwidth",
//         description:
//           "Understand bandwidth, how it affects network capacity, and why it is often confused with Internet speed.",
//         docs: "bandwidth.mdx"
//       },

//       {
//         slug: "latency",
//         title: "Latency",
//         description:
//           "Learn what latency is, why low latency matters, and how it impacts real-time communication.",
//         docs: "latency.mdx"
//       },

//       {
//         slug: "throughput",
//         title: "Throughput",
//         description:
//           "Understand throughput and why the actual data transferred is often lower than the available bandwidth.",
//         docs: "throughput.mdx"
//       },

//       {
//         slug: "jitter",
//         title: "Jitter",
//         description:
//           "Learn how inconsistent packet arrival times affect voice calls, gaming, and video streaming.",
//         docs: "jitter.mdx"
//       },

//       {
//         slug: "packet-loss",
//         title: "Packet Loss",
//         description:
//           "Understand packet loss, its common causes, and how it impacts network reliability and performance.",
//         docs: "packet-loss.mdx"
//       }
//     ]
//   }
// ];
