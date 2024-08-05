class SimulationService {

    createWorld() {
        const requestOptions = {
            method: "GET"
        };

        return fetch("api/simulation/create-world", requestOptions)
            .then(response => response.json())
            .then(jsonWorld => World.fromJson(jsonWorld));
    }

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

    getTotalSatiation(world) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(world)
        };

        return fetch("api/simulation/get-total-satiation", requestOptions)
            .then(response => response.text());
    }
}
