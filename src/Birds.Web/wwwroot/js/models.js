/**
 * Represents the world containing animals and food.
 */
class World {
    /**
     * Creates an instance of World.
     * @param {number} generation - The generation number.
     * @param {Animal[]} animals - The list of animals.
     * @param {Food[]} foods - The list of foods.
     */
    constructor(generation, animals, foods) {
        this.generation = generation;
        this.animals = animals;
        this.foods = foods;

        this.age = 0;
    }

    /**
     * Processes the world for a single time step.
     */
    process() {
        this.#processCollisions();
        this.#processBrains();
        this.#processMovements();

        this.age++;
    }

    /**
     * Processes the brains of all animals.
     * @private
     */
    #processBrains() {
        for (const animal of this.animals) {
            animal.processVision(this.foods);
        }
    }

    /**
     * Processes the movements of all animals.
     * @private
     */
    #processMovements() {
        for (const animal of this.animals) {
            animal.processMovement();
        }
    }

    /**
     * Processes collisions between animals and food.
     * @private
     */
    #processCollisions() {
        for (const animal of this.animals) {
            for (const food of this.foods) {

                const distance = animal.calculateDistance(food);
                if (distance <= 0.02) {
                    animal.satiation++;

                    food.position.x = Math.random();
                    food.position.y = Math.random();
                }
            }
        }
    }

    /**
     * Creates an instance of World from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {number} json.generation - The generation number.
     * @param {Object[]} json.animals - The list of animals.
     * @param {Object[]} json.foods - The list of foods.
     * @returns {World} The World instance.
     */
    static fromJson(json) {
        const generation = json.generation;

        const animals = [];
        for (const jsonAnimal of json.animals) {
            animals.push(Animal.fromJson(jsonAnimal));
        }

        const foods = [];
        for (const jsonFood of json.foods) {
            foods.push(Food.fromJson(jsonFood));
        }

        return new World(generation, animals, foods);
    }
}

/**
 * Represents an animal.
 */
class Animal {
    /**
     * Creates an instance of Animal.
     * @param {Point} position - The position of the animal.
     * @param {number} rotation - The rotation of the animal.
     * @param {number} speed - The speed of the animal.
     * @param {Eye} eye - The eye of the animal.
     * @param {NeuralNetwork} brain - The brain of the animal.
     */
    constructor(position, rotation, speed, eye, brain) {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.eye = eye;
        this.brain = brain;

        this.satiation = 0;
    }

    /**
     * Processes the movement of the animal.
     */
    processMovement() {
        const rotation = this.rotation * Math.PI * 2.0;

        this.position.x = this.#wrap(this.position.x + Math.cos(rotation) * this.speed, Animal.POSITION_MIN, Animal.POSITION_MAX);
        this.position.y = this.#wrap(this.position.y - Math.sin(rotation) * this.speed, Animal.POSITION_MIN, Animal.POSITION_MAX);
    }

    /**
     * Processes the vision of the animal and updates its state based on it.
     * @param {Food[]} foods - The list of foods.
     */
    processVision(foods) {
        const vision = this.eye.processVision(this.position, this.rotation, foods);
        const response = this.brain.propagate(vision);

        const speedAcceleration = this.#clamp(response[0], -Animal.SPEED_ACCELERATION, Animal.SPEED_ACCELERATION);
        const rotationAcceleration = this.#clamp(response[1], -Animal.ROTATION_ACCELERATION, Animal.ROTATION_ACCELERATION);

        this.speed = this.#clamp(this.speed + speedAcceleration, Animal.SPEED_MIN, Animal.SPEED_MAX);
        this.rotation = this.#wrap(this.rotation + rotationAcceleration, Animal.ROTATION_MIN, Animal.ROTATION_MAX);
    }

    /**
     * Calculates the distance between the animal and food.
     * @param {Food} food - The food to calculate the distance to.
     * @returns {number} The distance to the food.
     */
    calculateDistance(food) {
        return this.eye.calculateDistance(this.position, food.position);
    }

