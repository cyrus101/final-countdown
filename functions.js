function updateTotals() {
	
	//Grab today's date, set the date for leaving
	var currentdate = new Date();	
	var leavingdate = new Date("24 December 2012");
		
	//Calculate the number of days left
	var daysleft = daysBetween(currentdate, leavingdate);
		
	//Calculate the number of working days (take out holiday)
	//TODO
	//Known holiday dates:
	/*
		var hol1 = new Date("23 November 2012");
		var hol2 = new Date("30 November 2012");
		var hol3 = new Date("3 December 2012");
		var hol4 = new Date("4 December 2012");
		var hol5 = new Date("5 December 2012");
		var hol6 = new Date("6 December 2012");
		var hol7 = new Date("7 December 2012");
		var hol8 = new Date("10 December 2012");
		
		Put these into an array?
	*/
	
	//Calculate the number of days to be spent in  the office
	//TODO
	
	document.getElementById('countdown-all').innerHTML = daysleft;
	document.getElementById('countdown-working').innerHTML = daysleft;
	document.getElementById('countdown-office').innerHTML = daysleft;
}

function daysBetween(date1, date2) {

    // CONSTANT - number of milliseconds in one day
    var ONEDAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);
    
    // Convert back to days and return - +1 is to make it inclusive of last day
    return (Math.round(difference_ms/ONEDAY)+1);

}

document.addEventListener('DOMContentLoaded', function() {
	updateTotals();
});