import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { fetchCocktailDetails } from "../app/features/detailsSlice";
import { AboutIngredient, Title, Modal } from "../components";
import { CocktailInfo, Instructions, VideoTutorial } from "../containers";
import { hideIngredientModal } from "../app/features/modalSlice";
import AnimateRoute from "../containers/layout/AnimateRoute";

const CocktailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cocktail = useSelector((state) => state.details.cocktail);
  const loading = useSelector((state) => state.details.loading);
  const error = useSelector((state) => state.details.error);
  const { id } = useParams();

  const showModal = useSelector((state) => state.modal.showIngredientModal);

  useTitle(`${cocktail?.drink || "Loading"} | Cocktails`, loading);

  const onCloseModal = () => {
    dispatch(hideIngredientModal());
  };

  useEffect(() => {
    const promise = dispatch(fetchCocktailDetails(id));

    return () => {
      promise.abort();
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (loading === "rejected" && error === "Cocktail not found") {
      navigate("/error"); // Redirect to 404 page if cocktail not found
    }
  }, [loading, error, navigate]);

  return (
    <AnimateRoute>
      {loading === "pending" && (
        <div className="w-full flex justify-center items-center">
          <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            Loading...
          </p>
        </div>
      )}
      {loading === "fulfilled" && cocktail && (
        <>
          <CocktailInfo cocktail={cocktail} loading={loading} />
          <Title title="Instructions" />
          <Instructions cocktail={cocktail} loading={loading} />
          <Title title="Video Guide" />
          <VideoTutorial cocktail={cocktail} loading={loading} />
          <Modal onCloseModal={onCloseModal} show={showModal}>
            <AboutIngredient />
          </Modal>
        </>
      )}
    </AnimateRoute>
  );
};

export default CocktailPage;
