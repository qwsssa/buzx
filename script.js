document.addEventListener('DOMContentLoaded', function () {
    // 进入大网站
    const enterButton = document.querySelector('.enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', function () {
            window.location.href = 'main.html';
        });
    }

    // 大网站导航链接添加
    const addLinkButton = document.querySelector('.addLinkButton');
    const navLinks = document.getElementById('navLinks');
    const linkNameInput = document.getElementById('linkNameInput');
    const linkUrlInput = document.getElementById('linkUrlInput');

    // 检查元素是否成功获取
    if (!addLinkButton ||!navLinks ||!linkNameInput ||!linkUrlInput) {
        console.error('添加链接相关元素获取失败：');
        if (!addLinkButton) console.error('addLinkButton 未获取到');
        if (!navLinks) console.error('navLinks 未获取到');
        if (!linkNameInput) console.error('linkNameInput 未获取到');
        if (!linkUrlInput) console.error('linkUrlInput 未获取到');
        return;
    }

    addLinkButton.addEventListener('click', function () {
        const linkName = linkNameInput.value.trim();
        let linkUrl = linkUrlInput.value.trim();

        // 检查用户输入是否为空
        if (!linkName ||!linkUrl) {
            alert('网站名字和网址都不能为空，请重新输入');
            return;
        }

        // 检查网址是否包含协议头，如果没有则添加
        if (!linkUrl.match(/^https?:\/\//)) {
            linkUrl = 'http://' + linkUrl;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = linkUrl;
        link.textContent = linkName;
        listItem.appendChild(link);
        navLinks.appendChild(listItem);

        // 清空输入框
        linkNameInput.value = '';
        linkUrlInput.value = '';
    });

    // 大网站发帖功能
    const postInput = document.getElementById('postInput');
    const postButton = document.querySelector('.postButton');
    const posts = document.getElementById('posts');

    // 检查元素是否成功获取
    if (!postInput ||!postButton ||!posts) {
        console.error('发帖相关元素获取失败：');
        if (!postInput) console.error('postInput 未获取到');
        if (!postButton) console.error('postButton 未获取到');
        if (!posts) console.error('posts 未获取到');
        return;
    }

    postButton.addEventListener('click', function () {
        const postText = postInput.value.trim();
        if (postText) {
            const listItem = document.createElement('li');

            // 添加作者信息
            const authorElement = document.createElement('div');
            authorElement.classList.add('post-author');
            authorElement.textContent = '匿名用户';

            // 添加发布时间信息
            const timeElement = document.createElement('div');
            timeElement.classList.add('post-time');
            const now = new Date();
            const timeString = now.toLocaleString();
            timeElement.textContent = `发布时间: ${timeString}`;

            // 添加帖子内容
            const contentElement = document.createElement('div');
            contentElement.classList.add('post-content');
            contentElement.textContent = postText;

            // 添加点赞、评论、分享按钮
            const actionsElement = document.createElement('div');
            actionsElement.classList.add('post-actions');
            const likeSpan = document.createElement('span');
            likeSpan.textContent = '点赞';
            const commentSpan = document.createElement('span');
            commentSpan.textContent = '评论';
            const shareSpan = document.createElement('span');
            shareSpan.textContent = '分享';
            actionsElement.appendChild(likeSpan);
            actionsElement.appendChild(commentSpan);
            actionsElement.appendChild(shareSpan);

            listItem.appendChild(authorElement);
            listItem.appendChild(timeElement);
            listItem.appendChild(contentElement);
            listItem.appendChild(actionsElement);

            listItem.dataset.likes = 0;
            listItem.dataset.comments = 0;
            listItem.dataset.shares = 0;
            posts.appendChild(listItem);
            postInput.value = '';

            // 为帖子添加点击事件
            listItem.addEventListener('click', function () {
                openPostDetail(postText, listItem);
            });

            // 点赞功能
            likeSpan.addEventListener('click', function () {
                const currentLikes = parseInt(listItem.dataset.likes);
                listItem.dataset.likes = currentLikes + 1;
                // 更新点赞数显示
                likeSpan.textContent = `点赞 (${listItem.dataset.likes})`;
            });
        }
    });

    // 打开帖子详情弹窗
    const modal = document.getElementById('postDetailModal');
    const closeBtn = document.querySelector('.close');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const likeCount = document.getElementById('likeCount');
    const commentCount = document.getElementById('commentCount');
    const shareCount = document.getElementById('shareCount');
    const commentInput = document.getElementById('commentInput');
    const commentButton = document.getElementById('commentButton');
    const commentsList = document.getElementById('comments');

    function openPostDetail(text, postElement) {
        postTitle.textContent = '帖子详情';
        postContent.textContent = text;
        likeCount.textContent = postElement.dataset.likes;
        commentCount.textContent = postElement.dataset.comments;
        shareCount.textContent = postElement.dataset.shares;
        commentsList.innerHTML = '';
        modal.style.display = 'block';

        // 点赞功能
        const likeIcon = document.querySelector('.like-icon');
        likeIcon.addEventListener('click', function () {
            const currentLikes = parseInt(postElement.dataset.likes);
            postElement.dataset.likes = currentLikes + 1;
            likeCount.textContent = postElement.dataset.likes;
        });

        // 关闭弹窗
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // 评论功能
        commentButton.addEventListener('click', function () {
            const commentText = commentInput.value;
            if (commentText) {
                const commentItem = document.createElement('li');
                commentItem.textContent = commentText;
                commentsList.appendChild(commentItem);
                commentInput.value = '';
                const currentComments = parseInt(postElement.dataset.comments);
                postElement.dataset.comments = currentComments + 1;
                commentCount.textContent = postElement.dataset.comments;
            }
        });
    }

    // 掉落效果控制
    let isEffectActive = false;
    let effectInterval;
    const toggleEffectButton = document.getElementById('toggleEffect');
    const effectSelect = document.getElementById('effectSelect');
    const frequencySelect = document.getElementById('frequencySelect');

    // 检查元素是否成功获取
    if (!toggleEffectButton ||!effectSelect ||!frequencySelect) {
        console.error('掉落效果相关元素获取失败：');
        if (!toggleEffectButton) console.error('toggleEffectButton 未获取到');
        if (!effectSelect) console.error('effectSelect 未获取到');
        if (!frequencySelect) console.error('frequencySelect 未获取到');
        return;
    }

    function createEffectElement(effectType) {
        const element = document.createElement('div');
        element.classList.add('effect-element', effectType);
        element.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(element);

        // 根据不同效果设置内容
        if (effectType === 'emoji') {
            const emojis = ['✨', '🌸', '🍃'];
            element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        }

        // 动画结束后移除元素
        element.addEventListener('animationend', function () {
            element.remove();
        });
    }

    function startEffect() {
        const effectType = effectSelect.value;
        const frequency = parseInt(frequencySelect.value);
        effectInterval = setInterval(() => {
            createEffectElement(effectType);
        }, frequency);
    }

    function stopEffect() {
        clearInterval(effectInterval);
        const effectElements = document.querySelectorAll('.effect-element');
        effectElements.forEach((element) => {
            element.remove();
        });
    }

    toggleEffectButton.addEventListener('click', function () {
        if (!isEffectActive) {
            startEffect();
            isEffectActive = true;
        } else {
            stopEffect();
            isEffectActive = false;
        }
    });

    // 显示当前时间
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleString();
            currentTimeElement.textContent = timeString;
        }
        updateTime();
        setInterval(updateTime, 1000);
    }
});