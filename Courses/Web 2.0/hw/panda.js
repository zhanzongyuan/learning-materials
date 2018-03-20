(function(){ 
	$(function(){ new Pane(); }); 
	var Pane = function (){ 
		this.createTiles(); 
		this.listenTilesClicks(); 
		this.listenButtonClick(); 
	} 
	var p = Pane.prototype;
	p.createTiles = function(){ 
		var that = this; 
		this.tiles = []; 
		$('#puzzle-pane div').each(function(i){ 
			that.tiles.push(new Tile(this, i)); }); 
		this.tiles[15] = this.blank = new Tile(null, 15); 
	} 
	p.listenTilesClicks = function(){ 
		$('#puzzle-pane').click(function(event){ 
			var tile = event.target._tile; 
			if(tile && tile.canMove(this.blank)){ 
				tile.move(this.blank); 
				if (!this.isInShuffle) this.checkResult(); 
			} 
		}.bind(this)); 
	} 
	p.checkResult = function(){ 
		if (this.isSuccess()) alert('You win!'); 
	} 
	p.isSuccess = function(){ 
		for (var i = 0; i < this.tiles.length; i++){ 
			if (!this.tiles[i].isInRightPlace()) return false; 
		} 
		return true; 
	} 
	p.listenButtonClick = function(){ 
		$('button').click(function(){ 
			this.shuffle(); }.bind(this)); 
	} 
	p.shuffleTimes = 1000; 
	p.shuffle = function(){ 
		this.isInShuffle = true; 
		for(var i = 0; i < this.shuffleTimes; i++){ 
			$(this.tiles[Math.floor(Math.random() * 16)].dom).click(); 
		} 
		this.isInShuffle = false; 
	} 
	var Tile = function(dom, seq){ 
		this.dom = dom; this.seq = seq; 
		this.setPosition(); 
		if (dom) { 
			this.dom._tile = this; 
			this.setBackground(); 
			this.updatePlace(); 
		} 
	} 
	p = Tile.prototype; 
	p.setPosition = function(){ 
		this.row = Math.floor(this.seq / 4); 
		this.column = this.seq % 4; 
	} 
	p.width = p.height = 88; 
	p.getPlace = function(){ 
		return { top: this.row * this.height, left: this.column * this.width } 
	} 
	p.setBackground = function(){ 
		var place = this.getPlace(); 
		$(this.dom).css('background-position', -place.left + 'px ' + -place.top + 'px' ); 
	} 
	p.updatePlace = function(){ 
		var place = this.getPlace(); 
		$(this.dom).css('left', place.left); 
		$(this.dom).css('top', place.top); 
	} 
	p.canMove = function(blank){ 
		return (this.row == blank.row && Math.abs(this.column - blank.column) == 1) ||    
			(this.column == blank.column && Math.abs(this.row - blank.row) == 1) 
	} 
	p.move = function(blank){ 
		this.swampAttr(blank, 'row'); 
		this.swampAttr(blank, 'column'); 
		this.updatePlace(); 
		blank.updatePlace(); 
	} 
	p.swampAttr = function(other, attr){ 
		var temp = other[attr]; 
		other[attr] = this[attr]; 
		this[attr] = temp; 
	} 
	p.isInRightPlace = function(){ 
		return this.seq == this.row * 4 + this.column; 
	}
})();	