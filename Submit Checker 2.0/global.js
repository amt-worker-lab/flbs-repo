
//OLD
//var locReg = /(https?:\/\/[w]*.mturk.com|https?:\/\/[w]*s3.amazonaws.com|https?:\/\/[w]*.mturkcontent.com\/dynamic\/hit)/i;

var locReg = /(https?:\/\/[w]*\.?mturk\.com|https?:\/\/worker\.mturk\.com|https?:\/\/s\d\.amazonaws\.com|https?:\/\/[w]*\.?mturkcontent\.com\/dynamic\/hit)/i;
if(document.location.href.match(locReg)) {


function HIT(rew, reqId, reqName, jName,gId, hId, dur, worker) {
			this.reward = rew;
			this.requesterId = reqId;
			this.requesterName = reqName;
			this.jobName = jName;
			this.groupId = gId;
			this.hitId = hId;
			this.duration = dur;
			this.workerName = worker;
			
			
			this.time = (new Date()).getTime();
			
			this.accountName = document.getElementById('user_name_field').innerText; 
			this.userName = AMT__Global_Vars.userName;
			
			//console.log('userName: ' + this.userName);
			
			this.computerId = AMT__Global_Vars.computerId; //Not passed in via sessionStorage
	}






/**
 * OTHER GLOBAL VARIABLES
 * 
 */
//
var MT___host = 'http://192.168.1.2';

/**
 * 
 * 
 * 													AMT__GLOBAL_VARS
 * 
 * 
 * */

//		AMT__Global_Vars.isTopWindow
//		AMT__Global_Vars.isPreview
//		AMT__Global_Vars.groupId
var AMT__Global_Vars =
{
	isTopWindow: null,
	isPreview: null,
	groupId: '',
	hitId: '',
	isQProduct: false,
	hitDetails: {},
	isRefresh: false
}

AMT__Global_Vars.initializeGroupId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		var groupIdReg = /https?:\/\/worker\.mturk\.com\/projects\/([A-Z0-9]+)/;
		var groupId = groupIdReg.exec(document.location.href);

		if(!groupId)
		{
			//alert('Error initializing groupId. Try scraping it from the href? Or using the document element rather than a regex?');
			return;
		} 
		else {
			groupId = groupId[1];		
		} 
		AMT__Global_Vars.groupId = groupId;		
		
		//Now that we have the groupId, listen for whether the child frame wants to learn it as well.
		if (document.getElementsByTagName('iframe').length) {
			window.addEventListener('message', function(e) {
				var ifr = document.getElementsByTagName('iframe')[0];
				ifr.contentWindow.postMessage({groupId: AMT__Global_Vars.groupId}, '*');
				this.removeEventListener('click',arguments.callee,false);
			}, false);
		}
	}
	// Sep 18 2014
	// Added window.top != window.self
	// Bug: When in preview mode, not in iframe,
	// setInterval would endlessly post message.
	else if (window.top != window.self)
	{
		var interval =  setInterval(function(){
			parent.postMessage({groupIdRequest: true}, '*');
		}
		,200);
		
		window.addEventListener('message', function(e) {
				if(!AMT__Global_Vars.groupId)
				{
					if(e.data && e.data.groupId)
					{
						AMT__Global_Vars.groupId = e.data.groupId;
						
						//Record the groupId if we aren't in preview. This way we know which HITs we've already done/returned
						if(!AMT__Global_Vars.isPreview)
						{
							//Record the HitId so we know if we've already been here
							AMT___addQuestionAnswer('Skip Returns - ' + AMT__Global_Vars.groupId,
										AMT__Global_Vars.hitId,
										'');
						}
						clearInterval(interval);					
						this.removeEventListener('click',arguments.callee,false);
					}
				}
			}, false);
		}
}

AMT__Global_Vars.initializeHitId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		
		var hitId;
		var link = document.location.href;
		var hitIdReg = /https?:\/\/worker\.mturk\.com\/projects\/[A-Z0-9]+\/tasks\/([A-Z0-9]+)/;
		var hitId = hitIdReg.exec(link);
		if(!hitId)
		{
			//alert('Error initializing groupId');
		}
		hitId = hitId[1];
		AMT__Global_Vars.hitId = hitId;
	}
	else
	{
		var link = document.location.href;
		var hitIdReg = /hitId=([^&]+)/
		var hitId = hitIdReg.exec(link);
		if(!hitId)
		{
			//alert('Error initializing groupId');
		}
		hitId = hitId[1];
		AMT__Global_Vars.hitId = hitId;
	}
}

