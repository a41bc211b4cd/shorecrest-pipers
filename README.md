# Shorecrest Pipers Club website

Welcome, and thank you for looking after this site! You do not need to be a developer. Every job below has exact steps you can copy.

## What this site is

This is the website for the Shorecrest High School Pipers Club (Highland bagpiping and drumming, Shoreline, Washington). It is for:

- families, neighbours and friends who find us through a link or a QR code, and who might donate
- students who are curious about joining
- the next club volunteer, who is probably you

It has three pages:

- **Home** (`index.html`): a gallery of photo tiles. One tile links to the fundraiser.
- **Fundraiser** (`fundraiser.html`): the story of the current campaign, with a tartan thermometer showing how much has been raised.
- **History** (`history.html`): a short history of piping at Shorecrest.

The live site is at https://a41bc211b4cd.github.io/shorecrest-pipers/

It is plain HTML, CSS and a little JavaScript. There is nothing to install and nothing to build. If you save a file, that is the change.

## Where things are

| File or folder | What it is | Edit it? |
| --- | --- | --- |
| `index.html` | Home page and photo gallery | Yes |
| `fundraiser.html` | Fundraiser page and thermometer | Yes |
| `history.html` | Club history page | Yes |
| `assets/js/nav.js` | Writes the menu at the top, the footer at the bottom and the little tab icon on every page | Yes |
| `assets/css/pipers.css` | Our colours and layout changes | Yes |
| `assets/css/main.css` | The template's own compiled CSS | **No**, leave it alone |
| `assets/sass/` | The template's source styles, kept for reference | No |
| `assets/js/main.js` and the other template `.js` files | The template's scripts (the photo pop-up, the footer panel) | No |
| `images/thumbs/` | Small gallery pictures shown on the home page | Yes, to add photos |
| `images/fulls/` | Large versions shown when someone clicks a tile | Yes, to add photos |
| `favicon.png` | The small icon in the browser tab | Replace to change it |
| `robots.txt` | Tells search engines and bots what they may do | Rarely |
| `LICENSE.txt` | The template's licence | **No**, never change it |

A rule of thumb: our changes go in `pipers.css`. The template's `main.css` is generated code, so anything you edit there is hard to track and easy to break.

## See your changes before anyone else does

You will need Python 3, which is already on most Macs and Linux computers.

1. Open a terminal in the site folder.
2. Run:

   ```
   python3 -m http.server 8123
   ```

3. Open http://localhost:8123 in your browser.
4. Edit a file, save it, and refresh the browser tab to see the change.
5. When you are done, go back to the terminal and press `Ctrl+C`.

If you double-click the HTML files instead, some things may not look right. Use the steps above.

## Update the fundraiser total

This is the job you will do most often.

1. Open `fundraiser.html`.
2. Scroll to the very bottom, to the `<script>` near the end of the file. Find these two lines:

   ```
   var GOAL = 6000;
   var RAISED = 1010;
   ```

3. Change the number after `RAISED` to the new total, with no `$` and no comma. For example, `var RAISED = 2350;`.
4. Save, check it at http://localhost:8123/fundraiser.html, then publish (see below).

The tartan fill and the words "Raised so far: $... of $6,000" both update themselves from that one number.

`GOAL` sets the scale of the thermometer. If you ever change it, the dollar labels beside the thermometer ($1,000, $2,000 and so on) do not move on their own. They are drawn by hand as tick marks in the SVG in the same file, so you would need to edit their labels and move their positions to match. Most of the time, leave `GOAL` alone.

## Add a photo tile to the home page

1. Pick a photo. Please make sure you have permission to post it, especially if students are in it.
2. Save a small version in `images/thumbs/` and a large version in `images/fulls/`, with the same file name, for example `13.jpg`. The existing gallery pictures are about 1500 pixels wide, so use a similar size. Use simple file names with no spaces.
3. Open `index.html` and find the gallery tiles. Each one looks like this:

   ```html
   <article class="thumb">
       <a href="images/fulls/09.jpg" class="image"><img src="images/thumbs/09.jpg" alt="Club rehearsal" /></a>
       <h2>Pipers' Club</h2>
       <p>We meet Tuesdays and Thursdays after school all year. Everyone is welcome!</p>
   </article>
   ```

4. Copy a whole tile, from `<article` to `</article>`, and paste it where you want the new one. Tiles appear in the order they are written.
5. Change the two image names, the `alt` text (a short description for people who cannot see the picture), the heading and the sentence.
6. Save and refresh your preview.

### The fundraiser tile is different on purpose

The fundraiser tile has an extra `onclick="window.location.href='fundraiser.html'; return false;"`. Please do not remove it. The pop-up photo viewer (the "lightbox") grabs every link in the gallery and tries to open it as a picture, so a normal link to a page would break. The `onclick` sends people straight to the page instead. If you ever make another tile that links to a page rather than a photo, copy the fundraiser tile and change the page name.

### Retire a tile

Do not delete it. Wrap it in a comment so you can bring it back later:

```html
<!--
<article class="thumb">
    ...
</article>
-->
```

