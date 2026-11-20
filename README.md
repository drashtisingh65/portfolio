# Drashti Singh - Portfolio

Vanilla HTML5 / CSS3 / JavaScript. No build step, no frameworks.

```
drashti-portfolio/
├── index.html
├── css/style.css
├── js/main.js          <- certificate data lives here
├── assets/
│   ├── certificates/   <- your 5 certificate images
│   └── profile.jpg     <- (add your photo)
└── README.md
```

## Run locally
Open `index.html` in a browser, or run `python -m http.server 8000` in this folder and visit http://localhost:8000.

## Customize
- **Photo:** save as `assets/profile.jpg`, then uncomment the `<img>` line in the `.avatar` block of `index.html`.
- **LinkedIn / GitHub:** replace `href="#"` on the `#linkedin` and `#github` links in `index.html`.
- **Certificates:** edit the `CERTS` array at the top of `js/main.js` (add image to `assets/certificates/`). The SIH 2026 certificate shows no date, so only the year is listed; edit if you wish.
- **Colors:** change the variables at the top of `css/style.css`.

## Make the contact form work
Until configured, the form opens the visitor's email app (mailto fallback).
1. Create a free form at https://formspree.io using drashtisingh65@gmail.com.
2. Copy your form ID and replace `YOUR_FORM_ID` in the `<form action>` in `index.html`.
(On Netlify you can alternatively add `data-netlify="true"` and `name="contact"` to the form.)

## Deploy
**Netlify:** go to app.netlify.com/drop and drag the whole folder in. Or connect a GitHub repo (no build command, publish directory `.`).
**Vercel:** push to GitHub, click "Add New Project", import the repo, Framework Preset "Other", and Deploy.
