const viewport = document.getElementById("viewport");
const viewportWidth = viewport.width;
const viewportHeight = viewport.height;
const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + "px";
viewport.style.height = viewportHeight + "px";

async function main() {
    const context = viewport.getContext("2d");
    context.scale(viewportScale, viewportScale);

    const world = await fetch("api/world")
        .then(response => response.json())
        .then(jsonWorld => World.fromJson(jsonWorld));

    setInterval(() => {
        requestAnimationFrame(() => {
            world.process();
            context.drawWorld(world);
        })
    }, 100);
}

main().then();
