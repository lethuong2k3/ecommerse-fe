import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRouters, publicRouters } from '@routers/routers';
import { Suspense } from 'react';
import { SidebarProvider } from '@/contexts/sidebar-provider.jsx';
import Sidebar from '@/components/Sidebar/sidebar';
import { ToastProvider } from '@/contexts/toast-provider';
import { StoreProvider } from '@/contexts/store-provider';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { SearchProvider } from '@/contexts/search-provider';
import Search from '@/components/Search/search';
import ProtectedRoute from '@/routers/protected-route';
import SidebarMenu from '@/components/Sidebar/sidebar-menu';
import LoginRoute from '@/routers/login-route';
import { PaymentMethodsProvider } from '@/contexts/payment-methods-provider';

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
