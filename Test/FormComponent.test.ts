import generateForm from '../Src/UIComponents/FormComponent/FormComponent';

describe(('tests for Form Component'),()=>{

    test('Should render correctly',()=>{
       const form=generateForm();
       expect(form).toMatchSnapshot();
    })
})