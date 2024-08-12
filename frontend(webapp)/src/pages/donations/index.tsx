import {
  Box,
  CircularProgress,
  Divider,
  Icon,
  Pagination,
  Typography,
} from "@mui/material";
import { DonationCard } from "../../components/DonationCard";
import { VolunteerActivism } from "@mui/icons-material";
import { useQuery } from "react-query";
import { getCampaigns, getSingleCampaign } from "../../services/compaings";
import { useEffect, useState } from "react";

export interface CompaingTypes {
  id: number;
  title: string;
  description: string;
  goal: number;
  collected: number;
  link: string;
}

export function Donations() {
  const limit = 10;
  const [page, setPage] = useState<number>(1); // Start with page 1

  // Offset calculation
  const offset = (page - 1) * limit;

  const { data, isLoading, isError } = useQuery(
    ["campaigns", page],
    () => getCampaigns({ limit, offset }),
    {
      keepPreviousData: true, // Keeps the previous data while loading new data
    }
  );

  const totalPages = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    localStorage.setItem("donationsPage", value.toString());
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("donationsPage");
    if (savedPage) {
      setPage(Number(savedPage));
    }
  }, []);

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
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: ".25rem",
          marginBottom: "1.25rem",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#000",
          }}
        >
          Tooba AI
        </Typography>
        <VolunteerActivism sx={{ fontSize: "2rem", color: "#368F8B" }} />
        <Box
          sx={{
            position: "absolute",
            bottom: "-5px",
            left: "-15px",
            right: "-15px",

            height: "1px",
            background: "#2f7d7a",
            opacity: ".2",
            borderRadius: "8px",
          }}
        />
      </Box>
      <Box sx={{ display: "grid", gap: "15px" }}>
        {data?.data?.map((campaign: CompaingTypes) => (
          <DonationCard key={campaign.id} campaign={campaign} />
        ))}
      </Box>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem auto .5rem 0 ",
        }}
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </>
  );
}
