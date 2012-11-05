function HTMLCodeCleaner() {
	var folderURL = "file:///HTMLCodeCleaner" //On local Dreamweaver Configuration folder
	var fileMask = "*.dwr";

	var startTime = new Date();

	var fileURLlist = DWfile.listFolder(folderURL + "/" + fileMask, "files");
	queries();

	function timeDiff(t1, t2) {
		var diff = t2.getTime() - t1.getTime();

		var daysDiff = Math.floor(diff/1000/60/60/24);
		diff -= daysDiff*1000*60*60*24;

		var hoursDiff = Math.floor(diff/1000/60/60);
		diff -= hoursDiff*1000*60*60;

		var minutesDiff = Math.floor(diff/1000/60);
		diff -= minutesDiff*1000*60;

		var secondsDiff = Math.floor(diff/1000);

		alert('Operation completee en ' + daysDiff + ' jour/s ' + hoursDiff + ' heure/s ' + minutesDiff + ' minute/s ' + secondsDiff + ' seconde/s ');
 	} 

	function queries(){
		if (fileURLlist){
			for (i = 0; i < fileURLlist.length; i++) {
				var fileURL = fileURLlist[i];

				var fileString = DWfile.read(folderURL + "/" + fileURL);
				var query = fileString.substring(22);

				dreamweaver.HTMLCodeCleaner('\'' + query + '\''); 
				dw.replaceAll();
			}
		}
	}
	window.close();
	var endTime = new Date();
	timeDiff(startTime, endTime);
}

//TODO: Progress bar with a cancel option
//TODO: New naming convention to go thru one folder instead of three
//TODO: Generate a report of changes done on file
//TODO: Make the change affect all open documents also
//TODO: Insert TOC
//TODO: New queries to apply IC coding style guide