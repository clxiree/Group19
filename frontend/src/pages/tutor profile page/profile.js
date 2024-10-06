document.addEventListener("DOMContentLoaded", function() {
    const courseInput = document.getElementById("courseInput");
    const courseTags = document.getElementById("courseTags");
    let validCourses = [];

    // Function to create a course tag
    function createCourseTag(courseCode) {
        const tag = document.createElement("div");
        tag.classList.add("tag", "d-flex", "align-items-center", "mb-2", "px-2");

        // Add course code text and remove button
        tag.innerHTML = `
            <span class="px-3 py-1 me-2 bg-light rounded-pill">${courseCode}</span>
            <button type="button" class="btn btn-sm btn-danger rounded-pill">&times;</button>
        `;

        // Append the tag to the courseTags container
        courseTags.appendChild(tag);

        // Add event listener to remove tag on clicking the red "X"
        tag.querySelector("button").addEventListener("click", function() {
            courseTags.removeChild(tag);
        });
    }

    // Function to fetch valid courses from get_courses.php
    function fetchCourses() {
        fetch('get_courses.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('Fetched response:', response); // Debug the response
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Debug the fetched data
                validCourses = data.map(course => course.toUpperCase()); // Store valid courses in uppercase
                console.log('Valid courses (uppercased):', validCourses); // Debug valid courses
            })
            .catch(error => {
                console.error('Error fetching courses:', error); // Catch any fetch errors
            });
    }
    

    // Call fetchCourses when the page loads
    fetchCourses();

    // Event listener for the input field
    courseInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && courseInput.value.trim() !== "") {
            event.preventDefault();
            const inputValue = courseInput.value.trim().toUpperCase(); // Convert input to uppercase
            console.log('Input value:', inputValue); // Debug the user input

            // Only create a tag if the input is in the list of valid courses
            if (validCourses.includes(inputValue)) {
                createCourseTag(inputValue);
            } else {
                console.warn(`Invalid course code: ${inputValue}`);
            }

            courseInput.value = ""; // Clear the input field after attempting to add the tag
        }
    });
});
