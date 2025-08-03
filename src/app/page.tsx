import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to my page</h1>
      </div>
    </div>
  );
}
