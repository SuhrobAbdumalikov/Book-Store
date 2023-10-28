import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "./components/ui/use-toast.js";
import { useEffect, useState } from "react";
import { instance } from "./utils/useRequest.js";
import Home from "./pages/home.jsx";
import Header from "./components/header.jsx";
import Layout from "./components/layout.jsx";
import SingleProduct from "./pages/single-product.jsx";
import Shop from "./pages/shop.jsx";
import WishList from "./pages/wishlist.jsx";
import Login from "./pages/login.jsx";
import MainCard from "./pages/mainCard.jsx";
import NotFound from "./pages/notFound.jsx";
import ProtectRouter from "./utils/ProtectRouter.jsx";
import Cards from "./pages/cards.jsx";
import SignUp from "./pages/signUp.jsx";
import Order from "./pages/order.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cardItem, setCardItem] = useState([]);
  const [isLogged, setIsLogged] = useState(() =>
    localStorage.getItem("access_token")
  );

  const getData = async () => {
    const data = await instance.get("/user");
    if (data.data?.user) {
      setWishList(data.data?.user?.wishlist);
    }
  };

  const getCardData = async () => {
    const data = await instance.get("/user");
    if (data.data?.user) {
      setCardItem(data.data?.user?.cart);
    }
  };

  const handleLikeBtnClick = async (id) => {
    if (!isLogged) {
      toast({
        variant: "destructive",
        title: "You are not registering yet!",
        description: "Please registering!",
      });
    } else {
      const el = wishList.find((wishItem) => wishItem._id === id);

      if (!el) {
        const product = products.find((arr) => arr._id === id);
        setWishList((prev) => [...prev, product]);
        await instance.patch("/wishlist", {
          productdetails: product,
        });
      } else {
        setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
        await instance.delete("/wishlist/" + id);
      }
    }
  };

  const handleAddCardBtn = async (id) => {
    if (!isLogged) {
      toast({
        variant: "destructive",
        title: "You are not registering yet!",
        description: "Please registering!",
      });
    } else {
      const el = cardItem.find((cards) => cards._id === id);

      if (!el) {
        const product = products.find((arr) => arr._id === id);
        setCardItem((prev) => [...prev, product]);
        await instance.patch("/cart", {
          productdetails: product,
        });
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/products");
      setProducts(data.data?.productsList);
    })();
    getCardData();
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header
          cardItem={cardItem}
          wishList={wishList}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                handleLikeBtnClick={handleLikeBtnClick}
                products={products}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
              />
            }
          />
          <Route
            path="/product/:productID"
            element={
              <SingleProduct
                products={products}
                handleLikeBtnClick={handleLikeBtnClick}
                handleAddCardBtn={handleAddCardBtn}
                isLogged={isLogged}
                wishList={wishList}
              />
            }
          />
          <Route
            path="/signUp"
            element={<SignUp setIsLogged={setIsLogged} />}
          />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectRouter isLogged={isLogged} />}>
            <Route
              element={<WishList handleLikeBtnClick={handleLikeBtnClick} />}
              path="/wishlist"
            />
            <Route path="/cards" element={<MainCard />} />
            <Route element={<Cards />} path="/cart" />
            <Route path="/order" element={<Order />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
