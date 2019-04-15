import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import Single from './components/Single';
import Author from './components/Author';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./components/ResetPassword";
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				{/*Switch tag will try the first Route, if it doesn't match,
							it's will try the second Route... If there are no Routes were match,
							it will go to fall back to that not found Route*/}
				<Route exact path="/" component={PhotoGrid}></Route>
				 <Route exact path="/home/:userId" component={Author}></Route>
				{/*use 'exact' because our first route is going to be exactly 
							on the forward slash'/' */}
				 <Route path="/view/:authorUid/:postId" component={Single}></Route>

				<Route path="/editprofile/:authorUid" component={EditProfile}></Route>
				<Route path="/changepassword/:authorUid" component={ChangePassword}></Route>

				<Route path="/signup" component={SignUp}></Route>
				<Route path="/resetpassword" component={ResetPassword}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/contact" component={Contact}></Route>
				<Route component={NotFound}></Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Router;