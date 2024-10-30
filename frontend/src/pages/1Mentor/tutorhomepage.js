// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpmHo8Y79lMhABi1WuRaJ25ulV4JMdRGY",
    authDomain: "smootutor-ed94a.firebaseapp.com",
    databaseURL: "https://smootutor-ed94a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smootutor-ed94a",
    storageBucket: "smootutor-ed94a.appspot.com",
    messagingSenderId: "289686522861",
    appId: "1:289686522861:web:5811385ced42106d78b5e4",
    measurementId: "G-46QED8ZFKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to fetch bookings from Firestore
async function fetchBookings() {
    try {
        const bookingsRef = collection(db, "Bookings");
        const querySnapshot = await getDocs(bookingsRef);
        
        // Select the container where bookings will be displayed
        const bookingsContainer = document.querySelector('.section-title');
        
        // Clear any existing content in the container
        bookingsContainer.innerHTML += "<h3>Upcoming Bookings</h3>";

        // Loop through each booking document and display data
        querySnapshot.forEach((doc) => {
            const bookingData = doc.data();
            
            // Create a container for each booking item
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('booking-item');

            // Add booking information
            bookingDiv.innerHTML = `
                <p><strong>Course:</strong> ${bookingData.courseCode} - ${bookingData.courseName}</p>
                <p><strong>Date:</strong> ${new Date(bookingData.dateOfLesson.seconds * 1000).toLocaleString()}</p>
                <p><strong>Mode:</strong> ${bookingData.mode}</p>
                <p><strong>Status:</strong> ${bookingData.status}</p>
                <p><strong>Fee:</strong> $${bookingData.fee}</p>
            `;

            // Append each booking item to the bookings container
            bookingsContainer.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

// Call the function to display bookings when the page loads
document.addEventListener("DOMContentLoaded", fetchBookings);
