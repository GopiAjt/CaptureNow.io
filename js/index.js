let user = JSON.parse(localStorage.getItem('user'));
console.log(user);

try {
    
    let token = user.authToken;
} catch (error) {
    console.log("no auth token");
}

document.addEventListener('DOMContentLoaded', () => {

    fetchPhotographers();

});
// Function to make the API call and populate the cards
function fetchPhotographers() {
    fetch('http://localhost:8080/customer/getPhotographersIndex',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const photographer = data[i];
                // Create the elements for the card
                var eleDiv = document.createElement('div');
                eleDiv.classList.add('ele');

                var cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                var cardBodyDiv = document.createElement('div');
                cardBodyDiv.classList.add('card-body');

                var cardImgDiv = document.createElement('div');
                cardImgDiv.classList.add('card-img');

                var img = document.createElement('img');
                if (photographer.profilePhoto == null) {
                    img.src = '/images/default_profile.png';
                } else {
                    img.src = 'data:image/jpeg;base64,' + photographer.profilePhoto;
                }
                img.classList.add('card-img-top');
                img.alt = '...';


                var aTag = document.createElement('a');
                aTag.style.cursor = "pointer";
                aTag.addEventListener('click', function (event) {
                    event.preventDefault();
                    window.alert('Please Login to see a photographer');
                });

                aTag.appendChild(img);

                cardImgDiv.appendChild(aTag);

                var cardInfoDiv = document.createElement('div');
                cardInfoDiv.classList.add('card-info');

                var cardNameDiv = document.createElement('div');
                cardNameDiv.classList.add('card-name');

                // anchor tag
                var tag = document.createElement('a');
                tag.href = 'photographer/profile-album.html';
                var h4Tag = document.createElement('h4');
                h4Tag.textContent = photographer.name;

                tag.style.textDecoration = "none";
                tag.style.color = "black";
                h4Tag.style.fontWeight = "bolder";

                tag.appendChild(h4Tag);
                cardNameDiv.appendChild(tag);
                cardInfoDiv.appendChild(cardNameDiv);

                tag.addEventListener('click', function (event) {
                    event.preventDefault();
                    window.alert('Please Login to see a photographer');
                });

                let cardExpireanceDiv = document.createElement('div');
                cardExpireanceDiv.classList.add('card-experievce');
                cardExpireanceDiv.textContent = photographer.experience;
                cardInfoDiv.appendChild(cardExpireanceDiv);

                var cardLocationDiv = document.createElement('div');
                cardLocationDiv.classList.add('card-location');
                cardLocationDiv.textContent = photographer.serviceLocation;
                cardInfoDiv.appendChild(cardLocationDiv);

                var cardServicesDiv = document.createElement('div');
                cardServicesDiv.classList.add('card-services');
                cardServicesDiv.textContent = photographer.services;
                cardInfoDiv.appendChild(cardServicesDiv);

                let cardLanguagesDiv = document.createElement('div');
                cardLanguagesDiv.classList.add('card-language');
                cardLanguagesDiv.textContent = photographer.languages;
                cardInfoDiv.appendChild(cardLanguagesDiv);

                var cardFooterDiv = document.createElement('div');
                cardFooterDiv.classList.add('card-fotter');

                var priceRangeDiv = document.createElement('div');
                priceRangeDiv.classList.add('price-range');
                priceRangeDiv.textContent = 'starts with: ' + 1000;
                cardFooterDiv.appendChild(priceRangeDiv);

                var button = document.createElement('button');
                button.type = 'button';
                button.id = 'bookMe';
                button.classList.add('btn', 'btn-dark', 'btn-sm');
                // button.setAttribute('data-bs-toggle', 'modal');
                // button.setAttribute('data-bs-target', '#BookModal');
                button.textContent = 'Book Me';
                cardFooterDiv.appendChild(button);

                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    window.alert('Please Login to see a photographer');
                });

                cardBodyDiv.appendChild(cardImgDiv);
                cardBodyDiv.appendChild(cardInfoDiv);
                cardDiv.appendChild(cardBodyDiv);
                eleDiv.appendChild(cardDiv);
                cardDiv.appendChild(cardFooterDiv);

                // Append the dynamically generated card to the container (e.g., <div class="recommendations">)
                document.querySelector('.recommendations').appendChild(eleDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching photographers:', error);
        });
};
