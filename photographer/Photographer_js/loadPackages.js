document.addEventListener('DOMContentLoaded', () => {
    let data = JSON.parse(localStorage.getItem('photographerData'));
    console.log(data);
    fetchPhotographerByEmail(data);
    LoadPackage(data.Packages);
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

function LoadPackage(packages) {
    console.log('update package');

    let packageContainer = document.getElementsByClassName("package-container")[0];
    packageContainer.innerHTML = ""; // Clear existing content

    if (packages.length === 0) {
        let noData = document.getElementById('#noData');
        let data = document.createElement("h2");
        data.textContent = "No Data To Display";
        noData.appendChild(data);
    } else {
        for (let i = 0; i < packages.length; i++) {
            let package = packages[i];

            let packageContent = document.createElement("div");
            packageContent.classList.add("package-content");

            let packageDiv = document.createElement("div");
            packageDiv.classList.add("package");

            let packageNameHeading = document.createElement("h3");
            packageNameHeading.textContent = package.packageName;
            packageNameHeading.style.backgroundColor = 'yellow';
            packageNameHeading.style.padding = '5px';
            packageNameHeading.style.borderRadius = '10px';
            packageDiv.appendChild(packageNameHeading);

            let descriptionHeading = document.createElement("h5");
            descriptionHeading.textContent = "Description:";
            packageDiv.appendChild(descriptionHeading);

            // Function to replace newline characters with <br> tags
            function addLineBreaks(text) {
                return text.replace(/\n/g, '<br>');
            }

            // Assuming you have retrieved the description from the backend and stored it in the variable 'package.description'
            const packageDescription = package.description;

            // Create a new paragraph element
            let descriptionParagraph = document.createElement("p");
            descriptionParagraph.style.padding = '10px';

            // Replace the newline characters with <br> tags and set the content of the paragraph
            descriptionParagraph.innerHTML = addLineBreaks(packageDescription);

            // Append the paragraph element to the packageDiv
            packageDiv.appendChild(descriptionParagraph);

            packageContent.appendChild(packageDiv);

            let packageFoot = document.createElement("div");
            packageFoot.classList.add("packege-foot");

            let priceDiv1 = document.createElement("div");
            priceDiv1.classList.add("price");
            priceDiv1.textContent = "Event Rate: " + package.eventRate;
            packageFoot.appendChild(priceDiv1);

            let priceDiv2 = document.createElement("div");
            priceDiv2.classList.add("price");
            priceDiv2.textContent = "One Day Rate: " + package.oneDayRate;
            packageFoot.appendChild(priceDiv2);

            let priceDiv3 = document.createElement("div");
            priceDiv3.classList.add("price");
            priceDiv3.textContent = "One Hour Rate: " + package.oneHourRate;
            packageFoot.appendChild(priceDiv3);

            let priceDiv4 = document.createElement("div");
            priceDiv4.classList.add("price");
            priceDiv4.textContent = "video Rate: " + package.videoRate;
            packageFoot.appendChild(priceDiv4);

            packageContent.appendChild(packageFoot);

            packageContainer.appendChild(packageContent);
        };
    }
}