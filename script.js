timeinterval = null
timeout = null


function signed_pow(n, e) {
	if(n == 0) {
		return n
	}
	return n/Math.abs(n)*(Math.pow(Math.abs(n), e))
}

function roll() {
	var work = document.getElementById("work").value
	if(!$.isNumeric(work)) {
		work = 5
	}
	else {
		work = parseFloat(work)
	}
	var rest = document.getElementById("rest").value
	if(!$.isNumeric(rest)) {
		rest = 3
	}
	else {
		rest = parseFloat(rest)
	}
	var time = document.getElementById("time").value
	if(!$.isNumeric(time)) {
		time = 15
	}
	else {
		time = parseFloat(time)
	}
	var ratio = work / rest
	var work_base = 8 * time * ratio / (7*ratio + 5)
	var rest_base = work_base / ratio
	var tile_src = ["rest-red.jpg", "work-green.jpg", "work-blue.jpg", "work-blue.jpg", "work-blue.jpg", "rest-purple.jpg", "rest-purple.jpg", "rest-purple.jpg"]
	var roulette = document.getElementById("roulette");
	var $showcase = $(".showcase");
	var tiles_div = document.getElementById("tiles")
	var tiles = []
	var roll_button = document.getElementById("roll")
	roll_button.innerHTML = "Reset"
	roll_button.style.left = $(window).innerWidth()/2 - $("#roll").outerWidth()/2 + 'px'
	roll_button.onclick = reset

	for (var i = 0; i < 64; i++) {
		tile = document.createElement("IMG");
		tile.id = "tile"
		tile.class = "tile"
		tile.style.zIndex = "-1";
		type = tile_src[Math.floor((Math.random() * 8))];
		tile.setAttribute("type", type.slice(0,-4))
		tile.src = type;
		//tile.style.left = $(window).innerWidth() / 2 - 64 + i * 136 + 'px';
		if (i > 0) tile.style.margin = '8px 0 0 32px';
		else tile.style.margin = '8px 0 0 ' + ($(roulette).innerWidth() / 2 - 64).toString() + 'px';
		tiles.push(tile);
	}

	for (var i = 0; i < tiles.length; i++) {
		tiles_div.appendChild(tiles[i]);
	}
	random_tile = Math.floor(Math.random() * 40 + 20)
	d = random_tile * 160 + Math.floor(Math.random() * 128 - 64)
	move(tiles_div)
		.set('margin-left', -d)
		.duration('3s')
		.ease('in-out')
		.end();
	tile_type = tiles[random_tile].getAttribute("type")
	// alert(tile_type)
	if(tile_type == "rest-red") {
		// alert('red')
		time = rest_base * 2 * (1 + signed_pow(Math.random() - 0.5, 2))
	}
	if(tile_type == "rest-purple") {
		// alert('purple')
		time = rest_base * (1 + signed_pow(Math.random() - 0.5, 2))
	}
	if(tile_type == "work-blue") {
		// alert('blue')
		time = work_base * 2 * (1 + signed_pow(Math.random() - 0.5, 2))
	}
	if(tile_type == "work-green") {
		// alert('green')
		time = work_base * (1 + signed_pow(Math.random() - 0.5, 2))
	}
	window.timeout = setTimeout(function () {
        initializeClock("clockdiv", time)
    }, 3000);
	
}

function reset() {
	if(timeout != null) {
		clearTimeout(timeout);
		timeout = null
	}
	if(timeinterval != null) {
		clearInterval(timeinterval);
		timeinterval = null
	}
  	var clock = document.getElementById("clockdiv");
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	minutesSpan.innerHTML = '0'
	secondsSpan.innerHTML =	'00'
	var tiles_div = document.getElementById("tiles")
	var roll_button = document.getElementById("roll")
	$("#tiles").empty()
	move(tiles_div)
		.set('margin-left', 0)
		.duration('0s')
		.ease('in-out')
		.end();
	roll_button.innerHTML = "Roll"
	roll_button.style.left = $(window).innerWidth()/2 - $("#roll").outerWidth()/2 + 'px'
	roll_button.onclick = roll


}

