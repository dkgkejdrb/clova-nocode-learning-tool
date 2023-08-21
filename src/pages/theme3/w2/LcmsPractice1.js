import { AudioOutlined, UploadOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Select, Upload, Form, Input } from "antd";
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GetAuthCheck from "../../auth/GetAuthCheck";
import ErrorPage from "../../Error/ErrorPage";
import './LcmsPractice1.css';

const { TextArea } = Input;

// const SUBMIT_URL = "/recog/v1/stt?lang=Kor";
const TEST_URL = "http://localhost:3004/CSR";

// Dragger 속성
const props = {
  name: "file",
  accept: ".mp3",
  maxCount: 1,
  showUploadList: {
    showRemoveIcon: false, // 삭제 아이콘을 숨김
  }
}

const Button1 = ({id, style, handler, icon, name}) => {
    const defaultStyle = { width: 100, height: 85, color: "#1967D2", backgroundColor: "#D2E3FC" }

    return (
        <Button
        id={id}
        onClick={handler}
        style={{...defaultStyle, ...style}}
      >
        {icon}
        <span>{name}</span>
      </Button>
    );
}

const LcmsPractice1 = () => {
    // GetAuthCheck().authError : LCMS외 URL로 직접 접속 체크
    // GetAuthCheck().iframeData.clsId : LCMS에서 받은 클래스고유번호
    // GetAuthCheck().iframeData.stdId : LCMS에서 받은 학생고유번호
    const authError = GetAuthCheck().authError;
    const iframeData = GetAuthCheck().iframeData;

    // 로딩 상태값 (실행하기를 누르면, true / 실행종료가 되면, false)
    const [loading, setLoading] = useState(false);
    // 실행하기, 녹음중을 클릭할 때만 true
    const [selectDisabled, setSelectDisabled] = useState(false);
    const [xBtnDisabled, setXBtnDisabled] = useState("");

    const [res, setRes] = useState("");
    const [msg, setMsg]= useState("녹음");
    const [backColor, setBackColor] = useState("#1677ff");
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    // 마이크 녹음 종료 후, 미리 들어보기할 url
    const [audioBlobUrl, setAudioBlobUrl] = useState();
    // stream 끌어올리기
    const [stream, setStream] = useState();
    // 마이크, 업로드 입력선택하는 첫 화면
    const [openFirstWindow, setOpenFirstWindow] = useState(true);
    const [openMicWindow, setOpenMicWindow] = useState(false);
    // 사용자 PC의 마이크 리스트
    const [micList, setMicList] = useState([]);
    // 녹음중 파일 시각화를 위한 캔버스
    const canvasRef = useRef();
    // 마이크 셀렉트 클릭 상태 > 페이지 첫 진입시 마이크 목록 받아올 의존성
    const [selectClicked, setSelectCliced] = useState(false);
    // 셀렉트 창에서 마이크 선택시, deviceId 저장
    const [selectOption, setSelectOption] = useState(null);
    const selectHandler = (_deviceId) => {
      setSelectOption(
          {
          deviceId: {  
              exact: _deviceId
          }
          }
      );
      setSelectCliced(!selectClicked);
    }

    useEffect(()=>{
      console.log(audioBlobUrl);
    },[audioBlobUrl, onRec])

    // CSR 첫화면 진입 시, 이용가능한 마이크 리스트 받아오는 hook
    useEffect(() => {
      if (selectOption) {
        navigator.mediaDevices.getUserMedia(
        { 
            audio: selectOption
        });
      }

        // 사용환경이 enumerateDevices()를 지원하지 않는 경우, 오류 표시
        if (!navigator?.mediaDevices || !navigator?.mediaDevices.enumerateDevices) {
          throw new Error("enumerateDevices()를 지원하지 않습니다.");
        }

        // 사용 가능한 미디어 입력, 출력장치 리스트 가져오기
        let micTmpList = [];
        navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
            if (device.kind === "audioinput") {
                micTmpList.push(
                {
                    value: device.deviceId,
                    label: device.label,
                }
                );
            }
            })
            setMicList(micTmpList);
        })
        .catch((err) => {
            throw new Error(err);
        });
    }, [openFirstWindow, selectOption])


    // ★ 버튼이 클릭 되면, onRec 상태 변경
    // 버튼 입력 후, 1초 딜레이
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const onRecHandler = () => {
      setOnRec(!onRec);
      setIsButtonDisabled(true);

      // 버튼을 1초간 비활성화한다.
      setTimeout(() => setIsButtonDisabled(false), 500);
    }

    // ★ 중요, onAudio 끌어올려 여기서 정의
    const [animationControls, setAnimationControls] = useState({startAnimation: () => {}, stopAnimation: () => {}});
    useEffect(()=>{
      // 수정 중
      const onRecAudio = () => {
        setMsg("녹음 중...");
        setSelectDisabled(true)
        setXBtnDisabled("none")
        setBackColor("red");

        // 음원정보를 담은 노드를 생성하거나 음원을 실행 또는 디코딩 시킴
        const audioCtx = new (window.AudioContext)();
        // analyzer로 음원의 진행상태에 직접접근하여 사용가능
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);
        
        const makeSound = (stream) => {
          // 내 컴퓨터의 마이크에서 데이터를 가져옴
          const source = audioCtx.createMediaStreamSource(stream);
          setSource(source);

          // 오디오 소스를 분석기(analyser)에 연결, 분석기를 audioCtx의 출력(destination)에 연결
          // 이렇게 하면 오디오 데이터가 분석기를 통해 전달되고, 그 결과가 오디오 출력으로 나옴
          source.connect(analyser);
          analyser.connect(audioCtx.destination);

          // 시각화 관련
          // 새로운 분석기를 생성, 오디오 스트림을 시각화 하는데 사용
          const vizAnalyser = audioCtx.createAnalyser();
          vizAnalyser.fftSize = 2048; // 256 ~ 2048
          const vizAudioSrc = audioCtx.createMediaStreamSource(stream);
          vizAudioSrc.connect(vizAnalyser);

          // 시각화 분석기의 frequencyBinConut에 따른 Array 생성
          // 이 Array는 오디오 데이터의 주파수 데이터를 의미
          const data = new Uint8Array(vizAnalyser.frequencyBinCount);

          const ctx = canvasRef.current.getContext('2d');
          const draw = (dataParm) => {
              dataParm = [...dataParm];             
              ctx.lineWidth = 5; // 그림 선의 너비 설정
              ctx.strokeStyle = 'rgb(30, 35, 46)'; // 선 색깔 설정
              const space = canvasRef?.current.width / dataParm.length;

              // 캔버스를 지우고 시작
              ctx.clearRect(0, 0, canvasRef?.current.width, canvasRef?.current.height);

              // 각 데이터 포인트에 대해 선을 그림
              dataParm.forEach((value, i) => {
                  ctx.beginPath();
                  ctx.moveTo(space * i, canvasRef?.current.height);  // 선의 시작점 설정(x, y)
                  ctx.lineTo(space * i, canvasRef?.current.height - value); // 선의 끝점 설정(x, y)
                  ctx.stroke(); // 선 그리기
              });
          };



          // 시각화를 위한 애니메이션 루프 시작
          let raf;
          const stopAnimation = () => {
            ctx.clearRect(0, 0, canvasRef?.current.width, canvasRef?.current.height);
            cancelAnimationFrame(raf);
          }

          const startAnimation = () => {
            const loopingFunction = () => {
                console.log("루핑함수")
                raf = requestAnimationFrame(loopingFunction); // requestAnimationFrame으로 계속 콜이 됨
                vizAnalyser.getByteFrequencyData(data);
                draw(data);
              }
              loopingFunction();
            };



          return { startAnimation, stopAnimation }
        }
      


        // 마이크 사용 권한 획득
        navigator.mediaDevices.getUserMedia(
        { 
            audio: selectOption
        }
        )
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          setStream(stream);
          setMedia(mediaRecorder);
          const controls = makeSound(stream); // makeSound 반환값(애니메이션 함수들) 받기
          controls.startAnimation();
          setAnimationControls(controls); // 상태에 애니메이션 컨트롤 함수들을 저장          
        });
    }

      let timeoutId; // setTimeout ID를 저장하기 위한 변수

      if (!onRec) {
        onRecAudio();
        // 5초 후 setOnRec(true) 실행
        timeoutId = setTimeout(() => {
          setOnRec(true);
        }, 60000);
      } 
      else {
        offRecAudio();
        animationControls.stopAnimation();
      }

      // Cleanup function
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };

    }, [onRec]);


    // 사용자가 음성 녹음을 중지했을 때
    const offRecAudio = () => {
      console.log("녹음 종료")
      // 애니메이션 종료
      animationControls.stopAnimation();

      setMsg("녹음")
      setSelectDisabled(false)
      setXBtnDisabled("")
      setBackColor("#1677ff");

      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      if (media) {
        media.ondataavailable = (e) => {
          setAudioUrl(e.data);

          // soundBlobUrl 
          let audioBlobUrl = URL.createObjectURL(e.data);
          setAudioBlobUrl(audioBlobUrl);
        };

        // 미디어 캡쳐 중지
        if (media.state === "recording") {
          media.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          source.disconnect();
        }
      }

      // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
      if (stream) {
        stream.getAudioTracks().forEach((track) => {
          track.stop();
        });
      }
    };

    // 음성파일(마이크) 업로드
    const onSubmitAudioFile = useCallback(() => {
        setRes("");
        // 실행하기가 진행되는 동안 로딩 상태
        setLoading(true);

        if (audioUrl) {
        // console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
        }
        // File 생성자를 사용해 파일로 변환
        const sound =
        new File([audioUrl], "soundBlob", { 
            lastModified: new Date().getTime(), 
            type: "audio"
        });

        // axios.post(SUBMIT_URL, sound, {
        //     headers: {
        //     "Content-Type": "multipart/formed-data"
        //     }
        // })
        // .then((res) => {
        //     setRes(res);
        //     setLoading(false);
        //     setXBtnDisabled("");
        //     if(res.data === "Too Short Sound Data") {
        //         window.alert("오디오 파일의 길이가 너무 짧습니다.")
        //     }

        // })
        // .catch((error) => {
        //     setLoading(false);
        //     setXBtnDisabled("");
        //     window.alert(`에러: ${error}`)
        // })

      // TEST
      // forData로 image 키에 묶어 전송
      const formData = new FormData();
      formData.append("image", sound);

      axios.post(TEST_URL, formData, {
        auth: {
          username: "creverse",
          password: "ai!1234pw"
        },
        headers: {
          "Content-Type": "multipart/formed-data"
        }
      })
      .then((res) => {
          setRes(res);
          setLoading(false);
          setXBtnDisabled("");
          if(res.data === "Too Short Sound Data") {
            window.alert("오디오 파일의 길이가 너무 짧습니다.")
          }

      })
      .catch((error) => {
          setLoading(false);
          setXBtnDisabled("");
          window.alert(`에러: ${error}`)
      })

    }, [audioUrl]);


    // 업로드 파일 핸들러
    const normFile = (e) => {
        if (Array.isArray(e)) {
        return e;
        }

        return e?.fileList
    };

    // 음성파일(파일) 업로드
    const onSubmitUploadAudioFile = (values) => {
        setRes("");
        if (values.dragger) {
        // 실행하기가 진행되는 동안 로딩 상태
        setLoading(true);
        setXBtnDisabled("none")
        
        // axios.post(SUBMIT_URL, values.dragger[0].originFileObj, {
        //     headers: {
        //     "Content-Type": "multipart/formed-data"
        //     }
        // })
        // .then((res) => {
        //     setRes(res);
        //     setLoading(false)
        //     setXBtnDisabled("")
        //     if(res.data === "Too Short Sound Data") {
        //         window.alert("오디오 파일의 길이가 너무 짧습니다.")
        //     }
        // })
        // .catch((error) => {
        //     setLoading(false)
        //     setXBtnDisabled("")
        //     window.alert(`에러: ${error}`)
        // })
        
        // TEST
        const formData = new FormData();
        formData.append("image", values.dragger[0].originFileObj);
        axios.post(TEST_URL, formData, {
            headers: {
            "Content-Type": "multipart/formed-data"
            }
        })
        .then((res) => {
          setRes(res);
          setLoading(false);
          setXBtnDisabled("");
          if(res.data === "Too Short Sound Data") {
              window.alert("오디오 파일의 길이가 너무 짧습니다.")
          }
        })
        .catch((error) => {
            setLoading(false);
            setXBtnDisabled("");
            window.alert(`에러: ${error}`)
        })

        } else {
        window.alert("오디오 파일의 길이가 너무 짧습니다.")
        setLoading(false);
        }
    }



    // 마이크, 업로드 버튼 핸들러
    const btnHandler = (e) => {
        const id = e.currentTarget.id;
        if (id === "micBtnOut" || id === "micBtnIn" || id === "micBtnImg") {
        // 마이크 창 > 켜짐, 업로드 창 > 꺼짐, 첫 화면 > 꺼짐
        setOpenMicWindow(true);
        setOpenFirstWindow(false);
        } else if (id === "uploadBtnOut" || id === "uploadBtnIn" || id === "uploadBtnImg") {
        // 마이크 창 > 꺼짐, 업로드 창 > 켜짐, 첫 화면 > 꺼짐
        setOpenMicWindow(false);
        setOpenFirstWindow(false);
        } else if (id === "goToFirstWindow") {
        // 마이크 창 > 꺼짐, 업로드 창 > 꺼짐, 첫 화면 > 켜짐
        setOpenMicWindow(false);
        setOpenFirstWindow(true);
        }
    }

    return (
      <>
        {!authError ? (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 900,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {
                  // 입력선택하는 첫 화면 표시
                  openFirstWindow ? (
                    <div
                      className="left"
                      style={{ width: 470, height: 450, display: "flex" }}
                    >
                      <div
                        style={{
                          width: 300,
                          height: 200,
                          borderRadius: 10,
                          backgroundColor: "white",
                          boxShadow: "0px 2px 2px rgba(0,0,0,0.20)",
                          border: "1px solid rgb(240, 240, 240)",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            fontSize: 18,
                            height: 57,
                            borderBottom: "1px solid #dedede",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span className="theme2W2ComponentTitle">
                            음성 데이터 업로드
                          </span>
                        </div>
                        <div
                          style={{
                            marginLeft: 18,
                            display: "flex",
                            alignItems: "center",
                            height: 143,
                          }}
                        >
                          <Button1
                            id={"micBtnOut"}
                            handler={(e) => btnHandler(e)}
                            icon={<AudioOutlined />}
                            name="마이크"
                          />
                          <Button1
                            id={"uploadBtnOut"}
                            style={{ marginLeft: 6 }}
                            handler={(e) => btnHandler(e)}
                            icon={<UploadOutlined />}
                            name={"파일"}
                          />
                        </div>
                        <canvas ref={canvasRef} className=""></canvas>
                      </div>
                      <div
                        className="middleLine"
                        style={{
                          width: 170,
                          height: 3,
                          backgroundColor: "rgb(189, 193, 198)",
                          marginTop: 100,
                        }}
                      ></div>
                    </div>
                  ) : // 마이크 창 열기
                  openMicWindow ? (
                    <>
                    {
                      // 녹음 버튼을 누르기 전 상태
                      onRec?
                      <div
                        className="left"
                        style={{ width: 470, height: 450, display: "flex" }}
                      >
                        <div
                          style={{
                            width: 300,
                            height: 450,
                            borderRadius: 10,
                            backgroundColor: "white",
                            boxShadow: "0px 2px 2px rgba(0,0,0,0.20)",
                            border: "1px solid rgb(240, 240, 240)",
                            // <audio></audio>의 부모 위치
                            position: "relative"
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              fontSize: 18,
                              height: 57,
                              borderBottom: "1px solid #dedede",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span className="theme2W2ComponentTitle">
                              마이크
                            </span>
                            <div
                              id="goToFirstWindow"
                              onClick={(e) => btnHandler(e)}
                              style={{
                                // display: xBtnDisabled,
                                marginLeft: 200,
                                width: 20,
                                height: 30,
                                border: "none",
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              x
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: 143,
                              flexDirection: "column",
                            }}
                          >
                            <Select
                              placeholder="마이크 전환"
                              defaultValue="default"
                              options={micList}
                              style={{
                                width: 265,
                                minWidth: 265,
                                marginTop: 18,
                              }}
                              onChange={(value) => selectHandler(value)}
                              // disabled={selectDisabled}
                            />
                            <div
                              style={{
                                width: 265,
                                marginTop: 18,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                                <Button
                                  style={{
                                    backgroundColor: "#1677ff",
                                    width: 100,
                                    height: 85,
                                  }}
                                  type="primary"
                                  // onClick={onRecAudio}
                                  onClick={onRecHandler}
                                  disabled={isButtonDisabled}
                                >
                                  녹음
                                </Button>
                              <Button
                                style={{ width: 100, height: 85 }}
                                onClick={onSubmitAudioFile}
                                loading={loading}
                                // disabled={selectDisabled}
                              >
                                실행
                              </Button>
                            </div>
                            <canvas
                              ref={canvasRef}
                              className=""
                              style={{
                                marginTop: 18,
                                width: 265,
                                height: 200,
                                border: "1px solid #dedede",
                                borderRadius: 15,
                              }}
                            ></canvas>

                          </div>
                          {audioBlobUrl && (
                              <audio controls style={{position: "absolute", left: 17, bottom: 15, width: 266}} key={audioBlobUrl}>
                                <source src={audioBlobUrl} type="audio/mpeg" />
                              </audio>
                          )}
                        </div>
                        <div
                          className="middleLine"
                          style={{
                            width: 170,
                            height: 3,
                            backgroundColor: "rgb(189, 193, 198)",
                            marginTop: 100,
                          }}
                        ></div>
                      </div>
                      // 녹음 중인 상태
                      :
                      <div
                      className="left"
                      style={{ width: 470, height: 450, display: "flex" }}
                    >
                      <div
                        style={{
                          width: 300,
                          height: 450,
                          borderRadius: 10,
                          backgroundColor: "white",
                          boxShadow: "0px 2px 2px rgba(0,0,0,0.20)",
                          border: "1px solid rgb(240, 240, 240)",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            fontSize: 18,
                            height: 57,
                            borderBottom: "1px solid #dedede",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span className="theme2W2ComponentTitle">
                            마이크
                          </span>
                          <div
                            id="goToFirstWindow"
                            onClick={(e) => btnHandler(e)}
                            style={{
                              // display: xBtnDisabled,
                              display: "none",
                              marginLeft: 200,
                              width: 20,
                              height: 30,
                              border: "none",
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            x
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: 143,
                            flexDirection: "column",
                          }}
                        >
                          <Select
                            placeholder="마이크 전환"
                            defaultValue="default"
                            options={micList}
                            style={{
                              width: 265,
                              minWidth: 265,
                              marginTop: 18,
                            }}
                            onChange={(value) => selectHandler(value)}
                            // disabled={selectDisabled}
                            disabled={true}
                          />
                          <div
                            style={{
                              width: 265,
                              marginTop: 18,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                              <Button
                              style={{
                                backgroundColor: "red",
                                width: 100,
                                height: 85,
                              }}
                              type="primary"
                              // onClick={offRecAudio}
                              onClick={onRecHandler}
                              disabled={isButtonDisabled}
                            >
                              녹음 중...
                            </Button>
                            <Button
                              style={{ width: 100, height: 85 }}
                              onClick={onSubmitAudioFile}
                              loading={loading}
                              // disabled={selectDisabled}
                              disabled={true}
                            >
                              실행
                            </Button>
                          </div>
                          <canvas
                            ref={canvasRef}
                            className=""
                            style={{
                              marginTop: 18,
                              width: 265,
                              height: 200,
                              border: "1px solid #dedede",
                              borderRadius: 15,
                            }}
                          ></canvas>
                        </div>
                      </div>
                      <div
                        className="middleLine"
                        style={{
                          width: 170,
                          height: 3,
                          backgroundColor: "rgb(189, 193, 198)",
                          marginTop: 100,
                        }}
                      ></div>
                    </div>
                    }
                    </>
                  ) : (
                    // 업로드 창 열기
                    <>
                      <div
                        className="left"
                        style={{ width: 470, height: 450, display: "flex" }}
                      >
                        <div
                          style={{
                            width: 400,
                            height: 240,
                            borderRadius: 10,
                            backgroundColor: "white",
                            boxShadow: "0px 2px 2px rgba(0,0,0,0.20)",
                            border: "1px solid rgb(240, 240, 240)",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              fontSize: 18,
                              height: 57,
                              borderBottom: "1px solid #dedede",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span className="theme2W2ComponentTitle">
                              파일(.mp3)
                            </span>
                            <div
                              id="goToFirstWindow"
                              onClick={(e) => btnHandler(e)}
                              style={{
                                display: xBtnDisabled,
                                marginLeft: 195,
                                width: 20,
                                height: 30,
                                border: "none",
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              x
                            </div>
                          </div>
                          <div
                            className="CSRUploadDragger"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              height: 143,
                            }}
                          >
                            <div
                              style={{
                                marginTop: 28,
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Form
                                onFinish={onSubmitUploadAudioFile}
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Form.Item>
                                  {/* name="dragger" 필수 값, formdata의 key */}
                                  <Form.Item
                                    name="dragger"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    style={{ width: 190 }}
                                  >
                                    <Upload.Dragger {...props}>
                                      <div className="icon">
                                        <InboxOutlined
                                          style={{
                                            fontSize: "25px",
                                            color: "#1677FF",
                                          }}
                                        />
                                      </div>
                                      <div className="text">
                                        mp3 파일을 선택하거나<br></br>여기로
                                        드래그 해주세요.
                                      </div>
                                    </Upload.Dragger>
                                  </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                  <Button
                                    style={{
                                      marginLeft: 16,
                                      width: 80,
                                      height: 103,
                                    }}
                                    htmlType="submit"
                                    loading={loading}
                                  >
                                    실행
                                  </Button>
                                </Form.Item>
                              </Form>
                            </div>
                            <canvas ref={canvasRef} className=""></canvas>
                          </div>
                        </div>
                        <div
                          className="middleLine"
                          style={{
                            width: 170,
                            height: 3,
                            backgroundColor: "rgb(189, 193, 198)",
                            marginTop: 100,
                          }}
                        ></div>
                      </div>
                    </>
                  )
                }
                <div className="right" style={{ width: 400, height: 450 }}>
                  <div
                    style={{
                      width: 400,
                      height: 450,
                      borderRadius: 10,
                      backgroundColor: "white",
                      boxShadow: "0px 2px 2px rgba(0,0,0,0.20)",
                      border: "1px solid rgb(240, 240, 240)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontSize: 18,
                        height: 57,
                        borderBottom: "1px solid #dedede",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span className="theme2W2ComponentTitle">결과화면</span>
                      <Button style={{marginLeft: 215, fontSize: 14, backgroundColor: "rgb(55, 193, 213)", color: "white"}}>업로드</Button>
                    </div>
                    <div className="CSRResult" style={{ position: "relative" }}>
                      {loading && (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              backgroundColor: "rgba(0, 0, 0, 0.02)",
                              width: "100%",
                              height: 393,
                              borderRadius: "0px 0px 10px 10px",
                            }}
                          />
                          <LoadingOutlined
                            style={{
                              position: "absolute",
                              fontSize: 24,
                              color: "rgb(150, 150, 150)",
                              left: 180,
                              top: 180,
                            }}
                          />
                        </>
                      )}
                      {res ? (
                        <TextArea
                          className="CSRResultWindow"
                          bordered={false}
                          style={{
                            marginTop: 28,
                            marginLeft: 10,
                            color: "black",
                            width: 380,
                            resize: "none",
                          }}
                          value={res.data.text}
                        />
                      ) : (
                        <TextArea
                          className="CSRResultWindow"
                          bordered={false}
                          style={{
                            marginTop: 28,
                            color: "rgb(181, 181, 181)",
                            resize: "none",
                          }}
                          value={
                            "완료하려면 녹음 또는 파일을 입력하고\n실행하기 버튼을 눌러주세요."
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ErrorPage />
        )}
      </>
    );
}

export default LcmsPractice1;