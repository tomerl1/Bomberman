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
			sy:66,
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
		BLUE: {
			sy:92,
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
		RED: {
			sy:120,
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
		direction: null,
		frame: null,
		speed: null,
		direction: null,
		isMoving: null,
		overBomb: null,
		isAlive: null,
		bombSize: null,

		init: function(image, color) {
			this.image = image;
			this.color = color.toUpperCase();
			this.spriteData = PlayerDefinitions[this.color];
			this.currentFrame = 0;
			this.direction = 0;
			this.frames = 1;
			this.speed = 1;
			this.isMoving = false;
			this.xd = this.yd = 0;
			this.overBomb = false;
			this.isAlive = true;
			this.bombSize = 2;
		},

		setPostion: function(x, y) {
			this.x = x;
			this.y = y;
		},

		setDrawMode: function(drawMode) {
			if (drawMode != null) {
				drawMode = drawMode.toUpperCase();
				if (this.currentMode != this.spriteData.Modes[drawMode]) {
					this.direction = drawMode;
					this.currentMode = this.spriteData.Modes[drawMode];
					this.currentFrame = 1;
				}
			}
		},

		tick: function() {
			this.frames = ++this.frames % 8;
			if (this.isMoving) {
				this.setPostion(this.x + this.direction.x * this.speed, this.y + this.direction.y * this.speed);
				if (this.frames == 0) {
					this.currentFrame = ++this.currentFrame % this.currentMode.length;
				}
			}
			else {
				this.currentFrame = 1;
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