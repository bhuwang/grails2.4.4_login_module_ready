/**
 * Used to set the default value for location list while creating item
 */
$(document).ready(function () {
    $('.location-select .select-dropdown').val('Select Location');
});

/**
 * Used to change the status of location
 * 
 * @author Alina Shakya<alinashakya@lftechnology.com>
 */
function changeStatus ( type, status, fieldId ) {
    var url;
    if (type === 'category') {
        url = "/category/changeStatus";
    } else if (type === 'location') {
        url = "/location/changeStatus";
    } else if (type === 'customer') {
        url = "/customer/changeStatus";
    } else if (type === 'attribute') {
        url = "/attribute/changeStatus";
    } else if (type === 'uomAttribute') {
        url = "/uomAttribute/changeStatus";
    } else if (type === 'style') {
        url = "/style/changeStatus";
    } else {
        url = "/itemManufacturer/changeStatus";
    }
    $('.settings-status-confirm').removeClass("hide");
    var dialog = $(".settings-status-confirm").dialog({
        autoOpen : false,
        modal : true,
        buttons : [ {
            text : 'Yes',
            id : 'button-accept',
            click : function () {
                jQuery.ajax({
                    type : "POST",
                    url : url,
                    data : {
                        status : status,
                        fieldId : fieldId
                    },
                    dataType : "json",
                    success : function () {
                        window.location.reload();
                    }
                });
                dialog.dialog("close");
            }
        }, {
            text : 'No',
            click : function () {
                dialog.dialog("close");
            }
        } ]
    });
    dialog.dialog('open');
}

/**
 * Datepicker to select the expiry date
 * 
 * @author Alina Shakya <alinashakya@lftechnology.com>
 */

$('.datepicker,.datepicker1').pickadate({
    selectMonths : true,
    selectYears : 3,
    format : 'dd/mm/yyyy',
    min : new Date(),
    closeOnSelect : true
});

$('.datepicker2').pickadate({
    selectMonths : true,
    selectYears : 0,
    format : 'mmmm dd',
    min : 0,
    closeOnSelect : true
});

$('.datepicker3').pickadate({
    selectMonths : true,
    selectYears : 10,
    format : 'dd/mm/yyyy',
    closeOnSelect : true
});

$(document).on("focus", ".datepicker", function () {
    $(this).pickadate({
        selectYears : 20,
        selectMonths : true,
        selectYears : 3,
        format : 'dd/mm/yyyy',
        min : new Date(),
        closeOnSelect : true
    });
});