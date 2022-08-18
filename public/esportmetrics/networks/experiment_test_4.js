/* ************************************ */
/* Define helper functions */
/* ************************************ */

function saveData(name, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
  }

  function savePerf(name, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_perf.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
  }

  function collectData(){ 
      return JSON.stringify(respArr);
    }

  function saveVals(name, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_vals.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
  }
    

  function collectData(){ 
    return JSON.stringify(respArr);
  }

  function collectPerf(){
    return JSON.stringify(perf);
  }

  function collectVals(){ 
    return JSON.stringify(myvalues);
  }


var respArr = []
var networks = []
var perf = []

function evalAttentionChecks() {
	var check_percent = 1
	if (run_attention_checks) {
		var attention_check_trials = jsPsych.data.getTrialsOfType('attention-check')
		var checks_passed = 0
		for (var i = 0; i < attention_check_trials.length; i++) {
			if (attention_check_trials[i].correct === true) {
				checks_passed += 1
			}
		}
		check_percent = checks_passed / attention_check_trials.length
	}
	return check_percent
}

function assessPerformance() {
	/* Function to calculate the "credit_var", which is a boolean used to
	credit individual experiments in expfactory.
	 */
	var experiment_data = jsPsych.data.getTrialsOfType('poldrack-single-stim')
	var missed_count = 0
	var trial_count = 0
	var rt_array = []
	var rt = 0
		//record choices participants made
	var choice_counts = {}
	choice_counts[-1] = 0
	for (var k = 0; k < choices.length; k++) {
		choice_counts[choices[k]] = 0
	}
	for (var i = 0; i < experiment_data.length; i++) {
		if (experiment_data[i].possible_responses != 'none') {
			trial_count += 1
			rt = experiment_data[i].rt
			key = experiment_data[i].key_press
			choice_counts[key] += 1
			if (rt == -1) {
				missed_count += 1
			} else {
				rt_array.push(rt)
			}
		}
	}
	//calculate average rt
	var avg_rt = -1
	if (rt_array.length !== 0) {
		avg_rt = math.median(rt_array)
	}

		//calculate whether response distribution is okay
	var responses_ok = true
	Object.keys(choice_counts).forEach(function(key, index) {
		if (choice_counts[key] > trial_count * 0.85) {
			responses_ok = false
		}
	})
	var missed_percent = missed_count/trial_count
	credit_var = (missed_percent < 0.4 && avg_rt > 200 && responses_ok)
	jsPsych.data.addDataToLastTrial({"credit_var": credit_var})

	 var rtarr = []
		for (i=0; i<respArr.length; i++) {
		if (respArr[i].rt < 1000) {
			rtarr.push(respArr[i].rt)
				}
			}
	corrarr = []
		for (i=0; i<respArr.length; i++) {
		
			if (respArr[i].corr = true) {
			rtarr.push(respArr[i].rt)
				}
			}

			var nocue_cong = []
			var center_cong = []
			var double_cong = []
			var spatial_cong = []
			var nocue_incong = []
			var center_incong = []
			var double_incong = []
			var spatial_incong = []
			var nocue_neutral = []
			var center_neutral = []
			var double_neutral = []
			var spatial_neutral = []


			for (i=0; i<respArr.length; i++) {
				if (respArr[i].correct == true && respArr[i].cue == "nocue" && respArr[i].flanker_type == "congruent") {
					nocue_cong.push(respArr[i].rt)
						}
				else if (respArr[i].correct == true && respArr[i].cue == "center" && respArr[i].flanker_type == "congruent") {
					center_cong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "double" && respArr[i].flanker_type == "congruent") {
					double_cong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "spatial" && respArr[i].flanker_type == "congruent") {
					spatial_cong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "nocue" && respArr[i].flanker_type == "incongruent") {
					nocue_incong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "center" && respArr[i].flanker_type == "incongruent") {
					center_incong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "double" && respArr[i].flanker_type == "incongruent") {
					double_incong.push(respArr[i].rt)
								}

				else if (respArr[i].correct == true && respArr[i].cue == "spatial" && respArr[i].flanker_type == "congruent") {
					spatial_cong.push(respArr[i].rt)
						}

				else if (respArr[i].correct == true && respArr[i].cue == "nocue" && respArr[i].flanker_type == "neutral") {
							nocue_neutral.push(respArr[i].rt)
								}

				else if (respArr[i].correct == true && respArr[i].cue == "center" && respArr[i].flanker_type == "neutral") {
							center_neutral.push(respArr[i].rt)
								}

				else if (respArr[i].correct == true && respArr[i].cue == "double" && respArr[i].flanker_type == "neutral") {
							double_neutral.push(respArr[i].rt)
								}

				else if(respArr[i].correct == true && respArr[i].cue == "spatial" && respArr[i].flanker_type == "neutral") {
							spatial_neutral.push(respArr[i].rt)
								}
					}
					
			rtArray = []
					
			for (i=0; i<respArr.length; i++) {
				if (respArr[i].correct) {
					rtArray.push(respArr[i].rt)
						}
					}	

			//var avgrt = rtArray.reduce((a, b) => a + b, 0)/rtarr.length

				var nocue = [...nocue_cong, ...nocue_incong, ...nocue_neutral]
				var centralcue = [...center_cong, ...center_incong, ...center_neutral]
				var spatialcue= [...spatial_cong,...spatial_incong,...spatial_neutral]
				var doublecue =[...double_cong, ...double_incong, ...double_neutral]
				var congruent = [...nocue_cong, ...center_cong, ...double_cong, ...spatial_cong]
				var incongruent = [...nocue_incong, ...center_incong, ...double_incong, ...spatial_incong]

				console.log(myvalues)

				/*var mean_nocue = math.mean(nocue)
				var mean_central = math.mean(centralcue)
				var mean_spatial = math.mean(spatialcue)
				var mean_double = math.mean(doublecue)
				var mean_congruent = math.mean(congruent)
				var mean_incongruent = math.mean(incongruent)

				var executive = mean_incongruent - mean_congruent
				var alerting = mean_nocue - mean_double
				var orienting = mean_central - mean_spatial

				var networkObj = {exec:executive, alert: alerting, orient:orienting}

				networks.push(networkObj)*/
					
			var corr_nocue_cong =  (nocue_cong.length/12)*100
			var corr_center_cong = (center_cong.length/12)*100
			var corr_double_cong = (double_cong.length/12)*100 
			var corr_spatial_cong = (spatial_cong.length/12)*100
			var corr_nocue_incong = (nocue_incong.length/12)*100
			var corr_center_incong = (center_incong.length/12)*100
			var corr_double_incong = (double_incong.length/12)*100
			var corr_spatial_incong = (spatial_incong.length/12)*100
			var corr_nocue_neutral = (nocue_neutral.length/12)*100
			var corr_center_neutral = (center_neutral.length/12)*100
			var corr_double_neutral = (double_neutral.length/12)*100
			var corr_spatial_neutral = (spatial_neutral.length/12)*100

			//var finalRes = (corr_nocue_cong + corr_center_cong + corr_double_cong + corr_spatial_cong + corr_nocue_incong + corr_center_incong
			//	+ corr_double_incong + corr_spatial_incong + corr_nocue_neutral + corr_center_neutral + corr_double_neutral + corr_spatial_neutral) / 4

			var correctObj = {congruent_nocue:corr_nocue_cong, congruent_center:corr_center_cong, congruent_double:corr_double_cong, congruent_spatial:corr_spatial_cong,
			incongruent_nocue:corr_nocue_incong, incongruent_center:corr_center_incong, incongruent_double:corr_double_incong, incongruent_spatial:corr_spatial_incong,
		neutral_nocue:corr_nocue_neutral, neutral_center:corr_center_neutral, neutral_double:corr_double_neutral, neutral_spatial:corr_spatial_neutral}

		perf.push(correctObj)
		//perf.push(avgrt)
		//perf.push(networkObj)
		console.log(myvalues)

}

