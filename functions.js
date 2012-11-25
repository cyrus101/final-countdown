function updateTotals()
{
	var minusdays, workingdays, currentday, leavingday, officedays = 0;
	
	//Grab today's date, set the date for leaving. note: extra formatting to remove time
	var tmpdate = new Date();	
	var currentdate = new Date(tmpdate.toDateString());
	var leavingdate = new Date("24 December 2012");
			
	//Get the day of the week - note: Sunday is 0 when using .getDay(), Saturday is 6
	currentday = currentdate.getDay();
	leavingday = leavingdate.getDay();
	
	//Calendar days between two dates
	var daysleft = daysBetween(currentdate, leavingdate);
	
	//If the final day hasn't already passed, do calculations
	if (daysleft > 0)
	{
		//TAKE OUT THE NUMBER OF WEEKEND DAYS
		//Calculate the number of full weeks	
		var weeks = daysleft/7;
		weeks = Math.floor(weeks);
	
		//Every full week will have two days for weekends
		minusdays = weeks * 2;
		
		//If day of the week of start date is NOT sat and is gt day of week of end date,
		//take off two extra days (add two to the count to subtract)
		if(currentday !=6 && currentday > leavingday) {
			minusdays = minusdays + 2;
		}
		
		//If start day is a Saturday and end date is a weekday, take off an extra day
		if(currentday == 6 && (leavingday > 0 && leavingday < 6)) {
			minusdays++;
		}
		
		//If start day is a Saturday and end day is a Sunday
		if(currentday == 6 && leavingday == 0) {
			minusdays++;
		}
		
		//If start day is a Sunday and end day is a Saturday
		if(currentday == 0 && leavingday == 6) {
			minusdays++;
		}
		
		//TAKE OUT THE NUMBER OF HOLIDAY DAYS STILL UNTAKEN
		//Known holiday dates:
		var hol1 = new Date("23 November 2012");
		var hol2 = new Date("30 November 2012");
		var hol3 = new Date("3 December 2012");
		var hol4 = new Date("4 December 2012");
		var hol5 = new Date("5 December 2012");
		var hol6 = new Date("6 December 2012");
		var hol7 = new Date("7 December 2012");
		var hol8 = new Date("10 December 2012");
		
		//If these days are within the current date to leaving date band, remove a day	
		if(checkDates(currentdate,leavingdate,hol1) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol2) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol3) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol4) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol5) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol6) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol7) == true) {
			minusdays++;
		}
		if(checkDates(currentdate,leavingdate,hol8) == true) {
			minusdays++;
		}
		
		//Final calculation of number of working days left
		workingdays = daysleft - minusdays;
		
		//Calculate the number of days to be spent in  the office
		//Known office dates:
		var off1 = new Date("26 November 2012");
		var off2 = new Date("27 November 2012");
		var off3 = new Date("13 December 2012");
		var off4 = new Date("14 December 2012");
		var off5 = new Date("20 December 2012");
		var off6 = new Date("21 December 2012");
		
		if(checkDates(currentdate,leavingdate,off1) == true) {
			officedays++;
		}
		if(checkDates(currentdate,leavingdate,off2) == true) {
			officedays++;
		}
		if(checkDates(currentdate,leavingdate,off3) == true) {
			officedays++;
		}
		if(checkDates(currentdate,leavingdate,off4) == true) {
			officedays++;
		}
		if(checkDates(currentdate,leavingdate,off5) == true) {
			officedays++;
		}
		if(checkDates(currentdate,leavingdate,off6) == true) {
			officedays++;
		}
	}
	
	//Date has passed - set all to 0
	else {
		daysleft = 0;
		workingdays = 0;
		officedays = 0;
	}
	
	document.getElementById('countdown-all').innerHTML = daysleft;
	document.getElementById('countdown-working').innerHTML = workingdays;
	document.getElementById('countdown-office').innerHTML = officedays;
}

function daysBetween(date1, date2) {

    // CONSTANT - number of milliseconds in one day
    var ONEDAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds - note, wrap subtraction in Math.abs if minus days is not wanted
    var difference_ms =  date2_ms - date1_ms;
    
    // Convert back to days and return
    return (Math.round(difference_ms/ONEDAY));

}

function checkDates(start, finish, specdate) {
	//This date is within the given range
	if(daysBetween(start, specdate) > 0 && daysBetween(specdate, finish) > 0) {
		return true;
	}
	else {
		return false;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	updateTotals();
});