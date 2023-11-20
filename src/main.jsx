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

const router = createHashRouter([
  {
    path: "/",
    element: <WelcomePage />,  
    loader: WelcomePageLoader,
  },
  {
    path: '/patient',
    element: <MainLayout />,
    loader: MainLayoutLoader,
    children: [
      {
        index: true,
        element: <PatientPage />,
        loader: PatientPageLoader,
      },
      {
        path: 'allscans',
        element: <ViewAllScans width='300px' />,
      },
      {
        path: 'profile',
        element: <PatientProfilePage />
      },
    ]
  },
  {
    path: '/doctor',
    element: <MainLayout />,
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
      }
    ]
  },
  {
    path: '/analytic',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AnalyticPage />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
