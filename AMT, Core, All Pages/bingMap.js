
function DrawMap() {
		   //console.log('hi');
		   try {
			   console.log(Microsoft);
			   console.info(Microsoft.Maps);
			   console.info(Microsoft.Maps.Map);
		   }
		   catch(Ex) {
				console.log(Ex);
				setTimeout(DrawMap,1000);
		   }
		}
		
DrawMap();
