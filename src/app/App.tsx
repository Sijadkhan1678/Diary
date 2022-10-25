import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";

const Auth = lazy(() => import("../features/auth/Auth"));
const Home = lazy(() => import("../features/home/Home"));


const  App: FC = () => {
  const isLoggedIn = useSlector(state: RootState => state.auth.isAuthenticated);
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