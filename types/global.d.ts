declare module 'vec2' {
	export default class Vec2 {
		public x: number
		public y: number
		public length: () => number
		public lengthSquared: () => number
		public distance: (vec: Vec2) => number
		public nearest: (vecs: Vec2[]) => Vec2
		public clone: () => Vec2
		public set: (
			((x: number, y: number) => Vec2) &
			((vec: Vec2) => Vec2)
		)
		public zero: () => Vec2
		public negate: (returnNew?: boolean) => Vec2
		public normalize: (returnNew?: boolean) => Vec2
		public add: addSub
		public subtract: addSub
		public multiply: mulDiv
		public divide: mulDiv
		public rotate: (radians: number, inverse?: boolean, returnNew?: boolean) => Vec2
		public angleTo: (vec: Vec2) => number
		public change: (fn: any) => void
		public ignore: (fn: any) => void
		public equal: (
			((x: number, y: number) => Vec2) &
			((vec: Vec2) => Vec2) &
			((pos: [number, number]) => Vec2)
		)
		public abs: (returnNew?: boolean) => Vec2
		public min: (vec: Vec2) => Vec2
		public max: (vec: Vec2) => Vec2
		public clamp: (low: Vec2, high: Vec2, returnNew?: boolean) => Vec2
		public lerp: (vec: Vec2, amount: number, returnNew?: boolean) => Vec2
		public skew: (returnNew?: boolean) => Vec2
		public dot: () => number
		public perpDot: () => number
		public isPointOnLine: (start: {x: number, y: number}, end: {x: number, y: number}) => boolean
		public toArray: () => [number, number]
		public fromArray: (arr: [number, number]) => Vec2
		public toJson: () => {x: number, y: number}
		public toString: () => string
		constructor(x?: number, y?: number)
	}

	type addSub = (
		((x: number, y: number, returnNew?: boolean) => Vec2) &
		((vec: Vec2, returnNew?: boolean) => Vec2) &
		((pos: [number, number], returnNew?: boolean) => Vec2)
	)

	type mulDiv = (
		(addSub) &
		((scalar: number, returnNew?: boolean) => Vec2)
	)
}
