	//Map Page Object
	var Map = function (args) {
		Module.apply(this, arguments);

		var settings = {};

		$.extend(this.settings, settings);
	
		var $el = this.$el;
		var _ = this;

		this.style = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#999999"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

  		this.init = function () {
  			console.log("init");
  			this.map = new google.maps.Map($el[0], {
  		  			center: {lat: 37.19, lng: -93.28},
  		  			zoom: 4,
  		  			scrollwheel : false,
  		  			disableDefaultUI: true,
  		  			styles : this.style
  				});
  		};

  		this.allowScrollwheel = function () {
  			this.map.setOptions ({scrollwheel: true});
  		};

      //Zoom into specific City for city page
      this.cityZoom = function (id) {
        console.log("I'm zooming into this city.");
      };

      this.animateFullHeight = function () {
        TweenLite.to($el, .5, { "height" : "100%"});
      };

  		return this;
	};

		Map.prototype = Object.create(Module.prototype);
		Map.prototype.constructor = Map;