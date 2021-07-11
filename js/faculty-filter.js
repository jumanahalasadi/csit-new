var activeFiltersHash = {};
var activeFilters = [];

$(document).ready(function () {

    // if you click on a checkbox in the menu we are going to add it to the active filters hash
    $("input[type='checkbox']").click(function () {
        let textLabel = $(this).parent().text().trim();

        if (this.checked) {
            activeFilters.push(this.value);
            activeFiltersHash[this.value] = textLabel;
        } else {
            activeFilters = activeFilters.filter(filter => filter !== this.value);
            delete activeFiltersHash[this.value];
        }
        /** TODO - CHRIS JOSLIN - ADD ajax call to update grid with appropriate faculty **/

        // Update filters
        updateSelectedFilters();
    });

    // opening and closing the filter menu
    $(".filter-menu-btn").click(function () {

        $(".checkbox-menu-container").toggleClass('active');
        $(".filter-menu-btn").toggleClass('open');

    });


    $(".filters-selected").on('click', 'li', function () {
        let id = $(this).attr('id');

        // this grabs only their id because pills are span ids starting with "pill-<filterName>"
        let filterId = id.split("-")[1];

        // find the checkbox of that filter and uncheck it
        let checkbox = $("input:checkbox").filter(function () {
            return this.value == filterId;
        })[0];

        if (checkbox) {
            checkbox.checked = false;
        }

        // delete item from hash
        delete activeFiltersHash[filterId];

        updateSelectedFilters();
    });

    // Faculty cards grid - 
    $(".faculty-card").click(function () {
        // clear all
        $(".faculty-card").removeClass("expanded");
        $(".open-faculty-btn").removeClass("expanded");

        // Expand only the clicked item
        $(this).toggleClass("expanded");
        $(this).find('button').toggleClass("expanded");
    });

    // Adding masonry functionality for the faculty grid
    var $grid = $('.faculty-container').masonry({
        itemSelector: '.faculty-card',
        
    });

    // Refresh grid
    $grid.on('click', '.faculty-card', function (event) {
        $grid.masonry();
    });

    // Faculty Details page -

    // Start with the bio tab open
    $('.faculty-details-desc').hide();
    $('#faculty-details-' + 'bio').show();

    $('.faculty-details-tab').click(function () {
        var $this = $(this).get(0);

        // clear all active 
        $('.faculty-details-tab').removeClass("active-tab");
        $($this).addClass("active-tab");
        $('.faculty-details-desc').hide();

        // show only the clicked one
        var activeId = $($this).text();
        $('#faculty-details-' + activeId).show();

    })

});

function updateSelectedFilters() {

    $(".filters-selected ul").empty();
    for (const [key, value] of Object.entries(activeFiltersHash)) {
        $(".filters-selected ul").append("<li id='pill-" + key + "'class='filter-pill'>" + value + "</li>");
    }

    activeFilters = convertHashToArray(activeFiltersHash);
    return false;
}

function convertHashToArray(hash) {
    let newArray = []
    for (const [key, value] of Object.entries(hash)) {
        newArray.push(key);
    }
    return newArray;
}