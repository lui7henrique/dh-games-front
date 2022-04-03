import * as yup from 'yup'

export const schema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email('Insira um e-mail válido')
      .required('E-mail é obrigatório'),

    password: yup.string().required('Senha é obrigatória')
  })
}
