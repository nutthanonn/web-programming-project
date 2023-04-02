import React, { useEffect } from 'react';
import Home from '@pages/Home';
import Layout from '@shared/Layout';
import { Routes, Route } from 'react-router-dom';
import AppProvider from '@provider/AppProvider';
import light from '@styles/theme/light';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import SuccessRegister from '@pages/SuccessRegister';
import Collection from '@pages/Collection';
import Ranking from '@pages/Ranking';
import UserProfile from '@pages/UserProfile';
import IndividualCollection from '@pages/IndividualCollection';
import NotFound from '@pages/NotFound';
import { MyProfileImpl } from '@store/MyProfileStore';
import useVerifyToken from '@hooks/useVerifyToken';

interface AppProps {
  MyProfileStore: MyProfileImpl;
}

const App: React.FC<AppProps> = (props) => {
  const { claims } = useVerifyToken();

  useEffect(() => {
    props.MyProfileStore.getMyProfile(claims ?? null);
  }, [claims]);

  return (
    <AppProvider theme={light}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/:username' element={<UserProfile />} />
          <Route path='/model/:brand' element={<IndividualCollection />} />
          <Route path='/register/complete' element={<SuccessRegister />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
