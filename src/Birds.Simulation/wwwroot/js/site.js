const header = document.getElementById("header");
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

    const simulation = new Simulation();

    setInterval(() => {
        requestAnimationFrame(async () => {
            await simulation.process();

            setHeader(simulation.getTitle());
            context.drawWorld(simulation.world);
        })
    }, 40);
}

function setHeader(title) {
    if (header.innerText !== title) {
        header.innerText = title;
    }
}

main().then();
