
        // Scroll Progress Bar
        window.addEventListener('scroll', () => {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Disable Save & Print shortcuts
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && (e.key === "s" || e.key === "p")) {
                e.preventDefault();
            }
        });
        // Smooth Scroll
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

        // Form Submission
        const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
        e.target.reset();
    });
}


        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all experience items for animation
        document.querySelectorAll('.experience-item, .cert-card, .skill-category').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });

        

        // Animated Counter for Stats
        function animateCounter(element, target, duration = 6000) {
            const hasPlus = element.textContent.includes('+');
            const startTime = performance.now();
            const chars = '0123456789';
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (progress < 0.7) {
                    // Random numbers phase
                    const randomNum = Math.floor(Math.random() * 10);
                    element.textContent = randomNum + (hasPlus ? '+' : '');
                } else {
                    // Count to target smoothly
                    const eased = 1 - Math.pow(1 - (progress - 0.7) / 0.3, 3);
                    const current = Math.floor(eased * target);
                    element.textContent = current + (hasPlus ? '+' : '');
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target + (hasPlus ? '+' : '');
                }
            };
            
            requestAnimationFrame(animate);
        }

        
        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
            });

            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });

            // Close menu when clicking outside
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        // Observe stats for animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            const target = parseInt(stat.getAttribute('data-target'));
                            animateCounter(stat, target, 1500);
                        }, index * 200); // Stagger animation
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }
        // Disable right click
        document.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });

        // Disable Save & Print shortcuts
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && (e.key === "s" || e.key === "p")) {
                e.preventDefault();
            }
        });
const track = document.getElementById('carTrack');
const prevBtn = document.getElementById('carPrev');
const nextBtn = document.getElementById('carNext');

if (track && prevBtn && nextBtn) {
    const step = () => track.querySelector('.other-card').offsetWidth + 24;
    nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
}
window.addEventListener('load', () => {
    document.querySelectorAll('.marquee').forEach(marquee => {
        const track = marquee.querySelector('.marquee-track');
        const items = [...track.children];
        const groupW = track.scrollWidth;

        // repeat the cards until the row is always full
        const copies = Math.ceil(marquee.offsetWidth / groupW) + 1;
        for (let i = 0; i < copies; i++) {
            items.forEach(item => track.appendChild(item.cloneNode(true)));
        }

        track.style.setProperty('--shift', groupW + 'px');
        track.style.setProperty('--dur', (groupW / 40) + 's');
    });
});

const navLinks = document.querySelectorAll('.nav-links a');
const navSections = [...navLinks]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

navSections.forEach(section => navObserver.observe(section));

