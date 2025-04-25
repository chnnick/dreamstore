import { login, signup } from '../app/login/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              formAction={login}
            >
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Separator className="my-2" />
          <div className="text-center text-sm text-gray-500 mt-2 mb-4">
            Don't have an account?
          </div>
          <form>
            <input type="hidden" name="email" id="signup-email" />
            <input type="hidden" name="password" id="signup-password" />
            <Button 
              type="submit"
              variant="outline" 
              className="w-full" 
              formAction={signup}
            >
              Sign up
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}