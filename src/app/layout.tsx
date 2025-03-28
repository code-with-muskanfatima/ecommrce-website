import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import CartIcon from "@/components/CartIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion Store - Modern Clothing for Men and Women",
  description: "Discover the latest trends in men's and women's fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Fashion Store
                </Link>
                <div className="flex items-center space-x-8">
                  <Link 
                    href="/?category=men" 
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Men
                  </Link>
                  <Link 
                    href="/?category=women" 
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Women
                  </Link>
                  <CartIcon />
                </div>
              </div>
            </div>
          </nav>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
