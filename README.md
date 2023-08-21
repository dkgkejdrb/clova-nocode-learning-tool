## NOTICE

※ 본 소스코드에는 회사의 자산과 민감한 정보는 전부 제거하였으며, 본인(이동규)이 직접 기여하여 작성한 코드만을 업로드하였습니다.

------



## 1. 프로젝트 제목 및 설명

### 제목:

- 초등 고학년 ~ 중학생, AI 리터러시 학습 도구

### 설명:

- 네이버 MOU를 시작으로 'CLOVA 텍스트 생성 AI'를 코드없이 부담없이 다뤄보고, AI 서비싱이 가능한 산출물까지 학생이 가져가는 콘텐츠
  - **root > front: 일반 사용자(학생, 학부모 등)가 이용하는 화면을 구성하는 소스코드**


------



## 2. 본인 기여

- 일반 사용자 / 관리자의 프론트 메인 개발

------



## 3. 기술 스택 및 사용된 도구

### 언어 :

- JavaScript(ES6+): 최신 ECMAScript 표준을 사용한 프로그래밍.

### 프레임워크 및 도구:

- react: 프레임워크
- react-router: SPA(Single Page Application) 라우팅 관리
- react-redux: 전역 상태 관리
- react-quill: 사용자 에디터 1
- react-quilljs: 사용자 에디터 2
- pixi.js: 메인배너의 2D 웹 그래픽 효과에 사용
- antd: UI 컴포넌트로 사용
- apexcharts:사용자 학습정보의 차트와 그래프에 사용

### 백엔드 통신:

- axios: HTTP 클라이언트 라이브러리
- Postman: API 테스팅

### 배포:

- Azure StaticWebApp: Azure 클라우드의 정적웹 배포서비스

```
{
  "name": "clova-gui-tool-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "antd": "^5.4.7",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.11.1",
    "react-scripts": "5.0.1",
    "react-uuid": "^2.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

