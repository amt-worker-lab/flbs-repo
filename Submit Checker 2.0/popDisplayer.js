var lastGroupId;

COMPUTER_ID = false;
USER_NAME = false;
UI_INITIALIZED = false;

function GM_xmlhttpRequest(details) {
	function setupEvent(xhr, url, eventName, callback) {
		xhr[eventName] = function () {
		  var isComplete = xhr.readyState == 4;
		  var responseState = {
			responseText: xhr.responseText,
			readyState: xhr.readyState,
			responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
			status: isComplete ? xhr.status : 0,
			statusText: isComplete ? xhr.statusText : "",
			finalUrl: isComplete ? url : ""
		  };
		  callback(responseState);
		};
	}

	var xhr = new XMLHttpRequest();
	var eventNames = ["onload", "onerror", "onreadystatechange"];
	for (var i = 0; i < eventNames.length; i++ ) {
		var eventName = eventNames[i];
		if (eventName in details) {
		  setupEvent(xhr, details.url, eventName, details[eventName]);
		}
	}
	xhr.timeout = details.timeout;
	xhr.ontimeout = function () {
		console.log('timeout');
	}
	xhr.open(details.method, details.url);

	if (details.overrideMimeType) {
		xhr.overrideMimeType(details.overrideMimeType);
	}
	if (details.headers) {
		for (var header in details.headers) {
		  xhr.setRequestHeader(header, details.headers[header]);
		}
	}
	xhr.send(details.data ? details.data : null);
}

