// src/app/page.tsx
"use client"
import { useState } from 'react';
import { login } from './actions';
import { CardContent, CardDescription } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">hello riley...</CardTitle>
          <CardDescription className="text-center">
            enter your creds to change stuff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="put ur email here" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">password</Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="password is 123" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button 
              formAction={login}
              type="submit" 
              className="w-full"
            >
              log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

