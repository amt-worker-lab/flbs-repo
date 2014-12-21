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
		MT___all_pages_zoom();
	
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
	if ( r.highlight_strings_in_page ) {
		new AMT___global_factory().highlight_strings_in_page(
			r.highlight_strings_in_page
		);
	}
	
	// email_links_remove_mailto
	// @param 
	if ( r.email_links_remove_mailto ) {
		new AMT___global_factory().email_links_remove_mailto(
		);
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
		new AMT___global_factory().email_links_click_to_parent({
			completion_key: r.email_links_click_to_parent.completion_key,
			messagePassingOptions: r
		});
	}
	
	// make_element_words_click
	// @param 
	if ( r.make_element_words_click ) {
		//~ new AMT___global_factory().make_element_words_click({
			//~ element: document.body
		//~ });
	}
	//~ new AMT___global_factory().make_element_words_click({
		//~ element: document.body
	//~ });
	
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
		
		console.log('Recieved onMessage request.');
		console.log(request);
		
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
 * @param options			object
 * @param "".completion_key	string
 * 
 * @return 
 */
AMT___global_factory.prototype.email_links_click_to_parent = function(options) {
	
	var options = options;
	var a = document.getElementsByTagName('a');
	for (var i in a) {
		if (i == 'length') break;
		if (/^ *mailto *:/i.exec(a[i].href)) {
			a[i].addEventListener('mouseup', function(e) {
				if(options.messagePassingOptions.hasOwnProperty('isUtilityTab')) {
					chrome.runtime.sendMessage(
						'gcfnekbbpmbgadddbojhlojhddnkcpje',
						{
							util_window_message_passing: true,
							data: {
								email_address: this.href.replace(/^ *mailto *:*\/*/i, '')
							}
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
	
	// ADD A DOUBLE CLICK TO RESET PAGE
	//
	//~ var all_elements_zoomed = [];
	//~ document.body.addEventListener('dblclick', function() {
		//~ for (var i in all_elements_zoomed) {
			//~ all_elements_zoomed[i].style.zoom = '';
		//~ }
	//~ }, false);
	//~ console.log(options_object);
	
	var s = options_object.strings;
	for (var i in s) {
		highlightWord(document.body, s[i].toLowerCase());
	}
	
	//~ http://stackoverflow.com/questions/10729983/highlight-word-in-html-text-but-not-markup
	//~ http://jsfiddle.net/crgTU/7/
	function highlightWord(root, word){
		textNodesUnder(root).forEach(highlightWords);

		function textNodesUnder(root){
			var walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false),
				text=[],
				node;
			while(node=walk.nextNode())
				text.push(node);
			return text;
		}

		function highlightWords(n){
			for (var i; (i=n.nodeValue.toLowerCase().indexOf(word,i)) > -1; n=after){
				var after = n.splitText(i+word.length);
				var highlighted = n.splitText(i);
				var span = document.createElement('span');
				span.setAttribute('style', 'background-color:yellow;color:black;zoom:1.2;');
				span.className = '_--_--_highlighted_--_--_';
				span.appendChild(highlighted);
				after.parentNode.insertBefore(span,after);
			}
		}
	}
}
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
						data: return_object
					},
					function(response) {
					}
				);
			}
		}
	}
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
