///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//console.log("Submit Checker content script");

MAX_PAGE_FAIL = 'You have exceeded the maximum allowed page request rate for this website';
PROBLEM_FAIL = 'There was a problem submitting your results for this HIT';
EXPIRED_FAIL = 'The HIT you were viewing has expired.';


//console.log('testing running here, delete this console');




//Do not run during external submit. You will lose the race
//Only run in top window
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
				WhatsMyTabResolvedHitRequest: true,
				currentUrl: loc
			}, function(rs) {
		
		//console.log('refresh is here');
		
		var tabId = rs.id;
		var lastUrl = rs.lastUrl;
		
		//alert('herio');
		//console.log(sessionStorage);
		
		if(sessionStorage['tab' + tabId + 'Details'] && sessionStorage['tab' + tabId + 'Details'] != '') {
			
			//Did we leave the site?
			if(!loc.match(locReg) == -1 || (lastUrl.indexOf('mturk.com') == -1)) {
				delete sessionStorage['tab' + tabId + 'Type'];
				delete sessionStorage['tab' + tabId + 'Details'];
			}
			else
			{
				//alert('made it to here');
				var wentToDifferentAreaOnMturk = false;
				if(loc.indexOf('/mturk/dashboard') != -1 && doc.indexOf('There are no HITs available') == -1)
					wentToDifferentAreaOnMturk = true;
				if(loc.indexOf('/mturk/myhits') != -1 && doc.match(/\d+ of \d+ Results/))
					wentToDifferentAreaOnMturk = true;
				if(loc.indexOf('/mturk/findhits') != -1 && doc.indexOf('There are no more available HITS in this group.') == -1)
					wentToDifferentAreaOnMturk = true;
				if(loc.indexOf('mturk/findquals') != -1 ||
					loc.indexOf('mturk/status') != -1 ||
					loc.indexOf('mturk/transferearnings') != -1 ||
					loc.indexOf('mturk/youraccount') != -1 ||
					loc.indexOf('mturk/welcome') != -1 ||
					loc.indexOf('mturk/searchbar') != -1
					) {
					//console.log('went to different area');
					wentToDifferentAreaOnMturk = true;
				}
				
				
				if(wentToDifferentAreaOnMturk) {
					delete sessionStorage['tab' + tabId + 'Type'];
					delete sessionStorage['tab' + tabId + 'Details'];
					return;
				}
				
				//alert('and here');
				
				var hit = JSON.parse(sessionStorage['tab' + tabId + 'Details']);
				var type = sessionStorage['tab' + tabId + 'Type']
				//alert(tabId);
				
				//console.log(hit);
				//console.log(type);
				
				//Did we go to dashboard without running out of Hits?
				
				

				delete sessionStorage['tab' + tabId + 'Details'];
				delete sessionStorage['tab' + tabId + 'Type'];
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
						//~ alert('testing expired fail');
						isFailed = true;
						typeOfFail = 'Expired';
					}		
								
					if(isFailed && typeOfFail == 'Expired') {
						type = 'return';
					}
				}
				
				var resolvedHit = new ResolvedHit(hit.hitId,type, hit.accountName, null, isFailed, typeOfFail);
				//console.log(resolvedHit);
				//alert('and here');
				chrome.extension.sendMessage({
						resolvedHit: resolvedHit		
					}, function(e) {
						//console.log(e);
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
			AMT__Global_Vars.isTopWindow = true;
			AMT__Global_Vars.isPreview = true;
			return;
		}
		
		AMT__Global_Vars.isTopWindow = true;

		var s,t,u,w;
		s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
		t=/you were viewing could not be accepted/; // Not accepted
		//u=/The HIT you were viewing has expired/; //XXNotal accepted
		w=/Want to work on this HIT/; // Not accepted
		if  (
				s.exec(ih) || t.exec(ih) || w.exec(ih)
			)
		{
			AMT__Global_Vars.isPreview = true;
			return;
		}
						
		// Make the return button record its returning
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.initializeGroupId();
		AMT__Global_Vars.initializeHitId();	
		AMT___initializeReturnRecording();			
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

var locReg = /(https?:\/\/[w]*.mturk.com|https?:\/\/[w]*s3.amazonaws.com|https?:\/\/[w]*.mturkcontent.com\/dynamic\/hit)/i;
if(document.location.href.match(locReg) != null && window.top == window.self) {
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







