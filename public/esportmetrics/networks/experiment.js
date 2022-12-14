/* ************************************ */
/* Define helper functions */
/* ************************************ */
var resparr = []
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
		for (i=0; i<resparr.length; i++) {
		if (resparr[i].rt < 1000) {
			rtarr.push(resparr[i].rt)
				}
			}
	var avrt = rtarr.reduce((a, b) => a + b, 0)/rtarr.length
	corrarr = []
		for (i=0; i<resparr.length; i++) {
		if (resparr[i].corr = true) {
			rtarr.push(resparr[i].rt)
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


			for (i=0; i<resparr.length; i++) {
				if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "congruent") {
					nocue_cong.push(resparr[i].rt)
						}
				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "congruent") {
					center_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "congruent") {
					double_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "congruent") {
					spatial_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "incongruent") {
					nocue_incong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "incongruent") {
					center_incong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "incongruent") {
					double_incong.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "congruent") {
					spatial_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "neutral") {
							nocue_neutral.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "neutral") {
							nocue_neutral.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "neutral") {
							double_neutral.push(resparr[i].rt)
								}

				else if(resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "neutral") {
							spatial_neutral.push(resparr[i].rt)
								}
					}

				var nocue = [...nocue_cong, ...nocue_incong, ...nocue_neutral]
				var centralcue = [...center_cong, ...center_incong, ...center_neutral]
				var spatialcue= [...spatial_cong,...spatial_incong,...spatial_neutral]
				var doublecue =[...double_cong, ...double_incong, ...double_neutral]
				var congruent = [...nocue_cong, ...center_cong, ...double_cong, ...spatial_cong]
				var incongruent = [...nocue_incong, ...center_incong, ...double_incong, ...spatial_incong]

				var mean_nocue = math.mean(nocue)
				var mean_central = math.mean(centralcue)
				var mean_spatial = math.mean(spatialcue)
				var mean_double = math.mean(doublecue)
				var mean_congruent = math.mean(congruent)
				var mean_incongruent = math.mean(incongruent)

				var executive = mean_incongruent - mean_congruent
				var alerting = mean_nocue - mean_double
				var orienting = mean_central - mean_spatial

				var respObj = {exec:executive, alert: alerting, orient:orienting}

				networks.push(respObj)

			console.log(networks)
			console.log(myvalues)


			var corr_nocue_cong =  100-(nocue_cong.length/12)*100
			var corr_center_cong = 100 - (center_cong.length/12)*100
			var corr_double_cong = 100 - (double_cong.length/12)*100
			var corr_spatial_cong = 100 - (spatial_cong.length/12)*100
			var corr_nocue_incong = 100 - (nocue_incong.length/12)*100
			var corr_center_incong = 100 - (center_incong.length/12)*100
			var corr_double_incong = 100 - (double_incong.length/12)*100
			var corr_spatial_incong = 100 - (spatial_incong.length/12)*100
			var corr_nocue_neutral = 100 - (nocue_neutral.length/12)*100
			var corr_center_neutral = 100 - (center_neutral.length/12)*100
			var corr_double_neutral = 100 - (double_neutral.length/12)*100
			var corr_spatial_neutral = 100 - (spatial_neutral.length/12)*100

			var correctObj = {congruent_nocue:corr_nocue_cong, congruent_center:corr_center_cong, congruent_double:corr_double_cong, congruent_spatial:corr_spatial_cong,
			incongruent_nocue:corr_nocue_incong, incongruent_center:corr_center_incong, incongruent_double:corr_double_incong, incongruent_spatial:corr_spatial_incong,
		neutral_nocue:corr_nocue_neutral, neutral_center:corr_center_neutral, neutral_double:corr_double_neutral, neutral_spatial:corr_spatial_neutral}

		perf.push(correctObj)
		console.log(perf)

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
var practice_block = jsPsych.randomization.repeat(test_stimuli.slice(0, 5).concat(test_stimuli.slice(
	18, 21)).concat(test_stimuli.slice(36, 40)), 1, true);

/* set up repeats for three test blocks */
var block1_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli), 1, true);
var block2_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli), 1, true);
var block3_trials = jsPsych.randomization.repeat($.extend(true, [], test_stimuli), 1, true);
var blocks = [block1_trials, block2_trials, block3_trials]


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
   questions: ['<p class = center-block-text style = "font-size: 20px">K??rlek jelezd, ha ??szlelt??l valamilyen hib??t a programban.</p>'],
   rows: [15, 15],
   columns: [60,60]
};

