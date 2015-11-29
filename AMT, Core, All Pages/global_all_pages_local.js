/**
 * This is a global.js file specific for the All Pages extension. It contains
 * functionality similiar to global.js for the Core extension.
 * 
 * 
 * 
 * @ MT__bold
 * @ AMT__rq
 * @ AMT___global_factory
 * @ onMessage (message passing from eventPage.js
 * @
 * 
 * NOTE:
 * THE FOLLOWING IS REMOVED FROM global.js. This file is addition. There are subtractions in global.js though.
 * 
 * REMOVE THE FOLLOWING function call from root scope (initial call):
 * AMT___POPUP__initializeGlobals();
 * 
 * 
 */



var initializeIsSpecialWorkflowWindow__all_pages = function() {
	chrome.extension.sendRequest( // request, sender, se
		{
			amISpecialWorkflowWindow_all_pages: true//,
			//~ callback: callback
			
			//callback: 'amISpecialWorkflowWindow_all_pages'
		}, 
		function(rs)
		{
			// nothing here
			// Comes back as onMessage. See onMessage.amISpecialWorkflowWindow_all_pages.
			
			//~ console.log(rs);
			//~ AMT__Global_Vars.isSpecialWorkflowWindow = rs.detail;
			//~ callback(AMT__Global_Vars.isSpecialWorkflowWindow);
		}
	);
}

//
//~ 
//~ /**
 //~ * AMT__utility_window_quick_funcs
 //~ * 
 //~ * @param		object
 //~ */
//~ function AMT__utility_window_quick_funcs(r) {
	//~ 
	//~ /**
	 //~ * SIMILAR TO AMT__all_pages_util
	 //~ * 
	 //~ * HOWEVER these go to background page, then to mturk-core background page, then to mturk-core script.js.
	 //~ */
	//~ if ( r.email_links_click_to_parent ) {
		//~ new AMT___global_factory().email_links_click_to_parent__util_window(
		//~ );
	//~ }
	//~ 
	//~ /**
	 //~ * DUPLICATE OF AMT__all_pages_util
	 //~ */
	//~ // email_links_remove_mailto
	//~ // @param 
	//~ if ( r.email_links_remove_mailto ) {
		//~ new AMT___global_factory().email_links_remove_mailto(
		//~ );
	//~ }
	//~ 
	//~ // show_remove_links_button
	//~ // @param 
	//~ if ( r.show_remove_links_button ) {
		//~ new AMT___global_factory().show_remove_links_button(
		//~ );
	//~ }
	//~ 
//~ }

/**
 * AMT__all_pages_util
 * 
 * @param		object
 */
function AMT__all_pages_util(r) {
	console.log(r);
	/**
	 * Add the current URL to r
	 * 
	 */
	r.init_current_URL = document.location.href;
	
	// Add a panel in top left if the following types are present:
	//		.MT___all_pages_showhref
	//		.show_remove_links_button
	if  (
		r.hasOwnProperty('MT___all_pages_showhref') ||
		r.hasOwnProperty('show_remove_links_button')
		)
	{
		new AMT___global_factory().add_panel();
	}
	
	// extend
	if ( r.MT___all_pages_extend )
		MT___all_pages_extend();
	
	// zoom
	if ( r.MT___all_pages_zoom )
		MT___all_pages_zoom( r.MT___all_pages_zoom );
	
	// showhref
	if ( r.MT___all_pages_showhref )
		MT___all_pages_showhref();
	
	// scroll
	// MT___all_pages_highlightEmailAddresses(scrollIntoView, regex_highlight)
	if ( r.MT___text_scrollIntoView )
		MT___all_pages_highlightEmailAddresses(true, r.MT___text_scrollIntoView); 
	
	// global__highlight_photos
	// Pass in an options object
	if ( r.global__highlight_photos ) {
		new AMT___global_factory().highlight_photos(
			r.global__highlight_photos
		);
	}
	
	//listenForKeyPress
	if(r.listenForKeyPress) {
		new AMT___global_factory().listenForKeyPress();
	}
	
	// highlight_ranges_to_parent
	// e.g. highlight_ranges_to_parent: {completion_key: 'Dan_Shaffer_site_eval'}
	// Pass in an options object
	if ( r.highlight_range_to_parent ) {
		//~ console.log('highlight range is on');
		//~ r.highlight_range_to_parent.messagePassingOptions = r;
		new AMT___global_factory().highlight_range_to_parent(
				r
		);
	}
	
	// Zoom a name
	// @param: String
	if ( r.person_name_zoom ) {
		KristinHowe_agent_photo_scrollIntoView( r.person_name_zoom );
	}
	
	// Highlight strings
	// @param highlight_strings_in_page 		object
	// @param highlight_strings_in_page.strings	array
	console.log(r);
	if ( r.highlight_strings_in_page ) {
		new AMT___global_factory().highlight_strings_in_page(
			r.highlight_strings_in_page
		);
	}
	
	if ( r.highlight_phone_numbers_in_page ) {
		new AMT___global_factory().highlight_phone_numbers_in_page(
			r.highlight_phone_numbers_in_page
		);
	}
	
	if(r.listenForKeyPress) {
		new AMT___global_factory().listenForKeyPress(
				r.listenForKeyPress
			);
	}
	
	// email_links_remove_mailto
	// @param 
	if ( r.email_links_remove_mailto ) {
		new AMT___global_factory().email_links_remove_mailto(
		);
	}
	
	// up_button_to_all_links
	// Added April 26, 2015
	// 
	if ( r.up_button_to_all_links ) {
		new AMT___global_factory().up_button_to_all_links(
			r
		);
	}
	
	if(r.shortcutPanel) {
		console.log('r.shortcutPanel');
		new AMT___global_factory().shortcutPanel(
			r
		);
	}
	
	//~ // email_links_remove_mailto
	//~ // @param 
	//~ if ( r.email_links_remove_mailto ) {
		//~ new AMT___global_factory().email_links_remove_mailto(
		//~ );
	//~ }
	
	// Scroll to page botton
	//
	if(r.ScrollToPageButtom) {
		window.setTimeout(function () {
			window.scroll(0,100000);
		}, 3000);
	}
	
	// show_remove_links_button
	// @param 
	if ( r.show_remove_links_button ) {
		new AMT___global_factory().show_remove_links_button(
		);
	}
	
	// email_links_click_to_parent
	// @param 
	if ( r.email_links_click_to_parent ) {
		new AMT___global_factory().email_links_click_to_parent(r);
		//~ new AMT___global_factory().email_links_click_to_parent({
			//~ completion_key: r.email_links_click_to_parent.completion_key,
			//~ messagePassingOptions: r
		//~ });
	}
	
	// make_element_words_click
	// @param 
	if ( r.make_element_words_click ) {
		
	}
	
	//debug_display: o.name
	if ( r.debug_display ) {
		// 1 //
		var d = document.createElement('div');
		d.setAttribute('style', 'position:absolute;top:0;margin:0 auto;width:40%;background-color:#fefeff;border:2px dashed #a2a2a2;z-index:99999999;zoom:2;font-weight:bold;');
		d.innerText = r.debug_display;
		document.body.appendChild(d);
		// 2 //
		var d = document.createElement('div');
		d.setAttribute('style', 'position:fixed;top:0;margin:0 auto;width:40%;background-color:#fefeff;border:2px dashed #a2a2a2;z-index:99999999;zoom:2;font-weight:bold;');
		d.innerText = r.debug_display;
		document.body.appendChild(d);
	}
}

