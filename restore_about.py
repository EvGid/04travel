import json
import os

path = '/root/04travel/public/04travel-pages.json'

with open(path, 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Добавляем страницу О нас
about_us = {
    "doc_type": "wp_page",
    "wp_id": 952,
    "title": "О нас",
    "slug": "%d0%be-%d0%bd%d0%b0%d1%81",
    "url": "https://04travel.ru/%d0%be-%d0%bd%d0%b0%d1%81/",
    "date_published": "2025-12-17 23:03:50",
    "date_modified": "2026-01-27 04:26:00",
    "parent_wp_id": 0,
    "menu_order": 0,
    "excerpt_html": "",
    "content_html": "\n<div class=\"wp-block-group is-layout-constrained\"></details>\n      <details>\n        <summary>Маршруты</summary>\n        <div class=\"dd\">\n          <a href=\"/%d1%87%d1%83%d0%b9%d1%81%d0%ba%d0%b8%d0%b9-%d1%82%d1%80%d0%b0%d0%ba%d1%82-%d1%82%d1%83%d1%80%d1%8b-%d0%b8-%d0%bc%d0%b0%d1%80%d1%88%d1%80%d1%83%d1%82/\">Чуйский тракт</a>\n          <a href=\"/%d0%b3%d0%b5%d0%b9%d0%b7%d0%b5%d1%80%d0%be%d0%b2%d0%be%d0%b5-%d0%be%d0%b7%d0%b5%d1%80%d0%be-%d0%bd%d0%b0-%d0%b0%d0%bb%d1%82%d0%b0%d0%b5-%d0%ba%d0%b0%d0%ba-%d0%bf%d0%be%d0%bf%d0%b0%d1%81%d1%82%d1%8c/\">Гейзеровое озеро</a>\n          <a href=\"/%d0%b0%d0%bb%d1%82%d0%b0%d0%b9-%d0%bc%d0%b0%d1%80%d1%81-%d0%ba%d1%8b%d0%b7%d1%8b%d0%bb-%d1%87%d0%b8%d0%bd-%d1%8d%d0%ba%d1%81%d0%ba%d1%83%d1%80%d1%81%d0%b8%d0%b8-%d0%b8-%d1%82%d1%83%d1%80%d1%8b/\">Алтай Марс</a>\n          <a href=\"/%d1%82%d0%b5%d0%bb%d0%b5%d1%86%d0%ba%d0%be%d0%b5-%d0%be%d0%b7%d0%b5%d1%80%d0%be-%d1%82%d1%83%d1%80%d1%8b-%d0%b8-%d1%8d%d0%ba%d1%81%d0%ba%d1%83%d1%80%d1%81%d0%b8%d0%b8/\">Телецкое озеро</a>\n          <a href=\"/%d1%8d%d0%ba%d1%81%d0%ba%d1%83%d1%80%d1%81%d0%b8%d0%b8-%d0%bf%d0%be-%d0%b3%d0%be%d1%80%d0%bd%d0%be%d0%bc%d1%83-%d0%b0%d0%bb%d1%82%d0%b0%d0%b9/\">Экскурсии</a>\n          <a href=\"/%d1%82%d1%83%d1%80%d1%8b-%d0%bd%d0%b0-%d0%b3%d0%be%d1%80%d0%bd%d1%8b%d0%b9-%d0%b0%d0%bb%d1%82%d0%b0%d0%b9/\">Туры на Горный Алтай</a>\n        </div>\n      </details>\n      <details>\n        <summary>Инфо</summary>\n        <div class=\"dd\">\n          <a href=\"/%d0%b1%d0%bb%d0%be%d0%b3/\">Блог</a>\n          <a href=\"/%d0%be-%d0%bd%d0%b0%d1%81/\">О нас</a>\n          <a href=\"/%d1%87%d0%b0%d0%b2%d0%be/\">ЧаВо</a>\n          <a href=\"/%d0%ba%d0%be%d0%bd%d1%82%d0%b0%d0%ba%d1%82%d1%8b/\">Контакты</a>\n          <a href=\"/%d0%b1%d1%80%d0%be%d0%bd%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d1%82%d1%83%d1%80%d0%b0/\">Бронирование</a>\n        </div>\n      </details>\n    </div>\n    <div class=\"cta\">\n      <a class=\"oai-btn book\" href=\"/%d0%b1%d1%80%d0%be%d0%bd%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d1%82%d1%83%d1%80%d0%b0/\">Забронировать</a>\n      <a class=\"oai-btn call\" href=\"tel:+79635106746\">Позвонить</a>\n      <a class=\"oai-btn tg\" href=\"https://t.me/travel_ra\" target=\"_blank\" rel=\"noopener\">Telegram</a>\n      <a class=\"oai-btn vk\" href=\"https://vk.com/domgornii\" target=\"_blank\" rel=\"noopener\">VK</a>\n    </div>\n  </div>\n</div>\n<h1>О нас</h1>\n<p>04travel это туры по Республике Алтай с понятной логистикой, честными маршрутами и комфортным темпом. Мы собираем программы так, чтобы вы увидели максимум впечатлений без перегруза дорогой.</p>\n<h2>Что можно забронировать</h2>\n<p>Выберите базовый формат: <a href=\"/%d1%82%d1%83%d1%80%d1%8b-%d0%bd%d0%b0-%d0%b0%d0%bb%d1%82%d0%b0%d0%b9/\">туры на Алтай</a>, <a href=\"/%d1%8d%d0%ba%d1%81%d0%ba%d1%83%d1%80%d1%81%d0%b8%d0%b8-%d0%bf%d0%be-%d0%b3%d0%be%d1%80%d0%bd%d0%be%d0%bc%d1%83-%d0%b0%d0%bb%d1%82%d0%b0%d0%b9/\">экскурсии</a> или <a href=\"/%d1%82%d1%83%d1%80%d1%8b-%d0%b2%d1%8b%d1%85%d0%be%d0%b4%d0%bd%d0%be%d0%b3%d0%be-%d0%b4%d0%bd%d1%8f-%d0%bd%d0%b0-%d0%b0%d0%bb%d1%82%d0%b0%d0%b9/\">туры выходного дня</a>. Для первой поездки чаще всего рекомендуют <a href=\"/%d1%87%d1%83%d0%b9%d1%81%d0%ba%d0%b8%d0%b9-%d1%82%d1%80%d0%b0%d0%ba%d1%82-%d1%82%d1%83%d1%80%d1%8b-%d0%b8-%d0%bc%d0%b0%d1%80%d1%88%d1%80%d1%83%d1%82/\">Чуйский тракт</a> с добавлением 1-2 ярких локаций.</p>\n\n\n\n\n\n\n\n<!-- wp:spacer {\"height\":\"60px\"} -->\n<div style=\"height:60px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n\n<!-- wp:group {\"style\":{\"spacing\":{\"padding\":{\"top\":\"40px\",\"bottom\":\"40px\"}},\"border\":{\"top\":{\"color\":\"#eeeeee\",\"width\":\"1px\"}}},\"layout\":{\"type\":\"constrained\"}} -->\n<div class=\"wp-block-group\" style=\"border-top-color:#eeeeee;border-top-width:1px;padding-top:40px;padding-bottom:40px\">\n    <!-- wp:heading {\"textAlign\":\"center\",\"level\":2} -->\n    <h2 class=\"wp-block-heading has-text-align-center\">Связаться и забронировать</h2>\n    <!-- /wp:heading -->\n\n    <!-- wp:buttons {\"layout\":{\"type\":\"flex\",\"justifyContent\":\"center\"}} -->\n    <div class=\"wp-block-buttons site-footer-contact-block\">\n        <div class=\"wp-block-button\"><a class=\"wp-block-button__link wp-element-button\" href=\"tel:+79635106746\">Позвонить</a></div>\n        <div class=\"wp-block-button\"><a class=\"wp-block-button__link wp-element-button\" href=\"https://t.me/travel_ra\" target=\"_blank\" rel=\"noreferrer noopener\">Telegram</a></div>\n        <div class=\"wp-block-button\"><a class=\"wp-block-button__link wp-element-button\" href=\"https://vk.com/domgornii\" target=\"_blank\" rel=\"noreferrer noopener\">ВКонтакте</a></div>\n        <div class=\"wp-block-button\"><a class=\"wp-block-button__link wp-element-button\" href=\"https://max.ru/id41103048347_biz\" target=\"_blank\" rel=\"noreferrer noopener\">Профиль Max</a></div>\n    </div>\n    <!-- /wp:buttons -->\n</div>\n<!-- /wp:group -->\n",
    "meta": {}
}

pages.append(about_us)

with open(path, 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

print(f"Added page O nas (ID 952) to {path}")
