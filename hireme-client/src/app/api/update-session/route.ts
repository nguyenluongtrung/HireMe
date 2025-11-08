import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

import { ServerStatusCode } from '@/contants/enums';

export async function POST(req: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response('Unauthorized', {
      status: ServerStatusCode.UNAUTHORIZED,
    });
  }

  const { avatarUrl } = await req.json();
  session.user.avatarUrl = avatarUrl;
  return new Response(JSON.stringify({ success: true, session }), {
    status: ServerStatusCode.OK,
  });
}
