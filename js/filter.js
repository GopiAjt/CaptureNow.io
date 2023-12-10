const applyFilterButton = document.getElementById('applyFilter');

applyFilterButton.addEventListener('click', function () {
    // Location
    const locationOption = document.querySelector('input[name="inlineRadioOptionsLocation"]:checked').value;

    // Maximum Distance
    const maxDistance = document.getElementById('customRange').value;

    // Sort By Cost
    const sortByCostOption = document.querySelector('input[name="inlineRadioOptionsCost"]:checked').value;

    // Sort By Rating
    const sortByRatingOption = document.querySelector('input[name="inlineRadioOptionsRating"]:checked').value;

    const filterData = {
        location: locationOption,
        maxDistance,
        sortByCost: sortByCostOption,
        sortByRating: sortByRatingOption,
    };

    console.log(filterData);
});
