// 해야할 것: 이미지 업로드 시, 응답 결과로 받은 이미지 URL을 onFinish > formData에서 변환해야함. 
import { Button, Radio, Input, Space, Upload, Select, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { useEffect, useState } from 'react';
import ErrorPage from '../Error/ErrorPage';
import axios from 'axios';
import F5KeyAlertModal from '../F5KeyAlertModal';
const { TextArea } = Input;

const imojiArray = [ "🐇", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦", "🦨","🦘","🦡","🐾","🦃","🐔","🐓","🐣","🐤","🐥","🐦","🐧","🕊","🦅","🦆","🦢","🦉","🦩","🦚","🐙","🐚","🐌","🦋","🐛","🐜","🐝","🐞","🦗","🕷","🕸","🦂","🦟","🦠","💐","🌸","💮","🏵","🌹","🥀","🌺","🌻","🌼","🌷","🌱","🌲","🌳","🍌","🍍","🥖","🥨","🥯","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🥙","🍣","🍤","🍥","🥮","🍡","🥟","🥠","🥡","🦀","🦞","🦐","🦑","🍮","🍯","🥤","🧃","🧉","🧊","🥢","🍽","🍴","🥄","🔪","🏺","🌍","🌎","🌏","🌐","🗺","🧭","🏔","🏫","🏬","🏭","🏯","🏰","💒","🗼","🗽","⛪","⛲","⛺","🌁","🌃","🏙","🌄","🌅","🌆","🌇","🌉","♨","🎠","🎡","🎢","💈","🚚","🚛","🚜","🏎","🏍","🛵","🦽","🦼","🛺","🚲","🛴","🛹","🚏","🛢","⛽","🚨","🛬"]

// 셀렉트 박스내 teamName 리스트
const teamNameList = Array.from({length: 20}, (_, i) => ({ value: i+2, label: `${i+1}조` }))

const LcmsLandingPageSettingsAuth = () => {
  const [teamName, setTeamName] = useState("조 이름");
  const onChangeTeamName = (e) => {
    setTeamName(e);
  }

  // 저장하기 버튼 클릭 시, form 제출
  const onFinish = () => {
    const data = {
      themeColor: themeColor,
      title: title,
      description: description,
      mainBanner: mainBanner,
      chatbotName: chatbotName,
      chatbotIntroduction: chatbotIntroduction,
      chatbotPurpose: chatbotPurpose,
      chatbotDirections: chatbotDirections,
      expectedEffect: expectedEffect,
      welcomeMessage: welcomeMessage,
      chatbotIcon: chatbotIcon,
      practiceItemId: practiceItemId
    }

    // 유효성 검사
    if (!data.practiceItemId) {
      window.alert("챗봇 설정 > 협동 학습 데이터를 선택해주세요.");
      return;
    }
    else if (!data.themeColor) {
      window.alert("홈페이지 설정 > 템플릿을 선택해주세요.")
      return
    } else if (!data.title) {
      window.alert("홈페이지 설정 > 타이틀을 작성해주세요.");
      return;
    } else if (!data.description) {
      window.alert("홈페이지 설정 > 설명 입력을 작성해주세요.");
      return;
    // } else if (!data.mainBanner) {
    } else if (!fileList) {
      window.alert("홈페이지 설정 > 메인배너를 작성해주세요.");
      return;
    } else if (!data.chatbotName) {
      window.alert("챗봇 설정 > 챗봇 이름을 작성해주세요.");
      return;
    } else if (!data.chatbotIntroduction) {
      window.alert("챗봇 설정 > 챗봇 한줄소개를 작성해주세요.");
      return;
    } else if (!data.chatbotPurpose) {
      window.alert("챗봇 설정 > 챗봇 목적을 작성해주세요.");
      return;
    } else if (!data.chatbotDirections) {
      window.alert("챗봇 설정 > 챗봇 사용설명을 작성해주세요.");
      return;
    } else if (!data.expectedEffect) {
      window.alert("챗봇 설정 > 챗봇 기대효과를 입력해주세요.");
      return;
    } else if (!data.welcomeMessage) {
      window.alert("챗봇 설정 > 챗봇 환영 메시지를 입력해주세요.");
      return;
    }

    window.alert("저장되었습니다.")

    // landingPageSetting 값 전송해야 함
    const formData = {
      teamId: teamName,
      memberId: iframeData.stdId,
      classId: iframeData.clsId,
      landingPage:
      {
        title: data.title,
        description: data.description,
        themeColor: data.themeColor,
        bannerImage: {
          "name": data.mainBanner.name,
          "path": data.mainBanner.path,
        },
        chatbotIcon: {
          "name": data.chatbotIcon,
          "path": data.chatbotIcon,
        },
        chatbotName: data.chatbotName,
        chatbotIntroduction: data.chatbotIntroduction,
        chatbotPurpose: data.chatbotPurpose,
        chatbotDirections: data.chatbotDirections,
        expectedEffect: data.expectedEffect,
        welcomeMessage: data.welcomeMessage,
        practiceItemId: data.practiceItemId,
      }
    }

    axios.post("https://clova-practice.codingbiz.creverse.com/api/team/landing", formData, {
      headers: {
          "Content-Type": 'application/json',
      }
    })
    .then((res) => {
      
    })
    .catch((error) => {
      console.log(error)
    })
  };

  // ★ 이미지 업로드 전 체크
  // 썸네일에 보여지는 파일리스트
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    // 파일 형식이 'image/jpeg', 'image/png', 'image/jpg' 중 하나인지 확인.
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isImage) {
      window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
      setFileList(null); // 썸네일에 안보여짐
      return Promise.reject(); // png, jpg, jpeg가 아니면 업로드를 중단.
    }
  
    // Promise를 반환. 이 Promise는 파일의 너비를 체크하고 파일 업로드를 결정.
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
    
      // 이미지가 업로드되면 실행
      img.onload = () => {
        if (img.width !== 450 || img.height !== 340) {
          window.alert('이미지(너비: 450px, 높이: 340px)만 올리실 수 있습니다.');
          setFileList(null); // 썸네일에 안보여짐
          reject(file);
          // axios 통신안함
        } else {
          setFileList([file]); // 썸네일에 보여짐
          resolve(file);
          // axios 통신함
          const formData = new FormData();
          formData.append('file', file);
          axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
          .then((res) => {
            setMainBanner({
              name: res.data.originalName,
              path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
            })
            setFileList([{
              uid: '-1',
              name: res.data.originalName,
              status: 'done',
              url: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
            }])
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }
    })
  };

  // ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장
  // 아이프레임 부모로부터 받은 메시지('학생고유번호', '클래스고유번호')
  const [iframeData, setIframeData] = useState({stdId: "", clsId: ""});
  // 인증오류 상태값
  const [authError, setAuthError] = useState(false);
  // 아이프레임 부모로부터 받은 메시지(Error)
  const [iframeErrorData, setIframeErrorData] = useState(null);

  // 화면 불러오기 로딩 띄우기 로딩
  const [isModalFilesOpen, setIsModalFilesOpen] = useState(false);

  useEffect(()=> {
    // 이벤트 들었을 떄, 실행
    const exec = (e) => {
      // 인증 로딩창
      setIsModalFilesOpen(false);
      let _iframeData = e;
      if(_iframeData.data.stdId && _iframeData.data.clsId) {
        setAuthError(false);
        setIsModalFilesOpen(false);
        
        // setIframeData({stdId: 7, clsId: 1029957}) // 테스트
        setIframeData({stdId: _iframeData.data.stdId, clsId: _iframeData.data.clsId});
        console.log("LCMS 고유정보 확인");
      } 
      if ((_iframeData.data.type === "webpackWarnings")) {
        setIframeErrorData(_iframeData.data);
        setIsModalFilesOpen(false);
      }
    }

    window.addEventListener('message', exec);
    // webpackWarning 외에 다른 메시지가 들어왔을 때, 조건에 추가
    if(iframeErrorData?.type === "webpackWarnings") {
      if(!(iframeData.stdId && iframeData.clsId)) {
        setAuthError(true);
        setIsModalFilesOpen(true);
      } else {
        setAuthError(false);
        setIsModalFilesOpen(false);
      }
    } else {
      setAuthError(false);
      setIsModalFilesOpen(false);
    }

    return() => {
      window.removeEventListener('message', exec);
    };
  }, [iframeData, iframeErrorData])
  // ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장


    // 테스트 응답결과
    // const pageURL = "http://localhost:3000/#/classchatbot/landing/" + iframeData.clsId + "/" + teamName;
    const pageURL = "https://clova-practice.codingbiz.creverse.com/#/classchatbot/landing/" + iframeData.clsId + "/" + teamName;


    // 이미지 사이즈가 450px가 아니면, onRemove



  // ★ 기능 1_학습데이터 조회, 랜딩 페이지 조회
  const [practices, setPractices] = useState([]);
  const [themeColor, setThemeColor] = useState("");
  const themeHandler = (e) => {
    setThemeColor(e.target.value);
  }
  const [title, setTitle] = useState("");
  const titleHandler = (e) => {
    setTitle(e.target.value);
  }
  const [description, setDescription] = useState("");
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  }
  const [chatbotName, setChatbotName] = useState("");
  const chatbotNameHandler = (e) => {
    setChatbotName(e.target.value);
  }
  const [chatbotIntroduction, setChatbotIntroduction] = useState("");
  const chatbotIntroductionHandler = (e) => {
    setChatbotIntroduction(e.target.value);
  }
  const [chatbotPurpose, setChatbotPurpose] = useState("");
  const chatbotPurposeHandler = (e) => {
    setChatbotPurpose(e.target.value);
  }
  const [chatbotDirections, setChatbotDirections] = useState("");
  const chatbotDirectionsHandler = (e) => {
    setChatbotDirections(e.target.value);
  }
  const [expectedEffect, setExpectedEffect] = useState("");
  const expectedEffectHandler = (e) => {
    setExpectedEffect(e.target.value);
  }

  const [welcomeMessage, setWelcomeMessage] = useState("");
  const welcomeMessageHandler = (e) => {
    setWelcomeMessage(e.target.value);
  }

  const [chatbotIcon, setChatbotIcon] = useState("");
  const chatbotIconHandler = (e) => {
    setChatbotIcon(e.target.value);
  }

  const [practiceItemId, setPracticeItemId] = useState(null);
  const practiceItemIdHandler = (e) => {
    setPracticeItemId(e.target.value);
  }

  const [mainBanner, setMainBanner] = useState("");  // 이미지 URL로 나중에 변경해야 함


  // teamName의 선택결과에 따라 getURL1 상태 변경
  useEffect(()=>{
    if(iframeData.clsId && iframeData.stdId){
      if(typeof teamName !== 'number') {
        return
      }
  
      const getURL1 = 
        `https://clova-practice.codingbiz.creverse.com/api/team/practice/class/${iframeData.clsId}/team/${teamName}`;

      axios.get(getURL1)
      .then((res)=>{
        // 자기 아이디(memberId)가 포함되어 있어야만, 목록이 보여짐
        const practices = res.data.practices;

        // 각 practice에서 memberId와 iframeData.std가 일치하는게 하나도 없으면, setIsFirstuseUser(true)
        let currUserArr = [];
        practices.forEach((practice, i) => {
          if (practice.memberId === iframeData.stdId) {
            currUserArr.push(practice);
          }
        })

        if (currUserArr.length === 0) {
          // setIsFirstUseUser(true);
          setPractices([]);
          setPracticeItemId(null);

          setThemeColor(null);
          setTitle(null);
          setDescription(null);
          setChatbotName(null);
          setChatbotIntroduction(null);
          setChatbotPurpose(null);
          setChatbotDirections(null);
          setExpectedEffect(null);
          setWelcomeMessage(null);
          setChatbotIcon(null);
          // 챗봇 설정
          setMainBanner({
            name: null,
            path: null
          });
          
          setFileList([
          ])   


          return
        }


        setPractices(res.data.practices);
        const practiceUid = res.data.practiceUid;
        const getURL2 = `https://clova-practice.codingbiz.creverse.com/api/team/practice?uid=${practiceUid}`; 
        axios.get(getURL2)
        .then((res)=>{

          const data = res.data;
          setThemeColor(data.landingPage.themeColor);
          setTitle(data.landingPage.title);
          setDescription(data.landingPage.description);
          setChatbotName(data.landingPage.chatbotName);
          setChatbotIntroduction(data.landingPage.chatbotIntroduction);
          setChatbotPurpose(data.landingPage.chatbotPurpose);
          setChatbotDirections(data.landingPage.chatbotDirections);
          setExpectedEffect(data.landingPage.expectedEffect);
          setWelcomeMessage(data.landingPage.welcomeMessage);
          setChatbotIcon(data.landingPage.chatbotIcon.path);
          setPracticeItemId(data.practiceItem.id);
          // 챗봇 설정
          setMainBanner({
            name: data.landingPage.bannerImage.name,
            path: data.landingPage.bannerImage.path
          });
          
          setFileList([
            {
              uid: '-1',
              name: data.landingPage.bannerImage.name,
              status: 'done',
              url: data.landingPage.bannerImage.path,
            },
          ])   
        })
        .catch((error)=>{
          console.log(error)
          // throw new Error (error)
        })
      })
      .catch((error)=>{
        console.log(error);
        setPractices([]);
        setPracticeItemId(null);

        setThemeColor(null);
        setTitle(null);
        setDescription(null);
        setChatbotName(null);
        setChatbotIntroduction(null);
        setChatbotPurpose(null);
        setChatbotDirections(null);
        setExpectedEffect(null);
        setWelcomeMessage(null);
        setChatbotIcon(null);
        // 챗봇 설정
        setMainBanner({
          name: null,
          path: null
        });
        
        setFileList([
        ])   

        // ★ 처음 사용자인 경우
        if(error.response.status === 404) {
          console.log("첫 사용자 확인");
        }
      })
    }
    // eslint-disable-next-line
  },[iframeData, teamName])
  // ... ★ 기능 1_학습데이터 조회
  
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
        {authError ? (
          <ErrorPage />
        ) : (
          <>
            <div
              style={{
                width: 980,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <F5KeyAlertModal />
              <div className="hompageSettings">
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    position: "relative",
                  }}
                >
                  <div style={{ marginLeft: 7, zIndex: 1 }}>
                    조 설정
                  </div>
                  <div
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(38, 198, 218, 0.3)",
                        width: 85,
                        height: 8,
                        top: 18,
                        zIndex: 0,
                      }}
                    ></div>
                </div>
                <div
                  style={{
                    width: 900,
                    minHeight: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: 180,
                      fontWeight: 600,
                    }}
                  >
                    조 이름 선택
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                      value={teamName}
                      options={teamNameList}
                      style={{
                        width: 140,
                      }}
                      onChange={onChangeTeamName}
                    />
                </div>

                <div
                  style={{
                    marginTop: 60,
                    fontSize: 22,
                    fontWeight: 700,
                    position: "relative",
                  }}
                >
                  <div style={{ marginLeft: 7, zIndex: 1 }}>
                    {teamName === "조 이름" ? (
                      <>{`홈페이지 설정`}</>
                    ) : (
                      <>{`홈페이지 설정 - ${teamName - 1}조`}</>
                    )}
                  </div>
                  {
                    teamName === "조 이름" ? (
                      <div
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(38, 198, 218, 0.3)",
                        width: 153,
                        height: 8,
                        top: 18,
                        zIndex: 0,
                      }}
                    ></div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "rgba(38, 198, 218, 0.3)",
                          width: 210,
                          height: 8,
                          top: 18,
                          zIndex: 0,
                        }}
                      ></div>
                    )
                  }
                </div>
                

                <div
                  style={{
                    width: 900,
                    minHeight: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: 180,
                      fontWeight: 600,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span>협동 학습 데이터</span>
                    <span>
                      조회 & 선택<span style={{ color: "red" }}>*</span>
                    </span>

                  </div>
                  <div style={{ width: 720, height: 500, overflowX: "hidden", overflowY: "auto" }}>
                    
                    {practices.length <= 0 ? (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ marginTop: 20, color: "red" }}>
                          선택하신 조의 홈페이지를 설정하실 권한이 없습니다. 조 이름을 확인해주세요.
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Radio.Group
                          value={practiceItemId}
                          onChange={practiceItemIdHandler}
                        >
                          <Space direction="vertical">
                            {practices.map((data) => (
                              <Radio
                                key={uuid()}
                                value={data.id}
                                style={{ fontSize: 20 }}
                              >{`${data.name} / ${data.subject}`}</Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 105,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    템플릿 선택<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <Radio.Group onChange={themeHandler} value={themeColor}>
                      <Space direction="vertical">
                        <Radio value="blackWhite" style={{ fontSize: 18 }}>
                          Black White
                        </Radio>
                        <Radio value="blueHouse" style={{ fontSize: 18 }}>
                          Blue House
                        </Radio>
                        <Radio value="sand" style={{ fontSize: 18 }}>
                          Sand
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    타이틀 입력<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={30}
                      rows={1}
                      style={{ resize: "none" }}
                      showCount
                      onChange={titleHandler}
                      value={title}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    설명 입력<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={100}
                      rows={3}
                      style={{ resize: "none" }}
                      showCount
                      value={description}
                      onChange={descriptionHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    marginTop: 40,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    메인배너<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <Upload
                      beforeUpload={beforeUpload}
                      // action="/upload.do" // upload url
                      listType="picture"
                      maxCount={1}
                      fileList={fileList}
                      previewFile={mainBanner}
                      showUploadList={{
                        showRemoveIcon: false,
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    <div style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.45)" }}>
                      (필수) 파일형식: jpg, jpeg, png / 너비: 450px / 높이:
                      340px
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 60,
                    fontSize: 22,
                    fontWeight: 700,
                    position: "relative",
                  }}
                >
                  <div style={{ marginLeft: 7, zIndex: 1 }}>
                    {teamName === "조 이름" ? (
                      <>{`챗봇 설정`}</>
                    ) : (
                      <>{`챗봇 설정 - ${teamName - 1}조`}</>
                    )}
                  </div>
                  {
                    teamName === "조 이름" ? (
                      <div
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(38, 198, 218, 0.3)",
                        width: 110,
                        height: 8,
                        top: 18,
                        zIndex: 0,
                      }}
                    ></div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "rgba(38, 198, 218, 0.3)",
                          width: 165,
                          height: 8,
                          top: 18,
                          zIndex: 0,
                        }}
                      ></div>
                    )
                  }
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 이름<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={12}
                      rows={1}
                      style={{ resize: "none" }}
                      showCount
                      value={chatbotName}
                      onChange={chatbotNameHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 한줄소개<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={30}
                      rows={1}
                      style={{ resize: "none" }}
                      showCount
                      value={chatbotIntroduction}
                      onChange={chatbotIntroductionHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 목적<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={100}
                      rows={3}
                      style={{ resize: "none" }}
                      showCount
                      value={chatbotPurpose}
                      onChange={chatbotPurposeHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 40,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 사용설명<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={100}
                      rows={3}
                      style={{ resize: "none" }}
                      showCount
                      value={chatbotDirections}
                      onChange={chatbotDirectionsHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 40,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 기대효과<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={30}
                      rows={1}
                      style={{ resize: "none" }}
                      showCount
                      value={expectedEffect}
                      onChange={expectedEffectHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 40,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: 180, fontWeight: 600 }}>
                    챗봇 환영 메시지<span style={{ color: "red" }}>*</span>
                  </div>
                  <div style={{ width: 720 }}>
                    <TextArea
                      maxLength={60}
                      rows={3}
                      style={{ resize: "none" }}
                      showCount
                      value={welcomeMessage}
                      onChange={welcomeMessageHandler}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 900,
                    height: 420,
                    fontSize: 18,
                    display: "flex",
                    padding: 20,
                    marginTop: 40,
                  }}
                >
                  <div style={{ width: 180, height: 420, fontWeight: 600 }}>
                    챗봇 아이콘<span style={{ color: "red" }}>*</span>
                  </div>
                  <div
                    className="chatbotIconSettings"
                    style={{ width: 720, height: 420 }}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      value={chatbotIcon}
                      onChange={chatbotIconHandler}
                    >
                      {imojiArray.map((imoji) => (
                        <Radio.Button
                          key={uuid()}
                          value={imoji}
                          style={{ fontSize: 20 }}
                        >
                          {imoji}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button type="primary" onClick={onFinish}>
                  저장하기
                </Button>
                <Button
                  onClick={() => {
                    // 새탭 페이지이동
                    teamName === "조 이름"
                    ?
                      window.alert("미리보기 전, 조 이름을 선택해주세요.")
                    :
                      window.open(pageURL, "_blank");
                  }}
                  style={{
                    backgroundColor: "rgb(55, 193, 213)",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  미리보기
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default LcmsLandingPageSettingsAuth;