document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');

  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const authForm = document.getElementById('authForm');
  const authSubmit = document.getElementById('authSubmit');
  const submitText = document.getElementById('submitText');
  const submitLoader = document.getElementById('submitLoader');
  const authToggle = document.getElementById('authToggle');
  const toggleLogin = document.getElementById('toggleLogin');
  const toggleSignup = document.getElementById('toggleSignup');
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

  const securityGroup = document.getElementById('securityGroup');
  const securityAnswerGroup = document.getElementById('securityAnswerGroup');
  const authSecurityQuestion = document.getElementById('authSecurityQuestion');
  const authSecurityAnswer = document.getElementById('authSecurityAnswer');
  const securityQuestionError = document.getElementById('securityQuestionError');
  const securityAnswerError = document.getElementById('securityAnswerError');


  const forgotPass = document.getElementById('forgotPass');
  const guestBtn = document.getElementById('guestBtn');
  const guestSection = document.querySelector('.auth-card__guest');

  const USERS_KEY = 'tomato_diary_users';
  const SESSION_KEY = 'tomato_diary_session';

  let isSignUp = false;

  // Set initial state to signup
  setMode(true);

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
      submitText.textContent = 'Sign Up Cutie';
      nameGroup.style.display = 'flex';
      confirmGroup.style.display = 'flex';
      loginOptions.style.display = 'none';
      authName.required = true;
      authConfirm.required = true;
      securityGroup.style.display = 'flex';
      securityAnswerGroup.style.display = 'flex';
      authSecurityQuestion.required = true;
      authSecurityAnswer.required = true;
      toggleSignup.classList.add('active');
      toggleLogin.classList.remove('active');
      authToggle.classList.add('signup-active');
      if (guestSection) guestSection.style.display = 'block';
    } else {
      authTitle.textContent = 'Welcome back';
      authSubtitle.textContent = 'Sign in to continue your journey';
      submitText.textContent = 'LOG In Cutie';
      nameGroup.style.display = 'none';
      confirmGroup.style.display = 'none';
      loginOptions.style.display = 'flex';
      authName.required = false;
      authConfirm.required = false;
      securityGroup.style.display = 'none';
      securityAnswerGroup.style.display = 'none';
      authSecurityQuestion.required = false;
      authSecurityAnswer.required = false;
      toggleLogin.classList.add('active');
      toggleSignup.classList.remove('active');
      authToggle.classList.remove('signup-active');
      if (guestSection) guestSection.style.display = 'none';
    }

    clearErrors();
    authForm.reset();
  }

  toggleLogin.addEventListener('click', () => setMode(false));
  toggleSignup.addEventListener('click', () => setMode(true));

  // Go to signup button
  const goSignup = document.getElementById('goSignup');
  if (goSignup) {
    goSignup.addEventListener('click', () => setMode(true));
  }

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
    [authName, authUsername, authEmail, authPassword, authConfirm, authSecurityQuestion, authSecurityAnswer].forEach(el => {
      el.classList.remove('error', 'success');
    });
    [nameError, usernameError, emailError, passwordError, confirmError, securityQuestionError, securityAnswerError].forEach(el => {
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

    if (isSignUp) {
      const sq = authSecurityQuestion.value || sqSelectedValue;
      if (!sq) {
        showError(authSecurityQuestion, securityQuestionError, 'Please select a security question');
        valid = false;
      } else {
        markSuccess(authSecurityQuestion);
      }

      const sa = authSecurityAnswer.value.trim();
      if (!sa) {
        showError(authSecurityAnswer, securityAnswerError, 'Please provide an answer');
        valid = false;
      } else if (sa.length < 1) {
        showError(authSecurityAnswer, securityAnswerError, 'Answer cannot be empty');
        valid = false;
      } else {
        markSuccess(authSecurityAnswer);
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
        securityQuestion: authSecurityQuestion.value,
        securityAnswer: btoa(authSecurityAnswer.value.trim().toLowerCase()),
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
    window.location.href = '../index.html';
  });


  // ===== FORGOT PASSWORD MODAL =====
  const fpModal = document.getElementById('fpModal');
  const fpOverlay = document.getElementById('fpOverlay');
  const fpClose = document.getElementById('fpClose');
  const fpTitle = document.getElementById('fpTitle');
  const fpStep1 = document.getElementById('fpStep1');
  const fpStep2 = document.getElementById('fpStep2');
  const fpStep3 = document.getElementById('fpStep3');
  const fpSuccess = document.getElementById('fpSuccess');
  const fpStep1Btn = document.getElementById('fpStep1Btn');
  const fpStep2Btn = document.getElementById('fpStep2Btn');
  const fpStep3Btn = document.getElementById('fpStep3Btn');
  const fpUsername = document.getElementById('fpUsername');
  const fpAnswer = document.getElementById('fpAnswer');
  const fpNewPassword = document.getElementById('fpNewPassword');
  const fpConfirmPassword = document.getElementById('fpConfirmPassword');
  const fpQuestionDisplay = document.getElementById('fpQuestionDisplay');
  const fpUsernameError = document.getElementById('fpUsernameError');
  const fpAnswerError = document.getElementById('fpAnswerError');
  const fpNewPassError = document.getElementById('fpNewPassError');
  const fpConfirmPassError = document.getElementById('fpConfirmPassError');
  const fpTogglePass = document.getElementById('fpTogglePass');

  let fpCurrentUser = null;
  let fpCurrentStep = 1;

  function openFpModal() {
    fpModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetFpModal();
  }

  function closeFpModal() {
    fpModal.classList.remove('active');
    document.body.style.overflow = '';
    resetFpModal();
  }

  function resetFpModal() {
    fpCurrentStep = 1;
    fpCurrentUser = null;
    showFpStep(1);
    fpUsername.value = '';
    fpAnswer.value = '';
    fpNewPassword.value = '';
    fpConfirmPassword.value = '';
    fpQuestionDisplay.textContent = '';
    [fpUsernameError, fpAnswerError, fpNewPassError, fpConfirmPassError].forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
    [fpUsername, fpAnswer, fpNewPassword, fpConfirmPassword].forEach(el => {
      el.classList.remove('error', 'success');
    });
  }

  function showFpStep(step) {
    fpCurrentStep = step;
    [fpStep1, fpStep2, fpStep3, fpSuccess].forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.fp-modal__step').forEach(el => {
      el.classList.remove('active', 'completed');
    });
    document.querySelectorAll('.fp-modal__step-line').forEach(el => {
      el.classList.remove('completed');
    });

    if (step === 1) {
      fpStep1.classList.add('active');
      document.querySelector('.fp-modal__step[data-step="1"]').classList.add('active');
      fpTitle.textContent = 'Reset Password';
    } else if (step === 2) {
      fpStep2.classList.add('active');
      document.querySelector('.fp-modal__step[data-step="1"]').classList.add('completed');
      document.querySelector('.fp-modal__step[data-step="1"] .fp-modal__step-dot').textContent = '✓';
      document.querySelector('.fp-modal__step-line').classList.add('completed');
      document.querySelector('.fp-modal__step[data-step="2"]').classList.add('active');
      fpTitle.textContent = 'Verify Identity';
    } else if (step === 3) {
      fpStep3.classList.add('active');
      document.querySelector('.fp-modal__step[data-step="1"]').classList.add('completed');
      document.querySelector('.fp-modal__step[data-step="1"] .fp-modal__step-dot').textContent = '✓';
      document.querySelectorAll('.fp-modal__step-line').forEach(el => el.classList.add('completed'));
      document.querySelector('.fp-modal__step[data-step="2"]').classList.add('completed');
      document.querySelector('.fp-modal__step[data-step="2"] .fp-modal__step-dot').textContent = '✓';
      document.querySelector('.fp-modal__step[data-step="3"]').classList.add('active');
      fpTitle.textContent = 'New Password';
    } else if (step === 4) {
      fpSuccess.classList.add('active');
      document.querySelectorAll('.fp-modal__step').forEach(el => el.classList.add('completed'));
      document.querySelectorAll('.fp-modal__step-dot').forEach(el => el.textContent = '✓');
      document.querySelectorAll('.fp-modal__step-line').forEach(el => el.classList.add('completed'));
      fpTitle.textContent = 'All Done!';
    }
  }

  function fpShowError(input, errorEl, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  // Step 1: Find account
  fpStep1Btn.addEventListener('click', async () => {
    fpUsernameError.textContent = '';
    fpUsernameError.classList.remove('visible');
    fpUsername.classList.remove('error');

    const username = fpUsername.value.trim();
    if (!username) {
      fpShowError(fpUsername, fpUsernameError, 'Please enter your username');
      return;
    }

    fpStep1Btn.classList.add('loading');
    fpStep1Btn.disabled = true;
    await sleep(800);

    const users = getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
      fpStep1Btn.classList.remove('loading');
      fpStep1Btn.disabled = false;
      fpShowError(fpUsername, fpUsernameError, 'No account found with this username');
      return;
    }

    if (!user.securityQuestion) {
      fpStep1Btn.classList.remove('loading');
      fpStep1Btn.disabled = false;
      fpShowError(fpUsername, fpUsernameError, 'This account has no security question set');
      return;
    }

    fpCurrentUser = user;
    fpQuestionDisplay.textContent = user.securityQuestion;
    fpStep1Btn.classList.remove('loading');
    fpStep1Btn.disabled = false;
    showFpStep(2);
  });

  // Step 2: Verify answer
  fpStep2Btn.addEventListener('click', async () => {
    fpAnswerError.textContent = '';
    fpAnswerError.classList.remove('visible');
    fpAnswer.classList.remove('error');

    const answer = fpAnswer.value.trim();
    if (!answer) {
      fpShowError(fpAnswer, fpAnswerError, 'Please enter your answer');
      return;
    }

    fpStep2Btn.classList.add('loading');
    fpStep2Btn.disabled = true;
    await sleep(800);

    const storedAnswer = atob(fpCurrentUser.securityAnswer);
    if (answer.toLowerCase() !== storedAnswer) {
      fpStep2Btn.classList.remove('loading');
      fpStep2Btn.disabled = false;
      fpShowError(fpAnswer, fpAnswerError, 'Incorrect answer. Please try again.');
      return;
    }

    fpStep2Btn.classList.remove('loading');
    fpStep2Btn.disabled = false;
    showFpStep(3);
  });

  // Step 3: Reset password
  fpStep3Btn.addEventListener('click', async () => {
    fpNewPassError.textContent = '';
    fpNewPassError.classList.remove('visible');
    fpConfirmPassError.textContent = '';
    fpConfirmPassError.classList.remove('visible');
    fpNewPassword.classList.remove('error');
    fpConfirmPassword.classList.remove('error');

    const newPass = fpNewPassword.value;
    const confirmPass = fpConfirmPassword.value;
    let valid = true;

    if (!newPass) {
      fpShowError(fpNewPassword, fpNewPassError, 'Please enter a new password');
      valid = false;
    } else if (!validatePassword(newPass)) {
      fpShowError(fpNewPassword, fpNewPassError, 'Password must be at least 6 characters');
      valid = false;
    }

    if (!confirmPass) {
      fpShowError(fpConfirmPassword, fpConfirmPassError, 'Please confirm your password');
      valid = false;
    } else if (confirmPass !== newPass) {
      fpShowError(fpConfirmPassword, fpConfirmPassError, 'Passwords do not match');
      valid = false;
    }

    if (!valid) return;

    fpStep3Btn.classList.add('loading');
    fpStep3Btn.disabled = true;
    await sleep(1000);

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === fpCurrentUser.id);
    if (userIndex > -1) {
      users[userIndex].password = btoa(newPass);
      saveUsers(users);
    }

    fpStep3Btn.classList.remove('loading');
    fpStep3Btn.disabled = false;
    showFpStep(4);

    setTimeout(() => {
      closeFpModal();
      showToast('Password updated! You can now sign in.', 'success');
    }, 2500);
  });

  // Security question custom dropdown
  const sqDropdown = document.getElementById('sqDropdown');
  const sqTrigger = document.getElementById('sqTrigger');
  const sqMenu = document.getElementById('sqMenu');
  const sqLabel = document.getElementById('sqLabel');
  const sqOptions = sqMenu.querySelectorAll('.sq-dropdown__option');
  let sqSelectedValue = '';

  sqTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sqDropdown.classList.contains('open');
    if (isOpen) {
      closeSqDropdown();
    } else {
      sqDropdown.classList.add('open');
      sqTrigger.setAttribute('aria-expanded', 'true');
    }
  });

  sqOptions.forEach(option => {
    option.addEventListener('click', () => {
      sqOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      sqLabel.textContent = option.dataset.value;
      sqLabel.style.color = 'var(--color-text-primary)';
      sqSelectedValue = option.dataset.value;
      authSecurityQuestion.value = sqSelectedValue;
      sqTrigger.classList.add('has-value');
      closeSqDropdown();
    });
  });

  function closeSqDropdown() {
    sqDropdown.classList.remove('open');
    sqTrigger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (!sqDropdown.contains(e.target)) {
      closeSqDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSqDropdown();
    }
  });

  // Password toggle in modal
  fpTogglePass.addEventListener('click', () => {
    const isPassword = fpNewPassword.type === 'password';
    fpNewPassword.type = isPassword ? 'text' : 'password';
    fpTogglePass.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
    fpTogglePass.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
  });

  // Open/close modal
  forgotPass.addEventListener('click', (e) => {
    e.preventDefault();
    openFpModal();
  });

  fpClose.addEventListener('click', closeFpModal);
  fpOverlay.addEventListener('click', closeFpModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fpModal.classList.contains('active')) {
      closeFpModal();
    }
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