// THESE ARE SOME GENERAL FUNCTIONS...
//
//
//

//
// Email scrollIntoView all pages
//
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
		
		// replace prev. matched
		for (var j in arrMatchedStrings) {
			el_innerText = el_innerText.replace( // replaces first occurrence
				arrMatchedStrings[j],
				''
			);
		}
		
		if (r.exec(el_innerText)) {
			
			if (!last_el)
				last_el = el[i];
			
			arrMatchedStrings.push(el[i].innerText.trim());
			
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

//~ if(HIGHLIGHT_UK_COUNTIES) {
	//~ for(var county in allUkCounties) {
		//~ if(county) {
			//~ document.body.innerHTML = document.body.innerHTML.replace((new RegExp(county,'gi')), '<span style="background-color:yellow">'+county+'</span>');
		//~ }
	//~ }
//~ }

//~ if  (
		//~ RUN__ALL_PAGES_ZOOM
	//~ )
//~ {
	//~ MT___all_pages_zoom();
//~ }
/**
 * function MT___all_pages_zoom
 * Description: Zoom all pages. Default=70%, so smaller.
 * 
 * @param zoom_level, string OR ==false
 * 
 * Btw, console.log(typeof true) = 'boolean'
 */
function MT___all_pages_zoom( zoom_level ) {
	var typ = typeof zoom_level;
	if (typ == 'string' || typ == 'number') {
		document.body.style.zoom = zoom_level; // Default
	} else {
		document.body.style.zoom = 0.7; //"70%"; // Default
	}
}
//
// Extend all pages
// 
//~ if  (
		//~ RUN__ALL_PAGES_EXTEND
	//~ )
//~ {
	//~ MT___all_pages_extend();
//~ }
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
}

// o is a string
// arr is an array of strings to be bolded
function MT__bold(o, arr, options_object) {
	// avoid b
	// go from longest to shortest
	
	// used bold matches
	var found_words_bolded = [];
	
	// sort longest first
	arr.sort(function(a, b){
	  return b.length - a.length; // ASC -> a - b; DESC -> b - a
	});
	
	//console.log(o);
	//console.log(arr);
	
	var x = o;
	var word;
	
	for (var i in arr) {
		
		// July 2 2014, Added .trim()
		//
		//
		word = arr[i].trim();
		
		//console.log(word);
		//console.log(x.match(new RegExp('('+__js_escape_regEx(word)+')', 'gi')));
		
		if (word == '') {
			continue;
		}
		//~ // is in found_words_bolded ?
		//~ for (var j in found_words_bolded) {
			//~ var prev_match = found_words_bolded[j];
			//~ var tmp_match = (new RegExp('('+__js_escape_regEx(word)+')')).exec(prev_match);
			//~ if (new RegExp('('+__js_escape_regEx(word)+')'
		//~ }
		//
		if (word == 'b' || word == 'B') {
			x = x.replace(/b([^>])/, '<b>$1'); //     b>
			x = x.replace(/([^\/<])b/, '$1</b>'); //  /<b
			//arr[i] = 
			continue;
		}
		
		// here?
		//~ var reg = new RegExp('(?=(<b>))[\s]('+__js_escape_regEx(word)+')', 'gi');
		var reg = new RegExp('('+__js_escape_regEx(word)+')(?![^< ]*<\/b>)', 'gi');
		// fishes</b>
		// fish</b>
		// fis(h)(<)
		// fis(h)([ $])
		
		x = x.replace(reg, '<b>$1</b>');
			
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
		
	}
	
	//~ console.log(found_words_bolded);
	
	if (!options_object)
		return x;
	else {
		var return_object = {};
		
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
}

/**
 * chrome.runtime.onMessage.addListener
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		
		//~ console.log('Recieved onMessage request.');
		//~ console.log(request);
		
		/**
		 * 
		 */
		if (request.amISpecialWorkflowWindow_all_pages) {
			console.log('x');
			console.log(run);
			console.log(run.f);
			console.log(run.require);
		}
		
		/**
		 * request.google_hangouts_load_phone
		 * 
		 * This tab is currently on ... Load the passed in
		 * phone number into "hidden" div.
		 * 
		 * @param	request.google_hangouts_load_phone	string	Phone number
		 * 
		 * @returns
		 */
		if (request.google_hangouts_load_phone && document.location.href.indexOf('googleusercontent.com/gadgets/') != -1) {
			console.log('inside of if statement for google hangout load phone');
			// Put JSON object into a new div with class name 'MakePhoneCommands'
			var pcDiv = document.createElement('div');
			pcDiv.setAttribute('class', 'MakePhoneCommands');
			pcDiv.setAttribute('hasProcessed', false);
			document.getElementById('ProcessCommandsDebug').appendChild(pcDiv);
			console.log(request);
			pcDiv.innerText = JSON.stringify(
				{
					callNums: [request.google_hangouts_load_phone],
					details: request.google_hangouts_details,
					taskName: request.google_hangouts_task_name
				}
			)
			document.getElementById('ProcessCommands').click();
			
			//~ var hidden_div = document.getElementById('MakePhoneCommands');
			//~ if (hidden_div) {
				//~ var obj = {
					//~ callNums: [request.google_hangouts_load_phone]
				//~ }
				//~ hidden_div.innerText = JSON.stringify(obj);
			//~ }
		}
	}
);
/**
 * AMT__rq
 * 
 * AMT requester functions
 * 
 */
