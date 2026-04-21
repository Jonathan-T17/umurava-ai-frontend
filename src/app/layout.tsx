import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Global Providers */}
        <Providers>
          {children}
        </Providers>

        {/* ✅ Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1f2937", // Tailwind gray-800
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
