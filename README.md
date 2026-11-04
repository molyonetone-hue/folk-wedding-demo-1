# The Heritage Kalyanam — Wedding Website Template
**ONETONE STUDIO** · Demo couple: Arwind & Thivya · 06 February 2027

A static wedding site in HTML, CSS and plain JavaScript. It needs no
backend, database, build step or paid service. You upload the folder to
Hostinger and it works.

---

## 1. What's in the folder

```
index.html            The page structure. You rarely need to touch it.
css/style.css         All the design: colours, type, layout, motion.
js/config.js          ★ ALL couple content. This is the file you edit. ★
js/main.js            Builds the page from config.js and runs the interactions.
upload.html           Guest photo upload page (QR code target).
js/upload.js          Sends guest uploads to the studio's Google Drive.
apps-script/Code.gs   Google Apps Script for photo uploads + guestbook wishes (pasted into script.google.com).
assets/images/        Web-ready photos (the timeline and profile portraits use the couple's real photos;
                      the memory-wall samples are still SVG placeholders).
couple photos/        The couple's ORIGINAL photos, kept for reference. Don't upload this
                      folder to Hostinger: the site only uses the copies in assets/images.
assets/audio/         Optional licensed music file (see §5).
assets/fonts/         Optional self-hosted fonts (see §8).
```

## 2. Preview on your computer

Double-clicking `index.html` works for most things. YouTube music and
some browsers need a real local server, so this is better:

1. Open Terminal in this folder.
2. Run `python3 -m http.server 8000`
3. Visit http://localhost:8000

Tip: add `?lang=ta` to the link to open the site in Tamil, e.g.
`https://yoursite.com/?lang=ta`. This is handy when sharing with Tamil-speaking relatives on WhatsApp.

## 3. Personalising for a new couple (all in `js/config.js`)

Open `js/config.js` in a text editor such as VS Code (free) or TextEdit
in plain-text mode. Every block has a comment explaining it.

| Want to change… | Edit in config.js |
|---|---|
| Names, nicknames, Tamil names | `couple` |
| Wedding date (countdown) | `weddingDateISO` (keep the `+08:00`) |
| Date and city shown on screen | `weddingDateDisplay`, `weddingLocation` |
| Colours | `theme` |
| Turn the intro on/off | `showIntro` |
| Every button and heading | `text.en` and `text.ta` |
| Love story milestones | `story`, `storyClosing` |
| Profiles and "Who is more likely" (section currently removed from the page; data kept) | `profiles`, `likely` |
| Events, times, venues, map search | `events` |
| Guest photo sharing | `memories` |
| Guestbook | `guestbook` |
| Connect uploads + wishes to the studio's Apps Script | `guestServices` |
| Wishlist | `wishlist` |
| Bank and DuitNow details | `gift` (set `enabled: false` to hide the section) |

**Bilingual text:** anything written `{ en: "…", ta: "…" }` changes when
the guest switches language.

