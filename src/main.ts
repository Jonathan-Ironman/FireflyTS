import { EnemyShip } from "./classes/EnemyShip";
import { Entity } from "./classes/Entity";
import * as Laser from "./classes/Laser";
import { Parallax } from "./classes/Parallax";
import { PlayerShip } from "./classes/PlayerShip";
import { Playlist } from "./classes/Playlist";
import { RenderObject } from "./classes/RenderObject";
import * as Calculations from "./helpers/Calculations";
import { InputController } from "./helpers/InputController";
import { UserInterface } from "./helpers/UserInterface";

const canvas = document.createElement("canvas");
const renderingContext = canvas.getContext("2d") as CanvasRenderingContext2D;

RenderObject.setRenderContext(renderingContext);
Laser.setRenderContext(renderingContext);
Parallax.setRenderContext(renderingContext);

let _ = new Parallax(1.05, "images/repeat.png");
_ = new Parallax(4, "images/stars.png");
_ = new Parallax(32, "images/stars.png");
const Firefly = new PlayerShip();
const enemies = 5;
const gameObjects = RenderObject.getObjectList();
const playlist = [
  "sound/music/ambientmain_0.ogg",
  "sound/music/dark_fallout.ogg",
  "sound/music/last_stand_in_space.ogg",
  "sound/music/dust.mp3"
];
const backgroundAudio = new Playlist(playlist, 0.2, true);

InputController.init();

// Initialize game.
document.addEventListener("DOMContentLoaded", () => {
  // backgroundAudio.play();

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

  objectList.forEach(o => o.update());

  // Deal impact damage
  entityList.forEach(e => {
    const colliders = entityList.forEach(i => {
      if (e.isCollidingWith(i)) {
        i.status.colliding = 1;
        i.health -= e.impactDamage;
      }
    });
  });

  UserInterface.showStats(renderingContext, Firefly);
}

// InputController.bindKey("Escape", UserInterface.toggleMenu);
InputController.bindKeyUp("Escape", togglePause);

function newGame() {
  window.location.reload();
}

function togglePause() {
  runGame = !runGame;
  gameLoop();
}
