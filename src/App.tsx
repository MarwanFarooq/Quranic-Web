import "./App.css";
import NavBar from "./Component/NavBar";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./LoginComponentsPages/Loginpage";
import SignUpPage from "./LoginComponentsPages/SignUpPage";
import Home from "./Home/Home";
import ErrorPage from "./Errorcomponent/ErrorPage";
import { AppDispatch, RootState } from "./ReduxSystem/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setArbicLanguage } from "./ReduxSystem/Settings";
import AudioPlayerPrimary from "./Component/AudioPlayerPrimary";
import ReciterisDetails from "./ReciterisDetails/ReciterisDetails";
import Radio from "./Radio/Radio";
import AudioPlayerRadio from "./Component/AudioPlayerRadio";
import AyahtTime from "./AyahtTiming/AyahtTime";
import { userdatalogin } from "./ReduxSystem/userSlice";
import FavListPage from "./FavouriteList/FavListPage";
import ProfilePage from "./ProfilePage/ProfilePage";
function App() {
  const { userobjecttype, updateState, OwnList, dataAddInOwnList } =
    useSelector((state: RootState) => state.userslogindata);
  const { language } = useSelector((state: RootState) => state.Settings);
  const { state } = useSelector((state: RootState) => state.RadioStateSlice);
  const { LastPlayed, FavList, Playlist } = useSelector((state: RootState) => state.ClearedData);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (language === "ar") {
      dispatch(setArbicLanguage());
    }
    if (userobjecttype) {
      dispatch(userdatalogin(userobjecttype ? userobjecttype.id : "0"));
    }
  }, [state, updateState, OwnList, dataAddInOwnList, LastPlayed, FavList, Playlist]);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route
          path="/home/ReciterisDetails/:id"
          element={<ReciterisDetails />}
        />
        <Route path="/radio" element={<Radio />} />
        <Route path="/ayhat" element={<AyahtTime />} />
        <Route path="/favlistpage" element={<FavListPage />} />

        {!userobjecttype ? (
          <Route path="/loginpage" element={<Loginpage />} />
        ) : (
          <Route path="*" element={<ErrorPage />} />
        )}
        {!userobjecttype ? (
          <Route path="/signuppage" element={<SignUpPage />} />
        ) : (
          <Route path="*" element={<ErrorPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <div className="sticky bottom-0">
        {state ? <AudioPlayerRadio /> : <AudioPlayerPrimary />}
      </div>
    </div>
  );
}

export default App;
