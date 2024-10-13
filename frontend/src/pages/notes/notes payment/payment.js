function confirmPayment() {
    var checkbox = document.getElementById('payment-confirmed');
    var doneButton = document.getElementById('done-btn');
    if (checkbox.checked) {
        doneButton.disabled = false;
        doneButton.classList.add('active');
    } else {
        doneButton.disabled = true;
        doneButton.classList.remove('active');
    }
    
}
document.getElementById('done-btn').addEventListener('click', function() {
    alert('Thank you for your payment! You will receive a confirmation shortly.');
    // Redirect to another page or perform other actions as needed
});
