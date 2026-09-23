import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CreatePostPage from './pages/CreatePostPage';

export function App() {
   const queryClient = new QueryClient();

   return (
      <>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/new" element={<CreatePostPage />} />
                  <Route path="/:slug" element={<BlogPage />} />
               </Routes>
            </BrowserRouter>
         </QueryClientProvider>
      </>
   );
}
export default App;
