var Game = {
	timer : null,
	counter: 10,

	setTimer: function(){
		var self = this;
		this.timer = setInterval(function(){
			console.log(this);
			this.counter --;
			if (counter <= 0){
				// clear timer
			}
		}, 1000).bind(this); // doesn't bind
	}
}
