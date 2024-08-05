class SimulationService {

    async createWorld() {
        const requestOptions = {
            method: "GET"
        };

        return await fetch("api/simulation/create-world", requestOptions)
            .then(response => response.json())
            .then(jsonWorld => World.fromJson(jsonWorld));
    }

    async evolveWorld(world) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(world)
        };

        return await fetch("api/simulation/evolve-world", requestOptions)
            .then(response => response.json())
            .then(jsonWorld => World.fromJson(jsonWorld));
    }

    async getTotalSatiation(world) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(world)
        };

        return await fetch("api/simulation/get-total-satiation", requestOptions)
            .then(response => response.text());
    }
}
