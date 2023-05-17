import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { GlobalState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import {
  createUser,
  emptyUsersReducer,
  fetchAllUsers,
  updateUserReducer,
  updateOneUser,
  sortByEmail,
} from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  createProduct,
  fetchAllProducts,
} from "../redux/reducers/productsReducer";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { User } from "../types/User";

import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import { addOneFav, removeFromFav } from "../redux/reducers/favReducer";

const getFilteredList = (users: User[], search: string) => {
  return users.filter(user => user.name.toLowerCase().includes(search.toLocaleLowerCase()))
}

const HomePage = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");
  const isLoginPage = location.pathname === "/login";
  const hideProductList = useLocation();
  const users = useAppSelector((state) => state.usersReducer.users);
  const filterUsers = getFilteredList(users, search);

  const { toggle, isOpen } = useModal();
  const favIds = useAppSelector((state) => state.favReducer)
  const favList = users.filter(users => favIds.includes(users.id) )
 
  //This wont work: const [filterUsers, setFilterUsers] = useState<User[]>([]);
  // const globalState = useSelector(state => state);
  // console.log("globalState", globalState);

  //const users = useSelector((state:GlobalState) => state.usersReducer);

  console.log("users", users);
  const dispatch = useAppDispatch();
  const addUser = () => {
    // const result = createUser({});
    // console.log(result);
    dispatch(
      createUser({
        id: 211,
        name: "test",
        avatar: "test",
        password: "test",
        email: "test",
        role: "customer",
      })
    );
  };

  const products = useAppSelector((state) => state.productsReducer);
  console.log("products", products);
  const addProduct = () =>
    dispatch(
      createProduct({
        id: 211,
        title: "test",
        price: 100,
        description: "test",
        category: {
          id: 1,
          name: "test",
          image: "test",
        },
        images: ["string, string, string"],
      })
    );

  useEffect(() => {
    dispatch(fetchAllUsers());
 
    //dispatch(fetchAllProducts());
  }, []);

  const deletaAllUsers = () => {
    dispatch(emptyUsersReducer());
  };

  const updateUser = () => {
    dispatch(
      updateOneUser({
        id: 1,
        update: {
          email: "alia@mail.com",
          password: "alia",
          role: "customer",
          name: "alia",
          avatar: "",
        },
      })
    );
  };

  const sortUsers = () => {
    dispatch(sortByEmail(sort));
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const onSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    //setFilterUsers(users => users.filter(user => user.name.includes(search)));
  };

  //Only example not recomended, dont fecth inside the component, should be done inside redux
  //Ans also not reusable and It is hard to test
  //  useEffect(() => {
  //    fetch("https://api.escuelajs.co/api/v1/products")
  //      .then(response => response.json())
  //      .then(response => dispatch(getProductList(response)))
  //  }, []);

  // show product list on homepage
 


const addTofav = (id: number) => {
  if (favIds.includes(id)) {
    dispatch(removeFromFav(id))} else {

    dispatch(addOneFav(id))
}
}





  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link>
          <Link to="/products/:id">Products</Link>
          <Link to="/productslist">Products List</Link>
          <button onClick={toggle}>Open Modal</button>
        <Modal isOpen={isOpen} toggle={toggle}>
          <p>Modal Content</p>
          <button onClick={toggle}>Close Modal</button>
        </Modal>
        </nav>
      </header>
      <main>
        {!isProductsPage && !isLoginPage && (
          <div>
           
              {" "}
              {filterUsers.map((user) => (
                <div>
                <p key={user.id}>{user.name}</p> 
                <button onClick={() => (addTofav(user.id))} 
              >Add Fav</button>
                </div>
              ))}
             
          <div> FavLis
            {favList.map((user) => (
                
                <p key={user.id}>{user.name}</p>
              ))}


             </div> 

            {/* <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul> */}
      
            <GoogleLoginBtn />
            <button onClick={addUser}>Create new user</button>
            <button onClick={addProduct}>Create new product</button>
            <button onClick={deletaAllUsers}>Empty User array</button>
            <button onClick={updateUser}>Update user</button>
            <button onClick={sortUsers}>Sort by email</button>
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search"
              onChange={onSerachChange}
            />

            <p>
              What ever I put here will be shown only in home page and Cart{" "}
            </p>
          </div>
        )}

        <Outlet />
      </main>
      S
    </div>
  );
};

export default HomePage;
