$(document).ready(function () {
    var addButton = $("#add-transaction-field");
    var addProduction = $("#add-production-field");
    
    $('.page-loading').hide();
    
    $( "#transactionDate" ).datepicker( "setDate", new Date());
    
    $("input").focus(function () {
        $(this).select();
    });
    
    $(".error-message").hide();
    
    /**
     * This function is used to hide the discount field when the document loads.
     * 
     * @author Dipak Thapa
     */
    if ($('.status').val() == 'OUT') {
        if ($("#isWarehouse").val() === 'true') {
            $(".unitSellPrice-field").prop("required", false);
            $(".unitSellPrice").hide()
            $('.discount-field').hide();
        } else {
            $(".unitSellPrice-field").prop("required", true);
            $(".unitSellPrice").show()
            $('.discount-field').show();
        }
        $("#store").prop("required", true);
        $(".store").show();
        $(".unitCostPrice-field").prop("required", false);
        $('.unitCostPrice').hide();
        $('.customer').show();
    } else if ($('.status').val() == 'IN') {
        $("#store").prop("required", false);
        $(".store").hide();
        $(".unitCostPrice-field").prop("required", true);
        $('.unitCostPrice').show();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show()
        $('.discount-field').hide();
        $('.customer').hide();
    } else if ($('.status').val() == 'RETURN') {
        $(".customer").show();
        $(".unitCostPrice-field").prop("required", false);
        $(".unitCostPrice").hide();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show();
        $(".discount-field").hide();
    } else {
        $("#store").prop("required", false);
        $(".store").hide();
        $(".unitCostPrice-field").prop("required", false);
        $(".unitCostPrice").hide();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show();
        $(".customer").hide();
        $(".discount-field").hide();
    }
    
    /**
     * This function is used to make an ajax call to retrieve customer data and
     * fill the sizes field.
     */
    // $(document).on('change',"#customer",function(){
    // $.ajax({
    // type : "POST",
    // url : "/transaction/getCustomerInfo",
    // success : function ( data ) {
    // if(data.success){
    //                  
    //    
    // }
    //        
    // });
    // });
    $(document).on('change', "#style", function () {
        var check = checkAccessories($(this).val(), $(this).closest('.transaction-fields'));
        if ($('#status').val() == 'OUT' || $('#status').val() == 'RETURN' ) {
            checkStyleAndColorValues($(this).closest('.transaction-fields'), check);
        }
    });
    
    $(document).on('change', "#attributes", function () {
        if ($('#status').val() == 'OUT' || $('#status').val() == 'RETURN' ) {
            checkStyleAndColorValues($(this).closest('.transaction-fields'), false);
        }
    });
    
    $(document).on('change', "#color", function () {
        if ($('#status').val() == 'OUT' || $('#status').val() == 'RETURN' ) {
            checkStyleAndColorValues($(this).closest('.transaction-fields'), false);
        }
    });
    
    function checkStyleAndColorValues ( parent, isAccessory ) {
        if (isAccessory) {
            var style = $(parent).contents("ul").contents("li.style").contents("div").contents("#style").val();
            showCostPrice(parent, style, color, size, isAccessory);
        } else {
            var style = $(parent).contents("ul").contents("li.style").contents("div").contents("#style").val();
            var color = $(parent).contents("ul").contents("li.color").contents("div").contents("#color").val();
            var size = $(parent).contents("ul").contents("li.attributes").contents("div").contents("#attributes").val();
            if (color && style && size) {
                showCostPrice(parent, style, color, size, isAccessory);
            }
        }
    }
    
    /**
     * Function used to display the transaction view on clicking add button
     * 
     * @author Dipak Thapa <dipakthapa@lftechnology.com>
     */
    $(addButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        showGif();
        $.ajax({
            type : "POST",
            url : "/transaction/getTransactionView",
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + '<ul><li class="clearfix sep"></li></ul>' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            },
            complete : function () {
                showGif();
            }
        });
    });
    
    /**
     * Function used to display the production view on clicking add button
     * 
     * @author Dipak Thapa <dipakthapa@lftechnology.com>
     */
    $(addProduction).off('click').on('click', function ( e ) {
        e.preventDefault();
        showGif();
        $.ajax({
            type : "POST",
            url : "/transaction/getProductionView",
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + '<ul><li class="clearfix sep"></li></ul>' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            },
            complete : function () {
                showGif();
            }
        });
        return false;
    });
    
    function checkAccessories ( style, parent ) {
        var isAccessories = false;
        showGif();
        $.ajax({
            type : "POST",
            async : false,
            url : "/transaction/checkStyle",
            data : {
                style : style
            },
            success : function ( data ) {
                if (data.success) {
                    $(parent).contents("ul").contents("li.color").contents("div").contents("#color").prop("required", false);
                    $(parent).contents("ul").contents("li.color").hide();
                    $(parent).contents("ul").contents("li.attributes").contents("div").contents("#attributes").prop("required", false);
                    $(parent).contents("ul").contents("li.attributes").hide();
                    isAccessories = true;
                } else {
                    $(parent).contents("ul").contents(".style").next(".color").remove();
                    $(parent).contents("ul").contents(".style").next(".attributes").remove();
                    $(parent).contents("ul").contents(".style").after(data);
                    isAccessories = false;
                }
            },
            complete : function () {
                showGif();
            }
        });
        return isAccessories;
    }
    
    /**
     * This function is used to change the status of the quantity field to read
     * only if the status is changed to IN.
     * 
     * @author Ranjan Baral
     */
    $(".status-edit").change(function () {
        if ($('.status-edit').val() == 'IN') {
            $('#quantity').prop("readonly", true);
        } else {
            $('#quantity').prop("readonly", false);
        }
    });
    
    /**
     * This function calls the removeDiscountField function when the status
     * value changes.
     * 
     * @author Dipak Thapa
     */
    $(".status").change(function () {
        removeDiscountField();
    });
    
    function showAttributes ( val, parent ) {
        showGif();
        $.ajax({
            type : "POST",
            url : "/transaction/checkUomValue",
            data : {
                value : val
            },
            success : function ( data ) {
                if (data.success) {
                    $(parent).children('ul').children('#attributes').prop("required", true);
                    $(parent).children('ul').children('.attributes').show();
                    $(parent).children('ul').children('.attributes-save-action').show();
                } else {
                    $(parent).children('ul').children('#attributes').prop("required", false);
                    $(parent).children('ul').children('.attributes').hide();
                    $(parent).children('ul').children('.attributes-save-action').hide();
                }
            },
            complete : function () {
                showGif();
            }
        });
    }
    ;
    
    function showCostPrice ( parent, style, color, size, isAccessory ) {
        showGif();
        $.ajax({
            type : "POST",
            url : "/transaction/getCostPrice",
            data : {
                style : style,
                color : color,
                size : size,
                isAccessory : isAccessory
            },
            success : function ( data ) {
                if (data.success) {
                    var unitCostPrice = $(parent).contents("ul").contents("li.unitCostPrice").contents("div").contents("#unitCostPrice");
                    var unitSellPrice = $(parent).contents("ul").contents("li.unitSellPrice").contents("div").contents("#unitSellPrice");
                    var quantity = $(parent).contents("ul").contents("li.quantity").contents("div").contents("#quantity");
                    $(unitCostPrice).val(data.unitCostPrice);
                    $(unitSellPrice).val(data.unitSellPrice);
                    console.log(quantity);
                    $(quantity).prop("max", data.maxQuantity);
                    $(".error-message").hide();
                } else {
                    $(".error-message li").text("");
                    $(".error-message").show();
                    $(".error-message li").append(data.message);
                }
            },
            complete : function () {
                showGif();
            }
        });
    }
});

