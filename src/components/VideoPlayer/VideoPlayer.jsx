
import React, { useRef, useState, useEffect } from 'react';
import { FaPauseCircle, FaPlayCircle, FaSpinner } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';
import Loader from "react-loader-spinner";
import { useSelector } from 'react-redux';
import { baseUrl } from '../../index';
import { topicProgress } from '../../api/Courses/Courses';


const VideoPlayer = ({ videoLink, courseID, topicItems }) => {


    // const url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
    const userDetails = useSelector((state) => state.user.info)
    // console.log('videoLink.linkString', baseUrl + "/" + videoLink)

    const url = `${baseUrl}/${videoLink}`;

    const [state, setState] = useState(false);
    const [overlay, setOverlay] = useState(false)
    const [pause, setPause] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [duration, setDuration] = useState()
    const [watched, setWatched] = useState()
    const startTime = parseInt(((topicItems && topicItems.progress * 100) / duration), 10)
    const playRef = useRef(null);
    // const [startFrom, setStartFrom] = useState(startTime)
    // console.log('startTime', startTime)

    useEffect(() => {
        console.log('startTime', startTime)
        if (playRef.current && startTime > 0) {
            playRef.current.seekTo(startTime, 'seconds')
        }
    }, [topicItems, duration])

    const handlePause = e => {
        setState(!state);
        setPause(!pause)
    }

    const handlePlay = e => {
        setState(!state);
        setPause(!pause)
    }
    document.onkeydown = function () {
        const e = window.event;
        if (e.keyCode === 37) {
            console.log(e.keyCode);
            playRef.current.seekTo(playRef.current.getCurrentTime() - 10);
        }
        else if (e.keyCode === 39) {
            console.log(e.keyCode);
            playRef.current.seekTo(playRef.current.getCurrentTime() + 10);
        }
        else if (e.keyCode === 32) {
            console.log(e.keyCode);
            setPause(!pause);
            setState(!state);

        }
    };
    const handleRewind = e => {
        playRef.current.seekTo(playRef.current.getCurrentTime() - 10);
    }
    const handleFroward = e => {
        playRef.current.seekTo(playRef.current.getCurrentTime() + 10);
    }
    // const handleMousemove = e =>{

    //     const xAxis = e.clientX;
    //     if (xAxis) {
    //         setOverlay(!overlay);
    //     }
    // }

    const videoDuration = (time) => {
        setDuration(time)
    }
    const videoWatched = (time) => {
        setWatched(time.playedSeconds)
    }



    const videoProgress = () => {
        const percentage = parseInt(((watched * 100) / duration), 10);
        if (percentage > topicItems?.progress) {
            topicProgress(userDetails._id, courseID.id, topicItems.topicID._id, percentage)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    return (
        <>
            <div onFocus={() => setVisibility(true)} onMouseOver={() => setVisibility(true)} onMouseLeave={() => setVisibility(false)} className="m-4" style={{ height: "100%", width: "100%" }}>

                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <ReactPlayer
                        ref={playRef}
                        // onMouseMove={() => { console.log("mouse move is working"); }}
                        className='react-player'
                        url={url}
                        width='100%'
                        height='100%'
                        controls
                        onDuration={(time) => videoDuration(time)}
                        onPause={() => videoProgress()}
                        onProgress={(time) => videoWatched(time)}
                        playing={state}
                        // onSeek={startFrom}
                        onBuffer={() => {
                            setBuffering(true)
                        }}
                        // onPause={()=>{
                        //     setPause(!pause)
                        // }}
                        onBufferEnd={() => {
                            setBuffering(false);
                        }}
                    />

                    {visibility &&
                        <div aria-hidden="true" onKeyDown={handlePlay} onClick={handlePlay} className={`d-flex justify-content-around align-items-center controls`} style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", height: "85%", width: "100%" }}>
                            <div className="d-flex" >
                                <div aria-hidden="true" className="m-4" onKeyDown={handleRewind} onClick={handleRewind}>
                                    <svg className="rewind " width="30" height="30" viewBox="0 0 60 70" fill="#5282F0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 28C7.5 16.415 17.5875 7 30 7C42.4125 7 52.5 16.415 52.5 28C52.5 39.585 42.4125 49 30 49V35L11.25 52.5L30 70L30 56C46.575 56 60 43.47 60 28C60 12.53 46.575 0 30 0C13.425 0 0 12.53 0 28H7.5Z" />
                                    </svg>
                                </div>

                                <div className="pause m-4">
                                    {!buffering

                                        &&
                                        <>
                                            {pause ?
                                                <FaPauseCircle onClick={handlePause} /> :
                                                <FaPlayCircle onClick={handlePlay} />}
                                        </>
                                    }
                                </div>


                                <div aria-hidden="true" className="m-4" onKeyDown={handleFroward} onClick={handleFroward}>
                                    <svg className="forward" width="30" height="30" viewBox="0 0 60 70" fill="#5282F0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M52.5 42C52.5 53.585 42.4125 63 30 63C17.5875 63 7.5 53.585 7.5 42C7.5 30.415 17.5875 21 30 21V35L48.75 17.5L30 0V14C13.425 14 0 26.53 0 42C0 57.47 13.425 70 30 70C46.575 70 60 57.47 60 42H52.5Z" />
                                    </svg>
                                </div>

                            </div>
                        </div>

                    }
                    {buffering
                        &&
                        <div className="d-flex justify-content-around align-items-center controls" style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", height: "85%", width: "100%" }}>
                            <Loader
                                type="Puff"
                                color="white"
                                height={30}
                                width={30}
                            />
                        </div>
                    }

                </div>

            </div>
        </>
    );
};

export default VideoPlayer;