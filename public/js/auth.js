const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const toggleAuthLink = document.getElementById('toggle-auth-link');
const nameGroup = document.getElementById('name-group');

let isLogin = true;

toggleAuthLink.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Login to FinTrack Pro' : 'Sign Up for FinTrack Pro';
    authSubmitBtn.innerText = isLogin ? 'Login' : 'Sign Up';
    toggleAuthLink.innerText = isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login';
    nameGroup.style.display = isLogin ? 'none' : 'block';
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const displayName = document.getElementById('displayName').value.trim();

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { email, password, displayName };

    try {
        const result = await utils.request(endpoint, 'POST', payload);
        if (isLogin) {
            utils.setToken(result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/';
        } else {
            alert('Signup successful! Please login.');
            isLogin = true;
            toggleAuthLink.click();
        }
    } catch (error) {
        alert(error.message);
    }
});
