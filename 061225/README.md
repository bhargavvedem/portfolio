# Portfolio Website - Vedem Bhargav Reddy

A personal portfolio website built with vanilla HTML, CSS, and JavaScript. Zero dependencies, lightweight, and fully responsive.

## 📂 Project Structure

```
vedem_portfolio/
├── index.html       # Main HTML file (Semantic markup)
├── styles.css       # Main CSS file (Theming, Responsive Grid)
├── script.js        # JavaScript (Interactivity)
├── assets/
│   └── profile.jpg  # Profile picture
└── README.md        # This file
```

## 🚀 Features

- **Responsive Design**: Adapts to mobile, tablet, and desktop screens.
- **Theme Toggle**: Light and Dark mode support (persists preference).
- **Interactive Projects**: Modal view for project details.
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support.
- **Performance**: Vanilla JS/CSS for minimal load times.

## 🛠️ Customization

1. **Colors**: Open `styles.css` and modify the `--hue` variable at the top to change the primary color theme instantly.
2. **Content**: Edit `index.html` to update text. Project details for modals are stored in the `<script id="projects-data">` tag at the bottom of `index.html`.
3. **Images**: Add new images to `assets/` and update `src` attributes.

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Create a new repository on GitHub (e.g., `my-portfolio`).
2. Push this code to the repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```
3. Go to **Settings > Pages**.
4. Select `main` branch as the source and click **Save**.
5. Your site will be live at `https://yourusername.github.io/repo-name`.

### Netlify / Vercel
1. Drag and drop the `vedem_portfolio` folder onto the Netlify/Vercel dashboard.
2. It will deploy instantly.
