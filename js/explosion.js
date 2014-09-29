define(["config"], function(Config) {
	var spriteData = [{sx: 185, sy: 290, sw: 16, sh: 16}, 
	{sx: 266, sy: 290, sw: 16, sh: 16}, 
	{sx: 349, sy: 290, sw: 16, sh: 16}, 
	{sx: 434, sy: 290, sw: 17, sh: 16}, 
	{sx: 518, sy: 290, sw: 17, sh: 16},
	{sx: 434, sy: 290, sw: 17, sh: 16}, 
	{sx: 349, sy: 290, sw: 16, sh: 16},
	{sx: 266, sy: 290, sw: 16, sh: 16},
	{sx: 185, sy: 290, sw: 16, sh: 16}];

	var Explosion = Class.extend({
		image: null,
		x: null,
		y: null,
		size: null,
		currentFrame: null,
		frames: null,
		finished: null,
		softBlocksPositions: null,

		init: function(image, x, y, size, softBlocksPositions) {
			this.image = image;
			this.x = x;
			this.y = y;
			this.size = size;
			this.currentFrame = 0;
			this.frames = 0;
			this.finished = false;
			this.softBlocksPositions = softBlocksPositions;
		},

		tick: function() {
			if (!this.finished) {
				this.frames = ++this.frames % 4;
				if (this.frames == 0) {
					this.currentFrame += 1;
				}

				this.finished = (this.currentFrame == spriteData.length);
			}
		},

		draw: function(ctx) {
			if (!this.finished) {
				var cur = spriteData[this.currentFrame];
				ctx.drawImage(this.image, cur.sx, cur.sy, cur.sw, cur.sh, this.x, this.y, cur.sw, cur.sh);

				for (var i = 0; i < this.size.left - 1; i++) {
					ctx.drawImage(this.image, cur.sx - cur.sw, cur.sy, cur.sw, cur.sh, this.x - cur.sw * i, this.y, cur.sw, cur.sh);
				}
				if (this.size.left > 0) 
					ctx.drawImage(this.image, cur.sx - cur.sw * 2, cur.sy, cur.sw, cur.sh, this.x - cur.sw * this.size.left, this.y, cur.sw, cur.sh);

				for (var i = 0; i < this.size.right - 1; i++) {
					ctx.drawImage(this.image, cur.sx + cur.sw, cur.sy, cur.sw, cur.sh, this.x + cur.sw * i, this.y, cur.sw, cur.sh);
				}
				if (this.size.right > 0) 
					ctx.drawImage(this.image, cur.sx + cur.sw * 2, cur.sy, cur.sw, cur.sh, this.x + cur.sw * this.size.right, this.y, cur.sw, cur.sh);

				for (var i = 0; i < this.size.top - 1; i++) {
					ctx.drawImage(this.image, cur.sx, cur.sy - cur.sh, cur.sw, cur.sh, this.x, this.y - cur.sh * i, cur.sw, cur.sh);
				}
				if (this.size.top > 0) 
					ctx.drawImage(this.image, cur.sx, cur.sy - cur.sh * 2, cur.sw, cur.sh, this.x, this.y - cur.sh * this.size.top, cur.sw, cur.sh);

				for (var i = 0; i < this.size.bottom - 1; i++) {
					ctx.drawImage(this.image, cur.sx, cur.sy + cur.sh, cur.sw, cur.sh, this.x, this.y + cur.sh * i, cur.sw, cur.sh);
				}
				if (this.size.bottom > 0) 
					ctx.drawImage(this.image, cur.sx, cur.sy + cur.sh * 2, cur.sw, cur.sh, this.x, this.y + cur.sh * this.size.bottom, cur.sw, cur.sh);
			}
		}
	});

return Explosion;
});