**Common mistake:** a missing comma or quote mark. If the page goes blank
after an edit, undo your last change and check the punctuation.
(The browser's Console, opened with F12, names the line number.)

### Events and maps
Each event has a `mapQuery`. The **Google Maps** and **Waze** buttons
search for that text, using each service's official link format, so no API key is needed:

- Google Maps: `https://www.google.com/maps/search/?api=1&query=…`
- Waze: `https://waze.com/ul?q=…&navigate=yes`

For private homes, the demo deliberately searches only the town
(`Klang, Selangor`, `Puchong, Selangor`) and shows *"Exact address shared
personally by the family."* Never publish a family's home address on a public site.

Use `sides: [ … ]` for a day with two locations (bride's and groom's
Nalungu on the same evening) or `venue: { … }` for a single venue.
The optional `notes` field adds venue information, such as parking, but only
add it once the couple has confirmed the details with the venue.

### Family contacts ("Need a hand?")
Under the celebrations, guests see two contacts from each family, each with a
**Call** and a **WhatsApp** button. Edit `contacts` in config.js: a name, a relation and a
phone number per person. Always write the number with the country code
(`+60 12-345 6789`); the buttons use its digits. The numbers in the demo are
placeholders (`+60 12-000 000x`), so replace them, and ask each person before publishing
their number, since the site is public. Remove a person's entry to show fewer.

### Look & feel: Paati's house in wedding week
The art direction is a Tamil grandparents' home during wedding preparations: red oxide
floors, a pulli kolam, brass, jasmine, banana leaves, lime-washed walls, old family albums
and vintage film light. Artwork was made with Higgsfield (GPT Image 2.5 and Soul Location)
and lives in `assets/images/home/`:

| File | Used for |
|---|---|
| `entrance-wide.jpg` / `entrance-tall.jpg` | The opener: Paati's front door (the two leaves are cut from the same photo, positions set in `.entrance` in CSS) |
| `swing-tall.jpg` / `swing-wide.jpg` | Hero: Arwind and Thivya laughing on the oonjal in the decorated verandah (generated with their photos as reference). The wide one is the same photo expanded sideways with AI outpaint, for desktop |
| `jasmine.png`, `urli.png` | Transparent jasmine strands and a tuberose urli layered over the hero and hung across sections |
| `coffee.png` | Painted filter coffee set above the family contacts |
| `tex-liner.jpg` | Floral liner inside the moi envelope |
| `tex-teak.jpg`, `tex-silk.jpg`, `tex-leaf.jpg` | Teak, red Kanchipuram silk and banana-leaf surfaces behind the sections |
| `tex-maroon.jpg` | Mottled oxblood wall behind Our Love Story |
| `moi-lotus.jpg` | Lotus and brass still life behind the moi envelope (blurred in CSS) |
| `wax-seal.png` | Red lotus wax seal that opens the moi envelope |
| `memories/memory-01…06.jpg` (in `assets/images/`) | Sample guest photos on the Memories polaroid wall (demo only; replace with real highlights) |
| `postcard-back.jpg` | Scanned-look vintage postcard the guestbook form is written on |
| `rosette.svg` (in `assets/images/`) | Floral rosette flourish (Save the Date, guestbook watermark) |
| `lotus-motif.svg` (in `assets/images/`) | Maroon lotus line motif on the moi card, slip and postcard stamps |
| `moi-corner-*.svg`, `deckle-mask.svg` (in `assets/images/`) | Corner ornaments and torn-paper edge of the moi card |
| `moi-tray.png` | Brass thambulam (betel, bananas, jasmine) the moi envelope rests on |
| `wishlist/*` (in `assets/images/`) | Vintage Indian prints for each wish (set per item as `art`; the .png ones are cut-outs) |
| `wm-rangoli.svg` (in `assets/images/`) | Coral rangoli line drawing behind the wishlist collage |
| `events/*.jpg` | Gold-on-maroon stamp illustrations, one per celebration (set per event as `art`) |
| `feast.jpg` | Vintage banana-leaf wedding feast (brass lamp, tumbler, jasmine) filling the footer |

Other artwork:
- `assets/images/icons/`: glossy 3D icons (celebrations, contacts, wishlist, gift, memories).
  Each wishlist item's `icon` in config.js is the file name, e.g. `coffee` → `icons/coffee.png`;
  each event has its own `icon` path.
- `assets/images/cutout-arwind.png`, `cutout-thivya.png`: the couple with the background removed
  (Higgsfield background remover), standing on the temple arches in "Meet the Two of Us"
  and used as faces in the "Who is more likely" game. Set per profile as `cutout`.
  Each profile is shown as a typed "Marriage Bio-Data" sheet; its red rubber stamp text is the profile's `stamp`.
- `calendarForecast` in config.js fills the playful "Wedding forecast" column on the
  calendar page (like the rasi palan on a Tamil daily calendar).

The page as a walk through the house:
1. **Paati's front door:** guests tap the door (or the "Tap the door to come in" button);
   the doors swing open and the camera walks through into the verandah. If you swap the
   entrance photo, update `--L --T --W --H` (the door leaves, in % of the photo) in `.entrance`.
2. **The hall (hero):** quiet, just the names. Scrolling walks into the room while a white
   pulli kolam draws itself on the floor, then *வாங்க, வாங்க!* welcomes you in. The kolam is a true sikku
   (pulli) kolam made by `tools/kolam.py`: change its `mask()` for a new pattern, run
   `python3 tools/kolam.py`, and paste the printed `<svg>` over the old one in `index.html`.
   The `tools/` folder doesn't need uploading to Hostinger.
3. **Tear-off calendar:** the countdown, hung on the wall.
4. **Family album:** scrolling down turns the album pages sideways (photo corners, white-ink captions).
5. **Portraits on the wall**, **invitation-card celebrations** on the oxide floor, **paper gift
   tags** for the wishlist, a **moi envelope** for the digital gift, the **visitors' notebook**
   guestbook, **prints on a banana leaf** for memories, and the **feast** to close.

Colours come from `theme` in config.js (red oxide, maroon, turmeric, banana leaf, aged brass,
coconut, aged ivory, kolam white). The artwork isn't couple-specific, so it can be reused.

## 4. Replacing photos

1. Export photos as **.jpg or .webp**, about **1200px on the long edge**,
   around 300 KB each. https://squoosh.app is free and good for this. On a Mac you can also run
   `sips -s format jpeg -s formatOptions 78 -Z 1200 original.png --out assets/images/story-2019.jpg`.
2. Put them in `assets/images/`.
3. Update the file names in `config.js`, e.g. `"assets/images/story-2019.jpg"`.

Recommended crops:
- Love-story timeline: each photo has a `shape` in `config.js`:
  - `"portrait"`: a tall temple arch (4:5). Best for upright photos of the two of them.
  - `"landscape"`: a wider, gentler arch (16:10). Use it for sideways photos and group shots,
    so nobody gets cropped out.

  If a face is cut off, adjust `focus`, e.g. `"50% 30%"`. That's the point of the photo to keep
  in view, as horizontal % then vertical %.
- Profile portraits: portrait **4:5**, with faces in the upper-middle.
- Memory wall samples: square.
- Share image (`og-image`): **1200×630 .jpg**. WhatsApp ignores SVG
  previews, so replace `assets/images/og-image.svg` with a .jpg and update
  the `og:image` line in `index.html` to a full URL (`https://yourdomain.com/assets/images/og-image.jpg`).

## 5. Music

Browsers block sound until the guest taps something. Music therefore
only starts when the guest presses **Enter Our Celebration** with the "With
music" switch on. If they choose "Without music" or **Skip intro**, nothing
plays, but they can start it later with the floating ♫ button.

### Option A: YouTube (default)
1. Find a video whose owner allows embedding and which you're allowed
   to use. Official artist uploads often block embedding, so test it.
2. Copy its 11-character ID: `https://youtu.be/`**`dQw4w9WgXcQ`**
3. In config: `youtubeVideoId: "dQw4w9WgXcQ"`.

While the ID is `YOUR_VIDEO_ID`, music is switched off and all music
controls are hidden.

How it behaves (and why):
- The YouTube player **stays visible in a small card while playing**.
  YouTube's embedded-player policies don't allow hiding the player or
  shrinking it below 200×200px, so this template doesn't try to. Closing
  the card pauses the music.
- If the browser blocks autoplay, the ♫ button pulses with *"Tap to play"*.
- If the video is unavailable or blocks embedding, the guest sees *"Music
  isn't available right now"* plus your optional `youtubeMusicUrl` link.
- A YouTube Music playlist link **can't** be used as a direct audio
  source. It's offered only as an external "Listen on YouTube Music" link.
- Phones (iOS especially) ignore the volume slider. Guests use their device's volume buttons instead.

### Option B: a licensed audio file (smoother experience)
If the couple has a track they hold the rights to, such as a commissioned
instrumental or a royalty-free licence that covers web use:
1. Put it in `assets/audio/` as an .mp3 (128 kbps, under ~4 MB).
2. Set `audioFile: "assets/audio/your-track.mp3"`.

This overrides YouTube and can play quietly in the background with no visible
player. **Never upload commercial film songs without permission.**

## 6. Guest services: photo uploads + guestbook wishes (studio Google account)

Two features run through one small **Google Apps Script** on the studio's
Google account (`apps-script/Code.gs`), with no sign-in for guests:

| Feature | Guests… | Saved to |
|---|---|---|
| **Photo sharing** (Memories) | pick photos/videos and tap Send | a Drive folder per couple |
| **Guestbook** (Leave Us A Little Love) | write a wish and tap Send | a Google Sheet, one tab per couple |

Both are switched on together in `js/config.js`:
```js
guestServices: {
  demoMode: false,                                     // true = samples only, nothing is sent
  appsScriptUrl: "https://script.google.com/macros/s/…/exec",
  eventKey: "arwind-thivya-2027"                       // same key as in EVENTS (Code.gs)
}
```


Guests upload **right inside the Memories section** of the wedding site. They
type their name, pick photos and videos, and tap **Send**. They don't sign in
and don't need an app. The QR code (for table cards, or for desktop visitors who want to
switch to their phone) opens **`upload.html`**, a lightweight page with the same form
and no cinematic intro, so it loads instantly at the venue. Each file goes to a small **Google Apps Script** program
running on the **studio's** Google account, which saves it into the studio's
Google Drive:

