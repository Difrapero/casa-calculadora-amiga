const Footer = () => {
  return (
    <footer style={{
      marginTop: "50px",
      padding: "20px",
      textAlign: "center",
      borderTop: "1px solid #ccc"
    }}>
      <p style={{ fontSize: "14px", marginBottom: "10px" }}>
        © {new Date().getFullYear()} calculadorahipotecaria.es
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <a href="/privacidad">Privacidad</a>
        <a href="/cookies">Cookies</a>
        <a href="/aviso-legal">Aviso Legal</a>
      </div>
    </footer>
  );
};

export default Footer;
