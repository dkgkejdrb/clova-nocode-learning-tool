// 1. 물음표 달까요? => YES
// 2. 파라미터 창과 파일 불러오기 창 위치교환 => NO
// 3. 편집모듈 위치 => NO
// 4. 파라미터 색깔 표시 => YES
// 5. 학습엔진 -> LK-D2 고정
// 프론트 prototype_0.1.1
import { QuestionCircleOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin, Button, Input, Slider, InputNumber, Tag, Space, Image, Modal, Select } from "antd";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import ClovaStudioSlice from '../w2/ClovaStudioSlice';
import uuid from 'react-uuid';
import Guide0 from '../../assets/Guide0.png';
import Guide1_revised from '../../assets/Guide1_revised.png';
import Guide2_revised from '../../assets/Guide2_revised.png';
import Guide3 from '../../assets/Guide3.png';
import Guide4 from '../../assets/Guide4.png';
import Guide5 from '../../assets/Guide5.png';
import Guide6 from '../../assets/Guide6.png';
import Guide7 from '../../assets/Guide7.png';
import Guide8 from '../../assets/Guide8.png';


const { TextArea } = Input;

const today = new Date(Date.now());
// 첫 로딩시 보여지는 페이지 정보, 새로운 파일 추가시 보여지는 페이지 정보
const newFileContent = {
  "name": `챗봇 데이터_${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`,
  "engine": "/testapp/v1/completions/LK-B",
  "topP": 0.8,
  "topK": 0,
  "title": "제목 없음",
  "text": "",
  "maxTokens": 100,
  "temperature": 0.5,
  "repeatPenalty": 5,
  "start": "",
  "restart": "",
  "stopBefore": [],
  "includeTokens": true,
  "includeAiFilters": true,
  "includeProbs": false
}

