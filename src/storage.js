export default class Storage {
	constructor(key) {
		this.key = key;
		if (!localStorage[key]) {
			let data = {
				todos: [],
			};

			localStorage.setItem(key, JSON.stringify(data));
		}
	}

	read() {
		return JSON.parse(localStorage.getItem(this.key)).todos;
	}

	save(toDoData, id, isEdit = false) {
		let data = JSON.parse(localStorage.getItem(this.key));
		let toDos = data.todos;

		if (id) { // update
			let targetIndex = -1;
			toDos.forEach((todo, index) => {
				if (todo.id === id) {
					for (const key in toDoData) {
						todo[key] = toDoData[key];
					}
					targetIndex = index;
				}
			});

			// 수정 버튼이 아닌 드래그로 인한 수정일 경우만 맨뒤로 삽입
			if (!isEdit && targetIndex !== -1) {
				toDos.push(toDos.splice(targetIndex, 1)[0]);
			}

			localStorage.setItem(this.key, JSON.stringify(data));
		} else {
			toDos.push(toDoData);
			localStorage.setItem(this.key, JSON.stringify(data));
		}
	}

	saveOrder(sourceData, destData) {
		let data = JSON.parse(localStorage.getItem(this.key));
		let toDos = data.todos;
		sourceData.stage = destData.stage;

		const sourceIndex = toDos.findIndex(item => item.id === sourceData.id);
		toDos.splice(sourceIndex, 1);

		const destIndex = toDos.findIndex(item => item.id === destData.id);
		toDos.splice(destIndex, 0, sourceData);

		localStorage.setItem(this.key, JSON.stringify(data));
	}

	delete(id) {
		let data = JSON.parse(localStorage.getItem(this.key));
		let toDos = data.todos;
		data.todos = toDos.filter((todo) => todo.id !== id);

		localStorage.setItem(this.key, JSON.stringify(data));
	}
}
