document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // 窄屏汉堡菜单：点击展开/收起
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navbar.classList.toggle('menu-open');
        });
    }
    
    // 导航跳转交给浏览器原生锚点（配合 CSS 的 scroll-behavior / scroll-margin-top），
    // 这样即使脚本出问题也点得动；这里只负责点完把窄屏菜单收起来
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('menu-open');
        });
    });
    
    // 滚动时导航栏加深（颜色交给 CSS 变量，避免覆盖随机主题）
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // 按钮点击涟漪效果
    const buttons = document.querySelectorAll('.btn, .contact-btn, .copy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-anim 0.6s linear;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// 网站方块纹理系统
(function initBlockTextures() {
    var SIZE = 16;

    function makeCanvas() {
        var c = document.createElement('canvas');
        c.width = SIZE; c.height = SIZE;
        return c;
    }

    function px(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }

    function fillAll(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, SIZE, SIZE);
    }

    function seededRandom(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    function dirtTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var base = '#6B4423', dark = '#5A3819', mid = '#7A5533', light = '#8B6643';
        fillAll(ctx, base);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 31 + y * 17 + 42);
            if (r < 0.2) px(ctx, x, y, dark);
            else if (r < 0.35) px(ctx, x, y, mid);
            else if (r < 0.42) px(ctx, x, y, light);
        }
        return c.toDataURL();
    }

    function grassTopTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var g1 = '#4A8B2C', g2 = '#3D7A22', g3 = '#5CA03A', g4 = '#2D6418';
        fillAll(ctx, g1);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 23 + y * 37 + 99);
            if (r < 0.25) px(ctx, x, y, g2);
            else if (r < 0.4) px(ctx, x, y, g3);
            else if (r < 0.48) px(ctx, x, y, g4);
        }
        return c.toDataURL();
    }

    function grassSideTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var brown = '#6B4423', brownD = '#5A3819', brownL = '#7A5533';
        var g1 = '#4A8B2C', g2 = '#3D7A22', g3 = '#5CA03A';
        fillAll(ctx, brown);
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < SIZE; x++) {
                var r = seededRandom(x * 13 + y * 29 + 55);
                if (r < 0.3) px(ctx, x, y, g2);
                else if (r < 0.55) px(ctx, x, y, g3);
                else px(ctx, x, y, g1);
            }
        }
        px(ctx, 1, 4, g2); px(ctx, 4, 4, g1); px(ctx, 7, 4, g3);
        px(ctx, 10, 4, g2); px(ctx, 13, 4, g1); px(ctx, 15, 4, g3);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            if (y >= 5) {
                var r = seededRandom(x * 31 + y * 17 + 42);
                if (r < 0.18) px(ctx, x, y, brownD);
                else if (r < 0.3) px(ctx, x, y, brownL);
            }
        }
        return c.toDataURL();
    }

    function stoneTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var base = '#7F7F7F', dark = '#636363', light = '#969696', vdark = '#505050';
        fillAll(ctx, base);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 41 + y * 23 + 77);
            if (r < 0.15) px(ctx, x, y, dark);
            else if (r < 0.25) px(ctx, x, y, light);
            else if (r < 0.3) px(ctx, x, y, vdark);
        }
        px(ctx, 2, 3, vdark); px(ctx, 3, 3, vdark); px(ctx, 3, 4, vdark);
        px(ctx, 10, 7, vdark); px(ctx, 11, 7, vdark); px(ctx, 11, 8, vdark);
        px(ctx, 6, 12, vdark); px(ctx, 7, 12, vdark);
        return c.toDataURL();
    }

    function oakPlankTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var base = '#A07040', grain = '#8B5E34', light = '#B8884E', dark = '#6B4423';
        fillAll(ctx, base);
        for (var y = 0; y < SIZE; y++) {
            for (var x = 0; x < SIZE; x++) {
                if (y % 4 === 0) {
                    px(ctx, x, y, dark);
                } else {
                    var r = seededRandom(x * 7 + y * 19 + 33);
                    if (r < 0.12) px(ctx, x, y, grain);
                    else if (r < 0.2) px(ctx, x, y, light);
                }
            }
        }
        px(ctx, 5, 1, dark); px(ctx, 5, 2, dark);
        px(ctx, 11, 5, dark); px(ctx, 11, 6, dark);
        px(ctx, 3, 9, dark); px(ctx, 3, 10, dark);
        px(ctx, 13, 13, dark); px(ctx, 13, 14, dark);
        return c.toDataURL();
    }

    function sandTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var base = '#DBD3A0', light = '#E8E0B0', dark = '#C4B880', vdark = '#B0A468';
        fillAll(ctx, base);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 37 + y * 11 + 61);
            if (r < 0.18) px(ctx, x, y, light);
            else if (r < 0.3) px(ctx, x, y, dark);
            else if (r < 0.35) px(ctx, x, y, vdark);
        }
        return c.toDataURL();
    }

    function netherTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var base = '#6F2820', light = '#8B3830', dark = '#4A1810', vdark = '#301008';
        fillAll(ctx, base);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 43 + y * 29 + 88);
            if (r < 0.15) px(ctx, x, y, dark);
            else if (r < 0.25) px(ctx, x, y, light);
            else if (r < 0.3) px(ctx, x, y, vdark);
        }
        px(ctx, 3, 2, vdark); px(ctx, 4, 2, vdark); px(ctx, 4, 3, vdark);
        px(ctx, 11, 9, vdark); px(ctx, 12, 9, vdark); px(ctx, 11, 10, vdark);
        return c.toDataURL();
    }

    function diamondTexture() {
        var c = makeCanvas(), ctx = c.getContext('2d');
        var stone = '#7F7F7F', stoneD = '#636363', stoneL = '#969696';
        var cyan = '#4EC8B4', cyanL = '#72E0D0', cyanD = '#2EA090';
        fillAll(ctx, stone);
        for (var i = 0; i < SIZE * SIZE; i++) {
            var x = i % SIZE, y = Math.floor(i / SIZE);
            var r = seededRandom(x * 41 + y * 23 + 77);
            if (r < 0.12) px(ctx, x, y, stoneD);
            else if (r < 0.2) px(ctx, x, y, stoneL);
        }
        var gem1 = [[3,2],[4,2],[3,3],[4,3]];
        var gem2 = [[10,6],[11,6],[10,7],[11,7]];
        var gem3 = [[5,11],[6,11],[5,12],[6,12]];
        gem1.forEach(function(p){ px(ctx, p[0], p[1], cyan); });
        px(ctx, 3, 2, cyanL); px(ctx, 10, 6, cyanL); px(ctx, 5, 11, cyanL);
        gem2.forEach(function(p){ px(ctx, p[0], p[1], cyan); });
        gem3.forEach(function(p){ px(ctx, p[0], p[1], cyan); });
        px(ctx, 4, 3, cyanD); px(ctx, 11, 7, cyanD); px(ctx, 6, 12, cyanD);
        return c.toDataURL();
    }

    var textures = {
        dirt: dirtTexture(),
        grass: grassSideTexture(),
        grassTop: grassTopTexture(),
        stone: stoneTexture(),
        oak: oakPlankTexture(),
        sand: sandTexture(),
        nether: netherTexture(),
        diamond: diamondTexture()
    };

    function applyTextures() {
        var theme = document.documentElement.getAttribute('data-theme') || 'dirt';
        var tex = textures[theme] || textures.dirt;

        document.documentElement.style.setProperty('--card-texture', 'url(' + tex + ')');
        document.documentElement.style.setProperty('--hero-texture', 'url(' + tex + ')');
        document.documentElement.style.setProperty('--nav-texture', 'url(' + tex + ')');

        var introPanels = document.querySelectorAll('.intro-panel');
        if (introPanels.length) {
            introPanels.forEach(function(el) {
                el.style.backgroundImage = 'url(' + tex + ')';
                el.style.backgroundSize = '16px 16px';
                el.style.backgroundRepeat = 'repeat';
                el.style.imageRendering = 'pixelated';
            });
        }
    }

    applyTextures();

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.attributeName === 'data-theme') {
                setTimeout(applyTextures, 10);
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
})();