var getInstructFeedback = function() {
	return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
		'</p></div>'
}

var post_trial_gap = function() {
	var curr_trial = jsPsych.progress().current_trial_global
	return 3500 - jsPsych.data.getData()[curr_trial - 1].rt - jsPsych.data.getData()[curr_trial - 4].block_duration
}

var get_RT = function() {
	var curr_trial = jsPsych.progress().current_trial_global
	return jsPsych.data.getData()[curr_trial].rt
}

var getInstructFeedback = function() {
	return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
		'</p></div>'
}



/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
var run_attention_checks = false
var attention_check_thresh = 0.65
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds
var credit_var = true

// task specific variables
/* set up stim: location (2) * cue (4) * direction (2) * condition (3) */
var locations = ['up', 'down']
var cues = ['nocue', 'center', 'double', 'spatial']
var current_trial = 0
var exp_stage = 'practice'
var test_stimuli = []
var choices = [37, 39]
var path = 'images/'
var images = [path + 'right_arrow.png', path + 'left_arrow.png', path + 'no_arrow.png']
//preload
jsPsych.pluginAPI.preloadImages(images)

for (l = 0; l < locations.length; l++) {
	var loc = locations[l]
	for (ci = 0; ci < cues.length; ci++) {
		var c = cues[ci]
		stims = [{
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'neutral',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'congruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'incongruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'neutral',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'congruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'incongruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}]
		for (i = 0; i < stims.length; i++) {
			test_stimuli.push(stims[i]) 
		}
	}
}

