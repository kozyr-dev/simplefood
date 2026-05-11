import { VariantType, useSnackbar } from "notistack";

const useSnackbarHook = () => {
  const { enqueueSnackbar } = useSnackbar();

  const openSnackbar = (variant: VariantType, message: string) => {
    enqueueSnackbar(`${message}`, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 3000,
    });
  };
  return { openSnackbar };
};

export default useSnackbarHook;
