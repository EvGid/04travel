<?php
/**
 * Footer template - точная копия с 04travel.ru
 * Источник: /root/04travel/components/Footer.tsx + SocialLinks.tsx
 */
?>
<footer class="footer-04travel">
    <div class="footer-container">
        <div class="footer-grid">
            <!-- Колонка 1: Бренд -->
            <div class="footer-col footer-col-brand">
                <h3 class="footer-brand">04travel</h3>
                <p class="footer-description">
                    Ваш персональный гид в мир Алтая. Сочетаем древние традиции гостеприимства и технологии будущего.
                </p>
                <div class="footer-social-block">
                    <h4 class="footer-social-title">Подписывайтесь на наши каналы</h4>
                    <!-- SocialLinks из SocialLinks.tsx -->
                    <ul class="footer-social-icons">
                        <!-- MAX (VK Max messenger) -->
                        <li>
                            <a href="https://max.ru/id41103048347_biz" target="_blank" rel="noopener noreferrer" title="Max" class="footer-social-link oasis-social__link oasis-social__link--max">
                                <img class="oasis-social__icon oasis-social__icon--max"
                                     src="<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/icons/max.svg?v=2"
                                     alt="MAX"
                                     width="40"
                                     height="40">
                            </a>
                        </li>
                        <!-- VK -->
                        <li>
                            <a href="https://vk.com/domgornii" target="_blank" rel="noopener noreferrer" title="ВКонтакте" class="footer-social-link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="12" fill="#0077FF"/>
                                    <path d="M21.1164 29C12.5749 29 7.703 22.994 7.5 13H11.7786C11.9191 20.3353 15.0733 23.4424 17.5717 24.0831V13H21.6006V19.3263C24.0678 19.054 26.6596 16.1712 27.5341 13H31.5629C30.8915 16.9079 28.0807 19.7908 26.082 20.976C28.0807 21.9369 31.282 24.4514 32.5 29H28.0651C27.1126 25.957 24.7393 23.6026 21.6006 23.2823V29H21.1164Z" fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <!-- OK -->
                        <li>
                            <a href="https://ok.ru/group/70000004518598" target="_blank" rel="noopener noreferrer" title="Одноклассники" class="footer-social-link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="12" fill="#FF7700"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4071 18.6067C22.5521 19.4617 21.3646 20 20.0504 20C18.7521 20 17.5487 19.4617 16.6937 18.6067C15.8387 17.7517 15.3004 16.5642 15.3004 15.25C15.3004 13.9358 15.8387 12.7483 16.6937 11.8933C17.5487 11.0383 18.7362 10.5 20.0504 10.5C21.3646 10.5 22.5521 11.0383 23.4071 11.8933C24.2621 12.7483 24.8004 13.9358 24.8004 15.25C24.8004 16.5642 24.2621 17.7517 23.4071 18.6067ZM20.0504 13.0808C19.4646 13.0808 18.9262 13.3183 18.5304 13.7142C18.1504 14.11 17.8971 14.6483 17.8971 15.2342C17.8971 15.82 18.1346 16.3583 18.5304 16.7542C18.9104 17.15 19.4487 17.3875 20.0504 17.3875C20.6362 17.3875 21.1746 17.15 21.5704 16.7542C21.9662 16.3742 22.2037 15.8358 22.2037 15.2342C22.2037 14.6483 21.9662 14.11 21.5704 13.7142C21.1904 13.3183 20.6521 13.0808 20.0504 13.0808ZM25.2117 20.0916L26.6504 21.9424C26.7322 22.035 26.7158 22.1584 26.585 22.2355C25.3752 23.1763 23.9693 23.7933 22.4979 24.1172L25.5387 29.1761C25.6205 29.3303 25.5224 29.5 25.3425 29.5H22.3671C22.269 29.5 22.1873 29.4383 22.1546 29.3612L20.0292 24.8883L17.9039 29.3612C17.8712 29.4537 17.7895 29.5 17.6914 29.5H14.7159C14.5524 29.5 14.438 29.3149 14.5198 29.1761L17.5606 24.1172C16.0892 23.7933 14.6832 23.1609 13.4734 22.2355C13.3917 22.1584 13.3753 22.035 13.4407 21.9424L14.8794 20.0916C14.9612 19.9991 15.1247 19.9836 15.2227 20.0608C16.5797 21.1558 18.2472 21.8653 20.0456 21.8653C21.8439 21.8653 23.5115 21.1558 24.8684 20.0608C24.9665 19.9682 25.13 19.9836 25.2117 20.0916Z" fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <!-- Rutube -->
                        <li>
                            <a href="https://rutube.ru/channel/25298457/" target="_blank" rel="noopener noreferrer" title="RuTube" class="footer-social-link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <rect width="40" height="40" rx="12" fill="#100943"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0273 0C20.1928 3.12204 21.0455 9.23717 25.0039 13.5C30.5917 19.5176 38.027 19.9926 40.0039 20.0074V19.2C40.0039 12.4794 40.0039 9.11905 38.696 6.55211C37.5455 4.29417 35.7097 2.4584 33.4518 1.30792C30.8848 0 27.5245 0 20.8039 0H20.0273Z" fill="#ED143B"/>
                                        <path d="M24.5782 19.2238H14.3414V15.2489H24.5782C25.1762 15.2489 25.592 15.3512 25.8006 15.5299C26.0092 15.7085 26.1385 16.0396 26.1385 16.5235V17.9508C26.1385 18.4605 26.0092 18.7918 25.8006 18.9704C25.592 19.149 25.1762 19.2253 24.5782 19.2253V19.2238ZM25.2805 11.5015H10V28.5H14.3414V22.9697H22.3421L26.1385 28.5H31L26.8143 22.9438C28.3575 22.7194 29.0505 22.2554 29.6219 21.4906C30.1934 20.7258 30.4799 19.5032 30.4799 17.8714V16.5968C30.4799 15.6291 30.3756 14.8643 30.1934 14.2781C30.0112 13.6919 29.6998 13.1821 29.2575 12.7242C28.7904 12.2907 28.2703 11.9855 27.6459 11.7808C27.0214 11.6022 26.2413 11.5 25.2805 11.5V11.5015Z" fill="white"/>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <!-- Telegram -->
                        <li>
                            <a href="https://t.me/travel_ra" target="_blank" rel="noopener noreferrer" title="Telegram" class="footer-social-link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="12" fill="#26A5E4"/>
                                    <path d="M28.9 11.2L10.4 18.3C9.1 18.8 9.1 19.6 10.2 19.9L14.9 21.4L16.7 27.1C16.9 27.6 16.8 27.9 17.4 27.9C17.9 27.9 18.1 27.7 18.4 27.4L20.9 25L25.7 28.5C26.6 29 27.2 28.8 27.4 27.7L30 12.5C30.3 11.1 29.5 10.6 28.9 11.2ZM17.5 24.3L16.5 20.6L26.3 14.4C26.7 14.1 27.1 14.3 26.8 14.6L18.3 22.2L17.5 24.3Z" fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <!-- Dzen -->
                        <li>
                            <a href="https://dzen.ru/04_travel" target="_blank" rel="noopener noreferrer" title="Дзен" class="footer-social-link footer-social-link-dzen">
                                <svg width="169" height="169" viewBox="0 0 169 169" fill="none" xmlns="http://www.w3.org/2000/svg" class="oasis-social__icon oasis-social__icon--dzen">
  <g clip-path="url(#clip0_45_484)">
    <path d="M84.0337 168.01H84.7036C118.068 168.01 137.434 164.651 151.152 151.333C165.139 137.206 168.369 117.709 168.369 84.4749V83.5351C168.369 50.311 165.139 30.9445 151.152 16.677C137.444 3.3594 117.938 0 84.7136 0H84.0437C50.6797 0 31.3031 3.3594 17.5856 16.677C3.59808 30.8045 0.368652 50.311 0.368652 83.5351V84.4749C0.368652 117.699 3.59808 137.066 17.5856 151.333C31.1732 164.651 50.6797 168.01 84.0337 168.01Z" fill="#202022"/>
    <path d="M148.369 82.7304C148.369 82.0906 147.849 81.5608 147.209 81.5308C124.246 80.661 110.271 77.732 100.494 67.955C90.6967 58.1581 87.7776 44.1724 86.9079 21.1596C86.8879 20.5198 86.358 20 85.7082 20H83.0291C82.3893 20 81.8594 20.5198 81.8295 21.1596C80.9597 44.1624 78.0406 58.1581 68.2437 67.955C58.4568 77.742 44.4911 80.661 21.5283 81.5308C20.8885 81.5508 20.3687 82.0806 20.3687 82.7304V85.4096C20.3687 86.0494 20.8885 86.5792 21.5283 86.6092C44.4911 87.4789 58.4667 90.408 68.2437 100.185C78.0206 109.962 80.9397 123.908 81.8195 146.83C81.8394 147.47 82.3693 147.99 83.0191 147.99H85.7082C86.348 147.99 86.8779 147.47 86.9079 146.83C87.7876 123.908 90.7067 109.962 100.484 100.185C110.271 90.398 124.236 87.4789 147.199 86.6092C147.839 86.5892 148.359 86.0594 148.359 85.4096V82.7304H148.369Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_45_484">
      <rect width="168.04" height="168.04" fill="white" transform="translate(0.368652)"/>
    </clipPath>
  </defs>
</svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Колонка 2: Навигация -->
            <div class="footer-col">
                <h4 class="footer-col-title">Навигация</h4>
                <ul class="footer-nav-list">
                    <li><a href="https://04travel.ru/tury">Все туры</a></li>
                    <li><a href="https://04travel.ru/domiki">Забронировать дом</a></li>
                    <li><a href="https://04travel.ru/#vibe-selector">Подобрать вайб</a></li>
                    <li><a href="https://wp.04travel.ru">Блог</a></li>
                    <li><a href="https://04travel.ru/o-nas">О нас</a></li>
                </ul>
            </div>

            <!-- Колонка 3: Юридическая информация -->
            <div class="footer-col">
                <h4 class="footer-col-title">Юридическая информация</h4>
                <ul class="footer-nav-list">
                    <li><a href="https://04travel.ru/privacy">Политика конфиденциальности</a></li>
                    <li><a href="https://04travel.ru/refund">Политика отмены</a></li>
                    <li><a href="https://tourism.gov.ru/operators/" target="_blank" rel="noopener">Реестр туроператоров</a></li>
                    <li><a href="https://04travel.ru/cookies">Cookies</a></li>
                </ul>
            </div>

            <!-- Колонка 4: Рейтинги -->
            <div class="footer-col">
                <h4 class="footer-col-title">Рейтинги</h4>
                <div class="footer-rating-cards">
                    <a href="https://yandex.ru/maps/org/aktash_vibes/136013722623/" target="_blank" rel="noopener noreferrer" class="footer-rating-card">
                        <iframe src="https://yandex.ru/sprav/widget/rating-badge/136013722623?type=rating" width="150" height="50" frameborder="0"></iframe>
                    </a>
                    <a href="https://2gis.ru/gornoaltaysk/firm/70000001075445874/tab/reviews?utm_source=widget_firm" target="_blank" rel="noopener noreferrer" class="footer-rating-card">
                        <iframe src="https://widget.2gis.ru/api/widget?org_id=70000001100580502&branch_id=70000001075445874&size=medium&theme=light" width="150" height="50" frameborder="0"></iframe>
                    </a>
                </div>
            </div>
        </div>

        <!-- Копирайт -->
        <div class="footer-bottom">
            <div class="footer-copyright">
                <p>© 2026 04travel. Все права защищены. Республика Алтай, г. Горно-Алтайск. ул. П.Кучияка 71/1 т. 89635106746</p>
                <p>Улаганский район с. Акташ ул. Юбилейная 1г</p>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