// Function to copy IP address
function copyIP() {
    copyText(document.getElementById('serverIP').textContent, '服务器地址已复制');
}

// 复制任意文本（服务器地址、QQ 群号等）
function copyText(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(message, 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text, message);
        });
    } else {
        fallbackCopyTextToClipboard(text, message);
    }
}

// Fallback copy function
function fallbackCopyTextToClipboard(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(message, 'success');
        } else {
            showNotification('复制失败，请手动复制', 'error');
        }
    } catch (err) {
        showNotification('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 0.9rem 1.4rem;
        border: 3px solid rgba(0, 0, 0, 0.5);
        border-radius: 0;
        font-weight: 700;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    `;
    
    // 颜色跟随当前随机主题
    switch (type) {
        case 'success':
            notification.style.background = 'var(--accent)';
            notification.style.color = 'var(--on-accent)';
            break;
        case 'error':
            notification.style.background = '#c4453a';
            notification.style.color = '#ffffff';
            break;
        default:
            notification.style.background = 'rgba(0, 0, 0, 0.88)';
            notification.style.color = '#e6e6e6';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes ripple-anim {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cinematic intro overlay
(function initIntro() {
    const intro = document.getElementById('intro');
    if (!intro) return;

    // 系统开启「减弱动态效果」时，直接跳过整段入场
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        intro.style.display = 'none';
        return;
    }

    const percent = document.getElementById('introPercent');
    const COUNT_DELAY = 750;    // 与 CSS 里进度条启动时间保持一致
    const COUNT_DURATION = 850; // 与 CSS 里 barFill 时长保持一致
    const TOTAL = 3000;         // 遮罩完全退场的时间点

    let finished = false;

    // 进度数字：0% -> 100%
    let counting = true;
    function startCount() {
        const start = performance.now();
        function tick(now) {
            if (!counting) return;
            const p = Math.min(1, (now - start) / COUNT_DURATION);
            if (percent) percent.textContent = Math.round(p * 100) + '%';
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
    setTimeout(startCount, COUNT_DELAY);

    function cleanup() {
        intro.removeEventListener('pointerdown', skip);
        window.removeEventListener('keydown', skip);
        window.removeEventListener('wheel', skip);
        window.removeEventListener('touchmove', skip);
    }

    // 点击 / 按键 / 滚动 都可跳过（跳过时让内容立刻归位）
    function skip() {
        if (finished) return;
        finished = true;
        counting = false;
        cleanup();
        document.documentElement.classList.add('skip-intro');
        // 直接摘掉遮罩，避免它继续挡住导航栏的点击
        intro.style.display = 'none';
    }

    // 正常播放结束：撤掉监听并移除遮罩
    function finish() {
        if (finished) return;
        finished = true;
        counting = false;
        cleanup();
        intro.style.display = 'none';
    }

    intro.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    setTimeout(finish, TOTAL);
})();

// 外观切换面板
(function initSkinSwitcher() {
    const THEMES = [
        { key: 'dirt', label: '泥土' },
        { key: 'grass', label: '草方块' },
        { key: 'stone', label: '石头' },
        { key: 'oak', label: '橡木' },
        { key: 'sand', label: '沙子' },
        { key: 'nether', label: '下界' },
        { key: 'diamond', label: '钻石' }
    ];
    const LAYOUTS = [
        { key: 'center', label: '居中' },
        { key: 'left', label: '靠左' },
        { key: 'magazine', label: '杂志' },
        { key: 'compact', label: '紧凑' }
    ];
    const CARDS = [
        { key: 'glass', label: '石板' },
        { key: 'outline', label: '描边' },
        { key: 'neon', label: '色块' },
        { key: 'stripe', label: '顶栏' }
    ];

    const html = document.documentElement;
    const toggle = document.getElementById('skinToggle');
    const panel = document.getElementById('skinPanel');
    const themeBox = document.getElementById('skinThemes');
    const layoutBox = document.getElementById('skinLayouts');
    const cardBox = document.getElementById('skinCards');

    if (!toggle || !panel) return;

    function generateTextures() {
        var SIZE = 8;

        function makeCanvas() {
            var c = document.createElement('canvas');
            c.width = SIZE;
            c.height = SIZE;
            return c;
        }

        function toUrl(canvas) {
            return canvas.toDataURL();
        }

        function px(ctx, x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }

        function fillAll(ctx, color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, SIZE, SIZE);
        }

        function dirt() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#6B4423');
            var dark = '#5A3819', mid = '#7A5533', light = '#8B6643';
            var spots = [
                [0,1,dark],[1,0,dark],[2,3,dark],[3,5,dark],[4,2,dark],
                [5,6,dark],[6,4,dark],[7,1,dark],[1,4,dark],[3,7,dark],
                [6,0,dark],[4,6,dark],[7,5,dark]
            ];
            var highlights = [
                [1,2,light],[2,5,light],[3,1,light],[5,3,light],
                [6,6,light],[0,7,light],[4,4,light],[7,3,light]
            ];
            var mids = [
                [0,3,mid],[2,1,mid],[4,5,mid],[5,0,mid],[6,2,mid],
                [1,6,mid],[3,4,mid],[7,7,mid],[2,6,mid],[5,5,mid]
            ];
            spots.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            highlights.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            mids.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        function grass() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#6B4423');
            var green1 = '#4A8B2C', green2 = '#3D7A22', green3 = '#5CA03A';
            var dark = '#5A3819', light = '#8B6643';
            for (var y = 0; y < 3; y++) {
                for (var x = 0; x < SIZE; x++) {
                    var g = (x + y) % 3 === 0 ? green2 : ((x * y) % 2 === 0 ? green3 : green1);
                    px(ctx, x, y, g);
                }
            }
            px(ctx, 0, 3, green2); px(ctx, 2, 3, green1); px(ctx, 5, 3, green3); px(ctx, 7, 3, green2);
            var spots = [[1,5,dark],[3,6,dark],[5,4,dark],[6,7,dark],[0,6,dark],[4,5,dark]];
            var highs = [[2,4,light],[6,5,light],[1,7,light],[4,6,light]];
            spots.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            highs.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        function stone() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#7F7F7F');
            var dark = '#636363', light = '#969696', vdark = '#505050';
            var base = [[0,0,light],[2,1,light],[4,3,light],[6,5,light],[1,6,light],[3,2,light],[5,7,light],[7,0,light]];
            var cracks = [[1,1,dark],[2,2,dark],[3,3,dark],[5,4,dark],[6,6,dark],[7,7,dark],[0,4,dark],[4,0,dark]];
            var deep = [[3,5,vdark],[6,2,vdark],[1,3,vdark],[5,1,vdark],[7,4,vdark]];
            var mid = [[0,2,'#727272'],[4,5,'#727272'],[2,7,'#727272'],[6,0,'#727272'],[1,5,'#8A8A8A'],[5,6,'#8A8A8A']];
            base.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            cracks.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            deep.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            mid.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        function oak() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#A07040');
            var grain1 = '#8B5E34', grain2 = '#B8884E', dark = '#6B4423';
            for (var y = 0; y < SIZE; y++) {
                for (var x = 0; x < SIZE; x++) {
                    if (y === 2 || y === 5) {
                        px(ctx, x, y, grain1);
                    } else if (y === 0 || y === 7) {
                        px(ctx, x, y, dark);
                    } else if ((x + y) % 5 === 0) {
                        px(ctx, x, y, grain2);
                    }
                }
            }
            px(ctx, 0, 2, dark); px(ctx, 7, 2, dark);
            px(ctx, 3, 5, dark); px(ctx, 4, 5, dark);
            return toUrl(c);
        }

        function sand() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#DBD3A0');
            var light = '#E8E0B0', dark = '#C4B880', vdark = '#B0A468';
            var l = [[0,1,light],[2,3,light],[4,0,light],[6,2,light],[1,5,light],[3,7,light],[5,4,light],[7,6,light]];
            var d = [[1,0,dark],[3,2,dark],[5,1,dark],[7,3,dark],[0,6,dark],[2,4,dark],[4,7,dark],[6,5,dark]];
            var vd = [[2,6,vdark],[5,3,vdark],[0,4,vdark],[7,1,vdark]];
            l.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            d.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            vd.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        function nether() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#6F2820');
            var light = '#8B3830', dark = '#4A1810', vdark = '#301008', glow = '#A04838';
            var l = [[1,0,light],[3,2,light],[5,4,light],[7,6,light],[0,3,light],[2,5,light],[4,7,light],[6,1,light]];
            var d = [[0,1,dark],[2,0,dark],[4,3,dark],[6,5,dark],[1,6,dark],[3,4,dark],[5,2,dark],[7,7,dark]];
            var vd = [[1,3,vdark],[4,1,vdark],[6,3,vdark],[3,6,vdark],[0,5,vdark],[7,0,vdark]];
            var g = [[2,2,glow],[5,5,glow],[0,7,glow],[7,4,glow]];
            l.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            d.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            vd.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            g.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        function diamondBlock() {
            var c = makeCanvas(), ctx = c.getContext('2d');
            fillAll(ctx, '#7F7F7F');
            var stone_d = '#636363', stone_l = '#969696';
            var cyan = '#4EC8B4', cyan_l = '#72E0D0', cyan_d = '#2EA090';
            for (var y = 0; y < SIZE; y++) {
                for (var x = 0; x < SIZE; x++) {
                    if ((x + y * 3) % 7 === 0) px(ctx, x, y, stone_d);
                    else if ((x * 2 + y) % 9 === 0) px(ctx, x, y, stone_l);
                }
            }
            var gems = [
                [2,1,cyan],[3,1,cyan_l],[2,2,cyan_d],[3,2,cyan],
                [5,4,cyan],[6,4,cyan_l],[5,5,cyan_d],[6,5,cyan],
                [0,6,cyan],[1,6,cyan_l],[0,7,cyan_d],[1,7,cyan]
            ];
            gems.forEach(function(s){ px(ctx,s[0],s[1],s[2]); });
            return toUrl(c);
        }

        var textures = {
            dirt: dirt(),
            grass: grass(),
            stone: stone(),
            oak: oak(),
            sand: sand(),
            nether: nether(),
            diamond: diamondBlock()
        };

        themeBox.querySelectorAll('.skin-theme-dot').forEach(function (el) {
            var key = el.getAttribute('data-theme');
            if (textures[key]) {
                el.style.backgroundImage = 'url(' + textures[key] + ')';
            }
        });
    }

    function buildDots(container, items, attr) {
        items.forEach(function (item) {
            var el = document.createElement('div');
            if (attr === 'data-theme') {
                el.className = 'skin-theme-dot';
                el.setAttribute('data-theme', item.key);
                el.title = item.label;
            } else {
                el.className = 'skin-opt';
                el.textContent = item.label;
                el.setAttribute('data-key', item.key);
            }
            el.addEventListener('click', function () {
                html.setAttribute(attr, item.key);
                syncActive();
            });
            container.appendChild(el);
        });
    }

    function syncActive() {
        var curTheme = html.getAttribute('data-theme');
        var curLayout = html.getAttribute('data-layout');
        var curCards = html.getAttribute('data-cards');

        themeBox.querySelectorAll('.skin-theme-dot').forEach(function (el) {
            el.classList.toggle('active', el.getAttribute('data-theme') === curTheme);
        });
        layoutBox.querySelectorAll('.skin-opt').forEach(function (el) {
            el.classList.toggle('active', el.getAttribute('data-key') === curLayout);
        });
        cardBox.querySelectorAll('.skin-opt').forEach(function (el) {
            el.classList.toggle('active', el.getAttribute('data-key') === curCards);
        });
    }

    buildDots(themeBox, THEMES, 'data-theme');
    buildDots(layoutBox, LAYOUTS, 'data-layout');
    buildDots(cardBox, CARDS, 'data-cards');
    generateTextures();
    syncActive();

    toggle.addEventListener('click', function () {
        panel.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    document.addEventListener('pointerdown', function (e) {
        var switcher = document.getElementById('skinSwitcher');
        if (switcher && !switcher.contains(e.target)) {
            panel.classList.remove('open');
            toggle.classList.remove('active');
        }
    });
})();

// Minecraft Java 版标题画面
(function initTitleScreen() {
    var titleScreen = document.getElementById('titleScreen');
    var siteBody = document.getElementById('siteBody');
    var btnMultiplayer = document.getElementById('btnMultiplayer');
    var btnSingleplayer = document.getElementById('btnSingleplayer');
    var btnRealms = document.getElementById('btnRealms');
    var btnOptions = document.getElementById('btnOptions');
    var btnQuit = document.getElementById('btnQuit');
    var backToTitle = document.getElementById('backToTitle');

    if (!titleScreen || !siteBody) return;

    function enterSite() {
        titleScreen.style.display = 'none';
        siteBody.style.display = '';
        window.scrollTo(0, 0);
    }

    function returnToTitle() {
        siteBody.style.display = 'none';
        titleScreen.style.display = '';
        window.scrollTo(0, 0);
    }

    if (btnMultiplayer) {
        btnMultiplayer.addEventListener('click', enterSite);
    }

    if (btnSingleplayer) {
        btnSingleplayer.addEventListener('click', function () {
            if (window.startMcGame) {
                window.startMcGame();
            } else {
                showNotification('单人游戏加载中...', 'info');
            }
        });
    }

    if (btnRealms) {
        btnRealms.addEventListener('click', function () {
            showNotification('Minecraft Realms 暂不可用', 'info');
        });
    }

    if (btnOptions) {
        btnOptions.addEventListener('click', function () {
            enterSite();
            setTimeout(function () {
                var panel = document.getElementById('skinPanel');
                var toggle = document.getElementById('skinToggle');
                if (panel) panel.classList.add('open');
                if (toggle) toggle.classList.add('active');
            }, 100);
        });
    }

    if (btnQuit) {
        btnQuit.addEventListener('click', function () {
            showNotification('已关闭（刷新页面即可重新开始）', 'info');
            setTimeout(function () {
                location.reload();
            }, 1500);
        });
    }

    if (backToTitle) {
        backToTitle.addEventListener('click', returnToTitle);
    }
})();

// 标题画面：全景背景 + 按钮石头纹理 + Splash 轮换
(function initTitleBg() {
    // ---- 1. 全景风景画 — 更大更精细 ----
    var W = 1024, H = 512;
    var pan = document.createElement('canvas');
    pan.width = W; pan.height = H;
    var pctx = pan.getContext('2d');

    function seededRandom(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    // 天空渐变
    var skyGrad = pctx.createLinearGradient(0, 0, 0, H * 0.6);
    skyGrad.addColorStop(0, '#5a8acc');
    skyGrad.addColorStop(0.4, '#7aaae8');
    skyGrad.addColorStop(0.7, '#a8ccee');
    skyGrad.addColorStop(1, '#c8ddf0');
    pctx.fillStyle = skyGrad;
    pctx.fillRect(0, 0, W, H);

    // 太阳
    var sunGrad = pctx.createRadialGradient(W * 0.7, H * 0.18, 0, W * 0.7, H * 0.18, 50);
    sunGrad.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
    sunGrad.addColorStop(0.5, 'rgba(255, 255, 150, 0.3)');
    sunGrad.addColorStop(1, 'rgba(255, 255, 100, 0)');
    pctx.fillStyle = sunGrad;
    pctx.fillRect(W * 0.5, 0, W * 0.4, H * 0.4);

    // 远山
    function drawMountainRange(baseY, height, color, seed) {
        pctx.fillStyle = color;
        pctx.beginPath();
        pctx.moveTo(0, H);
        for (var x = 0; x <= W; x += 2) {
            var n = 0;
            n += Math.sin((x + seed) * 0.008) * height * 0.5;
            n += Math.sin((x + seed) * 0.02 + 1.3) * height * 0.3;
            n += Math.sin((x + seed) * 0.05 + 2.7) * height * 0.15;
            n += Math.sin((x + seed) * 0.12 + 0.5) * height * 0.05;
            pctx.lineTo(x, baseY - Math.abs(n));
        }
        pctx.lineTo(W, H);
        pctx.closePath();
        pctx.fill();
    }

    drawMountainRange(H * 0.5, 80, '#7a9a7a', 0);
    drawMountainRange(H * 0.55, 60, '#6a8a6a', 100);
    drawMountainRange(H * 0.6, 50, '#5a7a5a', 200);
    drawMountainRange(H * 0.65, 40, '#4a6a4a', 300);

    // 草地
    var grassGrad = pctx.createLinearGradient(0, H * 0.65, 0, H);
    grassGrad.addColorStop(0, '#4a8a2c');
    grassGrad.addColorStop(0.3, '#3d7a22');
    grassGrad.addColorStop(1, '#2d5a18');
    pctx.fillStyle = grassGrad;
    pctx.fillRect(0, H * 0.65, W, H * 0.35);

    // 草地纹理噪点
    for (var i = 0; i < 8000; i++) {
        var gx = Math.random() * W;
        var gy = H * 0.65 + Math.random() * H * 0.35;
        var gr = Math.random();
        if (gr < 0.25) pctx.fillStyle = 'rgba(0,0,0,0.1)';
        else if (gr < 0.45) pctx.fillStyle = 'rgba(255,255,255,0.08)';
        else if (gr < 0.55) pctx.fillStyle = '#2d6418';
        else if (gr < 0.6) pctx.fillStyle = '#5ca03a';
        else continue;
        pctx.fillRect(gx, gy, 2, 2);
    }

    // 树
    function drawTree(tx, ty, size) {
        pctx.fillStyle = '#4a3020';
        pctx.fillRect(tx - size * 0.1, ty - size * 0.6, size * 0.2, size * 0.6);
        pctx.fillStyle = '#2d6418';
        pctx.fillRect(tx - size * 0.5, ty - size * 1.2, size, size * 0.5);
        pctx.fillStyle = '#3d7a22';
        pctx.fillRect(tx - size * 0.4, ty - size * 1.5, size * 0.8, size * 0.4);
        pctx.fillStyle = '#4a8a2c';
        pctx.fillRect(tx - size * 0.25, ty - size * 1.7, size * 0.5, size * 0.3);
    }

    // 树 — 更多更密
    var treePositions = [];
    for (var t = 0; t < 25; t++) {
        treePositions.push(W * (t / 25) + seededRandom(t * 17) * 30);
    }
    treePositions.forEach(function(tx, idx) {
        var ty = H * 0.65 + seededRandom(idx * 31) * 12;
        var ts = 15 + seededRandom(idx * 47) * 10;
        drawTree(tx, ty, ts);
    });

    // 花 — 仿 MC 的花
    for (var f = 0; f < 60; f++) {
        var fx = Math.random() * W;
        var fy = H * 0.68 + Math.random() * H * 0.25;
        var ftype = Math.random();
        if (ftype < 0.3) {
            pctx.fillStyle = '#cc3333';
            pctx.fillRect(fx, fy, 3, 3);
            pctx.fillStyle = '#3d7a22';
            pctx.fillRect(fx + 1, fy + 3, 1, 4);
        } else if (ftype < 0.6) {
            pctx.fillStyle = '#ffcc00';
            pctx.fillRect(fx, fy, 3, 3);
            pctx.fillStyle = '#3d7a22';
            pctx.fillRect(fx + 1, fy + 3, 1, 4);
        } else {
            pctx.fillStyle = '#5ca03a';
            pctx.fillRect(fx, fy, 1, 5);
        }
    }

    // 水面
    pctx.fillStyle = 'rgba(60, 120, 180, 0.3)';
    pctx.fillRect(W * 0.3, H * 0.72, W * 0.25, H * 0.06);
    pctx.fillStyle = 'rgba(100, 160, 220, 0.2)';
    pctx.fillRect(W * 0.32, H * 0.73, W * 0.21, H * 0.04);

    // 云
    function drawCloud(cx, cy, cw) {
        pctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        pctx.fillRect(cx, cy, cw, cw * 0.25);
        pctx.fillRect(cx + cw * 0.15, cy - cw * 0.15, cw * 0.5, cw * 0.2);
        pctx.fillRect(cx + cw * 0.35, cy - cw * 0.25, cw * 0.3, cw * 0.15);
        pctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        pctx.fillRect(cx + cw * 0.1, cy + cw * 0.2, cw * 0.7, cw * 0.08);
    }

    drawCloud(60, 30, 80);
    drawCloud(200, 50, 60);
    drawCloud(380, 25, 90);
    drawCloud(550, 55, 70);
    drawCloud(720, 35, 85);
    drawCloud(900, 45, 65);

    var panUrl = pan.toDataURL();
    var titleBg = document.getElementById('titleBg');
    if (titleBg) {
        titleBg.style.backgroundImage = 'url(' + panUrl + ')';
        titleBg.style.backgroundSize = 'cover';
        titleBg.style.backgroundPosition = 'center';
    }

    // ---- 2. 按钮石头纹理 ----
    var BS = 16;
    var bc = document.createElement('canvas');
    bc.width = BS; bc.height = BS;
    var bctx = bc.getContext('2d');

    bctx.fillStyle = '#8a8a8a';
    bctx.fillRect(0, 0, BS, BS);

    for (var i = 0; i < BS * BS; i++) {
        var bx = i % BS, by = Math.floor(i / BS);
        var br = seededRandom(bx * 41 + by * 23 + 77);
        if (br < 0.12) bctx.fillStyle = '#6a6a6a';
        else if (br < 0.2) bctx.fillStyle = '#9a9a9a';
        else if (br < 0.24) bctx.fillStyle = '#5a5a5a';
        else continue;
        bctx.fillRect(bx, by, 1, 1);
    }

    var btnTexUrl = bc.toDataURL();
    document.documentElement.style.setProperty('--mc-btn-texture', 'url(' + btnTexUrl + ')');

    // ---- 3. Splash 文字轮换 ----
    var SPLASHES = [
        '我们的生存服!',
        '全版本生存!',
        '不删档!',
        '7x24 开服!',
        '欢迎加入!',
        '纯生存!',
        'Minecraft!',
        '一起来玩!',
        '长期稳定!',
        'QQ群: 149253827!',
        '不限人数!',
        '自由建造!',
        'Also try Terraria!',
        'Pixel perfect!',
        '100% Vanilla!',
        'As seen on Facebook!',
        'Check out the wiki!',
        'Casual gaming!',
        'Wow!',
        'Germinated!'
    ];

    var splashEl = document.getElementById('titleSplash');
    var splashIdx = 0;

    function cycleSplash() {
        splashIdx = (splashIdx + 1) % SPLASHES.length;
        if (splashEl) {
            splashEl.style.opacity = '0';
            setTimeout(function() {
                splashEl.textContent = SPLASHES[splashIdx];
                splashEl.style.opacity = '1';
            }, 200);
        }
    }

    if (splashEl) {
        splashEl.style.transition = 'opacity 0.2s ease';
        setInterval(cycleSplash, 4000);
    }
})(); 