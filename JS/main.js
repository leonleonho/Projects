/**
All of the public variables go here
**/
var day;
var markers = [];
var distances = [];
var userid; //This is the current user's id.
var userPosition;
var ajaxData; //This holds the call back data retrieved from ajax call
/**
All of your functions go here. If something needs to be run on initialization, add it into the initalization function
**/
function initalize() {
    generateMenuPanel();
    setCookie("memberid", 5, 1);
    userid = getCookie("memberid");
}

		/** Sign up page JavaScript**/
		//Checks to see if all data within the form are correct and adequate.
		//Also fills the divisions with characters to notify the user if 
		//any information is incorrect.
function formValidate() {

	var test = true;
	
	if (!testNameEmpty() ){
	document.getElementById('errName').innerHTML='*';
		test = false;
	} else {
		document.getElementById('errName').innerHTML='';
	}
		
	if (!testUsername() ){
		document.getElementById('errUser').innerHTML='*';
		test = false;
	} else {
		document.getElementById('errUser').innerHTML='';
	}
	
	if (testPassword() == 0 ){
		document.getElementById('errPass').innerHTML='*';
		test = false;
	} else if (testPassword() == 1){
			document.getElementById('errPass').innerHTML='* Must contain at least 7 charcters';
			test = false;
		} else if (testPassword() == 2){
			document.getElementById('errPass').innerHTML='* Must contain an uppercase character';
			test = false;
			} else if (testPassword() == 3){
				document.getElementById('errPass').innerHTML='* Must contain a number';
				test = false;
				} else {
				document.getElementById('errPass').innerHTML='';
				}
	
	if (!testConPass() ){
		document.getElementById('errConPass').innerHTML='* Passwords are not the same';
		test = false;
	} else { 
		document.getElementById('errConPass').innerHTML='';
	}
		
	if (!testEmail() ){
		document.getElementById('errEmail').innerHTML='*';
		test = false;
	} else { if (!testValidEmail() ){
			document.getElementById('errEmail').innerHTML='* Invalid Email';
			test = false;
		} else {
			document.getElementById('errEmail').innerHTML='';
		}
	}
	
	if (test == false) {
		document.getElementById('missingEle').innerHTML='Missing or Invalid Elements';
	}
	return test;
}

function connectMain() {
	window.location.href = "index.php";
}

function connectSignIn() {
	window.location.href = "start.html";
}
		
//Test name to see if it only contains characters and is filled out
function testNameEmpty() {
	var first = document.getElementById('firstname').value;
	var last = document.getElementById('lastname').value;
	
	if ((first == "") || (last == "")) {
		return false;
	}
	if (!first.search(/^([a-zA-Z]*)$/)) {
		return true;
	}
	if (!last.search(/^([a-zA-Z]*)$/)) {
		return true;
	}
}
		
//Test the Username to see if empty
function testUsername() {
	var username = document.getElementById('usersignUp').value;
	
	if (username == "") {
		return false;
	} else {
	return true;
	}
}

