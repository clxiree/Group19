// Function to filter notes by SCIS, SOE, or All
function filterNotes() {
    const faculty = document.getElementById('faculty').value;
    const notes = document.querySelectorAll('.note-card');

    notes.forEach(note => {
        if (faculty === 'all') {
            note.style.display = 'block';  // Show all
        } else if (note.classList.contains(faculty)) {
            note.style.display = 'block';  // Show specific category
        } else {
            note.style.display = 'none';  // Hide other categories
        }
    });
}

// Function to search notes
function searchNotes() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const notes = document.querySelectorAll('.note-card');

    notes.forEach(note => {
        const title = note.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            note.style.display = 'block';  // Show if search matches
        } else {
            note.style.display = 'none';  // Hide if search doesn't match
        }
    });
}

// Trigger search on enter key press in the search bar
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchNotes();
    }
});

// Function to toggle between Browse Notes and Saved Notes
function showBrowseNotes() {
    document.getElementById('browse-notes-section').style.display = 'grid'; // Show Browse Notes
    document.getElementById('saved-notes-section').style.display = 'none';  // Hide Saved Notes
}

function showSavedNotes() {
    document.getElementById('browse-notes-section').style.display = 'none'; // Hide Browse Notes
    document.getElementById('saved-notes-section').style.display = 'grid';  // Show Saved Notes
}
