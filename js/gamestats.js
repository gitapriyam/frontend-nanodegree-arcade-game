var wealth = window.sessionStorage.getItem("wealth");
document.getElementById("wealth").innerHTML = "You had a maximum treasure of " + wealth;
document.getElementById("duration").innerHTML = "Game duration (HH:MI:SS) is " + window.sessionStorage.getItem("duration");