import nunjucks from "nunjucks";

function render_from_template(){
    nunjucks.configure('/templates', { autoescape: true });
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

export {RenderedTemplate, render_from_template}