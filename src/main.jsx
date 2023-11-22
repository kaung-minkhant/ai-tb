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

import CallPage from "./pages/Call/CallPage.component.jsx";
import MapPage from "./pages/Map/MapPage.component.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.component.jsx";

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Tests from './components/Tests/Tests.component'

// import 'leaflet/dist/leaflet.css'

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
      }
    ]
  },
  {
    path: '/doctor',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DocterPage />,
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
  {
    path: '/call',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CallPage/>
      }
    ]
  },
  {
    path: '/nearby',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MapPage/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
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
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
