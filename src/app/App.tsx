import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import Loading from '../features/Loading'
const Auth = lazy(() => import("../features/auth/Auth"));
const Home = lazy(() => import("../features/Home"));


const  App: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Routes>
     <Route path='/' element={ <Suspense fallback={ <Loading /> }>
       { isLoggedIn ?  <Home />: <Auth /> }
       </Suspense>
      } />
     </Routes>
  );
}

export default App;