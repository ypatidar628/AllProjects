import React, { useEffect, useState } from 'react';
import WebService from '../service/WebService';
import WebAPI from '../service/WebAPI';

const Page1 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        const response = await WebService.getAPICall(WebAPI.page1);
        console.log("All data is ", JSON.stringify(response));
        setData(response.data);
    };

    return (
        <div className='mt-16 px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {data
                    .filter(story => story.Status?.length > 0)
                    .map((story) => (
                        <div
                            key={story._id}
                            className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{story.Title}</h2>
                            <p className="text-sm text-gray-500 mb-4">Status: {story.Status}</p>

                            <div className="flex gap-2 overflow-x-auto mb-4">
                                {story.Image.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`/path-to-images/${img}`}
                                        alt="story"
                                        className="h-28 w-28 object-cover rounded-lg"
                                    />
                                ))}
                            </div>

                            {/* Story Adventure */}
                            {story.Storyadvenure && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg text-teal-600">
                                        {story.Storyadvenure.Storytitle}
                                    </h3>
                                    {story.Storyadvenure.content.map((section) => (
                                        <div key={section._id} className="mb-3">
                                            <div className="flex gap-2 overflow-x-auto mb-2">
                                                {section.Storyimage.map((img, j) => (
                                                    <img
                                                        key={j}
                                                        src={`/path-to-images/${img}`}
                                                        alt="section"
                                                        className="h-20 w-20 object-cover rounded"
                                                    />
                                                ))}
                                            </div>
                                            {section.Paragraph.map((p, k) => (
                                                <p key={k} className="text-sm text-gray-700">{p}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Wordexplore */}
                            {story.Wordexplore?.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-teal-700">Word Explore</h4>
                                    <ul className="list-disc list-inside">
                                        {story.Wordexplore.map((word) => (
                                            <li key={word._id}>
                                                <span className="font-medium">{word.Storytitle}</span>: {word.Storyttext}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Brainquest */}
                            {story.Brainquest?.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-teal-700">Brain Quest</h4>
                                    {story.Brainquest.map((quiz) => (
                                        <div key={quiz._id} className="mb-2">
                                            <p className="font-medium">{quiz.Question}</p>
                                            <ul className="pl-5 list-disc">
                                                {quiz.Option.map((opt, i) => (
                                                    <li
                                                        key={i}
                                                        className={`${opt === quiz.Answer ? "text-green-600" : ""}`}
                                                    >
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Page1;
