$(document).ready(function () {
    var max_fields = 10; // maximum input boxes allowed
    var wrapper = $(".add-field"); // Fields wrapper
    var add_button = $("#add-attr"); // Add button ID
    $("#value").focus();
    
    var x = 1; // initlal text box count
    var attrValuesArray = [];
    $(add_button).click(function ( e ) { // on add input button click
        e.preventDefault();
        if (x < max_fields) { // max input box allowed
            x++; // text box increment
            $(wrapper).append('<div><input type="text" id="value' + x + '" value="" required="" name="value"><a href="#" class="remove_field"><i class="fa fa-times"></i></a></div>'); // add
            $("#value" + x).focus();
            // input
            // box
        }
        var j = 0;
        $('input[type=text]', wrapper).each(function ( i, item ) {
            var attrValues = $(item).val();
            attrValuesArray[j++] = attrValues;
        });
    });
    
    $(wrapper).on("click", ".remove_field", function ( e ) { // user click on
        // remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

    /**
     * Used to save attributes
     */
    $("#save").click(function () {
        if ($('#attrVal').val().toUpperCase() == "COLOR") {
            $(".error-message").html("You cannot create attribute as Color.").removeClass("hide");
        } else {
            $.ajax({
                url : "/attribute/saveAttribute",
                type : "POST",
                data : {
                    attributeName : $('#attrVal').val()
                },
                success : function ( data ) {
                    if (data.success) {
                        $("#dialog-box").dialog('close');
                        $('#attribute-alert').append($('<option>', {
                            value : data.attrId,
                            text : $('#attrVal').val(),
                            selected : true
                        }));
                    } else {
                        $(".error-message").html(data.msg).removeClass("hide");
                    }
                    // this will be later in use
                    // $('.select-dropdown').append('<li><span>' +
                    // data.attributeName + '</span></li>');
                    // $('#attribute-alert').append('<option value="' + data.id
                    // +
                    // '>' + data.attributeName + '</option>');
                },
                error : function ( data ) {
                }
            });
        }
    });
    // to close the dialog box.
    $("#cancel").click(function () {
        $("#dialog-box").dialog('close');
    });
    
});