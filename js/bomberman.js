define(['config', 'map/mapgenerator', 'player', 'bomb', 'explosion'], function (Config, MapGenerator, Player, Bomb, Explosion) {
	var frames = 1;

	var Bomberman = Class.extend({
		map: null,
		sprite: null,
		player: null,
		bombs: null,
		bombPositions: null,
		explosions: null,

		init: function() {
			this.sprite = content.get('sprites');
			this.map = new MapGenerator(this.sprite);
			this.map.reset();
			this.bombs = [];
			this.bombPositions = [];
			this.explosions = [];
			frames = 1;

			this.player = new Player(this.sprite, 'red');
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
				playerRect.h -= (playerRect.h - Config.constants.MAP_TILE_HEIGHT) + 6;

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
		if (this.bombs[i].shouldExplode()){
			var b = this.bombs.splice(i, 1)[0];
			i--;

			var p = this.map.getPosition(b.x + 8, b.y + 8);
			var playerBombSize = this.player.bombSize;
			var bombSize = { 
				top: 0,
				right: 0,
				left: 0,
				bottom: 0
			};
			var softBlocksPositions = [];
			var top = right = left = bottom = true;
			for (var k = 1; k < playerBombSize; k++) {
				if (left) {
					if (p.j - k > 0) {
						if (this.map.board[p.i][p.j - k].isSolid()) {
							left = false;
						}
						else if (this.map.board[p.i][p.j - k].isSoftBlock()) {
							left = false;
							bombSize.left++;
							softBlocksPositions.push({i: p.i, j: p.j - k});
						}
						else {
							bombSize.left++;
						}
					}
				}

				if (right) {
					if (p.j + k < this.map.cols) {
						if (this.map.board[p.i][p.j + k].isSolid()) {
							right = false;
						}
						else if (this.map.board[p.i][p.j + k].isSoftBlock()) {
							right = false;
							bombSize.right++;
							softBlocksPositions.push({i: p.i, j: p.j + k});
						}
						else {
							bombSize.right++;
						}
					}
				}

				if (top) {
					if (p.i - k > 0) {
						if (this.map.board[p.i - k][p.j].isSolid()) {
							top = false;
						}
						else if (this.map.board[p.i - k][p.j].isSoftBlock()) {
							top = false;
							bombSize.top++;
							softBlocksPositions.push({i: p.i - k, j: p.j});
						}
						else {
							bombSize.top++;
						}
					}
				}

				if (bottom) {
					if (p.i + k < this.map.cols) {
						if (this.map.board[p.i + k][p.j].isSolid()) {
							bottom = false;
						}
						else if (this.map.board[p.i + k][p.j].isSoftBlock()) {
							bottom = false;
							bombSize.bottom++;
							softBlocksPositions.push({i: p.i + k, j: p.j});
						}
						else {
							bombSize.bottom++;
						}
					}
				}
			}

			this.explosions.push(new Explosion(this.sprite, b.x, b.y, bombSize, softBlocksPositions));
		}
	}

	for (var i = 0; i < this.explosions.length; i++) {
		this.explosions[i].tick();
		if (this.explosions[i].finished) {
			var b = this.explosions.splice(i, 1)[0];
			i--;
			var p = b.softBlocksPositions
			var tileType = 'GRASS';
			for (var i = 0; i < p.length; i++) {
				this.map.board[p[i].i][p[i].j].setTileType(tileType);
			}
		}
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

	for (var i = 0; i < this.explosions.length; i++) {
		this.explosions[i].draw(ctx);
	}
},

addBomb: function(x, y, i, j) {
	this.bombs.push(new Bomb(this.sprite, x, y));
	this.bombPositions.push({i: i, j: j});
}

});

return Bomberman;

});