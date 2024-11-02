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

const storage = firebase.storage();

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

function fetchTeamCards() {
    const teamCardsContainer = document.querySelector("#teamCardsContainer");
    teamCardsContainer.innerHTML = ""; // Clear existing items

    // Query the "Particulars" collection where Tutor is true
    db.collection("Particulars").where("Tutor", "==", true).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Team Member Data:", data); // Log each data item to check content

            // Create a column for each tutor card
            const colDiv = document.createElement("div");
            colDiv.classList.add("col-lg-4", "col-md-6", "d-flex", "align-items-stretch");

            // Create the card container
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "member", "mb-4");

            const img = document.createElement("img");
            img.classList.add("card-img-top", "img-fluid");
            img.alt = data.Name || "No Name";
            img.style.height = "300px"; // Fixed height for image
            img.style.width = "300px";
            img.style.objectFit = "scale-down"; // Scale image to cover area

            // Set a default image while the Firebase Storage URL is loading
            img.src = "assets/img/team/zenny.jpg";

            // Retrieve image from Firebase Storage if provided
            if (data.Image) {
                const imageRef = storage.ref(`images/team/${data.Image}`);
                imageRef.getDownloadURL().then((url) => {
                    img.src = url; // Set the retrieved URL as the src of the img element
                }).catch((error) => {
                    console.error("Error fetching image:", error);
                    img.src = "assets/img/team/zenny.jpg"; // Fallback image
                });
            }

            // Card body content
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.style.display = "flex";
            cardBody.style.flexDirection = "column";
            cardBody.style.justifyContent = "space-between"; // Space elements evenly within card body
            cardBody.style.flexGrow = "1"; // Allow card body to expand within card

            const name = document.createElement("h5");
            name.classList.add("card-title");
            name.textContent = data.Name || "No Name";

            const about = document.createElement("p");
            about.classList.add("card-text");
            about.textContent = data.About || "No about information";

            const rating = document.createElement("p");
            rating.classList.add("card-text");
            rating.textContent = "⭐⭐⭐⭐⭐"; // Static rating, modify if dynamic data available

          
            

            // Append all elements in the right order
            cardBody.appendChild(name);
            cardBody.appendChild(about);
            cardBody.appendChild(rating);
           

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            teamCardsContainer.appendChild(colDiv);
        });
    }).catch((error) => {
        console.error("Error fetching team members:", error);
    });
}




document.addEventListener("DOMContentLoaded", () => {
    
    fetchTeamCards();
    fetchCourses();
});
