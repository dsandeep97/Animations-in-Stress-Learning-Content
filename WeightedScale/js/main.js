var isMobileBrowser = false;
var pdfPath = "pdf/completed_10-4_Form.pdf"; // relative to app index

$(document).ready(function(){
	isMobileBrowser = $.browser.mobile; // script detection, true/false is mobile or not
	$( '[data-formElementType="DropList"]' ).append( '<div class="dropListArrow">&dtrif;</div>' );
	$( '[data-formElementType="DatePicker"]' ).append( '<div class="calendarIcon"></div>' );
	$( '.formElementRequired .formElementLabel' ).append( ' (Required)' );
	fillLineInit();
	embedPDF();
	windowResizeRoutine();
});

// ! F - Core - window resize ---
$(window).resize(function() {
	windowResizeRoutine();
});
		
// ! --[ B - top tabs ]--- 
$(document).off("click", '.activityLayerTab:not(.disabled)');
$(document).on("click", '.activityLayerTab:not(.disabled)', function(event){
	var grabID = 					$(this).attr( "data-activityTabID" );
	var grabTabOrderNum = 	$(this).attr( "data-activityTabOrder" );
	$( '[data-activityTabOrder="2"]' ).attr( "data-activityTabOrder" , "3" );
	$( '[data-activityTabOrder="1"]' ).attr( "data-activityTabOrder" , "2" );
	$(this).attr( "data-activityTabOrder" , "1" );
	$('.activityLayer').hide();
	$('#popupNotice').hide();
	$('#emrsSimulation').attr( 'data-currentActivity' , grabID );
	$('.activityLayerLowerButton').empty().removeClass( "imgSourced" ).removeClass( "saveReportButtonIcon" ).html( "&plus;" );
	switch( grabID ){
		case "PracticeReport" :
			$('#emrsSimulation').attr( 'data-simulationPhase' , "Briefcase" );
			$('.activityLayer[data-activityLabel="Briefcase"]').show();
			$('.briefcaseSlot').hide();
			$('#activityLayersHeader').show();
			$('.activityLayerLowerButton').show();
			$('.activityLayersHeaderButton').attr( 'data-buttonAction' , "activityLayersHeaderMenu" );
			//$('.formElement').removeClass( "disabled" );
			//$('.dropListItem').removeClass( "disabled" );
		break;
		case "CompletedReport" :
			$('#emrsSimulation').attr( 'data-simulationPhase' , "Briefcase" );
			$('.activityLayer[data-activityLabel="Briefcase"]').show();
			$('.briefcaseSlot').show();
			$('#activityLayersHeader').show();
			$('.activityLayerLowerButton').show();
			$('.activityLayersHeaderButton').attr( 'data-buttonAction' , "activityLayersHeaderMenu" );
			//$('.formElement').addClass( "disabled" );
			//$('.dropListItem').addClass( "disabled" );
		break;
		case "Completed104" :
			$('#emrsSimulation').attr( 'data-simulationPhase' , "Review" );
			$('.activityLayer[data-activityLabel="Completed 10-4"]').show();
			$('#activityLayersHeader').hide();
			$('.activityLayerLowerButton').hide();
		break;
	}
});	

