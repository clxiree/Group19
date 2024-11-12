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

        // Check if swipe is to the right
        if (event.deltaX > 0) {
          const userId = el.getAttribute("data-user-id");
          console.log(userId)
          setTimeout(() => {
            window.location.href = `tutorprofileupdated.html?userid=${userId}`;
          }, 300);
        } else {
          setTimeout(() => {
            el.remove();
            initCards(); // Reinitialize cards after one is removed
          }, 300);
        }
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
  const db = firebase.firestore();

  const cardsContainer = document.getElementById("my-cards");
  if (!cardsContainer) {
      console.error("No container found for cards.");
      return;
  }

  // Clear existing cards if any
  cardsContainer.innerText = "";

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

          // Set UserId as a data attribute
          card.setAttribute("data-user-id", data.UserID);

          // Set the background image of the card
          // Reference Firebase Storage
          const storage = firebase.storage();

          // Get image URL from Firebase Storage
          storage.ref(`images/team/${data.Image}`).getDownloadURL()
              .then((url) => {
                  // Set the background image to the retrieved URL
                  card.style.backgroundImage = `url('${url}')`;
                  card.style.backgroundSize = "cover";
                  card.style.backgroundPosition = "center";
              })
              .catch((error) => {
                  console.error("Error fetching image URL:", error);
                  // Optionally, set a default image if there's an error
                  card.style.backgroundImage = `url('path/to/default-image.jpg')`;
              });

          card.style.backgroundSize = "cover";
          card.style.backgroundPosition = "center";

          // Profile details section at the bottom left
          const profileDetails = document.createElement("div");
          profileDetails.classList.add("profile-details");

          // Name in <h2>
          const nameElement = document.createElement("h2");
          nameElement.textContent = data.Name;
          profileDetails.appendChild(nameElement);

          // Member Since in <p>
          const joinedDateElement = document.createElement("p");
          joinedDateElement.textContent = `Member Since`;
          const joinedDateNoElement = document.createElement("p");
          joinedDateNoElement.textContent = data.JoinedDate;
          profileDetails.appendChild(joinedDateElement);
          profileDetails.appendChild(joinedDateNoElement);

          // Badge container on the right side
          const badgeContainer = document.createElement("div");
          badgeContainer.classList.add("badge-container");

          // Row for the rate badge
          const rateRow = document.createElement("div");
          rateRow.classList.add("rate-row");

          const rateBadge = document.createElement("span");
          rateBadge.classList.add("rate-badge");
          rateBadge.textContent = `$${data.Rate}/h`;
          rateRow.appendChild(rateBadge);
          badgeContainer.appendChild(rateRow);

          // Row for the subject badges
          const subjectsRow = document.createElement("div");
          subjectsRow.classList.add("subjects-row");

          if (data.SubjectsTaught) {
              data.SubjectsTaught.forEach((subject) => {
                  const subjectBadge = document.createElement("span");
                  subjectBadge.classList.add("subject-badge");
                  subjectBadge.textContent = subject;
                  subjectsRow.appendChild(subjectBadge);
              });
          }

          badgeContainer.appendChild(subjectsRow);

          // Append profile details and badge container to the card
          card.appendChild(profileDetails);
          card.appendChild(badgeContainer);

          // Append the complete card to the container
          cardsContainer.appendChild(card);
      });

      initCards(); // Initialize cards after they are added to the DOM
      setupSwipeEvents(); // Bind swipe events after adding cards
    })
    .catch((error) => {
      console.error("Error fetching documents: ", error);
    });
}


function swipeCard(love) {
  const cards = document.querySelectorAll('.tinder--card:not(.removed)');
  if (!cards.length) return;

  const card = cards[0];
  const moveOutWidth = document.body.clientWidth * 1.5;

  if (love) {
    // Swipe right
    card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;

    // Retrieve UserId from the card's data attribute
    const userId = card.getAttribute("data-user-id");

    // Redirect to trainers.html with UserId after animation
    
      window.location.href = `tutorprofileupdated.html?userid=${userId}`;
    
  } else {
    // Swipe left
    card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
  }

  card.classList.add('removed');

  // Remove the card and reinitialize after animation
  setTimeout(() => {
    card.remove();
    initCards();
  }, 300);
}


  

  
  


