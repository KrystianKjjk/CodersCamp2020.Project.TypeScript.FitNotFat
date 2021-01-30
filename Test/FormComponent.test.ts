import generateForm from '../Src/UIComponents/FormComponent/FormComponent';

describe(('tests for Form Component'),()=>{

    test('Should render correctly',()=>{
       const form=generateForm();
       expect(form).toMatchSnapshot();
    })

    test("should change type to date on focus", () => {
        const form = generateForm();
        document.body.appendChild(form);
        const birthDateInput = document.body.querySelector('.birth-date') as HTMLInputElement;
        expect(birthDateInput.type).toBe("text");
        birthDateInput.focus();
        expect(birthDateInput.type).toBe("date");
    })
})