'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards() {
    const tinderContainer = document.querySelector('.tinder');
    const allCards = document.querySelectorAll('.tinder--card:not(.removed)');
  
    allCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
      card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.style.opacity = (10 - index) / 10;
    });
  
    tinderContainer.classList.add('loaded');
  }
  
  // Event listener setup, called after new cards are loaded
  function setupSwipeEvents() {
    const cards = document.querySelectorAll('.tinder--card:not(.removed)');
  
    cards.forEach((el) => {
      const hammertime = new Hammer(el);
  
      hammertime.on('pan', function (event) {
        el.classList.add('moving');
        tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
  
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
  
        el.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
      });
  
      hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        tinderContainer.classList.remove('tinder_love');
        tinderContainer.classList.remove('tinder_nope');
  
        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
  
        if (keep) {
          el.style.transform = '';
        } else {
          const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          const toX = event.deltaX > 0 ? endX : -endX;
          const endY = Math.abs(event.velocityY) * moveOutWidth;
          const toY = event.deltaY > 0 ? endY : -endY;
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;
  
          el.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
          el.classList.add('removed');
          setTimeout(() => {
            el.remove();
            initCards(); // Reinitialize cards after one is removed
          }, 300);
        }
      });
    });
  }
  
  fetchParticulars();
  setupSwipeEvents();  // Ensure swipes work on dynamically loaded cards
  

initCards();



allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    el.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
      el.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      el.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      el.classList.add('removed');
      setTimeout(() => {
        el.remove();
        initCards(); // Reinitialize cards after one is removed
      }, 300);
    }
  });
});



function fetchParticulars() {
    const db = firebase.firestore(); // Ensure this is set up correctly
  
    const cardsContainer = document.getElementById("my-cards");
    if (!cardsContainer) {
      console.error("No container found for cards.");
      return;
    }
  
    // Clear existing cards if any
    cardsContainer.innerHTML = "";
  
    db.collection("Particulars")
    .where("Tutor", "==", true)
    .get()
    .then((querySnapshot) => {
      const totalCards = querySnapshot.size;
  
      querySnapshot.forEach((doc, index) => {
        const data = doc.data();
  
        // Create the card container
        const card = document.createElement("div");
        card.classList.add("tinder--card");
        card.style.zIndex = totalCards - index;
  
        // Set the background image of the card
        card.style.backgroundImage = `url('../1Mentor/assets/img/team/${data.Image}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
  
        // Create an overlay div for content
        const overlay = document.createElement("div");
        overlay.classList.add("card-overlay");
  
        // Profile details section
        const profileDetails = document.createElement("div");
        profileDetails.classList.add("profile-details");
  
        // Name and age
        const nameElement = document.createElement("h3");
        nameElement.textContent = data.Name;
        profileDetails.appendChild(nameElement);
  
        // Rate (acting as age here)
        const rateElement = document.createElement("p");
        rateElement.textContent = `Rate: $${data.Rate} per hour`;
        profileDetails.appendChild(rateElement);
  
        // Add oneliner
        const onelinerElement = document.createElement("p");
        onelinerElement.textContent = data.Oneliner;
        profileDetails.appendChild(onelinerElement);
  
        // Add qualifications if available
        if (data.Qualifications) {
          const qualificationsElement = document.createElement("p");
          qualificationsElement.textContent = `Qualifications: ${data.Qualifications.join(", ")}`;
          profileDetails.appendChild(qualificationsElement);
        }
  
        // Add subjects taught if available
        if (data.SubjectsTaught) {
          const subjectsTaughtElement = document.createElement("p");
          subjectsTaughtElement.textContent = `Subjects Taught: ${data.SubjectsTaught.join(", ")}`;
          profileDetails.appendChild(subjectsTaughtElement);
        }
  
        // Add profile details to overlay
        overlay.appendChild(profileDetails);
  
        // Append overlay to the card
        card.appendChild(overlay);
  
        // Append the complete card to the container
        cardsContainer.appendChild(card);
      });
  
      initCards(); // Initialize cards after they are added to the DOM
      setupSwipeEvents(); // Bind swipe events after adding cards
    })
    .catch((error) => {
      console.error("Error fetching documents: ", error);
    });}

    function swipeCard(love) {
      console.log("hi");
      const cards = document.querySelectorAll('.tinder--card:not(.removed)');
      if (!cards.length) return;
  
      const card = cards[0];
      const moveOutWidth = document.body.clientWidth * 1.5;
      
      // Apply swipe transformation
      if (love) {
          card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`; // Swipe right
      } else {
          card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`; // Swipe left
      }
      
      card.classList.add('removed');
  
      // Remove the card after animation and reinitialize cards
      setTimeout(() => {
          card.remove();
          initCards();
      }, 300);
  }
  
  // Button event listeners for swiping
  nope.addEventListener('click', () => swipeCard(false)); // Swipe left on "nope"
  love.addEventListener('click', () => swipeCard(true)); // Swipe right on "love"
  
  


