"use client"

import React, { use, useState, useEffect } from 'react';
import Cookies from "js-cookie";

import { getAllMenuItems } from "@/app/actions";
import Menu from "@/components/Menu/Items";
import Categories from "@/components/Menu/Categories";
import { useSelector } from 'react-redux';

export default function Page() {
  const [menuItems, setMenuItems] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const verificationCode = Cookies.get("verification_code") || "";
  const restaurant = Cookies.get("restaurant") || "";
  const token = Cookies.get("token") || "";

  const cart = useSelector((state) => state.cart)

  const getTotalQuantity = () => {
    let total = 0
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }

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
      setAllCategories(['all', ...new Set(menuItemsRes.map(item => item.category.name))]);
    }
    getItems();

    return () => {}
  }, []);
  
  
  const [categories, setCategories] = useState(allCategories);

  const filterItems = category => {
    if(category =='all'){
      setMenuItems(allMenuItems);
      return;
    }
    const newItems = allMenuItems.filter((item) => item.category.name === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <p>{getTotalQuantity() || 0}</p>
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <Categories categories={allCategories} filterItems={filterItems} />
        <Menu items={menuItems} token={token} />
      </section>
    </main>
  );
}