// typewriter name
document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('.sc-hero h1');
    if (!h1) return;

    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());

    const nodes = [...h1.childNodes];
    h1.textContent = '';
    const chars = [];

    nodes.forEach(node => {
        if (node.nodeName === 'BR') {
            h1.appendChild(document.createElement('br'));
            return;
        }
        [...node.textContent.replace(/\s+/g, ' ')].forEach(c => {
            const s = document.createElement('span');
            s.className = 'tw';
            s.setAttribute('aria-hidden', 'true');
            s.textContent = c;
            h1.appendChild(s);
            chars.push(s);
        });
    });

    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    h1.insertBefore(cursor, chars[0]);

    let i = 0;
    setTimeout(function type() {
        if (i < chars.length) {
            chars[i].classList.add('on');
            chars[i].after(cursor);
            i++;
            setTimeout(type, 90);
        } else {
            // keep blinking for a few seconds, then fade out
            setTimeout(() => cursor.classList.add('done'), 4000);
        }
    }, 700);
});
// highlight the nav link of the section you are viewing
(function () {
    const links = [...document.querySelectorAll('.nav-links a')];
    const items = links
        .map(a => ({ link: a, section: document.querySelector(a.getAttribute('href')) }))
        .filter(x => x.section);

    function update() {
        const y = window.scrollY + window.innerHeight * 0.35;
        let current = null;

        items.forEach(x => {
            if (x.section.offsetTop <= y) current = x;
        });

        links.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
})();

// close the mobile menu after tapping a link
document.querySelectorAll('.mm-list a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    });
});
// Other Projects carousel: works with any number of cards
(function () {
    const track = document.getElementById('carTrack');
    const prev  = document.getElementById('carPrev');
    const next  = document.getElementById('carNext');
    if (!track || !prev || !next) return;

    const wrap = track.closest('.carousel-wrap');

    function step() {
        const card = track.querySelector('.other-card');
        return card ? card.offsetWidth + 24 : 300;
    }

    function update() {
        const overflow = track.scrollWidth > track.clientWidth + 2;
        wrap.classList.toggle('no-scroll', !overflow);
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }

    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
})();
// ===== Skills orbit =====
(function () {
    const stage = document.getElementById('skStage');
    const panel = document.getElementById('skPanel');
    if (!stage || !panel) return;

    const DATA = {
        analyze: {
            n: '01', label: 'Analyze',
            group: 'Data Analytics & Business Intelligence',
            title: 'Turn data into insight.',
            desc: 'I work with data to find patterns, uncover opportunities, and communicate insights that support better decisions.',
            tools: ['Python', 'Microsoft Excel', 'Power BI', 'Data Analysis'],
            feat: {
                title: 'Customer Churn Analysis',
                desc: 'Analyzed telecom churn patterns and built interactive Power BI dashboards with DAX measures.',
                href: '#projects', cta: 'View project →'
            }
        },
        simulate: {
            n: '02', label: 'Simulate',
            group: 'Simulation & Modeling',
            title: 'Model real systems.',
            desc: 'I build simulation and design models to test changes and find bottlenecks before they reach the production floor.',
            tools: ['Arena by Rockwell', 'SolidWorks', 'COMSOL Multiphysics', 'AutoCAD'],
            feat: {
                title: 'Simulation of a Sewing Line',
                desc: '18-process RMG line modeled in Arena: 617.8 s average cycle time and 3 bottlenecks identified.',
                href: '#projects', cta: 'View project →'
            }
        },
        optimize: {
            n: '03', label: 'Optimize',
            group: 'Operations & Optimization',
            title: 'Find better decisions.',
            desc: 'I formulate and solve optimization problems to improve productivity, resource use, and flow in operations.',
            tools: ['Operations Research', 'Optimization', 'Machine Learning', 'Operations Management'],
            feat: {
                title: 'Bi-Objective Task Allocation',
                desc: 'Optimization model for RMG sewing lines, awarded Best Track Paper.',
                href: 'https://doi.org/10.46254/BA08.20250363', cta: 'Read paper →'
            }
        }
    };

    const $ = id => document.getElementById(id);
    const marks = document.querySelectorAll('.sk [data-key]');
    let current = null;
    let timer = null;

    function fill(key) {
        const d = DATA[key];
        $('skKicker').textContent = d.n + ' / ' + d.label.toUpperCase();
        $('skGroup').textContent = d.group;
        $('skTitle').textContent = d.title;
        $('skDesc').textContent = d.desc;
        $('skTools').innerHTML = d.tools.map(t => '<li><span>' + t + '</span><i></i></li>').join('');
        $('skFeatTitle').textContent = d.feat.title;
        $('skFeatDesc').textContent = d.feat.desc;
        $('skFeatCta').textContent = d.feat.cta;

        const a = $('skFeat');
        a.href = d.feat.href;
        if (d.feat.href.startsWith('http')) {
            a.target = '_blank';
            a.rel = 'noopener';
        } else {
            a.removeAttribute('target');
            a.removeAttribute('rel');
        }
    }

    function select(key, instant) {
        if (key === current) return;
        current = key;
        stage.dataset.active = key;

        marks.forEach(el => {
            const on = el.dataset.key === key;
            el.classList.toggle('on', on);
            if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', on);
        });

        clearTimeout(timer);
        if (instant) { fill(key); return; }

        panel.classList.add('swap');
        timer = setTimeout(() => {
            fill(key);
            panel.classList.remove('swap');
        }, 220);
    }

    document.querySelectorAll('.sk-node').forEach(btn => {
        btn.addEventListener('click', () => select(btn.dataset.key));
    });

    select('analyze', true);
})();

