import { FaCopy } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaExchangeAlt } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [fromText, setFromText] = useState("");
  const [language, setLanguage] = useState([]);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("ur");
  const [toText, setToText] = useState("");
  const [translate, setTranslate] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://libretranslate.com/languages")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setLanguage(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const translateText = () => {
    setTranslate(true);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText} World!&langpair=${fromLang.toLocaleLowerCase()}|${toLang} `;
    console.log(fromLang);
    const fetchData = async () => {
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setToText(data.responseData.translatedText);
        });
      setTranslate(false);
    };
    fetchData();
  };
  const handlerCopy = () => {
    navigator.clipboard.writeText(toText);
    alert(toText);
  };
  const inputHandler = () => {
    setFromText("");
    setTranslate(true);
    setToText("");
  };
  return (
    <>
      <div className="container">
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

              <ImCross className="icon icn" onClick={inputHandler} />
            </div>
            <div className="text">
              <textarea
                spellCheck="false"
                value={toText}
                className="to-text"
                placeholder={translate ? "Translate" : "Translating..."}
              ></textarea>
              <FaCopy className="icon icn" onClick={handlerCopy} />
            </div>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons"></div>
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
        <button onClick={translateText}>Translate Text</button>
      </div>
    </>
  );
}

export default App;
