import React from "react"
import { useState } from "react"
import Select from 'react-select'

import {username, password} from "../credentials"

export default function Form() {
    const [allMemes, setAllMemes] = useState([])
    const [aiMemes, setAIMemes] = useState([])
    const [selectedOption, setSelectedOption] = useState({label:"",value:"",key:""});


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

    const options = allMemes.map((meme,index) =>  {
        return {
            value: meme.url + "," + meme.id + "," + meme.box_count, 
            label:meme.name,
            key:index
        }
    })

    const [formData, setFormData] = useState({
        text0: "",
        text1: "",
        text2: "",
        text3: "",
        text4: "",
        randomImage: "https://via.placeholder.com/400x400/282828/FFFFFF?text=Your+meme+will+appear+here",
        imgID: "",
        box: 0
    })

    function updateFormState(url,id,box_count,clearInputs) {
        if (clearInputs) {
            setFormData(prevData => ({
                text0: "",
                text1: "",
                text2: "",
                text3: "",
                text4: "",
                randomImage: url,
                imgID: id,
                box: box_count
            }))
        } else {
            box_count = typeof box_count === "undefined" ? 0 : box_count
            setFormData(prevData => ({
                ...prevData,
                randomImage: url,
                imgID: id,
                box: box_count
            })) 
        }
    }

    function getNewMeme(event) {
        setSelectedOption(null)
        const btnID = event.target.id
        const memeBucket = btnID === "newMemeBtn" ? allMemes : aiMemes
        const randomNumber = Math.floor(Math.random() * memeBucket.length);
        const url = memeBucket[randomNumber].url
        const id = memeBucket[randomNumber].id
        const box_count = memeBucket[randomNumber].box_count
        console.log(url,id,box_count)
        updateFormState(url,id,box_count,true)
    }

    function setMemeText() {
        const params = {
            username:username,
            password:password,
            template_id: formData.imgID,
            "boxes[0][text]": formData.text0,
            "boxes[1][text]": formData.text1,
            "boxes[2][text]": formData.text2,
            "boxes[3][text]": formData.text3,
            "boxes[4][text]": formData.text4
        }
        fetch('https://api.imgflip.com/caption_image?' + new URLSearchParams(params))
        .then(res => res.json())
        .then(data => (
            updateFormState(data.data.url,formData.imgID,formData.box)
        ))
    }

    function handleInputChange(event){
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function btnDisable() {
        if (formData.text0 + formData.text1 + formData.text2 + formData.text3 + formData.text4 === "") {
            return true
        } else {
            return false
        }
    }

    let handleSelectMeme = (event) => {
        setSelectedOption(event)
        const values = event.value.split(",")
        const url = values[0]
        const id =  values[1]
        const box_count = values[2]
        id && updateFormState(url,id,box_count,true)
      }

    return (
        <form>
            <div className="input-group-prepend p-2">
                <Select 
                options={options} 
                placeholder="Select Meme"
                value={selectedOption === null ? null : options[selectedOption.key]}
                className="btn-block" 
                onChange={handleSelectMeme} 
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                      text: '#007bff',
                      primary25: 'black',
                      primary: '#007bff',
                    },
                  })}
                />
                <button type="button" onClick={getNewMeme} id="newMemeBtn" className="btn btn-primary font-weight-bold float-right form-control ml-1">Get random meme</button>
            </div>

            {formData.box >= 1 && <div className="input-group-prepend p-2">
                {formData.box >= 1 && <input type="text" className="form-control mr-1 darkInput" placeholder="Text 1" name="text0" value={formData.text0} onChange={handleInputChange}/>}
                {formData.box >= 2 && <input type="text" className="form-control ml-1 darkInput" placeholder="Text 2" name="text1" value={formData.text1} onChange={handleInputChange}/>}
            </div>}

            {formData.box >= 3 && <div className="input-group-prepend p-2">
                {formData.box >= 3 && <input type="text" className="form-control mr-1 darkInput" placeholder="Text 3" name="text2" value={formData.text2} onChange={handleInputChange}/>}
                {formData.box >= 4 && <input type="text" className="form-control ml-1 darkInput" placeholder="Text 4" name="text3" value={formData.text3} onChange={handleInputChange}/>}
            </div>}
            
            <div className="input-group-prepend p-2">
                {formData.box >= 5 && <input type="text" className="form-control mr-1 darkInput" placeholder="Text 5" name="text4" value={formData.text4} onChange={handleInputChange}/>}
                {formData.box !== 0 && formData.imgID && <button type="button" onClick={setMemeText} id="memeTextBtn" className="btn btn-outline-success font-weight-bold form-control mr-1" disabled={btnDisable()}>
                    Put text on meme
                </button>}
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