/* set up 24 practice trials. Included all nocue up trials, center cue up trials, double cue down trials, and 6 spatial trials (3 up, 3 down) */
var practice_block = jsPsych.randomization.repeat(test_stimuli.slice(0, 1), 1, true);

/* set up repeats for three test blocks */
var block1_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli.slice(0, 1)), 1, true);
var block2_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli), 1, true);
var block3_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli), 1, true);
var blocks = [block1_trials]

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
var attention_check_block = {
	type: 'attention-check',
	timing_response: 180000,
	response_ends_trial: true,
	timing_post_trial: 200
}

var attention_node = {
	timeline: [attention_check_block],
	conditional_function: function() {
		return run_attention_checks
	}
}

//Set up post task questionnaire
var post_task_block = {
   type: 'survey-text',
   data: {
       trial_id: "post task questions"
   },
   questions: ['<p class = center-block-text style = "font-size: 20px">Észrevétel, visszajelzés, hiba (ha nincs hagyd üresen).</p>'],
   rows: [15, 15],
   columns: [60,60]
};

/* define static blocks */
var test_intro_block = {
	type: 'poldrack-text',
	text: '<div class = centerbox><p class = center-block-text>Most kezdődik az éles feladat, mindent bele!</p> <p class = center-block-text> Nyomj egy <strong>enter</strong>-t a folytatáshoz.</p></div>',
	cont_key: [13],
	data: {
		trial_id: "intro",
		exp_stage: "test"
	},
	timing_response: 180000,
	timing_post_trial: 1000,
	on_finish: function() {
		exp_stage = 'test'
	}
};

var end_block = {
	type: 'poldrack-text',
	text: `<div class = centerbox> <div class="flex-container"> <p class = center-block-text>Köszönöm, hogy teljesítetted a feladatot!</p> </div> <div class="flex-container-2"> <p>helyes válaszok: </br> ${jsPsych.data.getLastTrialData().rt}</p> <p>átlagos válasz: </br> ${finalRT}ms</p> </div> <div style="display: block; position:relative; bottom: 100px;"> <p style="text-align: center; font-size: 1.3rem;"> Az email címedre hamarosan elküldjük a kutatás eredményét, amiből megtudhatod, hol állsz a többi résztvevőhöz képest.</p><p style="text-align: center;"><img src="images/chart.png" alt=""></p></div> <div class="flex-container"> <p class = center-block-text>A befejezéshez kattints a linkre. </br> <a style="text-align:center;  line-height: 30px;" href="https://esportmetrics.hu/kiserletek.html" >esportmetrics.hu/kiserletek</a></p></div></div>`,
	cont_key: [13],
	data: {
		trial_id: "end",
    	exp_id: 'attention_network_task'
	},
	timing_response: 180000,
	timing_post_trial: 0,
};

