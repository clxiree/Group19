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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in with email:", user.email);
        document.getElementById("my-email").innerText = user.email;
        // You can use `user.email` to retrieve user-specific data
    } else {
        console.log("No user is logged in.");
        // Redirect to login page if needed
        window.location.href = 'login.html';
    }
});



            
    // Create the course item container
    const courseInner = document.createElement("div");
    courseInner.classList.add("course-item");




    function fetchTeamCards() {
        const teamCardsContainer = document.querySelector("#teamCardsContainer");
        teamCardsContainer.innerText = ""; // Clear existing items
    
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
                colDiv.classList.add("col-lg-4", "col-md-6", "d-flex", "align-items-stretch", "justify-content-center");
    
                // Create the card container
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "member", "mb-4", "text-center");
                cardDiv.style.width = "300px"; // Consistent width for all cards
    
                const img = document.createElement("img");
                img.classList.add("card-img-top", "img-fluid");
                img.alt = data.Name || "No Name";
                img.style.width = "100%";
                img.style.height = "300px"; // Fixed height for image
    
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
                cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");
    
                const name = document.createElement("h5");
                name.classList.add("card-title");
                name.textContent = data.Name || "No Name";
    
                const about = document.createElement("p");
                about.classList.add("card-text");
                about.textContent = data.About || "No about information";
    
                const rating = document.createElement("p");
                rating.classList.add("card-text");
                rating.id = "tutorRating"; // Add an id to the paragraph element
    
                // Pass the rating element directly to the populateStarRating function
                populateStarRating(rating, data.Rating);
    
                console.log(data.Rating);
    
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
    
    
    function populateStarRating(ratingElement, rating) {
      ratingElement.innerText = ""; // Clear previous content
    
      for (let i = 1; i <= 5; i++) {
          const star = document.createElement("i");
          star.style.color = "#FFD700"; // Gold color
    
          if (i <= Math.floor(rating)) {
              // Full star
              star.className = "bi bi-star-fill";
          } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
              // Half star
              star.className = "bi bi-star-half";
          } else {
              // Empty star
              star.className = "bi bi-star";
          }
          ratingElement.appendChild(star);
      }
    }
    
    
    async function fetchTestimonials() {
        const testimonialsContainer = document.getElementById("testimonials-container");
        testimonialsContainer.innerText = ""; // Clear any existing testimonials
      
        try {
            const snapshot = await db.collection("Testimonials").get();
      
            const testimonialPromises = snapshot.docs.map(async (doc) => {
                const testimonialData = doc.data();
                console.log(testimonialData)
                const { name, studentOf, review, stars, img } = testimonialData;
      
                // Ensure `img` is a valid string before using it
                if (typeof img !== "string") {
                    console.error("Invalid image filename:", img);
                    return;
                }
      
                // Create Swiper slide elements
                const swiperSlide = document.createElement("div");
                swiperSlide.classList.add("swiper-slide");
                swiperSlide.setAttribute("data-aos", "fade-up"); // Apply fade-up here
      
                const testimonialWrap = document.createElement("div");
                testimonialWrap.classList.add("testimonial-wrap");
      
                const testimonialItem = document.createElement("div");
                testimonialItem.classList.add("testimonial-item");
      
                // Profile image
                const profileImage = document.createElement("img");
                profileImage.classList.add("testimonial-img");
                profileImage.alt = `${name}'s picture`;
      
                // Fetch the image from Firebase Storage
                const imageRef = storage.ref(`images/reviews/${img}`);
                try {
                    const url = await imageRef.getDownloadURL();
                    profileImage.src = url;
                } catch (error) {
                    console.error("Error fetching image:", error);
                    profileImage.src = "assets/img/default.jpg"; // Fallback image
                }
      
                // Name and tutor information
                const nameElement = document.createElement("h3");
                nameElement.textContent = name;
      
                const tutorElement = document.createElement("h4");
                tutorElement.textContent = `Student of ${studentOf}`;
      
                const starsContainer = populateStarReviewRating(stars);
                testimonialItem.appendChild(starsContainer);
      
      
                // Review text
                const reviewText = document.createElement("p");
                const quoteLeft = document.createElement("i");
                quoteLeft.classList.add("bi", "bi-quote", "quote-icon-left");
                reviewText.appendChild(quoteLeft);
      
                const reviewContent = document.createElement("span");
                reviewContent.textContent = review;
                reviewText.appendChild(reviewContent);
      
                const quoteRight = document.createElement("i");
                quoteRight.classList.add("bi", "bi-quote", "quote-icon-right");
                reviewText.appendChild(quoteRight);
      
                // Append elements to the testimonial item
                testimonialItem.appendChild(profileImage);
                testimonialItem.appendChild(nameElement);
                testimonialItem.appendChild(tutorElement);
                testimonialItem.appendChild(starsContainer);
                testimonialItem.appendChild(reviewText);
      
                testimonialWrap.appendChild(testimonialItem);
                swiperSlide.appendChild(testimonialWrap);
                testimonialsContainer.appendChild(swiperSlide);
            });
      
            // Wait for all testimonial items to be created
            await Promise.all(testimonialPromises);
      
            // Initialize Swiper after dynamically loading content
            new Swiper(".init-swiper", {
                loop: true,
                speed: 600,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                slidesPerView: "auto",
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 40
                    },
                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
      }

    function populateStarReviewRating(rating) {
        const starsContainer = document.createElement("div");
        starsContainer.classList.add("stars");
      
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("i");
          star.style.color = "#FFD700"; // Gold color
      
          if (i <= Math.floor(rating)) {
            // Full star
            star.className = "bi bi-star-fill";
          } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
            // Half star
            star.className = "bi bi-star-half";
          } else {
            // Empty star
            star.className = "bi bi-star";
          }
      
          starsContainer.appendChild(star);
        }
      
        return starsContainer; // Return the populated stars container
      }



document.addEventListener("DOMContentLoaded", () => {
    
    fetchTeamCards();
    fetchTestimonials();
    const welcomeVideo = document.getElementById("welcome-video");

    if (welcomeVideo) {
        const videoRef = storage.ref("videos/welcome-page.mp4");
        videoRef.getDownloadURL().then((url) => {
            welcomeVideo.src = url;
        }).catch((error) => {
            console.error("Error fetching welcome video:", error);
        });
    }
});
