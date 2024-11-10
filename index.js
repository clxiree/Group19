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
// <<<<<<< HEAD]
// =======


// >>>>>>> 2e3f3b73642b4c5068018e6c8a1dfd42aaced811

// Fetch and display courses from Firebase Firestore
// function fetchCourses() {
//     const coursesContainer = document.getElementById("courses-container");
//     coursesContainer.innerHTML = ""; // Clear any existing courses

//     db.collection("Courses").get().then((snapshot) => {
//         snapshot.forEach((doc) => {
//             const courseData = doc.data();

//             // Create the main container for each course
//             const courseItem = document.createElement("div");
//             courseItem.classList.add("col-lg-4", "col-md-6", "d-flex", "align-items-stretch");
//             courseItem.setAttribute("data-aos", "zoom-in");
//             courseItem.setAttribute("data-aos-delay", "100");

//             // Create the course item container
//             const courseInner = document.createElement("div");
//             courseInner.classList.add("course-item");

//             // Course image element
//             const courseImage = document.createElement("img");
//             courseImage.classList.add("img-fluid");
//             courseImage.alt = courseData.Name || "Course Image";
//             courseImage.src = "assets/img/course-1.jpg"; // Default/fallback image

//             // Fetch the actual image from Firebase Storage if available
//             if (courseData.img) {
//                 const imageRef = storage.ref(`images/courses/${courseData.img}`);
//                 imageRef.getDownloadURL().then((url) => {
//                     courseImage.src = url; // Set the retrieved URL as the src of the img element
//                 }).catch((error) => {
//                     console.error("Error fetching image:", error);
//                 });
//             }

//             // Course content container
//             const courseContent = document.createElement("div");
//             courseContent.classList.add("course-content");

//             // Top info with course code
//             const topInfo = document.createElement("div");
//             topInfo.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");

//             const courseCode = document.createElement("p");
//             courseCode.classList.add("category");
//             courseCode.textContent = courseData.Code || "Unknown Code";

//             topInfo.appendChild(courseCode);

//             // Course name
//             const courseName = document.createElement("h3");
//             const courseLink = document.createElement("a");
//             courseLink.href = "course-details.html";
//             courseLink.textContent = courseData.Name || "Course Name";
//             courseName.appendChild(courseLink);

//             // Midterm and Final dates
//             const midterm = document.createElement("p");
//             midterm.classList.add("description");
//             midterm.innerHTML = `<b>Midterm: ${courseData.Midterm || "N/A"}</b>`;

//             const finals = document.createElement("p");
//             finals.classList.add("description");
//             finals.innerHTML = `<b>Finals: ${courseData.Finals || "N/A"}</b>`;

//             // Course description
//             const description = document.createElement("p");
//             description.classList.add("description");
//             description.textContent = courseData.Description || "No description available.";

//             // Trainer section
//             const trainerContainer = document.createElement("div");
//             trainerContainer.classList.add("trainer", "d-flex", "justify-content-between", "align-items-center");

//             const trainerProfile = document.createElement("div");
//             trainerProfile.classList.add("trainer-profile", "d-flex", "align-items-center");

//             // Trainer image
//             const trainerImageWrapper = document.createElement("div");
//             trainerImageWrapper.style.position = "relative";
//             trainerImageWrapper.style.width = "50px";
//             trainerImageWrapper.style.height = "50px";

//             const trainerImage = document.createElement("img");
//             trainerImage.classList.add("img-fluid");
//             trainerImage.style.width = "50px";
//             trainerImage.style.height = "50px";
//             trainerImage.style.borderRadius = "50%";

//             // Fetch tutor image from Firebase Storage if available, otherwise use default image
//             if (courseData.tutorImg) {
//                 const tutorImageRef = storage.ref(`images/team/${courseData.tutorImg}`);
//                 tutorImageRef.getDownloadURL().then((url) => {
//                     trainerImage.src = url; // Set the retrieved URL as the src of the img element
//                 }).catch((error) => {
//                     console.error("Error fetching tutor image:", error);
//                 });
//             } else {
//                 // Set Firebase default image for `default.jpg`
//                 const defaultImageRef = storage.ref("images/team/default.jpg");
//                 defaultImageRef.getDownloadURL().then((url) => {
//                     trainerImage.src = url;
//                 }).catch((error) => {
//                     console.error("Error fetching default image:", error);
//                 });
//             }

//             // Append elements to trainer profile and container
//             trainerImageWrapper.appendChild(trainerImage);
//             trainerProfile.appendChild(trainerImageWrapper);

