# A cost-effective AGILE

> August 2022 **Work in progress**

## Background

Earlier this year [I got interested] in [a Stanford article] and [a Nature paper] that described a
device called an AGILE: an Axially Graded Index LEns. That's a complex bit of glass-like plastic
that resembles an upside-down truncated pyramid. I'll quickly summarise the papers:

The principle is pretty simple: the pyramid is made of a series of horizontal layers with increasing
refractive indices going deeper (towards the narrow end), and the sloped sides are coated with a
reflective material. Any light that enters the wide top of the device is curved towards the bottom
by the successive layers, and reflecting against the sides only increases the effect due to the
angle. In the end, all light that enters the top of the AGILE at any angle will exit at the bottom.

Due to the angle, the top surface is larger than the bottom, which means that light is effectively
concentrated. At a wild guess, if the top surface is four times the bottom, then the light will be
four time concentrated on average.

The AGILE also concentrates input light that arrives at any angle and curves it such that it
exits the lens at angles that are bound by the angles of the device.

These properties make AGILEs an attractive solution for increasing the cost-effectiveness of solar
panels: not only can the active surface (the part actually covered in photovoltaics) be reduced
compared to the solar panel's total surface, but the panel can operate at much wider input angles,
which is a well-known issue with solar installations, and it does so with a static and completely
passive device that doesn't require much overhead in terms of space.

[I got interested]: https://twitter.com/passcod/status/1548245821426401282
[a Stanford article]: https://news.stanford.edu/2022/06/27/new-optical-device-help-solar-arrays-focus-light-even-clouds/
[a Nature paper]: https://www.nature.com/articles/s41378-018-0015-4

## Building one

The paper describes how to build an AGILE:

1. Obtain a set of optical (i.e. extremely clear) resins that can be cured with UV and have a range
   of refractive indices (RI) when cured. Remember this bit.
2. Build a mould: a 3D printer does the trick here, plus some post-processing (sanding) to smooth
   the sides. The researchers seem to have directly built the negative, but it might be easier for
   repeatability and ease of demoulding to print the positive and make a silicon mould.
3. Pour a layer of the highest RI resin.
4. Cure it with a UV lamp.
5. Repeat 3–4 with decreasing RI resins.
6. Demould the pyramid, finish the edges.
7. Coat the angled sides with a reflective layer. It might be sufficient to spray paint a high
   concentration mixture of silver pigment powder and acrylic base, or a deposition process could be
   used with silver nitrate.

So, that's pretty simple, and it sounds doable in DIY, right?

Step one, obtain a set of optical resins, like, uhhh, [these ones][norland]. Wait, what's the price
of those? Uhhh $230 USD per pound, so about $500 USD per kilogram. And you'd need at least five, so
for a kg of each that will come to a shiny $2500 USD just to get started. I can't imagine we'd need
_less_ than about a kilo total per panel, given some maths that I'll leave to reader discretion, so
at a glance we're looking at a cool $500 USD per ~standard two square metre solar panel. Plus the
cost of the photovoltaics and frame and so on, but that's decently cheap, on the range of $100 USD.

So we're looking at a device that _at least quintuples_ the cost of a solar panel, just to get some
better utilisation in the mornings and evenings. Not very cost effective, _and_ prohibitive for DIY.

## Alternative materials

Can we find alternative materials that are much cheaper and would allow us to control their RI?
Well, solids are a no. Resins are it, and finding optical-grade resins with precise RIs... we're
back at square one. Glasses are a no-go. Diamond and other lattices or crystals are also exorbitant.

What about liquids? No, hear me out.

Glycerol (also called glycerine) is "[a colorless, odorless, viscous liquid that is sweet-tasting
and non-toxic][wiki:glycerol]." It's also miscible in water. And it has a RI of 1.46. Water, by the
by, has a RI of 1.33.

Mixing glycerol and water at varying ratios _changes the RI of the mixture_ in between these two
extremes. Further, adding a water-soluble compound, like sugar or salt, may _increase_ the RI, for
some fine tuning.

So, if we can create water-glycerol compounds at precise ratios, we can possibly get a set of
colorless odorless non-toxic liquids that have a range of RI, from 1.33 to 1.46.

We can then layer these liquids, partitioned by much thinner pieces of a strong plastic, like
acrylic which has a higher RI at 1.50, but the thickness difference should make that negligible. The
bottom of this new AGILE can then be a thicker bit of acrylic, for the final step at 1.50.

What's the cost of glycerol? [Less than $10 USD per kg][purenature]. Acrylic sheeting is about $20
USD per square metre depending on thickness and retailer. Water will need to be pure or distilled,
and that costs about $0.50 USD per litre.

Pro: we're looking at something about 40 times cheaper than with resins.

Con: it sounds absolutely bonkers.

[norland]: https://www.norlandproducts.com/adhchart.html
[wiki:glycerol]: https://en.wikipedia.org/wiki/Glycerol
[purenature]: https://www.purenature.co.nz/products/vegetable-glycerine-refined-palm-free?_pos=3&_sid=dc0f74cf3&_ss=r

## Preliminaries

We need to do a few things before we can actually get to the hands on bit:

### Build or obtain some kind of rig or tool to measure RI

// TODO

### Find some photovoltaic cells (not entire panels) and rig at least one to measure output current

Finding them is easy: AliExpress has a selection, and I picked [one][ali:pv].

[ali:pv]: https://www.aliexpress.com/item/4000511987311.html

// TODO

### Figure out what the optimal size of the device and the number, RIs, and thicknesses of the layers is

// TODO


