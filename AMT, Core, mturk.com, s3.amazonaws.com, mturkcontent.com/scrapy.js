/**
 * function init__scrapy
 * 
 * @return	True=No "s" found. Continue to check for "s" matches.
 * 			False="s" match found. Stop checking for "s" matches.
 *			e.g. function a(){ return false}; console.log(a() == false) // true
 * 
 * Note: On starting scrapy...
 * 		cd /home/dave/share/Development/scrapy/
 * 		./start-scrapyd.sh
 * 		cd scrapy_amt/
 *		scrapyd-deploy
 * 
 * Note: If running on David's computer then run scrapyd-deploy a second
 * time because it fails the first time.
 * 
 * Note: EnableTabsQ=1. No need for ShowNextTab.
 */
function init__scrapy() {
	/**
	 * scrapy
	 * 
	 * TODO:
	 * 		Consider:
	 * 			"I'm feeling lucky" first result domain scrape.
	 * 			Searches for "{ fill in the blank}" + "email".
	 * 			Then with the first result, loads it into scrapy. =)
	 * 			
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
	 * Michael S. Bell
	 * Alex Castro
	 * jpalglobal
	 * Chris Richmond
	 * WebEduCo
	 * Tait Larson
	 * Sherry Gould
	 * David Tera
	 * David Tera 2
	 * PACED Ltd.
	 * Stefan Mateescu
	 * John Stockdale
	 * Andrea Narvaez (feeling lucky)
	 * Facten (feeling lucky)
	 * Corey (feeling lucky)
	 * Dominic St-Pierre (feeling lucky, + given url)
	 * Jon Taylor
	 * chuck wells
	 * John Stockdale (feeling lucky, url+email)
	 * Chris Richmond (fin aid dept.)
	 * CR Media
	 * John Stockdale, feeling lucky
	 * 
	 * 
	 * 
	 * 
	 */
	// Chris Richmond (fin aid dept.)
	// Find an email for the financial aid department. If not available, find the next best email or form.
	// autos
	var s = '<li>Use Google to search the following: site:example.com financial aid contact</li>\n	<li>If this can\'t be found, please find an admissions email.</li>\n	<li>If neither of those things exist, or if the site listed isn\'t an educational facility, please enter an alternative email.&nbsp;</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				//~ name: a[2].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				try_autos_str: '^(finaid|financialaid|fin_aid|financial_aid|fin\.aid|financial\.aid)@'
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			//~ d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					// Hm. Use domain, not site.
					ssite = 'site:'+o.sd_allowed_domains[0];
					//~ ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("financialaid@'+o.sd_allowed_domains[0]+'" OR "finaid@'+o.sd_allowed_domains[0]+'" OR "financial aid" OR "finaid" OR "financial" OR financial aid) (email OR e-mail OR contact OR mail)') + opts,
					callback_function: sp,
					host: MT___host
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
				}
				// xxLook for Facebook pages in results.
				// xxAnd secondly check if first result is a "non-skip" result,
				// xxin which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var num = 0;
				for (var i in rs) {
					if (num >= 2) break; // adds 0, 1
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						//~ break; // Only one......
					}
					// Old: Add all.
					// o.sd_start_urls.push(rs[i][0]);
					num++;
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				// concurrent
				// E.g., 20 pages to fetch / 4 = 5 rounds of fetching.
				var crt = Math.round(
					AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'] / 4);
					
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=200', //DEFAULT = 100
						'CONCURRENT_REQUESTS=' + crt, //DEFAULT = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=' + crt, //DEFAULT = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												o.try_autos_str +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// CR Media
	// Find Contact Emails for Businesses
	// autos
	var s = '<strong>Find the contact email for the businesses below.&nbsp;</strong></p>\n\n<ul>\n	<li><span style="font-family: Verdana, Geneva, sans-serif; font-size: 12px;">First, go to their Facebook page (if listed) and check under the "INFO" or "ABOUT" section for their email address.</span></li>\n	<li><span style="font-family: Verdana, Geneva, sans-serif; font-size: 12px;">If not found, go to their Website to find it. (Try checking their "CONTACT" or "ABOUT" page.)</span></li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[3].innerText.trim()],
				sd_allowed_domains: null,
				name: td[1].innerText.trim(),
				fb: td[5].innerText.trim(),
				contact: td[7].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				try_autos_str: '^(info|contact|about)@'
				//~ try_autos_str: '^(finaid|financialaid|fin_aid|financial_aid|fin\.aid|financial\.aid)@'
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			// add facebook if there
			if (o.fb != '') {
				o.sd_start_urls.push(o.fb);
			}
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\/(www\.|)/i, '')+', '+o.fb.replace(/https?:\/\/(www\.|)/i, '');
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name + ', ' + o.contact;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					// Hm. Use domain, not site.
					ssite = 'site:'+o.sd_allowed_domains[0];
					//~ ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("financialaid@'+o.sd_allowed_domains[0]+'" OR "finaid@'+o.sd_allowed_domains[0]+'" OR "financial aid" OR "finaid" OR "financial" OR financial aid) (email OR e-mail OR contact OR mail)') + opts,
					callback_function: sp,
					host: MT___host
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
				}
				// xxLook for Facebook pages in results.
				// xxAnd secondly check if first result is a "non-skip" result,
				// xxin which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var num = 0;
				for (var i in rs) {
					if (num >= 1) break; // adds 0
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						//~ break; // Only one......
					}
					// Old: Add all.
					// o.sd_start_urls.push(rs[i][0]);
					num++;
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				// concurrent
				// E.g., 20 pages to fetch / 4 = 5 rounds of fetching.
				var crt = Math.round(
					AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'] / 4);
					
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAULT = 100
						'CONCURRENT_REQUESTS=' + crt, //DEFAULT = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=' + crt, //DEFAULT = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												o.try_autos_str +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// chuck wells
	// Given URL, find Contact information
	// try_autos is *TRUE*.
	//~ var s = '<p>2. Try and find a contact email on the site</p>\n\n<p><span style="line-height: 1.6em;">Place Email address in this box</span></p>\n\n<p><input id="Q1Url" name="Q2Url" size="100" type="text"></p>';
	//~ var s = '<p>2. Try and find a contact email on the site (if no email is found, add contact form pls)</p>\n\n<p><span style="line-height: 1.6em;">Place Email address (or contact form if no email found)&nbsp;in this box</span></p>';
	var s = '<p>2. Try and find a contact email on the site</p>\n\n<p><span style="line-height: 1.6em;">Place Email address in this box</span></p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var x = /Copy and paste this URL into your browser: ([^<]+)<\/p>/.exec(ih);
			var o = {
				sd_start_urls: [x[1]],
				sd_allowed_domains: null,
				//~ name: a[2].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('Q1Url'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				try_autos_str: '^(info|information|contact|contactus|inquiry|support|help|communication|office)@'
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			//~ d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("email" OR "e-mail" OR "contact")') + opts,
					callback_function: sp,
					host: MT___host
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
				}
				// xxLook for Facebook pages in results.
				// xxAnd secondly check if first result is a "non-skip" result,
				// xxin which case add to both o.sd_start_urls and o.sd_allowed_domains.
				//~ var first = true;
				//~ for (var i in rs) {
					//~ var dm = rs[i][0].replace(
						//~ /https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					//~ if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						//~ o.sd_start_urls.push(rs[i][0]);
						//~ break; // Only one......
					//~ }
					//~ // Old: Add all.
					//~ // o.sd_start_urls.push(rs[i][0]);
				//~ }
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 */
			function scrapy(start_urls, allowed_domains) {
				// concurrent
				// E.g., 20 pages to fetch / 4 = 5 rounds of fetching.
				var crt = Math.round(
					AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'] / 4);
					
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=200', //DEFAULT = 100
						'CONCURRENT_REQUESTS=' + crt, //DEFAULT = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=' + crt, //DEFAULT = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												o.try_autos_str +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// John Stockdale
	// Find Website Psychiatrists
	// NOTE: JUST WEBSITE
	// Combines dashboard_find_url with scrapy-powers dashboard.
	var s = '<p>Find Website&nbsp;for a given Psychiatry Practice</p>\n\n<ul>\n	<li>\n	<p>Search Google for <strong>first name, last name, city, </strong>and<strong> state</strong> to find <strong>website </strong>for listed psychiatrist. Start with "Google Search" and try other searches if needed.</p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				search_str: '',
				name: td[1].innerText.trim(),
				city:  td[3].innerText.trim(),
				state: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[1].innerText.trim(),
				//~ firm: td[3].innerText.trim(),
				//~ website: td[15].innerText.trim(),
				q: [
					document.getElementById('web_url'),
					//~ document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			// If website
			//~ if (td[15].innerText.trim() != '') {
				//~ o.sd_start_urls.push(td[15].innerText.trim());
				//~ o.sd_allowed_domains = [// Remove https & trailing / if present
					//~ o.sd_start_urls[0].replace(
						//~ /https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")
				//~ ];
				//~ // Add http if necessary.
				//~ o.sd_start_urls[0] =
					//~ (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ?
						//~ 'http://'+ o.sd_start_urls[0] :
						//~ o.sd_start_urls[0];
			//~ } else {
				//~ // ...
			//~ }
			// Build search string
			// it is the odd TDs
			// 1=doctor's name,3=firm name,5=street,7=city,9=state,
			// 11=zip,13=phone,15=website
			//~ for (var i=1; i<=13; i+=2) {
				//~ console.log(td[i]);
				//~ var x = td[i].innerText.trim();
				//~ if (x == '') continue;
				//~ if (x == 'NULL') continue;
				//~ if (x == 'NA') continue;
				//~ if (i == 5) continue; // skip exact street addr
				//~ if (i == 11) continue; // skip zip
				//~ if (i == 13) {// remove non-digits from phone for clean search
					//~ continue; // or rather, just skip it instead.
					//~ x = x.replace(/[\D]/g, ' ');
					//~ x = x.replace(/\s+/g, ' ');
					//~ //x = '('+x+' OR "")';
				//~ }
				//~ if (i == 1) { // exact name
					//~ x = x.split(' ');
					//~ if (x[0] == 'Dr.') x[0] = '';
					//~ x = x.join('" "');
					//~ x = '"'+x+'"';
				//~ }
				//~ o.search_str += ' '+x;
			//~ }
			//~ o.search_str = o.search_str.trim();
			
			// Exact name
			o.search_str = o.name+' '+o.city+' ('+o.state+' OR '+o.state.stateAbbrToFull()+') (therapist OR doctor OR physician OR physchiatrist OR md OR)';
			
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:440px;left:0%;width:99%;height:300px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.search_str;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			var d1d = document.createElement('div');
			d1d.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:400px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1d);
			/* END ITEMS */
			
			// innerHeight
			new AMT___core_factory().el_innerHeight({
				// This set the elements d1,d1b, and d1c
				// to fill up the whole window, minus their
				// distance from page top (top:XX pixels;).
				elements: [
					d1
				],
				offset: 440 // offset top
			});
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				//~ if (o.q[0].value.indexOf('@') == -1)
					//~ return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			/**
			 * find_url dashboard
			 */
			o.boldArray = o.name.clean_string_to_array();
			//~ o.spaced = '"' + o.comp.split(' ').join('" "') + '" ';
			//~ console.log(o);
			// create_dashboard_find_url
			AMT___items_factory.prototype.create_dashboard_find_url({
				search: {
					str_add_to_searches_hidden: ' (psychiatry OR psychiatrist OR doctor OR psychologist OR md OR)', //
					//~ use_duckduckgo_search_engine: true,
				},
				searches:[ // 
					o.name+' '+o.city,
					o.name+' '+o.city+' ('+o.state+' OR '+o.state.stateAbbrToFull()+')',
					o.name+' '+o.city+' ('+o.state+' OR '+o.state.stateAbbrToFull()+') "email"', //exact
				],
				search_results: {
					//~ use_domain_only: true,
					//~ use_full_urls: true,
					bold: {
						black: o.boldArray,
						//~ blue: o.boldArray2,
						//~ brown: o.boldArray3,
					},
					//~ url_modifier_callback: function(url) { // Add @ symbol
						//~ url = '@' + url;
						//~ return url;
						//~ // Add trailing slash
						//~ if (url[url.length-1] != '/')
							//~ url += '/';
						//~ return url;
					//~ },
					//~ url_ignore_test: function(obj) {
						//~ // Ignore URLs such as: imdb.com/title/tt2372855/news
						//~ // Only keeping URLs such as: imdb.com/title/tt2372855/
						//~ console.log(obj);
						//~ if (/\/dir\//.exec(obj.url)) {
							//~ // ignore .../dir/...
							//~ return true;
						//~ }
						//~ return false;
					//~ },
				},
				out_element: o.q[0],
				parent: d1d,
				//~ offsetTop: 40,
				//~ AmtRecordAndSubmit: true,
				AutoReturnAcceptIfZero: false,
			});
			
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'("email" OR "e-mail" OR "contact") '+o.search_str //"contact" OR 
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var num_found = 0;
				for (var i in rs) {
					// skips
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						num_found++;
					}
					if (num_found >= 2) break; // Only a few start URLs!
					// no skips
					//~ o.sd_start_urls.push(rs[i][0]);
					//~ num_found++;
					//~ if (num_found >= 2) break; // Only a few start URLs!
				}
				// None?
				if (num_found == 0) {
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					return;
				}
				console.log(o); // dbg
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=8', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=6', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										//~ new AMT___core_factory().
											//~ iframe2parent__postMessage( //
												//~ {
													//~ action: 'return_and_accept'
												//~ }
											//~ );
										// ADD TO TABS QUEUE
										addToTabsQ();
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.url;//.replace(/^(https?:\/+[^\/]+)/i, '$1'); // Remove trailing
										//~ o.q[1].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// John Stockdale (feeling lucky, url+email)
	// 
	// Feeling lucky
	var s = '<p>Find Website and Email Address for Speech Therapist</p>\n\n<ul>\n	<li>\n	<p>Search Google for <strong>first name, last name, city, state</strong> to find <strong>website </strong>for listed speech therapist.</p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				search_str: '',
				fname: td[1].innerText.trim(),
				lname: td[3].innerText.trim(),
				city:  td[5].innerText.trim(),
				state: td[7].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[1].innerText.trim(),
				//~ firm: td[3].innerText.trim(),
				//~ website: td[15].innerText.trim(),
				q: [
					document.getElementById('web_url'),
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
			try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			// If website
			//~ if (td[15].innerText.trim() != '') {
				//~ o.sd_start_urls.push(td[15].innerText.trim());
				//~ o.sd_allowed_domains = [// Remove https & trailing / if present
					//~ o.sd_start_urls[0].replace(
						//~ /https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")
				//~ ];
				//~ // Add http if necessary.
				//~ o.sd_start_urls[0] =
					//~ (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ?
						//~ 'http://'+ o.sd_start_urls[0] :
						//~ o.sd_start_urls[0];
			//~ } else {
				//~ // ...
			//~ }
			// Build search string
			// it is the odd TDs
			// 1=doctor's name,3=firm name,5=street,7=city,9=state,
			// 11=zip,13=phone,15=website
			//~ for (var i=1; i<=13; i+=2) {
				//~ console.log(td[i]);
				//~ var x = td[i].innerText.trim();
				//~ if (x == '') continue;
				//~ if (x == 'NULL') continue;
				//~ if (x == 'NA') continue;
				//~ if (i == 5) continue; // skip exact street addr
				//~ if (i == 11) continue; // skip zip
				//~ if (i == 13) {// remove non-digits from phone for clean search
					//~ continue; // or rather, just skip it instead.
					//~ x = x.replace(/[\D]/g, ' ');
					//~ x = x.replace(/\s+/g, ' ');
					//~ //x = '('+x+' OR "")';
				//~ }
				//~ if (i == 1) { // exact name
					//~ x = x.split(' ');
					//~ if (x[0] == 'Dr.') x[0] = '';
					//~ x = x.join('" "');
					//~ x = '"'+x+'"';
				//~ }
				//~ o.search_str += ' '+x;
			//~ }
			//~ o.search_str = o.search_str.trim();
			
			// Exact name
			o.search_str = '"'+o.fname+'" "'+o.lname+'" '+o.city+' ('+o.state+' OR '+o.state.stateAbbrToFull()+') (therapist OR doctor OR physician OR physchiatrist)';
			
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.search_str ;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			//~ d1c.innerText = (o.name != '') ? o.name : o.firm;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'("email" OR "e-mail" OR "contact") '+o.search_str //"contact" OR 
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length && o.website == '') {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var num_found = 0;
				for (var i in rs) {
					// skips
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						num_found++;
					}
					if (num_found >= 2) break; // Only a few start URLs!
					// no skips
					//~ o.sd_start_urls.push(rs[i][0]);
					//~ num_found++;
					//~ if (num_found >= 2) break; // Only a few start URLs!
				}
				// None?
				if (num_found == 0 && o.website == '') {
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				console.log(o); // dbg
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=8', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=6', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								contexts_bold_array: // array for contexts
									[o.fname, o.lname],
								sort_results: {
									sarray: // sort
										[o.fname, o.lname],
									levensht: o.fname+''+o.lname, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.url.replace(/^(https?:\/+[^\/]+)/i, '$1'); // Remove trailing
										o.q[1].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Micaela Mathre
	// Collect email addresses
	// Feeling lucky
	var s = '<p><b>Reference the Job Title, Name, College or University and Country for each contact. Search the internet for their professional email address.&nbsp;</b></p>\n\n<p><b>1.) Enter the email address.&nbsp;</b></p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByClassName('well');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				search_str: '',
				//~ dept: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				fname: td[2].innerText.trim(),
				lname: td[1].innerText.trim(),
				school: td[0].innerText.trim(),
				//~ firm: td[3].innerText.trim(),
				//~ website: td[15].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			// If website
			//~ if (td[15].innerText.trim() != '') {
				//~ o.sd_start_urls.push(td[15].innerText.trim());
				//~ o.sd_allowed_domains = [// Remove https & trailing / if present
					//~ o.sd_start_urls[0].replace(
						//~ /https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")
				//~ ];
				//~ // Add http if necessary.
				//~ o.sd_start_urls[0] =
					//~ (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ?
						//~ 'http://'+ o.sd_start_urls[0] :
						//~ o.sd_start_urls[0];
			//~ } else {
				//~ // ...
			//~ }
			// Build search string
			// it is the odd TDs
			// 1=doctor's name,3=firm name,5=street,7=city,9=state,
			// 11=zip,13=phone,15=website
			//~ for (var i=1; i<=13; i+=2) {
				//~ console.log(td[i]);
				//~ var x = td[i].innerText.trim();
				//~ if (x == '') continue;
				//~ if (x == 'NULL') continue;
				//~ if (x == 'NA') continue;
				//~ if (i == 5) continue; // skip exact street addr
				//~ if (i == 11) continue; // skip zip
				//~ if (i == 13) {// remove non-digits from phone for clean search
					//~ continue; // or rather, just skip it instead.
					//~ x = x.replace(/[\D]/g, ' ');
					//~ x = x.replace(/\s+/g, ' ');
					//~ //x = '('+x+' OR "")';
				//~ }
				//~ if (i == 1) { // exact name
					//~ x = x.split(' ');
					//~ if (x[0] == 'Dr.') x[0] = '';
					//~ x = x.join('" "');
					//~ x = '"'+x+'"';
				//~ }
				//~ o.search_str += ' '+x;
			//~ }
			o.search_str = '"' + o.fname + '" "' + o.lname + '" ' + o.school;
			
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.search_str ;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			//~ d1c.innerText = (o.name != '') ? o.name : o.firm;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'site:.edu ("email" OR "e-mail" OR "contact" OR "mail" OR "write" OR "message") '+o.search_str //"contact" OR 
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length && o.website == '') {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var num_found = 0;
				for (var i in rs) {
					// skips
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						num_found++;
					}
					if (num_found >= 2) break; // Only a few start URLs!
					// no skips
					//~ o.sd_start_urls.push(rs[i][0]);
					//~ num_found++;
					//~ if (num_found >= 2) break; // Only a few start URLs!
				}
				// None?
				if (num_found == 0 && o.website == '') {
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				console.log(o); // dbg
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								contexts_bold_array: // array for contexts
									[o.fname, o.lname],
								sort_results: {
									sarray: // sort
										[o.fname, o.lname],
									levensht: o.fname+o.lname, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Jon Taylor
	// Find The Email Address For The Optician
	// Feeling lucky
	var s = '<div class="panel panel-primary"><!-- WARNING: the ids "collapseTrigger" and "instructionBody" are being used to enable expand/collapse feature --><a class="panel-heading" href="javascript:void(0);" id="collapseTrigger"><strong>Data Collection Instructions</strong> <span class="collapse-text">(Click to expand)</span> </a>\n\n<div class="panel-body" id="instructionBody">\n<p><u><strong>Locating an Email Address: Everything You Need to Know</strong></u><br>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				search_str: '',
				//~ fname: td[3].innerText.trim(),
				//~ lname: td[1].innerText.trim(),
				//~ school: td[7].innerText.trim(),
				//~ dept: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				name: td[1].innerText.trim(),
				firm: td[3].innerText.trim(),
				website: td[15].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			// If website
			if (td[15].innerText.trim() != '') {
				o.sd_start_urls.push(td[15].innerText.trim());
				o.sd_allowed_domains = [// Remove https & trailing / if present
					o.sd_start_urls[0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")
				];
				// Add http if necessary.
				o.sd_start_urls[0] =
					(!/^https?:\/\//i.exec(o.sd_start_urls[0])) ?
						'http://'+ o.sd_start_urls[0] :
						o.sd_start_urls[0];
			} else {
				// ...
			}
			// Build search string
			// it is the odd TDs
			// 1=doctor's name,3=firm name,5=street,7=city,9=state,
			// 11=zip,13=phone,15=website
			for (var i=1; i<=13; i+=2) {
				console.log(td[i]);
				var x = td[i].innerText.trim();
				if (x == '') continue;
				if (x == 'NULL') continue;
				if (x == 'NA') continue;
				if (i == 5) continue; // skip exact street addr
				if (i == 11) continue; // skip zip
				if (i == 13) {// remove non-digits from phone for clean search
					continue; // or rather, just skip it instead.
					x = x.replace(/[\D]/g, ' ');
					x = x.replace(/\s+/g, ' ');
					//x = '('+x+' OR "")';
				}
				if (i == 1) { // exact name
					x = x.split(' ');
					if (x[0] == 'Dr.') x[0] = '';
					x = x.join('" "');
					x = '"'+x+'"';
				}
				o.search_str += ' '+x;
			}
			o.search_str = o.search_str.trim();
			
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.search_str ;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = (o.name != '') ? o.name : o.firm;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'("email" OR "e-mail" OR "contact") '+o.search_str //"contact" OR 
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length && o.website == '') {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var num_found = 0;
				for (var i in rs) {
					// skips
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						num_found++;
					}
					if (num_found >= 2) break; // Only a few start URLs!
					// no skips
					//~ o.sd_start_urls.push(rs[i][0]);
					//~ num_found++;
					//~ if (num_found >= 2) break; // Only a few start URLs!
				}
				// None?
				if (num_found == 0 && o.website == '') {
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				console.log(o); // dbg
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Dominic St-Pierre
	// Collect email addresses
	// Feeling lucky
	var s = '<li>Search for email of the person</li>\n	<li>Validate the email address.</li>\n	<li>If email bounces, please do not submit. All submitted email addresses will be checked and invalid ones will be rejected.</li>\n	<li>If email address works, please submit it in E-mail address field below.</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				search_str: '',
				//~ fname: td[3].innerText.trim(),
				//~ lname: td[1].innerText.trim(),
				//~ school: td[7].innerText.trim(),
				//~ dept: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				name: td[1].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			// build string
			// it is the odd TDs
			for (var i=1; i<=11; i+=2) {
				console.log(td[i]);
				var x = td[i].innerText.trim();
				if (x == 'NULL') continue;
				if (x == 'NA') continue;
				if (i == 5) continue; // bad phones
				if (i == 1) { // exact name
					x = x.split(' ');
					x = x.join('" "');
					x = '"'+x+'"';
				}
				o.search_str += ' '+x;
			}
			o.search_str = o.search_str.trim();
			//~ o.name = o.fname + ' ' + o.lname;
			//~ o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			//~ o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.search_str ;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'("email" OR "e-mail") '+o.search_str //"contact" OR 
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var num_found = 0;
				for (var i in rs) {
					// skips
					var dm = rs[i][0].replace(
						/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2");
					if (!o.SKIP_SITES.hasOwnProperty( dm )) {
						o.sd_start_urls.push(rs[i][0]);
						num_found++;
					}
					if (num_found >= 6) break; // Only a few start URLs!
					// no skips
					//~ o.sd_start_urls.push(rs[i][0]);
					//~ num_found++;
					//~ if (num_found >= 2) break; // Only a few start URLs!
				}
				// None?
				if (num_found == 0) {
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[1],
								skip_if_no_emails: true,
								accept_if_emails: true,
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Corey #2
	// Find the Contact Information for the College Instructors
	// Feeling lucky
	var s = '<li>Go to the school website.</li>\n	<li>Find the faculty directory. &nbsp;Locate the instructor&nbsp;listed below.&nbsp;</li>\n	<li>If there are multiple instructors&nbsp;by that name, the person we are looking for teaches in';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				fname: td[3].innerText.trim(),
				lname: td[1].innerText.trim(),
				school: td[7].innerText.trim(),
				dept: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.name = o.fname + ' ' + o.lname;
			//~ o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			//~ o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.name + ' | ' + o.school + ' | ' + o.dept;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'(site:.edu OR site:edu.* OR site:.ac OR site:ac.* OR site:.ac.at OR site:.ac.uk) ("email" OR "contact" OR "e-mail") '+o.name+' '+o.school+' '+o.dept
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (i >= 3) break; // Only a few start URLs!
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=60', //DEFAUL = 100
						'CONCURRENT_REQUESTS=6', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=4', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[1],
								skip_if_no_emails: true,
								accept_if_emails: true,
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Corey
	// Find the Contact Information for the College Instructors
	// Feeling lucky
	var s = '<li>Go to the school website.</li>\n	<li>Find the faculty directory. &nbsp;Locate the instructor&nbsp;listed below.&nbsp;</li>\n	<li>If there are multiple instructors&nbsp;by that name, use the department to help identify correct person</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() { console.log('');
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				name: td[1].innerText.trim(),
				school: td[3].innerText.trim(),
				dept: td[5].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			if (o.name.indexOf(',') != -1) {
				// reverse
				var x = o.name.split(',');
				if (x.length > 2) {
					// do nothing
				} else {
					o.name = x[1].trim() +' '+ x[0].trim();
				}
			}
			//~ o.name = o.fname + ' ' + o.lname;
			//~ o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			//~ o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.name + ' | ' + o.school + ' | ' + o.dept;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.2em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent(
							'(site:.edu OR site:edu.* OR site:.ac OR site:ac.* OR site:.ac.at OR site:.ac.uk) ("email" OR "contact" OR "e-mail") '+o.name+' '+o.school
						) + opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (i >= 3) break; // Only a few start URLs!
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=50', //DEFAUL = 100
						'CONCURRENT_REQUESTS=8', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=4', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[1],
								skip_if_no_emails: true,
								accept_if_emails: true,
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Facten
	// Find the Email of these University Researchers
	// Feeling lucky
	var s = '<li>Click the button below to do a Google Search for this person. (You can also use any other mean than Google to complete that task. You can edit the search, for example to add pieces of the affiliation if the name is too common and the search needs to be further focused)</li>\n	<li>Find their homepage (or any page that would contain contact information) and <strong>fill the fields</strong></li>\n	<li>If some or all of the information is not available from the 1st page of the Google Search, that\'s OK, <strong>complete as much as you can</strong> then simply check the "not available" checkbox at the bottom. You need not add that as a comment. We are keeping the time limit at a few minutes for each HIT because the goal here is not to hunt for a very long time to get an email at all cost. If it\'s really difficult to find, it is possibly not valid anymore, not used etc. Move on. If other workers were not able to find a valid email, there might be none to find and it will not impact your quality score.</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				name: td[1].innerText.trim(),
				school: td[3].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('homepage'),
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			//~ o.name = o.fname + ' ' + o.lname;
			//~ o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			//~ o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.name + ' | ' + o.school;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent('(site:.edu OR site:.ac OR site:ac.* OR site:.ac.at OR site:.ac.uk) ("email" OR "contact" OR "e-mail") '+o.name+' '+o.school) +
						opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (i >= 3) break; // Only a few start URLs!
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
				var req = new AMT___requests_factory();
				AMT___POPUP__initializeGlobals(
					function() {
						req.scrapy__begin_scrape( //parameters_object, callback_function, seed_object
							s_obj,
							(new AMT___items_factory()).create_dashboard__powers_v1,
							{
								// add PREVIEW all snippets
								div: d1,
								input_send_success: o.q[1],
								skip_if_no_emails: true,
								accept_if_emails: true,
								contexts_bold_array: // array for contexts
									o.name.split(' '),
								sort_results: {
									sarray: // sort
										o.name.split(' '),
									levensht: o.name, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								// this.url
								// this.email
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										&&
										/^https?:\/\/[\d\D]{8,}/i.exec(this.url) // Must be url-like.
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.url;
										o.q[1].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Andrea Narvaez
	// Find Emails for Contacts DREAM 2017
	// Feeling lucky
	var s = '<li>Search the internet to find the contact that matches the first name, last name and job title (provided in most cases) who works at the institution</li>\n	<li>TIP: These contacts work for colleges, universities or higher education organizations— the school\'s or institution\'s websites are often a good first place to look for an email</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [],
				sd_allowed_domains: [],
				school: td[1].innerText.trim(),
				fname: td[13].innerText.trim(),
				lname: td[15].innerText.trim(),
				title: td[17].innerText.trim(),
				name: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.name = o.fname + ' ' + o.lname;
			//~ o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			//~ o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.name + '|' + o.title + '|' +
				td[17].innerText.trim()+' '+o.school;
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				//~ if (o.sd_allowed_domains[0] != '') {
					//~ ssite = 'site:'+o.sd_start_urls[0];
				//~ } else { // Skip these!
					//~ //ssite = '';
					//~ new AMT___core_factory().
						//~ iframe2parent__postMessage( //
							//~ {
								//~ action: 'return_and_accept'
							//~ }
						//~ );
					//~ return;
				//~ }
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' +
						encodeURIComponent('site:.edu ("email" OR "contact" OR "e-mail") '+o.name+' '+o.title+' '+o.school) +
						opts,
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				//o.sd_start_urls
				//o.sd_allowed_domains
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// R&A
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				// TODO: MAKE SURE NOT IN SKIPS!!
				// TODO: MAKE ALLOWED_DOMAINS ONLY THOSE IN THIS LIST.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (i >= 2) break; // Only a few start URLs!
				}
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			
			/**
			 * function scrapy
			 * 
			 * TODO:
			 * 		Feature:
			 * 			Sort results by the "relevance". In particular,
			 * 			sort by number of matches of array [ search items ],
			 * 			such as [ first_name, last_name, job_title, etc.].
			 * 		Feature:
			 *	 		Add BOLD to snippet text!!
			 */
			function scrapy(start_urls, allowed_domains) {
				//
				var s_obj =
				{
					project: 'scrapy_amt',
					spider: 'AMTSpider',
					arg_allowed_domains: allowed_domains,	// array
					arg_start_urls: start_urls,		// array
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=100', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=8', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								contexts_bold_array: // array for contexts
									o.fname.split(' ').concat(
									o.lname.split(' ')),
								sort_results: {
									sarray: // sort
										o.fname.split(' ').concat(
										o.lname.split(' ')),
									levensht: o.fname + o.lname, // A string to match levenshtein.
								},
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// John Stockdale
	// Find contact email for website
	// try_autos is *FALSE*.
	var s = '<p>Search all pages of website first. Search https://whois.icann.org/en if necessary for the therapist\'s email. If not available from any source&nbsp;put na@example.com (these will be manually checked). Thanks!</p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var a = document.getElementsByTagName('a');
			var o = {
				sd_start_urls: [a[1].href],
				sd_allowed_domains: null,
				name: a[2].innerText.trim(),
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: false, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			var d1c = document.createElement('div');
			d1c.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:50%;height:40px;overflow:hidden;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1c);
			d1c.innerText = o.name;
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("contact" OR "about" OR "email" OR '+o.name+')') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
					arg_type_scrape: 'all_emails',	// all_emails or str_match
					settings: [
						//'DEPTH_LIMIT=4',
						//'SCHEDULER_ORDER=BFO',
						'LOG_LEVEL=ERROR', // DEFAULT = DEBUG
						//~ 'LOG_LEVEL=DEBUG', // DEFAULT = DEBUG
						'CONCURRENT_ITEMS=200', //DEFAUL = 100
						'CONCURRENT_REQUESTS=16', //DEFAUL = 16
						'CONCURRENT_REQUESTS_PER_DOMAIN=12', //DEFAUL = 8
						'AJAXCRAWL_ENABLED=1', //true
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_autos) { // Only when autos.
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Stefan Mateescu
	// Collect data from a Website
	// 
	var s = '<p>Click the link below to review the Website. Collect the following information if it\'s available:<\/p>\n\n<ul>\n	<li>Email</li>\n</ul>';
	var s2= '<label for="email">Email address:</label> <input class="form-control" id="email" name="email" placeholder="e.g. example@email.com" type="email">';
	if (ih.indexOf(s) != -1 && ih.indexOf(s2) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); //meh
			//
			var a = document.getElementsByTagName('a');
			var o = {
				sd_start_urls: [a[1].href],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var first = true;
				for (var i in rs) {
					if (i < 3)
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length && o.try_autos) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									} else if (!callback_obj.matches.length) {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// PACED Ltd.
	// Collect email addresses from a Website
	// A82ZMBH9P2V5A
	// 
	var s = '<p>Click the link below to review the Website. Collect the following information if it\'s available:</p>\n\n<ul>\n	<li>Contact email</li>\n</ul>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			// Move container down the page so it is not hidden by our work screens.
				GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:1000px !important;}');
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var a = document.getElementsByTagName('a');
			var o = {
				sd_start_urls: [a[2].href],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
								callback__scrapy__begin_scrape__process_completed: function(callback_obj) {
									// RETURNS: TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
									if (AMT__Global_Vars.isPreview) {
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length && o.try_autos) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										// ...Send a message to the top window and
										// ...tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// David Tera
	// Find the Website and Email address of company based on company information
	// 
	// 
	var s = '<li><strong>If there is no website address provided here, find their official site through Google.</strong></li>\n	<li>If you don\'t find the company, you can add "architecture" after the name. These are all architects.</li>';
	var s2 = '	<li>If there is no website address provided here for the company&nbsp;OR the link goes to a portfolio site,&nbsp;<strong>find their official site through Google or through a link provided at the portfolio site.</strong></li>';
	if (ih.indexOf(s) != -1 || ih.indexOf(s2) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			//~ GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[3].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != '') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length && o.try_autos) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Sherry Gould
	// Find the Email Address for Company
	// 
	// 
	var s = 'Email address:</label> <input class="form-control" id="web_url" name="email_ad" placeholder="" required="" type="email"';
	var s2= '<td><label>Business site:</label></td>';
	//~ s = '<li>Enter the email address of the <strong>main</strong> contact for site feedback/administrative qeustions.</li>';
	if (ih.indexOf(s) != -1 && ih.indexOf(s2) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			GM_addStyle('#workContent {float:right}');
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[3].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				try_autos: true, // Turn on and off as necessary. Default=false (off)
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			// Set bird variable enable tabs queue to 0!
			// EnableTabsQ
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1');
			// If NA, then return.
			if (td[3].innerText.trim() == 'http://NA' ||
				td[3].innerText.trim() == 'NA') {
				new AMT___core_factory().
					iframe2parent__postMessage( //
						{
							action: 'return_and_accept'
						}
					);
				return;
			}
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:50%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;font-size:1.0em !important;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				var ssite;
				if (o.sd_allowed_domains[0] != 'na') {
					ssite = 'site:'+o.sd_start_urls[0];
				} else { // Skip these!
					//ssite = '';
					new AMT___core_factory().
						iframe2parent__postMessage( //
							{
								action: 'return_and_accept'
							}
						);
					return;
				}
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(ssite + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length && o.try_autos) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											'^(info|information|contact|contactus|inquiry|support|help|communication|export|exports)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//~ if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview && document.getElementById('MT__gm_returnaccept')) {
											//~ document.getElementById('MT__gm_returnaccept').click();
											//~ event.preventDefault();
											//~ return false;
										//~ }
										//~ else if(!AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
										//~ {
										//~ }
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Paul Phifer
	// Find the Webmaster or Site Administrator Email for a Website
	// 
	// 
	s = '<li>Enter the email address of the <strong>main</strong> contact for site feedback/administrative qeustions.</li>\n\t<li>If none exists, leave blank.</li>';
	//~ s = '<li>Enter the email address of the <strong>main</strong> contact for site feedback/administrative qeustions.</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:49%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_start_urls[0] + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										// NO AUTO ...
										//~ var mt = callback_obj.matches;
										//~ var reg = new RegExp(
											// '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											//~ '^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											//~ __js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											//~ 'i'
										//~ );
										//~ for (var i in mt) {
											//~ if  (
												//~ mt[i].email_email &&
												//~ mt[i].email_email.length > 6 &&
												//~ mt[i].email_email.indexOf('@') != -1 &&
												//~ reg.exec(mt[i].email_email)
												//~ )
											//~ {
												//~ document.body.style.zoom = '0.4';
												//~ o.q[0].value = mt[i].email_email;
												//~ doSubmit();
												//~ break; // Stop here
											//~ }
										//~ }
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//~ if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview && document.getElementById('MT__gm_returnaccept')) {
											//~ document.getElementById('MT__gm_returnaccept').click();
											//~ event.preventDefault();
											//~ return false;
										//~ }
										//~ else if(!AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
										//~ {
										//~ }
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Tait Larson
	// Find contact email address
	// 
	// 
	s = '<p>Find the contact email associated with the business from the businesses website or elsewhere on the internet.&nbsp;&nbsp;</p>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '20');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[3].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email'),
				],
				SKIP_SITES: {},
				util_url: null,
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d1b = document.createElement('div');
			d1b.setAttribute('style',
				'position:absolute;top:0px;left:50%;width:49%;height:40px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1b);
			d1b.innerText = o.sd_start_urls[0].replace(/https?:\/\//i, '');
			/* END ITEMS */
			
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
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				// SP search.
				var opts = '&hmb=1&_API_KEY_REDACTED_&vft=DCABQSMSVJUUTQN&cat=web&cmd=process_search&language=english&engine0=v1all&abp=-1&t=air&nj=0&pg=0NamePath';
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_start_urls[0] + ' ("contact" OR "about" OR "email")') + opts,
					callback_function: sp,
					host: MT___host
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ '^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											'^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//~ if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview && document.getElementById('MT__gm_returnaccept')) {
											//~ document.getElementById('MT__gm_returnaccept').click();
											//~ event.preventDefault();
											//~ return false;
										//~ }
										//~ else if(!AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
										//~ {
										//~ }
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// WebEduCo
	// Collect Email Address from Website
	// 
	// 
	//s = '<li>If there is no email address found on the website, then enter notfound@notfound.com into the Email field and notfound.com into the Email page URL field</li>';
	//s = '<li>Enter the email address for the website into the <strong>Email </strong>field. Use email from the school\'s general / main administration office where possible.</li>';
	s = '<li>Enter the email address in proper format (name@example.com)</li>\n	<li>If there is no email address found on the website, then enter notfound@notfound.com into the Email field and notfound.com into the Email page URL field</li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			new AMT___core_factory().createScriptVar('arg_max_pages_to_fetch', '40');
			new AMT___core_factory().createScriptVar('scrapy_do_web_search', '1');
			new AMT___core_factory().createScriptVar('EnableTabsQ', '1'); // MEHHHH.
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email_address'),
					document.getElementById('email_found_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				//~ auto_emails: ['info','contact','contactus','mail'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
				offset: 40 // offset top
			});
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				o.q[1].value = o.q[1].value.trim();
				if (o.q[1].value.length < 6 || o.q[1].value.indexOf('http') == -1)
					return false;
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			// Check bird var scrapy_do_websearch
			// Whether or not to do a web search to begin with.
			if (AMT__Global_Vars.scriptVars['scrapy_do_web_search'] == '1') {
				// Get skips file
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
			} else {
				// Else straight to scrapy...
				// scrapy_do_websearch
				// Init
				scrapy(o.sd_start_urls, o.sd_allowed_domains);
			}
			// Init
			function init(SKIP_SITES) {
				o.SKIP_SITES = SKIP_SITES; // Populate.
				// SP search.
				var req_proxy = new AMT___xhr_PROXY_REDACTED_({
					startPage: true,
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_start_urls[0] + ' ("contact" OR "about" OR "email" OR "scholarship")'),
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
					arg_max_pages_to_fetch: AMT__Global_Vars.scriptVars['arg_max_pages_to_fetch'],// Default=40
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									//~ addToTabsQ();
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										var mt = callback_obj.matches;
										var reg = new RegExp(
											//~ //'^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
											//~ '^(info|information|contact|contactus|inquiry|support|help|communication)@' +
											'^(scholarship|finaid|financialaid|scholarships)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										// No Autos: Oct 31 2017
										// They want the "scholarship department email" if university.
										// So ... ya.
										//~ for (var i in mt) {
											//~ if  (
												//~ mt[i].email_email &&
												//~ mt[i].email_email.length > 6 &&
												//~ mt[i].email_email.indexOf('@') != -1 &&
												//~ reg.exec(mt[i].email_email)
												//~ )
											//~ {
												//~ document.body.style.zoom = '0.4';
												//~ o.q[0].value = mt[i].email_email;
												//~ o.q[1].value = mt[i].url;
												//~ if (o.q[1].value.length < 6 || o.q[1].value.indexOf('http') == -1)
													//~ return false;
												//~ doSubmit();
												//~ break; // Stop here
											//~ }
										//~ }
									}
									else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									// CONTINUES (job is NOT in "preview" mode)
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										o.q[0].value = this.email;
										o.q[1].value = this.url;
										if (o.q[1].value.length < 6 || o.q[1].value.indexOf('http') == -1)
											return false;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Chris Richmond
	// Find contact email on the website of a hotel
	// icons, animations, sound effects and music, news coverage, news articles (third-party api)... screens class
	// 
	//~ s = '<li>As a last resort, use godaddy.com/whois or networksolutions.com/whois to locate email address for a&nbsp;webmaster. Please DO NOT use whois privacy contacts. And Please DO NOT use generic email addresses that aren\'t reletive to the domain (e.g. "domains@microsoft.com" or "abuse@abuseweb.net")</li>';
	//~ s = '<li>As a last resort, use godaddy.com/whois or networksolutions.com/whois to locate email address for webmaster, but please DO NOT use whois privacy contacts.</li>';
	//~ s = '<li>As a last resort, use godaddy.com/whois or networksolutions.com/whois to locate email address for a&nbsp;webmaster. Please DO NOT use whois privacy contacts. And Please DO NOT use generic email addresses that aren\'t reletive to the domain (e.g. "domains@microsoft.com" or "abuse@abuseweb.net")</li>';
	//~ s3 = '<li>If you absolutely cannot find an email address using any of the methods above, please enter a form URL. If you cannot find a form, please put "na" exactly. If you put NA and I find an email, I will reject your work.</li>';
	s = '<li>Enter the email address for the website URL listed.</li>\n	<li>If the URL listed is a page on a university or .gov website, please find an appropriate contact for that department or division.</li>\n	<li>If you absolutely cannot find an email address, please enter a form URL for contact.</li>';
	s2 = '<li>If you absolutely cannot find an email address using any of the methods above, please enter a form URL. If you cannot find a form, please put "na" exactly.</li>';
	s3 = '<li>Failure to abide by the rules above will be subject to possible rejection.</li>\n	<li>For na\'s, If I find an email address within the time constraints listed in the task outline, I will reject your work. *The same applies for forms.</li>';
	if (ih.indexOf(s) != -1 || ih.indexOf(s2) != -1 || ih.indexOf(s3) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;}');// Set width=width:30% !important;
			/*GM_addStyle('input[type="text"],select {width:80% !important;}');*/
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			// Call nextTab now...
			new AMT___core_factory().nextTab();
			//
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null,
				//~ auto_emails: ['info','contact','contactus','mail'],
				try_auto: true, // On Jan. 4 2017, Off Dec. 9 2016
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d2 = document.createElement('input');
			d2.type = 'text';
			d2.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:99%;height:38px;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d2);
			d2.value = td[1].innerText.trim();
			d2.onblur = start;
			/* END ITEMS */
			
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
			
			// ...
			document.getElementById('submitButton').onclick = function(e) {
				e.stopPropagation();
				e.preventDefault();
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
			}
			function start(e) {
				d1.parentNode.removeChild(d1);
				d1 = document.createElement('div'); // Reset d1
				d1.setAttribute('style',
					'position:absolute;top:40px;left:0%;width:99%;height:600px;overflow:auto;background-color:#eee;border:1px solid blue;'
				);
				document.body.appendChild(d1);
				// innerHeight
				new AMT___core_factory().el_innerHeight({
					elements: [
						d1
					],
					offset: 40 // offset top
				});
				o.sd_start_urls = [ d2.value ];
				o.sd_allowed_domains = [ o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2") ];
				o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
				new AMT___requests_factory().fs__load_skips({
					skips_key: 'austin_load_skips',
					callback: init,
					callback_err: function() {}
				});
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_start_urls[0] + ' ("contact" OR "about" OR "email")'),
					callback_function: sp,
					host: MT___host
				});
			}
			// SP
			function sp(response_obj) {
				var rs = response_obj;
				if (!rs.length) {
					// No URLs
					// Init
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
					return;
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										//~ addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									//~ addToTabsQ();
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										if (o.try_auto && !/(gov|edu)/i.exec(o.sd_allowed_domains[0])) {
											var mt = callback_obj.matches;
											var reg = new RegExp(
												//'^(circdesk|circ|reference|helpdesk|library|librarian|circulation)@' +
												'^(info|information|contact|contactus|inquiry|support|help|communication|hotel|chamber|hr)@' +
												__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
												'i'
											);
											for (var i in mt) {
												if  (
													mt[i].email_email &&
													mt[i].email_email.length > 6 &&
													mt[i].email_email.indexOf('@') != -1 &&
													reg.exec(mt[i].email_email)
													)
												{
													document.body.style.zoom = '0.4';
													o.q[0].value = mt[i].email_email;
													doSubmit();
													break; // Stop here
												}
											}
										}
									} else {
										// Auto return and accept because
										// there are no emails found.
										// R&A from global.js...
										//~ if(AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview && document.getElementById('MT__gm_returnaccept')) {
											//~ document.getElementById('MT__gm_returnaccept').click();
											//~ event.preventDefault();
											//~ return false;
										//~ }
										//~ else if(!AMT__Global_Vars.isTopWindow && !AMT__Global_Vars.isPreview)
										//~ {
										//~ }
										//Send a message to the top window and
										//tell it to return and acceptfresh
										new AMT___core_factory().
											iframe2parent__postMessage( //
												{
													action: 'return_and_accept'
												}
											);
										return false;
									}
									//
									addToTabsQ();
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										//~ document.body.style.zoom = '0.4';
										o.q[0].value = this.email;
										//~ showNextTab(); // Manually call this....
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// jpalglobal
	// Find contact email on the website of a hotel
	// 
	// 
	s = '<li>If there is<strong> no email available</strong>, put "<strong>no@gmail.com</strong>". &nbsp;You\'ll still get paid for your HIT.<span style="font-size: 0.9em; line-height: 1.6em;">&nbsp;</span></li>';
	if (ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			GM_addStyle('input[type="text"],select {width:80% !important;}');
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('email_found'),
				],
				SKIP_SITES: {},
				util_url: null,
				auto_emails: ['info','contact','contactus','mail','hotel'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			//~ o.util_url = o.sd_start_urls[0];
			o.q[0].value = '';
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' ("contact" OR "about" OR "email")'),
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
						'COOKIES_ENABLED=1', //false
						//'COOKIES_ENABLED=0', //false
						//'RETRY_ENABLED=0', //false
						//'DI=0', //false
						'REDIRECT_MAX_TIMES=2'//,
						//'DOWNLOAD_TIMEOUT=14' //ERR !? :"14 is not greater than or equal to 0 seconds"
						//'AJAXCRAWL_ENABLED=1', //true
					]
				}
				//scrapy__begin_scrape
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									addToTabsQ();
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										var mt = callback_obj.matches;
										//~ console.log(mt);
										var reg = new RegExp(
											'^(info|information|contact|contactus|inquiry|support|help|communication|hotel)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length > 6 &&
												mt[i].email_email.indexOf('@') != -1 &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												doSubmit();
												break; // Stop here
											}
										}
									}
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										document.body.style.backgroundColor = 'orange';
										//~ document.body.style.zoom = '0.4';
										o.q[0].value = this.email;
										showNextTab(); // Manually call this....
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Olga Svensen
	// Find general college email.
	// 
	// 
	s = '<p><strong>1. Go to the University URL above. Navigate to an email address of contact for th university.&nbsp;</strong></p>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			GM_addStyle('input[type="text"],select {width:80% !important;}');
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			new AMT___core_factory().createScriptVar('OS-TabsQueue', '0');
			
			var span = document.getElementsByTagName('span');
			var o = {
				sd_start_urls: [span[2].innerText.trim()],
				sd_allowed_domains: null,
				//~ comp: td[1].innerText.trim(),
				//~ name: td[3].innerText.trim(),
				q: [
					document.getElementById('Q2Url'),
				],
				SKIP_SITES: {},
				util_url: null,
				auto_emails: ['info','contact','contactus','admission','admissions'],
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			o.util_url = o.sd_start_urls[0];
			console.log(o);
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
				if (o.q[0].value.length < 6)
					return false;
				if (o.q[0].value.indexOf('@') == -1)
					return false;
				// Here?
				doSubmit();
				return false;
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' ("contact" OR "about" OR "email")'),
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
										return false;
									}
									// Add to tabs queue if not in preview
									if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
										addToTabsQ();
									}
									//~ document.body.style.backgroundColor = 'white';
									document.body.style.zoom = '1';
									addToTabsQ();
									
									// Let's try for some autos.
									// o.auto_emails = []
									/**
									 * {
									 *  email_contexts: Array[1]
									 *  email_email: "info@vaultcrossfit.com"
									 *  url: "https://www.facebook.com/VaultCrossfit/info
									 * }
									 */
									if (callback_obj.matches && callback_obj.matches.length) {
										var mt = callback_obj.matches;
										//~ console.log(mt);
										var reg = new RegExp(
											'^(info|information|register|contact|contactus|admission|admissions|admin|inquiry|registrar|support|help|helpdesk|communication)@' +
											__js_escape_regEx(o.sd_allowed_domains[0]) + '$',
											'i'
										);
										for (var i in mt) {
											if  (
												mt[i].email_email &&
												mt[i].email_email.length &&
												reg.exec(mt[i].email_email)
												)
											{
												document.body.style.zoom = '0.4';
												o.q[0].value = mt[i].email_email;
												//~ alert('auto');
												//~ new AMT___core_factory().shiftFarLeft();
												doSubmit();
												break; // Stop here
												//showNextTab();
											}
										}
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										//~ document.body.style.zoom = '0.4';
										o.q[0].value = this.email;
										showNextTab(); // Manually call this....
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Michael S. Bell
	// 
	// 
	// 
	s = '<li>Many law firm sites have listings of attorneys.&nbsp;Where posible, please locate that section of the website and browse or search for the indicated individual.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			GM_addStyle('input[type="text"],select {width:80% !important;}');
			//~ document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			document.body.style.zoom = '0.5'; // This is default for "loading".
			
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[5].innerText.trim()],
				sd_allowed_domains: null,
				comp: td[1].innerText.trim(),
				name: td[3].innerText.trim(),
				q: [
					document.getElementById('web_url'),
				],
				SKIP_SITES: {},
				util_url: null
				//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			console.log(o);
			o.util_url = o.sd_start_urls[0];
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
				if  (
						o.q[0].value.length < 6
					) {
					return false;
				}
				if  (
						o.q[0].value.indexOf('@') == -1
					) {
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' ' + o.name),
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
									} else { // Add to tabs queue if not in preview
										new AMT___core_factory().createScriptVar('MSBell-TabsQueue', '0');
										if (AMT__Global_Vars.scriptVars['MSBell-TabsQueue'] == '1') {
											addToTabsQ();
										}
										//~ document.body.style.backgroundColor = 'white';
										document.body.style.zoom = '1';
										//~ addToTabsQ();
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										doSubmit();
									}
								},
							}
						);
					}
				);
			}
		}
		new run().f();
		return false;
	}
	// Alex Castro
	// Find the contact email for websites
	// Do scrapy. With accepted open URL in utility window.
	// 3OLDKDGFCL5K40RAOQFAJGFWMRLODG
	//
	s = '<li>If neither a contact email or contact form page can be found, simply write "<strong>None</strong>" below.</li>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {margin-bottom:-10px !important; table-layout:fixed;word-wrap:break-word;width:100%;}'); // Fixed. Break-word.
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;}');// Set width
			GM_addStyle('#Q2Url {width:80% !important;height:40px;}');// Set width
			GM_addStyle('input[type="radio"] {zoom:2;cursor:pointer;}');
			
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var td = document.getElementsByTagName('td');
			var o = {
				sd_start_urls: [td[1].innerText.trim()],
				sd_allowed_domains: null,
				q: [
					document.getElementById('contact_info'),
				],
				SKIP_SITES: {},
				util_url: null
				//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			o.sd_start_urls[0] = (!/^https?:\/\//i.exec(o.sd_start_urls[0])) ? 'http://'+ o.sd_start_urls[0] : o.sd_start_urls[0];
			console.log(o);
			o.util_url = o.sd_start_urls[0];
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
				if  (
						o.q[0].value.length < 6
					) {
					return false;
				}
				if  (
						o.q[0].value.indexOf('@') == -1 && // not contains @
						o.q[0].value.indexOf('http') != 0  // not start http 
					) {
					return false;
				}
				//~ return false;
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' ("contact" OR "about")'),
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
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (first) {
						o.util_url = rs[i][0];
						first = false;
					}
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
										new AMT___core_factory().createScriptVar('olga-s-tabs-queue', '0');
										new AMT___core_factory().createScriptVar('olga-s-view utility site', '1');
										alert('testing');
										if (AMT__Global_Vars.scriptVars['olga-s-tabs-queue'] == '1') {
											addToTabsQ();
										}
										document.body.style.backgroundColor = 'white';
										
										if(AMT__Global_Vars.scriptVars['olga-s-view utility site'] != '0') {
											// Open Utility
											AMT__setUtilityTabs([
											{
												url: o.util_url, //o.sd_start_urls[0],
												options: {
													task: 'AMT__all_pages_util',
													highlight_range_to_parent: true,
													email_links_remove_mailto: true,
													email_links_click_to_parent: true,
													highlight_strings_in_page: {
														strings: ['contact us','contact', 'about', 'mail', 'email', 'e-mail']
													},
												}								
											}], {}, {}, false,
											function(response){
												console.log(response);
												var text = response.data.text_range.trim();
												if(text.indexOf('@') != -1) {
													o.q[0].value = text;
													o.q[0].focus();
												}
											});
										}
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										doSubmit();
										//~ var found = false;
										//~ for (var i=1; i<=3; i++) {
											//~ if (o.q[i].checked) {
												//~ found = true;
											//~ }
										//~ }
										//~ if (found)
											//~ doSubmit();
									}
								},
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
	// Olga Svensen
	// Find email addresses of American Universities! (Actually, Peronal/Professional/Facebook/Flickr/Social/Other)
	// Do scrapy. With accepted open URL in utility window.
	// 3BHDZRMFLO7X781S8JJ88H9E37DV73
	s = '<div style=""><label>2. Please select which type of website this is.</label></div>';
	if(ih.indexOf(s) != -1)
	{
		var run = function() {}
		run.prototype.f = function() {
			GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
			GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
			//~ GM_addStyle('table {margin-bottom:-10px !important; table-layout:fixed;word-wrap:break-word;width:100%;}'); // Fixed. Break-word.
			GM_addStyle('.container {margin:0 !important;padding:0 !important;width:30% !important;margin-top: 60px !important;}');// Set width
			GM_addStyle('#Q2Url {width:80% !important;height:40px;}');// Set width
			GM_addStyle('input[type="radio"] {zoom:2;cursor:pointer;}');
			GM_addStyle('.exe:hover {background-color:LightGreen !important;cursor:pointer;}');
			
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var spans = document.getElementsByTagName('span');
			var o = {
				sd_start_urls: [spans[0].innerText.trim()],
				sd_allowed_domains: null,
				q: [
					document.getElementById('Q2Url'),
					document.getElementsByName('topic')[0],
					document.getElementsByName('topic')[1],
					document.getElementsByName('topic')[2],
				],
				SKIP_SITES: {},
				util_url: null
				//,
				//~ auto_emails: ['info','contact','contactus']
			}
			o.sd_allowed_domains = [o.sd_start_urls[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/,"$2")]; // Remove https & trailing / if present
			console.log(o);
			o.q[1].checked = true;
			o.util_url = o.sd_start_urls[0];
			
			/* BEGIN ITEMS */
			var d1 = document.createElement('div');
			d1.setAttribute('style',
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d1);
			var d2 = document.createElement('div');
			d2.setAttribute('style',
				'position:absolute;top:0px;left:0%;width:30%;height:60px;overflow:auto;background-color:#eee;border:1px solid blue;'
			);
			document.body.appendChild(d2);
			d2.className = 'exe';
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
				if  (
						o.q[0].value.length < 6
					) {
					return false;
				}
				if  (
						o.q[0].value.indexOf('@') == -1 && // not contains @
						o.q[0].value.indexOf('http') != 0  // not start http 
					) {
					return false;
				}
				//~ return false;
				// Here?
				doSubmit();
			}
			d2.onclick = function() {
				if (this.contact_url && /^https?:\/\/[\d\D]{6,}/.exec(this.contact_url)) { // 6 or more
					this.style.backgroundColor = 'yellow';
					o.q[0].value = this.contact_url;
					doSubmit();
				}
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' ("contact" OR "about")'),
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
				}
				// Look for Facebook pages in results.
				// And secondly check if first result is a "non-skip" result,
				// in which case add to both o.sd_start_urls and o.sd_allowed_domains.
				var first = true;
				for (var i in rs) {
					o.sd_start_urls.push(rs[i][0]);
					if (first) {
						o.util_url = rs[i][0];
						first = false;
						// Set d2
						d2.innerText = rs[i][0];
						d2.contact_url = rs[i][0];
					}
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
										//new AMT___core_factory().createScriptVar('olga-s-tabs-queue', '0');
										new AMT___core_factory().createScriptVar('view utility site', '1');
										if (AMT__Global_Vars.scriptVars['olga-s-tabs-queue'] == '1') {
											addToTabsQ();
										}
										document.body.style.backgroundColor = 'white';
										
										if(AMT__Global_Vars.scriptVars['view utility site'] != '0') {
											// Open Utility
											AMT__setUtilityTabs([
											{
												url: o.util_url, //o.sd_start_urls[0],
												options: {
													task: 'AMT__all_pages_util',
													highlight_range_to_parent: true,
													email_links_remove_mailto: true,
													email_links_click_to_parent: true,
													highlight_strings_in_page: {
														strings: ['contact us','contact', 'about', 'mail', 'email', 'e-mail']
													},
												}								
											}], {}, {}, false,
											function(response){
												console.log(response);
												var text = response.data.text_range.trim();
												if(text.indexOf('@') != -1) {
													o.q[0].value = text;
													o.q[0].focus();
												}
											});
										}
									}
									
									// CONTINUES (job is NOT in "preview" mode)
									return false;
								},
								// What to do onclick
								input_onclick_callback: function() {
									this.style.backgroundColor = 'LightGreen';
									if  (
										this.email.length > 6 &&
										this.email.indexOf('@') != -1 &&
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										var found = false;
										for (var i=1; i<=3; i++) {
											if (o.q[i].checked) {
												found = true;
											}
										}
										if (found)
											doSubmit();
									}
								},
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
	// Olga Svensen
	// Find email addresses of American Universities!
	// Search for "engineering" or "cs". Then scrapy.
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
			GM_addStyle('#Q2Url {width:80% !important;}');// Set width
			
			document.body.style.backgroundColor = 'orange'; // This is default for "loading".
			
			var spans = document.getElementsByTagName('span');
			var o = {
				sd_start_urls: [spans[2].innerText.trim()],
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
				'position:absolute;top:0px;left:30%;width:70%;height:400px;overflow:auto;background-color:#eee;border:1px solid blue;'
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
					url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent('site:'+o.sd_allowed_domains[0] + ' contact ("engineering" OR "computer science" OR "cs")'),
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
	// McKenna Sweazey
	// Find the email Address format for companies
	// Startpage Find URL, then Scrapy
	s = '<li>Only starting with the @ symbol so for Google, @google.com</li>';
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
				compShort: td[1].innerText.trim(),
				country: td[3].innerText.trim(),
				sd_start_urls: [],
				sd_allowed_domains: [],
				q: [
					document.getElementById('web_url')
				]
			}
			//~ o.sd_allowed_domains[0] = o.sd_allowed_domains[0].replace(/https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/, "$2"); //.replace(/https?\:\/\/[w]*\.?([^/]*)\/*/,"$1");
			if(o.compShort.split(' ').length >= 2)
				o.compShort = '"' + o.compShort.trim().split(' ').slice(0,2).join('" "').trim() + '"';
			else
				o.compShort = '"' + o.compShort.trim().split(' ').join('" ').trim() + '"';
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
					o.compShort,
					o.comp+' "'+ o.country + '"'
				],
				load_success_callback: function() {
					addToTabsQ(); // Add to tabs queue.
					
				},
				//~ out_element:,
				onclick_success: function(e) { //PROVIDES:// button.click // this.value, this.full_url
					// shownext
					showNextTab();
					o.util_url = this.value;
					new AMT___core_factory().createScriptVar('Utility Window?',0);
					if(AMT__Global_Vars.scriptVars['Utility Window?'] != '0') {
						AMT__setUtilityTabs([
						{
							url: o.util_url, //o.sd_start_urls[0],
							options: {
								task: 'AMT__all_pages_util',
								highlight_range_to_parent: true,
								email_links_remove_mailto: true,
								email_links_click_to_parent: true,
								highlight_strings_in_page: {
									strings: ['contact us','contact', 'about', 'mail', 'email', 'e-mail']
								},
							}								
						}], {}, {}, false,
						function(response){
							console.log(response);
							var text = response.data.text_range.trim();
							if(text.indexOf('@') != -1) {
								o.q[0].value = text;
								o.q[0].focus();
							}
						})
					}
					
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
										var auto = true;
										for(var i = 0; i < callback_obj.matches.length;i++) {
											var tmp = callback_obj.matches[i].email_email.trim();
											tmp = tmp.replace(/^[^\@]+@/,'');
											tmp = tmp.toLowerCase();
											console.log(tmp);
											console.log(o.sd_allowed_domains[0]);
											if(tmp != o.sd_allowed_domains[0].toLowerCase()) {
												auto = false;
												console.log(tmp + '!=' + o.sd_allowed_domains[0]);
											}
										}
										if(callback_obj.matches.length == 0)
											auto = false
										console.log(callback_obj);
										if(!auto) {
											console.log('No Auto');
											addToTabsQ();
										}
										else {
											console.log(d1b);
											o.q[0].value = callback_obj.matches[0].email_email.replace(/^[^\@]+/,'').trim();
											if(o.q[0].value.indexOf('@') != -1 && o.q[0].value.length > 3) {
												doSubmit();
											}
											//d1b.getElementsByTagName('div')[1].click();
										}
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
										!/[\/\(\)\[\]\{\}%\|]/i.exec(this.email) // ...Exclude: anything that contains /, (), [], {}, %, |, 
										)
									{
										o.q[0].value = this.email;
										o.q[0].value = o.q[0].value.replace(/^[^\@]+/,'').trim();
										showNextTab();
										doSubmit();
									}
								},
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
	// Mark Carey
	// Find the Email Address for the Fashion/Beauty Brand
	// Startpage Find URL, then Scrapy
	//
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
				sd_start_urls: [],
				sd_allowed_domains: [],
				name: td[1].innerText.trim(),
				city: td[5].innerText.trim(),
				country: td[7].innerText.trim(),
				website: td[9].innerText.trim(),
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
			o.sd_allowed_domains = [o.website.replace(/^https?:\/\/(www\.|)([^\/]+)\/*[\d\D]*$/i,"$2")]; // Remove https & trailing / if present
			if (!/^http/i.exec(o.website)) {
				o.website = 'http://'+o.website;
			}
			o.sd_start_urls = [ o.website ];
			
			// Remove first tds
			//~ var tr = document.getElementsByTagName('tr');
			for (var i=0; i<td.length -1; i++) {
				var key = td[i].innerText.trim();
				if (o.minimize_tds.hasOwnProperty( key )) {
					td[i].innerText = td[i].innerText.charAt(0); // remove text
					td[i].style.width = '20px'; // resize
				}
			}
			
			// Move the website TD up below the name TD
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
			document.getElementById('submitButton').onclick = function(e) {
				o.q[0].value = o.q[0].value.trim();
				if (o.q[0].value.length < 6 || o.q[0].value.indexOf('@') == -1) {
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
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
				
				if (!o.website || o.website == '') {
					// SP search.
					var req_proxy = new AMT___xhr_PROXY_REDACTED_({
						startPage: true,
						url: 'https://startpage.com/do/metasearch.pl?query=' + encodeURIComponent(o.name+', '+o.city+', '+o.country),
						callback_function: sp
					});
				} else {
					// Init
					scrapy(o.sd_start_urls, o.sd_allowed_domains);
				}
			}
			// SP
			function sp(response_obj) {
				console.log(response_obj);
				
				//o.sd_start_urls
				//o.sd_allowed_domains
				console.log(response_obj.length);
				var rs = response_obj;
				console.log(rs);
				
				if (!rs.length) {
					// No URLs
					// Init
					//~ scrapy(o.sd_start_urls, o.sd_allowed_domains);
					if(AMT__Global_Vars.isPreview)
						AMT___Floater.skip();
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
				
				console.log('SCRAPYD SEED');
				console.log(s_obj);
				
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
									
									document.body.style.backgroundColor = 'white'; // Show loaded...
									
									if (AMT__Global_Vars.isPreview) {
										
									} else { // Add to tabs queue if not in preview
										//~ console.log('addint to tabs q');
										//~ addToTabsQ();
										//~ document.body.style.backgroundColor = 'white';
										
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
								// What to do onclick
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
