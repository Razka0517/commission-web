import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {  const API_KEY = process.env.TRELLO_API_KEY;
  const API_TOKEN = process.env.TRELLO_API_TOKEN;
  const BOARD_ID = process.env.TRELLO_BOARD_ID;

  if (!API_KEY || !API_TOKEN || !BOARD_ID) {
    return NextResponse.json([]);
  }

  try {
    const [listsRes, cardsRes] = await Promise.all([
      fetch(`https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${API_TOKEN}`, { cache: 'no-store' }),
      fetch(`https://api.trello.com/1/boards/${BOARD_ID}/cards?key=${API_KEY}&token=${API_TOKEN}`, { cache: 'no-store' })
    ]);

    if (!listsRes.ok || !cardsRes.ok) {
      throw new Error('Trello API Error');
    }

    const lists = await listsRes.json();
    const cards = await cardsRes.json();

    const queueData = lists.map((list: any) => {
      return {
        id: list.id,
        name: list.name,
        cards: cards
          .filter((card: any) => card.idList === list.id)
          .map((card: any) => ({
            id: card.id,
            name: card.name,
            labels: card.labels,
            due: card.due,
          })),
      };
    });

    return NextResponse.json(queueData);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch queue data' }, { status: 500 });
  }
}