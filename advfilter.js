$('.adv-filter-btn').click(function () {
    $(this).toggleClass('showAdvanced');
    $('#box-advfilter').toggleClass('showAdvanced');
});

if ($(window).width() < 768) { // Mobile 
    $('.adv-filter-btn').click(function () {
        $('.site-overlay').addClass('showfilter');
    });

    $('#box-advfilter h5').click(function () {
        $(this).parent().toggleClass('openfilter').siblings().removeClass('openfilter');
    });

    $('.filter-close').click(function () {
        $('#box-advfilter').removeClass('showAdvanced');
        $('.site-overlay').removeClass('showfilter');
    });
}


/* #### FILTER #### */

$('#box-advfilter input[type="radio"]').change(function () {
    if ($(this).val() == "") { //if the check is All
        $('#filter-content .single-element').show(); //Show all elements
        //         $('#box-advfilter input[type="radio"]').prop('checked', false); //Uncheck all the radio buttons
    }

    if ($('#filterinput').val() == "") { //If the input[text] is blank
        var radio = $('#box-advfilter input[type="radio"]:checked');
        var classes = '';

        $('#filter-content .single-element').hide();

        for (var i = 0; i < radio.length; i++)
            if (radio[i].value !== "")
                classes += '.' + radio[i].value;

        $('#filter-content .single-element' + classes).show();
    } else {
        filterProcedures(); //Case the input[text] is not blank show the results using it as parameter
    }

    if ($('.single-element:visible').length == 0) {
        $('.noelements').show();
    } else {
        $('.noelements').hide();
    }

});


function filterElements() {
    var filter, element, elementTitle, radio, advfilter = "";

    filter = document.querySelector("#filterinput").value.toLowerCase(); //text inside input

    /*
     * To include any item in the filter is need include class "filter-search-terms" in class attribute of the element.
     */
    element = $("#filter-content .single-element .filter-search-terms"); //Array list of elements to filter.
    radio = $('#box-advfilter input[type="radio"]:checked'); //Advanced Filter array

    for (var n = 0; n < radio.length; n++) { //Trasform radio values into classes
        advfilter += "." + radio[n].value;
    }

    $('#filter-content .single-element').hide(); //Hide all the elements

    for (var i = 0; i < element.length; i++) {

        elementTitle = element[i].innerHTML; //catch title of procedure            

        if (elementTitle.toLowerCase().indexOf(filter) > -1) {

            if (advfilter == "") {
                $(element[i]).parent().show(); //Show elements by the text input
            } else {
                $(element[i]).parent().filter(advfilter).show(); //Show elements by the text input and advanced filter
            }

        } else {
            $(element[i]).parent().hide();
        }

    }

    if (document.querySelector("#filterinput").value == "") { //Input text is blank
        $('#filter-content .single-element').show(); //Show all elements
        $('#box-advfilter input[type="radio"]').prop('checked', false); //Uncheck all radio buttons
    }

    if ($('.single-element:visible').length == 0) {
        $('.noelements').show();
        $('#filter-content').addClass('nothingfound');
    } else {
        $('.noelements').hide();
        $('#filter-content').removeClass('nothingfound');
    }

} //End FilterProcedures

// Placeholder and magnifier animation

var placeholder;

$('#filterinput').focusin(function () {
    placeholder = $(this).attr('placeholder');
    $(this).attr('placeholder', "");
});

$('#filterinput').on('keydown', function () {
    $(this).parent().addClass('active');
});

$('#filterinput').focusout(function () {
    $(this).parent().removeClass('active');
    $(this).attr('placeholder', placeholder);
});