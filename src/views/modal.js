export default function modal(toDoData = null, stage = null) { // data !null 이면 update, stage !null 이면 add
    return `
        <div class="modal-window">
            <h1 class="modal-title">항목 추가/수정</h1>
            <div class="modal-form" data-id=${toDoData === null ? "" : toDoData.id}>
                <div>
                    <label for="title">이슈 제목</label>
                    <input id="title" placeholder="이슈 제목을 입력해주세요" value="${toDoData === null ? "" : toDoData.title}">
                </div>
                <div>
                    <label for="manager">담당자 id</label>
                    <input id="manager" placeholder="담당자 id를 입력해주세요" value="${toDoData === null ? "" : toDoData.manager}">
                </div>
                <div class="hidden" id="stage">${toDoData === null ? stage : toDoData.stage}</div>
                <div class="btn-row">
                    <button class="submitBtn-cancel" type="button">취소</button>
                    <button class=${toDoData === null ? "submitBtn-add" : "submitBtn-update"} type="button">확인</button>
                </div>
            </div>
        </div>      
    `;
}
