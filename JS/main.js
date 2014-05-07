/**
All of the public variables go here
**/


    
    
/**
All of your functions go here. If something needs to be run on initialization, add it into the initalization function
**/
function initalize() {
    generateMenuPanel();
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
        <h1>Menu</h1>\
        <hr />\
        <a href = \"#home\" data-transition=\"slide\" class = \"menuLink\">Home</a>\
        <br />\
        <a href = \"#findMatches\" data-transition=\"slide\" class = \"menuLink\">Find Matches</a>\
        <br />\
        <a href = \"#myRideSchedule\" data-transition=\"slide\" class = \"menuLink\">My Ride Schedule</a>\
        <br />\
        <a href = \"#myProfile\" data-transition=\"slide\" class = \"menuLink\">My Profile</a>\
		<br />\
		<a href onclick = \"return connectSignIn()\" data-transition=\"slide\" class = \"menuLink\">Log Out</a>\
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

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.251825, -123.003978),
        title:"Hello World!"
    });

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