// ===== Skills: gear orbit =====
(function () {
    const stage = document.getElementById('ksStage');
    const panel = document.getElementById('ksPanel');
    if (!stage || !panel) return;

    // build the gear shapes (teeth are spaced so the gears mesh)
    function gearPath(cx, cy, n, phase) {
        const R = n * 3, Ro = R + 5, Rr = R - 6, p = 2 * Math.PI / n;
        let d = '';
        for (let k = 0; k < n; k++) {
            const c = phase * Math.PI / 180 + k * p;
            const pt = (r, a) => [(cx + r * Math.cos(c + a * p)).toFixed(2), (cy + r * Math.sin(c + a * p)).toFixed(2)];
            d += (k ? 'L' : 'M') + pt(Rr, -0.3) + 'L' + pt(Ro, -0.15) + 'L' + pt(Ro, 0.15) + 'L' + pt(Rr, 0.3);
            d += 'A' + Rr + ' ' + Rr + ' 0 0 1 ' + pt(Rr, 0.7);
        }
        return d + 'Z';
    }
    document.querySelectorAll('.gp').forEach(p => {
        p.setAttribute('d', gearPath(+p.dataset.cx, +p.dataset.cy, +p.dataset.n, +p.dataset.ph));
    });

    const DATA = {
        analyze: {
            n: '01', label: 'Analyze',
            group: 'Data Analytics & Business Intelligence',
            title: 'Turn data into insight.',
            desc: 'I work with data to find patterns, uncover opportunities, and communicate insights that support better decisions.',
            tools: ['Python', 'Microsoft Excel', 'Power BI', 'Data Analysis'],
            feat: {
                title: 'Customer Churn Analysis',
                desc: 'Telecom churn patterns and interactive Power BI dashboards with DAX measures.',
                href: '#projects', cta: 'Check the Projects section →'
            }
        },
        simulate: {
            n: '02', label: 'Simulate',
            group: 'Simulation & Modeling',
            title: 'Model real systems.',
            desc: 'I build simulation and design models to test changes and find bottlenecks before they reach the production floor.',
            tools: ['Arena by Rockwell', 'SolidWorks', 'COMSOL Multiphysics', 'AutoCAD'],
            feat: {
                title: 'Simulation of a Sewing Line',
                desc: '18-process RMG line modeled in Arena: 617.8 s average cycle time and 3 bottlenecks found.',
                href: '#projects', cta: 'Check the Projects section →'
            }
        },
        optimize: {
            n: '03', label: 'Optimize',
            group: 'Operations & Optimization',
            title: 'Find better decisions.',
            desc: 'I formulate and solve optimization problems to improve productivity, resource use, and flow in operations.',
            tools: ['Operations Research', 'Optimization', 'Machine Learning', 'Operations Management'],
            feat: {
                title: 'Bi-Objective Task Allocation',
                desc: 'Optimization model for RMG sewing lines, awarded Best Track Paper.',
                href: '#publications', cta: 'Check the Publications section →'
            }
        }
    };

    const $ = id => document.getElementById(id);
    const marks = document.querySelectorAll('.ks [data-key]');
    let current = null, timer = null;

    function fill(key) {
        const d = DATA[key];
        $('ksKicker').textContent = d.n + ' / ' + d.label.toUpperCase();
        $('ksGroup').textContent = d.group;
        $('ksTitle').textContent = d.title;
        $('ksDesc').textContent = d.desc;
        $('ksTools').innerHTML = d.tools.map(t => '<li><span>' + t + '</span></li>').join('');
        $('ksFeatTitle').textContent = d.feat.title;
        $('ksFeatDesc').textContent = d.feat.desc;
        $('ksFeatCta').textContent = d.feat.cta;
        $('ksFeat').setAttribute('href', d.feat.href);
    }

    function select(key, instant) {
        if (key === current) return;
        current = key;

        marks.forEach(el => {
            const on = el.dataset.key === key;
            el.classList.toggle('on', on);
            if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', on);
        });

        clearTimeout(timer);
        if (instant) { fill(key); return; }

        panel.classList.add('swap');
        timer = setTimeout(() => { fill(key); panel.classList.remove('swap'); }, 220);
    }

    document.querySelectorAll('.ks-node').forEach(btn => {
        btn.addEventListener('click', () => select(btn.dataset.key));
    });

    select('analyze', true);
})();

// tap a card to show/hide its photos (phones and touch screens)
document.querySelectorAll('.has-photos').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        if (!window.matchMedia('(max-width: 768px), (hover: none)').matches) return;
        card.classList.toggle('open');
    });
});

// certifications: some cards on show, the others drift in by themselves
(function () {
    const stage = document.getElementById('lrStage');
    if (!stage) return;

    const cards = [...stage.querySelectorAll('.lr-card')];
    const ORDER = { 6: [0, 4, 2, 5, 1, 3], 4: [0, 3, 1, 2] };
    let n = 0, shown = [], waiting = [], step = 0, paused = false;

    function pop(card) {
        card.classList.remove('enter');
        void card.offsetWidth;
        card.classList.add('enter');
    }

    function layout() {
        const want = window.innerWidth <= 768 ? 4 : 6;
        if (want === n) return;
        n = want;
        cards.forEach(c => { c.classList.remove('enter', 'leaving'); delete c.dataset.slot; });
        shown = cards.slice(0, Math.min(n, cards.length));
        waiting = cards.slice(shown.length);
        shown.forEach((c, i) => { c.dataset.slot = i + 1; pop(c); });
        step = 0;
    }

    function swap() {
        if (paused || document.hidden || !waiting.length) return;
        const order = ORDER[n];
        const i = order[step++ % order.length];
        if (i >= shown.length) return;

        const out = shown[i];
        const inc = waiting.shift();
        out.classList.add('leaving');

        setTimeout(() => {
            out.classList.remove('leaving', 'enter');
            delete out.dataset.slot;
            waiting.push(out);

            inc.dataset.slot = i + 1;
            pop(inc);
            shown[i] = inc;
        }, 600);
    }

    stage.addEventListener('mouseenter', () => { paused = true; });
    stage.addEventListener('mouseleave', () => { paused = false; });
    stage.addEventListener('touchstart', () => {
        paused = true;
        clearTimeout(stage._t);
        stage._t = setTimeout(() => { paused = false; }, 6000);
    }, { passive: true });

    let rz;
    window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(layout, 200); });

    layout();
    setInterval(swap, 3500);
})();

