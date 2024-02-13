export default function todo(data) {
    return `
            <div class='card' data-id=${data ? data.id : ""}> 
            <p>ISSUE-${data ? data.id : ""}</p>
                <p class="card-title">${data ? data.title : ""}</p>
                
                <p class="card-btn"> 
                    <button class="updateBtn" type="button" data-id=${data ? data.id : ""}>수정</button> 
                    <button class="deleteBtn" type="button" data-id=${data ? data.id : ""}>삭제</button>
                </p>
                <br>
                <div class="card-content">
                    <span>${data ? data.manager : ""}</span>
                    <span>${data ? data.createdDate : ""}</span>
                </div>
            </div>
        `;
}
