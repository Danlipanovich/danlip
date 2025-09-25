// AI-Enhanced Header scroll effect with advanced animations
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const header = document.getElementById('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mobile stability: keep header pinned; avoid hide/show animations on small screens
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// AI-Enhanced Parallax effect for hero section
function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Disable parallax on mobile to prevent layout jitter; avoid scaling to keep width stable
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        if (isMobile) {
            hero.style.transform = 'none';
        } else {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
}

window.addEventListener('scroll', updateParallax);

// Set a CSS variable with the current header height for precise mobile menu placement
function setHeaderHeightVar() {
    const header = document.getElementById('header');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--mobile-header-h', h + 'px');
}

window.addEventListener('load', setHeaderHeightVar);
window.addEventListener('resize', setHeaderHeightVar);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// AI-Enhanced scroll animations with advanced effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // AI-Enhanced staggered animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                const cards = document.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationDelay = `${index * 0.15}s`;
                        card.classList.add('visible');
                        
                        // Add floating effect
                        card.addEventListener('mouseenter', () => {
                            card.style.animation = 'cardFloat 2s ease-in-out infinite';
                        });
                        
                        card.addEventListener('mouseleave', () => {
                            card.style.animation = 'cardStackAnimation 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                        });
                    }, index * 150);
                });
            }
            
            // AI-Enhanced counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            // Disable testimonial carousel trigger to avoid turn-based highlighting
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// AI-Enhanced testimonial carousel
// Disabled testimonial carousel to prevent alternating highlight
function startTestimonialCarousel() { return; }

// AI-Enhanced floating animation for cards
function addFloatingEffect() {
    const cards = document.querySelectorAll('.feature-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'cardFloat 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = 'none';
        });
    });
}

// AI-Enhanced performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'assets/css/main.css',
        'assets/css/components.css',
        'assets/css/responsive.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize advanced animations
function initializeAnimations() {
    // Add hover effects to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to feature icons
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Initialize mobile gestures
function initializeMobileGestures() {
    // Add swipe gestures for testimonials
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        let startX = 0;
        let scrollLeft = 0;
        
        testimonialsGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });
        
        testimonialsGrid.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });
    }
}

// Initialize performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'assets/css/main.css',
        'assets/css/components.css',
        'assets/css/responsive.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Modal functions
function openSignupForm() {
    document.getElementById('signupModal').classList.add('active');
}

function openContactForm() {
    document.getElementById('contactModal').classList.add('active');
}

