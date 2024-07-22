import React from "react";
import { Button, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import InputText from "@/components/InputText";
import InputDatePicker from "@/components/InputDatePicker";
import InputSelect from "@/components/InputSelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

function getReturnComponent() {
  return (
    <Grid item xs={2}>
      <Link
        href={"/pets"}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Typography
          component={"h2"}
          fontSize={24}
          alignItems={"center"}
          display={"flex"}
        >
          <IconButton aria-label="delete" color="primary">
            <ArrowBackIcon />
          </IconButton>
          Voltar
        </Typography>
      </Link>
    </Grid>
  );
}

const ShowPetPageView = ({
  pageTitle = "Register new pet",
  petCategories,
  errors,
  onSubmit,
  handleSubmit,
  control,
  isShowPage = false,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <>
        <Grid container marginBottom={4} spacing={4}>
          {getReturnComponent()}
          <Grid item xs={12}>
            <Skeleton variant="rounded" width={200} height={40} />
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} xs={8}>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rounded" height={55} />
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
  return (
    <>
      <Grid container marginBottom={4} spacing={4}>
        {getReturnComponent()}
        <Grid item xs={12}>
          <Typography component={"h2"} fontSize={24}>
            {pageTitle}
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} xs={8}>
          <Grid item xs={6}>
            <InputText
              errors={errors}
              name={"name"}
              control={control}
              label={"Name"}
              required
              disabled={isShowPage}
            />
          </Grid>
          <Grid item xs={6}>
            <InputText
              errors={errors}
              name={"description"}
              control={control}
              label={"Description"}
              disabled={isShowPage}
            />
          </Grid>
          <Grid item xs={6}>
            <InputText
              errors={errors}
              name={"imageUrl"}
              control={control}
              label={"Image url"}
              disabled={isShowPage}
            />
          </Grid>
          <Grid item xs={6}>
            <InputDatePicker
              errors={errors}
              name={"birthDate"}
              control={control}
              label={"Birth date"}
              disabled={isShowPage}
            />
          </Grid>
          <Grid item xs={6}>
            <InputSelect
              errors={errors}
              name={"status"}
              control={control}
              label={"Availability"}
              defaultValue={"AVAILABLE"}
              disabled={isShowPage}
              options={[
                { value: "AVAILABLE", label: "Available" },
                { value: "ADOPTED", label: "Adopted" },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <InputSelect
              errors={errors}
              name={"category"}
              control={control}
              label={"Category"}
              options={petCategories}
              disabled={isShowPage}
            />
          </Grid>
          {!isShowPage && (
            <Grid item xs={12}>
              <Button variant={"contained"} type={"submit"}>
                Register
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default ShowPetPageView;
