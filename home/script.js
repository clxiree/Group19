// script.js

// Firebase Auth reference
const auth = firebase.auth();

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
// (Include this section if needed)

// Function to show the toast with a message and type
function showToast(message, type) {
    const toast = document.getElementById("customToast");
    const toastMessage = document.getElementById("customToastMessage");

    // Set the message and apply success/error style
    toastMessage.textContent = message;
    toast.classList.add("show", type);

    // Hide the toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove("show", type);
    }, 5000);
}

// Close button function for the toast
function closeToast() {
    const toast = document.getElementById("customToast");
    toast.classList.remove("show");
}

// Form Submission for Login
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show the loading screen
    document.getElementById('loading-screen').style.display = 'flex';

    // Delay for 3 seconds to simulate checking
    setTimeout(function () {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        if (email && password) {
            // Sign in with Firebase Auth
            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const userEmail = userCredential.user.email;
                    // Store email in sessionStorage
                    sessionStorage.setItem('userEmail', email);
                    // Hide the loading screen
                    document.getElementById('loading-screen').style.display = 'none';

                    // Extract the role from the email
                    const roleMatch = userEmail.match(/scis\.(.*?)\.edu\.sg/);
                    const role = roleMatch ? roleMatch[1] : null;

                    // Show success toast
                    showToast('Login successful!', 'success');

                    // Redirect based on extracted role
                    if (role === "tutor") {
                        window.location.href = '../tutorhomepage.html';
                    } else if (role === "tutee") {
                        window.location.href = '../tuteehomepage.html';
                    } else {
                        console.warn("User email does not contain expected roles.");
                        // Optionally handle cases where the role is not recognized
                    }
                })
                .catch(error => {
                    // Hide the loading screen
                    document.getElementById('loading-screen').style.display = 'none';
                    console.error('Login Error:', error.message);
                    // Use toast instead of alert
                    showToast('WRONG USERNAME OR PASSWORD', 'error');
                    // alert('WRONG USERNAME OR PASSWORD'); // Commented out the old alert
                });
        } else {
            // Hide the loading screen
            document.getElementById('loading-screen').style.display = 'none';
            // Show error toast
            showToast('Please fill out all fields.', 'error');
            // alert('Please fill out all fields.'); // Commented out the old alert
        }
    }, 3000); // 3000 milliseconds = 3 seconds
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

document.querySelectorAll('.toggle-password').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        const passwordInput = document.querySelector(toggle.getAttribute('data-toggle'));
        const icon = toggle.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Input Field Animation
// const inputGroups = document.querySelectorAll('.input-group input, .input-group textarea');
// inputGroups.forEach((input) => {
//     input.addEventListener('focus', () => {
//         const underline = input.nextElementSibling;
//         gsap.to(underline, { width: '100%', duration: 0.5, ease: 'power2.out' });
//     });
//     input.addEventListener('blur', () => {
//         if (input.value === '') {
//             const underline = input.nextElementSibling;
//             gsap.to(underline, { width: '0%', duration: 0.5, ease: 'power2.out' });
//         }
//     });
// });

