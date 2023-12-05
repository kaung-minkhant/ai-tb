import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import WelcomePage, { WelcomePageLoader } from './pages/WelcomePage/WelcomePage.component.jsx'
import PatientPage, { PatientPageLoader } from './pages/PatientPage/PatientPage.component.jsx'
import MainLayout, { MainLayoutLoader } from './layouts/MainLayout.component.jsx'
import DocterPage from './pages/DoctorPage/DocterPage.component.jsx'
import ViewAllScans from './components/ViewAllScans/ViewAllScans.component.jsx'
import AnalyticPage from './pages/Analytic/Analytic.component.jsx'

import MapPage from "./pages/Map/MapPage.component.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.component.jsx";
import AddPatientPage from "./pages/AddPatient/AddPatient.component.jsx";

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Tests from './components/Tests/Tests.component'
import PatientProfilePage from './pages/PatientProfile/PatientProfilePage.component'
import DoctorProfile from './pages/DoctorProfile/DoctorProfile.component'
import DoctorPatientsPage from './pages/DoctorPatientsPage/DoctorPatientsPage.component.jsx'
import DoctorAppointments from './pages/DoctorAppointments/DoctorAppointments.component.jsx'
import CallPage from './pages/Call/CallPage.component.jsx'
import AiScanPage from './pages/AiScan/AiScanPage.component.jsx'
import AiScan from './components/AiScan/AiScan.component.jsx'
import VideoCall from './pages/VideoCall/VideoCall.component.jsx'

import RecordTablePage from "./pages/RecordTable/RecordTablePage.component.jsx"
import RecordsPage from "./pages/Records/RecordsPage.component.jsx"

import ViewScan from './components/ViewScan/ViewScan.component.jsx'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login/Login.component.jsx'
import Register from './components/Register/Register.component.jsx'
import FillTheInfo from './components/FillTheInfo/FillTheInfo.component.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <WelcomePage />,  
    loader: WelcomePageLoader,
    children: [
      {
        index: true,
        element: <Login />
      }, 
      {
        path: 'signup',
        element: <Register />
      },
    ]
  },
  {
    path: '/patient',
    element: <MainLayout />,
    loader: MainLayoutLoader,
    children: [
      {
        index: true,
        element: <PatientPage />,
      },
      {
        path: 'onboarding',
        element: <FillTheInfo />
      },
      {
        path: 'allscans',
        element: <ViewAllScans width='300px' />,
      },
      {
        path: 'scan/view-scan',
        element: <ViewScan />
      }, 
      {
        path: 'profile',
        element: <PatientProfilePage />
      },
      {
        path: 'ai-scan',
        element: <AiScanPage />,
      },
      {
        path: 'appointments',
        element: <DoctorAppointments />
      },
      {
        path: 'call',
        element: <VideoCall />
      },
      {
        path: 'nearby',
        element: <MapPage/>
      },
      {
        path: 'records/:recordId',
        element: <RecordTablePage/>
      },
      {
        path: 'records',
        element: <RecordsPage/>
      },
      {
        path: 'scan',
        element: <AiScan />
      },
      {
        path: 'calls',
        element: <CallPage />
      },
      {
        path: 'nearby',
        element: <MapPage/>
      },
      {
        path: 'dashboard',
        element: <DashboardPage/>
      }
    ]
  },
  {
    path: '/doctor',
    element: <MainLayout />,
    loader: MainLayoutLoader,
    children: [
      {
        index: true,
        element: <DocterPage />,
      },
      {
        path: 'profile',
        element: <DoctorProfile />
      },
      {
        path: 'patients',
        element: <DoctorPatientsPage />
      },
      {
        path: 'patients/:patientId',
        element: <PatientProfilePage />
      },
      {
        path: 'patients/:patientId/records',
        element: <RecordsPage />
      },
      {
        path: 'patients/:patientId/records/:recordId',
        element: <RecordTablePage/>
      },
      {
        path: 'appointments',
        element: <DoctorAppointments />
      },
      {
        path: 'calls',
        element: <CallPage />
      },
      {
        path: 'ai-scan',
        element: <AiScanPage />,
      },
      {
        path: 'scan',
        element: <AiScan />
      },
      {
        path: 'allscans',
        element: <ViewAllScans width='300px' />,
      },
      {
        path: 'call',
        element: <VideoCall />
      },
      {
        path: 'scan/view-scan',
        element: <ViewScan />
      }, 
      {
        path: 'add-patient',
        element: <AddPatientPage />
      }, 
      {
        path: 'dashboard',
        element: <DashboardPage/>
      }
    ]
  },
  {},
  {
    path: '/analytic',
    element: <MainLayout />,
    loader: MainLayoutLoader,
    children: [
      {
        index: true,
        element: <AnalyticPage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    loader: MainLayoutLoader,
    children: [
      {
        index: true,
        element: <DashboardPage/>
      }
    ]
  },
  {
    path: '/codetests',
    element: <Tests />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