var feedback_instruct_text =
	'A kísérlet kb. 15 percet fog igénybe venni. Nyomj egy <strong>enter-t</strong> a folytatáshoz.'
var feedback_instruct_block = {
	type: 'poldrack-text',
	cont_key: [13],
	text: getInstructFeedback,
	data: {
		trial_id: 'instruction'
	},
	timing_post_trial: 0,
	timing_response: 180000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.

var instructions_block = {
	type: 'poldrack-instructions',
	pages: [
		'<div class = centerbox><p class = block-text>Ebben a kísérletben öt nyilat fogsz egymás mellett látni, amelyek jobbra vagy balra mutatnak (pl. &larr; &larr; &larr; &larr; &larr;, vagy &mdash; &mdash; &rarr; &mdash; &mdash;) és a képernyő tetején vagy alján jelenhetnek meg.</p></p></p></div>',
		'<div class = centerbox><p class = block-text>A feladatod jelezni, hogy a középen lévő nyíl melyik irányba mutat az ennek megefelelő irányú gombok lenyomásával.</p><p style="text-align: center;  font-size: 60px;">&larr; &larr; <span style="color:rgba(0,162,232,1)">&rarr;</span> &larr; &larr;</p> <img class=center-img src="./images/buttons.png"></img></div>',
		'<div class = centerbox><p class = block-text> A nyilak megjelenése előtt egy csillag <span style="font-size:30px; font-weight: bold;">*</span> tűnhet fel a képernyő egyes pontjain.</p><p class = block-text>A <span style="font-size:30px; font-weight: bold;">*</span> megjelenésétől függetlenül, próbálj meg mindig a lehető leggyorsabban és legpontosabban válaszolni!</p></div>',
		'<div class = centerbox><p style="text-align: center; font-size: 24px;"><strong>Most néhány gyakorló feladat fog következni.</strong> <p class = block-text> A gyakorlás során visszajelzést fogsz kapni a válaszaid helyességéről.</p> <p class = block-text> A kísérlet ezt követő részében már nem fogsz ilyen visszajezést kapni.</p></p></div>',

	],
	allow_keys: false,
	data: {
		trial_id: 'instruction'
	},
	show_clickable_nav: true,
	timing_post_trial: 1000
};


var instruction_node = {
	timeline: [feedback_instruct_block, instructions_block],
	/* This function defines stopping criteria */
	loop_function: function(data) {
		for (i = 0; i < data.length; i++) {
			if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
				rt = data[i].rt
				sumInstructTime = sumInstructTime + rt
			}
		}
		if (sumInstructTime <= instructTimeThresh * 1000) {
			feedback_instruct_text =
				'Túl gyorsan haladttál végig az instrukciókon.  Kérlek, hagyj időt arra, hogy alaposan végig olvasd az instrukciókat.  Nyomj egy <strong>enter</strong>-t a folyatáshoz.'
			return true
		} else if (sumInstructTime > instructTimeThresh * 1000) {
			feedback_instruct_text = 'Véget értek az instrukciók. Nyomj egy <strong>enter</strong>-t a folyatáshoz.'
			return false
		}
	}
}


var fixation = {
	type: 'poldrack-single-stim',
	stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
	is_html: true,
	choices: 'none',
	data: {
		trial_id: 'fixation'
	},
	timing_post_trial: 0,
	timing_stim: 400,
	timing_response: 400,
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
			exp_stage: exp_stage
		})
	}
}

var no_cue = {
	type: 'poldrack-single-stim',
	stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
	is_html: true,
	choices: 'none',
	data: {
		trial_id: 'nocue'
	},
	timing_post_trial: 0,
	timing_stim: 100,
	timing_response: 100,
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
			exp_stage: exp_stage
		})
	}
}

