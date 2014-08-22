
var locReg = /(https?:\/\/[w]*.mturk.com|https?:\/\/[w]*s3.amazonaws.com|https?:\/\/[w]*.mturkcontent.com\/dynamic\/hit)/i;
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
			
			console.log('userName: ' + this.userName);
			
			this.computerId = AMT__Global_Vars.computerId; //Not passed in via localStorage
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
	core: {
		return_accept_run_nextTab: false
	},
	hitDetails: {},
	isRefresh: false
}

AMT__Global_Vars.initializeGroupId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		var groupIdReg = /<input type="hidden" name="groupId" value="([^"]*)">/;
		var groupId = groupIdReg.exec(ih)[1];
		if(!groupId)
		{
			//alert('Error initializing groupId. Try scraping it from the href? Or using the document element rather than a regex?');
		}
		AMT__Global_Vars.groupId = groupId;		
		
		//Now that we have the groupId, listen for whether the child frame wants to learn it as well.
		window.addEventListener('message', function(e) {
			var ifr = document.getElementsByTagName('iframe')[0];
			ifr.contentWindow.postMessage({groupId: AMT__Global_Vars.groupId}, '*');
			this.removeEventListener('click',arguments.callee,false);
		}, false);
		
	}
	else
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
		var innerIframe = document.getElementsByTagName('iframe');
		if(innerIframe && innerIframe[0])
		{
			innerIframe = innerIframe[0];
			innerIframeSrc = innerIframe.src;
			var hitIdReg = /hitId=([^&]+)/
			hitId = hitIdReg.exec(innerIframeSrc);
			if(!hitId)
			{
				//~ alert('Caution: Failed to get hitId from frame source. Proceeding to get hitId from topWindow instead.');
			}
			else
			{
				hitId = hitId[1];
			}
		}
		
		if(!innerIframe || !hitId)
		{	
			var hitIdReg = /name="hitId" value="([^"]+)">///<input type="hidden" name="groupId" value="([^"]+)">/;
			var hitId = hitIdReg.exec(ih)
			if(!hitId)
			{
				//alert('Error initializing groupId');
			}
			hitId = hitId[1];
		}
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
								  console.log(response);
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
			alert('error in initializeHitRecordDetails');
		if(AMT__Global_Vars.isPreview)
			alert('error in initializeHitRecordDetails');	
		
		
		//Get COMPUTER_ID and Current User from localhost 
		GM_xmlhttpRequest({
			method: 'GET',
			url:'http://localhost/mturk/.scripts/AMT_IncomeRecords/currentUser.php?getSignInAndCompId=1',
			onload: function(response) {
			console.log(response);

			var compAndName = JSON.parse(response.responseText);
			AMT__Global_Vars.computerId = compAndName.ComputerId;
			AMT__Global_Vars.userName = compAndName.User;
			var rew = document.getElementsByClassName("reward")[1].innerText.trim();
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
							console.log('Response Recieved');
							if(response) {
							
							var rs = response.responseText;
							
							if (response.status == 200) {
									console.log(rs);
									if(rs.indexOf('PHP ran, hitId+UserName has already been added') != -1) {
										alert('Debug: Failed to record hit b/c it has already been recorded');
									}
								}
							}
			}
			}); 

			}
			});
 }
 
 
function recordReturn() {
	localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'return';
}


//handleF5AndEsc
document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case 116 : // 'F5'
			if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
				localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'refresh';
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
			localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = '';
			break;
    }
});

//Assumption: we are the top window
function AMT___initializeReturnRecording() {
	var allAs = document.getElementsByTagName('a');
	for(var i = 0; i < allAs.length; i++) {
		if(allAs[i].href.indexOf('/mturk/return') != -1) {
			allAs[i].onclick = function() {
				recordReturn();
			}
		}
	}
}

//Send info about this HIT to the database
window.onbeforeunload = function() {
	console.log(AMT__Global_Vars);
	if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview) {
		if(localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] == 'refresh') {
			delete localStorage['tab' + AMT__Global_Vars.tabId + 'Type'];
			return;
		}
		else if(localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] != 'return') {
			localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'submit';
		}
		localStorage['tab' + AMT__Global_Vars.tabId + 'Details'] = JSON.stringify(
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
			case 'return_button__showNextTab':
				//~ console.log('Will showNextTab on return');
				
				var b = getReturnButton();
				console.log(b);
				if (b) {
					b.addEventListener('mouseup', function() {
						//~ console.log('mouseup on return button');
						
						showNextTab();
					}, false);
					
					//~ b.addEventListener('mouseup', v.callback_function, false);
				}
				break;
			// AMT___returnAndAcceptButton()
			case 'return_and_accept_button__nextTab':
				AMT__Global_Vars.core.return_accept_run_nextTab = true;
				break;
			case 'refreshThePage' :
				localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'refresh';
				window.location.href = window.location.href;
				break;
		}
	}
	
	/**
	 * var getReturnButton
	 */
	var getReturnButton = function() {
		
		/*<a href="/mturk/return?groupId=394TEHR260Y0TAZL4P5WWJA29V265A&amp;requesterId=A1DPN0ELREA8BX&amp;hitId=337RC3OW06B1S9HP5GO231XZJR8LVQ&amp;signature=69fiOfplYPuNDOqYG2nIVj%2F1V0Y%3D&amp;externalHit=true&amp;canAccept="><img src="/images/return_hit.gif" alt="" border="0" width="82" height="22"></a>*/
		
		var a = document.getElementsByTagName('a');
		for (var i in a) {
			if (i == 'length') break;
			//~ console.log(a[i].href);
			if (a[i].href && a[i].href.indexOf('https://www.mturk.com/mturk/return?') == 0) {
				return a[i];
				break;
			}
		}
		
		// here?
		return false;
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
