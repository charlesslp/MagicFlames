/*
Alumnos:
  - Carlos Martínez Pérez
  - Arturo Marino Quintana
  - Pablo Marquez Fernandez
  - Pablo Martín Atienza
*/

var game = function() {

//Cargamos el modulo de quintus, con los modilos necesarios
  var Q = window.Q = Quintus({ audioSupported: [ 'mp3' ] })
   .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
   // Maximize permite maximizar el tamaño al de la pantalla
   .setup({ maximize: false, width:420, height:420 })
   // Cargamos los controles de entrada (controls y touch) para UI y activamos el sonido
   .controls().touch().enableSound();

   //Cargamos recursos y lo necesario para el menu del titulo
   var recursos = 'character.png , character.json , mi_seleccion.png, mi_seleccion.json, Intro.png, mago.png, mago.json, murcielago.png, murcielago.json';

  Q.load( recursos , function(){

    Q.clearStages();
  	Q.compileSheets("character.png", "character.json");
    Q.compileSheets("mago.png", "mago.json");
    Q.compileSheets("mi_seleccion.png", "mi_seleccion.json");
    Q.compileSheets("murcielago.png", "murcielago.json");
    Q.sheet("intro","Intro.png", { tilew: 420, tileh: 420 });

  	 //Cargamos el contenido del TMX
  	Q.loadTMX("level.tmx, Prueba.tmx", function() {
  		Q.stageScene("startGame");
  	});

  });

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

        defaults: { speed: 100, direction: 'down'},

        added: function() {
          var p = this.entity.p;

          // add in our default properties
          Q._defaults(p,this.defaults);

          this.entity.on("step",this,"step");
        },

        step: function(dt) {
          // grab the entity's properties for easy reference
          var p = this.entity.p;

          if(!this.entity.hablando){
        		//Movimiento arriba
            if(Q.inputs['up'] && !Q.inputs['down'] && !Q.inputs['right'] && !Q.inputs['left']){
              p.vy = -p.speed;
              p.vx = 0;
              //Movimiento derecha
            } else if(Q.inputs['right'] && !Q.inputs['left'] && !Q.inputs['up'] && !Q.inputs['down']){
              p.vx = p.speed;
              p.vy = 0;
              //Movimiento abajo
            } else if(Q.inputs['down'] && !Q.inputs['up'] && !Q.inputs['right'] && !Q.inputs['left']){
              p.vy = p.speed;
              p.vx = 0;
              //Movimiento izquierda
            } else if(Q.inputs['left'] && !Q.inputs['right'] && !Q.inputs['up'] && !Q.inputs['down']){
              p.vx = -p.speed;
              p.vy = 0;
              //Movimiento diagonal arriba izquierda
              } else if(Q.inputs['up'] && Q.inputs['left']){
                  p.vx = -p.speed;
                  p.vy = -p.speed;
              //Movimiento diagonal abajo izquierda
              } else if(Q.inputs['down'] && Q.inputs['left']){
                  p.vx = -p.speed;
                  p.vy = p.speed;
              //Movimiento diagonal arriba derecha
              } else if(Q.inputs['up'] && Q.inputs['right']){
                  p.vx = p.speed;
                  p.vy = -p.speed;
              //Movimiento diagonal abajo derecha
              } else if(Q.inputs['down'] && Q.inputs['right']){
                  p.vx = p.speed;
                  p.vy = p.speed;
              //Movimiento nulo
              } else {
              p.vx = 0;
              p.vy = 0;
            }

              if((Q.inputs['down'] && Q.inputs['up']) || (Q.inputs['left'] && Q.inputs['right'])){
                  p.parado = true;
              } else{
                  p.parado = false;
              }

            // grab a direction from the input
            p.direction = Q.inputs['left']  ? 'left' :
                          Q.inputs['right'] ? 'right' :
                          Q.inputs['up']    ? 'up' :
                          Q.inputs['down']  ? 'down' : p.direction;
        }

        }
  });

  //Sprite del heroe del juego
	var heroe = Q.Sprite.extend("Player",{
		init: function(p) {
			this._super(p, {sprite:"PlayerAnimation", sheet: "walk_down", gravity :0, parado: false, lanzado: false});
			this.add('2d, basicControls, animation');
		},
		step: function(dt) {

  		//se mueve ejecuta la animacion de andar
        if(this.p.direction === "down" && Q.inputs['down'] && !this.p.parado)
          this.play("walk_down");
        else if(this.p.direction === "up" && Q.inputs['up'] && !this.p.parado)
          this.play("walk_up");
        else if(this.p.direction === "left" && Q.inputs['left'] && !this.p.parado)
          this.play("walk_left");
        else if(this.p.direction === "right" && Q.inputs['right'] && !this.p.parado)
          this.play("walk_right");

        //No se mueve
        else if(this.p.direction === "down" && !Q.inputs['down'] && !this.p.parado)
          this.play("stop_down");
        else if(this.p.direction === "up" && !Q.inputs['up'] && !this.p.parado)
          this.play("stop_up");
        else if(this.p.direction === "left" && !Q.inputs['left'] && !this.p.parado)
          this.play("stop_left");
        else if(this.p.direction === "right" && !Q.inputs['right'] && !this.p.parado)
          this.play("stop_right");

        else if(this.p.direction === "down" && this.p.parado)
          this.play("stop_down");
        else if(this.p.direction === "up" && this.p.parado)
          this.play("stop_up");
        else if(this.p.direction === "left" && this.p.parado)
          this.play("stop_left");
        else if(this.p.direction === "right" && this.p.parado)
          this.play("stop_right");

        if(Q.inputs['a'] && !this.p.lanzado){
          this.stage.insert(new magia({tipo: "fuego", direction: this.p.direction, x: this.p.x, y: this.p.y}));
          this.p.lanzado = true;
        }
        if(Q.inputs['s'] && !this.p.lanzado){
          this.stage.insert(new magia({tipo: "agua", direction: this.p.direction, x: this.p.x, y: this.p.y}));
          this.p.lanzado = true;
        }
        if(Q.inputs['d'] && !this.p.lanzado){
          this.stage.insert(new magia({tipo: "tierra", direction: this.p.direction, x: this.p.x, y: this.p.y}));
          this.p.lanzado = true;
        }
        if(Q.inputs['f'] && !this.p.lanzado){
          this.stage.insert(new magia({tipo: "viento", direction: this.p.direction, x: this.p.x, y: this.p.y}));
          this.p.lanzado = true;
        }



  //Selector
        if(this.p.direction === "down" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x, y: this.p.y+32}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "up" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x, y: this.p.y-32}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "left" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x-32, y: this.p.y}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "right" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x+32, y: this.p.y}));
          this.p.lanzado = true;
        }