//             const trainerLink = document.createElement("a");
//             trainerLink.href = "";
//             trainerLink.classList.add("trainer-link");
//             trainerLink.style.marginLeft = "10px";
//             trainerLink.textContent = courseData.tutorName || "Unknown Tutor";

//             trainerProfile.appendChild(trainerLink);

//             // Star ratings based on tutorRating
//             const rating = document.createElement("p");
//             rating.style.marginLeft = "10px";
//             const starRating = "⭐".repeat(courseData.tutorRating || 5);
//             rating.textContent = starRating;

//             trainerContainer.appendChild(trainerProfile);
//             trainerContainer.appendChild(rating);

//             // Append content to courseContent
//             courseContent.appendChild(topInfo);
//             courseContent.appendChild(courseName);
//             courseContent.appendChild(midterm);
//             courseContent.appendChild(finals);
//             courseContent.appendChild(description);
//             courseContent.appendChild(trainerContainer);

//             // Append courseContent and courseImage to courseInner
//             courseInner.appendChild(courseImage);
//             courseInner.appendChild(courseContent);

//             // Append courseInner to courseItem
//             courseItem.appendChild(courseInner);

//             // Append courseItem to coursesContainer
//             coursesContainer.appendChild(courseItem);
//         });
//     }).catch((error) => {
//         console.error("Error fetching courses:", error);
//     });
// }



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

