define(function(){
	
	var Sprite = Class.extend({
		img: null,
		sx: null,
		sy: null,
		sw: null,
		sh: null,
		x: null,
		y: null,
		w: null,
		h: null,

		init: function(img, sx, sy, sw, sh, x, y, w, h){
			this.img = img;
			this.sx = sx;
			this.sy = sy;
			this.sw = sw;
			this.sh = sh;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},

		draw: function(ctx){
			ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);		
		}

	});

	return Sprite;

});