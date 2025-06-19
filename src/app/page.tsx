"use client";
import Button from "@/components/(custom)/Button";
import { X } from "lucide-react";
import React, { FormEvent, useState } from "react";
type InputType = {
  name: string;
  description: string;
};
type InputElementType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

const Home = () => {
  const [inputValue, setInputValue] = useState<InputType>({
    name: "",
    description: "",
  });
  const [items, setItems] = useState<InputType[]>([]);
  const handleOnChange = (e: InputElementType) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  console.log(items);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, inputValue]);
    setInputValue({ name: "", description: "" });
  };
  const handleDelete = (idToDelete: number) => {
    const filtered = items.filter((_, itemId) => itemId !== idToDelete);
    setItems(filtered);
  };
  return (
    <div className="mt-20">
      <form onSubmit={handleOnSubmit} className="w-96 mx-auto space-y-4">
        <input
          onChange={handleOnChange}
          value={inputValue.name}
          type="text"
          name="name"
          placeholder="Product"
          className="border px-3 py-2 w-full outline-0 rounded border-gray-400 text-sm"
        />
        <textarea
          onChange={handleOnChange}
          value={inputValue.description}
          name="description"
          placeholder="Discripsion"
          className="border px-3 py-2 w-full outline-0 rounded border-gray-400 resize-none text-sm"
        />
        <Button className="w-full">Add</Button>
      </form>
      <div>
        {items?.map((item, itemId) => (
          <div
            key={itemId}
            className="flex flex-col justify-center  items-center  mt-20"
          >
            <p>ID: {itemId + 1}</p>
            <p>Name: {item.name}</p>
            <p>Descripsion: {item.description}</p>
            <X onClick={() => handleDelete(itemId)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
