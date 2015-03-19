var maps_a_coords_gcp_input = null;

function gcp_success(position) {
	maps_a_coords_gcp_input = document.getElementsByClassName('tactile-searchbox-input')[0]; 
	maps_a_coords_gcp_input.value = "undefined";
  if(typeof position != 'undefined') {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	maps_a_coords_gcp_input.value = latitude+','+longitude;
  }
}

function gcp_error(err) { console.log('getCurrentPosition failed'+ err); }

maps_a_coords_gcp_input = document.getElementsByClassName('tactile-searchbox-input')[0]; 
maps_a_coords_gcp_input.value = '[getting location...]'; 
navigator.geolocation.getCurrentPosition( gcp_success, gcp_error); 
