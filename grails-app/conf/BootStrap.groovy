import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import com.cpmims.ims.core.Employee;
import com.cpmims.ims.core.Employee.EmployeeStatus;
import com.cpmims.ims.core.Employee.Gender;
import com.cpmims.ims.core.Employee.MaritialStatus;
import com.cpmims.ims.core.RoleConstants;
import com.cpmims.ims.core.Role;
import com.cpmims.ims.core.UserRole;

class BootStrap {

	def init = { servletContext ->
		def roleAppAdmin = Role.findOrSaveWhere(authority: RoleConstants.ROLE_ADMIN)
		def roleSiteAdmin = Role.findOrSaveWhere(authority:RoleConstants.ROLE_SITE_ADMIN)

		def appAdmin = Employee.findOrSaveWhere(username:'appadmin@gmail.com', password: 'appadmin',enabled:true,
		firstName:'Bhuwan',
		lastName:'Gautam',
		dateofBirth:new Date().minus(10000),
		joinDate:new Date().minus(10000),
		gender:Gender.Male,
		maritialStatus:MaritialStatus.Married,
		employeeStatus:EmployeeStatus.Permanent,
		mobilePhone:"9841411211",
		homePhone:"0145218",
		permanentAddress:"Pokhara - 19, Kaski, Nepal",
		temporaryAddress:"Kapan - 3, Kathmandu, Nepal")

		def siteAdmin = Employee.findOrSaveWhere(username:'siteadmin@gmail.com', password: 'siteadmin',enabled:true,
		firstName:'Prabin',
		lastName:'Poudel',
		dateofBirth:new Date().minus(10000),
		joinDate:new Date().minus(10000),
		gender:Gender.Male,
		maritialStatus:MaritialStatus.Married,
		employeeStatus:EmployeeStatus.Permanent,
		mobilePhone:"98413232323",
		homePhone:"0145218",
		permanentAddress:"Dhapasi - 1, Kathmandu, Nepal",
		temporaryAddress:"Dhapasi - 1, Kathmandu, Nepal")
		if(UserRole.count()==0){
			UserRole.findOrSaveWhere(user: appAdmin, role: roleAppAdmin)
			UserRole.findOrSaveWhere(user: siteAdmin, role: roleSiteAdmin)
		}
	}
	def destroy = {
	}
}
