import { QuestionCircleOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin, Button, Input, Slider, InputNumber, Tag, Space, Image, Modal, Select, Alert } from "antd";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import ClovaStudioSlice from '../w2/ClovaStudioSlice';
import uuid from 'react-uuid';
import Guide0 from '../../assets/Guide0.png';
import Guide4 from '../../assets/Guide4.png';
import Guide5 from '../../assets/Guide5.png';
import Guide6 from '../../assets/Guide6.png';
import Guide7 from '../../assets/Guide7.png';
import Guide8 from '../../assets/Guide8.png';
import ErrorPage from '../Error/ErrorPage';
import getNewFileContent from '../files/getNewFileContent';
import GetAuthCheck from '../auth/GetAuthCheck';
import topK from '../../assets/topK.png';
import topP from '../../assets/topP.png';
import maxTokensImage from '../../assets/maxTokens.png';

const { TextArea } = Input;

const today = new Date(Date.now());

// 셀렉트 박스내 teamName 리스트
const teamNameList = Array.from({length: 20}, (_, i) => ({ value: i+2, label: `${i+1}조` }))

const LcmsPractice1Auth = () => {
  // 새로운 파일 구성 값
  const newFileContent = getNewFileContent();

  // GetAuthCheck().authError : LCMS외 URL로 직접 접속 체크
  // GetAuthCheck().iframeData.clsId : LCMS에서 받은 클래스고유번호
  // GetAuthCheck().iframeData.stdId : LCMS에서 받은 학생고유번호
  const authError = GetAuthCheck().authError;
  const iframeData = GetAuthCheck().iframeData; // 주석 지워야 함
  // ★ TEST
  // const iframeData = { stdId: 7, clsId: 1029957 }

  // 파라미터 옆 물음표 버튼 클릭했을 때, 그림 보이기, 숨기기 상태 배열 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedQuestionStateArray, setClickedQuestionStateArray] = useState([false, false, false, false, false, false, false, false, false]);
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
    if (!title) {
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

  // setOutputTokens
  axios.post(engine, data, {
  // axios.post("http://localhost:3005/questioningAnswering", data, {  
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
      console.log(error)
      // loading 상태 초기화
      setLoading(false);
  })}
  // ... 기능1_실행하기


  // ★ 기능2_파라미터
  // 클릭했을 때, classname 변경 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedStateArray, setClickedStateArray] = useState([false, false, false, false, false, false, false , false, false]); 

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

  // 추가
  const [tabPressed, setTabPressed] = useState(false);

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

  useEffect(() => {
    if (tabPressed) {
      handleInputConfirm();
      setTabPressed(false);
    }
  // eslint-disable-next-line
  }, [tabPressed])

  const onPressAfter = (e) => {
    if(e.code === "Enter") {
    e.target.selectionStart = selectionStart1 + 1;
    e.target.selectionEnd = e.target.selectionStart;
    // console.log(`${e.target.selectionStart} / ${e.target.selectionEnd}`)
  }};
  const onPressBefore = (e) => {
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectionStart1(e.target.selectionEnd);
      let slicedBeforeWords = inputValue.slice(0, e.target.selectionEnd);
      
      let slicedAfterWords = inputValue.slice(e.target.selectionEnd);
      setInputValue(slicedBeforeWords + '↵' + slicedAfterWords);
    }
  
    // 추가
    if(e.code === "Tab") {
      e.preventDefault();
      setTabPressed(!tabPressed);
    }  
  };

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
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
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
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectionStart3(e.target.selectionEnd);
      let slicedBeforeWords = inputValue3.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue3.slice(e.target.selectionEnd);
      setInputValue3(slicedBeforeWords + '↵' + slicedAfterWords);
  }};
  // ... 기능2_파라미터


  // ★ 기능3-1_저장하기
  const [teamName, setTeamName] = useState("조 이름");
  const onChangeTeamName = (e) => {
    setTeamName(e);
    dispatch(ClovaStudioSlice.actions.setFileIndex(null));
  }


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
    // 조이름을 선택해야만, 업로드 가능
    if(teamName === "조 이름") {
        window.alert("업로드하기 위해, 조 이름을 선택해주세요.")
        return
    }


    // 파일을 선택해야만, 업로드 가능
    if(fileIndex === null ) {
      // window.alert("업로드하기 위해, 파일을 선택해주세요.")
      showSelectModal();
      return
    }
    // string array 를 , 기준으로 문자열로 던짐
    const postFiles = [];
    // 유효성검사, files의 모든 값들이 비어있지 않은지 확인
    const errorLog = []

    // errorLog
    // [{title, text, start, restart, stopBefore},{},{}]
    files.forEach((file, i) => {
      let _file = {};
        // 행
        let row ={};
        for (let key in file) 
        {
          if(!(file[key])) {
            if(file[key] !== 0 && (file[key] !== true && file[key] !== false)) {
              if(key === "title") {
                // errorLog.push(`${i+1}번째 파일에 '타이틀'이 없습니다.`)
                row[key] = '타이틀';
                row["fileNum"] = i+1;
              }
              if(key === "text") {
                // errorLog.push(`${i+1}번째 파일에 '텍스트'가 없습니다.`)
                row[key] = '텍스트';
                row["fileNum"] = i+1;
              } 
              if(key === "start") {
                // errorLog.push(`${i+1}번째 파일에 '시작문자'가 없습니다.`)
                row[key] = '시작문자';
                row["fileNum"] = i+1;
              } 
              if(key === "restart") {
                // errorLog.push(`${i+1}번째 파일에 '끝문자'가 없습니다.`)
                row[key] = '끝문자';
                row["fileNum"] = i+1;
              } 
            } 
          } 
          if(key === "stopBefore" && file[key].length === 0) {
            // errorLog.push(`${i+1}번째 파일에 '정지문자'가 없습니다.`)
            row[key] = "정지문자";
            row["fileNum"] = i+1;
          }

          if(key !== "stopBefore") {
            if(key === "maxTokens") {
              _file["maxToken"] = file[key];
            } 
            else {
              if(key === "title" ) {
                _file["subject"] = file[key];
              }
              else {
                _file[key] = file[key];
              }
            }
          } 
          else {
            _file[key] =  file[key].join();
          } 
      }
      postFiles.push(_file);
      errorLog.push(row);
    })

    // 에러로그 한덩어리로 합치기
    if (!errorLog.every(log => Object.keys(log).length === 0)) {
      let res = "※아래 항목이 비어있습니다.\n"
      errorLog.forEach((log, i, ar)=>{
        for (let key in log) {
          if(key === "fileNum") {
            res = res + `\n[${log["fileNum"]}] 번째 파일\n`
          } 
        }
        for (let key in log) {
          if(log) {
            if(key === "title") {
              res = res + "  -타이틀\n"
            } else if(key === "text") {
              res = res + "  -텍스트\n"
            } else if(key === "start") {
              res = res + "  -시작문자\n"
            } else if(key === "restart") {
              res = res + "  -끝문자\n"
            } else if(key === "stopBefore") {
              res = res + "  -정지문자\n"
            }
          }
        }
      })
      window.alert(res);
      return
    }

    // 고유번호(학생, 클래스), toolNum 조회, data 갱신
    const data = {
        "memberId": iframeData?.stdId,
        "classId": iframeData?.clsId,
        "teamId": teamName,
        "practices": [...postFiles],
    }

    // ★ 첫 사용자인 경우, post | ★ 두번째 사용자인 경우, put
    if(isFirstUseClass) {
      // console.log("클래스를 신규 생성해야하는 경우, post")
      axios.post("https://clova-practice.codingbiz.creverse.com/api/team/practice", data, {    
        headers: {
        "Content-Type": 'application/json',
      }}).then((res)=>{
        window.alert("서버에 성공적으로 업로드되었습니다.")
      }).catch((error)=>{
        console.log(error)
      })
      setIsFirstUseClass(false); // post 후에는 첫 사용자가 아니게 됨
    }
    else {
      // console.log("클래스를 새로 생성할 필요없는 경우, put")
      axios.put("https://clova-practice.codingbiz.creverse.com/api/team/practice", data, {    
        headers: {
        "Content-Type": 'application/json',
      }}).then((res)=>{
        window.alert("서버에 성공적으로 업로드되었습니다.")
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  // ... 기능3-2_제출하기

  // ★ 기능4-1_클라우드 불러오기
  const [firstLoading, setFirstLoading] = useState(true);
  const [isFirstUseClass, setIsFirstUseClass] = useState(false);
  const [_id, _setId] = useState(null);
  const [isSelectTeamName, setIsSelectTeamName] = useState(false);
  // classId와 memberId로 저장한 학습데이터 없음
  // 경우 1: class 저장된 학습데이터 X / 접속한 유저의 학습데이터 X
  // 경우 2: class 저장된 학습데이터 O / 접속한 유저의 학습데이터 X
  // 경우 3: class 저장된 학습데이터 O / 접속한 유저의 학습데이터 O
  const [isFirstUseUser, setIsFirstUseUser] = useState(false);

  // teamName의 선택결과에 따라 getURL1 상태 변경
  const [getURL1, setGetURL1] = useState(null);
  useEffect(()=>{
    if(typeof teamName !== 'number') {
      return
    }

    setGetURL1(
      `https://clova-practice.codingbiz.creverse.com/api/team/practice/class/${iframeData.clsId}/team/${teamName}`
    )
    setIsSelectTeamName(true)
  }, [teamName])


  useEffect(()=>{
    if (getURL1) {
      axios
        .get(getURL1)
        .then((res) => {
          setFirstLoading(false);
          setIsFirstUseClass(false);
          const practices = {
            totalUserData: res.data.practices,
            targetUserdata: [],
          };

          // 각 practice에서 memberId와 iframeData.std가 일치하는게 하나도 없으면, setIsFirstuseUser(true)
          let currUserArr = [];
          practices.totalUserData.forEach((practice, i) => {
            if (practice.memberId === iframeData.stdId) {
              currUserArr.push(practice);
            }
          })

          if (currUserArr.length === 0) {
            setIsFirstUseUser(true);
            return
          }

          // 자신의 데이터가 한개라도 있다면,
          setIsFirstUseUser(false);          
          // classId와 memberId로 저장한 학습데이터가 있음
          practices.targetUserdata.length = 0;
          for (const [, file] of Object.entries(currUserArr)) {
            let _file = {};
            for (let key in file) {
              if (key !== "stopBefore") {
                if (key === "maxToken") {
                  _file["maxTokens"] = file[key];
                } else {
                  if (key === "subject") {
                    _file["title"] = file[key];
                  } else {
                    _file[key] = file[key];
                  }
                }
              } else {
                if (file[key].length > 0) {
                  _file[key] = file[key].split(","); // stopBefore는 데이터 읽기를 위해, 배열로 변환
                }
              }
            }
            practices.targetUserdata.push(_file);
          }

          // files의 상태가 바뀌었을 때에만 업로드
          if (JSON.stringify(files) !== JSON.stringify(practices.targetUserdata)) {
            setFiles([...practices.targetUserdata]);
          }
        })
        .catch((error) => {
          setFirstLoading(false);
          console.log(error);

          // ★ 처음 사용자인 경우
          setIsFirstUseUser(true);
          setIsFirstUseClass(true);
        });
    }
  }, [getURL1, isFirstUseUser, isFirstUseClass])


  useEffect(()=>{
    // 해당 조에 데이터가 아예 없음. 첫 생성하는 경우

  },[iframeData, teamName])
  /// ... 기능4-1_클라우드 불러오기



  // ★ 기능4-2_파일 불러오기
  // 파일의 인덱스를 저장하는 광역 state
  const dispatch = useDispatch();
  // 불러온 여러개의 파일을 저장하는 배열
  const [files, setFiles] = useState([]);

  const fileIndex = useSelector( state => {
    return state.ClovaStudioSlice.fileIndex;
  } )

  // ★ 주의: 입력 정보 갱신하는 여기에서 많이 꼬임, 조건을 많이 줘야 함.
  useEffect(() => {
    // 제거하기 버튼을 누르지 않았고, 첫 로딩이 아닐 때에만 작동
    if(!onlyActiveDelete && !firstLoading) {
      let contentText = {
        "id": _id,
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
    setOnlyActiveDelete(false);

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
  // ... 기능4-2_불러오기


  // ★ 기능 5_첫화면 셋팅 기능
  // 화면 첫 로딩 시, 현재 작성중인 파일 카드 보여주기
  // 일단 주석 처리
  useEffect(()=>{
    if (isFirstUseUser) {
      const initFile = [];
      initFile.push(newFileContent);
        // console.log("업로드버튼과 상관없이 한번만 콜되어야 함")
        setFiles(initFile)
    }
    // console.log(`아무 데이터도 없는 클래스?: ${isFirstUseClass}/ 처음 사용유저?: ${isFirstUseUser}`)
  }, [isFirstUseUser,  teamName])
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
  // const [practiceUid, setPracticeUid] = useState(null);
  useEffect(()=>{
    // 제거 시, 중복성 검사 중요
    // 제거 했을 떄, pracitce.id 가 동일하면, 제거 안됨
    if(files.length > 0) {
      axios.get(getURL1)
      .then((res)=>{
        // console.log(res.data)
        const practiceUid = res.data.practiceUid;
        const getURL = `https://clova-practice.codingbiz.creverse.com/api/team/practice?uid=${practiceUid}`;

        axios.get(getURL)
        .then((res)=>{
          // console.log(res.data)
          const data = res.data;
          if(data.practiceItem.id === _id) {
            window.alert("제거할 수 없습니다. ※ 협동 랜딩페이지에서 설정된 학습데이터입니다.")
          } else {
            const copiedFiles = [...files];
            copiedFiles.splice(fileIndex, 1);
            setFiles(copiedFiles);
          }
        })
        .catch((error)=>{
          console.log(error)
          // 랜딩페이지 설정 데이터가 없어서 발생하는 오류인걸 확인 그렇다면
          if(error.response.status === 404) {
            // console.log("학습 데이터 O, 랜딩페이지 설정 데이터 X, 제거 O");
            const copiedFiles = [...files];
            copiedFiles.splice(fileIndex, 1);
            setFiles(copiedFiles);
          }
        })
      })
      .catch((error)=>{
        console.log(error)
        if(error.response.status === 404) {
          // console.log("첫회원 | 학습 데이터 X, 랜딩페이지 설정 데이터 X, 제거 O")
          const copiedFiles = [...files];
          copiedFiles.splice(fileIndex, 1);
          setFiles(copiedFiles);
          // console.log(copiedFiles)
        }
      })
      dispatch(ClovaStudioSlice.actions.setFileIndex(null));
    }
  // eslint-disable-next-line
  }, [deleteState]);

  const [onlyActiveDelete, setOnlyActiveDelete] = useState(false);
  // 제거하기 버튼 클릭했을 때, 상태값 true
  const deleteFile = () => {
    setDeleteState(!deleteState);
    setOnlyActiveDelete(true);
  }

  // ★ 기능 10_카드 선택하기 기능
  const selectFile = (e) => {
    const index = e.target.className ? e.target.className : 0;
    const clickedCard = files[index];
    // 불러온 후, 카드를 클릭했을 때, files <- value에 데이터를 저장
    dispatch(ClovaStudioSlice.actions.setFileIndex(index));
    _setId(clickedCard.id);
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
  // eslint-disable-next-line
  const showDataModal = (e) => {
    setIsModalDataOpen(true);

    // 서버통신
    setIsModalDataOpen(false);
  };
  // ... 기능 11_화면 불러오기 로딩, 서버 저장하기 로딩


  // ★ 기능 12_fileIndex가 null인 경우, 파일 선택해달라는 경고 팝업
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const showSelectModal = (e) => {
    setIsModalSelectOpen(true);
  };
  const handleSelectCancel = () => {
    setIsModalSelectOpen(false);
  };
  // ... ★ 기능 12_fileIndex가 null인 경우, 파일 선택해달라는 경고 팝업

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
        position: "relative"
      }}
    >
      {/* LCMS 인증정보 오류 시, 돌아감 */}
      {authError ? (
        <ErrorPage />
      ) : (
        <>
          {/* ★ 왼쪽 네비게이션 영역 */}
          {
            <Modal
              open={isModalDataOpen}
              footer={null}
              title="업로드 중..."
              width={140}
              closable={false}
            >
              <Spin style={{ marginLeft: 25 }} />
            </Modal>
          }
          {
            <Modal
            open={isModalSelectOpen}
            onOk={handleSelectCancel}
            closable={false}
            okText="확인"
            cancelButtonProps={{ style: {display: "none"} }}
          >
            <p>업로드하기 위해, 파일을 선택해주세요.</p>
          </Modal>
          }
          {
            // 조이름 선택안했을 때, 조이름 하이트라이트 포커스
            !isSelectTeamName ?
              <div className='teamNameHightLightEffect' style={{ top: 0, width: 1020, height: "100%", position: "absolute",  zIndex: 2, backgroundColor: "rgba(0, 0, 0, 0.88)"}}>
                <div style={{ position: "absolute", top: 55, right: 450, color: "white" }}>↑</div>
                <div style={{ position: "absolute", top: 80, right: 450, color: "white" }}>'조 이름'을 먼저 선택해주세요.</div>
              </div>
            :
            <></>
          }
          <div
            className="navigation"
            style={{
              width: "200px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* 저장하기 클릭시, 입력되는 파일제목 */}
              <div
                style={{
                  marginBottom: 5,
                  width: "100%",
                  height: 30,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image width={60} src={logo} preview={false} />
                <Input
                  placeholder={"파일이름 입력"}
                  value={fileName}
                  style={{
                    marginLeft: 10,
                    width: 110,
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                  onChange={(e) => onChangeFileName(e)}
                />
              </div>
              <div
                style={{
                  width: 200,
                  display: "flex",
                  marginBottom: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className={clickedStateArray[0] ? "clicked" : "unclicked"}
                    style={{
                      marginTop: 15,
                      width: 150,
                      fontSize: 14,
                    }}
                  >
                    학습엔진(Engine)
                  </div>
                  <Select
                    value={engine}
                    options={[
                      {
                        value: "/testapp/v1/completions/LK-B",
                        label: "LK-B",
                      },
                      {
                        value: "/testapp/v1/completions/LK-C",
                        label: "LK-C",
                      },
                      {
                        value: "/testapp/v1/completions/LK-D2",
                        label: "LK-D2",
                      },
                      {
                        value: "/testapp/v1/completions/LE-C",
                        label: "LE-C",
                      },
                    ]}
                    style={{
                      width: 150,
                    }}
                    onChange={onChangeEngine}
                    onClick={() => {
                      setClickedStateArray([
                        true,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                      ]);
                    }}
                  />
                </div>
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[0] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[0] = !newArray[0];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[0] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide0}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide0}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left">
                  <div
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={clickedStateArray[1] ? "clicked" : "unclicked"}
                      style={{ fontSize: 14, letterSpacing: "-1px" }}
                    >
                      누적확률조절
                      <br />
                      (Top P)
                    </div>
                    <InputNumber
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={onChangeTopP}
                      value={topPValue}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
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
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[1] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[1] = !newArray[1];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[1] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={topP}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={topP}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left">
                  <div
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={clickedStateArray[2] ? "clicked" : "unclicked"}
                      style={{ fontSize: 14 }}
                    >
                      상위순위조절
                      <br />
                      (TopK)
                    </div>
                    <InputNumber
                      min={0}
                      max={128}
                      step={1}
                      onChange={onChangeTopK}
                      value={topKValue}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          false,
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
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
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[2] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[2] = !newArray[2];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[2] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={topK}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={topK}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left">
                  <div
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={clickedStateArray[3] ? "clicked" : "unclicked"}
                      style={{ fontSize: 14, letterSpacing: "-2px" }}
                    >
                      출력문장수조절
                      <br />
                      (Max tokens)
                    </div>
                    <InputNumber
                      min={0}
                      max={600}
                      step={1}
                      onChange={onChangeMaxTokens}
                      value={maxTokens}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          false,
                          false,
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
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
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[3] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[3] = !newArray[3];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[3] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={maxTokensImage}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={maxTokensImage}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left">
                  <div
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={clickedStateArray[4] ? "clicked" : "unclicked"}
                      style={{
                        fontSize: 14,
                        width: 98,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      다양성조절(Temperature)
                    </div>
                    <InputNumber
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={onChangeTemperature}
                      value={temperature}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          false,
                          false,
                          false,
                          true,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
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
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[4] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[4] = !newArray[4];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[4] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide4}
                      style={{
                        position: "absolute",
                        top: -80,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide4}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left">
                  <div
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={clickedStateArray[5] ? "clicked" : "unclicked"}
                    >
                      <div style={{ fontSize: 14, letterSpacing: "-2px" }}>
                        중복표현억제조절
                      </div>
                      <div style={{ letterSpacing: "-1.2px", fontSize: 13 }}>
                        (Repetition penalty)
                      </div>
                    </div>
                    <InputNumber
                      min={0}
                      max={10}
                      step={1}
                      onChange={onChangeRepetitionPenalty}
                      value={repetitionPenalty}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          false,
                          false,
                          false,
                          false,
                          true,
                          false,
                          false,
                          false,
                        ]);
                      }}
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
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[5] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[5] = !newArray[5];
                      setClickedQuestionStateArray(newArray);
                    }}
                  />
                  {clickedQuestionStateArray[5] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide5}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide5}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{
                  width: 200,
                  marginBottom: "10px",
                  display: "flex",
                  position: "relative",
                }}
              >
                <div className="left" style={{ width: 150 }}>
                  <div
                    className={clickedStateArray[6] ? "clicked" : "unclicked"}
                    style={{
                      marginBottom: "10px",
                      letterSpacing: "-1px",
                      width: 150,
                      fontSize: 14,
                    }}
                  >
                    정지문자(Stop sequences)
                  </div>
                  <Space size={[0, 8]} wrap>
                    <Space size={[0, 8]} wrap>
                      {/* 인풋창 */}
                    <Input
                      className="stopSequence"
                      type="text"
                      size="small"
                      placeholder="키워드 입력 후 Tab"
                      style={{ width: 150, height: 30 }}
                      value={inputValue}
                      onChange={handleInputChange}
                      // onBlur={handleInputConfirm}
                      ref={inputRef}
                      onKeyDown={onPressAfter}
                      onKeyDownCapture={onPressBefore}
                      onClick={() => {
                        setClickedStateArray([
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          true,
                          false,
                          false,
                        ]);
                      }}
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
                              userSelect: "none",
                            }}
                            onClose={() => handleClose(tag)}
                          >
                            <span>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return tagElem;
                      })}
                    </div>
                  </Space>
                </div>
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[6] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[6] = !newArray[6];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "absolute", top: 25 }}
                  />
                  {clickedQuestionStateArray[6] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide6}
                      style={{
                        position: "absolute",
                        top: -158,
                        left: 26,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide6}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 26,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "200px",
                  marginBottom: "10px",
                  display: "flex",
                }}
              >
                <div className="left" style={{ width: 150 }}>
                  <div
                    className={clickedStateArray[7] ? "clicked" : "unclicked"}
                    style={{
                      marginBottom: "10px",
                      letterSpacing: "-1px",
                      fontSize: 14,
                    }}
                  >
                    시작문자(Inject start text)
                  </div>
                  <Input
                    style={{ width: 150, height: "30px" }}
                    onChange={handleInputChange2}
                    value={inputValue2}
                    onKeyDown={onPressAfter2}
                    onKeyDownCapture={onPressBefore2}
                    onClick={() => {
                      setClickedStateArray([
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false,
                      ]);
                    }}
                  ></Input>
                </div>
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[7] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[7] = !newArray[7];
                      setClickedQuestionStateArray(newArray);
                    }}
                    tyle={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[7] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide7}
                      style={{
                        position: "absolute",
                        top: -120,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide7}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                style={{ width: 200, marginBottom: "10px", display: "flex" }}
              >
                <div className="left" style={{ width: 150 }}>
                  <div
                    className={clickedStateArray[8] ? "clicked" : "unclicked"}
                    style={{
                      marginBottom: "10px",
                      letterSpacing: "-1px",
                      fontSize: 14,
                    }}
                  >
                    끝문자(Inject restart text)
                  </div>
                  <Input
                    style={{ width: 150, height: "30px" }}
                    onChange={handleInputChange3}
                    value={inputValue3}
                    onKeyDown={onPressAfter3}
                    onKeyDownCapture={onPressBefore3}
                    onClick={() => {
                      setClickedStateArray([
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                      ]);
                    }}
                  ></Input>
                </div>
                <div
                  className="right"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <QuestionCircleOutlined
                    className={
                      clickedQuestionStateArray[8] ? "clicked" : "unclicked"
                    }
                    onClick={() => {
                      let newArray = [...clickedQuestionStateArray];
                      newArray[8] = !newArray[8];
                      setClickedQuestionStateArray(newArray);
                    }}
                    style={{ position: "relative" }}
                  />
                  {clickedQuestionStateArray[8] ? (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide8}
                      style={{
                        position: "absolute",
                        top: -120,
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={500}
                      src={Guide8}
                      style={{
                        display: "none",
                        position: "absolute",
                        left: 10,
                        borderRadius: 8,
                        border: "1px solid #d9d9d9",
                        zIndex: 1,
                      }}
                    />
                  )}
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

              borderLeft: "1px solid #e7e7e7",
            }}
          >
            {/* 툴바 메뉴 */}
            <div
              style={{
                width: "100%",
                height: 30,
                marginLeft: 10,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Button
                onClick={newFile}
                icon={<PlusOutlined />}
                style={{ width: 30, height: 30, fontSize: 12 }}
              ></Button>
              <Button
                onClick={reload}
                icon={<ReloadOutlined />}
                style={{ marginLeft: 5, fontSize: 12 }}
              ></Button>
              <>
                <Modal
                  title="초기화"
                  open={isModalReloadOpen}
                  onOk={handleReloadOk}
                  onCancel={handleReloadCancel}
                  okText="네"
                  cancelText="아니오"
                >
                  <p>현재 선택한 파일을 초기화하시겠습니까?</p>
                </Modal>
              </>
              <Button
                onClick={showModal}
                style={{ fontSize: 12, marginLeft: 10 }}
              >
                파일 열기
              </Button>
              <>
                <Modal
                  title="저장 후, 불러오기"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="네(저장 후 불러오기)"
                  cancelText="아니오"
                >
                  <p>현재 작업중인 파일이 사라집니다. </p>
                  <p>저장 후 불러올까요?</p>
                </Modal>
              </>
              {/* 숨김처리되어야 하는 input */}
              <input
                ref={inputHidden}
                type="file"
                onChange={(e) => uploadJsonFile(e)}
                style={{ display: "none" }}
                multiple
              ></input>
              <Button
                onClick={downloadJsonFile}
                style={{ fontSize: 12, marginLeft: 5 }}
              >
                파일 저장
              </Button>
              {/* 조이름 선택 셀렉트 */}
              <Select
                value={teamName}
                options={teamNameList}
                style={{
                  marginLeft: 85,
                  width: 88,
                  zIndex: 4
                }}
                onChange={onChangeTeamName}
              />
              {/* 서버 저장버튼 */}
              <Button
                onClick={submitHandler}
                style={{
                  fontSize: 12,
                  backgroundColor: "rgb(55, 193, 213)",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                업로드
              </Button>
              <Button
                type="primary"
                onClick={onSubmit}
                loading={loading}
                style={{ fontSize: 12, marginLeft: 5 }}
              >
                실행하기
              </Button>
            </div>
            {/* 입출력창 */}
            {fileIndex !== null ? (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f1f1f1",
                    // 안쪽 title, text 간격 띄우기
                    marginLeft: 10,
                    marginTop: 15,
                  }}
                >
                  <div
                    name="title"
                    style={{
                      width: "100%",
                      paddingTop: 5,
                      position: "relative",
                    }}
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

                    <TextArea
                      value={title}
                      placeholder="제목을 입력해주세요."
                      rows={1}
                      bordered={false}
                      maxLength={20}
                      onChange={(e) => onChangeTitle(e)}
                      style={{
                        height: "50px",
                        resize: "none",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    />
                  </div>
                  <div name="text" style={{ width: "100%" }}>
                    <TextArea
                      value={text}
                      placeholder="완료하려면 텍스트를 입력하고 실행하기 버튼을 눌러주세요."
                      rows={16}
                      bordered={false}
                      showCount
                      maxLength={3800}
                      onChange={(e) => onChangeText(e)}
                      style={{
                        minHeight: "400px",
                        resize: "none",
                        fontSize: "15px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="console"
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#1e232e",
                    marginLeft: 10,
                    paddingTop: "10px",
                    position: "relative",
                    marginTop: 30,
                  }}
                >
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
                  <div
                    style={{
                      fontSize: "14px",
                      color: "white",
                      marginLeft: "11px",
                    }}
                  >
                    결과 화면
                  </div>
                  <TextArea
                    bordered={false}
                    className="outputText"
                    style={{ color: "white", height: "80px", resize: "none" }}
                    value={outputTokens}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // 안쪽 title, text 간격 띄우기
                    marginLeft: 10,
                    marginTop: 15,
                    backgroundColor: "rgb(163, 163, 163)",
                  }}
                >
                  <div
                    name="title"
                    style={{
                      width: "100%",
                      paddingTop: 5,
                      position: "relative",
                    }}
                  >
                    <TextArea
                      placeholder="파일을 선택해주세요."
                      disabled
                      bordered={false}
                      style={{
                        backgroundColor: "rgb(163, 163, 163)",
                        height: 50,
                        resize: "none",
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    />
                  </div>
                  <div name="text" style={{ width: "100%" }}>
                    {/* <div style={{width: 580, height: 400}}></div> */}
                    <TextArea
                      rows={16}
                      bordered={false}
                      disabled
                      style={{
                        minHeight: "400px",
                        resize: "none",
                        fontSize: "15px",
                        backgroundColor: "rgb(163, 163, 163)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="console"
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#1e232e",
                    marginLeft: 10,
                    paddingTop: "10px",
                    position: "relative",
                    marginTop: 30,
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "white",
                      marginLeft: "11px",
                      pointerEvents: "none",
                    }}
                  >
                    결과 화면
                  </div>
                  <TextArea
                    bordered={false}
                    className="outputText"
                    disabled
                    style={{ color: "white", height: "80px", resize: "none" }}
                  />
                </div>
              </>
            )}
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
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {/* map으로 복제할 데이터 */}
              {files.map((file, index) => {
                // fille 확장자명 검사
                return (
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
                      selectFile(e);
                    }}
                  >
                    {index > 0 ? (
                      <div
                        // eslint-disable-next-line
                        id={
                          // eslint-disable-next-line
                          index == fileIndex ? "DeleteBtnActive" : "DeleteBtn"
                        }
                        className={index}
                        onClick={deleteFile}
                        style={{
                          color: "red",
                          width: 32,
                          fontSize: 12,
                          marginLeft: 100,
                        }}
                      >
                        제거
                      </div>
                    ) : (
                      <div style={{ height: 16 }}></div>
                    )}
                    <div
                      className={index}
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 10,
                      }}
                    >
                      {file.name.length > 8
                        ? file.name.slice(0, 8) + "..."
                        : file.name}
                    </div>
                    <div className={index} style={{ fontSize: 12 }}>
                      {file.title.length < 1 ? (
                        <p className={index}></p>
                      ) : (
                        <p className={index}>
                          {file.title.length > 12
                            ? file.title.slice(0, 10) + "..."
                            : file.title}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LcmsPractice1Auth;