// <<<<<<< HEAD
// =======
// Fetch and display testimonials from Firebase Firestore
// Fetch and display testimonials from Firebase Firestore in a Swiper carousel
async function fetchTestimonials() {
  const testimonialsContainer = document.getElementById("testimonials-container");
  testimonialsContainer.innerHTML = ""; // Clear any existing testimonials

  try {
      const snapshot = await db.collection("Testimonials").get();

      const testimonialPromises = snapshot.docs.map(async (doc) => {
          const testimonialData = doc.data();
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
          const imageRef = storage.ref(`testimonials/${img}`);
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

          // Star rating
          const starsContainer = document.createElement("div");
          starsContainer.classList.add("stars");
          for (let i = 0; i < stars; i++) {
              const star = document.createElement("i");
              star.classList.add("bi", "bi-star-fill");
              starsContainer.appendChild(star);
          }

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


// >>>>>>> 2e3f3b73642b4c5068018e6c8a1dfd42aaced811
document.addEventListener("DOMContentLoaded", () => {
    
    fetchTeamCards();
    //fetchCourses();
// <<<<<<< HEAD
// =======
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
  
    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Initiate Pure Counter
     */
    new PureCounter();
  
    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
  
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  
    window.addEventListener("load", initSwiper);
  
  })();
  
  
  // tutor videos
    // Add event listeners for each tutor video and mute button
    const tutorVideos = [
      {video: document.getElementById('tutorVideo1'), muteButton: document.getElementById('muteButton1')},
      {video: document.getElementById('tutorVideo2'), muteButton: document.getElementById('muteButton2')},
      {video: document.getElementById('tutorVideo3'), muteButton: document.getElementById('muteButton3')},
      {video: document.getElementById('tutorVideo4'), muteButton: document.getElementById('muteButton4')},
      {video: document.getElementById('tutorVideo5'), muteButton: document.getElementById('muteButton5')},
      {video: document.getElementById('tutorVideo6'), muteButton: document.getElementById('muteButton6')},
      // Add additional tutor videos and buttons here
    ];
  
    tutorVideos.forEach(item => {
      const { video, muteButton } = item;
  
      // Show mute icon when the video is hovered over
      video.addEventListener('mouseenter', function() {
        video.currentTime = 0; // Reset the video to the start
        video.muted = true; // Ensure video is always muted by default
        muteButton.style.display = 'block'; // Show mute button
        video.play(); // Autoplay the video
      });
  
      // Toggle mute/unmute on video click
      video.addEventListener('click', function() {
        if (video.muted) {
          video.muted = false;
          muteButton.style.display = 'none'; // Hide mute icon when unmuted
        } else {
          video.muted = true;
          muteButton.style.display = 'block'; // Show mute icon when muted
        }
      });
  
      // Hide the video and stop playing when the mouse leaves
      video.addEventListener('mouseleave', function() {
        video.pause(); // Stop the video when the mouse leaves
        muteButton.style.display = 'none'; // Hide the mute icon when not hovered
      });
    });
  
  
  
  // tutor modal videos
    // Add event listeners for each tutor video and mute button
    const tutorModalVideos = [
      {Modalimage: document.getElementById('tutorModalImage1'), Modalvideo: document.getElementById('tutorModalVideo1'), ModalmuteButton: document.getElementById('muteModalButton1')},
      {Modalimage: document.getElementById('tutorModalImage2'), Modalvideo: document.getElementById('tutorModalVideo2'), ModalmuteButton: document.getElementById('muteModalButton2')},
      {Modalimage: document.getElementById('tutorModalImage3'), Modalvideo: document.getElementById('tutorModalVideo3'), ModalmuteButton: document.getElementById('muteModalButton3')},
      {Modalimage: document.getElementById('tutorModalImage4'), Modalvideo: document.getElementById('tutorModalVideo4'), ModalmuteButton: document.getElementById('muteModalButton4')},
      {Modalimage: document.getElementById('tutorModalImage5'), Modalvideo: document.getElementById('tutorModalVideo5'), ModalmuteButton: document.getElementById('muteModalButton5')},
      {Modalimage: document.getElementById('tutorModalImage6'), Modalvideo: document.getElementById('tutorModalVideo6'), ModalmuteButton: document.getElementById('muteModalButton6')},
      // Add additional tutor videos and buttons here
    ];
  
  
    tutorModalVideos.forEach(item => {
      const { Modalimage, Modalvideo, ModalmuteButton } = item;
  
      // Show mute icon when the video is hovered over
      Modalimage.addEventListener('mouseenter', function() {
        Modalimage.style.display = 'none'; // Hide the image
        Modalvideo.style.display = 'block'; // Show the video
        Modalvideo.currentTime = 0; // Reset the video to the start
        Modalvideo.muted = true; // Ensure video is always muted by default
        ModalmuteButton.style.display = 'block'; // Show mute button
        Modalvideo.play(); // Autoplay the video
      });
  
      // Toggle mute/unmute on video click
      Modalvideo.addEventListener('click', function() {
        if (Modalvideo.muted) {
          Modalvideo.muted = false;
          ModalmuteButton.style.display = 'none'; // Hide mute icon when unmuted
        } else {
          Modalvideo.muted = true;
          ModalmuteButton.style.display = 'block'; // Show mute icon when muted
        }
      });
  
      // Hide the video and stop playing when the mouse leaves
      Modalvideo.addEventListener('mouseleave', function() {
        Modalimage.style.display = 'block'; // Hide the image
        Modalvideo.style.display = 'none'; // Show the video
        Modalvideo.pause(); // Stop the video when the mouse leaves
        ModalmuteButton.style.display = 'none'; // Hide the mute icon when not hovered
      });
    });
  
  
    initMarquee(190, 27)
  
    function initMarquee(boxWidth, time) {
        const boxElement = $('.box');
        const boxLength = boxElement.length;
        const wrapperWidth = boxWidth * boxLength;
        const windowWidth = $(window).width();
    
        boxElement.parent().css('left', '-' + boxWidth + 'px');
        boxElement.css('width', boxWidth + 'px');
    
        gsap.set(".box", {
            x: (i) => i * boxWidth
        });
    
        gsap.to(".box", {
            duration: time,
            ease: "none",
            x: "-=" + wrapperWidth,
            modifiers: {
                x: gsap.utils.unitize(
                    function (x) {
                        return parseFloat(x + windowWidth + boxWidth) % wrapperWidth
                    }
                )
            },
            repeat: -1
        });
    
    }
  
    document.addEventListener("DOMContentLoaded", () => {
      /**
       * Mobile nav toggle
       */
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
    
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
      }
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
      
        /**
         * Initiate glightbox
         */
        const glightbox = GLightbox({
          selector: '.glightbox'
        });
      
        /**
         * Initiate Pure Counter
         */
        new PureCounter();
      
        /**
         * Init swiper sliders
         */
        function initSwiper() {
          document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            let config = JSON.parse(
              swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );
      
            if (swiperElement.classList.contains("swiper-tab")) {
              initSwiperWithCustomPagination(swiperElement, config);
            } else {
              new Swiper(swiperElement, config);
            }
          });
        }
      
        window.addEventListener("load", initSwiper);
      
      })();
      
      
      // tutor videos
        // Add event listeners for each tutor video and mute button
        const tutorVideos = [
          {video: document.getElementById('tutorVideo1'), muteButton: document.getElementById('muteButton1')},
          {video: document.getElementById('tutorVideo2'), muteButton: document.getElementById('muteButton2')},
          {video: document.getElementById('tutorVideo3'), muteButton: document.getElementById('muteButton3')},
          {video: document.getElementById('tutorVideo4'), muteButton: document.getElementById('muteButton4')},
          {video: document.getElementById('tutorVideo5'), muteButton: document.getElementById('muteButton5')},
          {video: document.getElementById('tutorVideo6'), muteButton: document.getElementById('muteButton6')},
          // Add additional tutor videos and buttons here
        ];
      
        tutorVideos.forEach(item => {
          const { video, muteButton } = item;
      
          // Show mute icon when the video is hovered over
          video.addEventListener('mouseenter', function() {
            video.currentTime = 0; // Reset the video to the start
            video.muted = true; // Ensure video is always muted by default
            muteButton.style.display = 'block'; // Show mute button
            video.play(); // Autoplay the video
          });
      
          // Toggle mute/unmute on video click
          video.addEventListener('click', function() {
            if (video.muted) {
              video.muted = false;
              muteButton.style.display = 'none'; // Hide mute icon when unmuted
            } else {
              video.muted = true;
              muteButton.style.display = 'block'; // Show mute icon when muted
            }
          });
      
          // Hide the video and stop playing when the mouse leaves
          video.addEventListener('mouseleave', function() {
            video.pause(); // Stop the video when the mouse leaves
            muteButton.style.display = 'none'; // Hide the mute icon when not hovered
          });
        });
      
      
      
      // tutor modal videos
        // Add event listeners for each tutor video and mute button
        const tutorModalVideos = [
          {Modalimage: document.getElementById('tutorModalImage1'), Modalvideo: document.getElementById('tutorModalVideo1'), ModalmuteButton: document.getElementById('muteModalButton1')},
          {Modalimage: document.getElementById('tutorModalImage2'), Modalvideo: document.getElementById('tutorModalVideo2'), ModalmuteButton: document.getElementById('muteModalButton2')},
          {Modalimage: document.getElementById('tutorModalImage3'), Modalvideo: document.getElementById('tutorModalVideo3'), ModalmuteButton: document.getElementById('muteModalButton3')},
          {Modalimage: document.getElementById('tutorModalImage4'), Modalvideo: document.getElementById('tutorModalVideo4'), ModalmuteButton: document.getElementById('muteModalButton4')},
          {Modalimage: document.getElementById('tutorModalImage5'), Modalvideo: document.getElementById('tutorModalVideo5'), ModalmuteButton: document.getElementById('muteModalButton5')},
          {Modalimage: document.getElementById('tutorModalImage6'), Modalvideo: document.getElementById('tutorModalVideo6'), ModalmuteButton: document.getElementById('muteModalButton6')},
          // Add additional tutor videos and buttons here
        ];
      
      
        tutorModalVideos.forEach(item => {
          const { Modalimage, Modalvideo, ModalmuteButton } = item;
      
          // Show mute icon when the video is hovered over
          Modalimage.addEventListener('mouseenter', function() {
            Modalimage.style.display = 'none'; // Hide the image
            Modalvideo.style.display = 'block'; // Show the video
            Modalvideo.currentTime = 0; // Reset the video to the start
            Modalvideo.muted = true; // Ensure video is always muted by default
            ModalmuteButton.style.display = 'block'; // Show mute button
            Modalvideo.play(); // Autoplay the video
          });
      
          // Toggle mute/unmute on video click
          Modalvideo.addEventListener('click', function() {
            if (Modalvideo.muted) {
              Modalvideo.muted = false;
              ModalmuteButton.style.display = 'none'; // Hide mute icon when unmuted
            } else {
              Modalvideo.muted = true;
              ModalmuteButton.style.display = 'block'; // Show mute icon when muted
            }
          });
      
          // Hide the video and stop playing when the mouse leaves
          Modalvideo.addEventListener('mouseleave', function() {
            Modalimage.style.display = 'block'; // Hide the image
            Modalvideo.style.display = 'none'; // Show the video
            Modalvideo.pause(); // Stop the video when the mouse leaves
            ModalmuteButton.style.display = 'none'; // Hide the mute icon when not hovered
          });
        });
      
      
        initMarquee(190, 27)
      
        function initMarquee(boxWidth, time) {
            const boxElement = $('.box');
            const boxLength = boxElement.length;
            const wrapperWidth = boxWidth * boxLength;
            const windowWidth = $(window).width();
        
            boxElement.parent().css('left', '-' + boxWidth + 'px');
            boxElement.css('width', boxWidth + 'px');
        
            gsap.set(".box", {
                x: (i) => i * boxWidth
            });
        
            gsap.to(".box", {
                duration: time,
                ease: "none",
                x: "-=" + wrapperWidth,
                modifiers: {
                    x: gsap.utils.unitize(
                        function (x) {
                            return parseFloat(x + windowWidth + boxWidth) % wrapperWidth
                        }
                    )
                },
                repeat: -1
            });
        
        }
    });
  