// ! --[ B - briefcase slot button - edit ]--- 
$(document).off("click", '.briefcaseSlotButton[data-buttonAction="Edit"]:not(.disabled)');
$(document).on("click", '.briefcaseSlotButton[data-buttonAction="Edit"]:not(.disabled)', function(event){
	//$('#emrsSimulation').attr( 'data-currentActivity' , "PracticeReport" );
	//$('#popupNotice').hide();
	$('.activityLayersHeaderButton').attr( 'data-buttonAction' , "activityLayersHeaderPrev" );
	$('.activityLayerLowerButton').empty().addClass( "imgSourced" ).addClass( "saveReportButtonIcon" );
	$('.activityLayer').hide();
	//$('#emrsSimulation').attr( 'data-simulationPhase' , "Entry" );
	$('#emrsSimulation').attr( 'data-currentActivity' , "CompletedReport" );
	//$('#emrsSimulation').attr( 'data-simulationPhase' , "Briefcase" );
	$('#emrsSimulation').attr( 'data-simulationPhase' , "Review" );
	$( '.formElement' ).each(function(){
		switch( $(this).attr( 'data-formElementType' ) ){
			case "DropList" : 
				if( $(this).hasClass( "dependencyServant" ) ){
					
				}else{
					$(this).find('.selectedDropListItem').removeClass("selectedDropListItem");
					//$(this).find('.bestChoice').addClass("selectedDropListItem");
					$(this).find('.bestChoice').trigger( "click" );
					$(this).attr( 'data-dropStatus' , "Closed" );
				}
			break;
			case "DatePicker" : 
				$(this).find('.selectedCalendarItem').removeClass("selectedCalendarItem");
				//$(this).find('.datePickerCalendarCell.bestChoice').addClass("selectedCalendarItem");
				$(this).find('.datePickerCalendarCell.bestChoice').trigger( "click" );
				$(this).attr( 'data-dropStatus' , "Closed" );
			break;
			case "FillLine" : 
				var grabCompletedFillText = $(this).attr( 'data-fillComplete' );
				$(this).find( '.fillLineEntry' ).attr( "contenteditable" , "false" );
				if( grabCompletedFillText != undefined && grabCompletedFillText != "" ){
					$(this).find( '.fillLineEntry' ).text( grabCompletedFillText );
					$(this).attr( 'data-fillStatus' , "Filled" );
				}else{
					var grabThisDefaultText = $(this).find( '.formElementLabel' ).text();
					$(this).find( '.fillLineEntry' ).text( grabThisDefaultText );
					$(this).attr( 'data-fillStatus' , "Default" );
				}
			break;
			case "Radio" : 
				$(this).find( '.radioItem' ).removeClass( "selectedRadioItem" );
				//$(this).find( '.radioItem.bestChoice' ).addClass( "selectedRadioItem" );
				$(this).find( '.radioItem.bestChoice .radioButton' ).trigger( "click" );
				$(this).find( '.radioItem .radioButton' ).addClass( "disabled" );
			break;
		}
	});
	$('.activityLayer[data-activityLabel="Report Form"]').show();
});	

// ! --[ B - briefcase slot button - attachments ]--- 
$(document).off("click", '.briefcaseSlotButton[data-buttonAction="Attachments"]:not(.disabled)');
$(document).on("click", '.briefcaseSlotButton[data-buttonAction="Attachments"]:not(.disabled)', function(event){
	$( '.activityLayerTab[data-activityTabID="Completed104"]' ).trigger( "click" );
});	

// ! --[ B - form element focused ]--- 
$(document).off("focus", '.formElement:not(.disabled)');
$(document).on("focus", '.formElement:not(.disabled)', function(event){
	$('.formElement').removeClass( "formElementFocused" );
	$(this).addClass( "formElementFocused" );
	//$('.formElement').css( "borderBottomColor" , "rgba(0,0,0,0.4)" );
	//$(this).css( "borderBottomColor" , "#4152ae" );
});	
// ! --[ B - fill line form element altered ]--- 
//$(document).off("propertychange change keyup input paste", '.formElement:not(.disabled) .fillLineEntry');
//$(document).on("propertychange change keyup input paste", '.formElement:not(.disabled) .fillLineEntry', function(event){
$(document).off("keydown paste", '.formElement:not(.disabled) .fillLineEntry');
$(document).on("keydown paste", '.formElement:not(.disabled) .fillLineEntry', function(event){
	var grabThisDefaultText = $(this).closest( '.formElement' ).find( '.formElementLabel' ).text();
	if( $(this).text() == grabThisDefaultText && $(this).closest( '.formElement' ).attr( 'data-fillStatus' ) == "Default" ){
		$(this).text( "" );
	}
	$(this).closest( '.formElement' ).attr( 'data-fillStatus' , "Filled" );
});
$(document).off("keyup", '.formElement:not(.disabled) .fillLineEntry');
$(document).on("keyup", '.formElement:not(.disabled) .fillLineEntry', function(event){
	var grabThisDefaultText = $(this).closest( '.formElement' ).find( '.formElementLabel' ).text();
	if( $(this).text() == "" || $(this).text() == grabThisDefaultText ){
		$(this).closest( '.formElement' ).attr( 'data-fillStatus' , "Default" );
		$(this).text( grabThisDefaultText );
	}else{
		$(this).closest( '.formElement' ).attr( 'data-fillStatus' , "Filled" );
	}
});	