//top_window preview href
//https://www.mturk.com/mturk/preview?groupId=20NENHMVHVKCNQ47ZIY4U79KXWE42F&requesterId=A1ZFY5DB22KCK9&hitId=2SIHFL42J1LY9YEDHND0TGFKI6Q2NR&signature=YgugC%2F6Q4KQwhUu8ydrSsjUYyg0%3D&externalHit=true&canAccept=true

//Inner Iframe preview src
//"https://www.mturkcontent.com/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0"

//top_window preview accepted https://www.mturk.com/mturk/accept?hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0&prevHitSubmitted=false&prevRequester=aditya+sudhakar&requesterId=A1ZFY5DB22KCK9&prevReward=USD0.02&hitAutoAppDelayInSeconds=3600&groupId=20NENHMVHVKCNQ47ZIY4U79KXWE42F&signature=pPP49ZuO0ZYQYgk5N3ng4jgy0DQ%3D&%2Faccept.x=45&%2Faccept.y=6

//Inner Iframe accepted src
//https://www.mturkcontent.com/dynamic/hit?assignmentId=2598MZ9O9Z6K0U2SPF8H2RLFVKG1AA&hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0&workerId=_REDACTED_3_&turkSubmitTo=https%3A%2F%2Fwww.mturk.com


/**
 * 
 * 
 * 													END OF AMT__GLOBAL_VARS
 * 
 * 
 * */






/**
 * 
 * SubmissionRecorder
 * 
 * **/
 
 

 
 
//Assumption: Job has been accepted
AMT__Global_Vars.initializeTabId = function() {
	chrome.extension.sendMessage({
								  WhatsMyTab: true
							  }, function(response) {
								  //console.log(response);
								 AMT__Global_Vars.tabId = response.id;
							});
 }
  
 //Assumption: we're in top window
 //Assumption: Job has been accepted
 //Assumption: initializeGroupId has already run
 AMT__Global_Vars.initializeHitRecordDetails= function() {
	 //alert('hit');
	//Check Assumptions
	if(!AMT__Global_Vars.isTopWindow)
		alert('error in initializeHitRecordDetails. Assumption failed: is top window');
	if(AMT__Global_Vars.isPreview)
		alert('error in initializeHitRecordDetails. Assumption failed: is preview');	
	//This worked on the old site - may need to be implemented on the new site.
	/*if (document.body.innerHTML.indexOf('<span id="alertboxHeader">There are currently no HITs assigned to you.</span>') != -1) {
		return;
	}*/

	//Get COMPUTER_ID and Current User from localhost 
	chrome.extension.sendMessage({
		  getSignInAndCompId: true
	  }, function(response) {
		AMT__Global_Vars.computerId = response.computerId;
		AMT__Global_Vars.userName = response.userName;
		
		var detail = document.getElementsByClassName('container-fluid project-detail-bar');
		
		rwd = detail[0].getElementsByClassName('detail-bar-label');
		var rew;
		if (rwd) {
			for (var i=0; i<rwd.length; i++) {
				var label = rwd[i].innerText.trim();
				if (label == 'Reward:' ||
					label == 'Reward' // Hm?
					) {
					// Copy text to menu.
					rew = rwd[i].parentNode.getElementsByClassName('detail-bar-value')[0].innerText;
					break;
				}
				else if(label == "Requester"||
				        label == "Requester:") {
				
				
				}
			}
		}
		
		rew = (rew.replace(/\$/, "")) * 1; //0.03
		
		var reqId = document.getElementsByClassName('requesterId');
		if(reqId && reqId[0] && reqId[0].value)
		{
			reqId = reqId.trim();
		}
		else
		{
			//Attempt a regex on it
			reqIdReg = /name="requesterId" value="([^"]*)"/
			if(reqId = reqIdReg.exec(document.body.innerHTML)) {
				reqId = reqId[1];
			}
			else 
			{
				//Attempt to grab it from the 'contact' part of the page
				reqIdReg = /requesterId=([^&]*)/
				if(reqId = reqIdReg.exec(document.body.innerHTML)) {
					reqId = reqId[1];
					if(reqId == '')
						reqId = 'Undefined Requester Id';
				}
				else if(false)
				{
					//Attempt to grab it from the link, or from the child frame's link
				}
				else
				{
					reqId = "Undefined Requester Id";
				}
			}	
		}
		
		var reqName = document.getElementsByClassName("capsule_field_text")[0].innerHTML.trim();
		var jName = document.getElementsByClassName("capsulelink_bold")[0].getElementsByTagName('div')[0].innerHTML.trim();
		var gId = AMT__Global_Vars.groupId;
		var hId = AMT__Global_Vars.hitId; 
		
		var dur = document.getElementsByClassName('capsule_field_text')[3].innerText.trim();		
		
		AMT__Global_Vars.hitRecordDetails = new HIT(rew, reqId, reqName,jName, gId, hId, dur);
		//alert('here');
		GM_xmlhttpRequest({
		method: 'GET',
		asynchronous: false,
		url: 'http://192.168.1.2/mturk/.scripts/AMT_IncomeRecords/IncomeRecords.php?ComputerId=' + AMT__Global_Vars.computerId + '&HIT=' + encodeURIComponent(JSON.stringify(AMT__Global_Vars.hitRecordDetails)),
		onload: function(response) {
			//console.log('Response Recieved');
			if(response) {
			
			var rs = response.responseText;
			
			if (response.status == 200) {
					//console.log(rs);
					if(rs.indexOf('PHP ran, hitId+UserName has already been added') != -1) {
						alert('Debug: Failed to record hit b/c it has already been recorded');
					}
				}
			}
		}
		}); 
		
	});
 }
 
 