function openGuideForm(guideType) {
    const modal = document.getElementById('guideModal');
    const titleEl = document.getElementById('guideTitle');
    const subtitleEl = document.getElementById('guideSubtitle');
    const typeEl = document.getElementById('guideType');
    
    const guides = {
        'market-analysis': {
            title: 'Download: Market Analysis Guide',
            subtitle: 'Learn professional techniques for analyzing markets independently'
        },
        'ai-trading': {
            title: 'Download: AI Trading Guide',
            subtitle: 'Discover why AI is critical for modern trading success'
        },
        'ai-future': {
            title: 'Download: AI Evolution Report',
            subtitle: 'Explore how AI will transform trading in the next decade'
        },
        'risk-management': {
            title: 'Download: Risk Management Guide',
            subtitle: 'Master proven strategies to protect your capital'
        },
        'beginners-guide': {
            title: 'Download: Beginner\'s Trading Guide',
            subtitle: 'Start your trading journey with confidence'
        },
        'technical-analysis': {
            title: 'Download: Technical Analysis Secrets',
            subtitle: 'Advanced techniques for professional-level analysis'
        }
    };
    
    if (guides[guideType]) {
        titleEl.textContent = guides[guideType].title;
        subtitleEl.textContent = guides[guideType].subtitle;
        typeEl.value = guideType;
    }
    
    modal.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openTool(toolType) {
    alert(`${toolType.replace('-', ' ').toUpperCase()} will open here. This is a placeholder for the interactive tool.`);
}

function openPricingPage() {
    alert('Pricing page will open here. For now, contact us for pricing information.');
}

function toggleVideo() {
    const video = document.getElementById('heroVideo');
    const overlay = document.querySelector('.video-overlay');
    const playButton = document.getElementById('playButton');
    
    if (video.paused) {
        video.play();
        overlay.classList.add('hidden');
    } else {
        video.pause();
        overlay.classList.remove('hidden');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Initialize video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const overlay = document.querySelector('.video-overlay');
    const playButton = document.getElementById('playButton');
    
    if (video) {
        // Video event listeners
        video.addEventListener('play', function() {
            overlay.classList.add('hidden');
        });
        
        video.addEventListener('pause', function() {
            overlay.classList.remove('hidden');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        video.addEventListener('ended', function() {
            overlay.classList.remove('hidden');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        // Ensure video starts muted and autoplay
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
    }

    // Headline sync: if GSAP present, sync wave and mask timeline precisely
    try {
        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            tl.fromTo('#headline-wave-path', { strokeDashoffset: 620 }, { strokeDashoffset: 0, duration: 1.6, delay: 0.2 }, 0)
              .fromTo('.headline-reveal', { WebkitMaskSize: '0% 100%', maskSize: '0% 100%', opacity: 0 }, { WebkitMaskSize: '100% 100%', maskSize: '100% 100%', opacity: 1, duration: 1.6, delay: 0.2 }, 0);

            // Card 1: radial progress semi-circle fill
            const radialPath = document.querySelector('#radial-progress-bar');
            if (radialPath) {
                const length = radialPath.getTotalLength ? radialPath.getTotalLength() : 400;
                radialPath.style.strokeDasharray = `0 ${length}`;
                gsap.to(radialPath, {
                    strokeDasharray: `${length} ${length}`,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '#how-card-1',
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.5
                    }
                });
            }

            // Card 2: line graph draw + moving dot
            const line1 = document.querySelector('#line-graph-1');
            const dot1 = document.querySelector('#line-graph-1-dot');
            if (line1) {
                const total = 1000;
                gsap.fromTo(line1, { strokeDasharray: `0 ${total}` }, {
                    strokeDasharray: `${total} ${total}`,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '#how-card-2',
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.5
                    }
                });
                if (dot1) {
                    gsap.fromTo(dot1, { x: 0, y: 0 }, {
                        x: 280,
                        y: -60,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#how-card-2',
                            start: 'top center',
                            end: 'bottom center',
                            scrub: 0.5
                        }
                    });
                }
            }

            // Card 3: upward line graph draw + moving dot
            const line2 = document.querySelector('#line-graph-2');
            const dot2 = document.querySelector('#line-graph-2-dot');
            if (line2) {
                const total2 = 1000;
                gsap.fromTo(line2, { strokeDasharray: `0 ${total2}` }, {
                    strokeDasharray: `${total2} ${total2}`,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '#how-card-3',
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.5
                    }
                });
                if (dot2) {
                    gsap.fromTo(dot2, { x: 0, y: 0 }, {
                        x: 280,
                        y: -100,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#how-card-3',
                            start: 'top center',
                            end: 'bottom center',
                            scrub: 0.5
                        }
                    });
                }
            }

            // Card container fade/slide animations
            gsap.utils.toArray('.how-card').forEach((card, i) => {
                gsap.fromTo(card, { autoAlpha: 0, y: 60 }, {
                    duration: 0.8,
                    autoAlpha: 1,
                    y: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    }
                });
            });
            
        } else {
            // Fallback: IntersectionObserver to trigger CSS classes
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    if (el.id === 'how-card-1') {
                        const p = document.querySelector('#radial-progress-bar');
                        if (p) p.style.strokeDasharray = '400 400';
                    }
                    if (el.id === 'how-card-2') {
                        const l = document.querySelector('#line-graph-1');
                        if (l) l.style.strokeDasharray = '1000 1000';
                    }
                    if (el.id === 'how-card-3') {
                        const l2 = document.querySelector('#line-graph-2');
                        if (l2) l2.style.strokeDasharray = '1000 1000';
                    }
                    io.unobserve(el);
                });
            }, { threshold: 0.5 });
            ['how-card-1','how-card-2','how-card-3'].forEach(id => {
                const node = document.getElementById(id);
                if (node) io.observe(node);
            });
        }
    } catch (e) {
        console.warn('How It Works animations fallback', e);
    }
});

// Form submissions
function submitSignupForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        setTimeout(() => {
            closeModal('signupModal');
            alert('Welcome to Insight X! Check your email for login instructions.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }, 2000);
}

function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Scheduled!';
        setTimeout(() => {
            closeModal('contactModal');
            alert('Demo scheduled! Our team will contact you within 24 hours.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }, 2000);
}

function submitGuideForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent to Email!';
        setTimeout(() => {
            closeModal('guideModal');
            alert('Guide sent to your email! Check your inbox for the download link.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }, 2000);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('form-modal')) {
        event.target.classList.remove('active');
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.form-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Mobile navigation toggle
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add mobile nav toggle button if on mobile
if (window.innerWidth <= 768) {
    const nav = document.querySelector('.nav');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.onclick = toggleMobileNav;
    nav.appendChild(navToggle);
}

        console.log('🚀 Insight X - AI-Enhanced Landing Page Loaded Successfully!');
        
        // Initialize AI-enhanced animations
        initializeAnimations();
        
        // Initialize mobile gestures
        initializeMobileGestures();
        
        // Initialize performance optimizations
        optimizePerformance();
        
        // Initialize floating effects
        addFloatingEffect();
        
        // Initialize testimonial carousel
        startTestimonialCarousel();
