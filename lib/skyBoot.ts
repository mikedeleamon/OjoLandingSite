/**
 * Paints the visitor's live sky before first paint.
 *
 * The live sky needs the browser's clock and timezone, so the server can't
 * render it, and GradientBackground only learns it after the JS bundle has
 * downloaded and hydrated. Until then the page showed the neutral slate
 * placeholder, and the real sky snapped in ~0.8s later on a throttled 4G/CPU
 * profile — the "lag on load".
 *
 * This builds a tiny inline <head> script instead. The server precomputes,
 * for every whole degree of solar elevation where the palette actually changes
 * (−16° to 10°, rising and setting), the sky's three stops plus both scrim
 * ramps — the scrim is the expensive part, and it never runs on the device for
 * the first paint. The script runs the sun-position maths (inlined from
 * lib/sky, which keeps `solarPosition` self-contained for exactly this),
 * looks up the row, and sets three CSS variables that GradientBackground's
 * server-rendered layers already read. Hydration then takes over with the
 * exact, unrounded values; the difference is under a degree of sun.
 */

import { ASSUMED_LATITUDE, skyGradientFor, solarPosition } from './sky';
import { scrimFor, scrollRamp } from './scrim';

const MIN = -16;
const MAX = 10;

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** [rising? 1 : 0][elevation − MIN] → [stop0, stop1, stop2, heroAlphas, scrollAlphas] */
const table = [false, true].map((rising) =>
    Array.from({ length: MAX - MIN + 1 }, (_, i) => {
        const stops = skyGradientFor(MIN + i, rising);
        const scrim = scrimFor(stops);
        return [
            ...stops,
            scrim.hero.map((s) => round3(s.alpha)),
            scrollRamp(scrim).map((s) => round3(s.alpha)),
        ];
    }),
);

// The scrim's sample positions, shared by every row.
const positions = scrimFor(skyGradientFor(0)).hero.map((s) =>
    Math.round(s.pos * 100),
);

export const SKY_BOOT_SCRIPT = `(function(){try{
var sp=${solarPosition.toString()};
var d=new Date(),p=sp(${ASSUMED_LATITUDE},-d.getTimezoneOffset()/4,d);
var e=Math.max(${MIN},Math.min(${MAX},Math.round(p.elevationDeg)));
var r=${JSON.stringify(table)}[p.isRising?1:0][e+${-MIN}],P=${JSON.stringify(positions)};
var g=function(a){return 'linear-gradient(180deg, '+a.map(function(x,i){return 'rgba(0,0,0,'+x+') '+P[i]+'%'}).join(', ')+')'};
var s=document.documentElement.style;
s.setProperty('--sky-bg','linear-gradient(180deg, '+r[0]+' 0%, '+r[1]+' 50%, '+r[2]+' 100%)');
s.setProperty('--sky-hero',g(r[3]));s.setProperty('--sky-scroll',g(r[4]));
}catch(_){}})();`;
