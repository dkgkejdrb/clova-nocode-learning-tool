import ErrorPage from '../../Error/ErrorPage';
import GetAuthCheck from '../../auth/GetAuthCheck';
import { Input, Button, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { testData } from '../testData.js'
import axios from 'axios';
import F5KeyAlertModal from '../../F5KeyAlertModal';

const { TextArea } = Input;

const labelsWidth = {
    label1: 49,
    label3: 192,
    label4: 645
}

const textAreaStyle = {
  width: labelsWidth.label4 + 50,
  marginLeft: 8,
  border: "none",
  resize: "none",
  boxShadow: "none",
  padding: 0,
}

const Header = () => {
    return(
        <div className='theme2LcmsPractice2AuthHeader' style={{display: "flex", borderBottom: "1px solid #f0f0f0", padding: 16, background: "#fafafa", fontWeight: "bold"}}>
            <div style={{width: labelsWidth.label1, borderRight:"1px solid #f0f0f0" }}>순서</div>
            <div style={{width: labelsWidth.label3, borderRight:"1px solid #f0f0f0", paddingLeft: 16, display: "flex", flexDirection: "column"}}>
              <span>이미지</span>
              <span style={{fontSize: 10, color: "red"}}>(필수) 파일형식: jpg, jpeg, png</span>
              <span style={{fontSize: 10, color: "red"}}>너비: 768px / 높이: 512px</span>
              </div>
            <div style={{width: labelsWidth.label4, paddingLeft: 16}}>
              <div>영어 스토리</div>
              <span style={{fontSize: 10, color: "red"}}>수정할 수 없음</span>
            </div>
        </div>
    );
}

const Row = ({index, 
  beforeUpload_1, storyImg_1, storyImgUrl_1, 
  beforeUpload_2, storyImg_2, storyImgUrl_2,
  beforeUpload_3, storyImg_3, storyImgUrl_3,
  beforeUpload_4, storyImg_4, storyImgUrl_4,
  beforeUpload_5, storyImg_5, storyImgUrl_5,
  beforeUpload_6, storyImg_6, storyImgUrl_6,
  beforeUpload_7, storyImg_7, storyImgUrl_7,
  beforeUpload_8, storyImg_8, storyImgUrl_8,
  beforeUpload_9, storyImg_9, storyImgUrl_9,
  beforeUpload_10, storyImg_10, storyImgUrl_10,
  beforeUpload_11, storyImg_11, storyImgUrl_11,
  beforeUpload_12, storyImg_12, storyImgUrl_12,
  storyEngText,
  textAreaEngHandler
}) => {
    return (
      <div
        className="theme2LcmsPractice2AuthRow"
        style={{
          display: "flex",
          borderBottom: "1px solid #f0f0f0",
          padding:  "16px 16px 24px 16px",
        }}
      >
        <div style={{ width: labelsWidth.label1 }}>{index}</div>
        <div style={{ width: labelsWidth.label3 - 16, paddingLeft: 16 }}>
          {(() => {
            switch (index) {
              case 1:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_1}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_1}
                    previewFile={storyImgUrl_1}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 2:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_2}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_2}
                    previewFile={storyImgUrl_2}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 3:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_3}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_3}
                    previewFile={storyImgUrl_3}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 4:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_4}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_4}
                    previewFile={storyImgUrl_4}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 5:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_5}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_5}
                    previewFile={storyImgUrl_5}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 6:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_6}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_6}
                    previewFile={storyImgUrl_6}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 7:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_7}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_7}
                    previewFile={storyImgUrl_7}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 8:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_8}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_8}
                    previewFile={storyImgUrl_8}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 9:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_9}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_9}
                    previewFile={storyImgUrl_9}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 10:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_10}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_10}
                    previewFile={storyImgUrl_10}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 11:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_11}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_11}
                    previewFile={storyImgUrl_11}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              case 12:
                return (
                  <Upload
                    className={`Upload_${index}`}
                    beforeUpload={beforeUpload_12}
                    listType="picture"
                    maxCount={1}
                    fileList={storyImg_12}
                    previewFile={storyImgUrl_12}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                );
              default:
                return;
            }
          })()}
        </div>
        <div style={{ width: labelsWidth.label4, paddingLeft: 16 }}>
          {(() => {
            switch (index) {
              case 1:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_1}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 2:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_2}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 3:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_3}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 4:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_4}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 5:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_5}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 6:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_6}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 7:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_7}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 8:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_8}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 9:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_9}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 10:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_10}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 11:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_11}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );
              case 12:
                return (
                  <TextArea
                    value={storyEngText.theme2LcmsPractice2Auth_12}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    // onChange={textAreaEngHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="영어로 번역된 문장 기록"
                    rows={4}
                    showCount
                    maxLength={1500}
                  />
                );

              default:
                return;
            }
          })()}
        </div>
      </div>
    );
}

