// carousel.js

class Carousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            autoplay: options.autoplay || false,
            interval: options.interval || 3000,
            showDots: options.showDots !== false,
            showControls: options.showControls !== false,
            infinite: options.infinite !== false,
            ...options
        };

        this.currentIndex = 0;
        this.slides = [];
        this.isPlaying = false;
        this.intervalId = null;

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupDots();

        if (this.options.autoplay) {
            this.play();
        }

        this.updateDisplay();
    }

    setupElements() {
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track?.children || []);
        this.prevButton = this.container.querySelector('.carousel-prev');
        this.nextButton = this.container.querySelector('.carousel-next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
    }

    setupEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }

        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        this.setupTouchEvents();
        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => {
            if (this.options.autoplay) this.play();
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pause();
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                isDragging = false;
            }
        });

        this.track.addEventListener('touchend', () => {
            if (this.options.autoplay) this.play();
        });
    }

    setupDots() {
        if (!this.options.showDots || !this.dotsContainer || this.slides.length <= 1) {
            return;
        }

        this.dotsContainer.innerHTML = this.slides.map((_, index) => `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" 
                    data-index="${index}" 
                    aria-label="Go to slide ${index + 1}"></button>
        `).join('');

        this.dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });
    }

    updateDisplay() {
        if (!this.track || this.slides.length === 0) return;

        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
        if (dots) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }

        this.prevButton.disabled = this.currentIndex === 0 && !this.isInfinite();
        this.nextButton.disabled = this.currentIndex === this.slides.length - 1 && !this.isInfinite();
    }

    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        } else if (this.isInfinite()) {
            this.currentIndex = 0;
        }

        this.updateDisplay();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.isInfinite()) {
            this.currentIndex = this.slides.length - 1;
        }

        this.updateDisplay();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateDisplay();
        }
    }

    play() {
        if (this.isPlaying || this.slides.length <= 1) return;

        this.isPlaying = true;
        this.intervalId = setInterval(() => this.nextSlide(), this.options.interval);
    }

    pause() {
        this.isPlaying = false;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    isInfinite() {
        return this.options.infinite;
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
        const options = {
            autoplay: carousel.dataset.autoplay === 'true',
            interval: parseInt(carousel.dataset.interval) || 3000,
            showDots: carousel.dataset.showDots !== 'false',
            showControls: carousel.dataset.showControls !== 'false',
            infinite: carousel.dataset.infinite !== 'false'
        };
        
        new Carousel(carousel.id, options);
    });
});
