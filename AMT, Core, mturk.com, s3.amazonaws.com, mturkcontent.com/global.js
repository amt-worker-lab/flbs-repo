/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * TODO:
 * 	Home page graph memory, tallied up almost 10gib after ~1-2 days
 * 
 **/
 
// KH
var mt___kh_test_str = '38033	||2603	longandfoster.com||2011	kw.com||1802	crye-leike.com||1155	homesmartintl.com||1099	realtyonegroup.com||830	elliman.com||XXXX';




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
var AMT__Global_Vars = //function()
{
	defaultPersistantScriptVars : [
		//{name: 'RecordAllHits',			value: 1, isPersistant:true},
		{name: 'DS ShiftFarLeft',			value: '1', isPersistant:true},
		{name: 'DS ShowNextTab',			value: '1', isPersistant:true},
		{name: 'DS NextTab',				value: '1', isPersistant:true},
		{name: 'R&A ShiftFarLeft',			value: '1', isPersistant:true},
		{name: 'JohnRobertsCheckHistory',	value: '0', isPersistant:true},
		{name: 'R&A ShowNextTab',			value: '1', isPersistant:true},
		{name: 'R&A NextTab Iframe Focus',	value: '1', isPersistant:true},
		{name: 'Return Button Hotkey',		value: '`', isPersistant:true},
		{name: 'Return Button ShowNextTab',	value: '1', isPersistant:true},
		//~ {name: 'SkipInPreviewMode', value: '1', isPersistant:true},
	],
	associativeArrayofDPSV: {},
	isTopWindow: null,
	isPreview: null,
	groupId: '',
	hitId: '',
	numSubmitQueries: 0,
	isSubmitting: false,
	copyInp: false,
	scriptVars: {}, // scriptVars object. This is filled in before mturk_load with persistent & non-persistent vars.
	RACustomKey: false,
	initializedScriptInjection: false,
	isQProduct: false,
	sStrings:[],
	isSpecialWorkflowWindow: false,
	core: {
		return_accept_run_nextTab: false,
		// AMT__Global_Vars.core.captcha_string
		captcha_string: 'In order to accept your next HIT, please type this word into the text box below',
		getR_Button_NextTab: false,
		is_running_on_local_dev: false // This is boolean for e.g. http://localhost/mturk/.dev/HITs/CHIOS%20TESTING.html
	},
	
	num_amt_tabs: null,
	
	// Defaults are false, 4, 200
	CAPTCHA_staggered: {				// defaults
		stagger_is_active:				false,
		min_tabs_to_initiate_staggered:	4,
		staggered_timeout_per_tab:		200
	}
}
for(var i = 0; i < AMT__Global_Vars.defaultPersistantScriptVars.length; i++) {
	AMT__Global_Vars.associativeArrayofDPSV[AMT__Global_Vars.defaultPersistantScriptVars[i].name] = AMT__Global_Vars.defaultPersistantScriptVars[i];
}




AMT__Global_Vars.initialize_num_amt_tabs = function() {
	chrome.extension.sendRequest({get_num_amt_tabs: true}, 
		function(rs) 
		{
			AMT__Global_Vars.num_amt_tabs = rs.num_amt_tabs;

		}
	);
}
AMT__Global_Vars.initialize_CAPTCHA_staggered_vars = function() {
	chrome.extension.sendRequest({getNTPassBy: true}, 
		function(rs) 
		{
			AMT__Global_Vars.CAPTCHA_staggered.min_tabs_to_initiate_staggered	= rs.min_tabs_to_initiate_staggered;
			AMT__Global_Vars.CAPTCHA_staggered.staggered_timeout_per_tab		= rs.staggered_timeout_per_tab;
			AMT__Global_Vars.CAPTCHA_staggered.staggered_timeout_per_tab		= rs.staggered_timeout_per_tab;
		}
	);
}

AMT__Global_Vars.initializeNextTabPassBy = function() {
	chrome.extension.sendRequest({getNTPassBy: true}, 
		function(rs) 
		{
			AMT__Global_Vars.toggle_ntpassby = rs.NTPassBy;

		});
}

AMT__Global_Vars.initialize_return_accept_run_nextTab = function() {
	chrome.extension.sendRequest({getRA_Button_NextTab: true}, 
		function(rs) 
		{
			AMT__Global_Vars.core.return_accept_run_nextTab = rs.RA_Button_NextTab == 'On' ? true : false;
		});
}

//Assumption: We know that we are top window
AMT__Global_Vars.initializeReturnButton = function () {
	var hasReturnButton = false;
	var allAs = document.getElementsByTagName('a');
	for(var i = 0; i < allAs.length; i++) {
		if(allAs[i].href.indexOf('/mturk/return') != -1) {
			hasReturnButton = true;
		}
	}
	//~ console.log('ran inside initializeReturnButton');
	if(AMT__Global_Vars.isTopWindow && hasReturnButton) {
		//~ console.log('ran inside initializeReturnButton');
		var returnButton = document.createElement('input');
		returnButton.setAttribute('style', 'position:absolute;height:20px;top:0px;width:100px;left:0px;z-index:99999;cursor:pointer;');
		returnButton.setAttribute('type', 'button');
		returnButton.setAttribute('id', 'AMT_return_button_top_window');
		returnButton.setAttribute('value', 'return');
		document.body.appendChild(returnButton);
		returnButton.onclick = function() {
			var allAs = document.getElementsByTagName('a');
			for(var i = 0; i < allAs.length; i++) {
				if(allAs[i].href.indexOf('/mturk/return') != -1) {
					
					if(AMT__Global_Vars.scriptVars['Return Button ShowNextTab'] != "0") {
						showNextTab({isTopWindow:true});
						showNextTab({isTopWindow:false});
					}
					else if (AMT__Global_Vars.core.getR_Button_NextTab) { // getR_Button_NextTab
						new AMT___core_factory().nextTab(); // do nextTab
					}
					
					allAs[i].click();
					return;
				}
			}
		}
	}
}

//var allAs = document.getElementsByTagName('a');

AMT__Global_Vars.initializeR_Button_NextTab = function() {
	chrome.extension.sendRequest({getR_Button_NextTab: true}, 
		function(rs) 
		{
			if(rs.R_Button_NextTab == 'On') {
				AMT__Global_Vars.core.getR_Button_NextTab = true;
			}
			//~ getR_Button_NextTab
			//~ console.log(rs);alert('initializeR_Button_NextTab');
			//~ if(rs.R_Button_NextTab == rs.R_Button_NextTab == 'On') { alert('ra nextab=on');
				//~ var allAs = document.getElementsByTagName('a');
				//~ for(var i = 0; i < allAs.length; i++) {
					//~ if(allAs[i].href.indexOf('/mturk/return') != -1) {
						//~ allAs[i].addEventListener('onclick', function() {
							//~ new AMT___core_factory().nextTab();
						//~ }, false);
					//~ }
				//~ }
			//~ }
		}
	);
}

AMT__Global_Vars.initializeIsSpecialWorkflowWindow = function(callback) {
	var callback = callback;
	chrome.extension.sendRequest(
		{amISpecialWorkflowWindow: true}, 
		function(rs) 
		{
			AMT__Global_Vars.isSpecialWorkflowWindow = rs.detail;
			callback(AMT__Global_Vars.isSpecialWorkflowWindow);
		}
	);
}

AMT__Global_Vars.initializeGroupId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		var groupIdReg = /<input type="hidden" name="groupId" value="([^"]*)">/;
		var groupId = groupIdReg.exec(ih)[1];
		if(!groupId)
		{
			//alert('Error initializing groupId');
		}
		AMT__Global_Vars.groupId = groupId;		
		
		// Now that we have the groupId, listen for whether the child frame wants to learn it as well.
		// OCT19 2014. In some cases top window does not have an iframe.
		// Added case for this.
		if (document.getElementsByTagName('iframe').length) {
			window.addEventListener('message', function(e) {
				var ifr = document.getElementsByTagName('iframe')[0];
				ifr.contentWindow.postMessage({groupId: AMT__Global_Vars.groupId}, '*');
				this.removeEventListener('click',arguments.callee,false);
			}, false);
		}
		// TESTING.........
		//~ window.addEventListener('message', function(e) {
			//~ console.log(e);
		//~ }, false);
	}
	// Sep 18 2014
	// Added window.top != window.self
	// Bug: When in preview mode, not in iframe,
	// setInterval would endlessly post message.
	else if (window.top != window.self)
	{
		//~ console.log(window.top == window.self)
		//~ if (window.top == window.self) { // Does not work
			//~ alert('x');
			//~ return; //?
		//~ }
		//~ return;
		// Setting maxIntervals dnw when job is in preview
		// mode in a new window (not in iframe).
		//~ var maxIntervals = 30; // 30 * .2s ~= 6s
		//~ if (!/^https?:\/\/(www\.|s3\.|)(mturk|mturkcontent|amazonaws)\.com/.exec(document.location.href)) return;
		
		var interval =  setInterval(function(){
			parent.postMessage({groupIdRequest: true}, '*');
		}, 200);
		
		
		
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
				alert('Caution: Failed to get hitId from frame source. Proceeding to get hitId from topWindow instead.');
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
		if(hitId) {
			hitId = hitId[1];
			AMT__Global_Vars.hitId = hitId;
		} else {
			AMT__Global_Vars.hitId = "hitIDDNE?";
		}
	}
}

AMT__Global_Vars.initializeTabId = function() {
		AMT__Global_Vars.isInitializingTabId = true;
		chrome.extension.sendRequest(
		{
			getTabId: true
		}, 
		function(response) {
				AMT__Global_Vars.tabId = response.id;
				AMT__Global_Vars.isInitializingTabId = true;
				if(AMT__Global_Vars.initializeTabIdCallback) {
					AMT__Global_Vars.initializeTabIdCallback();
				}
			}
		);
}

//LISTENER FOR MESSAGES FROM BACKGROUND SCRIPT
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.playFirstElement) {
		console.log('recieved: play first element');
		if(AMT__Global_Vars.isTopWindow == request.isTopWindow) {
			console.log(request.isTopWindow);
			document.getElementsByTagName('audio')[0].play();
			console.log('attempted to play');
		}
	}
	if(request.focusOnPage) {
		console.log('toldtofocus');
		if(AMT__Global_Vars.isTopWindow == request.isTopWindow) {
			window.focus();
		}
	}
	if(request.checkPreview)
	{
		if(AMT__Global_Vars.isTopWindow)
		{
			//Only have the top window send back the response
			console.log('Commanded to tell if idle');
			sendResponse({isPreview: AMT__Global_Vars.isPreview});
		}
	}	
	else if(request.isQProduct)
	{
		//Only have the top window sending back the response
		//console.log('Commanded to tell if isQProduct: ' + isQProduct);
		if(AMT__Global_Vars.isTopWindow == request.isTopWindow)
		{
			//console.log(AMT__Global_Vars.tabId);
			sendResponse({isQProduct: isQProduct, qProductId: qProductId, tabId: AMT__Global_Vars.tabId});
		}
		else
			return true;
	}
	else if(request.RemoveFromTabsQ) {
		isQProduct = false;
		qProductId = null;
	}
	else if(request.focus) {
		//console.log('told to focus');
		
		if(request.isTopWindow == AMT__Global_Vars.isTopWindow) {
			document.body.focus();
			if(AMT__Global_Vars.callbackOnShowNextTabArrival)
				AMT__Global_Vars.callbackOnShowNextTabArrival();
			console.log('focusing');
		}
	}
	else if(request.switchTabNotifier) {
		//~ console.log('isTopWindow: ' + AMT__Global_Vars.isTopWindow);
		//~ console.log(AMT__Global_Vars.isSubmitting)
		//~ console.log(AMT__Global_Vars.numSubmitQueries)
		//~ console.log(!AMT__Global_Vars.isPreview)
		//~ console.log(AMT__Global_Vars.toggle_ntpassby == 'On')
		if(AMT__Global_Vars.copyInp) {
			console.log(AMT__Global_Vars.copyInp);
			chrome.extension.sendRequest({copyInp: AMT__Global_Vars.copyInp}, function(rs){/**squelch rs**/ AMT__Global_Vars.copyInp = false; });
			
		}
		
		
		if(AMT__Global_Vars.isSubmitting && AMT__Global_Vars.numSubmitQueries < 1 && !AMT__Global_Vars.isPreview && AMT__Global_Vars.toggle_ntpassby == 'On') {
			AMT__Global_Vars.numSubmitQueries++;
			new AMT___core_factory().nextTab();
			//alert('here here');
		}else {
			//Do nothing
		}
		
	
	}
	else if(request.RACustomKey) {
		AMT__Global_Vars.RACustomKey = request.RACustomKey.charCodeAt();
	}
	else if(request.RA_Button_NextTab) {
		AMT__Global_Vars.core.return_accept_run_nextTab = request.RA_Button_NextTab == 'On' ? true : false;
	}
	else if(request.R_Button_NextTab) {
		//Implement Later
	}
	else if(request.removeUtilityTab) {
		var containerDiv = document.getElementById('AMT__UtilityContainer');
		var removeDiv = document.getElementById('utilityTabBtn' + request.removeUtilityTab)
		if(containerDiv && removeDiv)
			containerDiv.removeChild(removeDiv);
	}
	//~ // Reload the iframes.
	//~ // This is coming from the context
	//~ // menu click. And eventpage.js.
	//~ else if(request.reloadScript) {
		//~ if(!AMT__Global_Vars.isTopWindow) {
			//~ setTimeout(function() {
				//~ window.location.href = window.location.href;
			//~ }, 5000);
		//~ }
	//~ }
	
	
});

//
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
		
	/**
	 * request.CAPTCHA_queue_reload
	 */
	// Must set false tmp?
	var test=false;
	if  (request.CAPTCHA_queue_reload) {
		// Send success 
		// This could be sendResponse(true); As long as it is not sendResponse() or sendResponse(false) or No Response.
		sendResponse({CAPTCHA_queue_reload__tab_recieved: true});
		
		if  (
			document.body.innerHTML.indexOf(AMT__Global_Vars.core.captcha_string) != -1 ||
			test
			)
		{
			// Go to new href or window.reload()
			if (document.location.href == 'https://www.mturk.com/mturk/submit') { //
				var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
				if (i)
					window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
			} else
				window.location.reload();
		}
	}
	
	if(request.fromUtilityToParent) {
		/*
		 *
		 { 
			switchToId,
			otherDetail1,
			otherDetail2,
			etc.
		 }
		 
		 * 
		 * */
		
		// THIS CAUSES AN ERROR ON "RETURN AND ACCEPT".
		// Error in event handler for runtime.onMessage: TypeError: Cannot read property 'callbackFromUtility' of null
		// ADDING CONDITIONAL hasOwnProperty: FRI MARCH 10 2015
		var containerDiv = document.getElementById('AMT__UtilityContainer');
		if (containerDiv && containerDiv.hasOwnProperty('callbackFromUtility'))
			containerDiv.callbackFromUtility(request);
		
		
		//~ AMT__UtilityContainer
		//~ 
		//~ utilityTabBtn.setAttribute('style','float:left;width:100px;height:25px');
		//~ utilityTabBtn.setAttribute('id','utilityTabBtn'+utilityTabs[i].id);
		//~ utilityTabBtn.setAttribute('type','button');
		//~ containerDiv.appendChild(utilityTabBtn);
		//~ utilityTabBtn.value = 'Tab' + i;
		//~ utilityTabBtn.utilityTab = utilityTabs[i];
		//~ utilityTabBtn.onclick = function() {
			//~ var switchToId = this.id.replace(/utilityTabBtn/, '');
			//~ chrome.extension.sendRequest({switchToUtilityTab:switchToId}, 
				//~ function(rs) {
					//~ /*squelch response*/
				//~ });
			//~ 
			//~ }
	}
});


/**
 * 
 * 
 * 													END OF AMT__GLOBAL_VARS
 * 
 * 
 * */



/**
 * Utility Tabs
 * 
 */
//utilityTabs  [{
//					url: "string",
//					options: {} //These options are specific to the tab, and overwrite any options set in the options parameter below				
//				}]
//			
//	globalTabOptions
//			{
//				util_options: utilOptionsObj (go to AMT__all_pages_util in global_all_pages_local.js for details)
//			}
function AMT__setUtilityTabs(utilityTabs, globalTabOptions, utilityPanelOptions,runInPreviewMode, callbackFromUtility) {
	if(!AMT__Global_Vars.isPreview && !runInPreviewMode) {
		var utilityTabsAndOptions = {};
		utilityTabsAndOptions.utilities = utilityTabs;
		utilityTabsAndOptions.options = globalTabOptions;
		console.log('utilityTabsAndOptions');
		console.log(utilityTabsAndOptions);
		for(var i = 0; i < utilityTabs.length; i++) {
			utilityTabs[i].id = "" + i + ":" + Math.random();
		}
		chrome.extension.sendRequest({setUtilityTabs: utilityTabsAndOptions},
				function(rs){

				});
		return createAMT__utilityWindowDiv(utilityTabs,utilityPanelOptions, callbackFromUtility);
	}
}

function createAMT__utilityWindowDiv(utilityTabs, utilityPanelOptions, callbackFromUtility) {
	var containerDiv = document.createElement('div');
	if(utilityPanelOptions &&
	   utilityPanelOptions.style)
		containerDiv.setAttribute('style',utilityPanelOptions.style);
	else	
		containerDiv.setAttribute('style','position:absolute;top:0px;height:27px;left:80%;background-color:gray;border: 1px solid green');
	containerDiv.setAttribute('id','AMT__UtilityContainer');
	containerDiv.callbackFromUtility = callbackFromUtility;
	document.body.appendChild(containerDiv);
	
	for(var i = 0; i < utilityTabs.length; i++) {
		var utilityTabBtn = document.createElement('input');
		utilityTabBtn.setAttribute('style','float:left;width:100px;height:25px');
		utilityTabBtn.setAttribute('id','utilityTabBtn'+utilityTabs[i].id);
		utilityTabBtn.setAttribute('type','button');
		containerDiv.appendChild(utilityTabBtn);
		utilityTabBtn.value = 'Tab' + i;
		utilityTabBtn.utilityTab = utilityTabs[i];
		utilityTabBtn.onclick = function() {
			var switchToId = this.id.replace(/utilityTabBtn/, '');
			chrome.extension.sendRequest({switchToUtilityTab:switchToId}, 
				function(rs) {
					/*squelch response*/
				});
		}
	}
}




/**
 * End of Utility Tabs
 * 
 **/





//Record Returning
/**
 * 
 * **/
function recordReturn() {
	sessionStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'return';
}

/**
 * Tab Switching 
 ***/
isQProduct = false;
qProductId = false;



function addToTabsQ(callbackOnShowNextTabArrival) {
	isQProduct = true;
	AMT__Global_Vars.callbackOnShowNextTabArrival = callbackOnShowNextTabArrival;
	
	new AMT___core_factory().shiftFarRight();
	
	
	console.log('adding to tabsq in global');
	console.log(AMT__Global_Vars);
	if(AMT__Global_Vars.isInitializingTabId) {
		console.log('isInitializingTabId');
		AMT__Global_Vars.initializeTabIdCallback = function() {
			//Tell eventPage to add this to the Q
			console.log(AMT__Global_Vars);
			chrome.extension.sendRequest({
				  addToTabsQ: true,
				  isTopWindow: AMT__Global_Vars.isTopWindow
			  }, function(response) {
				qProductId = response.qProductId;
			});
		}
	}
	else {
		console.log('!isInitializingTabId');

		//Tell eventPage to add this to the Q
		console.log(AMT__Global_Vars);
		chrome.extension.sendRequest({
									  addToTabsQ: true,
									  isTopWindow: AMT__Global_Vars.isTopWindow
								  }, function(response) {
									qProductId = response.qProductId;
								});
	}
	new AMT___core_factory().iframe2parent__postMessage({
		action: 'tabsQTitleChange'
	});
}



function showNextTab(options) {
	console.log('Showing Next Tab');
	isQProduct = false;
	if(options && options.hasOwnProperty("isTopWindow")) {
		console.log("isTopWindow: " +options.isTopWindow);
		chrome.extension.sendRequest({
										  showNextTab: true,
										  isTopWindow: options.isTopWindow
									  }, function(response) {
									});
	}
	else {
		chrome.extension.sendRequest({
										  showNextTab: true,
										  isTopWindow: AMT__Global_Vars.isTopWindow
									  }, function(response) {
									});
	}
}


/**
 * End of Tab Switching
 * 
 * **/

/**
 * 
 * 
 * 													FLOAT/SKIP FUNCTIONALITY
 * 
 * 
 * */

//This is the Constructer Function
//Call new on this function and pass in the options to initialize the floater's variables!
var AMT___Floater = function (options) {
		AMT___Floater.acceptCondition = options.acceptCondition ? options.acceptCondition : null;							//done
		AMT___Floater.runMT_Run = options.runMT_Run;										//done
		AMT___Floater.runTop_Window = options.runTop_Window;								//done
		AMT___Floater.forceTopCondition = options.forceTopCondition;
		AMT___Floater.runOnMouseOver = options.runOnMouseOver;					
		AMT___Floater.maxSkipsBeforeAccept = options.maxSkipsBeforeAccept;			
		AMT___Floater.maxFloatTimeBeforeAccept = options.maxFloatTimeBeforeAccept;		
		AMT___Floater.groupId = AMT__Global_Vars.groupId;									//done

		AMT___Floater.skipSpeed = options.skipSpeed ? options.skipSpeed : 15000;			//done
		AMT___Floater.skipWithSubmitQueue = options.skipWithSubmitQueue;
		AMT___Floater.skipOnReturnedHits = options.skipOnReturnedHits;
}




//Runs the floater based on its options vairables
AMT___Floater.float = function() {
	


	if(AMT___Floater.runMT_Run || AMT___Floater.runTop_Window)
	{
		AMT___Floater.runPreview();
		AMT___Floater.listenForAcceptSkip();
	}
	
	if(typeof(AMT___Floater.acceptCondition) === 'function')
	{
		if(AMT___Floater.acceptCondition())
		{
			AMT___Floater.accept();
		}
	}
	else if(AMT___Floater.acceptCondition)
	{
		AMT___Floater.accept();
	}
	
	//Todo:
	//Use AMT___Floater.trySkip() to implement auto-skip
	//Place in later code for 'Accept Condition'
	
	
	/* Old useless code
	if(AMT___Floater.skipOnReturnedHits)
	{
		AMT___getMatch('Skip Returns - ' + AMT__Global_Vars.groupId,
			   AMT__Global_Vars.hitId,
			   function(match, reference) {
				if(match)
				{
					console.log('Testing the "AMT___Floater" in getMatch below: ')
					console.log(AMT___Floater);
					console.log('Is this AMT___getMatch?');
					alert('Skipping - Already Been Here');
					document.body.style.backgroundColor = 'LightGreen';
					reference.trySkip();
				}
			},
			AMT___Floater);
	}*/
	
}


AMT___Floater.runPreview = function() {
	console.log(AMT___Floater.runMT_Run);
	if(AMT___Floater.runMT_Run)
	{
		var ifr = document.getElementsByTagName('iframe');//console.log(ifr);
		if (!ifr || !ifr.length) {//console.log('run');
			top_window( true ); // Run top_window( okay_to_run ) :)
			return;
		} else 
			ifr = ifr[0];
		
		ifr.contentWindow.postMessage({runPreview: true}, '*');
		
		var ran = false;
		
		var interval =  setInterval(function(){
			var ifr = document.getElementsByTagName('iframe')[0];
			ifr.contentWindow.postMessage({runPreview: true}, '*');
			console.log('sedning runpreview');
		}
		,200);

		
		window.addEventListener('message',function(event) {
			if(event.data && event.data.MT_Ran)
			{
				clearInterval(interval);
			}
		},false);
	}
	else if(AMT___Floater.runTop_Window)
	{
		top_window();
	}
}

AMT___Floater.listenForAcceptSkip = function() {
	window.addEventListener('message', AMT___Floater.acceptOrSkip, false);
}

AMT___Floater.accept = function() {
	if(!AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		document.body.style.backgroundColor = 'lightblue';

		parent.postMessage({acceptJob: true}, '*');	
		return true;	
	}
	else if(AMT__Global_Vars.isPreview)
	{
		document.body.style.backgroundColor = 'lightblue';
	
		window.postMessage({acceptJob: true}, '*');
		return true;
	}
	return false;
}

// -800 to 400 on May 30 for Peter Heyneman.
AMT___Floater.skip = function() {
	if(!AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						parent.postMessage({skipJob: true}, '*')
						}
						, timeToSkip);
						
			}
			, 800); //2200//800 
	}
	else if (AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						window.postMessage({skipJob: true}, '*') // This could also be: AMT___Floater.acceptOrSkip({data: {skipJob:true}})
						}
						, timeToSkip);
						
			}
			, 800);
	}
}


AMT___Floater.acceptOrSkip = function(e) {
	console.log('got accept or skip');
	console.log(e);
	if(e.data && e.data.acceptJob)
	{
		if (GM_getValue('mt_captcha') == '0') { 
			AMT___Floater.isAccepting = true;
			document.getElementsByName('/accept')[0].click(); /* TODO: doSumbit (-2.2 seconds) would go here*/
		}
		else {
			var interval = window.setInterval(function() {
				if (GM_getValue('mt_captcha') == '0') {
					AMT___Floater.isAccepting = true;
					window.clearInterval(interval);
					document.getElementsByName('/accept')[0].click(); /* TODO: doSumbit (-2.2 seconds) would go here*/				
					
				}
			}, 2000);
		}
	}
	else if(e.data && e.data.skipJob)
	{
		var allLinks = document.getElementsByTagName('a');
		for(var i = 0; i < allLinks.length; i++)
		{
			if(allLinks[i].href && allLinks[i].href.indexOf('/mturk/preview') != -1)
			{
				allLinks[i].click();
				break;
			}
		}
	}
}

/**
 * 
 * 
 * 													END OF FLOATER'S CODE
 * 
 * 
 * */
 
/**
 * 
 * 
 * 													RECORD USER DECISIONS
 * 
 *
 * TODO:
 * - Q: What happens when you leave the house and MT___host points to a non-existent
 * page?
 * 
 * - Do not update counts for the auto decisions, when the computer decides to auto submit a form
 * */

var AMT___DECISION_RECORD = new Array();

//Creates and returns a button that says "Record&Submit"
//Its top/left are roughly near the regular Submit button
function AMT___CreateRecordButton()
{
	var inputs = document.getElementsByTagName("input");
	for(i=inputs.length - 1; i >= 0;i--)
	{
		if(inputs[i] && inputs[i].value)
		{
			if(inputs[i].value.trim().indexOf("Submit") != -1)
			{
				//var width = inputs[i].width;
				//var width = /^([\d]+)/.exec(width)[1];
				//var width = /^([\d]+)/.exec(width)[1];
				var rect = inputs[i].getBoundingClientRect();
				var newInput = document.createElement('input');
				console.log("rect.top: " + rect.top);
				var right = /^([\d]+)/.exec(rect.right)[1];
				console.log("left before adding width: " + right);
				newInput.setAttribute("style","position:absolute;top: " +rect.top +";left: "+ right +"px;");
				newInput.setAttribute("value","Submit&Record");
				newInput.setAttribute("type", "button");
				document.body.appendChild(newInput);
				newInput.onclick = function() {
					AMT___recordAndSubmit();
					};					
				return newInput;
			}
		}		
	}
}

//Adds a UserDecision to both record and do past behavior on
//recordName: Defines the namespace that these decisions are recorded into, and that past behaviors only reference from
//matchStringFunction: A function that returns a string. The function runs during RecordAndSubmit and doPastBehavior
//OutputIdentifiers: An array of how to identify what to record/do past behavior on. E.g. ["Id(Joe)", "ClassName(Monkey)[2]"]
function AMT___addUserDecision(recordName, matchStringFunction, outputIdentifiers, decision_opts)
{
	AMT___DECISION_RECORD.push(new decisionRecord(recordName, matchStringFunction, outputIdentifiers, decision_opts));
}

//An object for recording user decisions
//AMT___DECISION_RECORD is an array of decisionRecords
//recordAndSubmit sends a Match object to the database for each decisionRecord in AMT___DECISION_RECORD
//doPastBehavior bases its matchStringFunctions on each decisionRecord's matchStringFunction
function decisionRecord(recordName, matchStringFunction, outputIdentifiers, decision_opts)
{
	this.recordName = recordName;
	this.matchStringFunction = matchStringFunction;
	this.outputIdentifiers = outputIdentifiers;
	this.decision_opts = decision_opts;
}

//Does UserDecisions that have been recorded in the database
//recordName is the namespace of the decisions it checks against
//threshold is the minimum number of times the user decision has to have occurred before automatically doing that decision
//submitObject is optional object. If it is a string of 'Do Not Submit', no submission happens. Otherwise it submits the form based on its attributes
//Calls the callback even if the match fails or the threshold isn't met.
//callback sends back the match or a null value if there isn't one.
function AMT___doPastBehavior(recordName, threshold, submitObject, callback, callbackOnFail)
{
	console.log("inside do past behavior");
	if(!threshold)
	{
		threshold = 1;
	}
	
	for(i = 0; i < AMT___DECISION_RECORD.length;i++)
	{
		if(recordName != AMT___DECISION_RECORD[i].recordName)
		{
			console.log("not same namespace");
			continue;
		}
		var matchString = AMT___DECISION_RECORD[i].matchStringFunction().replace(/\s/g," ");
		AMT___getMatch(recordName, matchString, function(match) {
				if(match && match != "No Match")
				{
					console.log("threshold size: " + threshold);
					console.log(match);
					if(match.count < threshold)
					{
						if(callbackOnFail) {
							callback(false);
						}
						return;
					}
					console.log(match);
					for(j = 0; j < match.outputs.length; j++) // >>>
					{
						var outputPair = new OutputPair(match.outputs[j].inputIdentifier, 
														match.outputs[j].value);
						//console.log(outputPair);
						outputPair.doWriting();	
						if(submitObject == 'Do Not Submit')
						{
							console.log('testing');
							if(callback)
							{
								callback(match);
							}
						}
						else if(submitObject)
						{
							if(callback)
							{
								callback(match);
							}
							doSubmit(
								submitObject.form,
								submitObject.location,
								submitObject.callback_function,
								submitObject.offsetTime,
								submitObject.doServerSideSubmit
							);										     
						}
						else
						{
							if(callback)
							{
								callback(match);
							}
							doSubmit();
						}
					}
				}
				else
				{
					console.log("No Match");
					if(callbackOnFail)
						callback(false);
				}
			});
	}
}

//Sends match objects to the database based on the namespaces, match string functions, and input identifiers in AMT___DECISION_RECORD (most commonly setup by calls to AMT___addUserDecision)
function AMT___recordAndSubmit(form, location, callback_function, offsetTime, doServerSideSubmit)
{
	AMT___record();
	doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit);
}

function AMT___record()
{
	//console.log(AMT___DECISION_RECORD);
	for(i = 0; i < AMT___DECISION_RECORD.length; i++)
	{
		var recordName = AMT___DECISION_RECORD[i].recordName;
		var matchString = AMT___DECISION_RECORD[i].matchStringFunction().replace(/\s/g," ");
		var outputs = new Array();
		var options = AMT___DECISION_RECORD[i].decision_opts;
		//console.log(options);
		
		for(j = 0; j < AMT___DECISION_RECORD[i].outputIdentifiers.length; j++)
		{
			//console.log(AMT___DECISION_RECORD[i].outputIdentifiers[j]);
			var outputPair = new OutputPair(AMT___DECISION_RECORD[i].outputIdentifiers[j]);
			outputPair.doRecording();
			
			if(options && options.writeBlankInputIdentifier)
			{
				outputPair.inputIdentifier = "";
			}
			
			outputs.push(outputPair);
		}
		AMT___addQuestionAnswer(recordName, matchString, outputs);
		//console.log(JSON.stringify({recordName: recordName, matchString: matchString, outputs: outputs}));
	}
}


//Gets a match of matchString/UserInput from the databse
//Parameters:
//recordName - The namespace of the match you are asking for
//matchString - the matchString you want to check against in the database
//callback(match) - a function that gets called as soon as a match is discovered (or undiscovered) from the database. match is a match object (see below)
function AMT___getMatch(recordName, matchString, callback, reference, timeCutOff)
{
	var find = new FindObject(recordName, matchString.replace(/\s/g," "), timeCutOff);
	var find = JSON.stringify(find);
	//alert("find has been triggered");
	var reference = reference;
	//console.log("ref b4 gm: " + reference);
	GM_xmlhttpRequest({
		method: "POST",
		url: 
			 MT___host + '/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
		data: "findObject=" + encodeURIComponent(find),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs= response.responseText;
			//console.log(rs);
			if(rs.trim() == "No Match")
			{
				//console.log("got here");
				callback(undefined)
				return;
			}
			//console.log("got here 2");
			rs = JSON.parse(rs);
			rs.outputs = JSON.parse(rs.outputs);
			console.log("ref in gm: " + reference);
			if(!reference)
				callback(rs);
			else			
				callback(rs, reference);
		}
	});	
}

//The hardcode way to add a match into the databse
//recordName: the namespace that the match gets matched against
//matchString: the matchString in the database
//outputPairs: an array of outputPairs, e.g. [new OutputPair("Id(Bob)", "n/a"), new OutputPair("Name("Steve")[1],"n/a")]
function AMT___addQuestionAnswer(recordName, matchString, outputPairs)
{
	var match = new Match(recordName, matchString, outputPairs, (new Date).getTime());
	//console.log("Last time of submit: " + match.lastTimeOfSubmit)
	//console.log(match);
	chrome.extension.sendRequest({
								   match: match					
								  }, function(response) {
			//console.log(response.farewell);
		});
}

//An object with an inputIdentifier, and a value (which gets recorded in doRecording(), or written into the correct input in doWriting())
//Input Identifier types: Id, TagName, ClassName, Name
function OutputPair(inputIdentifier, value)
{
	this.inputIdentifier = inputIdentifier;
	if(value)
		this.value = value;
	else
	{
		this.value = undefined;
	}
}

//Sets value to element.value (or element.checked) where element is determined by the inputIdentifier 
OutputPair.prototype.doRecording = function() {
	//console.log(/(^[^\(]+)/.exec(this.inputIdentifier)[1]);
	//console.log(this)
	
	var identificationType = /(^[^\(]+)/.exec(this.inputIdentifier)[1];
	//console.log("here");
	//console.log(identificationType);
	var identificationQuality = /\(([^\)]+)\)/.exec(this.inputIdentifier)[1];
	identificationQuality = identificationQuality.replace(/['"]/g,'');
	//console.log(identificationQuality);
	if(identificationType != "Id")
	{
		var identificationIndex = /\[(\d+)\]/.exec(this.inputIdentifier)[1];
	}
	//console.log("type: " + identificationType);
	//console.log("quality: " + identificationQuality);
	//console.log("index: " + identificationIndex);
	
	var element;
	
	//console.log(document.body.getElementsByClass("test"));
	
	try {
		switch(identificationType) {
			case "Id": element = document.getElementById(identificationQuality);
				break;
			case "TagName": element = document.getElementsByTagName(identificationQuality)[identificationIndex];
				break;
			case "Class": element = document.body.getElementsByClassName(identificationQuality)[identificationIndex];
				break;
			case "Name": element = document.getElementsByName(identificationQuality)[identificationIndex];
				break;
			default : alert("recording broke");
		}
		
		if(element.type && (element.type == "checkbox" || element.type == "radio"))
		{
			this.value = element.checked;
		} 
		else
		{
			if(!element.value)
				this.value = '';
			else
				this.value = element.value;
			//console.log(element);
			//console.log("this.value: "+this.value);
		}
	}
	catch(e)
	{
		console.log(e)
	}
}


//Writes this.value to the element of this.inputIdentifier
OutputPair.prototype.doWriting = function() {
	//console.log("this.value inside doWriting: " + this.value);
	var identificationType = /(^[^\(]+)/.exec(this.inputIdentifier)[1];
	//console.log(identificationType);
	var identificationQuality = /\(([^\)]+)\)/.exec(this.inputIdentifier)[1];
	identificationQuality = identificationQuality.replace(/['"]/g,'');
	//console.log(identificationQuality);
	if(identificationType != "Id")
	{
		var identificationIndex = /\[(\d+)\]/.exec(this.inputIdentifier)[1];
	}
	//console.log("type: " + identificationType);
	//console.log("quality: " + identificationQuality);
	//console.log("index: " + identificationIndex);
	
	
	var element;
	
	try{
		switch(identificationType) {
			case "Id": element = document.getElementById(identificationQuality);
				break;
			case "TagName": element = document.getElementsByTagName(identificationQuality)[identificationIndex];
				break;
			case "Class": element = document.getElementsByClassName(identificationQuality)[identificationIndex];
				break;
			case "Name":element = document.getElementsByName(identificationQuality)[identificationIndex];
				break;
			default : alert("writing broke");
		}
		
		if(element.type && (element.type == "checkbox" || element.type == "radio"))
		{
			element.checked = this.value;
		} 
		else
		{
			console.log(element.value);
			if(this.value === undefined || this.value === false || this.value === '') {
				element.value = '';
			} else {
				element.value = this.value;
			}
		}
	}
	catch(e)
	{
		console.log(e);
	}
}

//An obect
//recordName: the recordName that it gets matched against in the database
//matchString: the matchstring  "   "   "   "       "      "   "   "
//outputPairs: an array of outputPairs
//lastTimeOfSubmit: the last time the match was submitted Default: the time this Match gets created
//count: how many times the match has been recorded. Default: 1 
function Match(recordName, matchString,outputPairs,lastTimeOfSubmit,count)
{
	this.recordName = recordName;
	this.matchString = matchString.replace(/\s/g, " ");
	this.outputs = outputPairs;
	if(!count)
		this.count = 1;
	else
		this.count = count;
	if(!lastTimeOfSubmit)
		this.lastTimeOfSubmit = Math.round((new Date).getTime()/1000);	
	else
		this.lastTimeOfSubmit = lastTimeOfSubmit;
}

//An object that gets passed to eventPage, then passed into PHP to query the database looking for a match
function FindObject(recordName,matchString, timeCutOff) {
	if(!timeCutOff)
		timeCutOff = 0;
	this.matchString = matchString;
	this.recordName = recordName;
	this.timeCutOff = timeCutOff;	
}


/**
 * 
 * 
 * 													End of: RECORD USER DECISIONS
 * 
 * 
 * */


/**
 * 						Get/Set Javascript Variables on the Page (As opposed to our Extension)
 * 
 * 
 * 
 * 
 * */

function initializeScriptInjection(callBackAMTFunction, varNames, callback, callbackParams) {
	
	AMT__Global_Vars.initializedScriptInjection = true;
	
	//Add a script to the page
	//Then create a DOM listener for Getting and a DOM listener for Setting variables on the page
	var actualCode = '(' + function() {
		console.log('actual code ran in page script');
		
		function selectInnerVariable(selectorString) {
			var selectorChunks = selectorString.split('.');
			console.log(selectorChunks);
			var variable = window[selectorChunks[0]];
			for(var i = 1; i < selectorChunks.length; i++) {
				variable = variable[selectorChunks[i]];
			}
			console.log('finished "getting" here is the result of the selection');
			console.log(variable);
			return variable;
		}
		
		document.addEventListener('runPageScript', function(e) {
			var data = e.detail;
			console.log(e);
			if(typeof data == 'function') {
				data();
			}
			else {
				console.log('Got in script: ');
				data = data.replace(/function ?\(\)/, '');
				data = data.replace(/^[^{]*{/, '');
				data = data.replace(/}[^}]*$/, '');
				data = data.trim();
				console.log(data);
				var funcToRun = new Function(data);
				funcToRun();
			}
		});
		
		document.addEventListener('setPageScriptVars', function (e) {
			var data = e.detail;
			console.log('recieved ' + e.detail);
			if(Array.isArray(data)) { //Should be an array of strings, where each string is a variable name
				var passbackData = {};
				for(var i = 0; i < data.length; i++) {
					if(data[i].indexOf('.')) {
						passbackData[data[i]] = selectInnerVariable(data[i]);
					}
					else {
						passbackData[data[i]] = window[data[i]];
					}
				}
			} else if(data){
				//data should be a string, with the exact name as the variable wanted 
				if(data.indexOf('.') == -1) {
					var passbackData = window[data];
				}
				else {
					var passbackData = selectInnerVariable(data);
				}
			} else {
				console.log('Error: The data passed into getPageScriptVars is null/false/undefined');
				return;
			}
		});
		
		document.addEventListener('getPageScriptVars', function (e) {
			var data = e.detail;
			console.log('recieved ' + e.detail);
			if(Array.isArray(data)) { //Should be an array of strings, where each string is a variable name
				var passbackData = {};
				for(var i = 0; i < data.length; i++) {
					if(data[i].indexOf('.')) {
						passbackData[data[i]] = selectInnerVariable(data[i]);
					}
					else {
						passbackData[data[i]] = window[data[i]];
					}
				}
			} else if(data){
				//data should be a string, with the exact name as the variable wanted 
				if(data.indexOf('.') == -1) {
					var passbackData = window[data];
				}
				else {
					var passbackData = selectInnerVariable(data);
				}
			} else {
				console.log('Error: The data passed into getPageScriptVars is null/false/undefined');
				return;
			}
			
			/**The commented out code attempts to get rid of circular references. Note that it fails for any references to HTML objects. If you enable this code, be wary. Try instead to the variable's properties, e.g. try to get "map.zoom" instead of "map"  **/
			//~ var cache = [];
			//~ JSON.stringify(passbackData, function(key, value) {
				//~ try {
					//~ if (typeof value === 'object' && value !== null) {
						//~ if (cache.indexOf(value) !== -1) {
							//~ // Circular reference found, discard key
							//~ return;
						//~ }
						//~ // Store value in our collection
						//~ cache.push(value);
					//~ }
					//~ return value;
				//~ }
				//~ catch(err) {
					//~ console.log('Ignoring error:' +err);
					//~ return;
				//~ }
			//~ });
			//~ cache = null; // Enable garbage collection
			
			console.log(passbackData);
			
			var evt = new CustomEvent('returnedPageScriptVars', {detail: passbackData});
			document.dispatchEvent(evt);
			
		}) 
	} + ')' + '();';


	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	
	
	
	//callBackAMTFunction(varNames, callback, callbackParams); //Make sure this runs once the script has finished being injected and ran
}

function AMT___GetPageScriptVars(varNames, callback, callbackParams) {
	if(!AMT__Global_Vars.initializedScriptInjection) {
		initializeScriptInjection(this, varNames, callback, callbackParams);
	}
	
	document.addEventListener('returnedPageScriptVars', function(e) {
		var returnedVars = e.detail;
		console.log('recieved returnedPageScriptVars data');
		console.log(returnedVars);
		callback(returnedVars, callbackParams);
	});

	var data = varNames;
	var evt = new CustomEvent('getPageScriptVars', {detail: data});
	document.dispatchEvent(evt);
}

//Remember to implement callback and callback params
function AMT___RunPageScript(funcToCall, callback, callbackParams) {
	if(!AMT__Global_Vars.initializedScriptInjection) {
		initializeScriptInjection(this, null, callback, callbackParams);
	}
	
	document.addEventListener('returnedPageScriptFunction', function(e) {
		
	});
	
	var data = '' + funcToCall;
	console.log('AMT___RunPageScript');
	console.log(data);
	var evt = new CustomEvent('runPageScript', {detail: data});
	document.dispatchEvent(evt);
}

function AMT___SetPageScriptVars(varNames, callback, callbackParams) {
	
}

//~ 
//~ function AMT___SetPageScriptVar(varName, callback, callbackParams) {
//~ 
//~ }


/*********************************************************
 *********************************************************/

/**
 * String Prototypes
 * 
 * .parseURL
 * .stateAbbrToFull
 * .clean_string_to_array
 * .string_to_mixed_case
 * .format_number_with_commas
 * .div
 * 
 */
/**
 * .clean_str_to_auto
 */
 /**
			 * function 
			 */
			function clean_str_to_auto(str) {
				
			}
String.prototype.clean_str_to_auto = function(opts) {
	var s = this.toString();
	return s.toLowerCase().replace(/&/g, 'and').replace(/[^0-9a-z]/gi, ''); // Replace "&" with "and". Remove all but /[0-9a-z]/i
}
/**
 * .div
 * 
 * @style		...
 * @innerHTML	Default=false.
 */
String.prototype.div = function(opts) {
	var s = this.toString();
	var div = document.createElement('div');
	if (opts && opts.hasOwnProperty('style')) {
		div.setAttribute('style', opts.style);
	}
	if (opts && opts.hasOwnProperty('innerHTML') && opts.innerHTML) {
		div.innerHTML = s;
	} else { // Default
		div.innerText = s;
	}
	return div;
}
/**
 * .format_number_with_commas
 */
String.prototype.format_number_with_commas = function() {
	var s = this.toString();
	var parts = (s + '').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
/**
 * .string_to_mixed_case
 * 
 * @param		options.REG_INCLUDE_DASHES
 */
String.prototype.string_to_mixed_case = function(options) {
	var s = this.toString().toLowerCase();
	if (options && options.hasOwnProperty('REG_INCLUDE_DASHES')) // Same as normal but toUpperCase "Some-word" to "Some-Word"
	{
		s = s.replace(
			/(^|[ \-])([a-z])/g,
			function(match0, match1, match2) {
				return match1 + match2.toUpperCase();
			}
		);
		return s;
	}
	else
	{
		s = s.replace(
			/(^| )([a-z])/g,
			function(match0, match1, match2) {
				return match1 + match2.toUpperCase();
			}
		);
		return s;
	}
}
/**
 * .clean_string_to_array
 * 
 * Description: Remove [^\w\d] from string. Return array split by space.
 * 
 * @param options						object
 * @param .string						str		String to clean.
 * @param .least_characters_per_word	int		Number of least amount of characters allowed per word. 0 is no limit. Default=1. This means single letters are not bolded.
 * 
 * Returns string
 */
String.prototype.clean_string_to_array = function(options) {
	
	var s = this.toString();
	var min;
	
	if (options && typeof options == 'object')
		min = (options.hasOwnProperty('least_characters_per_word')) ? options.least_characters_per_word : 1;
	else
		min = 1
	
	var reg = new RegExp('(^| )[\\w\\d]{'+min+'}($| )', 'g');
	
	s = s.replace(/[^\w\d]/g, '  ');
	
	s = s.replace(reg, '  ');
	
	s = s.replace(/[\r\n\t\s]+/g, ' ');
	
	s = s.split(' ');
	
	return s;
}
//http://www.abeautifulsite.net/parsing-urls-in-javascript/
// fork from https://gist.github.com/jlong/2428561
/**
 * 
 * 
 {
	hash: ""
	host: "naturespoisons.files.wordpress.com"
	hostname: "naturespoisons.files.wordpress.com"
	pathname: "/2014/05/veratrum-californicum-by-dcrjsr-cc-by-sa-3-0.jpg"
	port: ""
	protocol: "http:"
	search: "?w=1200"
 }
 */
String.prototype.parseURL = function() {
	var parser = document.createElement('a'),
		searchObject = {},
		queries, split, i;
	
	// USING :: this.toString()
	
	// Let the browser do the work
	parser.href = this.toString() + '';
	
	// Convert query string to object
	queries = parser.search.split('&'); //.replace(/^?/, '')
	for( i = 0; i < queries.length; i++ ) {
		split = queries[i].split('=');
		searchObject[split[0]] = split[1];
	}
	
	return {
		protocol: parser.protocol,
		host: parser.host,
		hostname: parser.hostname,
		port: parser.port,
		pathname: parser.pathname,
		search: parser.search,
		searchObject: searchObject,
		hash: parser.hash
	};
}
/**
 * .country_code_to_country_name
 * 
 * MT___countries = [
	{name: 'Bosnia and Herzogovina', code: 'BA'}, 
 */
String.prototype.country_code_to_country_name = function() {
	
	str = this.toString().toLowerCase().trim();
	
	for (var i in MT___countries) {
		var c = MT___countries[i];
		if (c.code.toLowerCase() == str) {
			return c.name;
		}
	}
	
	// None found?
	return str.toUpperCase();
}
String.prototype.stateAbbrToFull = function() {
	
	//~ // BUILD STR
	//~ var str = '';
	//~ for (var i in this) {
		//~ if (i == 'length' || this[i].length != 1) {
			//~ break;
		//~ }
		//~ str += this[i];
	//~ }
	
	str = this.toString().toLowerCase().trim();
	
	//~ console.log(str);
	
	for (var i in MT___states) {
		if (i.toLowerCase() == str) {
			return MT___states[i];
			//~ break;
		}
	}
	
	// None found?
	return str.toUpperCase();
}
String.prototype.state_full_to_abbr = function() {
	
	str = this.toString().toLowerCase().trim();
	
	for (var i in MT___states) {
		if (MT___states[i].toLowerCase() == str) {
			return i;
		}
	}
	
	// None found?
	// Returns upper!
	return str.toUpperCase();
}
String.prototype.state_abbr_is_valid = function() {
	
	str = this.toString().toLowerCase().trim();
	
	for (var i in MT___states) {
		if (i.toLowerCase() == str) {
			return true;
		}
	}
	
	// Here?
	// Return false.
	return false;
}

/*********************************************************
 *********************************************************/

/**
 * AMT factories
 *
 * run
 * AMT__rq
 * AMT___core_factory
 * AMT___events_factory
 * AMT___requests_factory
 * AMT___huge_vars_factory
 * AMT___items_factory
 * AMT___site_scrapes
 * AMT___gen_functions
 * AMT___geographic_functions
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
**/

/**
 * run
 * 
 * Puts every task into a prototype function
 * 
 * 
 */
var run = function() {
}
/**
 * This is just a placeholder. run.prototype.f is re-defined in each task.
 */
run.prototype.f = function() {
}
/**
 * AMT requester functions
 * AMT__rq
 * 
 */
var AMT__rq = function() {
}

/**
 * AMT___core_factory
 *
 * 
 * @function nextTab
 * @function nextWindow
 * @function top_window__addEventListener_iframe
 * @function iframe2parent__postMessage
 * @function amt_home_show_tasks
 * @function iframe2parent__addEventListener_child
 * @function el_innerHeight
 */
function AMT___core_factory() {

}
//Shows the tab on the right of the current tab
//If there is no tab on the right, it shows the tab at the far left
AMT___core_factory.prototype.nextTab = function(options) {
	//~ console.log(options);
	chrome.extension.sendRequest(
		{
			nextTab: true,
			options: options,
			isTopWindow: AMT__Global_Vars.isTopWindow
		},
		function(response)
		{
		}
	);
}
//
AMT___core_factory.prototype.nextWindow = function() {
	console.log('core_nextWindow');
	chrome.extension.sendRequest(
		{
			core_nextWindow: true
		},
		function(response)
		{
		}
	);
}
/**
 * .el_innerHeight
 * 
 * @param options {}
 * @param 	.elements
 * @param 	.offset
 * 
 * NOTES: innerHeight is always -14px because many times the bottom of page will have
 * a horizontal scroll bar.
 */
AMT___core_factory.prototype.el_innerHeight = function(options) {
	
	// success
	// See below (success function)
	//
	options.callback__success = success;
	
	// 
	if (window.top == window.self) {
		success(options, {
			innerHeight: window.innerHeight
		})
		
		// Quit here
		return;
	}
	
	// Still going?
	// Start the child listening
	// Then message the parent
	
	// Child
	// Pass in options
	new AMT___core_factory().childFrame__addEventListener_iframe(
		options
	);
	
	// Parent
	new AMT___core_factory().iframe2parent__postMessage({
		action: 'window.innerHeight'
	});
	
	// The success function
	// @param : options
	// @param : v {}
	function success(options, v) {
		
		// v.action
		// v.innerHeight
		
		console.log(v);
		
		// If callback
		if (options.hasOwnProperty('callback_function')) {
			options.callback_function(v.innerHeight);
			return; //exit
		}
		
		// Default ...
		// Set element heights.
		// options.elements
		// options.offset
		
		console.log('parent innerHeight:' + v.innerHeight);
		
		var new_height = (v.innerHeight*1 - options.offset - 14) + 'px';
		
		console.log('new_height:' + new_height);
		
		var els = options.elements;
		for (var i in els) {
			var el = els[i];
			el.style.height = new_height;
		}
		
	}
	
}
/**
 * .childFrame__addEventListener_iframe
 * 
 * @param options {}
 */
AMT___core_factory.prototype.childFrame__addEventListener_iframe = function(options) {
	
	var options = options;
	
	window.addEventListener("message", complete, false);
	
	function complete(event) {
		if (!event || !event.hasOwnProperty('data') || !event.data) return;
		
		var v = event.data;
		
		switch(v.action) {
			
			// window.innerHeight
			// This is usually about 10px too tall... ?
			case 'window.innerHeight':
				
				options.callback__success(options, v);
				
				break;
		}
	}
}
/**
 * .top_window__addEventListener_iframe
 * 
 * @param v.action
 * @param v.threshold_to_change => ChangeWindowCount
 */
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
		
		//~ console.log(v);
		
		switch(v.action) {
			case 'return_button_click': 
				if(AMT__Global_Vars.scriptVars['Return Button ShowNextTab'] != '0') {
					document.getElementById('AMT_return_button_top_window').click();
				}
				else {
					var b = getReturnButton();
					b.click();
				}
				break;
			case 'tabsQTitleChange': 
				//console.log("Changing document title to TQ");
				document.title = "TQ";
				(function() {var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9/f0F/Pz8DP///wD///8P////Dv///xL///8P////A////wD///8A/v7+Cf///wX///8A////APv7+wr9/f0D+/v7Dv///wb///81+vv8i/v7/Iv3+PqL4+nxi+ru9JHy9Piu5+zzru3w9ZD+/v5x/v7+H////wr///8A9/f3H/7+/g7///8J////HNDX5Pyaq8j/m6zJ/5esy/+QpcX/larK/5uwzv+MoMH/mqrG/5qlv+7Q0Nty/f3+Af///wD///8A/v7+A////wz+/v6b2d/q/4abvf+Emr7/jKHD/5Gnyf+Uqsz/fpW5/4mXuP/U1OL/e3ui+MPE0l7///8A////AP///wD///8P////Xa680/9/lrr/kafJ/5yy0/+WrM7/nbPT/52uyv+ktM7/1NTi/8LC1f+lpr3n////AP///wD///8A////AP7+/mDo7PL/ytPi/5yv0fehsuXuuMvl0Kq81drS2uf8+/z9bff3+SG5uM1r8vL1ff///wD///8A////AP///wr+/v4H/v7+jufq8umIg/Sut7L9YKul/W7PzvlMnZn03Ozq/x/+/v4H////AP///wD///8A////AP///wD///8A5OH/IpuS/pF3cfPploz/hH5y/6F/dP+gl47/gkw++e7Hwv9Fta//XPj4/gf///8A////AP///wD///8A+vn/BoyB/pGlnf5vfHfxy4mA/JlIOf/lmZD+f1lK/89kWPrPmZD+f9zY/yu3sP5ar6j/ZP///wD///8A6uj/GbSt/l6imv9yVkf/1HBm+MJ5eOrlhX/1s2JY+dRpYPfPv7/zb4+F/41WR//Uloz/hI6E/47///8A////AOro/xmnn/9teW3/qH5y/6HKxf9B9/n7Fc3N9VfMyvlQraj6cbWv/1zj4f4h2tf/Lks7/+NmWP+/0s7/OP///wCvqP9kjoT/jo6E/46Sif+I+vn/Bt3a/ypsX/+5////AH90/6Dj4f4h0Mz/OrWv/1yyq/9gkon/iNzY/yv///8A19P/MvLx/g////8A////APX0/wxvYv6119P/MtzY/ytmWP+/oZj/df///wBQQP/dt7D+Wv///wD///8A////AP///wD///8A////AKyk/2makf9+UUL/283J/z/l4/8f1dH/M////wD///8At7D+Wv39/gH///8A////AP///wD///8A////AP///wDa1/8u2tf/LtrX/y719P8M////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAOAfAADgBwAA4AMAAPABAADwHwAA8d8AAPAfAADonwAA8CEAAOf5AADGvQAA/bcAAP3/AAD//wAA//8AAA==';document.getElementsByTagName('head')[0].appendChild(link);})();

				break;
			case 'return_button_hotkey':
				window.addEventListener('keydown', function(e) {
						if(e.keyCode == v.options.keyCode) {
							console.log('returning');
							var b = getReturnButton();
							b.click();
						}
					});
				break;
			case 'click_return_button': 
				var b = getReturnButton();
				b.click();
				break;
			case 'return_button__showNextTab':
				//~ console.log('Will showNextTab on return');
				
				var b = getReturnButton();
				if (b) {
					b.addEventListener('click', function() {
						showNextTab({isTopWindow:true});
						showNextTab({isTopWindow:false});
					}, false);
				}
				// 2nd return button
				// AMT_return_button_top_window
				//~ var b = getReturnButton2();
				//~ if (b) {
					//~ b.addEventListener('click', function() {
						//~ showNextTab();
					//~ }, false);
				//~ }
				break;
			// AMT___returnAndAcceptButton()
			case 'return_and_accept_button__nextTab':
				AMT__Global_Vars.core.return_accept_run_nextTab = true;
				break;
			case 'return_button__nextTab':
				AMT__Global_Vars.core.return_run_nextTab = true;
				break;
			case 'return_and_accept':
				document.getElementById('MT__gm_returnaccept').click();
				break;
			case 'changeWindowNotifier':
				//alert('here 1');
				if(!localStorage['ChangeWindowCount'])
					localStorage['ChangeWindowCount'] = 0;
				if(localStorage['ChangeWindowCount'] <= v.threshold_to_change)
				{
					localStorage['ChangeWindowCount']++;
				}
				else {
					localStorage['ChangeWindowCount'] = 0;
					document.body.style.backgroundColor = 'silver';
					chrome.extension.sendRequest({play_random_next_sound:true}, function() {/*squelch response*/});
					//~ new AMT___core_factory().nextWindow();
				}
				break;
			
			/**
			 * window.innerHeight
			 * 
			 * If offsetTop > 60 then do not use this
			 * in the calculation.
			 */
			case 'window.innerHeight':
				
				var ifr = document.getElementsByTagName('iframe')[0];
				
				// Get the current offset of the iframe!
				// Usually set by tools.
				var ot = (ifr.offsetTop <= 60) ? ifr.offsetTop : 0;
				//~ console.log('ot' + ot);
				//~ console.log('ih' + window.innerHeight);
				
				// Send response
				ifr.contentWindow.postMessage({
					action: 'window.innerHeight',
					innerHeight: window.innerHeight - ot
				}, '*');
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
	/**
	 * var getReturnButton2
	 * 
	 * @returns Button or false
	 */
	var getReturnButton2 = function() {
		var a = document.getElementById('AMT_return_button_top_window');
		return a;
	}
}

AMT___core_factory.prototype.createScriptVar = function(stringName, defaultValue, isPersistant, expirationDate) {
	if(!expirationDate) {
		expirationDate = new Date().getTime() + 3*3600*1000;
	}
	
	if(AMT__Global_Vars.scriptVars[stringName] == undefined) {
		if(defaultValue == undefined) {
			defaultValue = 0;
		}
		if(isPersistant == undefined) {
			isPersistant = false;
		}
		
		var scriptVar = {
			name: stringName,
			value: defaultValue,
			isPersistant: isPersistant,
			expirationDate: expirationDate,
		}
	
		
		AMT__Global_Vars.scriptVars[stringName] = defaultValue;
		
		setScriptVarObj(scriptVar); 
	}
	else if(!isPersistant) {
		setScriptVar(stringName, 'expirationDate', expirationDate);		
	}
}

//~ function getScriptVar(stringName, callback) {
	//~ if(callback) {
		//~ 
		//~ callback();
	//~ }
//~ }

function setScriptVar(stringName, key, value) {
	chrome.storage.local.get('scriptVars', function(obj) {
		var scriptVars = obj.scriptVars;
		scriptVars[stringName][key] = value;
		chrome.storage.local.set({'scriptVars': scriptVars});
	});
}

function setScriptVarObj(obj) {
	chrome.storage.local.get('scriptVars', function(storageObj) {
		var scriptVars = storageObj.scriptVars;
		scriptVars[obj.name] = obj;
		chrome.storage.local.set({'scriptVars': scriptVars});
	});
}



AMT___core_factory.prototype.iframe2parent__postMessage = function(options) {
	
	//~ console.log(options);
	
	parent.postMessage({
		action: options.action,
		options: options
	}, "*");
	
	//~ setInterval
}
//~ AMT___core_factory.prototype.iframe2parent__addEventListener_return_HIT = function(options, callback_function) {


/**
 * AMT___events_factory
 *
 * @ keydown__blur_field
 * @ mouseup__delete_range   
 * @ mousewheel_zoom_image
 */
function AMT___events_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * 
 * @param element	img: 
 * @param array		img_array: array of elements (optional)
 * @param int		scroll_speed: int, default 0.1
 */
AMT___events_factory.prototype.mousewheel_scroll_image = function(options_object) {
	
	var opts = options_object;
	if (!opts.hasOwnProperty('scroll_speed')) {
		opts.scroll_speed = 12;
	}
	
	if (!opts.img.hasOwnProperty('mousewheel_scroll_image__value')) {
		opts.img.mousewheel_scroll_image = 0;
	}
	
	if (!opts.hasOwnProperty('img_array')) {
		opts.img_array = [img];
	}
	
	for (var i in opts.img_array) {
		opts.img_array[i].addEventListener('mousewheel', function(e) {
			
			if (e.wheelDelta > 0) {		// "120", upward, so take Y axis more negative
				this.style.marginTop = (this.mousewheel_scroll_image * 1 + 12) + 'px';
				this.mousewheel_scroll_image += 10;
			} else {					// "-120", down, so take Y axis higher
				this.style.marginTop = (this.mousewheel_scroll_image * 1 - 12) + 'px';
				this.mousewheel_scroll_image -= 10;
			}
			
			e.preventDefault();
			e.stopPropagation();
			return false;
		}, false);
	}
}
/**
 * 
 * @param element	img: element
 * @param array		img_array: array of elements (optional)
 * @param int		zoom_speed: default 0.1
 * @param int		onclick_reset_zoom: default 1 (NOTE: if not present then no reset is made.)
 */
AMT___events_factory.prototype.mousewheel_zoom_image = function(options_object) {
	
	var opts = options_object;
	if (!opts.hasOwnProperty('zoom_speed')) {
		opts.zoom_speed = 0.1;
	}
	
	if (!opts.hasOwnProperty('img_array')) {
		opts.img_array = [opts.img];
	}
	
	for (var i in opts.img_array) {
		opts.img_array[i].addEventListener('mousewheel', function(e) {
			//~ console.log(e);
			//~ console.log(e.wheelDelta * 1);
			//~ console.log(e.wheelDelta * 1 > 0);
			//~ console.log(this)
			//~ console.log(this.style)
			//~ console.log(this.style.zoom)
			
			if (!this.style.zoom)
				this.style.zoom = 1;
			
			//~ console.log(typeof e.wheelDelta);
			
			if (e.wheelDelta > 0) {		// "120", zoom in
				this.style.zoom = this.style.zoom * 1 + 0.1;
			} else {					// "-120", zoom out
				this.style.zoom = this.style.zoom * 1 - 0.1;
			}
			
			e.preventDefault();
			e.stopPropagation();
			return false;
		}, false);
		
		// add_onclick_reset
		if (opts.hasOwnProperty('add_onclick_reset')) {
			opts.img_array[i].zoom_reset_value = opts.add_onclick_reset;
			//~ opts.img_array[i].onclick = function() {
				//~ this.style.zoom = 1;
			//~ }
			opts.img_array[i].addEventListener('click', function(e) {
				this.style.zoom = this.zoom_reset_value; // 
			}, false);
		}
	}
}
AMT___events_factory.prototype.keydown__blur_field = function(e) {
	var k = e.keyCode;
	console.log(k);
	if (k == 46 || k == 8 || k == 190) {
		var x = this;
		setTimeout(function() {
			x.focus();
			x.blur();
		}, 40);
		return true;
	}
}
/**
 * mouseup__delete_range
 * 
 * @param element		html object
 * @param elements		array, array of html objects
 * 
 * @TODO PAGE.addEventListener. Then watch for the target, or something similar (?), and blur this element.
 * Problem: onmouseup is only registered for el.onmouseup but not for page.onmouseup.
 */
AMT___events_factory.prototype.mouseup__delete_range = function(options_object) {
	
	var options_object = options_object;
	
	if (options_object.hasOwnProperty('element')) {
		add_evl(options_object.element); //single
	} else if (options_object.hasOwnProperty('elements')) {
		for (var i in options_object.elements) {
			add_evl(options_object.elements[i]);
		}
	}
	
	function add_evl(el) {
		var el = el;
		el.addEventListener('mouseup', function() {
			
			// Only run when the selection is not blank.
			//
			//
			if (window.getSelection().toString() == '') return;
			
			var text = this.value;
			
			var new_text = text.substr(0, this.selectionStart) + text.substr(this.selectionEnd);
			this.value = new_text.trim(); // DEFAULT IS TRIM! Add something like options_object.hasOwnProperty('DO_NOT_TRIM') to not trim.
			
			if (options_object.hasOwnProperty('callback')) {
				options_object.callback(options_object);
			} else if (options_object.hasOwnProperty('blur_element')) {
				el.blur();
			}
			
		}, false);
	}
	
}

/**
 * AMT___requests_factory
 *
 * @
 * @ AMT___requests_factory.prototype.scrapy__begin_scrape
 * 
 * @type
 * general_functions__
 * scrapy__
 * io__
 * fs__
 * database__
 * 
 * etc...
 * 
 * xhr_with_disk_cache
 * 
 */
function AMT___requests_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * function xhr_with_disk_cache
 * 
 * URL							(Required. String.)
 * 
 * host							(Optional. String. Default=MT__host, i.e. 192.168.1.2)
 * filename						(Optional. String. If null default=md5(URL))
 * file_folder					(Optional. String. Default=.cached)
 * method						(Optional. String. "get" or "post". Default="get")
 * data							(Optional. String. Used with xhr post.)
 * success_callback				(Optional. Function. Optional but is almost always included.)
 * check_pre_write_to_disk		(Optional. Function. Default=Returns true. Must return true/false. This will test the XHR response prior to disk write.)
 * 
 * 
 * XXX NOT THIS XXX fail_xhr_if_not_200			(Optional. Boolean. Default=True.)
 * 
 * TODO: Add a param that will allow to overwrite the file on disk. Under a) any circumstance; b) if responseText=... And so on.
 */
AMT___requests_factory.prototype.xhr_with_disk_cache = function(options) {
	
	// Verify object params
	//options
	var options = options;
	var verify = verify_opts();
	if (!verify) return; // Quit here if necessary
	
	// Init
	read_from_disk();
	
	/**
	 *
	 */	
	function verify_opts() {
		// URL
		if (!options.hasOwnProperty('URL')) {
			return false;
		}
		var chk = options.URL.trim().toLowerCase();
		if (chk.length < 6 || chk.indexOf('http') == -1) {
			return false;
		}
		// ...
		if (!options.hasOwnProperty('file_folder')) {
			options.file_folder = '.cached';
		}
		if (!options.hasOwnProperty('filename')) {
			options.filename = new AMT___requests_factory().general_functions__md5(options.URL); // md5 URL
		}
		if (!options.hasOwnProperty('host')) {
			options.host = MT___host;
		}
		if (!options.hasOwnProperty('method')) {
			options.method = 'get';
		}
		if (!options.hasOwnProperty('success_callback')) {
			options.success_callback = function() {};
		}
		if (!options.hasOwnProperty('check_pre_write_to_disk')) { // Default=bool_check_write_to_disk
			options.check_pre_write_to_disk = bool_check_write_to_disk;
			//~ options.check_pre_write_to_disk = function() { return true; }; // Default=Returns true
		}
		
		
		//
		options.tmp_response_text = null; // THIS IS ONLY WHEN write_to_file is called. It is only tmp.
		
		// Returns true to begin INIT.
		return true;
		
		// ...
		//~ if (!options.hasOwnProperty('fail_xhr_on_400')) { // Default=Returns true
			//~ options.fail_xhr_on_400 = true;
		//~ }
	}
	/**
	 * 
	 * @param completed_response
	 */	
	function success(completed_response) {
		// options.response
		options.response = {
			response:		response,
			status:			response.status,
			responseText:	response.responseText
		}
		
		// Success callback
		options.success_callback(options);
	}
	/**
	 * function read_from_disk
	 * @desc This will return "___FILE_DOES_NOT_EXIST___" if file does not exist. Then read_from_xhr() will be called.
	 * If file does exist then the file will be returned here and success_callback() will be called.
	 * 
	 */	
	function read_from_disk() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: options.host + '/mturk/util.php?xhr_with_disk_cache__read_from_disk='+encodeURIComponent(JSON.stringify(options))+'&random='+Math.random(),
			onload: function (response) {
				var rs = response.responseText;
				
				if (rs.trim() == '___FILE_DOES_NOT_EXIST___') {
					read_from_xhr();
				} else {
					success(response);
				}
			}
		});
	}
	/**
	 * function read_from_xhr
	 * @desc 
	 * 
	 */	
	function read_from_xhr() {
		if (options.method == 'get') {
			GM_xmlhttpRequest({
				method: 'GET',
				url: options.URL,
				onload: function (response) {
					//~ var rs = response.responseText;
					
					if (options.check_pre_write_to_disk(response)) {
						write_to_disk(response);
					} else {
						return false;
					}
				}
			});
		} else if (options.method == 'post') {
			
		}
	}
	/**
	 * function bool_check_write_to_disk
	 * @desc This callback is to check whether or not to save to disk.
	 * True=write;False=nowrite. Default: !200=False,200=True. Is overwritable.
	 * Function is called after read_from_xhr().
	 */	
	function bool_check_write_to_disk(response) {
		
		//
		// Checks before write to disk go here.
		//
		//
		
		// Status = 200?
		if (response.status != 200) {
			return false;
		}
		
		// Return true if response passes all checks.
		return true;
	}
	/**
	 * function write_to_disk
	 * @desc Post.
	 * 
	 * @param completed_response
	 * 
	 * @NOTE XHR response must be: blank; and 200. 
	 */	
	function write_to_disk(competed_response) {
		var competed_response = competed_response; // Passes into success(competed_response) func.
		options.tmp_response_text = competed_response.responseText; // This is just a tmp var to pass in the responseText without the full response.
		// Make the post request.
		GM_xmlhttpRequest({
			method: "POST",
			url: options.host + '/mturk/util.php',
			data: 'xhr_with_disk_cache__write_to_disk='+encodeURIComponent(JSON.stringify(options))+'&random='+Math.random(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				if (rs.trim() != '') return;
				
				success(competed_response);
			}
		});
	}
}
/**
 * google_api_timezone 
 * 
 * @param options				object
 * @param .lat					float
 * @param .lng					float
 * @param .callback_function	function
 * 
 * @return options.reseponse.offset		integer		Returns the time zone as an integer, offset of UTC. So Eastern would be -5. Pacific would be -8.
 * 
 * NOTE: "The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order:"
 * 
 * E.g.:
 *{
   "dstOffset" : 0,
   "rawOffset" : -28800,
   "status" : "OK",
   "timeZoneId" : "America/Los_Angeles",
   "timeZoneName" : "Pacific Standard Time"
 *}
 */
AMT___requests_factory.prototype.google_api_timezone = function(options) {
	
	var d = new Date();
	var ts = new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/1000; // 1999,0,31=Jan.31,1999
	ts = Math.round(ts);
	
	var u= 'https://maps.googleapis.com/maps/api/timezone/json?location='+options.lat+','+options.lng+'&timestamp='+ts;
	
	u = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u);
	
	// Get next
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function (response) {
			var rs = response.responseText;
			if (response.status != 200) {
				options.callback_function(false);
				return;
			}
			
			// ...
			// rawOffset / 3600s
			rs = JSON.parse(rs);
			if (rs.status != 'OK') {
				console.log('rs.status=' + rs.status);
				options.callback_function(false);
				return;
			}
			
			// This is in Eastern Time Zone
			var curr_local_hour = new Date().getTime();
			
			//~ var curr_local_hour = Date.UTC();
			//~ console.log(new Date(curr_local_hour).getHours()); // This is 0-23 and it is in Eastern Time zone.
			//~ console.log(curr_local_hour);
			//~ console.log(rs.rawOffset);
			
			// Offset by UTC offset + Eastern Time Zone offset
			curr_local_hour += rs.rawOffset*1000 + (5*3600*1000); // seconds to ms
			
			//~ console.log(curr_local_hour);
			
			curr_local_hour = new Date(curr_local_hour).getHours();
			
			//~ console.log(curr_local_hour);
			
			options.response = rs;
			options.response.responseText = response.responseText;
			options.response.offset = Math.round(rs.rawOffset/3600);
			options.response.local_hour = curr_local_hour;
			options.callback_function(options);
		}
	});
}
/**
 * load_precache_urls 
 * 
 * @param options		object
 * @param "".urls_array	object	Array of URLs.
 * 
 * @return Does not return
 */
AMT___requests_factory.prototype.load_precache_urls = function(options) {
	
	var options = options;
	
	load();
	
	function load() {
		
		// Complete?
		if (options.urls_array.length < 1)
			return;
		
		// Get next
		GM_xmlhttpRequest({
			method: 'GET',
			url: options.urls_array.shift(),
			onload: function (response) {
				load();
			}
		});
	}
	
}
/**
 * image_2_OCR 
 */
AMT___requests_factory.prototype.image_2_OCR = function(options_object) {
	
	console.log(options_object);
	
	//AMT__image_2_OCR
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: MT___host + '/mturk/util.php?AMT__image_2_OCR='+encodeURIComponent(JSON.stringify(options_object)), //&AMT__image_2_OCR__options=
		onload: function (response) {
		}
	});
	
	// SET INTERVAL
	options_object.CHECK_COMPLETE = true;
	
	var x_interval = setInterval(function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: MT___host + '/mturk/util.php?AMT__image_2_OCR='+encodeURIComponent(JSON.stringify(options_object))+'&random='+Math.random(),
			onload: function (response) {
				var rs = response.responseText;
				
				if (rs.indexOf('__OCR_COMPLETE__') != -1) {
					clearInterval(x_interval);
					//~ clearInterval(x_interval_init);
					rs = rs.replace(/^__OCR_COMPLETE__/, '');
				} else {
					return;
				}
				
				// Here?
				// RETURN options_object
				// Add response.
				
				options_object.response = response;
				options_object.text = rs;
				
				options_object.callback_function(options_object);
				
				//{response:response, text: rs});
			}
		});
	}, 1000);
}
AMT___requests_factory.prototype.url_to_status_code = function(options_object) {
	
	var options_object = options_object;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: options_object.url,
		onload: function (response) {
			var rs = response.responseText;
			
			options_object.callback_function({status:response.status});
		}
	});
}
AMT___requests_factory.prototype.general_functions__numberFormat__numberWithCommas = function(str) {
	var parts = (str + '').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
AMT___requests_factory.prototype.general_functions__color__io__dominantColor_colorThiefPHP = function(img_url, callback_function) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: MT___host + '/mturk/util.php?AMT__dominantColor_colorThief='+encodeURIComponent(img_url),
		onload: function (response) {
			var rs = response.responseText;
			if (response.status != 200) {
				exit(response.status);
			}
			
			//=array(r: num, g: num, b: num)
			rs = JSON.parse(rs);
			callback_function(rs);
		}
	});
}
/**
 * Converts a color from RGB color space to HSL color space.
 * Modified from {@link http://en.wikipedia.org/wiki/HLS_color_space}.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @return {!Array.<number>} [h, s, l] values for the color, with h an int in
 *    [0, 360] and s and l in [0, 1].
 */
AMT___requests_factory.prototype.general_functions__countryToAbbreviatedCountry = function(country) {
	// MT___countries
	for (var i in MT___countries) {
		if (MT___countries[i].name.toLowerCase().trim() == country.toLowerCase().trim()) {
			return MT___countries[i].code;
		}
	}
	
	// still here?
	// >return false
	return false;
}
AMT___requests_factory.prototype.general_functions__color__rgbToHsl = function(r, g, b) {
	// First must normalize r, g, b to be between 0 and 1.
	var normR = r / 255;
	var normG = g / 255;
	var normB = b / 255;
	var max = Math.max(normR, normG, normB);
	var min = Math.min(normR, normG, normB);
	var h = 0;
	var s = 0;

	// Luminosity is the average of the max and min rgb color intensities.
	var l = 0.5 * (max + min);

	// The hue and saturation are dependent on which color intensity is the max.
	// If max and min are equal, the color is gray and h and s should be 0.
	if (max != min) {
		if (max == normR) {
		  h = 60 * (normG - normB) / (max - min);
		} else if (max == normG) {
		  h = 60 * (normB - normR) / (max - min) + 120;
		} else if (max == normB) {
		  h = 60 * (normR - normG) / (max - min) + 240;
		}

		if (0 < l && l <= 0.5) {
		  s = (max - min) / (2 * l);
		} else {
		  s = (max - min) / (2 - 2 * l);
		}
	}

	// Make sure the hue falls between 0 and 360.
	return [Math.round(h + 360) % 360, s, l];
};
/**
 * Calculates the Euclidean distance between two color vectors on an HSL sphere.
 * A demo of the sphere can be found at:
 * http://en.wikipedia.org/wiki/HSL_color_space
 * In short, a vector for color (H, S, L) in this system can be expressed as
 * (S*L'*cos(2*PI*H), S*L'*sin(2*PI*H), L), where L' = abs(L - 0.5), and we
 * simply calculate the 1-2 distance using these coordinates
 * @param {Array.<number>} hsl1 First color represented by a 3-element array
 *     with hue in range [0, 360], and saturation and luminance values in the
 *     range[0, 1].
 * @param {Array.<number>} hsl2 Second color represented by a 3-element array
 *     with hue in range [0, 360], and saturation and luminance values in the
 *     range[0, 1].
 * @return {number} Distance between the two colors, in the range [0, 1].
 */
AMT___requests_factory.prototype.general_functions__color__hslDistance = function(hsl1, hsl2) {
	var sl1, sl2;
	if (hsl1[2] <= 0.5) {
	  sl1 = hsl1[1] * hsl1[2];
	} else {
	  sl1 = hsl1[1] * (1.0 - hsl1[2]);
	}

	if (hsl2[2] <= 0.5) {
	  sl2 = hsl2[1] * hsl2[2];
	} else {
	  sl2 = hsl2[1] * (1.0 - hsl2[2]);
	}

	var h1 = hsl1[0] / 360.0;
	var h2 = hsl2[0] / 360.0;
	var dh = (h1 - h2) * 2.0 * Math.PI;
	return (hsl1[2] - hsl2[2]) * (hsl1[2] - hsl2[2]) +
	  sl1 * sl1 + sl2 * sl2 - 2 * sl1 * sl2 * Math.cos(dh);
};
//
AMT___requests_factory.prototype.general_functions__color__rgbToHex = function(r, g, b)
{
	var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
//
AMT___requests_factory.prototype.general_functions__color__hexToRGB = function(hex)
{
	var hexToR = function (h) {return parseInt((cutHex(h)).substring(0,2),16)}
	var hexToG = function (h) {return parseInt((cutHex(h)).substring(2,4),16)}
	var hexToB = function (h) {return parseInt((cutHex(h)).substring(4,6),16)}
	var cutHex = function (h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	
	return [hexToR(hex), hexToG(hex), hexToB(hex)];
}
//
AMT___requests_factory.prototype.general_functions__md5 = function(str)
{
	return any_md5(str, '0123456789ABCDEF');
	
	//xxxxx
	//xxxxx
	//xxxxx
	//xxxxx
  //  discuss at: http://phpjs.org/functions/md5/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: utf8_encode
  //   example 1: md5('Kevin van Zonneveld');
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
}
/**
 * 
 * @param: options_object {}
 * @param: .url
 */
// ie http://www.ebay.com/itm/SPEEDO-SWIMMING-GOGGLE-BOOMERANG-MIRRORED-UV-LATES-FREE-ANTI-FOG-SOFT-FLEX-FRAME-/231229466737?pt=LH_DefaultDomain_0
AMT___requests_factory.prototype.ebay__get_listings_page = function(options_object) //
{
	var opts = options_object;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: opts.url,
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status > 200) {
				if (opts.hasOwnProperty('callback_error'))
					opts.callback_error();
				return;
			}
			
			var r;
			opts.result = {
				title: '',
				itemAttributes: ''
			};
			
			r = /<span id="vi-lkhdr-itmTitl" class="u-dspn">((.|\s)*?(?=<\/span>|$)|$)/.exec(rs);
			if (r) {
				r = r[1].replace(/<[^>]*>/g, '').replace(/[<>]/g, '').replace(/\s+/g, ' ');
				r = __js_clean_html_str(r);
				opts.result.title = r;
			}
			
			r = /<div class="itemAttr">((.|\s)*?(?=<\/div>[\r\n]+			<\/div>|$)|$)/.exec(rs);
			if (r) {
				opts.result.itemAttributes = r[1].trim();
			}
			
			opts.callback_success(opts);
		}
	});
}
// google_search
AMT___requests_factory.prototype.google_search = function(options_object) //
{
	
	var opts = options_object;
	
	var u;
	if (opts.hasOwnProperty('query')) {
		u = 'https://www.google.com/search?'+
			'q='+encodeURIComponent(opts.query);
	} else if (opts.hasOwnProperty('url')) {
		u = opts.url;
	}
		//~ '&aqs=chrome..69i57.791j0j7'+
		//~ '&sourceid=chrome&es_sm=93&ie=UTF-8';
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status > 200) {
				if (opts.hasOwnProperty('callback_error'))
					opts.callback_error();
				return;
			}
			// else if (/captcha/.exec(rs)) {
			//	document.body.style.backgroundColor = 'pink';
			//	return;
			//}
			
			var r;
			r = /<h3 class="r"><a href="([^"]+)[^>]*>((.|\s)*?(?=<!--n-->|$)|$)/g;
			var count = 0;
			
			// RESULTS array
			opts.results = [];
			
			// ...
			if (r.exec(rs)) {
				r.lastIndex = 0;
				while (m = r.exec(rs)) {
					
					m[1] = __js_clean_html_str(m[1]);
					
					//if (/^https?:\/\/([^\.]+\.|)google\./i.exec(m[1]))
					//	continue;
					
					// replace "harm your comp."
					m[1] = m[1].replace(/^\/interstitial\?url=/, '');
					
					// google.com
					if (/^\//i.exec(m[1]))
						continue;
					
					//
					//
					//
					m[2] = m[2].replace(/<b>/g, '`');
					m[2] = m[2].replace(/<\/b>/g, '``');
					m[2] = m[2].replace(/<[^>]+>/g, ' ');
					m[2] = m[2].replace(/[<>]/g, ' ');
					m[2] = m[2].replace(/``/g, '</b>');
					m[2] = m[2].replace(/`/g, '<b>');
					
					// Assoc. array
					// 0 = URL
					// 1 = Body
					opts.results.push(
						[
							m[1],
							m[2]
						]
					);
				}
			}
			
			opts.callback_success(
				opts
			);
		}
	});
}
/**
 * function .linkedin_people_search
 * 
 * @params :
 * : container = div element, append all elements to this
 * : search_params = {}
 * 		searches['search-key'] = value
 * 		Where search-key = first name, last name, company, zip code, find zip (find zip code from location), job title
 * 		This corresponds to the left-side inputs, typically d2a,d2b,d2c,d2d, etc.
 * : callback_function
 * : image_search : boolean (t,f)
 * : nextTab : boolean (t,f), call nextTab() on mouse click
 * : sortResults : boolean, sort by people by connectionCount
 * 
 * NOTES: companyScope and/or titleScope must follow company and title, respectively.
 * Features:
 * 	ef.mouseup__delete_range({
			element: d2,
			callback: function(input_object) {
				input_object.element.blur();
			}
		});
 */
AMT___requests_factory.prototype.linkedin_people_search = function(ps_object) //
{
	
	//
	var ps_object = ps_object;
	
	// retrieve_fields
	// ...Defaults
	// retrieve_fields: Any of "profile_url,found_valid_li_url,image_thumbnail_url,image_full_url,image,image_full_url"
	if (!ps_object.hasOwnProperty('retrieve_fields')) {
		ps_object.retrieve_fields = {};
	}
	/*BEGIN ITEMS*/
	//
	var div_cx_l;
	div_cx_l = document.createElement('div');
	div_cx_l.setAttribute('style','float:left;width:30%;height:98%;border:1px solid blue;background-color:#eee;overflow:auto;');
	ps_object.container.appendChild(div_cx_l);
	//
	var div_cx_r;
	div_cx_r = document.createElement('div');
	div_cx_r.setAttribute('style','float:left;width:68%;height:98%;border:1px solid blue;background-color:#eee;overflow:auto;');
	ps_object.container.appendChild(div_cx_r);
	//
	var div_cx_debug;
	div_cx_debug = document.createElement('div');
	div_cx_debug.setAttribute('style','border-top:1px solid blue;overflow:auto;');
	
	
	//~ ps_object.container.appendChild(div_cx_debug);
	
	//
	//~ var div_cx_status; //?
	//~ div_cx_r = document.createElement('div');
	//~ div_cx_r.setAttribute('style','float:left;width:30%;height:30%;border:1px solid blue;background-color:#eee;overflow:auto;');
	//~ document.body.appendChild(div_cx_r);
	//~ var b_cx = document.createElement('br');
	//~ b_cx.setAttribute('style', 'clear:both;');
	//
	/*END ITEMS*/
	
	var o = {
		cx_elements: [],
		
		// bolds
		bold_nm_array:		[],
		bold_comp_array:	[],
		bold_title_array:	[],
		
		// New
		bold_locn_array:	[]
		
	};
	
	
	// Keydown
	// & mouseup__delete_range
	var ef = new AMT___events_factory();
	
	// Append the inputs that are search controllers
	var sp = ps_object.search_params;
	for (var input_name in sp) {
		var input_value = sp[input_name];
		
		var found = false;
		switch(input_name) {
			case 'firstName':
				found = true;
				var d;
				d = document.createElement('textarea');
				d.setAttribute('style', 'width:99%;height:40px;');
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// bolds
				o.bold_nm_array = o.bold_nm_array.concat(input_value.clean_string_to_array()); // Rather than ".split(' ')"
				break;
			case 'lastName':
				found = true;
				var d;
				d = document.createElement('textarea');
				d.setAttribute('style', 'width:99%;height:40px;');
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// bolds
				o.bold_nm_array = o.bold_nm_array.concat(input_value.clean_string_to_array());
				break;
			case 'title':
				found = true;
				var d;
				d = document.createElement('textarea');
				d.setAttribute('style', 'width:99%;height:40px;');
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// bolds
				o.bold_title_array = o.bold_title_array.concat(input_value.clean_string_to_array());
				break;
			case 'company':
				found = true;
				var d;
				d = document.createElement('textarea');
				d.setAttribute('style', 'width:99%;height:40px;');
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// bolds
				o.bold_title_array = o.bold_title_array.concat(input_value.clean_string_to_array());
				break;
			case 'location': // location (general)
				found = false; // Does not show.
				var d = document.createElement('input'); // Hidden
				d.type = 'hidden';
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// bolds
				o.bold_locn_array = o.bold_locn_array.concat(input_value.clean_string_to_array());
				break;
				
			// Hidden elements
			//
			//
			case 'titleScope': // scope
				found = false; // not this
				var d;
				d = document.createElement('input');
				d.type = 'hidden';
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// set value here
				d.value = input_value;
				break;
			case 'companyScope': // scope
				found = false; // not this
				var d;
				d = document.createElement('input');
				d.type = 'hidden';
				d.cx_id = input_name;
				div_cx_l.appendChild(d);
				
				// push
				o.cx_elements.push(d);
				
				// set value here
				d.value = input_value;
				break;
		}
		if (found) {
			d.value = input_value;
			d.addEventListener('keydown', ef.keydown__blur_field, true);
			d.onblur = function() {
				this.value = this.value.trim();
				linkedin_people();
			}
			// Delete by range!
			ef.mouseup__delete_range({
				element: d,
				callback: function(input_object) {
					input_object.element.blur();
				}
			});
		}
	}
	
	// Overwrite bold_title_array
	if (ps_object.hasOwnProperty('bold_array_comp')) {
		o.bold_title_array = ps_object.bold_array_comp;
	}
	
	// Place all input into debug div
	// div_cx_debug
	//
	div_cx_l.appendChild(div_cx_debug);
	for (var input_name in sp) {
		var input_value = sp[input_name];
		
		//~ div_cx_debug.innerText += input_name + ':' + input_value + '\n';
		
		var inp = document.createElement('input');
		inp.setAttribute('style', 'background-color:none;border:0;width:30%;');
		inp.value = input_name;
		inp.disabled = true;
		div_cx_debug.appendChild(inp);
		
		div_cx_debug.appendChild(document.createTextNode(' '+input_value));
		div_cx_debug.appendChild(document.createElement('br'));
	}
	
	// init
	//
	//
	AMT___POPUP__initializeGlobals(
		linkedin_people
	);
	
	// ...
	function linkedin_people() {
		
		var out;
		out = div_cx_r;
		
		var url;
		url = 'http://www.linkedin.com/vsearch/pj?openAdvancedForm=true&pt=people&locationType=I';
		
		// Generate the URL
		var sp = o.cx_elements;
		for (var i in sp) {
			var element = sp[i];
			var input_name = element.cx_id;
			var input_value = element.value;
			//~ console.log(input_name);
			//~ console.log(input_value);
			
			
			switch (input_name) {
				case 'firstName':
					if (input_value != '')
						url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				case 'lastName':
					if (input_value != '')
						url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				case 'title':
					if (input_value != '')
						url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				case 'company':
					if (input_value != '')
						url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				
				// Hidden elements
				//
				//
				case 'titleScope': // CP = current or past
					//~ if ()
					url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				case 'companyScope': // CP = current or past
					// Only if url.indexOf
					if (url.indexOf('&company=') != -1)
						url += '&' + input_name + '=' + encodeURIComponent(input_value);
					break;
				case 'location': // Location general. Do nothing with this.
					break;
			}
		}
		
		// Set out.innerHTML
		out.innerHTML = '';
		
		
		// Is cached?
		//
		//
		var rf = new AMT___requests_factory();
		var md5_url = any_md5(url, '0123456789ABCDEF');
		GM_xmlhttpRequest({
			method: "GET",
			url: MT___host + '/mturk/.cached/'+md5_url,
			onload: function(response) {
				var rs = response.responseText;
				
				if (response.status == 200 && 0==1) {
					linkedin_people__processQuery({rs: rs});
					return;
				}
				
				// Still here?
				GM_xmlhttpRequest({
					method: "GET",
					url: url,
					onload: function(response) {
						var rs = response.responseText;
						
						if (response.status != 200) {
							out.innerHTML = response.status;
							return;
						}
						
						var r;
						r = JSON.parse(rs);
						//console.log(r);
						
						if (r.status != 'ok') return;
						if (!r.content) {
							return;
						}
						// Write to file !
						rf.io__write_to_file(
							{
								data:	'AMT__serverSide_write__value='+encodeURIComponent(response.responseText)+
										'&AMT__serverSide_write__folder=.cached'+
										'&AMT__serverSide_write__file=' + md5_url,
								rs:		response.responseText,
								host:	MT___host
							},
							linkedin_people__processQuery
						);
						
					}
				});
			}
		});
		
		
		
		
		//~ url+= '&company='+encodeURIComponent(d2c.value.trim());
		//~ url+= '&companyScope=CP'; // CP scope is current/past
		//~ url+= '&firstName='+encodeURIComponent(d2.value.trim());
		//~ url+= '&lastName=' +encodeURIComponent(d2b.value.trim());
		//~ //url+= '&keywords='+encodeURIComponent(d2.value.trim());
		//~ url+= '&pt=people';
		//~ url+= '&locationType=I';
		//~ url+= '&openAdvancedForm=true';
		//~ url+= '&countryCode='+encodeURIComponent(d2e.value); //?
		//~ 
		//~ if (d2d.style.border != '') {
			//~ url += '&postalCode='+encodeURIComponent(d2d.value);
			//~ url += '&distance=200';
			//~ url += '&countryCode='+encodeURIComponent(d2e.value);
		//~ } else {
			//~ url += '&countryCode='+encodeURIComponent(d2e.value);
		//~ }
	}
	
	/**
	 * function linkedin_people__processQuery
	 */
	function linkedin_people__processQuery(write_object) {
		
		var out;
		out = div_cx_r;
		
		var sp = o.cx_elements;
		for (var i in sp) {
			var element = sp[i];
			//~ var input_name = element.cx_id;
			var input_value = element.value;
			out.innerText += input_value + '\n';
		}
		
		var r;
		r = JSON.parse(write_object.rs);
		if (r.status != 'ok') return;
		if (!r.content) {
			return;
		}
		if (r.content.page.voltron_unified_search_json.search.results.length == 0) {
			div_cx_r.innerText += '0';
			//~ if (AMT__Global_Vars.isPreview) {
				//~ AMT___Floater.skip();
			//~ }
			return;
		}
		
		//~ // still here?
		//~ if (AMT__Global_Vars.isPreview) { // PREVIEW ?
			//~ AMT___Floater.accept();
			//~ return;
		//~ }
		
		if (r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n)
			out.innerHTML = r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n.replace(/<[^>]+>/g, '') + '<br>';
		else
			out.innerHTML = r.content.page.voltron_unified_search_json.search.results_count_without_keywords_i18n.replace(/<[^>]+>/g, '') + '<br>';
			
		
		var x = r.content.page.voltron_unified_search_json.search.results;
		console.log(x);
		
		var snp,s;
		var y;
		
		console.log(o);
		
		// Is it desirable to sort by the number of connections?
		// 
		//
		if (ps_object.sortResults) {
			x = x.sort(function(a, b) {
				return b.person.connectionCount - a.person.connectionCount;
			});
		}
		//~ if () {
			//~ var y = y;
			//~ 
			//~ for (var i in x) {
			//~ 
			//~ if (!x[i].hasOwnProperty('person'))
				//~ continue;
				//~ 
		//~ }
		
		//var auto_click_inp = false;
		for (var i in x) {
			
			if (!x[i].hasOwnProperty('person'))
				continue;
			
			y = x[i].person;
			
			//~ console.log(y); // this person
			
			if (y.hasOwnProperty('snippets')) {
				snp = y.snippets;
				s = '';
				var heading;
				var fmt_body;
				if (snp.length) {
					for (var j in snp) {//console.log(snp[j]);
						heading = false;
						fmt_body = false;
						
						s += '<br>';
						s += snp[j].fieldName + ': ';
						
						if (snp[j].hasOwnProperty('bodyList') && snp[j].bodyList.length) {
							for (var k in snp[j].bodyList) {
								s += snp[j].bodyList[k] + ' | ';
							}
						} else if (snp[j].hasOwnProperty('fmt_heading') && snp[j].fmt_heading.trim() != '') {
							s += snp[j].fmt_heading;
						} else {
							s += snp[j].fmt_body;
						}
					}
				} else snp = '';
			} else  snp = '';
			s = s.replace(/<hr>/g, '')
			s = s.replace(/^<br>/g, '')
			
			//~ console.log('locn');
			//~ console.log(y);
			//~ console.log(y.fmt_location);
			
			y.fmt_headline = y.fmt_headline.replace(/<\/?strong[^>]*>/gi, '');
			y.fmt_headline = y.fmt_headline.replace(/<\/?b[^>]*>/gi, '');
			y.fmt_location = y.fmt_location.replace(/<\/?strong[^>]*>/gi, '');
			y.fmt_location = y.fmt_location.replace(/<\/?b[^>]*>/gi, '');
			
			var z;
			var headline;
			var et, ec;
			
			y.fmt_headline = __js_clean_html_str(y.fmt_headline.replace(/<[^>]*>/g, '').replace(/[<>]/g, ''));
			z = y.fmt_headline;
			
			var headline_match = false;
			if (z.indexOf(' at ') != -1) {
				z = /^((.|\s)*?(?= at ([\d\D]+)|$)|$)/.exec(z);
				if (z && / at /gi.exec(y.fmt_headline).length === 1) {
					et = MT__bold(z[1], o.bold_title_array);
					ec = MT__bold(z[3], o.bold_title_array);
					headline = '\
						<input style="width:12px;text-align:left;background-color:transparent;border:0;border-right:1px solid #3a3a3a;" value="T" >\
						<div class="exe-title" style="display:inline;">\
							 \
						</div>\
						<br >\
						<input style="width:12px;text-align:left;background-color:transparent;border:0;border-right:1px solid #3a3a3a;" value="C" >\
						<div class="exe-comp" style="display:inline;">\
							 \
						</div>\
						<br >\
						';
					headline_match = true;
				}
			}
			if (!headline_match) {
				et = y.fmt_headline;
				et = MT__bold(et, o.bold_title_array);
				et = MT__bold(et, o.bold_title_array);
				ec = '';
				headline = '\
					<input style="width:12px;text-align:left;background-color:transparent;border:0;border-right:1px solid #3a3a3a;" value="T" >\
					<div class="exe-title" style="display:inline;">\
						 \
					</div>\
					<div class="exe-comp" style="display:none;">\
						 \
					</div>\
					<br >\
					';
				
			}
			headline += '\
				<div class="exe-headline" style="display:none;">\
					 \
				</div>';
			
			
			
			var dv = document.createElement('div');
			dv.setAttribute('style', 'border-bottom:1px solid teal;');
			dv.className = 'exe-div';
			
			var el_a = document.createElement('a');
			el_a.setAttribute('style', 'position:relative;display:inline-block;margin-left:200px;');
			el_a.target    = 'new_win';
			el_a.innerText = ' LINK';
			el_a.href = y.link_nprofile_view_3;
			dv.appendChild(el_a);
			//"https://www.linkedin.com/profile/view?id=15329492&authType=NAME_SEARCH&authToken=sKun&locale=en_US&srchid=2041448321402183517267&srchindex=1&srchtotal=57&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A2041448321402183517267%2CVSRPtargetId%3A15329492%2CVSRPcmpt%3Aprimary"
			
			var el_div = document.createElement('div');
			//~ el_div.setAttribute('style', 'display:inline;');
			el_div.innerHTML = MT__bold(y.firstName + ' ' + y.lastName, o.bold_nm_array);
			dv.appendChild(el_div);
			
			//~ dv.appendChild(document.createElement('br'));
			
			var el_div = document.createElement('div');
			el_div.setAttribute('style', '');
			el_div.innerHTML = headline;
			dv.appendChild(el_div);
			
			var el_inp = document.createElement('input');
			el_inp.setAttribute('style', 'width:12px;text-align:left;background-color:transparent;border:0;border-right:1px solid #3a3a3a;');
			el_inp.value = 'L';
			dv.appendChild(el_inp);
			dv.appendChild(
				MT__bold(' '+y.fmt_location, o.bold_locn_array).div(
					{style: 'display:inline;', innerHTML: true}
				)
			)
			
			//~ /*
			 //~ * Location
			 //~ * This uses create_annotation_to_output_fields
			 //~ */
			//~ var el_div = document.createElement('div');
			//~ el_div.setAttribute('style', 'display:inline');
			//~ el_div.className = 'exe-locn';
			//~ dv.appendChild(el_div);
			//~ //
			//~ el_div.appendChild(
				//~ Seth_Redmore_linkedin_people_location__makeButtons(y.fmt_location)
			//~ )
			
			dv.appendChild(document.createElement('br'));
			
			if (s != '') {
				var el_div = document.createElement('div');
				el_div.setAttribute('style', 'border-bottom:1px solid teal;');
				el_div.innerHTML = s;
				dv.appendChild(el_div);
			}
			
			if (y.hasOwnProperty('connectionCount')) {
				var btn = document.createElement('input');
				btn.setAttribute('type','button');
				btn.setAttribute('class','exe-connections');
				btn.setAttribute('style','width:auto;text-align:left;background-color:transparent;border:0;border-right:1px solid #3a3a3a;');
				btn.id = '';
				btn.value = y.connectionCount;
				dv.appendChild(btn);
				dv.appendChild(document.createElement('br'));
			}
			
			//https://www.linkedin.com/profile/view?id=15329492
			
			// If not an image search
			if (!ps_object.hasOwnProperty('image_search')) {
				var btn = document.createElement('input');
				btn.setAttribute('type','button');
				btn.setAttribute('class','exe');
				btn.setAttribute('style','width:30px;height:30px;');
				//~ btn.id = 'http://linkedin.com'+y.link_nprofile_view_3; // OLD !!
				btn.url_li = y.link_nprofile_view_3;
				btn.value = 'Title';
				dv.appendChild(btn);
			}
			// If it is an image search
			// XXFull = /media/ == /media/p/2/000/2cb/2f3/2e5ee90.jpg
			// Thumb = /mpr/mpr/shrink_60_60/ == /mpr/mpr/shrink_60_60/p/2/000/2cb/2f3/2e5ee90.jpg
			// Full = https://media.licdn.com/media/p/2/000/1a3/226/1edc521.jpg
			else {
				var btn = document.createElement('img');
				btn.setAttribute('style','width:150px;height:30px;cursor:pointer;');
				btn.url_li = y.link_nprofile_view_3;
				dv.appendChild(btn);
				
				if (y.hasOwnProperty('imageUrl')) {
					//
					
					btn.src = 'http://www.linkedin.com/mpr/mpr/shrink_60_60' + y.imageUrl;
					btn.img_li = 'https://media.licdn.com/media' + y.imageUrl;
					btn.style.width = '60px';
					btn.style.height = '60px';
				} else {
					btn.img_li = null;
				}
			}
			
			/**
			 * Result .onclick
			 * This is a callback, ps_object.callback_function
			 * and ps_object.image_search
			 */
			// onclick
			// THIS WILL SCRAPE THE PROFILE !!
			// HOWEVER, MAKE THE BUTTONS FOR THE LOCATION USING "y.fmt_location" **IF POSSIBLE**
			btn.onclick = function() {
				
				// Go to nextTab()
				// 
				//
				if (ps_object.hasOwnProperty('nextTab')) {
					new AMT___core_factory().nextTab();
				}
				
				// If not an image search
				if (!ps_object.hasOwnProperty('image_search') || !ps_object.image_search) {
					this.style.border = '4px solid LightGreen';
					linkedin_people_location__profile(this); // But not...this.url_li
				}
				// If it is an image search
				// Click 1 = ...
				// CHECK ps_object.retrieve_fields (New Jan16 2015)
				else {
					this.style.border = '4px solid LightGreen';
					
					if (ps_object.retrieve_fields.hasOwnProperty('image_full_url')) {
						ps_object.callback_function({ // SEND BACK ABBREVIATED!
							image_thumbnail_url: this.src,
							image_full_url: this.img_li,
							image: this
						});
					} else {
						linkedin_people_location__profile_image(this);
					}
				}
			}
			
			out.appendChild(dv);
			
			var z = out.getElementsByClassName('exe-div');
			z = z[z.length - 1];
			
			//~ z.getElementsByClassName('exe-locn')[0].innerHTML		= y.fmt_location; //MT__bold(y.fmt_location, o.locn_array);
			z.getElementsByClassName('exe-title')[0].innerHTML		= et;
			z.getElementsByClassName('exe-comp')[0].innerHTML		= ec;
			z.getElementsByClassName('exe-headline')[0].innerHTML	= y.fmt_headline;
			
		}
		
		var div = document.createElement('div');
		div.setAttribute('style','height:1600px;');
		out.appendChild(div);
	}
	/**
	 * function linkedin_people_location__profile_image
	 * 
	 * @returns
	 * 					.profile_url			url,
	 *					.found_valid_li_url		found_valid_li_url,
	 *					.image_thumbnail_url		btn.src,
	 *					.image_full_url		btn.img_li,
	 *					.image				btn
	 */
	function linkedin_people_location__profile_image(btn) {
		
		var btn = btn;
		
		// USE .SCRAPE()
		new AMT___site_scrapes().scrape({
			site: 'LINKEDIN_PROFILE',
			url: btn.url_li,
			callback_function: function(options) {
				
				// Error?
				var err = options.response.vars.error;
				if (err != null) {
					var pn = btn.parentNode;
					pn.style.border = '8px solid pink';//innerText += errType;
					pn.innerText += '\n' + err;
					return;
				}
				
				var result = options.response.vars.result;
				var pu = btn.url_li; // Default=Searched Profile URL
				var found_valid = false; // Default=False
				
				//profile_has_public_url: null,
				//public_url: null,
				
				if  (
					result.profile_has_public_url != null &&
					result.public_url != null
					)
				{
					pu = result.public_url;
					found_valid = true;
				}
				
				// CALLBACK FUNCTION
				// Object
				//
				//
				ps_object.callback_function({
					profile_url: pu,
					found_valid_li_url: found_valid,
					image_thumbnail_url: btn.src,
					image_full_url: btn.img_li,
					image: btn
				});
				
			}
		});
		
		
		
		//~ GM_xmlhttpRequest({
			//~ method: "GET",
			//~ url: btn.url_li,
			//~ onload: function(response) {
				//~ var rs = response.responseText;
				//~ 
				//~ if (response.status != 200) {
					//~ div_cx_r.innerHTML = response.status;
					//~ return;
				//~ }
				//~ 
				//~ // URL
				//~ // Default is btn.url_li
				//~ var url = btn.url_li;
				//~ var found_valid_li_url = false;
				//~ 
				//~ // Dashes
				//~ rs = rs.replace(/\\u002d/g, '-');
				//~ 
				//~ // topcard
				//~ var found = false;
				//~ r = /<code id="top_card-content" style="display:none;"><!--\{((.|\s)*?(?=\}--><\/code>|$)|$)/.exec(rs);
				//~ if (r) {
					//~ r = JSON.parse('{'+r[1]+'}');
					//~ r = r.content;
					//~ console.log(r);
					//~ 
					//~ if (r.TopCard && r.TopCard.public_url && r.TopCard.public_url.canonicalUrl) {
						//~ url = r.TopCard.public_url.canonicalUrl;
						//~ if (/^https?:\/\/(\w+\.|)linkedin\.com\/(pub|in)\//.exec(url)) {
							//~ found_valid_li_url = true;
						//~ }
						//~ found = true;
					//~ }
				//~ }
				//~ if (!found) {
					//~ var r2;
					//~ if (r2 = /"public_url":\{("deferImg":[^,]*,|)"canonicalUrlToShow":"[^"]+","canonicalUrl":"([^"]+)","showPublicProfileURL":true\}/.exec(rs)) {
						//~ url = __js_clean_html_str(r2[1]).trim();
						//~ if (/^https?:\/\/(\w+\.|)linkedin\.com\/(pub|in)\//.exec(url)) {
							//~ found_valid_li_url = true;
						//~ }
					//~ }
				//~ }
				//~ 
				//~ // CALLBACK FUNCTION
				//~ // Object
				//~ //
				//~ //
				//~ ps_object.callback_function({
					//~ profile_url: url,
					//~ found_valid_li_url: found_valid_li_url,
					//~ image_thumbnail_url: btn.src,
					//~ image_full_url: btn.img_li,
					//~ image: btn
				//~ });
			//~ }
		//~ });
	}
	function linkedin_people_location__profile(u) {
		
		// Global
		var u = u;
		
		GM_xmlhttpRequest({
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				
				if (response.status != 200) {
					div_cx_r.innerHTML = response.status;
					return;
				}
				
				// URL
				// Default is btn.url_li
				var url = u;
				var found_valid_li_url = false;
				
				// Dashes
				rs = rs.replace(/\\u002d/g, '-');
				
				// topcard
				var found = false;
				r = /<code id="top_card-content" style="display:none;"><!--\{((.|\s)*?(?=\}--><\/code>|$)|$)/.exec(rs);
				if (r) {
					r = JSON.parse('{'+r[1]+'}');
					r = r.content;
					console.log(r);
					
					if (r.TopCard && r.TopCard.public_url && r.TopCard.public_url.canonicalUrl) {
						url = r.TopCard.public_url.canonicalUrl;
						if (/^https?:\/\/(\w+\.|)linkedin\.com\/(pub|in)\//.exec(url)) {
							found_valid_li_url = true;
						}
						found = true;
					}
				}
				if (!found) {
					var r2;
					if (r2 = /"public_url":\{("deferImg":[^,]*,|)"canonicalUrlToShow":"[^"]+","canonicalUrl":"([^"]+)","showPublicProfileURL":true\}/.exec(rs)) {
						url = __js_clean_html_str(r2[1]);
						if (/^https?:\/\/(\w+\.|)linkedin\.com\/(pub|in)\//.exec(url)) {
							found_valid_li_url = true;
						}
						found = true;
					}
				}
				// Sometimes this happens...
				//<dt>Public Profile</dt><dd><span class="view-public-profile">www.linkedin.com/pub/samuel-freitag/15/498/a46</span></dd>
				if (!found) {
					if (r2 = /<dt>Public Profile<\/dt><dd><span class="view-public-profile">([^<]+)<\/span><\/dd>/.exec(rs)) {
						url = (r2[1].indexOf('http') != 0) ? 'http://' + __js_clean_html_str(r2[1]) : __js_clean_html_str(r2[1]);
						if (/^https?:\/\/(\w+\.|)linkedin\.com\/(pub|in)\//.exec(url)) {
							found_valid_li_url = true;
						}
						found = true;
					}
				}
				
				// CALLBACK FUNCTION
				// Object
				//
				//
				ps_object.callback_function({
					profile_url: url,
					found_valid_li_url: found_valid_li_url
				});
			}
		});
	}
}
//
AMT___requests_factory.prototype.linkedin_company_search = function(cs_object, callback_func) //
{
	var kw = cs_object.keywords;
	u = 'http://www.linkedin.com/vsearch/cj'+
		'?type=companies'+
		'&keywords='+encodeURIComponent(kw)+
		'&orig=FCTD'+
		'&rsid='+
		'&pageKey=voltron_company_search_internal_jsp';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		//~ url: MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u),
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status != 200)
				return;
			
			var r;
			
			//console.log(rs);
			r = JSON.parse(rs);
			
			
			var x = r.content.page.voltron_unified_search_json.search.results;
			var y;
			if (r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n)
				y = r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n.replace(/<[^>]+>/g, '');
			else
				y = r.content.page.voltron_unified_search_json.search.results_count_without_keywords_i18n.replace(/<[^>]+>/g, '');
			
			callback_func({results:x, results_count:y, result: r});
		}
	});
}
//
AMT___requests_factory.prototype.scrapy__cancel_job = function(jobid, timeout) //
{
	var jobid = jobid;
	setTimeout(function() {
		//$ curl http://localhost:6800/cancel.json -d project=myproject -d job=6487ec79947edab326d6db28a2d86511e8247444
		GM_xmlhttpRequest({
			method: 'POST',
			url: AMT___POPUP___PROXY_REDACTED_+':6800/cancel.json', //http://localhost
			data: 'project=scrapy_amt&job='+encodeURIComponent(jobid),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function (response) {
				var rs = response.responseText;
				console.log(rs);
				//clearInterval(interval);
			}
		});
	}, timeout);
}
/**
 * 
 * 
 * @callback_function:
 * Returns 
 * 		1) scrapyd jobid,
 * 		2) response_object,
 * 		3) seed_object 
 * 
 * Necessary to deploy scrapy_amt project ... ...
 * 1) ./home/share/Development/scrapy/start_scrapyd.sh
 * 2) cd /home/share/Development/scrapy/scrapy_amt && scrapyd-deploy
 */
// TODO
// XXDONE Jun4 2014: MATCH "DOMAIN.COM" WITH "JOBID.JL" FOR CACHED FUTURE REQUESTS!
AMT___requests_factory.prototype.scrapy__begin_scrape = function(parameters_object, callback_function, seed_object) //
{
	/*
	http://localhost:6800/schedule.json -d project=scrapy_amt -d spider=AMTSpider -d setting=DEPTH_LIMIT=4 -d setting=SCHEDULER_ORDER=BFO -d arg_start_urls="http://www.hillsboroughcountynh.org/hr/doc.txt" -d arg_allowed_domains="hillsboroughcountynh.org" -d arg_max_pages_to_fetch=40
	*/
	
	var callback_function = callback_function;
	var seed_object = seed_object;
	
	var data = '';
	var ampersand = '';
	for (var i in parameters_object) {
		if (data != '')
			ampersand = '&';
		
		var value = parameters_object[i];
		// If arrays
		// arg_allowed_domains, arg_start_urls, settings
		// not a string AND not a number!
		if (typeof parameters_object[i] != 'string' && typeof parameters_object[i] != 'number') {
			if (i == 'arg_allowed_domains' || i == 'arg_start_urls') {
				data += ampersand + encodeURIComponent(i) + '=' + encodeURIComponent(JSON.stringify(value));
			} else if (i == 'settings') {
				for (var j in value) {
					//data += ampersand + 'setting=' + value[j];
					
					data += ampersand + 'setting=' + encodeURIComponent(value[j]);
				}
			}
			continue;
		}
		// Here? Must be strings.
		data += ampersand + encodeURIComponent(i) + '=' + encodeURIComponent(value);
	}
	
	// DEBUG
	//~ console.log(data);
	//~ console.log(data.split('&').join(' -d '));
	//~ console.log(data.split('&').join(' -a '));
	
	/** Function scrapy__begin_scrape__process_completed
	 * @param: input_object
	 * @param: input_object.rs
	 * @param: input_object.seed_object
	 * @param: input_object.seed_object.callback__scrapy__begin_scrape__process_completed
	 * 
	 * @desc: helper function
	*/
	function scrapy__begin_scrape__process_completed( input_object ) {
		
		// callback_function(jobid, callback_obj, seed_object);
		//~ console.log(input_object);
		
		var rs = input_object.rs;
		var seed_object = input_object.seed_object;
		//~ var jobid = input_object.jobid;
		
		// obj
		// urls is: {"urls_priority": "none", "urls_url": "http://www.crossfitsolcity.com/sign-up/"}
		var obj = rs.trim().split("\n");
		var callback_obj = {
			urls: {
				high	:[],
				low		:[],
				none	:[],
				outside	:[],
				complete_high_to_low : [] // inclues all: high, low, none, outside
			},
			matches: []
		}
		if (obj.length) {
			for (var i in obj) {
				if (obj[i].trim().length == 0)
					continue;
				obj[i] = JSON.parse(obj[i]);
				if (obj[i].email_contexts)	// is email context
				{
					obj[i].email_contexts = JSON.parse(obj[i].email_contexts);
				}
				if (obj[i].urls_url)	// is url
				{ 
					switch (obj[i].urls_priority) {
						case 'high':
							callback_obj.urls.high.push(obj[i]);
							break;
						case 'low':
							callback_obj.urls.low.push(obj[i]);
							break;
						case 'none':
							callback_obj.urls.none.push(obj[i]);
							break;
						case 'outside':
							callback_obj.urls.outside.push(obj[i]);
							break;
					}
				}
				if (obj[i].email_email)
					callback_obj.matches.push(obj[i]);
				//~ if (callback_obj.matches.length)
				//~ else 						// is match
				//~ {
					//~ callback_obj.matches.push(obj[i]);
				//~ }
			}
		}
		// Make complete urls (high to none/outside)
		// is {} object
		// high, low, none, outside, (complete_high_to_low)
		for (var tmp_priority in callback_obj.urls) {
			for (var j in callback_obj.urls[tmp_priority]) {
				if (j == 'complete_high_to_low') continue;
				
				callback_obj.urls.complete_high_to_low.push({
					url		 : callback_obj.urls[tmp_priority][j].urls_url,
					priority : tmp_priority
				});
			}
		}
		
		// Temp callback function?
		if (seed_object.callback__scrapy__begin_scrape__process_completed) {
			
			var x = seed_object.callback__scrapy__begin_scrape__process_completed(callback_obj);
			
			if (x) { // RESPONSE IS FALSE(CONTINUE), TRUE(END SCRIPT PROCESSING)
				return;
			}
		}
		
		//
		// max powers
		//
		//~ console.log(callback_obj);
		
		// Changed to
		// (callback_obj, seed_object)
		// from
		// (jobid, callback_obj, seed_object)
		//
		callback_function(callback_obj, seed_object);
		
		//~ callback_function(jobid, callback_obj, seed_object);
		
	}
	
	// CACHE !! //
	var rf		= new AMT___requests_factory();
	var md5_url	= any_md5(data, '0123456789ABCDEF'); //rf.general_functions__md5(data);//console.log(md5_url);
	//~ md5_url += ;
	var random = '?RANDOM='+Math.random();
	
	GM_xmlhttpRequest({
		method: "GET",
		url: MT___host + '/mturk/.cached/'+ md5_url + random,
		onload: function(response) {
			var rs = response.responseText;
			
			if (response.status == 200) {
				scrapy__begin_scrape__process_completed({
					rs:				rs,
					seed_object:	seed_object
					//~ jobid:			jobid,
				});
				return;
			}
			
			// Here! This is a new request.
			GM_xmlhttpRequest({
				method: 'POST',
				url: AMT___POPUP___PROXY_REDACTED_+':6800/schedule.json', //http://localhost
				data: data,
				timeout: 10000,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (response) {
					var rs = response.responseText;
					
					console.log(rs);
					
					rs = JSON.parse(rs);
					
					var jobid = rs.jobid;
					var complete_interval;
					
					// POLL FOR COMPLETION!!
					complete_interval = setInterval(function() {
						
						GM_xmlhttpRequest({
							method: 'GET',
							url: AMT___POPUP___PROXY_REDACTED_ + ':6800/listjobs.json?project=scrapy_amt', //http://localhost
							timeout: 2000,
							onload: function (response) {
								var rs = response.responseText;
								
								rs = JSON.parse(rs);
								
								var finished;
								var pending;
								var running;
								
								finished = JSON.stringify(rs.finished);
								if (finished.indexOf(jobid) != -1) { // done!
									
									clearInterval(complete_interval);
									
									// the local filepath is /var/www/html/development/scrapy/data/items/scrapy_amt/AMTSpider
									
									var item_url = AMT___POPUP___PROXY_REDACTED_ +
										'/development/scrapy/data/items/scrapy_amt/AMTSpider/' +
										jobid + '.jl';
									
									// RETRIEVE THE LIST!
									GM_xmlhttpRequest({
										method: 'GET',
										url: item_url,
										timeout: 4000,
										onload: function (response) {
											var rs = response.responseText;
											
											// WRITE TO FILE!
											rf.io__write_to_file(
												{
													data:		'AMT__serverSide_write__value='	+encodeURIComponent(response.responseText)+
																'&AMT__serverSide_write__folder=.cached'+
																'&AMT__serverSide_write__file='	+ md5_url,
													rs:			response.responseText,	//rs
													//~ jobid:		jobid,					//jobid
													seed_object:seed_object,			//seed_object
													host:		MT___host				//host
												},
												scrapy__begin_scrape__process_completed
											);
										}
									});
								}
								
								// is the job still pending?
								else {
									pending = JSON.stringify(rs.pending);
									running = JSON.stringify(rs.running);
									if (pending.indexOf(jobid) == -1 && running.indexOf(jobid) == -1) { // cancelled ??
										clearInterval(complete_interval);
										callback_function([], seed_object); // send blank
										// REMOVED JOBID !! JUNE 5.
										//callback_function(jobid, [], seed_object); // send blank
									}
								}
							}
						});
					}, 4000);
				}
			});
		}
	});
	
	
	
		// XXXXX SET A DEFAULT TIMEOUT FOR THIS TASK!
		// b/c cpu sitting at max...
		//~ var rf = new AMT___requests_factory();
		//~ rf.scrapy__cancel_job(jobid, 40000);
}
/**
 * database__select
 * 
 * @param database_object
 * 			.query
 * 			.encodeStrings
 * 			.timeout
 * @param callback_function
 * 
 * @returns
 */
AMT___requests_factory.prototype.database__select = function(database_object, callback_function) //
{
	var database_object = database_object;
	var callback_function = callback_function;
	
	var u = '?AMT__database_select='+
			'&AMT__database_select__query='+encodeURIComponent(database_object.query);
	if (database_object.encodeStrings)
		u +='&AMT__database_select__encodeStrings='+encodeURIComponent(JSON.stringify(database_object.encodeStrings));
	
	// Timeout?
	database_object.timeout = (database_object.hasOwnProperty('timeout')) ? database_object.timeout : 30000;
	
	// xhr
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + u,
		timeout: database_object.timeout,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			database_object.responseText = response.responseText; // SET THE RESPONSE TEXT !!!
			
			if (rs == '') //
				rs = '[]'; // blank!!
				
			database_object.responseObject = JSON.parse(rs);
			callback_function(database_object); // send this back!
		}
	});
}
// WRITE!
// Returns:
// database_object	.responseObject
// database_object	.responseText
AMT___requests_factory.prototype.database__write = function(database_object, callback_function) //
{
	var database_object = database_object;
	var callback_function = callback_function;
	
	var u = 'AMT__database_write='+
			'&AMT__database_write__query='+encodeURIComponent(database_object.query);
	if (database_object.encodeStrings)
		u +='&AMT__database_write__encodeStrings='+encodeURIComponent(JSON.stringify(database_object.encodeStrings));
	
	GM_xmlhttpRequest({
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: u,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			
			if (response.status != 200) return;
			
			database_object.responseText = response.responseText; // SET THE RESPONSE TEXT !!!
			
			var rs = response.responseText;
			
			//array_push($out_arr, [ $row['name'], $row['id_number'] ]);
			
			//~ console.log(rs);
			if (rs == '') //
				rs = '[]'; // blank!!
			
			console.log(rs);
			
			try {
				database_object.responseObject = JSON.parse(rs);
			}
			catch(e)
			{
				console.log(database_object);
				console.log(rs);
				console.log(e);
				exit();
			}
			
			// Here?
			callback_function(database_object); // send this back!
		}
	});
}
/**
 * io__command_line_request
 * 
 */
AMT___requests_factory.prototype.io__command_line_request = function(options_object, callback_function_complete) //
{
	var options_object				= options_object;
	var callback_function_complete	= callback_function_complete; // may be false/null
	if (options_object.hasOwnProperty('callback')) {
		callback_function_complete = options_object.callback;
	}
	
	// xhr
	GM_xmlhttpRequest({
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: 'AMT__io__command_line_request=' + encodeURIComponent(JSON.stringify(options_object)),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			// could send back here, if desired!
		}
	});
	
	// set polling
	// 
	var xint = setInterval(function() {
		GM_xmlhttpRequest({
			method: "POST",
			url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
			data: 'AMT__io__command_line_request__complete=' + encodeURIComponent(JSON.stringify(options_object)),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				if (rs == '') {
					return;
				}
				
				clearInterval(xint);
				
				options_object.responseText = rs;
				options_object.rs = rs; // synonym of responseText
				
				callback_function_complete(options_object); // send this back!
				
				//~ console.log(rs);
				//~ echo json_encode($files);
				//~ 
				//~ options_object.rs = JSON.parse(rs);
			}
		});
	}, 1000);
}
//
AMT___requests_factory.prototype.io__wget_download_images = function(options_object, callback_function_complete) //
{
	var options_object				= options_object;
	var callback_function_complete	= callback_function_complete;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ +
			'/mturk/util.php?AMT__io__wget_download_images=' +
			'&AMT__io__wget_download_images_filename=' + encodeURIComponent(options_object.filename) +
			'&AMT__io__wget_download_images_website='  + encodeURIComponent(options_object.website),
		onload: function(response) {
			var rs = response.responseText;
			//~ if (response.status != 200) return;
			//~ options_object.responseText = rs;
			//~ callback_function(download_object); // send this back!
		}
	});
	
	// set polling
	// rs = ["\/www.dcmeadows.com\/Portals\/0\/100_3452 button.jpg","\/www.dcmeadows.com\/Portals\/0\/nssl0081.jpg","\/www.dcmeadows.com\/wp-content\/plugins\/social-media-widget\/images\/default\/64\/facebook.png","\/www.dcmeadows.com\/wp-content\/plugins\/floatingsocialmediapopout\/Images\/FBFloat.png","\/www.paypalobjects.com\/en_US\/i\/scr\/pixel.gif","\/www.paypalobjects.com\/en_US\/i\/btn\/btn_buynowCC_LG.gif"]
	var xint = setInterval(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: AMT___POPUP___PROXY_REDACTED_ +
				'/mturk/util.php?AMT__io__wget_download_images__complete=' + 
				'&AMT__io__wget_download_images_filename=' + encodeURIComponent(options_object.filename) +
				'&AMT__io__wget_download_images_website='  + encodeURIComponent(options_object.website),
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				if (rs == '') {
					return;
				}
				
				clearInterval(xint);
				
				console.log(rs);
				//~ echo json_encode($files);
				
				options_object.rs = JSON.parse(rs);
				options_object.responseText = rs;
				
				callback_function_complete(options_object); // send this back!
			}
		});
	}, 1000);
}
//
AMT___requests_factory.prototype.io__download_file = function(download_object, callback_function) //
{
	var download_object = download_object;
	var callback_function = callback_function;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + download_object.data,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			download_object.responseText = rs;
			callback_function(download_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__imagemagick_convert = function(convert_object, callback_function) //
{
	var convert_object = convert_object;
	var callback_function = callback_function;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + convert_object.data,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			convert_object.responseText = rs;
			callback_function(convert_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__AMT__displayPostStrAsHTML = function(str, iframe) //
{
	var iframe = iframe;
	
	//~ var md5 = MT___host + '/mturk/.cached/' + this.general_functions__md5(str);
	//~ console.log(md5);
	
	GM_xmlhttpRequest({
		method: "POST",
		url: MT___host + '/mturk/util.php',
		data: 'AMT__displayPostStrAsHTML='+encodeURIComponent(str),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			iframe.src = rs;
		}
	});
}
//
AMT___requests_factory.prototype.io__write_to_file = function(write_object, callback_function) //
{
	var write_object = write_object;
	var callback_function = callback_function;
	
	var host = (!write_object.host) ? AMT___POPUP___PROXY_REDACTED_ : write_object.host;
	
	GM_xmlhttpRequest({
		method: "POST",
		url: host + '/mturk/util.php',
		data: write_object.data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			console.log('Write response is:"' + rs + '"');
			
			write_object.responseText	= rs;
			write_object.response		= rs;
			
			callback_function(write_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__file_exists = function(filename, callback_function) //
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php?AMT__io_file_exists='+encodeURIComponent(filename),
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status == 200 && rs == '1') {
				callback_function(true);
			} else {
				callback_function(false);
			}
		}
	});
}
//
AMT___requests_factory.prototype.io__read_file = function(file_object, callback_function) //
{
	//~ var url = MT___host+
			//~ '/mturk/util.php?'+
			//~ encodeURIComponent(skips_key_php_get)+'=';
			
	var file_object = file_object;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: file_object.filename,
		onload: function (response) {
			var rs = response.responseText;
			
			file_object.responseText	= rs;
			file_object.response		= response;
			file_object.status			= response.status;
			
			callback_function(file_object);
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		}
	});
}
//~ AMT___requests_factory.prototype.io__read_file = function(filename, callback_function) //
//~ {
	//~// var url = MT___host+
			//~// '/mturk/util.php?'+
			//~// encodeURIComponent(skips_key_php_get)+'=';
	//~ GM_xmlhttpRequest({
		//~ method: 'GET',
		//~ url: filename,
		//~ onload: function (response) {
			//~// var rs = response.responseText;
			//~ 
			//~// callback_function(rs);
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		//~ }
	//~ });
//~ }
//
AMT___requests_factory.prototype.io__send_email = function(email_object, callback_function) //
{
	var email_object = email_object;
	var callback_function = callback_function;
	
	//~ console.log(email_object);
	
	GM_xmlhttpRequest({ 
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: email_object.data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			email_object.responseText = rs;
			callback_function(email_object); // send this back!
		}
	});
	
	//~ var url = MT___host+
			//~ '/mturk/util.php?'+
			//~ encodeURIComponent(skips_key_php_get)+'=';
	//~ GM_xmlhttpRequest({
		//~ method: 'GET',
		//~ url: url,
		//~ onload: function (response) {
			//~ var rs = response.responseText;
			//~ 
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		//~ }
	//~ });
}
//
AMT___requests_factory.prototype.parse_yahoo_result = function(rs) //
{
	//
	var r = /yschttl spt" href="[^*"]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
	if (!r.exec(rs)) {
		r = /yschttl spt" href="([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
		yahoo_type = 1;
		if (!r.exec(rs)) {
			r = /<h3 class="title"><a href="([^"]*)"[^>]*>((.|\s)*?(?=<\/li>|$)|$)/g;
		}
	}
	
	r.lastIndex = 0;
	
	if (r.exec(rs) && rs.indexOf('Including results for') == -1) {
		r.lastIndex = 0;
		var m;
		var x;
		var arr = [];
		while (m = r.exec(rs)) {
			
			// Is this ri.search.yahoo.com?
			if (m[1].indexOf('http://ri.search.yahoo.com') != -1 && /\/RU=([^\/+])/.exec(m[1])) {
				m[1] = (/\/RU=([^\/]+)/.exec(m[1]))[1];
				m[1] = decodeURIComponent(m[1]);
			}
			// Or is this a URI encoded?
			else if (yahoo_type == 0)
				m[1] = decodeURIComponent(m[1]);
			
			m[2] = m[2].replace(/<b>/g, '`');
			m[2] = m[2].replace(/<\/b>/g, '``');
			m[2] = m[2].replace(/<[^>]+>/g, ' ');
			m[2] = m[2].replace(/[<>]/g, ' ');
			m[2] = m[2].replace(/``/g, '</b>');
			m[2] = m[2].replace(/`/g, '<b>');
			
			arr.push([
				m[0], m[1], m[2]
			]);
		}
		return arr;
	} else {
		return [];
	}
}
// TRY #1
AMT___requests_factory.prototype.fs__load_skips_file = function(skips_key_php_get, callback_function) //
{
	var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(skips_key_php_get)+'=';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (response) {
			var rs = response.responseText;
			
			var tmp_skip_sites = rs.split("\n");
			
			callback_function(tmp_skip_sites);
		}
	});
}
// TRY #2
AMT___requests_factory.prototype.fs__load_skips = function(opts_obj) //
{
	var opts_obj = opts_obj;
	// required = skips_key, callback, callback_err (optional)
	if  (
		!opts_obj.hasOwnProperty('skips_key') ||
		!opts_obj.hasOwnProperty('callback') 
		)
	{
		console.log('failed fs__load_skips');
		return;
	}
	if (!opts_obj.hasOwnProperty('callback_err')) {
		opts_obj.callback_err = function() {};
	}
	// Xhr.
	GM_xmlhttpRequest({
		method: 'GET',
		url: MT___host+'/mturk/util.php?'+encodeURIComponent(opts_obj.skips_key)+'=',
		onload: function (response) {
			var rs=response.responseText;
			
			if (response.status != 200) {
				opts_obj.callback_err();
				return;
			}
			
			var x = rs.split("\n");
			
			var SKIP_SITES = {}; // ASSOC.
			
			// FULL
			for (var i in x) {
				SKIP_SITES[x[i]] = true;
			}
			
			// SUBDOMAINS!
			for (var i in x) {
				var y;
				if (y = /\.([^\.]+\.[^\.]+)$/.exec(x[i])) {
					SKIP_SITES[y[1]] = true;
				}
			}
			
			// init
			opts_obj.callback(SKIP_SITES);
		}
	});}
/**
 * AMT___gen_functions
 * 
 * 
 * 
 */
function AMT___gen_functions(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/*
 * 
 */
AMT___gen_functions.prototype.levensht = function(a, b) {
	
	// minimator
	// Returns the smallest of the three values passed in
	function minimator(x,y,z) {
		if (x < y && x < z) return x;
		if (y < x && y < z) return y;
		return z;
	}

	var cost;
	
	// Get values
	// Put them .toLowerCase()
	var a = a.toLowerCase();
	var m = a.length;
	
	var b = b.toLowerCase();
	var n = b.length;
	
	// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
	if (m < n) {
		var c=a;a=b;b=c;
		var o=m;m=n;n=o;
	}
	
	var r = new Array();
	r[0] = new Array();
	for (var c = 0; c < n+1; c++) {
		r[0][c] = c;
	}
	
	for (var i = 1; i < m+1; i++) {
		r[i] = new Array();
		r[i][0] = i;
		for (var j = 1; j < n+1; j++) {
			cost = (a.charAt(i-1) == b.charAt(j-1))? 0: 1;
			r[i][j] = minimator(r[i-1][j]+1,r[i][j-1]+1,r[i-1][j-1]+cost);
		}
	}
	
	return r[m][n];
}
/**
 * AMT___geographic_functions
 * 
 * 
 * 
 */
function AMT___geographic_functions(obj_vars) {
}
/*
 * 
 * www.uwgb.edu/DUTCHS/UsefulData/ConvertUTMNoOZ.HTM
 * 
 * @param		options
 * 				.easting
 * 				.northing
 * 				.zone
 * @returns		{.lat, .lng}
 */
AMT___geographic_functions.prototype.utm_coords_to_geographic = function(options) {
	
	// vars
	var DatumEqRad,DatumFlat,Item,k0,a,f,b,e,drad,latd,phi,e0,N,T,C,lng,lng0,lngd,M,x,y,k;
	var utmz,zcm,DigraphLetrsE,DigraphLetrsN,OOZok;
	//"inputs"
	var EqRadBox,PolRadBox,FlatBox,RecipBox;
	function Declarations(){
	//Symbols as used in USGS PP 1395: Map Projections - A Working Manual
		DatumEqRad = [6378137.0,6378137.0,6378137.0,6378135.0,6378160.0,6378245.0,6378206.4,
		6378388.0,6378388.0,6378249.1,6378206.4,6377563.4,6377397.2,6377276.3];	
		DatumFlat = [298.2572236, 298.2572236, 298.2572215,	298.2597208, 298.2497323, 298.2997381, 294.9786982,
		296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052, 300.8021499]; 
		Item = 0;//Default
		k0 = 0.9996;//scale on central meridian
		a = DatumEqRad[Item];//equatorial radius, meters. 
		f = 1/DatumFlat[Item];//polar flattening.
		b = a*(1-f);//polar axis.
		e = Math.sqrt(1 - b*b/a*a);//eccentricity
		drad = Math.PI/180;//Convert degrees to radians)
		latd = 0;//latitude in degrees
		phi = 0;//latitude (north +, south -), but uses phi in reference
		e0 = e/Math.sqrt(1 - e*e);//e prime in reference
		N = a/Math.sqrt(1-Math.pow(e*Math.sin(phi)),2);
		T = Math.pow(Math.tan(phi),2);
		C = Math.pow(e*Math.cos(phi),2);
		lng = 0;//Longitude (e = +, w = -) - can't use long - reserved word
		lng0 = 0;//longitude of central meridian
		lngd = 0;//longitude in degrees
		M = 0;//M requires calculation
		x = 0;//x coordinate
		y = 0;//y coordinate
		k = 1;//local scale
		utmz = 30;//utm zone
		zcm = 0;//zone central meridian
		DigraphLetrsE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
		DigraphLetrsN = "ABCDEFGHJKLMNPQRSTUV";
		EqRadBox = a;
		PolRadBox = b;
		FlatBox = f;
		RecipBox = 1/f;
		//~ document.getElementById("EqRadBox").value = a;
		//~ document.getElementById("PolRadBox").value = b;
		//~ document.getElementById("FlatBox").value = f;
		//~ document.getElementById("RecipBox").value = 1/f;
		OOZok = false;
	}//Close declarations

	// vars
	var UTMeBox1 = options.easting,UTMnBox1 = options.northing,UTMzBox1 = options.zone;
	var k0,b,e,e0,esq,e0sq,x,y,utmz,zcm,e1,M0,M,mu,phil,C1,T1,N1,R1,D,phi;
	//"inputs"
	var DDLatBox0,DDLonBox0,SHemBox = true; // SET TO TRUE=SOUTH!!! // SHemBox=north of equator=This is always false for this task (Jan15 2015)
	
	// Init
	UTMtoGeog();
	function UTMtoGeog(){
		//Convert UTM Coordinates to Geographic
		Declarations();
		k0 = 0.9996;//scale on central meridian
		b = a*(1-f);//polar axis.
		e = Math.sqrt(1 - (b/a)*(b/a));//eccentricity
		e0 = e/Math.sqrt(1 - e*e);//Called e prime in reference
		esq = (1 - (b/a)*(b/a));//e squared for use in expansions
		e0sq = e*e/(1-e*e);// e0 squared - always even powers
		x = parseFloat(UTMeBox1);
		//~ x = parseFloat(document.getElementById("UTMeBox1").value);
		if (x<160000 || x>840000){alert("Outside permissible range of easting values \n Results may be unreliable \n Use with caution");} 
		y = parseFloat(UTMnBox1);
		//~ y = parseFloat(document.getElementById("UTMnBox1").value);
		if (y<0){alert("Negative values not allowed \n Results may be unreliable \n Use with caution");}
		if (y>10000000){alert("Northing may not exceed 10,000,000 \n Results may be unreliable \n Use with caution");}
		utmz = parseFloat(UTMzBox1);
		//~ utmz = parseFloat(document.getElementById("UTMzBox1").value);
		zcm = 3 + 6*(utmz-1) - 180;//Central meridian of zone
		e1 = (1 - Math.sqrt(1 - e*e))/(1 + Math.sqrt(1 - e*e));//Called e1 in USGS PP 1395 also
		M0 = 0;//In case origin other than zero lat - not needed for standard UTM
		M = M0 + y/k0;//Arc length along standard meridian. 
		if (SHemBox){M=M0+(y-10000000)/k;}
		//~ if (document.getElementById("SHemBox").checked === true){M=M0+(y-10000000)/k;}
		mu = M/(a*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256))));
		phi1 = mu + e1*(3/2 - 27*e1*e1/32)*Math.sin(2*mu) + e1*e1*(21/16 -55*e1*e1/32)*Math.sin(4*mu);//Footprint Latitude
		phi1 = phi1 + e1*e1*e1*(Math.sin(6*mu)*151/96 + e1*Math.sin(8*mu)*1097/512);
		C1 = e0sq*Math.pow(Math.cos(phi1),2);
		T1 = Math.pow(Math.tan(phi1),2);
		N1 = a/Math.sqrt(1-Math.pow(e*Math.sin(phi1),2));
		R1 = N1*(1-e*e)/(1-Math.pow(e*Math.sin(phi1),2));
		D = (x-500000)/(N1*k0);
		phi = (D*D)*(1/2 - D*D*(5 + 3*T1 + 10*C1 - 4*C1*C1 - 9*e0sq)/24);
			phi = phi + Math.pow(D,6)*(61 + 90*T1 + 298*C1 + 45*T1*T1 -252*e0sq - 3*C1*C1)/720;
			phi = phi1 - (N1*Math.tan(phi1)/R1)*phi;
		
		
		
	//Output Latitude
		DDLatBox0 = Math.floor(1000000*phi/drad)/1000000;
		//~ document.getElementById("DDLatBox0").value = Math.floor(1000000*phi/drad)/1000000;
			
	//Longitude
		lng = D*(1 + D*D*((-1 -2*T1 -C1)/6 + D*D*(5 - 2*C1 + 28*T1 - 3*C1*C1 +8*e0sq + 24*T1*T1)/120))/Math.cos(phi1);
		lngd = zcm+lng/drad;
		
	//Output Longitude
		DDLonBox0 = Math.floor(1000000*lngd)/1000000;
		//~ document.getElementById("DDLonBox0").value = Math.floor(1000000*lngd)/1000000;
	
		// Do callback
		options.callback({
			lat: DDLatBox0,
			lng: DDLonBox0
		});
	// BELOW HERE IS NOT REQUIRED
	//
	//
	//~ //Parse DMS
		//~ xd = lngd;
		//~ yd = phi/drad;
		//~ DDtoDMS();
		//~ document.getElementById("DLatBox0").value = Math.floor(ydd);
		//~ document.getElementById("MLatBox0").value = ym;
		//~ document.getElementById("SLatBox0").value = Math.floor(1000*ys)/1000;
		//~ document.getElementById("DLonBox0").value = Math.floor(xdd);
		//~ document.getElementById("MLonBox0").value = xm;
		//~ document.getElementById("SLonBox0").value = Math.floor(1000*xs)/1000;
//~ 
		//~ document.getElementById("UTMLonZoneBox2").value = utmz;
		//~ document.getElementById("UTMLatZoneBox2").value = DigraphLetrsE[latz];
		//~ document.getElementById("UTMeBox2").value = Math.round(10*(x-100000*Math.floor(x/100000)))/10;
		//~ document.getElementById("UTMnBox2").value = Math.round(10*(y-100000*Math.floor(y/100000)))/10;
		//~ MakeDigraph();
		//~ document.getElementById("UTMDgBox2").value = Digraph;
	}//End UTM to Geog
}

/**
 * AMT___site_scrapes
 * 
 * TODO: linkedin.com/Web Test
 * 
 */
function AMT___site_scrapes(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * function scrape
 *
 * Yellow Pages
 * 
 * @param options_object					object	
 * @param options_object.site				string	
 * @param options_object.url				string	
 * @param options_object.callback_function	string	
 * 
 * Site:
 * @site
 * 	http://www.yellowpages.com/search
 * @site
 *	https://www.yellowpages.com/whitepages/address
 * @site
 *	http://www.healthgrades.com/PROFILE/
 * @site
 *	LINKEDIN_PROFILE
 * 
 * @returns ...
 * 
 * Typically returns ...
 * @return opts.response.vars.result{} OR results[{rslt}, {rslt}, ... ]
 * @return opts.response.vars.error?
 * @return opts.response.vars.error_type?
 * 
 * TODO: Add ability to cache XHR requests. Bool cache_xhr Default = ?
 * 
 */
AMT___site_scrapes.prototype.scrape = function(options_object) {
	
	// Global
	var opts = options_object;
	console.log('------------.scrape OPTS-------------'); //DEBUG: This was to help find duplicate reload.extensions bug.
	console.log(opts);
	
	switch (opts.site) {
		// TripAdvisor profile page
		// e.g. 
		case 'TripAdvisor_profile': 
			opts.tmp_callback = tripadvisor_profile_page;
			xhr_get();
			break;
		// e.g. http://www.tripadvisor.com/Search?q=Lotte+City+Hotel+Daejeon&geo=1&pid=3826&returnTo=__2F__
		case 'http://www.tripadvisor.com/Search': 
			opts.tmp_callback = tripadvisor_search_page;
			xhr_get();
			break;
		// e.g. http://www.yellowpages.com/search?search_terms=ithaca+diner&geo_location_terms=Ithaca%2C+NY
		case 'http://www.yellowpages.com/search': 
			opts.tmp_callback = yp_search;
			xhr_get();
			break;
		case 'https://www.yellowpages.com/whitepages/address':
			opts.tmp_callback = yp_reverse_addr;
			xhr_get();
			break;
		case 'http://www.healthgrades.com/PROFILE/':
			opts.tmp_callback = healthgrades_profile;
			xhr_get();
			break;
		case 'LINKEDIN_PROFILE':
			opts.tmp_callback = linkedin_person_profile;
			xhr_get();
		//~ case 'https://www.linkedin.com/profile/view?id=':
		//~ case 'https://www.linkedin.com/pub/':
		//~ case 'https://www.linkedin.com/in/':
			break;
	}
	
	/**
	 * xhr_get
	 */
	function xhr_get() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: opts.url,
			timeout: 30000,
			ontimeout: function() {
				
			},
			onerror: function() {
				
			},
			onload: function (response) {
				var rs = response.responseText;
				
				// not 200 response.status
				if (response.status > 200) { // 400 - 599
					//~ console.log(response.status);
					//~ return;
				}
				
				opts.response = response;
				
				if (!opts.tmp_callback(rs)) {
					console.log('Returned False');
					return;
				}
				
				// Callback final
				opts.callback_function(opts);
			}
		});
	}
	
	/**
	 * tripadvisor_profile_page
	 * 
	 * e.g. http://www.tripadvisor.com/Hotel_Review-g297887-d6378639-Reviews-Lotte_City_Hotel_Daejeon-Daejeon.html
	 * 
	 * @results [{}]
	 * 
	 */
	function tripadvisor_profile_page() {
		
		opts.response.vars = {
			result: {
				prices: [],		// objects {price, fees, source}
				date_ci: null,	// string, check in
				date_co: null	// string, check out
			},
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText;
		//~ console.log(rs);
		// i.e. <!--P:HR_LeftPersistent/V:HO-1.0/DO:24\LS:30\G:2\RR:1\PC:USD\CI:2014-11-29\CO:2014-12-29\IK:6e1f69e7e6424bd2be707a564209c0ac/N:1/L:6378639/SP:0\MP:3\MM:3\UM:1\N:1/PT:meta\PN:BookingCom\PP:121\PF:12\PA:A\PI:7994\PB:142003\OI:56818891\F:chevron\\N:2/PT:meta\PN:Agoda\PP:120\PF:12\PA:A\PI:8054\PB:105262\OI:56507922\F:text\\N:3/PT:meta\PN:BookingeDreamsWL\PP:121\PF:12\PA:A\PI:11939\PB:429618\OI:60837478\F:text\\N:4/PT:meta\PN:Expedia\PA:M\PI:8049\PB:49921\OI:56495272\F:text\\N:5/PT:meta\PN:HotelsCom2\PA:M\PI:8512\PB:79567\OI:56519552\F:text\\N:6/PT:meta\PN:Venere\PA:M\PI:9173\PB:207816\OI:56498841\F:text\\N:7/PT:meta\PN:Tingo1\PA:U\PI:11831\PB:403168\OI:58549038\F:text-->
		var r = /<div class="impressionTrackingTree" style="display: none;">((.|\s)*?(?=<\/div>|$)|$)/.exec(rs);
		
		if (r) {
			r = r[1].replace(/\\/g, '\n');
			console.log(r);
			
			// price
			// e.g. BookingCom, 121, 12
			var r2 = /PT:meta\nPN:([^\n]+)\nPP:([^\n]+)\nPF:([^\n]+)/g;
			var m;
			while (m = r2.exec(r)) {
				opts.response.vars.result.prices.push({
					price:	m[2],
					fees:	m[3],
					source:	m[1]
				});
			}
			
			//~ // price
			//~ // e.g. BookingCom, 121, 12
			//~ var r2 = /PT:meta\nPN:([^\n]+)\nPP:([^\n]+)\nPF:([^\n]+)/.exec(r);
			//~ var r3 = /PT:meta\nPN:([^\n]+)\nPP:([^\n]+)/.exec(r);
			//~ if (r2) {
				//~ opts.response.vars.result.prices.push({
					//~ price:	r2[2],
					//~ fees:	r2[3],
					//~ source:	r2[1]
				//~ });
			//~ } else if (r3) {
				//~ opts.response.vars.result.prices.push({
					//~ price:	r2[2],
					//~ fees:	null,
					//~ source:	r2[1]
				//~ });
			//~ }
			
			// dates
			// e.g. 2014-11-29
			var r2 = /CI:([\d\-]+)/.exec(r);
			if (r2) {
				opts.response.vars.result.date_ci = r2[1];
			}
			var r2 = /CO:([\d\-]+)/.exec(r);
			if (r2) {
				opts.response.vars.result.date_co = r2[1];
			}
			
			
		}
		return true;
	}
	/**
	 * tripadvisor_search_page
	 * 
	 * e.g. http://www.tripadvisor.com/Search?q=Lotte+City+Hotel+Daejeon&geo=1&pid=3826&returnTo=__2F__
	 * 
	 * @results [{}]
	 * 
	 */
	function tripadvisor_search_page() {
		
		opts.response.vars = {
			results: [],
			num_search_results: null, // integer, default=0
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText; //console.log(rs);
		
		var r = /<div class="line1">All results<\/div>[\r\n\t\s]*<div class="line2">\(([\d,]+)\)<\/div>/.exec(rs);
		if (r) {
			opts.response.vars.num_search_results = r[1];
		}
		
		// Listings
		//
		//
		
		var r = /<div class="searchResult ([^ ]*)[^"]*">((.|\s)*?(?=<div class="searchResult|<div class="sectionPagingBOT">|$)|$)/g;
		//~ var r = /<div class="searchResult([^"]*)">((.|\s)*?(?=<div class="searchResult|<div class="sectionPagingBOT">|$)|$)/g;
		var m;
		while (m = r.exec(rs)) {
			
			//console.log(m);
			
			// Type of... Skip "srREVIEWS" type, which are at bottom of page.
			// Main types are: srLODGING, srEATERY
			var type_of_searchResult = m[1];
			console.log(type_of_searchResult);
			//~ if (type_of_searchResult.indexOf('srREVIEWS') != -1)
				//~ continue;
			if (type_of_searchResult == 'srREVIEWS')
				continue;
			if (type_of_searchResult == 'srFORUMS')
				continue;
			
			var rslt = {
				name:			null,	// string
				address:		null,	// string
				rating:			null,	// string
				profile_url:	null,	// string
				result_type:	null	// string
			};
			
			// result_type
			rslt.result_type = type_of_searchResult;
			
			// href & name
			// e.g. Lotte City Hotel Daejeon
			// e.g. /Hotel_Review-g297887-d6378639-Reviews-Lotte_City_Hotel_Daejeon-Daejeon.html
			//
			// e.g. <a target="_blank" href="/Restaurant_Review-g806325-d4594024-Reviews-New_Acropol_restaurant-Morogoro_Morogoro_Region.html" onclick="setOneTimeCookie('NORDINAL','B2'); ta.call('ta.servlet.SearchPage.recordSelection', event, this, 'B2', 'EATERY');">\n<b>New Acropol</b> restaurant</a>
			//
			var r2 = /<a target="_blank" href="(\/[^"]+)"[^>]*>[\r\n\t\s]*(<b>[^<]+<\/b>[^<]*)<\/a>/.exec(m[2]);
			if (r2) {
				rslt.profile_url = 'http://www.tripadvisor.com' + __js_clean_html_str(r2[1]);
				rslt.name = __js_clean_html_str(
					r2[2].replace(/<\/?b>/g, '')
				);
			}
			
			// address
			var r2 = /<div class="srAddress inline">((.|\s)*?(?=<\/div>|$)|$)/.exec(m[2]);
			if (r2) {
				rslt.address = __js_clean_html_str(r2[1]).trim();
			}
			
			// rating
			var r2 = /<span class="rate[^"]*">[\r\n\t\s]*<img class="sprite-ratings" src="[^"]*" alt="([\d\.]+) of 5 stars">[\r\n\t\s]*<\/span>/.exec(m[2]);
			if (r2) {
				rslt.rating = r2[1];
			}
			
			opts.response.vars.results.push(rslt);
		}
		
		return true;
	}
	/**
	 * yp_search
	 * 
	 * @results [{}]
	 * 
	 */
	function yp_search() {
		
		opts.response.vars = {
			results: [],
			num_search_results: null, // integer, default=0
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText;
		
		var str = '<header>We’re ever so sorry. You may have<br>encountered a temporary glitch.<br>Please try one of the following:</header>';
		if (rs.indexOf(str) != -1) {
			opts.response.vars.error = true;
			opts.response.vars.error_type = str;
			opts.response.vars.num_search_results = 0;
			return true;
		}
		
		var str = '<div id="no-results-main" class="no-results-term-error"><h4>No results found for <strong>';
		if (rs.indexOf(str) != -1) {
			opts.response.vars.num_search_results = 0;
			return true; // Quit here
		}
		var str = '<header>We did not find any business listings for&nbsp;<strong>';
		if (rs.indexOf(str) != -1) {
			opts.response.vars.num_search_results = 0;
			return true; // Quit here
		}
		
		// Distances
		// distance_from_address_object & dfao_listings
		//
		// e.g. if href=>http://www.yellowpages.com/ithaca-ny/mip/wings-over-ithaca-2590867?lid=2590867
		//{"listingID":"2590867","ypid":"2590867","latitude":42.436546,"longitude":-76.46467,"addressLine1":"335 Pine Tree Rd","city":"Ithaca","state":"NY","zip":"14850","omitAddress":"N","name":"Wings Over Ithaca","distance":2.7685942611732415,"assumedGeoFlag":"","position":4,"rank":4,"impressionID":"4c4aa949-44b2-4a34-a262-71a3f9b438af","srid":"L-webyp-887b5b46-4d90-4eb8-be3a-68ed6c38769f-2590867"}
		//
		var r = /YPU *= *\{((.|\s)*?(?=\};|$)|$)/.exec(rs);
		var distance_from_address_object = null;
		var dfao_listings = null;
		if (r) {
			try {
				r = JSON.parse('{' + r[1] + '}');
				if (r) {
					distance_from_address_object = r;
					dfao_listings = {};
					// distance_from_address_object.expandedMapListings is an array of objects
					if (distance_from_address_object.hasOwnProperty('expandedMapListings') && distance_from_address_object.expandedMapListings.length) {
						for (var i in distance_from_address_object.expandedMapListings) {
							var x = distance_from_address_object.expandedMapListings[i];
							dfao_listings[x.listingID] = x;
						}
					}
				}
			} catch(e) {
				console.log(e);
				console.log('Could not parse coordinates object!');
			}
		}
			
		
		//<div class="info"><h3 class="n">
		//~ var r = /<div class="info"><h3 class="n">((.|\s)*?(?=<div class="media-thumbnail">|$)|$)/g;
		var r = /<div class="info"><h3 class="n">((.|\s)*?(?=<div class="info"><h3 class="n">|$)|$)/g;
		var m;
		while (m = r.exec(rs)) {
			
			// Only use the listings that are not ads. For the time being these are listed
			// as results 1-30. I.e. 1., 2., 3. ... etc.
			// There may be listings on the page that are ads but these are not currently
			// listed with the other numerical results.
			
			// Skip if does not contain "(\d)"
			if (!/<span class="count">\([\d]\)<\/span>/.exec(m[1])) continue;
			// OLD
			// Skip if does not contain "\d.".
			//<span class="index">5</span><span class="index-dot">.</span>
			//~ if (!/<span class="index">\d+<\/span><span class="index-dot">\.<\/span>/.exec(m[1])) continue;
			
			
			var rslt = {
				name:					null,	// string
				address:				null,	// string
				phones:					[],		// array of strings
				profile_url:			null,	// string
				distance_from_address:	null,	// float
				
				listing_id:				null	// string, private
			};
			
			// href & name
			// e.g. /ithaca-ny/mip/wings-over-ithaca-2590867?lid=2590867
			// e.g. LongHorn Steakhouse
			var reg = /<a href="(\/[^"]+)" data-analytics='[^']*' rel="[^"]*" itemprop="name" class="business-name">([^<]+)<\/a>/.exec(m[1]);
			//~ var reg = /<a href="(\/[^"]+)" data-analytics='[^']*' rel="[^"]*" class="business-name"><span itemprop="name">([^<]+)<\/span>/.exec(m[1]);
			//~ var r = /<span itemprop="name">([^<]+)<\/span>/.exec(m[1]);
			if (reg) {
				rslt.profile_url	= 'http://www.yellowpages.com' + __js_clean_html_str(reg[1]).trim();
				rslt.name			= __js_clean_html_str(reg[2]).trim();
				
				var r2 = /lid=(\d+)/.exec(rslt.profile_url);
				if (r2) {
					rslt.listing_id = r2[1];
					if  (
						dfao_listings &&
						dfao_listings.hasOwnProperty(rslt.listing_id) &&
						dfao_listings[ rslt.listing_id ].hasOwnProperty('distance') &&
						typeof dfao_listings[ rslt.listing_id ].distance == 'number'
						)
					{
						rslt.distance_from_address = dfao_listings[rslt.listing_id].distance;
					}
				}
			}
			
			// address
			// e.g. <span itemprop="streetAddress" class="street-address">400 N Meadow St</span><span itemprop="addressLocality" class="locality">Ithaca, </span><span itemprop="addressRegion">NY</span>&nbsp;<span itemprop="postalCode">14850</span>
			var reg = /<p itemscope itemtype="http:\/\/schema\.org\/PostalAddress" itemprop="address" class="adr">((.|\s)*?(?=<\/p>|$)|$)/.exec(m[1]);
			if (reg) {
				reg = reg[1];
				reg = reg.replace(/<[^>]*>/g, ' ');
				reg = __js_clean_html_str(reg);
				reg = reg.replace(/\s+/g, ' ');
				reg = reg.trim();
				rslt.address = reg;
			}
			
			// phones
			var reg = /<div itemprop="telephone" class="phones phone primary">([^<]+)<\/div>/.exec(m[1]);
			if (reg) {
				rslt.phones.push(
					__js_clean_html_str(reg[1]).trim()
				);
			}
			//~ // <ul class="phones"><li itemprop="telephone" class="phone primary">(607) 273-7110</li></ul>
			//~ var reg = /<ul class="phones">((.|\s)*?(?=<\/ul>|$)|$)/.exec(m[1]);
			//~ if (reg) {
				//~ reg = reg[1];
				//~ // e.g. (607) 273-7110
				//~ var r2 = /<li[^>]*>([^<]+)<\/li>/g;
				//~ var m2;
				//~ while (m2 = r2.exec(reg)) {
					//~ rslt.phones.push(
						//~ __js_clean_html_str(m2[1]).trim()
					//~ );
				//~ }
			//~ }
			
			opts.response.vars.results.push(rslt);
		}
		
		// UPDATE opts.response.vars.num_search_results
		// It must be greater than 0 at this point!
		if (opts.response.vars.results.length == 0) {
			opts.response.vars.error = true;
			opts.response.vars.error_type = 'Is the scrape regexp broken? num_search_results==0 but search did not specify 0!';
			opts.response.vars.num_search_results = 0;
			return true;
		}
		else {
			opts.response.vars.num_search_results = opts.response.vars.results.length;
		}
		
		return true;
	}
	/**
	 * yp_reverse_addr
	 * 
	 * @ opts.response
	 */
	function yp_reverse_addr() {
		
		opts.response.vars = {
			results: [],
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText;
		
		var str = '<header>We’re ever so sorry. You may have<br>encountered a temporary glitch.<br>Please try one of the following:</header>';
		if (rs.indexOf(str) != -1) {
			opts.response.vars.error = true;
			opts.response.vars.error_type = str;
		}
		
		var r = /<div class="phone-result-container">((.|\s)*?(?=<\/div><\/div>|$)|$)/g;
		var m;
		while (m = r.exec(rs)) {
			
			//<a href="/whitepages/show?fp=eyJmaXJzdCI6Ik1pY2hhZWwiLCJsYXN0IjoiSG9yaSIsInN0cmVldCI6IjQwMTEgVGFsYm90IFJkIFMiLCJjaXR5IjoiUmVudG9uIiwic3RhdGUiOiJXQSIsInBob25lIjoiNDI1LTI3MS01MDIwIiwiemlwIjoiOTgwNTUifQ%3D%3D&amp;form=sba" data-analytics='{"click_id":1649,"adclick":false}' class="fullname">Michael K Hori</a><p class="address">4011 Talbot Rd S, Renton, WA 98055</p><p class="phone">425-271-5020</p>
			
			//~ console.log(m);
			
			var rslt = {
				title: null,
				address: null,
				phone: null
			};
			
			// Title
			var r2 = /<a href="[^"]+" data-analytics='[^']*' class="fullname">([^<]*)<\/a>/.exec(m[1]);
			if (r2) {
				rslt.title = __js_clean_html_str(r2[1]).trim();
			}
			
			// Address
			var r2 = /<p class="address">([^<]*)<\/p>/.exec(m[1]);
			if (r2) {
				rslt.address = __js_clean_html_str(r2[1]).trim();
			}
			
			// Phone
			var r2 = /<p class="phone">([^<]*)<\/p>/.exec(m[1]);
			if (r2) {
				rslt.phone = __js_clean_html_str(r2[1]).trim();
			}
			
			//~ console.log(rslt);
			
			opts.response.vars.results.push(rslt);
		}
		
		//~ // Callback final
		//~ opts.callback_function(opts);
	}
	
	/**
	 * linkedin_person_profile
	 * 
	 * @ opts.response
	 * 
	 * NOTE: Sections, Boolean. Showing="background-education edit-default ". Hidden="background-skills edit-default hidden".
	 * 
			* Web Test Required fields
			* 
			* public url
			* name
			* headline
			* # connections
			* image
			* website / personal website
			* experience + logo for each
			*
			* bool has summary 
			* bool has skills 
			* bool has education 
			* bool has interests 
	 */
	function linkedin_person_profile() {
		
		opts.response.vars = {
			result: {
				profile_has_public_url: null,
				public_url: null,
				name: null,
				headline: null,
				num_connections: null,
				image_url: null,
				profile_has_section_contact_info: false, // default=false
				profile_has_section_experience: false,
				profile_has_section_summary: false,
				profile_has_section_skills: false,
				profile_has_section_education: false,
				profile_has_section_interests: false,
				contact_info: {
					email: null,
					im: null,
					address: null,
					phone: null,
					twitter: null,
					wechat: null,
					company_website: null,
					personal_website: null
				},
				experience: [
					// Array of position objects {}: {comp_name: null, logo_url: null, current_or_past: null}
				],
				summary: null,
				skills: null,
				education: null,
				interests: null,
				
				profile_is_in_preview_mode: false // default=false
			},
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText;
		var r;
		
		/**
		 * Public Profile URL
		EX:
www.linkedin.com/pub/tara-holthus-crpc®/31/856/85a
		 */ 
		r = /<span class="view-public-profile">(\w+\.linkedin\.com\/[^<]+)<\/span>/;
		if (r.exec(rs)) {
			opts.response.vars.result.public_url = 'https://' + __js_clean_html_str(r.exec(rs)[1]);
			opts.response.vars.result.profile_has_public_url = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// in/xx
			r = /<dd><a href="(https?:\/\/\w+\.linkedin\.com\/[^"]+)" class="view-public-profile">[^<]+<\/a><\/dd>/;
			if (r.exec(rs)) {
				opts.response.vars.result.public_url = __js_clean_html_str(r.exec(rs)[1]);
				opts.response.vars.result.profile_has_public_url = true;
				// Must have only one match
				r = new RegExp(r.source, 'g');
				if (rs.match(r).length != 1) {
					console.log(rs.match(r));
					console.log(r);
					alert('Length:'+r);
					return false;
				}
			} else {
				
			}
		}
		/**
		 * Name
		EX:
James Strate, CFP®
		 */ 
		r = /<div id="name-container" data-li-template="name"><div id="name" class="editable-item"><h1><span class="n fn"><span class="full-name"[^>]*>([^<]*)<\/span><span><\/span><\/span><\/h1><\/div><\/div>/;
		if (r.exec(rs)) {
			opts.response.vars.result.name = __js_clean_html_str(r.exec(rs)[1]);
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			
		}
		/**
		 * Headline
		EX:
Investment Representative at Fidelity Investments
Vice President - Investments at <strong class="highlight">Wells</strong> <strong class="highlight">Fargo</strong> <strong class="highlight">Advisors</strong>, LLC
 		 */ 
		r = /<div id="headline-container" data-li-template="headline"><div id="headline" class="editable-item"><p class="title *"[^>]*>((.|\s)*?(?=<\/p><\/div><\/div>|$)|$)/;
		if (r.exec(rs)) {
			var hd = r.exec(rs)[1];
			hd = hd.replace(/<[^>]*>/g, '');
			hd = __js_clean_html_str(hd);
			opts.response.vars.result.headline = hd;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			
		}
		/**
		 * num_connections
		EX:
302
OR <div class="member-connections"><strong><a href="#connections" class="connections-link">104</a></strong>connections</div>
		 */ 
		r = /<div class="member-connections"><strong>(<a href="#connections" class="connections-link">|)([^<]*)(<\/a>|)<\/strong>connections<\/div>/;
		if (r.exec(rs)) {
			opts.response.vars.result.num_connections = __js_clean_html_str(r.exec(rs)[2]);
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Has different match?
			r = />connections</;
			if (r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		}
		/**
		 * Image
		EX:
https://media.licdn.com/media/p/3/000/031/13c/113ad79.jpg
		 */ 
		r = /<div class="profile-picture">[\r\n\t\s]*(<a href="javascript:void\(0\)">|) *<img src='([^']+)'/;
		if (r.exec(rs)) {
			opts.response.vars.result.image_url = __js_clean_html_str(r.exec(rs)[2]);
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Has different image?
			r = /<div class="profile-picture">/
			if (r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
			//~ r = /https:\/\/media\.licdn\.com\/mpr\/mpr\/shrink_/;
		}
		/**
		 * Contact info
		 * 
		 * <table summary="Online Contact Info"
		 * <table summary="Contact Info"
		 * <table summary="Internet Presence
		 */
		/**
		 * Has website
		EX:
http%3A%2F%2Fdeancdawson%2Ecom
		 */
		// Company
		// test //~ console.log(/[\d\D]{200}>Company Website<[\d\D]{200}/.exec(rs));
		r = /<a target='_blank' href='\/redir\/redirect\?url=([^&]+)[^']*'>Company Website<\/a>/;
		if (r.exec(rs)) {
			var wb = __js_clean_html_str(r.exec(rs)[1]);
			wb = decodeURIComponent(wb);
			opts.response.vars.result.contact_info.company_website = wb;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Double check
			// EX <span class="contact">Contact Info</span>
			//~ r = />Contact Info</;
			//~ if (r.test(rs)) {
				//~ console.log(r.exec(rs));
				//~ console.log(r);
				//~ alert('Has contact info?:'+r);
				//~ return false;
			//~ }
		}
		// Personal
		r = /<a target='_blank' href='\/redir\/redirect\?url=([^&]+)[^']*'>Personal Website<\/a>/;
		if (r.exec(rs)) {
			var wb = __js_clean_html_str(r.exec(rs)[1]);
			wb = decodeURIComponent(wb);
			opts.response.vars.result.contact_info.personal_website = wb;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Double check
			// EX <span class="contact">Contact Info</span>
			//~ r = />Contact Info</;
			//~ if (r.test(rs)) {
				//~ console.log(r.exec(rs));
				//~ console.log(r);
				//~ alert('Has contact info?:'+r);
				//~ return false;
			//~ }
		}
		
		// THIS IS WHERE A "BLOCKED" PROFILE WILL BE OFF.
		// Blocked is missing from here on out.
		// STOP HERE.
		//
		if  (
			rs.indexOf('<p>Profile summaries for members outside your network are available only to premium account holders.</p>') != -1 ||
			rs.indexOf('<p>Full profiles for 3rd-degree connections are available only to premium account holders.</p>') != -1
			)
		{
			opts.response.vars.result.profile_is_in_preview_mode = true; // !
			return true;
		}
		
		
		/**
		 * Experience
		 * .experience {comp_name: null, logo_url: null, current_or_past: null}
		 * .profile_has_section_contact_info
		EX:
<h3>Experience</h3>
		 */
		r = /<div id="background-experience" class="background-experience edit-default "><h3>Experience<\/h3>/;
		if (r.exec(rs)) {
			opts.response.vars.result.profile_has_section_contact_info = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
			
			// Experience container
			// This must be present.
			r = /<div id="background-experience-container"[^>]*>((.|\s)*?(?=<\/div><\/div><script>|$)|$)/
			if (r.exec(rs)) {
				r = r.exec(rs)[1];
				
				// current-position OR past-position
				var rg_items = /<div id="experience-\d+" class="editable-item section-item ([^"]+)">((.|\s)*?(?=<\/div><\/div>|$)|$)/g;
				if (rg_items.exec(rs)) {
					rg_items.lastIndex = 0;
					var item;
					while (item = rg_items.exec(r)) {
						
						var i = item[2];
						//~ console.log(item);
						
						// Item
						var itm = {
							comp_name: null,
							logo_url: null,
							current_or_past: null
						};
						
						var rg_it;
						
						// Name
						//EX Fidelity Investments
						rg_it = /<a href="\/company\/[^"]*">([^<]*)<\/a>/;
						var rg_m;
						if (rg_m = rg_it.exec(i)) {
							itm.comp_name = __js_clean_html_str(rg_m[1]);
						} else {
							//EX Kleinmann Family Investments, LLC
							rg_it = /<a href="\/vsearch\/p\?company=[^"]*" name="company" title="Find others who have worked at this company">([^<]*)<\/a>/;
							if (rg_m = rg_it.exec(i)) {
								itm.comp_name = __js_clean_html_str(rg_m[1]);
							}
						}
						// Img
						//https://media.licdn.com/media/p/8/000/22c/122/29e1504.png
						var rg_it = /<img class="lazy-load" src="[^"]*" data-li-src="([^"]*)" alt="[^"]*"\/>/
						var rg_m;
						if (rg_m = rg_it.exec(i)) {
							itm.logo_url = __js_clean_html_str(rg_m[1]);
						}
						// current_or_past
						itm.current_or_past = __js_clean_html_str(item[1]);
						// Must be...
						if (itm.current_or_past != 'current-position' && itm.current_or_past != 'past-position') {
							console.log(rs.match(r));
							console.log(r);
							alert('Match:'+r);
							return false;
						}
						
						// Push
						opts.response.vars.result.experience.push(itm);
					}
				} else {
					// No items?
					// This must be present.
					console.log(rs.match(r));
					console.log(r);
					alert('None:'+r);
					return false;
				}
			} else {
				// This must be present.
				console.log(rs.match(r));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		} else {
			// Bool. match.
			r = /<div id="background-experience" class="background-experience edit-default hidden"><div class="hd"><h3>Experience<\/h3>/;
			if (!r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		}
		/**
		 * Summary
		EX:
Professional Financial Management of Assets and Liabilities of Individuals and  ......
		 */ 
		//~ r = /<div class="summary"><p class="description">((.|\s)*?(?=<\/p><\/div>|$)|$)/;
		r = /<div class="summary"><p class="description"[^>]*>((.|\s)*?(?=<\/p><\/div>|$)|$)/;
		if (r.exec(rs)) {
			var sm = r.exec(rs)[1];
			sm = sm.replace(/<[^>]*>/g, '');
			sm = __js_clean_html_str(sm);
			opts.response.vars.result.summary = sm;
			opts.response.vars.result.profile_has_section_summary = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			r = /<h3>Summary<\/h3>/;
			if (r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		}
		/**
		 * Skills
		EX:
Professional Financial Management of Assets and Liabilities of Individuals and  ......
		 */ 
		//~ r = /<h3>Skills<\/h3>/;
		r = /<div id="background-skills" class="background-skills edit-default ">(<div class="hd">|)<h3>Skills<\/h3>/;
		if (r.exec(rs)) {
			opts.response.vars.result.profile_has_section_skills = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Bool. match.
			r = /<div id="background-skills" class="background-skills edit-default hidden">(<div class="hd">|)<h3>Skills<\/h3>/;
			if (!r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		}
		/**
		 * Education
		EX:

		 */ 
		//~ r = /<h3>Education<\/h3>/;
		r = /<div id="background-education" class="background-education edit-default "><h3>Education<\/h3>/;
		if (r.exec(rs)) {
			opts.response.vars.result.profile_has_section_education = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Bool. match.
			r = /<h3>Education<\/h3>/;
			if (r.test(rs)) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
		}
		/**
		 * Interests
		SHOWING:
<li id="interests" class="section-item editable-item ">
		HIDDEN: ???
<li id="interests" class="section-item editable-item no-additional-info">
		 */ 
		r = /<li id="interests" class="section-item editable-item "><h4>Interests<\/h4>/;
		if (r.exec(rs)) {
			opts.response.vars.result.profile_has_section_interests = true;
			// Must have only one match
			r = new RegExp(r.source, 'g');
			if (rs.match(r).length != 1) {
				console.log(rs.match(r));
				console.log(r);
				alert('Length:'+r);
				return false;
			}
		} else {
			// Bool. match.
			var x;
			r = /<li id="interests" class="section-item editable-item no-additional-info"><h4>Interests<\/h4>/;
			x = /<li id="interests" class="section-item editable-item "><h4>Interests<\/h4><\/li>/; // BLANK
			if (!r.test(rs) && !x.exec(rs) && rs.indexOf('>Interests<') != -1) {
				console.log(r.exec(rs));
				console.log(r);
				alert('Bool:'+r);
				return false;
			}
			//~ r = /<h4>Interests<\/h4>/;
		}
		
		/**
		 * return true
		 */
		return true;
	}
	
	/**
	 * healthgrades_profile
	 * 
	 * @ opts.response
	 */
	function healthgrades_profile() {
		
		opts.response.vars = {
			result: {
				address: null,
				other_locations: []
			},
			error: null,
			error_type: null
		}
		
		var rs = opts.response.responseText;
		
		// Main address on this profile
		//<span class="street-address" itemprop="streetAddress">1301 Powell St Suite 123</span>
		// OR
		//~ <td class="summaryLocation">
			   //~ 
                        //~ <div></div>
                        //~ <div>2420 W Pierce St Suite 200</div>
		// OR
		//~ <td class="summaryLocation">
                            //~ <h3>Locations (<a data-hgoname="group-practice-more-offices" href="/group-directory/pennsylvania-pa/philadelphia/perelman-center-advanced-medical-0d927cb7/offices">1 more</a>)</h3>
			   //~ 
                        //~ <div></div>
                        //~ <div>3400 Civic Center Blvd</div>

		var r;
		if (r = /<span class="street-address" itemprop="streetAddress">([^<]*)<\/span>/.exec(rs)) {
			//
		} else if (r = /<td class="summaryLocation">[\r\n\t\s]+<div>[^<]*<\/div>[\r\n\t\s]+<div>([^<]+)<\/div>/.exec(rs)) {
			//
		} else if (r = /<td class="summaryLocation">[\r\n\t\s]+<h3>Locations \([^\)]*\)<\/h3>[\r\n\t\s]+<div>[^<]*<\/div>[\r\n\t\s]+<div>([^<]+)<\/div>/.exec(rs)) {
			//
		} else if (r = /<h3><span class="icon location"><\/span>Location<\/h3>[\r\n\t\s]+<span itemprop="address" itemscope itemtype="http:\/\/schema\.org\/PostalAddress">[\r\n\t\s]+<p class="noLayoutSpacing" itemprop="streetAddress">[\r\n\t\s]+<span itemprop="streetAddress">([^<]+)<\/span>/.exec(rs)) {
			//
		}
		if (r) {
			opts.response.vars.result.address = __js_clean_html_str(r[1]).trim();
		}
		
		
		// Other locations
		// "Appointments & Offices"
		var container;
		var regex;
		
		// This is an occasional case. It is not inside of "officeItem"
		// but inside "componentPresentation".
		var r = /<div class="componentPresentation" id="aboutAppointments2">((.|\s)*?(?=\n<\/div>|$)|$)/.exec(rs);
		if (r) {
			container = r[1];
			
			regex = /<dl[^>]*>((.|\s)*?(?=<\/dl>|$)|$)/g;
		} else {
			container = rs;
			
			regex = /<div class="officeItem"[^>]*>((.|\s)*?(?=\n                <\/div>|$)|$)/g;
		}
		
		//
		var m;
		while (m = regex.exec(container)) {
			
			var rslt = {
				title: null,
				address: []
			};
			
			// Title
			var r2 = /<dt>((.|\s)*?(?=<\/dt>|$)|$)/.exec(m[1]);
			if (r2) {
				rslt.title = __js_clean_html_str(
					r2[1].replace(/<[^>]*>/g, '')
				).trim();
			}
			
			// Address
			// Array: PossibleName, Street1, City/StateAbbr/Zip, ... could be more?
			var r2 = /<dd>([^<]*)<\/dd>/g;
			var m2;
			while (m2 = r2.exec(m[1])) {
				rslt.address.push(
					__js_clean_html_str(m2[1]).trim()
				);
			}
			
			//~ var r3;
			//~ if (r3 = r2.exec(m[1])) {
				//~ rslt.street_address = __js_clean_html_str(r3[1]).trim();
			//~ }
			//~ 
			//~ // city_st_zip
			//~ var r3;
			//~ if (r3 = r2.exec(m[1])) {
				//~ rslt.city_st_zip = __js_clean_html_str(r3[1]).trim();
			//~ }
			
			opts.response.vars.result.other_locations.push(rslt);
		}
	}
	
	
}
/**
 * 
 * AMT___items_factory
 * @
 * @
 * 
 * 
 * create_dashboard__powers_v1__showScrapyResult_contexts
 * create_dashboard__powers_v1
 * create__input_scrapy_button
 * create__input_skip_button2
 * create__input_skip_button
 * create_dashboard_find_address
 * 
 * create_annotation_to_output_fields
 * xhr_scrape_page
 */
function AMT___items_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * function create_dashboard_find_address
 *
 * @param options_object						object	
 * @param "".parent								element	
 * @param "".parent_controller_el				element	
 * @param "".submitButton_onclick_callback		function	
 * @param "".output_elements					object	
 * @param "".first_element						element		Default is false. This is the box focused on by default. Also gets "debug" addresses, if present.	
 * @param ""."". city							element
 * @param ""."". state							element
 * @param ""."". country						element
 */
AMT___items_factory.prototype.create_dashboard_find_address = function(options_object) {
	
	var options_object = opts = options_object;
	
	// First element
	// This is mostly for debug purposes, e.g. when 
	// an address scrape fails and finds a different address.
	// This is also used for *focus* when selecting an
	// address!
	for (var i in opts.output_elements) {
		opts.first_element = opts.output_elements[i];
		break;
	}
	
	
	
	/* BEGIN ITEMS */
	if (!opts.hasOwnProperty('parent_controller_el')) {
		var d2 = document.createElement('textarea');
		d2.setAttribute('style','width:99%;height:18px;');
		opts.parent.appendChild(d2);
	} else {
		var d2 = opts.parent_controller_el;
	}
	//
	var d1 = document.createElement('div');
	d1.setAttribute('style','float:left;width:25%;height:100%;border:1px solid blue;overflow:auto;background-color:#eee;');
	opts.parent.appendChild(d1);
	var d1b = document.createElement('div');
	d1b.setAttribute('style','float:left;width:25%;height:100%;border:1px solid blue;overflow:auto;background-color:#eee;');
	opts.parent.appendChild(d1b);
	var d1c = document.createElement('div');
	d1c.setAttribute('style','float:left;width:25%;height:100%;border:1px solid blue;overflow:auto;background-color:#eee;');
	opts.parent.appendChild(d1c);
	var d1d = document.createElement('div');
	d1d.setAttribute('style','float:left;width:24%;height:100%;border:1px solid blue;overflow:auto;background-color:#eee;');
	opts.parent.appendChild(d1d);
	var x = document.createElement('br');
	x.setAttribute('style','clear:both;');
	opts.parent.appendChild(x);
	/* END ITEMS */
	
	// ...
	var COMP = d2.value.trim();
	
	// ...
	var match_o = COMP;
	match_o = match_o.replace(/&/g, 'and');
	match_o = match_o.replace(/^the /i, '');
	match_o = match_o.replace(/[^\d\w\-_]/g, '').trim().toLowerCase();
	
	// ...
	//~ d2.value = b.replace(/"/g, '') + ' ' + location;
	//~ d2.value = d2.value.trim();
	
	//Turn the company name into a google search
	//~ d2d.href = 'http://www.google.com/search?q='+encodeURIComponent(COMP);
	//~ d2d.innerText = COMP;
	
	// ...
	d2.onblur = function() {
		this.value = this.value.trim();
		FB_addr();
		hoovers_addr();
		businessweek_addr(false);
		google_addr();
	}
	
	// ...
	var ef = new AMT___events_factory();
	d2.addEventListener('keydown', ef.keydown__blur_field, true);
	
	// onsubmit
	if (opts.hasOwnProperty('submitButton_onclick_callback')) {
		//~ document.getElementById('submitButton').onclick = opts.submitButton_onclick_callback;
	} else {
		document.getElementById('submitButton').onclick = function() {
			//...
			alert('x');
			//~ new AMT___core_factory().nextTab();
		}
	}
	
	// ...
	AMT___POPUP__initializeGlobals(
		addr__init
	);
	
	// function Fiber_Data_Co_find_company_addr__init
	function addr__init() {
		FB_addr();
		hoovers_addr();
		businessweek_addr(false); // initial
		google_addr();
	}
	
	// function Fiber_Data_Co_find_company_addr__country2abbr
	function Fiber_Data_Co_find_company_addr__country2abbr(country) {
		var abbr = new AMT___requests_factory().general_functions__countryToAbbreviatedCountry(country);
		if (!abbr) {
			alert(country + ' not in MT___countries!');
			return;
		}
		// here?
		return abbr;
	}
	
	// function Fiber_Data_Co_find_company_addr__google_addr_prof
	function google_addr_prof(el) {
		
		// update button bgc
		el.style.backgroundColor = 'MintCream';
		
		// obj
		var id = JSON.parse(el.json_response); // obj -> prediction
		
		var u = 'https://maps.googleapis.com/maps/api/place/details/json?reference='+
			id.reference+
			'&sensor=false&key=_GOOGLE_API_KEY_REDACTED_';
			
		//~ var u = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(gu);
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				var s = rs;
				
				rs = JSON.parse(rs);
				
				if (rs.status != 'OK') {
					console.log(rs.status);
					return;
				}
				
				console.log(rs);
				
				// update button id/value
				//~ el.innerText += "\n"+rs.result.formatted_address;
				
				el.appendChild(document.createElement('br'));
				el.appendChild(document.createTextNode(rs.result.formatted_address));
				el.json_response = s; // JSON!
			}
		});
	}
	
	function clear_output_elements() {
		for (var i in opts.output_elements) {
			opts.output_elements[i].value = '';
		}
	}
	
	// function google_addr
	//
	// 100 000 requests per 24 hour period	
	// The Text Search service is subject to a 10-times multiplier.
	// The Radar Search Service is subject to a 5-times multiplier
	//
	// 0,0 20000000 = world search
	//
	function google_addr() {
	
		d1d.innerHTML = '';
		
		var u= 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+
			encodeURIComponent(d2.value)+
			'&types=establishment&location=0,0&radius=20000000&sensor=false&key=_GOOGLE_API_KEY_REDACTED_';
		
		u = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u);
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				rs = JSON.parse(rs);
				
				if (rs.status != 'OK') {
					console.log(rs.status);
					d1d.innerText = rs.status;
					return;
				}
				
				rs = rs.predictions;
				
				for (var i in rs) { //obj
					
					var div = document.createElement('div');
					div.setAttribute('style', 'width:98%;border-bottom:1px solid teal;cursor:pointer;');
					div.innerText = rs[i].description;
					div.json_response = JSON.stringify(rs[i]);
					
					div.onclick = function() {
						
						//~ console.log(this.style.backgroundColor);
						
						// focus
						opts.first_element.focus();
						
						if  (
							this.style.backgroundColor != 'LightGreen' &&
							this.style.backgroundColor != 'rgb(245, 255, 250)' // MintCream
							)
						{
							this.style.backgroundColor = 'LightGreen';
							google_addr_prof(this);
						}
						else {
							// fill in details
							
							// clear
							clear_output_elements();
							
							//~ document.getElementById('address1').value =	'';
							//~ document.getElementById('city').value =		'';
							//~ document.getElementById('state').value =	'';
							//~ document.getElementById('postalcode').value =		'';
							
							var id = JSON.parse(this.json_response); // obj -> place detail
							//~ console.log(id);
							
							var j;
							var type;
							
							for (var i in id.result.address_components) {
								type = id.result.address_components[i].types[0];
								j = id.result.address_components[i].long_name;
								
								if (opts.output_elements.hasOwnProperty('street') && type == 'street_number')
									opts.output_elements.street.value = (j + ' ' + opts.output_elements.street.value).trim();
								
								if (opts.output_elements.hasOwnProperty('street') && type == 'route')
									opts.output_elements.street.value = (opts.output_elements.street.value+' '+j).trim();
								
								if (opts.output_elements.hasOwnProperty('city') && (type == 'locality' || type == 'sublocality_level_1'))
									opts.output_elements.city.value = j;
								
								if (opts.output_elements.hasOwnProperty('state') && type == 'administrative_area_level_1')
									opts.output_elements.state.value = j;
								
								if (opts.output_elements.hasOwnProperty('zip') && type == 'postal_code')
									opts.output_elements.zip.value = j;
								
								if (opts.output_elements.hasOwnProperty('country') && type == 'country')
									opts.output_elements.country.value = j;
							}
						}
					}
					
					d1d.appendChild(div);
				}
				
				if (rs.length) {
					var div = document.createElement('div');
					div.setAttribute('style', 'height:1200px;');
					d1d.appendChild(div);
				}
			}
		});
	}
	
	// function
	function businessweek_addr_prof(u) {
		
		// clear
		clear_output_elements();
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				
				// WORKS
				//"<span itemprop="streetAddress">1 N Field Ct</span><br /><span itemprop="addressLocality">Lake Forest</span>, <span itemprop="addressRegion">IL</span>, 60045 <span itemprop="addressCountry">United States</span>"
				// DOES NOT WORK (DOUBLES 1ST)
				//"<div itemprop="address"><p>919A Bay Ridge Road</p><p>Annapolis, MD&nbsp;21403</p><p style="margin:5px 0;">United States</p></div>"
				
				//
				//12050 West Broad Street
				//
				//United States
				var r, r1, r2, r3;
				r1 = /<div itemprop="address">((<p>[^<]+<\/p>)*)<p>([^,]+), ([A-Z]{2})&nbsp;([\d\-]+)<\/p><p style="[^"]*">([^<]+)<\/p><\/div>/.exec(rs);
				//~ r2 = /<div itemprop="address">((.|\s)*?(?=<\/div>|$)|$)/.exec(rs);
				r3 = /<div itemprop="address">((<p[^>]*>[^<]+<\/p>)*)/.exec(rs);
				
				// e.g. "<div itemprop="address"><p>34 west 17th street</p><p>3rd Floor</p><p>New York, NY&nbsp;10011</p><p style="margin:5px 0;">United States</p></div>"
				if (r1) {
					r = r1;
					var addr = [];
					for (var i = 1; i<= r.length - 1; i++) {
						r[i] = r[i].replace(/<[^>]*>/g, ' ');
						r[i] = __js_clean_html_str(r[i]).trim().replace(/\s+/g, ' ');
						
						if (i == 2) continue;
						addr.push(r[i]);
					}
					
					// 0=...
					// 1= Street address (including suite)
					// 2= A duplicate of 1 or JUST the suite number, which is also part of 1 already
					// 3= City
					// 4= State abbr
					// 5= Zip
					// 6= Country
					
					// BECOMES
					
					// 0=Street
					// 1=City
					// 2=State
					// 3=Zip
					// 4=Country
					
					console.log(addr);
					
					if (opts.output_elements.hasOwnProperty('street'))
						opts.output_elements.street.value = addr[0];
					
					if (opts.output_elements.hasOwnProperty('city'))
						opts.output_elements.city.value = addr[1];
					
					if (opts.output_elements.hasOwnProperty('state'))
						opts.output_elements.state.value = addr[2];
					
					if (opts.output_elements.hasOwnProperty('zip'))
						opts.output_elements.zip.value = addr[3];
					
					if (opts.output_elements.hasOwnProperty('country'))
						opts.output_elements.country.value = addr[4];
					
					//~ document.getElementById('address1').value = r[1];
					//~ // in reverse
					//~ document.getElementById('city').value = r[r.length - 4];
					//~ document.getElementById('state').value = r[r.length - 3];
					//~ document.getElementById('postalcode').value = r[r.length - 2];
				}
				
				//~ if (!r1 && r2) {
					//~ r = r2;
					//~ // First el?
					//~ opts.output_elements.value = __js_clean_html_str(
						//~ r[1].replace(/<[^>]*>/g,'')
					//~ );
				//~ }
				
				// Bug: This doubles street.
				// <div itemprop="address"><p>Via Pian Scairolo 9</p><p>Pazzallo</p><p>Lugano, &nbsp;6912</p><p style="margin:5px 0;">Switzerland</p></div>
				if (!r1 && !r2 && r3) {
					r = r3;
					console.log(r);
					delete r.index;
					delete r.input;
					for (var i = 0; i<r.length; i++) {
						//~ console.log(r[i]);
						r[i] = __js_clean_html_str(r[i].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
					}
					
					if (opts.output_elements.hasOwnProperty('country'))
						opts.output_elements.country.value = r[r.length - 1];
					
					// DEBUG
					var dbg = r.slice(0, r.length - 1).join(' ');
					if (opts.output_elements.hasOwnProperty('street'))
						opts.output_elements.street.value	= dbg;
					else if (opts.output_elements.hasOwnProperty('city'))
						opts.output_elements.city.value		= dbg;
					else if (opts.output_elements.hasOwnProperty('state'))
						opts.output_elements.state.value	= dbg;
				}
			}
		});
	}
	function businessweek_addr(first) {
		d1c.innerHTML = '';
		//if (first) {
		//	d1c.innerHTML = '';
		//}
		//
		var u = 'http://investing.businessweek.com/research/common/symbollookup/symbollookup.asp?region=all&textIn='+encodeURIComponent(d2.value);
		//
		if (first) {
			u += '&lookuptype=';
		}
		else {
			u += '&lookuptype=private';
		}
		//
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				var r = /<div id="resultCaption">((.|\s)*?(?=<\/div>|$)|$)/.exec(rs);
				if (r) {
					var div = document.createElement('div');
					div.setAttribute('style', 'border-bottom:3px solid LightGreen;');
					div.innerHTML = r[1].replace(/<[^>]+>/g, '');
					d1c.appendChild(div);
					//~ d1c.innerHTML +=  r[1].replace(/<[^>]+>/g, '');
					//~ d1c.innerHTML += '<hr>';
				}
				
				//
				// Dominion Auto Group
				// United States
				// Specialty Retail
				var r = /<tr>\s*<td><a href="([^"]+)">([^<]+)<\/a><\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]*)<\/td>\s*<\/tr>/g;
				
				if (!r.exec(rs)) {
					// SHOUGANG GENERACION ELECT-C
					//
				}
				
				r.lastIndex = 0;
				
				var m;
				var c = 0;
				while (m = r.exec(rs)) {
					for (var i = 1; i<= 4; i++) {
						m[i] = __js_clean_html_str(m[i]).trim();
					}
					
					m[1] = m[1].replace(/\.\.\//g,'');
					m[1] = 'http://investing.businessweek.com/research/' + m[1];
					
					var div = document.createElement('div');
					div.setAttribute('style', 'width:98%;border-bottom:1px solid teal;');
					
					var inp = document.createElement('button');
					inp.setAttribute('style', 'width:98%;text-align:left;cursor:pointer;');
					inp.innerHTML = m[2];
					inp.url_bw = m[1];
					inp.name_bw = m[2];
					
					inp.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						
						// focus
						opts.first_element.focus();
						
						businessweek_addr_prof(this.url_bw);
					}
					
					div.appendChild(inp);
					
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode(m[3]));
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode(m[4]));
					
					d1c.appendChild(div);
					
					c++;
				}
				if (c == 0) {
					d1c.appendChild(document.createTextNode('0'));
				}	
				if (!first) {
					var div = document.createElement('div');
					div.setAttribute('style', 'height:1400px;');
					d1c.appendChild(div);
				}
				
				if (first) {
					var div = document.createElement('div');
					div.setAttribute('style', 'border-bottom:3px solid LightGreen;');
					d1c.appendChild(div);
					businessweek_addr(false);
					return;
				}
			}
		});
	}
	/**
	 * function hoovers_addr_prof
	 * 
	 * @param	btn		element
	 * @returns	none	
	 */
	function hoovers_addr_prof(btn) {
		
		//~ this.url_hv
		var btn = btn;
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: btn.url_hv,
			timeout: 20000,
			onload: function(response) {
				var rs = response.responseText;
				
				btn.style.border = '2px solid teal';
				
				if (response.status != 200) return;
				// clear
				clear_output_elements();
				
				// <div itemprop="address"><p>639 Front Street</p><p>Floor 4</p><p>San Francisco, CA&nbsp;94111</p><p style="margin:5px 0;">United States</p></div>

				// ZIP [\d\-]+ REPLACE WITH [^<]+
				var r, r1, r2;//, r3;
				r1 = /<span itemprop="streetAddress">([^<]*)<\/span><br \/><span itemprop="addressLocality">([^<]*)<\/span>, <span itemprop="addressRegion">([^<]*)<\/span>, ([^<]+)<span itemprop="addressCountry">([^<]*)<\/span>/.exec(rs);
				r2 = /<p div itemprop="address" itemscope itemtype="[^"]*">((.|\s)*?(?=<\/p>|$)|$)/.exec(rs);
				console.log(r1);
				console.log(r2);
				//~ console.log(r3);
				
				if (r1) {
					r = r1;
					
					// ...
					delete r.index;
					delete r.input;
					delete r.length;
					
					// ...
					for (var i = 1; i<= 5; i++) {
						r[i] = __js_clean_html_str(r[i]).trim().replace(/\s+/g, ' ');
					}
					
					if (opts.output_elements.hasOwnProperty('street'))
						opts.output_elements.street.value = r[1];
					
					if (opts.output_elements.hasOwnProperty('city'))
						opts.output_elements.city.value = r[2];
					
					if (opts.output_elements.hasOwnProperty('state'))
						opts.output_elements.state.value = r[3];
					
					if (opts.output_elements.hasOwnProperty('zip'))
						opts.output_elements.zip.value = r[4];
					
					if (opts.output_elements.hasOwnProperty('country'))
						opts.output_elements.country.value = r[5];
						
					//~ document.getElementById('address1').value = r[1];
					//~ document.getElementById('city').value = r[2];
					//~ document.getElementById('state').value = r[3];
					//~ document.getElementById('postalcode').value = r[4];
					
					
				}
				
				if (!r1 && r2) {
					r = r2;
					r[1] = r[1]
						.replace(/<span itemprop="telephone">[^<]*/g, '')
						.replace(/<[^>]*>/g, ' ')
						.replace(/\s+/g, ' ')
						.trim();
					r[1] = __js_clean_html_str(r[1]);
					
					// First el?
					opts.output_elements[0].value = r[1];
				}
			}
		});
	}
	function hoovers_addr() {
		d1b.innerHTML = '';
		//
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: 'http://www.hoovers.com/company-information/company-search.html?term=+'+encodeURIComponent(d2.value)+'&sortDir=Descending&sort=SalesUS&maxitems=50', //#
			//~ timeout:30000,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				// /company-information/cs/company-profile.Cap_Gemini_SA.6af800b9fd01669c.html
				// Cap Gemini S.A.
				// Paris, France
				// $13563.88M
				var r = /<td><a href="([^"]+)">([^<]*)<\/a><\/td>[\r\n\t\s]+<td>([^<]*)<\/td>[\r\n\t\s]+<td>([^<]*)<\/td>/g;
				var m;
				while (m = r.exec(rs)) {
					
					var div = document.createElement('div');
					div.setAttribute('style', 'width:98%;border-bottom:1px solid teal;');
					
					var inp = document.createElement('button');
					inp.setAttribute('style', 'width:98%;text-align:left;cursor:pointer;');
					inp.innerHTML = m[2];
					inp.url_hv = 'http://www.hoovers.com' + m[1];
					inp.name_hv = m[2];
					
					inp.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						
						// focus
						opts.first_element.focus();
						
						hoovers_addr_prof(this);
					}
					
					div.appendChild(inp);
					
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode(m[3]));
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode(m[4]));
					
					d1b.appendChild(div);
				}
				if (d1b.innerHTML == '') {
					d1b.innerHTML = '0';
				} else {
					var div = document.createElement('div');
					div.setAttribute('style', 'height:1400px;');
					d1b.appendChild(div);
				}
			}
		});
	}
	function FB_addr() {
		d1.innerHTML = '';
		
		var u = 
			'https://graph.facebook.com/search'+
			'?q='+encodeURIComponent(d2.value)+'&type=user&type=page'+
			'&fields=category,id,name,likes,talking_about_count,location,link'+
			'&limit=6'+
			'&access_token=114463268581528|6619aa9c8ea70e1228c17c69ab1882be';
			//'&access_token=114463268581528|0dyWLwILhmGwtvdenkm1tAxuWNM';
		
		// search?q=antiflag&type=user&type=page&fields=category,id,name,likes,talking_about_count
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: u,
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				var r = JSON.parse(rs);
				
				if (!r.data) {
					d1.innerHTML = '!r.data';
					return;
				}
				
				r = r.data;
				
				var c = 0;
				for (var i in r) {
					
					if (r[i].type) {
						if (r[i].type == 'event') continue;
					}
					
					if (r[i].talking_about_count != null) {
					} else
						r[i].talking_about_count = '';
					if (r[i].likes != null) {
					} else
						r[i].likes = '';
					
					if (r[i].location) {
						if (r[i].location.latitude) {
							delete r[i].location.latitude;
						}
						if (r[i].location.longitude) {
							delete r[i].location.longitude;
						}
					}
					
					//~ 
					//~ var y = JSON.stringify(r[i]);//.replace(/"/g, '&pos;');
					//~ 
					
					var div = document.createElement('div');
					div.setAttribute('style', 'width:98%;border-bottom:1px solid teal;');
					
					var inp = document.createElement('button');
					inp.setAttribute('style', 'width:98%;text-align:left;cursor:pointer;');
					inp.innerHTML = r[i].name;
					inp.json_object = r[i];
					
					inp.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						
						// focus
						opts.first_element.focus();
						
						// clear
						clear_output_elements();
							
						//~ console.log(this.id);
						//~ var i = JSON.parse(this.id);
						//~ 
						//~ console.log(i);
						
						var i = this.json_object;
						
						if (i.name) {
							//~ document.getElementById('OtherNames').value = i.name;
						}
						if (i.link) {
							//~ document.getElementById('SourceURL').value = i.link;
						}
						if (i.location) {
							i = i.location;
							if (i.street && opts.output_elements.hasOwnProperty('street')) {
								i.street = i.street.replace(/\s+/g, ' ');
								opts.output_elements.street.value = i.street;
							}
							if (i.city && opts.output_elements.hasOwnProperty('city')) {
								opts.output_elements.city.value = i.city;
							}
							if (i.state && opts.output_elements.hasOwnProperty('state')) {
								opts.output_elements.state.value = i.state;
							}
							if (i.zip && opts.output_elements.hasOwnProperty('zip')) {
								opts.output_elements.zip.value = i.zip.replace(/-\d{4}$/, ''); // REPLACE -XXXX
							}
							if (i.country && opts.output_elements.hasOwnProperty('country')) {
								opts.output_elements.country.value = i.country;
							}
						}
						//~ document.getElementById('OtherNames').focus();
						//~ document.getElementById('OtherNames').select();
					}
					div.appendChild(inp);
					
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode('L:'+r[i].likes));
					div.appendChild(document.createElement('br'));
					div.appendChild(document.createTextNode('T:'+r[i].talking_about_count));
					
					if (r[i].category) {
						div.appendChild(document.createElement('br'));
						div.appendChild(document.createTextNode('C:'+r[i].category));
					}
					
					if (r[i].location) {
						for (var j in r[i].location) {
							div.appendChild(document.createElement('br'));
							div.appendChild(document.createTextNode('A::'+r[i].location[j]));
						}
					}
					
					d1.appendChild(div);
					
					if (c==0) { // && !found
						
						var match__ = r[i].name;
						match__ = match__.replace(/&/g, 'and');
						match__ = match__.replace(/^the /i, '');
						match__ = match__.replace(/[^\d\w\-_]/g, '').trim().toLowerCase();
						match__ = match__.replace(/(official|music)$/i, '');
						
						console.log(match__);
						console.log(match_o);
						
						if  (
							match_o == match__ &&
							match_o.length >= 3
							)
						{
							//~ found = true;
							//~ 
							//~ var x = d1.getElementsByTagName('input');
							//~ x = x[x.length - 1];
							//~ x.style.backgroundColor = 'LightGreen';
						}
					}
					c++;
				}
				
				if (c == 0) {
					d1.innerHTML = '0';
					return;
				}
				
				// Here?
				var div = document.createElement('div');
				div.setAttribute('style', 'height:1400px;');
				d1.appendChild(div);
			}
		});
	}
}
/**
 * function xhr_scrape_page
 *
 * .parent_el
 * .keyword_and_index_array
 * .url
 * .short_filename (give filename)
 * .callback_loaded (xhr complete)
 * .replace_absolute_url (bool)
 */
AMT___items_factory.prototype.xhr_scrape_page = function(options_object) {
	
	var options_object = options_object;
	
	var out = options_object.parent_el;
	
	var err_status = {
		s: '2px solid orange'
	};
	var err_TimeWarner = {
		i: '<html><head><meta http-equiv="refresh" content="0;url=http://www.dnsrsearch.com/index.php?origURL=', // /etc/hosts?
		m: 'T.W.',
		s: '2px solid orange'
	};
	//~ i: '<html><head><title>Time Warner Cable</title>',
	
	// Make divs
	// Indexes, Context
	var div = document.createElement('div');
	div.setAttribute('style', 'display:block;');
	out.appendChild(div);
	out.xhr_scrape_page__index = div;
	var div = document.createElement('div');
	div.setAttribute('style', 'display:none;');
	out.appendChild(div);
	out.xhr_scrape_page__context = div;
	
	
	// Is this a URL
	// or already downloaded?
	if (options_object.html) {
		parse(options_object.html);
		return;
	} else {
		// do xhr
	}
	
	/**
	 * Function phone_regex
	 */
	function phone_regex(kw) {
		
		kw = kw.replace(/[^\d]/g, '');
		kw_arr = kw.split(''); // [6, 0, 7]
		kw_arr2 = ['.{0,3}']; // START WITH any single character
		for (var i in kw_arr) {
			kw_arr2.push(kw_arr[i]);
			kw_arr2.push('.{0,3}'); // any single character
		}
		kw = kw_arr2.join('');
		
		return kw;
		//~ var regex = new RegExp('([\d\D]{0,6})(' + __js_escape_regEx(kw) + ')([\d\D]{0,6})', 'gi');
	}
	
	/**
	 * Function activate_element
	 */
	function activate_element() {
		
		out.onmouseover = function() {
			this.xhr_scrape_page__context.style.display = 'block';
			//~ this.xhr_scrape_page__context.style.width = '';
		}
		out.onmouseout = function() {
			this.xhr_scrape_page__context.style.display = 'none';
			//~ this.xhr_scrape_page__context.style.width = '1%';
		}
		
	}
	
	/**
	 * parse
	 */
	function parse(rs) {
		
		// key -> value
		var kw = options_object.keyword_and_index_array;
		
		var len = (options_object.hasOwnProperty('context_len')) ? options_object.context_len : 6;
		
		console.log(kw);
		
		var foundMatch = false;
		
		for (var index in kw) {
			
			// IF BLANK THEN CONTINUE
			if (kw[index].trim() == '')
				continue;
			
			var keyword = kw[index];
			var keyword_reg = kw[index];
			
			// Is phone?
			if (index == 'P') {
				keyword_reg = phone_regex(keyword);
				
			} else {
				keyword_reg = __js_escape_regEx(keyword);
			}
			
			// Regex
			var regex = new RegExp('([\\d\\D]{0,'+len+'})(' + keyword_reg + ')([\\d\\D]{0,'+len+'})', 'gi');
			//~ console.log(regex);
			
			if (!regex.exec(rs))
				continue;
			else
				foundMatch = true; // !
			
			// Add KEY to Index div
			var x = out.xhr_scrape_page__index.innerText;
			x = (x + '|' + index);
			x = x.replace(/^\|/g, '');
			out.xhr_scrape_page__index.innerText = x;
			
			// ...
			// Add CONTEXT to Context div
			regex.lastIndex = 0;
			var m;
			var count = 0;
			while (m = regex.exec(rs)) {
				
				var sp = document.createElement('span');
				sp.setAttribute('style', '');
				sp.innerText = m[1];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var sp = document.createElement('span');
				sp.setAttribute('style', 'font-weight:bold;');
				sp.innerText = m[2];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var sp = document.createElement('span');
				sp.setAttribute('style', '');
				sp.innerText = m[3];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var hr = document.createElement('hr');
				hr.setAttribute('style', 'margin:0;padding:0;border:0;border-bottom:2px dotted #828282;');
				out.xhr_scrape_page__context.appendChild(hr);
				
				//~ out.xhr_scrape_page__context.innerHTML += MT___bold(m[1], [ kw[index] ]);
				
				if (count > 6) // !
					break;
				count++;
			}
		}
		
		if (foundMatch) {
			activate_element();
			return;
		}
	}
		
	/**
	 * xhr
	 */
	//~ console.log(options_object.url);
	
	var url = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(options_object.url);
	if (options_object.hasOwnProperty('short_filename')) {
		url += '&AMT__output_html_from_URL__short_filename=' + encodeURIComponent(options_object.short_filename);
	}
	if (options_object.hasOwnProperty('replace_absolute_url')) {
		url += '&AMT__output_html_from_URL__options=' + encodeURIComponent(JSON.stringify(
			{
				replace_absolute_url: true
			}
		));
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		//~ url: options_object.url,
		timeout: 30000,
		ontimeout: function() {
			
		},
		onerror: function() {
			
		},
		onload: function (response) {
			var rs = response.responseText;
			
			// not 200 response.status
			if (response.status > 399) { // 400 - 599
				out.xhr_scrape_page__index.innerText = response.status;
				out.xhr_scrape_page__index.style.border = err_status.s;
				return;
			}
			// not 200 response.responseText
			if (/^[45]\d{2}$/.exec(rs)) { // 400 - 599
				out.xhr_scrape_page__index.innerText = rs;
				out.xhr_scrape_page__index.style.border = err_status.s;
				return;
			}
			
			// Time Warner
			if (rs.indexOf(err_TimeWarner.i) != -1) {
				out.xhr_scrape_page__index.innerText = err_TimeWarner.m;
				out.xhr_scrape_page__index.style.border = err_TimeWarner.s;
				return;
			}
			
			parse(rs);
			
			if (options_object.hasOwnProperty('callback_loaded'))
				options_object.callback_loaded(options_object);
		}
	});
}
/**
 * function create_annotation_to_output_fields
 * 
 * Handles buttons/div?/p? mousedown, mouseup events.
 * Handles body.mouseup event.
 * Draggable.
 * Outputs to output_fields in order of NEXT EMPTY.
 * OnMouseUp, focus to output_fields[current].
 * >> Callback function @ mouseup.
 * 
 * @return appendable inputs
 * 
 * @param {} options_object
 * @param options_object.textToAnnotate = String
 * @param options_object.output_fields = []
 * @param options_object.callback_mouseup = Function
 * @param options_object.callback_mouseup_pre_apply = Function
 * 
 * @param appendToField
 * @param appendToField_glue
 *
 * @param delimeter
 * @param focusToField
 * 
 * @param style
 */
AMT___items_factory.prototype.create_annotation_to_output_fields = function(options_object) {
	
	// vars
	//
	//~ console.log(options_object);
	
	// Delimeter
	if (!options_object.delimeter)
		options_object.delimeter = ' ';
	
	// The string
	//
	var s = options_object.textToAnnotate.split(options_object.delimeter);
	var array_all_buttons = [];
	var div = makeCont();
	for (var i in s) {
		appendButton(div, s[i], i);
	}
	
	var options_object = options_object;
	
	var output_fields = options_object.output_fields;
	var current_selection = [];
	var current_index = {
		start: 0,
		end: 0
	}
	var isDragging = false;
	
	/**
	 * function body_mouse
	 * This will set isDragging to false!
	 * 
	 */
	//~ document.body.addEventListener('mousedown', body_mouse, false); // ?
	document.body.addEventListener('mouseup', body_mouse, false);
	function body_mouse() {
		
		// If isDragging is true then
		// reset the hover color!
		if (isDragging) {
			
			//~ console.log(current_index);
			//~ console.log(array_all_buttons[current_index.start]);
			
			array_all_buttons[current_index.start].style.backgroundColor = '#fff';
		}
		isDragging = false;
	}
	//~ document.body.onmousedown = document.body.onmouseup = function() {
	
	// return for *append*
	return div;
	
	function style_mouseUpButton_success(btn) {
		//
		//
		//
		if (options_object.hasOwnProperty('style_mouseUpButton_success')) {
			btn.setAttribute('style', options_object.style_mouseUpButton_success);
		}
		// Default = LightGreen
		//
		//
		else
			btn.style.backgroundColor = 'LightGreen';
	}
	
	/**
	 * function applyToOutputs
	 *
	 */
	function applyToOutputs() {
		
		var s = '';
		if (current_index.start <= current_index.end) { // ++
			for (var i = current_index.start; i <= current_index.end; i++) {
				style_mouseUpButton_success(array_all_buttons[i]);
				s += ' ' + array_all_buttons[i].full_text;
			}
		} else { // --
			for (var i = current_index.end; i <= current_index.start; i++) {
				style_mouseUpButton_success(array_all_buttons[i]);
				s += ' ' + array_all_buttons[i].full_text;
			}
			
			// THIS WOULD PUT IT IN REVERSE!
			// As in "cat black the" instead of
			// "the black cat".
			//for (var i = current_index.start; i >= current_index.end; i--) {
		}
		s = s.trim();
		
		// callback_mouseup_pre_apply
		//
		//
		if (options_object.hasOwnProperty('callback_mouseup_pre_apply')) {
			options_object.callback_mouseup_pre_apply(options_object);
		}
		
		// appendToField
		//
		//
		if (options_object.hasOwnProperty('appendToField')) {
			if (options_object.hasOwnProperty('appendToField_glue')) {
				output_fields[0].value += options_object.appendToField_glue;
			}
			
			if (options_object.hasOwnProperty('focusToField') && options_object.focusToField) {
				output_fields[0].focus();
			} else {
				// It is necessary here to call blur(). The 
				// focus() call will usually cause a *cancellation*
				// of the "dragging" behavior. So when there is
				// not the focus() call, blur() will also achieve
				// *cancellation*.
				output_fields[0].blur();
			}
			
			output_fields[0].value += s;
			output_fields[0].value = output_fields[0].value.trim();
			
			//~ output_fields[0].select();
			//~ output_fields[0].focus();
			
			// CALLBACK
			if (options_object.callback_mouseup) {
				options_object.callback_mouseup(s);						// THIS SENDS BACK THE STRING ADDED
			}
			return;
		}
		 
		//
		for (var i in output_fields) {
			if (output_fields[i].value == '') {
				output_fields[i].value = s;
				output_fields[i].focus();
				output_fields[i].select();
				output_fields[i].select();
				
				// CALLBACK
				if (options_object.callback_mouseup) {
					options_object.callback_mouseup(output_fields[i]);	// THIS SENDS THE FIELD BACK
				}
				break;
			}
		}
	}
	
	/**
	 * function add_index
	 */
	function add_index(new_index) {
		
		current_index.end = new_index;
		
		// DON'T DO THIS! ALWAYS SAY THAT THE
		// START IS THE FIRST BUTTON CLICKED.
		//~ // Is this less than the beginning?
		//~ // Does this button come before .start?
		//~ // If so then this button becomes .start
		//~ // and .start becomes .end
		//~ // Otherwise, set new_index to be .end.
		//~ if (new_index < current_index.start) {
			//~ current_index.end   = current_index.start;
			//~ current_index.start = new_index;
		//~ } else 
			//~ current_index.end = new_index;
		
	}
	/**
	 * function appendButton
	 * Append button with "text" and "index" to "div"
	 * 
	 * 
	 * @param: div
	 * @param: text
	 * @param: index
	 */
	function appendButton(div, text, index) {
		
		var t = document.createElement('button');
		t.setAttribute('type', 'button');
		if (options_object.hasOwnProperty('style'))
			t.setAttribute('style', options_object.style);
		else
			t.setAttribute('style', 'border-radius:2px;border:0;zoom:1.4;background-color:#fff;cursor:pointer;');
		
		//~ t.setAttribute('style', 'border-radius:2px;border:1px solid blue;zoom:1.4;background-color:#fff;');
		t.index = index;
		t.innerHTML = text;
		t.full_text = text;
		
		t.onmousedown	= function() {
			
			this.style.backgroundColor = 'LightGreen';
			current_index.start = this.index * 1; // WOW. MAKE SURE TO MULTIPLY BY 1. AT "10" THIS BECOMES A STRING.
			current_index.end   = this.index * 1;
			
			//~ isActive = true;
			isDragging = true;
		}
		
		t.onmouseup		= function() {
			
			// Only apply if... isDragging?
			//
			//
			if (isDragging) {
				add_index(this.index);
				
				isDragging = false;
				
				applyToOutputs();
			}
			
		}
		
		t.onmouseover	= function() {
			
			this.style.cursor = 'pointer'; //?
			
			// Highlight
			// from index.start to index.end
			
			if (isDragging) {
				
				add_index(this.index);
				
				//~ console.log('this:'+this.index);
				//~ console.log(current_index);
				
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				}
				//~ for (var i = current_index.start; i <= current_index.end; i++) {
					//~ array_all_buttons[i].style.backgroundColor = 'LightGreen';
				//~ }
			}
			
			else
			{
				
			}
		}
		
		t.onmouseout	= function() {
			
			if (isDragging) {
				// RESET ALL HOVER COLOR!
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						array_all_buttons[i].style.backgroundColor = '#fff';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						array_all_buttons[i].style.backgroundColor = '#fff';
					}
				}
				
				// Reset the index.end to whatever
				// is the index.start.
				// And then *just* the initial word
				// is to have background color.
				current_index.end = current_index.start;
				array_all_buttons[current_index.start].style.backgroundColor = 'LightGreen';
			}
			
		}
		
		// append here
		div.appendChild(t);
		
		// push here
		array_all_buttons.push(t);
	}
	
	/**
	 * function makeCont
	 * Container for all the buttons.
	 */
	function makeCont() {
		
		var d = document.createElement('div');
		d.setAttribute('style', 'width:100%;');
		//~ d.setAttribute('style', 'display:inline;');
		
		return d;
	}
	
}
/**
 * function create_annotation_from_elements
 * 
 * @return ?
 * 
 * @param options_object {}
 * @param options_object.elements = Array
 * @param options_object.callback_mouseup = Function
 * 
 * xx@param focusToField
 * xx
 * xx@param style
 */
AMT___items_factory.prototype.create_annotation_from_elements = function(options_object) {
	
	// vars
	//
	var options_object = options_object;
	
	// GIVE options_object A REFERENCE BACK TO THIS SCOPE.
	options_object.tmp_scope = reset_btn_sizing;
	
	//~ console.log(options_object);
	
	// The string
	//
	var array_all_buttons = [];
	var s = options_object.elements;
	for (var i in s) {
		
		element_actions(s[i], i);
	}
	
	
	var current_selection = [];
	var current_index = {
		start: 0,
		end: 0
	}
	var isDragging = false;
	
	/**
	 * function body_mouse
	 * This will set isDragging to false!
	 * 
	 */
	//~ document.body.addEventListener('mousedown', body_mouse, false); // ?
	document.body.addEventListener('mouseup', body_mouse, false);
	function body_mouse() {
		
		// If isDragging is true then
		// reset the hover color!
		if (isDragging) {
			
			//~ console.log(current_index);
			//~ console.log(array_all_buttons[current_index.start]);
			
			array_all_buttons[current_index.start].style.backgroundColor = '#fff';
		}
		isDragging = false;
	}
	//~ document.body.onmousedown = document.body.onmouseup = function() {
	
	
	
	
	
	
	//~ // return for *append*
	//~ //return div;
	
	
	/**
	 * function applyToOutputs
	 *
	 */
	function applyToOutputs() {
		
		// Make an array of "hidden" elements.
		var arr = [];
		for (var i in array_all_buttons) {
			if (array_all_buttons[i].toggleState == 1) {
				arr.push(array_all_buttons[i].hiddenElement);
			}
		}
		
		// Reset these
		if (current_index.start <= current_index.end) { // ++
			for (var i = current_index.start; i <= current_index.end; i++) {
				toggle_btn(array_all_buttons[i], 0);
				
				//~ array_all_buttons[i].style.opacity = '0';
				//~ array_all_buttons[i].style.backgroundColor = 'transparent';
			}
		} else { // --
			for (var i = current_index.end; i <= current_index.start; i++) {
				toggle_btn(array_all_buttons[i], 0);
				
				//~ array_all_buttons[i].style.opacity = '0';
				//~ array_all_buttons[i].style.backgroundColor = 'transparent';
			}
			
			// THIS WOULD PUT IT IN REVERSE!
			// As in "cat black the" instead of
			// "the black cat".
			//for (var i = current_index.start; i >= current_index.end; i--) {
		}
		
		// CALLBACK
		if (options_object.callback_mouseup) {
			options_object.callback_mouseup(arr, options_object);
		}
	}
	
	/**
	 * function add_index
	 */
	function add_index(new_index) {
		
		current_index.end = new_index;
		
		// DON'T DO THIS! ALWAYS SAY THAT THE
		// START IS THE FIRST BUTTON CLICKED.
		//~ // Is this less than the beginning?
		//~ // Does this button come before .start?
		//~ // If so then this button becomes .start
		//~ // and .start becomes .end
		//~ // Otherwise, set new_index to be .end.
		//~ if (new_index < current_index.start) {
			//~ current_index.end   = current_index.start;
			//~ current_index.start = new_index;
		//~ } else 
			//~ current_index.end = new_index;
		
	}
	
	/**
	 * function toggle_btn
	 * 
	 * 
	 */
	function toggle_btn(btn, state) {
		
		if (state == 1) { // Go on
			btn.style.opacity = '0.4';
			btn.style.backgroundColor = 'LightGreen';
			btn.toggleState = 1;
		} else { // It == 0, so off
			btn.style.opacity = '0';
			btn.style.backgroundColor = 'transparent';
			btn.toggleState = 0;
		}
	}
	
	/**
	 * function reset_btn_sizing
	 * 
	 * 
	 */
	function reset_btn_sizing() {
		
		for (var i in array_all_buttons) {
			
			var btn = array_all_buttons[i];
			
			var imgSz = btn.hiddenElement.getBoundingClientRect();
			btn.style.width		= imgSz.width  + 'px';
			btn.style.height	= imgSz.height + 'px';
			btn.style.left		= (imgSz.left*1+window.pageXOffset*1) + 'px';
			btn.style.top		= (imgSz.top*1+window.pageYOffset*1) + 'px';
			
		}
		
	}
	
	/**
	 * function element_actions
	 * 
	 * @param: element
	 * @param: index
	 */
	function element_actions(element, index) {
		
		//~ var t = element;
		
		var btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		if (options_object.hasOwnProperty('style'))
			btn.setAttribute('style', options_object.style);
		else
			btn.setAttribute('style', 'border-radius:2px;border:0;background-color:transparent;cursor:pointer;position:absolute;');
		
		btn.index = index;
		btn.hiddenElement = element; // A property for element
		btn.toggleState = 0;
		
		// Set the size
		var imgSz = element.getBoundingClientRect();
		btn.style.width		= imgSz.width  + 'px';
		btn.style.height	= imgSz.height + 'px';
		btn.style.left		= (imgSz.left*1+window.pageXOffset*1) + 'px';
		btn.style.top		= (imgSz.top*1+window.pageYOffset*1) + 'px';
		document.body.appendChild(btn);
		
		btn.onmousedown	= function() {
			
			this.style.backgroundColor = 'LightGreen';
			current_index.start = this.index * 1; // WOW. MAKE SURE TO MULTIPLY BY 1. AT "10" THIS BECOMES A STRING.
			current_index.end   = this.index * 1;
			
			//~ isActive = true;
			isDragging = true;
		}
		
		btn.onmouseup		= function() {
			
			// Only apply if... isDragging?
			//
			//
			if (isDragging) {
				//~ console.log('up + dragging');
				
				toggle_btn(this, 1); // on?
				
				add_index(this.index);
				
				isDragging = false;
				
				applyToOutputs();
			}
			
		}
		
		btn.onmouseover	= function() {
			
			// Highlight
			// from index.start to index.end
			
			if (isDragging) {
				
				add_index(this.index);
				
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						toggle_btn(array_all_buttons[i], 1);
						//~ array_all_buttons[i].style.opacity = '0.4';
						//~ array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						toggle_btn(array_all_buttons[i], 1);
						//~ array_all_buttons[i].style.opacity = '0.4';
						//~ array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				}
				//~ for (var i = current_index.start; i <= current_index.end; i++) {
					//~ array_all_buttons[i].style.backgroundColor = 'LightGreen';
				//~ }
			}
			
			else
			{
				
			}
		}
		
		btn.onmouseout	= function() {
			
			if (isDragging) {
				// RESET ALL HOVER COLOR!
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						toggle_btn(array_all_buttons[i], 0);
						//~ array_all_buttons[i].style.opacity = '0';
						//~ array_all_buttons[i].style.backgroundColor = 'transparent';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						toggle_btn(array_all_buttons[i], 0);
						//~ array_all_buttons[i].style.opacity = '0';
						//~ array_all_buttons[i].style.backgroundColor = 'transparent';
					}
				}
				
				// Reset the index.end to whatever
				// is the index.start.
				// And then *just* the initial word
				// is to have background color.
				current_index.end = current_index.start;
				toggle_btn(array_all_buttons[current_index.start], 1);
				//~ array_all_buttons[current_index.start].style.opacity = '0.4';
				//~ array_all_buttons[current_index.start].style.backgroundColor = 'LightGreen';
			}
			
		}
		
		// push here
		array_all_buttons.push(btn);
	}
	
	/**
	 * function makeCont
	 * Container for all the buttons.
	 */
	function makeCont() {
		
		var d = document.createElement('div');
		d.setAttribute('style', 'width:100%;');
		//~ d.setAttribute('style', 'display:inline;');
		
		return d;
	}
	
}
/**
 * function create_dashboard__powers_v1__showScrapyResult_contexts
 * 
 * THIS IS A HELPER FUNCTION FOR create_dashboard__powers_v1
 * 
 * @param results_array
 * @param out_div
 * @param seed_object.{}
 * @param seed_object.input_send_success
 * @param seed_object.do_submit_callback
 * @param seed_object.input_onclick_callback
 * @param seed_object.do_submit_next_tab
 * @param seed_object.do_submit_add_to_tabs_queue
 */
// switch select field of d1
AMT___items_factory.prototype.create_dashboard__powers_v1__showScrapyResult_contexts = function(results_array, out_div, seed_object) {
	//var out_div = d1;
	
	//~ console.log(results_array);
	//~ console.log(out_div);
	//~ console.log(seed_object);return;
	
	var old_divs = out_div.getElementsByTagName('div');
	for (var i = old_divs.length - 1; i>=0; i--) {
		old_divs[i].parentNode.removeChild(old_divs[i]);
	}
	
	var email_contexts = results_array.email_contexts;
	var url = results_array.url;
	
	var el_div = document.createElement('div');
	el_div.setAttribute('style','width:100%;height:40px;overflow:auto;border:1px solid #a2a2a2;');
	el_div.innerText = url;
	
	var el_a = document.createElement('a');
	el_a.href = url;
	el_a.target = '_blank';
	el_a.innerText = url;
	el_div.appendChild(el_a);

	out_div.appendChild(el_div);
	
	// ...
	var input_send_success		= (seed_object.input_send_success)		? seed_object.input_send_success : document.getElementById('Q1Url'); // default Q1Url
	
	var do_submit_callback		= (seed_object.do_submit_callback)		? seed_object.do_submit_callback : default__doSubmit;
	
	var input_onclick_callback	= (seed_object.input_onclick_callback)	? seed_object.input_onclick_callback : false;
	
	var do_submit_next_tab			= (seed_object.do_submit_next_tab)			? seed_object.do_submit_next_tab : false;
	
	var do_submit_add_to_tabs_queue	= (seed_object.do_submit_add_to_tabs_queue)	? seed_object.do_submit_add_to_tabs_queue : false;
	
	// default ds
	function default__doSubmit(next_tab, add_to_tabs_queue) {
		
		if (next_tab)
		{
			new AMT___core_factory().nextTab();
		}
		if (add_to_tabs_queue)
		{
			showNextTab();
		}
		doSubmit();
	}
	
	// ...
	for (var j in email_contexts) {
		var context = email_contexts[j]	.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
		context = __js_clean_html_str(context);
		context = context				.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
		//context = context.replace(/[\r\n]/g, '<br>');
		context = context.replace(/\t/g, '&nbsp;&nbsp;');
		context = context.replace(/\s{2,}/g, '&nbsp;&nbsp;');
		context = context.replace(
			new RegExp('(' + __js_escape_regEx(results_array.email_email) + ')', 'gi'),
			'<span style="zoom:1.2;color:DarkGreen;">$1</span>'
		);
		//context = MT__bold(context, NAME_ARRAY);
		
		var el_div = document.createElement('div');
		el_div.setAttribute('style','cursor:pointer;width:100%;border-bottom:1px dashed #626262;');
		//el_div.setAttribute('style','cursor:pointer;min-width:400px;width:60%;height:140px;overflow:auto;border:1px solid #a2a2a2;');
		//newDiv.setAttribute('style','border-bottom:1px dashed #626262;margin:0;padding:0;cursor:pointer;');
		
		

		el_div.innerHTML = context;
		el_div.email = results_array.email_email;
		el_div.complete = results_array.email_email;
		el_div.url = url;

		
		//input_success
		el_div.input_send_success	= input_send_success;
		
		//do_submit_callback
		el_div.do_submit_callback	= do_submit_callback;
		
		//do_submit_callback
		el_div.do_submit_next_tab	= do_submit_next_tab;
		
		//do_submit_callback
		el_div.do_submit_add_to_tabs_queue	= do_submit_add_to_tabs_queue;
		
		//onclick
		if (!input_onclick_callback) {
			el_div.onclick = function() {
				this.style.backgroundColor = 'LightGreen';
				
				this.input_send_success.value = this.email;
				if (this.email.length > 6 && this.email.indexOf('@') != -1 && this.input_send_success && this.input_send_success.value == this.email) {
					
					this.do_submit_callback(this.do_submit_next_tab, this.do_submit_add_to_tabs_queue);
					//~ doSubmit();
				
				}
			}
		}
		else
		{
			el_div.onclick = input_onclick_callback;
		}
		
		out_div.appendChild(el_div);
	}
	
	//extend page
	var el_div = document.createElement('div');
	el_div.setAttribute('style','height:1400px;');
	out_div.appendChild(el_div);
}
/**
 * .create_dashboard__powers_v2
 * 
 * TODO.......
 * 
 * Email table that is sortable.
 * Columns:
 *  Email, Page where scraped
 * 
 * All pages scraped table. (incl. stats?)
 * 
 * And all contexts.
 */
// 
//
// callback_function(jobid, callback_obj, seed_object);
// IS NOT REQUIRED !! jobid !! IS NOT REQUIRED
AMT___items_factory.prototype.create_dashboard__powers_v2 = function(object_response, seed_object)// dashboard/area
{
	//@callback_function: Return 1) scrapyd jobid, 2) response_object, 3) seed_object 
	//~ var req = new AMT___requests_factory();
	//~ AMT___POPUP__initializeGlobals(
		//~ function() {
			//~ req.scrapy__begin_scrape(//parameters_object, callback_function, seed_object
				//~ s_obj,
				//~ Max_Powers_eventbrite__showScrapyResult
				//~ (new AMT___items_factory).create_dashboard__powers_v1
			//~ );
		//~ }
	//~ );
		
	// jobid, object_response, seed_object
	// RESULTS
	//var object_response = ALL_SCRAPES[d3.selectedIndex].object_response; // [] array !!
	
	var out_div = seed_object.div;
	
	out_div.innerHTML = '';
	
	
	
	
	
	
	
	
	
	
	return;
}
//
// callback_function(jobid, callback_obj, seed_object);
// IS NOT REQUIRED !! jobid !! IS NOT REQUIRED
AMT___items_factory.prototype.create_dashboard__powers_v1 = function(object_response, seed_object)// dashboard/area
{
	var out_div = seed_object.div;
	
	out_div.innerHTML = '';
	
	//~ console.log(object_response);
	//~ console.log(seed_object);return;
	
	//@callback_function: Return 1) scrapyd jobid, 2) response_object, 3) seed_object 
	//~ var req = new AMT___requests_factory();
	//~ AMT___POPUP__initializeGlobals(
		//~ function() {
			//~ req.scrapy__begin_scrape(//parameters_object, callback_function, seed_object
				//~ s_obj,
				//~ Max_Powers_eventbrite__showScrapyResult
				//~ (new AMT___items_factory).create_dashboard__powers_v1
			//~ );
		//~ }
	//~ );
		
	// jobid, object_response, seed_object
	// RESULTS
	//var object_response = ALL_SCRAPES[d3.selectedIndex].object_response; // [] array !!
	
	// 
	// seed_object.skip_if_no_emails
	//
	//
	if  (
		seed_object.hasOwnProperty('skip_if_no_emails') &&
		seed_object.skip_if_no_emails &&
		AMT__Global_Vars.isPreview &&
		object_response.matches.length == 0
		)
	{
		AMT___Floater.skip();
		return;
		//~ if (object_response.matches.length == 0) {
			//~ AMT___Floater.skip();
			//~ return;
		//~ } else {
			//~ AMT___Floater.accept();
			//~ return;
		//~ }
	}
	
	//
	// seed_object.accept_if_emails
	//
	//
	if  (
		seed_object.hasOwnProperty('accept_if_emails') &&
		seed_object.accept_if_emails &&
		AMT__Global_Vars.isPreview &&
		object_response.matches.length != 0
		)
	{
		AMT___Floater.accept();
		return;
	}
	
	// matches select
	var el_select = document.createElement('select');
	out_div.appendChild(el_select);
	el_select.setAttribute('style','width:98%;height:180px;');//display:inline;
	el_select.multiple = 'multiple';
	el_select.main_div = out_div;
	el_select.seed_object = seed_object;
	el_select.onchange = function() {
		if (this.value == '') return;
		
		(new AMT___items_factory())
			.create_dashboard__powers_v1__showScrapyResult_contexts(
				this.options[this.selectedIndex].results_array,
				this.main_div,
				this.seed_object
			);
		//create_dashboard__powers_v1__showScrapyResult_contexts
		//~ Max_Powers_eventbrite__showScrapyResult_contexts(
			//~ this.options[this.selectedIndex].results_array
		//~ );
	}
	for (var i in object_response.matches) {
		rslt = object_response.matches[i];
		// add option
		el_option = document.createElement('option');
		el_option.value = rslt.email_email;
		el_option.innerText = rslt.email_email;
		// email highlight !!
		console.log(rslt.url);
		if (/https?:\/\/([^\.]+\.|)facebook.com[\/$]/i.exec(rslt.url)) { //https://www.facebook.com/voltvapes1/info 
			el_option.setAttribute('style', 'background-color:LightGreen;');
		}
		el_option.results_array = rslt;
		el_select.appendChild(el_option);
	}
	for (var i = 0; i<40; i++) { // Append blank lines!
		// add option
		el_option = document.createElement('option');
		el_option.value = '';
		el_option.innerText = '';
		el_select.appendChild(el_option);
	}
	
	// urls select
	var el_select2 = document.createElement('select');
	out_div.appendChild(el_select2);
	el_select2.setAttribute('style','width:98%;height:60px;');
	el_select2.multiple = 'multiple';
	el_select2.onclick = function() {
		if (this.value == '') return;
		window.open(this.value,'new');
	}
	//for (var i in object_response.urls) {
	//console.log(object_response.urls.complete_high_to_low);
	for (var i in object_response.urls.complete_high_to_low) {
		
		rslt = object_response.urls.complete_high_to_low[i]; // {.url, .priority}
		
		// add option
		el_option = document.createElement('option');
		el_option.value = rslt.url;
		el_option.innerText = rslt.url;
		// color
		var bg;
		switch(rslt.priority) {
			case 'high':
				bg = 'LightGreen';
				break;
			case 'low':
				bg = 'Orange';
				break;
			case 'none':
				bg = '#fff';
				break;
			case 'outside':
				bg = 'pink';
				break;
		}
		el_option.setAttribute('style', 'background-color:'+bg+';');
		el_select2.appendChild(el_option);
	}
	for (var i = 0; i<20; i++) {// append blank lines!
		// add option
		el_option = document.createElement('option');
		el_option.value = '';
		el_option.innerText = '';
		el_select2.appendChild(el_option);
	}
	
	// auto-click first email
	if (object_response.matches.length > 0) {
		(new AMT___items_factory())
			.create_dashboard__powers_v1__showScrapyResult_contexts(
				el_select.options[0].results_array,
				out_div,
				seed_object
			);
		//~ Max_Powers_eventbrite__showScrapyResult_contexts(
			//~ el_select.options[0].results_array
		//~ );
	}
	
	// br
	out_div.appendChild(document.createElement('br'));
}
//~ AMT___items_factory.prototype.create_element__textarea = function()// X: pass reference
//~ {
	//~ 
//~ }
AMT___items_factory.prototype.create__input_scrapy_button = function(short_domain,full_url,object_options,callback_function)// X: pass reference
{
	
	//short_domain,full_url,object_options,callback_function
						// options
						//Daniel_Axelsen_Find_Email__scrape_btn_options(this.value.trim()*1, this.short_domain, start_urls), 
						// callback
						//Daniel_Axelsen_Find_Email__scrapy_process_response, // arg= scrapy_jobid, array_json_list, seed_object
						// callback seed object
		
	var btnValue = object_options.arg_max_pages_to_fetch;
	var btnClass = 'class__scrapyURL__'+btnValue+'_'+short_domain;
	
	// 4,8,12,20
	var el_inp = document.createElement('input');
	el_inp.setAttribute('style','width:auto;');
	el_inp.setAttribute('type','button');
	
	el_inp.setAttribute('class',btnClass);
	el_inp.value = ' '+btnValue+' ';
	el_inp.arg_max_pages_to_fetch = btnValue;
	el_inp.short_domain = short_domain;
	el_inp.full_url = full_url;
	
	el_inp.scrapy__array_json_list = '';
	el_inp.scrapy__complete_id = '';
	
	el_inp.scrapy_opts_object = object_options;
	el_inp.scrapy_callback_function = callback_function;
	
	// id
	//~ el_inp.id = 
	
	el_inp.onclick = function(e) {
		//this.style.backgroundColor = 'LightGreen';
		
		// return if run once (!= '')
		if (this.scrapy__complete_id != '')
			return;
		
		// set complete id
		this.scrapy__complete_id = 'x';
		
		// make the list of starting URLs !!
		// and add to scraper object
		var start_urls = [];
		var url;
		var s = document.getElementsByClassName(this.className);
		for (var i in s) {
			if (i == 'length') break;
			url = s[i].full_url; // !!
			if (!__js_inarray(start_urls, url))
				start_urls.push(url);
			// update all background colors
			s[i].style.backgroundColor = 'LightGreen';
		}
		this.scrapy_opts_object.arg_start_urls = start_urls; // array
		
		//var className = 'class__scrapyURL__'+this.arg_max_pages_to_fetch+'_' + this.short_domain;
		//var s = document.getElementsByClassName(className);
		
		// requests factory
		var requests_factory = new AMT___requests_factory();
		
		requests_factory.scrapy__begin_scrape(
			
			this.scrapy_opts_object,
			
			this.scrapy_callback_function,
			{
				btn_className: this.className //,
			}
		);
		
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	
	return el_inp;
}
/**
 * domain: x,
 * load_file: 'austin_load_skips', 
 * var_skip_sites: SKIP_SITES, 
 * callback_function: false
 * 		
 * Returns an input element and bool()
 * 	{}.el_btn,
 * 	{}.isSkip
**/
AMT___items_factory.prototype.create__input_skip_button2 = function(input_skips_object) // X: pass reference
{	
	
	var input_skips_object = input_skips_object;
	
	//~ input_skips_object.short_domain = '';
	
	// ...
	// regular = ^http://www.site.com$
	// subdomains = [\.\/]site.com$
	//
	// Submdomains, update Jul9.
	// subdomains = period, comp name, period, any numer of 2-3 length extensions
	var x;
	//~ if (x = /\.([^\.]+\.[^\.]+)$/.exec(input_skips_object.domain)) {
	//
	//
	
	//http://stackoverflow.com/questions/10306690/domain-name-validation-with-regex
	var reg_domain =
		//~ '^' +
		'(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))' +
		'\\.' + 
		'([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\\.[a-zA-Z]{2,3})' +
		'$';
	
	// THIS WILL RETURN:
	// ["www.linkedin.com", "www", undefined, undefined, undefined, undefined, "www", "linkedin.com", index: 7, input: "http://www.linkedin.com"]
	// ["cylex-uk.co.uk", "cylex-uk", undefined, undefined, undefined, undefined, "cylex-uk", "co.uk", index: 20, input: "http://west-malling.cylex-uk.co.uk"]
	// ["bongareevillage.com", "bongareevillage", undefined, undefined, undefined, undefined, "bongareevillage", "com", index: 7, input: "http://bongareevillage.com"]
	if (x = new RegExp(reg_domain, '').exec(input_skips_object.domain)) {
		
		// 6 and 7
		
		// Debug
		//~ console.log(x);
		
		if (x[6] == 'www')
			x[6] = '';
		
		var tmp_domain;
		tmp_domain = (x[6] != '') ? x[6] + '.' + x[7] : x[7];
		
		
		// Contains .
		if (tmp_domain.indexOf('.') != -1)
			input_skips_object.short_domain = tmp_domain;
		else
			input_skips_object.short_domain = input_skips_object.domain.trim();
		
		
	} else
		input_skips_object.short_domain = input_skips_object.domain.trim();
	
	// Debug
	//~ console.log('domain ' + input_skips_object.domain + ' short_domain ' + input_skips_object.short_domain);
	
	// ...
	function remove_skips(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		this.onclick = function(){};
		var btn = this;
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(input_skips_object.load_file)+'='+
			'&load_skips_domain_full='+
			encodeURIComponent(input_skips_object.domain) +
			'&load_skips_domain_short='+
			encodeURIComponent(input_skips_object.short_domain) +
			'&load_skips_removeMe=';
			
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				//skip_sites_callback(btn.id);
			}
		});
		
		return false;
	}
	function write_skips(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		this.onclick = function(){};
		var btn = this;
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(input_skips_object.load_file)+'='+
			encodeURIComponent(input_skips_object.short_domain);
			
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				//skip_sites_callback(btn.id);
			}
		});
		
		return false;
	}
	function add_button(url) {
		var el_inp = document.createElement('input');
		el_inp.setAttribute('style','width:auto;');
		el_inp.setAttribute('type','button');
		el_inp.value = ' S ';
		//~ el_inp.className = 
		//~ el_inp.id = url; //argv
		//~ el_inp.skips_key_php_get = skips_key_php_get; //argv
		el_inp.onclick = write_skips;
		
		return el_inp;
	}
	function remove_button() { //url
		//~ 
		var el_inp = document.createElement('input');
		el_inp.setAttribute('style','width:auto;background-color:#eee;border:0;cursor:pointer;');
		el_inp.setAttribute('type','button');
		el_inp.value = '>' + input_skips_object.domain;
		el_inp.className = 'input_skip_button2_rm_';
		el_inp.onclick = remove_skips;
		
		return el_inp;
	}
	
	// ERR: SHORT_DOMAIN IS "com" !!!
	//~ console.log(input_skips_object);
	
	// Is this a skip?	
	if  (
		input_skips_object.var_skip_sites.hasOwnProperty( input_skips_object.short_domain ) ||
		input_skips_object.var_skip_sites.hasOwnProperty( input_skips_object.domain )
		)
	{
		return {
			el_btn: remove_button(),
			isSkip: true
		};
	}
	
	// This is not a skip.
	return {
		el_btn: add_button(),
		isSkip: false
	};
	
	//~ return el_inp; // return >to append
}
// DONE XXTODO: REMOVE FROM FILE
AMT___items_factory.prototype.create__input_skip_button = function(url, skips_key_php_get, skip_sites_callback) // X: pass reference
{	
	
	var el_inp = document.createElement('input');
	el_inp.setAttribute('style','width:auto;');//background-color:#efefef;
	el_inp.setAttribute('type','button');
	el_inp.value = ' S ';
	el_inp.id = url; //argv
	el_inp.skips_key_php_get = skips_key_php_get; //argv
	el_inp.onclick = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		var btn = this;
		this.onclick = function(){};
		
		var short_domain = this.id;
		if (y = /[\.\/]([^\.\/]{4,}\.[^\.]+)$/.exec(short_domain)) { // 4 or more! i.e. webs.com, not tw.co, not abc.co.uk
			short_domain = y[1];
		}
		//~ else
			//~ short_domain = x;
		short_domain = short_domain.replace(/^https?:\/\/(www\.|)/i, '');
		
		//short_domain = 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxtest';
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(this.skips_key_php_get)+'='+
			encodeURIComponent(short_domain); //?austin_load_skips
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				skip_sites_callback(btn.id);
			}
		});
		return false;
	}
	
	
	return el_inp; // return >to append
}
/**
 * AMT___xhr_PROXY_REDACTED_
 * @
 * @
 * 
 * @ AMT___POPUP___PROXY_REDACTED_ XXXX, @ AMT___POPUP__initializeGlobals  **get the @ AMT___POPUP___PROXY_REDACTED_ value before continuing
 * 
 * 
 */
function AMT___xhr_PROXY_REDACTED_(obj_vars) {
	// : url
	// : seed_arg1
	// : catch_include
	// : post_request (DEFAULT=null), an object {}, {query: 'query'}
	// : headers_array
	// : remove_urls_from_body, boolean, remove URLs from the result body
	
	/*
	 * obj_vars = {
	 * 		catch_include: 'This is a string that means it is time to SKIP!',
	 * 		post_request: {query: 'query'},
	 * 		startPage: true
	 * }
	 */
	
	var o = {
		local_URL_init: '',
		local_URL_complete: '',
		obj_vars: null,
		
	}
	
	var local_URL;
	var array_startPage_results;
	
	this.obj_vars = (typeof obj_vars == 'object') ? obj_vars : {};
	o.obj_vars = this.obj_vars;
	
	//~ if (!this.obj_vars.url) // URL REQUIRED
		//~ return;
		
	if (!this.obj_vars.catch_include && !this.obj_vars.hasOwnProperty('catch_include_array')) // DEFAULT
		this.obj_vars.catch_include = 'Yahoo! - 999 Unable to process request at this time -- error 999';
	
	if (this.obj_vars.startPage) {
		
		this.obj_vars.startPage_array = true;
		
		//~ this.obj_vars.catch_include = 'We want Tor users to have a great private search experience with Startpage, and we appreciate your patience while we develop a long-term solution.';
		
		this.obj_vars.catch_include_array = [
			'We want Tor users to have a great private search experience with Startpage, and we appreciate your patience while we develop a long-term solution.',
			
			// CAPTCHA, 2 DIFFERENT STRINGS FROM THE CAPTCHA ENTER PAGE.
			'As part of StartPage\'s ongoing mission to provide the best experience for our users, we occasionally need to confirm that you are a legitimate user.', // Completing the CAPTCHA below helps us reduce abuse and improve the quality of our services.
			'<h2 >Please enter the text below to continue using StartPage.</h2>'
		]
		// UPDATE
		// As part of StartPage's ongoing mission to provide the best experience for our users, we occasionally need to confirm that you are a legitimate user. Completing the CAPTCHA below helps us reduce abuse and improve the quality of our services.
		
		//~ this.obj_vars.url = 'https://startpage.com/do/search';
		//~ this.obj_vars.url = 'https://startpage.com/do/metasearch.pl';
		//~ this.obj_vars.url = 'http://216.218.239.213:443';
		//~ var query = this.obj_vars.post_request.query;
		
		/*this.obj_vars.post_request = {
			cmd: 'process_search',
			language: 'english',
			
			//~ enginecount: 1,
			//~ pl: '',
			//~ abp: -1,
			//~ cdm: '',
			//~ ff: '',
			//~ theme: '',
			//~ flag_ac: 0,
			//~ cat: 'web',
			//~ query: query//,
			
			//~ enginecount: 1,
			//~ pl: '',
			abp: -1,
			//~ cdm: '',
			//~ ff: '',
			//~ theme: '',
			//~ flag_ac: 0,
			cat: 'web',
			query: query,
			engine0:'v1all'
			
			//~ x:0,
			//~ y:0
			//~ engine0:'v1all'
			
			//~ cat=web&cmd=process_search&language=english&engine0=v1all&query=hi+im+yousdf&abp=-1&x=0&y=0
		}*/
		
		this.obj_vars.headers_array = [
			//~ 'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			//~ 'Accept-Encoding:gzip,deflate,sdch',
			//~ 'Accept-Language:en-US,en;q=0.8,nl;q=0.6,es;q=0.4,fr;q=0.2',
			//~ 'Cache-Control:max-age=0',
			//~ 'Connection:keep-alive',
			//~ 'Content-Length:91',
			//~ 'Content-Type:application/x-www-form-urlencoded',
			//~ 'Host:startpage.com',
			//~ 'Origin:https://startpage.com',
			//~ 'Referer:https://startpage.com/',
			//~ 'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
			//~ 'Expect:     ',	
			'Cookie:preferences=lang_homepageEEEs/air/eng/N1NsslEEE1N1Nfont_sizeEEEmediumN1Nrecent_results_filterEEE1N1Nlanguage_uiEEEenglishN1Ndisable_open_in_new_windowEEE1N1Ndisable_family_filterEEE1N1Nnum_of_resultsEEE10N1N'
		];
		
		this.obj_vars.catch_success = '<!DOCTYPE HTML>';
	}
	
	
	// POST REQUEST
	if (this.obj_vars.post_request) {
		
		var encodedURI = encodeURIComponent(this.obj_vars.url);
		
		// Generate a short filename
		var short_filename = this.obj_vars.url + '__POST_REQUEST__';
		for (var i in this.obj_vars.post_request) {
			short_filename += '&' + i + '=' + this.obj_vars.post_request[i];
		}
		short_filename = encodeURIComponent(short_filename);
		
		var header_array = (this.obj_vars.hasOwnProperty('headers_array')) ?
				'&get_header_array=' + encodeURIComponent( JSON.stringify(this.obj_vars.headers_array) ) :
				'';
		
		if (this.obj_vars.hasOwnProperty('catch_include_array')) { //catch_include_array
			o.local_URL_init		= 
							'/mturk/.scripts/google/get-page.php?u='+encodedURI+
							'&catch_include_array='+encodeURIComponent( JSON.stringify(this.obj_vars.catch_include_array) )+
							'&short_filename='+short_filename+
							'&get_post_array='+encodeURIComponent( JSON.stringify(this.obj_vars.post_request) ) +
							header_array;
		} else {
			o.local_URL_init		= 
							'/mturk/.scripts/google/get-page.php?u='+encodedURI+
							'&catch_include='+encodeURIComponent(this.obj_vars.catch_include)+
							'&short_filename='+short_filename+
							'&get_post_array='+encodeURIComponent( JSON.stringify(this.obj_vars.post_request) ) +
							header_array;
		}
		
		o.local_URL_complete	= 
						'/mturk/.scripts/google/get-page.php?v='+short_filename;
		
		//
		
		//~ console.log(value);//remove later
		//~ this.obj_vars.post_request = 'Yahoo! - 999 Unable to process request at this time -- error 999';
	}
	
	// GET REQUEST
	else
	{
		var encodedURI = encodeURIComponent(this.obj_vars.url);
		
		var header_array = (this.obj_vars.hasOwnProperty('headers_array')) ?
				'&get_header_array=' + encodeURIComponent( JSON.stringify(this.obj_vars.headers_array) ) :
				'';
		var catch_success = (this.obj_vars.hasOwnProperty('catch_success')) ?
				'&catch_success=' + encodeURIComponent( this.obj_vars.catch_success ) :
				'';
		
		if (this.obj_vars.hasOwnProperty('catch_include_array')) { //catch_include_array
			
			o.local_URL_init =
							'/mturk/.scripts/google/get-page.php?u='+encodedURI+
							'&catch_include_array='+encodeURIComponent( JSON.stringify(this.obj_vars.catch_include_array) )+
							header_array+
							catch_success;
		} else {
			o.local_URL_init =
							'/mturk/.scripts/google/get-page.php?u='+encodedURI+
							'&catch_include='+encodeURIComponent(this.obj_vars.catch_include) + 
							header_array+
							catch_success;
		}
		
		o.local_URL_complete = 
						'/mturk/.scripts/google/get-page.php?v='+encodedURI;
	}
	
	
	// function array_startPage_results
	//
	//
	//~ this.array_startPage_results = function(rs) {
	function array_startPage_results(rs) {
		var r = /<ol>[\r\n\s\t]*<li><div class='result' id='first-result'((.|\s)*?(?=<\/ol>|$)|$)/;
		var rslts;
		var not_enough_results_str = 'Because there are not enough results that match your query, we are showing results without quotes.';
		if(!(rslts = r.exec(rs))) {
			//~ alert('No match');
			return [];
		}
		else {
			
			// Not enough results.
			// not_enough_results_str
			// Returns []
			if (rs.indexOf(not_enough_results_str) != -1)
				return [];
			
			//Assume we have 1-10 results


			//r.lastIndex = 0;	<-- no need, not testing
			
			var ol = rslts[0];
			//~ console.log(ol);
			
			var contentReg = /<div class='result'[^>]*>[\r\n\s\t]*<h3><a href='([^']+)'[^>]*>((.|\s)*?(?=<\/li>|$)|$)/g;
			var content;
			var arr = [];
			while(content = contentReg.exec(ol)) {				
				content[2] = content[2].replace(/<b[^>]*>/gi, '(`)'); // MUST REMOVE ^>* HERE ! 3 SEP 2014
				content[2] = content[2].replace(/<\/b>/gi, '(``)');
				content[2] = content[2].replace(/<A[^>]*>((.|\s)*?(?=<\/A>|$)|$)/gi, ' ');
				content[2] = content[2].replace(/<[^>]+>/g, ' ');
				content[2] = content[2].replace(/[<>]/g, ' ');
				// Clean it now
				content[2] = __js_clean_html_str(content[2]);
				// Replace B
				content[2] = content[2].replace(/\(``\)/g, '</b>');
				content[2] = content[2].replace(/\(`\)/g, '<b>');
				
				// URLs ?
				if (o.obj_vars.hasOwnProperty('remove_urls_from_body')) {
					// http at start, to - -
					content[2] = content[2].replace(/https?:\/\/((.|\s)*?(?=- *-|$)|$)/g, ''); // - - 
					// www at start, to - -
					content[2] = content[2].replace(/www\.((.|\s)*?(?=- *-|$)|$)/g, ''); // - - 
					//~ //XX http at end
					//~ content[2] = content[2].replace(/https?:\/\/[^ ]+$/g, '');
				}
				
				arr.push([
					content[1], content[2]
				]);
			}
			//~ console.log(arr);
			return arr;
		}
	}
	this.array_startPage_results = array_startPage_results;
	
	// array_yahoo_results
	// -> returns array of arrays
	// -> [ [m[1],m[2]], [m[1], m[2]] ]
	function array_yahoo_results(rs) {
				
		//
		var r = /yschttl spt" href="[^*"]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
		if (!r.exec(rs)) {
			r = /yschttl spt" href="([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
			yahoo_type = 1;
		}
		
		r.lastIndex = 0;
		
		if (r.exec(rs) && rs.indexOf('Including results for') == -1) {
			r.lastIndex = 0;
			var m;
			var x;
			var arr = [];
			while (m = r.exec(rs)) {
				
				// Change Jul8
				// Coming in as r.search.yahoo.com rather than ri.search.yahoo.com.
				//
				//
		
				// Is this ri.search.yahoo.com?
				if  (
					/^http:\/\/ri?\.search\.yahoo\.com\//.exec(m[1]) &&
					/\/RU=([^\/+])/.exec(m[1])
					)
				{
					m[1] = (/\/RU=([^\/]+)/.exec(m[1]))[1];
					m[1] = decodeURIComponent(m[1]);
				}
				else if (yahoo_type == 0)
					m[1] = decodeURIComponent(m[1]);
				
				m[2] = m[2].replace(/<b>/g, '`');
				m[2] = m[2].replace(/<\/b>/g, '``');
				m[2] = m[2].replace(/<[^>]+>/g, ' ');
				m[2] = m[2].replace(/[<>]/g, ' ');
				m[2] = m[2].replace(/``/g, '</b>');
				m[2] = m[2].replace(/`/g, '<b>');
				
				arr.push([
					m[1], m[2]
				]);
			}
			return arr;
		} else {
			return [];
		}
	}
	this.array_yahoo_results = array_yahoo_results;
	
	// function proxy_init
	// INITIALIZE AMT___POPUP___PROXY_REDACTED_ BEFORE!
	//~ this.proxy_init = function() {
	function proxy_init() {
		AMT___POPUP__initializeGlobals(
			function() {
				
				//~ console.log('AMT___POPUP___PROXY_REDACTED_:');
				//~ console.log(AMT___POPUP___PROXY_REDACTED_);
				
				o.local_URL_init		= AMT___POPUP___PROXY_REDACTED_ + o.local_URL_init;
				o.local_URL_complete	= AMT___POPUP___PROXY_REDACTED_ + o.local_URL_complete;

				GM_xmlhttpRequest({ // init
					method: "GET",
					url: o.local_URL_init,
					onload: function(response) {
						//var rs = response.responseText;
					}
				});
			}
		);
	}
	this.proxy_init = proxy_init;
	
	// function proxy_waitComplete
	//
	//
	//~ this.proxy_waitComplete = function(callback_function) {
	function proxy_waitComplete(callback_function) {
		var this_obj = this; // legacy
		var callback_function = callback_function;
		
		var xint = setInterval(function() {
			GM_xmlhttpRequest({ // init
				method: "GET",
				url: o.local_URL_complete,
				onload: function(response) {
					var rs = response.responseText;
					
					if (rs.trim() != '') {
						clearInterval(xint);
					} else
						return;
					
					// yahoo? (yahoo_array: true)
					if (o.obj_vars.hasOwnProperty('yahoo_array')) {
						rs = array_yahoo_results(rs);
					}
					// startpage?
					else if(o.obj_vars.hasOwnProperty('startPage_array')) {
						rs = array_startPage_results(rs);
					}
					
					// ...
					if (o.obj_vars.return_init_object) {
						o.obj_vars.rs = rs;
						callback_function(o.obj_vars);
					}
					else if (o.obj_vars.seed_arg1)
					{
						callback_function(rs, o.obj_vars.seed_arg1);
					}
					else
					{
						callback_function(rs);
					}
				}
			})
		}, 1200);
	}
	this.proxy_waitComplete = proxy_waitComplete;
	
	// callback_function
	// AND auto-run the sub-functions here rather
	// than in script.js.
	if (this.obj_vars.hasOwnProperty('callback_function')) {
		
		proxy_init();
		proxy_waitComplete(
			this.obj_vars.callback_function
		);
		
		return;
	}
}

/*
 * function MT___getInputSelection()
 * 
 * Replace selected text (Range).
 * In a textarea with selected text.
 */
function MT___getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }
    return {
        start: start,
        end: end
    };
}
function MT___replaceSelectedText(element, text) {
    var sel = MT___getInputSelection(element);
    var val = element.value;
    element.value =
		val.slice(0, sel.start) +
		text +
		val.slice(sel.end);
}
function MT___HTMLParser(aHTMLString){
	var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
	var body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
	html.documentElement.appendChild(body);
	
	body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
		.getService(Components.interfaces.nsIScriptableUnescapeHTML)
		.parseFragment(aHTMLString, false, null, body)
	);
	return body;
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
	}else
		console.log('asynch false');
	
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

// CHROME //
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}
}
//
// function GM_addStyle()
//
function GM_addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
 * functions for POPUP
 * 
 * @global  MT__DOSUBMIT__USER_SET_TYPE
 * 
 * Read from extension's background page [localstorage] value
 * 
**/
//
var MT__DOSUBMIT__USER_SET_TYPE = 'regular'; // var to set by user! Types are "regular" and "server side"; default "regular".
//
var AMT___POPUP___PROXY_REDACTED_			= MT___host; // default is MT___host!
//~ var AMT___POPUP__doSubmitServerHost	= MT___host; // // !! THIS IS AS OF YET UNDEFINED !! // //

function AMT___POPUP__initializeGlobals(callback_function) {
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE"
		},
		function(response) {
			if (response && response.hasOwnProperty('data')) {
				try {
					
					var r = JSON.parse(response.data); // { data: "{}" } or { data: "{ type: "" }" }
				
					//{ type: "[regular OR server side]" }
					//~ if (r.type == 'server side') {
						//~ MT__DOSUBMIT__USER_SET_TYPE = 'server side';
					//~ }
					
					if (r.type) {
						MT__DOSUBMIT__USER_SET_TYPE = r.type;
					}
					if (r._PROXY_REDACTED_ && r._PROXY_REDACTED_.length > 6) {
						AMT___POPUP___PROXY_REDACTED_ = r._PROXY_REDACTED_;
						AMT___POPUP___PROXY_REDACTED_ = r._PROXY_REDACTED_;
					}
					//~ if (r.doSubmitServerHost && r.doSubmitServerHost.length > 6) { // // !! THIS IS AS OF YET UNDEFINED !! // //
						//~ AMT___POPUP__doSubmitServerHost = r.doSubmitServerHost;
					//~ }
					
					if (r.hasOwnProperty('CAPTCHA_staggered__stagger_is_active')) {
						AMT__Global_Vars.CAPTCHA_staggered.stagger_is_active = r.CAPTCHA_staggered__stagger_is_active;
					}
					if (r.hasOwnProperty('CAPTCHA_staggered__min_tabs_to_initiate_staggered')) {
						AMT__Global_Vars.CAPTCHA_staggered.min_tabs_to_initiate_staggered = r.CAPTCHA_staggered__min_tabs_to_initiate_staggered;
					}
					if (r.hasOwnProperty('CAPTCHA_staggered__staggered_timeout_per_tab')) {
						AMT__Global_Vars.CAPTCHA_staggered.staggered_timeout_per_tab = r.CAPTCHA_staggered__staggered_timeout_per_tab;
					}
					
				}
				catch(e)
				{
					console.log('Alert, AMT___POPUP__initializeGlobals :: !response.data');
				}
			}
			
			if (callback_function)
				callback_function();
		}
	);
}
AMT___POPUP__initializeGlobals();
/**
 * function doSubmit() 
 * & global vars
 * 
**/
// submit vars
var MT__DOSUBMIT__BY_ID_THIS_ID;
//
var MT__DOSUBMIT__INTERVAL;
//
var MT__DOSUBMIT__INTV_INTERVAL;
//
var MT__DOSUBMIT__FORM;
//
var MT__DOSUBMIT__LOCATION;
//
var MT__DOSUBMIT__CALLBACK_FUNCTION;
//
var MT__DOSUBMIT__TIME_TO_SUBMIT;
//
var MT__DOSUBMIT__MIN_SUBMIT_TIME = 2250; // Stable is 2250 Jan. 2013 to ... Oct. 2014
// give this a submit ID
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var xid = '_';
var i;
for (i = 0; i <= 4; i++) {
	xid += chars[Math.floor(Math.random()*chars.length)];
}
MT__DOSUBMIT__BY_ID_THIS_ID = xid;
//~ /**
 //~ * function doSubmit__getUserSetType()
 //~ * 
 //~ * @global  MT__DOSUBMIT__USER_SET_TYPE
 //~ * 
 //~ * Read from extension's background page [localstorage] value
 //~ */
//~ function doSubmit__getUserSetType() {
	//~ chrome.extension.sendRequest(
		//~ {
			//~ method: "getLocalStorage",
			//~ key: "MT__DOSUBMIT__USER_SET_TYPE"
		//~ },
		//~ function(response) {
			//~ if (response.data) {
				//~ var r = JSON.parse(response.data); // { data: "{}" } or { data: "{ type: "" }" }
				//~ 
				//~ //{ type: "[regular OR server side]" }
				//~ 
				//~ if (r.type == 'server side') {
					//~ MT__DOSUBMIT__USER_SET_TYPE = 'server side';
				//~ } else { // default is local
					//~ 
				//~ }
			//~ } else {
				//~ 
			//~ }
		//~ }
	//~ );
//~ }
//~ // ACTIVATE THIS!
//~ doSubmit__getUserSetType();
/**
 * function doSubmit__serverSide()
 * 
 * @global  MT__DOSUBMIT__FORM
 * @global  MT__DOSUBMIT__LOCATION
 * @global  MT__DOSUBMIT__CALLBACK_FUNCTION
 * @param
 */
function doSubmit__serverSide(form, location, callback_function, offsetTime) {

	
	
	/**
	 * OPTIONAL PARAMETERS. THESE ARE SET FROM doSubmit OR ELSE
	 * THEY MAY BE SET HERE.
	 * 
	 * Which form to submit
	 */
	// 
	if (!form)
		MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	else if (document.getElementById(form))
		MT__DOSUBMIT__FORM = document.getElementById(form);
	else if (document.getElementsByName(form)[0])
		MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	// Debug
	if (MT___TEST_DEBUG) {
		var d = new Date();
		MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	}
	
	// Set global vars
	MT__DOSUBMIT__LOCATION = location;
	MT__DOSUBMIT__CALLBACK_FUNCTION = callback_function;
	
	// Exit if err
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION != 'function') {
			alert('noSubmit(return time_to_submit) is now callback_function(time_to_submit)');
			return;
		}
	}
	/**
	 * END OPTIONAL PARAMETERS.
	 */
	
	GM_xmlhttpRequest({
		method: "GET",
		url: MT___host + '/mturk/util.php?AMT__doSubmit__serverSide_read=',
		timeout: 10000,
		onload: function(response) {
			var rs = response.responseText;
			
			// If status is not 200 then submit regular,
			// with the browser's **local storage**
			if (response.status != 200) {
				MT__DOSUBMIT__USER_SET_TYPE = 'regular';
				doSubmit(form, location, callback_function, offsetTime, false); // ** set doServerSideSubmit = false **
				return;
			}
			
			// Still here?
			console.log(rs);
			
			// response is "time:\d+([:response.data:])"
			var serverSide_currentTime;
			var split = /^time:([\d\.]+)([^$]*)$/.exec(rs);
			serverSide_currentTime = Math.round(split[1]);
			rs = split[2];
			var arr_all_submits = AMT__doSubmit__editSubmitArray(rs, offsetTime, serverSide_currentTime);
			
			//
			console.log('submit queue (server!):'	+arr_all_submits.length);
			console.log('time_to_submit:'			+MT__DOSUBMIT__TIME_TO_SUBMIT);
			console.log('ID:'						+MT__DOSUBMIT__BY_ID_THIS_ID);
			console.log(arr_all_submits);
			
			// write submits to file!
			GM_xmlhttpRequest({
				method: "POST",
				url: MT___host + '/mturk/util.php',
				data: 'AMT__doSubmit__serverSide_write='+encodeURIComponent(JSON.stringify(arr_all_submits)),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					var rs = response.responseText;
					
					if (response.status != 200) {
						alert('write failed! doSubmit__serverSide');
						return;
					}
					
					// go to submit 2
					// does: callback (if necessary), setTimeout, and then submit
					doSubmit_2();
				}
			});
		}
	});
}
/**
 * function AMT__doSubmit__editSubmitArray()
 * - This function will set the global variable ~MT__DOSUBMIT__TIME_TO_SUBMIT
 * 
 * @global  MT__DOSUBMIT__TIME_TO_SUBMIT
 * @global  MT__DOSUBMIT__BY_ID_THIS_ID
 * @global  MT__DOSUBMIT__MIN_SUBMIT_TIME
 * @param	data
 * @param	offsetTime
 * @param	serverSide_currentTime - if this is server side doSubmit then use the server's current time
 * 
 * returns: array[] arr_all_submits
 */
function AMT__doSubmit__editSubmitArray(data, offsetTime, serverSide_currentTime) {
	
	if (offsetTime == undefined)
		offsetTime = 0;
		
	console.log(data);
	console.log('offsetTime '+offsetTime);
	
	var arr_all_submits = data;
		
	MT__DOSUBMIT__TIME_TO_SUBMIT = 0;
	
	//
	var currentTime;
	// set currentTime (milliseconds)
	if (serverSide_currentTime) {
		currentTime = serverSide_currentTime;
	} else {
		var d = new Date();
		currentTime = d.getTime();
	}
	
	// is blank or false
	if (!arr_all_submits || arr_all_submits == '') {
		// add this
		arr_all_submits = [{'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : currentTime}];
	}
	// else JSON.parse
	else {
		
		arr_all_submits = JSON.parse(arr_all_submits);
		
		var i;
		
		// remove err
		for (i = arr_all_submits.length-1; i >= 0; i--) {
			if  (
				!arr_all_submits[i].time_to_submit ||
				arr_all_submits[i].time_to_submit == null ||
				arr_all_submits[i].time_to_submit == NaN ||
				arr_all_submits[i].time_to_submit == undefined
				)
			{
				arr_all_submits.splice(i, 1); // index, howmany
			}
		}
		
		var changed = false;
		var last = false;
		var addThis = true;
		var x;
		var submitTime = MT__DOSUBMIT__MIN_SUBMIT_TIME + ((offsetTime) ? offsetTime : 0);
		
		/**
		 * Remove previous submits matching this ID
		 * 
		 */
		//XX Aug. 3, 2013
		//XX Always assume that this will be added. Not assuming this is
		//XX useful when a submit has been cancelled (escape key), although
		//XX the submit may still be in the submit object (waiting to submit).
		//XX To use this, jobs must be removed from the submit object upon submission.
		//XX Otherwise, they would return here in, say, 800 ms, before the
		//XX removal time of, say, 2100 ms, and would be able to submit without
		//XX being added to the submit object.
		//XX >>This is only assuming, however, that the submit ID is the same, which
		//XX only OUGHT to occur during debug.
		//XX 
		//XX
		for (i = arr_all_submits.length-1; i >= 0; i--) { // is this already added?
			if (arr_all_submits[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
				arr_all_submits.splice(i, 1); // Aug. 5 // Remove previous
			}
		}
		//XX
		//XX
		
		/**
		 * Find time to submit and remove older than 2100
		 * 
		 */
		for (i = arr_all_submits.length-1; i >= 0; i--) {
			//console.log(arr_all_submits[i].time_to_sumbit);
			
			x = arr_all_submits[i].time_to_submit; // A TIME IN THE FUTURE // unix time, in millisenconds
			
			x*= 1;
			
			if (x < currentTime - submitTime) {
				arr_all_submits.splice(i, 1);
			}
			else if (x + submitTime < currentTime) {
				arr_all_submits.splice(i, 1); // index, howmany
			}
			else if (!last) { // 
				last = true;
				MT__DOSUBMIT__TIME_TO_SUBMIT = x + submitTime;
			}
			
		}
		
		if (MT__DOSUBMIT__TIME_TO_SUBMIT == 0) {
			MT__DOSUBMIT__TIME_TO_SUBMIT = currentTime;
		}
		
		// add this
		if (addThis) {
			// push
			arr_all_submits.push({
				'id': MT__DOSUBMIT__BY_ID_THIS_ID,
				'time_to_submit': MT__DOSUBMIT__TIME_TO_SUBMIT
			}); // add one
		}
		
		// change to seconds until submit
		MT__DOSUBMIT__TIME_TO_SUBMIT = MT__DOSUBMIT__TIME_TO_SUBMIT - currentTime; // 20s in future, - now = 20s
	}
	
	// return array
	return arr_all_submits;
}
/**
 * function doSubmit()
 * 
 * Parameters:
 *   -Form to submit,
 *   -or window.location,
 *   -or add to queue (with noSubmit) & callback_function, returns time_to_submit,
 *   -return time_to_submit, offsetTime(x) > regularInterval+x
 */
function doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit) {
	
	if(!AMT__Global_Vars.isPreview) {
		AMT__Global_Vars.isSubmitting = true;
		chrome.extension.sendRequest(
			{
				doSubmitChangeTabIcon: true
			},
			function(response) {
				//Squelch response
			}
		);
	}
	
	if (!AMT__Global_Vars.isPreview) {
		if (AMT__Global_Vars.scriptVars['DS ShiftFarLeft'] != '0') {
			new AMT___core_factory().shiftFarLeft();
		}
		if (AMT__Global_Vars.scriptVars['DS ShowNextTab'] != '0') {
			showNextTab();
		}
		if (AMT__Global_Vars.scriptVars['DS NextTab'] != '0') {
			new AMT___core_factory().nextTab();
		}
	}
	
	
	if(document.getElementById('AMT__UtilityContainer')) {
		chrome.extension.sendRequest({removeMyUitilityTabs: true});
	}
	
	
	// Which form to submit
	if (!form)
		MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	else if (document.getElementById(form))
		MT__DOSUBMIT__FORM = document.getElementById(form);
	else if (document.getElementsByName(form)[0])
		MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	// Debug
	if (MT___TEST_DEBUG) {
		var d = new Date();
		MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	}
	
	// Global vars
	MT__DOSUBMIT__LOCATION = location;
	MT__DOSUBMIT__CALLBACK_FUNCTION = callback_function;
	
	// Exit if err
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION != 'function') {
			alert('noSubmit(return time_to_submit) is now callback_function(time_to_submit)');
			return;
		}
	}
	
	// Server side?
	if  (
		doServerSideSubmit
		)
	{
		doSubmit__serverSide(form, location, callback_function, offsetTime, doServerSideSubmit);
		return;
	}
	/**
	 * Is this server side from __user set__?
	 * This will be set to "regular" if "server side" receives !200 response
	 * @var MT__DOSUBMIT__USER_SET_TYPE
	 */
	if (
		MT__DOSUBMIT__USER_SET_TYPE == 'server side'
	) {
		doSubmit__serverSide(form, location, callback_function, offsetTime, doServerSideSubmit);
		return;
	}
	
	// still here?
	// this is the browser's saved queue
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__ALL_JOBS_CHR"
		},
		function(response) {
		
		//console.log(response.data);
		
		var arr_all_submits = AMT__doSubmit__editSubmitArray(response.data, offsetTime);
		
		//console.log(arr_all_submits);return;
		//
		
		console.log('submit queue:'		+arr_all_submits.length);
		console.log('time_to_submit:'	+MT__DOSUBMIT__TIME_TO_SUBMIT);
		console.log('ID:'				+MT__DOSUBMIT__BY_ID_THIS_ID);
		console.log(arr_all_submits);
		
		// update the local storage!
		// & submit
		chrome.extension.sendRequest(
			{
				method: "saveLocalStorage",
				key: "MT__DOSUBMIT__ALL_JOBS_CHR",
				data: JSON.stringify(arr_all_submits)
			},
			doSubmit_2
		);
	});
}
function doSubmit_2() {
		
	// Exit if necessary
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION == 'function') {
			MT__DOSUBMIT__CALLBACK_FUNCTION(
				MT__DOSUBMIT__TIME_TO_SUBMIT
			);
			return;
		}
	}
	
	// set a timeout to submit this job
	// if negative then submits immediately
	setTimeout(function() {
		
		//
		// debug return here
		//
		if (MT___TEST_DEBUG) {
			// add time of job submit
			var d = new Date();
			GM_setValue(
				'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
				GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" +
				(d.getTime() / 1000) + ' ' +
				MT__DOSUBMIT__BY_ID_THIS_ID
			);
			MT___TEST_DEBUG_finish_time = d.getTime() / 1000;
			console.log('time to complete:'+Math.round(MT___TEST_DEBUG_finish_time - MT___TEST_DEBUG_start_time));
			
			if (document.getElementById('MT___TEST_DEBUG') != null) {
				var dx = document.getElementById('MT___TEST_DEBUG');
				dx.value = GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS');
			}
			setTimeout(function() {doSubmit();}, 800);
			return;
		}
		
		// Submit this form
		// or send the window.location to a new location
		// or do *nothing*
		if (!MT__DOSUBMIT__LOCATION)
			MT__DOSUBMIT__FORM.submit();
		else if (MT__DOSUBMIT__LOCATION)
			window.location = MT__DOSUBMIT__LOCATION;
		else {
			// do nothing
		}
		
		/*if (noSubmit)
			return;
		else if (!location)
			MT__DOSUBMIT__FORM.submit();
		else if (location)
			window.location = location;*/
		
		// OLD, NO REALLY USING THIS
		//~ // remove from submit
		//~ /*var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
		//~ if (all) {
			//~ 
			//~ // !! if time_to_submit > 0 !!
			//~ // ?? Sept. 19, 2013
			//~ if (time_to_submit != 0) {
				//~ // remove
				//~ all = JSON.parse(all);
				//~ var i;
				//~ var changed = false;
				//~ for (i = all.length-1; i >= 0; i--) {
					//~ if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
						//~ all.splice(i, 1); // index, howmany
						//~ changed = true;
						//~ //break;
					//~ }
				//~ }
				//~ if (changed)
					//~ GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
			//~ }
		//~ }*/
		//
		// save job submissions here
		//
		/*
		var d = new Date();
		GM_setValue(
			'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
			GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
		);
		console.log(GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS'));*/
		//console.log(MT__DOSUBMIT__FORM);
		//console.log(MT__DOSUBMIT__LOCATION);
		
	}, MT__DOSUBMIT__TIME_TO_SUBMIT);
}
//~ function doSubmit_3() {
	//~ //
//~ }
//
// doSubmit debug
//
var MT___TEST_DEBUG = false;
if (MT___TEST_DEBUG) {
	
	var MT___TEST_DEBUG_clearInt = false;
	var MT___TEST_DEBUG_start_time;
	var MT___TEST_DEBUG_finish_time;
	
	var d = document.createElement('textarea');
	d.setAttribute('id', 'MT___TEST_DEBUG');
	d.setAttribute('style', 'position:absolute;top:0;left:0;width:200px;height:800px;');
	document.body.appendChild(d);
	
	d = document.getElementById('MT___TEST_DEBUG');
	d.onclick = function() {
		MT___TEST_DEBUG_clearInt = true;
	}
	
	// cookie vars
	GM_setValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS', '_');
	//GM_setValue('MT__DOSUBMIT__ALL_JOBS', '');

	setTimeout(function() {doSubmit();}, 2000);
}
//
// old doSubmit
//
//function doSubmit(form, location, noSubmit, offsetTime) {
	//// form to submit, or window.location, or add to queue (with noSubmit)
	//// & return time_to_submit, offsetTime(x) > regularInterval+x
	
	//if (!form)
		//MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	//else if (document.getElementById(form))
		//MT__DOSUBMIT__FORM = document.getElementById(form);
	//else if (document.getElementsByName(form)[0])
		//MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	//var d = new Date();
	
	//if (MT___TEST_DEBUG) {
		//MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	//}
	
	//var xid = MT__DOSUBMIT__BY_ID_THIS_ID;
	
	//var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
	
	//var time_to_submit = 0;
	
	//if (!all) {
		//// add this
		//all = [{'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : d.getTime()}];
		//// update
		//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
	//}
	//else {
		
		//all = JSON.parse(all);
		
		//var i;
		
		//// remove err
		//for (i = all.length-1; i >= 0; i--) {
			//if  (
				// !all[i].time_to_submit ||
				//all[i].time_to_submit == null ||
				//all[i].time_to_submit == NaN ||
			    //all[i].time_to_submit == undefined
			    //)
			//{
				//all.splice(i, 1); // index, howmany
			//}
		//}
		
		//// remove old
		
		//var changed = false;
		
		//var last = false;
		
		//var addThis = true;
		
		//var x;
		
		//var submitTime = 2250 + ((offsetTime) ? offsetTime : 0);
		
		// /**
		 //* Remove previous submits matching this ID
		 //* 
		 //*/
		////XX Aug. 3, 2013
		////XX Always assume that this will be added. Not assuming this is
		////XX useful when a submit has been cancelled (escape key), although
		////XX the submit may still be in the submit object (waiting to submit).
		////XX To use this, jobs must be removed from the submit object upon submission.
		////XX Otherwise, they would return here in, say, 800 ms, before the
		////XX removal time of, say, 2100 ms, and would be able to submit without
		////XX being added to the submit object.
		////XX >>This is only assuming, however, that the submit ID is the same, which
		////XX only OUGHT to occur during debug.
		////XX 
		////XX
		//for (i = all.length-1; i >= 0; i--) { // is this already added?
			//if (all[i].id == xid) {
				//all.splice(i, 1); // Aug. 5 // Remove previous
				////addThis = false;
				////break;
			//}
		//}
		////XX
		////XX
		
		// /**
		 //* Find time to submit and remove older than 2100
		 //* 
		 //*/
		//for (i = all.length-1; i >= 0; i--) {
			////console.log(all[i].time_to_sumbit);
			// /*if (!all[i]) continue;
			//if (!all[i].time_to_submit || all[i].time_to_submit == null || all[i].time_to_submit == NaN ||
				//all[i].time_to_submit == undefined
			   //) {
			////	all.splice(i, 1); // index, howmany
				//continue;
			//}*/
			
			//x = all[i].time_to_submit;
			//x*= 1;
			
			//if (x < d.getTime() - submitTime) {
				//all.splice(i, 1);
			//}
			//else if (x + submitTime < d.getTime()) {
				//all.splice(i, 1); // index, howmany
			//}
			//else if (!last) { // 
				//last = true;
				//time_to_submit = x + submitTime;
			//}
			
		//}
		
		//if (time_to_submit == 0) {
			//time_to_submit = d.getTime();
		//}
		
		//// add this
		//if (addThis) {
			//// push time()
			//all.push({'id' : xid, 'time_to_submit' : time_to_submit}); // add this
		//}
		
		//// change to seconds until submit
		//time_to_submit = time_to_submit - d.getTime(); // 20s in future, - now = 20s
		
		//// update local storage
		//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
		
		////
		//console.log('submit queue:'+all.length);//return;
		////
			
	//}
	////
	//console.log('time_to_submit:'+time_to_submit);
	//console.log('ID:'+xid);
	////
	//if (noSubmit) {
		//return time_to_submit;
	//}
	
	//// set a timeout to submit this job
	//// if negative then submits immediately
	//setTimeout(function() {
		
		//// remove from submit
		//var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
		//if (all) {
			
			//// Check heartbeat. Is this job ID in list of
			//// jobs waiting to submit? If not, for any reason,
			//// then add it back.
			
			//// !! if time_to_submit > 0 !!
			//// ?? Sept. 19, 2013
			//if (time_to_submit != 0) {
				//// remove
				//all = JSON.parse(all);
				//var i;
				//var changed = false;
				//for (i = all.length-1; i >= 0; i--) {
					//if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
						//all.splice(i, 1); // index, howmany
						//changed = true;
						////break;
					//}
				//}
				//if (changed)
					//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
			//}
		//}
		
		////
		//// debug return here
		////
		// /*if (MT___TEST_DEBUG) {
			//// add time of job submit
			
			//var d = new Date();
			//GM_setValue(
				//'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
				//GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
			//);
			
			//MT___TEST_DEBUG_finish_time = d.getTime() / 1000;
			
			//console.log('time to complete:'+Math.round(MT___TEST_DEBUG_finish_time - MT___TEST_DEBUG_start_time));
			
			//if (document.getElementById('MT___TEST_DEBUG') != null) {
				//var dx = document.getElementById('MT___TEST_DEBUG');
				//dx.value = GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS');
			//}
			
			//setTimeout(function() {doSubmit();}, 800);
			
			//return;
		//}*/
		////
		//// save job submissions
		// /*
		//var d = new Date();
		//GM_setValue(
			//'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
			//GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
		//);
		//console.log(GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS'));*/
		
		//if (!location)
			//MT__DOSUBMIT__FORM.submit();
		//else if (location)
			//window.location = location;
		// /*if (noSubmit)
			//return;
		//else if (!location)
			//MT__DOSUBMIT__FORM.submit();
		//else if (location)
			//window.location = location;*/
		
	//}, time_to_submit);
//}

/*
 * MT___diffString, diff strings
 * 
 */
function MT___escape(s) {
	var n = s;
	n = n.replace(/&/g, "&amp;");
	n = n.replace(/</g, "&lt;");
	n = n.replace(/>/g, "&gt;");
	n = n.replace(/"/g, "&quot;");
	return n;
}
function MT___diffString( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = MT___diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
  var str = "";

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
	oSpace = ["\n"];
  } else {
	oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
	nSpace = ["\n"];
  } else {
	nSpace.push("\n");
  }

  if (out.n.length == 0) {
	  for (var i = 0; i < out.o.length; i++) {
		str += '<del>' + MT___escape(out.o[i]) + oSpace[i] + "</del>";
	  }
  } else {
	if (out.n[0].text == null) {
	  for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
		str += '<del>' + MT___escape(out.o[n]) + oSpace[n] + "</del>";
	  }
	}

	for ( var i = 0; i < out.n.length; i++ ) {
	  if (out.n[i].text == null) {
		str += '<ins>' + MT___escape(out.n[i]) + nSpace[i] + "</ins>";
	  } else {
		var pre = "";

		for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
		  pre += '<del>' + MT___escape(out.o[n]) + oSpace[n] + "</del>";
		}
		str += " " + out.n[i].text + nSpace[i] + pre;
	  }
	}
  }
  return str;
}
function randomColor() {
	return "rgb(" + (Math.random() * 100) + "%, " + 
					(Math.random() * 100) + "%, " + 
					(Math.random() * 100) + "%)";
}
function MT___diffString2( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = MT___diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
	oSpace = ["\n"];
  } else {
	oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
	nSpace = ["\n"];
  } else {
	nSpace.push("\n");
  }

  var os = "";
  var colors = new Array();
  for (var i = 0; i < out.o.length; i++) {
	  colors[i] = randomColor();

	  if (out.o[i].text != null) {
		  os += '<span style="background-color: ' +colors[i]+ '">' + 
				MT___escape(out.o[i].text) + oSpace[i] + "</span>";
	  } else {
		  os += "<del>" + MT___escape(out.o[i]) + oSpace[i] + "</del>";
	  }
  }

  var ns = "";
  for (var i = 0; i < out.n.length; i++) {
	  if (out.n[i].text != null) {
		  ns += '<span style="background-color: ' +colors[out.n[i].row]+ '">' + 
				MT___escape(out.n[i].text) + nSpace[i] + "</span>";
	  } else {
		  ns += "<ins>" + MT___escape(out.n[i]) + nSpace[i] + "</ins>";
	  }
  }
  return { o : os , n : ns };
}
function MT___diff( o, n ) {
  var ns = new Object();
  var os = new Object();
  
  for ( var i = 0; i < n.length; i++ ) {
	if ( ns[ n[i] ] == null )
	  ns[ n[i] ] = { rows: new Array(), o: null };
	ns[ n[i] ].rows.push( i );
  }
  
  for ( var i = 0; i < o.length; i++ ) {
	if ( os[ o[i] ] == null )
	  os[ o[i] ] = { rows: new Array(), n: null };
	os[ o[i] ].rows.push( i );
  }
  
  for ( var i in ns ) {
	if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
	  n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
	  o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
	}
  }
  
  for ( var i = 0; i < n.length - 1; i++ ) {
	if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
		 n[i+1] == o[ n[i].row + 1 ] ) {
	  n[i+1] = { text: n[i+1], row: n[i].row + 1 };
	  o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
	}
  }
  
  for ( var i = n.length - 1; i > 0; i-- ) {
	if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
		 n[i-1] == o[ n[i].row - 1 ] ) {
	  n[i-1] = { text: n[i-1], row: n[i].row - 1 };
	  o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
	}
  }
  return { o: o, n: n };
}



AMT___core_factory.prototype.shiftFarLeft = function() {
	chrome.extension.sendRequest(
			{
				shiftFarLeft:true
			},
			function(r) {
			}
		);
}

AMT___core_factory.prototype.shiftFarRight = function() {
	chrome.extension.sendRequest(
			{
				shiftFarRight:true
			},
			function(r) {
			}
		);
}



/**
 * Page 1 mturk.com MT___page1_show_jobs
 * 
 * Move into core_factory, July 30 2014.
 * AMT___core_factory.prototype. = function() {
 * 
 * TODO: CLOSE btn
 * TODO: ratings
 */
AMT___core_factory.prototype.amt_home_show_tasks = function() {
	
	// Check if the page is currently at /mturk/findhits
	//
	//
	var s = location.href;
	var u = /^https:\/\/www\.mturk\.com\/mturk\/findhits\?match=false$/;
	if (!u.exec(s)) return;
	
	// Ignored
	var ignore_requesters__ids, ignore_requesters;
	set_ignored_vars();
	
	// Add styles to page
	add_styles();
	
	// Hosts
	var MT___page1_hosts = [
		MT___host+'/mturk/.scripts/AMT_Batch/g.php',
		'http://www.sjshpack.com/AMT/g.php'
	];
	var MT___page1_host = MT___page1_hosts[0];
	var MT___page1_host_num = 0;
	
	// Timers intervals
	var xint, xint2;
	
	/**
	 * tasks_obj
	 * 
	 * tasks_obj.table1_row_ids: {} db_id:true
	 * tasks_obj.table2_row_ids: {} db_id:true
	 * tasks_obj.table_rows:     {} db_id:row _ element
	 */ 
	tasks_obj = {
		current_db_ids: {},
		
		// Timestamp of the last update. This matches
		// timestamp of the database.
		last_update: 0,
		last_update_2: 0, // This is for a show_all timestamp.
		
		// ...
		table1_row_ids:	{},	// #
		table2_row_ids:	{},	// #
		table_rows: 	{},	// el
		
		// ...
		div_container: null,
		table1: null,
		table2: null,
		
		// ...
		close_btn: null,
		timer_btn: null,
		user_select: null,
		
		// ...
		db_users: [
			'Ben','Dave','Sora'
		],
		
		// ...
		// boolean: first pull from database
		isFirstRun: true,
		
		// This will contain the TD elements
		// which will contain the graph data.
		// Format: tasks_obj.hash_tds[row.hash_id] = td;
		hash_tds: {},
		
		// This will contain the current HISTORY ids.
		// An array.
		//
		current_history_ids: [],
		
		// This will contain the history ids of the
		// newest tasks for graph initialization.
		//
		current_init_history_ids: [],
		
		// graph_rows_by_history_id
		// This is HTML elements. The array
		// "key" is the jobs history_id.
		//
		graph_rows_by_history_id: {},
		
		// Requesters overview
		// When checking in DB for all tasks from requesters,
		// this var will be populated.
		//
		ro_cached: {},
		
		// Chart types
		// 
		//
		//
		chart_types: [
			'',
			'DAILY-20MIN-AVG',
			'DAILY-30MIN-AVG',
			'DAILY-6HOUR-AVG',
			'24HOUR-ALL',
			'2HOUR-ALL',
			'30MINUTE-ALL',
			'',
			'',
			'',
			''
		],
		
		// comments_timestamp
		// Local timestamp for last modified comment.
		//
		//
		comments_timestamp: 0
	}
	
	// Container
	tasks_obj.div_container = document.createElement('div');
	tasks_obj.div_container.setAttribute('style',
		'position:absolute;'+
		'top:40px;'+
		'width:98%;'+
		'background-color:none;'+
		'margin:0 1%;'
	);
	document.body.appendChild(tasks_obj.div_container);
	
	// Tables
	// Table 1 = jobs (minus ignored)
	// Table 2 = jobs ignored
	// ...
	tasks_obj.table1 = document.createElement('table');
	tasks_obj.table1.setAttribute('style',
		'width:100%'
	);
	tasks_obj.table1.className = 'amt_show_tasks_table';
	tasks_obj.div_container.appendChild(tasks_obj.table1);
	// ...
	tasks_obj.table2 = document.createElement('table');
	tasks_obj.table2.setAttribute('style',
		'width:100%'
	);
	tasks_obj.table2.className = 'amt_show_tasks_table';
	tasks_obj.div_container.appendChild(tasks_obj.table2);
	
	// INIT !
	MT___page1_async_last_update();
	
	// Creates the Pause and Close buttons.
	// Starts the update intervals.
	interval_update_timers();
	
	
	/**
	 * function interval_update_timers()
	 * 
	 * Sets interval for time since posted timers.
	 * Sets interval for pause timer.
	 * Creates the Pause and Close buttons.
	 * Creates the "user" select field (tasks_obj.user_select)
	 */
	function interval_update_timers() {
		
		// timer
		var d = document.createElement('input');
		//~ d.setAttribute('id','input__reload');
		d.setAttribute('type','button');
		d.setAttribute('style','position:absolute;top:0px;left:60px;height:30px;width:60px;border:2px solid #3b3b3b;border-top:0;cursor:pointer;');
		document.body.appendChild(d);
		tasks_obj.timer_btn = d;
		// close
		var d = document.createElement('input');
		//~ d.setAttribute('id','input2__reload');
		d.setAttribute('type','button');
		d.setAttribute('style','position:absolute;top:0px;left:0px;height:30px;width:60px;border:2px solid #3b3b3b;border-top:0;border-left:0;cursor:pointer;');
		document.body.appendChild(d);
		tasks_obj.close_btn = d;
		// tasks_obj.user_select
		// .onchange?
		var d = document.createElement('select');
		d.setAttribute('style','position:absolute;top:0px;left:120px;height:30px;width:60px;border:2px solid #3b3b3b;border-top:0;border-left:0;cursor:pointer;');
		d.innerHTML = '<option value="Ben">Ben</option><option value="Dave">Dave</option><option value="Sora">Sora</option>';
		document.body.appendChild(d);
		tasks_obj.user_select = d;
		
		// Value, onclick
		// timer_btn
		tasks_obj.timer_btn.value = '20';
		tasks_obj.timer_btn.onclick = function() {
			//~ clearInterval(xint);
			//~ clearInterval(xint2);
			//~ dx.value = 'Press reload to continue...';
		}
		// close_btn
		tasks_obj.close_btn.value = 'Close!'; 
		tasks_obj.close_btn.onclick = function() {
			clearInterval(xint);
			clearInterval(xint2);
			//~ if (dx) {
				//~ document.body.removeChild(dx);
			//~ }
			// this
			this.parentNode.removeChild(this);
			// timer_btn
			tasks_obj.timer_btn.parentNode.removeChild(tasks_obj.timer_btn);
			// tasks_obj.div_container
			if (tasks_obj.div_container) {
				tasks_obj.div_container.parentNode.removeChild(tasks_obj.div_container);
			}
		}
		//
		
		// The countdown timer for when last_update runs.
		//
		//
		xint = setInterval(function() {
			var x = tasks_obj.timer_btn.value * 1;
			//~ if (!x) return;
			//~ x = x[1]*1;
			x = Math.floor(x - 1);
			if (x <= 0) {
				// next
				x = 20;
				MT___page1_async_last_update();
			}
			tasks_obj.timer_btn.value = x;
		}, 1000);
		
		// The time_since_posted for every job.
		//
		//
		xint2 = setInterval(function() {
			var x = tasks_obj.table_rows;
			
			for (var i in x) {
				if (!x[i]) continue;
				if (!x[i].innerHTML) continue;
				
				var y = x[i].getElementsByTagName('input');
				if (!y) continue;
				if (!y[0]) continue;
				if (!y[0].value) continue;

				y = date_format(y[0].value);
				
				var z = x[i].getElementsByClassName('mt__timer');
				if (!z) continue;
				if (!z[0]) continue;
				if (!z[0].innerText) continue;
				
				z[0].innerText = y;
			}
		}, 10000);
	}
	
	//~ /**
	 //~ * functions for comments:
	 //~ * 
	 //~ * tasks_obj.
	 //~ * 	comments_timestamp
	 //~ * 
	 //~ * 
	 //~ * comments_init (gets all comments, based on IDs of jobs on page, records the current timestamp into variable>comments_timestamp)
	 //~ * comments_last_modified (gets only comments newer, or last modified after, comments_timestamp)
	 //~ * 
	 //~ * interval
	 //~ * 
	 //~ * Uses tasks_obj.
	 //~ * 
	 //~ */
	//~ /**
	 //~ * function comments_init
	 //~ * 
	 //~ */
	
	/**
	 * function last_update_check_host
	 */
	function last_update_check_host(response) {
		if (response.status != 200) {
			console.log('response.status:' + response.status);
			if (MT___page1_host_num === 0) {
				MT___page1_host = MT___page1_hosts[1];
				MT___page1_host_num = 1;
			} else {
				MT___page1_host = MT___page1_hosts[0];
				MT___page1_host_num = 0;
			}
			
			setTimeout(function(){
				MT___page1_async_last_update();
			}, 4000);
			return false;
		}
		return true;
	}
	/**
	 * function MT___page1_async_last_update()
	 * 
	 * When was the last DB update?
	 * 
	 * "?last_update=" VERSUS tasks_obj.last_update
	 */
	function MT___page1_async_last_update() {
		// 
		console.log('Checking for new');
		
		//xhr
		GM_xmlhttpRequest({
			method: 'GET',
			url: MT___page1_host + '?last_update=&last_comment_retrieved='+tasks_obj.comments_timestamp+'&' + Math.random()*10000,
			onload: function (response) {
				var rs = response.responseText;
				// last_update_check_host
				// Returns false if response.status != 200
				if (!last_update_check_host(response)) {
					return;
				}
				
				/**
				 * Response is object
				 *	{
				 *	h: int, (hits available updated, integer)
				 *	j: int,	(jobs updated, integer)?
				 *	 
				 *	c: int (comments, NEW :), integer) 
				 *	}
				 * 
				 * e.g: [{"j":"1424490769","h":"1424491009","c":"12435678"}] 
				 * 
				 * @var tasks_obj.last_update
				 * 
				 */
				rs = JSON.parse(rs);
				//~ console.log('Local time:'+tasks_obj.last_update);
				//~ console.log('DB time:'+rs[0].h);
				
				// Does DB match local DB-updated timestamp?
				//
				//
				if (rs[0].h != tasks_obj.last_update) {
					console.log('last_update != database. Begin db full.');
					// ...
					tasks_obj.last_update = rs[0].h;
					MT___page1_async(); // run full
				}
				// Is the newest DB comment, or latest modified DB comment, different from local
				// comments_timestamp?
				//
				else if (rs[0].hasOwnProperty('c') && rs[0].c != tasks_obj.comments_timestamp)
				{
					tasks_obj.comments_timestamp = rs[0].c;
					MT___page1_async(); // run full
				}
			}
		});
	}
	
	/**
	 * function has_new_alertable()
	 * 
	 * 
	 * @param	rs, 
	 * @return	true/false
	 */
	function has_new_alertable(rs) {
		// Are there new jobs?
		// Is ordered by time_posted DESC.
		// @var new_job
		var new_job = false;
		for (var i = 0; i < rs[0].length; i++)
		{
			
			var db_id = rs[0][i];
			
			if (tasks_obj.current_db_ids.hasOwnProperty(db_id)) {
				continue; // Skip
			}
			
			// on page number, hits avail, !ignore_
			if  (
				rs[1][i] <  20 &&
				rs[4][i] >= 80 &&
				!ignore_requesters.hasOwnProperty(rs[3][i]) &&
				!ignore_requesters__ids.hasOwnProperty(rs[6][i])
				)
			{
				new_job = true;
				break; // END HERE
			}
		}
		// Alert
		if (new_job) {
			play_audio();
		}
		// Reset the current_db_ids, = new object.
		tasks_obj.current_db_ids = {};
		// Reset the current_hash_ids
		tasks_obj.current_history_ids = [];
		for (var i = 0; i < rs[0].length; i++)
		{
			
			var db_id = rs[0][i];
			tasks_obj.current_db_ids[db_id] = true;
			
			// ADD TO current_history_ids
			var history_id;
			if (rs[8]) {
				history_id = rs[8][i];
				tasks_obj.current_history_ids.push(history_id);
			}
			
			// IF NOT ON PAGE THEN ADD ?? 
		}
	}
	
	/**
	 * function rate_show_hide_button()
	 * 
	 * @param	event
	 */
	function rate_show_hide_button(e) {
		if (this.isHidden) {
			this.isHidden = false;
			this.style.backgroundColor = 'LightGreen';
		} else if (!this.isHidden) {
			this.isHidden = false;
			this.style.backgroundColor = '';
		}
	}
	//~ function ()
	
	/**
	 * function makeRow()
	 * 
	 * @param 	row			object	DB row.
	 * @param 	isIgnored	bool	Local object of ignored requesters.
	 * 
	 * @return	Returns an array of two HTML TR elements. First is main row. Second is a hidden row.
	 * 
	 * Note:	tasks_obj.table1_row_ids[row.db_id] = true;
	 * Note 2:	tasks_obj.table_rows[row.db_id] = tr;
	 * Note 3:	Ratings are 0-4, i.e 0,1,2,3,4, where middle=2, good=4, bad=0.
	 * 
	 * NEW: task_comment: '', comment_last_mod: 0
	 * 
	 * Note:	tr special attributes are: .hidden_tr=Hidden tr element, .hits_available=HITs avail. td element
	 */
	function makeRow(row, isIgnored) {
		
		// TR
		//
		//
		var tr = document.createElement('tr');
		tr.setAttribute('style',
			''
		);
		//~ tr.className = 'show_tasks_table_row';
		
		// Set globals!
		if (!isIgnored)
			tasks_obj.table1_row_ids[ row.db_id ] = true;
		else
			tasks_obj.table2_row_ids[ row.db_id ] = true;
		// Add to global!
		tasks_obj.table_rows[ row.db_id ] = tr;
		
		/**
		 * TDs ... ...
		 * ID
		 * Title
		 * 		-> comment/vote
		 * Req. Name
		 * 		-> comment/vote
		 * Available
		 * Reward
		 * Time Since Posted
		 * Chart Controller
		 * Chart
		 */
		
		
		// ID
		var td = document.createElement('td');
		td.setAttribute('style',
			'border-right:1px solid #a4a4a4;'//width:8px;
		);
		td.innerHTML = '&#10549;';
		//~ td.innerText = row.db_id; // OLD
		tr.appendChild(td);
		td.className = 'exe-hover';
		td.pn = tr; // This is short-hand for .parentNode.
		td.onclick = get_extended;
		
		// Rate TD
		var td = document.createElement('td');
		td.setAttribute('style',
			'border-right:1px solid #a4a4a4;'//width:8px;
		);
		td.innerText = row.db_id;
		tr.appendChild(td);
		// Rate btn
		var btn = document.createElement('button');
		btn.value = 'R';
		btn.rating = {
			isHidden: true, // default=hidden
			requester_id: row.requester_id,
			db_id: row.history_id
		}
		btn.onclick = rate_show_hide_button;
		td.appendChild(btn);
		
		/**
		 * Title Rating & Comment 
		 * Does this title have ratings/comments?
		 * Has the user rated or commented the title?
		 * */
		//>> Title Rating
		var td = document.createElement('td');
		td.setAttribute('style',
			''
		);
		tr.appendChild(td);
		/** 
		 * DB Ratings 
		 * Displays the current rating (if any) as a decimal, e.g. 2 or 3.5.
		 * Displays a rating select multiple field for each user, with the value set to "" (blank) or DB value.
		 * 
		 * Note:	tasks_obj.db_users
		 * Note 2:
		 * This is the .value table:
					id	int(10) UN PK AI
					value	smallint(6) 
					fk_user_name	varchar(10) 
					fk_id_jobs_history_index	int(11) UN 
		 * */
		if (row.title_ratings != null && row.title_ratings.hasOwnProperty( row.history_id )) {
			var title_ratings = row.title_ratings[ row.history_id ];
			var tmp_users_obj = {};
			for (var i in title_ratings) {
				//~ tmp_users_obj[ title_ratings[i].fk_user_name ] = 
			}
		}
		// TODO: Title Comments
		var td = document.createElement('td');
		td.setAttribute('style',
			''
		);
		tr.appendChild(td);
		
		// Title
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:50%;'
		);
		tr.appendChild(td);
		var a_gid;
		if (row.group_id != '' && row.group_id != null) {
			a_gid			= document.createElement('a');
			a_gid.href		= 'https://www.mturk.com/mturk/preview?groupId='+row.group_id;
			a_gid.setAttribute('class','cont_link');
			a_gid.target	= '_blank';
			a_gid.innerText = '▶' + __js_clean_html_str(row.title); // "Black right-pointing triangle"
		} else
			a_gid			= document.createTextNode(__js_clean_html_str(row.title));
		td.appendChild(a_gid);
		/**
		// TODO
		Add comment(s) notification (if comment(s))
		Add rating(s) notification (if ratings(s))
		
		Add controller button>
			> .onclick shows/hides:
				> select.dropdown ratings 0-4
					>(.onclick = .onkeyup = .onfocus = .onblur = ) write_to_db / update_db
				> comment textarea (drag to expand)
					>(.onclick = .onkeyup = .onfocus = .onblur = ) write_to_db / update_db
		 */
		
		/* Req. Rating & Comment */
		// Req. Rating
		var td = document.createElement('td');
		td.setAttribute('style',
			''
		);
		tr.appendChild(td);
		// Req. Comments
		var td = document.createElement('td');
		td.setAttribute('style',
			''
		);
		tr.appendChild(td);
		
		
		// Req. name
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:18%;'
		);
		tr.appendChild(td);
		if (row.requester_id != '') {
			var a_rid		= document.createElement('a');
			a_rid.href		= 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId='+row.requester_id;
			a_rid.setAttribute('class','cont_link');
			a_rid.target	= '_blank';
			a_rid.innerText = __js_clean_html_str(row.requester_name);
		} else
			var a_rid		= document.createTextNode(__js_clean_html_str(row.requester_name));
		td.appendChild(a_rid);
		
		// Available
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:4%;'
		);
		td.innerText = row.hits_available;
		tr.appendChild(td);
		
		// Set row property .hits_available (td element) here.
		tr.hits_available = td;
		
		// Reward
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:4%;'
		);
		td.innerText = row.reward.replace(/^\$/, '');
		tr.appendChild(td);
		
		// Time since posted
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:6%;'//+'max-width:10px;'
		);
		tr.appendChild(td);
		// Hidden element for TSP.
		var tsp_input = document.createElement('input');
		tsp_input.setAttribute('type', 'hidden');
		tsp_input.value = row.time_since_posted;
		td.appendChild(tsp_input);
		var tsp_span = document.createElement('span');
		var x = date_format(row.time_since_posted);
		tsp_span.className = 'mt__timer';
		tsp_span.innerText = x;
		td.appendChild(tsp_span);
		
		// Chart.js select controller
		// 2% + ... there's leftover 2% = 100% = 4%
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:4%;'
		);
		tr.appendChild(td);
		var select = document.createElement('select');
		select.setAttribute('style',
			'width:100%;'
			//height:20px;
		);
		select.db_id = row.db_id; // db_id
		select.history_id = row.history_id; // history_id. This will be "null" if unavailable.
		td.appendChild(select);
		for (var count in tasks_obj.chart_types) {
			var chart_type = tasks_obj.chart_types[count];
			var option = document.createElement('option');
			option.innerText = chart_type;
			//~ option.innerText = count;
			option.value = chart_type;
			select.appendChild(option);
		}
		select.onchange = function() {
			console.log(this.value);
			console.log(this.db_id);
			console.log(this.history_id);
			
			if (this.history_id != null) {
				tasks_obj.current_init_history_ids = [
					this.history_id
				];
				init_graph(this.value, this.chart_td); //chart_type
			}
		}
		select.onblur = function() {
			
		}
		
		// Chart.js
		// 14%
		// Set tasks_obj[row.hash_id] = td;
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:16%;'
			//+'max-width:10px;'
		);
		tr.appendChild(td);
		
		select.chart_td = td;
		
		// Hidden row
		// Set num columns to "tr".getElementsByTagName('td');
		var hidden_tr = document.createElement('tr');
		hidden_tr.setAttribute('style',
			'display:none;'
		);
		hidden_tr.cols = tr.getElementsByTagName('td');
		var td = document.createElement('td');
		td.setAttribute('style',
			''
		);
		hidden_tr.appendChild(td);
		// Sets tr "hidden_tr" attribute.
		tr.hidden_tr = hidden_tr;
		
		// Return
		return [tr, hidden_tr];
	}
	
	/**
	 * function init_graph
	 * 
	 * Description:
	 * The hash_ids are tallied in various places, so far.
	 * A nice place to take them from is tasks_obj.current_db_ids.
	 * Where: tasks_obj.current_db_ids[db_id] = true;
	 * 
	 * @param chart_type
	 * @param chart_td
	 * 
	 * NOTES:
	 * Pass in global array of ids-to-initialize: @ current_init_history_ids
	 * Chart.js is included in manifest.json, in /includes/
	 * 
	 * TODO:
	 * 	- Add "remove graphs" button to clear all graphs from page. (? or just refresh page...)
	 *  - Optional: Add 0s to graph when interval between data points is > graph type.
	 */
	function init_graph(chart_type, chart_td) {
		
		// Are there any hash_ids? Only case
		// probably is when pulling tasks from sjshpack.com.
		if  (
			!tasks_obj.current_init_history_ids.length ||
			chart_type == ''
			)
			return;
		
		// Global
		var chart_type = chart_type;
		var chart_td = chart_td;
		
		// Obj
		var obj = {
			type: chart_type,
			history_ids: tasks_obj.current_init_history_ids // array
			
			//~ type: '30MINUTE-ALL',
			//~ type: '2HOUR-ALL',
		};
		obj = JSON.stringify(obj);
		
		var url = MT___page1_host;
		var data =  'graph='+encodeURIComponent(obj)+'&'+Math.random();
		
		var days_of_week = [
			'Su','M','Tu','W','Th','F','Sa'
		];
		
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function (response) {
				
				var rs = response.responseText;
				//~ console.log(response);
				console.log(rs);
				
				//~ return;
				rs = JSON.parse(rs);
				
				// GRAPH
				
				// rs
				// array [ history_id1 => data, history_id2 => data, ... ]
				// where
				// data = array [ 'd'=>int timestamp, 'h'=>int available ]
				//
				
				// Labels
				// For more than 24 hour graphs show the day names rather
				// than hours.
				
				// TODO?
				// Fill 0s
				// Based on the time span, check for any graph section
				// data where time between points is greater than graph
				// type. For example,
				// ALL = ~4 so > ~10
				// 20MIN = ~20 so > ~30
				// 30MIN = ~30 so > ~40
				// 6HR = ~6 so > ~7
				
				var history_id;
				for (history_id in rs) {
					
					var rows = rs[history_id];
					
					var labels = [];
					var num_tasks = [];
					
					// Is longer than 24 hours?
					// Newest - Oldest
					var time_span = rows[rows.length - 1]['d']*1 - rows[0]['d']*1;
					
					// By day
					if (time_span > 86400) {
					
						var last_day = null;
						for (var i in rows) {
							
							var time	= rows[i]['d']; // date
							var nt		= rows[i]['h']; // num tasks
							
							var day = days_of_week[ new Date(time * 1000).getDay() ];
							
							if (last_day != day) {
								labels.push(day);
								last_day = day;
							} else {
								labels.push('');
							}
							
							num_tasks.push(nt);
						}
					}
					// By hour
					else {
						
						var last_hour = null;
						for (var i in rows) {
							
							var time	= rows[i]['d']; // date
							var nt		= rows[i]['h']; // num tasks
							
							var hour = new Date(time * 1000).getHours();
							
							if (hour == 0)
								hour = '12a'
							else if (hour < 12)
								hour += 'a';
							else if (hour == 12)
								hour += 'p'
							else
								hour = (hour*1 - 12) + 'p';
							
							
							
							if (last_hour != hour) {
								labels.push(hour);
								last_hour = hour;
							} else {
								labels.push('');
							}
							
							num_tasks.push(nt);
						}
					}
					
					
					// Data
					var data = {
						labels: labels,
						datasets: [
							{
								label: "X",
								fillColor: "rgba(151,187,205,0.2)",
								strokeColor: "rgba(151,187,205,1)",
								pointColor: "rgba(151,187,205,1)",
								pointStrokeColor: "#fff",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "rgba(151,187,205,1)",
								data: num_tasks
							}
						]
					}
					
					// Options
					var options = {
						bezierCurve: false,
						scaleShowGridLines: false,
						pointDot: false,
					}
					
					// Canvas & TD
					var chart = document.createElement('canvas');
					chart.setAttribute('style',
						'width:100%;height:20px;'
					);
					chart.height = '100';
					chart_td.innerHTML = ''; // Reset
					chart_td.appendChild(chart);
					
					// ...
					var context = chart.getContext("2d");
					var myNewChart = new Chart(context).Line(data, options);
					
					// out element
					//~ var chart = tasks_obj.graph_rows_by_history_id[history_id];
					
					//~ var context = chart.getContext("2d");
					//~ var myNewChart = new Chart(context).Line(data, options);

					// Reset?
					//~ chart.setAttribute('style',
						//~ 'width:100%;height:20px;'
					//~ );
					//~ chart.height = '100';
					//~ console.log(chart);
				}
				
				
			}
		});
	}
	
	/**
	 * function show_latest_check_host
	 * 
	 * 
	 */
	function show_latest_check_host(response) {
		// If response is not 200
		// then try another host. Other
		// hosts would be sjshpack.com.
		// Etc.
		if (response.status != 200) {
			if (MT___page1_host_num === 0) {
				MT___page1_host = MT___page1_hosts[1];
				MT___page1_host_num = 1;
			} else {
				MT___page1_host = MT___page1_hosts[0];
				MT___page1_host_num = 0;
			}
			return false;
		}
		return true;
	}
	/**
	 * function check_stale
	 * 
	 * Description: Remove table row.
	 */
	 function check_stale() {
		for (var db_id in tasks_obj.table_rows) {
			// row = HTML element
			var row = tasks_obj.table_rows[db_id];
			if (!tasks_obj.current_db_ids.hasOwnProperty(db_id))
			{
				remove_row(row); // remove
			}
			else
			{ //
			}
		}
	}
	/**
	 * function remove_row
	 * 
	 * Description: Remove table row.
	 * 
	 * TODO: Remove or hide?
	 */
	function remove_row(row) {
		// ...
		//
		//
		//
		row.hits_available.innerText = '----';
		//~ alert('remove');
		//~ console.log(row);
		//~ console.log(row.innerHTML);
		
		//~ // THIS DELETES
		//~ row.parentNode.removeChild(row);
		//~ delete tasks_obj.table1_row_ids[db_id]; // exists?
		//~ delete tasks_obj.table2_row_ids[db_id]; // exists?
		//~ delete tasks_obj.table_rows[db_id];
		
		//~ delete tasks_obj.table1_history_ids[db_id]; // exists?
		//~ delete tasks_obj.table2_history_ids[db_id]; // exists?
		
		// ro_cached Here
	}
	/**
	 * update_rows
	 * 
	 * Description: Loop through the results of the latest from the database. If
	 * this is a first run (e.g. page is reloaded) then add all DB results to the
	 * table. Else if this is an update then loop through all results from DB and
	 * either a) Add new row, b) Delete and/or Hide row, or c) Update the contents
	 * of the hits_available TD.
	 */
	function update_rows(rs) {
		/**
		 * rs
		 * Set history_id=null if not available.
		 * Set reward=null if not available.
			rs
			0 job DB id
			1 on_page_number
			2 job title
			3 requester name
			4 HITs avail.
			5 time since posted
			6 requesterid
			7 groupid
			* 8 histID
			* 9 reward
			* 10 title_ratings
			* 11 title_comments
			* 12 requester_ratings
			* 13 requester_comments
		 * 10-13 are objects.
		 * 
		*/
		var d = {
			db_id: '',
			on_page_number: '',
			title: '',
			requester_name: '',
			hits_available: '',
			time_since_posted: '',
			requester_id: '',
			group_id: '',
			history_id: '',
			reward: '',
			task_comment: '',
			comment_last_mod: 0
			//~ title_ratings: null,
			//~ title_comments: null,
			//~ requester_ratings: null,
			//~ requester_comments: null
		};
		for (var i = 0; i < rs[0].length; i++) {
			
			d.db_id				= rs[0][i];
			d.on_page_number	= rs[1][i];
			d.title				= rs[2][i];
			d.requester_name	= rs[3][i];
			d.hits_available	= rs[4][i];
			d.time_since_posted	= rs[5][i];
			d.requester_id		= rs[6][i];
			d.group_id			= rs[7][i];
			d.history_id		= (rs[8]) ? rs[8][i]	: null;
			d.reward			= (rs[9]) ? rs[9][i]	: null;
			d.task_comment		= (rs[10]) ? rs[10][i] : null;
			d.comment_last_mod	= (rs[11]) ? rs[11][i] : 0;
			
			// TODO
			//~ d.title_ratings			= (rs[10]) ? null	: null;
			//~ d.title_comments		= (rs[11]) ? null	: null;
			//~ d.requester_ratings		= (rs[12]) ? null	: null;
			//~ d.requester_comments	= (rs[13]) ? null	: null;
			//~ d.title_ratings			= (rs[10]) ? JSON.parse(rs[10][i])	: null;
			//~ d.title_comments		= (rs[11]) ? JSON.parse(rs[11][i])	: null;
			//~ d.requester_ratings		= (rs[12]) ? JSON.parse(rs[12][i])	: null;
			//~ d.requester_comments	= (rs[13]) ? JSON.parse(rs[13][i])	: null;
			
			// Set the tasks_obj.comments_timestamp.
			// If tasks_obj.comments_timestamp is older than DB comment_last_mod.
			//
			if (d.comment_last_mod > tasks_obj.comments_timestamp) {
				tasks_obj.comments_timestamp = d.comment_last_mod;
			}
			
			// Update this row!
			//
			//
			//
			if (tasks_obj.table_rows.hasOwnProperty(d.db_id))
			{
				var row = tasks_obj.table_rows[ d.db_id ];
				row.hits_available.innerText = d.hits_available;
				
				// IF updating graphs
				// THEN update them here (add the newest data point)
				//
				//
				continue;
			}
			
			// Create a new row. Then append or insert.
			// If global tasks_obj.firstRun is true,
			// (firstRun == true) then for all rows
			// treat them as appendChild. If firstRun
			// is false then treat all rows as insertBefore.
			var new_row;
			
			// New make_extended_row()
			// Apr. 16 2015
			//
			
			// Regular
			if  (
				!ignore_requesters.hasOwnProperty( d.requester_name ) &&
				!ignore_requesters__ids.hasOwnProperty( d.requester_id )
				)
			{
				new_row = makeRow(d); // array 0,1
				var len = tasks_obj.table1.getElementsByTagName('tr').length;
				
				// append
				if (!tasks_obj.isFirstRun && len)
				{
					var first = tasks_obj.table1.getElementsByTagName('tr')[0];
					tasks_obj.table1.insertBefore(new_row[0], first); // tr before "first tr"
					tasks_obj.table1.insertBefore(new_row[1], first); // hidden tr before "first tr" (bottom)
				}
				// insert
				else
				{
					tasks_obj.table1.appendChild(new_row[0]);
					tasks_obj.table1.appendChild(new_row[1]);
				}
			}
			// Ignored
			else
			{	
				new_row = makeRow(d, true);
				var len = tasks_obj.table2.getElementsByTagName('tr').length;
				
				// append
				if (!tasks_obj.isFirstRun && len)
				{	
					var first = tasks_obj.table2.getElementsByTagName('tr')[0];
					tasks_obj.table2.insertBefore(new_row[0], first); // tr before "first tr"
					tasks_obj.table2.insertBefore(new_row[1], first); // hidden tr before "first tr" (bottom)
				}
				// insert
				else
				{
					tasks_obj.table2.appendChild(new_row[0]);
					tasks_obj.table2.appendChild(new_row[1]);
				}
			}
		}
	}
	/**
	 * function MT___page1_async()
	 */
	function MT___page1_async() {
		
		// load
		// @show_all
		// @last_comment_retrieved
		GM_xmlhttpRequest({
			method: 'GET',
			url: MT___page1_host + '?show_all='+tasks_obj.last_update_2+'&last_comment_retrieved='+tasks_obj.comments_timestamp+'&' + Math.random(),
			onload: function (response) {
				var rs = response.responseText;
				if (!show_latest_check_host(response)) {
					return;
				}
				
				// Set the timestamp #2
				tasks_obj.last_update_2 = tasks_obj.last_update;
				
				// Parse
				rs = JSON.parse(rs);
				
				// THIS IS WHERE THE TABLE WILL BE.
				// FOR EACH RETURNED JOB IN "rs",
				// CHECK FOR MATCHING JOB IN TABLE.
				// The match is made by database ID
				// of job. If a match is made then
				// only UPDATE the row in the table.
				// Else if there is no match, add
				// a row to the table.
				
				// Has new alertable?
				// Also updates current_db_ids.
				has_new_alertable(rs);
				
				// Loop through all table rows and check 
				// against current_db_ids to ensure that all rows
				// in table are still active.
				// Delete all non-active/removed jobs from table.
				check_stale();
				
				// Loop through response object and check if table elements
				// contain this task. If so then update table entry.
				// However, if it does not exist in either table, determine which
				// table it ought to go in and put it there!
				update_rows(rs);
				
				// If first run ...
				// Then load full graph data.
				// Else if there are any new tasks
				// then get full initial history for them.
				//
				// Update tasks_obj.firstRun to false.
				// For all future runs any new rows
				// will be insertBefore (top of table)
				// rather than appendChild.
				if (tasks_obj.isFirstRun) {
					tasks_obj.isFirstRun = false;
					tasks_obj.current_init_history_ids = tasks_obj.current_history_ids;
					
					// init graph?
					// xx
				} else if (tasks_obj.current_init_history_ids.length) {
					// init graph?
					// xx
				}
			}
		});
	}
	
	
	/**
	 * Function date_format()
	 * 
	 * Rounding:
	 *  1.75 days -- 151200 / 86400 = 1.75 * 10 = 17.5 round = 18 / 10 = 1.8
	 * Display:
	 *  6.5h -- 10m -- 18.5h -- 1.5 days, 6.5 D -- 1.5 W, 3.5 W -- 1.5 M, 3.5 M -- 1.5 Y, 3.5 Y
	 */
	function date_format(n) {
	
		// OLD
		//~ function MT___page1_date_format(n) {
					
		var n = n*1000, // in ms
			nt, // current time
			nx,
			nx_milliseconds;
		nt = new Date();
		nt = nt.getTime(); // linux epoch ms
		nx = (nt - n) / 1000; // seconds difference (current - job)
		
		if (nx < 3600) { // 1 hr
			if (nt < n) nt = n; // is less than zero?
			nx_milliseconds = new Date(nt - n);
			// minutes
			display_date = nx_milliseconds.getUTCMinutes() + 'm';
		} else if (nx < 86400) { // 1 day
			if (nt < n) nt = n; // is less than zero?
			nx_milliseconds = new Date(nt - n);
			// hours
			display_date = nx_milliseconds.getUTCHours();
			// minutes
			// rounds to int.
			// 30/60 = .5 * 10 = 5
			// 50/60 = .83* 10 = 8.3 
			var min = Math.floor((nx_milliseconds.getUTCMinutes()/60)*10); 
			display_date = display_date + '.' + min + 'h';
		} else if (nx < 86400*7) {
			// days
			display_date = Math.round( (nx/86400) * 10 )/10 +'d';
		} else if (nx < 86400*365.2425) {
			// Months. WP: "The average month in the Gregorian calendar has a length of 30.4167 days or 4.345 weeks in a non-leap year and 30.5 days or 4.357 weeks in a leap year, or 30.436875 days in a mean Gregorian month overall (365.2425 Ã· 12)."
			display_date = Math.round( (nx/(86400*30.436875)) * 10 )/10 +'mo.';
		} else {
			// years
			display_date = Math.round( (nx/(86400*365.2425)) * 10 )/10 +'y';
		}
		return display_date;
	}
	
	/**
	 * Function MT___page1_show_jobs_play_audio
	 * 
	 * play_audio
	 * 
	 */
	function play_audio() {
		
		// Remove old elements.
		if (document.getElementById('MT___page1_show_jobs_play_audio'))
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		if (document.getElementById('MT___page1_show_jobs_play_audio'))
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		
		//MT___AUDIO_SNIPPET
		//b64_audio =
								
		// Play alert
		// i.e. <audio controls src = "data:audio/mp3;base64,T2dn....3KcK" />
		var c = document.createElement('audio');
		c.setAttribute('style','position:fixed;top:30px;left:0px;width:80px;text-align:center;z-index:0;background-color:MistyRose;border:2px solid LightCoral;');
		c.setAttribute('id','MT___page1_show_jobs_play_audio');
		c.setAttribute('controls','');
		c.setAttribute('src', MT___AUDIO_SNIPPET);
		document.body.appendChild(c);
		c = document.getElementById('MT___page1_show_jobs_play_audio');
		c.play();
		// Remove after 4 seconds
		setTimeout(function() {
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		}, 4000);
	}
	/**
	 * Add the CSS style to page.
	 */
	function add_styles() {
		// OLD styles
		GM_addStyle('.cont {height:16px;overflow:auto;}');
		GM_addStyle('.cont>div {height:16px;overflow:auto;font-size:1.4em;}');
		GM_addStyle('#div__reload>hr,#div__reload2>hr  {margin:0;padding:0;}');
		GM_addStyle('#div__reload,#div__reload2  {z-index:100;}');
		GM_addStyle('.cont:hover {background-color: #e9d8e9}');
		GM_addStyle('.cont_link {text-decoration:none;color:black;}');
		GM_addStyle('.cont_link:hover {font-weight:bold;}');
		
		
		GM_addStyle('.amt_show_tasks_table {width:100%;background-color:#efefef;border:2px solid #a0a0a0;margin: 0 auto;border-collapse:collapse;}'); // must use :collapse:
		GM_addStyle('.amt_show_tasks_table>tr:hover {background-color:#e9d8e9;}');
		GM_addStyle('.amt_show_tasks_table>tr {border:1px solid #a4a4a4;}');
		//~ GM_addStyle('.show_tasks_table_row {border:1px solid #a4a4a4;}');
		//~ GM_addStyle('table>td {border:1px solid #a4a4a4;}');
	}
	/**
	 * set_ignored_vars
	 * 
	 * Set the vars for ignored Requesters.
	 */
	function set_ignored_vars() {
		
		//
		//
		ignore_requesters__ids = {
			'A3A0N4OPTWRYPD':true //Research Project
		};
		ignore_requesters = {
			'CrowdFlower':true,
			'CrowdSource':true,
			'Classify AdImages':true,
			'ClariTrans':true,
			'RelevanceQuest':true,
			'AMTSpeech':true,
			'Amazon Requester Inc. (Product Ads)':true,
			'Amazon Requester Inc.':true,
			'Chris Callison-Burch':true,
			'User453':true,
			'ProductRnR':true,
			'WSOVC COM':true,
			'rohzit0d':true,
			'Cardcow':true,
			'Redwood':true,
			'Craft Listings':true,
			'Stanford Language and Cognition Lab':true,
			'Brandeis NLP':true,
			'Streema':true,
			'Fluffy Cloud':true,
			'Intelius Data Systems':true,
			'Johnny Wong':true,
			'Oscar Smith':true,
			'Sara Rosenthal':true,
			'Comdata IT Fuel Tax':true,
			'Venue Quality':true,
			'Product Listings':true,
			'Amazon Requester Inc - browse classification':true,
			'Classify This':true,
			'Tagasauris':true,
			'chinese.mturk':true,
			'Quality Website Reviews':true,
			'Phillip Atiba Goff':true,
			'Catalog Choice':true,
			'WMT Admin':true,
			'Sebastian Darr':true,
			'Coder of Web Apps':true,
			'Smartsheet.com Clients':true,
			'A-Team':true,
			'MASC Data':true,
			'Ad Tagger':true,
			'Dmitry Kachaev':true,
			'Nic Lowe':true,
			'Nascent Visions Corp':true,
			'RI Services':true,
			'techlist':true,
			'Benjamin C Lok':true,
			'Readabl':true,
			'NetMSi':true,
			'Todd Dickerson':true,
			'Jimmy Dragon':true,
			'Jon Brelig':true,
			//~ REMOVED JULY 30 2014
			//~ 'Taste of the World':true,
			'SET Master Account':true,
			'Ignite Media Solutions':true,
			'The Public Group':true,
			'Turk Experiment':true,
			'Crowdsurf Support':true,
			'Social Media Research':true,
			'11223344':true,
			'A Global Media Analytics':true,
			'411Richmond':true,
			'Visual Genome':true,
			'p9r':true,
			'mirador-tech':true
		};
	}
}
/*
 * END FUNCTION MT___page1_show_jobs
 */
/**
 * Function AMT___oldTopWindowFloatStuff
 * // Make return/accept button
 */
function AMT___oldTopWindowFloatStuff() {
	
	/**
	* Run code on unaccepted
	*
	*/
	var s,t,u,w;
	s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
	t=/you were viewing could not be accepted/; // Not accepted
	w=/Want to work on this HIT/; // Not accepted
	//~ u=/The HIT you were viewing has expired/; //XXNot accepted
	if  (
			s.exec(ih) || t.exec(ih) || w.exec(ih)
		)
	{ // not accepted here
		
		/*
		 * Tony Pavia
		 * Float skip.
		 */
		var l;
		l = document.location.href;
		if (l.indexOf('groupId=26V8XBAT2D5NVO7F3UH0RG5Y5NR51U') != -1) {
			// Set a global variable of hid, gid
			// @param float___kristin_howe_gid
			// @param float___kristin_howe_hid
			// 
			var float___kristin_howe_gid;
			var float___kristin_howe_hid;
			var x = document.getElementsByTagName('iframe')[0].src;
			
			x = /hitId=([^&$]+)/.exec(x);
			if (!x) return;
			float___kristin_howe_hid = x[1];
			x = /groupId=([^&$]+)/.exec(document.location.href);
			if (!x) return;
			float___kristin_howe_gid = x[1];
			
			// function float___kristin_howe_skip
			/*function float___kristin_howe_skip(time_to_submit) {
				setTimeout(function() {
					console.log('KH>skip');
					//window.location = 'https://www.mturk.com/mturk/preview?groupId='+float___kristin_howe_gid;
					location.reload(true);//forceGet
				}, time_to_submit);
			}*/
			// @intv xint__kristin_howe_float
			var xint__kristin_howe_float = setInterval(function() {
				
				chrome.extension.sendRequest(
					{
						method: "getLocalStorage",
						key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid
					},
					function(response) {
						//console.log(response); // Object{} // Empty object!
						if (response.data) {
							clearInterval(xint__kristin_howe_float);
							
							// delete key
							chrome.extension.sendRequest(
								{
									method: "deleteLocalStorage",
									key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
									data: ''
								},
								function(response) {
									if (!response.data)
										doSubmit(false, false, float___kristin_howe_skip);
								}
							);
						}
					}
				);
				chrome.extension.sendRequest(
					{
						method: "getLocalStorage",
						key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid
					},
					function(response) {
						if (response.data) {
							clearInterval(xint__kristin_howe_float);
							
							// delete key
							chrome.extension.sendRequest(
								{
									method: "deleteLocalStorage",
									key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid,
									data: ''
								},
								function(response) {
									
									document.getElementsByName('hitForm')[0].submit();
									
									//~ // accept
									//~ if (!response.data)
										//~ doSubmit('hitForm',false,false,-1000); // "id" else "name" //(form, location, callback_function, offsetTime)
									
								}
							);
						}
					}
				);
			}, 200);
		}
		/*
		 * Kristin Howe 
		 * Real estate agent photo search. Float skip.
		 */
		var l;
		l = document.location.href;
		if (l.indexOf('groupId=2FH56XBAT2D55ZCE7LUQ8JGAYZV04Z') != -1) {
			
			// Set a global variable of hid, gid
			// @param float___kristin_howe_gid
			// @param float___kristin_howe_hid
			// 
			var float___kristin_howe_gid;
			var float___kristin_howe_hid;
			var x = document.getElementsByTagName('iframe')[0].src;
			x = /hitId=([^&$]+)/.exec(x);
			if (!x) return;
			float___kristin_howe_hid = x[1];
			
			x = /groupId=([^&$]+)/.exec(document.location.href);
			if (!x) return;
			float___kristin_howe_gid = x[1];
			
			
			// function float___kristin_howe_skip
			function float___kristin_howe_skip(time_to_submit) {
				setTimeout(function() {
					console.log('KH>skip');
					//window.location = 'https://www.mturk.com/mturk/preview?groupId='+float___kristin_howe_gid;
					location.reload(true);//forceGet
				}, time_to_submit);
			}
			
			// initialize by removing any old
			// delete key
			chrome.extension.sendRequest(
				{
					method: "deleteLocalStorage",
					key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
					data: ''
				},
				function(response) {
					
					// localStorage[key] ought to be removed. Alert
					// if still exists
					if (response.data) {
						alert('x debug');
						return;
					}
					
					// @intv xint__kristin_howe_float
					var xint__kristin_howe_float = setInterval(function() {
						
						chrome.extension.sendRequest(
							{
								method: "getLocalStorage",
								key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid
							},
							function(response) {
								//console.log(response); // Object{} // Empty object!
								if (response.data) {
									clearInterval(xint__kristin_howe_float);
									
									// delete key
									chrome.extension.sendRequest(
										{
											method: "deleteLocalStorage",
											key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
											data: ''
										},
										function(response) {
											if (!response.data)
												doSubmit(false, false, float___kristin_howe_skip);
											//console.log(response);
										}
									);
								}
							}
						);
						chrome.extension.sendRequest(
							{
								method: "getLocalStorage",
								key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid
							},
							function(response) {
								//console.log(response);
								if (response.data) {
									clearInterval(xint__kristin_howe_float);
									
									// delete key
									chrome.extension.sendRequest(
										{
											method: "deleteLocalStorage",
											key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid,
											data: ''
										},
										function(response) {
											
											document.getElementsByName('hitForm')[0].submit();
											
											//~ // accept
											//~ if (!response.data)
												//~ doSubmit('hitForm',false,false,-1000); // "id" else "name" //(form, location, callback_function, offsetTime)
											
										}
									);
								}
							}
						);
					}, 200);
				}
			);
		}
		// RUN SCRIPTING ON UNACCEPTED JOBS
		// SKIPS. Saved skips in a file.
		// Thomas Murphy/David Weber
		//https://www.mturk.com/mturk/preview?groupId=260LVCNHMVHYUXNCZCB2H4J8FMS02H
		if  (
			document.location.href.indexOf('groupId=260LVCNHMVHYUXNCZCB2H4J8FMS02H') != -1 || // Thomas Murphy
			document.location.href.indexOf('groupId=2J23QP6AUC2BB0IXV6O340FM2IS18T') != -1 ||
			document.location.href.indexOf('groupId=2J2GSCWY2AOO2EH0X4FONQSFUBI11R') != -1 // David Weber
			)
		{
			
			var x = document.getElementsByName('hitId');
			if (x) {
				x = x[0].value;
				if (x.length > 4) {
					var url;
					url = MT___host+'/mturk/util.php?thomas_murphy_hid='+x;
					// dw (check && write)
					if (document.location.href.indexOf('groupId=2J2GSCWY2AOO2EH0X4FONQSFUBI11R') != -1) {
						//url += '&w='; //write
					}
					
					GM_xmlhttpRequest({
						method: 'GET',
						url: url,
						onload: function (response) {
							var rs = response.responseText;
							
							if (response.status != 200)
								return;
							
							if (rs.trim() == '1') {
								document.body.style.backgroundColor = '#bfefbf'; //barfgreen
								// go to next
								var x = document.location.href;
								x = (x.substr(x.length - 1) == '&') ? x.substr(0,x.length-1) : x + '&';
								document.location = x;
							}
							else {
								
							}
						}
					});
				}
			}
		}
		
		// ACCEPT JOB
		// TEMP ACCEPT JOB FOR James M. Ratcliffe
		if (document.location.href.indexOf('https://www.mturk.com/mturk/preview?groupId=2KGJ1XERSQV66ROYA9K3OVWEVPI08J') != -1) {
			// tmp
			setTimeout(function() {
				document.getElementsByName('hitForm')[0].submit();
			}, Math.random()*1 + 0.3); // 0 to 1 seconds
		}
	}
}
/*
 * END FUNCTION AMT___oldTopWindowFloatStuff
 */
 

function AMT___InitializeReturnAndAcceptKeyPress() {
	chrome.extension.sendRequest({getRACustomKey:true}, function(rs) {
		
			if (rs.hasOwnProperty('RACustomKey'))
				AMT__Global_Vars.RACustomKey = rs.RACustomKey.toLowerCase().charCodeAt();
			//alert('here ' + rs.RACustomKey + rs.RACustomKey.toLowerCase().charCodeAt() + AMT__Global_Vars.RACustomKey);
			
		});
	document.addEventListener("keypress", AMT___ReturnAndAcceptKeyPress);	
}
//Also handles retun button keyproess
function AMT___ReturnAndAcceptKeyPress(event) {
		//console.log(event.keyCode);
		switch (event.keyCode) {
			case AMT__Global_Vars.RACustomKey :
				chrome.extension.sendRequest({getRAHotkey: true}, 
				function(rs) 
				{
					if(rs.RAHotkey == 'On') {
						if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview) {
						document.getElementById('MT__gm_returnaccept').click();
						event.preventDefault();
						return false;
					}
					else if(!AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
					{
						//Send a message to the top window and tell it to return and acceptfresh
						new AMT___core_factory().
							iframe2parent__postMessage( //
								{
									action: 'return_and_accept'
								}
							);
							event.preventDefault();
							return false; 
					}

					}
				});
				break;
				case AMT__Global_Vars.scriptVars['Return Button Hotkey'].toLowerCase().charCodeAt(): 
					if(AMT__Global_Vars.scriptVars['Return Button Hotkey'] != "0") {
						new AMT___core_factory().iframe2parent__postMessage({	
								action: 'return_button_click'
							}
						
						);
						event.preventDefault();
						return false;
					}
				break;
			default:
				break;
		}
}

/**
 * Function AMT___returnAndAcceptButton
 * // Make return/accept button
 */
function AMT___returnAndAcceptButton() {
	
	// is this page continue or preview, then return
	if  (
		/^https?:\/\/(www\.)mturk.com\/mturk\/continue\?/i.exec(document.location.href) ||
		/^https?:\/\/(www\.)mturk.com\/mturk\/preview\?/i.exec(document.location.href)
		)
		return;
	
	// return and accept
	if  (
			/<a href="\/mturk\/return\?/.exec(ih) &&
			(
				/<a href="\/mturk\/return\?groupId=([^&]+)/.exec(ih) ||
				/<a href="\/mturk\/return\?requesterId=([^&]+)/.exec(ih)
			)
		) // return link and group id
	{

		
		var u;
		u = /<a href="\/mturk\/return\?[^"]+/.exec(ih)[0];
		
		var MT__url_returnaccept;
		MT__url_returnaccept = u;
		MT__url_returnaccept = MT__url_returnaccept.replace('<a href="', 'https://www.mturk.com');
		MT__url_returnaccept = MT__url_returnaccept.replace(/&amp;/g, '&');
		//u = '';
		
		var MT__gm_groupId;
		MT__gm_groupId = /<a href="\/mturk\/return\?groupId=([^&]+)/.exec(ih)[1];
		
		var d = document.createElement('input');
		d.setAttribute('id','MT__gm_returnaccept');
		d.setAttribute('type','button');
		d.setAttribute('style','position:fixed;top:0px;left:40%;width:120px;height:24px;margin-left:120px;z-index:1000;');
		d.setAttribute('value','Return and Accept');
		document.body.appendChild(d);
		
		var d = document.createElement('input');
		d.setAttribute('id','MT__gm_returnaccept_non_serverSide');
		d.setAttribute('type','button');
		d.setAttribute('style','position:fixed;top:0px;left:40%;height:24px;margin-left:240px;z-index:1000;padding-left:0;padding-right:0;');
		d.setAttribute('value','Non-SV');
		document.body.appendChild(d);
		
		// local
		document.getElementById('MT__gm_returnaccept').addEventListener('click', function() {
			
			
			
			//console.log(AMT__Global_Vars);
			this.style.backgroundColor='#9e9e9e';
			//Record what tab we're returning on
			recordReturn();

			
			// HOOK GOES HERE> RETURN & ACCEPT + showNextTab, nextTab
			// @param: bool() AMT__Global_Vars.core.return_accept_run_nextTab 
			//
			if (AMT__Global_Vars.core.return_accept_run_nextTab) {
				if(AMT__Global_Vars['R&A NextTab Iframe Focus']) {				
					new AMT___core_factory().nextTab({focusOnPage:true, isTopWindow:false});
				}
				else {
					new AMT___core_factory().nextTab();
				}				
			}
			// END HOOK nextTab()
			

			if(AMT__Global_Vars.scriptVars['R&A ShiftFarLeft']  != '0') {
				new AMT___core_factory().shiftFarLeft();
			}
			
		
			if(AMT__Global_Vars['R&A ShowNextTab'] != '0') {
				showNextTab({isTopWindow: true});
				showNextTab({isTopWindow: false});
			}
			
			function MT__RETURN_AND_ACCEPT(time_to_submit) {
				setTimeout(function() {
					GM_xmlhttpRequest({
						method: 'GET',
						url: MT__url_returnaccept, // url to return this HIT
						onload: function (response) {
							
							// get new
							//
							//
							window.location = 'https://www.mturk.com/mturk/previewandaccept?groupId='+MT__gm_groupId;
						}
					});
				}, time_to_submit);
			}
			
			// First doSubmit
			doSubmit(false, false, MT__RETURN_AND_ACCEPT); // false,false,noSubmit
		}, false);
		
		// serverSide
		document.getElementById('MT__gm_returnaccept_non_serverSide').addEventListener('click', function() {
			this.style.backgroundColor='#9e9e9e';
			//Record what tab we're returning on
			recordReturn();
			

			
			
			function MT__RETURN_AND_ACCEPT_serverSide(time_to_submit) {
				setTimeout(function() {
					GM_xmlhttpRequest({
						method: 'GET',
						url: MT__url_returnaccept, // url to return this HIT
						onload: function (response) {
							// get new
							window.location = 'https://www.mturk.com/mturk/previewandaccept?groupId='+MT__gm_groupId;
							
							// XXADD AGAIN TO DOSUBMIT!
						}
					});
				}, time_to_submit);
			}
			
			// First doSubmit
			doSubmit__serverSide(false, false, MT__RETURN_AND_ACCEPT_serverSide); // false,false,noSubmit
		}, false);
	}
}
/*
 * END FUNCTION AMT___returnAndAcceptButton
 */
/**
 * Function AMT___checkCaptchaStatus()
 * 
 * Check the captcha status
 * Set var -> GM_setValue('mt_captcha','1'). No captcha == "0".
 * Plus -> some interesting captcha behavior.
 */
function AMT___checkCaptchaStatus() {
	
	var s,t,u,w;
	t=/you were viewing could not be accepted/; // Not accepted
	u=/The HIT you were viewing has expired/; // Not accepted
	w=/Want to work on this HIT/; // Not accepted
	
	var test=false;
	var test2=false;
	var test3=false;
	if (test) {
		document.body.ondblclick = function() {
			chrome.extension.sendRequest(
			{
				add_tab_to_captcha_queue: true
			}, 
			function(response) {
				//Squelch response
				}
			);
			//~ chrome.extension.sendRequest(
			//~ {
				//~ add_tab_to_captcha_queue: true
			//~ }, 
			//~ function(response) {
				//~ //Squelch response
				//~ }
			//~ );
			chrome.extension.sendRequest(
			{
				CAPTCHA_tab_queue_process: true
			}, 
			function(response) {
				//Squelch response
				}
			);
		}
	}
	if (test2) {
		document.body.ondblclick = function() {
			chrome.extension.sendRequest(
			{
				CAPTCHA_tab_queue_process: true
			}, 
			function(response) {
				//Squelch response
				}
			);
		}
	}
	if (test3) {
		document.body.ondblclick = function() {
			chrome.extension.sendRequest(
			{
				add_tab_to_captcha_queue: true
			}, 
			function(response) {
				//Squelch response
				}
			);
		}
	}
	
	//AMT__Global_Vars.core.captcha_string
	// s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
	
	if (ih.indexOf(AMT__Global_Vars.core.captcha_string) != -1) {
		
		/**
		 * Change icon
		 */
		chrome.extension.sendRequest(
		{
			captchaChangeTabIcon: true
		}, 
		function(response) {
			//Squelch response
			}
		);
		
		/**
		 * Add this tab to reload captcha queue
		 */
		chrome.extension.sendRequest(
		{
			add_tab_to_captcha_queue: true
		}, 
		function(response) {
			//Squelch response
			}
		);
		
		// Set localstorage
		GM_setValue('mt_captcha','1');
		
		// Captcha response focus 
		var inp=document.getElementsByName("userCaptchaResponse")[0];
		if (inp) {
			// clear input
			inp.value='';
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 100);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 1000);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 2000);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 3000);
		}
		// LAST RELOAD
		// set continue for duplicate windows
		// local storage - last reload
		if (!GM_getValue('MT_CAPTCHA__LAST_RELOAD'))
			GM_setValue('MT_CAPTCHA__LAST_RELOAD', 0); 
		// local storage - last reload tries
		// & reset if old?
		if (
			!GM_getValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES')
		   )
			GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', 0);
		
		// AS OF OCT28 THIS IS NO LONGER USED. THE METHOD USED IS EVENT PAGE QUEUEING.
		//~ // New 23 Sep 2014
		//~ // Set an eventListener for storage which will monitor other tabs.
		//~ // Another tab will set localStorage['mt_captcha'] = 0.
		//~ //
		//~ // New 17 Oct 2014
		//~ // Read localStorage value (later, global value) for CAPTCHA vars (CAPTCHA_staggered__min_tabs_to_initiate_staggered, CAPTCHA_staggered__staggered_timeout_per_tab)
		//~ //
		//~ //
		//~ var reset_after_captcha = false;
		//~ window.addEventListener('storage', function() {
			//~ 
			//~ if  (
				//~ GM_getValue('mt_captcha') == '0' &&
				//~ !reset_after_captcha
			    //~ )
			//~ {
				//~ // Set true
				//~ reset_after_captcha = true;
				//~ 
				//~ // OLD.......
				//~ // TODO: 23 Sep 2014
				//~ // Ask the background page how many tabs are currently on mturk.com.
				//~ // (This is topWindow.) Then reload / location.href based on this amount.
				//~ //
				//~ if (document.location.href == 'https://www.mturk.com/mturk/submit') { // i.e. amicus labs
					//~ 
					//~ var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
					//~ if (i)
						//~ window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
					//~ 
				//~ } else
					//~ window.location.reload();
			//~ }
			//~ 
		//~ }, false);
		
		
		// int
		//~ var xint_CONTINUE_CAPTCHA = setInterval(function() {
			//~ 
			//~ var d = new Date();
			//~ d = Math.round(d.getTime() / 1000);
			//~ 
			//~ var numt = GM_getValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES') * 1;
			//~ 
			//~ if (
				//~ GM_getValue('mt_captcha') == '0'
			   //~ )
			//~ {
				//~ clearInterval(xint_CONTINUE_CAPTCHA);
				//~ 
				//~ GM_setValue('MT_CAPTCHA__LAST_RELOAD', d);
				//~ GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', 0);
				//~ 
				//~ if (document.location.href == 'https://www.mturk.com/mturk/submit') { // i.e. amicus labs
					//~ 
					//~ var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
					//~ if (i)
						//~ window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
					//~ 
				//~ } else
					//~ window.location.reload();
				//~ 
				//~ /*if (ih.indexOf('Copy and paste the HTML from the links') != -1) { // amicus labs
					//~ //window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOOIR6U04FONQSDV7O118';
					//~ //window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOS5XFSWTFOPQSCODK11V';
					//~ window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=25M5K4F0OHOZUIXOFXF2U92HGJX21C';
				//~ } else
					//~ window.location.reload();*/
			//~ }
			//~ else if
			//~ (
				//~ GM_getValue('MT_CAPTCHA__LAST_RELOAD')*1 < d - 30 &&
				//~ numt < 30 // 20 is 10m, 30 is 15m
			//~ )
			//~ {
				//~ GM_setValue('MT_CAPTCHA__LAST_RELOAD', d);
				//~ GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', numt + 1);
			//~ }
		//~ }, ((Math.random()*20) * 100) + 100); // 100 + 0~2000 ms
		//~ // END LAST RELOAD
		//~ 
		
	}
	/**
	 * No Captcha
	 * Begin background page -> CAPTCHA_tab_queue.queue
	 * CAPTCHA_tab_queue_process
	 * 
	 * NOTE:
	 * This is where mt_captcha is set to 0.
	 * 
	 * 
	 */
	else if (!/^https?:\/\/(www\.)mturk.com\/mturk\/continue\?/i.exec(document.location.href))
	{
		//
		GM_setValue('mt_captcha','0');
		
		/**
		 * CAPTCHA_tab_queue_process
		 */
		chrome.extension.sendRequest(
		{
			CAPTCHA_tab_queue_process: true
		}, 
		function(response) {
			//Squelch response
			}
		);
		
		//~ 
		//~ if  (
				//~ ih.indexOf('The HIT you were viewing has expired') != -1 &&
				//~ ih.indexOf('Copy and paste a webpage\'s HTML (Chrome and Firefox only, please)') != -1 &&
				//~ ih.indexOf('Automan LLC') != -1
			//~ )
		//~ {
			//~ var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
			//~ if (i) {
				//~ window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
			//~ }
		//~ }
		//~ if  (
				//~ ih.indexOf('The HIT you were viewing has expired') != -1 &&
				//~ ih.indexOf('KronoPin') != -1
			//~ )
		//~ {
			//~ var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
			//~ if (i) {
				//~ var xint_dup = setInterval(function() {
					//~ GM_xmlhttpRequest({
						//~ method: 'GET',
						//~ url: 'http://www.linkedin.com/nhome/',
						//~ onload: function (response) {
							//~ if (response.status < 400) {
								//~ 
								//~ clearInterval(xint_dup);
								//~ 
								//~ // get new
								//~ var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
								//~ window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
								//~ 
							//~ }
						//~ }
					//~ });
				//~ }, 60000);
			//~ }
		//~ }
		
		// Reload after captcha, /mturk/submit
		if (document.location == 'https://www.mturk.com/mturk/submit' && ih.indexOf('Your request was not completed successfully.') != -1) {
			// Amicus Labs
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=25M5K4F0OHOZUIXOFXF2U92HGJX21C';
			// Amazon Labs
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=279O8JIA0RYNZFGK1ID0CBMLV3P05D';
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOS5XFSWTFOPQSCODK11V';
			// Andrew Brown
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2PBXCNHMVHVKKX4AS9T7CJ7DNYW130';
		}
	}
}
/*
 * END FUNCTION
 */

/**
 * 
 * GLOBAL FUNCTIONS
 * 
 */
/*
 * MT___numberWithCommas
**/
function MT___numberWithCommas(x) {
	var parts = (x+'').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
/*
 * MT___distance
 * return distance between lat/lng pairs
**/
/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad == 'undefined') {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}
function MT___lat_lng_distance(lat1, lon1, lat2, lon2) {
	var R = 3963; // 6371km .. use 3963 for miles
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // mi
	return d;
}
/*
 * MT___yahoo_feeling_lucky
 * 
**/
function MT___yahoo_feeling_lucky(q, callbackFunction) {
	// Feeling Lucky
	var u = 'http://search.yahoo.com/search?p=%2B'+encodeURIComponent(q); //%2B
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function (response) {
			var rs=response.responseText;
			
			var rg = /yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
			var found = false;
			
			if (rg.exec(rs) && rs.indexOf('Including results for') == -1) {
				rg.lastIndex = 0;
				rg=/yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g; // li
				
				var match;
				while (match = rg.exec(rs)) {
					match[1] = decodeURIComponent(match[1]);
					if (!/http:\/\/\d+\.\d+\.\d+\.\d+[\/$]/.exec(match[1])) {
						callbackFunction(match[1]);
						found = true;
						break;
					}
				}
			}
			if (!found)
				callbackFunction(false);
		}
	});
}
/**
 * MT___resolveURL
 * @param url
 * @param callback_function
 * @param seed
**/
function MT___resolveURL(url, callback_function, seed) {
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: MT___host+'/mturk/.scripts/resolve_URL.php?u='+encodeURIComponent(url),
		onload: function(response) {
			var rs = response.responseText;
			
			callback_function(rs, seed);
		}
	});
}
/*
 * MT___google_api_geocode helper
 * 
**/
function MT___google_api_geocode_parse(rs, callback_function, return_complete_response) {
	rs = JSON.parse(rs);
	var found = true;
	if  (
		!rs.results ||
		!rs.results[0] ||
		!rs.results[0].geometry ||
		!rs.results[0].geometry.location ||
		!rs.results[0].geometry.location.lat ||
		!rs.results[0].geometry.location.lng
		)
	{
		callback_function(false);
		return;
	}
	
	if (!return_complete_response) // just lat/lng
		callback_function(rs.results[0].geometry.location.lat, rs.results[0].geometry.location.lng);
	else
		callback_function(rs); // full
}
/*
 * MT___google_api_reverseGeocode
 * return reverse lat/lng
**/
function MT___google_api_reverseGeocode(latlng, callback_function, use_a_proxy) { //, return_complete_response) { // latlng->str
	
	// Global
	//
	//
	var latlng = latlng;
	var callback_function = callback_function;
	var use_a_proxy = use_a_proxy;
	
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+encodeURIComponent(latlng)+'&sensor=false';
	
	// IS THIS REQUEST CACHED?
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
		onload: function(response) {
			var rs = response.responseText;
			
			if (rs.trim() != '') {
				MT___google_api_geocode_parse(rs, callback_function, true); // return full response == true
				return;
			}
					
			if (!use_a_proxy) {
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: u,
					onload: function(response) {
						var rs = response.responseText;
						MT___google_api_geocode_parse(rs, callback_function, true); // return full response == true
					}
				});
				return;
			}
			
			if (use_a_proxy) {
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: MT___host+'/mturk/.scripts/google/get-page.php?u='+encodeURIComponent(u)+'&catch_success='+encodeURIComponent('"results"')+'&catch_include='+encodeURIComponent('"error_message" : "You have exceeded your daily request quota for this API."'),
					onload: function(response) {
						//var rs = response.responseText;
					}
				});
				
				var xint = setInterval(function() {
					GM_xmlhttpRequest({ // init
						method: "GET",
						url: MT___host+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
						onload: function(response) {
							var rs = response.responseText;
							
							if (rs.trim() != '') {
								clearInterval(xint);
							} else
								return;
								
							MT___google_api_geocode_parse(rs, callback_function, true);
						}
					});
				}, 1000);
			}
			
		}
	});
}
/*
 * MT___google_api_geocode
 * 
 * Returns lat/lng or full response object
 * 
 * On lat/lng: callback_function(lat, lon)
 * 
 * http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false
**/
function MT___google_api_geocode(location, callback_function, return_complete_response, use_a_proxy) {
	
	// Global
	//
	//
	var location = location;
	var callback_function = callback_function;
	var return_complete_response = return_complete_response;
	var use_a_proxy = use_a_proxy;
	
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(location)+'&sensor=false';
	
	// IS THIS REQUEST CACHED?
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
		onload: function(response) {
			var rs = response.responseText;
			
			if (rs.trim() != '') {
				MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
				return;
			}
			
			// Here?
			//
			//
			if (!use_a_proxy) {
				
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u),
					onload: function(response) {
						var rs = response.responseText;
						MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
					}
				});
				return;
			}
			
			//{ "results" : [], "status" : "UNKNOWN_ERROR" }
			//'&catch_include_array='+encodeURIComponent( JSON.stringify(this.obj_vars.catch_include_array) )
			var ci_array = [
				'"error_message" : "You have exceeded your daily request quota for this API."',
				'{ "results" : [], "status" : "UNKNOWN_ERROR" }'
			];
			if (use_a_proxy) {
				AMT___POPUP__initializeGlobals(function() {
					GM_xmlhttpRequest({ // init
						method: "GET",
						url: AMT___POPUP___PROXY_REDACTED_+
							'/mturk/.scripts/google/get-page.php?u='+encodeURIComponent(u)+
							'&catch_success='+encodeURIComponent('"results"')+
							'&catch_include_array='+encodeURIComponent(JSON.stringify(ci_array)),
							//~ '&catch_include='+encodeURIComponent('"error_message" : "You have exceeded your daily request quota for this API."'),
						onload: function(response) {
							//var rs = response.responseText;
						}
					});
					
					var xint = setInterval(function() {
						GM_xmlhttpRequest({ // init
							method: "GET",
							url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
							onload: function(response) {
								var rs = response.responseText;
								
								if (rs.trim() != '') {
									clearInterval(xint);
								} else
									return;
									
								MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
							}
						});
					}, 1000);
				});
			}
		}
	});
}
/*
 * exit
 * console.log & new Error
**/
function exit(msg)
{
	console.log(msg);
	throw new Error (msg);
}
function __js_escape_regEx(string) {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function __js_inarray(array, needle) // //
{
	for (var i in array)
	{
		if (array[i] == needle)
			return true;
	}
	return false;
}
function __js_clean_html_str(s) {
	if (/[<>]/.exec(s)) alert('__js_clean_html_str contains arrows');
	if (s == undefined) return ''; // is blank
	if (s.trim() == '') return ''; // is blank
	var div = document.createElement('div');
	div.innerHTML = s;
	s = div.firstChild.nodeValue;
	return s;
}
// MT__bold
// o is a string
// arr is an array of strings to be bolded
// avoid b
// go from longest to shortest
/**
 * 
 * 
 * 
 * Ex:
MT__bold('test <b hahaha>test test test test a</b>', ['test']));
	<b>test</b> <b hahaha><b>test</b>1 <b>test</b> <b>test</b> <b>test</b> a</b> 
MT__bold('test <b hahaha>test1</b>', ['test1']));
	test <b hahaha>test1</b> 
 */
function MT__bold(o, arr, options_object) {
	
	
	
	
	// THIS is old
	// The older way of doing it.
	//
	//~ // used bold matches
	//~ var found_words_bolded = [];
	//~ console.log(arr);
	
	// Sort longest first
	arr.sort(function(a, b){
	  return b.length - a.length; // ASC -> a - b; DESC -> b - a
	});
	
	//~ console.log(o);
	//~ console.log(arr);
	
	var x = o;
	var word;
	
	for (var i in arr) {
		
		// July 2 2014, Added .trim()
		//
		//
		word = arr[i].trim();
		
		//console.log(word);
		
		if (word == '') {
			continue;
		}
		
		// Is word "b" or "B"?
		// Replace all cases where it is not b> AND/OR <b OR </b
		// Encapsulate in bold element.
		if (word == 'b' || word == 'B') {
			x = x.replace(/b([^>])/i, '<b>$1'); //     b>
			x = x.replace(/([^\/<])b/i, '$1</b>'); //  /<b
			continue;
		}
		
		// Here?
		//~ var reg = new RegExp('(?=(<b>))[\s]('+__js_escape_regEx(word)+')', 'gi');
		var reg = new RegExp('('+__js_escape_regEx(word)+')(?![^< ]*<\\/b>)', 'gi');
		// fishes</b>
		// fish</b>
		// fis(h)(<)
		// fis(h)([ $])
		//~ console.log(reg);
		//~ console.log(options_object);
		
		if (options_object && options_object.hasOwnProperty('color'))
			x = x.replace(reg, '<b style="color:'+options_object.color+';">$1</b>');
		else {
			//~ console.log(x);
			//~ console.log('x');
			x = x.replace(reg, '<b>$1</b>');
		}
		
	}
	
	if (!options_object)
		return x;
	else {
		var return_object = {};
		return_object.bold_string = x;
		
		//~ if (x == undefined) x = '';
		
		if (options_object.percent_matched) {
			var pm;
			var xlen1 = x.length;
			var xlen2 = (x.replace(/<b>((.|\s)*?(?=<\/b>|$)|$)/g, '')).length;
			//~ var chars_removed = xlen1 - xlen2;
			//~ pm = chars_removed / xlen1; // 0 = no matches to 1 = all matches
			pm = (xlen1 - xlen2) / xlen1; // Inverse of 10 - 10/10 = 0, 10 - 0/10 = 1 => 1/0 and 1/1
			return_object.pm = {
				bold_string: x,
				percent_matched: pm,
				xlen1: xlen1,
				xlen2: xlen2
			}
			//~ return {
				//~ bold_string: x,
				//~ percent_matched: pm,
				//~ xlen1: xlen1,
				//~ xlen2: xlen2
			//~ }
			//~ return;
		}
		if (options_object.return_div_element) {
			var d = document.createElement('div');
			d.innerHTML = x;
			return_object.div_element = d;
		}
		
		return_object.options_object = options_object; // RETURN INIT !!
		
		//~ if (options_object.initial) {
			//~ 
		//~ }
		
		return return_object;
	}
	
	// old
	//
	//
	//~ for (var i in arr) {
		//~ 
		//~ // July 2 2014, Added .trim()
		//~ //
		//~ //
		//~ word = arr[i].trim();
		//~ 
		//~ //console.log(word);
		//~ 
		//~ if (word == '') {
			//~ continue;
		//~ }
		//~ 
		//~ // is in found_words_bolded ?
		//~ for (var j in found_words_bolded) {
			//~ var prev_match = found_words_bolded[j];
			//~ var tmp_match = (new RegExp('('+__js_escape_regEx(word)+')')).exec(prev_match);
			//~ if (new RegExp('('+__js_escape_regEx(word)+')'
		//~ }
		
		
		// THIS is old
		// The older way of doing it.
		//
		//~ x = x.replace(reg, function(p0, p1) {
			//~ console.log('p0:' + p0);
			//~ console.log('p1:' + p1);
			//~ console.log(found_words_bolded);
			//~ // is current "word" in a past "regex matched"?
			//~ for (var j in found_words_bolded) {
				//~ var prev_match = found_words_bolded[j];
				//~ var tmp_match = (new RegExp('('+__js_escape_regEx(p1)+')', 'i')).exec(prev_match);
				//~ if (tmp_match) {
					//~ //found_in_prev = true;
					//~ return p1; // ends here
				//~ }
			//~ }
			//~ // Still here? Must be a new word
			//~ found_words_bolded.push(word); // not here
			//~ return '<b>'+p1+'</b>';
		//~ });
		
		//console.log(found_words_bolded);
		
		// ...
		// The idea is to avoid bolding smaller words
		// when larger word already has bolded. So if "Frat"
		// is going to be bolded then don't bold "rat."
		
		// Below will bold "rat" regardless of whether
		// "Frat" is bolded. (Removed)
		//~ var found_in_prev = false;
		//~ for (var j in found_words_bolded) {
			//~ var prev_match = found_words_bolded[j];
			//~ var tmp_match = (new RegExp('('+__js_escape_regEx(word)+')')).exec(prev_match);
			//~ if (tmp_match) {
				//~ found_in_prev = true;
				//~ break;
			//~ } else {
				//~ 
			//~ }
		//~ }
		//~ if (!found_in_prev) {
			//~ found_words_bolded.push(word);
		//~ }
		
		//~ var str_match = false;
		//~ if (reg.exec(x))
			//~ str_match = true;
		//~ reg.lastIndex = 0;
		//x = x.replace(reg, '<b>$1</b>');
		//~ 
	//~ }
}
//console.log(MT__bold('all of the fishes ran to the fish store fish', ['fish','ish','fishes']));
//console.log(MT__bold('all of the fishes ran to the fish store ish', ['fish','ish','fishes']));
//console.log(MT__bold('all of the fishes ran to the fish store fishes', ['fish','ish','fishes']));
/*
 * old whois
 */
function mturk_whois(t, input_submit, output_div, submit_form, callbackFunction) {
		
	if (!output_div) // // // //
		output_div = d1_whois;
	//if (!submit_form)
	//	submit_form = true;
		
	if (!document.getElementById('x____')) {
		var p = document.createElement('p');
		p.setAttribute('id','x____');
		output_div.appendChild(p)
		p = document.getElementById('x____');
		//p.innerHTML = '';
	}
	
	var w = t;
	
	if (w != '' && w != 'UNKNOWN_SUBSTITUTION_VARIABLE') {
		//var w = website;
		
		if (w.indexOf(' ') != -1) {
			w = w.split(' ');
			w[0] = w[0].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[1] = w[1].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[0] = w[0].replace(/[\/?][\d\D]+/, '');
			w[1] = w[1].replace(/[\/?][\d\D]+/, '');
		} else {
			w = [w];
			w[0] = w[0].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[0] = w[0].replace(/[\/?][\d\D]+/, '');
		}
		console.log(w);
		
		var xint_whois1 = setInterval(function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://localhost/mturk-gerry_gorman.php?u=&a=md2&whois='+encodeURIComponent(w[0]),
				//timeout: 40,
				onload: function(response) {
					var rs=response.responseText;
					
					var d = document.getElementById('x____');
					
					if (rs.trim() == '') return;
					else if (
						rs.indexOf (
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">'
						) != -1
					) return; // closing browser response
					else {
						clearInterval(xint_whois1);
					}
					
					//console.log(rs);
					
					if (rs.indexOf('No match for domain') != -1) {
						d.innerHTML += '<p>No match for domain</p>';
						return;
					}
					//rs = rs.split('Registrant:');
					//rs = rs.splice(1);
					//rs = rs.join('Registrant:');
					
					var r2,x,out='';
					r2 = /([a-z0-9]+([_\.-][a-z0-9]+)*(@|[ ]{0,}\[at\][ ]{0,}|&#064;)([a-z0-9]+([\.-][a-z0-9]+)*)+\.[a-z]{2,})/gi;
					while (x = r2.exec(rs)) {
						out += '<input type="button" value="'+x[0]+'" class="ex__whois" ><br >';
					}
					if (out != '')
						d.innerHTML += out;
						//d1c.innerHTML += '<p>'+out+'</p>';
					rs = rs.replace(r2, '<input type="button" value="$1" class="ex__whois" >');
					rs = rs.replace(/[\r\n]+/g, '<br >');
					
					//rs = rs.replace(/[<>&]/g, '');
					//rs = rs.substr(0,4000);
					
					output_div.innerHTML += '<p>'+rs+'</p>';//
					
					// update button clicks
					DaveSchilling_whois_action();
				}
			});
		}, 2000);
	}
}
/* OLD FRONT PAGE ITERATION
 * 
*/ 
/*function getp(p)
{	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.mturk.com/mturk/viewhits?searchWords=&selectedSearchType=hitgroups&sortType=NumHITs%3A1&pageNumber='+p+'&searchSpec=HITGroupSearch%23T%231%2310%23-1%23T%23%21%23%21NumHITs%211%21%23%21',
		onload: function (responseDetails) {
			
			var rs=responseDetails.responseText;
			
			var div=document.getElementById('div__'+p);
			div.innerHTML=rs;
					
				
			var y=div.getElementsByTagName('table');
			div.innerHTML='<table>'+y[6].innerHTML+'</table>';
			
			var x=div.getElementsByClassName('capsuletarget');
			for (var i in x)
			{
				if (x[i].style)
					x[i].style.display='none';
			}
			
			var d;
			var y=document.getElementsByTagName('a');
			for (var i in y)
			{
				
			}
			
		}
	});
}*/