    /**
     * Wraps a value around given minimum and maximum values.
     * @private
     * @param {number} value - The value to wrap.
     * @param {number} minValue - The minimum value.
     * @param {number} maxValue - The maximum value.
     * @returns {number} The wrapped value.
     */
    #wrap(value, minValue, maxValue) {
        if (value >= maxValue) return value - (maxValue - minValue);
        else if (value < minValue) return value + (maxValue - minValue);
        else return value;
    }

    /**
     * Clamps a value between given minimum and maximum values.
     * @private
     * @param {number} value - The value to clamp.
     * @param {number} minValue - The minimum value.
     * @param {number} maxValue - The maximum value.
     * @returns {number} The clamped value.
     */
    #clamp(value, minValue, maxValue) {
        if (value < minValue) return minValue;
        else if (value > maxValue) return maxValue;
        else return value;
    }

    /**
     * Creates an instance of Animal from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {Object} json.position - The position of the animal.
     * @param {number} json.rotation - The rotation of the animal.
     * @param {number} json.speed - The speed of the animal.
     * @param {Object} json.eye - The eye of the animal.
     * @param {Object} json.brain - The brain of the animal.
     * @returns {Animal} The Animal instance.
     */
    static fromJson(json) {
        const position = Point.fromJson(json.position);
        const rotation = json.rotation;
        const speed = json.speed;

        const eye = Eye.fromJson(json.eye);
        const brain = NeuralNetwork.fromJson(json.brain);

        return new Animal(position, rotation, speed, eye, brain);
    }
}

/**
 * Represents a food item.
 */
class Food {
    /**
     * Creates an instance of Food.
     * @param {Point} position - The position of the food.
     */
    constructor(position) {
        this.position = position;
    }

    /**
     * Creates an instance of Food from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {Object} json.position - The position of the food.
     * @returns {Food} The Food instance.
     */
    static fromJson(json) {
        const position = Point.fromJson(json.position);

        return new Food(position);
    }
}

/**
 * Represents a point in 2D space.
 */
class Point {
    /**
     * Creates an instance of Point.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates an instance of Point from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {number} json.x - The x coordinate.
     * @param {number} json.y - The y coordinate.
     * @returns {Point} The Point instance.
     */
    static fromJson(json) {
        const { x, y } = json;

        return new Point(x, y);
    }
}

/**
 * Represents the eye of an animal, responsible for processing vision.
 */
class Eye {
    /**
     * Creates an instance of Eye.
     * @param {number} fovRange - The field of view range.
     * @param {number} fovAngle - The field of view angle.
     * @param {number} cellsCount - The number of cells in the eye.
     */
    constructor(fovRange, fovAngle, cellsCount) {
        this.fovRange = fovRange;
        this.fovAngle = fovAngle;
        this.cellsCount = cellsCount;
    }

    /**
     * Processes the vision based on the position, rotation, and available foods.
     * @param {Point} position - The position of the animal.
     * @param {number} rotation - The rotation of the animal.
     * @param {Food[]} foods - The list of foods.
     * @returns {number[]} The vision cells filled with processed data.
     */
    processVision(position, rotation, foods) {
        const angleStep = this.fovAngle / this.cellsCount;

        const cells = new Array(this.cellsCount).fill(0);

        for (const food of foods) {
            const distance = this.calculateDistance(position, food.position);
            if (distance > this.fovRange)
                continue;

            const angle = this.#wrap(this.calculateAngle(position, food.position) - rotation * Eye.MAX_ANGLE, Eye.MIN_ANGLE, Eye.MAX_ANGLE);
            const normAngle = this.#wrap(angle + this.fovAngle / 2.0, Eye.MIN_ANGLE, Eye.MAX_ANGLE);
            if (normAngle > this.fovAngle)
                continue;

            for (let i = 0; i < this.cellsCount; i++) {
                if (normAngle >= i * angleStep && normAngle <= (i + 1) * angleStep) {
                    cells[this.cellsCount - 1 - i] += (this.fovRange - distance) / this.fovRange;
                    break;
                }
            }
        }

        return cells;
    }

