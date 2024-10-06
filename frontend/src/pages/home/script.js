// script.js

// Show/Hide Password
document.querySelectorAll('.toggle-password').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        const passwordInput = document.querySelector(toggle.getAttribute('data-toggle'));
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggle.textContent = 'HIDE';
        } else {
            passwordInput.type = 'password';
            toggle.textContent = 'SHOW';
        }
    });
});

// Password Strength Meter
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(function (input) {
    input.addEventListener('input', function () {
        const strengthBar = input.parentElement.querySelector('#password-strength div');
        if (strengthBar) {
            const strength = calculatePasswordStrength(input.value);
            const strengthPercent = strength * 25;
            strengthBar.style.width = strengthPercent + '%';
            if (strength <= 1) {
                strengthBar.style.backgroundColor = 'red';
            } else if (strength === 2) {
                strengthBar.style.backgroundColor = 'orange';
            } else if (strength === 3) {
                strengthBar.style.backgroundColor = 'yellow';
            } else if (strength >= 4) {
                strengthBar.style.backgroundColor = 'green';
            }
        }
    });
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) strength++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
    if (password.length > 8) strength++;
    return strength;
}

// Form Submission for Login
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Form validation can be added here
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (email && password) {
        // Simulate login logic
        alert('Login successful!');
    } else {
        alert('Please fill out all fields.');
    }
});

// Form Submission for Sign Up
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect form data
    const email = document.getElementById('signup-email').value;
    const studentId = document.getElementById('student-id').value;
    const contactNumber = document.getElementById('contact-number').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const primaryDegree = document.getElementById('primary-degree').value;
    const secondDegree = document.getElementById('second-degree').value;
    const secondMajor = document.getElementById('second-major').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const isTutor = document.getElementById('signup-tutor').checked;
    const isTutee = document.getElementById('signup-tutee').checked;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    if (!isTutor && !isTutee) {
        alert('Please select at least one role (Tutor or Tutee).');
        return;
    }

    // Simulate sign-up logic
    alert('Sign-up successful!');
});

// Form Submission for Forgot Password
document.getElementById('forgot-password-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    if (email) {
        // Simulate password reset logic
        alert('Password reset link has been sent to your email.');
    } else {
        alert('Please enter your email address.');
    }
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5
            },
            "size": {
                "value": 3
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 4
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                }
            },
            "modes": {
                "grab": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    }
);
