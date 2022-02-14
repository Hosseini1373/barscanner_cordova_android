

/*
Code to wait till document is loaded
*/
document.addEventListener("deviceready", init, false);


/*
Funtion that runs when the Document is loaded
*/
function init() {
	//If the auftrag button is touched we call auftragScan function
	document.querySelector("#auftrag").addEventListener("touchend", auftragScan, false);
	//If the position button is touched we call positionScan function
    document.querySelector("#position").addEventListener("touchend", positionScan, false);
}



/*
Funtion that runs when user clicks on Scan Auftrag
*/
function auftragScan() {
	//barcodeScanner plugin API
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = result.text ;
			resultDiv = document.querySelector("#auftragNummer");
			//a regular expression to check if s is aplphanumeric
			var isAlphanumerisch=/^[a-z0-9A-Z]+$/i.test(s);
			//length of s must be 8 for Auftrag
			if (s.length===8 && isAlphanumerisch){
				//put s into the auftragNummer div
				resultDiv.innerHTML = s;
				//Set the border of div to green
				resultDiv.style.borderColor = "green";

			//incorrect scann:
			}else{
				resultDiv.innerHTML = "Falsches Format";
				//Set the border of div to red
				resultDiv.style.borderColor = "red";
				//akustic signal:
				navigator.notification.beep(1);
				//set a time out for a more natural vibration after akustic signal
				setTimeout(() => {
					navigator.vibrate([1000]);
				}, 200);
			}
		}, //If the scan fails 
		function (error) {
			alert("Scan fehlgeschlagen: " + error);
		});


}





/*
Funtion that runs when user clicks on Scan Position
*/
function positionScan() {
	//barcodeScanner plugin API
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = result.text ;
			resultDiv = document.querySelector("#positionNummer");
			//a regular expression to check if s i s numeric
			var isNumeric=/^[0-9]+$/i.test(s);
			//length of s must be 5 for Auftrag
			if (s.length===5 && isNumeric){
				//put s into the positionNummer div
				resultDiv.innerHTML = s;
				//Set the border of div to green
				resultDiv.style.borderColor = "green";

			}else{
				resultDiv.innerHTML = "Falsches Format";
				//Set the border of div to red
				resultDiv.style.borderColor = "red";
				//akustic signal:
				navigator.notification.beep(1);
				//set a time out for a more natural vibration after akustic signal
				setTimeout(() => {
					navigator.vibrate([1000]);
				}, 200);
			}

		}, //If the scan fails 
		function (error) {
			alert("Scan fehlgeschlagen: " + error);
		});

}

