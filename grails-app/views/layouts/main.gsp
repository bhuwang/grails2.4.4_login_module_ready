<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><g:layoutTitle default="Grails" /></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<asset:stylesheet src="layout.css" />
<asset:stylesheet src="jquery-ui.css" />
<asset:stylesheet src="materialize.css" />
<asset:stylesheet src="sweet-alert.css" />
<asset:stylesheet src="menu.css" />
<asset:stylesheet src="admin-menu.css" />
<asset:stylesheet src="jquery.mCustomScrollbar.css" />
<asset:stylesheet src="style.css" />
<asset:stylesheet src="custom.css" />
<g:layoutHead />
<%
response.setHeader("Cache-Control","no-cache"); //Forces caches to obtain a new copy of the page from the origin server
response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibilit--%>
</head>
<body>
	<g:javascript>
		var init = [];
	</g:javascript>
	<div class="main-wrapper">
		<div class="page dashboard">
			<%--		//Add app-setup class with class page in case of first setup to prevent the dashboard menu to be shown --%>
			<div class="container-fluid">
				<div id="main-navbar" class="navbar navbar-inverse z-depth-1" role="navigation">
					<button type="button" id="main-menu-toggle">
						<i class="navbar-icon fa fa-bars icon"></i>
						<span class="hide-menu-text">HIDE MENU</span>
					</button>
					<div class="navbar-inner">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse">
								<i class="navbar-icon fa fa-bars"></i>
							</button>
						</div>
					</div>
					<div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
						<div>
							<div class="right clearfix">
								<ul class="nav navbar-nav pull-right right-navbar-nav">
									<li>
										<g:form url='[controller: "style", action: "search"]' id="styleSearchForm" class="style-search-form" method="get">
											<div class="ui-widget">
												<g:textField name="term" id="search-input" value="${params.term}" placeholder="Search" />
											</div>
										</g:form>
									</li>
									<li class="notification">
										<g:link controller="alert" class="notification-message" title="Notification">
											<asset:image src="icons/notification.png" alt="Notification" />
										</g:link>
									</li>
									<li class="dropdown">
										<a href="#" class="dropdown-toggle user-menu" data-toggle="dropdown">
											<span>
												<g:fullname />
											</span>
										</a>
										<ul class="dropdown-menu">
											<li>
												<g:link url="/profile/show/" title="Profile">
													<g:message code="dashboard.user.profile" default="Profile" />
												</g:link>
											</li>
											<li class="divider"></li>
											<li>
												<g:link controller="Logout">
													<i title="<g:message code="application.user.logout" default="Logout" />" class="fa fa-sign-out"></i>
													<g:message code="application.user.logout" default="Logout" />
												</g:link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div id="main-menu" role="navigation">
					<div id="main-menu-inner">
						<ul class="navigation">
							<li class="dashboard-active active">
								<g:link controller="Dashboard">
									<i title="<g:message
											code="dashboard.menu.user.dashboard" default="Dashboard" />" class="menu-icon fa fa-dashboard"></i>
									<span class="mm-text">
										<g:message code="dashboard.menu.user.dashboard" default="Dashboard" />
									</span>
								</g:link>
							</li>
							<li class="mm-dropdown">
								<a href="#">
									<i title="" class="menu-icon fa fa-bar-chart"> </i>
									<span class="mm-text"> Item One </span>
								</a>
								<ul>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item i </span>
										</g:link>
									</li>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item ii </span>
										</g:link>
									</li>
									<li id="transactions">
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item iii </span>
										</g:link>
									</li>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item iv </span>
										</g:link>
									</li>

								</ul>
							</li>
							<li class="mm-dropdown">
								<a href="#">
									<i title="" class="menu-icon fa fa-bar-chart"> </i>
									<span class="mm-text"> Item Two </span>
								</a>
								<ul>
									<li id="transactions">
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item iii </span>
										</g:link>
									</li>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Item iv </span>
										</g:link>
									</li>
								</ul>
							</li>
							<li class="mm-dropdown">
								<a href="#">
									<i title="" class="menu-icon fa fa-cog "> </i>
									<span class="mm-text">
										<g:message code="dashboard.menu.user.settings" default="Settings" />
									</span>
								</a>
								<ul>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Settings i </span>
										</g:link>
									</li>
									<li>
										<g:link controller="item" action="create">
											<i title="" tabindex="-1"></i>
											<span class="mm-text"> Settings ii </span>
										</g:link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="content-wrapper">
					<g:layoutBody />
				</div>
				<div class="footer" role="contentinfo"></div>
				<div id="spinner" class="spinner" style="display: none;">
					<g:message code="spinner.alt" default="Loading&hellip;" />
				</div>
			</div>
		</div>
	</div>
	<div id="dialog-transaction" class="modal alert-ui" title="Alert Message" style="display: none;">
		<div class="modal-content"></div>
		<div class="modal-footer"></div>
	</div>
	<!-- jQuery  -->
	<asset:javascript src="jquery-1.11.1.js" />
	<asset:javascript src="jquery-ui.js" />
	<asset:javascript src="bootstrap.min.js" />
	<asset:javascript src="admin.js" />
	<asset:javascript src="materialize.js" />
	<asset:javascript src="init.js" />
	<asset:javascript src="jquery.mCustomScrollbar.concat.min.js" />
	<asset:javascript src="application.js" />
	<g:javascript>
		init.push(function() {
			// Javascript code here
			$('#transactions').click(function(e){
			     e.preventDefault();
		})
		$('#cancel-transaction').click(function(e){
		 $('#dialog-transaction').dialog('close');
		})
		$('#ok').click(function(e){
		 $('#dialog-transaction').hide();
		})	
		})
		window.adminMenu.start(init);
		
		$(document).ready(function(){
		 // focus in the search box and selection of text in search box
    $("#search-input").focus(function () {
        $(this).select();
    });
    $("#search-input").focus();

    // Implementation of search autocomplete
    var url = '/item/search'
    $('#search-input').autocomplete({
        source: url,
        select: function (event, ui) {
            location.href = "/item/index/" + ui.item.id + "?term=" + ui.item.value
        }
    });
		});
	</g:javascript>
</body>
</html>
