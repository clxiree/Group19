document.addEventListener("DOMContentLoaded", function () {
    // Ensure Firebase is initialized correctly
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyDpmHo8Y79lMhABi1WuRaJ25ulV4JMdRGY",
      authDomain: "smootutor-ed94a.firebaseapp.com",
      databaseURL: "https://smootutor-ed94a-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "smootutor-ed94a",
      storageBucket: "smootutor-ed94a.appspot.com",
      messagingSenderId: "289686522861",
      appId: "1:289686522861:web:5811385ced42106d78b5e4",
      measurementId: "G-46QED8ZFKJ"
    };
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const auth = firebase.auth();
    
    let currentUser = null;

    // Authenticate anonymously and fetch bookings
    auth.signInAnonymously().then(() => {
        console.log("User authenticated successfully.");

        // Fetch bookings once the user is authenticated
        fetchBookings();
    }).catch(error => {
        console.error("Authentication error:", error);
    });


// Add event listener for the filter select
document.getElementById('statusFilter').addEventListener('change', function(e) {
    const selectedStatus = e.target.value;
    displayFilteredBookings(selectedStatus);
});


function displayFilteredBookings(status) {
    const filteredBookings = status ? allBookings.filter(booking => booking.status === status) : allBookings;
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = '';

    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'g-4');

    filteredBookings.forEach(bookingData => {
        const col = document.createElement('div');
        col.classList.add('col-lg-4', 'col-md-6', 'd-flex', 'align-items-stretch');
        col.setAttribute('data-aos', 'zoom-in');
        col.setAttribute('data-aos-delay', '100');

        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        // Add grey background for cancelled bookings
        if (bookingData.status === 'Cancelled') {
            courseItem.style.backgroundColor = 'rgba(240, 240, 240, 0.9)'; // Light grey background
            courseItem.style.position = 'relative';
            
            // Add a semi-transparent overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.backgroundColor = 'rgba(128, 128, 128, 0.1)'; // Very light grey overlay
            overlay.style.pointerEvents = 'none'; // Allows clicking through the overlay
            courseItem.appendChild(overlay);
        }

        // Rest of your existing code remains the same
        const img = document.createElement('img');
        img.src = `../1Mentor/assets/img/bookings/${bookingData.courseCode}.jpg`;
        img.classList.add('card-img-top');
        img.alt = 'Course Image';

        const courseContent = document.createElement('div');
        courseContent.classList.add('course-content');

        const categoryPriceDiv = document.createElement('div');
        categoryPriceDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        const category = document.createElement('p');
        category.classList.add('category');
        category.textContent = bookingData.courseCode;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `$${bookingData.fee}`;

        categoryPriceDiv.appendChild(category);
        categoryPriceDiv.appendChild(price);

        const titleContainer = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = `course-details.html?bookingId=${bookingData.bookingId}`;
        titleLink.textContent = bookingData.courseName;
        titleContainer.appendChild(titleLink);

        const status = document.createElement('p');
        status.classList.add('description');
        status.innerHTML = `<b>Status:</b> ${bookingData.status}`;

        const dateOfLesson = document.createElement('p');
        dateOfLesson.classList.add('description');
        dateOfLesson.innerHTML = `<b>Date of Booking:</b> ${bookingData.dateOfLesson}`;

        const mode = document.createElement('p');
        mode.classList.add('description');
        mode.innerHTML = `<b>Mode:</b> ${bookingData.mode}`;

        const trainerDiv = document.createElement('div');
        trainerDiv.classList.add('trainer', 'd-flex', 'justify-content-between', 'align-items-center');

        const trainerProfile = document.createElement('div');
        trainerProfile.classList.add('trainer-profile', 'd-flex', 'align-items-center');

        const trainerImg = document.createElement('img');
        trainerImg.src = `../1Mentor/assets/img/team/${bookingData.tutorImg}`;
        trainerImg.classList.add('img-fluid');
        trainerImg.alt = '';

        const trainerLink = document.createElement('a');
        trainerLink.href = 'trainers.html';
        trainerLink.classList.add('trainer-link');
        trainerLink.textContent = bookingData.tutorName;

        const tutorStars = document.createElement('div');
        tutorStars.textContent = bookingData.tutorStars;
        tutorStars.style.marginLeft = '10px';

        trainerProfile.appendChild(trainerImg);
        trainerProfile.appendChild(trainerLink);
        trainerProfile.appendChild(tutorStars);

        trainerDiv.appendChild(trainerProfile);

        const trainerRank = document.createElement('div');
        trainerRank.classList.add('trainer-rank', 'd-flex', 'align-items-center');

        const personIcon = document.createElement('i');
        personIcon.classList.add('bi', 'bi-person', 'user-icon');
        trainerRank.appendChild(personIcon);
        trainerRank.innerHTML += `&nbsp;${bookingData.tutorReview}`;

        trainerDiv.appendChild(trainerRank);

        courseContent.appendChild(categoryPriceDiv);
        courseContent.appendChild(titleContainer);
        courseContent.appendChild(status);
        courseContent.appendChild(dateOfLesson);
        courseContent.appendChild(mode);
        courseContent.appendChild(trainerDiv);

        courseItem.appendChild(img);
        courseItem.appendChild(courseContent);

        col.appendChild(courseItem);
        row.appendChild(col);
    });

    bookingList.appendChild(row);
}

// Modify your fetchBookings function to use the filter display
function fetchBookings() {
    db.collection("Bookings").get().then(snapshot => {
        allBookings = []; // Reset global variable for new data

        snapshot.forEach(doc => {
            const bookingData = doc.data();
            allBookings.push(bookingData);
        });
        

        // Display all bookings initially
        displayFilteredBookings('');
        
    }).catch(error => {
        console.error("Error fetching bookings:", error);
    });
}
    })


