package com.cpmims.ims.core

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured;

import org.springframework.security.authentication.AccountExpiredException
import org.springframework.security.authentication.CredentialsExpiredException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.LockedException
import org.springframework.security.web.WebAttributes

@Secured(["IS_AUTHENTICATED_FULLY"])
class LoginController extends grails.plugin.springsecurity.LoginController {

	/**
	 * Callback after a failed login. Redirects to the auth page with a warning message.
	 * @author Alina Shakya<alinashakya@lftechnology.com>
	 */
	@Override
	def authfail() {
		log.debug"Inside LoginController #authfail method."
		String msg = ''
		def exception = session[WebAttributes.AUTHENTICATION_EXCEPTION]
		if (exception) {
			if (exception instanceof AccountExpiredException) {
				msg = g.message(code: "springSecurity.errors.login.expired")
			}
			else if (exception instanceof CredentialsExpiredException) {
				msg = g.message(code: "springSecurity.errors.login.passwordExpired")
			}
			else if (exception instanceof DisabledException) {
				msg = g.message(code: "springSecurity.errors.login.disabled")
			}
			else if (exception instanceof LockedException) {
				msg = g.message(code: "springSecurity.errors.login.locked")
			}
			else {
				msg = g.message(code: "login.username.password.invalid")
			}
		}

		if (springSecurityService.isAjax(request)) {
			render([error: msg] as JSON)
		}
		else {
			flash.error = msg
			redirect action: 'auth', params: params
		}
	}
}
