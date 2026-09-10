// Portfolio website JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Alien text flicker effect for card fan
    let flickerCount = 0;

    function toggleLanguage() {
        const englishElements = document.querySelectorAll('.card-fan .english-text');
        const alienElements = document.querySelectorAll('.card-fan .alien-text');

        // Show Alien text (hide English)
        englishElements.forEach(el => el.style.display = 'none');
        alienElements.forEach(el => el.style.display = 'block');

        // Random duration for Alien text between 100ms and 500ms
        const alienDuration = Math.random() * 400 + 100;

        // After the random duration, switch back to English
        setTimeout(() => {
            englishElements.forEach(el => el.style.display = 'block');
            alienElements.forEach(el => el.style.display = 'none');
            decideNextFlicker();
        }, alienDuration);
    }

    function decideNextFlicker() {
        flickerCount++;

        // 50% chance to immediately flicker again
        if (flickerCount === 1 && Math.random() < 0.5) {
            const quickDelay = Math.random() * 75 + 75;
            setTimeout(toggleLanguage, quickDelay);
            return;
        }

        // 25% chance for third flicker
        if (flickerCount === 2 && Math.random() < 0.25) {
            const quickDelay = Math.random() * 50 + 50;
            setTimeout(toggleLanguage, quickDelay);
            return;
        }

        flickerCount = 0;
        scheduleNextFlicker();
    }

    function scheduleNextFlicker() {
        const nextFlickerDelay = Math.random() * 1500 + 1500;
        setTimeout(toggleLanguage, nextFlickerDelay);
    }

    // Start the language flicker effect
    const initialDelay = Math.random() * 1000 + 1000;
    setTimeout(toggleLanguage, initialDelay);

    // Epsilon IV text carousel
    const epsilonCarousel = document.getElementById('epsilon-carousel');
    if (epsilonCarousel) {
        const items = epsilonCarousel.querySelectorAll('.carousel-item');
        const leftArrow = epsilonCarousel.querySelector('.carousel-arrow-left');
        const rightArrow = epsilonCarousel.querySelector('.carousel-arrow-right');
        let currentIndex = 0;

        function updateEpsilonCarousel() {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === currentIndex);
            });
            leftArrow.classList.toggle('hidden', currentIndex === 0);
            rightArrow.classList.toggle('hidden', currentIndex === items.length - 1);
        }

        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateEpsilonCarousel();
            }
        });

        rightArrow.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateEpsilonCarousel();
            }
        });

        updateEpsilonCarousel();
    }

    // Gif carousel
    const carousel = document.querySelector('.gif-carousel');
    const carouselLinks = document.querySelectorAll('.carousel-link');

    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;

        // Store original src and clear non-active slides to prevent simultaneous playback
        slides.forEach((slide, i) => {
            slide.dataset.src = slide.src;
            if (i !== 0) {
                slide.src = '';
            }
        });

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.src = '';
            });
            carouselLinks.forEach(link => link.classList.remove('active'));

            slides[index].src = slides[index].dataset.src;
            slides[index].classList.add('active');
            carouselLinks[index].classList.add('active');
            currentIndex = index;
        }

        carouselLinks.forEach(link => {
            link.addEventListener('click', () => {
                const index = parseInt(link.dataset.slide);
                showSlide(index);
            });
        });

        // Expose showSlide globally for external control
        window.carouselShowSlide = showSlide;
    }

});
