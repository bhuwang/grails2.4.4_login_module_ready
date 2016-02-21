$(document).ready(function () {
    var maxFields = 10;
    var addButton = $("#add-uom-attribute");
    var x = 1;
    
    /**
     * Function used to prevent the status change btn from click event of tr
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    $('.row-click .status-btn').click(function ( e ) {
        e.stopPropagation();
    });
    
    /**
     * Function used to display the attributes view on clicking add button
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    $(addButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        if (x < maxFields) {
            jQuery.ajax({
                type : "POST",
                url : "/uom/getAttributeView",
                success : function ( data ) {
                    $('.uom-attribute:last').after('<div class="uom-attribute">' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
                }
            });
        }
    });
    
    /**
     * Used to validate positive positive integer
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    function isInteger ( n ) {
        return /^[0-9]+$/.test(n);
    }
    
    /**
     * Function used to save uom and it's attributes
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */ 
    $(".save-uom-attributes").submit(function ( e ) {
        e.preventDefault();
        var totalQty = $("#totalQty").val();
        if (!isInteger(totalQty) || totalQty == 0) {
            $(".dashboard-success-message").html('').addClass("hide");
            $(".error-message").html("Please enter number only.").removeClass("hide");
            return false;
        }
        if ($(".uom-0").val() === '' && $(".uom-1").val() === '') {
            $(".dashboard-success-message").html('').addClass("hide");
            $(".error-message").html("Please select one of the attribute field.").removeClass("hide");
            return false;
        } else {
            var uomAttributeList = [];
            var totalUomQty = 0;
            $(".uom-attribute").each(function () {
                var attributekey = [];
                var attributes = {};
                for (var i = 0; i < $(this).find("select").length; i++) {
                    var selectedSelectList = $($(this).find("select")[i]);
                    attributekey.push(selectedSelectList.val());
                }
                attributes.totalQty = $(this).find('.uom-total-quantity').val().trim();
                attributes.attribute = attributekey;
                uomAttributeList.push(attributes);
            });
            
            $('.uom-total-quantity').each(function () {
                totalUomQty += Number($(this).val());
            });
            $.ajax({
                type : "POST",
                url : "/uom/saveUomAttributes",
                data : {
                    uomData : JSON.stringify(uomAttributeList),
                    uomName : $("#uom-name option:selected").text(),
                    uomId : $("#uom-name").val(),
                    uomDescription : $(".uom-description").val(),
                    uomtotalQty : totalUomQty
                },
                success : function ( data ) {
                    if (data.success) {
                        location.href = "/uomAttribute/index";
                    } else {
                        $(".dashboard-success-message").html('').addClass("hide");
                        $(".error-message").html(data.msg).removeClass("hide");
                    }
                },
                error : function () {
                    $(".dashboard-success-message").html('').addClass("hide");
                    $(".error-message").html("Please enter unique size values for this UOM.").removeClass("hide");
                }
            });
            return false;
        }
    });
    
    /**
     * Function used to remove the uom attribute field on clicking remove option
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    $(document).on('click', '.attribute-remove-field', function ( e ) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
    
    /**
     * Gets uom popup box
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    $('#uom-name').append($('<option>', {
        value : "create",
        text : "Create Uom",
    }));
    $("select#uom-name").change(function () {
        var optionValue = $(this).val();
        if (optionValue == "create") {
        $("#uom-name-val").val("");
        $("#dialog-box").dialog();
        }
        });
    
    /**
     * Saves uom name
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    $("#save-uom-name").on("click", function () {
        $.ajax({
            url : "/uom/saveUom",
            type : "POST",
            data : {
                uomName : $('#uom-name-val').val()
            },
            success : function ( data ) {
                if (data.success) {
                    $("#dialog-box").dialog('close');
                    $('#uom-name').append($('<option>', {
                        value : data.uomId,
                        text : $('#uom-name-val').val(),
                        selected : true
                    }));
                } else {
                    $(".popup-error-message").html(data.msg).removeClass("hide");
                }
            },
            error : function () {
            }
        });
    });
    
    /**
     * Used to identify rows in a column by uom id and adds background
     * 
     * @author Alina Shakya <alinashakya@lftechnology.com>
     */
    var prevId = '';
    var currentIdentifier = 0;
    $('table#uom-attr-sort tbody').children('tr').each(function () {
        if (prevId !== this.id) {
            currentIdentifier++;
        }
        if (currentIdentifier % 2 === 0) {
            $(this).addClass('odd');
        } else {
            $(this).addClass('even');
        }
        prevId = this.id;
    });
});