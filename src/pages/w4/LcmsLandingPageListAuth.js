import { useState, useEffect } from "react";
import { List, Modal, Spin } from 'antd';
import ErrorPage from "../Error/ErrorPage";
import axios from "axios";

// 테스트
const teamNameList = Array.from({length: 20}, (_, i) => ({ value: `${i+1}조`, label: `${i+1}조` }))

// 학급반 학생들의 정보데이터(1.챗봇아이콘, 2.페이지URL, 3.챗봇이름, 4.제목, 5.챗봇목적)
// eslint-disable-next-line


const LcmsLandingPageListAuth = () => {
  // ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장
  // 아이프레임 부모로부터 받은 메시지('학생고유번호', '클래스고유번호')
  const [iframeData, setIframeData] = useState({stdId: "", clsId: ""});
  // 인증오류 상태값
  const [authError, setAuthError] = useState(false);
  // 아이프레임 부모로부터 받은 메시지(Error)
  const [iframeErrorData, setIframeErrorData] = useState(null);

  useEffect(()=> {
    // 이벤트 들었을 떄, 실행
    const exec = (e) => {
      // 인증 로딩창
      let _iframeData = e;
      // let data = {stdId: "", clsId: 5678} // 테스트
      if(_iframeData.data.stdId && _iframeData.data.clsId) {
        setAuthError(false);
        // setIframeData({stdId: 2, clsId: 1029957}) // 테스트
        setIframeData({stdId: _iframeData.data.stdId, clsId: _iframeData.data.clsId});
        console.log("LCMS 고유정보 확인");
      } 
      if ((_iframeData.data.type === "webpackWarnings")) {
        setIframeErrorData(_iframeData.data);
      }
    }

    window.addEventListener('message', exec);
    // webpackWarning 외에 다른 메시지가 들어왔을 때, 조건에 추가
    if(iframeErrorData?.type === "webpackWarnings") {
      if(!(iframeData.stdId && iframeData.clsId)) {
        setAuthError(true);
      } else {
        setAuthError(false);
      }
    } else {
      setAuthError(false);
    }

    return() => {
      window.removeEventListener('message', exec);
    };
    }, [iframeData, iframeErrorData])
  // ... ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장

  // ★ 기능 1_클래스에 학습자들 정보 조회

  // 화면에 표시할 데이터
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(iframeData.clsId)
    {
      axios.get(`https://clova-practice.codingbiz.creverse.com/api/team/practice/class/${iframeData.clsId}?page=0&size=30`)
      .then((res)=>{
        const tmpData = [];
        const files = res.data.items;
        files?.forEach((file, i) => {
          console.log(file)
          tmpData.push({
            chatbotName: file.chatbotName,
            title: file.chatbotTitle,
            chatbotIcon: file.emojiFilePath,
            chatbotPurpose: file.chatbotPurpose,
            // pageURL: `http://localhost:3000/#/classchatbot/landing/${iframeData.clsId}/${file.team.id}`,
            pageURL: `https://clova-practice.codingbiz.creverse.com/#/classchatbot/landing/${iframeData.clsId}/${file.team.id}`,
            teamName: file.team.name
          })
        });
        setData(tmpData);
        setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 설정
      })
      .catch((error)=>{
        console.log(error)
        setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 설정
      })
    }
  },[iframeData])
  // ... ★ 기능 1_클래스에 학습자들 정보 조회

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
    {
      loading ? (
        <Modal
        open={loading}
        footer={null}
        title="로딩 중..."
        width={120}
        closable={false}
      >
        <Spin style={{ marginLeft: 25 }} />
      </Modal>
      ) :
      authError ? (
        <ErrorPage />
      ) :
      <div
        style={{
          width: 980,
          display: "flex",
        }}
      >
        <div>
          <div
            style={{ fontSize: 22, fontWeight: 700, position: "relative" }}
          >
            <div style={{ marginLeft: 7, zIndex: 1 }}>
              친구들의 조별 홈페이지 확인 후 의견 나누기
            </div>
            <div
              style={{
                position: "absolute",
                backgroundColor: "rgba(38, 198, 218, 0.3)",
                width: 395,
                height: 8,
                top: 18,
                zIndex: 0,
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{width: 900, marginTop: 20 }}>
              {
                data.length === 0
                ?
                <div style={{textAlign: "center", color: "gray"}}>표시할 친구들의 챗봇 페이지가 없습니다.</div>
                :
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <div style={{ width: 60, height: 60, fontSize: 36, textAlign: "center" }}>{item.chatbotIcon}</div>
                        }
                        title={<a href={item.pageURL} target='_blank' rel="noopener noreferrer">[{item.teamName} - {item.chatbotName}] {item.title}</a>}
                        description={item.chatbotPurpose}
                      />
                    </List.Item>
                  )}
                />

              }
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default LcmsLandingPageListAuth;