import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#000",
      color: "#fff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 9999
    }}>
      <span>
        Usamos cookies para mejorar tu experiencia.{" "}
        <a href="/cookies" style={{ color: "#4ea1ff" }}>Más info</a>
      </span>
      <button onClick={acceptCookies} style={{
        background: "#4ea1ff",
        border: "none",
        padding: "8px 15px",
        cursor: "pointer"
      }}>
        Aceptar
      </button>
    </div>
  );
};

export default CookieBanner;
