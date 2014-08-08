/**
 * AMT___huge_vars_factory
 *
 * @
 * @ 
 * 
 * @type
 */
function AMT___huge_vars_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * function us_cities_top_1000_by_population
 * Returns object if is_object, else array.
 * From: http://www.chadbaudoin.com/2013/04/18/top-1000-cities-as-json-array.html
 * 
 * @param: is_object
 */
AMT___huge_vars_factory.prototype.us_cities_top_1000_by_population = function(is_object) {
	
	// changed: "Nashville-Davidson, Tennessee" => add => "Nashville, Tennessee",
	var all = 
	["New York, New York","Los Angeles, California","Chicago, Illinois","Houston, Texas","Phoenix, Arizona","Philadelphia, Pennsylvania","San Antonio, Texas","San Diego, California","Dallas, Texas","San Jose, California","Detroit, Michigan","San Francisco, California","Jacksonville, Florida","Indianapolis, Indiana","Austin, Texas","Columbus, Ohio","Fort Worth, Texas","Charlotte, North Carolina","Memphis, Tennessee","Boston, Massachusetts","Baltimore, Maryland","El Paso, Texas","Seattle, Washington","Denver, Colorado","Nashville-Davidson, Tennessee","Nashville, Tennessee","Milwaukee, Wisconsin","Washington, District of Columbia","Las Vegas, Nevada","Louisville/Jefferson County, Kentucky","Portland, Oregon","Oklahoma City, Oklahoma","Tucson, Arizona","Atlanta, Georgia","Albuquerque, New Mexico","Kansas City, Missouri","Fresno, California","Mesa, Arizona","Sacramento, California","Long Beach, California","Omaha, Nebraska","Virginia Beach, Virginia","Miami, Florida","Cleveland, Ohio","Oakland, California","Raleigh, North Carolina","Colorado Springs, Colorado","Tulsa, Oklahoma","Minneapolis, Minnesota","Arlington, Texas","Honolulu, Hawaii","Wichita, Kansas","St. Louis, Missouri","New Orleans, Louisiana","Tampa, Florida","Santa Ana, California","Anaheim, California","Cincinnati, Ohio","Bakersfield, California","Aurora, Colorado","Toledo, Ohio","Pittsburgh, Pennsylvania","Riverside, California","Lexington-Fayette, Kentucky","Stockton, California","Corpus Christi, Texas","Anchorage, Alaska","St. Paul, Minnesota","Newark, New Jersey","Plano, Texas","Buffalo, New York","Henderson, Nevada","Fort Wayne, Indiana","Greensboro, North Carolina","Lincoln, Nebraska","Glendale, Arizona","Chandler, Arizona","St. Petersburg, Florida","Jersey City, New Jersey","Scottsdale, Arizona","Orlando, Florida","Madison, Wisconsin","Norfolk, Virginia","Birmingham, Alabama","Winston-Salem, North Carolina","Durham, North Carolina","Laredo, Texas","Lubbock, Texas","Baton Rouge, Louisiana","North Las Vegas, Nevada","Chula Vista, California","Chesapeake, Virginia","Gilbert, Arizona","Garland, Texas","Reno, Nevada","Hialeah, Florida","Arlington, Virginia","Irvine, California","Rochester, New York","Akron, Ohio","Boise City, Idaho","Irving, Texas","Fremont, California","Richmond, Virginia","Spokane, Washington","Modesto, California","Montgomery, Alabama","Yonkers, New York","Des Moines, Iowa","Tacoma, Washington","Shreveport, Louisiana","San Bernardino, California","Fayetteville, North Carolina","Glendale, California","Augusta-Richmond County, Georgia","Grand Rapids, Michigan","Huntington Beach, California","Mobile, Alabama","Newport News, Virginia","Little Rock, Arkansas","Moreno Valley, California","Columbus, Georgia","Amarillo, Texas","Fontana, California","Oxnard, California","Knoxville, Tennessee","Fort Lauderdale, Florida","Salt Lake City, Utah","Worcester, Massachusetts","Huntsville, Alabama","Tempe, Arizona","Brownsville, Texas","Jackson, Mississippi","Overland Park, Kansas","Aurora, Illinois","Oceanside, California","Tallahassee, Florida","Providence, Rhode Island","Rancho Cucamonga, California","Ontario, California","Chattanooga, Tennessee","Santa Clarita, California","Garden Grove, California","Vancouver, Washington","Grand Prairie, Texas","Peoria, Arizona","Sioux Falls, South Dakota","Springfield, Missouri","Santa Rosa, California","Rockford, Illinois","Springfield, Massachusetts","Salem, Oregon","Port St. Lucie, Florida","Cape Coral, Florida","Dayton, Ohio","Eugene, Oregon","Pomona, California","Corona, California","Alexandria, Virginia","Joliet, Illinois","Pembroke Pines, Florida","Paterson, New Jersey","Pasadena, Texas","Lancaster, California","Hayward, California","Salinas, California","Hampton, Virginia","Palmdale, California","Pasadena, California","Naperville, Illinois","Kansas City, Kansas","Hollywood, Florida","Lakewood, Colorado","Torrance, California","Escondido, California","Fort Collins, Colorado","Syracuse, New York","Bridgeport, Connecticut","Orange, California","Cary, North Carolina","Elk Grove, California","Savannah, Georgia","Sunnyvale, California","Warren, Michigan","Mesquite, Texas","Fullerton, California","McAllen, Texas","Columbia, South Carolina","Carrollton, Texas","Cedar Rapids, Iowa","McKinney, Texas","Sterling Heights, Michigan","Bellevue, Washington","Coral Springs, Florida","Waco, Texas","Elizabeth, New Jersey","West Valley City, Utah","Clarksville, Tennessee","Topeka, Kansas","Hartford, Connecticut","Thousand Oaks, California","New Haven, Connecticut","Denton, Texas","Concord, California","Visalia, California","Olathe, Kansas","El Monte, California","Independence, Missouri","Stamford, Connecticut","Simi Valley, California","Provo, Utah","Killeen, Texas","Springfield, Illinois","Thornton, Colorado","Abilene, Texas","Gainesville, Florida","Evansville, Indiana","Roseville, California","Charleston, South Carolina","Peoria, Illinois","Athens-Clarke County, Georgia","Lafayette, Louisiana","Vallejo, California","Lansing, Michigan","Ann Arbor, Michigan","Inglewood, California","Santa Clara, California","Flint, Michigan","Victorville, California","Costa Mesa, California","Beaumont, Texas","Miami Gardens, Florida","Manchester, New Hampshire","Westminster, Colorado","Miramar, Florida","Norman, Oklahoma","Cambridge, Massachusetts","Midland, Texas","Arvada, Colorado","Allentown, Pennsylvania","Elgin, Illinois","Waterbury, Connecticut","Downey, California","Clearwater, Florida","Billings, Montana","West Covina, California","Round Rock, Texas","Murfreesboro, Tennessee","Lewisville, Texas","West Jordan, Utah","Pueblo, Colorado","San Buenaventura (Ventura), California","Lowell, Massachusetts","South Bend, Indiana","Fairfield, California","Erie, Pennsylvania","Rochester, Minnesota","High Point, North Carolina","Richardson, Texas","Richmond, California","Burbank, California","Berkeley, California","Pompano Beach, Florida","Norwalk, California","Frisco, Texas","Columbia, Missouri","Gresham, Oregon","Daly City, California","Green Bay, Wisconsin","Wilmington, North Carolina","Davenport, Iowa","Wichita Falls, Texas","Antioch, California","Palm Bay, Florida","Odessa, Texas","Centennial, Colorado","Boulder, Colorado","West Palm Beach, Florida","Everett, Washington","Portsmouth, Virginia","Temecula, California","Tyler, Texas","Rialto, California","Carlsbad, California","Kenosha, Wisconsin","Murrieta, California","North Charleston, South Carolina","Sandy, Utah","South Gate, California","Gary, Indiana","Fargo, North Dakota","Hillsboro, Oregon","Orem, Utah","Surprise, Arizona","Broken Arrow, Oklahoma","Mission Viejo, California","Roanoke, Virginia","El Cajon, California","Compton, California","Albany, New York","Lakeland, Florida","Brockton, Massachusetts","Las Cruces, New Mexico","Beaverton, Oregon","Clovis, California","Tuscaloosa, Alabama","San Mateo, California","Greeley, Colorado","Macon, Georgia","Vista, California","Carson, California","San Angelo, Texas","Lawrence, Kansas","Vacaville, California","Davie, Florida","Lawton, Oklahoma","Yuma, Arizona","New Bedford, Massachusetts","Quincy, Massachusetts","Fall River, Massachusetts","Waukegan, Illinois","Redding, California","Sunrise, Florida","Westminster, California","Sparks, Nevada","Livonia, Michigan","Longmont, Colorado","Miami Beach, Florida","Roswell, Georgia","Santa Monica, California","Nashua, New Hampshire","Lynn, Massachusetts","Spokane Valley, Washington","Santa Maria, California","College Station, Texas","Lee's Summit, Missouri","Boca Raton, Florida","Santa Barbara, California","Pearland, Texas","Hesperia, California","Yakima, Washington","Federal Way, Washington","Sandy Springs, Georgia","Fort Smith, Arkansas","Kent, Washington","Avondale, Arizona","Alhambra, California","Indio, California","Plantation, Florida","Chico, California","Warwick, Rhode Island","Citrus Heights, California","Newton, Massachusetts","Dearborn, Michigan","Duluth, Minnesota","Allen, Texas","Hawthorne, California","Norwalk, Connecticut","Suffolk, Virginia","Deltona, Florida","Ogden, Utah","Trenton, New Jersey","Bloomington, Minnesota","Sioux City, Iowa","Chino, California","Rio Rancho, New Mexico","Racine, Wisconsin","Whittier, California","Greenville, North Carolina","Sugar Land, Texas","Newport Beach, California","Nampa, Idaho","Edmond, Oklahoma","Livermore, California","Reading, Pennsylvania","San Marcos, California","Troy, Michigan","Jacksonville, North Carolina","Champaign, Illinois","Cranston, Rhode Island","Cicero, Illinois","Bellingham, Washington","Buena Park, California","Danbury, Connecticut","Tracy, California","O'Fallon, Missouri","Camden, New Jersey","Farmington Hills, Michigan","San Leandro, California","Canton, Ohio","Clifton, New Jersey","Lakewood, California","Longview, Texas","Evanston, Illinois","Melbourne, Florida","Bend, Oregon","Westland, Michigan","Parma, Ohio","Fayetteville, Arkansas","Baldwin Park, California","Asheville, North Carolina","Hammond, Indiana","Somerville, Massachusetts","Merced, California","St. Joseph, Missouri","Decatur, Illinois","Lake Forest, California","Albany, Georgia","Southfield, Michigan","Napa, California","Deerfield Beach, Florida","Missouri City, Texas","Bryan, Texas","Redwood City, California","New Rochelle, New York","Bloomington, Illinois","Santa Fe, New Mexico","Lynchburg, Virginia","Chino Hills, California","Medford, Oregon","Largo, Florida","Palm Coast, Florida","Arlington Heights, Illinois","Bethlehem, Pennsylvania","Wilmington, Delaware","Hoover, Alabama","Upland, California","Gastonia, North Carolina","Bellflower, California","Union City, California","Plymouth, Minnesota","Kalamazoo, Michigan","St. George, Utah","Tustin, California","Youngstown, Ohio","Edinburg, Texas","Mountain View, California","Brooklyn Park, Minnesota","Pawtucket, Rhode Island","Scranton, Pennsylvania","Bloomington, Indiana","Hemet, California","League City, Texas","Lake Charles, Louisiana","Schaumburg, Illinois","Alameda, California","Fishers, Indiana","Appleton, Wisconsin","Bolingbrook, Illinois","Baytown, Texas","Gulfport, Mississippi","Wyoming, Michigan","Lawrence, Massachusetts","New Britain, Connecticut","Lorain, Ohio","Flower Mound, Texas","Apple Valley, California","Redlands, California","Lynwood, California","Boynton Beach, Florida","Carmel, Indiana","Rock Hill, South Carolina","Rochester Hills, Michigan","Iowa City, Iowa","Mission, Texas","Missoula, Montana","Mount Vernon, New York","Turlock, California","Meridian, Idaho","Springdale, Arkansas","Waukesha, Wisconsin","Milpitas, California","Kenner, Louisiana","Kennewick, Washington","Folsom, California","Muncie, Indiana","Pleasanton, California","Dothan, Alabama","Lauderhill, Florida","Concord, North Carolina","St. Cloud, Minnesota","Rapid City, South Dakota","Passaic, New Jersey","Marietta, Georgia","Waterloo, Iowa","Layton, Utah","Redondo Beach, California","Palatine, Illinois","Skokie, Illinois","Mount Pleasant, South Carolina","Eau Claire, Wisconsin","Pontiac, Michigan","Pharr, Texas","Loveland, Colorado","Jonesboro, Arkansas","Yorba Linda, California","North Richland Hills, Texas","Lafayette, Indiana","St. Charles, Missouri","Manteca, California","Harlingen, Texas","East Orange, New Jersey","Pittsburg, California","Delray Beach, Florida","Laguna Niguel, California","Fort Myers, Florida","Cedar Park, Texas","Oshkosh, Wisconsin","Eagan, Minnesota","Walnut Creek, California","Camarillo, California","Weston, Florida","Daytona Beach, Florida","Jackson, Tennessee","Goodyear, Arizona","Maple Grove, Minnesota","Auburn, Washington","Janesville, Wisconsin","Bossier City, Louisiana","Victoria, Texas","Johnson City, Tennessee","Portland, Maine","Davis, California","Rancho Cordova, California","Pico Rivera, California","South San Francisco, California","Hamilton, Ohio","Kissimmee, Florida","Eden Prairie, Minnesota","Coon Rapids, Minnesota","Rockville, Maryland","Springfield, Ohio","Warner Robins, Georgia","Renton, Washington","Union City, New Jersey","Johns Creek, Georgia","Greenville, South Carolina","Shawnee, Kansas","Montebello, California","San Clemente, California","Encinitas, California","Yuba City, California","Haverhill, Massachusetts","Monterey Park, California","Schenectady, New York","Lodi, California","Bismarck, North Dakota","Bristol, Connecticut","Huntington Park, California","Franklin, Tennessee","Flagstaff, Arizona","Waltham, Massachusetts","West Allis, Wisconsin","Council Bluffs, Iowa","St. Clair Shores, Michigan","Palo Alto, California","North Little Rock, Arkansas","Temple, Texas","Gaithersburg, Maryland","Terre Haute, Indiana","Homestead, Florida","Tamarac, Florida","Frederick, Maryland","Rocky Mount, North Carolina","Conway, Arkansas","La Habra, California","Great Falls, Montana","Taylor, Michigan","Vineland, New Jersey","Meriden, Connecticut","Tinley Park, Illinois","Burnsville, Minnesota","Taylorsville, Utah","Rogers, Arkansas","Pasco, Washington","Grand Junction, Colorado","Conroe, Texas","Gardena, California","Bayonne, New Jersey","Utica, New York","North Miami, Florida","Auburn, Alabama","Lakewood, Washington","Tulare, California","Cheyenne, Wyoming","White Plains, New York","Woodbury, Minnesota","Springfield, Oregon","Dubuque, Iowa","Midwest City, Oklahoma","Anderson, Indiana","Royal Oak, Michigan","Diamond Bar, California","West Des Moines, Iowa","Des Plaines, Illinois","Santa Cruz, California","Rowlett, Texas","Port Arthur, Texas","Madera, California","Ames, Iowa","Bowling Green, Kentucky","Decatur, Alabama","St. Peters, Missouri","Blaine, Minnesota","Arcadia, California","Perris, California","Galveston, Texas","Malden, Massachusetts","National City, California","Lakeville, Minnesota","Broomfield, Colorado","Chicopee, Massachusetts","San Rafael, California","New Braunfels, Texas","Fountain Valley, California","Blue Springs, Missouri","Taunton, Massachusetts","Owensboro, Kentucky","Lake Havasu City, Arizona","Medford, Massachusetts","Ocala, Florida","La Mesa, California","Lancaster, Pennsylvania","Santee, California","Idaho Falls, Idaho","Woodland, California","Saginaw, Michigan","Orland Park, Illinois","Petaluma, California","Carson City, Nevada","Pocatello, Idaho","Paramount, California","Elyria, Ohio","Casper, Wyoming","South Jordan, Utah","Wellington, Florida","Milford, Connecticut","Novi, Michigan","Wheaton, Illinois","Port Orange, Florida","Margate, Florida","Cupertino, California","Rosemead, California","North Port, Florida","Bradenton, Florida","Hempstead, New York","Moore, Oklahoma","Pensacola, Florida","Hoffman Estates, Illinois","Hattiesburg, Mississippi","Rocklin, California","Chapel Hill, North Carolina","Kettering, Ohio","Novato, California","Bowie, Maryland","Euless, Texas","San Marcos, Texas","Oak Park, Illinois","Elkhart, Indiana","Mount Prospect, Illinois","West Haven, Connecticut","Oak Lawn, Illinois","Manhattan, Kansas","Delano, California","Normal, Illinois","Shoreline, Washington","Cathedral City, California","Redmond, Washington","Valdosta, Georgia","Porterville, California","Sarasota, Florida","Mentor, Ohio","Palm Desert, California","Battle Creek, Michigan","Buckeye, Arizona","Peabody, Massachusetts","Revere, Massachusetts","Monroe, Louisiana","Middletown, Ohio","New Brunswick, New Jersey","Burlington, North Carolina","Alpharetta, Georgia","Corvallis, Oregon","Niagara Falls, New York","La Crosse, Wisconsin","Grand Forks, North Dakota","Cerritos, California","Lake Elsinore, California","Grapevine, Texas","Cuyahoga Falls, Ohio","Watsonville, California","Bellevue, Nebraska","Highland, California","Sanford, Florida","Georgetown, Texas","Dearborn Heights, Michigan","Minnetonka, Minnesota","Smyrna, Georgia","Jupiter, Florida","Florissant, Missouri","Coconut Creek, Florida","Colton, California","Pine Bluff, Arkansas","Charleston, West Virginia","Lakewood, Ohio","Joplin, Missouri","Gilroy, California","Apple Valley, Minnesota","Mishawaka, Indiana","Hanford, California","Yucaipa, California","Placentia, California","Poway, California","Bedford, Texas","Palm Beach Gardens, Florida","La Mirada, California","Glendora, California","Brentwood, California","Berwyn, Illinois","San Ramon, California","Logan, Utah","Rancho Santa Margarita, California","Mansfield, Ohio","Tigard, Oregon","Downers Grove, Illinois","Huntington, West Virginia","Lehi, Utah","Alexandria, Louisiana","Wilson, North Carolina","Perth Amboy, New Jersey","East Providence, Rhode Island","Kirkland, Washington","Albany, Oregon","Middletown, Connecticut","Hendersonville, Tennessee","Greenwood, Indiana","DeSoto, Texas","Palm Springs, California","Lenexa, Kansas","Bartlett, Tennessee","Enid, Oklahoma","West Sacramento, California","Sheboygan, Wisconsin","Kentwood, Michigan","Troy, New York","Richland, Washington","Harrisburg, Pennsylvania","Newark, Ohio","Mansfield, Texas","Cypress, California","Pinellas Park, Florida","Euclid, Ohio","Grand Island, Nebraska","Covina, California","Roseville, Michigan","Azusa, California","Edina, Minnesota","Murray, Utah","West New York, New Jersey","Roswell, New Mexico","Portage, Michigan","Plainfield, New Jersey","Elmhurst, Illinois","Altoona, Pennsylvania","Barnstable Town, Massachusetts","Glenview, Illinois","Salina, Kansas","Stillwater, Oklahoma","Olympia, Washington","Chesterfield, Missouri","Biloxi, Mississippi","DeKalb, Illinois","Castle Rock, Colorado","Menifee, California","East Lansing, Michigan","St. Louis Park, Minnesota","Cleveland Heights, Ohio","Kokomo, Indiana","Southaven, Mississippi","Wauwatosa, Wisconsin","Cedar Hill, Texas","Summerville, South Carolina","Harrisonburg, Virginia","Huntersville, North Carolina","Kingsport, Tennessee","Parker, Colorado","The Colony, Texas","La Quinta, California","Maricopa, Arizona","Bell Gardens, California","Dublin, California","Titusville, Florida","Bountiful, Utah","Lincoln, California","Coral Gables, Florida","Binghamton, New York","Danville, Virginia","Methuen, Massachusetts","Lawrence, Indiana","San Luis Obispo, California","Commerce City, Colorado","Oro Valley, Arizona","Texas City, Texas","Freeport, New York","Casa Grande, Arizona","Coeur d'Alene, Idaho","Attleboro, Massachusetts","East Point, Georgia","Farmington, New Mexico","Kannapolis, North Carolina","Warren, Ohio","Woonsocket, Rhode Island","Caldwell, Idaho","Draper, Utah","Sierra Vista, Arizona","Covington, Kentucky","Moline, Illinois","Noblesville, Indiana","Blacksburg, Virginia","Bonita Springs, Florida","Buffalo Grove, Illinois","Hackensack, New Jersey","Lombard, Illinois","Bartlett, Illinois","Prescott, Arizona","Twin Falls, Idaho","Pflugerville, Texas","Ceres, California","Ankeny, Iowa","North Lauderdale, Florida","Fort Pierce, Florida","Oakland Park, Florida","Fairfield, Ohio","Concord, New Hampshire","Pittsfield, Massachusetts","Strongsville, Ohio","Fond du Lac, Wisconsin","Sammamish, Washington","Leominster, Massachusetts","Sayreville, New Jersey","Charlottesville, Virginia","Newark, California","Crystal Lake, Illinois","Fitchburg, Massachusetts","Westfield, Massachusetts","Lacey, Washington","Beavercreek, Ohio","Aliso Viejo, California","Danville, California","Hickory, North Carolina","San Bruno, California","Salem, Massachusetts","Jefferson City, Missouri","Belleville, Illinois","North Miami Beach, Florida","El Centro, California","Germantown, Tennessee","Lompoc, California","Littleton, Colorado","Hoboken, New Jersey","Wilkes-Barre, Pennsylvania","Rancho Palos Verdes, California","Leesburg, Virginia","Rohnert Park, California","Haltom City, Texas","Midland, Michigan","Hutchinson, Kansas","Edmonds, Washington","Bullhead City, Arizona","La Puente, California","Riverton, Utah","York, Pennsylvania","Holyoke, Massachusetts","Spartanburg, South Carolina","Columbus, Indiana","Shelton, Connecticut","San Gabriel, California","Cleveland, Tennessee","Coachella, California","Quincy, Illinois","Keller, Texas","Carol Stream, Illinois","Hagerstown, Maryland","Muskogee, Oklahoma","Urbana, Illinois","Altamonte Springs, Florida","State College, Pennsylvania","Madison, Alabama","Smyrna, Tennessee","Wylie, Texas","Meridian, Mississippi","Hot Springs, Arkansas","Coppell, Texas","Collierville, Tennessee","Atlantic City, New Jersey","Beverly, Massachusetts","Linden, New Jersey","Dublin, Ohio","Bozeman, Montana","New Berlin, Wisconsin","Muskegon, Michigan","Brookfield, Wisconsin","Goose Creek, South Carolina","Hurst, Texas","Woburn, Massachusetts","Hallandale Beach, Florida","Campbell, California","Calexico, California","Apopka, Florida","Cedar Falls, Iowa","Urbandale, Iowa","Burlington, Vermont","Morgan Hill, California","Marlborough, Massachusetts","Prescott Valley, Arizona","Brea, California","Wausau, Wisconsin","Culver City, California","Sumter, South Carolina","Sherman, Texas","Goldsboro, North Carolina","Everett, Massachusetts","Temple City, California","Florence, Alabama","Huntsville, Texas","Rock Island, Illinois","Carpentersville, Illinois","Romeoville, Illinois","Pacifica, California","San Jacinto, California","Stanton, California","Ormond Beach, Florida","Puyallup, Washington","Lima, Ohio","Cape Girardeau, Missouri","Lake Oswego, Oregon","Monrovia, California","New Albany, Indiana","Chelsea, Massachusetts","Portage, Indiana","Lancaster, Ohio","Brentwood, Tennessee","Texarkana, Texas","Chester, Pennsylvania","Franklin, Wisconsin","Streamwood, Illinois","Huber Heights, Ohio","Addison, Illinois","Westerville, Ohio","Riviera Beach, Florida","Annapolis, Maryland","Bentonville, Arkansas","Park Ridge, Illinois","Moorhead, Minnesota","Rockwall, Texas","Maplewood, Minnesota","Gadsden, Alabama","Hanover Park, Illinois","Moorpark, California","Del Rio, Texas","Plainfield, Illinois","Findlay, Ohio","Panama City, Florida","Norwich, Connecticut","Calumet City, Illinois","Richmond, Indiana","Manhattan Beach, California","Beloit, Wisconsin","Dover, Delaware","Bell, California","Kearny, New Jersey","Manassas, Virginia","Mankato, Minnesota","Longview, Washington","Duncanville, Texas","Greenfield, Wisconsin","Tupelo, Mississippi","Valley Stream, New York","Montclair, California","Fort Lee, New Jersey","University City, Missouri","Roy, Utah","Minot, North Dakota","Lancaster, Texas","Burleson, Texas","Keizer, Oregon","Bartlesville, Oklahoma","Rome, Georgia","Lake Worth, Florida","Alamogordo, New Mexico","Dunedin, Florida","Wheeling, Illinois","West Hollywood, California","Long Beach, New York","Dana Point, California","Marion, Ohio","Gainesville, Georgia","Martinez, California","Claremont, California","Torrington, Connecticut","Cottonwood Heights, Utah"];
	
	if (!is_object)
		return all;
	
	// Here?
	// Return as an object.
	var y = {};
	for (var i in all) {
		// j[0] = city
		// j[1] = state
		var j = all[i].split(',');
		if (!y.hasOwnProperty(j[0])) {
			y[j[0]] = j[1].trim();
		}
	}
	return {
		cities: y,
		cities_to_lowercase: JSON.parse(JSON.stringify(y).toLowerCase())
	};
}
AMT___huge_vars_factory.prototype.Big_Bird_court_reporters = function() {
	var obj = {
		"-NMSC":true,
		".Y.S.2d":true,
		"3d":true,
		"A.2d":true,
		"A.2d.":true,
		"A.3d":true,
		"A.D.":true,
		"A.D.2d":true,
		"A.D.2d Page":true,
		"A.D.3d":true,
		"A2d":true,
		"Adv. S.":true,
		"Adv. S. 37":true,
		"Adv. So.":true,
		"Alaska":true,
		"Ariz.":true,
		"Ariz. App.":true,
		"Ark.":true,
		"Ark. App.":true,
		"Ark.App.":true,
		"B.R.":true,
		"Black":true,
		"CA":true,
		"CAL.3d":true,
		"CAL.APP.4th":true,
		"CAO":true,
		"CMD":true,
		"CO":true,
		"COA":true,
		"Cal. 4th":true,
		"Cal. App. 4th":true,
		"Cal. App. Supp.":true,
		"Cal. Rptr.":true,
		"Cal. Rptr. 3d":true,
		"Cal. Rptr.2d":true,
		"Cal.2d":true,
		"Cal.3d":true,
		"Cal.3d Spec. Trib. Supp.":true,
		"Cal.4th":true,
		"Cal.4th CJP Supp.":true,
		"Cal.App.2d":true,
		"Cal.App.2d Supp.":true,
		"Cal.App.3d":true,
		"Cal.App.3d Supp.":true,
		"Cal.App.4th":true,
		"Cal.App.4th Supp.":true,
		"Cal.Rptr.2d":true,
		"Cal.Rptr.3d":true,
		"Colo.":true,
		"Conn":true,
		"Conn.":true,
		"Conn. App.":true,
		"Conn. Sup.":true,
		"Conn.App.":true,
		"Conn.Sup.":true,
		"Conn.Supp.":true,
		"Conp.App.":true,
		"Cranch":true,
		"Cust.Ct.":true,
		"D. & C.":true,
		"D. & C. 2d":true,
		"D. & C. 3d":true,
		"D. & C. 4th":true,
		"D.S.D.":true,
		"DNH":true,
		"DSD":true,
		"Dakota":true,
		"Dall.":true,
		"F. Supp.2d":true,
		"F.2d":true,
		"F.3d":true,
		"F.3d 697":true,
		"F.3d.":true,
		"F.SUPP.2d":true,
		"F.Supp.":true,
		"F.Supp.2d":true,
		"F.supp.2d":true,
		"Fed. R. Serv. 2d (Callaghan)":true,
		"Ga.":true,
		"Ga. App.":true,
		"Ga.App.":true,
		"Gonn.":true,
		"H N.M.":true,
		"H W.Va.":true,
		"HOW":true,
		"Haw.":true,
		"Haw.App.":true,
		"Hawai’i":true,
		"Hawai`i":true,
		"Hawai`i 215,":true,
		"Hawaii":true,
		"How.":true,
		"IIl.2d":true,
		"IL":true,
		"IL App (1st)":true,
		"IL App (1st) 11":true,
		"IL App (2d)":true,
		"IL App (3d)":true,
		"IL App (4th)":true,
		"IL App (5th)":true,
		"IL App. (1st)":true,
		"Idaho":true,
		"Il App (1st)":true,
		"Ill.":true,
		"Ill. 2d":true,
		"Ill. App.":true,
		"Ill. App. 3d":true,
		"Ill. App.2d":true,
		"Ill. App.3d":true,
		"Ill. Dec.":true,
		"Ill.2d":true,
		"Ill.App.2d":true,
		"Ill.App.3d":true,
		"Ill.Dec.":true,
		"Ill.rd":true,
		"Ind.":true,
		"Ind. App.":true,
		"KA 08":true,
		"Kan.":true,
		"Kan. 3":true,
		"Kan. App.":true,
		"Kan. App. 2d":true,
		"Kan. App.2d":true,
		"Kan.App. 2d":true,
		"Kan.App.2d":true,
		"Ky.":true,
		"L. Ed.":true,
		"L. Ed. 2d":true,
		"L.Ed.2d":true,
		"La.":true,
		"ME":true,
		"MISS.":true,
		"MT":true,
		"MT 1 359 Mont.":true,
		"MT 20 341 Mont.":true,
		"MT 264 358 Mont.":true,
		"MTWCC":true,
		"Mass":true,
		"Mass.":true,
		"Mass. App. Ct.":true,
		"Mass. App. Div.":true,
		"Md":true,
		"Md.":true,
		"Md. App.":true,
		"Md.App.":true,
		"Mich":true,
		"Mich.":true,
		"Mich. App.":true,
		"Mich.App.":true,
		"Minn.":true,
		"Misc 3d":true,
		"Misc.":true,
		"Misc.2d":true,
		"Misc.3d":true,
		"Miss.":true,
		"Moat.":true,
		"Mont":true,
		"Mont.":true,
		"N. M":true,
		"N. M.":true,
		"N. W. 2d":true,
		"N.C.":true,
		"N.C. App":true,
		"N.C. App.":true,
		"N.C.App.":true,
		"N.D.":true,
		"N.D.App.":true,
		"N.E.2d":true,
		"N.E.2d 1280":true,
		"N.E.2d 317":true,
		"N.E.3d":true,
		"N.H.":true,
		"N.J.":true,
		"N.J. Super.":true,
		"N.J. Tax":true,
		"N.J.Super":true,
		"N.J.Super.":true,
		"N.J.Tax":true,
		"N.J.Tax.":true,
		"N.M":true,
		"N.M.":true,
		"N.M. App.":true,
		"N.M.App.":true,
		"N.W. (2d)":true,
		"N.W. (2d) 839,":true,
		"N.W. 2d":true,
		"N.W.(2d)":true,
		"N.W.2d":true,
		"N.W.2d.":true,
		"N.Y.":true,
		"N.Y.2d":true,
		"N.Y.3d":true,
		"N.Y.S.2d":true,
		"ND":true,
		"ND APP":true,
		"ND App":true,
		"NJ.":true,
		"NM":true,
		"NM.":true,
		"NMCA":true,
		"NMCERT":true,
		"NMSC":true,
		"NT":true,
		"NY SIip Op":true,
		"NY SLIP OP":true,
		"NY Slip OP":true,
		"NY Slip Op":true,
		"NYS2D":true,
		"NYSlip Op":true,
		"NYSlipOp":true,
		"Neb":true,
		"Neb, App.":true,
		"Neb.":true,
		"Neb. App.":true,
		"Neb.App.":true,
		"Nev.":true,
		"Nev. Adv. Op.":true,
		"Nev. Adv. Op. No.":true,
		"Nev. Adv. Opn":true,
		"Nev. Adv. Opn.":true,
		"Nev. Adv. Opn. No.":true,
		"Nev. Advance Opinion":true,
		"Nev., Adv. Opn.":true,
		"Nev., Adv., Opn.,":true,
		"Nev., Advance Opinion":true,
		"Nev.Adv.Opn.":true,
		"Ny Slip Op":true,
		"OHIO":true,
		"OK":true,
		"OK AG":true,
		"OK CIV APP":true,
		"OK CR":true,
		"OK JUD":true,
		"OK JUD ETH":true,
		"OTR":true,
		"Ohio":true,
		"Ohio App.":true,
		"Ohio App. 2d":true,
		"Ohio App. 3d":true,
		"Ohio App.2d":true,
		"Ohio App.3d":true,
		"Ohio L. Abs.":true,
		"Ohio Misc.":true,
		"Ohio Misc. 2d":true,
		"Ohio Misc.2d":true,
		"Ohio Misc.2d Ohio":true,
		"Ohio Op.":true,
		"Ohio Op. 2d":true,
		"Ohio Op. 3d":true,
		"Ohio St.":true,
		"Ohio St. 28d":true,
		"Ohio St. 2d":true,
		"Ohio St. 3d":true,
		"Ohio St. Sd":true,
		"Ohio St.3d":true,
		"Ohio. App.2d":true,
		"Okla.":true,
		"Okla. Cr.":true,
		"Opinion No.":true,
		"Or":true,
		"Or.":true,
		"Or. App":true,
		"Or. App.":true,
		"Or.App":true,
		"Or.App.":true,
		"Orr.App.":true,
		"Otto":true,
		"P.2d":true,
		"P.2d 1054":true,
		"P.2d 210":true,
		"P.2d 660":true,
		"P.2d 69":true,
		"P.2d 735":true,
		"P.2d 811":true,
		"P.2d.":true,
		"P.3d":true,
		"P.3d 1012":true,
		"PA Super":true,
		"PA Super.":true,
		"PA. Super":true,
		"Pa.":true,
		"Pa. Commonwealth Ct.":true,
		"Pa. D. & C.":true,
		"Pa. D. & C. 2d":true,
		"Pa. D. & C. 3d":true,
		"Pa. D. & C. 4th":true,
		"Pa. Super.":true,
		"Pa. Superior Ct.":true,
		"Pa.Commw.":true,
		"Pa.Super.":true,
		"Pet.":true,
		"R.I.":true,
		"S. Ct.":true,
		"S.C.":true,
		"S.Ct.":true,
		"S.D.":true,
		"S.E.2d":true,
		"S.E.2d 743":true,
		"S.E.2d.":true,
		"S.W.2d":true,
		"S.W.2d 234":true,
		"S.W.2d 348":true,
		"S.W.2d 585":true,
		"S.W.2d 705":true,
		"S.W.2d 76":true,
		"S.W.2d 791":true,
		"S.W.2d 930":true,
		"S.W.2d.":true,
		"S.W.3d":true,
		"S.W.3d 736":true,
		"SD":true,
		"SD.":true,
		"September Term":true,
		"So.2d":true,
		"So.2d 1226":true,
		"So.2d 131":true,
		"So.2d 389":true,
		"So.3d":true,
		"St.3d":true,
		"U. S.":true,
		"U.S.":true,
		"U.S.L.W.":true,
		"UT":true,
		"UT App":true,
		"UT App.":true,
		"UT Ct. App.":true,
		"UT. App.":true,
		"UT.App.":true,
		"Unpublished Opinion No.":true,
		"Utah":true,
		"Utah 2d":true,
		"Utah Ct. App":true,
		"Utah Ct. App.":true,
		"Utah Ct.App.":true,
		"V.I.":true,
		"VT":true,
		"Va.":true,
		"Va. App.":true,
		"Va.App.":true,
		"W.Va":true,
		"W.Va.":true,
		"W.Y.":true,
		"WI":true,
		"WI APP":true,
		"WI App":true,
		"WI App.":true,
		"WI. App":true,
		"WY":true,
		"WYO":true,
		"Wall.":true,
		"Wash. App.":true,
		"Wash.2d":true,
		"Wash.App.":true,
		"Wheat.":true,
		"Wis.":true,
		"Wis. 2d":true,
		"Wis.2d":true,
		"Wn. App.":true,
		"Wn.2d":true,
		"Wn.App":true,
		"Wn.App.":true,
		"Wyo.":true,
		"ohio":true,
		"wN.2D":true
	};
	
	var obj_lower = JSON.parse(JSON.stringify(obj).toLowerCase());
	
	return {
		obj: obj,
		obj_lower: obj_lower
	};
}
AMT___huge_vars_factory.prototype.linkedin__industry_categories = function() {
	return [
		{
			"code": "47",
			"group": "corp fin",
			"description": "Accounting"
		},
		{
			"code": "94",
			"group": "man tech tran",
			"description": "Airlines/Aviation"
		},
		{
			"code": "120",
			"group": "leg org",
			"description": "Alternative Dispute Resolution"
		},
		{
			"code": "125",
			"group": "hlth",
			"description": "Alternative Medicine"
		},
		{
			"code": "127",
			"group": "art med",
			"description": "Animation"
		},
		{
			"code": "19",
			"group": "good",
			"description": "Apparel & Fashion"
		},
		{
			"code": "50",
			"group": "cons",
			"description": "Architecture & Planning"
		},
		{
			"code": "111",
			"group": "art med rec",
			"description": "Arts and Crafts"
		},
		{
			"code": "53",
			"group": "man",
			"description": "Automotive"
		},
		{
			"code": "52",
			"group": "gov man",
			"description": "Aviation & Aerospace"
		},
		{
			"code": "41",
			"group": "fin",
			"description": "Banking"
		},
		{
			"code": "12",
			"group": "gov hlth tech",
			"description": "Biotechnology"
		},
		{
			"code": "36",
			"group": "med rec",
			"description": "Broadcast Media"
		},
		{
			"code": "49",
			"group": "cons",
			"description": "Building Materials"
		},
		{
			"code": "138",
			"group": "corp man",
			"description": "Business Supplies and Equipment"
		},
		{
			"code": "129",
			"group": "fin",
			"description": "Capital Markets"
		},
		{
			"code": "54",
			"group": "man",
			"description": "Chemicals"
		},
		{
			"code": "90",
			"group": "org serv",
			"description": "Civic & Social Organization"
		},
		{
			"code": "51",
			"group": "cons gov",
			"description": "Civil Engineering"
		},
		{
			"code": "128",
			"group": "cons corp fin",
			"description": "Commercial Real Estate"
		},
		{
			"code": "118",
			"group": "tech",
			"description": "Computer & Network Security"
		},
		{
			"code": "109",
			"group": "med rec",
			"description": "Computer Games"
		},
		{
			"code": "3",
			"group": "tech",
			"description": "Computer Hardware"
		},
		{
			"code": "5",
			"group": "tech",
			"description": "Computer Networking"
		},
		{
			"code": "4",
			"group": "tech",
			"description": "Computer Software"
		},
		{
			"code": "48",
			"group": "cons",
			"description": "Construction"
		},
		{
			"code": "24",
			"group": "good man",
			"description": "Consumer Electronics"
		},
		{
			"code": "25",
			"group": "good man",
			"description": "Consumer Goods"
		},
		{
			"code": "91",
			"group": "org serv",
			"description": "Consumer Services"
		},
		{
			"code": "18",
			"group": "good",
			"description": "Cosmetics"
		},
		{
			"code": "65",
			"group": "agr",
			"description": "Dairy"
		},
		{
			"code": "1",
			"group": "gov tech",
			"description": "Defense & Space"
		},
		{
			"code": "99",
			"group": "art med",
			"description": "Design"
		},
		{
			"code": "69",
			"group": "edu",
			"description": "Education Management"
		},
		{
			"code": "132",
			"group": "edu org",
			"description": "E-Learning"
		},
		{
			"code": "112",
			"group": "good man",
			"description": "Electrical/Electronic Manufacturing"
		},
		{
			"code": "28",
			"group": "med rec",
			"description": "Entertainment"
		},
		{
			"code": "86",
			"group": "org serv",
			"description": "Environmental Services"
		},
		{
			"code": "110",
			"group": "corp rec serv",
			"description": "Events Services"
		},
		{
			"code": "76",
			"group": "gov",
			"description": "Executive Office"
		},
		{
			"code": "122",
			"group": "corp serv",
			"description": "Facilities Services"
		},
		{
			"code": "63",
			"group": "agr",
			"description": "Farming"
		},
		{
			"code": "43",
			"group": "fin",
			"description": "Financial Services"
		},
		{
			"code": "38",
			"group": "art med rec",
			"description": "Fine Art"
		},
		{
			"code": "66",
			"group": "agr",
			"description": "Fishery"
		},
		{
			"code": "34",
			"group": "rec serv",
			"description": "Food & Beverages"
		},
		{
			"code": "23",
			"group": "good man serv",
			"description": "Food Production"
		},
		{
			"code": "101",
			"group": "org",
			"description": "Fund-Raising"
		},
		{
			"code": "26",
			"group": "good man",
			"description": "Furniture"
		},
		{
			"code": "29",
			"group": "rec",
			"description": "Gambling & Casinos"
		},
		{
			"code": "145",
			"group": "cons man",
			"description": "Glass, Ceramics & Concrete"
		},
		{
			"code": "75",
			"group": "gov",
			"description": "Government Administration"
		},
		{
			"code": "148",
			"group": "gov",
			"description": "Government Relations"
		},
		{
			"code": "140",
			"group": "art med",
			"description": "Graphic Design"
		},
		{
			"code": "124",
			"group": "hlth rec",
			"description": "Health, Wellness and Fitness"
		},
		{
			"code": "68",
			"group": "edu",
			"description": "Higher Education"
		},
		{
			"code": "14",
			"group": "hlth",
			"description": "Hospital & Health Care"
		},
		{
			"code": "31",
			"group": "rec serv tran",
			"description": "Hospitality"
		},
		{
			"code": "137",
			"group": "corp",
			"description": "Human Resources"
		},
		{
			"code": "134",
			"group": "corp good tran",
			"description": "Import and Export"
		},
		{
			"code": "88",
			"group": "org serv",
			"description": "Individual & Family Services"
		},
		{
			"code": "147",
			"group": "cons man",
			"description": "Industrial Automation"
		},
		{
			"code": "84",
			"group": "med serv",
			"description": "Information Services"
		},
		{
			"code": "96",
			"group": "tech",
			"description": "Information Technology and Services"
		},
		{
			"code": "42",
			"group": "fin",
			"description": "Insurance"
		},
		{
			"code": "74",
			"group": "gov",
			"description": "International Affairs"
		},
		{
			"code": "141",
			"group": "gov org tran",
			"description": "International Trade and Development"
		},
		{
			"code": "6",
			"group": "tech",
			"description": "Internet"
		},
		{
			"code": "45",
			"group": "fin",
			"description": "Investment Banking"
		},
		{
			"code": "46",
			"group": "fin",
			"description": "Investment Management"
		},
		{
			"code": "73",
			"group": "gov leg",
			"description": "Judiciary"
		},
		{
			"code": "77",
			"group": "gov leg",
			"description": "Law Enforcement"
		},
		{
			"code": "9",
			"group": "leg",
			"description": "Law Practice"
		},
		{
			"code": "10",
			"group": "leg",
			"description": "Legal Services"
		},
		{
			"code": "72",
			"group": "gov leg",
			"description": "Legislative Office"
		},
		{
			"code": "30",
			"group": "rec serv tran",
			"description": "Leisure, Travel & Tourism"
		},
		{
			"code": "85",
			"group": "med rec serv",
			"description": "Libraries"
		},
		{
			"code": "116",
			"group": "corp tran",
			"description": "Logistics and Supply Chain"
		},
		{
			"code": "143",
			"group": "good",
			"description": "Luxury Goods & Jewelry"
		},
		{
			"code": "55",
			"group": "man",
			"description": "Machinery"
		},
		{
			"code": "11",
			"group": "corp",
			"description": "Management Consulting"
		},
		{
			"code": "95",
			"group": "tran",
			"description": "Maritime"
		},
		{
			"code": "97",
			"group": "corp",
			"description": "Market Research"
		},
		{
			"code": "80",
			"group": "corp med",
			"description": "Marketing and Advertising"
		},
		{
			"code": "135",
			"group": "cons gov man",
			"description": "Mechanical or Industrial Engineering"
		},
		{
			"code": "126",
			"group": "med rec",
			"description": "Media Production"
		},
		{
			"code": "17",
			"group": "hlth",
			"description": "Medical Devices"
		},
		{
			"code": "13",
			"group": "hlth",
			"description": "Medical Practice"
		},
		{
			"code": "139",
			"group": "hlth",
			"description": "Mental Health Care"
		},
		{
			"code": "71",
			"group": "gov",
			"description": "Military"
		},
		{
			"code": "56",
			"group": "man",
			"description": "Mining & Metals"
		},
		{
			"code": "35",
			"group": "art med rec",
			"description": "Motion Pictures and Film"
		},
		{
			"code": "37",
			"group": "art med rec",
			"description": "Museums and Institutions"
		},
		{
			"code": "115",
			"group": "art rec",
			"description": "Music"
		},
		{
			"code": "114",
			"group": "gov man tech",
			"description": "Nanotechnology"
		},
		{
			"code": "81",
			"group": "med rec",
			"description": "Newspapers"
		},
		{
			"code": "100",
			"group": "org",
			"description": "Non-Profit Organization Management"
		},
		{
			"code": "57",
			"group": "man",
			"description": "Oil & Energy"
		},
		{
			"code": "113",
			"group": "med",
			"description": "Online Media"
		},
		{
			"code": "123",
			"group": "corp",
			"description": "Outsourcing/Offshoring"
		},
		{
			"code": "87",
			"group": "serv tran",
			"description": "Package/Freight Delivery"
		},
		{
			"code": "146",
			"group": "good man",
			"description": "Packaging and Containers"
		},
		{
			"code": "61",
			"group": "man",
			"description": "Paper & Forest Products"
		},
		{
			"code": "39",
			"group": "art med rec",
			"description": "Performing Arts"
		},
		{
			"code": "15",
			"group": "hlth tech",
			"description": "Pharmaceuticals"
		},
		{
			"code": "131",
			"group": "org",
			"description": "Philanthropy"
		},
		{
			"code": "136",
			"group": "art med rec",
			"description": "Photography"
		},
		{
			"code": "117",
			"group": "man",
			"description": "Plastics"
		},
		{
			"code": "107",
			"group": "gov org",
			"description": "Political Organization"
		},
		{
			"code": "67",
			"group": "edu",
			"description": "Primary/Secondary Education"
		},
		{
			"code": "83",
			"group": "med rec",
			"description": "Printing"
		},
		{
			"code": "105",
			"group": "corp",
			"description": "Professional Training & Coaching"
		},
		{
			"code": "102",
			"group": "corp org",
			"description": "Program Development"
		},
		{
			"code": "79",
			"group": "gov",
			"description": "Public Policy"
		},
		{
			"code": "98",
			"group": "corp",
			"description": "Public Relations and Communications"
		},
		{
			"code": "78",
			"group": "gov",
			"description": "Public Safety"
		},
		{
			"code": "82",
			"group": "med rec",
			"description": "Publishing"
		},
		{
			"code": "62",
			"group": "man",
			"description": "Railroad Manufacture"
		},
		{
			"code": "64",
			"group": "agr",
			"description": "Ranching"
		},
		{
			"code": "44",
			"group": "cons fin good",
			"description": "Real Estate"
		},
		{
			"code": "40",
			"group": "rec serv",
			"description": "Recreational Facilities and Services"
		},
		{
			"code": "89",
			"group": "org serv",
			"description": "Religious Institutions"
		},
		{
			"code": "144",
			"group": "gov man org",
			"description": "Renewables & Environment"
		},
		{
			"code": "70",
			"group": "edu gov",
			"description": "Research"
		},
		{
			"code": "32",
			"group": "rec serv",
			"description": "Restaurants"
		},
		{
			"code": "27",
			"group": "good man",
			"description": "Retail"
		},
		{
			"code": "121",
			"group": "corp org serv",
			"description": "Security and Investigations"
		},
		{
			"code": "7",
			"group": "tech",
			"description": "Semiconductors"
		},
		{
			"code": "58",
			"group": "man",
			"description": "Shipbuilding"
		},
		{
			"code": "20",
			"group": "good rec",
			"description": "Sporting Goods"
		},
		{
			"code": "33",
			"group": "rec",
			"description": "Sports"
		},
		{
			"code": "104",
			"group": "corp",
			"description": "Staffing and Recruiting"
		},
		{
			"code": "22",
			"group": "good",
			"description": "Supermarkets"
		},
		{
			"code": "8",
			"group": "gov tech",
			"description": "Telecommunications"
		},
		{
			"code": "60",
			"group": "man",
			"description": "Textiles"
		},
		{
			"code": "130",
			"group": "gov org",
			"description": "Think Tanks"
		},
		{
			"code": "21",
			"group": "good",
			"description": "Tobacco"
		},
		{
			"code": "108",
			"group": "corp gov serv",
			"description": "Translation and Localization"
		},
		{
			"code": "92",
			"group": "tran",
			"description": "Transportation/Trucking/Railroad"
		},
		{
			"code": "59",
			"group": "man",
			"description": "Utilities"
		},
		{
			"code": "106",
			"group": "fin tech",
			"description": "Venture Capital & Private Equity"
		},
		{
			"code": "16",
			"group": "hlth",
			"description": "Veterinary"
		},
		{
			"code": "93",
			"group": "tran",
			"description": "Warehousing"
		},
		{
			"code": "133",
			"group": "good",
			"description": "Wholesale"
		},
		{
			"code": "142",
			"group": "good man rec",
			"description": "Wine and Spirits"
		},
		{
			"code": "119",
			"group": "tech",
			"description": "Wireless"
		},
		{
			"code": "103",
			"group": "art med rec",
			"description": "Writing and Editing"
		}
	]
}


