# Lah Kara

> October 2021

## Pitch

A RISC-V mini-ITX immersion-cooled Linux workstation.

### Compute

- [SiFive Unmatched](https://www.sifive.com/boards/hifive-unmatched): 4+1 RISC-V cores at 1.5GHz,
  16GB RAM, in Mini-ITX form factor.
- Intel AX-200 Wifi 6 / Bluetooth 5 adapter.
- 1TB NVMe M.2 SSD. I've got a double-sided high performance one from a previous build, and if it's
  not compatible I'll get something like a Samsung 970 Evo.
- RX 570 4GB graphics. The goal here is not high perfomance (not a gaming rig), but something that
  can handle a few screens and only need a PCIe Gen 3 interface.

### Cooling

- Wide-gap slant-fin heat sinks to replace the OEM fin array (PCIe chip) and fan (CPU).
- Extension cabling for USB and Ethernet.
- I'm undecided whether I'll strip the fans off the graphics card and attempt to immerse it, or if
  I'll get a riser/extension to bring it outside.

#### Immersion fluid (oil)

Requirements:

- Boiling and smoke points above 120C
- Liquid at room temperature
- Long shelf life (doesn't go rancid quickly)

Nice to haves:

- Fairly clear or transparent (for aesthetics)
- Edible / non-toxic
- Doesn't stink!

The "long shelf life" requirement basically reduces the possibility set to:

- Mineral oil (petroleum, colorless, odorless, non-edible, but not touch-toxic, quite cheap)
- [Ben oil](https://en.wikipedia.org/wiki/Ben_oil) (golden, edible, fairly soft smell, 200C smoke
  point, very expensive)

So as much as I'd love having a veggie oil computer I'll probably go with mineral.

### Case

I'm thinking of making a custom acrylic/copper/solid wood box that would be roughly the size of a
classic mini-ITX case. A copper side would be the thermal interface, and it could be sealed to make
it portable and safe from spills (not permanently glued, with a rubber seal or something), so it
can sit on the topside of the desk looking all cool!

- Base: solid wood (Macrocarpa)
- Glass: 3mm acrylic. This puts a further thermal restriction as it will melt at 80°C
- Haven't decided for the back. If I can find a large extruded alu heat sink like plate, that would be ideal, but otherwise will probably reuse and machine some existing computer case steel

### Power

[NJ450-SXL from Silverstone](https://www.silverstonetek.com/product.php?pid=797). This is a small form factor fanless modular 450W. Selecting factors:

- 450W is more than enough, I could do with 300. But a detailed review of this one shows it's most efficient at 50% load, which should be my average load on this system. That works out nicely.
- It's fanless, but not only that, it's the only PSU I found which was completely enclosed without a grate. It's not waterproof or anything, I'm not gonna go stick it in oil, but it looks really good, certainly good enough to sit outside the case
- It's modular, which will help integrate it into the case design, and will certainly make for a clean look given I only need the 24-pin and one 6+2 pci feed.

### Naming

I name all my devices in a Star Wars theme. Workstations (desktop, laptops) after minor characters,
phones and tablets after vehicles, and IoT / utility devices (vacuum, printer, routers, various SBC
things, etc) after droids. My wifi network is named after a star system. I'm a nerd, sue me.

Lah Kara is from the new Visions series.

### OS

Either FreeBSD or Ubuntu (or both?).

#### FreeBSD

Tier 2 platform support, many packages fail to build.

- <https://wiki.freebsd.org/riscv#Current_Status>
- <https://wiki.freebsd.org/riscv/ports>
- <https://wiki.freebsd.org/riscv/HiFiveUnmatched>

#### Ubuntu

Unknown support but they have images and repos.

- <https://wiki.ubuntu.com/RISC-V>

## Media

- <https://twitter.com/passcod/status/1444140533299834882>

## Outcome

Abandoned. Parts reused in other projects.