var AMT__rq = function() {
	
}
/**
 * AMT___global_factory
 * 
 */
function AMT___global_factory() {
	
}
/**
 * .up_button_to_all_links
 * 
 * Description: Add a button to pass the URL of any LINK element to
 * the parent window.
 * 
 * @param	options
 * 
 * @return 
 * 
 */
AMT___global_factory.prototype.up_button_to_all_links = function(options) {
	var x = document.getElementsByTagName('a');
	for (var i in x) {
		if (i == 'length') break;
		var d = document.createElement('button');
		d.setAttribute('style', 'cursor:pointer;');
		d.innerText = 'up';
		d.href = x[i].href;
		x[i].parentNode.insertBefore(d, x[i]);
		d.onclick = function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.style.backgroundColor = 'LightGreen';
			if(options.hasOwnProperty('isUtilityTab')) {
				chrome.runtime.sendMessage(
					'gcfnekbbpmbgadddbojhlojhddnkcpje',
					{
						util_window_message_passing: true,
						data: {
							href: this.href
						},
						init_object: options,
						focus: true
					},
					function(response) {
						// response=object
					}
				);
			}
			else {
				parent.postMessage(
					{
						key: options.completion_key,
						href: this.href
					},
					"*"
				);
			}
			return false;
		}
	}
}


AMT___global_factory.prototype.getLinksContaining = function(strOrArrayOfStr) {
	var sArray;
	if((typeof strOrArrayOfStr) == 'string') {
		sArray = [strOrArrayOfStr];
	} else {
		//Assume it's an array
		sArray = strOrArrayOfStr;
	}
	
	var a = document.getElementsByTagName('a');
	var matchingLinks = [];
	var str;
	var currentDomain = window.location.href.replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2").toLowerCase();
	for(var i = 0; i < sArray.length; i++) {
		str = sArray[i].toLowerCase();
		for(var j = 0; j < a.length; j++) {
			if(a[j].innerText && a[j].innerText.length > 50 || a[j].childElementCount > 3 ||
			   a[j].href && a[j].href.indexOf('@') != -1  ||
			   a[j].href && a[j].href.replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2").toLowerCase() != currentDomain
			   ) {
				//a[j].testText = a[j].innerText.match(/^[\d\D]{20}/;
				continue;
			}
			else 
				a[j].testText = a[j].innerText;
			if(
			//a[j].href && a[j].href.toLowerCase().indexOf(str) != -1 ||
			a[j].testText && a[j].testText.toLowerCase().indexOf(str) != -1
			  ) {
			   console.log(a[j]);
			   console.log(str);
			   matchingLinks.push(a[j]);
			}
		}
	}
	return matchingLinks;
}


