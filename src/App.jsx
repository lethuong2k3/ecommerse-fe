import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@routers/routers';
import { Suspense } from 'react';
import { SidebarProvider } from '@contexts/SidebarProvider';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToastProvider } from '@contexts/ToastProvider';
import { StoreProvider } from '@contexts/StoreProvider';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { SearchProvider } from '@contexts/SearchProvider';
import Search from '@components/Search/Search';

function App() {
    return (
        <ToastProvider>
            <SearchProvider>
                <SidebarProvider>
                    <StoreProvider>
                        <BrowserRouter>
                            <Sidebar />
                            <Search />
                            <Suspense fallback={<div>...Loading</div>}>
                                <Routes>
                                    {routers.map((item, index) => {
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
        </ToastProvider>
    );
}

export default App;
