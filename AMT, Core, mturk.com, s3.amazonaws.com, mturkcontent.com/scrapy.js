
/**
 * function init__scrapy
 * 
 * @return	True=No "s" found. Continue to check for "s" matches.
 * 			False="s" match found. Stop checking for "s" matches.
 *			e.g. function a(){ return false}; console.log(a() == false) // true
 */
function init__scrapy() {
	/**
	 * scrapy
	 * // scrapy
	 * 
	 * Amazon Requester Inc.- EPS Marketing
	 * garrett grohman
	 * Rachel Scott
	 * CRE, Find this person's email address
	 * Yin Li
	 * SaaS, Find an alternative scholarship/financial aide contact for each university
	 * Larry Baker
	 * Nicolas Cazagou
	 * Andrew Scherer
	 * Justin Kline
	 * garrett grohman
	 * Steve Murch
	 * Brent Anderson
	 * Emily McHale (scrapy + startpage)
	 * Mark Carey
	 * Sean Gillispie
	 * Adam garson
	 * Viva Chu
	 * Olga Svensen
	 * 
	 * 
	 */
	//
	// Olga Svensen
	// Find email addresses of American Universities!
	// 3QPQKLUN3TJYBG6JVE9BRGPBAUTS6V
	s = '1. Go to the URL above, go to engineering or computer science department or equivalent.&nbsp;Use google translate if necessary.';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {margin-bottom:-10px !important; table-layout:fixed;word-wrap:break-word;width:100%;}'); // Fixed. Break-word.
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var sp = document.getElementsByTagName('span');
			var o = {
				sd_start_urls: [sp[2].innerText.trim()],
				sd_allowed_domains: null,
				q: [
					document.getElementById('Q2Url')
				],
				SKIP_SITES: {},
				//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:100px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 100 // offset top
			});
			
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				// Here?
				doSubmit();
			}

			// Get skips file
			new AMT___requests_factory().fs__load_skips({
				skips_key: 'austin_load_skips',
				callback: init,
				callback_err: function() {}
			});
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				// SP search.
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' contact'),
					callback_function: sp
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				
				if (!rs.length) {
					// No URLs
					// Init
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
					return;
				} else {
					/*([{
						url: rs[0][0]
					}]);*/
				}
				
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								skip_if_no_emails: true,
								accept_if_emails: true,
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									if (AMT__Global_Vars.isPreview) {
										//~ // If no email match results
										//~ if (!callback_obj.matches || !callback_obj.matches.length) {
											//~ AMT___Floater.skip();
										//~ }
										//~ else
										//~ {
											//~ AMT___Floater.accept();
										//~ }
										//~ // ENDS SCRIPT PROCESSING
										//~ return true;
									} else { // Add to tabs queue if not in preview
										console.log('addint to tabs q');
										addToTabsQ();
										document.body.style.backgroundColor = 'white';
										
										//~ // Let's try for some autos.
										//~ // o.auto_emails = []
										//~ /**
										 //~ * {
										 //~ *  email_contexts: Array[1]
										 //~ *  email_email: "info@vaultcrossfit.com"
										 //~ *  url: "https://www.facebook.com/VaultCrossfit/info
										 //~ * }
										 //~ */
										//~ if (callback_obj.matches && callback_obj.matches.length) {
											//~ var mt = callback_obj.matches;
											//~ console.log(mt);
											//~ var reg = new RegExp(
												//~ '^(info|contact|contactus|owner)@' + __js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												//~ 'i'
											//~ );
											//~ for (var i in mt) {
												//~ if  (
													//~ mt[i].email_email &&
													//~ mt[i].email_email.length &&
													//~ reg.exec(mt[i].email_email)
													//~ )
												//~ {
													//~ //alert('auto');
													//~ o.q[0].value = mt[i].email_email;
													//~ new AMT___core_factory().shiftFarLeft();
													//~ doSubmit();
													//~ return false; // Stop here
													//~ //showNextTab();
												//~ }
											//~ }
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/^(catering|reservations|events)@/i.exec(this.email) &&
										!/@(grubhub\.com|foodler\.com)$/i.exec(this.email) &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										doSubmit();
									}
								},
								//do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	//
	// Mark Carey
	// Find the Email Address for the Fashion/Beauty Brand
	// Startpage Find URL, then Scrapy
	s = '	<li>Email addresses labeled&nbsp;<strong>press</strong>&nbsp;are preferred, when available.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			document.body.style.backgroundColor = 'orange';
			
			var td = document.getElementsByTagName('td');
			
			var o = {
				comp: td[1].innerText.trim(),
				sd_start_urls: [],
				sd_allowed_domains: [],
				q: [
					document.getElementById('email')
				]
			}
			//~ o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:30px;left:0%;width:100%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;z-index:10;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:30px;left:0%;width:100%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;z-index:9;'
			);
			document.body.appendChild(d1b);
			var d2 = document.createElement('textarea');
			d2.setAttribute('style',
				'position:absolute;top:0px;height:30px;width:100%;'
			);
			document.body.appendChild(d2);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1b
				],
				offset: 30 // offset top
			});
			
			// create_dashboard_find_url
			AMT___items_factory.prototype.create_dashboard_find_url({
				bold_array: o.comp.clean_string_to_array(),
				searches:[
					o.comp,
					'"'+o.comp+'"',
					o.comp+' ("beauty" OR "fashion" OR "company")'
				],
				load_success_callback: function() {
					addToTabsQ(); // Add to tabs queue.
				},
				//~ out_element:,
				onclick_success: function(e) { //PROVIDES:// button.click // this.value, this.full_url
					// shownext
					showNextTab();
					
					// ...
					d1.style.zIndex = '8';
					d2.value = this.value;
					o.sd_start_urls = [this.value, this.full_url];
					o.sd_allowed_domains = [this.value.replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/i, "$2")]; //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
				},
				parent: d1,
				offsetTop: 0,
			});
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				//~ // Here?
				//~ new AMT___core_factory().nextTab();
				//~ doSubmit();
			}
			
			//~ function init_url() {
				//~ 
			//~ }	
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1b,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										document.body.style.backgroundColor = 'white';
										addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								//~ do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	//
	// Emily McHale (scrapy + startpage)
	// on_submit check that bad emails are not here
	// 37CCAM3CRMK5Y2OY7OB68QP9IHIDI9
	//~ s = '	<li><strong>Exclude:</strong> catering@, reservations@, and&nbsp;events@ emails and any&nbsp;emails ending in @grubhub.com,&nbsp;@foodler.com, or other online ordering platform emails.</li>';
	s = '	<li><strong>Exclude:</strong> catering@, reservations@, and&nbsp;events@ emails and any&nbsp;emails ending in @grubhub.com or&nbsp;@foodler.com.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-10px !important; table-layout:fixed;word-wrap:break-word;width:100%;}'); // Fixed. Break-word.
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[11].innerText.trim()],
				sd_allowed_domains: null,
				name: td[1].innerText.trim(),
				city: td[5].innerText.trim(),
				country: td[9].innerText.trim(),
				q: [
					document.getElementById('web_url')
				],
				SKIP_SITES: {},
				minimize_tds: {
					'Business name:':true,
					'Street:':true,
					'City:':true,
					'State:':true,
					'Country:':true,
					'URL:':true,
					'Google Search (paste in address bar):':true,
					'Internal ID - Disregard:':true
				}
				//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			console.log(o);
			
			// Remove first tds
			//~ var tr = document.getElementsByTagName('tr');
			for (var i=0; i<td.length -1; i++) {
				var key = td[i].innerText.trim();
				if (o.minimize_tds.hasOwnProperty( key )) {
					td[i].innerText = td[i].innerText.charAt(0); // remove text
					td[i].style.width = '20px'; // resize
				}
			}
			
			//Move the website TD up below the name TD
			var allTds = document.getElementsByTagName('td');
			var webTd = allTds[11];
			var streetTd = allTds[3];
			var tmpIh = webTd.innerHTML;
			console.log('tmpIh: ' + tmpIh);
			webTd.innerHTML = streetTd.innerHTML;
			streetTd.innerHTML = tmpIh;
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 0 // offset top
			});
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				//~ o.q[0].value = o.q[0].value.trim();
				//~ if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					//~ return false;
				//~ }
				//~ new AMT___core_factory().shiftFarLeft();
				//~ alert('here?');
				
				//~ // Here?
				//~ new AMT___core_factory().nextTab();
				//~ doSubmit();
			}

			// Get skips file
			new AMT___requests_factory().fs__load_skips({
				skips_key: 'austin_load_skips',
				callback: init,
				callback_err: function() {}
			});
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				
				// SP search.
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(o.name+', '+o.city+', '+o.country),
					callback_function: sp
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				console.log(response_obj.length);
				var rs = response_obj;
				console.log(rs);
				
				if (!rs.length) {
					// No URLs
					// Init
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
					return;
				} else {
					/*([{
						url: rs[0][0]
					}]);*/
				}
				
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var first = true;
				for (var i in rs) {
					var dm = rs[i][0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					//~ console.log(dm);continue;
					if (dm == 'facebook.com') {
						o.sd_start_urls.push(rs[i][0]); // Push URL
					}
					else if (first && !o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						o.sd_allowed_domains.push(dm);
					}
					first = false;
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								skip_if_no_emails: true,
								accept_if_emails: true,
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									if (AMT__Global_Vars.isPreview) {
										//~ // If no email match results
										//~ if (!callback_obj.matches || !callback_obj.matches.length) {
											//~ AMT___Floater.skip();
										//~ }
										//~ else
										//~ {
											//~ AMT___Floater.accept();
										//~ }
										//~ // ENDS SCRIPT PROCESSING
										//~ return true;
									} else { // Add to tabs queue if not in preview
										console.log('addint to tabs q');
										addToTabsQ();
										document.body.style.backgroundColor = 'white';
										
										//~ // Let's try for some autos.
										//~ // o.auto_emails = []
										//~ /**
										 //~ * {
										 //~ *  email_contexts: Array[1]
										 //~ *  email_email: "info@vaultcrossfit.com"
										 //~ *  url: "https://www.facebook.com/VaultCrossfit/info
										 //~ * }
										 //~ */
										//~ if (callback_obj.matches && callback_obj.matches.length) {
											//~ var mt = callback_obj.matches;
											//~ console.log(mt);
											//~ var reg = new RegExp(
												//~ '^(info|contact|contactus|owner)@' + __js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												//~ 'i'
											//~ );
											//~ for (var i in mt) {
												//~ if  (
													//~ mt[i].email_email &&
													//~ mt[i].email_email.length &&
													//~ reg.exec(mt[i].email_email)
													//~ )
												//~ {
													//~ //alert('auto');
													//~ o.q[0].value = mt[i].email_email;
													//~ new AMT___core_factory().shiftFarLeft();
													//~ doSubmit();
													//~ return false; // Stop here
													//~ //showNextTab();
												//~ }
											//~ }
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/^(catering|reservations|events)@/i.exec(this.email) &&
										!/@(grubhub\.com|foodler\.com)$/i.exec(this.email) &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										doSubmit();
										//~ showNextTab();
										
										//~ if (next_tab)
										//~ {
											//~ new AMT___core_factory().nextTab();
										//~ }
										//~ if (add_to_tabs_queue)
										//~ {
											//~ showNextTab();
										//~ }
										//~ 
										//~ if(AMT__Global_Vars.scriptVars['EmailJobs DS ShiftLeft'] != '0') {
											//~ new AMT___core_factory().shiftFarLeft();
										//~ }
										//~ doSubmit();
									}
								},
								//do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Brent Anderson
	// Find the contact email for business
	// 
	s = '<li>Enter the <strong>official&nbsp;email address </strong>for contacting this business</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:20% !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var a = document.getElementsByTagName('a');
			var o = {
				sd_start_urls: [a[0].innerText.trim()],
				sd_allowed_domains: [a[0].innerText.trim()],
				q: [
					document.getElementById('email'),
					document.getElementById('email2'),
					document.getElementById('email3'),
					document.getElementById('email4')
				]//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:20%;width:80%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 0 // offset top
			});
			
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
			}
			// Init
			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										//~ console.log('addint to tabs q');
										//~ addToTabsQ();
										document.body.style.backgroundColor = 'white';
										
										// THIS IS AUTOS.
										//~ // Let's try for some autos.
										//~ // o.auto_emails = []
										//~ /**
										 //~ * {
										 //~ *  email_contexts: Array[1]
										 //~ *  email_email: "info@vaultcrossfit.com"
										 //~ *  url: "https://www.facebook.com/VaultCrossfit/info
										 //~ * }
										 //~ */
										//~ if (callback_obj.matches && callback_obj.matches.length) {
											//~ var mt = callback_obj.matches;
											//~ console.log(mt);
											//~ var reg = new RegExp(
												//~ '^(info|contact|contactus|owner)@' + __js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												//~ 'i'
											//~ );
											//~ for (var i in mt) {
												//~ if  (
													//~ mt[i].email_email &&
													//~ mt[i].email_email.length &&
													//~ reg.exec(mt[i].email_email)
													//~ )
												//~ {
													//~ o.q[0].value = mt[i].email_email;
													//~ doSubmit();
													//~ return false; // Stop here
													//~ //showNextTab();
												//~ }
											//~ }
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								// What to do onclick
								// e.g.:
								//~ el_div.onclick = function() {
									//~ this.style.backgroundColor = 'LightGreen';
									//~ 
									//~ this.input_send_success.value = this.email;
									//~ if (this.email.length > 6 && this.email.indexOf('@') != -1 && this.input_send_success && this.input_send_success.value == this.email) {
										//~ 
										//~ this.do_submit_callback(this.do_submit_next_tab, this.do_submit_add_to_tabs_queue);
										//~ //doSubmit();
									//~ 
									//~ }
								//~ }
								input_onclick_callback: function(e) {
									this.style.backgroundColor = 'LightGreen';
									for (var i in o.q) { // Check in current fields
										if (o.q[i].value.toLowerCase() == this.email.toLowerCase()) {
											return false; // Stop here! This email alread in fields.
										}
									}
									for (var i in o.q) { // Loop to set
										if (o.q[i].value == '') {
											o.q[i].value = this.email;
											break;
										}
									}
									var found = false;
									for (var i in o.q) { // Check all filled
										if (o.q[i].value == '') {
											found = true;
										}
									}
									if (!found) {
										if (o.q[0].value != '' && o.q[0].value.length > 6 && o.q[0].value.indexOf('@') != -1) {
											// Make sure not checked
											document.getElementById('no-address').checked = false;
											document.getElementById('no-address-reason').value = '';
											doSubmit();
										}
									} else {
										o.q[0].focus(); // Manual
									}
								},
								//do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Sean Gillispie
	// Given a URL, enter the email address for a contact at California human services providers
	// 
	s = 'Please find an email address for a&nbsp;contact at this California services provider located on the provided website (e.g. in the "Contact Us" section)';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			console.log('running sean gillispie');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:20% !important;}');//width:40% !important;
			GM_addStyle('#submitButton {margin:0 !important;padding:0 !important;width:20% !important;left:0%; top:250px;position:absolute;height:250px;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var a = document.getElementsByTagName('a');
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[3].innerText.trim()],
				sd_allowed_domains: [td[3].innerText.trim()],
				q: [
					document.getElementById('email')
				]//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/(https?:\/\/|)(www\.|)([^\/]+)\/*[\d\D]*$/i, "$3").toLowerCase(); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			o.sd_start_urls = ['http://' + o.sd_start_urls[0].toLowerCase()];
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:20%;width:80%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 0 // offset top
			});
			
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				console.log('sb');
				e.stopPropagation();
				e.preventDefault();

				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
			}
			// Init
			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										//~ console.log('addint to tabs q');
										//~ addToTabsQ();
										document.body.style.backgroundColor = 'white';
										
										// THIS IS AUTOS.
										//~ // Let's try for some autos.
										//~ // o.auto_emails = []
										//~ /**
										 //~ * {
										 //~ *  email_contexts: Array[1]
										 //~ *  email_email: "info@vaultcrossfit.com"
										 //~ *  url: "https://www.facebook.com/VaultCrossfit/info
										 //~ * }
										 //~ */
										//~ if (callback_obj.matches && callback_obj.matches.length) {
											//~ var mt = callback_obj.matches;
											//~ console.log(mt);
											//~ var reg = new RegExp(
												//~ '^(info|contact|contactus|owner)@' + __js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												//~ 'i'
											//~ );
											//~ for (var i in mt) {
												//~ if  (
													//~ mt[i].email_email &&
													//~ mt[i].email_email.length &&
													//~ reg.exec(mt[i].email_email)
													//~ )
												//~ {
													//~ o.q[0].value = mt[i].email_email;
													//~ doSubmit();
													//~ return false; // Stop here
													//~ //showNextTab();
												//~ }
											//~ }
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								// What to do onclick
								// e.g.:
								//~ el_div.onclick = function() {
									//~ this.style.backgroundColor = 'LightGreen';
									//~ 
									//~ this.input_send_success.value = this.email;
									//~ if (this.email.length > 6 && this.email.indexOf('@') != -1 && this.input_send_success && this.input_send_success.value == this.email) {
										//~ 
										//~ this.do_submit_callback(this.do_submit_next_tab, this.do_submit_add_to_tabs_queue);
										//~ //doSubmit();
									//~ 
									//~ }
								//~ }
								//~ input_onclick_callback: function(e) {
									//~ this.style.backgroundColor = 'LightGreen';
									//~ doSubmit();
								//~ },
								//do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	//
	// Adam garson
	// Visit a website and copy/paste the contact email address
	s = '1. Visit the website below. &nbsp;2. Search the website for an email contact. &nbsp;3. Copy and paste email address below.</p>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			console.log('adam garson running');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			var p = document.getElementsByTagName('p');
			var a = document.getElementsByTagName('a');
			
			
			var o = {
				sd_start_urls: [a[0].innerText.trim()],
				sd_allowed_domains: [p[1].innerText.trim()],
				q: [
					document.getElementById('email')
				]
			}
			o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:200px;left:0%;width:100%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 100 // offset top
			});
			
			// return button function!
			var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				
				//~ // Here?
				//~ new AMT___core_factory().nextTab();
				//~ doSubmit();
			}

			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								//~ do_submit_next_tab: true
								do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Steve Murch
	// Find the contact email if it exists, or contact url for this blog
	// 3VKZWROWWHDRYOHCACV5A8TXOY08G2
	s = '	<li>Otherwise, enter the website address for the <strong>Contact Us&nbsp;form</strong>.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			var p = document.getElementsByTagName('p');
			var a = document.getElementsByTagName('a');
			
			
			var o = {
				sd_start_urls: [a[0].innerText.trim()],
				sd_allowed_domains: [p[1].innerText.trim()],
				q: [
					document.getElementById('email')
				]
			}
			o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:200px;left:0%;width:100%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 100 // offset top
			});
			
			// return button function!
			var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				
				//~ // Here?
				//~ new AMT___core_factory().nextTab();
				//~ doSubmit();
			}

			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								//~ do_submit_next_tab: true
								do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	//
	// Viva Chu
	// NEW HIT -- Find the Email Address for the Business/Person on This Website
	// 
	s = '<li class="li1"><span class="s2">If the website has a contact form but no email address, please enter the text: Form@powhow.com &nbsp;---&nbsp;Do NOT enter the URL to the contact form.</span></li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:20% !important;}');//width:40% !important;
			//~ GM_addStyle('#web_url {width:20%;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			
			var td = document.getElementsByTagName('td');
			var o = {
				url: td[1].innerText.trim(),
				sd_start_urls: [],
				sd_allowed_domains: [],
				q: [
					document.getElementById('web_url')
				]
			}
			o.sd_start_urls.push(o.url);
			o.sd_allowed_domains.push(o.url.replace(/^https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/i, "$2"));
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:20%;width:80%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 0 // offset top
			});
			
			// return button function!
			var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				
				//~ // Here?
				//~ new AMT___core_factory().nextTab();
				//~ doSubmit();
			}

			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else if(AMT__Global_Vars.scriptVars['DS ShowNextTab'] != '0') {
										addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								//~ do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	//
	// garrett grohman
	// Find Email Address for Breweries
	//
	s = '<li>Enter the valid email address for the official contact of the brewery.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			var td = document.getElementsByTagName('td');
			
			
			var o = {
				sd_start_urls: [td[9].innerText.trim()],
				sd_allowed_domains: [td[9].innerText.trim()],
				q: [
					document.getElementById('web_url')
				]
			}
			o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");//.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			console.log(o);
			
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:200px;left:0%;width:100%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 100 // offset top
			});
			
			// return button function!
			var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				
				// Here?
				new AMT___core_factory().nextTab();
				doSubmit();
			}

			scrapy(o.sd_start_urls, o.sd_allowed_domains);
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								do_submit_next_tab: true
								//do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	//
	// garrett grohman (372BFDRISCA6E6WX8JDCP7YD8F6C1F)
	// Find Email Address for Crowdfunding Projects
	//
	s = '<p>Find the email address for the campaign owner of this campaing.</p>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {margin-bottom:-20px !important;}'); // make more space
			
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');//width:40% !important;
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.8;}');
			
			var td = document.getElementsByTagName('td');
			
			// ks e.g. http://kickstarter.com/projects/673522836/timbre-redefining-the-desktop-speaker/
			var o = {
				ks: td[1].innerText.trim(), // kickstarter
				sd_start_urls: [],
				sd_allowed_domains: [],
				q: [
					document.getElementById('web_url')
				]
			}
			if (!/\/$/.exec(o.ks)) {
				alert('/');
			}
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:100px;left:0%;width:50%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:100px;left:50%;width:49%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1b);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1,d1b
				],
				offset: 100 // offset top
			});
			
			// return button function!
			var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			// ...
			document.getElementById('submitButton').onclick = function() {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					return false;
				}
				
				// Here?
				new AMT___core_factory().nextTab();
				doSubmit();
			}
			
			// If preview setInterval reload, 3min.
			if (AMT__Global_Vars.isPreview) {
				setInterval(function() {
					location.reload();
				}, 180000);
			}
			
			
			// scrape ks
			//https://www.kickstarter.com/projects/runningfarmlabs/timbre-redefining-the-desktop-speaker/creator_bio.js
			GM_xmlhttpRequest({
				method: 'GET',
				url: MT___host + '/mturk/util.php?AMT__output_html_from_URL=' + encodeURIComponent(o.ks + 'creator_bio.js'),
				onload: function (response) {
					var rs = response.responseText;
					
					if (response.status != 200 || (rs*1>300 && rs*1<600)) return;
					
					/*<ul class="websites list-simple h5 bold">
<li>
<a href="http://www.runningfarmlabs.com">http://runningfarmlabs.com
</a></li>
<li>
<a href="https://www.facebook.com/bgardineer">http://facebook.com
</a></li>
</ul>*/
					
					var reg = /<ul class="websites list-simple h5 bold">((.|\s)*?(?=<\/ul>|$)|$)/.exec(rs);
					if (!reg) { // skip
						document.body.style.backgroundColor = 'red';
						AMT___Floater.skip();
						return;
					}
					// Here?
					var content = reg[1];
					var reg = /<a href="([^"]+)">/g;
					var m;
					var x;
					var tmpsites = '';
					while (m = reg.exec(content)) {
						x = __js_clean_html_str(m[1]);
						tmpsites += x; // show in d1b
						o.sd_start_urls.push(x);
						x = x.replace(/^https?:\/\/(www[w\d]*\.|)/i, '').replace(/\/[\d\D]*$/, ''); // to domain
						if (!/(facebook|fb|google|gmail|linkedin|myspace|twitter|youtube|yt|amazon|instagram|github|angel|kickingitforward|vimeo)\./i.exec(x)) {
							o.sd_allowed_domains.push(x);
							tmpsites += '('+x+')\n'; // show in d1b
						} else
							tmpsites += '(X:'+x+')\n'; // show in d1b
					}
					tmpsites = tmpsites.div({style:'border-bottom:1px solid black'});
					
					// Name
					// e.g. "Code Laboratories"
					var reg = /<h1 class="h2 normal mb1">[\r\n\t\s]+<a[^>]*>[\r\n\t\s]+([^<]+)<\/a>[\r\n\t\s]+<\/h1>/.exec(rs);
					var tmpname;
					if (reg) {
						tmpname = __js_clean_html_str(reg[1]).trim();
						//~ d1c.innerText = reg;
						tmpname = tmpname.div({style:'border-bottom:1px solid black'});
					}
					// Desc
					var reg = /<div class="readability">((.|\s)*?(?=<\/div>|$)|$)/.exec(rs);
					var tmpdesc;
					if (reg) {
						tmpdesc = __js_clean_html_str(reg[1].replace(/<[^>]*>/g, '')).trim();
						tmpdesc = tmpdesc.div({style:'border-bottom:1px solid black'});
					}
					// Fill d1b
					d1b.appendChild(tmpname);
					d1b.appendChild(tmpdesc);
					d1b.appendChild(tmpsites);
					
					console.log('regging');
					if (o.sd_start_urls.length < 1) { // skip
						document.body.style.backgroundColor = 'silver';
						AMT___Floater.skip();
						return;
					}
					// Init scrapy
					console.log(o);
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
				}
			});
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[0],
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									} else { // Add to tabs queue if not in preview
										//addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								//~ do_submit_callback: function() {
									//~ 
									//~ // NOTE: DEC1 2014
									//~ // THIS NEEDS TO BE TESTED FIRST!!
									//~ //document.getElementById('submitButton').click();
								//~ },
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Justin Kline
	// Find the Emails Addresses Associated with the Website Below
	//
	s = '	<li>If the website is not a domain, then just search google and go to the site that way and add it to the field below</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.highlight-box {position:absolute;top:1000px;}');
			
			//~ GM_addStyle('.container {position:absolute;top:0px;left:0;margin:0 !important;padding:0 !important;}');
			//~ GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {zoom:0.8;}');
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style','position:absolute;top:220px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1);
			var d2 = document.createElement('div');
			d2.setAttribute('style','position:absolute;top:120px;left:0%;width:98%;height:100px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d2);
			/* END ITEMS */
			
			var b = document.getElementsByTagName('b');
			
			var o = {
				site: null,
				domain: b[0].innerText.trim(),
				sd_start_urls: [],
				sd_allowed_domains: []
			}
			if (o.domain == '' && AMT__Global_Vars.isPreview) {	// Not accepted. No site/domain.
				AMT___Floater.skip();
				return;
			} else if (!AMT__Global_Vars.isPreview) {			// Accepted
				// add
				//~ addToTabsQ();
			}
			if (/^https?:/i.exec(o.domain)) {
				o.site = o.domain;
				o.domain = o.domain.replace(/^https?:\/\/(www\.|)/i, '').replace(/\/[\d\D]*/g, '');
			} else {
				o.site = 'http://' + o.domain;
			}
			o.sd_start_urls.push(o.site);
			o.sd_allowed_domains.push(o.domain);
			
			
			// Yahoo/SP top 3 for start
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({
				startPage: true,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team OR webmaster OR owner OR email'),
				callback_function: startpage
			});
			console.log(o);
			
			// ...
			document.getElementById('Q1Url').value = 'EXISTS';
			// ...
			document.getElementById('submitButton').onclick = function() {
				
				var q = [
					document.getElementById('Q1Email'),
					document.getElementById('Q1Url')
				];
				q[0].value = q[0].value.trim();
				q[1].value = q[1].value.trim();
				if (q[0].value == '' || q[1].value == '') {
					return false;
				} else {
					console.log('x');
				}
				
				// Here?
				new AMT___core_factory().nextTab();
				doSubmit();
			}
			
			//~ if (o.domain != '' ) {
				//~ 
			//~ } else {
				//~ scrapy(o.sd_start_urls, o.sd_allowed_domains);
			//~ }
			
			//~ if (o.domain != '' && o.domain.indexOf('mturkcontent.com') == -1) {
				//~ if (/^http/i.exec(o.domain)) { // Push start url
					//~ o.sd_start_urls.push(o.domain); // 
				//~ } else {
					//~ o.sd_start_urls.push('http://' + o.domain); // 
				//~ }
				//~ o.domain = o.domain.replace(/^https?:\/\/(www\.|)/i, '');
				//o.domain = o.domain.replace(/\/[\d\D]*/i, '');
				//~ o.sd_allowed_domains.push(o.domain);
				//~ 
				//~ // Yahoo/SP top 3 for start
				//~ var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					//~ startPage: true,
					//~ url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team'),
					//~ callback_function: Nicolas_Cazagou_FB_emails__startpage
				//~ });
			//~ } else {
				//~ // Go straight to scrapy
				//o.sd_start_urls.push('http://localhost'); //?
				//~ 
				//~ // start URLs, allowed domains
				//~ Nicolas_Cazagou_FB_emails__scrapy(o.sd_start_urls, o.sd_allowed_domains);
			//~ }
			
			
			// return button function!
			//~ var cf = new AMT___core_factory()
			//~ new AMT___core_factory()
				//~ .iframe2parent__postMessage( // options  , XXXXX >callback_function
					//~ {
						//~ action: 'return_button__showNextTab'
					//~ }
				//~ );
			
			/**
			 * function startpage
			 */
			function startpage(response_obj) {
				
				console.log(response_obj.length);
				var rs = response_obj;
				console.log(rs);
				
				if (!rs.length) {
					// No URLs
					//~ document.body.innerText = '0';
					//~ return;
				} else {
					/*([{
						url: rs[0][0]
					}]);*/
				}
				
				// MANY WINDOWS
				var uw = [];
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					
					// Add to d2
					var dv = document.createElement('div');
					dv.setAttribute('style', 'border-bottom:1px solid teal;cursor:pointer;');
					dv.innerHTML = rs[i][0] + '<br>' + rs[i][1].substr(0,40);
					dv.url = rs[i][0]
					dv.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						document.getElementById('Q1Url').value = this.url;
						document.getElementById('Q1Email').value = 'NOT FOUND';
						if(this.url.length > 10)
							doSubmit();
					}
					d2.appendChild(dv);
					// Utility window?
					//AMT__setUtilityTabs(utilityTabs, globalTabOptions, utilityPanelOptions)
					uw.push({
						url: rs[i][0]
					});
					
					console.log(i);
					if (i >= 2) break; 
				}
				console.log(uw);
				AMT__setUtilityTabs(uw);
				
				
				
				// Push 
				//~ o.sd_start_urls.push();
				
				// start URLs, allowed domains
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: document.getElementById('Q1Email'),
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								do_submit_callback: function() {
									
									// NOTE: DEC1 2014
									// THIS NEEDS TO BE TESTED FIRST!!
									//document.getElementById('submitButton').click();
								},
								//~ // What to do onclick
								//~ input_onclick_callback: function() {
									//~ document.getElementById('Q1Email').value = 
									//~ document.getElementById('submitButton').click();
								//~ },
								do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Andrew Scherer
	// Find the e-mail of the webmaster.
	//
	s = '	<li>Find the e-mail or the contact page URL. whois.domaintools.com may reveal the webmaster e-mail but please use this as a last resort because it is often outdated.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.container {position:absolute;top:0px;left:0;margin:0 !important;padding:0 !important;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('table {zoom:0.8;}');
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style','position:absolute;top:180px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1);
			var d2 = document.createElement('div');
			d2.setAttribute('style','position:absolute;top:80px;left:0%;width:98%;height:100px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d2);
			/* END ITEMS */
			
			var a = /<p>Go to ([^<]+)<\/p>/.exec(ih)[1];
			a = __js_clean_html_str(a);
			
			var o = {
				site: a,
				domain: null,
				sd_start_urls: [a],
				sd_allowed_domains: []
			}
			if (o.site == '' && AMT__Global_Vars.isPreview) {	// Not accepted. No site/domain.
				AMT___Floater.skip();
				return;
			} else if (!AMT__Global_Vars.isPreview) {			// Accepted
				// add
				addToTabsQ();
			}
			o.domain = o.site.replace(/^https?:\/\/(www\.|)/i, '').replace(/\/[\d\D]*$/, '');
			o.sd_allowed_domains.push( o.domain );
			
			
			// Yahoo/SP top 3 for start
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({
				startPage: true,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team OR webmaster'),
				callback_function: startpage
			});
			
			//~ if (o.domain != '' ) {
				//~ 
			//~ } else {
				//~ scrapy(o.sd_start_urls, o.sd_allowed_domains);
			//~ }
			
			//~ if (o.domain != '' && o.domain.indexOf('mturkcontent.com') == -1) {
				//~ if (/^http/i.exec(o.domain)) { // Push start url
					//~ o.sd_start_urls.push(o.domain); // 
				//~ } else {
					//~ o.sd_start_urls.push('http://' + o.domain); // 
				//~ }
				//~ o.domain = o.domain.replace(/^https?:\/\/(www\.|)/i, '');
				//o.domain = o.domain.replace(/\/[\d\D]*/i, '');
				//~ o.sd_allowed_domains.push(o.domain);
				//~ 
				//~ // Yahoo/SP top 3 for start
				//~ var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					//~ startPage: true,
					//~ url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team'),
					//~ callback_function: Nicolas_Cazagou_FB_emails__startpage
				//~ });
			//~ } else {
				//~ // Go straight to scrapy
				//o.sd_start_urls.push('http://localhost'); //?
				//~ 
				//~ // start URLs, allowed domains
				//~ Nicolas_Cazagou_FB_emails__scrapy(o.sd_start_urls, o.sd_allowed_domains);
			//~ }
			
			//
			console.log(o);
			//
			//Fan Page website:	http://www.chaikenclothing.com http://www.twitter.com/chaikenclothing
			
			
			// return button function!
			//~ var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			function startpage(response_obj) {
				console.log(response_obj.length);
				var rs = response_obj;
				console.log(rs);
				
				if (!rs.length) {
					// No URLs
					//~ document.body.innerText = '0';
					//~ return;
				}
				
				var uw = [];
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					
					// Add to d2
					var dv = document.createElement('div');
					dv.setAttribute('style', 'border-bottom:1px solid teal;cursor:pointer;');
					dv.innerHTML = rs[i][0] + '<br>' + rs[i][1].substr(0,40);
					dv.url = rs[i][0]
					dv.onclick = function() {
						this.style.backgroundColor = 'yellow';
						document.getElementById('web_url').value = this.url;
						if(this.url.length > 10)
							doSubmit();
					}
					d2.appendChild(dv);
					// Utility window?
					//AMT__setUtilityTabs(utilityTabs, globalTabOptions, utilityPanelOptions)
					uw.push({
						url: rs[i][0]
					});
					//~ if (i == 0) {
						//~ 
					//~ }
					
					console.log(i);
					if (i >= 2) break; 
				}
				
				AMT__setUtilityTabs(uw);
				
				// Push 
				//~ o.sd_start_urls.push();
				
				// start URLs, allowed domains
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			function scrapy(start_urls, allowed_domains) {
				//~ console.log(start_urls);
				//~ console.log(allowed_domains);
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: document.getElementById('web_url'),
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									
									
									if (AMT__Global_Vars.isPreview) {
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											AMT___Floater.skip();
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								do_submit_next_tab: true
								//~ do_submit_add_to_tabs_queue: true
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Nicolas Cazagou
	// Find the email contact of Facebook Page owners/managers
	//
	s = '	<li>if the fan page doesn\'t display on facebook, check that your profile is configured on the same country as the fan page.</li>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.container {position:absolute;top:0px;left:0;margin:0 !important;padding:0 !important;}');
		GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:180px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		/* END ITEMS */
		
		var a = document.getElementsByTagName('a');
		
		var o = {
			site: a[0].href.trim(),			// This is FB page
			domain: a[1].innerText.trim(),	// This is website(s)
			sd_start_urls: [],
			sd_allowed_domains: ['facebook.com']
		}
		if (o.site == '' && AMT__Global_Vars.isPreview) {	// Not accepted. No site/domain.
			AMT___Floater.skip();
			return;
		} else if (!AMT__Global_Vars.isPreview) {			// Accepted
			// add
			addToTabsQ();
		}
		
		// FB 
		// https://www.facebook.com/AnnaHansenLoveFood?sk=info&tab=page_info
		o.sd_start_urls.push(o.site);
		o.sd_start_urls.push(o.site + '?sk=info&tab=page_info');
		o.sd_start_urls.push(o.site + '/info');
		
		// Somtimes domain has two sites
		// parseURL
		if (o.domain.indexOf(' ') != -1) {
			var x = o.domain.split(' ');
			for (var i in x) {
				if (/^http/i.exec(x[i])) {
					o.sd_start_urls.push(x[i]);
				} else {
					o.sd_start_urls.push('http://' + x[i]);
				}
				var h = x[i].parseURL().host;
				o.sd_allowed_domains.push(h);
			}
			o.domain = '';
		}// else if (o.domain.indexOf('%20') != -1) {
			//~ var x = o.domain.split('%20');
			//~ for (var i in x) {
				//~ o.sd_start_urls.push(x[i]);
				//~ var h = x[i].parseURL().host;
				//~ o.sd_allowed_domains.push(h);
			//~ }
			//~ o.domain = '';
		//~ }
		if (o.domain != '' && o.domain.indexOf('mturkcontent.com') == -1) {
			if (/^http/i.exec(o.domain)) { // Push start url
				o.sd_start_urls.push(o.domain); // 
			} else {
				o.sd_start_urls.push('http://' + o.domain); // 
			}
			o.domain = o.domain.replace(/^https?:\/\/(www\.|)/i, '');
			//~ o.domain = o.domain.replace(/\/[\d\D]*/i, '');
			o.sd_allowed_domains.push(o.domain);
			
			// Yahoo/SP top 3 for start
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({
				startPage: true,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team'),
				callback_function: Nicolas_Cazagou_FB_emails__startpage
			});
		} else {
			// Go straight to scrapy
			//~ o.sd_start_urls.push('http://localhost'); //?
			
			// start URLs, allowed domains
			Nicolas_Cazagou_FB_emails__scrapy(o.sd_start_urls, o.sd_allowed_domains);
		}
		
		//
		console.log(o);
		//
		//Fan Page website:	http://www.chaikenclothing.com http://www.twitter.com/chaikenclothing
		
		
		// return button function!
		//~ var cf = new AMT___core_factory()
		new AMT___core_factory()
			.iframe2parent__postMessage( // options  , XXXXX >callback_function
				{
					action: 'return_button__showNextTab'
				}
			);
		
		function Nicolas_Cazagou_FB_emails__startpage(response_obj) {
			console.log(response_obj.length);
			var rs = response_obj;
			
			if (!rs.length) {
				// No URLs
				//~ document.body.innerText = '0';
				//~ return;
			}
			
			for (var i in rs) {
				o.sd_start_urls.push(rs[i][0]);
				if (i >= 3) break; 
			}
			
			// Push 
			//~ o.sd_start_urls.push();
			
			// start URLs, allowed domains
			Nicolas_Cazagou_FB_emails__scrapy(o.sd_start_urls, o.sd_allowed_domains);
		}
		
		function Nicolas_Cazagou_FB_emails__scrapy(start_urls, allowed_domains) {
			//~ console.log(start_urls);
			//~ console.log(allowed_domains);
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 40,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							// add PREVIEW all snippets
							div: d1,
							input_send_success: document.getElementsByName('contact_email')[0],
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								
								
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							},
							//~ do_submit_next_tab: true
							do_submit_add_to_tabs_queue: true
						}
					);
				}
			);
		}
	}
	
	//
	// Larry Baker
	// Find the email address for businesses
	// https://www.mturk.com/mturk/preview?groupId=31KHN7KCND0VO2EKPJDRLAHTM88A0U
	s = '<li>Do not provide any emails that start with "press"@example.com", "marketing"@example.com, or "sales"@example.com"</li>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.section {position:absolute;top:0px;left:0;}');
		GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		// container
		GM_addStyle('.container {margin:0 !important;padding:0 !important;position:absolute;}');
		
		var choices = [
			'Food product',
			'Beverage product',
			'Health & Beauty product',
			'Cleaning product',
			'Other'
		];
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:40px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		var d1b = document.createElement('div');
		d1b.setAttribute('style','position:absolute;top:600px;left:0%;width:98%;height:200px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1b);
		var d1c = document.createElement('div');
		d1c.setAttribute('style','position:absolute;top:0px;left:0%;width:98%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1c);
		//
		var d2 = document.createElement('iframe');
		d2.setAttribute('style','position:absolute;top:790px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;sandbox:allow-scripts allow-same-origin;visibility:hidden;');
		document.body.appendChild(d2);
		// mouseover / out
		d2.addEventListener('mouseout', function() {
			this.scrollIntoView();
		}, false);
		d2.addEventListener('mouseover', function() {
			this.scrollIntoView();
		}, false);
		// Flicker
		d2.addEventListener('load', function() {
			this.style.visibility = 'visible';
			// Tell child to zoom out & extend
			var ifr_intv = setInterval(function() {
				d2.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
			}, 1000);
		}, false);
		// 
		//~ var d3 = document.createElement('input');
		//~ d3.setAttribute('style','position:absolute;top:0px;left:60%;width:38%;height:160px;');
		//~ d3.value = 'N/A';
		//~ d3.type = 'button';
		//~ document.body.appendChild(d3);
		//~ d3.onclick = function() {
			//~ this.style.backgroundColor = 'LightGreen';
			//~ document.getElementById('email').value = 'N/A';
			//~ new AMT___core_factory().nextTab();
			//~ doSubmit();
		//~ }
		// d1b buttons
		for (var i in choices) {
			var dx = document.createElement('input');
			dx.setAttribute('style','');
			dx.value = choices[i];
			dx.choice = choices[i];
			dx.type = 'button';
			d1b.appendChild(dx);
			dx.onclick = function() {
				this.style.backgroundColor = 'LightGreen';
				var q = document.getElementsByName('Email');
				q[1].value = this.choice;
				q[0].value = q[0].value.trim();
				
				if (q[0].value != 'example@email.com' && q[0].value.length > 6 && q[0].value.indexOf('@') != -1) {
					new AMT___core_factory().nextTab();
					doSubmit();
				}
			}
			d1b.appendChild(document.createElement('br'));
		}
		/* END ITEMS */
		
		var td = document.getElementsByTagName('td');
		
		var o = {
			name: td[1].innerText.trim(),
			site: td[3].innerText.trim(),
			domain: null,
			sd_start_urls: [],
			sd_allowed_domains: []
		}
		o.domain = o.site.replace(/^(https?:\/\/|)(www\.|)/i, '');
		o.sd_allowed_domains.push(o.domain);
		
		d1c.innerText = o.name + '\n' + o.domain;
		
		console.log(o);
		// innerHeight
		//~ new AMT___core_factory().el_innerHeight({
			//~ // This set the elements d1,d1b, and d1c
			//~ // to fill up the whole window, minus their
			//~ // distance from page top (top:XX pixels;).
			//~ elements: [
				//~ d1
			//~ ],
			//~ offset: 0 // offset top
		//~ });
		// innerHeight
		new AMT___core_factory().el_innerHeight({
			// Returns innerHeight in pixels
			callback_function: function(innerHeight) {
				
				console.log(innerHeight);
				
				d1.style.height = (innerHeight - 180) + 'px'; // 20 = info box
				
				//~ innerHeight -= 70; // This is offset of d1 from top.
				
				d2.style.height = (innerHeight - 280) + 'px';
				d2.style.top = (innerHeight - 140) + 'px';
				
				d1b.style.top = (innerHeight + (innerHeight - 420)) + 'px';
				d1b.style.height = '120px';
				
				document.getElementsByClassName('container')[0].style.top = (innerHeight + (innerHeight - 300)) + 'px';
				
				
				//~ var h1, h2;
				//~ h1 = .6 * innerHeight;
				//~ h2 = .4 * innerHeight;
				//~ 
				//~ d1.style.height = d1b.style.height = d1c.style.height = h1 + 'px';	// height
				//~ dx1.style.height = dx2.style.height = h2 + 'px';					// height
				//~ dx1.style.top = dx2.style.top = (h1+70) + 'px';						// top
			}
		});
		
		// Yahoo/SP top 3 for start
		var req_proxy = new AMT___xhr_PROXY_REDACTED_({
			startPage: true,
			url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team OR "facebook.com"'),
			callback_function: Larry_Baker_web_contact_email__startpage
		});
		
		function Larry_Baker_web_contact_email__startpage(response_obj) {
			console.log(response_obj.length);
			var rs = response_obj;
			
			if (!rs.length) {
				// No URLs
			}
			
			for (var i in rs) {
				o.sd_start_urls.push(rs[i][0]);
				if (i >= 3) break; 
			}
			
			// start URLs, allowed domains
			Larry_Baker_web_contact_email__scrapy(o.sd_start_urls, o.sd_allowed_domains);
		}
		
		function Larry_Baker_web_contact_email__scrapy(start_urls, allowed_domains) {
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 10,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							// add PREVIEW all snippets
							div: d1,
							input_send_success: document.getElementById('web_url'),
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								
								
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								
								// Load iframe
								if (callback_obj.matches && callback_obj.matches.length) {
									d2.src = o.site;
									console.log(d2);
									console.log(d2.src);
								}
								
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							},
							do_submit_callback: function() {
								d2.scrollIntoView();
							}
							
							//~ input_onclick_callback: function() {// OVERRIDE SUBMIT
								//~ this.style.backgroundColor = 'LightGreen';
								//~ this.input_send_success.value = this.email;
								//~ if (this.email.length > 6 && this.email.indexOf('@') != -1 && this.input_send_success && this.input_send_success.value == this.email) {
									//~ this.do_submit_callback();
								//~ }
								//~ 
								//~ //this.style.border = '8px solid LightGreen';
							//~ }
						}
					);
				}
			);
		}
	}
	
	//
	// Larry Baker
	// Find the email address for businesses
	//
	s = '<li>Do not provide any of the following emails:&nbsp;press"@example.com", "marketing"@example.com, "support"@example.com, "wholesale"@example.com, or "sales"@example.com"</li>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.section {position:absolute;top:0px;left:0;}');
		GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:160px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		/* END ITEMS */
		
		var td = document.getElementsByTagName('td');
		
		var o = {
			site: td[3].innerText.trim(),
			domain: null,
			sd_start_urls: [],
			sd_allowed_domains: []
		}
		if (o.site == '' && AMT__Global_Vars.isPreview) {	// Not accepted. No site/domain.
			AMT___Floater.skip();
			return;
		} else if (!AMT__Global_Vars.isPreview) {			// Accepted
			// add
			addToTabsQ();
		}
		o.domain = o.site.replace(/^https?:\/\/(www\.|)/i, '');
		o.domain = o.domain.replace(/\/[\d\D]*/i, '');
		o.sd_allowed_domains.push(o.domain);
		
		// Yahoo/SP top 3 for start
		var req_proxy = new AMT___xhr_PROXY_REDACTED_({
			startPage: true,
			//~ seed_arg1: o.input1,
			url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' contact OR about OR team'),
			callback_function: Larry_Baker_emails_no_iframe__startpage
		});
		
		function Larry_Baker_emails_no_iframe__startpage(response_obj) {
			console.log(response_obj.length);
			var rs = response_obj;
			
			if (!rs.length) {
				// No URLs
				//~ document.body.innerText = '0';
				//~ return;
			}
			
			for (var i in rs) {
				o.sd_start_urls.push(rs[i][0]);
				if (i >= 3) break; 
			}
			
			// start URLs, allowed domains
			Larry_Baker_emails_no_iframe__scrapy(o.sd_start_urls, o.sd_allowed_domains);
		}
		
		function Larry_Baker_emails_no_iframe__scrapy(start_urls, allowed_domains) {
			//~ console.log(start_urls);
			//~ console.log(allowed_domains);
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 40,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							// add PREVIEW all snippets
							div: d1,
							input_send_success: document.getElementById('web_url'),
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								
								
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							},
							//~ do_submit_next_tab: true
							do_submit_add_to_tabs_queue: true
						}
					);
				}
			);
		}
	}
	
	//
	// SaaS
	// Find an alternative scholarship/financial aide contact for each university
	//
	s = 'Given the school and email address, find an alternative email address for the scholarships OR financial aid section of the site. "External scholarships" page contact is best.';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.section {position:absolute;top:0px;left:0;}');
		GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:160px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		/* END ITEMS */
		
		var td = document.getElementsByTagName('td');
		
		var o = {
			site: td[3].innerText.trim(),
			domain: null,
			sd_start_urls: [],
			sd_allowed_domains: []
		}
		o.domain = o.site.replace(/^https?:\/\/(www\.|)/i, '');
		o.sd_allowed_domains.push(o.domain);
		
		//~ console.log(url);
		//~ console.log(domain);
		//~ console.log(domain2);
		
		// Yahoo/SP top 3 for start
		var req_proxy = new AMT___xhr_PROXY_REDACTED_({
			startPage: true,
			//~ seed_arg1: o.input1,
			url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:' + o.domain + ' financial aid email'),
			callback_function: SaaS_financial_aid_emails__startpage
		});
		//~ console.log(req_proxy.array_startPage_results);
		//~ console.log(req_proxy.proxy_init);
		//~ console.log(req_proxy.proxy_waitComplete);
		//~ req_proxy.proxy_init();
		//~ req_proxy.proxy_waitComplete(
			//~ Brent_D_Payne_google_search
		//~ );
		
		function SaaS_financial_aid_emails__startpage(response_obj) {
			console.log(response_obj.length);
			var rs = response_obj;
			
			if (!rs.length) {
				document.body.innerText = '0';
				return;
			}
			
			for (var i in rs) {
				o.sd_start_urls.push(rs[i][0]);
				if (i >= 3) break; 
			}
			
			// start URLs, allowed domains
			SaaS_financial_aid_emails__scrapy(o.sd_start_urls, o.sd_allowed_domains);
		}
		
		function SaaS_financial_aid_emails__scrapy(start_urls, allowed_domains) {
			//~ console.log(start_urls);
			//~ console.log(allowed_domains);
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 10,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							// add PREVIEW all snippets
							div: d1,
							input_send_success: document.getElementById('web_url'),
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								
								
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							}
						}
					);
				}
			);
		}
	}
	
	//
	// Yin Li
	// Given the preschool's name and website, find the email address
	//
	s = '<li>If there are multiple email addresses, select the one that is for the admissions director, head of school, or other role/person over a general info@ type address.</li>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.section {position:absolute;top:0px;left:0;}');
		GM_addStyle('.panel-primary {position:absolute;top:2000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:160px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		//
		var d2 = document.createElement('iframe');
		d2.setAttribute('style','position:absolute;top:790px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;sandbox:allow-scripts allow-same-origin;visibility:hidden;');
		document.body.appendChild(d2);
		// mouseover
		d2.addEventListener('mouseout', function() {
			document.body.scrollIntoView();
		}, false);
		// Flicker
		d2.addEventListener('load', function() {
			this.style.visibility = 'visible';
			// Tell child to zoom out & extend
			var ifr_intv = setInterval(function() {
				d2.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
			}, 1000);
		}, false);
		// na
		var d3 = document.createElement('input');
		d3.setAttribute('style','position:absolute;top:0px;left:60%;width:38%;height:160px;');
		d3.value = 'N/A';
		d3.type = 'button';
		document.body.appendChild(d3);
		d3.onclick = function() {
			this.style.backgroundColor = 'LightGreen';
			document.getElementById('email').value = 'N/A';
			new AMT___core_factory().nextTab();
			doSubmit();
		}
		/* END ITEMS */
		
		
		// 0
		window.addEventListener('keydown', function(e) {
			var k = e.keyCode;
			if (k == 96) {
				document.body.scrollIntoView();
			}
		}, true);
		
		var td = document.getElementsByTagName('td');
		
		var o = {
			site: td[3].innerText.trim(),
			start_urls: [],
			allowed_domains: []
		}
		o.site = (!/^http/i.exec(o.site)) ? 'http://' + o.site : o.site;
		
		o.start_urls.push(o.site);
		o.allowed_domains.push(o.site.replace(/^https?:\/\/(www\.|)/i, '').replace(/\/[\d\D]*$/, ''));
		
		
		new AMT___core_factory().
			iframe2parent__postMessage( //
				{
					action: 'return_and_accept_button__nextTab'
				}
			);
			
		
		Yin_Li_school_emails__scrapy(o.start_urls, o.allowed_domains);
		
		function Yin_Li_school_emails__scrapy(start_urls, allowed_domains) {
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 40,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							div: d1,
							input_send_success: document.getElementById('email'),
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								//~ console.log(callback_obj);
								//~ return;
								
								// Preview
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								// Accepted
								else
								{
									// No emails found.
									// Open in Iframe.
									if (!callback_obj.matches.length) {
										
										var arr;
										if (callback_obj.urls.high.length) {
											arr = callback_obj.urls.high;
										} else if (callback_obj.urls.low.length) {
											arr = callback_obj.urls.low;
										} else if (callback_obj.urls.none.length) {
											arr = callback_obj.urls.none;
										} else {
											//
										}
										
										if (arr) {
											var try_url = false;
											var u;
											for (var i in arr) {
												u = arr[i].urls_url;
												if (/[\.\/]facebook\.com\//.exec(u)) continue;
												if (/[\.\/]plus\.google\.com\//.exec(u)) continue;
												if (/contact/i.exec(u)) {
													try_url = u;
													break;
												}
											}
											if (try_url) {
												//~ console.log(try_url);
												d2.src = try_url;
											} else { // any
												d2.src = arr[0].urls_url;
											}
											d2.scrollIntoView();
										}
									}
								}
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							},
							// nextTab
							do_submit_callback: function() {
								
								new AMT___core_factory().nextTab();
								doSubmit();
								
							}
						}
					);
				}
			);
		}
	}
	
	//
	// CRE
	// Find this person's email address
	//
	s = '<li>Most likely, the email address will NOT be listed on the website.&nbsp; A search may be required.</li>';
	if(ih.indexOf(s) != -1)
	{
		GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
		
		GM_addStyle('.section {position:absolute;top:0px;left:0;}');
		GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
		GM_addStyle('table {zoom:0.8;}');
		
		/* BEGIN ITEMS */
		var d1 = document.createElement('div');
		d1.setAttribute('style','position:absolute;top:160px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
		document.body.appendChild(d1);
		/* END ITEMS */
		
		var a = document.getElementsByTagName('a')[0].href.trim().replace(/\/$/g, '');
		
		var url = (!/^http/i.exec(a)) ? 'http://' + a : a;
		var domain = a		.replace(/^https?:\/\/(www\.|)/i, '');
		var domain2= domain	.replace(/^[^\.]+\./i, ''); // subdomain.domain.com -> domain.com
		
		console.log(url);
		console.log(domain);
		console.log(domain2);
		CRE_find_doctor_email__scrapy([url], [domain,domain2]);
		
		function CRE_find_doctor_email__scrapy(start_urls, allowed_domains) {
			//
			var s_obj = 
			{
				project: 'scrapy_amt',
				spider: 'AMTSpider',
				arg_allowed_domains: allowed_domains,	// array
				arg_start_urls: start_urls,		// array
				arg_max_pages_to_fetch: 40,
				arg_type_scrape: 'all_emails',	// all_emails or str_match
				settings: [
					//'DEPTH_LIMIT=4',
					//'SCHEDULER_ORDER=BFO',
					'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
					//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
					
					'CONCURRENT_ITEMS=200', //DEFAUL = 100
					'CONCURRENT_REQUESTS=16', //DEFAUL = 16
					'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
					
					'AJAXCRAWL_ENABLED=1', //true
					'COOKIES_ENABLED=0', //false
					//'RETRY_ENABLED=0', //false
					//'DI=0', //false
					'REDIRECT_MAX_TIMES=2'//,
					//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
					//'AJAXCRAWL_ENABLED=1', //true
				]
			}
			
			var req = new AMT___requests_factory();
			AMT___POPUP__initializeGlobals(
				function() {
					req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
						s_obj,
						(new AMT___items_factory()).create_dashboard__powers_v1,
						{
							div: d1,
							input_send_success: document.getElementById('email'),
							callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
								//~ console.log(callback_obj);
								//~ return;
								
								if (AMT__Global_Vars.isPreview) {
									// If no email match results
									if (!callback_obj.matches || !callback_obj.matches.length) {
										AMT___Floater.skip();
									}
									else
									{
										AMT___Floater.accept();
									}
									// ENDS SCRIPT PROCESSING
									return true;
								}
								
								// CONTINUES (job is NOT in "preview" mode)
								return false;
							}
						}
					);
				}
			);
		}
	}
	
	//
	// Rachel Scott
	// Customer List Email Fetching
	// 3WRXIMH6E1KF1DN1WO1NDVSZY6X4LI
	// Accept all jobs if they include an email.
	// Skip all with 0 emails.
	s = '	<li>For this company, enter the name, title and email address for a decision maker.</li>';
	s = '<li>For this company, enter the company&nbsp;name, name of decision maker\'s first name and last name (with proper capitalization),&nbsp;title, and email address for a decision maker.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.section {position:absolute;top:0px;left:0;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.highlight-box {position:absolute;top:1600px;}');
			GM_addStyle('#submitButton {position:absolute;top:-300px;left:50%;width:50%;height:40px}');
			//~ GM_addStyle('table {zoom:0.6;}');
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style','position:absolute;top:300px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1);
			var d1b = document.createElement('div'); // DEBUG
			d1b.setAttribute('style','position:absolute;top:0px;left:50%;width:49%;height:300px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1b);
			//~ var d2 = document.createElement('iframe');
			//~ d2.setAttribute('style','position:absolute;top:790px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;sandbox:allow-scripts allow-same-origin;visibility:hidden;');
			//~ document.body.appendChild(d2);
			//~ var d3 = document.createElement('input');
			//~ d3.setAttribute('type', 'button');
			//~ d3.setAttribute('style','position:absolute;top:760px;left:0%;width:48%;height:30px;text-align:left;');
			//~ document.body.appendChild(d3);
			var d3b= document.createElement('textarea');
			d3b.setAttribute('type', 'text');
			d3b.setAttribute('style','position:absolute;top:0px;left:0%;width:10%;height:10px;text-align:left;');
			document.body.appendChild(d3b);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 300 // offset top
			});
			
			window.addEventListener('keydown', function(e) {
				if(e.keyCode == 220) {
					new AMT___core_factory().iframe2parent__postMessage({action: 'click_return_button'});
				}
			});
			new AMT___core_factory().iframe2parent__postMessage({action: 'return_button_hotkey', keyCode: 220});
			
			//~ // mouseover
			//~ d2.addEventListener('mouseover', function() {
				//~ d1.scrollIntoView()
			//~ }, false);
			//~ 
			//~ // Flicker
			//~ d2.addEventListener('load', function() {
				//~ this.style.visibility = 'visible';
				//~ // Tell child to zoom out & extend
				//~ var ifr_intv = setInterval(function() {
					//~ d2.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
				//~ }, 1000);
			//~ }, false);
			// NO email btn
			//~ d3.value = 'NO@email.com';
			//~ d3.onclick = function() {
				//~ this.style.backgroundColor = 'LightGreen';
				//~ document.getElementById('web_url').value = 'NO@email.com';
				//~ 
				//~ showNextTab();
				//~ doSubmit();
			//~ }
			
			var b  = document.getElementsByTagName('b');
			
			var o = {
				domain: b[1].innerText.replace(/\/[^\/]*$/, '').trim(), // /$ or /[...]$
				url: url,
				name: b[2].innerText.trim(),
				name_cleaned: b[2].innerText.trim().replace(/ \w\.* /g, '    ').replace(/\s+/g, ' '),
				comp_name: b[0].innerText.trim(),
				name_fn: null,
				name_ln: null,
				
				sd_start_urls: [],
				sd_allowed_domains: [],
				sd_start_urls_obj: {}, // object key for sd_start_urls array
				role: b[3].innerText.trim(), 
				count_searches: 0,
				sp_search1_first_result: null,
				sp_search2_first_result: null
			}
			o.sd_allowed_domains.push(o.domain);
			o.url = (!/^http/i.exec(o.domain)) ? 'http://' + o.domain : o.domain;
			var x = o.name.split(' ');
			o.name_fn = x[0];
			o.name_ln = (x.length > 1) ? x[x.length - 1] : x[0]; // last or first if not last
			
			// Skip?
			//if (o.name != '') {
			if (o.domain == '' || o.name == '' || o.comp_name == '') {
				AMT___Floater.skip();
				return;
			}
			
			// ...
			d3b.value = o.domain; // domain
			d3b.onblur = function() {
				var url = (!/^http/i.exec(this.value)) ? 'http://' + this.value : this.value;
				scrapy([url], [this.value]);
			}
			
			// return button
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			// ...
			var q = [
				document.getElementById('Q1company'),
				document.getElementById('Q1name'),
				document.getElementById('Q1position'),
				document.getElementById('Q1email'),
				document.getElementById('Q1location')
			];
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				
				for (var i in q) {
					q[i].value = q[i].value.trim();
					if (q[i].value == '') {
						return false;
					}
				}
				// Email correct?
				if (q[3].value.length < 6 || q[3].value.indexOf('@') == -1) {
					return false;
				}
				// Is the Source URL different than company's domain? If so then warn.
				if (q[4].value.indexOf(o.domain) == -1) {
					var confirm_value = confirm('Source URL has different domain than company. Press OK to ignore.');
					if (confirm_value) {
						// do nothing
					} else {
						// Stop
						return false;
					}
				}
				//~ if (new RegExp( '^https?:\\/\\/'__js_escape_regEx(o.domain) ).exec(q[4].value))
				
				// Here?
				showNextTab();
				doSubmit();
				
				e.stopPropagation();
				e.preventDefault();
				
				return false;
			}
			// INIT
			//~ Rachel_Scott_decision_maker__scrapy([o.url], [o.domain]);
			
			// Add "fname@domain.com" OR "lname@domain.com" OR "lname[fi]@domain.com"
			
			// INIT
			// Yahoo/SP
			// A third optional search would be... Something like (include comp. name, no domain): ("David Veckerelli" OR "David Veckerelli") ("email") ("ddninc.tv" OR "Ddn")
			//
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // person + site + email
				startPage: true,
				//~ seed_arg1: o.input1,
				callback_function: sp_process,
				return_init_object: true,
				init__type: 1,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.domain+
				
				(o.name != '' ? ' ("'+o.name+'" OR "'+o.name_cleaned+'")' : '') +
				
				' ("email" OR "contact")')
			});
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // email + staff-pages
				startPage: true,
				//~ seed_arg1: o.input1,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.domain+' "email" ("about us" OR "about" OR "our staff" OR "staff" OR "staff directory" OR "personnel" OR "contact us" OR "contact" OR "leadership" OR "governance" OR "who we are" OR "our people" OR "officers" OR "executives")'),
				callback_function: sp_process,
				return_init_object: true,
				init__type: 2
			});
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // email + staff-pages
				startPage: true,
				//~ seed_arg1: o.input1,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('("'+o.name+'" OR "'+o.name_cleaned+'") "email" ("'+o.domain+'" OR "'+o.comp_name+'")'),
				callback_function: sp_process,
				return_init_object: true,
				init__type: 3
			});
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // email + staff-pages
				startPage: true,
				//~ seed_arg1: o.input1,
				url: 'https://startpage.com/do/metasearch.pl?query=' +
					encodeURIComponent(
						'"'+o.name_fn+'@'+o.domain+'" OR "'+o.name_ln+'@'+o.domain+'" OR "'+o.name_ln+o.name_fn[0]+'@'+o.domain+'" OR "'+o.name_fn+o.name_ln[0]+'@'+o.domain+'"'
					),
				callback_function: sp_process,
				return_init_object: true,
				init__type: 4
			});
			
			/**
			 * function scrapy
			 */
			function sp_process(response_obj) {
				
				console.log(response_obj);
				
				var rs = response_obj.rs;
				
				//~ var rs = response_obj; // original // "callback_function(o.obj_vars [.rs, ...]);" VERSUS "callback_function(rs);"
				
				//~ if (!rs.length) {
					//~ document.body.innerText = '0';
					//~ return;
				//~ }
				var debug_div = document.createElement('div');
				debug_div.setAttribute('style', 'border-bottom:3px solid teal;');
				d1b.appendChild(debug_div);
				for (var i in rs) {
					var u = rs[i][0];
					if (!o.sd_start_urls_obj.hasOwnProperty( u )) {
						
						o.sd_start_urls.push( u );
						o.sd_start_urls_obj[ u ] = true; // set key
							
						//~ // SKIP NON-DOMAIN FOR SCRAPY
						//~ if (response_obj.init__type != 3) {						
							//~ o.sd_start_urls.push( u );
							//~ o.sd_start_urls_obj[ u ] = true; // set key
						//~ }
					}
					// Button
					var btn = document.createElement('input');
					btn.setAttribute('style','cursor:pointer;');
					btn.type = 'button';
					btn.value = ' > ';
					btn.url = rs[i][0];
					debug_div.appendChild(btn);
					btn.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						q[4].value = this.url;
					}
					// Link
					var link = document.createElement('a');
					link.href = rs[i][0];
					link.innerText = ' L ';
					link.onclick = function() {
						window.open(this.href, 'newtab');
						return false;
					}
					debug_div.appendChild(link);
					// Show link
					debug_div.appendChild(document.createTextNode(rs[i][0]));
					
					// Set first!
					// Disregard if this is the 3rd search type (non-domain).
					if (i == 0) {
						switch (response_obj.init__type) {
							case 1:
								o.sp_search1_first_result = rs[i][0];
								break;
							case 2:
								o.sp_search2_first_result = rs[i][0];
								break;
						}
					}
					if (i >= 3) break; // Only go for 4 URLs.
					if (response_obj.init__type >= 3 && i >= 1) break; // Only go for 2 URLs on non-domain searches.
					
					debug_div.appendChild(document.createElement('br'));
				}
				if (debug_div.innerText == '') {
					debug_div.innerText = '0 Results';
				}
				
				if (o.count_searches <= 2) { // Done with 4 searches?
					o.count_searches++;
				} else {
					// Equals 2 (3 complete searches)
					// ALWAYS init here regardless of whether there are any start urls. It is assumed at this point that there IS a domain at least.
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
					
					// Use utility window to open the first result.
					// Open SEARCH1 1st result. If no SEARCH1 then SEARCH2 first result.
					// If no SEARCH2 then open o.domain.
					var uwurl = o.domain; // default
					if (o.sp_search1_first_result != null) {
						uwurl = o.sp_search1_first_result;
					} else if (o.sp_search2_first_result != null) {
						uwurl = o.sp_search2_first_result;
					} else {
						//
					}
					
					// Set util
					//~ AMT__setUtilityTabs([{
						//~ url: uwurl,
						//~ options: {
							//~ task: 'AMT__Kristin_Howe_agent_photos2__utility_window',
							//~ agent_name: o.name,
							//~ agent_name_clean: o.name_clean
						//~ }
					//~ }]);
					
					// ...
					console.log(o);
				}
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=40', //DEFAUL = 100
						'CONCURRENT_REQUESTS=12', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=1'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								div: d1,
								input_send_success: document.getElementById('Q1email'),
								
								// This is element el_div.onclick from the panel.
								//
								//
								input_onclick_callback: function() {
									
									// OPEN IN IFRAME!
									//~ this.style.backgroundColor = 'LightGreen';
									//~ this.input_send_success.value = this.email;
									//~ d2.src = this.url;
									//~ d2.scrollIntoView();
									q[3].value = this.email;
									q[4].value = this.url;
									
									document.getElementById('submitButton').click();
									// ......
									//~ showNextTab();
									//~ doSubmit();
									//~ showNextTab();
									//~ doSubmit();
								},
								do_submit_callback: function() {
									// OPEN IN IFRAME!
									//~ showNextTab();
									//~ doSubmit();
								},
								// RUNS BEFORE DASHBOARD IS FILLED IN !
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURN: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									//~ console.log(callback_obj);
									//~ return;
									
									if (AMT__Global_Vars.isPreview)
									{
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											
											AMT___Floater.skip();
											
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									}
									else // JOB IS ACCEPTED
									{
										
										// Here?
										// Add to active tabs queue!
										//
										//
										//
										addToTabsQ();
										
										
										//~ // open in Iframe
										//~ var try_url = false;
										//~ var u;
										//~ for (var i in callback_obj.urls.high) {
											//~ u = callback_obj.urls.high[i].urls_url;
											//~ if (/[\.\/]facebook\.com\//.exec(u)) continue;
											//~ if (/[\.\/]plus\.google\.com\//.exec(u)) continue;
											//~ if (/contact/i.exec(u)) {
												//~ try_url = u;
												//~ break;
											//~ }
										//~ }
										//~ if (try_url) {
											//~ d2.src = try_url;
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								}
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	// Stephen Robertson
	// Find the email address for this Photographer using the website provided
	s = "Find the email&nbsp;address for this Photographer&nbsp;using the website provided.";
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.section {position:absolute;top:0px;left:0;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.highlight-box {position:absolute;top:1600px;}');
			GM_addStyle('#submitButton {position:absolute;top:-300px;left:50%;width:50%;height:40px}');
			//~ GM_addStyle('table {zoom:0.6;}');
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style','position:absolute;top:300px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1);
			var d1b = document.createElement('div'); // DEBUG
			d1b.setAttribute('style','position:absolute;top:0px;left:50%;width:49%;height:300px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1b);
			//~ var d2 = document.createElement('iframe');
			//~ d2.setAttribute('style','position:absolute;top:790px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;sandbox:allow-scripts allow-same-origin;visibility:hidden;');
			//~ document.body.appendChild(d2);
			//~ var d3 = document.createElement('input');
			//~ d3.setAttribute('type', 'button');
			//~ d3.setAttribute('style','position:absolute;top:760px;left:0%;width:48%;height:30px;text-align:left;');
			//~ document.body.appendChild(d3);
			var d3b= document.createElement('textarea');
			d3b.setAttribute('type', 'text');
			d3b.setAttribute('style','position:absolute;top:0px;left:0%;width:10%;height:10px;text-align:left;');
			document.body.appendChild(d3b);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 300 // offset top
			});
			
			window.addEventListener('keydown', function(e) {
				console.log(e.keyCode);
				if(e.keyCode == 220) {
					new AMT___core_factory().iframe2parent__postMessage({action: 'click_return_button'});
				}
			});
			new AMT___core_factory().iframe2parent__postMessage({action: 'return_button_hotkey', keyCode: 220});
			
			//~ // mouseover
			//~ d2.addEventListener('mouseover', function() {
				//~ d1.scrollIntoView()
			//~ }, false);
			//~ 
			//~ // Flicker
			//~ d2.addEventListener('load', function() {
				//~ this.style.visibility = 'visible';
				//~ // Tell child to zoom out & extend
				//~ var ifr_intv = setInterval(function() {
					//~ d2.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
				//~ }, 1000);
			//~ }, false);
			// NO email btn
			//~ d3.value = 'NO@email.com';
			//~ d3.onclick = function() {
				//~ this.style.backgroundColor = 'LightGreen';
				//~ document.getElementById('web_url').value = 'NO@email.com';
				//~ 
				//~ showNextTab();
				//~ doSubmit();
			//~ }
			
			var b  = document.getElementsByTagName('b');
			var td = document.getElementsByTagName('td');
			var labels = document.getElementsByTagName('label');
			var o = {
				domain: td[3].innerText.replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"), //XXX.replace(/https?:\/\/[w]*\.?/, '').trim(), // /$ or /[...]$
				url: td[3],
				name: td[1].innerText.trim(),
				name_cleaned: td[0].innerText.trim().replace(/ \w\.* /g, '    ').replace(/\s+/g, ' '),
				name_fn: null,
				name_ln: null,
				
				sd_start_urls: [],
				sd_allowed_domains: [],
				sd_start_urls_obj: {}, // object key for sd_start_urls array
				role: "photography", 
				count_searches: 0,
				sp_search1_first_result: null,
				sp_search2_first_result: null
			}
			o.sd_allowed_domains.push(o.domain);
			o.url = (!/^http/i.exec(o.domain)) ? 'http://' + o.domain : o.domain;
			var x = o.name.split(' ');
			o.name_fn = x[0];
			o.name_ln = (x.length > 1) ? x[x.length - 1] : x[0]; // last or first if not last
			o.sd_start_urls = [o.url];
			o.sd_start_urls_obj[o.url] = o.url;
			
			console.log(o);
			
			// Skip?
			//if (o.name != '') {
			if (o.domain == '' || o.name == '') {
				AMT___Floater.skip();
				return;
			}
			
			// ...
			d3b.value = o.domain; // domain
			d3b.onblur = function() {
				var url = (!/^http/i.exec(this.value)) ? 'http://' + this.value : this.value;
				scrapy([url], [this.value]);
			}
			//d3b.blur();
			
			// return button
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			// ...
			var q = [
				document.getElementById('email_address'),
			];
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				
				for (var i in q) {
					q[i].value = q[i].value.trim();
					if (q[i].value == '') {
						return false;
					}
				}
				// Email correct?
				if (q[0].value.length < 6 || q[0].value.indexOf('@') == -1) {
					return false;
				}
				// Is the Source URL different than company's domain? If so then warn.
				//~ if (q[].value.indexOf(o.domain) == -1) {
					//~ var confirm_value = confirm('Source URL has different domain than company. Press OK to ignore.');
					//~ if (confirm_value) {
						//~ // do nothing
					//~ } else {
						//~ // Stop
						//~ return false;
					//~ }
				//~ }
				//~ if (new RegExp( '^https?:\\/\\/'__js_escape_regEx(o.domain) ).exec(q[4].value))
				
				// Here?
				showNextTab();
				doSubmit();
				
				e.stopPropagation();
				e.preventDefault();
				
				return false;
			}
			// INIT
			//~ Rachel_Scott_decision_maker__scrapy([o.url], [o.domain]);
			
			// Add "fname@domain.com" OR "lname@domain.com" OR "lname[fi]@domain.com"
			
			
			
			/**
			 * function scrapy
			 */
			function sp_process(response_obj) {
				
				console.log(response_obj);
				
				var rs = response_obj.rs;
				
				//~ var rs = response_obj; // original // "callback_function(o.obj_vars [.rs, ...]);" VERSUS "callback_function(rs);"
				
				//~ if (!rs.length) {
					//~ document.body.innerText = '0';
					//~ return;
				//~ }
				var debug_div = document.createElement('div');
				debug_div.setAttribute('style', 'border-bottom:3px solid teal;');
				d1b.appendChild(debug_div);
				for (var i in rs) {
					var u = rs[i][0];
					if (!o.sd_start_urls_obj.hasOwnProperty( u )) {
						
						o.sd_start_urls.push( u );
						o.sd_start_urls_obj[ u ] = true; // set key
							
						//~ // SKIP NON-DOMAIN FOR SCRAPY
						//~ if (response_obj.init__type != 3) {						
							//~ o.sd_start_urls.push( u );
							//~ o.sd_start_urls_obj[ u ] = true; // set key
						//~ }
					}
					// Button
					var btn = document.createElement('input');
					btn.setAttribute('style','cursor:pointer;');
					btn.type = 'button';
					btn.value = ' > ';
					btn.url = rs[i][0];
					debug_div.appendChild(btn);
					btn.onclick = function() {
						this.style.backgroundColor = 'LightGreen';
						//q[4].value = this.url;
					}
					// Link
					var link = document.createElement('a');
					link.href = rs[i][0];
					link.innerText = ' L ';
					link.onclick = function() {
						window.open(this.href, 'newtab');
						return false;
					}
					debug_div.appendChild(link);
					// Show link
					debug_div.appendChild(document.createTextNode(rs[i][0]));
					
					// Set first!
					// Disregard if this is the 3rd search type (non-domain).
					if (i == 0) {
						switch (response_obj.init__type) {
							case 1:
								o.sp_search1_first_result = rs[i][0];
								break;
							case 2:
								o.sp_search2_first_result = rs[i][0];
								break;
						}
					}
					if (i >= 3) break; // Only go for 4 URLs.
					if (response_obj.init__type >= 3 && i >= 1) break; // Only go for 2 URLs on non-domain searches.
					
					debug_div.appendChild(document.createElement('br'));
				}
				if (debug_div.innerText == '') {
					debug_div.innerText = '0 Results';
				}
				
				if (o.count_searches <= 0) { // Done with 2 searches?
					o.count_searches++;
				} else {
					// Equals 1 (2 complete searches)
					// ALWAYS init here regardless of whether there are any start urls. It is assumed at this point that there IS a domain at least.
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
					
					// Use utility window to open the first result.
					// Open SEARCH1 1st result. If no SEARCH1 then SEARCH2 first result.
					// If no SEARCH2 then open o.domain.
					var uwurl = o.domain; // default
					if (o.sp_search1_first_result != null) {
						uwurl = o.sp_search1_first_result;
					} else if (o.sp_search2_first_result != null) {
						uwurl = o.sp_search2_first_result;
					} else {
						//
					}
					
					// Set util
					//~ AMT__setUtilityTabs([{
						//~ url: uwurl,
						//~ options: {
							//~ task: 'AMT__Kristin_Howe_agent_photos2__utility_window',
							//~ agent_name: o.name,
							//~ agent_name_clean: o.name_clean
						//~ }
					//~ }]);
					
					// ...
					console.log(o);
				}
			}
			
			
			// INIT
			// Yahoo/SP
			// A third optional search would be... Something like (include comp. name, no domain): ("David Veckerelli" OR "David Veckerelli") ("email") ("ddninc.tv" OR "Ddn")
			//
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // person + site + email
				startPage: true,
				//~ seed_arg1: o.input1,
				callback_function: sp_process,
				return_init_object: true,
				init__type: 1,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.domain+
				
				(o.name != '' ? ' ("'+o.name+'" OR "'+o.name_cleaned+'")' : '') +
				
				' ("email" OR "contact")')
			});
			var req_proxy = new AMT___xhr_PROXY_REDACTED_({ // email + staff-pages
				startPage: true,
				//~ seed_arg1: o.input1,
				url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.domain+' "email" ("about us" OR "about" OR "our staff" OR "staff" OR "staff directory" OR "personnel" OR "contact us" OR "contact" OR "leadership" OR "governance" OR "who we are" OR "our people" OR "officers" OR "executives")'),
				callback_function: sp_process,
				return_init_object: true,
				init__type: 2
			});
		
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 40,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=40', //DEFAUL = 100
						'CONCURRENT_REQUESTS=12', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=1'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								div: d1,
								input_send_success: document.getElementById('email_address'),
								
								// This is element el_div.onclick from the panel.
								//
								//
								input_onclick_callback: function() {
									
									// OPEN IN IFRAME!
									//~ this.style.backgroundColor = 'LightGreen';
									//~ this.input_send_success.value = this.email;
									//~ d2.src = this.url;
									//~ d2.scrollIntoView();
									q[0].value = this.email;
									//q[4].value = this.url;
									
									document.getElementById('submitButton').click();
									// ......
									//~ showNextTab();
									//~ doSubmit();
									//~ showNextTab();
									//~ doSubmit();
								},
								do_submit_callback: function() {
									// OPEN IN IFRAME!
									//~ showNextTab();
									//~ doSubmit();
								},
								// RUNS BEFORE DASHBOARD IS FILLED IN !
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURN: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									//~ console.log(callback_obj);
									//~ return;
									
									if (AMT__Global_Vars.isPreview)
									{
										// If no email match results
										
										if (!callback_obj.matches || !callback_obj.matches.length) {
											//console.log(callback_obj);
											
											AMT___Floater.skip();
											
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING
										return true;
									}
									else // JOB IS ACCEPTED
									{
										
										// Here?
										// Add to active tabs queue!
										//
										//
										//
										addToTabsQ();
										
										
										//~ // open in Iframe
										//~ var try_url = false;
										//~ var u;
										//~ for (var i in callback_obj.urls.high) {
											//~ u = callback_obj.urls.high[i].urls_url;
											//~ if (/[\.\/]facebook\.com\//.exec(u)) continue;
											//~ if (/[\.\/]plus\.google\.com\//.exec(u)) continue;
											//~ if (/contact/i.exec(u)) {
												//~ try_url = u;
												//~ break;
											//~ }
										//~ }
										//~ if (try_url) {
											//~ d2.src = try_url;
										//~ }
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								}
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	//
	// Amazon Requester Inc.- EPS Marketing
	// Find the Contact Email Address on Websites
	//
	// Accept all jobs if they include an email.
	// Skip all with 0 emails UNLESS "NO@email.com": 1) no more than 10 page site, 2) one page on the site contains a "contact" in the URL.
	// For "NO@email.com" load "contact" URL in iframe
	/** urls.
	 * high	:[],
	 * low		:[],
	 * none	:[],
	 * outside	:[],
	 * complete_high_to_low: []
	 */
	s = '<li>Include the full email address, e.g. <a href="mailto:abc@abc.com">abc@abc.com</a>.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {};
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			
			GM_addStyle('.section {position:absolute;top:0px;left:0;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {zoom:0.6;}');
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style','position:absolute;top:160px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;');
			document.body.appendChild(d1);
			var d2 = document.createElement('iframe');
			d2.setAttribute('style','position:absolute;top:790px;left:0%;width:98%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;sandbox:allow-scripts allow-same-origin;visibility:hidden;');
			document.body.appendChild(d2);
			var d3 = document.createElement('input');
			d3.setAttribute('type', 'button');
			d3.setAttribute('style','position:absolute;top:760px;left:0%;width:48%;height:30px;text-align:left;');
			document.body.appendChild(d3);
			var d3b= document.createElement('textarea');
			d3b.setAttribute('type', 'text');
			d3b.setAttribute('style','position:absolute;top:0px;left:0%;width:10%;height:10px;text-align:left;');
			document.body.appendChild(d3b);
			/* END ITEMS */
			
			// mouseover
			d2.addEventListener('mouseover', function() {
				d1.scrollIntoView()
			}, false);
			
			// Flicker
			d2.addEventListener('load', function() {
				this.style.visibility = 'visible';
				// Tell child to zoom out & extend
				var ifr_intv = setInterval(function() {
					d2.contentWindow.postMessage({task: 'AMT__all_pages_util', MT___all_pages_extend: true, MT___all_pages_zoom: true}, "*");
				}, 1000);
			}, false);
			
			// NO email btn
			d3.value = 'NO@email.com';
			d3.onclick = function() {
				this.style.backgroundColor = 'LightGreen';
				document.getElementById('web_url').value = 'NO@email.com';
				
				showNextTab();
				doSubmit();
			}
			
			// The domain!
			var td = document.getElementsByTagName('td')[1].innerText.trim();
			
			// The url!
			var url = (!/^http/i.exec(td)) ? 'http://' + td : td;
			//~ var domain = td.toLowerCase().replace(/http:\/\/www)/, '');
			
			var o = {
				domain: td.replace(/\/\**$/, ''), // /* or /
				url: url
			}
			
			// ...
			d3b.value = td; // domain
			d3b.onblur = function() {
				var url = (!/^http/i.exec(this.value)) ? 'http://' + this.value : this.value;
				Amazon_Requester_Inc_EPS_Marketing__scrapy([url], [this.value]);
			}
			
			// return button function!
			//~ var cf = new AMT___core_factory()
			new AMT___core_factory()
				.iframe2parent__postMessage( // options  , XXXXX >callback_function
					{
						action: 'return_button__showNextTab'
					}
				);
			
			document.getElementById('submitButton').onclick = function(e) {
				
				showNextTab();
				doSubmit();
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			// INIT
			Amazon_Requester_Inc_EPS_Marketing__scrapy([o.url], [o.domain]);
			
			/**
			 * function Amazon_Requester_Inc_EPS_Marketing__scrapy
			 */
			function Amazon_Requester_Inc_EPS_Marketing__scrapy(start_urls, allowed_domains) {
				//
				var s_obj = 
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: 80,
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						
						'CONCURRENT_ITEMS=40', //DEFAUL = 100
						'CONCURRENT_REQUESTS=12', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=1'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								div: d1,
								input_send_success: document.getElementById('web_url'),
								do_submit_callback: function() {
									
									showNextTab();
									doSubmit();
								},
								// RUNS BEFORE DASHBOARD IS FILLED IN !
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) { // RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									//~ console.log(callback_obj);
									//~ return;
									
									if (AMT__Global_Vars.isPreview)
									{
										// If no email match results
										if (!callback_obj.matches || !callback_obj.matches.length) {
											
											// Check URLs option to accept job when
											// match.
											var c = callback_obj.urls
											var d = c.high.length + c.low.length + c.none.length;
											var try_url = false;
											var u;
											for (var i in callback_obj.urls.high) { // only high
												u = callback_obj.urls.high[i].urls_url;
												if (/[\.\/]facebook\.com\//.exec(u)) continue;
												if (/contact/i.exec(u)) {
													try_url = u;
													break;
												}
											}
											
											if (d <= 10 && try_url) {
												AMT___Floater.accept();
											}
											else
											{
												//showNextTab(); // !
												AMT___Floater.skip();
											}
										}
										else
										{
											AMT___Floater.accept();
										}
										// ENDS SCRIPT PROCESSING (aka triggers exception)
										return true;
									}
									else // JOB IS ACCEPTED
									{
										
										
										
										// customercare @ gmail.com
										// bizname @ gmail.com
										//
										
										// Is there an auto email?
										// If so, then return the task at the
										// current state, i.e., stop processing
										// of the "Max Powers" dashboard.
										console.log(callback_obj);
										// Is unique?
										var last = '';
										var unique = true;
										var em;
										for (var i in callback_obj.matches) {
											em = callback_obj.matches[i].email_email.toLowerCase();
											if (em != last && i == 0) {
												last = em;
											}
											else if (em != last) { // not unique
												unique = false;
											}
										}
										if (unique && callback_obj.matches.length && em) {
											var name;
											if (name = new RegExp('^([^@]+)@' + __js_escape_regEx(o.domain) + '$','i').exec(em)) {
												name = name[1].toLowerCase();
												
												var good_names = {
													'owner' : true,
													'marketing' : true,
													'sales' : true,
													'manager' : true,
													'support' : true,
													'contact' : true,
													'contactus' : true,
													'service' : true,
													'information' : true,
													'info' : true
												};
												
												if (good_names.hasOwnProperty(name) && o.domain.length > 4) {
													document.getElementById('web_url').value = em;
													doSubmit();
													return true; // ends tasks at current state!
												}
											}
										}
										
										
										// Here?
										// Add to active tabs queue!
										//
										//
										//
										addToTabsQ();
										
										
										// open in Iframe
										var try_url = false;
										var u;
										for (var i in callback_obj.urls.high) {
											u = callback_obj.urls.high[i].urls_url;
											if (/[\.\/]facebook\.com\//.exec(u)) continue;
											if (/[\.\/]plus\.google\.com\//.exec(u)) continue;
											if (/contact/i.exec(u)) {
												try_url = u;
												break;
											}
										}
										if (try_url) {
											//~ console.log(try_url);
											d2.src = try_url;
										}
									}
									
									// 
									
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								}
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	
	return true;
}
