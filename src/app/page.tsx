import { getAllLists } from '@/actions/list.actions';

import Board from '@/components/board';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const lists = await getAllLists();

  return (
    <main className="bg-gradient h-screen flex flex-col">
      <div className="container">
        <h1 className="text-white font-black text-2xl text-center py-8">NexTrello</h1>
      </div>

      <Board lists={lists} />
    </main>
  );
}
