var lastGroupId;

/**Displays how much you've made in the last 10 minutes
//Will display "10 minutes hasn't passed since last restart" if nothing has happened in the last 10 minutes**/
function getSubmissionDisplay() {

	var newStorage = JSON.parse(localStorage["SUBMIT CHECKER HITS"]);
	//console.log("testing");
			
	var lastVisitTime;
	var total10 = 0;
	var total30 = 0;


	
	
	newStorage.sort(function(a,b){return b.time-a.time});
	
	updateHitsAmount(newStorage);
		
	if(newStorage[0])
	{
		lastGroupId = newStorage[0].groupId;
	}
	//console.log(newStorage);

	var showStr = "";
	var showStr10 = false;

	//console.log("hereio");
	var resetTime = localStorage["SUPER AWESOME RESET TIME"]////.getTime();
	//console.log(localStorage["SUPER AWESOME RESET TIME"]);
	
	resetTime = "" +((new Date).getTime() - resetTime)/1000/60;
	
	//console.log(restTime);
	
	if(resetTime < 10)
	{
		timeLeft = new String("" + 10 - resetTime);
		showStr10 = "Recording: " + timeLeft.substring(0,4) + " mins left.";
	}
	
	
	for(i in newStorage)
	{
		lastVisitTime = newStorage[i].time;
		if(resetTime > lastVisitTime){
				continue;
			}
		lastVisitTime = (new Date()).getTime() - lastVisitTime;
		lastVisitTime = lastVisitTime/1000/60;
		if(newStorage[i].groupId != lastGroupId) {
				continue;
			}
		if(lastVisitTime > 30)
		{
			console.log("removed a visit: expired");
			newStorage.splice(i,1);
			continue;
		}
		
		if(lastVisitTime < 10)
		{
			total10++;
		}
		total30++;
	}
	console.log(lastVisitTime);
	console.log(localStorage["SUPER AWESOME CENTS AMOUNT"]);
	
	var hour10 = (Math.round((total10/10*60*localStorage["SUPER AWESOME CENTS AMOUNT"])*100))/100;
	//hour10 = new String(hour10).substr(0,4);

	var hour30 = (Math.round((total30/30*60*localStorage["SUPER AWESOME CENTS AMOUNT"])*100))/100;
	//hour30 = new String(hour30).substr(0,4);
	

	console.log(hour10);
	
	if(!showStr10)
	{
		showStr = "10 Min: $" + hour10 + "/hr, " + total10 + " submissions <br />" +  
				"30 Min: $" + hour30 + "/hr, " + total30 + " submissions";  
	}
	else
	{
		showStr = showStr10+"<br />" +
				"30 Min: $" + hour30 + "/hr, " + total30 + "submissions";  
	}
	return showStr;
}

function updateHitsAmount(newStorage) {
		console.log("entered new storage function");
		if(newStorage && newStorage[0])
		{
			console.log("entered new storage if clause");
			//console.log(newStorage[0]);
			localStorage["SUPER AWESOME CENTS AMOUNT"] = "" + newStorage[0].reward*1;
			//console.log("updated cents amount");
		}
		else
		{
			localStorage["SUPER AWESOME CENTS AMOUNT"] = "0";
		}
	}

document.addEventListener('DOMContentLoaded', function() {
	if(!localStorage["SUPER AWESOME RESET TIME"])
		localStorage["SUPER AWESOME RESET TIME"] = "" + (new Date()).getTime();
	if(!localStorage["SUPER AWESOME CENTS AMOUNT"])
		localStorage["SUPER AWESOME CENTS AMOUNT"] = "0";
	if(!localStorage["SUBMIT CHECKER HITS"] || localStorage["SUBMIT CHECKER HITS"] == "null")
		localStorage["SUBMIT CHECKER HITS"] = JSON.stringify(new Array());
	
	console.log("reset time, cents amount, submit checker:");
	console.log(localStorage["SUPER AWESOME RESET TIME"]);
	console.log(localStorage["SUPER AWESOME CENTS AMOUNT"]);
	console.log(localStorage["SUBMIT CHECKER HITS"]);
	
	var body = document.getElementById("w00t");
	var bodyText = getSubmissionDisplay()
	body.innerHTML=bodyText + "<br />";
	
		
	var centReset = document.createElement("input");
	centReset.type = "button";
	centReset.style.width = "25%";
	centReset.value = "Reset";
	document.body.appendChild(centReset);
	centReset.onclick = function() {
			if(localStorage["SUBMIT CHECKER HITS"]) {
				localStorage["SUBMIT CHECKER HITS"] = JSON.stringify(new Array());
			}
		}

	var timeButton = document.createElement("input");
	timeButton.type ="button";
	timeButton.style.width = "35%";
	timeButton.value = "10 Minute Timer";
	document.body.appendChild(timeButton);
	timeButton.onclick = function() { 
		chrome.extension.sendMessage({recording10: "true"},
		   function (response) {
        });
      };
     
    var timeButton30 = document.createElement("input");
	timeButton30.type ="button";
	timeButton30.style.width = "35%";
	timeButton30.value = "30 Minute Timer";
	document.body.appendChild(timeButton30);
	timeButton30.onclick = function() { 
		chrome.extension.sendMessage({recording30: "true"},
		   function (response) {
        });
      };
});


