import React, { useState, useEffect } from 'react'

import { Loader, FormField, Card } from '../components'
import { useSearchParams } from 'react-router-dom'


const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    }
    else {
        return (
            <h2 className='mt-5 font-bold text-[#9786f4] text-xl uppercase '>
                {title}
            </h2>
        )
    }
}

const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPost, setAllPost] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [searchedResults, setSearchedResults] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)

            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/api/v1/post`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok) {
                    const result = await response.json()

                    setAllPost(result.data.reverse())
                }
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }

        }

        fetchPost()

    }, [])

    const handleSearchChange = async (e) => {
        clearTimeout(searchTimeout);
        const value = await e.target.value; // not necessary to add awiat here
        console.log(value)
        setSearchText(value);
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPost.filter((item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.prompt.toLowerCase().includes(value.toLowerCase())
                );
                setSearchedResults(searchResult);
            }, 500),
        );
    };

    return (
        <section className=' max-w-7xl mx-auto'>
            <div>
                <h1 className=' font-extrabold text-[#222328] text-[32px]'>
                    The community Showcase
                </h1>
                <p className=' mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Browse through a collection of AI generated images , posted by our community
                </p>
            </div>

            <div className='mt-16'>
                <FormField
                    labelName="Search posts"
                    type="text"
                    name="text"
                    placeholder="Search by name or prompt "
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {/** turnary op for loading if not then emit an empty react component  */}
                {loading ? (
                    <div className='flex justify-center items-center '>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className=' font-md text-[#666e75] text-md mb-3'>
                                Showing results for <span className=' text-[#222328] font-bold'>
                                    {searchText}
                                </span>
                            </h2>
                        )
                        }

                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                            {searchText ? (
                                <RenderCards
                                    data={searchedResults}
                                    title="No search results found">
                                </RenderCards>
                            ) : (
                                <RenderCards
                                    data={allPost}
                                    title="No post found">
                                </RenderCards>
                            )}
                        </div>
                    </>

                )}
            </div>
        </section>
    )
}

export default Home 