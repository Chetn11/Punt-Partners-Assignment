import React, { useEffect, useState } from "react";
import SelectFont from "./SelectFont";
import fontsData from "../fonts.json";
import SelectFontWeight from "./SelectFontWeight";

function Editor() {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontWeight, setFontWeight] = useState(400);
  const [isItalic, setIsItalic] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [autoSaveMessage, setAutoSaveMessage] = useState(false);

  const handleItalicChange = (e) => {
    setIsItalic(e.target.checked);
  };

  const canToggleItalic = fonts.some(
    (variant) => variant.weight === fontWeight && variant.style === "italic"
  );

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const savedText = localStorage.getItem('text') || '';
    const savedFontFamily = localStorage.getItem('fontFamily') || 'Roboto';
    const savedFontWeight = localStorage.getItem('fontWeight') || 400;
    const savedIsItalic = localStorage.getItem('isItalic') === 'true';

    setText(savedText);
    setFontFamily(savedFontFamily);
    setFontWeight(Number(savedFontWeight));
    setIsItalic(savedIsItalic);
  }, []);

  useEffect(() => {
    if (fontsData[fontFamily]) {
      setFonts(fontsData[fontFamily].variants);
      fontsData[fontFamily].urls.forEach((url) => {
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      });
    }
  }, [fontFamily]);

  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem('text', text);
      localStorage.setItem('fontFamily', fontFamily);
      localStorage.setItem('fontWeight', fontWeight);
      localStorage.setItem('isItalic', isItalic);
      setAutoSaveMessage(true);
      setTimeout(() => setAutoSaveMessage(false), 2000); 
    };

    const handleSaveDebounced = () => {
      const handler = setTimeout(() => {
        saveToLocalStorage();
      }, 4000);

      return () => {
        clearTimeout(handler);
      };
    };

    const cleanup = handleSaveDebounced();
    return cleanup;
  }, [text, fontFamily, fontWeight, isItalic]);

  const handleSave = () => {
    localStorage.setItem('text', text);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontWeight', fontWeight);
    localStorage.setItem('isItalic', isItalic);
    alert('Your content is Saved!');
  };

  const handleReset = () => {
    setText('');
    setFontFamily('Roboto');
    setFontWeight(400);
    setIsItalic(false);
    localStorage.removeItem('text');
    localStorage.removeItem('fontFamily');
    localStorage.removeItem('fontWeight');
    localStorage.removeItem('isItalic');
    alert('Settings reset!');
  };

  return (
    <div className="App">
      <div style={{display:"flex", gap:"30px"}}>
        <div style={{display:"flex"}}>
          <label>FontFamily: </label>
          <SelectFont
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            data={Object.keys(fontsData)}
          />
        </div>
        <div style={{display:"flex"}}>
          <label>FontWeight: </label>
          <SelectFontWeight
            fontWeight={fontWeight}
            fonts={fonts}
            setFontWeight={setFontWeight}
            isItalic={isItalic}
            setIsItalic={setIsItalic}
          />
        </div>
        <div>
          <label>
            Italic
            <input
              type="checkbox"
              checked={isItalic}
              onChange={handleItalicChange}
              disabled={!canToggleItalic}
            />
          </label>
        </div>
      </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          fontStyle: isItalic ? "italic" : "normal",
          width: "100%",
          height: "300px",
          padding: "10px",
        }}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
      {autoSaveMessage && <div>Auto save</div>}
    </div>
  );
}

export default Editor;
