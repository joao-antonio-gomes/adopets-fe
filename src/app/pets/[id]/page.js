"use client";

import React, { useEffect, useState } from "react";
import ShowPetPageView from "@/app/pets/new/showPetPageView";
import { useForm } from "react-hook-form";
import { backendClient } from "@/config/axios";
import { useSnackbar } from "@/contexts/snackbar";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const ShowPetPage = () => {
  const [petCategories, setPetCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pet, setPet] = useState({});
  const { addSnackbar } = useSnackbar();
  const { id } = useParams();

  const { control, reset } = useForm();

  function fetchPetCategories() {
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
  }

  function fetchPetById() {
    backendClient
      .get(`/pets?id=${id}`)
      .then((response) => {
        if (!response.data.data) {
          addSnackbar({ type: "error", message: "Pet not found" });
          return;
        }

        const petRequestData = response.data.data[0];
        petRequestData.birthDate = petRequestData.birthDate
          ? dayjs(petRequestData.birthDate)
          : null;
        petRequestData.category = petRequestData.category?.id;

        setPet(petRequestData);
        reset(petRequestData);
      })
      .catch((error) => {
        addSnackbar({ type: "error", message: "Failed to fetch pet" });
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchPetCategories();
    fetchPetById();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ShowPetPageView
      pageTitle={`Edit pet ${pet.name}`}
      petCategories={petCategories}
      handleSubmit={() => {}}
      control={control}
      errors={[]}
      onSubmit={() => {}}
      isShowPage={true}
      isLoading={isLoading}
    />
  );
};

export default ShowPetPage;
