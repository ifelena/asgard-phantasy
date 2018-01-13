$(document).ready(function () {
	// Are you ready to play? button "See Events" appears
	var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	getEvents(id);
	//On            
});

function getEvents(id) {
	
	$.getJSON("http://localhost:2000/event?id=" + id, function (result) {
		$("#eventName").val(result.event);
		$("#eventId").val(result._id);
	});
}
function register(){
	var item = {
		eventId: $("#eventId").val(),
		userId: "123456"
	}
	var txt = $("input").val();
    $.post("/userpicks", item, function(result){
	   alert("Registration Successfull!");
	   document.location.href = 'index.html';
	});
}


