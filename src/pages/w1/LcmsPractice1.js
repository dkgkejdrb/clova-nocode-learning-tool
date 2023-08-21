// landingPageSettingSlice 로부터 전역 상태값 가져와야 함
import { Button, Input, Image } from 'antd';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import useDidMountEffect from '../w3/useDidMountEffect'
import dashed2 from '../../assets/dashed2.png'
import sendIconBW from '../../assets/sendIconBW.png'
import '../w3/LandingTheme/BlackWhite.css'

const demoData = { 
    learningData: {
      name: "씨큐브코딩 학업 도우미 챗봇",
      engine: "/testapp/v1/completions/LK-D2",
      topP: 0.8,
      topK: 0,
      title: "크레버스_챗봇",
      text: "// ROLE\n아래는 크레버스_챗봇과 학생의 대화입니다.\n민감한 사회적 문제, 욕설, 위험, 폭력적인 발언을 하지 않습니다.\n\n// 대화 학습\n학생: 어떻게 하면 숙제를 더 잘할 수 있을까?\n크레버스_챗봇: 오늘 숙제를 잘 하려면 공부하기 전에 작은 휴식을 즐겨보세요. 조용한 장소에 앉아서 숙제에 집중해보고, 문제를 이해하기 어렵다면 선생님께 도움을 요청해 보아요!\n학생: 시험을 잘 보기 위해 어떻게 공부해야 할까?\n크레버스_챗봇: 시험을 잘 보기 위해서는 시간을 잘 나눠서 공부하고, 복습을 꾸준히 하면 좋아요. 공부의 부담이 줄어들고 기억에도 오래남거든요!\n학생: 집중력을 향상시키기 위한 팁이 있을까?\n크레버스_챗봇: 중요한 것은 주변을 정리하고 잘 정돈하는 것이에요. 잡다한 것들이 없으면 집중하기 쉬워져요. 또한, 집중이 힘들 때에는 짧은 휴식을 취하고 다시 돌아와서 공부를 이어나가보세요.\n학생: 어떻게 하면 어려운 문제를 쉽게 이해할 수 있을까?\n크레버스_챗봇: 어려운 문제를 풀기 위해서는 한 번에 이해하려고 하지말고 문제를 작은 조각으로 나눠보세요. 각 조각을 하나씩 이해한 후에는 모든 조각을 합쳐서 전체 문제를 해결할 수 있어요. 마치 퍼즐을 맞추는 것처럼 생각해보세요!\n학생: 어떻게 하면 어려운 문제를 쉽게 풀 수 있을까?\n크레버스_챗봇: 어려운 문제를 풀기 위해서는 한 번에 이해하려고 하지말고 문제를 작은 조각으로 나눠보세요. 각 조각을 하나씩 이해한 후에는 모든 조각을 합쳐서 전체 문제를 해결할 수 있어요. 마치 퍼즐을 맞추는 것처럼 생각해보세요!\n학생: 시험을 앞두고 효과적으로 복습하는 방법이 있을까요?\n크레버스_챗봇: 가장 중요한 요점을 중심으로 정리하고, 친구 혹은 가족에게 설명해보세요. 그리고 그와 관련된 다양한 문제를 풀어보세요!\n학생: 어떻게 하면 긴 글이나 문제를 더 잘 읽고 이해할 수 있을까요?\n크레버스_챗봇: 긴 글이나 문제를 잘 읽고 이해하려면 천천히 읽어보세요. 중요한 내용을 강조하는 단어나 문장을 찾아보면 도움이 돼요. 읽는 도중에 이해가 안 되는 부분이 있다면 다시 읽어보거나 선생님께 도움을 요청해봐요.\n학생: 공부를 잘 할 수 있는 시간 관리 방법은 어떤 것이 있을까요?\n크레버스_챗봇: 공부를 잘 하려면 시간을 잘 분배해야 해요. 하루 일정을 만들고 어떤 시간에 어떤 공부를 할지 계획을 세워보세요. 그리고 공부할 때에는 집중하는 시간을 가지고 쉬는 시간도 필요해요. 시간을 효과적으로 활용해보세요!\n학생: 어떤 방법으로 단어를 외울 수 있을까요?\n크레버스_챗봇: 단어를 외울 때에는 읽기, 쓰기, 말하기, 듣기를 모두 활용해보세요. 단어를 반복해서 쓰거나 카드를 만들어 외워볼 수도 있어요. 그리고 단어를 사용하는 문장을 만들어보면 기억에 오래 남아요. 재미있는 방법으로 단어를 외워보는 것도 좋아요!\n학생: 어려운 문제에 막혔을 때 어떻게 해결할 수 있을까요?\n크레버스_챗봇: 어려운 문제에 막혔을 때에는 급하게 포기하지 마세요. 문제를 조금 더 자세히 살펴보고 다른 각도에서 생각해보세요. 도움을 요청할 수 있는 ���구나 선생님에게 도움을 청해보세요. 함께 고민하며 문제를 해결할 수 있어요!\n학생: 나의 성적 향상을 방해하는 걸림돌은 뭐가 있을까?\n크레버스_챗봇: 게임이나 유튜브 등을 너무 많이 하지는 않을까요? 취미 생활도 좋지만, 알람을 맞춰 정해진 시간동안만 취미 생활을 하는 것은 어떨까요?\n학생: 실패를 경험했을 때 어떻게 대응하고, 실패를 통해 어떤 점을 배울 수 있을까요?\n크레버스_챗봇: 실패는 배움의 기회라고 생각해요. 실패한 부분을 다시 돌아보고, 어떻게 개선할 수 있는지 생각해보는 것이 중요해요!\n학생: 다른 사람들은 어떻게 학업 성적을 향상시키나요?\n크레버스_챗봇: 학업 성적 향상에 제일 중요한 것은 성실하고 꾸준하게 주어진 내용을 모두 학습하고 숙제나 과제를 완수하는 것이에요. 동영상이나 책으로 다른 사람들의 공부 방법을 찾아보는 것도 방법이 될 수 있어요.\n학생: 현재 학습 중인 과목과 관련된 실생활 문제를 찾아내고, 어떻게 그 문제를 해결할 수 있는지 생각해 볼 수 있을까요?\n크레버스_챗봇: 예를 들어, 분수를 이용해 요리 레시피의 양을 계산하거나 돈을 관리하는 방법을 배워 실생활에서 도움을 줄 수 있어요!\n학생: 수학 문제를 푸는 데 어려움을 겪을 때 어떻게 해결할 수 있을까요?\n크레버스_챗봇: 문제를 한 단계씩 분해하고 그림이나 그래프를 활용해 시각적으로 이해해보세요.\n학생: 과학 실험을 할 때 실험 결과를 정확하게 분석하고 해석하는 방법은 무엇인가요?\n크레버스_챗봇: 실험 과정과 관련된 관찰과 실험 결과를 비교하고 패턴을 찾아보세요.\n학생: 영어 단어를 외울 때 효과적인 방법은 무엇인가요?\n크레버스_챗봇: 영어 단어를 외울 때, 카드 뒤집기 게임이나 노래로 단어를 반복해서 외워보세요. 가장 좋은 단어 공부법은 많은 독해를 통해 자연스럽게 습득하는 것입니다.\n학생: 국어 시험에서 글쓰기 부분에서 좋은 점수를 받으려면 어떤 요소에 주의해야 할까?\n크레버스_챗봇: 국어 시험의 글쓰기 부분에서 좋은 점수를 받으려면, 명확한 주제 문장과 충분한 예시를 포함해 표현력과 논리력을 강조하세요.\n학생: 역사 공부를 할 때 사건과 인물을 연결지어 이해하는 방법은 무엇인가요?\n크레버스_챗봇: 역사 공부를 할 때, 시대적인 흐름과 인물들의 사건과 관계를 이해하며 관련 자료와 동영상을 유튜브 등에서 적극적으로 활용해보세요.\n학생: 지리 지식을 기억하기 위해 어떤 방법을 사용할 수 있을까요?\n크레버스_챗봇: 지도를 자주 참고하고 지리적 특징과 관련된 이야기를 만들어 기억해보세요.\n학생: 미술 작품을 분석하고 해석할 때 주의해야 할 사항은 무엇인가요?\n크레버스_챗봇: 미술 작품을 분석하고 해석할 때, 작품의 주제, 색상, 조형요소 등을 관찰하고 자신의 감정과 관련시켜 이야기해보세요.\n학생: 체육 수업에서 자신의 실력을 향상시키기 위해 어떤 운동이 도움이 될까요?\n크레버스_챗봇: 체육 수업에서 자기 실력을 향상시키기 위해, 다양한 운동을 시도하고 동기부여를 위해 친구와 함께 운동하세요. 체력을 키우기 위해 유산소 운동, 유연성을 위해 스트레칭이나 필라테스를 시도해보세요.\n학생: 음악 이론을 이해하고 악기 연주에 적용하기 위해 어떻게 공부할 수 있을까?\n크레버스_챗봇: 기초적인 음악 이론 교재와 악기 연습을 꾸준히 진행해보세요. 이후 작곡이나 편곡을 시도해보면서 음악 이론을 실제로 적용해보세요.\n학생: 정보 기술(IT) 과목에서 프로그래밍을 배우기 위해 어떻게 공부해야 할까요?\n크레버스_챗봇: 기초적인 내용은 인터넷 블로그와 유튜브에서 쉽게 찾아보고 학습할 수 있어요! 내용을 효과적이고 빠르게 배우기 위해선 씨큐브코딩을 한 번 방문해보시는건 어떨까요?",
      maxTokens: 200,
      temperature: 0.3,
      repeatPenalty: 5,
      start: "\n크레버스_챗봇:",
      restart: "\n학생:",
      stopBefore: [ "\n", "학생:", "크레버스_챗봇:" ],
      includeTokens: true,
      includeAiFilters: true,
      includeProbs: false,
    },
    pageSettings: {
      theme: "blackWhite", //사용
      title: "글쓰기 숙제, 틀리기 쉬운 맞춤법! 이젠 틀리지 말자!", // 사용
      instruction: // 사용
        "더운 여름날, 푹푹찌는 교실에서 답답한 교복을 입고 수업을 듣는 나였다. 그 날도 어김없이 선생님의 수업을 들으며 열심히 필기를 하는데, 글쎄 멍청한 내 짝이 나에게 이상한 장난을 치지 않는가? 그래서 10분가량 다퉜고 선생님은 나를 따로 불러 칠판에 커다랗게 반성문을 쓰게 하셨는데..",
      mainBanner: // 사용
        "https://forumadmin.blob.core.windows.net/images/8cb302f0-036b-11ee-be9f-7794c53183e6.png",
      chatbotName: "씨큐브코딩 학업 도우미 챗봇", // 사용
      chatbotSummary: "학업을 향상시키기 위한 팁을 알려주는 챗봇입니다.",
      chatbotPurpose: //사용
        "반성문을 제출한적이 있는데, 제가 쓴 글의 맞춤법이 너무 많이 틀려서 담임선생님이 핀잔을 주셨던 기억이 있습니다. 그 때의 기억이 떠올라 반성문이나 국어 레포트 제출용으로 만들었습니다.",
      chatbotGuide: // 사용
        "(순서1) 먼저 입력창에 물어보고 싶은 내용을 입력해주세요.\n\n(순서2) 편지 발송하기 버튼을 눌러주세요. 내용에 따라 로딩속도는 1~10초까지 걸려요.\n\n(순서3) 만약 반응이 없으면 새로고침해주세요!",
      chatbotEffect: "맞춤법으로 구글창과 네이버를 들어갈 필요 없겠죠?",
      chatbotWelcomeMessage: // 사용
        "안녕하세요! 여러분들의 효과적인 학업 생활을 도와주는 씨큐브코딩 챗봇이에요. :) 성적을 올리기 위해 궁금한 것들을 질문해 주세요!",
      chatbotIcon: "🐼", // 사용
    },
}

