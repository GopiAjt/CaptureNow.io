// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");
const ratingDisplay = document.getElementById("rating-display");

// Initialize a variable to keep track of the selected rating
let selectedRating = 0;

// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
    // Add an event listener that runs a function when the "click" event is triggered
    star.addEventListener("click", () => {
        // Update the selected rating
        selectedRating = index1 + 1;
        // Update the rating display
        ratingDisplay.textContent = `${selectedRating} stars selected`;
        // Loop through the "stars" NodeList Again
        stars.forEach((star, index2) => {
            // Add the "active" class to the clicked star and any stars with a lower index
            // and remove the "active" class from any stars with a higher index
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});

const btn = document.getElementById('addPhotographerReview');
btn.addEventListener('click', async () => {
    let data = JSON.parse(localStorage.getItem('photographerData'));
    let comment = document.getElementById("comment").value;
    console.log(comment);
    console.log(selectedRating);
    console.log(data.email);

    console.log('Adding Review');

    let user = JSON.parse(localStorage.getItem('user'));

    let token = user.authToken;

    var requestBoday = {
        customerId: user.email,
        photographerId: data.email,
        rating: selectedRating,
        comment: comment
    };

    let response = await fetch('http://localhost:8080/customer/addReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBoday)
    });

    if (response.ok) {
        window.location.href = "./reviews.html";
        const snackbar = document.createElement("div");
        snackbar.id = "snackbar";
        snackbar.textContent = "Review Added";
        document.body.appendChild(snackbar);
        snackbar.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        console.log('Review Added Successfully');
    };
});
