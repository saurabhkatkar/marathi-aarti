# मराठी आरती संग्रह | Marathi Aarti Collection

A beautiful, modern web application to display traditional Marathi devotional aartis with an elegant UI/UX design.

## Features

- 🎨 **Beautiful Design**: Modern, responsive UI with gradient backgrounds and smooth animations
- 🔍 **Search & Filter**: Search through aartis by title or content, filter by categories
- ❤️ **Favorites**: Mark your favorite aartis and access them easily
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🎭 **Categories**: Organized by deity categories (Ganesh, Vitthal, Krishna, etc.)
- 🔊 **Audio Ready**: Prepared for text-to-speech integration
- 📋 **Copy & Share**: Easy copying and sharing of aarti content
- 🌐 **Bilingual**: Marathi and English interface

## Categories Included

- गणेश (Ganesh) - 7 aartis
- विठ्ठल (Vitthal) - 5 aartis  
- शंकर (Shankar) - 3 aartis
- कृष्ण (Krishna) - 5 aartis
- राम (Ram) - 5 aartis
- हनुमान (Hanuman) - 1 aarti
- दुर्गा (Durga) - 1 aarti
- अंबा (Amba) - 1 aarti
- गंगा (Ganga) - 1 aarti
- भागवत (Bhagavat) - 1 aarti
- लोटांगण (Lotangan) - 1 aarti
- मंत्र (Mantra) - 1 aarti

**Total: 32 Traditional Marathi Aartis**

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Noto Sans Devanagari (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marathi-aarti-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Marathi font setup
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main application page
├── components/
│   ├── AartiDetail.tsx      # Modal for detailed aarti view
│   └── FavoritesPage.tsx    # Favorites management page
└── data/
    └── comprehensive_marathi_arati_final.json  # Aarti data
```

## Features in Detail

### Search & Filter
- Real-time search through aarti titles and content
- Category-based filtering
- Bilingual search support

### Favorites System
- Heart icon to mark favorites
- Dedicated favorites page
- Remove individual or all favorites

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized for all screen sizes

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- High contrast colors
- Screen reader friendly

## Customization

### Adding New Aartis
Edit `src/data/comprehensive_marathi_arati_final.json` to add new aartis:

```json
{
  "title": "नवीन आरती",
  "content": "आरतीचा मजकूर...",
  "category": "गणेश",
  "language": "marathi",
  "source": "traditional",
  "type": "devotional"
}
```

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Add new gradient backgrounds in the CSS file

### Categories
Add new categories by updating the `categoryColors` object in components.

## Future Enhancements

- [ ] Text-to-speech integration
- [ ] Audio playback controls
- [ ] Print functionality
- [ ] Dark mode toggle
- [ ] Offline support (PWA)
- [ ] User accounts and cloud sync
- [ ] Aarti timing and calendar integration
- [ ] Social sharing features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Traditional Marathi aarti collection sourced from authentic sources
- Noto Sans Devanagari font by Google Fonts
- Icons by Lucide React
- Animations by Framer Motion

---

**नमस्कार! (Namaskar!)** 

This application is created with love and respect for Marathi culture and traditions. May it help preserve and share the beautiful devotional heritage of Maharashtra.

🙏 **जय महाराष्ट्र! जय भारत!** 🙏