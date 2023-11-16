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
        img.src = '/images/default_profile.png';
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
        // Create the main review container
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        // Create the head container with flex layout and space-between justification
        const head = document.createElement("div");
        head.className = "head";
        head.style.display = "flex";
        head.style.justifyContent = "space-between";

        // Create the ratingProfile container within head
        const ratingProfile = document.createElement("div");
        ratingProfile.className = "ratingProfile";
        ratingProfile.style.display = "flex";
        ratingProfile.style.alignItems = "flex-end";

        // Create image and h5 elements for the ratingProfile
        const profileImage = document.createElement("img");
        profileImage.src = "/images/default_profile.png";
        profileImage.alt = "";
        profileImage.style.width = "3vw";
        const profileName = document.createElement("h5");
        profileName.textContent = review.customerName;
        profileName.style.marginBottom = "0%"
        profileName.style.marginLeft = "10px"

        // Append image and h5 to ratingProfile
        ratingProfile.appendChild(profileImage);
        ratingProfile.appendChild(profileName);

        // Create the ratingBody container within head
        const ratingBody = document.createElement("div");
        ratingBody.className = "ratingBody";
        ratingBody.style.display = "flex";
        ratingBody.style.alignItems = "center";

        // Create image and h4 elements for the ratingBody
        const starImage = document.createElement("img");
        starImage.src = "/images/star.png";
        starImage.style.width = "2.5vw";
        starImage.style.height = "5vh";
        const ratingValue = document.createElement("h5");
        ratingValue.textContent = review.rating;

        // Append starImage and h4 to ratingBody
        ratingBody.appendChild(starImage);
        ratingBody.appendChild(ratingValue);

        // Append ratingProfile and ratingBody to head
        head.appendChild(ratingProfile);
        head.appendChild(ratingBody);

        // Create the comment container
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.style.marginLeft = "5%";
        commentElement.style.marginTop = "3%";

        // Create a paragraph element for the comment text
        const commentParagraph = document.createElement("p");
        commentParagraph.textContent = review.comment;

        // Append the paragraph to the comment container
        commentElement.appendChild(commentParagraph);

        // Append the head and comment containers to the main review container
        reviewElement.appendChild(head);
        reviewElement.appendChild(commentElement);

        // Append the review container to the main review container in the HTML document
        reviewContainer.appendChild(reviewElement);
    });
}