import { Route, Routes } from "react-router-dom";
// Layout
import { DashboardPage } from "../pages/DashboardPage";
import { MaintenancePage } from "../pages/MaintenancePage";
import LoginPage from "../pages/auth/LoginPage";

import Role1PO from "../pages/1/po/indexPage";
import Role1Move from "../pages/1/move/indexPage";

import Role2RencanaSalur from "../pages/2/rencanasalur/indexPage";
import Role2DTTUndangan from "../pages/2/dtt/indexPage";
import Role2DO from "../pages/2/do/indexPage";
import Role2LO from "../pages/2/lo/indexPage";


import Role3DO from "../pages/3/do/indexPage";
import Role3LO from "../pages/3/lo/indexPage";

import Role4Penyaluran from "../pages/4/penyaluran/indexPage";


const AppRoutes = () => {
    const id_role = localStorage.getItem('id_role');
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            {id_role == '1' && (
                <>
                    <Route path="/1/dashboard" element={<DashboardPage />} />
                    <Route path="/1/po" element={<Role1PO />} />
                    <Route path="/1/move" element={<Role1Move />} />
                </>
            )}
            {id_role == '2' && (
                <>
                    <Route path="/2/dashboard" element={<DashboardPage />} />
                    <Route path="/2/rencanasalur" element={<Role2RencanaSalur />} />
                    <Route path="/2/dttundangan" element={<Role2DTTUndangan />} />
                    <Route path="/2/dockout" element={<Role2DO />} />
                    <Route path="/2/losjt" element={<Role2LO />} />
                </>
            )}
            {id_role == '3' && (
                <>
                    <Route path="/3/dashboard" element={<DashboardPage />} />
                    <Route path="/3/dockout" element={<Role3DO />} />
                    <Route path="/3/lo" element={<Role3LO />} />
                </>
            )}
            {id_role == '4' && (
                <>
                    <Route path="/4/dashboard" element={<DashboardPage />} />
                    <Route path="/4/penyaluran" element={<Role4Penyaluran />} />
                </>
            )}
            <Route path="*" element={<MaintenancePage />} />
        </Routes>
    )
}
export default AppRoutes;