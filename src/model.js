export default class Model {
	constructor(storage) {
		this.storage = storage;
	}

	insert(item) {
		if (item) {
			let newItem = {
				id: item.id,
				title: item.title,
				manager: item.manager,
				createdDate: item.createdDate,
				stage: item.stage,
			};

			this.storage.save(newItem);
		}
	}

	update(updateItem, id, isEdit = false) {
		this.storage.save(updateItem, id, isEdit);
	}

	updateOrder(sourceData, destData) {
		this.storage.saveOrder(sourceData, destData);
	}

	delete(id) {
		this.storage.delete(id);
	}
}
