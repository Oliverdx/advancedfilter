$('.adv-filter-btn').click(function(){
    $(this).toggleClass('showAdvanced');
	$('#box-advfilter').toggleClass('showAdvanced');
});

if( $(window).width() < 768 ){ // Mobile 

    $('.adv-filter-btn').click(function(){
        $('.site-overlay').addClass('showfilter');
    });

    $('#box-advfilter h5').click(function(){
        $(this).parent().toggleClass('openfilter').siblings().removeClass('openfilter'); 
    });

    $('.filter-close').click(function(){
        $('#box-advfilter').removeClass('showAdvanced');
        $('.site-overlay').removeClass('showfilter');
    });

    /*   
        $('.site-overlay').click(function(){
        if( $(this).hasClass('showfilter')){
            $('.site-overlay').removeClass('showfilter');
            $('#box-advfilter').removeClass('showAdvanced');
        }
    }); */

}


/* #### FILTER #### */

$('#box-advfilter input[type="radio"]').change(function(){    
    
    if($(this).val() == "") { //if the check is All
        $('#videos-content .single-video').show(); //Show all elements
        $('#box-advfilter input[type="radio"]').prop('checked', false); //Uncheck all the radio buttons
    }
    
    if( $('#filterinput').val() == ""){ //If the input[text] is blank
        var radio = $('#box-advfilter input[type="radio"]:checked');
        var classes = '';
        $('#videos-content .single-video').hide();

        for (var i = 0; i < radio.length ; i++){ 
                classes += '.' + radio[i].value;
        }
        $('#videos-content .single-video' + classes).show();

    }else{
        filterProcedures(); //Case the input[text] is not blank show the results using it as parameter
    }

    if($('.single-video:visible').length == 0){
        $('.novideos').show();
    }else{
        $('.novideos').hide();
    }
   
});


function filterProcedures() {
		var filter, element, elementTitle, radio, advfilter = "";
	
		filter = document.querySelector("#filterinput").value.toLowerCase(); //text inside input
        element = $("#videos-content .single-video h3"); //Array list of elements to filter
        radio = $('#box-advfilter input[type="radio"]:checked'); //Advanced Filter array

        for(var n = 0; n < radio.length; n++){ //Trasform radio values into classes
            advfilter += "." + radio[n].value;
        }
        
        $('#videos-content .single-video').hide(); //Hide all the elements
   
		for (var i = 0; i < element.length; i++) {

            elementTitle = element[i].innerHTML; //catch title of procedure            

			if (elementTitle.toLowerCase().indexOf(filter) > -1 ) {                     
                
                if( advfilter == "" ){
                    $(element[i]).parent().show(); //Show elements by the text input
                }else{
                    $(element[i]).parent().filter(advfilter).show(); //Show elements by the text input and advanced filter
                }

            }else{
                $(element[i]).parent().hide();
            }
            
        } 
        
        if(document.querySelector("#filterinput").value == ""){ //Input text is blank
            $('#videos-content .single-video').show(); //Show all elements
            $('#box-advfilter input[type="radio"]').prop('checked', false); //Uncheck all radio buttons
        }

        if($('.single-video:visible').length == 0){
            $('.novideos').show();
            $('#videos-content').addClass('nothingfound');
        }else{
            $('.novideos').hide();
            $('#videos-content').removeClass('nothingfound');
        }
	
} //End FilterProcedures

