import Board from '@/components/board';
import { lists } from '@/data/lists';

export default function Home() {
  return (
    <main className="bg-gradient h-screen">
      <div className="container">
        <h1 className="text-white font-black text-2xl text-center py-8">NexTrello</h1>
      </div>
      <Board lists={lists} />
    </main>
  );
}
