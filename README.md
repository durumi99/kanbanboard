# Kakao
## Front-End 면접 과제 - 칸반 보드

### 기본 요구 사항
  ```
- HTML, CSS, JavaScript 만 사용해 개발합니다.
- 프레임워크, 라이브러리 사용을 제한합니다.
- react, jquery, vue, angular, backbone, amber, handlebars, underscore 등 라이브러리 제한
- 필요시 테스트 도구, 번들러(웹팩 등)는 사용 가능 합니다.
- 필요시 webpack-dev-server 등 파일서버를 사용할 수 있습니다.
- 모던 웹 브라우저(크롬, 사파리, 엣지 등) 중 두 개 이상의 브라우저에서 동작이 보장되어야 합니다.
- 테스트 코드를 작성합니다.(선택사항) 
- UI와 디자인 요소는 채점에서 제외됩니다.
   ```

### 규칙
  ```
- 그룹은 to-do, in progress, done 3개를 만들어줍니다.
- 드래그 앤 드랍으로 그룹간 이동, 그룹내 항목 순서 변경이 가능합니다.
- 항목을 추가, 수정, 삭제 할 수 있는 기능을 제공합니다.
    - 항목을 추가하면 to-do에 생성됩니다.
    - 추가, 수정시 제목, 담당자를 입력하는 레이어를 제공합니다.
    - 제목, 담당자가 없는 경우 생성 불가(필수항목) 안내를 해줍니다.
    - 삭제시 경고를 보여줍니다.
- 각 항목은 아래의 내용을 필수로 구성 됩니다.
    - 이슈번호(id에 해당하며, 영문+숫자 로 구성, 자동생성) 
    - 사용자 입력: 이슈 제목, 담당자 id
    - 최근 변경 날짜+시간(자동생성)
    - 보드의 내용은 로컬에 저장되어 재접속하면 복구됩니다.(선택사항) 구현완료
   ```

### 디렉터리 구조
  ```
├── .idea
├── dist
│   ├── bundle.js
│   ├── index.html
├── node_modules
├── src
│   ├── styles
│   │   ├── base
│   │   │   └── reset.scss
│   │   └── main.scss
│   ├── views
│   │   ├── kanban.js
│   │   ├── modal.js
│   │   └── todo.js
│   ├── app.js
│   ├── controller.js
│   ├── model.js
│   └── storage.js
├── package-loc.json
├── package.json
├── README.md
└── webpack.config.js
   ```

### 실행 방법
- Run Local Server
```bash
npm run dev-server
```