import React, { useState, useEffect, useRef } from 'react';

interface SocialReactionsProps {
    postId: string;
    postUrl: string;
    postTitle: string;
    commentsCount?: number;
    supportUrl?: string;
}

const SocialReactions: React.FC<SocialReactionsProps> = ({
    postId,
    postUrl,
    postTitle,
    commentsCount = 0,
    supportUrl = '#support'
}) => {
    const [likes, setLikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    const storageKey = `oasis_reactions_${postId}`;

    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const data = JSON.parse(stored);
            setLikes(data.likes || 0);
            setUserLiked(data.userLiked || false);
            setUserDisliked(data.userDisliked || false);
        }
    }, [storageKey]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
                setShareOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const saveToStorage = (newLikes: number, liked: boolean, disliked: boolean) => {
        localStorage.setItem(storageKey, JSON.stringify({ likes: newLikes, userLiked: liked, userDisliked: disliked }));
    };

    const handleLike = () => {
        if (userLiked) {
            const newLikes = likes - 1;
            setLikes(newLikes);
            setUserLiked(false);
            saveToStorage(newLikes, false, userDisliked);
        } else {
            const newLikes = likes + 1;
            setLikes(newLikes);
            setUserLiked(true);
            if (userDisliked) {
                setUserDisliked(false);
            }
            saveToStorage(newLikes, true, false);
        }
    };

    const handleDislike = () => {
        if (userDisliked) {
            setUserDisliked(false);
            saveToStorage(likes, userLiked, false);
        } else {
            setUserDisliked(true);
            if (userLiked) {
                const newLikes = likes - 1;
                setLikes(newLikes);
                setUserLiked(false);
                saveToStorage(newLikes, false, true);
            } else {
                saveToStorage(likes, false, true);
            }
        }
    };

    const handleShare = (action: string) => {
        const encodedUrl = encodeURIComponent(postUrl);
        const encodedTitle = encodeURIComponent(postTitle);
        let shareUrl = '';

        switch (action) {
            case 'copy':
                navigator.clipboard.writeText(postUrl).then(() => {
                    alert('Ссылка скопирована!');
                });
                break;
            case 'vk':
                shareUrl = `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
            case 'max':
                shareUrl = `https://max.ru/share?url=${encodedUrl}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
            case 'ok':
                shareUrl = `https://connect.ok.ru/offer?url=${encodedUrl}&title=${encodedTitle}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
        }
        setShareOpen(false);
    };

    return (
        <div className="social-reactions">
            <div className="social-reactions__left">
                {/* Like */}
                <button
                    className={`reaction-btn reaction-btn--like ${userLiked ? 'active' : ''}`}
                    onClick={handleLike}
                    title="Нравится"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="reaction-btn__count">{likes}</span>
                </button>

                {/* Comments */}
                <a href="#comments" className="reaction-btn reaction-btn--comments" title="Комментарии">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="reaction-btn__count">{commentsCount}</span>
                </a>

                {/* Share */}
                <div className="reaction-btn reaction-btn--share" ref={shareRef}>
                    <button
                        className="share-trigger"
                        onClick={(e) => { e.stopPropagation(); setShareOpen(!shareOpen); }}
                        title="Поделиться"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Share dropdown */}
                    <div className={`share-dropdown ${shareOpen ? 'open' : ''}`}>
                        <div className="share-dropdown__header">Поделиться</div>
                        <button className="share-item" onClick={() => handleShare('copy')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span>Скопировать ссылку</span>
                        </button>
                        <button className="share-item" onClick={() => handleShare('vk')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077FF"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.259 2.174 1.816.613.42 1.08.328 1.08.328l2.17-.03s1.135-.07.596-.962c-.044-.073-.312-.66-1.609-1.866-1.358-1.263-1.176-1.058.46-3.24.995-1.328 1.393-2.14 1.268-2.488-.118-.331-.852-.244-.852-.244l-2.441.015s-.181-.025-.315.056c-.131.079-.216.264-.216.264s-.387 1.03-.903 1.906c-1.089 1.848-1.524 1.946-1.702 1.832-.414-.266-.31-1.066-.31-1.635 0-1.778.27-2.52-.525-2.712-.264-.063-.458-.105-1.132-.112-.865-.008-1.598.003-2.012.207-.276.136-.49.44-.36.457.161.022.526.098.72.363.248.341.24 1.109.24 1.109s.143 2.093-.333 2.354c-.327.178-.775-.186-1.739-1.852-.49-.853-.86-1.796-.86-1.796s-.072-.176-.199-.27c-.154-.115-.369-.151-.369-.151l-2.321.015s-.349.01-.477.161c-.114.135-.009.413-.009.413s1.82 4.258 3.881 6.403c1.889 1.967 4.034 1.838 4.034 1.838h.972z" /></svg>
                            <span>VK</span>
                        </button>
                        <button className="share-item" onClick={() => handleShare('telegram')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                            <span>Telegram</span>
                        </button>
                        <button className="share-item" onClick={() => handleShare('max')}>
                            <svg width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id="max_react_grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#4cf" /><stop offset="66%" stopColor="#53e" /><stop offset="100%" stopColor="#93d" /></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#max_react_grad)" /><path fill="#fff" d="M12.2 18.5c-1.8 0-2.6-.3-4.1-1.3-.9 1.2-3.8 2.1-4-.5 0-1.2-.3-2.2-.6-3.3-.4-1.3-.8-2.8-.8-5 0-5.2 4.3-9.1 9.3-9.1 5.1 0 9 4.1 9 9.2 0 5-4 9-9 9zm.1-13.7c-2.5-.1-4.4 1.6-4.8 4.2-.4 2.2.3 4.9.8 5 .3.1.9-.5 1.3-.9.6.4 1.3.7 2.2.8 2.5.1 4.7-1.8 4.9-4.4.1-2.5-1.9-4.7-4.4-4.7z" /></svg>
                            <span>Max</span>
                        </button>
                        <button className="share-item" onClick={() => handleShare('ok')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#EE8208"><path d="M12 12.75c2.9 0 5.25-2.35 5.25-5.25S14.9 2.25 12 2.25 6.75 4.6 6.75 7.5s2.35 5.25 5.25 5.25zm0-7.5c1.24 0 2.25 1.01 2.25 2.25S13.24 9.75 12 9.75 9.75 8.74 9.75 7.5 10.76 5.25 12 5.25zm5.57 9.83a8.25 8.25 0 0 1-4.07 1.42v3.25a1.5 1.5 0 0 1-3 0V16.5a8.25 8.25 0 0 1-4.07-1.42 1.5 1.5 0 0 1 1.64-2.51 5.25 5.25 0 0 0 5.86 0 1.5 1.5 0 0 1 1.64 2.51z" /></svg>
                            <span>Одноклассники</span>
                        </button>
                    </div>
                </div>

                {/* Dislike */}
                <button
                    className={`reaction-btn reaction-btn--dislike ${userDisliked ? 'active' : ''}`}
                    onClick={handleDislike}
                    title="Не нравится"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H6.57385C5.09299 2 3.83382 3.08028 3.60862 4.54379L2.53165 11.5438C2.25207 13.3611 3.65818 15 5.49687 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="social-reactions__right">
                <a href={supportUrl} className="support-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Поддержать</span>
                </a>
            </div>
        </div>
    );
};

export default SocialReactions;