AMT___global_factory.prototype.shortcutPanel = function(options) {
	/*
	 * Profile is has a tiers object which is an array of shortcutTierObj's (and is also the primary panel)
	 * 	each shortcutTierObj designates its type, matchstrings, how many utility windows it auto-opens etc.
	 *  	the tier objects are also divs in the panel and contain a typeDiv (which displays the type), and any number of clickable 
	 *   	linkDivs which send you either to the utility tab or opens a new tab.
	 **/
	 var options = options;
	 
	 var profile = options.shortcutPanel;
	 switch(profile) {
	 case 'real estate agents': 
			profile = {
				tiers:
				[{
					matchStrings: ['agent','associates','realtor','team', 'meet'],
					autoOpen: 1
				}, {
					matchStrings: ['about'],
					autoOpen: 1
				},
				{
					matchStrings: ['contact'],
					autoOpen: 0
				}
				],
				maxAutoOpen: 5,
				maxLinksPerTier: 3,
			}	 
	case 'ceo/owner/founder/cfo': profile = {
			tiers:[
				{
						matchStrings:['ceo','owner','founder','cfo','chief']
				},
				{
						matchStrings:['team','meet','associates']
				},
				{
						matchStrings:['about','contact']
				},
			],
			maxAutoOpen:1,
			maxLinksPerTier:1,
		}
	}
	
	profile.numOpened = 0;
	
	var primaryPanel = document.createElement('div');
	primaryPanel.setAttribute('style','position:fixed;z-index:999999;left:0px;top:0px;width:20%;background-color:gray;');
	document.body.appendChild(primaryPanel);
	for(var i = 0; i < profile.tiers.length; i++) {
		var matchingLinks = new AMT___global_factory().getLinksContaining(profile.tiers[i].matchStrings);
		console.log(matchingLinks);
		
		if(matchingLinks.length) {
			var typeDiv = document.createElement('div');
			typeDiv.setAttribute('style','float:left;width:100%;background-Color:LightGray;');
			primaryPanel.appendChild(typeDiv);
			typeDiv.innerText = profile.tiers[i].type ? profile.tiers[i].type : i;
			for(var j = 0; j < matchingLinks.length; j++) {
				var shortCutDiv = document.createElement('div');
				shortCutDiv.setAttribute('style','float:left;width:100%;background-Color:LightGray;border:1px solid black');

				primaryPanel.appendChild(shortCutDiv);
				shortCutDiv.innerText = matchingLinks[j].innerText;
				shortCutDiv.link = matchingLinks[j];
				shortCutDiv.link.initialBackgroundColor = shortCutDiv.link.style.backgroundColor;
				shortCutDiv.link.initialBorder = shortCutDiv.link.style.border;
				shortCutDiv.className = 'scDiv';
				//shortCutDiv.options = options;
				shortCutDiv.addEventListener('mouseover', function() {
					this.link.style.zoom = 2.5;
					this.link.style.textDecoration = 'underline';
					this.link.scrollIntoView();
					this.link.style.fontWeight = 'bold';
					this.link.style.backgroundColor = '#FDFF47';
					this.link.style.border = '1px solid black';
					this.style.backgroundColor = 'LightGreen';
					this.style.cursor = 'pointer'
				});
				shortCutDiv.addEventListener('mouseout', function() {
					this.link.style.zoom = 1;
					this.link.style.fontWeight = 'normal';
					this.style.backgroundColor = '#EEE';
					this.style.cursor = 'pointer';
					this.link.style.textDecoration = '';
					this.link.style.backgroundColor = this.link.initialBackgroundColor;
					this.link.style.border = this.link.initialBorder;
				});
				shortCutDiv.addEventListener('click', function() {
					if(this.utilityId) {
						console.log(this.utilityId);
						chrome.runtime.sendMessage(
							'gcfnekbbpmbgadddbojhlojhddnkcpje',
							{
								switchToUtilityTab: this.utilityId
							});
					} else if(options.linkIdArray) {
						var found = false;
						for(var i = 0; i < options.linkIdArray.length; i+=2) {
							if(options.linkIdArray[i].trim() == this.link.href.trim()) {
								chrome.runtime.sendMessage(
									'gcfnekbbpmbgadddbojhlojhddnkcpje',
									{
										switchToUtilityTab: options.linkIdArray[i+1]
									});
								return;
							}
						}
						this.link.click();
					} else {
						this.link.click();
					}
				});
				if(profile.tiers[i].autoOpen > 0 && profile.numOpened < profile.maxAutoOpen && !options.dontAutoloadFurther) {
					console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
					profile.tiers[i].autoOpen--;
					profile.numOpened++;
					console.log('options');
					console.log(options);
					var newOptions = {};
					for(var k in options) {
						newOptions[k] = options[k];
					}
					newOptions['dontAutoloadFurther'] = true;
					if(options.hasOwnProperty('isUtilityTab')) {
						var id = Math.random();
						shortCutDiv.utilityId = id;
						chrome.runtime.sendMessage(
							'gcfnekbbpmbgadddbojhlojhddnkcpje',
							{
								addUtilityTab: {
									utility:{
										url: matchingLinks[j].href,
										id: id,
										options:newOptions
									},
									addIFFPrimaryUtilityTab:true
								}
							}
						);
					}
				}
			}
		}
	}
	//~ console.log('options');
	//~ console.log(options);
	//~ console.log(options.dontAutoloadFurther);
	if(!options.dontAutoloadFurther) {
		chrome.runtime.sendMessage(
							'gcfnekbbpmbgadddbojhlojhddnkcpje',
							{
								addUtilityOptionsToSelf: {
									dontAutoloadFurther: true
								}
							});
		sDivs = document.getElementsByClassName('scDiv');
		var linkIdArray = [];
		for(var i = 0; i < sDivs.length; i++) {
			if(sDivs[i].utilityId) {
				linkIdArray.push(sDivs[i].link.href);
				linkIdArray.push(sDivs[i].utilityId);
			}
		}
		
		chrome.runtime.sendMessage(
							'gcfnekbbpmbgadddbojhlojhddnkcpje',
							{
								addOptionsToAllRelatedUtilities: {
									linkIdArray : linkIdArray
								}
							});
	}
}

/**
 * .add_panel
 * 
 * @param	options	object
 * 
 * @return 
 * 
 */
AMT___global_factory.prototype.add_panel = function(options) {
	
	var d = document.createElement('div');
	d.setAttribute('style','position:fixed;top:0;left:0;width:10%;z-index:1000000000;border:4px solid orange;background-color:#eee');
	d.id = 'DIV_ADD_PANEL__RANDOM_71765847293864762532874523764';
	document.body.appendChild(d);
	
}
/**
 * .show_remove_links_button
 * 
 * @param	options	object
 * 
 * @return 
 * 
 */
AMT___global_factory.prototype.show_remove_links_button = function(options) {
	
	var imp = '';//'!important !important !important !important !important !important !important !important !important !important';
	var btn;
	
	var add_panel = document.getElementById('DIV_ADD_PANEL__RANDOM_71765847293864762532874523764');
	if (add_panel) {
		add_btn(add_panel);
	} else {
		add_btn(false);
	}
	
	function add_btn(div) {	
		var btn = document.createElement('input');
		btn.type = 'button';
		btn.setAttribute('style','width:100% '+imp+';height:30px '+imp+';border:1px solid #a2a2a2 '+imp+';cursor:pointer '+imp+';');
		btn.value = 'Remove Links!'
		btn.onclick = remove_links;
		
		if (!div) {
			document.body.appendChild(btn);
		} else {
			div.appendChild(btn);
		}
	}
	
	function remove_links(e) {
		
		this.style.backgroundColor = 'LightGreen';
		
		//~ GM_addStyle('a:hover   {text-decoration:none '+imp+';cursor:text '+imp+';}');
		//~ GM_addStyle('a:visited {text-decoration:none '+imp+';cursor:text '+imp+';}');
		//~ GM_addStyle('a:active  {text-decoration:none '+imp+';cursor:text '+imp+';}');
		//~ GM_addStyle('a:link    {text-decoration:none '+imp+';cursor:text '+imp+';}');
		
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i>=0; i--) {
			// a['__proto__']?
			
			if (typeof a[i] != 'object') continue;
			
			var span = document.createElement('span');
			span.setAttribute('style', 'background-color:yellow;color:black;zoom:1.2;');
			span.innerText = ' ' + a[i].innerText + ' ' + a[i].href.replace(/^ *mailto *: */i, '') + ' ';
			a[i].parentNode.insertBefore(span, a[i]);
			a[i].parentNode.removeChild(a[i]);
			
			//~ span.innerText = a[i].innerText + ' (' + a[i].href + ')';
		}
		
		// UPDATE BTN !
		btn.value = 'Revert Changes!';
	}
	
	function revert_changes() {
		
	}
}
/**
 * .make_element_words_click
 * Select all of the text in an element. This is by RANGE.
 * 
 * @param	options	object
 * 
 * @return 
 * 
 * NOTE
 * http://stackoverflow.com/questions/7563169/detect-which-word-has-been-clicked-on-within-a-text
 */
