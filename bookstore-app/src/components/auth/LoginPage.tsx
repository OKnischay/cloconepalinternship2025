'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import myImage from "@/assets/imagegirl.png";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login response:", data); 
  
      if (response.ok && data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        console.log("Access Token:", localStorage.getItem("access_token")); 
  
        toast.success("Login Successfull")
        router.push("/dashboard/books");
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login Unsuccessfull")
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center p-7 bg-slate-900 inset-1">
      <Card>
        <div className="flex justify-center items-center">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-8 md:p-8 space-y-7" onSubmit={handleLogin}>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to your account</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {error && <p className="text-center text-red-500">{error}</p>}

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

            <div className="hidden md:block relative">
              <Image
                src={myImage}
                alt="Image"
                width={1500}
                height={1500}
                className="absolute inset-11 w-full h-full object-contain dark:brightness-[0.9]"
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;