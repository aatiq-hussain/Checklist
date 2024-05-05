import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxRmtuZUJUgQd0XQqD808i6L2Dh8qRXAs",
    authDomain: "checklist-f3d09.firebaseapp.com",
    projectId: "checklist-f3d09",
    storageBucket: "checklist-f3d09.appspot.com",
    messagingSenderId: "353900328290",
    appId: "1:353900328290:web:7fb3be86c494fa1438a83b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements
const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('authBtn');
const toggleBtn = document.getElementById('toggleBtn');
const authMessage = document.getElementById('authMessage');

let isRegister = false;

// Toggle between Register and Login
toggleBtn.addEventListener('click', () => {
    isRegister = !isRegister;
    if (isRegister) {
        authBtn.textContent = 'Register';
        toggleBtn.textContent = 'Switch to Login';
    } else {
        authBtn.textContent = 'Login';
        toggleBtn.textContent = 'Switch to Register';
    }
    authForm.reset(); // Reset form fields
    authMessage.textContent = ''; // Clear any previous messages
});

// Add registration/login event
authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (isRegister) {
        // Register
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registration successful
                const user = userCredential.user;
                authMessage.textContent = "Registration successful! You can now log in.";
                authForm.reset(); // Reset form fields
            })
            .catch((error) => {
                const errorMessage = error.message;
                authMessage.textContent = errorMessage;
            });
    } else {
        // Login
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                authMessage.textContent = "Login successful!";
                setTimeout(() => {
                    window.location.href = "/Checklist/src/index.html"; // Redirect to successful login page
                }, 1000); // Change delay as needed
            })
            .catch((error) => {
                const errorMessage = error.message;
                authMessage.textContent = errorMessage;
            });
    }
});