/* define static blocks */
var test_intro_block = {
	type: 'poldrack-text',
	text: '<div class = centerbox><p class = center-block-text>Most kezd??dik a k??s??rleti r??sz. Nyomj egy <strong>enter</strong>-t a folytat??shoz.</p></div>',
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
	text: '<div class = centerbox><p class = center-block-text>K??sz??n??m, hogy teljes??tetted a feladatot!</p><p class = center-block-text>Nyomd meg az <strong>enter</strong>-t a befejez??shez.</p></div>',
	cont_key: [13],
	data: {
		trial_id: "end",
    	exp_id: 'attention_network_task'
	},
	timing_response: 180000,
	timing_post_trial: 0,
	on_finish: assessPerformance,
};

var feedback_instruct_text =
	'??dv??z??llek a  kutat??sban. A k??s??rlet teljes??t??se kb. 15 percet fog ig??nybe venni. Nyomj egy <strong>enter</strong>-t a folyat??shoz.'
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
		'<div class = centerbox><p class = block-text>Ebben a k??s??rletben ??t nyilat fogsz egym??s mellett l??tni, amelyek jobbra vagy balra mutatnak (pl. &larr; &larr; &larr; &larr; &larr;, vagy &mdash; &mdash; &rarr; &mdash; &mdash;) ??s a k??perny?? tetej??n vagy alj??n jelenhetnek meg.</p><p class = block-text>A feladatod jelezni, hogy a k??z??pen l??v?? ny??l melyik ir??nyba mutat az ennek megefelel?? ir??ny?? gombok lenyom??s??val.</p></p></p></div>',
	],
	allow_keys: false,
	data: {
		trial_id: 'instruction'
	},
	show_clickable_nav: true,
	timing_post_trial: 1000
};

var instructions_block_2 = {
	type: 'poldrack-instructions',
	pages: [
		'<div class = centerbox><p class = block-text> A nyilak megjelen??se el??tt egy * t??nhet fel a k??perny?? egyes pontjain.</p><p class = block-text>A * megjelen??s??t??l f??ggetlen??l, pr??b??lj meg mindig a lehet?? leggyorsabban ??s legpontosabban v??laszolni!</p><p class = block-text>Az instrukci??k befejez??s??t k??vet??en n??h??ny pr??ba feladat fog k??vetkezni. A pr??b??k sor??n visszajelz??st fogsz kapni a v??laszaid helyess??g??r??l. A k??s??rlet ezt k??vet?? r??sz??ben m??r nem fogsz ilyen visszajez??st kapni.</p></div>'
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
				'T??l gyorsan haladtt??l v??gig az instrukci??kon.  K??rlek, hagyj id??t arra, hogy alaposan v??gig olvasd az instrukci??kat.  Nyomj egy <strong>enter</strong>-t a folyat??shoz.'
			return true
		} else if (sumInstructTime > instructTimeThresh * 1000) {
			feedback_instruct_text = 'V??get ??rtek az instrukci??k. Nyomj egy <strong>enter</strong>-t a folyat??shoz.'
			return false
		}
	}
}

var rest_block = {
	type: 'poldrack-text',
	text: '<div class = centerbox><p class = block-text>Most tarts egy r??vid sz??netet! Nyomj meg egy gombot a folytat??shoz.</p></div>',
	timing_response: 180000,
	data: {
		trial_id: "rest block"
	},
	timing_post_trial: 1000
};

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

var myvalues = {};
var check_consent = function(elem) {
  if ($('#consent_checkbox').is(':checked') && $("#choose").val().length != 0) {
		$.each($('#myForm').serializeArray(), function(i, field) {
    myvalues[field.name] = field.value;
		});
    return true;
  }
  else {
    alert("Ahhoz, hogy a k??s??rlet elindulhasson k??rlek t??lts ki minden sz??ks??ges mez??t");
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

/* set up ANT experiment */
var attention_network_task_experiment = [];
attention_network_task_experiment.push(starttrial);
attention_network_task_experiment.push(instruction_node);

/* set up ANT practice */
var trial_num = 0
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
		timeout_message: '<div class = centerbox><div class = center-text>Lass?? v??lasz!</div></div>',
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

attention_network_task_experiment.push(rest_block)
attention_network_task_experiment.push(test_intro_block);


/* Set up ANT main task */
var trial_num = 0
for (b = 0; b < blocks.length; b++) {
	var block = blocks[b]
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

				resparr.push(respObj)

				/*var get_RT = function() {
					var curr_trial = jsPsych.progress().current_trial_global
					return jsPsych.data.getData()[curr_trial].rt
				}*/

					/*console.log(get_RT())*/
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
	attention_network_task_experiment.push(rest_block)
}


attention_network_task_experiment.push(post_task_block)
attention_network_task_experiment.push(end_block)
