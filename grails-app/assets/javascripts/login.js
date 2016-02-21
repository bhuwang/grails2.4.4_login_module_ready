/**
 * Displays loader while sending reset password email
 * 
 * @author Alina Shakya <alinashakya@lftechnology.com>
 */
$('#forgot-password-submit').on('click', function() {
	if ($("form")[0].checkValidity()) {
		$('.page-loading').removeClass('hide');
	}
});
/**
 * Hides message on focus on forgot password email
 * 
 * @author Alina Shakya <alinashakya@lftechnology.com>
 */
$('#username').on('focus', function() {
	$('.message').addClass('hide');
});
/**
 * Hides message on focus on reset password fields
 * 
 * @author Alina Shakya <alinashakya@lftechnology.com>
 */
$('#resetPasswordForm input').on('focus', function() {
	$('.s2ui_error').addClass('hide');
});

$('#reset-password-submit').on('click', function() {
	if ($("form")[0].checkValidity()) {
		$('.page-loading').removeClass('hide');
	}
});