    /**
     * Calculates the distance between two positions.
     * @param {Point} position1 - The first position.
     * @param {Point} position2 - The second position.
     * @returns {number} The distance between the positions.
     */
    calculateDistance(position1, position2) {
        const dx = position2.x - position1.x;
        const dy = position2.y - position1.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculates the angle between two positions.
     * @param {Point} position1 - The first position.
     * @param {Point} position2 - The second position.
     * @returns {number} The angle between the positions.
     */
    calculateAngle(position1, position2) {
        const dx = position2.x - position1.x;
        const dy = position2.y - position1.y;

        return Math.atan2(-dy, dx);
    }

    /**
     * Wraps a value within the given range.
     * @private
     * @param {number} value - The value to wrap.
     * @param {number} minValue - The minimum value.
     * @param {number} maxValue - The maximum value.
     * @returns {number} The wrapped value.
     */
    #wrap(value, minValue, maxValue) {
        if (value >= maxValue) return value - (maxValue - minValue);
        else if (value < minValue) return value + (maxValue - minValue);
        else return value;
    }

    /**
     * Creates an instance of Eye from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {number} json.fovRange - The field of view range.
     * @param {number} json.fovAngle - The field of view angle.
     * @param {number} json.cellsCount - The number of cells.
     * @returns {Eye} The Eye instance.
     */
    static fromJson(json) {
        const { fovRange, fovAngle, cellsCount } = json;

        return new Eye(fovRange, fovAngle, cellsCount);
    }
}

/**
 * Represents a neural network.
 */
class NeuralNetwork {
    /**
     * Creates an instance of NeuralNetwork.
     * @param {Layer[]} layers - The layers of the neural network.
     */
    constructor(layers) {
        this.layers = layers;
    }

    /**
     * Propagates inputs through the neural network.
     * @param {number[]} inputs - The input values.
     * @returns {number[]} The output values.
     */
    propagate(inputs) {
        let outputs = inputs;
        for (const layer of this.layers) {
            outputs = layer.propagate(outputs);
        }

        return outputs;
    }

    /**
     * Creates an instance of NeuralNetwork from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {Object[]} json.layers - The layers of the neural network.
     * @returns {NeuralNetwork} The NeuralNetwork instance.
     */
    static fromJson(json) {
        const layers = json.layers.map(
            layerJson => Layer.fromJson(layerJson)
        );

        return new NeuralNetwork(layers);
    }
}

/**
 * Represents a layer in a neural network.
 */
class Layer {
    /**
     * Creates an instance of Layer.
     * @param {Neuron[]} neurons - The neurons in the layer.
     */
    constructor(neurons) {
        this.neurons = neurons;
    }

    /**
     * Propagates inputs through the layer.
     * @param {number[]} inputs - The input values.
     * @returns {number[]} The output values.
     */
    propagate(inputs) {
        const outputs = new Array(this.neurons.length);
        for (let i = 0; i < outputs.length; i++) {
            outputs[i] = this.neurons[i].propagate(inputs);
        }

        return outputs;
    }

    /**
     * Creates an instance of Layer from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {Object[]} json.neurons - The neurons in the layer.
     * @returns {Layer} The Layer instance.
     */
    static fromJson(json) {
        const neurons = json.neurons.map(
            neuronJson => Neuron.fromJson(neuronJson)
        );

        return new Layer(neurons);
    }
}

/**
 * Represents a neuron in a neural network layer.
 */
class Neuron {
    /**
     * Creates an instance of Neuron.
     * @param {number} bias - The bias of the neuron.
     * @param {number[]} weights - The weights of the neuron.
     */
    constructor(bias, weights) {
        this.bias = bias;
        this.weights = weights;
    }

    /**
     * Propagates inputs through the neuron.
     * @param {number[]} inputs - The input values.
     * @returns {number} The output value.
     */
    propagate(inputs) {
        if (inputs.length !== this.weights.length) {
            throw new Error("The number of inputs does not match the number of weights");
        }

        let output = this.bias;
        for (let i = 0; i < inputs.length; i++) {
            output += inputs[i] * this.weights[i];
        }

        return output > 0 ? output : 0;
    }

    /**
     * Creates an instance of Neuron from a JSON object.
     * @param {Object} json - The JSON object.
     * @param {number} json.bias - The bias of the neuron.
     * @param {number[]} json.weights - The weights of the neuron.
     * @returns {Neuron} The Neuron instance.
     */
    static fromJson(json) {
        const { bias, weights } = json;

        return new Neuron(bias, weights);
    }
}
