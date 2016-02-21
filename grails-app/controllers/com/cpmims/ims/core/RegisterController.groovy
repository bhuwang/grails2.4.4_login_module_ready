package com.cpmims.ims.core

import grails.plugin.springsecurity.SpringSecurityUtils;
import grails.plugin.springsecurity.annotation.Secured;
import grails.plugin.springsecurity.authentication.dao.NullSaltSource;
import grails.plugin.springsecurity.ui.RegistrationCode;

@Secured(["IS_AUTHENTICATED_ANONYMOUSLY"])
class RegisterController extends grails.plugin.springsecurity.ui.RegisterController {

    /**
     * Forgot password functionality
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    @Override
    def forgotPassword() {
        log.debug"Inside RegisterController#forgotPassword method."
        if (!request.post) {
            // show the form
            return
        }
        
        String username = params.username
        if (!username) {
            flash.error = message(code: 'forgotPassword.enter_email')
            redirect action: 'forgotPassword'
            return
        }
        def regexStr = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        if(!username.matches(regexStr)){
            flash.error = message(code: 'forgotPassword.user.invalid_email')
            redirect action: 'forgotPassword'
            return
        }

        String usernameFieldName = SpringSecurityUtils.securityConfig.userLookup.usernamePropertyName

        def user = lookupUserClass().findWhere((usernameFieldName): username)
        if (!user) {
            flash.error = message(code: 'forgotPassword.user.notFound')
            redirect action: 'forgotPassword'
            return
        }
        def registrationCode = new RegistrationCode(username: user."$usernameFieldName")
        registrationCode.save(flush: true)

        String url = generateLink('resetPassword', [t: registrationCode.token])

        def conf = SpringSecurityUtils.securityConfig

        //email body
        def body = conf.ui.forgotPassword.emailBody
        if (body.contains('$')) {
            body = evaluate(body, [user: user, url: url])
        }
        mailService.sendMail {
            to user.username
            from conf.ui.forgotPassword.emailFrom
            subject conf.ui.forgotPassword.emailSubject
            html body.toString()
        }

        log.debug"Email sent successfully to user ${user.username}"

        [emailSent: true]
        flash.message = message(code: 'forgotPassword.email.sent')
        redirect controller:'login',action:'auth'
    }

    /**
     * Reset password functionality
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    def resetPassword(ResetPasswordCommand command) {
        log.debug"Inside RegisterController #resetPassword method."
        String token = params.t

        def registrationCode = token ? RegistrationCode.findByToken(token) : null
        if (!registrationCode) {
            flash.error = message(code: 'spring.security.ui.resetPassword.badCode')
            redirect uri: SpringSecurityUtils.securityConfig.successHandler.defaultTargetUrl
            return
        }

        if (!request.post) {
            return [token: token, command: new ResetPasswordCommand()]
        }

        command.username = registrationCode.username
        command.validate()

        if (command.hasErrors()) {
            return [token: token, command: command]
        }

        String salt = saltSource instanceof NullSaltSource ? null : registrationCode.username
        RegistrationCode.withTransaction { status ->
            String usernameFieldName = SpringSecurityUtils.securityConfig.userLookup.usernamePropertyName
            def user = lookupUserClass().findWhere((usernameFieldName): registrationCode.username)
            user.password = springSecurityUiService.encodePassword(command.password, salt)
            user.save()
            registrationCode.delete()
        }

        log.debug"Password changed successfully."
        flash.message = message(code: 'spring.security.ui.resetPassword.success')
        redirect controller:'login',action:'auth'
    }

    /**
     * Validates reset password field
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    static final resetPasswordValidator = { String password, command ->
        if (command.username && command.username.equals(password)) {
            return 'command.password.error.username'
        }

        if (command.password != command.password2) {
            return 'command.password2.error.mismatch'
        }

        if (!checkPasswordMinLength(password) ||
        !checkPasswordMaxLength(password) ||
        !checkPasswordRegex(password)) {
            return 'resetPassword.password.strength.error'
        }
    }

    /**
     * Checks password min length
     * @param password
     * @param command
     * @return
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    static boolean checkPasswordMinLength(String password) {
        def conf = SpringSecurityUtils.securityConfig

        int minLength = conf.ui.password.minLength instanceof Number ? conf.ui.password.minLength : 8

        password && password.length() >= minLength
    }

    /**
     * Checks password max length
     * @param password
     * @param command
     * @return
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    static boolean checkPasswordMaxLength(String password) {
        def conf = SpringSecurityUtils.securityConfig

        int maxLength = conf.ui.password.maxLength instanceof Number ? conf.ui.password.maxLength : 64

        password && password.length() <= maxLength
    }

    /**
     * Checks password content
     * @param password
     * @param command
     * @return
     * @author Alina Shakya<alinashakya@lftechnology.com>
     */
    static boolean checkPasswordRegex(String password) {
        def conf = SpringSecurityUtils.securityConfig

        String passValidationRegex = conf.ui.password.validationRegex ?:
                '^.*(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&]).*$'

        password && password.matches(passValidationRegex)
    }
}

/**
 * ResetPasswordCommand gets the fieldset and constraints for reset password
 * @author Alina Shakya<alinashakya@lftechnology.com>
 */
class ResetPasswordCommand {
    String username
    String password
    String password2

    static constraints = {
        username email: true
        password blank: false, validator: RegisterController.resetPasswordValidator
    }
}
