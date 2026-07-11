document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');

  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const authForm = document.getElementById('authForm');
  const authSubmit = document.getElementById('authSubmit');
  const submitText = document.getElementById('submitText');
  const submitLoader = document.getElementById('submitLoader');
  const switchBtn = document.getElementById('switchBtn');
  const switchText = document.getElementById('switchText');
  const togglePass = document.getElementById('togglePass');

  const nameGroup = document.getElementById('nameGroup');
  const emailGroup = document.getElementById('emailGroup');
  const confirmGroup = document.getElementById('confirmGroup');
  const loginOptions = document.getElementById('loginOptions');

  const authName = document.getElementById('authName');
  const authUsername = document.getElementById('authUsername');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authConfirm = document.getElementById('authConfirm');

  const nameError = document.getElementById('nameError');
  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  const googleBtn = document.getElementById('googleBtn');
  const facebookBtn = document.getElementById('facebookBtn');
  const forgotPass = document.getElementById('forgotPass');
  const guestBtn = document.getElementById('guestBtn');

  const USERS_KEY = 'tomato_diary_users';
  const SESSION_KEY = 'tomato_diary_session';

  let isSignUp = false;

  // Check if already logged in
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    window.location.href = '../index.html';
    return;
  }

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 600);

  // ===== MODE SWITCH =====
  function setMode(signUp) {
    isSignUp = signUp;

    if (isSignUp) {
      authTitle.textContent = 'Create account';
      authSubtitle.textContent = 'Start your writing journey today';
      submitText.textContent = 'Create Account';
      switchText.textContent = 'Already have an account?';
      switchBtn.textContent = 'Sign In';
      nameGroup.style.display = 'flex';
      confirmGroup.style.display = 'flex';
      loginOptions.style.display = 'none';
      authName.required = true;
      authConfirm.required = true;
    } else {
      authTitle.textContent = 'Welcome back';
      authSubtitle.textContent = 'Sign in to continue your journey';
      submitText.textContent = 'Sign In';
      switchText.textContent = "Don't have an account?";
      switchBtn.textContent = 'Sign Up';
      nameGroup.style.display = 'none';
      confirmGroup.style.display = 'none';
      loginOptions.style.display = 'flex';
      authName.required = false;
      authConfirm.required = false;
    }

    clearErrors();
    authForm.reset();
  }

  switchBtn.addEventListener('click', () => setMode(!isSignUp));

  // ===== PASSWORD TOGGLE =====
  togglePass.addEventListener('click', () => {
    const isPassword = authPassword.type === 'password';
    authPassword.type = isPassword ? 'text' : 'password';
    togglePass.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
    togglePass.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
  });

  // ===== VALIDATION =====
  function showError(input, errorEl, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }

  function clearErrors() {
    [authName, authUsername, authEmail, authPassword, authConfirm].forEach(el => {
      el.classList.remove('error', 'success');
    });
    [nameError, usernameError, emailError, passwordError, confirmError].forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }

  function markSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ===== FORM SUBMIT =====
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (isSignUp) {
      const name = authName.value.trim();
      if (!name) {
        showError(authName, nameError, 'Please enter your name');
        valid = false;
      } else if (name.length < 2) {
        showError(authName, nameError, 'Name must be at least 2 characters');
        valid = false;
      } else {
        markSuccess(authName);
      }
    }

    const username = authUsername.value.trim();
    if (!username) {
      showError(authUsername, usernameError, 'Please enter a username');
      valid = false;
    } else if (!validateUsername(username)) {
      showError(authUsername, usernameError, '3-20 chars, letters, numbers & underscore only');
      valid = false;
    } else {
      markSuccess(authUsername);
    }

    if (isSignUp) {
      const email = authEmail.value.trim();
      if (!email) {
        showError(authEmail, emailError, 'Please enter your email');
        valid = false;
      } else if (!validateEmail(email)) {
        showError(authEmail, emailError, 'Please enter a valid email');
        valid = false;
      } else {
        markSuccess(authEmail);
      }
    }

    const password = authPassword.value;
    if (!password) {
      showError(authPassword, passwordError, 'Please enter a password');
      valid = false;
    } else if (!validatePassword(password)) {
      showError(authPassword, passwordError, 'Password must be at least 6 characters');
      valid = false;
    } else {
      markSuccess(authPassword);
    }

    if (isSignUp) {
      const confirm = authConfirm.value;
      if (!confirm) {
        showError(authConfirm, confirmError, 'Please confirm your password');
        valid = false;
      } else if (confirm !== password) {
        showError(authConfirm, confirmError, 'Passwords do not match');
        valid = false;
      } else {
        markSuccess(authConfirm);
      }
    }

    if (!valid) return;

    // Show loading
    authSubmit.classList.add('loading');
    authSubmit.disabled = true;

    await sleep(1200);

    const users = getUsers();

    if (isSignUp) {
      const exists = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() ||
             u.email.toLowerCase() === authEmail.value.trim().toLowerCase()
      );

      if (exists) {
        authSubmit.classList.remove('loading');
        authSubmit.disabled = false;
        if (exists.username.toLowerCase() === username.toLowerCase()) {
          showError(authUsername, usernameError, 'This username is already taken');
        } else {
          showError(authEmail, emailError, 'An account with this email already exists');
        }
        return;
      }

      const newUser = {
        id: generateId(),
        name: authName.value.trim(),
        username: username,
        email: authEmail.value.trim(),
        password: btoa(password),
        provider: 'local',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);

      createSession(newUser);
      showToast('Account created! Welcome to your diary.', 'success');

      await sleep(1000);
      window.location.href = '../index.html';

    } else {
      const user = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() &&
             atob(u.password) === password
      );

      if (!user) {
        authSubmit.classList.remove('loading');
        authSubmit.disabled = false;
        showError(authUsername, usernameError, 'Invalid username or password');
        return;
      }

      createSession(user);
      showToast('Welcome back, ' + user.name + '!', 'success');

      await sleep(1000);
      window.location.href = '../index.html';
    }
  });

  // ===== SOCIAL AUTH (placeholder) =====
  googleBtn.addEventListener('click', () => {
    showToast('Google sign-in will be available with Firebase', 'info');
  });

  facebookBtn.addEventListener('click', () => {
    showToast('Facebook sign-in will be available with Firebase', 'info');
  });

  forgotPass.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password reset will be available with Firebase', 'info');
  });

  guestBtn.addEventListener('click', () => {
    const guestSession = {
      id: 'guest_' + Date.now().toString(36),
      name: 'Guest',
      username: 'guest',
      email: '',
      provider: 'guest',
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(guestSession));
    showToast('Welcome, Guest!', 'info');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 800);
  });

  // ===== SESSION =====
  function createSession(user) {
    const session = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      provider: user.provider || 'local',
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  // ===== TOAST =====
  function showToast(message, type) {
    const toast = document.getElementById('authToast');
    toast.textContent = message;
    toast.className = 'auth-toast ' + type;
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3500);
  }

  // ===== UTILITY =====
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
});
