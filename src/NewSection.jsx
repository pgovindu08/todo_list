function NewSection(){
    return(
        <>
            <div className="section-wrapper">
                <div className="center-wrapper">
                    <h2 className="section-type">Section Name</h2>
                </div>
                <div className="center-wrapper">
                    <input type="textbox" className="text-box"/>
                </div>
                <div className="center-wrapper">
                    <button type="button" className="button-add">Add Section</button>
                </div>
            </div>
        </>
    );
}
export default NewSection