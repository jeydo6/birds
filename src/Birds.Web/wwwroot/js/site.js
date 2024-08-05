/**
 * The header element where generation and total satiation are displayed.
 * @type {HTMLElement}
 */
const header = document.getElementById("header");

/**
 * The viewport element where the world is drawn.
 * @type {HTMLCanvasElement}
 */
const viewport = document.getElementById("viewport");

/**
 * The width of the viewport.
 * @type {number}
 */
const viewportWidth = viewport.width;

/**
 * The height of the viewport.
 * @type {number}
 */
const viewportHeight = viewport.height;

/**
 * The scale factor for the viewport based on the device's pixel ratio.
 * @type {number}
 */
const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;
viewport.style.width = viewportWidth + "px";
viewport.style.height = viewportHeight + "px";

/**
 * The main function that initializes and runs the simulation.
 * @returns {Promise<void>}
 */
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
        });
    }, 40);
}

/**
 * Generates the title text displaying the current generation and total satiation.
 * @param {number} generation - The current generation number.
 * @param {number} totalSatiation - The total satiation value.
 * @returns {string} The title text.
 */
function getTitle(generation, totalSatiation) {
    return `Generation ${generation} (${totalSatiation})`;
}

// Start the main function
main().then();
