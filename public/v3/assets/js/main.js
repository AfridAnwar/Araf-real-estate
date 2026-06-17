/**
 * Araf Real Estate V2 - Main Interaction Script
 * Handles Lenis smooth scroll, GSAP animations, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Keep ScrollTrigger in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 1.5 Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            lenis.stop();
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            lenis.start();
        });
    }
    // 2. Preloader & Swiper Hero
    const initHeroAnimation = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

        // Ensure initial states
        gsap.set('.logo img', { opacity: 0, y: -20 });
        gsap.set('.hero-content, .hero-project-logo, .hero-metadata, .hero-ctas', { opacity: 0, y: 30 });

        tl.to('.curtain.left', {
            xPercent: -100,
            duration: 1.5
        }, "+=0.2")
            .to('.curtain.right', {
                xPercent: 100,
                duration: 1.5
            }, "<")
            .to('.preloader', {
                display: "none"
            }, "<")
            .to('.logo img', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=1")
            .to('.hero-content, .hero-project-logo, .hero-metadata, .hero-ctas', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.5");
    };

    if (document.querySelector('.hero-slider')) {
        initHeroAnimation();

        let thumbsSwiper, heroSwiper;

        const initSwipers = () => {
            if (thumbsSwiper) thumbsSwiper.destroy(true, true);
            if (heroSwiper) heroSwiper.destroy(true, true);

            thumbsSwiper = new Swiper('.hero-thumbs-slider', {
                slidesPerView: 3,
                spaceBetween: 10,
                centeredSlides: true,
                loop: true,
                loopedSlides: 7,
                slideToClickedSlide: true, // Clicking a thumb centers it instantly
                breakpoints: {
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 3 }
                }
            });

            heroSwiper = new Swiper('.hero-slider', {
                speed: 1200,
                parallax: true,
                loop: true,
                loopedSlides: 7,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });

            // Perfect Bi-directional Sync
            heroSwiper.on('slideChange', function () {
                if (thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper.realIndex !== this.realIndex) {
                    thumbsSwiper.slideToLoop(this.realIndex);
                }
            });

            thumbsSwiper.on('slideChange', function () {
                if (heroSwiper && !heroSwiper.destroyed && heroSwiper.realIndex !== this.realIndex) {
                    heroSwiper.slideToLoop(this.realIndex);
                }
            });
        };

        initSwipers();

        // Update Swipers cleanly on language change to prevent fade corruption
        window.addEventListener('languageChanged', () => {
            initSwipers();
        });
    } else {
        // Just show logo on other pages
        gsap.set('.logo img', { opacity: 1, y: 0 });
    }


    // 3. Header Scroll Transition
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // 4. GSAP Scroll Reveals
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach((elem) => {
        gsap.fromTo(elem,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", // Trigger when top of element is 85% down viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Image Parallax
    const parallaxImages = document.querySelectorAll('[data-speed]');
    parallaxImages.forEach(img => {
        gsap.to(img, {
            yPercent: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * 50,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });


    // 5. Horizontal Pin-Scroll (Communities Gallery)
    const galleryWrap = document.querySelector('.pin-gallery-wrap');
    const scrollArea = document.querySelector('.gallery-scroll-area');

    if (galleryWrap && scrollArea && window.innerWidth > 768) {
        // Calculate total scroll distance
        const getScrollAmount = () => {
            let scrollWidth = scrollArea.scrollWidth;
            let amount = scrollWidth - window.innerWidth + document.querySelector('.gallery-content-left').offsetWidth + 40;
            // Reverse direction if in RTL mode
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            return isRTL ? amount : -amount;
        };

        const tween = gsap.to(scrollArea, {
            x: getScrollAmount,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: galleryWrap,
            start: "top top",
            // Multiply by 1.5 to require more scrolling, slowing the animation down.
            // Math.abs ensures positive values in RTL mode.
            end: () => `+=${Math.abs(getScrollAmount()) * 1.5}`,
            pin: true,
            animation: tween,
            // Reduce scrub to 0.5 to remove 'delay' feeling while keeping it smooth with Lenis
            scrub: 0.5,
            invalidateOnRefresh: true
        });
    }


    // 6. Services Ticker Hover Image Effect
    const serviceRows = document.querySelectorAll('.service-row');
    const hoverImgWrap = document.getElementById('service-hover-img');

    if (serviceRows.length > 0 && hoverImgWrap && window.innerWidth > 768) {
        const hoverImg = hoverImgWrap.querySelector('img');

        // Create GSAP quick setters for performance
        const xTo = gsap.quickTo(hoverImgWrap, "left", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(hoverImgWrap, "top", { duration: 0.4, ease: "power3" });

        let isHovering = false;

        document.addEventListener("mousemove", (e) => {
            if (isHovering) {
                xTo(e.clientX);
                yTo(e.clientY);
            }
        });

        serviceRows.forEach(row => {
            row.addEventListener('mouseenter', (e) => {
                isHovering = true;
                const imgSrc = row.getAttribute('data-img');
                if (imgSrc) hoverImg.src = imgSrc;

                // Set initial position immediately without animation to prevent flying in from corner
                gsap.set(hoverImgWrap, { left: e.clientX, top: e.clientY });

                gsap.to(hoverImgWrap, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
            });

            row.addEventListener('mouseleave', () => {
                isHovering = false;
                gsap.to(hoverImgWrap, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
            });
        });
    }


    // 7. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats-bar');

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');

                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2.5,
                        ease: "power2.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function () {
                            counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                        }
                    });
                });
            }
        }, { threshold: 0.5 });

        counterObserver.observe(statsSection);
    }
});

// 8. Video Lightbox Functions
window.openLightbox = function () {
    const lightbox = document.getElementById('video-lightbox');
    const video = document.getElementById('araf-video');
    if (lightbox && video) {
        lightbox.style.display = 'flex';
        gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        video.play();
    }
};

window.closeLightbox = function () {
    const lightbox = document.getElementById('video-lightbox');
    const video = document.getElementById('araf-video');
    if (lightbox && video) {
        gsap.to(lightbox, {
            opacity: 0, duration: 0.3, onComplete: () => {
                lightbox.style.display = 'none';
            }
        });
        video.pause();
        video.currentTime = 0;
    }
};
