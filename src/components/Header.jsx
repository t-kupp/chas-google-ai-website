import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="navbar gap-4">
        <ul className="flex space-x-4">
          <li>
            <Link className="btn btn-ghost" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/ChasGPT">
              ChasGPT
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/TranslatorAi">
              TranslatorAi
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/CulinaryAI">
              CulinaryAI
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/AiHealthCoach">
              AI Health Coach
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
