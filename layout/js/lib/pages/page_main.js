	//Main Page
	var Page_Body = function(args) {
		Page.apply(this, arguments);
	
		$.extend(this.settings, args);

		var _ = this;

		this.Events.addObserver_Click(this);
	
		//Build Page Elements
		var search = new Search_SearchBar({title : "Search Bar" }, $('.main_search'));
			this.Events.addObserver_KeyUp(search);
			this.Events.addObserver_Click(search);

		this.handleEvent = function(e) {
			switch (e.type) {
				case 'click':
					this.e_Click(e);
			}
		};

		this.e_Click = function (e) {
		}

	};
		Page_Body.prototype = Object.create(Page.prototype);
		Page_Body.prototype.constructor = Page_Body;