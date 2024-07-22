import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { usePetsPageContext } from "@/app/pets/context/petsPageContext";
import { ptBR } from "@mui/x-data-grid/locales";
import CheckboxDataGridPets from "@/app/pets/components/DataGridPets/CheckboxDataGridPets";
import AvatarDataGridPets from "@/app/pets/components/DataGridPets/AvatarDataGridPets";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

const DataGridPets = () => {
  const { isLoading, pets } = usePetsPageContext();
  const { push } = useRouter();

  const { data, pagination } = pets || {
    data: [],
    pagination: {
      totalPages: 0,
      totalElements: 0,
    },
  };

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "photo",
      headerName: "Foto",
      width: 100,
      renderCell: (params) => <AvatarDataGridPets row={params.row} />,
    },
    {
      type: "string",
      field: "name",
      headerName: "Nome",
      width: 150,
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 150,
      flex: 1,
      type: "string",
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 130,
      type: "string",
      valueGetter: (value) => {
        return value?.name || "";
      },
    },
    {
      field: "birthDate",
      headerName: "Data de nascimento",
      width: 250,
      type: "string",
      valueFormatter: (params) => {
        if (!params) return "";
        return new Date(params).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      field: "age",
      headerName: "Idade",
      width: 80,
      type: "number",
      headerAlign: "left",
      align: "left",
      valueGetter: (value, row) => {
        const { birthDate } = row;
        if (!birthDate) return "";
        const birthDateFormatted = `${birthDate[2]}-${birthDate[1]}-${birthDate[0]}`;
        const birthDateObj = new Date(birthDateFormatted);
        const now = new Date();
        const diff = now - birthDateObj;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },
    },
    {
      field: "status",
      headerName: "Adotado",
      width: 100,
      renderCell: (params) => {
        return <CheckboxDataGridPets row={params.row} />;
      },
    },
    {
      type: "actions",
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      align: "center",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          label="Editar"
          icon={<EditIcon />}
          onClick={() => push(`/pets/${params.id}`)}
        />,
      ],
    },
  ];

  return (
    <div
      style={{
        height: "400px",
      }}
    >
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rowSelection={false}
        columns={columns}
        rows={data}
        rowCount={pagination.totalElements}
        loading={isLoading}
        paginationMode="server"
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default DataGridPets;
