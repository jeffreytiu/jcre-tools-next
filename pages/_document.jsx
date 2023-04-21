import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <header className="shadow-sm bg-white">
          <nav className="container mx-auto p-4 flex justify-between">
            <Link href="/" className="font-bold">
              JCRE
            </Link>
            <ul className="flex gap-4">
              <li>
                <Link href="/internal-report">Internal Report</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
