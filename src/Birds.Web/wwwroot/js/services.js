/**
 * A service for managing the simulation of the world.
 */
class SimulationService {

    /**
     * Creates a new world by making a GET request to the API.
     * @returns {Promise<World>} A promise that resolves to a new World instance.
     */
    createWorld() {
        const requestOptions = {
            method: "GET"
        };

        return fetch("api/simulation/create-world", requestOptions)
            .then(response => response.json())
            .then(jsonWorld => World.fromJson(jsonWorld));
    }

    /**
     * Evolves the given world by making a POST request to the API.
     * @param {World} world - The world to evolve.
     * @returns {Promise<World>} A promise that resolves to an evolved World instance.
     */
    evolveWorld(world) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(world)
        };

        return fetch("api/simulation/evolve-world", requestOptions)
            .then(response => response.json())
            .then(jsonWorld => World.fromJson(jsonWorld));
    }

    /**
     * Gets the total satiation of the given world by making a POST request to the API.
     * @param {World} world - The world to get the total satiation of.
     * @returns {Promise<number>} A promise that resolves to the total satiation as a string.
     */
    getTotalSatiation(world) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(world)
        };

        return fetch("api/simulation/get-total-satiation", requestOptions)
            .then(response => response.text())
            .then(totalSatiationStr => parseInt(totalSatiationStr));
    }
}
