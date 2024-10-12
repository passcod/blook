# Splash

> 2018

## Pitch

A reimplementation of the RF propagation model “ITM”.

Taking the original Fortran source and notes and memos etc and translating that in Rust, then
re-referencing everything to the documents, changing all function and variable names to things that
are legible and make sense, and adding lots of high-quality inline documentation. The end goal being
to have a safe implementation that can be read entirely standalone to understand what the algorithm
is doing.

The secondary goal is to reimplement a subset of what the SPLAT! RF program does but more modern,
e.g. taking in GDAL data as terrain input, outputting things in a more standard format, supporting
arbitrary topography resolutions rather than hardcoding only two modes, and being parallelisable.

## Media

- <https://twitter.com/passcod/status/1173065130159984640>
- <https://twitter.com/passcod/status/1176449556130590720>

## Outcome

Partial code is here: <https://github.com/passcod/splash>

Unlikely to pick this up again.