const LcmsPractice2Auth = () => {
    const authError = GetAuthCheck().authError;
    const iframeData = GetAuthCheck().iframeData;

    const [storyEngText, SetStoryEngText] = useState({
        theme2LcmsPractice2Auth_1: "",
        theme2LcmsPractice2Auth_2: "",
        theme2LcmsPractice2Auth_3: "",
        theme2LcmsPractice2Auth_4: "",
        theme2LcmsPractice2Auth_5: "",
        theme2LcmsPractice2Auth_6: "",
        theme2LcmsPractice2Auth_7: "",
        theme2LcmsPractice2Auth_8: "",
        theme2LcmsPractice2Auth_9: "",
        theme2LcmsPractice2Auth_10: "",
        theme2LcmsPractice2Auth_11: "",
        theme2LcmsPractice2Auth_12: "",
    });

    const textAreaEngHandler = (e) => {
      let _storyText = {...storyEngText};
      _storyText[e.target.name] = e.target.value;
      SetStoryEngText(
          {..._storyText }
      )
    }

    const submitHandler = () => {
        // LcmsPractice2Auth의 storyText를 끌어올리고 싶음
        // axios 통신
        console.log(storyEngText)
    }

    // ★ 이미지1 상태값,  업로드 전 체크
    const [storyImg_1, setStoryImg_1] = useState([]);
    const [storyImgUrl_1, setStoryImgUrl_1] = useState({});
    const beforeUpload_1 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_1(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_1(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_1([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_1({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_1([{
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

    // ★ 이미지2 상태값,  업로드 전 체크
    const [storyImg_2, setStoryImg_2] = useState([]);    
    const [storyImgUrl_2, setStoryImgUrl_2] = useState({});
    const beforeUpload_2 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_2(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_2(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_2([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_2({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_2([{
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

    // ★ 이미지3 상태값,  업로드 전 체크
    const [storyImg_3, setStoryImg_3] = useState([]);    
    const [storyImgUrl_3, setStoryImgUrl_3] = useState({});
    const beforeUpload_3 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_3(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_3(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_3([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_3({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_3([{
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

    // ★ 이미지4 상태값,  업로드 전 체크
    const [storyImg_4, setStoryImg_4] = useState([]);    
    const [storyImgUrl_4, setStoryImgUrl_4] = useState({});
    const beforeUpload_4 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_4(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_4(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_4([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_4({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_4([{
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

    // ★ 이미지5 상태값,  업로드 전 체크
    const [storyImg_5, setStoryImg_5] = useState([]);    
    const [storyImgUrl_5, setStoryImgUrl_5] = useState({});
    const beforeUpload_5 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_5(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_5(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_5([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_5({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_5([{
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

    // ★ 이미지6 상태값,  업로드 전 체크
    const [storyImg_6, setStoryImg_6] = useState([]);    
    const [storyImgUrl_6, setStoryImgUrl_6] = useState({});
    const beforeUpload_6 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_6(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_6(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_6([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_6({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_6([{
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
    
    // ★ 이미지7 상태값,  업로드 전 체크
    const [storyImg_7, setStoryImg_7] = useState([]);    
    const [storyImgUrl_7, setStoryImgUrl_7] = useState({});
    const beforeUpload_7 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_7(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_7(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_7([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_7({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_7([{
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

    // ★ 이미지8 상태값,  업로드 전 체크
    const [storyImg_8, setStoryImg_8] = useState([]);    
    const [storyImgUrl_8, setStoryImgUrl_8] = useState({});
    const beforeUpload_8 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_8(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_8(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_8([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_8({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_8([{
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
    
    // ★ 이미지9 상태값,  업로드 전 체크
    const [storyImg_9, setStoryImg_9] = useState([]);    
    const [storyImgUrl_9, setStoryImgUrl_9] = useState({});
    const beforeUpload_9 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_9(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_9(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_9([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_9({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_9([{
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
    
    // ★ 이미지10 상태값,  업로드 전 체크
    const [storyImg_10, setStoryImg_10] = useState([]);    
    const [storyImgUrl_10, setStoryImgUrl_10] = useState({});
    const beforeUpload_10 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_10(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_10(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_10([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_10({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_10([{
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
    
    // ★ 이미지11 상태값,  업로드 전 체크
    const [storyImg_11, setStoryImg_11] = useState([]);    
    const [storyImgUrl_11, setStoryImgUrl_11] = useState({});
    const beforeUpload_11 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_11(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_11(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_11([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_11({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_11([{
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

    // ★ 이미지12 상태값,  업로드 전 체크
    const [storyImg_12, setStoryImg_12] = useState([]);    
    const [storyImgUrl_12, setStoryImgUrl_12] = useState({});
    const beforeUpload_12 = (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        window.alert('이미지 파일(jpeg, jpg, png)만 올리실 수 있습니다.');
        setStoryImg_12(null);
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== 768 || img.height !== 512) {
            window.alert('이미지(너비: 768px, 높이: 512px)만 올리실 수 있습니다.');
            setStoryImg_12(null); // 썸네일에 안보여짐
            reject(file);
          } else {
            setStoryImg_12([file]); // 썸네일에 보여짐
            resolve(file);
            // axios 통신함
            const formData = new FormData();
            formData.append('file', file);
            axios.post('https://clova-practice.codingbiz.creverse.com/api/file/banner/', formData)
            .then((res) => {
              console.log(res);
              setStoryImgUrl_12({
                name: res.data.originalName,
                path: `https://clova-practice.codingbiz.creverse.com/api/file/${res.data.fileUrl}`
              })
              setStoryImg_12([{
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

    // useEffect(()=>{
    //   console.log("------------------------")
    //   console.log(storyImg_1); console.log(storyImg_2); console.log(storyImg_3);
    //   console.log(storyImg_4); console.log(storyImg_5); console.log(storyImg_6);
    //   console.log(storyImg_7); console.log(storyImg_8); console.log(storyImg_9);
    //   console.log(storyImg_10); console.log(storyImg_11); console.log(storyImg_12);
    //   console.log("------------------------")
    // },[storyImg_1, storyImg_2, storyImg_3, storyImg_4, storyImg_5, storyImg_6, storyImg_7, storyImg_8, storyImg_9, storyImg_10, storyImg_11, storyImg_12])

    // 테스트용 초기 이펙트
    useEffect(()=>{
      console.log(testData);
      // 이미지 로드
      setStoryImgUrl_1({name: testData.imageUrl.step1.name, path: testData.imageUrl.step1.path}); setStoryImg_1([{uid: '-1', name: testData.imageUrl.step1.name, status: 'done', url: testData.imageUrl.step1.path}]); 
      setStoryImgUrl_2({name: testData.imageUrl.step2.name, path: testData.imageUrl.step2.path}); setStoryImg_2([{uid: '-1', name: testData.imageUrl.step2.name, status: 'done', url: testData.imageUrl.step2.path}]); 
      setStoryImgUrl_3({name: testData.imageUrl.step3.name, path: testData.imageUrl.step3.path}); setStoryImg_3([{uid: '-1', name: testData.imageUrl.step3.name, status: 'done', url: testData.imageUrl.step3.path}]); 
      setStoryImgUrl_4({name: testData.imageUrl.step4.name, path: testData.imageUrl.step4.path}); setStoryImg_4([{uid: '-1', name: testData.imageUrl.step4.name, status: 'done', url: testData.imageUrl.step4.path}]); 
      setStoryImgUrl_5({name: testData.imageUrl.step5.name, path: testData.imageUrl.step5.path}); setStoryImg_5([{uid: '-1', name: testData.imageUrl.step5.name, status: 'done', url: testData.imageUrl.step5.path}]); 
      setStoryImgUrl_6({name: testData.imageUrl.step6.name, path: testData.imageUrl.step6.path}); setStoryImg_6([{uid: '-1', name: testData.imageUrl.step6.name, status: 'done', url: testData.imageUrl.step6.path}]); 
      setStoryImgUrl_7({name: testData.imageUrl.step7.name, path: testData.imageUrl.step7.path}); setStoryImg_7([{uid: '-1', name: testData.imageUrl.step7.name, status: 'done', url: testData.imageUrl.step7.path}]); 
      setStoryImgUrl_8({name: testData.imageUrl.step8.name, path: testData.imageUrl.step8.path}); setStoryImg_8([{uid: '-1', name: testData.imageUrl.step8.name, status: 'done', url: testData.imageUrl.step8.path}]); 
      setStoryImgUrl_9({name: testData.imageUrl.step9.name, path: testData.imageUrl.step9.path}); setStoryImg_9([{uid: '-1', name: testData.imageUrl.step9.name, status: 'done', url: testData.imageUrl.step9.path}]); 
      setStoryImgUrl_10({name: testData.imageUrl.step10.name, path: testData.imageUrl.step10.path}); setStoryImg_10([{uid: '-1', name: testData.imageUrl.step10.name, status: 'done', url: testData.imageUrl.step10.path}]); 
      setStoryImgUrl_11({name: testData.imageUrl.step11.name, path: testData.imageUrl.step11.path}); setStoryImg_11([{uid: '-1', name: testData.imageUrl.step11.name, status: 'done', url: testData.imageUrl.step11.path}]); 
      setStoryImgUrl_12({name: testData.imageUrl.step12.name, path: testData.imageUrl.step12.path}); setStoryImg_12([{uid: '-1', name: testData.imageUrl.step12.name, status: 'done', url: testData.imageUrl.step12.path}]); 

      // 시나리오-영어 로드
      SetStoryEngText({
        theme2LcmsPractice2Auth_1: testData.storyEng.step1,
        theme2LcmsPractice2Auth_2: testData.storyEng.step2,
        theme2LcmsPractice2Auth_3: testData.storyEng.step3,
        theme2LcmsPractice2Auth_4: testData.storyEng.step4,
        theme2LcmsPractice2Auth_5: testData.storyEng.step5,
        theme2LcmsPractice2Auth_6: testData.storyEng.step6,
        theme2LcmsPractice2Auth_7: testData.storyEng.step7,
        theme2LcmsPractice2Auth_8: testData.storyEng.step8,
        theme2LcmsPractice2Auth_9: testData.storyEng.step9,
        theme2LcmsPractice2Auth_10: testData.storyEng.step10,
        theme2LcmsPractice2Auth_11: testData.storyEng.step11,
        theme2LcmsPractice2Auth_12: testData.storyEng.step12,
      })
    }, [iframeData])

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <F5KeyAlertModal />
        {
        // authError ? (
        //   <ErrorPage />
        // ) : (
          <div
            style={{
              width: 980,
              height: 1600,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button style={{ width: 80, backgroundColor: "rgb(55, 193, 213)", fontSize: 14, color: "white" }} onClick={submitHandler}>저장</Button>
            </div>
            <Header />
            <Row index={1} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_1={beforeUpload_1} storyImg_1={storyImg_1} storyImgUrl_1={storyImgUrl_1}/>
            <Row index={2} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_2={beforeUpload_2} storyImg_2={storyImg_2} storyImgUrl_2={storyImgUrl_2}/>
            <Row index={3} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_3={beforeUpload_3} storyImg_3={storyImg_3} storyImgUrl_3={storyImgUrl_3}/>

            <Row index={4} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_4={beforeUpload_4} storyImg_4={storyImg_4} storyImgUrl_4={storyImgUrl_4}/>
            <Row index={5} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_5={beforeUpload_5} storyImg_5={storyImg_5} storyImgUrl_5={storyImgUrl_5}/>
            <Row index={6} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_6={beforeUpload_6} storyImg_6={storyImg_6} storyImgUrl_6={storyImgUrl_6}/>
            <Row index={7} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_7={beforeUpload_7} storyImg_7={storyImg_7} storyImgUrl_7={storyImgUrl_7}/>
            <Row index={8} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_8={beforeUpload_8} storyImg_8={storyImg_8} storyImgUrl_8={storyImgUrl_8}/>
            <Row index={9} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_9={beforeUpload_9} storyImg_9={storyImg_9} storyImgUrl_9={storyImgUrl_9}/>
            <Row index={10} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_10={beforeUpload_10} storyImg_10={storyImg_10} storyImgUrl_10={storyImgUrl_10}/>
            <Row index={11} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_11={beforeUpload_11} storyImg_11={storyImg_11} storyImgUrl_11={storyImgUrl_11}/>
            <Row index={12} textAreaEngHandler={textAreaEngHandler} storyEngText={storyEngText} beforeUpload_12={beforeUpload_12} storyImg_12={storyImg_12} storyImgUrl_12={storyImgUrl_12}/>
          </div>
        // )
        }
      </div>
    );
}

export default LcmsPractice2Auth;