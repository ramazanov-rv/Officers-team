import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { ThemeProvider } from "@emotion/react";

import { Box } from "@mui/material";
import { theme } from "../theme";

export function RootLayout() {
  const { tg, user } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.onEvent("backButtonClicked", () => {
      navigate("/");
      tg.BackButton.hide();
    });
  }, []);

  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ background: "#f5f5f5", minHeight: "100vh", padding: "10px 15px" }}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
