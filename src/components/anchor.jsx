import { Link } from "react-router";
import AnchorLink from 'react-anchor-link-smooth-scroll'

function Anchor() {


    return <>


{/* Первый   Второй */}
<br /><br />

<AnchorLink offset='20' href='#first'>Первый якорь</AnchorLink><br />
<AnchorLink offset='20' href='#second'>Второй якорь</AnchorLink><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

<div id="first">Первый абзац</div>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<div id="second">Второй абзац</div>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
</>
}

export default Anchor