```
Onetone Wedding Uploads/                 ← one parent folder for all weddings
  Arwind & Thivya · 2027-02-06/          ← created automatically per couple
    20270204-193215_Karthik_IMG_1234.jpg ← date-time_guest-name_original-name
```

The website stays fully static, and the uploads run on Google's servers.
**One deployment serves every couple.**

While `guestServices.demoMode` is `true`, the site shows sample photos and wishes, and the upload and
wish buttons stay disabled, so nothing is sent. There is no on-page "Demo" label, so remember to
switch it off before the couple shares the link.

### A. One-time setup (studio account, ~15 min)
1. In the studio's Google Drive, create a folder named **Onetone Wedding Uploads**.
   Open it and copy the ID from the address bar (the part after `/folders/`).
2. Also in Drive, create a blank Google Sheet named **Onetone Wedding Wishes**. Copy its ID
   from the address bar (the long part between `/d/` and `/edit`). You don't need to add anything to it,
   because each couple gets its own tab automatically.
3. Go to https://script.google.com and click **New project**. Name it *Onetone Guest Services*.
4. Delete the sample code, then paste in the whole of **`apps-script/Code.gs`**.
5. Set `ROOT_FOLDER_ID` and `WISHES_SHEET_ID` to the IDs from steps 1–2, and save.
6. Choose **testSetup** in the function menu and press **Run**. Google asks for
   permission to use Drive, Sheets and to "connect to an external service". The last one is how
   the script fetches photo previews for the website. Because it's your own script, you'll see *"Google hasn't verified
   this app"*: click **Advanced → Go to Onetone Guest Services**, then **Allow**.
   The log should show both the folder name and the sheet name.
