import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRouters, publicRouters } from '@routers/routers';
import { Suspense } from 'react';
import { SidebarProvider } from '@contexts/SidebarProvider';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToastProvider } from '@contexts/ToastProvider';
import { StoreProvider } from '@contexts/StoreProvider';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { SearchProvider } from '@contexts/SearchProvider';
import Search from '@components/Search/Search';
import ProtectedRoute from '@routers/ProtectedRoute';
import SidebarMenu from '@components/Sidebar/SidebarMenu';
import LoginRoute from '@routers/LoginRoute';
import { PaymentMethodsProvider } from '@contexts/PaymentMethodsProvider';

function App() {
    return (
        <ToastProvider>
            <PaymentMethodsProvider>
                <SearchProvider>
                    <SidebarProvider>
                        <StoreProvider>
                            <BrowserRouter>
                                <Sidebar />
                                <SidebarMenu />
                                <Search />
                                <Suspense fallback={<div>...Loading</div>}>
                                    <Routes>
                                        <Route
                                            path='/dang-nhap'
                                            element={<LoginRoute />}
                                        />
                                        <Route element={<ProtectedRoute />}>
                                            {privateRouters.map(
                                                (item, index) => {
                                                    return (
                                                        <Route
                                                            path={item.path}
                                                            element={
                                                                <item.component />
                                                            }
                                                            key={index}
                                                        />
                                                    );
                                                }
                                            )}
                                        </Route>
                                        {publicRouters.map((item, index) => {
                                            return (
                                                <Route
                                                    path={item.path}
                                                    element={<item.component />}
                                                    key={index}
                                                />
                                            );
                                        })}
                                    </Routes>
                                </Suspense>
                            </BrowserRouter>
                        </StoreProvider>
                    </SidebarProvider>
                </SearchProvider>
            </PaymentMethodsProvider>
        </ToastProvider>
    );
}

export default App;
