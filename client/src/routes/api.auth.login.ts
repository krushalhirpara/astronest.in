import { createFileRoute } from '@tanstack/react-router';
import { users } from '@/lib/userDb';

export const Route = createFileRoute('/api/auth/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { email, password } = await request.json();

          const user = users.find(u => u.email === email && u.password === password);

          if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          console.log('User logged in:', user.email);

          return new Response(JSON.stringify({ 
            success: true, 
            user: { id: user.id, name: user.name, email: user.email } 
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
});
