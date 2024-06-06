// Wait until document is ready and execute functions
// See LICENSE.txt in /theme/js folder about lzutf8.js library (https://www.npmjs.com/package/lzutf8)
var loopMaxCover = 0;
var WaitTimeBeforeAskingUser = 10000; // Number of Milliseconds to wait from PaaS before prompting the user
var StopLooping_coverletter = false;

function EnableDisableButton(xEnable,xId){	
	if (xEnable) {
		jQueryv1_7_1(xId).attr('disabled', false);
		jQueryv1_7_1(xId).css("color","white");
		
		try 
		{
			var TS = window.performance.now()/1000;
			console.log("Enabling Save Button "+xId+" at second "+TS);
		}
		catch (err) 
		{
			console.log("Enabling Save Button - Cath Error");
		}
	}
	else {
		jQueryv1_7_1(xId).attr('disabled', true);
		jQueryv1_7_1(xId).css("color","grey");
		try 
		{
			var TS = window.performance.now()/1000;
			console.log("Disabling Save Button "+xId+" at second "+TS);
		}
		catch(err) 
		{
			console.log("Disabling Save Button - Cath Error");
		}
	}
}

function waitJQuery_coverletter() {
  setTimeout(function() {
    
	//while ( loopMaxCover<100 && !StopLooping_coverletter)
	//{
		loopMaxCover++;
    if (typeof jQueryv1_7_1 == 'undefined' && loopMaxCover <= 100 && !StopLooping_coverletter) 
	{
    	waitJQuery_coverletter();
    } 
	else 
	{
		
		if (typeof jQueryv1_7_1 != 'undefined') {
			jQueryv1_7_1(document).ready(function(){
				StopLooping_coverletter = true;
				console.log("Branding Extension Version 2018-03-15_03");
				// Retrieve Session Id and record it in browser cookie
				var PaaSToken = getURLParameter('Token');
				if (jQueryv1_7_1(".titlepage").html()=="Cover Letter")
				{
					resumeBlockTextarea = jQueryv1_7_1("textarea[id*='pastedResumeBlock-pastedResume']");
					resumeBlockTextarea.hide();
					resumeBlockTextarea.prev().hide();
					resumeBlockTextarea.closest('.blockpanel').hide();	
					jQueryv1_7_1(".blockhelppanel" ).first().css( "display", "none");
					jQueryv1_7_1("#et-ef-content-ftf-gp-j_id_id16pc9-page_1-coverLetterBlock-coverLetter" ).css("width","80%");
					if (PaaSToken != null && PaaSToken != "")
					{
						//Hide Save button until PaaS responded
						EnableDisableButton(false,"#et-ef-content-ftf-saveContinueCmd");
						EnableDisableButton(false,"#et-ef-content-ftf-saveContinueCmdBottom");					
						// Execute the HTTP Get request to PaaS Rest API
						var PaaSExtendedProfile;
						var PaaSHostName;
						switch(window.location.hostname) {
							case 'stgwho.taleo.net':
							    PaaSHostName = 'dev.opaas.who.int';
								break;
							case 'stg-careers.who.int':
								PaaSHostName = 'dev.opaas.who.int';
								break;
							case 'tst-careers.who.int':
							    PaaSHostName = 'stg.opaas.who.int';
								break;
							case 'tstwho.taleo.net':
								PaaSHostName = 'stg.opaas.who.int';
								break;
							default:
								PaaSHostName = 'prd.opaas.who.int';
						}
						console.log("PaaSHostName:"+PaaSHostName);
						var PaaSExtendedProfileURL = "https://" + PaaSHostName + "/workprofile/resources/summary/" + PaaSToken;
						jQueryv1_7_1.ajax({
							url:PaaSExtendedProfileURL,
							type: "GET",
							crossDomain: true,
							timeout: WaitTimeBeforeAskingUser,
							withCredentials: true,
							success: function (JsonOject) {
								console.log("Success PaaSHostName:"+PaaSHostName);
								JsonString=JSON.stringify(JsonOject);
								//console.log("JsonString:"+JsonString);
								//console.log("ompressed:"+LZUTF8.compress(JsonString,{outputEncoding: "Base64"}));
								// Copy the extended profile summary into the Resume Block (textarea)
								resumeBlockTextarea.val(LZUTF8.compress(JsonString,{outputEncoding: "Base64"}));	//Store JSON object as a compressed string
								//Enable Save button since PaaS responded
								EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmd");
								EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmdBottom");	
								if (resumeBlockTextarea.val().length > 64000)
								{
									//Work Profile Data is overlimit
									alert("Your work profile data is overlimit!\nPlease remove some entries in order to reduce size.");
									jQueryv1_7_1('#et-ef-content-ftf-j_id_id81pc5-4-dtGotoPageLink')[0].click();
								}							
							},
							error : function(jqXHR, textStatus) {
								//In order to give an option to the user, re-enable the save buttons.
								console.log("Error Text: "+textStatus);
								if(textStatus === 'timeout')
								{     
									if(confirm("The system is experiencing some connection delays.\n\nPress 'Ok' to wait or 'Cancel' to go back to the Work Profile section.")) {
										 //Retry
										 WaitTimeBeforeAskingUser = WaitTimeBeforeAskingUser * 2; //Increase timeout time
										 this.timeout=WaitTimeBeforeAskingUser;
										 jQueryv1_7_1.ajax(this);
										 return;
									}
									else
									{
										EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmd");
										EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmdBottom");	
										// Automatic Redirection to the PaaS by simulating user clicking on the Edit link of the Work Profile section
										jQueryv1_7_1('#et-ef-content-ftf-j_id_id81pc5-4-dtGotoPageLink')[0].click();
									}	
								}
								else
								{
									//Unknown Error, unlock the user
									EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmd");
									EnableDisableButton(true,"#et-ef-content-ftf-saveContinueCmdBottom");	
								}
								return;						
							}
						}).responseJSON;
					}
					else
					{
						//Data is coming from Plain text resume Field
						if (resumeBlockTextarea.html() !="" && resumeBlockTextarea.html() != null && resumeBlockTextarea.html().length>150)
						{
							try 
							{
								//Try to extract data in case the field content is not compressed. 
								ParsePaaSObJectAndInjectHTML(JSON.parse(resumeBlockTextarea.html()));
							}
							catch(err) 
							{
								//The data the field is compressed. 
								try 
								{
									ParsePaaSObJectAndInjectHTML(JSON.parse(LZUTF8.decompress(resumeBlockTextarea.html(),{inputEncoding: "Base64"})));
								}
								catch(err2) 
								{
									// Data could't be decompressed
									// Automatic Redirection to the PaaS by simulating user clicking on the Edit link of the Work Profile section
									jQueryv1_7_1('#et-ef-content-ftf-applicationSummary-j_id_id8pc9-page_4-genericPageSummary-editPageLink')[0].click();
								}
							}
						}
						else
						{
							// Automatic Redirection to the PaaS?
						}
					}
				}
				//Test if we are on the SUMMARY PAGE and if so, insert JSON data in the page
				if (document.getElementById("et-ef-content-ftf-applicationSummary-summaryTitle"))
				{
					OverridePrintURL(true); //Set Print URL					
					// Retrieve Extended Profile if Session Id Exists
					resumeBlockTextarea = jQueryv1_7_1("span[id*='pastedResumeSummary-pastedResumevalue']");
					resumeBlockTextarea.closest('.groupcontentpanel').hide();
					// Hide the Resume Block (textarea)
					if (resumeBlockTextarea.html() !="" && resumeBlockTextarea.html() !=null && resumeBlockTextarea.html().length>150)
					{ 
				      //console.log("resumeBlockTextarea:" + resumeBlockTextarea.html());
						console.log("Business case 1");
						try 
						{
							//Try to extract data in case the field content is not compressed. 
							console.log("Business case 1 start");
							ParsePaaSObJectAndInjectHTML(JSON.parse(resumeBlockTextarea.html()));
							//console.log("Business case 1 fininsh");
						}
						catch(err1) 
						{
							//The data the field is compressed. 
							console.log("Business case 2: Data is compressed");
							try 
							{
								ParsePaaSObJectAndInjectHTML(JSON.parse(LZUTF8.decompress(resumeBlockTextarea.html(),{inputEncoding: "Base64"})));
							}
							catch(err2) 
							{
								// Data could't be decompressed
								// Automatic Redirection to the PaaS by simulating user clicking on the Edit link of the Work Profile section
								console.log("Business case 3: ata could't be decompressed");
								jQueryv1_7_1('#et-ef-content-ftf-applicationSummary-j_id_id8pc9-page_4-genericPageSummary-editPageLink')[0].click();
							}
						}
					}
					else
					{
						console.log("Business case 4: No data stored and data received from PaaS <150 bytes");
						// Automatic Redirection to the PaaS by simulating user clicking on the Edit link of the Work Profile section
						jQueryv1_7_1('#et-ef-content-ftf-applicationSummary-j_id_id8pc9-page_4-genericPageSummary-editPageLink')[0].click();
					}
				}
				else
				{
					OverridePrintURL(false); //Hide Print URL			
				}
			});	
		}
	}
  }, 100);
}