function recordReturn() {
	sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'return';
}


//handleF5AndEsc
document.addEventListener("keydown", function(event) {
	//~ console.log(event.keyCode);
    switch (event.keyCode) {
        case 116 : // 'F5'
			if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
				sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'refresh';
            else
            {
				//Send a message to the top window and tell it to refresh
				//Also stop propogation
				if(!AMT__Global_Vars.isPreview)
				{
						new AMT___core_factory().
							iframe2parent__postMessage( //
								{
									action: 'refreshThePage'
								}
							);
						event.preventDefault();
						return false; 
				}
            }
            break;
        case 27: //  'Esc'
			//alert('Esc Pressed');
			sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = '';
			break;
    }
});

//Assumption: we are the top window
function AMT___initializeReturnRecording() {
	
	var buttons = document.querySelectorAll('form button[type="submit"][name="button"]')
	for(var i = 0; i < buttons.length; i++) {
		if(buttons[i].innerText == "Return") {
			buttons[i].onclick = function() {
				recordReturn();
			}
		}
	}
}

//Send info about this HIT to the database
window.onbeforeunload = function() {
	
	
	//console.log(AMT__Global_Vars);
	if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview) {
		if(sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] == 'refresh') {
			delete sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'];
			return;
		}
		else if(sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] != 'return') {
			sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'submit';
		}
		sessionStorage['tab' + AMT__Global_Vars.tabId + 'Details'] = JSON.stringify(
			{
				hitId: AMT__Global_Vars.hitRecordDetails.hitId,
				accountName: AMT__Global_Vars.hitRecordDetails.accountName,
				userName: AMT__Global_Vars.hitRecordDetails.userName
			}
		);		
	}
}	

 
 
/**
 *
 * END OF SubmissionRecorder
 *  
 * **/


AMT___core_factory = function() {

}



AMT___core_factory.prototype.top_window__addEventListener_iframe = function(options, callback_function) {
	
	// Is there an iframe on the page?
	// If there is not then this is the end!
	if (!document.getElementsByTagName('iframe').length)
		return;
	
	// Still here. There is an iframe so listen for any
	// messages that may come up.
	// ...
	window.addEventListener("message", top_window__addEventListener_iframe__complete, false);
	
	// ...
	function top_window__addEventListener_iframe__complete(event)
	{
		if (!event || !event.hasOwnProperty('data') || !event.data) return;
		
		var v = event.data;
		
		switch(v.action) {
			case 'refreshThePage' :
				sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'refresh';
				window.location.href = window.location.href;
				break;
		}
	}
	
}


AMT___core_factory.prototype.iframe2parent__postMessage = function(options) {
	
	//~ console.log(options);
	parent.postMessage({
		action: options.action //'return_button__showNextTab'
		
		//~ action: 'return',
		//~ callback_function: callback_function
	}, "*");
	
	//~ setInterval
}
}

/**
 * function GM_xmlhttpRequest
 * 
 */
function GM_xmlhttpRequest(details) {
	try {
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
	var eventNames = ["onload", "onerror", "onreadystatechange", "ontimeout"];
	for (var i = 0; i < eventNames.length; i++ ) {
		var eventName = eventNames[i];
		if (eventName in details) {
		  setupEvent(xhr, details.url, eventName, details[eventName]);
		}
	}
	
	xhr.timeout = details.timeout;
	//~ xhr.ontimeout = function () { // OVERWRITES THE ONTIMEOUT FUNCTION ALREADY SET
		//~ console.log('timeout');
	//~ }
	
	if(!details.hasOwnProperty('asynchronous')) {
		details.asynchronous = true;
	}
	
	xhr.open(details.method, details.url, details.asynchronous);
	//~ xhr.open(details.method, details.url);

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
	catch(e) {
		console.log(e);
	}
}
