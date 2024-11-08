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

            // Course image element
            const courseImage = document.createElement("img");
            courseImage.classList.add("img-fluid");
            courseImage.alt = courseData.Name || "Course Image";
            courseImage.src = "assets/img/course-1.jpg"; // Default/fallback image

            // Fetch the actual image from Firebase Storage if available
            if (courseData.img) {
                const imageRef = storage.ref(`images/courses/${courseData}`);
                imageRef.getDownloadURL().then((url) => {
                    courseImage.src = url; // Set the retrieved URL as the src of the img element
                }).catch((error) => {
                    console.error("Error fetching image:", error);
                });
            }

            // Course content container
            const courseContent = document.createElement("div");
            courseContent.classList.add("course-content");

            // Top info with course code
            const topInfo = document.createElement("div");
            topInfo.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");

            const courseCode = document.createElement("p");
            courseCode.classList.add("category");
            courseCode.textContent = courseData.Code || "Unknown Code";

            topInfo.appendChild(courseCode);

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
            trainerImage.classList.add("img-fluid");
            trainerImage.style.width = "50px";
            trainerImage.style.height = "50px";
            trainerImage.style.borderRadius = "50%";

            // Fetch tutor image from Firebase Storage if available, otherwise use default image
            if (courseData.tutorImg) {
                const tutorImageRef = storage.ref(`images/team/${courseData.tutorImg}`);
                tutorImageRef.getDownloadURL().then((url) => {
                    trainerImage.src = url; // Set the retrieved URL as the src of the img element
                }).catch((error) => {
                    console.error("Error fetching tutor image:", error);
                });
            } else {
                // Set Firebase default image for `default.jpg`
                const defaultImageRef = storage.ref("images/team/default.jpg");
                defaultImageRef.getDownloadURL().then((url) => {
                    trainerImage.src = url;
                }).catch((error) => {
                    console.error("Error fetching default image:", error);
                });
            }

            // Append elements to trainer profile and container
            trainerImageWrapper.appendChild(trainerImage);
            trainerProfile.appendChild(trainerImageWrapper);

            const trainerLink = document.createElement("a");
            trainerLink.href = "";
            trainerLink.classList.add("trainer-link");
            trainerLink.style.marginLeft = "10px";
            trainerLink.textContent = courseData.tutorName || "Unknown Tutor";

            trainerProfile.appendChild(trainerLink);

            // Star ratings based on tutorRating
            const rating = document.createElement("p");
            rating.style.marginLeft = "10px";
            const starRating = "⭐".repeat(courseData.tutorRating || 5);
            rating.textContent = starRating;

            trainerContainer.appendChild(trainerProfile);
            trainerContainer.appendChild(rating);

            // Append content to courseContent
            courseContent.appendChild(topInfo);
            courseContent.appendChild(courseName);
            courseContent.appendChild(midterm);
            courseContent.appendChild(finals);
            courseContent.appendChild(description);
            courseContent.appendChild(trainerContainer);

            // Append courseContent and courseImage to courseInner
            courseInner.appendChild(courseImage);
            courseInner.appendChild(courseContent);

            // Append courseInner to courseItem
            courseItem.appendChild(courseInner);

            // Append courseItem to coursesContainer
            coursesContainer.appendChild(courseItem);
        });
    }).catch((error) => {
        console.error("Error fetching courses:", error);
    });
}



function fetchTeamCards() {
    const teamCardsContainer = document.querySelector("#teamCardsContainer");
    teamCardsContainer.innerHTML = ""; // Clear existing items

    // Set up a default image URL from Firebase Storage
    const defaultImageRef = storage.ref('images/team/default.jpg');
    let defaultImageURL = ""; // Variable to store the default image URL
    
    // Retrieve the URL for the default image from Firebase Storage
    defaultImageRef.getDownloadURL().then((url) => {
        defaultImageURL = url; // Set the URL to the default image
    }).catch((error) => {
        console.error("Error fetching default image:", error);
    });

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
            img.style.objectFit = "scale-down"; // Scale image to fit area

            // Set the default image from Firebase Storage while the actual image is loading
            img.src = defaultImageURL || "assets/img/team/default.jpg"; // Local fallback if defaultImageURL isn't available

            // Retrieve image from Firebase Storage if provided
            if (data.Image) {
                const imageRef = storage.ref(`images/team/${data.Image}`);
                imageRef.getDownloadURL().then((url) => {
                    img.src = url; // Set the retrieved URL as the src of the img element
                }).catch((error) => {
                    console.error("Error fetching image:", error);
                    img.src = defaultImageURL; // Use Firebase Storage default image as fallback
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

            // Dynamic star rating based on Rating field
            const rating = document.createElement("p");
            rating.classList.add("card-text");
            const starRating = "⭐".repeat(data.Rating || 0); // Repeat stars based on Rating, default to 0 stars if no rating
            rating.textContent = starRating;

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

document.addEventListener("DOMContentLoaded", function () {
    const topTutors = [
      'LIMITED TIME ONLY⏰',
      'USE ILOVEKYONG FOR 10% OFF ALL BOOKINGS🔥🔥🔥',
      'ZENNY POTATO AWARDED TOP TUTOR OF THE MONTH 🏆✨',
      'ELLIPSIS 🍟WELFARE PACK🧃 COLLECTION THIS FRIDAY!'
    ];

    const marqueeContent = document.querySelector('.boxes-inner');
    const marqueeWrapper = document.querySelector('.boxes');
    

    // Generate the boxes
    topTutors.forEach((tutor) => {
      const box = document.createElement('div');
      box.classList.add('box');
      box.textContent = tutor;
      marqueeContent.appendChild(box);
    });

    // Duplicate the content for seamless scrolling
    marqueeContent.innerHTML += marqueeContent.innerHTML;

    let contentWidth = marqueeContent.offsetWidth / 2;
    let direction = -1;

    // Set up the GSAP animation
    let marqueeTween = gsap.to(".boxes-inner", {
      x: direction * contentWidth,
      duration: 30,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
      }
    });

    // Pause and interactivity on hover
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('mouseenter', function () {
        marqueeTween.pause();
        this.style.color = '#ffcc00';
        this.style.transform = 'scale(1.1)';
      });
      box.addEventListener('mouseleave', function () {
        marqueeTween.play();
        this.style.color = '#fff';
        this.style.transform = 'scale(1)';
      });
    });

    // Background color and direction change on hover
    marqueeWrapper.addEventListener('mouseenter', function () {
      marqueeWrapper.style.backgroundColor = '#333';
    });

    marqueeWrapper.addEventListener('mouseleave', function () {
      marqueeWrapper.style.backgroundColor = 'rgba(46, 58, 144, 0.8)';
      direction *= -1;
      marqueeTween.kill();
      marqueeTween = gsap.to(".boxes-inner", {
        x: direction * contentWidth,
        duration: 30,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    });

    // Adjust marquee on window resize
    window.addEventListener('resize', function () {
      contentWidth = marqueeContent.offsetWidth / 2;
      marqueeTween.kill();
      marqueeTween = gsap.to(".boxes-inner", {
        x: direction * contentWidth,
        duration: 30,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    });
    
  });


