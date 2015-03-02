// ==UserScript==
// @name			AMT, Core, All Pages
// @namespace		MechanicalTurk
// @include			*
// ==/UserScript==


// jobs
// Kristin Howe
var RUN_HOWE_CODE = false; // if true this will run "all pages extend". (set RUN__ALL_PAGES_EXTEND = false) 
// James M Ratcliffe
var RUN_James_M_Ratcliffe_Verizon_com = true;
//test coding and stuff
// Tony Pavia
var RUN_Tony_Pavia_Schools = false;
// Tony Pavia
var RUN_NPDLabs_Schools = true;
// Sahar UNC "ReferIt Game"
var RUN_Sahar_ReferIt_Game = true;
// Jordan Mills, URL of pricing page
var RUN__ALL_PAGES_TEXTAREA__Jordan_Mills = true;
var RUN__ALL_PAGES_TEXTAREA__Jordan_Mills = false;
// Matt Tarjeft
var RUN__ALL_PAGES__Matt_Tarjeft = false;
// See "* REQUESTER TASKS" below for more tasks.
var RUN__ALL_PAGES__Andrew_Ryan_Hangouts = true;

// scripts
var RUN__ALL_PAGES_ZOOM = false;
var RUN__ALL_PAGES_EXTEND = false;
var RUN__ALL_PAGES_TEXTAREA = false;
var HIGHLIGHT_UK_COUNTIES = false;

/***
 * Messaging with core-mturk
 ***/


/**
 * End of messages with core-mturk
 **/

/**
 * Trevor Faden / Gopi Parikh / Janet Lee
 * 
 */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		
		//JANET LEE
		if(request.itsOkayToRun) {
			if(document.location.href.indexOf('http://researchcu.ncua.gov') != -1) {
				
				//new AMT___core_factory().nextWindow();
				
				
				
				
				var theForm = document.forms['aspnetForm'];
				if (theForm) {
					var rg = /http:\/\/researchcu\.ncua\.gov\/Views\/FindCreditUnions\.aspx\?n=([\d]+)/.exec(document.location.href);
					if (rg) {
						document.getElementById('ctl00_MainContent_txtCharterNumber').value = rg[1];
						theForm.__EVENTTARGET.value = 'ctl00$MainContent$ButtonFindQuick';
						theForm.__EVENTARGUMENT.value = '';
						theForm.submit();
						//~ 
						//~ console.log(new AMT___core_factory().nextWindow());
						//~ 
						//~ // GO TO NEXT 
						//~ 
						//~ // submit
					}
				}
			}
		}
	}
);
	
function load()
{
	
	// Global
	var LOC__ = document.location.href;
	var loc = document.location.href;
	
	// Var to show if this has run.
	this.global_vars = {
		is_running_on_amt: true // default=true
	}
	
	
	// Exit if inside of a frame and inurl "ASSIGNMENT_ID_NOT_AVAILABLE"
	if  (
		window.top != window.self &&
		/assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE/.exec(loc)
		)
	{
		AMT__Global_Vars.isPreview = true;
		AMT__Global_Vars.isTopWindow = false;
		
		// have a run button
		load__allPages_AMT_combo__btn();
		// stop
		console.log('stop all pages');
		this.global_vars.is_running_on_amt = false;
		
		return;
	}
	
	
	
	if  (
		window.top == window.self &&
		location.href.indexOf("mturk.com/mturk") != -1
		)
	{
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.isTopWindow = true;
		new AMT___core_factory().top_window__addEventListener_iframe();
		
		return;
	}
	
	
	
	// Exit if AMT
	if  (
			loc.indexOf('https://www.mturk.com') != -1 ||
			loc.indexOf('https://www.mturkcontent.com') != -1 ||
			loc.indexOf('https://s3.amazonaws.com') != -1 ||
			loc.indexOf('https://workersandbox.mturk.com') != -1
		)
	{ // Run any dual mode content here!
		load__allPages_AMT_combo();
		
		this.global_vars.is_running_on_amt = false;
		
		return;
	}
	
	// Run all pages AMT combo content.
	// This runs when top==self and inurl(assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE) 
	if  (
		window.top == window.self &&
		/assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE/.exec(loc)
		)
	{
		AMT__Global_Vars.isPreview = true;
		AMT__Global_Vars.isTopWindow = true;

		load__allPages_AMT_combo();
		console.log('Stop. Run:load__allPages_AMT_combo.');
		
		this.global_vars.is_running_on_amt = false; // Apparently? This need to be false?
		return;
	}
	
	// FLICKSIO
	// topwindow=true
	// ispreview=false
	if  (
		window.top == window.self &&
		/^https?:\/\/flicksio\.com\/mturk2\//.exec(loc)
		)
	{
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.isTopWindow = true;
		new AMT___core_factory().top_window__addEventListener_iframe();
		// have a run button
		load__allPages_AMT_combo();
		// stop
		console.log('stop all pages');
		this.global_vars.is_running_on_amt = false;
		
		return;
	}
	// FLICKSIO
	// topwindow=true
	// ispreview=false
	if  (
		window.top != window.self &&
		/^https?:\/\/flicksio\.com\/mturk2\//.exec(loc)
		)
	{
		AMT__Global_Vars.initializeTabId();
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.isTopWindow = false;
		
		// have a run button
		load__allPages_AMT_combo();
		// stop
		console.log('stop all pages');
		this.global_vars.is_running_on_amt = false;
		
		return;
	}
	
	/*
	 {
		zoom: int, //Default 3
		cp
	 }
	 */
	//Draws a bing map based on the parameters object
	//Creates a div with the id "myMap"
	//Returns that div
	//parameter attributes:
	//style (a standard css style) (default: 'width:650px;height:450px;')
	//zoom (1-20) (default: 18)
	//lat (default: 40.748441)  
	//lng (default: -73.985664) 
	//  ^------------------------------------------Empire State Building
	//~ function drawBingMap(params) {
		//~ if(!params.style)
			//~ params.style = 'width:650px;height:450px;';
		//~ if(!params.lat)
			//~ params.lat = 40.748441
		//~ if(!params.lng)
			//~ params.lng = -73.985664
		//~ if(!params.zoom)
			//~ params.zoom = 20;
		//~ 
		//~ var paramsDiv = document.createElement('div');
		//~ paramsDiv.id = 'paramsDiv';
		//~ console.log(params);
		//~ paramsDiv.innerText = JSON.stringify(params);
		//~ document.body.appendChild(paramsDiv);
		//~ 
		//~ 
		//~ var script = document.createElement('script');
		//~ script.setAttribute('type', 'text/javascript');
		//~ script.setAttribute('src', 'bingMap.js');
		//~ document.body.appendChild(script);
		//~ 
	//~ }
	
	// ...
	if(loc.indexOf('bingImageTest.html') != -1) {
		//drawBingMap({style:'width:650px;height:450px;', lat:'42.394496', lng: '-76.511503', zoom: '19'});		
	}
	
	// ...
	console.log('GOT HERE');
	
	// ...
	if(loc.indexOf('ChiosSpecial') != -1) {
		window.setTimeout(function() {
			var innerH = document.body.innerHTML;
			var latLngReg = /http:\/\/maps.google.com\/maps\?ll=([^,]+),([^&]+)&/;
			
			var rslt = latLngReg.exec(innerH);
			console.log(rslt);
			var lat = rslt[1];
			var lng = rslt[2];
			
			chrome.runtime.sendMessage(
					'gcfnekbbpmbgadddbojhlojhddnkcpje',
					{
						util_window_message_passing: true,
						latLng: {lat: lat, lng: lng}
					},
					function(response) {
						// response=object
					}
				)
			
			
			//alert('lat: ' + lat + ' lng: ' + lng);
		}, 5000)
	};
	//~ MT___google_api_geocode('67 Comfort Road Apt 6, Ithaca, NY, 14850', function(lat, lng) {
		//~ console.log('drawing');
		//~ console.log(drawBingMap({style:'width:650px;height:450px;', lat:lat, lng: lng, zoom: '19'}));		
		//~ console.log('drawn');
	//~ }, false, true)
	
	//
	//
	//
	//
	s="We ask you to split the postal addresses of business listings from United Kingdom into several address lines";
	if(
		loc.indexOf('demo-rc.crowdcomputingsystems.com/mturk-web/public') != -1 &&
		document.body.innerHTML.indexOf(s) != -1
		)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,tr,td,th,table {margin:0;padding:0;font-size:10px;}');
		
		GM_addStyle('table,tr,td {border-collapse:collapse;border:1px solid #3a3a3a;white-space: nowrap;}'); //nowrap

		console.log("hello!");
		//class='place bg-dark'
		var table1 = document.createElement("table");
		table1.setAttribute("id", "table1");
		//var tr1 = document.createElement("tr");
		//tr1.setAttribute("id","tr1");
		//table1.appendChild(tr1);
		//tr1.innerHTML = "<td>HELLO</td>";
		
		var regAdd = /<p><b>Registered Address<\/b>: ([^<]+)/;
		var address = regAdd.exec(document.body.innerHTML)[1];
		var regPostal = /\s[\w]{3,4}\s[\w]{3}$/;
		var postal = regPostal.exec(address)//[0];
		if(postal)
			postal = postal[0];
		console.log(postal);
		if(postal)
		{
			address = address.replace(/\s[\w]{3,4}\s[\w]{3}$/,"").trim();
			document.getElementsByClassName("cc-input text   agent_zip_geocoded optional answerInput")[0].value = postal;
		}
		
		document.getElementsByClassName("cc-input agent_state_not_in_domicile_country required  answerInput")[0].checked = true;
		
		
		address = address.split(" ");
		
		
		console.log(address);
		
		var tableInside = "";
		for(var i = 0; i < 6; i++)
		{
			tableInside+="<tr id='r"+i+"'>";
			var inputValue;
			switch(i) {
				case 1: inputValue = "1";break;
				case 2: inputValue = "2";break;
				case 3: inputValue = "3";break;
				case 4: inputValue = "City";break;
				case 5: inputValue = "State";break;
			}
			for(var j = 0; j < address.length; j++)
			{
				if(i == 0)
				{
					inputValue = address[j];
				}
				tableInside+="<td id='r"+i+"c"+j+"'>"+inputValue+"</td>";
			}
			tableInside +="</tr>";
		}
		
		//table1.setAttribute('innerHTML',tableInside);
		
		
		
		document.getElementsByClassName('place bg-dark')[0].appendChild(table1);
		document.getElementById("table1").innerHTML = tableInside;
		
		//document.getElementById('r2c2').onclick = function() {console.log("haha");};
		
		
		//document.getElementsByTagName("select")[0].style.height = "500";
		//document.getElementsByTagName("select")[0].style.position = "absolute";
		//document.getElementsByTagName("select")[0].multiple = "true";
		
		//Address and City onclicks
		for(var i = 1; i < 5; i++)
		{
			for(var j = 0; j < address.length; j++)
			{
				document.getElementById('r'+i+'c'+j).onclick = function() {
					var input;
					switch(this.innerText.trim()){
						case '1': input = "line1"; break;
						case '2': input = "line2"; break;
						case '3': input = "line3"; break;
						case 'City': input = "city"; break;
					}
					var identifier = 'cc-input text   agent_' + input + '_geocoded optional answerInput';
					console.log(identifier);
					console.log(this.id);
					var input = document.getElementsByClassName(identifier)[0];
					var col = /[\d]+$/.exec(this.id)[0];
					console.log(col);
					var value = document.getElementById('r0c'+col).innerText.trim();
					value = value.replace(/,$/,"");
					input.value = (input.value + " " + value).trim();
					this.style.backgroundColor = "green";
				}
			}		
		}
		
		//Dbl-Click reset
		document.getElementsByClassName("cc-input text   agent_line1_geocoded optional answerInput")[0].ondblclick = function()
		 {this.value = "";};
		document.getElementsByClassName("cc-input text   agent_line2_geocoded optional answerInput")[0].ondblclick = function()
		 {this.value = "";};
		document.getElementsByClassName("cc-input text   agent_line3_geocoded optional answerInput")[0].ondblclick = function()
		 {this.value = "";};
		document.getElementsByClassName("cc-input text   agent_city_geocoded optional answerInput")[0].ondblclick = function()
		 {this.value = "";};
		
		
		//State onclicks
		for(var i = 0; i < address.length; i++)
		{
			document.getElementById('r5c'+i).onclick = function() {
				var select = document.getElementsByTagName("select")[0];
				var options = select.options;
				var stateId = "r0" + "c" +/c([\d]+)/.exec(this.id)[1];
				console.log(stateId);
				var state = document.getElementById(stateId).innerText.toLowerCase();
				
				var foundState = false;
				for(var j in options)
				{
					//console.log(options[j].text);
					if(options[j] && options[j].text && options[j].text.trim().toLowerCase() == state)
					{
						select.selectedIndex = j;
						foundState = true;
						break;
					}
				}
				if(foundState)
				{
					this.style.backgroundColor = "green";
				}
				else
					this.style.backgroundColor = "blue";
			}
		}
		
		document.getElementsByClassName('place bg-dark')[0].scrollIntoView();
		document.getElementsByClassName('button cc-button submit-btn btn btn-primary')[0].style.width = "100%";
	}
	
	/**
	 * iframe parent watch function and listener! 
	 * 
	 * USE THIS SECTION AND THE SUBSEQUENT FUNCTIONS
	 * TO SPEAK TO/RECEIVE MESSAGES FROM PARENT WINDOWS
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	var AMT__iframeReceiveMessage_done = false;
	var AMT__iframeReceiveMessage_done2= false;
	window.addEventListener("message", AMT__iframeReceiveMessage, false);
	function AMT__iframeReceiveMessage(event)
	{
		if (typeof event.data != 'object') {
			if (event.data == 'AMT__Ed_Hallen_CEO_or_Marketing' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Ed_Hallen_URL__receiveMessage();
			}
			if (event.data == 'AMT__Newline_Financial_cookcountyclerk_com' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Newline_Financial_cookcountyclerk_com();
			}
			if (event.data == 'AMT__Tim_Edwards_Email' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Tim_Edwards_Email();
			}
			if (event.data == 'AMT__Ashley_Fraser_Email' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Ashley_Fraser_Email();
			}
			if (event.data == 'AMT__Giovanni_Mantica' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Giovanni_Mantica_Email();
			}
			if (event.data.indexOf('AMT__Bryant_Wolf_Create_Yelp') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Bryant_Wolf_Create_Yelp(event.data);
			}
			if (event.data.indexOf('AMT__Jackie_Shlecter_Chemistry') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Jackie_Shlecter_Chemistry(event.data);
			}
			if (event.data.indexOf('AMT__Jackie_Shlecter_teacherContacts') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Jackie_Shlecter_Chemistry(event.data);
			}
			if (event.data.indexOf('AMT__Jeff_Meyer_schoolDistricts') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Jeff_Meyer_schoolDistricts(event.data);
			}
			if (event.data.indexOf('AMT__CRE_company_contact_info') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__CRE_company_contact_info(event.data);
			}
			if (event.data.indexOf('AMT__Nicholas_Thorne_contact_info') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Nicholas_Thorne_contact_info(event.data);
			}
			if (event.data.indexOf('AMT__Thomas_Haymore_contact_info') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Thomas_Haymore_contact_info(event.data);
			}
			if (event.data.indexOf('AMT__Arthur_McKee_provosts_info') != -1 && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Arthur_McKee_provosts_info(event.data);
			}
			if (event.data.indexOf('AMT__x8_Data_find_executives') != -1 && !AMT__iframeReceiveMessage_done2) { // DONE 2 !
				AMT__iframeReceiveMessage_done2 = true;
				AMT__x8_Data_find_executives(event.data);
			}
		}
		//
		else if (typeof event.data == 'object') {
			if (event.data.task == 'AMT__all_pages_util' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__all_pages_util(event.data);
			}
			//~ if (event.data.task == 'AMT__utility_window_quick_funcs' && !AMT__iframeReceiveMessage_done) { // DUPLICATE OF AMT__all_pages_util EXCEPT THIS GOES THROUGH BACKGROUND PAGE!!!
				//~ AMT__iframeReceiveMessage_done = true;
				//~ AMT__utility_window_quick_funcs(event.data);
			//~ }
			if (event.data.task == 'AMT__Kristin_Howe_agent_photos__yahoo_bot' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Kristin_Howe_agent_photos__yahoo_bot(event.data);
			}
			if (event.data.task == 'AMT__michael_d_parrott_ASU_classes' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__michael_d_parrott_ASU_classes(event.data);
			}
			if (event.data.task == 'AMT__Andrew_Ryan_guidestar_stats' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Andrew_Ryan_guidestar_stats(event.data);
			}
			if (event.data.task == 'Andrew_Ryan_charities_ein__movePDF' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				Andrew_Ryan_charities_ein__movePDF(event.data);
			}
			if (event.data.task == 'AMT__Robin_Demaria_smartagora_captcha' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Robin_Demaria_smartagora_captcha(event.data);
			}
			if (event.data.task == 'AMT__Leonid_check_site_advertisement' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				AMT__Leonid_check_site_advertisement(event.data);
			}
			if (event.data.task == 'AMT__Newline_Financial_cookcountyclerk_com__payment' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				//~ AMT__Newline_Financial_cookcountyclerk_com__payment(event.data);
				
				// NEW
				new AMT__rq().AMT__Newline_Financial_cookcountyclerk_com__payment(event.data);
			}
			if (event.data.task == 'AMT__Gary_Gebenlian_give_addr' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				// NEW
				new AMT__rq().rq__Gary_Gebenlian_give_addr(event.data);
			}
			if (event.data.task == 'AMT__traveldata_scrape_hotels_com' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				// NEW
				new AMT__rq().rq__AMT__traveldata_scrape_hotels_com(event.data);
			}
			if (event.data.task == 'AMT__traveldata_scrape_travelocity_com' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				// NEW
				new AMT__rq().rq__AMT__traveldata_scrape_travelocity_com(event.data);
			}
			if (event.data.task == 'AMT__chios_system_draw_polygon__utility_window' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				// NEW
				new AMT__rq().AMT__chios_system_draw_polygon__utility_window(event.data);
			}
			if (event.data.task == 'AMT__Kristin_Howe_agent_photos2__utility_window' && !AMT__iframeReceiveMessage_done) {
				AMT__iframeReceiveMessage_done = true;
				// NEW
				new AMT__rq().AMT__Kristin_Howe_agent_photos2__utility_window(event.data);
			}
			//~ if (event.data.task == 'AMT__Michael_Lai_ib_tok' && !AMT__iframeReceiveMessage_done) {
				//~ AMT__iframeReceiveMessage_done = true;
				//~ // NEW
				//~ new AMT__rq().AMT__Michael_Lai_ib_tok(event.data);
			//~ }
		}
	}
	//~ this.blaaaaaah = 'xxxxxxxsdfsdfsdavdfs';
	// Ask Core-mturk whether we are a utility window and, if so, run the options
	// For example Michael Lai
	this.AMT__init_utility_window = function() {
		if(window.top == window.self) {
			chrome.runtime.sendMessage('gcfnekbbpmbgadddbojhlojhddnkcpje', {amIUtilityTab: true},  
				function(response) {
					if(response &&
					   response.isUtilityTab) {
						//We are a utility tab! :D
						//the response is an options obj
						console.log('Got options from Core-Mturk:');
						console.log(response);
						response.isUtilityTab = true;
						AMT__iframeReceiveMessage({
							data: response // Pass this in as ".data"
						});
					}
				}
			);
		}
	}
	
	
	/**
	 * Leonid
	 * 
	 */
	function AMT__Leonid_check_site_advertisement(r) {
		//extend
		MT___all_pages_extend();
		
		// r.name,subject,email,body
		//~ console.log(r);
		
		var type = 0;
		if (/(advertise|advertize|advertizing)/i.exec(document.body.innerText))
		{
			type = 1;
		}
		else if (/(advertise|advertize|advertizing)/i.exec(document.body.innerHTML))
		{
			type = 2;
		}
		
		// send complete
		parent.postMessage(
			{
				key: 'AMT__Leonid_check_site_advertisement__complete',
				data: type
			},
			"*"
		);
		return;
	}
	/**
	 * Robin Demaria
	 * 
	 */
	function AMT__Robin_Demaria_smartagora_captcha(r) {
		//extend
		MT___all_pages_extend();
		
		// r.name,subject,email,body
		console.log(r);
		
		
		if (document.body.innerHTML.indexOf('<h4 class="success pngfix"><span><a href="#" rel="systemMessage" class="hideThis">Cacher ce message</a></span>') != -1) {
			
			// send complete
			parent.postMessage(
				{
					key: 'AMT__Robin_Demaria_smartagora_captcha__complete',
					data: 'Cacher ce message'
				},
				"*"
			);
			return;
		}
		
		// Here?
		document.getElementById('your_name').value = r.o.name;
		document.getElementById('your_email').value = r.o.email;
		document.getElementById('your_subject').value = r.o.subject;
		document.getElementById('your_message').value = r.o.body;
		
		GM_addStyle('.captcha {zoom:1.2;position:absolute;top:0;left:0;}');
		
		setTimeout(function() {
			document.getElementById('captcha').focus();
		}, 400);
		setTimeout(function() {
			document.getElementById('captcha').focus();
		}, 800);
		
		document.getElementById('captcha').addEventListener('keyup', function() {
			console.log(this.value);
			if (this.value.length >= 5) {
				// go to next!
				new AMT___core_factory().nextWindow();
				//~ new AMT___core_factory().nextTab();
				
				document.getElementById('submit').click();
			}
			
		}, false);
	}
	/**
	 * AMT__x8_Data_find_executives
	 * 
	 */
	function AMT__x8_Data_find_executives(r) {
		
		//~ console.log(r);
		
		window.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			//~ console.log(k);
			if (k == 13) { // enter
				sel = window.getSelection().toString().trim();
				
				if (sel && sel.trim() != '') {
					sel = sel.trim();
					//~ console.log(sel);
					
					// send complete
					parent.postMessage(
						{
							key: 'AMT__x8_Data_find_executives__complete',
							data: sel // "data" is the href !!
						},
						"*"
					);
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
			}
		}, false);
		
	}
	
	/**
	 * Andrew Ryan
	 * 
	 */
	function Andrew_Ryan_charities_ein__movePDF() {
		//~ console.log('x');
		//~ document.body.style.zoom = '4';
		//~ document.getElementsByTagName('embed')[0].style.webkitTransform = 'scale(2.5)';
		//~ document.getElementsByTagName('iframe')[0].style.webkitTransform = 'scale(4) !important';
	}
	/**
	 * Andrew Ryan
	 * 
	 */
	function AMT__Andrew_Ryan_guidestar_stats__applyActions() {
		//extend
		MT___all_pages_extend();
		
		//a
		var a = document.getElementsByTagName('a');
		for (var i in a) {
			if (i == 'length') break;
			a[i].onclick = function(e) { // send to parent!
				
				// tell parent to stop talking to child!
				parent.postMessage(
					{
						key: 'AMT__Andrew_Ryan_guidestar_stats__clearInterval'
					},
					"*"
				);
				
				// send complete
				parent.postMessage(
					{
						key: 'AMT__Andrew_Ryan_guidestar_stats__complete',
						data: this.href // "data" is the href !!
					},
					"*"
				);
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		}
	}
	function AMT__Andrew_Ryan_guidestar_stats(r) {
		//~ tell parent to stop talking to child!
		//~ parent.postMessage(
			//~ {
				//~ key: 'AMT__Andrew_Ryan_guidestar_stats__clearInterval'
			//~ },
			//~ "*"
		//~ );
		
		AMT__Andrew_Ryan_guidestar_stats__applyActions();
		
		console.log(r);
		
		// Page contains r.name ?
		if (document.body.innerText.indexOf(r.name) != -1) {
			
			// zoom out
			document.body.style.zoom = '0.8';
			// skips!
			// skip this if desired
			//
			var numResults = document.getElementById('ctl00_phMainBody_divSearchProducedTitle').innerHTML;

			previewObj = {};
			
			numResults = numResults.replace(/[\D]/g, '');
			previewObj.numResults = numResults;
			
			var matchStr = document.getElementsByTagName('strong')[0].innerText;
			matchStr = matchStr.replace(/[^\w\d]/g, '');
			
			var matchExists = new RegExp(matchStr, 'i');
			var tabString = document.getElementsByTagName('table')[1].innerText;
			var tabString = tabString.replace(/[^\w\d]/g,'');
			if(tabString.match(matchExists))
			{
				previewObj.matchExists = true;
			}
			else
			{
				previewObj.matchExists = false;
			}

			// parent post 
			parent.postMessage(
				{
					key: 'AMT__Andrew_Ryan_guidestar_stats__numResults',
					data: previewObj //
				},
				"*"
			);
				
			
			
			// Tell parent to stop talking to child!
			parent.postMessage(
				{
					key: 'AMT__Andrew_Ryan_guidestar_stats__clearInterval'
				},
				"*"
			);
			var tx = document.getElementById('ctl00_SearchBar2_txtKeywords');
			if (tx) {
				tx.value = r.name; // comp. name!
				var xint = setInterval(function() {
					//tx.click();
					tx.value = r.name; // comp. name!
				}, 200);
				tx.onfocus = function() {
					clearInterval(xint);
				}
			}
			
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea,b {margin:0;padding:0; !important;}');
			GM_addStyle('.sr11,.sr12 {margin:0;padding:0;width:50%;}');
			GM_addStyle('b {zoom:1.2;}'); // STYLE NONE !!
			//GM_addStyle('a {text-decoration:none;color:black;}'); // STYLE NONE !!
			
			
			
			// Modify the page to make it more ROOMY !
			document.getElementsByClassName('navbar')[0].parentNode.removeChild(document.getElementsByClassName('navbar')[0]);
			document.getElementsByClassName('logobar')[0].parentNode.removeChild(document.getElementsByClassName('logobar')[0]);
			//
			var x = document.getElementsByClassName('sr22');
			for (var i in x) {
				if (i == 'length') break;
				x[i].parentNode.style.position		= 'absolute';
				x[i].parentNode.style.visibility	= 'hidden';
			}
			//
			var x = document.getElementsByClassName('sr15');
			for (var i = x.length -1; i>= 0; i--) {
				if (i == 'length') continue;
				x[i].parentNode.removeChild(x[i]);
			}
			//
			var x = document.getElementsByClassName('sr14-b');
			for (var i in x) {
				if (i == 'length') break;
				x[i].innerText = '';
				x[i].style.width = '0%';
			}
			//
			var x = document.getElementsByClassName('sr13');
			for (var i in x) {
				if (i == 'length') break;
				x[i].innerText = '';
				x[i].style.width = '0%';
			}
			//
			var x = document.getElementsByClassName('sr11');
			for (var i = x.length -1; i>= 0; i--) {
				if (i == 'length') continue;
				//document.getElementsByClassName('sr11')[$$$$].getElementsByTagName('p')[1]
				x[i].removeChild(x[i].getElementsByTagName('p')[1]);
				x[i].style.width = '50%';
			}
			//
			var x = document.getElementsByClassName('sr12');
			for (var i = x.length -1; i>= 0; i--) {
				if (i == 'length') continue;
				x[i].style.width = '50%';
			}
			//
			document.getElementsByClassName('results_paging')[0].parentNode.removeChild(document.getElementsByClassName('results_paging')[0]);
			//home > search Results
			document.getElementById('ctl00_phMainBody_searchResult_breadcrumb').parentNode.removeChild(document.getElementById('ctl00_phMainBody_searchResult_breadcrumb'));
			//organization name, details, ...
			document.getElementsByTagName('thead')[0].parentNode.removeChild(document.getElementsByTagName('thead')[0]);
			// pic
			document.getElementsByClassName('columnw-50r')[0].parentNode.removeChild(document.getElementsByClassName('columnw-50r')[0]);
			// results #
			document.getElementsByClassName('viewing')[0].parentNode.removeChild(document.getElementsByClassName('viewing')[0]);
			
			// make the document BOLD !!
			// make the links BOLD
			var x = document.getElementsByTagName('table')[1].getElementsByTagName('a');
			var bold = r.name.replace(/[^\w\d ]/g, '').split(' ');
			for (var i in x) {
				if (i == 'length') break;
				//~ console.log(x[i].innerText);
				//~ console.log(bold);
				
				x[i].innerHTML = MT__bold(x[i].innerText, bold); //.replace(/<b>/g, '<b style=>');
				x[i].style.textDecoration = 'none';
				x[i].style.color = 'black';
			}
			// make the address BOLD
			//ctl00_phMainBody_rptSearchResults_ctl00_spAddress
			var bold= r.location.replace(/[^\w\d ]/g, '').split(' ');
			var c	= 0;
			var c_pd= '00';
			var span_el;
			//~ span_el = document.getElementById('ctl00_phMainBody_rptSearchResults_ctl'+c_pd+'_spAddress');
			//~ console.log(span_el);
			while (span_el = document.getElementById('ctl00_phMainBody_rptSearchResults_ctl'+c_pd+'_spAddress')) {
				span_el.innerHTML = MT__bold(span_el.innerText, bold);
				c++;
				c_pd = (c < 10) ? '0' + c : c;
			}
			
			// search results area
			var searchArea = document.getElementById('ctl00_phMainBody_divSearchProducedTitle')
			searchArea.innerHTML = searchArea.innerHTML.replace(/Your search[\r\n\s\t]*for /, '')
			searchArea.innerHTML = searchArea.innerHTML.replace(/produced[\r\n\s\t]*([\d]+)[\r\n\s\t]*results./, '<br>$1');
			
			//~ var x = document.getElementsByClassName('sr12');
			//~ var bold = r.name.replace(/[^\w\d ]/g, '').split(' ');
			//~ for (var i in x) {
				//~ if (i == 'length') break;
				//~ //ctl00_phMainBody_rptSearchResults_ctl00_spAddress
				//~ x[i].innerHTML = MT__bold(x[i].innerText, bold);
			//~ }
			
			//~ var x = document.getElementsByClassName('results_paging');
			//~ for (var i = x.length -1; i>= 0; i--) {
				//~ if (i == 'length') continue;
				//~ x[i].parentNode.removeChild(x[i]);
			//~ }
			
			return;
		}
		
		// search by name
		var tx = document.getElementById('ctl00_SearchBar2_txtKeywords');
		if (tx) {
			tx.value = r.name; // comp. name!
			//~ var xint = setInterval(function() {
				//~ //tx.click();
				//~ tx.value = r.name; // comp. name!
			//~ }, 200);
			//~ tx.onfocus = function() {
				//~ clearInterval(xint);
			//~ }
		}
		

		
		if (!r.doSearch) {
			return;
		}
		
		// r.doSearch == true
		// Still here? New search.

		// submit form
		document.getElementById('ctl00_SearchBar2_btnSearch').click();
		
	}
	/*
	 * Michael D. Parrott
	 * 
	 */
	function AMT__michael_d_parrott_ASU_classes(r) {
		
		// is complete?
		// post to parent!
		if (document.body.innerHTML.indexOf('Your response has been recorded.') != -1) {
			parent.postMessage(
				{
					key: 'AMT__michael_d_parrott_ASU_classes__complete',
					data: 'Your response has been recorded.'
				},
			"*");
			return;
		}
		
		// else is new !
		document.getElementById('entry_2002629730').value = r.course_webpage;
		document.getElementById('entry_751685664').value = r.id;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: r.course_webpage,
			onload: function (response) {
				var rs = response.responseText;
				
				if (response.status != 200) {
					exit(response.status);
				}
				
				// dom parse!
				var DOMParse = MT___HTMLParser__(rs);
				console.log(DOMParse);
				var x = DOMParse.getElementById('CatalogList');
				console.log(x);
				console.log(x.nodeValue);
				
				if (x && x.innerText) {
					x = x.innerText.trim();
					document.getElementById('entry_1896604473').value = x;
					if (x.length > 10) {
						document.getElementById('ss-submit').style.backgroundColor = 'LightGreen';
						//document.getElementById('ss-submit').click();
					}
				}
				
			}
		});
	}
	
	/*
	 * Kristin Howe 
	 * 
	 */
	function AMT__Kristin_Howe_agent_photos__yahoo_bot(r) {
		
		var regex = new RegExp(__js_escape_regEx(r.agent_name), 'gi');
		
		// extend
		MT___all_pages_extend();
		// highlight name!
		//MT___all_pages_highlightEmailAddresses(true, regex); // scrollIntoView, regex_highlight // returns emails!
		// href
		MT___all_pages_showhref();
		// zoom
		MT___all_pages_zoom();
		KristinHowe_agent_photo_scrollIntoView(r.agent_name);
		
		//~ var ifr_intv = setInterval(function() {
			//~ d3.contentWindow.postMessage( {task: 'AMT__Kristin_Howe_agent_photos__yahoo_bot', agent_name: NAME}, "*"); // !!
			//~ d3b.contentWindow.postMessage({task: 'AMT__Kristin_Howe_agent_photos__yahoo_bot', agent_name: NAME}, "*"); // !!
		//~ }, 400);
		
		
		
		KristinHowe_agent_photo_activate_images__yb();
		
		// KristinHowe_agent_photo_images__add_image
		function KristinHowe_agent_photo_images__add_image(page_img, pos_left) {
			//create an image
			//getBounding
			var b = page_img.getBoundingClientRect();
			var left = b.left *1;
			//left -= 60;
			left += pos_left;
			var top = b.top *1;
			top += document.body.scrollTop*1;
			
			var d = document.createElement('div');
			d.setAttribute(
				'style',
				'position:absolute;top:'+top+'px;left:'+left+'px;z-index:1000000000000000000;opacity:0.7;background-color:white;'
			);
			d.setAttribute('class', 'manual__exe_div_162435168649');
			var d_= document.createElement('img');
			d_.setAttribute('class', 'manual__exe_image_162435168649');
			d_.setAttribute(
				'style',
				'max-width:60px;max-height:60px;z-index:1000000000000000000;border:8px dashed green;' //bgc
			);
			d_.src = page_img.src;
			d.appendChild(d_);
			document.body.appendChild(d);
			
			console.log('pos_left:'+pos_left+' left:'+left);
			console.log(d_);
		}
		
		// KristinHowe_agent_photo_activate_images__yb
		// activate images function
		function KristinHowe_agent_photo_activate_images__yb() {
			// Iterate through all images and add an image "button."
			// Background color is set from domain.
			// (getBoundingClientRect())
			// Remove all images from any previous runs.
			
			// remove old
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			var i;
			for (i=a.length - 1; i >= 0; i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			var a = document.getElementsByClassName('manual__exe_div_162435168649');
			for (i=a.length - 1; i >= 0; i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			
			
			// new
			//var bgc = (IMAGES_ARE_FZ == 1) ? 'Green' : '#aeaeae';
			var a = document.getElementsByTagName('img');
			for (var i in a) {
				if (i == 'length') break;
				if (!a[i].src || a[i].src == '') continue;
				KristinHowe_agent_photo_images__add_image(a[i], 200);
				//KristinHowe_agent_photo_images__add_image(a[i], 20);
				KristinHowe_agent_photo_images__add_image(a[i], -200);
			}
			//~ // new
			//~ var bgc = (IMAGES_ARE_FZ == 1) ? 'Green' : '#aeaeae';
			//~ var a = document.getElementsByTagName('img');
			//~ for (var i in a) {
				//~ if (i == 'length') break;
				//~ if (!a[i].src || a[i].src == '') continue;
				//~ KristinHowe_agent_photo_images__add_image(a[i], 200);
				//~ KristinHowe_agent_photo_images__add_image(a[i], 20);
				//~ KristinHowe_agent_photo_images__add_image(a[i], -200);
			//~ }
			
			// Send to parent/job window
			// Write value to db
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			for (var i in a) {
				a[i].onclick = function() {
					this.style.border = '4px solid LightGreen';
					
					parent.postMessage(
						{
							key: 'AMT__Kristin_Howe_agent_photos__yahoo_bot__complete',
							data: this.src
						},
					"*");
					
					//~ // show debug
					//~ var x = this.parentNode;
					//~ x.appendChild(document.createElement('br'));
					//~ x.appendChild(document.createTextNode(AGENT_NAME));
					//~ x.appendChild(document.createElement('br'));
					//~ x.appendChild(document.createTextNode(this.src));
					//~ 
					//~ var u;
					//~ u = 'http://192.168.1.6/mturk/util6.php'+
						//~ '?kristin_howe_photos__complete_name='+
						//~ encodeURIComponent(AGENT_NAME)+
						//~ '&kristin_howe_photos__complete_site='+
						//~ encodeURIComponent(document.getElementById('manual__domain').value) +
						//~ '&kristin_howe_photos__complete_image_url='+
						//~ encodeURIComponent(this.src);
						//~ 
					//~ var x = this;
					//~ GM_xmlhttpRequest({
						//~ method: 'GET',
						//~ url: u,
						//~ onload: function (response) {
							//~ var rs = response.responseText;
							//~ if (rs.trim() != '')
								//~ alert(rs);
							//~ x.style.border = '8px dashed #aeaeae';
						//~ }
					//~ });
				}
			}
		}
			
	}
	/*
	 * Thomas Haymore
	 * 
	 */
	function AMT__Arthur_McKee_provosts_info(r) {
		
		// extend
		MT___all_pages_extend();
		// highlight email
		emails = MT___all_pages_highlightEmailAddresses(); // returns emails!
		// href
		MT___all_pages_showhref();
		// zoom
		MT___all_pages_zoom();
		
		//~ // send up emails by default!
		//~ if (emails.length > 0) {
			//~ parent.postMessage(
				//~ {
					//~ key: 'AMT__Thomas_Haymore_contact_info__complete',
					//~ data: emails
				//~ },
			//~ "*");
		//~ }
		
		//~ // onkeydown
		//~ document.body.addEventListener('keydown', function(e) {
			//~ var k = e.keyCode;
			//~ console.log(k);
			//~ // add text
			//~ if (k == 96) {
				//~ parent.postMessage(
					//~ {
						//~ key: 'AMT__Arthur_McKee_provosts_info__complete',
						//~ data: window.getSelection().toString().trim()
					//~ },
				//~ "*");
				//~ e.stopPropagation();
				//~ e.preventDefault();
				//~ return false;
			//~ }
		//~ }, false);
	}
	/*
	 * Nicholas Thorne
	 * 
	 */
	function AMT__Nicholas_Thorne_contact_info(r) {
		
		// extend
		MT___all_pages_extend();
		// highlight email
		MT___all_pages_highlightEmailAddresses();
		// href
		MT___all_pages_showhref();
		
		// global var for textarea
		//~ var txtarea;
		//~ txtarea = document.createElement('textarea');
		//~ txtarea.setAttribute('style', 'position:absolute;width:300px;height:200px;border:3px ridge white;visibility:hidden;');
		//~ document.body.appendChild(txtarea);
		//~ 
		//~ document.body.addEventListener('mousemove', function(e) {
			//~ if (txtarea.style.visibility == 'hidden') {
				//~ txtarea.style.top = Math.round(e.clientY + 20) + 'px';
				//~ txtarea.style.left = e.clientX + 'px';
			//~ }
		//~ }, false);
		
		// onkeydown
		document.body.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			console.log(k);
			// add text
			if (k == 96) {
				parent.postMessage({key: 'AMT__Nicholas_Thorne_contact_info__complete', data: window.getSelection().toString().trim(), field: 0}, "*");
				e.stopPropagation();
				e.preventDefault();
				return false;
				//~ txtarea.value += window.getSelection().toString().trim() + "\n";
				//~ txtarea.focus();
			}
			// field == 1
			if (k == 97) {
				parent.postMessage({key: 'AMT__Nicholas_Thorne_contact_info__complete', data: window.getSelection().toString().trim(), field: 1}, "*");
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			// complete
			if (k == 220) {
			}
		}, false);
	}
	/*
	 * CRE
	 * Xx, no qualification for this
	 */
	function AMT__CRE_company_contact_info(r) {
		
	}
	/*
	 * Jeff Meyer
	 * 
	 */
	function AMT__Jeff_Meyer_schoolDistricts(r) {
		
		//MT___all_pages_zoom();
		
		//~ // scroll into view the bottom of page
		//~ var x = document.body.getElementsByTagName('*');
		//~ x[x.length - 1].scrollIntoView();
		// extend
		MT___all_pages_extend();
		// href
		MT___all_pages_showhref();
		
		// onkeypress
		// onkeydown
		document.body.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			console.log(k);
			if ((k >= 96 && k <= 99) || k == 220) {
				var msg = {
					'key':k,
					'msg':window.getSelection().toString().trim()
				}
				parent.postMessage('AMT__Jeff_Meyer_schoolDistricts__complete'+JSON.stringify(msg), "*");
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		}, false);
		
		//MT___all_pages_highlightEmailAddresses();
		// enlarge "chem"?
		//~ var all = document.getElementsByTagName("*");
		//~ textMatches = [];
		//~ var tmpStr;
		//~ for (var i=all.length-1; i >= 0; i--) {
			//~ tmpStr = all[i].innerText;
			//~ for (var j in textMatches) {
				//~ tmpStr = tmpStr.replace(textMatches[j], '');
			//~ }
			//~ if (tmpStr.toLowerCase().indexOf('chemistry') != -1 && all[i]) {
				//~ console.log(all[i].innerText);
				//~ textMatches.push(all[i].innerText);
			//~ }
		//~ }
		//~ console.log(textMatches);
	}
	/*
	 * Jackie Shlecter
	 * 
	 */
	function AMT__Jackie_Shlecter_Chemistry(r) {
		MT___all_pages_extend();
		MT___all_pages_zoom();
		MT___all_pages_highlightEmailAddresses();
		// enlarge "chem"?
		//~ var all = document.getElementsByTagName("*");
		//~ textMatches = [];
		//~ var tmpStr;
		//~ for (var i=all.length-1; i >= 0; i--) {
			//~ tmpStr = all[i].innerText;
			//~ for (var j in textMatches) {
				//~ tmpStr = tmpStr.replace(textMatches[j], '');
			//~ }
			//~ if (tmpStr.toLowerCase().indexOf('chemistry') != -1 && all[i]) {
				//~ console.log(all[i].innerText);
				//~ textMatches.push(all[i].innerText);
			//~ }
		//~ }
		//~ console.log(textMatches);
	}
	/*
	 * Bryant Wolf
	 * 
	 */
	function AMT__Bryant_Wolf_Create_Yelp(r) {
		
		// done?
		//http://www.yelp.com/biz/johnnys-24-hour-plumbing-falmouth?fsid=JGA7tqku6vS3g0MW8QiYpw
		if (
			/http:\/\/www\.yelp\.com\/biz\/[^\?]+\?fsid=[^&]+$/.exec(document.location.href) &&
			ih.indexOf('This business has been successfully added. Please note that it will take 48 hours for a newly added business to appear in search.') != -1
		) {
			parent.postMessage('AMT__Bryant_Wolf_Create_Yelp__complete'+document.location.href, "*");
			return;
		}
		//
		if (!document.getElementById('name'))
			return;
		
		//
		r = r.replace(/^AMT__Bryant_Wolf_Create_Yelp/, '');
		r = JSON.parse(r);
		
		// fill in Yelp form
		r[3] = r[3].replace(/ (\d{4})$/, ' 0$1')
		
		document.getElementById('name').value = __js_clean_html_str(r[1]);
		document.getElementById('address1').value = __js_clean_html_str(r[2]);
		document.getElementById('location').value = __js_clean_html_str(r[3]);
		document.getElementById('phone').value = __js_clean_html_str(r[4]);
		
		function simulateClick(el) {
			var evt;
			if (document.createEvent) {
				evt = document.createEvent('MouseEvents');
				evt.initEvent(
				   'mousedown',      // event type
				   true,      // can bubble?
				   true      // cancelable?
				);
				el.dispatchEvent(evt);
				console.log('x');
			}else console.log('a');
		}
		
		// select
		var xint = setInterval(function() {
			var cat = document.getElementsByClassName('category-select');
			//~ if (cat.length == 2)
				//~ //clearInterval(xint);
			//~ else 
			if (cat.length == 1 && !first) {
				//first = true;
				cat[0].focus();
				cat[0].style.border = '3px solid LightGreen';
				//simulateClick(cat[0]);
				return;
			} else if (cat.length != 2)
				return;
			
			if (cat[0].value == 'J6MYH4HwtOjsUzftjFWVMQ') { // home services
				cat[1].focus();
				clearInterval(xint);
			}
		}, 200);
		
		//sbm btn
		document.getElementById('review-submit-button').style.position = 'absolute';
		document.getElementById('review-submit-button').style.marginLeft = '-100px';
		document.getElementById('review-submit-button').style.marginTop = '-300px';
		
		// onkeydown
		document.body.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			console.log(k);
			if (k == 220) {
				document.getElementById('review-submit-button').click();
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		}, false);
		
		//~ var xint = setInterval(function() {
			//~ var cat = document.getElementsByClassName('category-select')[0];
			//~ if (cat.options)
				//~ clearInterval(xint);
			//~ else
				//~ return;
			//~ 
			//~ for (var i in cat.options) {
				//~ if (cat.options[i].innerText == __js_clean_html_str(r[5])) {
					//~ //simulateClick(cat.options[i]);
					//~ cat.click();
					//~ cat.options[i].click();
					//~ cat.value = cat.options[i].value;
					//~ cat.click();
					//~ cat.focus();
					//~ cat.blur();
					//~ cat.value = cat.options[i].value;
					//~ simulateClick(cat);
					//~ cat.value = 0;
					//~ simulateClick(cat);
					//~ cat.value = cat.options[i].value;
					//~ simulateClick(document.getElementById('phone'));
					//~ simulateClick(document.getElementById('phone'));
					//~ simulateClick(document.getElementById('phone'));
					//~ break;
				//~ }
			//~ }
		//~ }, 3000);
		
		document.getElementById('includes-review').checked = false;
		document.getElementById('newly-opened-biz').checked = false;
		//~ setInterval(function() {
			//~ document.getElementById('includes-review').checked = false;
			//~ document.getElementById('newly-opened-biz').checked = false;
		//~ }, 400);
	}
	
	
	/*
	 * Newline Financial
	 * 
	 */
	// POLL COMPLETE
	function AMT__Newline_Financial_cookcountyclerk_com__auto_captcha_complete() {
		
	}
	// AUTO INIT
	function AMT__Newline_Financial_cookcountyclerk_com__auto_captcha_init(IMAGE_SRC, id) {
		//~ var CINTV;
		AMT__Newline_Financial_cookcountyclerk_com__setInterval_manual(IMAGE_SRC);
		
		var IMAGE_SRC = IMAGE_SRC;
		
		console.log(IMAGE_SRC);
		
		var id = id;
		GM_xmlhttpRequest({
			method: "GET",
			url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u_captcha_id='+encodeURIComponent(id)+'&u_captcha_src='+encodeURIComponent(IMAGE_SRC)+'&init',
			onload: function(response) {
				var rs = response.responseText;
				
				var CINTV = setInterval(function() {
					GM_xmlhttpRequest({
						method: "GET",
						url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u_captcha_id='+encodeURIComponent(id)+'&u_captcha_src='+encodeURIComponent(IMAGE_SRC)+'&complete',
						onload: function(response) {
							var rs=response.responseText;
							if (rs != '') {
								clearInterval(CINTV);
							}
							else return;
							
							rs = rs.replace(/ /g, ''); // SPACES!
							rs = rs.trim();
							
							console.log(rs);
							
							// TRY TO FILL IN THIS VALUE
							// RETURNS ' '.ocr!!
							if (rs.length == 5) {
								var y, z; // stage 1
								z = document.getElementsByClassName('delinquentForm');
								if (z) {
									if (z[0]) {
										z = z[0];
										z = z.getElementsByTagName('td');
										if (z) {
											y = z[1].getElementsByTagName('input')[0];
											
											if (y.value == '') {// ISBLANK
												y.value = rs;
												
												//
												var SUBMIT_BTN = z[2].getElementsByTagName('input')[0];
												SUBMIT_BTN.click();
											}
										}
									}
								}
								console.log('x');
								return;
							}
							
							// still here?
							// Mark this as ocr complete
							var z = document.getElementsByClassName('delinquentForm')[0];
							z.style.backgroundColor = 'LightGreen';
							
							// ELSE do manual!
							//AMT__Newline_Financial_cookcountyclerk_com__setInterval_manual(IMAGE_SRC);
						}
					});
				}, 400);
			}
		});
		return;
	}
	// SET INTV
	function AMT__Newline_Financial_cookcountyclerk_com__setInterval_manual(IMAGE_SRC) {
		var IMAGE_SRC = IMAGE_SRC;
		var form = document.getElementsByClassName('delinquentForm');
		var y, z; // stage 1
		z = document.getElementsByClassName('delinquentForm');
		if (z) {
			if (z[0]) {
				z = z[0];
				z = z.getElementsByTagName('td');
				if (z) {
					y = z[1].getElementsByTagName('input')[0];
					
					var CAPTCHA_VAL;
					
					y.addEventListener('keyup', function() {
						//~ clearInterval(CINTV);// GLOBAL SETINT
						
						if (this.value.length == 5) {
							
							var CAPTCHA_VAL = this.value;
							
							chrome.extension.sendRequest({
									nextTab: true
								},
								function(response)
								{
								}
							);

							//
							// SAVE THE IMAGE FILE + THE CURRENT CAPTCHA HERE!
							//
							var rf = new AMT___requests_factory();
							rf.io__write_to_file(
								{
									data:	'AMT__serverSide_write__value='		+ encodeURIComponent(CAPTCHA_VAL + '|' + IMAGE_SRC) +
											'&AMT__serverSide_write__folder=.cached'+
											'&AMT__serverSide_write__file='		+ encodeURIComponent('NEWLINE_FINANCIAL_'+CAPTCHA_VAL)//,
									//rs:		rs // for callback !!
								},
								function() {
									var SUBMIT_BTN = form[0].getElementsByTagName('input')[6];
									SUBMIT_BTN.click()
								}
							);
						}
					}, false);
				}
			}
		}
		
	}
	// FROM PARENT FRAME!
	function AMT__Newline_Financial_cookcountyclerk_com() {
		var x = document.location;
		
		//
		// t==0
		// on second run
		// replace this !!: <form name="aspnetForm" method="post" action="DelinquentTaxSearch.aspx?u=xxx"
		
		var r, id;
		r = /http:\/\/www\.cookcountyclerk\.com\/tsd\/delinquenttaxsearch\/Pages\/DelinquentTaxSearch\.aspx\/\?u=([^&]+)&t=([\d])/.exec(x);
		//~ r = /http:\/\/www\.cookcountyclerk\.com\/tsd\/delinquenttaxsearch\/Pages\/DelinquentTaxSearch\.aspx\/\?u=([\d\D]+)/.exec(x);
		if (r) {
			
			var id = r[1]; // ORIGINAL
			var action = r[2]; // NUM TRIES!
			
			document.getElementsByTagName('form')[0].action = document.getElementsByTagName('form')[0].action.replace(/&t=0/, '&t=1');
			
			var x = id;
			
			x = x.replace(/-/g, '');
			x = [
				x.substr(0,2),
				x.substr(2,2),
				x.substr(4,3),
				x.substr(7,3),
				x.substr(10,4)
			];
			
			//r = x;
			
			// image
			var th = document.getElementsByTagName('th');
			for (var i in th) {
				if (i == 'length') break;
				if (th[i].innerText == '*Verify Image') {
					//~ console.log(th[i])
					th[i].innerText = '';
					
					var tr = th[i].parentNode;
					
					tr.removeChild(th[i]);
					
					tr.style.position	= 'absolute';
					tr.style.top		= '0';
					tr.style.left		= '0';
					tr.style.zIndex		= '10000000';
					tr.style.backgroundColor = '#fff';
					
					break;
				}
			}
			// image
			var im = document.getElementsByTagName('img');
			for (var i in im) {
				if (i == 'length') break;
				if (im[i].src.indexOf('CaptchaImage.axd') != -1) {
					//~ im[i].style.position= 'absolute';
					//~ im[i].style.top		= '0';
					//~ im[i].style.left	= '0';
					var IMAGE_SRC = im[i].src;
					console.log(IMAGE_SRC);
				}
			}
			
			var y, z; // stage 1
			z = document.getElementsByClassName('delinquentForm');
			if (z) {
				if (z[0]) {
					z = z[0];
					z = z.getElementsByTagName('td');
					if (z) {
						y = z[0];
						y = y.getElementsByTagName('input');
						
						for (var i = 0; i < x.length; i++) { //
							y[i].value = x[i]; //
						} //
						
						y = z[1].getElementsByTagName('input')[0];
						y.focus();
						
						
						// IF TRY == 0
						
						// ELSE IF TRY == 1
						
						if (action == '0')
						{ // SET TIMEOUT
							setTimeout(function() {
								AMT__Newline_Financial_cookcountyclerk_com__auto_captcha_init(IMAGE_SRC, id);
							}, 1200);
						}
						else
						{
							AMT__Newline_Financial_cookcountyclerk_com__setInterval_manual(IMAGE_SRC);
						}
						
						
						// move boxes around!!
						var x = document.getElementById('newsComponentZone1');
						x.style.position = 'absolute';
						x.style.top = '0';
						x.style.left = '0';
						x.style.backgroundColor = '#fff';
					}
				}
			}
			
			// save
			var saveStr = false;
			if (/No Sold or Delinquent Taxes for this PIN as of \d+\/\d+\/\d+/.exec(ih))
			{
				saveStr = 'No Sold or Delinquent Taxes for this PIN';
			}
			else if (
				ih.indexOf('This is an invalid PIN for tax year 2010 or prior. Please check your property tax bill or your property deed to verify your PIN.') != -1
			)
			{
				saveStr = 'This is an invalid PIN for year 2010 or Prior';
			}
			if (saveStr) {
				GM_xmlhttpRequest({
					method: "GET",
					url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u='+encodeURIComponent(id)+'&v='+encodeURIComponent(saveStr),
					onload: function(response) {
						//var rs=response.responseText;
					}
				});
				return;
			}
			
			//~ else if (
				//~ ih.indexOf('This is an invalid PIN for tax year 2010 or prior. Please check your property tax bill or your property deed to verify your PIN.') != -1
				//~ )
			//~ {
				//~ // save
				//~ GM_xmlhttpRequest({
					//~ method: "GET",
					//~ url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u='+encodeURIComponent(id)+'&v='+encodeURIComponent('This is an invalid PIN for year 2010 or Prior'),
					//~ onload: function(response) {
						//~ var rs=response.responseText;
						//~ 
					//~ }
				//~ });
				//~ return;
			//~ }
			
			var arr = [];
			var r2;

			// sold
			r = /<fieldset>[\r\n\t\s]+<h2>Sold Taxes<\/h2>((.|\s)*?(?=<\/fieldset>|$)|$)/.exec(ih);
			if (r) {
				
				r = r[1];
				
				r2= /<td class="row\d+" style="text-align:left;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]+<td class="row\d+" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]+<td class="row\d+ popup" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]+<td class="row\d+ statusdocumentnumber" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]+<td class="row\d+" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]+<td class="row\d+" style="[^"]+" {0,}>([^<]{0,})/g; // no last td
				
				if (r2.exec(r)) {
					r2.lastIndex = 0;
					var m;
					while (m = r2.exec(r)) {
						for (var i = 1; i < m.length; i++) {
							m[i] = m[i].trim();
						}
						//m = m.slice(1); //remove 0
						m[0] = 'sold';
						arr.push(m);
					}
				}
			}
			
			/*
			  <td class="row2" style="text-align:center;">2007</td>
							 <td class="row2 popup" style="text-align:center;">
								Open
							</td>
							<td class="row2" style="text-align:center;"></td>
							<td class="row2" style="text-align:center;">
							</td><td class="row2" style="text-align:center;">$1,021.02
							</td><td class="row2 backtax" style="text-align:center;">
							</td><td class="row2 warrantyear" style="text-align:center;">
			 */
			 
			// delinquent
			r = /<fieldset>[\r\n\t\s]+<h2>Delinquent Taxes<\/h2>((.|\s)*?(?=<\/fieldset>|$)|$)/.exec(ih);
			if (r) {
				
				r = r[1];
				
				r2 = /<td class="row\d+" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]{0,}<td class="row\d+ popup" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]{0,}<td class="row\d+" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]{0,}<td class="row\d+" style="text-align:center;" {0,}>([^<]{0,})<\/td>[\r\n\t\s]{0,}<td class="row\d+" style="[^"]+" {0,}>([^<]{0,})<\/td>/g;
				
				if (r2.exec(r)) {
					r2.lastIndex = 0;
					var m;
					while (m = r2.exec(r)) {
						console.log(m);
						for (var i = 1; i < m.length; i++) {
							m[i] = m[i].trim();
						}
						//m = m.slice(1); //remove 0
						m[0] = 'delinquent';
						arr.push(m);
					}
				}
			}
			
			if (arr.length) {
				// save
				GM_xmlhttpRequest({
					method: "GET",
					url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u='+encodeURIComponent(id)+'&v='+encodeURIComponent(JSON.stringify(arr)),
					onload: function(response) {
						//var rs=response.responseText;						
					}
				});
			}
		}
		
		// Scroll into view
		setTimeout(function() { JordanAGross__scrollIntoView(); }, 400);
		setTimeout(function() { JordanAGross__scrollIntoView(); }, 800);
		setTimeout(function() { JordanAGross__scrollIntoView(); }, 1000);
		function JordanAGross__scrollIntoView() {
			var x = document.getElementById('WebPartWPQ1');
			var y = document.getElementById('printDoc');
			if (x && y) {
				x.scrollIntoView();
				y.scrollIntoView();
			}
		}
	}
	
	/**
	 * new AMT__rq().AMT__Michael_Lai_ib_tok
	 * 
	 * This is inside of a utility window. The passed in object is:
		{
			task:'AMT__Michael_Lai_ib_tok',
		}
	 * 
	 * @param	
	 * @returns	
	 */
	AMT__rq.prototype.AMT__Michael_Lai_ib_tok = function(data) {
		
	}
	/**
	 * new AMT__rq().AMT__Kristin_Howe_agent_photos2__utility_window
	 * 
	 * ScrollIntoView
	 * Highlight names on page (highlight_strings_in_page)
	 * Activate Images
	 * 
	 * This is inside of a utility window. The passed in object is:
		{
			task:'AMT__Kristin_Howe_agent_photos2__utility_window',
			agent_name: o.name,
			agent_name_clean: o.name_clean
		}
	 * 
	 * @param	
	 * @returns	
	 */
	AMT__rq.prototype.AMT__Kristin_Howe_agent_photos2__utility_window = function(data) {
		console.log(data);
		
		// init
		activate_images();
		
		// Highlight Strings
		var gf = new AMT___global_factory();
		gf.highlight_strings_in_page({
			strings: [
				data.agent_name,
				data.agent_name_clean
			]
		});
		
		// Scroll into view
		setTimeout(function() { // timeout
			var allElements = document.getElementsByTagName("*");
			var match_el;
			var found = false;
			var tmp_ag1 = data.agent_name.toLowerCase().replace(/[^\w]/g, ''), tmp_ag2 = data.agent_name_clean.toLowerCase().replace(/[^\w]/g, '');
			for(i = allElements.length -1; i > -1; i--)
			{
				if(!allElements[i]) continue;
				if(!allElements[i].innerText) continue;
				//~ if (allElements[i].id == 'manual__agent_name' || allElements[i].innerHTML.indexOf('manual__agent_name') != -1) continue;
				
				match_el = allElements[i].innerText.toLowerCase().replace(/[^\w]/g, '');
				
				if (match_el.indexOf(tmp_ag1) != -1 || match_el.indexOf(tmp_ag2) != -1)
				{
					//~ console.log(allElements[i]);
					allElements[i].scrollIntoView(true); // true for top, false for bottom
					found = true;
					break;
				}
			}
		}, 4000);
		
		// add_image
		function add_image(page_img, pos_left) {
			//create an image
			//getBounding
			var b = page_img.getBoundingClientRect();
			var left = b.left *1;
			//left -= 60;
			left += pos_left;
			var top = b.top *1;
			top += document.body.scrollTop*1;
			
			var d = document.createElement('div');
			d.setAttribute(
				'style',
				'position:absolute;top:'+top+'px;left:'+left+'px;z-index:1000000000000000000;opacity:0.7;background-color:white;'
			);
			d.setAttribute('class', 'manual__exe_div_162435168649');
			var d_= document.createElement('img');
			d_.setAttribute('class', 'manual__exe_image_162435168649');
			d_.setAttribute(
				'style',
				'max-width:60px;max-height:60px;z-index:1000000000000000000;border:8px dashed green;' //bgc
			);
			d_.src = page_img.src;
			d.appendChild(d_);
			document.body.appendChild(d);
			
			//~ console.log('pos_left:'+pos_left+' left:'+left);
			//~ console.log(d_);
		}
		
		// activate_images
		// activate images function
		function activate_images() {
			// Iterate through all images and add an image "button."
			// Background color is set from domain.
			// (getBoundingClientRect())
			// Remove all images from any previous runs.
			
			// remove old
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			var i;
			for (i=a.length - 1; i >= 0; i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			var a = document.getElementsByClassName('manual__exe_div_162435168649');
			for (i=a.length - 1; i >= 0; i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			
			
			// new
			//var bgc = (IMAGES_ARE_FZ == 1) ? 'Green' : '#aeaeae';
			var a = document.getElementsByTagName('img');
			for (var i in a) {
				if (i == 'length') break;
				if (!a[i].src || a[i].src == '') continue;
				add_image(a[i], 200);
				//KristinHowe_agent_photo_images__add_image(a[i], 20);
				add_image(a[i], -200);
			}
			
			// Send to parent/job window
			// Write value to db
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			for (var i in a) {
				a[i].onclick = function() {
					this.style.border = '4px solid LightGreen';
					
					chrome.runtime.sendMessage(
						'gcfnekbbpmbgadddbojhlojhddnkcpje',
						{
							util_window_message_passing: true,
							data: {
								src: this.src
							}
						},
						function(response) {
							// response=object
						}
					);
					
					//~ parent.postMessage(
						//~ {
							//~ key: 'AMT__Kristin_Howe_agent_photos__yahoo_bot__complete',
							//~ data: this.src
						//~ },
					//~ "*");
				}
			}
		}
		
	}
	/**
	 * new AMT__rq().AMT__chios_system_draw_polygon__utility_window
	 * 
	 * This is inside of a utility window. The passed in object is:
		{
			task:'AMT__chios_system_draw_polygon__utility_window',
			images: img_urls, // []
			task__address: o.addr,
			task__ll: {lat:lat, lng: lng},
			task__name: o.name
		}
	 * 
	 * @param	
	 * @returns	
	 */
	AMT__rq.prototype.AMT__chios_system_draw_polygon__utility_window = function(data) {
		
		document.body.innerHTML = '';
		
		// Iframes
		var withNameSearch = 'https://maps.google.com/maps?hl=en&q='+encodeURIComponent(data.task__name)+'&ll='+data.task__ll.lat+','+data.task__ll.lng+'&output=embed&t=h&z=16'; //&iwloc=A
		var withoutNameSearch = 'https://maps.google.com/maps?hl=en&geocode=&q='+encodeURIComponent(data.task__name+ ' ' +data.task__address)+'&output=embed&t=h&z=17' + '####ChiosSpecial###'; //&iwloc=A
		
		
		
		
		var d2 = document.createElement('iframe');
		d2.setAttribute('style',
			'float:left;width:50%;height:400px;border:1px solid blue;background-color:#eee;visibility:visible;'
		);
		document.body.appendChild(d2);
		d2.src = withNameSearch;
		//
		var d2b = document.createElement('iframe');
		d2b.setAttribute('style',
			'float:left;width:49%;height:400px;border:1px solid blue;background-color:#eee;visibility:visible;'
		);
		document.body.appendChild(d2b);
		d2b.src = withoutNameSearch;
		// br
		var br = document.createElement('br');
		br.setAttribute('style', 'clear:both;');
		document.body.appendChild(br);
		
		// Images
		var img_el_array = [];
		
		for (i in data.images) {
			
			var img = document.createElement('img');
			img.setAttribute('style','cursor:pointer;display:block;zoom:0.2;float:left;');
			img.src = data.images[i];
			document.body.appendChild(img);
			
			img_el_array.push(img);
			
		}
		// Add mouse zoom
		new AMT___events_factory().mousewheel_zoom_image({
			img_array: img_el_array,
			add_onclick_reset: 0.4
		});
	}
	
	/**
	 * new AMT__rq().rq__AMT__traveldata_scrape_travelocity_com(event.data);
	 */
	AMT__rq.prototype.rq__AMT__traveldata_scrape_travelocity_com = function(data) {
		
		// global
		// @param data.code
		var data = data;
		
		var l = document.location.href;
		console.log(l);
		
		
		if (l.indexOf('?chkin=') != -1) {
			lowest();
			return;
		}
		else if (l.indexOf('https://www.travelocity.com/HotelCheckout?tripid=') != -1) {
			
			var o = {
				p_1: null,
				p_2: null,
				p_3: null,
				p_4: null
			}
			
			var intv;
			
			prices_1(true);
			
			// RESULT ???
			intv = setInterval(function() {
				console.log(o);
				prices_1(false);
			}, 100);
			
			
			return;
		}
		//ERR		//http://www.hotels.com/search/search.html?cd=08-19-14&dd=08-21-14&hid=116961&ihu=true&numberOfRooms=1&pn=1&rl=CITY%3A1633911%3APROVIDED%3APROVIDED&roomInfoList[0].numberOfAdults=1&vt=LIST
		else if (l.indexOf('http://www.hotels.com/search/search.html') != -1) {
			
			var x = document.getElementsByClassName('noticeTextType1');
			if (x && x.length && x[0] != undefined && x[0].innerText.indexOf('is not available on Hotels.com for your travel dates.') != -1) {
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', notes: x[0].innerText.trim()}, "*");
			} else if (ih.indexOf(' has no availability for your travel dates on Hotels.com') != -1) {
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', notes: 'No availability for your travel dates on Hotels.com'}, "*");
			}
		}
		
		//~ function prices_2() {
			//~ 
			//~ var x = document.getElementsByClassName('coupon_summary');
			//~ if  (
				//~ x.length &&
				//~ x.innerText.trim() != ''
				//~ )
			//~ {
				//~ 
			//~ }
			//~ 
		//~ }
		function prices_1(is_first) {
			
			var pr = document.getElementsByClassName('amount-value');
			
			if (is_first) {
				if (pr[0].innerText == '-$0.00')
					pr = pr[1];
				else
					pr = pr[0];
				
			} else {
				if (pr.length != 3)
					return;
				// Here?
				pr = pr[2];
			}
			console.log(pr);
			
			if (!pr) {
				document.body.style.backgroundColor = 'pink';
				exit('err1');
			}
			pr = pr.innerText.trim();
			if (!/^\$[\d\.,]+$/.exec(pr)) {
				document.body.style.backgroundColor = 'pink';
				console.log(pr);
				exit('err2');
			}
			if (is_first)
				o.p_1 = pr;
			else
				o.p_3 = pr;
			
			var pr = document.getElementsByClassName('room-total')[0];
			if (!pr) {
				if (document.body.innerHTML.indexOf('avg./night') == -1) {
					pr = 'N/A'; // N/A or BLANK
					//~ o.p_2 = '';
					//~ o.p_4 = '';
				} else {
					exit('err3');
				}
			}
			else {
				pr = pr.innerText.trim();
				if (!/^\$[\d\.,]+$/.exec(pr)) {
					document.body.style.backgroundColor = 'pink';
					exit('err4');
				}
			}
			if (is_first)
				o.p_2 = pr;
			else
				o.p_4 = pr;
			
			// click next
			if (is_first) {
				var clickToShow = document.getElementById('coupon-code');
				if (!clickToShow) {
					err('clickToShow');
				} else
					clickToShow.click();
				
				var pr = document.getElementsByClassName('text cko-coupon-field')[0];
				
				var error__hmmm = ih.indexOf('Sorry, but you cannot redeem coupons or Welcome Rewards™ nights for this booking');
				
				if (!pr || error__hmmm != -1) {
					
					// err or ...
					if (ih.indexOf('Sorry, but you cannot redeem coupons or Welcome Rewards™ nights for this booking') != -1) {
						// complete
						clearInterval(intv);
						console.log(o);
						parent.postMessage({
							key: 'AMT__traveldata_scrape_hotels_com__complete',
							data: o,
							error: 'Sorry, but you cannot redeem coupons or Welcome Rewards™ nights for this booking'
						}, "*");
						return;
					} else {
						document.body.style.backgroundColor = 'pink';
						exit('err5');
					}
				}
				pr.value = data.code;
				//~ pr.focus();
				
				var pr = document.getElementsByTagName('button');
				for (var i in pr) {
					if (i == 'length') break;
					
					if (pr[i].innerHTML.trim() == '<span class="btn-label"> Apply Coupon </span>') {
						pr = pr[i];
						break;
					}
				}
				if (!pr) {
					document.body.style.backgroundColor = 'pink';
					exit('err6');
				}
				console.log(pr);
				
				pr.disabled = false;
				pr.click();
				
				return;
			}
			
			// Here?
			// !is_first
			if  (
				o.p_1 != o.p_3 &&
					(
						//~ o.p_2 != o.p_4 || // ?
						o.p_2 == o.p_4 || // Avg. per night is not UPDATED here?
						o.p_2 == 'N/A' && o.p_4 == 'N/A'
					) &&
				document.body.innerHTML.indexOf('Please provide a valid coupon code.') == -1
				// &&
				//document.getElementsByClassName('message error_message')[0].innerText.trim() == ''
				)
			{
				clearInterval(intv);
				console.log(o);
				
				// complete
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', data: o}, "*");
			}
			// Error?
			else if
			(
				document.getElementsByClassName('message error_message') &&
				document.getElementsByClassName('message error_message')[0] && 
				document.getElementsByClassName('message error_message')[0].innerText.trim() != ''
			)
			{
				
				clearInterval(intv);
				console.log(o);
				
				var er = document.getElementsByClassName('message error_message')[0].innerText.trim();
				
				//~ parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', error: er}, "*");
				
				parent.postMessage({
					key: 'AMT__traveldata_scrape_hotels_com__complete',
					data: o,
					error: er
				}, "*");
			}
			
			
		}
		function lowest() {
			
			var r = document.getElementsByClassName('room-price');
			var l = 999999;
			var button = null;
			
			for (var i in r) {
				if (i == 'length') break;
				
				var p = r[i].innerText.trim();
				if (!/^\$[\d,\.]+$/.exec(p)) {
					document.body.style.backgroundColor = 'pink';
					exit('errC');
				}
				
				p = p.replace('$', '') * 1;
				if (p < l) {
					l = p;
					button = r[i].parentNode.parentNode.getElementsByTagName('button');
					
					//~ button = r[i].getElementsByTagName('form');
					
					//~ if (button.length == 1) {
						//~ 
						//~ button[0].click();
						
						// PAY NOW?
						//~ var forms = r[i].getElementsByTagName('form');
						//~ console.log(forms);
						//~ if (forms[1].name.indexOf('payNow') != -1) {
							//~ forms[1].submit();
							//~ return;
						//~ } else {
							//~ 
						//~ }
						
					//~ }
					if (button.length == 1) {
						button = button[0];
					} else {
						err('Btn');
					}
				}
			}
			//~ console.log(l);
			//~ console.log(button);
			
			if (button != null) {
				button.click();
			}
			
			// Pay now button
			var intCount = 0;
			var interval = setInterval(function() {
				var n = document.getElementById('deposit-pay-now-button');
				if (n) {
					//~ console.log(n);
					clearInterval(interval);
					n.click()
				}
				intCount++;
				if (intCount>=40)// 8s
					clearInterval(interval);
			}, 200);
		}
	}
	
	/**
	 * new AMT__rq().rq__AMT__traveldata_scrape_hotels_com(event.data);
	 */
	AMT__rq.prototype.rq__AMT__traveldata_scrape_hotels_com = function(data) {
		
		// global
		// @param data.code
		var data = data;
		
		var l = document.location.href;
		console.log(l);
		
		
		// NON UK
		//~ if (l.indexOf('http://www.hotels.com/hotel/details.html') != -1) {
		
		
		if (l.indexOf('hotels.com/hotel/details.html') != -1) {
			lowest();
			return;
		}
		else if (l.indexOf('hotels.com/bookingInitialise.do') != -1) {
		
		// NON UK
		//else if (l.indexOf('https://ssl.hotels.com/bookingInitialise.do') != -1) {
			
			var o = {
				p_1: null,
				p_2: null,
				p_3: null,
				p_4: null
			}
			
			var intv;
			
			prices_1(true);
			
			// RESULT ???
			intv = setInterval(function() {
				prices_1(false);
			}, 100);
			
			
			return;
		}
		//ERR		//http://www.hotels.com/search/search.html?cd=08-19-14&dd=08-21-14&hid=116961&ihu=true&numberOfRooms=1&pn=1&rl=CITY%3A1633911%3APROVIDED%3APROVIDED&roomInfoList[0].numberOfAdults=1&vt=LIST
		else if (l.indexOf('hotels.com/search/search.html') != -1) {
		
		// NON UK
		//~ else if (l.indexOf('http://www.hotels.com/search/search.html') != -1) {
			
			var x = document.getElementsByClassName('noticeTextType1');
			if (x && x.length && x[0] != undefined && x[0].innerText.indexOf('is not available on Hotels.com for your travel dates.') != -1) {
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', notes: x[0].innerText.trim()}, "*");
			} else if (ih.indexOf(' has no availability for your travel dates on Hotels.com') != -1) {
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', notes: 'No availability for your travel dates on Hotels.com'}, "*");
			}
		}
		
		//~ function prices_2() {
			//~ 
			//~ var x = document.getElementsByClassName('coupon_summary');
			//~ if  (
				//~ x.length &&
				//~ x.innerText.trim() != ''
				//~ )
			//~ {
				//~ 
			//~ }
			//~ 
		//~ }
		function prices_1(is_first) {
			
			var pr = document.getElementById('totalGrossPrice');
			if (!pr) {
				document.body.style.backgroundColor = 'pink';
				exit('err1');
			}
			pr = pr.innerText.trim();
			console.log(pr);
			if (!/^\$[\d\.,]+$/.exec(pr)) {
				document.body.style.backgroundColor = 'pink';
				exit('err2');
			}
			if (is_first)
				o.p_1 = pr;
			else
				o.p_3 = pr;
			
			var pr = document.getElementById('averageNightlyPrice');
			if (!pr) {
				//~ document.body.style.backgroundColor = 'pink';
				if (document.body.innerHTML.indexOf('Average nightly rate') == -1) {
					pr = 'N/A'; // N/A or BLANK
					//~ o.p_2 = '';
					//~ o.p_4 = '';
				} else {
					exit('err3');
				}
			}
			else {
				pr = pr.innerText.trim();
				if (!/^\$[\d\.,]+$/.exec(pr)) {
					document.body.style.backgroundColor = 'pink';
					exit('err4');
				}
			}
			if (is_first)
				o.p_2 = pr;
			else
				o.p_4 = pr;
			
			// click next
			if (is_first) {
				var pr = document.getElementById('text_discountcode');
				var error__hmmm = ih.indexOf('Sorry, but you cannot redeem coupons or Welcome Rewards™ nights for this booking.');
				var error__2 = ih.indexOf('Sorry, you can’t redeem coupons, Welcome Rewards™ nights, or pay with a gift card for this booking.');
				if (!pr || error__hmmm != -1 || error__2 != -1) {
					
					// err
					if (error__hmmm != -1) {
						// complete
						clearInterval(intv);
						console.log(o);
						parent.postMessage({
							key: 'AMT__traveldata_scrape_hotels_com__complete',
							data: o,
							error: 'Sorry, but you cannot redeem coupons or Welcome Rewards™ nights for this booking.'
						}, "*");
						return;
					// err
					} else if (error__2 != -1) {
						// complete
						clearInterval(intv);
						console.log(o);
						parent.postMessage({
							key: 'AMT__traveldata_scrape_hotels_com__complete',
							data: o,
							error: 'Sorry, you can’t redeem coupons, Welcome Rewards™ nights, or pay with a gift card for this booking.'
						}, "*");
						return;
					} else {
						document.body.style.backgroundColor = 'pink';
						exit('err5');
					}
				}
				pr.value = data.code;
				pr.focus();
				
				var pr = document.getElementById('btn_applyDiscount');
				if (!pr) {
					document.body.style.backgroundColor = 'pink';
					exit('err6');
				}
				console.log(pr);
				pr.disabled = false;
				pr.click();
				return;
			}
			
			// Here?
			// !is_first
			if  (
				o.p_1 != o.p_3 &&
					(
						o.p_2 != o.p_4 ||
						o.p_2 == 'N/A' && o.p_4 == 'N/A'
					) &&
				document.getElementsByClassName('message error_message')[0].innerText.trim() == ''
				)
			{
				clearInterval(intv);
				console.log(o);
				
				// complete
				parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', data: o}, "*");
			}
			// Error?
			else if (
				document.getElementsByClassName('message error_message') &&
				document.getElementsByClassName('message error_message')[0] && 
				document.getElementsByClassName('message error_message')[0].innerText.trim() != ''
			) {
				
				clearInterval(intv);
				console.log(o);
				
				var er = document.getElementsByClassName('message error_message')[0].innerText.trim();
				
				//~ parent.postMessage({key: 'AMT__traveldata_scrape_hotels_com__complete', error: er}, "*");
				
				parent.postMessage({
					key: 'AMT__traveldata_scrape_hotels_com__complete',
					data: o,
					error: er
				}, "*");
			}
			
			
		}
		function lowest() {
			
			var r = document.getElementsByClassName('room');
			var l = 999999;
			var button = null;
			
			for (var i in r) {
				if (i == 'length') break;
				var pr = r[i].getElementsByClassName('current-price');
				if (!pr.length) {
					document.body.style.backgroundColor = 'pink';
					exit('errA');
				}
				pr = pr[0].getElementsByTagName('strong');
				if (!pr.length) {
					document.body.style.backgroundColor = 'pink';
					exit('errB');
				}
				pr = pr[0].innerText;
				if (!/^\$[\d,]+$/.exec(pr)) {
					document.body.style.backgroundColor = 'pink';
					exit('errC');
				}
				pr = pr.replace('$', '') * 1;
				if (pr < l) {
					l = pr;
					button = r[i].getElementsByTagName('button');
					
					//~ button = r[i].getElementsByTagName('form');
					
					if (button.length != 1) {
						
						button[0].click();
						
						//~ document.body.style.backgroundColor = 'pink';
						//~ exit('errD');
						
						// PAY NOW?
						var forms = r[i].getElementsByTagName('form');
						console.log(forms);
						if (forms[1].name.indexOf('payNow') != -1) {
							forms[1].submit();
							return;
						} else {
							
						}
						//~ if (forms.length != 3) {
							//~ console.log(forms);
							//~ document.body.style.backgroundColor = 'pink';
							//~ exit('errD');
						//~ } else {
							//~ forms[1].submit();
							//~ return;
						//~ }
					}
					button = button[0];
				}
			}
			console.log(l);
			console.log(button);
			
			if (button != null) {
				button.click();
			}
				
		}
	}
	
	/**
	 * 
	 */
	AMT__rq.prototype.rq__Gary_Gebenlian_give_addr = function(data) {
		//alert('got here');
		//~ var scr = document.createElement('script');
		//~ document.body.appendChild(scr);
		//~ scr.innerHTML = 'alert("here 2!");showAddress("'+data.addr+'", 20);';
		document.getElementsByTagName('input')[0].value = data.addr;
		document.getElementsByTagName('input')[1].click();
	}
	
	/**
	 * Alex Jackson
	 * rq__Alex_Jackson__all_pages__Dubai_brokers
	 */
	AMT__rq.prototype.rq__Alex_Jackson__all_pages__Dubai_brokers = function() {
		
		var o = {
			page: 1,
			//~ row: strong[2].innerText.replace(/^Broker Row Number: /g, '')
			last: ''
		}
		
		//debug
		o.page = 1 ;
		
		
		getPage();
		
		//~ // write
		//~ var rf = new AMT___requests_factory();
		//~ rf.io__write_to_file(
			//~ {
				//~ data:	'AMT__serverSide_write__value='+encodeURIComponent(response.responseText)+
						//~ '&AMT__serverSide_write__folder=.cached'+
						//~ '&AMT__serverSide_write__file=Alex_Jackson_' + '1',
				//~ host:	MT___host
			//~ },
			//~ function() {
				//~ 
				//~ // incr.
				//~ o.page++;
				//~ 
				//~ 
			//~ }
		//~ );
		
		
		/**
		 * 
		 * 
		 **/
		function getPage() {
			
			var x = document.getElementById('ContentPlaceHolder1_upRealEstate');
			
			var r = /<td align="center" style="[^"]+">(\d+)<\/td><td style="[^"]+">([^<]+)<\/td><td align="[^"]+" style="[^"]+">([^<]+)<\/td><td align="[^"]+" style="[^"]+">([^<]+)<\/td><td align="[^"]+" style="[^"]+">[\r\n\t\s]*<a id="[^"]+" href="([^"]+)">Details<\/a>/g;
			var num = x.innerHTML.match(r).length;
			
			//~ if (o.page == 141) return;
			
			// Loading?
			if  (
				x.innerHTML.indexOf('<span>'+o.page+'</span>') == -1 ||
				x.innerHTML == o.last ||
				num != 15
				)
			{ // Loading?
				setTimeout(function() {
					getPage();
				}, 60);
				return;
			}
			
			// UPDATE
			o.last = x.innerHTML;
			
			// write
			var rf = new AMT___requests_factory();
			rf.io__write_to_file(
				{
					data:	'AMT__serverSide_write__value='+encodeURIComponent(x.innerHTML)+
							'&AMT__serverSide_write__folder=.cached'+
							'&AMT__serverSide_write__file=Alex_Jackson_' + o.page,
					host:	MT___host
				},
				function() {
					
					// incr.
					o.page++;
					
					console.log('Trying to click '+o.page);
					var x = document.getElementById('ContentPlaceHolder1_upRealEstate').getElementsByTagName('a');
					
					for (var i in x) {
						if (i == 'length') break;
						if (x[i].href.indexOf("'Page$"+o.page+"'") != -1) {
							x[i].click();
							
							// Go back to func.
							getPage();
							break;
						}
					}
				}
			);
			
			
		}
	}
	if (loc == 'http://www.dubailand.gov.ae/english/Real_Estate_Licenses/EngBrokersList.aspx' && 0 == 1) {
		new AMT__rq().rq__Alex_Jackson__all_pages__Dubai_brokers();
	}
	/**
	 * OCMP
	 * 
	 */
	AMT__rq.prototype.rq__OCMP = function() {
		
		console.log('rq__OCMP');
		
		var r = document.querySelectorAll('input[type="radio"]');
		var radios = [];
		var d = document.getElementsByClassName('gs-snippet');
		var divs = [];
		var lis  = document.getElementsByClassName('ui-slider-tabs-list')[0].getElementsByTagName('li');
		var num_na = 0;
		
		function getDivs() {
			divs = [];
			for (var i in d) {
				if (i == 'length') break;
				if (d[i].innerText.trim() == '')
					continue;
				//~ if  (
					//~ d[i].hasOwnProperty('data-body') ||
					//~ d[i].hasOwnProperty('data-attr')
					//~ )
				//~ {
					//~ continue;
				//~ }
				divs.push(d[i]);
			}
		}
		getDivs();
		
		//~ divs.shift(); // Remove first element. Div is unrelated.
		//~ console.log(divs);
		//~ console.log(divs.length);return;
		
		// If there are not 8 divs on the page
		// then restart. Wait 0.1s before
		// restarting.
		if (divs.length < 6) 
		{
			setTimeout(function() {
				new AMT__rq().rq__OCMP();
			}, 100);
			return;
		}
		//~ else if (lis.length != 8)
		//~ {
			//~ setTimeout(function() {
				//~ new AMT__rq().rq__OCMP();
			//~ }, 100);
			//~ return;
		//~ }
		
		// ...
		for (var i in r) {
			if (i == 'length') break;
			//~ console.log(r[i].name);
			//~ console.log(r[i].value);
			if (r[i].value == 'on' && r[i].name == '') {
				radios.push(r[i]);
			} else {
				// THESE ARE THE answer radios.
				// Add eventlistener for onclick.
				// After making a selection the form
				// moves to the next tab. The next()
				// function will check this for n/a.
				r[i].onclick = function() {
					setTimeout(function() {
						next();
					}, 800);
					return true;
				}
				
				//~ console.log(r[i]);
				
			}
		}
		radios.shift(); // Remove first radio.
		
		console.log(radios);
		console.log(divs);
		
		// If in preview mode then determine whether to accept
		// or to skip this job.
		//~ console.log(AMT__Global_Vars);return;
		//~ if (AMT__Global_Vars.isPreview) {
			//~ 
		//~ }
		var current_li = null;
		var next_li    = lis[0];
		var num_runs = 0;
		//~ var xint = setInterval(function() {
			//~ 
			//~ next();
			//~ 
		//~ }, 300);
		
		// This will begin the program.
		//
		//
		next();
		
		/**
		 * Function next
		 */
		function next() {
			// this is plus 1, element 0 = not related
			
			var found = false;
			
			console.log('run' + num_runs);
			console.log(next_li);
			num_runs++;
			
			
			getDivs(); // > Recreate these. Sometimes the divs are taking time to appear.
			
			
			for (var i=0; i < lis.length; i++) {
				
				//~ if (i == 'length') break;
				//~ console.log(i);
				//~ console.log(next_li);
				//~ console.log(lis[i]);
				//~ console.log(lis[i]);
				//~ if (lis[i].className.indexOf('complete') != -1)
					//~ continue;
				
				if (next_li && next_li == lis[i] && lis[i].className.indexOf('selected') != -1) {
					
					found = true;
					
					if (lis[i + 1]) {
						next_li = lis[i + 1];
					} else {
						next_li = false;
					}
					
					if (divs[i] && radios[i]) {
						
						//~ console.log('check div:');
						//~ console.log(divs[i]);
						//~ console.log('check radio:');
						//~ console.log(radios[i]);
						
						check(divs[i], radios[i], lis[i], lis[i+1]); // XX next LI XX, current DIV, current RADIO
						//~ break;
					}
					
					break;
				}
			}
			
			// RESTART
			if (!found) {
				//~ setTimeout(function() {
					//~ next();
				//~ }, 200);
			}
					//~ continue;
				//~ }
				
				//~ if (lis[i].className.indexOf('selected') && current_li != lis[i]) {
					//~ current_li = lis[i];
					
				//~ if (current_li != lis[i]) {
					//~ current_li = lis[i];
					
					//~ if (lis[i].className.indexOf('selected') != -1) { // && current_li != lis[i]
					
					// ???
					//
					//
					//~ current_li = (lis.hasOwnProperty(i + 1)) ? lis[i+1] : null;
					
					//~ console.log('selected li:');
					//~ console.log(lis[i]);
					//~ console.log('selected i:');
					//~ console.log(i);
					//~ console.log(divs[i]);
					//~ console.log(radios[i]);
						
					
					
					//~ break;
				//~ }
			//~ }
			
		}
		
		/**
		 * Function checkComplete
		 */
		function checkComplete() {
			if (num_na >= divs.length) {
				doSubmit('mainform', null, function() {
					// click to ensure valid
					document.getElementsByClassName('button cc-button submit-btn btn btn-primary ')[0].click();
				});
			}
		}
		
		/**
		 * Function check
		 */
		function check(div, radio, li, li_next) { // XX next LI XX, current DIV, current RADIO
			
			var div = div, radio = radio, li = li, li_next = li_next;
			
			console.log('IT:' + div.innerText);
			if (div.innerText == 'No Results' && !radio.checked) {
				radio.click();
				num_na++;
				
				checkComplete();
				
				setTimeout(function() {
					next();
				}, 800);
				//~ next();
				// RESTART
				//~ var tmp_int = setInterval(function() {
					//~ if (li.className.indexOf('selected') == -1)
					//~ {
						//~ clearInterval(tmp_int);
						//~ next();
					//~ }
				//~ }, 60);
				//~ li_next.click();
				return;
			} else {
				// There are results
				//
				//
				console.log(next_li);
			}
			
		}
		
	}
	// INIT
	if (document.location.href.indexOf('https://infogroup2.crowdcomputingsystems.com/mturk-web/public/HTMLRenderer') != -1) {
		new AMT__rq().rq__OCMP();
	}
	
	/**
	 * AMT__Newline_Financial_cookcountyclerk_com__payment
	 * 
	 */
	// FROM PARENT FRAME!
	// .id
	// .task
	// 
	// TODO: WRITE_TO_FILE ADD HOST: = mt___host
	AMT__rq.prototype.AMT__Newline_Financial_cookcountyclerk_com__payment = function(data) {
		
		var x = document.location.href;
		var ih = document.body.innerHTML;
		
	//~ function AMT__Newline_Financial_cookcountyclerk_com__payment(data) {
		//~ console.log('messaged');
		//~ console.log(x);
		//~ 
		//~ //
		//~ // t==0
		//~ // on second run
		//~ // replace this !!: <form name="aspnetForm" method="post" action="DelinquentTaxSearch.aspx?u=xxx"
		
		// COMPLETE
		// http://cookcountytreasurer.com/pinsummary.aspx 
		if  (
			x == 'http://cookcountytreasurer.com/pinsummary.aspx' &&
			ih.indexOf('<span id="ContentPlaceHolder1_lblCurrentTaxYear">Tax Year ') != -1
			)
		{
			
			//~ console.log('run complete');
			
			var complete = {
				total: '',
				amt1: '',
				amt2: ''
			};
			
			//2,455.82
			var r = /<span id="ContentPlaceHolder1_lblCurrentTaxYear">Tax Year 2013 \(payable in 2014\)<\/span>[\r\n\t\s]*<\/td>[\r\n\t\s]*<td style="padding-top: 8px; width: 10px;">[\r\n\t\s]*<span id="ContentPlaceHolder1_lblCurrentTaxYearDollarSign">\$<\/span>[\r\n\t\s]*<\/td>[\r\n\t\s]*<td style="padding-top: 8px; text-align: right;">[\r\n\t\s]*<span id="ContentPlaceHolder1_lblCurrentTaxYearAmount" class="blacktextbold">([^<]+)<\/span>/.exec(document.body.innerHTML);
			if (!r) {
				console.log('1');
				return;
			}
			complete.total = r[1];
			
			//1390.3200
			var r = /<input type="hidden" name="ctl00\$ContentPlaceHolder1\$CP_TotalAmount1" id="ContentPlaceHolder1_CP_TotalAmount1" value="([^"]+)">/.exec(ih);
			if (!r) {
				console.log('2');
				//~ console.log(ih);
				return;
			}
			complete.amt1 = Math.round(r[1] * 100) / 100;
			complete.amt1 = MT___numberWithCommas(complete.amt1);
			complete.amt1 = complete.amt1.replace(/(\.\d)$/, '$1' + '0');
			if (complete.amt1.indexOf('.') == -1)
				complete.amt1 += '.00';
			//
			
			//1390.3200
			var r = /<input type="hidden" name="ctl00\$ContentPlaceHolder1\$CP_TotalAmount2" id="ContentPlaceHolder1_CP_TotalAmount2" value="([^"]+)">/.exec(ih);
			if (!r) {
				console.log('3');
				return;
			}
			complete.amt2 = Math.round(r[1] * 100) / 100;
			complete.amt2 = MT___numberWithCommas(complete.amt2);
			complete.amt2 = complete.amt2.replace(/(\.\d)$/, '$1' + '0');
			if (complete.amt2.indexOf('.') == -1)
				complete.amt2 += '.00';
			
			console.log(complete);
			
			var filename = 'newline_financial_' + data.id.replace(/[^\d\-]/g, '').substr(0, 20);
			
			// WRITE TO FILE!
			var rf = new AMT___requests_factory();
			rf.io__write_to_file(
				{
					data:	'AMT__serverSide_write__value='	+ encodeURIComponent(JSON.stringify(complete)) +
							'&AMT__serverSide_write__folder=.cached' +
							'&AMT__serverSide_write__file='	+ filename
				},
				function() { // + object?
					// post to parent!
					parent.postMessage({key: 'AMT__Newline_Financial_cookcountyclerk_com__payment__complete', data: complete}, "*");
				}
			);
			
			
			
			// END HERE
			return;
		}
		
		// Here?
		// data.id //
		// http://cookcountytreasurer.com/payment.aspx?u=12-27-115-062-0000 
		var r, id;
		var x = data.id;
		x = x.replace(/-/g, '');
		x = [
			x.substr(0,2),
			x.substr(2,2),
			x.substr(4,3),
			x.substr(7,3),
			x.substr(10,4)
		];
		
		if  (
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN1')
			)
		{
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN1').value = x[0];
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN2').value = x[1];
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN3').value = x[2];
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN4').value = x[3];
			document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_PIN5').value = x[4];
		}
		else if (document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN1'))
		{
			document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN1').value = x[0];
			document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN2').value = x[1];
			document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN3').value = x[2];
			document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN4').value = x[3];
			document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_PIN5').value = x[4];
		}
		else
			return;
		
		var input = document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_EnteredSecurityCode');
		if (!input)
			input = document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_EnteredSecurityCode');
		input.parentNode.parentNode.style.position = 'absolute';
		input.parentNode.parentNode.style.zoom = '2.2';
		input.parentNode.parentNode.style.top = '0';
		input.parentNode.parentNode.style.left = '0';
		input.focus();
		input.scrollIntoView(true);
		
		input.style.position = 'absolute';
		input.style.top = '44px';
		input.style.left = '2px';
		input.style.width = '120px';
		
		var img = input.parentNode.parentNode.getElementsByTagName('img')[0];
		img.scrollIntoView(true);
		img.style.marginTop = '10px';
		
		var search;
		search = document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_cmdSearch');
		if (search) {
			//
		} else {
			search = document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_cmdSearch');
		}
		//ContentPlaceHolder1_PaymentSearchAgainBox1_cmdSearch
		
		var CAPTCHA_INT;
		input.addEventListener('keydown', function() {
			if (CAPTCHA_INT)
				clearInterval(CAPTCHA_INT);
		}, false);
		input.addEventListener('keyup', function() {
			if (this.value.length == 6) {
				
				new AMT___core_factory().nextTab();
				
				//~ setTimeout(function() {
					//~ new AMT___core_factory().nextTab();
					//~ document.getElementById('form1').submit();
				//~ }, 40);
				//~ var search;
				//~ search = document.getElementById('ContentPlaceHolder1_PaymentSearchBox1_cmdSearch');
				//~ if (search) {
					//~ //
				//~ } else {
					//~ search = document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_cmdSearch');
				//~ }
				search.click();
			}
		}, false);
	
		
		// STILL HERE?
		// TRY CAPTCHA
		// When first visiting the page the elements on the page
		// will NOT have the word "Again" in their IDs.
		//  > ContentPlaceHolder1_PaymentSearchBox1_cmdSearch 
		//  > ContentPlaceHolder1_PaymentSearchAgainBox1_cmdSearch
		// Set arg GET->cookcountytreasurer.
		
		if (document.getElementById('ContentPlaceHolder1_PaymentSearchAgainBox1_cmdSearch'))
			return;
			
		var id = data.id + 'cookcountytreasurer';
		
		captcha();
		function captcha() {
			
			//var id
			
			GM_xmlhttpRequest({
				method: "GET",
				url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u_captcha_id='+encodeURIComponent(id)+'&u_captcha_src='+encodeURIComponent(img.src)+'&init&cookcountytreasurer',
				onload: function(response) {
					var rs = response.responseText;
					
					// CAPTCHA_INT
					//
					//
					
					CAPTCHA_INT = setInterval(function() {
						GM_xmlhttpRequest({
							method: "GET",
							url: MT___host + '/mturk/JordanAGross/JordanAGross.php?u_captcha_id='+encodeURIComponent(id)+'&u_captcha_src='+encodeURIComponent(img.src)+'&complete',
							onload: function(response) {
								var rs=response.responseText;
								if (rs != '') {
									clearInterval(CAPTCHA_INT);
								}
								else return;
								
								rs = rs.replace(/ /g, ''); // SPACES!
								rs = rs.trim();
								
								console.log(rs);
								
								// TRY TO FILL IN THIS VALUE
								// This will always be only 6 digits.
								// However, when debug is on any value
								// is returned here. (Closest to 6 digits
								// is returned.) So check first.
								if (rs.length != 6) return;
								
								input.value = rs;
								search.click();
								
							}
						});
					}, 1000);
				}
			});
		}
		
	}
	
	/*
	 * Giovanni Mantica
	 * 
	 */
	function AMT__Giovanni_Mantica_Email() {
		// enable
		MT___all_pages_extend();
		//MT___all_pages_zoom();
	}
	
	/*
	 * Ashley Fraser
	 * 
	 */
	function AMT__Ashley_Fraser_Email() {
		// enable
		MT___all_pages_extend();
		MT___all_pages_zoom();
		
		// mousemove
		var mouse = [0,0];
		window.addEventListener('mousemove', function(e) {
			mouse[0] = Math.round(e.clientY + document.body.scrollTop);
			mouse[1] = Math.round(e.clientX + document.body.scrollLeft);
		}, false);
		// keydown
		window.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
			if (e.keyCode == '220') { // backslash
				// remove old
				var x;
				if (x = document.getElementById('div__AMT__Ashley_Fraser_Email'))
					x.parentNode.removeChild(x);
				
				//add
				var d;
				d = document.createElement('div');
				d.setAttribute('id','div__AMT__Ashley_Fraser_Email');
				d.setAttribute('style','\
					position:absolute;\
					top:'+mouse[0]+'px;\
					left:'+mouse[1]+'px;\
					width:800px;\
					height:auto;\
					z-index:10000000000000000000000000000000000000000000000000000000000000;\
					background-color:#fafafa;\
					border:3px dashed #0a0a0a;\
				');
				var el;
				for (var i = 0; i<=1; i++) {
					el = document.createElement('input');
					el.setAttribute('id','input__AMT__Ashley_Fraser_Email'+i);
					el.setAttribute('style','width:100%;height:40px;margin:0;padding:0;font-size:2.0em;');
					el.onkeyup = function(e) {
						//console.log(e.keyCode);
						if (e.keyCode == 27) {
							this.parentNode.parentNode.removeChild(this.parentNode);
						}
						if (e.keyCode == 13) { // submit
							// create msg &
							// clean form
							var u = '';
							for (var i = 0; i<=1; i++) {
								var x = document.getElementById('input__AMT__Ashley_Fraser_Email'+i).value.trim();
								u += encodeURIComponent(x);
								if (i != 1)
									u += '&';
							}
							parent.postMessage('ashley_fraser_complete_'+u, "*");
							e.stopPropagation();
							e.preventDefault();
							return false;
						}
					}
					if (i == 1)
						el.value = document.location.href;
					d.appendChild(el);
					el = document.createElement('br');
					el.setAttribute('style','margin:0;padding:0;');
					if (i != 1)
						d.appendChild(el);
				}
				document.body.appendChild(d);
				document.getElementById('input__AMT__Ashley_Fraser_Email0').focus();
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			//~ if (e.keyCode == 27) {
				//~ this.parentNode.removeChild(this);
			//~ }
		}, false);
	}
	
	/*
	 * Tim Edwards
	 * Masters, E-mail
	 */
	function AMT__Tim_Edwards_Email() {
		// enable
		MT___all_pages_extend();
		MT___all_pages_zoom();
		
		// mousemove
		var mouse = [0,0];
		window.addEventListener('mousemove', function(e) {
			mouse[0] = Math.round(e.clientY + document.body.scrollTop);
			mouse[1] = Math.round(e.clientX + document.body.scrollLeft);
		}, false);
		// keydown
		window.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
			if (e.keyCode == '220') { // backslash
				// remove old
				var x;
				if (x = document.getElementById('div__AMT__Tim_Edwards_Email'))
					x.parentNode.removeChild(x);
				
				//add
				var d;
				d = document.createElement('div');
				d.setAttribute('id','div__AMT__Tim_Edwards_Email');
				d.setAttribute('style','\
					position:absolute;\
					top:'+mouse[0]+'px;\
					left:'+mouse[1]+'px;\
					width:800px;\
					height:auto;\
					z-index:10000000000000000000000000000000000000000000000000000000000000;\
					background-color:#fafffa;\
					border:4px dashed #0a0a0a;\
					font-size:2.2em;\
				');
				var el;
				el = document.createElement('input');
				el.setAttribute('id','input__AMT__Tim_Edwards');
				el.setAttribute('style','width:100%;height:30px;margin:0;padding:0;');
				el.onkeyup = function(e) {
					//console.log(e.keyCode);
					if (e.keyCode == 27) {
						this.parentNode.parentNode.removeChild(this.parentNode);
					}
					if (e.keyCode == 13) { // submit
						var u = '';
						this.value = this.value.trim();
						parent.postMessage('tim_edwards_complete_'+this.value, "*");
						e.stopPropagation();
						e.preventDefault();
						return false;
					}
				}
				d.appendChild(el);
						
				document.body.appendChild(d);
				document.getElementById('input__AMT__Tim_Edwards').focus();
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			//~ if (e.keyCode == 27) {
				//~ this.parentNode.removeChild(this);
			//~ }
		}, false);
	}
	
	/*
	 * Ed Hallen
	 * 
	 */
	function AMT__Ed_Hallen_URL__receiveMessage() {
		// enable
		MT___all_pages_extend();
		MT___all_pages_zoom();
		//~ RUN__ALL_PAGES_ZOOM = true;
		//~ RUN__ALL_PAGES_EXTEND = true;
		
		// mousemove
		var mouse = [0,0];
		window.addEventListener('mousemove', function(e) {
			mouse[0] = Math.round(e.clientY + document.body.scrollTop);
			mouse[1] = Math.round(e.clientX + document.body.scrollLeft);
		}, false);
		// keydown
		window.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
			if (e.keyCode == '220') { // backslash
				// remove old
				var x;
				if (x = document.getElementById('div__AMT__Ed_Hallen_URL'))
					x.parentNode.removeChild(x);
				
				//add
				var d;
				d = document.createElement('div');
				d.setAttribute('id','div__AMT__Ed_Hallen_URL');
				d.setAttribute('style','\
					position:absolute;\
					top:'+mouse[0]+'px;\
					left:'+mouse[1]+'px;\
					width:800px;\
					z-index:10000000000000000000000000000000000000000000000000000000000000;\
					background-color:#fafffa;\
					border:4px dashed #0a0a0a;\
					font-size:2.8em;\
				');
				var el;
				for (var i = 0; i<=3; i++) {
					el = document.createElement('input');
					el.setAttribute('id','input__AMT__Ed_Hallen_URL'+i);
					el.setAttribute('style','width:100%;height:30px;margin:0;padding:0;');
					el.onkeyup = function(e) {
						//console.log(e.keyCode);
						if (e.keyCode == 27) {
							this.parentNode.parentNode.removeChild(this.parentNode);
						}
						if (e.keyCode == 13) { // submit
							// create msg &
							// clean form
							var u = '';
							for (var i = 0; i<=3; i++) {
								var x = document.getElementById('input__AMT__Ed_Hallen_URL'+i).value.trim();
								u += encodeURIComponent(x);
								if (i != 3)
									u += '&';
							}
							parent.postMessage('ed_hallen_complete_'+u, "*");
							e.stopPropagation();
							e.preventDefault();
							return false;
						}
					}
					d.appendChild(el);
					el = document.createElement('br');
					el.setAttribute('style','margin:0;padding:0;');
					if (i != 3)
						d.appendChild(el);
				}
				document.body.appendChild(d);
				document.getElementById('input__AMT__Ed_Hallen_URL0').focus();
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			//~ if (e.keyCode == 27) {
				//~ this.parentNode.removeChild(this);
			//~ }
		}, false);
	}
	
	//
	// RUN_NPDLabs_Schools
	// NPDRD
	// Review school supply list
	//
	if  (
			RUN_NPDLabs_Schools
		)
	{
		console.log('');
		//
		//
		// iframe
		// 
		s = '<li>Your job is to review the school supply list for the grade listed and answer the questions below. If there are multiple grades listed on the website, please only answer the questions for the grade listed below.</li>';
		if (ih.indexOf(s) != -1) {
			console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea,button {margin:0;padding:0;font-size:12px;}');
			
			//~ GM_addStyle('.container {position:absolute;top:0px;margin-left:-40px;width:30%;zoom:0.6;}');
			//~ GM_addStyle('.panel {position:absolute;top:1600px;}');
			//~ GM_addStyle('.divs-yahoo:hover {background-color:aqua;cursor:pointer;}');
			
			GM_addStyle('body {width:30%;}');
			GM_addStyle('.highlight-box {position:absolute;top:2000px;}');
			
			//~ 
			//~ GM_addStyle('body {margin-top:0px;}');
			//~ GM_addStyle('.highlight-box {position:absolute;top:1200px;}');
			//~ GM_addStyle('input {width:90%;}');
			//~ GM_addStyle('.divs-yahoo:hover {background-color:LightGreen;}');
			
			var b = document.getElementById('schoollisturl').innerText.trim();
			//~ var o = {
				//~ website: b[9].innerText.trim()
			//~ }
			
			/* BEGIN ITEMS */
			//~ var d1;
			//~ d1 = document.createElement('div');
			//~ d1.setAttribute('style','position:absolute;top:0px;left:20%;width:78%;height:500px;border:1px solid blue;border-bottom:4px solid blue;background-color:#eee;overflow:auto;');
			//~ document.body.appendChild(d1);
			//~ //
			//~ var d1b = document.createElement('div');
			//~ d1b.setAttribute('style','margin-left:20%;width:78%;height:98%;border-left:1px solid blue;background-color:#eee;');
			//~ d1.appendChild(d1b);
			//~ //
			var d2 = document.createElement('textarea');
			d2.setAttribute('style','position:absolute;top:0px;left:30%;width:69%;height:200px;');
			d2.onblur = function() {
				this.value = this.value.replace(/[\r\t ]/g, '');
				this.value = this.value.replace(/[\n]+/g, '\n');
				document.getElementById('QSchoolListItemNumber').value = this.value.trim().split('\n').length;
			}
			document.body.appendChild(d2);
			// ...
			var d1c = document.createElement('iframe');
			d1c.setAttribute('style','position:absolute;top:260px;left:1%;width:98%;height:600px;border:1px solid blue;background-color:#eee;sandbox:allow-scripts allow-same-origin;');
			// Flicker
			d1c.style.visibility = 'hidden';
			d1c.addEventListener('load', function() {
				this.style.visibility = 'visible';
			}, false);
			document.body.appendChild(d1c);
			/* END ITEMS */
			
			d1c.src = b;
			
			
			// zoom out d1c!
			// post msg
			var ifr_intv = setInterval(function() {
				d1c.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
			}, 600);
			
			document.getElementById('QValidURL').value = 1;
			document.getElementById('QSchoolYear').value = 1;
			
		}
	}
	
	/**
	 * DAEMONS.... ?
	 * 
	 * 
	 */
	/**
	 * Della Nelson
	 * Yandex
	 */
	if (1==1) {
		var loc = document.location.href;
		if (loc.indexOf('https://wordstat.yandex.com/#!/?words=') != -1) {
			
			var run = function() {};
			run.prototype.f = function() {
				
				var o = {
					next_word: null,
					word: null,
					word_stats: null
				}
				
				// Wait for table to be populated
				init_table();
				function init_table() {
					console.log(document.getElementsByClassName('b-phrases__table').length);
					if (!document.getElementsByClassName('b-phrases__table').length) {
						setTimeout(function() {
							init_table();
						}, 60);
						return;
					}
					
					// Save to file
					var x = document.getElementsByClassName('b-phrases__table')[0].getElementsByTagName('tr');
					if (x.length == 2) { // 0,1=n/a,2=answer
						// n/a
						o.word_stats = 'N/A';
					}
					else if (x.length < 3) { // 0,1,2 (2 is match)
						//~ console.log(x);return;
						setTimeout(function() {
							init_table();
						}, 60);
						return;
					} else {
						o.word_stats = x[2].innerText.trim();
					}
					console.log(o);
					// > 2
					o.word = /words=([^&]+)/.exec(loc)[1];
					// Init
					load_words();
				}
				// Load saved words
				function load_words() {
					GM_xmlhttpRequest({
						method: "GET",
						url: MT___host + '/mturk/.miscellaneous/DellaNelson_yandex_words?random='+Math.random(),
						onload: function(response) {
							var rs = response.responseText.trim();
							if (rs == '') {
								rs = '{}';
							}
							rs = JSON.parse(rs);
							rs[ o.word ] = o.word_stats;
							//~ console.log(rs);
							//~ document.getElementsByClassName('b-form-input__input')[0].value = rs[ o.word ];
							write_words(JSON.stringify(rs));
						}
					});
				}
				// Write to saved words
				function write_words(data) {
					var rf = new AMT___requests_factory()
						.io__write_to_file(
							{
								data:	'AMT__serverSide_write__value=' + encodeURIComponent(data)+
										'&AMT__serverSide_write__folder=.miscellaneous'+
										'&AMT__serverSide_write__file=DellaNelson_yandex_words',
								host:	MT___host
							},
							function () {
								// Init queue checking
								load_queue();
							}
						);
				}
				
				
				// Load one
				function load_queue() {
					GM_xmlhttpRequest({
						method: "GET",
						url: MT___host + '/mturk/.miscellaneous/DellaNelson_yandex_queue?random='+Math.random(),
						onload: function(response) {
							var rs = response.responseText.trim();
							if (rs == '' || rs == '[]') {
								setTimeout(function() { // Check again in 300 ms
									load_queue();
								}, 300);
								return;
							}
							rs = JSON.parse(rs); // Array
							o.next_word = rs.shift();
							// Write queue
							write_queue(JSON.stringify(rs));
						}
					});
				}
				function write_queue(data) {
					var rf = new AMT___requests_factory()
						.io__write_to_file(
							{
								data:	'AMT__serverSide_write__value=' + encodeURIComponent(data)+
										'&AMT__serverSide_write__folder=.miscellaneous'+
										'&AMT__serverSide_write__file=DellaNelson_yandex_queue',
								host:	MT___host
							},
							function () {
								// Reload the page
								window.location.href = 'https://wordstat.yandex.com/#!/?words=' + o.next_word+'&'+Math.random();
								location.reload();
							}
						);
				}
			}
			new run().f();
		}
	}
	
	//
	// Matt Tarjeft
	// 
	// 
	//
	if  (
			RUN__ALL_PAGES__Matt_Tarjeft
		)
	{
		
		// to find which user is being used right now
		// query the background page for a variable
		
		// @localStorage MT___VAR___Matt_Tarjeft_yahoo__queue_object__isComplete
		// @localStorage MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete
		
		var loc = document.location.href;
		console.log('RUN__ALL_PAGES__Matt_Tarjeft');
		
		if (loc.indexOf('https://login.yahoo.com/config/login?.src=fpctx&') == 0) {
			console.log('Inside of Login Page, waiting for queue info.');
			// Log in
			AMT__Matt_Tarjeft_yahoo_emails__login();
			
			// Init read queue
			//AMT__Matt_Tarjeft_yahoo_emails__readQueue();
			//~ var init_interval = setInterval(function() {
				//~ AMT__Matt_Tarjeft_yahoo_emails__readQueue();
			//~ }, 600);
		}
		else if(loc.indexOf('https://us-mg6.mail.yahoo.com/neo/launch') == 0) {
			var NUM_PASS = 0;
			//var MAX_ = 0;
			var emails = ['support@dealsdoctor.com','support@egiftdeals.com','support@netedeals.com','support@thedealbird.com','support@tiptopdeal.com']
			var sentences =
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'.split('.');
			var ty = 'Thank you! :)';
			AMT__Matt_Tarjeft_yahoo_emails__waitForComposeBtn();

		}
		else if (loc.indexOf('https://login.yahoo.com/config/login') !=-1) {
			// START DAEMON!
			//https://login.yahoo.com/config/login
			AMT__Matt_Tarjeft_yahoo_emails__readQueue();
		}
		
		
		// Functions
		
		function AMT__Matt_Tarjeft_yahoo_emails__waitForComposeBtn() {
			var init_interval = setInterval(function() {
				var x = document.getElementsByClassName('btn btn-compose');
				var y = document.getElementById('rtetext');
				if (x && x.length == 1 && !y) {
					clearInterval(init_interval);
					if (NUM_PASS < emails.length) {
						x[0].click();
						AMT__Matt_Tarjeft_yahoo_emails__waitForEmailBody();
					} else {
						// go next
						//AMT__Matt_Tarjeft_yahoo_emails__logout();
					}
				}
			}, 400);
		}
		
		function AMT__Matt_Tarjeft_yahoo_emails__waitForEmailBody() {
			var init_interval = setInterval(function() {
				var x = document.getElementById('rtetext');
				if (x) {
					clearInterval(init_interval);
					// body
					var body;
					var start = Math.round(Math.random() * 1);
					if(NUM_PASS < 2)
					{ 
						body = sentences.slice(start, 2).join('.');
					}
					else
						body = sentences[start];
					body += "\n\n"+ty;
					
					var t;
					// to
					t = document.getElementById('to-field');
					t.focus();
					t.value = emails[NUM_PASS];
					t.blur();
					// body
					document.getElementById('rtetext').innerText = body;
					// subject
					t.focus();
					document.getElementById('subject-field').value = '_REDACTED_2_';
					t.blur();
					
					NUM_PASS++;
					// send btn
					document.getElementsByClassName('btn default')[0].click();
					
					// WAIT FOR NEXT COMPOSE TO APPEAR?
					AMT__Matt_Tarjeft_yahoo_emails__waitForComposeBtn();
				}
			}, 400);
		}
		
		function AMT__Matt_Tarjeft_yahoo_emails__logout() {
			var login = 'https://login.yahoo.com/config/login?.src=fpctx&.intl=us&.done=https://us-mg6.mail.yahoo.com/neo/launch?.rand=6hl8g3kkoqdiu';
			
			document.location.href = 'https://login.yahoo.com/config/login;_ylt=?logout=1&.direct=2&.done='+encodeURIComponent(login)+'&.src=cdgm&.intl=us&.lang=en-US';
		}
		
		function AMT__Matt_Tarjeft_yahoo_emails__login() {
			
			chrome.extension.sendRequest(
				{
					method: "getLocalStorage",
					key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete"
				},
				function(response) {
					// if empty
					if (!response.data || response.data == '' || response.data == '[]') {
						//~ console.log(response);
						response.data = '{}';
						return;
					}
					
					//~ console.log('Got object from LocalStorage Proceeding to login');
					console.log(response);
					// .isCompleted
					
					// clear __toComplete queue!
					AMT__Matt_Tarjeft_yahoo_emails__toComplete_truncateQueue();
					//
					var obj = JSON.parse(response.data);
					console.log(obj);
					//
					document.getElementById('username').value = obj.email;
					document.getElementById('passwd').value = obj.pwd;
					//document.getElementById('.save').click();
				}
			);
		}
		
		function AMT__Matt_Tarjeft_yahoo_emails__saveQueue() {
			chrome.extension.sendRequest(
				{
					method: "getLocalStorage",
					key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__isComplete"
				},
				function(response) {
					// if empty
					if (!response.data || response.data == '' || response.data == '[]') {
						//~ console.log(response);
						response.data = '{}';
						return;
					}
					
					// .isCompleted
					
					var obj = JSON.parse(response.data);
				
					if (!obj.email || !obj.pwd)
						return;
					
					// update .isCompleted
					obj.isCompleted = true;
					
					// save isComplete queue
					chrome.extension.sendRequest(
						{
							method: "saveLocalStorage",
							key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__isComplete",
							data: JSON.stringify(obj)
						},
						function() {
							// read __toComplete again
							AMT__Matt_Tarjeft_yahoo_emails__readQueue();
						}
					);
				}
			);
		}
		function AMT__Matt_Tarjeft_yahoo_emails__readQueue() { 
			var init_interval = setInterval(function() {
				chrome.extension.sendRequest(
					{
						method: "getLocalStorage",
						key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete"
					},
					function(response) {
						console.log(response);
						// if empty
						if (!response.data || response.data == '' || response.data == '[]') {
							//~ console.log(response);
							response.data = '{}';
							return;
						}
						
						// .isCompleted
						
						//
						var obj = JSON.parse(response.data);
						
						//XX got a new one, so clear queue!
						//XXAMT__Matt_Tarjeft_yahoo_emails__toComplete_truncateQueue();
						
						//
						if (!obj.email || !obj.pwd)
							return;
						
						// obj.isCompleted
						if (obj.isCompleted)
							return;
						
						clearInterval(init_interval);
						
						// Save this one to __isComlete queue
						// Go to => /logout /login
						chrome.extension.sendRequest(
							{
								method: "saveLocalStorage",
								key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__isComplete",
								data: JSON.stringify(obj)
							},
							function() {
								// go to the logout/login page here
								AMT__Matt_Tarjeft_yahoo_emails__logout();
							}
						);
						
						
					}
				);
			}, 600);
		}
		function AMT__Matt_Tarjeft_yahoo_emails__toComplete_truncateQueue() {
			chrome.extension.sendRequest(
				{
					method: "saveLocalStorage",
					key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete",
					data: ''
				},
				function(response) {
					//callback_function();
					console.log(response);
				}
			);
		}
	}
	//
	// Jordan Mills
	// Textarea/input for Jordan Mills
	// RUN__ALL_PAGES_TEXTAREA__Jordan_Mills
	//
	if  (
			RUN__ALL_PAGES_TEXTAREA__Jordan_Mills
		)
	{
		// enable
		RUN__ALL_PAGES_ZOOM = true;
		RUN__ALL_PAGES_EXTEND = true;
		
		// dblclick
		document.ondblclick = function(event) {
			var d;
			d = document.createElement('input');
			d.setAttribute('type','text');
			d.setAttribute('id','RUN__ALL_PAGES_TEXTAREA__384569383458628');
			d.setAttribute('style','\
				position:absolute;\
				top:'+Math.round(event.clientY + document.body.scrollTop)+'px;\
				left:'+Math.round(event.clientX + document.body.scrollLeft)+'px;\
				width:800px;\
				height:80px;\
				z-index:10000000000000000000000000000000000000000000000000000000000000;\
				background-color:#fefeff;\
				border:2px dashed #0a0a0a;\
				font-size:2.8em;\
			');
			d.value = document.location.href;
			d.onkeyup = function(e) {
				//console.log(e.keyCode);
				if (e.keyCode == 27) {
					this.parentNode.removeChild(this);
				}
				if (e.keyCode == 13) { // submit
					parent.postMessage('jordan_mills_complete_'+this.value, "*");
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
			}
			document.body.appendChild(d);
			document.getElementById('RUN__ALL_PAGES_TEXTAREA__384569383458628').focus();
		}
		//~ // add message watcher so that parent 
		//~ window.addEventListener("message", Jordan_Mills_receive_message, false);
		//~ function Jordan_Mills_receive_message(event)
		//~ {
			//~ console.log(event);
			//~ q.value = '';
			//~ //doSubmit();
			//~ //clearInterval(ifr_intv);
		//~ }
	}
	
	//
	//
	// RUN_Tony_Pavia_Schools
	// 
	if (RUN_Tony_Pavia_Schools) {
		
		RUN__ALL_PAGES_ZOOM = true;
		RUN__ALL_PAGES_EXTEND = true;
		RUN_HOWE_CODE = false;
		
		if (ih.indexOf('<a class="user-email-public"') != -1) {
			var a = document.getElementsByClassName('user-email-public');
			for (var i in a) {
				if (!a[i]) continue;
				if (i == 'length') continue;
				if (!a[i].innerHTML) continue;
				if (a[i].innerHTML.trim() == '<span>Send email</span>' && /\/apps\/email\/index\.jsp\?e=\d+&n=/.exec(a[i].href))
					a[i].parentNode.removeChild(a[i]);
			}
		}
	}
	
	//
	//
	// RUN_Sahar_ReferIt_Game
	// Sahar_ReferIt_Game
	if (RUN_Sahar_ReferIt_Game) {
		//
		if (loc.indexOf('http://www.referitgame.com/mturk2?assignmentId=') != -1) { //click
			document.getElementById('mainImage').addEventListener('click',function() {
				document.getElementById('submitButton').click();
			}, false);
		}
		//
		else if (loc.indexOf('http://www.referitgame.com/mturk1?assignmentId=') != -1) { // enter desc.
			
		}
	}
	
	//
	//
	// RUN_James_M_Ratcliffe_Verizon_com
	// James_M_Ratcliffe Verizon
	// INIT URL =
	// https://www.verizon.com/FORYOURHOME/ORDERING/CheckAvailability.aspx?type=pheonix&fromPersonalisation=y&isRefferalURLSecure=N&change=y#
	if (RUN_James_M_Ratcliffe_Verizon_com) {
		
		var run = function() {};
		run.prototype.f = function() {
			
			var LOC__ = document.location.href;
			var init_url =	'https://www.verizon.com/FORYOURHOME/ORDERING/CheckAvailability.aspx?'+
							'type=pheonix&fromPersonalisation=y&isRefferalURLSecure=N&change=y#';
			
			// Only continue if verizon.com/...
			if (LOC__.indexOf('https://www.verizon.com/FORYOURHOME') == -1) return;
			
			// Read the queue
			function readQueue() {
				var xint = setInterval(function() {
					// read queue
					GM_xmlhttpRequest({ // init
						method: "GET",
						url: MT___host+'/mturk/util.php?James_M_Ratcliffe_readqueue=',
						onload: function(response) {
							var rs = response.responseText;
							
							if (rs.trim() != '') {
								clearInterval(xint);
								//console.log(rs);return;
								//window.location = 'https://www.verizon.com/FORYOURHOME/GOFLOW/newconnect/Personalization.aspx?change=y#'+rs;
								
								// From new...
								if (window.location == init_url) {
									var h = rs;
									
									h = h.split('|_|');
									
									GM_setValue('MT___James_M_Ratcliffe_Verizon', h.join('|_|'));
									document.getElementById('txtAddress').value = h[0]
									document.getElementById('txtZip').value = h[1];
									document.getElementById('btnContinueOverlay').click();
									document.getElementById('chkRememberOverLay').checked = false;
									
									return;
								}
								//setInterval(function() {
									//document.getElementById('btnNextContinue').click();
								//}, 1000);
								//
								//return;
							}
						}
					});
				}, 400);
			}
			
			// INIT URL =
			// https://www.verizon.com/FORYOURHOME/ORDERING/CheckAvailability.aspx?type=pheonix&fromPersonalisation=y&isRefferalURLSecure=N&change=y#
			if  (
				LOC__ == init_url
				)
			{
				readQueue();
				return;
			}
			if (LOC__.indexOf('https://www.verizon.com/FORYOURHOME/GOFLOW/newconnect/SecurityCheck.aspx?change=y') != -1) {
				setInterval(function() {
					document.getElementById('recaptcha_response_field').focus();
				}, 400);
			}
			// Yes, this is the correct address
			// https://www.verizon.com/FORYOURHOME/ORDERING/OrderNew/OrderAddressInfo.aspx
			if (/https:\/\/www\.verizon\.com\/FORYOURHOME\/ORDERING\/OrderNew\/OrderAddressInfo\.aspx/i.exec(LOC__)) {
				
				// Is this the right address?
				var x = document.getElementById('rdoAddressOption0');
				if (x) {
					//~ x.checked = true;
					x.parentNode.getElementsByTagName('a')[0].click();
					document.getElementById('body_content_btnContinue').click();
					return;
				}
				
				// Success?
				// rdoNoNotMine
				if (ih.indexOf('<h3 id="body_content_hExServ">This address already has Verizon service.</h3>') != -1)
				{
					var x = document.getElementById('rdoNoNotMine');
					if (x) {
						x.parentNode.getElementsByTagName('a')[0].click();
						
						var x = document.getElementById('rdoNoAmMovingThere');
						if (x) {
							x.parentNode.getElementsByTagName('a')[0].click();
							document.getElementById('body_content_btnContinueExisitng').click();
							return;
						}
					}
				}
			}
			
			// Final
			// https://www.verizon.com/FORYOURHOME/ORDERING/OrderNew/DirectOrdering.aspx
			var final_intv = setInterval(final, 60);
			function final() {
				var ih = document.body.innerHTML;
				
				if  (
					LOC__.indexOf('https://www.verizon.com/FORYOURHOME/ORDERING/OrderNew/DirectOrdering.aspx') == -1 ||
					ih.indexOf('<h2 id="elite_title">Below are the products you are eligible for</h2>') == -1
					)
				{
					return;
				}
				
				// Completed?
				// ClearInterval
				clearInterval(final_intv);
				
				var v = {
					fiostv: false,
					fiosint: false,
					highspd: false
				};
				if (ih.indexOf('>FiOS TV<') != -1) {
					v.fiostv = true;
				} 
				if (ih.indexOf('>FiOS Internet<') != -1) {
					v.fiosint = true;
				}
				if (ih.indexOf('>High Speed Internet<') != -1) {
					v.highspd = true;
				}
				
				// Write to file
				// @param localStorage
				var nm = GM_getValue('MT___James_M_Ratcliffe_Verizon');
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: MT___host+'/mturk/util.php' +
						'?James_M_Ratcliffe_writecomplete='+encodeURIComponent(nm)+
						'&James_M_Ratcliffe_writecomplete_val='+encodeURIComponent(JSON.stringify(v)),
					onload: function(response) {
						//var rs = response.responseText;
						
						// GO TO INIT URL
						document.location.href = init_url;
						
						//~ // Read queue
						//~ readQueue();
					}
				});
			}
		}
		new run().f();
	}
	
	//
	//
	//
	//Howe, scroll to image, border it
	//Make all images on all pages hot)
	//
	//
	if(RUN_HOWE_CODE)
	{
		
		GM_addStyle('#manual__d1> {text-align:left !important !important !important !important;}');
		GM_addStyle('#manual__d1> {z-index:1000000000000000000000000000000000000000000000000000000000000000000000000000000000000;}');
		GM_addStyle('#manual__d1>hr			{margin:0;padding:0;}');
		GM_addStyle('#manual__d1>span		{color:black;background-color:#eee;border:0;}');
		GM_addStyle('#manual__d1>label		{cursor:pointer;color:black;background-color:#eee;border:0;}');
		GM_addStyle('#manual__d1>textarea	{margin:0;padding:0;border:1px solid blue;border-left:0;border-right:0;color:black;background-color:white;}');
		GM_addStyle('#manual__d1>input		{margin:0;padding:0;border:1px solid blue;border-left:0;border-right:0;color:black;background-color:white;}');
		GM_addStyle('#manual__d1>input:hover {background-color:LightGreen;color:black;margin:0;padding:0;border:1px solid blue;border-left:0;border-right:0;color:black;}');
		GM_addStyle('#manual__d1>input:active{background-color:MintCream;color:black;margin:0;padding:0;border:1px solid blue;border-left:0;border-right:0;color:black;}');
		
		// variable for the current domain (rather than parent window's desired domain)
		var href = document.location.href;
		href = href.replace(/https?:\/\/(www\.|)/i, '');
		href = href.replace(/\/[\d\D]*$/, '');
		
		// display
		
		// container div
		var d;
		d = document.createElement('div');//cont.
		d.setAttribute('id','manual__d1');
		document.body.appendChild(d);
		var d1 = document.getElementById('manual__d1');
		d1.style.position='fixed';
		//d1.style.position='absolute';//
		d1.style.top='0px';
		d1.style.left='0%';
		d1.style.minWidth='10%';
		d1.style.maxWidth='20%'; //
		d1.style.overflow='auto';
		d1.style.border='1px solid blue';
		d1.style.backgroundColor='#eee';
		d1.style.zIndex='10000000000000000000000000000000000000000000000000000000000000000000';
		d1.style.fontColor='black';
		// close button
		d = document.createElement('input');
		d.setAttribute('id','manual__close_btn');
		d.setAttribute('type','button');
		d.setAttribute('style','width:30px;height:30px;border:1px solid blue;');
		d.value = 'x';
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// domain name
		d = document.createElement('textarea');
		d.setAttribute('id','manual__domain');
		d.setAttribute('style','width:100%;height:40px;margin:0;padding:0;');
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// radios + labels
		for (var i = 0; i <= 2; i++) {
			d = document.createElement('input');
			d.setAttribute('type','radio');
			d.setAttribute('name','manual__type');
			d.setAttribute('style','zoom:1.4;');
			switch (i) {
				case 0:
					d.setAttribute('checked', true);
					d.setAttribute('value', '0');
					d.setAttribute('id', 'manual__type0');
					break;
				case 1:
					d.setAttribute('value', '1');
					d.setAttribute('id', 'manual__type1');
					break;
				case 2:
					d.setAttribute('value', '2');
					d.setAttribute('id', 'manual__type2');
					break;
					
			}
			d1.appendChild(d);
			var x = document.createElement('label');
			switch (i) {
				case 0:
					x.setAttribute('for', 'manual__type0');
					x.appendChild(document.createTextNode('Agent names & pics'));
					d1.appendChild(x);
					break;
				case 1:
					x.setAttribute('for', 'manual__type1');
					x.appendChild(document.createTextNode('Agent names only'));
					d1.appendChild(x);
					break;
				case 2:
					x.setAttribute('for', 'manual__type2');
					x.appendChild(document.createTextNode('No agents'));
					d1.appendChild(x);
					break;
			}
			if (i != 2)
				d1.appendChild(document.createElement('br'));
		}
		d1.appendChild(document.createElement('hr'));
		// directory image is full image
		d = document.createElement('textarea');//cont.
		d.setAttribute('id','manual__agent_directory_url');
		d.setAttribute('style','width:100%;height:40px;');
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// Checkbox for directory_is_full_img
		d = document.createElement('input');//cont.
		d.setAttribute('id','manual__directory_images_full_size');
		d.setAttribute('type','checkbox');
		d.setAttribute('style','zoom:1.4;');
		d.setAttribute('checked','checked');
		d1.appendChild(d);
		var x = document.createElement('label');
		x.setAttribute('for', 'manual__directory_images_full_size');
		x.appendChild(document.createTextNode('Directory images are full size'));
		d1.appendChild(x);
		d1.appendChild(document.createElement('hr'));
		// save button
		d = document.createElement('input');
		d.setAttribute('id','manual__save_btn');
		d.setAttribute('type','button');
		d.setAttribute('style','height:30px;width:100%;border:1px solid blue;');
		d.value = ' save ';
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// use
		// use -domain
		d = document.createElement('input');
		d.setAttribute('id','manual__use_btn_domain');
		d.setAttribute('type','button');
		d.setAttribute('style','height:30px;width:100%;border:1px solid blue;');
		d.value = href;
		d1.appendChild(d);
		d1.appendChild(document.createElement('br'));
		// use -page
		d = document.createElement('input');
		d.setAttribute('id','manual__use_btn_page');
		d.setAttribute('type','button');
		d.setAttribute('style','height:30px;width:100%;border:1px solid blue;');
		d.value = document.location.href;
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// agent
		d = document.createElement('span');
		d.setAttribute('style','');
		d.innerText = 'Agent:';
		d1.appendChild(d);
		d = document.createElement('span');
		d.setAttribute('id','manual__agent_name');
		d.setAttribute('style','font-weight:bold;');
		d1.appendChild(d);
		d1.appendChild(document.createElement('hr'));
		// change src
		d = document.createElement('input');
		d.setAttribute('id','manual__change_src');
		d.setAttribute('type','text');
		d.setAttribute('style','height:30px;width:100px;border:1px solid blue;');
		d.value = document.location.href;
		d1.appendChild(document.createTextNode('Go to:'));
		d1.appendChild(d);
		d1.appendChild(document.createElement('br'));
		// reapply images
		d = document.createElement('input');
		d.setAttribute('id','manual__reapply_images');
		d.setAttribute('type','button');
		d.setAttribute('style','height:30px;border:1px solid blue;');
		d.value = 'Reapply Images & ScrollIntoView';
		d1.appendChild(d);
		// actions
		document.getElementById('manual__close_btn').onclick = function() {
			KristinHowe_agent_photo_toggleInfoBox();
		}
		document.getElementById('manual__save_btn').onclick  = function() {
			this.onclick = function() {};
			this.value = '...';
			KristinHowe_agent_photo_DB_commit();
		}
		document.getElementById('manual__domain').onblur  = function() {
			KristinHowe_agent_photo_DB_load(this.value);
		}
		document.getElementById('manual__change_src').onblur  = function() {
			document.location.href = this.value.trim();
		}
		document.getElementById('manual__reapply_images').onclick  = function() {
			KristinHowe_agent_photo_activate_images();
			KristinHowe_agent_photo_scrollIntoView();
		}
		document.getElementById('manual__use_btn_domain').onclick  = function() {
			if (this.value != document.getElementById('manual__domain').value) {
				var x = confirm('Change Domain to '+this.value+'?');
				if (x) {
					document.getElementById('manual__domain').value = this.value;
					KristinHowe_agent_photo_DB_load(this.value);
				} else {
					// do nothing
				}
			}
		}
		document.getElementById('manual__use_btn_page').onclick  = function() {
			document.getElementById('manual__agent_directory_url').value = this.value;
		}
		
		
		// set var for whether this page has received the "message" from parent
		var WINDOW_NAMED = false;
		// set var for the agent name (from post message)
		var AGENT_NAME = '';
		// set var images on
		var IMAGES_ON = false;
		// set global variable for images type
		var IMAGES_ARE_FZ = 0;
					
		// toggle info show/hide function
		function KristinHowe_agent_photo_toggleInfoBox() {
			if (d1.style.height != '30px') {
				d1.style.width = '30px';
				d1.style.minWidth = '';
				d1.style.height = '30px';
				d1.style.overflow = 'hidden';
			} else {
				d1.style.width = '';
				d1.style.minWidth = '10%';
				d1.style.height = '';
				d1.style.overflow = 'auto';
			}
		}
		// check database function
		function KristinHowe_agent_photo_DB_load(site) {
			GM_xmlhttpRequest({
				method: "GET",
				url: MT___host+'/mturk/KristinHowe_agent_photos/manual_domains.php?load_site=&site='+encodeURIComponent(site),
				onload: function(response) {
					var rs = response.responseText;
					
					if (rs.trim() == '' || rs.trim() == '[]') {
						// listen for parent window
						if (!WINDOW_NAMED)
							window.addEventListener("message", KristinHowe_receiveMessage, false);
						return;
					}
					
					// the domain exists in the database
					// so now is the time to hide the info box!
					//KristinHowe_agent_photo_toggleInfoBox();
					
					rs = JSON.parse(rs);
					//console.log(rs);
					
					//document.getElementById('manual__domain').value = rs.domain;
					//type
					switch (rs.type) {
						case 0:
							document.getElementsByName('manual__type')[0].value = rs.type;
							break;
						case 1:
							document.getElementsByName('manual__type')[1].value = rs.type;
							break;
						case 2:
							document.getElementsByName('manual__type')[2].value = rs.type;
							break;
					}
					// 
					document.getElementById('manual__agent_directory_url').value = rs.agent_directory_url;
					//
					document.getElementById('manual__directory_images_full_size').checked = (Math.round(rs.directory_images_full_size*1) == 1) ? true : '';
					
					// global variable for images type
					IMAGES_ARE_FZ = Math.round(rs.directory_images_full_size*1);
					// turn images on
					if (!IMAGES_ON) {
						IMAGES_ON = true;
						KristinHowe_agent_photo_activate_images();
						KristinHowe_agent_photo_toggleInfoBox(); // toggle
					}
					
					// start listener for parent window
					if (!WINDOW_NAMED) {
						window.addEventListener("message", KristinHowe_receiveMessage, false);
					}
					else {
						// display that parent window has fired, and set the values
						// of the info form
						document.getElementById('manual__domain').style.border = '2px solid LightGreen';
					}
				}
			});
		}
		// write to database function
		function KristinHowe_agent_photo_DB_commit() {
			
			var mt;
			if (document.getElementById('manual__type0').checked) {
				mt = 0;
			} else if (document.getElementById('manual__type1').checked) {
				mt = 1;
			} else {
				mt = 2;
			}
			var fz = (document.getElementById('manual__directory_images_full_size').checked) ? '1' : '0';
			var v = {
				manual__domain:						document.getElementById('manual__domain').value,
				manual__type:						mt,
				manual__agent_directory_url:		document.getElementById('manual__agent_directory_url').value,
				manual__directory_images_full_size:	fz
			}
			
			GM_xmlhttpRequest({
				method: "GET",
				url: MT___host+'/mturk/KristinHowe_agent_photos/manual_domains.php?save_site=&data='+encodeURIComponent(JSON.stringify(v)),
				onload: function(response) {
					var rs=response.responseText;
					
					if (rs.trim() != '')
						alert(rs);
						
					// reinstate the save button
					document.getElementById('manual__save_btn').value = ' save ';
					//document.getElementById('manual__save_btn').style.backgroundColor = '';
					document.getElementById('manual__save_btn').onclick  = function() {
						this.onclick = function() {};
						this.value = '  ...  ';
						//this.style.backgroundColor = 'LightGreen';
						KristinHowe_agent_photo_DB_commit();
					}
				}
			});
		}
		// scrollIntoView function
		function KristinHowe_agent_photo_scrollIntoView(name__) {
			
			// ADD A DOUBLE CLICK TO RESET PAGE
			//
			var all_elements_zoomed = [];
			document.body.addEventListener('dblclick', function() {
				for (var i in all_elements_zoomed) {
					all_elements_zoomed[i].style.zoom = '';
				}
			}, false);
			
			if (name__)
				var name__ = name__;
			else
				var name__ = document.getElementById('manual__agent_name').innerText;
			
			name__ = name__.toLowerCase();
			var nameLast = /([\w]+)$/.exec(name__); // joe _REDACTED_4_-smith
			if (nameLast) {
				nameLast = nameLast[1];
			} else
				nameLast = false;
				
			name__ = name__.replace(/[^\w]/g, '');
			//console.log(name);
			//console.log(nameLast);
			
			
			//Search everything within the page to find the name, border it, and then scroll to it
			var allElements = document.getElementsByTagName("*");
			var match_el;
			var found = false;
			for(i = allElements.length -1; i > -1; i--)
			{
				if(!allElements[i])continue;
				if(!allElements[i].innerText)continue;
				if (allElements[i].id == 'manual__agent_name' || allElements[i].innerHTML.indexOf('manual__agent_name') != -1) continue;
				
				match_el = allElements[i].innerText.toLowerCase().replace(/[^\w]/g, '');
				
				if(match_el.indexOf(name__) != -1)
				{
					console.log(allElements[i]);
					allElements[i].scrollIntoView(false); // true for top, false for bottom
					allElements[i].style.fontWeight = 'bold';
					allElements[i].style.zoom = '2';
					
					all_elements_zoomed.push(allElements[i]); // ADD RESET
					
					found = true;
					break;
				}
			}
			// last name, only if !found
			if (!found) {
				for(i = allElements.length -1; i > -1; i--)
				{
					if(!allElements[i])continue;
					if(!allElements[i].innerText)continue;
					if (allElements[i].id == 'manual__agent_name' || allElements[i].innerHTML.indexOf('manual__agent_name') != -1) continue;
					
					match_el = allElements[i].innerText.toLowerCase().replace(/[^\w]/g, '');
					
					if(match_el.indexOf(nameLast) != -1)
					{
						console.log(allElements[i]);
						allElements[i].scrollIntoView(false); // true for top, false for bottom
						allElements[i].style.fontWeight = 'bold';
						allElements[i].style.zoom = '2.4';
						
						all_elements_zoomed.push(allElements[i]); // ADD RESET
						
						break;
					}
				}
			}
		}
		// activate images function
		function KristinHowe_agent_photo_activate_images() {
			// Iterate through all images and add an image "button."
			// Background color is set from domain.
			// (getBoundingClientRect())
			// Remove all images from any previous runs.
			
			// remove old
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			var i;
			for (i=a.length - 1;i>=0;i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			var a = document.getElementsByClassName('manual__exe_div_162435168649');
			for (i=a.length - 1;i>=0;i--) {
				if (!a[i]) continue;
				if (!a[i].href) continue;
				a[i].parentNode.removeChild(a[i]);
			}
			//var a = document.getElementsByTagName('img');
			
			
			// new
			var bgc = (IMAGES_ARE_FZ == 1) ? 'Green' : '#aeaeae';
			var a = document.getElementsByTagName('img');
			for (var i in a) {
				if (i == 'length') break;
				if (!a[i].src || a[i].src == '') continue;
				KristinHowe_agent_photo_images__add_image(a[i], 200); // ABOVE !!
				KristinHowe_agent_photo_images__add_image(a[i], 20);
				KristinHowe_agent_photo_images__add_image(a[i], -200);
			}
			
			
			
			// Send to parent/job window
			// Write value to db
			var a = document.getElementsByClassName('manual__exe_image_162435168649');
			for (var i in a) {
				a[i].onclick = function() {
					this.style.border = '4px solid LightGreen';
					
					// show debug
					var x = this.parentNode;
					x.appendChild(document.createElement('br'));
					x.appendChild(document.createTextNode(AGENT_NAME));
					x.appendChild(document.createElement('br'));
					x.appendChild(document.createTextNode(this.src));
					
					var u;
					u = 'http://192.168.1.6/mturk/util6.php'+
						'?kristin_howe_photos__complete_name='+
						encodeURIComponent(AGENT_NAME)+
						'&kristin_howe_photos__complete_site='+
						encodeURIComponent(document.getElementById('manual__domain').value) +
						'&kristin_howe_photos__complete_image_url='+
						encodeURIComponent(this.src);
						
					var x = this;
					GM_xmlhttpRequest({
						method: 'GET',
						url: u,
						onload: function (response) {
							var rs = response.responseText;
							if (rs.trim() != '')
								alert(rs);
							x.style.border = '8px dashed #aeaeae';
						}
					});
				}
			}
		}
		
		MT___all_pages_extend();
		// Extend the page!
		// (THIS WOULD BE ZOOM ALL PAGES)
		//MT___all_pages_zoom();
		
		// Set the tool values before listening for a parent window.
		// Then let the parent window set the values.
		document.getElementById('manual__domain').value = href;
		KristinHowe_agent_photo_DB_load(href);
		
		// TODO
		// Add "no load image buttons" to current session. Or to mysql by domain?
		// 
		
		// Listen for the parent window function
		// and then use it to retrieve the required agent_name
		// and the required URL.
		// format: "#HOWEPAGE#AGENT_NAME" + name + "#URL" + SITE
		function KristinHowe_receiveMessage(event)
		{
			var loc = event.data;
			if (loc.indexOf('#HOWEPAGE#AGENT_NAME') === 0) {
				if (/#HOWEPAGE#AGENT_NAME([^#]*)#URL([^#]*)$/.exec(loc))
				{
					
					// WINDOW_NAMED
					if (WINDOW_NAMED)
						return;
					// WINDOW_NAMED set true
					WINDOW_NAMED = true;
					
					console.log('Received');
					console.log(event.data);
					
					// Quit parent
					// never quit parent
					//parent.postMessage('complete', "*");
					
					// Window.name
					window.name = loc;
					
					// Agent name
					var nameReg = /#AGENT_NAME([^#]+)/;
					var name = decodeURIComponent(nameReg.exec(loc)[1]);
					// Set the global agent_name var
					AGENT_NAME = name;
					
					if (name.trim() != '') {
						
						// SET THE AGENT SPAN VALUE
						document.getElementById('manual__agent_name').innerText = name;
						// call func.
						KristinHowe_agent_photo_scrollIntoView();
					}
						
					// Set the domain tools values using "domain"
					var domain = decodeURIComponent(/#URL([^#]*)$/.exec(loc)[1]);
					// Set the info box "domain" value to match parent's request
					document.getElementById('manual__domain').value = domain;
					
					// Start sending messages to any iframes on the page
					var ifr_intv = setInterval(function() {
						var a = document.getElementsByTagName('iframe');
						for (var i in a) {
							if (a[i] == 'length') break;
							a[i].contentWindow.postMessage('#HOWEPAGE#AGENT_NAME' + encodeURIComponent(name) + "#URL" + encodeURIComponent(domain), "*");
						}
					}, 1000);
					
					KristinHowe_agent_photo_DB_load(domain);

					//window.name = "#AGENT_NAME" + name;
				}
			}
			//~ else //the name is in the window
			//~ {
				//~ var nameReg = /#AGENT_NAME([^#]+)/;
				//~ //console.log("here");
				//~ console.log(window.name.match(nameReg));
				//~ var name = nameReg.exec(window.name)[1].trim();
				//~ console.log(name);
			//~ }
			//console.log("WINDOW NAME: "+window.name);
			//return;
		}
		
		/*//Create a button to get the directory page
		d = document.createElement('input');
		d.setAttribute('id','d2c');
		d.setAttribute('type','text');
		document.body.appendChild(d);
		var d2c = document.getElementById('d2c');
		d2c.style.position='fixed';
		d2c.style.top='0px';
		d2c.style.left='0px';
		d2c.style.width='10%';
		d2c.value = 'Directory';
		d2c.onclick = function() {
			this.style.backgroundColor = 'lime';
		}
		//Create a button to say there are no images on this site
		d = document.createElement('input');
		d.setAttribute('id','d2a');
		d.setAttribute('type','button');
		document.body.appendChild(d);
		var d2a = document.getElementById('d2a');
		d2a.style.position='fixed';
		d2a.style.top= '15px';
		d2a.style.left='0px';
		d2a.style.width='10%';
		d2a.value = 'No images';
		d2a.onclick = function() {
			this.style.backgroundColor = 'lime';
		}
		//Create a button to say there are no ppl
		d = document.createElement('input');
		d.setAttribute('id','d2b');
		d.setAttribute('type','button');
		document.body.appendChild(d);
		var d2b = document.getElementById('d2b');
		d2b.style.position='fixed';
		d2b.style.top= '30px';
		d2b.style.left='0px';
		d2b.style.width='10%';
		d2b.value = 'No ppl';
		d2b.onclick = function() {
			this.style.backgroundColor = 'lime';
		}*/
		/**
		 * Old code for scrolling to the image (given that we already know the image)
		 * Also attempts (but usually fails) to make all images "hot"
		 * var allImages = document.getElementsByTagName("img");
		for(i in allImages)
		{
			if(allImages[i].src)
			{
				if(allImages[i].src == imageURL)
				{
					console.log("FOUND ONE");
					allImages[i].style.border = "10px dotted green";
					allImages[i].scrollIntoView();
					//allImages[i].class = ""; doesn't seem to work
				}

				allImages[i].onclick = function(e){
							console.log(this.src);
						}
			}
		}**/
	}
	
	//
	// Kristin Howe All Pages notes
	//
	if (LOC__ == 'http://localhost/?kristin_howe_test_pruaz') {
		
		//
		document.body.innerHTML = '<textarea id="i"></textarea>';
		//init
		kristin_howe_add_agents__pruaz(1);
		
		function kristin_howe_add_agents__pruaz(num) {
			GM_xmlhttpRequest({
				method: "POST",
				url: 'http://realtyconnectusa.com/meet.asp',
				data: 'http://realtyconnectusa.com/meet.asp'+num, // 1
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					var rs=response.responseText;
					
					if (response.status != 200) {
						console.log(response.status);
						return;
					}
					
					//console.log(rs);
					
					var x = rs.indexOf('<div id="main_content">');
					if (x != -1)
						rs = rs.substr(x);
					document.getElementById('i').value += rs+"\n\n\n";
					//return;
					num = Math.round(num*1 + 1);
					if (num <= 6)
						kristin_howe_add_agents__pruaz(num);
				}
			});
		}
	}
	if (LOC__ == 'http://localhost/?kristin_howe_test_pruaz_GET') {
		
		//
		document.body.innerHTML = '<textarea id="i"></textarea>';
		//
		urls = [
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1022',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1023',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1025',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1026',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1027',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1545',
			'http://prudentialselectohio.idxre.com/idx/officeRoster.cfm?cid=44515&oid=1567'
		]
		//init
		kristin_howe_add_agents__pruaz(0);
		
		function kristin_howe_add_agents__pruaz(num) {
			GM_xmlhttpRequest({
				method: "get",
				url: urls[num],
				onload: function(response) {
					var rs=response.responseText;
					
					if (response.status != 200) {
						console.log(response.status);
						return;
					}
					
					//console.log(rs);
					
					//var x = rs.indexOf('<div id="main_content">');
					//if (x != -1)
					//	rs = rs.substr(x);
					//document.getElementById('i').value += rs+"\n\n\n";
					//return;
					num = Math.round(num*1 + 1);
					if (num < urls.length)
						kristin_howe_add_agents__pruaz(num);
				}
			});
		}
	}
	
	//
	// Textarea ondblclick, all pages
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			RUN__ALL_PAGES_TEXTAREA
		)
	{
		document.ondblclick = function(event) {
			var d;
			d = document.createElement('textarea');
			//d.setAttribute('id','MT___textarea___');
			d.setAttribute('style','\
				position:absolute;\
				top:'+Math.round(event.clientY + document.body.scrollTop)+'px;\
				left:'+Math.round(event.clientX + document.body.scrollLeft)+'px;\
				width:300px;\
				height:80px;\
				z-index:10000000000000000000000000000000000000000000000000000000000000;\
				background-color:#fefeff;\
				border:4px dashed #0a0a0a;\
			');
			d.value = "\n"+document.location.href;
			d.onkeyup = function(e) {
				//console.log(this);
				//console.log(e);
				//console.log(e.keyCode);
				//console.log(e.charCode);
				if (e.keyCode == 27) {
					this.parentNode.removeChild(this);
				}
			}
			document.body.appendChild(d);
			//var d = document.getElementById('MT___textarea___');
		}
	}
	
	//
	// Email scrollIntoView all pages
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('https://www.mturk.com') == -1 &&
			loc.indexOf('https://www.mturkcontent.com') == -1 &&
			loc.indexOf('https://s3.amazonaws.com') == -1 &&
			//loc.indexOf('facebook.com') == -1 &&
			0 == 1
		)
	{
		MT___all_pages_highlightEmailAddresses();
	}
	
	
	function MT___all_pages_highlightEmailAddresses(scrollIntoView, regex_highlight) { // scrollIntoView true/false
		var scrollIntoView = scrollIntoView;
		
		
		var el = document.body.getElementsByTagName("*");
		
		var last_el = false;
		
		var r;
		var by_email = true;
		if (!regex_highlight)
			r = /^([a-z0-9]+([_\.-][a-z0-9]+)*(@|[ ]{0,}\[at\][ ]{0,}|&#064;)([a-z0-9]+([\.-][a-z0-9]+)*)+\.[a-z]{2,})$/i;
		else {
			by_email = false;
			r = regex_highlight;
		}
		
		console.log(r);
		
		var arrMatchedStrings = [];
		var el_innerText;
		var reset_all_items = []; // this will contain reset zooms!
		
		for (var i = el.length - 1; i>=0; i--) {
		//~ for (var i in el) {
		//~ for (var i in el) {
			if (!el[i]) continue;
			if (!el[i].innerText) continue;
			if (!el[i].tagName) continue;
			if (el[i].tagName.toUpperCase() == 'SCRIPT') continue;
			if (el[i].tagName.toUpperCase() == 'STYLE') continue;
			
			if  (
				el[i].innerText.indexOf('@') == -1 &&
				el[i].innerText.indexOf('[at]') == -1 &&
				el[i].innerText.indexOf('&#064;') == -1 &&
				by_email
				//~ !regex_highlight // !!
				)
			{
				continue;
			}
			
			// ...
			el_innerText = el[i].innerText.trim();
			
			//~ if (r != /\.youtube\.com/i)
			//~ {
				//~ el_innerText = el[i].innerText.trim();
			//~ }
			//~ else
			//~ {
				//~ el_innerText = el[i].innerHTML;
			//~ }
			
			// replace prev. matched
			for (var j in arrMatchedStrings) {
				el_innerText = el_innerText.replace( // replaces first occurrence
					arrMatchedStrings[j],
					''
				);
			}
			
			//~ console.log(el[i].innerText);
			//~ console.log(el_innerText);
			
			if (r.exec(el_innerText)) {
				
				if (!last_el)
					last_el = el[i];
				
				arrMatchedStrings.push(el[i].innerText.trim());
				//~ if (r != /\.youtube\.com/i)
				//~ {
					//~ arrMatchedStrings.push(el[i].innerText.trim());
				//~ }
				//~ else
				//~ {
					//~ arrMatchedStrings.push(el[i].innerHTML.trim());
				//~ }
				
				
				console.log(el[i]);
				
				reset_all_items.push(el[i]);
				
				el[i].style.fontWeight = 'bold';
				el[i].style.zoom = '2';
				el[i].style.border = '10px dashed #a2a2a2;';
				//~ el[i].style.fontSize = '1.2em';
				//~ el[i].style.zoom = '2';
				
				//~ el[i].parentNode.style.border = '4px dashed #a2a2a2;';
			
				//break; // BREAK HERE ... IF FIRST...
			}
		}
		
		//~ console.log(arrMatchedStrings);
		
		if (last_el && scrollIntoView) {
			//last_el.parentNode.scrollTop = last_el.offsetTop - last_el.parentNode.offsetTop;
			
			// ...
			setTimeout(function() {
				last_el.scrollIntoView(false); // BOTTOM
			}, 600);
			
			// addEventListener
			window.addEventListener('dblclick', function() {
				
				console.log('reset_all_items');
				console.log(reset_all_items);
				
				if (!reset_all_items.length) return;
				
				for (var i in reset_all_items) {
					reset_all_items[i].style.fontWeight = '';
					reset_all_items[i].style.zoom = '';
					reset_all_items[i].style.border = '';
					document.body.scrollIntoView(true); // true == align with top
				}
			}, false);
		}
		
		console.log('arrMatchedStrings');
		console.log(arrMatchedStrings);
		
		return arrMatchedStrings; // RETURNS!
		
		//}, 800);  // !!
	}
	
	function MT___all_pages_highlightText(regex_highlight, scrollIntoView) {
		MT___all_pages_highlightEmailAddresses(scrollIntoView, regex_highlight);
	}
	
	if(HIGHLIGHT_UK_COUNTIES) {
		for(var county in allUkCounties) {
			if(county) {
				document.body.innerHTML = document.body.innerHTML.replace((new RegExp(county,'gi')), '<span style="background-color:yellow">'+county+'</span>');
			}
		}
	}


	if  (
			//~ loc.indexOf('https://www.mturk.com') == -1 &&
			//~ loc.indexOf('https://www.mturkcontent.com') == -1 &&
			//~ loc.indexOf('https://s3.amazonaws.com') == -1 &&
			RUN__ALL_PAGES_ZOOM
		)
	{
		MT___all_pages_zoom();
	}
	function MT___all_pages_zoom() {
		document.body.style.zoom = "70%";
	}
	//
	// Extend all pages
	// 
	if  (
			RUN__ALL_PAGES_EXTEND
		)
	{
		MT___all_pages_extend();
	}
	function MT___all_pages_extend() {
		// lengthen
		var d;
		d = document.createElement('div');
		d.setAttribute('id','d1');
		d.setAttribute('style','height:2400px;background-color:pink;');
		document.body.appendChild(d);
	}
	//
	// Show href all pages
	// 
	//~ if  (
			//~ RUN__ALL_PAGES_EXTEND
		//~ )
	//~ {
		//~ MT___all_pages_showhref();
	//~ }
	function MT___all_pages_showhref() {
		
		// Does "add_panel" div exist?
		// If it does then add to div. Else
		// if it does not then add to page.
		var add_panel = document.getElementById('DIV_ADD_PANEL__RANDOM_71765847293864762532874523764');
		if (add_panel) {
			MT___all_pages_showhref__input(add_panel);
		} else {
			MT___all_pages_showhref__input(false);
		}
		
		function MT___all_pages_showhref__input(div) {
			var d = document.createElement('input');
			d.value = document.location.href;
			d.addEventListener('keydown', function(e) { //?
				var k = e.keyCode;
				console.log(k);
				if (k == 27) {
					this.parentNode.removeChild(this);
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			}, false);
			d.addEventListener('blur', function() { // change src
				document.location.href = this.value;
			}, false);
			
			if (!div) {
				d.setAttribute('style','position:fixed;top:0;left:0;width:10%;height:30px;z-index:1000000000;border:4px solid orange;background-color:#eee;');
				document.body.appendChild(d);
			} else {
				d.setAttribute('style','width:100%;height:30px;z-index:1000000000;');
				div.appendChild(d);
			}
		}
		
		//~ d.setAttribute('style','position:absolute;top:0;left:0;width:10%;height:30px;z-index:1000000000;border:4px solid orange;background-color:#eee');
		//~ d.addEventListener('mouseover', function() {
			//~ this.select();
		//~ }, false);
		//~ d.addEventListener('dblclick', function(e) {
			//~ this.parentNode.removeChild(this);
		//~ }, false);
	}
	
	/**
	 * REQUESTER TASKS
	 * 
	 * Andrew Ryan
	 * Router
	 * Dan Shaffer
	 * Adam Montgomery
	 * 
	 * NOTES:
	 * 
	 * 
	 * 
	 */
	
	/**
	 * Andrew Ryan Hangouts
	 * RUN__ALL_PAGES__Andrew_Ryan_Hangouts
https://hangoutsapi.talkgadget.google.com/hangouts/_?gid=135569030656&gd={"number":"6072385144"}
https:// ....>> .googleusercontent.com/gadgets/ifr
	 */
	var loc = document.location.href;
	if (
			(
			loc.indexOf('https://hangoutsapi.talkgadget.google.com/hangouts/_/') != -1
			)
		&&
		RUN__ALL_PAGES__Andrew_Ryan_Hangouts
		)
	{
		var ARH = function() {
		}
		ARH.prototype.run = function() {
			
			console.log('Run');
			this.watch_close_btn();
			
		}
		ARH.prototype.click_confirm_btn = function() {
			var intv = setInterval(function() {
				
				//~ var el = document.getElementById(':yr.bs');
				var el = null;
				var x = document.getElementsByTagName('div');
				for (var i in x) {if (i == 'length') break; if (x[i].innerText == 'Yes') { el = x[i]; } }
				if (!el) {
					
					// NEVER STOP THE INTERVAL
					//~ clearInterval(intv);
					
					// Go to next stage?
					return;
				}
				
				//~ console.log('Confirm button is here?');
				
				// Important: Does it say "free"?
				// Is this the CONFIRM BUTTON?
				if  (
					document.body.innerHTML.indexOf('Would you like to make the call? This call is free.') == -1 ||
					document.body.innerHTML.indexOf('is attempting to make a telephone call ') == -1
					)
				{	
					return;
				}
					
				// Still here
				// Fire event
				var myEvt = document.createEvent('MouseEvents');
				myEvt.initEvent(
				   'mousedown'      // event type
				   ,true      // can bubble?
				   ,true      // cancelable?
				);
				el.dispatchEvent(myEvt);
				var myEvt = document.createEvent('MouseEvents');
				myEvt.initEvent(
				   'mouseup'      // event type
				   ,true      // can bubble?
				   ,true      // cancelable?
				);
				el.dispatchEvent(myEvt);
				
				//~ console.log('Tried to dispatch event.');
			}.bind(this), 300);
			//~ }.bind(this), 60);
		}
		ARH.prototype.watch_confirm_btn = function() {
			console.log('Watch confirm');
			var intv = setInterval(function() {
				var el = null;
				var x = document.getElementsByTagName('div');
				for (var i in x) {if (i == 'length') break; if (x[i].innerText == 'Yes') { el = x[i]; } }
				//~ var el = document.getElementById(':yr.bs');
				if (el) {
					clearInterval(intv);
					this.click_confirm_btn();
				} else {
					return;
				}
			}.bind(this), 60);
		}
		ARH.prototype.click_close_btn = function() {
			var intv = setInterval(function() {
				
				//~ var el = document.getElementById(':sd.zf');
				var el = null;
				var x = document.getElementsByTagName('div');
				for (var i in x) {if (i == 'length') break; if (x[i].innerText == 'Close') { el = x[i]; } }
				if (!el) {
					clearInterval(intv);
					// Go to next stage
					// Watch for OK button
					this.watch_confirm_btn();
					return;
				}
				
				console.log('Close button is here?');
				
				// Still here
				// Fire event
				var myEvt = document.createEvent('MouseEvents');
				myEvt.initEvent(
				   'mousedown'      // event type
				   ,true      // can bubble?
				   ,true      // cancelable?
				);
				el.dispatchEvent(myEvt);
				var myEvt = document.createEvent('MouseEvents');
				myEvt.initEvent(
				   'mouseup'      // event type
				   ,true      // can bubble?
				   ,true      // cancelable?
				);
				el.dispatchEvent(myEvt);
				
				console.log('Tried to dispatch event.');
			}.bind(this), 60);
		}
		ARH.prototype.watch_close_btn = function() {
			console.log('Watch close');
			var intv = setInterval(function() {
				//~ var el = document.getElementById(':sd.zf');
				var el = null;
				var x = document.getElementsByTagName('div');
				for (var i in x) {if (i == 'length') break; if (x[i].innerText == 'Close') { el = x[i]; } }
				if (el) {
					clearInterval(intv);
					this.click_close_btn();
				} else {
					return;
				}
			}.bind(this), 60);
		}
		//~ new ARH().run();
		//~ new ARH().run();
		new ARH().click_confirm_btn();
		return;
	}
	//~ /**
	 //~ * Andrew Ryan Hangouts
	 //~ * RUN__ALL_PAGES__Andrew_Ryan_Hangouts
//~ https:// ....>> .googleusercontent.com/gadgets/ifr
	 //~ */
	//~ var loc = document.location.href;
	//~ if (
			//~ (
			//~ loc.indexOf('.googleusercontent.com/gadgets/ifr') != -1
			//~ )
		//~ &&
		//~ RUN__ALL_PAGES__Andrew_Ryan_Hangouts
		//~ )
	//~ {
		//~ 
	//~ }
	/**
	 * Router block domains list
	 * http://192.168.1.1/keyword.cgi?id=340797201
	 */
	var loc = document.location.href;
	if (
			(
			loc.indexOf('192.168.1.1/keyword.cgi') != -1
			)
		&&
		1 == 0
		)
	{
		console.log('');
		
		// Load file of domains
		// Scrape page for existing domains?
		// Iterate through file with POST requests (check 200)
		
		//~ // Choose the first as TO ADD
		//~ // Remove TO ADD and save to file
		//~ // Enter TO ADD and submit form
		
		var list = [];
		
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://192.168.1.2/development/.misc/hosts',
			onload: function(response) {
				var rs=response.responseText;
				
				if (response.status != 200) {
					console.log('x1');
					return;
				}
				
				list = rs.trim();
				list = list.replace(/\n#[^\n]*/g, '\n');
				list = list.replace(/127\.0\.0\.1 */g, '');
				list = list.replace(/ *#[^\n]*/g, '');
				list = list.replace(/\n+/g, '\n');
				list = list.trim();
				
				list = list.split('\n');
				console.log(list.length + ' domains');
				
				set_domain_and_make_post();
			}
		});
		
		function set_domain_and_make_post() {
			
			var domain = list.shift().trim();
			while(domain.indexOf('#') == 0 || domain.trim() == '') {
				domain = list.shift().trim();
				domain = domain.replace(/ [^\r\n]*/, '');
				domain = domain.replace(/^(www2?\.)/, '');
				if (list.length == 0) break;
				//localhost.localdomain localhost 
			}
			
			if (domain.indexOf('#') == 0 || domain.trim() == '') {
				return;
			}
			
			GM_xmlhttpRequest({
				method: "POST",
				url: 'http://192.168.1.1/keyword.cgi?id=140132133',
				data: 'skeyword=never&cfKeyWord_Domain='+encodeURIComponent(domain)+'&cfKeyWord_AddKeyword=Add+Keyword&bs_enable=0&bs_trustedip_enable=0&bs_trustedip=192.168.1.0',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					var rs=response.responseText;
					
					if (response.status != 200) {
						console.log('x2');
						return;
					}
					
					console.log('success ' + domain + ' ' + list.length);
					set_domain_and_make_post();
				}
			});
		}
	}
	/**
	 * Dan Shaffer
	 * Website Evaluation Task
	 * aka Google?
	 */
	var loc = document.location.href;
	if (
			(
			loc.indexOf('https://www.google.com/evaluation/endor/mturk') != -1 ||
			loc.indexOf('http://localhost/mturk/.dev/HITs/Dan_Shaffer_mturk') != -1 
			)
		&&
		1 == 1
		)
	{
		console.log('');
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		GM_addStyle('.exe:hover {background-color:LightGreen;cursor:pointer;}');
		
		var a = document.getElementsByTagName('a')[0].href;
		var o = {
			domain: null,
			url: null,
			name: null
		}
		//~ o.domain = /var url = '([^']+)';/.exec(document.body.innerHTML)[1]; //tycois.com
		//~ o.url = 'http://'+domain;
		o.url = a;
		o.name = o.url.replace(/(www\.|\.\w{1,3})/g, '');
		
		
		/*BEGIN ITEMS*/
		// Iframe
		var d1 = document.createElement('iframe');
		d1.setAttribute('style','position:absolute;top:400px;left:0%;width:99%;height:500px;border:1px solid blue;visibility:hidden;sandbox:allow-scripts allow-same-origin;');
		document.body.appendChild(d1);
		d1.addEventListener('mouseover', function() {
			this.scrollIntoView();
		}, false);
		d1.addEventListener('mouseout', function() {
			document.body.scrollIntoView();
		}, false);
		d1.addEventListener('load', function() {
			this.style.visibility = 'visible';
		}, false);
		d1.src = o.url;
		/*END ITEMS*/
		
		// Tell child to zoom out & extend
		var ifr_intv = setInterval(function() {
			d1.contentWindow.postMessage({
				task: 'AMT__all_pages_util',
				MT___all_pages_extend: true,
				MT___all_pages_zoom: true,
				MT___all_pages_showhref: true,
				highlight_range_to_parent: {completion_key: 'Dan_Shaffer_site_eval'},
				//~ highlight_ranges_to_parent: {task: 'Dan_Shaffer_site_eval'},
				//~ global__highlight_photos: {completion_key: 'Evan_J_Emp_Images'},
				//~ person_name_zoom: o.name
			}, "*");
		}, 1000);
		// Watch for complete
		window.addEventListener("message", Dan_Shaffer_site_eval__iframe_complete, false);
		/**
		 * Function Dan_Shaffer_site_eval__iframe_complete
		 */
		function Dan_Shaffer_site_eval__iframe_complete(event) {
			var v = event.data;
			
			if (v.key == 'Dan_Shaffer_site_eval' && v.hasOwnProperty('text_range')) {
				// Text = v.text_range
				document.getElementById('sitename').value = v.text_range.trim();
				document.getElementById('sitename').focus();
				document.body.scrollIntoView();
			}
		}
		
		
		// innerHeight
		new AMT___core_factory().el_innerHeight({
			// This set the elements d1,d1b, and d1c
			// to fill up the whole window, minus their
			// distance from page top (top:XX pixels;).
			elements: [
				d1
			],
			offset: 40 // offset top
		});
		
		//
		var inputs = document.querySelectorAll('input[type="radio"]');
		for (var i in inputs) {
			if (i == 'length') break;
			if (inputs[i].value == 'no') inputs[i].checked = true;
			inputs[i].onclick = function(e){
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			// ParentNode
			var pn = inputs[i].parentNode;
			pn.className = 'exe';
			pn.el = inputs[i];
			pn.onclick = function(e) {
				this.el.checked = true;
				e.stopPropagation();
				e.preventDefault();
				return false;
			};
		}
	}
	
	//
	// Adam Montgomery
	// Download/Upload PDF
	// Nov. 29, 2013
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('http://www.ahridirectory.org/ahridirectory/pages/ac/defaultSearch.aspx?id=') != -1 &&
		1 == 1
		)
	{
		if (ih.indexOf('AHRI Certified Reference Number') != -1) {
			var x = /\?id=(\d+)/.exec(loc);
			if (x) {
				document.getElementById('ctl00_cp1_search1_l1_ariReferenceNumber').value = x[1];
				if (ih.indexOf('To search, enter the code in the picture above') == -1)
					document.getElementById('ctl00_cp1_search1_searchButton').click();
				else {
					//focus
					document.getElementsByName('ctl00$cp1$search1$captcha')[0].focus();
				}
				
			}
			return;
		}
		else {
			//<a href="../../controls/CommonHandler.ashx?AHRIRefNumber=6392411&AHRIProgram=AC&ModelNumber=24ANB148A**31" title="Energy Guide label">
			var r =  /<a href="\.\.\/\.\.(\/controls\/CommonHandler\.ashx\?AHRIRefNumber=[^"]+)" title="Energy Guide label">/.exec(ih);
			if (r) {
				GM_xmlhttpRequest({
					method: "GET",
					url: 'http://www.ahridirectory.org/ahridirectory'+r[1],
					onload: function(response) {
						var rs=response.responseText;
						
						if (response.status != 200)
							console.log('x');
							return;
						
						/*GM_xmlhttpRequest({
							method: "POST",
							url: 'http://localhost/mturk/util6.php',
							data: 'aaron_zwas_hotelsDaemon_save='+encodeURIComponent(JSON.stringify(elements))+'&aaron_zwas_hotelsDaemon_Id='+page_id,
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							onload: function(response) {
								var rs=response.responseText;
							}
						});*/
					}
				});
				
			}
			return;
		}
	}
	
	//
	// Aaron Zwas 
	// Google Hotels
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('https://www.google.com/hotels/#search;l=') != -1 &&
			0 == 1
		)
	{
		
		var page_id;
		
		//https://www.google.com/hotels/#search;l=Myrtle+Beach,+SC;d=2013-11-30;n=12;usd=1;si=;av=r
		page_id = /l=([^;]+);d=(\d{4}-\d{2}-\d{2});n=(\d+);/.exec(loc);
		//page_id = decodeURIComponent(page_id[1]) + '|' + page_id[2] + '|' + page_id[3];
		//page_id = encodeURIComponent(page_id);

		page_id = encodeURIComponent(decodeURIComponent(page_id[1].replace(/\+/g, '%20'))); // encoded
		
		var elements_intv = setInterval(function() {
			var x = document.getElementsByClassName('GKD3WH3DNWC');
			if (!x.length) {
				return;
			}
			//if (x.length != 50) {
			//	return;
			//}
			clearInterval(elements_intv);
			
			setTimeout(function() {
				// just in case, wait load
				aaron_zwas_hotels_daemon();
			}, 200);
		}, 200);
		
		function aaron_zwas_hotels_daemon() {
			var x = document.getElementsByClassName('GKD3WH3DNWC');
			
			var elements = [];
			for (var i in x) {
				if (!x[i]) continue;
				if (!x[i].innerHTML) continue;
				elements.push(x[i].innerHTML);
			}
			GM_xmlhttpRequest({
				method: "POST",
				url: 'http://localhost/mturk/util.php',
				data: 'aaron_zwas_hotelsDaemon_save='+encodeURIComponent(JSON.stringify(elements))+'&aaron_zwas_hotelsDaemon_Id='+page_id,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					var rs=response.responseText;
					
					if (rs != '1') { // check ok
						alert(rs);
						return;
					}
					
					var next_intv = setInterval(function() {
						GM_xmlhttpRequest({
							method: "GET",
							url: 'http://localhost/mturk/util.php?aaron_zwas_hotelsDaemon_getQueue=&'+Math.random()*1000,
							onload: function(response) {
								var rs = response.responseText;
								
								rs = rs.trim();
								
								if (rs == '') {
									return;
								}
								clearInterval(next_intv);
								
								//location.replace('https://www.google.com/hotels/#search;l='+encodeURIComponent(rs)+';d=2014-03-12;n=1;usd=1;si=;av=r');
								window.location = 'https://www.google.com/hotels/#search;l='+encodeURIComponent(rs)+';d=2014-03-12;n=1;usd=1;si=;av=r';
								location.reload(true);
							}
						});
					}, 160);
				}
			});
			// write
		}
	}
	
	//
	// Manta.com CAPTCHAs
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('http://www.manta.com') === 0
		)
	{
		if  (
			ih.indexOf('It looks like you\'ve been very active on Manta&mdash;and that\'s great! Do us a favor and confirm you are human by filling out the bold type below.') != -1 ||
			ih.indexOf('It looks like the characters you entered did not match the image. Please help us out by reentering the characters in bold type below.') != -1
			)
		{
			setInterval(function() {
				var x = document.getElementById('captchaInput');
				if (x) {
					x.focus();
				}
			}, 200);
			return;
		}
	}
	
	//
	// Some MIT Task
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('http://wednesday.csail.mit.edu/joseph_result/city_tour_kwon/select_img_closer.php?') === 0 &&
			1 == 1
		)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea,font {margin:0;padding:0;font-size:10px;}');
		
		var clicks = 0;
		
		window.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			console.log(k);
			if (k == 79) { //o
				document.getElementById('img'+Math.floor(Math.random()*4)).click();
				clicks++;
			}	
			else if (k == 80) { //p
				document.getElementById('img'+Math.floor(Math.random()*4+4)).click();
				clicks++;
			}
			// dn98 end97 p80 o79
		}, true);
		
		window.addEventListener('focus', function(e) {
			document.body.style.backgroundColor = 'LightGreen';
		}, true);
		window.addEventListener('blur', function(e) {
			document.body.style.backgroundColor = 'white';
		}, true);
		
		var xint = setInterval(function() {
			var x = document.getElementById('confirm');
			if (x) {
				if (!x.disabled) {
					x.click();
				}
			}
		}, 60);
		var xint = setInterval(function() {
			var x = document.getElementById('done');
			if (x) {
				if (x.style.visibility != 'hidden') {
					x.click();
					clearInterval(xint);
				}
			}
		}, 60);
	}
	
	
	//
	// Trevor Faden - Gopi Parikh - Janet Lee
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('http://researchcu.ncua.gov/') === 0 &&
			1 == 1
		)
	{
		GM_addStyle('body,p,h3,h4,ul,li,form {margin:0;padding:0;font-size:12px;}');
		var write = false;
		var rg = /http:\/\/researchcu\.ncua\.gov\/Views\/FindCreditUnions\.aspx\?n=([\d]+)/.exec(document.location.href);
		if (rg) {
			var theForm = document.forms['aspnetForm'];
			document.getElementById('ctl00_MainContent_txtCharterNumber').value = rg[1];
			theForm.__EVENTTARGET.value = 'ctl00$MainContent$ButtonFindQuick';
			theForm.__EVENTARGUMENT.value = '';
			//theForm.submit();
			document.onmousemove = function() {
				document.onmousemove = function() { return true; }
				theForm.submit();
			}
		
		} else if (document.location.href == 'http://researchcu.ncua.gov/Views/creditUnionInfo.aspx') {
			var rg=/Charter Number:&nbsp;&nbsp;<\/td>[\r\n\t\s]+<td class="FieldCell_1">([\d]+)<\/td>[\r\n\t\s]+<\/tr>[\r\n\t\s]+<tr style="font-size:1\.5em;line-height:18px;color: Black; background-color:#FFF;">[\r\n\t\s]+<td class="LabelCell">Credit Union Name:&nbsp;&nbsp;<\/td>[\r\n\t\s]+<td class="FieldCell_1">([^<]+)/.exec(ih);
			if (rg) {
				rg[2] = __js_clean_html_str(rg[2]);
				//rg[2] = rg[2].replace(/&amp;/g, '&');
				GM_xmlhttpRequest({
					method: "GET",
					url: 'http://localhost/mturk/mturk-trevor-faden.php?n='+encodeURIComponent(rg[1])+'&cuname='+encodeURIComponent(rg[2]),
					onload: function(response) {
						var rs=response.responseText;
						if (rs == '1') {
							
							// AFTER ABOUT 30 SECONDS
							// THE PARENT WINDOW NEEDS TO RELOAD
							// ON MTURKCONTENT.COM.
							document.getElementById('ctl00_MainContent_MyCaptcha1_TxtCpatcha').onkeyup = function() {
								//console.log(this.value);
								if (this.value.length >= 5) {
									document.getElementById('ctl00_MainContent_MyCaptcha1_TxtCpatcha').onkeyup = function() {};
									//document.getElementsByName('ctl00$MainContent$GetCallReport')[0].focus();
									
									document.getElementsByName('ctl00$MainContent$GetCallReport')[0].click();
									//~ setInterval(function() {
										//~ document.body.style.backgroundColor = 'blue';
										//~ document.getElementsByName('ctl00$MainContent$GetCallReport')[0].click();
									//~ }, 2000);
									
									// Do this here.
									this.blur();
									
									//~ 
									//~ // SET A TIMEOUT TO CLICK
									//~ // This is just in case it does not go though. (Bug)
									//~ setTimeout(function() {
										//~ document.getElementsByName('ctl00$MainContent$GetCallReport')[0].click();
									//~ }, 10000);
									//~ setTimeout(function() {
										//~ document.getElementsByName('ctl00$MainContent$GetCallReport')[0].click();
									//~ }, 20000);
									
									//new AMT___core_factory().nextTab();
									chrome.extension.sendRequest({allPagesNextTab: true, options:{tellNextPageThatItIsOkayToRun: true, websocketNextWindow:true}},
									function(response) {
										//squelch response
									});
									
									/**chrome.extension.sendRequest({nextWindow: true, option:'tellNextPageThatItIsOkayToRun'},
									function(response) {
										//squelch response
									});**/

									//~ //this.focus();
									//~ this.blur(); // remove focus!
									
								}
							}
							
							// move image
							var x;
							x = document.getElementsByTagName('img')[1];
							x.style.position = 'absolute';
							x.style.top = '0px';
							x.style.left = '0px';
							x = document.getElementById('ctl00_MainContent_MyCaptcha1_TxtCpatcha');
							x.style.position = 'absolute';
							x.style.top = '80px';
							x.style.left = '0px';
							// focus
							//XX
							setInterval(function() {
								if (document.getElementById('ctl00_MainContent_MyCaptcha1_TxtCpatcha').value.length < 5)
									document.getElementById('ctl00_MainContent_MyCaptcha1_TxtCpatcha').focus();
							},200);
						}
					}
				});
			}
		}
	}
	
	//
	// Jaime Arguello
	// Use a search engine to...
	//
	//~ var loc = window.location.href;console.log(loc);
	if (loc.indexOf('http://152.2.81.210/') == 0) {
		
		if ( /copy and paste this code/.exec(ih) )
		{
			var d=document.getElementsByTagName('font')[1];
			d.innerHTML='<input type="text" onload="this.select();" onmouseover="this.select();" value="'+d.innerHTML+'" id="xx">'
			document.getElementById('xx').focus();
			document.getElementById('xx').select();
			
		}
		else if ( /name="query" size="100/.exec(ih) )
		{
			setInterval(function() {
				document.getElementsByName('query')[0].focus();
			}, 300);
		}
		else if (document.getElementById("start_task_button")) {
			if (
			!document.getElementById("start_task_button").disabled &&
			/Click "Start Task" to begin the new task./.exec(ih)
			)
			{
				
				var d=document.createElement('iframe');
				d.setAttribute('id','ifr');
				d.setAttribute('name','ifr');
				document.body.appendChild(d);
				var ifr=document.getElementById('ifr');
				ifr.style.width='100%';
				ifr.style.height='1600px';
				
				GM_addStyle('body {margin:0;padding:0;}');
				
				document.getElementById('start_task_form').target="ifr";
				
				document.getElementById("validate_code_button").disabled = false;
				document.getElementById("start_task_button").disabled = true;
				document.forms["start_task_form"].submit();
				
				var xint=setInterval(function() {
					if (document.getElementsByName('mtaskCode')[0].value != '') {
						clearInterval(xint);
						document.getElementById('validate_code_form').submit();
					}
				}, 300);
			}
			else if (document.getElementById("start_task_button").disabled && ih.indexOf('Valid Code') != -1)
			{
				setInterval(function() {
					document.getElementsByName('mtaskCode')[0].focus();
				}, 300);
			}
		}
		//
		var xint2 = setInterval(function() {
			var x=document.getElementsByName('mtaskCode');
			var y=document.getElementById('submit_hit_form');
			if (!x && !y) {
				clearInterval(xint2);
				return;
			}
			if (!x[0]) {
				clearInterval(xint2);
				return;
			}
			if (x[0].value != '') {
				clearInterval(xint2);
				y.submit();
				//alert('x');
			}
		}, 400);
		//
		var x=document.getElementsByName('submit');
		if (x) {
			if (x[0]) {
				if (x[0].value == 'Click here if this page contains the requested information') {
					x[0].click();
				}
			}
		}
	}
	
	//
	// MIT words research task
	// 
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('https://ssls.csail.mit.edu/turks/arabic_tasks/frame-based_Doha/index.html?task=restaurant-en&dataIndex=') === 0 &&
			1 == 1
		)
	{
		
		var xint = setInterval(function() {
			var x = document.getElementsByTagName('button');
			for (var i in x) {
				if (!x[i]) break;
				if (!x[i].innerHTML) break;
				if (x[i].innerText == 'Start') {
					clearInterval(xint);
					x[i].click();
				}
			}
		}, 100);
		
		// the 8 answers 
		var answers = [];
		
		// gm
		var d = /&dataIndex=(\d+)/.exec(loc)[1];
		var all_tasks;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'https://ssls.csail.mit.edu/turks/arabic_tasks/frame-based_Doha/data/'+d,
			onload: function(response) {
				var rs = response.responseText;
				
				rs = rs.trim();
				
				all_tasks = JSON.parse(rs);
				
				// show all in a div
				var show_d1_intv = setInterval(function() {
					if (!document.getElementById('d1') && document.body.innerText.indexOf('Instructions') == -1) {
						showd1();
						var task;
						for (var i in all_tasks) {
							task = all_tasks[i];
							for (var j in task) {
								d1.innerHTML += task[j][0] + ':' + task[j][1] + '<br>'; 
								//d1.innerHTML += task[j][0] + ':' + task[j][1] + '<br>'; 
							}
							d1.innerHTML = d1.innerHTML.replace(/<br>$/, '<hr>');
						}
						for (var i in answers) {
							d1.innerHTML = answers[i] + '<hr>' + d1.innerHTML;
						}
					}
				}, 100);
				
				// hotkeys mover
				
			}
		});
		function showd1() {
			var d;
			d = document.createElement('div');
			d.setAttribute('id','d1');
			document.body.appendChild(d);
			var d1 = document.getElementById('d1');
			d1.style.position='absolute';
			d1.style.top='180px';
			d1.style.left='50%';
			d1.style.marginLeft='-20%';
			d1.style.width='40%';
			//d1.style.height='600px';
			d1.style.border='1px solid blue';
			d1.style.borderBottom='2px solid blue';
			//d1.style.overflow = 'auto';
			d1.style.backgroundColor='#eee';
		}
		//keydown
		function sls_1_restaurants_keydown(e) {
			var x = e.keyCode;
			
			console.log(x);
			
			/*if  (
				(
					x >= 49 && x <= 57
				) || 
				x == 189
				)
				e.stopPropagation();*/
			
			// get num
			var num = document.getElementById('questionNum').innerText;
			num = /^\d+/.exec(num)[0]; // 1...8
			num = Math.round(num * 1);
			var answer = document.getElementsByClassName('answer')[num - 1];
			var check = document.getElementsByClassName('check bigButton')[num - 1];
			//var check = document.getElementsByClassName('check bigButton intense')[0];
			var next = document.getElementById('nextButton');
			
			if (x == 189 || x == 45) { // +
				
				if (answer.value.trim() == '') return;
				
				//if (answer.value 
				answer.value = answer.value.trim();
				answer.value += '?';
				answer.value = answer.value.replace(/\s+/g, ' ');
				//answer.value = answer.value.replace(/^(\w{1})/, ('$1').toUpperCase());
				var y = answer.value.substr(0,1);
				y = y.toUpperCase();
				answer.value = answer.value.substr(1);
				answer.value = y + answer.value;
				answer.blur();
				
				answers.push(answer.value);
				d1.innerHTML = answer.value + '<hr>' + d1.innerHTML;
				
				check.focus();
				check.click();
				
				sls_1_restaurants_mouseclick(next);
				
				// next focus
				document.getElementsByClassName('answer')[num].focus();
				//setTimeout(function() {document.getElementsByClassName('answer')[num].focus();}, 80);
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			
			// leave
			if (x > 57 || x < 54) return;
			//if (x > 57 || x < 49) return;
			
			// here?
			
			// 0-1
			// 57-9, 57,56,55,54 9-6
			var el_num;
			el_num = 57 - x; // 9 == 0, 8 == 1
			
			//
			
			//
			var task;
			task = all_tasks[num-1];//console.log(task);return;
			// [[location, x],[cuisine, y]]
			var count = 0;
			//var sentance;
			for (var i in task) { // [0,1],[0,1],[0,1]
				if (el_num == 0) {
					answer.value += ' '+task[i][1]+' ';
					break;
				}
				el_num--;
				/*by words
				 * sentance = task[i][1].split(' ');
				for (var k in sentance) {
					if (el_num == 0) {
						answer.value += ' '+sentance[k]+' ';
						break it;
					}
					el_num--;
					//if (el_num <= 0) break it;
				}*/
				
				/*for (var j in task) {
					sentance = task[j].split(' ');
					for (var k in sentance) {
						if (el_num == 0) {
							answer.value += ' '+sentance[k]+' ';
						}
						el--;
						if (el_num <= 0) break;
					}
					//el_num--;
					//d1.innerHTML += task[j][0] + ':' + task[j][1] + '<br>'; 
				}*/
			}
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
		//add
		document.addEventListener("keypress", sls_1_restaurants_keydown, false);
		// mouseclicks
		function sls_1_restaurants_mouseclick(item) {
			var myEvt;
			//
			myEvt = document.createEvent('MouseEvents');
			myEvt.initEvent(
			   'mousedown'      // event type
			   ,true      // can bubble?
			   ,true      // cancelable?
			);
			item.dispatchEvent(myEvt);
			//
			myEvt = document.createEvent('MouseEvents');
			myEvt.initEvent(
			   'mouseup'      // event type
			   ,true      // can bubble?
			   ,true      // cancelable?
			);
			item.dispatchEvent(myEvt);
		}
	}
	
	//
	// Twitter focus
	// 
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('https://twitter.com/search?q=') === 0 &&
			1 == 1
		)
	{
		setTimeout(function() {document.getElementById('search-query').focus();}, 100);
		setTimeout(function() {document.getElementById('search-query').focus();}, 400);
		setTimeout(function() {document.getElementById('search-query').focus();}, 800);
	}
	
	//
	// Brian Diez
	// http://maps.crossfit.com/?
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('http://maps.crossfit.com/') === 0 &&
			1 == 1
		)
	{
		//document.body.style.height = '2000px';
		document.getElementById('map-footer').style.height = '2000px';
		
		var a = document.getElementById('address');
		var i = /\?([^$]+)/.exec(loc);
		if (i) {
			i = decodeURIComponent(i[1]);
			a.value = i;
		}
		
		var x = document.getElementById('map-intro');
		x.getElementsByTagName('h1')[0].style.display = 'none';
		x.getElementsByTagName('p')[0].style.display = 'none';
		x.getElementsByTagName('p')[1].style.display = 'none';
		
		a.focus();
		
		
		
		/*document.getElementById('map-footer').scrollIntoView();
		a.scrollIntoView();
		
		setTimeout(function() {a.scrollIntoView();}, 100);
		setTimeout(function() {a.scrollIntoView();}, 300);
		setTimeout(function() {a.scrollIntoView();}, 500);*/
	}
	
	//
	// CROWDSOURCE
	//
	//
	//
	//
	var loc = document.location.href;
	if  (
			loc.indexOf('https://work.scalableworkforce.com/amt/view') === 0 ||
			loc.indexOf('https://work.crowdsource.com/amt/view?requesterId=A2SUM2D7EOAK1T') === 0 // new?
		)
	{
		
		// Search: Keyword on Yahoo.com
		//
		//
		var s,s2;
		s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on Yahoo\.[\w\.]+<\/h1>/;// Google.co.uk
		s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on Yahoo\.[\w\.]+<\/h1>/;// Google.co.uk
		//s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on Yahoo\.(com|co\.uk|ca)<\/h1>/;// Google.co.uk
		//s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on Yahoo\.(com|co\.uk|ca)<\/h1>/;// Google.co.uk
		
		if  (
				s.exec(ih) ||
				s2.exec(ih)
			)
		{
			var NUMLINKS;
			//var NUMLINKS=11;
			//var NUMLINKS=4;
			//var NUMLINKS=3;
			
			GM_addStyle('body {margin:0;padding:0;zoom:0.6;}');
			GM_addStyle('p {margin:0;padding:0;}');
			GM_addStyle('ul {margin:0;padding:0;}');
			
			var domain;
			var s, s2;
			s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on (Yahoo\.[\w\.]+)<\/h1>/.exec(ih);
			s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on (Yahoo\.[\w\.]+)<\/h1>/.exec(ih);
			if (s) {
				domain = s[2].toLowerCase();
				//domain = 'http://'+s[2].toLowerCase();
			}
			else if (s2) {
				domain = s2[1].toLowerCase();
				//domain = 'http://'+s2[1].toLowerCase();
			}
			
			var type;
			
			if (document.getElementById('URL-1')) {
				type = 1;
			} else type = 2;
			
			var a, count, array_urls, global_count;
			
			//a = /<h2 class="text-rep">Keyword: ([^<]+)/g;
			
			a = /h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;">Keyword: ([^<]+)/g;
			
			if (ih.indexOf('<cufontext>') != -1) {
				type = 3;
				a = /<h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;"><cufon class="cufon cufon-canvas" alt="Keyword: " style="width: 78px; height: 16px;"><canvas width="89" height="17" style="width: 89px; height: 17px; top: -1px; left: -1px;"><\/canvas><cufontext>Keyword: <\/cufontext>((.|\s)*?(?=<\/h2>|$)|$)/g;
			}
			
			//a = /<h2 class="text-rep"[^>]{0,}>Keyword: ([^<]+)/g;
			
			array_urls = new Array();
			
			if (a.exec(ih)) {
				
				a.lastIndex = 0;
				
				count=1;
				
				global_count=1;
				
				if (type === 1 || type == 2) {
					while (match = a.exec(ih)) {
						
						match[1] = match[1].replace(/&amp;/g,'&');
						
						match[1] = 'http://search.'+domain+'/search?p='+encodeURIComponent(match[1]);
						
						array_urls.push(match[1]);
						count++;
					}
				}
				else if (type == 3) {
					var a2, match2, string;
					while (match = a.exec(ih)) {
						
						string = '';
						a2 = /<cufontext>([^<]+)<\/cufontext>/g;
						if (a2.exec(match[1])) {
							
							a2.lastIndex = 0;
							while (match2 = a2.exec(match[1])) {
								match2[1] = match2[1].replace(/&amp;/g,'&');
								string += match2[1];
							}
							
							string = 'http://search.'+domain+'/search?p='+encodeURIComponent(string);
							
							array_urls.push(string);
						}
						
						count++;
					}
				}
				
				NUMLINKS = array_urls.length;
				
				console.log(NUMLINKS);
				console.log(array_urls);
				
				var c = 1;
				for (var i in array_urls) {
					cs_yahoo(array_urls[i], c);
					c++;
				}
			}
			
			function cs_yahoo(u, num) {
				
				GM_xmlhttpRequest({
					method: "GET",
					url: u,
					onload: function(response) {
						var rs = response.responseText;
						
						var r = /yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
					
						if (r.exec(rs) && rs.indexOf('Including results for') == -1) {
							r.lastIndex = 0;
							r=/yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g; // li
							var count = 0;
							var r2;
							var x, y;
							var match;
							
							match = r.exec(rs);
							
							if (match) {
								match[1] = decodeURIComponent(match[1]);
								if (type === 1 || type == 3)
									x = document.getElementById('URL-'+num);
								else
									x = document.getElementById('URL'+num+'-1');
								x.value = match[1];
							}
						} else {
							
						}
					}
				});
			}
			
			var xint2 = setInterval(function() {
				var subm=true;
				var x;
				for (var i = 1; i <= NUMLINKS; i++) {
					if (type === 1 || type == 3)
						x = document.getElementById('URL-'+i);
					else
						x = document.getElementById('URL'+i+'-1');
					if (!x || x == undefined) {
						sbm = false;
						break;
					}
					if (x.value.trim() == '' || x.value.trim() == 'http://')
						subm = false;
				}
				if (subm) {
					clearInterval(xint2);
					document.getElementById('submitButton').click();
				}
			},200);
		}
		
		//
		// Search: Keyword on Google.com (US)
		//
		//
		var s,s2;
		s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on Google\.[\w\.]+<\/h1>/;
		s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on Google\.[\w\.]+<\/h1>/;
		if  (
				s.exec(ih) ||
				s2.exec(ih)
			)
		{
			console.log('x');
			
			var NUMLINKS;
			//var NUMLINKS=11;
			//var NUMLINKS=4;
			//var NUMLINKS=3;
			
			GM_addStyle('body {margin:0;padding:0;zoom:0.6;}');
			GM_addStyle('p {margin:0;padding:0;}');
			GM_addStyle('ul {margin:0;padding:0;}');
			
			
			var domain;
			var s, s2;
			s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on (Google\.[\w\.]+)<\/h1>/.exec(ih);
			s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on (Google\.[\w\.]+)<\/h1>/.exec(ih);
			if (s) {
				domain = 'http://'+s[2].toLowerCase();
			}
			else if (s2) {
				domain = 'http://'+s2[1].toLowerCase();
			}
			
			var type;
			
			if (document.getElementById('URL-1')) {
				type = 1;
			} else type = 2;
			
			var a, count, array_urls, global_count;
			
			a = /h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;">Keyword: ([^<]+)/g;
			
			if (ih.indexOf('<cufontext>') != -1) {
				type = 3;
				a = /<h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;"><cufon class="cufon cufon-canvas" alt="Keyword: " style="width: 78px; height: 16px;"><canvas width="89" height="17" style="width: 89px; height: 17px; top: -1px; left: -1px;"><\/canvas><cufontext>Keyword: <\/cufontext>((.|\s)*?(?=<\/h2>|$)|$)/g;
			}
			
			array_urls = new Array();
			
			if (a.exec(ih)) {
				
				a.lastIndex = 0;
				
				count=1;
				
				global_count=1;
				
				if (type === 1 || type == 2) {
					while (match = a.exec(ih)) {
						match[1] = match[1].replace(/&amp;/g,'&');
						match[1] = domain+'/search?q='+encodeURIComponent(match[1])+'&hl=en&ie=UTF-8';
						//match[1] = domain+'/search?q='+encodeURIComponent(match[1])+'&hl=en&ie=UTF-8&num=1';
						array_urls.push(match[1]);
						count++;
					}
				}
				else if (type == 3) {
					var a2, match2, string;
					while (match = a.exec(ih)) {
						
						string = '';
						a2 = /<cufontext>([^<]+)<\/cufontext>/g;
						if (a2.exec(match[1])) {
							
							a2.lastIndex = 0;
							while (match2 = a2.exec(match[1])) {
								match2[1] = match2[1].replace(/&amp;/g,'&');
								string += match2[1];
							}
							
							string = domain+'/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8';
							//string = domain+'/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8&num=1';
							//string = 'https://www.google.com/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8&num=1';
							
							array_urls.push(string);
						}
						
						count++;
						
					}
				}
				
				NUMLINKS = array_urls.length;
				
				//~ console.log(NUMLINKS);
				//~ console.log(array_urls);
				
				var c = 1;
				for (var i in array_urls) {
					cs_read(array_urls[i], c);
					c++;
				}
			}
			
			
			function cs_read(u, num) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host + '/mturk/util.php?mt__read_cache='+encodeURIComponent(u),
					onload: function (response) {
						var rs = response.responseText;
						
						if (rs.trim() == '') {
							cs_get_new(u, num); // new
						} else {
							cs_finish(u, num, rs);
						}
					}
				});
			}
			function cs_write(u, num, rs) {
				GM_xmlhttpRequest({
					method: "POST",
					url: MT___host + '/mturk/util.php',
					data: 'mt__write_cache_value='+encodeURIComponent(rs)+'&mt__write_cache='+encodeURIComponent(u),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						var rs_tmp = response.responseText;
						if (rs_tmp.trim() == '') {
							cs_finish(u, num, rs);
						} else
							console.log(rs_tmp+'cs_write');
					}
				});
			}
			function cs_finish(u, num, rs) {
				var r;
				r = /<h3 class="r"><a href="([^"]+)((.|\s)*?(?=<!--n-->|$)|$)/g;
				var count = 0;
				if (r.exec(rs)) {
					r.lastIndex = 0;
					var c = 1;
					var sbm = true;
					while (m = r.exec(rs)) {
						
						m[1] = __js_clean_html_str(m[1]);
						
						if (/^https?:\/\/([^\.]+\.|)google\./i.exec(m[1]))
							continue;
						
						// replace "harm your comp."
						m[1] = m[1].replace(/^\/interstitial\?url=/, '');
						
						// google.com
						if (/^\//i.exec(m[1]))
							continue;
							
						if (type === 1 || type == 3)
							x = document.getElementById('URL-'+num);
						else
							x = document.getElementById('URL'+num+'-1');
						x.value = m[1];//console.log(x);
						
						break; // ENDS HERE
					}
				}
			}
			function cs_get_new(u, num) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: u,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status > 200) {
							document.body.style.backgroundColor = 'pink';
							return;
						} else if (/captcha/.exec(rs)) {
							document.body.style.backgroundColor = 'pink';
							return;
						}
						
						// still here?
						// write to file
						cs_write(u, num, rs);
					}
				});
			}
			
			var xint2 = setInterval(function() {
				var subm=true;
				var x;
				for (var i = 1; i <= NUMLINKS; i++) {
					if (type === 1 || type == 3)
						x = document.getElementById('URL-'+i);
					else
						x = document.getElementById('URL'+i+'-1');
					if (!x || x == undefined) {
						sbm = false;
						break;
					}
					if (x.value.trim() == '' || x.value.trim() == 'http://')
						subm = false;
				}
				if (subm) {
					clearInterval(xint2);
					document.getElementById('submitButton').click();
				}
			},400);
		}
		
		//
		// Search: Keyword on Google.com (US) + *LOCATION*
		//
		//
		var s,s2;
		s =/<div id="assignment"><h1 class="projectTitle">Search: Location and Keywords on (Google\.[\w\.]+)<\/h1>/;
		s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on Google\.[\w\.]+<\/h1>/;
		if  (
				s.exec(ih)// ||
				//s2.exec(ih)
			)
		{
			console.log('');
			
			var NUMLINKS;

			GM_addStyle('body {margin:0;padding:0;zoom:0.6;}');
			GM_addStyle('p {margin:0;padding:0;}');
			GM_addStyle('ul {margin:0;padding:0;}');
			
			var domain;
			s = s.exec(ih);
			//~ s =/<div id="assignment"><h1 class="projectTitle">Search: (\d{1,2} |)Keywords? on (Google\.[\w\.]+)<\/h1>/.exec(ih);
			//s2=/<div id="assignment"><h1 class="projectTitle">Keyword Search on (Google\.[\w\.]+)<\/h1>/.exec(ih);
			if (s) {
				domain = 'http://'+s[1].toLowerCase();
			}
			//~ else if (s2) {
				//~ domain = 'http://'+s2[1].toLowerCase();
			//~ }
			
			var type;
			var a, count, array_urls, global_count;
			
			var zipcodes	= [];
			var keywords	= [];
			var zp_el		= [];
			var kw_el		= [];
			
			var i, x, y, z;
			
			// zip
			x = document.getElementsByClassName('location');
			for (i in x) {
				if (i == 'length') break;
				y = x[i].getElementsByTagName('h1')[0];
				z = /^Zipcode: ([\d\-]+)$/.exec(y.innerText);
				if (!y) {
					console.log(y);
					console.log(y.innerText);
					return;
				}
				z[1] = (z[1].length == 4) ? '0' + z[1] : z[1];
				zipcodes.push(z[1]);
			}
			//~ if (zipcodes.length != 3) {
				//~ console.log(zipcodes.length);
				//~ return;
			//~ }
			// zp_el
			for (i=1; i<= zipcodes.length ; i++) {
				x = document.getElementById('Location-'+i);
				if (x)
					zp_el.push(x);
				else {
					console.log(x);
					return;
				}
			}
			
			// kw
			x = document.getElementsByClassName('text-rep');
			for (i in x) {
				if (i == 'length') break;
				y = /^Keyword: ([^$<]+)$/.exec(x[i].innerText);
				if (!y) {
					console.log(y);
					return;
				}
				keywords.push(y[1]);
			}
			//~ if (keywords.length != 3) {
				//~ console.log(keywords.length);
				//~ return;
			//~ }
			// kw_el
			for (i=1; i<= keywords.length ; i++) {
				x = document.getElementById('URL-'+i);
				if (x)
					kw_el.push(x);
				else {
					console.log(x);
					return;
				}
			}
			
			// Same lengths?
			if (keywords.length != kw_el.length || keywords.length != zipcodes.length || keywords.length != zp_el.length) {
				console.log(keywords.length);
				return;
			}
			
			// Init
			var USG = GM_getValue('CrowdSource_google_USG');
			var NUM_JOB = 0;
			
			if (!USG || USG == 'undefined')
				CrowdSource_google_locations_autocomplete__newUSG();
			else {
				console.log('cached USG');
				CrowdSource_google_locations_autocomplete__changeLocn(); // init
			}
			
			//i.e. 0_MqQUpg52jQxbejMaYDDCeT0HNAY%3D
			// Changed Google page, 5/24/14.
			function CrowdSource_google_locations_autocomplete__newUSG() {
				console.log('new USG');
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'https://www.google.com/preferences?hl=en',
					
					//~ url: 'https://www.google.com/', // 5/24/14?
					
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status > 200) {
							document.body.style.backgroundColor = 'pink';
							return;
						}
						
						USG = /<input value="([^"]+)" name="sig" type="hidden">/.exec(rs)[1];//0_7mY4kFm02OE_lGqVBOZo_KWud3w
						console.log('new USG:' + USG);
						
						//~ USG = /sig=([^&"]+)/.exec(rs)[1];
						//~ console.log('new USG:' + USG);
						
						// update
						GM_setValue('CrowdSource_google_USG', USG);
						
						// init search
						CrowdSource_google_locations_autocomplete__changeLocn();
					}
				});
			}
			function CrowdSource_google_locations_autocomplete__changeLocn() {
				// 4
				zipcodes[NUM_JOB] = (zipcodes[NUM_JOB].length == 4) ? '0' + zipcodes[NUM_JOB] : zipcodes[NUM_JOB];
				
				// &usg=XX !!
				var url = 'https://www.google.com/uul?muul=4_18&luul='+encodeURIComponent(zipcodes[NUM_JOB])+'&uulo=1&usg='+USG+'&hl=en';
				console.log('changeLocn:' + url);
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status > 200) {
							document.body.style.backgroundColor = 'pink';
							return;
						}
						
						if  (
							rs.indexOf('Try being less specific or try setting your location to a nearby place.') != -1 ||
							rs.trim() != ''
							)
						{
							document.body.style.backgroundColor = 'teal';
							return;
						}
						
						//~ console.log(rs);
						//~ console.log(JSON.parse(rs));
						//~ return;
						
						CrowdSource_google_locations_autocomplete__search(true);
					}
				});
			}
			function CrowdSource_google_locations_autocomplete__search(changed_location) {
				
				// changed_location
				var url;
				var cl;
				cl = (changed_location) ? '&changed_location=1' : '';
				url = 'https://www.google.com/search?q='+encodeURIComponent(keywords[NUM_JOB])+cl;
				console.log('search:'+url);
				
				// xhr
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					//url: 'https://www.google.com/s?hl=en&sugexp=ccolh&gs_rn=42&gs_ri=psy-ab&pq=&cp=13&gs_id=1k&xhr=t&q='+encodeURIComponent(WORD)+'&es_nrs=true&pf=p&es_sm=122&sclient=psy-ab&oq=&gs_l=&pbx=1&bav=on.2,or.r_qf.&bvm=bv.65788261,d.cWc&fp=a989e427c0b55812&biw=1706&bih=500&dpr=0.9&tch=1&ech=13&psi=9VhkU7TeLNKwsAS674HIDw.1399085302703.1&changed_location=1',
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status > 200) {
							document.body.style.backgroundColor = 'pink';
							return;
						}
						//console.log(rs);
						
						var r;
						//var x;
						
						// first result
						r = /<h3 class="r"><a href="([^"]+)((.|\s)*?(?=<!--n-->|$)|$)/g;
						var m;
						if (!r.exec(rs)) {
							kw_el[NUM_JOB].style.border = '8px solid LightGreen';
							console.log('');
							return;
						}
						r.lastIndex = 0;
						while (m = r.exec(rs)) {
							
							m[1] = __js_clean_html_str(m[1]);
							
							if (/^https?:\/\/([^\.]+\.|)google\./i.exec(m[1]))
								continue;
							
							// replace "harm your comp."
							m[1] = m[1].replace(/^\/interstitial\?url=/, '');
							
							// google.com
							if (/^\//i.exec(m[1]))
								continue;
							
							// here?
							kw_el[NUM_JOB].value = m[1];
							break;	
						}
						if (kw_el[NUM_JOB].value == '') {
							kw_el[NUM_JOB].style.border = '8px dashed LightGreen';
							console.log('');
							return;
						}
						
						// new location
						
						// the block of code that contains location
						//r = /<div id=xjsi data-jiis="bp"><script>((.|\s)*?(?=<\/script>|$)|$)/.exec(rs);
						r = /window\.jsl\.dh\('hdtbMenus','([^']+)'/.exec(rs);
						if (!r) {
							console.log(r);
							return;
						}
						r = r[1];
						//console.log(r);
						
						// decode block
						//~ r = decodeURIComponent(r);
						//console.log(r);
						
						// regex location
						//r = /<div class="mn-hd-txt">([^<]+)<\/div>/.exec(r);
						//r = /\\x3cdiv class\\x3d\\x22mn-hd-txt\\x22\\x3e([^\\]+)\\x3c\/div\\x3e/.exec(r);
						//  \x3cli class\x3d\x22hdtbItm hdtbSel\x22 tabindex\x3d\x220\x22\x3eHampton, VA 23666\x3c/li\x3e\x3
						//  \x3cli class\x3d\x22hdtbItm hdtbSel\x22 tabindex\x3d\x220\x22\x3eHampton, VA 23666\x3c/li\x3e
						r = /\\x3cli class\\x3d\\x22hdtbItm hdtbSel\\x22 *tabindex\\x3d\\x220\\x22\\x3e([^\\]+)\\x3c\/li\\x3/.exec(r);
						if (!r) {
							console.log('');
							return;
						}
						r = __js_clean_html_str(r[1]).trim();
						if (r.indexOf(zipcodes[NUM_JOB]) == -1) {
							console.log(zipcodes[NUM_JOB]);
							console.log(r);
							return;
						}
						r = r.replace(/ \d{5}$/, '')
						
						// set val
						zp_el[NUM_JOB].value = r;
						
						//
						// DONE?
						// If 3 zipcodes to find, so NUM_JOB = 3 - 1 = 2
						//
						if (NUM_JOB == zipcodes.length -1) { // 
							document.getElementById('submitButton').click();
							return;
						}
						
						//
						// NEXT !
						//
						NUM_JOB++;
						//return;
						
						// previous zip match next zip?
						if (zipcodes[NUM_JOB-1] == zipcodes[NUM_JOB]) {
							CrowdSource_google_locations_autocomplete__search(false); // same loc.
						} else {
							CrowdSource_google_locations_autocomplete__changeLocn();
						}
						return;
						
					}
				});
			}
			
			
			
			//~ if (document.getElementById('URL-1')) {
				//~ type = 1;
			//~ } else type = 2;
			//~ a = /h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;">Keyword: ([^<]+)/g;
			//~ 
			//~ if (ih.indexOf('<cufontext>') != -1) {
				//~ type = 3;
				//~ a = /<h2 class="text-rep" unselectable="on" style="-webkit-user-select: none;"><cufon class="cufon cufon-canvas" alt="Keyword: " style="width: 78px; height: 16px;"><canvas width="89" height="17" style="width: 89px; height: 17px; top: -1px; left: -1px;"><\/canvas><cufontext>Keyword: <\/cufontext>((.|\s)*?(?=<\/h2>|$)|$)/g;
			//~ }
			//~ 
			//~ array_urls = new Array();
			//~ 
			//~ if (a.exec(ih)) {
				//~ 
				//~ a.lastIndex = 0;
				//~ 
				//~ count=1;
				//~ 
				//~ global_count=1;
				//~ 
				//~ if (type === 1 || type == 2) {
					//~ while (match = a.exec(ih)) {
						//~ match[1] = match[1].replace(/&amp;/g,'&');
						//~ match[1] = domain+'/search?q='+encodeURIComponent(match[1])+'&hl=en&ie=UTF-8';
						//~ //match[1] = domain+'/search?q='+encodeURIComponent(match[1])+'&hl=en&ie=UTF-8&num=1';
						//~ array_urls.push(match[1]);
						//~ count++;
					//~ }
				//~ }
				//~ else if (type == 3) {
					//~ var a2, match2, string;
					//~ while (match = a.exec(ih)) {
						//~ 
						//~ string = '';
						//~ a2 = /<cufontext>([^<]+)<\/cufontext>/g;
						//~ if (a2.exec(match[1])) {
							//~ 
							//~ a2.lastIndex = 0;
							//~ while (match2 = a2.exec(match[1])) {
								//~ match2[1] = match2[1].replace(/&amp;/g,'&');
								//~ string += match2[1];
							//~ }
							//~ 
							//~ string = domain+'/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8';
							//~ //string = domain+'/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8&num=1';
							//~ //string = 'https://www.google.com/search?q='+encodeURIComponent(string)+'&hl=en&ie=UTF-8&num=1';
							//~ 
							//~ array_urls.push(string);
						//~ }
						//~ 
						//~ count++;
						//~ 
					//~ }
				//~ }
				//~ 
				//~ NUMLINKS = array_urls.length;
				//~ 
				//~ 
				//~ var c = 1;
				//~ for (var i in array_urls) {
					//~ cs_read(array_urls[i], c);
					//~ c++;
				//~ }
			//~ }
			
			
			
			
			
			
			
			
			function cs_read(u, num) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host + '/mturk/util.php?mt__read_cache='+encodeURIComponent(u),
					onload: function (response) {
						var rs = response.responseText;
						
						if (rs.trim() == '') {
							cs_get_new(u, num); // new
						} else {
							cs_finish(u, num, rs);
						}
					}
				});
			}
			function cs_write(u, num, rs) {
				GM_xmlhttpRequest({
					method: "POST",
					url: MT___host + '/mturk/util.php',
					data: 'mt__write_cache_value='+encodeURIComponent(rs)+'&mt__write_cache='+encodeURIComponent(u),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						var rs_tmp = response.responseText;
						if (rs_tmp.trim() == '') {
							cs_finish(u, num, rs);
						} else
							console.log(rs_tmp+'cs_write');
					}
				});
			}
			function cs_finish(u, num, rs) {
				var r;
				r = /<h3 class="r"><a href="([^"]+)((.|\s)*?(?=<!--n-->|$)|$)/g;
				var count = 0;
				if (r.exec(rs)) {
					r.lastIndex = 0;
					var c = 1;
					var sbm = true;
					while (m = r.exec(rs)) {
						
						m[1] = __js_clean_html_str(m[1]);
						
						if (/^https?:\/\/([^\.]+\.|)google\./i.exec(m[1]))
							continue;
						
						// replace "harm your comp."
						m[1] = m[1].replace(/^\/interstitial\?url=/, '');
						
						// google.com
						if (/^\//i.exec(m[1]))
							continue;
							
						if (type === 1 || type == 3)
							x = document.getElementById('URL-'+num);
						else
							x = document.getElementById('URL'+num+'-1');
						x.value = m[1];//console.log(x);
						
						break; // ENDS HERE
					}
				}
			}
			function cs_get_new(u, num) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: u,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status > 200) {
							document.body.style.backgroundColor = 'pink';
							return;
						} else if (/captcha/.exec(rs)) {
							document.body.style.backgroundColor = 'pink';
							return;
						}
						
						// still here?
						// write to file
						cs_write(u, num, rs);
					}
				});
			}
			
			var xint2 = setInterval(function() {
				var subm=true;
				var x;
				for (var i = 1; i <= NUMLINKS; i++) {
					if (type === 1 || type == 3)
						x = document.getElementById('URL-'+i);
					else
						x = document.getElementById('URL'+i+'-1');
					if (!x || x == undefined) {
						sbm = false;
						break;
					}
					if (x.value.trim() == '' || x.value.trim() == 'http://')
						subm = false;
				}
				if (subm) {
					clearInterval(xint2);
					document.getElementById('submitButton').click();
				}
			},400);
		}
	}
	
	
	/**
	 * THOMAS MURPHY
	 * LINKEDIN.COM IMAGES CHANGE SIZE
	 * 
	 */
	if (0 == 1) {
		var loc = document.location.href;
		if  (
				/^http:\/\/m\.c\.\w+\.licdn\.com\/mpr\/mpr\/shrink_\d+_\d+\//.exec(loc)
			)
		{
			if(document.location.href.indexOf("150_150") == -1){
			document.location.href = loc.replace(/shrink_\d+_\d+/, 'shrink_150_150');
			return;
			}
		}
		else if (
			/^http:\/\/m\.c\.\w+\.licdn\.com\/media\/p\//.exec(loc)
		)
		{
			document.location.href = loc.replace('/media/', '/mpr/mpr/shrink_150_150/');
			return;
		}
	}
	
	
	
	/**
	 * Hostmysite.com
	 * 
	 * 
	 * 
	 * https://my.hostmysite.com/ssl/30//etrizzle.net/movies/tasks/MGoMoviePrices.cfm?li_MovieID=573145&assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=2QQD8J3VE7WSS40JM2UMFK8A5N5ZJD
	 * https://www.mgo.com/security/explore/content/1MV73f073b300dbda3adde969eeea64bd56/offers
	 */
	if (0 == 1) {
		var loc = document.location.href;
		if  (
				/^https:\/\/my\.hostmysite\.com\/ssl\/30\/\/etrizzle\.net\/movies\/tasks\/MGoMoviePrices\.cfm/.exec(loc)
			)
		{
			var a = document.getElementsByTagName('a')[0].href;console.log(a);
			
			a = /\/([^\/]+)$/.exec(a)[1];
			a = __js_clean_html_str(a);
			
			if (a.length < 10 || /[^\w\d]/.exec(a))
				return;
			//curl 'https://www.mgo.com/security/explore/content/1MV73f073b300dbda3adde969eeea64bd56/offers' -H 'Cookie: MGO_analytics_sessionId=6A02169D-1DEA-4FB1-9A01-748042668D5B; __utma=240625183.271282405.1380550821.1380550821.1380550821.1; __utmb=240625183.13.9.1380550862847; __utmc=240625183; __utmz=240625183.1380550821.1.1.utmcsr=my.hostmysite.com|utmccn=(referral)|utmcmd=referral|utmcct=/ssl/30//etrizzle.net/movies/tasks/MGoMoviePrices.cfm; utag_main=_st:1380552663107$ses_id:1380550844855%3Bexp-session' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Host: www.mgo.com' -H 'Accept-Language: en-US,en;q=0.8' -H 'Authorization: Bearer 4791455baac740d8a4b89bd8c186ce06' -H 'Content-Type: application/json' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Cache-Control: max-age=0' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Referer: https://www.mgo.com/client/' -H 'User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36' --compressed
			//curl 'https://www.mgo.com/security/explore/content/1MV73f073b300dbda3adde969eeea64bd56/offers' -H 'Cookie: MGO_analytics_sessionId=6A02169D-1DEA-4FB1-9A01-748042668D5B; has_js=1; __utma=240625183.271282405.1380550821.1380550821.1380550821.1; __utmb=240625183.20.9.1380552000824; __utmc=240625183; __utmz=240625183.1380550821.1.1.utmcsr=my.hostmysite.com|utmccn=(referral)|utmcmd=referral|utmcct=/ssl/30//etrizzle.net/movies/tasks/MGoMoviePrices.cfm; utag_main=_st:1380554618087$ses_id:1380550844855%3Bexp-session' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Host: www.mgo.com' -H 'Accept-Language: en-US,en;q=0.8' -H 'Authorization: Bearer 0302a746607242f9be7904ce870f5421' -H 'Content-Type: application/json' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: https://www.mgo.com/client/' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36' --compressed
			
			//a = 'https://www.mgo.com/security/explore/content/'+a+'/offers';console.log(a); // XX
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://localhost/mturk/util.php?john_c_triggs='+a,
				
				onload: function (response) {
					var rs = response.responseText;
					
					if (response.status != 200)
						return;
					
					rs = JSON.parse(rs);
					console.log(rs);
					
					var sbm = true;
					
					if (!rs.offers)
						return;
					
					for (var i in rs.offers) {
						var x = rs.offers[i];
						
						if (!x.purchasePrice.price){
							sbm = false;console.log('x');
						}
								
						if (x.definition == 'HD') {
							if (x.acquisitionType == 'PURCHASE') {
								document.getElementsByName('lcurr_HDBuyPrice')[0].value = x.purchasePrice.price;
							} else if (x.acquisitionType == 'RENTAL') {
								document.getElementsByName('lcurr_HDRentPrice')[0].value = x.purchasePrice.price;
							} else {
								sbm = false;
							}
						}
						else if (x.definition == 'SD') {
							if (x.acquisitionType == 'PURCHASE') {
								document.getElementsByName('lcurr_SDBuyPrice')[0].value = x.purchasePrice.price;
							} else if (x.acquisitionType == 'RENTAL') {
								document.getElementsByName('lcurr_SDRentPrice')[0].value = x.purchasePrice.price;
							} else {
								sbm = false;
							}
						} else
							sbm = false;
						
						if  (
							!/^[\d\.]+$/.exec(document.getElementsByName('lcurr_HDBuyPrice')[0].value) ||
							!/^[\d\.]+$/.exec(document.getElementsByName('lcurr_HDRentPrice')[0].value) ||
							!/^[\d\.]+$/.exec(document.getElementsByName('lcurr_SDBuyPrice')[0].value) ||
							!/^[\d\.]+$/.exec(document.getElementsByName('lcurr_SDRentPrice')[0].value)
							)
							sbm = false;
							
						console.log(sbm);
						if (sbm) {
							
						}
					}
				}
			});
		}
	}
	/*//
	// John C Triggs, GOOGLE PLAY
	// Enter TV show sesaon and episode prices
	//
	s = 'Enter the Google Play buy and rent prices for the following TV show';
	if (ih.indexOf(s) != -1)
	{
		//console.log('x');
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,b,span {margin:0;padding:0;font-size:12px;}');
		GM_addStyle('body {width:60%;}');
		
		var a = document.getElementsByTagName('a')[0].href;
		var name;
		name = document.getElementsByTagName('span')[0].innerText.toLowerCase();
		name = name.replace(/&/g, '&amp;');
		name = name.replace(/'/g, '&#39;');
		
		
		console.log(document.getElementById('assignmentId').value);
		//console.log(document.getElementById('frmGooglePlayPrices'));
		//console.log(document.getElementById('frmGooglePlayPrices').action);
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: a,
			onload: function (response) {
				var rs = response.responseText;
				//console.log(rs);
				var sbm = true;
				
				var r;
				r = /<div class="meta-details-header">Seasons<\/div><\/td><td class="meta-details-value-column"><div class="meta-details-value" >([\d]+)/.exec(rs)
				if (r) {
					document.getElementsByName('li_MaxSeason')[0].value = r[1];
				} else
					sbm = false;
				
				r = /<span class="buy-button-price">Full Season \$([\d\.]+)/.exec(rs);
				if (r) {
					document.getElementsByName('lcurr_SDSeasonPrice')[0].value = r[1];
				}// else
				//	sbm = false;
				
				//<div class="episode-header-button"><div class="buy-wrapper  goog-inline-block"><div class="buy-border"><a class="buy-link buy-button goog-inline-block" href="javascript:void(0)" data-c="3" data-a="3"><span class="buy-button-price">$1.99 Buy</span>
				r = /<div class="episode-header-button"><div class="buy-wrapper  goog-inline-block"><div class="buy-border"><a class="buy-link buy-button goog-inline-block" href="javascript:void\(\d{0,}\)" data-c="\d{0,}" data-a="\d{0,}"><span class="buy-button-price">\$([\d\.]+) Buy<\/span>/.exec(rs);
				if (r) {
					document.getElementsByName('lcurr_SDEpisodePrice')[0].value = r[1];
				}// else
				//	sbm = false;
				
				if (rs.toLowerCase().indexOf(name) == -1) {
					document.getElementsByName('lb_Skip_Incorrect')[0].checked = true;
					sbm = false;
				}
				//else
				
				if (sbm) {
					doSubmit();
					//document.getElementById('SavePrices').click();
				}
				
			}
		});
	}*/
	
	/**
	 * HealthDetail
	 * Sep. 24, 2013
	 * https://localhelp.healthcare.gov/#address=NORTH CAROLINA&start=0&num=10&filter=off&lang_filter=0&shop_filter=0&chip_filter=0&navc_filter=0
	 */
	if (0 == 1) {
		var loc = document.location.href;
		if  (
				/^https:\/\/localhelp\.healthcare\.gov\/#address=([^&]+)&start=/.exec(loc)
			)
		{
			
			function health_detail_save_state(state, rs) {
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://localhost/mturk/util.php',
					data: 'healthDetail='+encodeURIComponent(state)+'&healthDetail_data='+encodeURIComponent(rs),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						//var rs = response.responseText;
						console.log(response.status);
						if (response.status == 200) {
							health_detail_new_state();
						}
					}
				});
			}
			function health_detail_new_state() {
				
				var new_s = false;
				
				var loc = document.location.href;
				
				var old_s = /^https:\/\/localhelp\.healthcare\.gov\/#address=([^&]+)&start=/.exec(loc);
				
				old_s = old_s[1];
				
				if (old_s == 'z')
					new_s = 'Alabama';
				else {
					var found = false;//console.log(MT___states);
					for (var i in MT___states) {//console.log(MT___states[i]);
						if (found) {
							new_s = MT___states[i];
							break;
						}
						if (MT___states[i] == old_s) {
							found = true;
						}
					}
				}
				
				console.log('old s:'+old_s);
				console.log('new s:'+new_s);
				
				if (!new_s) {
					return;
				}
				
				// input
				if (!document.getElementById('local-help'))
					return;
				document.getElementById('local-help').value = new_s;
				
				// button
				if (document.getElementsByClassName('btn btn-large btn-green find-contacts').length != 1)
					return
				document.getElementsByClassName('btn btn-large btn-green find-contacts')[0].click();
				
				var xint = setInterval(function() { // int 1
					
					//https://localhelp.healthcare.gov/#address=NORTH CAROLINA&start=0&num=10&filter=off&lang_filter=0&shop_filter=0&chip_filter=0&navc_filter=0
					var loc = document.location.href;
					
					if (loc.indexOf('https://localhelp.healthcare.gov/#address='+new_s) == -1)
						return;
					
					if (!document.getElementById('search-content'))
						return;
					
					if (document.getElementById('search-content').innerHTML.toLowerCase().indexOf(new_s.toLowerCase()) == -1)
						return;
					
					if (document.body.innerHTML.indexOf('you’ll use this website, HealthCare.gov, to apply for individual') != -1) {
						clearInterval(xint); // empty page
						health_detail_save_state(new_s, '');
						return;
					}
					if (document.getElementsByClassName('search-count')) {
						var x = document.getElementsByClassName('search-count')[0].innerHTML;
						if (x == '0') {
							clearInterval(xint); // empty page
							//if (old_s == 'Alaska')
							//return;
							health_detail_save_state(new_s, '');
							return;
						}
						x = Math.floor(x*1) - 1;
						if (document.getElementById(x+'_result')) {
							clearInterval(xint);
							//if (old_s == 'Alaska')
							//return;
							health_detail_save_state(new_s, document.getElementById('search-content').innerHTML);
						}
					}
					
				}, 1000);
			}
			
			health_detail_new_state();
		}
	}
	
	/**
	 * Jason Yu
	 * 
	 * Requester?
	 * Aug. 22, 2013
	 * Facebook.com
	 */
	if (0 == 1) {
		var loc = document.location.href;
		// localhost/?fb
		if  (
				/^http:\/\/localhost\/\?fburl=/.exec(loc)
			)
		{
			var k;
			k = /&f=([^$]+)$/.exec(loc)[1];
			var l;
			l = /\?fburl=([^&]+)/.exec(loc)[1];
			jason_yu();
			function jason_yu() {
				//console.log('x');
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://localhost/mturk/util.php',
					data: 'jason_yu='+k+'&jason_yu_url='+l+'&random='+(Math.random()*10),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						
						//var rs = response.responseText;
						
						if (response.status != 200) {
							console.log('write');
							return;
						}
						//console.log('x');
						
						jason_yu_next();
						
						function jason_yu_next() {
							var r = Math.random()*10;
							GM_xmlhttpRequest({
								method: 'GET',
								url: 'http://localhost/mturk/util.php?jason_yu_getqueue=&'+r,
								onload: function (response) {
									var rs = response.responseText;
									if (rs.trim() != '') {
										
										document.location.href = rs;
										
									} else {
										setTimeout(function() {
											jason_yu_next();
										}, 100)
									}
								}
							});
						}
					}
				});
			}
		}
		// fb
		if  (
				/^https:\/\/www\.facebook\.com\/[\d\D]+$/.exec(loc)
			)
		{	//console.log('x');
			//console.log(document.location.href);return;
			
			var start_time = new Date();
			start_time = start_time.getTime();
			
			var first = true;
			var xint = setInterval(function() {
				if (!document.getElementsByClassName('mvl copyright')) return;
				if (!document.getElementsByClassName('mvl copyright')[0]) return;
				
				var now;
				now = new Date();
				now = now.getTime();
				
				//if (first || !document.getElementsByClassName('_3rbh clearfix')){// || now - start_time < 6000) {
				if (first || document.getElementsByClassName('uiMorePager').length != 2){// || now - start_time < 6000) {
					console.log(now - start_time);
					first = false;
					document.getElementsByClassName('mvl copyright')[0].scrollIntoView();
					//console.log('xx');
					
					return;
				}
				//document.getElementsByClassName('mvl copyright')[0].scrollIntoView();// just in case
				//console.log(document.getElementsByClassName('_3rbh clearfix')[0].innerHTML)
				//r = /<a class="[^"]+" href="[^"]+">Games<\/a> · <span class="[^"]+"><a href="[^"]+"><span class="[^"]+">(\d+)<\/span>/.exec(rs);
				//var r = /<span class="_71u _70n">Recent Activity<\/span>/.exec(document.body.innerHTML);
				//var r2 = /Show Older Stories/.exec(document.body.innerHTML);
				//if (r || r2) {
					//console.log('y');
				//<a class="_5opl" href="https://www.facebook.com/apotsalawilson/photos">Photos</a></h3> · <span class="_71u"><a href="https://www.facebook.com/apotsalawilson/photos"><span class="fwn fcg">471</span></a></span></div>
				
				//r = /<a class="[^"]+" href="[^"]+">([^<]+)<\/a> · <span class="[^"]+"><a href="[^"]+"><span class="[^"]+">([\d,\.]+)<\/span>/g;
				
				var out = [];
				
				// about container
				var x = document.getElementById('timeline_about_unit');
				if (x) {
					x = x.getElementsByClassName('clearfix');
					
					if (x) {
						
						for (var i in x) {
							if (!x[i]) continue;
							if (!x[i].innerText) continue;
							var y = x[i].getElementsByTagName('i');
							if (y) {
								y = y[0].className;
								out.push([y, x[i].innerText]);
							}
						}
						
						// convert to regular array
						//x = [].slice.apply(x);
						
						//console.log(x);
						
						// work
						//_s0 _51iw _8o _8r lfloat _54rv img sp_9qbqw8 sx_80ef28
						// education
						//_s0 _51iw _8o _8r lfloat _54rv img sp_9qbqw8 sx_ee6925
						// lives in
						//_s0 _51iw _8o _8r lfloat _54rv img sp_9qbqw8 sx_75f2a1
					}
				}
				
				//document.getElementsByClassName('_s0 _51iw _8o _8r lfloat _54rv img sp_9qbqw8');
				
				
				r = /<a class="[^"]+" href="[^"]+">([^<]+)<\/a>(<\/h3>|) · <span class="[^"]+"><a href="[^"]+"><span class="[^"]+">([\d,\.]+)<\/span>/g;
				clearInterval(xint);
				if (r.exec(document.body.innerHTML)) {
					
					clearInterval(xint);
					
					
					
					
					r.lastIndex = 0;
					var m;
					while (m = r.exec(document.body.innerHTML)) { //console.log(m);
						out.push([m[1], m[3]]); //[0,(1,2)]
						//out.push(m.slice(1)); //[0,(1,2)]
					}
					
					//console.log(out);
					
					if  (
						!out.length &&
						document.body.innerHTML.indexOf('Sorry, this page isn\'t available</h2><h3 class="_4-dq">The link you followed may be broken, or the page may have been removed.') != -1
						)
					{
						out.push('NA');
					} 
					else
					{
						
						//year
						var t = 2013;
						var low = 2013;
						//f = true;
						var x;
						while (t > 2000) {
							x = new RegExp('\\/timeline\\/'+t+'\\/\\d+" rel="ignore">', 'i');
							if (x.exec(document.body.innerHTML)) {
								low = t;
								
								//f = false;
								//t++; // go back to last matching
								//break;
							} else {
								//low = t;
							}
							
							t--;
						}
						//if (t == 2014) t = 2013;
						//console.log(low);
						out.push(low);
					}
					
					console.log(out);
					//document.location.href = 'http://localhost/?fburl='+encodeURIComponent(loc)+'&f='+encodeURIComponent(JSON.stringify(out));
				}
			}, 100);
		}
	}
	
	/**
	 * Linda Dowling
	 * Aug. 22, 2013
	 * oDesk
	 */
	if (1 == 1) {
		var loc = document.location.href;
		
		if  (
				/^https:\/\/www\.taskrabbit\.com\/[^\?]+\?([\d\D]+)$/.exec(loc)
			)
		{
			
			//write out
			var u = /^https:\/\/www\.taskrabbit\.com\/[^\?]+\?([\d\D]+)$/.exec(loc);
			if (u) {
				console.log(u[1]);
				console.log(document.body.innerHTML.length);
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://localhost/mturk/util.php',
					data: 'matthew_taskrb='+encodeURIComponent(u[1])+'&matthew_taskrb_write='+encodeURIComponent(document.body.innerHTML),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						var rs = response.responseText;
						console.log(rs);
						matthew_taskrb();//queue
					}
				});
			}
			
			//get queue
			function matthew_taskrb() {
				var r = Math.random()*100;
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?matthew_taskrb_getqueue=&'+r,
					onload: function (response) {
						var rs = response.responseText;
						if (rs.trim() != '') {
							rs = rs.split('|');
							window.location.href = rs[0] + '?' + rs[1];
						} else
							setTimeout(function() {matthew_taskrb();}, 100);
					}
				});
			}
		}
	}
	
	/**
	 * Linda Dowling
	 * Aug. 22, 2013
	 * oDesk
	 */
	if (0 == 1) {
		var loc = document.location.href;
		
		if  (
				/http:\/\/beta\.naturalpartners\.com\/[^\.]+\.html/.exec(loc)
			)
		{
			//
			
			var links = document.getElementsByClassName('product-name');
			console.log(links.length);
			
			var counter = 0;
			//var counter = 21;
			
			natural_pt();
			
			function natural_pt() {
				
				var y;
				//y = x.shift();
				y = links[counter];
				y = y.getElementsByTagName('a')[0].href;
				
				console.log('start'+counter);
				
				var w = '';
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: y,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status != 200) {
							console.log('stat');
							return;
						}
						
						var r;
						r = /<div class="product-name">[\r\n\t\s]+<h2>([^<]+)/.exec(rs);
						if (r) {
							w += '"'+__js_clean_html_str(r[1].replace(/"/g, '""').trim())+'",';
						} else
							w += ',';
						
						r = /Item #: <strong>([^<]+)<\/strong>/.exec(rs);
						if (r) {
							w += '"'+__js_clean_html_str(r[1].replace(/"/g, '""').trim())+'",'; //""
						} else
							w += ',';
						
						r = /<div class="brand_name">([^<]+)<\/div>/.exec(rs);
						if (r) {
							w += '"'+__js_clean_html_str(r[1].replace(/"/g, '""').trim())+'",';
						} else
							w += ',';
						
						r = /<li class="category\d+">[\r\n\t\s]+<a href=[^>]+>([^<]+)<\/a>/g;
						if (r.exec(rs)) {
							r.lastIndex = 0;
							var c = 0;
							var m;
							while (m = r.exec(rs)) {
								if (c >= 3) break;
								w += '"'+__js_clean_html_str(m[1].replace(/"/g, '""').trim())+'",';
								c++;
							}
							while (c < 3) {
								w += ',';
								c++;
							}
						} else
							w += ',,,';
						
						r = /<p>Description:<\/p>[\r\n\t\s]+<div class="std">((.|\s)*?(?=<\/div>[\r\n]+                    <\/div>[\r\n]+|$)|$)/.exec(rs);
						if (r) {
							r = r[1];
							r = r.replace(/&gt;/gi, '>');
							r = r.replace(/&lt;/gi, '<');
							r = r.replace(/(<p[^>]{0,}>|<\/p>|<br[^>]{0,}>|<li[^>]{0,}>|<div[^>]{0,}>)/gi, "\n");
							r = r.replace(/(<\/?em>|<\/?strong>|<\/?span>|<span[^>]+>|<\/?b>|<\/i>|<\/?ul[^>]{0,}>|<\/li>|<\/?font[^>]{0,}>|<\/?u>|<\/div>)/gi, '');
							r = r.replace(/\n+/g, "\n");
							r = r.trim();
							if (/[<>]/.exec(r)) {
								console.log('<>');
								console.log(r);
								return;
							}
							r = __js_clean_html_str(r.replace(/"/g, '""').trim());
							r = r.substr(0, 2000);
							w += '"'+r+'",';
						} else
							w += ',';
						
						r = /<a class="zoom-thumbnail"  href="([^"]+)"/g;
						if (r.exec(rs)) {
							r.lastIndex = 0;
							var m;
							w += '"';
							while (m = r.exec(rs)) {
								//w += m[1].replace(/"/g, '\\"').trim(); // first
								w += m[1].replace(/"/g, '""').trim() + "\n";
							}
							w = w.trim(); // trailing \n?
							w += '"';
						} else
							w += ''; //last
						
						w += ",\n"; //add comma for php
							
						// still here?
						//counter
						GM_xmlhttpRequest({
							method: 'POST',
							url: 'http://localhost/mturk/util.php',
							data: 'linda_dowling='+encodeURIComponent(w)+'&random='+(Math.random()*10),
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							onload: function (response) {
								
								//var rs = response.responseText;
								
								if (response.status != 200) {
									console.log('write');
									return;
								}
								if (response.responseText.trim() != '') {
									console.log(response.responseText);
									return;
								}
								
								console.log('wrote'+counter);
								// cont.
								counter++;
								natural_pt();
							}
						});
							
					}
				});
			}
			
		}
	}
	
	/**
	 * Alireza Mansoori
	 * Aug. 21, 2013
	 * Names, sabteahval.ir, oDesk
	 */
	if (0 == 1) {
		var loc = document.location.href;
		
		if  (
				/http:\/\/www\.sabteahval\.ir\/default-65\.aspx\?tabid=65&/.exec(loc)
			)
		{
			
			
			var page;
			var sub_page;
			var sub_page_btn;
			
			var viewstate;
			
			page = 1;
			sub_page = 1;
			sub_page_btn = 2;
			page = 1;
			sub_page = 13;
			sub_page_btn = 5;
			page = 2;
			sub_page = 2;
			sub_page_btn = 12;
			page = 3;
			sub_page = 1;
			sub_page_btn = 2;
			page = 1;
			sub_page = 1;
			sub_page_btn = 2;
			
			viewstate = '';
			
			// start 1
			Alireza_Mansoori(true, false, false);
			
			function Alireza_Mansoori(letter, words_paging, word) {
				
				var req;
				var et;
				var ea;
				var s;
				
				ea = '';
				
				if (letter) {
					if (page != 16)
						et = 'ctl04:ctl04:ctl00:Bt'+page;
					else	
						et = 'ctl04:ctl04:ctl00:B'+page;// !
				}
				else if (words_paging) {
					et = 'ctl04:ctl04:ctl00:Listnam';
					ea = 'Page$'+sub_page;
				}
				else if (word) {
					s = ((sub_page_btn < 10) ? '0' : '') + sub_page_btn;
					et = 'ctl04:ctl04:ctl00:Listnam:ctl'+s+':LinkButton1';
				}
				
				et = encodeURIComponent(et);
				ea = encodeURIComponent(ea);
				
				req = '__EVENTTARGET='+et+'&__EVENTARGUMENT='+ea+'&__VIEWSTATE='+viewstate+'&__VIEWSTATEENCRYPTED=&ctl04_ctl04_ctl00_RadAjaxPanel1PostDataValue=&ctl04$ctl04$ctl00$TxtBXsearch=&ctl04$ctl04$ctl00$txtmenams=&ctl04$ctl04$ctl00$txtendF=&ctl04$ctl04$ctl00$DropStat=0&ctl04$ctl04$ctl00$txtfravani=&ctl04$ctl04$ctl00$TxtBxmens=%20%20%20(%D8%B5%D9%81%D8%AA%20%D9%81%D8%A7%D8%B9%D9%84%D9%8A%20%D8%A7%D8%B2%20%D8%AA%D8%A7%D8%A8%D9%8A%D8%AF%D9%86)%D8%8C%20%D8%A2%D9%86%DA%86%D9%87%20%D9%85%D9%8A%E2%80%8C%D8%AA%D8%A7%D8%A8%D8%AF%20%D9%88%20%D9%86%D9%88%D8%B1%D8%A7%D9%81%D8%B4%D8%A7%D9%86%D9%8A%20%D9%85%D9%8A%E2%80%8C%D9%83%D9%86%D8%AF%D8%8C%20%D8%AF%D8%B1%D8%AE%D8%B4%D8%A7%D9%86.&RadAJAXControlID=ctl04_ctl04_ctl00_RadAjaxPanel1&httprequest=true';
				
				//<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="
				
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://www.sabteahval.ir/default-65.aspx?tabid=65&',
					data: req,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response) {
						var rs = response.responseText;
						
						// status
						if (letter)
							console.log('LE-- loaded page'+page+' sub_page'+sub_page+' sub_page_btn'+sub_page_btn);
						if (words_paging)
							console.log('WP-- loaded page'+page+' sub_page'+sub_page+' sub_page_btn'+sub_page_btn);
						if (word)
							console.log('WORD loaded page'+page+' sub_page'+sub_page+' sub_page_btn'+sub_page_btn);
						
						if (response.status != 200) {
							console.log(response.status);
							return;
						}
						
						if  (
							rs.indexOf('<head><title>') !== 0 ||
							rs.indexOf('<script type="text/javascript" src="http://www.sabteahval.ir/DeskTopModules/menu/c_smartmenus.js"></script></form>/*_telerik_ajaxScript_*/window["ctl04_ctl04_ctl00_RadAjaxPanel1"].ControlsToUpdate = ["ctl04_ctl04_ctl00_RadAjaxPanel1"];/*_telerik_ajaxScript_*/') == -1						
							)
						{
							console.log(rs);
							return;
						}
						
						
						viewstate = /<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)/.exec(rs);
						if (!viewstate) {
							console.log('view');
							return;
						}
						viewstate = encodeURIComponent(viewstate[1]);
						
						// if letter, for safe measure do words_paging = 1
						if (letter) {
							Alireza_Mansoori(false, true, false);
							return;
						}
						
						// If words paging.
						// Starts on 2. Do 2 - 13.
						// For safe measure do word = 2 (0)
						if (words_paging) {
							Alireza_Mansoori(false, false, true);
							return;
						}
						
						// word
						if (word) {
							
							// save to db
							var r;
							r = /<td colspan="1" style="background-position: center bottom; background-image: url\(DesktopModules\/SabtAhvalNameDic\/images\/leaftA\.gif\);[\r\n\t\s]+width: 2%; background-repeat: no-repeat; height: 9px; >((.|\s)*?(?=<\/td>[\r\n\t\s]+<td style="width: 30%; font-size: x-small; font-family: Tahoma; text-align: center;"[\r\n\t\s]+valign="top" dir="rtl">|$)|$)/.exec(rs);
							
							if (!r) {
								console.log(rs);
								console.log('word');
								return;
							}
							
							//var w_obj;
							var out = [];
							var r2;
							
							r = r[1];
							
							
							//XXSKIPPING FIRST
							r2 = /<span id="ctl04_ctl04_ctl00_lbsexcode"[^>]+>([^<]+)<\/span>/.exec(r);
							if (r2) {
								r2 = r2[1];
								out.push(r2.trim());
							} else { console.log('w1'); return; }
							
							r2 = /<span id="ctl04_ctl04_ctl00_lbname"[^>]+>([^<]+)<\/span>/.exec(r);
							if (r2) {
								r2 = r2[1];
								out.push(r2.trim());
							} else { console.log('w2'); return; }
							
							r2 = /<span id="ctl04_ctl04_ctl00_LbAvnegare"[^>]+>([^<]+)<\/span>/.exec(r);
							if (r2) {
								r2 = r2[1];
								out.push(r2.trim());
							} else { console.log('w3'); return; }
							
							r2 = /<textarea name="ctl04\$ctl04\$ctl00\$TxtBxmens"[^>]+>([^<]+)<\/textarea>/.exec(r);
							if (r2) {
								r2 = r2[1];
								out.push(r2.trim());
							} else { console.log('w4'); return; }
							
							r2 = /<span id="ctl04_ctl04_ctl00_lbfrvnie"[^>]+>[^:]+:(\d+)[ ]{0,}<\/span>/.exec(r); //rtl
							if (r2) {
								r2 = r2[1];
								r2 = r2;
								out.push(r2.trim());
							} else { console.log('w5'); return; }
							
							//var x = 1;
							//for (var i in out) {
							//	console.log(x + ' ' +__js_clean_html_str(out[i]));
							//	x++;
							//}
							
							//out = out.join('|||||__________|||||');
							//console.log(out);
							//return;
							
							//clean
							for (var i in out) {
								out[i] = __js_clean_html_str(out[i]);
								out[i] = out[i].replace(/"/g, '\\"'); //var x = '"';console.log(x.replace(/"/g, '\\"'));=='\"'
								out[i] = '"'+out[i]+'"';
								//if (out[i].indexOf(',') != -1
							}
							
							// save word to db
							GM_xmlhttpRequest({
								method: 'POST',
								url: 'http://localhost/mturk/util.php',
								data: 'alireza_mansoori='+encodeURIComponent(out.join(','))+'&random='+(Math.random()*10),
								headers: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function (response) {
									
									//var rs = response.responseText;
									
									if (response.status != 200) {
										console.log('write');
										return;
									}
									if (response.responseText.trim() != '') {
										console.log(response.responseText);
										return;
									}
									
							
									// NEXT
									
									// next word...
									//<a id="ctl04_ctl04_ctl00_Listnam_ctl12_LinkButton1" TextDuringCallBack=".." href="javascript:AjaxNS.AR('ctl04$ctl04$ctl00$Listnam$ctl12$LinkButton1','', 'ctl04_ctl04_ctl00_RadAjaxPanel1', event)">
									var next_word;
									next_word = sub_page_btn + 1;
									next_word = ((next_word < 10) ? '0' : '') + next_word;
									// exists? (by default less than 13)
									if  (
										rs.indexOf('<a id="ctl04_ctl04_ctl00_Listnam_ctl'+next_word+'_LinkButton1" TextDuringCallBack=".." href="javascript:AjaxNS.AR(\'ctl04$ctl04$ctl00$Listnam$ctl'+next_word+'$LinkButton1\',\'\', \'ctl04_ctl04_ctl00_RadAjaxPanel1\', event)">') != -1
										)
									{
										// go to next word
										sub_page_btn++;
										Alireza_Mansoori(false, false, true);
										return;
									}
									else {
										// next word does not exist. Does next word page exist?
										//
										
										// reset sub_page_btn
										sub_page_btn = 2;
										
										var next_page;
										next_page = sub_page + 1;
										if  (
											rs.indexOf("<a href=\"javascript:AjaxNS.AR('ctl04$ctl04$ctl00$Listnam','Page$"+next_page+"', 'ctl04_ctl04_ctl00_RadAjaxPanel1', event)\">") != -1
											//rs.indexOf("<a href=\"javascript:AjaxNS.AR('ctl04$ctl04$ctl00$Listnam','Page$"+next_page+"', 'ctl04_ctl04_ctl00_RadAjaxPanel1', event)\">"+next_page+"</a>") != -1
											)
										{
											// go to next sub page
											sub_page++;
											
											//return; // debug
											
											Alireza_Mansoori(false, true, false);
											return;
										}
										else {
											// next word page does not exist. Does next letter page exist?
											//
											// go to next letter
											page++;
											sub_page = 1; // reset
											
											//return; // debug
											
											Alireza_Mansoori(true, false, false);
											return;
										}
									}
									
								}
							});
						}
					}
				});
			}
		}
	}
	
	/**
	 * Matt
	 // Matt
	 * 
	 */
	var loc = document.location.href;
	
	if  (//3 //Get your business on Google
			/https:\/\/www\.google\.com\/local\/business\/u\/0\/add\/verify/.exec(loc)
		)
	{
		console.log('x1');
		
	}
	if  (//2 //Get your business on Google
			/https:\/\/www\.google\.com\/local\/business\/u\/0\/add\/select/.exec(loc)
		)
	{
		console.log('x2');
		
	}
	if  ( //1
			/https:\/\/www\.google\.com\/local\/business\/u\/0\/add\/info/.exec(loc)
		)
	{
		
		// queue object
		var que_object;
		var running_getYour = false;
		var hasVisitedSelect = false;
		var intervalTime = 200;
		
		console.log('x3');
		// 0,1,2,3
		// 2 == phone or postcard
		
		
		var continueButton;
		var x = document.getElementsByTagName('div');
		for (var i in x) {
			if (i == 'length') break;
			if (x[i].innerText == 'Continue') {
				continueButton = x[i];
				break;
			}
		}
		
		// START
		var xint = setInterval(function() {
			// Changed June 16 2014. Elements 9 to 7?
			//if (document.getElementsByClassName('b-Ca').length == 9) {
			
			if (document.getElementsByClassName('b-Ca').length == 7) {
				clearInterval(xint);
				mt_matt();
			}
		}, intervalTime);
		
		
		
		// FINAL NEW
		var xint_final_Verify = setInterval(function() { // watch for completed
			
			//We need to create a Google+ page so you can manage your business on Google. Please confirm this information:
			var ih = document.body.innerHTML;
			if (ih.indexOf('We need to create a Google+ page so you can manage your business on Google. Please confirm this information:') != -1) {
				clearInterval(xint_final_Verify);
				// write final
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?Matt_writecomplete_id='+encodeURIComponent(que_object[8])+'&Matt_writecomplete=Available', // ADD "AVAILABLE" JUNE 25 2014
					onload: function (response) {
						//var rs = response.responseText;
						window.location = 'https://www.google.com/local/business/u/0/add/info'; // NEXT
					}
				});
			}
			
			// final phone/post
			var x;
			x = document.getElementsByClassName('Ym n1');
			if (!x) return;
			if (!x[0]) return;
			if (!x[0].innerHTML) return;
			x = x[0].innerHTML;
			if  (
					(
					x == 'Verify by phone or postcard' ||
					x == 'Verify by postcard'
					)
				&&
				hasVisitedSelect
				)
			{
				
				clearInterval(xint_final_Verify);
				
				//console.log(hasVisitedSelect);
				//console.log(document.location.href);
				//return;
				
				
				x = (x == 'Verify by phone or postcard') ? 'Phone' : x;
				x = (x == 'Verify by postcard') ? 'Postcard' : x;
				
				// write final
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?Matt_writecomplete_id='+encodeURIComponent(que_object[8])+'&Matt_writecomplete='+x,
					onload: function (response) {
						//var rs = response.responseText;
						window.location = 'https://www.google.com/local/business/u/0/add/info';
					}
				});
				
				return;
			}
			else if (
					(
					x == 'Verify by phone or postcard' ||
					x == 'Verify by postcard'
					)
				&&
				!hasVisitedSelect
				)
			{	// new!
				clearInterval(xint_final_Verify);
				
				// write final
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?Matt_writecomplete_id='+encodeURIComponent(que_object[8])+'&Matt_writecomplete=New',
					onload: function (response) {
						//var rs = response.responseText;
						window.location = 'https://www.google.com/local/business/u/0/add/info';
					}
				});
			}
		}, intervalTime);
		
		// FINAL VERIFIED
		var xint_final_Verify2 = setInterval(function() { // watch for completed
			
			if  (
				document.body.innerHTML.indexOf('This listing has already been verified') != -1 &&
				document.body.innerHTML.indexOf('This listing has already been verified by another user. If you want to add this listing to your account, you can make a request that will be sent to the current verified user.') != -1 &&
				//document.getElementsByClassName('Pk').length == 2 &&
				//document.getElementsByClassName('HK').length === 1 &&
				(
					document.body.innerHTML.indexOf('Request admin rights') != -1 ||
					document.body.innerHTML.indexOf('Request ownership') != -1
				)
				)
			{
				
				clearInterval(xint_final_Verify2);
				
				console.log('xx');
				
				// write final
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?Matt_writecomplete_id='+encodeURIComponent(que_object[8])+'&Matt_writecomplete=Verified',
					onload: function (response) {
						//var rs = response.responseText;
						window.location = 'https://www.google.com/local/business/u/0/add/info';
					}
				});
				
				return;
				
			}
		}, intervalTime);
		
		function mt_matt_getYourBusiness() {
			// set interval for https://www.google.com/local/business/u/0/add/select
			var xint5 = setInterval(function() {
				if (document.getElementsByClassName('Id ixgIme').length) {
					clearInterval(xint5);
				} else
					return;
				
				var xint6 = setInterval(function() {
					var ite = document.getElementsByClassName('Id ixgIme');
					if (ite.length) {
						clearInterval(xint6);
					} else
						return;
					
					console.log(document.location.href);// !
					if (document.location.href == 'https://www.google.com/local/business/u/0/add/select')
						hasVisitedSelect = true;
					
					var myEvt = document.createEvent('MouseEvents');
					myEvt.initEvent(
					   'mousedown'      // event type
					   ,true      // can bubble?
					   ,true      // cancelable?
					);
					ite[0].dispatchEvent(myEvt);
					var myEvt = document.createEvent('MouseEvents');
					myEvt.initEvent(
					   'mouseup'      // event type
					   ,true      // can bubble?
					   ,true      // cancelable?
					);
					ite[0].dispatchEvent(myEvt);
				}, intervalTime);
			},intervalTime);
		}
		
		function mt_matt() {
			
			//
			var has_queue = false;
			// Try to avoid pulling two items from the queue by setting
			// a unique id.
			var this_id = encodeURIComponent(Math.random()*100000);
			
			// read from queue for next
			var xint = setInterval(function() {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://localhost/mturk/util.php?Matt_getqueue='+(Math.random()*10)+'&Matt_getqueue_id='+this_id,
					onload: function (response) {
						var rs = response.responseText;
						
						rs = rs.trim();
						if (rs != '' && !has_queue) {
							clearInterval(xint);
							has_queue = true;
						} else
							return;
						
						console.log(rs);
						
						// still here?
						console.log(JSON.parse(rs));
						que_object = JSON.parse(rs); // [] array // que_object
						rs = JSON.parse(rs); // [] array
						
						var r;
						
						r = document.getElementsByClassName('b-Ca');
						r[0].value = rs[0]; //name
						r[1].value = rs[2]; //addr1
						r[3].value = rs[3]; //city
						r[4].value = rs[5]; //zip
						r[5].value = rs[6]; //phone
						r[6].value = rs[7]; //catg
						
						//rs8 == ID
						//rs4 == state
						
						// document.getElementsByClassName('c-v-x c-y-i-d-V') (0..3)
						// El 2 is Country, 3 is State.
						//
						//
						
						// state
						var state = false;
						// state abbr
						for (var i in MT___states) {
							if (i == rs[4]) {
								state = MT___states[i].toLowerCase(); // full, i.e. Iowa
								break;
							}
						}
						if (!state)
							state = rs[4].toLowerCase(); // rs[4] may be "CA" OR "California"
							
						var myEvt = document.createEvent('MouseEvents');
						myEvt.initEvent(
						   'mousedown'	// event type // down
						   ,true		// can bubble?
						   ,true		// cancelable?
						);
						
						// document.getElementsByClassName('c-v-x c-y-i-d-V')
						// Changed from el 2 to 3.
						//
						//
						
						document.getElementsByClassName('c-v-x c-y-i-d-V')[3].dispatchEvent(myEvt);
						var xint1b = setInterval(function() {
							var x;
							x = document.getElementsByClassName('c-X-u');
							
							// THIS WOULD BE STATES (59)
							if (x.length == 59) {
								clearInterval(xint1b);
							} else
								return;
							
							// still here?
							var state_obj;
							
							for (var i in x) {
								console.log(x[i].innerHTML);
								console.log(state);
								if (x[i].innerHTML.toLowerCase() == state.toLowerCase()) {
									state_obj = x[i];
									var myEvt = document.createEvent('MouseEvents');
									myEvt.initEvent(
									   'mousedown'	// event type //
									   ,true		// can bubble?
									   ,true		// cancelable?
									);
									state_obj.dispatchEvent(myEvt);
									myEvt.initEvent(
									   'mouseup'	// event type //
									   ,true		// can bubble?
									   ,true		// cancelable?
									);
									state_obj.dispatchEvent(myEvt);
									break;
								}
							}
							
							var xint1c = setInterval(function() {
								
								// document.getElementsByClassName('c-v-x c-y-i-d-V')
								// Changed from el 2 to 3.
								//
								//
								if (document.getElementsByClassName('c-v-x c-y-i-d-V')[3].innerHTML.toLowerCase() == state) {
									clearInterval(xint1c);
								} else if (state_obj) {
									var myEvt = document.createEvent('MouseEvents');
									myEvt.initEvent(
									   'mouseup'	// event type //
									   ,true		// can bubble?
									   ,true		// cancelable?
									);
									state_obj.dispatchEvent(myEvt);
									return;
								}
								
								// still here?
								
								// submit (down+up)
								// Changed to c-v-x b-d b-d-nb Q4w7Qd from "c-v-x b-d b-d-nb Tp"
								// Changed to var continueButton 
								//
								//
								//
								
								var myEvt = document.createEvent('MouseEvents');
								myEvt.initEvent(
								   'mousedown'      // event type
								   ,true      // can bubble?
								   ,true      // cancelable?
								);
								continueButton.dispatchEvent(myEvt);
								//~ document.getElementsByClassName('c-v-x b-d b-d-nb Q4w7Qd')[0].dispatchEvent(myEvt);
								var myEvt = document.createEvent('MouseEvents');
								myEvt.initEvent(
								   'mouseup'      // event type
								   ,true      // can bubble?
								   ,true      // cancelable?
								);
								continueButton.dispatchEvent(myEvt);
								//~ document.getElementsByClassName('c-v-x b-d b-d-nb Q4w7Qd')[0].dispatchEvent(myEvt);
								
								// start running getYour now.
								mt_matt_getYourBusiness();
								
								
								
								
								
								// but in case trouble with addr?
								var xint2 = setInterval(function() {
									var x;
									x = document.getElementsByClassName('Mn');
									if (x.length) {
										clearInterval(xint2);
										var myEvt = document.createEvent('MouseEvents');
										myEvt.initEvent(
										   'mousedown'      // event type
										   ,true      // can bubble?
										   ,true      // cancelable?
										);
										x[0].dispatchEvent(myEvt);
										var myEvt = document.createEvent('MouseEvents');
										myEvt.initEvent(
										   'mouseup'      // event type
										   ,true      // can bubble?
										   ,true      // cancelable?
										);
										x[0].dispatchEvent(myEvt);	
										
										// set interval for "OK" on map
										var xint3 = setInterval(function() {
											
											var x;
											x = document.getElementsByClassName('c-v-x b-d b-d-nb Gq');
											if (x.length) {
												clearInterval(xint3);
												var myEvt = document.createEvent('MouseEvents');
												myEvt.initEvent(
												   'mousedown'      // event type
												   ,true      // can bubble?
												   ,true      // cancelable?
												);
												x[0].dispatchEvent(myEvt);
												var myEvt = document.createEvent('MouseEvents');
												myEvt.initEvent(
												   'mouseup'      // event type
												   ,true      // can bubble?
												   ,true      // cancelable?
												);
												x[0].dispatchEvent(myEvt);
												
												// set interval for initial submit
												var xint4 = setInterval(function() {
													
													var x;
													x = document.getElementsByClassName('c-v-x b-d b-d-nb Tp');
													if (x.length) {
														clearInterval(xint4);
													} else
														return;
													
													// submit 1
													var myEvt = document.createEvent('MouseEvents');
													myEvt.initEvent(
													   'mousedown'      // event type
													   ,true      // can bubble?
													   ,true      // cancelable?
													);
													x[0].dispatchEvent(myEvt);
													var myEvt = document.createEvent('MouseEvents');
													myEvt.initEvent(
													   'mouseup'      // event type
													   ,true      // can bubble?
													   ,true      // cancelable?
													);
													x[0].dispatchEvent(myEvt);
													
													//mt_matt_getYourBusiness();
												}, intervalTime);
											}
										}, intervalTime);
									}
								}, intervalTime);
							}, intervalTime);
						}, intervalTime);
					}
				});
			}, 400);// poll for new intv!
		}
	}
	
	/**
	 * Timothy Simcoe
	 * ietf.org
	 */
	var loc = document.location.href;
	if  (
			/http:\/\/tools\.ietf\.org\/html\//.exec(loc)
		)
	{
		if (ih.indexOf('Authors\' Addresses') != -1) {
			document.body.innerHTML = ih.replace(/Authors' Addresses/, '<span id="gm__authors_addresses">Authors\' Addresses</span>');
			document.getElementById('gm__authors_addresses').scrollIntoView();
		}
	}
	
	/*
	 * v
	 * v
	 * 
	 * 
	 */
	/*var loc = document.location.href;
	if  (
	
	loc.indexOf('http://www.secretary.state.nc.us/corporations/Filings.aspx?PItemId=10292990') != -1 ||
	loc.indexOf('http://www.adviserinfo.sec.gov/IAPD/Content/ViewIndvl/') != -1 ||
	loc == 'http://www.adviserinfo.sec.gov/IAPD/Support/RAD_CAPTCHA_Test.aspx'

		)
	{
		
	}*/
	
	
	
	/*
	 * Brokercheck
	 * Sharon Sung (SS)
	 * 
	 *
	 */
	var loc = document.location.href;
	if  (
		loc.indexOf('http://brokercheck.finra.org') != -1
		)
	{
		//none
		if (
				loc.toLowerCase() == 'http://brokercheck.finra.org/search/search.aspx' ||
				loc == 'http://brokercheck.finra.org/Search/Search.aspx?PageID=1' ||
				loc == 'http://www.adviserinfo.sec.gov/IAPD/Content/Search/iapd_Search.aspx'
			)
		{
			Sharon_Sung_brokercheck__nextInQueue();
			return;
		}
		//captcha
		if (loc == 'http://brokercheck.finra.org/Support/authentication.aspx') {
			setInterval(function() {
				document.getElementById('RAD_CAPTCHA_Validation').focus();
			}, 300);
			return;
		}
		// homepage
		if (loc.indexOf('http://brokercheck.finra.org/Search/Search.aspx?PageID=1&new_id=') != -1) {
			
			// indiv. radio
			document.getElementById('ctl00_phContent_ucUnifiedSearch_rdoOrg').click();
			
			setTimeout(function() {
				
				var x;
				x = /http:\/\/brokercheck\.finra\.org\/Search\/Search\.aspx\?PageID=1&new_id=([\d\D]+)/.exec(loc);
				x = decodeURIComponent(x[1]);
				x = x.replace(/\+/g, ' ');
				
				// broker id
				document.getElementById('ctl00_phContent_ucUnifiedSearch_txtFirm').value = x;
				// submit btn
				document.getElementById('ctl00_phContent_ucUnifiedSearch_lbtnFreeFormSearch').click();
			}, 120);
			return;
		}
		// search result (by name and by number)
		//http://brokercheck.finra.org/Search/SearchResults.aspx?SearchGroup=Firm&IndlText=&FirmText=148668&PageNumber=1
		var x = /http:\/\/brokercheck\.finra\.org\/Search\/SearchResults\.aspx\?SearchGroup=Firm&IndlText=&FirmText=[^&]+&PageNumber=1$/.exec(loc);
		if  (
				x
			)
		{
			
			// ID is assumed to be a digit. If it is a name search then the name
			// becomes the ID (to file would be scrape of ctl00_phContent_gvBrokerTable_ctl03_lnkName).
			var id;
			id = /&FirmText=([^&]+)/.exec(loc);
			if (id)
				id = id[1];
			else
				return;
			//else {
			//	id = /^http:\/\/brokercheck\.finra\.org\/Individual\/(\d+)$/.exec(loc)[1];
			//}
			
			// More than one result?
			// write all results to file
			/*
			 <b><a href="http://www.adviserinfo.sec.gov/IAPD/support/IAPD_Link_for_NBC.aspx?Indvl_pk=1509870&amp;LinkedFrom=Summary" target="_blank">Investment Adviser Rep</a></b>*/
			if  (
				document.getElementById('ctl00_phContent_gvFirmTable_ctl03_lnkBCOrg') || // 02,03
				!/^\d+$/.exec(id) // is search for a name
				) // first is ctl02
			{
				var write = {}; // (first write to file)
				write.id = decodeURIComponent(id).replace(/\+/g, ' '); // Name is url encoded (' ' == '+')
				write.multiple = '';
				
				var x;
				x = document.getElementById('ctl00_phContent_lblRowCount');
				if (x) {
					write.multiple += '<tr><td>'+x.innerText+'</td></tr>';
				}
				x = document.getElementById('ctl00_phContent_gvFirmTable');
				if (x) {
					write.multiple += x.innerHTML; // table.innerHTML (will add <table>)
				}
				
				Sharon_Sung_brokercheck__writeToFile(write); // goes to Sharon_Sung_brokercheck__nextInQueue();
				return;
			}
			else {
				if (document.getElementById('ctl00_phContent_gvFirmTable_ctl02_lnkBCOrg'))
					document.getElementById('ctl00_phContent_gvFirmTable_ctl02_lnkBCOrg').click(); // finish
				else // no click button for this, it may be only on SCC site!
				{
					var write = {}; // (first write to file)
					write.id = decodeURIComponent(id).replace(/\+/g, ' '); // Name is url encoded (' ' == '+')
					write.multiple = 'Profile is on SEC only';
					Sharon_Sung_brokercheck__writeToFile(write);
				}	
					
			}
			return;
		}
		// no result
		if (loc.indexOf('http://brokercheck.finra.org/Support/NoResults.aspx?SearchGroup=Firm&IndlText=&FirmText=') != -1) {
			
			var write = {};
			var x = /&FirmText=([^&]+)/.exec(loc)[1];
			write.id = decodeURIComponent(x).replace(/\+/g, ' ');// + == ' '
			write.hasResult = false;
			Sharon_Sung_brokercheck__writeToFile(write);
			return;
		}
		// brokercheck result (if limited)
		//http://brokercheck.finra.org/Firm/NonElectFirmSummary.aspx?SearchGroup=Firm&FirmKey=14012&BrokerKey=-1
		if  (
			
			loc.indexOf(
				'http://brokercheck.finra.org/Firm/NonElectFirmSummary.aspx?SearchGroup=Firm&FirmKey='
			) != -1
			
			)
		{
			// ID is assumed to be a digit. If it is a name search then the name
			// becomes the ID (to file would be scrape of ctl00_phContent_gvBrokerTable_ctl03_lnkName).
			var id;
			id = /&FirmKey=([^&]+)/.exec(loc);
			if (id)
				id = id[1];
			else
				return;
			var write = {}; // (first write to file)
			write.id = decodeURIComponent(id).replace(/\+/g, ' '); // Name is url encoded (' ' == '+')
			write.multiple = 'NonElectFirmSummary'; 
			Sharon_Sung_brokercheck__writeToFile(write); //
			return;
		}
		// brokercheck result
		if  (
			
			loc.indexOf(
				'http://brokercheck.finra.org/Firm/FirmSummary.aspx?SearchGroup=Firm&FirmKey='
			) != -1
			
			)
		{
			// save to file
			var write = {};
			write.registered_states = '';
			write.registered_orgs = '';
			write.num_biz_types = '';
			write.affiliated_with = '';
			write.hasResult = true; //
			write.multiple = ''; //
			write.id = '';
			
			var x;
			x = /FirmKey=(\d+)/.exec(loc);
			x = x[1];
			
			write.id = x;
			
			var r;
			
			//
			r = /<span id="ctl00_phContent_lblSRO">([\d,]+) *<\/span><span id="ctl00_phContent_glsSRO">Self-Regulatory Organizations?<\/span>/.exec(ih);
			if (r) {
				write.registered_orgs = r[1];
			}
			//
			r = / <span id="ctl00_phContent_lblStates">(\d+) U\.S\. state/.exec(ih);
			if (r) {
				write.registered_states = r[1];
			}
			// 
			r = /<span id="ctl00_phContent_lblBusinesses">([\d,]+) types? of business/.exec(ih);
			if (r) {
				write.num_biz_types = r[1];
			}
			//
			if (ih.indexOf('<span id="ctl00_phContent_lblAffiliation">This firm is not affiliated with ') != -1) {
				write.affiliated_with = 'is not';
			}
			else if (ih.indexOf('<span id="ctl00_phContent_lblAffiliation">This firm is affiliated with ') != -1) {
				write.affiliated_with = 'is';
			}
			Sharon_Sung_brokercheck__writeToFile(write);
			return;
		}
		
		function Sharon_Sung_brokercheck__writeToFile(w) {
			
			//console.log(w);
			
			var id = w.id;
			
			var nextqueue;
			nextqueue = true; //always true here
			/*if (w.comp == '')
				nextqueue = false;
			else
				nextqueue = true;*/
			
			console.log(w);
			// write
			GM_xmlhttpRequest({
				method: 'POST',
				url: MT___host+'/mturk/util.php',
				data: 'SharonSung_brokercheck__id='+id+'&SharonSung_brokercheck__write='+encodeURIComponent(JSON.stringify(w)),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (response) {
					var rs = response.responseText;
					
					Sharon_Sung_brokercheck__nextInQueue();
				}
			});
		}
		function Sharon_Sung_brokercheck__nextInQueue() {
			// set intv to get next from queue
			var xint = setInterval(function() {
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host+'/mturk/util.php?SharonSung_brokercheck__readQueue=&'+Math.random()*100,
					onload: function (response) {
						var rs = response.responseText;
						if (rs.trim() != '') {
							clearInterval(xint);
							window.location = 'http://brokercheck.finra.org/Search/Search.aspx?PageID=1&new_id='+rs;
							
							//location.reload(true); // forceGet (not cached)
						}
					}
				});
			}, 400);
		}
		
		// RETURN HERE SO THAT FIVE STAR DOES NOT RUN
		return;
	}
	/**
	 * Brokercheck
	 * Five Star Professional
	 * 
	 * auth - http://brokercheck.finra.org/Support/authentication.aspx
	 */
	var loc = document.location.href;
	if  (
	
		loc.indexOf('http://brokercheck.finra.org') != -1 ||
		loc.indexOf('http://www.adviserinfo.sec.gov/IAPD/Content/ViewIndvl/') != -1 ||
		loc == 'http://www.adviserinfo.sec.gov/IAPD/Support/RAD_CAPTCHA_Test.aspx' ||
		loc == 'http://www.adviserinfo.sec.gov/IAPD/Content/Search/iapd_Search.aspx'

		)
	{
		
		//none
		if (
				loc.toLowerCase() == 'http://brokercheck.finra.org/search/search.aspx' ||
				loc == 'http://brokercheck.finra.org/Search/Search.aspx?PageID=1' ||
				loc == 'http://www.adviserinfo.sec.gov/IAPD/Content/Search/iapd_Search.aspx'
			)
		{
			five_star_pr_nextInQueue();
			return;
		}
		//captcha
		if (loc == 'http://www.adviserinfo.sec.gov/IAPD/Support/RAD_CAPTCHA_Test.aspx') {
			setInterval(function() {
				document.getElementById('RAD_CAPTCHA_Validation').focus();
			}, 300);
			return;
		}
		//captcha
		if (loc == 'http://brokercheck.finra.org/Support/authentication.aspx') {
			setInterval(function() {
				document.getElementById('RAD_CAPTCHA_Validation').focus();
			}, 300);
			return;
		}
		// homepage
		if (loc.indexOf('http://brokercheck.finra.org/Search/Search.aspx?PageID=1&new_id=') != -1) {
			
			// indiv. radio
			document.getElementById('ctl00_phContent_ucUnifiedSearch_rdoIndvl').click();
			
			setTimeout(function() {
				
				var x;
				x = /http:\/\/brokercheck\.finra\.org\/Search\/Search\.aspx\?PageID=1&new_id=([\d\D]+)/.exec(loc);
				x = decodeURIComponent(x[1]);
				x = x.replace(/\+/g, ' ');
				
				// broker id
				document.getElementById('ctl00_phContent_ucUnifiedSearch_txtIndvl').value = x;
				// submit btn
				document.getElementById('ctl00_phContent_ucUnifiedSearch_lbtnFreeFormSearch').click();
			}, 120);
			return;
		}
		
		//XXXXXsearch result - By Name
		//http://brokercheck.finra.org/Search/SearchResults.aspx?SearchGroup=Individual&IndlText=5553825&FirmText=&PageNumber=1 
		//XXXXor
		//XXXXhttp://brokercheck.finra.org/Individual/5553825
		/*var x = /http:\/\/brokercheck\.finra\.org\/Search\/SearchResults\.aspx\?SearchGroup=Individual&IndlText=[^\d]{1][^&]+&FirmText=&PageNumber=1$/;
		if  (
				x.exec(loc)
			)
		{
			five_star_pr_nextInQueue();
			return;
		}*/
		
		// search result (by name and by number)
		var x = /http:\/\/brokercheck\.finra\.org\/Search\/SearchResults\.aspx\?SearchGroup=Individual&IndlText=[^&]+&FirmText=&PageNumber=1$/.exec(loc);
		if  (
				x
			)
		{
			
			// ID is assumed to be a digit. If it is a name search then the name
			// becomes the ID (to file would be scrape of ctl00_phContent_gvBrokerTable_ctl03_lnkName).
			var id;
			id = /&IndlText=([^&]+)/.exec(loc);
			if (id)
				id = id[1];
			else
				return;
			
					//else {
					//	id = /^http:\/\/brokercheck\.finra\.org\/Individual\/(\d+)$/.exec(loc)[1];
					//}
			
			// More than one result?
			// write all results to file
			/*
			 <b><a href="http://www.adviserinfo.sec.gov/IAPD/support/IAPD_Link_for_NBC.aspx?Indvl_pk=1509870&amp;LinkedFrom=Summary" target="_blank">Investment Adviser Rep</a></b>*/
			if  (
				document.getElementById('ctl00_phContent_gvBrokerTable_ctl03_lnkBC') || // 02,03
				!/^\d+$/.exec(id) // is search for a name
				) // first is ctl02
			{
				
				var write = {}; // (first write to file)
				write.id = decodeURIComponent(id).replace(/\+/g, ' '); // Name is url encoded (' ' == '+')
				write.multiple = '';
				
				var x;
				x = document.getElementById('ctl00_phContent_lblRowCount');
				if (x) {
					write.multiple += '<tr><td>'+x.innerText+'</td></tr>';
				}
				x = document.getElementById('ctl00_phContent_gvBrokerTable');
				if (x) {
					write.multiple += x.innerHTML; // table.innerHTML (will add <table>)
				}
				
				five_star_pr_writeToFile(write); // goes to five_star_pr_nextInQueue();
				return;
				/*var d;
				d = document.createElement('input');
				d.setAttribute('id','d1');
				d.setAttribute('style','position:absolute;top:0;left:0;');
				d.value = 'More than one';
				document.body.appendChild(d);
				document.getElementById('d1').focus();*/
			}
			
			// Assuming there is only one broker result
			// write to file on whether SEC, FINRA, or DUAL
			
			var lic_type = '';
			
			// this is IAR-style link
			var x = /javascript:window\.open\('(http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/support\/IAPD_Summary_Link\.aspx\?IndividualID=\d+)/.exec(ih);
			
			if (x) {
				x = x[1] + '&Source=Summary';
			} else if
				(
					ih.indexOf
					(
				"<img src='../images/BrokerCheck/icon-blueCheck.png'   border=0 style='vertical-align:top;padding-right:5px' />Investment Adviser"
					) != -1 ||
					ih.indexOf
					(
				'<img src="../images/BrokerCheck/icon-blueCheck.png" border="0" style="vertical-align:top;padding-right:5px">Investment Adviser'
					) != -1
				)
			{
				// Always go to IAR first if "Investment Adviser"
				// ...
				//
				x = 'http://www.adviserinfo.sec.gov/IAPD/support/IAPD_Summary_Link.aspx?IndividualID='+id+'&Source=Summary';
				
				//<img src='../images/BrokerCheck/icon-blueCheck.png'   border=0 style='vertical-align:top;padding-right:5px' />Investment Adviser
				//return;
			}
			
			// iar first (else broker)
			if  (x && document.getElementById('ctl00_phContent_gvBrokerTable_ctl02_lnkBC'))
			{
				lic_type = 'DUAL';
			}
			// broker
			else if (x) {
				lic_type = 'SEC';
			}
			else if (document.getElementById('ctl00_phContent_gvBrokerTable_ctl02_lnkBC')) {
				lic_type = 'FINRA';
			}
			
			// Write the inital file for broker
			// Only one broker exists
			if (lic_type != '') {
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host+'/mturk/FiveStarProfessional/FiveStarProfessional.php?write='+lic_type+'&id='+encodeURIComponent(id),
					onload: function (response) {
						//var rs = response.responseText;
						if (lic_type == 'DUAL' || lic_type == 'SEC')
							window.location = x;
						else if (lic_type == 'FINRA')
							document.getElementById('ctl00_phContent_gvBrokerTable_ctl02_lnkBC').click();
						else {
							
						}
					}
				});
			}
			
			return;
			//IAR LINK CHANGE, NOV. 25, 2013
			/*var x = document.getElementById('ctl00_phContent_gvBrokerTable_ctl02_btnConfirmDelete');
			if (x) {console.log(x.onclick);
				x = x.onclick;console.log(x.onclick);
				x = /http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/support\/IAPD_Summary_Link\.aspx\?IndividualID=\d+&Source=Summary/.exec(x);
				if (x) {
					x = x[0];
				}
			}
			//XXvar x = /<input type="submit" name="ctl00\$phContent\$gvBrokerTable\$ctl02\$btnConfirmDelete" value=" Continue " onclick="javascript:window\.open\(&#39;(http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/support\/IAPD_Summary_Link\.aspx\?IndividualID=\d+)/.exec(ih);
			//XXX OLD STYLE XXX
			//var x = /<b><a href=['"](http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/support\/IAPD_Link_for_NBC\.aspx\?Indvl_pk=\d+&amp;LinkedFrom=Summary)['"] target=['"]_blank['"]>Investment Adviser Rep<\/a><\/b>/.exec(ih);
			//if (x)
			//	x = x[1] + '&Source=Summary';
				//x = x[1].replace('&amp;', '&');
			console.log(x);
			*/
			/*
			 * XXXquit
			 */
			/*if (document.body.innerHTML.indexOf('adviserinfo.sec.gov') != -1)
			{
				return;
			}*/ //
			//http://www.adviserinfo.sec.gov/IAPD/support/IAPD_Summary_Link.aspx?IndividualID=1481548&Source=Summary
		}
		// no result
		if (loc.indexOf('http://brokercheck.finra.org/Support/NoResults.aspx?SearchGroup=Individual&IndlText=') != -1) {
			
			var write = {};
			var x = /&IndlText=([^&]+)/.exec(loc)[1];
			write.id = decodeURIComponent(x).replace(/\+/g, ' ');// + == ' '
			write.hasResult = false;
			five_star_pr_writeToFile(write);
			return;
		}
		
		// broker (adviserinfo.sec)
		if  (
			loc.indexOf(
				'www.adviserinfo.sec.gov/IAPD/Content/ViewIndvl/IAPD_IndvlSummary.aspx?SearchGroup=Individual&FirmKey=-1&IndvlKey='
			) != -1 ||
			loc.indexOf(
				'www.adviserinfo.sec.gov/IAPD/Content/ViewIndvl/IAPD_IndvlSummary.aspx?Indvl_PK='
			) != -1
			)
		{
			// save to file
			var write = {};
			write.hasResult = true;
			write.name = '';
			write.compType = '';
			write.comp = '';
			write.discl = '';
			//write.not_active_FINRA = false;
			write.not_active_SEC = false;
			write.runIsComplete = false; // run will be complete if link to brokercheck does not exist!
			write.multiple = ''; // for multiple matches
			write.id = '';
			
			var x;
			x = /http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/Content\/ViewIndvl\/IAPD_IndvlSummary\.aspx\?SearchGroup=Individual&FirmKey=-1&IndvlKey=(\d+)/.exec(loc);
			if (x)
				x = x[1];
			else {
				x = /http:\/\/www\.adviserinfo\.sec\.gov\/IAPD\/Content\/ViewIndvl\/IAPD_IndvlSummary\.aspx\?Indvl_PK=\?(\d+)/.exec(loc);
				x = x[1];
			}
			
			write.id = x;
			
			var r;
			
			/*
			 <table id="ctl00_cphMainContent_uCurrentEmployments_dlEmployement" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
			<tbody><tr>
				<td valign="top">*/
			
			// name/id
			r = /<span id="ctl00_cphMainContent_lblPageHeader">([^\(]+)\(CRD# (\d+)\)/.exec(ih);
			
			if (r) {
				write.name = r[1].trim();
				write.crd = r[2];
			}
			
			// comp.
			r = /<table id="ctl00_cphMainContent_uCurrentEmployments_dlEmployement" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">[\r\n\t\s]+<tbody><tr>[\r\n\t\s]+<td valign="top">((.|\s)*?(?=<\/td>|$)|$)/.exec(ih);
			if (r) {
				write.comp = r[1];
				write.compType = 2;
			}
			
			// discl.
			r = /       <span id="ctl00_cphMainContent_lblDisclosureExits">(Yes|No)<\/span>/.exec(ih)
			if (r) {
				write.discl = r[1];
			}
			
			// not active sec
			if  (
					ih.indexOf('<div id="ctl00_cphMainContent_msgRegistration">This individual is not currently registered as an Investment Adviser Representative.</div>') != -1// &&
					//document.getElementById('ctl00_cphMainContent_hlnkNBCIndvl')
				)
			{
				write.not_active_SEC = true;
			}
			else if 
				(
					ih.indexOf('<span id="ctl00_phContent_lblIARegistered" style="display:inline-block;width:200px;"><img src=\'../images/BrokerCheck/icon-blueCheck.png\'   border=0 style=\'vertical-align:top;padding-right:5px\' />Investment Adviser</span>') != -1
				)
			{
				write.not_active_SEC = false;
			}
			
			if (!document.getElementById('ctl00_cphMainContent_hlnkNBCIndvl')) {
				write.runIsComplete = true;
			}
			
			five_star_pr_writeToFile(write);
			return;
		}
		
		// broker (brokercheck.finra)
		if  (
			
			loc.indexOf(
				'http://brokercheck.finra.org/Individual/IndividualSummary.aspx?SearchGroup=Individual&FirmKey=-1&BrokerKey='
			) != -1
			
			)
		{
			// save to file
			var write = {};
			write.hasResult = true;
			write.name = '';
			write.compType = '';
			write.comp = '';
			write.discl = '';
			write.not_active_FINRA = false;
			//write.not_active_SEC = false;
			write.runIsComplete = true; // always true here
			write.multiple = ''; // for multiple matches
			write.id = '';
			
			var x;
			x = /http:\/\/brokercheck\.finra\.org\/Individual\/IndividualSummary\.aspx\?SearchGroup=Individual&FirmKey=-1&BrokerKey=(\d+)/.exec(loc);
			x = x[1];
			
			write.id = x;
			
			var r;
			
			// name/id
			r = /<span id="ctl00_phContent_lblHeader" class="LargeText18">([^<]+)<\/span>/.exec(ih);
			if (r) {
				write.name = r[1].trim();
			}
			r = /<span id="ctl00_phContent_lblSubHeading" style="color:Black;">CRD# ([^<]+)<\/span>/.exec(ih);
			if (r) {
				write.crd = r[1].trim();
			}
			// comp.
			r = /<table cellspacing="0" border="0" id="ctl00_phContent_uCurrentEmployments_dlEmployement" style="border-color:Black;border-width:0px;width:100%;border-collapse:collapse;">((.|\s)*?(?=<\/table>|$)|$)/.exec(ih);
			if (r) {
				write.comp = r[1].trim();
				write.compType = 1;
			}
			// discl.
			r = /<b><span id="ctl00_c?phContent_lblDisclosureExits">(This broker has no disclosure events\.|This broker has disclosure events\.)/.exec(ih)
			if (r) { // has/ has not
				write.discl = r[1];
			}
			// discl.
			/*r = /       <span id="ctl00_cphMainContent_lblDisclosureExits">(Yes|No)<\/span>/.exec(ih)
			if (r) {
				write.discl = r[1];
			} else {
				//r = /<span id="ctl00_phContent_lblDisclosureExits">This broker has disclosure events\./.exec(ih);
				//if (r) {
				if (ih.indexOf('This broker has disclosure events.') != -1) {
					write.discl = 'Yes';
				}
			}*/
			
			// not active
			r = /<span id="ctl00_phContent_uCurrentEmployments_lblCaption">This broker is not currently registered with any FINRA firm\./.exec(ih);
			if (r) {
				write.not_active_FINRA = true; // not_active_FINRA == true
			}
			five_star_pr_writeToFile(write);
			return;
			
			//
			//OLD STYLE
			//
			//~ /*// name/id
			//~ r = /<td align="left" nowrap="nowrap">[\r\n\t\s]+<span id="ctl00_lblPageHeader" class="PageHeader">([^<]+)<\/span><br[^>]{0,}>[\r\n\t\s]+<span id="ctl00_lblPageSubHeading" style="color:Black;">CRD# (\d+)<\/span>/.exec(ih);
			//~ if (r) {
				//~ write.name = r[1];
				//~ write.crd = r[2];
			//~ }*/
			//~ 
			//~ /*// comp.
			//~ r = /<table id="ctl00_phContent_uCurrentEmployments_dlEmployement" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">[\r\n\t\s]+<tbody><tr>[\r\n\t\s]+<td class="ListItem" valign="top">[\r\n\t\s]+((.|\s)*?(?=<\/td>|$)|$)/.exec(ih);
			//~ if (r) {
				//~ write.comp = r[1].trim();
				//~ write.compType = 1;
			//~ }*/
			//~ 
			//~ //r = /<b><span id="ctl00_phContent_lblDisclosureExits">(This broker has no disclosure events\.|[^<]+)<\/span><\/b>/.exec(ih);
			//~ //if (!r) {
			//~ //	alert('disclosure');
			//~ //	return;
			//~ //}
			//~ /*// discl.
			//~ r = /<span id="ctl00_phContent_lblDisclosureExistsQuestion">Are there events disclosed about this broker\? <\/span><b><span id="ctl00_phContent_lblDisclosureExits">(Yes|No)<\/span>/.exec(ih)
			//~ if (r) {
				//~ write.discl = r[1];
			//~ }*/
			//~ 
			//~ /*// not active
			//~ r = /<span id="ctl00_phContent_uCurrentEmployments_lblCaption">This broker is not currently registered with FINRA\.<\/span>/.exec(ih);
			//~ if (r) {
				//~ write.not_active_FINRA = true; // not_active_FINRA == true
			//~ }*/
			//~ 
			//~ /*OLD STYLE
			 //~ <td align="left" nowrap="nowrap">
				//~ <span id="ctl00_lblPageHeader" class="PageHeader">ALEXANDER S. BACON</span><br>
				//~ <span id="ctl00_lblPageSubHeading" style="color:Black;">CRD# 5553825</span>
			//~ </td>*/
			//~ /*
			 //~ <table id="ctl00_phContent_uCurrentEmployments_dlEmployement" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
		//~ <tbody><tr>
			//~ <td class="ListItem" valign="top">
							//~ <font class="HighlightedText">CITIGROUP GLOBAL MARKETS INC.</font><br>
							//~ CITIBANK<br>ONE COURT SQUARE, 39TH FLOOR<br>LONG ISLAND CITY, NY&nbsp;&nbsp;11101<br>
							//~ CRD#&nbsp;7059<br>
							//~ Registered with this firm since:&nbsp;6/1/2012<br><br>
						//~ </td><td></td><td></td><td></td><td></td><td></td>*/
		}
		
		
		function five_star_pr_writeToFile(w) {
			
			//console.log(w);
			
			var id = w.id;
			
			var nextqueue;
			nextqueue = true; //always true here
			/*if (w.comp == '')
				nextqueue = false;
			else
				nextqueue = true;*/
			
			// write
			w = JSON.stringify(w);
			
			GM_xmlhttpRequest({
				method: 'POST',
				url: MT___host+'/mturk/FiveStarProfessional/FiveStarProfessional.php',
				data: 'id='+id+'&write='+encodeURIComponent(w),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (response) {
					var rs = response.responseText;
					
					//var sec_next;
					//sec_next = /<a id="ctl00_cphMainContent_hlnkNBCIndvl" title="Link to Individual Broker Check Information" href="http:\/\/brokercheck\.finra\.org\/Support\/NBC_Link_For_IAPD.aspx\?INDVL_PK=\d+&LinkedFrom=Summary" target="_new" style="font-weight:normal;">http:\/\/www\.finra\.org\/brokercheck\/
					if  (
							// // // //ih.indexOf('<div id="ctl00_cphMainContent_msgRegistration">This individual is not currently registered as an Investment Adviser Representative.</div>') != -1 &&
							
							document.getElementById('ctl00_cphMainContent_hlnkNBCIndvl') &&
							(
								w.comp != '' || // not active or no company registered
								w.not_active_FINRA
							)
							
						)
					{
						document.getElementById('ctl00_cphMainContent_hlnkNBCIndvl').click();
					}
					else if (nextqueue)
						five_star_pr_nextInQueue();
				}
			});
			
			// wait for next
			//five_star_pr_nextInQueue();
		}
		function five_star_pr_nextInQueue() {
			// set intv to get next from queue
			var xint = setInterval(function() {
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host+'/mturk/FiveStarProfessional/FiveStarProfessional.php?readQueue=&'+Math.random()*1000,
					onload: function (response) {
						var rs = response.responseText;
						if (rs.trim() != '') {
							clearInterval(xint);
							window.location = 'http://brokercheck.finra.org/Search/Search.aspx?PageID=1&new_id='+rs;
							
							//location.reload(true); // forceGet (not cached)
						}
					}
				});
			}, 300);
		}
		
		
		return;
	}
	
	/**
	 * Regulations.gov
	 * Brendan J. Babb
	 * 
	 */	
	// http://www.regulations.gov/#!documentDetail;D=EPA-HQ-ORD-2013-0189-2656
	var x = document.location.href;
	if (x.indexOf('http://www.regulations.gov/#!documentDetail;D=') != -1)
		load_regulations_gov();
	function load_regulations_gov() {
		
		var x = document.location.href;
			
		if  (
			x.indexOf('http://www.regulations.gov/#!documentDetail;D=') != -1
		)
		{
			
			var u;
			u = /D=([\d\D]+)/.exec(x)[1];
			
			var pdfs = [];
			
			var xint = setInterval(function() {
				
				var a = document.getElementsByTagName('a');
				var r = /http:\/\/www\.regulations\.gov\/contentStreamer\?objectId=[\w\d]{0,40}&disposition=attachment&contentType=pdf/;
				//var doc;
				var i;
				var v;
				for (i in a) {
					
					v = r.exec(a[i].href);
					
					if (v) {
						
						clearInterval(xint);
						
						v = v[0].replace(/=attachment/, '=');
						
						pdfs.push(v);
						
					}
				}
				
				// no docs. available?
				var ih;
				ih = document.body.innerHTML;
				var empty = false;
				if (ih.indexOf('<i>No documents available.</i>') != -1 && />Comment</.exec(ih)) {
					clearInterval(xint);
					empty = true;
				}
				
				
				
				if (pdfs.length || empty) {
						
					// comment
					//var r = />Comment<\/h2> <div class=\\"[^\\]+\\"> <div class=\\"clearfix hidden\\"> <div class=\\"floatLeft\\" style=\\"margin-top:10px\\">View document:<\/div> <div class=\\"[^\\]+\\"><\/div> <\/div> <div class=\\"\\">((.|\s)*?(?=<\/div>|$)|$)/.exec(ih);
					//if (r) {
					//	pdfs.unshift(r[1]); // start
					//}
					
					//pdfs.push(ih); // add ih
					
					pdfs.unshift(ih); // add ih
					
					// save here
					GM_xmlhttpRequest({
						method: 'POST',
						// cache
						url: 'http://localhost/mturk/BrendanJBabb/BrendanJBabb.php',
						data: 'u2='+encodeURIComponent(u)+'&v2='+encodeURIComponent(JSON.stringify(pdfs)),
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload: function (response) {
							var rs = response.responseText;
							
							// set intv to get next from queue
							var xint = setInterval(function() {
								GM_xmlhttpRequest({
									method: 'GET',
									url: 'http://localhost/mturk/BrendanJBabb/BrendanJBabb.php?u2=&'+Math.random()*1000,
									onload: function (response) {
										var rs = response.responseText;
										if (rs.trim() != '') {
											clearInterval(xint);
											window.location = 'http://www.regulations.gov/#!documentDetail;D=' + rs;
											location.reload(true); // forceGet (not cached)
										}
									}
								});
							}, 40);
								
							
						}
					});
				}
			}, 40);
		}
	}
	
	// add url
	function load_url() {
		var x = document.location.href;
		
		if (
				x.indexOf('.mturk.com/') == -1 &&
				x.indexOf('.mturkcontent.com/') == -1 &&
				x.indexOf('.amazonaws.com/') == -1
			)
		{
			d = document.createElement('input');
			d.setAttribute('id',SCRIPT_NAME);
			document.body.appendChild(d);
			var d1 = document.getElementById(SCRIPT_NAME);
			d1.style.position='fixed';
			d1.style.top='0px';
			d1.style.left='0%';
			d1.style.width='30px';
			d1.style.height='30px';
			d1.value = x;
			d1.onmouseover = d1.onclick = function() { this.select(); }
			
			//document.body.style.minHeight = '1600px';
		}
	}

	
	
	// KH
	function load_kh() {
		var x = document.location.href;
		var URL = x;
		if  (
				/^https?:\/\/www\.mturk\.com$/.exec(x) ||
				/^https?:\/\/www\.mturk\.com\//.exec(x) ||
				/^https?:\/\/s3\.amazonaws\.com\//.exec(x) ||
				/\.(jpg|jpeg|gif|bmp|png|tiff|tif|raw|ppm|pgm|pbm|svg|ps)/i.exec(x) ||
				!/^https?:\/\/[^\/]+\/?$/i.exec(x)
			)
		{
			window.ondblclick = function() {
				kristin_howe_allpagesre();
			}
			return;
		}
		
		kristin_howe_allpagesre();
		
		function kristin_howe_allpagesre() {
			//console.log(x);
			
			// stop?
			setTimeout(function() {
				window.stop();
			}, 6000);
			
			GM_addStyle('body {font-size:40% !important !important;zoom: 0.4; -moz-transform: scale(0.4); -moz-transform-origin: 0 0}');
			
			//window.onunload = function() {
			//	return false;
			//}
			window.addEventListener('beforeunload', function(event) {
				console.log('I am the 1st one.');
				event.returnValue = "\o/";
				event.preventDefault();
				event.stopPropagation();
				event.cancelBubble = true;
				//return false;
			});
			window.addEventListener('unload', function(event) {
				console.log('I am the 3rd one.');
				event.returnValue = "\o/";
				event.preventDefault();
			});
			/*function cancelEvent(e){
				try {
					if (e) {
						e.returnValue = false;
						e.cancelBubble = true;
						if (e.stopPropagation)
							e.stopPropagation();
						if (e.preventDefault)
							e.preventDefault();
					}
				} catch (err) {}
				return false;
			}
			window.onbeforeunload = function (e) {
				return cancelEvent(e);
				// else code here
			}*/
			/*window.onbeforeunload = function (e) {
			   var message = 'Are you sure you want to leave?'; 
				var e = e || window.event;
				// For IE and Firefox prior to version 4
				if (e) {
					e.returnValue = message;
				}
				e.stopPropagation();
				e.preventDefault();
				// For Safari
				return message;
			};*/
			
			var url_base;// = x;
			var url_cwd;// = x;
			
			if (/https?:\/\/[^\/]+\/[\d\D]{1,}/.exec(x)) { // trailing component
				
				// no slash
				url_base = x.replace(/(https?:\/\/[^\/]+)[\d\D]{0,}/, '$1'); //(http://www.url.com)/some/other.php
				
				// slash
				url_cwd = x.replace(/\/[^\/]+$/, '/'); //(http://www.url.com/some/)other.php
			
			} else if (/https?:\/\/[^\/]+\/$/.exec(x)) { //trailing slash
				
				// no slash
				url_base = x.replace(/(https?:\/\/[^\/]+)[\d\D]{0,}/, '$1');
				
				// slash
				url_cwd = x; // slash
			
			} else { // no trailing slash
				url_base = x;
				url_cwd = x + '/';
			}
			
			var d;
			d = document.createElement('div');
			d.setAttribute('id','d1');
			//d.setAttribute('type','text');
			document.body.appendChild(d);
			var d1 = document.getElementById('d1');
			d1.style.position='absolute';
			d1.style.top='0px';
			d1.style.left='0px';
			d1.style.width='90px';
			d1.style.height='300px';
			d1.style.backgroundColor='#eee';
			d1.style.fontSize='8px';
			d1.style.display='none';
			d1.style.zIndex='100000000000000000000000000000000000000000000000000000000000000000000000';
			
			d = document.createElement('div');
			d.setAttribute('id','d2');
			document.body.appendChild(d);
			var d2 = document.getElementById('d2');
			d2.style.position='absolute';
			d2.style.top='0px';
			d2.style.left='0px';
			d2.style.width='10px';
			d2.style.height='10px';
			d2.style.backgroundColor='lime';
			d2.style.zIndex='10000000000000000000000000000000000';
			d2.innerHTML = '&nbsp;';
			
			//d1.onmouseover = function() {
			//	this.select();
			//}
			/*
			d=document.createElement('div'); //
			//d=document.createElement('iframe'); //
			d.setAttribute('id','d2');
			document.body.appendChild(d);
			var d2 = document.getElementById('d2');
			d2.style.position='absolute';
			d2.style.top='0px';
			d2.style.left='30%';
			d2.style.width='70%';
			d2.style.height='3400px';
			d2.style.overflow='auto';
			d2.style.border='1px solid blue';
			d2.style.backgroundColor='white';
			d2.style.fontSize='12px';*/
			
			var SKIP_IMAGES = [/\.js/i, /\.swf/i, /\.bs/i];
			
			var all = document.getElementsByTagName("*");
			// click, fontSize
			for (var i in all) {
				//click
				all[i].onclick = function() {
					//var x;
					//console.log(window.getComputedStyle(this, false).backgroundImage);
					//d1.value = window.getComputedStyle(this, false).style.backgroundImage;
					var x = window.getComputedStyle(this, false).backgroundImage;
					console.log(x);
					var y;
					if (x.indexOf('url(') != -1) {
						
						y = /url\(([^\)]+)\)/.exec(x);
						
						if (!y) return;
						
						y = y[1];
						
						if (y[0] == '/') { //root
							y = url_base + y;
						}
						else if (/^http/.exec(y)) { //full
							//
						}
						else { // cwd
							y = url_cwd + y; // ../../ ?? http://www.a.com/some/dir/(../../.css)
						}
						
						var skip = false;
						for (var i in SKIP_IMAGES) {
							if (SKIP_IMAGES[i].exec(y)) {
								skip = true;
								break;
							}
						}
						if (skip) return;
						
						//d1.value += y+"\n";
						o = '<p style="border-bottom:1px solid lime;width:100%;">';
						o+= '<img src="'+y+'" style="height:28px;" ><br >';
						//o+= '<img src="'+r2+'" style="height:26px;" ><br>';
						o+= '<input type="text" value="'+y+'" class="exe" style="width:100%;" >';
						o+= '</p>';
						
						d1.innerHTML += o;
						
						d1.style.display = 'block';
					} else if (x.trim() == 'none') {
						//console.log(x);
						//console.log(this);
						if (this.src) {
							y = this.src;
						
							if (!y) return;
							
							//y = y[1];
							
							if (y[0] == '/') { //root
								y = url_base + y;
							}
							else if (/^http/.exec(y)) { //full
								//
							}
							else { // cwd
								y = url_cwd + y; // ../../ ?? http://www.a.com/some/dir/(../../.css)
							}
							
							var skip = false;
							for (var i in SKIP_IMAGES) {
								if (SKIP_IMAGES[i].exec(y)) {
									skip = true;
									break;
								}
							}
							if (skip) return;
							
							//d1.value += y+"\n";
							o = '<p style="border-bottom:1px solid lime;width:100%;">';
							o+= '<img src="'+y+'" style="height:28px;" class="exe_im" ><br >';
							//o+= '<img src="'+r2+'" style="height:26px;" ><br>';
							o+= '<input type="text" value="'+y+'" class="exe" style="width:100%;" >';
							o+= '</p>';
							
							d1.innerHTML += o;
							
							d1.style.display = 'block';
						}
					}
					
					var x = document.getElementsByClassName('exe');
					for (var i in x) {
						x[i].onmouseover = function() {
							this.select();
						}
						/*x[i].onclick = function() {
							d1.innerHTML = this.src;
							d1.onmouseover = function() {
								this.select();
							}
						}*/
					}
					/*var x = document.getElementsByClassName('exe_im');
					for (var i in x) {
						x[i].onclick = function() {
							this.id = '____kristinhowerealty____';
							GM_xmlhttpRequest({
								method: 'GET',
								url: 'http://localhost/mturk/KristinHowe/KristinHowe.php?w='+encodeURIComponent(URL)+'&w2='+this.src,
								onload: function (response) {
									var rs=response.responseText;
									document.getElementById('____kristinhowerealty____').style.border = '1px solid lime';
								}
							});
						}
					}*/
					
					//false
					return false;
				}
				//font
				//if (this.style) {
				//	if (this.style.fontSize)
				//		this.style.fontSize = '8px !important !important';
				//}
			}
			// images
			var IMAGES = [];
			for (var i in all) {
				
				var x = window.getComputedStyle(all[i], false);
				if (!x) continue;
				if (!x.backgroundImage) continue;
				x = x.backgroundImage;
				
				var y;
				
				if (x.indexOf('url(') != -1) {
					
					y = /url\(([^\)]+)\)/.exec(x);
					
					if (!y) return;
					
					y = y[1];
					
					if (y[0] == '/') { //root
						y = url_base + y;
					}
					else if (/^http/.exec(y)) { //full
						//
					}
					else { // cwd
						y = url_cwd + y; // ../../ ?? http://www.a.com/some/dir/(../../.css)
					}
					
					var skip = false;
					for (var i in SKIP_IMAGES) {
						if (SKIP_IMAGES[i].exec(y)) {
							skip = true;
							break;
						}
					}
					if (skip) continue;
					
					if (!__js_inarray(IMAGES, y)) {
						IMAGES.push(y);
					}
				} else if (x.trim() == 'none') {
					if (all[i].src) {
						y = all[i].src;
					
						if (!y) return;
						
						//y = y[1];
						
						if (y[0] == '/') { //root
							y = url_base + y;
						}
						else if (/^http/.exec(y)) { //full
							//
						}
						else { // cwd
							y = url_cwd + y; // ../../ ?? http://www.a.com/some/dir/(../../.css)
						}
						
						var skip = false;
						for (var i in SKIP_IMAGES) {
							if (SKIP_IMAGES[i].exec(y)) {
								skip = true;
								break;
							}
						}
						if (skip) continue;
						
						if (!__js_inarray(IMAGES, y)) {
							IMAGES.push(y);
						}
					}
				}
			}
			//if (IMAGES.length) { // post
			setTimeout(function() {
				GM_xmlhttpRequest({
					method: "POST",
					url: 'http://localhost/mturk/KristinHowe/KristinHowe.php',
					data: 'w='+encodeURIComponent(URL)+'&w2='+encodeURIComponent(JSON.stringify(IMAGES)),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {
						//var rs=response.responseText;
					}
				});
			}, 1000); //xx
			//}
		}
	}
	
}
// END load()

/**
 * load__allPages_AMT_combo()
 * 
 */
function load__allPages_AMT_combo__btn() {
	// Have a run button
	var d;
	d = document.createElement('input');
	d.setAttribute('id','MT___RUN_MANUAL_fkbjsoidsivjdijvjidsuhiusd');
	d.setAttribute('type','button');
	d.setAttribute('style','position:absolute;top:10px;left:0;width:10px;height:10px;z-index:1000000000;background-color:#eeffbb;');
	d.onclick = function() {
		this.onclick = function() {
			return false;
		}
		this.style.backgroundColor = 'lime';
		load__allPages_AMT_combo();
	}
	document.body.appendChild(d);
	var MT___RUN_MANUAL = d;
	
	// Have a watcher
	window.addEventListener('message', function(e) {
		if(e.data && e.data.runPreview)
		{
			//ToDo: instead of a 200 millisecond wait, perform the click as soon as the DOM object loads.
			setTimeout(function() {MT___RUN_MANUAL.click();}, 200);
			parent.postMessage({MT_Ran: true}, '*');
			this.removeEventListener('click',arguments.callee,false)
		}
	}, false);
}
/**
 * load__allPages_AMT_combo()
 * 
 * This function runs when a job is accepted on mturk.com/mturkcontent.com/s3.amazonaws.com.
 * It is also run in PREVIEW if the button is clicked.
 */
function load__allPages_AMT_combo() {
	
	// 
	// Flicksio
	// Level I: Locate URL for TV or Movie
	//
	/**
	 * TODO:
	 * DONE:Skips-like file-object to ignore X. E.g. Daily Show, Colbert Report.
	 * Synonym-like file-object for series names.
	 * DONE:Auto select IMDB when coming from local.
	 * "return" button sends "showNextTab" to AllPages.js.
	 * Top show Div is large. Make btm small.
	 * "CAPTCHA" title, AMT Tools, This needs to go back to PREVIOUS, i.e. in this case "TQ".
	 * Always accept file (for manuals)
	 * 
	 * DB + itunes: Retrieve Episode#, and hence EpisodeTitle.
	 * If we are in specialWorkflowWindow
	 * and...? .skip() has been called?
	 * o.itunes_country = us/de/fr
	 * o.season1 = \d+
	 * https://itunes.apple.com/search?term=...
	 * 
	 * http://www.imdb.com/find?q=Love+and+War%2C+The+Real+Housewives+of+Orange+County&&s=tt&&ttype=ep&ref_=fn_ep
	 */
	//~ s = '<i>Note: if the title is a Movie you will find the IMDb url for <b>ONE</b> titles. If it is a TV Episode, you will enter in the IMDb url for <b>TWO</b> titles'
	s = '<b>Enter in the IMDb url of this title(s).</b><br>\n        	To begin, please view the following';
	if  (
		document.location.href.indexOf('flicksio.com/mturk') != -1 &&
		document.body.innerHTML.indexOf(s) != -1
		)
	{
		var run = function() {}; //require: 'x';// requirements
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea,hr {margin:0;padding:0;font-size:12px;}');			
			GM_addStyle('.container {margin:0;padding:0;width:20%;}'); //;width:100%
			document.getElementsByClassName('container')[0].style.width = "30%";
			document.getElementsByClassName('container')[0].style.margin = "0";
			document.getElementsByClassName('titles')[0].style.marginTop = "60px"; // Move titles down
			document.getElementsByClassName('header-bg')[0].style.position = 'absolute'; 
			document.getElementsByClassName('header-bg')[0].style.top = '4000px';
			document.getElementsByClassName('row header')[0].style.position = 'absolute'; 
			document.getElementsByClassName('row header')[0].style.top = '4000px';
			document.getElementsByClassName('instructions')[0].style.position = 'absolute'; 
			document.getElementsByClassName('instructions')[0].style.top = '3000px';
			GM_addStyle('.accept-overlay {position:70%;left:70%;width:29%;}');
			GM_addStyle('img {width:60px;}');
			GM_addStyle('.left {width:60px;}');
			GM_addStyle('.right {margin-left:0px;}');
			GM_addStyle('.exe:hover {background-color:LightGreen;cursor:pointer;}');
			GM_addStyle('.title {height:120px;overflow:hidden;}');
			GM_addStyle('.worker-info {top:1000px;position:absolute;}');
			GM_addStyle('.submit {padding:0;}');
			var n = document.getElementsByClassName('title');
			for (var p = 0; p <n.length; p++) {
				n[p].addEventListener('mouseover', function() {
					this.style.height = 'auto';
				}, false);
				n[p].addEventListener('mouseout', function() {
					this.style.height = '120px';
				}, false);
			}
			// inputs up
			var inp = document.getElementsByClassName('imdb_url');
			inp[0].setAttribute('style','position:absolute;top:0;left:0;width:20%;height:30px'); // Move inputs up
			if (inp.length > 1) {
				inp[1].setAttribute('style','position:absolute;top:30px;left:0;width:20%;height:30px'); // Move inputs up
			} else {
				inp[1] = null;
			}
			
			// e.g. "+Etablir le contact+Desperate Housewives, Saison 8"
			//
			//
			var reg = /https?:\/\/www.google.com\/search\?q=site:http:%2F%2Fimdb.com\/title\+([^\+]+)\+([^"]+)/g;
			var runtimeReg = /<b>Runtime:[\r\n\s\t]*<\/b>[\r\n\s\t]*([\d]+)/g;
			var yearReg = /<b>Release Year:[\r\n\s\t]*<\/b>[\r\n\s\t]*([\d]+)/g;
			
			//var reg = /https?:\/\/www.google.com\/search\?q=site:http:%2F%2Fimdb.com\/title\+\//;
			//~ console.log('inside flicksio');
			var ih = document.body.innerHTML;
			var rslt1 = reg.exec(ih);
			var rslt2 = reg.exec(ih);
			var s1 = rslt1[2].split(", Season"); //Season, Saison, Staffel
			var s2 = rslt2 ? rslt2[2].split(", Season") : null;
			
			//~ var ih = ih.split('<div class="title last">');
			
			//Check the top for runtime and release date, do the same for the bottom
			var runtime1 = runtimeReg.exec(ih);
			runtime1 = (runtime1) ? runtime1[1] : null;
			var releaseYear1 = yearReg.exec(ih);
			releaseYear1 = (releaseYear1) ? releaseYear1[1] : null;
			
			var runtime2 = runtimeReg.exec(ih);
			runtime2 = (runtime2) ? runtime2[1] : null;
			var releaseYear2 = yearReg.exec(ih);
			releaseYear2 = (releaseYear2) ? releaseYear2[1] : null;
			
			// synopsis
			// e.g. <div>\n<b>Synopsis: </b>
			var b = document.getElementsByTagName('b');
			var synp1=null,synp2=null;
			for (var i in b) {
				if (i == 'length') break;
				if (b[i].innerText.trim() == 'Synopsis:') {
					if (!synp1) {
						synp1 = b[i].parentNode.innerText.trim().replace(/^Synopsis: */, '');
						break;
					}
				}
			}
			
			//~ if(ih.length > 1) {
				//~ var runtime2 = runtimeReg.exec(ih[1]) ? runtimeReg.exec(ih[1])[1] : null;
				//~ var releaseYear2 = yearReg.exec(ih[1]) ? yearReg.exec(ih[1])[1] : null;
				//~ 
			//~ }else {
				//~ var runtime2 = null;
				//~ var releaseYear2 = null;
			//~ }
			
			var o = {
				title1  : __js_clean_html_str(rslt1[1]),
				title2  : rslt2 ? __js_clean_html_str(rslt2[1]) : null,
				series1 : __js_clean_html_str(s1[0]),
				series2 : (s2) ? __js_clean_html_str(s2[0]) : null,
				season1 : (s1 && s1.length > 1 ?  __js_clean_html_str(s1[1]) : null),
				season2 : (s2 && s2.length > 1 ?  __js_clean_html_str(s2[1]) : null),
				runtime1: runtime1,
				runtime2: runtime2,
				releaseYear1: releaseYear1,
				releaseYear2: releaseYear2,
				synopsis1: synp1,
				synopsis2: synp2,
				choices1 : null,
				choices2 : null,
				numRuns : 0,
				numShows: null,
				dbAuto1: false,
				dbAuto2: false,
				imdbAuto1: false,
				imdbAuto2: false,
				dbSelection1: null,
				dbSelection2: null,
				imdbFirstOption1: null,
				imdbFirstOption2: null,
				is_in_skip_condition: false, // One of two is in a skip condition.
				has_google_translate: false,
				original_title: null,
				series1_season1: __js_clean_html_str(rslt1[2]), // Series Title + Season #, e.g. "Scrubs, Season 4"
				itunes_country: 'us', // default=us, others=de,fr
				matches: {
					title1:null,
					title2:null,
					series1:null,
					series2:null,
				},
				bold_ep1: null,
				bold_ep2: null,
				lev_pct: [0, 0], // Levenstein distance for episode1+series1, episode2+series2
				count_db_runs: 1, // Num runs. Top show == 1. If >= 2 then initNextRun() exits.
				q: [
					inp[0]
				]
			}
			o.original_title = o.title1; // set o.original_title
			
			// Timeout to skip
			window.setTimeout(function() {
				if (AMT__Global_Vars.isPreview)
					AMT___Floater.skip();
			}, 90000);
			
			// ...
			// "Google Translated"
			// e.g. "A History Channel Thanksgiving (South Park Season 15)"
			var reg = /<b style="color: green;">Google Translated -- <\/b>[\r\n\t\s]+<b style="color: green;">Title:<\/b> <i>([^<]+)<\/i>/.exec(ih);
			if (reg) {
				o.has_google_translate = true; // set o.has_google_translate
				reg = __js_clean_html_str(reg[1]).trim();
				var reg2 = / \(([^\)]+)\)$/.exec(reg);
				if (reg2) {
					var tmpseries = reg2[1];
					// Title (replace series/season)
					o.title1 = reg.replace(
						new RegExp(__js_escape_regEx(reg2[0])+'$', ''),
						''
					);
					// Series & Season#
					var tmpse = /,? (season|saison|staffel) (\d+)$/i.exec(tmpseries);
					if (tmpse) {
						o.season1 = tmpse[2]; // Season #
						o.series1 = tmpseries.replace( // Series title (replace season#)
							new RegExp(__js_escape_regEx(tmpse[0])+'$', ''),
							''
						);
						// country?
						switch(tmpse[1]) {
							case 'Season':
								o.itunes_country = 'us';
								break;
							case 'Saison':
								o.itunes_country = 'fr';
								break;
							case 'Staffel':
								o.itunes_country = 'de';
								break;
						}
					} else {
						// Series (no season#)
						o.series1 = tmpseries;
					}
				}
			}
			
			// ...
			o.matches.title1 = clean_str_to_auto(o.title1);
			o.matches.series1 = clean_str_to_auto(o.series1);
			o.bold_ep1 = o.title1.clean_string_to_array().concat(o.series1.clean_string_to_array());
			o.bold_ep2 = o.title2 ? o.title2.clean_string_to_array().concat(o.series2.clean_string_to_array()) : null;
			if (inp.length > 1)
				o.q.push(inp[1]);
			
			// firstQuery & secondQuery
			var firstQuery = {
				title: o.title1,
				series: o.series1,
				season: o.season1,
				runtime: o.runtime1,
				releaseYear: o.releaseYear1,
				isTopShow:true,
				one_query: null,
				special_ww: null
			}
			var secondQuery;
			if(o.title2) {
				o.matches.title2 = clean_str_to_auto(o.title2);
				o.matches.series2 = clean_str_to_auto(o.series2);
				
				secondQuery = {
					title: o.title2,
					series: o.series2,
					season: o.season2,
					runtime: o.runtime2,
					releaseYear: o.releaseYear2,
					isTopShow: false,
					one_query: null,
					special_ww: null
				}
				o.numShows = 2;
			}
			else {
				o.numShows = 1;
			}
			console.log(o);
			
			/*Begin Elements*/
			var d_container = document.createElement('div');
			d_container.setAttribute('style',
				"position:absolute;left:30%;top:0px;width:70%;height:800px;background-color:#eee;border:1px solid blue;"
			);
			document.body.appendChild(d_container);
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				"width:99%;height:400px;background-color:#eee;border-bottom:4px solid black;overflow:auto;"
			);
			d_container.appendChild(d1);
			var d3 = document.createElement('textarea'); // skips
			d3.setAttribute('style',
				"width:50%;height:400px;"
			);
			d_container.appendChild(d3);
			var d3b = document.createElement('textarea'); // always accept
			d3b.setAttribute('style',
				"width:49%;height:400px;"
			);
			d_container.appendChild(d3b);
			var d2 = document.createElement('div');
			d2.setAttribute('style',
				"width:99%;height:1px;background-color:#eee;border-bottom:4px solid black;overflow:auto;"
			);
			d2.show_height = null; // d2.show_height
			d_container.appendChild(d2);
			/*End of Elements*/
			
			// onclick
			d3.onclick = d3b.onclick = function() {
				load_skips(); // Update the values.
			}
			d3.onblur = d3b.onblur = function() {
				write_skips(); // Write the values.
			}
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				callback_function: function(innerHeight) {
					d_container.style.height = innerHeight + 'px';
					d1.style.height = innerHeight-60 + 'px';
					d3.style.height = '48px';
					d3b.style.height = '48px';
					d2.show_height = innerHeight-120 + 'px';
					//~ var half = Math.floor(innerHeight / 2);
					//~ d_container.style.height = innerHeight + 'px';
					//~ d1.style.height = half + 'px';
					//~ d2.style.height = half + 'px';
				}
			});
			
			// Special workflow.
			// One = skips, autos only.
			// Two = skips, autos, manual: accepts on 2x has results>0, 2x Levenstein distance (ep. + series) <= 4
			AMT__Global_Vars.initializeIsSpecialWorkflowWindow(initialize);
			
			/**
			 * function write_skips
			 */
			function write_skips() {
				d3.style.border = '4px dashed blue';
				d3b.style.border = '4px dashed blue';
				var rf = new AMT___requests_factory();
				var write = d3.value + '-------------------------------' + d3b.value;
				// Write to file !
				rf.io__write_to_file(
					{
						data:	'AMT__serverSide_write__value='+encodeURIComponent(write)+
								'&AMT__serverSide_write__folder=.miscellaneous'+
								'&AMT__serverSide_write__file=flicksio_options',
						host:	MT___host
					},
					function(rs) {
						d3.style.border = '4px solid blue';
						d3b.style.border = '4px solid blue';
					}
				);
			}
			/**
			 * function load_skips
			 * Load options/skips file.
			 * If initial run then decide if skip. o.series1 VS. skips.
			 */
			function load_skips(is_init_run) {
				var is_init_run = is_init_run;
				if (!is_init_run) {
					d3.style.border = '4px dashed blue';
					d3b.style.border = '4px dashed blue';
				}
				url = MT___host + '/mturk/.miscellaneous/flicksio_options';
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (response) {
						var rs = response.responseText;
						
						rs = rs.split('-------------------------------'); // Top=Skips, Btm=Accepts
						var opt_skip = rs[0].trim(), opt_acpt;
						
						d3.value = opt_skip; // Set value d3
						if (rs.length > 1) {
							opt_acpt = rs[1].trim();
							d3b.value = opt_acpt; // Set value d3b
							opt_acpt = opt_acpt.split('\n'); // Split by \n
						}
						
						// ...
						if (is_init_run) {
							opt_skip = opt_skip.split('\n'); // Split by \n
							// Skip if...
							if (AMT__Global_Vars.isPreview && __js_inarray(opt_skip, o.series1)) { // array, needle
								d1.innerText = 'Skips file: ' + o.series1;
								AMT___Floater.skip(); // SKIP
								return; // STOP
							}
							// Accept if...
							else if (
								AMT__Global_Vars.isPreview &&
								opt_acpt &&
								__js_inarray(opt_acpt, o.series1) && //array, needle
								AMT__Global_Vars.isSpecialWorkflowWindow // Special=Manual tasks
								)
							{
								d1.innerText = 'Accept file: ' + o.series1;
								AMT___Floater.accept(); // ACCEPT
								return;
							}
							// Still here?
							translate(); // GOTO TRANSLATE
							
							return; // STOP
						}
						
						// Is not init run?
						if (!is_init_run) {
							d3.style.border = '4px solid blue';
							d3b.style.border = '4px solid blue';
						}
					}
				});
			}
			/**
			 * function initialize
			 * 
			 * @param is_special, boolean, is_special?
			 */
			function initialize(is_special) {//alert(is_special);
				AMT__Global_Vars.isSpecialWorkflowWindow = is_special;
				// Auto
				if(!AMT__Global_Vars.isSpecialWorkflowWindow) {
					firstQuery.one_query = true;
					firstQuery.special_ww = true;
					if (secondQuery) {
						secondQuery.one_query = true;
						secondQuery.special_ww = true;
					}
					//~ // GOTO TRANSLATE
					//~ translate();
				}
				// Manual+Auto
				if(AMT__Global_Vars.isSpecialWorkflowWindow) {
					firstQuery.one_query = true;
					firstQuery.special_ww = false;
					if (secondQuery) {
						secondQuery.one_query = true;
						secondQuery.special_ww = false;
					}
					//~ // GOTO LOAD SKIPS
					//~ load_skips();
					//~ firstQuery.one_query = false; // !ONE_QUERY == 4 QUERIES PER !!!!
					//~ firstQuery.special_ww = false;
					//~ secondQuery.one_query = false;
					//~ secondQuery.special_ww = false;
				}
				// GOTO LOAD SKIPS
				load_skips(true);
			}
			
			/**
			 * function translate
			 * Check for language of title.
			 * On google.com translate.
			 */
			function translate() {
				if (!o.has_google_translate || o.title1 == o.original_title) { // End here if not has_google_translate
					initFirstRun();
					return;
				}
				
				var url = 'http://translate.google.com/translate_a/t?client=t&text='+encodeURIComponent(o.title1)+'&hl=en&sl=&tl=en'
				url = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(url); // cache
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status != 200 || (rs*1 >= 300 && rs*1 <= 600)) {
							alert('rs');
							exit(response.status);
						}
						
						rs = rs.replace(/,+/g, ','); // replace ,+
						rs = JSON.parse(rs);
						console.log(rs);
						//[[["I like linux It makes freedom","Ich mag linux Es macht freiheit","",""]] ...
						if (rs.length && rs[0].length && rs[0][0].length) {
							var str_translated = rs[0][0][0];
							var str = rs[0][0][1];
							console.log(str);
							console.log(str_translated);
							//return;
							
							o.title1 = str_translated;
						}
						
						//initFirstRun
						initFirstRun();
					}
				});
			}
			/**
			 * function 
			 */
			function itunes_search_test_rslt(results) {
			}
			/**
			 * function itunes_search_init
			 * Init itunes
			 * Synopsis must not be blank
			 */
			function itunes_search_init() {
				// Open d2
				d2.style.height = d2.show_height;
				// Synopsis?
				if (!o.synopsis1) {
					d2.innerText = 'SYNOPSIS=""';
					AMT___Floater.skip();
					return;
				}
				//~ AMT___Floater.skip(); // TODO
				//~ return;
				// e.g. "Prison%20Break,%20Staffel%204"
				var url = 'https://itunes.apple.com/search?term='+encodeURIComponent(o.series1_season1)+'&media=tvShow&attribute=tvSeasonTerm&entity=tvEpisode&country='+o.itunes_country+'&limit=200';
				url = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(url); // cache
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (response) {
						var rs = response.responseText.trim();
						
						if (response.status != 200 || (rs*1 >= 300 && rs*1 <= 600)) {
							alert('rs');
							exit(response.status);
						}
						
						//~ rs = rs.replace(/,+/g, ','); // replace ,+
						rs = JSON.parse(rs);
						console.log(rs);
						
						//{"resultCount":24,"results": [{"wrapperType":"track" ...
						
						// Loop through results looking for an exact match of the episode's description.
						// There must be only 1 exact match of the episode description. If found
						// then search DB for SeriesTitle(itunes)/Season#/Episode#(itunes)
						// .shortDescription, .artistName
						
						//var rslt = itunes_search_test_rslt(rs);
						var short_syn = o.synopsis1.substr(0, 30);
						var found_num = 0;
						var rslt;
						for (var i in rs.results) {
							if (rs.results[i].shortDescription.indexOf(short_syn) == 0) {
								rslt = rs.results[i];
								found_num++;
							}
						}
						if (found_num != 1) {
							d2.innerText = '0-matched-itunes';
							AMT___Floater.skip(); // TODO
							return;
						}
						
						// Try DB
						new AMT___requests_factory().database__select(
							{
								query: "AMT_Flicksio_IMDB_GetDetails",
								encodeStrings: {
									qStrs: {
										//~ title: o.title1,
										series: rslt.artistName,
										season: o.season1,
										seriesNr: rslt.trackNumber,
										itunes_search: true
									}
								},
								timeout: 80000
							},
							process_itunes_DB
						);
					}
				});
			}
			/**
			 * function process_itunes_DB
			 */
			function process_itunes_DB(response) {
				var ro = response.responseObject;
				// Make selectors
				// out=d2
				// d2.show_height
				if (!ro.length) {
					d2.innerText = '0-db-itunes';
					AMT___Floater.skip(); // TODO
					return;
				}
			}
			/**
			 * function initFirstRun
			 */
			function initFirstRun() {
				// Run
				// Code to pull from database
				new AMT___requests_factory().database__select(
					{
						query: "AMT_Flicksio_IMDB_GetDetails",
						encodeStrings: {
							qStrs: firstQuery
						},
						timeout: 80000
					},
					processDBResults
				); 
			}
			/**
			 * function clean_str_to_auto
			 */
			function clean_str_to_auto(str) {
				return str.toLowerCase().replace(/&/g, 'and').replace(/[^0-9a-z]/gi, '');
			}
			/**
			 * function processDBResults
			 */
			function processDBResults(response) {
				//response of 3 searches
				console.log('got db response');
				console.log(response);
				var ro = response.responseObject;
				
				// Non special workflow window.
				if (!AMT__Global_Vars.isSpecialWorkflowWindow) {
					buildDBRsltsInterface(ro.search_t_s, 'search_t_s', response.encodeStrings.qStrs.isTopShow);
				}
				// Special workflow window.
				if (AMT__Global_Vars.isSpecialWorkflowWindow) {
					//THIS IS GOING SLOW// FFIIXX //buildDBRsltsInterface(ro.search_t, 'search_t', response.encodeStrings.qStrs.isTopShow);
					buildDBRsltsInterface(ro.search_t_s, 'search_t_s', response.encodeStrings.qStrs.isTopShow);
				}
				//buildDBRsltsInterface(ro.search_t, 'search_t', response.encodeStrings.qStrs.isTopShow);
				//buildDBRsltsInterface(ro.search_t_s, 'search_t_s', response.encodeStrings.qStrs.isTopShow);
				//~ buildDBRsltsInterface(ro.search_s, 'search_s', response.encodeStrings.qStrs.isTopShow);
				//~ buildDBRsltsInterface(ro.search_title_no_opts, 'search_title_no_opts', response.encodeStrings.qStrs.isTopShow);
				
				//~ response = JSON.parse(response)
				//~ if(response.checkClosestSeries) {
					//~ checkClosestSeries(response.seriesChoices, response.isTopShow);
				//~ }
				//~ else { //This is an IMDB check				
					//~ //Process the results, and then call checkIMDB
					//~ var keywords;
					//~ var title;
					//~ var title_type;
					//~ var isTopShow;
				//~ 
					//~ 
					//~ checkIMDB(keywords, title, title_type,isTopShow);
				//~ }
			}
			
			
			function initNextRun() {
				// numShows == 2
				// Is not in skip condition
				// isTopShow == true
				//~ console.log(o.numShows);
				//~ console.log(o.is_in_skip_condition);
				//~ console.log(ro.original_query_object.isTopShow);
				//~ if(o.numShows == 2 && !o.is_in_skip_condition && ro.original_query_object.isTopShow)
				
				// Do not run more than once here.
				if (o.count_db_runs >= 2) return;
				o.count_db_runs++;
				
				if (o.q.length == 1) return; // Only one show if one INPUT element.
				
				// Two shows
				console.log('Run:Running show#2');
				new AMT___requests_factory().database__select(
					{
						query: "AMT_Flicksio_IMDB_GetDetails",
						encodeStrings: {
							qStrs: secondQuery
						},
						timeout: 80000
					},
					processDBResults
				);
			}
			
			/**
			 * function checkIMDB
			 */
			function checkIMDB(keywords, title, title_type, parent_title, isTopShow) {
				var obj = {
					title: title,
					parent_title: parent_title,
					isTopShow: isTopShow
				}
				var isTopShow = isTopShow;
				console.log('ran inside checkIMDB, isTopShow: ' + isTopShow);
				
				var url = 'http://www.imdb.com/search/title?' +
							(keywords ?	'keywords=' + encodeURIComponent(keywords) + "&" : '') +
							(title_type ? 'title_type=' +encodeURIComponent(title_type) + "&" : '') +
							'title='+encodeURIComponent(title)
				url = MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(url); // cache
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (response) {
						var rs = response.responseText;
						
						if (response.status != 200) {
							exit(response.status);
						}
						allDetails = rs.split('<td class="number">');
						allDetails.splice(0,1);
						console.log(allDetails);
						//splits it into secions with 1 being the first
						
						//reg1 - imdbId of series, series name, year_type of series
						//Should ALWAYS be there
						var reg1 = /<a href="\/title\/([^\/]+)\/">([^<]*)<\/a>[\r\n\s\t]*<span class="year_type">([^<]+)<\/span><br>/;
						
						//reg 2 - imdbId of title, title name, year of title
						//Should be here only if it's an episode
						// Year is "YYYY" or "????" (question marks)
						var reg2 = /<span class="episode">Episode: <a href="\/title\/([^\/]+)\/">([^<]+)<\/a>[\r\n\s\t]*\(([\d\?]+)\)[\r\n\s\t]*<\/span>/;
						
						//reg 3 - duration
						//Sometimes is there, sometimes is left unspecified
						var reg3 = /<span class="runtime">([\d+]) mins\.<\/span>/;
						
						//reg 4 - credits
						var reg4 = /<span class="credit">((.|\s)*?(?=<\/span>|$)|$)/;
						
						var choices = [];
						console.log('Finished scraping imbd: isTopShow: '+ isTopShow);
						console.log(allDetails);
						for(var i = 0; i <allDetails.length; i++) {
							choices.push({
								seriesIMDBId: null,
								seriesName:null,
								year_type:null,
								title_type:null,
								imdbId:null,
								title:null,
								year:null,
								is_auto:null // This is for autos
							});
							var scr1 = reg1.exec(allDetails[i]);
							choices[i].seriesIMDBId = scr1[1];
							choices[i].seriesName = scr1[2];
							choices[i].year_type = scr1[3].trim();
							choices[i].title_type = /([^\d]+)\)[\r\n\s\t]*$/.exec(choices[i].year_type)
							if(choices[i].title_type) {
								choices[i].title_type = choices[i].title_type[1].trim();
							}
							var scr2 = reg2.exec(allDetails[i]);
							if(scr2) {
								choices[i].imdbId = scr2[1];
								choices[i].title = scr2[2];
								choices[i].year = (/^\d+$/.exec(scr2[3])) ? scr2[3] : null;
							}
							
							var scr3 = reg3.exec(allDetails[i]);
							if(scr3) {
								choices[i].duration = scr3[i];
							}
							
							//Clean everything
							for(var itm in choices[i]) {
								if(typeof choices[i][itm] == "string") 
									choices[i][itm] = __js_clean_html_str(choices[i][itm].replace(/<[^>]*>/g, ''));
							
							}

							var scr4 = reg4.exec(allDetails[i]);
							console.log(scr4);
							choices[i].cast = {}; // cast obj
							if(scr4) {
								var nameReg = /<a[^>]+>([^<]+)</g;
								var m;
								while(m = nameReg.exec(scr4[1])) {
									var cm = __js_clean_html_str(m[1]).trim();
									choices[i].cast[cm.toLowerCase()] = cm;
								}
							}
							
							// Is this an auto, based on the manual choice selected?
							if (choices[i].title == obj.title && choices[i].seriesName == parent_title) {
								choices[i].is_auto = true;
							}
						}
						
						// ...
						if(isTopShow) 
							o.choices1 = choices;
						else
							o.choices2 = choices;
						// Build final
						buildFinalInterface(isTopShow);
						// Increment o.numRuns
						o.numRuns++;
					}
				});
			}
			
				
			function buildDBRsltsInterface(rslts,rsltsType,isTopShow) {
				var container = isTopShow ? d1 : d2;
				var locn = 
				{
					search_t : 1,
					search_t_s:0,
					search_s:2,
					search_title_no_opts: 3
				}
				locn = locn[ rsltsType ];
				
				var div = document.createElement('div'); // 24=4, 49=2
				div.setAttribute('style', 'width:49%;height:100%;float:left;border-left:1px solid black;');	//
				container.appendChild(div);
				
				// Not special workflow. Either top or bottom show, results.length == 0. Skip.
				if(
						(!rslts || rslts.length == 0) &&
					!AMT__Global_Vars.isSpecialWorkflowWindow
					)
				{
					div.innerHTML = '0-db';
					AMT___Floater.skip();
				}
				// If one show and isSpecialWorkflowWindow==true
				else if ((!rslts || rslts.length == 0) && o.q.length == 1 && AMT__Global_Vars.isSpecialWorkflowWindow) {
					div.innerHTML = '0-db';
					// Init itunes
					itunes_search_init();
					//~ AMT___Floater.skip();
				}
				// Else ...
				else {		
					var foundAuto = false;
					var highestPct = 0;
					var highestScore = 0;
					var min_lev_length = 10; // min. to consider
					var min_lev_accept = 60; // pct to accept
					var min_score_accept = 12; // pct to accept
					var bold = (isTopShow) ? o.bold_ep1 : o.bold_ep2;
					for(var i = 0; i < rslts.length; i++) {
						var el_div = document.createElement('div');
						el_div.setAttribute('style',
							'border-bottom:1px solid black;padding: 1px 2px 1px 2px' //top,right,btm,left
						); 
						div.appendChild(el_div);
						el_div.className = 'exe';
						el_div.title = rslts[i].title;
						el_div.parent_title = rslts[i].parent_title;
						el_div.season_nr = rslts[i].season_nr;
						el_div.kind = rslts[i].kind;
						el_div.isTopShow = isTopShow;
						el_div.cast = rslts[i].cast;
						el_div.keywords = rslts[i].keywords;
						el_div.onclick = function() {
							this.style.backgroundColor = 'lightgreen';
							if(this.isTopShow)
								o.cast1 = this.cast;
							else
								o.cast2 = this.cast;
							checkIMDB(this.keywords, this.title, this.kind, this.parent_title, this.isTopShow);
						}
						
						// If this is special workflow.
						// Is Levenstein distance less than X?
						// If so then mark show (top OR bottom) as "found."
						// Add background-color.
						// 
						// QUESTION: Cache any, or up to X, if Lev. is >= 96? 98? 99?
						var strtmp1 = rslts[i].title + rslts[i].parent_title;
						var strtmp2 = (isTopShow) ? o.title1 + o.series1 : o.title2 + o.series2;
						var dist = new AMT___gen_functions().levensht(strtmp1, strtmp2);
						var longest = (strtmp1 > strtmp2) ? strtmp1.length : strtmp2.length;
						var pct = ((longest - dist) / longest) * 100; // 0-100
						highestPct = (pct > highestPct && longest >= min_lev_length) ? pct : highestPct;// set highest
						el_div.style.backgroundColor = pct >= min_lev_accept ? 'aqua' : '';
						// Highest score
						if (rslts[i].score >= min_score_accept && rslts[i].score > highestScore) {
							highestScore = rslts[i].score;
						}
						// Show
						el_div.innerHTML = 
							(rslts[i].title ? 't: ' + MT__bold(rslts[i].title, bold) + '<br>' : 't: <br>') +
							(rslts[i].parent_title ? 's: ' + MT__bold(rslts[i].parent_title, bold) + '<br>' : 's: <br>') +
							(rslts[i].season_nr ? 'sn: Season ' + rslts[i].season_nr + '<br>' : 'sn: ') +
							'k: ' + rslts[i].kind + '<br>' +
							'y: ' + rslts[i].year + '<br>' +
							'score: ' + Math.round(rslts[i].score*1) + '<br>' +
							'lev.: ' + Math.round(pct) + '%<br>'
						
						//Attempt to auto into a checkIMDB here:
						if(rsltsType == 'search_t_s') {
							if(
							   rslts &&
							   rslts.length &&
							   rslts[i].title &&
							   clean_str_to_auto(rslts[i].title).length > 2 &&
							   clean_str_to_auto(rslts[i].title) == (isTopShow ? o.matches.title1 : o.matches.title2) &&
							   rslts[i].parent_title &&
							   clean_str_to_auto(rslts[i].parent_title).length > 2 &&
							   clean_str_to_auto(rslts[i].parent_title) == (isTopShow ? o.matches.series1 : o.matches.series2)
							   )
							{
								if(isTopShow) {
									o.dbAuto1 = true;
									o.dbSelection1 = rslts;
									o.cast1 =  rslts[i].cast;
									console.log('---------imdbAuto1');
								}
								else {
									o.dbSelection2 = rslts;
									o.dbAuto2 = true;
									o.cast2 =  rslts[i].cast;
									console.log('---------imdbAuto2');
								}						
								//checkIMDB(rslts[i].keywords, rslts[0].title, rslts[0].title_type, isTopShow);
								el_div.click();
								foundAuto = true;
								break;
							}
						}
					}
					// Single query, special_ww==false, rsltsType==search_t_s
					if(!foundAuto && rsltsType == 'search_t_s' && !AMT__Global_Vars.isSpecialWorkflowWindow)
					{
						o.is_in_skip_condition = true;
						AMT___Floater.skip();
						console.log('Skip condition #1. Skips here.');
					}
					// Mutli-query, special_ww==true.
					// Search1=search_t, Search2=search_t_s
					else if (!foundAuto && AMT__Global_Vars.isSpecialWorkflowWindow)
					{
						if (isTopShow) {
							o.lev_pct[0] = highestPct > o.lev_pct[0] ? highestPct : o.lev_pct[0];
							// ONE SHOW
							if (o.q.length == 1) {
								if (AMT__Global_Vars.isPreview) {
									if  (
										o.lev_pct[0] >= min_lev_accept ||
										highestScore > min_score_accept
										)
									{
										AMT___Floater.accept();
									}
									else {
										d1.innerHTML =
											'MaxScore='+Math.round(highestScore)+'<br>'+
											'Max%='+Math.round(o.lev_pct[0])+'%';
										// Init itunes
										itunes_search_init();
										//AMT___Floater.skip();
									}
								}
								// Not in preview
								else {
									addToTabsQ(); // Add to tabs queue
								}
							}
							// TWO SHOWS
							else {
								if (o.lev_pct[0] >= min_lev_accept && rsltsType == 'search_t_s')
									initNextRun(); // Go to next run!
								else if (rsltsType == 'search_t_s' && AMT__Global_Vars.isPreview) { // Second search. Skip.
									AMT___Floater.skip();
								}
							}
						}
						if (!isTopShow) {
							o.lev_pct[1] = highestPct > o.lev_pct[1] ? highestPct : o.lev_pct[1];
							
							// ACCEPT?
							if  (
								o.lev_pct[0] >= min_lev_accept &&
								o.lev_pct[1] >= min_lev_accept &&
								AMT__Global_Vars.isPreview &&
								rsltsType == 'search_t_s' // Second search
								)
							{
								console.log('Found >= '+min_lev_accept+':'+o.lev_pct[0]+'/'+o.lev_pct[1]);
								AMT___Floater.accept();
							}
							// SKIP
							else if (rsltsType == 'search_t_s' && AMT__Global_Vars.isPreview) {
								AMT___Floater.skip();
							}
						}
					}
				}
			}
			
			/**
			 * function buildFinalInterface
			 * 
			 * choices.is_auto
			 */
			function buildFinalInterface(isTopShow) {
				console.log('building interface, topShow is:' + isTopShow);
				var choices = isTopShow ? o.choices1 : o.choices2;
				var div = isTopShow ? d1 : d2;
				div.style.overflow = 'auto';
				if(choices.length == 0) {
					console.log(o);
					console.log('no choices found')
					div.style.border = '2px solid blue';
					AMT___Floater.skip();
					return;
				}
				// How many autos are there? (choices.is_auto) (From a MANUAL selection.)
				// There MUST be only ONE in order to auto.
				var num_autos = 0;
				for (var i in choices) {
					if (choices[i].is_auto) {
						num_autos++;
					}
				}
				
				// Still here?
				div.innerHTML = ''; //Clear everything	
				var topAuto = false;
				var bottomAuto = false;
				var foundAuto = false;
				var bold = (isTopShow) ? o.bold_ep1 : o.bold_ep2;
				// Loop goes here.
				for(var i in choices) {
				//~ for(var i = 0; i < 10; i++) {
					if(!choices[i]) break;
					var castMatches = [];
					var chk_cast = (isTopShow ? o.cast1 : o.cast2);
					for(var j = 0; j < chk_cast.length; j++) {
						var ch = choices[i].cast;
						if (ch.hasOwnProperty( chk_cast[j].toLowerCase().trim() )) {
							castMatches.push(chk_cast[j]);
						}
					}
					// el_div
					var el_div = document.createElement('div');
					el_div.setAttribute('style', 'border-bottom:1px solid black;');
					el_div.className = 'exe';
					div.appendChild(el_div);
					// .innerHTML
					el_div.innerHTML = 
						(choices[i].title ? 't: ' + MT__bold(choices[i].title, bold) + '<br>' : 't: <br>' ) +
						(choices[i].seriesName ? 's: ' + MT__bold(choices[i].seriesName, bold) + '<br>' : 's: <br>') +
						//(choices[i].season_nr ? 'sn: Season ' + choices[i].season_nr + '<br>' : 'sn: ') +
						'k: ' + (choices[i].title_type ? choices[i].title_type : '') + '<br>' +
						'y: ' + (choices[i].year ? choices[i].year : '') + '<br>' +
						'cm: ' + castMatches.join(',');
					// ...
					el_div.title = choices[i].title;
					el_div.seriesName = choices[i].seriesName;
					el_div.title_type = choices[i].title_type;
					el_div.year = choices[i].year;
					el_div.castMatches = castMatches;
					el_div.imdbId = choices[i].imdbId;
					el_div.seriesIMDBId = choices[i].seriesIMDBId;
					el_div.isTopShow = isTopShow;
					el_div.parent_div = div;
					// .onclick
					el_div.onclick = function() { // onclick
						this.style.backgroundColor = 'LightGreen';
						var id;
						if(this.imdbId) {
							id = this.imdbId;
						}
						else {
							id = this.seriesIMDBId;
							alert('Series IMDB ID!'); //?
							return;
						}
						if(id) {
							var url = 'http://www.imdb.com/title/' + id;
							if(this.isTopShow) {
								o.q[0].value = url;
							}
							else {
								o.q[1].value = url;
							}
							// Make div small
							//~ this.parent_div.style.height = 'auto';
							this.parentNode.style.height = '140px';
							this.scrollIntoView(false);
							//
							o.q[0].value = o.q[0].value.trim();
							if (o.q.length > 1)
								o.q[1].value = o.q[1].value.trim();
							if  (
								/^http:\/\/www\.imdb\.com\/title\/tt[^\/]+$/.exec(o.q[0].value) &&
									(
									o.q.length == 1 ||
									/^http:\/\/www\.imdb\.com\/title\/tt[^\/]+$/.exec(o.q[1].value)
									)
								)
							{
								// Is preview?
								if (AMT__Global_Vars.isPreview) {
									AMT___Floater.accept();
									return;
								}
								// Is accepted?
								// Fire event to simulate change of text box.
								// This produces a "post" request to their server.
								var evt = document.createEvent('HTMLEvents');
								evt.initEvent('change', false, true);
								o.q[0].dispatchEvent(evt);
								if (o.q.length > 1)
									o.q[1].dispatchEvent(evt);
								// ...
								document.body.style.backgroundColor = 'aqua';
								//~ new AMT___core_factory().nextTab(); // nextTab
								// show next
								showNextTab();
								var rand = 3600 + (Math.random() * 2000);
								setTimeout(function() { doSubmit('mturk'); }, rand); // 3.6 + 0~2.0
								return false;
							}
						} else {
							alert('error undefined imdbId and seriesIMDBId');
						}
					}
					
					// Check for "auto" when localDB button is manually clicked.
					if (num_autos == 1 && choices[i].is_auto) {
						el_div.click();
					}
					
					// Put check here for to auto yes? You wan oil chane?
					if (isTopShow) { // Top
						if(
							choices[i] &&
							choices[i].title &&
							clean_str_to_auto(choices[i].title).length > 2 &&
							clean_str_to_auto(choices[i].title) == o.matches.title1 &&
							choices[i].seriesName &&
							clean_str_to_auto(choices[i].seriesName).length > 2 &&
							o.series1 &&
							clean_str_to_auto(choices[i].seriesName) == o.matches.series1
						)
						{
							if(
								choices[i].year && 
								o.releaseYear1
							)	
							{
								//Make sure they're both numbers by trimming them
								choices[i].year = choices[i].year.trim();
								o.releaseYear1 = o.releaseYear1.trim();
								console.log('attempting year match');
								if(Math.abs(choices[i].year*1 - o.releaseYear1*1) <= 2) {
									console.log('year matched for top');
									topAuto = true;
								}
							}
							else {
								topAuto = true;
							}
						}
						if(topAuto) {
							o.imdbAuto1 = true;
							el_div.click();
							foundAuto = true;
							break;
						}
					}
					else // Bottom (!isTopShow)
					{
						if(
							choices[i] &&
							choices[i].title &&
							clean_str_to_auto(choices[i].title).length > 2 &&
							clean_str_to_auto(choices[i].title) == o.matches.title2 &&
							choices[i].seriesName &&
							clean_str_to_auto(choices[i].seriesName).length > 2 &&
							o.series2 &&
							clean_str_to_auto(choices[i].seriesName) == o.matches.series2
						)
						{
							if(
								choices[i].year && o.releaseYear2
							)
							{
								//Make sure they're both numbers by trimming them
								choices[i].year = choices[i].year.trim();
								o.releaseYear2 = o.releaseYear2.trim();
								if(Math.abs((choices[i].year *1) - (o.releaseYear2*1)) <= 2) {
									console.log('year matched for top');
									bottomAuto = true;
								}
							}
							else {
								bottomAuto = true;
							}
						}
						if(bottomAuto) {
							o.imdbAuto2 = true;
							el_div.click();
							foundAuto = true;
							break;
						}
					}
				}
				// END OF FOR LOOP
				
				// Not special workflow 
				if(!foundAuto && !AMT__Global_Vars.isSpecialWorkflowWindow) {
					AMT___Floater.skip();
				}
				// If auto and isTopShow
				if(foundAuto && isTopShow) {
					initNextRun();
				}
				// Not auto but special workflow
				else if (!foundAuto && AMT__Global_Vars.isSpecialWorkflowWindow) {
					initNextRun();
				}
			}
				
			//~ function attemptAuto(isTopShow) {
				//~ console.log('attempting auto, isTopShow: ' + isTopShow);
				//~ console.log(o)
				//~ var topAuto = false;
				//~ var bottomAuto = false;
				//~ if (isTopShow) { // Top
					//~ if(
					//~ o.imdbFirstOption1 &&
					//~ o.imdbFirstOption1.title &&
					//~ o.imdbFirstOption1.title.length > 2 &&
					//~ o.imdbFirstOption1.title.toLowerCase().trim() == o.title1.toLowerCase().trim() &&
					//~ o.imdbFirstOption1.seriesName &&
					//~ o.imdbFirstOption1.seriesName.length > 2 &&
					//~ o.series1 &&
					//~ o.imdbFirstOption1.seriesName.toLowerCase().trim() == o.series1.toLowerCase().trim()
					//~ )
					//~ {
						//~ if(
							//~ o.imdbFirstOption1.year && 
							//~ o.releaseYear1
						//~ )	
						//~ {
							//~ //Make sure they're both numbers by trimming them
							//~ o.imdbFirstOption1.year = o.imdbFirstOption1.year.trim();
							//~ o.releaseYear1 = o.releaseYear1.trim();
							//~ console.log('attempting year match');
							//~ if(Math.abs(o.imdbFirstOption1.year*1 - o.releaseYear1*1) <= 2) {
								//~ console.log('year matched for top');
								//~ topAuto = true;
							//~ }
						//~ }
						//~ else {
							//~ topAuto = true;
						//~ }
					//~ }
					//~ if(topAuto) {
						//~ o.imdbAuto1 = true;
						//~ o.imdbFirstOption1.click();
						//~ initNextRun();
					//~ }
					//~ else // Skips here!
					//~ {
						//~ AMT___Floater.skip();
					//~ }
				//~ }
				//~ else // Bottom (!isTopShow)
				//~ {
					//~ if(
					//~ o.imdbFirstOption2 &&
					//~ o.imdbFirstOption2.title &&
					//~ o.imdbFirstOption2.title.length > 2 &&
					//~ o.imdbFirstOption2.title.toLowerCase().trim() == o.title2.toLowerCase().trim() &&
					//~ o.imdbFirstOption2.seriesName &&
					//~ o.imdbFirstOption2.seriesName.length > 2 &&
					//~ o.series2 &&
					//~ o.imdbFirstOption2.seriesName.toLowerCase().trim() == o.series2.toLowerCase().trim()
					//~ )
					//~ {
						//~ if(
							//~ o.imdbFirstOption2.year && o.releaseYear2
						//~ )	{
							//~ //Make sure they're both numbers by trimming them
							//~ o.imdbFirstOption2.year = o.imdbFirstOption2.year.trim();
							//~ o.releaseYear2 = o.releaseYear2.trim();
							//~ if(Math.abs((o.imdbFirstOption2.year *1) - (o.realeaseYear2*1)) <= 2) {
								//~ console.log('year matched for top');
								//~ bottomAuto = true;
							//~ }
						//~ }
						//~ else {
							//~ bottomAuto = true;
						//~ }
					//~ }
					//~ if(bottomAuto) {
						//~ o.imdbAuto2 = true;
						//~ o.imdbFirstOption2.click();
					//~ }
					//~ else // Skips here!
					//~ {
						//~ AMT___Floater.skip();
					//~ }
				//~ }
			//~ }				
		}
		new run().f();
	}
	
	// 
	// ?? Dennis Meng?
	// 
	//
	s = '	<li>Then&nbsp;please confirm that you called the hotel and did not use any other means to gather this information.</li>';
	if  (
		ih.indexOf(s) != -1
		)
	{
		var run = function() {};
		run.prototype.f = function() {
			console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea,select {margin:0;padding:0;font-size:12px !important;}');
			GM_addStyle('.container {margin:0 0 0 60px !important;padding:0 !important;}');
			GM_addStyle('.panel-primary {position:absolute;top:1600px;}');
			GM_addStyle('input[type="radio"] {zoom:2;cursor:pointer;}');
			
			var td = document.getElementsByTagName('td');
			
			var o = {
				phone: td[3].innerText.trim(),
				td_phone: td[2],
				q: [
					document.getElementsByName('SpaYesNo')[0],
					document.getElementsByName('SpaYesNo')[1],
					document.getElementById('SpaPhoneNumber'),
					document.getElementsByName('ValetParkingYesNo')[0],
					document.getElementsByName('ValetParkingYesNo')[1],
					document.getElementsByName('CalledYes')[0]
				]
			}
			
			// Defaults
			document.getElementsByName('SpaYesNo')[1].checked = true;
			document.getElementsByName('ValetParkingYesNo')[0].checked = true;
			document.getElementsByName('CalledYes')[0].checked = true;
			
			//
			o.q[2].onclick = function() { this.focus(); this.select(); }
			o.q[2].value = 'NA';
			
			//
			document.getElementById('submitButton').onclick = function() {
				if (!o.q[0].checked && !o.q[1].checked) return false; // either
				if (!o.q[3].checked && !o.q[4].checked) return false; // either
				if (!o.q[5].checked) return false; // req.
				o.q[2].value = o.q[2].value.trim();
				if (o.q[2].value == 'NA' || /^\d{3}-\d{3}-\d{4}( ext\. [^$]+|)$/.exec(o.q[2].value)) { // phone OR phone+ "ext X"
					// go
				} else {
					return false;
				}
				// If phone, q[0] must be checked.
				if (o.q[2].value != 'NA' && !o.q[0].checked) {
					o.q[0].parentNode.style.backgroundColor = 'green';
					return false;
				}
				
				//
				new AMT___core_factory().nextTab();
				
				// ...
				return true;
			}
			
			// Phone
			o.td_phone.innerHTML = '';
			var a = document.createElement('a');
			a.innerText = o.phone;
			a.setAttribute('style', 'cursor:pointer;');
			a.onclick = function(e) {
				console.log('Clicked phone link. Sending request phone:' + this.innerText);
				
				// Load this phone number into the phone number window.
				// Send a message to the background script.
				// 
				chrome.extension.sendRequest({
					method:'google_hangouts_load_phone',
					phone_number:this.innerText,
					details: {hangupAllButPickup:true, dial0AtStart:true},
					task_name: "Andrew Ryan"
				});
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			o.td_phone.appendChild(a);
		}
		new run().f();
		return;
	}
	//
	// Andrew Ryan
	//
	//
	s = 'The goal of this task is to collect the name, email address, and phone number for the <strong>';
	if(ih.indexOf(s) != -1)
	{
		var td = document.getElementsByTagName('td');
		var o = {
			// phone td
			td_phone: td[7],
			phone: td[7].innerText.trim()
		}
		// Phone
		o.td_phone.innerHTML = '';
		var a = document.createElement('a');
		a.innerText = o.phone;
		a.setAttribute('style', 'cursor:pointer;');
		//~ a.href = 'https://hangoutsapi.talkgadget.google.com/hangouts/_?gid=135569030656&gd={"number":"6072385144"}';
		//~ a.target = '_blank';
		a.onclick = function(e) {
			
			console.log('Clicked phone link. Sending request phone:' + this.innerText);
			
			// Load this phone number into the phone number window.
			// Send a message to the background script.
			// 
			chrome.extension.sendRequest({
				method:'google_hangouts_load_phone',
				phone_number:this.innerText,
				details: {hangupAllButPickup:true, dial0AtStart:true},
				task_name: "Andrew Ryan"
			});
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
		o.td_phone.appendChild(a);
		
	}
	
	//Dotmenu Web
	s = 'For this task, you will call on the telephone a restaurant listed below. We are looking to verify the restaurants name';
	if(ih.indexOf(s) != -1) {
		var b_phone = document.getElementsByTagName('b')[1];
		var phoneNum = document.getElementsByTagName('b')[1].innerHTML;
		phoneNum = phoneNum.replace(/^[^\:]*\:([^$]*)$/,'$1').trim();
		console.log('Dotmenu Web All-Pages');
		console.log(phoneNum);
		
		var o = {
			// phone td
			b_phone: b_phone,
			phone: phoneNum
		}
		// Phone
		o.b_phone.innerHTML = '';
		var a = document.createElement('a');
		a.innerText = o.phone;
		a.setAttribute('style', 'cursor:pointer;');
		//~ a.href = 'https://hangoutsapi.talkgadget.google.com/hangouts/_?gid=135569030656&gd={"number":"6072385144"}';
		//~ a.target = '_blank';
		a.onclick = function(e) {
			
			console.log('Clicked phone link. Sending request phone:' + this.innerText);
			
			// Load this phone number into the phone number window.
			// Send a message to the background script.
			// 
			chrome.extension.sendRequest({
				method:'google_hangouts_load_phone',
				phone_number:this.innerText,
				details: {hangupAllButPickup:true, dial0AtStart:true},
				task_name: "Andrew Ryan"
			});
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
		o.b_phone.appendChild(a);
		
	}
	
	//
	// Matt Tarjeft
	// 
	//
	s = '<p>The email below includes the password.</p>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:14px;}');
		GM_addStyle('.highlight-box {position:absolute;top:1000px;}');
			
		var acct = /<p>login to the following account: ([^:]+):([^<]+)<\/p>/.exec(ih);
		for (var i = 1; i <= 2; i++) {
			acct[i] = __js_clean_html_str(acct[i]);
		}
		
		acct[1] = acct[1].replace(/ pass$/,'');
		
		console.log(acct);
		
		var FIRSTRUN = true;
		
		// init
		//
		Matt_Tarjeft_yahoo_emails__init();
		
		var interval_task = setInterval(function() {
			Matt_Tarjeft_yahoo_emails__init();
		}, 600);
		
		function Matt_Tarjeft_yahoo_emails__init() {
			
			chrome.extension.sendRequest(
				{
					method: "getLocalStorage",
					key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__isComplete",
				},
				function(response) {
					// if empty
					if (!response.data || response.data == '' || response.data == '[]') {
						response.data = '{}';
					}
					
					// obj {}
					var obj = JSON.parse(response.data);
					
					if (obj.email && obj.email == acct[1] && obj.pwd && obj.pwd == acct[2]) {
						if (obj.isCompleted) {
							//done!
							// doSubmit
							clearInterval(interval_task);
							alert('done!');
						}
						//It's there, but not yet done
						return;
					}
					
					
					//First pass or it's new!
					// add this only on the first run!				
					if (!FIRSTRUN) {
						return;
					}
					FIRSTRUN = false;
					
					chrome.extension.sendRequest(
						{
							method: "getLocalStorage",
							key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete",
						},
						function(response) {
							// if empty
							if (!response.data || response.data == '' || response.data == '[]') {
								response.data = '{}';
							}
							
							// obj {}
							var obj = JSON.parse(response.data);
							
							if (obj.email && obj.email == acct[1] && obj.pwd && obj.pwd == acct[2]) {
								if (obj.isCompleted) {
									//done!
									// doSubmit
									//clearInterval(interval_task);
									//alert('done!');
								}
								//It's there, but not yet done
								return;
							}
							
							obj =
							{
								email: acct[1],
								pwd: acct[2],
								isCompleted: false,
							};
							
							chrome.extension.sendRequest(
								{
									method: "saveLocalStorage",
									key: "MT___VAR___Matt_Tarjeft_yahoo__queue_object__toComplete",
									data: JSON.stringify(obj)
								},
								function(response) {
									//~ if (found_in_queue) {
										//~ return;
									//~ }
								}
							);
						}
					);
				}
			);
		}
	}
}
// END load__allPages_AMT_combo()

/**
 * RUN DOCUMENT
 *
 * 
 * 
 * 
 * 
 * 
 *  
**/
var ih;

var SCRIPT_NAME = 'sBjbERoTskUbPjSsoQcZksMjxFobkapd';




/** Big Vars **/
var allUkCounties = {
	Avon:true,
	Bedfordshire:true,
	Berkshire:true,
	Borders:true,
	Buckinghamshire:true,
	Cambridgeshire:true,
	Central:true,
	Cheshire:true,
	Cleveland:true,
	Clwyd:true,
	Cornwall:true,
	'County Antrim':true,
	'County Armagh':true,
	'County Down':true,
	'County Fermanagh':true,
	'County Londonderry':true,
	'County Tyrone':true,
	Cumbria:true,
	Derbyshire:true,
	Devon:true,
	Dorset:true,
	'Dumfries and Galloway':true,
	Durham:true,
	Dyfed:true,
	'East Sussex':true,
	Essex:true,
	Fife:true,
	Gloucestershire:true,
	Grampian:true,
	'Greater Manchester':true,
	Gwent:true,
	'Gwynedd County':true,
	Hampshire:true,
	Herefordshire:true,
	Hertfordshire:true,
	'Highlands and Islands':true,
	Humberside:true,
	'Isle of Wight':true,
	Kent:true,
	Lancashire:true,
	Leicestershire:true,
	Lincolnshire:true,
	Lothian:true,
	Merseyside:true,
	'Mid Glamorgan':true,
	Norfolk:true,
	'North Yorkshire':true,
	Northamptonshire:true,
	Northumberland:true,
	Nottinghamshire:true,
	Oxfordshire:true,
	Powys:true,
	Rutland:true,
	Shropshire:true,
	Somerset:true,
	'South Glamorgan':true,
	'South Yorkshire':true,
	Staffordshire:true,
	Strathclyde:true,
	Suffolk:true,
	Surrey:true,
	Tayside:true,
	'Tyne and Wear':true,
	Warwickshire:true,
	'West Glamorgan':true,
	'West Midlands':true,
	'West Sussex':true,
	'West Yorkshire':true,
	Wiltshire:true,
	Worcestershire:true,
}


if (document.readyState == "complete" || document.readyState == "interactive") {
	ih = document.body.innerHTML;
	var loader = new load();
	if (loader.global_vars.is_running_on_amt) {
		if(loader.AMT__init_utility_window) {
			loader.AMT__init_utility_window();
		}
	}
}
else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			ih = document.body.innerHTML;
			var loader = new load();
			if (loader.global_vars.is_running_on_amt) {
				if(loader.AMT__init_utility_window){
					loader.AMT__init_utility_window();
				}
			}
		}
	}
}
