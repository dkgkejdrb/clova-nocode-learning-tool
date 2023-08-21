// landingPageSettingSlice 로부터 전역 상태값 가져와야 함
import { useParams } from "react-router-dom";
import { Space, Image, Button, Input } from 'antd';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import useDidMountEffect from '../../w3/useDidMountEffect';
import { useSelector } from 'react-redux';
import dashed from '../../../assets/dashed.png';
import dashed2 from '../../../assets/dashed2.png';
import sendIconBW from '../../../assets/sendIconBW.png';
import './BlackWhite.css'

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

const BlackWhite = () => {
  const teamId = useParams().subId;

  // 통신 관련, 정식 서비스시 바꿔줘야 함
  // eslint-disable-next-line
  const TEST_SUBMIT_URL = "http://localhost:3005/questioningAnswering";

  const config = {
    "Content-Type": "application/json",
  };

  const landingPageSettingData = useSelector( state => {
    return state.landingPageSettingSlice.landingPageSetting;
  })

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
      landingPageSettingData.practiceItem.text +
      landingPageSettingData.practiceItem.restart.replace(/↵/g, '\n') + // 수정1
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

    setInputShow(false)

    // ★ landingPageSettingData.learningData를 바로 던지며 안됨
    const learningData = landingPageSettingData.practiceItem;

    let __stopBefore = learningData["stopBefore"].split(','); // 수정1
    let _stopBefore = __stopBefore.map(item => item.replace(/↵/g, '\n')); // 수정1
    
    const data = {
      name: learningData.name,
      engine: learningData.engine,
      topP: learningData.topP,
      topK: learningData.topK,
      title: learningData.subject,
      // restart와 input창의 챗팅텍스트 결합하여 전송
      text: chatText,
      maxTokens: learningData.maxToken,
      temperature: learningData.temperature,
      repeatPenalty: learningData.repeatPenalty,
      start: learningData.start.replace(/↵/g, '\n'), // 수정1
      restart: learningData.restart.replace(/↵/g, '\n'), // 수정1
      stopBefore: _stopBefore, // 수정1
      includeTokens: true,
      includeAiFilters: true,
      includeProbs: false,
  }

    axios
      // .post(TEST_SUBMIT_URL, data, config)
      .post(learningData.engine, data, config)
      .then((res) => {
        // 출력 토큰 가공
        const _outputText = res.data.result.outputText.replace(
          learningData.start.replace(/↵/g, '\n'), // 수정1
          ""
        );
        const outputText = _outputText.replace(
          learningData.restart.replace(/↵/g, '\n'), // 수정1
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
  useDidMountEffect(() => {
    const scrollHeight = messageEndRef.current.scrollHeight;
    messageEndRef.current.scrollTop = scrollHeight;
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ overflowX: "hidden", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "NanumSquareNeo", backgroundColor: "#000" }}>
      <div style={{width: "100%", display: "flex", justifyContent: "center", fontSize: 20, color: '#fff', height: 71, lineHeight: '64px', backgroundColor: '#000000', fontFamily: 'NanumSquareNeo', fontWeight: 700, borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}>
        <div className='BWheader'>{`${teamId-1}조 - AI챗봇 만들기`}</div>
      </div>
      <Space
        direction="vertical"
        style={{
          width: 980,
          backgroundColor: "#000000"
        }}
      >
        <div>
          <div className='BWContainer'>
            <div className='BWbannerContainer'>
            <div className='_BWbannerContainer'>
              {/* image URL로 교체 */}
              <Image
                preview={false}
                src={landingPageSettingData.landingPage.bannerImage.path}
                style={{ borderRadius: 10 }}
              ></Image>
              <div
                className='__BWContainer'>
                <div
                  className="__BWContainer_title">
                  {landingPageSettingData.landingPage.title}
                </div>
                <div
                  className="__BWContainer_description">
                  {landingPageSettingData.landingPage.description}
                </div>
              </div>
            </div>
            </div>

            <div className='BWchatbotIntroductionLine'>
              <div className='_BWchatbotIntroductionLine'>
                <div className='__BWchatbotIntroductionLine'>챗봇 소개</div>
                <div className='___BWchatbotIntroductionLine'>
                  <div className='____BWchatbotIntroductionLine'></div>
                </div>
              </div>
            </div>

            <div className='pageDownBox' style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div
              className='chatbotContainerBW'>
              <div
                className="BWleft">
                
                <div
                  style={{
                    width: 430,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ width: 150, fontWeight: 700, fontSize: 24 }}>챗봇 이름</div>
                  <div
                    className="pageSettings.chatbotName"
                    style={{ marginTop: 16, width: 300, fontWeight: 400, fontSize: 16, lineHeight: "24px" }}
                  >
                    {landingPageSettingData.landingPage.chatbotName}
                  </div>
                  <Image className='BWdashed' preview={false} src={dashed}></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 430,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ width: 150, fontWeight: 700, fontSize: 24 }}>챗봇 목적</div>
                  <div
                    className="BWchatbotPurpose">
                    {landingPageSettingData.landingPage.chatbotPurpose}
                  </div>
                  <Image className='BWdashed' preview={false} src={dashed}></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 430,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ width: 150, fontWeight: 700, fontSize: 24 }}>
                    챗봇 기대효과
                  </div>
                  <div
                    className="BWexpectedEffect">
                    {landingPageSettingData.landingPage.expectedEffect}
                  </div>
                  <Image className='BWdashed' preview={false} src={dashed}></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 430,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ width: 150, fontWeight: 700, fontSize: 24 }}>
                    챗봇 사용설명
                  </div>
                  <div
                    className="BWchatbotDirections">
                    {landingPageSettingData.landingPage.chatbotDirections}
                  </div>
                </div>

              </div>
              <div
                className="BWright">
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
                    className="pageSettings.chatbotIcon.name"
                  >
                    {landingPageSettingData.landingPage.chatbotIcon.name}
                  </div>
                  <div
                    className="landingPageSettingData.pageSettings.chatbotName"
                    style={{
                      marginTop: 8,
                      maxWidth: 176,
                      fontSize: 18,
                      fontWeight: 900,
                      color: "#000",
                      whiteSpace: "pre-line",
                      textAlign: "center",
                      lineHeight: "26px"
                    }}
                  >
                    {`${landingPageSettingData.landingPage.chatbotName}\n에게 문의하기`}
                  </div>
                  <div
                  className="landingPageSettingData.pageSettings.chatbotIntroduction"
                    style={{marginTop: 10, maxWidth: 183, fontSize: 16, color: "#000", textAlign: "center", fontWeight: 400, lineHeight: "24px" }}
                  >
                    {`${landingPageSettingData.landingPage.chatbotIntroduction}`}
                  </div>
                  <Image className='BWdashed2' src={dashed2} preview={false}></Image>

                  {/* 환영메시지 */}
                  <div className="DialogueBoxBW" ref={messageEndRef}>
                    <div className="logDateBW">{welcomeDate}</div>
                    <div className="chatbotMessageBW">
                      {landingPageSettingData.landingPage.welcomeMessage}
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
            </div>
          </div>
        </div>
      </Space>
      <div className='BWfooter'>
            <div className='_BWfooter'>Copyright © CREVERSE Inc. All right reserved.</div>
      </div>
    </div>
  );
}

export default BlackWhite;