7. Click **Deploy → New deployment**, then the gear icon → **Web app**:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
   - Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
   Opening it in a browser should show `{"ok":true,"service":"onetone-guest-services"}`.

> If the studio uses Google Workspace and "Anyone" is missing, the
> Workspace admin has restricted public web apps. Allow it in the Admin console,
> or use a regular Gmail account for the uploader.

### B. For each new couple (~3 min)
1. In `Code.gs`, add the couple to `EVENTS`:
   ```js
   'arwind-thivya-2027': {
     folderName: 'Arwind & Thivya · 2027-02-06',   // Drive folder AND sheet tab name
     closesOn: '2027-03-31',
     showOnSite: 'auto',          // photo wall, see below
     wishesOnSite: 'approved'     // guestbook wall, see §7
   }
   ```
   `closesOn` is when uploads and wishes stop. About 6–8 weeks after the reception works well.
2. Click **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
   If Google says the script needs new permissions, for example after a template update,
   run **testSetup** once more and allow them.
   The URL stays the same. Don't create a *new* deployment, or you'll get a new URL.
3. In that couple's `js/config.js`, fill in `guestServices` (shown at the top of this section)
   with `demoMode: false`, the `/exec` URL and the couple's event key.
4. **Test from a phone on mobile data:** scan the QR code, send a photo and a short
   video, and check that both appear in Drive. Then send a test wish, check it appears
   in the sheet, and delete that row.

### C. After the wedding: zip and hand over
1. After `closesOn`, uploads are refused automatically, and guests see a polite
   "uploads have closed" message.
2. In Drive, right-click the couple's folder → **Download**. Drive zips it
   for you, splitting it into several zips if it's over ~2 GB.
3. Send the zip(s) to the couple, for example via WeTransfer or a Drive share link,
   or put them on a USB drive as a keepsake.
4. Once the couple confirms they have everything, delete the folder and
   **empty Drive's Bin** to free the studio's storage.
5. **Wishes:** in the sheet, right-click the couple's tab → **Copy to → New spreadsheet**,
   or use **File → Download → PDF / Excel**, and include it with the photos. It makes a lovely keepsake to print.
   Then delete the tab from the studio's sheet.
6. Optional: pick favourites for the site's `highlights` (see below).

