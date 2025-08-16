// Castañas Game JavaScript

class CastanasGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 20;
        this.gameStarted = false;
        this.gameEnded = false;
        this.timerInterval = null;
        this.visibilityCheckInterval = null;
        this.totalChestnuts = 10;
        this.chestnutsEaten = 0;
        
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start-button');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.finalScoreElement = document.getElementById('final-score');
        this.playAgainButton = document.getElementById('play-again-button');
        this.instructionsElement = document.getElementById('instructions');
        this.dropZone = document.getElementById('person-mouth');
        this.chestnuts = document.querySelectorAll('.chestnut');
        this.particlesContainer = document.getElementById('success-particles');
        this.draggedElement = null;
        this.dragOffset = { x: 0, y: 0 };
        
        // Store original positions to prevent disappearing
        this.originalPositions = new Map();
        
        this.initGame();
    }
    
    initGame() {
        this.setupDragAndDrop();
        this.setupDropZone();
        this.setupButtons();
        this.updateDisplay();
    }
    
    setupButtons() {
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.playAgainButton.addEventListener('click', this.resetGame.bind(this));
    }
    
    startGame() {
        if (this.gameStarted) return;
        
        this.gameStarted = true;
        this.gameEnded = false;
        this.startButton.style.display = 'none';
        this.instructionsElement.classList.add('hidden');
        this.startTimer();
        this.startVisibilityCheck();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    startVisibilityCheck() {
        this.visibilityCheckInterval = setInterval(() => {
            this.checkChestnutVisibility();
        }, 500); // Check every 500ms
    }
    
    checkChestnutVisibility() {
        if (!this.gameStarted || this.gameEnded) return;
        
        this.chestnuts.forEach(chestnut => {
            // Skip chestnuts that have been eaten
            if (chestnut.style.display === 'none' && chestnut.classList.contains('feeding')) {
                return;
            }
            
            // If a chestnut is invisible but shouldn't be, restore it
            if ((chestnut.style.display === 'none' || chestnut.style.opacity === '0') && 
                !chestnut.classList.contains('feeding')) {
                console.warn('Restoring invisible chestnut:', chestnut.id);
                this.restoreChestnutVisibility(chestnut);
            }
        });
    }
    
    restoreChestnutVisibility(chestnut) {
        const originalPos = this.originalPositions.get(chestnut.id);
        
        chestnut.style.display = 'block';
        chestnut.style.opacity = '1';
        chestnut.style.position = 'absolute';
        chestnut.style.zIndex = '10';
        chestnut.style.pointerEvents = 'auto';
        chestnut.classList.remove('dragging');
        
        // Restore position
        if (originalPos) {
            if (originalPos.left !== 'auto' && originalPos.left !== '0px') {
                chestnut.style.left = originalPos.left;
                chestnut.style.right = 'auto';
            } else if (originalPos.right !== 'auto' && originalPos.right !== '0px') {
                chestnut.style.right = originalPos.right;
                chestnut.style.left = 'auto';
            } else {
                if (originalPos.calculatedRight < originalPos.calculatedLeft) {
                    chestnut.style.right = originalPos.calculatedRight + 'px';
                    chestnut.style.left = 'auto';
                } else {
                    chestnut.style.left = originalPos.calculatedLeft + 'px';
                    chestnut.style.right = 'auto';
                }
            }
            
            if (originalPos.top !== 'auto') {
                chestnut.style.top = originalPos.top;
            } else {
                chestnut.style.top = originalPos.calculatedTop + 'px';
            }
        }
    }
    
    updateTimerDisplay() {
        this.timerElement.textContent = this.timeLeft;
        
        this.timerElement.classList.remove('warning', 'critical');
        
        if (this.timeLeft <= 3) {
            this.timerElement.classList.add('critical');
        } else if (this.timeLeft <= 5) {
            this.timerElement.classList.add('warning');
        }
    }
    
    endGame() {
        this.gameEnded = true;
        this.gameStarted = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        if (this.visibilityCheckInterval) {
            clearInterval(this.visibilityCheckInterval);
            this.visibilityCheckInterval = null;
        }
        
        this.disableChestnuts();
        this.showGameOver();
    }
    
    disableChestnuts() {
        this.chestnuts.forEach(chestnut => {
            chestnut.style.pointerEvents = 'none';
            chestnut.style.opacity = '0.5';
        });
    }
    
    showGameOver() {
        this.finalScoreElement.textContent = this.score;
        
        // Reset message to default for time-up scenarios
        const gameOverMessage = document.querySelector('.game-over-message');
        gameOverMessage.textContent = 'Time to take vinitos!';
        
        this.gameOverScreen.classList.remove('hidden');
    }
    
    resetGame() {
        this.score = 0;
        this.timeLeft = 20;
        this.gameStarted = false;
        this.gameEnded = false;
        this.chestnutsEaten = 0;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        if (this.visibilityCheckInterval) {
            clearInterval(this.visibilityCheckInterval);
            this.visibilityCheckInterval = null;
        }
        
        this.updateDisplay();
        this.resetChestnuts();
        this.gameOverScreen.classList.add('hidden');
        this.instructionsElement.classList.remove('hidden');
        this.startButton.style.display = 'block';
        this.timerElement.classList.remove('warning', 'critical');
        this.scoreElement.classList.remove('score-pop');
    }
    
    resetChestnuts() {
        this.chestnuts.forEach(chestnut => {
            // Restore original position from stored values
            const originalPos = this.originalPositions.get(chestnut.id);
            
            chestnut.style.display = 'block';
            chestnut.style.opacity = '1';
            chestnut.style.transform = '';
            chestnut.style.position = 'absolute';
            chestnut.style.zIndex = '10';
            chestnut.style.pointerEvents = 'auto';
            
            // Restore original positioning with multiple fallback methods
            if (originalPos) {
                // Try computed styles first
                if (originalPos.left !== 'auto' && originalPos.left !== '0px') {
                    chestnut.style.left = originalPos.left;
                    chestnut.style.right = 'auto';
                } else if (originalPos.right !== 'auto' && originalPos.right !== '0px') {
                    chestnut.style.right = originalPos.right;
                    chestnut.style.left = 'auto';
                } else {
                    // Fallback to calculated positions
                    if (originalPos.calculatedRight < originalPos.calculatedLeft) {
                        chestnut.style.right = originalPos.calculatedRight + 'px';
                        chestnut.style.left = 'auto';
                    } else {
                        chestnut.style.left = originalPos.calculatedLeft + 'px';
                        chestnut.style.right = 'auto';
                    }
                }
                
                if (originalPos.top !== 'auto') {
                    chestnut.style.top = originalPos.top;
                } else {
                    chestnut.style.top = originalPos.calculatedTop + 'px';
                }
            }
            
            chestnut.classList.remove('dragging', 'feeding');
        });
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
    }
    
    setupDragAndDrop() {
        this.chestnuts.forEach(chestnut => {
            // Ensure chestnut is visible and positioned first
            chestnut.style.display = 'block';
            chestnut.style.position = 'absolute';
            chestnut.style.pointerEvents = 'auto';
            chestnut.style.opacity = '1';
            chestnut.style.transform = '';
            chestnut.style.zIndex = '10';
            
            // Force a reflow to ensure computed styles are accurate
            chestnut.offsetHeight;
            
            // Store original computed position after ensuring proper display
            const computedStyle = window.getComputedStyle(chestnut);
            const rect = chestnut.getBoundingClientRect();
            const containerRect = chestnut.parentElement.getBoundingClientRect();
            
            // Store both computed styles and calculated positions for redundancy
            this.originalPositions.set(chestnut.id, {
                left: computedStyle.left,
                top: computedStyle.top,
                right: computedStyle.right,
                // Also store calculated positions relative to container
                calculatedLeft: rect.left - containerRect.left,
                calculatedTop: rect.top - containerRect.top,
                calculatedRight: containerRect.right - rect.right
            });
            
            chestnut.addEventListener('mousedown', this.handleMouseDown.bind(this));
            chestnut.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        });
        
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    
    setupDropZone() {
        this.dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dropZone.addEventListener('drop', this.handleDrop.bind(this));
    }
    
    handleMouseDown(e) {
        if (this.gameEnded) return;
        e.preventDefault();
        
        if (!this.gameStarted) {
            this.startGame();
        }
        
        this.startDrag(e.target, e.clientX, e.clientY);
    }
    
    handleTouchStart(e) {
        if (this.gameEnded) return;
        e.preventDefault();
        e.stopPropagation();
        
        if (!this.gameStarted) {
            this.startGame();
        }
        
        const touch = e.touches[0];
        this.startDrag(e.target, touch.clientX, touch.clientY);
    }
    
    startDrag(element, clientX, clientY) {
        // Ensure element is visible before starting drag
        element.style.display = 'block';
        element.style.opacity = '1';
        
        this.draggedElement = element;
        const rect = element.getBoundingClientRect();
        
        // Calculate offset based on where the user clicked within the element
        this.dragOffset.x = clientX - rect.left;
        this.dragOffset.y = clientY - rect.top;
        
        element.style.zIndex = '1000';
        element.style.position = 'fixed';
        element.style.pointerEvents = 'none';
        element.classList.add('dragging');
        
        this.updateElementPosition(clientX, clientY);
    }
    
    handleMouseMove(e) {
        if (this.draggedElement && this.gameStarted) {
            this.updateElementPosition(e.clientX, e.clientY);
        }
    }
    
    handleTouchMove(e) {
        if (this.draggedElement && this.gameStarted) {
            e.preventDefault();
            e.stopPropagation();
            const touch = e.touches[0];
            this.updateElementPosition(touch.clientX, touch.clientY);
        }
    }
    
    updateElementPosition(clientX, clientY) {
        if (this.draggedElement) {
            this.draggedElement.style.left = (clientX - this.dragOffset.x) + 'px';
            this.draggedElement.style.top = (clientY - this.dragOffset.y) + 'px';
        }
    }
    
    handleMouseUp(e) {
        if (this.draggedElement && this.gameStarted) {
            this.endDrag(e.clientX, e.clientY);
        }
    }
    
    handleTouchEnd(e) {
        if (this.draggedElement && this.gameStarted) {
            e.preventDefault();
            e.stopPropagation();
            const touch = e.changedTouches[0];
            this.endDrag(touch.clientX, touch.clientY);
        }
    }
    
    endDrag(clientX, clientY) {
        if (!this.draggedElement || this.gameEnded) return;
        
        const dropZoneRect = this.dropZone.getBoundingClientRect();
        const currentDraggedElement = this.draggedElement; // Store reference before clearing
        
        if (this.isInsideDropZone(clientX, clientY, dropZoneRect)) {
            this.handleSuccessfulDrop();
        } else {
            this.resetChestnutPosition();
        }
        
        // Clean up drag state
        if (currentDraggedElement) {
            currentDraggedElement.style.pointerEvents = 'auto';
            currentDraggedElement.classList.remove('dragging');
            // Ensure the element is visible after drag ends
            if (currentDraggedElement.style.display !== 'none') {
                currentDraggedElement.style.display = 'block';
                currentDraggedElement.style.opacity = '1';
            }
        }
        this.draggedElement = null;
    }
    
    isInsideDropZone(x, y, dropZoneRect) {
        if (!this.draggedElement) return false;
        
        // Get the chestnut's current position instead of cursor position
        const chestnutRect = this.draggedElement.getBoundingClientRect();
        const chestnutCenterX = chestnutRect.left + chestnutRect.width / 2;
        const chestnutCenterY = chestnutRect.top + chestnutRect.height / 2;
        
        const padding = 30;
        return chestnutCenterX >= dropZoneRect.left - padding && 
               chestnutCenterX <= dropZoneRect.right + padding && 
               chestnutCenterY >= dropZoneRect.top - padding && 
               chestnutCenterY <= dropZoneRect.bottom + padding;
    }
    
    handleSuccessfulDrop() {
        if (!this.draggedElement) return;
        
        const elementToFeed = this.draggedElement;
        
        elementToFeed.classList.remove('dragging');
        elementToFeed.classList.add('feeding');
        
        // Store reference to hide the element after animation
        setTimeout(() => {
            if (elementToFeed && elementToFeed.parentNode) {
                elementToFeed.style.display = 'none';
                elementToFeed.style.opacity = '0';
            }
        }, 600);
        
        this.chestnutsEaten++;
        this.updateScore();
        this.addFeedbackAnimation();
        this.createParticles();
        
        // Check if all chestnuts are eaten
        if (this.chestnutsEaten >= this.totalChestnuts) {
            this.endGameWithPerfectScore();
        }
    }
    
    endGameWithPerfectScore() {
        this.gameEnded = true;
        this.gameStarted = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.disableChestnuts();
        this.showPerfectScore();
    }
    
    showPerfectScore() {
        this.finalScoreElement.textContent = this.score;
        
        // Change the message to congratulations
        const gameOverMessage = document.querySelector('.game-over-message');
        gameOverMessage.textContent = 'Just like the Romans!';
        
        this.gameOverScreen.classList.remove('hidden');
    }
    
    resetChestnutPosition() {
        if (!this.draggedElement) return;
        
        const originalPos = this.originalPositions.get(this.draggedElement.id);
        
        this.draggedElement.classList.remove('dragging');
        this.draggedElement.style.zIndex = '10';
        this.draggedElement.style.pointerEvents = 'auto';
        this.draggedElement.style.position = 'absolute';
        this.draggedElement.style.display = 'block';
        this.draggedElement.style.opacity = '1';
        
        // Restore to original position using multiple fallback methods
        if (originalPos) {
            // Try computed styles first
            if (originalPos.left !== 'auto' && originalPos.left !== '0px') {
                this.draggedElement.style.left = originalPos.left;
                this.draggedElement.style.right = 'auto';
            } else if (originalPos.right !== 'auto' && originalPos.right !== '0px') {
                this.draggedElement.style.right = originalPos.right;
                this.draggedElement.style.left = 'auto';
            } else {
                // Fallback to calculated positions
                if (originalPos.calculatedRight < originalPos.calculatedLeft) {
                    this.draggedElement.style.right = originalPos.calculatedRight + 'px';
                    this.draggedElement.style.left = 'auto';
                } else {
                    this.draggedElement.style.left = originalPos.calculatedLeft + 'px';
                    this.draggedElement.style.right = 'auto';
                }
            }
            
            if (originalPos.top !== 'auto') {
                this.draggedElement.style.top = originalPos.top;
            } else {
                this.draggedElement.style.top = originalPos.calculatedTop + 'px';
            }
        }
    }
    
    updateScore() {
        this.score++;
        this.scoreElement.textContent = this.score;
        
        this.scoreElement.classList.add('score-pop');
        
        setTimeout(() => {
            this.scoreElement.classList.remove('score-pop');
        }, 400);
    }
    
    addFeedbackAnimation() {
        this.dropZone.classList.add('success');
        
        setTimeout(() => {
            this.dropZone.classList.remove('success');
        }, 600);
    }
    
    createParticles() {
        const mouthRect = this.dropZone.getBoundingClientRect();
        const containerRect = this.particlesContainer.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const startX = mouthRect.left - containerRect.left + mouthRect.width / 2;
            const startY = mouthRect.top - containerRect.top + mouthRect.height / 2;
            
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 15 + Math.random() * 20;
            const finalX = startX + Math.cos(angle) * distance;
            const finalY = startY + Math.sin(angle) * distance;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.background = `hsl(${45 + Math.random() * 30}, 70%, 60%)`;
            
            this.particlesContainer.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.left = finalX + 'px';
                particle.style.top = finalY + 'px';
            });
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDrop(e) {
        e.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Add small delay to ensure CSS is fully loaded
    setTimeout(() => {
        new CastanasGame();
    }, 100);
});