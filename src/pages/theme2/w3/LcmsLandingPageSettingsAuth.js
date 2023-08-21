// 해야할 것: 이미지 업로드 시, 응답 결과로 받은 이미지 URL을 onFinish > formData에서 변환해야함. 
import { Button, Radio, Input, Space, Upload, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { useEffect, useState } from 'react';
import ErrorPage from '../../Error/ErrorPage';
import axios from 'axios';
import GetAuthCheck from '../../auth/GetAuthCheck';
import './LcmsLandingPageSettingsAuth.css';
import F5KeyAlertModal from '../../F5KeyAlertModal';

const { TextArea } = Input;

// 테마(themeColor)
// 제목(title)
// 대상(?)
// 소개내용(?)
// 핵심 메시지(description)
// 아이콘(icon)
// 표지(?)
// 서평(?)
// 본문 확인(?)

const LcmsLandingPageSettingsAuth = () => {
  const authError = GetAuthCheck().authError;
  const iframeData = GetAuthCheck().iframeData;

  // 저장하기 버튼 클릭 시, form 제출
  const onFinish = () => {
    const data = {
      themeColor: themeColor,
      title: title,
      character: character,
      introduction: introduction,
      coverStoryEngText: coverStoryEngText,
      coverImgUrl: coverImgUrl,
      comments: comments
    };

    // 유효성 검사
    if (!data.themeColor) {
      window.alert("홈페이지 설정 > 템플릿을 선택해주세요.");
      return;
    } else if (!data.title) {
      window.alert("홈페이지 설정 > 제목을 작성해주세요.");
      return;
    } else if (!data.description) {
      window.alert("홈페이지 설정 > 핵심 메시지를 작성해주세요.");
      return;
    }

    window.alert("저장되었습니다.");

    // ★ 작업1: 설정값 서버에 전송
    // const formData = {

    // }
    //   axios.post("https://clova-practice.codingbiz.creverse.com/api/landing/person", formData, {
    //   headers: {
    //       "Content-Type": 'application/json',
    //   }
    // })
    // .then((res) => {

    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  };

  // 미리보기 클릭 시, 이동하는 URL
  // const pageURL = "http://localhost:3000/#/storybook/landing/1/1";
  const pageURL =
    "https://clova-practice.codingbiz.creverse.com/#/storybook/landing/1/1";

  // 상태값
  // 템플릿
  const [themeColor, setThemeColor] = useState("");
  const themeHandler = (e) => {
    setThemeColor(e.target.value);
  };
  // 제목
  const [title, setTitle] = useState("");
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  // 소개내용
  const [introduction, setIntroduction] = useState("");
  const introductionHandler = (e) => {
    setIntroduction(e.target.value);
  }

  // 표지
  // 표지 내용
  const [coverStoryEngText, setCoverStoryEngText] = useState("");
  const [coverImg, setCoverImg] = useState([]);
  // 표지 이미지 URL
  const [coverImgUrl, setCoverImgUrl] = useState({});
  const textAreaHandler = (e) => {
    setCoverStoryEngText(e.target.value)
  }
  const beforeUpload = (file) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isImage) {
      window.alert("이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.");
      setCoverImg(null);
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 768 || img.height !== 512) {
          window.alert(
            "이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다."
          );
          setCoverImg(null); // 썸네일에 안보여짐
          reject(file);
        } else {
          setCoverImg([file]); // 썸네일에 보여짐
          resolve(file);
          // axios 통신함
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(
              "https://clova-practice.codingbiz.creverse.com/api/file/banner/",
              formData
            )
            .then((res) => {
              console.log(res);
              setCoverImgUrl({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`,
              });
              setCoverImg([
                {
                  uid: "-1",
                  name: res.data.originalName,
                  status: "done",
                  url: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`,
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    });
  };
  // 서평 - 닉네임
  const [nickName, setNickName] = useState("");
  const nickNameHandler = (e) => {
    setNickName(e.target.value);
  };

  // 서평 - 캐릭터
  const [character, setCharacter] = useState("");
  const beforeUpload2 = (file) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isImage) {
      window.alert("이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.");
      setCoverImg(null);
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 384 || img.height !== 640) {
          window.alert(
            "이미지(너비: 384px, 높이: 640px)만 올리실 수 있습니다."
          );
          setCoverImg(null); // 썸네일에 안보여짐
          reject(file);
        } else {
          setCoverImg([file]); // 썸네일에 보여짐
          resolve(file);
          // axios 통신함
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(
              "https://clova-practice.codingbiz.creverse.com/api/file/banner/",
              formData
            )
            .then((res) => {
              console.log(res);
              setCoverImgUrl({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`,
              });
              setCoverImg([
                {
                  uid: "-1",
                  name: res.data.originalName,
                  status: "done",
                  url: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`,
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    });
  };

  // 서평 - 코멘트
  const [comments, setComments] = useState({
    "comment1": "",
    "comment2": "",
    "comment3": ""
  });
  const commentsHandler = (e) => {
    const _comments = {...comments};
    _comments[e.target.name] = e.target.value;
    setComments(
        {..._comments }
    )
  }

  // ★ 작업2: 서버에 저장된 설정값 저장
  useEffect(() => {
    // // 학습 데이터 조회 URL
    // const getURL1 = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${iframeData.clsId}/member/${iframeData.stdId}`;

    // if (iframeData.clsId && iframeData.stdId) {
    //   axios
    //     .get(getURL1)
    //     .then((res) => {
    //       const practiceUid = res.data.practiceUid;

    //       const getURL2 = `https://clova-practice.codingbiz.creverse.com/api/practice?uid=${practiceUid}`;
    //       axios
    //         .get(getURL2)
    //         .then((res) => {
    //           const data = res.data;
    //           setThemeColor(data.landingPage.themeColor);
    //           setTitle(data.landingPage.title);
    //           setDescription(data.landingPage.description);
    //           setIcon(data.landingPage.icon.path);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // ★ 처음 사용자인 경우
    //       if (error.response.status === 404) {
    //         console.log("첫 사용자 확인");
    //       }
    //     });
    // }
    // eslint-disable-next-line
  }, [iframeData]);
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
      <F5KeyAlertModal />
      {
      // authError ? (
      //   <ErrorPage />
      // ) : (
        <>
          <div
            style={{
              width: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="hompageSettings">
            <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  position: "relative",
                }}
              >
                <div style={{ marginLeft: 7, zIndex: 1 }}>
                  영어 스토리북 설정
                </div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(38, 198, 218, 0.3)",
                    width: 202,
                    height: 8,
                    top: 18,
                    zIndex: 0,
                  }}
                ></div>
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
                  템플릿<span style={{ color: "red" }}>*</span>
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
                  제목<span style={{ color: "red" }}>*</span>
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
                  marginTop: 40,
                }}
              >
                <div style={{ width: 180, fontWeight: 600 }}>
                  소개내용<span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ width: 720 }}>
                  <TextArea
                    maxLength={100}
                    rows={3}
                    style={{ resize: "none" }}
                    showCount
                    value={introduction}
                    onChange={introductionHandler}
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
                  marginTop: 60
                }}
              >
                <div style={{ width: 180, fontWeight: 600 }}>
                  표지 이미지<span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ width: 720 }}>
                  <Upload
                    beforeUpload={beforeUpload}
                    // action="/upload.do" // upload url
                    listType="picture"
                    maxCount={1}
                    fileList={coverImg}
                    previewFile={coverImgUrl}
                    showUploadList={{
                      showRemoveIcon: false
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                  <div style={{fontSize: 14, color: "rgba(0, 0, 0, 0.45)"}}>(필수) 파일형식: jpg, jpeg, png / 너비: 768px / 높이: 512px</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 80,
                  width: 900,
                  height: 40,
                  fontSize: 18,
                  display: "flex",
                  padding: 20,
                }}
              >
                <div style={{ width: 180, height: 420, fontWeight: 600 }}>
                  <span>닉네임 <span style={{ color: "red" }}>*</span></span>
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
                  marginTop: 60
                }}
              >
                <div style={{ width: 180, fontWeight: 600 }}>
                  캐릭터<span style={{ color: "red" }}>*</span>
                </div>
                <div style={{ width: 720 }}>
                  <Upload
                    beforeUpload={beforeUpload2}
                    // action="/upload.do" // upload url
                    listType="picture"
                    maxCount={1}
                    fileList={coverImg}
                    previewFile={coverImgUrl}
                    showUploadList={{
                      showRemoveIcon: false
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                  <div style={{fontSize: 14, color: "rgba(0, 0, 0, 0.45)"}}>(필수) 파일형식: jpg, jpeg, png / 너비: 384px / 높이: 640px</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 40,
                  width: 900,
                  height: 40,
                  fontSize: 18,
                  display: "flex",
                  padding: 20,
                }}
              >
                <div style={{ width: 180, fontWeight: 600 }}>
                  <span>서평 - 코멘트<div><span style={{fontSize: 12}}>(선택)</span></div></span>
                </div>
                <div style={{ width: 720 }}>
                    <div style={{display: "flex"}}>
                        <div style={{width: 58, display: "flex", alignItems: "center"}}>1</div>
                        <TextArea showCount maxLength={200} rows={3} name='comment1' style={{resize: "none"}} onChange={commentsHandler}/>
                    </div>
                    <div style={{marginTop: 40, display: "flex"}}>
                        <div style={{width: 58, display: "flex", alignItems: "center"}}>2</div>
                        <TextArea showCount maxLength={200} rows={3} name='comment2' style={{resize: "none"}} onChange={commentsHandler}/>
                    </div>
                    <div style={{marginTop: 40, display: "flex"}}>
                        <div style={{width: 58, display: "flex", alignItems: "center"}}>3</div>
                        <TextArea showCount maxLength={200} rows={3} name='comment3' style={{resize: "none"}} onChange={commentsHandler}/>
                    </div>
                </div>
              </div>
              

            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 350,
              }}
            >
              <Button type="primary" onClick={onFinish}>
                저장하기
              </Button>
              <Button
                onClick={() => {
                  // 새탭 페이지이동
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
      // )
      }
    </div>
  );
}

export default LcmsLandingPageSettingsAuth;