### Good to know
- **Storage:** uploads count against the studio account's storage. A free account's
  15 GB is shared with Gmail. A single wedding can easily reach 5–30 GB with
  videos, so a Google One (2 TB) or Workspace plan is worth it.
- **File size:** up to **35 MB per file**. That covers every phone photo and roughly
  30–60 seconds of phone video. Bigger files are flagged on the page with
  "please WhatsApp this one to the family". Apps Script can't accept larger uploads,
  so don't raise `MAX_FILE_MB` above 35.
- **Busy moments:** each guest's phone sends 2 files at a time. If many guests upload at
  the same second, a few files may fail, and the page shows **Try again** for just those.
- **Who can upload:** anyone with the link or QR code. That's fine for a wedding, and
  `closesOn` limits the window. To cut off a leaked link early, change
  the event key in both `Code.gs` and `config.js` and redeploy.
- **Privacy:** the folders are private to the studio. Guest names appear in file names.
  Only fill in `galleryUrl` / `driveFolderId`, which make a folder public via "Anyone with the
  link · Viewer", if the couple wants guests to browse each other's uploads.
- **iPhone photos (HEIC):** Safari usually converts them to JPEG when uploading. If any
  arrive as .heic, they still open on Mac and Windows 11, and Drive can preview them.

### Recent uploads on the website (automatic)
Below the form, the site shows the **newest guest photos**, 6 by default (`recentCount`, up to 12),
pulled straight from the couple's Drive folder:
- Photos only. Videos are saved, but they aren't shown on the wall.
- The Drive files stay **private**. The script sends small preview images (480px), and nothing
  is made public.
- New uploads appear within about a minute. Drive needs a few seconds to make each preview.
- The wall only loads when a guest scrolls near the section, so it costs nothing for guests who never reach it.

Control it per couple with `showOnSite` in `EVENTS` (Code.gs):

| `showOnSite` | What appears on the site |
|---|---|
| `'auto'` | The newest photos, automatically. **To remove one, move it to Bin in Drive.** |
| `'starred'` | Only photos you ⭐ star in Drive. Nothing appears until you approve it. |
| `'off'` | Nothing (uploads still work). |

⚠ With `'auto'`, a guest's photo goes public on the wedding site without anyone checking it first.
That's fine for most weddings, but for a high-profile couple, or when the couple asks, use `'starred'`
and approve the photos during the event. Set `showRecent: false` in config.js to hide the wall entirely.

### Highlights (the prettiest wall after the wedding)
When `showRecent` is off, or before the first uploads arrive, the wall falls back to
these hand-picked photos. Export favourite guest photos as square .jpg files (~1000px), add them to
`assets/images/`, and list them in `memories.highlights`:
```js
highlights: [
  { src: "assets/images/guest-01.jpg", by: "Karthik", caption: { en: "The sambar queue", ta: "சாம்பார் வரிசை" } }
]
```

### Alternative: Google Form (guests sign in)
Set `provider: "googleForm"` and `uploadUrl` to a Google Form with a File upload
question. The QR code and button then open the Form instead, and the "How to share"
steps switch to the sign-in wording automatically.

Tip: print the same QR code on table cards at both Nalungu homes and the reception.

## 7. Guestbook, wishlist and gifts

### Guestbook ("Leave Us A Little Love")
Guests write their wish right on the site: their **name**, **how they know the couple**
(optional) and a **message** of up to 600 characters. They tap **Send wish**, and it's saved as a new row in the
couple's tab of the **Onetone Wedding Wishes** sheet, using the Apps Script from §6:

| Received | Name | Relation | Message | Show on site | Language |
|---|---|---|---|---|---|
| 4 Feb 2027, 9:41 pm | Karthik | Groom's best friend | Bro, still can't believe… | ☐ | en |

**Approving wishes.** Ticking **Show on site** puts that wish on the wall within about a minute.
Unticking it takes the wish down again. Choose the behaviour per couple with `wishesOnSite` in `EVENTS`:

| `wishesOnSite` | What happens |
|---|---|
| `'approved'` (recommended) | New wishes arrive unticked. Nothing appears until you tick it. Guests see *"Your wish will appear once the couple has read it."* |
| `'auto'` | New wishes arrive ticked and appear immediately, including on the guest's own screen. Untick a row to hide it. |
| `'off'` | Wishes are saved but the wall never shows them. |

