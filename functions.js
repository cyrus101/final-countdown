function updateTotals(ldate)
{
	var minusdays, workingdays, currentday, leavingday, tmpdate, currentdate, leavingdate, holarr, wfharr, officedays = 0;
	
	//Grab today's date, set the date for leaving. note: extra formatting to remove time
	tmpdate = new Date();	
	currentdate = new Date(tmpdate.toDateString());
	leavingdate = new Date(ldate); //e.g. "24 December 2012"
			
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
        //Known holiday dates - add in the format new Date("3 February 2014")
        holarr = new Array();
        
        //For each holiday date, if it's within the current date to leaving date band, remove a working day
        for (var i = 0; i < holarr.length; i++) {
            console.log(holarr[i]);
            if(checkDates(currentdate,leavingdate,holarr[i]) == true) {
                minusdays++;
            }
        }
		
		//Final calculation of number of working days left
		workingdays = daysleft - minusdays;
		
        
		//Calculate the number of days to be spent travelling in to London
        //Known working from home dates - add in the format new Date("3 February 2014")     
        wfharr = new Array();
        
        //Use this if you're starting from days in the office as standard
        officedays = workingdays;
        
        //For each wfh day, it's one less on the total london count
        for (var i = 0; i < wfharr.length; i++) {
            console.log(holarr[i]);
            if(checkDates(currentdate,leavingdate,wfharr[i]) == true) {
                officedays--;
            }
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

//Start calculating
document.addEventListener('DOMContentLoaded', function() {
	updateTotals("28 February 2014");
});
