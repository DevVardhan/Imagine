import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'
// import { response } from 'express'

const CreatePost = () => {
    const navigate = useNavigate()
    const [generatingImg, setgeneratingImg] = useState(false)
    const [form, setform] = useState({
        name: '',
        prompt: '',
        photo: ''
    })
    const [Loading, setLoading] = useState(false)

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setgeneratingImg(true)
                const response = await fetch('http://localhost:5050/api/v1/hface', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: form.prompt })
                })
                const data = await response.json()
                console.log(data); // Check if photo is defined
                setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
            } catch (error) {
                alert(error)
            } finally {
                setgeneratingImg(false)
            }
        } else {
            alert('Enter a valid prompt')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.prompt && form.photo) {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:5050/api/v1/post", {
                    method: 'POST',
                    headers: {
                        'Content-Tyoe': ' application/json',
                    },
                    body: JSON.stringify(form)
                })
                await response.json()
                navigate('/')
            } catch (error) {
                alert(err)

            } finally {
                setLoading(false)
            }
        } else {
            alert('Enter a valid prompt to generate image')
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPromt = getRandomPrompt(form.prompt);
        setform({ ...form, prompt: randomPromt })
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className=' font-extrabold text-[#222328] text-[32px]'>
                    Create your own Ai generated images
                </h1>
                <p className=' mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Note: Since i am running short on credits , i am using Flux so loading time can be little longer
                </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-16 max-w-exl'>
                <div className="flex flex-col gap-5">
                    <FormField
                        LableName='Your name'
                        type='text'
                        name='name'
                        placeholder='Dev'
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        LableName='Prompt'
                        type='text'
                        name='prompt'
                        placeholder='teddy bears shopping for groceries in Japan, ukiyo-e'
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain ' />
                        ) : (
                            <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center
                                 bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="empty-5 flex gap-5">
                    <button type='button' onClick={generateImage} className='text-white bg-green-700 font-medium
                        rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5'>
                        {generatingImg ? "generating Image" : "Generate"}
                    </button>
                </div>

                <div className="mt-10">
                    <p className='text-[#666e75] text-[14px]'>Once you have created the image please don't forget to share in community</p>
                    <button type='submit' className=' mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto
                        px-5 py-2.5 text-center'>
                        {Loading ? ' Sharing ...' : 'Share with the community'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost