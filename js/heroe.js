	//Animaciones del heroe
	Q.animations('PlayerAnimation', {
		walk_down:{frames: [0, 1, 2], rate: 1/4},
		walk_left: {frames: [3, 4, 5], rate: 1/4},
		walk_right: {frames: [6, 7, 8], rate: 1/4},
		walk_up: {frames: [9, 10, 11], rate: 1/4},
		stop_down:{frames: [1], loop : false},
		stop_left:{frames: [4], loop : false},
		stop_right:{frames: [7], loop : false},
		stop_up:{frames: [10], loop : false}
	});

	//Componente que usara el heroe para poder moverse por el escenario
	Q.component("basicControls", {
      
        defaults: { speed: 100, direction: 'down' },

        added: function() {
          var p = this.entity.p;

          // add in our default properties
          Q._defaults(p,this.defaults);

          this.entity.on("step",this,"step");
        },

        step: function(dt) {
          // grab the entity's properties
          // for easy reference
          var p = this.entity.p;
    
		if(Q.inputs['up']){
			p.vy = -p.speed;
			p.vx = 0;
		} else if(Q.inputs['right']){
			p.vx = p.speed;
			p.vy = 0;
		}else if(Q.inputs['down']){
			p.vy = p.speed;
			p.vx = 0;
		}else if(Q.inputs['left']){
			p.vx = -p.speed;
			p.vy = 0;
		} 
		 else {
			p.vx = 0;
			p.vy =0;
		}
          // grab a direction from the input
          p.direction = Q.inputs['left']  ? 'left' :
                        Q.inputs['right'] ? 'right' :
                        Q.inputs['up']    ? 'up' :
                        Q.inputs['down']  ? 'down' : p.direction;

		}
	});

	//Sprite del heroe del juego
	var heroe = Q.Sprite.extend("Player",{
		init: function(p) {
			this._super(p, {sprite:"PlayerAnimation", sheet: "walk_down",gravity :0 , x:0 , y:0});
			this.add('2d, basicControls, animation');              
		},
		step: function(dt) {
			//se mueve ejecuta la animacion de andar
			if(this.p.direction === "down" && Q.inputs['down'])
				this.play("walk_down");
			else if(this.p.direction === "up" && Q.inputs['up'])
				this.play("walk_up");
			else if(this.p.direction === "left" && Q.inputs['left'])
				this.play("walk_left");
			else if(this.p.direction === "right" && Q.inputs['right'])
				this.play("walk_right");
		
			//No se mueve
			else if(this.p.direction === "down" && !Q.inputs['down'])
				this.play("stop_down");
			else if(this.p.direction === "up" && !Q.inputs['up'])
				this.play("stop_up");
			else if(this.p.direction === "left" && !Q.inputs['left'])
				this.play("stop_left");
			else if(this.p.direction === "right" && !Q.inputs['right'])
				this.play("stop_right");
		}
	});