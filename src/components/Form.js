import React from "react"
import { useState } from "react"

import {username, password} from "../credentials"

export default function Form() {
    const [allMemes, setAllMemes] = useState([])
    const [aiMemes, setAIMemes] = useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
        async function getAIMemes() {
            const res = await fetch("https://memescraper.rittikbasu.repl.co/aimemes")
            const data = await res.json()
            const parsedData = JSON.parse(data)
            setAIMemes(parsedData.memes)
        }
        getMemes()
        getAIMemes()

    }, [])

    const [formData, setFormData] = useState({
        topText: "",
        bottomText: "",
        randomImage: "",
        imgID: ""
    })

    function updateFormState(url,id) {
        setFormData(prevData => ({
            ...prevData,
            randomImage: url,
            imgID: id
        }))
    }

    function getNewMeme(event) {
        document.querySelector(".custom-dropdown").selectedIndex = 0;
        const btnID = event.target.id
        const memeBucket = btnID === "newMemeBtn" ? allMemes : aiMemes
        const randomNumber = Math.floor(Math.random() * memeBucket.length);
        const url = memeBucket[randomNumber].url
        const id = memeBucket[randomNumber].id
        console.log(url,id)
        updateFormState(url,id)
    }

    function setMemeText() {
        const params = {
            username:username,
            password:password,
            template_id: formData.imgID,
            text0: formData.topText,
            text1: formData.bottomText
        }
        fetch('https://api.imgflip.com/caption_image?' + new URLSearchParams(params))
        .then(res => res.json())
        .then(data => (
            updateFormState(data.data.url,formData.imgID)
        ))
    }

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function btnDisable() {
        if (!formData.imgID) {
            return true
        }
        if (formData.topText + formData.bottomText === "") {
            return true
        } else {
            return false
        }
    }

    let handleMemeChange = (event) => {
        const values = event.target.value.split(",")
        const url = values[0]
        const id =  values[1]
        id && updateFormState(url,id)
        console.log(event.target.value.split(","))
      }

    return (
        <form>
            <div className="input-group-prepend p-2">
                <select onChange={handleMemeChange} className="custom-dropdown btn btn-block"> 
                    <option value="" className="text-muted">Select a meme</option>
                    {allMemes.map((meme) => <option key={meme.url} value={[meme.url, meme.id]} className="text-dark">{meme.name}</option>)}
                </select>
                <button type="button" onClick={getNewMeme} id="newMemeBtn" className="btn btn-primary font-weight-bold float-right form-control ml-1">Get random meme</button>
            </div>

            <div className="input-group-prepend p-2">
                <input type="text" className="form-control mr-1" placeholder="Top text" name="topText" value={formData.topText} onChange={handleChange}/>
                <input type="text" className="form-control ml-1" placeholder="Bottom text" name="bottomText" value={formData.bottomText} onChange={handleChange}/>
            </div>
            
            <div className="p-2">
                <button type="button" onClick={setMemeText} id="memeTextBtn" className="btn btn-outline-primary font-weight-bold form-control mr-1" disabled={btnDisable()}>
                    Put text on meme
                </button>
            </div>

            <div className="text-center p-3">
                <div className="meme">
                    <img className="meme-image" src={formData.randomImage} alt="" />
                </div>
            </div>

            <div className="p-2 pb-4">
                {formData.randomImage && <button type="button" onClick={getNewMeme} id="aiMemeBtn" className="btn btn-block btn-dark">Get AI generated meme</button>}
            </div>

        </form>
    )
}

