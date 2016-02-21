$(document).ready(function () {
    var deleteButton = $(".delete-alert");
    var unreadCheckbox = $("#unread-select-all");
    var readCheckbox = $("#read-select-all");
    
    var deleteRead = $("#delete-read-alerts");
    var deleteUnread = $("#delete-unread-alerts");
    var markUnread = $("#mark-as-unread");
    var markRead = $("#mark-as-read");
    
    var readCheckboxes = $(".read-mark-checkbox");
    var unreadCheckboxes = $(".unread-mark-checkbox");
    
    $(".alert-unread-options").hide();
    $(".alert-read-options").hide();
    
    $(readCheckboxes).on('change', function () {
        var checked = false;
        var unchecked=0;
        for (var i = 0; i < readCheckboxes.length; i++) {
            if ($(readCheckboxes[i]).is(":checked")) {
                $(".alert-read-options").show();
                checked = true;
                break;
            }else{
                unchecked++;
            }
        }
        if (!checked) {
            $(".alert-read-options").hide();
        }
        if(unchecked == readCheckboxes.length){
            $(readCheckbox).prop('checked', false);
        }
    });
    
    $(unreadCheckboxes).on('change', function () {
        var checked = false;
        var uncheckCount=0;
        for (var i = 0; i < unreadCheckboxes.length; i++) {
            if ($(unreadCheckboxes[i]).is(":checked")) {
                $(".alert-unread-options").show();
                checked = true;
                break;
            }else{
                uncheckCount++; 
            }
        }
        if (!checked) {
            $(".alert-unread-options").hide();
        }
        if(uncheckCount == unreadCheckboxes.length){
            $(unreadCheckbox).prop('checked', false);
        }
    });
    
    $(deleteRead).on('click', function ( event ) {
        event.preventDefault();
        var url = "/alert/deleteMultiple";
        var checkedBoxes = $(".read-mark-checkbox");
        changeStatus(url, checkedBoxes);
    });
    
    $(deleteUnread).on('click', function ( event ) {
        event.preventDefault();
        var url = "/alert/deleteMultiple";
        var checkedBoxes = $(".unread-mark-checkbox");
        changeStatus(url, checkedBoxes);
    });
    
    $(markUnread).on('click', function ( event ) {
        event.preventDefault();
        var url = "/alert/changeAlertStatusUnread";
        var checkedBoxes = $(".read-mark-checkbox");
        changeStatus(url, checkedBoxes);
    });
    
    $(markRead).on('click', function ( event ) {
        event.preventDefault();
        var url = "/alert/changeAlertStatusRead";
        var checkedBoxes = $(".unread-mark-checkbox");
        changeStatus(url, checkedBoxes);
    });
    
    function changeStatus ( url, checkedBoxes ) {
        var alerts = [];
        var index = 0;
        for (var i = 0; i < checkedBoxes.size(); i++) {
            if ($(checkedBoxes[i]).is(":checked")) {
                alerts[index++] = $(checkedBoxes[i]).parent().prev().children().val();
            }
        }
        if (alerts.length > 0) {
            $.ajax({
                type : "POST",
                url : url,
                data : {
                    alertIds : JSON.stringify(alerts),
                },
                success : function ( data ) {
                    window.location.reload();
                }
            });
        }
    }
    
    $(unreadCheckbox).on('click', function () {
        if ($(unreadCheckbox).is(":checked")) {
            $(".alert-unread-options").show();
            $(".unread-mark-checkbox").prop('checked', true);
        } else {
            $(".alert-unread-options").hide();
            $(".unread-mark-checkbox").prop('checked', false);
        }
    });
    
    $(readCheckbox).on('click', function () {
        if ($(readCheckbox).is(":checked")) {
            $(".alert-read-options").show();
            $(".read-mark-checkbox").prop('checked', true);
        } else {
            $(".alert-read-options").hide();
            $(".read-mark-checkbox").prop('checked', false);
        }
    });
    
    $(deleteButton).on('click', function ( event ) {
        event.preventDefault();
        var url = "/alert/deleteAlert";
        var status = $(this).prev().val();
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
                            alertId : status
                        },
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
    });
    
});