import React, {
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Quantity, AddToCart } from "../reducers/reduxSlices";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";

const IndividualProduct = () => {
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "Increment":
        return state + 1;
      case "Decrement":
        return state - 1;
      default:
        throw new Error();
    }
  };

  let [reducerQuantity, dispatch] = useReducer(reducer, 1);
  let [isReviewVisible, setIsReviewVisible] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [review, setReview] = useState("");
  let [rating, setRating] = useState(0);
  let { title } = useParams();

  let heading = "";
  if (rating > 0) {
    const noun = rating > 1 ? "stars" : "star";
    heading = rating + "  " + noun;
  }

  let reduxDispatch = useDispatch();

  let { mySingleProduct } = useSelector((state) => state.myStore);
  let { category, images, description, price, id } = mySingleProduct;
  let [mainImg, setMainImg] = useState(images[0]);
  let [reviewDate, setReviewDate] = useState("");
  let [displayReview, setDisplayReview] = useState([]);
  let [isReviewAdded, setIsReviewAdded] = useState(false);

  let [reviewForm, setReviewForm] = useState({
    productId: "",
    review: "",
    reviewerName: "",
    reviewerEmail: "",
    rating: 0,
    date: "",
  });

  // useEffect(() => {
  //   const persistedCart = JSON.parse(localStorage.getItem("cart"));
  //   const persistedQuantity = JSON.parse(localStorage.getItem("quantity"));
  //   if (persistedCart || persistedQuantity) {
  //     reduxDispatch(AddToCart(persistedCart));
  //     reduxDispatch(Quantity(persistedQuantity));
  //   }
  // }, [reduxDispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((d) => setDisplayReview(d.data))
      .catch((e) => console.log(e));
  }, [isReviewAdded]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((d) => setDisplayReview(d.data))
      .catch((e) => console.log(e));
  }, []);

  let filteredReviews = displayReview.filter((allReviews, i) => {
    return allReviews.productId === id;
  });

  let handleStarClick = (selectedRating) => {
    if (selectedRating === rating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
    setReviewForm({
      ...reviewForm,
      rating: selectedRating,
      date: reviewDate,
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    setReviewDate(`${day}/${month}/${year}`);
  }, [reviewDate]);

  let submitReviewClick = () => {
    const newReview = {
      productId: id,
      review: review,
      reviewerName: name,
      reviewerEmail: email,
      rating: rating,
      date: reviewDate,
    };

    setIsReviewAdded(true);
    setReviewForm({ newReview, ...reviewForm });
    axios
      .post("http://localhost:3000/reviews", newReview)
      .then((d) => console.log(d))
      .catch((e) => console.log(e));

    setName(" ");
    setEmail(" ");
    setReview(" ");
    setIsReviewAdded(false);
  };

  let handleCartClick = (id, mySingleProduct) => {
    let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cartStorage);
    cartStorage.push(mySingleProduct);
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    reduxDispatch(AddToCart(mySingleProduct));
    localStorage.setItem("quantity", JSON.stringify(reducerQuantity));
    reduxDispatch(Quantity(reducerQuantity));
    navigate("/cart");
  };

  return (
    <div className="singleProductContainer">
      <div className="singleProductDiv">
        <div className="singleProductImages">
          <div className="mainImgDiv">
            <img src={mainImg} alt={title} />
          </div>
          <div className="extraImgDiv">
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  className="extraImg"
                  onClick={() => setMainImg(img)}
                >
                  <img src={img} alt="id" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="singleProductDetails">
          <h1>{title}</h1>
          <h2>$ {price}</h2>
          <h3>{description} hi</h3>
          <div className="cartDiv">
            <div className="quantityDiv">
              <button
                className="decrement"
                onClick={() => {
                  if (reducerQuantity > 1) {
                    dispatch({ type: "Decrement" });
                  }
                }}
              >
                -
              </button>
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={reducerQuantity}
                readOnly
              />
              <button
                className="increment"
                onClick={() => dispatch({ type: "Increment" })}
              >
                +
              </button>
            </div>
            <button
              className="addToCart"
              onClick={() => handleCartClick(id, mySingleProduct)}
            >
              ADD TO CART
            </button>
          </div>
          <p className="categoryName">
            Category: <span>{category.name}</span>
          </p>
          <div className="shippingDetails">
            <p>Free shipping on orders over $50!</p>
            <div className="shippingDetailsList">
              <p>
                <FaCheckCircle /> No-Risk Money Back Guarantee!
              </p>
              <p>
                <FaCheckCircle /> No Hassle Refunds
              </p>
              <p>
                <FaCheckCircle /> Secure Payments
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="partition"></div>
      <div className="reviewsDiv">
        <p
          onClick={() => {
            setIsReviewVisible((prev) => !prev);
          }}
        >
          Reviews <sup>({filteredReviews.length})</sup>
        </p>
        {isReviewVisible ? (
          <>
            <div className="displayReviewSection">
              {filteredReviews.map((v, i) => {
                let { reviewerName, rating, review, date } = v;
                // console.log(rating);
                return (
                  <div className="displayReviewDiv" key={i}>
                    <div className="reviewNameDiv">
                      <h3 className="reviewerName">{reviewerName}</h3>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          columnGap: "2px",
                        }}
                      >
                        ({rating}
                        <FaStar style={{ color: "#FCCB04" }} />)
                        {/* ({heading}) */}
                      </span>
                      <p className="reviewDate">{date}</p>
                    </div>
                    <div className="reviewDiv">
                      <p>{review}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="reviewFormDiv">
              <div className="starRatings">
                <p>Your rating</p>
                <p>
                  {[1, 2, 3, 4, 5].map((i) => {
                    return (
                      <span key={i} onClick={() => handleStarClick(i)}>
                        {i <= rating ? (
                          <FaStar style={{ color: "#FCCB04" }} />
                        ) : (
                          <FaRegStar style={{ color: "#FCCB04" }} />
                        )}
                      </span>
                    );
                  })}
                </p>
              </div>

              <div className="reviewBox">
                <p>Your review</p>
                <textarea
                  name="review"
                  id="reviewArea"
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="name_review">
                <div>
                  <p>Name</p>
                  <input
                    type="text"
                    name="reviewerName"
                    id="reviewName"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    type="email"
                    name="reviewerEmail"
                    id="reviewEmail"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button className="reviewBtn" onClick={submitReviewClick}>
                Submit
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default IndividualProduct;
