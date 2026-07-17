Photos of Vincent for the About page.

## Folders

- `athlete/` — you playing football and basketball. Feeds the "01 — The
  Athlete" scene.
- `behind-the-lens/` — behind-the-scenes shots of you shooting. Feeds the
  "02 — Behind the Lens" scene.
- `company/` — GameTimeSnaps (and any other) logo/brand assets. Feeds the
  "03 — GameTimeSnaps" scene.
- `future/` — Big Dog Media LLC content. Feeds the "04 — The Future"
  scene: `future-01/02.jpg` (photos), `future-01/02.mp4` (silent looping
  video tiles) with matching `-poster.jpg` frames.
- `01.jpg` (this folder, top level) — your portrait, part of the
  fly-through gallery at the top of the page.
- `pfp.jpg` (this folder, top level) — courtside portrait at the Illinois
  State Farm Center. In the fly-through gallery, and the go-to alternate
  profile shot anywhere the site needs one.

## Adding photos

1. Drop the image file in the matching folder above (JPG, ~900px wide is
   plenty — bigger files just slow the page down for no visible benefit at
   this size).
2. Tell me (or, if editing yourself: open `about.html` and swap the
   `<img src="...">` paths in that scene's `.scene-strip`, and/or open
   `gallery3d.js` and add the new file's path to the `about` array inside
   `IMAGE_SETS` near the top of the file) — e.g.:

   ```
   about: [
     'photos/about-me/01.jpg',
     'photos/about-me/athlete/football-01.jpg',   // <- new
   ]
   ```

That's it — no build step. The fly-through gallery at the top of the About
page cycles through whatever is listed in `IMAGE_SETS.about` — currently 10
photos spanning the athlete shots, behind-the-lens shots, and both portraits.
