import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <header>
        <div className="bg-gray-900">
          <div className="max-w-screen-xl flex justify-between mx-auto">
            <h1 className="text-white">
              <span className="text-amber-400 pr-2">NAO</span>BLOG
            </h1>
            <nav className="flex items-center max-w-xl w-full">
              <ul className="flex list-none w-full items-center font-['Montserrat',sans-serif] font-medium justify-around">
                <li className="current">
                  <Link className="text-white" href="#HOME">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link className="text-white" href="#about">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link className="text-white" href="#contact">
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link className="text-white" href="/blog">
                    BLOG
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
};

export default Home;