// 서버로부터 넘어오는 가상 데이터
// eslint-disable-next-line
const testFromServerData = {
    "studentID": "abcd1234",
    "classID": "efgh1234",
    "toolNum": "t1w3practice1",
    "learningDatas": [
      {"name":"맞춤법교정_홍길동","engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"title":"맞춤법교정","text":"입력한 문장을 틀린 문법이 올바르게 수정된 문장으로 변환합니다.\n\n###\n문장: 너랑 걔네들은 다르잖아. 너대로 하면되\n교정: 너랑 걔네들은 다르잖아. 너대로 하면 돼\n###\n문장: 이런식으로 행동하면 어떻게?\n교정: 이런 식으로 행동하면 어떡해?\n###\n\n문장: 이제 됬어요?\n","maxTokens":150,"temperature":0.3,"repeatPenalty":5,"start":"↵교정:","restart":"↵###↵문장:","stopBefore":["###↵","문장:","교정:"],"includeTokens":true,"includeAiFilters":true,"includeProbs":false},
      {"name":"감정분석_홍길동","engine":"/testapp/v1/completions/LK-C","topP":0.8,"topK":0,"title":"감정분석기","text":"이것은 문장 감정 분석기입니다.\n\n문장: \"기분 진짜 좋다\"\n감정: 긍정\n###\n문장: \"아오 진짜 짜증나게 하네\"\n감정: 부정\n###\n문장: \"이걸로 보내드릴게요\"\n감정: 중립\n\n###\n문장: \"좀 불편하지만, 이것도 나쁘진 않아요.\"\n감정: 중립\n\n\n###\n문장:","maxTokens":30,"temperature":0.5,"repeatPenalty":5,"start":"↵감정:","restart":"↵###↵문장:","stopBefore":["###↵","감정:","문장:"],"includeTokens":true,"includeAiFilters":true,"includeProbs":false}
    ]
  }

// window.postMessage API 사용
const testParentIframeData = `{"studentID":"abcd1234","classID":"efgh5678"}`;

const LcmsPractice2 = () => {
  // 아이프레임 부모로부터 '학생고유번호', '클래스고유번호' 수신하기
  const [iframeData, setIframeData] = useState("");

  useEffect(()=> {
    // (★실제 서비스 시, 주석 해제) postMessage를 받기위한 이벤트 리스너 설정
    // window.addEventListener('message', exec, false);
    // return;
    // function exec(e) {
    //     let data = e.data;
    //     if (typeof(data) === "string") {      
    //         const result = JSON.parse(data);
    //         console.log(result)
    //     }
    // }
    const result = JSON.parse(testParentIframeData); // 얘는 나중에 제거
    setIframeData(result);
  },[])

  // (★실제 서비스 시, 코드 업데이트)
  // useEffect(()=> {
  //   // 첫 로딩 시, 서버로부터 파일 불러오기
  //   // 통신 필요, 여기에 로딩 넣어야 함
  //   // setFiles(testFromServerData)
  //   setFiles([...testFromServerData.learningDatas])
  // }, [iframeData])

  useEffect(()=> {
    // esc 키를 눌렀을 때, 모든 Question 마크 이미지 숨김
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        setClickedQuestionStateArray([false, false, false, false, false, false, false , false, false]);
      }
    }
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  // ★ 기능1_실행하기
  // 로딩 상태값 (실행하기를 누르면, true / 실행종료가 되면, false)
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    // title이 없는 경우, errorCode 1
    if (!text) {
        alert("타이틀이 없으면, 실행할 수 없습니다.")
        return;
    }
    // text가 없는 경우, errorCode 2
    if (!text) {
      alert("텍스트가 없으면, 실행할 수 없습니다.")
      return;
    }

  // 불러오기 시, ↵ 기호 모양이 포함된 화면의 값(tags, inputValue2, inputValue3)을 \n 으로 전부 변경
  let _tags = []
  tags.forEach((_tag) => {
    let __tag = _tag.replaceAll('↵', '\n');
    _tags.push(__tag);
  });
  const _inputValue2 = inputValue2.replaceAll('↵', '\n');
  const _inputValue3 = inputValue3.replaceAll('↵', '\n');

  const data = {
      "engine": engine,
      "topP": topPValue,
      "topK": topKValue,
      "text": text,
      "maxTokens": maxTokens,
      "temperature": temperature,
      "repeatPenalty": repetitionPenalty,
      "stopBefore": _tags,
      "start": _inputValue2,
      "restart": _inputValue3,
      "includeTokens": true,
      "includeAiFilters": true,
      "includeProbs": false
  };

  // 실행하기가 진행되는 동안 로딩 상태
  setLoading(true);
  console.log(data);

  // setOutputTokens
  axios.post(engine, data, {
    headers: {
        "Content-Type": 'application/json',
    }
  })
  .then((res) => {
      setText(res.data.result.text);
      setOutputTokens(res.data.result.outputText);

      // loading 상태 초기화
      setLoading(false);
      console.log(data);
      console.log(res);
  })
  .catch((error) => {
      console.log(error)
      // loading 상태 초기화
      setLoading(false);
  })}
  // ... 기능1_실행하기


  // ★ 기능2_파라미터
  // 클릭했을 때, classname 변경 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedStateArray, setClickedStateArray] = useState([false, false, false, false, false, false, false , false, false]); 
  // 파라미터 옆 물음표 버튼 클릭했을 때, 그림 보이기, 숨기기 상태 배열 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedQuestionStateArray, setClickedQuestionStateArray] = useState([false, false, false, false, false, false, false , false, false]);
  // 학습엔진 스테이트, 이벤트
  const [engine, setEngine] = useState("/testapp/v1/completions/LK-B");
  const onChangeEngine = (e) => {
    setEngine(e);
  }

  // title 스테이트, 이벤트
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  // text 스테이트, 이벤트
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  }

  // topP 스테이트, 이벤트
  const [topPValue, setTopPValue] = useState(0.8);
  const onChangeTopP = (v) => {
    typeof v === "object"
    ?
      !v 
      ? 
        setTopPValue(0)
      :
        setTopPValue(v[0])
    : setTopPValue(v)
    setClickedStateArray([false, true, false, false, false, false, false, false, false])
  }

  // topK 스테이트, 이벤트
  const [topKValue, setTopKValue] = useState(0);
  const onChangeTopK = (v) => {
    typeof v === "object" 
    ?
      !v 
      ? 
        setTopKValue(0)
      :
        setTopKValue(v[0])
    : setTopKValue(v)
    setClickedStateArray([false, false, true, false, false, false, false, false, false])
  }

  // maxTokens 스테이트, 이벤트
  const [maxTokens, setMaxTokens] = useState(100);
  const onChangeMaxTokens = (v) => {
    typeof v === "object"
    ?
      !v 
      ? 
        setMaxTokens(0)
      :
        setMaxTokens(v[0])
    : setMaxTokens(v)
    setClickedStateArray([false, false, false, true, false, false, false, false, false])
  }

  // temperature 스테이트, 이벤트
  const [temperature, setTemperature] = useState(0.5);
  const onChangeTemperature = (v) => {
    typeof v === "object"
    ?
      !v 
      ? 
        setTemperature(0)
      :
        setTemperature(v[0])
    : setTemperature(v)
    setClickedStateArray([false, false, false, false, true, false, false, false, false])
  }

  // repetitionPenalty 스테이트, 이벤트
  const [repetitionPenalty, setRepetitionPenalty] = useState(5);
  const onChangeRepetitionPenalty = (v) => {
    typeof v === "object"
    ?
      !v 
      ? 
        setRepetitionPenalty(0)
      :
        setRepetitionPenalty(v[0])
    : setRepetitionPenalty(v)
    setClickedStateArray([false, false, false, false, false, true, false, false, false])
  }

  // 화면에 보여지는 tags
  const [tags, setTags] = useState([]);
  // 서버로 전송되는 tags
  const [tagsSend, setTagsSend] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectionStart1, setSelectionStart1] = useState(0);
  // tab 키 클릭 시, 정지키워드에 포커스
  const inputRef = useRef(null);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    setTagsSend(newTags);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, true, false, false])
  };
  const handleInputConfirm = () => {
    // input 값이 있을 때에만 포커스
    if (inputValue) {
      inputRef.current.input.focus();
    }
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const inputValueSend = inputValue.replace(/↵/g, '\n');
      setTags([...tags, inputValue]);
      // 수정
      setTagsSend([...tagsSend, inputValueSend]);
    } 
    setInputValue('');
  };
  const onPressAfter = (e) => {
    if(e.code === "Enter") {
    e.target.selectionStart = selectionStart1 + 1;
    e.target.selectionEnd = e.target.selectionStart;
  }};
  const onPressBefore = (e) => {
    if(e.code === "Enter") {
      setSelectionStart1(e.target.selectionEnd);
      let slicedBeforeWords = inputValue.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue.slice(e.target.selectionEnd);
      setInputValue(slicedBeforeWords + '↵' + slicedAfterWords);
    }};

  // 결괏값앞텍스트추가(inject start text)
  const [inputValue2, setInputValue2] = useState('');
  const [selectionStart2, setSelectionStart2] = useState(0);
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, false, true, false])
  };
  const onPressAfter2 = (e) => {
    if(e.code === "Enter") {
    e.target.selectionStart = selectionStart2 + 1;
    e.target.selectionEnd = e.target.selectionStart;
  }};
  const onPressBefore2 = (e) => {
    if(e.code === "Enter") {
      setSelectionStart2(e.target.selectionEnd);
      let slicedBeforeWords = inputValue2.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue2.slice(e.target.selectionEnd);
      setInputValue2(slicedBeforeWords + '↵' + slicedAfterWords);
    }};

  // 결괏값뒤텍스트추가(inject start text)
  const [inputValue3, setInputValue3] = useState('');
  const [selectionStart3, setSelectionStart3] = useState(0);
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, false, false, true])
  };
  const onPressAfter3 = (e) => {
    if(e.code === "Enter") {
      e.target.selectionStart = selectionStart3 + 1;
      e.target.selectionEnd = e.target.selectionStart;
  }};
  const onPressBefore3 = (e) => {
    if(e.code === "Enter") {
      setSelectionStart3(e.target.selectionEnd);
      let slicedBeforeWords = inputValue3.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue3.slice(e.target.selectionEnd);
      setInputValue3(slicedBeforeWords + '↵' + slicedAfterWords);
  }};
  // ... 기능2_파라미터


  // ★ 기능3-1_저장하기
  const [fileName, setFileName] = useState(
    `챗봇 데이터_${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
  );
  const onChangeFileName = (e) => {
    setFileName(e.target.value);
  }
  const downloadJsonFile = () => {
    // 저장할 데이터
    let contentText = {
      "name": fileName,
      "engine": engine,
      "topP": topPValue,
      "topK": topKValue,
      "title": title,
      "text": text,
      "maxTokens": maxTokens,
      "temperature": temperature,
      "repeatPenalty": repetitionPenalty,
      "start": inputValue2,
      "restart": inputValue3,
      "stopBefore": tags,
      "includeTokens": true,
      "includeAiFilters": true,
      "includeProbs": false
    };
  
  // 기존 files를 깊은 복사해준다
  const copiedfiles = [...files]
  copiedfiles[fileIndex] = contentText;
  setFiles(copiedfiles);
  
  // javascript 객체를 Json으로 변환
  let contentJson = JSON.stringify(contentText);
  
  const element = document.createElement('a');
  const file = new Blob([contentJson], {
    type: "application/json"
  });
  element.href = URL.createObjectURL(file);
  
  // 파일 저장시, 파일 이름에 '.'이 포함되면, '_'로 변경하여 다운로드
  if (fileName.indexOf(".") !== -1)
  {
    const validFileName = fileName.replaceAll('.', '_')
    element.download = validFileName;
    document.body.appendChild(element);
    element.click();
  } else {
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  }};
  // ... 기능3_저장하기

  // ★ 기능3-2_제출하기
  const submitHandler = () => {
    showDataModal();
    // 고유번호(학생, 클래스), toolNum 조회, data 갱신
    const data = {
        "studentID": iframeData?.studentID,
        "classID": iframeData?.classID,
        "toolNum": "t1w3practice1",
        "learningDatas": [...files]
    }
    console.log(data);
  }

  const testData = {
    "memberId": 86,
    "classId": 48,
    "practices": [
      {
        "name": "챗봇 실습1",
        "engine": "/testapp/v1/completions/LK-B",
        "topP": 6.38,
        "topK": 61.78,
        "maxToken": 95,
        "temperature": 47.50,
        "repeatPenalty": 47,
        "stopBefore": "test_04509bbc0b7b",
        "start": "test_c23baa8249ac",
        "restart": "test_aec3cb4a63ef",
        "subject": "test_87bac6b372f1",
        "text": "챗봇 테스트 입니다. 1. 네이버에서 \"네이버 톡톡\" 검색 2. 네이버 톡톡 파트너센터 클릭 3. 회원가입 후 로그인 4. 하단의 '서비스 관리' 클릭 5. 서비스 설정 -> 챗봇 시작하기 6. 사용할 봇을 선택합니다. 7. 고객이 원하는 질문에 대한 답변을 입력하고, 미리보기를 통해 확인한 후 저장 8. 완료!",
        "includeAiFilters": true,
        "includeProbs": false,
        "includeTokens": true
      },
      {
        "name": "챗봇 실습2",
        "engine": "/testapp/v1/completions/LK-B",
        "topP": 6.38,
        "topK": 61.78,
        "maxToken": 95,
        "temperature": 47.50,
        "repeatPenalty": 47,
        "stopBefore": "test_04509bbc0b7b",
        "start": "test_c23baa8249ac",
        "restart": "test_aec3cb4a63ef",
        "subject": "test_87bac6b372f1",
        "text": "챗봇 테스트 입니다. 1. 네이버에서 \"네이버 톡톡\" 검색 2. 네이버 톡톡 파트너센터 클릭 3. 회원가입 후 로그인 4. 하단의 '서비스 관리' 클릭 5. 서비스 설정 -> 챗봇 시작하기 6. 사용할 봇을 선택합니다. 7. 고객이 원하는 질문에 대한 답변을 입력하고, 미리보기를 통해 확인한 후 저장 8. 완료!",
        "includeAiFilters": true,
        "includeProbs": false,
        "includeTokens": true
      }
    ]
  }

  axios.post("http://clova-backend.codingbiz.creverse.com/api/practice", testData, {    
    headers: {
    "Content-Type": 'application/json',
  }}).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })

  // ... 기능3-2_제출하기

  // ★ 기능4_불러오기
  // 파일의 인덱스를 저장하는 광역 state
  const dispatch = useDispatch();
  // 불러온 여러개의 파일을 저장하는 배열
  const [files, setFiles] = useState([]);
  const fileIndex = useSelector( state => {
    return state.ClovaStudioSlice.fileIndex;
  } )
  useEffect(() => {
    if(!onlyActiveDelete) {
    let contentText = {
      "name": fileName,
      "engine": engine,
      "topP": topPValue,
      "topK": topKValue,
      "title": title,
      "text": text,
      "maxTokens": maxTokens,
      "temperature": temperature,
      "repeatPenalty": repetitionPenalty,
      "start": inputValue2,
      "restart": inputValue3,
      "stopBefore": tags,
      "includeTokens": true,
      "includeAiFilters": true,
      "includeProbs": false
    };
    const copiedfiles = [...files]
    copiedfiles[fileIndex] = contentText;
    setFiles(copiedfiles);
  }
  setOnlyActiveDelete(false)
  // eslint-disable-next-line
  }, [fileIndex, fileName, engine, topPValue, topKValue, title, text, maxTokens, temperature, repetitionPenalty, inputValue2, inputValue3, tags]);

  // 불러오기 input창 숨기기
  const inputHidden = useRef(null);
  // 불러오기 전, 저장할지 안할지 선택하는 경고 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    downloadJsonFile();
    inputHidden.current?.click();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    inputHidden.current?.click();
  };
    
  // filevalues에서 확장자가 .json인 파일만 체크
  const uploadJsonFile = (e) => {
    // 루프문에 갇힌 files 값을 업데이트하는 용도
    let fileToJsonValues = files;
    // 화면에 뿌릴 불러오기 파일들
    const fileValues = Object.values(e.target.files)

    // 처음 작성했던 화면의 정보 푸시
    fileValues.forEach((file) => {
      let extention = file.name.slice(file.name.indexOf(".") + 1).toLowerCase();
      if(extention !== "json") {
        alert(`[ ${file.name} ] 은 지원하지 않는 파일형식입니다.`);
        return;
      }
      let reader = new FileReader();
      reader.onload = () => {
        let jsonStr = reader.result;
        let jsonObj = JSON.parse(jsonStr);
        setFiles([...fileToJsonValues, jsonObj]);
        fileToJsonValues.push(jsonObj);
      }
      reader.readAsText(file)
    });
  };
  // ... 기능4_불러오기


  // ★ 기능 5_첫화면 셋팅 기능
  // 화면 첫 로딩 시, 현재 작성중인 파일 카드 보여주기
  useEffect(()=>{
    const initFile = [];
    initFile.push(newFileContent);
      // console.log("업로드버튼과 상관없이 한번만 콜되어야 함")
      setFiles(initFile)
  }, [])
  // ... 기능5_첫화면 셋팅


  // ★ 기능 6_새페이지 추가하기 기능
  // 새로운 페이지 추가 기능
  const newFile = () => {
    let contentText = newFileContent;
    setFiles([...files, contentText]);
  }
  // ... 기능 6_새페이지 추가하기


  // ★ 기능 7_리로드 기능
  // 불러오기 전, 저장할지 안할지 선택하는 경고 모달창
  const [isModalReloadOpen, setIsModalReloadOpen] = useState(false);
  const showReloadModal = (e) => {
    setIsModalReloadOpen(true);
  };
  const handleReloadOk = () => {
    setFileName(`챗봇 데이터_${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`);
    setEngine("/testapp/v1/completions/LK-B");
    setTitle("");
    setText("");
    setTopPValue(0.8);
    setTopKValue(0);
    setMaxTokens(100);
    setTemperature(0.5);
    setRepetitionPenalty(5);
    setTags([]);
    setInputValue2('');
    setInputValue3('');
    setIsModalReloadOpen(false);
  };
  const handleReloadCancel = () => {
    setIsModalReloadOpen(false);
  };

  // 페이지 리로드 기능
  const reload = () => {
    // 리로드 시 경고창
    showReloadModal();
  }
  // ... 기능 7_새페이지 추가하기


  // ★ 기능 8_콘솔창 출력 메시지
  const [outputTokens, setOutputTokens] = useState(null);
  // ... 기능 8_콘솔창 출력 메시지


  // ★ 기능 9_카드의 제거하기 기능
  // 생성된 카드의 배열
  const cardRefs = useRef([]);
  const [deleteState, setDeleteState] = useState(true);
  useEffect(()=>{
    if(files.length > 0) {
      const copiedFiles = [...files];
      copiedFiles.splice(fileIndex, 1);
      setFiles(copiedFiles);
      goFirstCard();
    } 
  // eslint-disable-next-line
  }, [deleteState]);

  const [onlyActiveDelete, setOnlyActiveDelete] = useState(false);
    // 제거하기 버튼 클릭했을 때, 상태값 true
  const deleteFile = () => {
    setDeleteState(!deleteState);
    setOnlyActiveDelete(true);
  }

    // 제거하기 버튼 클릭 시, 첫번째 카드로 이동
    const goFirstCard = () => {
      console.log("첫번째로 이동")
      const index = 0;
      const clickedCard = files[index];
      if(clickedCard){
      // 불러온 후, 카드를 클릭했을 때, files <- value에 데이터를 저장
      dispatch(ClovaStudioSlice.actions.setFileIndex(index));
      setFileName(clickedCard.name);
      setEngine(clickedCard.engine);
      setTitle(clickedCard.title);
      setText(clickedCard.text);
      setTopPValue(clickedCard.topP);
      setTopKValue(clickedCard.topK);
      setMaxTokens(clickedCard.maxTokens);
      setTemperature(clickedCard.temperature);
      setRepetitionPenalty(clickedCard.repeatPenalty);
      // \n을 ↵로 변경 후, set
      const _tags = [];
      const __tags = clickedCard.stopBefore;
      __tags.forEach((tag) => {
        const _tag = tag.replaceAll('\n', '↵');
        _tags.push(_tag);
      })
      setTags(_tags);
  
      if(clickedCard.start || clickedCard.start !== "") {
        const value = clickedCard.start.replaceAll('\n', '↵');
        setInputValue2(value);
      } else {
        setInputValue2(clickedCard.start);
      }
      if(clickedCard.restart || clickedCard.restart !== "") {
        const value = clickedCard.restart.replaceAll('\n', '↵');
        setInputValue3(value);
      } else {
        setInputValue3(clickedCard.restart);
      }
    }
    }
  // ... 기능 9_카드의 제거하기 기능


  // ★ 기능 10_카드 선택하기 기능
  const selectFile = (e) => {
    const index = e.target.className ? e.target.className : 0;
    const clickedCard = files[index];
    // 불러온 후, 카드를 클릭했을 때, files <- value에 데이터를 저장
    dispatch(ClovaStudioSlice.actions.setFileIndex(index));
    setFileName(clickedCard.name);
    setEngine(clickedCard.engine);
    setTitle(clickedCard.title);
    setText(clickedCard.text);
    setTopPValue(clickedCard.topP);
    setTopKValue(clickedCard.topK);
    setMaxTokens(clickedCard.maxTokens);
    setTemperature(clickedCard.temperature);
    setRepetitionPenalty(clickedCard.repeatPenalty);
    // \n을 ↵로 변경 후, set
    const _tags = [];
    const __tags = clickedCard.stopBefore;
    __tags.forEach((tag) => {
      const _tag = tag.replaceAll('\n', '↵');
      _tags.push(_tag);
    })
    setTags(_tags);

    if(clickedCard.start || clickedCard.start !== "") {
      const value = clickedCard.start.replaceAll('\n', '↵');
      setInputValue2(value);
    } else {
      setInputValue2(clickedCard.start);
    }
    if(clickedCard.restart || clickedCard.restart !== "") {
      const value = clickedCard.restart.replaceAll('\n', '↵');
      setInputValue3(value);
    } else {
      setInputValue3(clickedCard.restart);
    }
  }
  // ... 기능 10_카드 선택하기 기능

  // ★ 기능 11_화면 불러오기 로딩, 서버 저장하기 로딩
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const showDataModal = (e) => {
    setIsModalDataOpen(true);

    // 서버통신
    setIsModalDataOpen(false);
  };
  // ... 기능 11_화면 불러오기 로딩, 서버 저장하기 로딩

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px"
      }}>
      {
        <Modal open={isModalDataOpen} footer={null} title="Loading..." width={120} closable={false} >
            <Spin style={{ marginLeft: 25 }}/>
        </Modal>
      }
      {/* ★ 왼쪽 네비게이션 영역 */}
      <div
        className='navigation'
        style={{
          width: "200px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {/* 저장하기 클릭시, 입력되는 파일제목 */}
          <div style={{ marginBottom: 5, width: "100%", height: 30, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Image width={60} src={logo} preview={false} />
            <Input placeholder={"파일이름 입력"} value={fileName} style={{ marginLeft: 10, width: 110, fontWeight: "600", fontSize: 12 }} onChange={(e) => onChangeFileName(e)} />
          </div>
          <div style={{ 
            width: 200, 
            display: "flex",
            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "space-between"
            }}>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "5px" }}>
              <div
                className={clickedStateArray[0] ? "clicked" : "unclicked"}
                style={{
                  marginTop: 15,
                  width: 150,
                  fontSize: 14
                }}
              >학습엔진(Engine)
              </div>
              <Select
              value={engine}
              options={[
                {
                  value: "/testapp/v1/completions/LK-B",
                  label: "LK-B"
                },
                {
                  value: "/testapp/v1/completions/LK-C",
                  label: "LK-C"
                },
                {
                  value: "/testapp/v1/completions/LK-D2",
                  label: "LK-D2"
                },
                {
                  value: "/testapp/v1/completions/LE-C",
                  label: "LE-C"
                },
              ]}
              style={{
                width: 150
              }}
              onChange={onChangeEngine}
              onClick={()=>{
                setClickedStateArray([true, false, false, false, false, false, false, false, false])
              }}
            />
            </div>
            <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}  >
                <QuestionCircleOutlined
                  className={clickedQuestionStateArray[0] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[0] = !newArray[0];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[0]
                  ?
                  <Image preview={false} width={500} src={Guide0} style={{ position: "absolute", top: -10, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} width={500} src={Guide0} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
          </div>
            

          <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className="left"> 
            <div style={{ width: 150, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                className={clickedStateArray[1] ? "clicked" : "unclicked"}
                style={{ fontSize: 14, letterSpacing: "-1px" }}
              >정확도조절<br />(Top P)</div>
              <InputNumber 
                min={0}
                max={1}
                step={0.1}
                onChange={onChangeTopP}
                value={topPValue}
                onClick={()=>{setClickedStateArray([false, true, false, false, false, false, false, false, false])}}                    
                style={{ width: 60 }}
                />
            </div>
            <Slider
              range
              min={0}
              max={1}
              step={0.1}
              onChange={onChangeTopP}
              value={topPValue}
               />
            </div>
            <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                <QuestionCircleOutlined                   
                  className={clickedQuestionStateArray[1] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[1] = !newArray[1];
                    setClickedQuestionStateArray(newArray);  
                  }}  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[1]
                  ?
                  <Image preview={false} width={500} src={Guide1_revised} style={{ position: "absolute", top: -10, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} width={500} src={Guide1_revised} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
            </div>
          </div>

          <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className="left">
              <div style={{
                width: 150, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between" 
                }}>
                <div
                  className={clickedStateArray[2] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14 }}
                >차순위조절<br />(TopK)</div>
                <InputNumber 
                  min={0}
                  max={128}
                  step={1}
                  onChange={onChangeTopK}
                  value={topKValue}
                  onClick={()=>{setClickedStateArray([false, false, true, false, false, false, false, false, false])}}
                  style={{ width: 60 }}
                  />
              </div>
              <Slider
                range
                min={0}
                max={128}
                step={1}
                onChange={onChangeTopK}
                value={topKValue}
              />
            </div>
            <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
              <QuestionCircleOutlined 
                className={clickedQuestionStateArray[2] ? "clicked" : "unclicked"}
                onClick={()=>{                
                  let newArray = [...clickedQuestionStateArray];
                  newArray[2] = !newArray[2];
                  setClickedQuestionStateArray(newArray);  
                }} 
                style={{position: "relative"}}/>
              {
                clickedQuestionStateArray[2]
                ?
                <Image preview={false} width={500} src={Guide2_revised} style={{ position: "absolute", top: -10, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                :
                <Image preview={false} width={500} src={Guide2_revised} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
              }
            </div>
          </div>

          <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className='left'>
              <div style={{ width: 150, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  className={clickedStateArray[3] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, letterSpacing: "-2px" }}
                >출력문장수조절<br />(Max tokens)</div>
                <InputNumber 
                  min={0}
                  max={600}
                  step={1}
                  onChange={onChangeMaxTokens}
                  value={maxTokens}
                  onClick={()=>{setClickedStateArray([false, false, false, true, false, false, false, false, false])}}
                  style={{ width: 60 }}
                  />
              </div>
              <Slider
                range
                min={0}
                max={600}
                step={10}
                onChange={onChangeMaxTokens}
                value={maxTokens}
                />
            </div>
            <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[3] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[3] = !newArray[3];
                    setClickedQuestionStateArray(newArray);  
                  }}                 
                  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[3]
                  ?
                  <Image preview={false} width={500} src={Guide3} style={{ position: "absolute", top: -10, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} width={500} src={Guide3} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
          </div>

          <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className='left'>
              <div style={{ width: 150, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  className={clickedStateArray[4] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, width: 98, letterSpacing: "-0.5px" }}
                >다양성조절(Temperature)</div>
                <InputNumber 
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={onChangeTemperature}
                  value={temperature}
                  onClick={()=>{setClickedStateArray([false, false, false, false, true, false, false, false, false])}}
                  style={{ width: 60 }}
                  />
              </div>
              <Slider
                range
                min={0}
                max={1}
                step={0.1}
                onChange={onChangeTemperature}
                value={temperature}
                />
            </div>
            <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[4] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[4] = !newArray[4];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[4]
                  ?
                  <Image preview={false} width={500} src={Guide4} style={{ position: "absolute", top: -80, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} width={500} src={Guide4} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
          </div>

          <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
            <div className='left'>
              <div style={{ width: 150, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className={clickedStateArray[5] ? "clicked" : "unclicked"}>
                  <div
                  style={{ fontSize: 14, letterSpacing: "-2px" }}
                  >중복표현억제조절</div> 
                  <div
                    style={{ letterSpacing: "-1.2px", fontSize: 13 }}
                  >(Repetition penalty)</div>
                </div>
                <InputNumber 
                  min={0}
                  max={10}
                  step={1}
                  onChange={onChangeRepetitionPenalty}
                  value={repetitionPenalty}
                  onClick={()=>{setClickedStateArray([false, false, false, false, false, true, false, false, false])}}
                  style={{ width: 50 }}
                  />
              </div>
              <Slider
                range
                min={0}
                max={10}
                step={1}
                onChange={onChangeRepetitionPenalty}
                value={repetitionPenalty}
                />
          </div>
          <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[5] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[5] = !newArray[5];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                />
                {
                  clickedQuestionStateArray[5]
                  ?
                  <Image preview={false} width={500} src={Guide5} style={{ position: "absolute", top: -10, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} width={500} src={Guide5} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
        </div>

        <div style={{ width: 200, marginBottom: "10px", display: "flex", position: "relative" }}>
          <div className='left' style={{ width: 150 }}>
          <div
            className={clickedStateArray[6] ? "clicked" : "unclicked"} 
            style={{ marginBottom: "10px", letterSpacing: "-1px", width: 150, fontSize: 14 }}>
            정지문자(Stop sequences)</div>
            <Space size={[0, 8]} wrap>
              <Space size={[0, 8]} wrap>
                {/* 인풋창 */}
                <Input
                  className='stopSequence'
                  type="text"
                  size="small"
                  placeholder="키워드 입력 후 Tab"
                  style={{ width: 150, height: 30 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  ref={inputRef}
                  onKeyDown={onPressAfter}
                  onKeyDownCapture={onPressBefore}
                  onClick={()=>{setClickedStateArray([false, false, false, false, false, false, true, false, false])}}
                />
              </Space>
              <div style={{ width: 150, minHeight: "36px" }}>
                {/* 태그창 */}
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable
                      style={{
                        userSelect: 'none',
                      }}
                      onClose={() => handleClose(tag)}>
                      <span>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag> );
                  return (tagElem);
                })}
              </div>
            </Space>
          </div>
          <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
            <QuestionCircleOutlined 
              className={clickedQuestionStateArray[6] ? "clicked" : "unclicked"}
              onClick={()=>{                
                let newArray = [...clickedQuestionStateArray];
                newArray[6] = !newArray[6];
                setClickedQuestionStateArray(newArray); 
              }} 
              style={{position: "absolute", top: 25}}/>       
              {
                clickedQuestionStateArray[6]
                ?
                <Image preview={false} width={500} src={Guide6} style={{ position: "absolute", top: -158, left: 26, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                :
                <Image preview={false} width={500} src={Guide6} style={{ display: "none", position: "absolute", left: 26, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
              }
          </div>
        </div>

        <div style={{ width: "200px", marginBottom: "10px", display: "flex" }}>
          <div className='left' style={{ width: 150 }}>
            <div 
              className={clickedStateArray[7] ? "clicked" : "unclicked"}
              style={{ marginBottom: "10px", letterSpacing: "-1px", fontSize: 14 }}>시작문자(Inject start text)</div>
              <Input 
                style={{ width: 150, height: "30px" }}
                onChange={handleInputChange2}
                value={inputValue2}
                onKeyDown={onPressAfter2}
                onKeyDownCapture={onPressBefore2}
                onClick={()=>{setClickedStateArray([false, false, false, false, false, false, false, true, false])}}
              ></Input>
          </div>
          <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
            <QuestionCircleOutlined 
              className={clickedQuestionStateArray[7] ? "clicked" : "unclicked"}
              onClick={()=>{                
                let newArray = [...clickedQuestionStateArray];
                newArray[7] = !newArray[7];
                setClickedQuestionStateArray(newArray);  
              }} 
            tyle={{position: "relative"}}/>
            {
            clickedQuestionStateArray[7]
            ?
            <Image preview={false} width={500} src={Guide7} style={{ position: "absolute", top: -120, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
            :
            <Image preview={false} width={500} src={Guide7} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
            }
          </div>
        </div>

        <div style={{ width: 200, marginBottom: "10px", display: "flex" }}>
          <div className='left' style={{ width: 150 }}>
            <div 
            className={clickedStateArray[8] ? "clicked" : "unclicked"}
            style={{ marginBottom: "10px", letterSpacing: "-1px", fontSize: 14 }}>끝문자(Inject restart text)</div>
            <Input 
              style={{ width: 150, height: "30px" }}
              onChange={handleInputChange3}
              value={inputValue3}
              onKeyDown={onPressAfter3}
              onKeyDownCapture={onPressBefore3}
              onClick={()=>{setClickedStateArray([false, false, false, false, false, false, false, false, true])}}
            ></Input>
          </div>
          <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
            <QuestionCircleOutlined 
              className={clickedQuestionStateArray[8] ? "clicked" : "unclicked"}
              onClick={()=>{                
                let newArray = [...clickedQuestionStateArray];
                newArray[8] = !newArray[8];
                setClickedQuestionStateArray(newArray);  
              }} 
            style={{position: "relative"}}/>
            {
            clickedQuestionStateArray[8]
            ?
            <Image preview={false} width={500} src={Guide8} style={{ position: "absolute", top: -120, left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
            :
            <Image preview={false} width={500} src={Guide8} style={{ display: "none", position: "absolute", left: 10, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
          }
          </div>
        </div>
      </div>
    </div>

    {/* ★ 중간 영역 */}
    <div
      style={{
        width: 580,
        height: "800px",
        display: "flex",
        flexDirection: "column",
        // 왼쪽 네비게이션 칸 띄우기
        
        borderLeft: "1px solid #e7e7e7"
      }}>
        {/* 툴바 메뉴 */}
        <div
          style={{ 
            width: "100%",
            height: 30,
            marginLeft: 10,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Button onClick={newFile} icon={<PlusOutlined />} style={{ width: 30, height: 30, fontSize: 12 }}></Button>
          <Button onClick={reload} icon={<ReloadOutlined />} style={{ marginLeft: 5, fontSize: 12 }}></Button>
          <>
            <Modal title="초기화" open={isModalReloadOpen} onOk={handleReloadOk} onCancel={handleReloadCancel} okText="네" cancelText="아니오">
              <p>현재 선택한 파일을 초기화하시겠습니까?</p>
            </Modal>
          </>
          <Button 
            onClick={showModal} style={{ fontSize: 12, marginLeft: 10 }}>파일 열기</Button>
          <>
            <Modal title="저장 후, 불러오기" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="네(저장 후 불러오기)" cancelText="아니오">
              <p>현재 작업중인 파일이 사라집니다. </p> 
              <p>저장 후 불러올까요?</p>
            </Modal>
          </>
          {/* 숨김처리되어야 하는 input */}
          <input
            ref={inputHidden}
            type='file'
            onChange={(e) => uploadJsonFile(e)}
            style={{ display: 'none' }}
            multiple
          ></input>
          <Button onClick={downloadJsonFile} style={{ fontSize: 12, marginLeft: 5 }}>파일 저장</Button>
          {/* 서버 저장버튼 */}
          <Button onClick={submitHandler} style={{ fontSize: 12, marginLeft: 168, backgroundColor: "rgb(55, 193, 213)", color: "white" }}>제출하기</Button>
          <Button
            type='primary'
            onClick={onSubmit}
            loading={loading}
            style={{ fontSize: 12, marginLeft: 5 }}
            >
            실행하기
          </Button>
        </div>
        {/* 입출력창 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f1f1f1",
            // 안쪽 title, text 간격 띄우기
            marginLeft: 10,
            marginTop: 15,
          }}>
          <div
            name="title"
            style={{ width: "100%", paddingTop: 5, position: "relative"}}
          >
              {loading ? (
                <div
                  style={{
                    width: 580,
                    height: 455,
                    position: "absolute",
                    top: 0,
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
            <TextArea value={title} placeholder='제목을 입력해주세요.' rows={1} bordered={false} maxLength={20} onChange={(e) => onChangeTitle(e)} style={{ height: "50px", resize: "none", fontSize: "20px", fontWeight: "700" }} />
          </div>
          <div
            name="text"
            style={{ width: "100%" }}>
              <TextArea 
                value={text}
                placeholder='완료하려면 텍스트를 입력하고 실행하기 버튼을 눌러주세요.' 
                rows={16} bordered={false} showCount maxLength={3800} onChange={(e) => onChangeText(e)} style={{ minHeight: "400px", resize: "none", fontSize: "15px",  }} />
          </div>
        </div>
        <div 
          className='console' 
          style={{ width: "100%", height: "120px", backgroundColor: "#1e232e", marginLeft: 10, paddingTop: "10px", position: "relative", marginTop: 30}}>
            {loading ? (
              <div
                style={{
                  width: 580,
                  height: 130,
                  top: 0,
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
          <div style={{ fontSize: "14px", color: "white", marginLeft: "11px" }}>결과 화면</div>
            <TextArea
              bordered={false}
              className='outputText' style={{ color: "white", height: "80px", resize: "none" }}
              value={outputTokens}
            />
        </div>
      </div>
      {/* ★ 오른쪽 불러오기 영역 */}
      <div
        style={{
          width: 150,
          height: 780,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // 왼쪽 네비게이션 칸 띄우기
          marginLeft: 20,
          border: "1px solid #e7e7e7",
          padding: "10px",
          overflowY: "scroll",
        }}>
        <div
          style={{ width: "100%", height: "100%" }}
          >
        {/* map으로 복제할 데이터 */}
        {            
          files.map((file, index)=>{
            // fille 확장자명 검사
            return(
              <div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                // eslint-disable-next-line
                id={index == fileIndex ? "cardActive" : "card"}
                className={index}
                key={uuid()}
                style={{
                  width: "130px",
                  height: "100px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  borderBottom: "1px solid #e7e7e7",
                //   justifyContent: "center",
                  position: "relative",
                }}
                onClick={(e) => {
                  selectFile(e)
                }}>
                {
                index >= 1 
                ?
                    <div 
                        // eslint-disable-next-line
                        id={index == fileIndex ? "DeleteBtnActive" : "DeleteBtn"}
                        className={index}
                        onClick={deleteFile}
                        style={{color: "red", width: 32, fontSize: 12, marginLeft: 100 }}
                        >                        
                        제거
                    </div>
                : 
                    <div style={{ height: 16 }}>
                        
                    </div>
                }
                <div className={index} style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
                  {
                    file.name.length > 8
                    ? file.name.slice(0, 8) + "..."
                    : file.name
                  }
                </div>
                <div className={index} style={{ fontSize: 12}}>
                  {

                    file.title.length < 1
                    ? <p className={index}>제목 없음</p>
                    : <p className={index}>
                      {
                        file.title.length > 12 
                        ? file.title.slice(0, 10) + "..."
                        : file.title
                      }</p>
                  }
                </div>

                </div>
                );
              })
            }
            </div>
        </div>
      </div>
    );
}

export default LcmsPractice2;