//Test password to check for appropriate length and number of characters
function testPassword() {
	var password = document.getElementById('passsignUp').value;
	
	if (password == "") {
		return 0;
		} else { if ((password).length <= 6) {
			return 1;
			} else { if (password.search(/^.*(?=.*[a-z])(?=.*[A-Z]).*$/)) {
				return 2;
				} else { if (password.search(/^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
					return 3;
				} else { return 4;
				}
			}
		}
	}
}

//Test to see if passwords are the same
function testConPass() {
	var password = document.getElementById('passsignUp').value;
	var Confirmpassword = document.getElementById('conPass').value;
	
	
	if (password == Confirmpassword) {
		return true;
	} else {
	return false;
	}
}
	
//Test for correctness of BCIT email
function testValidEmail() {
	var mail = document.getElementById('email').value;
	
		if (mail == ''){
	}		
	if(!mail.search(/^([a-zA-Z0-9]*)@my.bcit.ca$/)) {
		return true;
	}
	return false;
}
		
//Test to see if anything is filled in the email box
function testEmail() {
	var mail = document.getElementById('email').value;
	
	if (mail =='') {
		return false;
		} else {
	return true
	}
}
/**
This function generates all of the required menus for each page since jquery requires panels for 
every single page.
**/
function generateMenuPanel() {
    var panel = '<div data-role="panel" class = "menuPanel" id="mypanel" data-position="left" data-display="overlay">\
        <div class ="menutitle"><h1>Menu</h1>\</div>\
        <a href = \"#home\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\home-white.png" width =12em alt = "Home Icon"> Home</a>\
        <a href = \"#myProfile\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\user-white.png" width =12em alt = "Profile Icon"> My Profile</a>\
        <a href = \"#myRideSchedule\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\calendar-white.png" width =12em alt = "Schedule Icon"> My Schedule</a>\
        <a href = \"#findMatches\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\search-white.png" width =12em alt = "Find Icon"> Find Matches</a>\
		<a href = \"#editProfile\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\edit-white.png" width =12em alt = "Edit Icon"> Edit Profile</a>\
		<a href = \"#settings\" data-transition=\"slide\" data-rel=\"close\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\gear-white.png" width =12em alt = "Settings Icon"> Settings</a>\
		<a href onclick = \"return connectSignIn()\" data-transition=\"slide\" class = \"menuLink\"><img src = "JS\\jqueryMobile\\images\\icons-png\\arrow-l-white.png" width =12em alt = "Logout Icon"> Log Out</a>\
		</div>';
  $.mobile.pageContainer.prepend(panel);
  $("#mypanel").panel();
}

//This initalizes the map to be loaded when load map is called
function initializeMap() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(49.251825, -123.003978 )
  };

  this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

//The map has to be loaded asynchronously because of jquery limitation.
//This is called when findMatches2 is initalized.
function loadMap() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRtXAgSKxxKwyhnMoMNIS-8FsVpfQ1EU&sensor=false&'
    + 'callback=initializeMap';
  document.body.appendChild(script);
}

