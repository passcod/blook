---
title: Adapting GNOME Classic
frontpage: false
tags:
  - entry
  - gnome
  - desktop
  - linux
---

The Gnome Shell has a nice little extension called "Classic Mode", available on Arch
in the `gnome-shell-extensions` package in __[extra]__. It should be installed already.
It's easily accessible by changing the session in GDM.

I like how it's basically the same as the normal Shell, but with a Mint-like Applications
menu and a Places menu, as well as the grey popups instead of the normal black ones. What
I don't like is the ugly bottom panel and the grey of both panels. Fortunately, this is
easy to change.

First, let's have a look at what's under the hood:

```
$ pacman -Ql gnome-shell-extensions | ag classic

gnome-shell-extensions /usr/share/applications/gnome-shell-classic.desktop
gnome-shell-extensions /usr/share/glib-2.0/schemas/org.gnome.shell.extensions.classic-overrides.gschema.xml
gnome-shell-extensions /usr/share/gnome-session/sessions/gnome-classic.session
gnome-shell-extensions /usr/share/gnome-shell/extensions/window-list@gnome-shell-extensions.gcampax.github.com/classic.css
gnome-shell-extensions /usr/share/gnome-shell/modes/classic.json
gnome-shell-extensions /usr/share/gnome-shell/theme/classic-process-working.svg
gnome-shell-extensions /usr/share/gnome-shell/theme/classic-toggle-off-intl.svg
gnome-shell-extensions /usr/share/gnome-shell/theme/classic-toggle-off-us.svg
gnome-shell-extensions /usr/share/gnome-shell/theme/classic-toggle-on-intl.svg
gnome-shell-extensions /usr/share/gnome-shell/theme/classic-toggle-on-us.svg
gnome-shell-extensions /usr/share/gnome-shell/theme/gnome-classic.css
gnome-shell-extensions /usr/share/xsessions/gnome-classic.desktop
```

After a quick inspection, the ones we're interested in are `gnome-classic.css` and
`.../modes/classic.json`. The former defines the style changes, some of which I want
to change or revert, and the latter defines some layout changes, like the date moving
to the right instead of the center, and the bottom bar showing up.

Let's do the bulk of the work first, in `classic.json`:

``` diff
diff --git a/original/classic.json b/usr/share/gnome-shell/modes/classic.json
index 031d42f..5df9a51 100644
--- a/original/classic.json
+++ b/usr/share/gnome-shell/modes/classic.json
@@ -2,9 +2,9 @@
     "parentMode": "user",
     "stylesheetName": "gnome-classic.css",
     "overridesSchema": "org.gnome.shell.extensions.classic-overrides",
     "enabledExtensions": [ "apps-menu@gnome-shell-extensions.gcampax.github.com",
                            "places-menu@gnome-shell-extensions.gcampax.github.com",
                            "alternate-tab@gnome-shell-extensions.gcampax.github.com",
                            "launch-new-instance@gnome-shell-extensions.gcampax.github.com",
-                           "window-list@gnome-shell-extensions.gcampax.github.com"
                          ],
     "panel": { "left": ["activities", "appMenu"],
+               "center": ["dateMenu"],
+               "right": ["a11y", "keyboard", "aggregateMenu"]
-               "center": [],
-               "right": ["a11y", "keyboard", "dateMenu", "aggregateMenu"]
              }
 }
```

The `panel` object only concerns the top panel. The bottom panel is trickier: it's actually
defined by the `window-list` extension, *which is enabled here but does __not__ appear as such
in the Tweak Tool*. Quite confusing.

Then, the styles in `gnome-classic.css`:

``` diff
diff --git a/original/gnome-classic.css b/usr/share/gnome-shell/theme/gnome-classic.css
index a6f2cd2..601dc5f 100644
--- a/original/gnome-classic.css
+++ b/usr/share/gnome-shell/theme/gnome-classic.css
@@ -6,16 +6,15 @@
 */

 #panel {
-    background-color: #e9e9e9 !important;
+    background-color: #000 !important;
     background-gradient-direction: vertical;
-    background-gradient-end: #d0d0d0;
-    border-top-color: #666; /* we don't support non-uniform border-colors and
+    background-gradient-end: #2d2d2d;
+    border-top-color: #2d2d2d; /* we don't support non-uniform border-colors and
                                use the top border color for any border, so we
                                need to set it even if all we want is a bottom
                                border */
-    border-bottom: 1px solid #666;
+    border-bottom: 1px solid #2d2d2d;
     app-icon-bottom-clip: 0px;
+    color: white !important;

 /* hrm, still no multipoint gradients
     background-image: linear-gradient(left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0)) !important;*/
@@ -51,7 +50,7 @@
 }

 .panel-button {
-    color: #555 !important;
+    color: #ccc !important;
     -natural-hpadding: 6px !important;
     -minimum-hpadding: 3px !important;
   }
@@ -63,7 +62,7 @@
   }
                                                                                                                                      [0/1880]
   .panel-button:hover {
-    color: #000 !important;
+/*    color: #000 !important; */
   }

   #panel:overview .panel-button:hover,
@@ -85,7 +84,7 @@
   .panel-button:active,
   .panel-button:overview,
   .panel-button:focus {
-     background-color: #4a90d9 !important; /* FIXME */
+     background-color: #333 !important; /* FIXME */
      color: #fff !important;
      border: none !important;
      border-image: none !important;
@@ -107,7 +106,7 @@
   }

 .label-shadow {
-    color: rgba(255,255,255,.5) !important;
+    color: rgba(255,255,255,0) !important;
 }
   .panel-button:active .label-shadow,
   .panel-button:focus .label-shadow {
@@ -227,7 +226,7 @@

 .system-menu-action {
     color: #e6e6e6;
-    border: 1px solid #ddd; /* using rgba() is flaky unfortunately */
+    border: 1px solid #666; /* using rgba() is flaky unfortunately */
 }

 .system-menu-action:hover,
```

There's a bunch of changes there. The `#panel` ones define the background of the panel.
I have it set in a gradient that matches (in reverse) exactly the [Numix] window theme,
to create a seamless look on maximised windows (I use the terminal and firefox each
maximised in their own workspace), while not looking too shaby on its own.

Then there's the `.panel-button` changes. This is about the actual buttons on the top panel.
Make the text lighter to be readable, change the hover styles, easy-peasy. The `.label-shadow`
one is because the shadow below the app name was making it unreadable. The `.system-menu-action`…
I have no idea what this does actually. I might just revert that.

Finally, I had to open up the Tweak Tool to change the Workspace back to Dynamic. Done!

[![A preview of my current desktop](http://i.imgur.com/9K0N7M0.png)](http://i.imgur.com/9K0N7M0.png)

[Numix]: http://numixproject.org/
