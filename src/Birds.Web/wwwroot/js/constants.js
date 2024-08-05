/**
 * Maximum age for the world before it needs to evolve.
 * @type {number}
 */
World.AGE_MAX = 1000;

/**
 * Minimum position value for an animal.
 * @type {number}
 */
Animal.POSITION_MIN = 0.0;

/**
 * Maximum position value for an animal.
 * @type {number}
 */
Animal.POSITION_MAX = 1.0;

/**
 * Minimum rotation value for an animal.
 * @type {number}
 */
Animal.ROTATION_MIN = 0.0;

/**
 * Maximum rotation value for an animal.
 * @type {number}
 */
Animal.ROTATION_MAX = 1.0;

/**
 * Rotation acceleration for an animal.
 * @type {number}
 */
Animal.ROTATION_ACCELERATION = 0.25;

/**
 * Minimum speed for an animal.
 * @type {number}
 */
Animal.SPEED_MIN = 0.001;

/**
 * Maximum speed for an animal.
 * @type {number}
 */
Animal.SPEED_MAX = 0.005;

/**
 * Speed acceleration for an animal.
 * @type {number}
 */
Animal.SPEED_ACCELERATION = 0.002;

/**
 * Minimum angle for the field of view of an eye.
 * @type {number}
 */
Eye.MIN_ANGLE = 0.0;

/**
 * Maximum angle for the field of view of an eye.
 * @type {number}
 */
Eye.MAX_ANGLE = Math.PI * 2.0;
