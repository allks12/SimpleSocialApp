import './form.css';

function Form({
    formName,
    onSubmit,
    placeholder
}) {
    return (
        <form data-name={formName} onSubmit={onSubmit}>
            <fieldset>
                <legend>{formName}</legend>
                <input type='text' placeholder={placeholder} name='inputValue'/>
                <button>{formName}</button>
            </fieldset>
        </form>
    )
}

export default Form;