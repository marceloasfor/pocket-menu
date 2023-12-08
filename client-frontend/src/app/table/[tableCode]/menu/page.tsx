"use client"

import React, { use, useState, useEffect } from 'react';
import Cookies from "js-cookie";

import { getAllMenuItems } from "@/app/actions";
import Menu from "@/components/Menu/Items";
import Categories from "@/components/Menu/Categories";


export default function Page() {
  const [menuItems, setMenuItems] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allCategories, setAllCategories] = useState<any>([]);

  const restaurant = Cookies.get("restaurant") || "";
  const token = Cookies.get("token") || "";

  useEffect(() => {
    const getItems = async () => {
      const res = await getAllMenuItems(restaurant);

      const { error } = res;
      if (error) {
        console.log(token);
        console.log(error);
      }

      const menuItemsRes = res;
      setMenuItems(menuItemsRes);
      setAllMenuItems(menuItemsRes);
      setAllCategories(['tudo', ...Array.from(new Set(menuItemsRes.map((item: any) => item.category.name)))]);
    }
    getItems();

    return () => {}
  }, []);

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category: any) => {
    if(category =='tudo'){
      setMenuItems(allMenuItems);
      return;
    }
    const newItems = allMenuItems.filter((item: any) => item.category.name === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="max-w-screen-xl mx-auto px-6">
        <Categories categories={allCategories} filterItems={filterItems} />
        <Menu items={menuItems} token={token} />
      </section>
    </main>
  );
}