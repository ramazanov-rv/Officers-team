import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useTelegram } from "../../hooks/useTelegram";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { gptTrigger } from "../../services/gptTriigger";

interface PaymentModalProps {
  openState: boolean;
  onClose: () => void;
  id: number | undefined;
}

interface Inputs {
  first_name: string;
  last_name: string;
  donationAmount: number | string;
}

export function PaymentModal({ openState, onClose, id }: PaymentModalProps) {
  const { register, getValues, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      first_name: "",
      last_name: "",
      donationAmount: undefined,
    },
  });

  const isValid =
    watch("first_name") === "" ||
    watch("last_name") === "" ||
    watch("donationAmount") === "";

  const { tg, user } = useTelegram();

  // Handle Input Cursor Transition with Keaboard
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter key behavior
      if (nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: "gpt-trigger",
    mutationFn: () =>
      gptTrigger({ userId: user ? user.id : 0, campaignId: id }),
    onSuccess() {
      tg.showPopup({
        title: "Спасибо!",
        message: `Ваше пожертвование ${getValues(
          "donationAmount"
        ).toLocaleString("ru-RU")} рублей было внесено успешно`,
        buttons: [{ type: "close" }],
      });
      onClose();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    mutate();
  };

  return (
    <Drawer
      disableScrollLock={false}
      anchor="bottom"
      open={openState}
      onClose={onClose}
    >
      <Box
        sx={{
          width: "100%",
          height: "90vh",

          paddingInline: "15px",
          paddingBottom: "1.75rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            paddingBlock: "1.25rem",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          Введите сумму пожертвования
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "400",
          }}
        >
          Ваши средства будут направлены в благотворительный фонд
        </Typography>
        <Box sx={{ display: "grid" }}>
          <TextField
            required
            autoFocus
            {...register("first_name")}
            InputProps={{
              style: {
                borderRadius: "12px",
              },
            }}
            sx={{ width: "100%", marginTop: "1.5rem" }}
            label="Имя"
            type="text"
            variant="outlined"
            inputRef={input1Ref}
            onKeyDown={(e) =>
              handleKeyDown(
                e as React.KeyboardEvent<HTMLInputElement>,
                input2Ref
              )
            }
          />
          <TextField
            required
            {...register("last_name")}
            InputProps={{
              style: {
                borderRadius: "12px",
              },
            }}
            sx={{ width: "100%", marginTop: "1rem" }}
            label="Фамилия"
            type="text"
            variant="outlined"
            inputRef={input2Ref}
            onKeyDown={(e) =>
              handleKeyDown(
                e as React.KeyboardEvent<HTMLInputElement>,
                input3Ref
              )
            }
          />
          <TextField
            {...register("donationAmount")}
            required
            InputProps={{
              style: {
                borderRadius: "12px",
              },
            }}
            sx={{ width: "100%", marginTop: "1rem" }}
            label="Сумма пожертвования (₽)"
            type="tel"
            variant="outlined"
            inputRef={input3Ref}
          />
          <Button
            disabled={isValid || isLoading}
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              marginTop: "1.25rem",
              fontSize: "15px",
              width: "100%%",
              borderRadius: "30px",
              height: "50px",
              // boxShadow: "none",
              background:
                "linear-gradient(90deg, rgba(46,125,122,1) 0%, #0EB1AB 50%, rgba(46,125,122,1) 100%)",
            }}
            startIcon={isLoading ? undefined : <VolunteerActivismIcon />}
          >
            {isLoading ? <CircularProgress /> : "Пожертвовать"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
