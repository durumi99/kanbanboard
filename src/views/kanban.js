// DOM selectors
const toDoUl = document.querySelector('.to-do');
const inProgressUl = document.querySelector('.in-progress');
const doneUl = document.querySelector('.done');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal-overlay');

import toDoView from './todo';
import modalView from './modal';

export default class Kanban {
	constructor(storage) {
		this.storage = storage;
		this.dragToDo = null;
	}

	// 칸반보드 렌더링
	render() {
		const toDoList = this.storage.read();

		if (toDoList) {
			toDoList.forEach((toDoItem) => {
				const li = document.createElement('li');
				li.setAttribute('draggable', 'true');
				li.innerHTML = toDoView(toDoItem);

				if (toDoItem.stage === 'To Do') {
					toDoUl.appendChild(li);
				}

				if (toDoItem.stage === 'In Progress') {
					inProgressUl.appendChild(li);
				}

				if (toDoItem.stage === 'Done') {
					doneUl.appendChild(li);
				}
			})
		}
	}

	// 모달
	show(id = null, inputStage = null) {
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');

		const data = this.storage.read().find(todo => todo.id === parseInt(id, 10)) || null;
		const modalWindow = modalView(data, inputStage);

		overlay.insertAdjacentHTML('afterend', modalWindow);
	}

	hide() {
		const modalWindow = document.querySelector('.modal-window');
		modal.removeChild(modalWindow);
		modal.classList.add('hidden');
	}

	inputValue(id = null) {
		const title = document.querySelector('#title');
		const manager = document.querySelector('#manager');
		const stage = document.querySelector('#stage');

		const inputTitle = title.value;
		const inputManager = manager.value;
		const inputStageText = stage.innerHTML;

		if (inputTitle.trim() === '') {
			alert('제목을 입력해주세요.');
			return;
		}

		if (inputManager.trim() === '') {
			alert('담당자를 입력해주세요.');
			return;
		}

		// 항목 추가인 경우
		if (id == null) {
			id = localStorage.getItem('id') || 0;
			id++;
			localStorage.setItem('id', id);
		}

		// 생성 시간 or 변경 시간
		function getToday() {
			let today = new Date();
			const year = today.getFullYear();
			const month = `0${today.getMonth() + 1}`.slice(-2);
			const date = `0${today.getDate()}`.slice(-2);
			const hour = `0${today.getHours()}`.slice(-2);
			const minute = `0${today.getMinutes()}`.slice(-2);
			today = `${year}.${month}.${date} ${hour}:${minute}`;

			return today;
		}

		return {
			id: id,
			title: inputTitle,
			createdDate: getToday(),
			manager: inputManager,
			stage: inputStageText,
		};
	}

	// 투두 카드 추가
	addToDo() {
		const toDo = this.inputValue();

		if (toDo) {
			const newToDo = document.createElement('li');
			newToDo.setAttribute('draggable', 'true');
			newToDo.innerHTML = toDoView(toDo);

			if (toDo.stage === 'To Do') {
				toDoUl.appendChild(newToDo);
			}

			if (toDo.stage === 'In Progress') {
				inProgressUl.appendChild(newToDo);
			}

			if (toDo.stage === 'Done') {
				doneUl.appendChild(newToDo);
			}
		}

		return toDo;
	}

	// 투두 카드 수정
	updateToDo(id) {
		const updatedData = this.inputValue(id);
		let updatedEl = document.querySelector(`[data-id='${id}']`).parentNode;

		if(updatedData) {
			updatedEl.innerHTML = toDoView(updatedData);
		} 

		return updatedData;
	}

	// 투두 카드 삭제
	deleteToDo(id) {
		const data = this.storage.read().find((todo) => todo.id === id);
		let deleteEl = document.querySelector(`[data-id='${id}']`).parentNode;

		if (deleteEl) {
			if (data.stage === 'To Do') {
				toDoUl.removeChild(deleteEl);
			}

			if (data.stage === 'In Progress') {
				inProgressUl.removeChild(deleteEl);
			}

			if (data.stage === 'Done') {
				doneUl.removeChild(deleteEl);
			}
		}
	}

	// Drag and Drop
	dragStart(target) {
		this.dragToDo = target;
		this.dragToDo.classList.add('dragged');
	}

	dragEnd() {
		this.dragToDo.classList.remove('dragged');
	}

	dragEnter(target) {
		const Uls = [toDoUl, inProgressUl, doneUl];

		Uls.forEach((ul) => {
			if (ul.contains(target)) {
				target.style.background = '#bdbdbd';
			}
		});
	}

	dragOver(e) {
		e.preventDefault();
	}

	dragLeave(target) {
		target.style.background = '';
	}

	dragDropAtCard(target) {
		const destElement = target.parentElement;
		let toDoList = this.storage.read();
		const sourceData = toDoList.find(item => item.id === parseInt(this.dragToDo.children[0].dataset.id, 10));
		const destData = toDoList.find(item => item.id === parseInt(target.dataset.id, 10));

		// 원래 자리에 drop한 경우
		if (destData.id === sourceData.id) {
			return toDoList;
		}

		// drop될 위치 확인
		const list = ['to-do', 'in-progress', 'done'];
		while (!list.includes(target.className)) {
			target = target.parentElement;
		}

		// drop된 위치에 있는 card에 대해서 insertBefore
		target.insertBefore(this.dragToDo, destElement);
		target.style.background = '';

		return { sourceData, destData };
	}

	dragDropAtList(target) {
		const stage = target.previousElementSibling.innerText;

		const data = this.storage.read().find((todo) => todo.id === parseInt(this.dragToDo.children[0].dataset.id));
		data.stage = stage;

		target.appendChild(this.dragToDo);
		target.style.background = '';

		return data;
	}
}