//FIn
        if(!Q.inputs['f'] && !Q.inputs['s'] && !Q.inputs['a'] && !Q.inputs['d'] && !Q.inputs['fire'] && this.p.lanzado){
          this.p.lanzado = false;
        }

    }
  });

var selector = Q.Sprite.extend("Selector", {
  init: function(p){
    this._super(p, { w:32, h:32, sensor:true, gravity: 0});
    this.add('2d, animation');

    this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

      if(collision.obj.isA("Cofre")){
        if(!collision.obj.p.abierto){
          collision.obj.play("abrir_cofre");
          collision.obj.p.abierto = true;
        }
      }
      else if(collision.obj.isA("Personaje")){
        collision.obj.hablar();
      }

      this.destroy();
    });
  }
});



  Q.animations('MagicAnimation', {

    fuego: { frames: [0, 9], rate: 1/4, loop: true},
    agua: { frames: [0, 9], rate: 1/4 },
    viento: { frames: [0, 9], rate: 1/4 },
    tierra: { frames: [0, 9], rate: 1/4 }

  });

var magia = Q.Sprite.extend("Magic", {

  //iniciara la magia, dependiendo de la tecla que se haya pulsado, invocando una u otra magía
  //tambien controlara la direccion y el sentido en el que es lanzada la magia
  init: function(p) {

    this._super(p, { sprite:"MagicAnimation", speed: 250, sheet: p.tipo, gravity: 0, sensor:true});
    this.add('2d, animation');

    var margen = 32;
    if(this.p.direction === 'up'){
      this.p.vy = -this.p.speed;
      this.p.vx = 0;
      this.p.angle = 0;
      this.p.y -= margen;
    } else if(this.p.direction === 'right'){
      this.p.vx = this.p.speed;
      this.p.vy = 0;
      this.p.angle = 90;
      this.p.x += margen;
    }else if(this.p.direction === 'down'){
      this.p.vy = this.p.speed;
      this.p.vx = 0;
      this.p.angle = 180;
      this.p.y += margen;
    }else if(this.p.direction === 'left'){
      this.p.vx = -this.p.speed;
      this.p.vy = 0;
      this.p.angle = 270;
      this.p.x -= margen;
    }

    this.play(this.p.tipo);
  },

  //Controlara que al chocarse con un objeto sea destruida la magia
  step: function(dt) {

    this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

        if(collision.obj.isA("Hierba")){
          this.destroy();
          collision.obj.play("destruir_hierba");
        } else if(collision.obj.isA("Jarron")){
          this.destroy();
          collision.obj.play("destruir_jarron");
        } else if(collision.obj.isA("Murcielago")){
          this.destroy();
          collision.obj.destroy();
        } else{
          this.destroy();
        }
    });
  }
});

