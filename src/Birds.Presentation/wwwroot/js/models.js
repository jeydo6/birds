class World {
    constructor(animals, foods) {
        this.animals = animals;
        this.foods = foods;
    }

    process() {
        this.#processCollisions();
        this.#processBrains();
        this.#processMovements();
    }

    #processBrains() {
        for (const animal of this.animals) {
            animal.processVision(this.foods);
        }
    }

    #processMovements() {
        for (const animal of this.animals) {
            animal.processMovement();
        }
    }

    #processCollisions() {
        for (const animal of this.animals) {
            for (const food of this.foods) {

                const distance =  animal.calculateDistance(food);
                if (distance <= 0.02) {
                    food.position.x = Math.random();
                    food.position.y = Math.random();
                }
            }
        }
    }

    static fromJson(json) {

        const animals = [];
        for (const jsonAnimal of json.animals) {
            animals.push(Animal.fromJson(jsonAnimal));
        }

        const foods = [];
        for (const jsonFood of json.foods) {
            foods.push(Food.fromJson(jsonFood));
        }

        return new World(animals, foods);
    }
}

class Animal {

    constructor(position, rotation, speed, eye, brain) {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.eye = eye;
        this.brain = brain;
    }

    processMovement() {
        const rotation = this.rotation * Math.PI * 2.0;

        this.position.x = this.#wrap(this.position.x + Math.cos(rotation) * this.speed, Animal.POSITION_MIN, Animal.POSITION_MAX);
        this.position.y = this.#wrap(this.position.y - Math.sin(rotation) * this.speed, Animal.POSITION_MIN, Animal.POSITION_MAX);
    }

    processVision(foods) {
        const vision = this.eye.processVision(this.position, this.rotation, foods);
        const response = this.brain.propagate(vision);

        const speedAcceleration = this.#clamp(response[0], -Animal.SPEED_ACCELERATION, Animal.SPEED_ACCELERATION);
        const rotationAcceleration = this.#clamp(response[1], -Animal.ROTATION_ACCELERATION, Animal.ROTATION_ACCELERATION);

        this.speed = this.#clamp(this.speed + speedAcceleration, Animal.SPEED_MIN, Animal.SPEED_MAX);
        this.rotation = this.#wrap(this.rotation + rotationAcceleration, Animal.ROTATION_MIN, Animal.ROTATION_MAX);
    }

    calculateDistance(food) {
        return this.eye.calculateDistance(this.position, food.position);
    }

    #wrap(value, minValue, maxValue) {
        if (value >= maxValue) return value - (maxValue - minValue);
        else if (value < minValue) return value + (maxValue - minValue);
        else return value;
    }

    #clamp(value, minValue, maxValue) {
        if (value < minValue) return minValue
        else if (value > maxValue) return maxValue
        else return value;
    }

    static fromJson(json) {
        const position = Point.fromJson(json.position);
        const rotation = json.rotation
        const speed = json.speed;

        const eye = Eye.fromJson(json.eye);
        const brain = NeuralNetwork.fromJson(json.brain);

        return new Animal(position, rotation, speed, eye, brain);
    }
}

class Food {

    constructor(position) {
        this.position = position;
    }

    static fromJson(json) {
        const position = Point.fromJson(json.position);

        return new Food(position);
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromJson(json) {
        const x = json.x;
        const y = json.y;

        return new Point(x, y);
    }
}

class Eye {

    constructor(fovRange, fovAngle, cellsCount) {
        this.fovRange = fovRange;
        this.fovAngle = fovAngle;
        this.cellsCount = cellsCount;
    }

    processVision(position, rotation, foods) {

        const angleStep = this.fovAngle / this.cellsCount;

        const cells = new Array(this.cellsCount);
        for (let i = 0; i < this.cellsCount; i++) {
            cells[i] = 0;
        }

        for (const food of foods) {
            const distance = this.calculateDistance(position, food.position);
            if (distance > this.fovRange)
                continue;

            const angle = this.#wrap(this.calculateAngle(position, food.position) - rotation * Eye.MAX_ANGLE, Eye.MIN_ANGLE, Eye.MAX_ANGLE);
            const normAngle = this.#wrap(angle + this.fovAngle / 2.0, Eye.MIN_ANGLE, Eye.MAX_ANGLE);
            if (normAngle > this.fovAngle)
                continue;

            for (let i = 0.0; i < this.cellsCount; i++) {
                if (normAngle >= i * angleStep && normAngle <= (i + 1) * angleStep) {
                    cells[this.cellsCount - 1 - i] += (this.fovRange - distance) / this.fovRange;
                    break;
                }
            }
        }

        return cells;
    }

    calculateDistance(position1, position2) {
        const dx = position2.x - position1.x;
        const dy = position2.y - position1.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    calculateAngle(position1, position2) {
        const dx = position2.x - position1.x;
        const dy = position2.y - position1.y;

        return Math.atan2(-dy, dx);
    }

    #wrap(value, minValue, maxValue) {
        if (value >= maxValue) return value - (maxValue - minValue);
        else if (value < minValue) return value + (maxValue - minValue);
        else return value;
    }

    static fromJson(json) {
        const fovRange = json.fovRange;
        const fovAngle = json.fovAngle;
        const cellsCount = json.cellsCount;

        return new Eye(fovRange, fovAngle, cellsCount);
    }
}

class NeuralNetwork {

    constructor(layers) {
        this.layers = layers;
    }

    propagate(inputs) {

        let outputs = inputs;
        for (let i = 0; i < this.layers.length; i++) {
            outputs = this.layers[i].propagate(outputs);
        }

        return outputs;
    }

    static fromJson(json) {
        const layers = [];
        for (const jsonLayer of json.layers) {
            layers.push(Layer.fromJson(jsonLayer));
        }

        return new NeuralNetwork(layers);
    }
}

class Layer {

    constructor(neurons) {
        this.neurons = neurons;
    }

    propagate(inputs) {

        const outputs = new Array(this.neurons.length);
        for (let i = 0; i < outputs.length; i++) {
            outputs[i] = this.neurons[i].propagate(inputs);
        }

        return outputs;
    }

    static fromJson(json) {

        const neurons = [];
        for (const jsonNeuron of json.neurons) {
            neurons.push(Neuron.fromJson(jsonNeuron));
        }

        return new Layer(neurons);
    }
}

class Neuron {

    constructor(bias, weights) {
        this.bias = bias;
        this.weights = weights;
    }

    propagate(inputs) {

        if (inputs.length !== this.weights.length) {
            throw new Error("Количество входных параметров не равно количеству весов");
        }

        let output = this.bias;
        for (let i = 0; i < inputs.length; i++) {
            output += inputs[i] * this.weights[i];
        }

        return output > 0 ? output : 0;
    }

    static fromJson(json) {

        const bias = json.bias;

        const weights = [];
        for (const jsonWeight of json.weights) {
            weights.push(jsonWeight);
        }

        return new Neuron(bias, weights);
    }
}
