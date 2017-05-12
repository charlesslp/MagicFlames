Q.animations('MagicAnimation', {

	fuego: { frames: [0, 9], rate: 1/4 }
	agua: { frames: [2, 3], rate: 1/4 }
	viento: { frames: [3, 4], rate: 1/4 }
	tierra: { frames: [5, 6], rate: 1/4 }
	
});

var magia = Q.Sprite.extend("Magic", {

	//iniciara la magia, dependiendo de la tecla que se haya pulsado, invocando una u otra magía
	//tambien controlara la direccion y el sentido en el que es lanzada la magia
	init: function(p) {

	 	var imagen;

	 	if(p.tipo === "fuego"){
	 		imagen = "fuego";
	 	} else if(p.tipo === "agua"){
	 		imagen = "agua"
	 	} else if(p.tipo === "viento"){
	 		imagen = "viento"
	 	} else if(p.tipo === "tierra"){
	 		imagen = "tierra"
	 	}

          this._super(p, { speed: 100, sheet: imagen});

          if(this.p.direction === 'up']){
			this.p.vy = -this.p.speed;
			this.p.vx = 0;
			this.p.angle = 0;
		} else if(this.p.direction === 'right'){
			this.p.vx = this.p.speed;
			this.p.vy = 0;
			this.p.angle = 90;
		}else if(this.p.direction === 'down'){
			this.p.vy = this.p.speed;
			this.p.vx = 0;
			this.p.angle = 180;
		}else if(this.p.direction === 'left'){
			this.p.vx = -this.p.speed;
			this.p.vy = 0;
			this.p.angle = 270;
		}

		this.play(imagen);
	},

	//Controlara que al chocarse con un objeto sea destruida la magia
        step: function(dt) {

		if(p.vx === 0 && p.vy === 0){
			this.destroy();
		}
      }
});