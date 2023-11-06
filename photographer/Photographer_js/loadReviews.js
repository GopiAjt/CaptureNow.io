document.addEventListener('DOMContentLoaded', () => {
    let data = JSON.parse(localStorage.getItem('photographerData'));
    console.log(data.email);
    fetchPhotographerByEmail(data);
    loadReviewsByEmail(data.email);
});

async function fetchPhotographerByEmail(data) {

    console.log(data);
    document.getElementById('name').textContent = data.name;
    // document.getElementById('phoneNumber').textContent = data.phoneNumber;
    document.getElementById('serviceLocation').textContent = data.serviceLocation;
    document.getElementById('languagesKnown').textContent = data.languages;
    document.getElementById('services').textContent = data.services;
    document.getElementById('description').textContent = data.aboutMe;
    document.getElementById('experience').textContent = data.experience + ' Years';
    let img = document.getElementById('profileImage');
    let navImg = document.getElementById('nav-img');


    document.title = data.name;

    if (data.profilePhoto == null) {
        img.src = '/images/profile.jpg';
        navImg.src = '/images/profile.jpg';
    }
    else {
        img.src = 'data:image/jpeg;base64,' + data.profilePhoto;
        // navImg.src = 'data:image/jpeg;base64,' + data.profilePhoto;
    }
    console.log(data);
}

async function loadReviewsByEmail(email) {

    let data = JSON.parse(localStorage.getItem('user'));
    let token = data.authToken;

    let response = await fetch('http://localhost:8080/customer/getReviews?email=' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        populateReviews(data);
    } else {
        console.log('error fetching the Data');
    }
};

function populateReviews(data) {

    const reviewContainer = document.querySelector(".reviewContainer");

    // Clear any existing reviews in the container
    reviewContainer.innerHTML = "";

    data.forEach((review) => {
        // Create an element to display the customer name
        const customerNameElement = document.createElement("p");
        customerNameElement.textContent = `Customer Name: ${review.customerName}`;

        // Create an element to display the comment
        const commentElement = document.createElement("p");
        commentElement.textContent = `Comment: ${review.comment}`;

        // Create an element to display the rating
        const image = document.createElement("img");
        image.src = "images/star.png";
        const ratingElement = document.createElement("p");
        ratingElement.textContent = `Rating: ${review.rating}`;

        // Create a container for each review
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        // Append the elements to the review container
        reviewElement.appendChild(customerNameElement);
        reviewElement.appendChild(commentElement);
        reviewElement.appendChild(ratingElement);

        // Append the review container to the main review container
        reviewContainer.appendChild(reviewElement);
    });
}