// ! --[ B - form element radio button select ]--- 
$(document).off("click", '[data-formElementType="Radio"]:not(.disabled) .radioButton:not(.disabled)');
$(document).on("click", '[data-formElementType="Radio"]:not(.disabled) .radioButton:not(.disabled)', function(event){
	$(this).closest('.formElement').attr( 'data-radioStatus' , "Selected" );
	$(this).closest('.formElementContent').find('.radioItem').removeClass( "selectedRadioItem" );
	$(this).closest('.radioItem').addClass( "selectedRadioItem" );
	var vizDependentTarget = $(this).closest('.formElement').attr( "data-vizDependentTarget" );
	if( vizDependentTarget != undefined && vizDependentTarget != "" ){
		if( $(this).closest('.radioItem').hasClass( "vizDependentTargetTrigger" ) ){
			$( '[data-formElementID="' + vizDependentTarget + '"]' ).removeClass("vizDependentTargetOff");
		}else{
			$( '[data-formElementID="' + vizDependentTarget + '"]' ).addClass("vizDependentTargetOff");
		}
	}
});	

// ! --[ B - form element engage ]--- 
$(document).off("click", '.formElement[data-dropStatus="Closed"]:not(.disabled)');
$(document).on("click", '.formElement[data-dropStatus="Closed"]:not(.disabled)', function(event){
	$( '.formElement[data-formElementType="DropList"]' ).attr( 'data-dropStatus' , "Closed" ); // close all
	$('.formElement').removeClass( "formElementFocused" );
	var grabElementType = 				$(this).attr( 'data-formElementType' );
	//var grabElementDropStatus = 		$(this).attr( 'data-dropStatus' );
	var grabElementID = 					$(this).attr( 'data-formElementID' );
	switch( grabElementType ){
		case "DropList" : 
			//switch( grabElementDropStatus ){
				//case "Open" : 
					//$(this).attr( 'data-dropStatus' , "Closed" );
				//break;
				//case "Closed" : 
					// cycle and check for dependency handling
					$(this).find( '.dropListItem' ).each(function(){
						var visible = 											true;
						if( $(this).hasClass( "dependentChoice" ) ){
							var grabDependencySection = 			$(this).attr( "data-dependencySection" );
							var dependencyElement = 					$(this).attr( "data-dependencyElement" );
							var dependencyChoice = 					$(this).attr( "data-dependencyChoice" );
							var selectedDependencySourceID = 	$( '[data-formSectionID="' + grabDependencySection + '"] [data-formElementID="' + dependencyElement + '"] .selectedDropListItem' ).attr( 'data-dropListItemID' );
							//console.log( "selectedDependencySourceID = " + selectedDependencySourceID );
							if( selectedDependencySourceID != undefined && selectedDependencySourceID != "" && selectedDependencySourceID != null ){
								if( dependencyChoice != selectedDependencySourceID ){
									visible = 									false;
								}
							}else{
								visible = 									false;
							}
						}
						if( visible && $(this).closest( '.formElement' ).hasClass( "dependencyServant" ) ){
							$(this).addClass( "dependencyAllowed" );
						}else{
							$(this).removeClass( "dependencyAllowed" );
						}
					});
					if( $('#emrsSimulation').attr( 'data-currentActivity' ) == "PracticeReport" ){
						$(this).attr( 'data-dropStatus' , "Open" );
					}
				//break;
			//}
		break;
		case "DatePicker" : 
			//switch( grabElementDropStatus ){
				//case "Open" : 
					//$(this).attr( 'data-dropStatus' , "Closed" );
				//break;
				//case "Closed" : 
					if( $('#emrsSimulation').attr( 'data-currentActivity' ) == "PracticeReport" ){
						$(this).attr( 'data-dropStatus' , "Open" );
					}
				//break;
			//}
		break;
	}
});	

