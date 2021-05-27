var activeFiltersHash =  {};
var activeFilters = [];

$(document).ready(function () {
    

    $("input[type='checkbox']").click(function () {
        let textLabel = $(this).parent().text().trim();

       if (this.checked) {
           activeFilters.push(this.value);
           activeFiltersHash[this.value]= textLabel;
       } else {
            activeFilters = activeFilters.filter ( filter => filter !== this.value );
            delete activeFiltersHash[this.value];
        }
        // ajax call
        updateSelectedFilters();
    });

    $(".filter-menu-btn").click(function () {

        $(".checkbox-menu-container").toggleClass('active');
        $(".filter-menu-btn").toggleClass('open');

    });


    $(".filters-selected").on('click','li', function(){
        let id = $(this).attr('id');

        let filter = id.split("-")[1];

        // $("input:checkbox[value='" + filter + "']").attr("checked","false");
        
        let checkbox = $("input:checkbox").filter( function() {
            return this.value == filter;
        })[0];

        if (checkbox) {
            checkbox.checked = false;
        }

        // delete item from hash
        delete activeFiltersHash[filter];

        updateSelectedFilters();
    });


    // Faculty cards
    $(".open-faculty-btn").click(function () {
        console.log ($(this).parent());
        $(this).parent().toggleClass("expanded");
        $(this).toggleClass("expanded");

    });
    

    

});

function updateSelectedFilters(){

    // console.log (activeFiltersHash)
    // Clear the filters for a re-render 
    $(".filters-selected ul").empty();

    // For each active filter display value
    // activeFilters.forEach( (filter) => {
    //     $(".filters-selected ul").append( "<li class='filter-pill'>" + filter + "</li>"); 
    // })

    for([key,value] of Object.entries(activeFiltersHash)){
        $(".filters-selected ul").append( "<li id='pill-" + key +"'class='filter-pill'>" + value + "</li>"); 
    }

    activeFilters = convertHashToArray(activeFiltersHash);
    console.log (activeFilters);

    return false;
}

function convertHashToArray (hash) {
    let newArray = []
    for ([key, value] of Object.entries(hash)) {
        newArray.push (key);
    }
    return newArray;
}