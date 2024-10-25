import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@routers/routers';
import { Suspense } from 'react';
import { SidebarProvider } from '@contexts/SidebarProvider';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToastProvider } from '@contexts/ToastProvider';

function App() {
    return (
        <ToastProvider>
            <SidebarProvider>
                <Sidebar />
                <BrowserRouter>
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
            </SidebarProvider>
        </ToastProvider>
    );
}

export default App;
