define(["config", "map/maptile", 'bomb'], function(Config, MapTile, Bomb) {
	var MapGenerator = Class.extend({
		rows: null,
		cols: null,
		width: null,
		height: null,
		board: null,
		image: null,
		bombs: null,

		init: function(image) {
			this.image = image;
			this.rows = Config.settings.mapCols;
			this.cols = Config.settings.mapRows;
			this.width = canvas.width;
			this.height = canvas.height;
		},

		reset: function() {
			this.board = [];
			for (var i = 0; i < this.rows; i++) {
				this.board[i] = [];
				for (var j = 0; j < this.cols; j++) {
					if (i == 0 || j == 0 || i == this.rows - 1 || j == this.cols - 1) {
						this.board[i][j] = new MapTile(this.image, MapTile.SOLID, i, j);
					}
					else if (i % 2 == 0 && j % 2 == 0) {
						this.board[i][j] = new MapTile(this.image, MapTile.SOLID, i, j);
					}
					else {
						if ((i == 1 && j == 1 || i == 2 && j == 1 || i == 1 && j == 2) ||
							(i == 1 && j == this.cols - 2 || i == 2 && j == this.cols - 2 || i == 1 && j == this.cols - 3) ||
							(i == this.rows - 2 && j == this.cols - 2 || i == this.rows - 3 && j == this.cols - 2 || i == this.rows - 2 && j == this.cols - 3) ||
							(i == this.rows - 2 && j == 1 || i == this.rows - 3 && j == 1 || i == this.rows - 2 && j == 2)) {
							if (i - 1 >= 0 && this.board[i - 1][j].tileType == MapTile.SOLID) {
								this.board[i][j] = new MapTile(this.image, MapTile.SHADOWED_GRASS, i, j);
							}
							else {
								this.board[i][j] = new MapTile(this.image, MapTile.GRASS, i, j);
							}
						}
						else {
							if (Math.random() > 0.8) {
								if (i - 1 >= 0 && this.board[i - 1][j].tileType == MapTile.SOLID) {
									this.board[i][j] = new MapTile(this.image, MapTile.SHADOWED_GRASS, i, j);
								}
								else {
									this.board[i][j] = new MapTile(this.image, MapTile.GRASS, i, j);
								}
							}
							else {
								this.board[i][j] = new MapTile(this.image, MapTile.BLOCK, i, j);
							}
						}
					}
				}
			}
		},

		draw: function(ctx) {
			for (var i = 0; i < this.rows; i++) {
				for (var j = 0; j < this.cols; j++) {
					this.board[i][j].draw(ctx);
				}
			}
		},

		intersects: function(rect) {
			var tileRect = null; 
			for (var i = 0; i < this.rows; i++) {
				for (var j = 0; j < this.cols; j++) {
					tileRect = this.board[i][j].getRect();
					if (this.board[i][j].tileType == MapTile.SOLID || this.board[i][j].tileType == MapTile.BLOCK) {
						if (rect.x < tileRect.x + tileRect.w && 
							tileRect.x < rect.x + rect.w &&
							rect.y < tileRect.y + tileRect.h &&
							tileRect.y < rect.y + rect.h) {
							return true;
						}
					}
				}
			}

			return false;
		},

		getPosition: function(x, y) {
			for (var i = 0; i < this.rows; i++) {
				for (var j = 0; j < this.cols; j++) {
					tileRect = this.board[i][j].getRect();
					if (x >= tileRect.x && x <= tileRect.x + tileRect.w && y >= tileRect.y && y <= tileRect.y + tileRect.h)
					{
						return { x: tileRect.x, y: tileRect.y, i: i, j: j };
					}
				}
			}

			return null;
		}
	});

return MapGenerator;
});