var center_cue = {
	type: 'poldrack-single-stim',
	stimulus: '<div class = centerbox><div class = ANT_centercue_text>*</div></div>',
	is_html: true,
	choices: 'none',
	data: {
		trial_id: 'centercue'
	},
	timing_post_trial: 0,
	timing_stim: 100,
	timing_response: 100,
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
			exp_stage: exp_stage
		})
	}

}

var double_cue = {
	type: 'poldrack-single-stim',
	stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_down><div class = ANT_text>*</div></div><div class = ANT_up><div class = ANT_text>*</div><div></div>',
	is_html: true,
	choices: 'none',
	data: {
		trial_id: 'doublecue'
	},
	timing_post_trial: 0,
	timing_stim: 100,
	timing_response: 100,
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
			exp_stage: exp_stage
		})
	}
}

var myvalues = []
var finalRes 
var finalRT 

var csValues = {};
var dotaValues ={}
var lolValues = {};
var fifaValues = {};
var scValues = {};
var owValues = {};

var check_consent = function(elem) {
  if ($('#consent_checkbox').is(':checked')) {
	$.each($('#myForm_2').serializeArray(), function(i, field) {
		myvalues[field.name] = field.value;
			});
	 if (document.getElementById("csForm").style.display === "") {
		csValues[csStyle.name] = csStyle.value;
		csValues[document.getElementById("csRank").name] = document.getElementById("csRank").value
		csValues[document.getElementById("csBestRank").name] = document.getElementById("csBestRank").value
		csValues[document.getElementById("csTime").name] = document.getElementById("csTime").value
		myvalues.push(csValues)
	}
	 if (document.getElementById("dotaForm").style.display === "") {
		dotaValues[dotaStyle.name] = dotaStyle.value;
		dotaValues[document.getElementById("dotaRank").name] = document.getElementById("dotaRank").value
		dotaValues[document.getElementById("dotaBestRank").name] = document.getElementById("dotaBestRank").value
		dotaValues[document.getElementById("dotaTime").name] = document.getElementById("dotaTime").value
		myvalues.push(dotaValues)
	}
	 if (document.getElementById("lolForm").style.display === "") {
		lolValues[lolStyle.name] = lolStyle.value;
		lolValues[document.getElementById("lolRank").name] = document.getElementById("lolRank").value
		lolValues[document.getElementById("lolBestRank").name] = document.getElementById("lolBestRank").value
		lolValues[document.getElementById("lolTime").name] = document.getElementById("lolTime").value
		myvalues.push(lolValues)
	}
	 if (document.getElementById("fifaForm").style.display === "") {
		fifaValues[fifaStyle.name] = fifaStyle.value;
        fifaValues[document.getElementById("fifaRank").name] = document.getElementById("fifaRank").value
		fifaValues[document.getElementById("fifaBestRank").name] = document.getElementById("fifaBestRank").value
        fifaValues[document.getElementById("fifaTime").name] = document.getElementById("fifaTime").value
        myvalues.push(fifaValues)
	}
	 if (document.getElementById("owForm").style.display === "") {
		owValues[owStyle.name] = owStyle.value;
        owValues[document.getElementById("owRank").name] = document.getElementById("owRank").value
		owValues[document.getElementById("owBestRank").name] = document.getElementById("owBestRank").value
        owValues[document.getElementById("owTime").name] = document.getElementById("owTime").value
        myvalues.push(owValues)
	}
	 if (document.getElementById("scForm").style.display === "") {
		scValues[scStyle.name] = scStyle.value;
        scValues[document.getElementById("scRank").name] = document.getElementById("scRank").value
		scValues[document.getElementById("scBestRank").name] = document.getElementById("scBestRank").value
        scValues[document.getElementById("scTime").name] = document.getElementById("scTime").value
        myvalues.push(scValues)
	}
    return true;
  }
  else {
    alert("Ahhoz, hogy a kísérlet elindulhasson kérlek tölts ki minden szükséges mezőt");
    return false;
  }
  return false;
};

