// Fetch the review data from the backend
fetch('get_reviews.php')
    .then(response => response.json())
    .then(data => {
        const tutorData = data[0];  // Assuming we fetch the first tutor's reviews

        // Populate tutor's image and name
        document.getElementById('tutor-image').src = tutorData.tutor_image;
        document.getElementById('tutor-name').textContent = `${tutorData.reviews.length} Reviews for ${tutorData.tutor_name}`;

        // Populate the reviews
        const reviewList = document.getElementById('review-list');
        tutorData.reviews.forEach(review => {
            // Create the review card
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('row', 'mt-4');

            reviewCard.innerHTML = `
                <div class="col-md-4 text-center">
                    <img src="${review.reviewer_image}" class="" alt="Reviewer">
                </div>
                <div class="col-md-8 text-center">
                    <div class="rating">
                        ${generateStarRating(review.rating).outerHTML}
                        <span class="ratestars">${review.rating} / 5 stars</span>
                    </div>
                    <p class="pt-3"><strong>Tutee name: </strong>${review.reviewer_name}</p>
                    <p><strong>Subject: </strong>${review.subject}</p>
                    <p><strong>Date published: </strong>${review.review_date}</p>
                    <p><strong>Comments: </strong>${review.comment}</p>
                </div>
            `;

            // Append the review card to the list
            reviewList.appendChild(reviewCard);
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));

// Function to generate star ratings
function generateStarRating(rating) {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.margin = '0';

    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        li.style.display = 'inline';
        li.style.fontSize = '30px';
        li.textContent = i <= rating ? '★' : '☆';
        li.style.color = i <= rating ? 'gold' : 'gray';
        ul.appendChild(li);
    }

    return ul;
}

function goToTutorPage() {
    window.location.href = "../tutee tutor page/tuteetutorpage.html"; // Redirect to the tutor list page
}
