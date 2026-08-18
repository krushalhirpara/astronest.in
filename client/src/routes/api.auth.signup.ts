import { createFileRoute } from '@tanstack/react-router';
import { users } from '@/lib/userDb';

export const Route = createFileRoute('/api/auth/signup')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { name, email, password } = await request.json();

          if (users.find(u => u.email === email)) {
            return new Response(JSON.stringify({ error: 'User already exists' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            password
          };

          users.push(newUser);

          console.log('User signed up:', newUser.email);

          return new Response(JSON.stringify({ 
            success: true, 
            user: { id: newUser.id, name: newUser.name, email: newUser.email } 
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