// ! --[ B - droplist element select ]--- 
//$(document).off("click", '[data-dropStatus="Open"] .dropListItem');
//$(document).on("click", '[data-dropStatus="Open"] .dropListItem', function(event){
$(document).off("click", '.dropListItem:not(.disabled)');
$(document).on("click", '.dropListItem:not(.disabled)', function(event){
	$(this).closest( '.formElement' ).find( '.dropListItem' ).removeClass( "selectedDropListItem" );
	$(this).addClass( "selectedDropListItem" );
	
	if( $(this).closest( '.formElement' ).hasClass( "dependencyMaster" ) ){
		var dependencyMasterSection = 					$(this).closest( '.formSection' ).attr( "data-formSectionID" );
		var dependencyMasterElementID = 				$(this).closest( '.formElement' ).attr( "data-formElementID" );
		var dependencyMasterElementSelection = 	$(this).attr( 'data-dropListItemID' );
		//console.log( "dependencyMasterSection = " + dependencyMasterSection );
		//console.log( "dependencyMasterElementID = " + dependencyMasterElementID );
		// seek choices that are dependent on this element
		//$( '[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"]' ).removeClass( 'selectedDropListItem' );
		// revert targeted choice list to the prompt
		//console.log( " currentActivity = " +  $('#emrsSimulation').attr( 'data-currentActivity' ) );
		//console.log( " simulationPhase = " + $('#emrsSimulation').attr( 'data-simulationPhase' ) );
		if( $('#emrsSimulation').attr( 'data-currentActivity' ) == "CompletedReport" && $('#emrsSimulation').attr( 'data-simulationPhase' ) == "Review" ){
			//console.log("should add selected");
			$( '.dropListItem[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"]' ).removeClass( 'selectedDropListItem' ).removeClass( 'dependencyAllowed' );
			$( '.dropListItem[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"][data-dependencyChoice="' + dependencyMasterElementSelection + '"]' ).addClass( 'dependencyAllowed' );
			$( '.dropListItem.bestChoice.dependencyAllowed[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"]' ).addClass( 'selectedDropListItem' );
		}else{
			$( '.dropListItem[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"]' ).removeClass( 'selectedDropListItem' ).removeClass( 'dependencyAllowed' );
			$( '.dropListPrompt[data-dependencySection="' + dependencyMasterSection + '"][data-dependencyElement="' + dependencyMasterElementID + '"]' ).addClass( 'selectedDropListItem' );
		}
	}//else{
		//$(this).addClass( "selectedDropListItem" );
	//}
	if( $(this).closest( '.formElement' ).attr( 'data-dropStatus' ) == "Open" ){
		$(this).closest( '.formElement' ).attr( 'data-dropStatus' , "Closed" );
	}
});	

// ! --[ B - calendar cell select ]--- 
$(document).off("click", '.datePickerCalendarRowNums .datePickerCalendarCell:not(.blankCell)');
$(document).on("click", '.datePickerCalendarRowNums .datePickerCalendarCell:not(.blankCell)', function(event){
	var grabCellColumnIndex = 		$(this).index();
	var grabCellNum = 					""
	var weekdayName = 				"";
	switch( grabCellColumnIndex ){
		case 0 :
			weekdayName = 				"Sun";
		break;
		case 1 :
			weekdayName = 				"Mon";
		break;
		case 2 :
			weekdayName = 				"Tue";
		break;
		case 3 :
			weekdayName = 				"Wed";
		break;
		case 4 :
			weekdayName = 				"Thu";
		break;
		case 5 :
			weekdayName = 				"Fri";
		break;
		case 6 :
			weekdayName = 				"Sat";
		break;
	}
	grabCellNum = 							$(this).text();
	var grabCellNumZeroed = 			grabCellNum;
	if( grabCellNum.length == 1 ){
		grabCellNumZeroed = 			"0" + grabCellNum;
	}
	$(this).closest( '.datePicker' ).find( '.datePickerHeaderDayName' ).text( weekdayName );
	$(this).closest( '.datePicker' ).find( '.datePickerHeaderDayNum' ).text( grabCellNumZeroed );
	$(this).closest( '.formElement' ).find( '.selectedCalendarItem' ).removeClass( "selectedCalendarItem" );
	$(this).addClass( "selectedCalendarItem" );
	$(this).closest( '.formElementContent' ).find( '.datePickerPrompt' ).text( "5/" + grabCellNum + "/17" );
	$(this).closest( '.formElement' ).attr( 'data-dropStatus' , "Closed" );
});	

