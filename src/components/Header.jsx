import Link from "next/link";
import { SiCodechef } from "react-icons/si";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  function LinkList() {
    return (
      <>
        <li>
          <Link className="link-hover link flex font-semibold" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link-hover link flex font-semibold" href="/ChasGPT">
            ChasGPT
          </Link>
        </li>
        <li>
          <Link className="link-hover link flex font-semibold" href="/TranslatorAi">
            TranslatorAI
          </Link>
        </li>
        <li>
          <Link className="link-hover link flex font-semibold" href="/CulinaryAI">
            <SiCodechef size={24} /> CulinaryAI
          </Link>
        </li>
        <li>
          <Link className="link-hover link flex font-semibold" href="/AiHealthCoach">
            ThriveAI
          </Link>
        </li>
      </>
    );
  }

  return (
    <header>
      <nav className="navbar justify-end bg-base-200 shadow">
        <div className="dropdown dropdown-end dropdown-bottom md:hidden">
          <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
            <LuMenu size={20} />
          </div>
          <ul tabIndex={0} className="menu dropdown-content z-[99] w-52 rounded-box bg-base-200 p-2 shadow">
            <LinkList />
          </ul>
        </div>
        <ul className="hidden gap-6 px-4 md:flex">
          <LinkList />
        </ul>
      </nav>
    </header>
  );
}
