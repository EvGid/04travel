document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.oasis-burger');
    const menu = document.querySelector('.oasis-mobile-menu');
    const overlay = document.querySelector('.oasis-mobile-menu__overlay');
    const body = document.body;

    // SVG paths for burger and X
    const burgerPath = 'M4 6h16M4 12h16M11 18h9';
    const closePath = 'M6 18L18 6M6 6l12 12';

    const openMenu = () => {
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        body.classList.add('oasis-menu-open');
        body.style.overflow = 'hidden';
        // Change burger icon to X
        const path = burger.querySelector('svg path');
        if (path) path.setAttribute('d', closePath);
    };

    const closeMenu = () => {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        body.classList.remove('oasis-menu-open');
        body.style.overflow = '';
        // Change X icon back to burger
        const path = burger.querySelector('svg path');
        if (path) path.setAttribute('d', burgerPath);
    };

    const toggleMenu = () => {
        if (menu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Prevent close when clicking on the card itself
    const menuCard = document.querySelector('.oasis-mobile-menu__card');
    if (menuCard) {
        menuCard.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
