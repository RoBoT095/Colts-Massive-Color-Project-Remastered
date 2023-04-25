import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./styles/ColorBox.css";

export default function ColorBox(props) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setTimeout(() => setCopied(false), 2500);
    }, [copied]);

    const changeCopyState = () => {
        setCopied(true);
    };

    const { name, background, moreUrl, showLink } = props;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.65;
    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className="ColorBox">
                <div
                    style={{ background }}
                    className={`copy-overlay ${copied ? "show" : ""}`}
                />
                <div className={`copy-msg ${copied ? "show" : ""}`}>
                    <h1>copied!</h1>
                    <p className={isLightColor ? "dark-text" : ""}>
                        {background}
                    </p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor ? "light-text" : ""}>
                            {name}
                        </span>
                    </div>
                    <button
                        className={`copy-button ${
                            isLightColor ? "dark-text" : ""
                        }`}
                    >
                        Copy
                    </button>

                    {showLink && (
                        <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                            <span
                                className={`see-more ${
                                    isLightColor ? "dark-text" : ""
                                }`}
                            >
                                More
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </CopyToClipboard>
    );
}
