import ErrorPage from '../../Error/ErrorPage';
import GetAuthCheck from '../../auth/GetAuthCheck';
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import { testData } from '../testData';
import F5KeyAlertModal from '../../F5KeyAlertModal';

const { TextArea } = Input;

const labelsWidth = {
    label1: 49,
    label2: 120,
    label3: 294,
    label4: 392
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
            <div style={{width: labelsWidth.label2, borderRight:"1px solid #f0f0f0", paddingLeft: 16}}>단계</div>
            <div style={{width: labelsWidth.label3, borderRight:"1px solid #f0f0f0", paddingLeft: 16}}>설명</div>
            <div style={{width: labelsWidth.label4, paddingLeft: 16}}>여러분의 스토리</div>
        </div>
    );
}

const Row = ({index, label2Text, label3Text, textAreaKorHandler, storyKorText}) => {
    return(
        <div className='theme2LcmsPractice2AuthRow' style={{display: "flex", borderBottom: "1px solid #f0f0f0", padding: "16px 16px 24px 16px"}}>
            <div style={{width: labelsWidth.label1}}>{index}</div>
            <div style={{width: labelsWidth.label2, paddingLeft: 16}}>{label2Text}</div>
            <div style={{width: labelsWidth.label3, paddingLeft: 16}}>{label3Text}</div>
            <div style={{width: labelsWidth.label4}}>
            {(() => {
            switch (index) {
              case 1:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_1}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 2:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_2}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 3:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_3}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 4:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_4}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 5:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_5}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 6:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_6}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 7:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_7}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 8:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_8}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 9:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_9}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 10:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_10}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 11:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_11}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                );
              case 12:
                return (
                  <TextArea
                    value={storyKorText.theme2LcmsPractice2Auth_12}
                    name={`theme2LcmsPractice2Auth_${index}`}
                    onChange={textAreaKorHandler}
                    style={{ ...textAreaStyle }}
                    placeholder="스토리를 이해할 수 있을 정도의 문장 기록"
                    rows={4}
                    showCount
                    maxLength={500}
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

// 셀렉트 박스내 teamName 리스트
const teamNameList = Array.from({length: 20}, (_, i) => ({ value: i+2, label: `${i+1}조` }))

const LcmsPractice1Auth = () => {
    const authError = GetAuthCheck().authError;
    const iframeData = GetAuthCheck().iframeData;

    const [storyKorText, SetStoryKorText] = useState({
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
    
    // 테스트용 초기 이펙트
    useEffect(()=>{
      // 시나리오-한국어어 로드
      SetStoryKorText({
        theme2LcmsPractice2Auth_1: testData.storyKor.step1,
        theme2LcmsPractice2Auth_2: testData.storyKor.step2,
        theme2LcmsPractice2Auth_3: testData.storyKor.step3,
        theme2LcmsPractice2Auth_4: testData.storyKor.step4,
        theme2LcmsPractice2Auth_5: testData.storyKor.step5,
        theme2LcmsPractice2Auth_6: testData.storyKor.step6,
        theme2LcmsPractice2Auth_7: testData.storyKor.step7,
        theme2LcmsPractice2Auth_8: testData.storyKor.step8,
        theme2LcmsPractice2Auth_9: testData.storyKor.step9,
        theme2LcmsPractice2Auth_10: testData.storyKor.step10,
        theme2LcmsPractice2Auth_11: testData.storyKor.step11,
        theme2LcmsPractice2Auth_12: testData.storyKor.step12,
      })
    }, [iframeData])

    const textAreaKorHandler = (e) => {
        let _storyText = {...storyKorText};
        _storyText[e.target.name] = e.target.value;
        SetStoryKorText(
            {..._storyText }
        )
    }

    const submitHandler = () => {
        // LcmsPractice2Auth의 storyText를 끌어올리고 싶음
        // axios 통신
        const data = {...storyKorText}
        console.log(data)
    }

    // 조이름 선택
    const [teamName, setTeamName] = useState("조 이름");
    const onChangeTeamName = (e) => {
      setTeamName(e);
    }
    const [isSelectTeamName, setIsSelectTeamName] = useState(false);
    useEffect(()=>{
      if(typeof teamName !== 'number') {
        return
      }
  
      // setGetURL1(
      //   `https://clova-practice.codingbiz.creverse.com/api/team/practice/class/${iframeData.clsId}/team/${teamName}`
      // )
      setIsSelectTeamName(true)
    }, [teamName])

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
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
              flexDirection: "column",
            }}
          >
            {
              // 조이름 선택안했을 때, 조이름 하이트라이트 포커스
              !isSelectTeamName ? (
                <div
                  className="teamNameHightLightEffect"
                  style={{
                    top: 0,
                    width: 980,
                    height: "100%",
                    position: "absolute",
                    zIndex: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 45,
                      right: 570,
                      color: "white",
                    }}
                  >
                    ↑
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 70,
                      right: 570,
                      color: "white",
                    }}
                  >
                    '조 이름'을 먼저 선택해주세요.
                  </div>
                </div>
              ) : (
                <></>
              )
            }
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {/* 조이름 선택 셀렉트 */}
              <Select
                value={teamName}
                options={teamNameList}
                style={{
                  marginLeft: 85,
                  width: 88,
                  zIndex: 4,
                }}
                onChange={onChangeTeamName}
              />
              {/* 스토리북 태그 */}
              <div style={{marginLeft: 30, display: "flex", alignItems: "center"}}>
                <div className='storybookTagLabel' style={{width: 160, fontWeight: "bold"}}>스토리북 태그</div>
                <Input style={{marginLeft: 5}} placeholder='예) 홍길동의 시나리오' maxLength={15} />
              </div>
              <Button
                style={{
                  marginLeft: 30,
                  width: 80,
                  backgroundColor: "rgb(55, 193, 213)",
                  fontSize: 14,
                  color: "white",
                }}
                onClick={submitHandler}
              >
                저장
              </Button>
            </div>
            <Header />
            <Row
              index={1}
              label2Text={"평범한 세상"}
              label3Text={
                "주인공의 일상 생활을 소개합니다. 주인공의 세상이 어떤지, 주인공이 무엇을 원하고, 무슨 문제를 가지고 있는지 알게 됩니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={2}
              label2Text={"모험의 부름"}
              label3Text={
                "주인공에게 새로운 도전이나 모험의 기회가 생깁니다. 이것은 주인공의 평범한 생활을 바꿀 수 있는 기회입니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={3}
              label2Text={"거절의 단계"}
              label3Text={
                "처음에는 주인공이 이 모험을 두려워하거나 거절할 수 있습니다. 이것은 주인공이 새로운 도전에 대한 두려움을 표현하는 단계입니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={4}
              label2Text={"멘토의 등장"}
              label3Text={
                "주인공이 새로운 도전을 받아들이기 위해 도움을 주는 사람이 나타납니다. 이 사람은 주인공에게 필요한 도구나 정보를 제공해줍니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={5}
              label2Text={"모험의 시작"}
              label3Text={
                "주인공이 결국 모험을 시작하고 평범한 세상을 떠나게 됩니다. 이것은 새로운 경험과 도전이 시작되는 단계입니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={6}
              label2Text={"시험과 동료들"}
              label3Text={
                "주인공은 새로운 도전과 문제를 마주하게 됩니다. 이 과정에서 주인공은 새로운 친구를 만들거나, 적을 만나게 됩니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={7}
              label2Text={"중앙의 갈등"}
              label3Text={
                "이는 이야기의 중심이 되는 큰 갈등 또는 도전을 의미합니다. 주인공은 이 도전을 극복하기 위해 모든 것을 걸어야 합니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={8}
              label2Text={"낙망"}
              label3Text={
                "주인공이 큰 실패나 손실을 겪는 순간입니다. 이는 주인공이 실패할 것 같아 보이는, 이야기의 가장 어두운 순간입니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={9}
              label2Text={"재생의 순간"}
              label3Text={
                "주인공은 다시 일어나서, 실패에서 배운 교훈을 활용하고, 다시 한번 도전을 시도합니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={10}
              label2Text={"결정적인 도전"}
              label3Text={
                "이는 주인공이 마주하는 가장 큰 도전이며, 이전의 모든 시험과 도전이 이 결정적인 순간을 위해 준비한 것입니다. 주인공은 이제까지 배운 모든 것을 활용하여 이 도전을 극복해야 합니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={11}
              label2Text={"보상"}
              label3Text={
                "결정적인 도전을 극복한 주인공은 이제 보상을 받습니다. 이것은 주인공이 처음 원했던 것을 얻는 것일 수도 있고, 아니면 그보다 더 중요한 것을 얻는 것일 수도 있습니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
            <Row
              index={12}
              label2Text={"돌아옴과 새로운 생활"}
              label3Text={
                "마지막으로, 주인공은 평범한 세상으로 돌아갑니다. 하지만 이제 주인공은 모험을 통해 배운 것을 가지고 새롭게 변화된 삶을 삽니다. 이는 주인공의 변화와 성장을 보여주는 단계입니다."
              }
              textAreaKorHandler={textAreaKorHandler}
              storyKorText={storyKorText}
            />
          </div>
        // )
        }
      </div>
    );
}

export default LcmsPractice1Auth;