Make sure there is no other `<!--` comment inside the tile, because comments cannot be nested.

## Change the menu or the footer

The menu at the top, the footer at the bottom (club blurb, social icons, contact form) and the tab icon are all written by one file, `assets/js/nav.js`. Change it once and every page updates.

- **Menu:** near the top of the file is a list called `links`. Each line is one menu item with an address (`href`), an icon name and a label. Copy a line to add an item, delete a line to remove one. Icon names come from [Font Awesome](https://fontawesome.com/icons) (the free "solid" ones).
- **Footer:** further down is `footerHtml`, which is ordinary HTML written inside quote marks. Edit the words, but keep each piece's quote marks and `+` signs where they are. If you add an apostrophe inside the text, write `&rsquo;` or put a backslash before it (`\'`), or the page will stop working.

Important: on every page, `nav.js` must load **before** `main.js`. That is already true today. If you ever make a new page, copy the scripts block from the bottom of an existing page and keep the order.

## How publishing works

The site is published by GitHub Pages from the `main` branch. Whatever is on `main` is what the public sees.

- When a change lands on `main` (by merging a pull request, or by pushing), GitHub rebuilds the site by itself.
- It takes about a minute. Refresh the live site (hold Shift while you refresh) to see it.
- To check progress, open the **Actions** tab of the repository on GitHub.

Because `main` is public, try changes in your local preview first.

## Working with GitHub, step by step

The repository is `a41bc211b4cd/shorecrest-pipers`. You need a GitHub account that has been given access to it.

**Issues** are the to-do list. Each issue says what needs doing and why. Before starting, look for an open issue about your job. If there is none, click **New issue** and describe it in a sentence or two. You can comment on issues, so ask questions there.

**Pull requests** (PRs) are how a change gets onto the site. A PR says "here is my change, please check it, then add it to `main`".

1. Get the code: `git clone https://github.com/a41bc211b4cd/shorecrest-pipers.git`, then `cd shorecrest-pipers`.
2. Make a branch for your change (a branch is your own copy to work in, so `main` stays safe):

   ```
   git switch -c update-fundraiser-total
   ```

3. Make your edits and check them in the preview.
4. Save them as a commit:

   ```
   git add -A
   git commit -m "Update fundraiser total"
   ```

5. Send the branch to GitHub:

   ```
   git push -u origin update-fundraiser-total
   ```

6. On GitHub, click **Compare & pull request**. Give it a clear title and a sentence about what you changed. If it finishes an issue, write `Closes #12` (using the real issue number) in the description, and the issue will close itself when the PR is merged.
7. Ask another volunteer or adult to look it over. When they are happy, click **Merge pull request**. The site updates in about a minute.

If you get stuck or something looks wrong, do not panic. Nothing on GitHub is truly lost, and an earlier version can always be brought back. Ask for help in the issue.

## When the campaign ends

When the fundraiser is over, switch the site from asking to thanking. Do these together:

1. **Thermometer:** in `fundraiser.html`, set `RAISED` to the final total. Change the heading and the opening paragraph to a thank-you, for example "We did it, thank you!" Change the "Raised so far..." wording (set by the `textContent` line in the script at the bottom) to a past-tense line such as "Raised: $X". Change the note under the thermometer ("We update the tartan as donations come in. Watch it climb.") to something like "Thank you for helping us reach the goal." If the goal was not quite met, keep the thank-you honest and warm instead of saying "we did it".
2. **Donate button:** remove or comment out the "Donate online" button and the notes about cash and checks on the fundraiser page. If any other page or tile has a Donate button or link by then, retire that too (search every file for the word `Donate`).
3. **Home page tile:** comment out the fundraiser tile in `index.html`, as described under "Retire a tile". The file already has a note there reminding you to keep the code for next time.
4. **Thank-you note:** add a short thank-you where the donation appeal used to be. Thank the donors, and the people who played and helped. Only include facts you know to be true (what the money bought, when). Keep the names and amounts of individual donors off the site unless they said yes.
5. Check the preview, then publish.

Next year, you can bring all of this back by undoing the comments and updating the numbers and words.

## Credits and licence

The design is **Multiverse** by [HTML5 UP](https://html5up.net) (@ajlkn), used under the Creative Commons Attribution 3.0 licence (CC BY 3.0). The full licence is in `LICENSE.txt`. Please leave that file as it is.

The licence requires that we credit the designer. The footer on every page does this with "Design: HTML5 UP", and it comes from `assets/js/nav.js`. **Please do not remove that credit** when you edit the footer.

Other things the template uses: [jQuery](https://jquery.com), [Poptrox](https://github.com/ajlkn/jquery.poptrox) (the photo pop-up), [Responsive Tools](https://github.com/ajlkn/responsive-tools) and [Font Awesome](https://fontawesome.com) (icons). The original demo images were from Unsplash and are not part of this site.

## Keeping this README current

If you change how the site works (add a page, a script, a folder, a button, or a new way of doing a job), please update this README in the same pull request. Short and accurate beats long and out of date. This guide describes the site as it is on `main` today.
