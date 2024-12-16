import NavBar from '@/app/ui/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar></NavBar>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}