// 채팅창에 일자 갖고 오기
// const date = new Date();
const getTime = () => {
  const date = new Date();
  const _hour = date.getHours();
  const _min = date.getMinutes();
  let res = "";
  let hour = "";
  let min = "";

  if(_hour < 13) {
    hour = `오전 ${_hour}시`;
  } else {
    if ((_hour-12) < 10) {
      hour = `오후 0${(_hour-12)}시`;
    } else {
      hour = `오후 ${_hour-12}시`
    }
  }

  if(_min < 10) {
    min = `0${_min}분`
  } else {
    min = `${_min}분`
  }

  res = `${hour} ${min}`;
  return res;

}

const welcomeDate = getTime();

const LcmsPractice1 = () => {
  // 통신 관련, 정식 서비스시 바꿔줘야 함
  const TEST_SUBMIT_URL = "http://localhost:3005/questioningAnswering";

  const config = {
    "Content-Type": "application/json",
  };

  // 로딩
  const [loading, setLoading] = useState(false);

  // 챗봇 로그(배열)
  const [logs, setLogs] = useState([]);
  // input 질문, 대화창 표시 아님
  const [_inputValue, _setInputValue] = useState("");
  // input 질문, 대화창 표시용
  const [inputValue, setInputValue] = useState("");
  // 학습데이터+input 질문
  const [chatText, setChatText] = useState("");
  // 전송버튼을 클릭하자마자 input창이 안보임
  const [inputShow, setInputShow] = useState(true);
  const inputChatText = (e) => {
    _setInputValue(e.target.value);
    setChatText(
      demoData.learningData.text +
      demoData.learningData.restart +
        e.target.value
    );
  };

  const sendMessage = () => {
    if (!_inputValue) {
      return;
    }
    // 로딩
    setLoading(true);

    setInputValue(_inputValue);

    setInputShow(false);

    // ★ landingPageSettingData.learningData를 바로 던지며 안됨
    const learningData = demoData.learningData;
    const data = {
      name: learningData.name,
      engine: learningData.engine,
      topP: learningData.topP,
      topK: learningData.topK,
      title: learningData.title,
      // restart와 input창의 챗팅텍스트 결합하여 전송
      text: chatText,
      maxTokens: learningData.maxTokens,
      temperature: learningData.temperature,
      repeatPenalty: learningData.repeatPenalty,
      start: learningData.start,
      restart: learningData.restart,
      stopBefore: learningData.stopBefore,
      includeTokens: true,
      includeAiFilters: true,
      includeProbs: false,
  }

    axios
      // .post(TEST_SUBMIT_URL, data, config)
      .post("/testapp/v1/completions/LK-D2", data, config)
      .then((res) => {
        // 출력 토큰 가공
        const _outputText = res.data.result.outputText.replace(
          learningData.start,
          ""
        );
        const outputText = _outputText.replace(
          learningData.restart,
          ""
        );
        setLoading(false);
        setLogs([
          ...logs,
          {
            myMessage: _inputValue,
            chatBotMessage: outputText,
            date: getTime(),
          },
        ]);
        _setInputValue("")
        setInputShow(true)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        _setInputValue("")
        setInputShow(true)
      });
  };

  // 채팅 메시지 란에 스크롤 가장 아래로 내리기
  const messageEndRef = useRef(null);
  // eslint-disable-next-line
  useDidMountEffect(() => {
    const scrollHeight = messageEndRef.current.scrollHeight;
    messageEndRef.current.scrollTop = scrollHeight;
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", fontFamily: "NanumSquareNeo" }}>
              <div
                className="chatBot"
                style={{
                  position: "relative",
                  width: 400,
                  height: 760,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: 20,
                  border: "1px solid #F0F0F0",
                }}
              >
                <div
                  ref={messageEndRef}
                  style={{
                    marginTop: 40,
                    overflowY: "scroll",
                    overflowX: "hidden",
                    width: 400,
                    height: 620,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      fontSize: 59,
                    }}
                    className="pageSettings.chatbotIcon"
                  >
                    {demoData.pageSettings.chatbotIcon}
                  </div>
                  <div
                    className="landingPageSettingData.pageSettings.chatbotName"
                    style={{
                      marginTop: 8,
                      maxWidth: 180,
                      fontSize: 18,
                      fontWeight: 900,
                      color: "#000",
                      textAlign: "center",
                      lineHeight: "26px"
                    }}
                  >
                    {`${demoData.pageSettings.chatbotName}에게 문의하기`}
                  </div>
                  <div
                  className="landingPageSettingData.pageSettings.chatbotSummary"
                    style={{marginTop: 10, maxWidth: 200, fontSize: 16, color: "#000", textAlign: "center", fontWeight: 400, whiteSpace: "pre-line", lineHeight: "24px" }}
                  >
                    {`학업을 향상시키기 위한 팁을\n알려주는 챗봇입니다.`}
                  </div>
                  <Image src={dashed2} style={{ marginTop: 32, width: 336 }} preview={false}></Image>

                  {/* 환영메시지 */}
                  <div className="DialogueBoxBW" ref={messageEndRef}>
                    <div className="logDateBW">{welcomeDate}</div>
                    <div className="chatbotMessageBW">
                      {demoData.pageSettings.chatbotWelcomeMessage}
                    </div>
                  </div>
                  {logs.length > 0 &&
                    logs.map((log) => (
                      <div key={uuid()}>
                        <div className="myMessageBoxBW">
                          <div className="logDateBW">{log.date}</div>
                          <div className="myMessageBW">{log.myMessage}</div>
                        </div>
                        <div className="DialogueBoxBW">
                          <div className="logDateBW">{log.date}</div>
                          <div className="chatbotMessageBW">
                            {log.chatBotMessage}
                          </div>
                        </div>
                      </div>
                    ))}

                  {loading ? (
                    inputValue && (
                      <div className="myMessageBoxBW">
                        <div className="logDateBW">{getTime()}</div>
                        <div className="myMessageBW">{inputValue}</div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                  {!loading ? (
                    <></>
                  ) : (
                    <>
                      <div className="DialogueBoxBW">
                        <div className="logDateBW">{getTime()}</div>
                        <div className="chatbotMessageBW">...</div>
                      </div>
                    </>
                  )}
                  {/* <div ref={messageEndRef}></div> */}

                  <div
                    className='chatbotInputMessage'
                    style={{
                      width: 353,
                      backgroundColor: "white",
                      position: "absolute",
                      bottom: 30,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    
                    {
                      inputShow
                      ?
                      <Input
                        onChange={inputChatText}
                        value={_inputValue}
                        style={{ width: 276, height: 52, borderRadius: 20 }}
                        onKeyDown={(e)=>{
                          if(e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                        />
                      :
                      <Input
                        disabled
                        style={{ width: 276, height: 52, borderRadius: 20 }}/>
                    }
                    <Button
                      loading={loading}
                      onClick={sendMessage}
                      style={{
                        borderRadius: 20,
                        marginLeft: 10,
                        width: 52,
                        height: 52,
                        backgroundColor: "#000",
                      }}
                      type="primary"
                      icon={<Image  src={sendIconBW} preview={false} />}
                    ></Button>
                  </div>                  
                </div>
                
              </div>
    </div>
  );
}

export default LcmsPractice1;