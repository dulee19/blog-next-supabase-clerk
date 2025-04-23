import Link from "next/link"
import { Button } from "../button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Header = () => {
  return (
    <header className="border-b">
      <div className="py-2 container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Next.js Blog</Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>
          
          
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>

      </div>
    </header>
  )
}

export default Header