document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.oasis-burger');
    const closeBtn = document.querySelector('.oasis-mobile-menu__close');
    const menu = document.querySelector('.oasis-mobile-menu');
    const overlay = document.querySelector('.oasis-mobile-menu__overlay');
    const body = document.body;

    const openMenu = () => {
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        body.classList.add('oasis-menu-open');
        // Попытка заблокировать скролл напрямую для надежности
        body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        body.classList.remove('oasis-menu-open');
        body.style.overflow = '';
    };

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Предотвращаем закрытие при клике по самой карточке
    const menuCard = document.querySelector('.oasis-mobile-menu__card');
    if (menuCard) {
        menuCard.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
