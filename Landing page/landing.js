document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const hero = document.querySelector('.hero');

    let isScrolling;
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function () {
            checkScroll();
        }, 100);
    });


    function checkScroll() {
        const aboutContainer = document.querySelector('.container-three');
        const aboutContainerTop = aboutContainer.offsetTop;
        
        if (window.scrollY >= aboutContainerTop - navbar.offsetHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.carousel-slider');
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth;
    const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
    let totalWidth = (slideWidth + slideMargin * 2) * slides.length;

    // Clone slides for infinite effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    let position = 0;
    let speed = 0.5;

    function slide() {
        position -= speed;
        
        if (position <= -totalWidth) {
            position += totalWidth;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${position}px)`;
            // Force reflow
            slider.offsetHeight;
            slider.style.transition = 'transform 0.5s ease';
        } else {
            slider.style.transform = `translateX(${position}px)`;
        }
        
        requestAnimationFrame(slide);
    }

    // Start the animation
    slide();

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        speed = 0;
    });

    slider.addEventListener('mouseleave', () => {
        speed = 0.5;
    });

    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].offsetWidth;
        const newTotalWidth = (newSlideWidth + slideMargin * 2) * slides.length;
        position = (position / totalWidth) * newTotalWidth;
        totalWidth = newTotalWidth;
    });
});

const reviewers = [
    {
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-Hks2NLicPlGjMLwJfpzue03tcO3o2c.png',
        name: 'Maria Clara',
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-Hks2NLicPlGjMLwJfpzue03tcO3o2c.png',
        name: 'John Smith',
        review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-Hks2NLicPlGjMLwJfpzue03tcO3o2c.png',
        name: 'Emma Wilson',
        review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-Hks2NLicPlGjMLwJfpzue03tcO3o2c.png',
        name: 'Michael Brown',
        review: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
];

class ReviewSlider {
    constructor(reviewers) {
        this.reviewers = reviewers;
        this.currentIndex = 0;
        this.slider = document.querySelector('.review-slider');
        this.reviewerName = document.querySelector('.reviewer-name');
        this.reviewerText = document.querySelector('.reviewer-text');
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        
        this.reviewers.forEach((reviewer, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `<img src="${reviewer.image}" alt="Reviewer ${index + 1}">`;
            this.slider.appendChild(item);
        });

        this.items = Array.from(document.querySelectorAll('.review-item'));
        this.updateSlider();
    }

    setupEventListeners() {
        document.querySelector('.btn-prev').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.btn-next').addEventListener('click', () => this.navigate(1));
        
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const diff = index - this.currentIndex;
                if (diff !== 0) this.navigate(diff);
            });
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.reviewers.length) % this.reviewers.length;
        this.updateSlider();
    }

    updateSlider() {
        this.items.forEach((item, index) => {
            item.className = 'review-item';
            const position = (index - this.currentIndex + this.reviewers.length) % this.reviewers.length;
            
            if (position === 0) item.classList.add('current');
            else if (position === 1) item.classList.add('right');
            else if (position === this.reviewers.length - 1) item.classList.add('left');
        });

        const currentReviewer = this.reviewers[this.currentIndex];
        this.reviewerName.textContent = currentReviewer.name;
        this.reviewerText.textContent = currentReviewer.review;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ReviewSlider(reviewers);
});



const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 
});

document.querySelectorAll('.travel-item').forEach((item) => {
    observer.observe(item);
});