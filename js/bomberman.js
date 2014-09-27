define(['config', 'map/mapgenerator', 'player'], function (Config, MapGenerator, Player) {
	var frames = 1;

	var Bomberman = Class.extend({
		map: null,
		sprite: null,
		player: null,

		init: function() {
			this.sprite = content.get('sprites');
			this.map = new MapGenerator(this.sprite);
			this.map.reset();

			frames = 1;

			this.player = new Player(this.sprite, 'white');
			this.player.setPostion(26, 16);
			this.player.setDrawMode('bottom');
		},

		update: function(input) {
			if (input.down('right')) {
				this.player.setDrawMode('right');
				this.player.velocity = { x: this.player.speed, y: 0};
			}
			else if (input.down('left')) {
				this.player.setDrawMode('left');
				this.player.velocity = { x: -1 * this.player.speed, y: 0};
			}
			else if (input.down('top')) {
				this.player.setDrawMode('top');
				this.player.velocity = { x: 0, y: -1 * this.player.speed};
			}
			else if (input.down('bottom')) {
				this.player.setDrawMode('bottom');
				this.player.velocity = { x: 0, y: this.player.speed}
			}
			else {
				this.player.velocity = false;
			}

			var playerRect = this.player.getRect();
			playerRect.x += (this.player.velocity ? this.player.velocity.x : 0) + Config.constants.PADDING;
			playerRect.y += (this.player.velocity ? this.player.velocity.y : 0) + (playerRect.h - Config.constants.MAP_TILE_HEIGHT) + Config.constants.PADDING;
			playerRect.h = Math.min(playerRect.h, Config.constants.MAP_TILE_HEIGHT) - Config.constants.PADDING;
			playerRect.w -= Config.constants.PADDING;
			if (this.map.intersects(playerRect)) {
				this.player.velocity = false
			}

			this.player.tick(input);
		},

		draw: function (ctx) {
			this.map.draw(ctx);
			this.player.draw(ctx);
		}

	});

return Bomberman;
});