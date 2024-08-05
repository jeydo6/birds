# Birds

Birds is a simulation project that models the behavior of birds in a virtual world. The simulation includes animal movements, vision processing, and interaction with food items.

## Features

- **World Simulation**: Simulate a world with multiple generations of birds.
- **Animal Behavior**: Model bird movements, vision, and interactions.
- **Food Interaction**: Simulate birds finding and consuming food.

## Installation

To get started, clone the repository and open the project directory:

```bash
git clone https://github.com/jeydo6/birds.git
cd birds
```

## Usage

The main simulation logic is handled in `site.js`, which initializes the world and starts the simulation.

### Classes

	•	World: Represents the simulation world containing animals and food.
	•	Animal: Represents a bird with properties such as position, rotation, and speed.
	•	Food: Represents a food item in the world.
	•	Eye: Handles the vision processing for animals.
	•	NeuralNetwork, Layer, Neuron: Used for processing the brain logic of the animals.

### Services

	•	SimulationService: Handles API requests for creating and evolving the world.

### Constants

Constants for the simulation are defined in `constants.js` and include values for maximum age, position bounds, rotation bounds, and speed bounds for animals.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.