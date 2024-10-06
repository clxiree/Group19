function toPending(btn) {
    setActiveButton('pending', btn); // Use the helper function to store the state
    window.location.href = "pending.html";  // Navigate after storing the active tab
}

function toConfirmed(btn) {
    setActiveButton('confirmed', btn);
    window.location.href = "confirmed.html";
}

function toCompleted(btn) {
    setActiveButton('completed', btn);
    window.location.href = "completed.html";
}

function toBookings(btn) {
    resetButtons();
    setActiveButton('bookings', btn);
    window.location.href = "bookings.html";

}

function setActiveButton(tab, btn) {
    resetButtons();  
    btn.className = "btn btn-primary mx-5";  
    localStorage.setItem('activeTab', tab); 
}


function resetButtons() {
    const buttons = document.getElementById("buttons").children; 
    for (let btn of buttons) {
        btn.className = "btn mx-5";  
    }
}

function loadActiveTab() {
    const activeTab = localStorage.getItem('activeTab'); 

    if (activeTab === 'pending') {
        const btn = document.querySelector("button[onclick*='toPending']");
        btn.className = "btn btn-primary mx-5"; 
    } else if (activeTab === 'confirmed') {
        const btn = document.querySelector("button[onclick*='toConfirmed']");
        btn.className = "btn btn-primary mx-5"; 
    } else if (activeTab === 'completed') {
        const btn = document.querySelector("button[onclick*='toCompleted']");
        btn.className = "btn btn-primary mx-5";  
    } else if (activeTab === 'bookings') {
        const btn = document.querySelector("button[onclick*='toBookings']");
        btn.className = "btn btn-primary mx-5";  
    }
}
window.onload = loadActiveTab;


function getAll(){
    console.log("success");
    axios.get("api_bookings.php");
    then(response => {
        console.log(response.data);
        
        
        
    }).
    catch((error) => {
        console.log(error.message)
    })
}