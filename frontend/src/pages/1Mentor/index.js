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

// Fetch and display courses from Firebase Firestore
function fetchCourses() {
    const coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = ""; // Clear any existing courses

    db.collection("Courses").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const courseData = doc.data();

            // Create the main container for each course
            const courseItem = document.createElement("div");
            courseItem.classList.add("col-lg-4", "col-md-6", "d-flex", "align-items-stretch");
            courseItem.setAttribute("data-aos", "zoom-in");
            courseItem.setAttribute("data-aos-delay", "100");

            // Create the course item container
            const courseInner = document.createElement("div");
            courseInner.classList.add("course-item");

            // Course image
            const courseImage = document.createElement("img");
            courseImage.src = "assets/img/course-1.jpg"; // You may replace with actual image URL if available in Firebase
            courseImage.classList.add("img-fluid");
            courseImage.alt = courseData.Name || "Course Image";

            // Course content container
            const courseContent = document.createElement("div");
            courseContent.classList.add("course-content");

            // Top info with course code and price
            const topInfo = document.createElement("div");
            topInfo.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");

            const courseCode = document.createElement("p");
            courseCode.classList.add("category");
            courseCode.textContent = courseData.Code || "Unknown Code";

            const price = document.createElement("p");
            price.classList.add("price");
            price.textContent = `$${courseData.Price || 'N/A'}`;

            // Append course code and price to top info
            topInfo.appendChild(courseCode);
            topInfo.appendChild(price);

            // Course name
            const courseName = document.createElement("h3");
            const courseLink = document.createElement("a");
            courseLink.href = "course-details.html";
            courseLink.textContent = courseData.Name || "Course Name";
            courseName.appendChild(courseLink);

            // Midterm and Final dates
            const midterm = document.createElement("p");
            midterm.classList.add("description");
            midterm.innerHTML = `<b>Midterm: ${courseData.Midterm || "N/A"}</b>`;

            const finals = document.createElement("p");
            finals.classList.add("description");
            finals.innerHTML = `<b>Finals: ${courseData.Finals || "N/A"}</b>`;

            // Course description
            const description = document.createElement("p");
            description.classList.add("description");
            description.textContent = courseData.Description || "No description available.";

            // Trainer section
            const trainerContainer = document.createElement("div");
            trainerContainer.classList.add("trainer", "d-flex", "justify-content-between", "align-items-center");

            const trainerProfile = document.createElement("div");
            trainerProfile.classList.add("trainer-profile", "d-flex", "align-items-center");

            // Trainer image
            const trainerImageWrapper = document.createElement("div");
            trainerImageWrapper.style.position = "relative";
            trainerImageWrapper.style.width = "50px";
            trainerImageWrapper.style.height = "50px";

            const trainerImage = document.createElement("img");
            trainerImage.src = "assets/img/trainers/trainer-1-2.jpg"; // Replace with actual trainer image if available
            trainerImage.classList.add("img-fluid");
            trainerImage.style.width = "50px";
            trainerImage.style.height = "50px";
            trainerImage.style.borderRadius = "50%";

            // Crown icon
            const crownIcon = document.createElement("img");
            crownIcon.src = "assets/img/crown.jpg"; // Replace with crown image path
            crownIcon.style.position = "absolute";
            crownIcon.style.top = "-20px";
            crownIcon.style.left = "50%";
            crownIcon.style.transform = "translateX(-50%)";
            crownIcon.style.width = "30px";
            crownIcon.style.height = "30px";

            trainerImageWrapper.appendChild(trainerImage);
            trainerImageWrapper.appendChild(crownIcon);

            const trainerLink = document.createElement("a");
            trainerLink.href = "";
            trainerLink.classList.add("trainer-link");
            trainerLink.style.marginLeft = "10px";
            trainerLink.textContent = "Zenny Potato";

            // Append trainer image and link to profile
            trainerProfile.appendChild(trainerImageWrapper);
            trainerProfile.appendChild(trainerLink);

            // Star ratings
            const rating = document.createElement("p");
            rating.style.marginLeft = "10px";
            rating.textContent = "⭐⭐⭐⭐⭐";

            // Append trainer profile and rating
            trainerContainer.appendChild(trainerProfile);
            trainerContainer.appendChild(rating);

            // Append elements to courseContent
            courseContent.appendChild(topInfo);
            courseContent.appendChild(courseName);
            courseContent.appendChild(midterm);
            courseContent.appendChild(finals);
            courseContent.appendChild(description);
            courseContent.appendChild(trainerContainer);

            // Append image and content to courseInner
            courseInner.appendChild(courseImage);
            courseInner.appendChild(courseContent);

            // Append courseInner to courseItem
            courseItem.appendChild(courseInner);

            // Append courseItem to the main container
            coursesContainer.appendChild(courseItem);
        });
    }).catch((error) => {
        console.error("Error fetching courses:", error);
    });
}

function fetchTeamCarousel() {
    const carouselInner = document.querySelector("#teamCarousel .carousel-inner");
    carouselInner.innerHTML = ""; // Clear existing items

    db.collection("Particulars").get().then((snapshot) => {
        snapshot.forEach((doc, index) => {
            const data = doc.data();
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === 0) {
                carouselItem.classList.add("active"); // Make the first item active
            }

            // Create the inner structure of each carousel item
            const colDiv = document.createElement("div");
            colDiv.classList.add("col-lg-4", "col-md-6", "d-flex");

            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member");

            const img = document.createElement("img");
            img.src = data.Image || "default.jpg"; // Use a default image if Image is missing
            img.classList.add("img-fluid");
            img.alt = data.Name || "No Name";

            const memberContent = document.createElement("div");
            memberContent.classList.add("member-content");

            const name = document.createElement("h4");
            name.textContent = data.Name || "No Name";

            const about = document.createElement("p");
            about.textContent = data.About || "No about information";

            const rating = document.createElement("p");
            rating.textContent = "⭐⭐⭐⭐⭐"; // Static rating, you can modify as needed

            // Social icons
            const socialDiv = document.createElement("div");
            socialDiv.classList.add("social");

            ["twitter-x", "facebook", "instagram", "linkedin"].forEach((platform) => {
                const anchor = document.createElement("a");
                anchor.href = "#";
                const icon = document.createElement("i");
                icon.classList.add("bi", `bi-${platform}`);
                anchor.appendChild(icon);
                socialDiv.appendChild(anchor);
            });

            // Append all elements in the right order
            memberContent.appendChild(name);
            memberContent.appendChild(about);
            memberContent.appendChild(rating);
            memberContent.appendChild(socialDiv);

            memberDiv.appendChild(img);
            memberDiv.appendChild(memberContent);

            colDiv.appendChild(memberDiv);
            carouselItem.appendChild(colDiv);
            carouselInner.appendChild(carouselItem);
        });
    }).catch((error) => {
        console.error("Error fetching team members:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTeamCarousel();
    fetchCourses();
});