Text is far easier to abuse than photos, so we recommend `'approved'`. Ticking boxes
in the Google Sheets app on a phone during the event takes seconds. The couple can do it too
if you share just their tab, or a copy of it, with them.

Other details:
- The wall shows the newest 24 approved wishes (`guestbook.liveCount`, up to 60).
- In demo mode, the three sample wishes in `guestbook.wishes` are shown instead.
- A hidden "honeypot" field quietly drops most spam bots, and anything starting with `=`, `+`, `-` or `@` is stored as plain
  text, so nobody can slip a formula into the sheet.
- Prefer an outside form instead? Set `guestbook.provider: "form"` and `formUrl` to a
  Google Form, Tally or Jotform link. The section then shows a **Write a wish** button instead.

### Wishlist and gifts
- **Wishlist:** a simple list of gift ideas, with no reservations or tracking. Edit
  `wishlist.items` (name, a one-line note, and an icon: `coffee`, `pan`, `dice`,
  `plate`, `luggage`, `camera`, `projector` or `speaker`).
- **Digital gift:** replace the fictional bank details and
  `duitnow-qr-sample.png` with the couple's own details. Double-check every digit with
  the couple. Set `enabled: false` if they'd prefer not to show it.

## 8. Fonts
All fonts are from Google Fonts under the SIL Open Font License, which allows commercial use:
- **Playfair Display**: titles, often in italic, like a printed invitation
- **Allura**: handwritten script for the couple's names, signatures and notes
- **Inter**: information text and buttons
- **Noto Serif Tamil / Noto Sans Tamil**: Tamil headings and body text

They load from Google's servers. To self-host (slightly faster, works
offline), download the .woff2 files (e.g. via https://gwfh.mranftl.com),
put them in `assets/fonts/`, add `@font-face` rules at the top of
`css/style.css`, and remove the Google Fonts `<link>` in `index.html`.

## 9. Publishing to Hostinger
1. Log in to **hPanel → Websites → Manage → File Manager**.
2. Open `public_html` (or the folder for your subdomain, e.g. `arwind-thivya.yourstudio.com`).
3. Upload the **contents** of this folder (`index.html`, `css`, `js`,
   `assets`) so that `index.html` sits directly inside `public_html`.
   Dragging in a .zip and choosing *Extract* is quickest.
4. In hPanel, enable **SSL** (free) so the site loads on `https://`.
5. Visit the domain and do a hard refresh (Ctrl/Cmd + Shift + R).

There's nothing to install and no build step. To update, re-upload the changed file
(usually just `js/config.js`).

## 10. Before you send the link: checklist
- [ ] A fluent Tamil speaker has reviewed **every `ta` line** in config.js
      (all Tamil in the demo is a draft).
- [ ] Dates, times and day names checked against the couple's invitation card.
- [ ] Map buttons tested on a phone with Google Maps and Waze installed.
- [ ] Music ID tested with embedding allowed, or music left off.
- [ ] Couple added to `EVENTS` in Code.gs and redeployed. Photo + video upload tested from a phone, `demoMode: false`.
- [ ] Test wish sent, seen in the sheet, ticked and seen on the site, then deleted.
- [ ] Gift section shows the couple's real details, or is disabled.
- [ ] Family contact numbers replaced, agreed by each person, and Call/WhatsApp tested from a phone.
- [ ] Remaining placeholder SVGs (memory-wall samples) replaced, plus a .jpg share image.
- [ ] Opened from a WhatsApp link on both iPhone and Android.

## 11. Accessibility & performance notes
- Fully keyboard-navigable. The intro has **Skip intro** (Esc also works).
- `prefers-reduced-motion` is respected: the intro appears without drawing, the doors
  fade instead of swinging, the kolam is shown complete, the hero and album aren't pinned
  (the album scrolls sideways by hand), and dust motes, grain and reveals are off.
- If JavaScript or a CDN fails, a safety net hides the intro after 6 seconds,
  and GSAP effects simply don't run. Content still shows.
- Photos lazy-load, and animations use transforms and opacity only, with no scroll-jacking.
- Libraries: GSAP 3.12.5 (the hero name reveal only; the hall, kolam and album scroll effects are plain CSS + JS) and qrcodejs
  1.0.0 (QR code), both from cdnjs. Everything else is hand-written.