// certifications: cards hold, then a wind gust swaps the whole set
(function () {
    const stage = document.getElementById('lrStage');
    if (!stage) return;

    const cards = [...stage.querySelectorAll('.lr-card')];
    const total = cards.length;

    const HOLD = 3000;   // how long a set stays on screen (ms)
    const ORDER = { 6: [1, 4, 2, 5, 3, 6], 4: [1, 3, 2, 4] };   // left to right
    let n = 0, p = 0, timer = null, paused = false, busy = false;

    // wind streaks
    const gust = document.createElement('div');
    gust.className = 'lr-gust';
    for (let i = 0; i < 9; i++) {
        const s = document.createElement('span');
        s.className = 'streak';
        s.style.top = (8 + i * 10) + '%';
        s.style.setProperty('--sd', (i % 3) * 0.12 + 's');
        s.style.width = (20 + (i % 4) * 8) + '%';
        gust.appendChild(s);
    }
    stage.appendChild(gust);

    const delayOf = slot => ORDER[n].indexOf(+slot) * 0.09 + 's';

    function clear() {
        cards.forEach(c => { c.classList.remove('enter', 'leaving'); delete c.dataset.slot; });
    }

    function show() {
        const count = Math.min(n, total);
        for (let i = 0; i < count; i++) {
            const c = cards[(p + i) % total];
            c.classList.remove('enter', 'leaving');
            void c.offsetWidth;
            c.dataset.slot = i + 1;
            c.style.setProperty('--d', delayOf(i + 1));
            c.classList.add('enter');
        }
    }

    function schedule(ms) {
        clearTimeout(timer);
        timer = setTimeout(blow, ms);
    }

    function blow() {
        if (total <= n) return;                       // everything already fits
        if (paused || document.hidden || busy) { schedule(800); return; }

        busy = true;
        stage.classList.add('gust');
        stage.querySelectorAll('.lr-card[data-slot]').forEach(c => {
            c.style.setProperty('--d', delayOf(c.dataset.slot));
            c.classList.remove('enter');
            c.classList.add('leaving');
        });

        setTimeout(() => {
            clear();
            p = (p + n) % total;
            show();
            stage.classList.remove('gust');
            busy = false;
            schedule(HOLD);
        }, 1450);
    }

    function layout() {
        const want = window.innerWidth <= 768 ? 4 : 6;
        if (want === n) return;
        n = want;
        clearTimeout(timer);
        busy = false;
        stage.classList.remove('gust');
        clear();
        p = 0;
        show();
        schedule(HOLD);
    }
        // only a card under the cursor stops the wind, not the whole section
        stage.addEventListener('mouseover', e => {
            if (e.target.closest('.lr-card')) paused = true;
        });
        stage.addEventListener('mouseout', e => {
            if (e.target.closest('.lr-card') && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.lr-card'))) {
                paused = false;
            }
        });

    stage.addEventListener('touchstart', () => {
        paused = true;
        clearTimeout(stage._t);
        stage._t = setTimeout(() => { paused = false; }, 6000);
    }, { passive: true });

    let rz;
    window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(layout, 200); });

    layout();
})();

// work experience: timeline draws itself while scrolling
(function () {
    const tl = document.querySelector('#experience .timeline');
    if (!tl) return;

    const items = [...tl.querySelectorAll('.experience-item')];
    let ticking = false;

    function update() {
        ticking = false;
        const rect = tl.getBoundingClientRect();
        const trigger = window.innerHeight * 0.6;      // the line follows this height on screen
        const reach = trigger - rect.top;              // how far the line has travelled
        const p = Math.min(Math.max(reach / rect.height, 0), 1);
        tl.style.setProperty('--p', p.toFixed(4));

        items.forEach(it => {
            const dotY = it.offsetTop + 30;            // dot position inside the timeline
            it.classList.toggle('lit', reach >= dotY);
        });
    }

    function request() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('load', update);
    update();
})();
