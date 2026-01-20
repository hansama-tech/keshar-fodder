import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">F</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Fodder Co.</h1>
        </div>
        <nav>
          {/* <ul className="flex space-x-6 text-sm font-medium text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className="hover:text-primary transition-colors">
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-primary transition-colors">
                Reports
              </Link>
            </li>
          </ul> */}
        </nav>
      </div>
    </header>
  )
}

