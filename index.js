/**
 * @name My Babies
 * @author <amanumrao333@gmail.com>
 * @site https://amanraox.github.io/
 */
let width;
let height
let mouseX;
let mouseY;
const FLEE_RADIUS = 100;

window.onload = function () {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight - 5;

  const verly = new Verly(16, canvas, ctx);

  let boids = [];
  for (let i = 0; i < 100; i++) {
    boids.push(new Boid(Math.random() * width, Math.random() * height, 5, verly))
  }


  // mouse 
  window.addEventListener('mousemove', function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY
  })


  function animate() {
    let grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
    grd.addColorStop(0, "rgba(0, 0, 0, 1)");
    grd.addColorStop(1, "rgba(0, 0, 0, 1)");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    for (const b of boids) {
      b.update()
      b.applyFlock(boids);
      b.boundaries();
      b.render(ctx);
    }

    verly.update();
    verly.render();
    verly.interact();

    // mouse
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
    ctx.arc(mouseX, mouseY, FLEE_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    requestAnimationFrame(animate);
  }
  animate();

}
