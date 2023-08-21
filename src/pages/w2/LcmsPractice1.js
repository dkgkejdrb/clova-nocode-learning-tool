// 프론트 prototype_0.1.1
// width 988px
import { Menu, Button, Input, Spin } from "antd";
import axios from 'axios';
import { useEffect, useState } from 'react';
import copyIcon from '../../assets/copy.png';

const { TextArea } = Input;

const dataArray = [
    // 분류 1 - 감정
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"이것은 문장 감정 분석기입니다.\n\n문장: \"이 영화를 보니 기분이 너무 좋아집니다.\"\n감정: 긍정\n###\n문장: \"시간 낭비\"\n감정: 부정\n###\n\n문장: \"이 영화는 재밌긴 한데, 다시 보라고하면 안 볼 것 같습니다\"","maxTokens":30,"temperature":0.5,"repeatPenalty":5,"stopBefore":["###\n","감정:","문장:"],"start":"\n감정:","restart":"\n###\n문장:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 분류 2 - 병원 진료과 연결
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"증상에 알맞은 진료과를 안내합니다.\n\n증상: 코가 막혀요\n진료과: 이비인후과\n###\n증상: 성대결절이 있어요\n진료과: 이비인후과\n###\n증상: 하지정맥류가 있어요","maxTokens":30,"temperature":0.5,"repeatPenalty":5,"stopBefore":["###\n","진료과:","증상:"],"start":"\n진료과:","restart":"\n###\n증상:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 대화 1 - 지식백과형 만능박사 챗봇
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"아래는 AI 스피커와 사용자의 대화입니다.\n\n사용자: 마음이 우울할 땐 뭘 해야 해?\nAI스피커: 좋아하는 음악을 들으세요.\n사용자: 한라산 높이는 어떻게 돼?\nAI스피커: 해발 1950m입니다.\n\n사용자: 비타민D의 효능은?","maxTokens":30,"temperature":0.5,"repeatPenalty":5,"stopBefore":["\n","AI스피커:","사용자:"],"start":"\nAI스피커:","restart":"\n사용자:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 대화 2 - 행상안내챗봇
    {"engine":"/testapp/v1/completions/LK-D2","topP":0.8,"topK":0,"text":"행사 안내를 로봇이 친절하고 자세하게 존댓말로 알려줍니다. 로봇은 자기 소개를 하지 않습니다.\n\n행사 주제: AI를 위한 인공지능 교육\n발표 내용: 교육 기업 크레버스가 AI 학습을 위한 AI의 개념과, 최적의 학습 비법을 공개한다고 해요.\n행사 날짜: 2023년 6월 1일\n행사 시간: 오후 1시 ~ 오후 4시30분\n행사 비용: 무료\n\n사전 등록은 언제하나요?: 5월 11일부터 5월 25일 오후 1시 30분까지 진행될 예정입니다.\n사전 등록한 사람만 시청이 가능한가요?: 본행사는 누구나 Youtube를 이용해서 무료로 시청할 수 있습니다.\n행사 당일 어디서 시청하면 되나요?: 23년 6월 1일 오후 1시부터 오후 4시 30분까지 크레버스 공식 홈페이지와 Youtube에서 실시간으로 시청할 수 있습니다.\n\n###\n사용자: 사전 등록은 언제하지?\n로봇: 네, 지금 바로 하실 수 있습니다.\n\n###\n사용자: 행사 시간과 행사 비용을 알려줘\n로봇: 행사 시간은 2023년 6월 1일 오후 1시부터 오후 4시 30분까지이고, 행사 비용은 무료입니다.\n\n###\n사용자: 행사 신청은 어디서 하니?\n로봇: 행사는 누구나 Youtube를 이용해서 무료로 시청할 수 있습니다.\n\n###\n사용자: 사전 등록하지 않아도 시청할 수 있니?\n로봇: 네, 그렇습니다.\n\n###\n사용자: 어떠한 주제로 발표하니?","maxTokens":50,"temperature":0.5,"repeatPenalty":5,"stopBefore":["사용자:","로봇:","###\n"],"start":"\n로봇:","restart":"###\n사용자:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 질답 1 - 책 설명과 관련하여 독서 확인 질문을 생성
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"책 설명과 관련하여 독서 확인 질문을 생성하십시오.\n\n설명: 이 책은 환경 생태의 문제를 자극하고, 건강한 환경 의식을 일깨워 주는 그림책입니다. 어느 날 바닷속을 헤엄치던 꼬마 물고기는 어딘가 다르게 생긴 이상한 물고기를 발견합니다. 말 없이 고개만 까딱이는 이상한 물고기가 자신의 생명을 위협하는 플라스틱 쓰레기라는 사실을 알리 없는 꼬마 물고기는 가족을 찾아 주기 위해 함께 길을 떠납니다. 그 과정에서 아무렇지 않은 듯 플라스틱 면봉을 꼬리로 감싼 해마와 그물에 다리가 엉킨 문어 그리고 비닐봉지를 입에 물고 있는 거북을 만나게 됩니다. 우리가 손쉽게 쓰고 버린 플라스틱과 비닐봉지로 인해 고통받는 바다 생물들의 모습을 아주 덤덤하게 표현했습니다. 단순히 환경 오염과 관련된 정보를 제공하고, 환경 보호를 위한 구체적인 실천을 요구하는 이야기가 아닙니다. 우리로 인해 달라진 바다 생태의 모습을 인지하고, 바다를 보호하는 것이 곧 우리의 삶을 지키는 것임을 깨닫게 합니다. \n질문: 도대체 바닷속에 무슨 일이 일어난 걸까요?\n \n###\n\n설명: 이 책은 낯선 세계에 오게 된 한 소녀의 이야기로 시작됩니다. 가족, 친구들과 떨어져 낯선 나라로 이민을 온 소녀는 외롭고 불안합니다. 좋은 이모와 삼촌이 있지만, 여전히 자신을 둘러싼 낯선 도시, 낯선 언어, 낯선 사람들이 차갑게만 느껴지지요. 새로운 친구를 사귀고도 싶지만 어떻게 해야할 지 모르는 소녀는 조용히 방 안에서 창밖을 바라볼 뿐입니다. 이런 소녀에게 이모는 옛이야기를 하나 들려줍니다. 이모가 들려준 이야기는 어떤 내용이었을까요? 소녀는 과연 낯선 새 나라에서 잘 지낼 수 있을까요?","maxTokens":50,"temperature":0.5,"repeatPenalty":5,"stopBefore":["###\n","설명:","질문:"],"start":"\n질문:","restart":"\n###\n설명:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 질답 2 - MBTI 백과사전
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"MBTI에 대한 지식을 기반으로, 아래의 질문에 답해보세요.\n\n질문: ESFJ는 문제에 봉착했을때 어떻게 대응하는가?\n답: 현실적인 해결 방법을 찾기 위해 노력한다.\n###\n질문: ISFJ는 연인에게 어떻게 대하는 편인가?\n답: 섬세하고 다정하게 케어해주는 편이다.\n###\n질문: INTP는 사람들이 많은 곳에 가면 어떻게 행동하는가?\n답: 주변의 상황을 파악하기 위해 관찰하는 편이다.\n###\n\n질문: ESFJ는 충동적인 선택을 많이 하는 편인가?","maxTokens":30,"temperature":0.5,"repeatPenalty":4,"stopBefore":["###\n","질문:","답:"],"start":"\n답:","restart":"\n###\n질문:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 요약 1 - 영화 줄거리 요약
    {"engine":"/testapp/v1/completions/LK-D2","topP":0.8,"topK":0,"text":"영화 줄거리를 한 줄로 요약합니다.\n\n줄거리: \"미나리는 어디서든 잘 자라\" 낯선 미국, 아칸소로 떠나온 한국 가족. 가족들에게 뭔가 해내는 걸 보여주고 싶은 아빠 '제이콥'(스티븐 연)은 자신만의 농장을 가꾸기 시작하고 엄마 '모니카'(한예리)도 다시 일자리를 찾는다. 아직 어린 아이들을 위해 ‘모니카’의 엄마 ‘순자’(윤여정)가 함께 살기로 하고 가방 가득 고춧가루, 멸치, 한약 그리고 미나리씨를 담은 할머니가 도착한다. 의젓한 큰딸 '앤'(노엘 케이트 조)과 장난꾸러기 막내아들 '데이빗'(앨런 김)은 여느 그랜마같지 않은 할머니가 영- 못마땅한데… 함께 있다면, 새로 시작할 수 있다는 희망으로 하루하루 뿌리 내리며 살아가는 어느 가족의 아주 특별한 여정이 시작된다!\n한 줄 요약: 미국 아칸소로 떠나온 한국 가족이 새로 시작할 수 있다는 희망으로 하루하루 뿌리 내리며 살아가는 이야기입니다.\n###\n줄거리: 한때는 WBC 웰터급 동양 챔피언이었지만 지금은 오갈 데 없어진 한물간 전직 복서 '조하'(이병헌). 우연히 17년 만에 헤어진 엄마 '인숙'(윤여정)과 재회하고, 숙식을 해결하기 위해 따라간 집에서 듣지도 보지도 못했던 뜻밖의 동생 '진태'(박정민)와 마주한다. 난생처음 봤는데… 동생이라고?! 라면 끓이기, 게임도 최고로 잘하지만 무엇보다 피아노에 천재적 재능을 지닌 서번트증후군 진태. 조하는 입만 열면 \"네~\" 타령인 심상치 않은 동생을 보자 한숨부터 나온다. 하지만 캐나다로 가기 위한 경비를 마련하기 전까지만 꾹 참기로 결심한 조하는 결코 만만치 않은 불편한 동거생활을 하기 시작하는데… 살아온 곳도, 잘하는 일도, 좋아하는 것도 다른 두 형제가 만났다!","maxTokens":150,"temperature":0.5,"repeatPenalty":5,"stopBefore":["###\n","줄거리:","한 줄 요약:"],"start":"\n한 줄 요약:","restart":"\n###\n줄거리:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 요약 2 - 소설 줄거리 요약
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"소설 줄거리를 한 줄로 요약합니다.\n\n줄거리: 노든은 코끼리 고아원에서 키워진 유일한 코뿔소입니다. 할머니 코끼리의 조언으로 처음으로 바깥세상으로 나가게 되었는데, 인간들의 불법 포획으로 아내와 딸을 잃었습니다. 파라다이스 동물원으로 옮겨진 노든은 앙가부와 탈출 계획을 세우게 됩니다. 그러나 다리를 다쳐 치료를 위해 우리에 갇히게 되고, 앙가부는 뿔사냥꾼에게 목숨을 잃습니다. 노든은 인간에 대한 증오심이 더 커지게 됩니다. 어느 날 인간 세상에서 전쟁이 일어나고 동물원 벽이 무너지면서 노든은 펭귄 치쿠와 만나게 됐습니다. 치쿠는 우리 속에서 버려진 검은 반점이 있는 알을 키우고 있었습니다. 노든과 치쿠, 알은 함께 바다를 찾아 떠났습니다. 하지만 곧 치쿠는 노든에게 알을 부탁하고 목숨을 잃었습니다. 그렇게 알과 노든은 둘이 남게 되고 바다를 찾아 긴긴밤을 보내게 됩니다.\n한 줄 요약: 코끼리 고아원에서 자란 코뿔소 노든은 세상을 탐험하며 인간에 대한 증오심을 갖고 다른 동물들에 대한 우정을 찾아가는 이야기입니다.\n###\n\n줄거리: 한 뜨거운 여름날, 작은 생쥐 토비는 동화 마을에서 살고 있었습니다. 토비는 음악을 사랑하고, 특히 피아노 연주에 매료되어 있었습니다. 어느 날, 토비는 마을에서 열리는 음악회에 참여하기로 결심합니다. 그런데 토비는 피아노를 연주할 수 있는 악보를 찾을 수 없었습니다. 그러던 중 마을의 상점주인인 유진씨에게 조언을 구하게 되었습니다. 유진씨는 토비에게 마음을 열어 음악을 느끼라고 이야기하며 특별한 악기를 선물합니다. 토비는 그 악기를 연주하며 음악회에 참가합니다. 그 날, 토비의 연주는 마을 사람들에게 큰 감동을 주었습니다. 이후로도 토비는 유진씨와 함께 음악을 연주하며 마을 사람들에게 희망과 기쁨을 전하게 되었습니다.","maxTokens":150,"temperature":0.7,"repeatPenalty":7,"stopBefore":["###\n","줄거리:","한 줄 요약:"],"start":"\n한 줄 요약:","restart":"\n###\n줄거리:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 변환 1 - 맞춤법 교정
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"입력한 문장을 틀린 문법이 올바르게 수정된 문장으로 변환합니다.\n\n###\n문장: 너랑 걔네들은 다르잖아. 너대로 하면되\n교정: 너랑 걔네들은 다르잖아. 너대로 하면 돼\n###\n문장: 이런식으로 행동하면 어떻게?\n교정: 이런 식으로 행동하면 어떡해?\n###\n\n문장: 이제 됬어요?","maxTokens":150,"temperature":0.3,"repeatPenalty":3,"stopBefore":["###\n","문장:","교정:"],"start":"\n교정:","restart":"\n###\n문장:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 변환 2 - 문체 변환(사투리, 사극 톤, 캐릭터 말투 등)
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"입력한 문장을 사투리로 변환합니다.\n\n문장: 너는 무슨 말을 하는거니?\n사투리: 니 머라카노\n###\n문장: 너 왜 이러는데\n사투리: 너 와이카노\n###\n문장: 너 밥 먹었니?","maxTokens":150,"temperature":0.3,"repeatPenalty":9,"stopBefore":["###\n","문장:","사투리:"],"start":"\n사투리:","restart":"\n###\n문장:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
  ]

const items = [
  {
    label: "분류",
    key: "분류",
  },
  {
    label: "대화",
    key: "대화",
  },
  {
    label: "질문/답변",
    key: "질문/답변",
  },
  {
    label: "요약",
    key: "요약",
  },
  {
    label: "변환",
    key: "변환",
  },
];

const LcmsPractice1 = () => {
  // ★ 기능1_실행하기
  // 로딩 상태값 (실행하기를 누르면, true / 실행종료가 되면, false)
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    // text가 없는 경우, errorCode 1
    if (!text) {
      alert("텍스트가 없으면, 실행할 수 없습니다.")
      return;
    }

  // 실행하기가 진행되는 동안 로딩 상태
  setLoading(true);

  // 텍스트 창에 수정한 내용도 변경되게 하는 data
  const data = {
    "engine":dataArray[id].engine,
    "topP":dataArray[id].topP,
    "topK":dataArray[id].topk,
    "text":text,
    "maxTokens":dataArray[id].maxTokens,
    "temperature":dataArray[id].temperature,
    "repeatPenalty":dataArray[id].repeatPenalty,
    "stopBefore":dataArray[id].stopBefore,
    "start":dataArray[id].start,
    "restart":dataArray[id].restart,
    "includeTokens":true,
    "includeAiFilters":true,
    "includeProbs":false
  }

  // setOutputTokens
  axios.post(dataArray[id].engine, data, {
    headers: {
        "Content-Type": 'application/json',
    }
  })
  .then((res) => {
      setText(res.data.result.text);
      setOutputTokens(res.data.result.outputText);
      // loading 상태 초기화
      setLoading(false);
  })
  .catch((error) => {
      console.log(data)
      console.log(error)
      // loading 상태 초기화
      setLoading(false);
  })}
  // ... 기능1_실행하기


  // ★ 기능2_파라미터
  // text 스테이트, 이벤트
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  }
  // ... 기능2_파라미터

  // ★ 기능 3_콘솔창 출력 메시지
  const [outputTokens, setOutputTokens] = useState(null);
  // ... 기능 3_콘솔창 출력 메시지

  // 데이터 세트 클릭 상단메뉴
  const [current, setCurrent] = useState('분류');
  const onClick = (e) => {
    setCurrent(e.key);
  };

  // 텍스트아레아에서 ctrl + c 눌렀을 때, dataArray에서 조회할 인덱스값을 넘김
  const [id, setId] = useState('');
  // 복사하기위해 텍스트아레아 드래그시 id 넘기는 이벤트 함수
  const onClickCapture = (e) => {
    const _id = e.target.id;
    setId(_id);
  }

    // 복사하기 버튼 클릭 시, id 넘기는 이벤트 함수
    const onClickCaptureBtn = (e) => {
      const _id = e.target.id;
      setText(dataArray[_id].text);
      setId(_id);
    }

    
    // ctrl + c or ctrl + v 이벤트 감지
    useEffect(() => {
      const handleKeyDown = (event) => {
        const code = event.which || event.keyCode;

        let charCode = String.fromCharCode(code).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === "v") {
          event.preventDefault();
          setText(dataArray[id].text);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [id]);

  return (
    <>
      {/* 데이타세트, 챗봇학습기 라벨 */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 980,
            paddingTop: 20,
            display: "flex",
          }}
        >
          <div style={{ marginLeft: 30 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              사전 학습 데이터 세트
            </div>
          </div>
          <div style={{ marginLeft: 235 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              챗봇 학습기
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        {/* ★ 왼쪽 데이터세트 영역 */}
        <div
          className="dataset"
          style={{
            width: 350,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Menu
            style={{ width: "100%" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          {current === "분류" ? (
            <>
              {/* 데이타셋-분류 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 분류 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>1세트</p>
                  </div>
                  <TextArea
                    id="0"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[0].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <Button
                    id="0"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="0"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
                {/* 가운데줄 */}
                <div style={{ width: "100%", height: 40 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderBottom: "1px solid rgb(231, 231, 231)",
                    }}
                  ></div>
                  <div style={{ width: "100%", height: 20 }}></div>
                </div>
                {/* 분류 - 2세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, display: "flex", alignItems: "center", fontSize: 16, }}
                  >
                    <p>2세트</p>
                  </div>
                  <TextArea
                    id="1"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[1].text}
                    rows={10}
                  />
                  <Button
                    id="1"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="1"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
              </div>
              {/* 데이타셋-분류 끝 */}
            </>
          ) : current === "대화" ? (
            <>
              {/* 데이타셋-대화 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 대화 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>1세트</p>
                  </div>
                  <TextArea
                    id="2"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[2].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <Button
                    id="2"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="2"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
                {/* 가운데줄 */}
                <div style={{ width: "100%", height: 40 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderBottom: "1px solid rgb(231, 231, 231)",
                    }}
                  ></div>
                  <div style={{ width: "100%", height: 20 }}></div>
                </div>
                {/* 대화 - 2세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>2세트</p>
                  </div>
                  <TextArea
                    id="3"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[3].text}
                    rows={10}
                  />
                  <Button
                    id="3"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="3"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
              </div>
              {/* 데이타셋-대화 끝 */}
            </>
          ) : current === "질문/답변" ? (
            <>
              {/* 데이타셋-질답 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 분류 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>1세트</p>
                  </div>
                  <TextArea
                    id="4"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[4].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <Button
                    id="4"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="4"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
                {/* 가운데줄 */}
                <div style={{ width: "100%", height: 40 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderBottom: "1px solid rgb(231, 231, 231)",
                    }}
                  ></div>
                  <div style={{ width: "100%", height: 20 }}></div>
                </div>
                {/* 분류 - 2세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>2세트</p>
                  </div>
                  <TextArea
                    id="5"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[5].text}
                    rows={10}
                  />
                  <Button
                    id="5"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="5"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
              </div>
              {/* 데이타셋-질답 끝 */}
            </>
          ) : current === "요약" ? (
            <>
              {/* 데이타셋-요약 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 요약 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>1세트</p>
                  </div>
                  <TextArea
                    id="6"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[6].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <Button
                    id="6"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="6"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
                {/* 가운데줄 */}
                <div style={{ width: "100%", height: 40 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderBottom: "1px solid rgb(231, 231, 231)",
                    }}
                  ></div>
                  <div style={{ width: "100%", height: 20 }}></div>
                </div>
                {/* 요약 - 2세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>2세트</p>
                  </div>
                  <TextArea
                    id="7"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[7].text}
                    rows={10}
                  />
                  <Button
                    id="7"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="7"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
              </div>
              {/* 데이타셋-요약 끝 */}
            </>
          ) : current === "변환" ? (
            <>
              {/* 데이타셋-변환 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 변환 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>1세트</p>
                  </div>
                  <TextArea
                    id="8"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[8].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <Button
                    id="8"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="8"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
                {/* 가운데줄 */}
                <div style={{ width: "100%", height: 40 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderBottom: "1px solid rgb(231, 231, 231)",
                    }}
                  ></div>
                  <div style={{ width: "100%", height: 20 }}></div>
                </div>
                {/* 변환 - 2세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, fontSize: 16, display: "flex", alignItems: "center" }}
                  >
                    <p>2세트</p>
                  </div>
                  <TextArea
                    id="9"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none" }}
                    value={dataArray[9].text}
                    rows={10}
                  />
                  <Button
                    id="9"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 46,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="9"
                      alt=""
                      src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                </div>
              </div>
              {/* 데이타셋-변환 끝 */}
            </>
          ) : (
            <></>
          )}
        </div>

        {/* ★ 중간 영역 */}
        <div
          style={{
            width: 540,
            height: "570px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // 왼쪽 네비게이션 칸 띄우기
            marginLeft: "30px",
            borderLeft: "1px solid #e7e7e7",
          }}
        >
          {/* 입출력창 */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f1f1f1",
              // 안쪽 title, text 간격 띄우기
              marginLeft: "30px",
            }}
          >
            <div name="text" style={{ width: "100%" }}>
              {loading ? (
                <div
                  style={{
                    width: 540,
                    height: 300,
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <></>
              )}
              <TextArea
                value={text}
                placeholder="완료하려면 왼쪽 텍스트를 복사하고 붙여넣기 후, 실행하기 버튼을 눌러주세요."
                rows={10}
                bordered={false}
                maxLength={3800}
                onChange={(e) => onChangeText(e)}
                style={{ height: "300px", resize: "none", fontSize: "15px" }}
              />
            </div>
          </div>
          {/* 툴바 메뉴 */}
          <div
            style={{
              width: "100%",
              height: "50px",
              paddingLeft: "30px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={onSubmit} loading={loading}>
              실행하기
            </Button>
          </div>
          <div
            className="console"
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#1e232e",
              marginLeft: "30px",
              paddingTop: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: 540,
                  height: 200,
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <></>
            )}
            <div
              style={{ fontSize: "14px", color: "white", marginLeft: "11px" }}
            >
              결과 화면
            </div>
            <TextArea
              bordered={false}
              className="outputText"
              style={{ color: "white", height: "160px", resize: "none" }}
              value={outputTokens}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LcmsPractice1;