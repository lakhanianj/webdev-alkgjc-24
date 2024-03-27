import React, { useState } from 'react'
import { FaBold, FaItalic, FaUnderline, FaFont, FaHighlighter, FaSuperscript, FaEllipsisV, FaWindowClose, FaKeyboard, FaCode, FaExpandAlt } from 'react-icons/fa';
import "./index.css";
import "../../../Courses/index.css";

function QuizzesEdit() {

    // Details tab is the default tab and is the active tab when activeTab is true. When activeTab is false, Questions is the active tab
    const [activeTab, setActiveTab] = useState(true);

    return (
        <>
            <div className='d-flex justify-content-end'>
                <h3 className='pe-4'>Points</h3>
                <h3 className='pe-4'>0</h3>
                <h4 className='pe-4'><FaWindowClose /> Not Published</h4>
                <button
                    type="button"
                    className="btn modules-buttons-styles"
                ><FaEllipsisV /></button>
            </div>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button type='button' className={`${activeTab ? 'wd-quiz-tabs-active active' : 'wd-quiz-text-icons'} nav-link`} onClick={() => setActiveTab(true)}>Details</button>
                </li>
                <li className="nav-item">
                    <button type='button' className={`${!activeTab ? 'wd-quiz-tabs-active active' : 'wd-quiz-text-icons'} nav-link`} onClick={() => setActiveTab(false)}>Questions</button>
                </li>
            </ul>
            {activeTab ?
                <div>
                    <div className='mb-3'>
                        <input className='form-control' value='Unnamed Quiz' />
                    </div>
                    <div className='pb-5'>
                        <p>Quiz Instructions:</p>
                        <div className='ms-2'>
                            <div className='d-flex'>
                                <button type='button' className='btn'>Edit</button>
                                <button type='button' className='btn'>View</button>
                                <button type='button' className='btn'>Insert</button>
                                <button type='button' className='btn'>Format</button>
                                <button type='button' className='btn'>Tools</button>
                                <button type='button' className='btn'>Table</button>
                            </div>
                            <div className='d-flex'>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        12pt
                                    </button>
                                </div>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Paragraph
                                    </button>
                                </div>
                                <p>|</p>
                                <button type='button' className='btn'>
                                    <FaBold />
                                </button>
                                <button type='button' className='btn'>
                                    <FaItalic />
                                </button>
                                <button type='button' className='btn'>
                                    <FaUnderline />
                                </button>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaFont />
                                    </button>
                                </div>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaHighlighter />
                                    </button>
                                </div>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaSuperscript />
                                    </button>
                                </div>
                                <button type='button' className='btn'>
                                    <FaEllipsisV />
                                </button>
                            </div>
                            <textarea className='form-control wd-quiz-textarea'></textarea>
                        </div>
                        <div className='d-flex'>
                            <p className='ms-3 me-auto'>p</p>
                            <div className='d-flex justify-content-around'>
                                <button type='button' className='btn wd-quiz-text-icons'><FaKeyboard /></button>
                                <div className='d-flex mt-3'>
                                    <p className='text-secondary'>|</p>
                                    <p className='wd-quiz-text-icons'>0 words</p>
                                    <p className='text-secondary'>|</p>
                                </div>
                                <button type='button' className='btn wd-quiz-text-icons'><FaCode /></button>
                                <button type='button' className='btn wd-quiz-text-icons'><FaExpandAlt /></button>
                                <button type='button' className='btn wd-quiz-text-icons'><FaEllipsisV /></button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='d-flex flex-column'>
                            <div className='d-flex justify-content-center'>
                                <p>Quiz Type</p>
                                <div className="dropdown ms-3">
                                    <button className="dropdown-toggle modules-publish-button-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Graded Quiz
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <p>Assignment Group</p>
                                <div className="dropdown ms-3">
                                    <button className="dropdown-toggle modules-publish-button-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        ASSIGNMENTS
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className='wd-quiz-options'>Options</p>
                                <form id='quiz-options'>
                                    <div>
                                        <input className='me-2' type="checkbox" value="SHUFFLE-ANSWERS" name="shuffle-answers" id='shuffle-ans' />
                                        <label htmlFor="shuffle-ans">Shuffle Answers</label>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='me-5'>
                                            <input className='me-2' type="checkbox" value="TIME-LIMIT" name="time-limit" id='time-limit' />
                                            <label htmlFor="time-limit">Time Limit</label>
                                        </div>
                                        <div>
                                            <input className='w-25 me-2' type='number' id="time-limit-min" />
                                            <label htmlFor="time-limit-min">Minutes</label>
                                        </div>
                                    </div>
                                    <div className='border rounded mt-2'>
                                        <input className='m-3' type="checkbox" value="MULTI-ATTEMPT" name="multi-attempt" id='multi-attempt' />
                                        <label htmlFor="multi-attempt">Allow Multiple Attempts</label>
                                    </div>
                                </form>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h1>Questions</h1>
            }
        </>
    )
}

export default QuizzesEdit;