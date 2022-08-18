function show_current_page() {
    if (trial.show_clickable_nav) {

      var nav_html = "<div class='jspsych-instructions-nav'>";
      if (trial.pages.length == 0) {
        nav_html += "<button id='jspsych-instructions-next'>Következő</button>"
      } else {
        if (trial.data.trial_id == 'instruction') {
          nav_html += "<button id='jspsych-instructions-next'>Következő</button>"
        }
         else if (trial.data.trial_id == 'instruction_2' || trial.data.trial_id == 'instruction_3') {
          if (trial.allow_backward) {
            nav_html += "<button id='jspsych-instructions-back'>Előző</button>";
          }
          nav_html += "<button id='jspsych-instructions-next'>Következő</button>"
        } else if (trial.data.trial_id == 'instruction_4' ) {
          if (trial.allow_backward) {
            nav_html += "<button id='jspsych-instructions-back'>Előző</button>";
          }
          nav_html += "<button id='jspsych-instructions-next'>Instrukciók befejezése</button>"
        }
      }


      var instructions_block = {
        type: 'poldrack-instructions',
        pages: [
            '<div class = centerbox><p class = block-text>Ebben a kísérletben öt nyilat fogsz egymás mellett látni, amelyek jobbra vagy balra mutatnak (pl. &larr; &larr; &larr; &larr; &larr;, vagy &mdash; &mdash; &rarr; &mdash; &mdash;) és a képernyő tetején vagy alján jelenhetnek meg.</p></div>'
        ],
        allow_keys: false,
        allow_backward:true,
        data: {
            trial_id: 'instruction'
        },
        show_clickable_nav: true,
        timing_post_trial: 1000
    };
    
    var instructions_block_2 = {
        type: 'poldrack-instructions',
        pages: [
            '<div class = centerbox><p class = block-text>A feladatod jelezni, hogy a középen lévő nyíl melyik irányba mutat az ennek megefelelő irányú gombok lenyomásával.</p></div>',
        ],
        allow_keys: false,
        allow_backward:true,
        data: {
            trial_id: 'instruction_2'
        },
        show_clickable_nav: true,
        timing_post_trial: 1000
    };
    
    var instructions_block_3 = {
        type: 'poldrack-instructions',
        pages: [
            '<div class = centerbox><p class = block-text> A nyilak megjelenése előtt egy * tűnhet fel a képernyő egyes pontjain.</p><p class = block-text>A * megjelenésétől függetlenül, próbálj meg mindig a lehető leggyorsabban és legpontosabban válaszolni!</p></div>'
        ],
        allow_keys: false,
        allow_backward:true,
        data: {
            trial_id: 'instruction_3'
        },
        show_clickable_nav: true,
        timing_post_trial: 1000
    };
    
    var instructions_block_4 = {
        type: 'poldrack-instructions',
        pages: [
            '<div class = centerbox><p class = block-text>Az instrukciók befejezését követően néhány próba feladat fog következni. A próbák során visszajelzést fogsz kapni a válaszaid helyességéről. A kísérlet ezt követő részében már nem fogsz ilyen visszajezést kapni.</p></div>'
        ],
        allow_keys: false,
        allow_backward:true,
        data: {
            trial_id: 'instruction_4'
        },
        show_clickable_nav: true,
        timing_post_trial: 1000
    };

    text: '<div class = centerbox><p class = center-block-text>Köszönöm, hogy teljesítetted a feladatot!</p><p class = center-block-text>A befejezéshez kattints a linkre.</p><p class = center-block-text> <a style="text-align:center;" href="https://esportmetrics.hu/kiserletek.html" >esportmetrics.hu/kiserletek</a></p></div>',


    var check_consent = function(elem) {
      if ($('#consent_checkbox').is(':checked')){
        $.each($('#myForm').serializeArray(), function(i, field) {
        myvalues[field.name] = field.value;
        });
      $.each($('#myForm_2').serializeArray(), function(i, field) {
        myvalues[field.name] = field.value;
          });
      $.each($('#myForm_3').serializeArray(), function(i, field) {
        myvalues[field.name] = field.value;
          });
      if (document.getElementById("csForm").style.display === "") {
        $.each($('#csForm').serializeArray(), function(i, field) {
          myvalues[field.name] = field.value;
            });
      }
      else if (document.getElementById("lolForm").style.display === "") {
        $.each($('#lolForm').serializeArray(), function(i, field) {
          myvalues[field.name] = field.value;
            });
      }
      else if (document.getElementById("fifaForm").style.display === "") {
        $.each($('#fifaForm').serializeArray(), function(i, field) {
          myvalues[field.name] = field.value;
            });
      }
      else if (document.getElementById("owForm").style.display === "") {
        $.each($('#owForm').serializeArray(), function(i, field) {
          myvalues[field.name] = field.value;
            });
      }
      else if (document.getElementById("scForm").style.display === "") {
        $.each($('#scForm').serializeArray(), function(i, field) {
          myvalues[field.name] = field.value;
            });
      }
        return true;
      }
      else {
        alert("Ahhoz, hogy a kísérlet elindulhasson kérlek tölts ki minden szükséges mezőt");
        return false;
      }
      return false;
    };