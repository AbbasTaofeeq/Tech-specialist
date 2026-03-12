document.addEventListener('DOMContentLoaded', () => {
    // ── Scroll reveals ──
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach((el) => observer.observe(el));
    }

    // ── Sticky CTA ──
    const stickyCta = document.getElementById('stickyCta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            stickyCta.classList.toggle('show', window.scrollY > 600);
        });
    }

    // ── Nav scroll styling ──
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // ── Coming Soon links ──
    document.querySelectorAll('.coming-soon-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('comingSoon')?.classList.add('active');
        });
    });

    // ── Exec chart bars ──
    const execBars = document.getElementById('execChartBars');
    if (execBars) {
        const heights = [30, 45, 35, 55, 40, 70, 52, 65, 48, 80, 62, 90];
        heights.forEach((h, i) => {
            const bar = document.createElement('div');
            bar.className = `bar${i === heights.length - 1 ? ' active' : ''}`;
            bar.style.height = `${h}%`;
            execBars.appendChild(bar);
        });
    }

    // ── Smooth scroll for anchor links ──
    const navLinks = document.getElementById('navLinks');
    const navHamburger = document.getElementById('navHamburger');

    function closeMobileMenu() {
        navLinks?.classList.remove('open');
        navHamburger?.classList.remove('active');
        navHamburger?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (!id || id === '#') return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            if (window.innerWidth <= 960) {
                closeMobileMenu();
            }
        });
    });

    // ── Count-up animation for outcomes ──
    function countUp(el, target, suffix, duration = 1200) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start = Math.min(start + step, target);
            el.innerHTML = Math.floor(start) + suffix;
            if (start >= target) clearInterval(timer);
        }, 16);
    }

    const outcomesGrid = document.querySelector('.outcomes-grid');
    if (outcomesGrid) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const nums = entry.target.querySelectorAll('.outcome-num');
                nums.forEach((n) => {
                    const text = n.textContent.trim();
                    if (text.includes('%')) countUp(n, parseInt(text, 10), '%');
                    else if (text.includes('×')) countUp(n, parseInt(text, 10), '×');
                });

                statsObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        statsObserver.observe(outcomesGrid);
    }

    // ── Testimonials carousel ──
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = track.querySelectorAll('.testimonial');

        const isMobile = () => window.innerWidth <= 960;
        const visibleCount = () => (isMobile() ? 1 : 2);
        const getMaxIndex = () => Math.max(0, cards.length - visibleCount());

        function updateDots() {
            if (!dotsContainer) return;
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
            const firstCard = cards[0];
            const gap = 20;
            const cardWidth = firstCard ? firstCard.offsetWidth + gap : 0;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            updateDots();
        }

        function buildDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const count = getMaxIndex() + 1;

            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        buildDots();
        goTo(0);

        window.addEventListener('resize', () => {
            currentIndex = 0;
            buildDots();
            goTo(0);
        });
    }

    // ── Partner slider duplication ──
    const partnersTrack = document.getElementById('partnersTrack') || document.querySelector('.partners-track');
    if (partnersTrack && !partnersTrack.dataset.duplicated) {
        partnersTrack.innerHTML += partnersTrack.innerHTML;
        partnersTrack.dataset.duplicated = 'true';
    }

    // ── Team track duplication ──
    const teamTrack = document.getElementById('teamTrack');
    if (teamTrack && !teamTrack.dataset.duplicated) {
        teamTrack.innerHTML += teamTrack.innerHTML;
        teamTrack.dataset.duplicated = 'true';
    }

    // ── Navbar + Robinah chatbot ──
    const navChatbotToggle = document.getElementById('navChatbotToggle');
    const navChatbotDropdown = document.getElementById('navChatbotDropdown');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    function openMobileMenu() {
        navLinks?.classList.add('open');
        navHamburger?.classList.add('active');
        navHamburger?.setAttribute('aria-expanded', 'true');
        closeChatbotWindow();
    }

    function toggleMobileMenu() {
        if (!navLinks || !navHamburger) return;

        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openChatbotWindow() {
        if (!navChatbotDropdown) return;
        navChatbotDropdown.classList.remove('hidden');
        navChatbotDropdown.setAttribute('aria-hidden', 'false');
        navChatbotToggle?.setAttribute('aria-expanded', 'true');
        if (window.innerWidth <= 960) {
            closeMobileMenu();
        }
        setTimeout(() => chatInput?.focus(), 80);
    }

    function closeChatbotWindow() {
        if (!navChatbotDropdown) return;
        navChatbotDropdown.classList.add('hidden');
        navChatbotDropdown.setAttribute('aria-hidden', 'true');
        navChatbotToggle?.setAttribute('aria-expanded', 'false');
    }

    function toggleChatbotWindow() {
        if (!navChatbotDropdown) return;
        const isHidden = navChatbotDropdown.classList.contains('hidden');
        if (isHidden) openChatbotWindow();
        else closeChatbotWindow();
    }

    if (navHamburger) {
        navHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (navChatbotToggle) {
        navChatbotToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleChatbotWindow();
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener('click', (e) => {
            e.stopPropagation();
            closeChatbotWindow();
        });
    }

    function appendUserMessage(message) {
        if (!chatMessages) return;
        const userMsg = document.createElement('div');
        userMsg.className = 'mb-4';
        userMsg.innerHTML = `
            <div class="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-xl text-sm ml-8 shadow-sm border border-gray-300">
                You: ${message}
            </div>
        `;
        chatMessages.appendChild(userMsg);
    }

    function appendBotMessage(message) {
        if (!chatMessages) return;
        const botMsg = document.createElement('div');
        botMsg.className = 'mb-4';
        botMsg.innerHTML = `
            <div class="bg-gradient-to-r from-blue/15 to-blue/10 text-blue-dark p-3 rounded-xl text-sm font-medium shadow-sm border border-blue/20">
                Robinah: ${message}
            </div>
        `;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const botReplies = [
        "Thank you for reaching out. I can help you understand our executive intelligence solutions.",
        "We help organisations turn fragmented operational data into clear executive insights using Microsoft tools they already own.",
        "Our work is built for government MDAs, international NGOs, and private sector organisations across Africa.",
        "A typical transformation can go live in 10 weeks, with no need to buy new software.",
        "You can start with a free discovery call and we will map your key operational bottlenecks."
    ];

    function handleChatSend() {
        const message = chatInput?.value.trim();
        if (!message || !chatMessages) return;

        appendUserMessage(message);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
        setTimeout(() => {
            appendBotMessage(reply);
        }, 700);
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', handleChatSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChatSend();
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (
            navChatbotDropdown &&
            !navChatbotDropdown.contains(e.target) &&
            !navChatbotToggle?.contains(e.target)
        ) {
            closeChatbotWindow();
        }

        if (
            navLinks &&
            navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navHamburger?.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            closeMobileMenu();
        }
    });
});