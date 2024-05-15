import { RxCross2 } from "react-icons/rx";
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
function App() {
  const [fromText, setFromText] = useState("");
  const [language, setLanguage] = useState([]);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("ur");
  const [toText, setToText] = useState("");
  const [isTranslated, setTranslated] = useState(true);
  const notify = () => toast.success("Copied");

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://libretranslate.com/languages")
        .then((res) => res.json())
        .then((result) => {
          setLanguage(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const translateText = () => {
    setTranslated(false);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText} &langpair=${fromLang.toLocaleLowerCase()}|${toLang} `;
    console.log(fromLang);
    const fetchData = async () => {
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setToText(data.responseData.translatedText);
        });
      // setTranslated(true);
    };
    fetchData();
  };
  const handlerCopy = () => {
    navigator.clipboard.writeText(toText);

    notify();
  };
  const deleteHandler = () => {
    setFromText("");
    setTranslated(true);
    setToText("");
  };
  return (
    <>
      <div className="container">
        <h4>MAX ALLOWED QUERY : 500 CHARS</h4>
        <div className="wrapper">
          <div className="text-input">
            <div className="text">
              <textarea
                spellCheck="false"
                className="from-text"
                placeholder="Enter text"
                value={fromText}
                onInput={(e) => setFromText(e.target.value)}
              ></textarea>

              <RxCross2 className="icon icn" onClick={deleteHandler} />
            </div>
            <div className="text">
              <textarea
                spellCheck="false"
                value={toText}
                className="to-text"
                placeholder={isTranslated ? "Translate" : "Translating..."}
              ></textarea>
              <button className="icon icn" onClick={handlerCopy}>
                <IoIosCopy />
              </button>
            </div>
          </div>
          <ul className="controls">
            <li className="row from">
              <select
                onChange={(e) => setFromLang(e.target.value)}
                value={fromLang}
              >
                {language &&
                  language.map((lang, i) => (
                    <option key={i} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
              </select>
            </li>
            <li className="exchange">
              <FaExchangeAlt className="icon" />
            </li>
            <li className="row to">
              <select
                onChange={(e) => setToLang(e.target.value)}
                value={toLang}
              >
                {language &&
                  language.map((lang, i) => (
                    <option key={i} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
              </select>
            </li>
          </ul>
        </div>
        <button className="btn" onClick={translateText}>
          Translate Text
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
