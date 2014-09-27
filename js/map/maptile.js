define(["config"], function(Config) {
	var sy = 175;
	var TileDefinitions = {
		SOLID: {
			sx: 71,
		},
		BLOCK: {
			sx: 88,
		},
		SHADOWED_GRASS: {
			sx: 105,
		},
		GRASS: {
			sx: 122,
		}
	};

	var MapTile = Class.extend({
		image: null,
		row: null,
		col: null,
		tileType: null,
		image: null,

		init: function(image, tileType, row, col) {
			this.image = image;
			this.row = row;
			this.col = col;
			this.xOffset = Config.settings.mapXOffset;
			this.yOffset = Config.settings.mapYOffset;
			this.tileType = tileType;
		},

		setTileType: function(tileType) {
			this.tileType = tileType;
		},

		draw: function(ctx) {
			ctx.drawImage(this.image, 
				TileDefinitions[this.tileType].sx,
				sy,
				Config.constants.MAP_TILE_WIDTH,
				Config.constants.MAP_TILE_HEIGHT,
				Config.settings.mapXOffset + (this.col * Config.constants.MAP_TILE_WIDTH),
				Config.settings.mapYOffset + (this.row * Config.constants.MAP_TILE_HEIGHT),
				Config.constants.MAP_TILE_WIDTH,
				Config.constants.MAP_TILE_HEIGHT);
		},

		getRect: function() {
			return {
				x: Config.settings.mapXOffset + (this.col * Config.constants.MAP_TILE_WIDTH),
				y: Config.settings.mapYOffset + (this.row * Config.constants.MAP_TILE_HEIGHT),
				w: Config.constants.MAP_TILE_WIDTH,
				h: Config.constants.MAP_TILE_HEIGHT
			}
		}
	});


	for (t in TileDefinitions) { MapTile[t] = t; }


		return MapTile;
});