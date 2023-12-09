
document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch values when the Apply button is clicked
    function fetchFilterValues() {
        // Location
        const locationOptions = document.getElementsByName('inlineRadioOptionsLocation');
        let selectedLocation;
        locationOptions.forEach(option => {
            if (option.checked) {
                selectedLocation = option.value;
            }
        });

        // Maximum Distance
        const maxDistance = document.getElementById('customRange').value;

        // Sort By - Cost
        const costOptions = document.getElementsByName('inlineRadioOptionsCost');
        let selectedCostSort;
        costOptions.forEach(option => {
            if (option.checked) {
                selectedCostSort = option.value;
            }
        });

        // Sort By - Ratings
        const ratingOptions = document.getElementsByName('inlineRadioOptionsRating');
        let selectedRatingSort;
        ratingOptions.forEach(option => {
            if (option.checked) {
                selectedRatingSort = option.value;
            }
        });

        // Log or use the values as needed
        console.log('Location:', selectedLocation);
        console.log('Maximum Distance:', maxDistance);
        console.log('Sort By - Cost:', selectedCostSort);
        console.log('Sort By - Ratings:', selectedRatingSort);
    }

    // Add click event listener to the Apply button
    const applyButton = document.querySelector('.btn-dark');
    applyButton.addEventListener('click', fetchFilterValues);
});