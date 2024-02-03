import './index.css'
import * as THREE from 'three'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import FullScreenWebContainer from '@lottery/shared/components/FullScreenContainer'
import { MittProvider } from '@lottery/shared/hooks/useMitt'
import { ToastContainer } from 'react-toastify'
import router from '@/router'
import 'react-toastify/dist/ReactToastify.css'

window.THREE = THREE

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FullScreenWebContainer designHeight={1080} designWidth={1920} bodyScale bodyColor="#000">
    <MittProvider>
      <RouterProvider router={router} />
      <ToastContainer theme="light" />
    </MittProvider>
  </FullScreenWebContainer>,
)
