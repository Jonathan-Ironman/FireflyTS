import { Entity } from "../classes/Entity";
export const UserInterface = {
  showStats(ctx: CanvasRenderingContext2D, entity: Entity) {
    const healthBarWidth = ctx.canvas.width * entity.health / entity.maxHealth;
    const shieldBarWidth = ctx.canvas.width * entity.shield / entity.maxShield;

    // Small bar on top of canvas.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, 6);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, healthBarWidth, 2);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 3, shieldBarWidth, 2);
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
