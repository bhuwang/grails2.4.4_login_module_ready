$(document).ready(function () {
    $('.single-line').trigger('autoresize');
    
    var isAnAccessory=$("#isAnAccessory");
    
    var addButton=$("#add-transaction-field");
    // for displaying dialog box to add location
    $(".location-list .select-dropdown").val("Select Location");
    
//    $(document).on('change', "#uom", function () {
//        var parent = $(this).closest('.transaction-fields');
//        showAttributes($(this).val(), parent);
//    });
    
    $(isAnAccessory).on('change',function(){
        if($(this).is(":checked")){
            $(".color-select-box").prop("required",false);
            $(".color").hide();
//            $("#uom").prop("required",false);
//            $(".uom").hide();
            $(".attribute-select-box").prop("required",false);
            $(".attributes").hide();
        }else{
            $(".color-select-box").prop("required",true);
//            $("#uom").prop("required",true);
//            $(".uom").show(); 
            $(".color").show();
            $(".attribute-select-box").prop("required",true);
            $(".attributes").show();
        }
    });
    
    /**
     * Function used to display the transaction view on clicking add in
     * the style page button
     * 
     * @author Dipak Thapa <dipakthapa@lftechnology.com>
     */
    $(addButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        $.ajax({
            type : "POST",
            url : "/style/getTransactionView",
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            }
        
        });
        return false;
    });
    
//    function showAttributes ( val, parent ) {
//        $.ajax({
//            type : "POST",
//            url : "/transaction/checkUomValue",
//            data : {
//                value : val
//            },
//            success : function ( data ) {
//                if (data.success) {
//                    $(parent).children('ul').children('#attributes').prop("required",true);
//                    $(parent).children('ul').children('.attributes').show();
//                } else {
//                    $(parent).children('ul').children('#attributes').prop("required",false);
//                    $(parent).children('ul').children('.attributes').hide(); 
//                }
//            }
//        });
//    };
    
    /**
     * Fuction to save location
     * 
     * @author ranjan
     */
    $("#save-location").click(function ( e ) {
        $('#error-msg').hide();
        $('.error-msg-store').hide();
        $('#name').removeClass('error-msg-location');
        $('#storeName').removeClass('error-msg-location');
        $('#address').removeClass('error-msg-location');
        $('#contact').removeClass('error-msg-location');
        $.ajax({
            url : "/location/saveLocation",
            type : "POST",
            data : {
                name : $('#name').val(),
                storeName : $('#storeName').val(),
                address : $('#address').val(),
                contact : $('#contact').val(),
                country : $('#country').val(),
                defaultLocation : $('#defaultLocation').val()
            },
            success : function ( data ) {
                if (data.errors) {
                    $.each(data.errors, function ( index, item ) {
                        $('#error-msg').show();
                        var message = item.field;
                        if (message === 'name') {
                            $('#name').addClass('error-msg-location');
                        }
                        if (message === 'address') {
                            $('#address').addClass('error-msg-location');
                        }
                        if (message === 'contact') {
                            $('#contact').addClass('error-msg-location');
                        }
                        if (message === 'storeName') {
                            $('#error-msg').hide();
                            $('.error-msg-store').show();
                            $('#storeName').addClass('error-msg-location');
                        }
                        
                    });
                } else {
                    $("#dialog-box-location").dialog('close');
                    location.reload();
                }
            },
        });
    });
    
    // to close the dialog box.
    $("#cancel-location").click(function () {
        $('#error-msg').hide();
        $('#name').removeClass('error-msg-location');
        $('#storeName').removeClass('error-msg-location');
        $('#contact').removeClass('error-msg-location');
        $('#address').removeClass('error-msg-location');
        $("#dialog-box-location").dialog('close');
    });
    
    // $("#category option:last").on('click',function () {
    // $("#dialog-box-category").dialog();
    // });
    $("#cancel-category").click(function () {
        $('.error-msg').hide();
        $('#categoryName').removeClass('error-msg-category');
        $("#dialog-box-category").dialog('close');
    });
    
    /**
     * Method to save category from style page
     * 
     * @author ranjan
     */
    $("#save-category").click(function () {
        $('.error-msg').hide();
        $('#categoryName').removeClass('error-msg-category');
        $.ajax({
            url : "/category/saveCategory",
            type : "POST",
            data : {
                categoryName : $('#categoryName').val(),
                parentCategory : $('#parentCategory').val()
            },
            success : function ( data ) {
                if (data.errors) {
                    $(".error-msg").show();
                    $('#categoryName').addClass('error-msg-category');
                } else {
                    $("#dialog-box-category").dialog('close');
                    $('#category').append($('<option>', {
                        value : data.id,
                        text : data.categoryName,
                        selected : true
                    }));
                }
            },
        });
        
    });
    
    $("#image-id").change(function () {
        readURL(this);
    });
    
    /**
     * Function to read URL of image for preview
     * 
     * @author ranjan
     */
    function readURL ( input ) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function ( e ) {
                $('#img-id-src').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    
});

function hideSizeField(){
    if($(this).is(":checked")){
        $(".color-select-box").prop("required",false);
        $(".color").hide();
//        $("#uom").prop("required",false);
//        $(".uom").hide();
        $(".attribute-select-box").prop("required",false);
        $(".attributes").hide();
    }else{
        $(".color-select-box").prop("required",true);
//        $("#uom").prop("required",true);
//        $(".uom").show(); 
        $(".color").show();
        $(".attribute-select-box").prop("required",true);
        $(".attributes").show();
    }
}
