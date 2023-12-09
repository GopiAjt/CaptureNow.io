const searchInput = document.getElementById('inputLoc');
const autocompleteResults = document.getElementById('autocompleteResults');

const searchInputPre = document.getElementById('inputPre');
const autocompleteResultsPre = document.getElementById('autocompleteResultsPre');

// Add popular locations of India with a focus on photography industry activity
const data = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
  'Goa', 'Varanasi', 'Udaipur', 'Agra', 'Jaipur',
  'Chandigarh', 'Amritsar', 'Nagpur', 'Indore', 'Bhopal',
  'Surat', 'Vadodara', 'Rajkot', 'Nashik', 'Thane'
  // Add more locations as needed
];

const preparations = [
  'wedding', 'pre wedding','Portraits','Documentary','Fashion','Commercial','Street','Event','Travel',
  'Pet','Product','Real Estate','Food','Still Life','Architecture','Abstract','Landscape','Wildlife','Macro',
  'Astrophotography','Scientific','Underwater'
]

function updateResults(value, resultsContainer) {
  resultsContainer.innerHTML = '';

  const dataSource = resultsContainer === autocompleteResults ? data : preparations;

  const filteredData = dataSource.filter(item =>
    item.toLowerCase().startsWith(value.toLowerCase())
  );

  filteredData.forEach(item => {
    const listItem = document.createElement('button');
    listItem.classList.add('dropdown-item');
    listItem.textContent = item;
    listItem.addEventListener('click', () => {
      if (resultsContainer === autocompleteResults) {
        searchInput.value = item;
      } else if (resultsContainer === autocompleteResultsPre) {
        searchInputPre.value = item;
      }

      resultsContainer.innerHTML = '';
    });
    resultsContainer.appendChild(listItem);
  });

  if (filteredData.length > 0) {
    resultsContainer.style.display = 'block';
  } else {
    resultsContainer.style.display = 'none';
  }
}

searchInput.addEventListener('input', function () {
  updateResults(this.value, autocompleteResults);
});

searchInputPre.addEventListener('input', function () {
  updateResults(this.value, autocompleteResultsPre);
});

document.addEventListener('click', function (event) {
  if (!autocompleteResults.contains(event.target) && event.target !== searchInput) {
    autocompleteResults.style.display = 'none';
  }

  if (!autocompleteResultsPre.contains(event.target) && event.target !== searchInputPre) {
    autocompleteResultsPre.style.display = 'none';
  }
});
