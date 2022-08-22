for (i = 0; i < blocks.length; i++) {
    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus:  fixation,
        choices: "NO_KEYS",
        trial_duration: null,
        data: {
          task: 'fixation'
        }
      };
  
      var display = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: "NO_KEYS",
        trial_duration: 100
      };
  
      var test = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: ['f', 'j'],
        trial_duration: null,
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response'),
          flanker_type: jsPsych.timelineVariable('flanker_type'),
          load: jsPsych.timelineVariable('load')
        },
        post_trial_gap: 1000,
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
          var lasttrialdata = jsPsych.data.getLastTrialData();
          var respObj = {
            correct: lasttrialdata.trials[0].correct,
            rt : lasttrialdata.trials[0].rt,
            flanker_type: lasttrialdata.trials[0].flanker_type,
            load : lasttrialdata.trials[0].load
          }
          if(respObj.correct == true) respArr.push(respObj)
        }
      };
  
      /*var test = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['f', 'j'],
        trial_duration: 200,
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response')
        },
        post_trial_gap: 1500,
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
        }
      };*/
  
  var test_procedure = {
        timeline: [fixation,display,test],
        timeline_variables: blocks[i],
        repetitions: 1,
      };
  
  timeline.push(test_procedure);
  
    var rest_block = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div class = centerbox><p class = block-text>Most tarts egy rövid szünetet! Nyomj meg egy gombot a folytatáshoz.</p></div>',
      trial_duration: 180000,
      data: {
        trial_id: "rest block"
      },
      post_trial_gap: 1000
      };
    timeline.push(rest_block);
}

for (i = 0; i < practice.length; i++) {
    var prac_fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div>' + fixation + '</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
        data: {
          task: 'fixation'
        }
      };
  
      var prac_display = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: "NO_KEYS",
        trial_duration: 100
      };
  
      var pratice = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: ['f', 'j'],
        trial_duration: null,
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response'),
          flanker_type: jsPsych.timelineVariable('flanker_type'),
          load: jsPsych.timelineVariable('load')
        },
        post_trial_gap: 1000,
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
          data.rt = jsPsych.data.getLastTrialData().trials[0].rt;
        }
      };
  
    var feedback = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        var last_trial_correct = jsPsych.data.getLastTrialData().trials[0].correct 
        var last_trial_rt = jsPsych.data.getLastTrialData().trials[0].rt
          if(last_trial_rt>1000 && last_trial_correct) {
              return "<p style={font-size: 1.4rem;}>Lassú válasz!</p> <p style={font-size: 1.4rem; color:green;}>Helyes válasz!</p>";
            }
          else if(last_trial_rt>1000){
            return "<p style={font-size: 1.4rem;}>Lassú válasz!</p> <p style={font-size: 1.4rem; color:red;}>Rossz válasz</p>"; // the parameter value has to be returned from the function
          }  
          else if(last_trial_correct){
            return "<p style={font-size: 1.4rem; color:green;}>Helyes válasz!!</p>"; // the parameter value has to be returned from the function
          } else {
            return "<p style={font-size: 1.4rem; color:red;}>Rossz válasz.</p>"; // the parameter value has to be returned from the function
          }
        },
      trial_duration: 1000,
      post_trial_gap: 500,
    }
    var pratice_procedure = {
        timeline: [prac_fixation, prac_display, pratice, feedback],
        timeline_variables: blocks[i],
        repetitions: 1,
      };
  
    timeline.push(pratice_procedure);
  
    var end_block = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div class = centerbox><p class = block-text>Most következik a kísérleti rész. A továbbiakban már nem fogsz visszajelzést kapni a válaszaidról</p><p>Nyomj meg egy gombot a folytatáshoz.</p></div>',
      trial_duration: 180000,
      data: {
        trial_id: "end block"
      },
      post_trial_gap: 1000
      };
  
    timeline.push(end_block);
    }

     /*var test = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['f', 'j'],
        trial_duration: 200,
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response')
        },
        post_trial_gap: 1500,
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
        }
      };*/