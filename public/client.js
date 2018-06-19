// client-side js
// run by the browser each time your view template is loaded
/*function onSignIn(googleUser){
  var profile = googleUser.getBasicProfile();
  $(".g-signin2").css("display", "none");
  $(".data").css("display", "block");
  $("#pic").attr("src", profile.getImageUrl());
  $("#email").text(profile.getEmail());
}*/
/*
function signOut(){
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut.then(function(){
  alert("You have been successfully signed out");
  $(".g-signin2").css("display", "block");
  $(".data").css("display", "none");

});
}
*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $(".g-signin2").css("display", "none");
  $("#SO").css("display", "block");
  $("#mkv").css("display", "block");
  $(".data").css("display", "block");
  $("#pic").attr("src", profile.getImageUrl());
  $("#email").text(profile.getEmail());
  $("#name").text(profile.getName());

}