//This piece of code will load up the map when find matches is loaded.
//Works until you look at the page
//maybe needs refresh function?
function radioCheck() {
  if ($('#driver').is(":checked") == false && $('#passenger').is(":checked") == false) {
  }
  if ($('#driver').is(":checked") == true) {
    $("#driver1").attr("checked",true);
    $("#driver2").attr("checked",true);
    $("#driver3").attr("checked",true);
    $("#driver4").attr("checked",true);
    $("#driver5").attr("checked",true);
    $("#driver6").attr("checked",true);
    $("#driver7").attr("checked",true);
    }

  else if ($('#passenger').is(":checked") == true) {
    $("#passenger1").attr("checked",true);
    $("#passenger2").attr("checked",true);
    $("#passenger3").attr("checked",true);
    $("#passenger4").attr("checked",true);
    $("#passenger5").attr("checked",true);
    $("#passenger6").attr("checked",true);
    $("#passenger7").attr("checked",true);  }
  var checked = 0;
  //used to check if anything has been checked.  If nothing is checked wont proceed.
  if ($("#mondayC").is(":checked")) {
    checked++;
    $("#head1").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head2").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head3").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head4").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head5").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head6").append('<a href="#monday" data-role="button">Mon</a>');
    $("#head7").append('<a href="#monday" data-role="button">Mon</a>');
  }
  if ($('#tuesdayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head2").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head3").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head4").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head5").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head6").append('<a href="#tuesday" data-role="button">Tue</a>');
    $("#head7").append('<a href="#tuesday" data-role="button">Tue</a>');
  }
  if ($('#wednesdayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head2").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head3").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head4").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head5").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head6").append('<a href="#wednesday" data-role="button">Wed</a>');
    $("#head7").append('<a href="#wednesday" data-role="button">Wed</a>');
  }
  if ($('#thursdayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head2").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head3").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head4").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head5").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head6").append('<a href="#thursday" data-role="button">Thu</a>');
    $("#head7").append('<a href="#thursday" data-role="button">Thu</a>');
  }
  if ($('#fridayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head2").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head3").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head4").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head5").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head6").append('<a href="#friday" data-role="button">Fri</a>');
    $("#head7").append('<a href="#friday" data-role="button">Fri</a>');
  }
  if ($('#saturdayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head2").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head3").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head4").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head5").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head6").append('<a href="#saturday" data-role="button">Sat</a>');
    $("#head7").append('<a href="#saturday" data-role="button">Sat</a>');
  }
  if ($('#sundayC').is(":checked")) {
    checked++;
    $("#head1").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head2").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head3").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head4").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head5").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head6").append('<a href="#sunday" data-role="button">Sun</a>');
    $("#head7").append('<a href="#sunday" data-role="button">Sun</a>');
  }
  if (checked == 0) {
    alert('Please select a day');
  }
  var location = document.getElementById('changeMe');

    if ($('#sundayC').is(":checked")) {
    location.setAttribute('href', '#sunday');
  }
    if ($('#saturdayC').is(":checked")) { 
    location.setAttribute('href', '#saturday');
  }
    if ($('#fridayC').is(":checked")) { 
    location.setAttribute('href', '#friday');
  }
    if ($('#thursdayC').is(":checked")) { 
    location.setAttribute('href', '#thursday');
  }
    if ($('#wednesdayC').is(":checked")) { 
    location.setAttribute('href', '#wednesday');
  }
    if ($('#tuesdayC').is(":checked")) { 
    location.setAttribute('href', '#tuesday');
  }
    if ($('#mondayC').is(":checked")) { 
    location.setAttribute('href', '#monday');
  }
}

$(document).on("pageinit","#findMatches2",function(){ 
    loadMap();
});
$(document).on("pageshow","#findMatches2",function(){ 
    deleteMarkers();
    grabMarkers();
});
function createMarker(pos, t) {
    var marker = new google.maps.Marker({       
    position: pos, 
    title: t      
    }); 
    google.maps.event.addListener(marker, 'click', function() { 
       alert("I am marker " + marker.title); 
    }); 
    markers.push(marker);
    return marker; 
}
function showMarkers() {
    for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function hideMarkers() {
    for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
function deleteMarkers() {
    hideMarkers();
    markers = [];
}
function grabMarkers() {
    $.mobile.loading( 'show', {
	text: 'Loading',
	textVisible: true,
	theme: 'z',
	html: ""
    });
    distances = [];
    deleteMarkers();
    $.ajax({ 
    type: 'GET', 
    url: 'php/generateJsonMarkers.php', 
    data: { get_param: 'value', day : day, direction: $('input[name="direction"]:checked').val()}, 
    dataType: 'json',
    success: function (data) { 
        ajaxData = data;
        var i = 0;
        var lengthOfArray = data.markers.length;
        if(lengthOfArray == 0) {
            alert("No results found");
        } else {
        while(i < lengthOfArray) {
                var location = data.markers[i].location;
                //alert(location);
                var memberid = data.markers[i].memberid;
                var coord = location.split(", ");
                var position = new google.maps.LatLng(coord[0],coord[1]);
                if(memberid != userid) {
                    createMarker(position, memberid);
                    distances.push([data.markers[i].memberid, calculateDistance(data.currentUser[0].location, data.markers[i].location)]);
                } else {
                    userPosition = location;
                }
            i++;
            }
        sortMarkers();
               showRecommendations();
            showMarkers();

        //$('#recommendations').html("");
        $('#recommendations').append("Test");
        }
    $.mobile.loading( 'hide', {
	text: 'Loading',
	textVisible: true,
	theme: 'z',
	html: ""
    });
    }
    });

}
function setDate(day2) {
    day = day2;
    //alert("day is now " + day);
}
function sortMarkers() {
    distances = distances.sort(compareSecondColumn);

    function compareSecondColumn(a, b) {
        return a[1] > b[1];
    }
}
function calculateDistance(starting, ending) {
    var coord1 = starting.split(", "); //coord1[0] == lat coord1[1] == lon
    var coord2 = ending.split(", "); 
    var x1 = parseFloat(coord1[0]);
    var x2 = parseFloat(coord2[0]);
    var y1 = parseFloat(coord1[1]);
    var y2 = parseFloat(coord2[1]);
    //alert(x1 +" "+ y1 +" "+ x2 +" "+ y2);
    var d = Math.sqrt((Math.pow((x2-x1),2)) + (Math.pow((y2 - y1), 2)));
    return d
}

function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}
function showRecommendations() {
    //var i = 0;
        //alert(distances[1][0]);
    /*while(i < distances.length  || i < 3) {
        //$('#recommendations').append(
        i++
    }*/
}
function grabMarkerIndex(position) {
    var i = 0;
    while(ajaxData.markers[i].memberid != position) {
        i++
    }
    return i;
}
