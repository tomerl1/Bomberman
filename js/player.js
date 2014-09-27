define(["config"], function(Config) {
	var images = content
	var PlayerDefinitions = {
		WHITE: {
			sy:38,
			w: 16, 
			h: 24, 
			Modes: {
				BOTTOM: [{sx: 53}, {sx: 70}, {sx: 88}, {sx: 70}],
				LEFT: [{sx: 106}, {sx: 124}, {sx: 143}, {sx: 124}],
				RIGHT: [{sx: 161}, {sx: 179}, {sx: 197}, {sx: 179}],
				TOP: [{sx: 219}, {sx: 237}, {sx: 255}, {sx: 237}],
				KICK_BOTTOM: [],
				KICK_LEFT: [],
				KICK_RIGHT: [],
				KICK_TOP: [],
				DEATH: [{sx: 344}, {sx: 361}, {sx: 378}, {sx: 395}]
			}
		},
		BLACK: {
		},
		BLUE: {
		},
		RED: {
		}
	};

	var Player = Class.extend({
		color: null,
		spriteData: null,
		currentFrame: null,
		currentMode: null,
		image: null,
		x: null,
		y: null,
		velocity: null,
		frame: null,
		speed: null,
		direction: null,

		init: function(image, color) {
			this.image = image;
			this.color = color.toUpperCase();
			this.spriteData = PlayerDefinitions[this.color];
			this.currentFrame = 0;
			this.velocity = 0;
			this.frames = 1;
			this.speed = 5;
		},

		setPostion: function(x, y) {
			this.x = x;
			this.y = y;
		},

		setDrawMode: function(drawMode) {
			if (drawMode != null) {
				drawMode = drawMode.toUpperCase();
				if (this.direction != drawMode) {
					this.direction = drawMode;
					this.currentMode = this.spriteData.Modes[drawMode];
					this.currentFrame = 1;
				}
			}
		},

		tick: function(input) {
			this.frames = ++this.frames % 8;
			if (this.frames == 0) {
				if (this.velocity) {
					this.setPostion(this.x + this.velocity.x, this.y + this.velocity.y);
					this.currentFrame = ++this.currentFrame % this.currentMode.length;
				}
				else {
					this.currentFrame = 1;
				}
			}
		},

		draw: function(ctx) {
			ctx.drawImage(this.image, 
				this.currentMode[this.currentFrame].sx, 
				this.spriteData.sy, 
				this.spriteData.w, 
				this.spriteData.h, 
				this.x, 
				this.y, 
				this.spriteData.w, 
				this.spriteData.h);
		},

		getRect: function() {
			return {
				x: this.x,
				y: this.y,
				w: this.spriteData.w,
				h: this.spriteData.h
			};
		}
	});

return Player;
});