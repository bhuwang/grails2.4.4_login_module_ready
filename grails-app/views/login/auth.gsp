<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><g:message code="login.title" default="LOGIN PAGE" /></title>
<asset:stylesheet src="layout.css" />
<asset:stylesheet src="materialize.css" />
<asset:stylesheet src="style.css" />
<asset:stylesheet src="custom.css" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
	<!-- main wrapper -->
	<div class="main-wrapper">
		<div class="page login">
			<div class="main container">
				<div class="login-content row">
					<div class="logo">
						<h1>Please Log In</h1>
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
						<form id="login" action='${postUrl}' method='POST' autocomplete='off'>
							<ul>
								<li>
									<div class="input-field">
										<input id="email" name="j_username" type="email" class="validate">
										<label for="email">
											<g:message code="login.email" default="E-mail" />
										</label>
									</div>
								</li>
								<li>
									<div class="input-field">
										<input id="password" name="j_password" type="password" class="validate">
										<label for="password">
											<g:message code="login.password" default="Password" />
										</label>
									</div>
								</li>
								<li>
									<button class="btn waves-effect waves-light btn-block" type="submit">
										<g:message code="login.btn.login" default="Login" />
									</button>
								</li>
							</ul>
						</form>
						<div class="login-control">
							<div class="pull-right forgot">
								<span class="forgot-link">
									<g:link controller='register' action='forgotPassword'>
										<g:message code='spring.security.ui.login.forgotPassword' />
									</g:link>
								</span>
							</div>
						</div>
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