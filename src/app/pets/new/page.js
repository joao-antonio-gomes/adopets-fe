"use client";

import React, { useEffect, useState } from "react";
import ShowPetPageView from "@/app/pets/new/showPetPageView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { backendClient } from "@/config/axios";
import { useSnackbar } from "@/contexts/snackbar";

const schema = yup
  .object()
  .shape({
    name: yup.string().min(3).required(),
    category: yup.string().required(),
    status: yup
      .string()
      .oneOf(["AVAILABLE", "ADOPTED"], "Status must be AVAILABLE or ADOPTED")
      .required(),
    description: yup.string(),
    birthDate: yup.date(),
    imageUrl: yup.string(),
  })
  .required();

const NewPetPage = () => {
  const [petCategories, setPetCategories] = useState([]);
  const { addSnackbar } = useSnackbar();

  useEffect(() => {
    backendClient
      .get("/pets/categories")
      .then((response) => {
        const categories = response.data.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        setPetCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.categoryId = data.category;
    backendClient
      .post("/pets", data)
      .then(() => {
        addSnackbar({ type: "success", message: "Pet created successfully" });
      })
      .catch(() => {
        addSnackbar({ type: "error", message: "Failed to create pet" });
      });
  };

  return (
    <ShowPetPageView
      petCategories={petCategories}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default NewPetPage;
