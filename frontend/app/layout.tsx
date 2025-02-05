import { Inter } from "next/font/google";
import NavBar from '@/app/ui/navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CyberFarm",
  description: "CyberFarm - asset management database for Information Sharing and Analysis Center",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-blue-300" >
      <body className={inter.className}>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}