function ParsePaaSObJectAndInjectHTML(JsonObj)
{
	var CurrentWorkProfileSection="";
	console.log("ParsePaaSObJectAndInjectHTML");
	//Locate Work Profile Box to replace content
	jQueryv1_7_1('.blockpanel').each(function (i,objSpan) {
		//jQueryv1_7_1(this).find(".metalink2").html(""); //Hide the Edit Link
		//jQueryv1_7_1(this).find(".separator").html(""); //Hide the Separator
		if (jQueryv1_7_1(this).find(".titleblock").html()=="Work profile")
		{
			CurrentWorkProfileSection= jQueryv1_7_1(this).find('.groupcontentpanel');
		}
	});
	console.log("ParsePaaSObJectAndInjectHTML2");
	var NewDivSectionHTML = "";
	var stringConstructor = "test".constructor;
	var arrayConstructor = [].constructor;
	var objectConstructor = {}.constructor;
	var CurrentLevelInstance = 0; // Define the instance number of the section
	var ChangeLevelInstance = true; // indicate if we change the instance
	var Level9First=true;
	var Level12Array = [];
	var L9TitleDesc ="";
	var L9 = 0;
	var SubLine=0;
	var AddExtraLine=false;
	//console.log("ParsePaaSObJectAndInjectHTML: JsonObjectsLevel");
	jQueryv1_7_1.each(JsonObj, function(key1, JsonObjectsLevel1) 
	{
		//console.log("ParsePaaSObJectAndInjectHTML: JsonObjectsLevel 1");
		jQueryv1_7_1.each(JsonObjectsLevel1, function(key2, JsonObjectsLevel2) 
		{
			//console.log("ParsePaaSObJectAndInjectHTML: JsonObjectsLevel 2");
			jQueryv1_7_1.each(JsonObjectsLevel2, function(key3, JsonObjectsLevel3) 
			{
					//console.log("ParsePaaSObJectAndInjectHTML: JsonObjectsLevel 3");
				jQueryv1_7_1.each(JsonObjectsLevel3, function(key4, JsonObjectsLevel4) 
				{
					//We enter in a new section HERE
					NewDivSectionHTML = NewDivSectionHTML + "<span class='contentblockpanel'>";
					if (JsonObjectsLevel4["displayTitle"]=="Yes") 
					{ 
						NewDivSectionHTML = NewDivSectionHTML + "<span class='subtitleblockpanel'><h3 class='no-change-header'><span class='subtitleblock'>"+JsonObjectsLevel4["etitle"]+"</span><span class='hidden-audible'>&nbsp;</span></h3></span></span>";
						NewDivSectionHTML = NewDivSectionHTML + "<span class='contentblockpanel'><table class='table'><tbody><tr>";
					} 
					else
					{
						//NewDivSectionHTML = NewDivSectionHTML + "<span class='contentblockpanel'><table class='table'><tbody>";
					}
					//Loop entries for this section
					CurrentLevelInstance=0;
					ChangeLevelInstance = true;
					jQueryv1_7_1.each(JsonObjectsLevel4, function(key5, JsonObjectsLevel5) 
					{
						if (JsonObjectsLevel4["etitle"] !="" && JsonObjectsLevel4["etitle"] !="undefined" && JsonObjectsLevel4["etitle"] !=null)
						{
							jQueryv1_7_1.each(JsonObjectsLevel5, function(key6, JsonObjectsLevel6) 
							{
								if (JsonObjectsLevel6.constructor === objectConstructor)
								{
									CurrentLevelInstance++;
									ChangeLevelInstance = true;
									jQueryv1_7_1.each(JsonObjectsLevel6, function(key7, JsonObjectsLevel7) 
									{				
										if (JsonObjectsLevel7.constructor === arrayConstructor)
										{
											jQueryv1_7_1.each(JsonObjectsLevel7, function(key8, JsonObjectsLevel8) 
											{
												L9Title=0;
												AddExtraLine=false;
												//console.log("Key8 Found:"+key8, JsonObjectsLevel8);
												if (ChangeLevelInstance)
												{
													ChangeLevelInstance=false;
													if (JsonObjectsLevel4["displaySubSecNumber"]=="Yes") 
													{
														NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2 class='firstcolumn'><span class='labelpanel'><span style='font-weight:bold;font-style:underline;'>"+JsonObjectsLevel4["etitle"]+" "+CurrentLevelInstance+"</span><span class='hidden-audible'>&nbsp;</span></span></td></tr>";
														if (JsonObjectsLevel8["label"] !="")
														{
															NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2>&nbsp;</td></tr>";
														}
													}
													else
													{
														NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2 class='firstcolumn'><span class='labelpanel'><span style='font-weight:bold;font-style:underline;'></span><span class='hidden-audible'>&nbsp;</span></span></td></tr>";
														if (JsonObjectsLevel8["label"] !="")
														{
															//NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2>&nbsp;</td></tr>";
														}
													}
												}
												if (JsonObjectsLevel8["value"]!= null)
												{
													if (JsonObjectsLevel8["label"] !="")
													{
														NewDivSectionHTML = NewDivSectionHTML + "<tr><td class='firstcolumn'><span class='labelpanel'><span class='label'>"+JsonObjectsLevel8["label"]+"</span><span class='hidden-audible'>&nbsp;</span></span></td>";
														NewDivSectionHTML = NewDivSectionHTML + "<td class='secondcolumn'><span class='valuepanel'><span class='value'>"+JsonObjectsLevel8["value"]+"</span><span class='hidden-audible'>&nbsp;</span></span></td></tr>";
													}
													else
													{
														NewDivSectionHTML = NewDivSectionHTML + "<tr><td class='firstcolumn'><span class='labelpanel'><span class='label'></span><span class='hidden-audible'>&nbsp;</span></span></td>";
														NewDivSectionHTML = NewDivSectionHTML + "<td class='secondcolumn'><span class='valuepanel'><span class='value'>"+JsonObjectsLevel8["value"]+"</span><span class='hidden-audible'>&nbsp;</span></span></td></tr>";
													}														
												}	
												else if (JsonObjectsLevel8["etitle"] !="" && JsonObjectsLevel8["etitle"]!= null)
												{
													jQueryv1_7_1.each(JsonObjectsLevel8, function(key9, JsonObjectsLevel9) 
													{
														//console.log("Key 9-->"+key9, JsonObjectsLevel9);
														if (JsonObjectsLevel9.constructor === stringConstructor) 
														{
															if (key9=="etitle")
															{	
																L9TitleDesc = JsonObjectsLevel9;
															}
														}
														if (JsonObjectsLevel9.constructor === arrayConstructor)
														{
															jQueryv1_7_1.each(JsonObjectsLevel9, function(key10, JsonObjectsLevel10) 
															{
																L9Title++;
																jQueryv1_7_1.each(JsonObjectsLevel10, function(key11, JsonObjectsLevel11) 
																{
																	if (key11 =="fields")
																	{
																		Level9First=true;
																		jQueryv1_7_1.each(JsonObjectsLevel11, function(key12, JsonObjectsLevel12) 
																		{
																			if (JsonObjectsLevel12["value"]!="" && JsonObjectsLevel12["value"]!=null)
																			{
																				Level12Array[L9]=JsonObjectsLevel12;
																				//console.log("Key 12-->"+key12, JsonObjectsLevel12);														
																				//display sub section found
																				if (Level9First)
																				{
																					// This is the first line of the subsection, let's display the Title of that section
																					Level9First=false;
																					AddExtraLine=true;
																					SubLine=1;
																					NewDivSectionHTML = NewDivSectionHTML + "<tr><td class='firstcolumn' colspan=2><span class='labelpanel'><span class='label'>"+L9TitleDesc+" "+L9Title+"</span><span class='hidden-audible'>&nbsp;</span></span></td></tr>";
																					NewDivSectionHTML = NewDivSectionHTML + "<tr><td class='secondcolumn' colspan=2><span class='valuepanel'><span class='value' style='margin-left:18px'>"
																				}
																				else 
																				{
																					NewDivSectionHTML = NewDivSectionHTML +", ";
																				}
																				NewDivSectionHTML = NewDivSectionHTML + SubLine +") " + JsonObjectsLevel12["value"];
																				SubLine++;
																			}
																		});
																		NewDivSectionHTML = NewDivSectionHTML + "</span></span></td></tr>";
																	}
																});
															});
														}
													});
												}												
											});
											NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2 class='firstcolumn'>&nbsp;</td></tr>";
											if (AddExtraLine)
											{
												NewDivSectionHTML = NewDivSectionHTML + "<tr><td colspan=2 class='firstcolumn'>&nbsp;</td></tr>";
											}
										}
									});
								}
							});
						}
					});
					//Close the opened tags
					if (JsonObjectsLevel4["displayTitle"]=="Yes")
					{
						NewDivSectionHTML = NewDivSectionHTML + "</tr></tbody></table></span>";
					}
					else
					{
						//NewDivSectionHTML = NewDivSectionHTML + "</tbody></table></span>";
					}
					
				});
			});
		});
	});
	jQueryv1_7_1(CurrentWorkProfileSection).html(NewDivSectionHTML);
}

