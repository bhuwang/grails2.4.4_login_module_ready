package com.cpmims.ims.core

import grails.plugin.springsecurity.annotation.Secured;

@Secured(["IS_AUTHENTICATED_ANONYMOUSLY"])
class IndexController {

	def springSecurityService
	def index() {
		log.debug("Inside IndexController#index method")
		if(springSecurityService.currentUser){
			redirect controller:'Dashboard'
		}
		else{
			redirect controller:'login',action:'auth'
		}
	}
}
