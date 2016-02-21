$(document).ready(function () {
    var addButton = $("#add-expense");
    
    $('.page-loading').hide();
    
//    $(".datepicker3").datepicker().datepicker("setDate", new Date());
    
    $(addButton).on('click', function ( e ) {
        e.preventDefault();
        showGif();
        $.ajax({
            async:false,
            type : "POST",
            url : "/expense/getExpenseView",
            success : function ( data ) {
                $('.transaction-fields:last').after('<div class="transaction-fields" >' + '<ul><li class="clearfix sep"></li></ul>' + data + '<a href="#" class="attribute-remove-field"><i class="fa fa-times"></i></a>' + '</div>');
            },
            complete: function(){
                showGif();
            }
        });
    });
    
});

function showGif () {
    $('.page-loading').toggle();
}

