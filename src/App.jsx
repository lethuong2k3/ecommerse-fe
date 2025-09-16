import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRouters, publicRouters } from '@routers/routers';
import { Suspense } from 'react';
import { SidebarProvider } from '@/contexts/sidebar-provider.jsx';
import Sidebar from '@/components/side-bar/side-bar.jsx';
import { ToastProvider } from '@/contexts/toast-provider.jsx';
import { StoreProvider } from '@/contexts/store-provider.jsx';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { SearchProvider } from '@/contexts/search-provider.jsx';
import Search from '@/components/search/search.jsx';
import ProtectedRoute from '@/routers/protected-route.jsx';
import SidebarMenu from '@/components/side-bar/side-bar-menu.jsx';
import LoginRoute from '@/routers/login-route.jsx';
import { PaymentMethodsProvider } from '@/contexts/payment-methods-provider.jsx';

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
