$(document).ready(function () {
	// Are you ready to play? button "See Events" appears
	getEvents();
	//On            
});

function getEvents() {
	$.getJSON("http://localhost:2000/events", function (result) {

		$.each(result, function (i, events) {

			var x = events._id;

			$("#tblEvents").append("<tr><td>" + events.event + "</td>" +
				"<td> Closes " + events.closes + "</td>" +
				"<td class='text-center'> <button onClick=\"onRegistration('" + x + "');\" type='button' class='btn btn-primary'>Register</button></td></tr>");
		});
	});
}
function onRegistration(id) {
	document.location.href = 'event-register.html?id=' + id;

}

