<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><g:message code='login.forgot.password.title' default="Forgot Password" /></title>
<asset:stylesheet src="layout.css" />
<asset:stylesheet src="materialize.css" />
<asset:stylesheet src="style.css" />
<asset:stylesheet src="custom.css" />
</head>
<body>
	<div class="loader page-loading hide">
		<div class="preloader-wrapper big active">
			<div class="spinner-layer spinner-blue-only">
				<div class="circle-clipper left">
					<div class="circle"></div>
				</div>
				<div class="gap-patch">
					<div class="circle"></div>
				</div>
				<div class="circle-clipper right">
					<div class="circle"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- main wrapper -->
	<div class="main-wrapper">
		<div class="page login">
			<div class="main container">
				<div class="login-content row">
					<div class="logo">
						<h1>Forgot Password</h1>
					</div>
					<div class="global-form-wrapper form-login z-depth-1 shadow-demo">
						<g:if test="${flash.message}">
							<div class="message success-message" role="status">
								${flash.message}
							</div>
						</g:if>
						<g:if test="${flash.error}">
							<div class="message error-message">
								${flash.error}
							</div>
						</g:if>
						<g:form action='forgotPassword' name="forgotPasswordForm" id="forgotPasswordForm" autocomplete='off'>
							<g:if test='${emailSent}'>
								<br />
								<g:message code='spring.security.ui.forgot.password.sent' />
							</g:if>
							<g:else>
								<ul>
									<li>
										<div class="input-field">
											<input type="email" name="username" id="username" class="validate"/>
											<label for="username">
												<g:message code='login.email' default="E-mail" />
											</label>
										</div>
									</li>
									<li>
										<button id="forgot-password-submit" class="btn waves-effect waves-light btn-block s2ui_hidden_button" type="submit">
											<g:message code='forgot.password.reset_password_btn' default="FORGOT PASSWORD" />
										</button>
									</li>
								</ul>
							</g:else>
						</g:form>
					</div>
					<div class="create-account">
						<g:link class="back-to-login" controller="login" action="auth" title="Back to Login">
							<g:message code='forgot.password.back_to_login' default="Back to Login" />
						</g:link>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- jQuery  -->
	<asset:javascript src="jquery-1.11.1.js" />
	<asset:javascript src="jquery.validate.min.js" />
	<asset:javascript src="materialize.js" />
	<asset:javascript src="init.js" />
	<asset:javascript src="login.js" />
</body>
</html>
