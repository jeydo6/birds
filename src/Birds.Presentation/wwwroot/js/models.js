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

    static create() {

        // const animalsCount = 1;
        const animalsCount = 40;
        const animals = this.#createAnimals(animalsCount);

        // const foodsCount = 1;
        const foodsCount = 60;
        const foods = this.#createFoods(foodsCount);

        return new World(animals, foods);
    }

    static #createAnimals(count) {

        const animals = new Array(count);
        for (let i = 0; i < count; i++) {
            animals[i] = Animal.create();
        }

        return animals;
    }

    static #createFoods(count) {

        const foods = new Array(count);
        for (let i = 0; i < count; i++) {
            foods[i] = Food.create();
        }

        return foods;
    }
}

class Animal {

    #eye;

    constructor(position, rotation, speed, eye) {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.#eye = eye;
    }

    processMovement() {
        const rotation = this.rotation * Math.PI * 2.0;

        this.position.x = this.#wrapPosition(this.position.x + Math.cos(rotation) * this.speed);
        this.position.y = this.#wrapPosition(this.position.y - Math.sin(rotation) * this.speed);
    }

    processVision(foods) {
        return this.#eye.processVision(this.position, this.rotation, foods);
    }

    calculateDistance(food) {
        return this.#eye.calculateDistance(this.position, food.position);
    }

    #wrapPosition(value) {
        if (value > 1.0) return value - 1.0;
        else if (value < 0.0) return value + 1.0;
        else return value;
    }

    static create() {
        const position = Point.create();
        const rotation = Math.random();
        const speed = 0.002;

        const eye = Eye.create();

        return new Animal(position, rotation, speed, eye);
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

            const angle = this.#wrapAngle(this.calculateAngle(position, food.position) - rotation * 2.0 * Math.PI);
            if (angle < -this.fovAngle / 2.0 || angle > this.fovAngle / 2.0)
                continue;

            const normAngle = angle + this.fovAngle / 2.0;
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

    #wrapAngle(value) {
        if (value > Math.PI) return 2.0 * Math.PI - value;
        else if (value < -Math.PI) return 2.0 * Math.PI + value;
        else return value;
    }

    static create() {
        const fovRange = 0.25;
        const fovAngle = Math.PI / 4;
        const cellsCount = 6;

        return new Eye(fovRange, fovAngle, cellsCount);
    }
}

class Brain {
    // TODO: Implement Network.cs
}

class Food {
    constructor(position) {
        this.position = position;
    }

    static create() {
        const position = Point.create();

        return new Food(position);
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static create() {
        const x = Math.random();
        const y = Math.random();

        return new Point(x, y);
    }
}

// TODO: Create Simulation on Backend-side?
