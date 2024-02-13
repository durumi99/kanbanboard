// DOM selectors
const addBtn = document.querySelectorAll(".addBtn");
const overlay = document.querySelector(".modal-overlay");

export default class Controller {
  constructor(model, kanban) {
    this.model = model;
    this.kanban = kanban;
    this.init();
    this.attachEvent();
  }

  // 항목 추가
  addItem() {
    return Promise.resolve(true).then(() => {
      const data = this.kanban.addToDo();

      if (!data) {
        return false;
      }

      this.model.insert(data);

      return true;
    });
  }

  // 항목 수정
  updateItem(id) {
    return Promise.resolve(true).then(() => {
      id = parseInt(id, 10);
      const data = this.kanban.updateToDo(id);

      if (!data) {
        return false;
      }
      // 수정 버튼 클릭을 통한 update
      this.model.update(data, id, true);

      return true;
    });
  }

  // 항목 제거
  removeItem(id) {
    id = parseInt(id, 10);
    alert("Deleted!");
    this.kanban.deleteToDo(id);
    this.model.delete(id);
  }

  // event 처리
  init() {
    this.kanban.render();
  }

  attachEvent() {
    this.attachClickEvent();
    this.attachDragDropEvent();
  }

  attachDragDropEvent() {
    document.body.ondragstart = (e) => {
      this.kanban.dragStart(e.target);
    };

    document.body.ondragend = (e) => {
      this.kanban.dragEnd();
    };

    document.body.ondragover = (e) => {
      e.preventDefault();
      this.kanban.dragOver(e);
    };

    document.body.ondragenter = (e) => {
      e.preventDefault();
      this.kanban.dragEnter(e.target);
    };

    document.body.ondragleave = (e) => {
      this.kanban.dragLeave(e.target);
    };

    document.body.ondrop = (e) => {
      e.preventDefault();
      const dest = e.target.className;
      const list = ["to-do", "in-progress", "done"];

      // list에 drop하는 경우
      if (list.includes(dest)) {
        const dragItem = this.kanban.dragDropAtList(e.target);
        this.model.update(dragItem, dragItem.id);
      } else {
        // card에 drop하는 경우
        this.kanban.dragLeave(e.target);

        let target = e.target;
        while (target !== null && target.className !== "card") {
          target = target.parentElement;
        }

        // card가 아닌 곳에 drop한 경우
        if (target === null) {
          return;
        }

        const { sourceData, destData } = this.kanban.dragDropAtCard(target);
        this.model.updateOrder(sourceData, destData);
      }
    };
  }

  attachClickEvent() {
    addBtn.forEach((el) =>
      el.addEventListener("click", () => {
        const stage = el.nextElementSibling.innerHTML;
        this.kanban.show(null, stage);
      })
    );

    overlay.addEventListener("click", () => {
      this.kanban.hide();
    });

    document.body.onclick = (e) => {
      if (e.target.className === "updateBtn") {
        this.kanban.show(e.target.dataset.id);
      }

      if (e.target.className === "deleteBtn") {
        this.removeItem(e.target.dataset.id);
      }

      if (e.target.className.includes("submitBtn")) {
        if (e.target.className === "submitBtn-cancel") {
          this.kanban.hide();
        } else if (e.target.className === "submitBtn-update") {
          let parentTag = e.target;
          while (parentTag.className !== "modal-form") {
            parentTag = parentTag.parentElement;
          }

          this.updateItem(parentTag.dataset.id).then((res) => {
            if (!res) {
              return false;
            }

            this.kanban.hide();
          });
        } else {
          this.addItem().then((res) => {
            if (!res) {
              return false;
            }

            this.kanban.hide();
          });
        }
      }
    };
  }
}
