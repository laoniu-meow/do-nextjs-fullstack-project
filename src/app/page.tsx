import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to my page</h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a responsive page that works well on all devices
          </p>
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Mobile Optimized</h2>
              <p className="text-sm text-gray-700">
                The header automatically adjusts for mobile devices to prevent
                scrolling issues.
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Responsive Design</h2>
              <p className="text-sm text-gray-700">
                Content adapts to different screen sizes for optimal viewing
                experience.
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Touch Friendly</h2>
              <p className="text-sm text-gray-700">
                All interactive elements are properly sized for touch devices.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
