// script.js

// Show/Hide Password
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'HIDE';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'SHOW';
    }
});

// Password Strength Meter
passwordInput.addEventListener('input', function () {
    const strengthBar = document.querySelector('#password-strength div');
    const strength = calculatePasswordStrength(passwordInput.value);
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
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) strength++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
    if (password.length > 8) strength++;
    return strength;
}

// Form Submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Form validation can be added here
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (email && password) {
        // Simulate login logic
        alert('Login successful!');
    } else {
        alert('Please fill out all fields.');
    }
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
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
                "speed": 6
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
