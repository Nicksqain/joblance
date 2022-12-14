import { ThreeDots } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./button.scss";

const Button = ({ handleSubmit, name = "", email, password, loading }) => {
  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="main-btn"
      disabled={(name && !name) || !email || email < 6 || password.length < 6}
    >
      {loading ? (
        <ThreeDots
          height="25"
          width="25"
          color="#0b5ed7"
          ariaLabel="rotating-square-loading"
          strokeWidth="6"
          wrapperStyle={{ position: "absolute", right: "-40px" }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        void 0
      )}
      <span>Submit</span>
    </button>
  );
};

export default Button;
