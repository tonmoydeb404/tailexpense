"use client";

import { RHFComboField } from "~/components/common/rhf";
import { useCategories } from "~/db/hooks";

const CategoryField = () => {
  const { data } = useCategories();

  return (
    <RHFComboField
      name="category"
      placeholder="Select Category"
      label="Category"
      options={
        data?.map((category) => ({
          value: category._id,
          label: category.name,
        })) || []
      }
      queryPlaceholder="Search Categories"
      emptyPlaceholder="No Categories Found"
    />
  );
};

export default CategoryField;