var starttrial = {
  type:'html',
  url: "external_page.html",
  cont_btn: "start",
  check_fn: check_consent
};

var lasttrial = {
	type:'html',
	url: "test.html",
	cont_btn: "start",
	check_fn: check_consent
  };

var activate_fullscreen = {
    type: 'fullscreen',
	
}

/* set up ANT experiment */
var attention_network_task_experiment = [];
attention_network_task_experiment.push(starttrial);
attention_network_task_experiment.push(activate_fullscreen);
attention_network_task_experiment.push(instruction_node);

/* set up ANT practice */
var block = practice_block
for (i = 0; i < block.data.length; i++) {
	var trial_num = trial_num + 1
	var first_fixation_gap = Math.floor(Math.random() * 1200) + 400;
	var first_fixation = {
		type: 'poldrack-single-stim',
		stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
		is_html: true,
		choices: 'none',
		data: {

			trial_id: 'fixation',
			exp_stage: 'practice'
		},
		timing_post_trial: 0,
		timing_stim: first_fixation_gap,
		timing_response: first_fixation_gap
	}
	attention_network_task_experiment.push(first_fixation)

	if (block.data[i].cue == 'nocue') {
		attention_network_task_experiment.push(no_cue)
	} else if (block.data[i].cue == 'center') {
		attention_network_task_experiment.push(center_cue)
	} else if (block.data[i].cue == 'double') {
		attention_network_task_experiment.push(double_cue)
	} else {
		var spatial_cue = {
			type: 'poldrack-single-stim',
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = centerbox><div class = ANT_' + block.data[i].flanker_location +
				'><div class = ANT_text>*</p></div></div>',
			is_html: true,
			choices: 'none',
			data: {

				trial_id: 'spatialcue',
				exp_stage: 'practice'
			},
			timing_post_trial: 0,
			timing_stim: 100,
			timing_response: 100
		}
		attention_network_task_experiment.push(spatial_cue)
	}

	attention_network_task_experiment.push(fixation)

	block.data[i].trial_num = trial_num
	var attention_network_task_practice_trial = {
		type: 'poldrack-categorize',
		stimulus: block.stimulus[i],
		is_html: true,
		key_answer: block.data[i].correct_response,
		correct_text: '<div class = centerbox><div style="color:green"; class = center-text>Helyes!</div></div>',
		incorrect_text: '<div class = centerbox><div style="color:red"; class = center-text>Helytelen!</div></div>',
		timeout_message: '<div class = centerbox><div class = center-text>Lassú válasz!</div></div>',
		choices: choices,
		data: block.data[i],
		timing_response: 1700,
		timing_stim: 1700,
		response_ends_trial: true,
		timing_feedback_duration: 1000,
		show_stim_with_feedback: false,
		timing_post_trial: 0,
		on_finish: function() {
			jsPsych.data.addDataToLastTrial({
				exp_stage: exp_stage
			})
		}
	}

	attention_network_task_experiment.push(attention_network_task_practice_trial)

	var last_fixation = {
		type: 'poldrack-single-stim',
		stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
		is_html: true,
		choices: 'none',
		data: {

			trial_id: 'fixation',
			exp_stage: 'practice'
		},
		timing_post_trial: 0,
		timing_stim: post_trial_gap,
		timing_response: post_trial_gap,
	}
	attention_network_task_experiment.push(last_fixation)
}

attention_network_task_experiment.push(test_intro_block);



