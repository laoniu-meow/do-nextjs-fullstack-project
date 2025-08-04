import { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import HeaderSkeleton from '@/components/HeaderSkeleton';
import PageTransition from '@/components/PageTransition';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load the main content
const MainContent = lazy(() => import('@/components/MainContent'));

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        <main className="flex items-center justify-center min-h-screen">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="large" />
              </div>
            }
          >
            <MainContent />
          </Suspense>
        </main>
      </div>
    </PageTransition>
  );
}
