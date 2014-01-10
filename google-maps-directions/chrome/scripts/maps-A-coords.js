var maps_a_coords_gcp_input = null;

function gcp_success(position) {
  if(typeof position != 'undefined') {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	maps_a_coords_gcp_input.val(latitude+","+longitude);
  }
}

function gcp_error(err) { console.log("getCurrentPosition failed"+ err); }

$('.dir-m').append('<img class=\'earth-img\' src=\'chrome-extension://alebdghadjnafjffmlhnjeilhhpbncnp/images/earth.gif\'>');
$('.dir-m').click(function() {
  $(this).next().find('.kd-input-text').val("current location (2)");
  maps_a_coords_gcp_input = $( this ).next().find('.kd-input-text');
  maps_a_coords_gcp_input.val("[getting location...]");
  navigator.geolocation.getCurrentPosition( gcp_success, gcp_error);
});