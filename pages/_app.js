import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
