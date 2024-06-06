// Wait until document is ready and execute functions
if (typeof jQueryv1_7_1 != 'undefined') {
	jQueryv1_7_1(document).ready(function(){
		// Hide Radio Buttons (Candidate exists?)
		jQueryv1_7_1("span[class='fs-508-block']").filter(":has(input[id*='apiReferenceChoiceStep-referrerChoice_'])").hide();
		
		// Check if referred candidate exists and register a new candidate otherwise.
		var nonRegisteredCandidate = jQueryv1_7_1("span[id*='errorMessages']").filter(":has(span:contains('The system cannot find a registered candidate corresponding to the email address '))");
		
		if (nonRegisteredCandidate.length == 0) {
			jQueryv1_7_1("input[id*='apiReferenceChoiceStep-referrerChoice_1']").attr('checked', false);
			jQueryv1_7_1("input[id*='apiReferenceChoiceStep-referrerChoice_2']").attr('checked', true);
		} else {
			nonRegisteredCandidate.hide();
			var nonRegisteredCandidateEmail = jQueryv1_7_1("input[id*='apiReferenceChoiceStep-email']").val();
			jQueryv1_7_1("input[id*='apiReferenceChoiceStep-referrerChoice_2']").attr('checked', false);
			jQueryv1_7_1("input[id*='apiReferenceChoiceStep-referrerChoice_1']").attr('checked', true);
			jQueryv1_7_1("input[id*='apiReferenceChoiceStep-email']").val(nonRegisteredCandidateEmail);
			jQueryv1_7_1("input[id*='saveContinueCmdBottom']").click();
		}
	});
}