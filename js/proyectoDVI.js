/*
Alumnos:
  - Carlos Martínez Pérez
  - Arturo Marino Quintana
  - Pablo Marquez Fernandez
  - Pablo Martín Atienza
*/

var conversacionMago = [
  ["Hola chaval, por fin te encuentro, escucha\ncorremos un gran peligro.","Hay rumores de que un malvado hechicero\nse está poniendo to tocho para\nconquistar Softwareland.", "Mi deber es proteger este reino\nde los pringaos que creen que\npueden conquistarlo.",
  "Pero antes necesito las llamas\nde los elementos para poder frenarle.", "\n¿Que me dices?¿Me echas una mano?", "Tras cada portal se encuentran\nlas llamas que debes traerme", "Como soy to majo, te voy a dar\nel poder del fuego de primeras",
  "Con él podrás quemar cosas y dañar\na los enemigos que te encuentres", "\no dañar a quien quieras, no es mi problema", "y te voy a abrir el portal rojo para que\npuedas traerme la llama del desierto.", "Cuando lo hagas, ven a verme\ny te doy el siguiente poder."],
  ["\n¿Aun sigues aqui?", "¡Vete a por la llama!\n¡¡¡El tiempo corre!!!"],
  ["¡¡Gracias!!", "Toma, aquí tienes el poder del agua,\nahora podrás apagar el fuego\nque se cruce en tu camino.", "También puedes usarlo para dañar\na tus enemigos, ya que es más\npoderoso que el fuego.", "O puedes empapar a tus amigas y hacer\nun concurso de camisetas mojadas.",
  "Por cierto, avisame si decides\nhacer eso último.","Ahora te abriré el portal azul para que\nme traigas la llama del mar.", "\nBuena suerte."],
  ["Tío, que más quieres, no mucha gente\npuede apagar el fuego con magia.", "Cualquier bombero estaría\nenvidioso de ti", "\n¡Pero ahora traeme la siguiente llama!"],
  ["¡¡Gracias majo!!\n¡Eso si que es una cosa bien hecha!", "No como los dibujos de mi nieto...\nBueno el caso, aqui tienes el\npoder de la tierra.", "Con él podrás romper piedras\ne incluso rocas.","Ya queda poco, traeme la\nllama del bosque y te daré\nel siguiente poder"],
  ["Mirate, con 3 poderes ya.\nLos chavales de hoy en día\ncreceis tan rápido..."],
  ["¡Genial!\n¡Ya solo queda uno!", "Toma el poder del viento,\ncon él podras mover algunos\nobjetos de gran peso", "Y levantar las faldas a las chicas\nsin que se enteren... Aunque yo no\nhago eso, ¿eh? ¡Lo juro!", "Ahora traeme la llama del cielo,\nes la última llama.","Te prometo que cuando me la traigas\nte daré el poder más chulo de todos..."],
  ["¿Que pasa?¿No te fias de mi?\nTu traeme la llama chico", "\nQuien te has creido para cuestionarme..."],
  ["\nJajaja...", "\nJAJAJAJAJA", "¡¡POR FIN!!\n¡¡¡EL PODER DE LOS ELEMENTOS\nPOR FIN ES MIO!!!", "Ahora podré hacer lo que me de la gana\nsin nadie que me lo impida.", "Lo primero que haré será\nquemar un par de aldeas.", "\nDespués comeré un poco", "Un sandwich con crema de cacahuete,\nque esa mierda esta super rica",
  "Luego iré al baño, que no me suelen\nsentar muy bien esos sandwiches.", "Y después... Despues.......\n¿Después que iba a hacer yo?", "¡Ah si, conquistar Softwareland!\nMaldito alzheimer...", "Gracias por hacerme el trabajo chaval,\nahora hazte a un lado, tengo un mundo\nque conquistar..."],
  ["¡Que haces aquí!\n¿No ves que estoy ocupado?", "Gracias a las llamas que me\ntrajiste me he convertido en el mago\nmás poderoso del mundo.", "Nadie puede detenerme ahora.\nY menos un mocoso como tu.", "\nPor cierto, ¿tienes un espejo?", "Me ha desaparecido la barba de repente\ny no se que aspecto debo tener sin ella", "\n...",
  "¿Vas a decir algo?\n¿O vas a seguir callado?", "\n...", "¡Me estás poniendo nervioso!\n¡Deja de mirarme sin hacer nada!", "\n...", "\n...........", "Veo que no lo entiendes por las buenas.\nEn ese caso, ¡¡preparate \npara sufrir mi ira!!!"],
  ["\n¡¿QUE?!", "\n¡¡IMPOSIBLE!!", "\n¡¡NOOOOOOOOOOOOOOOOOOOOOOO!!"]
]


