import { Box, Button, Divider, Fade, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useTelegram } from "../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { PaymentModal } from "./modals";
import { useState } from "react";
import { CompaingTypes } from "../pages";
import { useQueries, useQuery } from "react-query";
import { getSingleCampaign } from "../services/compaings";

interface DonationCardProps {
  campaign: CompaingTypes;
}

export function DonationCard({ campaign }: DonationCardProps) {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fade in timeout={400}>
      <Box>
        <Box
          onClick={() => navigate(`/donations/${campaign.id}`)}
          sx={{
            width: "100%",
            background: "#fff",
            borderRadius: "8px",
            position: "relative",
            zIndex: 9,
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#000",
              height: "225px",
              position: "relative",
              borderRadius: "12px",
            }}
          >
            <Box
              component="img"
              src={campaign?.link}
              sx={{
                background: "#fafafa",
                objectFit: "cover",
                opacity: ".85",
                width: "100%",
                height: "225px",
                borderRadius: "12px",
                inset: "10px",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              padding: "10px",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 999999,
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                tg.openTelegramLink(
                  `https://t.me/share/url?url=https://t.me/toobaaibot/tooba_ai&start=&text=`
                );
              }}
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
              onClick={(e) => {
                setOpen(true);
                e.stopPropagation();
              }}
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "12px", opacity: ".4" }}>
                Цель
              </Typography>
              <Typography sx={{ fontWeight: "500", fontSize: "1.5rem" }}>
                {campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
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
                {campaign.collected
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                ₽
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              background: "#000",
              opacity: ".2",
              borderRadius: "8px",
            }}
          />
          <Box sx={{ padding: "15px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              {campaign.title}
            </Typography>
          </Box>
        </Box>
        {/* Payment Modal */}
        <PaymentModal
          id={campaign.id}
          openState={open}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Fade>
  );
}
