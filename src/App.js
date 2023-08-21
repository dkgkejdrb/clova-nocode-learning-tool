import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import W1ExamplePractice1 from './pages/w1/LcmsPractice1';
import W2ExamplePractice1 from './pages/w2/ExamplePractice1';
import W2ExamplePractice2 from './pages/w2/ExamplePractice2';
import W3ExamplePractice1 from './pages/w3/ExamplePractice1';
import W2LcmsPractice1 from './pages/w2/LcmsPractice1';
import W2LcmsPractice2 from './pages/w2/LcmsPractice2';
import W3LcmsPractice1 from './pages/w3/LcmsPractice1';
import W3LcmsPractice2 from './pages/w3/LcmsPractice2';
import W3LandingPageSettings from './pages/w3/LcmsLandingPageSetting';
import W3LandingPageSettingsAuth from './pages/w3/LcmsLandingPageSettingsAuth';
import W4LcmsPractice1 from './pages/w4/LcmsPractice1Auth';
import W4LandingPageSettingsAuth from './pages/w4/LcmsLandingPageSettingsAuth';
import LandingDetail from './pages/w3/LandingDetail';
import LcmsLandingPageList from "./pages/w3/LcmsLandingPageList";
import LcmsLandingPageListAuth from './pages/w3/LcmsLandingPageListAuth';
import W3LcmsPractice2Auth from './pages/w3/LcmsPractice2Auth';
import W4LcmsLandingPageListAuth from './pages/w4/LcmsLandingPageListAuth';
import Theme1TeamLandingDetail from './pages/w4/LandingDetail';
import Theme2W2Practice1 from './pages/theme2/w2/LcmsPractice1Auth';
import Theme2W2Practice2 from './pages/theme2/w2/LcmsPractice2Auth';
import Theme2W3Practice1 from './pages/theme2/w3/LcmsPractice1Auth';
import Theme2W3Practice2 from './pages/theme2/w3/LcmsPractice2Auth';
import Theme2W3LandingPageSettingsAuth from './pages/theme2/w3/LcmsLandingPageSettingsAuth';
import Theme2W3LandingDetail from './pages/theme2/w3/LandingDetail';
import Theme2W3LandingPageListAuth from './pages/theme2/w3/LcmsLandingPageListAuth';
import Theme2W4Practice1 from './pages/theme2/w4/LcmsPractice1Auth';
import Theme2W4Practice2 from './pages/theme2/w4/LcmsPractice2Auth';
import Theme2W4Practice3 from './pages/theme2/w4/LcmsPractice3Auth';
import Theme2W4LandingPageSettingsAuth from './pages/theme2/w4/LcmsLandingPageSettingsAuth';
import Theme2W4LandingPageListAuth from './pages/theme2/w4/LcmsLandingPageListAuth';
import Theme2W4LandingDetail from './pages/theme2/w4/LandingDetail';

import Theme3W2Practice1 from './pages/theme3/w2/LcmsPractice1';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/w2/examplePractice1" element={<W2ExamplePractice1 />} />
      <Route path="/w2/examplePractice2" element={<W2ExamplePractice2 />} />
      <Route path="/w3/examplePractice1" element={<W3ExamplePractice1 />} />
      <Route path="/w2/lcmsPractice1" element={<W2LcmsPractice1 />} />
      <Route path="/w2/lcmsPractice2" element={<W2LcmsPractice2 />} />
      <Route path="/w3/lcmsPractice1" element={<W3LcmsPractice1 />} />
      <Route path="/w3/lcmsPractice2" element={<W3LcmsPractice2 />} />
      <Route path="/w3/lcmsPractice2Auth" element={<W3LcmsPractice2Auth />} />
      <Route path="/w3/lcmsLandingPageSettings" element={<W3LandingPageSettings /> } />
      <Route path="/w3/lcmsLandingPageSettingsAuth" element={<W3LandingPageSettingsAuth />}/>
      <Route path="/w4/lcmsLandingPageSettingsAuth" element={<W4LandingPageSettingsAuth />} />
      <Route path="/w4/lcmsLandingPageListAuth" element={<W4LcmsLandingPageListAuth />} />
      <Route path="/chatbot/landing/:id/:subId" element={<LandingDetail /> } />
      <Route path="/w3/lcmsLandingPageList" element={<LcmsLandingPageList /> } />
      <Route path="/w3/lcmsLandingPageListAuth" element={<LcmsLandingPageListAuth /> } />
      <Route path="/w4/lcmsPractice1" element={<W4LcmsPractice1 />}/>
      <Route path="/classchatbot/landing/:id/:subId" element={<Theme1TeamLandingDetail />} />

      <Route path="/w1/lcmsPractice1" element={<W1ExamplePractice1 /> } />

      <Route path="/theme2/w2/lcmsPractice1Auth" element={<Theme2W2Practice1 />}/>
      <Route path="/theme2/w2/lcmsPractice2Auth" element={<Theme2W2Practice2 />}/>
      <Route path="/theme2/w3/lcmsPractice1Auth" element={<Theme2W3Practice1 />}/>
      <Route path="/theme2/w3/lcmsPractice2Auth" element={<Theme2W3Practice2 />}/>
      <Route path="/theme2/w3/lcmsLandingPageSettings" element={<Theme2W3LandingPageSettingsAuth />}/>
      <Route path="/theme2/w3/lcmsLandingPageListAuth" element={<Theme2W3LandingPageListAuth />} />
      <Route path="/storybook/landing/:id/:subId" element={<Theme2W3LandingDetail />} />

      <Route path="/theme2/w4/lcmsPractice1Auth" element={<Theme2W4Practice1 />}/>
      <Route path="/theme2/w4/lcmsPractice2Auth" element={<Theme2W4Practice2 />}/>
      <Route path="/theme2/w4/lcmsPractice3Auth" element={<Theme2W4Practice3 />}/>
      <Route path="/theme2/w4/lcmsLandingPageSettings" element={<Theme2W4LandingPageSettingsAuth />} />
      <Route path="/theme2/w4/lcmsLandingPageListAuth" element={<Theme2W4LandingPageListAuth /> } />
      <Route path="/teamstorybook/landing/:id/:subId" element={<Theme2W4LandingDetail />} />

      <Route path="/theme3/w2/lcmsPractice1" element={<Theme3W2Practice1 />}/>
    </Routes>
  );
}

export default App;