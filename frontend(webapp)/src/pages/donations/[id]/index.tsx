import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useTelegram } from "../../../hooks/useTelegram";
import { useEffect, useState } from "react";
import { PaymentModal } from "../../../components/modals";
import { useQuery } from "react-query";
import { getSingleCampaign } from "../../../services/compaings";

export function SingleDonationPage() {
  const [open, setOpen] = useState<boolean>(false);

  const { id } = useParams();
  const { tg } = useTelegram();
  tg.BackButton.show();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getSingleCampaign(Number(id)),
    enabled: Boolean(id),
  });

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={35} />
      </Box>
    );

  return (
    <Fade in timeout={500}>
      <Box>
        <Box
          sx={{
            width: "100%",
            background: "#000",
            height: "225px",
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            src={data?.data?.link}
            sx={{
              borderRadius: "10px",

              objectFit: "cover",
              opacity: ".85",
              width: "100%",
              height: "225px",
              background: "#fafafa",
              inset: "10px",
            }}
          />
        </Box>

        <Box sx={{}}>
          <Box
            sx={{
              background: "#fff",
              borderBottom: "1px rgb(128 128 128 / 27%) solid",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              display: "flex",
              gap: "8px",
              marginTop: ".5rem",
              padding: "15px 10px",
              borderRadius: "10px 10px",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                tg.openTelegramLink(
                  `https://t.me/share/url?url=https://t.me/ToobaAIBot/tooba_ai&start=&text=`
                )
              }
              sx={{
                color: "rgb(0 0 0 / 60%)",
                width: "42%",
                borderRadius: "30px",
                background: "rgba(49,187,181,.8)",
                // boxShadow: "none",

                ":hover": {
                  background: "rgba(49,187,181,.9)",
                },
              }}
              startIcon={<ShareIcon />}
            >
              Поделиться
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              sx={{
                width: "58%",
                borderRadius: "30px",
                height: "40px",
                // boxShadow: "none",
                background:
                  "linear-gradient(90deg, rgba(46,125,122,1) 0%, #0EB1AB 50%, rgba(46,125,122,1) 100%)",
              }}
              startIcon={<VolunteerActivismIcon />}
            >
              Пожертвовать
            </Button>
          </Box>
          <Box
            sx={{
              background: "#fff",
              marginTop: ".5rem",
              borderRadius: "10px 12px",
              padding: "10px 15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "12px", opacity: ".4" }}>
                  Цель
                </Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "1.5rem" }}>
                  {data?.data.goal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  ₽
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", opacity: ".4" }}>
                  Собрали
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    background:
                      "linear-gradient(90deg, rgba(46,125,122,1) 0%, #0EB1AB 50%, rgba(46,125,122,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {data?.data.collected
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  ₽
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                paddingBottom: "1rem",
              }}
            >
              {data?.data.title}
            </Typography>

            <Typography>{data?.data.description}</Typography>
          </Box>
        </Box>

        {/* Payment Modal */}
        <PaymentModal
          id={Number(id)}
          openState={open}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Fade>
  );
}
