const searchData = [
    'Portraits','Wedding Photography','Documentary','Sports','Fashion','Commercial','Street Photography','Event Photography',
    'Travel','Pet Photography','Product Photography','Real Estate','Food','Still Life Photography','Architecture','Abstract Photography','Landscape',
    'Wildlife','Macro','Underwater','Astrophotography','Aerial Photography','Scientific','birthday','dethday','events'
];
// Get references to the search input, results container, and no results message
const searchInput = document.getElementById('inputPre');
const searchResults = document.getElementById('searchResults');
const noResultsMessage = document.getElementById('noResultsMessage');

// Function to perform search and display results
function performSearch() {
    console.log('searching');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = searchData.filter(item => item.toLowerCase().includes(searchTerm));

    // Clear previous search results
    searchResults.innerHTML = '';

    if (filteredData.length === 0) {
        // Display no results message if no matches found
        noResultsMessage.style.display = 'block';
    } else {
        // Populate search results
        noResultsMessage.style.display = 'none';
        filteredData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            searchResults.appendChild(listItem);
            if(filteredData.length == 23)
            {
                searchResults.innerHTML = "";
            }
        });
    }
}

// Add event listener to the search input
searchInput.addEventListener('keyup', performSearch);
