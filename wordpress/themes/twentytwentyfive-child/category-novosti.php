<?php
/**
 * Template Name: News Feed (VK Style)
 * Template file for 'novosti' category archive
 */

get_header(); ?>

<div class="news-feed-container">
    <header class="news-feed-header">
        <h1 class="news-feed-title"><?php single_cat_title(); ?></h1>
    </header>

    <div class="news-feed-list">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('news-item'); ?>>
                <div class="news-item__meta">
                    <span class="news-item__date"><?php echo get_the_date('j F \в H:i'); ?></span>
                    <span class="news-item__category">
                        <?php 
                        $categories = get_the_category();
                        foreach($categories as $cat) {
                            if($cat->slug != 'novosti') {
                                echo esc_html($cat->name);
                                break;
                            }
                        }
                        ?>
                    </span>
                </div>

                <h2 class="news-item__title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h2>

                <div class="news-item__excerpt">
                    <?php the_excerpt(); ?>
                </div>

                <div class="news-item__more">
                    <a href="<?php the_permalink(); ?>" class="news-item__read-more">Читать полностью</a>
                </div>

                <div class="news-item__footer">
                    <?php echo render_news_social_actions(get_the_ID()); ?>
                </div>
            </article>
        <?php endwhile; ?>
            <div class="news-pagination">
                <?php the_posts_pagination(array(
                    'prev_text' => 'Назад',
                    'next_text' => 'Вперед',
                )); ?>
            </div>
        <?php else : ?>
            <p>Новостей пока нет.</p>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
