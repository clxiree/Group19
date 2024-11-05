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

let allBookings = []; // Store all bookings data globally for filtering

// Fetch and display bookings
// Fetch and store bookings data
// Fetch and store bookings data
function fetchBookings() {
    const bookingsContainer = document.getElementById("bookings-container");
    bookingsContainer.innerHTML = ""; // Clear existing bookings

    db.collection("Bookings").get().then((snapshot) => {
        allBookings = []; // Reset allBookings array

        snapshot.forEach((doc) => {
            const bookingData = doc.data();
            bookingData.id = doc.id; // Add document ID for unique identification
            allBookings.push(bookingData);
        });

        renderBookings(allBookings); // Initially render all bookings
    }).catch((error) => {
        console.error("Error fetching bookings:", error);
    });
}

// Render bookings based on provided data
function renderBookings(bookings) {
    const bookingsContainer = document.getElementById("bookings-container");
    bookingsContainer.innerHTML = ""; // Clear container

    bookings.forEach((bookingData) => {
        // Create the main container for each booking
        const bookingItem = document.createElement("div");
        bookingItem.classList.add("col-lg-4", "col-md-6", "d-flex", "align-items-stretch");

        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        const img = document.createElement("img");
        img.src = `assets/img/bookings/${bookingData.courseCode}.jpg`; // Assuming course images are named by courseCode
        img.classList.add("card-img-top");
        img.alt = "Course Image";

        const courseContent = document.createElement("div");
        courseContent.classList.add("course-content");

        // Top section with category and price
        const topInfo = document.createElement("div");
        topInfo.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");

        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = bookingData.courseCode || "Unknown Code";

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `$${bookingData.fee || "N/A"}`;

        topInfo.appendChild(category);
        topInfo.appendChild(price);

        // Course name and details
        const courseName = document.createElement("h3");
        courseName.textContent = bookingData.courseName || "Course Name";

        const status = document.createElement("p");
        status.classList.add("description");
        status.innerHTML = `<b>Status:</b> ${bookingData.status || "N/A"}`;

        const dateOfLesson = document.createElement("p");
        dateOfLesson.classList.add("description");
        dateOfLesson.innerHTML = `<b>Date of Lesson:</b> ${bookingData.dateOfLesson}`;

        const mode = document.createElement("p");
        mode.classList.add("description");
        mode.innerHTML = `<b>Mode:</b> ${bookingData.mode || "N/A"}`;

        // Trainer section
        const trainerDiv = document.createElement("div");
        trainerDiv.classList.add("trainer", "d-flex", "justify-content-between", "align-items-center");

        const trainerProfile = document.createElement("div");
        trainerProfile.classList.add("trainer-profile", "d-flex", "align-items-center");


        // Append trainer profile info
       
        trainerDiv.appendChild(trainerProfile);

        // Append components to the course content
        courseContent.appendChild(topInfo);
        courseContent.appendChild(courseName);
        courseContent.appendChild(status);
        courseContent.appendChild(dateOfLesson);
        courseContent.appendChild(mode);
        courseContent.appendChild(trainerDiv);

        // Append image and content to the course item
        courseItem.appendChild(img);
        courseItem.appendChild(courseContent);

        // Append the course item to the booking item
        bookingItem.appendChild(courseItem);
        bookingsContainer.appendChild(bookingItem);
    });
}

// Filter bookings based on selected status
function applyFilter(status) {
    if (status === "") {
        renderBookings(allBookings); // Show all bookings if "All" is selected
    } else {
        const filteredBookings = allBookings.filter((booking) => booking.status === status);
        renderBookings(filteredBookings);
    }
}

// Event listener for the dropdown filter
document.addEventListener("DOMContentLoaded", () => {
    fetchBookings(); // Fetch and display all bookings on load

    const statusFilter = document.getElementById("statusFilter");
    statusFilter.addEventListener("change", (event) => {
        const status = event.target.value;
        applyFilter(status); // Apply the selected filter
    });
});
