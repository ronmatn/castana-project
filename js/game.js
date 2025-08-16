// Castañas Game JavaScript

class CastanasGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 20;
        this.gameStarted = false;
        this.gameEnded = false;
        this.timerInterval = null;
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
            chestnut.style.display = 'block';
            chestnut.style.opacity = '1';
            chestnut.style.transform = '';
            chestnut.style.position = 'absolute';
            chestnut.style.zIndex = '10';
            chestnut.style.left = '';
            chestnut.style.top = '';
            chestnut.style.pointerEvents = 'auto';
            chestnut.classList.remove('dragging', 'feeding');
        });
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
    }
    
    setupDragAndDrop() {
        this.chestnuts.forEach(chestnut => {
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
        
        if (!this.gameStarted) {
            this.startGame();
        }
        
        const touch = e.touches[0];
        this.startDrag(e.target, touch.clientX, touch.clientY);
    }
    
    startDrag(element, clientX, clientY) {
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
            const touch = e.changedTouches[0];
            this.endDrag(touch.clientX, touch.clientY);
        }
    }
    
    endDrag(clientX, clientY) {
        if (!this.draggedElement || this.gameEnded) return;
        
        const dropZoneRect = this.dropZone.getBoundingClientRect();
        
        if (this.isInsideDropZone(clientX, clientY, dropZoneRect)) {
            this.handleSuccessfulDrop();
        } else {
            this.resetChestnutPosition();
        }
        
        if (this.draggedElement) {
            this.draggedElement.style.pointerEvents = 'auto';
            this.draggedElement.classList.remove('dragging');
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
        this.draggedElement.classList.remove('dragging');
        this.draggedElement.classList.add('feeding');
        
        setTimeout(() => {
            this.draggedElement.style.display = 'none';
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
        this.draggedElement.classList.remove('dragging');
        this.draggedElement.style.zIndex = '10';
        this.draggedElement.style.pointerEvents = 'auto';
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
    new CastanasGame();
});