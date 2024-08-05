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

    const simulationService = new SimulationService();

    let totalSatiation = 0;
    let world = await simulationService.createWorld();

    header.innerText = getTitle(world.generation, totalSatiation);
    context.drawWorld(world);

    setInterval(() => {
        requestAnimationFrame(async () => {
            if (world.age > World.AGE_MAX) {
                totalSatiation = await simulationService.getTotalSatiation(world);
                world = await simulationService.evolveWorld(world);

                header.innerText = getTitle(world.generation, totalSatiation);
            }

            world.process();
            context.drawWorld(world);
        })
    }, 40);
}

function getTitle(generation, totalSatiation) {
    return `Generation ${generation} (${totalSatiation})`;
}

main().then();
