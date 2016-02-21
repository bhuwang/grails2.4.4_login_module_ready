<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><g:message code='reset.password.title' default="IMS :: RESET PASSWORD" /></title>

<asset:stylesheet src="layout.css" />
<asset:stylesheet src="materialize.css" />
<asset:stylesheet src="style.css" />
<asset:stylesheet src="custom.css" />
</head>

<body>
	<div class="loader page-loading hide" id="block-ui-loader">
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
						<h1>
							<g:message code="reset.password" />
						</h1>
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
						<g:form action='resetPassword' name='resetPasswordForm' autocomplete='off'>
							<g:hiddenField name='t' value='${token}' />
							<p class="password-msg">
								<span>*</span>
								<g:message code="command.password.error.strength" />
							</p>
							<ul>
								<li>
									<div class="input-field">
										<g:passwordField name="password2" id="password2" class="validate" value="${command?.password2}" bean="${command}" />
										<label for="password2">
											<g:message code='reset.password.label.password' />
										</label>
									</div>
								</li>
								<li>
									<div class="input-field">
										<s2ui:passwordFieldRow name='password' labelCode='resetPasswordCommand.password.label' bean="${command}"
											labelCodeDefault='Re-type Password' value="${command?.password}" class="validate" />
									</div>
								</li>
								<li>
									<button class="btn waves-effect waves-light btn-block" type="submit" id="forgot-password-submit">
										<g:message code='reset.password.confirm' default="CONFIRM" />
									</button>
								</li>
							</ul>
						</g:form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- jQuery  -->
	<asset:javascript src="jquery-1.11.1.js" />
	<asset:javascript src="materialize.js" />
	<asset:javascript src="init.js" />
	<asset:javascript src="login.js" />
</body>
</html>