/**Displays how much you've made in the last 10 minutes
//Will display "10 minutes hasn't passed since last restart" if nothing has happened in the last 10 minutes**/
function createSubmissionDisplay(callback) {
	//alert('here');
	//alert(COMPUTER_ID);
	//alert(USER_NAME);
	GM_xmlhttpRequest({
		method: 'Get',
		url: 'http://192.168.1.2/mturk/.scripts/AMT_IncomeRecords/IncomeRecords.php?GetLatest=1&UserName='+USER_NAME.trim()+'&ComputerId='+COMPUTER_ID,
		onload: function(response) {
		console.log(response.responseText);
		//alert(COMPUTER_ID);

		try {
		var iStats = JSON.parse(response.responseText);
		}
		catch(e) {
			document.body.innerText = response.responseText;
			callback();
		}
		console.log(iStats);
		
		//current job stats
		var cjStats = iStats.currentJobStats;
		
		//combined stats
		var cmbStats = iStats.combinedStats;
		
		
		//Account stats
		var momStats = iStats.allAccountStats['Mom'];
		var emStats = iStats.allAccountStats['Em'];
		var benStats = iStats.allAccountStats['Ben'];
		var gmaStats = iStats.allAccountStats['Gma'];
		var sauravStats = iStats.allAccountStats['Saurav'];
		
		//All Userstats
		var daveUserStats = iStats.allUserStats['Dave'];
		var momUserStats = iStats.allUserStats['Mom'];
		var benUserStats = iStats.allUserStats['Ben'];
		
		var tenMinRow = document.getElementById('tenMinCJ').getElementsByTagName('td');
		tenMinRow[1].innerText = "$" + cjStats.hourly10Min + "/hr";
		tenMinRow[2].innerText = cjStats.num10MinSubmitted;
		tenMinRow[3].innerText = cjStats.num10MinReturns;
		tenMinRow[4].innerText = cjStats.percentSub10Min;
		
		var thirtyMinRow = document.getElementById('thirtyMinCJ').getElementsByTagName('td');
		thirtyMinRow[1].innerText = "$" + cjStats.hourly30Min + "/hr";
		thirtyMinRow[2].innerText = cjStats.num30MinSubmitted;
		thirtyMinRow[3].innerText = cjStats.num30MinReturns;
		thirtyMinRow[4].innerText = cjStats.percentSub30Min;
		
		var todayMinRow = document.getElementById('todayMinCJ').getElementsByTagName('td');
		todayMinRow[1].innerText = "$" + cjStats.incomeToday;
		todayMinRow[2].innerText = cjStats.numTodaySubmitted;
		todayMinRow[3].innerText = cjStats.numTodayReturns;
		todayMinRow[4].innerText = cjStats.percentSubToday;
		
		var todayAllCJ = document.getElementById('todayAllCJ').getElementsByTagName('td');
		todayAllCJ[1].innerText = "$" + cjStats.allIncomeToday;
		todayAllCJ[2].innerText = cjStats.allTodaySubmitted;
		todayAllCJ[3].innerText = cjStats.allTodayReturns;
		todayAllCJ[4].innerText = cjStats.percentSubAllToday;
		
		var todayAllCJ = document.getElementById('allTimeAllCJ').getElementsByTagName('td');
		todayAllCJ[1].innerText = "$" + cjStats.allTotalIncome;
		todayAllCJ[2].innerText = cjStats.allNumSubmitted;
		todayAllCJ[3].innerText = cjStats.allNumReturns;
		todayAllCJ[4].innerText = cjStats.allPercentSubTotal;
		
		//var todayAllCJ = document.getElementById('todayAllCJ').getElementsByTagName('td');
			
		
		
		cjTotals = document.getElementById('cjTotals');
		cjTotals.innerHTML = "Current Pool: " + cjStats.pool.currentCount + " HITs, " + cjStats.pool.percentSoFarPool +"% ("+
												cjStats.pool.ourTotalCount+"/"+cjStats.pool.allMturkDoneSoFar +") , " + cjStats.pool.leftOverPoolMoney +"$<br>" +
						     "Total Pool: " + cjStats.pool.apexCount + " HITs, " + cjStats.pool.percentPool +"%, " + cjStats.pool.totalPoolMoney + "$<br>" +
							 "ETA: " + cjStats.pool.activeETA + "hrs "+ cjStats.pool.dropRatePerHour + "HITs/hr<br>" +
							 "Pass-ETA: "+cjStats.pool.passiveETA +"hrs " + cjStats.pool.passiveDropRatePerHour +"HITs/hr<br>"+ 
							 "(last update: " + cjStats.pool.timeSinceLastUpdate + "mins ago) (goes back " + cjStats.pool.etaTimeDiffInHours+ "h" + 						   	 	cjStats.pool.etaTimeDiffInMins + "m)";
		
		
		var account;
		for(var name in iStats.allAccountStats) {
			if(!name || name == 'length')
					break;
			switch(name) {
				case 'Mom': account = momStats;
				break;
				case 'Em': account = emStats;
				break;
				case 'Ben': account = benStats;
				break;
				case 'Gma': account = gmaStats;
				break;
				case 'Saurav': account = sauravStats;
				break;
				default:
					alert('undefined account');
				break;
			}
			console.log(name);
			var accountRow = document.getElementById(name.toLowerCase() + 'Account').getElementsByTagName('td');
			accountRow[1].innerText = account.numTodaySubmitted;
			accountRow[2].innerText = account.numTodayReturns;
			accountRow[3].innerText = '$' + account.incomeToday;
			accountRow[4].innerText = account.hitsRemaining;
		}
		
		
		var user;
		for(var name in iStats.allUserStats) {
			if(!name || name == 'length')
					break;
			switch(name) {
				case 'Mom': user = momUserStats;
				break;
				case 'Ben': user = benUserStats;
				break;
				case 'Dave': user = daveUserStats;
				break;
				default:
					alert('undefined user');
				break;
				
			}
			
			var userRow = document.getElementById(name.toLowerCase() + 'User').getElementsByTagName('td');
			userRow[1].innerText = '$' + user.incomeToday;
			userRow[2].innerText = '$' + user.incomeThisWeek;
			userRow[3].innerText = '$' + user.incomeThisMonth;
			userRow[4].innerText = '$' + user.incomeThisYear;
		}

		var cmbRow = document.getElementById('cmbUser').getElementsByTagName('td');
		cmbRow[1].innerText = '$' +cmbStats.allIncomeToday;
		cmbRow[2].innerText = '$' +cmbStats.allIncomeThisWeek;
		cmbRow[3].innerText = '$' +cmbStats.allIncomeThisMonth;
		cmbRow[4].innerText = '$' + cmbStats.allIncomeThisYear;
		
		console.log('debug: ' + cjStats.pool.ourTotalCount);
		
		
		if(callback)
			callback();
		
	}});
}

