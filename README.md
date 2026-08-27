# Frontend-framework: Vue.js 종합실습

판교 1반 P029 정유진

2026.08.27

## 과제1: 날씨 대시보드 Mockup (도시 검색과 카드 UI 구현)

도시 검색과 지역별 날씨 카드 UI를 목업 데이터로 구현하며, 검색어 실시간 필터링과 카드 클릭 시 상세 정보 확인 기능까지 Vue의 기본 렌더링 문법으로 익혔습니다.

\[검색 구현\]

<img src="media/image25.png" style="width:1.89063in;height:1.45927in" />

<img src="media/image11.png" style="width:1.96489in;height:1.17672in" />

\[지역별 날씨 현황 추가\]

<img src="media/image1.png" style="width:2.13244in;height:4.05729in" />

\[지역 검색\]

<img src="media/image8.png" style="width:2.10286in;height:2.07813in" />

\[지역 카드 선택\]

<img src="media/image28.png" style="width:2.05096in;height:3.88467in" />

\[HTTP, CSS 추가\]

<img src="media/image21.png" style="width:2.85938in;height:3.01755in" />

<img src="media/image37.png" style="width:2.83854in;height:1.59845in" />

\[상세보기\]

<img src="media/image7.png" style="width:2.80729in;height:0.83473in" />

## 과제2: Composition API로 정렬, 감시 기능 추가 (watch / watchEffect)

watch와 watchEffect로 상태 변화를 감지하고 정렬 기능을 추가하며, v-if와 v-for를 같은 태그에 함께 쓰면 안 되는 실전 트러블슈팅까지 직접 경험했습니다.

\[watch\]

<img src="media/image41.png" style="width:6.26772in;height:3.80556in" />

\[watchEffect 자동 실행\]

<img src="media/image36.png" style="width:6.26772in;height:3.79167in" />

\[watchEffect\]

<img src="media/image26.png" style="width:6.26772in;height:3.56944in" />

\[trouble shooting\]

<img src="media/image2.png" style="width:3.125in;height:1.35417in" />

<img src="media/image5.png" style="width:3.9375in;height:1.39583in" />

\[정렬 순서 변경\]

<img src="media/image42.png" style="width:6.26772in;height:4in" />

## 과제3: 재사용 컴포넌트로 구조 리팩터링 (컴포넌트 분리)

BaseDashboardCard 등 slot 기반 컴포넌트로 화면을 분리하며, props와 emit을 통한 부모·자식 컴포넌트 간 데이터 흐름과 재사용성을 익혔습니다.

\[컴포넌트 분리\]

<img src="media/image39.png" style="width:2.91146in;height:3.88903in" /><img src="media/image12.png" style="width:2.47541in;height:2.14289in" />

## 과제4: Vue Router로 다중 페이지 구성 (대시보드 / 서비스 소개 / 상세보기)

Vue Router로 대시보드·소개·상세 페이지를 구성하며, 동적 라우트(:cityId)와 새로고침 없는 클라이언트 사이드 라우팅 개념을 익혔습니다.

\[날씨 대시보드\]

<img src="media/image40.png" style="width:4.77449in;height:5.40104in" />

\[서비스 소개\]

<img src="media/image32.png" style="width:4.51563in;height:2.09361in" />

\[상세보기\]

<img src="media/image27.png" style="width:3.32813in;height:1.97366in" />

## 과제5: Pinia 스토어로 온도 단위 (섭씨, 화씨) 전역 관리

Pinia로 온도 단위 전역 상태를 관리하며, state·getter·action 구조와 여러 컴포넌트가 하나의 스토어를 공유하는 방식을 직접 구현해 익혔습니다.

(결과 화면 캡쳐하는 것을 잊어버려, 이후 과제 결과물에서 스토어 적용 부분을 캡쳐했습니다.)

\[섭씨\]

<img src="media/image30.png" style="width:5.48441in;height:4.84669in" />

\[화씨\]

<img src="media/image17.png" style="width:5.50521in;height:4.81706in" />

\[trouble shooting\]

“지역별 날씨 현황” 내부에 “더움 (25°C 이상)”가 섭씨로 하드코딩 되어있어 화씨로 변경시 바뀔 수 있도록 수정했습니다.

## 과제6: Axios로 실시간 날씨 데이터 연동 (OpenWeatherMap API)

