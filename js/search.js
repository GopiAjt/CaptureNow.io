const searchInputLoc = document.getElementById('inputLoc');
const autocompleteResults = document.getElementById('autocompleteResults');

const searchInputPre = document.getElementById('inputPre');
const autocompleteResultsPre = document.getElementById('autocompleteResultsPre');

const data = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
  'Goa', 'Varanasi', 'Udaipur', 'Agra', 'Chandigarh',
  'Amritsar', 'Nagpur', 'Indore', 'Bhopal', 'Surat',
  'Vadodara', 'Rajkot', 'Nashik', 'Thane'
];

const preparations = [
  'wedding', 'pre wedding', 'Portraits', 'Documentary', 'Fashion', 'Commercial', 'Street', 'Event', 'Travel',
  'Pet', 'Product', 'Real Estate', 'Food', 'Still Life', 'Architecture', 'Abstract', 'Landscape', 'Wildlife', 'Macro',
  'Astrophotography', 'Scientific', 'Underwater'
];

function updateResults(value, resultsContainer, searchInput) {
  resultsContainer.innerHTML = '';

  const dataSource = resultsContainer === autocompleteResults ? data : preparations;

  const filteredData = dataSource.filter(item =>
    item.toLowerCase().startsWith(value.toLowerCase())
  );

  filteredData.forEach(item => {
    const listItem = document.createElement('button');
    listItem.classList.add('dropdown-item');
    listItem.textContent = item;

    listItem.setAttribute('role', 'option');
    listItem.setAttribute('aria-selected', 'false');

    listItem.addEventListener('click', () => {
      searchInput.value = item;
      resultsContainer.innerHTML = '';
    });

    resultsContainer.appendChild(listItem);
  });

  if (filteredData.length > 0) {
    resultsContainer.style.display = 'block';
    resultsContainer.setAttribute('role', 'listbox');
  } else {
    resultsContainer.style.display = 'none';
  }
}

searchInputLoc.addEventListener('input', function () {
  updateResults(this.value, autocompleteResults, searchInputLoc);
});

searchInputPre.addEventListener('input', function () {
  updateResults(this.value, autocompleteResultsPre, searchInputPre);
});

document.addEventListener('click', function (event) {
  if (!autocompleteResults.contains(event.target) && event.target !== searchInputLoc) {
    autocompleteResults.style.display = 'none';
  }

  if (!autocompleteResultsPre.contains(event.target) && event.target !== searchInputPre) {
    autocompleteResultsPre.style.display = 'none';
  }
});