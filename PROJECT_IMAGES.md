# Adding project images

Each project supports **1 to 5 images**. The gallery layout changes automatically based on how many valid images are listed.

## 1. Add the files

Put images in the project's public folder:

```text
public/projects/cheretanet/
public/projects/reunite/
public/projects/bikattech/
public/projects/greateam-ems/
```

Use `.webp`, `.jpg`, or `.png`. Descriptive filenames are easiest to maintain:

```text
public/projects/cheretanet/live-lot.webp
public/projects/cheretanet/payment-flow.webp
```

## 2. List them in the project data

Open `src/data/projects.js` and add entries to the `images` array:

```js
images: [
  {
    src: "/projects/cheretanet/live-lot.webp",
    alt: "Live auction lot with the current bid and countdown",
    caption: "Live lot view",
  },
  {
    src: "/projects/cheretanet/payment-flow.webp",
    alt: "Payment confirmation screen",
    caption: "Payment and transaction history",
  },
],
```

The component uses the first `5` entries and ignores entries without a `src`.

## Layout behavior

| Images | Layout |
| --- | --- |
| 1 | Full-width feature image |
| 2 | Two equal columns |
| 3 | One wide feature image, two below |
| 4 | Two-by-two grid |
| 5 | One wide feature image, four below |

On small screens every layout becomes a single column.

## Where images appear

- The gallery sits directly below the project header and above the overview.
- Each image can be opened in a full-screen lightbox.
- The first image is also used as the project's Open Graph image when present.