// ETC

/**
 * AUDIO STRING
 */	
var MT___AUDIO_SNIPPET = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB0S511AAAAAIO/V\
/oBHgF2b3JiaXMAAAAAAUSsAAAAAAAA4CICAAAAAAC4AU9nZ1MAAAAAAAAAAAAAdEuddQEAAAB/0qzlETv\
///////////////////9fA3ZvcmJpcysAAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDEyMDIwMyAoT21uaXByZXNlbnQpAAAAAAEFdm9yYmlzK0JDVgEACAAAADFMIMWA0JBVAAAQAABgJCkO\
k2ZJKaWUoSh5mJRISSmllMUwiZiUicUYY4wxxhhjjDHGGGOMIDRkFQAABACAKAmOo+\
ZJas45ZxgnjnKgOWlOOKcgB4pR4DkJwvUmY26mtKZrbs4pJQgNWQUAAAIAQEghhRRSSCGFFGKIIYYYYoghhxxyyCGnnHIKKqigggoyyCCDTDLppJNOOumoo4466ii00EILLbTSSkwx1VZjrr0\
GXXxzzjnnnHPOOeecc84JQkNWAQAgAAAEQgYZZBBCCCGFFFKIKaaYcgoyyIDQkFUAACAAgAAAAABHkRRJsRTLsRzN0SRP8ixREzXRM0VTVE1VVVVVdV1XdmXXdnXXdn1ZmIVbuH1ZuIVb2IVd\
94VhGIZhGIZhGIZh+\
H3f933f930gNGQVACABAKAjOZbjKaIiGqLiOaIDhIasAgBkAAAEACAJkiIpkqNJpmZqrmmbtmirtm3LsizLsgyEhqwCAAABAAQAAAAAAKBpmqZpmqZpmqZpmqZpmqZpmqZpmmZZlmVZlmVZlm\
VZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZQGjIKgBAAgBAx3Ecx3EkRVIkx3IsBwgNWQUAyAAACABAUizFcjRHczTHczzHczxHdETJlEzN9EwPCA1ZBQAAAgAIAAAAAABAMRzFcRzJ0SR\
PUi3TcjVXcz3Xc03XdV1XVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYHQkFUAAAQAACGdZpZqgAgzkGEgNGQVAIAAAAAYoQhDDAgNWQUAAAQAAIih5CCa0JrzzTkOmuWgqRSb\
08GJVJsnuamYm3POOeecbM4Z45xzzinKmcWgmdCac85JDJqloJnQmnPOeRKbB62p0ppzzhnnnA7GGWGcc85p0poHqdlYm3POWdCa5qi5FJtzzomUmye1uVSbc84555xzzjnnnHPOqV6czsE54\
Zxzzonam2u5CV2cc875ZJzuzQnhnHPOOeecc84555xzzglCQ1YBAEAAAARh2BjGnYIgfY4GYhQhpiGTHnSPDpOgMcgppB6NjkZKqYNQUhknpXSC0JBVAAAgAACEEFJIIYUUUkghhRRSSCGGGG\
KIIaeccgoqqKSSiirKKLPMMssss8wyy6zDzjrrsMMQQwwxtNJKLDXVVmONteaec645SGultdZaK6WUUkoppSA0ZBUAAAIAQCBkkEEGGYUUUkghhphyyimnoIIKCA1ZBQAAAgAIAAAA8CTPER3\
RER3RER3RER3RER3P8RxREiVREiXRMi1TMz1VVFVXdm1Zl3Xbt4Vd2HXf133f141fF4ZlWZZlWZZlWZZlWZZlWZZlCUJDVgEAIAAAAEIIIYQUUkghhZRijDHHnINOQgmB0JBVAAAgAIAAAAAA\
R3EUx5EcyZEkS7IkTdIszfI0T\
/M00RNFUTRNUxVd0RV10xZlUzZd0zVl01Vl1XZl2bZlW7d9WbZ93\
/d93/d93/d93/d939d1IDRkFQAgAQCgIzmSIimSIjmO40iSBISGrAIAZAAABACgKI7iOI4jSZIkWZImeZZniZqpmZ7pqa\
IKhIasAgAAAQAEAAAAAACgaIqnmIqniIrniI4oiZZpiZqquaJsyq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ru\
q7rukBoyCoAQAIAQEdyJEdyJEVSJEVyJAcIDVkFAMgAAAgAwDEcQ1Ikx7IsTfM0T/M00RM90TM9VXRFFwgNWQUAAAIACAAAAA\
AAwJAMS7EczdEkUVIt1VI11VItVVQ9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV1TRN0zSB0JCVAAAZAAClxQghhB\
AOg1BiDkJYDClHPfggMWSU1CCEpRRiEnsQmmKMOSa5txAqhQiiXGuMECPGcRAyY1IpyUH4kmopOQhCQ1YEAFEAAABCiDHEGGLMQcggRIwxCB2EiDEGIYOQQQglhVQyCCGVUFLEGIOQQcgghFR\
CKR2EkFJIpQAAgAAHAIAAC6HQkBUBQJwAAIOQc4gpCJFiEDoIKXUQUooYg5A5JyVzTkoopbVQSmoRYxAyx6RkzkkJJbQUSmmtg9BSKKW1UEprqbVaU2qxdhBSCqW0FkppLbUUY2qt1ogxCJlz\
UjLnpIRSWgulpJY5J6WDkFIHIaWSUoslpRYr56R00FHpIKRUUomtpBRjKKW1klKMJaUYW4uxthhrDaW0VlKJraQUY4qtxhZjrRFjEDLnpGTOSQmltBZKaS1zTkoHIaXOQUklpRhLSS1mzknpI\
KTUQUippBRjSSm2UEprJaUYS0ktthhrbS3GGkppraQUY0kpxhZjri3GGjsIKYVSWgultNZaqzG1VmsopbWSUowlpRhbjDW3GGsOpbRWUomtpBRjiy3XFmPNqbVaW4y1thhzrbXWXmvuPbVWa2\
qt1hZjzbHGXmutvXcQUgqltBZKaS21VmNqrdZQSmslpRhLSS22GHNtLcYaSmmtpBRjSSnGFmOtLcZcU2s1thhzTa3FWnPtOcYae2qt1hZjzS22XGutPdccey0AAGDAAQAgwIQyUGjISgAgCgA\
AMQYhxiA0yCjFGITGIKUYgxApxZhzUiqlGHNOSsaYcxBSyRhzDkJJIYRSUmkphBBKSqkVAABQ4AAAEGCDpsTiAIWGrAQAQgIAGGOUYsw556SklFKDkFKMOQehlJRaaxBSijHnIJSSUmuVUow5\
ByGEUlJqrVKKMecghFBKSq1ljDkHnYQSUmkptowx5xyEEkpJqbXYOQchhFJSSam1GDvnIIRSSkkptdZiByGEElJJqaXYYuwghBBKSSml1mKMpZRSUkmppdhirLGUUkpJKaXWYoyxppRSaqm12\
GKssdaUUkqptdZijLHWmlprLbbYYqyx1lpTa621FmOMsdZaawEAAAcOAAABRtBJRpVF2GjChQeg0JAVAUAUAABgDGIMMYaccxAyCJFzDEIHIXLOSemkZFJCaaGlTEpIJaQWOeekdFIyKSGlUF\
ImJaRUWikAAOzAAQDswEIoNGQlAJAHAMAgpBRjjDmHEFKKMeecQwgpxRhzzimlGGPMOeeUUowx5pxzjDHGnHPOOcYYY8455xxzzDnnnHOOOeecc84555xzzjnnIHTOOeeccxAKAAAqcAAACLB\
RZHOCkaBCQ1YCAKkAAIQxSjHmHIRSGoUYc845CKU0SjHmnHMQSqkYY845B6GUUjHmnHPQSUglc845ByGUklLmnHPQQSglpc45CCGEUkpKnXMQQiihlJRCCKGUUkpJqYUQSiillFRaKqWUklJK\
qbVWSikppZRaaq0AAPAEBwCgAhtWRzgpGgssNGQlAJABAIAYg5BBCCGDEEIIIYQQQggJAAAYcAAACDChDBQashIASAUAAAxSijHnpKQUKcWYcxBSaSlSijHnIJSUWsWYcxBKSam1ijHnIJSSW\
myZcxBKSam1GDvnIJSSUmsxhhBKSam1GGsNIZSSUmsx1lpSaim2GGvNuaSUWoux1ppzai3GGnPNueeUWoyx1ppz7gUAIDQ4AIAd2LA6wknRWGChISsBgDwAAAYhpRhjjDGkFGOMMcYYUooxxh\
hjTDHGGGOMOacYY4wxxphjjDHGmHPOMcYYY8w55xhjjjnnnHOMMcacc845xphzzjnnHGPMOeecc04AAFCBAwBAgI0imxOMBBUashIACAcAAIxhzDnHoJOQSqOUcxJCKCWVVhqlnJMSQikppZY\
5JyWlVFpqLabMOSkplZJSazF2UlJqqaXYYquxk5BSa621FmONHYRUWootxhpr7CCU1FprMdZcayilpdhirLHWWkMprbUWY60111pSii22WmutNeeSUmsx1lpzrj2n1mKrtcZcc85BtRZjrTXn\
mnMNBgCYPDgAQCXYOMNK0lnhaHChISsBgNwAAEYpxpxzDkIIIYQQQgiVUow55xyEEEIIIYQQIqUYcw46CCGEEEIIIWSMOecchBBCCCGEEELIGHPOOQghhBBCCCGE0DnnHIQQQgghhBBKCaVzz\
jkIIYQQQggllBJKBx2EEEIIoYRSSimllA46CCGEEEIIoZRSQikhhBBCCCGEEkoppZRSQgghhBBCCCWUUkoppYQQQgihhFJKKaWUUkoJIYQQQgihlFJKKaWUEkIIIZRSSimllFJKKSWEEEIIpZ\
RSSimllFJKCCGEEEoppZRSSimllBBCCKWUUkoppZRSSikhhBJKKaWUUkoppZRSQgghlFBKKaWUUkoppYQQQgillFJKKaWUUkoJIZRQQimllFJKKaWUUgAA0IEDAECAEZUWYqcZVx6BIwoZJqB\
CQ1YCAFEAAAAhEEIIoYEQQgghRBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEDrnnADA6AsHwOgJGzQlFgcoNGQlAJAWAAAYw5hjTkEmHZWUUmqYglBCCKWkkkpKMTWMQQgh\
hFJSSSm11DLoKKVUSkqttdZajZmDklIqJaWUWqst1g5CSiml1FptudaaawchpZRaai3GGGOstYOQSkutxRhjrrX23kEoKbXWYoy11txzDqWk1mKMtfZae+89h1JSajHWXHvNvfeeS0otxppzz\
rnnnnvOJaUYa4y55txzzj330lqttdbec8699957aq3WWnPuueeee++9tVhr7r333nPvvffeYqy11txz77333ntvsdbac8+999577723GmvOuefec++9994LAMiNcABAXDCSkDrLsNKIG0/AEI\
EUGrIKAIgBABiCICgWHwAAmOAAABBgBbsyS6s2ips6yYs+CHxCR2xGhlxKxUxOBD1SQy1Wgh1awQ1eABYashIAIAMAQCDWmmvNOTLKSWs15xAZ5CTF3ktmCGKQYiwhM0Y5aTWmUCGknNWYSse\
UYlJjaqVjSkFsqbYUOgYptRprKp2DAAAACAIADETITCBQAAUGMgDgACFBCgAoLDB0DBcBAbmEjAKDwjHhnHTaAAAEITJDJCIWg8SEaqComA4AFhcY8gEgQ2Mj7eICugxwQRd3HQghCEEIYnEA\
BSTg4IQbnnjDE25wgk5RqYMAAAAAAEAAgAcAgGQDiIhmZo6jw+MDJERkhKTE5AQlRSUAAAAAAIAA4AMAIFkBIqKZmePo8PgACREZISkxOUFJUQkAAAAAAAAAAAACAgIAAAAAAAEAAAACAk9nZ\
1MAAMAxAAAAAAAAdEuddQIAAADYnNHoIDP/hf+HNzU0ZGtwX/+D/zH/If8h/xr/G/8R/w7/F/8ORPlMVAa5zaLUyfOqSBNwgrVza+Zpkb3SfZfls2I3i/+Fi0l8HubQjlL+t2crvjrtetACeu\
Vbd/1sZ7pR+xkbB3QQ/vQx8WHI7nOnnePH9zcajRl4w1DOYrLWlXXYZeBU6Uiv3tBLnLEW4be0jQ0DCIqsO++JthKKrFnyxXpDzVwyNWO1vZcZh7dB1f+Hl6DT3ePNxU76uUg0PPkYRqu6nP8\
y6j87bNG06vgomnLzYHd3mf9Pf7dLzcz8EJ9UOk3JhKr98Tp3suISq4p4HXx8mf7dJPZnx7OnV6cEcmEx78d242f1Ah8Pw/EHv6qgjz5oCFMXQ3wnb0oPXjX7S55TxZnwWCwyBpVk1JGlbI/2\
8m7cfs0LbyT2z2UXJyZ9Ltu8FYHGRT3uxmIKjKAZyHDjvXXy6NY9nA4ukqnInDol4grbBzjq6fZ2+4cwXKNtFdJc1EpIcR4c2cvzahU283p3JqykiYQjmTrQq08Hb+zTNnZbTMdiC9WH1kIGB\
3R3ykM+v1Djq2L8LK9qPZ0zTLeNTDfgLfu78RSjS+xBGuUc8GKapkDrox3nn196HTO0nhr7teLVxGSVBTb1mw/93ba0ZbMbqpMmnjnqRVs6L49Hdbf/5FyThMPOzAjC6lnWX4NMDvRO7vvrjx\
4Hs8yeFhfux9QkSYUBxMc0dNxcmCqRj+1obe+o95LSHfUKwnH2azScVdtEw79mdJmleT4bDebUuJ3ortR2P3YL90/23w9fVlzWftN10ODPdvrx9/n/pqqK5vcGn76GfivE+h28U4W2L6/4buM\
/c76WV3zCNfrln1sCbUP9r1ZjJq6zLZ/uz+kPr+xd3C/kg6ZPn7o1H8u9TugmcLy4dTmbjhnbBtO+DnQ3UJTL537WVT+8OYffrqHypwsr729SaXrbRPRVIv69ifWzgnhrV5I+Oc/z8uEvt1Wl\
rtevv/r36/VX+x7PfL+8f/RmHlruROttj2uH3QxyHrNyierW26+bYtHlENSpqeTtomRTtLbALoXeAyALT9rXp1hTo2nWsmmpbLAKAYh6rR9/vKIxUuvlciUSStqTh4eR2bMe/3v81eNoXD7u7\
++XSw9ffP/hhx/K0TFBAfzsoOjQ1bLcGxajygBwwQIrb8BojMM1Ed9n376cvnw5ZbjfTYunJePbhzkaA7bov+tf6ElriAAU3YjfHBLhGYs7qkpACOJdMW/JUIWYQuEHKfuopvkj+NO/saJpSR\
ERwqfYx17PsddzzdL8ACTpUOwgVJuDuatRtQEQgt7/dhIPyByISpX4PN/2R/IimP/W3ia0z47Ns02OeD4A/n+afRlcBaMzCfiLrQ7bHqbmV1s+Dpx1ymrx3Drarkr9/o9bNU/6JtT2vVy6fm8\
+G/vsnu3hUO+Wp7T3La3K/uBo97fX/Hu/3P+oJBpTcn+RzT+Nf4pq62tjVkJsY4QId7eSn30XNWsBpFJXKZkpm4MhwWL//fTT5eCNfe9Serl5vezC0rfn6Pmdoc3rv3/uoWy+sHMayfn//WN/\
5S+/v6x7DV2mtrll+77sTUuJ2sd/tHUK+yHrmPLzg2VHLXj+2fMrE/C/bf+gC6556zhNr8AAskRsYpP0bIQ8cYi5v1r8x3+87s6x13LO8Zlnx5/U/lLq1u+1Lftmf+H2qV+N38XQPkMr/jP2x\
66D+8+MaXKs7Z0ne+7f8l5bsmi46Uu7vxj+Usnzx8X2/pjv36QWb4Yb7J7gw9/ktC9g6+X3T8v6SRIA5GVxSrhNoveUH02uhgcw7u3WNW30WEzqfmtg/MVfSbrr7+HkmUUaumXUz3Pf3xHfy8\
a1MPCud7RkcCwzUedgBe1Coz/Ke/XC+9O4zKtxl5rdyv9H16PIt1bMv4qQIwuaB62yeg6jxGjMNdQoZpyy0KfdT23rXlp+fTMly3p6GWN7jDHuSM6yLJsNvBoM8kNEWbNdzPU7AxbEthLQJvC\
Nz7aIjYIC/AXp8v+kw3puRZQJRZr/4IdkVnlAKhPxZJYI3ryq1QprVEqCGL43v6/Zm76qowYl/1fVGW4ro1/U2d5afV3fXg0XFyZ1w/isJmtfv/4zajrRovpP5nBlU7VtoDKyHHFAGECrf2dd\
N3f4n/2Bd05As/zkeSvPtYwh1/L9GIw1uEdnpf304rbP1AnH0YQZta3S+nXhPHtwMhRWrcmpak6jZdpOaFunl8G0tfDCH586yukd3DqRn6KbuBe7bBxCgrMmF6bagBsVtmOWX/AyNFcOr4y9u\
atjSr7IypklYX916wfKBzbA+tPVWWvJuuVNdbZhTO8iEG7b7W79r4+ePbTQG0tmKFbL5DJeaCaXnjy/WTRqWK61UzrdtAw17GFPuBGS3LMpnXTsT0+yvk9Sw8ol1BPxxA2d1ZPiiaT/Ev4ldC\
GzBUyQMrV3dvutKCzu9tjAdeqbvQWdBWJOzixgXN0YYLtSUqUTCmZAjJ2LK8eTZk2vdEVzI+ItpXedUid1N4vm62IZ18ooek33/UZ1V/zVhWM9aNeoNQnbTOHGzFaNJjidvGP7lfPDp5+vt/I\
hMoPhesNVW1IjuSD9XiW23FQe7CqvwK0pyV9lMn99tgwZl1MooJbYxQd+fmVtNHP+1seH/sU67vdj1FbUuslIQwGAwYV8VWeL1eLvuKUM55yMswvVtJ2lQjX3xNJnhBdw0QrHrYn2zX6loE3L\
isvnftZ6ESEiukj+t5v2Q4OSNBk1rF9gS6etigoJwehTbXqV2JGjx2FW7LGJ3baawyLLhObRPJR4OEhGVueWk77caSwuHT5ttrus33ZY2/s6BwB+9XOhsQNYiFvb1fUCSt/VSVVOry7GxSXPs\
ulxGsdz8btEA8mqqq17VAUz4MIW7b/+avLooxjzzjZM1/HZ0J7pTFPIV9LKEV4h9e8n/7UqNwshK5qwsNtMYCvbWftMywaeJnzwFF7klb+hd8tFQ4Q63GaSee6MkAqYm4zpnkcVT8ea9Y1h4c\
Rl8gW4blTWIEbvJ/y01o0ftU9fKTf3iojTMUTpeEM4hiAPJI1G7zjiWs2ffSwef8Wr1moQgouQSLuE+Y9eLbOIyYg3DdxCiZvjl7B3pOHXJwcBhiJn7C/y1BGX8SRTVMKZsmms4Zu8Qf+I3Ki\
+g4bbnkjZyoGJnvt3i4VrGS8kjpnSC19DEm51aKKu/iRArHtbP25bWANSTwI+9TOWtwCUjKMdHo7hnvYY5UZ+ZHgmWTqb9DDptxLsAsyUjbarEBRYsm1/2v96ZKijQtqIqKn8GxlHhyDei5YV\
dR9BgTSOJMYdMvHTUH1PR6AsE6sqPr6RRQv5rc30bOfJrPX+MGVnFTixmJxhY8/UTJ/e1TsmYcxS/LQWu18Y4TcTcg94F2yWxjvOlbTndiBjNmpoW1rEZ2U0F2Np6GEnoWHK7poDDpaSAAOC7\
r7cNOfu16d98aMhgWKYWzw3zXbohkwFwG5GJALt6cLIe8jS7IS0EZ8RpUsYQGAhG84YQe9KSgy9IpTu7NPO9EZMfPDyyGD+tRw+JPTvEqeSMSwL2HLYBFfvrtYYs3a3iYz3cbH74kW97QUQCP\
QIDFw+KgAe9SucdwC1ydjGzcVNcGsDzRbr09HcuCOg0l+kKsF4LQRsxyYqIwUF4LVk04dADojoduY5EFuuw3Hpdl5qb5Naz7cWKE1FlaIUl1xhMhe1hUKODNSp3lbXudEBJ1rWReDZrL1RcHZ\
3759647xsXUrOKCXo7Rmwoef+5Od6tRtTHC/DpnX3Y53VXBGpYznE+Pw4ogpLrtrUJfBfMdPS6iKZXFO0062fp9VFZTPm0bwBRjKfj6sFKe94AydzOhdoY0tO/bwtnaOWhRqjI2xXWz1UVfHZ\
eWnO181QdlB94Di9tckiEQZPnYBbF7A2tfG+UawNRvyaJsmcREN6IokYVsEON/ERh5L+CEQyYUirZFH+yokaEm43aL8EAH4VnAjvB6g5urntZw17vYoU1bG3B+utWrSliYgw+oG1VVYTdaYA0\
PJf5qt0Mw/a71QvokCXpBSmer90u+e0au4H/fbj+6sbchanxe/jsuT0l/SdW74dQQD2kjj96/zz/dHdzzZX67EqVY2Sd/tKjnrpWrLca5rt8JREn7VzDeim4OaLM+5EMpaalx7OQTfXvIezbf\
dFLDUkpz+CF37Z32utc343pnXwKmXoaUFuYkkEQI9EHgD6+HKM2bRuMrysY6x7P2oJfJZ03vsuNmy8pwBqns1CfV/PrarialSWnD6rxDJOKgaSNjLo9oIBXGwMYtbQBsIRwkK88EcmVRrCTb0\
KAAAAQ9ZzmgcjkwlZaBa1Z9b3Q13BtCgJA14V3Gl1ADGNYk5hs/tKXL0A1BvhwzTXIvM/04pZWtq7MzMoa5O4lKpMAeAWbprE7vPnPuwbSWx/RlgInU6PPvuQe9e3/PMI/gmhinG8WB49V8az\
60ymereni4iyvPfrUsN5vh3c8b3KDlLMuHtuk0VeOekmfMVv/PFvs56kSXfL3HW4b1opfpxX0P8TyRkRf5P/ztjCcMPvhZKNHz56ugTq9lIyUXwp2Jrmclga60NOO6vul5EGc+WJIqGFyc+9t\
Vlqa+PtTIZ+KMH2eS3bgwRcczNU7qTvvWm2rKQNEOiz0V1m6b1QxAj2xNSYxlnzFbKlaN0atHsCoIRtelK/L39SXfR4r0z4EUPc3bF9EVgAfhXcQfcOYJt5pCP8rLQQJ7mLajicN2WOltf0fl\
DBDqID70RVVVAAzmRvZmtz2bGveaeHV3WboaIefnZrYBPLiK45Y6zaikSWAETyb6D/Uzg5/QnpfKzVAHnspzWmgaC0hJy+Ty0yCQYNVdYiDZyb025KPjLDD2XD5RBaYVvmfbzPVicvRNme3ra\
kUjkwSs5BwwVuzbBYwGkWvm66sKCkPzcsMWjOssAadVPsxxYoVEHrwjWkbOzNFS50XNSrmZPiPcm8/Cf1FWmCfP+lbD6Nr8mSP55vLLHwagnu64gmtT/pl9UfbZh06wviVEiNdyA2ZoZBQX62\
WNYSbqRdCeEDdeYrIyHKHm34nREZEQB+FbyI4h1QBm5mizBKgRmXWZm7CQqEwVVrhKI6iXRCjaAAdrQ1ovh3qeW7VE+lrS2BuNp/UV8X/kxxvGa9sJiav22yrXBvfS2X0EoVbUDuN+UqlyUpi\
Usk6F2nbL763ULOyuzooxcTyFBz2+Bo7fdNNMS2iyUsVisD0Ibf8zKYC4t/7nSdVPv2YIt3qBDv9WyzYiwDbDFh0n/my6e4zFNEUfKJHcEQYuTcnAHTRaXu2/Sro01W+Xmytp+WEA4VF5ktbD\
f2i8RoxWwwI5m4rEQW7ceqiTfW07PJ34zVz9IIzjGjLmBKK5z7KxUWIheWvNOws6oldNyC5R7FzvJwiH49w8ITQUI36B0mlyKzRxXuZ2YfJXFFAH4VvPvqHZh1SmIIP07XsBsq40OvdosxtLV\
JqUopAGDwvUigw8bc5CMoeCH52L/lu4h7P4wuMa1JGsrAek+utoFHZh1nfOMXxs68HDu0r22nWXyK1yqV7isQWLdvT7/QNuF+2n5xGugRWDFEmzV3xe9AEItDAg5207ZqbZnqam0Mvd6255fP\
TzuesnVpk3LNpe5Dtsg3KH/rjgyvF61Thst7xsddmQZ8wYa77RTPWPXIc6mEIQPXp0s6kC8jK8uHTnE0LoUdypa1NuDbXRnIoT9NOFAiZsZFaNM34muChnCi1oCc4qc4wPIwGdKALCRjrAAmK\
PkbiA89DDNex7Rrn2cJYJ6qscPfMoLR+S4LT2dnUwAEpk8AAAAAAAB0S511AwAAALCh85EM/wb/Av7/AP8F+/PEHhW8u+4PuElaAVGUhVPJ1MGqOte8ehtX6LwBrI3HXQXJFIBbZt+0fk/Uc6\
v2f439KbzwuLuPJj3n+LxW2fvtn3eql/sKn3qZpp4z2THO2mhcd4Z1Z3qtUsCP6G+l6DMkJfvek/HFlYXYYIJsOz1byN16uIsvo5u1ULaG8yEIO3eSPZsFqfXj6iSHqWkTHn2K8QsIglR3FOH\
8OrT46PzvfnAQ9C+RDMHVSqzlmrruE2nbsYPkOMTL04x/3NU8nO5Xtm2xmTQ1mOIMRnpLrZkl05HfYwoft3aGx5LX/KuOOXeaO6lBnZNIGU7qZLWTXm9aXpXDe6omgBXDJfyI0q2/6jbEUQUA\
fhW8lfl9XRMbQo2iLuzOa6Yqzc+x1sa6qpIMAJua/SCgfzuVvCP31h2JmlJ1Ue3ZVpgPQqnw9wMLWrBa3y/B2Zfl2FUZkBzoE+LGKmeGeYeN2Xp5oWE5NsG9mXBSYbOhHPe5MZs1VejbKt1//\
bL7donl1+2wulc3mJ0TwOPErvOgNoSg5YUiT1gskWjKeB5kbLufJlOh0yw+U55+j6I9lZW/V03bXCmjFAdTrnqTpMfMftvKRbjfexGEDCwNE3xXAodzs1G1QmkxVaa9bvfERabIPi/b7CBdE0\
umuIq3l7+rE2Ptr/scgnq06wX5/OaKPZBsOJaDkQ8vnEs/3fUsywI+FbzX5h+IFg6BKBV2FG8uFEEzTtlUuQoVTAGkx2XKt7zHv/RXA0ed3ZNA7cKAvnsXisrvTrHMjlr2GmxRHLMSLzmhZE8\
bUq0yd33p/aSP02I1wXJZYuAIH1uAY9vifnexpsFY4qhCP7Lrmey8njxNevDn/WHLf3RTZzCQNZOyXDsWD8OAd7UHZAHVjNdUi1jKOY5cnGjKvlwrqmAlcqqaTyHNpiC1kuO7fHL854HcE962\
aYIY6JZWVJJ5ngs3LspFs6zTDFahV4lGWodwku9jBFNT1tTkdmebx+mRhqUARDDqF5yNQcAY1BLGO8Owygav0upVE886kmWNcloEAB4VfKb6u24KDaQHs17TDe52EUrICFocwNrERiipDABXC\
lC3I/FBfj/kdldxokjGR1roJTXOYpUMfqJ5Um9jPBFP6erCwd32/R1w8wt53Xn5fyxifu8ths5dhWSWM1uIPOv9cr7Sq6bf9TtQ4KB0sOwj45lVLKZ4mfpP6KyM5RJfK2veUxMfiqPGy4+9/p\
qMWei99kBmCcUIALnrpD0e8YZEY4ZkdC46vYUBO+sUqE21gQfHFeqL41/obEjP8qY/ZliIhMn7+zr++mcp85brnb6K+WCQd/0FT6+k95v/XI/M5Mn9ocS+X8/MsvqFqPaBcFgYc6loW2KMvdo\
OK2miAv4UvPbxd+WJAtKDbbQPsrTWAiOsTVecFIIBAIQsD9P/f92j8kB+aXsemz5xwezO6yozoBnXkp0P5U4JKN7raPfI6RiSNrYGZ87HFbijpMaxT3OEpGdGHn6n7MHUcpaUNXOr746epPVF\
1WnkPEXs0c2x1BE6RyDfg0vSHijksN2S5EG32A/LLTvW7vRuYinb+WFk4liXmhEf0ZiQmBFwabmUUSrK2BIjxh7qaOXeekysp4ho6aIbrfWMTK08oXJugLfPTJ0BeDmRl/zv26p/7Ru05v11b\
abX05jGb1IztdpJOjA/sjx/xcJQWmJP3Zq95JDuqWxLZtpvHMu2P9x8j1TOMaMAPhW87e37RSKhSQX2pJRTLAtvf7FJIlUqyQBAbTwOKltv3RFfpCeIbJFqSpbDf0udl6bRLsoj8fyugAKN9V\
3z18es0YNzJJeUr3lj6O5F6yPY8xuv6daflnr0ToH4/RuRp4qhpe203L5+06MZXdNZv9PkJ8t1eES3ZdORDxcMAyQ6xSikov3Wa8xX3TqIJLnb9hMv4HHijOPuyvmjsqjZBS15M+NMY3QfDY6\
l2DbOx7MmTfCLj5Z7fXpx21uU6Zwe312nVPBWxYv7rbVLfo21O7vfzN2GKXRNuoJx1y3G7bSH5CSXPGY89OXAeMaocO+wDUJ49lUhRh+fmgD+FLzu4/sjGQmArczBfnd7WC1beRmSJFEVggGA\
vx4r7L/MdLWPIdDR9t9bw8PUe+9XXQfG54WcRPMRRC7xQWM7/4FvUtDQFUnl86mwc3OpAuEAzrh5v95Yh4iN+7aAYpoPQWzxCSbE/8AaGEGrE5otigb219JUyggG6Nc8TTtacXnjgah4hVR6N\
15rj3lr1sIrz/wpLh9o1HZSP6dc0r0zN+X0sVS1bzaRjDe+O5Thc4zmRFvFBhCAbenCnMf86kGvlKoSQ792i6VFSXQ4pK0aIRZgGnFoJKuM1KzuX3TJRGC5uR3HmsVrouX+qnMm2it2rQreFP\
zep/eAMBq2dDCc91UdkURVhWAGACx9k5Xv15TNf/TMHxYXFQioG9S7Xh//qlUUZa3Xj+NZYg5f/z8ruM+//Orh0rHH2NePzwiAu/P+WNwvGYAvw3x8RnBnAOZtj8dDua/jKpofhrl+/Jjc5/u\
HoTvXx9n6G43nUzzA16ehXGRLgOeydW0tWPP3ir6wVgVQ1vx9He3tya1of6Dzb7Tb0RwBAMwriq/Baz/8EE6cFNGokXGu8WjxgB8ufbKAzw9YWQAu';

