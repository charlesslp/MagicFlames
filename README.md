1. Diseño del juego: se puede confeccionar a partir del documento de concepto
entregado anteriormente, ampliando con las nuevas mecánicas añadidas y
explicando mínimamente en qué consisten.
 
Las llamas de la magia es un juego ARPG (una estética similar al clásico “Zelda”) donde nuestro personaje puede moverse libremente por el mapa e ir desbloqueando una serie de habilidades que le ayudarán a avanzar a lo largo del juego.



A. Objetivo del juego: cómo se gana, cómo se pierde.
 
Nuestro objetivo será el de ir superando cada uno de los niveles y recuperar las cuatro llamas de la magia para conseguir ser más fuertes y salvar el mundo de SoftwareLand.
 
Cada uno de los niveles contará con enemigos personalizados, los cuales no intervienen en la historia de nuestro personaje, es decir, no será necesario eliminarlos para continuar, pero sin duda llegarán a ser un estorbo si no lo hacemos.
 
Al final de cada nivel, nos tendremos que enfrentar a un enemigo al que solo le afectarán el poder que hayamos conseguido para pasar dicho nivel.
 
Finalmente, una vez obtengamos todas las llamas de la magia, nos tendremos que enfrentar al enemigo final, que cambiará el tipo de magia que le afecta (cambiará entre rojo, azul, verde y blanco, indicando el tipo de magia que le afecta en ese momento) mientras nos lanza magia de ese tipo. Tras derrotar al boss final, habremos ganado el juego y nos apareceran los creditos.
 
Si a lo largo del juego nos quedamos sin vida, el juego se reiniciará automáticamente desde el principio y habremos perdido la partida.




B. Principales mecánicas
 
Encarnamos a un mago que en un principio no tendrá ningún poder mágico pero que a lo largo de superar las fases iremos superando, desbloqueamos nuevos poderes a cada cual más fuerte que el anterior.
 
Estos poderes son:
	- Fuego: Quema la hierba.
	- Agua: Apaga el fuego.
	- Tierra: Destruye las rocas de los caminos.
	- Aire: Deshace los tornados.
 
Todos ellos dañan a los enemigos.






2. Diseño de la implementación: qué tecnología se ha usado (Quintus u otro
motor), arquitectura y principales componentes.
 
El motor gráfico que hemos utilizado para desarrollar el juego es Quintus, modificando alguna línea de código para adaptarla a nuestro juego.
 
Los componentes que hemos usado para el juego han sido:
 
	- Default Object: Clase de los que heredan los objetos destruibles
		- Hierba: Obstáculo que se elimina con la magia fuego
		- Jarrón: Objeto que crea el objeto vida al ser destruido
		- Fuego: Obstáculo que se elimina con la magia agua
		- Piedra: Obstáculo que se elimina con la magia tierra
		- Tornado: Obstáculo que se elimina con la magia aire
 
	- Default Enemy: El comportamiento de los enemigos es siempre igual, excepto el boss.
		- Murciélagos
		- Arañas
		- Esqueletos
		- Demonios
		- Boss
 
	- Basic Controls: Controles de movimiento del personaje
		- Héroe: Implementa el comportamiento del jugador


Otras clases creadas son:
 
	- Cofre: Obtienes monedas al abrirlo. No hereda de default object puesto que no se destruye tras realizar la acción de abrirse. Además se mantiene una lista de cofres abiertos para evitar repetirlos.
	- Selector: objeto que permite interactuar con el ambiente. Se crea delante del protagonista y al colisionar con los objetos provocará la ejecución de eventos.
	- Portales: Permiten moverte entre los niveles.
	- Magia: La clase magia es el objeto que se dispara, que tendrá un tipo específico de magia (fuego, agua, tierra, aire) que tendrá diversos efectos al colisionar.
	- Maestro: personaje principal con el que dialogar.
	- Corazón: Aumenta la vida del protagonista al colisionar con él.
	- Salida: Similar a los portales, pero siempre abierto.
	- HUD: Muestra la información en la pantalla (vida, mana, monedas, conversaciones…)
	- Llamas: Son los coleccionables que permiten el acceso a los distintos niveles del juego permitiendote avanzar en la historia.







3. Equipo de trabajo y reparto de tareas: descripción del trabajo realizado
por cada uno de los integrantes del grupo y carga de trabajo realizada
(0%-100%)
 
Como ya comentamos en la presentación del proyecto, el trabajo del equipo ha estado muy bien gestionado y organizado, colaborando todos a lo largo de todo el proyecto, ayudándonos cuando uno se quedaba atascado y buscando todos una solución ante un problema que se presentaba. Todos hemos sido conscientes del trabajo realizado por el resto de los compañeros, entendiendo el código y la idea tras él (por ejemplo el selector o los diálogos han sido algunas de los conceptos más complejos de entender) permitiendo modificarlo sin problemas cuando se ha necesitado, evitando que hubiera un especialista en una materia concreta.
 
Destacamos concretamente el trabajo que ha realizado todo el equipo de forma equitativa y eficaz en el proyecto, realizando cada uno un 25% del proyecto.






4. Fuentes y referencias: Referencias a todos los assets no propios utilizados en
la realización del juego. Si se han seguido tutoriales o juegos ya realizados,
detallar cuáles son las partes específicas que han sido implementadas por
los estudiantes durante la realización de este proyecto.
 
Terreno
Hemos obtenido los sprites del terreno de los archivos por defecto del RPG Maker XP
 
Espejos de la entrada a los 4 mundos -> (Credit: Enterbrain, Cvrtis.)
	- https://forums.rpgmakerweb.com/index.php?threads/cvrtis-edits-little-update.49457/
 
Objetos (cofre, hierbajo, arbusto, jarrón, orbes) -> (Credit: Lanea Zimmerman)
	- https://opengameart.org/content/tiny-16-basic
 
Personajes y esqueletos
	- http://junkhunt.net/vx/charachip.shtml
 
Sprites Enemigos -> (Credit:Stephen "Redshrike" Challener)
	- https://opengameart.org/content/1-hour-lpc-enemy
	- https://opengameart.org/content/lpc-imp
 
Todos los sonidos
	- https://freesound.org/
	- https://opengameart.org/   (sonido de murcielago y rotura de jarron)
 
El resto de las imágenes son modificaciones propias realizadas con photoshop o a través de la pagina “http://www.piskelapp.com/” sobre los recursos presentados previamente. De hecho hicimos nuestro propio tileset para acceder más fácilmente a las imágenes.
 
Como tutoriales de Quintus hemos usado la práctica del mario, revisado el codigo de “http://www.html5quintus.com/quintus/examples/platformer_full/” para solucionar problemas y los apuntes de la asignatura.
 
Todo el código ha sido realizado por nosotros.



Para probar el juego se puede hacer a través de este enlace

https://charlesslp.github.io/MagicFlames/