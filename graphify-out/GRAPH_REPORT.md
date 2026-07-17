# Graph Report - .  (2026-07-16)

## Corpus Check
- Large corpus: 290 files · ~20,935,813 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 56 nodes · 92 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.88)
- Token cost: 90,000 input · 6,047 output

## Community Hubs (Navigation)
- About Page & Company Story
- Home Page Core Sections
- Motion System Functions
- Site Footer
- Site Navigation
- Video Page & Work Index
- Game Photos Page
- Media Day Page
- Photo Collage Grids
- Credibility Marquee

## God Nodes (most connected - your core abstractions)
1. `about.html (About Page)` - 19 edges
2. `index.html (Home Page)` - 14 edges
3. `game-photos.html (Game Photos Page)` - 14 edges
4. `media-day.html (Media Day Page)` - 14 edges
5. `video.html (Video Page)` - 11 edges
6. `motion.js` - 5 edges
7. `styles.css` - 5 edges
8. `Selected Work Index (Game Photos, Media Day, Video)` - 4 edges
9. `About Brief Section (About Page)` - 4 edges
10. `lightbox.js` - 4 edges

## Surprising Connections (you probably didn't know these)
- `about.html (About Page)` --references--> `index.html (Home Page)`  [EXTRACTED]
  about.html → index.html
- `game-photos.html (Game Photos Page)` --references--> `index.html (Home Page)`  [EXTRACTED]
  game-photos.html → index.html
- `index.html (Home Page)` --references--> `media-day.html (Media Day Page)`  [EXTRACTED]
  index.html → media-day.html
- `index.html (Home Page)` --references--> `video.html (Video Page)`  [EXTRACTED]
  index.html → video.html
- `Home Page Nav/Topbar` --shares_data_with--> `About Page Nav/Topbar`  [INFERRED]
  index.html → about.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Nav/Topbar Component Across All Pages** — index_navbar, about_navbar, game_photos_navbar, media_day_navbar, video_navbar [INFERRED 0.90]
- **Shared Footer Component Across All Pages** — index_footer, about_footer, game_photos_footer, media_day_footer, video_footer [INFERRED 0.90]
- **Shared .scene / .scene-strip Parallax Layout Pattern** — index_scenegameday, index_scenemediaday, about_sceneathlete, about_scenelens, about_scenebigdog [INFERRED 0.85]

## Communities (12 total, 3 thin omitted)

### Community 0 - "About Page & Company Story"
Cohesion: 0.23
Nodes (13): About Brief Section (About Page), BigDog Media LLC (company), about.html (About Page), About Hero Film/3D Canvas Section, GameTimeSnaps (company), Resume Section (Experience, Recognition, Leadership, Education), The Athlete Scene Section, GameTimeSnaps Scene Section (+5 more)

### Community 1 - "Home Page Core Sections"
Cohesion: 0.40
Nodes (6): Contact Section (About Page), Contact Section (Home), index.html (Home Page), Home Hero (video, headline, CTAs), Game Days Scene Section, Media Days Scene Section

### Community 3 - "Site Footer"
Cohesion: 0.40
Nodes (5): Footer (About), Footer (Game Photos), Footer (Home), Footer (Media Day), Footer (Video)

### Community 4 - "Site Navigation"
Cohesion: 0.40
Nodes (5): About Page Nav/Topbar, Game Photos Nav/Topbar, Home Page Nav/Topbar, Media Day Nav/Topbar, Video Page Nav/Topbar

### Community 5 - "Video Page & Work Index"
Cohesion: 0.40
Nodes (5): Selected Work Index (Game Photos, Media Day, Video), motion.js, video.html (Video Page), Videos Subpage Hero, Video Productions Section (featured + grid)

### Community 6 - "Game Photos Page"
Cohesion: 0.50
Nodes (4): game-photos.html (Game Photos Page), Lightbox Modal (Game Photos), Game Days Subpage Hero, styles.css

### Community 7 - "Media Day Page"
Cohesion: 0.67
Nodes (4): lightbox.js, media-day.html (Media Day Page), Lightbox Modal (Media Day), Media Days Subpage Hero

## Knowledge Gaps
- **9 isolated node(s):** `Home Hero (video, headline, CTAs)`, `Organizations Marquee`, `Stats Grid`, `Resume Section (Experience, Recognition, Leadership, Education)`, `BigDog Media LLC (company)` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `about.html (About Page)` connect `About Page & Company Story` to `Home Page Core Sections`, `Site Footer`, `Site Navigation`, `Video Page & Work Index`, `Game Photos Page`, `Media Day Page`?**
  _High betweenness centrality (0.313) - this node is a cross-community bridge._
- **Why does `media-day.html (Media Day Page)` connect `Media Day Page` to `About Page & Company Story`, `Home Page Core Sections`, `Site Footer`, `Site Navigation`, `Video Page & Work Index`, `Game Photos Page`, `Photo Collage Grids`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `game-photos.html (Game Photos Page)` connect `Game Photos Page` to `About Page & Company Story`, `Home Page Core Sections`, `Site Footer`, `Site Navigation`, `Video Page & Work Index`, `Media Day Page`, `Photo Collage Grids`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `Home Hero (video, headline, CTAs)`, `Organizations Marquee`, `Stats Grid` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._