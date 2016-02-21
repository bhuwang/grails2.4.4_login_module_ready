package com.cpmims.ims.core


class DateFormatTagLib {
    static defaultEncodeAs = 'html'
    //static encodeAsForTags = [tagName: 'raw']

    /**
     * Date format in the following format.
     * yyyy/MM/dd -> "2015/01/12"
     * @author bhuwan
     */
    def yearMonthDay = {attrs ->
        def date = attrs.date
        def format = 'yyyy/MM/dd'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Date format in the following format.
     * dd MMM yyyy -> "12 Jan 2015"
     * @author bhuwan
     */
    def dayMonthYear = {attrs ->
        def date = attrs.date
        def format = 'dd MMM yyyy'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Date format in the following format.
     * MMM dd -> "Jan 12"
     * @author bhuwan
     */
    def monthDay = {attrs ->
        def date = attrs.date
        def format = 'MMM dd'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Format the date in Month Date, Year
     * E.g: Oct 26, 2015
     * @author Bhuwan
     */
    def monthDateYear={attrs ->
        def date = attrs.date
        def format = 'MMM dd, yyyy'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Date format in the following format.
     * "yyyy MM dd, HH:mm" -> "2015 05 25, 07:46"
     * @author sanjib<sanjibmaharjan@lftechnology.com>
     */
    def dateTime = {attrs ->
        def date = attrs.date
        def format = 'yyyy MM dd, HH:mm'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Date format in the following format.
     * MM/dd/yyyy -> "06/24/2015"
     * @author shrijana
     */
    def monthDayYearWithSlash = {attrs ->
        def date = attrs.date
        def format = 'MM/dd/yyyy'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * Date format in the following format.
     * dd/MM/yyyy -> "14/04/2015"
     * @author bibhushan<bibhushanjoshi@lftechnology.com>
     */
    def dayMonthYearSeparatedBySlash = {attrs ->
        def date = attrs.date
        def format = 'dd/MM/yyyy'
        out << g.formatDate(date:date,format:format)

    }

    /**
     * Date format in the following format.
     * yyyy -> "2015"
     * @author bhuwan<bhuwangautam@lftechnology.com>
     */
    def year = {attrs ->
        def date = attrs.date
        def format = 'yyyy'
        out << g.formatDate(date:date,format:format)
    }

    /**
     * returns the month for corresponding number.
     * Eg 1 -> "January"
     * @author sanjib<sanjibmaharjan@lftechnology.com>
     */
    def numberToMonth = {attrs ->
        def monthList=[
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        def month = attrs.month?.isInteger()?attrs.month?.toInteger():null
        def resultMonth=(month&&month>0&&month<13)?monthList.get(month-1):''
        out << resultMonth
    }
}
