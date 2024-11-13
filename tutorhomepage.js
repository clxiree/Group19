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
        window.location.href = 'home/login.html';
    }
});


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
    
    //fetchTeamCards();
    //fetchCourses();
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
