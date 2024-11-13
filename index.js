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

    // Fetch and set the logo image from Firebase Storage
    const logoImage = document.getElementById("logo-image");
    const welcomeVideo = document.getElementById("welcome-video");

    if (logoImage) {
        // Reference the image in Firebase Storage
        const logoImageRef = storage.ref("images/smootutor-logo.png");

        // Get the download URL for the image and set it as the logo image src
        logoImageRef.getDownloadURL().then((url) => {
            logoImage.src = url;
        }).catch((error) => {
            console.error("Error fetching logo image:", error);
        });
        // Fetch and set the welcome video
    } 

    if (welcomeVideo) {
        const videoRef = storage.ref("videos/welcome-page.mp4");
        videoRef.getDownloadURL().then((url) => {
            welcomeVideo.src = url;
        }).catch((error) => {
            console.error("Error fetching welcome video:", error);
        });
    }
// >>>>>>> 2e3f3b73642b4c5068018e6c8a1dfd42aaced811
});

/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
    "use strict";
  
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  
    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
    /**
     * Animation on scroll function and init
     */
    function aosInit() {
       AOS.init({
         duration: 600,
         easing: 'ease-in-out',
         once: true,
         mirror: false
       });
     }
     window.addEventListener('load', aosInit);
  
    // /**
    //  * Initiate glightbox
    //  */
     const glightbox = GLightbox({
       selector: '.glightbox'
     });
  
    /**
     * Initiate Pure Counter
     */
    new PureCounter();
  
   
  
  })();
  
  

  
