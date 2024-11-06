import { Button } from "@/app/_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth()

  if(userId) {
    redirect('/')
  }

  return (
    <div className="grid h-full grid-cols-2">
      {/* Left */}
      <div className="flex h-full flex-col justify-center p-8 max-w-[500px] mx-auto">
        <Image alt="logo svg" width={173} height={89} src="/logo.svg" className="mb-8 " />
        <h1 className="text-4xl font-bold mb-3">Bem vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer
          insights personalizados, facilitando o controle do seu orçamento
        </p>
        <SignInButton>
          <Button variant={"outline"}>
            <LogInIcon className="mr-2" />
            Fazer Login
          </Button>
        </SignInButton>

      </div>

      {/* Right*/}
      <div className="relative h-full w-full">
        <Image alt="login image" fill src="/login.png" className="object-cover" />
      </div>
    </div>
  );
}

export default LoginPage;