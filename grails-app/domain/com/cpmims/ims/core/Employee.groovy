package com.cpmims.ims.core

import java.util.Date;

import org.grails.databinding.BindingFormat

class Employee extends User{

	String firstName
	String middleName
	String lastName
	@BindingFormat('dd/MM/yyyy')
	Date dateofBirth
	@BindingFormat('dd/MM/yyyy')
	Date joinDate
	EmployeeStatus employeeStatus = EmployeeStatus.Permanent
	Gender gender
	MaritialStatus maritialStatus = MaritialStatus.Single
	Employee supervisor
	String mobilePhone
	String homePhone
	String permanentAddress
	String temporaryAddress
	Date resignedDate
	BloodGroup bloodGroup
	static constraints = {
		firstName(matches: "[a-zA-Z]+")
		middleName(blank:true, nullable:true)
		lastName(matches: "[a-zA-Z]+")
		gender()
		dateofBirth(max: new Date(), min : new Date().minus(30000))
		joinDate()
		employeeStatus()
		maritialStatus()
		supervisor(blank:true, nullable:true)
		mobilePhone(blank:true, nullable:true)
		homePhone(blank:true, nullable:true)
		permanentAddress()
		temporaryAddress(blank:true, nullable:true)
		resignedDate(blank:true, nullable:true)
		bloodGroup(blank:true, nullable:true)
	}

	// audit fields
	Date dateCreated
	Date lastUpdated

	// set auditable true
	static auditable = true

	enum MaritialStatus {
		Single("S"),Married("M")

		private final String value

		MaritialStatus(String value) {
			this.value = value
		}
		String toString(){
			value
		}
		String getId() {
			value
		}
	}

	enum Gender {
		Male("M"),FEMALE("F")
		private final String value
		Gender(String value) {
			this.value = value
		}
		String toString(){
			value
		}
		String getId() {
			value
		}
	}

	enum EmployeeStatus {
		Permanent("P"),Temporary("T"),Resignee("R")
		private final String value
		EmployeeStatus(String value) {
			this.value = value
		}
		String toString(){
			value
		}
		String getId() {
			value
		}
	}

	enum BloodGroup{
		ANegative("A-"), APositive("A+"), BPositive("B+"),BNegative("B-"),ABPositive("AB+"),ABNegative("AB-"),OPositive("O+"),ONegative("O-")
		private final String value
		BloodGroup(String value) {
			this.value = value
		}
		String toString(){
			value
		}
		String getId() {
			value
		}
	}

	String toString(){
		firstName+' '+(middleName?(middleName+' '):'')+lastName
	}
}
