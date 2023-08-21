// landingPageSettingSlice 로부터 전역 상태값 가져와야 함
import { Space, Carousel, Image, Button, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import dashed from '../../../../assets/dashed.png';
import dashed2 from '../../../../assets/dashed2.png';
import sendIconBW from '../../../../assets/sendIconBW.png';
import './BlackWhite.css'
import testBackground from '../../../../assets/testBackground.png'

// themeColor: themeColor,
// title: title,
// targetAge: targetAge,
// description: description,
// icon: icon,
// introduction: introduction,
// coverStoryEngText: coverStoryEngText,
// coverImgUrl: coverImgUrl,
// comments: comments

// 채팅창에 일자 갖고 오기
// const date = new Date();


const Page = ({pageNum, imageUrl, storyEng}) => {
  return(
    <div style={{margin: 0}}>
    <Image preview={false} style={{width: 768, height: 512}} src={imageUrl} />
    <div style={{position: "relative", width: 768, height: 450, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: 728}}>{storyEng}</div>
      <div style={{position: "absolute", top: 410}}>{`- ${pageNum} -`}</div>
    </div>
  </div>
  );
}



const BlackWhite = () => {
  // 통신 관련, 정식 서비스시 바꿔줘야 함
  // eslint-disable-next-line
  const TEST_SUBMIT_URL = "http://localhost:3005/questioningAnswering";

  const config = {
    "Content-Type": "application/json",
  };

  const landingPageSettingData = useSelector( state => {
    return state.landingPageSettingSlice.landingPageSetting;
  })

  // landingPageSettingData.cover.imageUrl.path
  // landingPageSettingData.cover.imageUrl.text
  // landingPageSettingData.cover.imageUrl.text
  // landingPageSettingData.storyEng.step1
  // landingPageSettingData.imageUrl.step1.path
  // landingPageSettingData.comments.comment1


  useEffect(()=>{
    console.log(landingPageSettingData);
  },[landingPageSettingData])

  return (
    <div
      style={{
        overflowX: "hidden",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "NanumSquareNeo",
        // backgroundColor: "#000",
        backgroundImage: `url(${testBackground})`,
        backgroundSize: "cover",
        backgroundPositionY: "70%"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: 20,
          color: "#fff",
          height: 71,
          lineHeight: "64px",
          // backgroundColor: "#000000",
          fontFamily: "NanumSquareNeo",
          fontWeight: 700,
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="BWheader" style={{width: 980}}>영어스토리북 만들기 </div>
      </div>
      <Space
        direction="vertical"
        style={{
          width: 980,
          // backgroundColor: "#000000",
        }}
      >
        <div className="storyBookBWContainer">
          <div className="BWStoryBookFrame" style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div className="BWStoryBook" style={{width: 768, backgroundColor: "white"}}>
              <Carousel arrows dots={false} prevArrow={<LeftOutlined/>} nextArrow={<RightOutlined/>}>
                <div className="cover" style={{margin: 0}}>
                  <Image preview={false} style={{width: 768, height: 512}} src={landingPageSettingData.cover.imageUrl.path} />
                  <div style={{width: 768, height: 450, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <div style={{fontSize: 50, textAlign: "center"}}>{landingPageSettingData.cover.text}</div>
                    <div style={{marginTop: 50, width: 728, textAlign: "center"}}>{landingPageSettingData.description}</div>
                  </div>
                </div>
                
                <Page pageNum={1} imageUrl={landingPageSettingData.imageUrl.step1.path} storyEng={landingPageSettingData.storyEng.step1}/>
                <Page pageNum={2} imageUrl={landingPageSettingData.imageUrl.step2.path} storyEng={landingPageSettingData.storyEng.step2}/>
                <Page pageNum={3} imageUrl={landingPageSettingData.imageUrl.step3.path} storyEng={landingPageSettingData.storyEng.step3}/>
                <Page pageNum={4} imageUrl={landingPageSettingData.imageUrl.step4.path} storyEng={landingPageSettingData.storyEng.step4}/>
                <Page pageNum={5} imageUrl={landingPageSettingData.imageUrl.step5.path} storyEng={landingPageSettingData.storyEng.step5}/>
                <Page pageNum={6} imageUrl={landingPageSettingData.imageUrl.step6.path} storyEng={landingPageSettingData.storyEng.step6}/>
                <Page pageNum={7} imageUrl={landingPageSettingData.imageUrl.step7.path} storyEng={landingPageSettingData.storyEng.step7}/>
                <Page pageNum={8} imageUrl={landingPageSettingData.imageUrl.step8.path} storyEng={landingPageSettingData.storyEng.step8}/>
                <Page pageNum={9} imageUrl={landingPageSettingData.imageUrl.step9.path} storyEng={landingPageSettingData.storyEng.step9}/>
                <Page pageNum={10} imageUrl={landingPageSettingData.imageUrl.step10.path} storyEng={landingPageSettingData.storyEng.step10}/>
                <Page pageNum={11} imageUrl={landingPageSettingData.imageUrl.step11.path} storyEng={landingPageSettingData.storyEng.step11}/>
                <Page pageNum={"fin"} imageUrl={landingPageSettingData.imageUrl.step12.path} storyEng={landingPageSettingData.storyEng.step12}/>

                <div className="comments" style={{margin: 0, backgroundColor: "white", position: "relative"}}>
                  <div className="chracterNickname" style={{ display: "flex", marginLeft: 20, marginTop: 20 }}>
                    <Image style={{width: 192, height: 320}} src={landingPageSettingData.lastPage.character.path}></Image>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                      <div style={{fontSize: 30}}>Thank you</div>
                      <div style={{fontSize: 30}}>{landingPageSettingData.lastPage.nickName} 올림.</div>
                    </div>
                  </div>
                  <div style={{width: 728, height: 612, margin: 20, display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                    <div style={{fontSize: 30, fontWeight: 600}}>서평</div>
                    <div>{landingPageSettingData.lastPage.comment1}</div>
                    <div>{landingPageSettingData.lastPage.comment2}</div>
                    <div>{landingPageSettingData.lastPage.comment3}</div>
                  </div>
                </div>
              </Carousel> 
            </div>       
          </div>
        </div>
      </Space>
      <div className="storyBookBWfooter">
        <div className="_BWfooter">
          Copyright © CREVERSE Inc. All right reserved.
        </div>
      </div>
    </div>
  );
}

export default BlackWhite;