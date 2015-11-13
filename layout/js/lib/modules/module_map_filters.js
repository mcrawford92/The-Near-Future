//Map Filters

var Map_Filters = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	var $form = $('.filters_form');
	var $formLi = $('.filters_form>ul>li');

	this.handleEvent = function(e, x) {
		switch (e.type) {
			case "mouseenter":
				_.animateFilterControlMouseEnter(e, x);
				break;
			case "mouseleave":
				_.animateFilterControlMouseLeave(e, x);
				break;
			case "click":
				_.animateFilterClick(e);
				break;
		}
	};

	this.animateFilterControlMouseEnter = function(e, x) {
		var $li = $formLi.eq(x + 1);
		//TweenLite.to($li, .2, ({"height" : "100%", "top" : "-100%", ease : Power2.easeOut}));
	};

	this.animateFilterControlMouseLeave = function (e, x) {
		var $li = $formLi.eq(x + 1);
	};

	this.animateFilterClick = function (e) {
		//find target DOM and store it
		var t = e.target;

		//I have a SPAN inner element for the dotted line...
		//just wanna check that this is the correct element
		if (t.nodeName == "SPAN") {
			t = t.parentElement;
		}

		//get the index from another function
		var t_index = this.findFilterLiPosition(t);

		//if it's valid then animate that shit
		if (t_index) {
			if ($formLi.eq(t_index).hasClass("open")) {
				_.animateOutro($formLi[t_index]);
			}
			else {
				_.animateIntro($formLi[t_index]);
			}
		}
	};

	this.animateIntro = function ($li) {
		TweenLite.to($li, .5, ({"height" : "100%", "top" : "-100%"}));
		$($li).addClass("open");
	};

	this.animateOutro = function ($li) {
		TweenLite.to($li, .5, ({"height" : "10%", "top" : "-10%"}));
		$($li).removeClass("open");
	};

	//for when the city is taking over
	//time to get out the way and off the map
	this.animateHide = function () {
		TweenLite.to($el[0], .5, ({"height" : "0", "top" : "50%"}));
		TweenLite.to($form[0], .5, ({"height" : "0", "top" : "50%"}));
	};

	this.findFilterLiPosition = function (t) {
		//I need to find the selected li's index
		//so I can change the form hidden behind it
		var $li = $(t.parentElement);

		var numOfFilters = $li[0].parentElement.childElementCount;
		var selectedIndex = 0;

		//search through the li in the DOM and find it's index
		//a little inefficient.. there's probably a better way
		for (var x = 0; x < numOfFilters; x++) {
			if ($li[0]==$li[0].parentElement.children[x]) {
				selectedIndex = x;
			}
		}

		if (selectedIndex == 0) {
			selectedIndex = null;
		}
		else if (!$($li[0].parentElement.parentElement).hasClass("map_filters")) {
			selectedIndex = null;
		}
		return selectedIndex;
	};

	return this;
};

	Map_Filters.prototype = Object.create(Module.prototype);
	Map_Filters.prototype.constructor = Map_Filters;