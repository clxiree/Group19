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
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

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
