document.getElementById('date-picker').addEventListener('change', function() {
    const selectedDate = this.value;
    document.getElementById('selected-date').textContent = new Date(selectedDate).toLocaleDateString();
});
