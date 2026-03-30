import JSZip from "jszip";
import nunjucks from "nunjucks";


function render_from_template(){
    nunjucks.configure('/dist/templates', { autoescape: true });
    return(nunjucks.render("test.njk", {username: "Alice"}));
}

function RenderedTemplate(){
    return(
        <>
        <div>
            {render_from_template()}
        </div>
        </>
    )
}

