import './globals.css'

export const metadata = {
  title: 'YouTube Dashboard ',
  description: 'vinayak tavatam Manage your YouTube videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}