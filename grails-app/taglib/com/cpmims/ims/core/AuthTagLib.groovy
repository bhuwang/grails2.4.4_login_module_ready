package com.cpmims.ims.core

/**
 * <p>This class contains closures that is used to determine the fullname ,user id and other informations of the user so that it can be rendered in html.</>
 * @author dipak
 *
 */
class AuthTagLib {
    def springSecurityService
    def fullname = {attrs ->
        def loggedInUser = (attrs?.user)?:springSecurityService.currentUser
        def userFullName = loggedInUser.firstName+' '+(loggedInUser.middleName?:"")+' '+loggedInUser?.lastName
        out << userFullName
    }

    def userId={attrs ->
        def loggedInUser = (attrs?.user)?:springSecurityService.currentUser
        def userId = loggedInUser?.id?:""
        out<<userId
    }
}
