import "../globals.css"; // Certifique-se de que o caminho está correto

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Task Manager</title>
      </head>
      <body className="bg-gray-200 text-gray-900 min-h-screen flex justify-center items-center">
        <main className="w-full max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
