import { addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './todoHelpers';

test('addTodo should added the passed todo to the list', () => {
	const startTodo = [
		{id: 1, text: 'some todo', isComplete: false},
		{id: 2, text: 'other todo', isComplete: false}
	];

	const newTodo = {id: 3, text: 'new todo', isComplete: false};

	const expectedTodo = [
		{id: 1, text: 'some todo', isComplete: false},
		{id: 2, text: 'other todo', isComplete: false},
		{id: 3, text: 'new todo', isComplete: false}
	];

	const resutl = addTodo(startTodo, newTodo);

	expect(resutl).toEqual(expectedTodo);
});

test('addTodo should not mutate the orginal list', () => {
	const startTodo = [
		{id: 1, text: 'some todo', isComplete: false},
		{id: 2, text: 'other todo', isComplete: false}
	];

	const newTodo = {id: 3, text: 'new todo', isComplete: false};

	const expectedTodo = [
		{id: 1, text: 'some todo', isComplete: false},
		{id: 2, text: 'other todo', isComplete: false},
		{id: 3, text: 'new todo', isComplete: false}
	];

	const resutl = addTodo(startTodo, newTodo);

	expect(resutl).not.toBe(startTodo);
});

test('findById should return the expected item from an array', () => {
	const startTodos = [
		{id:1 , text: 'first todo', isComplete:false},
		{id:2 , text: 'second todo', isComplete:false},
		{id:3 , text: 'third one todo', isComplete:false}
	];

	const expected = {id:2 , text: 'second todo', isComplete:false};

	const result = findById(2, startTodos);

	expect(result).toEqual(expected);
});

test('toggleTodo should toggle the isComplete prop ot todo', () => {
	const startTodo = {id:2, text:'second todo', isComplete:false};
	const expected = {id:2, text:'second todo', isComplete:true};

	const result = toggleTodo(startTodo);

	expect(result).toEqual(expected);
});

test('toggleTodo should not mutate the original todo', () => {
	const startTodo = {id:2, text:'second todo', isComplete:false};
	const expected = {id:2, text:'second todo', isComplete:true};

	const result = toggleTodo(startTodo);

	expect(result).not.toBe(expected);
});

test('updateTodo should update an item by id', () => {
	const startTodos = [
		{id: 1, text: 'first todo', isComplete: false},
		{id: 2, text: 'second todo', isComplete: false},
		{id: 3, text: 'third todo', isComplete: false}
	];

	const updatedTodo = {id: 2, text: 'second todo', isComplete: true};

	const expectedTodo = [
		{id: 1, text: 'first todo', isComplete: false},
		{id: 2, text: 'second todo', isComplete: true},
		{id: 3, text: 'third todo', isComplete: false}
	];

	const result = updateTodo(startTodos, updatedTodo);

	expect(result).toEqual(expectedTodo);
});

test('updateTodo should not mutate the original array', () => {
	const startTodos = [
		{id: 1, text: 'first todo', isComplete: false},
		{id: 2, text: 'second todo', isComplete: false},
		{id: 3, text: 'third todo', isComplete: false}
	];

	const updatedTodo = {id: 2, text: 'second todo', isComplete: true};
	const expectedTodo = [
		{id: 1, text: 'first todo', isComplete: false},
		{id: 2, text: 'second todo', isComplete: true},
		{id: 3, text: 'third todo', isComplete: false}
	];
	const result = updateTodo(startTodos, updatedTodo);

	expect(result).not.toBe(expectedTodo);	
});

test('remove todo should remove an item by Id', () => {
	const startTodos = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 2 , text: 'second todo', isComplete: false},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const targetId = 2;

	const expectedTodo = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const result = removeTodo(startTodos, targetId);

	expect(result).toEqual(expectedTodo);
});

test('remove todo should not mutate the original array', () => {
	const startTodos = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 2 , text: 'second todo', isComplete: false},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const targetId = 2;

	const result = removeTodo(startTodos, targetId);

	expect(result).not.toBe(startTodos);
});

test('filterTodos should return all items for the root route', () => {
	const startTodos = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 2 , text: 'second todo', isComplete: false},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const result = filterTodos(startTodos, '/');

	expect(result).toBe(startTodos)
});

test('filterTodos should return only completed items for the complete route', () => {
	const startTodos = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 2 , text: 'second todo', isComplete: true},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const expected = [{id: 2 , text: 'second todo', isComplete: true}];

	const result = filterTodos(startTodos, '/complete');

	expect(result).toEqual(expected)
});

test('filterTodos should return only incompleted items for the active route', () => {
	const startTodos = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 2 , text: 'second todo', isComplete: true},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const expected = [
		{id: 1 , text: 'first todo', isComplete: false},
		{id: 3 , text: 'third todo', isComplete: false}
	];

	const result = filterTodos(startTodos, '/active');

	expect(result).toEqual(expected)
});