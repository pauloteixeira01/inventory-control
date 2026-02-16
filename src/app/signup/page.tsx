"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SingUpPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    console.log("Sign up response: ", data)

    // depois que logar, vamos levar pro dashboard (vamos criar já já)
    router.push("/login");
    router.refresh();
  }

  return (
    <main className='min-h-screen flex items-center justify-center p-6'>
      <form
        onSubmit={handleSignup}
        className='w-full max-w-sm space-y-4 rounded-xl border p-6'
      >
        <h1 className='text-2xl font-bold'>Sign up</h1>

        <input
          className='w-full rounded-md border px-3 py-2'
          placeholder='Cadastre um e-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          type="email"
        />
        <input
          className='w-full rounded-md border px-3 py-2'
          placeholder='Cadastre uma senha'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button
          disabled={loading}
          className='w-full rounded-md bg-black py-2 text-white disabled:opacity-60'
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className='text-sm'>
          Não tem conta?{" "}
          <a className='underline' href='/signup'>
            Criar conta
          </a>
        </p>
      </form>
    </main>
  );
}
