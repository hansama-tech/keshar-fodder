import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fodder Co.</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className="text-blue-600 hover:text-blue-800">
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/reports" className="text-blue-600 hover:text-blue-800">
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