function OverridePrintURL(SummaryPage)
{
	jQueryv1_7_1('.metalink').children('a').each(function (index, value) 
	{
		CurrentLink=jQueryv1_7_1(this);
		if (CurrentLink.attr('title')=="View a printable version of this page" || CurrentLink.attr('title')=="Print your profile")
		{
			if (SummaryPage)
			{
				CurrentLink[0].onclick = null;
				CurrentLink.html("Print");
				CurrentLink.prop("title","Print your profile");
				CurrentLink.bind('click',function()
				{
					WHO_printFunction();
					OverridePrintURL(true); //Recuring call to avoid original functionality to come back after print
				});
			}
			else
			{
				//We want to hide the Print link for all other pages except Summary page
				CurrentLink.hide();
			}
		}
	});
}

function WHO_printFunction() {
	var restoreoriginalpage = document.body.innerHTML;
	$('.headerpanel').css('display', 'none'); //hiding Data Train Section
	$('.footeractionpanel').css('display', 'none'); //hiding buttons that are at the bottom of the page
	var restoreTitlepage = document.title;
	document.title = "MyApplication.pdf";
	var CurrentWorkProfileSection="";
	//Locate Work Profile Box to replace content
	jQueryv1_7_1('.blockpanel').each(function (i,objSpan) {
		jQueryv1_7_1(this).find(".metalink2").html(""); //Hide the Edit Link
		jQueryv1_7_1(this).find(".separator").html(""); //Hide the Separator
	});
	var printcontent = document.getElementById("content").innerHTML;
	document.body.innerHTML = printcontent;
	window.print();                    
	document.body.innerHTML = restoreoriginalpage; //restore original page    
	document.title = restoreTitlepage;  //restore page Title   
}

// Function used to retrieved URL parameter value
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
waitJQuery_coverletter();