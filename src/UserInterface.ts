import { Entity } from "./classes/Entity";
export const UserInterface = {
  showHealth(ctx: CanvasRenderingContext2D, entity: Entity) {
    const width = ctx.canvas.width * entity.health / entity.maxHealth;

    // Small bar on top of canvas.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, 4);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 1, width, 2);
  },
  hideMenu() {
    $(".menu").hide();
  },
  showMenu() {
    $(".menu").show();
  },
  toggleMenu() {
    $(".menu").toggle();
  }
};
