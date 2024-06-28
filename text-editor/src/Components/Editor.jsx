import React, { useEffect, useState } from 'react'
import SelectFont from './SelectFont'
import fontsData from "../fonts.json"
import SelectFontWeight from './SelectFontWeight';

function Editor() {
    const [text, setText] = useState('');
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontWeight, setFontWeight] = useState(400);
    const [isItalic, setIsItalic] = useState(false);
    const [fonts, setFonts] = useState([]);


    const handleItalicChange = (e) => {
        setIsItalic(e.target.checked);
      };
    
      const canToggleItalic = fonts.some(
        variant => variant.weight === fontWeight && variant.style === 'italic'
      );


      const handleTextChange = (e) => {
        setText(e.target.value);
      };
//    console.log(fontsData);
    useEffect(()=>{
        if(fontsData[fontFamily]){
            setFonts(fontsData[fontFamily].variants);
            fontsData[fontFamily].urls.forEach((url)=>{
                const link=document.createElement("link");
                link.href=url;
                link.rel="stylesheet";
                document.head.appendChild(link);
            })
        }
    },[fontFamily])
  return (
    <div className='App'>
        <SelectFont
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        data={Object.keys(fontsData)}
        />
        <SelectFontWeight
        fontWeight={fontWeight}
        fonts={fonts}   
        setFontWeight={setFontWeight}
        isItalic={isItalic}
        setIsItalic={setIsItalic}/>
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
        <textarea
      value={text}
      onChange={handleTextChange}
      style={{
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: isItalic ? 'italic' : 'normal',
        width: '100%',
        height: '300px',
        padding: '10px'
      }}
    />
    <button >Save</button>
    <button >Reset</button>
    </div>
  )
}

export default Editor