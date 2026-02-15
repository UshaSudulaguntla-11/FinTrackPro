const API_URL = '/api';

const utils = {
    // API Call wrapper
    async request(endpoint, method = 'GET', data = null) {
        const token = localStorage.getItem('token');
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/auth.html';
            }
            throw new Error(result.error || 'Something went wrong');
        }
        return result;
    },

    setToken(token) { localStorage.setItem('token', token); },
    getToken() { return localStorage.getItem('token'); },
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    },

    checkAuth() {
        if (!this.getToken() && !window.location.pathname.includes('/auth')) {
            window.location.href = '/auth';
        }
    },

    createStars() {
        const container = document.createElement('div');
        container.className = 'stars-container';
        document.body.appendChild(container);

        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            container.appendChild(star);
        }
    },

    initInteractions() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (btn) {
                btn.classList.add('interactive-ripple');
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // For the ripple CSS effect
                btn.style.setProperty('--x', `${x}px`);
                btn.style.setProperty('--y', `${y}px`);
            }
        });
    }
};

// Initialize
utils.createStars();
utils.initInteractions();
utils.checkAuth();
