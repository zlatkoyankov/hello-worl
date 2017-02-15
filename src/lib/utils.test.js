import { partial, pipe } from './utils';

const add = (a, b) => a + b;
const aheadThree = (a, b, c) => a + b + c;
const inc = (num) => num + 1;
const dbl = (num) => num * 2;

test('partial applies the first argument ahead of time', () => {
	const inc = partial(add, 1);
	const result = inc(2);

	expect(result).toBe(3);
});

test('partial applies the myltiple arguents ahead of time', () => {
	const inc = partial(aheadThree, 1, 3);
	const result = inc(2);

	expect(result).toBe(6);
});

test('pipe passes the result of inc to dbl', () => {
	const pipeline = pipe(inc, dbl);
	const result = pipeline(2);
	expect(result).toBe(6);
});

test('pipe passes the result of dbl to inc', () => {
	const pipeline = pipe(dbl, inc);
	const result = pipeline(2);
	expect(result).toBe(5);
});

test('pipe work with more than two functions', () => {
	const pipeline = pipe(add, inc, dbl, inc);
	const result = pipeline(1, 2);

	expect(result).toBe(9);
});