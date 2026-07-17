Photos for the homepage (`index.html`) scene strips.

## Folders

- `game-days/` — photos for the "01 — Game Days" scene strip
  (`gameday-01`…`gameday-04.jpg`, wired into `index.html`). Portraits show
  first (positions 1–2, the only two visible on mobile); landscapes fill 3–4.
- `media-days/` — photos for the "02 — Media Days" scene strip
  (`mediaday-01`…`mediaday-04.jpg`, wired into `index.html`).
- `video-covers/` — the 2 horizontal covers for the "03 — Video" scene strip
  (`video-cover-01.jpg`, `video-cover-02.jpg`, wired into `index.html`).

## Adding photos

1. Drop the image file(s) in the matching folder above (JPG, ~1000-1600px
   wide is plenty — for `game-days/` and `media-days/` portrait/vertical
   works best since the frames are tall; for `video-covers/` keep them
   landscape/horizontal to match the 16:9 layout).
2. Tell me and I'll optimize them and swap the `<img src="...">` paths in
   that scene's `.scene-strip` inside `index.html`.

That's it — no build step.
