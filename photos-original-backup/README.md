Photo upload folders for the portfolio site:

- hero/ : main hero image and featured image area
- work/ : preview images used on the homepage "Selected Work" cards
- about/ : any supporting images used in the About section
- video/<video-slug>/ : one subfolder per video project, each holding that video's cover.jpg thumbnail
- gallery/media-days/ : full-size photos for the gallery on media-day.html
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

## Adding a new photo to media-day.html

1. Drop the image file into photos/gallery/media-days/ (name it anything, e.g. photo-04.jpg).
2. Open media-day.html and find the `<div class="gallery">` block.
3. Copy-paste this snippet inside it, and update the src, alt, and caption:

```html
<a class="gallery-item" href="photos/gallery/media-days/photo-04.jpg" target="_blank" rel="noreferrer">
  <img src="photos/gallery/media-days/photo-04.jpg" alt="Describe the photo" />
  <span class="gallery-caption">
    <h3>Short Title</h3>
    <p>Event or date</p>
  </span>
</a>
```

## Adding a new video to video.html

1. Create a new folder under photos/video/ named after the video (e.g. photos/video/team-hype-video/), and drop a thumbnail/cover image inside it named cover.jpg.
2. Open video.html and copy-paste this snippet inside the `<div class="work-grid">`:

```html
<a class="work-card" href="PASTE_YOUTUBE_OR_INSTAGRAM_LINK_HERE" target="_blank" rel="noreferrer">
  <img src="photos/video/team-hype-video/cover.jpg" alt="Describe the video thumbnail" />
  <div>
    <h3>Video Title</h3>
    <p>Short description</p>
  </div>
</a>
```

3. Replace the href with the real hosted video link (YouTube, Instagram, TikTok, Vimeo, etc.) so clicking the card opens the video. Same pattern works for the homepage "Video Productions" card in index.html.

Each video gets its own folder so multiple videos never collide on filenames — just reuse "cover.jpg" as the filename inside every new folder.

## Adding a new dropdown/nav item

If you add a whole new gallery page beyond Game Photos, Media Day, and Video, add a matching `<a>` link inside every page's `<div class="nav-dropdown-menu">` block (in index.html, game-photos.html, media-day.html, and video.html) so the "More Work" dropdown stays in sync across the site.

## Currently needed

- photos/8/ is still empty — drop photos in there and tell me the event/title so I can wire them in.
- photos/gallery/media-days/ is ready for more Media Day photos whenever you have them.
