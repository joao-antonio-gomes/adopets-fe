import React from "react";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import DataGridPets from "@/app/pets/components/DataGridPets";

const PetsPageView = ({ pets }) => {
  return (
    <Grid component={"main"} container spacing={4}>
      <Grid item xs={12}>
        <Link href={"/pets/new"}>
          <Button variant={"contained"}>Cadastrar pet</Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        Lista de pets
      </Grid>
      <Grid item xs={12}>
        <DataGridPets paginatedPets={pets} />
      </Grid>
    </Grid>
  );
};

export default PetsPageView;