/* Set up ANT main task */
var trial_num = 0
for (b = 0; b < blocks.length; b++) {
	var block = blocks[b]
	if(b==10) {
		var rest_block = {
			type: 'poldrack-text',
			text: `<div class = centerbox><p class= center-text-2 style="color:green">33% teljesítve</p><p class = center-block-text>Most tarts egy rövid szünetet!</p> <p class = center-block-text> Nyomj meg egy gombot a folytatáshoz.</p></div>`,
			timing_response: 180000,
			data: {
				trial_id: "rest block"
			},
			timing_post_trial: 1000
		};
		attention_network_task_experiment.push(rest_block)
	}
	else if (b==20) {
		var rest_block = {
			type: 'poldrack-text',
			text: `<div class = centerbox><p class= center-text-2 style="color:green">66% teljesítve</p><p class = block-text>Most tarts egy rövid szünetet! Nyomj meg egy gombot a folytatáshoz.</p></div>`,
			timing_response: 180000,
			data: {
				trial_id: "rest block"
			},
			timing_post_trial: 1000
			}
			attention_network_task_experiment.push(rest_block)
		}


	for (i = 0; i < block.data.length; i++) {
		var trial_num = trial_num + 1
		var first_fixation_gap = Math.floor(Math.random() * 1200) + 400;
		var first_fixation = {
			type: 'poldrack-single-stim',
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
			is_html: true,
			choices: 'none',
			data: {

				trial_id: "fixation",
				exp_stage: 'test'
			},
			timing_post_trial: 0,
			timing_stim: first_fixation_gap,
			timing_response: first_fixation_gap
		}
		attention_network_task_experiment.push(first_fixation)

		if (block.data[i].cue == 'nocue') {
			attention_network_task_experiment.push(no_cue)
		} else if (block.data[i].cue == 'center') {
			attention_network_task_experiment.push(center_cue)
		} else if (block.data[i].cue == 'double') {
			attention_network_task_experiment.push(double_cue)
		} else {
			var spatial_cue = {
				type: 'poldrack-single-stim',
				stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = centerbox><div class = ANT_' + block.data[i].flanker_location +
					'><div class = ANT_text>*</p></div></div>',
				is_html: true,
				choices: 'none',
				data: {

					trial_id: "spatialcue",
					exp_stage: 'test'
				},
				timing_post_trial: 0,
				timing_stim: 100,
				timing_response: 100
			}
			attention_network_task_experiment.push(spatial_cue)
		}
		attention_network_task_experiment.push(fixation)

		block.data[i].trial_num = trial_num
		var ANT_trial = {
			type: 'poldrack-single-stim',
			stimulus: block.stimulus[i],
			is_html: true,
			choices: choices,
			data: block.data[i],
			timing_response: 1700,
			timing_stim: 1700,
			response_ends_trial: true,
			timing_post_trial: 0,
			on_finish: function(data) {
				correct = data.key_press === data.correct_response
				jsPsych.data.addDataToLastTrial({
					correct: correct,
					exp_stage: exp_stage
				})
				var lasttrialdata = jsPsych.data.getLastTrialData()
				var cues = lasttrialdata["cue"]
				var corr = lasttrialdata["correct"]
				var rtime = lasttrialdata["rt"]
				var flankertype = lasttrialdata["flanker_type"]
				var trialnum = lasttrialdata["trial_num"]
				var respObj = {
					correct: corr,
					cue: cues,
					flanker_type: flankertype,
					rt: rtime,
					trial_num: trialnum,
					}
				console.log(lasttrialdata)
				respArr.push(respObj)
			
				var getTrial = function() {
					var trials = jsPsych.progress().current_trial_global
					var curr_trial = jsPsych.data.getData()[trials].trial_num 

					if (curr_trial == 1) {
						assessPerformance()
						saveData("experiment_data_".concat(sub_id), collectPerf()),
						savePerf("experiment_data_".concat(sub_id2), collectData()),
						saveVals("experiment_data_".concat(sub_id3), collectVals());
					}
				}
				getTrial()
			}
		}
		attention_network_task_experiment.push(ANT_trial)

		var last_fixation = {
			type: 'poldrack-single-stim',
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
			is_html: true,
			choices: 'none',
			data: {
				trial_id: "fixation",
				exp_stage: 'test'
			},
			timing_post_trial: 0,
			timing_stim: post_trial_gap,
			timing_response: post_trial_gap,
		}
		attention_network_task_experiment.push(last_fixation)
	}

	attention_network_task_experiment.push(attention_node)
}

attention_network_task_experiment.push(post_task_block)

