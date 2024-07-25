const viewport = document.getElementById("viewport");
const viewportWidth = viewport.width;
const viewportHeight = viewport.height;
const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + "px";
viewport.style.height = viewportHeight + "px";

function main() {
    const context = viewport.getContext("2d");
    context.scale(viewportScale, viewportScale);

    const world = World.create();

    setInterval(() => {
        requestAnimationFrame(() => {
            world.process();
            context.drawWorld(world);
        })
    }, 40);
}

main();
