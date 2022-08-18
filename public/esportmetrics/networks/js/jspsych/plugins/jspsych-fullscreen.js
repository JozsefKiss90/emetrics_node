jsPsych.plugins['fullscreen'] = (function(){

  var plugin = {};

  plugin.info = {
    name: 'fullscreen',
    parameters: {
      fullscreen_mode: {
        type: Boolean,
        pretty_name: 'Fullscreen mode',
        default: true,
        array: false,
        description: 'If true, experiment will enter fullscreen mode. If false, the browser will exit fullscreen mode.'
      },
      message: {
        type: String,
        pretty_name: 'Message',
        default: '<p>The experiment will switch to full screen mode when you press the button below</p>',
        array: false,
        description: 'HTML content to display above the button to enter fullscreen mode.'
      },
      button_label: {
        type: String,
        pretty_name: 'Button label',
        default:  'Kísérlet indítása',
        array: false,
        description: 'The text that appears on the button to enter fullscreen.'
      },
    }
  }

  plugin.trial = function(display_element, trial){
  
    trial.fullscreen_mode = true; 
    trial.message = '<div class = jspsych-instructions-nav><p>A kísérlet teljes képernyős módban fog futni, amint az alábbi gombra kattintasz.</p></div>'
    trial.button_label = 'Kísérlet indításssa'


    if(trial.fullscreen_mode) {
      display_element[0].innerHTML = trial.message + '<button id="jspsych-fullscreen-btn" class="jspsych-btn center-btn">'+trial.button_label+'</button>'
      console.log(display_element[0].children[1])
      display_element[0].children[1].addEventListener('click', function(event) {
        event.preventDefault()
        var element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        jsPsych.finishTrial();
    })
  }
  }

  return plugin;

})();