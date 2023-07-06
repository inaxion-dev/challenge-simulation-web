import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { NativeBaseProvider } from "native-base";

const Client = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [])
  return mounted ? children : null;
}

function MyApp({ Component, pageProps }) {
  return (
    <NativeBaseProvider>
      <Client>
        <Component {...pageProps} />
      </Client>
    </NativeBaseProvider>
  );
}

export default MyApp;
