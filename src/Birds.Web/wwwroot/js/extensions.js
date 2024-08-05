/**
 *
 * @param {World} world
 */
CanvasRenderingContext2D.prototype.drawWorld = function (world) {
    this.clearRect(0, 0, viewportWidth, viewportHeight);

    for (const animal of world.animals) {
        this.drawAnimal(animal);
    }

    for (const food of world.foods) {
        this.drawFood(food);
    }
};

/**
 *
 * @param {Animal} animal
 */
CanvasRenderingContext2D.prototype.drawAnimal = function (animal) {
    const x = animal.position.x * viewportWidth;
    const y = animal.position.y * viewportHeight;
    const size = 0.02 * viewportWidth;
    const rotation = animal.rotation * Math.PI * 2.0;

    this.beginPath();

    this.moveTo(
        x + Math.cos(rotation) * size * 1.5,
        y - Math.sin(rotation) * size * 1.5
    );

    this.lineTo(
        x + Math.cos(rotation + 2.0 / 3.0 * Math.PI) * size,
        y - Math.sin(rotation + 2.0 / 3.0 * Math.PI) * size
    );

    this.lineTo(
        x + Math.cos(rotation + 4.0 / 3.0 * Math.PI) * size,
        y - Math.sin(rotation + 4.0 / 3.0 * Math.PI) * size
    );

    this.lineTo(
        x + Math.cos(rotation) * size * 1.5,
        y - Math.sin(rotation) * size * 1.5
    );

    this.strokeStyle = "rgb(107, 142, 35)";
    this.stroke();
};

/**
 *
 * @param {Food} food
 */
CanvasRenderingContext2D.prototype.drawFood = function (food) {

    const x = food.position.x * viewportWidth;
    const y = food.position.y * viewportHeight;
    const radius = 0.005 * viewportWidth;

    this.beginPath();

    this.arc(x, y, radius, 0, Math.PI * 2.0);

    this.fillStyle = "rgb(255, 36, 0)";
    this.fill();
};

// Цвета
// - Бирюзовый (Turquoise) - RGB: (64, 224, 208)
// - Индиго (Indigo) - RGB: (75, 0, 130)
// - Лазурный (Azure) - RGB: (240, 255, 255)
// - Охра (Ochre) - RGB: (204, 119, 34)
// - Малахитовый (Malachite) - RGB: (11, 218, 81)
// - Алый (Scarlet) - RGB: (255, 36, 0)
// - Шафрановый (Saffron) - RGB: (244, 196, 48)
// - Аметистовый (Amethyst) - RGB: (153, 102, 204)
// - Сиенна (Sienna) - RGB: (160, 82, 45)
// - Лавандовый (Lavender) - RGB: (230, 230, 250)
// - Хаки (Khaki) - RGB: (195, 176, 145)
// - Фуксия (Fuchsia) - RGB: (255, 0, 255)
// - Шоколадный (Chocolate) - RGB: (210, 105, 30)
// - Болотный (Olive Drab) - RGB: (107, 142, 35)