AMT___global_factory.prototype.make_element_words_click = function(options) {
	
	options.element.onclick = function(e) {
		s = window.getSelection();
		var range = s.getRangeAt(0);
		var node = s.anchorNode;
		while (range.toString().indexOf(' ') != 0) {
			range.setStart(node, (range.startOffset - 1));
		}
		range.setStart(node, range.startOffset + 1);
		do {
			range.setEnd(node, range.endOffset + 1);

		} while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length);
		var str = range.toString().trim();
		alert(str);
	}
}
/**
 * .document_add_range
 * Select all of the text in an element. This is by RANGE.
 * 
 * @param	options	object
 * 
 * @return 
 * 
 * NOTE
 * http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
 */
AMT___global_factory.prototype.document_add_range = function(options) {
	
	function selectElementContents(el) {
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
	
	console.log(options);
	selectElementContents(options.element);
	
}
/**
 * .email_links_click_to_parent
 * 
 * @param		options					object
 * @param		"".completion_key		string
 * 
 * @return		object					
 */
AMT___global_factory.prototype.email_links_click_to_parent = function(options) {
	
	/**
	completion_key: r.email_links_click_to_parent.completion_key,
	messagePassingOptions: r **/
			
	var options = options;
	var a = document.getElementsByTagName('a');
	for (var i in a) {
		if (i == 'length') break;
		if (/^ *mailto *:/i.exec(a[i].href)) {
			a[i].addEventListener('mouseup', function(e) {
				if(options.hasOwnProperty('isUtilityTab')) {
					chrome.runtime.sendMessage(
						'gcfnekbbpmbgadddbojhlojhddnkcpje',
						{
							util_window_message_passing: true,
							data: {
								email_address: this.href.replace(/^ *mailto *:*\/*/i, '')
							},
							init_object: options,
							focus: true
						},
						function(response) {
							// response=object
						}
					);
				}
				else {
					parent.postMessage(
						{
							key: options.completion_key, // e.g. Dan_Shaffer_site_eval
							email_address: this.href.replace(/^ *mailto *:*\/*/i, '')
						},
						"*"
					);
				}
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}, false);
		}
	}
}
//~ /**
 //~ * .email_links_click_to_parent__util_window
 //~ * NOTE DUPLICATE BUT GOES TO BACKGROUND SCRIPT
 //~ * 
 //~ * @param options			object
 //~ * @param "".completion_key	string
 //~ * 
 //~ * @return 
 //~ */
//~ AMT___global_factory.prototype.email_links_click_to_parent__util_window = function(options) {
	//~ 
	//~ var options = options;
	//~ var a = document.getElementsByTagName('a');
	//~ for (var i in a) {
		//~ if (i == 'length') break;
		//~ if (/^ *mailto *:/i.exec(a[i].href)) {
			//~ a[i].addEventListener('mouseup', function(e) {
				//~ // SEND MESSAGE TO MTURK.COM-CORE
				//~ /**
				 //~ * sendMessage to gcfnekbbpmbgadddbojhlojhddnkcpje
				 //~ * THIS GOES TO mturk.com-core background page
				 //~ * 
				 //~ * 
				 //~ */
				//~ chrome.runtime.sendMessage(
					//~ 'gcfnekbbpmbgadddbojhlojhddnkcpje',
					//~ {
						//~ util_window_message_passing: true,
						//~ data: {
							//~ tab_id: ,
							//~ key: options.completion_key,
							//~ email_address: this.href.replace(/^ *mailto *:*\/*/i, '')
						//~ }
					//~ },
					//~ function(response) {
						//~ // response=object
					//~ }
				//~ );
				//~ 
				//~ e.stopPropagation();
				//~ e.preventDefault();
				//~ return false;
			//~ }, false);
		//~ }
	//~ }
//~ }
/**
 * .email_links_remove_mailto
 * 
 * @param 
 * 
 * @return 
 */
AMT___global_factory.prototype.email_links_remove_mailto = function() {
	
	var a = document.getElementsByTagName('a');
	for (var i in a) {
		if (i == 'length') break;
		a[i].onclick = function(e) {
			if (/^ *mailto *:/i.exec(this.href)) {
				//~ console.log(a[i])
				//~ console.log(a[i].href)
				
				//~ new AMT___global_factory().document_add_range({
					//~ element: this
				//~ });
				
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		}
	}
	
}

/**
 * .highlight_strings_in_page
 * 
 * @param options_object	object
 * @param .strings			array	An array of strings to highlight
 * @param
 * 
 * @return 
 */
AMT___global_factory.prototype.highlight_strings_in_page = function(options_object) {
	console.log('GOT TO HIGHLIGHT STRINGS');
	// ADD A DOUBLE CLICK TO RESET PAGE
	//
	//~ var all_elements_zoomed = [];
	//~ document.body.addEventListener('dblclick', function() {
		//~ for (var i in all_elements_zoomed) {
			//~ all_elements_zoomed[i].style.zoom = '';
		//~ }
	//~ }, false);
	//~ console.log(options_object);
	
	// Already highlighted...
	// TODO
	//
	//~ var already_highlighted = [];
	
	//if it's a string, highlight it yellow. 
	//If it's an object, it has the attribute: string, color
	var s = options_object.strings;
	
	s.sort(function(a,b) {
		var strLen;
		var str2Len;
		if(typeof a == 'object')
			strLen = a.string.length
		else
			strLen = a.length
		if(typeof b == 'object')
			str2Len = b.string.length
		else
			str2Len = b.length
		return str2Len - strLen;
	});
	
	// Remove old highlights 
	function removeHighlights(root){     
	  [].forEach.call(root.querySelectorAll('span._--_--_highlight_--_--_'),function(el){
		el.parentNode.replaceChild(el.firstChild,el);
	  });
	}
	removeHighlights(document.body);
	
	//~ console.log(s);
	// Highlight. Skip blank strings.
	for (var i in s) {
		if(typeof s[i] == 'object') {
			if (s[i].string.trim() == '') continue;
			highlightWord(document.body, s[i].string.toLowerCase(), s[i].color);
		}
		else {
			if (s[i].trim() == '') continue;
			highlightWord(document.body, s[i].toLowerCase());
		}
	}
	var allSpans = document.getElementsByTagName('span');
	for(var i in s) {
		if(s[i].scrollIntoView) {
			for(var j = 0; j < allSpans.length; j++) {
				console.log(allSpans[j].word);
				if(allSpans[j].word && allSpans[j].word.trim() == s[i].string.toLowerCase().trim()) {
					allSpans[j].scrollIntoView(false);
					//~ allSpans[j].scrollIntoView(true);
					break;
				}
			}
			break;
		}
	}
	//~ http://stackoverflow.com/questions/10729983/highlight-word-in-html-text-but-not-markup
	//~ http://jsfiddle.net/crgTU/7/
	function highlightWord(root, word,color){
		if(!color) {
			color = 'yellow';
		}
		textNodesUnder(root).forEach(highlightWords);

		function textNodesUnder(root){
			var walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false),
				text=[],
				node;
			while(node=walk.nextNode())
				text.push(node);
			console.log(text);
			return text;
		}

		function highlightWords(n){
			//~ var x = n.nodeValue.toLowerCase // already_highlighted[ highlighted ] = true;
			for (var i; (i=n.nodeValue.toLowerCase().indexOf(word,i)) > -1; n=after){
				var after = n.splitText(i+word.length);
				var highlighted = n.splitText(i);
				var span = document.createElement('span');
				span.setAttribute('style', 'background-color:'+color+';color:black;zoom:1.2;');
				span.word = word;
				span.className = '_--_--_highlight_--_--_';
				span.appendChild(highlighted);
				after.parentNode.insertBefore(span,after);
			}
		}
	}
}

/**
 * .highlight_phone_numbers_in_page
 * 
 * @param options_object	object
 * @param .closeWindowOnNoHighlight	closes the window if nothing is found
 * @param
 * 
 * @return 
 */
AMT___global_factory.prototype.highlight_phone_numbers_in_page = function(options_object) {
	console.log('GOT TO highlight_phone_numbers_in_page');
	// ADD A DOUBLE CLICK TO RESET PAGE
	//
	//~ var all_elements_zoomed = [];
	//~ document.body.addEventListener('dblclick', function() {
		//~ for (var i in all_elements_zoomed) {
			//~ all_elements_zoomed[i].style.zoom = '';
		//~ }
	//~ }, false);
	//~ console.log(options_object);
	
	// Already highlighted...
	// TODO
	//
	//~ var already_highlighted = [];
	
	

	// Remove old highlights 
	function removeHighlights(root){     
	  [].forEach.call(root.querySelectorAll('span._--_--_highlight_--_--_'),function(el){
		el.parentNode.replaceChild(el.firstChild,el);
	  });
	}
	removeHighlights(document.body);
	

	highlightWord(document.body)

	var allSpans = document.getElementsByTagName('span');	
	var found = false;
	for(var j = 0; j < allSpans.length; j++) {
		console.log(allSpans[j].word);
		if(allSpans[j].word && allSpans[j].word.trim()) {
			allSpans[j].scrollIntoView(false);
			//~ allSpans[j].scrollIntoView(true);
			found = true;
			break;
		}
	}
	
	if(!found) {
		if(options_object.closeWindowOnNoHighlight) {
			chrome.runtime.sendMessage(
								'gcfnekbbpmbgadddbojhlojhddnkcpje',
								{
									util_window_message_passing: true,
									removeThisUtilityTab: true
								},
								function(response) {
									
								}
							);	
		}
	}

	//~ http://stackoverflow.com/questions/10729983/highlight-word-in-html-text-but-not-markup
	//~ http://jsfiddle.net/crgTU/7/
	function highlightWord(root){
		var	color = 'yellow';
		textNodesUnder(root).forEach(highlightWords);

		function textNodesUnder(root){
			var walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false),
				text=[],
				node;
			while(node=walk.nextNode())
				text.push(node);
			console.log(text);
			return text;
		}

		function highlightWords(n){
			//~ var x = n.nodeValue.toLowerCase // already_highlighted[ highlighted ] = true;
			for (var i; (i=n.nodeValue.toLowerCase().regexIndexOf(/([\d\+\(\)]+[\s\-]+[\d\+\(\)]+)/,i)) > -1; n=after){
				var regPhone = /([\d\+\(\)]+[\s\-]+[\d\+\(\)]+)/
				var x = regPhone.exec(n.nodeValue.toLowerCase()) 
				x = x[1]
				var after = n.splitText(i+x.length);
				var highlighted = n.splitText(i);
				var span = document.createElement('span');
				span.setAttribute('style', 'background-color:'+color+';color:black;zoom:1.2;');
				span.word = x;
				span.className = '_--_--_highlight_--_--_';
				span.appendChild(highlighted);
				after.parentNode.insertBefore(span,after);
			}
		}
	}
}

AMT___global_factory.prototype.listenForKeyPress = function(options) {
	console.log('ran in listenForKeys');
	window.addEventListener('keypress', function(e) {
			console.log('got key');
			console.log(e);
				chrome.runtime.sendMessage(
					'gcfnekbbpmbgadddbojhlojhddnkcpje',
					{
						util_window_message_passing: true,
						keyCode: e.keyCode, 
						charCode: e.charCode,
						focus: true
					},
					function(response) {
						
					}
				);		
	});
};

/**
 * .highlight_range_to_parent
 * 
 * options_object.isUtilityTab					Boolean or unset
 * options_object.highlight_range_to_parent		Object or Boolean
 * 
 //~ * @param options_object		object
 //~ * @param "".completion_key		string	This is used to send a postMessage to parent window.
 //~ * XXXXXXXXXXX@param "".control_key_append	boolean	Enable control key to tell parent to append this to field rather than overwrite; (optional would be to add a "glue" value, e.g. " ")
 * 
 * @return text_range				string
 * @return control_key_is_active	boolean
 */
AMT___global_factory.prototype.highlight_range_to_parent = function(options_object) {
	
	//~ console.log('adding highlight_range_to_parent');
	window.addEventListener('mouseup', range_2_parent, false);
	
	/**
	 * Function range_2_parent
	 */
	function range_2_parent(e) {
		//~ console.log('got mouseup');
		var str = window.getSelection().toString();
		
		// Remove all ranges
		window.getSelection().removeAllRanges();
		
		if (str.length > 0) {
			
			var return_object = {
				text_range: str,
				control_key_is_active: e.ctrlKey	// Is control key down?
			};
			if (typeof options_object.highlight_range_to_parent == 'object') { // Is object or boolean
				return_object.key = options_object.highlight_range_to_parent.completion_key; // e.g. Dan_Shaffer_site_eval
			}
			
			if (!options_object.hasOwnProperty('isUtilityTab')) {
				parent.postMessage(
					return_object,
					"*"
				);
			} else { // Utility Tab
				chrome.runtime.sendMessage(
					'gcfnekbbpmbgadddbojhlojhddnkcpje',
					{
						util_window_message_passing: true,
						data: return_object,
						init_object: options_object,
						focus: true
					},
					function(response) {
					}
				);
			}
		}
	}
}
AMT___global_factory.prototype.callNextTabInCoreMturk = function(options) {
	//~ console.log(options);
	if(AMT__Global_Vars.scriptVars['NextTab Iframe Focus'] != '0') {
		if(!options)
			options = {};
		options['focusOnPage'] = true;
	}
	if(AMT__Global_Vars.scriptVars['Record Job Timings'] != '0') {
		if(!options)
			options = {};
		options['Record Job Timings'] = true;
	}
	else if(!options) {
		options = {};
	}
	chrome.runtime.sendMessage(
						'gcfnekbbpmbgadddbojhlojhddnkcpje',
						{
							nextTab: true,
							options: options,
							isTopWindow: (AMT__Global_Vars.scriptVars['NextTab Iframe Focus'] != '0' ? false : AMT__Global_Vars.isTopWindow),
							focus: true
						},
						function(response) {
							// response=object
						}
					);

}
/**
 * .highlight_photos
 * 
 * @param options_object {}
 * @param completion_key (String) This is used to send a postMessage to parent window.
 * @param
 */
AMT___global_factory.prototype.highlight_photos = function(options_object) {
	
	// Iterate through all images and add an image "button."
	// Background color is set from domain.
	// (getBoundingClientRect())
	// Remove all images from any previous runs.
	
	var options_object = options_object;
	
	// Remove old
	remove();
	
	// New
	add();
	
	// Send to parent/job window
	// Write value to db
	//~ var a = document.getElementsByClassName('manual__exe_image_162435168649');
	//~ for (var i in a) {
		//~ a[i].onclick = function() {
			//~ this.style.border = '4px solid LightGreen';
			//~ 
			//~ parent.postMessage(
				//~ {
					//~ key: 'AMT__Kristin_Howe_agent_photos__yahoo_bot__complete',
					//~ data: this.src
				//~ },
			//~ "*");
		//~ }
	//~ }
	
	function add() {
		var a = document.getElementsByTagName('img');
		for (var i in a) {
			if (i == 'length') break;
			if (!a[i].src || a[i].src == '') continue;
			add_image(a[i],  200);
			add_image(a[i], -200);
		}
	}
	function remove() {
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
	}
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
		d_.onclick = function() {
			this.style.border = '4px solid LightGreen';
			
			parent.postMessage(
				{
					key: options_object.completion_key, //'AMT__Kristin_Howe_agent_photos__yahoo_bot__complete',
					src: this.src
				},
			"*");
		}
		
		d.appendChild(d_);
		document.body.appendChild(d);
		
		//~ console.log('pos_left:'+pos_left+' left:'+left);
		//~ console.log(d_);
	}
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
	
	console.log('added event listener for top_window for all-pages');
	
	// ...
	function top_window__addEventListener_iframe__complete(event)
	{
		// BUG IN CHROME v 45.{}.{}.{}
		//
		//
		//~ if (!event || !event.hasOwnProperty('data') || !event.data) return;


		console.log('got event in core-all-pages');
		console.log(event);

		
		if (!event || !event.data) return;
		var v = event.data;
		
		switch(v.action) {
			case 'tabsQTitleChange': 
				//console.log("Changing document title to TQ");
				document.title = "TQ";
				(function() {var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9/f0F/Pz8DP///wD///8P////Dv///xL///8P////A////wD///8A/v7+Cf///wX///8A////APv7+wr9/f0D+/v7Dv///wb///81+vv8i/v7/Iv3+PqL4+nxi+ru9JHy9Piu5+zzru3w9ZD+/v5x/v7+H////wr///8A9/f3H/7+/g7///8J////HNDX5Pyaq8j/m6zJ/5esy/+QpcX/larK/5uwzv+MoMH/mqrG/5qlv+7Q0Nty/f3+Af///wD///8A/v7+A////wz+/v6b2d/q/4abvf+Emr7/jKHD/5Gnyf+Uqsz/fpW5/4mXuP/U1OL/e3ui+MPE0l7///8A////AP///wD///8P////Xa680/9/lrr/kafJ/5yy0/+WrM7/nbPT/52uyv+ktM7/1NTi/8LC1f+lpr3n////AP///wD///8A////AP7+/mDo7PL/ytPi/5yv0fehsuXuuMvl0Kq81drS2uf8+/z9bff3+SG5uM1r8vL1ff///wD///8A////AP///wr+/v4H/v7+jufq8umIg/Sut7L9YKul/W7PzvlMnZn03Ozq/x/+/v4H////AP///wD///8A////AP///wD///8A5OH/IpuS/pF3cfPploz/hH5y/6F/dP+gl47/gkw++e7Hwv9Fta//XPj4/gf///8A////AP///wD///8A+vn/BoyB/pGlnf5vfHfxy4mA/JlIOf/lmZD+f1lK/89kWPrPmZD+f9zY/yu3sP5ar6j/ZP///wD///8A6uj/GbSt/l6imv9yVkf/1HBm+MJ5eOrlhX/1s2JY+dRpYPfPv7/zb4+F/41WR//Uloz/hI6E/47///8A////AOro/xmnn/9teW3/qH5y/6HKxf9B9/n7Fc3N9VfMyvlQraj6cbWv/1zj4f4h2tf/Lks7/+NmWP+/0s7/OP///wCvqP9kjoT/jo6E/46Sif+I+vn/Bt3a/ypsX/+5////AH90/6Dj4f4h0Mz/OrWv/1yyq/9gkon/iNzY/yv///8A19P/MvLx/g////8A////APX0/wxvYv6119P/MtzY/ytmWP+/oZj/df///wBQQP/dt7D+Wv///wD///8A////AP///wD///8A////AKyk/2makf9+UUL/283J/z/l4/8f1dH/M////wD///8At7D+Wv39/gH///8A////AP///wD///8A////AP///wDa1/8u2tf/LtrX/y719P8M////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAOAfAADgBwAA4AMAAPABAADwHwAA8d8AAPAfAADonwAA8CEAAOf5AADGvQAA/bcAAP3/AAD//wAA//8AAA==';document.getElementsByTagName('head')[0].appendChild(link);})();

				break;
			//~ case 'return_button_hotkey':
				//~ window.addEventListener('keydown', function(e) {
						//~ if(e.keyCode == v.options.keyCode) {
							//~ console.log('returning');
							//~ var b = getReturnButton();
							//~ b.click();
						//~ }
					//~ });
				//~ break;
			//~ case 'click_return_button': 
				//~ var b = getReturnButton();
				//~ b.click();
				//~ break;
			//~ case 'return_button__showNextTab':
				console.log('Will showNextTab on return');
				//~ 
				//~ var b = getReturnButton();
				//~ if (b) {
					//~ b.addEventListener('click', function() {
						//~ showNextTab({isTopWindow:true});
						//~ showNextTab({isTopWindow:false});
					//~ }, false);
				//~ }
				//~ // 2nd return button
				//~ // AMT_return_button_top_window
				//~ var b = getReturnButton2();
				//~ if (b) {
					//~ b.addEventListener('click', function() {
						//~ showNextTab();
					//~ }, false);
				//~ }
				//~ break;
			// AMT___returnAndAcceptButton()
			//~ case 'return_and_accept_button__nextTab':
				//~ AMT__Global_Vars.core.return_accept_run_nextTab = true;
				//~ break;
			//~ case 'return_button__nextTab':
				//~ AMT__Global_Vars.core.return_run_nextTab = true;
				//~ break;
			//~ case 'return_and_accept':
				//~ document.getElementById('MT__gm_returnaccept').click();
				//~ break;
			//~ case 'changeWindowNotifier':
				//~ //alert('here 1');
				//~ if(!localStorage['ChangeWindowCount'])
					//~ localStorage['ChangeWindowCount'] = 0;
				//~ if(localStorage['ChangeWindowCount'] <= v.threshold_to_change)
				//~ {
					//~ localStorage['ChangeWindowCount']++;
				//~ }
				//~ else {
					//~ localStorage['ChangeWindowCount'] = 0;
					//~ document.body.style.backgroundColor = 'silver';
					//~ chrome.extension.sendRequest({play_random_next_sound:true}, function() {/*squelch response*/});
					//~ new AMT___core_factory().nextWindow();
				//~ }
				//~ break;
			
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
}

//Overwrite for runPreview (allows coreContent and core-allpages to know which is being told to skip
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
		
		ifr.contentWindow.postMessage({runPreview: true, isAllPagesScript: true}, '*');
		
		var ran = false;
		
		var interval =  setInterval(function(){
			var ifr = document.getElementsByTagName('iframe')[0];
			ifr.contentWindow.postMessage({runPreview: true}, '*');
			console.log('sedning runpreview');
		}
		,200);
		
		//count?

		
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

//If not mturk, and this is an iframe
//~ if  (
		//~ (loc.indexOf('https://www.mturk.com') != -1 ||
		//~ loc.indexOf('https://www.mturkcontent.com') != -1 ||
		//~ loc.indexOf('https://s3.amazonaws.com') != -1 ||
		//~ loc.indexOf('https://workersandbox.mturk.com') != -1 ) && window.top != window.self
	//~ )
//~ { 
	
	//~ //AMT___InitializeReturnAndAcceptKeyPress();
//~ }



