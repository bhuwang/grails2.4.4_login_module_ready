$(document).ready(function () {
    var customerReportButton = $('#generate-customer-report');
    var profitReportButton = $("#generate-profit-report");
    var salesReportButton = $("#generate-sales-report");
    
    $('.page-loading').hide();
    
    var paginationButtons=$(".pull-left");
    
    $(paginationButtons).on('click', function ( e ) {
        e.preventDefault();
        showGif();
        var url=$(this).attr('href');
        console.log(url);
        showGif();
    });
    
    $(customerReportButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        showGif();
        $.ajax({
            type : "POST",
            url : "/report/generateCustomerReport",
            data : {
                customer : $('#customer').val(),
                from : $('#from').val(),
                to : $('#to').val()
            },
            success : function ( data ) {
                $('#customer-result-table').remove();
                $("#report").append(data);
            },
            complete : function () {
                showGif();
            }
        
        });
    });
    
    $(profitReportButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        showGif();
        $.ajax({
            type : "POST",
            url : "/report/generateProfitReport",
            data : {
                store : $('#store').val(),
                from : $('#from').val(),
                to : $('#to').val()
            },
            success : function ( data ) {
                $('#customer-result-table').remove();
                $("#report").append(data);
            },
            complete : function () {
                showGif();
            }
        
        });
        
    });
    
    $(salesReportButton).off('click').on('click', function ( e ) {
        e.preventDefault();
        $(".total-amount-display").remove();
        showGif();
        $.ajax({
            type : "POST",
            url : "/report/generateSalesReport",
            data : {
                store : $('#store').val(),
                from : $('#from').val(),
                to : $('#to').val()
            },
            success : function ( data ) {
                $('#customer-result-table').remove();
                $("#report").append(data);
            },
            complete : function () {
                showGif();
            }
        
        });
        
    });
    
});

function showGif () {
    $('.page-loading').toggle();
}
