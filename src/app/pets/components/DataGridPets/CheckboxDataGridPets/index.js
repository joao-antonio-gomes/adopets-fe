import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { usePetsPageContext } from "@/app/pets/context/petsPageContext";
import { backendClient } from "@/config/axios";
import { useSnackbar } from "@/contexts/snackbar";

const isPetDisponible = {
  AVAILABLE: false,
  ADOPTED: true,
};

function CheckboxDataGridPets({ row }) {
  const { setIsLoading } = usePetsPageContext();
  const { addSnackbar } = useSnackbar();

  const { status } = row;

  const [adopted, setAdopted] = useState(isPetDisponible[status]);

  const handleChange = async () => {
    setIsLoading(true);
    setAdopted(!adopted);

    backendClient
      .patch(`/pets/${row.id}`, { adopted: !adopted })
      .then(() => {
        addSnackbar({
          type: "success",
          message: `${row.name} ${!adopted ? "adotado" : "disponível para adoção"}`,
        });
      })
      .catch(() => {
        setAdopted(adopted);
        addSnackbar({
          type: "error",
          message: "An error occurred",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return <Checkbox checked={adopted} onChange={handleChange} />;
}

export default CheckboxDataGridPets;
