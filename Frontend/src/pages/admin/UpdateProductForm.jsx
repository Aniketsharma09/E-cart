import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {asyncUpdateProduct} from "../../store/productActions";
import { useEffect } from "react";
import { toast } from "react-toastify";


const UpdateProductForm = ({ product, productId, onDelete }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  // Set form defaults
  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        images: product.images || ["", "", "", "", ""],
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    dispatch(asyncUpdateProduct(productId, data));
    toast.success("product updated successfully !")
  };

  return (
    <div className="updateProductDetailDiv mt-10 px-10">
      <h1 className="text-center text-3xl font-bold tracking-wider text-[var(--text-h)]">
        Update Product Detail's
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="updateProductForm mt-7 py-4 rounded-xl flex flex-col gap-7"
      >
        <FormRow label="Product Title" register={register("title")} />
        <FormRow label="Product Price" register={register("price")} />
        <FormRowTextarea
          label="Product Description"
          register={register("description")}
        />
        <FormRow label="Product Category" register={register("category")} />    
        <FormImageRow label="Product 1st Image URL" register={register("images[0]")} />
        <FormImageRow label="Product 2nd Image URL" register={register("images[1]")} />
        <FormImageRow label="Product 3rd Image URL" register={register("images[2]")} />
        <FormImageRow label="Product 4th Image URL" register={register("images[3]")} />
        <FormImageRow label="Product 5th Image URL" register={register("images[4]")} />

        <div id="updateBtnDiv" className=" w-full flex items-center justify-between">
          <button
            onClick={onDelete}
            type="button"
            className="w-[49%] bg-red-300 p-3 rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4"
          >
            Delete Product
          </button>
          <button
            type="submit"
            className="w-[49%] bg-[var(--btn)] p-3 rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

const FormRow = ({ label, register }) => (
  <div className="flex w-full items-center justify-between">
    <h3 className="w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
      {label} :-
    </h3>
    <input
      {...register}
      className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
      type="text"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const FormRowTextarea = ({ label, register }) => (
  <div className="flex w-full justify-between">
    <h3 className="w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
      {label} :-
    </h3>
    <textarea
      {...register}
      className="w-[73%] h-30 px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
      placeholder={`Enter ${label.toLowerCase()}`}
    ></textarea>
  </div>
);

const FormImageRow = ({ label, register }) => (
  <div className="flex w-full items-center justify-between">
    <h3 className="w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
      {label} :-
    </h3>
    <input
      {...register}
      className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
      type="text"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default UpdateProductForm;
