///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("Submit Checker content script");

MAX_PAGE_FAIL = 'You have exceeded the maximum allowed page request rate for this website';
PROBLEM_FAIL = 'There was a problem submitting your results for this HIT';
EXPIRED_FAIL = 'The HIT you were viewing has expired.';

//Do not run during external submit. You will lose the race
if(window.location.href != 'https://www.mturk.com/mturk/externalSubmit') {

function ResolvedHit(hId,type,accountName,userName,isFail,typeOfF) {
			//alert('running on the inside');
			this.hitId = hId;
			if(type == 'return')
				this.returned = true;
			else
				this.returned = false		
			//alert('still running');

			this.accountName = accountName;
			this.userName = null; //Gets set in submitChecker.js

			//alert('still running 2');
	
			this.isFailed = isFail;
			this.typeOfFail = typeOfF

			//alert('still running 3');

			this.computerId = null; //Gets set in submitChecker.js
	}

var doc = document.body.innerHTML;
var loc = window.location.href;
var locReg = /mturk.com/;


chrome.extension.sendMessage({
			WhatsMyTab: true		
		}, function(rs) {
			//alert(rs);
			var tabId = rs.id;
			//alert(tabId);
			if(localStorage['tab' + tabId + 'Details'] && localStorage['tab' + tabId + 'Details'] != '') {	
				//Did we leave the site?
				if(!loc.match(locReg)) {
					delete localStorage['tab' + tabId + 'Type'];
					delete localStorage['tab' + tabId + 'Details'];
				}
				else
				{
					if(doc.indexOf('There are no HITs available') != -1)
					{
							alert('If you get this alert when a job finishes, then you know you are doing great. Also, check the console for HIT. Remove the console and this alert after.');
					}
					var hit = JSON.parse(localStorage['tab' + tabId + 'Details']);
					var type = localStorage['tab' + tabId + 'Type']
					//alert(tabId);

					if(doc.indexOf('There are no more available HITs in this group. See more HITs available to you below.') != -1) {
						console.log(hit);
						console.log('type:' + type);
					}					
					
					delete localStorage['tab' + tabId + 'Details'];
					delete localStorage['tab' + tabId + 'Type'];
					//alert('here');

					var isFailed = false;
					var typeOfFail = 'NA';
					if(type == 'submit') {
						if(doc.indexOf(MAX_PAGE_FAIL) != -1) {
							isFailed = true;
							typeOfFail = 'Max Page Requests';
						}
						else if(doc.indexOf(PROBLEM_FAIL) != -1) {
							isFailed = true;
							typeOfFail = 'Problem Submitting';
						}
						else if(doc.indexOf(EXPIRED_FAIL) != -1) {
							alert('testing expired fail');
							isFailed = true;
							typeOfFail = 'Expired';
						}					
						if(isFailed) {
							type = 'return';
						}
					}
					
					var resolvedHit = new ResolvedHit(hit.hitId,type, hit.accountName, null, isFailed, typeOfFail);
					console.log(resolvedHit);
					//alert('and here');
					chrome.extension.sendMessage({
							resolvedHit: resolvedHit		
						}, function(e) {
							console.log(e);
							//squelch response
						});			
				}
			}
			else {
				//No hits for this tab so end script
			}
		});

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var locReg = /(https?:\/\/[w]*.mturk.com|https?:\/\/[w]*s3.amazonaws.com|https?:\/\/[w]*.mturkcontent.com\/dynamic\/hit)/i;
if(document.location.href.match(locReg) != null) {
function mturk_load()
{	
	if (window.top == window.self && /^https?:\/\/(www\.|)mturk\.com\//.exec(document.location.href)) {
		
		// Only run on these pages!
		/**
		 * Only run on (preview|previewandaccept|continue|accept|submit|return)
		 * However, stop running if on the "No more HITs available" page
		 */
		var l = document.location.href;
		if  (
			!/^https?:\/\/(www\.|)mturk\.com\/mturk\/(preview|previewandaccept|continue|accept|submit|return)/i.exec(l) ||
			
			/<tr>[\r\n\t\s]+<td class="title_orange_text_bold">[\r\n\t\s]+All HITs( Available to You|)[\r\n\t\s]+&nbsp;&nbsp;[\r\n\t\s]+<\/td>[\r\n\t\s]+<\/tr>[\r\n\t\s]+<tr>[\r\n\t\s]+<td class="title_orange_text" style="white-space: nowrap; padding-top: 1ex;">[\r\n\t\s]+1-10 of \d+ Results/.exec(ih)
			)
		{
			return;
		}
		
		AMT__Global_Vars.isTopWindow = true;
		AMT__Global_Vars.initializeGroupId();
		AMT__Global_Vars.initializeHitId();
		/**
		 * End Script Here
		 * And do float/skip if desired
		 * (If job is unaccepted + top window)
		**/
		var s,t,u,w;
		s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
		t=/you were viewing could not be accepted/; // Not accepted
		//u=/The HIT you were viewing has expired/; //XXNotal accepted
		w=/Want to work on this HIT/; // Not accepted
		if  (
				s.exec(ih) || t.exec(ih) || w.exec(ih)
			)
		{
			return;
		}
						
		// Make the return button record its returning
		AMT___initializeReturnRecording();
				
		AMT__Global_Vars.isTopWindow = true;
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.initializeGroupId();
		AMT__Global_Vars.initializeHitId();
		AMT__Global_Vars.initializeHitRecordDetails();
		AMT__Global_Vars.initializeTabId();
		
		
		
		// Add event listener (will only do this if Iframe is on the page)
		new AMT___core_factory()
			.top_window__addEventListener_iframe();
				
		// return
		return;
	}
	
	
	
	// still here?
	// return if on mturk.com
	if (/^https?:\/\/(www\.|)mturk\.com\//.exec(document.location.href))
		return;
	
	// This is running at mturkcontent.com or amazonaws.com
	// If top window or job isthen always run.
	if  (
		window.top == window.self ||
		document.location.href.indexOf('assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE') == -1
		)
	{
		AMT__Global_Vars.isTopWindow = false;
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.initializeGroupId();
		AMT__Global_Vars.initializeHitId();
		AMT__Global_Vars.initializeTabId();		
	}
	// Else if framed window then only run
	// when job has been accepted.
	else
	{
		return;
	}
}

var ih;
if (document.readyState == "complete" || document.readyState == "interactive") {
	ih = document.body.innerHTML;
	mturk_load();
}
else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			ih = document.body.innerHTML;
			mturk_load();
		}
	}
}
}







