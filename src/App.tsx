//import Login from './pages/Login'
//import MapLaboratory from "./pages/MapLaboratory.tsx";
import { RouterProvider } from "react-router-dom"
import { router } from "./router/Routes"

function App() {
    
    return (
         //<Login />
        //<MapLaboratory/>
        <RouterProvider router={router} />
    )
}

export default App
