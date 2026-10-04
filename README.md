# yshwang35.github.io

Personal academic homepage of Youngseok Hwang: **https://yshwang35.github.io**

A static site (plain HTML/CSS/JS, no build step) served by GitHub Pages from the `main` branch.

## Structure

```
index.html            the whole page
assets/css/style.css  styles, including dark mode and the wide-screen (PC) layout
assets/js/main.js     image slots, light/dark toggle, section menu, "Show all" lists
assets/img/           profile photo, favicons
assets/logos/         institution logos for Research Experience
assets/papers/        one key figure per paper
data/                 cv.pdf (when added)
```

## Updating

**Preview locally**

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

**Paper figures and logos.** Each slot in `index.html` points to a base name such as
`<img data-src="assets/papers/kdd26-omad">`. Drop a file with that name and any of
`png / jpg / jpeg / webp / gif / svg` into the folder, and it shows up; until then a gray
placeholder is shown. Use a white 16:9 canvas: about 1600×900 for figures, 480×270 for logos.

**Photos.** Phone photos carry GPS coordinates in their EXIF data. Strip metadata before
committing, for example:

```bash
convert input.jpg -auto-orient -strip -resize 960x720 -quality 85 assets/img/profile.jpg
```

**CSS or JS changes.** GitHub Pages caches assets for 10 minutes, so a new `index.html` can
load an old stylesheet. After editing `style.css` or `main.js`, bump the `?v=` number on the
`<link>` and `<script>` tags in `index.html`.

**News.** Newest first, dated by the month a paper was *accepted* (not presented). Rows with
class `extra` stay hidden until the visitor clicks "Show all"; the same applies to
Awards & Honors.

**"Last updated"** in the footer is filled in automatically from the deploy time.

## Credits

- Layout based on [Jon Barron's website template](https://jonbarron.info/)
  ([source](https://github.com/jonbarron/jonbarron_website)).
- Favicon: 🌐 from [Noto Emoji](https://github.com/googlefonts/noto-emoji) (Apache License 2.0).
