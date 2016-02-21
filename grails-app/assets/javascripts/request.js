$(document).ready(function () {
    var addButton = $("#add-request-field");
    var addResponseButtom = $('#add-response-field');
    
    $(document).on('change', "#requestTo", function () {
        getItemList($(this).val());
    });
    
    /**
     * Function used to display the request view on clicking add button
     * 
     * @author Dipak Thapa <dipakthapa@lftechnology.com>
     */
    $(addButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        $.ajax({
            type : "POST",
            url : "/request/getRequestView",
            data : {
                store : $("#requestTo").val()
            },
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + '<ul><li class="clearfix sep"></li></ul>' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            }
        
        });
        return false;
    });
    
    /**
     * Function used to display the response view on clicking add button
     * 
     * @author Dipak Thapa <dipakthapa@lftechnology.com>
     */
    $(addResponseButtom).off('click').on('click', function ( e ) {
        e.preventDefault();
        $.ajax({
            type : "POST",
            url : "/response/getResponseView",
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + '<ul><li class="clearfix sep"></li></ul>' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            }
        
        });
        return false;
    });
    
    showGif();
    
    function getItemList ( store ) {
        showGif();
        $.ajax({
            type : "POST",
            url : "/request/populateItemField",
            data : {
                store : store
            },
            success : function ( data ) {
                $(".request-item").remove();
                var quantity = $(".request-quantity");
                $(quantity).before(data);
            },
            complete : function () {
                showGif();
            }
        });
    }
});
function showGif () {
    $('.page-loading').toggle();
}