/**
 * Other Global Variables
 * ++ instantiate them
 */
var MT___states;
var MT___countries;
MT___states = {
	"AL": "Alabama",
	"AK": "Alaska",
	"AS": "American Samoa",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"DC": "District Of Columbia",
	"FM": "Federated States Of Micronesia",
	"FL": "Florida",
	"GA": "Georgia",
	"GU": "Guam",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MH": "Marshall Islands",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"MP": "Northern Mariana Islands",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PW": "Palau",
	"PA": "Pennsylvania",
	"PR": "Puerto Rico",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VI": "Virgin Islands",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming"
}
MT___countries = [
	{name: 'Bosnia and Herzogovina', code: 'BA'}, 
	{name: 'Curacao', code: 'CW'}, 
	{name: 'Cocos Islands', code: 'CC'}, 
	{name: 'Sao Tome and Principe', code: 'ST'}, 
	{name: 'Afghanistan', code: 'AF'}, 
	{name: 'Aland Islands', code: 'AX'}, 
	{name: 'Albania', code: 'AL'}, 
	{name: 'Algeria', code: 'DZ'}, 
	{name: 'American Samoa', code: 'AS'}, 
	{name: 'AndorrA', code: 'AD'}, 
	{name: 'Angola', code: 'AO'}, 
	{name: 'Anguilla', code: 'AI'}, 
	{name: 'Antarctica', code: 'AQ'}, 
	{name: 'Antigua and Barbuda', code: 'AG'}, 
	{name: 'Argentina', code: 'AR'}, 
	{name: 'Armenia', code: 'AM'}, 
	{name: 'Aruba', code: 'AW'}, 
	{name: 'Australia', code: 'AU'}, 
	{name: 'Austria', code: 'AT'}, 
	{name: 'Azerbaijan', code: 'AZ'}, 
	{name: 'Bahamas', code: 'BS'}, 
	{name: 'Bahrain', code: 'BH'}, 
	{name: 'Bangladesh', code: 'BD'}, 
	{name: 'Barbados', code: 'BB'}, 
	{name: 'Belarus', code: 'BY'}, 
	{name: 'Belgium', code: 'BE'}, 
	{name: 'Belize', code: 'BZ'}, 
	{name: 'Benin', code: 'BJ'}, 
	{name: 'Bermuda', code: 'BM'}, 
	{name: 'Bhutan', code: 'BT'}, 
	{name: 'Bolivia', code: 'BO'}, 
	{name: 'Bosnia and Herzegovina', code: 'BA'}, 
	{name: 'Botswana', code: 'BW'}, 
	{name: 'Bouvet Island', code: 'BV'}, 
	{name: 'Brazil', code: 'BR'}, 
	{name: 'British Indian Ocean Territory', code: 'IO'}, 
	{name: 'Brunei Darussalam', code: 'BN'}, 
	{name: 'Bulgaria', code: 'BG'}, 
	{name: 'Burkina Faso', code: 'BF'}, 
	{name: 'Burundi', code: 'BI'}, 
	{name: 'Cambodia', code: 'KH'}, 
	{name: 'Cameroon', code: 'CM'}, 
	{name: 'Canada', code: 'CA'}, 
	{name: 'Cape Verde', code: 'CV'}, 
	{name: 'Cayman Islands', code: 'KY'}, 
	{name: 'Central African Republic', code: 'CF'}, 
	{name: 'Chad', code: 'TD'}, 
	{name: 'Chile', code: 'CL'}, 
	{name: 'China', code: 'CN'}, 
	{name: 'Christmas Island', code: 'CX'}, 
	{name: 'Cocos (Keeling) Islands', code: 'CC'}, 
	{name: 'Colombia', code: 'CO'}, 
	{name: 'Comoros', code: 'KM'}, 
	{name: 'Congo', code: 'CG'}, 
	{name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
	{name: 'Cook Islands', code: 'CK'}, 
	{name: 'Costa Rica', code: 'CR'}, 
	{name: 'Cote D\'Ivoire', code: 'CI'}, 
	{name: 'Croatia', code: 'HR'}, 
	{name: 'Cuba', code: 'CU'}, 
	{name: 'Cyprus', code: 'CY'}, 
	{name: 'Czech Republic', code: 'CZ'}, 
	{name: 'Denmark', code: 'DK'}, 
	{name: 'Djibouti', code: 'DJ'}, 
	{name: 'Dominica', code: 'DM'}, 
	{name: 'Dominican Republic', code: 'DO'}, 
	{name: 'Ecuador', code: 'EC'}, 
	{name: 'Egypt', code: 'EG'}, 
	{name: 'El Salvador', code: 'SV'}, 
	{name: 'Equatorial Guinea', code: 'GQ'}, 
	{name: 'Eritrea', code: 'ER'}, 
	{name: 'Estonia', code: 'EE'}, 
	{name: 'Ethiopia', code: 'ET'}, 
	{name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
	{name: 'Faroe Islands', code: 'FO'}, 
	{name: 'Fiji', code: 'FJ'}, 
	{name: 'Finland', code: 'FI'}, 
	{name: 'France', code: 'FR'}, 
	{name: 'French Guiana', code: 'GF'}, 
	{name: 'French Polynesia', code: 'PF'}, 
	{name: 'French Southern Territories', code: 'TF'}, 
	{name: 'Gabon', code: 'GA'}, 
	{name: 'Gambia', code: 'GM'}, 
	{name: 'Georgia', code: 'GE'}, 
	{name: 'Germany', code: 'DE'}, 
	{name: 'Ghana', code: 'GH'}, 
	{name: 'Gibraltar', code: 'GI'}, 
	{name: 'Greece', code: 'GR'}, 
	{name: 'Greenland', code: 'GL'}, 
	{name: 'Grenada', code: 'GD'}, 
	{name: 'Guadeloupe', code: 'GP'}, 
	{name: 'Guam', code: 'GU'}, 
	{name: 'Guatemala', code: 'GT'}, 
	{name: 'Guernsey', code: 'GG'}, 
	{name: 'Guinea', code: 'GN'}, 
	{name: 'Guinea-Bissau', code: 'GW'}, 
	{name: 'Guyana', code: 'GY'}, 
	{name: 'Haiti', code: 'HT'}, 
	{name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
	{name: 'Holy See (Vatican City State)', code: 'VA'}, 
	{name: 'Honduras', code: 'HN'}, 
	{name: 'Hong Kong', code: 'HK'}, 
	{name: 'Hungary', code: 'HU'}, 
	{name: 'Iceland', code: 'IS'}, 
	{name: 'India', code: 'IN'}, 
	{name: 'Indonesia', code: 'ID'}, 
	{name: 'Iran, Islamic Republic Of', code: 'IR'}, 
	{name: 'Iraq', code: 'IQ'}, 
	{name: 'Ireland', code: 'IE'}, 
	{name: 'Isle of Man', code: 'IM'}, 
	{name: 'Israel', code: 'IL'}, 
	{name: 'Italy', code: 'IT'}, 
	{name: 'Jamaica', code: 'JM'}, 
	{name: 'Japan', code: 'JP'}, 
	{name: 'Jersey', code: 'JE'}, 
	{name: 'Jordan', code: 'JO'}, 
	{name: 'Kazakhstan', code: 'KZ'}, 
	{name: 'Kenya', code: 'KE'}, 
	{name: 'Kiribati', code: 'KI'}, 
	{name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
	{name: 'Korea, Republic of', code: 'KR'}, 
	{name: 'Kuwait', code: 'KW'}, 
	{name: 'Kyrgyzstan', code: 'KG'}, 
	{name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
	{name: 'Latvia', code: 'LV'}, 
	{name: 'Lebanon', code: 'LB'}, 
	{name: 'Lesotho', code: 'LS'}, 
	{name: 'Liberia', code: 'LR'}, 
	{name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
	{name: 'Liechtenstein', code: 'LI'}, 
	{name: 'Lithuania', code: 'LT'}, 
	{name: 'Luxembourg', code: 'LU'}, 
	{name: 'Macao', code: 'MO'}, 
	{name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
	{name: 'Madagascar', code: 'MG'}, 
	{name: 'Malawi', code: 'MW'}, 
	{name: 'Malaysia', code: 'MY'}, 
	{name: 'Maldives', code: 'MV'}, 
	{name: 'Mali', code: 'ML'}, 
	{name: 'Malta', code: 'MT'}, 
	{name: 'Marshall Islands', code: 'MH'}, 
	{name: 'Martinique', code: 'MQ'}, 
	{name: 'Mauritania', code: 'MR'}, 
	{name: 'Mauritius', code: 'MU'}, 
	{name: 'Mayotte', code: 'YT'}, 
	{name: 'Mexico', code: 'MX'}, 
	{name: 'Micronesia, Federated States of', code: 'FM'}, 
	{name: 'Moldova, Republic of', code: 'MD'}, 
	{name: 'Monaco', code: 'MC'}, 
	{name: 'Mongolia', code: 'MN'}, 
	{name: 'Montserrat', code: 'MS'}, 
	{name: 'Morocco', code: 'MA'}, 
	{name: 'Mozambique', code: 'MZ'}, 
	{name: 'Myanmar', code: 'MM'}, 
	{name: 'Namibia', code: 'NA'}, 
	{name: 'Nauru', code: 'NR'}, 
	{name: 'Nepal', code: 'NP'}, 
	{name: 'Netherlands', code: 'NL'}, 
	{name: 'Netherlands Antilles', code: 'AN'}, 
	{name: 'New Caledonia', code: 'NC'}, 
	{name: 'New Zealand', code: 'NZ'}, 
	{name: 'Nicaragua', code: 'NI'}, 
	{name: 'Niger', code: 'NE'}, 
	{name: 'Nigeria', code: 'NG'}, 
	{name: 'Niue', code: 'NU'}, 
	{name: 'Norfolk Island', code: 'NF'}, 
	{name: 'Northern Mariana Islands', code: 'MP'}, 
	{name: 'Norway', code: 'NO'}, 
	{name: 'Oman', code: 'OM'}, 
	{name: 'Pakistan', code: 'PK'}, 
	{name: 'Palau', code: 'PW'}, 
	{name: 'Palestinian Territory, Occupied', code: 'PS'}, 
	{name: 'Panama', code: 'PA'}, 
	{name: 'Papua New Guinea', code: 'PG'}, 
	{name: 'Paraguay', code: 'PY'}, 
	{name: 'Peru', code: 'PE'}, 
	{name: 'Philippines', code: 'PH'}, 
	{name: 'Pitcairn', code: 'PN'}, 
	{name: 'Poland', code: 'PL'}, 
	{name: 'Portugal', code: 'PT'}, 
	{name: 'Puerto Rico', code: 'PR'}, 
	{name: 'Qatar', code: 'QA'}, 
	{name: 'Reunion', code: 'RE'}, 
	{name: 'Romania', code: 'RO'}, 
	{name: 'Russian Federation', code: 'RU'}, 
	{name: 'RWANDA', code: 'RW'}, 
	{name: 'Saint Helena', code: 'SH'}, 
	{name: 'Saint Kitts and Nevis', code: 'KN'}, 
	{name: 'Saint Lucia', code: 'LC'}, 
	{name: 'Saint Martin', code: 'MF'}, 
	{name: 'Saint Pierre and Miquelon', code: 'PM'}, 
	{name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
	{name: 'St. Vincent & Grenadines', code: 'VC'}, 
	{name: 'Samoa', code: 'WS'}, 
	{name: 'San Marino', code: 'SM'}, 
	{name: 'Sao Tome and Principe', code: 'ST'}, 
	{name: 'Saudi Arabia', code: 'SA'}, 
	{name: 'Senegal', code: 'SN'}, 
	{name: 'Serbia and Montenegro', code: 'CS'}, 
	{name: 'Seychelles', code: 'SC'}, 
	{name: 'Sierra Leone', code: 'SL'}, 
	{name: 'Singapore', code: 'SG'}, 
	{name: 'Slovakia', code: 'SK'}, 
	{name: 'Slovenia', code: 'SI'}, 
	{name: 'Solomon Islands', code: 'SB'}, 
	{name: 'Somalia', code: 'SO'}, 
	{name: 'South Africa', code: 'ZA'}, 
	{name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
	{name: 'South Korea', code: 'KR'}, 
	{name: 'Spain', code: 'ES'}, 
	{name: 'Sri Lanka', code: 'LK'}, 
	{name: 'Sudan', code: 'SD'}, 
	{name: 'Suriname', code: 'SR'}, 
	{name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
	{name: 'Swaziland', code: 'SZ'}, 
	{name: 'Sweden', code: 'SE'}, 
	{name: 'Switzerland', code: 'CH'}, 
	{name: 'Syrian Arab Republic', code: 'SY'}, 
	{name: 'Syria', code: 'SY'}, 
	{name: 'Taiwan', code: 'TW'}, 
	{name: 'Tajikistan', code: 'TJ'}, 
	{name: 'Tanzania, United Republic of', code: 'TZ'}, 
	{name: 'Thailand', code: 'TH'}, 
	{name: 'Timor-Leste', code: 'TL'}, 
	{name: 'Togo', code: 'TG'}, 
	{name: 'Tokelau', code: 'TK'}, 
	{name: 'Tonga', code: 'TO'}, 
	{name: 'Trinidad and Tobago', code: 'TT'}, 
	{name: 'Tunisia', code: 'TN'}, 
	{name: 'Turkey', code: 'TR'}, 
	{name: 'Turkmenistan', code: 'TM'}, 
	{name: 'Turks and Caicos Islands', code: 'TC'}, 
	{name: 'Tuvalu', code: 'TV'}, 
	{name: 'Uganda', code: 'UG'}, 
	{name: 'Ukraine', code: 'UA'}, 
	{name: 'United Arab Emirates', code: 'AE'}, 
	{name: 'United Kingdom', code: 'GB'}, 
	{name: 'United States', code: 'US'}, 
	{name: 'United States Minor Outlying Islands', code: 'UM'}, 
	{name: 'Uruguay', code: 'UY'}, 
	{name: 'Uzbekistan', code: 'UZ'}, 
	{name: 'Vanuatu', code: 'VU'}, 
	{name: 'Venezuela', code: 'VE'}, 
	{name: 'Viet Nam', code: 'VN'}, 
	{name: 'Virgin Islands, British', code: 'VG'}, 
	{name: 'Virgin Islands, U.S.', code: 'VI'}, 
	{name: 'Wallis and Futuna', code: 'WF'}, 
	{name: 'Western Sahara', code: 'EH'}, 
	{name: 'Yemen', code: 'YE'}, 
	{name: 'Zambia', code: 'ZM'}, 
	{name: 'Zimbabwe', code: 'ZW'} 
];
//MT__INSTANTIATE_VAR_STATES_COUNTRIES();
