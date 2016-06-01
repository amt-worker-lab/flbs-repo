/**
 * FUNCTION MTURK_LOAD()
 * 
 * General, load before run.
 * 
 * 
 * 
 */
function mturk_load()
{	
	startPerformanceTime = new Date();
	
	// ENSURE THAN MT_CAPTCHA IS SET!
	if (localStorage['mt_captcha'] == undefined)
		localStorage['mt_captcha'] = 0;
	if (localStorage['mt_captcha'] != 0 && localStorage['mt_captcha'] != 1)
		localStorage['mt_captcha'] = 0;
	//~ if (GM_getValue('mt_captcha') == undefined)
		//~ GM_setValue('mt_captcha', '0');
	//~ if (GM_getValue('mt_captcha') != 0 && GM_getValue('mt_captcha') != 1)
		//~ GM_setValue('mt_captcha', '0');
	
	
	// John Roberts Set Interval Reload Page
	new AMT___core_factory().createScriptVar('JR-ReloadPageEvery', 0);
	if 	(
		AMT__Global_Vars.scriptVars['JR-ReloadPageEvery'] &&
		AMT__Global_Vars.scriptVars['JR-ReloadPageEvery'] != 0
		)
	{
		console.log('setinterval');
		setInterval(function() {
			console.log('interval');
			window.location = 'https://www.mturk.com/mturk/findhits?match=true'; // true?
		}, 60000);
	}	
	
	// This is the top window.
	// And the HREF is https://www.mturk.com.
	// 
	if 	(
		window.top == window.self &&
			(
			/^https?:\/\/(www\.|)mturk\.com\//.exec(document.location.href) ||
			/^http:\/\/localhost\/mturk\/\.dev\/HITs\//.exec(document.location.href) ||
			/^http:\/\/192\.168\.1\.2\/mturk\/\.dev\/HITs\//.exec(document.location.href)
			)
		) {
		// TRY show jobs
		new AMT___core_factory().amt_home_show_tasks();
		
		// Run myHITs
		// John Roberts
		if  (
				1 == 1 &&
				AMT__Global_Vars.scriptVars['JohnRobertsCheckHistory'] &&
				AMT__Global_Vars.scriptVars['JohnRobertsCheckHistory'] != 0 &&
				document.location.href != 'https://www.mturk.com/mturk/findhits?match=false' // init page
			)
		{
			var run = function() {};
			run.prototype.f = function() {
				// If not signed in the make alert!
				if (ih.indexOf('<a href="/mturk/beginsignin" id="lnkWorkerSignin" class="black_text_bold">Sign In</a>') != -1) {
					setInterval(function() {
						chrome.extension.sendRequest({method:'play_single_sound',fileName:'next3.wav'});
					}, 30000);
					document.style.backgroundColor = 'pink';
					return;
				}
				// Are we at "All HITs Available to You"?
				var allHITsReg = /<tr>[\r\n\t\s]+<td class="title_orange_text_bold">[\r\n\t\s]+All HITs( Available to You|)[\r\n\t\s]+&nbsp;&nbsp;[\r\n\t\s]+<\/td>[\r\n\t\s]+<\/tr>[\r\n\t\s]+<tr>[\r\n\t\s]+<td class="title_orange_text" style="white-space: nowrap; padding-top: 1ex;">[\r\n\t\s]+1-\d+ of \d+ Results/.exec(ih)
				// myHITsNoneAvailable
				var myHITsNoneAvailable = ih.indexOf('There are currently no HITs assigned to you.');
				// Check...
				if (allHITsReg || myHITsNoneAvailable != -1)
				{
					// Info input
					var input = document.createElement('input');
					input.setAttribute('style', 'position:absolute;top:0;left:0;width:140px;zoom:1.8;');
					input.value = 'Starting...';
					document.body.appendChild(input);
					// Start checking
					var JR_start = new Date().getTime()/1000; // Seconds
					JR_check_time();
					John_Roberts_xhr_check_HITs_Assigned_to_You();
					return;
				}
				// Format elapsed
				function JR_check_time() {
					//~ var x = (input.value.split(' ')[1] * 1) + 1;
					var p = ((new Date().getTime()/1000) - JR_start) / 60;
					p = Math.round(p*100) / 100; // Two decimals
					var n = Math.floor(p); // Int portion
					var d = p - n; // Decimal portion
					var elapsed;
					if (d < 0.25)
						elapsed = String(n) + ':00';
					else if (d >= 0.25 && d < .75)
						elapsed = String(n) + ':30';
					else // (d >= 0.75)
						elapsed = String(n+1) + ':00';
					// Update value
					input.value = 'Elapsed: ' + elapsed;
				}
				// John_Roberts_xhr_check_HITs_Assigned_to_You
				function John_Roberts_xhr_check_HITs_Assigned_to_You() {
					console.log('init interval check hits assigned');
					// Interval
					var interval = setInterval(function() {
						GM_xmlhttpRequest({ // init
							method: "GET",
							//
							url: 'https://www.mturk.com/mturk/myhits', // ......OLD.......
							// TODO URL:
							//~ url: 'https://www.mturk.com/mturk/sortmyhits?searchSpec=HITSearch%23T%233%2310%23-1%23T%23%21Status%210%21rO0ABXQACEFzc2lnbmVk%21%23%21Deadline%210%21%23%21&selectedSearchType=hitgroups&searchWords=&sortType=Deadline%3A0&pageSize=100',
							onload: function(response) {
								var rs = response.responseText;
								if (response.status != 200) return;
								// Signed in?
								if (ih.indexOf('<a href="/mturk/beginsignin" id="lnkWorkerSignin" class="black_text_bold">Sign In</a>') != -1) {
									chrome.extension.sendRequest({method:'play_single_sound',fileName:'next3.wav'});
								}
								// IN PROGRESS......
								// Get all A on page.
								var dom = new DOMParser().parseFromString(rs, 'text/html');
								var a = dom.getElementsByTagName('a');//console.log(a);
								for (var i in a) {
									if (i == 'length') break;//console.log(a[i].innerText);
									if (a[i].innerText != 'Continue work on this HIT') continue;
									//console.log(a[i].innerText);
									// Is one....
									// 8th Parent Node is TBODY
									var req = a[i];
									var ri = null;
									while (req.parentNode) {
										req = req.parentNode;
										if (req &&
											req.getElementsByClassName('requesterIdentity') &&
											req.getElementsByClassName('requesterIdentity').length
											) {
											ri = req.getElementsByClassName('requesterIdentity')[0].innerText.trim();
											break;
										}
									}
									console.log('Found task. Requester name:' + ri);
									if (ri == 'John Roberts') {
										console.log(a[i].getAttribute('href'));
										// E.g. /mturk/continue?hitId=3U088ZLJVL1W4XV2YJGVDNTBX0Y0WN
										document.location.href = 'https://www.mturk.com' + a[i].getAttribute('href');
										return;
									}
								}
								// Still here?
								// Update timer display.
								JR_check_time();
								
								
								
								
								//~ // ..................................
								//~ // ... OLD METHOD...
								//~ // ..................................
								//~ // TODO: Check for John Roberts in this task!
								//~ var r = /<a href="(\/mturk\/continue\?[^"]+)">Continue work on this HIT<\/a>/.exec(rs);
								//~ if (r) {
									//~ document.location.href = r[1];
									//~ return;
								//~ } else {
									//~ JR_check_time();
								//~ }
							}
						});
					}, 30000);
				}
			}
			new run().f();// return;
		}
		// End Roberts myHITs
		//
		//
		
		// Only run on these pages!
		//
		//
		/**
		 * Only run on (preview|previewandaccept|continue|accept|submit|return)
		 * However, stop running if on the "No more HITs available" page
		 */
		var l = document.location.href;
			//var check_right_page = /<tr>[\r\n\t\s]+<td class="title_orange_text_bold">[\r\n\t\s]+All HITs( Available to You|)[\r\n\t\s]+&nbsp;&nbsp;[\r\n\t\s]+<\/td>[\r\n\t\s]+<\/tr>[\r\n\t\s]+<tr>[\r\n\t\s]+<td class="title_orange_text" style="white-space: nowrap; padding-top: 1ex;">[\r\n\t\s]+1-\d+ of \d+ Results/.exec(ih)
		new AMT___core_factory().createScriptVar('Reload on No Hits', 0);
		if  ( true && // Why was this false?
				( // Running on any of the following:
				/^https?:\/\/(www\.|)mturk\.com\/mturk\/(preview|previewandaccept|continue|accept|submit|return)/i.exec(l) ||
				/^http:\/\/localhost\/mturk\/\.dev\/HITs\//.exec(l) ||
				/^http:\/\/192\.168\.1\.2\/mturk\/\.dev\/HITs\//.exec(l)
				)
			//|| check_right_page
			)
		{	console.log('x1');
			if (// Note: This was (indexOf) == true!! and submitting in
				// all cases! Rather than (indexOf) == -1
				document.body.innerHTML.toLowerCase().indexOf('there are no more available hits in this group.') != -1 ||
				document.body.innerHTML.toLowerCase().indexOf('there are no hits in this group available to you at the moment.') != -1
			   ) {console.log('x2');
				AMT__Global_Vars.initializeNextTabPassBy();console.log('x3');
				if(AMT__Global_Vars.scriptVars['Reload on No Hits'] != '0') {console.log('x5');
					doSubmit(false, false, function(timeToSkip){console.log('x6');
							window.setTimeout(function() {
								window.location.reload(true);
							}
							, timeToSkip);
						},
						1000
					);console.log('x7');
				}
				console.log('Hit the "All HITs" page. Returning.');
				return;
			}
		}
		AMT__Global_Vars.isTopWindow = true;
		AMT__Global_Vars.initializeGroupId();
		AMT__Global_Vars.initializeHitId();
		// Check the captcha status
		// Set var -> GM_setValue('mt_captcha','1'). No captcha == "0".
		// Plus -> some interesting captcha behavior.
		AMT___checkCaptchaStatus();
		
		// Old top window float/skip
		// Tony Pavia
		// Kristin Howe 
		// Thomas Murphy/David Weber
		// James M. Ratcliffe
		AMT___oldTopWindowFloatStuff();
		/**
		 * End Script Here
		 * And do float/skip if desired
		 * (If job is unaccepted + top window)
		**/
		var s,t,u,w;
		s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
		t=/you were viewing could not be accepted/; // Not accepted
		//u=/The HIT you were viewing has expired/; //XXNot accepted
		w=/Want to work on this HIT/; // Not accepted
		if  (
				s.exec(ih) || t.exec(ih) || w.exec(ih)
			)
		{
			AMT__Global_Vars.isPreview = true;
			AMT__Global_Vars.isTopWindow = true;
			console.log('groupId' + AMT__Global_Vars.groupId);
			
			AMT__Global_Vars.initializeTabId();
			
			// floats go here
			AllFloaters = [];
			
					//FLOATER OPTIONS:
					//var acceptCondition
					//var runMT_Run
					//var runTop_Window
					//var forceTopCondition
					//var runOnMouseOver
					//var maxSkipsBeforeAccept
					//var maxFloatTimeBeforeAccept
					//var groupId				

					//var skipSpeed    				//Default is 1000 milliseconds, this is the skipSpeed assuming skipWithSubmitQueue is false
					//var addSkipsToSubmitQueue		//Default true
					//var showPermanentSkipButton	//Not Yet Implemented: Creates a button (if pushed) that tells the skipper to always skip this HIT regardless
					//var autoSkip					//Default false, will add itself to the queue regardless, and attempt to skip unless something tells it otherwise.
					//var playSound					//Plays a sound if one is found.
			
			
			switch(AMT__Global_Vars.groupId)
			{
				//Each case is groupId
				case '2C4PHMVHVKCOKJWBOEVJI9KQ36235K':
				case '2C4PHMVHVKCOKJWBOEVJI9KQ36935R':
				case '3FQJF6D1R11V8N3Q284CY8YBHMM299':
				case '3N6I2GM9S1W6VD1AIBK6NLWDR095BQ':
				case '3ERA4CZHMXJ6ZDIP9LPVS6CAHUFLMU': // David Yarowsky
				case '3061CZCVOYQHKNOVB0ALX29LEUHA1B': // Smule AWS
				case '3QPQKLUN3TJYBG6JVE9BRGPBAUTS6V': // Olga Svensen
				case '3BHDZRMFLO7X781S8JJ88H9E37DV73': // Olga Svensen #2
				case '3OLDKDGFCL5K40RAOQFAJGFWMRLODG': // Alex Castro
				case '3QNYYBA9MLMY7WJM8JWXZLAF68SBWG': // John White
				case '3LJE53CC7VQK4K414ORRPMMLPBSESY': // John White
				case '3ULSZRQKBH95PMXAWH4B8MZG87GFUV': // 
				case '3PR0UJAG0QXI5TD6B2FWBCJ8QM8JH9': // Emily Mchale
				case '3MBO7VNJYZLP1BOEUWO51V7E4UG86J': // Michael S. Bell
				case '3CL9ACF21LBRIXNSFJJCO5SXC8VW6K': // Olga Svensen #Again...
					AMT___Floater({runMT_Run: true});
					break;
				case '32SRECFMFBIEQWWELJ4BDO8IAIEUTZ': //Bart Jansen, track packages #2
				case '3TFUINTXMP151JB1KK968F4R9KRT9R': //Bart Jansen, track packages #2
				case '2YEAJIA0RYNO1EIXTXR5MMJT1J516H': //Bart Jansen, track packages #1
					AMT___Floater({runMT_Run: true}); 
					break;
				case '2IUC1QP6AUC2DKR62OSXBV0LK2I07I': //JPM Research, Given the business name, find the phone number (#4)
				case '2E3PVP3TVOK51MU5W9YQMOZLYU1149': //Given the business name, find the phone number (#5)
				case '2PBKA0RYNJ92UQVMVG2MRTUNY12383': //Given the business name, find the phone number (#6)
				case '2RTSP6AUC26DNDIDW8UV8FK6CSL29F': //Given the business name, find the phone number (#7)
					AMT___Floater({runMT_Run: true});
					break;
				case '3SFJXQ9EF4WN4DLLMFVRTY0NCG6DXM':
					AMT___Floater({runMT_Run: true}); //Brittany Graham, Find bbb.org phone #
					break;
				case '2FH56XBAT2D55ZCE7LUQ8JGAYZV04Z':
				case '30959048Z1SSJMWP5D5TCMCKH3TACO':
				case '3S82SNMR1ZQZMYGZWFVUKSXPBHGAFX': // New as of Nov22 2014
					AMT___Floater({runMT_Run: true}); //Kristin Howe, Find Images of these Real Estate Agents
					break;
				case '30VZHLSOXST5SF5CAVZFBXC2WMD9HD':
					AMT___Floater({runMT_Run: true}); //HOWARD EIFERMAN, Find information about properties --- really easy!
				case '31ZZN31VRB06UBYLKT1NMDWU2LHQR1': // Scott Mackley
					AMT___Floater({runMT_Run: true}); 
				case '2KGW3K4F0OHO0QUG18BO8L99PFE100':
					AMT___Floater({runMT_Run: true}); //Daniel Axelsen, Find an Email Address for a Person
				case '2HGWQIHPCGJ7K7ZXNVWXR0JRS1J174': //Grocery_ROI, View products to determine if they are labeled organic
				case '31R68PGVQC7H01A52GD03DFXER60BS':
				case '3BZN229KV515T9U4I1KN74DOVCC6D9':
				case '31KHN7KCMCTCHR5DW2D482VRY3T0AV': //no fat, sugar, etc.
					AMT___Floater({runMT_Run: true});
					break;
				case '39OF0ZKO6QCI5H7K0A1MKO6IGXQDMD': // Greg Dean
					AMT___Floater({runMT_Run: true});
					break;
				case '3X1PO2DV310J983GRYEFC5PV4QK44B': // aditya sudhakar, crunchbase.com
					AMT___Floater({runMT_Run: true});
					break;
				case '394TEHR260P4JBPMUUV7KPBI4FL65K': // Tyler Yamasaki
				case '3BM40T5KKMBK9WGNZLC6B6DULUE37Q': // Tyler Yamasaki
					AMT___Floater({runMT_Run: true});
					break;
				case '3AJNAQR5VMFR6HBF824DRQWAO76ZHT': // Trusted Insight
					AMT___Floater({runMT_Run: true});
					break;
				case '3RVB0A5ZTHPADDDP8Z16L14Z46GOOK': // Stephanie Hass, zip codes
					AMT___Floater({runMT_Run: true});
					break;
				case '378UBY8FQ6S2XIMGC1N8Z5F6R5FT8N': // Data Cleansing, find the company address
					AMT___Floater({runMT_Run: true});
					break;
				case '372VRO63KW1OI73UUZL6YKEXJPCHBE': //Andrew Ryan
				case '3ED2P6N3JY6YYZVT3IGYKJGTO6HF6H': //Andrew Ryan, Find people in companies
				case '3MU03ZNWUDO2FVVFYZ6TSD2TT95F5X': //Andrew Ryan, Find people in companies (2? Call...)
					AMT___Floater({runMT_Run: true});
					break;
				case '3U2H1DGWNO9OGD2AJATPPHECAAIF48': //Paul Graham, find company name
					AMT___Floater({runMT_Run: true});
					break;
				case '3VKCYEEK4FZB4QUVOA4DR9FXWW5G13': //Gordon "", find tumblr from youtube about
					AMT___Floater({runMT_Run: true});
					break;
				case '3WAI7IWAWUUFZSG7SEP9D9M06PUCK4': // Peter Heyneman "", find phone number
				case '3K0G5SYN9KD8DDQXWEMKQ0JN6778MG': // Singpost, Peter Heyneman "", find phone number
					AMT___Floater({runMT_Run: true});
					break;
				case '394TEHR260Y0TAZL4P5WWJA29V265A': // Amazon Requester Inc.- EPS Marketing, Find the Contact Email Address on Websites
					AMT___Floater({runMT_Run: true});
					break;
				case '3YSALWD2ZHQULW8WNC9HS4E8M3PHP6': // CRE, find the doctor's email address
					AMT___Floater({runMT_Run: true});
					break;
				case '36IAL8HYOXSJR4ZTP64QYGFIEY8R4M': // Rich Gentry, Find on zoominfo.com
					AMT___Floater({runMT_Run: true});
					break;
				case '3BJ81NIZAFOA17GSU3B9OYVNVQU6KM': // Sergey Schmidt, Find youtube URL
					AMT___Floater({runMT_Run: true});
					break;
				case '369VX4MEOJBFUMBQ6OU5ATS3K8VGI7': // x8 Data, Check exec data
					AMT___Floater({runMT_Run: true});
					break;
				case '3SIEQXXS6F7ON6EED2H97HN3N7D4Q9': // Charles Devereux, politician birth wikipedia
					AMT___Floater({runMT_Run: true});
					break;
				case '31NV0OR9VLKWN2O604AC8IE68QS666': // turk-HPCBeauty, Data Collection @Amazon
					AMT___Floater({runMT_Run: true});
					break;
				case '3WNTBWVI6H6FB22QWPKXWKDQ9GK1DL': // Rachel Scott, Customer List Email Fetching
				case '3WRXIMH6E1KF1DN1WO1NDVSZY6X4LI': // Rachel Scott, Customer List Email Fetching, Update (Jan8 2015)
					AMT___Floater({runMT_Run: true});
					break;
				case '3TDV6MPLVN8E5RBAZ86VZNC0U72AAL': // Laura Enstad, URL of patent law firms
					AMT___Floater({runMT_Run: true});
					break;
				case '361LJMRMCQXI9QE970DP2IGD6CEURC': // Yin Li, Find emails, 27 Aug 2014
					AMT___Floater({runMT_Run: true});
					break;
				case '31KHN7KCND0VO2EKPJDRLAHTM88A0U': // Larry Baker
				case '36ARV8EEI7NBH3F0SG1G637JGZMAVD': // Larry Baker
					AMT___Floater({runMT_Run: true});
				case '3QNALI7B3RWCD6ZM50ZF6QISKY9Z5G': // Grocery ROI, Transcribe
				case '3FQJF6D1R1058IYMJJ3IVVDNRNV29E': // Grocery ROI, Transcribe
					AMT___Floater({runMT_Run: true});
					break;
				case '3T9YKFMCGXSXPUC7TCI0E0CH9E2C91': // Nicolas Cazagou, FB Email
					AMT___Floater({runMT_Run: true});
					break;
				case '3RPY1MM09GUL7M0GAR5MDB066WBMHS': // Andrew Scherer
					AMT___Floater({runMT_Run:true});
					break;
				case '3AJ89545MPYNHEW210G20AIMXIXBEM': // Carol Chen, Alexa.com scrape
					AMT___Floater({runMT_Run:true});
					break;
				case '3OJGK8O6LQRPTVNORS85QS6TMP15L6': // William Riggs
					AMT___Floater({runMT_Run:true});
					break;
				case '3NVVDJT9G6NCC7MWGLSHAEOQMY0PX3': // Crowd Task, find URLs
					AMT___Floater({runMT_Run:true});
					break;
				case '37Z7ICZ5H99Y57AZPGYYF94ULNK11N':
					AMT___Floater({runMT_Run:true});
					break;
				case '33FX93QHQ5WTQJFSGGTT4QKM3TNFSS': //Stephen Robertson
					AMT___Floater({runMT_Run:true});
					break;
				case '3Z18Y091VBP65DOWDMYY3XZ211V1FB': //FlicksIO, Level I: Locate URL for TV or Movie
				case '3ED2P6N3KZO1CZPTJSAFYTQJ9DA6FF': //FlicksIO, Second Posting
				case '3WC6MIR2HS9J0LLV81WSWI241WLYJF': //FlicksIO, Third Posting
					AMT___Floater({runMT_Run:true});
				case '372BFDRISCA6E6WX8JDCP7YD8F6C1F': //garrett grohman, Kickstarter emails
				case '372BFDRISCA6E6WX8JDCP7YD8C6C19': //garrett grohman, Kickstarter emails
					AMT___Floater({runMT_Run:true});
					break;
				case '3VKZWROWWHDRYOHCACV5A8TXOY08G2': // Steve Murch, emails
					AMT___Floater({runMT_Run:true});
					break;
				case '37TLCE26HLHBKVMEOJEEFU13T3ZM5Q': // James Block
					AMT___Floater({runMT_Run:true});
				case '34OVCINT28GOGQX83BMVHBHRUGUARO': // John White, Find URL
				case '37CCAM3CRMK5Y2OY7OB68QP9IHIDI9': // Emily McHale, find emails
				case '36TBNKR9193TIXMCB5LFNBRHRGHDER': // Emily McHale, find emails
				case '3TREZ2KLSWBI1OOQHKXHBOKMQ0GIJU': // Emily McHale, find emails
				case '3HBZ8AD97DGTJPFQW77ETYDDA4BNNC': // Steve Sears
				case '37CCAM3CRMK5Y2OY7OB68QP9J8MDIW': // Emily McHale, find emails
					AMT___Floater({runMT_Run:true});
				case '38DARXHY7PFWI8FPQGVX4T15O4308D': // Isaac Oates, Find U.S. State
					AMT___Floater({runMT_Run:true});
					break;
				case '3SFRD5IA5Z4458LR2TVQF3HWRY1BFR': // Kristin Howe
					AMT___Floater({runMT_Run:true});
				case '354DQCRRHIZL2IJZ7PVUW43KBB1LS7': // Will Kuffel
					AMT___Floater({runMT_Run:true});
					break;
				case '37T7WAXIDHXGC6189USEMBLRFLWY2E': // Nakul Goyal
					AMT___Floater({runMT_Run:true});
					break;
				case '3DHOXWJRRBHTS91N81DAVIWKODN3TC': // Chris lavery
					AMT___Floater({runMT_Run:true});
					break;
				case '3M2FS5OFY9QTGY4L90TE4GXBJTYSIK': //Offerpop ProServ
					AMT___Floater({runMT_Run:true});
					break;
				case '3QLL1RLFYUGHXA7A8G5E8R9FP6KG4S': // Mark Carey, find YT email
					AMT___Floater({runMT_Run:true});
					break;
				case '32SRECFMFBL0ZHE5LCA84Q8Q4H8TU7': // Evan J
					AMT___Floater({runMT_Run:true});
					break;
				case '3IRUE3ZCDH696AEWG0JKC0R0XFUCIE': // Neal H. Patel, Sentiment
					AMT___Floater({runMT_Run:true});
					break;
				case '3OLDKDGFCLWW88XZSVTHXLRFQP7DOI': // Neal H. Patel, Sentiment
					AMT___Floater({runMT_Run:true});
					break;
				case '3D61YMT1LK2AV1WDO1574RK122SCVR': // Nova
					AMT___Floater({runMT_Run:true});
					break;
				case '3USZNBD0IDBZ3YCNMTOTIHONP9Z51F': // Rob Cardenas
					AMT___Floater({runMT_Run:true});
					break;
				case '3MKP0VNPL1836DVMPFJCQFLWNRHJRZ': // Will Kuffel
					AMT___Floater({runMT_Run:true});
					break;
				case '3LCM1J6T1CHWZ2KP75ZAYFURLE7YCG': // A2452A20EPP4F2 "", Find the Website Address for a Business
					AMT___Floater({runMT_Run:true});
					break;
				case '3BVKBPKP822M62ZNFSC57MIDSCWAIZ': // A2452A20EPP4F2 "", Find the Website Address for a Business
					AMT___Floater({runMT_Run:true});
					break;
				case '37FXVUXR6OZQ4BBTODVQ0ANSVUTEWL': // Tom Overby
					AMT___Floater({runMT_Run:true});
					break;
				
				console.log('case ran');
				break;
			}
			console.log('after case ran' + ', AMT___Floater.groupId:' +AMT___Floater.groupId);
			if(AMT___Floater.groupId)
			{
				AMT___Floater.float();
			}
			

			
			var numActiveFloaters = 0;
			for(var i = 0; i < AllFloaters.length; i++)
			{
				console.log(AllFloaters[i]);
				console.log(AllFloaters[i].groupId);
				if(AllFloaters[i].groupId == AMT__Global_Vars.groupId)
				{
					AllFloaters[i].doBehavior();
					numActiveFloaters++;
				}
				if(numActiveFloaters > 1)
					alert('Caution: More than one floater activated');
			}
			
			
			// return
			return;
		}
				
		/**
		 * Scripts execute here if window.top == window.self && href == mturk.com
		 * Returns afterwards.
		 * 
		 * AMT___core_factory().top_window__addEventListener_iframe();
		 */
		AMT__Global_Vars.isPreview = false;
		AMT__Global_Vars.isTopWindow = true;
		AMT__Global_Vars.initializeTabId();
		AMT__Global_Vars.initialize_return_accept_run_nextTab();
		AMT__Global_Vars.initializeR_Button_NextTab();
		AMT__Global_Vars.initializeReturnButton();
		AMT__Global_Vars.setAcceptedFavicon();
		AMT__Global_Vars.initializeRightClickRA();

		//If nextTabIframeFocus is on, then focus on the iframe if its name is  (if we happen to have one)
		if(AMT__Global_Vars.scriptVars['NextTab Iframe Focus'] != '0') {console.log('xxxxxxx');
			var ifr = document.getElementsByName('ExternalQuestionIFrame');
			if(ifr)
				ifr = ifr[0];
			else {
				ifr = document.getElementsByName('HTMLQuestionIFrame');
				if(ifr)
					ifr =  ifr[0]
			}
			if(ifr) {
				console.log('focusing on iframe. Comment me out when tested in max-speed scenario');
				ifr.focus();
				//~ window.setTimeout(function() { // No effect : May 31 2016
					//~ ifr.focus();
				//~ },2000);
			}
		}
		
		// Make return/accept button
		// AMT___returnAndAcceptButton
		AMT___returnAndAcceptButton();
		
		// Add event listener (will only do this if Iframe is on the page)
		new AMT___core_factory().top_window__addEventListener_iframe();
		AMT___InitializeReturnAndAcceptKeyPress();
		AMT__Global_Vars.initializeNextTabPassBy();
		
		
		
		//var duration = new Date().getTime() - beginRunTime;
		//~ alert('Runtime took: ' + duration);
		//~ AMT__Global_Vars.isTopWindow = true;
		//AMT__Global_Vars.initializeGroupId();
		//~ AMT__Global_Vars.initializeHitId();
		
		// Run jobs in top window
		top_window();
		
		// Return
		// Continue if on localhost!
		if  (
			!/^http:\/\/localhost\/mturk\/\.dev\/HITs\//.exec(document.location.href) &&
			!/^http:\/\/192\.168\.1\.2\/mturk\/\.dev\/HITs\//.exec(document.location.href)
			)
			return;
	}
	
	// Still here?
	// Return if on mturk.com
	if (/^https?:\/\/(www\.|)mturk\.com\//.exec(document.location.href))
		return;
	
	// Set some global vars
	var lc = document.location.href;
	var ext_dv = '/mturk/.dev/HITs/';
	var rl = (lc.indexOf('http://localhost'+ext_dv) == 0 || lc.indexOf(MT___host+ext_dv) == 0);
	AMT__Global_Vars.isTopWindow = false;
	AMT__Global_Vars.initializeGroupId();
	AMT__Global_Vars.initializeTabId();
	AMT__Global_Vars.initializeHitId();
	AMT__Global_Vars.core.is_running_on_local_dev = rl; // Boolean, True or False.
	
	// This is running at mturkcontent.com or amazonaws.com or http://localhost/mturk/.dev/HITs/
	// If top window or job is ... then always run.
	// ADDED TO DESCRIPTION: http://localhost/mturk/.dev/HITs/
	//
	if  (
		window.top == window.self ||
		document.location.href.indexOf('assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE') == -1
		)
	{
		AMT__Global_Vars.isPreview = false;
		AMT___InitializeReturnAndAcceptKeyPress();
		AMT__Global_Vars.initializeNextTabPassBy();
		AMT__Global_Vars.initializeRightClickRA();
		// Init MT__RUN();
		MT__RUN();
	}
	// Else if framed window then only run
	// when job has been accepted.
	else
	{
		AMT__Global_Vars.isPreview = true;
		
		// Inside of iframe that is not accepted
		// Unaccepted
		
		// Have a run button
		var d;
		d = document.createElement('input');
		d.setAttribute('id','MT___RUN_MANUAL_vlskclbdkbpskfkxpclsk');
		d.setAttribute('type','button');
		d.setAttribute('style','position:absolute;top:0;left:0;width:10px;height:10px;z-index:1000000000;background-color:#eeffbb;');
		document.body.appendChild(d);
		var MT___RUN_MANUAL = document.getElementById('MT___RUN_MANUAL_vlskclbdkbpskfkxpclsk');
		MT___RUN_MANUAL.onclick = function() {
			this.onclick = function() {
				return false;
			}
			this.style.backgroundColor = 'lime';
			AMT__Global_Vars.initializeTabId();
			MT__RUN();
		}
		// AddEventListener
		window.addEventListener('message', function(e) {
			//~ console.log(e);
			if(e.data && e.data.runPreview && !e.data.hasOwnProperty('isAllPagesScript'))
			{
				//ToDo: instead of a 200 millisecond wait, perform the click as soon as the DOM object loads.
				setTimeout(function() {MT___RUN_MANUAL.click();}, 200);
				parent.postMessage({MT_Ran: true}, '*');
				this.removeEventListener('click',arguments.callee,false)
			}
		}, false);
		
		// Run regardless
		//
		//
		//
		//************************
		// Tony Pavia
		var s = 'Repeat step 2 and 3 for each contact # that you\'re shown in the HIT details above on this Staff List URL. Note that if the beginning of the contact # is the same as your previous hit (i.e. SDUSD_baypark_12,&nbsp; SDUSD_baypark_13,&nbsp; SDUSD_baypark_14, etc.), then the "URL of Staff List" remains the same.';
		if (ih.indexOf(s) != -1) {
			setTimeout(function() {MT___RUN_MANUAL.click();}, 200);
		}
		//************************
		// Kristin Howe real estate agent photos
		var s = '<h3>Find the largest possible image of the given real estate agent, then copy the IMAGE URL and paste it into the provided field.</h3>';
		if (ih.indexOf(s) != -1) {
			setTimeout(function() {MT___RUN_MANUAL.click();}, 200);
		}
		//************************
		// RH
		var s = '	<li>If the business has a url that is a subpart of a larger organization, record that url,&nbsp; e.g. www.healthcarewisdom.org/pulmonaryassociates</li>';
		if (ih.indexOf(s) != -1) {
			setTimeout(function() {MT___RUN_MANUAL.click();}, 600);
		}
		//************************
		// David Weber
		// check assignmentid
		// write after four seconds
		if  (
			document.location.href.indexOf('groupId=2J2GSCWY2AOO2EH0X4FONQSFUBI11R') != -1
			)
		{
			var x = /&hitId=([^&$]+)/.exec(document.location.href);
			if (x) {
				x = x[1];
				GM_xmlhttpRequest({
					method: 'GET',
					url: MT___host+'/mturk/util.php?thomas_murphy_hid='+x, // && write
					onload: function (response) {
						var rs = response.responseText;
						if (response.status != 200)
							return;
						if (rs.trim() == '1') {
							//end
						}
						else { // run once
							MT___RUN_MANUAL.click();
							setTimeout(function() {
								var x = /&hitId=([^&$]+)/.exec(document.location.href);
								if (x) {
									x = x[1];
									GM_xmlhttpRequest({
										method: 'GET',
										url: MT___host+'/mturk/util.php?thomas_murphy_hid='+x+'&w=', // && write
										onload: function (response) {
										}
									});
								}
							}, 6000); // write @ 6 seconds
						}
					}
				});
			}
		}
		// End of script.
		//
		return;
	}
}
/**
 * END MTURK_LOAD
 * 
 * 
 * 
 */

function checkIfLocalScriptVarsExists(callback) {
	chrome.storage.local.get('scriptVars', function(storageObj) {
		if(!storageObj.scriptVars) {
			chrome.storage.local.set({'scriptVars': {}},function(asdf) {
				initializePermanentScriptVars();
			})
		}
		else {
			initializePermanentScriptVars();
		}
	});
}

function initializePermanentScriptVars() {
	
	chrome.storage.local.get('scriptVars', function(storageObj) {
		var scriptVars = storageObj.scriptVars;
		
		var hasChanged = false;
		
		//Get rid of any persistent vars in scriptvars that's not in the global
		for(var i in scriptVars) {
			if(scriptVars[i] && scriptVars[i].isPersistant) {
				if(!AMT__Global_Vars.associativeArrayofDPSV.hasOwnProperty(i)) {
					hasChanged = true;
					delete scriptVars[i];
				}
			}
		}
		
		//Put variables into scriptVars that aren't already there.
		for(var i = 0; i < AMT__Global_Vars.defaultPersistantScriptVars.length; i++) {
			if(!scriptVars.hasOwnProperty(AMT__Global_Vars.defaultPersistantScriptVars[i].name)) {
				hasChanged = true;
				scriptVars[AMT__Global_Vars.defaultPersistantScriptVars[i].name] = AMT__Global_Vars.defaultPersistantScriptVars[i];
			}
		}
		if(hasChanged) {
			chrome.storage.local.set({'scriptVars': scriptVars}, function() {
				loadGlobalsFromBird();
			}); 
		}
		else {
			loadGlobalsFromBird();
		}
	});
}

function addScriptVarsListener() {
	chrome.storage.onChanged.addListener(function(change) {
		//write scriptVars back into Global
		var scriptVars = change.scriptVars.newValue;
		if(scriptVars) {
			for(var i in scriptVars) {
				AMT__Global_Vars.scriptVars[i] = scriptVars[i].value;
			}
		}
	});
}

function loadGlobalsFromBird() {	
	chrome.storage.local.get(null, function(global_load_vars) {
		if(global_load_vars && global_load_vars.scriptVars) {
			for(var i in global_load_vars.scriptVars) {
				if(global_load_vars.scriptVars[i] != undefined)
					AMT__Global_Vars.scriptVars[i] = global_load_vars.scriptVars[i].value;
			}
		}
		ih = initializeIh();
		addScriptVarsListener();
		//~ Other things to note....... This does not work!!!
		//~ Set ['Server Location'] to include "http://"!
		//~ AMT__Global_Vars.scriptVars['Server Location'] = 'http://' + AMT__Global_Vars.scriptVars['Server Location'];
		//~ alert(AMT__Global_Vars.scriptVars['Server Location']);
		mturk_load();
	});
	
}

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

function initializeIh() {
	var MyString = function(str) {
	  this._value = str;
	  this.length = str.length;
	  // very rough to instantiate
	  for (var i = 0, l = str.length; i < l; i++) {
		this[i] = str[i];
	  }
	};

	Object.getOwnPropertyNames(String.prototype).forEach(function(key) {
	  var func = String.prototype[key];
	  MyString.prototype[key] = function() {
		return func.apply(this._value, arguments);
	  };
	});

	var tmpIh = document.body.innerHTML;
	tmpIh = new MyString(tmpIh);
	tmpIh.oldIndexOf = tmpIh.indexOf;
	tmpIh.indexOf = function(str) {
		if(this.oldIndexOf(str) != -1) {
			AMT__Global_Vars.sStrings.push(str);
			if(AMT__Global_Vars.startTimerOnSMatch && AMT__Global_Vars.sStrings.length == 1) {
				new AMT___items_factory().startJobTimer();
			}
			if(AMT__Global_Vars.scriptVars['Record Job Timings'] != '0') {
				new AMT___items_factory().createJobTimer();
				//new AMT___items_factory().startJobTimer();
			}
		}
		return this.oldIndexOf(str);
	};
	return tmpIh;
}

if (document.readyState == "complete" || document.readyState == "interactive") {
	checkIfLocalScriptVarsExists();
}
else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			checkIfLocalScriptVarsExists();
		}
	}
}
