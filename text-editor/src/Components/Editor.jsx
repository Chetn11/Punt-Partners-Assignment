import React, { useEffect, useState } from 'react'
import SelectFont from './SelectFont'
import fontsData from "../fonts.json"

function Editor() {
    const [text, setText] = useState('');
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontWeight, setFontWeight] = useState(400);
    const [isItalic, setIsItalic] = useState(false);
    const [fonts, setFonts] = useState([]);



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
    </div>
  )
}

export default Editor