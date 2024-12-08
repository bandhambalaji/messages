// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCmsBp-kqaxAd9Micj4JkZImaJg6-e1gY",
    authDomain: "ourfeelings-9cfd0.firebaseapp.com",
    projectId: "ourfeelings-9cfd0",
    storageBucket: "ourfeelings-9cfd0.firebasestorage.app",
    messagingSenderId: "372097059837",
    appId: "1:372097059837:web:119cfc11fa4295f5a22794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Valid Users - username and password
const validUsers = [
    { username: "Divya", password: "Bandham@437" },
    { username: "Balaji", password: "Bandham@437" }
];

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the entered credentials match any valid users
    const user = validUsers.find(user => user.username === username && user.password === password);
    
    if (user) {
        alert("Login successful!");
        document.getElementById("loginBox").style.display = "none"; // Hide login box
        document.getElementById("messageBox").style.display = "block"; // Show message box
        loadMessages(); // Load any existing messages from Firebase
    } else {
        alert("Invalid username or password!");
    }
}

// Save message function
function saveMessage() {
    const message = document.getElementById("message").value;

    if (message.trim() === "") {
        alert("Message cannot be empty!");
        return;
    }

    // Add message to Firestore
    addDoc(collection(db, "messages"), {
        message: message,
        timestamp: new Date()
    })
    .then(() => {
        alert("Message saved successfully!");
        loadMessages(); // Reload messages after saving
    })
    .catch(error => {
        console.error("Error saving message: ", error);
    });
}

// Load messages from Firebase Firestore
function loadMessages() {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = ""; // Clear existing messages

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    getDocs(q)
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();
                const messageElement = document.createElement("p");
                messageElement.textContent = data.message;
                messagesDiv.appendChild(messageElement);
            });
        })
        .catch(error => {
            console.error("Error loading messages: ", error);
        });
}

// Attach event listener to login button after the page is loaded
window.addEventListener("load", function() {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login); // Bind login function to the button

    const saveMessageButton = document.getElementById("saveMessageButton");
    saveMessageButton.addEventListener("click", saveMessage); // Bind saveMessage function to the button
});

