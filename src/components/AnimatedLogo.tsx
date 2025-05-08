'use client';
import { useEffect, useState } from "react";

const toType = ["dreamcore.us", "@cutbythekid"];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AnimatedLogo() {
    const [typewriterText, setTypewriterText] = useState('');
    const [typewriterStyle, setTypewriterStyle] = useState('not-italic');

    useEffect(() => {
        let isMounted = true;
        const writeLoop = async () => {
            await sleep(3000);
            let phraseIndex = 0;
            let sleepTime = 100;
            while (isMounted) {
                if (phraseIndex == 1) {
                    setTypewriterStyle('not-italic');
                } else {
                    setTypewriterStyle('font-serif italic');
                }
                let phrase = toType[phraseIndex];
                for (let i = 0; i <= phrase.length; i++) {
                    if (!isMounted) return;
                    setTypewriterText(phrase.substring(0, i));
                    await sleep(sleepTime);
                }
                await sleep(4000);
                for (let j = phrase.length; j >= 0; j--) {
                    if (!isMounted) return;
                    setTypewriterText(phrase.substring(0, j));
                    await sleep(sleepTime);
                }
                phraseIndex += (phraseIndex == 1 ? -1 : 1);
            }
        };
        writeLoop();
        return () => { isMounted = false; };
    }, []);

    return (
        <div>
            <span className={`text-4xl ${typewriterStyle}`} >{typewriterText}<span className="typecursor">|</span></span>
        </div>
    );
}