import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout.jsx';
import Loginpage from './routes/Loginpage.jsx';
import Registerpage from './routes/Registerpage.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import SinglePostPage from './components/SinglePostPage.jsx';
import Write from './routes/Write.jsx';
import PostListPage from './routes/PostListPage.jsx';

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/posts',
                element: <PostListPage />,
            },

            {
                path: '/login',
                element: <Loginpage />,
            },
            {
                path: '/register',
                element: <Registerpage />,
            },
            {
                path: '/:slug',
                element: <SinglePostPage />,
            },
            {
                path: '/write',
                element: <Write />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ClerkProvider>
    </StrictMode>
);
