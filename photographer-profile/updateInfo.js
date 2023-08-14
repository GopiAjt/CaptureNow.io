document.addEventListener('DOMContentLoaded', () => {
    const albumLink = document.getElementById('packageLink');
    albumLink.addEventListener('click', update());
});

async function update() {
    console.log('update package');

    try {
        const response = await fetch('http://localhost:8080/photographer/getPackages?email=' + data.email, {
            headers: {
                'Authorization': `Bearer ${data.authToken}`
            }
        }); // Replace with your backend API endpoint for retrieving packages
        if (!response.ok) {
            throw new Error('Failed to fetch data from the backend');
        }

        const packages = await response.json();

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
                packageNameHeading.style.padding= '5px';
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

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn", "btn-outline-dark", "btn-sm");
                packageFoot.appendChild(deleteButton);

                deleteButton.addEventListener('click', () => {
                    // Call the function to delete the photo with the appropriate identifier
                    deletePackage(package.id);
                });

                packageContent.appendChild(packageFoot);

                packageContainer.appendChild(packageContent);
            };
        }
    } catch (error) {
        console.error('Error fetching data from the backend:', error.message);
        // Handle the error appropriately, e.g., show an error message to the user.
    }
}


function deletePackage(photoId) {
    const deleteUrl = 'http://localhost:8080/photographer/deletePackage?id=' + photoId; // Replace 'photos' with the appropriate endpoint for deleting photos
    const token = data.authToken; // Replace with the actual authentication token

    // Make the API request to delete the photo
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting photo');
            }
            // If the photo is successfully deleted, you may want to update the UI or take other actions as needed.
            window.alert('Deleted Successfully!');
            update();
        })
        .catch(error => {
            console.error(error);
            // Handle any errors that occur during the delete process
        });
}