// ! --[ B - header menu button ]--- 
$(document).off("click", '.activityLayersHeaderButton:not(.disabled)');
$(document).on("click", '.activityLayersHeaderButton:not(.disabled)', function(event){
	var currentAction = 		$(this).attr( 'data-buttonAction' );
	switch( currentAction ){
		case "activityLayersHeaderMenu" : 
			//$('#emrsSimulation').attr( 'data-currentActivity' , "SaveReportNotice" );
			$('.popupNoticeContentHeader').html( "Simulation: This would normally provide a Briefcase-contextual menu" );
			var buildNoticeContent = "";
			buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="CloseNotice">Close</div>';
			$('.popupNoticeContentContent').html( buildNoticeContent );
			$('#popupNotice').show();
		break;
		case "activityLayersHeaderPrev" : 
			$('.activityLayer').hide();
			$('#emrsSimulation').attr( 'data-simulationPhase' , "Briefcase" );
			$('.activityLayer[data-activityLabel="Briefcase"]').show();
			$(this).attr( 'data-buttonAction' , "activityLayersHeaderMenu" );
			$('.activityLayerLowerButton').empty().removeClass( "imgSourced" ).removeClass( "saveReportButtonIcon" ).html( "&plus;" );
		break;
	}
});	

// ! --[ B - launch report entry text button ]--- 
$(document).off("click", '[data-buttonAction="LaunchReportEntry"]:not(.disabled)');
$(document).on("click", '[data-buttonAction="LaunchReportEntry"]:not(.disabled)', function(event){
	//$('#emrsSimulation').attr( 'data-currentActivity' , "PracticeReport" );
	$('.activityLayersHeaderButton').attr( 'data-buttonAction' , "activityLayersHeaderPrev" );
	$('#popupNotice').hide();
	$('.activityLayerLowerButton').empty().addClass( "imgSourced" ).addClass( "saveReportButtonIcon" );
	$('.activityLayer').hide();
	$('#emrsSimulation').attr( 'data-simulationPhase' , "Entry" );
	resetReportForm();
	$('[data-activityLabel="Report Form"]').show();
	$( '.fillLineEntry' ).attr( "contenteditable" , "true" );
});	

// ! --[ B - reset report entry text button ]--- 
$(document).off("click", '[data-buttonAction="ResetReportEntry"]:not(.disabled)');
$(document).on("click", '[data-buttonAction="ResetReportEntry"]:not(.disabled)', function(event){
	resetReportForm();
});	

// ! --[ B - launch report review text button ]--- 
$(document).off("click", '[data-buttonAction="LaunchReportReview"]:not(.disabled)');
$(document).on("click", '[data-buttonAction="LaunchReportReview"]:not(.disabled)', function(event){
	$( '.activityLayerTab[data-activityTabID="CompletedReport"]' ).trigger( "click" );
});	

// ! --[ B - close notice ]--- 
$(document).off("click", '[data-buttonAction="CloseNotice"]:not(.disabled)');
$(document).on("click", '[data-buttonAction="CloseNotice"]:not(.disabled)', function(event){
	$('#popupNotice').hide();
});	