//Hierba
  Q.animations('miHierba', {
    destruir_hierba: {frames: [1], rate: 9/15, loop:false, trigger: "destruir"}
  });

  //Sprite de un ierbajo (editado en TMX)
	var hierbajo = Q.Sprite.extend("Hierba",{
		init: function(p) {
			//this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
      this._super(p, { sprite: "miHierba", sheet: "hierba", gravity:0});
      this.add('2d, animation');
      var colision_hierba = false;

      this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

        if(collision.obj.isA("Magic") && !colision_hierba){
          colision_hierba = true;
          this.play("destruir_hierba");
        }
        else{
          colision_hierba = false;
        }
      });

      this.on("destruir", function(){
        this.destroy();
      });
    },
		step: function(dt) {
		}
	});

  //Jarron
    Q.animations('miJarron', {
      destruir_jarron: {frames: [1,2,3], rate: 1/5, loop:false, trigger: "destruir"}
    });

    //Sprite de un jarron
  	var jarron = Q.Sprite.extend("Jarron",{
  		init: function(p) {
  			//this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
        this._super(p, { sprite: "miJarron", sheet: "jarron", gravity:0});
        this.add('2d, animation');
        var colision_jarron = false;

        this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

          if(collision.obj.isA("Magic") && !colision_jarron){
            colision_jarron = true;
            this.play("destruir_jarron");
          }
          else{
            colision_jarron = false;
          }
        });

        this.on("destruir", function(){
          this.destroy();
        });
      }
  	});


    //Cofre
      Q.animations('CofreAnimacion', {
        abrir_cofre: {frames: [1,2,3], rate: 1/5, loop:false, trigger: "abrir"}
      });

      //Sprite de un jarron
      var cofre = Q.Sprite.extend("Cofre",{
        init: function(p) {
          //this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
          this._super(p, { sprite: "CofreAnimacion", sheet: "cofre", gravity:0});
          this.add('2d, animation');

          this.p.abierto = false;

          this.on("abrir", function(){
              //Aqui sumaria una serie de monedas o mana
              console.log("Me da moneditas");
          });
        }
      });

    //Animaciones de peronaje
      Q.animations('CharacterAnimation', {
        walk_down:{frames: [0, 1, 2], rate: 1/4},
        walk_left: {frames: [3, 4, 5], rate: 1/4},
        walk_right: {frames: [6, 7, 8], rate: 1/4},
        walk_up: {frames: [9, 10, 11], rate: 1/4},
        stop_down:{frames: [1], loop : false},
        stop_left:{frames: [4], loop : false},
        stop_right:{frames: [7], loop : false},
        stop_up:{frames: [10], loop : false},
        habla:{frames:[1], loop:false, trigger: "hablar"}
       });

        //Sprite de un jarron
        var personaje = Q.Sprite.extend("Personaje",{
          init: function(p) {
            //this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
            this._super(p, { sprite: "CharacterAnimation", sheet: "character_walk_down", gravity:0});
            this.add('2d, animation');

            this.p.conversacion = "En mis tiempos esto era otra cosa";
            this.play("stop_down");

            this.hablar = function(conv){
                Q.state.set("texto_conversacion", this.p.conversacion, false);
                console.log("Has hablado conmigo: "+this.p.conversacion);

            }

            this.on("hablar", function(){
                //Conversar
                console.log("Has hablado conmigo: "+this.p.conversacion);
            });
          }
        });




	Q.scene("startGame", function(stage){
		//Tendremos en el estado el nivel en el que se encuentra el personaje aparte de la vida, mana, etc..
	Q.state.reset({ level:"Prueba"});

	var container = stage.insert(new Q.UI.Container({
		x: Q.width, y: Q.height, fill: "rgba(0,0,0,0.5)", w: 480, h: 480
	}));
	var button = container.insert(new Q.UI.Button({x: -Q.width/2, y: -Q.height/2, asset: "Intro.png", keyActionName: "fire"}));
	button.on("click", function(){
		Q.clearStages();
		Q.stageScene(Q.state.get("level"));
    Q.stageScene('HUD', 2);
  });
	container.fit(20);
});

	//Nivel de prueba en el que tendremos todos los objetos y poderes
  Q.scene("Prueba", function(stage) {
	  Q.stageTMX("Prueba.tmx", stage);
	  stage.add("viewport");
    
    stage.insert(new murcielago({x: 300, y: 260}));

    Q.state.set("texto_conversacion", "", true);
	  var player = stage.insert(new heroe({ x: 300, y: 220 }));
	  stage.follow(player);

    //stage.insert(new cofre({ x: 200, y: 220 }));
    stage.insert(new personaje({x:200, y:220}));

  });

  Q.scene('HUD',function(stage) {

    var container = stage.insert(new Q.UI.Container({
      x: 100,
      y: Q.height-50,
      w: Q.width,
      h: 50,
      fill: "black1",
      border: 5,
      shadow: 10,
      shadowColor: "rgba(0,0,0,0.5)"
    }));

    container.insert(new Q.Conversacion({
        x: container.p.x,
        y: -20,

    }));

    container.fit(20);
  });


  //Definimos la etiqueta de las monedas (variable global del juego) que se actualizara en el HUD
  Q.UI.Text.extend("Conversacion",{
    init: function(p) {
      this.keydown = false;
      this._super(p,{
        label: Q.state.get("texto_conversacion"),
        color: "white",
        size: 12,
        x: 0,
        y: 0
      });

      Q.state.on("change.texto_conversacion",this,"update_conv");
    },
    update_conv: function(texto, reset) {
      if(!reset){
        this.p.label = texto;
        Q.stage(0).pause();
        this.keydown = true;
      }
    },
    step: function(dt) {

      if(!Q.inputs['fire'])
        this.keydown = false;

    	if(!this.keydown && Q.inputs['fire']){
        Q.state.set("texto_conversacion", "", true);
        Q.stage(0).unpause();
    	}
    }
  });

  Q.component("defaultEnemy", {
    added: function(){
      var entity = this.entity;
      entity.play("enemy_walk_down");

      entity.on("bump.left, bump.right, bump.bottom, bump.top", function(collision){
        if(collision.obj.isA("Player")){
          collision.obj.destroy();
        }
      });
    } 
  });

  Q.animations('murcielagoAnimation', {
      enemy_walk_down: {frames: [0, 1, 2, 3], rate: 1/4},
      enemy_walk_up:{frames: [4, 5, 6, 7], rate: 1/4},
      enemy_walk_right: {frames: [8, 9, 10, 11], rate: 1/4},
      enemy_walk_left: {frames: [12, 13, 14, 15], rate: 1/4}
  });

  var murcielago = Q.Sprite.extend("Murcielago",{
    init: function(p){
      this._super(p, {sprite: "murcielagoAnimation", sheet: "enemy_walk_down", vx: 0, vy: 0, gravity: 0, direccion: "down"});
      this.add('2d, animation, defaultEnemy');
    },
    step: function(){
      if(this.p.direction === "down")
        this.play("enemy_walk_down");
      else if(this.p.direction === "up")
        this.play("enemy_walk_up");
      else if(this.p.direction === "left")
        this.play("enemy_walk_left");
      else if(this.p.direction === "right")
        this.play("enemy_walk_right");
    }
  });

}
