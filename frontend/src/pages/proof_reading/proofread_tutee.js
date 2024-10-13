function updateFileName(input, spanId) {
    var fileName = input.files[0].name; 
    document.getElementById(spanId).innerText = fileName; 
}