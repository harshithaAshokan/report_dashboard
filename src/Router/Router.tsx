import Dashboard from '../Home/Home/Dashboard/Dashboard';
import FailureAnalysis from '../Home/Home/Reports/FailureAnalysis/FailureAnalysis';
import Login from '../Home/Login/Login';
import { AuthPrivate, HomePrivate } from './PrivateRouter';
import { createBrowserRouter } from 'react-router-dom';
import NotificationReport from '../Home/Home/Reports/Notification/NotificationReport';
import Navbar from '../Home/Home/Navbar/Navbar';

export const router = createBrowserRouter([
    {
       
        element: <AuthPrivate />,
        children: [
            {
                path: "login",
                element: <Login/>,
            },
        ]
    },
    {
        
        element: <HomePrivate />,
        children: [
            {
                path:"/",
                element: <Navbar/>,
                children: [
                   {
                    path:"dashboard",
                element: <Dashboard/>,
                   } ,
                   {
                    path:"failureReport",
                element: <FailureAnalysis/>,
                   }, {
                    path:"notificationReport",
                element: <NotificationReport/>,
                   } 
                   

                ]

            }
        ]
    }
]);
