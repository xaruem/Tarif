(function () {
    'use strict';

    /* ===== Тексты RU / UZ ===== */
    const I18N = {
        ru: {
            title: 'Маннапов Улугбек | Сайты, боты, дизайн',
            desc: 'Создание сайтов, Telegram-ботов и дизайнерских карточек для маркетплейсов. Цены на услуги.',
            name: 'Маннапов Улугбек',
            hero_sub: 'Сайты, Telegram-боты и дизайн карточек',
            cta_prices: 'Смотреть цены',
            cta_projects: 'Проекты в Telegram',
            prices_title: 'Цены на услуги',
            g_sites: 'Создание сайтов',
            s_landing: 'Лендинг (1 страница)',
            s_corp: 'Корпоративный сайт (3–5 страниц)',
            s_shop: 'Интернет-магазин',
            s_custom: 'Индивидуальный дизайн + админ-панель',
            extra: 'Дополнительно',
            s_domain: 'Подключение домена и хостинга',
            s_support: 'Техническая поддержка',
            g_bots: 'Создание ботов',
            b_simple: 'Telegram-бот (простой: меню, заявки)',
            b_pay: 'Telegram-бот (оплата, база данных)',
            b_biz: 'Бот для бизнеса (CRM, интеграции)',
            g_cards: 'Дизайнерские карточки',
            g_cards_sub: 'для маркетплейсов и соцсетей',
            c_1: '1 карточка товара',
            c_5: '5 карточек',
            c_10: '10 карточек',
            c_full: 'Полное оформление магазина',
            negotiable: 'Договорная цена',
            t_time: 'Сроки выполнения: от 3 до 14 дней',
            t_prepay: 'Предоплата: 50%',
            t_custom: 'Индивидуальный расчёт зависит от сложности проекта',
            channel_title: 'Примеры работ — в канале с проектами'
        },
        uz: {
            title: 'Mannapov Ulug‘bek | Saytlar, botlar, dizayn',
            desc: 'Saytlar, Telegram-botlar va marketplace uchun dizayner kartochkalari yaratish. Xizmatlar narxlari.',
            name: 'Mannapov Ulug‘bek',
            hero_sub: 'Saytlar, Telegram-botlar va kartochkalar dizayni',
            cta_prices: 'Narxlarni ko‘rish',
            cta_projects: 'Telegramdagi loyihalar',
            prices_title: 'Xizmatlar narxlari',
            g_sites: 'Saytlar yaratish',
            s_landing: 'Landing (1 sahifa)',
            s_corp: 'Korporativ sayt (3–5 sahifa)',
            s_shop: 'Internet-do‘kon',
            s_custom: 'Individual dizayn + admin-panel',
            extra: 'Qo‘shimcha',
            s_domain: 'Domen va hostingni ulash',
            s_support: 'Texnik yordam',
            g_bots: 'Botlar yaratish',
            b_simple: 'Telegram-bot (oddiy: menyu, arizalar)',
            b_pay: 'Telegram-bot (to‘lov, ma’lumotlar bazasi)',
            b_biz: 'Biznes uchun bot (CRM, integratsiyalar)',
            g_cards: 'Dizayner kartochkalari',
            g_cards_sub: 'marketplace va ijtimoiy tarmoqlar uchun',
            c_1: '1 ta mahsulot kartochkasi',
            c_5: '5 ta kartochka',
            c_10: '10 ta kartochka',
            c_full: 'Do‘konni to‘liq bezash',
            negotiable: 'Kelishilgan narx',
            t_time: 'Bajarish muddati: 3 dan 14 kungacha',
            t_prepay: 'Oldindan to‘lov: 50%',
            t_custom: 'Individual hisob-kitob loyihaning murakkabligiga bog‘liq',
            channel_title: 'Ish namunalari — loyihalar kanalida'
        }
    };

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    const motion = hasGsap && !reduceMotion;
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);

    let lang = 'ru';
    try { lang = localStorage.getItem('lang') === 'uz' ? 'uz' : 'ru'; } catch (e) {}

    const rows = $$('.row');
    const titleEl = $('#hero-title');
    let lenis = null;

    /* ===== Цены ===== */
    const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

    function priceHTML(row, p) {
        const from = row.dataset.from;
        if (!from) return null;
        const a = `<b>${fmt(from * p)}</b>`;
        const b = row.dataset.to ? `<b>${fmt(row.dataset.to * p)}</b>` : '';
        const month = row.dataset.unit === 'month';
        if (lang === 'ru') {
            if (b) return `<em>от</em> ${a} <em>до</em> ${b} <em>сум</em>`;
            if (month) return `<em>от</em> ${a} <em>сум / месяц</em>`;
            return `<em>от</em> ${a} <em>сум</em>`;
        }
        if (b) return `${a} <em>so‘mdan</em> ${b} <em>so‘mgacha</em>`;
        if (month) return `<em>oyiga</em> ${a} <em>so‘mdan</em>`;
        return `${a} <em>so‘mdan</em>`;
    }

    function renderPrice(row) {
        const html = priceHTML(row, row._p === undefined ? 1 : row._p);
        if (html !== null) $('.row-price', row).innerHTML = html;
    }

    /* ===== Заголовок: разбивка на буквы ===== */
    let chars = [];
    let centers = [];

    function splitTitle(text) {
        titleEl.textContent = '';
        titleEl.setAttribute('aria-label', text);
        chars = [];
        text.split(' ').forEach((w) => {
            const word = document.createElement('span');
            word.className = 'word';
            word.setAttribute('aria-hidden', 'true');
            Array.from(w).forEach((c) => {
                const ch = document.createElement('span');
                ch.className = 'char';
                ch.textContent = c;
                word.appendChild(ch);
                chars.push(ch);
            });
            titleEl.appendChild(word);
        });
    }

    function cacheCenters() {
        centers = chars.map((c) => {
            const r = c.getBoundingClientRect();
            return {
                x: r.left + r.width / 2 + window.scrollX,
                y: r.top + r.height / 2 + window.scrollY - (gsap.getProperty(c, 'y') || 0)
            };
        });
    }

    function playTitle(delay) {
        if (!motion) return;
        $$('.word', titleEl).forEach((w) => (w.style.overflow = 'hidden'));
        gsap.fromTo(chars,
            { yPercent: 115, rotate: 7 },
            {
                yPercent: 0, rotate: 0, duration: 1.05, ease: 'expo.out', stagger: 0.04, delay: delay,
                onComplete: () => {
                    $$('.word', titleEl).forEach((w) => (w.style.overflow = 'visible'));
                    cacheCenters();
                }
            });
    }

    /* ===== Язык ===== */
    function applyLang(next, animate) {
        lang = next;
        const t = I18N[lang];
        document.documentElement.lang = lang;
        document.title = t.title;
        const meta = $('meta[name="description"]');
        if (meta) meta.setAttribute('content', t.desc);
        $('.lang').dataset.active = lang;
        $$('.lang-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

        $$('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
        rows.forEach(renderPrice);
        $('#footer-name').textContent = t.name;
        splitTitle(t.name);

        try { localStorage.setItem('lang', lang); } catch (e) {}

        if (animate && motion) {
            const fadeEls = $$('[data-i18n]').filter((el) => !el.classList.contains('row-name') && !el.classList.contains('row-price'));
            gsap.fromTo(fadeEls, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.015, ease: 'power2.out', clearProps: 'transform' });
            rows.filter((r) => r._done).forEach((r) => {
                gsap.fromTo([$('.row-name', r), $('.row-price', r)], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
            });
            playTitle(0);
        }
    }

    $$('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.dataset.lang !== lang) applyLang(btn.dataset.lang, true);
        });
    });

    /* ===== Прокрутка, шапка, прогресс ===== */
    const header = $('.header');
    const progress = $('.scroll-progress');
    const scrollDown = $('.scroll-down');

    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        header.classList.toggle('scrolled', y > 50);
        const hide = y > 100;
        scrollDown.style.opacity = hide ? '0' : '1';
        scrollDown.style.visibility = hide ? 'hidden' : 'visible';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (motion && typeof window.Lenis !== 'undefined') {
        lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            if (lenis) lenis.scrollTo(target, { offset: a.getAttribute('href') === '#prices' ? -40 : 0 });
            else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    });

    /* ===== Курсор и свечение героя ===== */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const hero = $('.hero');
    const glow = $('.hero-glow');

    if (fine && !reduceMotion) {
        const cursor = $('.cursor');
        const follower = $('.cursor-follower');
        let mx = innerWidth / 2, my = innerHeight / 2, fx = mx, fy = my, gx = mx, gy = my * 0.8;

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';

            if (chars.length && centers.length && window.scrollY < innerHeight) {
                const px = e.clientX + window.scrollX;
                const py = e.clientY + window.scrollY;
                chars.forEach((c, i) => {
                    const d = Math.hypot(px - centers[i].x, py - centers[i].y);
                    const s = Math.max(0, 1 - d / 170);
                    c._y = c._y || (hasGsap ? gsap.quickTo(c, 'y', { duration: 0.5, ease: 'power3.out' }) : null);
                    if (c._y) c._y(-s * 26);
                    c.style.color = s > 0.55 ? 'var(--accent)' : '';
                });
            }
        });

        document.addEventListener('mouseleave', () => {
            chars.forEach((c) => { if (c._y) c._y(0); c.style.color = ''; });
        });

        const hoverables = 'a, button, .row';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverables)) follower.classList.add('active');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverables)) follower.classList.remove('active');
        });

        (function loop() {
            fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
            follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
            const r = hero.getBoundingClientRect();
            gx += (mx - gx) * 0.07; gy += (my - gy) * 0.07;
            glow.style.setProperty('--mx', (gx - r.left) + 'px');
            glow.style.setProperty('--my', (gy - r.top) + 'px');
            requestAnimationFrame(loop);
        })();

        window.addEventListener('resize', () => { if (hasGsap) cacheCenters(); });
    }

    /* ===== Магнитные кнопки ===== */
    if (motion && fine) {
        $$('.btn').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.3 });
            });
            btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }));
        });
    }

    /* ===== Анимации появления ===== */
    function revealRow(row) {
        if (row._done) return;
        row._done = true;
        const tl = gsap.timeline();
        tl.to($('.row-line', row), { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0)
          .to($('.row-name', row), { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.12)
          .to($('.row-price', row), { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.22);
        if (row.dataset.from) {
            const proxy = { p: 0 };
            tl.to(proxy, { p: 1, duration: 1.4, ease: 'power2.out', onUpdate: () => { row._p = proxy.p; renderPrice(row); } }, 0.22);
        }
    }

    function setupScrollAnimations() {
        gsap.set($$('.row-line'), { scaleX: 0 });
        gsap.set($$('.row-name'), { opacity: 0, x: -28 });
        gsap.set($$('.row-price'), { opacity: 0, x: 28 });
        rows.forEach((row) => {
            if (row.dataset.from) { row._p = 0; renderPrice(row); }
            ScrollTrigger.create({ trigger: row, start: 'top 92%', once: true, onEnter: () => revealRow(row) });
        });

        gsap.from('.section-title', { scrollTrigger: { trigger: '.section-header', start: 'top 85%', once: true }, x: -60, opacity: 0, duration: 0.9, ease: 'power3.out' });
        gsap.from('.section-line', { scrollTrigger: { trigger: '.section-header', start: 'top 85%', once: true }, scaleX: 0, duration: 1, delay: 0.2, ease: 'power3.inOut' });

        $$('.group-head').forEach((head) => {
            const st = { trigger: head, start: 'top 88%', once: true };
            gsap.from($('h3', head), { scrollTrigger: st, x: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
            gsap.from($('.group-icon', head), { scrollTrigger: st, scale: 0, rotate: -120, duration: 0.9, ease: 'back.out(1.8)' });
        });

        gsap.from('.group-sub', { scrollTrigger: { trigger: '.group-sub', start: 'top 90%', once: true }, opacity: 0, x: -20, duration: 0.6 });
        gsap.from('.terms li', { scrollTrigger: { trigger: '.terms', start: 'top 88%', once: true }, y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' });
        gsap.fromTo('.channel',
            { clipPath: 'inset(0 100% 0 0 round 24px)' },
            { clipPath: 'inset(0 0% 0 0 round 24px)', duration: 1.2, ease: 'power4.inOut', clearProps: 'clipPath',
              scrollTrigger: { trigger: '.channel', start: 'top 90%', once: true } });
    }

    /* ===== Старт ===== */
    applyLang(lang, false);

    const preloader = $('.preloader');
    let started = false;
    function start() {
        if (started) return;
        started = true;
        setTimeout(() => preloader.classList.add('hide'), 350);
        if (!motion) return;
        gsap.from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' });
        gsap.from('.hero-cta .btn', { y: 34, opacity: 0, duration: 0.8, stagger: 0.15, delay: 1.2, ease: 'power3.out', clearProps: 'transform,opacity' });
        playTitle(0.55);
    }
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);
    setTimeout(start, 4000);

    if (motion) {
        setupScrollAnimations();
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }
})();