// ! --[ B - close notice ]--- 
$(document).off("click", '.activityLayerLowerButton:not(.disabled)');
$(document).on("click", '.activityLayerLowerButton:not(.disabled)', function(event){
	var currentActivity = 		$('#emrsSimulation').attr( 'data-currentActivity' );
	var simulationPhase = 	$('#emrsSimulation').attr( 'data-simulationPhase' );
	
	switch( currentActivity ){
		case "PracticeReport" : 
			switch( simulationPhase ){
				case "Briefcase" : 
					//$('#emrsSimulation').attr( 'data-currentActivity' , "AddReportNotice" );
					$('#emrsSimulation').attr( 'data-simulationPhase' , "AddReportNotice" );
					$('.popupNoticeContentHeader').html( "Select one of the following options" );
					var buildNoticeContent = "";
					buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="LaunchReportEntry">Contact Report</div>';
					$('.popupNoticeContentContent').html( buildNoticeContent );
					$('#popupNotice').show();
				break;
				case "Entry" : 
					//$('#emrsSimulation').attr( 'data-currentActivity' , "SaveReportNotice" );
					$('.popupNoticeContentHeader').html( "Simulation Actions: " );
					var buildNoticeContent = "";
					buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="ResetReportEntry">Reset Report Form</div>';
					buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="LaunchReportReview">View Completed Report</div>';
					$('.popupNoticeContentContent').html( buildNoticeContent );
					$('#popupNotice').show();
				break;
				/*case "Review" : 
					$('#emrsSimulation').attr( 'data-currentActivity' , "SaveReportNotice" );
					$('.popupNoticeContentHeader').html( "Simulated Result: " );
					var buildNoticeContent = "";
					buildNoticeContent += '<div class="popupNoticeText">Saves the report for submission.</div>';
					$('.popupNoticeContentContent').html( buildNoticeContent );
					$('#popupNotice').show();
				break;*/
			}
		break;
		case "CompletedReport" : 
			switch( simulationPhase ){
				case "Briefcase" : 
					//$('#emrsSimulation').attr( 'data-currentActivity' , "SaveReportNotice" );
					$('.popupNoticeContentHeader').html( "Simulation: This would normally add another report to your Briefcase" );
					var buildNoticeContent = "";
					buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="CloseNotice">Close</div>';
					$('.popupNoticeContentContent').html( buildNoticeContent );
					$('#popupNotice').show();
				break;
				case "Review" : 
					//$('#emrsSimulation').attr( 'data-currentActivity' , "SaveReportNotice" );
					$('.popupNoticeContentHeader').html( "Simulation: This would normally save the updated report to your Briefcase" );
					var buildNoticeContent = "";
					buildNoticeContent += '<div class="popupNoticeLinkText" data-buttonAction="CloseNotice">Close</div>';
					$('.popupNoticeContentContent').html( buildNoticeContent );
					$('#popupNotice').show();
				break;
			}
		break;
		case "Completed104" : 
			// only review phase
			
		break;
	}
	
});	

function resetReportForm(){
	//$('#emrsSimulation').attr( 'data-currentActivity' , "PracticeReport" );
	$('#popupNotice').hide();
	//$('.activityLayerLowerButton').empty().addClass( "imgSourced" ).addClass( "saveReportButtonIcon" );
	//$('.activityLayer').hide();
	//$('#emrsSimulation').attr( 'data-simulationPhase' , "Entry" );
	$( '.vizDependentTarget' ).addClass( "vizDependentTargetOff" );
	$( '.formElement' ).each(function(){
		switch( $(this).attr( 'data-formElementType' ) ){
			case "DropList" : 
				$(this).find('.selectedDropListItem').removeClass("selectedDropListItem");
				//$(this).find('.dropListPrompt').addClass("selectedDropListItem");
				$(this).find('.dropListPrompt').trigger( "click" );
				$(this).attr( 'data-dropStatus' , "Closed" );
			break;
			case "DatePicker" : 
				$(this).find('.selectedCalendarItem').removeClass("selectedCalendarItem");
				//$(this).find('.datePickerCalendarCell.initialSelection').addClass("selectedCalendarItem");
				$(this).find('.datePickerCalendarCell.initialSelection').trigger( "click" );
				$(this).find('.datePickerPrompt').text("Select Date");
				$(this).attr( 'data-dropStatus' , "Closed" );
			break;
			case "FillLine" : 
				$(this).attr( 'data-fillStatus' , "Default" );
				var grabThisDefaultText = $(this).find( '.formElementLabel' ).text();
				$(this).find( '.fillLineEntry' ).text( grabThisDefaultText );
			break;
			case "Radio" : 
				$(this).find( '.radioItem' ).removeClass( "selectedRadioItem" );
				$(this).find( '.radioItem .radioButton' ).removeClass( "disabled" );
			break;
		}
	});
	$('#emrsSimulation').attr( 'data-simulationPhase' , "Entry" );
}