var game = function() {

//Cargamos el modulo de quintus, con los modilos necesarios
  var Q = window.Q = Quintus({ audioSupported: [ 'ogg','wav','mp3' ] })
   .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
   // Maximize permite maximizar el tamaño al de la pantalla
   .setup({ maximize: false, width:420, height:420 })
   // Cargamos los controles de entrada (controls y touch) para UI y activamos el sonido
   .controls().touch().enableSound();





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
    	stop_up:{frames: [10], loop : false},
    	walk_down_hitted:{frames: [-1, 0, -1, 1, -1, 2], rate: 1/4},
    	walk_left_hitted: {frames: [-1, 3, -1, 4, -1, 5], rate: 1/4},
    	walk_right_hitted: {frames: [-1, 6, -1, 7, -1, 8], rate: 1/4},
    	walk_up_hitted: {frames: [-1, 9, -1, 10, -1, 11], rate: 1/4},
    	stop_down_hitted:{frames: [-1, 1], rate: 1/4},
    	stop_left_hitted:{frames: [-1, 4], rate: 1/4},
    	stop_right_hitted:{frames: [-1, 7], rate: 1/4},
    	stop_up_hitted:{frames: [-1, 10], rate: 1/4}
    });
   //Componente que usara el heroe para poder moverse por el escenario
   Q.component("basicControls", {

        defaults: { speed: 100, direction: 'down', hitted: false},

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

			this.on("seguir",function() {
				this.p.hitted = false;
			});

			this.time = 0;

			this.hit = function(potencia){
				if(!this.p.hitted){
			      Q.state.dec("texto_vida", potencia);

			      if(Q.state.get("texto_vida") <= 0){
					Q.state.set("nivel_ant", "portales");
			      	Q.state.set("texto_vida", 100);
			      	if(Q.state.get("num_conversacion") === 11){
              			Q.state.set("num_conversacion", 9);
              		}
			      	cambiarNivel("portales");
			      }
			      else{

			        this.p.hitted = true;

			      }
			    }
			}

		},
		step: function(dt) {

		if(Q.state.get("texto_mana") < 100)
			Q.state.inc("texto_mana", dt*5);

		if(this.p.hitted){
			this.time += dt;
			if(this.time > 2){
				this.time = 0;
				this.p.hitted = false;
			}
		}


  		  //se mueve ejecuta la animacion de andar
        if(this.p.direction === "down" && Q.inputs['down'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("walk_down_hitted");
          else
          	this.play("walk_down");
        }
        else if(this.p.direction === "up" && Q.inputs['up'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("walk_up_hitted");
          else
          	this.play("walk_up");
        }
        else if(this.p.direction === "left" && Q.inputs['left'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("walk_left_hitted");
          else
          	this.play("walk_left");
        }
        else if(this.p.direction === "right" && Q.inputs['right'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("walk_right_hitted");
          else
          	this.play("walk_right");
        }

        //No se mueve
        else if(this.p.direction === "down" && !Q.inputs['down'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("stop_down_hitted");
          else
          	this.play("stop_down");
        }
        else if(this.p.direction === "up" && !Q.inputs['up'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("stop_up_hitted");
          else
          	this.play("stop_up");
        }
        else if(this.p.direction === "left" && !Q.inputs['left'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("stop_left_hitted");
          else
          	this.play("stop_left");
        }
        else if(this.p.direction === "right" && !Q.inputs['right'] && !this.p.parado){
          if(this.p.hitted)
          	this.play("stop_right_hitted");
          else
          	this.play("stop_right");
        }

        else if(this.p.direction === "down" && this.p.parado){
          if(this.p.hitted)
          	this.play("stop_down_hitted");
          else
          	this.play("stop_down");
        }
        else if(this.p.direction === "up" && this.p.parado){
          if(this.p.hitted)
          	this.play("stop_up_hitted");
          else
          	this.play("stop_up");
        }
        else if(this.p.direction === "left" && this.p.parado){
          if(this.p.hitted)
          	this.play("stop_left_hitted");
          else
          	this.play("stop_left");
        }
        else if(this.p.direction === "right" && this.p.parado){
          if(this.p.hitted)
          	this.play("stop_right_hitted");
          else
          	this.play("stop_right");
        }

        if(Q.inputs['a'] && !this.p.lanzado){
        	if(Q.state.get("texto_mana") >= 10 && Q.state.get("poderes_conseguidos") > 0){
        		  Q.state.dec("texto_mana", 10);
          		this.stage.insert(new magia({tipo: "fuego", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 10, master: "heroe"}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['s'] && !this.p.lanzado){

        	if(Q.state.get("texto_mana") >= 20 && Q.state.get("poderes_conseguidos") > 1){
        		Q.state.dec("texto_mana", 20);
          		this.stage.insert(new magia({tipo: "agua", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 20, master: "heroe"}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['d'] && !this.p.lanzado){
        	if(Q.state.get("texto_mana") >= 30 && Q.state.get("poderes_conseguidos") > 2){
        		Q.state.dec("texto_mana", 30);
          		this.stage.insert(new magia({tipo: "tierra", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 30, master: "heroe"}));
          		this.p.lanzado = true;
          	}
        }
        if(Q.inputs['f'] && !this.p.lanzado){
        	if(Q.state.get("texto_mana") >= 40 && Q.state.get("poderes_conseguidos") > 3){
        		Q.state.dec("texto_mana", 40);
          		this.stage.insert(new magia({tipo: "viento", direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 50, master: "heroe"}));
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
    this.tocado = false;

    this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

      if(!this.tocado){
        this.tocado = true;

        if(collision.obj.isA("Cofre")){
          if(!collision.obj.p.abierto){
            Q.audio.play("chest_openning.ogg");
            collision.obj.play("abrir_cofre");
          }
        }
        else if(collision.obj.isA("Personaje")){
          if(Q.state.get("num_conversacion") < 9)
            crearHUDConversacion("magoface.png");
          else
            crearHUDConversacion("bossface.png");

          collision.obj.hablar(this.p.direction);
        }
        else if(collision.obj.isA("Llama")){
          collision.obj.coger_llama();
        }

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
    stop_up:{frames: [10], loop : false}
   });

    //Sprite de un jarron
    var personaje = Q.Sprite.extend("Personaje",{
      init: function(p) {
        //this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});

        var sheetPersonaje;
        if(Q.state.get("num_conversacion") < 9)
          sheetPersonaje = "character_walk_down";
        else
          sheetPersonaje = "character_gets_bad";

        this._super(p, { sprite: "CharacterAnimation", sheet: sheetPersonaje, gravity:0});
        this.add('2d, animation');

        this.p.conversacion = [];
        this.play("stop_down");
        this.malvado = false;

        this.hablar = function(direction){

          switch(direction){
            case "down": this.play("stop_up"); break;
            case "up": this.play("stop_down"); break;
            case "right": this.play("stop_left"); break;
            case "left": this.play("stop_right"); break;
          }

          var n = Q.state.get("num_conversacion");

          switch(n){
            case 0: Q.state.inc("num_conversacion", 1); Q.state.inc("poderes_conseguidos", 1); break;
            case 1: if(Q.state.get("llamas_conseguidas") > 0){

              n = 2;
              Q.state.inc("num_conversacion", 2);
              Q.state.inc("poderes_conseguidos", 1);

            }
            break;
            case 3: if(Q.state.get("llamas_conseguidas") > 1){

              n = 4;
              Q.state.inc("num_conversacion", 2);
              Q.state.inc("poderes_conseguidos", 1);
            }
            break;
            case 5: if(Q.state.get("llamas_conseguidas") > 2){

              n = 6;
              Q.state.inc("num_conversacion", 2);
              Q.state.inc("poderes_conseguidos", 1);
            }
            break;
            case 7: if(Q.state.get("llamas_conseguidas") > 3){

              n = 8;
              Q.state.inc("num_conversacion", 2);
              Q.state.inc("poderes_conseguidos", 1);
            }
            break;
            case 9: Q.state.inc("num_conversacion", 1); break;
          }

          this.p.conversacion = conversacionMago[n];

          Q.state.set("texto_conversacion", this.p.conversacion);

          if(n === 8)
            this.malvado = true;
        }
      },
      step: function(dt) {
          this.play("stop_down");
          if(this.malvado)
            this.destroy();
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

  	if(!p.speed)
  		p.speed = 250;

    this._super(p, { sprite:"MagicAnimation", sheet: p.tipo, gravity: 0, sensor:true});
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

            collision.obj.sonido();
            collision.obj.play("destruir_hierba");

        } else if(collision.obj.isA("Jarron")){

          collision.obj.sonido();
          collision.obj.play("destruir_jarron");

        } else if(collision.obj.isA("Roca")){

          if(this.p.tipo === "tierra"){
            collision.obj.sonido();
            collision.obj.play("destruir_roca");
          }

        } else if(collision.obj.isA("Murcielago") || collision.obj.isA("Esqueleto")|| collision.obj.isA("Demon")){

          collision.obj.hit(this.p.potencia);

        } else if(collision.obj.isA("Tornado")){

          if(this.p.tipo === "viento"){
		  collision.obj.sonido();
            collision.obj.destroy();
          }

        } else if(collision.obj.isA("ObstaculoFuego")){

          if(this.p.tipo === "agua"){
            Q.audio.play("turn_off_fire.ogg");
            collision.obj.destroy();
          }

        } else if(collision.obj.isA("Boss")){

          if(collision.obj.p.tipo === this.p.tipo && this.p.master === "heroe")
          	collision.obj.hit(10);

        } else if(collision.obj.isA("Player") && this.p.master === "boss"){

          collision.obj.hit(10);

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


Q.component("defaultObject", {
    added: function(){
      var entity = this.entity;

      entity.add('2d, animation');

      entity.collision_objeto = false;

      entity.on("destruir", function(){
        entity.destroy();
      });

    }, extend:{
		sonido: function(){
	        if(!this.collision_objeto){
	          this.collision_objeto = true;
	          Q.audio.play("sonido_romper_" + this.p.tipo + ".ogg");
	        }
	      }
    }
});


//Hierba
  Q.animations('miHierba', {
    destruir_hierba: {frames: [1], rate: 9/15, loop:false, trigger: "destruir"}
  });

  //Sprite de un hierbajo (editado en TMX)
	var hierbajo = Q.Sprite.extend("Hierba",{
		init: function(p) {
		      this._super(p, { sprite: "miHierba", sheet: "hierba", gravity:0, tipo: "hierba"});
		      this.add('defaultObject');
		      
		}
	});

  //Jarron
    Q.animations('miJarron', {
      destruir_jarron: {frames: [1,2,3], rate: 1/3, loop:false, trigger: "destruir"}
    });

    //Sprite de un jarron
  	var jarron = Q.Sprite.extend("Jarron",{
  		init: function(p) {
        		this._super(p, { sprite: "miJarron", sheet: "jarron", gravity:0, tipo: "jarron"});
		      this.add('defaultObject');
      	}
  	});

    //Corazon
      Q.animations('animacion_corazon', {
        corazon_lleno: {frames: [1], rate: 1/3, loop:false},
        destruir_corazon: {frames: [], loop:false, trigger: "destruir"}
      });

      //Sprite de un jarron
    	var corazon = Q.Sprite.extend("Corazon",{
    		init: function(p) {
    			//this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
          	this._super(p, { sprite: "corazon", sheet: "corazon_lleno", gravity:0});
          	this.add('2d, animation');

	          this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){
	            if(collision.obj.isA("Player")){
	              if(Q.state.get("texto_vida") < 100){
	                Q.state.inc("texto_vida", 10);
	              }
	              this.destroy();
	            }
	          });
        	}
    	});


  //Jarron
    Q.animations('miRoca', {
      destruir_roca: {frames: [0,1,2], rate: 1/3, loop:false, trigger: "destruir"}
    });

    //Sprite de un jarron
    var roca = Q.Sprite.extend("Roca",{
      init: function(p) {
        this._super(p, { sprite: "miRoca", sheet: "roca", gravity:0, tipo: "roca"});
	   this.add('defaultObject');
      }
    });

     Q.animations('miTornado', {
      move: {frames: [0,1,2,3,4], rate: 1/3}
    });

    
    var tornado = Q.Sprite.extend("Tornado",{
      init: function(p) {
        this._super(p, { sprite: "miTornado", sheet: "tornado", gravity:0, tipo: "tornado"});
        this.add('defaultObject');
        this.play("move");

        this.on("bump.left, bump.right, bump.bottom, bump.top", function(collision){
              if(collision.obj.isA("Player")){
              	collision.obj.hit(10);
              }
	   });
      }
    });

    //Cofre
    Q.animations('CofreAnimacion', {
    abrir_cofre: {frames: [1,2,3], rate: 1/5, loop:false, trigger: "abrir"},
    cofre_abierto_inicialmente: {frames: [3], loop:false, trigger: "abierto_inicialmente"}
  });

  //Sprite de un jarron
  var cofre = Q.Sprite.extend("Cofre",{
    init: function(p) {
      //this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
      this._super(p, { sprite: "CofreAnimacion", sheet: "cofre", gravity:0});
      this.add('2d, animation');

      this.p.abierto = false;

      //Este abre el cofre cuando colisiona con el selector del personaje, y lo añade a la lista de cofres abiertos
      this.on("abrir", function(){

        if(!this.p.abierto){
          Q.state.inc("texto_monedas", 10);
          this.p.abierto = true;
          //Añadimos el id del cofre abierto a la lista de cofres abiertos
          var cofres_abiertos_aux = Q.state.get("cofres_abiertos");
          cofres_abiertos_aux[cofres_abiertos_aux.length] = this.p.identificador;
          Q.state.set("cofres_abiertos", cofres_abiertos_aux);
        }

      });

      //Este deja el cofre abierto segun se inicia el nivel, para no repetir cofres
      this.on("abierto_inicialmente", function(){
        this.p.abierto = true;
      });
    }
  });



      //Fuego
      Q.animations('FuegoAnimacion', {
        move: {frames: [0,-9], rate: 1/5}
      });

      //Sprite de un jarron
      var obstaculoFuego = Q.Sprite.extend("ObstaculoFuego",{
        init: function(p) {
          this._super(p, { sprite: "FuegoAnimacion", sheet: "obstaculoFuego", gravity:0, tipo: "fuego"});
		this.add('defaultObject');
		this.play("move");

          this.on("bump.left, bump.right, bump.bottom, bump.top", function(collision){

              if(collision.obj.isA("Player")){
              	collision.obj.hit(10);
              }

          });

        }
      });



    Q.animations('llama_animation', {
      move: {frames: [0,1,2], rate: 1/5},
      apagar_0: {frames: [18], loop: false},
      apagar_1: {frames: [27], loop: false},
      apagar_2: {frames: [9], loop: false},
      apagar_3: {frames: [36], loop: false}
    });

    //Sprite de una llama de poder
  	var llama = Q.Sprite.extend("Llama",{
  		init: function(p) {
  			//this._super(p, {sprite:"ChestAnimation", sheet: "open_chest", gravity: 0});
        this._super(p, { sprite: "llama_animation", sheet: "llama_"+p.tipo, cogido: false, gravity:0});
        this.add('2d, animation');

        if(Q.state.get("llamas_conseguidas") > p.tipo ){
          this.p.cogido = true;
          this.play("apagar_"+this.p.tipo);
        }
        else
          this.play("move");

        this.coger_llama = function(){
        	if(!this.p.cogido){
        		this.p.cogido = true;

            if(Q.state.get("llamas_conseguidas") === this.p.tipo){
              Q.state.inc("llamas_conseguidas", 1);
            }

	        	console.log("te da el poder de "+this.p.tipo+" " +Q.state.get("llamas_conseguidas"));
	        	this.play("apagar_"+this.p.tipo);
	        }
        }

      }
  	});




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN OBJETOS
//FIN OBJETOS
//FIN OBJETOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//PORTALES
//PORTALES
//PORTALES
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





      Q.animations('portalAnimacion', {
        move_0: {frames: [0,1,2,3], rate: 2/5},
        closed_0: {frames: [4], loop: false},
        move_1: {frames: [15,16,17,18], rate: 2/5},
        closed_1: {frames: [19], loop: false},
        move_2: {frames: [10,11,12,13], rate: 2/5},
        closed_2: {frames: [14], loop: false},
        move_3: {frames: [5,6,7,8], rate: 2/5},
        closed_3: {frames: [9], loop: false}
      });

      //Portal
      var portal = Q.Sprite.extend("Portal",{
         init: function(p) {
          this._super(p, { sprite: "portalAnimacion", sheet: "portales", gravity:0});
          this.add('2d, animation');



          this.on("bump.bottom", function(collision){

  	        if(collision.obj.isA("Player")){
  	        	if(this.p.abierto === "true")
            			cambiarNivel(this.p.level);
  	        }
  	      });
        },
        step: function(dt){

          if(Q.state.get("poderes_conseguidos") > this.p.tipo)
            this.p.abierto = "true";


          if(this.p.abierto === "true")
            this.play("move_"+this.p.tipo);
          else
            this.play("closed_"+this.p.tipo);
        }

      });





      //Salida
      var salida = Q.Sprite.extend("Salida",{
         init: function(p) {
          this._super(p, {sheet: "nada", gravity:0});
          this.add('2d, animation');

           this.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){

	        if(collision.obj.isA("Player")){
          		cambiarNivel(this.p.level);
	        }
	      });
        }

      });



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN PORTALES
//FIN PORTALES
//FIN PORTALES
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

        if(!this.p.hitted){
          if(collision.obj.isA("Player")){

            collision.obj.hit(10);
          }
        }

      });


    },

    extend:{

      step: function(dt){

        var heroe = Q("Player").first();
        var rango = 200;

        if(this.p.Class === "Boss")
        	rango = 2000;

        var xyHeroe = heroe.p.x + heroe.p.y;
        var xyBicho = this.p.x + this.p.y;

        if(Math.abs(xyHeroe - xyBicho) < rango && !this.p.hitted){
          if(heroe.p.x > this.p.x){
            this.p.vx = this.p.velX;
            if(heroe.p.y > this.p.y){
              this.p.vy = this.p.velY;
            } else if(heroe.p.y < this.p.y){
              this.p.vy = -this.p.velY;
            } else{
              this.p.vy = 0;
            }
          } else if (heroe.p.x < this.p.x){
            this.p.vx = -this.p.velX;
            if(heroe.p.y > this.p.y){
              this.p.vy = this.p.velY;
            } else if(heroe.p.y < this.p.y){
              this.p.vy = -this.p.velY;
            } else{
              this.p.vy = 0;
            }
          } else{
            this.p.vx = 0;
            if(heroe.p.y > this.p.y){
              this.p.vy = this.p.velY;
            } else if(heroe.p.y < this.p.y){
              this.p.vy = -this.p.velY;
            } else{
              this.p.vy = 0;
            }
          }
        } else{
          this.p.vy = 0;
          this.p.vx = 0;
        }

        if(this.p.vy > 0 && (Math.abs(heroe.p.x - this.p.x) < 4 || this.p.golpeado)){
          this.p.golpeado = false;
          this.play("enemy_walk_down");
          if(this.p.Class === "Boss")
          	this.p.direction = "down";
        } else if(this.p.vy < 0 && (Math.abs(heroe.p.x - this.p.x) < 4 || this.p.golpeado)){
          this.p.golpeado = false;
          this.p.golpeado = false;this.play("enemy_walk_up");
          if(this.p.Class === "Boss")
          	this.p.direction = "up";
        } else if(this.p.vx < 0 && (Math.abs(heroe.p.y - this.p.y) < 4 || this.p.golpeado)){
          this.p.golpeado = false;
          this.play("enemy_walk_left");
          if(this.p.Class === "Boss")
          	this.p.direction = "left";
        } else if(this.p.vx > 0 && (Math.abs(heroe.p.y - this.p.y) < 4 || this.p.golpeado)){
          this.p.golpeado = false;
          this.play("enemy_walk_right");
          if(this.p.Class === "Boss")
          	this.p.direction = "right";
        }

        if(this.p.Class === "Boss"){

        	if(!this.p.matar){
	        	this.p.tiempo += dt;
	        	this.p.tiempoSinLanzar += dt;
	        	if(this.p.tiempoSinLanzar > 3 && !this.p.hitted){
	        		this.p.tiempoSinLanzar = 0;
					this.stage.insert(new magia({tipo: this.p.tipo, direction: this.p.direction, x: this.p.x+this.p.vx/15, y: this.p.y+this.p.vy/15, potencia: 5, speed: 150, master: "boss"}));
	        	}

	        	if(this.p.tiempo > this.p.timesUp){
	        		this.p.tiempo = 0;
	        		this.p.cambiarA = Math.floor((Math.random() * 4));
	        		this.p.timesUp = Math.floor((Math.random() * 3)) + 4;

	        		switch(this.p.cambiarA){
	        			case 0: this.p.sheet="boss_fuego"; this.p.tipo = "fuego"; break;
	        			case 1: this.p.sheet="boss_agua"; this.p.tipo = "agua"; break;
	        			case 2: this.p.sheet="boss_tierra"; this.p.tipo = "tierra"; break;
	        			case 3: this.p.sheet="boss_viento"; this.p.tipo = "viento"; break;
	        		}
	        	}
	        }
	        else{
	        	this.destroy();
	        }

        }

      }, hit: function(potencia){

      	if(!this.p.hitted)
        	this.p.vida-=potencia;
        this.p.vx = 0;
        this.p.vy = 0;

        if(!this.p.hitted && this.p.vida > 1){
          this.p.golpeado = true;
          this.p.hitted = true;
          this.play("enemy_hit");
        }
        else if(this.p.vida <=0){
          this.p.golpeado = true;
          this.p.hitted = true;
          Q.audio.play("monster_die.ogg");
          this.play("enemy_die");
        }
      }
    }
  });



  Q.animations('murcielagoAnimation', {
      enemy_walk_down: {frames: [0, 1, 2, 3], rate: 1/4},
      enemy_walk_up:{frames: [4, 5, 6, 7], rate: 1/4},
      enemy_walk_right: {frames: [8, 9, 10, 11], rate: 1/4},
      enemy_walk_left: {frames: [12, 13, 14, 15], rate: 1/4},
      enemy_hit: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "seguir"},
      enemy_die: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "destroy"}
  });

  var murcielago = Q.Sprite.extend("Murcielago",{
    init: function(p){
      this._super(p, {sprite: "murcielagoAnimation", sheet: "enemy_walk_down", vx: p.velX, vy: p.velY, gravity: 0, vida: 30, golpeado:false, hitted:false});
      this.add('2d, animation, defaultEnemy');

      this.on("seguir",function() {
        this.p.hitted = false;
      });
      this.on("destroy",function() {
        this.destroy();
      });
    }
  });


  Q.animations('DemonAnimation', {
      enemy_walk_up: {frames: [0, 1, 2, 3], rate: 1/4},
      enemy_walk_left:{frames: [4, 5, 6, 7], rate: 1/4},
      enemy_walk_down: {frames: [8, 9, 10, 11], rate: 1/4},
      enemy_walk_right: {frames: [12, 13, 14, 15], rate: 1/4},
      enemy_hit: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "seguir"},
      enemy_die: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "destroy"}
  });

  var demonio  = Q.Sprite.extend("Demon",{
    init: function(p){
      this._super(p, {sprite: "DemonAnimation", sheet: "enemy_walk_up", vx: p.velX, vy: p.velY, gravity: 0, vida: 30, golpeado:false, hitted:false});
      this.add('2d, animation, defaultEnemy');

      this.on("seguir",function() {
        this.p.hitted = false;
      });
      this.on("destroy",function() {
        this.destroy();
      });
    }
  });


  Q.animations('esqueletoAnimation', {
      enemy_walk_down: {frames: [0, 1, 2], rate: 1/4},
      enemy_walk_up:{frames: [9, 10, 11], rate: 1/4},
      enemy_walk_right: {frames: [6, 7, 8], rate: 1/4},
      enemy_walk_left: {frames: [3, 4, 5], rate: 1/4},
      enemy_hit: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "seguir"},
      enemy_die: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "destroy"}
  });

  var esqueleto = Q.Sprite.extend("Esqueleto",{
    init: function(p){
      this._super(p, {sprite: "esqueletoAnimation", sheet: "skeleton_walk_down", vx: p.velX, vy: p.velY, gravity: 0, vida: 20, golpeado:false, hitted:false});
      this.add('2d, animation, defaultEnemy');

      this.on("seguir",function() {
        this.p.hitted = false;
      });
      this.on("destroy",function() {
        this.destroy();
      });
    }
  });



  Q.animations('bossAnimation', {
    enemy_walk_down:{frames: [0, 1, 2], rate: 1/4},
    enemy_walk_left: {frames: [3, 4, 5], rate: 1/4},
    enemy_walk_right: {frames: [6, 7, 8], rate: 1/4},
    enemy_walk_up: {frames: [9, 10, 11], rate: 1/4},
	enemy_hit: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "seguir"},
	enemy_die: {frames: [1, -1, 1, -1, 1, -1, 1, -1, 1], loop:false, rate: 1/6, trigger: "destroy"}
  });

  var boss = Q.Sprite.extend("Boss",{
    init: function(p){

      p.tipo = "fuego";

      this._super(p, {sprite: "bossAnimation", sheet: "boss_"+p.tipo, vx: p.velX, vy: p.velY, gravity: 0, vida: 50, golpeado:false, hitted:false});
      this.add('2d, animation, defaultEnemy');

      this.p.tiempo = 0;
      this.p.tiempoSinLanzar = 0;
      this.p.direction = "down";
	  this.p.cambiarA = Math.floor((Math.random() * 4));
	  this.p.timesUp = Math.floor((Math.random() * 3)) + 4;
	  this.p.matar = false;

      this.on("seguir",function() {
        this.p.hitted = false;
      });
      this.on("destroy",function() {
      	crearHUDConversacion("bossface.png");
		this.p.conversacion = conversacionMago[10];
		Q.state.set("texto_conversacion", this.p.conversacion);
		this.p.matar = true;
      });
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
        color: "black",
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
              		eliminarHUDConversacion();
              		if(Q.state.get("num_conversacion") === 10){
              			Q.state.inc("num_conversacion", 1)
              			cambiarNivel("nivel_final");
              		} else if(Q.state.get("num_conversacion") === 11){
              			cambiarNivel("portales");
              		}
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
	Q.state.reset({ level:"portales"});

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
  Q.state.set("nivel_ant", "portales");
  Q.state.set("texto_monedas", 0);
  Q.state.set("cofres_abiertos", []);
  Q.state.set("llamas_conseguidas", 0);
  Q.state.set("poderes_conseguidos", 0);
  Q.state.set("num_conversacion", 0);
  Q.state.set("inventario", []);
  //Q.audio.play("looperman_opening.ogg", {loop:true});

});

  function cambiarNivel(nivel){
        Q.clearStages();
        console.log(nivel);
        Q.stageScene(nivel);
        Q.stageScene('Pergamino', 1);
        Q.stageScene('HUD', 2);
        Q.stageScene('Corazones', 3);
         Q.state.on("change.texto_vida",function(){;
          Q.clearStage(3);
          Q.stageScene('Corazones', 3);
        });

        //Abrimos todos los cofres del nivel
        var cofres_abiertos_aux = Q.state.get("cofres_abiertos");

        //console.log(Q("Cofre").at(1));

        for(var i = 0; i < Q("Cofre").length; i++){

          var id_aux = Q("Cofre").at(i).p.identificador;

          var posicion = cofres_abiertos_aux.indexOf(id_aux); //Posicion dentro del array de cofres abiertos

          if( posicion != -1){ //Es decir, si existe en la lista de abiertos
            //console.log("cofre " + id_aux + " por abrir. Esta en la posicion "+posicion+" de la lista de cofres abiertos");
            Q("Cofre").at(i).play("cofre_abierto_inicialmente");
            Q("Cofre").at(i).p.abierto = true;
            //console.log("El cofre identificado es: "+Q("Cofre").at(i).p.identificador);
            //Q("Cofre").at(posicion).play("cofre_abierto_inicialmente");
          }
        }
  }


  //Nivel de los portales
  Q.scene("portales", function(stage) {
    Q.stageTMX("Portales.tmx", stage);
    stage.add("viewport");

    Q.state.set("texto_conversacion", "");

    var player, n = 0;

    switch(Q.state.get("nivel_ant")){
    	case "nivel1": n = 1; break;
    	case "NivelFuego": n = 2; break;
      case "NivelAire": n = 3; break;
    }

    player = Q("Player").at(n);


    for (var i = 0; i <= 5; i++) {
    	if(n !== i)
    		Q("Player").at(i).destroy();
    }

    if(Q.state.get("poderes_conseguidos") > 4){
      Q("Personaje").at(0).destroy();
    }

    stage.insert(new llama({x:600, y:150, tipo:0}));
    stage.insert(new llama({x:600, y:200, tipo:1}));
    stage.insert(new llama({x:600, y:250, tipo:2}));
    stage.insert(new llama({x:600, y:300, tipo:3}));


    stage.follow(player);
    Q.state.set("nivel_ant", "portales");


  });


  //Nivel de los portales
  Q.scene("Nivel1", function(stage) {
    Q.stageTMX("nivel1.tmx", stage);
    stage.add("viewport");


    var player = Q("Player").at(0);

    stage.follow(Q("Player").at(0));

    Q.state.set("texto_conversacion", "");
    Q.state.set("nivel_ant", "nivel1");

  });


  //Nivel de boss final
  Q.scene("nivel_final", function(stage) {
    Q.stageTMX("nivel_final.tmx", stage);
    stage.add("viewport");


    var player = Q("Player").at(0);

    stage.follow(Q("Player").at(0));

    Q.state.set("texto_conversacion", "");
    Q.state.set("nivel_ant", "nivel_final");

    var p = Q("Player").at(0);

  });

  //Nivel de fuego en el que tendremos todos los objetos y el poder del fuego
  Q.scene("NivelFuego", function(stage) {
	  Q.stageTMX("nivel_fuego.tmx", stage);
	  stage.add("viewport");

    Q.state.set("texto_conversacion", "");
    var player = Q("Player").at(0);
	  stage.follow(player);


    Q.state.set("nivel_ant", "NivelFuego");

  });
  //Nivel aire
  Q.scene("NivelAire", function(stage) {
    Q.stageTMX("nivel_aire.tmx", stage);
    stage.add("viewport");

    Q.state.set("texto_conversacion", "");
    var player = Q("Player").at(0);
    stage.follow(player);


    Q.state.set("nivel_ant", "NivelAire");

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

    container2.insert(new Q.Monedas({
        x: Q.width-50,
        y: 60,
    }));

    container2.fit(10);

    var container3 = stage.insert(new Q.UI.Container({
      x: 0,
      y: 0,
      w: Q.width,
      h: Q.height
    }));
    container3.insert(new Q.Conversacion({
        x: Q.width/2 +30,
        y: Q.height-70,

    }));

  });

Q.scene('Corazones',function(stage) {
    var container4 = Q.stage(3).insert(new Q.UI.Container({
      x: 0,
      y: 0,
      w: Q.width,
      h: Q.height
    }));
          var vidas_llenas = Q.state.get("texto_vida")/20;
          var resto = Q.state.get("texto_vida")%20;
          var vidas_totales  =  5;
          var vidas_vacias = vidas_totales - vidas_llenas;
          var posicion = 0;

         
            for(var i = 0; i < vidas_llenas; i++){
              container4.insert(new Q.UI.Button({
                x: posicion*32 + 32,
                y: 32,
                sheet:"corazon_lleno"
              }));
              posicion++;
            }
            if(resto !== 0){
              posicion--;
              container4.insert(new Q.UI.Button({
                x: posicion*32 + 32,
                y: 32,
                sheet:"corazon_semi"
              }));
              posicion++;
              vidas_vacias--;
            }
            for(var i = 0; i < vidas_vacias; i++){
              container4.insert(new Q.UI.Button({
                x: posicion*32 + 32,
                y: 32,
                sheet:"corazon_vacio"
              }));
              posicion++;
            }

  
  
});

  Q.scene('Pergamino',function(stage) {

});
function crearHUDConversacion(face){
  var container4 = Q.stage(1).insert(new Q.UI.Container({
      x: 0,
      y: 0,
      w: Q.width,
      h: Q.height
    }));
    container4.insert(new Q.UI.Button({
      x: Q.width/2,
      y: Q.height+25,
      asset: "Pergamino.png"
    }));
    container4.insert(new Q.UI.Button({
      x: 50,
      y: Q.height-50,
      asset: face
    }));


  }
  function eliminarHUDConversacion(){
    Q.clearStage(1);
    Q.stageScene('pergamino', 1);
  }



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

  //Definimos la etiqueta de las monedas (variable global del juego) que se actualizara en el HUD
  Q.UI.Text.extend("Monedas",{
    init: function(p) {

      this._super(p,{
        label: "Monedas: " + Q.state.get("texto_monedas").toFixed(0),
        color: "red",
        size: 12,
        x: 0,
        y: 0
      });

      Q.state.on("change.texto_monedas",this,"update_monedas");
    },
    update_monedas: function(monedas) {
        this.p.label = "Monedas: " + monedas.toFixed();
    }
  });


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIN HUD
//FIN HUD
//FIN HUD
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cargamos recursos y lo necesario para el menu del titulo
var recursos = 'character.png , character.json , mi_seleccion.png, mi_seleccion.json, galeria.png, galeria2.png, '+
'Intro.png, mago.png, mago.json, murcielago.png, murcielago.json, portales.png, portales.json, monster_die.ogg , Jarron_roto.ogg, magia.ogg, chest_openning.ogg, looperman_opening.ogg, '+
'break_grass.ogg, turn_off_fire.ogg, bones.png, esqueleto.json,  Pergamino.png , magoface.png, bossface.png, bossFinal.png, bossFinal.json, corazones.png, corazones.json, Demon.png, Demon.json';

Q.load( recursos , function(){

 Q.clearStages();
 Q.compileSheets("character.png", "character.json");
 Q.compileSheets("mago.png", "mago.json");
 Q.compileSheets("bossFinal.png", "bossFinal.json");
 Q.compileSheets("mi_seleccion.png", "mi_seleccion.json");
 Q.compileSheets("murcielago.png", "murcielago.json");
 Q.compileSheets("Demon.png", "Demon.json");
 Q.compileSheets("bones.png", "esqueleto.json");
 Q.compileSheets("portales.png", "portales.json");
 Q.compileSheets("corazones.png", "corazones.json");
 Q.sheet("intro","Intro.png", { tilew: 420, tileh: 420 });

  //Cargamos el contenido del TMX
 Q.loadTMX("nivel_fuego.tmx, Portales.tmx, nivel1.tmx, nivel_final.tmx, nivel_aire.tmx", function() {
   Q.stageScene("startGame");
 });

});

}
