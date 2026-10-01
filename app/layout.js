import './globals.css'

export const metadata = {
  title: 'Cloth Brand M-Pesa',
  description: 'E-commerce platform with M-Pesa integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
