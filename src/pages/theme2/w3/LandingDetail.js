import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import BlackWhite from './LandingTheme/BlackWhite';
import BlueHouse from './LandingTheme/BlueHouse';
import DeepForest from "./LandingTheme/DeepForest";
import { useDispatch } from 'react-redux';
import landingPageSettingSlice from "../../../app/landingPageSettingSlice";
import { testData } from "../testData";

const LandingDetail = () => {
  // id <- clsId, subId <- stdId 
  const clsId = useParams().id;
  const subId = useParams().subId;
  
  // 지역상태값, 테마에 맞게 렌더링하는 용도
  const [theme, setTheme] = useState(null);
  const dispatch = useDispatch();
  // dispatch(landingPageSettingSlice.actions.setLandingPageSetting(testData)) // 전역상태값
  // ★ 기능 1_학습데이터 조회
  useEffect(()=>{
    setTheme("blackWhite");
    dispatch(landingPageSettingSlice.actions.setLandingPageSetting(testData)) // 전역상태값

    

    // 랜딩페이지 첫 진입 시, uid 정보 받아오기
    // let uidURL = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${clsId}/member/${subId}`; 
    //   axios.get(uidURL)
    //   .then((res)=>{
    //     const practiceUid = res.data.practiceUid;

    //     const getURL = `https://clova-practice.codingbiz.creverse.com/api/practice?uid=${practiceUid}`; 
    //     axios.get(getURL)
    //     .then((res)=>{
    //       const data = res.data;
          
    //       setTheme(data.landingPage.themeColor)
    //       dispatch(landingPageSettingSlice.actions.setLandingPageSetting(data)) // 전역상태값
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //     })
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
    }, [])

  

  // ##############################################################################
  return (
    <>
    {
      theme ?
        theme === "blackWhite" 
        ? <BlackWhite />
        : theme === "blueHouse" ?
        <BlueHouse />
        : theme === "sand" ?
        <DeepForest />
        : <>페이지를 찾을 수 없습니다.</>
      :<></>
    }
    </>
  );
}

export default LandingDetail;