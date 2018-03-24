import * as Calculations from "./Calculations";
import { EnemyShip } from "./classes/EnemyShip";
import { Entity } from "./classes/Entity";
import { InputController } from "./classes/InputController";
import * as Laser from "./classes/Laser";
import { PlayerShip } from "./classes/PlayerShip";
import { Playlist } from "./classes/Playlist";
import { RenderObject } from "./classes/RenderObject";
import { SoundPool } from "./classes/SoundPool";
import "./ErrorHandler";
import { UserInterface } from "./UserInterface";

const Firefly = new PlayerShip();
const enemies = 12;
const gameObjects = RenderObject.getObjectList();
const playlist = [
  "sound/music/ambientmain_0.ogg",
  "sound/music/dark_fallout.ogg",
  "sound/music/last_stand_in_space.ogg",
  "sound/music/dust.mp3"
];
const backgroundAudio = new Playlist(playlist, 0.2, true);

const canvas = document.createElement("canvas");
const renderingContext = canvas.getContext("2d") as CanvasRenderingContext2D;

RenderObject.setRenderContext(renderingContext);
Laser.setRenderContext(renderingContext);

const backgroundImage = new Image();
backgroundImage.src = "images/bg.jpg";

InputController.init();

// Initialize game.
document.addEventListener("DOMContentLoaded", () => {
  //backgroundAudio.play();

  // disableKeys([KEYS.F1, KEYS.F5]);
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  for (let i = 0; i < enemies; i++) {
    // tslint:disable-next-line:no-unused-expression
    new EnemyShip(
      undefined,
      Calculations.getRandomPointOnCanvas(renderingContext)
    );
  }

  // Delay start till ship ready.
  window.setTimeout(gameLoop, 100);
});

const objectList = RenderObject.getObjectList();
const entityList = Entity.getEntityList();

let runGame = true;
function gameLoop() {
  if (!runGame) {
    return;
  }

  requestAnimationFrame(gameLoop);

  renderingContext.clearRect(0, 0, canvas.width, canvas.height);
  renderingContext.drawImage(backgroundImage, 0, 0);

  objectList.forEach(o => o.update());

  // Deal impact damage
  entityList.forEach(e => {
    if (e.impactDamage) {
      const colliders = entityList.forEach(i => {
        if (e.isCollidingWith(i)) {
          i.health -= e.impactDamage;
        }
      });
    }
  });

  UserInterface.showHealth(renderingContext, Firefly);
}

//InputController.bindKey("Escape", UserInterface.toggleMenu);
InputController.bindKey("Escape", togglePause);

function newGame() {
  window.location.reload();
}

function togglePause() {
  runGame = !runGame;
  gameLoop();
}
