package com.cpmims.ims.core

import grails.plugin.springsecurity.annotation.Secured;

@Secured(["IS_AUTHENTICATED_FULLY"])
class DashboardController {

	def index() {
		render view:"index"
	}
}
