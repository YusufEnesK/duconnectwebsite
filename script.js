let previousScreen = 'screen-home';

function changeScreen(targetScreenId) {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id !== 'screen-menu') {
        previousScreen = activeScreen.id;
    }

    // Update screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(targetScreenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Show/hide global top hamburger and bottom nav when on menu screen
    const globalHamburger = document.getElementById('globalHamburger');
    const globalBottomNav = document.querySelector('.global-bottom-nav');
    
    if (targetScreenId === 'screen-menu') {
        if (globalHamburger) globalHamburger.style.display = 'none';
        if (globalBottomNav) globalBottomNav.style.display = 'none';
    } else {
        if (globalHamburger) globalHamburger.style.display = 'block';
        if (globalBottomNav) globalBottomNav.style.display = 'block';
    }
}

function openMenu() {
    changeScreen('screen-menu');
}

function closeMenu() {
    changeScreen(previousScreen || 'screen-home');
}

function closeDemoPopup() {
    const popup = document.getElementById('interactiveDemoPopup');
    if (popup) {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(8px) scale(0.95)';
        popup.style.pointerEvents = 'none';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 320);
    }
}

// Throttled & Passive Scroll Effect Handler
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            
            // Navbar background
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollY > 50) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(15, 23, 42, 0.9)';
                    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }
            }

            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// Mobile Menu Functions
function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function closeMobileMenu() {
    document.getElementById('navLinks').classList.remove('active');
}


// ==================== Arena Winners System ====================
const arenaGalleryData = {
  "26-bahar": {
    ogrenci: [
      {
        img: "images/arena/ogrenci.jpg",
        title: "🥇 Şampiyonlar Kürsüsü (İlk 3)",
        badge: "Dönem Şampiyonları"
      },
      {
        img: "images/arena/ogrenci-pro.jpg",
        title: "⭐ DüConnect Pro Üyelik Kazananlar",
        badge: "4 - 10. Sıra Kazananları"
      }
    ],
    topluluk: [
      {
        img: "images/arena/topluluk.jpg",
        title: "🏛️ En Aktif Öğrenci Toplulukları",
        badge: "Topluluk Liderleri"
      }
    ],
    sponsors: [
      { img: "images/arena/sponsor-1.jpg", title: "Serbay Interactive" },
      { img: "images/arena/sponsor-2.jpg", title: "Ödül Sponsorumuz" },
      { img: "images/arena/sponsor-3.jpg", title: "Ödül Sponsorumuz" }
    ]
  },
  "26-guz": {
    message: "🏆 26-Güz Dönemi rekabeti tüm hızıyla devam ediyor! Sen de hemen uygulamayı indirerek ders notu paylaş, etkileşime gir ve dönem sonundaki büyük ödül havuzundan payını al!",
    ogrenci: [],
    topluluk: [],
    sponsors: []
  }
};

let currentSemester = "26-bahar";
let currentCategory = "ogrenci";

function renderArena(semester, category) {
    const data = arenaGalleryData[semester];
    if (!data) return;

    // Update semester buttons
    document.querySelectorAll('.semester-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.semester === semester);
    });

    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    const catItems = data[category];
    const galleryContainer = document.getElementById('arena-gallery');
    
    if (galleryContainer) {
        if (data.message) {
            galleryContainer.innerHTML = '<div class="arena-message"><h3>' + data.message + '</h3></div>';
        } else if (catItems && catItems.length > 0) {
            galleryContainer.innerHTML = catItems.map(item => `
                <div class="poster-card-fancy" onclick="openArenaLightbox('${item.img}')" title="Büyütmek için tıklayın">
                    <div class="poster-header">
                        <span class="poster-chip">${item.title}</span>
                        <span class="poster-zoom-hint">🔍 İncele</span>
                    </div>
                    <div class="poster-img-container">
                        <img src="${item.img}" alt="${item.title}" class="gallery-img">
                    </div>
                </div>
            `).join('');
        } else {
            galleryContainer.innerHTML = '';
        }
    }

    const sponsorsHeader = document.getElementById('arena-sponsors-header');
    const sponsorsContainer = document.getElementById('arena-sponsors-gallery');
    
    if (sponsorsContainer) {
        if (data.sponsors && data.sponsors.length > 0) {
            if(sponsorsHeader) sponsorsHeader.style.display = 'block';
            sponsorsContainer.innerHTML = data.sponsors.map(s => `
                <div class="gallery-image-wrapper sponsor-img-wrapper" onclick="openArenaLightbox('${s.img}')" title="Büyütmek için tıklayın">
                    <img src="${s.img}" alt="${s.title}" class="gallery-img">
                </div>
            `).join('');
        } else {
            if(sponsorsHeader) sponsorsHeader.style.display = 'none';
            sponsorsContainer.innerHTML = '';
        }
    }

    currentSemester = semester;
    currentCategory = category;

    if (window.lucide) {
        lucide.createIcons();
    }
}

