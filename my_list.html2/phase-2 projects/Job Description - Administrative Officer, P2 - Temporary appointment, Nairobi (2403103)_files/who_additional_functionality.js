// Dynamically retrieve the js folder path
var jsPath;
var scripts = document.getElementsByTagName('script');
StopLooping_additional = false;
for(var i = 0; i < scripts.length; i++) {
	if (scripts[i].src.indexOf('who_additional_functionality.js') >= 0) {
		jsPath = scripts[i].src.split('/');
	}
}

// Wait until document is ready and execute functions
var loopMax = 0;
function waitJQuery_additonal() {
  setTimeout(function() {
  loopMax++;
  if (typeof jQueryv1_7_1 == 'undefined' && loopMax <= 100 && !StopLooping_additional) {
		waitJQuery_additonal();
    } 
	else 
	//while ( loopMax<100 && !StopLooping_additional)
	{
		if (typeof jQueryv1_7_1 != 'undefined') {
			jQueryv1_7_1(document).ready(function(){
				StopLooping_additional = true;
				//Redirect from Main Profile (https://stgwho.taleo.net/careersection/profile.jss?type=1&portal=8105120415) to Generic Application Form (https://tstwho.taleo.net/careersection/application.jss?type=1&lang=en&portal=101430233&reqNo=13247)
				var currentPageURL = window.location.href;
				var reProfileJss = new RegExp("(https:\/\/" + window.location.hostname + "\/careersection\/)(profile[.]jss\\?)(.*$)");
				var reProfileFtl = new RegExp("(https:\/\/" + window.location.hostname + "\/careersection\/)([a-zA-Z]*\/)(profile[.]ftl\\?)(.*$)");
				if (reProfileJss.test(currentPageURL)) {
					// Show Blank Page
					jQueryv1_7_1("span[class='mainsection']").empty();
					var redirectPageURL = currentPageURL.replace(reProfileJss,"$1application.jss?$3&reqNo=12563")
					window.location.replace(redirectPageURL);
				} else if (reProfileFtl.test(currentPageURL)) {
					// Show Blank Page
					jQueryv1_7_1("span[class='mainsection']").empty();
					var csPortal = jQueryv1_7_1("input[id='portal']").attr("value");
					var csType = jQueryv1_7_1("input[id='type']").attr("value");
					var redirectPageURL = currentPageURL.replace(reProfileFtl,"$1application.jss?type=" + csType + "&portal=" + csPortal + "&reqNo=12563");
					window.location.replace(redirectPageURL);			
				}
			
				// Extended Profile Page
				var extendedProfilePage = jQueryv1_7_1("div[id='taleo_holder']").filter(":has(div[class='datatrain-focus'])").filter(":has(span[id*='PageNameOff']:contains('Work profile'))");
				// Extended Profile Link
				var extendedProfileLink = extendedProfilePage.find("a[title='Extended profile']");
				// If Extended Profile is selected then launch the Extended Profile Page (PaaS)
				if (extendedProfileLink.length > 0) {
					// Launch Extented Profile Page
					extendedProfileLink.click();
					// Show Blank Page
					jQueryv1_7_1("div").empty();
				}
				
				// datatrain focus images
				jQueryv1_7_1("div[class='datatrain-focus']").filter(":has(span[id*='PageNameOff'])").each(function() {
					//Define variables
					var currentDiv = jQueryv1_7_1(this);
					currentDiv.find("span[id*='PageNameOff']").each(function() {
						var currentDivName = jQueryv1_7_1(this).text();
						var imagesPath = jsPath.slice(0, jsPath.length-2).join('/') + "/images/";
						var currentDivImagePath = imagesPath + currentDivName + "_datatrain-focus.png";
						var currentDivImageElement = jQueryv1_7_1('<img style="display: block; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto; max-width:100%; max-height:100%; opacity:0.55;">').attr("src", currentDivImagePath);
						jQueryv1_7_1.get(currentDivImagePath).done(function () {
							currentDiv.html(currentDivImageElement);
						});
					});
				});
				
				// datatrain no-focus images without link
				jQueryv1_7_1("div[class='datatrain-no-focus']").filter(":has(span[id*='PageNameOff'])").each(function() {
					//Define variables
					var currentDiv = jQueryv1_7_1(this);
					currentDiv.find("span[id*='PageNameOff']").each(function() {
						var currentDivName = jQueryv1_7_1(this).text();
						var imagesPath = jsPath.slice(0, jsPath.length-2).join('/') + "/images/";
						var currentDivImagePath = imagesPath + currentDivName + "_datatrain-focus.png";
						var currentDivImageElement = jQueryv1_7_1('<img style="display: block; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto; max-width:100%; max-height:100%; opacity:0.55;">').attr("src", currentDivImagePath);
						jQueryv1_7_1.get(currentDivImagePath).done(function () {
							currentDiv.html(currentDivImageElement);
						});
					});
				});
				
				// datatrain no-focus images with link
					jQueryv1_7_1("div[class='datatrain-no-focus']").filter(":has(a)").each(function() {
					//Define variables
					var currentDiv = jQueryv1_7_1(this);
					var currentDivName = currentDiv.find("span[id*='PageName']").text();
					var currentLinkElement = currentDiv.find("a");
					var imagesPath = jsPath.slice(0, jsPath.length-2).join('/') + "/images/";
					var currentDivImagePath = imagesPath + currentDivName + "_datatrain-focus.png";
					var currentDivImageElement = jQueryv1_7_1('<img style="display: block; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto; max-width:100%; max-height:100%; opacity:0.55;">').attr("src", currentDivImagePath);
					jQueryv1_7_1.get(currentDivImagePath).done(function () {
						currentLinkElement = currentLinkElement.empty().append(currentDivImageElement);
						currentDiv.html(currentLinkElement);
					});
				});
				
				// Remove Resume Upload options
				var resumeBlock = jQueryv1_7_1("span[id*='ResumeParsingBlock-resumeView']").find("span[class='blockpanel']");
				resumeBlock.find("h3").filter(":has(span[id*='UploadResumeBlock-ResumeTitleOutputText'])").remove();
				resumeBlock.find("span").filter(":has(label[for*='UploadResumeBlock-resumeUploadRadio'])").remove();
				resumeBlock.find("span").filter(":has(input[id*='UploadResumeBlock-ResumeUploadInputFile'])").remove();
				
				// Remove End Arrow from the process flow
				var finalCharacter = jQueryv1_7_1("fieldset").find("li").last().find("div").last();
				if (finalCharacter.attr("class") == "datatrain-no-focus-right" || finalCharacter.attr("class") == "datatrain-focus-right") {
					finalCharacter.remove();
				}
				
				// Highlight Section (Bug -> Work Around)
				if (jQueryv1_7_1("li[class='selectedlink']").length == 0) {
					var currentForm = jQueryv1_7_1("form").attr('id');
					if (currentForm == 'offersTemplate-offerForm') {
						jQueryv1_7_1("li[id='offerTabActionS']").attr('class', 'selectedlink');
					} else if (currentForm == 'processlistTemplate-list') {
						jQueryv1_7_1("li[id='myProcessesTabActionS']").attr('class', 'selectedlink');
					} else if (currentForm == 'et-ef') {
						jQueryv1_7_1("li[id='myJobPageTabActionS']").attr('class', 'selectedlink');
					}
				}
				
				// Add container around Progress Task Bar (Onboarding)
				jQueryv1_7_1("td[class='taskSelector']").find("h2[class*='no-change-header'], table[class*='progress-bar']").wrapAll("<div class='who-progress-bar'/>");
				
				// Remove Zero Width No-Break Space from Offer Section
				var offerFormChildElements = jQueryv1_7_1("span[id*='offersTemplate-offerForm-masterbody']").children();
				jQueryv1_7_1("span[id*='offersTemplate-offerForm-masterbody']").empty().append(offerFormChildElements );
				
				// Format Date Fields (Day-Month-Year)
				var datefields = jQueryv1_7_1("fieldset[class*='input-date-time'");
				datefields.each(function() {
					dateDay = jQueryv1_7_1(this).find("div").filter(":has(label[for*='.day'])");
					dateMonth = jQueryv1_7_1(this).find("div").filter(":has(label[for*='.month'])");
					dateMonth.insertAfter(dateDay);
				});

				// Add Instruction Link to JobSearch page
				//console.log("Begin Add Instruction Link to JobSearch page");
				var isJobsearchForm = jQueryv1_7_1("div[id='criteria-container']").find("div[id='searchPanel']").length != 0;
				var isCandidatesInstructions = jQueryv1_7_1("ul[id='tabs']").find("li>a[id='instructions-link']").length != 0;
				if (isJobsearchForm == true && isCandidatesInstructions == false) {
					//console.log("Inside IF - Add Instruction Link to JobSearch page");
					var ulTabs = jQueryv1_7_1("ul[id='tabs']");
					ulTabs.append(
						jQueryv1_7_1('<li>').append(
							jQueryv1_7_1('<a>').attr('href','http://who.int/careers/process/instructions-for-candidates.pdf?ua=1').attr('class', 'instructionslink').attr('id', 'instructions-link').attr('target', '_blank').append(
								jQueryv1_7_1('<span>').append("Instructions for candidates")
					))); 
				}

				// Clean Review Section - Remove redundant sections
				var reviewFormWorkProfileElements = jQueryv1_7_1("tbody").filter(":has(span[class='titlepage']:contains('Review and Submit'))").find("span[class='blockpanel']").filter(":has(span[class='titleblock']:contains('Work profile'))").find("span[class='contentblockpanel']").not(":has(span[class='subtitleblockpanel'])");
				reviewFormWorkProfileElements.remove();
			});	
		}
	}
  }, 100);
};
waitJQuery_additonal();

//document.body.onload = function() {
	//// Replace Images with the ones from /theme/images/ folder when available.
	//var imagesPath = jsPath.slice(0, jsPath.length-2).join('/') + "/images/";
	//var images = document.getElementsByTagName('img');
	//for(var i = 0; i < images.length; i++) {
	//	var imagesrc = images[i].src;
	//	var imageName = imagesrc.split('/').slice(-1)[0].split(";")[0];
	//	images[i].setAttribute("src", imagesPath + imageName);
	//	images[i].setAttribute("onerror", "this.src='" + imagesrc.split(";")[0] + "';")
	//}
//};


 jQueryv1_7_1(window).on("load", function() {
       // Replace Images with the ones from /theme/images/ folder when available.
	var imagesPath = jsPath.slice(0, jsPath.length-2).join('/') + "/images/";
	var images = document.getElementsByTagName('img');
	for(var i = 0; i < images.length; i++) {
		var imagesrc = images[i].src;
		var imageName = imagesrc.split('/').slice(-1)[0].split(";")[0];
		images[i].setAttribute("src", imagesPath + imageName);
		images[i].setAttribute("onerror", "this.src='" + imagesrc.split(";")[0] + "';")
	}
    });