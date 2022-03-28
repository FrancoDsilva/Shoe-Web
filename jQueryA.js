$(function() {
	$("#spinner").spinner({
		min:0,
		max: 9,
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {
	  $("#style").selectmenu();
});

$(function() {
	$("#gender").selectmenu();
});
$(function() {
	$("#color").selectmenu();
});



$(function() {
	$("#slider-range").slider({
		range:true,
		min: 0,
		max: 350,
		values: [ 75, 250 ],
		slide: function( event, ui ){
			$("#amount").val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	
	$("#amount").val(" $" + $(" #slider-range").slider( "values", 0 ) + " - $" + $("#slider-range").slider( "values", 1 ) );
});


$(function() {
	$( "#Search" ).on("click", function(){
		
		var Sstyle = $("#style").val();
		var Sgender = $("#gender").val();
		var Scolor = $("#color").val();
	    var size =  $("#spinner").val();
		var minPrice = $("#slider-range").slider("option", "values")[0];
		var maxPrice = $("#slider-range").slider("option", "values")[1];
		
		var output="<ul>";
		   for (var i in data.shoes) {
			   if (( Sstyle == data.shoes[i].style) || (Sstyle=="Any"))
			   if (( Sgender == data.shoes[i].gender) || (Sstyle=="Any"))
			   if (( Scolor == data.shoes[i].colour) || (Scolor=="Any"))
			   if (( size == data.shoes[i].sizes ))
			   if (( data.shoes[i].price >= minPrice && data.shoes[i].price <= maxPrice ))
			   {
				   {
					   {
						   {
							   output+="<h2><li>" + data.shoes[i].name +"</li></h2>" + "<img src=" + data.shoes[i].picture + ">" + "<p class='price'>"+"$"+data.shoes[i].price+ "</p>"+"<p>"+ data.shoes[i].description + "</p>" + "<button><a href='" + data.shoes[i].url + "'>Visit Page</a></button><hr>";
						   } } } } }
				output+="</ul>";
				document.getElementById( "Placeholder" ).innerHTML = output;
		   });
	});
	
$(function() {
	$( ".addFavourites" ).on("click", function(){
		
		try {
			$(this).attr('disabled', true);
			
			var propIdToAdd = $(this).closest("p").attr("id");
			
			var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			if(myFavouriteProp == null) {
				myFavouriteProp = [];
			}
			
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToAdd == myFavouriteProp[j]) {
						
						alert("This property is already in your favourites"); 
						myFavouriteProp = [];
					}
				}
			}
			
			myFavouriteProp.push(propIdToAdd);
			
			localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
			
		}
		
		catch (e) {
			if (e==QUOTA_EXCEEDED_ERR) {
				console.log("Error: Local storage limit exceeds");
			}
			
			else {
				console.log("ERROR: Saving to local storge.");
			}
		}
	});
});

$(function() {
	$( ".removeFavourites" ).on("click", function(){
		
			$(this).attr('disabled', true);
			
			var propIdToRemove = $(this).closest("p").attr("id");
			
			 myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToRemove == myFavouriteProp[j]) {
						
						alert("This Property has been removed");
						
						delete myFavouriteProp[j];
						
						localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
						
						myFavouriteProp[j] = [];
					}
				}
			}
			
			if(myFavouriteProp == null) {
				alert("You have no favourite items");
			}
		});
	});
	

	





$(function() {
	$( ".viewFavourites" ).on("click", function(){
		
		console.log("Restoring array data from local storage");
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		var output = "<ul>";
		
		if (myFavouriteProp != null) {
			
			for (var i = 0; i < data.shoes.length; i++) {
				for (j = 0; j < myFavouriteProp.length; j++) {
					
					if (data.shoes[i].id == myFavouriteProp[j]) {
						
						output+="<h2><li>" + data.shoes[i].name +"</li></h2>" + "<img src=" + data.shoes[i].picture + ">" + "<p>" + data.shoes[i].description + "</p>" + "<button><a href='" + data.shoes[i].url + "'>Visit Page</a></button>";
					}
				}
			}
		}
		output+="</ul>";
		
		document.getElementById( "Placeholder2" ).innerHTML = output;
	
	});
});


$(function() {
	$( ".clearFavourites" ).on("click", function(){
		
		$("#Placeholder2").remove();
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		localStorage.clear();
		
	});
	
});
