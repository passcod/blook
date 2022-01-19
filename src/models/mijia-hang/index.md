# Mijia Hang

- Material: PLA
- Print time: 4-5 hours
- Raft/supports: no

This is a two-piece bird-cage-shaped hanging enclosure that I designed to house
a [Xiaomi / Mijia Temperature + Humidity sensor](https://www.getdget.com.au/xiaomi-mijia-bluetooth-thermometer-hydrometer-2-smart-lcd-digital-display-temperature-humidity-sensor.html).
The sensor costs $10-$20 depending where you get it from, can easily be flashed
with custom firmware, is powered from a single 2032, and is trivial to hook up
to Home Assistant.

However, it's an indoors device. I wanted to measure outdoor temperature for
comparison, so I made this box which can be hung under eaves or from a hook
(preferably somewhere shaded, but works okay with sun exposure too). The bottom
can be removed by rotating it until it aligns with the slots; that provides
access so the battery can be changed easily.

The sides of the case is pierced with 31 holes, which are angled so rain cannot
penetrate. They are arranged in three rows, of 7, 11, and 13 holes. This is one
of my favourite pattern tricks: because the amount of holes are prime numbers,
the overall pattern doesn't repeat or align: it would take the _product_ of the
three numbers, 1001 intervals, to see a repeat or alignment.

- [STL model](./mijia-hang.stl)
- [GCode for the Ender 6, 0.2mm layers](./mijia-hang-E6-PLA-02mm.gcode)