function place_objects() {
	var ticker = document.getElementById("ticker")
	ticker.style.position = "fixed"
	ticker.style.left = $(window).innerWidth()/2 -16 + 'px'
	ticker.style.zIndex = "2"
	ticker.style.top = '8px'
	var roll = document.getElementById("roll")
	roll.style.position = "fixed"
	roll.style.left = $(window).innerWidth()/2 - $("#roll").outerWidth()/2 + 'px'
	roll.style.top = '160px'
	var roulette = document.getElementById("roulette")
	roulette.style.position = "fixed"
	roulette.style.left = $(window).innerWidth()/2 - $("#roulette").outerWidth()/2 + 'px'
	roulette.style.top = '6px'
	roulette.style.overflow = "hidden"
	var clockdiv = document.getElementById("clockdiv")
	clockdiv.style.position = "fixed"
	clockdiv.style.left = $(window).innerWidth()/2 - $("#clockdiv").outerWidth()/2 + 'px'
	clockdiv.style.top = parseInt(roll.style.top) + $("#roll").outerHeight() + 8 + 'px'
	var settings = document.getElementById("settings")
	settings.style.position = "fixed"
	settings.style.left = $(window).innerWidth()/2 - $("#settings").outerWidth()/2 + 'px'
	settings.style.top = parseInt(clockdiv.style.top) + $("#clockdiv").outerHeight() + 8 + 'px'
	$(".adjust").css("transition", "width 0.15s;")
}



function settings_resize() {
	var settings = document.getElementById("settings")
	var clockdiv = document.getElementById("clockdiv")
	settings.style.position = "fixed"
	settings.style.left = $(window).innerWidth()/2 - $("#settings").outerWidth()/2 + 'px'
	settings.style.top = parseInt(clockdiv.style.top) + $("#clockdiv").outerHeight() + 8 + 'px'
}

$(function() {
    function adjust(elements, offset, min, max) {
        // initialize parameters
        offset = offset || 0;
        min    = min    || 0;
        max    = max    || Infinity;
        elements.each(function() {
            var element = $(this);
            // add element to measure pixel length of text
            var id = btoa(Math.floor(Math.random() * Math.pow(2, 64)));
            var tag = $('<span id="' + id + '">' + element.val() + '</span>').css({
                'display': 'none',
                'font-family': element.css('font-family'),
                'font-size': element.css('font-size'),
            }).appendTo('body');
            // adjust element width on keydown
            function update() {
                // give browser time to add current letter
                setTimeout(function() {
                    // prevent whitespace from being collapsed
                    tag.html(element.val().replace(/ /g, '&nbsp'));
                    // clamp length and prevent text from scrolling
                    var size = Math.max(min, Math.min(max, tag.width() + offset));
                    if (size < max)
                        element.scrollLeft(0);
                    // apply width to element
                    element.width(size);
                    settings_resize();
                }, 0);
            };
            update();
            element.keydown(update);
        });
    }
    // apply to our element
    adjust($('.adjust'), 6, 30, 500);
});


function init() {

	$(window).resize(function() { 
		place_objects();
	});

	place_objects();
}

function format_time(deadline){
	var d = new Date();
	// alert(end)
	var t = Date.parse(deadline) - Date.parse(d);
	// alert(t)
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60));
	return {
		'total': t,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, remaining){
	// alert(remaining)
	var deadline = new Date();
	deadline.setSeconds(deadline.getSeconds() + parseInt(remaining * 60))
  	var clock = document.getElementById(id);
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	function updateClock(){
		var t = format_time(deadline);
		minutesSpan.innerHTML = t.minutes
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if(t.total<=0){
			var audio = new Audio('beltekpar.mp3');
			audio.play();
		 	clearInterval(timeinterval);
		}
	}

	updateClock(); // run function once at first to avoid delay
	window.timeinterval = setInterval(updateClock,1000);
}


// $.fn.textWidth = function(text, font) {
//     if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl =      $('<span>').hide().appendTo(document.body);
//     $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
//     return $.fn.textWidth.fakeEl.width(); 
// };

// $('#work, #rest').on('input', function() {
//     var padding = 10; //Works as a minimum width
//     var valWidth = ($(this).textWidth() + padding) + 'px';
//     $('#'+this.id+'-width').html(valWidth);
//     $('#'+this.id).css('width', valWidth);
// }).trigger('input');
// ;

// initializeClock('clockdiv', deadline);

$(init)
