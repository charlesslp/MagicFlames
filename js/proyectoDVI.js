/*
Alumnos:
  - Carlos Martínez Pérez
  - Arturo Marino Quintana
  - Pablo Marquez Fernandez
  - Pablo Martín Atienza
*/

var game = function() {

//Cargamos el modulo de quintus, con los modilos necesarios
  var Q = window.Q = Quintus({ audioSupported: [ 'ogg','mp3' ] })
   .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
   // Maximize permite maximizar el tamaño al de la pantalla
   .setup({ maximize: false, width:420, height:420 })
   // Cargamos los controles de entrada (controls y touch) para UI y activamos el sonido
   .controls().touch().enableSound();

   //Cargamos recursos y lo necesario para el menu del titulo
   var recursos = 'character.png , character.json , mi_seleccion.png, mi_seleccion.json, galeria.png, '+
   'Intro.png, mago.png, mago.json, murcielago.png, murcielago.json, portales.png, portales.json, monster_die.ogg , Jarron_roto.ogg, magia.ogg';

  Q.load( recursos , function(){

    Q.clearStages();
  	Q.compileSheets("character.png", "character.json");
    Q.compileSheets("mago.png", "mago.json");
    Q.compileSheets("mi_seleccion.png", "mi_seleccion.json");
    Q.compileSheets("murcielago.png", "murcielago.json");
    Q.compileSheets("portales.png", "portales.json");
    Q.sheet("intro","Intro.png", { tilew: 420, tileh: 420 });

  	 //Cargamos el contenido del TMX
  	Q.loadTMX("level.tmx, Prueba.tmx, Fuego.tmx, Mago.tmx", function() {
  		Q.stageScene("startGame");
  	});

  });



  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //PERSONAJES
  //PERSONAJES
  //PERSONAJES
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
  });

  //Sprite del heroe del juego
	var heroe = Q.Sprite.extend("Player",{
		init: function(p) {
			this._super(p, {sprite:"PlayerAnimation", sheet: "walk_down", gravity :0, parado: false, lanzado: false});
			this.add('2d, basicControls, animation');
		},
		step: function(dt) {

		if(Q.state.get("texto_mana") < 100)
			Q.state.inc("texto_mana", dt*5);

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
        	if(Q.state.get("texto_mana") >= 10){
        		  Q.state.dec("texto_mana", 10);
          		this.stage.insert(new magia({tipo: "fuego", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 10}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['s'] && !this.p.lanzado){

        	if(Q.state.get("texto_mana") >= 20){
        		Q.state.dec("texto_mana", 20);
          		this.stage.insert(new magia({tipo: "agua", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 20}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['d'] && !this.p.lanzado){
        	if(Q.state.get("texto_mana") >= 30){
        		Q.state.dec("texto_mana", 30);
          		this.stage.insert(new magia({tipo: "tierra", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 30}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['f'] && !this.p.lanzado){
        	if(Q.state.get("texto_mana") >= 50){
        		Q.state.dec("texto_mana", 50);
          		this.stage.insert(new magia({tipo: "viento", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 50}));
          		this.p.lanzado = true;
          	}
        }



  //Selector
        if(this.p.direction === "down" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x, y: this.p.y+32, direction: this.p.direction}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "up" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x, y: this.p.y-32, direction: this.p.direction}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "left" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x-32, y: this.p.y, direction: this.p.direction}));
          this.p.lanzado = true;
        }
  			else if(this.p.direction === "right" && Q.inputs['fire'] && !this.p.lanzado){
          this.stage.insert(new selector({x: this.p.x+32, y: this.p.y, direction: this.p.direction}));
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
    this._super(p, { w:32, h:32, sensor:true, gravity: 0, direction: "down"});
    this.add('2d, animation');

    this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

      if(collision.obj.isA("Cofre")){
        if(!collision.obj.p.abierto){
          collision.obj.play("abrir_cofre");
          collision.obj.p.abierto = true;
        }
      }
      else if(collision.obj.isA("Personaje")){
        collision.obj.hablar(this.p.direction);
      }
      else if(collision.obj.isA("Portal")){
        if(collision.obj.p.abierto === "true")
          cambiarNivel(collision.obj.p.level);
      }

      this.destroy();
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

        this.p.conversacion = [];

        this.p.conversacion[0] = "En mis tiempos esto era otra cosa";
        this.p.conversacion[1] = "Los chavales de hoy en día";
        this.p.conversacion[2] = "no os despegais de los pergaminos...";
        this.play("stop_down");

        this.hablar = function(direction){
          
          switch(direction){
            case "down": this.play("stop_up"); break;
            case "up": this.play("stop_down"); break;
            case "right": this.play("stop_left"); break;
            case "left": this.play("stop_right"); break;
          }
          
          Q.state.set("texto_conversacion", this.p.conversacion);
        }
      },
      step: function(dt) {
          this.play("stop_down");
      }

    });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN PERSONAJES
//FIN PERSONAJES
//FIN PERSONAJES
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//MAGIA
//MAGIA
//MAGIA
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



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
     Q.audio.play("magia.ogg");
    var margen = 34;
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


    this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){
        
        
        if(collision.obj.isA("Hierba")){
          if(!collision.obj.colision_hierba){
            this.colision_hierba = true;
            collision.obj.play("destruir_hierba");
          }
          else{
            this.colision_hierba = false;
          }
        } else if(collision.obj.isA("Jarron")){
          Q.audio.play("Jarron_roto.ogg");
          collision.obj.play("destruir_jarron");
        } else if(collision.obj.isA("Murcielago")){
          collision.obj.hit(this.p.potencia);
        }

        this.destroy();
    });
  }
});



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN MAGIA
//FIN MAGIA
//FIN MAGIA
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------







