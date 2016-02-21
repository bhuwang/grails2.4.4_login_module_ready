$(document).ajaxStart(function() {
	$('#block-ui-loader').show();
});
$(document).ajaxStop(function() {
	$('#block-ui-loader').hide();
});