# Castañas Game - Project DNA

## /init

### Project Overview
A sophisticated drag-and-drop browser game where players feed chestnuts to a person by dragging them into their open mouth within a 10-second time limit. Built with vanilla HTML5, CSS3, and JavaScript with a classy, elegant design aesthetic.

### Design Philosophy
**Classy & Elegant**: The game features a sophisticated design with:
- Deep forest green background (#06402B)
- Large faded cursive "Castañas" watermark using Dancing Script font
- Glass-morphism UI elements with frosted effects
- Playfair Display serif typography for refined appearance
- Smooth animations and subtle interactions

### Project Structure
```
castana-project/
├── index.html          # Main game page with HTML structure
├── css/
│   └── styles.css      # Complete styling with classy design
├── js/
│   └── game.js         # Game logic (to be implemented)
├── assets/
│   └── images/         # Image assets folder
└── CLAUDE.md           # This file - project DNA
```

### Current Implementation Status

#### ✅ Completed Features
- **Project Structure**: All folders and basic files created
- **HTML Structure**: Complete game layout with proper IDs and classes
- **Visual Design**: Fully styled classy interface with:
  - Elegant header with timer, start button, and score
  - Large cursive "Castañas" background watermark
  - Centered person target with realistic head and open mouth
  - 6 scattered chestnuts with leaf details
  - Responsive design for mobile devices

#### 🔄 In Development
- Game functionality (JavaScript implementation pending)

#### 📋 Pending Features
- Drag and drop mechanics
- Timer countdown system
- Score tracking
- Collision detection
- Game state management
- Audio/visual feedback

### Key Design Elements

#### Color Palette
- **Primary Background**: #06402B (deep forest green)
- **UI Elements**: Glass-morphism with white transparency
- **Text Colors**: 
  - Timer: #8B4513 (brown)
  - Score: #06402B (dark green)
  - Button: White with transparency
- **Accents**: Subtle white borders and shadows

#### Typography
- **Primary Font**: 'Playfair Display' (serif) - for UI elements
- **Watermark Font**: 'Dancing Script' (cursive) - for background text
- **Font Weights**: 400-700 range for hierarchy

#### Layout
- **Game Container**: Centered, max 1200x800px with rounded corners
- **Header**: 90px height with glass effect
- **Person Target**: Centered bottom, 140px head diameter
- **Chestnuts**: 38px diameter, scattered positioning
- **Watermark**: Large responsive text, faded white, centered

### Component Architecture

#### HTML Elements
- `#game-container` - Main wrapper
- `#background-text` - Watermark element
- `#game-ui` - Header with controls
- `#game-area` - Play area
- `#person` + `#person-mouth` - Target elements
- `.chestnut` classes - Draggable elements

#### CSS Classes
- `.target-area` - Person styling
- `.drop-zone` - Mouth target area
- `.game-button` - Button styling
- `.chestnut` + `.draggable` - Chestnut elements

### Technical Requirements
- **Framework**: Vanilla JavaScript (no dependencies)
- **Browser Support**: Modern browsers with CSS Grid/Flexbox
- **Responsive**: Mobile-first approach
- **Performance**: Smooth 60fps animations
- **Accessibility**: Proper contrast and interaction states

### Game Mechanics (Planned)
1. **Timer System**: 10-second countdown
2. **Drag & Drop**: Mouse/touch support for chestnuts
3. **Collision Detection**: Accurate mouth targeting
4. **Score System**: Real-time counter
5. **Game States**: Waiting → Playing → Game Over
6. **Visual Feedback**: Animations for successful feeds

### Development Notes
- Built in phases to manage complexity
- Focus on elegant, refined user experience
- Maintain classy aesthetic throughout development
- Prioritize smooth interactions and visual polish

### Commands
- **Development**: Open `index.html` in browser
- **Testing**: No specific commands yet (vanilla HTML/CSS/JS)

---
*Last Updated: Phase 1 Complete - HTML/CSS Foundation*