define(['config', 'map/mapgenerator', 'player','bomb'], function (Config, MapGenerator, Player, Bomb) {
	var frames = 1;

	var Bomberman = Class.extend({
		map: null,
		sprite: null,
		player: null,
		bombs: null,
		bombPositions: null,

		init: function() {
			this.sprite = content.get('sprites');
			this.map = new MapGenerator(this.sprite);
			this.map.reset();
			this.bombs = [];
			this.bombPositions = [];
			frames = 1;

			this.player = new Player(this.sprite, 'white');
			this.player.setPostion(26, 14);
			this.player.setDrawMode('bottom');
		},

		update: function(input) {
			var playerRect = this.player.getRect(),
			centerX = playerRect.x + Math.floor(playerRect.w / 2) - 2,
			centerY = playerRect.y + ((playerRect.h - Config.constants.MAP_TILE_HEIGHT)) / 2 + 16;
			if (input.pressed("space")) {
				var newPos = this.map.getPosition(centerX, centerY);
				this.addBomb(newPos.x, newPos.y, newPos.i, newPos.j);
				this.player.overBomb = true;
			}

			if (this.player.isMoving) {
				playerRect.x += this.player.direction.x * this.player.speed;
				playerRect.y += (playerRect.h - Config.constants.MAP_TILE_HEIGHT) + 8 + this.player.direction.y * this.player.speed;
				playerRect.w = this.player.direction.y ? 10 : playerRect.w;
				playerRect.h -= (playerRect.h - Config.constants.MAP_TILE_HEIGHT) + 8;

				if (this.map.intersects(playerRect)) {
					this.player.isMoving = false;
				}
				
				var pos = this.map.getPosition(centerX, centerY);
				if (this.player.overBomb) {
					this.player.overBomb = false;
					for (var i = 0; i < this.bombPositions.length; i++) {
						var rect = this.map.board[this.bombPositions[i].i][this.bombPositions[i].j].getRect();
						if (playerRect.x < rect.x + Config.constants.MAP_TILE_WIDTH && 
							rect.x < playerRect.x + playerRect.w &&
							playerRect.y < rect.y + Config.constants.MAP_TILE_HEIGHT &&
							rect.y < playerRect.y + playerRect.h) { 
							this.player.overBomb = true;
							break;
					}
					
				}
			}
			else {
				for (var i = 0; i < this.bombs.length; i++) {
					var b = this.bombs[i];
					if (playerRect.x < b.x + Config.constants.MAP_TILE_WIDTH && 
						b.x < playerRect.x + playerRect.w &&
						playerRect.y < b.y + Config.constants.MAP_TILE_HEIGHT &&
						b.y < playerRect.y + playerRect.h) { 
						this.player.isMoving = false;
				}
			}
		}
	}

	this.player.tick();
	for (var i = 0; i < this.bombs.length; i++) {
		this.bombs[i].tick();
	}

	if (input.down('right')) {
		this.player.setDrawMode('right');
		this.player.direction = { x: 1, y: 0};
		this.player.isMoving = true;
	}
	else if (input.down('left')) {
		this.player.setDrawMode('left');
		this.player.direction = { x: -1, y: 0};
		this.player.isMoving = true;
	}
	else if (input.down('top')) {
		this.player.setDrawMode('top');
		this.player.direction = { x: 0, y: -1};
		this.player.isMoving = true;
	}
	else if (input.down('bottom')) {
		this.player.setDrawMode('bottom');
		this.player.direction = { x: 0, y: 1}
		this.player.isMoving = true;
	}
	else {
		this.player.isMoving = false;
	}
},

draw: function (ctx) {
	this.map.draw(ctx);
	for (var i = 0; i < this.bombs.length; i++) {
		this.bombs[i].draw(ctx);
	}
	this.player.draw(ctx);
},

addBomb: function(x, y, i, j) {
	this.bombs.push(new Bomb(this.sprite, x, y));
	this.bombPositions.push({i: i, j: j});
}

});

return Bomberman;
});