//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//OBJETOS
//OBJETOS
//OBJETOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






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
      this.colision_hierba = false;

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
        this.colision_jarron = false;

        this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

          if(collision.obj.isA("Magic") && !colision_jarron){
            Q.audio.play("Jarron_roto.ogg");
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



      Q.animations('portalAnimacion', {
        move_red: {frames: [0,1,2,3], rate: 2/5},
        closed_red: {frames: [4], loop: false},
        move_yellow: {frames: [5,6,7,8], rate: 2/5},
        closed_yellow: {frames: [9], loop: false},
        move_green: {frames: [10,11,12,13], rate: 2/5},
        closed_green: {frames: [14], loop: false},
        move_blue: {frames: [15,16,17,18], rate: 2/5},
        closed_blue: {frames: [19], loop: false}
      });

      //Portal
      var portal = Q.Sprite.extend("Portal",{
         init: function(p) {
          this._super(p, { sprite: "portalAnimacion", sheet: "portales", gravity:0});
          this.add('2d, animation');



          if(p.abierto === "true")
            this.play("move_"+p.tipo);
          else
            this.play("closed_"+p.tipo);
        }

      });



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN OBJETOS
//FIN OBJETOS
//FIN OBJETOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ENEMIGOS
//ENEMIGOS
//ENEMIGOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  Q.component("defaultEnemy", {
    added: function(){
      var entity = this.entity;

      entity.play("enemy_walk_down");

      entity.on("bump.left, bump.right, bump.bottom, bump.top", function(collision){

        if(!this.hitted){
          if(collision.obj.isA("Player")){

          	Q.state.dec("texto_vida", 10);

          	if(Q.state.get("texto_vida") <= 0)
          		collision.obj.destroy();
          	else{

          		switch(collision.obj.p.direction){
          			case "up": collision.obj.p.y = collision.obj.p.y+35; break;
          			case "down": collision.obj.p.y = collision.obj.p.y-35; break;
          			case "right": collision.obj.p.x = collision.obj.p.x-35; break;
          			case "left": collision.obj.p.x = collision.obj.p.x+35; break;
          		}

          		
          	}
          }

          entity.p.velY = -entity.p.velY;
          entity.p.velX = -entity.p.velX;

          entity.p.vy = entity.p.velY;
          entity.p.vx = entity.p.velX;
        }

      });
    }
  });



  Q.animations('murcielagoAnimation', {
      enemy_walk_down: {frames: [0, 1, 2, 3], rate: 1/4},
      enemy_walk_up:{frames: [4, 5, 6, 7], rate: 1/4},
      enemy_walk_right: {frames: [8, 9, 10, 11], rate: 1/4},
      enemy_walk_left: {frames: [12, 13, 14, 15], rate: 1/4},
      enemy_hit: {frames: [0, -1, 1, -1, 2, -1, 3, -1, 0], loop:false, rate: 1/7, trigger: "seguir"}
  });

  var murcielago = Q.Sprite.extend("Murcielago",{
    init: function(p){
      this._super(p, {sprite: "murcielagoAnimation", sheet: "enemy_walk_down", vx: p.velX, vy: p.velY, gravity: 0, vida: 30});
      this.add('2d, animation, defaultEnemy');

      this.hitted = false;

      this.hit = function(potencia){
        if(!this.hitted && this.p.vida > 1){
          this.hitted = true;
          this.p.vida-=potencia;
          this.p.vx = 0;
          this.p.vy = 0;
          this.play("enemy_hit");
        }
      }
      this.on("seguir",function() {
        this.hitted = false;
        if(this.p.vida <= 0){
          this.destroy();
          Q.audio.play("monster_die.ogg");
        }
        this.p.vx = this.p.velX;
        this.p.vy = this.p.velY;
      });
    },
    step: function(dt){

      if(this.p.vy > 0)
        this.play("enemy_walk_down");
      else if(this.p.vy < 0)
        this.play("enemy_walk_up");
      else if(this.p.vx < 0)
        this.play("enemy_walk_left");
      else if(this.p.vx > 0)
        this.play("enemy_walk_right");
    }
  });




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN ENEMIGOS
//FIN ENEMIGOS
//FIN ENEMIGOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CONVERSACIÓN
//CONVERSACIÓN
//CONVERSACIÓN
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





  //Definimos la etiqueta de las monedas (variable global del juego) que se actualizara en el HUD
  Q.UI.Text.extend("Conversacion",{
    init: function(p) {
      this.keydown = false;
      this.conversacion;
      this.i = 0;
      this._super(p,{
        label: Q.state.get("texto_conversacion"),
        color: "white",
        size: 12,
        x: 0,
        y: 0
      });

      Q.state.on("change.texto_conversacion",this,"update_conv");
    },
    update_conv: function(conversacion) {

        if(conversacion !== this.i)
        	this.conversacion = conversacion;

        this.p.label = this.conversacion[this.i];
        Q.stage(0).pause();
        this.keydown = true;
        this.i++;

    },
    step: function(dt) {


	    if(Q.stage(0).paused){
	      if(!Q.inputs['fire'])
	        this.keydown = false;

	    	if(!this.keydown && Q.inputs['fire']){
	    		if(!this.conversacion[this.i]){
	    			this.i = 0;
	    			this.conversacion = [];
	    			this.conversacion[0] = "";
			        Q.state.set("texto_conversacion", this.conversacion);
			        this.i = 0;
			        Q.stage(0).unpause();
			    }
			    else {
			        Q.state.set("texto_conversacion", this.i);
			    }
	    	}
	    }
    }
  });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN CONVERSACIÓN
