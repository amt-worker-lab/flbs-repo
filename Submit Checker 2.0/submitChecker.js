console.log("COGITO ERGO SUM!");
/**
 * 
 * on browser startup: Reset all localStorage regarding hit submissions/returns?
 * 
 * **/



function changeIcon(id) {
	console.log('changing icon, id', id);
	switch(id) {
			case 'Ben':
		   chrome.browserAction.setIcon({
				path: 'BlackMage-ff1-psp.png'
			});			
			break;
			case 'Mom':
					   chrome.browserAction.setIcon({
				path: 'FFI_PSP_White_Wizard_Map.png'
			});	
			break;
			case 'Dave':
			 chrome.browserAction.setIcon({
				path: 'daveImg.png'
			});	
			break;
		}
}
 
//Figure out who's logged into this computer, and set the icon accordingly
chrome.storage.sync.get('userName', function(userName) {
	changeIcon(userName);
});			
 

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
	console.log("background recieved message");
	
	if(request.changeIcon) {
		changeIcon(request.changeIcon);
	}

	if(request.signIn) {
		console.log('recieved request to sign in');
		chrome.storage.sync.set({'userName':request.signIn});
	}
	
	if(request.getSignIn) {
		
	    chrome.storage.sync.get('userName', function(userName) {
			sendResponse({userName: userName});
        });
        
		return true;
	}
	
	if(request.getSignInAndCompId) {
		console.log('trace getSignInAndCompId')
	    chrome.storage.sync.get('computerId', function(computerId) {
			console.log('got computerId', computerId);
			chrome.storage.sync.get('userName', function(userName) {
				console.log('got userName', userName);
				sendResponse({computerId: computerId, userName:userName})
			});			
        });      
        return true;  
	}
	
	if(request.setCompId) {

		chrome.storage.sync.set({'computerId': request.setCompId});	
	}
	
	if(request.WhatsMyTab) {
		console.log('Tab request:' + sender.tab.id);
		sendResponse({id: sender.tab.id});
		
	}
	
	if(request.WhatsMyTabResolvedHitRequest) {
		var lastUrl = localStorage['Tab' + sender.tab.id + 'LastUrl'];
		console.log('Tab ResolvedHitRequest:' + sender.tab.id + 'from URL request.url' + ', lastUrl: ' +lastUrl);
		localStorage['Tab' + sender.tab.id + 'LastUrl'] = request.currentUrl;
		//alert(lastUrl);
		//alert(sender.tab.id);
		sendResponse({id: sender.tab.id, lastUrl: lastUrl});
	}
	
	
    if(request.resolvedHit){
		//Get the computerId and UserName
	    chrome.storage.sync.get('computerId', function(computerId) {
			chrome.storage.sync.get('userName', function(userName) {
				console.log('request.resolvedHit got userName', userName, ' computerId', computerId);
				//alert(userName);
				request.resolvedHit.computerId = computerId;
				request.resolvedHit.userName = userName;

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://192.168.1.2/mturk/.scripts/AMT_IncomeRecords/IncomeRecords.php?ComputerId=' + request.resolvedHit.computerId + '&resolvedHit=' + encodeURIComponent(JSON.stringify(request.resolvedHit)),
					onload: function(response) {
						console.log('Response Recieved');
						if(response) {										
							var rs = response.responseText;
							console.log(rs);
						}
					}
				});
				
			});			
        });
        
	}
    
    
    if(request.recording10 == "true" )
    {
        chrome.tabs.query({active:true},function(tabs){
			console.log("10 minute recording");
			setTimeout(function(){
				//alert("Hello")
				play_single_sound("109662__grunz__success.wav");
				},600000);    
        });        
    }
    else if(request.recording30 == "true")
    {
		chrome.tabs.query({active:true},function(tabs){
		console.log("30 minute recording");
			setTimeout(function(){
				play_single_sound("109662__grunz__success.wav");
				},3000000);    
        }); 
	}
	else if(request.addHit == "true")
    {
		var newHit = request.hit;
		//console.log(allHits);
		if(!localStorage["SUBMIT CHECKER HITS"])
		{
			localStorage["SUBMIT CHECKER HITS"] = JSON.stringify(new Array());
		}
		if(!localStorage["HITCOUNTS"])
		{
			localStorage["HITCOUNTS"] = JSON.stringify(new Array());
		}
		
		var groupId = newHit.groupId;
		var time = newHit.time;
		
		var allHitCounts = JSON.parse(localStorage["HITCOUNTS"]);
		if(!allHitCounts[groupId])
		{
			allHitCounts.push(new HitCounter(groupId, time));
		}
		else
		{
			allHitCounts[groupId].count++;
		}
		localStorage["HITCOUNTS"] = JSON.stringify(allHitCounts);


		//console.log(newHit);
		var allHits = JSON.parse(localStorage["SUBMIT CHECKER HITS"]);
		

		
		
		allHits.push(newHit);
		allHits = JSON.stringify(allHits);
		localStorage["SUBMIT CHECKER HITS"] = allHits;
		console.log("background added hit");
		//play_single_sound("cash-register-05.wav"); //use for debug
	}
});


function HitCounter(groupId, time)
{
	this.groupId = groupId;
	this.time = time;
	this.count = 1;
}


function play_single_sound(fileName) {
	//document.createElement(
	var sound = document.createElement('audio');
	sound.setAttribute("src", fileName);
	sound.play();
}



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
