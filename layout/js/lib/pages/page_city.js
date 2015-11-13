	//Main Page
	var Page_City = function(args) {
		Page.apply(this, arguments);
	
		$.extend(this.settings, args);

		var _ = this;

		this.Events.addObserver_Click(this);
	
		//Build Page Elements
		this.init = function (cityID) {
			
		}

		this.handleEvent = function(e) {
			switch (e.type) {
				case 'click':
					this.e_Click(e);
			}
		};

		this.e_Click = function (e) {

		}

		return {
			init : this.init(id)
		};
	};
		Page_City.prototype = Object.create(Page.prototype);
		Page_City.prototype.constructor = Page_City;