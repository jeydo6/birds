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

        this.position.x = this.#wrapPosition(this.position.x + Math.cos(rotation) * this.speed);
        this.position.y = this.#wrapPosition(this.position.y - Math.sin(rotation) * this.speed);
    }

    processVision(foods) {
        const vision = this.eye.processVision(this.position, this.rotation, foods);
        // const response = this.#brain.propagate(vision);

        return this.brain.propagate(vision);
    }

    calculateDistance(food) {
        return this.eye.calculateDistance(this.position, food.position);
    }

    #wrapPosition(value) {
        if (value > 1.0) return value - 1.0;
        else if (value < 0.0) return value + 1.0;
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

    constructor(range, angle, cellsCount) {
        this.range = range;
        this.angle = angle;
        this.cellsCount = cellsCount;
    }

    processVision(position, rotation, foods) {

        const angleStep = this.angle / this.cellsCount;

        const cells = new Array(this.cellsCount);
        for (let i = 0; i < this.cellsCount; i++) {
            cells[i] = 0;
        }

        for (const food of foods) {
            const distance = this.calculateDistance(position, food.position);
            if (distance > this.range)
                continue;

            const angle = this.#wrapAngle(this.calculateAngle(position, food.position) - rotation * 2.0 * Math.PI);
            if (angle < -this.angle / 2.0 || angle > this.angle / 2.0)
                continue;

            const normAngle = angle + this.angle / 2.0;
            for (let i = 0.0; i < this.cellsCount; i++) {
                if (normAngle >= i * angleStep && normAngle <= (i + 1) * angleStep) {
                    cells[this.cellsCount - 1 - i] += (this.range - distance) / this.range;
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

    #wrapAngle(value) {
        if (value > Math.PI) return 2.0 * Math.PI - value;
        else if (value < -Math.PI) return 2.0 * Math.PI + value;
        else return value;
    }

    static fromJson(json) {
        const range = json.range;
        const angle = json.angle;
        const cellsCount = json.cellsCount;

        return new Eye(range, angle, cellsCount);
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
