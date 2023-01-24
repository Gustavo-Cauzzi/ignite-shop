import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minHeight: "100vh",
  justifyContent: "center",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ShoppingCartContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: 12,
  padding: "0.75rem",

  backgroundColor: "$gray800",
  transition: "filter 0.2s",
  cursor: "pointer",

  "&:hover": {
    filter: "brightness(0.9)",
  },

  position: "relative",

  div: {
    color: "#FFF",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    background: "$green300",
    position: "absolute",
    top: "-0.5rem",
    right: "-0.5rem",
    fontSize: "0.7rem",
  },
});

export const CartOverlay = styled("div", {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  background: "#0006",
  cursor: "pointer",
  pointerEvents: "none",

  "> div": {
    pointerEvents: "all",
    width: "30rem",
    padding: "4.5rem 3rem 3rem 3rem",
    position: "absolute",
    background: "$gray800",
    top: 0,
    right: 0,
    bottom: 0,
    cursor: "auto",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",

    "> button": {
      background: "transparent",
      border: 0,
      position: "absolute",
      top: "24px",
      right: "24px",
      padding: "0.25rem",
      transition: "background 0.2s",
      borderRadius: "24px",
      cursor: "pointer",

      "&:hover": {
        background: "#fff4",
      },
    },

    h1: {
      fontWeight: "bold",
    },

    footer: {
      position: "absolute",
      bottom: "3rem",
      left: "3rem",
      right: "3rem",
      display: "flex",
      flexDirection: "column",

      "div + div": {
        marginTop: "1rem",
      },
      "div + button": {
        marginTop: "2rem",
      },

      div: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",

        strong: {
          fontSize: "1.25rem",
        },
        span: {
          color: "$gray300",
        },
      },

      button: {
        border: 0,
        background: "$green300",
        color: "#fff",
        padding: "1.25rem",
        borderRadius: "15px",
        fontSize: "1.25rem",
        fontWeight: "bold",
        "&:hover": {
          background: "$green500",
        },
        transition: "background 0.2s",
        cursor: "pointer",
      },
    },
  },
});

export const CartProduct = styled("div", {
  display: "flex",
  gap: "1rem",
  height: "fit-content",

  figure: {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    padding: "0.5rem",
    borderRadius: "15px",
  },

  "> div": {
    padding: "0.5rem 0",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",

    button: {
      border: 0,
      background: "transparent",
      color: "$green300",
      padding: 0,
      width: "fit-content",
      cursor: "pointer",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});