Axios로 OpenWeatherMap API를 연동하며, 비동기 요청 처리와 axios.all 동시 요청, API 키·엔드포인트 오류를 직접 디버깅하는 경험을 했습니다.

\[trouble shooting\]

\[버전 이슈\]

https://api.openweathermap.org/data/4.0/onecall/current?lat=37.4058453&lon=127.0998294&lang=kr&appid={API key}

<img src="media/image16.png" style="width:6.26772in;height:1.30556in" />

\[중괄호 미제거 오류\]

https://api.openweathermap.org/data/2.5/weather?lat=37.4058453&lon=127.0998294&appid={{API key}}&units=metric&lang=kr

<img src="media/image38.png" style="width:6.26772in;height:0.80556in" />

\[정상 동작\]

https://api.openweathermap.org/data/2.5/weather?lat=37.4058453&lon=127.0998294&appid={API key}&lang=kr

<img src="media/image14.png" style="width:1.61796in;height:4.97833in" />

\[API Test (Postman)\]

<img src="media/image24.png" style="width:5.68229in;height:6.11939in" />

\[API 키 적용 오류\]

<img src="media/image34.png" style="width:3.28238in;height:1.23841in" />

<img src="media/image18.png" style="width:4.125in;height:0.1875in" />

\[API 키 명칭 수정\]

<img src="media/image35.png" style="width:4.38542in;height:0.25in" />

## 과제7: Element Plus UI 라이브러리 적용 (ON/OFF 토글 전환)

Element Plus를 토글 방식으로 적용하며, 외부 UI 라이브러리 도입과 전역 상태 기반으로 화면 전체를 조건부 렌더링하는 구조를 익혔습니다.

\[전\]

<img src="media/image10.png" style="width:5.07813in;height:4.71147in" />

\[후\]

<img src="media/image13.png" style="width:4.94395in;height:5.45313in" />

\[알람\]

\[전\]

<img src="media/image29.png" style="width:4.70833in;height:1.57292in" />

\[후\]

<img src="media/image33.png" style="width:2.33333in;height:0.52083in" />

\[상세보기\]

\[전\]

<img src="media/image19.png" style="width:6.26772in;height:1.34722in" />

\[후\]

<img src="media/image31.png" style="width:6.26772in;height:2.19444in" />

\[서비스 소개\]

\[전\]

<img src="media/image3.png" style="width:3.56771in;height:1.05847in" />

\[후\]

<img src="media/image9.png" style="width:6.26772in;height:2.18056in" />

## 과제8: ESLint 정리, 빌드 검증, 배포

ESLint로 프로젝트 전체 코드 품질을 점검하고 빌드·배포를 준비하며, 실무에 가까운 코드 품질 관리와 배포 프로세스를 경험했습니다.

\[ESLint\]

\[trouble shooting\]

prop emit 연습을 위해 만들었던 Child.vue, Parent.vue 파일 명칭이 2개 단어 이상으로 작성이 필요해 수정했습니다.

<img src="media/image6.png" style="width:6.26772in;height:1.40278in" />

\[API 키\]

<img src="media/image4.png" style="width:4.95833in;height:0.4375in" />

\[빌드\]

<img src="media/image23.png" style="width:6.26772in;height:2.91667in" />

<img src="media/image15.png" style="width:1.45833in;height:0.90625in" />

<img src="media/image20.png" style="width:2.92708in;height:0.90625in" />

\[확인\]

<img src="media/image22.png" style="width:4.90392in;height:6.93229in" />

## 종합 의견

날씨 대시보드 Mockup 구현을 시작으로 Composition API, 컴포넌트 분리, Vue Router, Pinia, Axios API 연동, Element Plus 적용까지 기능을 단계적으로 확장하며 Vue 기반 프론트엔드 개발 과정을 실습했습니다. 또한 UI 라이브러리 적용 여부를 전역 상태로 관리하고 SKAX 판교 지역을 추가하는 등 학습 내용을 직접 기능으로 확장해 적용했습니다. 이 과정에서 API Key 설정 및 노출 문제, ESLint 규칙 위반, v-if와 v-for 동시 사용 문제 등을 직접 확인하고 수정하며 단순 문법 학습을 넘어 오류 원인을 파악하고 해결하는 개발 경험을 쌓았습니다.