/**
 * This function is used to remove the discount field from the form if the
 * transaction status is not OUT.
 * 
 * @author Dipak Thapa
 */
function removeDiscountField () {
    if ($('.status').val() == 'OUT') {
        if ($("#isWarehouse").val() === 'true') {
            $(".unitSellPrice-field").prop("required", false);
            $(".unitSellPrice").hide()
            $('.discount-field').hide();
        } else {
            $(".unitSellPrice-field").prop("required", true);
            $(".unitSellPrice").show()
            $('.discount-field').show();
        }
        $("#store").prop("required", true);
        $(".store").show();
        $(".unitCostPrice-field").prop("required", false);
        $('.unitCostPrice').hide();
        $('.customer').show();
    } else if ($('.status').val() == 'IN') {
        $("#store").prop("required", false);
        $(".store").hide();
        $(".unitCostPrice-field").prop("required", true);
        $('.unitCostPrice').show();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show()
        $('.discount-field').hide();
        $('.customer').hide();
    } else if ($('.status').val() == 'RETURN') {
        $(".customer").show();
        $(".unitCostPrice-field").prop("required", false);
        $(".unitCostPrice").hide();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show()
        $(".discount-field").hide();
    } else {
        $("#store").prop("required", false);
        $(".store").hide();
        $(".unitCostPrice-field").prop("required", false);
        $(".unitCostPrice").hide();
        $(".unitSellPrice-field").prop("required", true);
        $(".unitSellPrice").show();
        $(".customer").hide();
        $(".discount-field").hide();
    }
};

function hideAttributes () {
    $('#attributes').prop("required", false);
    $('.attributes').hide();
    $('.attributes-save-action').hide();
};

function focusFields () {
    $("input").focus(function () {
        $(this).select();
    });
}

function showGif () {
    $('.page-loading').toggle();
}