function signIn(id) {
	var id = id;
	chrome.extension.sendMessage(
	{
		signIn: true,
		id: id
	},
	function(response) {
		console.log('id: '+id);
		var allSignInButtons = document.getElementsByName('signin');
		console.log(document.getElementById(id));
		for(var i = 0; i < allSignInButtons.length; i++) {
			if(allSignInButtons[i].id != id) {
				allSignInButtons[i].style.backgroundColor = '';
			}
		}
		chrome.runtime.sendMessage({ "changeIcon" : id});
		USER_NAME = id;
		createSubmissionDisplay();
	}
	);
	
}


function buildUserInterface() {
				var centReset = document.createElement("input");
				centReset.type = "button";
				centReset.style.width = "25%";
				centReset.value = "Reset";
				document.body.appendChild(centReset);
				centReset.onclick = function() {
						if(localStorage["SUBMIT CHECKER HITS"]) {
							localStorage["SUBMIT CHECKER HITS"] = JSON.stringify(new Array());
							this.style.backgroundColor = 'lightgreen';
						}
					}

				var timeButton = document.createElement("input");
				timeButton.type ="button";
				timeButton.style.width = "35%";
				timeButton.value = "10 Minute Timer";
				document.body.appendChild(timeButton);
				timeButton.onclick = function() { 
					this.style.backgroundColor = 'lightgreen';
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
					this.style.backgroundColor = 'lightgreen';

					chrome.extension.sendMessage({recording30: "true"},
					   function (response) {
					});
				  };
	createSubmissionDisplay(function() {

				 
				 var signInButton = document.createElement('input');
				 signInButton.type = 'button';
				 signInButton.style.width = '33%';
				 signInButton.value = 'Dave';
				 signInButton.name = 'signin';
				 signInButton.id = 'Dave';
				 document.body.appendChild(signInButton);
				 signInButton = document.getElementById('Dave');
				 signInButton.onclick = function() {
					 this.style.backgroundColor = 'lightgreen';
					 signIn(this.id);
				 };
				 
				 var signInButton = document.createElement('input');
				 signInButton.type = 'button';
				 signInButton.style.width = '33%';
				 signInButton.value = 'Mom';
				 signInButton.name = 'signin';
				 signInButton.id = 'Mom';
				 document.body.appendChild(signInButton);
				 signInButton = document.getElementById('Mom');
				 signInButton.onclick = function() {
					 this.style.backgroundColor = 'lightgreen';
					 signIn(this.id);
				 };
				 
				 var signInButton = document.createElement('input');
				 signInButton.type = 'button';
				 signInButton.style.width = '33%';
				 signInButton.value = 'Ben';
				 signInButton.name = 'signin';
				 signInButton.id = 'Ben';
				 document.body.appendChild(signInButton);
				 signInButton = document.getElementById('Ben');
				 signInButton.onclick = function() {
					 this.style.backgroundColor = 'lightgreen';
					 signIn(this.id);
				 };
				 
				//Determine who this computer is signed in as
				chrome.extension.sendMessage(
				{
					getSignIn:true
				},
				function(response)
				{
					console.log(response);
					document.getElementById(response.id).style.backgroundColor = 'lightgreen';
					UI_INITIALIZED = true;
				}
				);

			});
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
	
	
	chrome.extension.sendMessage(
	{
		getSignInAndCompId: true
	},
	function(response) {
	
		COMPUTER_ID = response.id;
		USER_NAME = response.name;
		//alert(USER_NAME);
		
		buildUserInterface();
	});

});

