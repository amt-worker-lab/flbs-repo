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
