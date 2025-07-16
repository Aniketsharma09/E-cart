import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/productActions";
import { toast } from "react-toastify";



const CreateProduct = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const createProductHandler = (product) => {
    product.id = nanoid();
    console.log(product);
    dispatch(asyncCreateProduct(product));
    toast.success("Product is created successfully!")
    reset();
    navigate("/");
  };

  return (
    <div className="bg-[var(--border)] h-[92%] w-full">
      <h1 className="createProductHeading pt-10 text-center text-3xl font-bold tracking-wider text-[var(--text-h)]">
        Enter Product Detail's
      </h1>
      <form
        onSubmit={handleSubmit(createProductHandler)}
        className="createProductForm mt-7 px-10 py-4 rounded-xl flex flex-col gap-7"
      >
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product Title :-
          </h3>
          <input
            {...register("title")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product title"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product Price :-
          </h3>
          <input
            {...register("price")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product price in $"
          />
        </div>
        <div className="inputDiv flex w-full  justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product Description :-
          </h3>
          <textarea
            {...register("description")}
            className="w-[73%] h-30 px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product description "
          ></textarea>
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product Category :-
          </h3>
          <input
            {...register("category")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product category"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product 1st Image URL :-
          </h3>
          <input
            {...register("images[0]")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product image url"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product 2nd Image URL :-
          </h3>
          <input
            {...register("images[1]")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product image url"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product 3rd Image URL :-
          </h3>
          <input
            {...register("images[2]")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product image url"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product 4th Image URL :-
          </h3>
          <input
            {...register("images[3]")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product image url"
          />
        </div>
        <div className="inputDiv flex w-full items-center justify-between">
          <h3 className=" w-[30%] text-2xl font-bold tracking-wider text-[var(--text-h)]">
            Product 5th Image URL :-
          </h3>
          <input
            {...register("images[4]")}
            className="w-[73%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
            type="text"
            placeholder="Enter product image url"
          />
        </div>

        <button className="bg-[var(--btn)] p-3 flex iteam-center  justify-center rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4 cursor-pointer">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
