# Castañas Game - Project DNA

## /init

### Project Overview
A sophisticated drag-and-drop browser game where players feed chestnuts to a person by dragging them into their open mouth within a 20-second time limit. Built with vanilla HTML5, CSS3, and JavaScript with a classy, elegant design aesthetic. Features 10 chestnuts total with perfect score detection.

### Design Philosophy
**Classy & Elegant**: The game features a sophisticated design with:
- Deep forest green background (#06402B)
- Large faded cursive "Castañas" watermark using Dancing Script font
- Glass-morphism UI elements with frosted effects
- Playfair Display serif typography for refined appearance
- Smooth animations and subtle interactions
- Performance-optimized for responsive gameplay

### Project Structure
```
castana-project/
├── index.html          # Main game page with complete structure
├── css/
│   └── styles.css      # Complete styling with classy design
├── js/
│   └── game.js         # Full game logic implementation
├── assets/
│   └── images/         # Image assets folder (unused - CSS-only design)
└── CLAUDE.md           # This file - project DNA
```

### Current Implementation Status

#### ✅ Completed Features
- **Complete Game Implementation**: Fully functional drag-and-drop game
- **10 Chestnuts**: All draggable with fixed, reliable positioning
- **20-Second Timer**: Visual countdown with warning states
- **Perfect Score Detection**: "Just like the Romans!" message when all 10 chestnuts fed
- **Dual End States**: Timer expiry ("Time to take vinitos!") vs perfect score
- **Visual Feedback**: Particle effects, animations, score pop effects
- **Mobile Support**: Touch events and responsive design
- **Game State Management**: Proper start, play, reset cycle
- **Performance Optimized**: Removed lag-causing animations

#### 🎮 Core Game Features
- **Drag & Drop**: Precise cursor tracking with fixed offset calculation
- **Collision Detection**: Chestnut position-based (not cursor-based) for accuracy
- **Timer System**: 20-second countdown with orange/red warning states
- **Score Tracking**: Real-time updates with visual feedback
- **Game Controls**: Start button and play again functionality
- **Instructions**: Clear on-screen guidance that auto-hides during play

#### 🎨 Visual Design Elements
- **Elegant UI**: Glass-morphism header with frosted effects
- **Person Target**: Centered face with open mouth, positioned lower for better UX
- **Chestnuts**: Brown gradient design with green leaf details
- **Animations**: Feeding animation, particle bursts, score scaling
- **Watermark**: Large "Castañas" text behind gameplay
- **Responsive**: Mobile-optimized layouts and touch interactions

### Game Mechanics

#### Core Gameplay
1. **Start**: Click START button or drag any chestnut to begin
2. **Timer**: 20-second countdown with visual warnings at 5s (orange) and 3s (red)
3. **Feeding**: Drag chestnuts to mouth area (expanded hit zone for usability)
4. **Scoring**: +1 point per successful feed, real-time score updates
5. **Win Condition**: Feed all 10 chestnuts = "Just like the Romans!"
6. **Time Up**: Regular game over = "Time to take vinitos!"
7. **Reset**: Play Again button restores all chestnuts and resets game state

#### Technical Implementation
- **Chestnut Tracking**: 10 total chestnuts with `chestnutsEaten` counter
- **Positioning**: Fixed CSS positions for reliability (no dynamic randomization)
- **Drag Mechanics**: Precise offset calculation preserving click position
- **Drop Detection**: 30px padding around mouth for better UX
- **State Management**: Clean separation of game states (waiting/playing/ended)

### Key Design Elements

#### Color Palette
- **Primary Background**: #06402B (deep forest green)
- **UI Elements**: Glass-morphism with white transparency and backdrop blur
- **Timer Colors**: 
  - Normal: #8B4513 (brown)
  - Warning: #FF6B35 (orange)
  - Critical: #FF4444 (red)
- **Score**: #06402B (dark green) with #32CD32 (lime) pop effect
- **Particles**: Golden yellow (#FFD700) with random hue variations

#### Typography
- **Primary Font**: 'Playfair Display' (serif) - sophisticated, readable
- **Watermark Font**: 'Dancing Script' (cursive) - elegant, decorative
- **Font Weights**: 400-700 range for proper hierarchy
- **Text Effects**: Subtle shadows and letter spacing

#### Layout Specifications
- **Game Container**: Max 1200x800px, centered with rounded corners
- **Header**: 90px height with glass blur effect
- **Person**: 140px head diameter, positioned at bottom center
- **Chestnuts**: 38px diameter, strategically positioned to avoid overlaps
- **Drop Zone**: 40x28px mouth with 30px padding for detection

### Component Architecture

#### HTML Structure
- `#game-container` - Main wrapper with background
- `#background-text` - "Castañas" watermark element
- `#game-ui` - Header with timer, button, score
- `#game-area` - Play area containing all interactive elements
- `#person` + `#person-mouth` - Target with drop zone
- `#chestnut-1` through `#chestnut-10` - All draggable elements
- `#success-particles` - Particle effect container
- `#game-over-screen` - End game modal

#### JavaScript Classes
- `CastanasGame` - Main game controller class
- Core methods: `startGame()`, `endDrag()`, `handleSuccessfulDrop()`, `resetGame()`
- State tracking: `gameStarted`, `gameEnded`, `chestnutsEaten`, `timeLeft`
- Event handling: Mouse and touch events for cross-platform support

### Performance Optimizations
- **Removed Complex Animations**: Simplified hover/drag effects to eliminate lag
- **Efficient Particle System**: Reduced particle count and optimized cleanup
- **Fixed Positioning**: Eliminated dynamic positioning calculations
- **Minimal Transitions**: Removed unnecessary CSS transitions during drag

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ required)
- **Mobile Support**: iOS Safari, Chrome Mobile, Android browsers
- **Touch Events**: Full touch/gesture support for mobile gameplay
- **Responsive Design**: Adapts to various screen sizes automatically

### Development Workflow
- **Phase-based Development**: Built incrementally to manage complexity
- **Performance Focus**: Optimized for smooth 60fps gameplay
- **Cross-platform Testing**: Works on desktop and mobile browsers
- **No Dependencies**: Pure vanilla JavaScript implementation

### Game Balance
- **Timer**: 20 seconds provides good challenge without frustration
- **Chestnuts**: 10 total creates engaging difficulty curve
- **Hit Detection**: Generous mouth area (70x58px effective) for good UX
- **Perfect Score**: Achievable but challenging reward system

### Commands
- **Play**: Open `index.html` in any modern web browser
- **Mobile**: Access via phone browser for touch controls
- **No Build Process**: Direct file access, no compilation needed

---
*Last Updated: Complete Game Implementation - All Features Functional*
*Version: 1.0 - Production Ready*