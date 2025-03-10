import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react'

const Loginpage = ()=> {
  return (
    <div className="h-full flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-8 md:p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">Login to your account</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">Login</Button>

            <div className="text-center">
              <a href="#" className="text-sm underline hover:text-primary">
                Forgot your password?
              </a>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="http://localhost:3000/signup" className="underline hover:text-primary">
                Sign up
              </a>
            </div>
          </form>

          <div className="hidden bg-muted md:block relative">
            <img
              src="/vercel.svg"
              alt="Login Image"
              className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default Loginpage