function openArenaLightbox(imgSrc) {
    let lightbox = document.getElementById('arenaLightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'arenaLightbox';
        lightbox.className = 'arena-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content" onclick="event.stopPropagation()">
                <button class="lightbox-close" onclick="closeArenaLightbox()">&times;</button>
                <img src="" alt="Tam Boyut Görsel" class="lightbox-img" id="lightboxImg">
            </div>
        `;
        lightbox.onclick = closeArenaLightbox;
        document.body.appendChild(lightbox);
    }
    const imgElem = document.getElementById('lightboxImg');
    if (imgElem) imgElem.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeArenaLightbox() {
    const lightbox = document.getElementById('arenaLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchSemester(semester) {
    renderArena(semester, currentCategory);
}

function switchCategory(category) {
    renderArena(currentSemester, category);
}

// Initialize Arena, Stats, Instagram Feed, FAQ, Contact Form and Confetti
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('arena-gallery')) {
        renderArena(currentSemester, currentCategory);
    }
    initStatsCounters();
    loadInstagramFeed();
    initFAQ();
    initContactForm();
    initArenaConfetti();
    if (window.lucide) {
        lucide.createIcons();
    }
});

// ==================== Arena Championship Confetti System ====================
function triggerArenaConfetti(originX = 0.5, originY = 0.6) {
    if (typeof confetti !== 'function') return;

    confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: ['#FFD700', '#2563EB', '#F59E0B', '#10B981', '#FFFFFF'],
        disableForReducedMotion: true,
        zIndex: 9999
    });

    setTimeout(() => {
        confetti({
            particleCount: 30,
            angle: 60,
            spread: 55,
            origin: { x: Math.max(originX - 0.12, 0.1), y: originY },
            colors: ['#FFD700', '#3B82F6', '#FFA500'],
            disableForReducedMotion: true,
            zIndex: 9999
        });
        confetti({
            particleCount: 30,
            angle: 120,
            spread: 55,
            origin: { x: Math.min(originX + 0.12, 0.9), y: originY },
            colors: ['#FFD700', '#3B82F6', '#FFA500'],
            disableForReducedMotion: true,
            zIndex: 9999
        });
    }, 220);
}

function initArenaConfetti() {
    const arenaSection = document.getElementById('arena');
    if (!arenaSection) return;

    // 1. Auto-burst once when scrolling into Arena section
    let hasFiredOnScroll = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !hasFiredOnScroll) {
                hasFiredOnScroll = true;
                const rect = arenaSection.getBoundingClientRect();
                const centerY = (rect.top + rect.height * 0.35) / window.innerHeight;
                triggerArenaConfetti(0.5, Math.min(Math.max(centerY, 0.2), 0.7));
            }
        });
    }, {
        threshold: [0.35]
    });
    observer.observe(arenaSection);

    // 2. Interactive Click / Tap on Championship elements
    document.addEventListener('click', (e) => {
        const champTrigger = e.target.closest('.trophy-glow-badge, .prize-pill, .arena-championship-card, .poster-card-fancy');
        if (champTrigger) {
            const rect = champTrigger.getBoundingClientRect();
            const clickX = (rect.left + rect.width / 2) / window.innerWidth;
            const clickY = (rect.top + rect.height / 2) / window.innerHeight;
            triggerArenaConfetti(clickX, clickY);
        }
    });
}

// ==================== Dark / Light Theme System ====================
function initTheme() {
    const savedTheme = localStorage.getItem('duconnect-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('duconnect-theme', newTheme);
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Run immediately for zero flash
initTheme();

// ==================== Animated Stats Counter ====================
function initStatsCounters() {
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length === 0) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statCards.forEach(card => {
                    const target = parseInt(card.getAttribute('data-target'), 10);
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    function updateNumber(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentVal = Math.floor(easeOut * target);

                        // Format for Turkish locale (e.g. 1.300)
                        card.textContent = currentVal.toLocaleString('tr-TR');

                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            card.textContent = target.toLocaleString('tr-TR');
                        }
                    }

                    requestAnimationFrame(updateNumber);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ==================== Custom Instagram Feed (Behold JSON) ====================
async function loadInstagramFeed() {
    const grid = document.getElementById('instagram-feed-grid');
    if (!grid) return;

    try {
        const response = await fetch('https://feeds.behold.so/992Ua5A2HxSakN9shLQ0');
        if (!response.ok) return;
        const data = await response.json();
        
        if (!data.posts || data.posts.length === 0) return;

        // Check if there is a newer post than what is statically cached
        const latestCachedUrl = 'https://www.instagram.com/p/DcLaiytNojo/';
        if (data.posts[0].permalink === latestCachedUrl) {
            // Static local cache is already up-to-date! Keep instant local images intact.
            return;
        }

        // Take the latest 6 posts if a new post was released
        const posts = data.posts.slice(0, 6);
        let html = '';

        posts.forEach(post => {
            const imgUrl = post.mediaUrl || post.sizes?.large?.mediaUrl || post.sizes?.medium?.mediaUrl;
            const caption = post.prunedCaption || post.caption || '';
            const likes = post.likeCount || 0;
            const comments = post.commentsCount || 0;
            const isCarousel = post.mediaType === 'CAROUSEL_ALBUM';

            html += `
                <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" class="ig-card">
                    <div class="ig-card-media">
                        <img src="${imgUrl}" alt="DuConnect Instagram Gönderisi" decoding="async">
                        ${isCarousel ? '<div class="ig-card-badge"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="6" y="2" rx="2"/><path d="M2 6v14a2 2 0 0 0 2 2h14"/></svg> Çoklu</div>' : ''}
                        <div class="ig-card-overlay">
                            <div class="ig-card-stats">
                                <div class="ig-stat-item">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                    <span>${likes}</span>
                                </div>
                                <div class="ig-stat-item">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                    <span>${comments}</span>
                                </div>
                            </div>
                            <div class="ig-card-caption">${caption}</div>
                        </div>
                    </div>
                    <div class="ig-card-footer">
                        <div class="ig-card-footer-user">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary-color)" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            <span>@duconnectresmi</span>
                        </div>
                        <div class="ig-card-footer-btn">
                            İncele &rarr;
                        </div>
                    </div>
                </a>
            `;
        });

        grid.innerHTML = html;
    } catch (err) {
        // Silently preserve pre-rendered HTML on network delay/failure
        console.warn('Instagram feed background update failed:', err);
    }
}

// ==================== Instant Zero-Lag FAQ Accordion ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ==================== Back to Top Button Logic ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== Ajax Contact Form Handler ====================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Gönderiliyor...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/duconnectresmi@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success === "true" || result.success === true || response.ok) {
                const container = contactForm.parentElement;
                container.innerHTML = `
                    <div style="background: #ffffff; padding: 48px 32px; border-radius: 28px; text-align: center; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04); border: 1px solid rgba(15, 23, 42, 0.05);">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.12); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px auto; font-weight: 800;">✓</div>
                        <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Mesajınız Başarıyla İletildi!</h3>
                        <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; max-width: 440px; margin: 0 auto 24px auto;">Teşekkür ederiz. İlettiğiniz mesaj ekibimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.</p>
                        <button onclick="location.reload()" class="btn btn-secondary" style="border-radius: 100px; padding: 12px 28px; font-weight: 700;">Yeni Mesaj Gönder</button>
                    </div>
                `;
            } else {
                throw new Error(result.message || 'Gönderim başarısız');
            }
        } catch (error) {
            console.warn('AJAX gönderimi yapılamadı, doğrudan form gönderimi yapılıyor...', error);
            // If browser blocks fetch on local files, submit natively
            contactForm.submit();
        }
    });
}