//FIN CONVERSACIÓN
//FIN CONVERSACIÓN
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//JUEGO
//JUEGO
//JUEGO
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






	Q.scene("startGame", function(stage){
		//Tendremos en el estado el nivel en el que se encuentra el personaje aparte de la vida, mana, etc..
	Q.state.reset({ level:"Prueba"});

	var container = stage.insert(new Q.UI.Container({
		x: Q.width, y: Q.height, fill: "rgba(0,0,0,0.5)", w: 480, h: 480
	}));
	var button = container.insert(new Q.UI.Button({x: -Q.width/2, y: -Q.height/2, asset: "Intro.png", keyActionName: "fire"}));
	button.on("click", function(){
	cambiarNivel(Q.state.get("level"));
  });
	container.fit(20);


  Q.state.set("texto_mana", 100);
  Q.state.set("texto_vida", 100);
});

  function cambiarNivel(nivel){
        Q.clearStages();
        Q.stageScene(nivel);
        Q.stageScene('HUD', 2);
  }

	//Nivel de prueba en el que tendremos todos los objetos y poderes
  Q.scene("Prueba", function(stage) {
	  Q.stageTMX("Prueba.tmx", stage);
	  stage.add("viewport");

    Q.state.set("texto_conversacion", "");
	  var player = stage.insert(new heroe({ x: 300, y: 220 }));
	  stage.follow(player);

    stage.insert(new portal({ x: 200, y: 220, level: "mago", abierto:"true", tipo:"red"}));
    stage.insert(new portal({ x: 200, y: 350, level: "fuego", abierto:"true", tipo:"red"}));
    stage.insert(new portal({ x: 250, y: 350, level: "fuego", abierto:"false", tipo:"red"}));
    stage.insert(new personaje({x:150, y:220}));

  });

  //Nivel de mago
  Q.scene("mago", function(stage) {
    Q.stageTMX("Mago.tmx", stage);
    stage.add("viewport");

    Q.state.set("texto_conversacion", "");
    var player = stage.insert(new heroe({ x: 300, y: 220 }));
    stage.follow(player);

    //stage.insert(new portal({ x: 192, y: 256, level: "Prueba", abierto:true }));

  });


  //Nivel de fuego
  Q.scene("fuego", function(stage) {
    Q.stageTMX("Fuego.tmx", stage);
    stage.add("viewport");

    Q.state.set("texto_conversacion", "");
    var player = stage.insert(new heroe({ x: 300, y: 220 }));
    stage.follow(player);

    stage.insert(new portal({ x: 200, y: 220, level: "Prueba", abierto:"true", tipo:"red"}));

  });



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN JUEGO
//FIN JUEGO
//FIN JUEGO
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//HUD
//HUD
//HUD
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



  Q.scene('HUD',function(stage) {

    var container = stage.insert(new Q.UI.Container({
      x: 0,
      y: 0,
      w: Q.width,
      h: Q.height,
      fill: "rgba(0,0,0,0.5)",
      border: 1,
      shadow: 0,
      shadowColor: "rgba(0,0,0,0.5)"
    }));

    container.insert(new Q.Conversacion({
        x: Q.width/2,
        y: Q.height-50,

    }));

    container.insert(new Q.Vidas({
        x: 50,
        y: 40,

    }));

    container.fit(10);


    var container2 = stage.insert(new Q.UI.Container({
      x: 0,
      y: 0,
      w: Q.width,
      h: Q.height,
      fill: "rgba(0,0,0,0.5)",
      border: 1,
      shadow: 0,
      shadowColor: "rgba(0,0,0,0.5)"
    }));

    container2.insert(new Q.Mana({
        x: Q.width-50,
        y: 40,

    }));

    container2.fit(10);
  });





  //Definimos la etiqueta de las monedas (variable global del juego) que se actualizara en el HUD
  Q.UI.Text.extend("Vidas",{
    init: function(p) {

      this._super(p,{
        label: "Vidas: " + Q.state.get("texto_vida"),
        color: "red",
        size: 12,
        x: 0,
        y: 0
      });

      Q.state.on("change.texto_vida",this,"update_vidas");
    },
    update_vidas: function(vidas) {
        this.p.label = "Vidas: " + vidas;
    }
  });



  //Definimos la etiqueta de las monedas (variable global del juego) que se actualizara en el HUD
  Q.UI.Text.extend("Mana",{
    init: function(p) {

      this._super(p,{
        label: "Maná: " + Q.state.get("texto_mana").toFixed(0),
        color: "red",
        size: 12,
        x: 0,
        y: 0
      });

      Q.state.on("change.texto_mana",this,"update_mana");
    },
    update_mana: function(mana) {
        this.p.label = "Maná: " + mana.toFixed();
    }
  });


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN HUD
//FIN HUD
//FIN HUD
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




}
