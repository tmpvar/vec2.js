declare module 'vec2' {
    /**
     * A generic library useful when you need to work with points/vectors in 2d space.
     */
    export default class Vec2 {
        public readonly x: number;
        public readonly y: number;

        /**
         * Add an observer `fn` that will be called whenever this vector changes.  Calling this method without a function causes it to notify observers.
         * `fn` signature: `function(vec, prev) {}` - where `prev` is a clone of the vector before the last operation.
         * this function returns the passed `fn`
         */
        public change(fn?: (vec: Vec2, prev: Vec2) => any): Vec2;

        /**
         * Pass a `fn` to remove it from the observers list. Calling this function without a `fn` will remove all observers.
         */
        public ignore(fn: Function): Vec2;

        /**
         * Sets the `x` and `y` coordinates of this vector.  If `false` is passed for `notify`, none of the observers will be called.
         */
        public set(x: number, y: number, notify?: boolean): Vec2;
        public set(vec: Vec2, notify?: boolean): Vec2;

        /**
         * Sets the `x` and `y` of this vector to `0`
         */
        public zero(): Vec2;

        /**
         * Returns a clone of this vector.
         * _Note_: this does not clone observers
         */
        public clone(): Vec2;

        /**
         * Negate the `x` and `y` coords of this vector.  If `returnNew` is truthy, a new vector with the negated coordinates will be returned.
         */
        public negate(returnNew?: boolean): Vec2;

        /**
         * Add the `x` and `y` to this vector's coordinates.
         * If `returnNew` is truthy, return a new vector containing the resulting coordinates. Otherwise apply them to this vector and return it.
         */
        public add(x: number, y: number, returnNew?: boolean): Vec2;
        public add(vec: Vec2, returnNew?: boolean): Vec2;
        public add(pos: [number, number], returnNew?: boolean): Vec2;

        public subtract(x: number, y: number, returnNew?: boolean): Vec2;
        public subtract(vec: Vec2, returnNew?: boolean): Vec2;
        public subtract(pos: [number, number], returnNew?: boolean): Vec2;

        /**
         * Multiply this vectors components with the incoming, returning a clone if `returnNew` is truthy.
         */
        public multiply(x: number, y: number, returnNew?: boolean): Vec2;
        public multiply(vec: Vec2, returnNew?: boolean): Vec2;
        public multiply(pos: [number, number], returnNew?: boolean): Vec2;
        public multiply(scalar: number, returnNew?: boolean): Vec2;

        /**
         * Divide this vectors components by the incoming, returning a clone if `returnNew` is truthy.
         * _note_: this method will throw if you attempt to divide by zero or pass values that cause NaNs
         */
        public divide(x: number, y: number, returnNew?: boolean): Vec2;
        public divide(vec: Vec2, returnNew?: boolean): Vec2;
        public divide(pos: [number, number], returnNew?: boolean): Vec2;
        public divide(scalar: number, returnNew?: boolean): Vec2;

        /**
         * Rotate this vector's cordinates around `(0,0)`.  If `returnNew` is specified, a new `Vec2` will be created and populated with the result and returned.  Otherwise the result is applied to this vector and `this` is returned.
         * @param radians
         * @param inverse inverts the direction of the rotation
         * @param returnNew causes the result to be applied to a new `Vec2`, otherwise the result is applied to `this`
         */
        public rotate(radians: number, inverse?: boolean, returnNew?: boolean): Vec2;

        /**
         * Returns the length of this vector from `(0,0)`
         */
        public length(): number;

        /**
         * Returns the length of this vector prior to the `Math.sqrt` call.
         * This is usefull when you don't need to know the actual distance, but need a normalized value to compare with another `Vec2#lengthSquared` or similar.
         */
        public lengthSquared(): number;

        /**
         * Distance between this vector and the incoming
         */
        public distance(vec: Vec2): number;

        /**
         * Closest vector in array to this vector.
         */
        public nearest(vecs: Vec2[]): Vec2;

        /**
         * Normalizes this vector.  If `returnNew` is truthy, a new vector populated with the normalized coordinates will be returned.
         */
        public normalize(returnNew?: boolean): Vec2;

        /**
         * returns true if the incoming coordinates are the same as this vector's
         */
        public equal(x: number, y: number): boolean;
        public equal(vec: Vec2): boolean;
        public equal(pos: [number, number]): boolean;

        /**
         * Return a `Vec2` that contains the absolute value of each of this vector's parts.
         * @param returnNew If `returnNew` is truthy, create a new `Vec2` and return it. Otherwise apply the absolute values to to `this`.
         */
        public abs(returnNew?: boolean): Vec2;

        /**
         * Return a `Vec2` consisting of the smallest values from this vector and the incoming
         * When returnNew is truthy, a new `Vec2` will be returned otherwise the minimum values in either this or `vec` will be applied to this vector.
         */
        public min(vec: Vec2): Vec2;

        /**
         * Return a `Vec2` consisting of the largest values from this vector and the incoming
         * When returnNew is truthy, a new `Vec2` will be returned otherwise the maximum values in either `this` or `vec` will be applied to this vector.
         */
        public max(vec: Vec2): Vec2;

        /**
         * Clamp the coordinates of this vector to the high/low of the incoming vec2s.  If `returnNew` apply the result to the new vector and return.  Otherwise apply to this vector.
         */
        public clamp(low: Vec2, high: Vec2, returnNew?: boolean): Vec2;


        /**
         * Perform linear interpolation between this vector and the incoming.
         * @param vec
         * @param amount The percentage along the path to place the vector
         * @param returnNew If `truthy`, apply the result to a new vector and return it, otherwise return `this`
         */
        public lerp(vec: Vec2, amount: number, returnNew?: boolean): Vec2;

        /**
         * Returns a vector set with the `(-y,x)` coordinates of this vector.
         * @param returnNew A new vector is created and the operation is applied to the new vector.
         */
        public skew(returnNew?: boolean): Vec2;

        public dot(): number;

        public perpDot(): number;

        /**
         * returns the angle from this vector to the incoming.
         */
        public angleTo(vec: Vec2): number;

        /**
         * where `start` and `end` are vec2-like (e.g. `start.x` and `start.y`)
         */
        public isPointOnLine(start: { x: number, y: number }, end: { x: number, y: number }): boolean;

        /**
         * @return `[x, y]`
         */
        public toArray(): [number, number];

        /**
         * Applies the `[0]` to `this.x` and `[1]` to `this.y`
         */
        public fromArray(arr: [number, number]): Vec2;

        /**
         * @return `{ x: ..., y: ...}`
         */
        public toJson(): { x: number, y: number };

        /**
         * @return `'(x, y)'`
         */
        public toString(): string;

        constructor(x?: number, y?: number);
        constructor(xy: number[]);
    }

}