function fillLineInit(){
	$('.fillLineEntry').each(function(){
		var grabThisDefaultText = $(this).closest( '.formElement' ).find( '.formElementLabel' ).text();
		$(this).text( grabThisDefaultText );
	});
}

// ! F.Embed pdf ---
function embedPDF(){
	var notifyBox = 	'<div class="pdfBox-IOS-Notify-Text">Your browser does not support "sandboxed" pdf embedding.  Some browsers may require control/right-clicking the following link, and then selecting "open in new window/tab".</div>';
	notifyBox +=		'<div class="pdfBox-IOS-Launcher-Box">';
	//notifyBox +=			'<div><a href="' + pdfPath + '" target="_blank"><span class="pdfBox-IOS-Launcher-Image" data-StepStoneIcon="' + webFontAssignmentObject.launcher_document + '"></span><span class="pdfBox-IOS-Launcher-Text"><strong>View PDF</strong></span></a></div>';
	notifyBox +=			'<div><a href="' + pdfPath + '" target="_blank"><span class="pdfBox-IOS-Launcher-Text"><strong>View PDF</strong></span></a></div>';
	notifyBox +=		'</div>';
	//notifyBox +=		'<div class="pdfBox-IOS-Notify-Text">Please return to this window to continue the case.</div>';
	//$("#lightBoxDialog-Level4").closest('.ui-dialog').css('background', 'black');
	if( isMobileBrowser ){
    	$('#documentLoadBox').append(notifyBox);
    	//$('#documentLoadBox a').css('color', skinPrimaryColor);
	}else{
    	$('#documentLoadBox').append('<object data="' + pdfPath + '#view=FitBV&scrollbar=1&toolbar=1&statusbar=1&navpanes=1" type="application/pdf" width="100%" height="100%">' + notifyBox + '</object>');
    	//$('#documentLoadBox a').css('color', skinPrimaryColor);
    	$('#documentLoadBox').css('overflow-y', 'hidden');
	}
	//*/
	//$('#documentLoadBox').css('height', $('#lightBoxDialog-Level4').height() + 'px');
	$('#documentLoadBox').css( 'height' , $('#activityLayers').height() + 'px');
	windowResizeRoutine();
}

// ! F - Utility - return the index with highest value ---
function indexOfMax(arr){
    if( arr.length === 0 ){
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for( var i = 1 ; i < arr.length ; i++ ){
        if( arr[i] > max ){
            maxIndex = 	i;
            max = 		arr[i];
        }
    }
    return maxIndex;
}

// ! F - Core - window resize - routine ---
function windowResizeRoutine(){
	var grabExistingViewPortNarrowStatus = 	$( '#masterContainer' ).attr( 'data-viewportNarrow' );
	$( '#popupNotice' ).css( 'top' , $('#activityLayerTabs').outerHeight(true) );
	//console.log( " $('#emrsSimulation').attr( 'data-currentActivity' ) = " +  $('#emrsSimulation').attr( 'data-currentActivity' ) );
	if( $('#emrsSimulation').attr( 'data-currentActivity' ) == "Completed104" ){
		//console.log( "$('.activityLayers').height() = " + $('.activityLayers').height() );
		$('#documentLoadBox').css( 'height' , $('#activityLayers').height() + 'px');
	}
	/*
	var heightArray = [];
	$( '.activityLayerTab' ).each(function(){
		heightArray.push( $(this).outerHeight(true) );
	});
	var heightsMatch = true;
	for( var a = 1 ; a < heightArray.length ; a++ ){
        if( heightArray[a] !== heightArray[a-1] ){
            heightsMatch = false;
        }
    }
    if( !heightsMatch ){
	    var tallestTabIndex = indexOfMax(heightArray);
		$( '.activityLayerTab' ).css( 'height' , heightArray[tallestTabIndex] + 'px' );
    }
    */
}