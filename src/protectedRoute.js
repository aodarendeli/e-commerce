import { useSelector } from "react-redux";
import { Outlet , Navigate} from "react-router-dom";
const ProtectedRoutes = () => {
    let val  = useSelector(state=>state?.auth?.userInfo?.data)
    return val ? <Outlet /> : <Navigate to="/404" />;
}
export default ProtectedRoutes