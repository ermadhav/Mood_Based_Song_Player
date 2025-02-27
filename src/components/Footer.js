import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 All rights reserved | Made with ❤️ by Madhav Tiwari</p>
    </footer>
  );
};

const styles = {
  footer: {
    position: "absolute",
    bottom: "100",
    width: "100%",
    padding: "5px",
    backgroundColor: "#222",
    color: "#AAA",
    textAlign: "center", // Ensures text is centered
  },
};

export default Footer;
