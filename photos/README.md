Photo upload folders for the portfolio site:

- hero/ : main hero image and featured image area
- work/ : preview images used on the homepage "Selected Work" cards
- about/ : any supporting images used in the About section
- video/<video-slug>/ : one subfolder per video project, each holding that video's cover.jpg thumbnail
- gallery/media-days/ : legacy flat folder, holds the one original media day photo (kept in the Media Day 1 section)
- media-day/1/ through media-day/10/ : one folder per Media Day section on media-day.html (see below)
- 1/ through 12/ : raw photo storage — all 52 photos currently in these folders are wired into game-photos.html

## game-photos.html: full-bleed collage

game-photos.html has no page title and no section headings — it's a single continuous edge-to-edge
photo collage (tight grid, zooms slightly on hover). Every photo has a title that appears in the
bottom-left corner on hover, based on which folder it came from:

- photos/1/ → Girls Track State Championship 2026
- photos/2/ → Girls Track Conference Championship 2026
- photos/3/ → Wrestling State Championship 2026
- photos/4/ → Baseball 2026
- photos/5/ → Men's Lacrosse 2026 (_GTS3307, _GTS3538) or Men's Tennis 2026 (_GTS3446, _GTS3473)
- photos/6/ → Baseball 2026
- photos/7/ → Women's Basketball Super Sectional 2026
- photos/8/ → (empty)
- photos/9/ → Women's Basketball Sectional Championship 2026
- photos/10/ → Baseball 2025
- photos/11/ → Baseball 2025
- photos/12/ → Women's Basketball 2025

All photos render in one flowing grid regardless of which folder they're stored in — folders 1–12
are just for organizing raw files on disk, not for splitting up the page. The display order trends
from folder 1 at the top to folder 12 at the bottom, but is shuffled locally so photos from the same
folder are never placed next to each other.

### Adding a photo to the collage

1. Drop the image file into whichever numbered folder matches its event, e.g. photos/4/photo-01.jpg.
2. Open game-photos.html and find the `<div class="collage">` block.
3. Copy-paste this snippet inside it (anywhere — position in the HTML determines position in the grid), using the title for that folder from the list above:

```html
<a class="collage-item" href="photos/4/photo-01.jpg" target="_blank" rel="noreferrer">
  <img src="photos/4/photo-01.jpg" alt="Baseball 2026" />
  <span class="collage-caption">Baseball 2026</span>
</a>
```

The grid automatically fits any number of photos, in any mix of portrait/landscape/square orientations.

## media-day.html: full-bleed collage, shuffled (same as game-photos.html)

media-day.html now works exactly like game-photos.html — no page subtitle, no section headings, just
a single "Media Days." title and one continuous full-bleed color photo grid (no grayscale filter),
with photos from all 10 folders shuffled together (a soft low-to-high trend by folder number, but no
two photos from the same folder ever sit next to each other). Every photo has a title that appears in
the bottom-left corner on hover, based on which folder it came from:

- photos/media-day/1/ → Softball 2026
- photos/media-day/2/ → Men's Basketball 2026
- photos/media-day/3/ → Wrestling 2026
- photos/media-day/4/ → Women's Basketball 2026
- photos/media-day/5/ → Football 2026
- photos/media-day/6/ → Football 2026
- photos/media-day/7/ → Men's Soccer 2026
- photos/media-day/8/ → Baseball 2025
- photos/media-day/9/ → Men's Basketball 2025
- photos/media-day/10/ → Football 2025

The original single legacy photo (photos/work/work-2.jpg, Boys Baseball Media Day 2025) was removed
since it didn't belong to any of the 10 folders.

### Adding a photo

1. Drop the image file into the matching folder, e.g. photos/media-day/3/photo-01.jpg.
2. Open media-day.html and find the `<div class="collage">` block.
3. Copy-paste this snippet inside it (anywhere — position in the HTML determines position in the grid), using the title for that folder from the list above:

```html
<a class="collage-item" href="photos/media-day/3/photo-01.jpg" target="_blank" rel="noreferrer">
  <img src="photos/media-day/3/photo-01.jpg" alt="Wrestling 2026" />
  <span class="collage-caption">Wrestling 2026</span>
</a>
```

Avoid placing two photos from the same folder next to each other in the HTML — that's what keeps the grid feeling shuffled instead of clumped.

Note: there's also a `.collage-horizontal` class in styles.css (row-based flow, folders clustered
together) that was tried on this page earlier — it's unused now but still there if you ever want to
switch back to a clustered, non-shuffled layout.

## video.html: self-hosted videos

video.html now embeds real `<video>` players (not links out to YouTube/etc.) using a
featured-video-on-top, two-videos-below layout:

- photos/video/video-2/ → featured (full width) — "Men's Basketball 2026 Intro Video"
- photos/video/video-3/ → grid — "Men's Basketball 2025 Intro Video"
- photos/video/video-4/ → grid — "Women's State Championship Hype Video 2023"

Each folder holds a `video.mp4` (the compressed, web-ready file) and a `cover.jpg` (poster frame
shown before play). Originals (943MB combined, one was 4K) are backed up untouched in
video-original-backup/ at the project root — do not upload that backup folder to a live site.

Note: photos/video/mens-basketball-intro/ (the original single video, still using an external-link
card style) is intentionally NOT on video.html anymore — it was replaced by video-2, which is the
same video re-encoded for self-hosting. mens-basketball-intro/cover.jpg is still used on the
homepage's "Video Productions" card in index.html, so don't delete that folder.

### Adding another self-hosted video

1. Compress the video first — raw camera exports (hundreds of MB, sometimes 4K) will not load
   reliably on a website. Rule of thumb: 1080p, H.264, and keep it well under 50MB per video. If you
   have ffmpeg, a good starting command is:
   ```
   ffmpeg -i input.mp4 -vf "scale=1920:-2" -c:v libx264 -preset medium -crf 24 -maxrate 3000k -bufsize 6000k -c:a aac -b:a 128k -movflags +faststart video.mp4
   ```
2. Create a new folder under photos/video/, and put the compressed file in it as video.mp4, plus a poster frame as cover.jpg.
3. Open video.html and copy this snippet into the `<div class="video-grid">` (add a second `<div class="video-card">` alongside it if you want a third grid video):

```html
<div class="video-card">
  <video controls preload="metadata" poster="photos/video/your-folder/cover.jpg">
    <source src="photos/video/your-folder/video.mp4" type="video/mp4" />
  </video>
  <div class="video-info">
    <h3>Video Title</h3>
    <p>Short description</p>
  </div>
</div>
```

To swap which video is featured (full width, at the top), move its markup into the
`<div class="video-featured">` block instead, following the same `<video>`/`<div class="video-info">` structure.

## Adding a new dropdown/nav item

If you add a whole new gallery page beyond Game Photos, Media Day, and Video, add a matching `<a>` link inside every page's `<div class="nav-dropdown-menu">` block (in index.html, game-photos.html, media-day.html, and video.html) so the "More Work" dropdown stays in sync across the site.

## Currently needed

- photos/8/ is still empty — drop photos in there and tell me the event/title so I can wire them in.
- media-day.html's 10 folder titles are filled in (see the list above) — nothing outstanding.
- video.html has room for one more video in the grid row if you want a 3rd (currently 2 + 1 featured).
