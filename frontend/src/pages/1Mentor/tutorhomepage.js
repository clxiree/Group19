// Initialize Firebase app and Firestore
const firebaseConfig = {
    apiKey: "AIzaSyDpmHo8Y79lMhABi1WuRaJ25ulV4JMdRGY",
    authDomain: "smootutor-ed94a.firebaseapp.com",
    databaseURL: "https://smootutor-ed94a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smootutor-ed94a",
    storageBucket: "smootutor-ed94a.appspot.com",
    messagingSenderId: "289686522861",
    appId: "1:289686522861:web:5811385ced42106d78b5e4"
};

// Check if Firebase is already initialized to avoid errors
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Fetch and display bookings
function fetchBookings() {
    const bookingsContainer = document.getElementById("bookings-container");
    bookingsContainer.innerHTML = ""; // Clear any existing bookings

    db.collection("Bookings").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const bookingData = doc.data();

            // Create the main container for each booking
            const bookingItem = document.createElement("div");
            bookingItem.classList.add("course-content");

            // Create the top info div
            const topInfo = document.createElement("div");
            topInfo.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");

            const courseCode = document.createElement("p");
            courseCode.classList.add("category");
            courseCode.textContent = bookingData.courseCode || 'Unknown Code';

            const price = document.createElement("p");
            price.classList.add("price");
            price.textContent = `$${bookingData.price || 'N/A'}`;

            // Append courseCode and price to topInfo
            topInfo.appendChild(courseCode);
            topInfo.appendChild(price);

            // Create the course name as a link
            const courseName = document.createElement("h3");
            const courseLink = document.createElement("a");
            courseLink.href = "course-details.html";
            courseLink.textContent = bookingData.courseName || 'Course Name';
            courseName.appendChild(courseLink);

            // Create description fields
            const status = document.createElement("p");
            status.classList.add("description");
            status.innerHTML = `Status: <b>${bookingData.status || 'N/A'}</b>`;

            const dateOfLesson = document.createElement("p");
            dateOfLesson.classList.add("description");
            dateOfLesson.textContent = `Date of Lesson: ${bookingData.dateOfLesson}`;

            const mode = document.createElement("p");
            mode.classList.add("description");
            mode.textContent = `Mode: ${bookingData.mode || 'N/A'}`;

            // Trainer profile and rank section
            const trainerContainer = document.createElement("div");
            trainerContainer.classList.add("trainer", "d-flex", "justify-content-between", "align-items-center");

            const trainerProfile = document.createElement("div");
            trainerProfile.classList.add("trainer-profile", "d-flex", "align-items-center");

            const trainerImage = document.createElement("img");
            trainerImage.src = "assets/img/trainers/trainer-1-2.jpg";
            trainerImage.classList.add("img-fluid");
            trainerImage.alt = "";

            const trainerLink = document.createElement("a");
            trainerLink.href = "";
            trainerLink.classList.add("trainer-link");
            trainerLink.textContent = "Zenny Potato";

            // Append image and link to trainer profile
            trainerProfile.appendChild(trainerImage);
            trainerProfile.appendChild(trainerLink);

            const trainerRank = document.createElement("div");
            trainerRank.classList.add("trainer-rank", "d-flex", "align-items-center");

            const personIcon = document.createElement("i");
            personIcon.classList.add("bi", "bi-person", "user-icon");
            trainerRank.appendChild(personIcon);
            trainerRank.append(" 99++  ");

            const heartIcon = document.createElement("i");
            heartIcon.classList.add("bi", "bi-heart", "heart-icon");
            trainerRank.appendChild(heartIcon);
            trainerRank.append(" 99++");

            // Append trainer profile and rank to trainer container
            trainerContainer.appendChild(trainerProfile);
            trainerContainer.appendChild(trainerRank);

            // Append all elements to bookingItem
            bookingItem.appendChild(topInfo);
            bookingItem.appendChild(courseName);
            bookingItem.appendChild(status);
            bookingItem.appendChild(dateOfLesson);
            bookingItem.appendChild(mode);
            bookingItem.appendChild(trainerContainer);

            // Append booking item to the main container
            bookingsContainer.appendChild(bookingItem);
        });
    }).catch((error) => {
        console.error("Error fetching bookings:", error);
    });
}

// Fetch bookings on page load
document.addEventListener("DOMContentLoaded", fetchBookings);
