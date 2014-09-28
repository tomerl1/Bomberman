define(['config'], function(Config, Bomb){

	var bombFrames = [
	{sx: 20, sy: 258, sw: 12, sh: 14}, 
	{sx: 34, sy: 257, sw: 14, sh: 15}, 
	{sx: 50, sy: 255, sw: 16, sh: 17},
	{sx: 34, sy: 257, sw: 14, sh: 15}, 
	];

	var Bomb = Class.extend({
		image: null,
		x: null,
		y: null,
		currentFrame: null,
		frames: null,

		init: function(image, x, y) {
			this.image = image;
			this.x = x;
			this.y = y;
			this.frames = 1;
			this.currentFrame = 0;
		},

		tick: function(){
			if (this.frames < 250 || true) {
				this.frames += 1;
				if (this.frames % 20 == 0) {
					this.currentFrame = ++this.currentFrame % bombFrames.length;
				}
			}
		},

		draw: function(ctx) {
			var data = bombFrames[this.currentFrame], 
			x = this.x + (Config.constants.MAP_TILE_WIDTH - data.sw) / 2,
			y = this.y + (Config.constants.MAP_TILE_HEIGHT - data.sh) / 2 - 1;

			ctx.drawImage(this.image,
				data.sx,
				data.sy,
				data.sw,
				data.sh,
				x,
				y,
				data.sw,
				data.sh);
		}
	});

	return Bomb;
});