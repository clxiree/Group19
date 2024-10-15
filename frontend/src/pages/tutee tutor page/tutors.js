// Fetch tutor data from PHP backend
fetch('gettutors.php')
  .then(response => response.json())
  .then(data => {
    const tutorList = document.getElementById('tutor-list');
    data.forEach(tutor => {
      // Create tutor card HTML
      const tutorCard = `
            <div class="row mt-4">
          <div class="row g-0 justify-content-center">
              <div class="col-md-3 text-center">
                  <img src="${tutor.image}" class="" alt="${tutor.name}">
              </div>

              <div class="col-md-1"></div>

              <div class="col-md-6 text-center align-items-center pt-5">
                  <h4 class="pb-3">${tutor.name}</h5>
                  <p class="text-muted">Teaching Subjects: <span class="fw-bold" style="font-style: italic">${tutor.subjects}</span></p>
                  <p class="text-muted">Qualifications: ${tutor.qualifications}</p>
                  <p><small class="really-small">Click View More to see average ratings and rates </small></p>
              </div>

              <div class="col-md-2 text-center">
                  <p class="text-muted" style="font-size: 18px;"><a href="../tutee tutor review page/tuteetutorreviewpage.html">${tutor.reviews}</a></p>
              </div>
          </div>

          <div class="row g-0">
              <div class="col-md-3 text-center">
                  <button class="btn btn-success btn-book">Book</button>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3 text-center">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tutorModal" 
                      onclick="showTutorDetails('${tutor.image}', '${tutor.name}', '${tutor.qualifications}', '${tutor.subjects}', '${tutor.fees}', '${tutor.rating}')">View More</button>
              </div>
              <div class="col-md-3 text-center">
                  <button class="btn btn-primary">Message</button>
              </div>
          </div>
      </div>

          
      
      tutorList.insertAdjacentHTML('beforeend', tutorCard);
    });
  });


// Function to display tutor details in the modal
// Function to display tutor details in the modal
function showTutorDetails(image, name, qualifications, subjects, fees, rating) {
    document.getElementById('modal-tutor-image').src = image;
    document.getElementById('modal-tutor-name').textContent = name;
    document.getElementById('modal-tutor-qualifications').textContent = qualifications;
    document.getElementById('modal-tutor-subjects').textContent = subjects;
    document.getElementById('modal-tutor-fees').textContent = fees;
  
    // Clear any existing star rating
    const ratingContainer = document.getElementById('modal-tutor-rating');
    ratingContainer.textContent = ''; // Clear previous content
  
    // Generate star ratings and append them using appendChild
    const stars = generateStarRating(rating);
    ratingContainer.appendChild(stars); // Append the stars and rating text
  }
  

// Function to generate star ratings
function generateStarRating(rating) {
    const ratingContainer = document.createElement('div'); // Create a container for stars and text
    ratingContainer.classList.add('rating-container'); // Add a class for styling

    const ul = document.createElement('ul'); // Create <ul> element for stars
    ul.classList.add('stars-list'); // Add a class for the list

    // Loop to generate stars
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li'); // Create <li> element
        li.classList.add('star'); // Add base star class
        if (i <= rating) {
            li.classList.add('gold-star'); // Add gold class for filled stars
            li.textContent = '★'; // Filled star
        } else {
            li.classList.add('gray-star'); // Add gray class for empty stars
            li.textContent = '☆'; // Empty star
        }
        ul.appendChild(li); // Append each <li> to <ul>
    }

    // Add text for rating (e.g., "2 out of 5 stars")
    const ratingText = document.createElement('p');
    ratingText.classList.add('ratestars');
    ratingText.textContent = `${rating}/5 stars`;

    // Append stars list and text to the container
    ratingContainer.appendChild(ul);
    ratingContainer.appendChild(ratingText);

    return ratingContainer; // Return the container with stars and text
}
