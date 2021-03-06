﻿Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 2: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 3: Defining and load required resources */
    var task_github = "https://zz112duke.github.io/Ar_Lr_Qualtrics/";

    // the below urls must be accessible with your browser
    // for example, https://kywch.github.io/jsPsych/jspsych.js
    var requiredResources = [
        task_github + "js/jspsych-6.1.0/jspsych.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js"
        task_github + "js/jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js"
        task_github + "js/jspsych-6.1.0/plugins/jspsych-external-html.js"
        task_github + "js/jspsych-6.1.0/plugins/jspsych-fullscreen.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 4: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');


    /* Change 5: Wrapping jsPsych.init() in a function */
    function initExp() {

        jsPsych.init({
            timeline: [enter_full, consent, instr_1, at_test_procedure, exit_full],
            display_element: 'display_stage',

            /* Change 6: Adding the clean up and continue functions.*/
            on_finish: function (data) {
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});