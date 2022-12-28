export function validateForm(form, submit) {
    form.value.validate(valid => {
        if (valid) {
            submit()
            return true
        }
        return false
    })
}